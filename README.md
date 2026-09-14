# Visual MTK

**Jangan cuma hafal. Lihat kenapa.**

Aplikasi web untuk belajar matematika secara visual dan interaktif, untuk siswa
SD sampai SMA di Indonesia. Setiap rumus dibongkar sampai kelihatan dari mana
asalnya — lalu anak sendiri yang memainkannya.

Tanpa akun, tanpa server, tanpa basis data. Semuanya berjalan di peramban.

---

## Gagasan produk

Banyak siswa hafal `L = πr²` tetapi tidak tahu kenapa ada π di situ. Visual MTK
membalik urutan yang biasa dipakai di sekolah:

| Urutan biasa | Urutan Visual MTK |
|---|---|
| rumus → hafalkan → soal | **lihat → mainkan → pahami → baru rumus** |

Setiap konsep selalu melewati tahap yang sama:

1. **Tebak dulu** — anak memprediksi sebelum apa pun dijelaskan.
2. **Bongkar rumus** — animasi bertahap yang memperlihatkan rumus *terbentuk*.
3. **Eksperimen** — penggeser bebas; temuan berubah mengikuti angkanya.
4. **Penjelasan bertingkat** — versi SD, SMP, dan SMA untuk konsep yang sama.
5. **Rumus interaktif** — sentuh bagian rumus, objek pada gambar ikut menyala.
6. **Coba sendiri** — soal dengan petunjuk bertahap dan diagnosa kesalahan.

---

## Menjalankan

```bash
npm install
npm run dev
```

Perintah lain:

```bash
npm run periksa   # pemeriksaan tipe + uji seluruh modul konsep (wajib lulus)
npm run build     # bundel produksi ke dist/
npm run preview   # jalankan hasil build
```

`npm run uji:konsep` memeriksa setiap modul konsep: bentuk datanya, kunci
jawaban setiap soal (termasuk menjalankan generator parametrik dengan 12 benih
berbeda), kelengkapan petunjuk dan diagnosa, serta merender seluruh visualnya
pada ratusan kombinasi langkah dan nilai penggeser untuk memastikan tidak ada
NaN yang bocor ke atribut SVG.

Rutenya memakai `HashRouter`, jadi hasil `npm run build` bisa langsung
di-hosting statis di mana saja (GitHub Pages, Netlify, Vercel, atau folder biasa
di server) tanpa konfigurasi tambahan.

---

## Tumpukan teknologi

- **Vite + React 19 + TypeScript** — tanpa backend.
- **CSS biasa** dengan token di `src/styles/tokens.css`. Tidak memakai Tailwind
  atau pustaka UI.
- **Animasi sendiri** di `src/lib/anim.ts` (`useTimeline`, `useTween`, `fase`,
  `seg`). Tidak ada pustaka animasi.
- **Seluruh visualisasi digambar dengan SVG** — tidak ada pustaka grafik.
- **Kemajuan belajar** disimpan di `localStorage` lewat `src/lib/store.ts`.

Dependensi runtime hanya `react`, `react-dom`, `react-router-dom`, dan dua
paket font. Itu saja.

---

## Peta berkas

| Berkas | Isi |
|---|---|
| `src/lib/types.ts` | Model konten: `Konsep`, `DeriveScene`, `Soal`, `Topic` |
| `src/lib/anim.ts` | `useTimeline`, `useTween`, `fase`, `seg`, `useReducedMotion` |
| `src/lib/store.ts` | Kemajuan, streak, dan model penguasaan |
| `src/lib/num.ts` | Format angka Indonesia, acak berbenih, util pecahan |
| `src/lib/sesi.ts` | Penyusun sesi latihan soal |
| `src/components/Bongkar.tsx` | Mesin "Rumus → Bongkar" (fitur khas) |
| `src/components/Formula.tsx` | Rumus interaktif + `SorotProvider` |
| `src/components/Stage.tsx` | `Svg`, `Tag`, `Dimensi`, `SikuSiku` |
| `src/components/SoalView.tsx` | Penyaji soal + petunjuk bertahap |
| `src/concepts/*.tsx` | Satu berkas per konsep, ditemukan otomatis |
| `src/data/katalog.ts` | Katalog konsep (metadata dibuat dari modulnya) |
| `src/data/kurikulum.ts` | Pembagian kelas, jalur konsep, pemuat rincian |
| `src/data/kurikulum/ringkas.generated.ts` | Seluruh topik kelas 1–12, bentuk ringkas |
| `src/data/kurikulum/kelas-N.generated.ts` | Rincian satu kelas, dimuat malas |
| `docs/PANDUAN-KONSEP.md` | Kontrak penulisan konsep baru |
| `docs/riset/` | Hasil riset Capaian Pembelajaran beserta sumbernya |

---

## Kurikulum

Peta materi disusun dari **Capaian Pembelajaran resmi**: Keputusan Kepala BSKAP
Kemendikdasmen Nomor 046/H/KR/2025, Lampiran II (Matematika dan Matematika
Tingkat Lanjut). Struktur fase A–F beserta elemen Bilangan, Aljabar, Pengukuran,
Geometri, Analisis Data dan Peluang, serta Kalkulus mengikuti dokumen tersebut.

Hasil riset mentahnya tersimpan di `docs/riset/` lengkap dengan daftar sumber
yang benar-benar dibaca. Berkas di `src/data/kurikulum/` dibangun darinya:

```bash
npm run bangun          # kurikulum + katalog
```

Jangan menyunting berkas `*.generated.ts` dengan tangan.

---

## Menambah konsep baru

1. Baca `docs/PANDUAN-KONSEP.md` — itu kontraknya.
2. Lihat `src/concepts/segitiga-setengah.tsx` sebagai acuan kualitas.
3. Buat berkas `src/concepts/<id>.tsx` dengan `export default` bertipe `Konsep`.
4. Tautkan konsepnya ke topik kurikulum pada tabel `KONSEP_DI_TOPIK` di
   `scripts/bangun-kurikulum.mjs`, lalu jalankan `npm run bangun` — tautan
   kurikulum dan metadata galeri dibuat ulang dari modulmu.
5. Tambahkan label jenis visualisasinya pada peta `VISUAL` di `src/data/katalog.ts`.
6. Jalankan `npm run periksa` — pemeriksaan tipe dan uji modul harus lolos.

Tidak perlu mendaftarkan berkasnya di mana pun — `src/concepts/registry.ts`
menemukannya sendiri lewat `import.meta.glob`, dan modulnya baru dimuat ketika
konsepnya dibuka.

**Aturan yang tidak bisa ditawar:** akurasi matematika di atas keindahan visual.
Kalau sebuah metafora punya batas, batas itu harus disebutkan.

---

## Aksesibilitas

- Menghormati `prefers-reduced-motion`: animasi penjelasan berubah menjadi
  transisi instan.
- Seluruh kendali dapat dijangkau dengan papan ketik; mesin bongkar mendukung
  tombol panah dan spasi.
- Warna tidak pernah menjadi satu-satunya pembeda — selalu disertai label,
  bentuk, atau pola garis.
- Tema terang dan gelap, mengikuti setelan sistem atau dipilih sendiri.
- Setiap gambar SVG memiliki label untuk pembaca layar.

---

## Privasi

Tidak ada akun, tidak ada pelacakan, tidak ada data yang dikirim ke mana pun.
Kemajuan belajar disimpan di `localStorage` peramban pengguna dan bisa dihapus
kapan saja lewat halaman Progres.
