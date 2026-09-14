/* ============================================================
   Visual MTK — Rincian topik kelas 4 (DIHASILKAN OTOMATIS)

   Jangan sunting berkas ini dengan tangan.
   Sumber: docs/riset/ (riset Capaian Pembelajaran Kepka BSKAP
   Kemendikdasmen No. 046/H/KR/2025).
   Bangun ulang: npm run bangun:kurikulum
   ============================================================ */

import type { TopikKurikulum } from '../kurikulum'

const topik: TopikKurikulum[] = [
 {
  "id": "sd4-pola-bilangan-membesar-dan-mengecil",
  "judul": "Pola Bilangan Membesar dan Mengecil",
  "kelas": 4,
  "fase": "B",
  "domain": "aljabar",
  "ringkas": "Mengidentifikasi pola bilangan membesar dan mengecil yang melibatkan penjumlahan dan pengurangan pada bilangan cacah sampai 100",
  "subKonsep": [
   "Barisan bilangan dan istilah suku",
   "Pola membesar dengan penambahan tetap (2, 5, 8, 11, ...)",
   "Pola mengecil dengan pengurangan tetap (50, 45, 40, ...)",
   "Menentukan beda antar suku",
   "Melengkapi suku yang hilang di tengah barisan",
   "Pola bilangan pada kalender, nomor rumah, dan tabel perkalian",
   "Pengenalan pola yang bukan penambahan tetap (bilangan segitiga, bilangan kuadrat) sebagai pengayaan"
  ],
  "rumus": [
   "Beda = U(n+1) - U(n)",
   "U(n) = U(1) + (n - 1) x beda untuk pola dengan beda tetap"
  ],
  "miskonsepsi": [
   "Menebak suku berikutnya hanya dari dua suku pertama tanpa memeriksa keseluruhan barisan",
   "Mengira semua barisan bilangan pasti berpola penambahan tetap",
   "Salah menghitung beda pada pola mengecil sehingga tandanya terbalik"
  ],
  "kenapa": [
   "Kenapa dua suku saja belum cukup untuk memastikan aturan sebuah pola?",
   "Kenapa pola 2, 5, 8, 11 punya 'beda' 3, dan bagaimana beda itu membantu meramal suku ke-20?"
  ],
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
  "ringkas": "Mengidentifikasi pola gambar membesar dan mengecil yang melibatkan penjumlahan dan pengurangan bilangan cacah sampai 100",
  "subKonsep": [
   "Unsur berulang (motif) pada pola gambar",
   "Pola bertumbuh: banyak unsur bertambah/berkurang tetap tiap suku",
   "Pola pada susunan benda (batang korek, kelereng, ubin)",
   "Menemukan aturan pola dan menyatakannya dengan kata-kata",
   "Menghubungkan urutan suku dengan banyak unsurnya (tabel suku)",
   "Melanjutkan dan membuat pola sendiri",
   "Pola pada motif batik, anyaman, dan ubin sebagai konteks Indonesia"
  ],
  "rumus": [
   "Pola bertumbuh tetap: suku ke-n = suku pertama + (n - 1) x beda",
   "Beda = suku berikutnya - suku sebelumnya"
  ],
  "miskonsepsi": [
   "Melanjutkan pola hanya dengan meniru bentuk visual tanpa memeriksa aturan penambahannya",
   "Mengira semua pola pasti bertambah dengan bilangan yang sama, sehingga memaksakan pola aritmetika pada pola yang lain",
   "Menghitung ulang seluruh gambar tiap suku, tidak melihat struktur penambahannya"
  ],
  "kenapa": [
   "Kenapa kita bisa tahu gambar ke-10 tanpa menggambar sembilan gambar sebelumnya?",
   "Kenapa pola batik dan anyaman sebenarnya adalah matematika?"
  ],
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
  "ringkas": "Menyebutkan dan mencontohkan sifat komutatif, asosiatif, dan distributif",
  "subKonsep": [
   "Sifat komutatif (pertukaran) pada penjumlahan dan perkalian",
   "Sifat asosiatif (pengelompokan) pada penjumlahan dan perkalian",
   "Sifat distributif perkalian terhadap penjumlahan dan pengurangan",
   "Unsur identitas: 0 pada penjumlahan, 1 pada perkalian",
   "Sifat nol pada perkalian",
   "Pengurangan dan pembagian tidak komutatif dan tidak asosiatif",
   "Memanfaatkan sifat-sifat untuk berhitung lebih cepat"
  ],
  "rumus": [
   "a + b = b + a; a x b = b x a",
   "(a + b) + c = a + (b + c); (a x b) x c = a x (b x c)",
   "a x (b + c) = (a x b) + (a x c)",
   "a + 0 = a; a x 1 = a; a x 0 = 0"
  ],
  "miskonsepsi": [
   "Menerapkan sifat komutatif pada pengurangan dan pembagian, misalnya menganggap 8 - 3 = 3 - 8",
   "Menganggap sifat distributif berlaku juga sebagai a + (b x c) = (a + b) x (a + c)",
   "Mengira a x 1 = 0 atau a + 0 = 0 karena mencampur aturan identitas penjumlahan dan perkalian"
  ],
  "kenapa": [
   "Kenapa 4 + 7 = 7 + 4 tetapi 7 - 4 tidak sama dengan 4 - 7?",
   "Kenapa 25 x 8 lebih mudah dihitung sebagai 25 x 4 x 2?"
  ],
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
  "ringkas": "Membaca dan membuat garis bilangan dengan skala yang sesuai",
  "subKonsep": [
   "Garis bilangan berskala satuan, puluhan, ratusan, dan ribuan",
   "Menentukan posisi bilangan pada garis bilangan berskala",
   "Bilangan patokan (benchmark) 0, 500, 1.000, 5.000, 10.000",
   "Pembulatan ke puluhan, ratusan, dan ribuan terdekat",
   "Estimasi hasil penjumlahan dan pengurangan sebelum menghitung",
   "Memeriksa kewajaran jawaban dengan estimasi"
  ],
  "rumus": [
   "Lihat angka satu tempat di kanan tempat yang dituju: 0-4 dibulatkan turun, 5-9 dibulatkan naik",
   "Estimasi jumlah: bulatkan tiap bilangan lalu jumlahkan"
  ],
  "miskonsepsi": [
   "Membulatkan berdasarkan angka terakhir saja, misalnya 1.247 dibulatkan ke ratusan menjadi 1.250",
   "Mengira hasil estimasi salah karena tidak sama persis dengan hasil hitung",
   "Membulatkan berulang secara bertingkat, misalnya 1.247 -> 1.250 -> 1.300"
  ],
  "kenapa": [
   "Kenapa 1.247 lebih dekat ke 1.200 daripada ke 1.300, dan bagaimana garis bilangan menunjukkannya?",
   "Kenapa angka 5 dibulatkan ke atas, padahal jaraknya sama ke kiri dan ke kanan?"
  ],
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
  "ringkas": "Menuliskan kelipatan suatu bilangan dengan notasi titik-titik (2, 4, 6, 8, ...)",
  "subKonsep": [
   "Kelipatan suatu bilangan dan sifatnya yang tak berhingga",
   "Faktor suatu bilangan sebagai pembagi yang habis membagi",
   "Konsep 'habis dibagi' (sisa nol)",
   "1 dan bilangan itu sendiri selalu menjadi faktor",
   "Faktor selalu berpasangan (larik/pasangan faktor)",
   "Pengenalan bilangan prima dan bilangan komposit",
   "Ciri bilangan habis dibagi 2, 5, dan 10",
   "Kelipatan persekutuan dan faktor persekutuan secara pengenalan"
  ],
  "rumus": [
   "b adalah faktor dari a jika a : b bersisa 0",
   "Kelipatan a = a x 1, a x 2, a x 3, ... (tak berhingga)",
   "Jika a = b x c, maka b dan c berpasangan sebagai faktor dari a"
  ],
  "miskonsepsi": [
   "Menuliskan kelipatan 2 sebagai '2, 4, 6' tanpa titik-titik, seolah kelipatan itu berhingga (miskonsepsi eksplisit di Buku Panduan Guru Kelas IV)",
   "Menganggap hasil bagi boleh berupa desimal saat mencari faktor; faktor harus menghasilkan pembagian tanpa sisa (dicatat di Buku Panduan Guru Kelas IV)",
   "Lupa memasukkan 1 dan bilangan itu sendiri sebagai faktor (dicatat di Buku Panduan Guru Kelas IV)"
  ],
  "kenapa": [
   "Kenapa kelipatan suatu bilangan tidak pernah habis, tetapi faktornya selalu berhingga?",
   "Kenapa 1 dan bilangan itu sendiri selalu menjadi faktor dari bilangan apa pun?"
  ],
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
  "ringkas": "Menyusun bilangan dari kumpulan nilai tempat yang diberikan",
  "subKonsep": [
   "Komposisi: menyusun bilangan dari bagian-bagiannya",
   "Dekomposisi: mengurai bilangan menjadi jumlah bagian-bagian",
   "Dekomposisi berdasarkan nilai tempat (3.478 = 3.000 + 400 + 70 + 8)",
   "Dekomposisi tidak baku untuk memudahkan hitung (3.478 = 3.500 - 22)",
   "Banyak cara mengurai bilangan yang sama",
   "Hubungan komposisi-dekomposisi dengan strategi berhitung mental"
  ],
  "rumus": [
   "Bentuk baku: N = (ribuan x 1.000) + (ratusan x 100) + (puluhan x 10) + satuan",
   "Komposisi dan dekomposisi tidak mengubah nilai bilangan (kekekalan bilangan)"
  ],
  "miskonsepsi": [
   "Bingung membedakan menyusun (komposisi) dan mengurai (dekomposisi) sebagai istilah (miskonsepsi eksplisit di Buku Panduan Guru Kelas IV)",
   "Mengira satu bilangan hanya punya satu cara diurai, yaitu berdasarkan nilai tempat",
   "Menganggap dekomposisi harus selalu berupa penjumlahan bilangan yang makin kecil berurutan"
  ],
  "kenapa": [
   "Kenapa satu bilangan bisa diurai dengan banyak cara, dan kenapa itu berguna?",
   "Kenapa mengurai 1.998 menjadi 2.000 - 2 membuat penjumlahan jadi jauh lebih cepat?"
  ],
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
  "ringkas": "Membandingkan dua bilangan cacah empat angka dengan tanda <, >, =",
  "subKonsep": [
   "Tanda <, >, dan = untuk membandingkan dua bilangan",
   "Aturan membandingkan: banyak angka dulu, lalu dari nilai tempat terbesar",
   "Mengurutkan bilangan dari terkecil ke terbesar (naik) dan sebaliknya (turun)",
   "Garis bilangan sebagai model urutan bilangan cacah",
   "Menyisipkan bilangan di antara dua bilangan yang diberikan"
  ],
  "rumus": [
   "a < b jika a terletak di kiri b pada garis bilangan",
   "Bandingkan digit dari nilai tempat terbesar; digit pertama yang berbeda menentukan hasilnya"
  ],
  "miskonsepsi": [
   "Membandingkan dua bilangan empat angka dimulai dari satuan, lalu puluhan, ratusan, baru ribuan; seharusnya dimulai dari nilai tempat terbesar (miskonsepsi eksplisit di Buku Panduan Guru Kelas III dan IV)",
   "Menganggap bilangan dengan angka terbesar di suatu tempat pasti lebih besar, misalnya 1.900 dianggap lebih besar daripada 2.100 karena melihat angka 9",
   "Membaca tanda < dan > terbalik karena menghafal 'buaya' tanpa memahami maknanya"
  ],
  "kenapa": [
   "Kenapa membandingkan bilangan harus dimulai dari angka paling kiri, bukan paling kanan seperti saat menjumlah?",
   "Kenapa 999 lebih kecil daripada 1.000 padahal angka 9 lebih besar daripada 1?"
  ],
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
  "ringkas": "Membandingkan dua pecahan berpenyebut sama dengan tanda <, >, =",
  "subKonsep": [
   "Pecahan berpenyebut sama sebagai banyaknya potongan berukuran sama",
   "Membandingkan pecahan berpenyebut sama dengan melihat pembilangnya",
   "Mengurutkan pecahan berpenyebut sama",
   "Pecahan yang bernilai 1 (misalnya 5/5) dan pecahan lebih dari 1",
   "Menempatkan pecahan berpenyebut sama pada garis bilangan",
   "Pengenalan penjumlahan dan pengurangan pecahan berpenyebut sama secara intuitif"
  ],
  "rumus": [
   "Jika penyebut sama: a/c < b/c bila a < b",
   "n/n = 1",
   "a/c + b/c = (a+b)/c"
  ],
  "miskonsepsi": [
   "Membandingkan pecahan dengan menjumlahkan pembilang dan penyebut, misalnya 3/8 dibanding 5/8 dengan membandingkan 11 dan 13",
   "Menerapkan aturan 'penyebut lebih besar berarti pecahan lebih kecil' pada pecahan berpenyebut sama",
   "Mengira 8/8 bukan bilangan utuh 1"
  ],
  "kenapa": [
   "Kenapa kalau penyebutnya sama, cukup membandingkan pembilangnya?",
   "Kenapa 5/5 sama dengan 1? Apa artinya kalau semua potongan diambil?"
  ],
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
  "ringkas": "Menentukan nilai tempat dan nilai angka pada bilangan sampai 10.000",
  "subKonsep": [
   "Tempat satuan, puluhan, ratusan, ribuan, dan puluhan ribu",
   "Perbedaan angka (digit), tempat, dan nilai angka",
   "Bentuk panjang (notasi terurai) suatu bilangan",
   "Prinsip nilai tempat: nilai satu tempat sepuluh kali nilai tempat di sebelah kanannya",
   "Membaca tabel nilai tempat dan mengisinya dengan benar",
   "Nilai tempat sebagai dasar semua algoritma bersusun"
  ],
  "rumus": [
   "3.478 = 3 x 1.000 + 4 x 100 + 7 x 10 + 8 x 1",
   "Nilai angka = angka x nilai tempatnya"
  ],
  "miskonsepsi": [
   "Mengisi tabel nilai tempat dengan nilainya, bukan angkanya: 1.234 ditulis 1.000 | 200 | 30 | 4 di kolom ribuan-ratusan-puluhan-satuan (miskonsepsi yang dicatat Buku Panduan Guru Kelas III dan IV)",
   "Membaca 2.345 sebagai 'dua ribuan tiga ratusan empat puluhan lima' alih-alih 'dua ribu tiga ratus empat puluh lima'",
   "Menganggap 'angka' dan 'nilai angka' adalah hal yang sama, sehingga angka 3 pada 3.478 dianggap bernilai 3"
  ],
  "kenapa": [
   "Kenapa angka yang sama (misalnya 7) bisa punya nilai berbeda tergantung letaknya?",
   "Kenapa setiap kali kita bergeser satu tempat ke kiri, nilainya dikalikan 10 dan bukan ditambah 10?"
  ],
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
  "ringkas": "Membandingkan dua pecahan dengan pembilang satu menggunakan gambar dan simbol",
  "subKonsep": [
   "Pecahan sebagai bagian dari keseluruhan yang dibagi sama besar",
   "Arti pembilang dan penyebut",
   "Pecahan satuan 1/2, 1/3, 1/4, 1/5, ... dan model daerahnya",
   "Membandingkan pecahan satuan: makin besar penyebut, makin kecil bagiannya",
   "Mengurutkan pecahan satuan",
   "Pecahan pada garis bilangan antara 0 dan 1",
   "Keseluruhan (satu utuh) harus jelas dan sama untuk membandingkan"
  ],
  "rumus": [
   "1/n adalah satu bagian dari n bagian sama besar",
   "Jika a < b maka 1/a > 1/b",
   "n x (1/n) = 1"
  ],
  "miskonsepsi": [
   "Mengira 1/5 lebih besar daripada 1/3 karena 5 lebih besar daripada 3 (miskonsepsi paling umum di kelas 4 Indonesia)",
   "Menganggap potongan tidak perlu sama besar asalkan jumlah potongannya benar",
   "Membandingkan pecahan dari dua keseluruhan yang ukurannya berbeda (setengah roti besar dibandingkan setengah roti kecil)"
  ],
  "kenapa": [
   "Kenapa 1/3 lebih besar daripada 1/4 padahal 3 lebih kecil daripada 4?",
   "Kenapa potongan pecahan harus sama besar? Apa yang salah kalau kue dipotong asal-asalan?"
  ],
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
  "ringkas": "Menyatakan pecahan desimal persepuluhan dan perseratusan dalam bentuk desimal",
  "subKonsep": [
   "Pecahan persepuluhan (1/10) dan perseratusan (1/100)",
   "Penulisan desimal 0,1 dan 0,01 serta cara membacanya",
   "Nilai tempat persepuluhan dan perseratusan sebagai perluasan tabel nilai tempat",
   "Model kotak seratus (hundred grid) dan garis bilangan desimal",
   "Mengubah pecahan persepuluhan/perseratusan menjadi desimal dan sebaliknya",
   "Membandingkan dan mengurutkan desimal sederhana",
   "Penggunaan koma sebagai tanda desimal dalam penulisan Indonesia"
  ],
  "rumus": [
   "0,1 = 1/10 dan 0,01 = 1/100",
   "a/10 = 0,a dan a/100 = 0,0a (untuk a satu angka)",
   "0,5 = 5/10 = 50/100 = 1/2"
  ],
  "miskonsepsi": [
   "Menganggap 0,25 lebih besar daripada 0,7 karena 25 lebih besar daripada 7 (miskonsepsi 'desimal terpanjang terbesar')",
   "Membaca 0,25 sebagai 'nol koma dua puluh lima' lalu memperlakukannya sebagai bilangan bulat 25",
   "Mengira 0,5 dan 0,50 adalah bilangan yang berbeda"
  ],
  "kenapa": [
   "Kenapa 0,7 lebih besar daripada 0,25 padahal angka 25 lebih besar daripada 7?",
   "Kenapa 0,5 dan 0,50 bernilai sama, tetapi 5 dan 50 tidak?"
  ],
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
  "ringkas": "Mengenali pecahan senilai menggunakan gambar dan simbol matematika",
  "subKonsep": [
   "Pecahan berbeda yang menyatakan bagian sama besar",
   "Menemukan pecahan senilai dengan gambar (melipat kertas, membagi ulang model daerah)",
   "Aturan mengalikan atau membagi pembilang dan penyebut dengan bilangan yang sama",
   "Menyederhanakan pecahan ke bentuk paling sederhana",
   "Pecahan senilai pada garis bilangan menempati titik yang sama",
   "Penerapan pecahan senilai untuk membandingkan pecahan berpenyebut berbeda"
  ],
  "rumus": [
   "a/b = (a x k)/(b x k) untuk k bukan nol",
   "a/b = (a : k)/(b : k) bila k faktor persekutuan a dan b",
   "a/b = c/d jika dan hanya jika a x d = b x c"
  ],
  "miskonsepsi": [
   "Menambahkan bilangan yang sama pada pembilang dan penyebut, misalnya menganggap 1/2 senilai dengan 2/3 karena sama-sama ditambah 1",
   "Mengira mengalikan pembilang dan penyebut membuat pecahan menjadi lebih besar karena angkanya membesar",
   "Menganggap 2/4 dan 1/2 adalah dua bilangan berbeda karena tulisannya berbeda"
  ],
  "kenapa": [
   "Kenapa 1/2 = 2/4 = 3/6 padahal angkanya jelas berbeda?",
   "Kenapa mengalikan pembilang dan penyebut dengan bilangan yang sama tidak mengubah nilai pecahan, tetapi menambahkan bilangan yang sama justru mengubahnya?"
  ],
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
  "ringkas": "Membagi bilangan cacah sampai 100 dengan benda konkret, gambar, dan simbol",
  "subKonsep": [
   "Pembagian bilangan dua angka oleh bilangan satu angka",
   "Teknik pembagian bersusun (porogapet) langkah demi langkah",
   "Pembagian dengan hasil yang memuat angka 0, misalnya 105 : 5",
   "Pembagian bersisa dan cara menafsirkan sisanya dalam konteks",
   "Memeriksa hasil pembagian dengan perkalian",
   "Estimasi hasil bagi sebelum menghitung"
  ],
  "rumus": [
   "a : b = c sisa r, dengan a = b x c + r dan 0 <= r < b",
   "Cek: (pembagi x hasil bagi) + sisa = bilangan yang dibagi"
  ],
  "miskonsepsi": [
   "Pada pembagian bilangan yang memuat angka 0, murid lupa membagi angka 0 yang terletak di posisi puluhan sehingga hasilnya kehilangan satu digit (miskonsepsi eksplisit di Buku Panduan Guru Kelas IV)",
   "Tertukar menyebut hasil bagi dan sisa bagi",
   "Menulis sisa bagi yang lebih besar atau sama dengan pembaginya"
  ],
  "kenapa": [
   "Kenapa pembagian bersusun dikerjakan dari nilai tempat terbesar, kebalikan dari penjumlahan?",
   "Kenapa kalau ada angka 0 di tengah, tetap harus ditulis 0 pada hasil baginya?"
  ],
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
  "ringkas": "Mengurangkan bilangan cacah sampai 1.000 secara bersusun dengan dan tanpa meminjam",
  "subKonsep": [
   "Tiga makna pengurangan: mengambil, selisih, dan mencari bagian yang hilang",
   "Pengurangan tanpa meminjam dan dengan meminjam",
   "Meminjam: 1 puluhan ditukar menjadi 10 satuan",
   "Pengurangan dengan angka nol di tengah, misalnya 500 - 137",
   "Hubungan pengurangan dengan penjumlahan sebagai operasi kebalikan",
   "Strategi menghitung selisih dengan cara menambah maju"
  ],
  "rumus": [
   "a - b = c jika dan hanya jika c + b = a",
   "a - 0 = a; a - a = 0",
   "1 puluhan = 10 satuan (dasar teknik meminjam)"
  ],
  "miskonsepsi": [
   "Selalu mengurangkan angka kecil dari angka besar di tiap kolom tanpa meminjam, misalnya 52 - 27 dijawab 35 karena 7-2 = 5",
   "Lupa mengurangi satu pada nilai tempat yang dipinjami",
   "Kebingungan meminjam melalui angka 0, misalnya pada 500 - 137"
  ],
  "kenapa": [
   "Kenapa kita boleh 'meminjam' 1 dari puluhan dan menjadikannya 10 satuan? Apakah nilainya berubah?",
   "Kenapa 52 - 27 tidak boleh dikerjakan sebagai (5-2) dan (7-2)?"
  ],
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
  "ringkas": "Menjumlahkan dua atau tiga bilangan cacah sampai 1.000 secara bersusun",
  "subKonsep": [
   "Penjumlahan sebagai penggabungan dan sebagai penambahan pada garis bilangan",
   "Penjumlahan tanpa menyimpan dan dengan menyimpan",
   "Algoritma bersusun ke bawah dan alasan nilai tempatnya",
   "Menyimpan: 10 satuan ditukar menjadi 1 puluhan, 10 puluhan menjadi 1 ratusan",
   "Strategi mental: melengkapi puluhan/ratusan, memakai bilangan patokan",
   "Soal cerita penjumlahan dalam konteks sehari-hari"
  ],
  "rumus": [
   "a + b = b + a (komutatif)",
   "(a + b) + c = a + (b + c) (asosiatif)",
   "a + 0 = a (unsur identitas)",
   "10 satuan = 1 puluhan; 10 puluhan = 1 ratusan"
  ],
  "miskonsepsi": [
   "Menjumlahkan bersusun dimulai dari angka terdepan (nilai tempat terbesar), padahal seharusnya dimulai dari satuan (miskonsepsi eksplisit di Buku Panduan Guru Kelas III dan IV)",
   "Menuliskan hasil dua angka utuh di kolom satuan, misalnya 27 + 15 ditulis 312 karena 7+5=12 semua ditulis",
   "Lupa menambahkan angka simpanan ke kolom berikutnya"
  ],
  "kenapa": [
   "Kenapa penjumlahan bersusun harus dimulai dari satuan, bukan dari ratusan?",
   "Kenapa kalau satuan berjumlah lebih dari 9 kita 'menyimpan 1' ke puluhan? Apa yang sebenarnya disimpan?"
  ],
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
  "ringkas": "Mengalikan bilangan cacah sampai 100 dengan bantuan benda konkret, gambar, dan simbol",
  "subKonsep": [
   "Perkalian bilangan dua angka dengan bilangan satu angka",
   "Perkalian bersusun panjang (parsial) dan bersusun pendek",
   "Sifat distributif sebagai dasar perkalian bersusun",
   "Teknik menyimpan pada perkalian",
   "Model luas persegi panjang untuk perkalian dua angka",
   "Menyelesaikan masalah sehari-hari dengan perkalian"
  ],
  "rumus": [
   "a x (b + c) = (a x b) + (a x c) (distributif)",
   "23 x 4 = (20 + 3) x 4 = 80 + 12 = 92",
   "(a x b) x c = a x (b x c) (asosiatif)"
  ],
  "miskonsepsi": [
   "Bingung angka mana yang disimpan pada teknik menyusun (miskonsepsi eksplisit di Buku Panduan Guru Kelas III dan IV)",
   "Menambahkan angka simpanan sebelum mengalikan, bukan sesudah",
   "Mengalikan satuan dengan satuan dan puluhan dengan puluhan saja, sehingga 23 x 4 dijawab 83"
  ],
  "kenapa": [
   "Kenapa 23 x 4 bisa dipecah menjadi (20 x 4) + (3 x 4)? Dari mana asal aturan ini?",
   "Kenapa pada perkalian bersusun angka simpanan ditambahkan setelah mengalikan, bukan sebelum?"
  ],
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
  "ringkas": "Menghubungkan pecahan desimal perseratusan dengan konsep persen",
  "subKonsep": [
   "Arti persen sebagai 'per seratus'",
   "Simbol % dan cara membacanya",
   "Hubungan persen dengan pecahan perseratusan dan desimal",
   "Model kotak seratus untuk memvisualkan persen",
   "Persen acuan: 25%, 50%, 75%, 100%",
   "Persen dalam konteks sehari-hari (diskon, baterai, hasil ulangan)"
  ],
  "rumus": [
   "n% = n/100",
   "1/4 = 0,25 = 25%; 1/2 = 0,5 = 50%; 3/4 = 0,75 = 75%",
   "100% = 1 (satu keseluruhan)"
  ],
  "miskonsepsi": [
   "Mengira 50% selalu berarti jumlah yang sama, padahal 50% dari 20 berbeda dengan 50% dari 200",
   "Menganggap persen adalah satuan seperti kg atau cm, bukan perbandingan terhadap keseluruhan",
   "Menulis 25% sama dengan 25 atau 2,5"
  ],
  "kenapa": [
   "Kenapa 'persen' berarti per seratus? Dari mana asal kata dan simbol %?",
   "Kenapa 50% dari uang jajanmu berbeda jumlahnya dengan 50% dari uang jajan temanmu?"
  ],
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
  "ringkas": "Menyajikan data dalam bentuk diagram batang berskala satu satuan",
  "subKonsep": [
   "Bagian diagram batang: judul, sumbu mendatar, sumbu tegak, skala, label kategori",
   "Diagram batang tegak dan diagram batang mendatar",
   "Skala satu satuan pada sumbu frekuensi",
   "Batang berlebar sama dan berjarak sama",
   "Membaca nilai dari tinggi batang",
   "Membandingkan kategori dan menemukan nilai terbesar/terkecil",
   "Menyusun kesimpulan dan menjawab pertanyaan dari diagram batang",
   "Membedakan diagram batang dengan piktogram"
  ],
  "rumus": [
   "Nilai data = tinggi batang dibaca pada skala sumbu frekuensi",
   "Skala satu satuan: satu kotak pada sumbu = 1 satuan data"
  ],
  "miskonsepsi": [
   "Membuat batang dengan lebar berbeda-beda sehingga perbandingannya menyesatkan",
   "Memulai sumbu frekuensi bukan dari 0 sehingga selisih antarbatang tampak berlebihan",
   "Menghitung banyak kotak pada batang, bukan membaca nilai pada skala"
  ],
  "kenapa": [
   "Kenapa sumbu diagram batang harus dimulai dari 0?",
   "Kenapa semua batang harus sama lebar dan berjarak sama?"
  ],
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
  "ringkas": "Menyajikan data dalam bentuk piktogram lengkap dengan judul dan kunci",
  "subKonsep": [
   "Piktogram sebagai penyajian data dengan gambar/simbol",
   "Piktogram disebut juga diagram gambar",
   "Kunci/keterangan gambar (satu gambar mewakili berapa satuan)",
   "Gambar sebagian (setengah gambar) untuk data yang tidak bulat",
   "Membaca dan menafsirkan piktogram",
   "Membuat piktogram dari tabel data",
   "Kelebihan dan keterbatasan piktogram"
  ],
  "rumus": [
   "Nilai data = banyak gambar x nilai kunci",
   "Jika 1 gambar = 5 anak, maka setengah gambar mewakili 2 atau 3 anak (sesuai kesepakatan)"
  ],
  "miskonsepsi": [
   "Menganggap piktogram bukan diagram gambar, padahal keduanya istilah untuk hal yang sama (miskonsepsi eksplisit di Buku Panduan Guru Kelas IV)",
   "Menghitung banyaknya gambar sebagai nilai data tanpa mengalikan dengan kuncinya",
   "Menggambar simbol dengan ukuran berbeda-beda sehingga perbandingannya menyesatkan"
  ],
  "kenapa": [
   "Kenapa piktogram wajib punya kunci? Apa yang terjadi kalau kuncinya hilang?",
   "Kenapa setengah gambar bisa mewakili setengah nilai kunci?"
  ],
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
  "ringkas": "Mendeskripsikan ciri berbagai bentuk segiempat berdasarkan sisi dan sudut",
  "subKonsep": [
   "Unsur segiempat: sisi, titik sudut, sudut, dan diagonal",
   "Ciri persegi dan persegi panjang (sisi sejajar, sudut siku-siku)",
   "Jajargenjang: dua pasang sisi sejajar",
   "Trapesium: tepat sepasang sisi sejajar; jenis trapesium sama kaki, siku-siku, sembarang",
   "Belah ketupat: empat sisi sama panjang",
   "Layang-layang: dua pasang sisi berdekatan sama panjang",
   "Hubungan inklusi antarsegiempat (persegi adalah belah ketupat, juga persegi panjang)",
   "Diagram/pohon klasifikasi segiempat"
  ],
  "rumus": [
   "Persegi: 4 sisi sama panjang, 4 sudut siku-siku",
   "Persegi panjang: 2 pasang sisi sejajar sama panjang, 4 sudut siku-siku",
   "Jajargenjang: 2 pasang sisi sejajar; sudut yang berhadapan sama besar",
   "Trapesium: tepat 1 pasang sisi sejajar",
   "Jumlah sudut dalam segiempat = 360 derajat"
  ],
  "miskonsepsi": [
   "Menyusun definisi trapesium tanpa kata 'tepat', sehingga trapesium dianggap segiempat yang memiliki sepasang sisi sejajar saja (miskonsepsi eksplisit di Buku Panduan Guru Kelas IV)",
   "Menolak menyebut persegi sebagai belah ketupat meskipun semua ciri belah ketupat dimilikinya (miskonsepsi eksplisit di Buku Panduan Guru Kelas IV)",
   "Hanya mengenali persegi/persegi panjang dalam posisi tegak; jika diputar dianggap bangun lain (belah ketupat)"
  ],
  "kenapa": [
   "Kenapa persegi boleh disebut persegi panjang, belah ketupat, dan juga jajargenjang sekaligus?",
   "Kenapa persegi yang diputar 45 derajat sering dikira belah ketupat, padahal bangunnya tidak berubah?"
  ],
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
  "ringkas": "Mendeskripsikan ciri berbagai bentuk segitiga",
  "subKonsep": [
   "Unsur segitiga: sisi, titik sudut, dan sudut",
   "Jenis segitiga berdasarkan panjang sisi: sama sisi, sama kaki, sembarang",
   "Jenis segitiga berdasarkan besar sudut: lancip, siku-siku, tumpul",
   "Hubungan inklusi: segitiga sama sisi juga segitiga sama kaki",
   "Sifat simetri pada segitiga sama kaki dan sama sisi",
   "Jumlah sudut dalam segitiga secara eksploratif (merobek dan menyusun sudut)"
  ],
  "rumus": [
   "Jumlah sudut dalam segitiga = 180 derajat",
   "Segitiga sama sisi: 3 sisi sama panjang, 3 sudut masing-masing 60 derajat",
   "Segitiga sama kaki: tepat 2 sisi sama panjang dan 2 sudut alas sama besar"
  ],
  "miskonsepsi": [
   "Menolak menyebut segitiga sama sisi sebagai segitiga sama kaki, meskipun semua ciri sama kaki dimilikinya (pola miskonsepsi inklusi yang dicatat Buku Panduan Guru Kelas IV)",
   "Hanya mengenali segitiga yang alasnya mendatar; segitiga terbalik tidak dikenali",
   "Mengira setiap segitiga bisa dikelompokkan hanya dalam satu jenis, padahal segitiga bisa sekaligus sama kaki dan siku-siku"
  ],
  "kenapa": [
   "Kenapa segitiga sama sisi juga boleh disebut segitiga sama kaki?",
   "Kenapa segitiga yang diputar tetap segitiga yang sama?"
  ],
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
  "ringkas": "Menyusun (komposisi) berbagai bangun datar dengan lebih dari satu cara",
  "subKonsep": [
   "Menyusun beberapa bangun datar menjadi satu bangun tertentu",
   "Mengurai satu bangun datar menjadi beberapa bangun yang dikenal",
   "Lebih dari satu cara menyusun/mengurai bangun yang sama",
   "Tangram dan kertas lipat sebagai media",
   "Komposisi-dekomposisi sebagai dasar penurunan rumus luas di Fase C",
   "Kekekalan luas: menyusun ulang potongan tidak mengubah luas total",
   "Pengubinan (tessellation) sederhana"
  ],
  "rumus": [
   "Luas gabungan = jumlah luas bagian-bagiannya (bila tidak tumpang tindih)",
   "Dua segitiga siku-siku kongruen dapat disusun menjadi satu persegi panjang"
  ],
  "miskonsepsi": [
   "Menyusun bangun secara asal-asalan asalkan menyatu, tanpa membentuk bangun tertentu yang sudah dipelajari (miskonsepsi eksplisit di Buku Panduan Guru Kelas IV)",
   "Mengira bangun penyusun harus selalu bangun yang sudah dipelajari, padahal boleh memakai bangun yang dikenali seperti segienam atau lingkaran (dicatat Buku Panduan Guru Kelas IV)",
   "Mengira menyusun ulang potongan mengubah luas totalnya"
  ],
  "kenapa": [
   "Kenapa dua segitiga siku-siku yang sama bisa disusun menjadi persegi panjang?",
   "Kenapa luas tidak berubah meskipun potongan bangun disusun ulang?"
  ],
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
  "ringkas": "Mengelompokkan bangun menjadi segi banyak dan bukan segi banyak",
  "subKonsep": [
   "Segi banyak sebagai kurva tertutup yang tersusun dari ruas garis",
   "Membedakan segi banyak dan bukan segi banyak (ada sisi lengkung atau tidak tertutup)",
   "Segi banyak beraturan: semua sisi sama panjang dan semua sudut sama besar",
   "Segi banyak tidak beraturan",
   "Penamaan menurut banyak sisi: segitiga, segiempat, segilima, segienam, segidelapan",
   "Hubungan banyak sisi, banyak titik sudut, dan banyak sudut",
   "Segi banyak pada motif tradisional, ubin, dan sarang lebah"
  ],
  "rumus": [
   "Segi-n: memiliki n sisi, n titik sudut, dan n sudut",
   "Segi banyak beraturan: semua sisi sama panjang dan semua sudut sama besar",
   "Jumlah sudut dalam segi-n = (n - 2) x 180 derajat (pengayaan)"
  ],
  "miskonsepsi": [
   "Mengira lingkaran termasuk segi banyak karena tertutup",
   "Mengira semua segi banyak pasti beraturan (semua sisi sama panjang)",
   "Mengira segi banyak harus cembung, sehingga bangun cekung seperti bintang tidak dianggap segi banyak"
  ],
  "kenapa": [
   "Kenapa lingkaran bukan segi banyak padahal bentuknya tertutup?",
   "Kenapa banyak sisi segi banyak selalu sama dengan banyak titik sudutnya?"
  ],
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
  "ringkas": "Menentukan keliling bangun datar dengan menjumlahkan panjang semua sisinya",
  "subKonsep": [
   "Keliling sebagai panjang lintasan mengelilingi tepi bangun",
   "Mengukur keliling dengan benang lalu diukur dengan penggaris",
   "Keliling bangun pada kertas berpetak",
   "Keliling persegi, persegi panjang, dan segitiga sebagai jumlah panjang sisi",
   "Perbedaan keliling (satuan panjang) dan luas (satuan persegi)",
   "Bangun dengan keliling sama dapat memiliki luas berbeda"
  ],
  "rumus": [
   "Keliling = jumlah panjang semua sisi",
   "Keliling persegi = 4 x s",
   "Keliling persegi panjang = 2 x (p + l)",
   "Keliling segitiga = a + b + c"
  ],
  "miskonsepsi": [
   "Tertukar antara keliling dan luas, termasuk memakai satuan persegi untuk keliling",
   "Menghitung banyaknya petak di tepi bangun, bukan panjang ruas tepinya, sehingga keliling terhitung kurang di sudut",
   "Mengira bangun dengan keliling lebih besar pasti luasnya lebih besar"
  ],
  "kenapa": [
   "Kenapa keliling diukur dengan cm, sedangkan luas diukur dengan cm2?",
   "Kenapa dua bangun dengan keliling sama bisa punya luas yang sangat berbeda?"
  ],
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
  "ringkas": "Mengukur luas menggunakan satuan tidak baku dan persegi satuan",
  "subKonsep": [
   "Luas sebagai banyaknya daerah yang menutupi permukaan",
   "Menutup daerah dengan satuan tidak baku (kertas lipat, ubin, kartu) tanpa celah dan tanpa tumpang tindih",
   "Persegi satuan sebagai satuan luas yang konsisten",
   "Menghitung luas bangun pada kertas berpetak",
   "Bangun berbeda bentuk dapat memiliki luas sama",
   "Luas bangun tak beraturan dengan menghitung petak penuh dan setengah petak",
   "Estimasi luas sebelum menghitung"
  ],
  "rumus": [
   "Luas = banyaknya persegi satuan yang menutupi daerah tanpa celah dan tanpa tumpang tindih",
   "Luas persegi panjang pada petak = banyak baris x banyak kolom"
  ],
  "miskonsepsi": [
   "Mengukur luas daerah dengan satuan tidak baku yang berbeda-beda atau dicampur (miskonsepsi eksplisit di Buku Panduan Guru Kelas IV)",
   "Menyusun satuan penutup dengan celah atau tumpang tindih sehingga hasilnya tidak konsisten (dicatat Buku Panduan Guru Kelas IV)",
   "Mengira dua bangun dengan bentuk berbeda pasti luasnya berbeda"
  ],
  "kenapa": [
   "Kenapa satuan penutup harus sama besar dan tidak boleh ada celah?",
   "Kenapa dua bangun yang bentuknya berbeda bisa punya luas yang sama persis?"
  ],
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
  "ringkas": "Mengukur volume menggunakan satuan tidak baku dan satuan baku",
  "subKonsep": [
   "Volume sebagai banyaknya ruang yang ditempati atau dapat diisi benda",
   "Mengukur volume dengan satuan tidak baku (gelas, sendok, kubus kecil) secara seragam",
   "Kubus satuan sebagai satuan volume",
   "Menghitung volume bangun susunan kubus satuan",
   "Satuan baku volume: cm3, dm3, m3; satuan isi: ml, liter",
   "Hubungan 1 liter = 1 dm3 = 1.000 cm3 = 1.000 ml",
   "Estimasi volume wadah sehari-hari"
  ],
  "rumus": [
   "1 cm3 = volume kubus bersisi 1 cm",
   "1 dm3 = 1 liter = 1.000 cm3 = 1.000 ml",
   "1 m3 = 1.000 dm3 = 1.000.000 cm3",
   "Turun 1 tangga satuan volume: x 1.000; naik 1 tangga: : 1.000"
  ],
  "miskonsepsi": [
   "Mengukur volume dengan satuan tidak baku yang berbeda-beda atau dicampur (miskonsepsi eksplisit di Buku Panduan Guru Kelas IV)",
   "Mengisi wadah tidak sampai penuh atau tidak seragam sehingga hasilnya tidak konsisten (dicatat Buku Panduan Guru Kelas IV)",
   "Mengonversi m3 ke cm3 dengan mengalikan 100, seharusnya dikalikan 100 pangkat 3 yaitu 1.000.000 (miskonsepsi eksplisit di Buku Panduan Guru Kelas IV)"
  ],
  "kenapa": [
   "Kenapa 1 m3 = 1.000.000 cm3, bukan 100 cm3?",
   "Kenapa satuan volume ditulis dengan pangkat tiga?"
  ],
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
  "ringkas": "Mengukur dan menyatakan luas dalam satuan baku berupa bilangan cacah",
  "subKonsep": [
   "Satuan baku luas: mm2, cm2, dm2, m2, dam2 (are), hm2 (hektare), km2",
   "Arti cm2 sebagai luas persegi bersisi 1 cm",
   "Tangga satuan luas dengan kelipatan 100 tiap tangga",
   "Konversi m2 ke cm2 dan sebaliknya",
   "Estimasi luas ruangan, halaman, dan lapangan",
   "Memilih satuan luas yang sesuai dengan objeknya"
  ],
  "rumus": [
   "1 cm2 = luas persegi bersisi 1 cm",
   "1 m2 = 10.000 cm2; 1 km2 = 1.000.000 m2",
   "1 are = 100 m2; 1 hektare = 100 are = 10.000 m2",
   "Turun 1 tangga satuan luas: x 100; naik 1 tangga: : 100"
  ],
  "miskonsepsi": [
   "Mengonversi m2 ke cm2 dengan mengalikan 100 karena mengingat aturan m ke cm, seharusnya dikalikan 100 x 100 = 10.000 (miskonsepsi eksplisit di Buku Panduan Guru Kelas IV)",
   "Mengira satuan luas dan satuan panjang memakai tangga yang sama",
   "Menuliskan satuan luas tanpa pangkat dua, misalnya menulis 12 cm untuk luas"
  ],
  "kenapa": [
   "Kenapa 1 m2 sama dengan 10.000 cm2, bukan 100 cm2? Coba gambar persegi 1 m x 1 m di petak cm.",
   "Kenapa tangga satuan luas kelipatannya 100, sedangkan tangga panjang kelipatannya 10?"
  ],
  "prasyarat": [
   "sd4-pengukuran-luas-dengan-satuan-tidak",
   "sd3-hubungan-antarsatuan-baku-panjang",
   "sd4-perkalian-bilangan-cacah-sampai-100"
  ]
 }
]

export default topik
