# Visual MTK

Aplikasi web belajar matematika visual untuk siswa SD–SMA Indonesia.
Tagline: **"Jangan cuma hafal. Lihat kenapa."**

Prinsip produk: `visual → interaksi → eksperimen → penjelasan → baru rumus`.
Rumus tidak pernah muncul lebih dulu.

## Tumpukan teknologi

- Vite + React 19 + TypeScript, tanpa backend dan tanpa basis data.
- Rute: `react-router-dom` dengan **HashRouter** (agar bisa di-hosting statis
  di mana saja).
- Gaya: CSS biasa dengan token di `src/styles/tokens.css`. **Tidak memakai
  Tailwind atau pustaka UI.**
- Animasi: hook sendiri di `src/lib/anim.ts`. **Tidak ada pustaka animasi.**
- Kemajuan belajar: `localStorage` lewat `src/lib/store.ts`.

Jangan menambah dependensi npm tanpa alasan kuat.

## Peta berkas

| Berkas | Isi |
|---|---|
| `src/lib/types.ts` | Model konten (`Konsep`, `DeriveScene`, `Soal`, `Topic`) |
| `src/lib/anim.ts` | `useTimeline`, `useTween`, `fase`, `seg`, `useReducedMotion` |
| `src/lib/store.ts` | Kemajuan, streak, status penguasaan |
| `src/lib/num.ts` | Format angka Indonesia, acak berbenih, util |
| `src/lib/sesi.ts` | Penyusun sesi latihan soal |
| `src/components/Bongkar.tsx` | Mesin "Rumus → Bongkar" (fitur khas) |
| `src/components/Formula.tsx` | Rumus interaktif + `SorotProvider` |
| `src/components/Interaksi.tsx` | Interaksi langsung: `Pegangan`, `RelGeser`, `useSeret`, kontrol angka, layar penuh |
| `src/components/Stage.tsx` | `Svg`, `Tag`, `Dimensi`, `SikuSiku`, `tinta()` |
| `src/components/SoalView.tsx` | Penyaji soal + petunjuk bertahap |
| `src/components/SesiSoal.tsx` | Menjalankan sederet soal, rekap, dan `Bintang` |
| `src/components/GambarSoal.tsx` | Gambar pada soal dari spesifikasi ringkas (`src/lib/gambar.ts`) |
| `src/components/PitaGulir.tsx` | Daftar mendatar dengan tepi memudar dan tombol panah |
| `src/visuals/GambarKonsep.tsx` | Gambar sampul tiap konsep (galeri Kenapa?, rak Eksperimen) |
| `src/visuals/GambarTopik.tsx` | Glif topik, dipilih dari kata kunci judul, berwarna per domain |
| `src/concepts/*.tsx` | Satu berkas per konsep, ditemukan otomatis |
| `src/data/katalog.ts` | Katalog konsep; judul/pertanyaan/tagline dibuat dari modulnya |
| `src/data/kurikulum.ts` | Pembagian kelas, jalur konsep, `muatKelas()`, urutan topik |
| `src/data/kurikulum/*.generated.ts` | Data topik hasil riset (jangan disunting tangan) |
| `src/data/soal/kelas-*.ts` | Bank soal tes topik; alat tulisnya di `src/data/soal/alat.ts` |
| `src/data/soalTopik.ts` | Pemuat bank soal dan penyusun tes topik |
| `src/styles/tokens.css` | Token warna, ruang, tipografi (satu-satunya tempat nilai hex) |
| `public/*.svg`, `scripts/render-icons.ps1` | Ikon "Puzzle Operator" dan perender PNG/ICO-nya |

## Warna dan identitas

Palet "Indigo cerah & kuning lemon" diturunkan dari ikon "Puzzle Operator"
(+ − % × di ubin indigo). Semua warna lewat token di `src/styles/tokens.css`;
nilai aslinya dari perancang tersimpan di `docs/identitas/`.

- **Tulisan berwarna memakai varian `-ink`** (`--m-b-ink`, `--teal-ink`, …) di
  atas `-soft` atau permukaan. Varian utama (`--m-b`, `--teal`) hanya untuk
  isian bentuk, titik, garis, dan tombol — kontrasnya tidak cukup untuk teks.
  `Tag` sudah memetakannya sendiri; untuk `<text>` mentah pakai `tinta(warna)`.
- Benar = `--ok`, belum tepat = `--belum` (sengaja hangat, bukan merah),
  galat sistem = `--rose`, bintang = `--bintang`.
- Warna domain materi diatur lewat atribut `data-domain` (`jelajah.css`).
- Warna ikon (`--ikon-*`) tetap sama di tema terang dan gelap.

## Menambah konsep

Baca `docs/PANDUAN-KONSEP.md` dan `docs/PANDUAN-INTERAKSI.md` lebih dulu.
Acuan kualitas: `src/concepts/segitiga-setengah.tsx`; acuan interaksi langsung:
`src/concepts/lingkaran-luas.tsx`.

Angka dalam visual diubah **langsung dari gambar** (seret, rel, tombol di dalam
gambar), bukan lewat formulir di bawahnya. Setiap visual punya tata letak lebar
dan tegak untuk HP (`useSempit()`).

## Bahasa

Seluruh teks yang dilihat pengguna, nama variabel domain, dan komentar kode
ditulis dalam bahasa Indonesia.

## Perintah

```bash
npm run dev       # server pengembangan
npm run periksa   # pemeriksaan tipe + uji modul konsep (wajib lulus)
npm run bangun    # bangun ulang data kurikulum dan katalog
npm run build     # bundel produksi
```
