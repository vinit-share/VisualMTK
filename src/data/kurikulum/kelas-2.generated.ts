/* ============================================================
   Visual MTK — Rincian topik kelas 2 (DIHASILKAN OTOMATIS)

   Jangan sunting berkas ini dengan tangan.
   Sumber: docs/riset/ (riset Capaian Pembelajaran Kepka BSKAP
   Kemendikdasmen No. 046/H/KR/2025).
   Bangun ulang: npm run bangun:kurikulum
   ============================================================ */

import type { TopikKurikulum } from '../kurikulum'

const topik: TopikKurikulum[] = [
 {
  "id": "sd2-kalimat-matematika-dengan-bilangan-yang",
  "judul": "Kalimat Matematika dengan Bilangan yang Hilang",
  "kelas": 2,
  "fase": "A",
  "domain": "aljabar",
  "ringkas": "Menemukan bilangan yang hilang pada berbagai posisi dalam kalimat matematika",
  "subKonsep": [
   "Posisi bilangan yang hilang bisa di mana saja: 5 + kotak = 12, kotak + 5 = 12, 12 - kotak = 5",
   "Model gambar dan model pita (bar model) untuk menemukan bilangan yang hilang",
   "Menggunakan operasi kebalikan untuk mencari bilangan yang hilang",
   "Menerjemahkan soal cerita menjadi kalimat matematika bersimbol",
   "Menguji jawaban dengan mengganti kembali ke kalimat semula",
   "Bentuk seimbang dua ruas: 4 + 6 = kotak + 3"
  ],
  "rumus": [
   "kotak + b = c maka kotak = c - b",
   "a - kotak = c maka kotak = a - c",
   "kotak - b = c maka kotak = c + b"
  ],
  "miskonsepsi": [
   "Selalu menjumlahkan semua bilangan yang tampak, apa pun posisi kotak kosongnya",
   "Menjawab 17 untuk 12 - kotak = 5 karena 'ada tanda kurang jadi dikurangi' atau justru dijumlahkan asal",
   "Hanya bisa mengerjakan bila kotak kosong berada di paling kanan"
  ],
  "kenapa": [
   "Kenapa kotak + 5 = 12 diselesaikan dengan pengurangan padahal tandanya penjumlahan?",
   "Kenapa letak kotak kosong mengubah cara mengerjakan soalnya?"
  ],
  "prasyarat": [
   "sd1-makna-simbol-dan-keseimbangan",
   "sd1-hubungan-penjumlahan-dan-pengurangan-keluarga",
   "sd1-pengurangan-bilangan-cacah-sampai-20"
  ]
 },
 {
  "id": "sd2-pola-bilangan-membesar-dan-mengecil",
  "judul": "Pola Bilangan Membesar dan Mengecil (Pengantar)",
  "kelas": 2,
  "fase": "A",
  "domain": "aljabar",
  "ringkas": "Menemukan aturan sebuah pola bilangan sederhana",
  "subKonsep": [
   "Pola bertambah tetap: +1, +2, +5, +10",
   "Pola berkurang tetap: -1, -2, -5, -10",
   "Aturan pola (beda) dan cara menemukan suku berikutnya",
   "Melengkapi bilangan yang hilang di tengah pola",
   "Pola bilangan pada papan seratus dan pada garis bilangan",
   "Membedakan barisan yang berpola teratur dan yang tidak teratur",
   "Hubungan pola bilangan dengan membilang lompat"
  ],
  "rumus": [
   "Pola membesar: suku berikutnya = suku sekarang + beda",
   "Pola mengecil: suku berikutnya = suku sekarang - beda",
   "Beda = suku kedua - suku pertama (diperiksa pada semua pasangan suku)"
  ],
  "miskonsepsi": [
   "Menebak suku berikutnya tanpa memeriksa aturan pada seluruh suku yang ada",
   "Hanya memeriksa selisih dua suku pertama lalu langsung menyimpulkan aturan",
   "Mengira pola bilangan selalu bertambah dan tidak pernah berkurang"
  ],
  "kenapa": [
   "Kenapa kita harus memeriksa selisih lebih dari satu kali sebelum menyimpulkan aturan pola?",
   "Kenapa pola melompat 10 pada papan seratus membentuk garis lurus ke bawah?"
  ],
  "prasyarat": [
   "sd1-garis-bilangan-dan-membilang-maju",
   "sd2-membilang-dan-mengelompokkan-bilangan-sampai",
   "sd1-pola-bukan-bilangan-gambar-warna",
   "sd2-strategi-berhitung-mental-dengan-puluhan"
  ]
 },
 {
  "id": "sd2-bilangan-ganjil-dan-genap",
  "judul": "Bilangan Ganjil dan Genap",
  "kelas": 2,
  "fase": "A",
  "domain": "bilangan",
  "ringkas": "Menentukan ganjil atau genap dengan memasangkan benda dua-dua",
  "subKonsep": [
   "Genap sebagai bilangan yang dapat dipasangkan dua-dua tanpa sisa",
   "Ganjil sebagai bilangan yang menyisakan satu saat dipasangkan dua-dua",
   "Ciri angka satuan: 0, 2, 4, 6, 8 genap; 1, 3, 5, 7, 9 ganjil",
   "Pola selang-seling ganjil-genap pada urutan bilangan",
   "Pola kolom ganjil dan genap pada papan seratus",
   "Kedudukan bilangan 0 sebagai bilangan genap",
   "Konteks sehari-hari: pembagian pasangan, nomor rumah, nomor sepatu"
  ],
  "rumus": [
   "Bilangan genap: dapat dipasangkan dua-dua tanpa sisa (0, 2, 4, 6, 8, 10, ...)",
   "Bilangan ganjil: bersisa satu saat dipasangkan dua-dua (1, 3, 5, 7, 9, 11, ...)",
   "genap + genap = genap; ganjil + ganjil = genap; genap + ganjil = ganjil"
  ],
  "miskonsepsi": [
   "Melihat angka puluhan untuk menentukan ganjil atau genap sehingga menganggap 34 ganjil karena 3 ganjil",
   "Mengira bilangan yang besar pasti genap",
   "Mengira 0 ganjil, atau menganggap 0 bukan keduanya"
  ],
  "kenapa": [
   "Kenapa cukup melihat angka terakhir untuk tahu suatu bilangan ganjil atau genap?",
   "Kenapa 34 genap padahal 3 adalah bilangan ganjil?"
  ],
  "prasyarat": [
   "sd2-membilang-dan-mengelompokkan-bilangan-sampai",
   "sd2-nilai-tempat-puluhan-dan-satuan"
  ]
 },
 {
  "id": "sd2-estimasi-dan-perkiraan-banyak-benda",
  "judul": "Estimasi dan Perkiraan Banyak Benda",
  "kelas": 2,
  "fase": "A",
  "domain": "bilangan",
  "ringkas": "Memperkirakan banyak benda dalam wadah dengan patokan sekelompok 10",
  "subKonsep": [
   "Perbedaan menghitung tepat dan memperkirakan",
   "Memperkirakan dengan patokan (benchmark) sekelompok 10 atau 20",
   "Kata-kata perkiraan: kira-kira, sekitar, hampir, lebih dari, kurang dari",
   "Memeriksa perkiraan dengan menghitung sebenarnya",
   "Menilai kewajaran suatu jawaban",
   "Kapan perkiraan sudah cukup dan kapan diperlukan hitungan tepat"
  ],
  "rumus": [],
  "miskonsepsi": [
   "Menganggap perkiraan yang tidak persis sebagai jawaban yang salah",
   "Menghitung dulu dengan tepat lalu menuliskan hasilnya sebagai 'perkiraan'",
   "Menyebut angka asal tanpa memakai patokan apa pun"
  ],
  "kenapa": [
   "Kenapa perkiraan berguna padahal hasilnya tidak persis benar?",
   "Kenapa memakai patokan sekelompok 10 membuat perkiraan kita jauh lebih dekat?"
  ],
  "prasyarat": [
   "sd2-membilang-dan-mengelompokkan-bilangan-sampai",
   "sd2-membandingkan-dan-mengurutkan-bilangan-sampai"
  ]
 },
 {
  "id": "sd2-komposisi-dan-dekomposisi-bilangan-dua",
  "judul": "Komposisi dan Dekomposisi Bilangan Dua Angka",
  "kelas": 2,
  "fase": "A",
  "domain": "bilangan",
  "ringkas": "Mengurai bilangan dua angka menjadi puluhan dan satuan",
  "subKonsep": [
   "Menyusun bilangan dari puluhan dan satuan",
   "Mengurai bilangan dua angka dengan lebih dari satu cara (45 = 40 + 5 = 30 + 15 = 20 + 25)",
   "Penukaran satu puluhan menjadi sepuluh satuan saat mengurai",
   "Dekomposisi sebagai dasar strategi berhitung",
   "Menyusun bilangan menjadi tiga bagian atau lebih",
   "Hubungan dekomposisi dengan pasangan pembentuk 100 (60 dan 40, 70 dan 30)"
  ],
  "rumus": [
   "Bilangan = puluhan + satuan (contoh 45 = 40 + 5)",
   "Pasangan pembentuk 100: 10 dan 90, 20 dan 80, 30 dan 70, 40 dan 60, 50 dan 50"
  ],
  "miskonsepsi": [
   "Mengira 45 hanya bisa diurai menjadi 40 dan 5",
   "Menolak penguraian 45 = 30 + 15 karena menganggap 15 'terlalu besar untuk satuan'",
   "Menukar puluhan menjadi satuan dengan nilai yang keliru (1 puluhan dianggap 1 satuan)"
  ],
  "kenapa": [
   "Kenapa satu bilangan bisa diurai dengan banyak cara yang berbeda?",
   "Kenapa 45 boleh ditulis 30 + 15 padahal 15 lebih dari satu puluhan?"
  ],
  "prasyarat": [
   "sd2-nilai-tempat-puluhan-dan-satuan",
   "sd1-pasangan-bilangan-10-komposisi-dan"
  ]
 },
 {
  "id": "sd2-membandingkan-dan-mengurutkan-bilangan-sampai",
  "judul": "Membandingkan dan Mengurutkan Bilangan sampai 100",
  "kelas": 2,
  "fase": "A",
  "domain": "bilangan",
  "ringkas": "Membandingkan dua bilangan sampai 100 disertai alasan nilai tempat",
  "subKonsep": [
   "Membandingkan dengan melihat nilai tempat terbesar terlebih dahulu",
   "Simbol >, <, = dan cara membacanya untuk bilangan dua angka",
   "Mengurutkan naik (dari terkecil) dan mengurutkan turun (dari terbesar)",
   "Menentukan bilangan yang terletak di antara dua bilangan",
   "Menggunakan garis bilangan dan papan seratus sebagai alat pembanding",
   "Menentukan bilangan terbesar dan terkecil dari sekumpulan bilangan"
  ],
  "rumus": [
   "Bandingkan angka puluhan lebih dulu; jika sama, baru bandingkan angka satuannya"
  ],
  "miskonsepsi": [
   "Membandingkan hanya dari angka satuan sehingga menganggap 19 lebih besar dari 91",
   "Membandingkan dari banyaknya angka tanpa memperhatikan nilainya",
   "Membalik arah simbol > dan <"
  ],
  "kenapa": [
   "Kenapa cukup melihat angka puluhan lebih dulu untuk tahu mana yang lebih besar?",
   "Kenapa 91 lebih besar dari 19 padahal angka penyusunnya sama?"
  ],
  "prasyarat": [
   "sd2-nilai-tempat-puluhan-dan-satuan",
   "sd1-garis-bilangan-dan-membilang-maju",
   "sd1-membandingkan-banyak-benda-dan-bilangan"
  ]
 },
 {
  "id": "sd2-membilang-dan-mengelompokkan-bilangan-sampai",
  "judul": "Membilang dan Mengelompokkan Bilangan sampai 100",
  "kelas": 2,
  "fase": "A",
  "domain": "bilangan",
  "ringkas": "Membilang benda yang banyak dengan mengelompokkan per sepuluh",
  "subKonsep": [
   "Mengelompokkan sepuluh-sepuluh sebagai kunci membilang benda yang banyak",
   "Nama dan lambang bilangan 21 sampai 100",
   "Pola nama bilangan puluhan: dua puluh, tiga puluh, empat puluh, dan seterusnya",
   "Membilang lompat 2, 5, dan 10 dari bilangan mana pun",
   "Papan seratus (hundred chart) dan pola baris serta kolomnya",
   "Menyeberang puluhan saat membilang maju maupun mundur",
   "Bilangan 100 sebagai sepuluh kelompok sepuluh"
  ],
  "rumus": [],
  "miskonsepsi": [
   "Kesulitan menyeberang puluhan sehingga setelah 29 menyebut 'dua puluh sepuluh'",
   "Menuliskan 'tujuh puluh lima' menjadi 705 karena menerjemahkan kata per kata",
   "Tetap membilang satu-satu untuk benda yang sangat banyak sehingga sering keliru"
  ],
  "kenapa": [
   "Kenapa lebih mudah menghitung 84 kelereng dengan mengelompokkan sepuluh-sepuluh?",
   "Kenapa setelah 29 yang muncul 30, bukan 'dua puluh sepuluh'?"
  ],
  "prasyarat": [
   "sd1-membaca-dan-menulis-lambang-bilangan",
   "sd1-garis-bilangan-dan-membilang-maju",
   "sd1-pasangan-bilangan-10-komposisi-dan"
  ]
 },
 {
  "id": "sd2-nilai-tempat-puluhan-dan-satuan",
  "judul": "Nilai Tempat Puluhan dan Satuan",
  "kelas": 2,
  "fase": "A",
  "domain": "bilangan",
  "ringkas": "Menyebutkan nilai tempat dan nilai setiap angka pada bilangan dua angka",
  "subKonsep": [
   "Sistem bilangan berbasis sepuluh (desimal)",
   "Aturan penukaran: 10 satuan = 1 puluhan",
   "Letak angka menentukan nilainya",
   "Perbedaan angka, nilai angka, dan nilai tempat",
   "Peran angka 0 sebagai penahan tempat (contoh 40, 70)",
   "Representasi konkret: kubus satuan dan batang puluhan (blok Dienes), sedotan diikat sepuluhan",
   "Bentuk panjang bilangan (67 = 60 + 7)",
   "Uang rupiah sebagai konteks nilai tempat (Rp10.000 dan Rp1.000)"
  ],
  "rumus": [
   "Bilangan dua angka = (angka puluhan x 10) + (angka satuan x 1)",
   "67 = 60 + 7 (bentuk panjang)",
   "10 satuan = 1 puluhan; 10 puluhan = 1 ratusan"
  ],
  "miskonsepsi": [
   "Membaca 45 sebagai 'angka 4 dan angka 5' tanpa menyadari 4 bernilai 40",
   "Menganggap 24 dan 42 sama karena angkanya sama",
   "Mengira 0 pada 30 tidak ada gunanya sehingga menuliskan 30 sebagai 3"
  ],
  "kenapa": [
   "Kenapa angka 4 pada 45 bernilai 40, bukan 4?",
   "Kenapa 24 dan 42 berbeda padahal angkanya sama persis?"
  ],
  "konsep": [
   "nilai-tempat"
  ],
  "prasyarat": [
   "sd2-membilang-dan-mengelompokkan-bilangan-sampai",
   "sd1-pasangan-bilangan-10-komposisi-dan"
  ]
 },
 {
  "id": "sd2-pecahan-setengah-dan-seperempat",
  "judul": "Pecahan Setengah dan Seperempat",
  "kelas": 2,
  "fase": "A",
  "domain": "bilangan",
  "ringkas": "Melipat atau memotong benda menjadi 2 dan 4 bagian yang sama besar",
  "subKonsep": [
   "Keseluruhan (satu utuh) sebagai acuan pecahan",
   "Syarat mutlak: bagian-bagian harus sama besar atau sama banyak",
   "Setengah sebagai 1 dari 2 bagian yang sama",
   "Seperempat sebagai 1 dari 4 bagian yang sama",
   "Pecahan pada satu benda utuh (luas, panjang) dan pada kumpulan benda",
   "Lambang pecahan 1/2 dan 1/4 serta cara membacanya",
   "Makna sederhana pembilang (bagian yang diambil) dan penyebut (banyak bagian sama)",
   "Hubungan dua seperempat sama dengan setengah"
  ],
  "rumus": [
   "1/2 = 1 dari 2 bagian yang sama besar",
   "1/4 = 1 dari 4 bagian yang sama besar",
   "1/4 + 1/4 = 1/2",
   "1/2 + 1/2 = 1 (satu utuh)",
   "1/4 + 1/4 + 1/4 + 1/4 = 1 (satu utuh)"
  ],
  "miskonsepsi": [
   "Menyebut bagian mana pun sebagai 'setengah' walaupun ukurannya tidak sama besar",
   "Mengira setengah harus selalu berbentuk sama persis, sehingga menolak lingkaran yang dipotong dengan arah berbeda",
   "Mengira 1/4 lebih besar dari 1/2 karena 4 lebih besar dari 2"
  ],
  "kenapa": [
   "Kenapa dua bagian yang tidak sama besar tidak boleh disebut setengah?",
   "Kenapa 1/4 lebih kecil daripada 1/2 padahal angka 4 lebih besar dari 2?"
  ],
  "prasyarat": [
   "sd1-membilang-benda-sampai-10",
   "sd1-membandingkan-banyak-benda-dan-bilangan",
   "sd1-pasangan-bilangan-10-komposisi-dan"
  ]
 },
 {
  "id": "sd2-strategi-berhitung-mental-dengan-puluhan",
  "judul": "Strategi Berhitung Mental dengan Puluhan",
  "kelas": 2,
  "fase": "A",
  "domain": "bilangan",
  "ringkas": "Berhitung mental dengan puluhan bulat",
  "subKonsep": [
   "Menjumlah dan mengurangi puluhan bulat (30 + 20, 70 - 40)",
   "Menjumlah bilangan dua angka dengan satuan tanpa menyimpan (34 + 5)",
   "Melompat ke puluhan terdekat lebih dulu (38 + 7 = 38 + 2 + 5)",
   "Mengurai bilangan menurut nilai tempat sebelum menghitung",
   "Menambah dan mengurangi 10 dari bilangan dua angka",
   "Memeriksa kewajaran hasil hitung",
   "Menjelaskan langkah berhitung secara lisan"
  ],
  "rumus": [
   "30 + 20 = (3 + 2) puluhan = 5 puluhan = 50",
   "38 + 7 = 38 + 2 + 5 = 40 + 5 = 45 (lompat ke puluhan terdekat)",
   "n + 10 menambah 1 pada angka puluhan, angka satuan tetap"
  ],
  "miskonsepsi": [
   "Menjumlah angka per angka tanpa memperhatikan nilai tempat (34 + 5 dijawab 84 karena 3 + 5)",
   "Mengira berhitung mental berarti harus membayangkan cara bersusun di kepala",
   "Menjumlahkan puluhan dengan satuan tanpa memahami alasannya"
  ],
  "kenapa": [
   "Kenapa 30 + 20 bisa dijawab cepat dengan berpikir '3 puluhan tambah 2 puluhan'?",
   "Kenapa melompat ke puluhan terdekat lebih dulu membuat hitungan jadi lebih mudah?"
  ],
  "prasyarat": [
   "sd2-nilai-tempat-puluhan-dan-satuan",
   "sd2-komposisi-dan-dekomposisi-bilangan-dua",
   "sd1-penjumlahan-bilangan-cacah-sampai-20",
   "sd1-pasangan-bilangan-10-komposisi-dan"
  ]
 },
 {
  "id": "sd2-membaca-membandingkan-dan-menafsirkan-data",
  "judul": "Membaca, Membandingkan, dan Menafsirkan Data Sederhana",
  "kelas": 2,
  "fase": "A",
  "domain": "data",
  "ringkas": "Menjawab pertanyaan berdasarkan tabel atau piktogram",
  "subKonsep": [
   "Membaca banyak data setiap kategori dari tabel atau piktogram",
   "Menentukan kategori terbanyak dan kategori tersedikit",
   "Membandingkan dua kategori dan menghitung selisihnya",
   "Mengurutkan kategori menurut banyak datanya",
   "Menghitung jumlah seluruh data",
   "Menjawab pertanyaan berdasarkan data, bukan berdasarkan pendapat pribadi",
   "Membuat kesimpulan sederhana dan usulan tindakan dari data",
   "Batas kesimpulan: data satu kelas tidak mewakili seluruh sekolah"
  ],
  "rumus": [
   "Selisih dua kategori = banyak data terbesar - banyak data terkecil",
   "Jumlah seluruh data = penjumlahan banyak data semua kategori"
  ],
  "miskonsepsi": [
   "Menjawab berdasarkan kesukaan pribadi, bukan berdasarkan data yang tersaji",
   "Menentukan kategori terbanyak dari gambar yang paling besar, bukan yang paling banyak",
   "Menjumlahkan padahal yang ditanyakan adalah selisih"
  ],
  "kenapa": [
   "Kenapa jawaban kita harus berasal dari data, bukan dari perasaan atau tebakan?",
   "Kenapa data satu kelas belum tentu menggambarkan keadaan seluruh sekolah?"
  ],
  "prasyarat": [
   "sd2-menyajikan-data-dengan-piktogram-maksimal",
   "sd1-pengurangan-bilangan-cacah-sampai-20",
   "sd2-membandingkan-dan-mengurutkan-bilangan-sampai",
   "sd2-strategi-berhitung-mental-dengan-puluhan"
  ]
 },
 {
  "id": "sd2-mengumpulkan-data-dan-mencatat-dengan",
  "judul": "Mengumpulkan Data dan Mencatat dengan Turus",
  "kelas": 2,
  "fase": "A",
  "domain": "data",
  "ringkas": "Menyusun pertanyaan untuk mengumpulkan data di kelas",
  "subKonsep": [
   "Pertanyaan sederhana sebagai awal pengumpulan data",
   "Data sebagai kumpulan keterangan hasil pengamatan atau pertanyaan",
   "Turus sebagai cara mencatat cepat saat data datang satu per satu",
   "Aturan turus: empat garis tegak lalu garis kelima menyilang",
   "Membaca turus dengan menghitung lima-lima",
   "Tabel data sederhana berisi kategori dan banyaknya data",
   "Memastikan setiap responden dicatat tepat satu kali",
   "Pertanyaan yang baik menghasilkan jawaban yang bisa dikelompokkan"
  ],
  "rumus": [
   "Satu kelompok turus (empat garis tegak dicoret satu garis miring) = 5 data",
   "Banyak data = (banyak kelompok turus x 5) + sisa garis turus"
  ],
  "miskonsepsi": [
   "Menuliskan turus sebagai lima garis tegak tanpa garis menyilang",
   "Menghitung turus satu per satu, bukan lima-lima, sehingga kehilangan keuntungan turus",
   "Mencatat data yang sama dua kali atau melewatkan responden"
  ],
  "kenapa": [
   "Kenapa turus dibuat berkelompok lima, bukan sepuluh atau tiga?",
   "Kenapa mencatat dengan turus lebih cepat daripada menulis angka satu per satu?"
  ],
  "prasyarat": [
   "sd1-menyortir-dan-mengelompokkan-benda-menurut",
   "sd2-membilang-dan-mengelompokkan-bilangan-sampai",
   "sd2-strategi-berhitung-mental-dengan-puluhan"
  ]
 },
 {
  "id": "sd2-menyajikan-data-dengan-piktogram-maksimal",
  "judul": "Menyajikan Data dengan Piktogram (Maksimal 4 Kategori)",
  "kelas": 2,
  "fase": "A",
  "domain": "data",
  "ringkas": "Membuat piktogram maksimal 4 kategori dari data kelas",
  "subKonsep": [
   "Piktogram sebagai diagram yang memakai gambar untuk mewakili data",
   "Skala satu satuan: satu gambar mewakili satu data",
   "Bagian piktogram: judul, nama kategori, gambar, dan keterangan",
   "Semua gambar harus berukuran sama dan berjarak sama",
   "Semua kolom atau baris dimulai dari garis dasar yang sama",
   "Membaca banyak data langsung dari banyaknya gambar",
   "Mengubah tabel turus menjadi piktogram dan sebaliknya",
   "Batas maksimal 4 kategori agar mudah dibaca"
  ],
  "rumus": [
   "Banyak data suatu kategori = banyak gambar x nilai satu gambar (di Fase A nilai satu gambar = 1)"
  ],
  "miskonsepsi": [
   "Menggambar dengan ukuran berbeda-beda sehingga kategori dengan gambar besar terlihat lebih banyak",
   "Memberi jarak yang tidak sama antargambar sehingga baris terlihat lebih panjang",
   "Lupa menuliskan keterangan bahwa satu gambar mewakili berapa data"
  ],
  "kenapa": [
   "Kenapa semua gambar pada piktogram harus sama besar dan berjarak sama?",
   "Kenapa piktogram perlu keterangan '1 gambar mewakili 1 anak'?"
  ],
  "prasyarat": [
   "sd2-mengumpulkan-data-dan-mencatat-dengan",
   "sd1-menyortir-dan-mengelompokkan-benda-menurut",
   "sd2-membandingkan-dan-mengurutkan-bilangan-sampai"
  ]
 },
 {
  "id": "sd2-komposisi-dan-dekomposisi-bangun-datar",
  "judul": "Komposisi dan Dekomposisi Bangun Datar",
  "kelas": 2,
  "fase": "A",
  "domain": "geometri",
  "ringkas": "Menyusun bentuk baru dari potongan tangram",
  "subKonsep": [
   "Komposisi: menyusun bangun baru dari beberapa bangun (dua segitiga siku-siku menjadi persegi panjang)",
   "Dekomposisi: mengurai satu bangun menjadi beberapa bangun yang lebih sederhana",
   "Tangram sebagai alat komposisi dan dekomposisi",
   "Pengubinan: menutup bidang tanpa celah dan tanpa tumpang tindih",
   "Bangun yang bisa dan tidak bisa dipakai mengubin",
   "Memutar dan membalik potongan sebagai bagian dari penyusunan",
   "Kekekalan luas: luas total tetap sama meskipun potongan disusun ulang",
   "Menyusun satu bangun dengan lebih dari satu cara"
  ],
  "rumus": [],
  "miskonsepsi": [
   "Mengira bangun hasil susunan menjadi lebih luas hanya karena bentuknya berubah",
   "Menyusun dengan celah atau tumpang tindih lalu tetap menyebutnya pengubinan",
   "Mengira semua bangun datar bisa dipakai mengubin, termasuk lingkaran"
  ],
  "kenapa": [
   "Kenapa luas totalnya tetap sama walaupun potongannya disusun menjadi bentuk baru?",
   "Kenapa lingkaran tidak bisa dipakai mengubin lantai tanpa celah?"
  ],
  "prasyarat": [
   "sd1-mengenal-dan-mengelompokkan-bangun-datar",
   "sd1-pola-bukan-bilangan-gambar-warna"
  ]
 },
 {
  "id": "sd2-mengenal-bangun-ruang-balok-kubus",
  "judul": "Mengenal Bangun Ruang (Balok, Kubus, Kerucut, dan Bola)",
  "kelas": 2,
  "fase": "A",
  "domain": "geometri",
  "ringkas": "Menyebutkan nama bangun ruang beserta ciri-cirinya",
  "subKonsep": [
   "Perbedaan bangun datar (rata, hanya bisa digambar) dan bangun ruang (memakan tempat, bisa dipegang)",
   "Unsur bangun ruang: sisi atau permukaan, rusuk, dan titik sudut",
   "Ciri balok, kubus, kerucut, dan bola",
   "Permukaan datar dan permukaan lengkung",
   "Sifat menggelinding, meluncur, dan dapat ditumpuk",
   "Hubungan bangun ruang dengan bangun datar pada permukaannya",
   "Kubus sebagai balok khusus dengan semua rusuk sama panjang",
   "Rusuk dan titik sudut yang tersembunyi pada gambar bangun ruang"
  ],
  "rumus": [
   "Kubus: 6 sisi berbentuk persegi, 12 rusuk sama panjang, 8 titik sudut",
   "Balok: 6 sisi berbentuk persegi panjang, 12 rusuk, 8 titik sudut",
   "Bola: 1 permukaan lengkung, tanpa rusuk dan tanpa titik sudut",
   "Kerucut: 1 permukaan lengkung dan 1 sisi lingkaran, 1 rusuk lengkung, 1 titik puncak"
  ],
  "miskonsepsi": [
   "Menyebut kubus sebagai 'persegi' dan balok sebagai 'persegi panjang'",
   "Mengira semua kotak adalah kubus",
   "Mengira bola dan lingkaran adalah hal yang sama"
  ],
  "kenapa": [
   "Kenapa kubus berbeda dari persegi padahal semua permukaannya berbentuk persegi?",
   "Kenapa bola bisa menggelinding ke segala arah tetapi kerucut hanya berputar melingkar?"
  ],
  "prasyarat": [
   "sd1-mengenal-dan-mengelompokkan-bangun-datar",
   "sd1-membilang-benda-sampai-10",
   "sd2-membilang-dan-mengelompokkan-bilangan-sampai"
  ]
 },
 {
  "id": "sd2-estimasi-panjang-dan-berat",
  "judul": "Estimasi Panjang dan Berat",
  "kelas": 2,
  "fase": "A",
  "domain": "pengukuran",
  "ringkas": "Memperkirakan panjang benda dalam jengkal atau langkah lalu mengukurnya",
  "subKonsep": [
   "Memperkirakan sebelum mengukur sebagai kebiasaan berpikir",
   "Patokan tubuh sebagai acuan: lebar jari, jengkal, langkah, depa",
   "Menilai kewajaran hasil ukur",
   "Selisih antara perkiraan dan hasil ukur sebenarnya",
   "Memperbaiki kemampuan memperkirakan melalui latihan berulang",
   "Perkiraan dinyatakan dengan kata kira-kira, sekitar, hampir",
   "Perkiraan sebagai alat pemeriksa kesalahan pengukuran"
  ],
  "rumus": [],
  "miskonsepsi": [
   "Menganggap perkiraan yang meleset sebagai kesalahan yang harus dihapus",
   "Mengukur dulu baru menuliskannya sebagai 'perkiraan'",
   "Menyebut angka asal tanpa memakai patokan apa pun"
  ],
  "kenapa": [
   "Kenapa memperkirakan dulu membuat kita cepat sadar kalau hasil ukur kita salah?",
   "Kenapa jengkal tangan bisa dipakai sebagai patokan perkiraan?"
  ],
  "prasyarat": [
   "sd1-mengukur-panjang-dengan-satuan-tidak",
   "sd2-mengukur-berat-dengan-satuan-tidak",
   "sd2-estimasi-dan-perkiraan-banyak-benda"
  ]
 },
 {
  "id": "sd2-membandingkan-durasi-waktu",
  "judul": "Membandingkan Durasi Waktu",
  "kelas": 2,
  "fase": "A",
  "domain": "pengukuran",
  "ringkas": "Mengurutkan kejadian sehari-hari menurut waktunya",
  "subKonsep": [
   "Waktu sebagai urutan kejadian: sebelum, sesudah, sekarang",
   "Durasi sebagai lamanya suatu kegiatan berlangsung",
   "Kata perbandingan durasi: lebih lama, lebih sebentar, sama lama",
   "Mengukur durasi dengan alat tidak baku: hitungan berirama, tepukan, ayunan, botol pasir/air",
   "Bagian hari sebagai patokan waktu: pagi, siang, sore, malam",
   "Urutan hari dalam seminggu dan urutan bulan",
   "Membedakan 'kapan' (saat kejadian) dan 'berapa lama' (durasi)",
   "Membandingkan durasi memerlukan waktu mulai yang sama atau alat ukur yang sama"
  ],
  "rumus": [],
  "miskonsepsi": [
   "Mengira kegiatan yang lebih menyenangkan berarti lebih sebentar (menilai perasaan, bukan durasi)",
   "Mengira kegiatan yang selesai lebih dulu pasti lebih sebentar padahal waktu mulainya berbeda",
   "Mencampur 'kapan' (waktu kejadian) dengan 'berapa lama' (durasi)"
  ],
  "kenapa": [
   "Kenapa kegiatan yang selesai lebih dulu belum tentu berlangsung lebih sebentar?",
   "Kenapa waktu istirahat terasa cepat tetapi menunggu terasa lama padahal jamnya sama?"
  ],
  "prasyarat": [
   "sd1-membandingkan-panjang-dan-tinggi-secara",
   "sd1-membilang-benda-sampai-10",
   "sd2-membandingkan-dan-mengurutkan-bilangan-sampai"
  ]
 },
 {
  "id": "sd2-mengenal-jam-dan-membaca-waktu",
  "judul": "Mengenal Jam dan Membaca Waktu (Pengantar)",
  "kelas": 2,
  "fase": "A",
  "domain": "pengukuran",
  "ringkas": "Membaca jam tepat dan setengah jam pada jam analog",
  "subKonsep": [
   "Jarum pendek menunjukkan jam, jarum panjang menunjukkan menit",
   "Membaca waktu tepat (pukul 7, pukul 12)",
   "Membaca setengah jam (pukul 7.30 atau pukul setengah delapan)",
   "Arah putaran jarum jam selalu searah jarum jam",
   "Angka pada jam mewakili 5 menit untuk jarum panjang",
   "Jam analog dan jam digital sebagai dua cara menampilkan waktu yang sama",
   "Penulisan waktu dengan kata 'pukul', bukan 'jam'",
   "Menghubungkan waktu dengan kegiatan sehari-hari"
  ],
  "rumus": [
   "1 jam = 60 menit",
   "1 hari = 24 jam",
   "Jarum panjang di angka n menunjuk n x 5 menit"
  ],
  "miskonsepsi": [
   "Tertukar antara jarum pendek dan jarum panjang saat membaca",
   "Membaca jarum panjang di angka 6 sebagai 'pukul 6' alih-alih 30 menit",
   "Membaca pukul 7.30 sebagai 'pukul setengah tujuh' mengikuti kebiasaan bahasa daerah"
  ],
  "kenapa": [
   "Kenapa jarum panjang di angka 6 berarti 30 menit, bukan 6 menit?",
   "Kenapa jarum yang lebih pendek justru yang menunjukkan jam?"
  ],
  "prasyarat": [
   "sd2-membandingkan-durasi-waktu",
   "sd2-membilang-dan-mengelompokkan-bilangan-sampai",
   "sd1-bilangan-urutan-ordinal-ke-1"
  ]
 },
 {
  "id": "sd2-mengenal-satuan-baku-panjang-dan",
  "judul": "Mengenal Satuan Baku Panjang dan Berat (Jembatan ke Fase B)",
  "kelas": 2,
  "fase": "A",
  "domain": "pengukuran",
  "ringkas": "Mengukur panjang benda pendek dengan penggaris dalam satuan cm",
  "subKonsep": [
   "Masalah satuan tidak baku: hasilnya berbeda-beda antarorang",
   "Perlunya satuan yang disepakati bersama oleh semua orang",
   "Sentimeter (cm) dan meter (m) sebagai satuan baku panjang",
   "Gram (g) dan kilogram (kg) sebagai satuan baku berat",
   "Membaca penggaris dengan memulai dari angka 0",
   "Membaca ruas antargaris skala, bukan menghitung garisnya",
   "Memilih satuan yang masuk akal untuk benda yang diukur",
   "Membaca timbangan berskala sederhana"
  ],
  "rumus": [
   "1 m = 100 cm",
   "1 kg = 1.000 g",
   "Panjang benda = bacaan skala akhir - bacaan skala awal pada penggaris"
  ],
  "miskonsepsi": [
   "Mulai mengukur dari ujung fisik penggaris, bukan dari angka 0, sehingga hasil kelebihan",
   "Menghitung garis skala alih-alih menghitung ruas antargaris",
   "Menyebut satuan yang tidak masuk akal (panjang pensil 15 m, berat gajah 5 gram)"
  ],
  "kenapa": [
   "Kenapa jengkal tidak cukup dipakai saat kita membeli kain di toko?",
   "Kenapa pengukuran harus dimulai dari angka 0 pada penggaris, bukan dari ujung penggarisnya?"
  ],
  "prasyarat": [
   "sd1-mengukur-panjang-dengan-satuan-tidak",
   "sd2-mengukur-berat-dengan-satuan-tidak",
   "sd2-estimasi-panjang-dan-berat",
   "sd2-membilang-dan-mengelompokkan-bilangan-sampai"
  ]
 },
 {
  "id": "sd2-mengukur-berat-dengan-satuan-tidak",
  "judul": "Mengukur Berat dengan Satuan Tidak Baku",
  "kelas": 2,
  "fase": "A",
  "domain": "pengukuran",
  "ringkas": "Menimbang benda menggunakan satuan tidak baku sampai neraca seimbang",
  "subKonsep": [
   "Satuan tidak baku untuk berat: kelereng, biji jagung, koin, kubus satuan, klip",
   "Menimbang dengan neraca dua lengan sampai posisinya seimbang",
   "Hasil ukur berat sebagai banyaknya satuan penyeimbang",
   "Semua satuan penyeimbang harus sejenis dan sama beratnya",
   "Memperkirakan berat sebelum menimbang",
   "Membandingkan berat dua benda dari bilangan hasil ukurnya",
   "Satuan yang lebih ringan menghasilkan bilangan hasil ukur yang lebih besar"
  ],
  "rumus": [
   "Berat benda = banyaknya satuan penyeimbang saat neraca seimbang"
  ],
  "miskonsepsi": [
   "Mencampur jenis satuan penyeimbang (kelereng dan koin) dalam satu pengukuran",
   "Mengira makin banyak satuan penyeimbang berarti benda makin besar ukurannya",
   "Membaca hasil sebelum neraca benar-benar seimbang"
  ],
  "kenapa": [
   "Kenapa semua satuan penyeimbang harus sejenis dan sama beratnya?",
   "Kenapa kita perlu memperkirakan dulu sebelum menimbang?"
  ],
  "prasyarat": [
   "sd1-membandingkan-berat-secara-langsung",
   "sd1-mengukur-panjang-dengan-satuan-tidak",
   "sd2-membilang-dan-mengelompokkan-bilangan-sampai"
  ]
 }
]

export default topik
