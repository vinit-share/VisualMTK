/* ============================================================
   Visual MTK — Rincian topik kelas 5 (DIHASILKAN OTOMATIS)

   Jangan sunting berkas ini dengan tangan.
   Sumber: docs/riset/ (riset Capaian Pembelajaran Kepka BSKAP
   Kemendikdasmen No. 046/H/KR/2025).
   Bangun ulang: npm run bangun:kurikulum
   ============================================================ */

import type { TopikKurikulum } from '../kurikulum'

const topik: TopikKurikulum[] = [
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
 }
]

export default topik
