/* ============================================================
   KONSEP — Kenapa turunan disebut kemiringan?
   Kelas 11 · Kalkulus

   Gagasan: kemiringan garis lurus mudah dihitung karena selalu
   sama di mana pun. Pada kurva, kemiringannya berubah-ubah —
   jadi kita hitung kemiringan garis POTONG melalui dua titik yang
   berdekatan, lalu dekatkan kedua titik itu.

   Untuk f(x) = x², kemiringan garis potongnya persis 2x + h.
   Ketika h menyusut ke nol, yang tersisa 2x. Angka h benar-benar
   terlihat lenyap dari layar — itulah arti limit di sini.

   ------------------------------------------------------------
   Interaksi langsung (docs/PANDUAN-INTERAKSI.md)

   x  Titik singgung MELUNCUR DI KURVA (pola "nilai pada grafik
      fungsi"). `keNilai` hanya membaca pt.x dan merupakan
      kebalikan persis dari kx().

   h  Titik kedua ikut meluncur di kurva dan bisa diseret sendiri
      selama masih cukup jauh dari titik singgung (>= 52 px di
      layar). Karena itu h dimulai dari nilai terbesarnya, supaya
      titik itu pasti bisa dipegang di panggung sekecil apa pun.
      Pada h kecil kedua pegangan akan berdempet — area
      sentuhnya ±52 px — sehingga titik singgung tidak bisa
      dipegang lagi. Karena itu titik kedua berubah menjadi titik
      biasa saat berdempet, dan REL h tepat di bawah grafik
      menjadi cara memegang h di seluruh rentang, termasuk di
      0,01 yang justru paling ingin dicapai anak.
      Satu-satunya perkecualian: seretan yang SUDAH berjalan tidak
      diputus di tengah jalan (lihat pegangTitik2). Perkecualian itu
      tidak berlaku bagi rel — menyentuh rel saat kedua titik sudah
      berdempet tidak boleh memunculkan pegangan hantu di atas titik
      singgung.

   ------------------------------------------------------------
   Tata letak

   Label tidak pernah bertabrakan karena tiga aturan:
   1. Angka x duduk di kiri-atas titik singgung; segitiga selalu
      tumbuh ke kanan, jadi kedua daerah itu tidak berebut.
   2. Label kaki hanya muncul bila kakinya memang cukup besar
      untuk memuatnya (lihat ukurPotong). Saat segitiga menyusut,
      angkanya pindah ke panel — bukan menumpuk di atas gambar.
   3. Angka sumbu mengalah: yang tertutup label yang bergerak
      disembunyikan (prop `hindari` pada Sumbu).
   ============================================================ */

import { useEffect, useState } from 'react'
import { Pegangan, RelGeser, useInteraksi } from '../components/Interaksi'
import { Svg, Tag, useSempit, useSkalaSvg, useUkuranLayar } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

/* ---------------- Jendela grafik ---------------- */

const XMIN = -0.4
const XMAX = 3.4
const YMIN = -1.2
const YMAX = 10.4

/** x terbesar yang kurvanya masih muat di jendela (√YMAX ≈ 3,22). */
const X_MUAT = Math.sqrt(YMAX)

const kuadrat = (x: number) => x * x
const garis = (x: number) => 2 * x + 1

/** px layar → satuan SVG (dari useUkuranLayar). */
type Ukur = (px: number, cadangan?: number) => number

/**
 * Ukuran huruf untuk <text> mentah dan Tag berlabel `layar`: tidak pernah
 * lebih kecil dari `px` di layar, dan tidak pernah kurang dari 13 satuan SVG.
 */
const huruf = (u: Ukur, px: number) => Math.max(13, u(px))

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
  /** panel angka. */
  panelX: number
  panelY: number
  panelW: number
  panelKolom: number
  /** baris keterangan di atas gambar (hanya bongkar). */
  judulY?: number
  /** rel h (hanya eksperimen). */
  relY?: number
  relX1?: number
  relX2?: number
}

const BONGKAR_LEBAR: Tata = {
  sempit: false,
  w: 700,
  h: 440,
  maxH: 440,
  gx0: 70,
  gx1: 474,
  gy0: 56,
  gy1: 372,
  panelX: 500,
  panelY: 88,
  panelW: 190,
  panelKolom: 1,
  judulY: 30,
}

/** HP tegak: grafik dibuat selebar mungkin, panel turun ke bawah jadi dua kolom. */
const BONGKAR_HP: Tata = {
  sempit: true,
  w: 420,
  h: 474,
  maxH: 470,
  gx0: 44,
  gx1: 406,
  gy0: 52,
  gy1: 300,
  panelX: 14,
  panelY: 348,
  panelW: 392,
  panelKolom: 2,
  judulY: 28,
}

const EKS_LEBAR: Tata = {
  sempit: false,
  w: 700,
  h: 492,
  maxH: 486,
  gx0: 70,
  gx1: 474,
  gy0: 40,
  gy1: 328,
  panelX: 500,
  panelY: 72,
  panelW: 190,
  panelKolom: 1,
  relY: 432,
  relX1: 100,
  relX2: 444,
}

const EKS_HP: Tata = {
  sempit: true,
  w: 420,
  h: 536,
  maxH: 470,
  gx0: 44,
  gx1: 406,
  gy0: 30,
  gy1: 266,
  panelX: 14,
  panelY: 440,
  panelW: 392,
  panelKolom: 2,
  relY: 384,
  relX1: 66,
  relX2: 356,
}

const kx = (L: Tata, x: number) => L.gx0 + ((x - XMIN) / (XMAX - XMIN)) * (L.gx1 - L.gx0)
const ky = (L: Tata, y: number) => L.gy1 - ((y - YMIN) / (YMAX - YMIN)) * (L.gy1 - L.gy0)

/** Kebalikan persis dari kx(): posisi jari (koordinat SVG) → nilai x pada grafik. */
const xDari = (L: Tata, sx: number) => XMIN + ((sx - L.gx0) / (L.gx1 - L.gx0)) * (XMAX - XMIN)

/** Baris angka di bawah sumbu-x. */
const barisAngkaX = (L: Tata, u: Ukur) => ky(L, 0) + u(15)

/**
 * Ruas garis y = y0 + m(x − x0) yang masih berada di dalam jendela grafik,
 * supaya garis potong dan garis singgung tidak pernah keluar viewBox.
 */
function ruasGaris(x0: number, y0: number, m: number): [number, number] {
  if (m === 0) return [XMIN, XMAX]
  const xa = x0 + (YMIN - y0) / m
  const xb = x0 + (YMAX - y0) / m
  const a = Math.max(XMIN, Math.min(xa, xb))
  const b = Math.min(XMAX, Math.max(xa, xb))
  return b > a ? [a, b] : [x0, x0]
}

/* ---------------- Sumbu dan kurva ---------------- */

function Sumbu({
  L,
  f,
  warna,
  hindari = [],
}: {
  L: Tata
  f: (x: number) => number
  warna: string
  /** angka sumbu yang tertutup kotak-kotak ini disembunyikan. */
  hindari?: Kotak[]
}) {
  const u = useUkuranLayar()
  const n = 120
  const d: string[] = []
  let putus = true
  for (let i = 0; i <= n; i++) {
    const x = XMIN + ((XMAX - XMIN) * i) / n
    const y = f(x)
    if (y < YMIN || y > YMAX) {
      putus = true
      continue
    }
    d.push(`${putus ? 'M' : 'L'} ${kx(L, x).toFixed(1)} ${ky(L, y).toFixed(1)}`)
    putus = false
  }
  const szX = huruf(u, 12)
  const szY = huruf(u, 11)
  const y0 = ky(L, 0)
  const baris = barisAngkaX(L, u)
  return (
    <g>
      {[0, 1, 2, 3].map((x) => (
        <line key={`v${x}`} x1={kx(L, x)} y1={L.gy0} x2={kx(L, x)} y2={L.gy1} stroke="var(--m-grid)" strokeWidth={1} />
      ))}
      {[2, 4, 6, 8, 10].map((y) => (
        <line key={`h${y}`} x1={L.gx0} y1={ky(L, y)} x2={L.gx1} y2={ky(L, y)} stroke="var(--m-grid)" strokeWidth={1} />
      ))}
      <line x1={L.gx0} y1={y0} x2={L.gx1} y2={y0} stroke="var(--m-axis)" strokeWidth={1.8} />
      <line x1={kx(L, 0)} y1={L.gy0} x2={kx(L, 0)} y2={L.gy1} stroke="var(--m-axis)" strokeWidth={1.8} />
      {[1, 2, 3].map((x) => {
        if (tertutup(kotakTeks(kx(L, x), baris, fmt(x), szX), hindari)) return null
        return (
          <text
            key={`lx${x}`}
            x={kx(L, x)}
            y={baris}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={szX}
            fontWeight={700}
            fill="var(--ink-soft)"
          >
            {fmt(x)}
          </text>
        )
      })}
      {/* Sumbu tegak diberi angka juga: skala tegak dan mendatar di sini
          memang tidak sama, jadi kemiringan harus dibaca dari angkanya. */}
      {[2, 4, 6, 8, 10].map((y) => {
        const px = kx(L, 0) - u(7)
        if (tertutup(kotakTeks(px, ky(L, y), fmt(y), szY, 'end'), hindari)) return null
        return (
          <text
            key={`ly${y}`}
            x={px}
            y={ky(L, y)}
            textAnchor="end"
            dominantBaseline="middle"
            fontSize={szY}
            fontWeight={700}
            fill="var(--ink-soft)"
          >
            {fmt(y)}
          </text>
        )
      })}
      <path d={d.join(' ')} fill="none" stroke={warna} strokeWidth={3} strokeLinejoin="round" />
    </g>
  )
}

/* ---------------- Garis potong / garis singgung ---------------- */

interface LabelKaki {
  x: number
  y: number
  teks: string
  anchor: Anchor
}

interface TataPotong {
  sx1: number
  sy1: number
  sx2: number
  sy2: number
  m: number
  /** ujung ruas garis di dalam jendela, sudah dalam koordinat SVG. */
  ax: number
  ay: number
  bx: number
  by: number
  segitiga: boolean
  hLabel: LabelKaki | null
  dyLabel: LabelKaki | null
}

/**
 * Hitung letak garis potong beserta label kedua kakinya.
 *
 * Label hanya diberikan bila kakinya memang sanggup memuatnya, dan tidak
 * pernah ditaruh di tempat yang sudah dipakai (`hindari`). Dengan begitu
 * segitiga yang menyusut tidak meninggalkan tumpukan angka di layar:
 * angkanya tetap terbaca di panel.
 */
function ukurPotong(
  L: Tata,
  u: Ukur,
  sz: number,
  x: number,
  h: number,
  f: (x: number) => number,
  namaH: string,
  hindari: Kotak[],
  kotakX: Kotak | null,
): TataPotong {
  const x2 = x + h
  const y1 = f(x)
  const y2 = f(x2)
  // Untuk h = 0 dipakai kemiringan garis singgung kurva y = x², yaitu 2x
  // (satu-satunya f yang dipakai dengan h = 0 di berkas ini).
  const m = h === 0 ? 2 * x : (y2 - y1) / h
  const [xa, xb] = ruasGaris(x, y1, m)

  const sx1 = kx(L, x)
  const sy1 = ky(L, y1)
  const sx2 = kx(L, x2)
  const sy2 = ky(L, y2)
  const segitiga = Math.abs(h) > 0.025

  let hLabel: LabelKaki | null = null
  let dyLabel: LabelKaki | null = null

  if (segitiga) {
    // Kaki mendatar: label di bawah kaki, cukup rendah untuk melewati
    // lingkaran pegangan titik singgung.
    if (Math.abs(sx2 - sx1) >= u(22)) {
      const teks = `${namaH} = ${fmt(h, 2)}`
      const px = (sx1 + sx2) / 2
      const py = sy1 + u(26)
      if (!tertutup(kotakTag(px, py, teks, sz), hindari)) hLabel = { x: px, y: py, teks, anchor: 'middle' }
    }
    // Kaki tegak: hanya bila kakinya lebih tinggi daripada labelnya sendiri.
    if (Math.abs(sy2 - sy1) >= u(52)) {
      const teks = `Δy = ${fmt(y2 - y1, 2)}`
      const lebar = [...teks].length * sz * 0.58 + 14
      const batasKanan = L.sempit ? L.gx1 + u(8) : L.panelX - u(10)
      if (sx2 + u(10) + lebar <= batasKanan) {
        dyLabel = { x: sx2 + u(10), y: (sy1 + sy2) / 2, teks, anchor: 'start' }
      } else {
        // Tidak ada ruang di kanan: label pindah ke sisi dalam, digeser ke
        // atas secukupnya agar tetap di atas angka x dan lepas dari pegangan.
        const batasAtas = kotakX ? kotakX.y0 - sz * 0.68 - u(3) : Infinity
        const py = Math.min((sy1 + sy2) / 2, batasAtas)
        const px = sx2 - u(18)
        dyLabel =
          kotakTag(px, py, teks, sz, 'end').x0 >= u(4)
            ? { x: px, y: py, teks, anchor: 'end' }
            : { x: u(4), y: py, teks, anchor: 'start' }
      }
    }
  }

  return { sx1, sy1, sx2, sy2, m, ax: kx(L, xa), ay: ky(L, y1 + m * (xa - x)), bx: kx(L, xb), by: ky(L, y1 + m * (xb - x)), segitiga, hLabel, dyLabel }
}

function Potong({
  tp,
  warna,
  sz,
  tampilSegitiga,
  nyala,
  nyalaH = false,
  nyalaDy = false,
  titikKedua = true,
}: {
  tp: TataPotong
  warna: string
  sz: number
  tampilSegitiga: number
  nyala: boolean
  nyalaH?: boolean
  nyalaDy?: boolean
  titikKedua?: boolean
}) {
  const tampak = tp.segitiga && tampilSegitiga > 0.02
  return (
    <g>
      <line
        x1={tp.ax}
        y1={tp.ay}
        x2={tp.bx}
        y2={tp.by}
        stroke={warna}
        strokeWidth={nyala ? 3.8 : 2.4}
        opacity={0.95}
      />
      {tampak && (
        <g opacity={tampilSegitiga}>
          <line x1={tp.sx1} y1={tp.sy1} x2={tp.sx2} y2={tp.sy1} stroke="var(--m-b)" strokeWidth={nyalaH ? 4 : 2.4} />
          <line x1={tp.sx2} y1={tp.sy1} x2={tp.sx2} y2={tp.sy2} stroke="var(--m-ab)" strokeWidth={nyalaDy ? 4 : 2.4} />
          {tp.hLabel && (
            <Tag
              x={tp.hLabel.x}
              y={tp.hLabel.y}
              anchor={tp.hLabel.anchor}
              warna={nyalaH ? 'var(--m-hi)' : 'var(--m-b)'}
              size={sz}
              layar
            >
              {tp.hLabel.teks}
            </Tag>
          )}
          {tp.dyLabel && (
            <Tag
              x={tp.dyLabel.x}
              y={tp.dyLabel.y}
              anchor={tp.dyLabel.anchor}
              warna={nyalaDy ? 'var(--m-hi)' : 'var(--m-ab)'}
              size={sz}
              layar
            >
              {tp.dyLabel.teks}
            </Tag>
          )}
        </g>
      )}
      {titikKedua && tp.segitiga && <circle cx={tp.sx2} cy={tp.sy2} r={5.5} fill={warna} opacity={0.8} />}
    </g>
  )
}

/* ---------------- Angka x yang menempel pada titik singgung ---------------- */

/**
 * Angka x duduk di kiri-atas titik singgung, karena segitiga kemiringan
 * selalu tumbuh ke kanan. Kalau ruang di kiri habis (x paling kecil),
 * angkanya berhenti di tepi gambar.
 */
function letakAngkaX(u: Ukur, sz: number, sx: number, sy: number, teks: string) {
  const px = sx - u(4)
  const py = sy - u(24)
  const k = kotakTag(px, py, teks, sz, 'end')
  return k.x0 >= u(4)
    ? { x: px, y: py, anchor: 'end' as Anchor, kotak: k }
    : { x: u(4), y: py, anchor: 'start' as Anchor, kotak: kotakTag(u(4), py, teks, sz, 'start') }
}

/**
 * Kotak gelembung "Coba geser aku" yang dipasang mesin di bawah pegangan utama.
 * Ukurannya dihitung dengan skala yang sama persis dengan yang dipakai
 * `Pegangan` (termasuk cadangan 0,6 saat panggung belum terukur).
 */
function kotakAjakan(px: Ukur, sx: number, sy: number): Kotak {
  const r = Math.max(8, px(9))
  return kotakTag(sx, sy + r + px(24), 'Coba geser aku', px(13))
}

/** Skala yang dipakai Pegangan untuk ukurannya sendiri. */
function usePxPegangan(): Ukur {
  const skala = useSkalaSvg() || 0.6
  return (n: number) => n / skala
}

/* ---------------- Panel angka ---------------- */

interface BarisPanel {
  teks: string
  warna?: string
  besar?: boolean
}

function Panel({ L, baris, tampil }: { L: Tata; baris: BarisPanel[]; tampil: number }) {
  const u = useUkuranLayar()
  if (baris.length === 0) return null
  const kolom = L.panelKolom
  const jumlahBaris = Math.ceil(baris.length / kolom)
  const pad = L.sempit ? 15 : 16
  const tinggiBaris = L.sempit ? 30 : 34
  const lebarKolom = L.panelW / kolom
  const szKecil = huruf(u, L.sempit ? 13 : 14)
  const szBesar = huruf(u, L.sempit ? 15 : 17)
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

/* ---------------- Visual untuk animasi bongkar ---------------- */

/** h terkecil yang masih dipakai gambar — sengaja bukan nol. */
const H_AKHIR = 0.02

/** Jarak titik pembanding pada langkah garis lurus. */
const H_LURUS = 1

/**
 * Nilai yang diturunkan dari penggeser bongkar. Dipakai bersama oleh gambar
 * dan oleh teks langkah supaya angka di narasi tidak pernah berbeda dari
 * angka yang terlihat.
 *
 * Batas x dipilih 2,1 supaya DUA titik pembanding tetap muat di jendela:
 * titik kedua kurva (x + h, (x + h)²) dengan x + h ≤ 3,2 < √10,4, dan titik
 * pembanding garis lurus di x + 1 ≤ 3,1 < 3,4. Dengan batas itu h awal tidak
 * pernah lebih kecil dari 1,1, jadi segitiga kemiringannya selalu cukup besar
 * untuk memuat labelnya sendiri.
 */
function nilaiBongkar(p: Record<string, number>) {
  const x = clamp(p.x ?? 1.5, 0.3, 2.1)
  // Untuk x besar, h awal diperpendek supaya titik kedua tetap berada di
  // dalam gambar. Dibulatkan ke bawah ke persepuluhan agar panel (3 desimal),
  // label segitiga, dan narasi (2 desimal) menampilkan angka yang sama.
  const hAwal = Math.min(1.4, Math.floor((X_MUAT - x) * 10) / 10)
  return { x, hAwal, turunan: 2 * x }
}

/**
 * Keterangan di atas gambar. Versi HP dijaga paling panjang 19 huruf: di layar
 * 320 px keterangan yang lebih panjang menyelinap ke bawah tombol layar penuh
 * yang melayang di pojok kanan atas panggung.
 */
function keterangan(step: number, L: Tata, turunan: number) {
  if (step === 0) {
    return {
      teks: L.sempit ? 'garis lurus: tetap' : 'garis lurus: kemiringannya sama di mana pun',
      warna: 'var(--m-c)',
    }
  }
  if (step === 1) {
    return {
      teks: L.sempit ? 'kurva: berubah-ubah' : 'kurva: kemiringannya berbeda di setiap titik',
      warna: 'var(--m-a)',
    }
  }
  if (step === 2) {
    return {
      teks: L.sempit ? 'naik dibagi maju' : 'ambil dua titik, hitung naik dibagi maju',
      warna: 'var(--m-b)',
    }
  }
  if (step === 3) {
    return { teks: L.sempit ? 'dekatkan titiknya' : 'dekatkan titik keduanya…', warna: 'var(--m-hi)' }
  }
  return {
    teks: L.sempit
      ? `kemiringan ≈ ${fmt(turunan, 2)}`
      : `nyaris menyinggung — kemiringannya mendekati ${fmt(turunan, 2)}`,
    warna: 'var(--m-hi)',
  }
}

/**
 * Isi gambar dipisahkan dari <Svg> dengan sengaja: skala layar baru tersedia
 * DI DALAM <Svg>. Kalau useUkuranLayar dipanggil di luar, ia selalu memberi
 * nilai cadangan dan jarak yang kita hitung tidak akan sama dengan jarak yang
 * dipakai Tag, Pegangan, dan Sumbu.
 */
function IsiBongkar({ L, step, t, p, sorot }: DeriveState & { L: Tata }) {
  const u = useUkuranLayar()
  const pxPeg = usePxPegangan()
  const ctx = useInteraksi()
  const { x, hAwal, turunan } = nilaiBongkar(p)

  // h menyusut pada langkah 3 (tanpa lompatan dari hAwal), lalu tetap kecil.
  const h =
    step <= 2
      ? hAwal
      : step === 3
        ? H_AKHIR + (hAwal - H_AKHIR) * (1 - seg(t, 0.05, 0.95))
        : H_AKHIR

  const linear = step === 0
  const f = linear ? garis : kuadrat
  const m = linear ? 2 : (f(x + h) - f(x)) / h

  const tampilPotong = linear ? 1 : fase(step, t, 2)
  const tampilPanel = step >= 4 || linear

  const nyalaH = sorot === 'h'
  const nyalaDy = sorot === 'dy'
  const nyalaTurunan = sorot === 'turunan' || sorot === 'dua-x'

  const sz = huruf(u, 13)
  const szKet = huruf(u, L.sempit ? 14 : 15)

  // Angka x lebih dulu: ia yang paling dekat dengan objeknya, jadi label lain
  // dan angka sumbu yang mengalah kepadanya.
  const sx1 = kx(L, x)
  const sy1 = ky(L, f(x))
  const teksX = `x = ${fmt(x, 2)}`
  const angkaX = letakAngkaX(u, sz, sx1, sy1, teksX)
  const hindari: Kotak[] = [angkaX.kotak]
  if (ctx?.ajakan) hindari.push(kotakAjakan(pxPeg, sx1, sy1))

  // Garis potong baru ada setelah titik kedua diambil (langkah 2); pada
  // langkah garis lurus ia langsung tampak penuh.
  const adaPotong = tampilPotong > 0.02
  const tp = ukurPotong(L, u, sz, x, linear ? H_LURUS : h, f, linear ? 'Δx' : 'h', hindari, angkaX.kotak)
  if (adaPotong) {
    if (tp.hLabel) hindari.push(kotakTag(tp.hLabel.x, tp.hLabel.y, tp.hLabel.teks, sz, tp.hLabel.anchor))
    if (tp.dyLabel) hindari.push(kotakTag(tp.dyLabel.x, tp.dyLabel.y, tp.dyLabel.teks, sz, tp.dyLabel.anchor))
  }

  const baris: BarisPanel[] = linear
    ? [
        { teks: 'y = 2x + 1', warna: 'var(--m-c)' },
        { teks: 'Δy / Δx = 2', warna: 'var(--m-ab)', besar: true },
        { teks: 'di mana pun sama' },
      ]
    : [
        { teks: `x = ${fmt(x, 2)}`, warna: 'var(--m-a)' },
        // h dan Δy/h baru muncul saat titik kedua diambil (langkah 2);
        // 2x baru muncul setelah dihitung dengan aljabar (langkah 4),
        // supaya hasil akhirnya tidak terlihat lebih dulu.
        ...(step >= 2
          ? [
              { teks: `h = ${fmt(h, 3)}`, warna: nyalaH ? 'var(--m-hi)' : 'var(--m-b)' },
              { teks: `Δy/h = ${fmt(m, 3)}`, warna: 'var(--m-ab)', besar: true },
            ]
          : []),
        ...(step >= 4
          ? [{ teks: `2x = ${fmt(turunan, 2)}`, warna: nyalaTurunan ? 'var(--m-hi)' : 'var(--m-a)' }]
          : []),
      ]

  const ket = keterangan(step, L, turunan)

  return (
    <>
      <Sumbu L={L} f={f} warna={linear ? 'var(--m-c)' : 'var(--m-a)'} hindari={hindari} />

      {adaPotong && (
        <Potong
          tp={tp}
          sz={sz}
          warna={linear ? 'var(--m-c)' : step >= 4 ? 'var(--m-hi)' : 'var(--m-b)'}
          tampilSegitiga={tampilPotong}
          nyala={nyalaTurunan}
          nyalaH={nyalaH}
          nyalaDy={nyalaDy}
        />
      )}

      <Panel L={L} baris={baris} tampil={tampilPanel ? 1 : 0.35} />

      <Tag x={L.w / 2} y={L.judulY ?? 30} warna={ket.warna} size={szKet} layar>
        {ket.teks}
      </Tag>

      {/* Angka x menempel pada titiknya dan ikut bergerak saat titiknya diseret,
          jadi pegangan tidak perlu memasang labelnya sendiri di bawah jari. */}
      <Tag x={angkaX.x} y={angkaX.y} anchor={angkaX.anchor} warna="var(--m-a)" size={sz} layar>
        {teksX}
      </Tag>

      {/* Titik singgung meluncur di sepanjang kurva (atau garis, pada langkah 0).
          Grafiknya ada di semua langkah, jadi pegangan ini tidak pernah
          disembunyikan. */}
      <Pegangan x={sx1} y={sy1} param="x" arah="x" utama keNilai={(pt) => xDari(L, pt.x)} />
    </>
  )
}

function VisualBongkar(props: DeriveState) {
  const L = useSempit() ? BONGKAR_HP : BONGKAR_LEBAR
  return (
    <Svg w={L.w} h={L.h} maxH={L.maxH} label="Kurva dengan garis potong yang mendekati garis singgung">
      <IsiBongkar L={L} {...props} />
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

/**
 * Batas x dan h dipilih bersama supaya titik kedua (x + h, (x + h)²) selalu
 * berada di dalam jendela grafik: x + h ≤ 2,2 + 1 = 3,2 < √10,4 ≈ 3,22.
 */
function nilaiEksperimen(p: Record<string, number>) {
  const x = clamp(p.x ?? 1.5, 0.2, 2.2)
  const h = clamp(p.h ?? 1, 0.01, 1)
  return { x, h, m: (kuadrat(x + h) - kuadrat(x)) / h, turunan: 2 * x }
}

/** Lihat catatan pada IsiBongkar: skala layar hanya ada di dalam <Svg>. */
function IsiEksperimen({ L, p, sorot }: { L: Tata; p: Record<string, number>; sorot: string | null }) {
  const u = useUkuranLayar()
  const pxPeg = usePxPegangan()
  const ctx = useInteraksi()
  const aktif = ctx?.kendali.aktif
  // Titik kedua dan rel sama-sama mengubah h, jadi `aktif === 'h'` tidak bisa
  // membedakan keduanya. Yang dicatat di sini adalah sentuhan (atau fokus
  // papan ketik) pada titik keduanya sendiri: hanya itu yang boleh membuat
  // pegangannya bertahan saat kedua titik sudah berdempet.
  const [titik2Dipegang, setTitik2Dipegang] = useState(false)
  useEffect(() => {
    if (aktif !== 'h') setTitik2Dipegang(false)
  }, [aktif])
  const { x, h, m, turunan } = nilaiEksperimen(p)

  const sz = huruf(u, 13)
  const sx1 = kx(L, x)
  const sy1 = ky(L, kuadrat(x))
  const teksX = `x = ${fmt(x, 2)}`
  const angkaX = letakAngkaX(u, sz, sx1, sy1, teksX)
  const hindari: Kotak[] = [angkaX.kotak]
  if (ctx?.ajakan) hindari.push(kotakAjakan(pxPeg, sx1, sy1))

  const singgung = ukurPotong(L, u, sz, x, 0, kuadrat, 'h', hindari, angkaX.kotak)
  const potong = ukurPotong(L, u, sz, x, h, kuadrat, 'h', hindari, angkaX.kotak)
  if (potong.hLabel) hindari.push(kotakTag(potong.hLabel.x, potong.hLabel.y, potong.hLabel.teks, sz, potong.hLabel.anchor))
  if (potong.dyLabel)
    hindari.push(kotakTag(potong.dyLabel.x, potong.dyLabel.y, potong.dyLabel.teks, sz, potong.dyLabel.anchor))

  // Titik kedua boleh diseret sendiri selama area sentuhnya belum menindih
  // area sentuh titik singgung. Selagi titik itu sendiri yang dipegang,
  // pegangannya tetap hidup sampai kedua titik berimpit — seretannya tidak
  // putus di tengah jalan — lalu rel di bawah grafik yang mengambil alih.
  const pegangTitik2 = potong.sx2 - sx1 >= u(52) || titik2Dipegang

  // Label nilai rel ("h = 0,01") digambar di atas pegangannya dan ikut
  // bergerak sampai ke ujung rel. Di panggung yang kecil label itu jauh lebih
  // lebar daripada jarak ujung rel ke tepi gambar, jadi ujung relnya ditarik
  // masuk sejauh setengah label supaya angkanya tidak terpotong.
  const setengahLabelRel = (8 * pxPeg(15) * 0.58 + 14) / 2 + 2
  const relX1 = Math.max(L.relX1 ?? 0, setengahLabelRel)
  const relX2 = Math.min(L.relX2 ?? 0, L.w - setengahLabelRel)

  const barisPanel: BarisPanel[] = L.sempit
    ? [
        { teks: `x = ${fmt(x, 2)}`, warna: 'var(--m-a)' },
        { teks: `Δy/h = ${fmt(m, 4)}`, warna: 'var(--m-b)', besar: true },
        { teks: `2x = ${fmt(turunan, 2)}`, warna: 'var(--m-hi)', besar: true },
        { teks: `beda = ${fmt(m - turunan, 4)}` },
      ]
    : [
        { teks: `x = ${fmt(x, 2)}`, warna: 'var(--m-a)' },
        { teks: `h = ${fmt(h, 2)}`, warna: 'var(--m-b)' },
        { teks: `Δy/h = ${fmt(m, 4)}`, warna: 'var(--m-b)', besar: true },
        { teks: `2x = ${fmt(turunan, 2)}`, warna: 'var(--m-hi)', besar: true },
        { teks: `beda = ${fmt(m - turunan, 4)}` },
      ]

  return (
    <>
      <Sumbu L={L} f={kuadrat} warna="var(--m-a)" hindari={hindari} />

      {/* garis singgung sejati sebagai pembanding */}
      <Potong
        tp={singgung}
        sz={sz}
        warna="var(--m-hi)"
        tampilSegitiga={0}
        nyala={sorot === 'turunan'}
        titikKedua={false}
      />
      <Potong
        tp={potong}
        sz={sz}
        warna="var(--m-b)"
        tampilSegitiga={1}
        nyala={sorot === 'h'}
        nyalaH={sorot === 'h'}
        nyalaDy={sorot === 'dy'}
        titikKedua={!pegangTitik2}
      />

      <Panel L={L} baris={barisPanel} tampil={1} />

      <Tag x={angkaX.x} y={angkaX.y} anchor={angkaX.anchor} warna="var(--m-a)" size={sz} layar>
        {teksX}
      </Tag>

      {/* Titik kedua juga meluncur di kurva: menyeretnya mendekat adalah
          gerakan inti konsep ini. Pembungkusnya mencatat bahwa titik INI yang
          dipegang, supaya memegang rel tidak ikut menghidupkannya. */}
      <g
        onPointerDownCapture={() => setTitik2Dipegang(true)}
        onFocusCapture={() => setTitik2Dipegang(true)}
      >
        <Pegangan
          x={potong.sx2}
          y={potong.sy2}
          param="h"
          arah="x"
          sembunyi={!pegangTitik2}
          keNilai={(pt) => xDari(L, pt.x) - x}
        />
      </g>

      {/* Titik singgung meluncur di kurva. Digambar paling akhir supaya ia
          yang menang bila kedua titik saling menindih. */}
      <Pegangan x={sx1} y={sy1} param="x" arah="x" utama keNilai={(pt) => xDari(L, pt.x)} />

      {/* Rel h: satu-satunya cara memegang h saat kedua titik sudah berimpit.
          Warnanya sama dengan kaki mendatar segitiga di atasnya. */}
      <RelGeser
        x1={relX1}
        x2={relX2}
        y={L.relY ?? 0}
        param="h"
        label={`h = ${fmt(h, 2)}`}
        kiri="0,01"
        kanan="1"
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
      label="Kurva y sama dengan x kuadrat dengan garis potong yang bisa diatur"
    >
      <IsiEksperimen L={L} {...props} />
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'turunan-kemiringan',
  topicId: 'sma11-definisi-turunan-sebagai-limit',
  judul: 'Turunan',
  pertanyaan: 'Kenapa turunan disebut kemiringan?',
  tagline: 'Dekatkan dua titik pada kurva sampai hampir berimpit. Lihat apa yang tersisa.',
  kelas: 11,
  domain: 'kalkulus',
  tags: ['turunan', 'limit', 'kemiringan', 'garis singgung'],

  tebak: {
    pertanyaan:
      'Pada kurva y = x², kamu ambil titik di x = 1,5 dan titik kedua yang makin didekatkan. Kemiringan garis penghubungnya akan menuju...',
    pilihan: [
      {
        id: 'a',
        label: 'Nol, karena kedua titik hampir berimpit',
        balasan:
          'Memang Δy dan h sama-sama menyusut ke nol. Tapi yang dihitung adalah PERBANDINGAN keduanya, dan perbandingan itu justru menuju angka tertentu.',
      },
      {
        id: 'b',
        label: 'Angka 3',
        benar: true,
        balasan:
          'Betul: 2 × 1,5 = 3. Sebentar lagi kamu bisa melihat dari mana rumus 2x itu muncul.',
      },
      {
        id: 'c',
        label: 'Tak terhingga',
        balasan:
          'Kalau pembilangnya tetap (dan bukan nol) sedangkan penyebutnya menuju nol, hasilnya memang meledak. Tetapi di sini pembilangnya ikut menyusut.',
      },
    ],
    penutup:
      'Nol dibagi nol memang tidak punya arti. Yang punya arti adalah ke mana perbandingannya menuju.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      {
        key: 'x',
        label: 'Titik x',
        // Batas atas 2,1: lihat nilaiBongkar — titik kedua kurva dan titik
        // pembanding garis lurus harus sama-sama muat di jendela grafik.
        min: 0.3,
        max: 2.1,
        step: 0.1,
        awal: 1.5,
        simbol: 'x',
        peran: 'a',
        bagian: 'dua-x',
      },
    ],
    roles: { h: 'b', dy: 'ab', turunan: 'hi', 'dua-x': 'hi' },
    arti: {
      h: 'Jarak mendatar antara kedua titik. Inilah yang kita kecilkan sampai mendekati nol.',
      dy: 'Selisih tinggi antara kedua titik.',
      turunan: 'Kemiringan garis singgung — nilai yang didekati perbandingan itu.',
      'dua-x': 'Hasil akhirnya: kemiringan kurva y = x² di titik x adalah 2x.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Kemiringan garis lurus itu mudah',
        narasi:
          'Seret titik ungu ke mana saja di garis ini: segitiga naik-dan-maju ikut berpindah, tetapi Δy dibagi Δx tetap 2. Untuk garis lurus, kemiringannya memang sama di mana pun.',
        rumus: 'kemiringan = Δy / Δx',
        durasi: 2200,
      },
      {
        id: 's1',
        judul: 'Pada kurva, kemiringan berubah-ubah',
        narasi:
          'Di bagian kiri kurva ini landai, di bagian kanan curam. Seret titik ungu menyusuri kurvanya: pertanyaan "berapa kemiringannya" baru lengkap kalau disebut di titik yang mana.',
        durasi: 2200,
      },
      {
        id: 's2',
        judul: 'Ambil dua titik dulu',
        narasi: (p) => {
          const { x, hAwal } = nilaiBongkar(p)
          return `Kamu belum bisa menghitung kemiringan hanya dari satu titik. Jadi ambil titik kedua sejauh h = ${fmt(hAwal, 2)} di sebelah kanan titik x = ${fmt(x, 2)}, lalu hitung naik dibagi maju seperti biasa.`
        },
        rumus: 'kemiringan potong = [dy:Δy] / [h:h]',
        durasi: 2600,
      },
      {
        id: 's3',
        judul: 'Dekatkan titik keduanya',
        narasi:
          'Titik kedua ditarik mendekat, dan garis potongnya berputar mengelilingi titik pertama sampai keduanya nyaris berimpit — kemiringannya makin dekat ke satu angka. Garis melalui titik pertama yang kemiringannya tepat sebesar angka itu disebut garis singgung — bukan sekadar garis yang "menyentuh kurva di satu titik".',
        durasi: 3000,
      },
      {
        id: 's4',
        judul: 'Sekarang hitung dengan aljabar',
        narasi: (p) => {
          const { x, turunan } = nilaiBongkar(p)
          return `Untuk f(x) = x², selisih (x+h)² − x² = 2xh + h², dan setelah dibagi h tersisa 2x + h. Di titik x = ${fmt(x, 2)}, hasil bagi itu menjadi ${fmt(turunan, 2)} + h — angka h masih ada di situ, tetapi ia sedang menuju nol.`
        },
        rumus: '((x+h)^2 − x^2) ÷ [h:h] = 2x + [h:h]',
        durasi: 3000,
      },
      {
        id: 's5',
        judul: 'Yang tersisa saat h lenyap',
        narasi: (p) => {
          const { x, turunan } = nilaiBongkar(p)
          return `Ketika h mendekati nol, suku h pada 2x + h ikut lenyap dan yang tersisa hanya 2x. Di titik x = ${fmt(x, 2)}, kemiringan kurvanya ${fmt(turunan, 2)} — itulah angka yang didekati kemiringan garis di layar.`
        },
        rumus: "f'(x) = [dua-x:2x]",
        durasi: 2600,
      },
      {
        id: 's6',
        judul: 'Itulah definisi turunan',
        narasi:
          'Turunan bukan aturan baru, melainkan angka yang didekati kemiringan biasa antara dua titik ketika jarak keduanya menuju nol.',
        rumus: "[turunan:f'(x)] = lim(h→0) ([dy:f(x+h) − f(x)]) ÷ [h:h]",
        durasi: 2600,
      },
    ],
  },

  eksperimen: {
    judul: 'Kecilkan h sendiri',
    ajakan:
      'Seret titik ungu menyusuri kurva, lalu dorong titik kedua mendekat sampai berimpit. Garis merah muda adalah garis singgung sejati.',
    params: [
      // Batas x dan h dipilih bersama (lihat nilaiEksperimen): titik kedua
      // harus tetap muat di jendela grafik, jadi x + h tidak boleh melewati
      // √10,4 ≈ 3,22.
      { key: 'x', label: 'Titik x', min: 0.2, max: 2.2, step: 0.05, awal: 1.5, simbol: 'x', peran: 'a', bagian: 'turunan' },
      // h mulai dari nilai terbesarnya, bukan 0,8: ajakan menyuruh anak
      // MENDORONG titik kedua, dan titik itu baru bisa dipegang bila kedua
      // area sentuh (±26 px layar) belum bertindihan. Di panggung 288 px
      // (layar 320 px) batas itu jatuh di h = 0,80 — persis di nilai awal
      // yang lama, dengan sisa 0,3 px. Pada h = 1 titik keduanya bisa
      // dipegang di semua ukuran panggung yang masuk akal, lalu satu seretan
      // membawanya sampai berimpit.
      { key: 'h', label: 'Jarak h', min: 0.01, max: 1, step: 0.01, awal: 1, simbol: 'h', peran: 'b', bagian: 'h' },
    ],
    Visual: VisualEksperimen,
    rumus: (p) => {
      const { x, h, m } = nilaiEksperimen(p)
      return `[dy:Δy] ÷ [h:h] = [turunan:2x] + [h:h] = ${fmt(2 * x, 2)} + ${fmt(h, 2)} = ${fmt(m, 4)}`
    },
    temuan: (p) => {
      const { x, h, m } = nilaiEksperimen(p)
      return (
        <p>
          Dengan h = {fmt(h, 2)}, kemiringan garis potongnya <strong>{fmt(m, 4)}</strong>, sedangkan
          kemiringan garis singgungnya {fmt(2 * x, 3)}. Selisihnya {fmt(m - 2 * x, 4)} —{' '}
          <strong>persis sama dengan h</strong>. Itu bukan kebetulan: hasil bagi selisihnya memang
          tepat 2x + h. Dorong titik kedua sampai hampir berimpit dengan titik ungu: selisihnya ikut
          menjadi 0,01. Perhatikan juga bahwa h tidak boleh benar-benar nol, karena membagi dengan
          nol tidak terdefinisi.
        </p>
      )
    },
  },

  penjelasan: {
    SMA: (
      <>
        <p>
          Kemiringan mengukur <strong>seberapa cepat sesuatu berubah</strong>. Untuk garis lurus,
          jawabannya satu angka. Untuk kurva, jawabannya bisa berbeda dari titik ke titik — dan turunan
          adalah cara menyebut angka tersebut di satu titik tertentu.
        </p>
        <p>
          Masalahnya, kemiringan memerlukan <em>dua</em> titik. Jalan keluarnya: pakai titik kedua
          yang berjarak h, lalu perhatikan ke mana hasilnya menuju ketika h mengecil.
        </p>
        <p style={{ textAlign: 'center' }}>
          f′(x) = lim<sub>h→0</sub> [f(x + h) − f(x)] / h
        </p>
        <h4>Perhitungan untuk f(x) = x²</h4>
        <p style={{ textAlign: 'center' }}>
          [(x + h)² − x²] / h = [x² + 2xh + h² − x²] / h = [2xh + h²] / h = 2x + h
        </p>
        <p>
          Selama h ≠ 0, pembagian itu sah. Setelah disederhanakan, barulah h boleh menuju nol dan
          tersisa <strong>f′(x) = 2x</strong>. Perhatikan urutannya: sederhanakan dulu, ambil limit
          belakangan. Kalau langsung memasukkan h = 0 sejak awal, yang muncul adalah 0/0 yang tidak
          bermakna.
        </p>
        <h4>Kenapa 0/0 bukan berarti nol</h4>
        <p>
          Pembilang dan penyebut memang sama-sama menuju nol, tetapi yang menentukan adalah
          perbandingan <em>kecepatan</em> menyusutnya, dan perbandingan itulah yang punya nilai. Bentuk 0/0 disebut bentuk taktentu
          justru karena hasilnya bisa apa saja, bergantung fungsinya.
        </p>
        <h4>Membaca turunan</h4>
        <ul>
          <li>f′(x) &gt; 0 berarti fungsi sedang naik di titik itu;</li>
          <li>f′(x) &lt; 0 berarti sedang turun;</li>
          <li>f′(x) = 0 berarti mendatar — kandidat titik puncak atau lembah.</li>
        </ul>
        <p>
          Untuk y = x², f′(x) = 2x bernilai nol hanya di x = 0, dan memang di situlah titik terendah
          parabola berada.
        </p>
        <h4>Kenapa sumbunya tidak sama skala</h4>
        <p>
          Pada gambar di atas, satu satuan mendatar dan satu satuan tegak sengaja digambar berbeda
          panjang supaya seluruh kurva muat. Karena itu kemiringan harus dibaca dari angkanya,
          bukan dari kemiringan garis yang terlihat mata.
        </p>
      </>
    ),
    SMP: (
      <>
        <p>
          Kemiringan menjawab pertanyaan: "kalau maju sedikit ke kanan, naik berapa?" Pada tanjakan
          lurus, jawabannya selalu sama.
        </p>
        <p>
          Pada jalan yang melengkung, jawabannya berbeda-beda: awalnya landai, makin ke atas makin
          curam. Untuk mengetahui kecuramannya <strong>tepat di satu titik</strong>, kita ambil
          titik lain yang sangat-sangat dekat, lalu hitung kemiringannya seperti biasa.
        </p>
        <p>
          Makin dekat titik keduanya, makin tepat angkanya menggambarkan kecuraman di titik itu.
          Angka yang didekati itulah yang disebut turunan.
        </p>
      </>
    ),
  },

  rumus: {
    src: "[turunan:f'(x)] = lim(h→0) [dy:(f(x+h) − f(x))] ÷ [h:h]",
    roles: { turunan: 'hi', dy: 'ab', h: 'b' },
    arti: {
      turunan: 'Turunan — kemiringan kurva tepat di titik x.',
      dy: 'Selisih tinggi antara dua titik yang berdekatan.',
      h: 'Jarak mendatar antara kedua titik. Ia harus bukan nol saat membagi, lalu didekatkan ke nol.',
    },
  },

  soal: [
    (rnd) => {
      const x = 1 + Math.floor(rnd() * 6)
      return {
        id: 'tur-1',
        tipe: 'angka',
        topicId: 'sma11-definisi-turunan-sebagai-limit',
        kelas: 11,
        tingkat: 'mudah',
        konsep: 'turunan-kemiringan',
        pertanyaan: `Diketahui f(x) = x². Berapa kemiringan garis singgung kurva di titik x = ${x}?`,
        jawaban: 2 * x,
        toleransi: 1e-9,
        hint: [
          'Turunan dari x² sudah kita peroleh dari perhitungan tadi.',
          "f'(x) = 2x.",
          `Masukkan x = ${x}.`,
        ],
        pembahasan: `f'(x) = 2x, jadi f'(${x}) = ${2 * x}. Artinya tepat di titik itu kurva naik dengan laju ${2 * x} satuan per satuan mendatar: kalau maju sejauh h yang kecil, kenaikannya kira-kira ${2 * x} × h. (Untuk langkah selebar satu satuan penuh kenaikannya bukan ${2 * x}, melainkan ${2 * x + 1}, karena kemiringan garis potongnya 2x + h.)`,
      }
    },
    {
      id: 'tur-2',
      tipe: 'pilihan',
      topicId: 'sma11-definisi-turunan-sebagai-limit',
      kelas: 11,
      tingkat: 'sedang',
      konsep: 'turunan-kemiringan',
      pertanyaan:
        'Pada perhitungan [(x+h)² − x²] / h, kenapa kita boleh membagi dengan h?',
      pilihan: [
        { id: 'a', label: 'Karena h belum nol, ia hanya sedang menuju nol', benar: true },
        {
          id: 'b',
          label: 'Karena membagi dengan nol menghasilkan nol',
          diagnosa: 'Membagi dengan nol tidak menghasilkan nol — operasi itu tidak terdefinisi sama sekali.',
        },
        {
          id: 'c',
          label: 'Karena h sangat kecil sehingga bisa diabaikan',
          diagnosa:
            'Kalau h boleh diabaikan sejak awal, pembilangnya juga menjadi nol dan kita terjebak pada 0/0. Justru h harus dipertahankan sampai penyederhanaan selesai.',
        },
      ],
      hint: [
        'Perhatikan bedanya "bernilai nol" dan "menuju nol".',
        'Limit berbicara tentang ke mana sesuatu menuju, bukan tentang nilainya di titik itu.',
        'Selama h ≠ 0, pembagian adalah operasi yang sah.',
      ],
      pembahasan:
        'Dalam limit, h tidak pernah benar-benar bernilai nol — ia hanya didekatkan. Karena itu pembagian sah dilakukan, dan barulah setelah bentuknya disederhanakan menjadi 2x + h kita mengambil limitnya.',
    },
    {
      id: 'tur-3',
      tipe: 'benar-salah',
      topicId: 'sma11-definisi-turunan-sebagai-limit',
      kelas: 11,
      tingkat: 'sedang',
      konsep: 'turunan-kemiringan',
      pertanyaan:
        'Karena Δy dan h sama-sama menuju nol, hasil bagi Δy/h juga pasti menuju nol.',
      jawaban: false,
      diagnosa:
        'Yang menentukan bukan bahwa keduanya menuju nol, melainkan seberapa cepat masing-masing menyusut. Pada kurva ini perbandingannya justru menuju 2x.',
      hint: [
        'Pada eksperimen, dorong titik kedua sampai hampir berimpit, lalu lihat angka Δy/h.',
        'Apakah angka itu mendekati nol, atau mendekati sesuatu yang lain?',
        'Bentuk 0/0 disebut taktentu justru karena hasilnya bisa bermacam-macam.',
      ],
      pembahasan:
        'Salah. Untuk f(x) = x², Δy/h = 2x + h yang menuju 2x — misalnya 3 di x = 1,5 — dan hasilnya nol hanya bila kebetulan x = 0. Bentuk 0/0 tidak menentukan hasil apa pun dengan sendirinya.',
    },
    (rnd) => {
      const x = 1 + Math.floor(rnd() * 4)
      const h = [0.1, 0.01, 0.5][Math.floor(rnd() * 3)]
      const m = ((x + h) ** 2 - x ** 2) / h
      return {
        id: 'tur-4',
        tipe: 'angka',
        topicId: 'sma11-definisi-turunan-sebagai-limit',
        kelas: 11,
        tingkat: 'sulit',
        konsep: 'turunan-kemiringan',
        pertanyaan: `Untuk f(x) = x², hitung kemiringan garis potong antara x = ${x} dan x = ${fmt(x + h, 2)}.`,
        jawaban: Math.round(m * 10000) / 10000,
        toleransi: 0.002,
        hint: [
          'Hitung selisih nilai fungsinya lebih dulu.',
          `f(${fmt(x + h, 2)}) − f(${x}) = ${fmt((x + h) ** 2, 4)} − ${fmt(x * x)} = ${fmt((x + h) ** 2 - x * x, 4)}.`,
          `Bagi dengan h = ${fmt(h, 2)}. Hasilnya tepat 2x + h, jadi lebih besar ${fmt(h, 2)} daripada 2x = ${2 * x} — jangan dibulatkan ke ${2 * x}.`,
        ],
        pembahasan: `Kemiringannya ${fmt(m, 4)}. Perhatikan hasilnya persis 2x + h = ${2 * x} + ${fmt(h, 2)} — makin kecil h, makin dekat ke ${2 * x}.`,
      }
    },
    {
      id: 'tur-5',
      tipe: 'urutkan',
      topicId: 'sma11-definisi-turunan-sebagai-limit',
      kelas: 11,
      tingkat: 'sulit',
      konsep: 'turunan-kemiringan',
      pertanyaan: 'Susun langkah menurunkan f(x) = x² dari definisi.',
      langkah: [
        'Tulis hasil bagi selisih: [f(x+h) − f(x)] / h',
        'Jabarkan (x+h)² menjadi x² + 2xh + h²',
        'Kurangkan x², tersisa 2xh + h²',
        'Bagi dengan h, tersisa 2x + h',
        'Ambil limit h → 0 sehingga diperoleh 2x',
      ],
      hint: [
        'Penjabaran dilakukan sebelum penyederhanaan.',
        'Limit selalu diambil paling akhir, setelah bentuknya tidak lagi memuat pembagian oleh h.',
      ],
      pembahasan:
        'Urutan ini penting. Mengambil limit sebelum menyederhanakan hanya akan menghasilkan bentuk 0/0 yang tidak memberi informasi.',
    },
  ],

  lanjut: ['parabola', 'integral-luas', 'sin-cos-lingkaran'],
}

export default konsep
