/* ============================================================
   KONSEP — Kenapa a² + b² = c² selalu benar?
   Kelas 8 · Geometri

   Gagasan pembuktian (bukti susun ulang klasik):
   Dua persegi besar yang ukurannya PERSIS SAMA, masing-masing
   bersisi (a+b). Keduanya diisi empat salinan segitiga siku-siku
   yang sama, hanya susunannya berbeda.
     - Susunan pertama menyisakan dua persegi: a² dan b².
     - Susunan kedua menyisakan satu persegi: c².
   Karena luas persegi besarnya sama dan yang dibuang sama
   (empat segitiga), sisanya wajib sama: a² + b² = c².

   Interaksi langsung:
     - Bongkar langkah 0: seret ujung kedua sisi tegak segitiga
       (titik ungu naik-turun untuk a, titik jingga kiri-kanan untuk b).
     - Bongkar langkah 1–5: seret ujung garis ukur di tepi persegi
       besar pertama — garis ungu di sisi persegi a², garis jingga di
       bawah persegi b².
     - Eksperimen: seret pojok luar persegi ungu (a) atau persegi
       jingga (b); segitiga dan persegi merah muda ikut berubah.
   Skala satuan tidak pernah bergantung pada penggeser, supaya titik
   yang diseret selalu menempel pada jari.
   ============================================================ */

import { Pegangan, useInteraksi } from '../components/Interaksi'
import { Svg, Tag, SikuSiku, useSempit, useSkalaSvg } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { fmt } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

type Titik = [number, number]

const poly = (t: Titik[]) => t.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')

/* ---------------- Label yang tidak saling menabrak ---------------- */

type Jangkar = 'start' | 'middle' | 'end'

interface Kotak {
  x0: number
  y0: number
  x1: number
  y1: number
}

/** Huruf label tidak boleh tampil lebih kecil dari ini di layar (sama dengan Tag). */
const HURUF_MIN_PX = 11

/** Ukuran huruf Tag di layar ini — rumusnya sama dengan Tag di Stage.tsx. */
const ukuranHuruf = (skala: number, size: number) =>
  skala > 0 ? Math.max(size, Math.min(size * 1.6, HURUF_MIN_PX / skala)) : size

/** Kotak yang ditempati sebuah Tag — rumusnya sama dengan Tag di Stage.tsx. */
function kotakTag(
  skala: number,
  x: number,
  y: number,
  teks: string,
  size: number,
  anchor: Jangkar = 'middle',
  layar = false,
): Kotak {
  const uk = layar ? size : ukuranHuruf(skala, size)
  const lebar = teks.length * uk * 0.58 + 14 * (uk / size)
  const x0 = anchor === 'middle' ? x - lebar / 2 : anchor === 'end' ? x - lebar : x
  return { x0, x1: x0 + lebar, y0: y - uk * 0.82, y1: y + uk * 0.68 }
}

const tabrak = (a: Kotak, b: Kotak, sela = 2) =>
  a.x0 < b.x1 + sela && b.x0 < a.x1 + sela && a.y0 < b.y1 + sela && b.y0 < a.y1 + sela

const kotakTitik = (pts: Titik[], pad = 0): Kotak => ({
  x0: Math.min(...pts.map((q) => q[0])) - pad,
  y0: Math.min(...pts.map((q) => q[1])) - pad,
  x1: Math.max(...pts.map((q) => q[0])) + pad,
  y1: Math.max(...pts.map((q) => q[1])) + pad,
})

interface Calon {
  x: number
  y: number
  anchor?: Jangkar
  /** syarat tambahan, mis. harus muat di dalam perseginya. */
  boleh?: (k: Kotak) => boolean
  /** true bila calon ini boleh menimpa bentuk (dipakai untuk label di dalam persegi). */
  diDalam?: boolean
}

interface Letak {
  x: number
  y: number
  anchor: Jangkar
  /** di dalam bentuk: digambar tanpa latar, cukup hurufnya. */
  diDalam: boolean
}

/**
 * Penata label: tiap label memilih calon letak pertama yang muat di bingkai
 * dan tidak menabrak pegangan, label pegangan, ajakan, atau label lain.
 * Bila tidak ada yang lega, label disembunyikan: angkanya tetap terbaca di
 * kontrol angka dan rumus, dan itu lebih baik daripada label yang bertumpuk.
 */
function penata(w: number, h: number, skala: number) {
  const halangan: Kotak[] = []
  /** bentuk (persegi, segitiga) — hanya dihindari label yang diletakkan di luar bentuk. */
  const bentuk: Kotak[] = []
  const muat = (k: Kotak) => k.x0 >= 2 && k.y0 >= 2 && k.x1 <= w - 2 && k.y1 <= h - 2
  return {
    tambah: (...k: Kotak[]) => {
      halangan.push(...k)
    },
    tambahBentuk: (...k: Kotak[]) => {
      bentuk.push(...k)
    },
    taruh(teks: string, size: number, calon: Calon[]): Letak | null {
      for (const c of calon) {
        const anchor = c.anchor ?? 'middle'
        const penuh = kotakTag(skala, c.x, c.y, teks, size, anchor)
        // Label di dalam bentuk digambar tanpa latar: yang dihitung hanya hurufnya.
        const bantalan = c.diDalam ? 7 * (ukuranHuruf(skala, size) / size) : 0
        const k = { ...penuh, x0: penuh.x0 + bantalan, x1: penuh.x1 - bantalan }
        if (!muat(k)) continue
        if (halangan.some((o) => tabrak(k, o))) continue
        if (!c.diDalam && bentuk.some((o) => tabrak(k, o, 1))) continue
        if (c.boleh && !c.boleh(k)) continue
        halangan.push(k)
        return { x: c.x, y: c.y, anchor, diDalam: !!c.diDalam }
      }
      return null
    },
  }
}

/* ---------------- Ukuran pegangan ---------------- */

type Arah = 'x' | 'y' | 'bebas'

/** Ajakan di bawah pegangan utama — pendek supaya muat walau titiknya dekat tepi. */
const AJAKAN = 'Seret aku'

/** Ukuran pegangan dalam satuan SVG — meniru Pegangan di Interaksi.tsx. */
function ukuranPegangan(skalaLayar: number) {
  const s = skalaLayar || 0.6
  const r = Math.max(8, 9 / s)
  const ujung = r * 1.9 + 1 / s
  const lebar = r * 0.55 + 1 / s
  const luar = r + 1.75 / s
  return {
    /** jarak ujung panah petunjuk dari pusat titik. */
    ujung,
    /** titik beserta panah petunjuk arahnya. */
    titik([x, y]: Titik, arah: Arah): Kotak[] {
      const k: Kotak[] = [{ x0: x - luar, y0: y - luar, x1: x + luar, y1: y + luar }]
      if (arah !== 'y') k.push({ x0: x - ujung, y0: y - lebar, x1: x + ujung, y1: y + lebar })
      if (arah !== 'x') k.push({ x0: x - lebar, y0: y - ujung, x1: x + lebar, y1: y + ujung })
      return k
    },
    /** lingkaran terang di sekeliling pegangan yang sedang dipegang. */
    halo: ([x, y]: Titik): Kotak => ({ x0: x - r * 2.1, y0: y - r * 2.1, x1: x + r * 2.1, y1: y + r * 2.1 }),
    /** label nilai yang muncul di atas titik saat dipegang. */
    label: ([x, y]: Titik, teks: string) => kotakTag(0, x, y - r - 22 / s, teks, 15 / s, 'middle', true),
    /** ajakan di bawah pegangan utama. */
    ajakan: ([x, y]: Titik) => kotakTag(0, x, y + r + 24 / s, AJAKAN, 13 / s, 'middle', true),
  }
}

interface InfoPegangan {
  key: string
  di: Titik
  arah: Arah
  label: string
  utama: boolean
}

/** Semua yang ditempati pegangan: titik + panah, label dan lingkaran terang bila dipegang, ajakan. */
function halanganPegangan(
  daftar: InfoPegangan[],
  skala: number,
  aktif: string | null,
  ajakan: boolean,
): Kotak[] {
  const peg = ukuranPegangan(skala)
  const k: Kotak[] = []
  for (const p of daftar) {
    k.push(...peg.titik(p.di, p.arah))
    if (aktif === p.key) k.push(peg.halo(p.di), peg.label(p.di, p.label))
    if (p.utama && ajakan && aktif !== p.key) k.push(peg.ajakan(p.di))
  }
  return k
}

/* ---------------- Bagian gambar ---------------- */

/** Titik-titik untuk sebuah persegi besar bersisi (a+b) di posisi (X, Y). */
function susunan(X: number, Y: number, a: number, b: number, u: number) {
  const s = (a + b) * u
  const A = a * u
  const B = b * u
  const P = (px: number, py: number): Titik => [X + px, Y + py]

  return {
    s,
    A,
    B,
    P,
    /* --- Susunan I: dua persegi (a² dan b²) + empat segitiga --- */
    kotakA: [X, Y, A, A] as const, // a² di kiri atas
    kotakB: [X + A, Y + A, B, B] as const, // b² di kanan bawah
    // Persegi panjang kanan atas (b lebar, a tinggi) dibelah diagonal.
    segi1a: [P(A, 0), P(A + B, 0), P(A + B, A)] as Titik[],
    segi1b: [P(A, 0), P(A, A), P(A + B, A)] as Titik[],
    // Persegi panjang kiri bawah (a lebar, b tinggi) dibelah diagonal.
    segi1c: [P(0, A), P(A, A), P(A, A + B)] as Titik[],
    segi1d: [P(0, A), P(0, A + B), P(A, A + B)] as Titik[],

    /* --- Susunan II: empat segitiga di pojok, sisanya persegi c² --- */
    segi2a: [P(0, 0), P(A, 0), P(0, B)] as Titik[],
    segi2b: [P(A, 0), P(s, 0), P(s, A)] as Titik[],
    segi2c: [P(s, A), P(s, s), P(B, s)] as Titik[],
    segi2d: [P(B, s), P(0, s), P(0, B)] as Titik[],
    kotakC: [P(A, 0), P(s, A), P(B, s), P(0, B)] as Titik[],
  }
}

function Segitiga({ t, opacity = 1 }: { t: Titik[]; opacity?: number }) {
  return (
    <polygon
      points={poly(t)}
      fill="var(--m-c)"
      fillOpacity={0.28 * opacity}
      stroke="var(--m-c)"
      strokeWidth={1.8}
      strokeOpacity={opacity}
      strokeLinejoin="round"
    />
  )
}

/**
 * Huruf di tengah sebuah persegi ("a²" dan luasnya). Ukurannya tidak pernah
 * lebih kecil dari 11 px layar. Bila label pegangan menutupi bagian tengah
 * (mis. saat sisinya sedang diseret di HP), hurufnya digeser ke bagian
 * persegi yang masih lega; bila tetap tidak muat, angkanya dilepas lebih
 * dulu, dan baru bila "a²" pun tidak muat hurufnya tidak digambar.
 */
function IsiPersegi({
  cx,
  cy,
  sisi,
  warna,
  label,
  nilai,
  skala,
  halangan = [],
}: {
  cx: number
  cy: number
  /** sisi daerah persegi yang lega untuk huruf. */
  sisi: number
  warna: string
  label: string
  nilai?: string
  skala: number
  halangan?: Kotak[]
}) {
  const px = (n: number) => (skala > 0 ? n / skala : n)
  const huruf = Math.max(px(12), Math.min(22, sisi * 0.4))
  if (sisi < huruf * 2.2) return null
  const hurufNilai = Math.max(px(11), 12.5)
  const muatNilai =
    !!nilai && sisi >= huruf + hurufNilai + 16 && nilai.length * hurufNilai * 0.6 <= sisi - 8
  const setengahLabel = label.length * huruf * 0.35
  const setengahNilai = (nilai?.length ?? 0) * hurufNilai * 0.32
  const tepi = 2

  /** Letak huruf (dan angka) bila blok hurufnya berpusat di (x, y). */
  const susun = (x: number, y: number, pakaiNilai: boolean) => {
    const yLabel = y - (pakaiNilai ? hurufNilai * 0.55 : 0)
    const yNilai = y + huruf * 0.6
    const kotak: Kotak[] = [
      { x0: x - setengahLabel, x1: x + setengahLabel, y0: yLabel - huruf * 0.55, y1: yLabel + huruf * 0.5 },
    ]
    if (pakaiNilai) {
      kotak.push({ x0: x - setengahNilai, x1: x + setengahNilai, y0: yNilai - hurufNilai * 0.55, y1: yNilai + hurufNilai * 0.5 })
    }
    return { x, yLabel, yNilai, pakaiNilai, kotak }
  }

  // Calon letak: tengah dulu, lalu digeser sejauh ruang lega di dalam persegi.
  const calon = (pakaiNilai: boolean) => {
    const tengah = susun(cx, cy, pakaiNilai)
    const atas = Math.min(...tengah.kotak.map((k) => k.y0))
    const bawah = Math.max(...tengah.kotak.map((k) => k.y1))
    const setengahLebar = Math.max(...tengah.kotak.map((k) => k.x1 - k.x0)) / 2
    const gx = Math.max(0, sisi / 2 - tepi - setengahLebar)
    const gAtas = -Math.max(0, atas - (cy - sisi / 2 + tepi)) // ke atas: negatif
    const gBawah = Math.max(0, cy + sisi / 2 - tepi - bawah)
    const geser: Titik[] = [
      [0, 0],
      [gx, 0],
      [-gx, 0],
      [0, gAtas],
      [0, gBawah],
      [gx, gAtas],
      [-gx, gAtas],
      [gx, gBawah],
      [-gx, gBawah],
    ]
    return geser.map(([dx, dy]) => susun(cx + dx, cy + dy, pakaiNilai))
  }
  const letak = [...(muatNilai ? calon(true) : []), ...calon(false)].find(
    (c) => !c.kotak.some((k) => halangan.some((o) => tabrak(k, o, 1))),
  )
  if (!letak) return null
  const { x: xHuruf, yLabel, yNilai, pakaiNilai: tampakNilai } = letak
  return (
    <g style={{ pointerEvents: 'none' }}>
      <text
        x={xHuruf}
        y={yLabel}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={huruf}
        fontWeight={800}
        fill={warna}
      >
        {label}
      </text>
      {tampakNilai && (
        <text
          x={xHuruf}
          y={yNilai}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={hurufNilai}
          fontWeight={700}
          fill="var(--ink-2)"
        >
          {nilai}
        </text>
      )}
    </g>
  )
}

function Kotak4({
  k,
  warna,
  label,
  nilai,
  nyala = false,
  skala,
  halangan,
}: {
  k: readonly [number, number, number, number]
  warna: string
  label: string
  nilai?: string
  nyala?: boolean
  skala: number
  halangan?: Kotak[]
}) {
  const [x, y, w, h] = k
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={warna}
        fillOpacity={nyala ? 0.5 : 0.28}
        stroke={warna}
        strokeWidth={nyala ? 3 : 2}
      />
      <IsiPersegi
        cx={x + w / 2}
        cy={y + h / 2}
        sisi={Math.min(w, h)}
        warna={warna}
        label={label}
        nilai={nilai}
        skala={skala}
        halangan={halangan}
      />
    </g>
  )
}

/** ├──── ● : garis ukur di tepi persegi; titik di ujungnya adalah pegangan. */
function GarisUkur({
  dari,
  ke,
  warna,
  nyala,
}: {
  dari: Titik
  ke: Titik
  warna: string
  nyala: boolean
}) {
  const tegak = Math.abs(ke[0] - dari[0]) < Math.abs(ke[1] - dari[1])
  const t = 7
  const [tx, ty] = tegak ? [t, 0] : [0, t]
  return (
    <g style={{ pointerEvents: 'none' }}>
      <line x1={dari[0]} y1={dari[1]} x2={ke[0]} y2={ke[1]} stroke={warna} strokeWidth={nyala ? 4 : 2.5} strokeLinecap="round" />
      <line x1={dari[0] - tx} y1={dari[1] - ty} x2={dari[0] + tx} y2={dari[1] + ty} stroke={warna} strokeWidth={2} />
      <line x1={ke[0] - tx} y1={ke[1] - ty} x2={ke[0] + tx} y2={ke[1] + ty} stroke={warna} strokeWidth={2} />
    </g>
  )
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

/**
 * Satu tata letak untuk satu ukuran panggung.
 *
 * Langkah 0 — segitiga dengan titik siku-siku tetap di (x0, y0), satuan su:
 *   ujung a di (x0, y0 − a·su), ujung b di (x0 + b·su, y0).
 * Langkah 1–5 — persegi besar pertama berpojok kiri atas TETAP di (X1, Y1),
 *   satuan u; pegangan a di ujung bawah garis ukur kiri (X1 − d, Y1 + a·u),
 *   pegangan b di ujung kanan garis ukur bawah (X1 + (a+b)·u, Y1 + (a+b)·u + d).
 *   Persegi kedua tidak punya pegangan, jadi letaknya boleh mengikuti ukuran.
 *
 * Jarak di tepi dihitung untuk skala layar serendah 0,78 px per satuan (HP 360 px):
 * label pegangan "a = 6" dan ajakan di bawah pegangan a masih di dalam bingkai,
 * dan kedua pegangan tetap ≥ 48 px terpisah pada a = b = 1.
 */
interface TataBongkar {
  w: number
  h: number
  maxH: number
  sempit: boolean
  su: number
  x0: number
  y0: number
  u: number
  X1: number
  Y1: number
  /** jarak garis ukur dari tepi persegi. */
  d: number
  /** lebar: tepi kanan persegi kedua. HP: jarak tegak antara kedua persegi. */
  sela: number
  atasY: number
  hurufAtas: number
}

const BONGKAR_LEBAR: TataBongkar = {
  w: 690,
  h: 440,
  maxH: 440,
  sempit: false,
  su: 48,
  x0: 201,
  y0: 388,
  u: 23,
  X1: 72,
  Y1: 100,
  d: 20,
  sela: 30,
  atasY: 34,
  hurufAtas: 16,
}

const BONGKAR_HP: TataBongkar = {
  w: 420,
  h: 540,
  maxH: 540,
  sempit: true,
  su: 49,
  x0: 88,
  y0: 430,
  u: 17,
  X1: 72,
  Y1: 74,
  d: 18,
  sela: 50,
  atasY: 22,
  hurufAtas: 15,
}

/** Sisi a dan b bongkar, dibulatkan — dipakai bersama oleh gambar dan teks langkah. */
function sisiBongkar(p: Record<string, number>) {
  return { a: Math.round(p.a ?? 3), b: Math.round(p.b ?? 4) }
}

/**
 * Label sisi miring, dipakai bersama oleh gambar dan narasi supaya
 * keduanya menulis angka yang sama persis: tepat bila bulat, selain itu ≈.
 */
function miringLabel(a: number, b: number) {
  const c = Math.sqrt(a * a + b * b)
  return Math.abs(c - Math.round(c)) < 1e-9 ? `c = ${fmt(c)}` : `c ≈ ${fmt(c, 2)}`
}

function VisualBongkar(props: DeriveState) {
  const L = useSempit() ? BONGKAR_HP : BONGKAR_LEBAR
  return (
    <Svg
      w={L.w}
      h={L.h}
      maxH={L.maxH}
      label={
        props.step === 0
          ? 'Segitiga siku-siku dengan sisi a, b, dan c'
          : 'Dua persegi besar berukuran sama dengan susunan segitiga yang berbeda'
      }
    >
      <IsiBongkar {...props} L={L} />
    </Svg>
  )
}

function IsiBongkar({ step, t, p, sorot, L }: DeriveState & { L: TataBongkar }) {
  const { a, b } = sisiBongkar(p)
  const skala = useSkalaSvg()
  const ctx = useInteraksi()
  const aktif = ctx?.kendali.aktif ?? null
  const ajakan = !!ctx?.ajakan
  const tata = penata(L.w, L.h, skala)

  const nyalaA = sorot === 'a2' || sorot === 'a' || aktif === 'a'
  const nyalaB = sorot === 'b2' || sorot === 'b' || aktif === 'b'
  const nyalaC = sorot === 'c2' || sorot === 'c'

  const teksA = `a = ${fmt(a)}`
  const teksB = `b = ${fmt(b)}`

  /* ---------- Posisi pegangan dan kebalikannya, per langkah ---------- */
  // Langkah 0 adalah keadaan pertama yang dilihat anak (animasi belum diputar,
  // t = 0), jadi segitiganya sudah tampak samar dan bisa langsung dipegang.
  // Yang samar hanya bidang segitiganya: sisi tegak yang diseret, tanda siku-siku,
  // dan label angka selalu penuh, karena huruf ungu/jingga pada opacity 0,45
  // kontrasnya hanya ±2 : 1 dan ±1,5 : 1 terhadap latar.
  const awal = 0.45 + 0.55 * fase(step, t, 0)
  const kiri = fase(step, t, 1)
  const u = L.u
  const g1 = susunan(L.X1, L.Y1, a, b, u)
  const X2 = L.sempit ? L.X1 : L.w - L.sela - g1.s
  const Y2 = L.sempit ? L.Y1 + g1.s + L.sela : L.Y1
  const g2 = susunan(X2, Y2, a, b, u)

  const segitiga = step === 0
  const su = L.su
  const ujungA: Titik = segitiga ? [L.x0, L.y0 - a * su] : [L.X1 - L.d, L.Y1 + g1.A]
  const ujungB: Titik = segitiga ? [L.x0 + b * su, L.y0] : [L.X1 + g1.s, L.Y1 + g1.s + L.d]
  const nilaiA = segitiga
    ? (pt: { x: number; y: number }) => (L.y0 - pt.y) / su
    : (pt: { x: number; y: number }) => (pt.y - L.Y1) / u
  const nilaiB = segitiga
    ? (pt: { x: number; y: number }) => (pt.x - L.x0) / su
    : (pt: { x: number; y: number }) => (pt.x - L.X1) / u - a
  // Pegangan baru muncul setelah objeknya terlihat.
  const tampakPegangan = segitiga || kiri > 0.5

  // Pegangan utama biasanya a. Ajakan "Seret aku" tampil di bawah titiknya;
  // bila di sana ajakan itu menabrak pegangan b (a dan b sama-sama kecil) atau
  // keluar bingkai, peran utama pindah ke b — atau tidak ada sama sekali.
  const ukPeg = ukuranPegangan(skala)
  const ajakanLega = (di: Titik, lain: Titik, arahLain: Arah, kunciLain: string, teksLain: string) => {
    const k = ukPeg.ajakan(di)
    const hal = ukPeg.titik(lain, arahLain)
    if (aktif === kunciLain) hal.push(ukPeg.label(lain, teksLain), ukPeg.halo(lain))
    return k.x0 >= 2 && k.y0 >= 2 && k.x1 <= L.w - 2 && k.y1 <= L.h - 2 && !hal.some((o) => tabrak(k, o))
  }
  const utama = !ajakan
    ? 'a'
    : ajakanLega(ujungA, ujungB, 'x', 'b', teksB)
      ? 'a'
      : ajakanLega(ujungB, ujungA, 'y', 'a', teksA)
        ? 'b'
        : null
  const daftarPegangan: InfoPegangan[] = [
    { key: 'a', di: ujungA, arah: 'y', label: teksA, utama: utama === 'a' },
    { key: 'b', di: ujungB, arah: 'x', label: teksB, utama: utama === 'b' },
  ]
  const halPegangan = tampakPegangan ? halanganPegangan(daftarPegangan, skala, aktif, ajakan) : []
  tata.tambah(...halPegangan)

  // Pegangan dirender di tempat yang sama pada setiap langkah, supaya seret
  // yang sedang berjalan tidak terputus saat animasi berpindah langkah.
  const pegangan = (
    <>
      <Pegangan
        x={ujungA[0]}
        y={ujungA[1]}
        param="a"
        arah="y"
        utama={utama === 'a'}
        ajakan={AJAKAN}
        label={teksA}
        keNilai={nilaiA}
        sembunyi={!tampakPegangan}
      />
      <Pegangan
        x={ujungB[0]}
        y={ujungB[1]}
        param="b"
        arah="x"
        utama={utama === 'b'}
        ajakan={AJAKAN}
        label={teksB}
        keNilai={nilaiB}
        sembunyi={!tampakPegangan}
      />
    </>
  )

  /* ---------- Langkah 0: satu segitiga siku-siku saja ---------- */
  if (segitiga) {
    const A: Titik = [L.x0, L.y0]
    const B = ujungB
    const C = ujungA
    const ket = L.sempit ? 'sudutnya harus siku-siku' : 'sudutnya siku-siku — syarat yang tidak boleh dilanggar'
    tata.tambah(kotakTag(skala, L.w / 2, L.atasY, ket, L.hurufAtas))

    const letakB =
      aktif === 'b'
        ? null
        : tata.taruh(teksB, 17, [
            { x: (A[0] + B[0]) / 2, y: L.y0 + 30 },
            { x: L.x0 - 14, y: L.y0 + 30, anchor: 'end' },
          ])
    const letakA =
      aktif === 'a'
        ? null
        : tata.taruh(teksA, 17, [
            { x: L.x0 - 22, y: (A[1] + C[1]) / 2, anchor: 'end' },
            { x: L.x0 - 22, y: C[1], anchor: 'end' },
            { x: L.x0 - 22, y: L.y0 - 12, anchor: 'end' },
          ])

    // Label c di luar sisi miring, menjauhi titik siku-siku.
    const c = Math.hypot(a, b)
    const nx = a / c
    const ny = -b / c
    const teksC = miringLabel(a, b)
    const ukC = ukuranHuruf(skala, 17)
    const setengahLebar = (teksC.length * ukC * 0.58 + 14 * (ukC / 17)) / 2
    const jarak = Math.abs(nx) * setengahLebar + Math.abs(ny) * ukC * 0.75 + 8
    const M: Titik = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2]
    const letakC = tata.taruh(
      teksC,
      17,
      [0, 20, 44, 70].map((tambah) => ({
        x: M[0] + nx * (jarak + tambah),
        y: M[1] + ny * (jarak + tambah) + ukC * 0.07,
      })),
    )

    return (
      <>
        <polygon
          points={poly([A, B, C])}
          fill="var(--m-c)"
          fillOpacity={0.25 * awal}
          stroke="var(--m-c)"
          strokeWidth={3}
          strokeLinejoin="round"
        />
        {/* sisi tegak diwarnai seperti pegangannya */}
        <g style={{ pointerEvents: 'none' }}>
          <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke="var(--m-a)" strokeWidth={nyalaA ? 6 : 4} strokeLinecap="round" />
          <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke="var(--m-b)" strokeWidth={nyalaB ? 6 : 4} strokeLinecap="round" />
        </g>
        <SikuSiku x={L.x0} y={L.y0} ux={1} uy={0} vx={0} vy={-1} s={16} warna="var(--m-c)" />
        {letakB && (
          <Tag x={letakB.x} y={letakB.y} anchor={letakB.anchor} warna="var(--m-b)" size={17}>
            {teksB}
          </Tag>
        )}
        {letakA && (
          <Tag x={letakA.x} y={letakA.y} anchor={letakA.anchor} warna="var(--m-a)" size={17}>
            {teksA}
          </Tag>
        )}
        {letakC && (
          <Tag x={letakC.x} y={letakC.y} warna={nyalaC ? 'var(--m-hi)' : 'var(--m-c)'} size={17}>
            {teksC}
          </Tag>
        )}
        <Tag x={L.w / 2} y={L.atasY} warna="var(--ink-2)" size={L.hurufAtas}>
          {ket}
        </Tag>
        {pegangan}
      </>
    )
  }

  /* ---------- Langkah 1–5: dua persegi besar ---------- */
  const kanan = fase(step, t, 2)
  const samaBesar = fase(step, t, 3)
  const buang = step === 4 ? seg(t, 0.15, 0.95) : step > 4 ? 1 : 0
  const selesai = step >= 5
  const segitigaOpacity = 1 - buang
  const s = g1.s
  const { X1, Y1 } = L

  // Luas c² baru boleh ditulis sebagai angka setelah terbukti (langkah terakhir);
  // sebelum itu angkanya hanya bisa didapat dari teorema yang sedang dibuktikan.
  const angkaC = selesai

  // Keterangan di atas gambar.
  const jumlah = a * a + b * b
  const keterangan =
    step === 3 && samaBesar > 0.3
      ? L.sempit
        ? `sama-sama bersisi ${fmt(a + b)} dan berisi 4 segitiga`
        : `kedua persegi sama-sama bersisi ${fmt(a + b)}, dan berisi 4 segitiga yang sama`
      : step === 4
        ? 'empat segitiga dibuang dari kedua sisi'
        : selesai
          ? `${fmt(a * a)} + ${fmt(b * b)} = ${fmt(jumlah)}`
          : null
  const hurufKet = selesai ? L.hurufAtas + 2 : L.hurufAtas
  if (keterangan) tata.tambah(kotakTag(skala, L.w / 2, L.atasY, keterangan, hurufKet))

  // Bentuk yang tidak boleh ditimpa label di luar persegi.
  const kotak1: Kotak = { x0: X1, y0: Y1, x1: X1 + s, y1: Y1 + s }
  const kotak2: Kotak = { x0: X2, y0: Y2, x1: X2 + s, y1: Y2 + s }
  const ukurA: [Titik, Titik] = [[X1 - L.d, Y1], ujungA]
  const ukurB: [Titik, Titik] = [[X1 + g1.A, ujungB[1]], ujungB]
  tata.tambahBentuk(kotak1, kotak2, kotakTitik(ukurA, 4), kotakTitik(ukurB, 4))

  // Tanda "=" di antara kedua persegi.
  const sama: Titik = L.sempit
    ? [X1 + s + 44, Y1 + s + L.sela / 2]
    : [(X1 + s + X2) / 2, Y1 + s / 2]
  const tampakSama = samaBesar > 0.3 || selesai
  if (tampakSama) tata.tambah(kotakTag(skala, sama[0], sama[1], '=', 22))

  // Judul tiap susunan: di atas persegi (lebar) atau di kanannya (HP).
  const judul1 = selesai ? `a² + b² = ${fmt(jumlah)}` : L.sempit ? 'susunan 1' : 'susunan pertama'
  const judul2 = selesai ? `c² = ${fmt(jumlah)}` : L.sempit ? 'susunan 2' : 'susunan kedua'
  const calonJudul = (X: number, Y: number): Calon[] =>
    L.sempit
      ? [
          { x: X + s + 12, y: Y + 10, anchor: 'start' },
          { x: X + s + 12, y: Y + s / 2, anchor: 'start' },
        ]
      : [
          { x: X + s / 2, y: Y - 22 },
          { x: X + s, y: Y - 22, anchor: 'end' },
        ]
  const letakJudul1 = kiri > 0 ? tata.taruh(judul1, L.sempit ? 14 : 15, calonJudul(X1, Y1)) : null
  const letakJudul2 = kanan > 0 ? tata.taruh(judul2, L.sempit ? 14 : 15, calonJudul(X2, Y2)) : null

  // Huruf a dan b pada garis ukur.
  const letakHurufA =
    aktif === 'a'
      ? null
      : tata.taruh('a', 15, [
          { x: X1 - L.d - 10, y: Y1 + g1.A / 2, anchor: 'end' },
          { x: X1 - L.d - 10, y: Y1 + 6, anchor: 'end' },
        ])
  const letakHurufB =
    aktif === 'b'
      ? null
      : tata.taruh('b', 15, [
          { x: X1 + g1.A + g1.B / 2, y: ujungB[1] + 19 },
          { x: X1 + g1.A - 12, y: ujungB[1], anchor: 'end' },
        ])

  return (
    <>
      {/* ---------- Persegi besar pertama ---------- */}
      <g opacity={kiri}>
        <rect x={X1} y={Y1} width={s} height={s} fill="none" stroke="var(--ink)" strokeWidth={2.5} />
        <Kotak4
          k={g1.kotakA}
          warna="var(--m-a)"
          label="a²"
          nilai={fmt(a * a)}
          nyala={nyalaA || selesai}
          skala={skala}
          halangan={halPegangan}
        />
        <Kotak4
          k={g1.kotakB}
          warna="var(--m-b)"
          label="b²"
          nilai={fmt(b * b)}
          nyala={nyalaB || selesai}
          skala={skala}
          halangan={halPegangan}
        />
        {segitigaOpacity > 0.01 && (
          <>
            <Segitiga t={g1.segi1a} opacity={segitigaOpacity} />
            <Segitiga t={g1.segi1b} opacity={segitigaOpacity} />
            <Segitiga t={g1.segi1c} opacity={segitigaOpacity} />
            <Segitiga t={g1.segi1d} opacity={segitigaOpacity} />
          </>
        )}
        <GarisUkur dari={ukurA[0]} ke={ukurA[1]} warna="var(--m-a)" nyala={nyalaA} />
        <GarisUkur dari={ukurB[0]} ke={ukurB[1]} warna="var(--m-b)" nyala={nyalaB} />
        {letakHurufA && (
          <Tag x={letakHurufA.x} y={letakHurufA.y} anchor={letakHurufA.anchor} warna="var(--m-a)" size={15} latar={null}>
            a
          </Tag>
        )}
        {letakHurufB && (
          <Tag x={letakHurufB.x} y={letakHurufB.y} anchor={letakHurufB.anchor} warna="var(--m-b)" size={15} latar={null}>
            b
          </Tag>
        )}
        {letakJudul1 && (
          <Tag x={letakJudul1.x} y={letakJudul1.y} anchor={letakJudul1.anchor} warna="var(--ink-2)" size={L.sempit ? 14 : 15}>
            {judul1}
          </Tag>
        )}
      </g>

      {/* ---------- Persegi besar kedua ---------- */}
      <g opacity={kanan}>
        <rect x={X2} y={Y2} width={s} height={s} fill="none" stroke="var(--ink)" strokeWidth={2.5} />
        <polygon
          points={poly(g2.kotakC)}
          fill="var(--m-hi)"
          fillOpacity={nyalaC || selesai ? 0.5 : 0.28}
          stroke="var(--m-hi)"
          strokeWidth={nyalaC || selesai ? 3 : 2}
          strokeLinejoin="round"
        />
        <IsiPersegi
          cx={X2 + s / 2}
          cy={Y2 + s / 2}
          // daerah lega di tengah persegi miring: persegi tegak di dalamnya
          sisi={Math.hypot(g1.A, g1.B) * Math.SQRT1_2}
          warna="var(--m-hi)"
          label="c²"
          nilai={angkaC ? fmt(jumlah) : undefined}
          skala={skala}
        />
        {segitigaOpacity > 0.01 && (
          <>
            <Segitiga t={g2.segi2a} opacity={segitigaOpacity} />
            <Segitiga t={g2.segi2b} opacity={segitigaOpacity} />
            <Segitiga t={g2.segi2c} opacity={segitigaOpacity} />
            <Segitiga t={g2.segi2d} opacity={segitigaOpacity} />
          </>
        )}
        {letakJudul2 && (
          <Tag x={letakJudul2.x} y={letakJudul2.y} anchor={letakJudul2.anchor} warna="var(--ink-2)" size={L.sempit ? 14 : 15}>
            {judul2}
          </Tag>
        )}
      </g>

      {/* ---------- Keterangan ---------- */}
      {keterangan && (
        <Tag x={L.w / 2} y={L.atasY} warna={selesai ? 'var(--ink)' : 'var(--m-c)'} size={hurufKet}>
          {keterangan}
        </Tag>
      )}
      {tampakSama && (
        <Tag x={sama[0]} y={sama[1]} warna="var(--ink-3)" size={22} latar={null}>
          =
        </Tag>
      )}

      {pegangan}
    </>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

/**
 * Titik siku-siku A tetap di (Ax, Ay); satuan u tetap. Untuk a, b ≤ 6 gambar
 * menjangkau x = Ax − 6u … Ax + 12u dan y = Ay − 12u … Ay + 6u.
 *   pegangan a: pojok luar persegi ungu  (Ax − a·u, Ay − a·u)
 *   pegangan b: pojok luar persegi jingga (Ax + b·u, Ay + b·u)
 * Keduanya bergerak diagonal; keNilai memproyeksikan jari ke diagonal itu.
 * Jarak kedua pojok (a + b)·u·√2 ≥ 2,83u, jadi tetap ±48 px di layar HP
 * walau a = b = 1. Di kiri disisakan ruang untuk label "a = 5,5", di bawah
 * untuk ajakan di bawah pegangan b.
 */
interface TataEks {
  w: number
  h: number
  maxH: number
  u: number
  Ax: number
  Ay: number
  ketX: number
  ketY: number
  ketAnchor: Jangkar
}

const EKS_LEBAR: TataEks = { w: 690, h: 476, maxH: 476, u: 23, Ax: 299, Ay: 284, ketX: 10, ketY: 460, ketAnchor: 'start' }
const EKS_HP: TataEks = { w: 420, h: 472, maxH: 472, u: 21, Ax: 164, Ay: 258, ketX: 210, ketY: 456, ketAnchor: 'middle' }

function VisualEksperimen(props: { p: Record<string, number>; sorot: string | null }) {
  const L = useSempit() ? EKS_HP : EKS_LEBAR
  return (
    <Svg w={L.w} h={L.h} maxH={L.maxH} label="Segitiga siku-siku dengan persegi terbangun pada ketiga sisinya">
      <IsiEksperimen {...props} L={L} />
    </Svg>
  )
}

function IsiEksperimen({ p, sorot, L }: { p: Record<string, number>; sorot: string | null; L: TataEks }) {
  const a = p.a ?? 3
  const b = p.b ?? 4
  const c = Math.sqrt(a * a + b * b)
  const skala = useSkalaSvg()
  const ctx = useInteraksi()
  const aktif = ctx?.kendali.aktif ?? null
  const ajakan = !!ctx?.ajakan
  const tata = penata(L.w, L.h, skala)
  const u = L.u

  // Segitiga dengan sudut siku-siku di A.
  const A: Titik = [L.Ax, L.Ay]
  const B: Titik = [L.Ax + b * u, L.Ay] // sepanjang b
  const C: Titik = [L.Ax, L.Ay - a * u] // sepanjang a

  // Persegi pada sisi a (kiri), sisi b (bawah), sisi c (miring).
  const kotakA: Titik[] = [A, C, [C[0] - a * u, C[1]], [A[0] - a * u, A[1]]]
  const kotakB: Titik[] = [A, B, [B[0], B[1] + b * u], [A[0], A[1] + b * u]]
  // Persegi di sisi miring: putar vektor BC sejauh 90 derajat ke luar,
  // yaitu menjauhi titik siku-siku A (ke kanan atas pada koordinat SVG).
  const dx = C[0] - B[0]
  const dy = C[1] - B[1]
  const nx = -dy
  const ny = dx
  const kotakC: Titik[] = [B, C, [C[0] + nx, C[1] + ny], [B[0] + nx, B[1] + ny]]

  const pojokA: Titik = [L.Ax - a * u, L.Ay - a * u]
  const pojokB: Titik = [L.Ax + b * u, L.Ay + b * u]

  const nyalaA = sorot === 'a2' || sorot === 'a' || aktif === 'a'
  const nyalaB = sorot === 'b2' || sorot === 'b' || aktif === 'b'
  const nyalaC = sorot === 'c2' || sorot === 'c'

  const bulat = Math.abs(c - Math.round(c)) < 1e-9
  // c bisa tepat tetapi tidak bulat (mis. 1,5-2-2,5); tanda ≈ hanya untuk nilai yang dibulatkan.
  const tepat = Math.abs(c * 1000 - Math.round(c * 1000)) < 1e-6
  const keterangan = bulat
    ? `c = √${fmt(a * a + b * b)} = ${fmt(c)} — tripel Pythagoras`
    : tepat
      ? `c = √${fmt(a * a + b * b)} = ${fmt(c)}`
      : `c = √${fmt(a * a + b * b)} ≈ ${fmt(c, 3)}`

  const teksA = `a = ${fmt(a)}`
  const teksB = `b = ${fmt(b)}`
  tata.tambah(
    ...halanganPegangan(
      [
        { key: 'a', di: pojokA, arah: 'bebas', label: teksA, utama: false },
        { key: 'b', di: pojokB, arah: 'bebas', label: teksB, utama: true },
      ],
      skala,
      aktif,
      ajakan,
    ),
    kotakTag(skala, L.ketX, L.ketY, keterangan, 15, L.ketAnchor),
  )
  const kotakUngu = kotakTitik(kotakA)
  const kotakJingga = kotakTitik(kotakB)
  tata.tambahBentuk(kotakUngu, kotakJingga)

  // Label di dalam persegi digambar tanpa latar, jadi yang harus muat hanya hurufnya
  // (kotak Tag dikurangi bantalan kiri-kanannya).
  // (penata sudah memberikan kotak hurufnya saja untuk calon diDalam).
  const pad = 3
  const di = (h: Kotak, luar: Kotak) =>
    h.x0 >= luar.x0 + pad && h.x1 <= luar.x1 - pad && h.y0 >= luar.y0 + pad && h.y1 <= luar.y1 - pad
  const ukPeg = ukuranPegangan(skala)
  const lewatPanah = ukPeg.ujung + 4
  const ukLuas = ukuranHuruf(skala, 15)
  const setengahHuruf = (teks: string) => (teks.length * ukLuas * 0.58) / 2

  // Luas persegi ungu: di dalamnya bila muat (di tengah, atau menjauhi pegangan di
  // pojok kiri atas), selain itu di daerah kosong kiri atas.
  const teksLuasA = `a² = ${fmt(a * a)}`
  const letakLuasA = tata.taruh(teksLuasA, 15, [
    { x: L.Ax - (a * u) / 2, y: L.Ay - (a * u) / 2, diDalam: true, boleh: (k) => di(k, kotakUngu) },
    {
      x: L.Ax - pad - 1 - setengahHuruf(teksLuasA),
      y: L.Ay - pad - 1 - ukLuas * 0.68,
      diDalam: true,
      boleh: (k) => di(k, kotakUngu),
    },
    { x: L.Ax - a * u - 8, y: L.Ay - (a * u) / 2, anchor: 'end' },
    { x: pojokA[0] - lewatPanah, y: pojokA[1], anchor: 'end' },
    { x: pojokA[0], y: pojokA[1] - lewatPanah - 10 },
    { x: L.Ax - a * u - 8, y: L.Ay - 10, anchor: 'end' },
    { x: L.Ax - 8, y: L.Ay + 16, anchor: 'end' },
  ])

  // Luas persegi jingga: di dalamnya, di kirinya (daerah kosong di bawah persegi ungu), atau di dekat pojoknya.
  const teksLuasB = `b² = ${fmt(b * b)}`
  const letakLuasB = tata.taruh(teksLuasB, 15, [
    { x: L.Ax + (b * u) / 2, y: L.Ay + (b * u) / 2, diDalam: true, boleh: (k) => di(k, kotakJingga) },
    {
      x: L.Ax + pad + 1 + setengahHuruf(teksLuasB),
      y: L.Ay + pad + 1 + ukLuas * 0.82,
      diDalam: true,
      boleh: (k) => di(k, kotakJingga),
    },
    { x: L.Ax - 8, y: L.Ay + (b * u) / 2, anchor: 'end' },
    { x: L.Ax - 8, y: pojokB[1], anchor: 'end' },
    { x: pojokB[0] + lewatPanah, y: pojokB[1], anchor: 'start' },
    { x: L.Ax - 8, y: pojokB[1] + 24, anchor: 'end' },
    { x: L.Ax + (b * u) / 2, y: L.Ay + b * u + lewatPanah + 10 },
  ])

  // Luas persegi merah muda: di tengahnya bila muat, selain itu di luar sisi jauhnya.
  const pusatC: Titik = [(B[0] + C[0] + nx) / 2, (B[1] + C[1] + ny) / 2]
  const panjangC = c * u
  const sumbuU: Titik = [dx / panjangC, dy / panjangC]
  const sumbuN: Titik = [nx / panjangC, ny / panjangC]
  const diDalamC = (h: Kotak) => {
    return (
      [
        [h.x0, h.y0],
        [h.x1, h.y0],
        [h.x0, h.y1],
        [h.x1, h.y1],
      ] as Titik[]
    ).every(([x, y]) => {
      const rx = x - pusatC[0]
      const ry = y - pusatC[1]
      const batas = panjangC / 2 - pad
      return Math.abs(rx * sumbuU[0] + ry * sumbuU[1]) <= batas && Math.abs(rx * sumbuN[0] + ry * sumbuN[1]) <= batas
    })
  }
  const teksLuasC = `c² = ${fmt(a * a + b * b)}`
  const ukC = ukuranHuruf(skala, 15)
  const setengahLebarC = (teksLuasC.length * ukC * 0.58 + 14 * (ukC / 15)) / 2
  const jarakC =
    panjangC / 2 + Math.abs(sumbuN[0]) * setengahLebarC + Math.abs(sumbuN[1]) * ukC * 0.75 + 6
  const letakLuasC = tata.taruh(teksLuasC, 15, [
    { x: pusatC[0], y: pusatC[1], diDalam: true, boleh: diDalamC },
    ...[0, 16, 34].map((tambah) => ({
      x: pusatC[0] + sumbuN[0] * (jarakC + tambah),
      y: pusatC[1] + sumbuN[1] * (jarakC + tambah) + ukC * 0.07,
    })),
  ])

  return (
    <>
      <polygon
        points={poly(kotakC)}
        fill="var(--m-hi)"
        fillOpacity={nyalaC ? 0.5 : 0.25}
        stroke="var(--m-hi)"
        strokeWidth={nyalaC ? 3 : 2}
      />
      <polygon
        points={poly(kotakA)}
        fill="var(--m-a)"
        fillOpacity={nyalaA ? 0.5 : 0.25}
        stroke="var(--m-a)"
        strokeWidth={nyalaA ? 3 : 2}
      />
      <polygon
        points={poly(kotakB)}
        fill="var(--m-b)"
        fillOpacity={nyalaB ? 0.5 : 0.25}
        stroke="var(--m-b)"
        strokeWidth={nyalaB ? 3 : 2}
      />
      <polygon
        points={poly([A, B, C])}
        fill="var(--surface)"
        stroke="var(--ink)"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <SikuSiku x={A[0]} y={A[1]} ux={1} uy={0} vx={0} vy={-1} s={Math.min(14, (Math.min(a, b) * u) / 2)} warna="var(--ink-2)" />

      {(
        [
          [letakLuasA, teksLuasA, 'var(--m-a)'],
          [letakLuasB, teksLuasB, 'var(--m-b)'],
          [letakLuasC, teksLuasC, 'var(--m-hi)'],
        ] as const
      ).map(
        ([letak, teks, warna]) =>
          letak && (
            <Tag
              key={teks}
              x={letak.x}
              y={letak.y}
              anchor={letak.anchor}
              warna={warna}
              size={15}
              latar={letak.diDalam ? null : undefined}
            >
              {teks}
            </Tag>
          ),
      )}

      <Tag x={L.ketX} y={L.ketY} anchor={L.ketAnchor} warna={bulat ? 'var(--m-ab)' : 'var(--ink-2)'} size={15}>
        {keterangan}
      </Tag>

      {/* Pojok luar tiap persegi dipegang langsung: menarik pojok berarti
          membesarkan perseginya, dan sisi segitiga ikut memanjang. */}
      <Pegangan
        x={pojokA[0]}
        y={pojokA[1]}
        param="a"
        arah="bebas"
        label={teksA}
        keNilai={(pt) => (L.Ax - pt.x + (L.Ay - pt.y)) / (2 * u)}
      />
      <Pegangan
        x={pojokB[0]}
        y={pojokB[1]}
        param="b"
        arah="bebas"
        utama
        ajakan={AJAKAN}
        label={teksB}
        keNilai={(pt) => (pt.x - L.Ax + (pt.y - L.Ay)) / (2 * u)}
      />
    </>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'pythagoras',
  topicId: 'smp8-teorema-pythagoras',
  judul: 'Teorema Pythagoras',
  pertanyaan: 'Kenapa a² + b² = c² selalu benar?',
  tagline: 'Bukan soal panjang sisi. Ini soal luas — dan buktinya bisa kamu lihat bergerak.',
  kelas: 8,
  domain: 'geometri',
  tags: ['pythagoras', 'segitiga siku-siku', 'luas', 'bukti'],

  tebak: {
    pertanyaan:
      'Menurutmu, apa yang sebenarnya dijumlahkan dalam a² + b² = c²?',
    pilihan: [
      {
        id: 'a',
        label: 'Panjang sisinya',
        balasan:
          'Kalau yang dijumlahkan panjang, segitiga 3-4-5 harus memenuhi 3 + 4 = 5 — padahal 3 + 4 = 7. Yang cocok justru luasnya: 9 + 16 = 25. Coba juga sisi 1 dan 1: sisi miringnya √2 ≈ 1,41, bukan 2.',
      },
      {
        id: 'b',
        label: 'Luas persegi pada tiap sisi',
        benar: true,
        balasan:
          'Tepat. Lambang a² bukan sekadar "a kali a", melainkan luas sebuah persegi yang dibangun pada sisi a.',
      },
      {
        id: 'c',
        label: 'Besar sudutnya',
        balasan: 'Sudut memang berperan (harus siku-siku), tetapi yang dijumlahkan bukan sudutnya.',
      },
    ],
    penutup:
      'Begitu kamu melihat a², b², dan c² sebagai luas, teorema ini berhenti terasa seperti mantra.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      { key: 'a', label: 'Sisi a', min: 1, max: 6, step: 1, awal: 3, bulat: true, simbol: 'a', peran: 'a', bagian: 'a' },
      { key: 'b', label: 'Sisi b', min: 1, max: 6, step: 1, awal: 4, bulat: true, simbol: 'b', peran: 'b', bagian: 'b' },
    ],
    roles: { a: 'a', b: 'b', c: 'hi', a2: 'a', b2: 'b', c2: 'hi' },
    arti: {
      a: 'Salah satu sisi siku-siku.',
      b: 'Sisi siku-siku yang lain.',
      c: 'Sisi miring — selalu yang terpanjang, dan selalu berhadapan dengan sudut siku-siku.',
      a2: 'Luas persegi yang dibangun pada sisi a.',
      b2: 'Luas persegi yang dibangun pada sisi b.',
      c2: 'Luas persegi yang dibangun pada sisi miring.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Sebuah segitiga siku-siku',
        narasi: (p) => {
          const { a, b } = sisiBongkar(p)
          return `Seret titik ungu dan titik jingga untuk mengatur kedua sisi tegaknya: a = ${fmt(a)} dan b = ${fmt(b)}, sisi miringnya ${miringLabel(a, b)}. Syarat siku-siku ini penting: tanpa itu, seluruh cerita berikutnya gugur.`
        },
        rumus: 'sisi tegak [a:a] dan [b:b], sisi miring [c:c]',
        durasi: 1800,
      },
      {
        id: 's1',
        judul: 'Susunan pertama',
        narasi: (p) => {
          const { a, b } = sisiBongkar(p)
          const sisa =
            a === b
              ? `dua persegi kembar bersisi ${fmt(a)}, masing-masing seluas ${fmt(a * a)}`
              : `dua persegi: yang bersisi ${fmt(a)} seluas ${fmt(a * a)}, yang bersisi ${fmt(b)} seluas ${fmt(b * b)}`
          return `Persegi besar ini bersisi ${fmt(a)} + ${fmt(b)} = ${fmt(a + b)}, lalu kamu isi dengan empat salinan segitiga tadi. Ruang yang tersisa berupa ${sisa}.`
        },
        rumus: 'sisa = [a2:a^2] + [b2:b^2]',
        durasi: 2200,
      },
      {
        id: 's2',
        judul: 'Susunan kedua',
        narasi: (p) => {
          const { a, b } = sisiBongkar(p)
          // Bila a = b kedua sudut lancipnya sama-sama 45°, jadi tidak boleh disebut "berbeda".
          const sudutLancip =
            a === b ? 'dua sudut lancip yang sama-sama 45°' : 'sudut lancip yang besar dan yang kecil'
          return `Persegi besar kedua ukurannya persis sama, tetapi keempat segitiga kini ditaruh di pojok-pojoknya sehingga ruang di tengah dikelilingi empat sisi miring c. Ruang tengah itu persegi: di tiap titik sudutnya (yang terletak pada sisi persegi besar), ${sudutLancip} (jumlahnya 90°) ditambah sudut ruang tengah membentuk garis lurus 180°, jadi sudut ruang tengah 180° − 90° = 90°.`
        },
        rumus: 'sisa = [c2:c^2]',
        durasi: 2400,
      },
      {
        id: 's3',
        judul: 'Perhatikan: keduanya sama besar',
        narasi: (p) => {
          const { a, b } = sisiBongkar(p)
          const s = a + b
          return `Kedua persegi besar sama-sama bersisi ${fmt(s)}, jadi luasnya sama-sama ${fmt(s * s)}. Isinya pun sama: empat segitiga yang identik.`
        },
        durasi: 2000,
      },
      {
        id: 's4',
        judul: 'Buang empat segitiga dari keduanya',
        narasi:
          'Kalau dari dua benda yang sama besar kamu buang bagian yang sama, sisanya pasti sama besar juga.',
        durasi: 2200,
      },
      {
        id: 's5',
        judul: 'Yang tersisa itulah teoremanya',
        narasi: (p) => {
          const { a, b } = sisiBongkar(p)
          const jumlah = a * a + b * b
          // "susunan pertama/kedua", bukan "kiri/kanan": di HP kedua persegi bertumpuk.
          return `Di susunan pertama tersisa dua persegi, ${fmt(a * a)} + ${fmt(b * b)} = ${fmt(jumlah)}; di susunan kedua tersisa satu persegi miring yang luasnya juga ${fmt(jumlah)}. Keduanya sisa dari luas yang sama dikurangi hal yang sama, jadi mereka wajib sama besar.`
        },
        rumus: '[a2:a^2] + [b2:b^2] = [c2:c^2]',
        durasi: 2200,
      },
    ],
  },

  eksperimen: {
    judul: 'Bangun persegi pada tiap sisi, lalu bandingkan luasnya',
    ajakan:
      'Seret pojok persegi ungu atau persegi jingga untuk mengubah sisi segitiganya. Perhatikan: luas ungu ditambah luas jingga selalu sama dengan luas merah muda.',
    params: [
      { key: 'a', label: 'Sisi a', min: 1, max: 6, step: 0.5, awal: 3, simbol: 'a', peran: 'a', bagian: 'a2' },
      { key: 'b', label: 'Sisi b', min: 1, max: 6, step: 0.5, awal: 4, simbol: 'b', peran: 'b', bagian: 'b2' },
    ],
    Visual: VisualEksperimen,
    rumus: (p) => {
      const a = p.a ?? 3
      const b = p.b ?? 4
      return `[a2:${fmt(a * a)}] + [b2:${fmt(b * b)}] = [c2:${fmt(a * a + b * b)}]`
    },
    temuan: (p) => {
      const a = p.a ?? 3
      const b = p.b ?? 4
      const c = Math.sqrt(a * a + b * b)
      const bulat = Math.abs(c - Math.round(c)) < 1e-9
      const tepat = Math.abs(c * 1000 - Math.round(c * 1000)) < 1e-6
      return (
        <p>
          <strong>
            {fmt(a * a)} + {fmt(b * b)} = {fmt(a * a + b * b)}.
          </strong>{' '}
          Sisi miringnya c {tepat ? `= ${fmt(c)}` : `≈ ${fmt(c, 3)}`}
          {bulat
            ? ' — kebetulan bulat. Pasangan seperti ini disebut tripel Pythagoras; contoh lain 6-8-10 dan 5-12-13.'
            : ' — tidak bulat, dan itu justru yang paling sering terjadi. Sisi bulat adalah pengecualian, bukan aturan.'}{' '}
          Perhatikan juga: c selalu lebih pendek daripada a + b, tetapi selalu lebih panjang
          daripada masing-masing sisi tegaknya.
        </p>
      )
    },
  },

  penjelasan: {
    SMP: (
      <>
        <p>
          Bukti ini tidak memerlukan rumus apa pun — hanya dua kalimat yang sama-sama jelas:{' '}
          <strong>bangun yang sama besar punya luas yang sama</strong>, dan{' '}
          <strong>kalau dari dua hal yang sama kamu ambil bagian yang sama, sisanya sama.</strong>
        </p>
        <p>
          Kedua persegi besar bersisi (a + b), jadi luasnya sama, yaitu (a + b)². Masing-masing
          berisi empat salinan segitiga siku-siku yang identik. Buang keempat segitiga itu dari
          kedua persegi; sisa susunan pertama adalah a² + b², sisa susunan kedua adalah c². Karena keduanya sisa
          dari luas sama dikurangi hal sama, maka a² + b² = c².
        </p>
        <h4>Kenapa ruang tengah susunan kedua benar-benar persegi</h4>
        <p>
          Keempat sisinya sama panjang (masing-masing c) karena semuanya sisi miring dari segitiga
          yang sama. Sudutnya juga siku-siku: pada tiap titik, bertemu kedua sudut lancip segitiga
          yang <em>berbeda</em> (satu dari tiap segitiga yang bertetangga), dan jumlah keduanya 90°
          (karena jumlah sudut segitiga 180° dan satu sudutnya sudah 90°).
          Sudut lurus 180° dikurangi 90° menyisakan 90°.
        </p>
        <h4>Yang paling sering keliru</h4>
        <p>
          Pertama, teorema ini <strong>hanya</strong> berlaku untuk segitiga siku-siku. Kedua, c
          selalu sisi miring — sisi di hadapan sudut siku-siku, dan selalu yang terpanjang. Kalau
          yang ditanya justru salah satu sisi tegak, bentuknya menjadi a² = c² − b², bukan
          c² + b².
        </p>
      </>
    ),
    SD: (
      <>
        <p>
          Bayangkan dua kotak kue berbentuk persegi yang ukurannya persis sama. Ke dalam masing-masing
          kotak kamu masukkan empat potong kue segitiga yang bentuknya sama persis. Syaratnya, tiap
          potong kue punya satu sudut siku-siku, seperti pojok buku. Kalau tidak, susunannya tidak
          akan pas dan cerita ini tidak berlaku.
        </p>
        <p>
          Bedanya cuma cara menatanya. Di kotak pertama, ruang kosongnya berbentuk dua persegi. Di
          kotak kedua, ruang kosongnya berbentuk satu persegi miring.
        </p>
        <p>
          Karena kotaknya sama besar dan kuenya sama persis (empat potong yang sama), ruang kosongnya pasti sama luas juga.
          Jadi dua persegi kecil itu, kalau digabung, sama luasnya dengan satu persegi miring tadi.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Bukti susun ulang tadi bisa ditulis sebagai satu baris aljabar. Luas persegi besar dihitung
          dua cara:
        </p>
        <p style={{ textAlign: 'center' }}>
          (a + b)² = 4 · (½ab) + c² ⟹ a² + 2ab + b² = 2ab + c² ⟹ a² + b² = c²
        </p>
        <p>
          Suku 2ab muncul di kedua ruas lalu saling meniadakan — itulah "membuang empat segitiga"
          dalam bahasa aljabar.
        </p>
        <h4>Sudut pandang hasil kali titik</h4>
        <p>
          Dengan vektor: |u + v|² = |u|² + 2⟨u, v⟩ + |v|². Bila u ⊥ v maka ⟨u, v⟩ = 0, sehingga
          |u + v|² = |u|² + |v|². Teorema Pythagoras dengan demikian setara dengan pernyataan bahwa
          hasil kali titik dua vektor tegak lurus bernilai nol — dan versi ini berlaku di ruang
          berdimensi berapa pun.
        </p>
        <h4>Kebalikannya juga benar</h4>
        <p>
          Jika pada suatu segitiga berlaku a² + b² = c², maka segitiga itu pasti siku-siku
          (kebalikan teorema Pythagoras). Dari aturan kosinus, c² = a² + b² − 2ab·cos C, sehingga
          a² + b² = c² memaksa cos C = 0, yaitu C = 90°. Aturan kosinus sekaligus memperlihatkan
          bahwa Pythagoras hanyalah kasus khusus: untuk sudut tumpul c² lebih besar, untuk sudut
          lancip c² lebih kecil.
        </p>
      </>
    ),
  },

  rumus: {
    src: '[a2:a^2] + [b2:b^2] = [c2:c^2]',
    roles: { a2: 'a', b2: 'b', c2: 'hi' },
    arti: {
      a2: 'Luas persegi pada sisi tegak a.',
      b2: 'Luas persegi pada sisi tegak b.',
      c2: 'Luas persegi pada sisi miring. Selalu paling besar di antara ketiganya.',
    },
  },

  soal: [
    {
      id: 'pyt-1',
      tipe: 'angka',
      topicId: 'smp8-teorema-pythagoras',
      kelas: 8,
      tingkat: 'mudah',
      konsep: 'pythagoras',
      pertanyaan:
        'Sebuah segitiga siku-siku memiliki sisi tegak 6 cm dan 8 cm. Berapa panjang sisi miringnya?',
      jawaban: 10,
      satuan: 'cm',
      toleransi: 1e-6,
      hint: [
        'Kuadratkan dulu kedua sisi tegaknya, lalu jumlahkan.',
        '6² + 8² = 36 + 64 = 100. Angka 100 itu adalah c².',
        'Sisi miring adalah akar dari 100.',
      ],
      pembahasan: 'c² = 6² + 8² = 36 + 64 = 100, sehingga c = 10 cm. Ini tripel Pythagoras 6-8-10, kelipatan dari 3-4-5.',
    },
    {
      id: 'pyt-2',
      tipe: 'pilihan',
      topicId: 'smp8-teorema-pythagoras',
      kelas: 8,
      tingkat: 'sedang',
      konsep: 'pythagoras',
      pertanyaan:
        'Sisi miring sebuah segitiga siku-siku 13 cm dan salah satu sisi tegaknya 5 cm. Berapa panjang sisi tegak yang lain?',
      pilihan: [
        { id: 'a', label: '12 cm', benar: true },
        {
          id: 'b',
          label: '√194 cm',
          diagnosa:
            'Kamu menjumlahkan 13² + 5². Padahal 13 adalah sisi MIRING, jadi ia berperan sebagai c: 5² harus dikurangkan dari 13², bukan ditambahkan.',
        },
        { id: 'c', label: '8 cm', diagnosa: 'Sepertinya kamu mengurangkan panjang sisinya (13 − 5) tanpa mengkuadratkan.' },
        { id: 'd', label: '18 cm', diagnosa: 'Ini hasil 13 + 5. Sisi miring selalu terpanjang, jadi jawaban 18 mustahil.' },
      ],
      hint: [
        'Tandai dulu mana yang sisi miring. Sisi miring selalu yang terpanjang.',
        'Karena c = 13 sudah diketahui, susun ulang menjadi a² = c² − b².',
        'a² = 169 − 25 = 144.',
      ],
      pembahasan:
        'a² = 13² − 5² = 169 − 25 = 144, jadi a = 12 cm. Kalau yang dicari sisi tegak, luas persegi pada sisi miring (c²) dikurangi luas persegi pada sisi tegak yang diketahui, bukan ditambah.',
    },
    {
      id: 'pyt-3',
      tipe: 'benar-salah',
      topicId: 'smp8-teorema-pythagoras',
      kelas: 8,
      tingkat: 'sedang',
      konsep: 'pythagoras',
      pertanyaan: 'Segitiga dengan panjang sisi 4 cm, 5 cm, dan 6 cm adalah segitiga siku-siku.',
      jawaban: false,
      diagnosa:
        'Uji dengan sisi terpanjang sebagai c: 4² + 5² = 41, sedangkan 6² = 36. Karena 41 ≠ 36, segitiga ini bukan siku-siku.',
      hint: [
        'Gunakan kebalikan teorema Pythagoras: periksa apakah a² + b² = c².',
        'Sisi terpanjang harus diperlakukan sebagai c. Di sini c = 6.',
        'Bandingkan 4² + 5² dengan 6².',
      ],
      pembahasan:
        'Salah. 4² + 5² = 16 + 25 = 41, sedangkan 6² = 36. Karena a² + b² > c², segitiga ini justru lancip. Kalau a² + b² < c², segitiga itu tumpul.',
    },
    (rnd) => {
      const tripel = [
        [3, 4, 5],
        [5, 12, 13],
        [8, 15, 17],
        [7, 24, 25],
        [9, 12, 15],
      ][Math.floor(rnd() * 5)]
      const [a, b, c] = tripel
      return {
        id: 'pyt-4',
        tipe: 'angka',
        topicId: 'smp8-teorema-pythagoras',
        kelas: 8,
        tingkat: 'sedang',
        konsep: 'pythagoras',
        pertanyaan: `Sebuah tangga bersandar pada dinding. Kaki tangga berjarak ${a} m dari dinding dan ujung atasnya mencapai ketinggian ${b} m. Berapa panjang tangganya?`,
        jawaban: c,
        satuan: 'm',
        toleransi: 1e-6,
        hint: [
          'Gambarkan situasinya: dinding tegak, lantai mendatar, tangga sebagai sisi miring.',
          'Sudut antara dinding dan lantai adalah siku-siku, jadi teorema Pythagoras berlaku.',
          `Hitung ${a}² + ${b}² = ${a * a + b * b}, lalu akarkan.`,
        ],
        pembahasan: `Panjang tangga = √(${a}² + ${b}²) = √${a * a + b * b} = ${c} m. Tangga selalu lebih panjang daripada tingginya — masuk akal, karena ia sisi miring.`,
      }
    },
    {
      id: 'pyt-5',
      tipe: 'urutkan',
      topicId: 'smp8-teorema-pythagoras',
      kelas: 9,
      tingkat: 'sulit',
      konsep: 'pythagoras',
      pertanyaan: 'Susun kembali alur bukti susun ulang teorema Pythagoras.',
      langkah: [
        'Buat dua persegi besar yang sama-sama bersisi a + b',
        'Isi masing-masing dengan empat salinan segitiga siku-siku yang sama',
        'Pada susunan pertama, sisanya berupa persegi a² dan persegi b²',
        'Pada susunan kedua, sisanya berupa satu persegi c²',
        'Buang empat segitiga dari kedua persegi besar',
        'Sisa yang sama besar berarti a² + b² = c²',
      ],
      hint: [
        'Buktinya dimulai dari membuat dua wadah yang sama besar.',
        'Segitiga dimasukkan lebih dulu, baru terlihat ruang kosongnya berbentuk apa.',
        'Membuang segitiga dilakukan setelah kedua susunan siap dibandingkan.',
      ],
      pembahasan:
        'Inti buktinya: dua luas yang sama, dikurangi bagian yang sama, menyisakan luas yang sama. Tidak ada rumus yang dipakai — hanya penalaran tentang luas.',
    },
  ],

  lanjut: ['kuadrat-jumlah', 'sin-cos-lingkaran', 'segitiga-setengah'],
}

export default konsep
