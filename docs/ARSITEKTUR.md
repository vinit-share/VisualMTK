# Arsitektur produk & sistem desain — Visual MTK

Dokumen ini menjelaskan keputusan yang mendasari aplikasi: bagaimana kontennya
disusun, bagaimana alur belajarnya dirancang, dan aturan desain apa yang dipakai.

---

## 1. Keputusan pokok

| Keputusan | Alasan |
|---|---|
| Tanpa backend, tanpa akun | Prioritasnya konten dan pengalaman belajar, bukan kerumitan teknis. Anak bisa langsung memakai tanpa hambatan pendaftaran. |
| `HashRouter` | Hasil build bisa di-hosting statis di mana pun tanpa konfigurasi server. |
| CSS biasa dengan token | Kontrol penuh atas tampilan, muatan kecil, dan visualisasi SVG bisa memakai token warna yang sama persis dengan UI. |
| Animasi sendiri (`requestAnimationFrame`) | Animasi di sini bertugas menjelaskan, bukan menghias. API-nya perlu berbentuk "langkah dengan kemajuan 0..1", bukan "transisi antar keadaan". |
| Seluruh visual berupa SVG | Tajam di semua ukuran layar, ringan, bisa diberi label untuk pembaca layar, dan mengikuti tema terang/gelap lewat `currentColor` dan variabel CSS. |
| Modul konsep dimuat malas | Muatan awal tetap ringan walaupun jumlah konsep terus bertambah. |

---

## 2. Arsitektur informasi

Navigasi sengaja hanya lima tujuan, semuanya kata kerja:

```
Beranda
├── Belajar      → ubin kelas 1–12 → ubin topik per kelas → halaman topik + tes
├── Kenapa?      → galeri pertanyaan bergambar → halaman konsep
├── Eksperimen   → rak eksperimen bergambar → pemutar satu eksperimen
├── Tes          → sesi latihan soal
└── Progres      → status penguasaan, lencana, pengaturan
```

Dua halaman pendukung: **Tantangan Harian** (`/harian`) dan **Peta Pengetahuan**
(`/peta`).

Beranda tidak menampilkan daftar materi yang panjang. Ia menjawab satu
pertanyaan: *"aku harus mulai dari mana?"* — lewat empat pintu masuk, kartu
"lanjutkan belajar", dan satu visual interaktif yang langsung bisa digeser.

---

## 3. Arsitektur konten

Ada tiga lapis data yang sengaja dipisahkan.

### Lapis 1 — Peta kurikulum (`src/data/kurikulum/`)

Daftar topik kelas 1–12 hasil riset Capaian Pembelajaran resmi. Setiap topik
memuat subkonsep, rumus kunci, prasyarat, miskonsepsi umum, dan pertanyaan
"kenapa". Dihasilkan otomatis dari `docs/riset/` dan **tidak** disunting dengan
tangan.

Datanya dipecah dua supaya halaman tidak memuat yang tidak dipakai:

- `ringkas.generated.ts` — seluruh topik tanpa teks panjang (±14 KB gzip).
  Cukup untuk daftar kelas, peta pengetahuan, dan penamaan prasyarat.
- `kelas-N.generated.ts` — rincian satu kelas (6–20 KB gzip), dimuat malas
  lewat `muatKelas(n)` hanya ketika kelas itu dibuka.

Sebelum dipecah, membuka satu halaman kelas menarik 110 KB gzip data seluruh
jenjang. Sekarang ±20–34 KB.

### Lapis 2 — Katalog konsep (`src/data/katalog.ts`)

Metadata ringan tiap modul konsep interaktif: judul, pertanyaan, tagline, tag,
jenis visualisasi. Cukup untuk galeri, pencarian, dan tautan antar konsep —
tanpa perlu memuat modulnya.

`topicId` dan `kelas` diambil dari `tautan.generated.ts` supaya tidak pernah
melenceng dari peta kurikulum.

### Lapis 3 — Modul konsep (`src/concepts/*.tsx`)

Isi berat: komponen visual, langkah animasi, penjelasan bertingkat, dan soal.
Satu berkas per konsep, ditemukan otomatis oleh `registry.ts` lewat
`import.meta.glob`, dan dimuat hanya ketika dibuka.

Pemisahan ini berarti menambah konsep baru tidak menambah muatan awal aplikasi
sama sekali.

---

## 4. Alur belajar satu konsep

Urutan pada `KonsepPage` dipaksakan dan sama untuk semua konsep:

```
pertanyaan pemancing
   ↓
1. Tebak dulu          predict-then-observe: menebak lebih dulu membuat
   ↓                   penjelasan berikutnya jauh lebih menempel
2. Bongkar rumus       animasi bertahap; rumus TERBENTUK di depan mata
   ↓
3. Eksperimen          parameter bebas; "temuan" berubah mengikuti angka
   ↓
4. Penjelasan          tiga kedalaman: SD / SMP / SMA
   ↓
5. Rumus interaktif    sentuh bagian rumus → objek pada gambar menyala
   ↓
6. Coba sendiri        soal dengan petunjuk bertahap
   ↓
7. "Aku sudah paham"
```

Rumus formal tidak pernah muncul sebelum tahap 5. Kalaupun ada rumus di tahap
sebelumnya, bentuknya adalah pernyataan tentang apa yang sedang terlihat
(mis. `alas = a · tinggi = t`), bukan rumus akhir.

### Mesin "Rumus → Bongkar"

Fitur khas aplikasi, diimplementasikan sekali di `src/components/Bongkar.tsx`
dan dipakai ulang semua konsep. Sebuah konsep hanya menyediakan:

- daftar langkah (judul, narasi, rumus, durasi),
- komponen `Visual` yang menggambar keadaan `{ step, t, p, sorot }`.

Judul, narasi, dan rumus langkah boleh berupa fungsi dari nilai penggeser
(`(p) => string`). Penggeser tampil di semua langkah, jadi teks yang menyebut
angka dari gambar harus ikut berubah — kalau tidak, narasi dan gambar bisa
menyebut dua angka berbeda untuk hal yang sama.

Sisanya — pemutar, rel langkah, penggeser parameter, dukungan papan ketik,
`prefers-reduced-motion` — ditangani mesinnya.

Aturan penting: komponen `Visual` harus menggambar dengan benar untuk
**sembarang** kombinasi `(step, t)`, karena pengguna bisa melompat ke langkah
mana pun. Dua pembantu di `src/lib/anim.ts` menjaga hal itu:

- `fase(step, t, target)` — 1 bila langkah target sudah lewat, 0 bila belum, `t` bila sedang berjalan;
- `seg(t, a, b)` — potongan `t` di antara `a`..`b`, untuk mengurutkan beberapa gerakan dalam satu langkah.

### Interaksi langsung

Angka di dalam visual tidak diubah lewat formulir di bawah gambar, melainkan
dengan memegang objeknya: menyeret puncak segitiga, memutar titik pada lingkaran
satuan, merentangkan sisi persegi, menggeser garis pembagi pecahan, mengambil
bola dari timbangan. Mesinnya ada di `src/components/Interaksi.tsx`:

| Bagian | Tugas |
|---|---|
| `Pegangan` | titik seret di dalam SVG; area sentuh selalu ±52 px, mendukung papan ketik, dan memberi label nilai di dekat jari |
| `RelGeser`, `TombolGambar` | kontrol yang tetap digambar di dalam gambar, dekat objek yang diubahnya |
| `useSeret` | interaksi khusus (mengambil benda, menggeser pembatas) |
| `useKendali` | satu sumber nilai; perubahan lewat tombol atau ketikan dianimasikan, seretan mengikuti jari tanpa jeda |
| `BilahAngka` | kontrol cadangan `− r = 5 +` yang bisa diketik; di HP hanya angka yang sedang dipegang yang tampil |
| `useModeFokus` | panggung layar penuh, keluar dengan Esc |

Setiap visual punya dua sistem koordinat: lebar untuk layar besar, dan tegak
untuk HP (`useSempit()`), sehingga di layar sempit bentuknya digambar lebih
besar, bukan tata letak lebar yang dikecilkan. Gerbang kualitasnya ada di
`npm run periksa`: setiap visual dirender pada kedua tata letak, dan uji gagal
bila ada penggeser yang tidak punya pegangan di gambar.

Kontraknya: `docs/PANDUAN-INTERAKSI.md`.

### Rumus interaktif

Markup `"[luas:L] = [setengah:½] × [alas:a] × [tinggi:t]"` diurai menjadi token
yang bisa disorot. `SorotProvider` membagikan id bagian yang sedang disentuh ke
komponen visual, sehingga rumus dan gambar tidak pernah menjadi dua hal terpisah.

---

## 5. Sistem asesmen

Enam tipe soal: `pilihan`, `angka`, `benar-salah`, `urutkan`, `cocokkan`,
`isian`. Soal boleh berupa objek tetap atau **generator parametrik**
`(rnd) => Soal` sehingga angkanya berganti tiap sesi tetapi tetap "cantik".

Yang membedakan dari kuis biasa:

- **Petunjuk bertahap.** Tiga tingkat: mengarahkan perhatian → memberi langkah
  antara → hampir sampai. Petunjuk muncul otomatis begitu jawaban meleset.
- **Diagnosa distraktor.** Setiap pengecoh pilihan ganda menyebutkan kesalahan
  berpikir spesifik yang menghasilkan pilihan itu — bukan sekadar "salah".
- **Tautan "Lihat kenapa".** Setiap soal menunjuk kembali ke konsep visualnya.
- **Salah tidak menghentikan.** Jawaban dinilai sekali untuk kemajuan, tetapi
  pengguna boleh mencoba lagi sebanyak yang ia mau.

Penyusun sesi (`src/lib/sesi.ts`) mengambil soal dari modul konsep yang sesuai
saringan kelas dan tingkat kesulitan, sehingga latihan selalu sejalan dengan
penjelasan visualnya. Tantangan harian memakai benih tetap dari tanggal, jadi
soalnya sama untuk semua orang sepanjang hari itu.

### Tes per topik

Setiap topik kurikulum punya halaman sendiri (`/topik/:id`) dengan satu ajakan:
"Mulai tes". Tes berisi lima soal dari mudah ke sulit, disusun
`susunTesTopik()` (`src/data/soalTopik.ts`) dari **bank soal topik** di
`src/data/soal/kelas-*.ts`, ditambah paling banyak dua soal dari modul konsep
yang tertaut. Bank dimuat malas per kelas.

Soal bank ditulis sebagai data lewat alat di `src/data/soal/alat.ts` (`pg`,
`angka`, `bs`, `isian`, `urut`, `cocok`) dan boleh bergambar: gambar dinyatakan
sebagai spesifikasi ringkas (`src/lib/gambar.ts`) yang digambar
`GambarSoal`. Kontrak penulisannya ada di `docs/PANDUAN-SOAL-TOPIK.md`, dan
`scripts/uji-soal.mjs` menguji bentuk, kunci jawaban, dan gambar tiap butir.

Hasil tes berupa bintang (0–3), bukan angka rapor, dan selalu boleh diulang.

---

## 6. Sistem kemajuan

Status penguasaan sengaja tidak diberikan hanya karena halaman dibuka:

| Status | Syarat |
|---|---|
| Belum mulai | — |
| Sedang belajar | konsep pernah dibuka |
| Sudah paham | animasi bongkar dituntaskan **dan** (menyatakan paham atau menjawab benar ≥ 3 kali) |
| Dikuasai | sudah paham, ketepatan 10 jawaban terakhir ≥ 80% dengan minimal 5 jawaban, **dan** benar pada 2 hari berbeda |

Syarat "dua hari berbeda" adalah inti perbedaannya: yang dirayakan adalah
pemahaman yang bertahan, bukan hafalan sesaat.

Semua tersimpan di `localStorage` lewat store kecil berbasis
`useSyncExternalStore` — tanpa Provider, tanpa render ulang berlebihan.

---

## 7. Sistem desain

### Tipografi

- **Plus Jakarta Sans** untuk antarmuka — huruf rancangan Indonesia, ramah tetapi
  tetap terlihat dewasa.
- **Newsreader** untuk rumus dan angka — serif dengan italic yang membuat
  variabel matematika terbaca sebagaimana mestinya.

Skala tipe memakai `clamp()` sehingga judul mengecil mulus di layar sempit tanpa
perlu titik henti tambahan.

### Warna

Token didefinisikan di `src/styles/tokens.css`, lengkap untuk tema terang dan
gelap. Selain warna antarmuka, ada **peran warna matematika** yang dipakai
konsisten di seluruh visualisasi:

| Token | Arti |
|---|---|
| `--m-a` | besaran pertama (a, alas, jari-jari) |
| `--m-b` | besaran kedua (b, tinggi) |
| `--m-ab` | hasil interaksi keduanya (ab, luas) |
| `--m-c` | hasil atau resultan (c) |
| `--m-hi` | sorotan "aha" |

Karena konsisten, anak yang berpindah dari satu konsep ke konsep lain langsung
mengenali peran tiap warna. Dan karena semuanya token, seluruh visualisasi
otomatis benar di tema gelap.

Paletnya — "Indigo cerah & kuning lemon" — diturunkan dari ikon aplikasi dan
tersusun dalam keluarga bertiga: warna utama, `-ink`, dan `-soft`. Spesifikasi
asli dari perancang (ikon, lockup, tabel token, aturan pakai) disimpan di
`docs/identitas/`.

| Keluarga | Dipakai untuk |
|---|---|
| `--brand` | tombol utama, tautan aktif, peran "plain" |
| `--m-a`, `--amber`, `--teal`, `--blue`, `--pink` | lima peran matematika (a, b, ab, c, hi) |
| `--green` | domain Kalkulus |
| `--ok` | jawaban benar, status "sudah paham" — hijau tenang |
| `--belum` | jawaban belum tepat, status "sedang belajar" — hangat, sengaja bukan merah |
| `--rose` | galat sistem saja |
| `--bintang` | bintang tes topik (`--bintang-tepi` untuk garis tepinya) |

Aturan pakainya satu: **tulisan berwarna selalu memakai `-ink` di atas `-soft`
atau permukaan**; warna utama hanya untuk isian bentuk, titik, garis, dan
tombol. `Tag` dan `tinta()` (`src/components/Stage.tsx`) menjaga aturan ini di
dalam visualisasi. Warna enam domain materi diwariskan lewat atribut
`data-domain` (`src/styles/jelajah.css`) sebagai `--g`, `--g2`, `--g3`.

Tema gelap bukan sekadar warna dibalik: brand lebih terang dan sedikit pudar,
latar lembutnya gelap bernuansa warna masing-masing, dan teks di atas brand
menjadi gelap.

### Ikon

Ikon "Puzzle Operator": empat operator + − % × tersusun 2×2 di ubin indigo —
anak ikut menyusun perhitungan, bukan cuma menerima jawaban. Sumbernya
`public/favicon.svg` (kisi 32×32); `icon-app.svg`, `icon-maskable.svg`, dan
`icon-mono.svg` adalah turunannya, dan komponen `LogoMerek` menggambar bentuk
yang sama. PNG serta `favicon.ico` dibuat oleh `scripts/render-icons.ps1` dan
ikut disimpan di `public/`. Warna ikon (`--ikon-*`) tidak berubah antar tema.

### Ruang, radius, elevasi

Ruang berbasis 4px (`--s-1` … `--s-24`). Radius berjenjang dari 6px sampai
sepenuhnya membulat. Bayangan hanya tiga tingkat, sengaja lembut — kedalaman
dibangun dari kontras permukaan, bukan dari bayangan tebal.

### Bahasa gerak

Empat durasi dengan tugas masing-masing:

| Token | Dipakai untuk |
|---|---|
| `--d-1` 120ms | mikro-interaksi (hover, tekan) |
| `--d-2` 220ms | transisi antarmuka |
| `--d-3` 380ms | perubahan tata letak |
| `--d-4`/`--d-5` 700–1200ms | animasi yang menjelaskan |

Aturannya satu: **setiap animasi harus punya tujuan pedagogis.** Tidak ada
bounce tanpa alasan, tidak ada rotasi dekoratif. Kalau sebuah gerakan tidak
menjelaskan apa pun, ia dihapus.

`prefers-reduced-motion` dihormati: animasi penjelasan berubah menjadi transisi
instan, dan pengguna tetap bisa melangkah maju-mundur secara manual.

---

## 8. Performa

- Muatan awal hanya berisi kerangka aplikasi, beranda, dan komponen inti.
- Setiap halaman dan setiap modul konsep menjadi potongan terpisah.
- Data kurikulum (potongan terbesar) hanya dimuat oleh halaman Belajar dan Peta.
- Tidak ada pustaka grafik maupun animasi.
- Font disajikan sendiri (self-hosted), tidak ada permintaan ke pihak ketiga.
- Latar bertekstur memakai lapisan `position: fixed`, bukan
  `background-attachment: fixed`, agar peramban tidak menggambar ulang latar
  saat halaman digulir.

Batas praktis untuk visualisasi: di bawah ~400 elemen SVG sekaligus. Untuk
simulasi berjumlah besar (mis. 10.000 lemparan koin), yang digambar adalah
ringkasannya — kurva atau batang — bukan tiap kejadiannya.
