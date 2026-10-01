/* ============================================================
   KONSEP — Kenapa x² menghasilkan lengkung, bukan garis lurus?
   Kelas 9 · Aljabar

   Gagasan: bandingkan SELISIH antar nilai.
   Pada y = 2x, setiap langkah ke kanan menambah jumlah yang sama
   (selisih tetap) — jadi grafiknya lurus.
   Pada y = x², tambahannya makin besar: 1, 3, 5, 7 … (bilangan
   ganjil). Karena tambahannya sendiri bertambah, garisnya
   melengkung ke atas.

   Kenapa bilangan ganjil? Karena memperbesar persegi n×n menjadi
   (n+1)×(n+1) berarti menambahkan huruf L berisi 2n+1 kotak.

   INTERAKSI LANGSUNG (docs/PANDUAN-INTERAKSI.md)
   - a  : titik pada kurva. Di bongkar titik x = 3 (tingginya a·3²),
          di eksperimen titik x = 2. Menariknya naik-turun membuat
          kurvanya makin melengkung atau makin landai.
   - n  : pojok persegi pada langkah gnomon — persegi ditarik besar-kecil.
   - b, c : dua titik pada GARIS DASAR y = bx + c (garis putus-putus biru).
          Titik di x = 0 adalah c, titik di x = 4 memiringkan garisnya (b).
          Jarak tegak antara kurva dan garis dasar tepat a·x², yaitu isi
          kolom "y = ax²" pada tabel — jadi tabel dan gambar satu cerita.
   ============================================================ */

import { Pegangan, useInteraksi } from '../components/Interaksi'
import { Svg, Tag, useSempit, useUkuranLayar } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

/* ---------------- Tata letak ---------------- */

const XMIN = -0.6
const XMAX = 5.4
const XS = [0, 1, 2, 3, 4, 5]

/** Titik pada kurva yang dipegang untuk mengubah a. */
const X_A_BONGKAR = 3
const X_A_EKS = 2
/** Titik pada garis dasar y = bx + c yang dipegang untuk memiringkannya (b). */
const X_B_EKS = 4

interface Bidang {
  x0: number
  x1: number
  y0: number
  y1: number
}

interface Skala {
  ymin: number
  ymax: number
}

interface TataTabel {
  /** pangkal kolom x dan baris pertama. */
  x: number
  y: number
  dy: number
  /** jarak kolom dari x: nilai, panah selisih, selisih, selisih ke-2. */
  dx: [number, number, number, number]
  /** ukuran huruf: judul kolom, x, nilai, selisih, selisih ke-2. */
  f: [number, number, number, number, number]
}

interface Tata {
  sempit: boolean
  w: number
  h: number
  maxH: number
  g: Bidang
  tabel: TataTabel
}

/** Bongkar punya dua panel yang tidak dipakai eksperimen: persegi dan keterangan tahap. */
interface TataBongkar extends Tata {
  /** gnomon: ukuran satu kotak dan pojok kiri-bawah persegi. */
  gnomon: { sel: number; x0: number; y0: number; label: number }
  /** keterangan tahap di dalam gambar. */
  ket: { x: number; y: number; size: number }
}

/**
 * Tata letak lebar: tabel di kiri, grafik di kanan. Di HP keduanya ditumpuk —
 * tabel di atas (baris lebih rapat) dan grafik besar di bawah.
 */
const BONGKAR_LEBAR: TataBongkar = {
  sempit: false,
  w: 690,
  h: 440,
  maxH: 450,
  g: { x0: 350, x1: 660, y0: 92, y1: 400 },
  tabel: { x: 34, y: 116, dy: 42, dx: [42, 112, 142, 210], f: [14, 17, 18, 17, 16] },
  gnomon: { sel: 34, x0: 70, y0: 350, label: 34 },
  ket: { x: 345, y: 30, size: 16 },
}

const BONGKAR_HP: TataBongkar = {
  sempit: true,
  w: 420,
  h: 546,
  maxH: 520,
  g: { x0: 26, x1: 400, y0: 248, y1: 506 },
  tabel: { x: 26, y: 52, dy: 26, dx: [42, 110, 138, 216], f: [13, 15, 16, 15, 14] },
  // Pada langkah gnomon, HP menyembunyikan tabel dan grafik supaya perseginya
  // bisa digambar sebesar mungkin — di langkah itu hanya persegi yang berubah.
  gnomon: { sel: 52, x0: 54, y0: 400, label: 30 },
  ket: { x: 210, y: 526, size: 14 },
}

const EKS_LEBAR: Tata = {
  sempit: false,
  w: 690,
  h: 460,
  maxH: 470,
  g: { x0: 350, x1: 660, y0: 86, y1: 410 },
  tabel: { x: 34, y: 116, dy: 42, dx: [42, 112, 142, 210], f: [14, 17, 18, 17, 16] },
}

const EKS_HP: Tata = {
  sempit: true,
  w: 420,
  h: 546,
  maxH: 520,
  g: { x0: 26, x1: 400, y0: 240, y1: 508 },
  tabel: { x: 26, y: 52, dy: 26, dx: [42, 110, 138, 216], f: [13, 15, 16, 15, 14] },
}

/**
 * Skala tegak bongkar, dikunci pada skala untuk a = 1: y = 1 × 5² = 25, dengan
 * ruang 12% di atas dan di bawahnya. Skala yang ikut membesar bersama a membuat
 * y = ax² tergambar persis sama untuk setiap a, sehingga menarik titik pada kurva
 * tidak mengubah lengkungnya sama sekali — padahal justru itu yang diperlihatkan.
 */
const SKALA_BONGKAR: Skala = { ymin: -3.36, ymax: 28 }

/** Koordinat gambar ↔ nilai. `dariY` adalah kebalikan tepat dari `ky`. */
function buatPeta(g: Bidang, s: Skala) {
  return {
    kx: (x: number) => g.x0 + ((x - XMIN) / (XMAX - XMIN)) * (g.x1 - g.x0),
    ky: (y: number) => g.y1 - ((y - s.ymin) / (s.ymax - s.ymin)) * (g.y1 - g.y0),
    dariY: (py: number) => s.ymin + ((g.y1 - py) / (g.y1 - g.y0)) * (s.ymax - s.ymin),
  }
}

type Ukur = ReturnType<typeof useUkuranLayar>

/** Ukuran huruf angka sumbu x; dipakai bersama agar perhitungan tabrakannya cocok. */
const hurufSumbu = (u: Ukur) => Math.max(13, u(11, 13))

/** Garis dasar tempat angka sumbu x dituliskan. */
const barisSumbu = (u: Ukur, y0: number) => y0 + hurufSumbu(u) + 3

/**
 * Ajakan pada pegangan utama. Sengaja pendek: pil ajakan melebar mengikuti
 * panjang teksnya, dan di sini ia melayang tepat di atas baris angka sumbu.
 */
const AJAKAN_TARIK = 'Tarik aku'

interface Kotak {
  x0: number
  y0: number
  x1: number
  y1: number
}

const bersinggungan = (a: Kotak, b: Kotak) =>
  a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1

/** Ukuran tampil sebuah `Tag`: diperbesar paling banyak 1,6× agar >= 11 px layar. */
const ukuranTag = (u: Ukur, size: number) => Math.max(size, Math.min(size * 1.6, u(11, size)))

/** Kotak yang ditutupi sebuah label `Tag`; rumusnya mengikuti Stage.tsx. */
function kotakTag(x: number, y: number, teks: string, huruf: number): Kotak {
  const lebar = teks.length * huruf * 0.58 + huruf * 1.1
  return { x0: x - lebar / 2, y0: y - huruf * 0.82, x1: x + lebar / 2, y1: y + huruf * 0.68 }
}

/** Kotak yang ditempati satu angka sumbu x. */
function kotakAngka(u: Ukur, kx: (x: number) => number, yAngka: number, x: number): Kotak {
  const fs = hurufSumbu(u)
  return {
    x0: kx(x) - fs * 0.3,
    y0: yAngka - fs * 0.75,
    x1: kx(x) + fs * 0.3,
    y1: yAngka + fs * 0.25,
  }
}

interface PeganganTerpasang {
  x: number
  y: number
  /** label nilainya, mis. "a = 1,5". */
  label: string
  /** ukuran huruf label statisnya (sama dengan `size` pada `Tag`). */
  huruf?: number
  /** sedang dipegang: label statis hilang, label pegangan naik lebih tinggi. */
  dipegang: boolean
  /** ajakan masih tampil di bawah titiknya. */
  mengajak: boolean
}

/**
 * Seluruh kotak yang ditempati sebuah pegangan: titik berikut panah arahnya,
 * label nilai yang melayang di atasnya (naik lebih tinggi dan membesar saat
 * dipegang), dan pil ajakan di bawahnya. Ukurannya mengikuti Interaksi.tsx.
 */
function kotakPegangan(u: Ukur, p: PeganganTerpasang): Kotak[] {
  const r = Math.max(8, u(9, 9))
  const h = p.huruf ?? 13
  return [
    { x0: p.x - r * 1.9, y0: p.y - r * 1.9, x1: p.x + r * 1.9, y1: p.y + r * 1.9 },
    p.dipegang
      ? kotakTag(p.x, p.y - r - u(22, 22), p.label, u(15, 15))
      : kotakTag(p.x, p.y - 24, p.label, ukuranTag(u, h)),
    ...(p.mengajak ? [kotakTag(p.x, p.y + r + u(24, 24), AJAKAN_TARIK, u(13, 13))] : []),
  ]
}

/**
 * Angka sumbu x mana saja yang harus dilewati: hanya yang benar-benar tertimpa
 * pegangan atau salah satu labelnya — termasuk angka di kolom sebelah, karena
 * pil label jauh lebih lebar daripada titiknya. Selama titiknya jauh, angkanya
 * tetap digambar karena anak memerlukannya untuk membaca grafik.
 */
function angkaTertutup(
  u: Ukur,
  kx: (x: number) => number,
  yAngka: number,
  pegangan: PeganganTerpasang[],
): number[] {
  const kotak = pegangan.flatMap((p) => kotakPegangan(u, p))
  return XS.filter((x) => kotak.some((k) => bersinggungan(kotakAngka(u, kx, yAngka, x), k)))
}

/* ---------------- Panel tabel selisih ---------------- */

function Tabel({
  L,
  a,
  linear,
  tampilBaris,
  tampilSelisih,
  tampilSelisih2,
  nyala,
  nyalaSelisih2 = false,
  labelKuadrat = 'y = ax²',
}: {
  L: Tata
  a: number
  /** true: tabel untuk y = 2x, false: untuk y = a x². */
  linear: boolean
  /** judul kolom nilai saat tabel tidak linear. */
  labelKuadrat?: string
  tampilBaris: number
  tampilSelisih: number
  tampilSelisih2: number
  nyala: boolean
  nyalaSelisih2?: boolean
}) {
  const u = useUkuranLayar()
  const T = L.tabel
  // Huruf tidak boleh tampil lebih kecil dari 11 px di layar.
  const uk = (dasar: number) => Math.max(dasar, u(11, dasar))
  const f = (x: number) => (linear ? 2 * x : a * x * x)
  const x0 = T.x
  const y0 = T.y
  const dy = T.dy
  const [dNilai, dPanah, dSelisih, dSelisih2] = T.dx
  const [fJudul, fX, fNilai, fSelisih, fSelisih2] = T.f
  const warnaNilai = linear ? 'var(--m-c)' : 'var(--m-a)'

  return (
    <g>
      <text x={x0} y={y0 - dy * 0.76} fontSize={uk(fJudul)} fontWeight={800} fill="var(--ink-2)">
        x
      </text>
      <text
        x={x0 + dNilai}
        y={y0 - dy * 0.76}
        fontSize={uk(fJudul)}
        fontWeight={800}
        fill={warnaNilai}
      >
        {linear ? 'y = 2x' : labelKuadrat}
      </text>
      <text
        x={x0 + dSelisih}
        y={y0 - dy * 0.76}
        fontSize={uk(fJudul)}
        fontWeight={800}
        fill="var(--m-b)"
      >
        selisih
      </text>

      {XS.map((x, i) => {
        const o = clamp(tampilBaris * XS.length - i, 0, 1)
        if (o <= 0.02) return null
        const y = y0 + i * dy
        const sel = i > 0 ? f(x) - f(x - 1) : null
        const so = sel === null ? 0 : Math.min(o, clamp(tampilSelisih * XS.length - i, 0, 1))
        return (
          <g key={x} opacity={o}>
            <text x={x0} y={y} fontSize={uk(fX)} fontWeight={700} fill="var(--ink-2)" fontFamily="var(--font-math)">
              {fmt(x)}
            </text>
            <text
              x={x0 + dNilai}
              y={y}
              fontSize={uk(fNilai)}
              fontWeight={800}
              fill={warnaNilai}
              fontFamily="var(--font-math)"
            >
              {fmt(f(x) + 0) /* + 0 membuang −0 (a negatif, x = 0) agar tidak tertulis "-0" */}
            </text>
            {sel !== null && so > 0.02 && (
              <g opacity={so}>
                <path
                  d={`M ${x0 + dPanah} ${y - dy + 6} q 20 ${dy / 2 - 6} 0 ${dy - 12}`}
                  fill="none"
                  stroke="var(--m-b)"
                  strokeWidth={1.8}
                />
                <text
                  x={x0 + dSelisih}
                  y={y - dy / 2}
                  fontSize={uk(fSelisih)}
                  fontWeight={800}
                  fill={nyala ? 'var(--m-hi)' : 'var(--m-b)'}
                  fontFamily="var(--font-math)"
                >
                  {`${sel < 0 ? '−' : '+'}${fmt(Math.abs(sel))}`}
                </text>
              </g>
            )}
          </g>
        )
      })}

      {/* selisih dari selisih */}
      {tampilSelisih2 > 0.05 && !linear && (
        <g opacity={tampilSelisih2}>
          {XS.slice(2).map((x, i) => {
            const s1 = f(x) - f(x - 1)
            const s0 = f(x - 1) - f(x - 2)
            return (
              <text
                key={x}
                x={x0 + dSelisih2}
                y={y0 + (i + 1.5) * dy}
                fontSize={uk(fSelisih2)}
                fontWeight={800}
                fill={nyalaSelisih2 ? 'var(--m-hi)' : 'var(--m-ab)'}
                fontFamily="var(--font-math)"
              >
                {`${s1 - s0 < 0 ? '−' : '+'}${fmt(Math.abs(s1 - s0))}`}
              </text>
            )
          })}
          <text
            x={x0 + dSelisih2}
            y={y0 - dy * 0.76}
            fontSize={uk(fJudul)}
            fontWeight={800}
            fill="var(--m-ab)"
          >
            selisih ke-2
          </text>
        </g>
      )}
    </g>
  )
}

/* ---------------- Panel grafik ---------------- */

function Grafik({
  L,
  s,
  a,
  b = 0,
  c = 0,
  linear,
  titikSampai,
  nyalaKurva = false,
  garis = false,
  nyalaGaris = false,
  lewati = [],
}: {
  L: Tata
  s: Skala
  a: number
  b?: number
  c?: number
  linear: boolean
  /** sampai x berapa titik-titiknya sudah digambar. */
  titikSampai: number
  nyalaKurva?: boolean
  /** gambar garis dasar y = bx + c (kurva = garis dasar + a x²). */
  garis?: boolean
  nyalaGaris?: boolean
  /** angka sumbu x yang dilewati, karena pegangan di kolom itu menempel pada sumbu. */
  lewati?: number[]
}) {
  const u = useUkuranLayar()
  const g = L.g
  const { kx, ky } = buatPeta(g, s)
  const f = (x: number) => (linear ? 2 * x : a * x * x + b * x + c)
  const dasar = (x: number) => (linear ? 2 * x : b * x + c)
  const di = (y: number) => y >= s.ymin && y <= s.ymax
  const fs = hurufSumbu(u)
  const warna = linear ? 'var(--m-c)' : 'var(--m-a)'

  // Kurva digambar dari 100 potongan.
  const n = 100
  const kurva: string[] = []
  // Bila kurva keluar bidang lalu masuk lagi, garisnya diputus — jangan ditarik tali busur lurus.
  let putus = true
  // Kelebihan di luar bidang yang masih digambar: sebanding dengan skala (±10 piksel), agar
  // kurva yang keluar bidang tidak menjulur jauh ke label di atasnya.
  const lebih = (s.ymax - s.ymin) * 0.03
  for (let i = 0; i <= n; i++) {
    const x = XMIN + ((XMAX - XMIN) * i) / n
    if (x > titikSampai + 0.02) break
    const y = f(x)
    if (y < s.ymin - lebih || y > s.ymax + lebih) {
      putus = true
      continue
    }
    kurva.push(`${putus ? 'M' : 'L'} ${kx(x).toFixed(1)} ${ky(y).toFixed(1)}`)
    putus = false
  }

  // Garis dasar y = bx + c, dipotong pada tepi bidang.
  let ujung: [number, number] | null = null
  if (garis) {
    if (Math.abs(b) < 1e-9) {
      ujung = di(c) ? [XMIN, XMAX] : null
    } else {
      const xa = (s.ymin - c) / b
      const xb = (s.ymax - c) / b
      const lo = Math.max(XMIN, Math.min(xa, xb))
      const hi = Math.min(XMAX, Math.max(xa, xb))
      ujung = hi > lo ? [lo, hi] : null
    }
  }

  const titik = XS.filter((x) => x <= titikSampai)

  return (
    <g>
      {/* kisi */}
      {XS.map((x) => (
        <line key={`v${x}`} x1={kx(x)} y1={g.y0} x2={kx(x)} y2={g.y1} stroke="var(--m-grid)" strokeWidth={1} />
      ))}
      <line x1={g.x0} y1={ky(0)} x2={g.x1} y2={ky(0)} stroke="var(--m-axis)" strokeWidth={1.8} />
      <line x1={kx(0)} y1={g.y0} x2={kx(0)} y2={g.y1} stroke="var(--m-axis)" strokeWidth={1.8} />
      {XS.filter((x) => !lewati.includes(x)).map((x) => (
        <text
          key={`l${x}`}
          x={kx(x)}
          y={barisSumbu(u, ky(0))}
          textAnchor="middle"
          fontSize={fs}
          fontWeight={700}
          fill="var(--ink-soft)"
        >
          {fmt(x)}
        </text>
      ))}

      {/* garis dasar y = bx + c: kurva hanyalah garis ini ditambah a x² */}
      {ujung && (
        <line
          x1={kx(ujung[0])}
          y1={ky(dasar(ujung[0]))}
          x2={kx(ujung[1])}
          y2={ky(dasar(ujung[1]))}
          stroke="var(--m-c)"
          strokeWidth={nyalaGaris ? 3.4 : 2.2}
          strokeDasharray="8 6"
          opacity={nyalaGaris ? 1 : 0.8}
        />
      )}

      {kurva.length > 1 && (
        <path
          d={kurva.join(' ')}
          fill="none"
          stroke={warna}
          strokeWidth={nyalaKurva ? 4 : 2.8}
          strokeLinejoin="round"
        />
      )}

      {titik.map((x) => {
        const y = f(x)
        const d = dasar(x)
        if (!di(y)) return null
        return (
          <g key={x}>
            {/* jarak tegak ke garis dasar = a x², persis isi kolom tabel */}
            {di(d) && Math.abs(y - d) > 0.001 && (
              <line
                x1={kx(x)}
                y1={ky(d)}
                x2={kx(x)}
                y2={ky(y)}
                stroke={warna}
                strokeWidth={1.2}
                strokeDasharray="3 4"
                opacity={0.7}
              />
            )}
            <circle cx={kx(x)} cy={ky(y)} r={4.5} fill={warna} />
          </g>
        )
      })}
    </g>
  )
}

/* ---------------- Panel persegi (gnomon) ---------------- */

/**
 * Persegi n×n yang bisa ditarik pojoknya. Huruf L berisi 2n+1 kotak
 * memperlihatkan tambahan saat persegi diperbesar satu langkah.
 */
function PersegiTumbuh({
  L,
  n,
  tampil,
  utama,
}: {
  L: TataBongkar
  n: number
  tampil: number
  utama: boolean
}) {
  const { sel, x0, y0, label } = L.gnomon
  const kotak = []
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      kotak.push(
        <rect
          key={`a${i}-${j}`}
          x={x0 + j * sel}
          y={y0 - (i + 1) * sel}
          width={sel - 1.5}
          height={sel - 1.5}
          fill="var(--m-a)"
          fillOpacity={0.35}
          stroke="var(--m-a)"
          strokeWidth={1}
        />,
      )
    }
  }
  // Huruf L tambahan berisi 2n+1 kotak.
  const tambah = []
  for (let j = 0; j <= n; j++) {
    tambah.push({ i: n, j })
  }
  for (let i = 0; i < n; i++) {
    tambah.push({ i, j: n })
  }
  return (
    <g>
      {kotak}
      {tambah.map(({ i, j }, k) => (
        <rect
          key={`b${k}`}
          x={x0 + j * sel}
          y={y0 - (i + 1) * sel}
          width={sel - 1.5}
          height={sel - 1.5}
          fill="var(--m-b)"
          fillOpacity={0.55 * clamp(tampil * tambah.length - k, 0, 1)}
          stroke="var(--m-b)"
          strokeWidth={1.2}
          strokeOpacity={clamp(tampil * tambah.length - k, 0, 1)}
        />
      ))}
      {/* Kedua label ditaruh di BAWAH persegi, bukan di dalamnya: pegangan
          duduk di pojok kanan atas, dan untuk n kecil label di tengah persegi
          akan bertabrakan dengannya. */}
      <Tag x={x0 + (n * sel) / 2} y={y0 + label} warna="var(--m-a)" size={L.sempit ? 16 : 15}>
        {`${fmt(n)}² = ${fmt(n * n)}`}
      </Tag>
      <Tag x={x0 + ((n + 1) * sel) / 2} y={y0 + label + 28} warna="var(--m-b)" size={L.sempit ? 16 : 15}>
        {`tambahannya ${fmt(2 * n + 1)} kotak`}
      </Tag>
      {/* Pojok kanan atas persegi: ditarik keluar untuk memperbesar n. */}
      <Pegangan
        x={x0 + n * sel}
        y={y0 - n * sel}
        param="n"
        arah="bebas"
        utama={utama}
        ajakan="Tarik pojoknya"
        label={`${fmt(n)} × ${fmt(n)}`}
        keNilai={(pt) => ((pt.x - x0) / sel + (y0 - pt.y) / sel) / 2}
      />
    </g>
  )
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

/** Nilai a pada animasi bongkar (langkah 5 ke atas). Dipakai bersama oleh visual dan teks langkah. */
const aBongkar = (p: Record<string, number>) => clamp(p.a ?? 1, 0.5, 3)

/** Persegi ke-n yang digambar pada langkah gnomon (langkah 4). Dipakai bersama oleh visual dan teks. */
const nBongkar = (p: Record<string, number>) => clamp(Math.round(p.n ?? 3), 1, 5)

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const sempit = useSempit()
  const L: TataBongkar = sempit ? BONGKAR_HP : BONGKAR_LEBAR
  return (
    <Svg w={L.w} h={L.h} maxH={L.maxH} label="Tabel selisih dan grafik fungsi kuadrat">
      <IsiBongkar L={L} step={step} t={t} p={p} sorot={sorot} />
    </Svg>
  )
}

/**
 * Isi panggung bongkar — sengaja komponen tersendiri, bukan badan VisualBongkar.
 * `useUkuranLayar()` membaca skala yang dipasang oleh `Svg`, jadi ia hanya
 * memberi ukuran layar yang benar bila dipanggil DI DALAM <Svg>. Dipanggil di
 * badan komponen yang justru mengembalikan <Svg> itu, ia selalu jatuh ke nilai
 * cadangan, sehingga jari-jari pegangan, tinggi pil ajakan, dan seluruh
 * perhitungan angka sumbu yang tertutup meleset di layar kecil.
 */
function IsiBongkar({ L, step, t, p, sorot }: DeriveState & { L: TataBongkar }) {
  const u = useUkuranLayar()
  const ctx = useInteraksi()
  const aktif = ctx?.kendali.aktif
  // Langkah 1–4 (indeks 0–3) membahas y = x² dengan angka tetap (0, 1, 4, 9 …; 1, 3, 5, 7 …),
  // jadi di sana a dikunci 1 agar tabel cocok dengan narasi. Penggeser a berlaku mulai langkah 5.
  const a = step >= 4 ? aBongkar(p) : 1
  const nGnomon = nBongkar(p)

  const linear = step === 0
  const barisMuncul = step === 0 ? seg(t, 0.05, 0.75) : 1
  const selisihMuncul = step === 0 ? seg(t, 0.4, 0.95) : step >= 2 ? 1 : step === 1 ? 0 : 1
  const selisih2 = fase(step, t, 5)
  const gnomon = step === 3
  const titikSampai = step === 1 ? 5 * seg(t, 0.1, 0.9) : 5

  const nyalaA = sorot === 'a' || aktif === 'a'
  const nyalaKuadrat = sorot === 'x2' || aktif === 'a'

  const s = SKALA_BONGKAR
  const { kx, ky, dariY } = buatPeta(L.g, s)

  // Pegangan a: titik kurva di x = 3. Tingginya a·3² = 9a, jadi keNilai membagi 9.
  const adaA = step >= 4
  const aX = kx(X_A_BONGKAR)
  const aY = ky(a * X_A_BONGKAR * X_A_BONGKAR)
  // Di HP langkah gnomon memakai seluruh panggung, jadi grafiknya disembunyikan.
  const adaGrafik = !(L.sempit && gnomon)
  // Titik a berikut label dan ajakannya; dipakai untuk mencari angka sumbu yang tertutup.
  const peganganA: PeganganTerpasang = {
    x: aX,
    y: aY,
    label: `a = ${fmt(a)}`,
    huruf: 14,
    dipegang: aktif === 'a',
    mengajak: adaA && !!ctx?.ajakan && aktif !== 'a',
  }
  // Angka sumbu hanya dilewati bila benar-benar tertimpa titik a atau labelnya.
  const lewati = adaA && adaGrafik ? angkaTertutup(u, kx, barisSumbu(u, ky(0)), [peganganA]) : []

  const ket =
    step === 0
      ? { teks: 'selisihnya selalu 2 → grafiknya lurus', warna: 'var(--m-c)' }
      : step === 2
        ? { teks: 'selisihnya 1, 3, 5, 7 — bilangan ganjil', warna: 'var(--m-b)' }
        : step === 3
          ? { teks: 'memperbesar persegi = menambah huruf L', warna: 'var(--m-b)' }
          : step >= 5
            ? { teks: `selisih dari selisih selalu tetap: ${fmt(2 * a)}`, warna: 'var(--m-ab)' }
            : null

  return (
    <>
      {gnomon ? (
        <PersegiTumbuh L={L} n={nGnomon} tampil={seg(t, 0.25, 0.9)} utama />
      ) : (
        <Tabel
          L={L}
          a={a}
          linear={linear}
          tampilBaris={barisMuncul}
          tampilSelisih={selisihMuncul}
          tampilSelisih2={selisih2}
          nyala={nyalaA}
          nyalaSelisih2={sorot === 'selisih'}
          // Sebelum langkah 5 a dikunci 1 dan narasinya membahas y = x²; a baru diperkenalkan di langkah 5.
          labelKuadrat={step >= 4 ? 'y = ax²' : 'y = x²'}
        />
      )}

      {adaGrafik && (
        <Grafik
          L={L}
          s={s}
          a={a}
          linear={linear}
          titikSampai={titikSampai}
          nyalaKurva={nyalaKuadrat}
          lewati={lewati}
        />
      )}

      {ket && (
        <Tag x={L.ket.x} y={L.ket.y} warna={ket.warna} size={L.ket.size}>
          {ket.teks}
        </Tag>
      )}

      {/* Label statis disembunyikan selama pegangannya dipegang — pegangan
          menampilkan angkanya sendiri di dekat jari. */}
      {adaA && adaGrafik && aktif !== 'a' && (
        <Tag x={aX} y={aY - 24} warna="var(--m-a)" size={14}>
          {`a = ${fmt(a)}`}
        </Tag>
      )}
      <Pegangan
        x={aX}
        y={aY}
        param="a"
        arah="y"
        utama={adaA}
        sembunyi={!adaA || !adaGrafik}
        ajakan={AJAKAN_TARIK}
        label={`a = ${fmt(a)}`}
        keNilai={(pt) => dariY(pt.y) / (X_A_BONGKAR * X_A_BONGKAR)}
      />
    </>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

// Skala tegak eksperimen sengaja TETAP (tidak mengikuti a). Skala yang menyesuaikan a
// membuat y = ax² tergambar persis sama untuk setiap a positif, sehingga perubahan
// lengkungan tidak terlihat; skala tetap juga memberi ruang bagi kurva yang membuka ke bawah.
// Rentangnya dipilih supaya KETIGA pegangan tetap di dalam bingkai pada semua nilai ekstrem:
// titik c (0 ; c) paling jauh ±6, titik b (4 ; c + 4b) paling jauh ±30, dan titik a
// (2 ; 4a + 2b + c) antara −26 dan 30.
const SKALA_EKSPERIMEN: Skala = { ymin: -32, ymax: 34 }

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const sempit = useSempit()
  const L = sempit ? EKS_HP : EKS_LEBAR
  return (
    <Svg w={L.w} h={L.h} maxH={L.maxH} label="Grafik fungsi kuadrat yang koefisiennya bisa diubah">
      <IsiEksperimen L={L} p={p} sorot={sorot} />
    </Svg>
  )
}

/** Isi panggung eksperimen; lihat catatan pada `IsiBongkar` soal `useUkuranLayar()`. */
function IsiEksperimen({
  L,
  p,
  sorot,
}: {
  L: Tata
  p: Record<string, number>
  sorot: string | null
}) {
  const u = useUkuranLayar()
  const ctx = useInteraksi()
  const aktif = ctx?.kendali.aktif
  const a = clamp(p.a ?? 1, -2, 3)
  const b = clamp(p.b ?? 0, -6, 6)
  const c = clamp(p.c ?? 0, -6, 6)
  // Saat a = 0 grafiknya garis lurus y = bx + c: tidak ada titik puncak.
  const adaPuncak = Math.abs(a) >= 0.05
  const puncakX = adaPuncak ? -b / (2 * a) + 0 : 0
  const puncakY = a * puncakX * puncakX + b * puncakX + c + 0

  // Skala harus sama dengan yang dipakai Grafik, agar titik puncak tepat di kurva.
  const s = SKALA_EKSPERIMEN
  const { kx, ky, dariY } = buatPeta(L.g, s)

  // Tiga pegangan; posisinya dihitung dari nilai yang sama dengan yang dipakai menggambar.
  const aX = kx(X_A_EKS)
  const aY = ky(a * X_A_EKS * X_A_EKS + b * X_A_EKS + c)
  const bX = kx(X_B_EKS)
  const bY = ky(c + b * X_B_EKS)
  const cX = kx(0)
  const cY = ky(c)

  // Ketiga titik berikut label dan ajakannya.
  const terpasang: PeganganTerpasang[] = [
    {
      x: aX,
      y: aY,
      label: `a = ${fmt(a)}`,
      dipegang: aktif === 'a',
      mengajak: !!ctx?.ajakan && aktif !== 'a',
    },
    { x: bX, y: bY, label: `b = ${fmt(b)}`, dipegang: aktif === 'b', mengajak: false },
    { x: cX, y: cY, label: `c = ${fmt(c)}`, dipegang: aktif === 'c', mengajak: false },
  ]
  // Angka sumbu x hanya dilewati di kolom yang benar-benar tertimpa titik atau labelnya.
  const yAngka = barisSumbu(u, ky(0))
  const lewati = angkaTertutup(u, kx, yAngka, terpasang)

  const puncakTampak =
    adaPuncak && puncakX >= XMIN && puncakX <= XMAX && puncakY >= s.ymin && puncakY <= s.ymax
  const vx = kx(puncakX)
  const vy = ky(puncakY)
  // Puncak ditandai CINCIN, bukan titik penuh: ia kerap berimpit dengan salah satu
  // titik seret (b = 0 menaruhnya tepat di titik c), dan lingkaran penuh akan
  // tertutup habis oleh pegangan yang digambar di atasnya. Cincinnya sengaja lebih
  // lebar daripada titik seret berikut panah arahnya, jadi selalu kelihatan.
  const rTitik = Math.max(8, u(9, 9))
  const rCincin = rTitik + u(10, 10)
  const teksPuncak = `puncak (${fmt(puncakX, 2)}; ${fmt(puncakY, 2)})`
  const hurufPuncak = ukuranTag(u, 13)
  const setengahPuncak = kotakTag(0, 0, teksPuncak, hurufPuncak).x1
  const vlx = clamp(vx, L.g.x0 + setengahPuncak, L.g.x1 - setengahPuncak)
  // Letak label dicari, bukan dimatikan: di atas puncak, lalu di bawahnya, lalu
  // lebih jauh lagi — yang penting tidak menutupi titik seret, label, ajakannya,
  // atau angka sumbu yang masih tampil.
  const halangan = [
    ...terpasang.flatMap((q) => kotakPegangan(u, q)),
    ...XS.filter((x) => !lewati.includes(x)).map((x) => kotakAngka(u, kx, yAngka, x)),
  ]
  const vly = [-24, rCincin + hurufPuncak, -(rCincin + hurufPuncak + 24), rCincin + hurufPuncak + 24]
    .map((d) => vy + d)
    .find((y) => {
      const k = kotakTag(vlx, y, teksPuncak, hurufPuncak)
      return k.y0 >= L.g.y0 - 2 && k.y1 <= L.h && !halangan.some((b) => bersinggungan(k, b))
    })

  const nyalaGaris = sorot === 'lurus' || aktif === 'b' || aktif === 'c'

  return (
    <>
      <Tabel
        L={L}
        a={a}
        linear={false}
        tampilBaris={1}
        tampilSelisih={1}
        tampilSelisih2={1}
        nyala={sorot === 'a' || aktif === 'a'}
        nyalaSelisih2={sorot === 'selisih'}
        // Di sini kurvanya y = ax² + bx + c, sedangkan kolom ini hanya berisi
        // suku ax² — yaitu panjang garis putus-putus dari garis dasar ke kurva.
        // Menjudulinya "y = ax²" akan membuat anak mencari titik setinggi 4
        // padahal titik di x = 2 berada di 4 + 2b + c.
        labelKuadrat="ax²"
      />
      <Grafik
        L={L}
        s={s}
        a={a}
        b={b}
        c={c}
        linear={false}
        titikSampai={5}
        nyalaKurva={sorot === 'x2' || aktif === 'a'}
        garis
        nyalaGaris={nyalaGaris}
        lewati={lewati}
      />

      {puncakTampak && (
        <g style={{ pointerEvents: 'none' }}>
          <circle
            cx={vx}
            cy={vy}
            r={rCincin}
            fill="none"
            stroke="var(--m-hi)"
            strokeWidth={u(3, 3)}
          />
          <circle cx={vx} cy={vy} r={u(3.5, 3.5)} fill="var(--m-hi)" />
          {vly !== undefined && (
            <Tag x={vlx} y={vly} warna="var(--m-hi)" size={13}>
              {teksPuncak}
            </Tag>
          )}
        </g>
      )}

      {/* Angka menempel pada titiknya; disembunyikan saat titik itu sedang dipegang. */}
      {aktif !== 'c' && (
        <Tag x={cX} y={cY - 24} warna="var(--m-c)" size={13}>
          {`c = ${fmt(c)}`}
        </Tag>
      )}
      {aktif !== 'b' && (
        <Tag x={bX} y={bY - 24} warna="var(--m-c)" size={13}>
          {`b = ${fmt(b)}`}
        </Tag>
      )}
      {aktif !== 'a' && (
        <Tag x={aX} y={aY - 24} warna="var(--m-a)" size={13}>
          {`a = ${fmt(a)}`}
        </Tag>
      )}

      {/* Titik pada kurva: menariknya naik-turun mengubah lengkungannya.
          Tingginya di atas garis dasar tepat a·2² = 4a. */}
      <Pegangan
        x={aX}
        y={aY}
        param="a"
        arah="y"
        utama
        ajakan={AJAKAN_TARIK}
        label={`a = ${fmt(a)}`}
        keNilai={(pt) => (dariY(pt.y) - b * X_A_EKS - c) / (X_A_EKS * X_A_EKS)}
      />
      {/* Dua titik pada garis dasar y = bx + c: kemiringannya (b) dan pangkalnya (c). */}
      <Pegangan
        x={bX}
        y={bY}
        param="b"
        arah="y"
        label={`b = ${fmt(b)}`}
        keNilai={(pt) => (dariY(pt.y) - c) / X_B_EKS}
      />
      <Pegangan
        x={cX}
        y={cY}
        param="c"
        arah="y"
        label={`c = ${fmt(c)}`}
        keNilai={(pt) => dariY(pt.y)}
      />
    </>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'parabola',
  topicId: 'smp9-fungsi-kuadrat-dan-grafik-parabola',
  judul: 'Grafik fungsi kuadrat',
  pertanyaan: 'Kenapa x² menghasilkan lengkung, bukan garis lurus?',
  tagline: 'Karena setiap langkah ke kanan menambah lebih banyak dari langkah sebelumnya.',
  kelas: 9,
  domain: 'aljabar',
  tags: ['parabola', 'kuadrat', 'grafik', 'fungsi', 'selisih'],

  tebak: {
    pertanyaan:
      'Untuk y = x², nilai y berturut-turut adalah 0, 1, 4, 9, 16. Berapa selisih antar nilai itu?',
    pilihan: [
      {
        id: 'a',
        label: 'Selalu sama',
        balasan:
          'Kalau selisihnya selalu sama, grafiknya pasti garis lurus. Coba hitung: dari 1 ke 4 naik 3, dari 4 ke 9 naik 5.',
      },
      {
        id: 'b',
        label: '1, 3, 5, 7 — bilangan ganjil',
        benar: true,
        balasan:
          'Betul, dan bukan kebetulan. Sebentar lagi kamu bisa melihat kenapa yang muncul justru bilangan ganjil.',
      },
      {
        id: 'c',
        label: '1, 2, 3, 4',
        balasan:
          'Kalau selisihnya 1, 2, 3, 4, nilainya akan menjadi 0, 1, 3, 6, 10 — itu bilangan segitiga, bukan bilangan kuadrat.',
      },
    ],
    penutup:
      'Selisih yang tidak tetap itulah sumber lengkungannya. Yang tetap justru selisih dari selisihnya.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      {
        key: 'a',
        label: 'Koefisien a (mulai langkah 5)',
        min: 0.5,
        max: 3,
        step: 0.5,
        awal: 1,
        simbol: 'a',
        peran: 'a',
        bagian: 'a',
      },
      {
        key: 'n',
        label: 'Persegi ke- (langkah 4)',
        min: 1,
        max: 5,
        step: 1,
        awal: 3,
        bulat: true,
        simbol: 'n',
        peran: 'b',
        bagian: 'x2',
      },
    ],
    roles: { a: 'a', x2: 'b', selisih: 'ab', lurus: 'c' },
    arti: {
      a: 'Koefisien di depan x². Ia menentukan seberapa cepat kurvanya melengkung.',
      x2: 'Bagian kuadrat — sumber lengkungannya.',
      selisih: 'Selisih dari selisih. Untuk fungsi kuadrat dengan x naik 1 demi 1, nilainya selalu tetap yaitu 2a.',
      lurus: 'Fungsi linear, selisihnya tetap sehingga grafiknya lurus.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Bandingkan dulu dengan garis lurus',
        narasi:
          'Pada y = 2x, setiap langkah ke kanan menambah 2 — selalu 2. Karena tambahannya tidak pernah berubah, titik-titiknya berbaris lurus.',
        rumus: '[lurus:y = 2x] → selisih tetap 2',
        durasi: 2600,
      },
      {
        id: 's1',
        judul: 'Sekarang y = x²',
        narasi:
          'Nilainya 0, 1, 4, 9, 16, 25. Titik-titiknya jelas tidak berbaris lurus — tetapi kenapa?',
        durasi: 2400,
      },
      {
        id: 's2',
        judul: 'Lihat selisihnya',
        narasi:
          'Tambahannya 1, lalu 3, lalu 5, lalu 7: setiap langkah menambah lebih banyak daripada langkah sebelumnya. Itulah yang membuat garisnya menanjak makin curam.',
        rumus: 'selisih = 1, 3, 5, 7, …',
        durasi: 2600,
      },
      {
        id: 's3',
        judul: 'Kenapa bilangan ganjil?',
        // Gambar menampilkan persegi ke-n yang pojoknya bisa ditarik, jadi narasi dan rumus memakai n yang sama.
        narasi: (p) => {
          const n = nBongkar(p)
          return `Tarik titik oranye di pojok persegi: karena x² adalah luas persegi, selisih dari ${fmt(n)}² ke ${fmt(n + 1)}² sama dengan banyak kotak yang ditambahkan saat persegi ${fmt(n)}×${fmt(n)} diperbesar menjadi ${fmt(n + 1)}×${fmt(n + 1)}, yaitu satu baris, satu kolom, dan satu kotak pojok: ${fmt(n)} + ${fmt(n)} + 1 = ${fmt(2 * n + 1)} kotak. Untuk persegi n×n mana pun tambahannya n + n + 1 = 2n + 1, dan bilangan itu selalu ganjil.`
        },
        rumus: (p) => {
          const n = nBongkar(p)
          return `${fmt(n + 1)}^2 − ${fmt(n)}^2 = 2 × ${fmt(n)} + 1 = ${fmt(2 * n + 1)}`
        },
        durasi: 3000,
      },
      {
        id: 's4',
        judul: 'Tambahan yang membesar = garis melengkung',
        // Mulai langkah ini tabel memakai a dari titik yang diseret, jadi selisihnya ikut berubah.
        narasi: (p) => {
          const a = aBongkar(p)
          // Titik koma memisahkan bilangan, karena koma sudah dipakai sebagai tanda desimal (0,5; 1,5; 2,5).
          return `Kini tabelnya y = ax²; seret titik ungu pada kurva lalu lihat kolom selisih: untuk a = ${fmt(a)} tambahannya berturut-turut ${fmt(a)}; ${fmt(3 * a)}; ${fmt(5 * a)} — tiap tambahan lebih besar daripada tambahan sebelumnya. Tambahan yang tetap memberi garis lurus, tambahan yang terus membesar melengkungkan grafiknya ke atas, dan lengkung itulah parabola.`
        },
        durasi: 2200,
      },
      {
        id: 's5',
        judul: 'Yang tetap adalah selisih ke-2',
        // Tabel dan label di gambar menampilkan nilai 2a untuk a dari titik yang diseret.
        narasi: (p) => {
          const a = aBongkar(p)
          return `Kalau x naik 1 demi 1, selisih dari selisih selalu bernilai sama, yaitu 2a — dengan a = ${fmt(a)} nilainya ${fmt(2 * a)}. Selisih ke-2 yang tetap dan bukan nol inilah tanda pengenal fungsi kuadrat; fungsi linear juga punya selisih ke-2 tetap, tetapi nilainya 0.`
        },
        rumus: (p) => {
          const a = aBongkar(p)
          return `selisih ke-2 = [selisih:2a] = 2 × ${fmt(a)} = ${fmt(2 * a)}`
        },
        durasi: 2400,
      },
      {
        id: 's6',
        judul: 'Bentuk umumnya',
        narasi:
          'Menambahkan bx dan c hanya memindahkan kurvanya: bx menggeser puncaknya ke samping sekaligus naik-turun, dan c menggesernya tegak. Bentuk lengkungnya tidak berubah dan tidak menjadi miring; yang menentukan lengkung hanyalah a.',
        rumus: 'y = [a:a][x2:x^2] + bx + c',
        durasi: 2200,
      },
    ],
  },

  eksperimen: {
    judul: 'Tarik kurvanya, geser garis dasarnya',
    ajakan:
      'Seret titik ungu di kurva untuk mengubah lengkungannya. Dua titik biru di garis putus-putus memindahkan kurvanya tanpa mengubah bentuknya.',
    params: [
      { key: 'a', label: 'a (lengkungan)', min: -2, max: 3, step: 0.25, awal: 1, simbol: 'a', peran: 'a', bagian: 'a' },
      { key: 'b', label: 'b (kemiringan garis dasar)', min: -6, max: 6, step: 0.5, awal: 0, simbol: 'b', peran: 'c', bagian: 'lurus' },
      { key: 'c', label: 'c (pangkal garis dasar)', min: -6, max: 6, step: 1, awal: 0, simbol: 'c', peran: 'c', bagian: 'lurus' },
    ],
    Visual: VisualEksperimen,
    rumus: (p) => {
      const a = clamp(p.a ?? 1, -2, 3)
      const b = clamp(p.b ?? 0, -6, 6)
      const c = clamp(p.c ?? 0, -6, 6)
      const tandaB = b >= 0 ? '+' : '−'
      const tandaC = c >= 0 ? '+' : '−'
      return `y = [a:${fmt(a, 2)}][x2:x^2] [lurus:${tandaB} ${fmt(Math.abs(b), 2)}x ${tandaC} ${fmt(Math.abs(c), 2)}]`
    },
    temuan: (p) => {
      const a = clamp(p.a ?? 1, -2, 3)
      const b = clamp(p.b ?? 0, -6, 6)
      if (Math.abs(a) < 0.05) {
        return (
          <p>
            {/* Tabel hanya memuat bagian ax², jadi di sini semua nilainya 0; jangan menyebut
                selisih pertama y = bx + c yang tidak tampak di tabel. */}
            <strong>Dengan a = 0, suku x² hilang.</strong> Kolom ax² di tabel menjadi 0 semua
            sehingga selisih ke-2 bernilai 0, kurvanya jatuh tepat menempel pada garis putus-putus,
            dan grafiknya tinggal y = bx + c: garis lurus tanpa titik puncak. Tanpa x², tidak ada
            lengkungan.
          </p>
        )
      }
      const px = -b / (2 * a) + 0
      return (
        <p>
          <strong>Selisih ke-2 selalu {fmt(2 * a, 2)}</strong> — untuk x yang naik 1 demi 1
          nilainya 2a, dan tidak bergantung pada b maupun c.{' '}
          {a > 0
            ? 'Karena a positif, kurvanya membuka ke atas dan punya titik terendah.'
            : 'Karena a negatif, tambahannya justru mengecil terus, sehingga kurvanya membuka ke bawah dan punya titik tertinggi.'}{' '}
          Puncaknya berada di x = −b/2a = {fmt(px, 2)}. Coba seret titik c di sumbu y saja: seluruh
          kurva naik-turun tanpa berubah bentuk sedikit pun, dan jarak tegak dari garis putus-putus
          ke kurva tetap a × x².
        </p>
      )
    },
  },

  penjelasan: {
    SMP: (
      <>
        <p>
          Bentuk sebuah grafik ditentukan oleh <strong>bagaimana nilainya bertambah</strong>, bukan
          oleh nilainya sendiri.
        </p>
        <ul>
          <li>
            Kalau tambahannya <strong>tetap</strong>, grafiknya garis lurus. Inilah fungsi linear.
          </li>
          <li>
            Kalau tambahannya <strong>terus membesar</strong>, grafiknya melengkung ke atas.
          </li>
        </ul>
        <p>
          Untuk y = x², tambahannya 1, 3, 5, 7, … Bilangan ganjil ini muncul karena x² adalah luas
          persegi: memperbesar persegi n×n menjadi (n+1)×(n+1) memerlukan tambahan berbentuk huruf L
          berisi n + n + 1 = 2n + 1 kotak.
        </p>
        <p style={{ textAlign: 'center' }}>(n + 1)² − n² = 2n + 1</p>
        <h4>Ciri khas fungsi kuadrat</h4>
        <p>
          Selisih pertamanya berubah, tetapi <strong>selisih keduanya tetap</strong>, yaitu 2a (bila
          x naik 1 demi 1). Ini alat yang praktis: kalau kamu diberi tabel nilai dengan x yang
          berjarak sama dan selisih keduanya konstan tetapi bukan nol, nilai-nilai itu mengikuti pola
          fungsi kuadrat. Kalau selisih keduanya 0, polanya linear.
        </p>
        <h4>Peran a, b, dan c</h4>
        <ul>
          <li>a menentukan lengkungan dan arah bukaan (ke atas bila positif, ke bawah bila negatif);</li>
          <li>
            b memindahkan puncaknya ke samping sekaligus naik-turun tanpa mengubah bentuk kurva —
            puncaknya berada di x = −b/2a;
          </li>
          <li>
            c menggeser kurva naik atau turun, karena c ditambahkan pada setiap nilai y; c juga
            merupakan nilai y saat x = 0.
          </li>
        </ul>
        <p>
          Pada eksperimen, garis putus-putus biru adalah y = bx + c. Jarak tegak dari garis itu ke
          kurva tepat sama dengan a × x² — itulah sebabnya b dan c hanya memindahkan kurva,
          sedangkan bentuk lengkungnya seluruhnya milik a.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Gagasan "selisih" adalah bentuk diskret dari turunan. Untuk f(x) = x², selisih pada
          langkah h adalah
        </p>
        <p style={{ textAlign: 'center' }}>
          f(x + h) − f(x) = 2xh + h²
        </p>
        <p>
          Untuk h = 1 diperoleh 2x + 1 — persis bilangan ganjil pada tabel. Membaginya dengan h lalu
          mengambil limit h → 0 memberi f′(x) = 2x: kemiringannya berubah dari titik ke titik, dan
          itulah cara formal mengatakan bahwa grafiknya bukan garis lurus.
        </p>
        <p>
          Selisih kedua bersesuaian dengan turunan kedua: f″(x) = 2a untuk f(x) = ax² + bx + c.
          Karena f″ konstan dan tidak pernah nol (asalkan a ≠ 0), kurvanya tidak pernah berubah arah
          kecekungan — parabola selalu cekung ke satu arah saja.
        </p>
        <p>
          Menuliskan ulang dalam bentuk kuadrat sempurna, y = a(x + b/2a)² + (c − b²/4a),
          memperlihatkan bahwa setiap parabola adalah y = ax² yang dipindahkan: b dan c hanya
          menentukan letaknya, sedangkan lebar dan arah bukaannya ditentukan oleh a saja. Lebih jauh
          lagi, y = ax² sendiri adalah y = x² yang diperbesar atau diperkecil seragam dengan faktor
          1/|a| (lalu dicerminkan terhadap sumbu x bila a negatif), sehingga semua parabola sebangun.
        </p>
      </>
    ),
  },

  rumus: {
    src: 'y = [a:a][x2:x^2] + bx + c,  selisih ke-2 = [selisih:2a]',
    roles: { a: 'a', x2: 'b', selisih: 'ab', lurus: 'c' },
    arti: {
      a: 'Menentukan seberapa cepat tambahannya berubah: membesar bila a positif, mengecil bila a negatif. Makin besar |a|, makin curam lengkungnya.',
      x2: 'Bagian kuadrat. Tanpa suku ini, grafiknya kembali menjadi garis lurus.',
      selisih:
        'Selisih dari selisih — untuk x yang naik 1 demi 1 nilainya tetap 2a dan bukan nol, dan inilah tanda pengenal fungsi kuadrat.',
      lurus:
        'Bagian lurusnya, yaitu garis y = bx + c. Bagian ini hanya memindahkan kurva; kurva selalu berada a × x² di atas garis itu.',
    },
  },

  soal: [
    {
      id: 'par-1',
      tipe: 'pilihan',
      topicId: 'smp9-fungsi-kuadrat-dan-grafik-parabola',
      kelas: 9,
      tingkat: 'mudah',
      konsep: 'parabola',
      pertanyaan:
        'Untuk x = 0, 1, 2, 3, 4, sebuah tabel menunjukkan nilai y berturut-turut: 3, 5, 9, 15, 23. Fungsi seperti apa ini?',
      pilihan: [
        { id: 'a', label: 'Kuadrat, karena selisih keduanya tetap', benar: true },
        {
          id: 'b',
          label: 'Linear, karena nilainya terus naik',
          diagnosa:
            'Naik terus belum tentu linear. Yang menandai linear adalah selisih PERTAMA yang tetap, dan di sini selisihnya 2, 4, 6, 8 — berubah.',
        },
        {
          id: 'c',
          label: 'Bukan keduanya, karena selisihnya berubah',
          diagnosa:
            'Selisih pertama memang berubah, tetapi coba hitung selisih dari selisih itu: 2, 2, 2 — tetap.',
        },
      ],
      hint: [
        'Hitung dulu selisih antar nilai berurutan.',
        'Selisihnya 2, 4, 6, 8. Apakah itu tetap?',
        'Sekarang hitung selisih dari selisih tadi.',
      ],
      pembahasan:
        'Selisih pertama: 2, 4, 6, 8 (berubah). Selisih kedua: 2, 2, 2 (tetap dan bukan nol). Untuk x yang berjarak sama, selisih kedua yang tetap dan bukan nol adalah tanda fungsi kuadrat. Karena x naik 1 demi 1, 2a = 2 sehingga a = 1. Memang, y = x² + x + 3 menghasilkan tepat kelima nilai itu.',
    },
    (rnd) => {
      const a = 1 + Math.floor(rnd() * 3)
      const x = 2 + Math.floor(rnd() * 5)
      return {
        id: 'par-2',
        tipe: 'angka',
        topicId: 'smp9-fungsi-kuadrat-dan-grafik-parabola',
        kelas: 9,
        tingkat: 'mudah',
        konsep: 'parabola',
        pertanyaan: `Diketahui y = ${a === 1 ? '' : a}x². Berapa nilai y ketika x = ${x}?`,
        jawaban: a * x * x,
        toleransi: 1e-9,
        hint: [
          'Kerjakan pangkatnya lebih dulu, baru kalikan dengan koefisiennya.',
          `${x}² = ${x * x}.`,
          `Lalu ${a} × ${x * x}.`,
        ],
        pembahasan: `y = ${a} × ${x}² = ${a} × ${x * x} = ${a * x * x}. Perhatikan urutannya: kuadratkan dulu, baru kalikan.`,
      }
    },
    {
      id: 'par-3',
      tipe: 'benar-salah',
      topicId: 'smp9-fungsi-kuadrat-dan-grafik-parabola',
      kelas: 9,
      tingkat: 'sedang',
      konsep: 'parabola',
      pertanyaan: 'Mengubah nilai c pada y = ax² + bx + c akan mengubah bentuk lengkungan grafiknya.',
      jawaban: false,
      diagnosa:
        'Nilai c hanya menambah bilangan yang sama pada setiap nilai y, sehingga seluruh kurva bergeser naik atau turun tanpa berubah bentuk.',
      hint: [
        'Coba geser c pada eksperimen dan perhatikan apa yang berubah.',
        'Kalau semua nilai y ditambah bilangan yang sama, apakah selisihnya berubah?',
        'Bentuk lengkungan ditentukan oleh selisih kedua, yaitu 2a.',
      ],
      pembahasan:
        'Salah. Nilai c hanya menggeser kurva secara tegak. Lengkungannya ditentukan oleh a saja, karena selisih kedua bernilai 2a.',
    },
    {
      id: 'par-4',
      tipe: 'urutkan',
      topicId: 'smp9-fungsi-kuadrat-dan-grafik-parabola',
      kelas: 9,
      tingkat: 'sedang',
      konsep: 'parabola',
      pertanyaan: 'Susun alasan kenapa grafik y = x² melengkung.',
      langkah: [
        'Hitung nilai y untuk x = 0, 1, 2, 3, 4',
        'Cari selisih antar nilai: 1, 3, 5, 7',
        'Selisihnya tidak tetap, melainkan terus membesar',
        'Karena tambahannya makin besar, kemiringannya makin curam',
        'Kemiringan yang berubah menghasilkan garis melengkung',
      ],
      hint: [
        'Mulailah dari data, bukan dari kesimpulan.',
        'Kesimpulan tentang bentuk grafik baru bisa diambil setelah polanya terlihat.',
      ],
      pembahasan:
        'Bentuk grafik ditentukan oleh perubahan nilainya. Selisih yang tetap menghasilkan garis lurus; selisih yang membesar menghasilkan lengkung.',
    },
    (rnd) => {
      const a = [1, 2, 3][Math.floor(rnd() * 3)]
      const b = -(2 + Math.floor(rnd() * 6)) * a * 2
      return {
        id: 'par-5',
        tipe: 'angka',
        topicId: 'smp9-fungsi-kuadrat-dan-grafik-parabola',
        kelas: 10,
        tingkat: 'sulit',
        konsep: 'parabola',
        pertanyaan: `Tentukan absis (nilai x) titik puncak dari y = ${a === 1 ? '' : a}x² ${b >= 0 ? '+' : '−'} ${Math.abs(b)}x + 5.`,
        jawaban: -b / (2 * a),
        toleransi: 1e-6,
        hint: [
          'Titik puncak parabola berada tepat di tengah, pada sumbu simetrinya.',
          'Rumus sumbu simetri: x = −b / (2a).',
          `Di sini a = ${a} dan b = −${Math.abs(b)}.`,
        ],
        pembahasan: `x = −b/(2a) = −(−${Math.abs(b)})/(2 × ${a}) = ${fmt(-b / (2 * a))}. Nilai c tidak berpengaruh terhadap letak puncak secara mendatar.`,
      }
    },
  ],

  lanjut: ['kuadrat-jumlah', 'turunan-kemiringan', 'timbangan-persamaan'],
}

export default konsep
