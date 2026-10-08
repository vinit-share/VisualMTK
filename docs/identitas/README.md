# Handoff: Identitas Visual MTK — ikon "Puzzle Operator" + palet "Indigo cerah & kuning lemon"

## Overview
Ikon/logo dan sistem warna baru untuk **Visual MTK**, aplikasi web belajar matematika visual (kelas 1 SD–12 SMA). Tagline: "Jangan cuma hafal. Lihat kenapa." Paket ini berisi ikon final (SVG), token warna lengkap tema terang & gelap, dan file referensi desain. Seluruh warna aplikasi diganti mengikuti palet ini.

## About the Design Files
File di paket ini adalah **referensi desain yang dibuat dengan HTML** — prototipe yang menunjukkan tampilan yang dimaksud, bukan kode produksi untuk disalin. Tugasnya adalah **menerapkan desain ini di lingkungan codebase Visual MTK yang sudah ada** (framework, pola komponen, sistem styling yang dipakai), atau bila belum ada, memilih framework yang paling tepat. Pengecualian: `assets/*.svg`, `tokens.css`, dan `tokens.json` adalah aset final dan boleh dipakai langsung.

## Fidelity
**High-fidelity.** Bentuk ikon, warna hex, dan font sudah final. Terapkan persis.

## Ikon
Konsep: empat operator **+ − % ×** tersusun 2×2 seperti kepingan puzzle — anak ikut menyusun perhitungan, bukan cuma menerima jawaban.

- Kisi 32×32. Garis paling tipis 2.2 unit (≥2 px pada 32 px).
- Maks. 3 warna: latar ubin `#6445df`, + dan × `#fffaf2`, − `#e0c931` (lemon), % `#65e0e7` (biru langit/mint).
- Kuadran (pusat): + (10,10) · − (22,10) · % (10,22) · × (22,22).
  - + : dua bilah 8.5×2.5, rx 1.25.
  - − : bilah 8.5×2.5, rx 1.25.
  - % : dua lingkaran r 1.7 di (7.3,19.3) dan (12.7,24.7) + garis (13,19)→(7,25), lebar 2.2, ujung bulat.
  - × : garis (19,19)→(25,25) dan (25,19)→(19,25), lebar 2.5, ujung bulat.
- Ubin favicon: persegi membulat rx 7.5 (dari 32).

### File aset (`assets/`)
| File | Pakai untuk |
|---|---|
| `favicon.svg` | `<link rel="icon" type="image/svg+xml">`; render juga ke PNG 16/32/48 untuk favicon.ico |
| `icon-app.svg` | apple-touch-icon 180 px, ikon PWA 192/512 (`purpose: "any"`). Glif diskala 0.8 |
| `icon-maskable.svg` | ikon PWA `purpose: "maskable"` 192/512. Latar penuh, glif diskala 0.62 → seluruhnya di dalam lingkaran aman 80% |
| `icon-mono.svg` | versi satu warna (`currentColor`): Safari pinned tab, cetak, cap air |

Ikon bekerja di atas `#faf8f4` dan `#0d0f16` tanpa perubahan.

### Lockup
Ikon + wordmark **"Visual" + "MTK"** (tanpa spasi), Plus Jakarta Sans 800, letter-spacing −0.025em. "Visual" = `--vm-text-1`; "MTK" = `--vm-brand` (terang `#6445df`, gelap sesuai tabel). Tinggi ikon ≈ 1.4× tinggi huruf kapital; jarak ikon–teks ≈ 0.3× tinggi ikon. Di bilah atas: ikon 28 px, wordmark 18 px, gap 9 px.

## Tipografi
- UI & wordmark: **Plus Jakarta Sans** (400–800).
- Rumus & angka: **Newsreader** italic.

## Design Tokens
Semua token ada di `tokens.css` (CSS variables; tema terang di `:root`/`[data-theme="light"]`, gelap di `[data-theme="dark"]`) dan `tokens.json`. Tema gelap bukan inversi: brand lebih terang & sedikit desaturasi, latar lembut gelap bernuansa brand, teks di brand menjadi gelap.

### Brand
| Token | Terang | Gelap | Kontras (terang / gelap) |
|---|---|---|---|
| --vm-brand | `#6445df` | `#968cff` | 5.9:1 / 6.9:1 vs on-brand |
| --vm-brand-hover | `#552fca` | `#a9a5fd` | 7.7:1 / 8.7:1 vs on-brand |
| --vm-brand-ink | `#4527a5` | `#cbcbff` | 9.1:1 / 11.0:1 vs soft-1 |
| --vm-brand-soft-1 | `#f2f2fe` | `#1b1933` | |
| --vm-brand-soft-2 | `#e3e3ff` | `#28254c` | |
| --vm-on-brand | `#fefcf7` | `#0e0d1c` | |

### Netral
| Token | Terang | Gelap | Kontras vs bg |
|---|---|---|---|
| --vm-bg | `#faf8f4` | `#0d0f16` | |
| --vm-surface-1 | `#fefdfb` | `#131319` | |
| --vm-surface-2 | `#f7f5f1` | `#1c1c24` | |
| --vm-surface-3 | `#eeebe5` | `#282832` | |
| --vm-text-1 | `#1e1e29` | `#f1eee9` | 15.6:1 / 16.5:1 |
| --vm-text-2 | `#4c4c58` | `#bdbdc5` | 8.0:1 / 10.3:1 |
| --vm-text-3 | `#6a6b75` | `#9797a1` | 5.0:1 / 6.6:1 |
| --vm-border | `#dedad3` | `#34343d` | |

### Peran matematika (dipakai bersamaan dalam satu gambar)
| Peran | Token | Terang main / ink / soft | Gelap main / ink / soft | Kontras ink vs soft |
|---|---|---|---|---|
| role-1 (besaran pertama) | `--vm-quantity-1` (+ `-ink`, `-soft`) | `#634cd4` / `#49379f` / `#eeeeff` | `#7e70ec` / `#cbcbfe` / `#211f40` | 7.9:1 / 10.1:1 |
| role-2 (besaran kedua) | `--vm-quantity-2` (+ `-ink`, `-soft`) | `#ea8a18` / `#713f03` / `#feeddf` | `#feb16a` / `#f8c69b` / `#341e09` | 7.6:1 / 10.1:1 |
| role-3 (interaksi) | `--vm-interaction` (+ `-ink`, `-soft`) | `#1ea28f` / `#015a4f` / `#e1f5f1` | `#5abfad` / `#aaddd2` / `#102925` | 7.2:1 / 10.2:1 |
| role-4 (hasil) | `--vm-result` (+ `-ink`, `-soft`) | `#4cb0e5` / `#055475` / `#e1f3fe` | `#7ccffe` / `#abd8f3` / `#112733` | 7.3:1 / 10.2:1 |
| role-5 (sorotan aha) | `--vm-aha` (+ `-ink`, `-soft`) | `#d8559b` / `#822058` / `#feeaf2` | `#f47cb9` / `#febad9` / `#371828` | 8.0:1 / 10.0:1 |

### Domain materi
| Domain | Token | Terang | Gelap |
|---|---|---|---|
| Bilangan | `--vm-domain-bilangan` | `#ea8a18` | `#feb16a` |
| Aljabar | `--vm-domain-aljabar` | `#634cd4` | `#7e70ec` |
| Pengukuran | `--vm-domain-pengukuran` | `#1ea28f` | `#5abfad` |
| Geometri | `--vm-domain-geometri` | `#4cb0e5` | `#7ccffe` |
| Data & Peluang | `--vm-domain-data-peluang` | `#d8559b` | `#f47cb9` |
| Kalkulus | `--vm-domain-kalkulus` | `#5e9f50` | `#87c47a` |

### Makna / status
| Makna | Token | Terang main / ink / soft | Gelap main / ink / soft |
|---|---|---|---|
| Benar (tenang) | `--vm-success` | `#388567` / `#17543e` / `#e5f5ed` | `#72b598` / `#b1ddc8` / `#142920` |
| Belum tepat (hangat, bukan merah) | `--vm-not-yet` | `#c77618` / `#6a3a02` / `#ffedde` | `#f8aa64` / `#fac598` / `#351e08` |
| Galat | `--vm-error` | `#c53637` / `#84171b` / `#ffebe9` | `#f6736c` / `#ffbfb8` / `#3d1614` |
| Bintang penghargaan | `--vm-star` | `#c2ac00` | `#e2cc47` |

### Aturan pemakaian
- Teks berwarna selalu memakai varian **ink** di atas varian **soft** (atau di atas bg/surface); varian **main** hanya untuk isian bentuk, titik, garis, dan tombol.
- Tombol utama: bg `--vm-brand`, teks `--vm-on-brand`, hover `--vm-brand-hover`, radius penuh (999px), padding 10×18, 14px/700.
- Tombol sekunder: bg `--vm-brand-soft-2`, teks `--vm-brand-ink`.
- Chip domain: bg `*-soft`, teks `*-ink`, titik 8px `*-main`, radius 999px, padding 5×10, 12px/600.
- Pesan "tepat": bg `--vm-success-soft`, teks `--vm-success-ink`. Pesan "belum tepat": `--vm-not-yet-soft` / `--vm-not-yet-ink` — sengaja amber, bukan merah. `--vm-error` hanya untuk galat sistem.
- Gambar matematika: kelima warna peran boleh muncul bersamaan. Contoh (a+b)²: a² = quantity-1, b² = quantity-2, ab = interaction, bingkai = result, sorotan pada 2ab = aha. Selain warna, bedakan juga lewat label/garis (tetap terbaca untuk buta warna merah-hijau; lihat panel simulasi di file referensi).

## Interactions & Behavior
Paket ini tidak berisi alur layar. Bingkai animasi pembuka (keping berserakan → + − % terpasang → × mendekat → ikon) ada di bagian 6 file referensi; durasi/easing belum ditetapkan.

## Files
- `Visual MTK Ikon Eksplorasi.dc.html` + `support.js` — papan referensi (buka langsung di peramban): ikon besar, deret ukuran, monokrom, maskable, lockup, konteks (tab, bilah atas, layar ponsel), bingkai animasi, palet, dan contoh UI kedua tema.
- `tokens.css`, `tokens.json` — token warna.
- `assets/` — SVG ikon.
