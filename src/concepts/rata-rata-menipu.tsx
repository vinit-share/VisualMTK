/* ============================================================
   KONSEP — Kenapa rata-rata bisa menipu?
   Kelas 10 · Analisis Data dan Peluang

   Gagasan: rata-rata adalah TITIK SEIMBANG data — persis seperti
   titik tumpu jungkat-jungkit. Karena keseimbangan memperhitungkan
   JARAK, satu nilai yang jauh sanggup menyeret titik tumpu itu
   menjauh. Median hanya menghitung URUTAN, jadi ia tidak bergeming.

   Pernyataan "rata-rata adalah titik seimbang" bukan analogi
   longgar: jumlah simpangan terhadap rata-rata memang selalu nol.

   Interaksi langsung (docs/PANDUAN-INTERAKSI.md):
   - Nilai data ke-10 diubah dengan MENYERET titik datanya sendiri
     di sepanjang garis bilangan. Tumpu, lengan simpangan, dan
     penanda pada sumbu ikut bergerak seketika.
   - Angkanya dibaca pada GARIS BILANGAN, tepat di bawah titiknya,
     bukan pada keping yang melayang di dekat jari. Karena itu
     pegangannya memakai labelSelalu tanpa label: keping ajakan
     bawaan mesin ("Coba geser aku") ditaruh di BAWAH pegangan, dan
     di sana ia tidak pernah muat — di HP titiknya sanggup menyentuh
     tepi bingkai, dan saat titik itu diparkir di rak keping tersebut
     menimpa label median, yaitu justru angka yang jadi inti konsep.
     Ajakan menyeretnya tetap ada lewat denyut, panah dua arah,
     kalimat ajakan di atas gambar, dan narasi langkah 3.
   - "Ikutkan data ke-10" adalah nilai biner, jadi wajarnya diketuk:
     TombolGambar di dalam gambar mengangkat titik itu ke rak
     "di luar hitungan" — sama seperti mengangkat beban dari papan
     jungkat-jungkit, sehingga tumpu kembali ke tempatnya semula.
     Di rak, titiknya masih bisa diseret, jadi anak tidak pernah
     kehilangan pegangan pada nilainya.
   ============================================================ */

import { Pegangan, TombolGambar } from '../components/Interaksi'
import { Svg, Tag, useSempit, useUkuranLayar } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

const DASAR = [3, 4, 4, 5, 5, 5, 6, 6, 7]

/** Rentang garis bilangan. Harus memuat nilai penggeser terbesar (40). */
const XMIN = 0
const XMAX = 42
const ANGKA_SUMBU = [0, 6, 12, 18, 24, 30, 36, 42]

const rerata = (d: number[]) => d.reduce((a, b) => a + b, 0) / d.length

function median(d: number[]) {
  const s = [...d].sort((a, b) => a - b)
  const m = Math.floor(s.length / 2)
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}

/** Semua modus data. Bisa lebih dari satu (data bimodal), misalnya bila data ke-10 bernilai 4. */
function modus(d: number[]) {
  const hitung = new Map<number, number>()
  for (const v of d) hitung.set(v, (hitung.get(v) ?? 0) + 1)
  const maks = Math.max(...hitung.values())
  return [...hitung]
    .filter(([, n]) => n === maks)
    .map(([v]) => v)
    .sort((a, b) => a - b)
}

/* ---------------- Dua tata letak: lebar dan HP tegak ---------------- */

interface Tata {
  w: number
  h: number
  maxH: number
  /** ujung kiri dan kanan garis bilangan. */
  gx0: number
  gx1: number
  /** garis papan jungkat-jungkit. */
  papanY: number
  /** titik data terbawah sejauh ini di atas papan, lalu jarak antar tumpukan. */
  dotAtas: number
  tumpukan: number
  rDot: number
  rPencil: number
  /** tinggi garis median di atas papan. */
  medTinggi: number
  tumpuTinggi: number
  tumpuLebar: number
  /** kemiringan papan paling besar, derajat. Dijaga agar ujung papan tidak
      pernah menyentuh garis bilangan di bawahnya. */
  miringMaks: number
  /** jarak garis bilangan, angka sumbu, dan label rata-rata dari papan. */
  dSumbu: number
  dAngka: number
  dMean: number
  angkaSize: number
  meanSize: number
  judulY: number
  judulSize: number
  sempit: boolean
}

interface TataEks extends Tata {
  /** rak "di luar hitungan" tempat data ke-10 diparkir. */
  rakY: number
  judulX: number
  judulAnchor: 'start' | 'middle'
  tombolX: number
  tombolY: number
}

const tataBongkar = (sempit: boolean): Tata =>
  sempit
    ? {
        w: 420, h: 470, maxH: 430, gx0: 38, gx1: 396, papanY: 320,
        dotAtas: 20, tumpukan: 26, rDot: 8, rPencil: 10, medTinggi: 130,
        tumpuTinggi: 46, tumpuLebar: 18, miringMaks: 5,
        dSumbu: 58, dAngka: 82, dMean: 110, angkaSize: 13, meanSize: 15,
        judulY: 38, judulSize: 14, sempit: true,
      }
    : {
        w: 690, h: 440, maxH: 440, gx0: 70, gx1: 650, papanY: 300,
        dotAtas: 16, tumpukan: 22, rDot: 8, rPencil: 10, medTinggi: 120,
        tumpuTinggi: 40, tumpuLebar: 16, miringMaks: 4.5,
        dSumbu: 52, dAngka: 76, dMean: 106, angkaSize: 12, meanSize: 16,
        judulY: 42, judulSize: 16, sempit: false,
      }

const tataEks = (sempit: boolean): TataEks =>
  sempit
    ? {
        w: 420, h: 530, maxH: 440, gx0: 38, gx1: 396, papanY: 350,
        dotAtas: 20, tumpukan: 24, rDot: 7, rPencil: 9, medTinggi: 160,
        tumpuTinggi: 46, tumpuLebar: 18, miringMaks: 5,
        dSumbu: 58, dAngka: 80, dMean: 112, angkaSize: 13, meanSize: 15,
        judulY: 26, judulSize: 14, sempit: true,
        rakY: 112, judulX: 210, judulAnchor: 'middle', tombolX: 326, tombolY: 484,
      }
    : {
        w: 690, h: 470, maxH: 460, gx0: 70, gx1: 650, papanY: 300,
        dotAtas: 16, tumpukan: 22, rDot: 8, rPencil: 10, medTinggi: 136,
        tumpuTinggi: 40, tumpuLebar: 16, miringMaks: 4.5,
        dSumbu: 52, dAngka: 76, dMean: 106, angkaSize: 12, meanSize: 15,
        judulY: 44, judulSize: 15, sempit: false,
        rakY: 112, judulX: 345, judulAnchor: 'middle', tombolX: 581, tombolY: 418,
      }

/** Nilai data → x pada garis bilangan. Semua gambar memakai ini. */
const posX = (L: Tata, v: number) => L.gx0 + ((v - XMIN) / (XMAX - XMIN)) * (L.gx1 - L.gx0)

/** Kebalikan tepat dari posX: x jari → nilai data. */
const keNilai = (L: Tata, x: number) => XMIN + ((x - L.gx0) / (L.gx1 - L.gx0)) * (XMAX - XMIN)

type Ukuran = (px: number, cadangan?: number) => number

/**
 * Perkiraan lebar kotak Tag pada skala layar sekarang — rumusnya sama dengan
 * `Tag` di Stage.tsx, termasuk pembesaran huruf di layar kecil. Dipakai supaya
 * label rata-rata dan median tidak pernah terpotong tepi bingkai.
 */
function lebarTag(teks: string, size: number, uu: Ukuran) {
  const ukuran = Math.max(size, Math.min(size * 1.6, uu(11, 11)))
  return teks.length * ukuran * 0.58 + (14 * ukuran) / size
}

/** Geser label secukupnya supaya kotaknya tetap di dalam bingkai. */
const xAman = (L: Tata, x: number, lebar: number) =>
  clamp(x, Math.min(L.w / 2, lebar / 2 + 4), Math.max(L.w / 2, L.w - lebar / 2 - 4))

/** Tinggi tumpukan titik data ke-10 bila nilainya sama dengan data yang sudah ada. */
const tingkatPencilan = (v: number) => DASAR.filter((d) => d === v).length

const dotY = (L: Tata, k: number) => L.papanY - L.dotAtas - k * L.tumpukan

/* ---------------- Turunan yang dipakai bersama gambar dan teks ---------------- */

/** Nilai data ke-10 pada panggung bongkar — persis nilai yang digambar. */
const pencilanBongkar = (p: Record<string, number>) => clamp(Math.round(p.pencilan ?? 35), 8, 40)

/**
 * Batas pencilan untuk sembilan data dasar: Q3 + 1,5 × (Q3 − Q1) = 6 + 1,5 × 2 = 9.
 * Di atas angka ini data ke-10 memang pantas disebut ekstrem; tepat di 8 atau 9
 * ia hanya data terbesar biasa, jadi kata-katanya pun harus ikut berubah.
 */
const PAGAR_PENCILAN = 9

/** Semua angka yang dipakai judul dan narasi langkah bongkar. */
function angkaBongkar(p: Record<string, number>) {
  const x = pencilanBongkar(p)
  const meanDasar = rerata(DASAR)
  const meanPenuh = rerata([...DASAR, x])
  return {
    x,
    meanDasar,
    meanPenuh,
    /** geseran titik tumpu: tepat sepersepuluh jarak data ke-10 ke rata-rata lama. */
    geser: meanPenuh - meanDasar,
    /** median data lengkap — tetap, karena data ke-10 selalu jatuh di kanan. */
    med: median([...DASAR, x]),
    /** banyaknya data dasar yang nilainya di bawah rata-rata baru. */
    dibawah: DASAR.filter((v) => v < meanPenuh).length,
    ekstrem: x > PAGAR_PENCILAN,
  }
}

/** Nilai eksperimen — sumber tunggal untuk gambar, rumus hidup, dan temuan. */
function bacaEksperimen(p: Record<string, number>) {
  const pencilan = clamp(Math.round(p.pencilan ?? 20), 0, 40)
  const pakai = (p.pakai ?? 1) > 0.5
  const data = pakai ? [...DASAR, pencilan] : DASAR
  return {
    pencilan,
    pakai,
    data,
    jumlah: data.reduce((a, b) => a + b, 0),
    mean: rerata(data),
    med: median(data),
    mod: modus(data),
  }
}

/* ---------------- Bagian gambar ---------------- */

function TitikData({
  L,
  data,
  pencilan,
}: {
  L: Tata
  data: number[]
  /** nilai data ke-10 bila ia ikut digambar di atas papan. */
  pencilan: number | null
}) {
  const tumpuk = new Map<number, number>()
  return (
    <g>
      {data.map((v, i) => {
        const k = tumpuk.get(v) ?? 0
        tumpuk.set(v, k + 1)
        const ini = pencilan !== null && v === pencilan && i === data.length - 1
        return (
          <circle
            key={i}
            cx={posX(L, v)}
            cy={dotY(L, k)}
            r={ini ? L.rPencil : L.rDot}
            fill={ini ? 'var(--m-hi)' : 'var(--m-a)'}
            fillOpacity={ini ? 0.9 : 0.62}
            stroke={ini ? 'var(--m-hi)' : 'var(--m-a)'}
            strokeWidth={ini ? 2.5 : 1.6}
          />
        )
      })}
    </g>
  )
}

function Jungkat({
  L,
  data,
  mean,
  miring,
  tampilLengan,
  nyalaLengan = false,
}: {
  L: Tata
  data: number[]
  mean: number
  /** kemiringan papan, 0 = seimbang. */
  miring: number
  tampilLengan: number
  /** nyalakan lengan simpangan saat bagian rumus "jarak" disorot. */
  nyalaLengan?: boolean
}) {
  const fx = posX(L, mean)
  const y = L.papanY
  return (
    <g>
      {/* lengan simpangan: jarak tiap data ke titik tumpu */}
      {tampilLengan > 0.02 &&
        data.map((v, i) => (
          <line
            key={i}
            x1={posX(L, v)}
            y1={y + 6}
            x2={fx}
            y2={y + 6}
            stroke={nyalaLengan ? 'var(--m-hi)' : v > mean ? 'var(--m-b)' : 'var(--m-c)'}
            strokeWidth={nyalaLengan ? 3 : 1.4}
            opacity={(nyalaLengan ? 0.9 : 0.35) * tampilLengan}
          />
        ))}

      <g transform={`rotate(${miring.toFixed(2)} ${fx.toFixed(1)} ${y})`}>
        <rect x={L.gx0 - 10} y={y - 4} width={L.gx1 - L.gx0 + 20} height={8} rx={4} fill="var(--ink-2)" />
      </g>
      {/* titik tumpu */}
      <path
        d={`M ${fx} ${y + 6} L ${fx - L.tumpuLebar} ${y + L.tumpuTinggi} L ${fx + L.tumpuLebar} ${
          y + L.tumpuTinggi
        } Z`}
        fill="var(--m-ab)"
        stroke="var(--m-ab)"
        strokeWidth={2}
      />
    </g>
  )
}

/**
 * Garis bilangan. Nilai data ke-10 dibacakan langsung di sumbu, tepat di bawah
 * titiknya — juga selama titiknya diseret, supaya angkanya tidak pernah lepas
 * dari objeknya. Angka sumbu yang tertutup penanda itu disembunyikan supaya
 * tidak bertabrakan.
 */
function GarisAngka({ L, tanda, redup = false }: { L: Tata; tanda: number | null; redup?: boolean }) {
  const uu = useUkuranLayar()
  const y = L.papanY + L.dSumbu
  const yAngka = L.papanY + L.dAngka
  const tx = tanda === null ? null : posX(L, tanda)
  // Jarak aman antara angka sumbu dan penanda data ke-10, dihitung dari ukuran
  // huruf di layar — di layar kecil huruf Tag diperbesar, jadi jaraknya ikut.
  const jarakAman = Math.max(36, uu(32, 32))
  return (
    <g>
      <line x1={L.gx0} y1={y} x2={L.gx1} y2={y} stroke="var(--m-axis)" strokeWidth={1.5} />
      {ANGKA_SUMBU.map((v) => {
        const x = posX(L, v)
        const tertutup = tx !== null && Math.abs(x - tx) < jarakAman
        return (
          <g key={v}>
            <line x1={x} y1={y - 6} x2={x} y2={y + 6} stroke="var(--m-axis)" strokeWidth={1.3} />
            {!tertutup && (
              <Tag x={x} y={yAngka} size={L.angkaSize} warna="var(--ink-soft)" latar={null} tebal={700}>
                {fmt(v)}
              </Tag>
            )}
          </g>
        )
      })}
      {tx !== null && (
        <g opacity={redup ? 0.45 : 1}>
          <line x1={tx} y1={y - 8} x2={tx} y2={y + 8} stroke="var(--m-hi)" strokeWidth={3} />
          <Tag x={tx} y={yAngka} size={L.angkaSize + 1} warna="var(--m-hi)" latar={null}>
            {fmt(tanda as number)}
          </Tag>
        </g>
      )}
    </g>
  )
}

function PenandaMedian({ L, med, nyala, opacity = 1 }: { L: Tata; med: number; nyala: boolean; opacity?: number }) {
  const uu = useUkuranLayar()
  const x = posX(L, med)
  const warna = nyala ? 'var(--m-hi)' : 'var(--m-b)'
  const teks = `median ${fmt(med, 2)}`
  return (
    <g opacity={opacity}>
      <line
        x1={x}
        y1={L.papanY - L.medTinggi}
        x2={x}
        y2={L.papanY + 6}
        stroke={warna}
        strokeWidth={nyala ? 3.4 : 2.2}
        strokeDasharray="6 5"
      />
      <Tag x={xAman(L, x, lebarTag(teks, 15, uu))} y={L.papanY - L.medTinggi - 18} warna={warna} size={15}>
        {teks}
      </Tag>
    </g>
  )
}

/** Label rata-rata, menempel pada titik tumpu tetapi tidak pernah terpotong tepi. */
function PenandaMean({
  L,
  mean,
  teks,
  nyala,
}: {
  L: Tata
  mean: number
  teks: string
  nyala: boolean
}) {
  const uu = useUkuranLayar()
  return (
    <Tag
      x={xAman(L, posX(L, mean), lebarTag(teks, L.meanSize, uu))}
      y={L.papanY + L.dMean}
      warna={nyala ? 'var(--m-hi)' : 'var(--m-ab)'}
      size={L.meanSize}
    >
      {teks}
    </Tag>
  )
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const sempit = useSempit()
  const L = tataBongkar(sempit)
  const { x: pencilan, meanDasar, meanPenuh, ekstrem } = angkaBongkar(p)

  const adaPencilan = step >= 3
  const data = adaPencilan ? [...DASAR, pencilan] : DASAR

  // Urutan fisikanya: pencilan masuk (langkah 3) → papan miring karena tumpu
  // masih di rata-rata lama → tumpu digeser ke rata-rata baru dan papan
  // datar lagi (langkah 4). Papan tidak boleh miring saat tumpu sudah di rata-rata.
  const geser = step === 4 ? seg(t, 0.35, 1) : step >= 5 ? 1 : 0
  const mean = meanDasar + (meanPenuh - meanDasar) * geser
  // Selama tumpu belum sampai, posisinya belum rata-rata data yang sekarang.
  const labelTumpu = adaPencilan && geser < 1 ? (sempit ? 'tumpu' : 'titik tumpu') : 'rata-rata'
  const med = median(data)

  const tampilTumpu = fase(step, t, 1)
  const tampilMedian = fase(step, t, 2)
  const tampilLengan = fase(step, t, 1)
  const miring = step === 4 ? L.miringMaks * (t < 0.35 ? seg(t, 0, 0.3) : 1 - seg(t, 0.35, 1)) : 0

  const nyalaMean = sorot === 'mean'
  const nyalaMedian = sorot === 'median'

  const judul = (() => {
    if (step === 0) return sempit ? 'sembilan data berdekatan' : 'sembilan data, semuanya berdekatan'
    if (step === 1)
      return sempit ? 'rata-rata = titik tumpu' : 'rata-rata adalah titik tumpu yang membuat papan seimbang'
    if (step === 2) return sempit ? 'median = tengah urutan' : 'median adalah nilai yang berada tepat di tengah urutan'
    if (step === 3) {
      const inti = ekstrem ? 'masuk satu data ekstrem' : 'masuk satu data baru'
      return `${inti}: ${fmt(pencilan)}`
    }
    if (step === 4)
      return sempit ? 'papan miring, tumpu bergeser' : 'papan langsung miring — titik tumpu harus digeser ke kanan'
    return sempit
      ? `rata-rata ${fmt(meanPenuh, 2)} · median ${fmt(med, 2)}`
      : `rata-rata pindah ke ${fmt(meanPenuh, 2)}, median tetap ${fmt(med, 2)}`
  })()

  const warnaJudul =
    step === 0 ? 'var(--ink-2)' : step === 1 ? 'var(--m-ab)' : step === 2 ? 'var(--m-b)' : step <= 4 ? 'var(--m-hi)' : 'var(--m-b)'

  return (
    <Svg
      w={L.w}
      h={L.h}
      maxH={L.maxH}
      label="Titik data pada jungkat-jungkit dengan penanda rata-rata dan median"
    >
      <TitikData L={L} data={data} pencilan={adaPencilan ? pencilan : null} />
      {tampilTumpu > 0.05 ? (
        <Jungkat
          L={L}
          data={data}
          mean={mean}
          miring={miring}
          tampilLengan={tampilLengan}
          nyalaLengan={sorot === 'jarak'}
        />
      ) : (
        <rect
          x={L.gx0 - 10}
          y={L.papanY - 4}
          width={L.gx1 - L.gx0 + 20}
          height={8}
          rx={4}
          fill="var(--ink-3)"
        />
      )}
      <GarisAngka L={L} tanda={adaPencilan ? pencilan : null} />

      {/* penanda rata-rata, menempel pada titik tumpu */}
      {tampilTumpu > 0.3 && (
        <PenandaMean L={L} mean={mean} teks={`${labelTumpu} ${fmt(mean, 2)}`} nyala={nyalaMean} />
      )}

      {tampilMedian > 0.3 && <PenandaMedian L={L} med={med} nyala={nyalaMedian} opacity={tampilMedian} />}

      <Tag x={L.w / 2} y={L.judulY} warna={warnaJudul} size={L.judulSize}>
        {judul}
      </Tag>

      {/* Data ke-10 dipegang langsung di titiknya dan diseret sepanjang garis
          bilangan. Sebelum langkah 3 titiknya belum ada, jadi pegangan
          disembunyikan. labelSelalu tanpa label: angkanya sudah terbaca di
          garis bilangan tepat di bawah titik ini, sedangkan keping ajakan
          bawaan mesin tidak muat di bawah pegangan (lihat catatan kepala
          berkas). Denyut dan panah dua arah tetap mengajak menyeret. */}
      <Pegangan
        x={posX(L, pencilan)}
        y={dotY(L, tingkatPencilan(pencilan))}
        param="pencilan"
        arah="x"
        utama
        labelSelalu
        sembunyi={!adaPencilan}
        keNilai={(pt) => keNilai(L, pt.x)}
      />
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const sempit = useSempit()
  const L = tataEks(sempit)
  const { pencilan, pakai, data, mean, med, mod } = bacaEksperimen(p)

  const px = posX(L, pencilan)
  const yTitik = pakai ? dotY(L, tingkatPencilan(pencilan)) : L.rakY

  return (
    <Svg
      w={L.w}
      h={L.h}
      maxH={L.maxH}
      label="Titik data yang bisa diseret beserta rata-rata, median, dan modusnya"
    >
      {/* rak "di luar hitungan": tempat data ke-10 diparkir */}
      <line
        x1={L.gx0}
        y1={L.rakY}
        x2={L.gx1}
        y2={L.rakY}
        stroke="var(--m-axis)"
        strokeWidth={1.4}
        strokeDasharray="5 6"
        opacity={pakai ? 0.22 : 0.6}
      />
      {!pakai && (
        <circle
          cx={px}
          cy={L.rakY}
          r={L.rPencil}
          fill="none"
          stroke="var(--m-hi)"
          strokeWidth={2.5}
          strokeDasharray="4 3"
        />
      )}

      <TitikData L={L} data={data} pencilan={pakai ? pencilan : null} />
      <Jungkat L={L} data={data} mean={mean} miring={0} tampilLengan={1} nyalaLengan={sorot === 'jarak'} />
      <GarisAngka L={L} tanda={pencilan} redup={!pakai} />

      <PenandaMean L={L} mean={mean} teks={`rata-rata ${fmt(mean, 2)}`} nyala={sorot === 'mean'} />
      <PenandaMedian L={L} med={med} nyala={sorot === 'median'} />

      {/* Satu baris keterangan di atas: modus sekaligus keadaan data ke-10,
          supaya rak tidak perlu label sendiri yang bisa ditabrak titiknya. */}
      <Tag
        x={L.judulX}
        y={L.judulY}
        anchor={L.judulAnchor}
        warna={pakai ? 'var(--ink-2)' : 'var(--m-hi)'}
        size={L.judulSize}
      >
        {pakai
          ? `modus ${mod.map((v) => fmt(v)).join(' dan ')} — tumpukan tertinggi`
          : `data ke-10 di luar hitungan · modus ${mod.map((v) => fmt(v)).join(' dan ')}`}
      </Tag>

      {/* Nilai biner lebih wajar diketuk daripada diseret: satu ketukan
          mengangkat data ke-10 ke rak, satu ketukan lagi menurunkannya. */}
      <TombolGambar
        x={L.tombolX}
        y={L.tombolY}
        param="pakai"
        ubah={(v) => (v > 0.5 ? 0 : 1)}
        label={pakai ? (sempit ? 'Angkat' : 'Angkat ke rak') : sempit ? 'Turunkan' : 'Turunkan lagi'}
      />

      {/* Titik data ke-10 sendiri: diseret sepanjang garis bilangan, baik saat
          ikut dihitung maupun saat sedang diparkir di rak. labelSelalu tanpa
          label karena angkanya sudah terbaca di garis bilangan, dan karena
          keping ajakan bawaan mesin — yang ditaruh di BAWAH pegangan — akan
          menimpa label median setiap kali titik ini diparkir di rak. */}
      <Pegangan
        x={px}
        y={yTitik}
        param="pencilan"
        arah="x"
        utama
        labelSelalu
        keNilai={(pt) => keNilai(L, pt.x)}
      />
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'rata-rata-menipu',
  topicId: 'sma10-ukuran-pemusatan-data-mean-median',
  judul: 'Rata-rata, median, modus',
  pertanyaan: 'Kenapa rata-rata bisa menipu?',
  tagline: 'Satu angka ekstrem sanggup menyeret rata-rata menjauh dari kenyataan.',
  kelas: 10,
  domain: 'data',
  tags: ['rata-rata', 'median', 'modus', 'pencilan', 'statistika'],

  tebak: {
    pertanyaan:
      'Di sebuah warung, sembilan pegawai bergaji antara 3 dan 7 juta, rata-ratanya 5 juta. Lalu pemiliknya, yang bergaji 35 juta, ikut dihitung. Apa yang terjadi pada rata-rata gaji?',
    pilihan: [
      {
        id: 'a',
        label: 'Naik sedikit saja',
        balasan:
          'Kalau yang dihitung hanya urutan, memang begitu. Tetapi rata-rata memperhitungkan JARAK, dan jarak 35 dari kelompok itu sangat jauh.',
      },
      {
        id: 'b',
        label: 'Naik jauh, sampai di atas gaji hampir semua orang',
        benar: true,
        balasan:
          'Betul. Rata-ratanya melompat menjadi 8 juta — padahal sembilan dari sepuluh orang bergaji di bawah itu.',
      },
      {
        id: 'c',
        label: 'Tidak berubah, karena hanya satu orang',
        balasan:
          'Median-lah yang nyaris tidak berubah. Rata-rata justru sangat peka terhadap satu nilai yang jauh.',
      },
    ],
    penutup:
      'Kalimat "rata-rata gaji di sini 8 juta" bisa benar secara hitungan, tetapi menyesatkan sebagai gambaran.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      {
        key: 'pencilan',
        label: 'Nilai data ke-10',
        min: 8,
        max: 40,
        step: 1,
        awal: 35,
        bulat: true,
        simbol: 'x₁₀',
        peran: 'hi',
        bagian: 'jarak',
      },
    ],
    roles: { mean: 'ab', median: 'b', jarak: 'hi' },
    arti: {
      mean: 'Rata-rata — titik tumpu yang membuat data seimbang.',
      median: 'Median — nilai yang berada tepat di tengah setelah data diurutkan.',
      jarak: 'Jarak tiap data dari titik tumpu. Inilah yang membuat rata-rata peka terhadap pencilan.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Sekumpulan data',
        narasi:
          'Sembilan nilai, semuanya berdekatan antara 3 dan 7. Belum ada satu pun yang menonjol.',
        durasi: 2000,
      },
      {
        id: 's1',
        judul: 'Rata-rata adalah titik seimbang',
        narasi:
          'Bayangkan data ini sebagai beban di atas papan jungkat-jungkit. Titik tumpu yang membuatnya datar berada tepat di rata-rata.',
        rumus: '[mean:x̄] = jumlah data ÷ banyak data',
        durasi: 2600,
      },
      {
        id: 's2',
        judul: 'Median adalah yang di tengah urutan',
        narasi:
          'Median tidak peduli seberapa besar nilainya. Ia hanya menghitung posisi: separuh data ada di kiri, separuh di kanan.',
        durasi: 2400,
      },
      {
        id: 's3',
        judul: (p) => {
          const { x, ekstrem } = angkaBongkar(p)
          return ekstrem ? `Masuk satu nilai ekstrem: ${fmt(x)}` : `Masuk satu data baru: ${fmt(x)}`
        },
        narasi: (p) => {
          const { x, ekstrem } = angkaBongkar(p)
          // Jarak ke data terbesar (x − 7) BUKAN jarak yang dihitung rata-rata; itu jarak ke
          // titik tumpu (x − 5), yang baru dibahas di langkah berikutnya. Jangan disamakan.
          const masuk = `Titik merah muda itu data ke-10, bernilai ${fmt(x)} — ${fmt(x - 7)} satuan di atas data terbesar tadi.`
          return ekstrem
            ? `${masuk} Seret titik itu sepanjang garis bilangan: cuma satu data, tetapi letaknya jauh dari kelompoknya, dan rata-rata memperhitungkan jarak.`
            : `${masuk} Seret titik itu menjauh ke kanan: letaknya masih dekat kelompoknya, tetapi rata-rata tetap memperhitungkan seberapa jauh ia berada.`
        },
        durasi: 2400,
      },
      {
        id: 's4',
        judul: 'Papan langsung miring',
        narasi: (p) => {
          const { x, meanDasar, geser } = angkaBongkar(p)
          return (
            `Data baru itu duduk ${fmt(x - meanDasar)} satuan dari tumpu, lebih jauh daripada data mana pun yang lain — di jungkat-jungkit, beban yang jauh menekan lebih kuat. ` +
            `Supaya papannya datar lagi, tumpu harus digeser ${fmt(geser)} satuan ke kanan, yaitu sepersepuluh jarak tadi.`
          )
        },
        rumus: 'pengaruh = banyaknya × [jarak:jarak]',
        durasi: 2800,
      },
      {
        id: 's5',
        judul: 'Rata-rata pindah, median tidak',
        narasi: (p) => {
          const { meanDasar, meanPenuh, med, dibawah } = angkaBongkar(p)
          const banding =
            dibawah === 9
              ? 'lebih tinggi daripada kesembilan data lainnya'
              : `lebih tinggi daripada ${fmt(dibawah)} dari 9 data lainnya`
          return (
            `Rata-rata terseret dari ${fmt(meanDasar, 2)} ke ${fmt(meanPenuh, 2)} — ${banding}. ` +
            `Median tidak bergeser sama sekali: posisi tengahnya cuma maju setengah langkah dalam urutan, dan nilainya tetap ${fmt(med, 2)}.`
          )
        },
        durasi: 2600,
      },
      {
        id: 's6',
        judul: 'Jadi mana yang dipakai?',
        narasi:
          'Kalau datanya menyebar rapi, rata-rata baik. Kalau ada pencilan atau data yang menceng, median memberi gambaran yang lebih jujur.',
        rumus: '[mean:rata-rata] peka pada jarak · [median:median] peka pada urutan',
        durasi: 2600,
      },
    ],
  },

  eksperimen: {
    judul: 'Seret sendiri data ke-10',
    ajakan:
      'Seret titik data ke-10 ke kanan dan ke kiri: titik tumpu ikut pindah, garis median tidak bergeming. Ketuk tombol "Angkat" untuk mengeluarkannya dari hitungan, seperti mengangkat beban dari papan.',
    params: [
      {
        key: 'pencilan',
        label: 'Nilai data ke-10',
        min: 0,
        max: 40,
        step: 1,
        awal: 20,
        bulat: true,
        simbol: 'x₁₀',
        peran: 'hi',
        bagian: 'mean',
      },
      {
        key: 'pakai',
        label: 'Ikutkan data ke-10',
        min: 0,
        max: 1,
        step: 1,
        awal: 1,
        bulat: true,
        simbol: 'ikut',
        peran: 'hi',
        bagian: 'mean',
      },
    ],
    Visual: VisualEksperimen,
    rumus: (p) => {
      const { data, jumlah, mean, med } = bacaEksperimen(p)
      return `[mean:x̄] = ${fmt(jumlah)} ÷ ${fmt(data.length)} = ${fmt(mean, 2)} · [median:median] = ${fmt(med, 2)}`
    },
    temuan: (p) => {
      const { pakai, mean, med } = bacaEksperimen(p)
      return (
        <p>
          {pakai ? (
            <>
              <strong>
                Rata-rata {fmt(mean, 2)}, median {fmt(med, 2)}.
              </strong>{' '}
              Menyeret satu titik itu saja menggerakkan rata-rata sebesar sepersepuluh dari
              pergeserannya, tetapi median sama sekali tidak berubah — tetap {fmt(med, 2)}, karena
              dua data di tengah urutan tetap bernilai sama ke mana pun data ke-10 diseret.{' '}
              {mean > 7
                ? 'Perhatikan: rata-rata sekarang lebih besar daripada hampir semua datanya sendiri — itulah bentuk "menipu" yang dimaksud.'
                : 'Coba seret titik itu sampai ke ujung kanan dan lihat rata-rata meninggalkan kelompok datanya.'}
            </>
          ) : (
            <>
              Tanpa data ke-10, rata-rata {fmt(mean, 2)} dan median {fmt(med, 2)} berimpit tepat.
              Itu wajar: datanya menyebar rapi dan simetris, sehingga titik seimbang dan nilai tengahnya
              sama. Ketuk "Turunkan" untuk mengembalikan data ke-10 dari rak ke papan.
            </>
          )}
        </p>
      )
    },
  },

  penjelasan: {
    SMP: (
      <>
        <p>
          Ada tiga cara umum menyebut "nilai yang mewakili" sekumpulan data, dan ketiganya menjawab
          pertanyaan yang berbeda:
        </p>
        <ul>
          <li>
            <strong>Rata-rata</strong> — titik seimbang. Semua nilai ikut menarik, dan yang jauh
            menarik lebih kuat.
          </li>
          <li>
            <strong>Median</strong> — nilai yang berada di tengah setelah diurutkan. Hanya urutan
            yang dihitung, bukan seberapa jauh.
          </li>
          <li>
            <strong>Modus</strong> — nilai yang paling sering muncul.
          </li>
        </ul>
        <p>
          Karena rata-rata memperhitungkan jarak, satu nilai yang sangat jauh (disebut{' '}
          <strong>pencilan</strong>) bisa menyeretnya. Median tidak terpengaruh, karena memindahkan
          satu data dari 35 menjadi 350 tidak mengubah urutannya sama sekali.
        </p>
        <h4>Kapan memakai yang mana</h4>
        <ul>
          <li>Data menyebar rapi tanpa pencilan → rata-rata mewakili dengan baik.</li>
          <li>Data menceng atau ada pencilan (gaji, harga rumah) → median lebih jujur.</li>
          <li>Data berupa kategori (warna favorit, ukuran sepatu terlaris) → modus.</li>
        </ul>
        <h4>Cara membaca berita</h4>
        <p>
          Kalau sebuah laporan hanya menyebut rata-rata tanpa median, itu pantas dipertanyakan —
          terutama untuk data pendapatan. Selisih besar antara rata-rata dan median adalah tanda
          bahwa datanya menceng.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Pernyataan "rata-rata adalah titik seimbang" bukan kiasan. Menurut definisinya,
        </p>
        <p style={{ textAlign: 'center' }}>Σ(xᵢ − x̄) = Σxᵢ − n·x̄ = n·x̄ − n·x̄ = 0</p>
        <p>
          Jumlah simpangan terhadap rata-rata selalu tepat nol — persis syarat kesetimbangan torsi
          pada tuas dengan beban sama berat. Rata-rata adalah satu-satunya titik dengan sifat ini.
        </p>
        <h4>Dua cara mengukur "di tengah"</h4>
        <p>
          Rata-rata meminimumkan Σ(xᵢ − c)², sedangkan median meminimumkan Σ|xᵢ − c|. Perbedaan
          pangkat dua versus nilai mutlak itulah sumber segalanya: mengkuadratkan membuat simpangan
          besar jauh lebih berpengaruh, sehingga rata-rata menjadi <em>tidak kekar</em> (not robust).
        </p>
        <p>
          Ukuran ketahanan ini disebut <em>breakdown point</em>: median tetap terkendali selama
          kurang dari separuh data yang dirusak (breakdown point 50%), sedangkan rata-rata sudah
          rusak oleh satu titik saja yang digeser tanpa batas.
        </p>
        <h4>Menceng ke arah mana</h4>
        <p>
          Untuk data yang menceng ke kanan (banyak nilai kecil, sedikit nilai sangat besar — seperti
          pendapatan), umumnya berlaku modus &lt; median &lt; rata-rata. Urutan ini sendiri sudah
          memberi petunjuk tentang bentuk sebaran datanya tanpa perlu melihat grafiknya.
        </p>
      </>
    ),
  },

  rumus: {
    src: '[mean:x̄] = (x₁ + x₂ + … + xₙ) ÷ n,  Σ(xᵢ − [mean:x̄]) = 0',
    roles: { mean: 'ab', median: 'b' },
    arti: {
      mean: 'Rata-rata. Jumlah simpangan terhadapnya selalu nol — itulah arti "titik seimbang".',
      median: 'Median, nilai tengah setelah data diurutkan.',
    },
  },

  soal: [
    {
      id: 'rat-1',
      tipe: 'angka',
      topicId: 'sma10-ukuran-pemusatan-data-mean-median',
      kelas: 8,
      tingkat: 'mudah',
      konsep: 'rata-rata-menipu',
      pertanyaan: 'Berapa median dari data: 3, 7, 4, 9, 5?',
      jawaban: 5,
      toleransi: 1e-9,
      hint: [
        'Median mensyaratkan data diurutkan lebih dulu.',
        'Urutannya: 3, 4, 5, 7, 9.',
        'Ada 5 data, jadi yang di tengah adalah data ke-3.',
      ],
      pembahasan: 'Setelah diurutkan menjadi 3, 4, 5, 7, 9, data ke-3 adalah 5. Perhatikan rata-ratanya 5,6 — sedikit lebih besar karena adanya nilai 9.',
    },
    {
      id: 'rat-2',
      tipe: 'pilihan',
      topicId: 'sma10-ukuran-pemusatan-data-mean-median',
      kelas: 10,
      tingkat: 'sedang',
      konsep: 'rata-rata-menipu',
      pertanyaan:
        'Data gaji (juta rupiah): 4, 4, 5, 5, 6, 6, 7, 60. Ukuran mana yang paling mewakili gaji "orang kebanyakan" di kelompok ini?',
      pilihan: [
        { id: 'a', label: 'Median', benar: true },
        {
          id: 'b',
          label: 'Rata-rata',
          diagnosa:
            'Rata-ratanya 12,1 juta — lebih besar daripada gaji tujuh dari delapan orang. Angka itu tidak mewakili siapa pun.',
        },
        {
          id: 'c',
          label: 'Nilai terbesar',
          diagnosa: 'Nilai terbesar justru pencilan yang menyebabkan masalahnya.',
        },
      ],
      hint: [
        'Hitung rata-ratanya dulu, lalu bandingkan dengan gaji kebanyakan orang di daftar itu.',
        'Rata-rata = 97/8 = 12,125 juta.',
        'Berapa orang yang gajinya di atas angka itu?',
      ],
      pembahasan:
        'Median = (5+6)/2 = 5,5 juta, sedangkan rata-rata 12,125 juta. Hanya satu orang bergaji di atas rata-rata, jadi median jauh lebih mewakili.',
    },
    {
      id: 'rat-3',
      tipe: 'benar-salah',
      topicId: 'sma10-ukuran-pemusatan-data-mean-median',
      kelas: 10,
      tingkat: 'sedang',
      konsep: 'rata-rata-menipu',
      pertanyaan: 'Rata-rata selalu merupakan salah satu nilai yang ada di dalam data.',
      jawaban: false,
      diagnosa:
        'Rata-rata adalah titik seimbang, dan titik seimbang tidak harus berimpit dengan salah satu beban. Contohnya rata-rata dari 4 dan 5 adalah 4,5.',
      hint: [
        'Coba cari contoh sederhana dengan dua data saja.',
        'Berapa rata-rata dari 4 dan 5?',
        'Apakah 4,5 ada di dalam data?',
      ],
      pembahasan:
        'Salah. Rata-rata dari 4 dan 5 adalah 4,5, yang tidak ada dalam data. Median juga bisa demikian bila banyaknya data genap. Modus-lah satu-satunya yang selalu berupa nilai yang benar-benar muncul.',
    },
    (rnd) => {
      const d = [3, 4, 5, 5, 6, 7]
      const x = 20 + Math.floor(rnd() * 60)
      const semua = [...d, x]
      const mean = semua.reduce((a, b) => a + b, 0) / semua.length
      return {
        id: 'rat-4',
        tipe: 'angka',
        topicId: 'sma10-ukuran-pemusatan-data-mean-median',
        kelas: 10,
        tingkat: 'sulit',
        konsep: 'rata-rata-menipu',
        pertanyaan: `Data: 3, 4, 5, 5, 6, 7, ${x}. Berapa rata-ratanya? Bulatkan sampai dua angka di belakang koma.`,
        jawaban: Math.round(mean * 100) / 100,
        toleransi: 0.011,
        hint: [
          'Jumlahkan seluruh data lebih dulu.',
          `3 + 4 + 5 + 5 + 6 + 7 = 30, lalu tambahkan ${x}.`,
          'Bagi dengan banyaknya data, yaitu 7.',
        ],
        pembahasan: `Jumlahnya ${30 + x}, dibagi 7 menjadi ${fmt(Math.round(mean * 100) / 100, 2)}. Bandingkan dengan mediannya yang hanya 5 — selisih sebesar itu adalah tanda adanya pencilan.`,
      }
    },
    {
      id: 'rat-5',
      tipe: 'cocokkan',
      topicId: 'sma10-ukuran-pemusatan-data-mean-median',
      kelas: 10,
      tingkat: 'sedang',
      konsep: 'rata-rata-menipu',
      pertanyaan: 'Pasangkan tiap keadaan dengan ukuran pemusatan yang paling tepat.',
      pasangan: [
        { kiri: 'Nilai ulangan yang menyebar rapi', kanan: 'Rata-rata' },
        { kiri: 'Harga rumah di sebuah kota', kanan: 'Median' },
        { kiri: 'Ukuran sepatu paling laku di toko', kanan: 'Modus' },
        { kiri: 'Data dengan satu nilai sangat ekstrem', kanan: 'Median' },
      ],
      hint: [
        'Tanyakan: apakah datanya punya nilai yang jauh menyendiri?',
        'Untuk data berupa pilihan atau ukuran yang dihitung banyaknya, yang dicari biasanya yang paling sering muncul.',
      ],
      pembahasan:
        'Rata-rata cocok untuk data yang menyebar rapi. Median dipakai kalau ada pencilan atau data menceng — itulah sebabnya laporan harga rumah hampir selalu memakai median. Modus dipakai kalau yang dicari adalah pilihan terbanyak.',
    },
  ],

  lanjut: ['peluang-simulasi', 'persen-dari', 'pecahan-penyebut'],
}

export default konsep
