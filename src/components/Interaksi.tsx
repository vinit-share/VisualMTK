/* ============================================================
   Visual MTK — Interaksi langsung
   Anak memegang objek matematikanya sendiri: menyeret titik,
   merentangkan sisi, memutar sudut. Tombol − / + dan angka yang
   bisa diketik hanya cadangan untuk ketelitian dan aksesibilitas.

   Isi berkas ini:
   - useKendali(specs)   sumber nilai penggeser + perubahan halus
   - InteraksiProvider   membagikan kendali ke gambar
   - Pegangan            titik seret di dalam SVG (sentuhan lebar)
   - useSeret            seret bebas untuk interaksi khusus
   - BilahAngka          kontrol ringkas "− r = 5 +" yang bisa diketik
   - useModeFokus        panggung hampir selayar penuh
   ============================================================ */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react'
import { useMediaQuery, useReducedMotion } from '../lib/anim'
import { clamp, fmt, parseAngka } from '../lib/num'
import type { FormulaRole, ParamSpec } from '../lib/types'
import { Ikon } from './Ikon'
import { useSorotAksi } from './Formula'
import { Tag, tinta, useSkalaSvg, useUkuranLayar } from './Stage'

export type Nilai = Record<string, number>
export interface Titik {
  x: number
  y: number
}

/* ---------------- Nilai penggeser ---------------- */

/** Bulatkan ke kelipatan langkah dan jepit ke rentang penggeser. */
export function rapikan(spec: ParamSpec, v: number): number {
  if (!Number.isFinite(v)) return spec.awal
  const n = Math.round((v - spec.min) / spec.step)
  return Number(clamp(spec.min + n * spec.step, spec.min, spec.max).toFixed(10))
}

const langkahBulat = (s: ParamSpec) => Number.isInteger(s.step) && s.step >= 1

export interface Kendali {
  specs: ParamSpec[]
  /** nilai "resmi" yang diminta anak. */
  nilai: Nilai
  /** nilai yang sedang digambar; bergerak halus menuju `nilai`. */
  tampil: Nilai
  atur: (ubah: Nilai, opsi?: { halus?: boolean }) => void
  reset: () => void
  berubah: boolean
  /** penggeser yang sedang dipegang atau difokus. */
  aktif: string | null
  setAktif: (k: string | null) => void
}

export function useKendali(specs: ParamSpec[] = []): Kendali {
  const awal = useMemo(() => Object.fromEntries(specs.map((s) => [s.key, s.awal])), [specs])
  const peta = useMemo(() => new Map(specs.map((s) => [s.key, s])), [specs])
  const [nilai, setNilai] = useState<Nilai>(awal)
  const [aktif, setAktif] = useState<string | null>(null)
  const langsung = useRef(true)

  const atur = useCallback(
    (ubah: Nilai, opsi: { halus?: boolean } = {}) => {
      langsung.current = !opsi.halus
      setNilai((lama) => {
        let beda = false
        const baru = { ...lama }
        for (const [k, v] of Object.entries(ubah)) {
          const spec = peta.get(k)
          const rapi = spec ? rapikan(spec, v) : v
          if (baru[k] !== rapi) {
            baru[k] = rapi
            beda = true
          }
        }
        return beda ? baru : lama
      })
    },
    [peta],
  )

  const reset = useCallback(() => {
    langsung.current = false
    setNilai(awal)
  }, [awal])

  const tampil = useNilaiHalus(nilai, specs, langsung)
  const berubah = specs.some((s) => nilai[s.key] !== s.awal)

  return useMemo(
    () => ({ specs, nilai, tampil, atur, reset, berubah, aktif, setAktif }),
    [specs, nilai, tampil, atur, reset, berubah, aktif],
  )
}

/**
 * Nilai tampilan mengejar nilai resmi dengan peluruhan eksponensial,
 * supaya lingkaran benar-benar TUMBUH saat angkanya dinaikkan, bukan
 * melompat. Saat diseret, gambar mengikuti jari tanpa jeda.
 */
function useNilaiHalus(nilai: Nilai, specs: ParamSpec[], langsung: { current: boolean }): Nilai {
  const kurangi = useReducedMotion()
  const [tampil, setTampil] = useState<Nilai>(nilai)
  const sekarang = useRef<Nilai>(nilai)

  useEffect(() => {
    if (kurangi || langsung.current || typeof requestAnimationFrame !== 'function') {
      sekarang.current = nilai
      setTampil(nilai)
      return
    }
    let id = 0
    let lalu = performance.now()
    const detak = (kini: number) => {
      const dt = Math.min(0.05, (kini - lalu) / 1000)
      lalu = kini
      const k = 1 - Math.exp(-dt / 0.075)
      let beres = true
      const baru: Nilai = { ...sekarang.current }
      const gambar: Nilai = { ...nilai }
      for (const s of specs) {
        const dari = sekarang.current[s.key] ?? s.awal
        const ke = nilai[s.key] ?? s.awal
        const selisih = ke - dari
        if (Math.abs(selisih) <= Math.max(1e-6, s.step * 0.01)) {
          baru[s.key] = ke
        } else {
          baru[s.key] = dari + selisih * k
          beres = false
        }
        // Penggeser berlangkah bulat (mis. banyak potongan) tetap bulat
        // selama bergerak, jadi gambar menghitung 4, 5, 6, … bukan 4,37.
        gambar[s.key] = langkahBulat(s) ? rapikan(s, baru[s.key]) : baru[s.key]
      }
      sekarang.current = baru
      setTampil(beres ? nilai : gambar)
      if (!beres) id = requestAnimationFrame(detak)
    }
    id = requestAnimationFrame(detak)
    return () => cancelAnimationFrame(id)
  }, [nilai, specs, kurangi, langsung])

  return tampil
}

/* ---------------- Konteks ---------------- */

const KUNCI_PETUNJUK = 'visualmtk.sudahMenyeret'

function bacaSudahMenyeret(): boolean {
  try {
    return localStorage.getItem(KUNCI_PETUNJUK) === '1'
  } catch {
    return false
  }
}

interface InteraksiCtx {
  kendali: Kendali
  peta: Map<string, ParamSpec>
  /** true sampai anak berhasil menyeret untuk pertama kalinya di panggung ini. */
  denyut: boolean
  /** true sampai anak pernah menyeret di mana pun (teks "Coba geser aku"). */
  ajakan: boolean
  tandaiMenyeret: () => void
}

const Ctx = createContext<InteraksiCtx | null>(null)

export function InteraksiProvider({ kendali, children }: { kendali: Kendali; children: ReactNode }) {
  const [denyut, setDenyut] = useState(true)
  const [ajakan, setAjakan] = useState(() => !bacaSudahMenyeret())
  const peta = useMemo(() => new Map(kendali.specs.map((s) => [s.key, s])), [kendali.specs])
  const tandaiMenyeret = useCallback(() => {
    setDenyut(false)
    setAjakan(false)
    try {
      localStorage.setItem(KUNCI_PETUNJUK, '1')
    } catch {
      /* penyimpanan tidak tersedia: petunjuk cukup hilang di sesi ini */
    }
  }, [])
  const value = useMemo(
    () => ({ kendali, peta, denyut, ajakan, tandaiMenyeret }),
    [kendali, peta, denyut, ajakan, tandaiMenyeret],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

/**
 * Hubungkan objek dan rumus: selama sebuah penggeser dipegang, bagian rumus
 * yang mewakilinya (ParamSpec.bagian) ikut menyala. Pasang di dalam
 * SorotProvider dan InteraksiProvider.
 */
export function SorotDariPegangan() {
  const ctx = useContext(Ctx)
  const { set } = useSorotAksi()
  const aktif = ctx?.kendali.aktif ?? null
  const bagian = aktif ? ctx?.peta.get(aktif)?.bagian ?? null : null
  const tadi = useRef<string | null>(null)
  useEffect(() => {
    if (bagian) {
      tadi.current = bagian
      set(bagian)
    } else if (tadi.current) {
      tadi.current = null
      set(null)
    }
  }, [bagian, set])
  return null
}

/** Kendali penggeser dari dalam gambar (null di luar panggung interaktif). */
export function useInteraksi() {
  return useContext(Ctx)
}

/** Penyedia untuk uji otomatis: nilai tetap, tanpa animasi. */
export function InteraksiUji({ specs, children }: { specs: ParamSpec[]; children: ReactNode }) {
  const kendali = useKendali(specs)
  return <InteraksiProvider kendali={kendali}>{children}</InteraksiProvider>
}

/* ---------------- Koordinat ---------------- */

function titikSvg(svg: SVGSVGElement, clientX: number, clientY: number): Titik | null {
  const m = svg.getScreenCTM()
  if (!m) return null
  const p = new DOMPoint(clientX, clientY).matrixTransform(m.inverse())
  return { x: p.x, y: p.y }
}

/** Selama menyeret, cegah halaman ikut bergulir (Safari iOS mengabaikan touch-action di SVG). */
function kunciGulir() {
  const cegah = (e: TouchEvent) => e.preventDefault()
  document.addEventListener('touchmove', cegah, { passive: false })
  return () => document.removeEventListener('touchmove', cegah)
}

/**
 * Mulai menyeret dari sebuah pointerdown. Gerakan didengar di window, bukan
 * di elemennya, supaya seret tetap jalan walau jari keluar dari titiknya
 * atau peramban menolak setPointerCapture.
 */
function mulaiSeret(
  e: ReactPointerEvent<SVGElement>,
  gerak: (pt: Titik) => void,
  selesai: (pt: Titik | null) => void,
): (() => void) | null {
  if (e.button !== 0 && e.pointerType === 'mouse') return null
  const el = e.currentTarget
  const svg = el instanceof SVGSVGElement ? el : el.ownerSVGElement
  if (!svg) return null
  e.preventDefault()
  const id = e.pointerId
  const lepasGulir = kunciGulir()
  let terakhir: Titik | null = null
  const onMove = (ev: PointerEvent) => {
    if (ev.pointerId !== id) return
    const pt = titikSvg(svg, ev.clientX, ev.clientY)
    if (pt) {
      terakhir = pt
      gerak(pt)
    }
  }
  const lepas = () => {
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerup', onUp)
    window.removeEventListener('pointercancel', onUp)
    lepasGulir()
  }
  const onUp = (ev: PointerEvent) => {
    if (ev.pointerId !== id) return
    lepas()
    // Posisi saat jari diangkat juga dihitung — beberapa perangkat tidak
    // mengirim gerakan terakhir sebelum pointerup.
    const pt = titikSvg(svg, ev.clientX, ev.clientY)
    if (pt && (!terakhir || pt.x !== terakhir.x || pt.y !== terakhir.y)) gerak(pt)
    selesai(pt ?? terakhir)
  }
  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onUp)
  window.addEventListener('pointercancel', onUp)
  try {
    el.setPointerCapture(id)
  } catch {
    /* tidak apa-apa: gerakan tetap didengar di window */
  }
  return lepas
}

/* ---------------- Seret bebas ---------------- */

/**
 * Untuk interaksi yang bukan sekadar satu titik: menyeret bola keluar dari
 * timbangan, menggeser garis pembagi pecahan, dsb. Sebarkan hasilnya ke
 * elemen SVG yang boleh dipegang.
 */
export function useSeret(opsi: {
  mulai?: (pt: Titik) => void
  gerak: (pt: Titik, awal: Titik) => void
  selesai?: (pt: Titik, awal: Titik) => void
}) {
  const ctx = useContext(Ctx)
  const ref = useRef(opsi)
  useEffect(() => {
    ref.current = opsi
  })
  const lepas = useRef<(() => void) | null>(null)
  useEffect(() => () => lepas.current?.(), [])

  const onPointerDown = (e: ReactPointerEvent<SVGElement>) => {
    const el = e.currentTarget
    const svg = el instanceof SVGSVGElement ? el : el.ownerSVGElement
    const awal = svg ? titikSvg(svg, e.clientX, e.clientY) : null
    if (!awal) return
    lepas.current?.()
    lepas.current = mulaiSeret(
      e,
      (pt) => ref.current.gerak(pt, awal),
      (pt) => {
        lepas.current = null
        ref.current.selesai?.(pt ?? awal, awal)
        ctx?.tandaiMenyeret()
      },
    )
    if (lepas.current) ref.current.mulai?.(awal)
  }
  return {
    onPointerDown,
    style: { touchAction: 'none', cursor: 'grab' } as CSSProperties,
  }
}

/* ---------------- Pegangan ---------------- */

const WARNA_PERAN: Record<FormulaRole, string> = {
  a: 'var(--m-a)',
  b: 'var(--m-b)',
  ab: 'var(--m-ab)',
  c: 'var(--m-c)',
  hi: 'var(--m-hi)',
  plain: 'var(--brand)',
}

export const warnaPeran = (peran?: FormulaRole) => (peran ? WARNA_PERAN[peran] : 'var(--brand)')

/**
 * Titik yang bisa diseret. Tampak kecil, tetapi area sentuhnya selalu
 * paling sedikit ±52 px di layar, berapa pun skala gambarnya.
 *
 *   <Pegangan x={cx + R} y={cy} param="r" label={`r = ${fmt(r)}`}
 *     keNilai={(pt) => (pt.x - cx) / SKALA} arah="x" utama />
 */
export function Pegangan({
  x,
  y,
  param,
  keNilai,
  label,
  warna,
  arah = 'bebas',
  utama = false,
  panah,
  ajakan = 'Coba geser aku',
  sembunyi = false,
  labelSelalu = false,
}: {
  x: number
  y: number
  /** kunci penggeser yang dikendalikan; kunci pertama dipakai untuk pembaca layar. */
  param: string | string[]
  /** ubah posisi jari (koordinat SVG) menjadi nilai penggeser. */
  keNilai: (pt: Titik) => number | Nilai
  /** teks nilai di dekat pegangan saat dipegang, mis. "r = 5". */
  label?: string
  warna?: string
  /** arah gerak yang masuk akal, untuk petunjuk panah kecil. */
  arah?: 'x' | 'y' | 'bebas' | 'putar'
  /** pegangan yang diberi denyut dan ajakan "Coba geser aku". */
  utama?: boolean
  /** penggeser yang diubah tombol panah kiri/kanan dan atas/bawah. */
  panah?: { kiriKanan?: string; atasBawah?: string }
  ajakan?: string
  /** sembunyikan tanpa melepas kaitan (mis. saat animasi belum sampai). */
  sembunyi?: boolean
  /** tampilkan label nilai terus-menerus, bukan hanya saat dipegang. */
  labelSelalu?: boolean
}) {
  const ctx = useContext(Ctx)
  const skala = useSkalaSvg() || 0.6
  const [pegang, setPegang] = useState(false)
  const [fokus, setFokus] = useState(false)
  const geser = useRef<(() => void) | null>(null)
  // keNilai terbaru dipakai selama menyeret (tata letak bisa ikut berubah).
  const keNilaiRef = useRef(keNilai)
  useEffect(() => {
    keNilaiRef.current = keNilai
  })
  useEffect(() => () => geser.current?.(), [])

  const kunci = Array.isArray(param) ? param : [param]
  const specUtama = ctx?.peta.get(kunci[0])
  if (!ctx || sembunyi || !specUtama) return null
  const { kendali, peta, denyut, tandaiMenyeret } = ctx

  const px = (n: number) => n / skala
  const rTitik = Math.max(8, px(9))
  const rSentuh = Math.max(rTitik + 6, px(26))
  const w = warna ?? warnaPeran(specUtama.peran)
  const menyala = pegang || fokus || kendali.aktif === specUtama.key

  const onPointerDown = (e: ReactPointerEvent<SVGGElement>) => {
    const el = e.currentTarget
    const pt = el.ownerSVGElement ? titikSvg(el.ownerSVGElement, e.clientX, e.clientY) : null
    if (!pt) return
    // Simpan jarak jari ke pusat titik, supaya titiknya tidak meloncat ke jari.
    const dx = pt.x - x
    const dy = pt.y - y
    geser.current?.()
    geser.current = mulaiSeret(
      e,
      (q) => {
        const hasil = keNilaiRef.current({ x: q.x - dx, y: q.y - dy })
        kendali.atur(typeof hasil === 'number' ? { [kunci[0]]: hasil } : hasil)
      },
      () => {
        geser.current = null
        setPegang(false)
        kendali.setAktif(null)
        tandaiMenyeret()
      },
    )
    if (!geser.current) return
    setPegang(true)
    kendali.setAktif(specUtama.key)
  }

  const langkah = (k: string | undefined, tanda: number, kali = 1) => {
    const s = k ? peta.get(k) : undefined
    if (!s) return
    kendali.atur({ [s.key]: (kendali.nilai[s.key] ?? s.awal) + tanda * s.step * kali }, { halus: true })
  }
  const onKeyDown = (e: ReactKeyboardEvent<SVGGElement>) => {
    const kk = panah?.kiriKanan ?? kunci[0]
    const ab = panah?.atasBawah ?? kunci[1] ?? kunci[0]
    const tombol: Record<string, () => void> = {
      ArrowRight: () => langkah(kk, 1),
      ArrowLeft: () => langkah(kk, -1),
      ArrowUp: () => langkah(ab, 1),
      ArrowDown: () => langkah(ab, -1),
      PageUp: () => langkah(kunci[0], 1, 10),
      PageDown: () => langkah(kunci[0], -1, 10),
      Home: () => kendali.atur({ [specUtama.key]: specUtama.min }, { halus: true }),
      End: () => kendali.atur({ [specUtama.key]: specUtama.max }, { halus: true }),
    }
    const f = tombol[e.key]
    if (f) {
      e.preventDefault()
      e.stopPropagation()
      f()
    }
  }

  const nilaiSekarang = kendali.nilai[specUtama.key] ?? specUtama.awal
  const tampilAjakan = utama && ctx.ajakan && !pegang

  return (
    <g
      className="pegangan"
      data-param={kunci.join(' ')}
      data-pegang={pegang || undefined}
      role="slider"
      tabIndex={0}
      aria-label={kunci.map((k) => peta.get(k)?.label ?? k).join(' dan ')}
      aria-valuemin={specUtama.min}
      aria-valuemax={specUtama.max}
      aria-valuenow={nilaiSekarang}
      aria-valuetext={label ?? `${specUtama.label} ${fmt(nilaiSekarang)}`}
      onPointerDown={onPointerDown}
      onKeyDown={onKeyDown}
      onFocus={() => {
        setFokus(true)
        kendali.setAktif(specUtama.key)
      }}
      onBlur={() => {
        setFokus(false)
        if (!geser.current) kendali.setAktif(null)
      }}
      style={{ touchAction: 'none', cursor: pegang ? 'grabbing' : 'grab', outline: 'none' }}
    >
      {/* area sentuh yang jauh lebih besar dari titiknya */}
      <circle cx={x} cy={y} r={rSentuh} fill="transparent" />
      {utama && denyut && !pegang && (
        <circle
          className="pegangan-denyut"
          cx={x}
          cy={y}
          r={rTitik}
          fill="none"
          stroke={w}
          strokeWidth={px(2.5)}
        />
      )}
      {menyala && <circle cx={x} cy={y} r={rTitik * 2.1} fill={w} opacity={0.16} />}
      {fokus && !pegang && (
        <circle cx={x} cy={y} r={rTitik + px(5)} fill="none" stroke="var(--ink)" strokeWidth={px(2)} />
      )}
      <PanahArah x={x} y={y} r={rTitik} arah={arah} warna={w} tebal={px(2)} tampak={!pegang} />
      <circle cx={x} cy={y} r={rTitik} fill="var(--surface)" stroke={w} strokeWidth={px(3.5)} />
      <circle cx={x} cy={y} r={rTitik * 0.38} fill={w} />
      {label && (menyala || labelSelalu) && (
        <Tag x={x} y={y - rTitik - px(22)} size={px(15)} warna={w} layar>
          {label}
        </Tag>
      )}
      {tampilAjakan && !menyala && !labelSelalu && (
        <Tag x={x} y={y + rTitik + px(24)} size={px(13)} warna="var(--on-brand)" latar={w} layar>
          {ajakan}
        </Tag>
      )}
    </g>
  )
}

function PanahArah({
  x,
  y,
  r,
  arah,
  warna,
  tebal,
  tampak,
}: {
  x: number
  y: number
  r: number
  arah: 'x' | 'y' | 'bebas' | 'putar'
  warna: string
  tebal: number
  tampak: boolean
}) {
  if (!tampak || arah === 'putar') return null
  const d = r * 1.9
  const u = r * 0.55
  const sumbu: [number, number][] =
    arah === 'x'
      ? [
          [1, 0],
          [-1, 0],
        ]
      : arah === 'y'
        ? [
            [0, 1],
            [0, -1],
          ]
        : [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
          ]
  return (
    <g
      stroke={warna}
      strokeWidth={tebal}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={0.7}
      style={{ pointerEvents: 'none' }}
    >
      {sumbu.map(([ax, ay]) => {
        const tx = x + ax * d
        const ty = y + ay * d
        // mata panah kecil yang menunjuk keluar
        const p1 = `${tx - ax * u - ay * u},${ty - ay * u - ax * u}`
        const p2 = `${tx - ax * u + ay * u},${ty - ay * u + ax * u}`
        return <polyline key={`${ax},${ay}`} points={`${p1} ${tx},${ty} ${p2}`} />
      })}
    </g>
  )
}

/* ---------------- Rel geser di dalam gambar ---------------- */

/**
 * Untuk nilai yang tidak punya "tempat" geometris (banyak potongan, persen,
 * nomor percobaan): rel pendek yang digambar tepat di dekat objeknya,
 * bukan penggeser di bawah halaman.
 */
export function RelGeser({
  x1,
  x2,
  y,
  param,
  label,
  kiri,
  kanan,
  utama = false,
  warna,
}: {
  x1: number
  x2: number
  y: number
  param: string
  /** nilai yang tampil di atas pegangan, mis. "16 potongan". */
  label: string
  /** keterangan ujung kiri dan kanan rel. */
  kiri?: string
  kanan?: string
  utama?: boolean
  warna?: string
}) {
  const ctx = useContext(Ctx)
  const u = useUkuranLayar()
  const spec = ctx?.peta.get(param)
  if (!ctx || !spec) return null
  const v = ctx.kendali.tampil[param] ?? spec.awal
  const rentang = spec.max - spec.min || 1
  const hx = x1 + ((clamp(v, spec.min, spec.max) - spec.min) / rentang) * (x2 - x1)
  const w = warna ?? warnaPeran(spec.peran)
  const tebal = u(7, 7)
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke="var(--surface-3)" strokeWidth={tebal} strokeLinecap="round" />
      <line x1={x1} y1={y} x2={hx} y2={y} stroke={w} strokeWidth={tebal} strokeLinecap="round" opacity={0.5} />
      {kiri && (
        <Tag x={x1} y={y + u(24, 24)} size={u(12, 13)} anchor="start" latar={null} warna="var(--ink-2)" tebal={700} layar>
          {kiri}
        </Tag>
      )}
      {kanan && (
        <Tag x={x2} y={y + u(24, 24)} size={u(12, 13)} anchor="end" latar={null} warna="var(--ink-2)" tebal={700} layar>
          {kanan}
        </Tag>
      )}
      <Pegangan
        x={hx}
        y={y}
        param={param}
        arah="x"
        utama={utama}
        warna={w}
        label={label}
        labelSelalu
        keNilai={(pt) => spec.min + clamp((pt.x - x1) / (x2 - x1), 0, 1) * rentang}
      />
    </g>
  )
}

/* ---------------- Tombol di dalam gambar ---------------- */

/**
 * Tombol yang hidup di dalam gambar, untuk nilai yang lebih wajar diketuk
 * daripada diseret: "lempar lagi", "tambah satu bola", "tukar tempat".
 * Area sentuhnya minimal 48 px di layar.
 */
export function TombolGambar({
  x,
  y,
  param,
  ubah,
  label,
  warna,
  utama = false,
}: {
  x: number
  y: number
  param: string
  /** nilai baru dari nilai sekarang, mis. (v) => v + 1. */
  ubah: (v: number) => number
  label: string
  warna?: string
  utama?: boolean
}) {
  const ctx = useContext(Ctx)
  const u = useUkuranLayar()
  const spec = ctx?.peta.get(param)
  if (!ctx || !spec) return null
  const w = warna ?? warnaPeran(spec.peran)
  const huruf = u(14, 15)
  const lebar = Math.max(u(48, 48), label.length * huruf * 0.6 + u(28, 28))
  const tinggi = u(40, 40)
  const tekan = () => {
    const v = ctx.kendali.nilai[param] ?? spec.awal
    ctx.kendali.atur({ [param]: ubah(v) }, { halus: true })
    ctx.tandaiMenyeret()
  }
  return (
    <g
      className="tombol-gambar"
      data-param={param}
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={tekan}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          e.stopPropagation()
          tekan()
        }
      }}
      style={{ cursor: 'pointer' }}
    >
      {utama && ctx.denyut && (
        <rect
          className="pegangan-denyut"
          x={x - lebar / 2}
          y={y - tinggi / 2}
          width={lebar}
          height={tinggi}
          rx={tinggi / 2}
          fill="none"
          stroke={w}
          strokeWidth={u(2, 2)}
        />
      )}
      <rect
        x={x - lebar / 2}
        y={y - Math.max(tinggi, u(48, 48)) / 2}
        width={lebar}
        height={Math.max(tinggi, u(48, 48))}
        fill="transparent"
      />
      {/* Isian memakai varian tinta supaya tulisan di atasnya cukup kontras. */}
      <rect x={x - lebar / 2} y={y - tinggi / 2} width={lebar} height={tinggi} rx={tinggi / 2} fill={tinta(w)} />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={huruf}
        fontWeight={800}
        fill="var(--surface)"
        style={{ pointerEvents: 'none' }}
      >
        {label}
      </text>
    </g>
  )
}

/* ---------------- Bilah angka ---------------- */

/**
 * Kontrol cadangan yang ringkas: "− r = 5 +". Ketuk angkanya untuk
 * mengetik nilai yang tepat. Tidak pernah lebih besar dari gambarnya.
 */
export function BilahAngka({ kendali, label = 'Atur angka dengan tepat' }: { kendali: Kendali; label?: string }) {
  const sempit = useMediaQuery('(max-width: 640px)')
  const [buka, setBuka] = useState(false)
  const [terakhir, setTerakhir] = useState<string | null>(null)

  // Ingat penggeser yang terakhir dipegang, supaya angkanya tetap terlihat
  // setelah jari diangkat.
  useEffect(() => {
    if (kendali.aktif) setTerakhir(kendali.aktif)
  }, [kendali.aktif])

  if (kendali.specs.length === 0) return null

  // Di layar sempit hanya satu angka yang tampil — yang sedang atau terakhir
  // dipegang — agar gambarnya tetap menjadi tokoh utama.
  const ringkas = sempit && kendali.specs.length > 1 && !buka
  const tampak = ringkas
    ? kendali.specs.filter((s) => s.key === (terakhir ?? kendali.specs[0].key))
    : kendali.specs

  return (
    <div className="bilah-angka" role="group" aria-label={label} data-ringkas={ringkas || undefined}>
      {tampak.map((s) => (
        <ChipAngka key={s.key} spec={s} kendali={kendali} />
      ))}
      {sempit && kendali.specs.length > 1 && (
        <button
          type="button"
          className="bilah-angka-semua"
          aria-expanded={buka}
          onClick={() => setBuka((b) => !b)}
        >
          {buka ? 'Ringkas' : `Semua angka (${kendali.specs.length})`}
        </button>
      )}
    </div>
  )
}

function ChipAngka({ spec, kendali }: { spec: ParamSpec; kendali: Kendali }) {
  const [edit, setEdit] = useState(false)
  const [draf, setDraf] = useState('')
  const input = useRef<HTMLInputElement>(null)
  const nilai = kendali.nilai[spec.key] ?? spec.awal
  const teks = fmt(nilai, spec.bulat ? 0 : undefined)

  useEffect(() => {
    if (edit) input.current?.select()
  }, [edit])

  const simpan = () => {
    const v = parseAngka(draf)
    if (v !== null) kendali.atur({ [spec.key]: v }, { halus: true })
    setEdit(false)
  }

  const ulangi = useUlangTekan((tanda: number) =>
    kendali.atur({ [spec.key]: (kendali.nilai[spec.key] ?? spec.awal) + tanda * spec.step }, { halus: true }),
  )

  return (
    <div
      className="chip-angka"
      data-aktif={kendali.aktif === spec.key || undefined}
      style={{ ['--cw' as string]: tinta(warnaPeran(spec.peran)) }}
    >
      <button
        type="button"
        className="chip-angka-tombol"
        aria-label={`Kurangi ${spec.label}`}
        disabled={nilai <= spec.min}
        {...ulangi(-1)}
      >
        <Ikon nama="kurang" />
      </button>
      {edit ? (
        <input
          ref={input}
          className="chip-angka-input"
          inputMode="decimal"
          aria-label={`${spec.label}, dari ${fmt(spec.min)} sampai ${fmt(spec.max)}`}
          value={draf}
          onChange={(e) => setDraf(e.target.value)}
          onBlur={simpan}
          onKeyDown={(e) => {
            if (e.key === 'Enter') simpan()
            if (e.key === 'Escape') setEdit(false)
          }}
        />
      ) : (
        <button
          type="button"
          className="chip-angka-nilai"
          aria-label={`${spec.label} ${teks}${spec.satuan ? ' ' + spec.satuan : ''}. Ketuk untuk mengetik angka.`}
          onClick={() => {
            setDraf(fmt(nilai))
            setEdit(true)
          }}
        >
          <span className="chip-angka-simbol" data-lambang={!!spec.simbol && spec.simbol.length <= 3}>
            {spec.simbol ?? spec.label}
          </span>
          <span className="chip-angka-sama">=</span>
          <b>{teks}</b>
          {spec.satuan && <span className="chip-angka-satuan">{spec.satuan}</span>}
        </button>
      )}
      <button
        type="button"
        className="chip-angka-tombol"
        aria-label={`Tambah ${spec.label}`}
        disabled={nilai >= spec.max}
        {...ulangi(1)}
      >
        <Ikon nama="tambah" />
      </button>
    </div>
  )
}

/** Tekan sekali = satu langkah; tahan = terus berjalan makin cepat. */
function useUlangTekan(aksi: (tanda: number) => void) {
  const ref = useRef(aksi)
  useEffect(() => {
    ref.current = aksi
  })
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const berhenti = () => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
  }
  useEffect(() => berhenti, [])
  return (tanda: number) => ({
    onPointerDown: (e: ReactPointerEvent<HTMLButtonElement>) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return
      ref.current(tanda)
      const lanjut = (jeda: number) => {
        timer.current = setTimeout(() => {
          ref.current(tanda)
          lanjut(Math.max(60, jeda * 0.85))
        }, jeda)
      }
      berhenti()
      lanjut(420)
    },
    onPointerUp: berhenti,
    onPointerLeave: berhenti,
    onPointerCancel: berhenti,
    onKeyDown: (e: ReactKeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        ref.current(tanda)
      }
    },
  })
}

/* ---------------- Mode fokus ---------------- */

export function useModeFokus() {
  const [fokus, setFokus] = useState(false)

  useEffect(() => {
    if (!fokus) return
    const kembali = document.activeElement as HTMLElement | null
    const html = document.documentElement
    const lama = html.style.overflow
    html.style.overflow = 'hidden'
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFokus(false)
    }
    window.addEventListener('keydown', esc)
    return () => {
      html.style.overflow = lama
      window.removeEventListener('keydown', esc)
      kembali?.focus?.()
    }
  }, [fokus])

  return useMemo(
    () => ({
      fokus,
      buka: () => setFokus(true),
      tutup: () => setFokus(false),
      toggle: () => setFokus((f) => !f),
    }),
    [fokus],
  )
}

export function TombolFokus({ fokus, onClick }: { fokus: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className="tombol-fokus"
      onClick={onClick}
      aria-pressed={fokus}
      aria-label={fokus ? 'Keluar dari layar penuh' : 'Buka layar penuh'}
      title={fokus ? 'Keluar dari layar penuh (Esc)' : 'Layar penuh'}
    >
      <Ikon nama={fokus ? 'perkecil' : 'perbesar'} />
    </button>
  )
}
