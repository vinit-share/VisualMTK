/* ============================================================
   Visual MTK — Panggung visualisasi
   Bingkai standar untuk semua gambar interaktif: rasio terjaga,
   nyaman di layar kecil, punya keterangan yang dibaca pembaca layar.
   ============================================================ */

import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type SVGProps,
} from 'react'

/* ---------------- Skala layar ---------------- */

/** Berapa piksel layar untuk satu satuan koordinat SVG (0 bila belum diukur). */
const SkalaCtx = createContext(0)

export const useSkalaSvg = () => useContext(SkalaCtx)

/**
 * Ubah ukuran layar (px) menjadi satuan SVG pada skala saat ini, supaya
 * huruf, garis, dan area sentuh tetap nyaman di layar kecil.
 *   const u = useUkuranLayar(); <text fontSize={u(13)} />
 */
export function useUkuranLayar() {
  const s = useSkalaSvg()
  return (px: number, cadangan = px) => (s > 0 ? px / s : cadangan)
}

/** Huruf label tidak boleh tampil lebih kecil dari ini di layar. */
const HURUF_MIN_PX = 11

/* ---------------- Ukuran panggung ---------------- */

/** Lebar isi panggung dalam piksel layar (0 bila belum diukur, mis. saat uji). */
const LebarCtx = createContext(0)

export const useLebarPanggung = () => useContext(LebarCtx)

/** Untuk uji otomatis: paksa lebar panggung tertentu tanpa mengukur DOM. */
export function LebarPanggungUji({ lebar, children }: { lebar: number; children: ReactNode }) {
  return <LebarCtx.Provider value={lebar}>{children}</LebarCtx.Provider>
}

/**
 * Ukuran layar → satuan SVG untuk komponen yang MENGGAMBAR <Svg> itu sendiri
 * (di sana useUkuranLayar belum tahu skalanya, karena skala baru tersedia di
 * dalam <Svg>). Beri lebar sistem koordinat yang akan dipakai.
 */
export function useUkuranLayarUntuk(w: number) {
  const lebar = useLebarPanggung()
  const skala = lebar > 0 && w > 0 ? lebar / w : 0
  return (px: number, cadangan = px) => (skala > 0 ? px / skala : cadangan)
}

/** Batas lebar panggung yang dianggap sempit (HP tegak). */
export const PANGGUNG_SEMPIT = 560

/**
 * true bila panggung sempit. Visual sebaiknya memakai sistem koordinat
 * yang lebih tegak di sini (mis. 420 × 560), bukan mengecilkan tata letak
 * lebar sampai huruf dan bentuknya tak terbaca.
 */
export function useSempit() {
  const lebar = useLebarPanggung()
  return lebar > 0 && lebar < PANGGUNG_SEMPIT
}

export function Stage({
  children,
  keterangan,
  polos = false,
  className = '',
  aksi,
}: {
  children: ReactNode
  /** kalimat yang menjelaskan apa yang sedang terlihat. */
  keterangan?: ReactNode
  polos?: boolean
  className?: string
  /** tombol kecil yang melayang di pojok kanan atas (mis. layar penuh). */
  aksi?: ReactNode
}) {
  const ref = useRef<HTMLElement>(null)
  const [lebar, setLebar] = useState(0)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ukur = () => {
      const g = getComputedStyle(el)
      setLebar(Math.round(el.clientWidth - parseFloat(g.paddingLeft) - parseFloat(g.paddingRight)))
    }
    ukur()
    const ro = new ResizeObserver(ukur)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <figure ref={ref} className={`stage ${polos ? 'stage-plain' : ''} ${className}`}>
      {aksi && <div className="stage-aksi">{aksi}</div>}
      <LebarCtx.Provider value={lebar}>{children}</LebarCtx.Provider>
      {keterangan && (
        <figcaption className="stage-caption" aria-live="polite">
          {keterangan}
        </figcaption>
      )}
    </figure>
  )
}

export interface SvgProps extends Omit<SVGProps<SVGSVGElement>, 'viewBox' | 'width' | 'height'> {
  /** lebar sistem koordinat internal. */
  w: number
  /** tinggi sistem koordinat internal. */
  h: number
  /** batas tinggi tampilan agar tidak terlalu tinggi di layar lebar. */
  maxH?: number
  label?: string
  children: ReactNode
}

/**
 * SVG responsif: menggambar dalam koordinat tetap (w x h) lalu
 * diskalakan oleh CSS. Semua visualisasi memakai ini supaya
 * ukuran garis dan huruf konsisten di seluruh aplikasi.
 */
export function Svg({ w, h, maxH, label, children, style, ...rest }: SvgProps) {
  const ref = useRef<SVGSVGElement>(null)
  const [skala, setSkala] = useState(0)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ukur = () => {
      const r = el.getBoundingClientRect()
      // preserveAspectRatio "meet": skala = yang lebih kecil dari dua sumbu
      const s = Math.min(r.width / w, r.height / h)
      if (s > 0) setSkala((lama) => (Math.abs(lama - s) > 0.005 ? s : lama))
    }
    ukur()
    const ro = new ResizeObserver(ukur)
    ro.observe(el)
    return () => ro.disconnect()
  }, [w, h])

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid meet"
      role={label ? 'img' : 'presentation'}
      aria-label={label}
      style={{ maxHeight: maxH ? `${maxH}px` : undefined, ...style }}
      {...rest}
    >
      <SkalaCtx.Provider value={skala}>{children}</SkalaCtx.Provider>
    </svg>
  )
}

/** Label teks pada gambar dengan latar agar tetap terbaca di atas warna apa pun. */
const POLA_WARNA_UTAMA = /var\(--(m-a|m-b|m-ab|m-c|m-hi|brand|amber|teal|blue|pink|green|rose|ok|belum)\)/g

/**
 * Varian "tinta" sebuah warna token, untuk TULISAN.
 * Warna utama peran dan aksen (mis. `var(--m-b)`) hanya cukup kontras untuk
 * bentuk, titik, dan garis. Tulisan memakai pasangannya yang berakhiran -ink.
 * Warna lain (tinta biasa, warna tetap) dikembalikan apa adanya.
 */
export function tinta(warna: string): string {
  return warna.replace(POLA_WARNA_UTAMA, 'var(--$1-ink)')
}

/** Tulisan terang yang biasa diletakkan di atas isian berwarna. */
const TULISAN_TERANG = ['var(--surface)', 'var(--on-brand)', 'var(--paper)']

export function Tag({
  x,
  y,
  children,
  warna = 'var(--ink)',
  latar = 'var(--surface)',
  size = 14,
  anchor = 'middle',
  tebal = 800,
  padX = 7,
  opacity = 1,
  layar = false,
}: {
  x: number
  y: number
  children: string
  warna?: string
  latar?: string | null
  size?: number
  anchor?: 'start' | 'middle' | 'end'
  tebal?: number
  padX?: number
  opacity?: number
  /** ukuran sudah dihitung dalam piksel layar; jangan diperbesar lagi. */
  layar?: boolean
}) {
  const skala = useSkalaSvg()
  // Di layar kecil gambar diperkecil; label diperbesar secukupnya
  // (paling banyak 1,6×) agar tidak pernah tampil lebih kecil dari 11 px.
  const ukuran =
    !layar && skala > 0 ? Math.max(size, Math.min(size * 1.6, HURUF_MIN_PX / skala)) : size
  const lebar = children.length * ukuran * 0.58 + padX * (ukuran / size) * 2
  const rx = anchor === 'middle' ? x - lebar / 2 : anchor === 'end' ? x - lebar : x
  // Label berisi (tulisan terang di atas warna utama): latarnya dipindah ke
  // varian tinta supaya kontrasnya cukup di kedua tema. Label biasa: tulisannya
  // yang memakai varian tinta.
  const berisi = !!latar && TULISAN_TERANG.includes(warna) && tinta(latar) !== latar
  const warnaLatar = berisi && latar ? tinta(latar) : latar
  const warnaTulisan = berisi ? 'var(--surface)' : tinta(warna)
  return (
    <g opacity={opacity} style={{ pointerEvents: 'none' }}>
      {latar && (
        <rect
          x={rx}
          y={y - ukuran * 0.82}
          width={lebar}
          height={ukuran * 1.5}
          rx={ukuran * 0.6}
          fill={warnaLatar ?? undefined}
          opacity={berisi ? 1 : 0.92}
        />
      )}
      <text
        x={x}
        y={y}
        textAnchor={anchor}
        dominantBaseline="middle"
        fontSize={ukuran}
        fontWeight={tebal}
        fill={warnaTulisan}
      >
        {children}
      </text>
    </g>
  )
}

/** Panah berukur untuk menandai panjang sisi. */
export function Dimensi({
  x1,
  y1,
  x2,
  y2,
  label,
  warna = 'var(--m-axis)',
  offset = 0,
  size = 13,
  opacity = 1,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  label?: string
  warna?: string
  /** geser garis tegak lurus dari segmen aslinya. */
  offset?: number
  size?: number
  opacity?: number
}) {
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1
  const nx = (-dy / len) * offset
  const ny = (dx / len) * offset
  const ax = x1 + nx
  const ay = y1 + ny
  const bx = x2 + nx
  const by = y2 + ny
  const tick = 5
  const tx = (-dy / len) * tick
  const ty = (dx / len) * tick
  const mx = (ax + bx) / 2
  const my = (ay + by) / 2
  const tegak = Math.abs(dx) < Math.abs(dy)
  return (
    <g opacity={opacity} style={{ pointerEvents: 'none' }}>
      <line x1={ax} y1={ay} x2={bx} y2={by} stroke={warna} strokeWidth={1.6} />
      <line x1={ax - tx} y1={ay - ty} x2={ax + tx} y2={ay + ty} stroke={warna} strokeWidth={1.6} />
      <line x1={bx - tx} y1={by - ty} x2={bx + tx} y2={by + ty} stroke={warna} strokeWidth={1.6} />
      {label && (
        <Tag
          x={mx + (tegak ? -size * 1.2 : 0)}
          y={my + (tegak ? 0 : -size * 0.9)}
          size={size}
          warna={warna === 'var(--m-axis)' ? 'var(--ink-2)' : warna}
        >
          {label}
        </Tag>
      )}
    </g>
  )
}

/** Tanda sudut siku-siku. */
export function SikuSiku({
  x,
  y,
  ux,
  uy,
  vx,
  vy,
  s = 14,
  warna = 'var(--m-axis)',
  opacity = 1,
}: {
  x: number
  y: number
  /** arah sisi pertama (satuan). */
  ux: number
  uy: number
  /** arah sisi kedua (satuan). */
  vx: number
  vy: number
  s?: number
  warna?: string
  opacity?: number
}) {
  const p = `${x + ux * s},${y + uy * s} ${x + ux * s + vx * s},${y + uy * s + vy * s} ${
    x + vx * s
  },${y + vy * s}`
  return (
    <polyline
      points={p}
      fill="none"
      stroke={warna}
      strokeWidth={1.6}
      opacity={opacity}
      style={{ pointerEvents: 'none' }}
    />
  )
}
