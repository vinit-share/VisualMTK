/* ============================================================
   Visual MTK — Rincian topik kelas 6 (DIHASILKAN OTOMATIS)

   Jangan sunting berkas ini dengan tangan.
   Sumber: docs/riset/ (riset Capaian Pembelajaran Kepka BSKAP
   Kemendikdasmen No. 046/H/KR/2025).
   Bangun ulang: npm run bangun:kurikulum
   ============================================================ */

import type { TopikKurikulum } from '../kurikulum'

const topik: TopikKurikulum[] = [
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
 }
]

export default topik
