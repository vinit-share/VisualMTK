/* ============================================================
   Visual MTK — Peta kurikulum

   Daftar topiknya dihasilkan dari riset Capaian Pembelajaran resmi
   (Kepka BSKAP Kemendikdasmen No. 046/H/KR/2025) dan tersimpan di
   kurikulum.generated.ts. Berkas ini hanya menambahkan struktur
   yang dipakai aplikasi: pembagian kelas, jalur konsep, dan
   pembantu pencarian.

   Struktur fase: A (kelas 1-2), B (3-4), C (5-6), D (7-9),
   E (10), F (11-12).
   ============================================================ */

import type { Jenjang, Fase } from '../lib/types'
import { TOPIK_GENERATED, type TopikKurikulum } from './kurikulum.generated'

export type { TopikKurikulum }

export interface Kelas {
  no: number
  jenjang: Jenjang
  fase: Fase
  julukan: string
}

export const KELAS: Kelas[] = [
  { no: 1, jenjang: 'SD', fase: 'A', julukan: 'Mengenal bilangan' },
  { no: 2, jenjang: 'SD', fase: 'A', julukan: 'Puluhan dan satuan' },
  { no: 3, jenjang: 'SD', fase: 'B', julukan: 'Kali dan bagi' },
  { no: 4, jenjang: 'SD', fase: 'B', julukan: 'Pecahan dan pengukuran' },
  { no: 5, jenjang: 'SD', fase: 'C', julukan: 'Luas dan pecahan' },
  { no: 6, jenjang: 'SD', fase: 'C', julukan: 'Lingkaran dan volume' },
  { no: 7, jenjang: 'SMP', fase: 'D', julukan: 'Masuk dunia aljabar' },
  { no: 8, jenjang: 'SMP', fase: 'D', julukan: 'Pythagoras dan pola' },
  { no: 9, jenjang: 'SMP', fase: 'D', julukan: 'Kuadrat dan ruang' },
  { no: 10, jenjang: 'SMA', fase: 'E', julukan: 'Eksponen sampai trigonometri' },
  { no: 11, jenjang: 'SMA', fase: 'F', julukan: 'Fungsi, matriks, turunan' },
  { no: 12, jenjang: 'SMA', fase: 'F', julukan: 'Integral dan statistika' },
]

export const TOPIK = TOPIK_GENERATED

export const petaTopik = new Map(TOPIK.map((t) => [t.id, t]))
export const cariTopik = (id: string) => petaTopik.get(id)
export const topikKelas = (n: number) => TOPIK.filter((t) => t.kelas === n)
export const faseKelas = (n: number) => KELAS.find((k) => k.no === n)?.fase ?? 'A'
export const jenjangKelas = (n: number) => KELAS.find((k) => k.no === n)?.jenjang ?? 'SD'
export const topikJenjang = (j: Jenjang) =>
  TOPIK.filter((t) => jenjangKelas(t.kelas) === j)

/** Topik yang punya modul konsep interaktif. */
export const topikBerkonsep = () => TOPIK.filter((t) => (t.konsep ?? []).length > 0)

/**
 * Cari id topik dari kelas dan potongan judulnya.
 * Dipakai agar jalur konsep tetap tersambung walau daftar topik
 * dibangun ulang dari riset (id-nya diturunkan dari judul).
 */
function id(kelas: number, kata: string): string | null {
  const k = kata.toLowerCase()
  const cocok = TOPIK.filter((t) => t.kelas === kelas && t.judul.toLowerCase().includes(k))
  if (cocok.length === 0) return null
  // Judul terpendek biasanya topik intinya, bukan penerapannya.
  return cocok.sort((a, b) => a.judul.length - b.judul.length)[0].id
}

const rantai = (...pasangan: [number, string][]) =>
  pasangan.map(([k, s]) => id(k, s)).filter((x): x is string => !!x)

/* ------------------------------------------------------------
   Jalur konsep untuk Peta Pengetahuan.
   Tiap jalur menghubungkan materi SD sampai SMA supaya terlihat
   bahwa materi lama dipakai lagi di materi baru.
   ------------------------------------------------------------ */
export interface Jalur {
  id: string
  nama: string
  deskripsi: string
  warna: 'brand' | 'amber' | 'teal' | 'blue' | 'pink'
  rantai: string[]
}

export const JALUR: Jalur[] = [
  {
    id: 'jalur-luas',
    nama: 'Dari kotak ke lengkung',
    deskripsi:
      'Semua rumus luas berakar pada satu gagasan: menutup bidang dengan persegi satuan. Gagasan itu bertahan sampai integral.',
    warna: 'brand',
    rantai: rantai(
      [3, 'perkalian sebagai penjumlahan'],
      [4, 'pengukuran luas'],
      [5, 'luas persegi'],
      [6, 'keliling dan luas lingkaran'],
      [8, 'luas'],
      [12, 'integral'],
    ),
  },
  {
    id: 'jalur-pecahan',
    nama: 'Sepotong demi sepotong',
    deskripsi:
      'Pecahan tumbuh menjadi desimal, persen, rasio, lalu peluang. Semuanya berbicara tentang "bagian dari keseluruhan".',
    warna: 'amber',
    rantai: rantai(
      [3, 'pecahan'],
      [4, 'pecahan senilai'],
      [5, 'penjumlahan dan pengurangan pecahan'],
      [6, 'hubungan pecahan'],
      [6, 'rasio'],
      [8, 'peluang'],
      [10, 'peluang'],
    ),
  },
  {
    id: 'jalur-aljabar',
    nama: 'Huruf yang mewakili angka',
    deskripsi:
      'Dari perkalian biasa, ke kalimat matematika, ke persamaan, ke fungsi, sampai turunan.',
    warna: 'teal',
    rantai: rantai(
      [3, 'perkalian sebagai penjumlahan'],
      [5, 'kalimat matematika'],
      [7, 'bentuk aljabar'],
      [7, 'persamaan linear'],
      [9, 'fungsi kuadrat'],
      [11, 'turunan'],
    ),
  },
  {
    id: 'jalur-segitiga',
    nama: 'Segitiga yang tidak ada habisnya',
    deskripsi:
      'Sudut, lalu Pythagoras, lalu perbandingan sisi — dan dari situ lahir gelombang sinus.',
    warna: 'blue',
    rantai: rantai(
      [4, 'ciri-ciri segitiga'],
      [5, 'sudut dan pengukurannya'],
      [8, 'pythagoras'],
      [10, 'perbandingan trigonometri sudut lancip'],
      [11, 'trigonometri'],
    ),
  },
  {
    id: 'jalur-pangkat',
    nama: 'Kalau dikali terus-menerus',
    deskripsi:
      'Perkalian berulang melahirkan pangkat, lalu eksponen, lalu logaritma sebagai kebalikannya.',
    warna: 'pink',
    rantai: rantai(
      [3, 'perkalian sebagai penjumlahan'],
      [6, 'pangkat dua'],
      [10, 'bilangan berpangkat'],
      [10, 'sifat-sifat operasi eksponen'],
      [10, 'logaritma'],
    ),
  },
  {
    id: 'jalur-nilai-tempat',
    nama: 'Kenapa angka punya tempat duduk',
    deskripsi:
      'Nilai tempat adalah fondasi diam-diam di balik bilangan besar, desimal, dan notasi ilmiah.',
    warna: 'brand',
    rantai: rantai(
      [1, 'nilai tempat'],
      [2, 'nilai tempat'],
      [4, 'nilai tempat'],
      [5, 'nilai tempat'],
      [6, 'bilangan desimal'],
      [10, 'notasi ilmiah'],
    ),
  },
  {
    id: 'jalur-data',
    nama: 'Membaca angka orang lain',
    deskripsi:
      'Dari menghitung gambar di piktogram sampai menilai apakah sebuah laporan statistik boleh dipercaya.',
    warna: 'teal',
    rantai: rantai(
      [4, 'piktogram'],
      [5, 'mengumpulkan data'],
      [6, 'mean, median'],
      [8, 'statistika'],
      [10, 'ukuran pemusatan'],
      [10, 'box plot'],
    ),
  },
  {
    id: 'jalur-negatif',
    nama: 'Ketika angka boleh di bawah nol',
    deskripsi:
      'Garis bilangan melebar ke kiri, dan aturan tanda yang tampak aneh itu ternyata dipaksakan oleh logika.',
    warna: 'amber',
    rantai: rantai(
      [6, 'garis bilangan dan bilangan bulat negatif'],
      [7, 'bilangan bulat'],
      [10, 'himpunan bilangan real'],
    ),
  },
]
