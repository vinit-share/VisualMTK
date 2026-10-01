/* ============================================================
   KONSEP — Kenapa integral bisa menghitung luas daerah melengkung?
   Kelas 12 · Kalkulus

   Gagasan: kita hanya tahu menghitung luas persegi panjang.
   Maka daerah melengkung diisi dengan persegi panjang, lalu
   lebarnya diperkecil terus-menerus. Jumlah luasnya tidak
   melompat ke mana-mana — ia menuju satu angka tertentu.

   Untuk y = x² pada [0, b], jumlah Riemann kanan bernilai persis
   b³(n+1)(2n+1) / (6n²), yang menuju b³/3 ketika n membesar.
   Angka b³/3 itulah yang ditulis sebagai integral.

   ------------------------------------------------------------
   Interaksi langsung (docs/PANDUAN-INTERAKSI.md)

   b  Titik (b, b²) MELUNCUR DI KURVA — pola "nilai pada grafik
      fungsi". Titik itu sekaligus pojok kanan atas batang
      terakhir dan ujung kanan daerahnya, jadi menyeretnya benar-
      benar melebarkan daerah yang sedang dihitung. `keNilai`
      hanya membaca pt.x dan merupakan kebalikan persis dari kx().

   n  Banyak batang tidak punya tempat geometris, jadi memakai
      RelGeser yang diletakkan tepat di bawah grafik — dekat
      dengan batang yang dipengaruhinya, bukan di tepi bawah
      halaman.

   Jendela grafik dibuat TETAP (0..3,3 × 0..12), tidak lagi ikut
   membesar mengikuti b. Kalau skalanya ikut berubah seperti versi
   sebelumnya, titik (b, b²) tidak pernah berpindah di layar dan
   menyeretnya tidak terasa mengubah apa pun.

   YMAX 12 (bukan 9,9) dipilih untuk tata letak: pada b = 3 titik
   yang diseret berada di y = 9, dan mesin menaruh label nilainya
   ±60 satuan DI ATAS titik itu. Dengan 9,9 label itu menabrak
   keterangan langkah — bahkan keluar bingkai di tata letak HP.
   Dengan 12 titiknya turun seperempat jendela dan ruang di atasnya
   cukup. Kurvanya sendiri tetap memenuhi bingkai: di x = 3,3 nilai
   y = 10,89, yaitu 91% tinggi jendela.

   Karena skalanya tetap, batas bawah b adalah 1: pada b = 0,5
   daerahnya hanya setinggi 2% jendela dan batangnya tidak terlihat
   lagi. Rentang 1..3 juga pas dengan pertanyaan "tebak dulu" yang
   memakai [0, 1].
   ============================================================ */

import { Pegangan, RelGeser, useInteraksi } from '../components/Interaksi'
import { Svg, Tag, useSempit, useSkalaSvg, useUkuranLayar } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

/* ---------------- Jendela grafik ---------------- */

const XMAX = 3.3
const YMAX = 12

/** x terbesar yang kurvanya masih muat di jendela (√12 ≈ 3,46 > 3,3). */
const X_KURVA = Math.min(XMAX, Math.sqrt(YMAX))

const B_MIN = 1
const B_MAKS = 3

/** Mulai dari jumlah batang ini penanda lebar sudah terlalu tipis untuk dilabeli. */
const BATANG_RAPAT = 24

/** Jumlah Riemann dengan titik ujung kanan untuk f(x) = x² pada [0, b]. */
const jumlahRiemann = (b: number, n: number) => (b ** 3 * (n + 1) * (2 * n + 1)) / (6 * n * n)

/** Luas sejati di bawah y = x² pada [0, b] — angka yang didekati jumlah batang. */
const luasTepat = (b: number) => b ** 3 / 3

/** px layar → satuan SVG (dari useUkuranLayar). */
type Ukur = (px: number, cadangan?: number) => number

/**
 * Ukuran huruf untuk <text> mentah dan Tag berlabel `layar`: tidak pernah
 * lebih kecil dari `px` di layar, dan tidak pernah kurang dari 13 satuan SVG.
 */
const huruf = (u: Ukur, px: number) => Math.max(13, u(px))

/** Skala yang dipakai Pegangan untuk ukurannya sendiri. */
function usePxPegangan(): Ukur {
  const skala = useSkalaSvg() || 0.6
  return (n: number) => n / skala
}

/* ---------------- Kotak batas label ---------------- */

interface Kotak {
  x0: number
  y0: number
  x1: number
  y1: number
}

type Anchor = 'start' | 'middle' | 'end'

const kiriDari = (x: number, lebar: number, anchor: Anchor) =>
  anchor === 'middle' ? x - lebar / 2 : anchor === 'end' ? x - lebar : x

/** Kotak yang ditempati sebuah Tag (rumusnya sama dengan Tag di Stage.tsx). */
function kotakTag(x: number, y: number, teks: string, size: number, anchor: Anchor = 'middle'): Kotak {
  const lebar = [...teks].length * size * 0.58 + 14
  const x0 = kiriDari(x, lebar, anchor)
  return { x0, y0: y - size * 0.82, x1: x0 + lebar, y1: y + size * 0.68 }
}

/** Kotak yang ditempati <text> mentah (tanpa latar). */
function kotakTeks(x: number, y: number, teks: string, size: number, anchor: Anchor = 'middle'): Kotak {
  const lebar = [...teks].length * size * 0.58
  const x0 = kiriDari(x, lebar, anchor)
  return { x0, y0: y - size * 0.55, x1: x0 + lebar, y1: y + size * 0.55 }
}

const bertabrakan = (a: Kotak, b: Kotak) =>
  Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0) > 0.5 && Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0) > 0.5

const tertutup = (k: Kotak, daftar: Kotak[]) => daftar.some((z) => bertabrakan(z, k))

/**
 * Gelembung "Coba geser aku" yang dipasang mesin di bawah pegangan utama.
 * Ukurannya dihitung dengan skala yang sama persis dengan yang dipakai
 * `Pegangan` (termasuk cadangan 0,6 saat panggung belum terukur).
 */
function kotakAjakan(px: Ukur, sx: number, sy: number): Kotak {
  const r = Math.max(8, px(9))
  return kotakTag(sx, sy + r + px(24), 'Coba geser aku', px(13))
}

/**
 * Label nilai yang dipasang mesin tepat di atas pegangan selama diseret.
 * Rumusnya sama persis dengan `Pegangan` di Interaksi.tsx.
 */
function kotakLabelPegangan(px: Ukur, sx: number, sy: number, teks: string): Kotak {
  const r = Math.max(8, px(9))
  return kotakTag(sx, sy - r - px(22), teks, px(15))
}

/* ---------------- Tata letak ---------------- */

interface Tata {
  sempit: boolean
  w: number
  h: number
  maxH: number
  /** kotak grafik. */
  gx0: number
  gx1: number
  gy0: number
  gy1: number
  /** keterangan di atas gambar (hanya bongkar). */
  judulY: number
  /** panel angka. */
  panelX: number
  panelY: number
  panelW: number
  panelKolom: number
  /** rel banyak batang (hanya eksperimen). */
  relY?: number
  relX1?: number
  relX2?: number
}

const BONGKAR_LEBAR: Tata = {
  sempit: false,
  w: 700,
  h: 444,
  maxH: 444,
  gx0: 56,
  gx1: 442,
  gy0: 58,
  gy1: 356,
  judulY: 28,
  // Grafik berhenti di 442, bukan di tepi panel: sisa ruang sampai 506 dipakai
  // gelembung "Coba geser aku" yang mesin gantung di bawah pegangan b ketika
  // b = 3. Lebarnya ikut skala layar, dan paling melebar saat panggung belum
  // terukur (skala cadangan 0,6) — lebar itulah yang dipakai menghitung.
  panelX: 506,
  panelY: 92,
  panelW: 186,
  panelKolom: 1,
}

/**
 * HP tegak: grafik dibuat selebar mungkin, panel turun ke bawah jadi dua kolom.
 * Lebar grafik berhenti di 352 karena alasan yang sama dengan tata letak lebar:
 * pada b = 3 pegangan berada di x = 322 dan gelembung "Coba geser aku" di
 * bawahnya masih harus muat sampai tepi 420.
 */
const BONGKAR_HP: Tata = {
  sempit: true,
  w: 420,
  h: 520,
  maxH: 470,
  gx0: 24,
  gx1: 352,
  gy0: 56,
  gy1: 326,
  judulY: 26,
  panelX: 14,
  panelY: 392,
  panelW: 392,
  panelKolom: 2,
}

/**
 * Di eksperimen tidak ada keterangan langkah, tetapi ada rel banyak batang.
 * Urutan ke bawah: grafik → penanda Δx → rel → panel. Rel diletakkan cukup
 * jauh di bawah penanda Δx supaya label nilainya (yang selalu tampil di atas
 * pegangan rel) tidak menindih label Δx saat batangnya masih sedikit.
 */
const EKS_LEBAR: Tata = {
  sempit: false,
  w: 700,
  h: 508,
  maxH: 508,
  gx0: 56,
  gx1: 442,
  gy0: 40,
  gy1: 330,
  judulY: 24,
  panelX: 506,
  panelY: 76,
  panelW: 186,
  panelKolom: 1,
  relY: 464,
  relX1: 120,
  relX2: 430,
}

/**
 * HP tegak untuk eksperimen: tingginya sudah mentok 1,3 × lebar, jadi grafik
 * berhenti di y = 274 agar rel dan panel di bawahnya tetap muat.
 */
const EKS_HP: Tata = {
  sempit: true,
  w: 420,
  h: 546,
  maxH: 470,
  gx0: 24,
  gx1: 352,
  gy0: 36,
  gy1: 274,
  judulY: 22,
  panelX: 14,
  panelY: 452,
  panelW: 392,
  panelKolom: 2,
  relY: 398,
  relX1: 70,
  relX2: 338,
}

const kx = (L: Tata, x: number) => L.gx0 + (x / XMAX) * (L.gx1 - L.gx0)
const ky = (L: Tata, y: number) => L.gy1 - (y / YMAX) * (L.gy1 - L.gy0)

/** Kebalikan persis dari kx(): posisi jari (koordinat SVG) → nilai x pada grafik. */
const xDari = (L: Tata, sx: number) => ((sx - L.gx0) / (L.gx1 - L.gx0)) * XMAX

/* ---------------- Panel angka ---------------- */

interface BarisPanel {
  teks: string
  warna?: string
  besar?: boolean
}

function Panel({ L, baris, tampil = 1 }: { L: Tata; baris: BarisPanel[]; tampil?: number }) {
  const u = useUkuranLayar()
  if (baris.length === 0) return null
  const kolom = L.panelKolom
  const jumlahBaris = Math.ceil(baris.length / kolom)
  const pad = L.sempit ? 15 : 16
  const tinggiBaris = L.sempit ? 30 : 34
  const lebarKolom = L.panelW / kolom
  // Ukurannya ditahan supaya baris terpanjang ("jumlah = 27,0000" pada
  // b = 3, n = 1) tetap muat di dalam satu kolom panel di layar tersempit.
  const szKecil = huruf(u, L.sempit ? 12 : 13)
  const szBesar = huruf(u, L.sempit ? 14 : 15)
  return (
    <g opacity={tampil}>
      <rect
        x={L.panelX}
        y={L.panelY}
        width={L.panelW}
        height={pad * 2 + jumlahBaris * tinggiBaris}
        rx={14}
        fill="var(--surface-2)"
      />
      {baris.map((b, i) => (
        <text
          key={i}
          x={L.panelX + lebarKolom * ((i % kolom) + 0.5)}
          y={L.panelY + pad + tinggiBaris * (Math.floor(i / kolom) + 0.5)}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={b.besar ? szBesar : szKecil}
          fontWeight={b.besar ? 800 : 600}
          fill={b.warna ?? 'var(--ink-2)'}
          fontFamily="var(--font-math)"
        >
          {b.teks}
        </text>
      ))}
    </g>
  )
}

/* ---------------- Grafik, batang, dan pegangan b ---------------- */

/**
 * Seluruh isi grafik, termasuk pegangan batas kanan. Dipakai bersama oleh
 * bongkar dan eksperimen supaya titik yang diseret anak berada di tempat yang
 * sama persis di kedua panggung.
 *
 * Pegangan b tidak pernah disembunyikan: daerah dan kurvanya sudah ada sejak
 * langkah pertama bongkar, jadi tidak ada langkah yang objeknya belum muncul.
 */
function Grafik({
  L,
  b,
  n,
  tampil,
  tandaLebar,
  nyalaLebar,
  nyalaTinggi,
  nyalaBatas,
}: {
  L: Tata
  b: number
  n: number
  /** bagian batang yang sudah digambar, 0..1. */
  tampil: number
  /** gambar penanda Δx di bawah batang pertama. */
  tandaLebar: boolean
  nyalaLebar: boolean
  nyalaTinggi: boolean
  nyalaBatas: boolean
}) {
  const u = useUkuranLayar()
  const pxPeg = usePxPegangan()
  const ctx = useInteraksi()
  const aktif = ctx?.kendali.aktif ?? null

  const sz = huruf(u, 13)
  const szAngka = huruf(u, 12)

  const y0 = ky(L, 0)
  const x0 = kx(L, 0)
  const bx = kx(L, b)
  const by = ky(L, b * b)
  const lebar = b / Math.max(1, n)
  const batang = Math.round(clamp(tampil, 0, 1) * n)

  const dDaerah = [
    `M ${x0.toFixed(1)} ${y0.toFixed(1)}`,
    ...Array.from({ length: 61 }, (_, i) => {
      const x = (b * i) / 60
      return `L ${kx(L, x).toFixed(1)} ${ky(L, x * x).toFixed(1)}`
    }),
    `L ${bx.toFixed(1)} ${y0.toFixed(1)} Z`,
  ].join(' ')

  const dKurva = Array.from({ length: 81 }, (_, i) => {
    const x = (X_KURVA * i) / 80
    return `${i === 0 ? 'M' : 'L'} ${kx(L, x).toFixed(1)} ${ky(L, x * x).toFixed(1)}`
  }).join(' ')

  /* Tempat yang sudah dipesan label. Dua label milik mesin dihitung lebih
     dulu — gelembung "Coba geser aku" dan label nilai yang muncul di dekat
     jari saat pegangan b diseret. Angka sumbu dan label Δx-lah yang mengalah
     kepada keduanya, karena angkanya tetap terbaca di panel. */
  const teksB = `b = ${fmt(b, 1)}`
  const tampilB = aktif !== 'b'
  const hindari: Kotak[] = []
  if (ctx?.ajakan && tampilB) hindari.push(kotakAjakan(pxPeg, bx, by))
  if (!tampilB) hindari.push(kotakLabelPegangan(pxPeg, bx, by, teksB))

  // Angka b menempel pada titik yang diseret, di kiri-atasnya. Daerah di atas
  // kurva selalu kosong, jadi label itu tidak pernah menutupi batang.
  const bLabelX = bx - u(12)
  const bLabelY = by - u(16)
  if (tampilB) hindari.push(kotakTag(bLabelX, bLabelY, teksB, sz, 'end'))

  // Tinggi batang terakhir, f(b): hanya saat bagian rumusnya disorot, dan
  // mengalah kepada gelembung ajakan seperti label lain. Pada b kecil, sisi
  // kirinya akan keluar bingkai, jadi kotaknya dijepit ke dalam gambar.
  const teksTinggi = `f(b) = ${fmt(b * b, 2)}`
  const lebarTinggi = [...teksTinggi].length * sz * 0.58 + 14
  const xTinggi = clamp(bx - u(10) - lebarTinggi, u(6), L.w - u(6) - lebarTinggi)
  const kotakTinggi = kotakTag(xTinggi, (y0 + by) / 2, teksTinggi, sz, 'start')
  const tampilTinggi = nyalaTinggi && !tertutup(kotakTinggi, hindari)
  if (tampilTinggi) hindari.push(kotakTinggi)

  // Tiga baris di bawah sumbu, dari atas ke bawah: angka sumbu (hanya tata
  // letak lebar), penanda lebar satu batang, lalu labelnya. Jaraknya dihitung
  // agar tetap renggang pada skala layar terkecil, ketika huruf paling besar
  // dibandingkan gambarnya.
  const barisAngka = y0 + u(15)
  const yGaris = y0 + u(L.sempit ? 11 : 31)
  const yLabelLebar = y0 + u(L.sempit ? 30 : 50)
  const adaLebar = tandaLebar && batang > 0 && n <= BATANG_RAPAT
  const teksLebar = `Δx = ${fmt(lebar, 3)}`
  // Batang pertama bisa jauh lebih sempit daripada labelnya, jadi labelnya
  // ditahan supaya tidak menyelinap keluar tepi kiri.
  const xLabelLebar = Math.max(
    (x0 + kx(L, lebar)) / 2,
    u(4) + ([...teksLebar].length * sz * 0.58 + 14) / 2,
  )
  const kotakLebar = kotakTag(xLabelLebar, yLabelLebar, teksLebar, sz)
  const tampilLabelLebar = adaLebar && !tertutup(kotakLebar, hindari)
  if (tampilLabelLebar) hindari.push(kotakLebar)

  const warnaLebar = nyalaLebar ? 'var(--m-hi)' : 'var(--m-b)'
  const warnaBatas = nyalaTinggi ? 'var(--m-hi)' : nyalaBatas ? 'var(--m-a)' : 'var(--ink-3)'
  const tebalBatas = nyalaTinggi ? 4 : nyalaBatas ? 2.8 : 1.6
  const tebalGaris = n > 60 ? 0.3 : n > BATANG_RAPAT ? 0.7 : 1.4

  return (
    <g>
      {/* kisi supaya besar kecilnya daerah bisa dibaca dari gambar */}
      {[1, 2, 3].map((x) => (
        <line key={`v${x}`} x1={kx(L, x)} y1={L.gy0} x2={kx(L, x)} y2={y0} stroke="var(--m-grid)" strokeWidth={1} />
      ))}
      {[2, 4, 6, 8, 10].map((y) => (
        <line key={`h${y}`} x1={x0} y1={ky(L, y)} x2={L.gx1} y2={ky(L, y)} stroke="var(--m-grid)" strokeWidth={1} />
      ))}

      {/* daerah sejati di bawah kurva */}
      <path d={dDaerah} fill="var(--m-a)" fillOpacity={0.18} />

      {/* persegi panjang Riemann */}
      {Array.from({ length: batang }, (_, k) => {
        const xk = (k + 1) * lebar
        const tinggi = xk * xk
        const kiri = kx(L, k * lebar)
        const kanan = kx(L, xk)
        return (
          <rect
            key={k}
            x={kiri}
            y={ky(L, tinggi)}
            width={Math.max(0.6, kanan - kiri)}
            height={y0 - ky(L, tinggi)}
            fill="var(--m-b)"
            fillOpacity={0.34}
            stroke="var(--m-b)"
            strokeWidth={tebalGaris}
          />
        )
      })}

      {/* sumbu dan kurva */}
      <line x1={x0} y1={y0} x2={L.gx1} y2={y0} stroke="var(--m-axis)" strokeWidth={1.8} />
      <line x1={x0} y1={L.gy0} x2={x0} y2={y0} stroke="var(--m-axis)" strokeWidth={1.8} />
      <path d={dKurva} fill="none" stroke="var(--m-a)" strokeWidth={3} strokeLinejoin="round" />

      {/* batas kanan: sekaligus tinggi batang terakhir, f(b) */}
      <line
        x1={bx}
        y1={y0}
        x2={bx}
        y2={by}
        stroke={warnaBatas}
        strokeWidth={tebalBatas}
        strokeDasharray={nyalaTinggi ? undefined : '5 5'}
      />
      {tampilTinggi && (
        <Tag x={xTinggi} y={(y0 + by) / 2} anchor="start" warna="var(--m-hi)" size={sz} layar>
          {teksTinggi}
        </Tag>
      )}

      {/* penanda lebar satu batang, di bawah batang pertama */}
      {adaLebar && (
        <g>
          <line
            x1={x0}
            y1={yGaris}
            x2={kx(L, lebar)}
            y2={yGaris}
            stroke={warnaLebar}
            strokeWidth={nyalaLebar ? 3.4 : 2}
          />
          <line x1={x0} y1={yGaris - u(5)} x2={x0} y2={yGaris + u(5)} stroke={warnaLebar} strokeWidth={2} />
          <line
            x1={kx(L, lebar)}
            y1={yGaris - u(5)}
            x2={kx(L, lebar)}
            y2={yGaris + u(5)}
            stroke={warnaLebar}
            strokeWidth={2}
          />
          {tampilLabelLebar && (
            <Tag x={xLabelLebar} y={yLabelLebar} warna={warnaLebar} size={sz} layar>
              {teksLebar}
            </Tag>
          )}
        </g>
      )}

      {/* angka sumbu hanya pada tata letak lebar; yang tertutup label lain mengalah */}
      {!L.sempit &&
        [1, 2, 3].map((x) => {
          if (tertutup(kotakTeks(kx(L, x), barisAngka, fmt(x), szAngka), hindari)) return null
          return (
            <text
              key={`ax${x}`}
              x={kx(L, x)}
              y={barisAngka}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={szAngka}
              fontWeight={700}
              fill="var(--ink-soft)"
            >
              {fmt(x)}
            </text>
          )
        })}

      {/* Nama kurva diletakkan di sudut kiri-atas jendela. Titik (b, b²)
          beserta label angkanya selalu berada di sebelah kanan-bawah sudut itu
          untuk seluruh rentang b, jadi keduanya tidak pernah bertemu. */}
      <Tag
        x={L.gx0 + u(6)}
        y={L.gy0 + (L.gy1 - L.gy0) * 0.3}
        anchor="start"
        warna="var(--m-a)"
        size={sz}
        layar
      >
        y = x²
      </Tag>

      {tampilB && (
        <Tag x={bLabelX} y={bLabelY} anchor="end" warna="var(--m-a)" size={sz} layar>
          {teksB}
        </Tag>
      )}

      {/* Batas kanan diseret langsung: titiknya meluncur di sepanjang kurva. */}
      <Pegangan
        x={bx}
        y={by}
        param="b"
        arah="x"
        utama
        label={teksB}
        keNilai={(pt) => xDari(L, pt.x)}
      />
    </g>
  )
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

/** Banyak batang pada akhir setiap langkah bongkar. */
const N_LANGKAH = [0, 4, 4, 16, 64, 200, 200]

/** Batas kanan seperti yang dibaca gambar — teks langkah memakai turunan yang sama. */
const bBongkar = (p: Record<string, number>) => clamp(p.b ?? B_MIN, B_MIN, B_MAKS)

/** Lebar satu batang pada akhir langkah ke-i, sama dengan label "Δx" di gambar. */
const lebarLangkah = (p: Record<string, number>, i: number) => bBongkar(p) / N_LANGKAH[i]

/** Jumlah luas batang pada akhir langkah ke-i, sama dengan angka di panel. */
const jumlahLangkah = (p: Record<string, number>, i: number) =>
  jumlahRiemann(bBongkar(p), N_LANGKAH[i])

/** Keterangan di atas gambar; versi HP sengaja dipendekkan agar muat di 420. */
function keterangan(step: number, sempit: boolean, n: number, S: number, tepat: number) {
  if (step === 0) {
    return {
      teks: sempit ? 'sisi atasnya melengkung' : 'sisi atasnya melengkung — tidak ada rumus siap pakai',
      warna: 'var(--ink-2)',
    }
  }
  if (step === 1) {
    return {
      teks: sempit ? 'isi dengan persegi panjang' : 'isi dengan persegi panjang yang luasnya kita tahu',
      warna: 'var(--m-b)',
    }
  }
  if (step === 2) {
    return {
      teks: sempit ? `${fmt(n)} batang = ${fmt(S, 4)}` : `jumlah ${fmt(n)} persegi panjang = ${fmt(S, 4)}`,
      warna: 'var(--m-b)',
    }
  }
  if (step === 3 || step === 4) {
    return {
      teks: sempit ? 'perkecil lebarnya' : 'perkecil lebarnya, perbanyak jumlahnya',
      warna: 'var(--m-hi)',
    }
  }
  return {
    teks: sempit ? `menuju ${fmt(tepat, 4)}` : `angkanya menuju ${fmt(tepat, 4)}`,
    warna: 'var(--m-hi)',
  }
}

/**
 * Isi gambar dipisahkan dari <Svg> dengan sengaja: skala layar baru tersedia
 * DI DALAM <Svg>. Kalau useUkuranLayar dipanggil di luar, ia selalu memberi
 * nilai cadangan dan jarak yang kita hitung tidak akan sama dengan jarak yang
 * dipakai Tag dan Pegangan.
 */
function IsiBongkar({ L, step, t, p, sorot }: DeriveState & { L: Tata }) {
  const u = useUkuranLayar()
  const b = bBongkar(p)

  const nDasar = N_LANGKAH[Math.min(step, N_LANGKAH.length - 1)]
  // Pada langkah 3 dan 4 jumlah persegi panjangnya bertambah mulus.
  const n =
    step === 3
      ? Math.max(4, Math.round(4 + 12 * seg(t, 0.1, 0.95)))
      : step === 4
        ? Math.max(16, Math.round(16 + 48 * seg(t, 0.1, 0.95)))
        : nDasar

  const tampil = step === 1 ? seg(t, 0.1, 0.95) : step >= 1 ? 1 : 0
  const eksak = fase(step, t, 5)

  const S = n > 0 ? jumlahRiemann(b, n) : 0
  const tepat = luasTepat(b)

  const baris: BarisPanel[] =
    n === 0
      ? [{ teks: 'luas = ?', warna: 'var(--ink-2)', besar: true }]
      : [
          { teks: `n = ${fmt(n)}`, warna: 'var(--m-b)' },
          { teks: `Δx = ${fmt(b / n, 3)}`, warna: 'var(--m-b)' },
          { teks: `jumlah = ${fmt(S, 4)}`, warna: 'var(--m-b)', besar: true },
          ...(eksak > 0.4
            ? [
                { teks: `b³/3 = ${fmt(tepat, 4)}`, warna: 'var(--m-hi)', besar: true },
                { teks: `selisih ${fmt(S - tepat, 4)}`, warna: 'var(--ink-2)' },
              ]
            : []),
        ]

  const ket = keterangan(step, L.sempit, n, S, tepat)

  return (
    <>
      {/* Panel digambar lebih dulu supaya pegangan dan labelnya selalu di atas. */}
      <Panel L={L} baris={baris} />
      <Grafik
        L={L}
        b={b}
        n={Math.max(1, n)}
        tampil={n === 0 ? 0 : tampil}
        tandaLebar={step >= 1}
        nyalaLebar={sorot === 'dx'}
        nyalaTinggi={sorot === 'f'}
        nyalaBatas={sorot === 'batas' || sorot === 'integral'}
      />
      <Tag x={L.w / 2} y={L.judulY} warna={ket.warna} size={huruf(u, L.sempit ? 14 : 16)} layar>
        {ket.teks}
      </Tag>
    </>
  )
}

function VisualBongkar(props: DeriveState) {
  const L = useSempit() ? BONGKAR_HP : BONGKAR_LEBAR
  return (
    <Svg w={L.w} h={L.h} maxH={L.maxH} label="Daerah di bawah kurva yang diisi persegi panjang">
      <IsiBongkar L={L} {...props} />
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

const bEksperimen = (p: Record<string, number>) => clamp(p.b ?? B_MIN, B_MIN, B_MAKS)
const nEksperimen = (p: Record<string, number>) => clamp(Math.round(p.n ?? 8), 1, 200)

function IsiEksperimen({ L, p, sorot }: { L: Tata; p: Record<string, number>; sorot: string | null }) {
  const b = bEksperimen(p)
  const n = nEksperimen(p)
  const S = jumlahRiemann(b, n)
  const tepat = luasTepat(b)

  // Di HP jumlah batang sudah tertulis di rel, jadi panel memuat angka lain.
  const baris: BarisPanel[] = L.sempit
    ? [
        { teks: `jumlah = ${fmt(S, 4)}`, warna: 'var(--m-b)', besar: true },
        { teks: `b³/3 = ${fmt(tepat, 4)}`, warna: 'var(--m-hi)', besar: true },
        // 3 desimal, sama persis dengan label "Δx" pada penanda lebar di dalam
        // grafik — kalau berbeda, satu besaran yang sama tertulis dua kali
        // dengan angka yang tidak sama di satu gambar.
        { teks: `Δx = ${fmt(b / n, 3)}`, warna: 'var(--m-b)' },
        { teks: `selisih ${fmt(S - tepat, 4)}` },
      ]
    : [
        { teks: `n = ${fmt(n)}`, warna: 'var(--m-b)' },
        // 3 desimal, sama persis dengan label "Δx" pada penanda lebar di dalam
        // grafik — kalau berbeda, satu besaran yang sama tertulis dua kali
        // dengan angka yang tidak sama di satu gambar.
        { teks: `Δx = ${fmt(b / n, 3)}`, warna: 'var(--m-b)' },
        { teks: `jumlah = ${fmt(S, 4)}`, warna: 'var(--m-b)', besar: true },
        { teks: `b³/3 = ${fmt(tepat, 4)}`, warna: 'var(--m-hi)', besar: true },
        { teks: `selisih ${fmt(S - tepat, 4)}` },
      ]

  return (
    <>
      <Panel L={L} baris={baris} />
      <Grafik
        L={L}
        b={b}
        n={n}
        tampil={1}
        tandaLebar
        nyalaLebar={sorot === 'dx'}
        nyalaTinggi={sorot === 'f'}
        nyalaBatas={sorot === 'integral' || sorot === 'batas'}
      />
      {/* Banyak batang tidak punya tempat geometris: relnya diletakkan tepat di
          bawah grafik, sedekat mungkin dengan batang yang diubahnya. */}
      <RelGeser
        x1={L.relX1 ?? 0}
        x2={L.relX2 ?? 0}
        y={L.relY ?? 0}
        param="n"
        label={`${fmt(n)} batang`}
        kiri="1"
        kanan="200"
      />
    </>
  )
}

function VisualEksperimen(props: { p: Record<string, number>; sorot: string | null }) {
  const L = useSempit() ? EKS_HP : EKS_LEBAR
  return (
    <Svg
      w={L.w}
      h={L.h}
      maxH={L.maxH}
      label="Daerah di bawah kurva dengan batas kanan dan jumlah persegi panjang yang bisa diubah"
    >
      <IsiEksperimen L={L} {...props} />
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'integral-luas',
  topicId: 'sma12-jumlah-riemann-dan-integral-tentu',
  judul: 'Integral',
  pertanyaan: 'Kenapa integral bisa menghitung luas daerah melengkung?',
  tagline: 'Isi daerahnya dengan persegi panjang. Perkecil lebarnya. Perhatikan ke mana angkanya menuju.',
  kelas: 12,
  domain: 'kalkulus',
  tags: ['integral', 'luas', 'jumlah riemann', 'limit'],

  tebak: {
    pertanyaan:
      'Daerah di bawah kurva y = x² dari x = 0 sampai x = 1 dibandingkan dengan persegi 1 × 1 yang menutupinya. Menurutmu luasnya kira-kira...',
    pilihan: [
      {
        id: 'a',
        label: 'Setengah persegi',
        balasan:
          'Setengah akan tepat kalau batas atasnya berupa garis lurus diagonal y = x. Tapi di antara x = 0 dan x = 1 kurva x² berada di bawah garis itu (keduanya hanya bertemu di ujung-ujungnya), jadi luasnya lebih kecil daripada setengah.',
      },
      {
        id: 'b',
        label: 'Sepertiga persegi',
        benar: true,
        balasan: 'Betul, tepat 1/3. Angka itu akan muncul sendiri dari perhitungan sebentar lagi.',
      },
      {
        id: 'c',
        label: 'Seperempat persegi',
        balasan:
          'Cukup dekat, tetapi masih terlalu kecil. Garis diagonal hanya memberi tahu bahwa luasnya kurang dari setengah; ternyata luasnya tidak sampai sekecil seperempat.',
      },
    ],
    penutup:
      'Yang menarik bukan angkanya, melainkan bagaimana angka setepat itu bisa muncul dari bentuk yang melengkung.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      {
        key: 'b',
        label: 'Batas kanan',
        // Lihat catatan di kepala berkas: jendela grafiknya tetap, jadi b di
        // bawah 1 membuat daerahnya terlalu kecil untuk dilihat.
        min: B_MIN,
        max: B_MAKS,
        step: 0.1,
        awal: 1,
        simbol: 'b',
        peran: 'a',
        bagian: 'batas',
      },
    ],
    roles: { dx: 'b', f: 'ab', integral: 'hi', batas: 'a' },
    arti: {
      dx: 'Lebar setiap persegi panjang. Inilah yang terus diperkecil.',
      f: 'Tinggi persegi panjang, yaitu nilai fungsi di titik itu.',
      integral: 'Lambang integral — sebenarnya huruf S yang dipanjangkan, dari kata "summa" yang berarti jumlah.',
      batas: 'Batas kanan daerah yang dihitung.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Daerah dengan sisi atas melengkung',
        narasi:
          'Kita ingin tahu luas daerah antara kurva dan sumbu mendatar, tetapi rumus luas yang kamu hafal masing-masing dibuat untuk satu bentuk tertentu — persegi panjang, segitiga, lingkaran. Untuk lengkungan seperti ini belum ada yang bisa dipakai.',
        durasi: 2200,
      },
      {
        id: 's1',
        judul: 'Isi dengan bentuk yang kita kuasai',
        narasi: (p) =>
          `Persegi panjang luasnya jelas: panjang kali lebar. Jadi daerah tadi kamu isi dengan ${fmt(N_LANGKAH[1])} batang selebar ${fmt(lebarLangkah(p, 1), 3)}, meskipun belum pas benar.`,
        rumus: 'luas satu batang = [f:f(x)] × [dx:Δx]',
        durasi: 2600,
      },
      {
        id: 's2',
        judul: 'Jumlahkan semuanya',
        narasi: (p) =>
          // 4 desimal di seluruh narasi langkah: angkanya harus sama persis
          // dengan yang tertulis di panel dan keterangan di dalam gambar.
          `Jumlah luas ${fmt(N_LANGKAH[2])} batang itu ${fmt(jumlahLangkah(p, 2), 4)} — masih kelebihan, karena tiap batang menonjol keluar dari kurva. Tetapi sekarang kamu punya angka untuk diperbaiki.`,
        durasi: 2400,
      },
      {
        id: 's3',
        judul: 'Perkecil lebarnya',
        narasi: (p) =>
          `Batang yang lebih tipis berarti bagian yang menonjol makin sedikit. Perhatikan angkanya turun dari ${fmt(jumlahLangkah(p, 2), 4)} dengan ${fmt(N_LANGKAH[2])} batang menjadi ${fmt(jumlahLangkah(p, 3), 4)} dengan ${fmt(N_LANGKAH[3])} batang.`,
        durasi: 3000,
      },
      {
        id: 's4',
        judul: 'Perbanyak terus',
        narasi: (p) =>
          `Dengan ${fmt(N_LANGKAH[4])} batang jumlahnya tinggal ${fmt(jumlahLangkah(p, 4), 4)}, padahal dengan ${fmt(N_LANGKAH[3])} batang tadi masih ${fmt(jumlahLangkah(p, 3), 4)}. Angkanya tidak melompat ke mana-mana — ia makin rapat mendekati satu nilai.`,
        durasi: 3000,
      },
      {
        id: 's5',
        judul: 'Nilai yang didekati itulah luasnya',
        narasi: (p) => {
          const tepat = luasTepat(bBongkar(p))
          // b³/3 sering berupa desimal berulang (mis. 1/3), jadi pakai ≈ bila angkanya dibulatkan.
          const tanda = Math.abs(Math.round(tepat * 1e4) / 1e4 - tepat) < 1e-9 ? '=' : '≈'
          return `Untuk y = x², jumlah luas batang ujung kanan bernilai persis b³(n+1)(2n+1)/(6n²), dan ketika n diperbesar tanpa batas pecahan itu menuju b³/3 ${tanda} ${fmt(tepat, 4)}. Kalau tingginya diambil di ujung kiri (tidak digambar di sini), jumlahnya naik dari bawah menuju angka yang sama, jadi luasnya terjepit di situ.`
        },
        rumus: 'luas = [batas:b]^3 ÷ 3',
        durasi: 2800,
      },
      {
        id: 's6',
        judul: 'Dan itulah arti lambang integral',
        narasi:
          'Lambang ∫ adalah huruf S yang dipanjangkan, dari kata Latin "summa" yang berarti jumlah, sedangkan dx adalah sisa dari lebar batang yang menyusut tanpa batas. Angka 0 dan b yang menempel pada ∫ menandai batas daerahnya — tanpa keduanya, ∫ f(x) dx hanya berarti antiturunan, bukan sebuah luas.',
        rumus: '[integral:∫]₀ᵇ f(x) [dx:dx] = luas daerah',
        durasi: 2600,
      },
    ],
  },

  eksperimen: {
    judul: 'Tarik batasnya, tipiskan batangnya',
    ajakan:
      'Seret titik di ujung kanan daerah; ia meluncur di sepanjang kurva. Lalu geser rel batang di bawah grafik dan awasi angka "selisih".',
    params: [
      {
        key: 'b',
        label: 'Batas kanan',
        min: B_MIN,
        max: B_MAKS,
        step: 0.1,
        // Eksperimen mulai dari 2, bukan 1: pada b = 1 daerahnya hanya 1/12
        // tinggi jendela, terlalu tipis untuk mengundang disentuh. Bongkar
        // tetap mulai dari 1 karena pertanyaan "tebak dulu" memakai [0, 1].
        awal: 2,
        simbol: 'b',
        peran: 'a',
        // "batas", bukan "integral": bagian rumus yang menyala saat titik ini
        // diseret harus sewarna dengan titiknya sendiri (peran 'a').
        bagian: 'batas',
      },
      {
        key: 'n',
        label: 'Banyak persegi panjang',
        min: 1,
        max: 200,
        step: 1,
        awal: 8,
        bulat: true,
        simbol: 'n',
        peran: 'b',
        bagian: 'dx',
      },
    ],
    Visual: VisualEksperimen,
    rumus: (p) => {
      const b = bEksperimen(p)
      const n = nEksperimen(p)
      // Kedua ruas dipisah dengan kata "menuju", bukan tanda "·": dibaca
      // berderet, "… = 27,0000 · ∫₀ᵇ x² dx = b³ ÷ 3" berarti sebuah PERKALIAN
      // dan pernyataannya jadi salah. "menuju" sekaligus kalimat yang dipakai
      // keterangan langkah terakhir ("angkanya menuju …").
      // Angkanya 4 desimal, sama persis dengan panel di dalam gambar tepat di atasnya.
      return `Σ [f:f(x)] × [dx:Δx] = ${fmt(jumlahRiemann(b, n), 4)}   menuju   [integral:∫]₀ᵇ x² dx = [batas:b^3] ÷ 3 = ${fmt(luasTepat(b), 4)}`
    },
    temuan: (p) => {
      const b = bEksperimen(p)
      const n = nEksperimen(p)
      const S = jumlahRiemann(b, n)
      const tepat = luasTepat(b)
      // Angkanya 4 desimal, sama persis dengan yang tertulis di panel dalam
      // gambar. "batangnya dua kali lebih banyak", bukan "jumlahnya dua kali
      // lipat": kata "jumlah" sudah dipakai panel untuk jumlah LUAS, yang justru
      // hampir tidak berubah saat batangnya diperbanyak.
      return (
        <p>
          Dengan {fmt(n)} batang, jumlah luasnya <strong>{fmt(S, 4)}</strong>, sedangkan nilai
          tepatnya b³/3 = {fmt(tepat, 4)}. Selisihnya {fmt(S - tepat, 4)} — selalu positif, karena
          batang dengan tinggi diambil di ujung kanan selalu sedikit menonjol keluar dari kurva.
          Geser rel batangnya sampai batangnya dua kali lebih banyak: selisihnya kira-kira tinggal
          separuh, bukan seperempat. Itu berarti selisihnya mengecil sebanding dengan 1/n.
        </p>
      )
    },
  },

  penjelasan: {
    SMA: (
      <>
        <p>
          Seluruh gagasan integral berangkat dari satu kenyataan sederhana: kita hanya benar-benar
          tahu cara menghitung luas <strong>persegi panjang</strong>. Bentuk lain diselesaikan
          dengan memotongnya menjadi persegi panjang.
        </p>
        <p>
          Bagi [0, b] menjadi n bagian selebar Δx = b/n. Batang ke-k memiliki tinggi f(x<sub>k</sub>)
          dan luas f(x<sub>k</sub>)·Δx. Jumlah seluruhnya disebut <strong>jumlah Riemann</strong>:
        </p>
        <p style={{ textAlign: 'center' }}>S<sub>n</sub> = Σ f(x<sub>k</sub>) Δx</p>
        <h4>Perhitungan untuk f(x) = x²</h4>
        <p>
          Dengan titik ujung kanan, x<sub>k</sub> = kb/n, sehingga
        </p>
        <p style={{ textAlign: 'center' }}>
          S<sub>n</sub> = Σ (kb/n)² · (b/n) = (b³/n³) Σk² = (b³/n³) · n(n+1)(2n+1)/6
        </p>
        <p>
          Sederhanakan menjadi S<sub>n</sub> = b³(n+1)(2n+1)/(6n²). Ketika n → ∞, pecahan
          (n+1)(2n+1)/n² menuju 2, sehingga S<sub>n</sub> → b³·2/6 = <strong>b³/3</strong>.
        </p>
        <h4>Kenapa angka itu benar-benar luasnya</h4>
        <p>
          Ada satu langkah yang mudah terlewat. Setiap S<sub>n</sub> <em>lebih besar</em> dari luas
          sebenarnya, karena batang ujung kanan selalu menonjol keluar. Dari S<sub>n</sub> saja kita
          baru boleh menyimpulkan luas ≤ b³/3, belum sama dengan.
        </p>
        <p>
          Batas bawahnya didapat dengan mengambil tinggi di ujung kiri: s<sub>n</sub> =
          (b³/n³)·Σ<sub>k=0</sub><sup>n−1</sup>k² = b³(n−1)(2n−1)/(6n²), dan batang seperti ini
          selalu berada di dalam daerah. Jadi s<sub>n</sub> ≤ luas ≤ S<sub>n</sub> untuk setiap n.
          Karena s<sub>n</sub> juga menuju b³/3, luasnya terjepit dari dua sisi dan tidak punya
          nilai lain yang mungkin. Itulah yang membuat limitnya sah disebut luas, bukan sekadar
          hampiran yang bagus.
        </p>
        <h4>Hubungannya dengan turunan</h4>
        <p>
          Perhatikan bahwa turunan dari b³/3 adalah b². Ini bukan kebetulan, melainkan{' '}
          <strong>Teorema Dasar Kalkulus</strong>: kalau f kontinu dan A(b) menyatakan luas dari 0
          sampai b, maka A′(b) = f(b). Alasannya bisa dibayangkan: menambah b sedikit sebesar Δb
          menambah luas kira-kira sebesar satu batang tipis, yaitu f(b)·Δb.
        </p>
        <p>
          Karena itu menghitung luas berubah menjadi mencari fungsi yang turunannya f — jauh lebih
          mudah daripada menjumlahkan tak hingga banyak batang. Di situlah integral berhenti menjadi
          sekadar gagasan dan menjadi alat hitung.
        </p>
        <h4>Kenapa "luas" boleh bernilai negatif</h4>
        <p>
          Kalau kurvanya berada di bawah sumbu-x, tinggi batangnya negatif dan sumbangannya
          mengurangi. Integral tentu menghitung <em>luas bertanda</em>. Untuk luas geometris yang
          sesungguhnya, dipakai ∫ₐᵇ |f(x)| dx.
        </p>
      </>
    ),
    SMP: (
      <>
        <p>
          Bayangkan kamu harus mengukur luas sepetak tanah yang salah satu sisinya berupa tepi sungai
          yang berkelok. Tidak ada rumus untuk bentuk seperti itu.
        </p>
        <p>
          Caranya: tutupi tanah itu dengan ubin persegi panjang. Hasilnya belum tepat, karena ada
          bagian ubin yang keluar dari batas. Tapi kalau ubinnya diganti dengan ubin yang jauh lebih
          tipis, bagian yang meleset menjadi makin sedikit.
        </p>
        <p>
          Makin tipis ubinnya, makin dekat totalnya ke luas yang sebenarnya. Angka yang didekati itu
          adalah jawabannya — dan itulah yang dihitung oleh integral.
        </p>
      </>
    ),
  },

  rumus: {
    src: 'luas = [integral:∫]₀ᵇ f(x) [dx:dx] = lim(n→∞) Σ [f:f(x)] × [dx:Δx]',
    // "batas" tidak ada di src, tetapi dipakai rumus hidup di mode eksperimen;
    // warnanya sengaja sama dengan titik b yang diseret di gambar.
    roles: { integral: 'hi', dx: 'b', f: 'ab', batas: 'a' },
    arti: {
      batas: 'Batas kanan daerah yang dihitung — titik yang kamu seret di sepanjang kurva.',
      integral:
        'Huruf S yang dipanjangkan — lambang penjumlahan tak hingga banyak batang tipis. Angka 0 dan b di pangkalnya menyatakan dari mana sampai mana daerahnya dihitung.',
      dx: 'Sisa dari lebar batang yang diperkecil tanpa batas.',
      f: 'Tinggi tiap batang, yaitu nilai fungsi di titik itu.',
    },
  },

  soal: [
    {
      id: 'int-1',
      tipe: 'angka',
      topicId: 'sma12-jumlah-riemann-dan-integral-tentu',
      kelas: 12,
      tingkat: 'mudah',
      konsep: 'integral-luas',
      pertanyaan:
        'Berapa luas daerah di bawah kurva y = x² dari x = 0 sampai x = 3? Gunakan hasil bahwa luasnya b³/3.',
      jawaban: 9,
      toleransi: 1e-6,
      hint: [
        'Masukkan batas kanannya ke dalam rumus b³/3.',
        '3³ = 27.',
        'Lalu bagi dengan 3.',
      ],
      pembahasan: 'Luas = 3³/3 = 27/3 = 9 satuan luas.',
    },
    {
      id: 'int-2',
      tipe: 'benar-salah',
      topicId: 'sma12-jumlah-riemann-dan-integral-tentu',
      kelas: 12,
      tingkat: 'sedang',
      konsep: 'integral-luas',
      pertanyaan:
        'Untuk y = x² pada selang [0, b] dengan b > 0: menambah jumlah persegi panjang membuat jumlah Riemann kanan mendekati nilai sebenarnya dari atas (nilainya menurun).',
      jawaban: true,
      diagnosa:
        'Pada [0, b] kurva x² menanjak, sehingga batang yang tingginya diambil di ujung kanan selalu menonjol keluar. Kalau tingginya diambil di ujung kiri, hasilnya justru selalu kurang — jadi arah pendekatannya tergantung titik mana yang dipakai.',
      hint: [
        'Bayangkan batang-batang itu digambar bersama kurva y = x², seperti di bagian Bongkar.',
        'Tinggi batang di sini diambil di ujung kanan setiap potongan.',
        'Untuk kurva yang menanjak, ujung kanan adalah titik tertinggi pada potongan itu.',
      ],
      pembahasan:
        'Benar untuk jumlah Riemann kanan pada fungsi naik: setiap batang menonjol sedikit di atas kurva, sehingga jumlahnya selalu lebih besar dari luas sebenarnya dan turun mendekatinya. Selisihnya persis b³(3n+1)/(6n²) — selalu positif dan mengecil saat n bertambah. Dengan titik ujung kiri, hasilnya akan selalu lebih kecil dan naik mendekat.',
    },
    (rnd) => {
      const n = [4, 5, 10][Math.floor(rnd() * 3)]
      const S = jumlahRiemann(1, n)
      return {
        id: 'int-3',
        tipe: 'angka',
        topicId: 'sma12-jumlah-riemann-dan-integral-tentu',
        kelas: 12,
        tingkat: 'sulit',
        konsep: 'integral-luas',
        pertanyaan: `Hitung jumlah Riemann kanan untuk y = x² pada selang [0, 1] dengan ${n} persegi panjang. Bulatkan sampai empat angka di belakang koma.`,
        jawaban: Math.round(S * 10000) / 10000,
        toleransi: 0.0002,
        hint: [
          `Lebar tiap batang 1/${n}, dan tingginya diambil di ujung kanan.`,
          `Jumlahnya = (1/${n}) × [(1/${n})² + (2/${n})² + … + (${n}/${n})²].`,
          `Gunakan Σk² = n(n+1)(2n+1)/6 dengan n = ${n}.`,
        ],
        pembahasan: `Sₙ = (n+1)(2n+1)/(6n²) = ${fmt(S, 5)}. Dibandingkan nilai tepat 1/3 ≈ 0,3333, selisihnya ${fmt(S - 1 / 3, 5)}.`,
      }
    },
    {
      id: 'int-4',
      tipe: 'pilihan',
      topicId: 'sma12-jumlah-riemann-dan-integral-tentu',
      kelas: 12,
      tingkat: 'sedang',
      konsep: 'integral-luas',
      pertanyaan: 'Apa arti lambang dx pada penulisan integral tentu ∫ₐᵇ f(x) dx?',
      pilihan: [
        { id: 'a', label: 'Sisa dari lebar batang yang menyusut tanpa batas', benar: true },
        {
          id: 'b',
          label: 'Perkalian d dengan x',
          diagnosa: 'dx bukan hasil kali dua besaran; ia satu lambang utuh yang menandai variabel apa yang diintegralkan.',
        },
        {
          id: 'c',
          label: 'Sekadar penanda akhir rumus tanpa arti',
          diagnosa:
            'dx punya arti penting. Ia menentukan variabel mana yang diintegralkan — bandingkan ∫x·y dx dengan ∫x·y dy.',
        },
      ],
      hint: [
        'Bandingkan bentuk Σ f(x)·Δx dengan ∫ₐᵇ f(x) dx.',
        'Bagian mana pada jumlah Riemann yang berubah menjadi dx?',
        'Δx adalah lebar batang.',
      ],
      pembahasan:
        'Lambang ∫ menggantikan Σ, dan dx menggantikan Δx. Jadi dx adalah jejak dari lebar batang yang diperkecil tanpa batas, sekaligus penanda variabel yang diintegralkan.',
    },
    {
      id: 'int-5',
      tipe: 'urutkan',
      topicId: 'sma12-jumlah-riemann-dan-integral-tentu',
      kelas: 12,
      tingkat: 'sulit',
      konsep: 'integral-luas',
      pertanyaan: 'Susun gagasan menghitung luas daerah melengkung.',
      langkah: [
        'Bagi selang menjadi n potongan selebar Δx',
        'Ganti tiap potongan dengan persegi panjang setinggi nilai fungsinya',
        'Jumlahkan luas seluruh persegi panjang',
        'Perbesar n sehingga Δx menuju nol',
        'Nilai yang didekati jumlah itu adalah luas daerahnya',
      ],
      hint: [
        'Langkah pertama selalu memecah masalah menjadi bagian-bagian yang bisa dihitung.',
        'Limit diambil setelah bentuk jumlahnya tersusun.',
      ],
      pembahasan:
        'Bagi, ganti, jumlahkan, lalu perhalus. Pola berpikir ini terus dipakai untuk menghitung volume, panjang busur, dan usaha dalam fisika.',
    },
  ],

  lanjut: ['turunan-kemiringan', 'lingkaran-luas', 'parabola'],
}

export default konsep
