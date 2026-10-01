/* ============================================================
   KONSEP — Kenapa 1+2+3+…+100 bisa dihitung dalam sekejap?
   Kelas 10 · Aljabar

   Gagasan pembuktian: susun 1+2+…+n sebagai tangga balok.
   Gandakan tangga itu, putar salinannya setengah putaran, lalu
   satukan. Keduanya PASTI membentuk persegi panjang n × (n+1)
   tanpa celah. Jadi dua kali jumlahnya sama dengan n(n+1),
   dan jumlahnya sendiri n(n+1)/2.

   Interaksi langsung: anak memegang PUNCAK TANGGA sendiri.
   - Balok satuan berukuran tetap, jadi menarik puncaknya benar-benar
     memanjangkan tangganya (bukan mengecilkan baloknya). Tangga berdiri
     di garis lantai dan selalu terpusat mendatar.
   - Puncak kolom tertinggi berada di (w/2 + n·u/2, lantai − n·u):
     naik satu balok penuh sekaligus melebar setengah balok untuk tiap n.
     `keNilai` adalah proyeksi jari ke garis gerak itu — kebalikan persis
     dari rumus posisinya (lihat catatan di atas keNilai).
   - Di bongkar pegangannya disembunyikan saat tangganya belum selesai
     dibangun dan saat salinannya sedang berputar.
   ============================================================ */

import { Pegangan, useInteraksi } from '../components/Interaksi'
import { Svg, Tag, Dimensi, useSempit } from '../components/Stage'
import { fase, seg, easing } from '../lib/anim'
import { clamp, fmt } from '../lib/num'
import type { DeriveState, Konsep, ParamSpec } from '../lib/types'

/* ---------------- Penggeser ---------------- */

const PARAM_BONGKAR: ParamSpec[] = [
  {
    key: 'n',
    label: 'Sampai bilangan',
    min: 2,
    max: 12,
    step: 1,
    awal: 6,
    bulat: true,
    simbol: 'n',
    peran: 'a',
    bagian: 'n',
  },
]

const PARAM_EKSPERIMEN: ParamSpec[] = [
  {
    key: 'n',
    label: 'Sampai bilangan',
    min: 2,
    max: 14,
    step: 1,
    awal: 8,
    bulat: true,
    simbol: 'n',
    peran: 'a',
    bagian: 'n',
  },
]

/* ---------------- Tata letak ---------------- */

interface Tata {
  w: number
  h: number
  /** sisi satu balok; TETAP berapa pun n, supaya tangganya benar-benar tumbuh. */
  u: number
  /** garis lantai — dasar persegi panjang. */
  lantai: number
  judulY: number
  judulSize: number
  /** jarak garis ukur mendatar di bawah lantai. */
  dimBawah: number
  /** jarak garis ukur tegak dari sisi kiri persegi panjang. */
  dimKiri: number
  /** label tinggi ditaruh di atas garis ukurnya (tepi kiri HP terlalu sempit). */
  kiriDiAtas: boolean
  /** pakai keterangan versi pendek (layar HP). */
  ringkas: boolean
}

/* Ukuran balok dipilih dari nilai n TERBESAR: pada nilai itu persegi panjangnya
   masih muat utuh, label pegangan masih di dalam bingkai, dan keterangan di atas
   tidak bertabrakan dengan label pegangan. Di HP baloknya justru lebih besar
   (27 dan 23) daripada di tata letak lebar (25 dan 21). */
const BONGKAR_LEBAR: Tata = {
  w: 620, h: 470, u: 25, lantai: 416,
  judulY: 34, judulSize: 17, dimBawah: 28, dimKiri: 22, kiriDiAtas: false, ringkas: false,
}
/* Di HP garis ukur mendatar diberi jarak lebih jauh (38, bukan 28): pada layar
   360 px ke bawah huruf label diperbesar mesin sampai 11 px, dan pada n kecil
   ajakan "Tarik" di bawah pegangan turun sampai ke daerah itu — dengan 28 label
   n tertutup sebagian. Ticks-nya tetap sejajar tepi persegi panjang, jadi
   kaitannya tidak hilang. */
const BONGKAR_HP: Tata = {
  w: 420, h: 520, u: 27, lantai: 452,
  judulY: 28, judulSize: 16, dimBawah: 38, dimKiri: 22, kiriDiAtas: true, ringkas: true,
}
const EKS_LEBAR: Tata = {
  w: 620, h: 470, u: 21, lantai: 416,
  judulY: 28, judulSize: 19, dimBawah: 28, dimKiri: 22, kiriDiAtas: false, ringkas: false,
}
const EKS_HP: Tata = {
  w: 420, h: 520, u: 23, lantai: 456,
  judulY: 28, judulSize: 16, dimBawah: 38, dimKiri: 22, kiriDiAtas: true, ringkas: true,
}

/** Letak persegi panjang n × (n+1) dan puncak tangganya. */
function geo(n: number, L: Tata) {
  const lebar = n * L.u
  const tinggi = (n + 1) * L.u
  const X0 = L.w / 2 - lebar / 2
  const Y0 = L.lantai - tinggi
  return {
    lebar,
    tinggi,
    X0,
    Y0,
    /** pusat putaran = pusat persegi panjang. */
    cx: L.w / 2,
    cy: Y0 + tinggi / 2,
    /** puncak tangga: sudut kanan atas kolom tertinggi (n balok). */
    px: X0 + lebar,
    py: L.lantai - lebar,
  }
}

/**
 * Kebalikan dari letak puncak tangga.
 * Puncaknya bergerak menurut P(n) = (w/2 + n·u/2, lantai − n·u), jadi
 * arah geraknya v = (u/2, −u) dan |v|² = 1,25·u². Proyeksi jari ke garis itu:
 *   n = ((x − w/2)·(u/2) + (lantai − y)·u) / (1,25·u²)
 * Disederhanakan menjadi bentuk di bawah. Pada pt = P(n) hasilnya tepat n.
 */
const nDariPuncak = (pt: { x: number; y: number }, L: Tata) =>
  (0.5 * (pt.x - L.w / 2) + (L.lantai - pt.y)) / (1.25 * L.u)

/** Teks deret 1 + 2 + … + k. Semua suku ditulis bila k ≤ penuh + 1 (supaya "…" selalu mewakili
 *  paling sedikit dua suku); selain itu suku terakhir tetap tampak. */
function deretTeks(k: number, penuh: number): string {
  if (k <= penuh + 1) return Array.from({ length: k }, (_, i) => fmt(i + 1)).join(' + ')
  return `1 + 2 + 3 + … + ${fmt(k)}`
}

/** Daftar bilangan 1, 2, …, k untuk kalimat ("1 dan 2", "1, 2, dan 3", "1, 2, 3, …, 8").
 *  Aturan "…"-nya sama dengan deretTeks. */
function daftarTeks(k: number, penuh: number): string {
  if (k > penuh + 1) return `1, 2, 3, …, ${fmt(k)}`
  const suku = Array.from({ length: k }, (_, i) => fmt(i + 1))
  if (k === 2) return `${suku[0]} dan ${suku[1]}`
  return `${suku.slice(0, -1).join(', ')}, dan ${suku[k - 1]}`
}

/** Deret 1 + 2 + … + n untuk markup rumus: suku terakhir tetap token [n:n] yang bisa disorot.
 *  "…" hanya dipakai bila mewakili paling sedikit dua suku. */
function deretRumus(n: number): string {
  const sebelum = n - 1
  const awal =
    sebelum >= 5 ? '1 + 2 + 3 + …' : Array.from({ length: sebelum }, (_, i) => fmt(i + 1)).join(' + ')
  return `${awal} + [n:n]`
}

/** Isi tiap kolom dari kiri: balok tangga asli + balok salinan ("1 + 6, 2 + 5, dan seterusnya
 *  sampai 6 + 1"). Semua kolom ditulis bila n ≤ 5, supaya "seterusnya" mewakili paling sedikit dua kolom. */
function pasanganKolom(n: number): string {
  const kolom = Array.from({ length: n }, (_, j) => `${fmt(j + 1)} + ${fmt(n - j)}`)
  if (n >= 6) return `${kolom[0]}, ${kolom[1]}, dan seterusnya sampai ${kolom[n - 1]}`
  if (n === 2) return `${kolom[0]} dan ${kolom[1]}`
  return `${kolom.slice(0, -1).join(', ')}, dan ${kolom[n - 1]}`
}

/** Banyaknya kotak pada persegi panjang n × (n+1) — dua tangga. */
const luasKotak = (n: number) => n * (n + 1)

/** Jumlah 1 + 2 + … + n — separuh persegi panjangnya. */
const jumlahSampai = (n: number) => luasKotak(n) / 2

/** Nilai n pada animasi bongkar — dipakai bersama oleh gambar dan teks langkah. */
function nBongkar(p: Record<string, number>): number {
  return clamp(Math.round(Number.isFinite(p.n) ? p.n : 6), 2, 12)
}

/** Tangga 1, 2, 3, …, n yang berdiri di garis lantai. */
function Tangga({
  n,
  X0,
  lantai,
  u,
  warna,
  opacity = 1,
  sampai = n,
  terang = false,
}: {
  n: number
  X0: number
  lantai: number
  u: number
  warna: string
  opacity?: number
  /** hanya gambar kolom sampai indeks ini (untuk animasi bertahap). */
  sampai?: number
  /** nyalakan seluruh balok (mis. saat bagian S pada rumus disorot). */
  terang?: boolean
}) {
  const kotak = []
  for (let j = 0; j < n; j++) {
    const o = clamp(sampai - j, 0, 1)
    if (o <= 0.01) continue
    for (let i = 0; i <= j; i++) {
      kotak.push(
        <rect
          key={`${j}-${i}`}
          x={X0 + j * u}
          y={lantai - (i + 1) * u}
          width={u - 1.4}
          height={u - 1.4}
          rx={2}
          fill={warna}
          fillOpacity={(terang ? 0.68 : 0.42) * o}
          stroke={warna}
          strokeWidth={1}
          strokeOpacity={o}
        />,
      )
    }
  }
  return <g opacity={opacity}>{kotak}</g>
}

/**
 * Garis lantai tempat kedua tangga berdiri. Selama salinannya berputar,
 * kedua tangga dikecilkan bersama-sama; garis lantainya ikut naik sebanyak
 * itu (`y`), supaya tangga ungu tidak pernah tampak melayang di atas lantai
 * yang seharusnya menjadi pijakannya.
 */
function Lantai({ L, y = L.lantai }: { L: Tata; y?: number }) {
  return (
    <line
      x1={16}
      y1={y}
      x2={L.w - 16}
      y2={y}
      stroke="var(--m-axis)"
      strokeWidth={1.4}
      opacity={0.35}
    />
  )
}

/**
 * Selama berputar, kotak pembatas tangga (persegi n·u) menyapu daerah yang
 * lebih lebar daripada bingkainya. Seluruh gambar dikecilkan seperlunya di
 * sekitar pusat putaran — kedua tangga tetap sebangun, dan skalanya kembali
 * tepat 1 pada 0° maupun 180°.
 */
function skalaPutaran(putar: number, n: number, L: Tata, cy: number) {
  const rad = (putar * Math.PI) / 180
  const c = Math.abs(Math.cos(rad))
  const s = Math.abs(Math.sin(rad))
  const s0 = (n * L.u) / 2 // setengah sisi kotak pembatas tangga
  const d = L.u / 2 // simpangan pusat kotak itu dari pusat putaran
  const bentangX = s0 * (c + s) + d * s
  const bentangY = s0 * (c + s) + d * c
  // Pusat putaran selalu di w/2 mendatar, jadi ruang kiri = ruang kanan = w/2.
  const ruangX = Math.max(1, L.w / 2 - 8)
  const ruangY = Math.max(1, Math.min(cy, L.h - cy) - 8)
  return Math.min(1, ruangX / Math.max(bentangX, 1), ruangY / Math.max(bentangY, 1))
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const n = nBongkar(p)
  const sempit = useSempit()
  const L = sempit ? BONGKAR_HP : BONGKAR_LEBAR
  const g = geo(n, L)
  const aktif = useInteraksi()?.kendali.aktif ?? null
  const jumlah = jumlahSampai(n)

  const bangun = step === 0 ? n * seg(t, 0.05, 0.95) : n
  const salinan = fase(step, t, 2)
  const putar = step >= 3 ? (step === 3 ? 180 * easing.inOutCubic(seg(t, 0.08, 0.95)) : 180) : 0
  const kotakPenuh = fase(step, t, 4)

  const nyalaN = sorot === 'n' || aktif === 'n'
  const nyalaN1 = sorot === 'n1'
  const nyalaJumlah = sorot === 'S'

  const terhitung = Math.min(n, Math.floor(bangun))
  const totalSampai = jumlahSampai(terhitung)

  const skala = skalaPutaran(putar, n, L, g.cy)
  const berputar = putar > 2 && putar < 178
  const belumUtuh = step === 0 && bangun < n - 0.02

  const ket =
    step === 0
      ? {
          teks:
            terhitung > 0
              ? `${deretTeks(terhitung, L.ringkas ? 4 : 6)} = ${fmt(totalSampai)}`
              : 'jumlahkan satu per satu',
          warna: 'var(--m-a)',
          size: L.judulSize + 1,
        }
      : step === 1
        ? {
            teks: L.ringkas
              ? 'n = 100 butuh 99 penjumlahan'
              : 'untuk n = 100, cara ini butuh 99 kali penjumlahan',
            warna: 'var(--ink-2)',
            size: L.judulSize,
          }
        : step === 2
          ? { teks: 'gandakan tangganya', warna: 'var(--m-b)', size: L.judulSize }
          : step === 3
            ? { teks: 'putar salinannya setengah putaran', warna: 'var(--m-hi)', size: L.judulSize }
            : step === 4
              ? {
                  teks: L.ringkas
                    ? `${fmt(n)} × ${fmt(n + 1)} = ${fmt(luasKotak(n))} balok`
                    : `pas menjadi persegi panjang ${fmt(n)} × ${fmt(n + 1)} = ${fmt(luasKotak(n))} balok`,
                  warna: 'var(--m-hi)',
                  size: L.judulSize,
                }
              : {
                  teks: `satu tangga = ${fmt(luasKotak(n))} ÷ 2 = ${fmt(jumlah)}`,
                  warna: nyalaJumlah ? 'var(--m-hi)' : 'var(--m-ab)',
                  size: L.judulSize + 2,
                }

  const warnaN = nyalaN ? 'var(--m-hi)' : 'var(--m-a)'
  const warnaN1 = nyalaN1 ? 'var(--m-hi)' : 'var(--m-b)'
  const xKiri = g.X0 - L.dimKiri

  return (
    <Svg
      w={L.w}
      h={L.h}
      maxH={L.h}
      label="Tangga balok yang digandakan dan diputar menjadi persegi panjang"
    >
      {/* Lantai ikut dikecilkan bersama kedua tangga, jadi tangga ungu tetap
          berpijak padanya selama salinannya berputar. */}
      <Lantai L={L} y={g.cy + (L.lantai - g.cy) * skala} />

      {/* bingkai persegi panjang tujuan */}
      {kotakPenuh > 0 && (
        <rect
          x={g.X0}
          y={g.Y0}
          width={g.lebar}
          height={g.tinggi}
          rx={4}
          fill="none"
          stroke="var(--m-hi)"
          strokeWidth={2.5}
          opacity={kotakPenuh}
        />
      )}

      {/* Kedua tangga dikecilkan bersama-sama selama berputar, jadi keduanya
          tetap sebangun dan tidak ada yang keluar bingkai. */}
      <g
        transform={`translate(${g.cx.toFixed(2)} ${g.cy.toFixed(2)}) scale(${skala.toFixed(4)}) translate(${(-g.cx).toFixed(2)} ${(-g.cy).toFixed(2)})`}
      >
        <Tangga
          n={n}
          X0={g.X0}
          lantai={L.lantai}
          u={L.u}
          warna="var(--m-a)"
          sampai={bangun}
          terang={nyalaJumlah}
        />
        {salinan > 0.02 && (
          <g
            opacity={salinan}
            transform={`rotate(${putar.toFixed(2)} ${g.cx.toFixed(2)} ${g.cy.toFixed(2)})`}
          >
            <Tangga n={n} X0={g.X0} lantai={L.lantai} u={L.u} warna="var(--m-b)" />
          </g>
        )}
      </g>

      {/* ukuran persegi panjang — angka n disembunyikan selama puncaknya
          dipegang, karena pegangan sudah menampilkannya di dekat jari */}
      {kotakPenuh > 0.4 && (
        <>
          <Dimensi
            x1={g.X0}
            y1={L.lantai + L.dimBawah}
            x2={g.X0 + g.lebar}
            y2={L.lantai + L.dimBawah}
            label={aktif === 'n' ? undefined : fmt(n)}
            warna={warnaN}
          />
          {L.kiriDiAtas ? (
            <>
              <Dimensi x1={xKiri} y1={g.Y0} x2={xKiri} y2={L.lantai} warna={warnaN1} />
              <Tag x={xKiri} y={g.Y0 - 18} anchor="start" size={14} warna={warnaN1}>
                {fmt(n + 1)}
              </Tag>
            </>
          ) : (
            <Dimensi
              x1={xKiri}
              y1={g.Y0}
              x2={xKiri}
              y2={L.lantai}
              label={fmt(n + 1)}
              warna={warnaN1}
            />
          )}
        </>
      )}

      <Tag x={L.w / 2} y={L.judulY} warna={ket.warna} size={ket.size}>
        {ket.teks}
      </Tag>

      {/* Puncak tangga: naik satu balok dan melebar setengah balok untuk tiap n. */}
      <Pegangan
        x={g.px}
        y={g.py}
        param="n"
        arah="bebas"
        utama
        sembunyi={berputar || belumUtuh}
        label={`n = ${fmt(n)}`}
        ajakan="Tarik"
        keNilai={(pt) => nDariPuncak(pt, L)}
      />
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const n = clamp(Math.round(p.n ?? 8), 2, 14)
  const sempit = useSempit()
  const L = sempit ? EKS_HP : EKS_LEBAR
  const g = geo(n, L)
  const aktif = useInteraksi()?.kendali.aktif ?? null
  const jumlah = jumlahSampai(n)

  const warnaN = sorot === 'n' || aktif === 'n' ? 'var(--m-hi)' : 'var(--m-a)'
  const warnaN1 = sorot === 'n1' ? 'var(--m-hi)' : 'var(--m-b)'
  const xKiri = g.X0 - L.dimKiri

  return (
    <Svg
      w={L.w}
      h={L.h}
      maxH={L.h}
      label="Dua tangga balok yang bersama-sama membentuk persegi panjang"
    >
      <Lantai L={L} />
      <rect
        x={g.X0}
        y={g.Y0}
        width={g.lebar}
        height={g.tinggi}
        rx={4}
        fill="none"
        stroke="var(--m-hi)"
        strokeWidth={2.5}
      />
      <Tangga
        n={n}
        X0={g.X0}
        lantai={L.lantai}
        u={L.u}
        warna="var(--m-a)"
        terang={sorot === 'S'}
      />
      <g transform={`rotate(180 ${g.cx.toFixed(2)} ${g.cy.toFixed(2)})`}>
        <Tangga n={n} X0={g.X0} lantai={L.lantai} u={L.u} warna="var(--m-b)" />
      </g>

      <Dimensi
        x1={g.X0}
        y1={L.lantai + L.dimBawah}
        x2={g.X0 + g.lebar}
        y2={L.lantai + L.dimBawah}
        label={aktif === 'n' ? undefined : fmt(n)}
        warna={warnaN}
      />
      {L.kiriDiAtas ? (
        <>
          <Dimensi x1={xKiri} y1={g.Y0} x2={xKiri} y2={L.lantai} warna={warnaN1} />
          <Tag x={xKiri} y={g.Y0 - 18} anchor="start" size={14} warna={warnaN1}>
            {fmt(n + 1)}
          </Tag>
        </>
      ) : (
        <Dimensi
          x1={xKiri}
          y1={g.Y0}
          x2={xKiri}
          y2={L.lantai}
          label={fmt(n + 1)}
          warna={warnaN1}
        />
      )}

      <Tag x={L.w / 2} y={L.judulY} warna="var(--m-ab)" size={L.judulSize}>
        {`${deretTeks(n, 4)} = ${fmt(n)} × ${fmt(n + 1)} ÷ 2 = ${fmt(jumlah)}`}
      </Tag>

      {/* Puncak tangga ungu, tepat di batas dengan balok salinan yang menggantung. */}
      <Pegangan
        x={g.px}
        y={g.py}
        param="n"
        arah="bebas"
        utama
        label={`n = ${fmt(n)}`}
        ajakan="Tarik"
        keNilai={(pt) => nDariPuncak(pt, L)}
      />
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'deret-gauss',
  topicId: 'sma10-barisan-dan-deret-aritmetika',
  judul: 'Jumlah deret aritmetika',
  pertanyaan: 'Kenapa 1+2+3+…+100 bisa dihitung dalam sekejap?',
  tagline: 'Trik anak sembilan tahun yang mengubah 99 penjumlahan menjadi satu perkalian.',
  kelas: 10,
  domain: 'aljabar',
  tags: ['deret', 'aritmetika', 'gauss', 'jumlah'],

  tebak: {
    pertanyaan: 'Berapa hasil 1 + 2 + 3 + … + 100?',
    pilihan: [
      {
        id: 'a',
        label: '5.050',
        benar: true,
        balasan:
          'Betul. Konon Gauss kecil menemukannya dalam hitungan detik, sementara teman sekelasnya menjumlahkan satu per satu.',
      },
      {
        id: 'b',
        label: '10.000',
        balasan:
          'Angka 10.000 adalah 100 × 100 — itu kalau semua sukunya bernilai 100. Padahal rata-ratanya jauh lebih kecil.',
      },
      {
        id: 'c',
        label: '5.000',
        balasan:
          'Sangat dekat. Sebentar lagi kamu bisa melihat dari mana kelebihan 50 itu berasal.',
      },
    ],
    penutup:
      'Yang menarik bukan jawabannya, melainkan bahwa jawabannya bisa diperoleh tanpa menjumlahkan sama sekali.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: PARAM_BONGKAR,
    roles: { n: 'a', n1: 'b', S: 'ab' },
    arti: {
      n: 'Bilangan terakhir yang dijumlahkan — sekaligus lebar persegi panjangnya.',
      n1: 'Tinggi persegi panjang, yaitu n + 1. Kolom tertinggi tangga asli (n balok) selalu bertemu kolom terpendek salinan (1 balok), dan begitu pula sebaliknya.',
      S: 'Jumlah seluruh bilangan — separuh dari luas persegi panjang.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Susun sebagai tangga',
        narasi: (p) =>
          `Bilangan ${daftarTeks(nBongkar(p), 4)} digambar sebagai kolom balok. Jumlah seluruh bilangan sama dengan banyaknya balok pada tangga ini.`,
        rumus: (p) => `[S:S] = ${deretRumus(nBongkar(p))}`,
        durasi: 2600,
      },
      {
        id: 's1',
        judul: 'Menjumlahkan satu per satu itu lambat',
        narasi:
          'Untuk n = 100, kamu perlu 99 kali penjumlahan dan sangat mudah keliru. Harus ada cara yang lebih baik.',
        durasi: 2000,
      },
      {
        id: 's2',
        judul: 'Gandakan tangganya',
        narasi:
          'Buat salinan tangga yang sama persis. Sekarang jumlah baloknya menjadi dua kali lipat, yaitu 2S.',
        durasi: 2000,
      },
      {
        id: 's3',
        judul: 'Putar salinannya setengah putaran',
        narasi:
          'Salinan diputar 180 derajat. Perputaran tidak menambah maupun mengurangi balok — hanya memindahkannya.',
        durasi: 2600,
      },
      {
        id: 's4',
        judul: 'Keduanya membentuk persegi panjang',
        narasi: (p) => {
          const n = nBongkar(p)
          return `Tangga yang naik dan tangga yang turun saling mengisi tanpa celah: dari kiri ke kanan, tiap kolom berisi balok tangga asli ditambah balok salinan, yaitu ${pasanganKolom(n)}. Jadi setiap kolom setinggi ${fmt(n + 1)} balok, dan ada ${fmt(n)} kolom.`
        },
        rumus: '2[S:S] = [n:n] × [n1:(n+1)]',
        durasi: 2600,
      },
      {
        id: 's5',
        judul: 'Jadi satu tangga adalah separuhnya',
        narasi: (p) => {
          const n = nBongkar(p)
          return `Dua tangga tadi berisi ${fmt(luasKotak(n))} balok, jadi satu tangga berisi separuhnya, yaitu ${fmt(jumlahSampai(n))} balok. Kamu tidak perlu menjumlahkan apa pun.`
        },
        rumus: '[S:S] = [n:n] × [n1:(n+1)] ÷ 2',
        durasi: 2400,
      },
      {
        id: 's6',
        judul: 'Coba untuk n = 100',
        narasi:
          'Cukup satu perkalian dan satu pembagian: 100 × 101 ÷ 2 = 5.050. Sembilan puluh sembilan penjumlahan menguap begitu saja.',
        rumus: '100 × 101 ÷ 2 = 5.050',
        durasi: 2400,
      },
    ],
  },

  eksperimen: {
    judul: 'Tarik puncak tangganya',
    ajakan:
      'Tarik titik di puncak tangga ungu untuk memanjangkan tangganya. Tangga jingga adalah salinan yang sudah diputar, dan keduanya selalu pas mengisi persegi panjangnya.',
    params: PARAM_EKSPERIMEN,
    Visual: VisualEksperimen,
    rumus: (p) => {
      const n = clamp(Math.round(p.n ?? 8), 2, 14)
      return `[S:S] = [n:${fmt(n)}] × [n1:${fmt(n + 1)}] ÷ 2 = ${fmt(jumlahSampai(n))}`
    },
    temuan: (p) => {
      const n = clamp(Math.round(p.n ?? 8), 2, 14)
      const S = jumlahSampai(n)
      const genap = n % 2 === 0
      // n = 2 dan n = 3 hanya punya satu pasangan: hindari "setiap pasangan … ada 1 pasangan".
      const satuPasangan = Math.floor(n / 2) === 1
      // "dan seterusnya" hanya bila memang masih ada pasangan ketiga (n ≥ 6).
      const contohPasangan =
        n >= 6
          ? `1 + ${fmt(n)}, 2 + ${fmt(n - 1)}, dan seterusnya`
          : n >= 4
            ? `1 + ${fmt(n)} dan 2 + ${fmt(n - 1)}`
            : `1 + ${fmt(n)}`
      return (
        <p>
          <strong>
            {deretTeks(n, 4)} = {fmt(S)}
          </strong>
          . Perhatikan persegi panjangnya berukuran {fmt(n)} × {fmt(n + 1)} — satu sisinya selalu
          satu lebih besar daripada sisi lainnya. Coba pasangkan suku-sukunya dari kedua ujung:{' '}
          {contohPasangan}. {satuPasangan ? 'Pasangan itu' : 'Setiap pasangan'} berjumlah{' '}
          {fmt(n + 1)}
          {genap ? (
            <>
              , dan {satuPasangan ? 'hanya ada satu pasangan' : `ada ${fmt(n / 2)} pasangan`}, jadi
              jumlahnya {fmt(n / 2)} × {fmt(n + 1)} = {fmt(S)}.
            </>
          ) : (
            <>
              . Karena {fmt(n)} ganjil, {satuPasangan ? 'hanya ada satu' : `ada ${fmt((n - 1) / 2)}`}{' '}
              pasangan dan satu suku tengah,{' '}
              {fmt((n + 1) / 2)}, yang tidak punya pasangan — nilainya tepat separuh dari{' '}
              {fmt(n + 1)}. Jadi jumlahnya {fmt((n - 1) / 2)} × {fmt(n + 1)} + {fmt((n + 1) / 2)} ={' '}
              {fmt(S)}.
            </>
          )}{' '}
          Itu cara lain membaca gambar yang sama.
        </p>
      )
    },
  },

  penjelasan: {
    SMA: (
      <>
        <p>
          Ada dua cara membaca gambar tadi, dan keduanya memberi rumus yang sama.
        </p>
        <h4>Cara pertama: gandakan dan putar</h4>
        <p>
          Dua tangga yang saling terbalik mengisi persegi panjang n × (n + 1). Jadi 2S = n(n + 1),
          sehingga S = n(n + 1)/2.
        </p>
        <h4>Cara kedua: pasangkan dari kedua ujung</h4>
        <p>
          Tuliskan deretnya dua kali, sekali maju dan sekali mundur:
        </p>
        <p style={{ textAlign: 'center' }}>
          S = 1 + 2 + … + (n−1) + n<br />
          S = n + (n−1) + … + 2 + 1
        </p>
        <p>
          Jumlahkan kolom demi kolom: setiap kolom bernilai n + 1, dan ada n kolom. Jadi
          2S = n(n + 1). Cara ini persis sama dengan menggandakan dan memutar, hanya ditulis dengan
          lambang.
        </p>
        <h4>Bentuk umum deret aritmetika</h4>
        <p>
          Untuk deret aritmetika mana pun dengan n suku, suku pertama a, beda b, dan suku terakhir
          U<sub>n</sub> = a + (n−1)b, alasan yang sama memberi (setiap pasangan suku dari kedua ujung
          berjumlah a + U<sub>n</sub>)
        </p>
        <p style={{ textAlign: 'center' }}>
          S<sub>n</sub> = n(a + U<sub>n</sub>)/2 = n[2a + (n−1)b]/2
        </p>
        <p>
          Bentuk pertama paling mudah diingat karena bisa dibaca sebagai{' '}
          <strong>banyaknya suku dikali rata-rata suku pertama dan terakhir</strong>. Untuk
          1 + 2 + … + 100: rata-rata 1 dan 100 adalah 50,5, dikali 100 suku menjadi 5.050.
        </p>
        <h4>Kenapa hasilnya selalu bulat</h4>
        <p>
          Di antara n dan n + 1 pasti ada satu yang genap, sehingga n(n + 1) selalu habis dibagi 2.
          Bilangan berbentuk n(n+1)/2 disebut bilangan segitiga, dan gambar tangga tadi menjelaskan
          namanya.
        </p>
      </>
    ),
    SMP: (
      <>
        <p>
          Bayangkan menyusun balok: 1 balok, lalu 2 balok, lalu 3 balok, dan seterusnya sampai n.
          Bentuknya seperti tangga.
        </p>
        <p>
          Sekarang buat tangga kedua yang persis sama, putar terbalik, lalu tempelkan. Tangga yang
          naik dan tangga yang turun akan mengisi satu sama lain sampai membentuk{' '}
          <strong>persegi panjang</strong> yang rapi.
        </p>
        <p>
          Persegi panjang itu lebarnya n dan tingginya n + 1, jadi baloknya n × (n + 1). Karena tadi
          kita memakai dua tangga, satu tangga berisi separuhnya.
        </p>
      </>
    ),
  },

  rumus: {
    src: '[S:S] = [n:n] × [n1:(n+1)] ÷ 2',
    roles: { S: 'ab', n: 'a', n1: 'b' },
    arti: {
      S: 'Jumlah 1 + 2 + 3 + … + n.',
      n: 'Bilangan terakhir yang dijumlahkan — lebar persegi panjangnya.',
      n1: 'Tinggi persegi panjang. Selalu satu lebih besar daripada n, karena di setiap kolom, k balok dari tangga pertama bertemu n + 1 − k balok dari tangga kedua.',
    },
  },

  soal: [
    (rnd) => {
      const n = [20, 30, 40, 50, 60][Math.floor(rnd() * 5)]
      return {
        id: 'gau-1',
        tipe: 'angka',
        topicId: 'sma10-barisan-dan-deret-aritmetika',
        kelas: 10,
        tingkat: 'mudah',
        konsep: 'deret-gauss',
        pertanyaan: `Hitunglah 1 + 2 + 3 + … + ${n}.`,
        jawaban: (n * (n + 1)) / 2,
        toleransi: 1e-9,
        hint: [
          'Jangan menjumlahkan satu per satu. Gunakan rumus dari gambar tangga tadi.',
          `S = n(n+1)/2 dengan n = ${n}.`,
          `Hitung ${n} × ${n + 1} lebih dulu, baru bagi 2.`,
        ],
        pembahasan: `S = ${n} × ${n + 1} ÷ 2 = ${fmt(n * (n + 1))} ÷ 2 = ${fmt((n * (n + 1)) / 2)}.`,
      }
    },
    {
      id: 'gau-2',
      tipe: 'pilihan',
      topicId: 'sma10-barisan-dan-deret-aritmetika',
      kelas: 10,
      tingkat: 'sedang',
      konsep: 'deret-gauss',
      pertanyaan: 'Berapa jumlah 50 bilangan asli ganjil pertama, yaitu 1 + 3 + 5 + … + 99?',
      pilihan: [
        { id: 'a', label: '2.500', benar: true },
        {
          id: 'b',
          label: '5.050',
          diagnosa: 'Itu jumlah 1 sampai 100 (semua bilangan), bukan hanya yang ganjil.',
        },
        {
          id: 'c',
          label: '4.950',
          diagnosa: 'Sepertinya rumusnya dipakai dengan n = 99, padahal banyaknya suku hanya 50.',
        },
        { id: 'd', label: '2.550', diagnosa: 'Nilai tengahnya keliru: rata-rata 1 dan 99 adalah 50, bukan 51.' },
      ],
      hint: [
        'Ada berapa suku? Bilangan ganjil dari 1 sampai 99 jumlahnya 50 suku.',
        'Pakai rumus: banyaknya suku dikali rata-rata suku pertama dan terakhir.',
        'Rata-rata 1 dan 99 adalah 50, lalu dikalikan 50 suku.',
      ],
      pembahasan:
        'S = 50 × (1 + 99)/2 = 50 × 50 = 2.500. Menarik: jumlah n bilangan ganjil pertama selalu n² — persis gagasan gnomon pada konsep parabola.',
    },
    {
      id: 'gau-3',
      tipe: 'urutkan',
      topicId: 'sma10-barisan-dan-deret-aritmetika',
      kelas: 10,
      tingkat: 'sedang',
      konsep: 'deret-gauss',
      pertanyaan: 'Susun kembali alur trik Gauss.',
      langkah: [
        'Susun 1 + 2 + … + n sebagai tangga balok',
        'Buat salinan tangga yang sama persis',
        'Putar salinannya setengah putaran',
        'Kedua tangga membentuk persegi panjang n × (n+1)',
        'Karena memakai dua tangga, jumlahnya n(n+1)/2',
      ],
      hint: [
        'Langkah pertama mengubah bilangan menjadi bentuk yang bisa dilihat.',
        'Pembagian dengan 2 selalu di akhir, karena tadi digunakan dua tangga.',
      ],
      pembahasan:
        'Pola berpikirnya sama dengan pembuktian luas segitiga: gandakan, putar, bentuk bangun yang mudah, lalu ambil separuhnya.',
    },
    (rnd) => {
      const a = 3 + Math.floor(rnd() * 8)
      const b = 2 + Math.floor(rnd() * 6)
      const n = 8 + Math.floor(rnd() * 13)
      const Un = a + (n - 1) * b
      return {
        id: 'gau-4',
        tipe: 'angka',
        topicId: 'sma10-barisan-dan-deret-aritmetika',
        kelas: 10,
        tingkat: 'sulit',
        konsep: 'deret-gauss',
        pertanyaan: `Sebuah deret aritmetika memiliki suku pertama ${a} dan beda ${b}. Berapa jumlah ${n} suku pertamanya?`,
        jawaban: (n * (a + Un)) / 2,
        toleransi: 1e-9,
        hint: [
          'Cari dulu suku terakhirnya dengan Uₙ = a + (n−1)b.',
          `U${n} = ${a} + ${n - 1} × ${b} = ${Un}.`,
          `Lalu Sₙ = n × (a + Uₙ)/2 = ${n} × (${a} + ${Un})/2.`,
        ],
        pembahasan: `U${n} = ${Un}, sehingga S${n} = ${n} × (${a} + ${Un}) ÷ 2 = ${fmt((n * (a + Un)) / 2)}. Rumus ini adalah "banyaknya suku dikali rata-rata suku pertama dan terakhir".`,
      }
    },
    {
      id: 'gau-5',
      tipe: 'benar-salah',
      topicId: 'sma10-barisan-dan-deret-aritmetika',
      kelas: 10,
      tingkat: 'sulit',
      konsep: 'deret-gauss',
      pertanyaan:
        'Untuk n bilangan asli, hasil n(n+1)/2 bisa saja berupa pecahan, karena ada pembagian dengan 2.',
      jawaban: false,
      diagnosa:
        'Di antara dua bilangan berurutan n dan n+1, salah satunya pasti genap. Jadi hasil kalinya selalu habis dibagi 2.',
      hint: [
        'Coba beberapa nilai n dan periksa hasilnya.',
        'Perhatikan sifat n dan n+1: bisakah keduanya sama-sama ganjil?',
        'Salah satu di antara dua bilangan berurutan pasti genap.',
      ],
      pembahasan:
        'Salah. Karena n dan n+1 berurutan, salah satunya pasti genap, sehingga n(n+1) selalu habis dibagi 2. Hasilnya selalu bilangan bulat — dikenal sebagai bilangan segitiga.',
    },
  ],

  lanjut: ['perkalian-luas', 'segitiga-setengah', 'eksponen-logaritma'],
}

export default konsep
