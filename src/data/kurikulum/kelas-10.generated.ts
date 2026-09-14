/* ============================================================
   Visual MTK — Rincian topik kelas 10 (DIHASILKAN OTOMATIS)

   Jangan sunting berkas ini dengan tangan.
   Sumber: docs/riset/ (riset Capaian Pembelajaran Kepka BSKAP
   Kemendikdasmen No. 046/H/KR/2025).
   Bangun ulang: npm run bangun:kurikulum
   ============================================================ */

import type { TopikKurikulum } from '../kurikulum'

const topik: TopikKurikulum[] = [
 {
  "id": "sma10-bentuk-aljabar-persamaan-dan-pertidaksamaan",
  "judul": "Bentuk Aljabar, Persamaan, dan Pertidaksamaan Linear Satu Variabel",
  "kelas": 10,
  "fase": "E",
  "domain": "aljabar",
  "ringkas": "Menyederhanakan bentuk aljabar dengan menggabungkan suku sejenis",
  "subKonsep": [
   "Variabel, koefisien, konstanta, suku, dan suku sejenis",
   "Operasi penjumlahan, pengurangan, perkalian, dan pembagian bentuk aljabar",
   "Sifat komutatif, asosiatif, dan distributif sebagai dasar manipulasi aljabar",
   "Menyelesaikan persamaan linear dengan operasi setara pada kedua ruas",
   "Pertidaksamaan linear dan aturan pembalikan tanda",
   "Himpunan penyelesaian pada garis bilangan dan notasi interval",
   "Menerjemahkan kalimat verbal menjadi kalimat matematika"
  ],
  "rumus": [
   "a x + b = 0 memberi x = -b/a untuk a tidak sama dengan 0",
   "a(b + c) = ab + ac",
   "jika a < b dan c > 0 maka ac < bc",
   "jika a < b dan c < 0 maka ac > bc"
  ],
  "miskonsepsi": [
   "Menyederhanakan 3x + 2 menjadi 5x karena menggabungkan suku tak sejenis",
   "Lupa membalik tanda pertidaksamaan ketika kedua ruas dikalikan atau dibagi bilangan negatif",
   "Memindahkan suku antar ruas tanpa mengubah tandanya"
  ],
  "kenapa": [
   "Kenapa tanda pertidaksamaan harus dibalik ketika dikalikan bilangan negatif?",
   "Kenapa kita boleh menambahkan bilangan yang sama ke kedua ruas persamaan?"
  ],
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
  "ringkas": "Mengubah bentuk umum menjadi bentuk puncak dan sebaliknya",
  "subKonsep": [
   "Bentuk umum a x^2 + b x + c",
   "Bentuk titik puncak (vertex) a(x - p)^2 + q",
   "Bentuk akar atau bentuk faktor a(x - x1)(x - x2)",
   "Informasi yang paling mudah dibaca dari masing-masing bentuk",
   "Mengubah bentuk umum menjadi bentuk puncak dengan melengkapkan kuadrat",
   "Menyusun fungsi kuadrat dari tiga titik yang dilalui",
   "Menyusun fungsi kuadrat dari titik puncak dan satu titik lain",
   "Menyusun fungsi kuadrat dari dua akar dan satu titik lain"
  ],
  "rumus": [
   "bentuk puncak: f(x) = a(x - p)^2 + q dengan titik puncak (p, q)",
   "bentuk akar: f(x) = a(x - x1)(x - x2) dengan x1, x2 titik potong sumbu x",
   "melengkapkan kuadrat: a x^2 + b x + c = a(x + b/(2a))^2 + c - b^2/(4a)",
   "f(x) = a(x - p)^2 + q merupakan hasil geseran y = a x^2 sejauh p ke kanan dan q ke atas"
  ],
  "miskonsepsi": [
   "Membaca puncak dari a(x - p)^2 + q sebagai (-p, q)",
   "Melupakan faktor a ketika mengonstruksi fungsi dari akar-akarnya sehingga grafik salah skala",
   "Mengira bentuk puncak dan bentuk umum menyatakan dua fungsi yang berbeda"
  ],
  "kenapa": [
   "Kenapa pada bentuk a(x - p)^2 + q puncaknya di (p, q), bukan di (-p, q)?",
   "Kenapa satu parabola yang sama bisa ditulis dalam tiga bentuk berbeda?"
  ],
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
  "ringkas": "Menghitung diskriminan dan menyimpulkan jenis akar tanpa menyelesaikan persamaan",
  "subKonsep": [
   "Diskriminan D = b^2 - 4 a c sebagai penentu jenis akar",
   "Kasus D > 0, D = 0, dan D < 0",
   "Kaitan tanda diskriminan dengan banyaknya titik potong parabola terhadap sumbu x",
   "Akar kembar dan makna geometrisnya (parabola menyinggung sumbu x)",
   "Akar rasional ketika D merupakan kuadrat sempurna",
   "Pengenalan satuan imajiner i dengan i^2 = -1",
   "Menuliskan akar tak real dalam bentuk a + b i dan a - b i",
   "Menentukan nilai parameter agar akar memenuhi syarat tertentu"
  ],
  "rumus": [
   "D = b^2 - 4 a c",
   "D > 0: dua akar real yang berbeda",
   "D = 0: dua akar real yang sama (akar kembar)",
   "D < 0: tidak ada akar real, akar berupa bilangan imajiner",
   "i^2 = -1 sehingga akar(-k) = i akar(k) untuk k > 0",
   "akar tak real: x = (-b +- i akar(4 a c - b^2)) / (2 a)"
  ],
  "miskonsepsi": [
   "Menghitung D sebagai b^2 + 4 a c",
   "Menyimpulkan bahwa D < 0 berarti persamaan sama sekali tidak punya penyelesaian",
   "Menuliskan akar(-4) sebagai -2"
  ],
  "kenapa": [
   "Kenapa tanda diskriminan menentukan berapa kali parabola memotong sumbu x?",
   "Kenapa matematikawan menciptakan bilangan i padahal tidak ada tempatnya di garis bilangan?"
  ],
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
  "ringkas": "Menyketsa dan membaca grafik fungsi eksponen",
  "subKonsep": [
   "Bentuk f(x) = k a pangkat x dan syarat bilangan pokoknya",
   "Grafik naik untuk a > 1 (pertumbuhan) dan turun untuk 0 < a < 1 (peluruhan)",
   "Asimtot datar y = 0 dan maknanya",
   "Titik potong sumbu y sebesar k",
   "Ciri khas: laju perubahan berupa faktor pengali tetap per satuan waktu",
   "Membedakan situasi yang cocok dimodelkan linear dan yang cocok dimodelkan eksponensial",
   "Menentukan k dan a dari dua titik atau dari tabel data",
   "Penerapan: pertumbuhan bakteri, penduduk, penyebaran wabah, kadar obat dalam darah, penyusutan kendaraan"
  ],
  "rumus": [
   "f(x) = k a^x dengan a > 0 dan a tidak sama dengan 1",
   "P(t) = P0 (1 + r)^t untuk pertumbuhan dengan laju r",
   "P(t) = P0 (1 - r)^t untuk peluruhan dengan laju r",
   "asimtot datar: y = 0",
   "f(0) = k"
  ],
  "miskonsepsi": [
   "Mengira grafik fungsi eksponen akhirnya memotong sumbu x",
   "Menganggap setiap grafik yang naik dengan cepat pasti eksponensial",
   "Menukar fungsi eksponen a pangkat x dengan fungsi pangkat x pangkat a"
  ],
  "kenapa": [
   "Kenapa grafik fungsi eksponen tidak pernah menyentuh sumbu x?",
   "Kenapa 2 pangkat x pada akhirnya pasti menyalip x pangkat 2 sebesar apa pun x?"
  ],
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
  "ringkas": "Menyketsa grafik fungsi kuadrat dari bentuk umumnya",
  "subKonsep": [
   "Definisi fungsi kuadrat dan bedanya dengan persamaan kuadrat",
   "Grafik fungsi kuadrat berupa parabola",
   "Pengaruh nilai a terhadap arah membuka dan kelebaran parabola",
   "Titik potong sumbu y yang selalu bernilai c",
   "Titik potong sumbu x sebagai akar-akar persamaan kuadrat",
   "Sumbu simetri dan alasan letaknya di tengah kedua akar",
   "Titik puncak sebagai nilai maksimum atau minimum",
   "Daerah asal dan daerah hasil fungsi kuadrat"
  ],
  "rumus": [
   "f(x) = a x^2 + b x + c dengan a tidak sama dengan 0",
   "sumbu simetri: x = -b / (2 a)",
   "titik puncak: (-b/(2a), -D/(4a)) dengan D = b^2 - 4 a c",
   "nilai optimum: y = f(-b/(2a))",
   "daerah hasil: y >= -D/(4a) jika a > 0; y <= -D/(4a) jika a < 0"
  ],
  "miskonsepsi": [
   "Menganggap a < 0 berarti seluruh grafik berada di bawah sumbu x",
   "Menuliskan sumbu simetri sebagai x = b/(2a) tanpa tanda minus",
   "Menyebut nilai maksimum fungsi sama dengan absis titik puncak"
  ],
  "kenapa": [
   "Kenapa sumbu simetri terletak tepat di x = -b/(2a)?",
   "Kenapa nilai a menentukan lebar sempitnya parabola?"
  ],
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
  "ringkas": "Menerjemahkan situasi nyata menjadi fungsi kuadrat",
  "subKonsep": [
   "Memilih variabel dan menyusun fungsi dari deskripsi masalah",
   "Gerak parabola: tinggi benda sebagai fungsi waktu",
   "Masalah luas maksimum dengan keliling tetap",
   "Masalah keuntungan atau pendapatan maksimum",
   "Bentuk parabola pada jembatan gantung, antena parabola, dan pancuran air",
   "Menafsirkan titik puncak, akar, dan titik potong sumbu y dalam konteks",
   "Menentukan daerah asal yang masuk akal secara fisik",
   "Mengevaluasi kesesuaian model kuadrat terhadap data"
  ],
  "rumus": [
   "h(t) = -(1/2) g t^2 + v0 t + h0 untuk gerak vertikal",
   "waktu mencapai tinggi maksimum: t = v0 / g",
   "luas persegi panjang berkeliling k: L(x) = x(k/2 - x)",
   "pendapatan: R(x) = x (harga awal - penurunan per unit x)"
  ],
  "miskonsepsi": [
   "Menganggap grafik tinggi terhadap waktu adalah gambar lintasan fisik benda",
   "Menerima penyelesaian negatif untuk panjang, waktu, atau jumlah barang",
   "Menukar nilai maksimum fungsi dengan absis titik puncak"
  ],
  "kenapa": [
   "Kenapa lintasan bola yang dilempar berbentuk parabola, bukan busur lingkaran?",
   "Kenapa dari semua persegi panjang berkeliling sama, persegi punya luas terbesar?"
  ],
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
  "ringkas": "Menyamakan bilangan pokok kedua ruas dengan sifat eksponen",
  "subKonsep": [
   "Bentuk persamaan a pangkat f(x) = a pangkat g(x)",
   "Syarat bilangan pokok a > 0 dan a tidak sama dengan 1",
   "Menyamakan bilangan pokok kedua ruas",
   "Persamaan eksponensial yang direduksi menjadi persamaan kuadrat melalui pemisalan",
   "Memeriksa keabsahan hasil pemisalan karena a pangkat x selalu positif",
   "Pertidaksamaan eksponensial dasar",
   "Pembalikan arah tanda pertidaksamaan ketika 0 < a < 1"
  ],
  "rumus": [
   "jika a^m = a^n dengan a > 0 dan a tidak sama dengan 1, maka m = n",
   "a^(f(x)) = a^(g(x)) maka f(x) = g(x)",
   "pemisalan y = a^x untuk mereduksi bentuk seperti a^(2x) - p a^x + q = 0",
   "jika a > 1: a^(f(x)) > a^(g(x)) maka f(x) > g(x)",
   "jika 0 < a < 1: a^(f(x)) > a^(g(x)) maka f(x) < g(x)"
  ],
  "miskonsepsi": [
   "Langsung menyamakan pangkat padahal bilangan pokok kedua ruas berbeda",
   "Menerima penyelesaian pemisalan yang bernilai negatif atau nol padahal a pangkat x selalu positif",
   "Mencoret bilangan pokok pada 2^x = 3^x seolah bisa dibatalkan"
  ],
  "kenapa": [
   "Kenapa kalau bilangan pokoknya sama, pangkatnya boleh langsung disamakan?",
   "Kenapa bilangan pokok 1 tidak diperbolehkan dalam persamaan eksponensial?"
  ],
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
  "ringkas": "Memilih metode penyelesaian yang paling efisien untuk bentuk yang diberikan",
  "subKonsep": [
   "Bentuk umum a x^2 + b x + c = 0 dengan a tidak sama dengan 0",
   "Sifat hasil kali nol sebagai dasar metode pemfaktoran",
   "Pemfaktoran bentuk kuadrat, termasuk ketika a tidak sama dengan 1",
   "Melengkapkan kuadrat sempurna",
   "Penurunan rumus abc dari melengkapkan kuadrat",
   "Jumlah dan hasil kali akar-akar",
   "Menyusun persamaan kuadrat baru dari akar-akar yang diketahui",
   "Persamaan yang dapat direduksi menjadi bentuk kuadrat"
  ],
  "rumus": [
   "a x^2 + b x + c = 0 dengan a tidak sama dengan 0",
   "x = (-b +- akar(b^2 - 4 a c)) / (2 a)",
   "x1 + x2 = -b/a",
   "x1 x2 = c/a",
   "x^2 - (x1 + x2) x + (x1 x2) = 0",
   "(x + p)^2 = x^2 + 2 p x + p^2"
  ],
  "miskonsepsi": [
   "Dari (x - 2)(x - 3) = 6 langsung menulis x - 2 = 6 atau x - 3 = 6, padahal sifat hasil kali nol hanya berlaku jika ruas kanan nol",
   "Membagi kedua ruas dengan x sehingga penyelesaian x = 0 hilang",
   "Menuliskan pembilang rumus abc sebagai b, bukan -b"
  ],
  "kenapa": [
   "Dari mana rumus abc berasal, dan kenapa bentuknya begitu?",
   "Kenapa sifat hasil kali nol hanya bisa dipakai kalau salah satu ruas bernilai nol?"
  ],
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
  "ringkas": "Menggambar garis batas dengan cepat menggunakan dua titik potong sumbu",
  "subKonsep": [
   "Pertidaksamaan linear dua variabel dan artinya sebagai daerah pada bidang",
   "Garis batas (garis pembatas) dan cara menggambarnya lewat titik potong sumbu",
   "Garis penuh untuk tanda <= atau >=, garis putus-putus untuk tanda < atau >",
   "Uji titik untuk menentukan daerah yang memenuhi",
   "Konvensi arsiran daerah penyelesaian dan daerah bersih",
   "Menerjemahkan kata kunci kendala: paling banyak, sekurang-kurangnya, tidak lebih dari",
   "Kendala kewajaran x >= 0 dan y >= 0 pada konteks nyata"
  ],
  "rumus": [
   "a x + b y <= c menyatakan sebuah setengah bidang tertutup",
   "uji titik (0, 0) jika garis batas tidak melalui titik asal",
   "titik potong sumbu x: y = 0; titik potong sumbu y: x = 0"
  ],
  "miskonsepsi": [
   "Selalu mengarsir bagian atas garis untuk tanda >= tanpa menguji titik",
   "Memakai garis penuh untuk tanda < atau > yang seharusnya putus-putus",
   "Menguji titik yang justru terletak tepat pada garis batas"
  ],
  "kenapa": [
   "Kenapa cukup menguji satu titik untuk menentukan seluruh daerah penyelesaian?",
   "Kenapa garis batas digambar putus-putus ketika tandanya < atau >?"
  ],
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
  "ringkas": "Memilih metode penyelesaian yang paling efisien untuk sistem tertentu",
  "subKonsep": [
   "Persamaan linear dua variabel dan grafiknya berupa garis lurus",
   "Penyelesaian sistem sebagai titik potong dua garis",
   "Metode grafik, substitusi, eliminasi, dan gabungan",
   "Jenis penyelesaian: tunggal, tak hingga banyak, atau tidak ada",
   "Kaitan jenis penyelesaian dengan gradien dan konstanta kedua garis",
   "Pemodelan masalah dua besaran (harga dua barang, campuran, kecepatan)"
  ],
  "rumus": [
   "a x + b y = c dan d x + e y = f",
   "penyelesaian tunggal jika a/d tidak sama dengan b/e",
   "tidak ada penyelesaian jika a/d = b/e tetapi tidak sama dengan c/f",
   "tak hingga banyak penyelesaian jika a/d = b/e = c/f",
   "y = m x + k dengan m gradien"
  ],
  "miskonsepsi": [
   "Mengeliminasi tanpa terlebih dahulu menyamakan koefisien variabel yang dihilangkan",
   "Menganggap setiap sistem pasti punya tepat satu penyelesaian",
   "Salah tanda ketika mengurangkan dua persamaan"
  ],
  "kenapa": [
   "Kenapa penyelesaian sistem persamaan adalah titik potong kedua garisnya?",
   "Kenapa dua garis sejajar berarti sistem tidak punya penyelesaian?"
  ],
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
  "ringkas": "Mereduksi sistem tiga variabel menjadi sistem dua variabel secara sistematis",
  "subKonsep": [
   "Bentuk umum sistem tiga persamaan dengan tiga variabel",
   "Makna geometris sebagai perpotongan tiga bidang di ruang dimensi tiga",
   "Metode eliminasi bertingkat: mereduksi SPLTV menjadi SPLDV",
   "Metode substitusi dan metode gabungan",
   "Kemungkinan penyelesaian: tunggal, tak hingga, atau tidak ada",
   "Pemodelan masalah tiga besaran: harga tiga jenis barang, komposisi campuran, keliling segitiga"
  ],
  "rumus": [
   "a1 x + b1 y + c1 z = d1",
   "a2 x + b2 y + c2 z = d2",
   "a3 x + b3 y + c3 z = d3",
   "strategi: eliminasi variabel yang sama dari dua pasang persamaan untuk memperoleh SPLDV"
  ],
  "miskonsepsi": [
   "Mengeliminasi variabel yang berbeda pada tiap pasangan sehingga sistem tidak pernah tereduksi",
   "Mengira tiga persamaan selalu menjamin adanya penyelesaian tunggal",
   "Memeriksa hasil hanya pada satu persamaan saja"
  ],
  "kenapa": [
   "Kenapa dibutuhkan tiga persamaan untuk menentukan tiga variabel?",
   "Kenapa penyelesaian SPLTV secara geometris berarti titik potong tiga bidang?"
  ],
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
  "ringkas": "Menggambar daerah himpunan penyelesaian dari beberapa kendala sekaligus",
  "subKonsep": [
   "Irisan beberapa daerah penyelesaian sebagai daerah himpunan penyelesaian (DHP)",
   "Titik-titik pojok (titik ekstrem) daerah himpunan penyelesaian",
   "Fungsi objektif atau fungsi tujuan yang ingin dioptimumkan",
   "Nilai maksimum dan minimum yang selalu tercapai di titik pojok",
   "Metode uji titik pojok dan metode garis selidik",
   "Daerah penyelesaian terbatas dan tak terbatas",
   "Pemodelan masalah optimasi: produksi terbatas bahan baku, gizi, transportasi, keuntungan pedagang"
  ],
  "rumus": [
   "f(x, y) = p x + q y sebagai fungsi objektif",
   "nilai optimum tercapai di salah satu titik pojok daerah himpunan penyelesaian",
   "garis selidik: p x + q y = k, digeser sejajar untuk mencari nilai k ekstrem",
   "titik pojok diperoleh dengan menyelesaikan sistem dua garis batas yang berpotongan"
  ],
  "miskonsepsi": [
   "Membaca koordinat titik pojok dari gambar tanpa menyelesaikan sistem persamaannya sehingga tidak eksak",
   "Mengarsir gabungan daerah, bukan irisannya",
   "Mengira nilai optimum bisa terletak di tengah daerah penyelesaian"
  ],
  "kenapa": [
   "Kenapa nilai maksimum atau minimum selalu terjadi di titik pojok, bukan di tengah daerah?",
   "Kenapa daerah penyelesaian sistem adalah irisan, bukan gabungan?"
  ],
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
  "ringkas": "Menggambar dan menjumlahkan vektor secara geometris",
  "subKonsep": [
   "Besaran skalar dan besaran vektor",
   "Notasi vektor dan penyajiannya sebagai ruas garis berarah",
   "Panjang (besar atau modulus) dan arah vektor",
   "Vektor nol, vektor lawan (negatif), dan vektor ekuivalen",
   "Vektor pada sistem koordinat Kartesius dimensi dua dan dimensi tiga",
   "Komponen vektor, vektor kolom, dan vektor baris",
   "Vektor posisi dan vektor satuan",
   "Penjumlahan vektor: metode segitiga, jajargenjang, poligon, dan cara komponen"
  ],
  "rumus": [
   "a = (a1, a2) dengan |a| = akar(a1^2 + a2^2)",
   "|a| = akar(a1^2 + a2^2 + a3^2) pada dimensi tiga",
   "a + b = (a1 + b1, a2 + b2)",
   "k a = (k a1, k a2)",
   "a . b = a1 b1 + a2 b2",
   "cos theta = (a . b) / (|a| |b|)"
  ],
  "miskonsepsi": [
   "Menjumlahkan panjang vektor alih-alih vektornya, sehingga menulis |a + b| = |a| + |b|",
   "Menganggap vektor harus selalu berpangkal di titik asal",
   "Menukar hasil kali skalar yang menghasilkan bilangan dengan operasi yang menghasilkan vektor"
  ],
  "kenapa": [
   "Kenapa dua gaya masing-masing 3 N dan 4 N bisa menghasilkan gaya 5 N, bukan 7 N?",
   "Kenapa metode segitiga dan metode jajargenjang memberikan hasil penjumlahan yang sama?"
  ],
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
  "ringkas": "Mengidentifikasi apakah sebuah barisan bersifat aritmetika",
  "subKonsep": [
   "Pola bilangan, suku, dan notasi suku ke-n",
   "Beda (selisih tetap) antara dua suku berurutan",
   "Rumus suku ke-n dan hubungannya dengan fungsi linear",
   "Perbedaan barisan (daftar berurut) dan deret (jumlah suku)",
   "Penurunan rumus jumlah n suku pertama dengan cara Gauss (menjumlahkan barisan maju dan mundur)",
   "Suku tengah barisan aritmetika",
   "Hubungan antara suku ke-n dan jumlah: U_n = S_n - S_(n-1)",
   "Penerapan: angsuran tetap, penyusutan garis lurus, susunan kursi gedung pertunjukan"
  ],
  "rumus": [
   "U_n = a + (n - 1) b",
   "b = U_n - U_(n-1)",
   "S_n = (n/2)(2a + (n - 1) b)",
   "S_n = (n/2)(a + U_n)",
   "U_n = S_n - S_(n-1)",
   "U_tengah = (a + U_n)/2 untuk n ganjil"
  ],
  "miskonsepsi": [
   "Menggunakan U_n = a + n b karena lupa faktor (n - 1)",
   "Menyamakan barisan dengan deret sehingga menjumlahkan padahal diminta suku ke-n",
   "Menganggap setiap barisan yang nilainya naik pasti aritmetika"
  ],
  "kenapa": [
   "Kenapa ada (n - 1) di rumus suku ke-n, bukan n?",
   "Kenapa menjumlahkan 1 sampai 100 bisa dilakukan secepat cara Gauss?"
  ],
  "konsep": [
   "deret-gauss"
  ],
  "prasyarat": [
   "sd1-pola-bukan-bilangan-gambar-warna",
   "smp7-persamaan-linear-satu-variabel",
   "smp9-fungsi-nonlinear-dan-perbandingannya-dengan"
  ]
 },
 {
  "id": "sma10-barisan-dan-deret-geometri-serta",
  "judul": "Barisan dan Deret Geometri serta Deret Geometri Tak Hingga",
  "kelas": 10,
  "fase": "E",
  "domain": "bilangan",
  "ringkas": "Membedakan barisan aritmetika dan geometri dari data suku-sukunya",
  "subKonsep": [
   "Rasio (pembanding tetap) antara dua suku berurutan",
   "Rumus suku ke-n dan hubungannya dengan fungsi eksponen",
   "Penurunan rumus jumlah n suku pertama dengan trik S_n dikurangi r S_n",
   "Kasus khusus r = 1",
   "Deret geometri tak hingga dan syarat konvergen |r| < 1",
   "Deret divergen ketika |r| >= 1",
   "Penerapan: pertumbuhan bakteri, bola memantul, lipatan kertas, fraktal, penyebaran informasi"
  ],
  "rumus": [
   "U_n = a r^(n-1)",
   "r = U_n / U_(n-1)",
   "S_n = a(r^n - 1)/(r - 1) untuk r > 1",
   "S_n = a(1 - r^n)/(1 - r) untuk r < 1",
   "S_tak hingga = a/(1 - r) untuk |r| < 1"
  ],
  "miskonsepsi": [
   "Menggunakan U_n = a r^n karena lupa pangkat (n - 1)",
   "Menerapkan rumus deret tak hingga meskipun |r| >= 1",
   "Mengira jumlah tak hingga banyak bilangan positif pasti tak hingga besar"
  ],
  "kenapa": [
   "Kenapa menjumlahkan tak hingga banyak bilangan positif bisa menghasilkan bilangan berhingga?",
   "Dari mana rumus jumlah deret geometri berasal, dan kenapa triknya mengalikan dengan r?"
  ],
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
  "ringkas": "Menyederhanakan bentuk akar seperti akar 72 menjadi 6 akar 2",
  "subKonsep": [
   "Akar kuadrat dan akar pangkat n sebagai kebalikan pemangkatan",
   "Akar utama (principal root) yang selalu bernilai tak negatif",
   "Menyederhanakan bentuk akar dengan memisahkan faktor kuadrat sempurna",
   "Penjumlahan dan pengurangan bentuk akar sejenis",
   "Perkalian dan pembagian bentuk akar",
   "Akar dari bilangan negatif yang tidak memiliki hasil real",
   "Mengestimasi nilai akar di antara dua bilangan bulat berurutan"
  ],
  "rumus": [
   "akar(a) x akar(b) = akar(a x b) untuk a, b >= 0",
   "akar(a) / akar(b) = akar(a/b) untuk a >= 0, b > 0",
   "akar(x^2) = |x|",
   "p akar(c) + q akar(c) = (p + q) akar(c)",
   "akar pangkat n dari (a^n) = a untuk a >= 0"
  ],
  "miskonsepsi": [
   "Menuliskan akar(a + b) sebagai akar(a) + akar(b)",
   "Menjumlahkan akar 2 dengan akar 3 menjadi akar 5",
   "Menuliskan akar(x^2) = x tanpa nilai mutlak, sehingga salah untuk x negatif"
  ],
  "kenapa": [
   "Kenapa akar(a + b) tidak sama dengan akar(a) + akar(b)?",
   "Kenapa lambang akar hanya memberi hasil positif padahal persamaan x^2 = 9 punya dua penyelesaian?"
  ],
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
  "ringkas": "Menuliskan perkalian bilangan berulang sebagai bentuk pangkat dan sebaliknya",
  "subKonsep": [
   "Pangkat sebagai perkalian berulang dengan faktor yang sama",
   "Istilah bilangan pokok (basis) dan pangkat (eksponen) serta cara membacanya",
   "Pangkat pada bilangan negatif: perbedaan (-a) pangkat n dengan negatif dari a pangkat n",
   "Pangkat pada bilangan pecahan dan mengapa hasilnya bisa mengecil",
   "Urutan operasi hitung yang melibatkan pemangkatan",
   "Perbandingan pertumbuhan nilai pangkat terhadap perkalian biasa"
  ],
  "rumus": [
   "a^n = a x a x ... x a sebanyak n faktor, dengan n bilangan asli",
   "(-a)^n bernilai positif jika n genap dan negatif jika n ganjil",
   "(a/b)^n = a^n / b^n",
   "urutan operasi: kurung, pangkat, kali/bagi, tambah/kurang"
  ],
  "miskonsepsi": [
   "Menghitung 2^3 sebagai 2 x 3 = 6, yaitu memperlakukan pangkat sebagai perkalian biasa",
   "Menganggap (-3)^2 sama dengan -3^2 karena tidak memperhatikan kurung",
   "Menganggap a^n selalu lebih besar daripada a, padahal (1/2)^3 justru lebih kecil dari 1/2"
  ],
  "kenapa": [
   "Kenapa pangkat dimaknai perkalian berulang, bukan penjumlahan berulang?",
   "Kenapa (-2)^4 bernilai positif tetapi -2^4 bernilai negatif?"
  ],
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
  "ringkas": "Memilih model bunga tunggal atau majemuk sesuai deskripsi masalah",
  "subKonsep": [
   "Modal awal, suku bunga, periode, dan nilai akhir",
   "Bunga tunggal sebagai model linear (barisan aritmetika)",
   "Bunga majemuk sebagai model eksponensial (barisan geometri)",
   "Frekuensi pemajemukan: tahunan, semesteran, bulanan, harian",
   "Perbandingan hasil bunga tunggal dan bunga majemuk pada jangka panjang",
   "Peluruhan: penyusutan nilai aset, peluruhan radioaktif, konsep waktu paruh",
   "Inflasi dan nilai uang terhadap waktu",
   "Membaca dan mengkritisi tawaran investasi atau pinjaman"
  ],
  "rumus": [
   "M_n = M_0 (1 + n i) untuk bunga tunggal",
   "M_n = M_0 (1 + i)^n untuk bunga majemuk",
   "M_n = M_0 (1 + i/k)^(k n) untuk pemajemukan k kali per periode",
   "N(t) = N_0 (1 - p)^t untuk peluruhan",
   "N(t) = N_0 (1/2)^(t/T) dengan T waktu paruh"
  ],
  "miskonsepsi": [
   "Memakai rumus bunga tunggal untuk soal bunga majemuk karena keduanya terlihat mirip",
   "Menganggap bunga 12% per tahun langsung berarti 12% per bulan",
   "Lupa mengubah persen menjadi bentuk desimal sebelum menghitung"
  ],
  "kenapa": [
   "Kenapa bunga majemuk tumbuh jauh lebih cepat daripada bunga tunggal padahal persennya sama?",
   "Kenapa pemajemukan yang lebih sering menghasilkan uang lebih banyak?"
  ],
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
  "ringkas": "Mengklasifikasikan sebuah bilangan ke dalam himpunan bilangan yang tepat",
  "subKonsep": [
   "Bilangan asli, cacah, bulat, rasional, irasional, dan real serta hubungan antarhimpunannya",
   "Representasi bilangan pada garis bilangan, termasuk menempatkan bentuk akar dan pi secara aproksimasi",
   "Desimal berulang sebagai bilangan rasional dan desimal tak berulang sebagai bilangan irasional",
   "Notasi interval terbuka, tertutup, setengah terbuka, dan tak hingga",
   "Nilai mutlak sebagai jarak dari nol pada garis bilangan",
   "Kerapatan bilangan rasional dan kelengkapan garis bilangan real"
  ],
  "rumus": [
   "Q = {a/b | a, b bilangan bulat, b tidak sama dengan 0}",
   "|x| = x jika x >= 0, dan |x| = -x jika x < 0",
   "[a, b] = {x | a <= x <= b}; (a, b) = {x | a < x < b}",
   "|x - y| = jarak antara x dan y pada garis bilangan"
  ],
  "miskonsepsi": [
   "Menganggap semua bentuk akar adalah bilangan irasional, padahal akar dari 9 sama dengan 3 yang rasional",
   "Menganggap pi tepat sama dengan 22/7 dan bukan hampiran",
   "Membaca 0,999... sebagai bilangan yang lebih kecil dari 1"
  ],
  "kenapa": [
   "Kenapa akar 2 tidak bisa ditulis sebagai pecahan dua bilangan bulat?",
   "Kenapa di antara dua bilangan rasional selalu ada bilangan rasional lain, tetapi garis bilangan masih punya lubang yang diisi bilangan irasional?"
  ],
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
  "ringkas": "Mengubah bentuk eksponen menjadi bentuk logaritma dan sebaliknya",
  "subKonsep": [
   "Logaritma sebagai kebalikan (invers) dari pemangkatan",
   "Istilah bilangan pokok (basis), numerus, dan hasil logaritma",
   "Syarat basis lebih dari 0 dan tidak sama dengan 1, serta numerus lebih dari 0",
   "Logaritma umum berbasis 10 dan logaritma natural berbasis e",
   "Sifat logaritma perkalian, pembagian, dan perpangkatan",
   "Sifat khusus: log 1 = 0, log basisnya sendiri = 1",
   "Mengubah basis logaritma",
   "Menyelesaikan persamaan eksponensial berbasis berbeda"
  ],
  "rumus": [
   "a log b = c ekuivalen dengan a^c = b, dengan a > 0, a tidak sama dengan 1, b > 0",
   "a log (x y) = a log x + a log y",
   "a log (x/y) = a log x - a log y",
   "a log (x^n) = n x (a log x)",
   "a log b = (c log b) / (c log a)",
   "a log 1 = 0 dan a log a = 1"
  ],
  "miskonsepsi": [
   "Menuliskan log(x + y) sebagai log x + log y",
   "Menganggap (log x)/(log y) sama dengan log(x/y)",
   "Mengira logaritma bilangan negatif atau nol ada nilainya"
  ],
  "kenapa": [
   "Kenapa sifat logaritma mengubah perkalian menjadi penjumlahan?",
   "Kenapa numerus logaritma harus positif?"
  ],
  "konsep": [
   "eksponen-logaritma"
  ],
  "prasyarat": [
   "sma10-sifat-sifat-operasi-eksponen",
   "sma10-bentuk-akar",
   "sma10-fungsi-eksponensial-pertumbuhan-dan-peluruhan"
  ]
 },
 {
  "id": "sma10-merasionalkan-penyebut-bentuk-akar",
  "judul": "Merasionalkan Penyebut Bentuk Akar",
  "kelas": 10,
  "fase": "E",
  "domain": "bilangan",
  "ringkas": "Menentukan bentuk pengali yang tepat untuk setiap jenis penyebut",
  "subKonsep": [
   "Alasan historis dan praktis merasionalkan penyebut",
   "Merasionalkan penyebut berbentuk akar tunggal",
   "Merasionalkan penyebut berbentuk a + akar b menggunakan sekawan (konjugat)",
   "Identitas selisih dua kuadrat sebagai kunci hilangnya akar",
   "Mengalikan dengan bentuk yang bernilai satu sehingga nilai tidak berubah",
   "Menuliskan hasil dalam bentuk paling sederhana"
  ],
  "rumus": [
   "a / akar(b) = a akar(b) / b",
   "c / (a + akar b) = c(a - akar b) / (a^2 - b)",
   "c / (akar a + akar b) = c(akar a - akar b) / (a - b)",
   "(a + akar b)(a - akar b) = a^2 - b"
  ],
  "miskonsepsi": [
   "Mengalikan hanya penyebut tanpa mengalikan pembilang sehingga nilai pecahan berubah",
   "Mengalikan dengan a + akar b padahal seharusnya dengan sekawannya a - akar b",
   "Menganggap nilai bilangan berubah setelah penyebutnya dirasionalkan"
  ],
  "kenapa": [
   "Kenapa mengalikan pembilang dan penyebut dengan bilangan yang sama tidak mengubah nilai pecahan?",
   "Kenapa perkalian dengan bentuk sekawan justru menghilangkan tanda akar?"
  ],
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
  "ringkas": "Menulis dan membaca bilangan dalam notasi ilmiah",
  "subKonsep": [
   "Bentuk baku a x 10 pangkat n dengan syarat 1 <= a < 10",
   "Mengubah bilangan sangat besar dan sangat kecil ke notasi ilmiah",
   "Operasi perkalian dan pembagian pada notasi ilmiah",
   "Angka penting dan aturan pembulatan",
   "Estimasi hasil sebelum menghitung untuk mengecek kewajaran",
   "Kesadaran satuan dan konversi satuan pada hasil hitung",
   "Penumpukan galat akibat pembulatan bertahap"
  ],
  "rumus": [
   "N = a x 10^n dengan 1 <= a < 10 dan n bilangan bulat",
   "(a x 10^m)(b x 10^n) = (a x b) x 10^(m+n)",
   "(a x 10^m) : (b x 10^n) = (a/b) x 10^(m-n)"
  ],
  "miskonsepsi": [
   "Menuliskan 25 x 10^3 sebagai notasi ilmiah, padahal a harus lebih kecil dari 10",
   "Membulatkan di setiap langkah sehingga galat menumpuk pada hasil akhir",
   "Menghitung angka penting 0,0035 sebagai empat angka penting"
  ],
  "kenapa": [
   "Kenapa notasi ilmiah mensyaratkan bilangan depannya antara 1 dan 10?",
   "Kenapa pembulatan bertahap bisa membuat hasil akhir melenceng cukup jauh?"
  ],
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
  "ringkas": "Menjelaskan a^0 = 1 melalui pola, bukan sekadar hafalan",
  "subKonsep": [
   "Menurunkan a^0 = 1 dari pola pembagian a^n : a^n dan dari pola barisan menurun",
   "Alasan syarat a tidak sama dengan 0 dan status 0^0 yang tak terdefinisi",
   "Pangkat bulat negatif sebagai kebalikan (invers perkalian)",
   "Pangkat negatif pada pecahan yang membalik pembilang dan penyebut",
   "Menyatakan hasil akhir dengan pangkat positif",
   "Konsistensi: definisi dipilih agar semua sifat eksponen tetap berlaku"
  ],
  "rumus": [
   "a^0 = 1 untuk a tidak sama dengan 0",
   "a^(-n) = 1 / a^n untuk a tidak sama dengan 0",
   "(a/b)^(-n) = (b/a)^n",
   "a^m : a^n = a^(m-n) tetap berlaku meskipun m < n"
  ],
  "miskonsepsi": [
   "Menganggap a^0 = 0 karena mengira tidak ada faktor sama sekali",
   "Menganggap 2^(-3) = -8, yaitu mengira pangkat negatif membuat hasilnya negatif",
   "Menganggap 0^0 = 1 tanpa menyadari bahwa bentuk ini tak terdefinisi"
  ],
  "kenapa": [
   "Kenapa bilangan apa pun (selain nol) dipangkatkan nol hasilnya 1?",
   "Kenapa pangkat negatif berarti membalik bilangan, bukan membuatnya negatif?"
  ],
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
  "ringkas": "Mengubah bentuk akar menjadi pangkat pecahan dan sebaliknya",
  "subKonsep": [
   "Makna a pangkat 1/2 dan a pangkat 1/n",
   "Makna a pangkat m/n sebagai akar pangkat n dari a pangkat m",
   "Alasan definisi dipilih agar sifat a^m x a^n = a^(m+n) tetap konsisten",
   "Syarat bilangan pokok tak negatif ketika penyebut pangkat bernafas genap",
   "Mengubah bolak-balik antara notasi akar dan notasi pangkat pecahan",
   "Menyederhanakan ekspresi campuran akar dan pangkat menggunakan sifat eksponen",
   "Penerapan pada laju pertumbuhan per periode pecahan"
  ],
  "rumus": [
   "a^(1/n) = akar pangkat n dari a",
   "a^(m/n) = akar pangkat n dari (a^m) = (akar pangkat n dari a)^m",
   "a^(1/2) x a^(1/2) = a^1 = a",
   "a^(-m/n) = 1 / a^(m/n)"
  ],
  "miskonsepsi": [
   "Mengartikan a^(1/2) sebagai a dibagi 2 atau setengah dari a",
   "Membaca a^(2/3) sebagai akar pangkat 2 dari a pangkat 3 karena membalik peran pembilang dan penyebut",
   "Menerapkan pangkat pecahan pada bilangan pokok negatif tanpa memeriksa penyebutnya"
  ],
  "kenapa": [
   "Kenapa a pangkat 1/2 harus berarti akar a dan tidak boleh berarti hal lain?",
   "Kenapa definisi pangkat pecahan sengaja dirancang agar sifat penjumlahan pangkat tetap berlaku?"
  ],
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
  "ringkas": "Menggeneralisasi sifat eksponen dengan menguraikan perkalian berulang",
  "subKonsep": [
   "Perkalian bilangan berpangkat dengan bilangan pokok sama",
   "Pembagian bilangan berpangkat dengan bilangan pokok sama",
   "Pemangkatan dari bilangan berpangkat",
   "Pemangkatan dari hasil kali dan hasil bagi",
   "Menggeneralisasi sifat dari pola contoh konkret menuju bentuk umum",
   "Batas keberlakuan sifat: hanya untuk bilangan pokok yang sama",
   "Menyederhanakan ekspresi eksponen bercampur menjadi bentuk paling sederhana"
  ],
  "rumus": [
   "a^m x a^n = a^(m+n)",
   "a^m : a^n = a^(m-n)",
   "(a^m)^n = a^(m x n)",
   "(a x b)^n = a^n x b^n",
   "(a/b)^n = a^n / b^n, dengan b tidak sama dengan 0"
  ],
  "miskonsepsi": [
   "Menuliskan a^m x a^n sebagai a^(m x n) karena tertukar dengan sifat pangkat dari pangkat",
   "Menganggap (a + b)^n sama dengan a^n + b^n",
   "Menggabungkan 2^3 x 3^2 menjadi 6^5 padahal bilangan pokoknya berbeda"
  ],
  "kenapa": [
   "Kenapa pangkatnya dijumlahkan ketika dua bilangan berpangkat dikalikan?",
   "Kenapa (a + b)^2 tidak sama dengan a^2 + b^2?"
  ],
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
  "ringkas": "Membuat box plot dari data mentah",
  "subKonsep": [
   "Lima serangkai: nilai minimum, Q1, median, Q3, nilai maksimum",
   "Kotak yang panjangnya sama dengan jangkauan interkuartil",
   "Kumis (whisker) dan batasnya",
   "Aturan pagar 1,5 kali IQR untuk menandai pencilan",
   "Membaca kemencengan distribusi dari posisi median di dalam kotak",
   "Membandingkan dua atau lebih himpunan data dengan box plot berdampingan",
   "Keterbatasan box plot: tidak menampilkan banyaknya data dan bentuk distribusi rinci",
   "Menyusun box plot dari data mentah maupun dari data kelompok"
  ],
  "rumus": [
   "IQR = Q3 - Q1",
   "pagar dalam bawah = Q1 - 1,5 x IQR",
   "pagar dalam atas = Q3 + 1,5 x IQR",
   "data di luar pagar dalam dinyatakan sebagai pencilan",
   "setiap bagian (min ke Q1, Q1 ke Q2, Q2 ke Q3, Q3 ke maks) memuat sekitar 25% data"
  ],
  "miskonsepsi": [
   "Mengira bagian yang panjang pada box plot berarti datanya lebih banyak",
   "Menganggap garis di dalam kotak adalah mean, bukan median",
   "Mengira kumis selalu mencapai nilai minimum dan maksimum meskipun ada pencilan"
  ],
  "kenapa": [
   "Kenapa setiap bagian box plot memuat sekitar 25% data walaupun panjangnya berbeda-beda?",
   "Kenapa batas pencilan memakai angka 1,5 kali IQR dan bukan angka lain?"
  ],
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
  "ringkas": "Membuat dan membaca diagram pencar",
  "subKonsep": [
   "Data bivariat berupa pasangan dua variabel numerik",
   "Variabel bebas pada sumbu mendatar dan variabel terikat pada sumbu tegak",
   "Kasus khusus ketika variabel bebasnya adalah waktu (data deret waktu)",
   "Arah asosiasi: positif, negatif, atau tidak ada",
   "Bentuk hubungan: linear atau nonlinear",
   "Kekuatan hubungan: kuat, sedang, lemah",
   "Garis kecenderungan atau model linear terbaik secara visual",
   "Pencilan pada data bivariat dan pengaruhnya"
  ],
  "rumus": [
   "data bivariat berupa pasangan (x_i, y_i)",
   "garis kecenderungan: y = m x + c",
   "asosiasi positif jika kenaikan x cenderung diikuti kenaikan y",
   "asosiasi negatif jika kenaikan x cenderung diikuti penurunan y"
  ],
  "miskonsepsi": [
   "Menyimpulkan hubungan sebab-akibat hanya dari korelasi yang kuat",
   "Menghubungkan titik-titik pada diagram pencar seperti pada diagram garis",
   "Mengira korelasi mendekati nol berarti tidak ada hubungan sama sekali, padahal bisa ada hubungan lengkung"
  ],
  "kenapa": [
   "Kenapa penjualan es krim dan jumlah kasus tenggelam berkorelasi padahal tidak saling menyebabkan?",
   "Kenapa garis kecenderungan bisa saja tidak melewati satu pun titik data?"
  ],
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
  "ringkas": "Membuat dot plot dari data mentah",
  "subKonsep": [
   "Dot plot: satu titik mewakili satu datum",
   "Kelebihan dot plot untuk data sedikit dan data diskret",
   "Membaca modus, sebaran, celah (gap), gerombolan (cluster), dan pencilan langsung dari dot plot",
   "Perbandingan kekuatan dot plot, histogram, dan box plot",
   "Memilih tampilan berdasarkan natur (karakteristik) data dan pertanyaan yang ingin dijawab",
   "Menjelaskan alasan pemilihan tampilan secara argumentatif",
   "Tampilan berdampingan untuk membandingkan dua kelompok"
  ],
  "rumus": [
   "dot plot tidak memiliki rumus khusus; banyak titik pada suatu nilai sama dengan frekuensi nilai tersebut",
   "banyak seluruh titik = n"
  ],
  "miskonsepsi": [
   "Memakai histogram untuk data yang jumlahnya sangat sedikit sehingga bentuknya tak bermakna",
   "Mengira dot plot dan diagram batang adalah hal yang sama",
   "Menganggap satu jenis tampilan selalu paling baik untuk semua situasi"
  ],
  "kenapa": [
   "Kenapa untuk 15 data lebih baik memakai dot plot daripada histogram?",
   "Kenapa box plot bagus untuk membandingkan banyak kelompok tetapi menyembunyikan bentuk distribusi?"
  ],
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
  "ringkas": "Menggambar diagram Venn untuk dua kejadian dan mengisi peluangnya",
  "subKonsep": [
   "Gabungan dan irisan dua kejadian",
   "Penyajian kejadian dengan diagram Venn",
   "Kejadian saling lepas (tidak dapat terjadi bersamaan)",
   "Aturan penjumlahan umum dan aturan penjumlahan khusus",
   "Alasan irisan harus dikurangkan agar tidak dihitung dua kali",
   "Perbedaan kejadian saling lepas dan kejadian saling bebas",
   "Aturan perkalian dasar untuk kejadian saling bebas",
   "Makna kata hubung 'atau' dalam matematika yang bersifat inklusif"
  ],
  "rumus": [
   "P(A gabungan B) = P(A) + P(B) - P(A irisan B)",
   "jika A dan B saling lepas: P(A irisan B) = 0 sehingga P(A gabungan B) = P(A) + P(B)",
   "jika A dan B saling bebas: P(A irisan B) = P(A) x P(B)",
   "P(A komplemen) = 1 - P(A)"
  ],
  "miskonsepsi": [
   "Menjumlahkan peluang tanpa mengurangi irisan sehingga hasilnya melebihi 1",
   "Menyamakan kejadian saling lepas dengan kejadian saling bebas",
   "Mengira dua kejadian yang saling lepas pasti juga saling bebas"
  ],
  "kenapa": [
   "Kenapa irisan harus dikurangkan dalam aturan penjumlahan peluang?",
   "Apa bedanya saling lepas dan saling bebas, dan kenapa dua kejadian saling lepas justru tidak saling bebas?"
  ],
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
  "ringkas": "Mengklasifikasikan jenis data dari deskripsi variabelnya",
  "subKonsep": [
   "Populasi dan sampel serta pentingnya sampel yang representatif",
   "Data kualitatif (nominal dan ordinal) dan data kuantitatif (diskret dan kontinu)",
   "Data primer dan data sekunder",
   "Tabel frekuensi data tunggal",
   "Diagram batang, diagram garis, diagram lingkaran, dan diagram batang-daun",
   "Memilih jenis diagram sesuai jenis data dan tujuan penyajian",
   "Komponen grafik yang jujur: judul, label sumbu, skala seragam, sumber data",
   "Grafik yang menyesatkan karena sumbu terpotong atau skala tidak konsisten"
  ],
  "rumus": [
   "frekuensi relatif = f_i / n",
   "persentase = (f_i / n) x 100%",
   "besar sudut juring diagram lingkaran = (f_i / n) x 360 derajat",
   "jumlah seluruh frekuensi = n"
  ],
  "miskonsepsi": [
   "Memakai diagram lingkaran untuk data yang bukan bagian dari satu keseluruhan",
   "Menganggap nomor punggung pemain atau kode pos sebagai data kuantitatif yang bisa dirata-rata",
   "Membaca diagram batang bersumbu terpotong seolah selisihnya sangat besar"
  ],
  "kenapa": [
   "Kenapa jenis data menentukan jenis diagram yang boleh dipakai?",
   "Kenapa grafik dengan sumbu vertikal yang tidak dimulai dari nol bisa menyesatkan?"
  ],
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
  "ringkas": "Membaca dan menafsirkan data yang disajikan dalam bentuk matriks",
  "subKonsep": [
   "Matriks sebagai susunan bilangan dalam baris dan kolom",
   "Ordo matriks, elemen a_ij, baris ke-i dan kolom ke-j",
   "Membaca data multi-kategori yang disajikan dalam bentuk matriks",
   "Menelusuri sumber data, ukuran sampel, dan metode pengambilan sampel suatu laporan",
   "Bias sampel, sampel sukarela, dan sampel tidak acak",
   "Pertanyaan survei yang menggiring jawaban",
   "Skala grafik yang menyesatkan dan sumbu yang terpotong",
   "Rata-rata mana yang dipakai dalam sebuah klaim"
  ],
  "rumus": [
   "A = [a_ij] berordo m x n dengan m baris dan n kolom",
   "a_ij adalah elemen pada baris ke-i dan kolom ke-j",
   "total baris ke-i = sigma_j a_ij",
   "total kolom ke-j = sigma_i a_ij"
  ],
  "miskonsepsi": [
   "Menganggap angka dalam berita pasti benar karena disertai grafik",
   "Membaca elemen a_23 sebagai baris ke-3 kolom ke-2",
   "Mengira survei daring dengan responden sangat banyak pasti mewakili populasi"
  ],
  "kenapa": [
   "Kenapa dua grafik yang dibuat dari data yang sama bisa memberi kesan berlawanan?",
   "Kenapa jumlah responden yang besar tidak menjamin hasil survei akurat?"
  ],
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
  "ringkas": "Mendaftar ruang sampel dengan tabel atau diagram pohon",
  "subKonsep": [
   "Percobaan, hasil percobaan, ruang sampel, dan titik sampel",
   "Kejadian sebagai himpunan bagian dari ruang sampel",
   "Mendaftar ruang sampel dengan tabel, diagram pohon, dan pasangan berurutan",
   "Peluang klasik untuk percobaan yang hasilnya berpeluang sama",
   "Rentang nilai peluang antara 0 dan 1",
   "Kejadian pasti, kejadian mustahil, dan komplemen kejadian",
   "Frekuensi relatif sebagai peluang empiris",
   "Hukum bilangan besar dan pentingnya ukuran percobaan"
  ],
  "rumus": [
   "P(A) = n(A) / n(S)",
   "0 <= P(A) <= 1",
   "P(S) = 1 dan P(himpunan kosong) = 0",
   "P(A komplemen) = 1 - P(A)",
   "frekuensi harapan = P(A) x banyak percobaan",
   "peluang empiris = banyak kemunculan kejadian / banyak percobaan"
  ],
  "miskonsepsi": [
   "Menganggap ruang sampel pelemparan dua dadu berisi 12 titik sampel, bukan 36",
   "Kekeliruan penjudi: mengira setelah muncul angka lima kali berturut-turut, gambar menjadi lebih mungkin muncul",
   "Menuliskan nilai peluang lebih dari 1 atau mencampur bentuk pecahan dengan persen tanpa konversi"
  ],
  "kenapa": [
   "Kenapa nilai peluang tidak pernah lebih dari 1?",
   "Kenapa koin yang sudah muncul angka lima kali tetap berpeluang 1/2 pada lemparan berikutnya?"
  ],
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
  "ringkas": "Menyusun tabel distribusi frekuensi dari data mentah",
  "subKonsep": [
   "Alasan mengelompokkan data ketika jumlahnya banyak",
   "Jangkauan data, banyak kelas, dan panjang kelas",
   "Aturan Sturges untuk menentukan banyak kelas",
   "Batas bawah, batas atas, tepi bawah, tepi atas, dan titik tengah kelas",
   "Tabel distribusi frekuensi kumulatif kurang dari dan lebih dari",
   "Histogram dengan batang berdempet karena data bersifat kontinu",
   "Poligon frekuensi dan ogif",
   "Bentuk distribusi: simetris, menceng ke kanan, menceng ke kiri, dua puncak"
  ],
  "rumus": [
   "jangkauan J = x_maks - x_min",
   "banyak kelas k = 1 + 3,3 log n (aturan Sturges)",
   "panjang kelas p = J / k",
   "tepi bawah = batas bawah - 0,5 (untuk data bulat)",
   "titik tengah kelas = (batas bawah + batas atas) / 2"
  ],
  "miskonsepsi": [
   "Menggambar histogram dengan batang berjarak seperti diagram batang",
   "Memakai batas kelas, bukan tepi kelas, sebagai lebar batang histogram",
   "Menyusun kelas yang tumpang tindih atau menyisakan nilai yang tak masuk kelas mana pun"
  ],
  "kenapa": [
   "Kenapa batang histogram menempel sedangkan diagram batang tidak?",
   "Kenapa mengelompokkan data membuat kita kehilangan sebagian informasi tetapi tetap berguna?"
  ],
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
  "ringkas": "Menyusun tabel frekuensi dua arah dari data mentah",
  "subKonsep": [
   "Data kategorikal dua variabel dan tabel kontingensi baris-kolom",
   "Frekuensi bersama (joint), frekuensi marginal, dan frekuensi kondisional",
   "Frekuensi relatif dan persentase",
   "Membandingkan proporsi antar-kelompok yang ukurannya berbeda",
   "Mengenali ada tidaknya asosiasi antara dua variabel kategorikal",
   "Penyajian dengan diagram batang bersusun dan diagram batang berdampingan",
   "Kehati-hatian menafsirkan proporsi dari kelompok berukuran kecil"
  ],
  "rumus": [
   "frekuensi relatif bersama = n_ij / N",
   "frekuensi relatif marginal baris = (total baris i) / N",
   "frekuensi relatif kondisional terhadap baris = n_ij / (total baris i)",
   "frekuensi relatif kondisional terhadap kolom = n_ij / (total kolom j)",
   "N = jumlah seluruh frekuensi"
  ],
  "miskonsepsi": [
   "Membandingkan jumlah mentah alih-alih proporsi ketika ukuran kelompok berbeda",
   "Menghitung persentase terhadap total keseluruhan padahal seharusnya terhadap total baris",
   "Menyimpulkan adanya asosiasi hanya dari satu sel tabel"
  ],
  "kenapa": [
   "Kenapa membandingkan persentase lebih adil daripada membandingkan jumlah mentah?",
   "Kenapa frekuensi kondisional terhadap baris dan terhadap kolom bisa memberi kesan berbeda?"
  ],
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
  "ringkas": "Menghitung mean, median, dan modus untuk data tunggal dan data kelompok",
  "subKonsep": [
   "Mean sebagai titik keseimbangan data",
   "Median sebagai nilai tengah setelah data diurutkan",
   "Modus sebagai nilai yang paling sering muncul",
   "Mean data tunggal, mean berbobot, dan mean gabungan",
   "Mean data kelompok dengan titik tengah kelas dan dengan rataan sementara",
   "Kelas median dan kelas modus pada data kelompok",
   "Pengaruh pencilan terhadap mean dibanding terhadap median",
   "Memilih ukuran pemusatan yang paling mewakili sesuai bentuk distribusi"
  ],
  "rumus": [
   "mean = (jumlah seluruh data) / n",
   "mean data kelompok = (sigma f_i x_i) / (sigma f_i)",
   "mean gabungan = (n1 x rata1 + n2 x rata2) / (n1 + n2)",
   "Me = Tb + p((n/2 - F) / f)",
   "Mo = Tb + p(d1 / (d1 + d2))"
  ],
  "miskonsepsi": [
   "Menghitung median tanpa mengurutkan data terlebih dahulu",
   "Menganggap modus selalu ada dan selalu tunggal",
   "Menghitung mean gabungan dengan merata-rata dua rata-rata tanpa memperhatikan banyak datanya"
  ],
  "kenapa": [
   "Kenapa gaji rata-rata sering menyesatkan dibanding gaji median?",
   "Kenapa mean bisa berupa bilangan yang mustahil ada di data, misalnya 2,3 anak per keluarga?"
  ],
  "konsep": [
   "rata-rata-menipu"
  ],
  "prasyarat": [
   "sma10-tabel-distribusi-frekuensi-dan-histogram",
   "smp9-pengaruh-perubahan-data-terhadap-ukuran",
   "sma10-jenis-data-dan-penyajian-data"
  ]
 },
 {
  "id": "sma10-ukuran-penempatan-kuartil-desil-dan",
  "judul": "Ukuran Penempatan: Kuartil, Desil, dan Persentil",
  "kelas": 10,
  "fase": "E",
  "domain": "data",
  "ringkas": "Menentukan kuartil data tunggal dan data kelompok",
  "subKonsep": [
   "Membagi data terurut menjadi bagian-bagian yang sama banyak",
   "Kuartil bawah Q1, kuartil tengah Q2 (median), dan kuartil atas Q3",
   "Desil dan persentil",
   "Perbedaan letak kuartil dengan nilai kuartil",
   "Kuartil data tunggal untuk n ganjil dan n genap",
   "Kuartil dan persentil pada data kelompok dengan interpolasi",
   "Menaksir kuartil dari ogif",
   "Menafsirkan persentil dalam konteks nyata: kurva pertumbuhan anak, peringkat nilai ujian"
  ],
  "rumus": [
   "letak Q_i = i(n + 1)/4 untuk data tunggal",
   "Q_i = Tb + p((i n / 4 - F) / f) untuk data kelompok",
   "P_i = Tb + p((i n / 100 - F) / f)",
   "D_i = Tb + p((i n / 10 - F) / f)",
   "Q2 = median"
  ],
  "miskonsepsi": [
   "Menyebut letak kuartil sebagai nilai kuartil",
   "Menganggap Q2 selalu sama dengan mean",
   "Mengira persentil ke-90 berarti nilainya 90"
  ],
  "kenapa": [
   "Kenapa kuartil dibutuhkan padahal sudah ada rata-rata?",
   "Kenapa persentil ke-90 tidak berarti nilai 90?"
  ],
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
  "ringkas": "Menghitung IQR dan simpangan baku untuk data tunggal dan kelompok",
  "subKonsep": [
   "Alasan ukuran pemusatan saja tidak cukup menggambarkan data",
   "Jangkauan (range) dan kelemahannya terhadap pencilan",
   "Jangkauan interkuartil (IQR) dan ketahanannya terhadap pencilan",
   "Simpangan kuartil (jangkauan semi interkuartil)",
   "Simpangan rata-rata dengan nilai mutlak",
   "Ragam (varians) dan alasan simpangan dikuadratkan",
   "Simpangan baku dan alasan hasilnya diakarkan kembali",
   "Ragam populasi dengan pembagi n dan ragam sampel dengan pembagi n - 1"
  ],
  "rumus": [
   "jangkauan R = x_maks - x_min",
   "IQR = Q3 - Q1",
   "simpangan kuartil Qd = (Q3 - Q1) / 2",
   "ragam s^2 = (sigma (x_i - mean)^2) / n",
   "simpangan baku s = akar(s^2)",
   "ragam data kelompok = (sigma f_i (x_i - mean)^2) / (sigma f_i)"
  ],
  "miskonsepsi": [
   "Menjumlahkan simpangan tanpa mengkuadratkan sehingga hasilnya selalu nol",
   "Menganggap simpangan baku bisa bernilai negatif",
   "Membandingkan simpangan baku dua kelompok yang satuannya berbeda"
  ],
  "kenapa": [
   "Kenapa simpangan terhadap mean dikuadratkan, bukan sekadar diambil nilai mutlaknya?",
   "Kenapa jumlah semua simpangan terhadap mean selalu nol?"
  ],
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
  "ringkas": "Menyederhanakan ekspresi trigonometri menggunakan identitas dasar",
  "subKonsep": [
   "Dua sudut lancip pada segitiga siku-siku selalu berjumlah 90 derajat",
   "Sinus suatu sudut sama dengan cosinus penyikunya dan sebaliknya",
   "Asal usul nama cosinus sebagai sinus komplemen",
   "Identitas Pythagoras sin kuadrat ditambah cos kuadrat sama dengan 1 dan pembuktiannya",
   "Identitas turunan yang melibatkan tangen dan secan",
   "Menentukan nilai perbandingan lain jika satu nilai diketahui",
   "Penulisan pangkat pada fungsi trigonometri"
  ],
  "rumus": [
   "sin A = cos(90 derajat - A)",
   "cos A = sin(90 derajat - A)",
   "tan A = 1 / tan(90 derajat - A)",
   "sin^2 A + cos^2 A = 1",
   "1 + tan^2 A = sec^2 A",
   "1 + cot^2 A = cosec^2 A"
  ],
  "miskonsepsi": [
   "Menuliskan sin^2 A sebagai sin(A^2)",
   "Menganggap sin A + cos A = 1 alih-alih sin kuadrat ditambah cos kuadrat",
   "Mengira sin(90 - A) sama dengan 90 - sin A"
  ],
  "kenapa": [
   "Kenapa sinus dan cosinus saling bertukar nilai pada dua sudut yang saling berpenyiku?",
   "Kenapa sin kuadrat ditambah cos kuadrat selalu sama dengan 1, dan apa hubungannya dengan teorema Pythagoras?"
  ],
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
  "ringkas": "Membuat sketsa segitiga siku-siku dari deskripsi verbal",
  "subKonsep": [
   "Garis horizontal acuan dan garis pandang pengamat",
   "Sudut elevasi untuk pandangan ke atas dan sudut depresi untuk pandangan ke bawah",
   "Kesamaan besar sudut elevasi dan sudut depresi karena sudut dalam berseberangan",
   "Klinometer sederhana sebagai alat ukur sudut",
   "Menghitung tinggi benda yang tidak terjangkau",
   "Menghitung jarak mendatar dari sudut dan tinggi",
   "Masalah dua posisi pengamatan yang memerlukan dua persamaan",
   "Menambahkan tinggi mata pengamat pada hasil akhir"
  ],
  "rumus": [
   "tinggi = jarak mendatar x tan(sudut elevasi)",
   "tinggi total = tinggi mata pengamat + jarak x tan(theta)",
   "jarak mendatar = tinggi / tan(theta)",
   "jarak miring (garis pandang) = tinggi / sin(theta)"
  ],
  "miskonsepsi": [
   "Mengukur sudut elevasi dari garis vertikal, bukan dari garis horizontal",
   "Melupakan tinggi mata pengamat sehingga hasil kurang dari seharusnya",
   "Memakai sinus padahal data yang tersedia adalah sisi samping dan sisi depan"
  ],
  "kenapa": [
   "Kenapa sudut depresi dari puncak menara sama besar dengan sudut elevasi dari kaki pengamat?",
   "Kenapa tinggi gedung bisa diukur tanpa memanjatnya?"
  ],
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
  "ringkas": "Menurunkan nilai sudut istimewa secara geometris, bukan sekadar menghafal tabel",
  "subKonsep": [
   "Menurunkan nilai sudut 45 derajat dari segitiga siku-siku sama kaki",
   "Menurunkan nilai sudut 30 dan 60 derajat dari segitiga sama sisi yang dibagi dua",
   "Nilai perbandingan untuk sudut 0 dan 90 derajat",
   "Tabel sudut istimewa dan pola nilai sinus akar 0/2, akar 1/2, akar 2/2, akar 3/2, akar 4/2",
   "Alasan tangen 90 derajat tidak terdefinisi",
   "Menyatakan hasil dalam bentuk akar yang sudah dirasionalkan",
   "Menghitung nilai eksak tanpa kalkulator"
  ],
  "rumus": [
   "sin 30 = 1/2; cos 30 = akar(3)/2; tan 30 = akar(3)/3",
   "sin 45 = akar(2)/2; cos 45 = akar(2)/2; tan 45 = 1",
   "sin 60 = akar(3)/2; cos 60 = 1/2; tan 60 = akar(3)",
   "sin 0 = 0; cos 0 = 1; tan 0 = 0",
   "sin 90 = 1; cos 90 = 0; tan 90 tidak terdefinisi"
  ],
  "miskonsepsi": [
   "Menghafal tabel tanpa mengetahui asalnya sehingga nilai 30 dan 60 derajat tertukar",
   "Menuliskan tan 90 sebagai 0 atau sebagai bilangan tertentu",
   "Menganggap sin 60 sama dengan dua kali sin 30"
  ],
  "kenapa": [
   "Dari mana nilai sin 30 = 1/2 berasal, dan kenapa persis setengah?",
   "Kenapa tan 90 derajat tidak terdefinisi?"
  ],
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
  "ringkas": "Menuliskan ketiga perbandingan trigonometri dari gambar segitiga siku-siku",
  "subKonsep": [
   "Definisi sinus, cosinus, dan tangen pada segitiga siku-siku",
   "Alasan nilai perbandingan hanya bergantung pada besar sudut, bukan ukuran segitiga (kesebangunan)",
   "Jembatan ingatan sindemi, cosami, tandesa dan bahayanya jika tanpa pemahaman",
   "Perbandingan kebalikan: cosecan, secan, cotangen",
   "Rentang nilai sinus dan cosinus untuk sudut lancip antara 0 dan 1",
   "Hubungan tangen sebagai perbandingan sinus terhadap cosinus",
   "Menentukan besar sudut dari nilai perbandingannya dengan fungsi invers pada kalkulator"
  ],
  "rumus": [
   "sin A = sisi depan / sisi miring",
   "cos A = sisi samping / sisi miring",
   "tan A = sisi depan / sisi samping",
   "tan A = sin A / cos A",
   "cosec A = 1 / sin A; sec A = 1 / cos A; cot A = 1 / tan A",
   "0 < sin A < 1 dan 0 < cos A < 1 untuk sudut lancip A"
  ],
  "miskonsepsi": [
   "Menganggap sin adalah bilangan yang dikalikan sudut, sehingga menulis sin 30 sebagai sin dikali 30",
   "Salah menentukan sisi depan dan sisi samping karena tidak memperhatikan sudut acuan",
   "Menuliskan nilai sinus lebih besar dari 1 tanpa merasa janggal"
  ],
  "kenapa": [
   "Kenapa nilai sin 30 selalu 0,5 berapa pun ukuran segitiganya?",
   "Kenapa nilai sinus dan cosinus tidak pernah lebih besar dari 1?"
  ],
  "konsep": [
   "sin-cos-lingkaran"
  ],
  "prasyarat": [
   "smp8-teorema-pythagoras",
   "smp7-rasio-dan-perbandingan",
   "smp8-bentuk-akar-dan-bilangan-irasional"
  ]
 },
 {
  "id": "sma10-satuan-sudut-derajat-dan-radian",
  "judul": "Satuan Sudut: Derajat dan Radian",
  "kelas": 10,
  "fase": "E",
  "domain": "geometri",
  "ringkas": "Mengonversi ukuran sudut antara derajat dan radian",
  "subKonsep": [
   "Sudut sebagai besar putaran",
   "Satu putaran penuh 360 derajat dan asal usul historisnya",
   "Satuan derajat, menit, dan detik busur",
   "Radian sebagai perbandingan panjang busur terhadap jari-jari",
   "Alasan radian tidak bersatuan (perbandingan dua panjang)",
   "Konversi derajat ke radian dan sebaliknya",
   "Panjang busur dan luas juring dalam ukuran radian",
   "Mode DEG dan RAD pada kalkulator ilmiah"
  ],
  "rumus": [
   "180 derajat = pi radian",
   "1 radian = 180/pi derajat, kira-kira 57,3 derajat",
   "theta dalam radian = s / r",
   "panjang busur s = r x theta",
   "luas juring = (1/2) r^2 theta",
   "derajat ke radian: kalikan pi/180"
  ],
  "miskonsepsi": [
   "Menghitung sin 30 dalam mode radian tanpa menyadari kalkulator salah mode",
   "Menganggap lambang pi selalu berarti 180 dalam segala konteks",
   "Mengalikan dengan 180/pi padahal seharusnya pi/180"
  ],
  "kenapa": [
   "Kenapa satu putaran penuh dibagi 360, bukan 100?",
   "Kenapa radian dianggap satuan sudut yang alami dalam matematika?"
  ],
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
  "ringkas": "Mengidentifikasi sisi depan, samping, dan miring relatif terhadap sudut acuan tertentu",
  "subKonsep": [
   "Unsur segitiga siku-siku: sisi miring (hipotenusa), sisi depan, dan sisi samping relatif terhadap sudut acuan",
   "Teorema Pythagoras dan pembuktiannya lewat penyusunan luas persegi",
   "Kebalikan teorema Pythagoras untuk menguji kesikuan segitiga",
   "Tripel Pythagoras yang sering muncul",
   "Kesebangunan segitiga berdasarkan kesamaan sudut",
   "Perbandingan sisi-sisi bersesuaian pada segitiga sebangun bernilai tetap",
   "Jarak dua titik pada bidang koordinat Kartesius"
  ],
  "rumus": [
   "a^2 + b^2 = c^2 dengan c sisi miring",
   "jarak dua titik = akar((x2 - x1)^2 + (y2 - y1)^2)",
   "tripel Pythagoras: (3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25)",
   "segitiga sebangun: sisi-sisi bersesuaian sebanding"
  ],
  "miskonsepsi": [
   "Selalu menulis sisi terpanjang sebagai c tanpa memeriksa letak sudut siku-siku",
   "Menerapkan teorema Pythagoras pada segitiga yang bukan siku-siku",
   "Menganggap sisi depan dan sisi samping tetap sama meskipun sudut acuannya berganti"
  ],
  "kenapa": [
   "Kenapa a^2 + b^2 = c^2 bisa dibuktikan hanya dengan menyusun ulang potongan luas persegi?",
   "Kenapa dua segitiga yang sudut-sudutnya sama pasti punya perbandingan sisi yang sama?"
  ],
  "prasyarat": [
   "smp8-bentuk-akar-dan-bilangan-irasional",
   "sma10-himpunan-bilangan-real-dan-garis"
  ]
 }
]

export default topik
