/* ============================================================
   Visual MTK — Galeri gambar soal (halaman penulis)
   Tidak ada di menu. Dibuka lewat #/gambar-soal oleh penulis
   bank soal untuk melihat semua jenis gambar yang tersedia
   beserta spesifikasinya. Panduan: docs/PANDUAN-SOAL-TOPIK.md
   ============================================================ */

import { GambarSoal } from '../components/GambarSoal'
import type { SpesGambar } from '../lib/gambar'

const CONTOH: { kode: string; spec: SpesGambar }[] = [
  {
    kode: "{ jenis: 'benda', banyak: 7, bentuk: 'apel', warna: 'hi' }",
    spec: { jenis: 'benda', banyak: 7, bentuk: 'apel', warna: 'hi' },
  },
  {
    kode: "{ jenis: 'benda', banyak: 9, bentuk: 'balon', coret: 3 }",
    spec: { jenis: 'benda', banyak: 9, bentuk: 'balon', coret: 3 },
  },
  {
    kode: "{ jenis: 'benda', kelompok: [{ banyak: 5, label: 'A', ukuran: 'besar' }, { banyak: 8, label: 'B', ukuran: 'kecil', per: 8 }] }",
    spec: {
      jenis: 'benda',
      kelompok: [
        { banyak: 5, label: 'A', ukuran: 'besar' },
        { banyak: 8, label: 'B', ukuran: 'kecil', per: 8 },
      ],
    },
  },
  {
    kode: "{ jenis: 'benda', banyak: 24, bentuk: 'bintang' }",
    spec: { jenis: 'benda', banyak: 24, bentuk: 'bintang' },
  },
  {
    kode: "{ jenis: 'benda', kelompok: [{ banyak: 3, bentuk: 'ikan', label: 'Senin' }, { banyak: 5, bentuk: 'ikan', label: 'Selasa' }] }",
    spec: {
      jenis: 'benda',
      kelompok: [
        { banyak: 3, bentuk: 'ikan', label: 'Senin' },
        { banyak: 5, bentuk: 'ikan', label: 'Selasa' },
      ],
    },
  },
  {
    kode: "{ jenis: 'pola', isi: ['bulat:a', 'kotak:b', 'hati:hi', 'bintang:c', 'segitiga:ab', '?'] }",
    spec: { jenis: 'pola', isi: ['bulat:a', 'kotak:b', 'hati:hi', 'bintang:c', 'segitiga:ab', '?'] },
  },
  {
    kode: "{ jenis: 'pola', isi: ['2', '4', '6', '?', '10'] }",
    spec: { jenis: 'pola', isi: ['2', '4', '6', '?', '10'] },
  },
  {
    kode: "{ jenis: 'pola', isi: ['Ani', 'Budi', 'Cici', 'Doni'], ujung: ['depan', 'belakang'] }",
    spec: { jenis: 'pola', isi: ['Ani', 'Budi', 'Cici', 'Doni'], ujung: ['depan', 'belakang'] },
  },
  { kode: "{ jenis: 'blok', puluhan: 3, satuan: 7 }", spec: { jenis: 'blok', puluhan: 3, satuan: 7 } },
  {
    kode: "{ jenis: 'blok', ribuan: 1, ratusan: 2, puluhan: 4, satuan: 5 }",
    spec: { jenis: 'blok', ribuan: 1, ratusan: 2, puluhan: 4, satuan: 5 },
  },
  {
    kode: "{ jenis: 'garis', dari: 0, sampai: 10, tanya: [6], lompat: [[2, 5]] }",
    spec: { jenis: 'garis', dari: 0, sampai: 10, tanya: [6], lompat: [[2, 5]] },
  },
  {
    kode: "{ jenis: 'garis', dari: -5, sampai: 5, tanda: [-3, 2] }",
    spec: { jenis: 'garis', dari: -5, sampai: 5, tanda: [-3, 2] },
  },
  {
    kode: "{ jenis: 'garis', dari: 0, sampai: 1, langkah: 0.25, penyebut: 4, tanda: [0.75] }",
    spec: { jenis: 'garis', dari: 0, sampai: 1, langkah: 0.25, penyebut: 4, tanda: [0.75] },
  },
  {
    kode: "{ jenis: 'garis', dari: 0, sampai: 100, langkah: 10, tanda: [70] }",
    spec: { jenis: 'garis', dari: 0, sampai: 100, langkah: 10, tanda: [70] },
  },
  {
    kode: "{ jenis: 'pecahan', isi: [[3, 4], [2, 3]] }",
    spec: { jenis: 'pecahan', isi: [[3, 4], [2, 3]] },
  },
  {
    kode: "{ jenis: 'pecahan', isi: [[5, 4]], bentuk: 'lingkaran' }",
    spec: { jenis: 'pecahan', isi: [[5, 4]], bentuk: 'lingkaran' },
  },
  { kode: "{ jenis: 'jam', jam: 7, menit: 30 }", spec: { jenis: 'jam', jam: 7, menit: 30 } },
  {
    kode: "{ jenis: 'batang', label: ['Apel', 'Jeruk', 'Pisang', 'Mangga'], nilai: [6, 9, 4, 7], sumbu: 'Banyak buah' }",
    spec: { jenis: 'batang', label: ['Apel', 'Jeruk', 'Pisang', 'Mangga'], nilai: [6, 9, 4, 7], sumbu: 'Banyak buah' },
  },
  {
    kode: "{ jenis: 'pai', label: ['Sepak bola', 'Renang', 'Bulu tangkis'], nilai: [50, 25, 25], persen: true }",
    spec: { jenis: 'pai', label: ['Sepak bola', 'Renang', 'Bulu tangkis'], nilai: [50, 25, 25], persen: true },
  },
  {
    kode: "{ jenis: 'tabel', kepala: ['Hari', 'Pengunjung'], baris: [['Senin', 120], ['Selasa', 95]] }",
    spec: { jenis: 'tabel', kepala: ['Hari', 'Pengunjung'], baris: [['Senin', 120], ['Selasa', 95]] },
  },
  ...(
    [
      ['persegi', { s: '6 cm' }],
      ['persegi-panjang', { p: '8 cm', l: '5 cm' }],
      ['segitiga', { alas: '10 cm', tinggi: '6 cm' }],
      ['segitiga-siku', { alas: '4 cm', tegak: '3 cm', miring: '?' }],
      ['jajargenjang', { alas: '9 cm', tinggi: '4 cm', miring: '5 cm' }],
      ['trapesium', { atas: '6 cm', bawah: '10 cm', tinggi: '4 cm' }],
      ['belah-ketupat', { d1: '8 cm', d2: '6 cm' }],
      ['layang-layang', { d1: '6 cm', d2: '10 cm' }],
      ['lingkaran', { r: '7 cm' }],
      ['kubus', { s: '5 cm' }],
      ['balok', { p: '8 cm', l: '4 cm', t: '5 cm' }],
      ['tabung', { r: '7 cm', t: '10 cm' }],
      ['kerucut', { r: '6 cm', t: '8 cm', s: '10 cm' }],
      ['bola', { r: '21 cm' }],
      ['limas', { s: '6 cm', t: '4 cm' }],
      ['prisma', { alas: '6 cm', tinggi: '4 cm', panjang: '10 cm' }],
    ] as const
  ).map(([bentuk, label]) => ({
    kode: `{ jenis: 'bangun', bentuk: '${bentuk}', label: ${JSON.stringify(label)} }`,
    spec: { jenis: 'bangun', bentuk, label } as SpesGambar,
  })),
  { kode: "{ jenis: 'sudut', besar: 60, label: '60°' }", spec: { jenis: 'sudut', besar: 60, label: '60°' } },
  { kode: "{ jenis: 'sudut', besar: 135, label: '?' }", spec: { jenis: 'sudut', besar: 135, label: '?' } },
  { kode: "{ jenis: 'sudut', besar: 90 }", spec: { jenis: 'sudut', besar: 90 } },
  { kode: "{ jenis: 'sudut', besar: 250, label: '250°' }", spec: { jenis: 'sudut', besar: 250, label: '250°' } },
  {
    kode: "{ jenis: 'grafik', x: [-4, 4], y: [-2, 8], kurva: [(x) => x * x - 1], titik: [{ x: 2, y: 3, label: 'A' }] }",
    spec: { jenis: 'grafik', x: [-4, 4], y: [-2, 8], kurva: [(x) => x * x - 1], titik: [{ x: 2, y: 3, label: 'A' }] },
  },
  {
    kode: "{ jenis: 'grafik', x: [0, 6], y: [0, 6], kurva: [(x) => 0.5 * x + 1], arsir: { kurva: 0, dari: 1, sampai: 4 } }",
    spec: { jenis: 'grafik', x: [0, 6], y: [0, 6], kurva: [(x) => 0.5 * x + 1], arsir: { kurva: 0, dari: 1, sampai: 4 } },
  },
  {
    kode: "{ jenis: 'grafik', x: [-6.3, 6.3], y: [-1.5, 1.5], pi: true, kurva: [Math.sin, Math.cos] }",
    spec: { jenis: 'grafik', x: [-6.3, 6.3], y: [-1.5, 1.5], pi: true, kurva: [Math.sin, Math.cos] },
  },
  {
    kode: "{ jenis: 'grafik', x: [-1, 7], y: [-1, 5], titik: [{ x: 1, y: 1, label: 'P' }, { x: 5, y: 4, label: 'Q' }], ruas: [[1, 1, 5, 4]] }",
    spec: {
      jenis: 'grafik',
      x: [-1, 7],
      y: [-1, 5],
      titik: [
        { x: 1, y: 1, label: 'P' },
        { x: 5, y: 4, label: 'Q' },
      ],
      ruas: [[1, 1, 5, 4]],
    },
  },
  {
    kode: "{ jenis: 'timbangan', kiri: 'x + 3', kanan: '10', miring: 'seimbang' }",
    spec: { jenis: 'timbangan', kiri: 'x + 3', kanan: '10', miring: 'seimbang' },
  },
  {
    kode: "{ jenis: 'timbangan', kiri: 'batu', kanan: 'kapas', miring: 'kiri' }",
    spec: { jenis: 'timbangan', kiri: 'batu', kanan: 'kapas', miring: 'kiri' },
  },
  {
    kode: "{ jenis: 'pita', petak: true, isi: [{ label: 'Pita A', panjang: 7 }, { label: 'Pita B', panjang: 5, mulai: 4 }] }",
    spec: {
      jenis: 'pita',
      petak: true,
      isi: [
        { label: 'Pita A', panjang: 7 },
        { label: 'Pita B', panjang: 5, mulai: 4 },
      ],
    },
  },
]

export default function GaleriGambarPage() {
  return (
    <div className="page section-rapat stack stack-5">
      <header className="stack stack-2">
        <span className="eyebrow">Untuk penulis soal</span>
        <h1 style={{ fontSize: 'var(--t-2xl)' }}>Galeri gambar soal</h1>
        <p className="lead">
          Semua jenis gambar yang bisa dipakai di bank soal topik. Salin spesifikasinya ke kunci{' '}
          <code>gambar</code> pada soal.
        </p>
      </header>
      <div className="grid grid-2">
        {CONTOH.map((c, i) => (
          <figure key={i} className="card stack stack-3" style={{ margin: 0 }}>
            <div className="soal-visual">
              <GambarSoal spec={c.spec} />
            </div>
            <figcaption>
              <code style={{ wordBreak: 'break-word', fontSize: 'var(--t-xs)' }}>{c.kode}</code>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
