/* ============================================================
   Visual MTK — Katalog konsep interaktif
   Daftar ringan (tanpa memuat modulnya) untuk galeri, pencarian,
   dan tautan antar konsep. Modul berat baru dimuat saat dibuka.
   ============================================================ */

import type { Domain } from '../lib/types'
import { adaKonsep } from '../concepts/registry'
 import { TAUTAN_KONSEP } from './tautan.generated'

export interface KonsepMeta {
  id: string
  judul: string
  /** pertanyaan "kenapa" yang menjadi wajah konsep ini. */
  pertanyaan: string
  tagline: string
  kelas: number
  domain: Domain
  /** id topik kurikulum yang dijelaskan konsep ini. */
  topicId: string
  tags: string[]
  /** jenis visualisasi utama — dipakai untuk penyaringan di galeri. */
  visual: string
  /** konsep ini punya mode eksperimen bebas. */
  eksperimen?: boolean
}

export const LABEL_DOMAIN: Record<Domain, string> = {
  bilangan: 'Bilangan',
  aljabar: 'Aljabar',
  pengukuran: 'Pengukuran',
  geometri: 'Geometri',
  data: 'Data & Peluang',
  kalkulus: 'Kalkulus',
}

const MENTAH: KonsepMeta[] = [
  {
    id: 'nilai-tempat',
    judul: 'Nilai tempat',
    pertanyaan: 'Kenapa angka 2 di "25" berharga dua puluh, bukan dua?',
    tagline: 'Angka yang sama bisa berbeda nilainya — semuanya tergantung tempat duduknya.',
    kelas: 2,
    domain: 'bilangan',
    topicId: 'sd2-nilai-tempat',
    tags: ['nilai tempat', 'puluhan', 'satuan', 'bilangan'],
    visual: 'blok satuan',
    eksperimen: true,
  },
  {
    id: 'perkalian-luas',
    judul: 'Perkalian sebagai luas',
    pertanyaan: 'Kenapa 4 × 6 sama dengan 6 × 4?',
    tagline: 'Perkalian punya bentuk. Begitu kamu melihatnya, banyak hal jadi masuk akal.',
    kelas: 3,
    domain: 'bilangan',
    topicId: 'sd3-perkalian',
    tags: ['perkalian', 'komutatif', 'luas', 'array'],
    visual: 'model luas',
    eksperimen: true,
  },
  {
    id: 'segitiga-setengah',
    judul: 'Luas segitiga',
    pertanyaan: 'Kenapa luas segitiga harus dibagi 2?',
    tagline: 'Karena setiap segitiga sebenarnya separuh dari sebuah bangun yang lebih mudah.',
    kelas: 4,
    domain: 'pengukuran',
    topicId: 'sd4-luas-segitiga',
    tags: ['segitiga', 'luas', 'alas', 'tinggi', 'jajar genjang'],
    visual: 'geometri potong-susun',
    eksperimen: true,
  },
  {
    id: 'pecahan-penyebut',
    judul: 'Menjumlahkan pecahan',
    pertanyaan: 'Kenapa penyebut harus disamakan dulu sebelum pecahan dijumlahkan?',
    tagline: 'Coba jumlahkan potongan yang ukurannya beda — kamu akan lihat sendiri masalahnya.',
    kelas: 5,
    domain: 'bilangan',
    topicId: 'sd5-operasi-pecahan',
    tags: ['pecahan', 'penyebut', 'penjumlahan', 'KPK'],
    visual: 'batang pecahan',
    eksperimen: true,
  },
  {
    id: 'bagi-pecahan',
    judul: 'Membagi pecahan',
    pertanyaan: 'Kenapa membagi pecahan berubah jadi mengalikan kebalikannya?',
    tagline: 'Pembagian itu pertanyaan "muat berapa kali?". Jawabannya kelihatan kalau digambar.',
    kelas: 5,
    domain: 'bilangan',
    topicId: 'sd5-operasi-pecahan',
    tags: ['pecahan', 'pembagian', 'kebalikan', 'resiprokal'],
    visual: 'batang pecahan',
    eksperimen: true,
  },
  {
    id: 'persen-dari',
    judul: 'Persen',
    pertanyaan: 'Kenapa "20% dari 50" hasilnya 10?',
    tagline: 'Persen cuma cara lain menulis "per seratus". Lihat 100 kotaknya, langsung jelas.',
    kelas: 5,
    domain: 'bilangan',
    topicId: 'sd5-persen',
    tags: ['persen', 'pecahan', 'perbandingan', 'diskon'],
    visual: 'kisi 100',
    eksperimen: true,
  },
  {
    id: 'pi-dari-mana',
    judul: 'Bilangan π',
    pertanyaan: 'Kenapa π ≈ 3,14 — kenapa bukan angka lain?',
    tagline: 'Gulingkan lingkaran apa pun. Hasilnya selalu angka yang sama. Kenapa bisa begitu?',
    kelas: 6,
    domain: 'pengukuran',
    topicId: 'sd6-lingkaran',
    tags: ['pi', 'keliling', 'diameter', 'lingkaran'],
    visual: 'gulingkan lingkaran',
    eksperimen: true,
  },
  {
    id: 'lingkaran-luas',
    judul: 'Luas lingkaran',
    pertanyaan: 'Kenapa luas lingkaran πr²?',
    tagline: 'Potong lingkaran jadi juring, susun ulang — bentuknya berubah jadi sesuatu yang kamu kenal.',
    kelas: 6,
    domain: 'pengukuran',
    topicId: 'sd6-lingkaran',
    tags: ['lingkaran', 'luas', 'juring', 'pi', 'jari-jari'],
    visual: 'potong juring',
    eksperimen: true,
  },
  {
    id: 'negatif-kali-negatif',
    judul: 'Negatif kali negatif',
    pertanyaan: 'Kenapa negatif × negatif hasilnya positif?',
    tagline: 'Bukan aturan yang dibuat-buat. Ini satu-satunya jawaban yang menjaga pola tetap utuh.',
    kelas: 7,
    domain: 'bilangan',
    topicId: 'smp7-bilangan-bulat',
    tags: ['bilangan bulat', 'negatif', 'perkalian', 'pola'],
    visual: 'pola & garis bilangan',
    eksperimen: true,
  },
  {
    id: 'timbangan-persamaan',
    judul: 'Menyelesaikan persamaan',
    pertanyaan: 'Kenapa boleh mengurangi kedua ruas persamaan?',
    tagline: 'Persamaan itu timbangan. Selama kedua sisi diperlakukan sama, ia tetap seimbang.',
    kelas: 7,
    domain: 'aljabar',
    topicId: 'smp7-persamaan-linear',
    tags: ['persamaan', 'linear', 'timbangan', 'aljabar'],
    visual: 'timbangan',
    eksperimen: true,
  },
  {
    id: 'sudut-segitiga',
    judul: 'Jumlah sudut segitiga',
    pertanyaan: 'Kenapa jumlah sudut segitiga selalu 180°?',
    tagline: 'Sobek ketiga sudutnya, satukan. Selalu membentuk garis lurus. Selalu.',
    kelas: 7,
    domain: 'geometri',
    topicId: 'smp7-garis-sudut',
    tags: ['segitiga', 'sudut', '180', 'garis sejajar'],
    visual: 'sobek & susun sudut',
    eksperimen: true,
  },
  {
    id: 'kuadrat-jumlah',
    judul: 'Identitas (a+b)²',
    pertanyaan: 'Kok bisa (a+b)² = a² + 2ab + b²?',
    tagline: 'Dua cara menghitung luas persegi yang sama. Hasilnya wajib sama.',
    kelas: 8,
    domain: 'aljabar',
    topicId: 'smp8-aljabar-bentuk',
    tags: ['aljabar', 'identitas', 'kuadrat', 'algebra tiles'],
    visual: 'ubin aljabar',
    eksperimen: true,
  },
  {
    id: 'pythagoras',
    judul: 'Teorema Pythagoras',
    pertanyaan: 'Kenapa a² + b² = c² selalu benar?',
    tagline: 'Bukan soal sisi. Ini soal luas — dan ada bukti yang bisa kamu lihat bergerak.',
    kelas: 8,
    domain: 'geometri',
    topicId: 'smp8-pythagoras',
    tags: ['pythagoras', 'segitiga siku-siku', 'luas', 'bukti'],
    visual: 'bukti susun ulang',
    eksperimen: true,
  },
  {
    id: 'peluang-simulasi',
    judul: 'Peluang dan kenyataan',
    pertanyaan: 'Kalau peluangnya ½, kenapa 10 lemparan tidak pernah pas 5 kali?',
    tagline: 'Lempar 10 kali, 100 kali, 10.000 kali. Perhatikan kapan pola itu muncul.',
    kelas: 8,
    domain: 'data',
    topicId: 'smp8-peluang',
    tags: ['peluang', 'frekuensi relatif', 'simulasi', 'koin'],
    visual: 'simulasi',
    eksperimen: true,
  },
  {
    id: 'kerucut-sepertiga',
    judul: 'Volume kerucut',
    pertanyaan: 'Kenapa volume kerucut sepertiga tabung?',
    tagline: 'Tuang isinya tiga kali. Tabungnya pas penuh. Tapi kenapa harus tiga?',
    kelas: 9,
    domain: 'pengukuran',
    topicId: 'smp9-bangun-ruang-lengkung',
    tags: ['kerucut', 'tabung', 'volume', 'sepertiga'],
    visual: 'tuang isi',
    eksperimen: true,
  },
  {
    id: 'parabola',
    judul: 'Grafik fungsi kuadrat',
    pertanyaan: 'Kenapa x² menghasilkan lengkung, bukan garis lurus?',
    tagline: 'Karena setiap langkah ke kanan menambah lebih banyak dari langkah sebelumnya.',
    kelas: 9,
    domain: 'aljabar',
    topicId: 'smp9-fungsi-kuadrat',
    tags: ['parabola', 'kuadrat', 'grafik', 'fungsi', 'selisih'],
    visual: 'grafik dinamis',
    eksperimen: true,
  },
  {
    id: 'deret-gauss',
    judul: 'Jumlah deret aritmetika',
    pertanyaan: 'Kenapa 1+2+3+…+100 bisa dihitung dalam sekejap?',
    tagline: 'Trik anak berumur sembilan tahun yang mengubah 99 penjumlahan jadi satu perkalian.',
    kelas: 10,
    domain: 'aljabar',
    topicId: 'sma10-barisan-deret',
    tags: ['deret', 'aritmetika', 'gauss', 'jumlah'],
    visual: 'susun balok',
    eksperimen: true,
  },
  {
    id: 'eksponen-logaritma',
    judul: 'Logaritma',
    pertanyaan: 'Kenapa logaritma mengubah perkalian menjadi penjumlahan?',
    tagline: 'Karena logaritma menghitung "berapa langkah", dan langkah memang dijumlahkan.',
    kelas: 10,
    domain: 'aljabar',
    topicId: 'sma10-eksponen-logaritma',
    tags: ['logaritma', 'eksponen', 'sifat log', 'pertumbuhan'],
    visual: 'skala & tangga',
    eksperimen: true,
  },
  {
    id: 'sin-cos-lingkaran',
    judul: 'Sinus dan kosinus',
    pertanyaan: 'Bagaimana segitiga bisa berubah menjadi gelombang?',
    tagline: 'Satu titik berputar di lingkaran. Bayangannya menggambar grafik sinus.',
    kelas: 10,
    domain: 'geometri',
    topicId: 'sma10-trigonometri',
    tags: ['sinus', 'kosinus', 'lingkaran satuan', 'trigonometri', 'gelombang'],
    visual: 'lingkaran satuan',
    eksperimen: true,
  },
  {
    id: 'turunan-kemiringan',
    judul: 'Turunan',
    pertanyaan: 'Kenapa turunan disebut kemiringan?',
    tagline: 'Dekatkan dua titik pada kurva sampai hampir berimpit. Lihat apa yang tersisa.',
    kelas: 11,
    domain: 'kalkulus',
    topicId: 'sma11-turunan',
    tags: ['turunan', 'limit', 'kemiringan', 'garis singgung'],
    visual: 'garis potong ke singgung',
    eksperimen: true,
  },
  {
    id: 'integral-luas',
    judul: 'Integral',
    pertanyaan: 'Kenapa integral bisa menghitung luas daerah melengkung?',
    tagline: 'Isi daerahnya dengan persegi panjang. Perkecil lebarnya. Perhatikan ke mana angkanya menuju.',
    kelas: 12,
    domain: 'kalkulus',
    topicId: 'sma12-integral',
    tags: ['integral', 'luas', 'riemann', 'limit'],
    visual: 'jumlah riemann',
    eksperimen: true,
  },
  {
    id: 'rata-rata-menipu',
    judul: 'Rata-rata, median, modus',
    pertanyaan: 'Kenapa rata-rata bisa menipu?',
    tagline: 'Satu angka ekstrem sanggup menyeret rata-rata menjauh dari kenyataan.',
    kelas: 12,
    domain: 'data',
    topicId: 'sma12-statistika',
    tags: ['rata-rata', 'median', 'modus', 'pencilan', 'statistika'],
    visual: 'titik data & tuas',
    eksperimen: true,
  },
]

/**
 * topicId dan kelas diambil dari peta kurikulum hasil riset bila konsepnya
 * sudah tertaut di sana, sehingga tidak pernah melenceng dari kurikulum.
 * Nilai pada MENTAH dipakai sebagai cadangan.
 */
export const KATALOG: KonsepMeta[] = MENTAH.map((m) => {
  const tautan = TAUTAN_KONSEP[m.id]
  return tautan ? { ...m, topicId: tautan.topicId, kelas: tautan.kelas } : m
})

export const petaKatalog = new Map(KATALOG.map((k) => [k.id, k]))

export const cariKonsepMeta = (id: string) => petaKatalog.get(id)

/** Konsep yang modul visualnya benar-benar sudah ada. */
export const konsepSiap = () => KATALOG.filter((k) => adaKonsep(k.id))

export const konsepUntukTopik = (topicId: string) =>
  KATALOG.filter((k) => k.topicId === topicId && adaKonsep(k.id))

export function cariKonsep(q: string): KonsepMeta[] {
  const t = q.trim().toLowerCase()
  if (!t) return konsepSiap()
  return konsepSiap().filter((k) =>
    [k.judul, k.pertanyaan, k.tagline, ...k.tags].some((s) => s.toLowerCase().includes(t)),
  )
}
