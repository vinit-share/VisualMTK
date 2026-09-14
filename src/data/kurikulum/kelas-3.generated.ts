/* ============================================================
   Visual MTK — Rincian topik kelas 3 (DIHASILKAN OTOMATIS)

   Jangan sunting berkas ini dengan tangan.
   Sumber: docs/riset/ (riset Capaian Pembelajaran Kepka BSKAP
   Kemendikdasmen No. 046/H/KR/2025).
   Bangun ulang: npm run bangun:kurikulum
   ============================================================ */

import type { TopikKurikulum } from '../kurikulum'

const topik: TopikKurikulum[] = [
 {
  "id": "sd3-kalimat-matematika-dan-makna-tanda",
  "judul": "Kalimat Matematika dan Makna Tanda Sama Dengan",
  "kelas": 3,
  "fase": "B",
  "domain": "aljabar",
  "ringkas": "Menuliskan kalimat matematika dari situasi sehari-hari",
  "subKonsep": [
   "Kalimat matematika sebagai pernyataan yang bisa benar atau salah",
   "Tanda '=' sebagai tanda keseimbangan, bukan perintah 'hasilnya adalah'",
   "Kalimat terbuka dengan tempat kosong atau simbol (kotak, titik-titik, huruf)",
   "Model timbangan/neraca untuk menjaga keseimbangan",
   "Menerjemahkan soal cerita menjadi kalimat matematika",
   "Bentuk 8 = 3 + 5 dan 4 + 5 = 3 + 6 (hasil tidak selalu di kanan)"
  ],
  "rumus": [
   "a = b berarti kedua ruas bernilai sama",
   "Jika a = b maka b = a (simetris)"
  ],
  "miskonsepsi": [
   "Membaca '=' sebagai perintah 'kerjakan dan tulis jawabannya di sini', sehingga menolak bentuk 8 = 3 + 5",
   "Menulis rangkaian salah seperti 3 + 5 = 8 + 2 = 10 karena memperlakukan '=' sebagai penghubung langkah",
   "Mengira ruas kanan harus selalu berupa satu bilangan tunggal"
  ],
  "kenapa": [
   "Kenapa tanda '=' sebenarnya berarti 'seimbang', bukan 'jawabannya adalah'?",
   "Kenapa 8 = 3 + 5 tetap kalimat matematika yang benar?"
  ],
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
  "ringkas": "Menjelaskan langkah-langkah penyelesaian untuk mengisi nilai yang belum diketahui",
  "subKonsep": [
   "Kalimat matematika dengan satu tempat kosong: 10 + ... = 19, 19 - ... = 10",
   "Strategi mencoba dan memeriksa (trial and error) yang terarah",
   "Strategi memakai operasi kebalikan",
   "Keluarga fakta (fact family): 10 + 9 = 19, 9 + 10 = 19, 19 - 9 = 10, 19 - 10 = 9",
   "Model bagian-bagian-keseluruhan (part-part-whole)",
   "Tempat kosong bisa berada di posisi mana saja dalam kalimat"
  ],
  "rumus": [
   "Jika a + b = c maka b = c - a dan a = c - b",
   "Jika a - b = c maka b = a - c dan a = b + c"
  ],
  "miskonsepsi": [
   "Selalu mengoperasikan dua bilangan yang tampak, misalnya pada ... + 7 = 15 murid menjawab 22 karena menjumlahkan 7 dan 15",
   "Menganggap tempat kosong hanya bisa berada tepat sebelum tanda '='",
   "Mengira soal dengan bagian awal tidak diketahui pasti diselesaikan dengan penjumlahan karena kata kuncinya 'ditambah'"
  ],
  "kenapa": [
   "Kenapa untuk mencari nilai pada ... + 7 = 15 kita justru mengurangkan?",
   "Kenapa satu kelompok tiga bilangan bisa membentuk empat kalimat matematika sekaligus?"
  ],
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
  "ringkas": "Membaca dan menulis bilangan cacah sampai 1.000 dengan benar",
  "subKonsep": [
   "Membilang loncat 1, 2, 5, 10, 50, 100 sampai 1.000",
   "Membaca lambang bilangan tiga angka menjadi nama bilangan",
   "Menulis nama bilangan menjadi lambang bilangan",
   "Peran angka 0 sebagai penahan tempat (misalnya 305, 350, 300)",
   "Penggunaan titik sebagai pemisah ribuan dalam penulisan Indonesia (1.000, bukan 1,000)",
   "Bilangan cacah sebagai banyaknya benda (kardinal) dan sebagai urutan (ordinal)"
  ],
  "rumus": [
   "1 ratusan = 10 puluhan = 100 satuan",
   "1 ribuan = 10 ratusan = 100 puluhan = 1.000 satuan"
  ],
  "miskonsepsi": [
   "Kesalahan membaca bila terdapat angka 0 pada nilai tempat ratusan atau puluhan, misalnya 305 dibaca 'tiga puluh lima' (miskonsepsi yang secara eksplisit dicatat Buku Panduan Guru Kelas III)",
   "Menulis 'seratus dua puluh tiga' menjadi 100203 karena menyalin tiap kata secara terpisah",
   "Mengira titik pada 1.000 adalah tanda desimal seperti di bahasa Inggris"
  ],
  "kenapa": [
   "Kenapa kita hanya butuh 10 angka (0-9) untuk menulis semua bilangan sampai tak terhingga?",
   "Kenapa angka 0 penting padahal nilainya kosong? Apa bedanya 35, 305, dan 350?"
  ],
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
  "ringkas": "Menyebutkan fakta perkalian 1 sampai 10 dengan lancar dan bermakna",
  "subKonsep": [
   "Tabel perkalian 1 sampai 10 dan pola-pola di dalamnya",
   "Pola kelipatan 2, 5, 9, dan 10",
   "Sifat komutatif untuk memangkas jumlah fakta yang perlu dihafal",
   "Strategi menurunkan fakta baru dari fakta yang sudah dikuasai (6x7 = 5x7 + 7)",
   "Perkalian dengan 10 dan 100",
   "Kelancaran fakta dasar sebagai fondasi algoritma bersusun"
  ],
  "rumus": [
   "a x 10 = a puluhan (setiap angka bergeser satu nilai tempat ke kiri)",
   "a x (b + 1) = a x b + a",
   "a x b = b x a"
  ],
  "miskonsepsi": [
   "Menghafal tabel tanpa makna sehingga tidak bisa memulihkan fakta yang lupa",
   "Mengira perkalian dengan 10 berarti 'menambah nol', lalu keliru menerapkannya pada desimal di fase berikutnya",
   "Menganggap 7 x 8 dan 8 x 7 adalah dua fakta yang harus dihafal terpisah"
  ],
  "kenapa": [
   "Kenapa tabel perkalian simetris terhadap diagonalnya?",
   "Kenapa jumlah digit hasil kelipatan 9 selalu 9 (18, 27, 36, ...)?"
  ],
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
  "ringkas": "Membagi kumpulan benda konkret sama rata dan menceritakan prosesnya",
  "subKonsep": [
   "Dua makna pembagian: pembagian sama rata (partitif) dan pengukuran/pengelompokan (kuotitif)",
   "Pembagian sebagai pengurangan berulang",
   "Pembagian sebagai kebalikan perkalian",
   "Istilah: bilangan yang dibagi, pembagi, hasil bagi, sisa bagi",
   "Pembagian dengan 1 dan pembagian bilangan oleh dirinya sendiri",
   "Mengapa pembagian dengan 0 tidak terdefinisi"
  ],
  "rumus": [
   "a : b = c jika dan hanya jika c x b = a",
   "a = (pembagi x hasil bagi) + sisa, dengan 0 <= sisa < pembagi",
   "a : 1 = a; a : a = 1 (a bukan 0); pembagian dengan 0 tidak terdefinisi"
  ],
  "miskonsepsi": [
   "Tidak membagikan benda sama banyak/sama rata saat memperagakan pembagian (miskonsepsi eksplisit di Buku Panduan Guru Kelas III dan IV)",
   "Tertukar menyebutkan istilah hasil bagi dan sisa bagi (miskonsepsi eksplisit di kedua buku guru)",
   "Mengira pembagian bersifat komutatif, sehingga 12 : 3 dianggap sama dengan 3 : 12"
  ],
  "kenapa": [
   "Kenapa 12 : 3 dan 12 : 4 punya cerita yang berbeda padahal sama-sama pembagian?",
   "Kenapa pembagian bisa dicek dengan perkalian?"
  ],
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
  "ringkas": "Mengubah penjumlahan berulang menjadi kalimat perkalian dan sebaliknya",
  "subKonsep": [
   "Perkalian sebagai penjumlahan berulang kelompok yang sama banyak",
   "Makna a x b sebagai 'a kelompok yang masing-masing berisi b'",
   "Model larik/array (baris x kolom) dan model luas",
   "Perkalian pada garis bilangan sebagai lompatan sama panjang",
   "Perkalian dengan 0 dan dengan 1",
   "Situasi sehari-hari yang bermakna perkalian"
  ],
  "rumus": [
   "a x b = b + b + ... + b (sebanyak a suku)",
   "a x b = b x a (komutatif)",
   "a x 1 = a; a x 0 = 0"
  ],
  "miskonsepsi": [
   "Menyamakan 4 x 5 dengan 4 + 4 + 4 + 4 + 4; sesuai konvensi buku Kemendikbud, 4 x 5 berarti 5 + 5 + 5 + 5 (miskonsepsi eksplisit di Buku Panduan Guru Kelas III dan IV) meskipun hasilnya sama karena sifat komutatif",
   "Mengira perkalian selalu membuat hasil lebih besar (akan menjadi masalah saat bertemu pecahan di Fase C)",
   "Menganggap a x 0 = a karena mengira nol tidak berpengaruh seperti pada penjumlahan"
  ],
  "kenapa": [
   "Kenapa 4 x 5 dan 5 x 4 hasilnya sama padahal ceritanya berbeda? (putar gambar lariknya)",
   "Kenapa perkalian dengan 0 hasilnya selalu 0, tidak peduli sebesar apa bilangannya?"
  ],
  "konsep": [
   "perkalian-luas"
  ],
  "prasyarat": [
   "sd1-penjumlahan-bilangan-cacah-sampai-20",
   "sd3-bilangan-dan-lambang-bilangan-cacah"
  ]
 },
 {
  "id": "sd3-mengumpulkan-mengurutkan-dan-membandingkan-data",
  "judul": "Mengumpulkan, Mengurutkan, dan Membandingkan Data",
  "kelas": 3,
  "fase": "B",
  "domain": "data",
  "ringkas": "Mengumpulkan data sederhana dari lingkungan kelas",
  "subKonsep": [
   "Pertanyaan statistika sederhana yang bisa dijawab dengan data",
   "Cara mengumpulkan data: mengamati, menghitung, wawancara, angket sederhana",
   "Jenis data sederhana: data cacahan (banyak benda) dan data kategori",
   "Mengurutkan data dari terkecil ke terbesar dan sebaliknya",
   "Membandingkan data antarkategori",
   "Menentukan data terbanyak dan data paling sedikit",
   "Turus (tally) sebagai alat mencacah"
  ],
  "rumus": [
   "Satu turus penuh (IIII dicoret) = 5",
   "Jangkauan sederhana = data terbesar - data terkecil"
  ],
  "miskonsepsi": [
   "Mengurutkan label kategori (nama benda), bukan nilai datanya",
   "Menghitung turus satu per satu tanpa mengelompokkan lima-lima sehingga rawan salah",
   "Mengira data yang muncul paling awal berarti paling banyak"
  ],
  "kenapa": [
   "Kenapa turus dikelompokkan lima-lima, bukan sepuluh-sepuluh?",
   "Kenapa data perlu diurutkan sebelum dibaca?"
  ],
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
  "ringkas": "Menyajikan data dalam bentuk tabel yang lengkap dan rapi",
  "subKonsep": [
   "Bagian-bagian tabel: judul, kolom kategori, kolom frekuensi",
   "Mengubah data turus menjadi tabel frekuensi",
   "Membaca tabel untuk menjawab pertanyaan",
   "Menghitung jumlah total dari tabel",
   "Menemukan kategori dengan frekuensi terbesar dan terkecil dari tabel",
   "Menyusun kesimpulan sederhana dari tabel"
  ],
  "rumus": [
   "Total data = jumlah semua frekuensi",
   "Frekuensi = banyaknya data pada satu kategori"
  ],
  "miskonsepsi": [
   "Membuat tabel tanpa judul atau tanpa nama kolom sehingga datanya tidak bermakna",
   "Mengira jumlah seluruh frekuensi tidak perlu sama dengan banyak responden",
   "Membaca baris dan kolom secara terbalik"
  ],
  "kenapa": [
   "Kenapa tabel harus punya judul dan nama kolom?",
   "Kenapa jumlah semua frekuensi harus sama dengan banyak orang yang didata?"
  ],
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
  "ringkas": "Mendeskripsikan arti garis tegak lurus dan garis sejajar",
  "subKonsep": [
   "Dua garis sejajar: tidak pernah berpotongan dan berjarak tetap",
   "Dua garis tegak lurus: berpotongan membentuk sudut siku-siku",
   "Garis berpotongan yang tidak tegak lurus",
   "Contoh garis sejajar dan tegak lurus di lingkungan sekitar (rel kereta, jendela, ubin)",
   "Sisi-sisi sejajar dan sisi tegak lurus pada bangun datar",
   "Menggambar garis sejajar dan tegak lurus dengan penggaris"
  ],
  "rumus": [
   "Garis a sejajar garis b: jarak keduanya selalu tetap dan tidak berpotongan",
   "Garis a tegak lurus garis b: keduanya berpotongan membentuk sudut 90 derajat"
  ],
  "miskonsepsi": [
   "Mengira dua garis sejajar harus sama panjang",
   "Mengira garis sejajar harus mendatar atau tegak, tidak bisa miring",
   "Mengira dua garis yang berpotongan pasti tegak lurus"
  ],
  "kenapa": [
   "Kenapa dua garis sejajar tidak pernah bertemu, walau diperpanjang sejauh apa pun?",
   "Kenapa rel kereta api harus sejajar?"
  ],
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
  "ringkas": "Mendeskripsikan arti sudut, ukuran sudut tidak baku, ukuran sudut baku, dan jenis-jenis sudut",
  "subKonsep": [
   "Sudut sebagai daerah yang dibentuk dua sinar garis berpangkal sama",
   "Titik sudut dan kaki sudut",
   "Sudut sebagai besar putaran, bukan panjang kakinya",
   "Ukuran sudut tidak baku (membandingkan dengan sudut siku-siku dari kertas lipat)",
   "Ukuran sudut baku: derajat dan busur derajat",
   "Jenis sudut: siku-siku, lancip, tumpul, lurus",
   "Sudut pada bangun datar dan pada benda di sekitar"
  ],
  "rumus": [
   "Sudut siku-siku = 90 derajat",
   "Sudut lancip < 90 derajat; sudut tumpul antara 90 dan 180 derajat",
   "Sudut lurus = 180 derajat; satu putaran penuh = 360 derajat"
  ],
  "miskonsepsi": [
   "Mengira sudut dengan kaki lebih panjang berarti sudutnya lebih besar",
   "Mengira sudut hanya ada jika kakinya digambar mendatar dan tegak (sudut miring tidak dikenali sebagai siku-siku)",
   "Mengukur sudut dengan busur derajat dari skala luar yang salah, atau titik pusat busur tidak diletakkan di titik sudut"
  ],
  "kenapa": [
   "Kenapa sudut dengan kaki panjang dan kaki pendek bisa sama besar?",
   "Kenapa sudut diukur dengan derajat, dan kenapa satu putaran penuh 360 derajat?"
  ],
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
  "ringkas": "Mendeskripsikan arti garis, sinar garis, ruas garis, dan kurva",
  "subKonsep": [
   "Titik sebagai posisi tanpa ukuran",
   "Garis: kedua ujungnya tak terbatas",
   "Sinar garis: satu ujung tetap, ujung lainnya tak terbatas",
   "Ruas garis: kedua ujungnya terbatas",
   "Kurva sebagai goresan yang tidak lurus",
   "Kurva terbuka dan kurva tertutup",
   "Sisi bangun datar sebagai ruas garis",
   "Penamaan titik dan ruas garis dengan huruf kapital"
  ],
  "rumus": [
   "Ruas garis AB: bagian garis yang dibatasi titik A dan titik B",
   "Sinar garis AB: berpangkal di A, melalui B, dan terus tak terbatas"
  ],
  "miskonsepsi": [
   "Mengira garis pasti punya panjang tertentu dan bisa diukur, padahal garis tak terbatas",
   "Menyebut semua goresan sebagai 'garis' tanpa membedakan ruas garis dan kurva",
   "Mengira sinar garis dan ruas garis sama karena sama-sama punya titik pangkal"
  ],
  "kenapa": [
   "Kenapa garis dikatakan tak berujung padahal di buku kita menggambarnya pendek?",
   "Kenapa sinar matahari dipakai sebagai contoh sinar garis?"
  ],
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
  "ringkas": "Menentukan hubungan antarsatuan baku berat (g dan kg)",
  "subKonsep": [
   "Tangga satuan berat: kg, hg (ons), dag, g, dg, cg, mg",
   "Aturan turun satu tangga dikalikan 10, naik satu tangga dibagi 10",
   "Satuan berat khas Indonesia: ons, kuintal, ton",
   "Konversi kg-g, kg-ons, ton-kg",
   "Penjumlahan dan pengurangan berat dengan satuan berbeda",
   "Soal cerita berat dalam konteks pasar dan panen"
  ],
  "rumus": [
   "1 kg = 10 hg (ons) = 100 dag = 1.000 g",
   "1 ton = 10 kuintal = 1.000 kg",
   "Turun 1 tangga: x 10; naik 1 tangga: : 10"
  ],
  "miskonsepsi": [
   "Mengubah kg ke g dengan mengalikan 100, mencampurkan aturan dengan konversi m ke cm",
   "Mengira 1 ons = 10 g karena hanya menghitung satu tangga",
   "Mengira 1 ton = 100 kg"
  ],
  "kenapa": [
   "Kenapa 1 kg = 1.000 g, sedangkan 1 m = 100 cm? Kenapa jumlah tangganya berbeda?",
   "Kenapa 'ons' di tangga satuan sebenarnya adalah hektogram?"
  ],
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
  "ringkas": "Menentukan hubungan antarsatuan baku panjang (cm dan m)",
  "subKonsep": [
   "Tangga satuan panjang: km, hm, dam, m, dm, cm, mm",
   "Aturan turun satu tangga dikalikan 10, naik satu tangga dibagi 10",
   "Konversi km-m, m-cm, cm-mm",
   "Hubungan terbalik: makin kecil satuannya, makin banyak angka hasil ukurnya",
   "Menjumlahkan dan mengurangkan panjang dengan satuan berbeda",
   "Menyelesaikan soal cerita panjang yang memerlukan konversi"
  ],
  "rumus": [
   "1 km = 10 hm = 100 dam = 1.000 m",
   "1 m = 10 dm = 100 cm = 1.000 mm",
   "Turun 1 tangga: x 10; naik 1 tangga: : 10"
  ],
  "miskonsepsi": [
   "Mengubah 1 m menjadi 10 cm karena menganggap m ke cm hanya turun satu tangga sehingga dikalikan 10 (miskonsepsi eksplisit di Buku Panduan Guru Kelas III)",
   "Mengira mengubah ke satuan lebih kecil membuat bilangannya lebih kecil",
   "Melewatkan tangga dm saat menghitung dari m ke cm"
  ],
  "kenapa": [
   "Kenapa 1 m = 100 cm dan bukan 10 cm? Coba hitung sendiri di meteran.",
   "Kenapa makin kecil satuannya, angka hasil ukurnya makin besar?"
  ],
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
  "ringkas": "Mengukur berat benda menggunakan satuan baku",
  "subKonsep": [
   "Perbedaan berat/massa dengan ukuran besar benda",
   "Alat ukur berat: timbangan duduk, timbangan digital, neraca, dacin",
   "Satuan baku berat: mg, g, kg, ons, kuintal, ton",
   "Membaca skala timbangan dan memulai dari posisi 0",
   "Estimasi berat benda sebelum menimbang",
   "Memilih satuan yang sesuai (g untuk bumbu, kg untuk beras, ton untuk truk)"
  ],
  "rumus": [
   "1 kg = 1.000 g; 1 g = 1.000 mg",
   "1 ons = 100 g (konvensi Indonesia)",
   "1 kuintal = 100 kg; 1 ton = 1.000 kg = 10 kuintal"
  ],
  "miskonsepsi": [
   "Mengukur berat benda dengan timbangan yang jarumnya tidak dimulai dari 0 (miskonsepsi eksplisit di Buku Panduan Guru Kelas III)",
   "Mengira benda yang lebih besar ukurannya pasti lebih berat (kapas satu karung dibanding besi sekepal)",
   "Mengira 1 ons = 1 kg atau 1 ons = 10 g (di Indonesia 1 ons = 100 g)"
  ],
  "kenapa": [
   "Kenapa benda besar belum tentu lebih berat daripada benda kecil?",
   "Kenapa jarum timbangan harus menunjuk 0 sebelum benda diletakkan?"
  ],
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
  "ringkas": "Mengukur panjang benda menggunakan satuan baku dengan tepat",
  "subKonsep": [
   "Alasan perlunya satuan baku (hasil ukur konsisten antarorang)",
   "Alat ukur panjang: penggaris, meteran kain, meteran gulung",
   "Satuan baku panjang: mm, cm, m, km",
   "Membaca skala penggaris dan memulai pengukuran dari titik 0",
   "Mengukur benda yang lebih panjang daripada alat ukur",
   "Estimasi panjang sebelum mengukur",
   "Memilih alat dan satuan yang sesuai dengan benda yang diukur"
  ],
  "rumus": [
   "Panjang = posisi akhir - posisi awal pada skala",
   "1 cm = 10 mm; 1 m = 100 cm; 1 km = 1.000 m"
  ],
  "miskonsepsi": [
   "Mengukur panjang benda dengan penggaris tidak dimulai dari posisi 0 (miskonsepsi eksplisit di Buku Panduan Guru Kelas III)",
   "Menghitung banyaknya garis skala, bukan banyaknya ruas/jarak antargaris",
   "Menganggap benda yang dimulai dari angka 2 dan berakhir di angka 9 panjangnya 9 cm"
  ],
  "kenapa": [
   "Kenapa manusia perlu satuan baku, padahal dulu memakai jengkal dan hasta?",
   "Kenapa pengukuran harus dimulai dari angka 0 pada penggaris?"
  ],
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
  "ringkas": "Membaca waktu pada jam analog dan jam digital",
  "subKonsep": [
   "Bagian-bagian jam analog: jarum jam, jarum menit, jarum detik",
   "Membaca jam analog dan jam digital, termasuk format 24 jam",
   "Satuan waktu: detik, menit, jam, hari, minggu, bulan, tahun, windu, dasawarsa, abad",
   "Konversi antarsatuan waktu (basis 60 dan basis 24)",
   "Menghitung lama kegiatan (durasi) antara dua waktu",
   "Menggunakan kalender: hari, tanggal, minggu, bulan",
   "Estimasi lama suatu kegiatan"
  ],
  "rumus": [
   "1 menit = 60 detik; 1 jam = 60 menit = 3.600 detik",
   "1 hari = 24 jam; 1 minggu = 7 hari; 1 tahun = 12 bulan = 365 hari (366 hari pada tahun kabisat)",
   "1 windu = 8 tahun; 1 dasawarsa = 10 tahun; 1 abad = 100 tahun",
   "Durasi = waktu akhir - waktu awal (dengan meminjam 60 pada menit)"
  ],
  "miskonsepsi": [
   "Mengonversi waktu dengan basis 10, misalnya menganggap 1,5 jam = 1 jam 50 menit atau 2 jam 70 menit = 2,7 jam",
   "Menghitung durasi dengan mengurangkan angka jam dan menit secara terpisah tanpa meminjam 60, misalnya 10.15 - 8.45 dijawab 2 jam 30 menit",
   "Tertukar membaca jarum pendek dan jarum panjang, misalnya pukul 03.55 dibaca pukul 04.55"
  ],
  "kenapa": [
   "Kenapa satu jam terdiri atas 60 menit dan bukan 100 menit?",
   "Kenapa saat menghitung lama waktu kita meminjam 60, bukan 10 seperti pada bilangan biasa?"
  ],
  "prasyarat": [
   "sd2-membandingkan-durasi-waktu",
   "sd3-bilangan-dan-lambang-bilangan-cacah",
   "sd1-penjumlahan-bilangan-cacah-sampai-20"
  ]
 }
]

export default topik
