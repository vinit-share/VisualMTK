/* ============================================================
   Visual MTK — Peta topik kurikulum (DIHASILKAN OTOMATIS)

   Jangan sunting berkas ini dengan tangan.
   Sumber: docs/riset/02-fase-*.json (hasil riset Capaian Pembelajaran
   Kepka BSKAP Kemendikdasmen No. 046/H/KR/2025).
   Bangun ulang: node scripts/bangun-kurikulum.mjs
   ============================================================ */

import type { Topic } from '../lib/types'

export interface TopikKurikulum extends Topic {
  /** pertanyaan "kenapa" yang layak divisualkan untuk topik ini. */
  kenapa?: string[]
}

export const TOPIK_GENERATED: TopikKurikulum[] = [
  {
    "id": "sd1-makna-simbol-dan-keseimbangan",
    "judul": "Makna Simbol +, -, dan = (Keseimbangan)",
    "kelas": 1,
    "fase": "A",
    "domain": "aljabar",
    "ringkas": "Membaca dan menuliskan kalimat matematika dengan simbol +, -, dan =",
    "subKonsep": [
      "Simbol + dibaca 'ditambah', bermakna digabungkan dengan",
      "Simbol - dibaca 'dikurang', bermakna diambil atau dibandingkan",
      "Simbol = dibaca 'sama dengan', bermakna kedua ruas bernilai sama, bukan 'hasilnya'",
      "Timbangan atau neraca dua lengan sebagai model keseimbangan tanda sama dengan",
      "Kalimat matematika yang benar dan yang salah",
      "Bentuk tidak baku yang tetap benar: 7 = 3 + 4 dan 3 + 4 = 4 + 3",
      "Ruas kiri dan ruas kanan sebuah kalimat matematika",
      "Menerjemahkan gambar menjadi kalimat matematika dan sebaliknya"
    ],
    "rumus": [
      "Ruas kiri = ruas kanan (kedua ruas harus bernilai sama)",
      "Jika a = b maka b = a (tanda sama dengan berlaku dua arah)"
    ],
    "miskonsepsi": [
      "Membaca '=' sebagai perintah 'tulis jawabannya di sini' sehingga menolak bentuk 7 = 3 + 4",
      "Menjawab 8 pada soal 3 + 5 = ... + 2 karena mengisi hasil ruas kiri saja",
      "Menuliskan kalimat berantai yang salah, misalnya 3 + 5 = 8 + 2 = 10"
    ],
    "kenapa": [
      "Kenapa tanda '=' berarti 'sama nilainya', bukan 'hasilnya adalah'?",
      "Kenapa 7 = 3 + 4 juga merupakan kalimat matematika yang benar?"
    ],
    "prasyarat": [
      "sd1-membilang-benda-sampai-10",
      "sd1-membandingkan-banyak-benda-dan-bilangan",
      "sd1-membaca-dan-menulis-lambang-bilangan"
    ]
  },
  {
    "id": "sd1-pola-bukan-bilangan-gambar-warna",
    "judul": "Pola Bukan Bilangan (Gambar, Warna, Bunyi, dan Gerak)",
    "kelas": 1,
    "fase": "A",
    "domain": "aljabar",
    "ringkas": "Menemukan bagian pola yang berulang (unit pola)",
    "subKonsep": [
      "Unit pola: bagian terkecil yang berulang",
      "Jenis pola berulang: AB, ABB, AAB, ABC",
      "Empat kegiatan pola: mengenali, meniru, melanjutkan, dan membuat sendiri",
      "Pola pada bunyi (tepuk-hentak), gerak (jongkok-berdiri), dan warna",
      "Pola pada benda budaya sehari-hari: motif batik, susunan ubin, anyaman, pagar",
      "Memperbaiki pola yang rusak atau ada bagian hilang di tengah",
      "Menerjemahkan pola dari satu bentuk ke bentuk lain (warna menjadi bunyi menjadi huruf)"
    ],
    "rumus": [],
    "miskonsepsi": [
      "Hanya melanjutkan satu benda berikutnya tanpa menemukan unit pola yang berulang",
      "Mengira pola harus selalu berbentuk AB (dua benda bergantian)",
      "Menganggap urutan acak yang menarik sebagai sebuah pola"
    ],
    "kenapa": [
      "Kenapa kita harus menemukan bagian yang berulang dulu sebelum melanjutkan pola?",
      "Kenapa pola warna merah-biru-biru bisa diterjemahkan menjadi pola bunyi tepuk-hentak-hentak?"
    ],
    "prasyarat": [
      "sd1-membilang-benda-sampai-10",
      "sd1-menyortir-dan-mengelompokkan-benda-menurut"
    ]
  },
  {
    "id": "sd1-bilangan-urutan-ordinal-ke-1",
    "judul": "Bilangan Urutan (Ordinal): ke-1, ke-2, ke-3",
    "kelas": 1,
    "fase": "A",
    "domain": "bilangan",
    "ringkas": "Menyebut posisi benda atau orang dalam barisan",
    "subKonsep": [
      "Perbedaan bilangan kardinal (berapa banyak) dan bilangan ordinal (urutan ke berapa)",
      "Titik awal sebagai acuan menghitung urutan",
      "Arah urutan: dari depan atau dari belakang, dari kiri atau dari kanan",
      "Penulisan bentuk ordinal: ke-3, ketiga, pertama/kesatu",
      "Bilangan ordinal dalam kehidupan sehari-hari: antrean, lomba, lantai gedung, tanggal"
    ],
    "rumus": [],
    "miskonsepsi": [
      "Mencampur makna '3 benda' dengan 'benda ke-3'",
      "Mengira posisi ke-3 berarti ada 3 benda di posisi itu",
      "Tidak menyadari bahwa urutan menjadi berbeda bila dihitung dari ujung yang lain"
    ],
    "kenapa": [
      "Kenapa 'ada 5 anak' berbeda artinya dengan 'anak ke-5'?",
      "Kenapa jawaban 'siapa yang ke-2' bisa berubah kalau kita menghitung dari arah yang lain?"
    ],
    "prasyarat": [
      "sd1-membilang-benda-sampai-10",
      "sd1-membaca-dan-menulis-lambang-bilangan"
    ]
  },
  {
    "id": "sd1-garis-bilangan-dan-membilang-maju",
    "judul": "Garis Bilangan dan Membilang Maju-Mundur",
    "kelas": 1,
    "fase": "A",
    "domain": "bilangan",
    "ringkas": "Menempatkan bilangan pada garis bilangan sampai 20 lalu sampai 100",
    "subKonsep": [
      "Garis bilangan sebagai deretan titik dengan jarak yang sama",
      "Titik nol sebagai pangkal garis bilangan",
      "Membilang maju sebagai lompatan +1 ke kanan dan membilang mundur sebagai lompatan -1 ke kiri",
      "Bilangan sebelum dan bilangan sesudah suatu bilangan",
      "Melompat teratur 2, 5, dan 10 pada garis bilangan",
      "Letak pada garis bilangan menentukan besar-kecilnya bilangan",
      "Jarak antara dua bilangan dihitung dari banyaknya lompatan, bukan banyaknya titik"
    ],
    "rumus": [
      "Bilangan sesudah n adalah n + 1",
      "Bilangan sebelum n adalah n - 1",
      "Banyak langkah dari a ke b = b - a (untuk b lebih dari a)"
    ],
    "miskonsepsi": [
      "Menghitung titik alih-alih menghitung lompatan saat menentukan jarak dua bilangan",
      "Membuat jarak antarbilangan tidak sama saat menggambar garis bilangan sendiri",
      "Lupa menuliskan 0 sebagai pangkal garis bilangan"
    ],
    "kenapa": [
      "Kenapa jarak antarbilangan pada garis bilangan harus dibuat sama?",
      "Kenapa bilangan yang letaknya di sebelah kanan selalu lebih besar?"
    ],
    "prasyarat": [
      "sd1-membaca-dan-menulis-lambang-bilangan",
      "sd1-membandingkan-banyak-benda-dan-bilangan"
    ]
  },
  {
    "id": "sd1-hubungan-penjumlahan-dan-pengurangan-keluarga",
    "judul": "Hubungan Penjumlahan dan Pengurangan (Keluarga Fakta)",
    "kelas": 1,
    "fase": "A",
    "domain": "bilangan",
    "ringkas": "Menuliskan empat kalimat matematika dari satu keluarga fakta",
    "subKonsep": [
      "Penjumlahan dan pengurangan sebagai dua operasi yang saling berkebalikan",
      "Keluarga fakta dari tiga bilangan (contoh 4, 6, 10 menghasilkan empat kalimat matematika)",
      "Diagram bagian-bagian-keseluruhan sebagai penghubung kedua operasi",
      "Memeriksa hasil pengurangan dengan penjumlahan dan sebaliknya",
      "Mengubah soal pengurangan menjadi soal penjumlahan dengan bagian yang hilang",
      "Syarat tiga bilangan bisa membentuk keluarga fakta"
    ],
    "rumus": [
      "Jika a + b = c maka berlaku juga b + a = c, c - a = b, dan c - b = a"
    ],
    "miskonsepsi": [
      "Menganggap penjumlahan dan pengurangan sebagai dua hal terpisah yang harus dihafal sendiri-sendiri",
      "Menulis keluarga fakta yang keliru, misalnya 10 + 6 = 4",
      "Mengira setiap tiga bilangan apa pun bisa membentuk keluarga fakta"
    ],
    "kenapa": [
      "Kenapa dari tiga bilangan yang sama bisa dibuat empat kalimat matematika yang berbeda?",
      "Kenapa hasil pengurangan bisa diperiksa dengan penjumlahan?"
    ],
    "prasyarat": [
      "sd1-penjumlahan-bilangan-cacah-sampai-20",
      "sd1-pengurangan-bilangan-cacah-sampai-20"
    ]
  },
  {
    "id": "sd1-membaca-dan-menulis-lambang-bilangan",
    "judul": "Membaca dan Menulis Lambang Bilangan sampai 20",
    "kelas": 1,
    "fase": "A",
    "domain": "bilangan",
    "ringkas": "Menulis lambang bilangan 0-20 dengan bentuk yang benar",
    "subKonsep": [
      "Perbedaan bilangan (konsep banyaknya), angka/lambang bilangan (simbol tertulis), dan nama bilangan (kata)",
      "Menulis angka 0-9 dengan arah goresan yang benar",
      "Bilangan 11-19 sebagai 'satu puluhan lebih sekian'",
      "Pola nama bilangan Indonesia: sebelas, dua belas, tiga belas, ... sembilan belas, dua puluh",
      "Memasangkan tiga representasi: banyak benda - lambang bilangan - nama bilangan",
      "Bilangan 20 sebagai dua kelompok sepuluh"
    ],
    "rumus": [],
    "miskonsepsi": [
      "Menulis angka terbalik cermin, terutama 3, 5, 7, dan 9",
      "Menulis 'sebelas' menjadi 101 dan 'dua belas' menjadi 102 karena menerjemahkan kata per kata",
      "Menyamakan istilah 'angka' dengan 'bilangan' sehingga menyebut 12 sebagai 'dua angka jadi dua bilangan'"
    ],
    "kenapa": [
      "Kenapa 'sebelas' ditulis 11 dan bukan 101?",
      "Kenapa lambang angka 1 yang sama bisa berarti banyak yang berbeda tergantung letaknya (1, 12, 21)?"
    ],
    "prasyarat": [
      "sd1-membilang-benda-sampai-10"
    ]
  },
  {
    "id": "sd1-membandingkan-banyak-benda-dan-bilangan",
    "judul": "Membandingkan Banyak Benda dan Bilangan sampai 20",
    "kelas": 1,
    "fase": "A",
    "domain": "bilangan",
    "ringkas": "Memasangkan dua kelompok benda untuk menentukan mana yang lebih banyak",
    "subKonsep": [
      "Membandingkan dengan memasangkan satu-satu tanpa perlu membilang",
      "Kata perbandingan: lebih banyak, lebih sedikit, sama banyak",
      "Simbol perbandingan >, <, dan = beserta cara membacanya",
      "Membandingkan lewat urutan membilang: bilangan yang disebut belakangan lebih besar",
      "Membandingkan dengan bantuan garis bilangan (letak lebih kanan berarti lebih besar)",
      "Menentukan selisih banyak benda dengan memasangkan"
    ],
    "rumus": [
      "a < b dibaca 'a kurang dari b'; a > b dibaca 'a lebih dari b'; a = b dibaca 'a sama dengan b'"
    ],
    "miskonsepsi": [
      "Menilai 'lebih banyak' dari ukuran benda yang lebih besar, bukan dari banyaknya",
      "Menilai dari panjang barisan benda, bukan dari banyaknya benda",
      "Membaca simbol < dan > terbalik"
    ],
    "kenapa": [
      "Kenapa kita bisa tahu mana yang lebih banyak tanpa menghitung satu per satu?",
      "Kenapa 5 kelereng besar tidak otomatis lebih banyak daripada 8 kelereng kecil?"
    ],
    "prasyarat": [
      "sd1-membilang-benda-sampai-10",
      "sd1-membaca-dan-menulis-lambang-bilangan"
    ]
  },
  {
    "id": "sd1-membilang-benda-sampai-10",
    "judul": "Membilang Benda sampai 10",
    "kelas": 1,
    "fase": "A",
    "domain": "bilangan",
    "ringkas": "Membilang benda konkret 1-10 sambil menunjuk satu per satu",
    "subKonsep": [
      "Korespondensi satu-satu: satu benda ditunjuk untuk satu bilangan yang disebut",
      "Urutan hitung yang stabil: 1, 2, 3, ... selalu dalam urutan yang sama",
      "Prinsip kardinalitas: bilangan terakhir yang disebut menyatakan banyaknya seluruh benda",
      "Prinsip abstraksi: apa saja dapat dihitung (benda, bunyi, orang, kejadian)",
      "Prinsip urutan tidak relevan: mulai menghitung dari benda mana pun hasilnya sama",
      "Subitizing: mengenali banyak benda 1-5 secara langsung tanpa membilang (pola dadu, jari)",
      "Kekekalan bilangan: banyaknya tidak berubah walaupun benda dirapatkan atau direnggangkan",
      "Bilangan nol sebagai lambang 'tidak ada'"
    ],
    "rumus": [
      "Banyak benda = bilangan terakhir yang disebut saat membilang satu-satu (prinsip kardinalitas)"
    ],
    "miskonsepsi": [
      "Mengucapkan urutan bilangan lebih cepat atau lebih lambat daripada gerakan menunjuk sehingga ada benda terlewat atau terhitung dua kali",
      "Mengira bilangan terakhir yang disebut hanya nama benda terakhir, bukan banyaknya seluruh benda",
      "Mengira benda yang disusun renggang lebih banyak daripada benda yang dirapatkan meskipun jumlahnya sama"
    ],
    "kenapa": [
      "Kenapa hasil hitung tetap sama walaupun kita mulai menghitung dari benda yang berbeda?",
      "Kenapa merapatkan atau merenggangkan benda tidak mengubah banyaknya?"
    ],
    "prasyarat": []
  },
  {
    "id": "sd1-pasangan-bilangan-10-komposisi-dan",
    "judul": "Pasangan Bilangan 10 (Komposisi dan Dekomposisi sampai 10)",
    "kelas": 1,
    "fase": "A",
    "domain": "bilangan",
    "ringkas": "Menyebutkan pasangan bilangan pembentuk 10 secara cepat dan otomatis",
    "subKonsep": [
      "Komposisi: menyusun dua bilangan menjadi satu bilangan",
      "Dekomposisi: mengurai satu bilangan menjadi dua bagian atau lebih",
      "Semua pasangan pembentuk 10: 0+10, 1+9, 2+8, 3+7, 4+6, 5+5",
      "Model bagian-bagian-keseluruhan (part-part-whole)",
      "Papan sepuluh (ten frame) sebagai alat bantu visual",
      "Jari tangan sebagai model alami bilangan 5 dan 10",
      "Pasangan pembentuk 5 sebagai batu loncatan menuju pasangan 10",
      "Dekomposisi bilangan 11-20 menjadi 10 dan sisanya"
    ],
    "rumus": [
      "Pasangan pembentuk 10: 0+10, 1+9, 2+8, 3+7, 4+6, 5+5",
      "Keseluruhan = bagian + bagian",
      "Bilangan 11-20 = 10 + sisanya (contoh: 16 = 10 + 6)"
    ],
    "miskonsepsi": [
      "Menganggap satu bilangan hanya punya satu cara diurai (7 hanya bisa 5 dan 2)",
      "Menolak 0 sebagai salah satu bagian sehingga tidak menerima 10 = 10 + 0",
      "Menghitung ulang dari 1 setiap kali, bukan mengingat pasangan bilangan"
    ],
    "kenapa": [
      "Kenapa bilangan 10 punya banyak pasangan, bukan hanya satu?",
      "Kenapa menghafal pasangan pembentuk 10 membuat berhitung menjadi jauh lebih cepat?"
    ],
    "prasyarat": [
      "sd1-membilang-benda-sampai-10",
      "sd1-membandingkan-banyak-benda-dan-bilangan"
    ]
  },
  {
    "id": "sd1-pengurangan-bilangan-cacah-sampai-20",
    "judul": "Pengurangan Bilangan Cacah sampai 20 dengan Benda Konkret",
    "kelas": 1,
    "fase": "A",
    "domain": "bilangan",
    "ringkas": "Mengubah soal cerita menjadi kalimat pengurangan",
    "subKonsep": [
      "Makna pengurangan sebagai mengambil sebagian (take away)",
      "Makna pengurangan sebagai mencari sisa",
      "Makna pengurangan sebagai mencari selisih atau membandingkan dua banyaknya",
      "Makna pengurangan sebagai mencari bagian yang belum diketahui",
      "Pengurangan sebagai bergerak mundur pada garis bilangan",
      "Strategi menghitung mundur dan strategi menghitung maju dari pengurang",
      "Strategi lewat sepuluh (13 - 5 = 13 - 3 - 2)",
      "Mengurangi dengan 0 dan mengurangi bilangan dengan dirinya sendiri"
    ],
    "rumus": [
      "a - b = c apabila dan hanya apabila c + b = a",
      "a - 0 = a",
      "a - a = 0",
      "Keseluruhan - bagian = bagian yang lain"
    ],
    "miskonsepsi": [
      "Mengira pengurangan boleh dibalik seperti penjumlahan sehingga 5 - 8 dianggap sama dengan 8 - 5",
      "Pada bentuk bersusun, selalu mengurangkan angka kecil dari angka besar di setiap kolom",
      "Menganggap pengurangan hanya berarti 'mengambil' sehingga tidak mengenali soal selisih sebagai pengurangan"
    ],
    "kenapa": [
      "Kenapa 8 - 5 tidak sama dengan 5 - 8 padahal 6 + 9 sama dengan 9 + 6?",
      "Kenapa soal 'berapa selisih tinggi Ani dan Budi' diselesaikan dengan pengurangan padahal tidak ada yang diambil?"
    ],
    "prasyarat": [
      "sd1-penjumlahan-bilangan-cacah-sampai-20",
      "sd1-pasangan-bilangan-10-komposisi-dan",
      "sd1-garis-bilangan-dan-membilang-maju"
    ]
  },
  {
    "id": "sd1-penjumlahan-bilangan-cacah-sampai-20",
    "judul": "Penjumlahan Bilangan Cacah sampai 20 dengan Benda Konkret",
    "kelas": 1,
    "fase": "A",
    "domain": "bilangan",
    "ringkas": "Mengubah soal cerita menjadi kalimat penjumlahan",
    "subKonsep": [
      "Makna penjumlahan sebagai menggabungkan dua kumpulan benda",
      "Makna penjumlahan sebagai menambah / bergerak maju pada garis bilangan",
      "Strategi menghitung maju (counting on) dari bilangan terbesar",
      "Strategi membuat sepuluh dulu (contoh 8 + 5 = 8 + 2 + 3)",
      "Strategi bilangan kembar dan hampir kembar (6 + 6, lalu 6 + 7)",
      "Fakta dasar penjumlahan sampai 10 yang dihafal otomatis",
      "Sifat pertukaran (komutatif) pada penjumlahan",
      "Menjumlah dengan 0 sebagai unsur identitas"
    ],
    "rumus": [
      "a + b = b + a (sifat pertukaran / komutatif)",
      "a + 0 = a (unsur identitas penjumlahan)",
      "Strategi membuat sepuluh: 8 + 5 = 8 + 2 + 3 = 10 + 3 = 13",
      "Bagian + bagian = keseluruhan"
    ],
    "miskonsepsi": [
      "Selalu menghitung ulang dari 1 sehingga lambat dan sering keliru",
      "Menghitung bilangan awal sebagai langkah pertama (5 + 3 dihitung 5, 6, 7 lalu dijawab 7)",
      "Mengira penjumlahan selalu membuat bilangan lebih besar sehingga bingung dengan a + 0"
    ],
    "kenapa": [
      "Kenapa 8 + 5 bisa dikerjakan dengan cara 'pinjam 2 dari 5 supaya 8 menjadi 10'?",
      "Kenapa menghitung maju dari bilangan yang lebih besar lebih hemat langkah?"
    ],
    "prasyarat": [
      "sd1-pasangan-bilangan-10-komposisi-dan",
      "sd1-garis-bilangan-dan-membilang-maju",
      "sd1-makna-simbol-dan-keseimbangan"
    ]
  },
  {
    "id": "sd1-menyortir-dan-mengelompokkan-benda-menurut",
    "judul": "Menyortir dan Mengelompokkan Benda Menurut Ciri",
    "kelas": 1,
    "fase": "A",
    "domain": "data",
    "ringkas": "Menyortir benda menurut satu ciri yang dipilih",
    "subKonsep": [
      "Ciri atau atribut benda: warna, bentuk, ukuran, jenis, bahan",
      "Memilih satu ciri sebagai dasar pengelompokan",
      "Kategori yang tidak tumpang tindih dan mencakup semua benda",
      "Satu kumpulan benda dapat dikelompokkan dengan lebih dari satu cara",
      "Menghitung banyak anggota setiap kelompok",
      "Membandingkan banyak anggota antarkelompok",
      "Menamai setiap kelompok dengan sebutan yang jelas"
    ],
    "rumus": [],
    "miskonsepsi": [
      "Mencampur dua ciri sekaligus dalam satu pengelompokan (warna dan bentuk bersamaan)",
      "Membuat kategori yang tumpang tindih sehingga satu benda masuk ke dua kelompok",
      "Mengira hanya ada satu cara yang benar untuk mengelompokkan"
    ],
    "kenapa": [
      "Kenapa kita harus memilih satu ciri lebih dulu sebelum mengelompokkan?",
      "Kenapa kumpulan benda yang sama bisa dikelompokkan dengan cara yang berbeda-beda?"
    ],
    "prasyarat": [
      "sd1-membilang-benda-sampai-10",
      "sd1-membandingkan-banyak-benda-dan-bilangan"
    ]
  },
  {
    "id": "sd1-mengenal-dan-mengelompokkan-bangun-datar",
    "judul": "Mengenal dan Mengelompokkan Bangun Datar",
    "kelas": 1,
    "fase": "A",
    "domain": "geometri",
    "ringkas": "Menyebutkan nama bangun datar yang ditunjukkan",
    "subKonsep": [
      "Bangun datar: segitiga, segiempat (persegi dan persegi panjang), segi banyak, lingkaran",
      "Unsur bangun datar: sisi, titik sudut, dan daerah dalam",
      "Menghitung banyak sisi dan banyak titik sudut",
      "Mengelompokkan bangun berdasarkan ciri: banyak sisi, sisi lurus atau lengkung",
      "Bangun tertutup dan bangun terbuka",
      "Bangun datar pada benda sehari-hari (jendela, jam dinding, rambu lalu lintas)",
      "Bangun tetap sama walaupun diputar, dibalik, atau diperbesar",
      "Persegi sebagai segiempat khusus"
    ],
    "rumus": [
      "Segitiga: 3 sisi lurus dan 3 titik sudut",
      "Segiempat: 4 sisi lurus dan 4 titik sudut",
      "Segi banyak: bangun tertutup yang semua sisinya lurus",
      "Lingkaran: satu sisi lengkung, tanpa titik sudut",
      "Pada segi banyak, banyak sisi = banyak titik sudut"
    ],
    "miskonsepsi": [
      "Hanya mengenali segitiga yang berdiri tegak dengan alas mendatar dan menolak segitiga miring",
      "Menganggap persegi panjang bukan segiempat karena namanya berbeda",
      "Menyebut nama bangun berdasarkan penampilan keseluruhan ('bentuk pintu') bukan ciri sisi dan sudut"
    ],
    "kenapa": [
      "Kenapa segitiga yang dimiringkan tetap disebut segitiga?",
      "Kenapa persegi juga termasuk segiempat?"
    ],
    "prasyarat": [
      "sd1-membilang-benda-sampai-10",
      "sd1-menyortir-dan-mengelompokkan-benda-menurut"
    ]
  },
  {
    "id": "sd1-posisi-dan-arah-benda",
    "judul": "Posisi dan Arah Benda",
    "kelas": 1,
    "fase": "A",
    "domain": "geometri",
    "ringkas": "Menyebutkan posisi suatu benda terhadap benda lain",
    "subKonsep": [
      "Kata posisi: kanan, kiri, depan, belakang, atas, bawah, di antara, di samping, di dalam, di luar",
      "Posisi bersifat relatif terhadap acuan yang dipilih",
      "Kanan-kiri berubah ketika sudut pandang berubah (berhadapan atau berbalik badan)",
      "Arah gerak: maju, mundur, belok kanan, belok kiri",
      "Denah sederhana ruang kelas dilihat dari atas",
      "Memberi dan mengikuti petunjuk arah secara lisan",
      "Menyebutkan acuan saat menjelaskan posisi ('di kanan lemari')"
    ],
    "rumus": [],
    "miskonsepsi": [
      "Mengira kanan dan kiri bersifat mutlak, tidak tergantung siapa yang melihat",
      "Bingung saat berhadapan dengan orang lain karena kanan lawan adalah kiri kita",
      "Mencampur 'di atas' sebagai posisi dengan 'di atas' pada tumpukan benda"
    ],
    "kenapa": [
      "Kenapa 'sebelah kanan' bisa berpindah tempat kalau kita berbalik badan?",
      "Kenapa kita perlu menyebut acuan saat menjelaskan posisi, misalnya 'di kanan lemari'?"
    ],
    "prasyarat": [
      "sd1-membilang-benda-sampai-10"
    ]
  },
  {
    "id": "sd1-membandingkan-berat-secara-langsung",
    "judul": "Membandingkan Berat Secara Langsung",
    "kelas": 1,
    "fase": "A",
    "domain": "pengukuran",
    "ringkas": "Menimbang dua benda dengan neraca sederhana",
    "subKonsep": [
      "Berat sebagai atribut yang tidak selalu dapat dilihat mata",
      "Kata perbandingan: lebih berat, lebih ringan, sama berat",
      "Neraca dua lengan sederhana (gantungan baju, timbangan mainan) sebagai alat pembanding",
      "Membaca hasil neraca: lengan yang turun berarti lebih berat",
      "Membandingkan dengan tangan (merasakan) dan keterbatasan cara ini",
      "Mengurutkan tiga benda menurut beratnya",
      "Berat tidak selalu sejalan dengan ukuran benda"
    ],
    "rumus": [],
    "miskonsepsi": [
      "Mengira benda yang lebih besar ukurannya pasti lebih berat (sekantong kapas dibanding batu kecil)",
      "Mengira benda yang lebih panjang pasti lebih berat",
      "Menyimpulkan lengan neraca yang naik sebagai benda yang lebih berat"
    ],
    "kenapa": [
      "Kenapa balon besar bisa lebih ringan daripada batu kecil?",
      "Kenapa lengan neraca yang turun menunjukkan benda yang lebih berat?"
    ],
    "prasyarat": [
      "sd1-membandingkan-panjang-dan-tinggi-secara",
      "sd1-membandingkan-banyak-benda-dan-bilangan"
    ]
  },
  {
    "id": "sd1-membandingkan-panjang-dan-tinggi-secara",
    "judul": "Membandingkan Panjang dan Tinggi Secara Langsung",
    "kelas": 1,
    "fase": "A",
    "domain": "pengukuran",
    "ringkas": "Menyejajarkan ujung dua benda lalu menentukan mana yang lebih panjang",
    "subKonsep": [
      "Panjang sebagai atribut benda yang dapat dibandingkan",
      "Kata perbandingan: lebih panjang/lebih pendek, lebih tinggi/lebih rendah, sama panjang",
      "Syarat perbandingan langsung: kedua ujung benda disejajarkan dari titik awal yang sama",
      "Membandingkan tiga benda atau lebih dan mengurutkannya",
      "Sifat transitif: jika A lebih panjang dari B dan B lebih panjang dari C maka A lebih panjang dari C",
      "Perbandingan tak langsung menggunakan benda perantara (tali, pita, lidi)",
      "Membedakan panjang, tinggi, lebar, dan tebal sebagai penyebutan atribut yang sama"
    ],
    "rumus": [],
    "miskonsepsi": [
      "Membandingkan tanpa menyamakan titik awal sehingga kesimpulannya keliru",
      "Mengira benda yang lebih besar atau lebih tebal pasti lebih panjang",
      "Mengira benda yang diletakkan lebih tinggi posisinya berarti lebih panjang"
    ],
    "kenapa": [
      "Kenapa kedua ujung benda harus disejajarkan dulu sebelum dibandingkan?",
      "Kenapa kita bisa membandingkan tinggi pintu dan lemari yang berjauhan dengan bantuan tali?"
    ],
    "prasyarat": [
      "sd1-membandingkan-banyak-benda-dan-bilangan"
    ]
  },
  {
    "id": "sd1-mengukur-panjang-dengan-satuan-tidak",
    "judul": "Mengukur Panjang dengan Satuan Tidak Baku",
    "kelas": 1,
    "fase": "A",
    "domain": "pengukuran",
    "ringkas": "Mengukur panjang benda menggunakan satuan tidak baku",
    "subKonsep": [
      "Satuan tidak baku: jengkal, depa, langkah, klip kertas, batang lidi, pensil, korek api",
      "Mengukur berarti menghitung berapa kali satuan disusun sepanjang benda",
      "Syarat iterasi satuan: disusun rapat tanpa celah dan tanpa tumpang tindih",
      "Pengukuran dimulai tepat dari ujung benda",
      "Ukuran satuan mempengaruhi bilangan hasil ukur: satuan kecil menghasilkan bilangan besar",
      "Melaporkan hasil ukur lengkap dengan nama satuannya",
      "Satuan harus seragam dalam satu pengukuran",
      "Hasil ukur bisa berupa 'lebih dari sekian dan kurang dari sekian'"
    ],
    "rumus": [
      "Panjang benda = banyaknya satuan tidak baku yang disusun rapat sepanjang benda",
      "Semakin kecil satuan yang dipakai, semakin besar bilangan hasil ukurnya (hubungan berkebalikan)"
    ],
    "miskonsepsi": [
      "Menyusun satuan dengan celah atau saling bertumpuk sehingga hasil ukur keliru",
      "Tidak memulai pengukuran dari ujung benda",
      "Menuliskan hasil hanya berupa angka tanpa satuan ('panjangnya 12')"
    ],
    "kenapa": [
      "Kenapa satuan pengukur harus disusun rapat tanpa celah?",
      "Kenapa meja yang sama bisa '12 jengkal' menurut guru tetapi '18 jengkal' menurut siswa?"
    ],
    "prasyarat": [
      "sd1-membandingkan-panjang-dan-tinggi-secara",
      "sd1-membilang-benda-sampai-10",
      "sd1-membaca-dan-menulis-lambang-bilangan"
    ]
  },
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
  },
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
  },
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
  },
  {
    "id": "sd5-kalimat-matematika-dan-nilai-yang",
    "judul": "Kalimat Matematika dan Nilai yang Belum Diketahui",
    "kelas": 5,
    "fase": "C",
    "domain": "aljabar",
    "ringkas": "Menemukan nilai yang belum diketahui pada kalimat matematika empat operasi (bilangan sampai 1000)",
    "subKonsep": [
      "Kalimat matematika terbuka dan tertutup",
      "Simbol untuk nilai yang belum diketahui (kotak, titik-titik, huruf)",
      "Makna tanda sama dengan sebagai keseimbangan, bukan perintah menghitung",
      "Model timbangan/neraca untuk menjaga keseimbangan kedua ruas",
      "Menemukan nilai yang belum diketahui dengan operasi kebalikan",
      "Menemukan nilai yang belum diketahui dengan strategi coba-periksa dan penalaran",
      "Menerjemahkan soal cerita menjadi kalimat matematika",
      "Memeriksa jawaban dengan menyubstitusikan kembali"
    ],
    "rumus": [
      "a + n = b => n = b - a",
      "a - n = b => n = a - b",
      "a x n = b => n = b : a",
      "n : a = b => n = b x a"
    ],
    "miskonsepsi": [
      "Membaca tanda sama dengan sebagai \"jawabannya adalah\" sehingga 8 + 4 = ... + 5 dijawab 12",
      "Mengira huruf/simbol selalu mewakili satu benda, bukan satu bilangan",
      "Menggunakan operasi yang sama, bukan kebalikannya, untuk mencari nilai yang belum diketahui"
    ],
    "kenapa": [
      "Kenapa tanda sama dengan berarti \"seimbang\", bukan \"hasilnya\"?",
      "Kenapa untuk mencari nilai yang belum diketahui kita memakai operasi kebalikan?"
    ],
    "prasyarat": [
      "sd5-sifat-operasi-hitung-dan-operasi",
      "sd4-perkalian-bilangan-cacah-sampai-100",
      "sd4-pembagian-bilangan-cacah-sampai-100",
      "sd3-menemukan-nilai-yang-belum-diketahui"
    ]
  },
  {
    "id": "sd5-pola-bilangan-membesar-dan-mengecil",
    "judul": "Pola Bilangan Membesar dan Mengecil",
    "kelas": 5,
    "fase": "C",
    "domain": "aljabar",
    "ringkas": "Mengidentifikasi aturan pola bilangan yang melibatkan perkalian dan pembagian",
    "subKonsep": [
      "Pola bilangan bertambah/berkurang tetap (pola penjumlahan)",
      "Pola bilangan berlipat/terbagi tetap (pola perkalian dan pembagian)",
      "Menemukan aturan pola dan menyatakannya dengan kata-kata",
      "Melanjutkan pola dan menentukan suku berikutnya",
      "Pola gambar/objek yang bertumbuh dan hubungannya dengan bilangan",
      "Pola bilangan khusus: bilangan genap, ganjil, kuadrat, segitiga",
      "Menyajikan pola dalam tabel suku ke-n dan nilainya",
      "Memprediksi suku jauh berdasarkan aturan pola"
    ],
    "rumus": [
      "Pola penjumlahan: U(n) = U(1) + (n - 1) x b",
      "Pola perkalian: U(n) = U(1) x r^(n-1)",
      "Bilangan segitiga: 1, 3, 6, 10, 15, ... dengan selisih bertambah 1"
    ],
    "miskonsepsi": [
      "Menganggap semua pola pasti bertambah dengan selisih tetap sehingga gagal mengenali pola perkalian",
      "Menyimpulkan aturan pola hanya dari dua suku pertama",
      "Mengira pola gambar tidak bisa dihubungkan dengan bilangan"
    ],
    "kenapa": [
      "Kenapa dua suku pertama saja tidak cukup untuk memastikan aturan sebuah pola?",
      "Kenapa pola yang bertambah tetap tumbuh lurus sedangkan pola berlipat tumbuh sangat cepat?"
    ],
    "prasyarat": [
      "sd4-perkalian-bilangan-cacah-sampai-100",
      "sd4-pembagian-bilangan-cacah-sampai-100",
      "sd4-pola-bilangan-membesar-dan-mengecil"
    ]
  },
  {
    "id": "sd5-kelipatan-faktor-bilangan-prima-dan",
    "judul": "Kelipatan, Faktor, Bilangan Prima, dan Faktorisasi Prima",
    "kelas": 5,
    "fase": "C",
    "domain": "bilangan",
    "ringkas": "Menentukan semua faktor suatu bilangan secara sistematis dengan pasangan faktor",
    "subKonsep": [
      "Kelipatan suatu bilangan sebagai hasil kali dengan bilangan asli",
      "Faktor sebagai bilangan yang membagi habis",
      "Pasangan faktor dan penyajiannya sebagai susunan persegi panjang",
      "Ciri habis dibagi 2, 3, 4, 5, 9, 10",
      "Bilangan prima (tepat dua faktor) dan bilangan komposit",
      "Alasan 1 bukan bilangan prima dan 2 satu-satunya prima genap",
      "Faktorisasi prima dengan pohon faktor dan dengan pembagian bersusun",
      "Penulisan faktorisasi prima dalam bentuk berpangkat (72 = 2^3 x 3^2)"
    ],
    "rumus": [
      "Kelipatan n: n, 2n, 3n, 4n, ...",
      "Bilangan prima memiliki tepat dua faktor: 1 dan dirinya sendiri",
      "Faktorisasi prima: N = p1^a x p2^b x p3^c ...",
      "Habis dibagi 3 jika jumlah angkanya habis dibagi 3"
    ],
    "miskonsepsi": [
      "Tertukar antara faktor (membagi habis) dan kelipatan (hasil kali)",
      "Menganggap 1 sebagai bilangan prima",
      "Mengira semua bilangan ganjil adalah prima (9, 15, 21 dianggap prima)"
    ],
    "kenapa": [
      "Kenapa 1 tidak dianggap bilangan prima padahal hanya bisa dibagi 1 dan dirinya sendiri?",
      "Kenapa bentuk faktorisasi prima suatu bilangan selalu sama meskipun pohon faktornya berbeda-beda?"
    ],
    "prasyarat": [
      "sd4-perkalian-bilangan-cacah-sampai-100",
      "sd4-pembagian-bilangan-cacah-sampai-100",
      "sd4-kelipatan-dan-faktor-bilangan"
    ]
  },
  {
    "id": "sd5-kpk-dan-fpb",
    "judul": "KPK dan FPB",
    "kelas": 5,
    "fase": "C",
    "domain": "bilangan",
    "ringkas": "Menentukan KPK dan FPB dua atau tiga bilangan dengan pendaftaran, pohon faktor, dan tabel",
    "subKonsep": [
      "Kelipatan persekutuan dan kelipatan persekutuan terkecil (KPK)",
      "Faktor persekutuan dan faktor persekutuan terbesar (FPB)",
      "Cara mendaftar kelipatan dan faktor",
      "Cara faktorisasi prima: KPK ambil semua faktor prima berpangkat tertinggi, FPB ambil faktor prima persekutuan berpangkat terendah",
      "Cara tabel/petak pembagian bersusun (sengkedan)",
      "Hubungan KPK dan FPB dengan hasil kali dua bilangan",
      "Konteks KPK: kejadian berulang bersamaan (lampu berkedip, jadwal ronda, bel berbunyi)",
      "Konteks FPB: pembagian rata paling banyak (parsel, kelompok, ubin terbesar)"
    ],
    "rumus": [
      "KPK(a,b) x FPB(a,b) = a x b",
      "KPK: hasil kali semua faktor prima dengan pangkat tertinggi",
      "FPB: hasil kali faktor prima persekutuan dengan pangkat terendah",
      "Jika a dan b saling prima maka FPB = 1 dan KPK = a x b"
    ],
    "miskonsepsi": [
      "Tertukar memilih KPK padahal soal meminta FPB (dan sebaliknya) karena hanya melihat kata \"terbesar\"",
      "Mengira KPK selalu hasil kali kedua bilangan",
      "Mengira FPB selalu bilangan terkecil di antara keduanya"
    ],
    "kenapa": [
      "Kenapa untuk KPK diambil pangkat tertinggi sedangkan untuk FPB pangkat terendah?",
      "Kenapa KPK dikali FPB selalu sama dengan hasil kali kedua bilangannya?"
    ],
    "prasyarat": [
      "sd4-kelipatan-dan-faktor-bilangan",
      "sd4-perkalian-bilangan-cacah-sampai-100",
      "sd4-pembagian-bilangan-cacah-sampai-100"
    ]
  },
  {
    "id": "sd5-membandingkan-dan-mengurutkan-bilangan-cacah",
    "judul": "Membandingkan dan Mengurutkan Bilangan Cacah Besar",
    "kelas": 5,
    "fase": "C",
    "domain": "bilangan",
    "ringkas": "Membandingkan dua bilangan cacah sampai 1.000.000 dengan tanda >, <, =",
    "subKonsep": [
      "Membandingkan dengan menyamakan banyak angka terlebih dahulu",
      "Strategi membandingkan dari angka nilai tempat tertinggi ke terendah",
      "Lambang perbandingan: >, <, = dan cara membacanya",
      "Mengurutkan naik (dari terkecil) dan turun (dari terbesar)",
      "Letak bilangan besar pada garis bilangan berskala (skala 1.000, 10.000, 100.000)",
      "Bilangan sebelum, sesudah, dan di antara dua bilangan",
      "Membandingkan bilangan dalam konteks nyata (harga, jarak, jumlah penduduk)"
    ],
    "rumus": [
      "Bandingkan angka dari kiri (nilai tempat tertinggi); angka pertama yang berbeda menentukan hasilnya",
      "Jika banyak angka berbeda, bilangan dengan angka lebih banyak lebih besar (untuk bilangan cacah tanpa nol di depan)"
    ],
    "miskonsepsi": [
      "Membandingkan dari angka paling kanan (satuan) seperti membaca dari belakang",
      "Mengira 9.999 lebih besar dari 10.001 karena \"banyak angka 9\"",
      "Mengira tanda > menunjuk ke bilangan yang lebih besar tanpa memahami arah bukaan"
    ],
    "kenapa": [
      "Kenapa membandingkan bilangan harus dimulai dari angka paling kiri, bukan paling kanan?",
      "Kenapa 10.001 lebih besar dari 9.999 padahal angka-angkanya lebih kecil?"
    ],
    "prasyarat": [
      "sd4-nilai-tempat-bilangan-cacah-sampai",
      "sd2-membandingkan-dan-mengurutkan-bilangan-sampai",
      "sd4-garis-bilangan-estimasi-dan-pembulatan"
    ]
  },
  {
    "id": "sd5-membandingkan-dan-mengurutkan-pecahan",
    "judul": "Membandingkan dan Mengurutkan Pecahan",
    "kelas": 5,
    "fase": "C",
    "domain": "bilangan",
    "ringkas": "Membandingkan dua pecahan dengan menyamakan penyebut atau perkalian silang",
    "subKonsep": [
      "Membandingkan pecahan berpenyebut sama",
      "Membandingkan pecahan berpembilang sama",
      "Menyamakan penyebut dengan KPK",
      "Perkalian silang sebagai jalan pintas dan alasannya",
      "Membandingkan dengan patokan (benchmark) 0, 1/2, dan 1",
      "Mengurutkan pecahan biasa, campuran, dan tidak murni yang bercampur",
      "Menempatkan beberapa pecahan pada satu garis bilangan",
      "Kepadatan pecahan: selalu ada pecahan di antara dua pecahan"
    ],
    "rumus": [
      "a/b vs c/d: bandingkan a x d dengan c x b",
      "Penyebut persekutuan terkecil = KPK(b, d)",
      "Jika pembilang sama, pecahan dengan penyebut lebih kecil bernilai lebih besar"
    ],
    "miskonsepsi": [
      "Membandingkan pembilang dan penyebut secara terpisah seperti bilangan cacah (3/5 dianggap lebih kecil dari 2/7 karena 5 < 7)",
      "Mengira penyebut besar selalu berarti pecahan besar",
      "Menyamakan penyebut tetapi lupa mengubah pembilangnya"
    ],
    "kenapa": [
      "Kenapa perkalian silang bisa dipakai membandingkan pecahan, dan dari mana asalnya?",
      "Kenapa 1/8 lebih kecil dari 1/3 padahal 8 lebih besar dari 3?"
    ],
    "prasyarat": [
      "sd4-pecahan-senilai",
      "sd5-pecahan-campuran-dan-pecahan-tidak"
    ]
  },
  {
    "id": "sd5-menyelesaikan-masalah-yang-berkaitan-dengan",
    "judul": "Menyelesaikan Masalah yang Berkaitan dengan Uang (Rupiah)",
    "kelas": 5,
    "fase": "C",
    "domain": "bilangan",
    "ringkas": "Menghitung total belanja dan kembalian dengan bilangan sampai ratusan ribu",
    "subKonsep": [
      "Nilai nominal uang kertas dan logam rupiah",
      "Menulis nilai uang dengan pemisah ribuan (Rp25.000,00)",
      "Menaksir total belanja dan uang kembalian",
      "Menghitung kembalian sebagai pengurangan",
      "Harga satuan dan harga total (perkalian dan pembagian)",
      "Membandingkan penawaran untuk memilih yang lebih hemat",
      "Diskon sederhana dalam bentuk potongan langsung dan persen",
      "Menyusun anggaran belanja sederhana dan literasi keuangan awal"
    ],
    "rumus": [
      "Kembalian = uang dibayarkan - total harga",
      "Total harga = harga satuan x banyak barang",
      "Harga satuan = total harga : banyak barang",
      "Harga setelah diskon = harga awal - (persen diskon x harga awal)"
    ],
    "miskonsepsi": [
      "Menulis nilai uang dengan koma sebagai pemisah ribuan (Rp25,000)",
      "Mengira barang dengan harga total lebih murah selalu lebih hemat tanpa melihat isinya",
      "Menghitung kembalian dengan menjumlahkan, bukan mengurangkan"
    ],
    "kenapa": [
      "Kenapa diskon 50% lalu 20% tidak sama dengan diskon 70%?",
      "Kenapa membandingkan harga per satuan lebih adil daripada membandingkan harga total?"
    ],
    "prasyarat": [
      "sd4-penjumlahan-bilangan-cacah-sampai-1",
      "sd4-perkalian-bilangan-cacah-sampai-100",
      "sd4-pembagian-bilangan-cacah-sampai-100",
      "sd5-pembulatan-dan-penaksiran-estimasi"
    ]
  },
  {
    "id": "sd5-nilai-tempat-bilangan-cacah-sampai",
    "judul": "Nilai Tempat Bilangan Cacah sampai 1.000.000",
    "kelas": 5,
    "fase": "C",
    "domain": "bilangan",
    "ringkas": "Membaca dan menulis bilangan cacah sampai 1.000.000 dalam lambang dan nama bilangan",
    "subKonsep": [
      "Angka vs bilangan: angka adalah lambang, bilangan adalah nilainya",
      "Nama tempat: satuan, puluhan, ratusan, ribuan, puluh ribuan, ratus ribuan, jutaan",
      "Nilai tempat vs nilai angka (pada 374.512, angka 7 bertempat puluh ribuan dan bernilai 70.000)",
      "Sistem desimal berbasis sepuluh: setiap bergeser satu tempat ke kiri nilainya dikali 10",
      "Peran angka nol sebagai penahan tempat (placeholder) pada 305.007",
      "Membaca bilangan besar dengan pengelompokan tiga angka (periode ribuan dan jutaan)",
      "Menulis lambang bilangan dari nama bilangan dan sebaliknya",
      "Penulisan tanda pemisah ribuan dengan titik dan pemisah desimal dengan koma (kaidah Indonesia)"
    ],
    "rumus": [
      "Nilai angka = angka x nilai tempatnya",
      "Bentuk panjang: abcdef = a x 100.000 + b x 10.000 + c x 1.000 + d x 100 + e x 10 + f x 1",
      "Nilai tempat ke-n dari kanan = 10^(n-1)"
    ],
    "miskonsepsi": [
      "Menganggap nilai angka sama dengan angkanya (pada 4.500 dikira angka 4 bernilai 4, bukan 4.000)",
      "Membaca 105.006 sebagai \"seratus lima ribu enam puluh\" karena nol diabaikan",
      "Menulis \"seratus dua puluh ribu lima\" sebagai 1200005 (menempel apa adanya)"
    ],
    "kenapa": [
      "Kenapa nilai tempat naik sepuluh kali lipat setiap bergeser satu langkah ke kiri, bukan dua atau lima kali?",
      "Kenapa angka nol yang \"tidak bernilai\" justru tidak boleh dihapus dari 305.007?"
    ],
    "prasyarat": [
      "sd4-nilai-tempat-bilangan-cacah-sampai",
      "sd4-komposisi-dan-dekomposisi-bilangan-cacah",
      "sd1-membaca-dan-menulis-lambang-bilangan"
    ]
  },
  {
    "id": "sd5-pecahan-campuran-dan-pecahan-tidak",
    "judul": "Pecahan Campuran dan Pecahan Tidak Murni",
    "kelas": 5,
    "fase": "C",
    "domain": "bilangan",
    "ringkas": "Mengubah bentuk campuran ke tidak murni dan sebaliknya",
    "subKonsep": [
      "Pecahan murni (pembilang < penyebut) dan pecahan tidak murni (pembilang >= penyebut)",
      "Pecahan campuran sebagai gabungan bilangan bulat dan pecahan",
      "Mengubah pecahan campuran menjadi pecahan tidak murni",
      "Mengubah pecahan tidak murni menjadi pecahan campuran melalui pembagian bersisa",
      "Representasi gambar (dua setengah pizza) dan pada garis bilangan",
      "Kapan bentuk campuran lebih berguna daripada bentuk tidak murni"
    ],
    "rumus": [
      "a b/c = (a x c + b)/c",
      "p/q = (p : q) sisa r, ditulis (hasil bagi) (r/q)"
    ],
    "miskonsepsi": [
      "Menganggap 2 1/3 berarti 2 dikali 1/3",
      "Saat mengubah campuran, menjumlahkan a + b lalu dibagi c",
      "Menulis hasil pembagian bersisa dengan sisa sebagai penyebut, bukan pembilang"
    ],
    "kenapa": [
      "Kenapa 2 1/3 berarti 2 ditambah 1/3, bukan 2 dikali 1/3?",
      "Kenapa rumus mengubah pecahan campuran mengalikan bilangan bulatnya dengan penyebut?"
    ],
    "prasyarat": [
      "sd4-pecahan-senilai",
      "sd4-pembagian-bilangan-cacah-sampai-100"
    ]
  },
  {
    "id": "sd5-pecahan-senilai-dan-penyederhanaan-pecahan",
    "judul": "Pecahan Senilai dan Penyederhanaan Pecahan",
    "kelas": 5,
    "fase": "C",
    "domain": "bilangan",
    "ringkas": "Menentukan pecahan senilai dengan gambar dan dengan perhitungan",
    "subKonsep": [
      "Pecahan sebagai bagian dari keseluruhan, sebagai pembagian, dan sebagai titik pada garis bilangan",
      "Pembilang dan penyebut serta maknanya",
      "Pecahan senilai melalui gambar (pita pecahan, lingkaran, luasan)",
      "Mengalikan atau membagi pembilang dan penyebut dengan bilangan yang sama",
      "Pecahan bentuk paling sederhana",
      "Menyederhanakan dengan FPB",
      "Pentingnya keseluruhan (whole) yang sama saat membandingkan pecahan",
      "Pecahan pada garis bilangan antara 0 dan 1 serta lebih dari 1"
    ],
    "rumus": [
      "a/b = (a x k)/(b x k) untuk k tidak nol",
      "a/b = (a : k)/(b : k) jika k faktor persekutuan",
      "Bentuk paling sederhana diperoleh dengan membagi pembilang dan penyebut dengan FPB-nya"
    ],
    "miskonsepsi": [
      "Menambahkan bilangan yang sama pada pembilang dan penyebut (2/3 dianggap senilai dengan 3/4)",
      "Mengira penyebut lebih besar berarti pecahan lebih besar",
      "Menyederhanakan hanya pembilang atau hanya penyebut"
    ],
    "kenapa": [
      "Kenapa mengalikan pembilang dan penyebut dengan bilangan yang sama tidak mengubah nilai pecahan, tetapi menambahkannya mengubah nilai?",
      "Kenapa 1/2 lebih besar dari 1/3 padahal 3 lebih besar dari 2?"
    ],
    "prasyarat": [
      "sd4-pecahan-senilai",
      "sd4-kelipatan-dan-faktor-bilangan"
    ]
  },
  {
    "id": "sd5-pembagian-bilangan-cacah",
    "judul": "Pembagian Bilangan Cacah",
    "kelas": 5,
    "fase": "C",
    "domain": "bilangan",
    "ringkas": "Membagi bilangan cacah sampai 100.000 dengan pembagi satu dan dua angka",
    "subKonsep": [
      "Dua makna pembagian: pembagian merata (berapa isi tiap kelompok) dan pengelompokan (berapa banyak kelompok)",
      "Pembagian sebagai pengurangan berulang",
      "Pembagian bersusun (porogapit) dengan pembagi satu dan dua angka",
      "Sisa pembagian dan penafsirannya dalam konteks masalah",
      "Pembagian dengan nol sebagai hasil bagi di tengah (misal 6.045 : 5)",
      "Tidak terdefinisinya pembagian oleh nol",
      "Hubungan perkalian dan pembagian sebagai operasi berkebalikan",
      "Menaksir hasil bagi sebelum menghitung"
    ],
    "rumus": [
      "a : b = c <=> c x b = a (untuk b tidak nol)",
      "Terbagi = hasil bagi x pembagi + sisa",
      "a : 0 tidak terdefinisi; 0 : a = 0 untuk a tidak nol"
    ],
    "miskonsepsi": [
      "Mengira pembagian selalu mengecilkan hasil",
      "Menganggap pembagian bersifat komutatif (12 : 3 sama dengan 3 : 12)",
      "Melewatkan angka nol pada hasil bagi sehingga 6.045 : 5 dijawab 129 bukan 1.209"
    ],
    "kenapa": [
      "Kenapa pembagian dengan nol tidak boleh, sedangkan nol dibagi bilangan lain boleh?",
      "Kenapa sisa pembagian kadang harus dibulatkan ke atas (jumlah bus) dan kadang dibuang (jumlah kotak penuh)?"
    ],
    "prasyarat": [
      "sd4-perkalian-bilangan-cacah-sampai-100",
      "sd4-pembagian-bilangan-cacah-sampai-100",
      "sd4-penjumlahan-bilangan-cacah-sampai-1"
    ]
  },
  {
    "id": "sd5-pembulatan-dan-penaksiran-estimasi",
    "judul": "Pembulatan dan Penaksiran (Estimasi)",
    "kelas": 5,
    "fase": "C",
    "domain": "bilangan",
    "ringkas": "Membulatkan bilangan ke satuan/puluhan/ratusan/ribuan terdekat",
    "subKonsep": [
      "Pembulatan ke satuan, puluhan, ratusan, ribuan terdekat",
      "Aturan pembulatan: lihat angka di sebelah kanan tempat yang dituju",
      "Pembulatan setengah ke atas (angka 5 dibulatkan naik)",
      "Taksiran rendah (bawah), taksiran tinggi (atas), dan taksiran terbaik",
      "Penaksiran hasil penjumlahan, pengurangan, perkalian, dan pembagian",
      "Kalkulasi mental menggunakan bilangan bersahabat (compatible numbers)",
      "Menggunakan taksiran untuk memeriksa kewajaran hasil hitung",
      "Konteks nyata: menaksir total belanja, jarak tempuh, banyak penonton"
    ],
    "rumus": [
      "Bulatkan ke puluhan: jika satuan >= 5 naik, jika < 5 turun",
      "Bulatkan ke ratusan: jika puluhan >= 5 naik, jika < 5 turun",
      "Taksiran hasil = hasil operasi pada bilangan yang sudah dibulatkan"
    ],
    "miskonsepsi": [
      "Membulatkan bertahap berulang (4.649 -> 4.650 -> 4.700 -> 5.000) sehingga hasil melenceng",
      "Mengira pembulatan selalu ke bawah karena \"membuang angka di belakang\"",
      "Menganggap taksiran adalah jawaban yang salah, bukan alat pemeriksa"
    ],
    "kenapa": [
      "Kenapa angka 5 dibulatkan ke atas padahal jaraknya sama persis ke bilangan bawah dan atas?",
      "Kenapa membulatkan bertahap bisa membuat hasilnya salah?"
    ],
    "prasyarat": [
      "sd4-nilai-tempat-bilangan-cacah-sampai",
      "sd5-membandingkan-dan-mengurutkan-bilangan-cacah",
      "sd4-penjumlahan-bilangan-cacah-sampai-1"
    ]
  },
  {
    "id": "sd5-penjumlahan-dan-pengurangan-bilangan-cacah",
    "judul": "Penjumlahan dan Pengurangan Bilangan Cacah sampai 100.000",
    "kelas": 5,
    "fase": "C",
    "domain": "bilangan",
    "ringkas": "Menjumlahkan dan mengurangkan bilangan cacah sampai 100.000 secara bersusun",
    "subKonsep": [
      "Penjumlahan bersusun dengan menyimpan (regrouping/menyimpan puluhan)",
      "Pengurangan bersusun dengan meminjam (dekomposisi nilai tempat)",
      "Pengurangan dengan angka nol berturut-turut (50.000 - 8.475)",
      "Strategi mental: memecah menurut nilai tempat, kompensasi, bilangan bulat ratusan",
      "Hubungan penjumlahan dan pengurangan sebagai operasi berkebalikan",
      "Pemeriksaan hasil dengan operasi kebalikan dan dengan taksiran",
      "Soal cerita: penggabungan, pemisahan, selisih, dan perubahan"
    ],
    "rumus": [
      "a + b = c <=> c - a = b dan c - b = a",
      "Meminjam: 1 puluhan = 10 satuan, 1 ratusan = 10 puluhan, 1 ribuan = 10 ratusan"
    ],
    "miskonsepsi": [
      "Mengurangkan angka yang lebih kecil dari yang lebih besar per kolom tanpa meminjam (5.003 - 2.008 = 3.005)",
      "Lupa mengurangi angka yang sudah dipinjam pada kolom sebelah kiri",
      "Salah menyusun angka karena tidak sejajar nilai tempat pada bilangan berbeda panjang"
    ],
    "kenapa": [
      "Kenapa saat meminjam, satu ratusan berubah menjadi sepuluh puluhan dan bukan seratus puluhan?",
      "Kenapa angka harus disusun lurus berdasarkan nilai tempat, bukan rata kanan sembarangan?"
    ],
    "prasyarat": [
      "sd4-nilai-tempat-bilangan-cacah-sampai",
      "sd4-penjumlahan-bilangan-cacah-sampai-1"
    ]
  },
  {
    "id": "sd5-penjumlahan-dan-pengurangan-pecahan",
    "judul": "Penjumlahan dan Pengurangan Pecahan",
    "kelas": 5,
    "fase": "C",
    "domain": "bilangan",
    "ringkas": "Menjumlahkan dan mengurangkan pecahan berpenyebut sama dan berbeda",
    "subKonsep": [
      "Penjumlahan dan pengurangan pecahan berpenyebut sama",
      "Menyamakan penyebut menggunakan KPK untuk penyebut berbeda",
      "Model luasan dan pita pecahan untuk memvisualkan penjumlahan",
      "Penjumlahan dan pengurangan pecahan campuran (menjumlahkan bagian bulat dan bagian pecahan)",
      "Meminjam pada pengurangan pecahan campuran (3 1/4 - 1 3/4)",
      "Menyederhanakan hasil ke bentuk paling sederhana",
      "Menaksir hasil operasi pecahan dengan patokan 0, 1/2, 1",
      "Soal cerita pecahan dalam konteks resep, panjang tali, waktu"
    ],
    "rumus": [
      "a/c + b/c = (a + b)/c",
      "a/b + c/d = (a x d + c x b)/(b x d)",
      "Dengan KPK: a/b + c/d = (a x (K:b) + c x (K:d))/K dengan K = KPK(b,d)"
    ],
    "miskonsepsi": [
      "Menjumlahkan pembilang dengan pembilang dan penyebut dengan penyebut (1/2 + 1/3 = 2/5)",
      "Menyamakan penyebut tetapi tidak mengubah pembilang",
      "Menjumlahkan bagian bulat dan pecahan campuran secara terpisah tanpa memperhatikan hasil pecahan yang lebih dari 1"
    ],
    "kenapa": [
      "Kenapa penyebut harus disamakan dulu sebelum pecahan dijumlahkan, padahal pada perkalian tidak perlu?",
      "Kenapa 1/2 + 1/3 tidak sama dengan 2/5, padahal terasa masuk akal?"
    ],
    "konsep": [
      "pecahan-penyebut"
    ],
    "prasyarat": [
      "sd4-membandingkan-dan-mengurutkan-pecahan-berpenyebut",
      "sd4-pecahan-senilai",
      "sd5-pecahan-campuran-dan-pecahan-tidak"
    ]
  },
  {
    "id": "sd5-perkalian-bilangan-cacah",
    "judul": "Perkalian Bilangan Cacah",
    "kelas": 5,
    "fase": "C",
    "domain": "bilangan",
    "ringkas": "Mengalikan bilangan cacah tiga angka dengan dua angka secara bersusun",
    "subKonsep": [
      "Makna perkalian: penjumlahan berulang, susunan baris-kolom (array), dan luas persegi panjang",
      "Perkalian dengan 10, 100, 1.000 dan pola menambah nol",
      "Perkalian bersusun panjang (satu angka, dua angka, tiga angka pengali)",
      "Metode kotak/luas (area model) sebagai dasar perkalian bersusun",
      "Perkalian dengan nol dan dengan satu",
      "Fakta perkalian dasar sampai 10 x 10 sebagai bekal kelancaran",
      "Menaksir hasil perkalian sebelum menghitung",
      "Soal cerita perkalian: laju, perbandingan berlipat, susunan persegi panjang"
    ],
    "rumus": [
      "a x b = b x a (sifat komutatif)",
      "a x (b + c) = a x b + a x c (sifat distributif)",
      "a x 10^n = a diikuti n buah nol",
      "Luas persegi panjang sebagai model: p x l"
    ],
    "miskonsepsi": [
      "Lupa menggeser satu tempat (menambahkan nol) pada baris hasil perkalian dengan puluhan",
      "Mengira perkalian selalu membesarkan hasil (gagal saat dikali 1 atau 0)",
      "Menganggap 25 x 10 = 250 karena \"tambah nol\" lalu keliru menerapkan 2,5 x 10 = 2,50"
    ],
    "kenapa": [
      "Kenapa pada perkalian bersusun baris kedua digeser satu tempat ke kiri?",
      "Kenapa mengalikan dengan 10 cukup menambah satu angka nol, dan apa yang sebenarnya terjadi pada nilai tempatnya?"
    ],
    "prasyarat": [
      "sd4-nilai-tempat-bilangan-cacah-sampai",
      "sd4-perkalian-bilangan-cacah-sampai-100",
      "sd5-sifat-operasi-hitung-dan-operasi"
    ]
  },
  {
    "id": "sd5-sifat-operasi-hitung-dan-operasi",
    "judul": "Sifat Operasi Hitung dan Operasi Hitung Campuran",
    "kelas": 5,
    "fase": "C",
    "domain": "bilangan",
    "ringkas": "Menghitung operasi campuran dengan urutan operasi yang benar",
    "subKonsep": [
      "Sifat komutatif pada penjumlahan dan perkalian (dan tidak berlaku pada pengurangan dan pembagian)",
      "Sifat asosiatif pada penjumlahan dan perkalian",
      "Sifat distributif perkalian terhadap penjumlahan dan pengurangan",
      "Unsur identitas: 0 pada penjumlahan, 1 pada perkalian",
      "Urutan operasi: kurung, lalu perkalian dan pembagian dari kiri ke kanan, lalu penjumlahan dan pengurangan dari kiri ke kanan",
      "Peran tanda kurung dalam mengubah hasil",
      "Menggunakan sifat operasi untuk mempercepat hitungan (4 x 27 x 25)",
      "Soal cerita dua langkah dan penulisan kalimat matematikanya"
    ],
    "rumus": [
      "a + b = b + a ; a x b = b x a",
      "(a + b) + c = a + (b + c) ; (a x b) x c = a x (b x c)",
      "a x (b + c) = a x b + a x c ; a x (b - c) = a x b - a x c",
      "a + 0 = a ; a x 1 = a ; a x 0 = 0"
    ],
    "miskonsepsi": [
      "Mengerjakan operasi selalu urut dari kiri ke kanan tanpa mendahulukan perkalian/pembagian",
      "Mengira penjumlahan selalu didahulukan daripada pengurangan (menghitung 10 - 3 + 2 = 5)",
      "Mengira perkalian selalu didahulukan daripada pembagian pada 24 : 4 x 2"
    ],
    "kenapa": [
      "Kenapa perkalian dikerjakan lebih dulu daripada penjumlahan, siapa yang menetapkan aturan ini?",
      "Kenapa pengurangan tidak bersifat komutatif padahal penjumlahan bisa?"
    ],
    "prasyarat": [
      "sd4-perkalian-bilangan-cacah-sampai-100",
      "sd4-pembagian-bilangan-cacah-sampai-100",
      "sd4-penjumlahan-bilangan-cacah-sampai-1"
    ]
  },
  {
    "id": "sd5-mengumpulkan-data-dan-menyajikannya-dalam",
    "judul": "Mengumpulkan Data dan Menyajikannya dalam Tabel Frekuensi",
    "kelas": 5,
    "fase": "C",
    "domain": "data",
    "ringkas": "Merumuskan pertanyaan penelitian sederhana dan merancang cara pengumpulan datanya",
    "subKonsep": [
      "Merumuskan pertanyaan yang bisa dijawab dengan data",
      "Data kualitatif (kategori) dan data kuantitatif (angka)",
      "Data cacahan (banyak benda) dan data hasil pengukuran",
      "Cara mengumpulkan data: pengamatan, wawancara, angket/survei, percobaan",
      "Turus (tally) dan cara mengelompokkan lima-lima",
      "Tabel frekuensi: kolom kategori, turus, dan frekuensi",
      "Membaca tabel frekuensi untuk menjawab pertanyaan",
      "Data terurut dan jangkauan (nilai terbesar dikurangi terkecil)"
    ],
    "rumus": [
      "Frekuensi = banyaknya kemunculan suatu nilai atau kategori",
      "Jumlah semua frekuensi = banyak data seluruhnya",
      "Jangkauan = nilai terbesar - nilai terkecil"
    ],
    "miskonsepsi": [
      "Menghitung turus satu per satu tanpa mengelompokkan lima-lima sehingga mudah keliru",
      "Mengira jumlah frekuensi tidak perlu sama dengan banyak responden",
      "Mencampur kategori yang tumpang tindih dalam satu tabel"
    ],
    "kenapa": [
      "Kenapa turus dikelompokkan lima-lima dan bukan sepuluh-sepuluh?",
      "Kenapa jumlah semua frekuensi harus sama dengan banyaknya responden?"
    ],
    "prasyarat": [
      "sd4-piktogram-diagram-gambar",
      "sd4-penjumlahan-bilangan-cacah-sampai-1"
    ]
  },
  {
    "id": "sd5-piktogram-dan-diagram-batang-berskala",
    "judul": "Piktogram dan Diagram Batang Berskala",
    "kelas": 5,
    "fase": "C",
    "domain": "data",
    "ringkas": "Membuat piktogram dengan skala dan legenda yang tepat",
    "subKonsep": [
      "Piktogram dengan satu gambar mewakili lebih dari satu benda",
      "Gambar sebagian (setengah gambar) pada piktogram",
      "Diagram batang tegak dan mendatar",
      "Sumbu kategori dan sumbu frekuensi",
      "Skala sumbu (satu kotak mewakili 2, 5, 10, atau lebih)",
      "Judul, label sumbu, dan keterangan (legenda)",
      "Membaca nilai dari diagram batang termasuk nilai antara garis skala",
      "Membandingkan kategori dan menemukan yang terbesar/terkecil"
    ],
    "rumus": [
      "Nilai pada piktogram = banyak gambar x nilai satu gambar",
      "Nilai batang = tinggi batang (dalam kotak) x skala per kotak",
      "Selisih dua kategori = nilai kategori pertama - nilai kategori kedua"
    ],
    "miskonsepsi": [
      "Membaca piktogram dengan menghitung gambar saja tanpa mengalikan dengan nilai legenda",
      "Mengira setiap gambar pada piktogram selalu bernilai 1",
      "Membuat diagram batang dengan lebar batang berbeda-beda"
    ],
    "kenapa": [
      "Kenapa satu gambar pada piktogram bisa mewakili 10 benda, bukan 1?",
      "Kenapa sumbu diagram batang sebaiknya dimulai dari nol?"
    ],
    "prasyarat": [
      "sd5-mengumpulkan-data-dan-menyajikannya-dalam",
      "sd4-perkalian-bilangan-cacah-sampai-100",
      "sd4-pembagian-bilangan-cacah-sampai-100",
      "sd4-diagram-batang-skala-satu-satuan"
    ]
  },
  {
    "id": "sd5-ciri-ciri-dan-klasifikasi-bangun",
    "judul": "Ciri-ciri dan Klasifikasi Bangun Datar",
    "kelas": 5,
    "fase": "C",
    "domain": "geometri",
    "ringkas": "Mengelompokkan bangun datar berdasarkan sifat sisi, sudut, dan diagonalnya",
    "subKonsep": [
      "Unsur bangun datar: sisi, sudut, titik sudut, diagonal",
      "Segitiga menurut panjang sisi (sama sisi, sama kaki, sembarang)",
      "Segitiga menurut besar sudut (lancip, siku-siku, tumpul)",
      "Segiempat: persegi, persegi panjang, jajargenjang, belah ketupat, layang-layang, trapesium",
      "Hubungan hierarkis segiempat (persegi adalah persegi panjang khusus)",
      "Sifat sisi sejajar, sisi sama panjang, sudut siku-siku, dan diagonal",
      "Segi banyak beraturan dan tidak beraturan",
      "Simetri lipat dan simetri putar"
    ],
    "rumus": [
      "Jumlah sudut dalam segi-n = (n - 2) x 180 derajat",
      "Banyak diagonal segi-n = n x (n - 3) : 2",
      "Segitiga sama sisi memiliki 3 simetri lipat dan simetri putar tingkat 3",
      "Persegi memiliki 4 simetri lipat dan simetri putar tingkat 4"
    ],
    "miskonsepsi": [
      "Mengira persegi bukan persegi panjang karena \"bentuknya beda\"",
      "Mengenali bangun hanya pada posisi baku (persegi yang dimiringkan disebut belah ketupat)",
      "Mengira semua segiempat yang sisinya sama panjang adalah persegi"
    ],
    "kenapa": [
      "Kenapa persegi bisa disebut persegi panjang, belah ketupat, sekaligus layang-layang?",
      "Kenapa persegi yang dimiringkan tetap persegi dan bukan belah ketupat?"
    ],
    "prasyarat": [
      "sd5-keliling-bangun-datar",
      "sd5-sudut-dan-pengukurannya-dengan-busur"
    ]
  },
  {
    "id": "sd5-hubungan-antarsudut-pada-dua-garis",
    "judul": "Hubungan Antarsudut pada Dua Garis Berpotongan",
    "kelas": 5,
    "fase": "C",
    "domain": "pengukuran",
    "ringkas": "Mengidentifikasi pasangan sudut berpelurus, berpenyiku, dan bertolak belakang",
    "subKonsep": [
      "Sudut berpelurus (berjumlah 180 derajat) pada garis lurus",
      "Sudut berpenyiku (berjumlah 90 derajat)",
      "Sudut bertolak belakang yang sama besar",
      "Sudut satu putaran pada titik potong (360 derajat)",
      "Garis tegak lurus dan garis sejajar",
      "Menghitung sudut yang belum diketahui pada gambar dua garis berpotongan",
      "Sudut pada perpotongan diagonal bangun datar",
      "Penerapan pada denah, rambu, dan konstruksi"
    ],
    "rumus": [
      "Sudut berpelurus: a + b = 180 derajat",
      "Sudut berpenyiku: a + b = 90 derajat",
      "Sudut bertolak belakang: sama besar",
      "Jumlah semua sudut di sekeliling satu titik = 360 derajat"
    ],
    "miskonsepsi": [
      "Tertukar antara sudut berpelurus (180) dan berpenyiku (90)",
      "Mengira semua sudut yang bersebelahan pasti berjumlah 180 derajat",
      "Mengira sudut bertolak belakang berjumlah 180 derajat, bukan sama besar"
    ],
    "kenapa": [
      "Kenapa sudut bertolak belakang selalu sama besar, bagaimana membuktikannya?",
      "Kenapa dua sudut pada satu garis lurus berjumlah 180 derajat?"
    ],
    "prasyarat": [
      "sd5-sudut-dan-pengukurannya-dengan-busur",
      "sd5-kalimat-matematika-dan-nilai-yang"
    ]
  },
  {
    "id": "sd5-keliling-bangun-datar",
    "judul": "Keliling Bangun Datar",
    "kelas": 5,
    "fase": "C",
    "domain": "pengukuran",
    "ringkas": "Menghitung keliling berbagai bangun datar dan bangun gabungan",
    "subKonsep": [
      "Keliling sebagai panjang lintasan mengelilingi bangun",
      "Mengukur keliling dengan tali/benang lalu diluruskan",
      "Keliling persegi, persegi panjang, segitiga, jajargenjang, trapesium, belah ketupat, layang-layang",
      "Keliling segi banyak beraturan dan tidak beraturan",
      "Keliling bangun gabungan (menjumlahkan sisi terluar saja)",
      "Mencari panjang sisi jika keliling diketahui",
      "Bangun berbeda dengan keliling sama tetapi luas berbeda",
      "Satuan keliling (cm, m, km) sebagai satuan panjang"
    ],
    "rumus": [
      "K persegi = 4 x s",
      "K persegi panjang = 2 x (p + l)",
      "K segitiga = a + b + c",
      "K jajargenjang = 2 x (alas + sisi miring)",
      "K belah ketupat = 4 x s",
      "K segi banyak = jumlah semua panjang sisinya"
    ],
    "miskonsepsi": [
      "Tertukar antara keliling dan luas",
      "Menghitung keliling persegi panjang sebagai p + l saja",
      "Pada bangun gabungan, ikut menjumlahkan garis potong di dalam bangun"
    ],
    "kenapa": [
      "Kenapa keliling persegi panjang 2 x (p + l) dan bukan p + l?",
      "Kenapa dua bangun dengan keliling sama bisa punya luas berbeda jauh?"
    ],
    "prasyarat": [
      "sd5-satuan-baku-dan-konversi-satuan",
      "sd5-ciri-ciri-dan-klasifikasi-bangun",
      "sd4-penjumlahan-bilangan-cacah-sampai-1"
    ]
  },
  {
    "id": "sd5-luas-bangun-datar-gabungan-dan",
    "judul": "Luas Bangun Datar Gabungan dan Hubungan Keliling dengan Luas",
    "kelas": 5,
    "fase": "C",
    "domain": "pengukuran",
    "ringkas": "Memecah bangun gabungan menjadi persegi panjang, segitiga, dan trapesium",
    "subKonsep": [
      "Memecah bangun gabungan menjadi bangun-bangun dasar",
      "Strategi pengurangan (luas bangun besar dikurangi bagian yang hilang)",
      "Menentukan ukuran sisi yang tidak tertulis pada gambar",
      "Luas daerah yang diarsir",
      "Bangun berbeda dengan luas sama (bangun ekuivalen)",
      "Bangun dengan keliling sama tetapi luas berbeda dan sebaliknya",
      "Luas maksimum untuk keliling tertentu (persegi)",
      "Penerapan: luas lantai, luas kebun, luas taman berbentuk gabungan"
    ],
    "rumus": [
      "L gabungan = jumlah luas bagian-bagiannya",
      "L daerah diarsir = L bangun luar - L bangun dalam",
      "Untuk keliling tetap, luas terbesar dicapai oleh bentuk persegi"
    ],
    "miskonsepsi": [
      "Menghitung dua kali daerah yang bertumpang tindih",
      "Mengira sisi yang tidak tertulis ukurannya tidak dapat dicari",
      "Mengira bangun dengan luas sama pasti kelilingnya sama"
    ],
    "kenapa": [
      "Kenapa bangun yang luasnya sama bisa memiliki keliling yang sangat berbeda?",
      "Kenapa untuk keliling pagar yang tetap, bentuk persegi memberi luas kebun terbesar?"
    ],
    "prasyarat": [
      "sd5-luas-persegi-persegi-panjang-dan",
      "sd5-luas-jajargenjang-trapesium-belah-ketupat",
      "sd4-keliling-bangun-datar-pengenalan"
    ]
  },
  {
    "id": "sd5-luas-jajargenjang-trapesium-belah-ketupat",
    "judul": "Luas Jajargenjang, Trapesium, Belah Ketupat, dan Layang-layang",
    "kelas": 5,
    "fase": "C",
    "domain": "pengukuran",
    "ringkas": "Menghitung luas jajargenjang, trapesium, belah ketupat, dan layang-layang",
    "subKonsep": [
      "Jajargenjang sebagai persegi panjang yang digeser (potong dan pindah)",
      "Alas dan tinggi jajargenjang",
      "Trapesium sebagai setengah jajargenjang dari dua trapesium kongruen",
      "Sisi sejajar (a dan b) dan tinggi trapesium",
      "Belah ketupat dan layang-layang dengan diagonal saling tegak lurus",
      "Luas dari setengah hasil kali diagonal",
      "Menurunkan rumus dengan memotong dan menyusun ulang bangun",
      "Mencari unsur yang belum diketahui jika luas diketahui"
    ],
    "rumus": [
      "L jajargenjang = a x t",
      "L trapesium = 1/2 x (a + b) x t",
      "L belah ketupat = 1/2 x d1 x d2",
      "L layang-layang = 1/2 x d1 x d2"
    ],
    "miskonsepsi": [
      "Menggunakan sisi miring jajargenjang sebagai tinggi",
      "Mengira luas trapesium = (a + b) x t tanpa dikali setengah",
      "Menjumlahkan semua sisi trapesium sebagai (a + b)"
    ],
    "kenapa": [
      "Kenapa luas jajargenjang sama dengan alas kali tinggi, sama seperti persegi panjang?",
      "Kenapa rumus trapesium memakai rata-rata dua sisi sejajar dikali tinggi?"
    ],
    "prasyarat": [
      "sd5-luas-persegi-persegi-panjang-dan",
      "sd5-ciri-ciri-dan-klasifikasi-bangun",
      "sd5-satuan-baku-dan-konversi-satuan"
    ]
  },
  {
    "id": "sd5-luas-persegi-persegi-panjang-dan",
    "judul": "Luas Persegi, Persegi Panjang, dan Segitiga",
    "kelas": 5,
    "fase": "C",
    "domain": "pengukuran",
    "ringkas": "Menghitung luas persegi, persegi panjang, dan segitiga",
    "subKonsep": [
      "Luas sebagai banyaknya satuan persegi yang menutupi daerah",
      "Persegi satuan dan pengubinan tanpa celah",
      "Luas persegi panjang dari susunan baris dan kolom",
      "Luas persegi sebagai kasus khusus persegi panjang",
      "Alas dan tinggi segitiga (tinggi harus tegak lurus alas)",
      "Segitiga sebagai setengah persegi panjang atau setengah jajargenjang",
      "Tinggi segitiga tumpul yang jatuh di luar alas",
      "Luas segitiga dengan berbagai pilihan pasangan alas-tinggi"
    ],
    "rumus": [
      "L persegi = s x s = s^2",
      "L persegi panjang = p x l",
      "L segitiga = 1/2 x a x t",
      "t segitiga = (2 x L) : a"
    ],
    "miskonsepsi": [
      "Menggunakan sisi miring segitiga sebagai tinggi",
      "Mengira tinggi selalu berada di dalam segitiga",
      "Lupa mengalikan 1/2 pada luas segitiga"
    ],
    "kenapa": [
      "Kenapa luas segitiga setengah dari alas kali tinggi, dari mana angka setengahnya?",
      "Kenapa tinggi segitiga harus tegak lurus alas dan bukan sisi miringnya?"
    ],
    "konsep": [
      "segitiga-setengah"
    ],
    "prasyarat": [
      "sd4-keliling-bangun-datar-pengenalan",
      "sd5-satuan-baku-dan-konversi-satuan",
      "sd4-perkalian-bilangan-cacah-sampai-100",
      "sd5-ciri-ciri-dan-klasifikasi-bangun"
    ]
  },
  {
    "id": "sd5-satuan-baku-dan-konversi-satuan",
    "judul": "Satuan Baku dan Konversi Satuan (Panjang, Berat, Volume, Waktu)",
    "kelas": 5,
    "fase": "C",
    "domain": "pengukuran",
    "ringkas": "Mengonversi satuan panjang, berat, volume, luas, dan waktu",
    "subKonsep": [
      "Satuan baku panjang (km, hm, dam, m, dm, cm, mm) dan tangga satuan",
      "Satuan baku berat/massa (ton, kuintal, kg, hg, dag, g, dg, cg, mg)",
      "Satuan volume/kapasitas (kl, hl, dal, l, dl, cl, ml) dan hubungan liter dengan dm3",
      "Satuan waktu (detik, menit, jam, hari, minggu, bulan, tahun, dasawarsa, abad)",
      "Aturan naik satu tangga dibagi 10, turun satu tangga dikali 10",
      "Satuan luas (km2, hm2/hektare, dam2/are, m2, dm2, cm2) dengan faktor 100 per tangga",
      "Satuan volume ruang (m3, dm3, cm3) dengan faktor 1.000 per tangga",
      "Memilih satuan yang paling sesuai untuk suatu benda"
    ],
    "rumus": [
      "Panjang: turun 1 tangga x10, naik 1 tangga :10",
      "Luas: turun 1 tangga x100, naik 1 tangga :100",
      "Volume: turun 1 tangga x1.000, naik 1 tangga :1.000",
      "1 liter = 1 dm3 ; 1 ml = 1 cm3 ; 1 m3 = 1.000 liter",
      "1 ton = 10 kuintal = 1.000 kg ; 1 hektare = 10.000 m2",
      "1 jam = 60 menit = 3.600 detik"
    ],
    "miskonsepsi": [
      "Menggunakan faktor 10 untuk satuan luas dan volume (mengira 1 m2 = 10 dm2)",
      "Mengira 1 m3 = 1.000 cm3 (padahal 1.000.000 cm3)",
      "Membalik arah tangga satuan (naik dikali, turun dibagi)"
    ],
    "kenapa": [
      "Kenapa tangga satuan luas melompat 100 dan tangga satuan volume melompat 1.000, sedangkan panjang hanya 10?",
      "Kenapa 1 liter tepat sama dengan 1 dm3, siapa yang menentukan?"
    ],
    "prasyarat": [
      "sd3-hubungan-antarsatuan-baku-panjang",
      "sd4-perkalian-bilangan-cacah-sampai-100",
      "sd4-pembagian-bilangan-cacah-sampai-100",
      "sd2-membandingkan-dan-mengurutkan-bilangan-sampai"
    ]
  },
  {
    "id": "sd5-sudut-dan-pengukurannya-dengan-busur",
    "judul": "Sudut dan Pengukurannya dengan Busur Derajat",
    "kelas": 5,
    "fase": "C",
    "domain": "pengukuran",
    "ringkas": "Mengukur besar sudut dengan busur derajat secara tepat",
    "subKonsep": [
      "Sudut sebagai besar putaran antara dua sinar garis yang bertemu di titik sudut",
      "Bagian sudut: titik sudut, kaki sudut, daerah sudut",
      "Satuan derajat dan asal 360 derajat untuk satu putaran penuh",
      "Jenis sudut: lancip, siku-siku, tumpul, lurus, refleks",
      "Membaca busur derajat (dua skala dalam dan luar)",
      "Menggambar sudut dengan besar tertentu",
      "Menaksir besar sudut tanpa alat",
      "Sudut pada bangun datar (jumlah sudut segitiga 180 derajat, segiempat 360 derajat)"
    ],
    "rumus": [
      "1 putaran penuh = 360 derajat ; 1/2 putaran = 180 derajat ; 1/4 putaran = 90 derajat",
      "Jumlah sudut dalam segitiga = 180 derajat",
      "Jumlah sudut dalam segiempat = 360 derajat",
      "Jumlah sudut dalam segi-n = (n - 2) x 180 derajat",
      "Sudut jarum jam per jam = 30 derajat; per menit (jarum panjang) = 6 derajat"
    ],
    "miskonsepsi": [
      "Membaca skala busur derajat yang salah (60 dibaca 120)",
      "Mengira sudut yang kaki garisnya lebih panjang berarti sudutnya lebih besar",
      "Meletakkan titik pusat busur derajat tidak tepat pada titik sudut"
    ],
    "kenapa": [
      "Kenapa satu putaran penuh dibagi menjadi 360 derajat dan bukan 100?",
      "Kenapa besar sudut tidak berubah meskipun kaki sudutnya diperpanjang?"
    ],
    "prasyarat": [
      "sd5-ciri-ciri-dan-klasifikasi-bangun",
      "sd5-satuan-baku-dan-konversi-satuan",
      "sd4-penjumlahan-bilangan-cacah-sampai-1"
    ]
  },
  {
    "id": "sd5-waktu-dan-durasi",
    "judul": "Waktu dan Durasi",
    "kelas": 5,
    "fase": "C",
    "domain": "pengukuran",
    "ringkas": "Membaca jam analog dan digital serta mengubah format 12 dan 24 jam",
    "subKonsep": [
      "Membaca jam analog dan jam digital",
      "Format 12 jam (pagi/siang/sore/malam) dan 24 jam",
      "Satuan waktu dan konversinya (detik, menit, jam, hari, minggu, bulan, tahun)",
      "Menghitung durasi antara dua waktu (termasuk melewati tengah hari dan tengah malam)",
      "Menghitung waktu selesai jika waktu mulai dan durasi diketahui",
      "Menjumlahkan dan mengurangkan waktu bersistem 60 (bukan 10)",
      "Membaca jadwal (kereta, pelajaran, acara) dan menghitung selisihnya",
      "Kalender: jumlah hari tiap bulan dan tahun kabisat"
    ],
    "rumus": [
      "1 menit = 60 detik ; 1 jam = 60 menit = 3.600 detik",
      "1 hari = 24 jam ; 1 minggu = 7 hari",
      "Durasi = waktu selesai - waktu mulai",
      "Tahun kabisat: habis dibagi 4 (kecuali tahun abad yang tidak habis dibagi 400)"
    ],
    "miskonsepsi": [
      "Menghitung selisih waktu dengan pengurangan desimal (10.15 - 9.45 dijawab 0,70)",
      "Mengira 1,5 jam sama dengan 1 jam 50 menit",
      "Salah membaca jam analog karena tertukar jarum pendek dan panjang"
    ],
    "kenapa": [
      "Kenapa waktu memakai sistem 60 dan bukan sistem 10 seperti satuan panjang?",
      "Kenapa 1,5 jam sama dengan 1 jam 30 menit, bukan 1 jam 50 menit?"
    ],
    "prasyarat": [
      "sd5-satuan-baku-dan-konversi-satuan",
      "sd4-penjumlahan-bilangan-cacah-sampai-1",
      "sd2-membandingkan-durasi-waktu"
    ]
  },
  {
    "id": "sd6-kecepatan-dan-debit-perbandingan-dua",
    "judul": "Kecepatan dan Debit (Perbandingan Dua Besaran Berbeda)",
    "kelas": 6,
    "fase": "C",
    "domain": "aljabar",
    "ringkas": "Menghitung kecepatan, jarak, dan waktu dari dua besaran yang diketahui",
    "subKonsep": [
      "Kecepatan sebagai perbandingan jarak terhadap waktu",
      "Satuan kecepatan (km/jam, m/detik) dan konversinya",
      "Debit sebagai perbandingan volume terhadap waktu",
      "Satuan debit (liter/detik, m3/jam) dan konversinya",
      "Menentukan jarak, waktu, atau kecepatan jika dua di antaranya diketahui",
      "Kecepatan rata-rata pada perjalanan bertahap",
      "Grafik jarak-waktu sederhana (pengenalan)",
      "Konteks nyata: perjalanan, mengisi bak, aliran keran"
    ],
    "rumus": [
      "v = s : t ; s = v x t ; t = s : v",
      "Debit = volume : waktu ; volume = debit x waktu ; waktu = volume : debit",
      "1 m/detik = 3,6 km/jam",
      "1 liter = 1 dm3 = 1.000 cm3"
    ],
    "miskonsepsi": [
      "Menghitung kecepatan rata-rata dengan merata-ratakan dua kecepatan tanpa memperhatikan jaraknya",
      "Mencampur satuan (jarak dalam km, waktu dalam menit) tanpa mengonversi",
      "Membalik rumus sehingga menghitung v = t : s"
    ],
    "kenapa": [
      "Kenapa kecepatan rata-rata pergi-pulang tidak sama dengan rata-rata dua kecepatannya?",
      "Kenapa 1 jam 30 menit ditulis 1,5 jam dan bukan 1,30 jam?"
    ],
    "prasyarat": [
      "sd6-rasio-senilai-rasio-satuan-dan",
      "sd5-satuan-baku-dan-konversi-satuan",
      "sd2-membandingkan-durasi-waktu",
      "sd6-volume-kubus-dan-balok"
    ]
  },
  {
    "id": "sd6-konsep-rasio-dan-perbandingan",
    "judul": "Konsep Rasio dan Perbandingan",
    "kelas": 6,
    "fase": "C",
    "domain": "aljabar",
    "ringkas": "Menuliskan rasio dari situasi nyata dan menyederhanakannya",
    "subKonsep": [
      "Rasio sebagai cara membandingkan dua besaran sejenis",
      "Notasi rasio a : b dan pembacaannya",
      "Rasio bagian terhadap bagian dan rasio bagian terhadap keseluruhan",
      "Hubungan rasio dengan pecahan",
      "Menyederhanakan rasio dengan FPB",
      "Rasio tiga besaran (a : b : c)",
      "Membandingkan dengan selisih (aditif) vs dengan rasio (multiplikatif)",
      "Menyajikan rasio dengan gambar batang (bar model)"
    ],
    "rumus": [
      "Rasio a terhadap b ditulis a : b atau a/b",
      "Jika rasio a : b, maka bagian a = (a/(a+b)) x keseluruhan",
      "Rasio setara: a : b = (a x k) : (b x k)",
      "Menyederhanakan rasio: bagi kedua ruas dengan FPB"
    ],
    "miskonsepsi": [
      "Menganggap rasio 2 : 3 berarti 2/3 dari keseluruhan (padahal 2/5)",
      "Membandingkan dengan selisih padahal soal menuntut perbandingan berlipat",
      "Menyederhanakan rasio dengan mengurangi bilangan yang sama pada kedua ruas"
    ],
    "kenapa": [
      "Kenapa rasio 2 : 3 berarti 2/5 dari keseluruhan, bukan 2/3?",
      "Kenapa menambahkan bilangan yang sama pada kedua suku rasio mengubah nilainya, sedangkan mengalikan tidak?"
    ],
    "prasyarat": [
      "sd4-pecahan-senilai",
      "sd4-perkalian-bilangan-cacah-sampai-100",
      "sd4-pembagian-bilangan-cacah-sampai-100"
    ]
  },
  {
    "id": "sd6-rasio-senilai-rasio-satuan-dan",
    "judul": "Rasio Senilai, Rasio Satuan, dan Penalaran Proporsional",
    "kelas": 6,
    "fase": "C",
    "domain": "aljabar",
    "ringkas": "Menentukan apakah dua rasio senilai",
    "subKonsep": [
      "Rasio senilai (setara) dan cara memeriksanya",
      "Tabel rasio dan pola perkalian di dalamnya",
      "Rasio satuan (unit rate): nilai untuk satu satuan",
      "Harga satuan sebagai contoh rasio satuan",
      "Menyelesaikan proporsi dengan perkalian silang",
      "Faktor skala antar dua besaran yang sebanding",
      "Penalaran per satuan (unitary method): cari nilai satu, lalu kalikan",
      "Konteks: resep, harga, jarak-waktu, campuran cat, konversi mata uang sederhana"
    ],
    "rumus": [
      "a : b = c : d <=> a x d = b x c",
      "Rasio satuan = besaran pertama : besaran kedua (dengan besaran kedua = 1)",
      "Metode satuan: nilai untuk n = (nilai untuk 1) x n",
      "Faktor skala k: c = k x a dan d = k x b"
    ],
    "miskonsepsi": [
      "Menerapkan proporsi pada situasi yang tidak sebanding (usia dua orang, waktu memanaskan air oleh banyak kompor)",
      "Menjumlahkan bukan mengalikan saat memperbesar resep (menambah 2 pada semua bahan)",
      "Salah memasangkan satuan pada perkalian silang sehingga menghasilkan rasio terbalik"
    ],
    "kenapa": [
      "Kenapa perkalian silang boleh dipakai pada proporsi, dan dari mana asal aturannya?",
      "Kenapa memperbesar resep harus dikali, bukan ditambah?"
    ],
    "prasyarat": [
      "sd6-konsep-rasio-dan-perbandingan",
      "sd4-pembagian-bilangan-cacah-sampai-100",
      "sd6-perkalian-pecahan-dengan-bilangan-asli",
      "sd6-hubungan-pecahan-desimal-dan-persen"
    ]
  },
  {
    "id": "sd6-skala-pada-denah-dan-peta",
    "judul": "Skala pada Denah dan Peta",
    "kelas": 6,
    "fase": "C",
    "domain": "aljabar",
    "ringkas": "Menghitung jarak sebenarnya, jarak pada peta, dan skala",
    "subKonsep": [
      "Skala sebagai rasio jarak pada gambar terhadap jarak sebenarnya",
      "Penulisan skala 1 : n dan maknanya",
      "Skala batang (bar scale) pada peta",
      "Menghitung jarak sebenarnya dari jarak pada peta",
      "Menghitung jarak pada peta dari jarak sebenarnya",
      "Menentukan skala jika kedua jarak diketahui",
      "Konversi satuan panjang dalam perhitungan skala (cm ke km)",
      "Denah rumah, denah kelas, dan gambar berskala"
    ],
    "rumus": [
      "Skala = jarak pada peta : jarak sebenarnya",
      "Jarak sebenarnya = jarak pada peta x penyebut skala",
      "Jarak pada peta = jarak sebenarnya : penyebut skala",
      "1 km = 100.000 cm"
    ],
    "miskonsepsi": [
      "Lupa mengonversi satuan sehingga jarak sebenarnya dilaporkan dalam cm padahal seharusnya km",
      "Membalik rumus (membagi ketika seharusnya mengalikan)",
      "Mengira skala 1 : 500 menghasilkan gambar lebih besar dari aslinya"
    ],
    "kenapa": [
      "Kenapa skala 1 : 1.000.000 menghasilkan peta yang lebih kecil daripada skala 1 : 100.000?",
      "Kenapa 1 km sama dengan 100.000 cm, dan kenapa angka ini terus muncul di soal skala?"
    ],
    "prasyarat": [
      "sd6-rasio-senilai-rasio-satuan-dan",
      "sd5-satuan-baku-dan-konversi-satuan",
      "sd4-perkalian-bilangan-cacah-sampai-100",
      "sd4-pembagian-bilangan-cacah-sampai-100"
    ]
  },
  {
    "id": "sd6-bilangan-desimal-nilai-tempat-membandingkan",
    "judul": "Bilangan Desimal: Nilai Tempat, Membandingkan, dan Mengurutkan",
    "kelas": 6,
    "fase": "C",
    "domain": "bilangan",
    "ringkas": "Menentukan nilai tempat angka pada bilangan desimal",
    "subKonsep": [
      "Desimal sebagai pecahan berpenyebut 10, 100, 1.000",
      "Nilai tempat persepuluhan, perseratusan, perseribuan",
      "Peran koma sebagai pemisah bagian bulat dan bagian pecahan",
      "Nol di belakang koma yang tidak mengubah nilai (0,5 = 0,50)",
      "Membandingkan dan mengurutkan desimal dengan menyamakan banyak angka di belakang koma",
      "Letak desimal pada garis bilangan (pembesaran skala antara 0 dan 1)",
      "Mengubah pecahan menjadi desimal dengan pembagian atau dengan penyebut 10/100",
      "Desimal berulang sederhana (1/3 = 0,333...) sebagai pengenalan"
    ],
    "rumus": [
      "0,a = a/10 ; 0,ab = ab/100 ; 0,abc = abc/1000",
      "a/b diubah ke desimal dengan a : b",
      "Menyamakan banyak angka desimal dengan menambahkan nol di belakang koma"
    ],
    "miskonsepsi": [
      "Membandingkan desimal seperti bilangan cacah sehingga 0,25 dianggap lebih besar dari 0,5",
      "Mengira desimal dengan angka lebih banyak selalu lebih besar (longer-is-larger)",
      "Mengira nol di belakang koma mengubah nilai (0,5 dianggap tidak sama dengan 0,50)"
    ],
    "kenapa": [
      "Kenapa 0,5 lebih besar dari 0,25 padahal 25 lebih besar dari 5?",
      "Kenapa menambah nol di belakang koma tidak mengubah nilai, tetapi menambah nol di belakang bilangan cacah mengubahnya?"
    ],
    "prasyarat": [
      "sd4-pecahan-senilai",
      "sd4-nilai-tempat-bilangan-cacah-sampai",
      "sd4-pembagian-bilangan-cacah-sampai-100",
      "sd5-pembulatan-dan-penaksiran-estimasi"
    ]
  },
  {
    "id": "sd6-garis-bilangan-dan-bilangan-bulat",
    "judul": "Garis Bilangan dan Bilangan Bulat Negatif",
    "kelas": 6,
    "fase": "C",
    "domain": "bilangan",
    "ringkas": "Membaca dan menuliskan bilangan bulat negatif dalam konteks nyata",
    "subKonsep": [
      "Garis bilangan yang diperluas ke kiri nol",
      "Makna bilangan negatif dalam konteks nyata (suhu, ketinggian di bawah laut, utang, lantai basemen)",
      "Lambang negatif dan cara membacanya",
      "Membandingkan dan mengurutkan bilangan bulat termasuk negatif",
      "Lawan (invers penjumlahan) suatu bilangan",
      "Nilai mutlak sebagai jarak dari nol (pengenalan)",
      "Nol sebagai titik acuan, bukan positif maupun negatif",
      "Membaca termometer dan skala bertanda negatif"
    ],
    "rumus": [
      "Lawan dari a adalah -a, dengan a + (-a) = 0",
      "Pada garis bilangan, bilangan di sebelah kanan selalu lebih besar",
      "|a| = jarak a dari nol"
    ],
    "miskonsepsi": [
      "Mengira -8 lebih besar dari -3 karena 8 lebih besar dari 3",
      "Mengira nol adalah bilangan positif terkecil dan tidak ada bilangan di kirinya",
      "Membaca -5 sebagai \"kurang 5\" dan menganggapnya operasi, bukan bilangan"
    ],
    "kenapa": [
      "Kenapa -8 lebih kecil dari -3 padahal 8 lebih besar dari 3?",
      "Kenapa manusia perlu menciptakan bilangan negatif, apa yang tidak bisa dijelaskan tanpa itu?"
    ],
    "prasyarat": [
      "sd5-membandingkan-dan-mengurutkan-bilangan-cacah",
      "sd4-nilai-tempat-bilangan-cacah-sampai"
    ]
  },
  {
    "id": "sd6-hubungan-pecahan-desimal-dan-persen",
    "judul": "Hubungan Pecahan, Desimal, dan Persen",
    "kelas": 6,
    "fase": "C",
    "domain": "bilangan",
    "ringkas": "Mengubah bentuk pecahan, desimal, dan persen secara bolak-balik",
    "subKonsep": [
      "Persen sebagai pecahan berpenyebut 100 (per seratus)",
      "Mengubah pecahan ke persen dan sebaliknya",
      "Mengubah desimal ke persen dan sebaliknya",
      "Segitiga konversi: pecahan <-> desimal <-> persen",
      "Pecahan dan persen yang sering dipakai (1/2 = 50%, 1/4 = 25%, 1/5 = 20%, 3/4 = 75%, 1/8 = 12,5%)",
      "Persen lebih dari 100% dan kurang dari 1%",
      "Mengurutkan campuran pecahan, desimal, dan persen",
      "Memilih bentuk representasi yang paling komunikatif untuk situasi tertentu"
    ],
    "rumus": [
      "p% = p/100 = p : 100",
      "pecahan a/b ke persen: (a/b) x 100%",
      "desimal ke persen: kalikan 100 (geser koma dua tempat ke kanan)",
      "persen ke desimal: bagi 100 (geser koma dua tempat ke kiri)"
    ],
    "miskonsepsi": [
      "Mengira 1/4 = 1,4 atau 0,14",
      "Mengira 0,5 = 5% (menghitung geseran koma ke arah salah)",
      "Mengira persen tidak bisa lebih dari 100"
    ],
    "kenapa": [
      "Kenapa mengubah desimal ke persen cukup menggeser koma dua tempat ke kanan?",
      "Kenapa persen selalu berpatokan pada 100 dan bukan pada 10 atau 1.000?"
    ],
    "prasyarat": [
      "sd6-bilangan-desimal-nilai-tempat-membandingkan",
      "sd4-pecahan-senilai",
      "sd4-membandingkan-dan-mengurutkan-pecahan-berpenyebut"
    ]
  },
  {
    "id": "sd6-operasi-penjumlahan-dan-pengurangan-bilangan",
    "judul": "Operasi Penjumlahan dan Pengurangan Bilangan Bulat",
    "kelas": 6,
    "fase": "C",
    "domain": "bilangan",
    "ringkas": "Menjumlahkan dan mengurangkan bilangan bulat dengan bantuan garis bilangan",
    "subKonsep": [
      "Penjumlahan bilangan bulat menggunakan garis bilangan (bergerak kanan/kiri)",
      "Model kartu positif-negatif (pasangan nol) sebagai alternatif",
      "Menjumlahkan dua bilangan bertanda sama dan bertanda berbeda",
      "Pengurangan sebagai penjumlahan dengan lawan",
      "Selisih suhu dan selisih ketinggian sebagai konteks",
      "Operasi hitung campuran bilangan bulat sederhana",
      "Membaca soal cerita bertanda (naik-turun, untung-rugi)"
    ],
    "rumus": [
      "a - b = a + (-b)",
      "(+) + (+) = (+) ; (-) + (-) = (-)",
      "Tanda beda: kurangkan nilai mutlaknya, ambil tanda yang nilai mutlaknya lebih besar",
      "Selisih suhu = suhu akhir - suhu awal"
    ],
    "miskonsepsi": [
      "Mengira dua tanda minus berdampingan selalu berarti tambah tanpa memahami alasannya",
      "Menghitung -3 + 5 sebagai -8 (menjumlahkan angka lalu memasang tanda pertama)",
      "Menghapus tanda negatif saat menghitung lalu memasangnya kembali sembarangan"
    ],
    "kenapa": [
      "Kenapa mengurangi bilangan negatif sama dengan menambah bilangan positif?",
      "Kenapa 5 - 8 bisa dikerjakan, sedangkan di kelas rendah dikatakan tidak bisa?"
    ],
    "prasyarat": [
      "sd6-garis-bilangan-dan-bilangan-bulat",
      "sd4-penjumlahan-bilangan-cacah-sampai-1",
      "sd5-sifat-operasi-hitung-dan-operasi"
    ]
  },
  {
    "id": "sd6-pangkat-dua-pangkat-tiga-dan",
    "judul": "Pangkat Dua, Pangkat Tiga, dan Akarnya",
    "kelas": 6,
    "fase": "C",
    "domain": "bilangan",
    "ringkas": "Menghitung pangkat dua dan pangkat tiga bilangan cacah dan desimal sederhana",
    "subKonsep": [
      "Pangkat dua sebagai perkalian berulang dua kali dan sebagai luas persegi",
      "Pangkat tiga sebagai perkalian berulang tiga kali dan sebagai volume kubus",
      "Bilangan kuadrat sempurna dan bilangan kubik sempurna",
      "Akar pangkat dua sebagai operasi kebalikan pangkat dua",
      "Akar pangkat tiga sebagai operasi kebalikan pangkat tiga",
      "Mencari akar dengan faktorisasi prima",
      "Menaksir akar bilangan yang bukan kuadrat sempurna",
      "Pangkat dua dan tiga bilangan desimal satu angka di belakang koma"
    ],
    "rumus": [
      "a^2 = a x a ; a^3 = a x a x a",
      "akar(a^2) = a untuk a >= 0 ; akar pangkat tiga (a^3) = a",
      "akar(a x b) = akar(a) x akar(b)",
      "Luas persegi = s^2 ; Volume kubus = s^3"
    ],
    "miskonsepsi": [
      "Mengira 5^2 = 10 (mengalikan bilangan dengan pangkatnya)",
      "Mengira 2^3 = 6",
      "Mengira akar pangkat dua berarti dibagi dua"
    ],
    "kenapa": [
      "Kenapa 5 pangkat 2 adalah 25 dan bukan 10?",
      "Kenapa pangkat dua disebut kuadrat dan pangkat tiga disebut kubik?"
    ],
    "prasyarat": [
      "sd4-perkalian-bilangan-cacah-sampai-100",
      "sd4-kelipatan-dan-faktor-bilangan",
      "sd6-bilangan-desimal-nilai-tempat-membandingkan"
    ]
  },
  {
    "id": "sd6-pembagian-pecahan",
    "judul": "Pembagian Pecahan",
    "kelas": 6,
    "fase": "C",
    "domain": "bilangan",
    "ringkas": "Membagi pecahan dengan bilangan asli dan sebaliknya",
    "subKonsep": [
      "Pembagian pecahan dengan bilangan asli (1/2 : 3) sebagai membagi rata",
      "Pembagian bilangan asli dengan pecahan (3 : 1/2) sebagai berapa banyak setengahan dalam 3",
      "Pembagian pecahan dengan pecahan",
      "Kebalikan (invers perkalian) suatu pecahan",
      "Aturan membalik dan mengalikan serta alasannya",
      "Model garis bilangan dan model luasan untuk pembagian pecahan",
      "Pembagian pecahan campuran melalui pecahan tidak murni",
      "Soal cerita: membagi pita, membagi air ke gelas, banyak porsi"
    ],
    "rumus": [
      "a/b : c/d = a/b x d/c",
      "a/b : n = a/(b x n)",
      "n : a/b = (n x b)/a",
      "Kebalikan a/b adalah b/a (untuk a, b tidak nol)"
    ],
    "miskonsepsi": [
      "Membalik pecahan yang salah (membalik pecahan pertama, bukan pembagi)",
      "Membalik kedua pecahan sekaligus",
      "Mengira hasil pembagian selalu lebih kecil dari bilangan yang dibagi"
    ],
    "kenapa": [
      "Kenapa membagi dengan pecahan sama dengan mengalikan dengan kebalikannya?",
      "Kenapa 3 : 1/2 hasilnya 6, lebih besar dari 3, padahal ini pembagian?"
    ],
    "konsep": [
      "bagi-pecahan"
    ],
    "prasyarat": [
      "sd6-perkalian-pecahan-dengan-bilangan-asli",
      "sd4-pembagian-bilangan-cacah-sampai-100",
      "sd5-pecahan-campuran-dan-pecahan-tidak"
    ]
  },
  {
    "id": "sd6-penerapan-persen-dalam-kehidupan-sehari",
    "judul": "Penerapan Persen dalam Kehidupan Sehari-hari",
    "kelas": 6,
    "fase": "C",
    "domain": "bilangan",
    "ringkas": "Menghitung nilai persen dari suatu bilangan dalam konteks belanja dan data",
    "subKonsep": [
      "Menghitung persen dari suatu bilangan",
      "Menentukan bilangan asal jika persen dan hasilnya diketahui",
      "Menghitung berapa persen suatu bagian terhadap keseluruhan",
      "Diskon dan harga setelah diskon",
      "Untung dan rugi sederhana dalam persen",
      "Pajak sederhana (PPN) dan potongan harga bertingkat",
      "Persen dalam data (hasil survei, komposisi bahan, gizi kemasan)",
      "Kenaikan dan penurunan dalam persen"
    ],
    "rumus": [
      "Nilai persen = (p/100) x N",
      "Bagian terhadap keseluruhan: persen = (bagian/keseluruhan) x 100%",
      "Harga setelah diskon = harga awal x (100 - p)/100",
      "Persentase untung = (untung/harga beli) x 100%"
    ],
    "miskonsepsi": [
      "Mengira diskon 30% lalu 20% sama dengan diskon 50%",
      "Menghitung persen dari bilangan yang salah (persen untung dihitung dari harga jual, bukan harga beli)",
      "Mengira naik 10% lalu turun 10% kembali ke nilai semula"
    ],
    "kenapa": [
      "Kenapa naik 10% lalu turun 10% tidak kembali ke harga semula?",
      "Kenapa dua diskon berturut-turut tidak boleh langsung dijumlahkan?"
    ],
    "konsep": [
      "persen-dari"
    ],
    "prasyarat": [
      "sd6-hubungan-pecahan-desimal-dan-persen",
      "sd6-perkalian-pecahan-dengan-bilangan-asli",
      "sd5-menyelesaikan-masalah-yang-berkaitan-dengan"
    ]
  },
  {
    "id": "sd6-perkalian-pecahan-dengan-bilangan-asli",
    "judul": "Perkalian Pecahan dengan Bilangan Asli dan dengan Pecahan",
    "kelas": 6,
    "fase": "C",
    "domain": "bilangan",
    "ringkas": "Mengalikan pecahan dengan bilangan asli dan pecahan dengan pecahan",
    "subKonsep": [
      "Perkalian bilangan asli dengan pecahan sebagai penjumlahan berulang (3 x 1/4)",
      "Perkalian pecahan dengan bilangan asli sebagai \"sebagian dari\" (1/4 x 3)",
      "Makna kata \"dari\" pada pecahan (2/3 dari 12)",
      "Perkalian pecahan dengan pecahan sebagai luas persegi panjang bersisi pecahan",
      "Menyederhanakan sebelum mengalikan (coret silang)",
      "Perkalian pecahan campuran melalui pecahan tidak murni",
      "Pengaruh pengali terhadap besar hasil (dikali pecahan kurang dari 1 mengecilkan)",
      "Soal cerita: resep, potongan kain, bagian dari kelompok"
    ],
    "rumus": [
      "a/b x c/d = (a x c)/(b x d)",
      "n x a/b = (n x a)/b",
      "a b/c x d = ((a x c + b)/c) x d",
      "Luas model: (a/b) x (c/d) sebagai luas persegi panjang p = a/b, l = c/d"
    ],
    "miskonsepsi": [
      "Mengira perkalian selalu memperbesar hasil sehingga bingung 1/2 x 8 = 4",
      "Menyamakan penyebut dulu sebelum mengalikan (mencampur aturan penjumlahan)",
      "Mengalikan pecahan campuran dengan mengalikan bagian bulat dan bagian pecahan secara terpisah (2 1/2 x 3 = 6 1/2)"
    ],
    "kenapa": [
      "Kenapa mengalikan dengan pecahan kurang dari 1 justru membuat hasilnya lebih kecil?",
      "Kenapa perkalian pecahan cukup mengalikan pembilang dengan pembilang, tanpa menyamakan penyebut?"
    ],
    "prasyarat": [
      "sd4-pecahan-senilai",
      "sd5-pecahan-campuran-dan-pecahan-tidak",
      "sd4-perkalian-bilangan-cacah-sampai-100",
      "sd5-penjumlahan-dan-pengurangan-pecahan"
    ]
  },
  {
    "id": "sd6-diagram-garis-dan-diagram-lingkaran",
    "judul": "Diagram Garis dan Diagram Lingkaran",
    "kelas": 6,
    "fase": "C",
    "domain": "data",
    "ringkas": "Membaca dan menafsirkan diagram garis dan diagram lingkaran",
    "subKonsep": [
      "Diagram garis untuk data yang berubah menurut waktu",
      "Membaca kecenderungan naik, turun, dan tetap pada diagram garis",
      "Titik data dan garis penghubung sebagai perkiraan antar-waktu",
      "Diagram lingkaran untuk menunjukkan bagian terhadap keseluruhan",
      "Menghitung besar sudut juring dari persentase atau pecahan",
      "Menghitung nilai suatu bagian dari besar sudut atau persennya",
      "Membuat diagram lingkaran dengan busur derajat",
      "Memilih jenis diagram yang sesuai dengan jenis data dan tujuan"
    ],
    "rumus": [
      "Sudut juring = (bagian : keseluruhan) x 360 derajat",
      "Persen bagian = (bagian : keseluruhan) x 100%",
      "Nilai bagian = (sudut juring : 360) x jumlah keseluruhan",
      "Nilai bagian = persen bagian x jumlah keseluruhan"
    ],
    "miskonsepsi": [
      "Menggunakan diagram lingkaran untuk data yang bukan bagian dari satu keseluruhan",
      "Mengira jumlah semua sudut juring boleh tidak 360 derajat",
      "Membandingkan dua diagram lingkaran dari dua kelompok berbeda ukuran seolah-olah setara"
    ],
    "kenapa": [
      "Kenapa diagram lingkaran memakai 360 derajat untuk mewakili seluruh data?",
      "Kenapa dua diagram lingkaran dengan juring 50% bisa mewakili jumlah orang yang sangat berbeda?"
    ],
    "prasyarat": [
      "sd5-piktogram-dan-diagram-batang-berskala",
      "sd6-hubungan-pecahan-desimal-dan-persen",
      "sd5-sudut-dan-pengukurannya-dengan-busur",
      "sd6-penerapan-persen-dalam-kehidupan-sehari"
    ]
  },
  {
    "id": "sd6-kemungkinan-dan-skala-peluang",
    "judul": "Kemungkinan dan Skala Peluang",
    "kelas": 6,
    "fase": "C",
    "domain": "data",
    "ringkas": "Menggolongkan kejadian sebagai pasti, mungkin, atau mustahil",
    "subKonsep": [
      "Kejadian pasti, mungkin, dan mustahil",
      "Skala peluang dari 0 (mustahil) sampai 1 (pasti)",
      "Menempatkan kejadian pada skala peluang (mustahil, kecil kemungkinannya, sama kemungkinannya, besar kemungkinannya, pasti)",
      "Percobaan acak (melempar dadu, melempar koin, mengambil kelereng)",
      "Ruang sampel: semua hasil yang mungkin",
      "Kejadian sebagai bagian dari ruang sampel",
      "Hasil yang berpeluang sama (equally likely)",
      "Peluang sebagai pecahan, desimal, dan persen"
    ],
    "rumus": [
      "P(kejadian) = banyak hasil yang diharapkan : banyak seluruh hasil yang mungkin",
      "0 <= P(kejadian) <= 1",
      "P(mustahil) = 0 ; P(pasti) = 1",
      "Frekuensi relatif = banyak kejadian muncul : banyak percobaan"
    ],
    "miskonsepsi": [
      "Mengira peluang bisa lebih dari 1 atau bernilai negatif",
      "Mengira semua hasil dalam percobaan selalu berpeluang sama (misal jumlah dua dadu)",
      "Mengira setelah muncul angka lima kali berturut-turut, gambar \"pasti giliran\" muncul (gambler's fallacy)"
    ],
    "kenapa": [
      "Kenapa peluang tidak pernah bisa lebih dari 1?",
      "Kenapa setelah koin muncul angka lima kali berturut-turut, peluang lemparan berikutnya tetap 1/2?"
    ],
    "prasyarat": [
      "sd6-hubungan-pecahan-desimal-dan-persen",
      "sd4-pecahan-senilai",
      "sd5-mengumpulkan-data-dan-menyajikannya-dalam"
    ]
  },
  {
    "id": "sd6-mean-median-dan-modus-data",
    "judul": "Mean, Median, dan Modus Data Tunggal",
    "kelas": 6,
    "fase": "C",
    "domain": "data",
    "ringkas": "Menentukan modus, median, dan mean dari sekumpulan data tunggal",
    "subKonsep": [
      "Modus sebagai nilai yang paling sering muncul",
      "Data tanpa modus dan data bermodus lebih dari satu",
      "Median sebagai nilai tengah setelah data diurutkan",
      "Median untuk banyak data ganjil dan genap",
      "Mean (rata-rata) sebagai jumlah data dibagi banyak data",
      "Mean sebagai titik keseimbangan (model timbangan)",
      "Mean dari tabel frekuensi",
      "Pengaruh data pencilan (nilai ekstrem) terhadap mean dan median"
    ],
    "rumus": [
      "Mean = jumlah semua data : banyak data",
      "Jumlah semua data = mean x banyak data",
      "Median (n ganjil) = data ke-((n + 1)/2) setelah diurutkan",
      "Median (n genap) = rata-rata data ke-(n/2) dan ke-(n/2 + 1)",
      "Mean dari tabel frekuensi = jumlah (nilai x frekuensi) : jumlah frekuensi"
    ],
    "miskonsepsi": [
      "Mencari median tanpa mengurutkan data terlebih dahulu",
      "Mengira median adalah data yang berada di tengah daftar asli",
      "Mengira modus adalah frekuensi terbesar, bukan nilai yang berfrekuensi terbesar"
    ],
    "kenapa": [
      "Kenapa median harus dicari setelah data diurutkan?",
      "Kenapa satu nilai yang sangat besar bisa menarik mean jauh, tetapi hampir tidak menggeser median?"
    ],
    "prasyarat": [
      "sd5-mengumpulkan-data-dan-menyajikannya-dalam",
      "sd5-piktogram-dan-diagram-batang-berskala",
      "sd4-pembagian-bilangan-cacah-sampai-100",
      "sd6-bilangan-desimal-nilai-tempat-membandingkan"
    ]
  },
  {
    "id": "sd6-membandingkan-peluang-kejadian-dalam-percobaan",
    "judul": "Membandingkan Peluang Kejadian dalam Percobaan Acak",
    "kelas": 6,
    "fase": "C",
    "domain": "data",
    "ringkas": "Membandingkan peluang dua kejadian dan menjelaskan alasannya",
    "subKonsep": [
      "Membandingkan dua kejadian: mana yang lebih besar atau lebih kecil kemungkinannya",
      "Membandingkan peluang tanpa menghitung angka (penalaran kualitatif)",
      "Kantong kelereng dengan komposisi warna berbeda",
      "Roda putar (spinner) dengan juring tidak sama besar",
      "Pengaruh banyaknya hasil yang menguntungkan terhadap peluang",
      "Pengaruh besar total ruang sampel terhadap peluang",
      "Membandingkan peluang dengan menyamakan penyebut",
      "Merancang percobaan agar suatu kejadian lebih mungkin terjadi"
    ],
    "rumus": [
      "Bandingkan P(A) dan P(B) dengan menyamakan penyebutnya",
      "Pada roda putar, P(warna) = besar sudut juring warna itu : 360 derajat",
      "Permainan adil jika semua pemain memiliki peluang menang yang sama"
    ],
    "miskonsepsi": [
      "Mengira kantong dengan lebih banyak kelereng merah selalu memberi peluang merah lebih besar tanpa melihat totalnya",
      "Membandingkan peluang hanya dari banyak hasil yang menguntungkan (pembilang saja)",
      "Mengira roda putar dengan banyak juring warna tertentu pasti berpeluang besar meski juringnya kecil"
    ],
    "kenapa": [
      "Kenapa kantong berisi 3 merah dari 5 kelereng memberi peluang lebih besar daripada 4 merah dari 10 kelereng?",
      "Kenapa membandingkan peluang tidak cukup melihat pembilangnya saja?"
    ],
    "prasyarat": [
      "sd6-kemungkinan-dan-skala-peluang",
      "sd4-membandingkan-dan-mengurutkan-pecahan-berpenyebut",
      "sd6-konsep-rasio-dan-perbandingan",
      "sd6-diagram-garis-dan-diagram-lingkaran"
    ]
  },
  {
    "id": "sd6-jaring-jaring-kubus-dan-balok",
    "judul": "Jaring-jaring Kubus dan Balok",
    "kelas": 6,
    "fase": "C",
    "domain": "geometri",
    "ringkas": "Menentukan apakah suatu rangkaian persegi merupakan jaring-jaring kubus",
    "subKonsep": [
      "Jaring-jaring sebagai bangun datar hasil membuka bangun ruang",
      "11 jaring-jaring kubus yang berbeda",
      "Ciri jaring-jaring kubus yang sah (tidak ada sisi bertumpuk saat dilipat)",
      "Jaring-jaring balok dan variasinya",
      "Menentukan sisi yang berhadapan pada jaring-jaring",
      "Memasangkan titik atau gambar pada jaring-jaring dengan posisinya setelah dilipat",
      "Membuat bangun ruang dari jaring-jaringnya",
      "Hubungan jaring-jaring dengan luas permukaan"
    ],
    "rumus": [
      "Jaring-jaring kubus terdiri atas 6 persegi kongruen",
      "Kubus memiliki 11 jaring-jaring berbeda",
      "Pada jaring-jaring kubus pola 1-4-1, sisi yang terpisah dua kotak saling berhadapan",
      "Luas jaring-jaring = luas permukaan bangun ruang"
    ],
    "miskonsepsi": [
      "Mengira setiap rangkaian 6 persegi pasti jaring-jaring kubus",
      "Mengira kubus hanya punya satu jaring-jaring (bentuk salib)",
      "Menentukan sisi berhadapan sebagai sisi yang bersebelahan pada gambar datar"
    ],
    "kenapa": [
      "Kenapa hanya ada 11 jaring-jaring kubus, tidak lebih dan tidak kurang?",
      "Kenapa ada rangkaian 6 persegi yang tidak bisa dilipat menjadi kubus?"
    ],
    "prasyarat": [
      "sd6-unsur-kubus-dan-balok",
      "sd5-ciri-ciri-dan-klasifikasi-bangun",
      "sd5-luas-persegi-persegi-panjang-dan"
    ]
  },
  {
    "id": "sd6-menentukan-lokasi-pada-sistem-berpetak",
    "judul": "Menentukan Lokasi pada Sistem Berpetak (Menuju Koordinat)",
    "kelas": 6,
    "fase": "C",
    "domain": "geometri",
    "ringkas": "Membaca dan menuliskan lokasi objek pada peta bersistem berpetak",
    "subKonsep": [
      "Sistem berpetak (grid) pada peta dan denah",
      "Penamaan kolom dengan huruf dan baris dengan angka (contoh: petak C3)",
      "Sumbu mendatar (x) dan sumbu tegak (y) yang saling tegak lurus",
      "Titik asal (0,0) dan pasangan bilangan terurut (x, y)",
      "Membaca dan menuliskan koordinat suatu titik",
      "Menggambar titik dan bangun datar sederhana pada bidang berpetak kuadran pertama",
      "Menentukan jarak mendatar dan tegak antara dua titik dengan menghitung petak",
      "Membaca peta berpetak (denah sekolah, kebun binatang, mal)"
    ],
    "rumus": [
      "Titik ditulis sebagai pasangan terurut (x, y): x dibaca dahulu (mendatar), lalu y (tegak)",
      "Titik asal O(0, 0)",
      "Jarak mendatar antara (x1, y) dan (x2, y) = selisih x",
      "Jarak tegak antara (x, y1) dan (x, y2) = selisih y"
    ],
    "miskonsepsi": [
      "Membaca koordinat terbalik: menyebut y dahulu baru x",
      "Menghitung dari kotak pertama sebagai 1, bukan dari titik asal 0",
      "Mengira (3, 5) sama dengan (5, 3)"
    ],
    "kenapa": [
      "Kenapa koordinat selalu dibaca mendatar dulu baru tegak, siapa yang menyepakati?",
      "Kenapa (3, 5) dan (5, 3) menunjuk tempat yang berbeda?"
    ],
    "prasyarat": [
      "sd1-posisi-dan-arah-benda",
      "sd5-ciri-ciri-dan-klasifikasi-bangun",
      "sd5-membandingkan-dan-mengurutkan-bilangan-cacah"
    ]
  },
  {
    "id": "sd6-mengenal-prisma-tabung-limas-kerucut",
    "judul": "Mengenal Prisma, Tabung, Limas, Kerucut, dan Bola",
    "kelas": 6,
    "fase": "C",
    "domain": "geometri",
    "ringkas": "Menyebutkan ciri dan unsur prisma, limas, tabung, kerucut, dan bola",
    "subKonsep": [
      "Bangun ruang sisi datar: prisma dan limas",
      "Bangun ruang sisi lengkung: tabung, kerucut, bola",
      "Bentuk alas menentukan nama prisma dan limas",
      "Unsur: sisi, rusuk, titik sudut, titik puncak, selimut",
      "Tabung sebagai prisma dengan alas lingkaran (pengenalan)",
      "Kerucut sebagai limas dengan alas lingkaran (pengenalan)",
      "Bola yang tidak memiliki rusuk maupun titik sudut",
      "Jaring-jaring tabung, kerucut, prisma, dan limas (pengenalan)"
    ],
    "rumus": [
      "Prisma segi-n: 3n rusuk, 2n titik sudut, n + 2 sisi",
      "Limas segi-n: 2n rusuk, n + 1 titik sudut, n + 1 sisi",
      "Tabung: 3 sisi (2 lingkaran + 1 selimut), 2 rusuk lengkung, 0 titik sudut",
      "Kerucut: 2 sisi, 1 rusuk lengkung, 1 titik puncak",
      "Bola: 1 sisi lengkung, 0 rusuk, 0 titik sudut"
    ],
    "miskonsepsi": [
      "Menyebut tabung sebagai \"lingkaran\" dan kerucut sebagai \"segitiga\"",
      "Mengira tabung memiliki titik sudut",
      "Mengira bola memiliki satu titik sudut di pusatnya"
    ],
    "kenapa": [
      "Kenapa selimut tabung kalau dibuka berbentuk persegi panjang, dan kenapa panjangnya sama dengan keliling alas?",
      "Kenapa bola tidak memiliki rusuk dan titik sudut?"
    ],
    "prasyarat": [
      "sd6-unsur-kubus-dan-balok",
      "sd5-ciri-ciri-dan-klasifikasi-bangun",
      "sd6-jaring-jaring-kubus-dan-balok"
    ]
  },
  {
    "id": "sd6-mengonstruksi-dan-mengurai-bangun-ruang",
    "judul": "Mengonstruksi dan Mengurai Bangun Ruang dengan Kubus Satuan",
    "kelas": 6,
    "fase": "C",
    "domain": "geometri",
    "ringkas": "Menghitung banyak kubus satuan penyusun suatu bangun termasuk yang tidak terlihat",
    "subKonsep": [
      "Menyusun kubus satuan menjadi balok dan bangun gabungan",
      "Mengurai bangun ruang menjadi kubus satuan",
      "Menghitung banyak kubus satuan penyusun bangun (termasuk yang tersembunyi)",
      "Berbagai balok berbeda yang tersusun dari kubus satuan yang sama banyak",
      "Bangun gabungan dari kubus dan balok",
      "Menggambar bangun ruang pada kertas berpetak isometrik",
      "Menambah dan mengurangi kubus untuk mencapai bentuk sasaran",
      "Hubungan susunan lapisan dengan luas alas dan tinggi"
    ],
    "rumus": [
      "Banyak kubus satuan = banyak kubus per lapis x banyak lapis",
      "Banyak kubus per lapis = panjang x lebar (dalam kubus satuan)",
      "Volume (kubus satuan) = p x l x t"
    ],
    "miskonsepsi": [
      "Menghitung hanya kubus yang terlihat pada gambar dan melupakan yang tersembunyi",
      "Menghitung permukaan (jumlah kotak yang terlihat) alih-alih isi",
      "Mengira dua bangun dengan jumlah kubus sama pasti bentuknya sama"
    ],
    "kenapa": [
      "Kenapa kubus yang tersembunyi tetap harus dihitung padahal tidak terlihat?",
      "Kenapa 24 kubus satuan bisa disusun menjadi banyak balok yang berbeda-beda bentuknya?"
    ],
    "prasyarat": [
      "sd6-unsur-kubus-dan-balok",
      "sd4-perkalian-bilangan-cacah-sampai-100",
      "sd1-mengukur-panjang-dengan-satuan-tidak"
    ]
  },
  {
    "id": "sd6-unsur-kubus-dan-balok",
    "judul": "Unsur Kubus dan Balok",
    "kelas": 6,
    "fase": "C",
    "domain": "geometri",
    "ringkas": "Menyebutkan dan menunjukkan sisi, rusuk, dan titik sudut kubus dan balok",
    "subKonsep": [
      "Sisi (bidang), rusuk, dan titik sudut",
      "Kubus: 6 sisi persegi kongruen, 12 rusuk sama panjang, 8 titik sudut",
      "Balok: 6 sisi persegi panjang (3 pasang kongruen), 12 rusuk, 8 titik sudut",
      "Rusuk sejajar, rusuk berpotongan, dan rusuk bersilangan",
      "Diagonal sisi (bidang) dan diagonal ruang",
      "Bidang diagonal",
      "Total panjang rusuk (kerangka kawat)",
      "Membandingkan karakteristik kubus dan balok"
    ],
    "rumus": [
      "Total panjang rusuk kubus = 12 x s",
      "Total panjang rusuk balok = 4 x (p + l + t)",
      "Banyak diagonal sisi kubus/balok = 12",
      "Banyak diagonal ruang kubus/balok = 4",
      "Rumus Euler: sisi + titik sudut - rusuk = 2"
    ],
    "miskonsepsi": [
      "Menyebut \"sisi\" untuk rusuk (menghitung kubus punya 12 sisi)",
      "Mengira kubus bukan balok",
      "Menghitung hanya rusuk yang terlihat pada gambar (9 rusuk)"
    ],
    "kenapa": [
      "Kenapa kubus bisa disebut balok khusus?",
      "Kenapa gambar kubus di buku digambar miring dengan garis putus-putus?"
    ],
    "prasyarat": [
      "sd5-ciri-ciri-dan-klasifikasi-bangun",
      "sd2-mengenal-bangun-ruang-balok-kubus"
    ]
  },
  {
    "id": "sd6-visualisasi-spasial-tampak-depan-atas",
    "judul": "Visualisasi Spasial: Tampak Depan, Atas, dan Samping",
    "kelas": 6,
    "fase": "C",
    "domain": "geometri",
    "ringkas": "Menggambar tampak depan, atas, dan samping dari susunan kubus",
    "subKonsep": [
      "Pandangan (tampak) depan, atas, samping kanan, dan samping kiri",
      "Menggambar tampak dari susunan kubus satuan",
      "Menyusun kembali bangun dari tiga pandangannya",
      "Bangun berbeda yang memiliki tampak depan sama",
      "Denah sebagai tampak atas bangunan",
      "Perputaran mental (mental rotation) bangun ruang",
      "Bayangan dan proyeksi sederhana",
      "Membaca gambar teknik sederhana"
    ],
    "rumus": [
      "Tampak atas menunjukkan panjang dan lebar",
      "Tampak depan menunjukkan panjang dan tinggi",
      "Tampak samping menunjukkan lebar dan tinggi"
    ],
    "miskonsepsi": [
      "Menggambar tampak dengan perspektif (miring) alih-alih pandangan datar",
      "Mengira satu pandangan sudah cukup menentukan bentuk bangun secara tunggal",
      "Tertukar tampak samping kanan dan kiri"
    ],
    "kenapa": [
      "Kenapa satu gambar tampak depan bisa berasal dari banyak bangun berbeda?",
      "Kenapa insinyur dan arsitek memerlukan tiga pandangan, bukan satu gambar tiga dimensi saja?"
    ],
    "prasyarat": [
      "sd6-mengonstruksi-dan-mengurai-bangun-ruang",
      "sd6-unsur-kubus-dan-balok",
      "sd1-posisi-dan-arah-benda"
    ]
  },
  {
    "id": "sd6-keliling-dan-luas-lingkaran",
    "judul": "Keliling dan Luas Lingkaran",
    "kelas": 6,
    "fase": "C",
    "domain": "pengukuran",
    "ringkas": "Mengidentifikasi dan menamai unsur-unsur lingkaran",
    "subKonsep": [
      "Unsur lingkaran: titik pusat, jari-jari, diameter, busur, tali busur, tembereng, juring",
      "Hubungan diameter dan jari-jari",
      "Pi sebagai perbandingan keliling terhadap diameter yang selalu tetap",
      "Nilai pendekatan pi (22/7 dan 3,14) dan kapan memilih masing-masing",
      "Keliling lingkaran dan penerapannya (roda berputar)",
      "Luas lingkaran melalui potongan juring yang disusun menyerupai jajargenjang",
      "Menghitung jari-jari atau diameter jika keliling atau luas diketahui",
      "Keliling dan luas setengah lingkaran serta seperempat lingkaran"
    ],
    "rumus": [
      "d = 2 x r",
      "K = pi x d = 2 x pi x r",
      "L = pi x r^2",
      "pi kira-kira 22/7 atau 3,14",
      "Panjang lintasan roda = K x banyak putaran"
    ],
    "miskonsepsi": [
      "Menggunakan diameter pada rumus luas (L = pi x d^2)",
      "Tertukar rumus keliling dan luas lingkaran",
      "Menganggap pi sama dengan 22/7 secara tepat, bukan pendekatan"
    ],
    "kenapa": [
      "Kenapa keliling dibagi diameter selalu menghasilkan bilangan yang sama untuk semua lingkaran?",
      "Kenapa luas lingkaran pi x r kuadrat, bagaimana potongan juring membuktikannya?"
    ],
    "konsep": [
      "pi-dari-mana",
      "lingkaran-luas"
    ],
    "prasyarat": [
      "sd5-keliling-bangun-datar",
      "sd6-pangkat-dua-pangkat-tiga-dan",
      "sd6-perkalian-pecahan-dengan-bilangan-asli",
      "sd5-satuan-baku-dan-konversi-satuan"
    ]
  },
  {
    "id": "sd6-luas-permukaan-kubus-dan-balok",
    "judul": "Luas Permukaan Kubus dan Balok",
    "kelas": 6,
    "fase": "C",
    "domain": "pengukuran",
    "ringkas": "Menghitung luas permukaan kubus dan balok",
    "subKonsep": [
      "Luas permukaan sebagai jumlah luas semua sisi",
      "Menghitung luas permukaan lewat jaring-jaring",
      "Kubus memiliki 6 sisi persegi yang kongruen",
      "Balok memiliki 3 pasang sisi persegi panjang yang kongruen",
      "Luas permukaan bangun gabungan (sisi yang menempel tidak dihitung)",
      "Luas permukaan tanpa tutup (bak terbuka)",
      "Menentukan rusuk jika luas permukaan diketahui",
      "Penerapan: kebutuhan kertas kado, cat, kaca akuarium"
    ],
    "rumus": [
      "L permukaan kubus = 6 x s^2",
      "L permukaan balok = 2 x (p x l + p x t + l x t)",
      "L permukaan balok tanpa tutup = 2 x (p x t + l x t) + p x l",
      "s = akar dari (L permukaan : 6)"
    ],
    "miskonsepsi": [
      "Tertukar rumus volume dan luas permukaan",
      "Menghitung 6 x s (bukan 6 x s kuadrat) untuk kubus",
      "Menghitung hanya 4 sisi balok, melupakan alas dan tutup"
    ],
    "kenapa": [
      "Kenapa luas permukaan balok memakai tiga pasang perkalian sisi?",
      "Kenapa dua balok dengan volume sama bisa memerlukan kertas pembungkus yang berbeda banyaknya?"
    ],
    "prasyarat": [
      "sd6-jaring-jaring-kubus-dan-balok",
      "sd5-luas-persegi-persegi-panjang-dan",
      "sd6-volume-kubus-dan-balok",
      "sd6-pangkat-dua-pangkat-tiga-dan"
    ]
  },
  {
    "id": "sd6-volume-kubus-dan-balok",
    "judul": "Volume Kubus dan Balok",
    "kelas": 6,
    "fase": "C",
    "domain": "pengukuran",
    "ringkas": "Menghitung volume kubus dan balok dari ukuran rusuknya",
    "subKonsep": [
      "Volume sebagai banyaknya kubus satuan yang mengisi ruang",
      "Menghitung volume dengan menyusun kubus satuan berlapis",
      "Menurunkan rumus volume dari luas alas dikali tinggi",
      "Volume kubus dan hubungannya dengan pangkat tiga",
      "Satuan volume (cm3, dm3, m3) dan hubungannya dengan liter",
      "Volume bangun ruang gabungan kubus dan balok",
      "Mencari rusuk, panjang, lebar, atau tinggi jika volume diketahui",
      "Kapasitas wadah dan volume zat cair"
    ],
    "rumus": [
      "V kubus = s x s x s = s^3",
      "V balok = p x l x t",
      "V = luas alas x tinggi",
      "s = akar pangkat tiga dari V",
      "1 dm3 = 1 liter ; 1 cm3 = 1 ml ; 1 m3 = 1.000 liter"
    ],
    "miskonsepsi": [
      "Menjumlahkan p, l, t alih-alih mengalikannya",
      "Tertukar volume dengan luas permukaan",
      "Mengira 1 m3 = 100 cm3 atau 1.000 cm3"
    ],
    "kenapa": [
      "Kenapa volume balok adalah p x l x t, bukan p + l + t?",
      "Kenapa jika semua rusuk kubus digandakan, volumenya menjadi delapan kali lipat?"
    ],
    "prasyarat": [
      "sd6-pangkat-dua-pangkat-tiga-dan",
      "sd5-satuan-baku-dan-konversi-satuan",
      "sd6-unsur-kubus-dan-balok",
      "sd4-perkalian-bilangan-cacah-sampai-100"
    ]
  },
  {
    "id": "smp7-bentuk-aljabar-dan-unsur-unsurnya",
    "judul": "Bentuk Aljabar dan Unsur-unsurnya",
    "kelas": 7,
    "fase": "D",
    "domain": "aljabar",
    "ringkas": "Mengidentifikasi variabel, koefisien, konstanta, dan banyak suku",
    "subKonsep": [
      "Variabel sebagai lambang bilangan yang belum diketahui atau berubah-ubah",
      "Koefisien, konstanta, dan suku",
      "Suku sejenis dan suku tidak sejenis",
      "Menerjemahkan kalimat sehari-hari menjadi bentuk aljabar",
      "Menentukan nilai bentuk aljabar dengan substitusi",
      "Model visual: batang aljabar (algebra tiles) untuk x dan 1"
    ],
    "rumus": [
      "Bentuk umum suku: koefisien x variabel berpangkat",
      "Suku sejenis memiliki variabel dan pangkat yang sama persis",
      "Nilai bentuk aljabar diperoleh dengan mengganti variabel dengan bilangan"
    ],
    "miskonsepsi": [
      "Mengira 3x berarti 'tiga puluh sesuatu' atau angka 3 diikuti huruf x",
      "Menganggap x selalu bernilai sama di semua soal",
      "Menjumlahkan suku tidak sejenis: 3x + 2y dikira 5xy"
    ],
    "kenapa": [
      "Kenapa matematika perlu memakai huruf, bukan angka saja?",
      "Kenapa 3x + 2y tidak bisa disederhanakan lebih jauh?"
    ],
    "prasyarat": [
      "smp7-operasi-hitung-bilangan-bulat",
      "smp7-operasi-bilangan-rasional"
    ]
  },
  {
    "id": "smp7-operasi-penjumlahan-dan-pengurangan-bentuk",
    "judul": "Operasi Penjumlahan dan Pengurangan Bentuk Aljabar",
    "kelas": 7,
    "fase": "D",
    "domain": "aljabar",
    "ringkas": "Menyederhanakan penjumlahan dan pengurangan bentuk aljabar",
    "subKonsep": [
      "Menjumlahkan bentuk aljabar dengan mengumpulkan suku sejenis",
      "Mengurangkan bentuk aljabar dan pengaruh tanda kurung",
      "Sifat distributif untuk membuka kurung bertanda negatif",
      "Menyederhanakan bentuk aljabar bersuku banyak",
      "Bentuk aljabar ekuivalen dan cara memeriksanya dengan substitusi",
      "Model visual penggabungan batang aljabar sejenis"
    ],
    "rumus": [
      "ax + bx = (a + b)x",
      "-(a + b) = -a - b",
      "a(b + c) = ab + ac"
    ],
    "miskonsepsi": [
      "Lupa membagikan tanda minus ke semua suku dalam kurung",
      "Menggabungkan suku tidak sejenis menjadi satu suku",
      "Mengira 5 - (2x + 3) = 5 - 2x + 3"
    ],
    "kenapa": [
      "Kenapa tanda minus di depan kurung mengubah tanda semua suku di dalamnya?",
      "Kenapa 3x + 4x boleh dijumlahkan tapi 3x + 4y tidak?"
    ],
    "prasyarat": [
      "smp7-bentuk-aljabar-dan-unsur-unsurnya",
      "smp7-operasi-hitung-bilangan-bulat"
    ]
  },
  {
    "id": "smp7-persamaan-linear-satu-variabel",
    "judul": "Persamaan Linear Satu Variabel",
    "kelas": 7,
    "fase": "D",
    "domain": "aljabar",
    "ringkas": "Menyelesaikan PLSV dengan variabel di satu atau kedua ruas",
    "subKonsep": [
      "Kalimat terbuka, kalimat tertutup, dan pernyataan",
      "Persamaan sebagai neraca yang setimbang",
      "Penyelesaian sebagai nilai yang membuat persamaan benar",
      "Operasi yang menjaga kesetaraan (tambah, kurang, kali, bagi kedua ruas)",
      "Persamaan ekuivalen dan langkah penyelesaian bertahap",
      "Memodelkan soal cerita menjadi PLSV dan menafsirkan solusinya"
    ],
    "rumus": [
      "Bentuk umum: ax + b = c dengan a tidak nol",
      "Jika a = b maka a + c = b + c dan a x c = b x c (c tidak nol)",
      "Penyelesaian: x = (c - b) / a"
    ],
    "miskonsepsi": [
      "Memindahkan ruas tanpa mengubah tanda operasi",
      "Mengalikan hanya sebagian suku saat menghilangkan penyebut",
      "Mengira tanda sama dengan berarti 'hasilnya adalah', bukan 'setara dengan'"
    ],
    "kenapa": [
      "Kenapa kalau pindah ruas, tandanya berubah?",
      "Kenapa boleh melakukan operasi yang sama pada kedua ruas?"
    ],
    "konsep": [
      "timbangan-persamaan"
    ],
    "prasyarat": [
      "smp7-operasi-penjumlahan-dan-pengurangan-bentuk",
      "smp7-operasi-hitung-bilangan-bulat"
    ]
  },
  {
    "id": "smp7-pertidaksamaan-linear-satu-variabel",
    "judul": "Pertidaksamaan Linear Satu Variabel",
    "kelas": 7,
    "fase": "D",
    "domain": "aljabar",
    "ringkas": "Menyelesaikan PtLSV dan menuliskan himpunan penyelesaiannya",
    "subKonsep": [
      "Tanda pertidaksamaan: kurang dari, lebih dari, dan yang menyertakan sama dengan",
      "Penyelesaian pertidaksamaan sebagai daerah, bukan satu titik",
      "Sifat pertidaksamaan pada penjumlahan dan pengurangan",
      "Perubahan arah tanda saat dikali atau dibagi bilangan negatif",
      "Menyajikan penyelesaian pada garis bilangan dan notasi himpunan",
      "Memodelkan batasan nyata (anggaran, kapasitas, syarat minimum)"
    ],
    "rumus": [
      "Jika a < b maka a + c < b + c",
      "Jika a < b dan c > 0 maka ac < bc",
      "Jika a < b dan c < 0 maka ac > bc (tanda berbalik)"
    ],
    "miskonsepsi": [
      "Lupa membalik tanda pertidaksamaan saat dibagi bilangan negatif",
      "Mengira penyelesaian pertidaksamaan berupa satu nilai saja",
      "Tertukar titik terbuka dan tertutup pada garis bilangan"
    ],
    "kenapa": [
      "Kenapa tanda pertidaksamaan berbalik kalau dikali bilangan negatif?",
      "Kenapa penyelesaian pertidaksamaan berupa daerah, bukan satu titik?"
    ],
    "prasyarat": [
      "smp7-persamaan-linear-satu-variabel",
      "sd6-garis-bilangan-dan-bilangan-bulat"
    ]
  },
  {
    "id": "smp7-aritmetika-sosial-untung-rugi-dan",
    "judul": "Aritmetika Sosial: Untung, Rugi, dan Diskon",
    "kelas": 7,
    "fase": "D",
    "domain": "bilangan",
    "ringkas": "Menghitung untung, rugi, dan persentasenya",
    "subKonsep": [
      "Harga beli, harga jual, dan modal",
      "Untung dan rugi sebagai selisih harga jual dan harga beli",
      "Persentase untung dan rugi selalu dihitung terhadap harga beli",
      "Diskon sebagai potongan terhadap harga sebelum potongan",
      "Diskon bertingkat dan mengapa tidak boleh dijumlahkan",
      "Menentukan harga awal dari harga setelah diskon"
    ],
    "rumus": [
      "Untung = harga jual - harga beli (jika positif)",
      "Persentase untung = (untung / harga beli) x 100%",
      "Harga setelah diskon = harga awal x (100% - persen diskon)",
      "Harga awal = harga setelah diskon / (100% - persen diskon)"
    ],
    "miskonsepsi": [
      "Menghitung persentase untung terhadap harga jual, bukan harga beli",
      "Menjumlahkan diskon bertingkat 30% + 20% menjadi 50%",
      "Menghitung harga awal dengan menambahkan persen diskon ke harga akhir"
    ],
    "kenapa": [
      "Kenapa diskon 30% lalu 20% tidak sama dengan diskon 50%?",
      "Kenapa persentase untung dihitung dari harga beli, bukan harga jual?"
    ],
    "prasyarat": [
      "smp7-bilangan-desimal-persen-dan-estimasi",
      "sd6-konsep-rasio-dan-perbandingan"
    ]
  },
  {
    "id": "smp7-bilangan-bulat-dan-garis-bilangan",
    "judul": "Bilangan Bulat dan Garis Bilangan",
    "kelas": 7,
    "fase": "D",
    "domain": "bilangan",
    "ringkas": "Menempatkan dan membaca bilangan bulat pada garis bilangan",
    "subKonsep": [
      "Bilangan positif, bilangan negatif, dan nol sebagai satu sistem",
      "Garis bilangan sebagai representasi urutan dan arah",
      "Lawan (invers penjumlahan) suatu bilangan",
      "Nilai mutlak sebagai jarak dari nol, bukan sekadar 'buang tanda minus'",
      "Membandingkan dan mengurutkan bilangan bulat",
      "Konteks nyata bilangan negatif: suhu, kedalaman laut, utang, lantai basement"
    ],
    "rumus": [
      "Lawan dari a adalah -a, dengan a + (-a) = 0",
      "|a| = a jika a >= 0; |a| = -a jika a < 0",
      "a < b jika a terletak di kiri b pada garis bilangan"
    ],
    "miskonsepsi": [
      "Menganggap -8 lebih besar dari -3 karena 8 lebih besar dari 3",
      "Membaca tanda minus selalu sebagai operasi pengurangan, bukan sebagai tanda bilangan",
      "Mengira nilai mutlak berarti 'menghapus tanda minus' tanpa memahami maknanya sebagai jarak"
    ],
    "kenapa": [
      "Kenapa -8 lebih kecil dari -3, padahal 8 lebih besar dari 3?",
      "Kenapa nilai mutlak tidak pernah negatif?"
    ],
    "prasyarat": [
      "sd4-nilai-tempat-bilangan-cacah-sampai",
      "sd4-membandingkan-dan-mengurutkan-bilangan-cacah"
    ]
  },
  {
    "id": "smp7-bilangan-desimal-persen-dan-estimasi",
    "judul": "Bilangan Desimal, Persen, dan Estimasi",
    "kelas": 7,
    "fase": "D",
    "domain": "bilangan",
    "ringkas": "Menghitung operasi bilangan desimal dengan tepat",
    "subKonsep": [
      "Nilai tempat pada bilangan desimal",
      "Desimal berulang dan desimal berakhir sebagai ciri bilangan rasional",
      "Operasi hitung bilangan desimal",
      "Persen sebagai per seratus dan hubungannya dengan pecahan-desimal",
      "Pembulatan ke satuan, puluhan, dan banyak angka desimal tertentu",
      "Estimasi dan pemeriksaan kewajaran hasil hitung"
    ],
    "rumus": [
      "p% = p/100",
      "Bilangan desimal berulang bisa diubah menjadi pecahan a/b",
      "Pembulatan: lihat angka setelah tempat yang dibulatkan, >= 5 naik"
    ],
    "miskonsepsi": [
      "Mengira 0,25 lebih besar dari 0,3 karena '25 lebih besar dari 3'",
      "Mengira semua bilangan desimal pasti berakhir",
      "Menaikkan harga 20% lalu menurunkan 20% dikira kembali ke harga semula"
    ],
    "kenapa": [
      "Kenapa 1/3 menghasilkan desimal yang tidak pernah berhenti?",
      "Kenapa 0,999... sama dengan 1?"
    ],
    "prasyarat": [
      "smp7-bilangan-rasional-dan-bentuk-pecahan",
      "smp7-operasi-bilangan-rasional"
    ]
  },
  {
    "id": "smp7-bilangan-rasional-dan-bentuk-pecahan",
    "judul": "Bilangan Rasional dan Bentuk Pecahan",
    "kelas": 7,
    "fase": "D",
    "domain": "bilangan",
    "ringkas": "Mengubah antar bentuk pecahan, desimal, dan persen",
    "subKonsep": [
      "Definisi bilangan rasional sebagai a/b dengan b tidak nol",
      "Pecahan biasa, pecahan campuran, desimal, dan persen sebagai wajah berbeda satu bilangan",
      "Pecahan senilai dan penyederhanaan",
      "Membandingkan dan mengurutkan bilangan rasional",
      "Bilangan rasional negatif pada garis bilangan",
      "Kerapatan bilangan rasional: selalu ada bilangan di antara dua bilangan"
    ],
    "rumus": [
      "Bilangan rasional berbentuk a/b dengan a, b bilangan bulat dan b tidak sama dengan 0",
      "a/b = (a x k)/(b x k) untuk k tidak nol",
      "a/b < c/d jika a x d < c x b (untuk b, d positif)"
    ],
    "miskonsepsi": [
      "Membandingkan pecahan dengan melihat penyebut saja: 1/8 dikira lebih besar dari 1/3",
      "Mengira 0,5 dan 1/2 adalah dua bilangan berbeda",
      "Mengira tidak ada bilangan di antara 1/2 dan 3/5"
    ],
    "kenapa": [
      "Kenapa mengalikan pembilang dan penyebut dengan bilangan sama tidak mengubah nilai pecahan?",
      "Kenapa penyebut tidak boleh nol?"
    ],
    "prasyarat": [
      "sd5-kelipatan-faktor-bilangan-prima-dan",
      "sd5-pecahan-campuran-dan-pecahan-tidak"
    ]
  },
  {
    "id": "smp7-bruto-netto-dan-tara",
    "judul": "Bruto, Netto, dan Tara",
    "kelas": 7,
    "fase": "D",
    "domain": "bilangan",
    "ringkas": "Menghitung salah satu dari bruto, netto, atau tara jika dua lainnya diketahui",
    "subKonsep": [
      "Bruto sebagai berat kotor (isi beserta kemasan)",
      "Netto sebagai berat bersih isi",
      "Tara sebagai berat kemasan",
      "Persentase tara terhadap bruto",
      "Menghitung harga berdasarkan netto",
      "Penerapan pada perdagangan dan kemasan produk"
    ],
    "rumus": [
      "Bruto = netto + tara",
      "Netto = bruto - tara",
      "Persen tara = (tara / bruto) x 100%",
      "Tara = persen tara x bruto"
    ],
    "miskonsepsi": [
      "Tertukar antara netto dan bruto saat membaca soal",
      "Menghitung persen tara terhadap netto, bukan terhadap bruto",
      "Mengira pembeli membayar berdasarkan bruto"
    ],
    "kenapa": [
      "Kenapa persen tara dihitung terhadap bruto dan bukan netto?",
      "Kenapa pembeli membayar netto, padahal yang dibawa pulang beratnya bruto?"
    ],
    "prasyarat": [
      "smp7-aritmetika-sosial-untung-rugi-dan",
      "smp7-bilangan-desimal-persen-dan-estimasi"
    ]
  },
  {
    "id": "smp7-bunga-tunggal-pajak-dan-literasi",
    "judul": "Bunga Tunggal, Pajak, dan Literasi Finansial",
    "kelas": 7,
    "fase": "D",
    "domain": "bilangan",
    "ringkas": "Menghitung bunga tunggal untuk berbagai jangka waktu",
    "subKonsep": [
      "Modal (pokok), suku bunga, dan jangka waktu",
      "Bunga tunggal dihitung selalu dari modal awal",
      "Konversi jangka waktu bulan dan tahun terhadap bunga per tahun",
      "Pajak sebagai persentase yang menambah atau mengurangi",
      "PPN pada pembelian dan PPh pada penghasilan",
      "Perbandingan tabungan, pinjaman, dan angsuran sederhana"
    ],
    "rumus": [
      "Bunga = M x i x t (M modal, i suku bunga per tahun, t waktu dalam tahun)",
      "Bunga t bulan = M x i x t/12",
      "Total tabungan = M + bunga",
      "Harga setelah PPN = harga x (100% + persen PPN)"
    ],
    "miskonsepsi": [
      "Mengira bunga 6 bulan sama besarnya dengan bunga 1 tahun",
      "Menghitung bunga tunggal dari saldo terakhir seperti bunga majemuk",
      "Mengira suku bunga per bulan dan per tahun bisa dipakai bergantian"
    ],
    "kenapa": [
      "Kenapa bunga tunggal selalu dihitung dari modal awal, bukan dari saldo terbaru?",
      "Kenapa pinjaman online berbunga harian bisa membengkak sangat cepat?"
    ],
    "prasyarat": [
      "smp7-aritmetika-sosial-untung-rugi-dan",
      "smp7-bilangan-desimal-persen-dan-estimasi"
    ]
  },
  {
    "id": "smp7-faktorisasi-prima-kpk-dan-fpb",
    "judul": "Faktorisasi Prima, KPK, dan FPB",
    "kelas": 7,
    "fase": "D",
    "domain": "bilangan",
    "ringkas": "Menyusun faktorisasi prima suatu bilangan",
    "subKonsep": [
      "Faktor dan kelipatan suatu bilangan",
      "Bilangan prima dan bilangan komposit",
      "Pohon faktor dan faktorisasi prima sebagai 'sidik jari' bilangan",
      "KPK dari faktorisasi prima (pangkat tertinggi)",
      "FPB dari faktorisasi prima (pangkat terendah)",
      "Penerapan KPK-FPB: jadwal berulang, pembagian rata, penyederhanaan pecahan"
    ],
    "rumus": [
      "FPB dengan pangkat terendah dari faktor prima persekutuan",
      "KPK dengan pangkat tertinggi dari semua faktor prima",
      "FPB(a, b) x KPK(a, b) = a x b"
    ],
    "miskonsepsi": [
      "Mengira 1 adalah bilangan prima",
      "Tertukar KPK dan FPB dalam soal cerita (jadwal berulang vs pembagian rata)",
      "Mengira faktorisasi prima bisa berbeda-beda hasilnya untuk bilangan yang sama"
    ],
    "kenapa": [
      "Kenapa setiap bilangan hanya punya satu faktorisasi prima?",
      "Kenapa 1 tidak dihitung sebagai bilangan prima?"
    ],
    "prasyarat": [
      "smp7-operasi-hitung-bilangan-bulat",
      "sd1-penjumlahan-bilangan-cacah-sampai-20"
    ]
  },
  {
    "id": "smp7-himpunan-dan-operasinya",
    "judul": "Himpunan dan Operasinya",
    "kelas": 7,
    "fase": "D",
    "domain": "bilangan",
    "ringkas": "Menyatakan himpunan dalam tiga cara",
    "subKonsep": [
      "Pengertian himpunan, anggota, dan notasi keanggotaan",
      "Cara menyatakan himpunan: mendaftar, notasi pembentuk, kata-kata",
      "Himpunan kosong, himpunan semesta, dan himpunan bagian",
      "Diagram Venn sebagai representasi visual hubungan himpunan",
      "Irisan, gabungan, selisih, dan komplemen",
      "Kardinalitas dan rumus banyak anggota gabungan"
    ],
    "rumus": [
      "n(A gabungan B) = n(A) + n(B) - n(A irisan B)",
      "Banyak himpunan bagian dari himpunan dengan n anggota adalah 2 pangkat n",
      "A komplemen = anggota semesta yang bukan anggota A"
    ],
    "miskonsepsi": [
      "Mengira himpunan kosong sama dengan {0} atau {} yang berisi nol",
      "Menjumlahkan langsung n(A) + n(B) tanpa mengurangi irisannya",
      "Tertukar antara anggota (elemen) dan himpunan bagian"
    ],
    "kenapa": [
      "Kenapa irisan harus dikurangkan sekali saat menghitung gabungan?",
      "Kenapa banyak himpunan bagian tepat 2 pangkat n?"
    ],
    "prasyarat": [
      "sd6-garis-bilangan-dan-bilangan-bulat",
      "sd5-kelipatan-faktor-bilangan-prima-dan"
    ]
  },
  {
    "id": "smp7-laju-perubahan-dan-kecepatan",
    "judul": "Laju Perubahan dan Kecepatan",
    "kelas": 7,
    "fase": "D",
    "domain": "bilangan",
    "ringkas": "Menghitung jarak, waktu, dan kecepatan secara timbal balik",
    "subKonsep": [
      "Laju sebagai perbandingan dua besaran berbeda jenis",
      "Kecepatan sebagai jarak per satuan waktu",
      "Debit sebagai volume per satuan waktu",
      "Laju satuan (harga per kg, konsumsi bahan bakar per liter)",
      "Kecepatan rata-rata versus kecepatan sesaat",
      "Konversi satuan laju (km/jam ke m/detik)"
    ],
    "rumus": [
      "v = s / t, s = v x t, t = s / v",
      "Debit = volume / waktu",
      "Kecepatan rata-rata = total jarak / total waktu",
      "1 km/jam = 1000/3600 m/detik"
    ],
    "miskonsepsi": [
      "Menghitung kecepatan rata-rata dengan merata-ratakan dua kecepatan secara langsung",
      "Mengira kecepatan dan waktu berbanding senilai untuk jarak tetap",
      "Salah mengonversi km/jam ke m/detik (membagi 60 saja)"
    ],
    "kenapa": [
      "Kenapa kecepatan rata-rata bukan rata-rata dari dua kecepatan?",
      "Kenapa membagi 3,6 untuk mengubah km/jam menjadi m/detik?"
    ],
    "prasyarat": [
      "smp7-perbandingan-senilai-dan-berbalik-nilai",
      "sd6-konsep-rasio-dan-perbandingan"
    ]
  },
  {
    "id": "smp7-operasi-bilangan-rasional",
    "judul": "Operasi Bilangan Rasional",
    "kelas": 7,
    "fase": "D",
    "domain": "bilangan",
    "ringkas": "Menjumlah dan mengurangkan pecahan berpenyebut berbeda",
    "subKonsep": [
      "Penjumlahan dan pengurangan pecahan dengan penyamaan penyebut",
      "Perkalian pecahan sebagai luas persegi panjang bagian",
      "Pembagian pecahan sebagai perkalian dengan kebalikan",
      "Invers perkalian (kebalikan) suatu bilangan rasional",
      "Operasi campuran pada bilangan rasional bertanda",
      "Estimasi hasil operasi pecahan sebelum menghitung"
    ],
    "rumus": [
      "a/b + c/d = (ad + bc)/bd",
      "a/b x c/d = ac/bd",
      "a/b : c/d = a/b x d/c",
      "Kebalikan a/b adalah b/a, dengan (a/b) x (b/a) = 1"
    ],
    "miskonsepsi": [
      "Menjumlahkan pecahan dengan menjumlahkan pembilang dan penyebut: 1/2 + 1/3 = 2/5",
      "Mengira hasil perkalian selalu lebih besar daripada bilangan awalnya",
      "Mengira hasil pembagian selalu lebih kecil daripada bilangan yang dibagi"
    ],
    "kenapa": [
      "Kenapa membagi pecahan sama dengan mengalikan kebalikannya?",
      "Kenapa 6 : 1/2 hasilnya 12, lebih besar dari 6?"
    ],
    "prasyarat": [
      "smp7-bilangan-rasional-dan-bentuk-pecahan",
      "smp7-operasi-hitung-bilangan-bulat"
    ]
  },
  {
    "id": "smp7-operasi-hitung-bilangan-bulat",
    "judul": "Operasi Hitung Bilangan Bulat",
    "kelas": 7,
    "fase": "D",
    "domain": "bilangan",
    "ringkas": "Menghitung penjumlahan dan pengurangan bilangan bulat dengan tepat",
    "subKonsep": [
      "Penjumlahan sebagai perpindahan berarah pada garis bilangan",
      "Pengurangan sebagai penjumlahan dengan lawan",
      "Aturan tanda pada perkalian dan alasannya",
      "Pembagian sebagai kebalikan perkalian",
      "Sifat komutatif, asosiatif, dan distributif pada bilangan bulat",
      "Urutan operasi: kurung, pangkat, kali/bagi, tambah/kurang",
      "Pemodelan dengan keping bermuatan (chip model) positif-negatif"
    ],
    "rumus": [
      "a - b = a + (-b)",
      "(-a) x (-b) = a x b",
      "(-a) x b = a x (-b) = -(a x b)",
      "a x (b + c) = (a x b) + (a x c)"
    ],
    "miskonsepsi": [
      "Mengira -3 - 5 = -2 karena 'minus ketemu minus jadi plus'",
      "Menerapkan 'minus kali minus jadi plus' pada penjumlahan: -3 + (-5) dikira 8",
      "Menghitung 10 - 2 x 3 = 24 karena mengerjakan dari kiri ke kanan"
    ],
    "kenapa": [
      "Kenapa minus kali minus hasilnya plus?",
      "Kenapa mengurangi sama saja dengan menambah lawannya?"
    ],
    "konsep": [
      "negatif-kali-negatif"
    ],
    "prasyarat": [
      "sd6-garis-bilangan-dan-bilangan-bulat",
      "sd4-sifat-sifat-operasi-hitung-bilangan"
    ]
  },
  {
    "id": "smp7-perbandingan-senilai-dan-berbalik-nilai",
    "judul": "Perbandingan Senilai dan Berbalik Nilai",
    "kelas": 7,
    "fase": "D",
    "domain": "bilangan",
    "ringkas": "Mengenali jenis perbandingan dari tabel, grafik, atau cerita",
    "subKonsep": [
      "Ciri perbandingan senilai: satu naik, yang lain naik dengan rasio tetap",
      "Ciri perbandingan berbalik nilai: satu naik, yang lain turun dengan hasil kali tetap",
      "Tabel perbandingan dan pola konstanta",
      "Grafik perbandingan senilai berupa garis lurus melalui titik asal",
      "Grafik perbandingan berbalik nilai berupa kurva hiperbola",
      "Memilih jenis perbandingan yang tepat dari konteks soal"
    ],
    "rumus": [
      "Senilai: y = kx, atau y1/x1 = y2/x2",
      "Berbalik nilai: xy = k, atau x1 x y1 = x2 x y2",
      "Konstanta perbandingan k sebagai nilai satuan"
    ],
    "miskonsepsi": [
      "Memakai perkalian silang untuk semua soal perbandingan, termasuk yang berbalik nilai",
      "Mengira semua hubungan 'makin banyak makin banyak' pasti senilai",
      "Mengira umur dua orang berbanding senilai karena sama-sama bertambah"
    ],
    "kenapa": [
      "Kenapa grafik perbandingan senilai harus melewati titik (0,0)?",
      "Kenapa pada perbandingan berbalik nilai yang tetap adalah hasil kali, bukan hasil bagi?"
    ],
    "prasyarat": [
      "sd6-konsep-rasio-dan-perbandingan",
      "smp7-operasi-bilangan-rasional"
    ]
  },
  {
    "id": "smp7-rasio-dan-perbandingan",
    "judul": "Rasio dan Perbandingan",
    "kelas": 7,
    "fase": "D",
    "domain": "bilangan",
    "ringkas": "Menyederhanakan rasio termasuk yang bersatuan",
    "subKonsep": [
      "Rasio sebagai perbandingan dua besaran sejenis",
      "Rasio dua suku dan tiga suku, serta penyederhanaannya",
      "Perbedaan perbandingan bagian-bagian dan bagian-keseluruhan",
      "Nilai satuan (unit rate) sebagai kunci penalaran proporsional",
      "Menyelesaikan masalah pembagian menurut rasio",
      "Rasio dengan satuan berbeda dan penyeragaman satuan"
    ],
    "rumus": [
      "a : b = a/b, disederhanakan dengan FPB",
      "Jika a : b = c : d maka a x d = b x c (perkalian silang)",
      "Nilai bagian = (rasio bagian / jumlah rasio) x total"
    ],
    "miskonsepsi": [
      "Menganggap rasio 2 : 3 berarti 2/3 dari keseluruhan",
      "Menyederhanakan rasio dengan mengurangi, bukan membagi: 8 : 12 dikira 6 : 10",
      "Membandingkan besaran dengan satuan berbeda tanpa menyeragamkannya"
    ],
    "kenapa": [
      "Kenapa perkalian silang boleh dilakukan pada perbandingan?",
      "Kenapa 2 : 3 tidak sama artinya dengan 2/3 dari total?"
    ],
    "prasyarat": [
      "smp7-operasi-bilangan-rasional",
      "smp7-bilangan-desimal-persen-dan-estimasi"
    ]
  },
  {
    "id": "smp7-skala-dan-denah",
    "judul": "Skala dan Denah",
    "kelas": 7,
    "fase": "D",
    "domain": "bilangan",
    "ringkas": "Menghitung jarak sebenarnya dari peta berskala",
    "subKonsep": [
      "Skala sebagai rasio jarak pada gambar terhadap jarak sebenarnya",
      "Membaca skala pada peta, denah, dan model",
      "Menghitung jarak sebenarnya dan jarak pada peta",
      "Skala pembesaran dan pengecilan",
      "Pengaruh skala terhadap luas: faktor skala kuadrat",
      "Membuat denah sederhana berskala"
    ],
    "rumus": [
      "Skala = jarak pada peta : jarak sebenarnya",
      "Jarak sebenarnya = jarak pada peta : skala",
      "Jika panjang berskala k, maka luas berskala k pangkat 2"
    ],
    "miskonsepsi": [
      "Mengira skala 1 : 1000 berarti gambar 1000 kali lebih besar",
      "Mengalikan luas dengan faktor skala panjang, bukan kuadratnya",
      "Lupa menyeragamkan satuan cm dan km saat menghitung"
    ],
    "kenapa": [
      "Kenapa kalau panjang dilipatduakan, luasnya jadi empat kali lipat?",
      "Kenapa skala 1 : 100 menghasilkan gambar yang lebih besar daripada skala 1 : 10000?"
    ],
    "prasyarat": [
      "sd6-konsep-rasio-dan-perbandingan",
      "smp7-perbandingan-senilai-dan-berbalik-nilai"
    ]
  },
  {
    "id": "smp7-merumuskan-pertanyaan-dan-mengumpulkan-data",
    "judul": "Merumuskan Pertanyaan dan Mengumpulkan Data",
    "kelas": 7,
    "fase": "D",
    "domain": "data",
    "ringkas": "Merumuskan pertanyaan statistis yang dapat dijawab data",
    "subKonsep": [
      "Pertanyaan statistis yang dapat dijawab dengan data",
      "Jenis data: kualitatif dan kuantitatif, diskret dan kontinu",
      "Cara mengumpulkan data: wawancara, angket, observasi, dokumentasi",
      "Tabel frekuensi dan turus (tally)",
      "Data mentah menjadi data terurut",
      "Etika pengumpulan data dan kejujuran pencatatan"
    ],
    "rumus": [
      "Frekuensi total = jumlah semua frekuensi",
      "Frekuensi relatif = frekuensi / total data",
      "Frekuensi relatif dalam persen = (frekuensi / total) x 100%"
    ],
    "miskonsepsi": [
      "Mengira semua pertanyaan bisa dijawab dengan data statistik",
      "Mengira data kuantitatif selalu lebih baik daripada data kualitatif",
      "Mengira semua data numerik adalah data kuantitatif (nomor punggung bukan)"
    ],
    "kenapa": [
      "Kenapa pertanyaan 'berapa tinggi saya?' bukan pertanyaan statistis, tapi 'berapa tinggi rata-rata kelas 7?' iya?",
      "Kenapa cara bertanya bisa mengubah kesimpulan sebuah survei?"
    ],
    "prasyarat": [
      "smp7-bilangan-desimal-persen-dan-estimasi",
      "sd3-penyajian-data-dalam-tabel"
    ]
  },
  {
    "id": "smp7-penyajian-data-tabel-dan-diagram",
    "judul": "Penyajian Data: Tabel dan Diagram Batang",
    "kelas": 7,
    "fase": "D",
    "domain": "data",
    "ringkas": "Membuat diagram batang dari tabel frekuensi",
    "subKonsep": [
      "Tabel frekuensi tunggal dan tabel dua arah",
      "Diagram batang tegak dan mendatar",
      "Diagram batang majemuk untuk membandingkan dua kelompok",
      "Skala sumbu dan pentingnya memulai dari nol",
      "Membaca dan menafsirkan diagram batang",
      "Diagram batang yang menyesatkan dan cara mengenalinya"
    ],
    "rumus": [
      "Tinggi batang sebanding dengan frekuensi",
      "Skala sumbu harus seragam dan sebaiknya dimulai dari nol",
      "Total frekuensi = jumlah tinggi semua batang"
    ],
    "miskonsepsi": [
      "Mengira diagram dengan sumbu terpotong tetap jujur menggambarkan perbandingan",
      "Membuat lebar batang tidak seragam",
      "Mengira diagram batang cocok untuk semua jenis data"
    ],
    "kenapa": [
      "Kenapa sumbu diagram batang sebaiknya dimulai dari nol?",
      "Kenapa diagram yang sama bisa memberi kesan sangat berbeda hanya dengan mengubah skala?"
    ],
    "prasyarat": [
      "smp7-merumuskan-pertanyaan-dan-mengumpulkan-data"
    ]
  },
  {
    "id": "smp7-garis-dan-sudut",
    "judul": "Garis dan Sudut",
    "kelas": 7,
    "fase": "D",
    "domain": "geometri",
    "ringkas": "Mengukur dan menggambar sudut dengan busur derajat",
    "subKonsep": [
      "Titik, garis, sinar garis, dan ruas garis",
      "Kedudukan dua garis: berpotongan, sejajar, berimpit, bersilangan",
      "Satuan sudut derajat, menit, detik dan konversinya",
      "Jenis sudut: lancip, siku-siku, tumpul, lurus, refleks",
      "Hubungan sudut berpelurus dan berpenyiku",
      "Sudut bertolak belakang sama besar"
    ],
    "rumus": [
      "Sudut berpelurus: a + b = 180 derajat",
      "Sudut berpenyiku: a + b = 90 derajat",
      "Sudut bertolak belakang sama besar",
      "1 derajat = 60 menit, 1 menit = 60 detik"
    ],
    "miskonsepsi": [
      "Mengira besar sudut bergantung pada panjang kaki sudut yang digambar",
      "Membaca skala luar busur derajat padahal seharusnya skala dalam",
      "Tertukar antara berpelurus (180) dan berpenyiku (90)"
    ],
    "kenapa": [
      "Kenapa satu putaran penuh disepakati 360 derajat?",
      "Kenapa besar sudut tidak berubah walau kaki sudutnya diperpanjang?"
    ],
    "prasyarat": [
      "sd5-keliling-bangun-datar",
      "smp7-operasi-hitung-bilangan-bulat"
    ]
  },
  {
    "id": "smp7-hubungan-sudut-pada-dua-garis",
    "judul": "Hubungan Sudut pada Dua Garis Sejajar",
    "kelas": 7,
    "fase": "D",
    "domain": "geometri",
    "ringkas": "Mengidentifikasi pasangan sudut pada dua garis sejajar dipotong transversal",
    "subKonsep": [
      "Garis transversal yang memotong dua garis sejajar",
      "Sudut sehadap sama besar",
      "Sudut dalam berseberangan dan luar berseberangan sama besar",
      "Sudut dalam sepihak dan luar sepihak berjumlah 180 derajat",
      "Menggunakan hubungan sudut untuk membuktikan dua garis sejajar",
      "Penerapan pada rangka bangunan, rel, dan pola ubin"
    ],
    "rumus": [
      "Sehadap: sama besar",
      "Dalam berseberangan: sama besar",
      "Luar berseberangan: sama besar",
      "Dalam sepihak: berjumlah 180 derajat"
    ],
    "miskonsepsi": [
      "Menerapkan hubungan sudut sehadap pada garis yang tidak sejajar",
      "Tertukar antara sudut dalam berseberangan dan dalam sepihak",
      "Mengira semua sudut yang terbentuk hanya ada dua ukuran tanpa memeriksa posisinya"
    ],
    "kenapa": [
      "Kenapa sudut sehadap sama besar hanya kalau garisnya sejajar?",
      "Kenapa sudut dalam sepihak berjumlah tepat 180 derajat?"
    ],
    "prasyarat": [
      "smp7-garis-dan-sudut"
    ]
  },
  {
    "id": "smp7-jumlah-sudut-segitiga-dan-sudut",
    "judul": "Jumlah Sudut Segitiga dan Sudut Luar",
    "kelas": 7,
    "fase": "D",
    "domain": "geometri",
    "ringkas": "Menentukan besar sudut yang belum diketahui pada segitiga",
    "subKonsep": [
      "Jumlah sudut dalam segitiga selalu 180 derajat",
      "Bukti dengan menyobek tiga sudut dan menyusunnya menjadi garis lurus",
      "Bukti dengan garis sejajar melalui satu titik sudut",
      "Sudut luar segitiga dan hubungannya dengan dua sudut dalam jauh",
      "Jumlah sudut dalam segi banyak dan penurunannya dari segitiga",
      "Jumlah sudut luar segi banyak selalu 360 derajat"
    ],
    "rumus": [
      "Jumlah sudut segitiga = 180 derajat",
      "Sudut luar = jumlah dua sudut dalam yang tidak berpelurus dengannya",
      "Jumlah sudut dalam segi-n = (n - 2) x 180 derajat",
      "Jumlah sudut luar segi-n = 360 derajat"
    ],
    "miskonsepsi": [
      "Mengira jumlah sudut segitiga besar lebih dari 180 derajat",
      "Mengira sudut luar sama dengan sudut dalam yang berdekatan",
      "Memakai rumus n x 180 alih-alih (n-2) x 180"
    ],
    "kenapa": [
      "Kenapa jumlah sudut segitiga selalu 180 derajat, sekecil atau sebesar apa pun segitiganya?",
      "Kenapa rumus segi-n memakai (n-2), dari mana angka 2 itu?"
    ],
    "konsep": [
      "sudut-segitiga"
    ],
    "prasyarat": [
      "smp7-garis-dan-sudut",
      "smp7-segitiga-jenis-sifat-dan-garis"
    ]
  },
  {
    "id": "smp7-segi-empat-dan-sifat-sifatnya",
    "judul": "Segi Empat dan Sifat-sifatnya",
    "kelas": 7,
    "fase": "D",
    "domain": "geometri",
    "ringkas": "Mengidentifikasi jenis segi empat dari sifat-sifatnya",
    "subKonsep": [
      "Jenis segi empat: persegi, persegi panjang, jajargenjang, belah ketupat, layang-layang, trapesium",
      "Sifat sisi, sudut, dan diagonal tiap segi empat",
      "Hubungan hierarkis antar segi empat (persegi adalah belah ketupat sekaligus persegi panjang)",
      "Jumlah sudut segi empat 360 derajat",
      "Simetri lipat dan simetri putar tiap segi empat",
      "Melukis segi empat dari sifat yang diberikan"
    ],
    "rumus": [
      "Jumlah sudut segi empat = 360 derajat",
      "Jajargenjang: sisi berhadapan sejajar dan sama panjang, sudut berhadapan sama besar",
      "Belah ketupat dan layang-layang: diagonal berpotongan tegak lurus",
      "Persegi panjang: diagonal sama panjang dan saling membagi dua sama panjang"
    ],
    "miskonsepsi": [
      "Mengira persegi bukan persegi panjang",
      "Mengira semua segi empat berdiagonal tegak lurus adalah belah ketupat",
      "Mengira trapesium selalu sama kaki"
    ],
    "kenapa": [
      "Kenapa persegi bisa disebut persegi panjang sekaligus belah ketupat?",
      "Kenapa jumlah sudut segi empat 360 derajat — apa hubungannya dengan segitiga?"
    ],
    "prasyarat": [
      "smp7-jumlah-sudut-segitiga-dan-sudut",
      "smp7-segitiga-jenis-sifat-dan-garis"
    ]
  },
  {
    "id": "smp7-segitiga-jenis-sifat-dan-garis",
    "judul": "Segitiga: Jenis, Sifat, dan Garis Istimewa",
    "kelas": 7,
    "fase": "D",
    "domain": "geometri",
    "ringkas": "Mengelompokkan segitiga menurut sisi dan sudutnya",
    "subKonsep": [
      "Jenis segitiga menurut panjang sisi: sama sisi, sama kaki, sembarang",
      "Jenis segitiga menurut besar sudut: lancip, siku-siku, tumpul",
      "Ketaksamaan segitiga: jumlah dua sisi harus lebih dari sisi ketiga",
      "Garis tinggi, garis bagi, garis berat, dan garis sumbu",
      "Hubungan sisi terpanjang dengan sudut terbesar",
      "Melukis segitiga dengan jangka dan penggaris"
    ],
    "rumus": [
      "Ketaksamaan segitiga: a + b > c untuk setiap pasangan sisi",
      "Pada segitiga sama kaki, sudut alas sama besar",
      "Sisi di hadapan sudut terbesar adalah sisi terpanjang"
    ],
    "miskonsepsi": [
      "Mengira segitiga sama sisi bukan segitiga sama kaki",
      "Mengira garis tinggi selalu berada di dalam segitiga",
      "Mengira tiga panjang apa pun bisa membentuk segitiga"
    ],
    "kenapa": [
      "Kenapa jumlah dua sisi segitiga harus lebih besar dari sisi ketiga?",
      "Kenapa sudut terbesar selalu berhadapan dengan sisi terpanjang?"
    ],
    "prasyarat": [
      "smp7-garis-dan-sudut",
      "sd5-ciri-ciri-dan-klasifikasi-bangun"
    ]
  },
  {
    "id": "smp7-keliling-dan-luas-segitiga-dan",
    "judul": "Keliling dan Luas Segitiga dan Segi Empat",
    "kelas": 7,
    "fase": "D",
    "domain": "pengukuran",
    "ringkas": "Menghitung keliling dan luas bangun datar dasar",
    "subKonsep": [
      "Keliling sebagai jumlah panjang sisi",
      "Luas persegi dan persegi panjang sebagai banyak satuan persegi",
      "Luas jajargenjang dari potongan persegi panjang",
      "Luas segitiga sebagai setengah luas jajargenjang",
      "Luas trapesium, belah ketupat, dan layang-layang dari diagonal",
      "Luas bangun gabungan dan bangun berlubang"
    ],
    "rumus": [
      "Persegi panjang: L = p x l, K = 2(p + l)",
      "Segitiga: L = 1/2 x alas x tinggi",
      "Jajargenjang: L = alas x tinggi",
      "Trapesium: L = 1/2 x (a + b) x t; Belah ketupat/layang-layang: L = 1/2 x d1 x d2"
    ],
    "miskonsepsi": [
      "Memakai sisi miring sebagai tinggi segitiga",
      "Mengira bangun dengan keliling sama pasti luasnya sama",
      "Mengira tinggi harus selalu berada di dalam bangun"
    ],
    "kenapa": [
      "Kenapa luas segitiga tepat setengah luas persegi panjang yang mengurungnya?",
      "Kenapa tinggi harus tegak lurus alas, bukan sisi miringnya?"
    ],
    "prasyarat": [
      "sd5-keliling-bangun-datar",
      "smp7-operasi-bilangan-rasional"
    ]
  },
  {
    "id": "smp8-barisan-aritmetika-dan-barisan-geometri",
    "judul": "Barisan Aritmetika dan Barisan Geometri",
    "kelas": 8,
    "fase": "D",
    "domain": "aljabar",
    "ringkas": "Menentukan beda atau rasio suatu barisan",
    "subKonsep": [
      "Barisan aritmetika dan beda tetap",
      "Rumus suku ke-n barisan aritmetika dan asal-usulnya",
      "Barisan geometri dan rasio tetap",
      "Rumus suku ke-n barisan geometri",
      "Deret sebagai jumlah suku barisan",
      "Membedakan pertumbuhan linear dan pertumbuhan berlipat"
    ],
    "rumus": [
      "Aritmetika: Un = a + (n-1)b, dengan b = Un - U(n-1)",
      "Geometri: Un = a x r pangkat (n-1), dengan r = Un / U(n-1)",
      "Deret aritmetika: Sn = n/2 x (2a + (n-1)b) = n/2 x (a + Un)"
    ],
    "miskonsepsi": [
      "Memakai a x n bukan a + (n-1)b untuk suku ke-n aritmetika",
      "Tertukar antara beda (selisih) dan rasio (hasil bagi)",
      "Mengira barisan geometri selalu membesar, padahal bisa mengecil jika 0 < r < 1"
    ],
    "kenapa": [
      "Kenapa rumus suku ke-n memakai (n-1), bukan n?",
      "Dari mana Gauss mendapat cara cepat menjumlahkan 1 sampai 100?"
    ],
    "prasyarat": [
      "smp8-pola-bilangan-dan-generalisasi",
      "smp8-bilangan-berpangkat-bulat"
    ]
  },
  {
    "id": "smp8-identitas-aljabar-dan-bentuk-kuadrat",
    "judul": "Identitas Aljabar dan Bentuk Kuadrat Sempurna",
    "kelas": 8,
    "fase": "D",
    "domain": "aljabar",
    "ringkas": "Menjabarkan bentuk kuadrat dengan identitas",
    "subKonsep": [
      "Kuadrat jumlah dua suku dan buktinya secara luas",
      "Kuadrat selisih dua suku",
      "Selisih dua kuadrat dan bukti geometrisnya",
      "Identitas sebagai persamaan yang benar untuk semua nilai variabel",
      "Membedakan identitas dari persamaan biasa",
      "Menggunakan identitas untuk berhitung cepat (99 pangkat 2, 101 x 99)"
    ],
    "rumus": [
      "(a + b) pangkat 2 = a pangkat 2 + 2ab + b pangkat 2",
      "(a - b) pangkat 2 = a pangkat 2 - 2ab + b pangkat 2",
      "a pangkat 2 - b pangkat 2 = (a + b)(a - b)",
      "(a + b)(a pangkat 2 - ab + b pangkat 2) = a pangkat 3 + b pangkat 3"
    ],
    "miskonsepsi": [
      "Melupakan suku tengah 2ab pada penjabaran kuadrat jumlah",
      "Mengira a pangkat 2 + b pangkat 2 bisa difaktorkan seperti selisih dua kuadrat",
      "Mengira (a - b) pangkat 2 sama dengan (b - a) pangkat 2 adalah salah (padahal benar)"
    ],
    "kenapa": [
      "Dari mana suku 2ab muncul pada (a+b) pangkat 2?",
      "Kenapa selisih dua kuadrat bisa difaktorkan tapi jumlah dua kuadrat tidak?"
    ],
    "prasyarat": [
      "smp8-perkalian-dan-pembagian-bentuk-aljabar",
      "smp8-bilangan-berpangkat-bulat"
    ]
  },
  {
    "id": "smp8-koordinat-kartesius",
    "judul": "Koordinat Kartesius",
    "kelas": 8,
    "fase": "D",
    "domain": "aljabar",
    "ringkas": "Menempatkan dan membaca titik pada bidang koordinat",
    "subKonsep": [
      "Sumbu-x, sumbu-y, titik asal, dan empat kuadran",
      "Pasangan berurutan (x, y) dan urutannya yang penting",
      "Menentukan posisi titik terhadap sumbu dan terhadap titik lain",
      "Menggambar garis sejajar dan tegak lurus sumbu",
      "Menggambar bangun datar pada bidang koordinat",
      "Membaca koordinat dari denah dan peta berpetak"
    ],
    "rumus": [
      "Titik ditulis (x, y): x adalah absis, y adalah ordinat",
      "Kuadran I (+,+), II (-,+), III (-,-), IV (+,-)",
      "Garis x = k sejajar sumbu-y; garis y = k sejajar sumbu-x"
    ],
    "miskonsepsi": [
      "Menukar urutan absis dan ordinat: (3,5) dibaca sama dengan (5,3)",
      "Mengira kuadran dinomori searah jarum jam",
      "Mengira titik pada sumbu termasuk salah satu kuadran"
    ],
    "kenapa": [
      "Kenapa urutan (x, y) tidak boleh dibalik?",
      "Kenapa Descartes perlu menghubungkan aljabar dengan gambar?"
    ],
    "prasyarat": [
      "sd6-garis-bilangan-dan-bilangan-bulat",
      "sd6-menentukan-lokasi-pada-sistem-berpetak"
    ]
  },
  {
    "id": "smp8-notasi-fungsi-dan-nilai-fungsi",
    "judul": "Notasi Fungsi dan Nilai Fungsi",
    "kelas": 8,
    "fase": "D",
    "domain": "aljabar",
    "ringkas": "Menghitung nilai f(x) untuk berbagai x",
    "subKonsep": [
      "Notasi f(x) dan artinya sebagai keluaran, bukan perkalian",
      "Menghitung nilai fungsi untuk masukan tertentu",
      "Menentukan masukan dari keluaran yang diketahui",
      "Menyusun rumus fungsi dari data pasangan berurutan",
      "Tabel nilai fungsi dan grafiknya",
      "Fungsi sebagai mesin masukan-keluaran"
    ],
    "rumus": [
      "f(x) = ax + b adalah bentuk fungsi linear",
      "Nilai fungsi diperoleh dengan substitusi x",
      "Jika f(x) = ax + b dan dua pasangan diketahui, a dan b dicari dengan sistem persamaan"
    ],
    "miskonsepsi": [
      "Membaca f(x) sebagai f dikali x",
      "Mengira f(2x) sama dengan 2f(x)",
      "Mengira f(a + b) sama dengan f(a) + f(b)"
    ],
    "kenapa": [
      "Kenapa f(x) bukan berarti f dikali x?",
      "Kenapa f(a+b) tidak selalu sama dengan f(a) + f(b)?"
    ],
    "prasyarat": [
      "smp8-relasi-dan-fungsi",
      "smp7-persamaan-linear-satu-variabel"
    ]
  },
  {
    "id": "smp8-pemfaktoran-bentuk-aljabar",
    "judul": "Pemfaktoran Bentuk Aljabar",
    "kelas": 8,
    "fase": "D",
    "domain": "aljabar",
    "ringkas": "Memilih strategi pemfaktoran yang sesuai bentuknya",
    "subKonsep": [
      "Memfaktorkan dengan faktor persekutuan terbesar",
      "Memfaktorkan selisih dua kuadrat",
      "Memfaktorkan bentuk kuadrat x pangkat 2 + bx + c dengan mencari sepasang bilangan",
      "Memfaktorkan bentuk ax pangkat 2 + bx + c dengan a tidak 1",
      "Pemfaktoran dengan pengelompokan (grouping)",
      "Pemfaktoran sebagai kebalikan perkalian, diperiksa dengan menjabarkan kembali"
    ],
    "rumus": [
      "ab + ac = a(b + c)",
      "a pangkat 2 - b pangkat 2 = (a + b)(a - b)",
      "x pangkat 2 + (p+q)x + pq = (x + p)(x + q)",
      "ax pangkat 2 + bx + c difaktorkan dengan mencari dua bilangan berjumlah b dan berhasil kali ac"
    ],
    "miskonsepsi": [
      "Mencari dua bilangan berjumlah c dan berhasil kali b (terbalik)",
      "Mengira semua bentuk kuadrat pasti bisa difaktorkan atas bilangan bulat",
      "Berhenti setelah satu langkah padahal masih bisa difaktorkan lagi"
    ],
    "kenapa": [
      "Kenapa harus mencari dua bilangan yang jumlahnya b dan hasil kalinya c?",
      "Kenapa memfaktorkan itu berguna — apa yang jadi lebih mudah setelahnya?"
    ],
    "konsep": [
      "kuadrat-jumlah"
    ],
    "prasyarat": [
      "smp8-identitas-aljabar-dan-bentuk-kuadrat",
      "smp8-perkalian-dan-pembagian-bentuk-aljabar"
    ]
  },
  {
    "id": "smp8-perkalian-dan-pembagian-bentuk-aljabar",
    "judul": "Perkalian dan Pembagian Bentuk Aljabar",
    "kelas": 8,
    "fase": "D",
    "domain": "aljabar",
    "ringkas": "Mengalikan suku tunggal dengan suku banyak",
    "subKonsep": [
      "Perkalian suku tunggal dengan suku banyak (distributif)",
      "Perkalian dua suku dua (binomial) dan model luas persegi panjang",
      "Perkalian suku banyak dengan suku banyak",
      "Pembagian bentuk aljabar dan penyederhanaan pecahan aljabar",
      "Perpangkatan bentuk aljabar",
      "Model area untuk memvisualkan perkalian aljabar"
    ],
    "rumus": [
      "a(b + c) = ab + ac",
      "(a + b)(c + d) = ac + ad + bc + bd",
      "(a pangkat m)(a pangkat n) = a pangkat (m+n)"
    ],
    "miskonsepsi": [
      "Mengira (a + b) pangkat 2 = a pangkat 2 + b pangkat 2",
      "Lupa mengalikan semua pasangan suku pada perkalian binomial",
      "Mencoret suku (bukan faktor) pada pecahan aljabar"
    ],
    "kenapa": [
      "Kenapa (a+b) pangkat 2 tidak sama dengan a pangkat 2 + b pangkat 2?",
      "Kenapa perkalian aljabar bisa digambar sebagai luas persegi panjang?"
    ],
    "prasyarat": [
      "smp7-operasi-penjumlahan-dan-pengurangan-bentuk",
      "smp8-bilangan-berpangkat-bulat"
    ]
  },
  {
    "id": "smp8-persamaan-garis-lurus-dan-gradien",
    "judul": "Persamaan Garis Lurus dan Gradien",
    "kelas": 8,
    "fase": "D",
    "domain": "aljabar",
    "ringkas": "Menghitung gradien dari dua titik atau dari grafik",
    "subKonsep": [
      "Gradien sebagai ukuran kemiringan: perubahan y per perubahan x",
      "Gradien dari dua titik dan dari grafik",
      "Bentuk y = mx + c dan makna m serta c",
      "Bentuk ax + by + c = 0 dan mengubah antar bentuk",
      "Menyusun persamaan garis melalui satu titik dengan gradien tertentu, dan melalui dua titik",
      "Gradien garis sejajar dan garis tegak lurus"
    ],
    "rumus": [
      "m = (y2 - y1) / (x2 - x1)",
      "y = mx + c, dengan c adalah titik potong sumbu-y",
      "y - y1 = m(x - x1)",
      "Sejajar: m1 = m2; Tegak lurus: m1 x m2 = -1"
    ],
    "miskonsepsi": [
      "Menghitung gradien sebagai perubahan x per perubahan y (terbalik)",
      "Mengira gradien nol dan gradien tak terdefinisi adalah hal yang sama",
      "Mengira garis dengan gradien negatif tidak punya kemiringan"
    ],
    "kenapa": [
      "Kenapa gradien didefinisikan sebagai naik dibagi mendatar, bukan sebaliknya?",
      "Kenapa hasil kali gradien dua garis tegak lurus selalu -1?"
    ],
    "prasyarat": [
      "smp8-notasi-fungsi-dan-nilai-fungsi",
      "smp8-koordinat-kartesius"
    ]
  },
  {
    "id": "smp8-pola-bilangan-dan-generalisasi",
    "judul": "Pola Bilangan dan Generalisasi",
    "kelas": 8,
    "fase": "D",
    "domain": "aljabar",
    "ringkas": "Melanjutkan pola susunan benda dan bilangan",
    "subKonsep": [
      "Pola susunan benda dan pola bilangan",
      "Pola bilangan khusus: ganjil, genap, persegi, segitiga, kubus",
      "Menemukan aturan pola dari suku-suku awal",
      "Menyatakan pola dalam bentuk aljabar (rumus suku ke-n)",
      "Beda tetap versus rasio tetap",
      "Memprediksi suku jauh tanpa melanjutkan satu per satu"
    ],
    "rumus": [
      "Bilangan ganjil ke-n = 2n - 1",
      "Bilangan persegi ke-n = n pangkat 2",
      "Bilangan segitiga ke-n = n(n+1)/2",
      "Pola berbeda tetap: Un = a + (n-1)b"
    ],
    "miskonsepsi": [
      "Mengira pola pasti bertambah tetap hanya karena tiga suku pertama begitu",
      "Mengira suku ke-n bisa ditemukan hanya dengan mengalikan suku pertama dengan n",
      "Mengira satu barisan hanya punya satu rumus yang mungkin"
    ],
    "kenapa": [
      "Kenapa bilangan segitiga rumusnya n(n+1)/2 — dari mana bentuk itu?",
      "Kenapa tiga suku pertama belum cukup untuk memastikan sebuah pola?"
    ],
    "prasyarat": [
      "smp7-bentuk-aljabar-dan-unsur-unsurnya",
      "smp7-operasi-penjumlahan-dan-pengurangan-bentuk"
    ]
  },
  {
    "id": "smp8-relasi-dan-fungsi",
    "judul": "Relasi dan Fungsi",
    "kelas": 8,
    "fase": "D",
    "domain": "aljabar",
    "ringkas": "Membedakan relasi yang merupakan fungsi dan yang bukan",
    "subKonsep": [
      "Relasi sebagai aturan yang menghubungkan dua himpunan",
      "Empat cara menyajikan relasi: diagram panah, tabel, himpunan pasangan berurutan, grafik",
      "Fungsi sebagai relasi khusus: setiap anggota domain punya tepat satu pasangan",
      "Domain (daerah asal), kodomain (daerah kawan), range (daerah hasil)",
      "Uji garis vertikal pada grafik untuk mengenali fungsi",
      "Korespondensi satu-satu dan banyaknya pemetaan yang mungkin"
    ],
    "rumus": [
      "Fungsi f dari A ke B ditulis f: A -> B",
      "Banyak pemetaan dari A (n anggota) ke B (m anggota) adalah m pangkat n",
      "Banyak korespondensi satu-satu untuk n anggota adalah n faktorial"
    ],
    "miskonsepsi": [
      "Mengira kodomain selalu sama dengan range",
      "Mengira fungsi tidak boleh memetakan dua anggota domain ke nilai yang sama",
      "Mengira setiap relasi adalah fungsi"
    ],
    "kenapa": [
      "Kenapa satu anggota domain hanya boleh punya satu pasangan, tapi kodomain boleh dipakai berulang?",
      "Kenapa uji garis vertikal bisa memastikan sebuah grafik adalah fungsi?"
    ],
    "prasyarat": [
      "smp7-himpunan-dan-operasinya",
      "smp8-koordinat-kartesius"
    ]
  },
  {
    "id": "smp8-sistem-persamaan-linear-dua-variabel",
    "judul": "Sistem Persamaan Linear Dua Variabel",
    "kelas": 8,
    "fase": "D",
    "domain": "aljabar",
    "ringkas": "Menyelesaikan SPLDV dengan grafik, substitusi, eliminasi, dan campuran",
    "subKonsep": [
      "Persamaan linear dua variabel dan penyelesaiannya yang tak hingga banyak",
      "SPLDV sebagai dua syarat yang harus dipenuhi bersamaan",
      "Penyelesaian dengan metode grafik: titik potong dua garis",
      "Metode substitusi",
      "Metode eliminasi dan metode campuran",
      "Banyak penyelesaian: satu, tidak ada (sejajar), atau tak hingga (berimpit)"
    ],
    "rumus": [
      "Bentuk umum: ax + by = c dan px + qy = r",
      "Satu penyelesaian jika a/p tidak sama dengan b/q",
      "Tidak ada penyelesaian jika a/p = b/q tapi tidak sama dengan c/r",
      "Tak hingga penyelesaian jika a/p = b/q = c/r"
    ],
    "miskonsepsi": [
      "Mengira PLDV tunggal punya satu penyelesaian saja",
      "Mengeliminasi tanpa menyamakan koefisien terlebih dulu",
      "Mengira sistem tanpa penyelesaian berarti soalnya salah"
    ],
    "kenapa": [
      "Kenapa penyelesaian SPLDV adalah titik potong dua garis?",
      "Kenapa boleh menjumlahkan atau mengurangkan dua persamaan utuh?"
    ],
    "prasyarat": [
      "smp8-persamaan-garis-lurus-dan-gradien",
      "smp7-persamaan-linear-satu-variabel"
    ]
  },
  {
    "id": "smp8-bentuk-akar-dan-bilangan-irasional",
    "judul": "Bentuk Akar dan Bilangan Irasional",
    "kelas": 8,
    "fase": "D",
    "domain": "bilangan",
    "ringkas": "Menyederhanakan bentuk akar",
    "subKonsep": [
      "Akar kuadrat sebagai kebalikan pengkuadratan",
      "Bilangan kuadrat sempurna dan yang bukan",
      "Bilangan irasional: desimal tak berakhir dan tak berulang",
      "Penemuan akar 2 lewat diagonal persegi (Pythagoras)",
      "Menyederhanakan bentuk akar dengan faktor kuadrat sempurna",
      "Mengestimasi nilai akar antara dua bilangan bulat"
    ],
    "rumus": [
      "Akar dari (a x b) = akar a x akar b untuk a, b tak negatif",
      "Akar dari (a/b) = akar a / akar b untuk b positif",
      "Akar dari (a pangkat 2) = |a|",
      "Akar 50 = akar (25 x 2) = 5 akar 2"
    ],
    "miskonsepsi": [
      "Mengira akar (a + b) = akar a + akar b",
      "Mengira semua akar adalah bilangan irasional (padahal akar 9 = 3)",
      "Mengira 3,14 adalah nilai pi yang sebenarnya"
    ],
    "kenapa": [
      "Kenapa akar 2 tidak bisa ditulis sebagai pecahan?",
      "Kenapa akar (a+b) tidak sama dengan akar a + akar b?"
    ],
    "prasyarat": [
      "smp8-bilangan-berpangkat-bulat",
      "sd5-kelipatan-faktor-bilangan-prima-dan"
    ]
  },
  {
    "id": "smp8-bilangan-berpangkat-bulat",
    "judul": "Bilangan Berpangkat Bulat",
    "kelas": 8,
    "fase": "D",
    "domain": "bilangan",
    "ringkas": "Menyederhanakan bentuk berpangkat dengan sifat-sifatnya",
    "subKonsep": [
      "Pangkat sebagai perkalian berulang",
      "Sifat perkalian dan pembagian bilangan berpangkat basis sama",
      "Pangkat dari pangkat dan pangkat dari hasil kali",
      "Pangkat nol dan alasannya bernilai 1",
      "Pangkat bulat negatif sebagai kebalikan",
      "Membandingkan dan mengurutkan bilangan berpangkat"
    ],
    "rumus": [
      "a pangkat m x a pangkat n = a pangkat (m+n)",
      "a pangkat m : a pangkat n = a pangkat (m-n)",
      "(a pangkat m) pangkat n = a pangkat (mn)",
      "a pangkat 0 = 1 untuk a tidak nol; a pangkat -n = 1 / (a pangkat n)"
    ],
    "miskonsepsi": [
      "Mengira 2 pangkat 3 sama dengan 2 x 3 = 6",
      "Mengira a pangkat -2 bernilai negatif",
      "Menjumlahkan basis saat mengalikan: 2 pangkat 3 x 2 pangkat 4 dikira 4 pangkat 7"
    ],
    "kenapa": [
      "Kenapa bilangan apa pun dipangkatkan nol hasilnya 1?",
      "Kenapa pangkat negatif berarti kebalikan, bukan bilangan negatif?"
    ],
    "prasyarat": [
      "smp7-operasi-hitung-bilangan-bulat",
      "smp7-operasi-bilangan-rasional"
    ]
  },
  {
    "id": "smp8-notasi-ilmiah",
    "judul": "Notasi Ilmiah",
    "kelas": 8,
    "fase": "D",
    "domain": "bilangan",
    "ringkas": "Mengubah bilangan biasa ke notasi ilmiah dan sebaliknya",
    "subKonsep": [
      "Bentuk baku a x 10 pangkat n dengan 1 <= a < 10",
      "Notasi ilmiah untuk bilangan sangat besar",
      "Notasi ilmiah untuk bilangan sangat kecil (pangkat negatif)",
      "Operasi perkalian dan pembagian pada notasi ilmiah",
      "Penjumlahan notasi ilmiah dengan menyamakan pangkat",
      "Penerapan di sains: jarak bintang, massa atom, ukuran virus"
    ],
    "rumus": [
      "Bentuk baku: a x 10 pangkat n dengan 1 <= a < 10 dan n bilangan bulat",
      "(a x 10 pangkat m) x (b x 10 pangkat n) = ab x 10 pangkat (m+n)",
      "(a x 10 pangkat m) : (b x 10 pangkat n) = (a/b) x 10 pangkat (m-n)"
    ],
    "miskonsepsi": [
      "Menulis 25 x 10 pangkat 3 sebagai notasi ilmiah yang sah",
      "Mengira 10 pangkat -3 bernilai negatif",
      "Menjumlahkan notasi ilmiah langsung tanpa menyamakan pangkat"
    ],
    "kenapa": [
      "Kenapa koefisien notasi ilmiah harus antara 1 dan 10?",
      "Kenapa ilmuwan memakai notasi ilmiah alih-alih menulis angka nolnya?"
    ],
    "prasyarat": [
      "smp8-bilangan-berpangkat-bulat",
      "smp7-bilangan-desimal-persen-dan-estimasi"
    ]
  },
  {
    "id": "smp8-diagram-garis-dan-diagram-lingkaran",
    "judul": "Diagram Garis dan Diagram Lingkaran",
    "kelas": 8,
    "fase": "D",
    "domain": "data",
    "ringkas": "Membuat diagram lingkaran lengkap dengan sudut juringnya",
    "subKonsep": [
      "Diagram garis untuk data yang berubah menurut waktu",
      "Membaca tren naik, turun, dan berfluktuasi",
      "Diagram lingkaran untuk menunjukkan bagian terhadap keseluruhan",
      "Menghitung besar sudut juring dari persentase data",
      "Menghitung persentase dan nilai data dari sudut juring",
      "Memilih jenis diagram yang paling sesuai dengan tujuan penyajian"
    ],
    "rumus": [
      "Sudut juring = (frekuensi / total) x 360 derajat",
      "Persentase = (frekuensi / total) x 100%",
      "Frekuensi = (sudut juring / 360) x total data",
      "Jumlah semua sudut juring = 360 derajat"
    ],
    "miskonsepsi": [
      "Memakai 100 sebagai pembagi untuk sudut juring, bukan 360",
      "Mengira diagram lingkaran bisa dipakai untuk data perubahan waktu",
      "Membandingkan dua diagram lingkaran dengan total data berbeda seolah setara"
    ],
    "kenapa": [
      "Kenapa sudut juring dihitung dengan 360, bukan 100?",
      "Kenapa dua diagram lingkaran dengan bagian sama besar bisa mewakili jumlah orang yang sangat berbeda?"
    ],
    "prasyarat": [
      "smp7-penyajian-data-tabel-dan-diagram",
      "smp8-sudut-pusat-sudut-keliling-panjang",
      "smp7-bilangan-desimal-persen-dan-estimasi"
    ]
  },
  {
    "id": "smp8-jangkauan-dan-ukuran-penyebaran-data",
    "judul": "Jangkauan dan Ukuran Penyebaran Data",
    "kelas": 8,
    "fase": "D",
    "domain": "data",
    "ringkas": "Menghitung jangkauan dan kuartil suatu data",
    "subKonsep": [
      "Jangkauan sebagai selisih data terbesar dan terkecil",
      "Kuartil bawah, kuartil tengah (median), dan kuartil atas",
      "Jangkauan antar-kuartil sebagai ukuran sebaran yang tahan pencilan",
      "Membaca sebaran dari diagram batang dan tabel",
      "Dua kelompok data bermean sama tetapi bersebaran sangat berbeda",
      "Menafsirkan sebaran dalam konteks (konsistensi, keandalan)"
    ],
    "rumus": [
      "Jangkauan = data terbesar - data terkecil",
      "Jangkauan antar-kuartil = Q3 - Q1",
      "Q2 adalah median seluruh data",
      "Q1 median separuh bawah, Q3 median separuh atas"
    ],
    "miskonsepsi": [
      "Mengira dua kelompok dengan mean sama pasti mirip",
      "Menghitung kuartil tanpa mengurutkan data",
      "Mengira jangkauan besar selalu berarti data buruk"
    ],
    "kenapa": [
      "Kenapa dua kelas dengan nilai rata-rata sama bisa punya kondisi yang sangat berbeda?",
      "Kenapa jangkauan antar-kuartil lebih tahan pencilan daripada jangkauan biasa?"
    ],
    "prasyarat": [
      "smp8-ukuran-pemusatan-mean-median-dan"
    ]
  },
  {
    "id": "smp8-peluang-teoretis",
    "judul": "Peluang Teoretis",
    "kelas": 8,
    "fase": "D",
    "domain": "data",
    "ringkas": "Mendaftar ruang sampel dengan tabel dan diagram pohon",
    "subKonsep": [
      "Percobaan, ruang sampel, dan titik sampel",
      "Kejadian sebagai himpunan bagian ruang sampel",
      "Mendaftar ruang sampel dengan tabel dan diagram pohon",
      "Peluang sebagai perbandingan banyak hasil yang diharapkan terhadap seluruh hasil",
      "Rentang nilai peluang antara 0 dan 1",
      "Peluang komplemen suatu kejadian"
    ],
    "rumus": [
      "P(A) = n(A) / n(S)",
      "0 <= P(A) <= 1",
      "P(A) + P(bukan A) = 1",
      "Banyak titik sampel dua dadu = 6 x 6 = 36"
    ],
    "miskonsepsi": [
      "Mengira semua hasil selalu berpeluang sama tanpa memeriksa percobaannya",
      "Mengira jumlah dua dadu berpeluang sama untuk semua nilai 2 sampai 12",
      "Mengira peluang bisa lebih dari 1 atau negatif"
    ],
    "kenapa": [
      "Kenapa jumlah 7 pada dua dadu lebih sering muncul daripada jumlah 2?",
      "Kenapa peluang tidak pernah lebih dari 1?"
    ],
    "konsep": [
      "peluang-simulasi"
    ],
    "prasyarat": [
      "smp7-himpunan-dan-operasinya",
      "smp7-operasi-bilangan-rasional"
    ]
  },
  {
    "id": "smp8-ukuran-pemusatan-mean-median-dan",
    "judul": "Ukuran Pemusatan: Mean, Median, dan Modus",
    "kelas": 8,
    "fase": "D",
    "domain": "data",
    "ringkas": "Menghitung mean, median, dan modus dari data tunggal dan tabel frekuensi",
    "subKonsep": [
      "Mean sebagai titik seimbang dan pemerataan data",
      "Median sebagai nilai tengah data terurut",
      "Modus sebagai nilai yang paling sering muncul",
      "Menghitung mean dari tabel frekuensi",
      "Memilih ukuran pemusatan yang paling mewakili",
      "Pengaruh data pencilan (outlier) terhadap mean dan median"
    ],
    "rumus": [
      "Mean = jumlah seluruh data / banyak data",
      "Median untuk n ganjil = data ke-((n+1)/2)",
      "Median untuk n genap = rata-rata data ke-(n/2) dan ke-(n/2 + 1)",
      "Mean dari tabel frekuensi = jumlah (xi x fi) / jumlah fi"
    ],
    "miskonsepsi": [
      "Menghitung median tanpa mengurutkan data lebih dulu",
      "Mengira mean selalu ukuran terbaik untuk semua data",
      "Mengira modus selalu tunggal, padahal data bisa tanpa modus atau bermodus banyak"
    ],
    "kenapa": [
      "Kenapa satu gaji direktur bisa membuat 'rata-rata gaji' menyesatkan?",
      "Kenapa median lebih tahan terhadap data ekstrem daripada mean?"
    ],
    "prasyarat": [
      "smp7-penyajian-data-tabel-dan-diagram",
      "smp7-operasi-bilangan-rasional"
    ]
  },
  {
    "id": "smp8-jarak-dua-titik-pada-bidang",
    "judul": "Jarak Dua Titik pada Bidang Koordinat",
    "kelas": 8,
    "fase": "D",
    "domain": "geometri",
    "ringkas": "Menghitung jarak dua titik pada bidang koordinat",
    "subKonsep": [
      "Membentuk segitiga siku-siku dari dua titik pada bidang koordinat",
      "Selisih absis sebagai sisi mendatar dan selisih ordinat sebagai sisi tegak",
      "Rumus jarak sebagai penerapan langsung Pythagoras",
      "Titik tengah ruas garis",
      "Menentukan jenis bangun dari koordinat titik sudutnya",
      "Menghitung keliling bangun pada bidang koordinat"
    ],
    "rumus": [
      "d = akar ((x2 - x1) pangkat 2 + (y2 - y1) pangkat 2)",
      "Titik tengah = ((x1 + x2)/2, (y1 + y2)/2)",
      "Jarak titik ke titik asal = akar (x pangkat 2 + y pangkat 2)"
    ],
    "miskonsepsi": [
      "Menjumlahkan selisih koordinat tanpa mengkuadratkan",
      "Salah tanda saat menghitung selisih koordinat negatif",
      "Mengira urutan pengurangan mempengaruhi hasil jarak"
    ],
    "kenapa": [
      "Kenapa rumus jarak sebenarnya adalah teorema Pythagoras yang menyamar?",
      "Kenapa urutan titik tidak mempengaruhi jarak, padahal selisihnya bisa negatif?"
    ],
    "prasyarat": [
      "smp8-teorema-pythagoras",
      "smp8-koordinat-kartesius"
    ]
  },
  {
    "id": "smp8-jaring-jaring-bangun-ruang",
    "judul": "Jaring-jaring Bangun Ruang",
    "kelas": 8,
    "fase": "D",
    "domain": "geometri",
    "ringkas": "Menggambar jaring-jaring berbagai bangun ruang",
    "subKonsep": [
      "Jaring-jaring sebagai bangun ruang yang dibuka mendatar",
      "Jaring-jaring kubus dan balok serta variasinya",
      "Jaring-jaring prisma dan limas",
      "Jaring-jaring tabung dan kerucut",
      "Membangun bangun ruang dari jaring-jaringnya",
      "Hubungan jaring-jaring dengan perhitungan luas permukaan"
    ],
    "rumus": [
      "Kubus punya 11 jaring-jaring berbeda",
      "Jaring-jaring prisma: dua alas kongruen dan selimut berupa persegi panjang",
      "Jaring-jaring tabung: dua lingkaran dan satu persegi panjang berukuran 2 pi r kali t",
      "Jaring-jaring kerucut: satu lingkaran dan satu juring berjari-jari s"
    ],
    "miskonsepsi": [
      "Mengira setiap kubus hanya punya satu bentuk jaring-jaring",
      "Mengira setiap rangkaian enam persegi pasti jaring-jaring kubus",
      "Mengira selimut kerucut berupa lingkaran penuh"
    ],
    "kenapa": [
      "Kenapa kubus punya tepat 11 jaring-jaring yang berbeda?",
      "Kenapa selimut tabung menjadi persegi panjang tapi selimut kerucut menjadi juring?"
    ],
    "prasyarat": [
      "smp7-keliling-dan-luas-segitiga-dan",
      "smp7-segi-empat-dan-sifat-sifatnya",
      "sd6-mengonstruksi-dan-mengurai-bangun-ruang"
    ]
  },
  {
    "id": "smp8-teorema-pythagoras",
    "judul": "Teorema Pythagoras",
    "kelas": 8,
    "fase": "D",
    "domain": "geometri",
    "ringkas": "Menghitung panjang sisi segitiga siku-siku yang belum diketahui",
    "subKonsep": [
      "Sisi siku-siku dan sisi miring (hipotenusa)",
      "Pernyataan teorema Pythagoras dalam bahasa luas persegi",
      "Bukti visual dengan susunan empat segitiga siku-siku",
      "Bukti dengan luas persegi besar dan persegi kecil",
      "Kebalikan teorema Pythagoras untuk memeriksa jenis segitiga",
      "Penerapan pada tinggi, jarak, dan diagonal"
    ],
    "rumus": [
      "a pangkat 2 + b pangkat 2 = c pangkat 2 dengan c sisi miring",
      "c = akar (a pangkat 2 + b pangkat 2)",
      "Jika a2 + b2 = c2 segitiga siku-siku; jika lebih besar lancip; jika lebih kecil tumpul"
    ],
    "miskonsepsi": [
      "Menggunakan sisi miring sebagai salah satu sisi siku-siku dalam rumus",
      "Menerapkan Pythagoras pada segitiga yang bukan siku-siku",
      "Mengira a + b = c, bukan kuadratnya"
    ],
    "kenapa": [
      "Kenapa kuadrat sisi miring sama dengan jumlah kuadrat dua sisi lainnya?",
      "Kenapa teorema ini bisa dibuktikan hanya dengan menggeser-geser empat segitiga?"
    ],
    "konsep": [
      "pythagoras"
    ],
    "prasyarat": [
      "smp7-segitiga-jenis-sifat-dan-garis",
      "smp8-bentuk-akar-dan-bilangan-irasional",
      "smp8-bilangan-berpangkat-bulat"
    ]
  },
  {
    "id": "smp8-tripel-pythagoras-dan-segitiga-istimewa",
    "judul": "Tripel Pythagoras dan Segitiga Istimewa",
    "kelas": 8,
    "fase": "D",
    "domain": "geometri",
    "ringkas": "Mengenali dan memakai tripel Pythagoras untuk hitung cepat",
    "subKonsep": [
      "Tripel Pythagoras sebagai tiga bilangan bulat yang memenuhi teorema",
      "Tripel dasar dan kelipatannya (3-4-5, 5-12-13, 8-15-17, 7-24-25)",
      "Segitiga siku-siku bersudut 45-45-90 dan perbandingan sisinya",
      "Segitiga siku-siku bersudut 30-60-90 dan perbandingan sisinya",
      "Diagonal persegi dan tinggi segitiga sama sisi",
      "Penerapan cepat tanpa menghitung akar"
    ],
    "rumus": [
      "Segitiga 45-45-90: sisi : sisi : miring = 1 : 1 : akar 2",
      "Segitiga 30-60-90: sisi : sisi : miring = 1 : akar 3 : 2",
      "Diagonal persegi bersisi s adalah s akar 2",
      "Tinggi segitiga sama sisi bersisi s adalah (s/2) akar 3"
    ],
    "miskonsepsi": [
      "Mengira 3-4-5 hanya berlaku persis pada ukuran itu, bukan kelipatannya",
      "Tertukar posisi akar 3 dan angka 1 pada segitiga 30-60-90",
      "Mengira segitiga bersisi 6-8-9 juga siku-siku karena mirip 3-4-5"
    ],
    "kenapa": [
      "Kenapa hanya sedikit tripel bilangan bulat yang memenuhi teorema Pythagoras?",
      "Kenapa perbandingan sisi segitiga 30-60-90 selalu 1 : akar 3 : 2, sebesar apa pun segitiganya?"
    ],
    "prasyarat": [
      "smp8-teorema-pythagoras",
      "smp8-bentuk-akar-dan-bilangan-irasional"
    ]
  },
  {
    "id": "smp8-unsur-unsur-lingkaran-dan-garis",
    "judul": "Unsur-unsur Lingkaran dan Garis Singgung",
    "kelas": 8,
    "fase": "D",
    "domain": "geometri",
    "ringkas": "Mengidentifikasi dan menggambar unsur-unsur lingkaran",
    "subKonsep": [
      "Unsur lingkaran: pusat, jari-jari, diameter, busur, tali busur, apotema, juring, tembereng",
      "Garis singgung dan sifat tegak lurus terhadap jari-jari di titik singgung",
      "Panjang garis singgung dari satu titik luar",
      "Garis singgung persekutuan dalam dua lingkaran",
      "Garis singgung persekutuan luar dua lingkaran",
      "Lingkaran dalam dan lingkaran luar segitiga"
    ],
    "rumus": [
      "Panjang garis singgung dari titik luar: akar (d pangkat 2 - r pangkat 2)",
      "Garis singgung persekutuan luar: akar (p pangkat 2 - (R - r) pangkat 2)",
      "Garis singgung persekutuan dalam: akar (p pangkat 2 - (R + r) pangkat 2)",
      "Garis singgung tegak lurus jari-jari di titik singgung"
    ],
    "miskonsepsi": [
      "Tertukar rumus garis singgung persekutuan dalam dan luar",
      "Mengira garis singgung memotong lingkaran di dua titik",
      "Memakai jarak antar pusat sebagai sisi tegak, bukan sisi miring"
    ],
    "kenapa": [
      "Kenapa garis singgung selalu tegak lurus jari-jari di titik singgungnya?",
      "Kenapa rumus garis singgung persekutuan luar memakai selisih jari-jari, sedangkan yang dalam memakai jumlahnya?"
    ],
    "prasyarat": [
      "sd6-keliling-dan-luas-lingkaran",
      "smp8-teorema-pythagoras"
    ]
  },
  {
    "id": "smp8-keliling-dan-luas-lingkaran",
    "judul": "Keliling dan Luas Lingkaran",
    "kelas": 8,
    "fase": "D",
    "domain": "pengukuran",
    "ringkas": "Menghitung keliling dan luas lingkaran",
    "subKonsep": [
      "Jari-jari, diameter, dan hubungannya",
      "Pi sebagai perbandingan keliling terhadap diameter yang selalu tetap",
      "Penurunan rumus keliling dari definisi pi",
      "Penurunan rumus luas lingkaran dengan potongan juring disusun jadi jajargenjang",
      "Hubungan luas dan keliling: L = 1/2 x K x r",
      "Menentukan jari-jari dari keliling atau luas yang diketahui"
    ],
    "rumus": [
      "K = 2 x pi x r = pi x d",
      "L = pi x r pangkat 2",
      "pi = K / d, kira-kira 3,14 atau 22/7",
      "L = 1/2 x K x r"
    ],
    "miskonsepsi": [
      "Tertukar memasukkan diameter ke rumus yang meminta jari-jari",
      "Mengira pi bernilai persis 3,14 atau persis 22/7",
      "Mengira melipatduakan jari-jari melipatduakan luasnya"
    ],
    "kenapa": [
      "Kenapa perbandingan keliling terhadap diameter selalu sama untuk semua lingkaran?",
      "Dari mana rumus pi kali r kuadrat berasal?"
    ],
    "prasyarat": [
      "smp7-keliling-dan-luas-segitiga-dan",
      "sd6-konsep-rasio-dan-perbandingan"
    ]
  },
  {
    "id": "smp8-luas-permukaan-dan-volume-limas",
    "judul": "Luas Permukaan dan Volume Limas",
    "kelas": 8,
    "fase": "D",
    "domain": "pengukuran",
    "ringkas": "Menghitung luas permukaan dan volume limas",
    "subKonsep": [
      "Ciri limas: satu alas segi banyak dan sisi tegak berupa segitiga bertemu di puncak",
      "Tinggi limas versus tinggi sisi tegak (apotema)",
      "Menghitung tinggi sisi tegak dengan teorema Pythagoras",
      "Luas permukaan sebagai alas plus jumlah luas segitiga tegak",
      "Volume limas sepertiga volume prisma beralas dan bertinggi sama",
      "Percobaan menuang: tiga limas mengisi satu prisma"
    ],
    "rumus": [
      "L permukaan limas = luas alas + jumlah luas sisi tegak",
      "V limas = 1/3 x luas alas x tinggi",
      "Tinggi sisi tegak dicari dengan Pythagoras dari tinggi limas dan setengah sisi alas"
    ],
    "miskonsepsi": [
      "Memakai tinggi limas sebagai tinggi segitiga sisi tegak",
      "Lupa mengalikan sepertiga pada volume limas",
      "Mengira semua sisi tegak limas selalu kongruen"
    ],
    "kenapa": [
      "Kenapa volume limas tepat sepertiga volume prisma yang seukuran?",
      "Kenapa tinggi limas dan tinggi sisi tegaknya berbeda?"
    ],
    "prasyarat": [
      "smp8-luas-permukaan-dan-volume-prisma",
      "smp8-teorema-pythagoras"
    ]
  },
  {
    "id": "smp8-luas-permukaan-dan-volume-prisma",
    "judul": "Luas Permukaan dan Volume Prisma",
    "kelas": 8,
    "fase": "D",
    "domain": "pengukuran",
    "ringkas": "Menghitung luas permukaan dan volume berbagai prisma",
    "subKonsep": [
      "Ciri prisma: dua alas sejajar kongruen dan sisi tegak berupa persegi panjang",
      "Kubus dan balok sebagai prisma khusus",
      "Luas permukaan dari jaring-jaring: dua alas plus selimut",
      "Volume sebagai luas alas dikali tinggi",
      "Prisma segitiga, segi empat, segi lima, dan segi enam",
      "Menentukan ukuran yang belum diketahui dari volume atau luas permukaan"
    ],
    "rumus": [
      "L permukaan prisma = 2 x luas alas + keliling alas x tinggi",
      "V prisma = luas alas x tinggi",
      "Kubus: L = 6s pangkat 2, V = s pangkat 3",
      "Balok: L = 2(pl + pt + lt), V = p x l x t"
    ],
    "miskonsepsi": [
      "Mengira tinggi prisma sama dengan tinggi segitiga alasnya",
      "Menghitung luas permukaan dengan menjumlahkan hanya sisi yang terlihat pada gambar",
      "Mengira volume prisma segitiga perlu dibagi tiga"
    ],
    "kenapa": [
      "Kenapa volume prisma selalu luas alas kali tinggi, apa pun bentuk alasnya?",
      "Kenapa luas selimut prisma sama dengan keliling alas dikali tinggi?"
    ],
    "prasyarat": [
      "smp7-keliling-dan-luas-segitiga-dan",
      "smp8-jaring-jaring-bangun-ruang"
    ]
  },
  {
    "id": "smp8-sudut-pusat-sudut-keliling-panjang",
    "judul": "Sudut Pusat, Sudut Keliling, Panjang Busur, dan Luas Juring",
    "kelas": 8,
    "fase": "D",
    "domain": "pengukuran",
    "ringkas": "Menghitung panjang busur dan luas juring",
    "subKonsep": [
      "Busur, tali busur, juring, dan tembereng",
      "Sudut pusat dan sudut keliling",
      "Hubungan sudut pusat dua kali sudut keliling pada busur sama",
      "Sudut keliling menghadap diameter besarnya 90 derajat",
      "Panjang busur sebagai bagian dari keliling menurut sudut pusat",
      "Luas juring sebagai bagian dari luas lingkaran menurut sudut pusat"
    ],
    "rumus": [
      "Sudut pusat = 2 x sudut keliling (pada busur yang sama)",
      "Panjang busur = (sudut pusat / 360) x 2 x pi x r",
      "Luas juring = (sudut pusat / 360) x pi x r pangkat 2",
      "Luas tembereng = luas juring - luas segitiga"
    ],
    "miskonsepsi": [
      "Mengira sudut keliling dua kali sudut pusat (terbalik)",
      "Memakai 180 sebagai penyebut, bukan 360",
      "Mengira semua sudut keliling pada satu lingkaran besarnya sama"
    ],
    "kenapa": [
      "Kenapa sudut pusat selalu dua kali sudut keliling yang menghadap busur sama?",
      "Kenapa sudut keliling yang menghadap diameter selalu siku-siku?"
    ],
    "prasyarat": [
      "sd6-keliling-dan-luas-lingkaran",
      "sd6-konsep-rasio-dan-perbandingan",
      "smp7-garis-dan-sudut"
    ]
  },
  {
    "id": "smp9-fungsi-kuadrat-dan-grafik-parabola",
    "judul": "Fungsi Kuadrat dan Grafik Parabola",
    "kelas": 9,
    "fase": "D",
    "domain": "aljabar",
    "ringkas": "Menggambar sketsa grafik fungsi kuadrat",
    "subKonsep": [
      "Bentuk fungsi kuadrat dan bentuk grafiknya (parabola)",
      "Pengaruh koefisien a terhadap arah buka dan kelangsingan parabola",
      "Sumbu simetri dan titik puncak (titik balik)",
      "Titik potong sumbu-x (akar) dan sumbu-y",
      "Nilai maksimum dan nilai minimum fungsi",
      "Penerapan: lintasan benda, luas maksimum, keuntungan optimum"
    ],
    "rumus": [
      "f(x) = ax pangkat 2 + bx + c dengan a tidak nol",
      "Sumbu simetri: x = -b / 2a",
      "Titik puncak: (-b/2a, -(b pangkat 2 - 4ac)/4a)",
      "Titik potong sumbu-y adalah (0, c)"
    ],
    "miskonsepsi": [
      "Mengira a > 0 berarti grafik terbuka ke bawah",
      "Mengira titik puncak selalu terletak pada sumbu-y",
      "Mengira parabola tanpa titik potong sumbu-x berarti tidak ada grafiknya"
    ],
    "kenapa": [
      "Kenapa sumbu simetri parabola tepat di x = -b/2a?",
      "Kenapa lintasan bola yang dilempar berbentuk parabola?"
    ],
    "konsep": [
      "parabola"
    ],
    "prasyarat": [
      "smp9-persamaan-kuadrat",
      "smp9-fungsi-nonlinear-dan-perbandingannya-dengan",
      "smp8-koordinat-kartesius"
    ]
  },
  {
    "id": "smp9-fungsi-nonlinear-dan-perbandingannya-dengan",
    "judul": "Fungsi Nonlinear dan Perbandingannya dengan Fungsi Linear",
    "kelas": 9,
    "fase": "D",
    "domain": "aljabar",
    "ringkas": "Membedakan fungsi linear dan nonlinear dari grafiknya",
    "subKonsep": [
      "Ciri grafik fungsi linear: garis lurus, laju perubahan tetap",
      "Ciri grafik fungsi kuadrat: parabola, laju perubahan berubah",
      "Ciri grafik fungsi eksponensial: pertumbuhan atau peluruhan berlipat",
      "Ciri grafik fungsi kebalikan (invers proporsional): hiperbola",
      "Membedakan jenis fungsi dari tabel selisih dan dari grafik",
      "Memilih model fungsi yang sesuai untuk situasi nyata"
    ],
    "rumus": [
      "Linear: y = ax + b, selisih pertama tetap",
      "Kuadrat: y = ax pangkat 2 + bx + c, selisih kedua tetap",
      "Eksponensial: y = a x b pangkat x, rasio antar suku tetap",
      "Kebalikan: y = k/x, hasil kali xy tetap"
    ],
    "miskonsepsi": [
      "Mengira semua grafik melengkung pasti parabola",
      "Mengira grafik yang naik terus pasti fungsi linear",
      "Mengira fungsi eksponensial dan fungsi kuadrat berperilaku sama karena sama-sama naik cepat"
    ],
    "kenapa": [
      "Kenapa grafik fungsi linear pasti lurus, tapi fungsi kuadrat melengkung?",
      "Kenapa selisih kedua yang tetap menandakan fungsi kuadrat?"
    ],
    "prasyarat": [
      "smp8-persamaan-garis-lurus-dan-gradien",
      "smp8-notasi-fungsi-dan-nilai-fungsi"
    ]
  },
  {
    "id": "smp9-persamaan-kuadrat",
    "judul": "Persamaan Kuadrat",
    "kelas": 9,
    "fase": "D",
    "domain": "aljabar",
    "ringkas": "Menyelesaikan persamaan kuadrat dengan pemfaktoran",
    "subKonsep": [
      "Bentuk umum ax pangkat 2 + bx + c = 0 dan syarat a tidak nol",
      "Penyelesaian dengan pemfaktoran",
      "Penyelesaian dengan melengkapkan kuadrat sempurna",
      "Rumus kuadratik (rumus abc) dan penurunannya",
      "Diskriminan dan banyaknya akar real",
      "Memodelkan masalah luas dan gerak dengan persamaan kuadrat"
    ],
    "rumus": [
      "ax pangkat 2 + bx + c = 0 dengan a tidak nol",
      "x = (-b plus minus akar (b pangkat 2 - 4ac)) / 2a",
      "D = b pangkat 2 - 4ac; D > 0 dua akar, D = 0 satu akar, D < 0 tanpa akar real",
      "Jumlah akar = -b/a; hasil kali akar = c/a"
    ],
    "miskonsepsi": [
      "Membagi kedua ruas dengan x sehingga kehilangan satu akar",
      "Mengira x pangkat 2 = 9 hanya punya penyelesaian x = 3",
      "Salah tanda pada -b di rumus abc ketika b sudah negatif"
    ],
    "kenapa": [
      "Dari mana rumus abc berasal — kenapa bentuknya begitu?",
      "Kenapa persamaan kuadrat bisa punya dua penyelesaian?"
    ],
    "prasyarat": [
      "smp8-pemfaktoran-bentuk-aljabar",
      "smp8-identitas-aljabar-dan-bentuk-kuadrat",
      "smp8-bentuk-akar-dan-bilangan-irasional"
    ]
  },
  {
    "id": "smp9-operasi-bentuk-akar-dan-merasionalkan",
    "judul": "Operasi Bentuk Akar dan Merasionalkan Penyebut",
    "kelas": 9,
    "fase": "D",
    "domain": "bilangan",
    "ringkas": "Menjumlah dan mengurangkan bentuk akar sejenis",
    "subKonsep": [
      "Penjumlahan dan pengurangan bentuk akar sejenis",
      "Perkalian dan pembagian bentuk akar",
      "Merasionalkan penyebut berbentuk akar tunggal",
      "Merasionalkan penyebut berbentuk a + akar b dengan sekawan",
      "Hubungan akar dan pangkat pecahan (pengantar Fase E)",
      "Penerapan pada perhitungan panjang sisi dan diagonal"
    ],
    "rumus": [
      "p akar a + q akar a = (p+q) akar a",
      "akar a x akar b = akar (ab)",
      "1/akar a = akar a / a",
      "1/(a + akar b) = (a - akar b) / (a pangkat 2 - b)"
    ],
    "miskonsepsi": [
      "Menjumlahkan akar tidak sejenis: 2 akar 3 + 3 akar 2 dikira 5 akar 5",
      "Mengira merasionalkan penyebut mengubah nilai bilangannya",
      "Salah memilih sekawan (mengubah tanda kedua suku sekaligus)"
    ],
    "kenapa": [
      "Kenapa penyebut perlu dirasionalkan padahal nilainya tidak berubah?",
      "Kenapa mengalikan dengan bentuk sekawan menghilangkan akar di penyebut?"
    ],
    "prasyarat": [
      "smp8-bentuk-akar-dan-bilangan-irasional",
      "smp8-identitas-aljabar-dan-bentuk-kuadrat"
    ]
  },
  {
    "id": "smp9-frekuensi-harapan",
    "judul": "Frekuensi Harapan",
    "kelas": 9,
    "fase": "D",
    "domain": "data",
    "ringkas": "Menghitung frekuensi harapan suatu kejadian",
    "subKonsep": [
      "Frekuensi harapan sebagai perkiraan banyak munculnya kejadian",
      "Menghitung frekuensi harapan dari peluang dan banyak percobaan",
      "Perbedaan frekuensi harapan dan frekuensi nyata",
      "Menentukan banyak percobaan dari frekuensi harapan yang diinginkan",
      "Penerapan pada perkiraan produksi cacat, hasil undian, dan cuaca",
      "Menggunakan frekuensi harapan untuk mengambil keputusan"
    ],
    "rumus": [
      "Fh = P(A) x n, dengan n banyak percobaan",
      "n = Fh / P(A)",
      "P(A) = Fh / n"
    ],
    "miskonsepsi": [
      "Mengira frekuensi harapan pasti terjadi persis sebanyak itu",
      "Mengira frekuensi harapan harus berupa bilangan bulat",
      "Mengalikan peluang dengan banyak kejadian, bukan banyak percobaan"
    ],
    "kenapa": [
      "Kenapa frekuensi harapan bisa berupa bilangan pecahan padahal kejadian selalu bulat?",
      "Kenapa hasil nyata hampir selalu berbeda dari frekuensi harapan?"
    ],
    "prasyarat": [
      "smp9-peluang-empiris-dan-frekuensi-relatif",
      "smp8-peluang-teoretis"
    ]
  },
  {
    "id": "smp9-peluang-empiris-dan-frekuensi-relatif",
    "judul": "Peluang Empiris dan Frekuensi Relatif",
    "kelas": 9,
    "fase": "D",
    "domain": "data",
    "ringkas": "Menghitung peluang empiris dari data percobaan",
    "subKonsep": [
      "Frekuensi relatif sebagai hasil percobaan nyata",
      "Peluang empiris versus peluang teoretis",
      "Hukum bilangan besar: frekuensi relatif mendekati peluang teoretis",
      "Melakukan percobaan berulang dan mencatat hasilnya",
      "Simulasi untuk memperkirakan peluang yang sulit dihitung",
      "Menilai keadilan (fairness) suatu alat dari data percobaan"
    ],
    "rumus": [
      "Peluang empiris = frekuensi kejadian / banyak percobaan",
      "Frekuensi relatif mendekati P(A) saat banyak percobaan makin besar",
      "Frekuensi relatif dinyatakan dalam pecahan, desimal, atau persen"
    ],
    "miskonsepsi": [
      "Mengira peluang empiris harus persis sama dengan peluang teoretis",
      "Menyimpulkan dadu tidak adil hanya dari 10 kali percobaan",
      "Mengira makin banyak percobaan makin kecil selisih jumlah munculnya (padahal yang mengecil adalah selisih proporsi)"
    ],
    "kenapa": [
      "Kenapa melempar koin 10 kali jarang menghasilkan tepat 5 angka dan 5 gambar?",
      "Kenapa makin banyak percobaan, frekuensi relatif makin mendekati peluang teoretis?"
    ],
    "prasyarat": [
      "smp8-peluang-teoretis",
      "smp7-merumuskan-pertanyaan-dan-mengumpulkan-data"
    ]
  },
  {
    "id": "smp9-pengaruh-perubahan-data-terhadap-ukuran",
    "judul": "Pengaruh Perubahan Data terhadap Ukuran Pemusatan",
    "kelas": 9,
    "fase": "D",
    "domain": "data",
    "ringkas": "Memprediksi perubahan mean, median, dan modus akibat perubahan data",
    "subKonsep": [
      "Pengaruh menambah satu data terhadap mean, median, dan modus",
      "Pengaruh menghapus data pencilan",
      "Pengaruh menambah nilai tetap pada semua data",
      "Pengaruh mengalikan semua data dengan bilangan tetap",
      "Ukuran mana yang paling peka dan paling tahan terhadap perubahan",
      "Menyelidiki perubahan lewat percobaan data"
    ],
    "rumus": [
      "Jika semua data ditambah c, maka mean, median, modus bertambah c; jangkauan tetap",
      "Jika semua data dikali k, maka mean, median, modus, dan jangkauan dikali k",
      "Mean baru = (jumlah lama + data baru) / (n + 1)"
    ],
    "miskonsepsi": [
      "Mengira menambah satu data selalu mengubah median",
      "Mengira mean selalu berubah sebesar nilai data yang ditambahkan",
      "Mengira menambah nilai tetap pada semua data mengubah jangkauan"
    ],
    "kenapa": [
      "Kenapa menambah satu data ekstrem menggeser mean tapi hampir tidak menggeser median?",
      "Kenapa menambah 5 pada semua nilai tidak mengubah jangkauan?"
    ],
    "prasyarat": [
      "smp8-ukuran-pemusatan-mean-median-dan",
      "smp8-jangkauan-dan-ukuran-penyebaran-data"
    ]
  },
  {
    "id": "smp9-populasi-sampel-dan-pengambilan-sampel",
    "judul": "Populasi, Sampel, dan Pengambilan Sampel",
    "kelas": 9,
    "fase": "D",
    "domain": "data",
    "ringkas": "Membedakan populasi dan sampel dalam suatu penelitian",
    "subKonsep": [
      "Populasi sebagai keseluruhan objek yang diteliti",
      "Sampel sebagai bagian populasi yang diamati",
      "Alasan mengambil sampel: waktu, biaya, dan kelayakan",
      "Sampel representatif dan sampel bias",
      "Cara pengambilan sampel acak sederhana",
      "Menarik kesimpulan tentang populasi dari sampel"
    ],
    "rumus": [
      "Perkiraan nilai populasi = (nilai pada sampel / ukuran sampel) x ukuran populasi",
      "Frekuensi relatif sampel dipakai sebagai perkiraan proporsi populasi",
      "Makin besar sampel acak, makin kecil kesalahan perkiraan"
    ],
    "miskonsepsi": [
      "Mengira sampel besar otomatis representatif meski cara pengambilannya bias",
      "Mengira sampel harus selalu berukuran persentase tetap dari populasi",
      "Mengeneralisasi hasil survei di satu kelas ke seluruh sekolah tanpa syarat"
    ],
    "kenapa": [
      "Kenapa mencicipi satu sendok sup cukup untuk menilai rasa sepanci sup?",
      "Kenapa survei online yang diisi sukarela bisa sangat menyesatkan?"
    ],
    "prasyarat": [
      "smp7-merumuskan-pertanyaan-dan-mengumpulkan-data",
      "sd6-konsep-rasio-dan-perbandingan"
    ]
  },
  {
    "id": "smp9-kekongruenan-bangun-datar-dan-segitiga",
    "judul": "Kekongruenan Bangun Datar dan Segitiga",
    "kelas": 9,
    "fase": "D",
    "domain": "geometri",
    "ringkas": "Menentukan pasangan sisi dan sudut bersesuaian",
    "subKonsep": [
      "Kongruen sebagai sama bentuk dan sama ukuran",
      "Sisi bersesuaian dan sudut bersesuaian",
      "Syarat kekongruenan segitiga: sisi-sisi-sisi (S-S-S)",
      "Syarat sisi-sudut-sisi (S-Sd-S) dan sudut-sisi-sudut (Sd-S-Sd)",
      "Syarat sudut-sudut-sisi (Sd-Sd-S) dan kasus khusus siku-siku",
      "Membuktikan kekongruenan dan memakainya untuk menemukan ukuran"
    ],
    "rumus": [
      "Kongruen jika semua sisi bersesuaian sama panjang dan semua sudut bersesuaian sama besar",
      "Kriteria: S-S-S, S-Sd-S, Sd-S-Sd, Sd-Sd-S",
      "S-S-Sd bukan kriteria kekongruenan yang sah"
    ],
    "miskonsepsi": [
      "Mengira sudut-sudut-sudut cukup untuk membuktikan kekongruenan",
      "Menyimpulkan kongruen hanya dari kesan visual gambar",
      "Salah memasangkan titik sudut bersesuaian sehingga urutan huruf keliru"
    ],
    "kenapa": [
      "Kenapa tiga sudut yang sama belum cukup untuk memastikan dua segitiga kongruen?",
      "Kenapa cukup tiga informasi untuk memastikan seluruh segitiga sama?"
    ],
    "prasyarat": [
      "smp7-segitiga-jenis-sifat-dan-garis",
      "smp7-jumlah-sudut-segitiga-dan-sudut",
      "smp7-segi-empat-dan-sifat-sifatnya"
    ]
  },
  {
    "id": "smp9-kesebangunan-bangun-datar-dan-segitiga",
    "judul": "Kesebangunan Bangun Datar dan Segitiga",
    "kelas": 9,
    "fase": "D",
    "domain": "geometri",
    "ringkas": "Membuktikan dua bangun sebangun dan menentukan faktor skalanya",
    "subKonsep": [
      "Sebangun sebagai sama bentuk tetapi boleh berbeda ukuran",
      "Sudut bersesuaian sama besar dan sisi bersesuaian sebanding",
      "Faktor skala kesebangunan",
      "Syarat kesebangunan segitiga: sudut-sudut, sisi-sisi-sisi sebanding, sisi-sudut-sisi",
      "Kesebangunan pada segitiga siku-siku bergaris tinggi",
      "Pengukuran tak langsung: tinggi pohon, lebar sungai"
    ],
    "rumus": [
      "Sisi bersesuaian sebanding: a1/a2 = b1/b2 = c1/c2 = k",
      "Sudut bersesuaian sama besar",
      "Segitiga siku-siku dengan garis tinggi: t pangkat 2 = p x q (proyeksi)",
      "Perbandingan luas bangun sebangun = k pangkat 2"
    ],
    "miskonsepsi": [
      "Mengira sebangun berarti kongruen",
      "Menyamakan sisi yang tidak bersesuaian saat menyusun perbandingan",
      "Mengira semua persegi panjang sebangun (padahal hanya jika rasio sisinya sama)"
    ],
    "kenapa": [
      "Kenapa semua persegi sebangun tapi tidak semua persegi panjang sebangun?",
      "Kenapa dua sudut yang sama sudah cukup untuk kesebangunan segitiga?"
    ],
    "prasyarat": [
      "smp9-kekongruenan-bangun-datar-dan-segitiga",
      "sd6-konsep-rasio-dan-perbandingan",
      "sd6-skala-pada-denah-dan-peta"
    ]
  },
  {
    "id": "smp9-transformasi-dilatasi",
    "judul": "Transformasi: Dilatasi",
    "kelas": 9,
    "fase": "D",
    "domain": "geometri",
    "ringkas": "Menentukan bayangan titik dan bangun oleh dilatasi",
    "subKonsep": [
      "Dilatasi sebagai perbesaran atau pengecilan terhadap titik pusat",
      "Faktor skala k dan maknanya",
      "Dilatasi dengan k > 1, 0 < k < 1, dan k negatif",
      "Dilatasi terhadap titik asal dan terhadap titik lain",
      "Sifat dilatasi: bukan isometri, tetapi menghasilkan bangun sebangun",
      "Hubungan dilatasi dengan kesebangunan dan skala"
    ],
    "rumus": [
      "Dilatasi pusat O faktor k: (x, y) -> (kx, ky)",
      "Dilatasi pusat P(a,b) faktor k: (x, y) -> (a + k(x - a), b + k(y - b))",
      "Luas bayangan = k pangkat 2 x luas asal"
    ],
    "miskonsepsi": [
      "Mengira dilatasi mengubah besar sudut",
      "Mengira faktor skala negatif berarti bangun mengecil",
      "Menghitung luas bayangan dengan mengalikan k, bukan k kuadrat"
    ],
    "kenapa": [
      "Kenapa dilatasi mengubah ukuran tetapi tidak mengubah besar sudut?",
      "Kenapa faktor skala negatif membuat bayangan terbalik melewati pusat?"
    ],
    "prasyarat": [
      "smp9-transformasi-rotasi",
      "smp9-kesebangunan-bangun-datar-dan-segitiga",
      "smp9-pengaruh-perubahan-proporsional-terhadap-panjang"
    ]
  },
  {
    "id": "smp9-transformasi-refleksi",
    "judul": "Transformasi: Refleksi",
    "kelas": 9,
    "fase": "D",
    "domain": "geometri",
    "ringkas": "Menentukan bayangan titik dan bangun oleh berbagai refleksi",
    "subKonsep": [
      "Refleksi sebagai pencerminan terhadap suatu garis",
      "Sumbu cermin sebagai sumbu simetri antara bangun dan bayangannya",
      "Refleksi terhadap sumbu-x, sumbu-y, dan titik asal",
      "Refleksi terhadap garis y = x dan y = -x",
      "Refleksi terhadap garis x = k dan y = k",
      "Sifat refleksi: isometri tetapi membalik orientasi"
    ],
    "rumus": [
      "Terhadap sumbu-x: (x, y) -> (x, -y)",
      "Terhadap sumbu-y: (x, y) -> (-x, y)",
      "Terhadap y = x: (x, y) -> (y, x); terhadap y = -x: (x, y) -> (-y, -x)",
      "Terhadap x = k: (x, y) -> (2k - x, y); terhadap y = k: (x, y) -> (x, 2k - y)"
    ],
    "miskonsepsi": [
      "Tertukar aturan refleksi terhadap sumbu-x dan sumbu-y",
      "Mengira refleksi terhadap y = x berarti menegatifkan koordinat, bukan menukarnya",
      "Mengira jarak bangun ke cermin boleh berbeda dari jarak bayangan ke cermin"
    ],
    "kenapa": [
      "Kenapa refleksi terhadap sumbu-x hanya mengubah tanda y?",
      "Kenapa refleksi terhadap garis y = x menukar posisi x dan y?"
    ],
    "prasyarat": [
      "smp9-transformasi-translasi",
      "smp8-koordinat-kartesius"
    ]
  },
  {
    "id": "smp9-transformasi-rotasi",
    "judul": "Transformasi: Rotasi",
    "kelas": 9,
    "fase": "D",
    "domain": "geometri",
    "ringkas": "Menentukan bayangan titik dan bangun oleh rotasi",
    "subKonsep": [
      "Rotasi sebagai perputaran terhadap suatu titik pusat",
      "Arah putaran positif (berlawanan jarum jam) dan negatif",
      "Rotasi 90, 180, dan 270 derajat terhadap titik asal",
      "Rotasi terhadap titik pusat selain titik asal",
      "Sifat rotasi: isometri dan mempertahankan orientasi",
      "Simetri putar bangun datar"
    ],
    "rumus": [
      "Rotasi 90 derajat berlawanan jarum jam: (x, y) -> (-y, x)",
      "Rotasi 180 derajat: (x, y) -> (-x, -y)",
      "Rotasi 270 derajat berlawanan jarum jam (atau -90): (x, y) -> (y, -x)",
      "Rotasi terhadap P(a,b): geser ke titik asal, putar, lalu geser kembali"
    ],
    "miskonsepsi": [
      "Mengira arah positif adalah searah jarum jam",
      "Tertukar aturan rotasi 90 derajat dan 270 derajat",
      "Mengira rotasi 180 derajat sama dengan refleksi terhadap satu garis"
    ],
    "kenapa": [
      "Kenapa rotasi 90 derajat menukar x dan y sekaligus mengubah satu tanda?",
      "Kenapa rotasi 180 derajat menghasilkan efek yang sama dari kedua arah?"
    ],
    "prasyarat": [
      "smp9-transformasi-refleksi",
      "smp8-koordinat-kartesius",
      "smp7-garis-dan-sudut"
    ]
  },
  {
    "id": "smp9-transformasi-translasi",
    "judul": "Transformasi: Translasi",
    "kelas": 9,
    "fase": "D",
    "domain": "geometri",
    "ringkas": "Menentukan bayangan titik dan bangun oleh translasi",
    "subKonsep": [
      "Translasi sebagai pergeseran tanpa memutar atau mencerminkan",
      "Vektor translasi (a, b) sebagai arah dan jarak geser",
      "Aturan translasi pada koordinat titik",
      "Translasi bangun datar sebagai translasi semua titik sudutnya",
      "Sifat translasi: bentuk dan ukuran tidak berubah (isometri)",
      "Komposisi dua translasi berturut-turut"
    ],
    "rumus": [
      "T(a,b): (x, y) -> (x + a, y + b)",
      "Komposisi: T(a,b) lalu T(c,d) sama dengan T(a+c, b+d)",
      "Translasi mempertahankan panjang, sudut, dan luas"
    ],
    "miskonsepsi": [
      "Mengira translasi mengubah ukuran bangun",
      "Salah arah pada komponen negatif vektor translasi",
      "Mengira translasi hanya bisa mendatar atau tegak"
    ],
    "kenapa": [
      "Kenapa translasi tidak mengubah bentuk maupun ukuran bangun?",
      "Kenapa dua translasi berturut-turut bisa digantikan satu translasi saja?"
    ],
    "prasyarat": [
      "smp8-koordinat-kartesius",
      "smp9-kekongruenan-bangun-datar-dan-segitiga"
    ]
  },
  {
    "id": "smp9-luas-permukaan-dan-volume-bola",
    "judul": "Luas Permukaan dan Volume Bola",
    "kelas": 9,
    "fase": "D",
    "domain": "pengukuran",
    "ringkas": "Menghitung luas permukaan dan volume bola",
    "subKonsep": [
      "Ciri bola: himpunan titik berjarak sama dari pusat",
      "Luas permukaan bola sama dengan empat kali luas lingkaran besarnya",
      "Percobaan menggulung tali atau membelah kulit jeruk untuk menemukan 4 pi r kuadrat",
      "Volume bola sebagai dua pertiga volume tabung yang mengurungnya",
      "Setengah bola dan bangun gabungan",
      "Penerapan pada bola olahraga, kubah, dan tangki bulat"
    ],
    "rumus": [
      "L permukaan bola = 4 x pi x r pangkat 2",
      "V bola = 4/3 x pi x r pangkat 3",
      "V setengah bola = 2/3 x pi x r pangkat 3",
      "L permukaan setengah bola padat = 3 x pi x r pangkat 2"
    ],
    "miskonsepsi": [
      "Memakai 2 pi r kuadrat untuk luas permukaan bola",
      "Tertukar antara pangkat dua pada luas dan pangkat tiga pada volume",
      "Mengira setengah bola luas permukaannya hanya setengah dari luas bola utuh"
    ],
    "kenapa": [
      "Kenapa luas permukaan bola tepat empat kali luas lingkaran yang sama jari-jarinya?",
      "Kenapa volume bola dua pertiga volume tabung yang pas mengurungnya?"
    ],
    "prasyarat": [
      "smp9-luas-permukaan-dan-volume-tabung",
      "sd6-keliling-dan-luas-lingkaran"
    ]
  },
  {
    "id": "smp9-luas-permukaan-dan-volume-kerucut",
    "judul": "Luas Permukaan dan Volume Kerucut",
    "kelas": 9,
    "fase": "D",
    "domain": "pengukuran",
    "ringkas": "Menghitung garis pelukis dengan teorema Pythagoras",
    "subKonsep": [
      "Ciri kerucut: alas lingkaran, satu titik puncak, dan selimut lengkung",
      "Garis pelukis (apotema) dan hubungannya dengan r dan t lewat Pythagoras",
      "Jaring-jaring kerucut: lingkaran alas dan juring besar",
      "Penurunan luas selimut dari juring lingkaran berjari-jari s",
      "Volume kerucut sepertiga volume tabung seukuran",
      "Penerapan pada topi, corong, dan tumpukan pasir"
    ],
    "rumus": [
      "s pangkat 2 = r pangkat 2 + t pangkat 2",
      "L selimut kerucut = pi x r x s",
      "L permukaan kerucut = pi x r x (r + s)",
      "V kerucut = 1/3 x pi x r pangkat 2 x t"
    ],
    "miskonsepsi": [
      "Memakai tinggi kerucut sebagai garis pelukis dalam rumus selimut",
      "Lupa mengalikan sepertiga pada volume kerucut",
      "Mengira luas selimut kerucut sama dengan luas lingkaran berjari-jari s"
    ],
    "kenapa": [
      "Kenapa luas selimut kerucut adalah pi r s, bukan pi s kuadrat?",
      "Kenapa volume kerucut tepat sepertiga volume tabung yang seukuran?"
    ],
    "konsep": [
      "kerucut-sepertiga"
    ],
    "prasyarat": [
      "smp9-luas-permukaan-dan-volume-tabung",
      "smp8-teorema-pythagoras",
      "smp8-sudut-pusat-sudut-keliling-panjang"
    ]
  },
  {
    "id": "smp9-luas-permukaan-dan-volume-tabung",
    "judul": "Luas Permukaan dan Volume Tabung",
    "kelas": 9,
    "fase": "D",
    "domain": "pengukuran",
    "ringkas": "Menghitung luas selimut, luas permukaan, dan volume tabung",
    "subKonsep": [
      "Ciri tabung: dua alas lingkaran kongruen dan selimut lengkung",
      "Jaring-jaring tabung: dua lingkaran dan satu persegi panjang",
      "Panjang persegi panjang selimut sama dengan keliling alas",
      "Luas permukaan tabung tertutup dan tabung terbuka",
      "Volume tabung sebagai luas alas lingkaran dikali tinggi",
      "Penerapan pada kaleng, pipa, drum, dan tangki"
    ],
    "rumus": [
      "L selimut tabung = 2 x pi x r x t",
      "L permukaan tabung = 2 x pi x r x (r + t)",
      "V tabung = pi x r pangkat 2 x t"
    ],
    "miskonsepsi": [
      "Mengira selimut tabung berbentuk lengkung sehingga luasnya tak bisa dihitung dengan persegi panjang",
      "Selalu memakai rumus tabung tertutup meski soal meminta tanpa tutup",
      "Tertukar antara tinggi tabung dan diameter alas"
    ],
    "kenapa": [
      "Kenapa selimut tabung kalau dibuka menjadi persegi panjang yang panjangnya keliling alas?",
      "Kenapa tabung sebenarnya adalah prisma dengan alas lingkaran?"
    ],
    "prasyarat": [
      "sd6-keliling-dan-luas-lingkaran",
      "smp8-luas-permukaan-dan-volume-prisma"
    ]
  },
  {
    "id": "smp9-pengaruh-perubahan-proporsional-terhadap-panjang",
    "judul": "Pengaruh Perubahan Proporsional terhadap Panjang, Luas, dan Volume",
    "kelas": 9,
    "fase": "D",
    "domain": "pengukuran",
    "ringkas": "Menghitung luas dan volume baru setelah penskalaan",
    "subKonsep": [
      "Faktor skala pada panjang, luas, dan volume",
      "Perubahan panjang berskala k membuat luas berskala k kuadrat",
      "Perubahan panjang berskala k membuat volume berskala k pangkat tiga",
      "Besar sudut tidak berubah oleh penskalaan",
      "Perbandingan luas dan volume bangun sebangun",
      "Penerapan pada model, maket, dan mengapa raksasa mustahil"
    ],
    "rumus": [
      "Panjang: k pangkat 1",
      "Luas: k pangkat 2",
      "Volume: k pangkat 3",
      "L1 : L2 = k1 pangkat 2 : k2 pangkat 2; V1 : V2 = k1 pangkat 3 : k2 pangkat 3"
    ],
    "miskonsepsi": [
      "Mengira melipatduakan panjang melipatduakan luas dan volume",
      "Mengira sudut ikut membesar saat bangun diperbesar",
      "Menghitung perbandingan volume dengan pangkat dua"
    ],
    "kenapa": [
      "Kenapa memperbesar panjang tiga kali membuat volume 27 kali lipat?",
      "Kenapa sudut tidak ikut membesar saat gambar di-zoom?"
    ],
    "prasyarat": [
      "smp9-kesebangunan-bangun-datar-dan-segitiga",
      "smp9-luas-permukaan-dan-volume-bola",
      "sd6-skala-pada-denah-dan-peta"
    ]
  },
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
  },
  {
    "id": "sma12-anuitas-pada-investasi-dan-pinjaman",
    "judul": "Anuitas pada Investasi dan Pinjaman",
    "kelas": 12,
    "fase": "F",
    "domain": "bilangan",
    "ringkas": "Menyusun skedul amortisasi pinjaman dengan spreadsheet",
    "subKonsep": [
      "Anuitas sebagai pembayaran tetap berkala pada tiap akhir periode",
      "Anuitas = angsuran pokok + bunga, dengan komposisi yang berubah tiap periode",
      "Nilai akan datang anuitas (menabung berkala) sebagai deret geometri",
      "Nilai sekarang anuitas (pinjaman) sebagai deret geometri diskonto",
      "Tabel/skedul amortisasi: sisa pokok pinjaman tiap periode",
      "Beda anuitas dengan cicilan flat",
      "Menghitung besar angsuran bila pokok, suku bunga, dan tenor diketahui"
    ],
    "rumus": [
      "FV = A[((1 + i)^n - 1)/i] (nilai akan datang anuitas)",
      "PV = A[(1 - (1 + i)^(-n))/i] (nilai sekarang anuitas)",
      "A = PV . i / (1 - (1 + i)^(-n)) (besar angsuran)",
      "Bunga periode ke-k = i x sisa pokok setelah periode ke-(k-1)",
      "Angsuran pokok ke-k = A - bunga periode ke-k"
    ],
    "miskonsepsi": [
      "Mengira bagian bunga dan bagian pokok dalam anuitas selalu tetap",
      "Menghitung total bunga sebagai pokok x i x n (rumus bunga tunggal)",
      "Menganggap tenor lebih panjang selalu lebih menguntungkan karena angsurannya kecil"
    ],
    "kenapa": [
      "Kenapa di awal masa cicilan hampir semua uang kita habis untuk bunga, bukan pokok?",
      "Kenapa angsuran tetap tapi sisa pokok turunnya makin lama makin cepat?"
    ],
    "prasyarat": [
      "sma10-bunga-tunggal-bunga-majemuk-dan",
      "sma10-barisan-dan-deret-geometri-serta"
    ]
  },
  {
    "id": "sma12-barisan-aritmetika",
    "judul": "Barisan Aritmetika",
    "kelas": 12,
    "fase": "F",
    "domain": "bilangan",
    "ringkas": "Menguji apakah sebuah barisan aritmetika dengan memeriksa keajekan beda",
    "subKonsep": [
      "Barisan sebagai daftar bilangan terurut; suku ke-n ditulis Un",
      "Beda (b) sebagai selisih tetap antara dua suku berurutan",
      "Suku pertama a (atau U1) sebagai titik awal barisan",
      "Menemukan rumus suku ke-n dari pola bertambah tetap",
      "Hubungan barisan aritmetika dengan fungsi linear: sama-sama berubah konstan, bedanya diskrit vs kontinu",
      "Menentukan banyak suku n bila Un diketahui",
      "Suku tengah barisan aritmetika dengan banyak suku ganjil",
      "Penerapan pada konteks nyata: susunan kursi bertingkat, tumpukan barang, cicilan tetap"
    ],
    "rumus": [
      "b = Un - U(n-1)",
      "Un = a + (n - 1)b",
      "Un = Um + (n - m)b",
      "Ut = (a + Un)/2 (suku tengah, n ganjil)"
    ],
    "miskonsepsi": [
      "Menganggap setiap barisan yang nilainya makin besar pasti aritmetika",
      "Menulis Un = a + n.b (lupa faktor n-1) sehingga hasil bergeser satu suku",
      "Menghitung beda sebagai U1 - U2 (terbalik) sehingga tanda b salah"
    ],
    "kenapa": [
      "Kenapa rumusnya a + (n-1)b, bukan a + nb? Dari mana angka satu yang dikurangi itu?",
      "Kenapa titik-titik barisan aritmetika kalau digambar selalu terletak pada satu garis lurus?"
    ],
    "prasyarat": [
      "smp8-pola-bilangan-dan-generalisasi",
      "smp9-fungsi-nonlinear-dan-perbandingannya-dengan",
      "smp7-operasi-bilangan-rasional"
    ]
  },
  {
    "id": "sma12-barisan-geometri",
    "judul": "Barisan Geometri",
    "kelas": 12,
    "fase": "F",
    "domain": "bilangan",
    "ringkas": "Membedakan pola tambah-tetap dan kali-tetap dari tabel atau grafik",
    "subKonsep": [
      "Rasio (r) sebagai pengali tetap antar suku berurutan",
      "Membedakan pertumbuhan aritmetika (ditambah tetap) dan geometri (dikali tetap)",
      "Rumus suku ke-n dan alasan pangkat (n-1)",
      "Perilaku barisan untuk r > 1, 0 < r < 1, dan r negatif (berselang-seling)",
      "Hubungan barisan geometri dengan fungsi eksponensial (diskrit vs kontinu)",
      "Suku tengah geometri sebagai rata-rata geometris",
      "Penerapan: pertumbuhan penduduk, peluruhan zat, penyebaran informasi, penggandaan sel"
    ],
    "rumus": [
      "r = Un / U(n-1)",
      "Un = a . r^(n-1)",
      "Un = Um . r^(n-m)",
      "Ut = akar(a . Un) (suku tengah, n ganjil)"
    ],
    "miskonsepsi": [
      "Menghitung rasio sebagai selisih (Un - U(n-1)) bukan hasil bagi",
      "Menulis Un = a.r^n sehingga hasil bergeser satu suku",
      "Mengira barisan geometri pasti membesar, padahal 0 < r < 1 membuatnya mengecil"
    ],
    "kenapa": [
      "Kenapa pangkatnya (n-1) dan bukan n? Berapa kali sebenarnya kita mengalikan?",
      "Kenapa pertumbuhan geometri akhirnya selalu menyalip pertumbuhan aritmetika, sebesar apa pun bedanya?"
    ],
    "prasyarat": [
      "smp8-barisan-aritmetika-dan-barisan-geometri",
      "sd4-sifat-sifat-operasi-hitung-bilangan",
      "sma10-fungsi-eksponensial-pertumbuhan-dan-peluruhan"
    ]
  },
  {
    "id": "sma12-bunga-majemuk",
    "judul": "Bunga Majemuk",
    "kelas": 12,
    "fase": "F",
    "domain": "bilangan",
    "ringkas": "Membedakan skema bunga tunggal dan majemuk dari brosur produk",
    "subKonsep": [
      "Bunga dihitung dari saldo terakhir, bukan modal awal (bunga berbunga)",
      "Bunga majemuk sebagai barisan geometri dengan rasio (1 + i)",
      "Pengaruh frekuensi penggabungan bunga (tahunan, bulanan, harian)",
      "Suku bunga nominal vs suku bunga efektif tahunan",
      "Nilai sekarang (present value) sebagai kebalikan nilai akan datang",
      "Aturan 72 sebagai perkiraan waktu penggandaan",
      "Simulasi numerik/grafis pengaruh perubahan i dan n"
    ],
    "rumus": [
      "Mn = M0 (1 + i)^n",
      "Mn = M0 (1 + i/m)^(m.n) untuk m kali penggabungan per tahun",
      "M0 = Mn / (1 + i)^n (nilai sekarang)",
      "i efektif = (1 + i/m)^m - 1",
      "n = log(Mn/M0) / log(1 + i)"
    ],
    "miskonsepsi": [
      "Mengira bunga majemuk 10% selama 3 tahun sama dengan bunga total 30%",
      "Menganggap bunga per bulan 1% sama persis dengan bunga per tahun 12%",
      "Menambahkan 1 di tempat yang salah, misalnya menulis M0 . i^n"
    ],
    "kenapa": [
      "Kenapa bunga majemuk melengkung ke atas sementara bunga tunggal lurus?",
      "Kenapa 12% per tahun yang digabung bulanan menghasilkan lebih dari 12%?"
    ],
    "prasyarat": [
      "smp8-barisan-aritmetika-dan-barisan-geometri",
      "smp7-bunga-tunggal-pajak-dan-literasi",
      "sma10-fungsi-eksponensial-pertumbuhan-dan-peluruhan"
    ]
  },
  {
    "id": "sma12-bunga-tunggal",
    "judul": "Bunga Tunggal",
    "kelas": 12,
    "fase": "F",
    "domain": "bilangan",
    "ringkas": "Mengenali ciri bunga tunggal dari deskripsi produk keuangan",
    "subKonsep": [
      "Modal awal (pokok), suku bunga per periode, dan lama periode",
      "Bunga selalu dihitung dari modal awal saja",
      "Bunga tunggal sebagai deret/barisan aritmetika",
      "Grafik saldo bunga tunggal berbentuk garis lurus",
      "Konversi satuan periode (bunga per tahun ke per bulan)",
      "Konteks: denda keterlambatan, pinjaman jangka pendek, bunga flat kredit kendaraan"
    ],
    "rumus": [
      "B = M0 x i x n (besar bunga)",
      "Mn = M0 (1 + i.n) (saldo akhir)",
      "i per bulan = i per tahun / 12"
    ],
    "miskonsepsi": [
      "Memakai suku bunga tahunan langsung untuk periode bulanan",
      "Menghitung bunga tunggal dari saldo terakhir, bukan dari modal awal",
      "Menganggap bunga flat pada kredit sama murahnya dengan bunga efektif yang nilainya sama"
    ],
    "kenapa": [
      "Kenapa saldo bunga tunggal naiknya lurus, bukan melengkung?",
      "Kenapa bunga flat 10% pada cicilan terasa jauh lebih mahal dari 10% efektif?"
    ],
    "prasyarat": [
      "smp8-barisan-aritmetika-dan-barisan-geometri",
      "smp7-perbandingan-senilai-dan-berbalik-nilai"
    ]
  },
  {
    "id": "sma12-deret-aritmetika",
    "judul": "Deret Aritmetika",
    "kelas": 12,
    "fase": "F",
    "domain": "bilangan",
    "ringkas": "Menurunkan rumus Sn dengan cara memasangkan suku (bukan menghafal)",
    "subKonsep": [
      "Deret sebagai jumlah suku-suku barisan: Sn = U1 + U2 + ... + Un",
      "Trik memasangkan suku depan dengan suku belakang (cara Gauss)",
      "Dua bentuk rumus Sn dan kapan masing-masing lebih praktis",
      "Hubungan balik Un = Sn - S(n-1)",
      "Sn sebagai fungsi kuadrat dalam n (grafik parabola)",
      "Deret aritmetika sebagai model total akumulasi (total kursi, total produksi, total bunga tunggal)"
    ],
    "rumus": [
      "Sn = (n/2)(a + Un)",
      "Sn = (n/2)(2a + (n - 1)b)",
      "Un = Sn - S(n-1)",
      "S(1+2+...+n) = n(n+1)/2"
    ],
    "miskonsepsi": [
      "Mengira Sn = n x Un (mengalikan banyak suku dengan suku terakhir)",
      "Memakai Un ketika soal meminta jumlah, dan sebaliknya",
      "Lupa bahwa n harus bilangan asli sehingga menerima akar negatif/pecahan sebagai jawaban"
    ],
    "kenapa": [
      "Kenapa jumlah 1 sampai 100 bisa dihitung cepat tanpa menjumlahkan satu per satu?",
      "Kenapa rumus Sn ada pembagian dua? Apa arti geometrisnya (dua tumpukan tangga dibalik jadi persegi panjang)?"
    ],
    "prasyarat": [
      "smp8-barisan-aritmetika-dan-barisan-geometri",
      "smp9-persamaan-kuadrat"
    ]
  },
  {
    "id": "sma12-deret-geometri",
    "judul": "Deret Geometri",
    "kelas": 12,
    "fase": "F",
    "domain": "bilangan",
    "ringkas": "Menurunkan rumus Sn dengan mengurangkan Sn dan r.Sn",
    "subKonsep": [
      "Jumlah n suku pertama deret geometri",
      "Penurunan rumus dengan trik Sn - r.Sn (teleskoping)",
      "Dua bentuk rumus untuk r < 1 dan r > 1 dan alasan keduanya setara",
      "Kasus khusus r = 1",
      "Deret geometri sebagai model total akumulasi bunga majemuk dan tabungan berkala",
      "Perbandingan pertumbuhan Sn deret aritmetika dan geometri"
    ],
    "rumus": [
      "Sn = a(1 - r^n)/(1 - r), untuk r tidak sama dengan 1",
      "Sn = a(r^n - 1)/(r - 1)",
      "Sn = n.a, untuk r = 1"
    ],
    "miskonsepsi": [
      "Memakai rumus Sn deret geometri untuk r = 1 sehingga penyebut nol",
      "Tertukar antara pembilang (1 - r^n) dan penyebut (1 - r)",
      "Mengira Sn deret geometri juga bisa dihitung dengan (n/2)(a + Un)"
    ],
    "kenapa": [
      "Kenapa mengurangkan Sn dengan r.Sn bisa membuat hampir semua suku lenyap?",
      "Kenapa rumus dengan (1-r) dan rumus dengan (r-1) memberi hasil yang sama?"
    ],
    "prasyarat": [
      "smp8-barisan-aritmetika-dan-barisan-geometri",
      "sma10-barisan-dan-deret-aritmetika",
      "sd4-sifat-sifat-operasi-hitung-bilangan"
    ]
  },
  {
    "id": "sma12-deret-geometri-tak-hingga",
    "judul": "Deret Geometri Tak Hingga",
    "kelas": 12,
    "fase": "F",
    "domain": "bilangan",
    "ringkas": "Memeriksa kekonvergenan sebelum memakai rumus",
    "subKonsep": [
      "Syarat konvergen -1 < r < 1 dan makna divergen",
      "Jumlah tak hingga sebagai nilai yang didekati Sn saat n makin besar",
      "Penurunan S tak hingga dari Sn ketika r^n mendekati nol",
      "Visualisasi luas persegi yang terus dibagi dua",
      "Mengubah desimal berulang menjadi pecahan",
      "Penerapan: panjang lintasan bola memantul, panjang total lipatan tali"
    ],
    "rumus": [
      "S(tak hingga) = a/(1 - r), untuk -1 < r < 1",
      "Panjang lintasan bola pantul = h + 2h.r/(1 - r)",
      "0,abab... = ab/99"
    ],
    "miskonsepsi": [
      "Yakin bahwa menjumlahkan tak hingga banyak bilangan positif pasti tak hingga",
      "Memakai rumus a/(1-r) walaupun |r| lebih dari atau sama dengan 1",
      "Lupa menggandakan lintasan naik-turun pada soal bola memantul"
    ],
    "kenapa": [
      "Kenapa menjumlahkan tak hingga banyak potongan bisa berhenti di angka tertentu?",
      "Kenapa 0,999... sama dengan 1, bukan sedikit di bawah 1?"
    ],
    "prasyarat": [
      "sma10-barisan-dan-deret-geometri-serta",
      "smp7-bilangan-rasional-dan-bentuk-pecahan"
    ]
  },
  {
    "id": "sma12-penyelidikan-parameter-model-investasi-dan",
    "judul": "Penyelidikan Parameter Model Investasi dan Pinjaman",
    "kelas": 12,
    "fase": "F",
    "domain": "bilangan",
    "ringkas": "Melakukan simulasi terkendali dengan spreadsheet/kalkulator/simulator daring",
    "subKonsep": [
      "Parameter model: nilai pokok, suku bunga per periode, frekuensi pembayaran, tenor",
      "Analisis sensitivitas: mengubah satu parameter dan menahan yang lain",
      "Representasi grafis pertumbuhan saldo vs waktu untuk beberapa suku bunga",
      "Menentukan parameter agar target keuangan tercapai (soal terbalik)",
      "Pengaruh pajak atas bunga dan biaya administrasi",
      "Pengambilan keputusan finansial berbasis data, bukan hafalan rumus"
    ],
    "rumus": [
      "Mn = M0 (1 + i/m)^(m.n) (model umum)",
      "A = PV . i / (1 - (1 + i)^(-n))",
      "Bunga bersih = bunga kotor x (1 - tarif pajak)"
    ],
    "miskonsepsi": [
      "Mengubah dua parameter sekaligus lalu menyimpulkan pengaruh salah satunya",
      "Mengira pengaruh suku bunga bersifat linear terhadap saldo akhir",
      "Melupakan pajak dan biaya sehingga hasil simulasi terlalu optimistis"
    ],
    "kenapa": [
      "Kenapa menaikkan suku bunga 1% berdampak jauh lebih besar pada tenor 20 tahun daripada 2 tahun?",
      "Kenapa membayar lebih sering (bulanan) mempercepat lunas walau totalnya per tahun sama?"
    ],
    "prasyarat": [
      "sma10-bunga-tunggal-bunga-majemuk-dan",
      "sma12-anuitas-pada-investasi-dan-pinjaman",
      "sma10-fungsi-eksponensial-pertumbuhan-dan-peluruhan"
    ]
  }
]
