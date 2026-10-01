/* ============================================================
   KONSEP — Kok bisa (a+b)² = a² + 2ab + b²?
   Kelas 8 · Aljabar

   Gagasan pembuktian: satu persegi bersisi (a+b) dihitung luasnya
   dengan DUA cara. Cara pertama langsung: sisi × sisi = (a+b)².
   Cara kedua dengan membaginya menjadi empat daerah: a², ab, ab, b².
   Karena keduanya menghitung luas yang sama, hasilnya wajib sama.

   Bagian penutup sengaja membongkar kesalahan paling sering:
   (a+b)² BUKAN a² + b². Dua ubin ab itulah yang biasanya terlupakan.

   Interaksi langsung: anak memegang persegi itu sendiri.
   - Titik ungu di tepi atas = BATAS antara bagian a dan b. Digeser ke
     kanan, bagian a memanjang (b tetap), persegi ikut membesar.
   - Titik jingga di pojok kanan bawah = ujung sisi. Ditarik keluar,
     bagian b memanjang.
   Pojok kiri atas persegi tidak pernah bergeser, jadi titik yang diseret
   selalu menempel di jari. Skala gambar baru menyesuaikan setelah jari
   diangkat, supaya persegi tetap besar tetapi masih ada ruang untuk
   ditarik lagi. Label a², ab, b², penggaris, dan (a+b)² ikut berubah.
   ============================================================ */

import { useEffect, useRef, useState } from 'react'
import { Pegangan, useInteraksi } from '../components/Interaksi'
import { Svg, Tag, Dimensi, useSempit, useSkalaSvg, useUkuranLayar } from '../components/Stage'
import { fase, seg, useTween } from '../lib/anim'
import { fmt } from '../lib/num'
import type { DeriveState, Konsep, ParamSpec } from '../lib/types'

/* ---------------- Penggeser ---------------- */

const PARAM_BONGKAR: ParamSpec[] = [
  { key: 'a', label: 'Nilai a', min: 1, max: 6, step: 1, awal: 3, bulat: true, simbol: 'a', peran: 'a', bagian: 'a' },
  { key: 'b', label: 'Nilai b', min: 1, max: 6, step: 1, awal: 2, bulat: true, simbol: 'b', peran: 'b', bagian: 'b' },
]

const PARAM_EKSPERIMEN: ParamSpec[] = [
  { key: 'a', label: 'Nilai a', min: 1, max: 7, step: 1, awal: 3, bulat: true, simbol: 'a', peran: 'a', bagian: 'a' },
  { key: 'b', label: 'Nilai b', min: 1, max: 7, step: 1, awal: 2, bulat: true, simbol: 'b', peran: 'b', bagian: 'b' },
]

/** a + b terbesar yang bisa dicapai penggeser — menentukan skala terkecil gambar. */
const jumlahMaks = (ps: ParamSpec[]) => ps.reduce((s, p) => s + p.max, 0)

/** Nilai a dan b yang benar-benar digambar: penggeser dibulatkan ke bilangan bulat.
    Dipakai bersama oleh gambar dan teks langkah agar keduanya tidak pernah berbeda. */
function nilaiAB(p: Record<string, number>) {
  return { a: Math.round(p.a ?? 3), b: Math.round(p.b ?? 2) }
}

/* ---------------- Tata letak ---------------- */

interface Letak {
  w: number
  h: number
  /** pojok kiri atas persegi — tetap di tempat, persegi tumbuh ke kanan dan ke bawah. */
  x0: number
  y0: number
  /** sisi persegi terpanjang yang masih muat. */
  ruang: number
  /** tata letak lebar: poros panel teks di kanan persegi. HP: null. */
  panelX: number | null
  /** HP: garis teks di atas dan di bawah persegi. */
  judulY: number
  bawahY: number
}

/**
 * Dua tata letak. Lebar: persegi di kiri, angka-angkanya di panel kanan.
 * HP (tegak): persegi selebar mungkin, teks di atas dan di bawahnya.
 */
function letak(sempit: boolean, jenis: 'bongkar' | 'eksperimen'): Letak {
  // HP: y0 = 100 memberi ruang bagi label "a = …" yang muncul di atas titik
  // batas saat dipegang, tanpa menabrak judul, sampai panggung selebar 300 px.
  if (sempit) {
    return jenis === 'bongkar'
      ? { w: 420, h: 520, x0: 48, y0: 100, ruang: 332, panelX: null, judulY: 26, bawahY: 500 }
      : { w: 420, h: 490, x0: 48, y0: 100, ruang: 332, panelX: null, judulY: 26, bawahY: 0 }
  }
  return { w: 680, h: 460, x0: 60, y0: 74, ruang: 330, panelX: 560, judulY: 0, bawahY: 0 }
}

/**
 * Satuan panjang yang disisakan di kanan-bawah persegi saat skala dipilih,
 * supaya pojoknya selalu masih bisa ditarik keluar beberapa langkah.
 */
const SISA = 3

/**
 * Berapa satuan SVG untuk panjang 1. Persegi dibuat sebesar mungkin dengan
 * menyisakan SISA satuan. Selama titik a atau b dipegang, skalanya DIBEKUKAN
 * agar titiknya menempel di jari; setelah dilepas, skala bergerak halus ke
 * ukuran yang pas lagi.
 */
function useSatuan(jumlah: number, maks: number, ruang: number, dipegang: boolean) {
  const pas = ruang / Math.min(maks, jumlah + SISA)
  const [beku, setBeku] = useState<number | null>(null)
  const halus = useTween(beku ?? pas, { durasi: 420 })
  // Nilai bisa naik lebih cepat daripada skala mengecil (papan ketik, angka
  // yang diketik): kecilkan seperlunya supaya persegi tidak keluar bingkai.
  const tampil = Math.min(beku ?? halus, ruang / jumlah)
  // Skala terakhir yang tampil sebelum titik dipegang.
  const terakhir = useRef(tampil)
  useEffect(() => {
    if (!dipegang) terakhir.current = tampil
  })
  useEffect(() => {
    setBeku(dipegang ? terakhir.current : null)
  }, [dipegang])
  return tampil
}

/** Susun letak keempat daerah untuk nilai a dan b tertentu. */
function tata(L: Letak, u: number, a: number, b: number) {
  const { x0, y0 } = L
  const ax = a * u
  const bx = b * u
  const S = ax + bx
  return {
    u,
    x0,
    y0,
    ax,
    bx,
    S,
    /** a + b terbesar yang masih muat pada skala ini — seretan ditahan di sini. */
    jumlahMuat: Math.floor(L.ruang / u + 1e-6),
    // daerah: [x, y, lebar, tinggi]
    a2: [x0, y0, ax, ax] as const,
    ab1: [x0, y0 + ax, ax, bx] as const, // kiri bawah, a lebar × b tinggi
    ab2: [x0 + ax, y0, bx, ax] as const, // kanan atas, b lebar × a tinggi
    b2: [x0 + ax, y0 + ax, bx, bx] as const,
  }
}

type Geo = ReturnType<typeof tata>

/* ---------------- Tabrakan label ---------------- */

interface Kotak {
  x1: number
  y1: number
  x2: number
  y2: number
}

const tabrak = (p: Kotak | null, q: Kotak | null, sela = 2) =>
  !!p && !!q && p.x1 < q.x2 + sela && q.x1 < p.x2 + sela && p.y1 < q.y2 + sela && q.y1 < p.y2 + sela

/** Kotak sebuah Tag rata tengah (rumus lebarnya sama dengan Tag di Stage.tsx). */
function kotakTag(x: number, y: number, teks: string, ukuran: number, pad = 14): Kotak {
  const lebar = teks.length * ukuran * 0.58 + pad
  return { x1: x - lebar / 2, x2: x + lebar / 2, y1: y - ukuran * 0.82, y2: y + ukuran * 0.68 }
}

/**
 * Letak titik a (batas, tepi atas) dan b (pojok kanan bawah), beserta kotak
 * yang harus dihindari label lain: badan titiknya, label nilai yang muncul di
 * atas titik saat dipegang, dan ajakan "Coba geser aku" di bawah titik utama.
 * Ukurannya cerminan Pegangan di Interaksi.tsx.
 *
 * adaA: titik a sudah boleh tampil (di bongkar baru setelah sisi dipotong).
 */
function useTitikAB(g: Geo, L: Letak, a: number, b: number, aktif: string | null, adaA: boolean) {
  const ajakanHidup = useInteraksi()?.ajakan ?? false
  const skala = useSkalaSvg() || 0.6
  const px = (n: number) => n / skala
  const r = Math.max(8, px(9))
  const A = { x: g.x0 + g.ax, y: g.y0 }
  const B = { x: g.x0 + g.S, y: g.y0 + g.S }
  const label = (x: number, y: number, teks: string) => kotakTag(x, y - r - px(22), teks, px(15))
  const ajakanDi = (x: number, y: number) => kotakTag(x, y + r + px(24), 'Coba geser aku', px(13))
  const bulat = (x: number, y: number): Kotak => {
    const k = r + px(2)
    return { x1: x - k, x2: x + k, y1: y - k, y2: y + k }
  }
  // panah kecil di sekitar titik: ujung 1,9r, mata panah 0,55r ke samping
  const panahX = (x: number, y: number): Kotak => ({ x1: x - r * 1.9 - px(1), x2: x + r * 1.9 + px(1), y1: y - r * 0.6, y2: y + r * 0.6 })
  const panahY = (x: number, y: number): Kotak => ({ x1: x - r * 0.6, x2: x + r * 0.6, y1: y - r * 1.9 - px(1), y2: y + r * 1.9 + px(1) })
  const labelA = aktif === 'a' ? label(A.x, A.y, `a = ${fmt(a)}`) : null
  const labelB = aktif === 'b' ? label(B.x, B.y, `b = ${fmt(b)}`) : null
  const badanA = [bulat(A.x, A.y), panahX(A.x, A.y)]
  // Pojok ditarik ke dalam sampai perseginya kecil: label "b = …" bisa menutupi
  // titik a. Selama itu titik a disembunyikan (batasnya tetap terlihat dari
  // garis potong dan penggaris).
  const tampakA = adaA && !badanA.some((k) => tabrak(labelB, k))

  // Titik utama = pojok b. Bila persegi sudah sebesar bingkai, ajakan di bawah
  // pojok akan keluar dari tepi kanan; saat itu ajakan pindah ke titik a.
  // Selama sebuah titik dipegang, pilihan ini tidak berubah — kecuali titik
  // utama yang TIDAK dipegang ikut terdorong sampai ajakannya keluar bingkai
  // (mis. titik a diseret ke kanan pertama kali): ajakannya dilepas dulu.
  const muat = (k: Kotak) => k.x1 >= 0 && k.x2 <= L.w
  const pilihan = muat(ajakanDi(B.x, B.y)) ? 'b' : tampakA && muat(ajakanDi(A.x, A.y)) ? 'a' : null
  const [tadi, setTadi] = useState(pilihan)
  if (!aktif && tadi !== pilihan) setTadi(pilihan)
  const titikTadi = tadi === 'a' ? A : tadi === 'b' ? B : null
  const utama = !aktif
    ? pilihan
    : tadi !== aktif && titikTadi && !muat(ajakanDi(titikTadi.x, titikTadi.y))
      ? null
      : tadi
  const titikUtama = utama === 'a' ? A : utama === 'b' ? B : null
  const ajakan = ajakanHidup && titikUtama && aktif !== utama ? ajakanDi(titikUtama.x, titikUtama.y) : null

  return {
    A,
    B,
    labelA,
    tampakA,
    utama,
    hindari: [
      ...(tampakA ? badanA : []),
      bulat(B.x, B.y),
      panahX(B.x, B.y),
      panahY(B.x, B.y),
      labelA,
      labelB,
      ajakan,
    ],
  }
}

type TitikInfo = ReturnType<typeof useTitikAB>

/* ---------------- Potongan gambar ---------------- */

function Daerah({
  kotak,
  warna,
  label,
  nilai,
  opacity = 1,
  nyala = false,
  hindari = [],
}: {
  kotak: readonly [number, number, number, number]
  warna: string
  label: string
  nilai: string
  opacity?: number
  nyala?: boolean
  /** kotak label/titik lain; teks daerah disembunyikan bila menabraknya. */
  hindari?: (Kotak | null)[]
}) {
  const u = useUkuranLayar()
  const [x, y, w, h] = kotak
  const hurufNilai = Math.max(13, u(12))
  const hurufLabel = Math.min(24, Math.max(hurufNilai, Math.min(w, h) * 0.4))
  const lebarLabel = label.length * hurufLabel * 0.6
  const lebarNilai = nilai.length * hurufNilai * 0.6
  const muatLabel = w >= lebarLabel + 8 && h >= hurufLabel + 6
  const muatNilai = muatLabel && h >= hurufLabel + hurufNilai + 18 && w >= lebarNilai + 8
  const tinggi = hurufLabel + (muatNilai ? hurufNilai + 2 : 0)
  const cx = x + w / 2
  const cy = y + h / 2
  const lebar = Math.max(lebarLabel, muatNilai ? lebarNilai : 0)
  const blok: Kotak = { x1: cx - lebar / 2, x2: cx + lebar / 2, y1: cy - tinggi / 2, y2: cy + tinggi / 2 }
  const teks = muatLabel && !hindari.some((k) => tabrak(k, blok))
  return (
    <g opacity={opacity}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={warna}
        fillOpacity={nyala ? 0.55 : 0.3}
        stroke={warna}
        strokeWidth={nyala ? 3.5 : 2}
      />
      {teks && (
        <text
          x={cx}
          y={blok.y1 + hurufLabel / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={hurufLabel}
          fontWeight={800}
          fill={warna}
          style={{ pointerEvents: 'none' }}
        >
          {label}
        </text>
      )}
      {teks && muatNilai && (
        <text
          x={cx}
          y={blok.y2 - hurufNilai / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={hurufNilai}
          fontWeight={700}
          fill="var(--ink-2)"
          style={{ pointerEvents: 'none' }}
        >
          {nilai}
        </text>
      )}
    </g>
  )
}

/** Kisi satuan tipis: luas terbaca sebagai banyaknya petak. */
function Kisi({ g, n, opacity = 1 }: { g: Geo; n: number; opacity?: number }) {
  if (opacity <= 0 || n < 2) return null
  const garis = []
  for (let i = 1; i < n; i++) {
    const k = i * g.u
    garis.push(<line key={`x${i}`} x1={g.x0 + k} y1={g.y0} x2={g.x0 + k} y2={g.y0 + g.S} />)
    garis.push(<line key={`y${i}`} x1={g.x0} y1={g.y0 + k} x2={g.x0 + g.S} y2={g.y0 + k} />)
  }
  return (
    <g stroke="var(--m-axis)" strokeWidth={1} opacity={0.35 * opacity} style={{ pointerEvents: 'none' }}>
      {garis}
    </g>
  )
}

/** Penggaris sisi atas: "a = 3 │ b = 2", tepat di atas titik batas. */
function PenggarisAtas({
  g,
  a,
  b,
  gabung = false,
  aktif,
  labelA,
}: {
  g: Geo
  a: number
  b: number
  /** belum dipotong: satu ukuran "a + b". */
  gabung?: boolean
  aktif: string | null
  /** label titik a yang sedang dipegang, bila ada. */
  labelA: Kotak | null
}) {
  const skala = useSkalaSvg()
  // 16 satuan di atas tepi: label ukuran tidak menyentuh titik batas di HP.
  const yR = g.y0 - 16
  if (gabung) {
    return (
      <Dimensi x1={g.x0} y1={yR} x2={g.x0 + g.S} y2={yR} label={`a + b = ${fmt(a + b)}`} warna="var(--ink-2)" />
    )
  }
  // Ukuran huruf Tag yang benar-benar tampil (Tag memperbesar huruf di layar kecil).
  const uk = skala > 0 ? Math.max(13, Math.min(13 * 1.6, 11 / skala)) : 13
  const teksB = `b = ${fmt(b)}`
  const kotakB = kotakTag(g.x0 + g.ax + g.bx / 2, yR - 13 * 0.9, teksB, uk, 14 * (uk / 13))
  // Label statis disembunyikan selama titiknya sendiri menampilkan nilai itu.
  const tampakA = aktif !== 'a'
  const tampakB = aktif !== 'b' && !tabrak(labelA, kotakB)
  return (
    <>
      <Dimensi
        x1={g.x0}
        y1={yR}
        x2={g.x0 + g.ax}
        y2={yR}
        label={tampakA ? `a = ${fmt(a)}` : undefined}
        warna="var(--m-a)"
      />
      <Dimensi
        x1={g.x0 + g.ax}
        y1={yR}
        x2={g.x0 + g.S}
        y2={yR}
        label={tampakB ? teksB : undefined}
        warna="var(--m-b)"
      />
    </>
  )
}

/** Penggaris sisi kiri: sisi yang sama juga a lalu b. */
function PenggarisKiri({ g, gabung = false }: { g: Geo; gabung?: boolean }) {
  const xR = g.x0 - 12
  const xL = g.x0 - 30
  if (gabung) {
    const yT = g.y0 + g.S / 2
    return (
      <>
        <Dimensi x1={xR} y1={g.y0} x2={xR} y2={g.y0 + g.S} warna="var(--ink-2)" />
        {/* diputar supaya tidak memakan tepi kiri yang sempit */}
        <g transform={`rotate(-90 ${xL} ${yT})`}>
          <Tag x={xL} y={yT} size={13} warna="var(--ink-2)">
            a + b
          </Tag>
        </g>
      </>
    )
  }
  return (
    <>
      <Dimensi x1={xR} y1={g.y0} x2={xR} y2={g.y0 + g.ax} warna="var(--m-a)" />
      <Dimensi x1={xR} y1={g.y0 + g.ax} x2={xR} y2={g.y0 + g.S} warna="var(--m-b)" />
      <Tag x={xL} y={g.y0 + g.ax / 2} size={13} warna="var(--m-a)">
        a
      </Tag>
      <Tag x={xL} y={g.y0 + g.ax + g.bx / 2} size={13} warna="var(--m-b)">
        b
      </Tag>
    </>
  )
}

interface Baris {
  teks: string
  warna: string
  size: number
}

/** Beberapa baris teks bertumpuk di panel kanan (tata letak lebar). */
function Panel({ x, y, baris }: { x: number; y: number; baris: Baris[] }) {
  const jarak = 34
  const mulai = y - ((baris.length - 1) * jarak) / 2
  return (
    <>
      {baris.map((br, i) => (
        <Tag key={i} x={x} y={mulai + i * jarak} warna={br.warna} size={br.size}>
          {br.teks}
        </Tag>
      ))}
    </>
  )
}

/**
 * Dua titik yang dipegang anak. keNilai adalah kebalikan persis dari letaknya:
 *   titik a: x = x0 + a·u            →  a = (x − x0) / u
 *   titik b: x = y = x0 + (a + b)·u  →  b = rata-rata kedua jarak / u − a
 * Seretan ditahan pada jumlahMuat supaya persegi tidak keluar bingkai.
 */
function TitikAB({
  g,
  a,
  b,
  titik,
  sembunyiB = false,
}: {
  g: Geo
  a: number
  b: number
  titik: TitikInfo
  sembunyiB?: boolean
}) {
  return (
    <>
      <Pegangan
        x={titik.A.x}
        y={titik.A.y}
        param="a"
        arah="x"
        utama={titik.utama === 'a'}
        label={`a = ${fmt(a)}`}
        sembunyi={!titik.tampakA}
        keNilai={(pt) => Math.min((pt.x - g.x0) / g.u, g.jumlahMuat - b)}
      />
      <Pegangan
        x={titik.B.x}
        y={titik.B.y}
        param="b"
        arah="bebas"
        utama={titik.utama === 'b'}
        label={`b = ${fmt(b)}`}
        sembunyi={sembunyiB}
        keNilai={(pt) => Math.min((pt.x - g.x0 + (pt.y - g.y0)) / (2 * g.u) - a, g.jumlahMuat - a)}
      />
    </>
  )
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const { a, b } = nilaiAB(p)
  const sempit = useSempit()
  const aktif = useInteraksi()?.kendali.aktif ?? null
  const L = letak(sempit, 'bongkar')
  const u = useSatuan(a + b, jumlahMaks(PARAM_BONGKAR), L.ruang, aktif === 'a' || aktif === 'b')
  const g = tata(L, u, a, b)

  const persegi = fase(step, t, 0)
  const potong = fase(step, t, 1)
  // Titik batas baru ada setelah sisi dipotong; pojok ada sejak perseginya muncul.
  const titik = useTitikAB(g, L, a, b, aktif, potong > 0.5)
  // Keempat daerah muncul berurutan di dalam langkah 2.
  const d1 = step === 2 ? seg(t, 0, 0.3) : step > 2 ? 1 : 0
  const d2 = step === 2 ? seg(t, 0.25, 0.55) : step > 2 ? 1 : 0
  const d3 = step === 2 ? seg(t, 0.5, 0.8) : step > 2 ? 1 : 0
  const d4 = step === 2 ? seg(t, 0.75, 1) : step > 2 ? 1 : 0
  const gabungAb = fase(step, t, 4)
  const sorotHilang = step >= 6 ? seg(t, 0, 0.6) : 0

  const nyalaA = sorot === 'a' || sorot === 'a2'
  const nyalaB = sorot === 'b' || sorot === 'b2'
  const nyalaAb = sorot === 'ab' || sorot === 'dua-ab' || gabungAb > 0.5 || sorotHilang > 0.4

  const luas = (a + b) ** 2
  // Keterangan tiap tahap: satu baris di HP, bertumpuk di panel pada layar lebar.
  const keterangan: Baris[] =
    step === 0
      ? L.panelX
        ? [
            { teks: 'luas seluruh persegi', warna: 'var(--ink-2)', size: 16 },
            { teks: `(${fmt(a)} + ${fmt(b)})² = ${fmt(luas)}`, warna: 'var(--ink)', size: 20 },
          ]
        : [{ teks: `luas seluruh persegi = (${fmt(a)} + ${fmt(b)})² = ${fmt(luas)}`, warna: 'var(--ink-2)', size: 17 }]
      : step === 3
        ? L.panelX
          ? [
              { teks: `a² = ${fmt(a * a)}`, warna: 'var(--m-a)', size: 17 },
              { teks: `ab = ${fmt(a * b)}`, warna: 'var(--m-ab)', size: 17 },
              { teks: `ab = ${fmt(a * b)}`, warna: 'var(--m-ab)', size: 17 },
              { teks: `b² = ${fmt(b * b)}`, warna: 'var(--m-b)', size: 17 },
              { teks: `jumlah = ${fmt(luas)}`, warna: 'var(--ink)', size: 19 },
            ]
          : [
              {
                teks: `${fmt(a * a)} + ${fmt(a * b)} + ${fmt(a * b)} + ${fmt(b * b)} = ${fmt(luas)}`,
                warna: 'var(--ink-2)',
                size: 17,
              },
            ]
        : step === 4
          ? L.panelX
            ? [
                { teks: 'dua ubin ab', warna: 'var(--m-ab)', size: 16 },
                { teks: `2ab = ${fmt(2 * a * b)}`, warna: 'var(--m-ab)', size: 20 },
              ]
            : [{ teks: `dua ubin ab = 2ab = ${fmt(2 * a * b)}`, warna: 'var(--m-ab)', size: 17 }]
          : step === 6
            ? L.panelX
              ? [
                  { teks: 'kalau dua ubin ab', warna: 'var(--m-hi)', size: 16 },
                  { teks: 'dilupakan...', warna: 'var(--m-hi)', size: 16 },
                  { teks: `a² + b² = ${fmt(a * a + b * b)}`, warna: 'var(--ink)', size: 17 },
                  { teks: `padahal (a+b)² = ${fmt(luas)}`, warna: 'var(--m-hi)', size: 17 },
                ]
              : [{ teks: 'kalau dua ubin ab dilupakan...', warna: 'var(--m-hi)', size: 17 }]
            : []

  return (
    <Svg w={L.w} h={L.h} maxH={460} label="Persegi bersisi a tambah b yang dibagi menjadi empat daerah">
      {/* persegi utuh */}
      <rect
        x={g.x0}
        y={g.y0}
        width={g.S}
        height={g.S}
        fill={potong > 0.5 ? 'none' : 'var(--m-ghost)'}
        stroke="var(--ink)"
        strokeWidth={2.5}
        opacity={persegi}
      />
      <Kisi g={g} n={a + b} opacity={persegi} />

      {/* keempat daerah */}
      {d1 > 0 && (
        <Daerah kotak={g.a2} warna="var(--m-a)" label="a²" nilai={fmt(a * a)} opacity={d1} nyala={nyalaA} hindari={titik.hindari} />
      )}
      {d2 > 0 && (
        <Daerah kotak={g.ab2} warna="var(--m-ab)" label="ab" nilai={fmt(a * b)} opacity={d2} nyala={nyalaAb} hindari={titik.hindari} />
      )}
      {d3 > 0 && (
        <Daerah kotak={g.ab1} warna="var(--m-ab)" label="ab" nilai={fmt(a * b)} opacity={d3} nyala={nyalaAb} hindari={titik.hindari} />
      )}
      {d4 > 0 && (
        <Daerah kotak={g.b2} warna="var(--m-b)" label="b²" nilai={fmt(b * b)} opacity={d4} nyala={nyalaB} hindari={titik.hindari} />
      )}

      {/* garis potong dari titik batas */}
      {potong > 0 && (
        <g opacity={potong}>
          <line
            x1={g.x0 + g.ax}
            y1={g.y0}
            x2={g.x0 + g.ax}
            y2={g.y0 + g.S}
            stroke="var(--ink)"
            strokeWidth={2}
            strokeDasharray="6 5"
          />
          <line
            x1={g.x0}
            y1={g.y0 + g.ax}
            x2={g.x0 + g.S}
            y2={g.y0 + g.ax}
            stroke="var(--ink)"
            strokeWidth={2}
            strokeDasharray="6 5"
          />
        </g>
      )}

      {/* ukuran sisi atas dan kiri */}
      {persegi > 0.5 && (
        <>
          <PenggarisAtas g={g} a={a} b={b} gabung={potong < 0.4} aktif={aktif} labelA={titik.labelA} />
          <PenggarisKiri g={g} gabung={potong < 0.4} />
        </>
      )}

      {/* keterangan tahap */}
      {L.panelX !== null ? (
        <Panel x={L.panelX} y={220} baris={keterangan} />
      ) : (
        keterangan.map((br, i) => (
          <Tag key={i} x={L.w / 2} y={L.judulY} warna={br.warna} size={br.size}>
            {br.teks}
          </Tag>
        ))
      )}
      {step === 6 && L.panelX === null && (
        <Tag x={L.w / 2} y={L.bawahY} warna="var(--m-hi)" size={17}>
          {`a² + b² = ${fmt(a * a + b * b)}, padahal (a+b)² = ${fmt(luas)}`}
        </Tag>
      )}

      <TitikAB g={g} a={a} b={b} titik={titik} sembunyiB={persegi <= 0.5} />
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const { a, b } = nilaiAB(p)
  const sempit = useSempit()
  const aktif = useInteraksi()?.kendali.aktif ?? null
  const L = letak(sempit, 'eksperimen')
  const u = useSatuan(a + b, jumlahMaks(PARAM_EKSPERIMEN), L.ruang, aktif === 'a' || aktif === 'b')
  const g = tata(L, u, a, b)
  const titik = useTitikAB(g, L, a, b, aktif, true)
  const nyalaA = sorot === 'a' || sorot === 'a2'
  const nyalaB = sorot === 'b' || sorot === 'b2'
  const nyalaAb = sorot === 'ab' || sorot === 'dua-ab'
  const judul = `(${fmt(a)} + ${fmt(b)})² = ${fmt((a + b) ** 2)}`

  return (
    <Svg w={L.w} h={L.h} maxH={460} label="Persegi bersisi a tambah b; batas a dan pojok b bisa diseret">
      <Kisi g={g} n={a + b} />
      <Daerah kotak={g.a2} warna="var(--m-a)" label="a²" nilai={fmt(a * a)} nyala={nyalaA} hindari={titik.hindari} />
      <Daerah kotak={g.ab2} warna="var(--m-ab)" label="ab" nilai={fmt(a * b)} nyala={nyalaAb} hindari={titik.hindari} />
      <Daerah kotak={g.ab1} warna="var(--m-ab)" label="ab" nilai={fmt(a * b)} nyala={nyalaAb} hindari={titik.hindari} />
      <Daerah kotak={g.b2} warna="var(--m-b)" label="b²" nilai={fmt(b * b)} nyala={nyalaB} hindari={titik.hindari} />

      <rect x={g.x0} y={g.y0} width={g.S} height={g.S} fill="none" stroke="var(--ink)" strokeWidth={2.5} />

      <PenggarisAtas g={g} a={a} b={b} aktif={aktif} labelA={titik.labelA} />
      <PenggarisKiri g={g} />

      {L.panelX !== null ? (
        <Panel
          x={L.panelX}
          y={200}
          baris={[
            { teks: judul, warna: 'var(--ink)', size: 21 },
            { teks: `a² = ${fmt(a * a)}`, warna: 'var(--m-a)', size: 17 },
            { teks: `ab + ab = ${fmt(2 * a * b)}`, warna: 'var(--m-ab)', size: 17 },
            { teks: `b² = ${fmt(b * b)}`, warna: 'var(--m-b)', size: 17 },
          ]}
        />
      ) : (
        <Tag x={L.w / 2} y={L.judulY} warna="var(--ink)" size={19}>
          {judul}
        </Tag>
      )}

      <TitikAB g={g} a={a} b={b} titik={titik} />
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'kuadrat-jumlah',
  topicId: 'smp8-identitas-aljabar-dan-bentuk-kuadrat',
  judul: 'Identitas (a+b)²',
  pertanyaan: 'Kok bisa (a+b)² = a² + 2ab + b²?',
  tagline: 'Dua cara menghitung luas persegi yang sama. Hasilnya wajib sama.',
  kelas: 8,
  domain: 'aljabar',
  tags: ['aljabar', 'identitas', 'kuadrat', 'ubin aljabar'],

  tebak: {
    pertanyaan: 'Menurutmu, (3 + 2)² sama dengan berapa?',
    pilihan: [
      {
        id: 'a',
        label: '13',
        balasan:
          'Ini hasil dari 3² + 2² = 9 + 4. Sangat masuk akal kalau kuadrat dianggap bisa "dibagikan" ke tiap suku — tapi ternyata tidak bisa.',
      },
      {
        id: 'b',
        label: '25',
        benar: true,
        balasan: 'Betul: 3 + 2 = 5, lalu 5² = 25. Sebentar lagi kamu lihat 12 selisihnya pergi ke mana.',
      },
      {
        id: 'c',
        label: '11',
        balasan: 'Angka 11 muncul kalau 3 + 2 dikuadratkan sebagian saja. Kuadrat berlaku pada seluruh jumlah.',
      },
    ],
    penutup:
      'Selisih antara 25 dan 13 adalah 12 — dan angka 12 itu bukan kebetulan. Ia punya bentuk yang bisa dilihat.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: PARAM_BONGKAR,
    roles: { a: 'a', b: 'b', a2: 'a', b2: 'b', ab: 'ab', 'dua-ab': 'ab', jumlah: 'c' },
    arti: {
      a: 'Panjang bagian pertama pada sisi persegi.',
      b: 'Panjang bagian kedua pada sisi persegi.',
      a2: 'Daerah persegi berukuran a × a di pojok kiri atas.',
      b2: 'Daerah persegi berukuran b × b di pojok kanan bawah.',
      ab: 'Daerah berukuran a × b. Ada DUA daerah seperti ini.',
      'dua-ab': 'Dua daerah a × b sekaligus — inilah bagian yang paling sering terlupakan.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Satu persegi, sisinya a + b',
        narasi: (p) => {
          const { a, b } = nilaiAB(p)
          return `Sisi persegi ini terdiri atas dua potong: sepanjang ${fmt(a)} lalu sepanjang ${fmt(b)}, jadi seluruh sisinya ${fmt(a + b)}. Luas persegi selalu sisi kali sisi.`
        },
        rumus: 'luas = ([a:a] + [b:b])^2',
        durasi: 1600,
      },
      {
        id: 's1',
        judul: 'Tandai batas antara a dan b',
        narasi:
          'Tandai titik batas itu pada sisi atas dan sisi kiri, lalu tarik garis tegak dari sisi atas dan garis mendatar dari sisi kiri. Persegi tadi kini terbagi menjadi empat daerah.',
        durasi: 1500,
      },
      {
        id: 's2',
        judul: 'Kenali keempat daerahnya',
        // Saat a = b, ubin a × b tergambar sebagai persegi, bukan persegi panjang.
        narasi: (p) => {
          const { a, b } = nilaiAB(p)
          return a === b
            ? `Karena a dan b sama-sama ${fmt(a)}, keempat daerahnya persegi yang sama besar: ${fmt(a)} × ${fmt(a)} semuanya. Tidak ada bagian yang tersisa dan tidak ada yang bertumpuk.`
            : `Ada persegi ${fmt(a)} × ${fmt(a)}, dua persegi panjang ${fmt(a)} × ${fmt(b)}, dan persegi ${fmt(b)} × ${fmt(b)}. Tidak ada bagian yang tersisa dan tidak ada yang bertumpuk.`
        },
        durasi: 2600,
      },
      {
        id: 's3',
        judul: 'Jumlahkan luas keempatnya',
        narasi:
          'Karena keempat daerah itu mengisi persegi yang sama, jumlah luasnya harus sama dengan luas persegi seluruhnya.',
        rumus: '([a:a] + [b:b])^2 = [a2:a^2] + [ab:ab] + [ab:ab] + [b2:b^2]',
        durasi: 2000,
      },
      {
        id: 's4',
        judul: 'Dua ubin yang sama digabung',
        narasi: (p) => {
          const { a, b } = nilaiAB(p)
          return a === b
            ? `Karena a dan b sama-sama ${fmt(a)}, kedua ubin a × b malah berbentuk persegi — tetap sama besar, luasnya masing-masing ${fmt(a * b)}. Dua ubin yang sama bisa kamu tulis sekali saja: 2ab = ${fmt(2 * a * b)}.`
            : `Kedua ubin ${fmt(a)} × ${fmt(b)} ukurannya persis sama, luasnya masing-masing ${fmt(a * b)}. Dua ubin yang sama bisa kamu tulis sekali saja: 2ab = ${fmt(2 * a * b)}.`
        },
        rumus: '[ab:ab] + [ab:ab] = [dua-ab:2ab]',
        durasi: 1800,
      },
      {
        id: 's5',
        judul: 'Itulah identitasnya',
        narasi:
          'Bukan rumus yang harus dihafal, melainkan catatan tentang cara sebuah persegi terbagi.',
        rumus: '([a:a] + [b:b])^2 = [a2:a^2] + [dua-ab:2ab] + [b2:b^2]',
        durasi: 2000,
      },
      {
        id: 's6',
        judul: 'Kenapa bukan a² + b²?',
        // Saat a = b, a² + b² tepat separuh luas persegi — sebut itu supaya dua
        // angka yang kebetulan sama tidak terbaca seperti salah hitung.
        narasi: (p) => {
          const { a, b } = nilaiAB(p)
          return a === b
            ? `Kalau kamu hanya menulis a² + b², hasilnya ${fmt(a * a + b * b)} — persis separuh dari luas persegi ini, ${fmt((a + b) ** 2)}. Separuh sisanya, seluas ${fmt(2 * a * b)}, adalah dua ubin ab yang kamu lewatkan.`
            : `Kalau kamu hanya menulis a² + b², hasilnya ${fmt(a * a + b * b)} — dua ubin ab yang luas totalnya ${fmt(2 * a * b)} hilang begitu saja. Padahal keduanya nyata menempati ruang di dalam persegi yang luasnya ${fmt((a + b) ** 2)}.`
        },
        durasi: 2400,
      },
    ],
  },

  eksperimen: {
    judul: 'Ubah a dan b, perhatikan bagian mana yang paling cepat membesar',
    ajakan:
      'Seret titik ungu di tepi atas untuk mengubah a, lalu tarik pojok jingga untuk mengubah b. Kapan dua ubin ab menjadi bagian terbesar?',
    params: PARAM_EKSPERIMEN,
    Visual: VisualEksperimen,
    rumus: (p) => {
      const { a, b } = nilaiAB(p)
      return `([a:${fmt(a)}] + [b:${fmt(b)}])^2 = [a2:${fmt(a * a)}] + [dua-ab:${fmt(2 * a * b)}] + [b2:${fmt(b * b)}] = ${fmt((a + b) ** 2)}`
    },
    temuan: (p) => {
      const { a, b } = nilaiAB(p)
      const kiri = (a + b) ** 2
      const salah = a * a + b * b
      const duaAb = 2 * a * b
      // 2ab > a² ⇔ 2b > a, jadi dua ubin ab terbesar selama yang satu kurang
      // dari dua kali yang lain, dan tepat seluas persegi besar saat dua kali.
      const besar = Math.max(a * a, b * b)
      return (
        <p>
          <strong>
            ({fmt(a)} + {fmt(b)})² = {fmt(kiri)}
          </strong>
          , sedangkan a² + b² hanya {fmt(salah)}. Selisihnya {fmt(kiri - salah)} — persis luas dua
          ubin ab ({fmt(a)} × {fmt(b)} × 2).{' '}
          {duaAb > besar
            ? 'Dua ubin ab bersama-sama menjadi bagian terbesar, karena yang satu kurang dari dua kali yang lain. '
            : duaAb === besar
              ? 'Yang satu tepat dua kali yang lain, jadi dua ubin ab persis seluas persegi yang lebih besar. '
              : 'Yang satu lebih dari dua kali yang lain, jadi persegi yang lebih besar mengalahkan dua ubin ab. '}
          {a === b
            ? `Sekarang a dan b sama besar, jadi dua ubin ab itu menempati tepat setengah dari seluruh persegi.`
            : `Coba buat a dan b sama besar: dua ubin ab akan menempati setengah dari seluruh persegi.`}
        </p>
      )
    },
  },

  penjelasan: {
    SMP: (
      <>
        <p>
          Kuncinya satu kalimat: <strong>luas yang sama dihitung dengan dua cara harus memberi
          hasil yang sama.</strong>
        </p>
        <p>
          Cara pertama: sisi persegi itu (a + b), jadi luasnya (a + b)². Cara kedua: bagi persegi
          menjadi empat daerah, lalu jumlahkan luasnya — a² + ab + ab + b². Kedua cara mengukur
          bidang yang sama, sehingga
        </p>
        <p style={{ textAlign: 'center' }}>(a + b)² = a² + 2ab + b²</p>
        <h4>Cara aljabarnya</h4>
        <p>
          Hasil yang sama muncul dari sifat distributif, tanpa gambar sama sekali:
          (a + b)(a + b) = a(a + b) + b(a + b) = a² + ab + ba + b² = a² + 2ab + b². Gambar tadi
          sebenarnya adalah "foto" dari langkah distributif ini.
        </p>
        <h4>Kesalahan yang paling sering</h4>
        <p>
          Menulis (a + b)² = a² + b². Kuadrat <strong>bukan</strong> operasi yang bisa dibagikan ke
          tiap suku. Uji cepat dengan angka: (3 + 2)² = 25, sedangkan 3² + 2² = 13. Selisih 12 itu
          persis 2ab = 2 × 3 × 2.
        </p>
        <h4>Saudara dekatnya</h4>
        <p>
          Dengan gambar serupa kamu juga bisa membaca (a − b)² = a² − 2ab + b² dan
          a² − b² = (a + b)(a − b). Ketiganya lahir dari cara yang sama: memotong bidang lalu
          menghitungnya dua kali.
        </p>
      </>
    ),
    SD: (
      <>
        <p>
          Bayangkan kamu punya kebun berbentuk persegi. Panjang sisinya kamu bagi jadi dua bagian:
          bagian pertama sepanjang <strong>a</strong> langkah, bagian kedua sepanjang{' '}
          <strong>b</strong> langkah.
        </p>
        <p>
          Bagi juga sisi di sebelahnya dengan cara yang sama. Dari titik pembagi di sisi bawah
          tarik garis lurus tegak, dari titik pembagi di sisi samping tarik garis lurus mendatar.
          Kebunmu terbagi menjadi empat petak.
        </p>
        <p>
          Ada petak persegi a × a, petak persegi b × b, dan <strong>dua</strong> petak panjang a × b.
          Luas seluruh kebun tentu sama dengan jumlah luas keempat petak itu.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Identitas ini adalah kasus n = 2 dari teorema binomial:
          (a + b)ⁿ = Σ C(n,k) aⁿ⁻ᵏ bᵏ. Untuk n = 2 koefisiennya 1, 2, 1 — baris ketiga segitiga
          Pascal. Angka 2 pada 2ab adalah C(2,1), yaitu banyaknya cara memilih satu faktor b dari
          dua faktor yang tersedia.
        </p>
        <p>
          Tafsiran itu terlihat langsung pada gambar: ada tepat dua daerah ab karena ada dua cara
          memasangkan a dari satu arah dengan b dari arah lainnya.
        </p>
        <h4>Kenapa gambarnya hanya untuk a, b positif</h4>
        <p>
          Argumen luas mensyaratkan a, b &gt; 0. Namun identitasnya berlaku pada sembarang gelanggang
          komutatif — termasuk bilangan negatif, pecahan, dan bilangan kompleks — karena bukti
          aljabarnya hanya memakai sifat distributif dan komutatif. Gambar adalah alat untuk{' '}
          <em>melihat</em>, bukan batas keberlakuannya.
        </p>
      </>
    ),
  },

  rumus: {
    src: '([a:a] + [b:b])^2 = [a2:a^2] + [dua-ab:2ab] + [b2:b^2]',
    roles: { a: 'a', b: 'b', a2: 'a', 'dua-ab': 'ab', b2: 'b' },
    arti: {
      a: 'Bagian pertama dari sisi persegi.',
      b: 'Bagian kedua dari sisi persegi.',
      a2: 'Persegi a × a — pojok kiri atas.',
      'dua-ab': 'Dua daerah berukuran a × b. Inilah bagian yang hilang kalau kamu menulis a² + b².',
      b2: 'Persegi b × b — pojok kanan bawah.',
    },
  },

  soal: [
    {
      id: 'kj-1',
      tipe: 'pilihan',
      topicId: 'smp8-identitas-aljabar-dan-bentuk-kuadrat',
      kelas: 8,
      tingkat: 'mudah',
      konsep: 'kuadrat-jumlah',
      pertanyaan: 'Bentuk (x + 5)² sama dengan...',
      pilihan: [
        { id: 'a', label: 'x² + 25', diagnosa: 'Kamu mengkuadratkan tiap suku sendiri-sendiri. Dua ubin 5x-nya hilang.' },
        { id: 'b', label: 'x² + 5x + 25', diagnosa: 'Ubin persegi panjangnya baru dihitung satu. Ada dua ubin seperti itu.' },
        { id: 'c', label: 'x² + 10x + 25', benar: true },
        { id: 'd', label: 'x² + 10x + 10', diagnosa: 'Bagian terakhir seharusnya b², yaitu 5² = 25, bukan 2 × 5.' },
      ],
      hint: [
        'Cocokkan dengan bentuk (a + b)²: di sini a = x dan b berapa?',
        'Bagian tengahnya 2ab. Hitung 2 × x × 5.',
        'Bagian terakhir b², yaitu 5 × 5.',
      ],
      pembahasan: '(x + 5)² = x² + 2(x)(5) + 5² = x² + 10x + 25.',
    },
    (rnd) => {
      const a = 2 + Math.floor(rnd() * 6)
      const b = 1 + Math.floor(rnd() * 6)
      return {
        id: 'kj-2',
        tipe: 'angka',
        topicId: 'smp8-identitas-aljabar-dan-bentuk-kuadrat',
        kelas: 8,
        tingkat: 'sedang',
        konsep: 'kuadrat-jumlah',
        pertanyaan: `Berapa selisih antara (${a} + ${b})² dan ${a}² + ${b}²?`,
        jawaban: 2 * a * b,
        toleransi: 1e-6,
        hint: [
          'Hitung dulu keduanya secara terpisah, lalu kurangkan.',
          `(${a} + ${b})² = ${(a + b) ** 2}, sedangkan ${a}² + ${b}² = ${a * a + b * b}.`,
          'Perhatikan bahwa selisihnya selalu berupa 2ab — luas dua ubin persegi panjang.',
        ],
        pembahasan: `(${a}+${b})² = ${(a + b) ** 2} dan ${a}²+${b}² = ${a * a + b * b}. Selisihnya ${2 * a * b}, yaitu 2 × ${a} × ${b} — persis luas dua ubin ab.`,
      }
    },
    {
      id: 'kj-3',
      tipe: 'benar-salah',
      topicId: 'smp8-identitas-aljabar-dan-bentuk-kuadrat',
      kelas: 8,
      tingkat: 'sedang',
      konsep: 'kuadrat-jumlah',
      pertanyaan: 'Untuk semua bilangan a dan b, berlaku (a + b)² = a² + b².',
      jawaban: false,
      diagnosa:
        'Coba masukkan angka mana pun yang keduanya bukan nol, misalnya a = 1 dan b = 1: ruas kiri 4, ruas kanan 2.',
      hint: [
        'Cukup satu contoh yang gagal untuk membuktikan sebuah pernyataan tidak selalu benar.',
        'Coba a = 1 dan b = 1.',
        'Kedua ruas hanya sama kalau 2ab = 0, artinya salah satu di antaranya nol.',
      ],
      pembahasan:
        'Salah. Selisih kedua ruas selalu 2ab. Keduanya baru sama kalau a = 0 atau b = 0. Contoh penyangkal: a = b = 1 memberi 4 ≠ 2.',
    },
    {
      id: 'kj-4',
      tipe: 'cocokkan',
      topicId: 'smp8-identitas-aljabar-dan-bentuk-kuadrat',
      kelas: 9,
      tingkat: 'sulit',
      konsep: 'kuadrat-jumlah',
      pertanyaan: 'Pasangkan tiap bentuk dengan hasil penjabarannya.',
      pasangan: [
        { kiri: '(a + b)²', kanan: 'a² + 2ab + b²' },
        { kiri: '(a − b)²', kanan: 'a² − 2ab + b²' },
        { kiri: '(a + b)(a − b)', kanan: 'a² − b²' },
        { kiri: '(a + b)³', kanan: 'a³ + 3a²b + 3ab² + b³' },
      ],
      hint: [
        'Kuadrat dari selisih, (a − b)², memiliki suku tengah negatif: −2ab.',
        'Perkalian jumlah dengan selisih membuat suku tengahnya saling meniadakan.',
        'Untuk pangkat tiga, koefisiennya mengikuti baris keempat segitiga Pascal: 1, 3, 3, 1.',
      ],
      pembahasan:
        'Tiga bentuk pertama semuanya bisa dibaca dari gambar persegi. Bentuk keempat adalah versi tiga dimensinya: sebuah kubus bersisi (a+b) terbagi menjadi 8 balok.',
    },
    {
      id: 'kj-5',
      tipe: 'angka',
      topicId: 'smp8-identitas-aljabar-dan-bentuk-kuadrat',
      kelas: 9,
      tingkat: 'sulit',
      konsep: 'kuadrat-jumlah',
      pertanyaan:
        'Hitung 102² tanpa kalkulator dengan memanfaatkan identitas (a + b)². Berapa hasilnya?',
      jawaban: 10404,
      toleransi: 1e-6,
      hint: [
        'Pecah 102 menjadi dua angka yang mudah dikuadratkan: 100 dan 2.',
        '(100 + 2)² = 100² + 2 × 100 × 2 + 2².',
        'Jumlahkan: 10.000 + 400 + 4.',
      ],
      pembahasan:
        '102² = (100 + 2)² = 10.000 + 400 + 4 = 10.404. Identitas ini sudah dikenal lebih dari dua ribu tahun lalu: Euklides menuliskannya sebagai dalil tentang persegi yang sisinya dipotong menjadi dua bagian sembarang, persis seperti gambar tadi.',
    },
  ],

  lanjut: ['pythagoras', 'parabola', 'perkalian-luas'],
}

export default konsep
