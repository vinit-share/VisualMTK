/* ============================================================
   Visual MTK — Ringkasan topik kurikulum (DIHASILKAN OTOMATIS)

   Jangan sunting berkas ini dengan tangan.
   Sumber: docs/riset/ (riset Capaian Pembelajaran Kepka BSKAP
   Kemendikdasmen No. 046/H/KR/2025).
   Bangun ulang: npm run bangun:kurikulum
   ============================================================ */

import type { Domain, Fase } from '../../lib/types'

export interface TopikRingkas {
  id: string
  judul: string
  kelas: number
  fase: Fase
  domain: Domain
  prasyarat: string[]
  /** hanya ada pada mata pelajaran Matematika Tingkat Lanjut. */
  lanjut?: boolean
  konsep?: string[]
}

export const TOPIK_RINGKAS: TopikRingkas[] = [
 {
  "id": "sd1-makna-simbol-dan-keseimbangan",
  "judul": "Makna Simbol +, -, dan = (Keseimbangan)",
  "kelas": 1,
  "fase": "A",
  "domain": "aljabar",
  "prasyarat": [
   "sd1-membilang-benda-sampai-10",
   "sd1-membandingkan-banyak-benda-dan-bilangan",
   "sd1-membaca-dan-menulis-lambang-bilangan"
  ]
 },
 {
  "id": "sd1-pola-bukan-bilangan-gambar-warna",
  "judul": "Pola Bukan Bilangan (Gambar, Warna, Bunyi, dan Gerak)",
  "kelas": 1,
  "fase": "A",
  "domain": "aljabar",
  "prasyarat": [
   "sd1-membilang-benda-sampai-10",
   "sd1-menyortir-dan-mengelompokkan-benda-menurut"
  ]
 },
 {
  "id": "sd1-bilangan-urutan-ordinal-ke-1",
  "judul": "Bilangan Urutan (Ordinal): ke-1, ke-2, ke-3",
  "kelas": 1,
  "fase": "A",
  "domain": "bilangan",
  "prasyarat": [
   "sd1-membilang-benda-sampai-10",
   "sd1-membaca-dan-menulis-lambang-bilangan"
  ]
 },
 {
  "id": "sd1-garis-bilangan-dan-membilang-maju",
  "judul": "Garis Bilangan dan Membilang Maju-Mundur",
  "kelas": 1,
  "fase": "A",
  "domain": "bilangan",
  "prasyarat": [
   "sd1-membaca-dan-menulis-lambang-bilangan",
   "sd1-membandingkan-banyak-benda-dan-bilangan"
  ]
 },
 {
  "id": "sd1-hubungan-penjumlahan-dan-pengurangan-keluarga",
  "judul": "Hubungan Penjumlahan dan Pengurangan (Keluarga Fakta)",
  "kelas": 1,
  "fase": "A",
  "domain": "bilangan",
  "prasyarat": [
   "sd1-penjumlahan-bilangan-cacah-sampai-20",
   "sd1-pengurangan-bilangan-cacah-sampai-20"
  ]
 },
 {
  "id": "sd1-membaca-dan-menulis-lambang-bilangan",
  "judul": "Membaca dan Menulis Lambang Bilangan sampai 20",
  "kelas": 1,
  "fase": "A",
  "domain": "bilangan",
  "prasyarat": [
   "sd1-membilang-benda-sampai-10"
  ]
 },
 {
  "id": "sd1-membandingkan-banyak-benda-dan-bilangan",
  "judul": "Membandingkan Banyak Benda dan Bilangan sampai 20",
  "kelas": 1,
  "fase": "A",
  "domain": "bilangan",
  "prasyarat": [
   "sd1-membilang-benda-sampai-10",
   "sd1-membaca-dan-menulis-lambang-bilangan"
  ]
 },
 {
  "id": "sd1-membilang-benda-sampai-10",
  "judul": "Membilang Benda sampai 10",
  "kelas": 1,
  "fase": "A",
  "domain": "bilangan",
  "prasyarat": []
 },
 {
  "id": "sd1-pasangan-bilangan-10-komposisi-dan",
  "judul": "Pasangan Bilangan 10 (Komposisi dan Dekomposisi sampai 10)",
  "kelas": 1,
  "fase": "A",
  "domain": "bilangan",
  "prasyarat": [
   "sd1-membilang-benda-sampai-10",
   "sd1-membandingkan-banyak-benda-dan-bilangan"
  ]
 },
 {
  "id": "sd1-pengurangan-bilangan-cacah-sampai-20",
  "judul": "Pengurangan Bilangan Cacah sampai 20 dengan Benda Konkret",
  "kelas": 1,
  "fase": "A",
  "domain": "bilangan",
  "prasyarat": [
   "sd1-penjumlahan-bilangan-cacah-sampai-20",
   "sd1-pasangan-bilangan-10-komposisi-dan",
   "sd1-garis-bilangan-dan-membilang-maju"
  ]
 },
 {
  "id": "sd1-penjumlahan-bilangan-cacah-sampai-20",
  "judul": "Penjumlahan Bilangan Cacah sampai 20 dengan Benda Konkret",
  "kelas": 1,
  "fase": "A",
  "domain": "bilangan",
  "prasyarat": [
   "sd1-pasangan-bilangan-10-komposisi-dan",
   "sd1-garis-bilangan-dan-membilang-maju",
   "sd1-makna-simbol-dan-keseimbangan"
  ]
 },
 {
  "id": "sd1-menyortir-dan-mengelompokkan-benda-menurut",
  "judul": "Menyortir dan Mengelompokkan Benda Menurut Ciri",
  "kelas": 1,
  "fase": "A",
  "domain": "data",
  "prasyarat": [
   "sd1-membilang-benda-sampai-10",
   "sd1-membandingkan-banyak-benda-dan-bilangan"
  ]
 },
 {
  "id": "sd1-mengenal-dan-mengelompokkan-bangun-datar",
  "judul": "Mengenal dan Mengelompokkan Bangun Datar",
  "kelas": 1,
  "fase": "A",
  "domain": "geometri",
  "prasyarat": [
   "sd1-membilang-benda-sampai-10",
   "sd1-menyortir-dan-mengelompokkan-benda-menurut"
  ]
 },
 {
  "id": "sd1-posisi-dan-arah-benda",
  "judul": "Posisi dan Arah Benda",
  "kelas": 1,
  "fase": "A",
  "domain": "geometri",
  "prasyarat": [
   "sd1-membilang-benda-sampai-10"
  ]
 },
 {
  "id": "sd1-membandingkan-berat-secara-langsung",
  "judul": "Membandingkan Berat Secara Langsung",
  "kelas": 1,
  "fase": "A",
  "domain": "pengukuran",
  "prasyarat": [
   "sd1-membandingkan-panjang-dan-tinggi-secara",
   "sd1-membandingkan-banyak-benda-dan-bilangan"
  ]
 },
 {
  "id": "sd1-membandingkan-panjang-dan-tinggi-secara",
  "judul": "Membandingkan Panjang dan Tinggi Secara Langsung",
  "kelas": 1,
  "fase": "A",
  "domain": "pengukuran",
  "prasyarat": [
   "sd1-membandingkan-banyak-benda-dan-bilangan"
  ]
 },
 {
  "id": "sd1-mengukur-panjang-dengan-satuan-tidak",
  "judul": "Mengukur Panjang dengan Satuan Tidak Baku",
  "kelas": 1,
  "fase": "A",
  "domain": "pengukuran",
  "prasyarat": [
   "sd1-membandingkan-panjang-dan-tinggi-secara",
   "sd1-membilang-benda-sampai-10",
   "sd1-membaca-dan-menulis-lambang-bilangan"
  ]
 },
 {
  "id": "sd2-kalimat-matematika-dengan-bilangan-yang",
  "judul": "Kalimat Matematika dengan Bilangan yang Hilang",
  "kelas": 2,
  "fase": "A",
  "domain": "aljabar",
  "prasyarat": [
   "sd1-makna-simbol-dan-keseimbangan",
   "sd1-hubungan-penjumlahan-dan-pengurangan-keluarga",
   "sd1-pengurangan-bilangan-cacah-sampai-20"
  ]
 },
 {
  "id": "sd2-pola-bilangan-membesar-dan-mengecil",
  "judul": "Pola Bilangan Membesar dan Mengecil (Pengantar)",
  "kelas": 2,
  "fase": "A",
  "domain": "aljabar",
  "prasyarat": [
   "sd1-garis-bilangan-dan-membilang-maju",
   "sd2-membilang-dan-mengelompokkan-bilangan-sampai",
   "sd1-pola-bukan-bilangan-gambar-warna",
   "sd2-strategi-berhitung-mental-dengan-puluhan"
  ]
 },
 {
  "id": "sd2-bilangan-ganjil-dan-genap",
  "judul": "Bilangan Ganjil dan Genap",
  "kelas": 2,
  "fase": "A",
  "domain": "bilangan",
  "prasyarat": [
   "sd2-membilang-dan-mengelompokkan-bilangan-sampai",
   "sd2-nilai-tempat-puluhan-dan-satuan"
  ]
 },
 {
  "id": "sd2-estimasi-dan-perkiraan-banyak-benda",
  "judul": "Estimasi dan Perkiraan Banyak Benda",
  "kelas": 2,
  "fase": "A",
  "domain": "bilangan",
  "prasyarat": [
   "sd2-membilang-dan-mengelompokkan-bilangan-sampai",
   "sd2-membandingkan-dan-mengurutkan-bilangan-sampai"
  ]
 },
 {
  "id": "sd2-komposisi-dan-dekomposisi-bilangan-dua",
  "judul": "Komposisi dan Dekomposisi Bilangan Dua Angka",
  "kelas": 2,
  "fase": "A",
  "domain": "bilangan",
  "prasyarat": [
   "sd2-nilai-tempat-puluhan-dan-satuan",
   "sd1-pasangan-bilangan-10-komposisi-dan"
  ]
 },
 {
  "id": "sd2-membandingkan-dan-mengurutkan-bilangan-sampai",
  "judul": "Membandingkan dan Mengurutkan Bilangan sampai 100",
  "kelas": 2,
  "fase": "A",
  "domain": "bilangan",
  "prasyarat": [
   "sd2-nilai-tempat-puluhan-dan-satuan",
   "sd1-garis-bilangan-dan-membilang-maju",
   "sd1-membandingkan-banyak-benda-dan-bilangan"
  ]
 },
 {
  "id": "sd2-membilang-dan-mengelompokkan-bilangan-sampai",
  "judul": "Membilang dan Mengelompokkan Bilangan sampai 100",
  "kelas": 2,
  "fase": "A",
  "domain": "bilangan",
  "prasyarat": [
   "sd1-membaca-dan-menulis-lambang-bilangan",
   "sd1-garis-bilangan-dan-membilang-maju",
   "sd1-pasangan-bilangan-10-komposisi-dan"
  ]
 },
 {
  "id": "sd2-nilai-tempat-puluhan-dan-satuan",
  "judul": "Nilai Tempat Puluhan dan Satuan",
  "kelas": 2,
  "fase": "A",
  "domain": "bilangan",
  "prasyarat": [
   "sd2-membilang-dan-mengelompokkan-bilangan-sampai",
   "sd1-pasangan-bilangan-10-komposisi-dan"
  ],
  "konsep": [
   "nilai-tempat"
  ]
 },
 {
  "id": "sd2-pecahan-setengah-dan-seperempat",
  "judul": "Pecahan Setengah dan Seperempat",
  "kelas": 2,
  "fase": "A",
  "domain": "bilangan",
  "prasyarat": [
   "sd1-membilang-benda-sampai-10",
   "sd1-membandingkan-banyak-benda-dan-bilangan",
   "sd1-pasangan-bilangan-10-komposisi-dan"
  ]
 },
 {
  "id": "sd2-strategi-berhitung-mental-dengan-puluhan",
  "judul": "Strategi Berhitung Mental dengan Puluhan",
  "kelas": 2,
  "fase": "A",
  "domain": "bilangan",
  "prasyarat": [
   "sd2-nilai-tempat-puluhan-dan-satuan",
   "sd2-komposisi-dan-dekomposisi-bilangan-dua",
   "sd1-penjumlahan-bilangan-cacah-sampai-20",
   "sd1-pasangan-bilangan-10-komposisi-dan"
  ]
 },
 {
  "id": "sd2-membaca-membandingkan-dan-menafsirkan-data",
  "judul": "Membaca, Membandingkan, dan Menafsirkan Data Sederhana",
  "kelas": 2,
  "fase": "A",
  "domain": "data",
  "prasyarat": [
   "sd2-menyajikan-data-dengan-piktogram-maksimal",
   "sd1-pengurangan-bilangan-cacah-sampai-20",
   "sd2-membandingkan-dan-mengurutkan-bilangan-sampai",
   "sd2-strategi-berhitung-mental-dengan-puluhan"
  ]
 },
 {
  "id": "sd2-mengumpulkan-data-dan-mencatat-dengan",
  "judul": "Mengumpulkan Data dan Mencatat dengan Turus",
  "kelas": 2,
  "fase": "A",
  "domain": "data",
  "prasyarat": [
   "sd1-menyortir-dan-mengelompokkan-benda-menurut",
   "sd2-membilang-dan-mengelompokkan-bilangan-sampai",
   "sd2-strategi-berhitung-mental-dengan-puluhan"
  ]
 },
 {
  "id": "sd2-menyajikan-data-dengan-piktogram-maksimal",
  "judul": "Menyajikan Data dengan Piktogram (Maksimal 4 Kategori)",
  "kelas": 2,
  "fase": "A",
  "domain": "data",
  "prasyarat": [
   "sd2-mengumpulkan-data-dan-mencatat-dengan",
   "sd1-menyortir-dan-mengelompokkan-benda-menurut",
   "sd2-membandingkan-dan-mengurutkan-bilangan-sampai"
  ]
 },
 {
  "id": "sd2-komposisi-dan-dekomposisi-bangun-datar",
  "judul": "Komposisi dan Dekomposisi Bangun Datar",
  "kelas": 2,
  "fase": "A",
  "domain": "geometri",
  "prasyarat": [
   "sd1-mengenal-dan-mengelompokkan-bangun-datar",
   "sd1-pola-bukan-bilangan-gambar-warna"
  ]
 },
 {
  "id": "sd2-mengenal-bangun-ruang-balok-kubus",
  "judul": "Mengenal Bangun Ruang (Balok, Kubus, Kerucut, dan Bola)",
  "kelas": 2,
  "fase": "A",
  "domain": "geometri",
  "prasyarat": [
   "sd1-mengenal-dan-mengelompokkan-bangun-datar",
   "sd1-membilang-benda-sampai-10",
   "sd2-membilang-dan-mengelompokkan-bilangan-sampai"
  ]
 },
 {
  "id": "sd2-estimasi-panjang-dan-berat",
  "judul": "Estimasi Panjang dan Berat",
  "kelas": 2,
  "fase": "A",
  "domain": "pengukuran",
  "prasyarat": [
   "sd1-mengukur-panjang-dengan-satuan-tidak",
   "sd2-mengukur-berat-dengan-satuan-tidak",
   "sd2-estimasi-dan-perkiraan-banyak-benda"
  ]
 },
 {
  "id": "sd2-membandingkan-durasi-waktu",
  "judul": "Membandingkan Durasi Waktu",
  "kelas": 2,
  "fase": "A",
  "domain": "pengukuran",
  "prasyarat": [
   "sd1-membandingkan-panjang-dan-tinggi-secara",
   "sd1-membilang-benda-sampai-10",
   "sd2-membandingkan-dan-mengurutkan-bilangan-sampai"
  ]
 },
 {
  "id": "sd2-mengenal-jam-dan-membaca-waktu",
  "judul": "Mengenal Jam dan Membaca Waktu (Pengantar)",
  "kelas": 2,
  "fase": "A",
  "domain": "pengukuran",
  "prasyarat": [
   "sd2-membandingkan-durasi-waktu",
   "sd2-membilang-dan-mengelompokkan-bilangan-sampai",
   "sd1-bilangan-urutan-ordinal-ke-1"
  ]
 },
 {
  "id": "sd2-mengenal-satuan-baku-panjang-dan",
  "judul": "Mengenal Satuan Baku Panjang dan Berat (Jembatan ke Fase B)",
  "kelas": 2,
  "fase": "A",
  "domain": "pengukuran",
  "prasyarat": [
   "sd1-mengukur-panjang-dengan-satuan-tidak",
   "sd2-mengukur-berat-dengan-satuan-tidak",
   "sd2-estimasi-panjang-dan-berat",
   "sd2-membilang-dan-mengelompokkan-bilangan-sampai"
  ]
 },
 {
  "id": "sd2-mengukur-berat-dengan-satuan-tidak",
  "judul": "Mengukur Berat dengan Satuan Tidak Baku",
  "kelas": 2,
  "fase": "A",
  "domain": "pengukuran",
  "prasyarat": [
   "sd1-membandingkan-berat-secara-langsung",
   "sd1-mengukur-panjang-dengan-satuan-tidak",
   "sd2-membilang-dan-mengelompokkan-bilangan-sampai"
  ]
 },
 {
  "id": "sd3-kalimat-matematika-dan-makna-tanda",
  "judul": "Kalimat Matematika dan Makna Tanda Sama Dengan",
  "kelas": 3,
  "fase": "B",
  "domain": "aljabar",
  "prasyarat": [
   "sd1-makna-simbol-dan-keseimbangan",
   "sd1-penjumlahan-bilangan-cacah-sampai-20"
  ]
 },
 {
  "id": "sd3-menemukan-nilai-yang-belum-diketahui",
  "judul": "Menemukan Nilai yang Belum Diketahui pada Penjumlahan dan Pengurangan",
  "kelas": 3,
  "fase": "B",
  "domain": "aljabar",
  "prasyarat": [
   "sd3-kalimat-matematika-dan-makna-tanda",
   "sd1-penjumlahan-bilangan-cacah-sampai-20",
   "sd1-pengurangan-bilangan-cacah-sampai-20"
  ]
 },
 {
  "id": "sd3-bilangan-dan-lambang-bilangan-cacah",
  "judul": "Bilangan dan Lambang Bilangan Cacah sampai 1.000",
  "kelas": 3,
  "fase": "B",
  "domain": "bilangan",
  "prasyarat": [
   "sd1-penjumlahan-bilangan-cacah-sampai-20",
   "sd1-membaca-dan-menulis-lambang-bilangan"
  ]
 },
 {
  "id": "sd3-fakta-dasar-perkalian-dan-tabel",
  "judul": "Fakta Dasar Perkalian dan Tabel Perkalian 1 sampai 10",
  "kelas": 3,
  "fase": "B",
  "domain": "bilangan",
  "prasyarat": [
   "sd3-konsep-perkalian-sebagai-penjumlahan-berulang",
   "sd2-pola-bilangan-membesar-dan-mengecil"
  ]
 },
 {
  "id": "sd3-konsep-pembagian-dan-hubungannya-dengan",
  "judul": "Konsep Pembagian dan Hubungannya dengan Perkalian",
  "kelas": 3,
  "fase": "B",
  "domain": "bilangan",
  "prasyarat": [
   "sd3-konsep-perkalian-sebagai-penjumlahan-berulang",
   "sd3-fakta-dasar-perkalian-dan-tabel",
   "sd1-pengurangan-bilangan-cacah-sampai-20"
  ]
 },
 {
  "id": "sd3-konsep-perkalian-sebagai-penjumlahan-berulang",
  "judul": "Konsep Perkalian sebagai Penjumlahan Berulang",
  "kelas": 3,
  "fase": "B",
  "domain": "bilangan",
  "prasyarat": [
   "sd1-penjumlahan-bilangan-cacah-sampai-20",
   "sd3-bilangan-dan-lambang-bilangan-cacah"
  ],
  "konsep": [
   "perkalian-luas"
  ]
 },
 {
  "id": "sd3-mengumpulkan-mengurutkan-dan-membandingkan-data",
  "judul": "Mengumpulkan, Mengurutkan, dan Membandingkan Data",
  "kelas": 3,
  "fase": "B",
  "domain": "data",
  "prasyarat": [
   "sd2-mengumpulkan-data-dan-mencatat-dengan",
   "sd2-membandingkan-dan-mengurutkan-bilangan-sampai"
  ]
 },
 {
  "id": "sd3-penyajian-data-dalam-tabel",
  "judul": "Penyajian Data dalam Tabel",
  "kelas": 3,
  "fase": "B",
  "domain": "data",
  "prasyarat": [
   "sd3-mengumpulkan-mengurutkan-dan-membandingkan-data",
   "sd1-penjumlahan-bilangan-cacah-sampai-20"
  ]
 },
 {
  "id": "sd3-garis-tegak-lurus-dan-garis",
  "judul": "Garis Tegak Lurus dan Garis Sejajar",
  "kelas": 3,
  "fase": "B",
  "domain": "geometri",
  "prasyarat": [
   "sd3-titik-garis-sinar-garis-ruas",
   "sd3-sudut-dan-jenis-jenis-sudut"
  ]
 },
 {
  "id": "sd3-sudut-dan-jenis-jenis-sudut",
  "judul": "Sudut dan Jenis-Jenis Sudut",
  "kelas": 3,
  "fase": "B",
  "domain": "geometri",
  "prasyarat": [
   "sd3-titik-garis-sinar-garis-ruas",
   "sd1-mengenal-dan-mengelompokkan-bangun-datar"
  ]
 },
 {
  "id": "sd3-titik-garis-sinar-garis-ruas",
  "judul": "Titik, Garis, Sinar Garis, Ruas Garis, dan Kurva",
  "kelas": 3,
  "fase": "B",
  "domain": "geometri",
  "prasyarat": [
   "sd1-mengenal-dan-mengelompokkan-bangun-datar",
   "sd1-posisi-dan-arah-benda"
  ]
 },
 {
  "id": "sd3-hubungan-antarsatuan-baku-berat",
  "judul": "Hubungan Antarsatuan Baku Berat",
  "kelas": 3,
  "fase": "B",
  "domain": "pengukuran",
  "prasyarat": [
   "sd3-pengukuran-berat-dengan-satuan-baku",
   "sd3-hubungan-antarsatuan-baku-panjang",
   "sd3-bilangan-dan-lambang-bilangan-cacah"
  ]
 },
 {
  "id": "sd3-hubungan-antarsatuan-baku-panjang",
  "judul": "Hubungan Antarsatuan Baku Panjang",
  "kelas": 3,
  "fase": "B",
  "domain": "pengukuran",
  "prasyarat": [
   "sd3-pengukuran-panjang-dengan-satuan-baku",
   "sd3-bilangan-dan-lambang-bilangan-cacah"
  ]
 },
 {
  "id": "sd3-pengukuran-berat-dengan-satuan-baku",
  "judul": "Pengukuran Berat dengan Satuan Baku",
  "kelas": 3,
  "fase": "B",
  "domain": "pengukuran",
  "prasyarat": [
   "sd1-membandingkan-berat-secara-langsung",
   "sd2-mengukur-berat-dengan-satuan-tidak",
   "sd3-bilangan-dan-lambang-bilangan-cacah"
  ]
 },
 {
  "id": "sd3-pengukuran-panjang-dengan-satuan-baku",
  "judul": "Pengukuran Panjang dengan Satuan Baku",
  "kelas": 3,
  "fase": "B",
  "domain": "pengukuran",
  "prasyarat": [
   "sd1-mengukur-panjang-dengan-satuan-tidak",
   "sd1-membandingkan-panjang-dan-tinggi-secara",
   "sd3-bilangan-dan-lambang-bilangan-cacah"
  ]
 },
 {
  "id": "sd3-pengukuran-waktu-jam-menit-detik",
  "judul": "Pengukuran Waktu: Jam, Menit, Detik, dan Durasi",
  "kelas": 3,
  "fase": "B",
  "domain": "pengukuran",
  "prasyarat": [
   "sd2-membandingkan-durasi-waktu",
   "sd3-bilangan-dan-lambang-bilangan-cacah",
   "sd1-penjumlahan-bilangan-cacah-sampai-20"
  ]
 },
 {
  "id": "sd4-pola-bilangan-membesar-dan-mengecil",
  "judul": "Pola Bilangan Membesar dan Mengecil",
  "kelas": 4,
  "fase": "B",
  "domain": "aljabar",
  "prasyarat": [
   "sd4-pola-gambar-dan-pola-objek",
   "sd1-penjumlahan-bilangan-cacah-sampai-20",
   "sd1-pengurangan-bilangan-cacah-sampai-20"
  ]
 },
 {
  "id": "sd4-pola-gambar-dan-pola-objek",
  "judul": "Pola Gambar dan Pola Objek Membesar dan Mengecil",
  "kelas": 4,
  "fase": "B",
  "domain": "aljabar",
  "prasyarat": [
   "sd1-pola-bukan-bilangan-gambar-warna",
   "sd1-penjumlahan-bilangan-cacah-sampai-20",
   "sd3-konsep-perkalian-sebagai-penjumlahan-berulang"
  ]
 },
 {
  "id": "sd4-sifat-sifat-operasi-hitung-bilangan",
  "judul": "Sifat-Sifat Operasi Hitung Bilangan Cacah",
  "kelas": 4,
  "fase": "B",
  "domain": "aljabar",
  "prasyarat": [
   "sd1-penjumlahan-bilangan-cacah-sampai-20",
   "sd4-perkalian-bilangan-cacah-sampai-100",
   "sd3-menemukan-nilai-yang-belum-diketahui"
  ]
 },
 {
  "id": "sd4-garis-bilangan-estimasi-dan-pembulatan",
  "judul": "Garis Bilangan, Estimasi, dan Pembulatan Bilangan Cacah",
  "kelas": 4,
  "fase": "B",
  "domain": "bilangan",
  "prasyarat": [
   "sd2-membandingkan-dan-mengurutkan-bilangan-sampai",
   "sd4-nilai-tempat-bilangan-cacah-sampai"
  ]
 },
 {
  "id": "sd4-kelipatan-dan-faktor-bilangan",
  "judul": "Kelipatan dan Faktor Bilangan",
  "kelas": 4,
  "fase": "B",
  "domain": "bilangan",
  "prasyarat": [
   "sd3-konsep-pembagian-dan-hubungannya-dengan",
   "sd3-fakta-dasar-perkalian-dan-tabel",
   "sd4-pembagian-bilangan-cacah-sampai-100"
  ]
 },
 {
  "id": "sd4-komposisi-dan-dekomposisi-bilangan-cacah",
  "judul": "Komposisi dan Dekomposisi Bilangan Cacah sampai 10.000",
  "kelas": 4,
  "fase": "B",
  "domain": "bilangan",
  "prasyarat": [
   "sd4-nilai-tempat-bilangan-cacah-sampai",
   "sd1-penjumlahan-bilangan-cacah-sampai-20"
  ]
 },
 {
  "id": "sd4-membandingkan-dan-mengurutkan-bilangan-cacah",
  "judul": "Membandingkan dan Mengurutkan Bilangan Cacah sampai 10.000",
  "kelas": 4,
  "fase": "B",
  "domain": "bilangan",
  "prasyarat": [
   "sd4-nilai-tempat-bilangan-cacah-sampai",
   "sd3-bilangan-dan-lambang-bilangan-cacah"
  ]
 },
 {
  "id": "sd4-membandingkan-dan-mengurutkan-pecahan-berpenyebut",
  "judul": "Membandingkan dan Mengurutkan Pecahan Berpenyebut Sama",
  "kelas": 4,
  "fase": "B",
  "domain": "bilangan",
  "prasyarat": [
   "sd4-pecahan-dengan-pembilang-satu-pecahan",
   "sd2-membandingkan-dan-mengurutkan-bilangan-sampai"
  ]
 },
 {
  "id": "sd4-nilai-tempat-bilangan-cacah-sampai",
  "judul": "Nilai Tempat Bilangan Cacah sampai 10.000",
  "kelas": 4,
  "fase": "B",
  "domain": "bilangan",
  "prasyarat": [
   "sd3-bilangan-dan-lambang-bilangan-cacah"
  ]
 },
 {
  "id": "sd4-pecahan-dengan-pembilang-satu-pecahan",
  "judul": "Pecahan dengan Pembilang Satu (Pecahan Satuan)",
  "kelas": 4,
  "fase": "B",
  "domain": "bilangan",
  "prasyarat": [
   "sd2-pecahan-setengah-dan-seperempat",
   "sd3-konsep-pembagian-dan-hubungannya-dengan",
   "sd2-membandingkan-dan-mengurutkan-bilangan-sampai"
  ]
 },
 {
  "id": "sd4-pecahan-desimal-persepuluhan-dan-perseratusan",
  "judul": "Pecahan Desimal Persepuluhan dan Perseratusan",
  "kelas": 4,
  "fase": "B",
  "domain": "bilangan",
  "prasyarat": [
   "sd4-nilai-tempat-bilangan-cacah-sampai",
   "sd4-pecahan-senilai",
   "sd4-membandingkan-dan-mengurutkan-pecahan-berpenyebut"
  ]
 },
 {
  "id": "sd4-pecahan-senilai",
  "judul": "Pecahan Senilai",
  "kelas": 4,
  "fase": "B",
  "domain": "bilangan",
  "prasyarat": [
   "sd4-pecahan-dengan-pembilang-satu-pecahan",
   "sd4-membandingkan-dan-mengurutkan-pecahan-berpenyebut",
   "sd4-kelipatan-dan-faktor-bilangan"
  ]
 },
 {
  "id": "sd4-pembagian-bilangan-cacah-sampai-100",
  "judul": "Pembagian Bilangan Cacah sampai 100 (Teknik Bersusun/Porogapet)",
  "kelas": 4,
  "fase": "B",
  "domain": "bilangan",
  "prasyarat": [
   "sd3-konsep-pembagian-dan-hubungannya-dengan",
   "sd4-perkalian-bilangan-cacah-sampai-100",
   "sd1-pengurangan-bilangan-cacah-sampai-20"
  ]
 },
 {
  "id": "sd4-pengurangan-bilangan-cacah-sampai-1",
  "judul": "Pengurangan Bilangan Cacah sampai 1.000",
  "kelas": 4,
  "fase": "B",
  "domain": "bilangan",
  "prasyarat": [
   "sd1-penjumlahan-bilangan-cacah-sampai-20",
   "sd4-nilai-tempat-bilangan-cacah-sampai"
  ]
 },
 {
  "id": "sd4-penjumlahan-bilangan-cacah-sampai-1",
  "judul": "Penjumlahan Bilangan Cacah sampai 1.000",
  "kelas": 4,
  "fase": "B",
  "domain": "bilangan",
  "prasyarat": [
   "sd4-nilai-tempat-bilangan-cacah-sampai",
   "sd4-pengurangan-bilangan-cacah-sampai-1",
   "sd4-komposisi-dan-dekomposisi-bilangan-cacah"
  ]
 },
 {
  "id": "sd4-perkalian-bilangan-cacah-sampai-100",
  "judul": "Perkalian Bilangan Cacah sampai 100 (Bersusun dan Menyimpan)",
  "kelas": 4,
  "fase": "B",
  "domain": "bilangan",
  "prasyarat": [
   "sd3-fakta-dasar-perkalian-dan-tabel",
   "sd4-nilai-tempat-bilangan-cacah-sampai",
   "sd4-sifat-sifat-operasi-hitung-bilangan"
  ]
 },
 {
  "id": "sd4-persen-dan-hubungannya-dengan-pecahan",
  "judul": "Persen dan Hubungannya dengan Pecahan Desimal Perseratusan",
  "kelas": 4,
  "fase": "B",
  "domain": "bilangan",
  "prasyarat": [
   "sd4-pecahan-desimal-persepuluhan-dan-perseratusan",
   "sd4-pecahan-senilai"
  ]
 },
 {
  "id": "sd4-diagram-batang-skala-satu-satuan",
  "judul": "Diagram Batang Skala Satu Satuan",
  "kelas": 4,
  "fase": "B",
  "domain": "data",
  "prasyarat": [
   "sd3-penyajian-data-dalam-tabel",
   "sd4-piktogram-diagram-gambar",
   "sd4-garis-bilangan-estimasi-dan-pembulatan"
  ]
 },
 {
  "id": "sd4-piktogram-diagram-gambar",
  "judul": "Piktogram (Diagram Gambar)",
  "kelas": 4,
  "fase": "B",
  "domain": "data",
  "prasyarat": [
   "sd3-penyajian-data-dalam-tabel",
   "sd3-konsep-perkalian-sebagai-penjumlahan-berulang",
   "sd4-pecahan-dengan-pembilang-satu-pecahan"
  ]
 },
 {
  "id": "sd4-ciri-ciri-segiempat-persegi-persegi",
  "judul": "Ciri-Ciri Segiempat: Persegi, Persegi Panjang, Jajargenjang, Trapesium, Belah Ketupat, Layang-Layang",
  "kelas": 4,
  "fase": "B",
  "domain": "geometri",
  "prasyarat": [
   "sd3-garis-tegak-lurus-dan-garis",
   "sd3-sudut-dan-jenis-jenis-sudut",
   "sd4-ciri-ciri-segitiga-dan-jenis"
  ]
 },
 {
  "id": "sd4-ciri-ciri-segitiga-dan-jenis",
  "judul": "Ciri-Ciri Segitiga dan Jenis-Jenisnya",
  "kelas": 4,
  "fase": "B",
  "domain": "geometri",
  "prasyarat": [
   "sd3-sudut-dan-jenis-jenis-sudut",
   "sd3-garis-tegak-lurus-dan-garis",
   "sd3-titik-garis-sinar-garis-ruas"
  ]
 },
 {
  "id": "sd4-komposisi-dan-dekomposisi-bangun-datar",
  "judul": "Komposisi dan Dekomposisi Bangun Datar",
  "kelas": 4,
  "fase": "B",
  "domain": "geometri",
  "prasyarat": [
   "sd4-ciri-ciri-segiempat-persegi-persegi",
   "sd4-ciri-ciri-segitiga-dan-jenis",
   "sd4-segi-banyak-beraturan-dan-tidak"
  ]
 },
 {
  "id": "sd4-segi-banyak-beraturan-dan-tidak",
  "judul": "Segi Banyak Beraturan dan Tidak Beraturan",
  "kelas": 4,
  "fase": "B",
  "domain": "geometri",
  "prasyarat": [
   "sd3-titik-garis-sinar-garis-ruas",
   "sd4-ciri-ciri-segitiga-dan-jenis",
   "sd4-ciri-ciri-segiempat-persegi-persegi"
  ]
 },
 {
  "id": "sd4-keliling-bangun-datar-pengenalan",
  "judul": "Keliling Bangun Datar (Pengenalan)",
  "kelas": 4,
  "fase": "B",
  "domain": "pengukuran",
  "prasyarat": [
   "sd3-pengukuran-panjang-dengan-satuan-baku",
   "sd4-ciri-ciri-segiempat-persegi-persegi",
   "sd1-penjumlahan-bilangan-cacah-sampai-20"
  ]
 },
 {
  "id": "sd4-pengukuran-luas-dengan-satuan-tidak",
  "judul": "Pengukuran Luas dengan Satuan Tidak Baku dan Persegi Satuan",
  "kelas": 4,
  "fase": "B",
  "domain": "pengukuran",
  "prasyarat": [
   "sd3-pengukuran-panjang-dengan-satuan-baku",
   "sd3-konsep-perkalian-sebagai-penjumlahan-berulang",
   "sd2-komposisi-dan-dekomposisi-bangun-datar"
  ]
 },
 {
  "id": "sd4-pengukuran-volume-dengan-kubus-satuan",
  "judul": "Pengukuran Volume dengan Kubus Satuan dan Satuan Baku",
  "kelas": 4,
  "fase": "B",
  "domain": "pengukuran",
  "prasyarat": [
   "sd4-pengukuran-luas-dengan-satuan-tidak",
   "sd4-satuan-baku-luas-dan-estimasi",
   "sd2-mengenal-bangun-ruang-balok-kubus"
  ]
 },
 {
  "id": "sd4-satuan-baku-luas-dan-estimasi",
  "judul": "Satuan Baku Luas dan Estimasi Luas",
  "kelas": 4,
  "fase": "B",
  "domain": "pengukuran",
  "prasyarat": [
   "sd4-pengukuran-luas-dengan-satuan-tidak",
   "sd3-hubungan-antarsatuan-baku-panjang",
   "sd4-perkalian-bilangan-cacah-sampai-100"
  ]
 },
 {
  "id": "sd5-kalimat-matematika-dan-nilai-yang",
  "judul": "Kalimat Matematika dan Nilai yang Belum Diketahui",
  "kelas": 5,
  "fase": "C",
  "domain": "aljabar",
  "prasyarat": [
   "sd5-sifat-operasi-hitung-dan-operasi",
   "sd4-perkalian-bilangan-cacah-sampai-100",
   "sd4-pembagian-bilangan-cacah-sampai-100",
   "sd3-menemukan-nilai-yang-belum-diketahui"
  ]
 },
 {
  "id": "sd5-pola-bilangan-membesar-dan-mengecil",
  "judul": "Pola Bilangan Membesar dan Mengecil",
  "kelas": 5,
  "fase": "C",
  "domain": "aljabar",
  "prasyarat": [
   "sd4-perkalian-bilangan-cacah-sampai-100",
   "sd4-pembagian-bilangan-cacah-sampai-100",
   "sd4-pola-bilangan-membesar-dan-mengecil"
  ]
 },
 {
  "id": "sd5-kelipatan-faktor-bilangan-prima-dan",
  "judul": "Kelipatan, Faktor, Bilangan Prima, dan Faktorisasi Prima",
  "kelas": 5,
  "fase": "C",
  "domain": "bilangan",
  "prasyarat": [
   "sd4-perkalian-bilangan-cacah-sampai-100",
   "sd4-pembagian-bilangan-cacah-sampai-100",
   "sd4-kelipatan-dan-faktor-bilangan"
  ]
 },
 {
  "id": "sd5-kpk-dan-fpb",
  "judul": "KPK dan FPB",
  "kelas": 5,
  "fase": "C",
  "domain": "bilangan",
  "prasyarat": [
   "sd4-kelipatan-dan-faktor-bilangan",
   "sd4-perkalian-bilangan-cacah-sampai-100",
   "sd4-pembagian-bilangan-cacah-sampai-100"
  ]
 },
 {
  "id": "sd5-membandingkan-dan-mengurutkan-bilangan-cacah",
  "judul": "Membandingkan dan Mengurutkan Bilangan Cacah Besar",
  "kelas": 5,
  "fase": "C",
  "domain": "bilangan",
  "prasyarat": [
   "sd4-nilai-tempat-bilangan-cacah-sampai",
   "sd2-membandingkan-dan-mengurutkan-bilangan-sampai",
   "sd4-garis-bilangan-estimasi-dan-pembulatan"
  ]
 },
 {
  "id": "sd5-membandingkan-dan-mengurutkan-pecahan",
  "judul": "Membandingkan dan Mengurutkan Pecahan",
  "kelas": 5,
  "fase": "C",
  "domain": "bilangan",
  "prasyarat": [
   "sd4-pecahan-senilai",
   "sd5-pecahan-campuran-dan-pecahan-tidak"
  ]
 },
 {
  "id": "sd5-menyelesaikan-masalah-yang-berkaitan-dengan",
  "judul": "Menyelesaikan Masalah yang Berkaitan dengan Uang (Rupiah)",
  "kelas": 5,
  "fase": "C",
  "domain": "bilangan",
  "prasyarat": [
   "sd4-penjumlahan-bilangan-cacah-sampai-1",
   "sd4-perkalian-bilangan-cacah-sampai-100",
   "sd4-pembagian-bilangan-cacah-sampai-100",
   "sd5-pembulatan-dan-penaksiran-estimasi"
  ]
 },
 {
  "id": "sd5-nilai-tempat-bilangan-cacah-sampai",
  "judul": "Nilai Tempat Bilangan Cacah sampai 1.000.000",
  "kelas": 5,
  "fase": "C",
  "domain": "bilangan",
  "prasyarat": [
   "sd4-nilai-tempat-bilangan-cacah-sampai",
   "sd4-komposisi-dan-dekomposisi-bilangan-cacah",
   "sd1-membaca-dan-menulis-lambang-bilangan"
  ]
 },
 {
  "id": "sd5-pecahan-campuran-dan-pecahan-tidak",
  "judul": "Pecahan Campuran dan Pecahan Tidak Murni",
  "kelas": 5,
  "fase": "C",
  "domain": "bilangan",
  "prasyarat": [
   "sd4-pecahan-senilai",
   "sd4-pembagian-bilangan-cacah-sampai-100"
  ]
 },
 {
  "id": "sd5-pecahan-senilai-dan-penyederhanaan-pecahan",
  "judul": "Pecahan Senilai dan Penyederhanaan Pecahan",
  "kelas": 5,
  "fase": "C",
  "domain": "bilangan",
  "prasyarat": [
   "sd4-pecahan-senilai",
   "sd4-kelipatan-dan-faktor-bilangan"
  ]
 },
 {
  "id": "sd5-pembagian-bilangan-cacah",
  "judul": "Pembagian Bilangan Cacah",
  "kelas": 5,
  "fase": "C",
  "domain": "bilangan",
  "prasyarat": [
   "sd4-perkalian-bilangan-cacah-sampai-100",
   "sd4-pembagian-bilangan-cacah-sampai-100",
   "sd4-penjumlahan-bilangan-cacah-sampai-1"
  ]
 },
 {
  "id": "sd5-pembulatan-dan-penaksiran-estimasi",
  "judul": "Pembulatan dan Penaksiran (Estimasi)",
  "kelas": 5,
  "fase": "C",
  "domain": "bilangan",
  "prasyarat": [
   "sd4-nilai-tempat-bilangan-cacah-sampai",
   "sd5-membandingkan-dan-mengurutkan-bilangan-cacah",
   "sd4-penjumlahan-bilangan-cacah-sampai-1"
  ]
 },
 {
  "id": "sd5-penjumlahan-dan-pengurangan-bilangan-cacah",
  "judul": "Penjumlahan dan Pengurangan Bilangan Cacah sampai 100.000",
  "kelas": 5,
  "fase": "C",
  "domain": "bilangan",
  "prasyarat": [
   "sd4-nilai-tempat-bilangan-cacah-sampai",
   "sd4-penjumlahan-bilangan-cacah-sampai-1"
  ]
 },
 {
  "id": "sd5-penjumlahan-dan-pengurangan-pecahan",
  "judul": "Penjumlahan dan Pengurangan Pecahan",
  "kelas": 5,
  "fase": "C",
  "domain": "bilangan",
  "prasyarat": [
   "sd4-membandingkan-dan-mengurutkan-pecahan-berpenyebut",
   "sd4-pecahan-senilai",
   "sd5-pecahan-campuran-dan-pecahan-tidak"
  ],
  "konsep": [
   "pecahan-penyebut"
  ]
 },
 {
  "id": "sd5-perkalian-bilangan-cacah",
  "judul": "Perkalian Bilangan Cacah",
  "kelas": 5,
  "fase": "C",
  "domain": "bilangan",
  "prasyarat": [
   "sd4-nilai-tempat-bilangan-cacah-sampai",
   "sd4-perkalian-bilangan-cacah-sampai-100",
   "sd5-sifat-operasi-hitung-dan-operasi"
  ]
 },
 {
  "id": "sd5-sifat-operasi-hitung-dan-operasi",
  "judul": "Sifat Operasi Hitung dan Operasi Hitung Campuran",
  "kelas": 5,
  "fase": "C",
  "domain": "bilangan",
  "prasyarat": [
   "sd4-perkalian-bilangan-cacah-sampai-100",
   "sd4-pembagian-bilangan-cacah-sampai-100",
   "sd4-penjumlahan-bilangan-cacah-sampai-1"
  ]
 },
 {
  "id": "sd5-mengumpulkan-data-dan-menyajikannya-dalam",
  "judul": "Mengumpulkan Data dan Menyajikannya dalam Tabel Frekuensi",
  "kelas": 5,
  "fase": "C",
  "domain": "data",
  "prasyarat": [
   "sd4-piktogram-diagram-gambar",
   "sd4-penjumlahan-bilangan-cacah-sampai-1"
  ]
 },
 {
  "id": "sd5-piktogram-dan-diagram-batang-berskala",
  "judul": "Piktogram dan Diagram Batang Berskala",
  "kelas": 5,
  "fase": "C",
  "domain": "data",
  "prasyarat": [
   "sd5-mengumpulkan-data-dan-menyajikannya-dalam",
   "sd4-perkalian-bilangan-cacah-sampai-100",
   "sd4-pembagian-bilangan-cacah-sampai-100",
   "sd4-diagram-batang-skala-satu-satuan"
  ]
 },
 {
  "id": "sd5-ciri-ciri-dan-klasifikasi-bangun",
  "judul": "Ciri-ciri dan Klasifikasi Bangun Datar",
  "kelas": 5,
  "fase": "C",
  "domain": "geometri",
  "prasyarat": [
   "sd5-keliling-bangun-datar",
   "sd5-sudut-dan-pengukurannya-dengan-busur"
  ]
 },
 {
  "id": "sd5-hubungan-antarsudut-pada-dua-garis",
  "judul": "Hubungan Antarsudut pada Dua Garis Berpotongan",
  "kelas": 5,
  "fase": "C",
  "domain": "pengukuran",
  "prasyarat": [
   "sd5-sudut-dan-pengukurannya-dengan-busur",
   "sd5-kalimat-matematika-dan-nilai-yang"
  ]
 },
 {
  "id": "sd5-keliling-bangun-datar",
  "judul": "Keliling Bangun Datar",
  "kelas": 5,
  "fase": "C",
  "domain": "pengukuran",
  "prasyarat": [
   "sd5-satuan-baku-dan-konversi-satuan",
   "sd5-ciri-ciri-dan-klasifikasi-bangun",
   "sd4-penjumlahan-bilangan-cacah-sampai-1"
  ]
 },
 {
  "id": "sd5-luas-bangun-datar-gabungan-dan",
  "judul": "Luas Bangun Datar Gabungan dan Hubungan Keliling dengan Luas",
  "kelas": 5,
  "fase": "C",
  "domain": "pengukuran",
  "prasyarat": [
   "sd5-luas-persegi-persegi-panjang-dan",
   "sd5-luas-jajargenjang-trapesium-belah-ketupat",
   "sd4-keliling-bangun-datar-pengenalan"
  ]
 },
 {
  "id": "sd5-luas-jajargenjang-trapesium-belah-ketupat",
  "judul": "Luas Jajargenjang, Trapesium, Belah Ketupat, dan Layang-layang",
  "kelas": 5,
  "fase": "C",
  "domain": "pengukuran",
  "prasyarat": [
   "sd5-luas-persegi-persegi-panjang-dan",
   "sd5-ciri-ciri-dan-klasifikasi-bangun",
   "sd5-satuan-baku-dan-konversi-satuan"
  ]
 },
 {
  "id": "sd5-luas-persegi-persegi-panjang-dan",
  "judul": "Luas Persegi, Persegi Panjang, dan Segitiga",
  "kelas": 5,
  "fase": "C",
  "domain": "pengukuran",
  "prasyarat": [
   "sd4-keliling-bangun-datar-pengenalan",
   "sd5-satuan-baku-dan-konversi-satuan",
   "sd4-perkalian-bilangan-cacah-sampai-100",
   "sd5-ciri-ciri-dan-klasifikasi-bangun"
  ],
  "konsep": [
   "segitiga-setengah"
  ]
 },
 {
  "id": "sd5-satuan-baku-dan-konversi-satuan",
  "judul": "Satuan Baku dan Konversi Satuan (Panjang, Berat, Volume, Waktu)",
  "kelas": 5,
  "fase": "C",
  "domain": "pengukuran",
  "prasyarat": [
   "sd3-hubungan-antarsatuan-baku-panjang",
   "sd4-perkalian-bilangan-cacah-sampai-100",
   "sd4-pembagian-bilangan-cacah-sampai-100",
   "sd2-membandingkan-dan-mengurutkan-bilangan-sampai"
  ]
 },
 {
  "id": "sd5-sudut-dan-pengukurannya-dengan-busur",
  "judul": "Sudut dan Pengukurannya dengan Busur Derajat",
  "kelas": 5,
  "fase": "C",
  "domain": "pengukuran",
  "prasyarat": [
   "sd5-ciri-ciri-dan-klasifikasi-bangun",
   "sd5-satuan-baku-dan-konversi-satuan",
   "sd4-penjumlahan-bilangan-cacah-sampai-1"
  ]
 },
 {
  "id": "sd5-waktu-dan-durasi",
  "judul": "Waktu dan Durasi",
  "kelas": 5,
  "fase": "C",
  "domain": "pengukuran",
  "prasyarat": [
   "sd5-satuan-baku-dan-konversi-satuan",
   "sd4-penjumlahan-bilangan-cacah-sampai-1",
   "sd2-membandingkan-durasi-waktu"
  ]
 },
 {
  "id": "sd6-kecepatan-dan-debit-perbandingan-dua",
  "judul": "Kecepatan dan Debit (Perbandingan Dua Besaran Berbeda)",
  "kelas": 6,
  "fase": "C",
  "domain": "aljabar",
  "prasyarat": [
   "sd6-rasio-senilai-rasio-satuan-dan",
   "sd5-satuan-baku-dan-konversi-satuan",
   "sd2-membandingkan-durasi-waktu",
   "sd6-volume-kubus-dan-balok"
  ]
 },
 {
  "id": "sd6-konsep-rasio-dan-perbandingan",
  "judul": "Konsep Rasio dan Perbandingan",
  "kelas": 6,
  "fase": "C",
  "domain": "aljabar",
  "prasyarat": [
   "sd4-pecahan-senilai",
   "sd4-perkalian-bilangan-cacah-sampai-100",
   "sd4-pembagian-bilangan-cacah-sampai-100"
  ]
 },
 {
  "id": "sd6-rasio-senilai-rasio-satuan-dan",
  "judul": "Rasio Senilai, Rasio Satuan, dan Penalaran Proporsional",
  "kelas": 6,
  "fase": "C",
  "domain": "aljabar",
  "prasyarat": [
   "sd6-konsep-rasio-dan-perbandingan",
   "sd4-pembagian-bilangan-cacah-sampai-100",
   "sd6-perkalian-pecahan-dengan-bilangan-asli",
   "sd6-hubungan-pecahan-desimal-dan-persen"
  ]
 },
 {
  "id": "sd6-skala-pada-denah-dan-peta",
  "judul": "Skala pada Denah dan Peta",
  "kelas": 6,
  "fase": "C",
  "domain": "aljabar",
  "prasyarat": [
   "sd6-rasio-senilai-rasio-satuan-dan",
   "sd5-satuan-baku-dan-konversi-satuan",
   "sd4-perkalian-bilangan-cacah-sampai-100",
   "sd4-pembagian-bilangan-cacah-sampai-100"
  ]
 },
 {
  "id": "sd6-bilangan-desimal-nilai-tempat-membandingkan",
  "judul": "Bilangan Desimal: Nilai Tempat, Membandingkan, dan Mengurutkan",
  "kelas": 6,
  "fase": "C",
  "domain": "bilangan",
  "prasyarat": [
   "sd4-pecahan-senilai",
   "sd4-nilai-tempat-bilangan-cacah-sampai",
   "sd4-pembagian-bilangan-cacah-sampai-100",
   "sd5-pembulatan-dan-penaksiran-estimasi"
  ]
 },
 {
  "id": "sd6-garis-bilangan-dan-bilangan-bulat",
  "judul": "Garis Bilangan dan Bilangan Bulat Negatif",
  "kelas": 6,
  "fase": "C",
  "domain": "bilangan",
  "prasyarat": [
   "sd5-membandingkan-dan-mengurutkan-bilangan-cacah",
   "sd4-nilai-tempat-bilangan-cacah-sampai"
  ]
 },
 {
  "id": "sd6-hubungan-pecahan-desimal-dan-persen",
  "judul": "Hubungan Pecahan, Desimal, dan Persen",
  "kelas": 6,
  "fase": "C",
  "domain": "bilangan",
  "prasyarat": [
   "sd6-bilangan-desimal-nilai-tempat-membandingkan",
   "sd4-pecahan-senilai",
   "sd4-membandingkan-dan-mengurutkan-pecahan-berpenyebut"
  ]
 },
 {
  "id": "sd6-operasi-penjumlahan-dan-pengurangan-bilangan",
  "judul": "Operasi Penjumlahan dan Pengurangan Bilangan Bulat",
  "kelas": 6,
  "fase": "C",
  "domain": "bilangan",
  "prasyarat": [
   "sd6-garis-bilangan-dan-bilangan-bulat",
   "sd4-penjumlahan-bilangan-cacah-sampai-1",
   "sd5-sifat-operasi-hitung-dan-operasi"
  ]
 },
 {
  "id": "sd6-pangkat-dua-pangkat-tiga-dan",
  "judul": "Pangkat Dua, Pangkat Tiga, dan Akarnya",
  "kelas": 6,
  "fase": "C",
  "domain": "bilangan",
  "prasyarat": [
   "sd4-perkalian-bilangan-cacah-sampai-100",
   "sd4-kelipatan-dan-faktor-bilangan",
   "sd6-bilangan-desimal-nilai-tempat-membandingkan"
  ]
 },
 {
  "id": "sd6-pembagian-pecahan",
  "judul": "Pembagian Pecahan",
  "kelas": 6,
  "fase": "C",
  "domain": "bilangan",
  "prasyarat": [
   "sd6-perkalian-pecahan-dengan-bilangan-asli",
   "sd4-pembagian-bilangan-cacah-sampai-100",
   "sd5-pecahan-campuran-dan-pecahan-tidak"
  ],
  "konsep": [
   "bagi-pecahan"
  ]
 },
 {
  "id": "sd6-penerapan-persen-dalam-kehidupan-sehari",
  "judul": "Penerapan Persen dalam Kehidupan Sehari-hari",
  "kelas": 6,
  "fase": "C",
  "domain": "bilangan",
  "prasyarat": [
   "sd6-hubungan-pecahan-desimal-dan-persen",
   "sd6-perkalian-pecahan-dengan-bilangan-asli",
   "sd5-menyelesaikan-masalah-yang-berkaitan-dengan"
  ],
  "konsep": [
   "persen-dari"
  ]
 },
 {
  "id": "sd6-perkalian-pecahan-dengan-bilangan-asli",
  "judul": "Perkalian Pecahan dengan Bilangan Asli dan dengan Pecahan",
  "kelas": 6,
  "fase": "C",
  "domain": "bilangan",
  "prasyarat": [
   "sd4-pecahan-senilai",
   "sd5-pecahan-campuran-dan-pecahan-tidak",
   "sd4-perkalian-bilangan-cacah-sampai-100",
   "sd5-penjumlahan-dan-pengurangan-pecahan"
  ]
 },
 {
  "id": "sd6-diagram-garis-dan-diagram-lingkaran",
  "judul": "Diagram Garis dan Diagram Lingkaran",
  "kelas": 6,
  "fase": "C",
  "domain": "data",
  "prasyarat": [
   "sd5-piktogram-dan-diagram-batang-berskala",
   "sd6-hubungan-pecahan-desimal-dan-persen",
   "sd5-sudut-dan-pengukurannya-dengan-busur",
   "sd6-penerapan-persen-dalam-kehidupan-sehari"
  ]
 },
 {
  "id": "sd6-kemungkinan-dan-skala-peluang",
  "judul": "Kemungkinan dan Skala Peluang",
  "kelas": 6,
  "fase": "C",
  "domain": "data",
  "prasyarat": [
   "sd6-hubungan-pecahan-desimal-dan-persen",
   "sd4-pecahan-senilai",
   "sd5-mengumpulkan-data-dan-menyajikannya-dalam"
  ]
 },
 {
  "id": "sd6-mean-median-dan-modus-data",
  "judul": "Mean, Median, dan Modus Data Tunggal",
  "kelas": 6,
  "fase": "C",
  "domain": "data",
  "prasyarat": [
   "sd5-mengumpulkan-data-dan-menyajikannya-dalam",
   "sd5-piktogram-dan-diagram-batang-berskala",
   "sd4-pembagian-bilangan-cacah-sampai-100",
   "sd6-bilangan-desimal-nilai-tempat-membandingkan"
  ]
 },
 {
  "id": "sd6-membandingkan-peluang-kejadian-dalam-percobaan",
  "judul": "Membandingkan Peluang Kejadian dalam Percobaan Acak",
  "kelas": 6,
  "fase": "C",
  "domain": "data",
  "prasyarat": [
   "sd6-kemungkinan-dan-skala-peluang",
   "sd4-membandingkan-dan-mengurutkan-pecahan-berpenyebut",
   "sd6-konsep-rasio-dan-perbandingan",
   "sd6-diagram-garis-dan-diagram-lingkaran"
  ]
 },
 {
  "id": "sd6-jaring-jaring-kubus-dan-balok",
  "judul": "Jaring-jaring Kubus dan Balok",
  "kelas": 6,
  "fase": "C",
  "domain": "geometri",
  "prasyarat": [
   "sd6-unsur-kubus-dan-balok",
   "sd5-ciri-ciri-dan-klasifikasi-bangun",
   "sd5-luas-persegi-persegi-panjang-dan"
  ]
 },
 {
  "id": "sd6-menentukan-lokasi-pada-sistem-berpetak",
  "judul": "Menentukan Lokasi pada Sistem Berpetak (Menuju Koordinat)",
  "kelas": 6,
  "fase": "C",
  "domain": "geometri",
  "prasyarat": [
   "sd1-posisi-dan-arah-benda",
   "sd5-ciri-ciri-dan-klasifikasi-bangun",
   "sd5-membandingkan-dan-mengurutkan-bilangan-cacah"
  ]
 },
 {
  "id": "sd6-mengenal-prisma-tabung-limas-kerucut",
  "judul": "Mengenal Prisma, Tabung, Limas, Kerucut, dan Bola",
  "kelas": 6,
  "fase": "C",
  "domain": "geometri",
  "prasyarat": [
   "sd6-unsur-kubus-dan-balok",
   "sd5-ciri-ciri-dan-klasifikasi-bangun",
   "sd6-jaring-jaring-kubus-dan-balok"
  ]
 },
 {
  "id": "sd6-mengonstruksi-dan-mengurai-bangun-ruang",
  "judul": "Mengonstruksi dan Mengurai Bangun Ruang dengan Kubus Satuan",
  "kelas": 6,
  "fase": "C",
  "domain": "geometri",
  "prasyarat": [
   "sd6-unsur-kubus-dan-balok",
   "sd4-perkalian-bilangan-cacah-sampai-100",
   "sd1-mengukur-panjang-dengan-satuan-tidak"
  ]
 },
 {
  "id": "sd6-unsur-kubus-dan-balok",
  "judul": "Unsur Kubus dan Balok",
  "kelas": 6,
  "fase": "C",
  "domain": "geometri",
  "prasyarat": [
   "sd5-ciri-ciri-dan-klasifikasi-bangun",
   "sd2-mengenal-bangun-ruang-balok-kubus"
  ]
 },
 {
  "id": "sd6-visualisasi-spasial-tampak-depan-atas",
  "judul": "Visualisasi Spasial: Tampak Depan, Atas, dan Samping",
  "kelas": 6,
  "fase": "C",
  "domain": "geometri",
  "prasyarat": [
   "sd6-mengonstruksi-dan-mengurai-bangun-ruang",
   "sd6-unsur-kubus-dan-balok",
   "sd1-posisi-dan-arah-benda"
  ]
 },
 {
  "id": "sd6-keliling-dan-luas-lingkaran",
  "judul": "Keliling dan Luas Lingkaran",
  "kelas": 6,
  "fase": "C",
  "domain": "pengukuran",
  "prasyarat": [
   "sd5-keliling-bangun-datar",
   "sd6-pangkat-dua-pangkat-tiga-dan",
   "sd6-perkalian-pecahan-dengan-bilangan-asli",
   "sd5-satuan-baku-dan-konversi-satuan"
  ],
  "konsep": [
   "pi-dari-mana",
   "lingkaran-luas"
  ]
 },
 {
  "id": "sd6-luas-permukaan-kubus-dan-balok",
  "judul": "Luas Permukaan Kubus dan Balok",
  "kelas": 6,
  "fase": "C",
  "domain": "pengukuran",
  "prasyarat": [
   "sd6-jaring-jaring-kubus-dan-balok",
   "sd5-luas-persegi-persegi-panjang-dan",
   "sd6-volume-kubus-dan-balok",
   "sd6-pangkat-dua-pangkat-tiga-dan"
  ]
 },
 {
  "id": "sd6-volume-kubus-dan-balok",
  "judul": "Volume Kubus dan Balok",
  "kelas": 6,
  "fase": "C",
  "domain": "pengukuran",
  "prasyarat": [
   "sd6-pangkat-dua-pangkat-tiga-dan",
   "sd5-satuan-baku-dan-konversi-satuan",
   "sd6-unsur-kubus-dan-balok",
   "sd4-perkalian-bilangan-cacah-sampai-100"
  ]
 },
 {
  "id": "smp7-bentuk-aljabar-dan-unsur-unsurnya",
  "judul": "Bentuk Aljabar dan Unsur-unsurnya",
  "kelas": 7,
  "fase": "D",
  "domain": "aljabar",
  "prasyarat": [
   "smp7-operasi-hitung-bilangan-bulat",
   "smp7-operasi-bilangan-rasional"
  ]
 },
 {
  "id": "smp7-operasi-penjumlahan-dan-pengurangan-bentuk",
  "judul": "Operasi Penjumlahan dan Pengurangan Bentuk Aljabar",
  "kelas": 7,
  "fase": "D",
  "domain": "aljabar",
  "prasyarat": [
   "smp7-bentuk-aljabar-dan-unsur-unsurnya",
   "smp7-operasi-hitung-bilangan-bulat"
  ]
 },
 {
  "id": "smp7-persamaan-linear-satu-variabel",
  "judul": "Persamaan Linear Satu Variabel",
  "kelas": 7,
  "fase": "D",
  "domain": "aljabar",
  "prasyarat": [
   "smp7-operasi-penjumlahan-dan-pengurangan-bentuk",
   "smp7-operasi-hitung-bilangan-bulat"
  ],
  "konsep": [
   "timbangan-persamaan"
  ]
 },
 {
  "id": "smp7-pertidaksamaan-linear-satu-variabel",
  "judul": "Pertidaksamaan Linear Satu Variabel",
  "kelas": 7,
  "fase": "D",
  "domain": "aljabar",
  "prasyarat": [
   "smp7-persamaan-linear-satu-variabel",
   "sd6-garis-bilangan-dan-bilangan-bulat"
  ]
 },
 {
  "id": "smp7-aritmetika-sosial-untung-rugi-dan",
  "judul": "Aritmetika Sosial: Untung, Rugi, dan Diskon",
  "kelas": 7,
  "fase": "D",
  "domain": "bilangan",
  "prasyarat": [
   "smp7-bilangan-desimal-persen-dan-estimasi",
   "sd6-konsep-rasio-dan-perbandingan"
  ]
 },
 {
  "id": "smp7-bilangan-bulat-dan-garis-bilangan",
  "judul": "Bilangan Bulat dan Garis Bilangan",
  "kelas": 7,
  "fase": "D",
  "domain": "bilangan",
  "prasyarat": [
   "sd4-nilai-tempat-bilangan-cacah-sampai",
   "sd4-membandingkan-dan-mengurutkan-bilangan-cacah"
  ]
 },
 {
  "id": "smp7-bilangan-desimal-persen-dan-estimasi",
  "judul": "Bilangan Desimal, Persen, dan Estimasi",
  "kelas": 7,
  "fase": "D",
  "domain": "bilangan",
  "prasyarat": [
   "smp7-bilangan-rasional-dan-bentuk-pecahan",
   "smp7-operasi-bilangan-rasional"
  ]
 },
 {
  "id": "smp7-bilangan-rasional-dan-bentuk-pecahan",
  "judul": "Bilangan Rasional dan Bentuk Pecahan",
  "kelas": 7,
  "fase": "D",
  "domain": "bilangan",
  "prasyarat": [
   "sd5-kelipatan-faktor-bilangan-prima-dan",
   "sd5-pecahan-campuran-dan-pecahan-tidak"
  ]
 },
 {
  "id": "smp7-bruto-netto-dan-tara",
  "judul": "Bruto, Netto, dan Tara",
  "kelas": 7,
  "fase": "D",
  "domain": "bilangan",
  "prasyarat": [
   "smp7-aritmetika-sosial-untung-rugi-dan",
   "smp7-bilangan-desimal-persen-dan-estimasi"
  ]
 },
 {
  "id": "smp7-bunga-tunggal-pajak-dan-literasi",
  "judul": "Bunga Tunggal, Pajak, dan Literasi Finansial",
  "kelas": 7,
  "fase": "D",
  "domain": "bilangan",
  "prasyarat": [
   "smp7-aritmetika-sosial-untung-rugi-dan",
   "smp7-bilangan-desimal-persen-dan-estimasi"
  ]
 },
 {
  "id": "smp7-faktorisasi-prima-kpk-dan-fpb",
  "judul": "Faktorisasi Prima, KPK, dan FPB",
  "kelas": 7,
  "fase": "D",
  "domain": "bilangan",
  "prasyarat": [
   "smp7-operasi-hitung-bilangan-bulat",
   "sd1-penjumlahan-bilangan-cacah-sampai-20"
  ]
 },
 {
  "id": "smp7-himpunan-dan-operasinya",
  "judul": "Himpunan dan Operasinya",
  "kelas": 7,
  "fase": "D",
  "domain": "bilangan",
  "prasyarat": [
   "sd6-garis-bilangan-dan-bilangan-bulat",
   "sd5-kelipatan-faktor-bilangan-prima-dan"
  ]
 },
 {
  "id": "smp7-laju-perubahan-dan-kecepatan",
  "judul": "Laju Perubahan dan Kecepatan",
  "kelas": 7,
  "fase": "D",
  "domain": "bilangan",
  "prasyarat": [
   "smp7-perbandingan-senilai-dan-berbalik-nilai",
   "sd6-konsep-rasio-dan-perbandingan"
  ]
 },
 {
  "id": "smp7-operasi-bilangan-rasional",
  "judul": "Operasi Bilangan Rasional",
  "kelas": 7,
  "fase": "D",
  "domain": "bilangan",
  "prasyarat": [
   "smp7-bilangan-rasional-dan-bentuk-pecahan",
   "smp7-operasi-hitung-bilangan-bulat"
  ]
 },
 {
  "id": "smp7-operasi-hitung-bilangan-bulat",
  "judul": "Operasi Hitung Bilangan Bulat",
  "kelas": 7,
  "fase": "D",
  "domain": "bilangan",
  "prasyarat": [
   "sd6-garis-bilangan-dan-bilangan-bulat",
   "sd4-sifat-sifat-operasi-hitung-bilangan"
  ],
  "konsep": [
   "negatif-kali-negatif"
  ]
 },
 {
  "id": "smp7-perbandingan-senilai-dan-berbalik-nilai",
  "judul": "Perbandingan Senilai dan Berbalik Nilai",
  "kelas": 7,
  "fase": "D",
  "domain": "bilangan",
  "prasyarat": [
   "sd6-konsep-rasio-dan-perbandingan",
   "smp7-operasi-bilangan-rasional"
  ]
 },
 {
  "id": "smp7-rasio-dan-perbandingan",
  "judul": "Rasio dan Perbandingan",
  "kelas": 7,
  "fase": "D",
  "domain": "bilangan",
  "prasyarat": [
   "smp7-operasi-bilangan-rasional",
   "smp7-bilangan-desimal-persen-dan-estimasi"
  ]
 },
 {
  "id": "smp7-skala-dan-denah",
  "judul": "Skala dan Denah",
  "kelas": 7,
  "fase": "D",
  "domain": "bilangan",
  "prasyarat": [
   "sd6-konsep-rasio-dan-perbandingan",
   "smp7-perbandingan-senilai-dan-berbalik-nilai"
  ]
 },
 {
  "id": "smp7-merumuskan-pertanyaan-dan-mengumpulkan-data",
  "judul": "Merumuskan Pertanyaan dan Mengumpulkan Data",
  "kelas": 7,
  "fase": "D",
  "domain": "data",
  "prasyarat": [
   "smp7-bilangan-desimal-persen-dan-estimasi",
   "sd3-penyajian-data-dalam-tabel"
  ]
 },
 {
  "id": "smp7-penyajian-data-tabel-dan-diagram",
  "judul": "Penyajian Data: Tabel dan Diagram Batang",
  "kelas": 7,
  "fase": "D",
  "domain": "data",
  "prasyarat": [
   "smp7-merumuskan-pertanyaan-dan-mengumpulkan-data"
  ]
 },
 {
  "id": "smp7-garis-dan-sudut",
  "judul": "Garis dan Sudut",
  "kelas": 7,
  "fase": "D",
  "domain": "geometri",
  "prasyarat": [
   "sd5-keliling-bangun-datar",
   "smp7-operasi-hitung-bilangan-bulat"
  ]
 },
 {
  "id": "smp7-hubungan-sudut-pada-dua-garis",
  "judul": "Hubungan Sudut pada Dua Garis Sejajar",
  "kelas": 7,
  "fase": "D",
  "domain": "geometri",
  "prasyarat": [
   "smp7-garis-dan-sudut"
  ]
 },
 {
  "id": "smp7-jumlah-sudut-segitiga-dan-sudut",
  "judul": "Jumlah Sudut Segitiga dan Sudut Luar",
  "kelas": 7,
  "fase": "D",
  "domain": "geometri",
  "prasyarat": [
   "smp7-garis-dan-sudut",
   "smp7-segitiga-jenis-sifat-dan-garis"
  ],
  "konsep": [
   "sudut-segitiga"
  ]
 },
 {
  "id": "smp7-segi-empat-dan-sifat-sifatnya",
  "judul": "Segi Empat dan Sifat-sifatnya",
  "kelas": 7,
  "fase": "D",
  "domain": "geometri",
  "prasyarat": [
   "smp7-jumlah-sudut-segitiga-dan-sudut",
   "smp7-segitiga-jenis-sifat-dan-garis"
  ]
 },
 {
  "id": "smp7-segitiga-jenis-sifat-dan-garis",
  "judul": "Segitiga: Jenis, Sifat, dan Garis Istimewa",
  "kelas": 7,
  "fase": "D",
  "domain": "geometri",
  "prasyarat": [
   "smp7-garis-dan-sudut",
   "sd5-ciri-ciri-dan-klasifikasi-bangun"
  ]
 },
 {
  "id": "smp7-keliling-dan-luas-segitiga-dan",
  "judul": "Keliling dan Luas Segitiga dan Segi Empat",
  "kelas": 7,
  "fase": "D",
  "domain": "pengukuran",
  "prasyarat": [
   "sd5-keliling-bangun-datar",
   "smp7-operasi-bilangan-rasional"
  ]
 },
 {
  "id": "smp8-barisan-aritmetika-dan-barisan-geometri",
  "judul": "Barisan Aritmetika dan Barisan Geometri",
  "kelas": 8,
  "fase": "D",
  "domain": "aljabar",
  "prasyarat": [
   "smp8-pola-bilangan-dan-generalisasi",
   "smp8-bilangan-berpangkat-bulat"
  ]
 },
 {
  "id": "smp8-identitas-aljabar-dan-bentuk-kuadrat",
  "judul": "Identitas Aljabar dan Bentuk Kuadrat Sempurna",
  "kelas": 8,
  "fase": "D",
  "domain": "aljabar",
  "prasyarat": [
   "smp8-perkalian-dan-pembagian-bentuk-aljabar",
   "smp8-bilangan-berpangkat-bulat"
  ],
  "konsep": [
   "kuadrat-jumlah"
  ]
 },
 {
  "id": "smp8-koordinat-kartesius",
  "judul": "Koordinat Kartesius",
  "kelas": 8,
  "fase": "D",
  "domain": "aljabar",
  "prasyarat": [
   "sd6-garis-bilangan-dan-bilangan-bulat",
   "sd6-menentukan-lokasi-pada-sistem-berpetak"
  ]
 },
 {
  "id": "smp8-notasi-fungsi-dan-nilai-fungsi",
  "judul": "Notasi Fungsi dan Nilai Fungsi",
  "kelas": 8,
  "fase": "D",
  "domain": "aljabar",
  "prasyarat": [
   "smp8-relasi-dan-fungsi",
   "smp7-persamaan-linear-satu-variabel"
  ]
 },
 {
  "id": "smp8-pemfaktoran-bentuk-aljabar",
  "judul": "Pemfaktoran Bentuk Aljabar",
  "kelas": 8,
  "fase": "D",
  "domain": "aljabar",
  "prasyarat": [
   "smp8-identitas-aljabar-dan-bentuk-kuadrat",
   "smp8-perkalian-dan-pembagian-bentuk-aljabar"
  ]
 },
 {
  "id": "smp8-perkalian-dan-pembagian-bentuk-aljabar",
  "judul": "Perkalian dan Pembagian Bentuk Aljabar",
  "kelas": 8,
  "fase": "D",
  "domain": "aljabar",
  "prasyarat": [
   "smp7-operasi-penjumlahan-dan-pengurangan-bentuk",
   "smp8-bilangan-berpangkat-bulat"
  ]
 },
 {
  "id": "smp8-persamaan-garis-lurus-dan-gradien",
  "judul": "Persamaan Garis Lurus dan Gradien",
  "kelas": 8,
  "fase": "D",
  "domain": "aljabar",
  "prasyarat": [
   "smp8-notasi-fungsi-dan-nilai-fungsi",
   "smp8-koordinat-kartesius"
  ]
 },
 {
  "id": "smp8-pola-bilangan-dan-generalisasi",
  "judul": "Pola Bilangan dan Generalisasi",
  "kelas": 8,
  "fase": "D",
  "domain": "aljabar",
  "prasyarat": [
   "smp7-bentuk-aljabar-dan-unsur-unsurnya",
   "smp7-operasi-penjumlahan-dan-pengurangan-bentuk"
  ]
 },
 {
  "id": "smp8-relasi-dan-fungsi",
  "judul": "Relasi dan Fungsi",
  "kelas": 8,
  "fase": "D",
  "domain": "aljabar",
  "prasyarat": [
   "smp7-himpunan-dan-operasinya",
   "smp8-koordinat-kartesius"
  ]
 },
 {
  "id": "smp8-sistem-persamaan-linear-dua-variabel",
  "judul": "Sistem Persamaan Linear Dua Variabel",
  "kelas": 8,
  "fase": "D",
  "domain": "aljabar",
  "prasyarat": [
   "smp8-persamaan-garis-lurus-dan-gradien",
   "smp7-persamaan-linear-satu-variabel"
  ]
 },
 {
  "id": "smp8-bentuk-akar-dan-bilangan-irasional",
  "judul": "Bentuk Akar dan Bilangan Irasional",
  "kelas": 8,
  "fase": "D",
  "domain": "bilangan",
  "prasyarat": [
   "smp8-bilangan-berpangkat-bulat",
   "sd5-kelipatan-faktor-bilangan-prima-dan"
  ]
 },
 {
  "id": "smp8-bilangan-berpangkat-bulat",
  "judul": "Bilangan Berpangkat Bulat",
  "kelas": 8,
  "fase": "D",
  "domain": "bilangan",
  "prasyarat": [
   "smp7-operasi-hitung-bilangan-bulat",
   "smp7-operasi-bilangan-rasional"
  ]
 },
 {
  "id": "smp8-notasi-ilmiah",
  "judul": "Notasi Ilmiah",
  "kelas": 8,
  "fase": "D",
  "domain": "bilangan",
  "prasyarat": [
   "smp8-bilangan-berpangkat-bulat",
   "smp7-bilangan-desimal-persen-dan-estimasi"
  ]
 },
 {
  "id": "smp8-diagram-garis-dan-diagram-lingkaran",
  "judul": "Diagram Garis dan Diagram Lingkaran",
  "kelas": 8,
  "fase": "D",
  "domain": "data",
  "prasyarat": [
   "smp7-penyajian-data-tabel-dan-diagram",
   "smp8-sudut-pusat-sudut-keliling-panjang",
   "smp7-bilangan-desimal-persen-dan-estimasi"
  ]
 },
 {
  "id": "smp8-jangkauan-dan-ukuran-penyebaran-data",
  "judul": "Jangkauan dan Ukuran Penyebaran Data",
  "kelas": 8,
  "fase": "D",
  "domain": "data",
  "prasyarat": [
   "smp8-ukuran-pemusatan-mean-median-dan"
  ]
 },
 {
  "id": "smp8-peluang-teoretis",
  "judul": "Peluang Teoretis",
  "kelas": 8,
  "fase": "D",
  "domain": "data",
  "prasyarat": [
   "smp7-himpunan-dan-operasinya",
   "smp7-operasi-bilangan-rasional"
  ],
  "konsep": [
   "peluang-simulasi"
  ]
 },
 {
  "id": "smp8-ukuran-pemusatan-mean-median-dan",
  "judul": "Ukuran Pemusatan: Mean, Median, dan Modus",
  "kelas": 8,
  "fase": "D",
  "domain": "data",
  "prasyarat": [
   "smp7-penyajian-data-tabel-dan-diagram",
   "smp7-operasi-bilangan-rasional"
  ]
 },
 {
  "id": "smp8-jarak-dua-titik-pada-bidang",
  "judul": "Jarak Dua Titik pada Bidang Koordinat",
  "kelas": 8,
  "fase": "D",
  "domain": "geometri",
  "prasyarat": [
   "smp8-teorema-pythagoras",
   "smp8-koordinat-kartesius"
  ]
 },
 {
  "id": "smp8-jaring-jaring-bangun-ruang",
  "judul": "Jaring-jaring Bangun Ruang",
  "kelas": 8,
  "fase": "D",
  "domain": "geometri",
  "prasyarat": [
   "smp7-keliling-dan-luas-segitiga-dan",
   "smp7-segi-empat-dan-sifat-sifatnya",
   "sd6-mengonstruksi-dan-mengurai-bangun-ruang"
  ]
 },
 {
  "id": "smp8-teorema-pythagoras",
  "judul": "Teorema Pythagoras",
  "kelas": 8,
  "fase": "D",
  "domain": "geometri",
  "prasyarat": [
   "smp7-segitiga-jenis-sifat-dan-garis",
   "smp8-bentuk-akar-dan-bilangan-irasional",
   "smp8-bilangan-berpangkat-bulat"
  ],
  "konsep": [
   "pythagoras"
  ]
 },
 {
  "id": "smp8-tripel-pythagoras-dan-segitiga-istimewa",
  "judul": "Tripel Pythagoras dan Segitiga Istimewa",
  "kelas": 8,
  "fase": "D",
  "domain": "geometri",
  "prasyarat": [
   "smp8-teorema-pythagoras",
   "smp8-bentuk-akar-dan-bilangan-irasional"
  ]
 },
 {
  "id": "smp8-unsur-unsur-lingkaran-dan-garis",
  "judul": "Unsur-unsur Lingkaran dan Garis Singgung",
  "kelas": 8,
  "fase": "D",
  "domain": "geometri",
  "prasyarat": [
   "sd6-keliling-dan-luas-lingkaran",
   "smp8-teorema-pythagoras"
  ]
 },
 {
  "id": "smp8-keliling-dan-luas-lingkaran",
  "judul": "Keliling dan Luas Lingkaran",
  "kelas": 8,
  "fase": "D",
  "domain": "pengukuran",
  "prasyarat": [
   "smp7-keliling-dan-luas-segitiga-dan",
   "sd6-konsep-rasio-dan-perbandingan"
  ]
 },
 {
  "id": "smp8-luas-permukaan-dan-volume-limas",
  "judul": "Luas Permukaan dan Volume Limas",
  "kelas": 8,
  "fase": "D",
  "domain": "pengukuran",
  "prasyarat": [
   "smp8-luas-permukaan-dan-volume-prisma",
   "smp8-teorema-pythagoras"
  ]
 },
 {
  "id": "smp8-luas-permukaan-dan-volume-prisma",
  "judul": "Luas Permukaan dan Volume Prisma",
  "kelas": 8,
  "fase": "D",
  "domain": "pengukuran",
  "prasyarat": [
   "smp7-keliling-dan-luas-segitiga-dan",
   "smp8-jaring-jaring-bangun-ruang"
  ]
 },
 {
  "id": "smp8-sudut-pusat-sudut-keliling-panjang",
  "judul": "Sudut Pusat, Sudut Keliling, Panjang Busur, dan Luas Juring",
  "kelas": 8,
  "fase": "D",
  "domain": "pengukuran",
  "prasyarat": [
   "sd6-keliling-dan-luas-lingkaran",
   "sd6-konsep-rasio-dan-perbandingan",
   "smp7-garis-dan-sudut"
  ]
 },
 {
  "id": "smp9-fungsi-kuadrat-dan-grafik-parabola",
  "judul": "Fungsi Kuadrat dan Grafik Parabola",
  "kelas": 9,
  "fase": "D",
  "domain": "aljabar",
  "prasyarat": [
   "smp9-persamaan-kuadrat",
   "smp9-fungsi-nonlinear-dan-perbandingannya-dengan",
   "smp8-koordinat-kartesius"
  ],
  "konsep": [
   "parabola"
  ]
 },
 {
  "id": "smp9-fungsi-nonlinear-dan-perbandingannya-dengan",
  "judul": "Fungsi Nonlinear dan Perbandingannya dengan Fungsi Linear",
  "kelas": 9,
  "fase": "D",
  "domain": "aljabar",
  "prasyarat": [
   "smp8-persamaan-garis-lurus-dan-gradien",
   "smp8-notasi-fungsi-dan-nilai-fungsi"
  ]
 },
 {
  "id": "smp9-persamaan-kuadrat",
  "judul": "Persamaan Kuadrat",
  "kelas": 9,
  "fase": "D",
  "domain": "aljabar",
  "prasyarat": [
   "smp8-pemfaktoran-bentuk-aljabar",
   "smp8-identitas-aljabar-dan-bentuk-kuadrat",
   "smp8-bentuk-akar-dan-bilangan-irasional"
  ]
 },
 {
  "id": "smp9-operasi-bentuk-akar-dan-merasionalkan",
  "judul": "Operasi Bentuk Akar dan Merasionalkan Penyebut",
  "kelas": 9,
  "fase": "D",
  "domain": "bilangan",
  "prasyarat": [
   "smp8-bentuk-akar-dan-bilangan-irasional",
   "smp8-identitas-aljabar-dan-bentuk-kuadrat"
  ]
 },
 {
  "id": "smp9-frekuensi-harapan",
  "judul": "Frekuensi Harapan",
  "kelas": 9,
  "fase": "D",
  "domain": "data",
  "prasyarat": [
   "smp9-peluang-empiris-dan-frekuensi-relatif",
   "smp8-peluang-teoretis"
  ]
 },
 {
  "id": "smp9-peluang-empiris-dan-frekuensi-relatif",
  "judul": "Peluang Empiris dan Frekuensi Relatif",
  "kelas": 9,
  "fase": "D",
  "domain": "data",
  "prasyarat": [
   "smp8-peluang-teoretis",
   "smp7-merumuskan-pertanyaan-dan-mengumpulkan-data"
  ]
 },
 {
  "id": "smp9-pengaruh-perubahan-data-terhadap-ukuran",
  "judul": "Pengaruh Perubahan Data terhadap Ukuran Pemusatan",
  "kelas": 9,
  "fase": "D",
  "domain": "data",
  "prasyarat": [
   "smp8-ukuran-pemusatan-mean-median-dan",
   "smp8-jangkauan-dan-ukuran-penyebaran-data"
  ]
 },
 {
  "id": "smp9-populasi-sampel-dan-pengambilan-sampel",
  "judul": "Populasi, Sampel, dan Pengambilan Sampel",
  "kelas": 9,
  "fase": "D",
  "domain": "data",
  "prasyarat": [
   "smp7-merumuskan-pertanyaan-dan-mengumpulkan-data",
   "sd6-konsep-rasio-dan-perbandingan"
  ]
 },
 {
  "id": "smp9-kekongruenan-bangun-datar-dan-segitiga",
  "judul": "Kekongruenan Bangun Datar dan Segitiga",
  "kelas": 9,
  "fase": "D",
  "domain": "geometri",
  "prasyarat": [
   "smp7-segitiga-jenis-sifat-dan-garis",
   "smp7-jumlah-sudut-segitiga-dan-sudut",
   "smp7-segi-empat-dan-sifat-sifatnya"
  ]
 },
 {
  "id": "smp9-kesebangunan-bangun-datar-dan-segitiga",
  "judul": "Kesebangunan Bangun Datar dan Segitiga",
  "kelas": 9,
  "fase": "D",
  "domain": "geometri",
  "prasyarat": [
   "smp9-kekongruenan-bangun-datar-dan-segitiga",
   "sd6-konsep-rasio-dan-perbandingan",
   "sd6-skala-pada-denah-dan-peta"
  ]
 },
 {
  "id": "smp9-transformasi-dilatasi",
  "judul": "Transformasi: Dilatasi",
  "kelas": 9,
  "fase": "D",
  "domain": "geometri",
  "prasyarat": [
   "smp9-transformasi-rotasi",
   "smp9-kesebangunan-bangun-datar-dan-segitiga",
   "smp9-pengaruh-perubahan-proporsional-terhadap-panjang"
  ]
 },
 {
  "id": "smp9-transformasi-refleksi",
  "judul": "Transformasi: Refleksi",
  "kelas": 9,
  "fase": "D",
  "domain": "geometri",
  "prasyarat": [
   "smp9-transformasi-translasi",
   "smp8-koordinat-kartesius"
  ]
 },
 {
  "id": "smp9-transformasi-rotasi",
  "judul": "Transformasi: Rotasi",
  "kelas": 9,
  "fase": "D",
  "domain": "geometri",
  "prasyarat": [
   "smp9-transformasi-refleksi",
   "smp8-koordinat-kartesius",
   "smp7-garis-dan-sudut"
  ]
 },
 {
  "id": "smp9-transformasi-translasi",
  "judul": "Transformasi: Translasi",
  "kelas": 9,
  "fase": "D",
  "domain": "geometri",
  "prasyarat": [
   "smp8-koordinat-kartesius",
   "smp9-kekongruenan-bangun-datar-dan-segitiga"
  ]
 },
 {
  "id": "smp9-luas-permukaan-dan-volume-bola",
  "judul": "Luas Permukaan dan Volume Bola",
  "kelas": 9,
  "fase": "D",
  "domain": "pengukuran",
  "prasyarat": [
   "smp9-luas-permukaan-dan-volume-tabung",
   "sd6-keliling-dan-luas-lingkaran"
  ]
 },
 {
  "id": "smp9-luas-permukaan-dan-volume-kerucut",
  "judul": "Luas Permukaan dan Volume Kerucut",
  "kelas": 9,
  "fase": "D",
  "domain": "pengukuran",
  "prasyarat": [
   "smp9-luas-permukaan-dan-volume-tabung",
   "smp8-teorema-pythagoras",
   "smp8-sudut-pusat-sudut-keliling-panjang"
  ],
  "konsep": [
   "kerucut-sepertiga"
  ]
 },
 {
  "id": "smp9-luas-permukaan-dan-volume-tabung",
  "judul": "Luas Permukaan dan Volume Tabung",
  "kelas": 9,
  "fase": "D",
  "domain": "pengukuran",
  "prasyarat": [
   "sd6-keliling-dan-luas-lingkaran",
   "smp8-luas-permukaan-dan-volume-prisma"
  ]
 },
 {
  "id": "smp9-pengaruh-perubahan-proporsional-terhadap-panjang",
  "judul": "Pengaruh Perubahan Proporsional terhadap Panjang, Luas, dan Volume",
  "kelas": 9,
  "fase": "D",
  "domain": "pengukuran",
  "prasyarat": [
   "smp9-kesebangunan-bangun-datar-dan-segitiga",
   "smp9-luas-permukaan-dan-volume-bola",
   "sd6-skala-pada-denah-dan-peta"
  ]
 },
 {
  "id": "sma10-bentuk-aljabar-persamaan-dan-pertidaksamaan",
  "judul": "Bentuk Aljabar, Persamaan, dan Pertidaksamaan Linear Satu Variabel",
  "kelas": 10,
  "fase": "E",
  "domain": "aljabar",
  "prasyarat": [
   "sd6-garis-bilangan-dan-bilangan-bulat",
   "sma10-himpunan-bilangan-real-dan-garis"
  ]
 },
 {
  "id": "sma10-bentuk-bentuk-fungsi-kuadrat-dan",
  "judul": "Bentuk-bentuk Fungsi Kuadrat dan Mengonstruksinya",
  "kelas": 10,
  "fase": "E",
  "domain": "aljabar",
  "prasyarat": [
   "sma10-fungsi-kuadrat-dan-grafiknya-parabola",
   "smp9-persamaan-kuadrat"
  ]
 },
 {
  "id": "sma10-diskriminan-dan-akar-imajiner",
  "judul": "Diskriminan dan Akar Imajiner",
  "kelas": 10,
  "fase": "E",
  "domain": "aljabar",
  "prasyarat": [
   "smp9-persamaan-kuadrat",
   "smp8-bentuk-akar-dan-bilangan-irasional",
   "sma10-himpunan-bilangan-real-dan-garis"
  ]
 },
 {
  "id": "sma10-fungsi-eksponensial-pertumbuhan-dan-peluruhan",
  "judul": "Fungsi Eksponensial: Pertumbuhan dan Peluruhan",
  "kelas": 10,
  "fase": "E",
  "domain": "aljabar",
  "prasyarat": [
   "sma10-sifat-sifat-operasi-eksponen",
   "sma10-pangkat-nol-dan-pangkat-bulat",
   "smp8-relasi-dan-fungsi"
  ]
 },
 {
  "id": "sma10-fungsi-kuadrat-dan-grafiknya-parabola",
  "judul": "Fungsi Kuadrat dan Grafiknya (Parabola)",
  "kelas": 10,
  "fase": "E",
  "domain": "aljabar",
  "prasyarat": [
   "smp9-persamaan-kuadrat",
   "sma10-diskriminan-dan-akar-imajiner",
   "smp8-relasi-dan-fungsi",
   "smp8-koordinat-kartesius"
  ]
 },
 {
  "id": "sma10-pemodelan-masalah-dengan-fungsi-kuadrat",
  "judul": "Pemodelan Masalah dengan Fungsi Kuadrat",
  "kelas": 10,
  "fase": "E",
  "domain": "aljabar",
  "prasyarat": [
   "sma10-bentuk-bentuk-fungsi-kuadrat-dan",
   "sma10-fungsi-kuadrat-dan-grafiknya-parabola"
  ]
 },
 {
  "id": "sma10-persamaan-dan-pertidaksamaan-eksponensial-berbasis",
  "judul": "Persamaan dan Pertidaksamaan Eksponensial Berbasis Sama",
  "kelas": 10,
  "fase": "E",
  "domain": "aljabar",
  "prasyarat": [
   "sma10-sifat-sifat-operasi-eksponen",
   "sma10-bentuk-akar",
   "smp9-persamaan-kuadrat"
  ]
 },
 {
  "id": "sma10-persamaan-kuadrat-dan-cara-menyelesaikannya",
  "judul": "Persamaan Kuadrat dan Cara Menyelesaikannya",
  "kelas": 10,
  "fase": "E",
  "domain": "aljabar",
  "prasyarat": [
   "smp7-persamaan-linear-satu-variabel",
   "smp8-bentuk-akar-dan-bilangan-irasional",
   "smp9-operasi-bentuk-akar-dan-merasionalkan"
  ]
 },
 {
  "id": "sma10-pertidaksamaan-linear-dua-variabel-dan",
  "judul": "Pertidaksamaan Linear Dua Variabel dan Daerah Penyelesaian",
  "kelas": 10,
  "fase": "E",
  "domain": "aljabar",
  "prasyarat": [
   "smp8-sistem-persamaan-linear-dua-variabel",
   "smp7-persamaan-linear-satu-variabel"
  ]
 },
 {
  "id": "sma10-sistem-persamaan-linear-dua-variabel",
  "judul": "Sistem Persamaan Linear Dua Variabel (SPLDV)",
  "kelas": 10,
  "fase": "E",
  "domain": "aljabar",
  "prasyarat": [
   "smp7-persamaan-linear-satu-variabel",
   "smp9-fungsi-nonlinear-dan-perbandingannya-dengan",
   "smp8-koordinat-kartesius"
  ]
 },
 {
  "id": "sma10-sistem-persamaan-linear-tiga-variabel",
  "judul": "Sistem Persamaan Linear Tiga Variabel (SPLTV)",
  "kelas": 10,
  "fase": "E",
  "domain": "aljabar",
  "prasyarat": [
   "smp8-sistem-persamaan-linear-dua-variabel",
   "smp7-persamaan-linear-satu-variabel"
  ]
 },
 {
  "id": "sma10-sistem-pertidaksamaan-linear-dua-variabel",
  "judul": "Sistem Pertidaksamaan Linear Dua Variabel dan Program Linear Sederhana",
  "kelas": 10,
  "fase": "E",
  "domain": "aljabar",
  "prasyarat": [
   "sma10-pertidaksamaan-linear-dua-variabel-dan",
   "smp8-sistem-persamaan-linear-dua-variabel"
  ]
 },
 {
  "id": "sma10-vektor-dan-operasinya",
  "judul": "Vektor dan Operasinya",
  "kelas": 10,
  "fase": "E",
  "domain": "aljabar",
  "prasyarat": [
   "smp8-teorema-pythagoras",
   "smp8-koordinat-kartesius",
   "sma10-perbandingan-trigonometri-sudut-lancip-sinus",
   "smp8-bentuk-akar-dan-bilangan-irasional"
  ]
 },
 {
  "id": "sma10-barisan-dan-deret-aritmetika",
  "judul": "Barisan dan Deret Aritmetika",
  "kelas": 10,
  "fase": "E",
  "domain": "bilangan",
  "prasyarat": [
   "sd1-pola-bukan-bilangan-gambar-warna",
   "smp7-persamaan-linear-satu-variabel",
   "smp9-fungsi-nonlinear-dan-perbandingannya-dengan"
  ],
  "konsep": [
   "deret-gauss"
  ]
 },
 {
  "id": "sma10-barisan-dan-deret-geometri-serta",
  "judul": "Barisan dan Deret Geometri serta Deret Geometri Tak Hingga",
  "kelas": 10,
  "fase": "E",
  "domain": "bilangan",
  "prasyarat": [
   "sma10-barisan-dan-deret-aritmetika",
   "sma10-sifat-sifat-operasi-eksponen",
   "sma10-pangkat-nol-dan-pangkat-bulat"
  ]
 },
 {
  "id": "sma10-bentuk-akar",
  "judul": "Bentuk Akar",
  "kelas": 10,
  "fase": "E",
  "domain": "bilangan",
  "prasyarat": [
   "smp8-bilangan-berpangkat-bulat",
   "smp8-teorema-pythagoras",
   "sma10-himpunan-bilangan-real-dan-garis"
  ]
 },
 {
  "id": "sma10-bilangan-berpangkat-eksponen-bulat-positif",
  "judul": "Bilangan Berpangkat (Eksponen) Bulat Positif",
  "kelas": 10,
  "fase": "E",
  "domain": "bilangan",
  "prasyarat": [
   "sd6-garis-bilangan-dan-bilangan-bulat",
   "sma10-himpunan-bilangan-real-dan-garis"
  ]
 },
 {
  "id": "sma10-bunga-tunggal-bunga-majemuk-dan",
  "judul": "Bunga Tunggal, Bunga Majemuk, dan Model Peluruhan",
  "kelas": 10,
  "fase": "E",
  "domain": "bilangan",
  "prasyarat": [
   "sma10-barisan-dan-deret-geometri-serta",
   "sma10-sifat-sifat-operasi-eksponen",
   "smp7-aritmetika-sosial-untung-rugi-dan"
  ]
 },
 {
  "id": "sma10-himpunan-bilangan-real-dan-garis",
  "judul": "Himpunan Bilangan Real dan Garis Bilangan",
  "kelas": 10,
  "fase": "E",
  "domain": "bilangan",
  "prasyarat": [
   "sd6-garis-bilangan-dan-bilangan-bulat",
   "smp7-bilangan-rasional-dan-bentuk-pecahan"
  ]
 },
 {
  "id": "sma10-logaritma-definisi-dan-sifat-sifatnya",
  "judul": "Logaritma: Definisi dan Sifat-sifatnya",
  "kelas": 10,
  "fase": "E",
  "domain": "bilangan",
  "prasyarat": [
   "sma10-sifat-sifat-operasi-eksponen",
   "sma10-bentuk-akar",
   "sma10-fungsi-eksponensial-pertumbuhan-dan-peluruhan"
  ],
  "konsep": [
   "eksponen-logaritma"
  ]
 },
 {
  "id": "sma10-merasionalkan-penyebut-bentuk-akar",
  "judul": "Merasionalkan Penyebut Bentuk Akar",
  "kelas": 10,
  "fase": "E",
  "domain": "bilangan",
  "prasyarat": [
   "smp8-bentuk-akar-dan-bilangan-irasional",
   "smp8-perkalian-dan-pembagian-bentuk-aljabar"
  ]
 },
 {
  "id": "sma10-notasi-ilmiah-pembulatan-dan-estimasi",
  "judul": "Notasi Ilmiah, Pembulatan, dan Estimasi",
  "kelas": 10,
  "fase": "E",
  "domain": "bilangan",
  "prasyarat": [
   "sma10-sifat-sifat-operasi-eksponen",
   "sma10-pangkat-nol-dan-pangkat-bulat"
  ]
 },
 {
  "id": "sma10-pangkat-nol-dan-pangkat-bulat",
  "judul": "Pangkat Nol dan Pangkat Bulat Negatif",
  "kelas": 10,
  "fase": "E",
  "domain": "bilangan",
  "prasyarat": [
   "sma10-sifat-sifat-operasi-eksponen",
   "smp8-bilangan-berpangkat-bulat"
  ]
 },
 {
  "id": "sma10-pangkat-pecahan-rasional-dan-kaitannya",
  "judul": "Pangkat Pecahan (Rasional) dan Kaitannya dengan Bentuk Akar",
  "kelas": 10,
  "fase": "E",
  "domain": "bilangan",
  "prasyarat": [
   "sma10-sifat-sifat-operasi-eksponen",
   "smp8-bentuk-akar-dan-bilangan-irasional",
   "sma10-pangkat-nol-dan-pangkat-bulat"
  ]
 },
 {
  "id": "sma10-sifat-sifat-operasi-eksponen",
  "judul": "Sifat-sifat Operasi Eksponen",
  "kelas": 10,
  "fase": "E",
  "domain": "bilangan",
  "prasyarat": [
   "smp8-bilangan-berpangkat-bulat"
  ]
 },
 {
  "id": "sma10-box-plot-diagram-kotak-garis",
  "judul": "Box Plot (Diagram Kotak Garis) dan Pencilan",
  "kelas": 10,
  "fase": "E",
  "domain": "data",
  "prasyarat": [
   "sma10-ukuran-penempatan-kuartil-desil-dan",
   "sma10-ukuran-penyebaran-jangkauan-jangkauan-interkuartil"
  ]
 },
 {
  "id": "sma10-diagram-pencar-asosiasi-tren-dan",
  "judul": "Diagram Pencar, Asosiasi, Tren, dan Korelasi versus Sebab-Akibat",
  "kelas": 10,
  "fase": "E",
  "domain": "data",
  "prasyarat": [
   "sma10-jenis-data-dan-penyajian-data",
   "smp8-sistem-persamaan-linear-dua-variabel",
   "smp9-fungsi-nonlinear-dan-perbandingannya-dengan"
  ]
 },
 {
  "id": "sma10-dot-plot-dan-memilih-tampilan",
  "judul": "Dot Plot dan Memilih Tampilan Data yang Tepat",
  "kelas": 10,
  "fase": "E",
  "domain": "data",
  "prasyarat": [
   "sma10-jenis-data-dan-penyajian-data",
   "sma10-tabel-distribusi-frekuensi-dan-histogram"
  ]
 },
 {
  "id": "sma10-gabungan-dua-kejadian-kejadian-saling",
  "judul": "Gabungan Dua Kejadian, Kejadian Saling Lepas, dan Aturan Penjumlahan",
  "kelas": 10,
  "fase": "E",
  "domain": "data",
  "prasyarat": [
   "sma10-ruang-sampel-kejadian-dan-peluang"
  ]
 },
 {
  "id": "sma10-jenis-data-dan-penyajian-data",
  "judul": "Jenis Data dan Penyajian Data Tunggal",
  "kelas": 10,
  "fase": "E",
  "domain": "data",
  "prasyarat": [
   "smp9-pengaruh-perubahan-data-terhadap-ukuran",
   "smp7-aritmetika-sosial-untung-rugi-dan"
  ]
 },
 {
  "id": "sma10-membaca-data-dalam-bentuk-matriks",
  "judul": "Membaca Data dalam Bentuk Matriks dan Mengevaluasi Laporan Statistika di Media",
  "kelas": 10,
  "fase": "E",
  "domain": "data",
  "prasyarat": [
   "sma10-jenis-data-dan-penyajian-data",
   "sma10-tabel-frekuensi-dua-arah-dan",
   "sma10-diagram-pencar-asosiasi-tren-dan",
   "smp8-ukuran-pemusatan-mean-median-dan"
  ]
 },
 {
  "id": "sma10-ruang-sampel-kejadian-dan-peluang",
  "judul": "Ruang Sampel, Kejadian, dan Peluang",
  "kelas": 10,
  "fase": "E",
  "domain": "data",
  "prasyarat": [
   "sd6-membandingkan-peluang-kejadian-dalam-percobaan",
   "sma10-jenis-data-dan-penyajian-data"
  ]
 },
 {
  "id": "sma10-tabel-distribusi-frekuensi-dan-histogram",
  "judul": "Tabel Distribusi Frekuensi dan Histogram (Data Kelompok)",
  "kelas": 10,
  "fase": "E",
  "domain": "data",
  "prasyarat": [
   "sma10-jenis-data-dan-penyajian-data",
   "sma10-logaritma-definisi-dan-sifat-sifatnya",
   "smp8-notasi-ilmiah"
  ]
 },
 {
  "id": "sma10-tabel-frekuensi-dua-arah-dan",
  "judul": "Tabel Frekuensi Dua Arah dan Frekuensi Relatif",
  "kelas": 10,
  "fase": "E",
  "domain": "data",
  "prasyarat": [
   "sma10-jenis-data-dan-penyajian-data",
   "smp8-ukuran-pemusatan-mean-median-dan"
  ]
 },
 {
  "id": "sma10-ukuran-pemusatan-data-mean-median",
  "judul": "Ukuran Pemusatan Data: Mean, Median, dan Modus",
  "kelas": 10,
  "fase": "E",
  "domain": "data",
  "prasyarat": [
   "sma10-tabel-distribusi-frekuensi-dan-histogram",
   "smp9-pengaruh-perubahan-data-terhadap-ukuran",
   "sma10-jenis-data-dan-penyajian-data"
  ],
  "konsep": [
   "rata-rata-menipu"
  ]
 },
 {
  "id": "sma10-ukuran-penempatan-kuartil-desil-dan",
  "judul": "Ukuran Penempatan: Kuartil, Desil, dan Persentil",
  "kelas": 10,
  "fase": "E",
  "domain": "data",
  "prasyarat": [
   "smp8-ukuran-pemusatan-mean-median-dan",
   "sma10-tabel-distribusi-frekuensi-dan-histogram"
  ]
 },
 {
  "id": "sma10-ukuran-penyebaran-jangkauan-jangkauan-interkuartil",
  "judul": "Ukuran Penyebaran: Jangkauan, Jangkauan Interkuartil, Ragam, dan Simpangan Baku",
  "kelas": 10,
  "fase": "E",
  "domain": "data",
  "prasyarat": [
   "sma10-ukuran-penempatan-kuartil-desil-dan",
   "smp8-ukuran-pemusatan-mean-median-dan",
   "smp8-bentuk-akar-dan-bilangan-irasional"
  ]
 },
 {
  "id": "sma10-hubungan-sudut-penyiku-dan-identitas",
  "judul": "Hubungan Sudut Penyiku dan Identitas Trigonometri Dasar",
  "kelas": 10,
  "fase": "E",
  "domain": "geometri",
  "prasyarat": [
   "sma10-perbandingan-trigonometri-sudut-lancip-sinus",
   "smp8-teorema-pythagoras",
   "sma10-perbandingan-trigonometri-sudut-istimewa"
  ]
 },
 {
  "id": "sma10-penerapan-trigonometri-sudut-elevasi-dan",
  "judul": "Penerapan Trigonometri: Sudut Elevasi dan Sudut Depresi",
  "kelas": 10,
  "fase": "E",
  "domain": "geometri",
  "prasyarat": [
   "sma10-perbandingan-trigonometri-sudut-lancip-sinus",
   "sma10-perbandingan-trigonometri-sudut-istimewa",
   "smp8-teorema-pythagoras"
  ]
 },
 {
  "id": "sma10-perbandingan-trigonometri-sudut-istimewa",
  "judul": "Perbandingan Trigonometri Sudut Istimewa",
  "kelas": 10,
  "fase": "E",
  "domain": "geometri",
  "prasyarat": [
   "sma10-perbandingan-trigonometri-sudut-lancip-sinus",
   "smp9-operasi-bentuk-akar-dan-merasionalkan",
   "smp8-teorema-pythagoras"
  ]
 },
 {
  "id": "sma10-perbandingan-trigonometri-sudut-lancip-sinus",
  "judul": "Perbandingan Trigonometri Sudut Lancip (Sinus, Cosinus, Tangen)",
  "kelas": 10,
  "fase": "E",
  "domain": "geometri",
  "prasyarat": [
   "smp8-teorema-pythagoras",
   "smp7-rasio-dan-perbandingan",
   "smp8-bentuk-akar-dan-bilangan-irasional"
  ],
  "konsep": [
   "sin-cos-lingkaran"
  ]
 },
 {
  "id": "sma10-satuan-sudut-derajat-dan-radian",
  "judul": "Satuan Sudut: Derajat dan Radian",
  "kelas": 10,
  "fase": "E",
  "domain": "geometri",
  "prasyarat": [
   "smp8-sudut-pusat-sudut-keliling-panjang",
   "sma10-perbandingan-trigonometri-sudut-lancip-sinus",
   "smp7-rasio-dan-perbandingan"
  ]
 },
 {
  "id": "sma10-teorema-pythagoras-dan-segitiga-siku",
  "judul": "Teorema Pythagoras dan Segitiga Siku-siku",
  "kelas": 10,
  "fase": "E",
  "domain": "geometri",
  "prasyarat": [
   "smp8-bentuk-akar-dan-bilangan-irasional",
   "sma10-himpunan-bilangan-real-dan-garis"
  ]
 },
 {
  "id": "sma11-aljabar-fungsi-operasi-pada-dua",
  "judul": "Aljabar Fungsi: Operasi pada Dua Fungsi",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "sma11-fungsi-notasi-domain-range-dan",
   "smp7-operasi-penjumlahan-dan-pengurangan-bentuk"
  ]
 },
 {
  "id": "sma11-fungsi-invers",
  "judul": "Fungsi Invers",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "sma11-fungsi-notasi-domain-range-dan",
   "sma11-komposisi-fungsi"
  ]
 },
 {
  "id": "sma11-fungsi-notasi-domain-range-dan",
  "judul": "Fungsi: Notasi, Domain, Range, dan Sifat Pemetaan",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "smp8-relasi-dan-fungsi",
   "smp9-fungsi-nonlinear-dan-perbandingannya-dengan",
   "smp9-persamaan-kuadrat"
  ]
 },
 {
  "id": "sma11-invers-dari-komposisi-fungsi",
  "judul": "Invers dari Komposisi Fungsi",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "sma11-komposisi-fungsi",
   "sma11-fungsi-invers"
  ]
 },
 {
  "id": "sma11-komposisi-fungsi",
  "judul": "Komposisi Fungsi",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "sma11-fungsi-notasi-domain-range-dan",
   "sma11-aljabar-fungsi-operasi-pada-dua"
  ]
 },
 {
  "id": "sma11-pemodelan-dunia-nyata-dengan-fungsi",
  "judul": "Pemodelan Dunia Nyata dengan Fungsi Linear, Kuadrat, dan Eksponensial",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "sma11-fungsi-invers",
   "smp9-transformasi-dilatasi",
   "sma10-persamaan-dan-pertidaksamaan-eksponensial-berbasis",
   "smp8-barisan-aritmetika-dan-barisan-geometri"
  ]
 },
 {
  "id": "sma11-transformasi-fungsi-dilatasi-dan-transformasi",
  "judul": "Transformasi Fungsi: Dilatasi dan Transformasi Gabungan",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "smp9-transformasi-translasi"
  ]
 },
 {
  "id": "sma11-transformasi-fungsi-translasi-dan-refleksi",
  "judul": "Transformasi Fungsi: Translasi dan Refleksi",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "sma11-fungsi-notasi-domain-range-dan",
   "smp9-persamaan-kuadrat"
  ]
 },
 {
  "id": "sma11-asosiasi-bukan-sebab-akibat-perancu",
  "judul": "Asosiasi Bukan Sebab-Akibat: Perancu dan Evaluasi Laporan Statistika",
  "kelas": 11,
  "fase": "F",
  "domain": "data",
  "prasyarat": [
   "sma11-koefisien-korelasi-dan-kuat-lemahnya",
   "sma11-proses-penyelidikan-statistika-dan-data"
  ]
 },
 {
  "id": "sma11-diagram-pencar-dan-asosiasi-dua",
  "judul": "Diagram Pencar dan Asosiasi Dua Variabel Numerikal",
  "kelas": 11,
  "fase": "F",
  "domain": "data",
  "prasyarat": [
   "sma11-proses-penyelidikan-statistika-dan-data",
   "smp8-koordinat-kartesius"
  ]
 },
 {
  "id": "sma11-koefisien-korelasi-dan-kuat-lemahnya",
  "judul": "Koefisien Korelasi dan Kuat-Lemahnya Hubungan",
  "kelas": 11,
  "fase": "F",
  "domain": "data",
  "prasyarat": [
   "sma11-model-linear-terbaik-regresi-kuadrat",
   "smp8-jangkauan-dan-ukuran-penyebaran-data"
  ]
 },
 {
  "id": "sma11-model-linear-terbaik-regresi-kuadrat",
  "judul": "Model Linear Terbaik: Regresi Kuadrat Terkecil",
  "kelas": 11,
  "fase": "F",
  "domain": "data",
  "prasyarat": [
   "sma11-diagram-pencar-dan-asosiasi-dua",
   "smp8-persamaan-garis-lurus-dan-gradien",
   "smp8-jangkauan-dan-ukuran-penyebaran-data"
  ]
 },
 {
  "id": "sma11-proses-penyelidikan-statistika-dan-data",
  "judul": "Proses Penyelidikan Statistika dan Data Bivariat",
  "kelas": 11,
  "fase": "F",
  "domain": "data",
  "prasyarat": [
   "sd3-penyajian-data-dalam-tabel",
   "smp8-jangkauan-dan-ukuran-penyebaran-data"
  ]
 },
 {
  "id": "sma11-tabel-kontingensi-dan-asosiasi-dua",
  "judul": "Tabel Kontingensi dan Asosiasi Dua Variabel Kategorikal",
  "kelas": 11,
  "fase": "F",
  "domain": "data",
  "prasyarat": [
   "sma11-proses-penyelidikan-statistika-dan-data"
  ]
 },
 {
  "id": "sma11-garis-singgung-lingkaran-dan-garis",
  "judul": "Garis Singgung Lingkaran dan Garis Singgung Persekutuan",
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sma11-unsur-unsur-lingkaran-dan-hubungan",
   "smp8-teorema-pythagoras"
  ]
 },
 {
  "id": "sma11-panjang-busur-luas-juring-dan",
  "judul": "Panjang Busur, Luas Juring, dan Ukuran Radian",
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sma11-unsur-unsur-lingkaran-dan-hubungan",
   "smp7-perbandingan-senilai-dan-berbalik-nilai"
  ]
 },
 {
  "id": "sma11-sudut-pusat-sudut-keliling-dan",
  "judul": "Sudut Pusat, Sudut Keliling, dan Sudut Tali Busur",
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sma11-unsur-unsur-lingkaran-dan-hubungan",
   "smp7-garis-dan-sudut"
  ]
 },
 {
  "id": "sma11-tali-busur-dan-segi-empat",
  "judul": "Tali Busur dan Segi Empat Tali Busur",
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sma11-sudut-pusat-sudut-keliling-dan",
   "smp9-kekongruenan-bangun-datar-dan-segitiga"
  ]
 },
 {
  "id": "sma11-unsur-unsur-lingkaran-dan-hubungan",
  "judul": "Unsur-Unsur Lingkaran dan Hubungan Antar Unsurnya",
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sd6-keliling-dan-luas-lingkaran",
   "smp8-teorema-pythagoras"
  ]
 },
 {
  "id": "sma11-akar-polinomial-dan-bentuk-grafiknya",
  "judul": "Akar Polinomial dan Bentuk Grafiknya",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "sma11-teorema-sisa-dan-teorema-faktor"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-determinan-dan-invers-matriks",
  "judul": "Determinan dan Invers Matriks",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "sma11-perkalian-matriks-dan-sifat-sifatnya"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-fungsi-trigonometri-dan-lingkaran-satuan",
  "judul": "Fungsi Trigonometri dan Lingkaran Satuan",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "sma10-perbandingan-trigonometri-sudut-lancip-sinus",
   "smp8-teorema-pythagoras",
   "smp9-transformasi-dilatasi"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-identitas-polinomial-dan-teorema-binomial",
  "judul": "Identitas Polinomial dan Teorema Binomial",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "sma11-polinomial-bentuk-derajat-dan-operasi"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-induksi-matematika-pengayaan-di-luar",
  "judul": "Induksi Matematika (pengayaan di luar CP 2025)",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "smp8-barisan-aritmetika-dan-barisan-geometri",
   "sma11-polinomial-bentuk-derajat-dan-operasi"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-matriks-sebagai-transformasi-bidang",
  "judul": "Matriks sebagai Transformasi Bidang",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "sma11-determinan-dan-invers-matriks",
   "smp9-transformasi-translasi"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-matriks-notasi-jenis-dan-operasi",
  "judul": "Matriks: Notasi, Jenis, dan Operasi Dasar",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "sma10-membaca-data-dalam-bentuk-matriks",
   "sd6-operasi-penjumlahan-dan-pengurangan-bilangan"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-pembagian-polinomial-dan-skema-horner",
  "judul": "Pembagian Polinomial dan Skema Horner",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "sma11-polinomial-bentuk-derajat-dan-operasi"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-pembuktian-geometris-dengan-vektor",
  "judul": "Pembuktian Geometris dengan Vektor",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "sma11-vektor-di-bidang-representasi-dan",
   "smp9-kekongruenan-bangun-datar-dan-segitiga"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-perkalian-matriks-dan-sifat-sifatnya",
  "judul": "Perkalian Matriks dan Sifat-sifatnya",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "sma11-matriks-notasi-jenis-dan-operasi"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-polinomial-bentuk-derajat-dan-operasi",
  "judul": "Polinomial: Bentuk, Derajat, dan Operasi Aritmetika",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "smp7-operasi-penjumlahan-dan-pengurangan-bentuk",
   "smp9-persamaan-kuadrat"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-sistem-persamaan-linear-dengan-matriks",
  "judul": "Sistem Persamaan Linear dengan Matriks",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "sma11-determinan-dan-invers-matriks",
   "smp8-sistem-persamaan-linear-dua-variabel",
   "sma10-sistem-pertidaksamaan-linear-dua-variabel"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-teorema-sisa-dan-teorema-faktor",
  "judul": "Teorema Sisa dan Teorema Faktor",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "sma11-pembagian-polinomial-dan-skema-horner"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-vektor-di-bidang-representasi-dan",
  "judul": "Vektor di Bidang: Representasi dan Operasi",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "smp8-koordinat-kartesius",
   "smp8-teorema-pythagoras"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-populasi-sampel-dan-teknik-sampling",
  "judul": "Populasi, Sampel, dan Teknik Sampling",
  "kelas": 11,
  "fase": "F",
  "domain": "data",
  "prasyarat": [
   "sma11-proses-penyelidikan-statistika-dan-data",
   "sma11-asosiasi-bukan-sebab-akibat-perancu"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-aturan-cosinus",
  "judul": "Aturan Cosinus",
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "smp8-teorema-pythagoras",
   "sma11-aturan-sinus"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-aturan-sinus",
  "judul": "Aturan Sinus",
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sma11-lingkaran-satuan-dan-perluasan-perbandingan",
   "sma10-teorema-pythagoras-dan-segitiga-siku"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-grafik-fungsi-trigonometri-amplitudo-periode",
  "judul": "Grafik Fungsi Trigonometri: Amplitudo, Periode, dan Pergeseran",
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sma11-lingkaran-satuan-dan-perluasan-perbandingan",
   "sma11-aljabar-fungsi-operasi-pada-dua"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-identitas-trigonometri-dasar-dan-pembuktiannya",
  "judul": "Identitas Trigonometri Dasar dan Pembuktiannya",
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sma11-lingkaran-satuan-dan-perluasan-perbandingan",
   "smp7-operasi-penjumlahan-dan-pengurangan-bentuk"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-lingkaran-satuan-dan-perluasan-perbandingan",
  "judul": "Lingkaran Satuan dan Perluasan Perbandingan Trigonometri",
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sma10-teorema-pythagoras-dan-segitiga-siku",
   "sma11-panjang-busur-luas-juring-dan"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-luas-segitiga-dengan-trigonometri",
  "judul": "Luas Segitiga dengan Trigonometri",
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sma11-aturan-cosinus",
   "sd5-luas-persegi-persegi-panjang-dan"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-matriks-transformasi-dan-komposisi-transformasi",
  "judul": "Matriks Transformasi dan Komposisi Transformasi",
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sma11-rotasi-dan-dilatasi-pada-bidang",
   "sma11-determinan-dan-invers-matriks"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-pemodelan-fenomena-periodik-dengan-fungsi",
  "judul": "Pemodelan Fenomena Periodik dengan Fungsi Trigonometri",
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sma11-grafik-fungsi-trigonometri-amplitudo-periode"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-perkalian-titik-sudut-antarvektor-dan",
  "judul": "Perkalian Titik, Sudut Antarvektor, dan Proyeksi Vektor",
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sma10-vektor-dan-operasinya",
   "sma11-aturan-cosinus"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-persamaan-trigonometri",
  "judul": "Persamaan Trigonometri",
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sma11-identitas-trigonometri-dasar-dan-pembuktiannya",
   "sma11-grafik-fungsi-trigonometri-amplitudo-periode"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-rotasi-dan-dilatasi-pada-bidang",
  "judul": "Rotasi dan Dilatasi pada Bidang Koordinat",
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sma11-translasi-dan-refleksi-pada-bidang",
   "sma11-lingkaran-satuan-dan-perluasan-perbandingan"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-rumus-jumlah-dan-selisih-dua",
  "judul": "Rumus Jumlah dan Selisih Dua Sudut",
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sma11-identitas-trigonometri-dasar-dan-pembuktiannya",
   "sma11-lingkaran-satuan-dan-perluasan-perbandingan"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-rumus-sudut-rangkap-dan-setengah",
  "judul": "Rumus Sudut Rangkap dan Setengah Sudut",
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sma11-rumus-jumlah-dan-selisih-dua"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-translasi-dan-refleksi-pada-bidang",
  "judul": "Translasi dan Refleksi pada Bidang Koordinat",
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "smp8-koordinat-kartesius"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-vektor-pada-bidang-datar-dan",
  "judul": "Vektor pada Bidang Datar dan Operasinya",
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "smp8-koordinat-kartesius",
   "smp8-teorema-pythagoras"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-aturan-turunan-dasar-pangkat-kelipatan",
  "judul": "Aturan Turunan Dasar: Pangkat, Kelipatan, Jumlah, dan Selisih",
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "prasyarat": [
   "sma11-definisi-turunan-sebagai-limit",
   "sma10-bentuk-akar",
   "smp7-operasi-penjumlahan-dan-pengurangan-bentuk"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-bentuk-taktentu-0-0-pada",
  "judul": "Bentuk Taktentu 0/0 pada Limit Fungsi Aljabar",
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "prasyarat": [
   "sma11-sifat-sifat-limit-dan-limit",
   "smp8-pemfaktoran-bentuk-aljabar",
   "smp9-operasi-bentuk-akar-dan-merasionalkan"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-definisi-turunan-sebagai-limit",
  "judul": "Definisi Turunan sebagai Limit",
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "prasyarat": [
   "sma11-laju-perubahan-rata-rata-dan",
   "sma11-bentuk-taktentu-0-0-pada",
   "sma11-kekontinuan-fungsi"
  ],
  "lanjut": true,
  "konsep": [
   "turunan-kemiringan"
  ]
 },
 {
  "id": "sma11-fungsi-naik-fungsi-turun-dan",
  "judul": "Fungsi Naik, Fungsi Turun, dan Titik Stasioner",
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "prasyarat": [
   "sma11-aturan-turunan-dasar-pangkat-kelipatan",
   "sma11-definisi-turunan-sebagai-limit"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-gradien-dan-persamaan-garis-singgung",
  "judul": "Gradien dan Persamaan Garis Singgung Kurva",
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "prasyarat": [
   "sma11-definisi-turunan-sebagai-limit",
   "smp8-persamaan-garis-lurus-dan-gradien",
   "sma11-aturan-turunan-dasar-pangkat-kelipatan"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-kekontinuan-fungsi",
  "judul": "Kekontinuan Fungsi",
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "prasyarat": [
   "sma11-konsep-dan-pengertian-limit-fungsi",
   "sma11-limit-di-tak-hingga-limit"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-konsep-dan-pengertian-limit-fungsi",
  "judul": "Konsep dan Pengertian Limit Fungsi",
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "prasyarat": [
   "sma10-fungsi-kuadrat-dan-grafiknya-parabola",
   "sma11-laju-perubahan-rata-rata-dan"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-laju-perubahan-rata-rata-dan",
  "judul": "Laju Perubahan Rata-rata dan Laju Perubahan Sesaat",
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "prasyarat": [
   "smp8-persamaan-garis-lurus-dan-gradien",
   "sma10-fungsi-kuadrat-dan-grafiknya-parabola"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-laju-perubahan-terkait-dan-penerapan",
  "judul": "Laju Perubahan Terkait dan Penerapan Turunan pada Kinematika serta Ekonomi",
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "prasyarat": [
   "sma11-definisi-turunan-sebagai-limit",
   "sma11-turunan-implisit-dan-turunan-tingkat"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-limit-di-tak-hingga-limit",
  "judul": "Limit di Tak Hingga, Limit Tak Hingga, dan Asimtot",
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "prasyarat": [
   "sma11-sifat-sifat-limit-dan-limit",
   "sma10-fungsi-kuadrat-dan-grafiknya-parabola",
   "sma11-bentuk-taktentu-0-0-pada"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-limit-fungsi-trigonometri",
  "judul": "Limit Fungsi Trigonometri",
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "prasyarat": [
   "sma11-fungsi-trigonometri-dan-lingkaran-satuan",
   "sma10-hubungan-sudut-penyiku-dan-identitas",
   "sma11-konsep-dan-pengertian-limit-fungsi"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-masalah-optimasi-dengan-turunan",
  "judul": "Masalah Optimasi dengan Turunan",
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "prasyarat": [
   "sma11-nilai-maksimum-minimum-kecekungan-dan",
   "smp8-jaring-jaring-bangun-ruang",
   "sma11-fungsi-naik-fungsi-turun-dan"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-nilai-maksimum-minimum-kecekungan-dan",
  "judul": "Nilai Maksimum-Minimum, Kecekungan, dan Titik Belok",
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "prasyarat": [
   "sma11-fungsi-naik-fungsi-turun-dan",
   "sma11-turunan-implisit-dan-turunan-tingkat",
   "sma11-limit-di-tak-hingga-limit"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-sifat-sifat-limit-dan-limit",
  "judul": "Sifat-Sifat Limit dan Limit Fungsi Aljabar",
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "prasyarat": [
   "sma11-konsep-dan-pengertian-limit-fungsi",
   "smp7-operasi-penjumlahan-dan-pengurangan-bentuk",
   "sma10-fungsi-kuadrat-dan-grafiknya-parabola"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-turunan-fungsi-eksponensial-dan-logaritma",
  "judul": "Turunan Fungsi Eksponensial dan Logaritma",
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "prasyarat": [
   "sma10-fungsi-eksponensial-pertumbuhan-dan-peluruhan"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-turunan-fungsi-trigonometri",
  "judul": "Turunan Fungsi Trigonometri",
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "prasyarat": [
   "sma11-limit-fungsi-trigonometri",
   "sma10-hubungan-sudut-penyiku-dan-identitas"
  ],
  "lanjut": true
 },
 {
  "id": "sma11-turunan-implisit-dan-turunan-tingkat",
  "judul": "Turunan Implisit dan Turunan Tingkat Tinggi",
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "prasyarat": [],
  "lanjut": true
 },
 {
  "id": "sma12-anuitas-pada-investasi-dan-pinjaman",
  "judul": "Anuitas pada Investasi dan Pinjaman",
  "kelas": 12,
  "fase": "F",
  "domain": "bilangan",
  "prasyarat": [
   "sma10-bunga-tunggal-bunga-majemuk-dan",
   "sma10-barisan-dan-deret-geometri-serta"
  ]
 },
 {
  "id": "sma12-barisan-aritmetika",
  "judul": "Barisan Aritmetika",
  "kelas": 12,
  "fase": "F",
  "domain": "bilangan",
  "prasyarat": [
   "smp8-pola-bilangan-dan-generalisasi",
   "smp9-fungsi-nonlinear-dan-perbandingannya-dengan",
   "smp7-operasi-bilangan-rasional"
  ]
 },
 {
  "id": "sma12-barisan-geometri",
  "judul": "Barisan Geometri",
  "kelas": 12,
  "fase": "F",
  "domain": "bilangan",
  "prasyarat": [
   "smp8-barisan-aritmetika-dan-barisan-geometri",
   "sd4-sifat-sifat-operasi-hitung-bilangan",
   "sma10-fungsi-eksponensial-pertumbuhan-dan-peluruhan"
  ]
 },
 {
  "id": "sma12-bunga-majemuk",
  "judul": "Bunga Majemuk",
  "kelas": 12,
  "fase": "F",
  "domain": "bilangan",
  "prasyarat": [
   "smp8-barisan-aritmetika-dan-barisan-geometri",
   "smp7-bunga-tunggal-pajak-dan-literasi",
   "sma10-fungsi-eksponensial-pertumbuhan-dan-peluruhan"
  ]
 },
 {
  "id": "sma12-bunga-tunggal",
  "judul": "Bunga Tunggal",
  "kelas": 12,
  "fase": "F",
  "domain": "bilangan",
  "prasyarat": [
   "smp8-barisan-aritmetika-dan-barisan-geometri",
   "smp7-perbandingan-senilai-dan-berbalik-nilai"
  ]
 },
 {
  "id": "sma12-deret-aritmetika",
  "judul": "Deret Aritmetika",
  "kelas": 12,
  "fase": "F",
  "domain": "bilangan",
  "prasyarat": [
   "smp8-barisan-aritmetika-dan-barisan-geometri",
   "smp9-persamaan-kuadrat"
  ]
 },
 {
  "id": "sma12-deret-geometri",
  "judul": "Deret Geometri",
  "kelas": 12,
  "fase": "F",
  "domain": "bilangan",
  "prasyarat": [
   "smp8-barisan-aritmetika-dan-barisan-geometri",
   "sma10-barisan-dan-deret-aritmetika",
   "sd4-sifat-sifat-operasi-hitung-bilangan"
  ]
 },
 {
  "id": "sma12-deret-geometri-tak-hingga",
  "judul": "Deret Geometri Tak Hingga",
  "kelas": 12,
  "fase": "F",
  "domain": "bilangan",
  "prasyarat": [
   "sma10-barisan-dan-deret-geometri-serta",
   "smp7-bilangan-rasional-dan-bentuk-pecahan"
  ]
 },
 {
  "id": "sma12-penyelidikan-parameter-model-investasi-dan",
  "judul": "Penyelidikan Parameter Model Investasi dan Pinjaman",
  "kelas": 12,
  "fase": "F",
  "domain": "bilangan",
  "prasyarat": [
   "sma10-bunga-tunggal-bunga-majemuk-dan",
   "sma12-anuitas-pada-investasi-dan-pinjaman",
   "sma10-fungsi-eksponensial-pertumbuhan-dan-peluruhan"
  ]
 },
 {
  "id": "sma12-aturan-penjumlahan-dan-aturan-perkalian",
  "judul": "Aturan Penjumlahan dan Aturan Perkalian (Kaidah Pencacahan)",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "prasyarat": [
   "sd4-sifat-sifat-operasi-hitung-bilangan"
  ]
 },
 {
  "id": "sma12-diagram-pohon-berbobot-dan-teorema",
  "judul": "Diagram Pohon Berbobot dan Teorema Bayes",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "prasyarat": [
   "sma12-peluang-bersyarat",
   "sma12-kejadian-majemuk-gabungan-dan-kejadian"
  ]
 },
 {
  "id": "sma12-faktorial-dan-permutasi",
  "judul": "Faktorial dan Permutasi",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "prasyarat": [
   "sma12-aturan-penjumlahan-dan-aturan-perkalian"
  ]
 },
 {
  "id": "sma12-kejadian-majemuk-gabungan-dan-kejadian",
  "judul": "Kejadian Majemuk: Gabungan dan Kejadian Saling Lepas",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "prasyarat": [
   "smp9-frekuensi-harapan"
  ]
 },
 {
  "id": "sma12-kejadian-saling-bebas-dan-aturan",
  "judul": "Kejadian Saling Bebas dan Aturan Perkalian Peluang",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "prasyarat": [
   "sma12-kejadian-majemuk-gabungan-dan-kejadian",
   "sma12-menghitung-peluang-dengan-permutasi-dan"
  ]
 },
 {
  "id": "sma12-kombinasi-memilih-tanpa-memperhatikan-urutan",
  "judul": "Kombinasi: Memilih Tanpa Memperhatikan Urutan",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "prasyarat": [
   "sma12-faktorial-dan-permutasi",
   "sma12-aturan-penjumlahan-dan-aturan-perkalian"
  ]
 },
 {
  "id": "sma12-menghitung-peluang-dengan-permutasi-dan",
  "judul": "Menghitung Peluang dengan Permutasi dan Kombinasi",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "prasyarat": [
   "sma12-kombinasi-memilih-tanpa-memperhatikan-urutan",
   "smp9-frekuensi-harapan"
  ]
 },
 {
  "id": "sma12-peluang-bersyarat",
  "judul": "Peluang Bersyarat",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "prasyarat": [
   "sma12-kejadian-saling-bebas-dan-aturan",
   "sma11-tabel-kontingensi-dan-asosiasi-dua"
  ]
 },
 {
  "id": "sma12-permutasi-dengan-unsur-sama-permutasi",
  "judul": "Permutasi dengan Unsur Sama, Permutasi Siklis, dan Permutasi Berulang",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "prasyarat": [
   "sma12-faktorial-dan-permutasi"
  ]
 },
 {
  "id": "sma12-ruang-sampel-kejadian-dan-frekuensi",
  "judul": "Ruang Sampel, Kejadian, dan Frekuensi Harapan",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "prasyarat": [
   "smp9-peluang-empiris-dan-frekuensi-relatif"
  ]
 },
 {
  "id": "sma12-segitiga-pascal-dan-binomial-newton",
  "judul": "Segitiga Pascal dan Binomial Newton",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "prasyarat": [
   "sma12-kombinasi-memilih-tanpa-memperhatikan-urutan",
   "smp7-operasi-penjumlahan-dan-pengurangan-bentuk"
  ]
 },
 {
  "id": "sma12-jarak-dalam-bangun-ruang",
  "judul": "Jarak dalam Bangun Ruang",
  "kelas": 12,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sma12-kedudukan-titik-garis-dan-bidang",
   "smp8-teorema-pythagoras"
  ]
 },
 {
  "id": "sma12-kedudukan-titik-garis-dan-bidang",
  "judul": "Kedudukan Titik, Garis, dan Bidang dalam Ruang",
  "kelas": 12,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sd5-keliling-bangun-datar",
   "smp8-teorema-pythagoras"
  ]
 },
 {
  "id": "sma12-sudut-dalam-bangun-ruang",
  "judul": "Sudut dalam Bangun Ruang",
  "kelas": 12,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sma12-jarak-dalam-bangun-ruang",
   "sma10-teorema-pythagoras-dan-segitiga-siku"
  ]
 },
 {
  "id": "sma12-bilangan-kompleks-pengayaan-di-luar",
  "judul": "Bilangan Kompleks (pengayaan di luar CP 2025)",
  "kelas": 12,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "smp9-persamaan-kuadrat",
   "sma11-vektor-di-bidang-representasi-dan",
   "sma11-fungsi-trigonometri-dan-lingkaran-satuan"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-fungsi-akar-dan-domainnya",
  "judul": "Fungsi Akar dan Domainnya",
  "kelas": 12,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "sma11-fungsi-invers",
   "sma10-bentuk-akar"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-fungsi-eksponensial-lanjutan",
  "judul": "Fungsi Eksponensial Lanjutan",
  "kelas": 12,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "sma11-pemodelan-dunia-nyata-dengan-fungsi",
   "smp8-bilangan-berpangkat-bulat"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-fungsi-logaritma-dan-sifat-sifatnya",
  "judul": "Fungsi Logaritma dan Sifat-sifatnya",
  "kelas": 12,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "sma12-fungsi-eksponensial-lanjutan",
   "sma11-fungsi-invers"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-fungsi-nilai-mutlak-fungsi-tangga",
  "judul": "Fungsi Nilai Mutlak, Fungsi Tangga, dan Fungsi Piecewise",
  "kelas": 12,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "sma11-fungsi-notasi-domain-range-dan",
   "smp9-transformasi-translasi"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-fungsi-rasional-dan-asimtotnya",
  "judul": "Fungsi Rasional dan Asimtotnya",
  "kelas": 12,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "sma11-pembagian-polinomial-dan-skema-horner",
   "sma11-fungsi-notasi-domain-range-dan"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-hasil-kali-skalar-proyeksi-dan",
  "judul": "Hasil Kali Skalar, Proyeksi, dan Vektor di Ruang (pengayaan di luar CP 2025)",
  "kelas": 12,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "sma11-vektor-di-bidang-representasi-dan",
   "sma11-fungsi-trigonometri-dan-lingkaran-satuan"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-persamaan-dan-pertidaksamaan-eksponensial-serta",
  "judul": "Persamaan dan Pertidaksamaan Eksponensial serta Logaritma",
  "kelas": 12,
  "fase": "F",
  "domain": "aljabar",
  "prasyarat": [
   "sma12-fungsi-logaritma-dan-sifat-sifatnya",
   "sma10-persamaan-dan-pertidaksamaan-eksponensial-berbasis"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-distribusi-normal-dan-kurva-lonceng",
  "judul": "Distribusi Normal dan Kurva Lonceng",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "prasyarat": [
   "sma12-percobaan-bernoulli-dan-distribusi-binomial",
   "smp8-jangkauan-dan-ukuran-penyebaran-data"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-distribusi-sampling-rata-rata-dan",
  "judul": "Distribusi Sampling Rata-rata dan Teorema Limit Pusat",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "prasyarat": [
   "sma11-populasi-sampel-dan-teknik-sampling",
   "sma12-skor-z-dan-tabel-distribusi"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-nilai-harapan-dan-variansi-variabel",
  "judul": "Nilai Harapan dan Variansi Variabel Acak Diskret",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "prasyarat": [
   "sma12-variabel-acak-diskret-dan-fungsi",
   "smp8-jangkauan-dan-ukuran-penyebaran-data"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-pendugaan-parameter-dan-interval-kepercayaan",
  "judul": "Pendugaan Parameter dan Interval Kepercayaan",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "prasyarat": [
   "sma12-distribusi-sampling-rata-rata-dan"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-percobaan-bernoulli-dan-distribusi-binomial",
  "judul": "Percobaan Bernoulli dan Distribusi Binomial",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "prasyarat": [
   "sma12-nilai-harapan-dan-variansi-variabel",
   "sma12-segitiga-pascal-dan-binomial-newton",
   "sma12-kejadian-saling-bebas-dan-aturan"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-skor-z-dan-tabel-distribusi",
  "judul": "Skor-z dan Tabel Distribusi Normal Baku",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "prasyarat": [
   "sma12-distribusi-normal-dan-kurva-lonceng",
   "sma11-koefisien-korelasi-dan-kuat-lemahnya"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-uji-hipotesis-rata-rata-dan",
  "judul": "Uji Hipotesis Rata-rata dan Proporsi",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "prasyarat": [
   "sma12-pendugaan-parameter-dan-interval-kepercayaan",
   "sma12-skor-z-dan-tabel-distribusi"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-variabel-acak-diskret-dan-fungsi",
  "judul": "Variabel Acak Diskret dan Fungsi Peluang",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "prasyarat": [
   "smp9-frekuensi-harapan",
   "sma12-menghitung-peluang-dengan-permutasi-dan"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-elips-dua-fokus-dan-jumlah",
  "judul": "Elips: Dua Fokus dan Jumlah Jarak Tetap",
  "kelas": 12,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sma12-irisan-kerucut-satu-kerucut-empat",
   "sma12-persamaan-lingkaran-pada-bidang-koordinat"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-garis-singgung-irisan-kerucut",
  "judul": "Garis Singgung Irisan Kerucut",
  "kelas": 12,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sma12-garis-singgung-lingkaran-secara-analitik",
   "sma12-hiperbola-selisih-jarak-tetap-dan"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-garis-singgung-lingkaran-secara-analitik",
  "judul": "Garis Singgung Lingkaran secara Analitik",
  "kelas": 12,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sma12-kedudukan-titik-garis-dan-dua",
   "sma11-garis-singgung-lingkaran-dan-garis"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-hiperbola-selisih-jarak-tetap-dan",
  "judul": "Hiperbola: Selisih Jarak Tetap dan Asimtot",
  "kelas": 12,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sma12-elips-dua-fokus-dan-jumlah"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-irisan-kerucut-satu-kerucut-empat",
  "judul": "Irisan Kerucut: Satu Kerucut, Empat Kurva",
  "kelas": 12,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sma12-persamaan-lingkaran-pada-bidang-koordinat"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-kedudukan-titik-garis-dan-dua",
  "judul": "Kedudukan Titik, Garis, dan Dua Lingkaran",
  "kelas": 12,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sma12-persamaan-lingkaran-pada-bidang-koordinat",
   "smp8-persamaan-garis-lurus-dan-gradien"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-parabola-fokus-direktriks-dan-persamaannya",
  "judul": "Parabola: Fokus, Direktriks, dan Persamaannya",
  "kelas": 12,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sma12-irisan-kerucut-satu-kerucut-empat",
   "sma10-fungsi-kuadrat-dan-grafiknya-parabola"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-persamaan-lingkaran-pada-bidang-koordinat",
  "judul": "Persamaan Lingkaran pada Bidang Koordinat",
  "kelas": 12,
  "fase": "F",
  "domain": "geometri",
  "prasyarat": [
   "sma11-unsur-unsur-lingkaran-dan-hubungan",
   "smp8-identitas-aljabar-dan-bentuk-kuadrat"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-aturan-hasil-kali-dan-aturan",
  "judul": "Aturan Hasil Kali dan Aturan Hasil Bagi",
  "kelas": 12,
  "fase": "F",
  "domain": "kalkulus",
  "prasyarat": [
   "sma11-aturan-turunan-dasar-pangkat-kelipatan",
   "smp7-operasi-penjumlahan-dan-pengurangan-bentuk",
   "sma10-fungsi-kuadrat-dan-grafiknya-parabola"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-aturan-rantai",
  "judul": "Aturan Rantai",
  "kelas": 12,
  "fase": "F",
  "domain": "kalkulus",
  "prasyarat": [
   "sma11-komposisi-fungsi",
   "sma11-aturan-turunan-dasar-pangkat-kelipatan",
   "sma12-aturan-hasil-kali-dan-aturan"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-integral-dengan-substitusi",
  "judul": "Integral dengan Substitusi",
  "kelas": 12,
  "fase": "F",
  "domain": "kalkulus",
  "prasyarat": [
   "sma12-integral-tak-tentu-sebagai-antiturunan",
   "sma12-aturan-rantai",
   "sma11-komposisi-fungsi"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-integral-parsial",
  "judul": "Integral Parsial",
  "kelas": 12,
  "fase": "F",
  "domain": "kalkulus",
  "prasyarat": [
   "sma12-integral-dengan-substitusi",
   "sma12-aturan-hasil-kali-dan-aturan",
   "sma12-integral-tak-tentu-sebagai-antiturunan"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-integral-tak-tentu-sebagai-antiturunan",
  "judul": "Integral Tak Tentu sebagai Antiturunan",
  "kelas": 12,
  "fase": "F",
  "domain": "kalkulus",
  "prasyarat": [
   "sma11-aturan-turunan-dasar-pangkat-kelipatan",
   "sma11-turunan-fungsi-trigonometri",
   "sma11-turunan-fungsi-eksponensial-dan-logaritma"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-jumlah-riemann-dan-integral-tentu",
  "judul": "Jumlah Riemann dan Integral Tentu",
  "kelas": 12,
  "fase": "F",
  "domain": "kalkulus",
  "prasyarat": [
   "sma11-konsep-dan-pengertian-limit-fungsi",
   "sma12-integral-tak-tentu-sebagai-antiturunan"
  ],
  "lanjut": true,
  "konsep": [
   "integral-luas"
  ]
 },
 {
  "id": "sma12-luas-daerah-dengan-integral",
  "judul": "Luas Daerah dengan Integral",
  "kelas": 12,
  "fase": "F",
  "domain": "kalkulus",
  "prasyarat": [
   "sma12-teorema-dasar-kalkulus",
   "smp8-sistem-persamaan-linear-dua-variabel",
   "sma12-jumlah-riemann-dan-integral-tentu"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-teorema-dasar-kalkulus",
  "judul": "Teorema Dasar Kalkulus",
  "kelas": 12,
  "fase": "F",
  "domain": "kalkulus",
  "prasyarat": [
   "sma12-jumlah-riemann-dan-integral-tentu",
   "sma12-integral-tak-tentu-sebagai-antiturunan",
   "sma11-kekontinuan-fungsi"
  ],
  "lanjut": true
 },
 {
  "id": "sma12-volume-benda-putar",
  "judul": "Volume Benda Putar",
  "kelas": 12,
  "fase": "F",
  "domain": "kalkulus",
  "prasyarat": [
   "sma12-luas-daerah-dengan-integral",
   "sd6-mengenal-prisma-tabung-limas-kerucut",
   "sma12-teorema-dasar-kalkulus"
  ],
  "lanjut": true
 }
]
