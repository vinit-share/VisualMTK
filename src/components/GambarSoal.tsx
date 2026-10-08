/* ============================================================
   Visual MTK — Gambar pada soal
   Menggambar spesifikasi ringkas (src/lib/gambar.ts) menjadi SVG.
   Semua gambar memakai lebar koordinat 320 supaya huruf 13 satuan
   tetap terbaca di HP, dan hanya memakai warna dari token.
   ============================================================ */

import { useId, type ReactNode } from 'react'
import type { BentukBenda, KelompokBenda, SpesGambar, WarnaGambar } from '../lib/gambar'
import { fmt, round } from '../lib/num'

const W = 320
const TINTA = 'var(--ink)'
const HALUS = 'var(--ink-soft)'
const GARIS = 'var(--line-strong)'
const KERTAS = 'var(--surface)'

const ISI: Record<WarnaGambar, string> = {
  a: 'var(--m-a)',
  b: 'var(--m-b)',
  ab: 'var(--m-ab)',
  c: 'var(--m-c)',
  hi: 'var(--m-hi)',
}
const LEMBUT: Record<WarnaGambar, string> = {
  a: 'var(--m-a-soft)',
  b: 'var(--m-b-soft)',
  ab: 'var(--m-ab-soft)',
  c: 'var(--m-c-soft)',
  hi: 'var(--m-hi-soft)',
}
const URUT: WarnaGambar[] = ['a', 'b', 'ab', 'c', 'hi']
const BENTUK: BentukBenda[] = ['bulat', 'kotak', 'segitiga', 'bintang', 'hati', 'apel', 'ikan', 'balon']
const NAMA_BENTUK: Record<BentukBenda, string> = {
  bulat: 'bulatan',
  kotak: 'kotak',
  segitiga: 'segitiga',
  bintang: 'bintang',
  hati: 'hati',
  apel: 'apel',
  ikan: 'ikan',
  balon: 'balon',
}

const r2 = (x: number) => round(x, 2)
const adalahWarna = (s: string | undefined): s is WarnaGambar => !!s && s in ISI

/** Jarak antar garis bantu yang "bulat": 1, 2, 2,5, 5, 10, … */
function langkahRapi(rentang: number, sasaran: number) {
  const kasar = Math.max(rentang, 1e-9) / sasaran
  const pangkat = 10 ** Math.floor(Math.log10(kasar))
  for (const k of [1, 2, 2.5, 5, 10]) if (k * pangkat >= kasar - 1e-12) return k * pangkat
  return 10 * pangkat
}

/* ---------------- Kerangka ---------------- */

function Bingkai({ h, alt, children }: { h: number; alt: string; children: ReactNode }) {
  return (
    <svg
      className="gambar-soal"
      viewBox={`0 0 ${W} ${r2(h)}`}
      role="img"
      aria-label={alt}
      focusable="false"
    >
      {children}
    </svg>
  )
}

function Teks({
  x,
  y,
  children,
  rata = 'middle',
  ukuran = 13,
  warna = TINTA,
  tebal = 700,
}: {
  x: number
  y: number
  children: ReactNode
  rata?: 'start' | 'middle' | 'end'
  ukuran?: number
  warna?: string
  tebal?: number
}) {
  return (
    <text
      x={r2(x)}
      y={r2(y)}
      textAnchor={rata}
      fontSize={r2(ukuran)}
      fontWeight={tebal}
      fill={warna}
      stroke={KERTAS}
      strokeWidth={3}
      paintOrder="stroke"
      strokeLinejoin="round"
    >
      {children}
    </text>
  )
}

/* ---------------- Benda ---------------- */

function Benda({
  bentuk,
  x,
  y,
  s,
  warna,
  coret,
}: {
  bentuk: BentukBenda
  x: number
  y: number
  s: number
  warna: WarnaGambar
  coret?: boolean
}) {
  const isi = ISI[warna]
  let rupa: ReactNode
  switch (bentuk) {
    case 'kotak':
      rupa = (
        <rect
          x={r2(-0.4 * s)}
          y={r2(-0.4 * s)}
          width={r2(0.8 * s)}
          height={r2(0.8 * s)}
          rx={r2(0.14 * s)}
          fill={isi}
        />
      )
      break
    case 'segitiga':
      rupa = <path d={`M0 ${r2(-0.44 * s)}L${r2(0.46 * s)} ${r2(0.38 * s)}H${r2(-0.46 * s)}Z`} fill={isi} />
      break
    case 'bintang': {
      const titik = Array.from({ length: 10 }, (_, i) => {
        const jari = (i % 2 === 0 ? 0.48 : 0.21) * s
        const a = (-90 + i * 36) * (Math.PI / 180)
        return `${r2(jari * Math.cos(a))},${r2(jari * Math.sin(a))}`
      }).join(' ')
      rupa = <polygon points={titik} fill={isi} />
      break
    }
    case 'hati':
      rupa = (
        <path
          d="M0 .4C-.66-.04-.34-.54 0-.2 .34-.54 .66-.04 0 .4Z"
          transform={`scale(${r2(s)})`}
          fill={isi}
        />
      )
      break
    case 'apel':
      rupa = (
        <>
          <circle cx={0} cy={r2(0.07 * s)} r={r2(0.36 * s)} fill={isi} />
          <path
            d={`M0 ${r2(-0.28 * s)}V${r2(-0.46 * s)}`}
            stroke={TINTA}
            strokeWidth={1.6}
            strokeLinecap="round"
          />
          <ellipse cx={r2(0.13 * s)} cy={r2(-0.38 * s)} rx={r2(0.12 * s)} ry={r2(0.06 * s)} fill="var(--m-ab)" />
        </>
      )
      break
    case 'ikan':
      rupa = (
        <>
          <ellipse cx={r2(-0.06 * s)} cy={0} rx={r2(0.34 * s)} ry={r2(0.22 * s)} fill={isi} />
          <path d={`M${r2(0.22 * s)} 0L${r2(0.46 * s)} ${r2(-0.2 * s)}V${r2(0.2 * s)}Z`} fill={isi} />
          <circle cx={r2(-0.22 * s)} cy={r2(-0.05 * s)} r={r2(0.04 * s)} fill={KERTAS} />
        </>
      )
      break
    case 'balon':
      rupa = (
        <>
          <ellipse cx={0} cy={r2(-0.1 * s)} rx={r2(0.28 * s)} ry={r2(0.34 * s)} fill={isi} />
          <path
            d={`M0 ${r2(0.24 * s)}q${r2(0.08 * s)} ${r2(0.1 * s)} 0 ${r2(0.22 * s)}`}
            stroke={HALUS}
            strokeWidth={1.4}
            fill="none"
            strokeLinecap="round"
          />
        </>
      )
      break
    default:
      rupa = <circle r={r2(0.42 * s)} fill={isi} />
  }
  return (
    <g transform={`translate(${r2(x)} ${r2(y)})`}>
      <g opacity={coret ? 0.32 : 1}>{rupa}</g>
      {coret && (
        <path
          d={`M${r2(-0.42 * s)} ${r2(0.42 * s)}L${r2(0.42 * s)} ${r2(-0.42 * s)}`}
          stroke={TINTA}
          strokeWidth={2.2}
          strokeLinecap="round"
        />
      )}
    </g>
  )
}

const UKURAN_BENDA = { kecil: 20, sedang: 32, besar: 46 }

/** Ukuran sel dan tata baris satu kelompok benda. */
function tataKelompok(k: KelompokBenda) {
  const banyak = Math.max(0, Math.round(k.banyak))
  const per = Math.max(1, k.per ?? (banyak <= 10 ? 5 : 10))
  const sela = per === 10 ? 10 : 0
  const sel = Math.min(UKURAN_BENDA[k.ukuran ?? 'sedang'] + 6, (W - 20 - sela) / per)
  const kolom = Math.min(per, Math.max(1, banyak))
  return { banyak, per, sela, sel, lebar: kolom * sel + (kolom > 5 ? sela : 0) }
}

function GambarBenda({ kelompok }: { kelompok: KelompokBenda[] }) {
  let y = 6
  const isi: ReactNode[] = []
  const ringkas: string[] = []
  // Semua kelompok mulai dari tepi kiri yang sama, supaya mudah dipasangkan
  // satu-satu, dan seluruhnya diletakkan di tengah gambar.
  const x0 = (W - Math.max(...kelompok.map((k) => tataKelompok(k).lebar))) / 2
  kelompok.forEach((k, ki) => {
    const { banyak, per, sela, sel } = tataKelompok(k)
    const s = sel - 6
    const bentuk = k.bentuk ?? 'bulat'
    const warna = k.warna ?? URUT[ki % URUT.length]
    if (k.label) {
      isi.push(
        <Teks key={`l${ki}`} x={x0} y={y + 12} rata="start">
          {k.label}
        </Teks>,
      )
      y += 20
    }
    const baris = Math.max(1, Math.ceil(banyak / per))
    for (let i = 0; i < banyak; i++) {
      const kol = i % per
      const bar = Math.floor(i / per)
      const x = x0 + kol * sel + sel / 2 + (per === 10 && kol >= 5 ? sela : 0)
      isi.push(
        <Benda
          key={`${ki}-${i}`}
          bentuk={bentuk}
          warna={warna}
          s={s}
          x={x}
          y={y + bar * sel + sel / 2}
          coret={i >= banyak - (k.coret ?? 0)}
        />,
      )
    }
    y += baris * sel + 12
    ringkas.push(
      `${k.label ? `${k.label}: ` : ''}${banyak} ${NAMA_BENTUK[bentuk]}${k.coret ? `, ${k.coret} dicoret` : ''}`,
    )
  })
  return (
    <Bingkai h={y} alt={`Gambar benda. ${ringkas.join('; ')}.`}>
      {isi}
    </Bingkai>
  )
}

/* ---------------- Pola / deretan ---------------- */

function GambarPola({ isi, ujung }: { isi: string[]; ujung?: [string, string] }) {
  const n = Math.max(1, isi.length)
  const adaTeksPanjang = isi.some((t) => {
    const [nama] = t.split(':')
    return !BENTUK.includes(nama as BentukBenda) && t.length > 3
  })
  const sel = Math.min(adaTeksPanjang ? 72 : 46, (W - 12) / n)
  const x0 = (W - sel * n) / 2
  const y0 = 8
  const kotak = sel - 6
  const tinggi = Math.min(kotak, 44)
  return (
    <Bingkai
      h={y0 + tinggi + (ujung ? 28 : 10)}
      alt={`Deretan: ${isi.map((t) => (t === '?' ? 'kotak kosong' : t.replace(':', ' warna '))).join(', ')}.`}
    >
      {isi.map((t, i) => {
        const [nama, w] = t.split(':')
        const cx = x0 + i * sel + sel / 2
        const cy = y0 + tinggi / 2
        const tanya = t === '?'
        const bentuk = BENTUK.includes(nama as BentukBenda) ? (nama as BentukBenda) : null
        return (
          <g key={i}>
            <rect
              x={r2(cx - kotak / 2)}
              y={y0}
              width={r2(kotak)}
              height={r2(tinggi)}
              rx={8}
              fill={tanya ? LEMBUT.hi : 'var(--surface-2)'}
              stroke={tanya ? ISI.hi : GARIS}
              strokeWidth={tanya ? 2 : 1}
              strokeDasharray={tanya ? '5 4' : undefined}
            />
            {bentuk ? (
              <Benda
                bentuk={bentuk}
                warna={adalahWarna(w) ? w : 'a'}
                s={Math.min(kotak, tinggi) * 0.7}
                x={cx}
                y={cy}
              />
            ) : (
              <text
                x={r2(cx)}
                y={r2(cy + 5)}
                textAnchor="middle"
                fontSize={r2(Math.min(16, ((kotak - 6) / Math.max(1, t.length)) * 1.75))}
                fontWeight={800}
                fill={tanya ? 'var(--m-hi-ink)' : TINTA}
              >
                {t}
              </text>
            )}
          </g>
        )
      })}
      {ujung && (
        <>
          <Teks x={x0 + 3} y={y0 + tinggi + 20} rata="start" ukuran={12} warna={HALUS}>
            ← {ujung[0]}
          </Teks>
          <Teks x={x0 + sel * n - 3} y={y0 + tinggi + 20} rata="end" ukuran={12} warna={HALUS}>
            {ujung[1]} →
          </Teks>
        </>
      )}
    </Bingkai>
  )
}

/* ---------------- Blok nilai tempat ---------------- */

function GambarBlok({
  ribuan = 0,
  ratusan = 0,
  puluhan = 0,
  satuan = 0,
}: {
  ribuan?: number
  ratusan?: number
  puluhan?: number
  satuan?: number
}) {
  const besar = ribuan > 0 || ratusan > 0
  const u = besar ? 4.6 : 6
  const sisi = 10 * u
  type JenisBlok = 'ribu' | 'ratus' | 'puluh' | 'satu'
  type Butir = { w: number; h: number; jenis: JenisBlok; isi?: number }
  const butir: Butir[] = []
  for (let i = 0; i < ribuan; i++) butir.push({ w: sisi + 8, h: sisi + 8, jenis: 'ribu' })
  for (let i = 0; i < ratusan; i++) butir.push({ w: sisi, h: sisi, jenis: 'ratus' })
  for (let i = 0; i < puluhan; i++) butir.push({ w: Math.max(u, 7), h: sisi, jenis: 'puluh' })
  // Kubus satuan disusun per kolom berisi paling banyak 5.
  for (let i = 0; i < satuan; i += 5) {
    butir.push({ w: 10, h: sisi, jenis: 'satu', isi: Math.min(5, satuan - i) })
  }

  let x = 10
  let y = 8
  let tinggiBaris = 0
  let sebelum: JenisBlok | null = null
  const gambar: ReactNode[] = []
  butir.forEach((b, i) => {
    if (sebelum) x += sebelum !== b.jenis ? 16 : b.jenis === 'ratus' || b.jenis === 'ribu' ? 7 : 5
    if (x + b.w > W - 8) {
      x = 10
      y += tinggiBaris + 12
      tinggiBaris = 0
    }
    tinggiBaris = Math.max(tinggiBaris, b.h)
    const pindah = `translate(${r2(x)} ${r2(y)})`
    if (b.jenis === 'ribu') {
      gambar.push(
        <g key={i} transform={pindah}>
          <rect x={8} y={0} width={sisi} height={sisi} fill={LEMBUT.c} stroke={ISI.c} strokeWidth={1.2} />
          <rect x={4} y={4} width={sisi} height={sisi} fill={LEMBUT.c} stroke={ISI.c} strokeWidth={1.2} />
          <rect x={0} y={8} width={sisi} height={sisi} fill={LEMBUT.c} stroke={ISI.c} strokeWidth={1.6} />
          <text
            x={sisi / 2}
            y={r2(8 + sisi / 2 + 4)}
            textAnchor="middle"
            fontSize={11}
            fontWeight={800}
            fill="var(--blue-ink)"
          >
            1.000
          </text>
        </g>,
      )
    } else if (b.jenis === 'ratus') {
      gambar.push(
        <g key={i} transform={pindah}>
          <rect width={sisi} height={sisi} fill={LEMBUT.ab} stroke={ISI.ab} strokeWidth={1.6} />
          {Array.from({ length: 9 }, (_, k) => (
            <path
              key={k}
              d={`M${r2((k + 1) * u)} 0V${sisi}M0 ${r2((k + 1) * u)}H${sisi}`}
              stroke={ISI.ab}
              strokeWidth={0.5}
              opacity={0.7}
            />
          ))}
        </g>,
      )
    } else if (b.jenis === 'puluh') {
      gambar.push(
        <g key={i} transform={pindah}>
          <rect width={b.w} height={sisi} fill={LEMBUT.a} stroke={ISI.a} strokeWidth={1.4} />
          {Array.from({ length: 9 }, (_, k) => (
            <path key={k} d={`M0 ${r2((k + 1) * u)}H${b.w}`} stroke={ISI.a} strokeWidth={0.7} />
          ))}
        </g>,
      )
    } else {
      gambar.push(
        <g key={i} transform={pindah}>
          {Array.from({ length: b.isi ?? 0 }, (_, k) => (
            <rect
              key={k}
              x={0.5}
              y={r2(sisi - 9 - k * 11.5)}
              width={9}
              height={9}
              rx={1.5}
              fill={LEMBUT.b}
              stroke={ISI.b}
              strokeWidth={1.4}
            />
          ))}
        </g>,
      )
    }
    x += b.w
    sebelum = b.jenis
  })
  const bagian = [
    ribuan ? `${ribuan} ribuan` : '',
    ratusan ? `${ratusan} ratusan` : '',
    puluhan ? `${puluhan} puluhan` : '',
    `${satuan} satuan`,
  ].filter(Boolean)
  return (
    <Bingkai h={y + Math.max(tinggiBaris, 20) + 8} alt={`Blok nilai tempat: ${bagian.join(', ')}.`}>
      {gambar}
    </Bingkai>
  )
}

/* ---------------- Garis bilangan ---------------- */

function GambarGaris(p: Extract<SpesGambar, { jenis: 'garis' }>) {
  const langkah = p.langkah && p.langkah > 0 ? p.langkah : 1
  const rentang = p.sampai - p.dari || 1
  const n = Math.max(1, Math.round(rentang / langkah))
  const jarakLabel = p.label && p.label > 0 ? p.label : langkah * Math.ceil(n / 11)
  const adaLompat = (p.lompat ?? []).length > 0
  const yg = adaLompat ? 52 : 22
  const X = (v: number) => 22 + ((v - p.dari) / rentang) * (W - 44)
  const tulis = (v: number) => {
    if (p.penyebut && p.penyebut > 0) {
      const k = Math.round(v * p.penyebut)
      return k % p.penyebut === 0 ? fmt(k / p.penyebut) : `${k}/${p.penyebut}`
    }
    return fmt(round(v, 6))
  }
  const sama = (a: number, b: number) => Math.abs(a - b) < langkah / 1000
  const tanya = p.tanya ?? []
  const tanda = p.tanda ?? []
  const nLabel = Math.max(1, Math.round(rentang / jarakLabel))
  return (
    <Bingkai
      h={yg + 40}
      alt={`Garis bilangan dari ${tulis(p.dari)} sampai ${tulis(p.sampai)}${
        tanda.length ? `, ada titik yang ditandai` : ''
      }${tanya.length ? `, ada ${tanya.length} bilangan yang ditanyakan` : ''}.`}
    >
      <path d={`M8 ${yg}H${W - 8}`} stroke={TINTA} strokeWidth={2} strokeLinecap="round" />
      <path
        d={`M14 ${yg - 5}L8 ${yg}L14 ${yg + 5}M${W - 14} ${yg - 5}L${W - 8} ${yg}L${W - 14} ${yg + 5}`}
        stroke={TINTA}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {Array.from({ length: n + 1 }, (_, i) => {
        const v = p.dari + i * langkah
        return <path key={i} d={`M${r2(X(v))} ${yg - 6}V${yg + 6}`} stroke={TINTA} strokeWidth={1.5} />
      })}
      {Array.from({ length: nLabel + 1 }, (_, i) => {
        const v = p.dari + i * jarakLabel
        if (v > p.sampai + langkah / 1000 || tanya.some((t) => sama(t, v))) return null
        return (
          <Teks key={`a${i}`} x={X(v)} y={yg + 24} ukuran={12.5}>
            {tulis(v)}
          </Teks>
        )
      })}
      {tanya.map((v, i) => (
        <g key={`t${i}`}>
          <rect
            x={r2(X(v) - 11)}
            y={yg + 10}
            width={22}
            height={20}
            rx={5}
            fill={LEMBUT.hi}
            stroke={ISI.hi}
            strokeWidth={1.6}
            strokeDasharray="4 3"
          />
          <text x={r2(X(v))} y={yg + 25} textAnchor="middle" fontSize={13} fontWeight={800} fill="var(--m-hi-ink)">
            ?
          </text>
        </g>
      ))}
      {(p.lompat ?? []).map(([a, b], i) => {
        const xa = X(a)
        const xb = X(b)
        const t = Math.min(34, 10 + Math.abs(xb - xa) * 0.4)
        const arah = xb >= xa ? 1 : -1
        return (
          <g key={`j${i}`} stroke={ISI.b} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path
              d={`M${r2(xa)} ${yg - 8}Q${r2((xa + xb) / 2)} ${r2(yg - 8 - t * 1.6)} ${r2(xb)} ${yg - 8}`}
            />
            <path d={`M${r2(xb - arah * 6)} ${yg - 15}L${r2(xb)} ${yg - 8}L${r2(xb - arah * 8)} ${yg - 7}`} />
          </g>
        )
      })}
      {tanda.map((v, i) => (
        <circle key={`d${i}`} cx={r2(X(v))} cy={yg} r={5.5} fill={ISI.hi} stroke={KERTAS} strokeWidth={1.5} />
      ))}
    </Bingkai>
  )
}

/* ---------------- Pecahan ---------------- */

function juring(cx: number, cy: number, r: number, a0: number, a1: number) {
  const t = (a: number) => [cx + r * Math.cos(a), cy + r * Math.sin(a)]
  const [x0, y0] = t(a0)
  const [x1, y1] = t(a1)
  const besar = a1 - a0 > Math.PI ? 1 : 0
  return `M${r2(cx)} ${r2(cy)}L${r2(x0)} ${r2(y0)}A${r} ${r} 0 ${besar} 1 ${r2(x1)} ${r2(y1)}Z`
}

function GambarPecahan({
  isi,
  bentuk = 'batang',
}: {
  isi: [number, number][]
  bentuk?: 'batang' | 'lingkaran'
}) {
  const alt = `Gambar pecahan: ${isi.map(([a, b]) => `${a} dari ${b} bagian diarsir`).join('; ')}.`
  if (bentuk === 'lingkaran') {
    const r = 32
    let x = 12
    let y = 8
    const gambar: ReactNode[] = []
    isi.forEach(([arsir, bagianMentah], ii) => {
      const bagian = Math.max(1, Math.round(bagianMentah))
      const utuh = Math.max(1, Math.ceil(arsir / bagian))
      const warna = URUT[ii % URUT.length]
      if (ii > 0) x += 14
      for (let u = 0; u < utuh; u++) {
        if (x + 2 * r > W - 8) {
          x = 12
          y += 2 * r + 12
        }
        const cx = x + r
        const cy = y + r
        const terisi = Math.max(0, Math.min(bagian, arsir - u * bagian))
        gambar.push(
          <g key={`${ii}-${u}`}>
            <circle cx={cx} cy={cy} r={r} fill={KERTAS} stroke={ISI[warna]} strokeWidth={1.8} />
            {bagian === 1 && terisi >= 1 && (
              <circle cx={cx} cy={cy} r={r} fill={ISI[warna]} fillOpacity={0.55} stroke={ISI[warna]} strokeWidth={1.8} />
            )}
            {bagian > 1 &&
              Array.from({ length: bagian }, (_, k) => {
                const a0 = -Math.PI / 2 + (k * 2 * Math.PI) / bagian
                const a1 = -Math.PI / 2 + ((k + 1) * 2 * Math.PI) / bagian
                return (
                  <path
                    key={k}
                    d={juring(cx, cy, r, a0, a1)}
                    fill={k < terisi ? ISI[warna] : 'none'}
                    fillOpacity={0.55}
                    stroke={ISI[warna]}
                    strokeWidth={1.4}
                    strokeLinejoin="round"
                  />
                )
              })}
          </g>,
        )
        x += 2 * r + 8
      }
    })
    return (
      <Bingkai h={y + 2 * r + 8} alt={alt}>
        {gambar}
      </Bingkai>
    )
  }
  const tinggi = 30
  return (
    <Bingkai h={8 + isi.length * (tinggi + 12)} alt={alt}>
      {isi.map(([arsir, bagianMentah], ii) => {
        const bagian = Math.max(1, Math.round(bagianMentah))
        const utuh = Math.max(1, Math.ceil(arsir / bagian))
        const lebarUtuh = (W - 24 - (utuh - 1) * 10) / utuh
        const lebar = lebarUtuh / bagian
        const warna = URUT[ii % URUT.length]
        const y = 8 + ii * (tinggi + 12)
        return (
          <g key={ii}>
            {Array.from({ length: utuh * bagian }, (_, k) => {
              const u = Math.floor(k / bagian)
              const x = 12 + u * (lebarUtuh + 10) + (k % bagian) * lebar
              return (
                <rect
                  key={k}
                  x={r2(x)}
                  y={y}
                  width={r2(lebar)}
                  height={tinggi}
                  fill={k < arsir ? ISI[warna] : KERTAS}
                  fillOpacity={k < arsir ? 0.55 : 1}
                  stroke={ISI[warna]}
                  strokeWidth={1.5}
                />
              )
            })}
          </g>
        )
      })}
    </Bingkai>
  )
}

/* ---------------- Jam ---------------- */

function GambarJam({ jam, menit }: { jam: number; menit: number }) {
  const cx = W / 2
  const cy = 92
  const r = 80
  const ke = (sudut: number, jari: number) => {
    const a = ((sudut - 90) * Math.PI) / 180
    return [cx + jari * Math.cos(a), cy + jari * Math.sin(a)]
  }
  const [jx, jy] = ke(((jam % 12) + menit / 60) * 30, 44)
  const [mx, my] = ke(menit * 6, 64)
  const angkaJam = jam % 12 || 12
  return (
    <Bingkai
      h={184}
      alt={`Jam analog: jarum pendek ${
        menit === 0 ? `tepat di angka ${angkaJam}` : `di antara angka ${angkaJam} dan ${(angkaJam % 12) + 1}`
      }, jarum panjang di ${menit % 5 === 0 ? `angka ${menit / 5 || 12}` : `menit ke-${menit}`}.`}
    >
      <circle cx={cx} cy={cy} r={r} fill="var(--surface-2)" stroke={TINTA} strokeWidth={2.5} />
      {Array.from({ length: 60 }, (_, i) => {
        const [x0, y0] = ke(i * 6, r - (i % 5 === 0 ? 9 : 4))
        const [x1, y1] = ke(i * 6, r - 1.5)
        return (
          <path
            key={i}
            d={`M${r2(x0)} ${r2(y0)}L${r2(x1)} ${r2(y1)}`}
            stroke={i % 5 === 0 ? TINTA : HALUS}
            strokeWidth={i % 5 === 0 ? 1.8 : 0.8}
          />
        )
      })}
      {Array.from({ length: 12 }, (_, i) => {
        const [x, y] = ke((i + 1) * 30, r - 21)
        return (
          <text key={i} x={r2(x)} y={r2(y + 4.5)} textAnchor="middle" fontSize={13} fontWeight={800} fill={TINTA}>
            {i + 1}
          </text>
        )
      })}
      <path d={`M${cx} ${cy}L${r2(jx)} ${r2(jy)}`} stroke={TINTA} strokeWidth={5.5} strokeLinecap="round" />
      <path d={`M${cx} ${cy}L${r2(mx)} ${r2(my)}`} stroke={ISI.a} strokeWidth={3.5} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={5} fill={TINTA} />
    </Bingkai>
  )
}

/* ---------------- Diagram batang ---------------- */

function GambarBatang(p: Extract<SpesGambar, { jenis: 'batang' }>) {
  const n = Math.max(1, p.nilai.length)
  const maks = Math.max(1e-9, ...p.nilai)
  const langkah = langkahRapi(maks, 5)
  const puncak = Math.ceil(maks / langkah - 1e-9) * langkah
  const x0 = 40
  const x1 = W - 8
  const y0 = p.sumbu ? 26 : 14
  const y1 = 150
  const Y = (v: number) => y1 - (v / puncak) * (y1 - y0)
  const pita = (x1 - x0) / n
  const lebar = Math.min(40, pita * 0.62)
  return (
    <Bingkai
      h={176}
      alt={`Diagram batang${p.sumbu ? ` ${p.sumbu}` : ''}: ${p.label
        .map((l, i) => `${l} ${fmt(p.nilai[i] ?? 0)}`)
        .join(', ')}.`}
    >
      {p.sumbu && (
        <Teks x={6} y={13} rata="start" ukuran={11.5} warna={HALUS}>
          {p.sumbu}
        </Teks>
      )}
      {Array.from({ length: Math.round(puncak / langkah) + 1 }, (_, i) => {
        const v = i * langkah
        return (
          <g key={i}>
            <path
              d={`M${x0} ${r2(Y(v))}H${x1}`}
              stroke={i === 0 ? TINTA : 'var(--m-grid)'}
              strokeWidth={i === 0 ? 1.8 : 1}
            />
            <text x={x0 - 6} y={r2(Y(v) + 4)} textAnchor="end" fontSize={11} fontWeight={700} fill={HALUS}>
              {fmt(round(v, 6))}
            </text>
          </g>
        )
      })}
      {p.nilai.map((v, i) => {
        const cx = x0 + pita * (i + 0.5)
        const nama = p.label[i] ?? ''
        return (
          <g key={i}>
            <rect
              x={r2(cx - lebar / 2)}
              y={r2(Y(v))}
              width={r2(lebar)}
              height={r2(Math.max(0, y1 - Y(v)))}
              rx={3}
              fill={ISI.a}
              fillOpacity={0.8}
            />
            {p.angka && (
              <Teks x={cx} y={Y(v) - 5} ukuran={11.5}>
                {fmt(v)}
              </Teks>
            )}
            <text
              x={r2(cx)}
              y={y1 + 16}
              textAnchor="middle"
              fontSize={r2(Math.min(11.5, (pita / Math.max(3, nama.length)) * 1.7))}
              fontWeight={700}
              fill={TINTA}
            >
              {nama}
            </text>
          </g>
        )
      })}
    </Bingkai>
  )
}

/* ---------------- Diagram lingkaran ---------------- */

const WARNA_PAI = [ISI.a, ISI.b, ISI.ab, ISI.c, ISI.hi, 'var(--ink-soft)', 'var(--surface-3)']

function GambarPai(p: Extract<SpesGambar, { jenis: 'pai' }>) {
  const total = p.nilai.reduce((a, b) => a + Math.max(0, b), 0) || 1
  const cx = 82
  const cy = 82
  const r = 70
  let a = -Math.PI / 2
  const tinggi = Math.max(164, 20 + p.label.length * 22)
  const persen = (i: number) => fmt(round((100 * Math.max(0, p.nilai[i] ?? 0)) / total, 1))
  return (
    <Bingkai
      h={tinggi}
      alt={`Diagram lingkaran dengan bagian: ${p.label
        .map((l, i) => (p.persen ? `${l} ${persen(i)} persen` : l))
        .join(', ')}.`}
    >
      {p.nilai.map((v, i) => {
        const bagian = Math.max(0, v) / total
        const a0 = a
        const a1 = a + bagian * 2 * Math.PI
        a = a1
        const warna = WARNA_PAI[i % WARNA_PAI.length]
        if (bagian >= 0.9999) return <circle key={i} cx={cx} cy={cy} r={r} fill={warna} />
        if (bagian <= 0) return null
        return (
          <path key={i} d={juring(cx, cy, r, a0, a1)} fill={warna} stroke={KERTAS} strokeWidth={1.5} strokeLinejoin="round" />
        )
      })}
      {p.label.map((l, i) => (
        <g key={`k${i}`}>
          <rect x={170} y={14 + i * 22} width={13} height={13} rx={3} fill={WARNA_PAI[i % WARNA_PAI.length]} />
          <text x={190} y={25 + i * 22} fontSize={12} fontWeight={700} fill={TINTA}>
            {l}
            {p.persen ? ` — ${persen(i)}%` : ''}
          </text>
        </g>
      ))}
    </Bingkai>
  )
}

/* ---------------- Bangun ---------------- */

function GambarBangun({ bentuk, label = {} }: Extract<SpesGambar, { jenis: 'bangun' }>) {
  const L = label
  const tepi = ISI.a
  const gaya = { fill: LEMBUT.a, stroke: tepi, strokeWidth: 2.2, strokeLinejoin: 'round' as const }
  const putus = { stroke: HALUS, strokeWidth: 1.6, strokeDasharray: '5 4', fill: 'none' }
  const tegas = {
    strokeWidth: 2.2,
    fill: 'none',
    strokeLinejoin: 'round' as const,
    strokeLinecap: 'round' as const,
  }
  const siku = (x: number, y: number, dx: number, dy: number) => (
    <path d={`M${x + dx} ${y}V${y + dy}H${x}`} stroke={HALUS} strokeWidth={1.4} fill="none" />
  )
  let rupa: ReactNode = null
  switch (bentuk) {
    case 'persegi':
      rupa = (
        <>
          <rect x={100} y={24} width={120} height={120} {...gaya} />
          {L.s && <Teks x={160} y={164}>{L.s}</Teks>}
        </>
      )
      break
    case 'persegi-panjang':
      rupa = (
        <>
          <rect x={60} y={36} width={190} height={104} {...gaya} />
          {L.p && <Teks x={155} y={160}>{L.p}</Teks>}
          {L.l && (
            <Teks x={258} y={93} rata="start">
              {L.l}
            </Teks>
          )}
        </>
      )
      break
    case 'segitiga':
      rupa = (
        <>
          <path d="M60 146H250L190 28Z" {...gaya} />
          {L.tinggi && (
            <>
              <path d="M190 28V146" {...putus} />
              {siku(190, 146, -10, -10)}
              <Teks x={196} y={98} rata="start">
                {L.tinggi}
              </Teks>
            </>
          )}
          {L.alas && <Teks x={155} y={166}>{L.alas}</Teks>}
          {L.kiri && (
            <Teks x={116} y={82} rata="end">
              {L.kiri}
            </Teks>
          )}
          {L.kanan && (
            <Teks x={230} y={82} rata="start">
              {L.kanan}
            </Teks>
          )}
        </>
      )
      break
    case 'segitiga-siku':
      rupa = (
        <>
          <path d="M90 146H250L90 36Z" {...gaya} />
          {siku(90, 146, 12, -12)}
          {L.alas && <Teks x={170} y={166}>{L.alas}</Teks>}
          {L.tegak && (
            <Teks x={82} y={96} rata="end">
              {L.tegak}
            </Teks>
          )}
          {L.miring && (
            <Teks x={178} y={82} rata="start">
              {L.miring}
            </Teks>
          )}
        </>
      )
      break
    case 'jajargenjang':
      rupa = (
        <>
          <path d="M56 146H216L262 46H102Z" {...gaya} />
          {L.tinggi && (
            <>
              <path d="M102 46V146" {...putus} />
              {siku(102, 146, 10, -10)}
              <Teks x={108} y={100} rata="start">
                {L.tinggi}
              </Teks>
            </>
          )}
          {L.alas && <Teks x={136} y={166}>{L.alas}</Teks>}
          {L.miring && (
            <Teks x={246} y={104} rata="start">
              {L.miring}
            </Teks>
          )}
        </>
      )
      break
    case 'trapesium':
      rupa = (
        <>
          <path d="M50 146H270L218 50H112Z" {...gaya} />
          {L.tinggi && (
            <>
              <path d="M112 50V146" {...putus} />
              {siku(112, 146, 10, -10)}
              <Teks x={118} y={102} rata="start">
                {L.tinggi}
              </Teks>
            </>
          )}
          {L.atas && <Teks x={165} y={42}>{L.atas}</Teks>}
          {L.bawah && <Teks x={160} y={166}>{L.bawah}</Teks>}
        </>
      )
      break
    case 'belah-ketupat':
      rupa = (
        <>
          <path d="M160 16L250 88L160 160L70 88Z" {...gaya} />
          <path d="M70 88H250M160 16V160" {...putus} />
          {L.d1 && <Teks x={206} y={82}>{L.d1}</Teks>}
          {L.d2 && (
            <Teks x={166} y={54} rata="start">
              {L.d2}
            </Teks>
          )}
        </>
      )
      break
    case 'layang-layang':
      rupa = (
        <>
          <path d="M160 14L232 66L160 164L88 66Z" {...gaya} />
          <path d="M88 66H232M160 14V164" {...putus} />
          {L.d1 && <Teks x={198} y={60}>{L.d1}</Teks>}
          {L.d2 && (
            <Teks x={166} y={118} rata="start">
              {L.d2}
            </Teks>
          )}
        </>
      )
      break
    case 'lingkaran':
      rupa = (
        <>
          <circle cx={160} cy={88} r={70} {...gaya} />
          {(L.d || L.r) && (
            <>
              <path d={L.d ? 'M90 88H230' : 'M160 88H230'} {...tegas} stroke={ISI.b} />
              <circle cx={160} cy={88} r={3.5} fill={TINTA} />
            </>
          )}
          {L.d && <Teks x={160} y={80}>{L.d}</Teks>}
          {!L.d && L.r && <Teks x={196} y={80}>{L.r}</Teks>}
        </>
      )
      break
    case 'kubus':
      rupa = (
        <>
          <path d="M96 60H186V150H96Z" {...gaya} />
          <path d="M96 60L132 30H222L186 60M222 30V120L186 150" {...gaya} />
          <path d="M132 30V120H222M132 120L96 150" {...putus} />
          {L.s && <Teks x={141} y={168}>{L.s}</Teks>}
        </>
      )
      break
    case 'balok':
      rupa = (
        <>
          <path d="M66 72H216V150H66Z" {...gaya} />
          <path d="M66 72L106 40H256L216 72M256 40V118L216 150" {...gaya} />
          <path d="M106 40V118H256M106 118L66 150" {...putus} />
          {L.p && <Teks x={141} y={168}>{L.p}</Teks>}
          {L.l && (
            <Teks x={244} y={146} rata="start">
              {L.l}
            </Teks>
          )}
          {L.t && (
            <Teks x={58} y={116} rata="end">
              {L.t}
            </Teks>
          )}
        </>
      )
      break
    case 'tabung':
      rupa = (
        <>
          <path d="M96 40V140A64 17 0 0 0 224 140V40" {...gaya} />
          <ellipse cx={160} cy={40} rx={64} ry={17} {...gaya} />
          <path d="M96 140A64 17 0 0 1 224 140" {...putus} />
          {L.r && (
            <>
              <path d="M160 40H224" {...tegas} stroke={ISI.b} />
              <circle cx={160} cy={40} r={3} fill={TINTA} />
              <Teks x={192} y={34}>{L.r}</Teks>
            </>
          )}
          {L.t && (
            <Teks x={232} y={96} rata="start">
              {L.t}
            </Teks>
          )}
        </>
      )
      break
    case 'kerucut':
      rupa = (
        <>
          <path d="M160 20L94 144A66 17 0 0 0 226 144Z" {...gaya} />
          <path d="M94 144A66 17 0 0 1 226 144" {...putus} />
          {L.t && (
            <>
              <path d="M160 20V144" {...putus} />
              <Teks x={154} y={92} rata="end">
                {L.t}
              </Teks>
            </>
          )}
          {L.r && (
            <>
              <path d="M160 144H226" {...tegas} stroke={ISI.b} />
              <Teks x={194} y={138}>{L.r}</Teks>
            </>
          )}
          {L.s && (
            <Teks x={204} y={78} rata="start">
              {L.s}
            </Teks>
          )}
        </>
      )
      break
    case 'bola':
      rupa = (
        <>
          <circle cx={160} cy={88} r={70} {...gaya} />
          <path d="M90 88A70 19 0 0 0 230 88" {...tegas} stroke={tepi} strokeWidth={1.6} />
          <path d="M90 88A70 19 0 0 1 230 88" {...putus} />
          {L.r && (
            <>
              <path d="M160 88H230" {...tegas} stroke={ISI.b} />
              <circle cx={160} cy={88} r={3.5} fill={TINTA} />
              <Teks x={196} y={80}>{L.r}</Teks>
            </>
          )}
        </>
      )
      break
    case 'limas':
      rupa = (
        <>
          <path d="M165 18L74 142H206Z" {...gaya} />
          <path d="M165 18L206 142L250 106Z" {...gaya} />
          <path d="M74 142L118 106H250M118 106L165 18" {...putus} />
          {L.t && (
            <>
              <path d="M165 18V124" {...putus} />
              <Teks x={171} y={84} rata="start">
                {L.t}
              </Teks>
            </>
          )}
          {L.s && <Teks x={140} y={162}>{L.s}</Teks>}
        </>
      )
      break
    case 'prisma':
      rupa = (
        <>
          <path d="M64 150H164L114 60Z" {...gaya} />
          <path d="M114 60L200 30L250 120L164 150Z" {...gaya} />
          <path d="M64 150L150 120H250M150 120L200 30" {...putus} />
          {L.tinggi && (
            <>
              <path d="M114 60V150" {...putus} />
              <Teks x={120} y={114} rata="start">
                {L.tinggi}
              </Teks>
            </>
          )}
          {L.alas && <Teks x={114} y={168}>{L.alas}</Teks>}
          {L.panjang && (
            <Teks x={216} y={150} rata="start">
              {L.panjang}
            </Teks>
          )}
        </>
      )
      break
  }
  const ukuran = Object.entries(L)
    .map(([k, v]) => `${k} ${v}`)
    .join(', ')
  return (
    <Bingkai h={176} alt={`Gambar ${bentuk.replace(/-/g, ' ')}${ukuran ? ` dengan ${ukuran}` : ''}.`}>
      {rupa}
    </Bingkai>
  )
}

/* ---------------- Sudut ---------------- */

function GambarSudut({ besar, label }: { besar: number; label?: string }) {
  const lebih = besar > 180
  const cx = 160
  const cy = lebih ? 104 : 148
  const pj = lebih ? 92 : 130
  const ke = (derajat: number, jari: number) => {
    const a = (derajat * Math.PI) / 180
    return [cx + jari * Math.cos(a), cy - jari * Math.sin(a)]
  }
  const [x1, y1] = ke(0, pj)
  const [x2, y2] = ke(besar, pj)
  const rb = 30
  const [bx0, by0] = ke(0, rb)
  const [bx1, by1] = ke(besar, rb)
  const [tx, ty] = ke(besar / 2, rb + 20)
  const siku = Math.abs(besar - 90) < 1e-9
  return (
    <Bingkai h={lebih ? 208 : 168} alt={`Gambar sebuah sudut${label && label !== '?' ? ` ${label}` : ''}.`}>
      {siku ? (
        <path d={`M${cx + 16} ${cy}V${cy - 16}H${cx}`} fill={LEMBUT.b} stroke={ISI.b} strokeWidth={2} />
      ) : (
        <path
          d={`M${cx} ${cy}L${r2(bx0)} ${r2(by0)}A${rb} ${rb} 0 ${besar > 180 ? 1 : 0} 0 ${r2(bx1)} ${r2(by1)}Z`}
          fill={LEMBUT.b}
          stroke={ISI.b}
          strokeWidth={2}
          strokeLinejoin="round"
        />
      )}
      <path
        d={`M${r2(x1)} ${r2(y1)}L${cx} ${cy}L${r2(x2)} ${r2(y2)}`}
        stroke={ISI.a}
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={cx} cy={cy} r={4} fill={TINTA} />
      {label && <Teks x={tx} y={ty + 5}>{label}</Teks>}
    </Bingkai>
  )
}

/* ---------------- Bidang koordinat ---------------- */

function GambarGrafik(p: Extract<SpesGambar, { jenis: 'grafik' }>) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '')
  const [xa, xb] = p.x
  const [ya, yb] = p.y
  const rx = xb - xa || 1
  const ry = yb - ya || 1
  const kiri = 30
  const kanan = W - 10
  const atas = 12
  const lebar = kanan - kiri
  const tinggi = Math.min(250, Math.max(140, (lebar * ry) / rx))
  const bawah = atas + tinggi
  const X = (x: number) => kiri + ((x - xa) / rx) * lebar
  const Y = (y: number) => bawah - ((y - ya) / ry) * tinggi
  const sx = p.pi ? Math.PI / 2 : (p.langkah?.[0] ?? langkahRapi(rx, 10))
  const sy = p.langkah?.[1] ?? langkahRapi(ry, 8)
  const deret = (a: number, b: number, s: number) => {
    const awal = Math.ceil(a / s - 1e-9)
    const akhir = Math.floor(b / s + 1e-9)
    return Array.from({ length: Math.max(0, akhir - awal + 1) }, (_, i) => round((awal + i) * s, 9))
  }
  const kisiX = deret(xa, xb, sx)
  const kisiY = deret(ya, yb, sy)
  const sumbuX = Y(Math.min(yb, Math.max(ya, 0)))
  const sumbuY = X(Math.min(xb, Math.max(xa, 0)))
  const jarangX = kisiX.length > (p.pi ? 9 : 12) ? 2 : 1
  // Sumbu-x dalam kelipatan π: π/2, π, 3π/2, …
  const tulisX = (x: number) => {
    if (!p.pi) return fmt(x)
    const k = Math.round(x / (Math.PI / 2))
    const tanda = k < 0 ? '−' : ''
    const m = Math.abs(k)
    if (m % 2 === 0) return `${tanda}${m / 2 === 1 ? '' : m / 2}π`
    return `${tanda}${m === 1 ? '' : m}π/2`
  }
  const jarangY = kisiY.length > 12 ? 2 : 1

  const jalur = (f: (x: number) => number) => {
    let d = ''
    let sambung = false
    let ySebelum = 0
    for (let i = 0; i <= 160; i++) {
      const x = xa + (rx * i) / 160
      const y = f(x)
      const layak = Number.isFinite(y) && Math.abs(y) < 1e6
      if (!layak) {
        sambung = false
        continue
      }
      // Lompatan sangat besar berarti asimtot: putuskan garisnya.
      if (sambung && Math.abs(y - ySebelum) > ry * 3) sambung = false
      // Dijepit sedikit di luar bidang supaya angka jalurnya tetap wajar.
      const yj = Math.min(yb + ry, Math.max(ya - ry, y))
      d += `${sambung ? 'L' : 'M'}${r2(X(x))} ${r2(Y(yj))}`
      sambung = true
      ySebelum = y
    }
    return d
  }

  let daerah = ''
  const fa = p.arsir ? p.kurva?.[p.arsir.kurva] : undefined
  if (p.arsir && fa) {
    const { dari, sampai } = p.arsir
    daerah = `M${r2(X(dari))} ${r2(Y(0))}`
    for (let i = 0; i <= 60; i++) {
      const x = dari + ((sampai - dari) * i) / 60
      const y = fa(x)
      daerah += `L${r2(X(x))} ${r2(Y(Number.isFinite(y) ? y : 0))}`
    }
    daerah += `L${r2(X(sampai))} ${r2(Y(0))}Z`
  }
  const titik = p.titik ?? []

  return (
    <Bingkai
      h={bawah + 22}
      alt={`Bidang koordinat dengan x dari ${fmt(xa)} sampai ${fmt(xb)} dan y dari ${fmt(ya)} sampai ${fmt(yb)}${
        titik.length
          ? `; titik ${titik.map((t) => `${t.label ?? ''} (${fmt(t.x)}; ${fmt(t.y)})`).join(', ')}`
          : ''
      }.`}
    >
      <clipPath id={`klip-${id}`}>
        <rect x={kiri} y={atas} width={lebar} height={r2(tinggi)} />
      </clipPath>
      {kisiX.map((x) => (
        <path key={`x${x}`} d={`M${r2(X(x))} ${atas}V${r2(bawah)}`} stroke="var(--m-grid)" strokeWidth={1} />
      ))}
      {kisiY.map((y) => (
        <path key={`y${y}`} d={`M${kiri} ${r2(Y(y))}H${kanan}`} stroke="var(--m-grid)" strokeWidth={1} />
      ))}
      <path
        d={`M${kiri} ${r2(sumbuX)}H${kanan}M${r2(sumbuY)} ${atas}V${r2(bawah)}`}
        stroke="var(--m-axis)"
        strokeWidth={1.6}
      />
      {kisiX.map((x, i) =>
        i % jarangX === 0 && Math.abs(x) > 1e-9 ? (
          <text
            key={`tx${x}`}
            x={r2(X(x))}
            y={r2(Math.min(bawah + 14, sumbuX + 13))}
            textAnchor="middle"
            fontSize={10.5}
            fontWeight={700}
            fill={HALUS}
          >
            {tulisX(x)}
          </text>
        ) : null,
      )}
      {kisiY.map((y, i) =>
        i % jarangY === 0 && Math.abs(y) > 1e-9 ? (
          <text
            key={`ty${y}`}
            x={r2(Math.max(kiri - 4, sumbuY - 5))}
            y={r2(Y(y) + 3.5)}
            textAnchor="end"
            fontSize={10.5}
            fontWeight={700}
            fill={HALUS}
          >
            {fmt(y)}
          </text>
        ) : null,
      )}
      <g clipPath={`url(#klip-${id})`}>
        {daerah && <path d={daerah} fill={ISI.a} fillOpacity={0.22} />}
        {(p.kurva ?? []).map((f, i) => (
          <path
            key={i}
            d={jalur(f)}
            stroke={ISI[URUT[i % URUT.length]]}
            strokeWidth={2.4}
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}
        {(p.ruas ?? []).map(([xr1, yr1, xr2, yr2], i) => (
          <path
            key={`r${i}`}
            d={`M${r2(X(xr1))} ${r2(Y(yr1))}L${r2(X(xr2))} ${r2(Y(yr2))}`}
            stroke={ISI.c}
            strokeWidth={2.2}
            strokeLinecap="round"
          />
        ))}
      </g>
      {titik.map((t, i) => {
        const dekatKanan = X(t.x) > kanan - 40
        return (
          <g key={`p${i}`}>
            <circle cx={r2(X(t.x))} cy={r2(Y(t.y))} r={4.5} fill={ISI.hi} stroke={KERTAS} strokeWidth={1.5} />
            {t.label && (
              <Teks
                x={X(t.x) + (dekatKanan ? -8 : 8)}
                y={Y(t.y) - 7}
                rata={dekatKanan ? 'end' : 'start'}
                ukuran={12}
              >
                {t.label}
              </Teks>
            )}
          </g>
        )
      })}
    </Bingkai>
  )
}

/* ---------------- Timbangan ---------------- */

function GambarTimbangan({ kiri, kanan, miring }: Extract<SpesGambar, { jenis: 'timbangan' }>) {
  const arah = miring === 'kiri' ? 1 : miring === 'kanan' ? -1 : 0
  const dy = 16 * arah
  const yl = 52 + dy
  const yr = 52 - dy
  const piring = (x: number, y: number, teks: string, warna: WarnaGambar) => (
    <g>
      <path
        d={`M${x} ${y}L${x - 34} ${y + 44}M${x} ${y}L${x + 34} ${y + 44}`}
        stroke={HALUS}
        strokeWidth={1.5}
      />
      <path
        d={`M${x - 44} ${y + 44}H${x + 44}Q${x + 38} ${y + 58} ${x} ${y + 58}Q${x - 38} ${y + 58} ${x - 44} ${y + 44}Z`}
        fill={LEMBUT[warna]}
        stroke={ISI[warna]}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Teks x={x} y={y + 38} ukuran={Math.min(13, (84 / Math.max(4, teks.length)) * 1.7)}>
        {teks}
      </Teks>
    </g>
  )
  return (
    <Bingkai
      h={178}
      alt={`Neraca dua lengan. Kiri: ${kiri}. Kanan: ${kanan}. ${
        arah === 0 ? 'Kedua lengan seimbang.' : `Lengan ${miring} turun.`
      }`}
    >
      <path d="M160 52V150" stroke={TINTA} strokeWidth={4} strokeLinecap="round" />
      <path
        d="M124 160H196L176 146H144Z"
        fill="var(--surface-3)"
        stroke={TINTA}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path d={`M56 ${yl}L264 ${yr}`} stroke={TINTA} strokeWidth={4} strokeLinecap="round" />
      <circle cx={160} cy={52} r={6} fill={ISI.a} stroke={KERTAS} strokeWidth={1.5} />
      {piring(64, yl, kiri, 'a')}
      {piring(256, yr, kanan, 'b')}
    </Bingkai>
  )
}

/* ---------------- Pita panjang ---------------- */

function GambarPita({ isi, lebar = 12, petak }: Extract<SpesGambar, { jenis: 'pita' }>) {
  const u = (W - 30) / Math.max(1, lebar)
  const jarak = 40
  const h = 8 + isi.length * jarak
  return (
    <Bingkai
      h={h}
      alt={`Gambar pita. ${isi
        .map(
          (b) =>
            `${b.label}: panjang ${fmt(b.panjang)} petak${b.mulai ? `, mulai dari petak ${fmt(b.mulai)}` : ''}`,
        )
        .join('; ')}.`}
    >
      {petak &&
        Array.from({ length: Math.floor(lebar) + 1 }, (_, i) => (
          <path key={i} d={`M${r2(15 + i * u)} 4V${h - 4}`} stroke="var(--m-grid)" strokeWidth={1} />
        ))}
      {isi.map((b, i) => {
        const warna = b.warna ?? URUT[i % URUT.length]
        const x = 15 + (b.mulai ?? 0) * u
        const y = 8 + i * jarak
        return (
          <g key={i}>
            <text x={15} y={y + 10} fontSize={12} fontWeight={700} fill={TINTA}>
              {b.label}
            </text>
            <rect
              x={r2(x)}
              y={y + 15}
              width={r2(Math.max(0, b.panjang * u))}
              height={16}
              rx={3}
              fill={ISI[warna]}
              fillOpacity={0.75}
              stroke={ISI[warna]}
              strokeWidth={1.4}
            />
            {petak &&
              Array.from({ length: Math.max(0, Math.ceil(b.panjang) - 1) }, (_, k) => (
                <path key={k} d={`M${r2(x + (k + 1) * u)} ${y + 15}v16`} stroke={KERTAS} strokeWidth={1.2} />
              ))}
          </g>
        )
      })}
    </Bingkai>
  )
}

/* ---------------- Pintu masuk ---------------- */

export function GambarSoal({ spec }: { spec: SpesGambar }) {
  switch (spec.jenis) {
    case 'benda':
      return <GambarBenda kelompok={'kelompok' in spec ? spec.kelompok : [spec]} />
    case 'pola':
      return <GambarPola isi={spec.isi} ujung={spec.ujung} />
    case 'blok':
      return <GambarBlok {...spec} />
    case 'garis':
      return <GambarGaris {...spec} />
    case 'pecahan':
      return <GambarPecahan isi={spec.isi} bentuk={spec.bentuk} />
    case 'jam':
      return <GambarJam jam={spec.jam} menit={spec.menit} />
    case 'batang':
      return <GambarBatang {...spec} />
    case 'pai':
      return <GambarPai {...spec} />
    case 'tabel':
      return (
        <div className="tabel-soal-bungkus">
          <table className="tabel-soal">
            <thead>
              <tr>
                {spec.kepala.map((k, i) => (
                  <th key={i} scope="col">
                    {k}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {spec.baris.map((b, i) => (
                <tr key={i}>
                  {b.map((sel, j) => (
                    <td key={j}>{typeof sel === 'number' ? fmt(sel) : sel}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'bangun':
      return <GambarBangun {...spec} />
    case 'sudut':
      return <GambarSudut besar={spec.besar} label={spec.label} />
    case 'grafik':
      return <GambarGrafik {...spec} />
    case 'timbangan':
      return <GambarTimbangan {...spec} />
    case 'pita':
      return <GambarPita {...spec} />
  }
}
