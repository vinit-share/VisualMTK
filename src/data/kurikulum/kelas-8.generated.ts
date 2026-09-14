/* ============================================================
   Visual MTK — Rincian topik kelas 8 (DIHASILKAN OTOMATIS)

   Jangan sunting berkas ini dengan tangan.
   Sumber: docs/riset/ (riset Capaian Pembelajaran Kepka BSKAP
   Kemendikdasmen No. 046/H/KR/2025).
   Bangun ulang: npm run bangun:kurikulum
   ============================================================ */

import type { TopikKurikulum } from '../kurikulum'

const topik: TopikKurikulum[] = [
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
  "konsep": [
   "kuadrat-jumlah"
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
 }
]

export default topik
