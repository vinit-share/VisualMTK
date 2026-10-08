# Panduan menulis bank soal topik

Setiap topik kurikulum (367 topik, kelas 1–12) punya **tes topik**: 5 soal dari
mudah ke sulit yang dibuka dari halaman topik. Soalnya diambil dari bank di
`src/data/soal/`. Dokumen ini adalah kontrak menulis bank itu.

Contoh mutu: `src/data/soal/kelas-1.ts`. Baca dulu sebelum menulis.

## Tujuan tes topik

Tes menjawab satu pertanyaan anak: **"Aku sudah paham topik ini belum?"**
Bukan ujian dan bukan jebakan. Soal yang baik:

- menguji gagasan inti topiknya, bukan hafalan istilah;
- pengecohnya berasal dari kekeliruan yang memang sering terjadi
  (lihat `miskonsepsi` pada data topik);
- kalau anak salah, alasan pada pengecoh dan petunjuknya **mengajari**,
  bukan sekadar berkata "salah";
- sebisa mungkin **bergambar** — ini Visual MTK.

Ketepatan matematika di atas segalanya. Satu kunci jawaban yang salah merusak
kepercayaan anak pada seluruh aplikasi.

## Tempat dan bentuk berkas

```
src/data/soal/kelas-N.ts        satu kelas dalam satu berkas, atau
src/data/soal/kelas-N-1.ts      dipecah: kelas-N-1.ts, kelas-N-2.ts, …
```

```ts
import { fmt, pick, randInt } from '../../lib/num'
import { angka, bs, cocok, isian, pg, urut, type BankSoal } from './alat'

const bank: BankSoal = {
  'id-topik-persis-seperti-di-kurikulum': [
    pg({ … }),          // soal tetap
    (r) => pg({ … }),   // pembuat soal: angkanya berganti tiap tes
  ],
}

export default bank
```

- Kunci objek adalah **id topik persis** seperti di kurikulum. Topik kelas 5
  hanya boleh ditulis di berkas `kelas-5*.ts`.
- `id`, `topicId`, dan `kelas` soal **tidak ditulis** — diisi otomatis.
- Hanya boleh mengimpor dari `./alat` dan `../../lib/num`. Tanpa JSX, tanpa
  berkas bantu baru, tanpa menyunting berkas lain.

## Syarat tiap topik

| Syarat | Nilai |
|---|---|
| Banyak butir | paling sedikit **6**, sasaran **7** |
| Tingkat | paling sedikit 2 `mudah`, 2 `sedang`, 1 `sulit` |
| Pembuat soal (fungsi) | paling sedikit **2** bila topiknya berhitung, supaya tes bisa diulang dengan angka baru |
| Soal benar-salah | paling banyak 2 |
| Bergambar | kelas 1–6: paling sedikit separuh butir; kelas 7–12: bila gambarnya memang membantu |
| Ragam tipe | jangan semuanya pilihan ganda; pakai `angka`, `urut`, `cocok` bila cocok |

Arti tingkat:

- **mudah** — satu langkah, langsung dari pengertian. Anak yang baru paham pun bisa.
- **sedang** — dua langkah, atau gagasannya dipakai dalam cerita/gambar.
- **sulit** — menalar: menemukan kekeliruan, bekerja mundur, menggabungkan dua
  gagasan. Tetap bisa dikerjakan di kepala atau dengan sedikit coretan, di
  bawah dua menit. Sulit **bukan** berarti angkanya jelek.

## Alat tulis soal (`./alat`)

Semua fungsi menerima:

| Kunci | Isi |
|---|---|
| `tingkat` | `'mudah' \| 'sedang' \| 'sulit'` |
| `tanya` | kalimat soal |
| `petunjuk` | **2–3** petunjuk bertahap; yang pertama tidak boleh membocorkan jawaban |
| `bahas` | pembahasan 1–2 kalimat yang memakai angka soalnya |
| `gambar` | opsional, lihat "Gambar" |

```ts
// Pilihan ganda. Tulis 3–5 pengecoh; yang kembar atau sama dengan jawaban
// benar dibuang otomatis, lalu diambil paling banyak 3. Urutan diacak.
pg({ …, benar: 12, salah: [[14, 'alasan'], [10, 'alasan'], [7, 'alasan']], satuan: 'cm' })

// Jawaban diketik sebagai angka. Desimal memakai KOMA (3,5); pecahan 7/2 juga diterima.
angka({ …, jawab: 3.5, satuan: 'kg', toleransi: 0.01 })

// Pernyataan benar/salah. `alasan` tampil bila anak keliru.
bs({ …, jawab: false, alasan: '…' })

// Isian kata pendek. Tulis semua ejaan yang wajar.
isian({ …, jawab: ['segitiga', 'segi tiga'] })

// Mengurutkan: `langkah` ditulis dalam urutan BENAR (3–5 butir, tidak kembar).
urut({ …, langkah: ['7', '11', '14'] })

// Menjodohkan (3–5 pasang, sisi kiri tidak kembar).
cocok({ …, pasangan: [['segitiga', '3 sisi'], ['segiempat', '4 sisi']] })
```

Catatan penting:

- `benar` dan `salah` pada `pg` boleh **angka**: ditulis otomatis dengan format
  Indonesia (1.250 dan 3,5) dan diberi `satuan`. Pakai angka, bukan teks,
  setiap kali jawabannya bilangan.
- `angka` cocok untuk hasil hitung. Kalau jawabannya desimal tak berhingga
  atau memakai π, minta pembulatan di soal dan beri `toleransi`
  ("bulatkan sampai dua angka di belakang koma" → `toleransi: 0.005`).
- Kelas 1–3: utamakan `pg` bergambar. `angka` boleh untuk bilangan kecil.

## Pembuat soal (fungsi)

```ts
(r) => {
  const a = randInt(r, 7, 9)       // bilangan bulat acak, kedua ujung termasuk
  const b = randInt(r, 4, 6)
  return pg({
    tingkat: 'sedang',
    tanya: `${a} + ${b} = …`,
    benar: a + b,
    salah: [
      [a + b - 1, `Itu menghitung ${a} sebagai langkah pertama.`],
      [a + b + 1, 'Kelebihan satu langkah.'],
      [a + b - 10, 'Puluhannya terlupa.'],
    ],
    petunjuk: [`Buat sepuluh dulu: ${a} perlu ${10 - a} lagi.`, '…'],
    bahas: `${a} + ${10 - a} = 10, lalu 10 + ${b - (10 - a)} = ${a + b}.`,
  })
}
```

Aturan:

1. **Jawaban dihitung dari angka acaknya**, tidak pernah ditulis tangan.
2. `tingkat` tetap untuk semua benih.
3. Semua teks (soal, alasan, petunjuk, pembahasan) memakai angka yang sama
   dengan soalnya. Jangan ada "misalnya 8 + 5" di soal yang angkanya 7 + 6.
4. Rentang acak dipilih supaya **semua** kemungkinan masuk akal: tidak ada
   hasil negatif di SD, pembagian selalu habis bila tidak sedang menguji sisa,
   pecahan tidak berpenyebut nol.
5. Pengecoh harus tetap berbeda dari jawaban benar di **semua** benih. `pg`
   membuang yang kembar, tetapi harus tersisa paling sedikit 2 pengecoh —
   karena itu tulis 4–5 calon bila ada risiko kembar.
6. Alat uji menjalankan tiap fungsi dengan 25 benih. Fungsi yang hanya
   menghasilkan satu-dua ragam ditolak.

Angka di dalam kalimat ditulis dengan `fmt(x)` bila bisa berdesimal atau
ribuan: `fmt(1250)` → "1.250", `fmt(3.5)` → "3,5".

## Bahasa

| Kelas | Panjang soal | Gaya |
|---|---|---|
| 1–3 | ± 15 kata | kalimat pendek, benda sehari-hari, hampir selalu bergambar |
| 4–6 | ± 25 kata | cerita singkat yang wajar, satu pertanyaan jelas |
| 7–9 | ringkas | boleh notasi, tetap satu gagasan per soal |
| 10–12 | ringkas | notasi baku; hindari hitungan panjang |

- Bahasa Indonesia yang akrab untuk anak, tanpa bahasa gaul.
- Satu soal, satu pertanyaan. Tidak ada "manakah pernyataan I, II, III".
- Kata negatif ditulis kapital: "Manakah yang BUKAN …".
- Notasi: `×` `÷` `−` (bukan `x`, `:`, `-`), pangkat `x²` `x³` atau `x^n`,
  akar `√`, `π`, `≤` `≥` `≠`, derajat `°`, pecahan `3/4`.
- Desimal memakai koma: 0,5. Ribuan memakai titik: 12.500.
- Nama tokoh dan benda Indonesia; hindari merek.

## Gambar

Gambar ditulis sebagai spesifikasi ringkas pada kunci `gambar`. Semua jenis dan
contohnya bisa dilihat di aplikasi: `#/gambar-soal`. Tipe lengkapnya ada di
`src/lib/gambar.ts`.

| Jenis | Contoh | Batas |
|---|---|---|
| `benda` | `{ jenis: 'benda', banyak: 7, bentuk: 'apel', warna: 'hi', coret: 2 }` | tiap kelompok ≤ 40 benda |
| `benda` (kelompok) | `{ jenis: 'benda', kelompok: [{ banyak: 5, label: 'A' }, { banyak: 8, label: 'B' }] }` | ≤ 4 kelompok |
| `pola` | `{ jenis: 'pola', isi: ['bulat:a', 'kotak:b', '?'], ujung: ['kiri', 'kanan'] }` | 2–12 ubin; isi boleh teks pendek |
| `blok` | `{ jenis: 'blok', ratusan: 2, puluhan: 4, satuan: 5 }` | ribuan ≤ 5, ratusan ≤ 9 |
| `garis` | `{ jenis: 'garis', dari: 0, sampai: 10, tanda: [7], tanya: [4], lompat: [[2, 5]] }` | ≤ 40 tanda; `langkah`, `label`, `penyebut` opsional |
| `pecahan` | `{ jenis: 'pecahan', isi: [[3, 4]], bentuk: 'lingkaran' }` | 1–4 pecahan `[diarsir, bagian]` |
| `jam` | `{ jenis: 'jam', jam: 7, menit: 30 }` | |
| `batang` | `{ jenis: 'batang', label: ['Apel', 'Jeruk'], nilai: [6, 9], sumbu: 'Banyak buah' }` | 2–8 batang, label pendek |
| `pai` | `{ jenis: 'pai', label: ['A', 'B'], nilai: [75, 25], persen: true }` | 2–8 bagian |
| `tabel` | `{ jenis: 'tabel', kepala: ['Hari', 'Banyak'], baris: [['Senin', 12]] }` | ≤ 5 kolom, ≤ 8 baris |
| `bangun` | `{ jenis: 'bangun', bentuk: 'segitiga', label: { alas: '10 cm', tinggi: '6 cm' } }` | lihat daftar bentuk di bawah |
| `sudut` | `{ jenis: 'sudut', besar: 60, label: '?' }` | 0 < besar < 360 |
| `grafik` | `{ jenis: 'grafik', x: [-4, 4], y: [-2, 8], kurva: [(x) => x * x - 1], titik: [{ x: 2, y: 3, label: 'A' }] }` | `ruas`, `arsir`, `pi` opsional |
| `timbangan` | `{ jenis: 'timbangan', kiri: 'x + 3', kanan: '10', miring: 'seimbang' }` | `miring` = sisi yang TURUN |
| `pita` | `{ jenis: 'pita', petak: true, isi: [{ label: 'Pita A', panjang: 7 }] }` | `mulai + panjang` ≤ `lebar` (bawaan 12) |

Bentuk `bangun` dan kunci labelnya:
`persegi {s}` · `persegi-panjang {p, l}` · `segitiga {alas, tinggi, kiri, kanan}` ·
`segitiga-siku {alas, tegak, miring}` · `jajargenjang {alas, tinggi, miring}` ·
`trapesium {atas, bawah, tinggi}` · `belah-ketupat {d1, d2}` · `layang-layang {d1, d2}` ·
`lingkaran {r}` atau `{d}` · `kubus {s}` · `balok {p, l, t}` · `tabung {r, t}` ·
`kerucut {r, t, s}` · `bola {r}` · `limas {s, t}` · `prisma {alas, tinggi, panjang}`.

Bentuk `benda`: `bulat` `kotak` `segitiga` `bintang` `hati` `apel` `ikan` `balon`.
Warna: `a` ungu, `b` jingga, `ab` hijau, `c` biru, `hi` merah muda.

Aturan gambar:

- **Gambar harus cocok dengan soalnya.** Kalau soal berkata "9 balon, 3 pecah",
  gambarnya `banyak: 9, coret: 3`. Pada pembuat soal, gambar dibuat dari angka
  acak yang sama.
- Gambar `bangun` skematis (tidak berskala); ukurannya ada pada label.
  Bagian yang ditanyakan diberi label `'?'`.
- Jangan sampai gambarnya membocorkan jawaban yang seharusnya dihitung
  (mis. `batang` dengan `angka: true` pada soal "baca diagram").
- Kalau tidak ada jenis gambar yang pas, lebih baik soal tanpa gambar daripada
  gambar yang dipaksakan.

## Ketepatan — periksa sendiri sebelum selesai

Untuk **setiap** butir:

1. Kerjakan soalnya dari awal tanpa melihat kunci. Hasilnya sama?
2. Adakah pengecoh yang ternyata juga benar, atau benar dalam tafsir lain?
3. Apakah soalnya punya tepat satu jawaban? Informasinya cukup dan tidak
   berlebihan?
4. Apakah pembahasan dan petunjuk memakai angka yang benar?
5. Pada pembuat soal: coba di kepala nilai terkecil dan terbesar rentangnya.
6. Satuan, pembulatan, dan format angka sudah benar?

## Uji

```bash
node scripts/uji-soal.mjs --berkas kelas-N      # satu berkas
node scripts/uji-soal.mjs                        # semua berkas + cakupan
npx tsc -b
```

Harus berakhir **0 fatal, 0 serius**. Alat uji memeriksa: id topik, jumlah dan
tingkat butir, bentuk soal, kunci jawaban (dinilai penilai yang sama dengan
aplikasi), pilihan kembar, 25 benih tiap pembuat soal, dan render tiap gambar.
Alat uji **tidak bisa** memeriksa benar-tidaknya matematika soal tetap — itu
tanggung jawab penulis dan pemeriksa.
