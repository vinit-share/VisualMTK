/* ============================================================
   Visual MTK — Metadata konsep (DIHASILKAN OTOMATIS)

   Jangan sunting berkas ini dengan tangan. Sumbernya adalah modul
   konsep di src/concepts/ — di situlah teksnya diubah.
   Bangun ulang: npm run bangun:katalog
   ============================================================ */

import type { Domain } from '../lib/types'

export interface KonsepMetaDasar {
  id: string
  judul: string
  pertanyaan: string
  tagline: string
  domain: Domain
  /** kelas menurut modulnya; ditimpa oleh peta kurikulum bila tertaut. */
  kelas: number
  tags: string[]
  eksperimen: boolean
}

export const KONSEP_META: KonsepMetaDasar[] = [
  {
    "id": "nilai-tempat",
    "judul": "Nilai tempat",
    "pertanyaan": "Kenapa angka 2 di \"25\" berharga dua puluh, bukan dua?",
    "tagline": "Angka yang sama bisa berbeda nilainya — semuanya tergantung tempat duduknya.",
    "domain": "bilangan",
    "kelas": 2,
    "tags": [
      "nilai tempat",
      "puluhan",
      "satuan",
      "bilangan"
    ],
    "eksperimen": true
  },
  {
    "id": "perkalian-luas",
    "judul": "Perkalian sebagai luas",
    "pertanyaan": "Kenapa 4 × 6 sama dengan 6 × 4?",
    "tagline": "Perkalian punya bentuk. Begitu kamu melihatnya, banyak hal jadi masuk akal.",
    "domain": "bilangan",
    "kelas": 3,
    "tags": [
      "perkalian",
      "komutatif",
      "luas",
      "susunan"
    ],
    "eksperimen": true
  },
  {
    "id": "segitiga-setengah",
    "judul": "Luas segitiga",
    "pertanyaan": "Kenapa luas segitiga harus dibagi 2?",
    "tagline": "Karena setiap segitiga sebenarnya separuh dari sebuah bangun yang jauh lebih mudah dihitung.",
    "domain": "pengukuran",
    "kelas": 5,
    "tags": [
      "segitiga",
      "luas",
      "alas",
      "tinggi"
    ],
    "eksperimen": true
  },
  {
    "id": "pecahan-penyebut",
    "judul": "Menjumlahkan pecahan",
    "pertanyaan": "Kenapa penyebut harus disamakan dulu sebelum pecahan dijumlahkan?",
    "tagline": "Coba jumlahkan potongan yang ukurannya berbeda — kamu akan lihat sendiri masalahnya.",
    "domain": "bilangan",
    "kelas": 5,
    "tags": [
      "pecahan",
      "penyebut",
      "penjumlahan",
      "KPK",
      "pecahan senilai"
    ],
    "eksperimen": true
  },
  {
    "id": "pi-dari-mana",
    "judul": "Bilangan π",
    "pertanyaan": "Kenapa π ≈ 3,14 — kenapa bukan angka lain?",
    "tagline": "Gulingkan lingkaran apa pun. Hasilnya selalu angka yang sama. Kenapa bisa begitu?",
    "domain": "pengukuran",
    "kelas": 6,
    "tags": [
      "pi",
      "keliling",
      "diameter",
      "lingkaran"
    ],
    "eksperimen": true
  },
  {
    "id": "lingkaran-luas",
    "judul": "Luas lingkaran",
    "pertanyaan": "Kenapa luas lingkaran πr²?",
    "tagline": "Potong lingkaran jadi juring, susun ulang — bentuknya berubah menjadi sesuatu yang sudah kamu kenal.",
    "domain": "pengukuran",
    "kelas": 6,
    "tags": [
      "lingkaran",
      "luas",
      "juring",
      "pi",
      "jari-jari"
    ],
    "eksperimen": true
  },
  {
    "id": "bagi-pecahan",
    "judul": "Membagi pecahan",
    "pertanyaan": "Kenapa membagi pecahan berubah jadi mengalikan kebalikannya?",
    "tagline": "Pembagian itu pertanyaan \"muat berapa kali?\". Jawabannya kelihatan kalau digambar.",
    "domain": "bilangan",
    "kelas": 6,
    "tags": [
      "pecahan",
      "pembagian",
      "kebalikan",
      "resiprokal"
    ],
    "eksperimen": true
  },
  {
    "id": "persen-dari",
    "judul": "Persen",
    "pertanyaan": "Kenapa \"20% dari 50\" hasilnya 10?",
    "tagline": "Persen cuma cara lain menulis \"per seratus\". Lihat 100 kotaknya, langsung jelas.",
    "domain": "bilangan",
    "kelas": 6,
    "tags": [
      "persen",
      "pecahan",
      "perbandingan",
      "diskon"
    ],
    "eksperimen": true
  },
  {
    "id": "sudut-segitiga",
    "judul": "Jumlah sudut segitiga",
    "pertanyaan": "Kenapa jumlah sudut segitiga selalu 180°?",
    "tagline": "Sobek ketiga sudutnya, satukan. Selalu membentuk garis lurus. Selalu.",
    "domain": "geometri",
    "kelas": 7,
    "tags": [
      "segitiga",
      "sudut",
      "garis sejajar",
      "sudut berseberangan"
    ],
    "eksperimen": true
  },
  {
    "id": "timbangan-persamaan",
    "judul": "Menyelesaikan persamaan",
    "pertanyaan": "Kenapa boleh mengurangi kedua ruas persamaan?",
    "tagline": "Persamaan itu timbangan. Selama kedua sisi diperlakukan sama, ia tetap seimbang.",
    "domain": "aljabar",
    "kelas": 7,
    "tags": [
      "persamaan",
      "linear",
      "timbangan",
      "aljabar"
    ],
    "eksperimen": true
  },
  {
    "id": "negatif-kali-negatif",
    "judul": "Negatif kali negatif",
    "pertanyaan": "Kenapa negatif × negatif hasilnya positif?",
    "tagline": "Bukan aturan yang dibuat-buat. Ini satu-satunya jawaban yang menjaga aritmetika tetap utuh.",
    "domain": "bilangan",
    "kelas": 7,
    "tags": [
      "bilangan bulat",
      "negatif",
      "perkalian",
      "pola",
      "distributif"
    ],
    "eksperimen": true
  },
  {
    "id": "kuadrat-jumlah",
    "judul": "Identitas (a+b)²",
    "pertanyaan": "Kok bisa (a+b)² = a² + 2ab + b²?",
    "tagline": "Dua cara menghitung luas persegi yang sama. Hasilnya wajib sama.",
    "domain": "aljabar",
    "kelas": 8,
    "tags": [
      "aljabar",
      "identitas",
      "kuadrat",
      "ubin aljabar"
    ],
    "eksperimen": true
  },
  {
    "id": "peluang-simulasi",
    "judul": "Peluang dan kenyataan",
    "pertanyaan": "Kalau peluangnya ½, kenapa 10 lemparan sering tidak pas 5 kali?",
    "tagline": "Lempar 10 kali, 100 kali, 10.000 kali. Perhatikan kapan pola itu muncul.",
    "domain": "data",
    "kelas": 8,
    "tags": [
      "peluang",
      "frekuensi relatif",
      "simulasi",
      "koin",
      "hukum bilangan besar"
    ],
    "eksperimen": true
  },
  {
    "id": "pythagoras",
    "judul": "Teorema Pythagoras",
    "pertanyaan": "Kenapa a² + b² = c² selalu benar?",
    "tagline": "Bukan soal panjang sisi. Ini soal luas — dan buktinya bisa kamu lihat bergerak.",
    "domain": "geometri",
    "kelas": 8,
    "tags": [
      "pythagoras",
      "segitiga siku-siku",
      "luas",
      "bukti"
    ],
    "eksperimen": true
  },
  {
    "id": "parabola",
    "judul": "Grafik fungsi kuadrat",
    "pertanyaan": "Kenapa x² menghasilkan lengkung, bukan garis lurus?",
    "tagline": "Karena setiap langkah ke kanan menambah lebih banyak dari langkah sebelumnya.",
    "domain": "aljabar",
    "kelas": 9,
    "tags": [
      "parabola",
      "kuadrat",
      "grafik",
      "fungsi",
      "selisih"
    ],
    "eksperimen": true
  },
  {
    "id": "kerucut-sepertiga",
    "judul": "Volume kerucut",
    "pertanyaan": "Kenapa volume kerucut sepertiga tabung?",
    "tagline": "Tuang isinya tiga kali. Tabungnya pas penuh. Tapi kenapa harus tiga?",
    "domain": "pengukuran",
    "kelas": 9,
    "tags": [
      "kerucut",
      "tabung",
      "volume",
      "sepertiga",
      "irisan"
    ],
    "eksperimen": true
  },
  {
    "id": "deret-gauss",
    "judul": "Jumlah deret aritmetika",
    "pertanyaan": "Kenapa 1+2+3+…+100 bisa dihitung dalam sekejap?",
    "tagline": "Trik anak sembilan tahun yang mengubah 99 penjumlahan menjadi satu perkalian.",
    "domain": "aljabar",
    "kelas": 10,
    "tags": [
      "deret",
      "aritmetika",
      "gauss",
      "jumlah"
    ],
    "eksperimen": true
  },
  {
    "id": "eksponen-logaritma",
    "judul": "Logaritma",
    "pertanyaan": "Kenapa logaritma mengubah perkalian menjadi penjumlahan?",
    "tagline": "Karena logaritma menghitung \"berapa langkah\", dan langkah memang dijumlahkan.",
    "domain": "aljabar",
    "kelas": 10,
    "tags": [
      "logaritma",
      "eksponen",
      "sifat logaritma",
      "pertumbuhan"
    ],
    "eksperimen": true
  },
  {
    "id": "rata-rata-menipu",
    "judul": "Rata-rata, median, modus",
    "pertanyaan": "Kenapa rata-rata bisa menipu?",
    "tagline": "Satu angka ekstrem sanggup menyeret rata-rata menjauh dari kenyataan.",
    "domain": "data",
    "kelas": 10,
    "tags": [
      "rata-rata",
      "median",
      "modus",
      "pencilan",
      "statistika"
    ],
    "eksperimen": true
  },
  {
    "id": "sin-cos-lingkaran",
    "judul": "Sinus dan kosinus",
    "pertanyaan": "Bagaimana segitiga bisa berubah menjadi gelombang?",
    "tagline": "Satu titik berputar di lingkaran. Bayangannya menggambar grafik sinus.",
    "domain": "geometri",
    "kelas": 10,
    "tags": [
      "sinus",
      "kosinus",
      "lingkaran satuan",
      "trigonometri",
      "gelombang"
    ],
    "eksperimen": true
  },
  {
    "id": "turunan-kemiringan",
    "judul": "Turunan",
    "pertanyaan": "Kenapa turunan disebut kemiringan?",
    "tagline": "Dekatkan dua titik pada kurva sampai hampir berimpit. Lihat apa yang tersisa.",
    "domain": "kalkulus",
    "kelas": 11,
    "tags": [
      "turunan",
      "limit",
      "kemiringan",
      "garis singgung"
    ],
    "eksperimen": true
  },
  {
    "id": "integral-luas",
    "judul": "Integral",
    "pertanyaan": "Kenapa integral bisa menghitung luas daerah melengkung?",
    "tagline": "Isi daerahnya dengan persegi panjang. Perkecil lebarnya. Perhatikan ke mana angkanya menuju.",
    "domain": "kalkulus",
    "kelas": 12,
    "tags": [
      "integral",
      "luas",
      "jumlah riemann",
      "limit"
    ],
    "eksperimen": true
  }
]
