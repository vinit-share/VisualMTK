/* ============================================================
   Visual MTK — Rincian topik kelas 12 (DIHASILKAN OTOMATIS)

   Jangan sunting berkas ini dengan tangan.
   Sumber: docs/riset/ (riset Capaian Pembelajaran Kepka BSKAP
   Kemendikdasmen No. 046/H/KR/2025).
   Bangun ulang: npm run bangun:kurikulum
   ============================================================ */

import type { TopikKurikulum } from '../kurikulum'

const topik: TopikKurikulum[] = [
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
 },
 {
  "id": "sma12-aturan-penjumlahan-dan-aturan-perkalian",
  "judul": "Aturan Penjumlahan dan Aturan Perkalian (Kaidah Pencacahan)",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "ringkas": "Membedakan situasi 'pilih salah satu jalur' dari 'lakukan tahap demi tahap'",
  "subKonsep": [
   "Kapan memakai 'ATAU' (pilih satu jalur, dijumlahkan) dan kapan 'DAN' (tahap demi tahap, dikalikan)",
   "Aturan pengisian tempat dengan diagram kotak",
   "Diagram pohon sebagai gambar dari aturan perkalian",
   "Syarat sahnya aturan penjumlahan: kasus-kasusnya saling lepas",
   "Prinsip inklusi-eksklusi sederhana untuk kasus yang beririsan",
   "Pencacahan bersyarat: angka tidak berulang, harus genap, harus lebih dari sekian",
   "Strategi komplemen: hitung semua lalu kurangi yang tidak boleh"
  ],
  "rumus": [
   "aturan penjumlahan: n(A atau B) = n(A) + n(B) bila A dan B saling lepas",
   "inklusi-eksklusi: n(A gabung B) = n(A) + n(B) - n(A iris B)",
   "aturan perkalian: n = n1 x n2 x ... x nk",
   "banyak cara bersyarat = banyak semua cara - banyak cara terlarang"
  ],
  "miskonsepsi": [
   "Langsung mengalikan begitu melihat dua bilangan, tanpa mengecek apakah tahapnya berurutan",
   "Menganggap kata 'atau' selalu berarti dijumlahkan padahal kejadiannya beririsan",
   "Lupa bahwa pilihan berkurang bila unsur tidak boleh diulang (menulis 5 x 5 x 5 padahal 5 x 4 x 3)"
  ],
  "kenapa": [
   "Kenapa 'atau' dijumlahkan tapi 'dan' dikalikan? Apa gambarnya?",
   "Kenapa aturan penjumlahan rusak kalau kedua kelompok punya anggota bersama?"
  ],
  "prasyarat": [
   "sd4-sifat-sifat-operasi-hitung-bilangan"
  ]
 },
 {
  "id": "sma12-diagram-pohon-berbobot-dan-teorema",
  "judul": "Diagram Pohon Berbobot dan Teorema Bayes",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "ringkas": "Menggambar diagram pohon berbobot dua tingkat untuk soal pengambilan berurutan",
  "subKonsep": [
   "Diagram pohon berbobot: setiap cabang diberi peluang, jalur dikalikan",
   "Aturan peluang total: menjumlahkan semua jalur menuju hasil yang sama",
   "Membalik arah pohon untuk menjawab pertanyaan terbalik",
   "Teorema Bayes sebagai rumus dari pembalikan pohon",
   "Frekuensi alami (bayangkan 10.000 orang) sebagai cara paling mudah dipahami",
   "Penerapan pada tes medis, deteksi spam, dan kendali mutu",
   "Peluang awal (prior), bukti, dan peluang akhir (posterior)"
  ],
  "rumus": [
   "P(A iris B) = P(A) x P(B|A) (kalikan sepanjang cabang)",
   "peluang total: P(B) = P(A) P(B|A) + P(A komplemen) P(B|A komplemen)",
   "Bayes: P(A|B) = P(A) P(B|A) / P(B)"
  ],
  "miskonsepsi": [
   "Menjumlahkan peluang sepanjang satu cabang, bukan mengalikannya",
   "Mengabaikan peluang awal (base rate) sehingga hasil tes dianggap kepastian",
   "Mengira akurasi tes 99% berarti peluang benar-benar sakit juga 99%"
  ],
  "kenapa": [
   "Kenapa peluang sepanjang cabang dikalikan tetapi antar-cabang dijumlahkan?",
   "Kenapa tes yang akurat 99% bisa memberi hasil positif yang lebih sering salah daripada benar?"
  ],
  "prasyarat": [
   "sma12-peluang-bersyarat",
   "sma12-kejadian-majemuk-gabungan-dan-kejadian"
  ]
 },
 {
  "id": "sma12-faktorial-dan-permutasi",
  "judul": "Faktorial dan Permutasi",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "ringkas": "Menghitung nilai faktorial dan menyederhanakan pecahan faktorial tanpa kalkulator",
  "subKonsep": [
   "Faktorial n! sebagai hasil aturan perkalian yang pilihannya menyusut 1 tiap tahap",
   "Kesepakatan 0! = 1 dan alasannya dari pola n! = n x (n-1)!",
   "Permutasi = susunan yang MEMPERHATIKAN urutan",
   "Permutasi r unsur dari n unsur sebagai perkalian menyusut sebanyak r faktor",
   "Menurunkan P(n,r) = n!/(n-r)! dengan trik mengalikan dan membagi ekor faktorial",
   "Kasus khusus P(n,n) = n! dan P(n,1) = n",
   "Permutasi dengan unsur yang harus berdampingan (teknik pengelompokan)"
  ],
  "rumus": [
   "n! = n x (n-1) x (n-2) x ... x 2 x 1",
   "0! = 1",
   "P(n,r) = n! / (n-r)!",
   "P(n,n) = n!",
   "unsur berdampingan: perlakukan blok sebagai 1 unsur, lalu kalikan permutasi di dalam blok"
  ],
  "miskonsepsi": [
   "Menganggap 0! = 0",
   "Mengira (a x b)! = a! x b! atau (a+b)! = a! + b!",
   "Memakai permutasi untuk soal memilih regu yang urutannya tidak penting"
  ],
  "kenapa": [
   "Kenapa 0! harus bernilai 1 dan bukan 0?",
   "Dari mana pembagian n!/(n-r)! muncul, padahal yang kita lakukan hanya mengalikan r angka?"
  ],
  "prasyarat": [
   "sma12-aturan-penjumlahan-dan-aturan-perkalian"
  ]
 },
 {
  "id": "sma12-kejadian-majemuk-gabungan-dan-kejadian",
  "judul": "Kejadian Majemuk: Gabungan dan Kejadian Saling Lepas",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "ringkas": "Menentukan apakah dua kejadian bisa terjadi bersamaan atau tidak",
  "subKonsep": [
   "Kejadian majemuk sebagai gabungan/irisan beberapa kejadian",
   "Kejadian saling lepas (mutually exclusive): irisannya himpunan kosong, tidak bisa terjadi bersamaan",
   "Aturan penjumlahan peluang untuk kejadian saling lepas",
   "Aturan penjumlahan umum (inklusi-eksklusi) untuk kejadian yang beririsan",
   "Diagram Venn peluang: luas daerah sebagai peluang",
   "Beda 'saling lepas' dan 'komplemen' (komplemen pasti saling lepas, tetapi tidak sebaliknya)",
   "Perluasan ke tiga kejadian"
  ],
  "rumus": [
   "P(A gabung B) = P(A) + P(B) - P(A iris B)",
   "bila A dan B saling lepas: P(A iris B) = 0 sehingga P(A gabung B) = P(A) + P(B)",
   "P(A gabung B gabung C) = P(A)+P(B)+P(C) - P(A iris B) - P(A iris C) - P(B iris C) + P(A iris B iris C)",
   "P(A iris B komplemen) = P(A) - P(A iris B)"
  ],
  "miskonsepsi": [
   "Selalu menjumlahkan P(A) + P(B) tanpa memeriksa apakah kejadiannya beririsan",
   "Mencampuradukkan 'saling lepas' dengan 'saling bebas'",
   "Mengira P(A gabung B) tidak boleh lebih dari P(A) atau harus selalu 1"
  ],
  "kenapa": [
   "Kenapa irisan harus dikurangkan satu kali, bukan dua kali?",
   "Kenapa dua kejadian saling lepas justru TIDAK saling bebas?"
  ],
  "prasyarat": [
   "smp9-frekuensi-harapan"
  ]
 },
 {
  "id": "sma12-kejadian-saling-bebas-dan-aturan",
  "judul": "Kejadian Saling Bebas dan Aturan Perkalian Peluang",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "ringkas": "Menguji kebebasan dua kejadian dari tabel kontingensi atau ruang sampel",
  "subKonsep": [
   "Kejadian saling bebas: terjadinya A tidak mengubah peluang B",
   "Uji kebebasan: P(A iris B) = P(A) x P(B), atau P(B|A) = P(B)",
   "Pengambilan dengan pengembalian menghasilkan kejadian saling bebas",
   "Pengambilan tanpa pengembalian menghasilkan kejadian bergantung",
   "Kebebasan pada percobaan berulang (koin, dadu, kelahiran anak)",
   "Menghitung peluang rangkaian kejadian bebas dengan perkalian",
   "Beda tegas antara saling bebas (perkalian) dan saling lepas (penjumlahan)"
  ],
  "rumus": [
   "A dan B saling bebas jika dan hanya jika P(A iris B) = P(A) x P(B)",
   "P(A1 iris A2 iris ... iris An) = P(A1) x P(A2) x ... x P(An) bila semuanya saling bebas",
   "P(sekurang-kurangnya satu berhasil) = 1 - (1 - p)^n"
  ],
  "miskonsepsi": [
   "Menganggap saling bebas dan saling lepas itu sama",
   "Mengira semua kejadian dalam satu soal otomatis saling bebas",
   "Menerapkan P(A) x P(B) pada pengambilan tanpa pengembalian"
  ],
  "kenapa": [
   "Kenapa peluang kejadian bebas dikalikan, sedangkan kejadian saling lepas dijumlahkan?",
   "Kenapa dua kejadian yang tidak mungkin terjadi bersamaan justru sangat bergantung satu sama lain?"
  ],
  "prasyarat": [
   "sma12-kejadian-majemuk-gabungan-dan-kejadian",
   "sma12-menghitung-peluang-dengan-permutasi-dan"
  ]
 },
 {
  "id": "sma12-kombinasi-memilih-tanpa-memperhatikan-urutan",
  "judul": "Kombinasi: Memilih Tanpa Memperhatikan Urutan",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "ringkas": "Menguji cepat apakah soal memerlukan permutasi atau kombinasi",
  "subKonsep": [
   "Kombinasi = memilih sekelompok unsur, urutan tidak dipedulikan",
   "Hubungan permutasi dan kombinasi: setiap kelompok terhitung r! kali pada permutasi",
   "Menurunkan C(n,r) = P(n,r)/r! = n!/(r!(n-r)!)",
   "Sifat simetri C(n,r) = C(n, n-r) dan maknanya (memilih yang masuk = memilih yang keluar)",
   "C(n,0) = C(n,n) = 1 dan C(n,1) = n",
   "Kombinasi bertingkat: memilih dari beberapa kelompok lalu dikalikan",
   "Soal 'paling sedikit' dan 'paling banyak' yang dipecah menjadi kasus"
  ],
  "rumus": [
   "C(n,r) = n! / (r! (n-r)!)",
   "C(n,r) = P(n,r) / r!",
   "C(n,r) = C(n, n-r)",
   "C(n,0) = C(n,n) = 1",
   "sum dari r=0 sampai n dari C(n,r) = 2^n"
  ],
  "miskonsepsi": [
   "Memakai permutasi untuk soal memilih tim karena kata 'susunan' muncul di soal",
   "Mengira C(n,r) selalu lebih besar dari P(n,r)",
   "Menjumlahkan kombinasi kelompok yang seharusnya dikalikan (dan 3 putra DAN 2 putri)"
  ],
  "kenapa": [
   "Kenapa kombinasi harus dibagi r!? Apa tepatnya yang terhitung berulang?",
   "Kenapa memilih 3 dari 10 sama banyaknya dengan memilih 7 dari 10?"
  ],
  "prasyarat": [
   "sma12-faktorial-dan-permutasi",
   "sma12-aturan-penjumlahan-dan-aturan-perkalian"
  ]
 },
 {
  "id": "sma12-menghitung-peluang-dengan-permutasi-dan",
  "judul": "Menghitung Peluang dengan Permutasi dan Kombinasi",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "ringkas": "Memodelkan soal pengambilan bola/kartu dengan kombinasi yang tepat",
  "subKonsep": [
   "Memakai kombinasi untuk menghitung n(A) dan n(S) sekaligus",
   "Pengambilan tanpa pengembalian sebagai model kombinasi",
   "Pengambilan dengan pengembalian sebagai model permutasi berulang",
   "Soal klasik: bola berwarna dalam kotak, kartu remi, lotre",
   "Menyusun peluang sebagai hasil bagi dua kombinasi (distribusi hipergeometrik sederhana)",
   "Konsistensi: pembilang dan penyebut harus memakai cara mencacah yang sama",
   "Soal 'paling sedikit' diselesaikan lewat komplemen"
  ],
  "rumus": [
   "P(A) = C(k, r) x C(n-k, m-r) / C(n, m) (mengambil m benda, r di antaranya jenis tertentu)",
   "P(A) = P(n,r) di pembilang dan penyebut bila urutan diperhatikan",
   "P(sekurang-kurangnya satu) = 1 - P(tidak satu pun)"
  ],
  "miskonsepsi": [
   "Memakai kombinasi di pembilang tetapi permutasi di penyebut",
   "Mengira pengambilan sekaligus berbeda peluangnya dengan pengambilan satu per satu tanpa pengembalian",
   "Lupa mengurangi jumlah benda setelah pengambilan tanpa pengembalian"
  ],
  "kenapa": [
   "Kenapa mengambil 3 bola sekaligus sama peluangnya dengan mengambil satu per satu tanpa dikembalikan?",
   "Kenapa cara mencacah di atas dan di bawah pecahan harus sejenis?"
  ],
  "prasyarat": [
   "sma12-kombinasi-memilih-tanpa-memperhatikan-urutan",
   "smp9-frekuensi-harapan"
  ]
 },
 {
  "id": "sma12-peluang-bersyarat",
  "judul": "Peluang Bersyarat",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "ringkas": "Menghitung peluang bersyarat dari tabel kontingensi dan diagram Venn",
  "subKonsep": [
   "Peluang bersyarat P(B|A): peluang B dengan syarat A sudah terjadi",
   "Penyempitan ruang sampel: A menjadi 'dunia baru' tempat menghitung",
   "Menurunkan rumus P(B|A) = P(A iris B)/P(A) dari penyempitan ruang sampel",
   "Aturan perkalian umum P(A iris B) = P(A) x P(B|A)",
   "Membaca peluang bersyarat langsung dari tabel kontingensi",
   "Kebebasan sebagai kasus khusus: P(B|A) = P(B)",
   "P(B|A) tidak sama dengan P(A|B) dan bahaya membaliknya"
  ],
  "rumus": [
   "P(B|A) = P(A iris B) / P(A), dengan P(A) > 0",
   "P(A iris B) = P(A) x P(B|A) = P(B) x P(A|B)",
   "dari tabel: P(B|A) = n(A iris B) / n(A)",
   "A dan B saling bebas jika P(B|A) = P(B)"
  ],
  "miskonsepsi": [
   "Menukar P(B|A) dengan P(A|B) (kekeliruan jaksa penuntut)",
   "Membagi dengan n(S) padahal seharusnya dibagi n(A)",
   "Mengira syarat selalu memperkecil peluang"
  ],
  "kenapa": [
   "Kenapa mengetahui satu informasi bisa mengubah peluang, padahal kejadiannya sudah tetap?",
   "Kenapa penyebutnya berubah dari n(S) menjadi n(A)?"
  ],
  "prasyarat": [
   "sma12-kejadian-saling-bebas-dan-aturan",
   "sma11-tabel-kontingensi-dan-asosiasi-dua"
  ]
 },
 {
  "id": "sma12-permutasi-dengan-unsur-sama-permutasi",
  "judul": "Permutasi dengan Unsur Sama, Permutasi Siklis, dan Permutasi Berulang",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "ringkas": "Menghitung banyak susunan huruf pada kata yang memuat huruf kembar",
  "subKonsep": [
   "Permutasi unsur sama: membagi kelebihan hitungan akibat unsur yang tak terbedakan",
   "Contoh klasik menyusun huruf pada kata (MATEMATIKA, STATISTIKA)",
   "Permutasi siklis: susunan melingkar, hanya posisi relatif yang berarti",
   "Mengapa satu orang dipaku sebagai titik acuan pada susunan melingkar",
   "Susunan melingkar yang boleh dibalik (kalung, gelang) dibagi 2 lagi",
   "Permutasi berulang (dengan pengulangan) = n^r untuk pilihan yang boleh diulang",
   "Membedakan 'boleh diulang' dari 'tidak boleh diulang' dalam soal cerita"
  ],
  "rumus": [
   "permutasi unsur sama: n! / (n1! x n2! x ... x nk!)",
   "permutasi siklis: (n-1)!",
   "susunan melingkar yang bisa dibalik: (n-1)!/2",
   "permutasi berulang: n^r"
  ],
  "miskonsepsi": [
   "Menghitung MATEMATIKA sebagai 10! tanpa membagi huruf yang sama",
   "Memakai n! untuk susunan melingkar, lupa bahwa memutar meja tidak menghasilkan susunan baru",
   "Membagi 2 pada semua soal melingkar, padahal hanya berlaku bila susunan boleh dibalik"
  ],
  "kenapa": [
   "Kenapa huruf yang sama harus dibagi faktorialnya? Apa yang sebenarnya dihitung dua kali?",
   "Kenapa duduk melingkar hanya (n-1)! dan bukan n!?"
  ],
  "prasyarat": [
   "sma12-faktorial-dan-permutasi"
  ]
 },
 {
  "id": "sma12-ruang-sampel-kejadian-dan-frekuensi",
  "judul": "Ruang Sampel, Kejadian, dan Frekuensi Harapan",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "ringkas": "Mendaftar ruang sampel dengan tabel silang atau diagram pohon (dua dadu, dua koin)",
  "subKonsep": [
   "Percobaan acak, titik sampel, ruang sampel S, dan kejadian sebagai himpunan bagian S",
   "Ruang sampel berpeluang sama vs tidak sama (dadu adil vs paku payung)",
   "Definisi peluang klasik dan syarat titik sampel berpeluang sama",
   "Peluang empiris (frekuensi relatif) dan hukum bilangan besar",
   "Sifat dasar: 0 <= P(A) <= 1, P(S) = 1, P(himpunan kosong) = 0",
   "Kejadian komplemen dan peluangnya",
   "Frekuensi harapan sebagai peluang dikali banyak percobaan"
  ],
  "rumus": [
   "P(A) = n(A) / n(S)",
   "0 <= P(A) <= 1",
   "P(A komplemen) = 1 - P(A)",
   "frekuensi harapan = n x P(A)",
   "peluang empiris = banyak kemunculan / banyak percobaan"
  ],
  "miskonsepsi": [
   "Menulis n(S) = 11 untuk jumlah dua dadu karena mendaftar hasil jumlah, bukan pasangan",
   "Mengira peluang empiris yang menyimpang dari teoretis berarti dadunya curang",
   "Kekeliruan penjudi: mengira setelah 5 kali gambar, peluang angka jadi lebih besar"
  ],
  "kenapa": [
   "Kenapa peluang harus berupa bilangan antara 0 dan 1?",
   "Kenapa melempar dua dadu memberi 36 kemungkinan, bukan 12 atau 11?"
  ],
  "prasyarat": [
   "smp9-peluang-empiris-dan-frekuensi-relatif"
  ]
 },
 {
  "id": "sma12-segitiga-pascal-dan-binomial-newton",
  "judul": "Segitiga Pascal dan Binomial Newton",
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "ringkas": "Membangun segitiga Pascal beberapa baris tanpa rumus faktorial",
  "subKonsep": [
   "Segitiga Pascal sebagai tabel nilai C(n,r)",
   "Aturan penjumlahan Pascal: setiap bilangan adalah jumlah dua bilangan di atasnya",
   "Bukti kombinatorial aturan Pascal (unsur tertentu ikut dipilih atau tidak)",
   "Koefisien binomial pada penjabaran (a+b)^n",
   "Suku umum penjabaran binomial dan cara mencari suku ke-k",
   "Jumlah baris ke-n segitiga Pascal sama dengan 2^n",
   "Kaitannya dengan distribusi binomial yang akan datang"
  ],
  "rumus": [
   "C(n,r) = C(n-1, r-1) + C(n-1, r)",
   "(a+b)^n = sum dari r=0 sampai n dari C(n,r) a^(n-r) b^r",
   "suku ke-(r+1) = C(n,r) a^(n-r) b^r",
   "jumlah koefisien satu baris = 2^n"
  ],
  "miskonsepsi": [
   "Mengira segitiga Pascal hanya pola angka lucu, tanpa hubungan dengan memilih",
   "Salah menempatkan indeks: menganggap suku ke-r padahal C(n,r) menghasilkan suku ke-(r+1)",
   "Lupa bahwa pangkat a menurun sementara pangkat b menaik"
  ],
  "kenapa": [
   "Kenapa dua bilangan di atas dijumlahkan menghasilkan bilangan di bawahnya?",
   "Kenapa koefisien penjabaran (a+b)^n persis sama dengan banyak cara memilih?"
  ],
  "prasyarat": [
   "sma12-kombinasi-memilih-tanpa-memperhatikan-urutan",
   "smp7-operasi-penjumlahan-dan-pengurangan-bentuk"
  ]
 },
 {
  "id": "sma12-jarak-dalam-bangun-ruang",
  "judul": "Jarak dalam Bangun Ruang",
  "kelas": 12,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Menentukan proyeksi titik pada garis dan pada bidang",
  "subKonsep": [
   "Jarak selalu berarti panjang lintasan terpendek, yaitu ruas tegak lurus",
   "Jarak titik ke titik dan jarak titik ke garis lewat proyeksi",
   "Jarak titik ke bidang sebagai panjang ruas tegak lurus ke bidang",
   "Jarak garis ke bidang sejajar dan jarak dua bidang sejajar",
   "Jarak dua garis bersilangan lewat garis tegak lurus persekutuan",
   "Teknik segitiga bantu dan perbandingan luas untuk menghitung tinggi"
  ],
  "rumus": [
   "Jarak dua titik di ruang: d = akar((x2-x1)^2 + (y2-y1)^2 + (z2-z1)^2)",
   "Jarak titik ke garis: gunakan luas segitiga, t = 2L/alas",
   "Kubus rusuk a: jarak titik sudut ke diagonal ruang = a·akar(6)/3",
   "Kubus rusuk a: jarak titik sudut ke bidang diagonal = a·akar(2)/2",
   "Kubus rusuk a: jarak dua garis bersilangan tertentu = a·akar(3)/3"
  ],
  "miskonsepsi": [
   "Mengukur jarak sepanjang garis miring pada gambar, bukan sepanjang ruas tegak lurus",
   "Mengira jarak titik ke bidang sama dengan jarak titik ke salah satu titik pada bidang",
   "Mengabaikan langkah proyeksi dan langsung memakai rusuk terdekat"
  ],
  "kenapa": [
   "Kenapa jarak harus diukur tegak lurus, kenapa lintasan miring selalu lebih panjang?",
   "Kenapa jarak titik ke bidang diagonal kubus keluar sebagai a·akar(2)/2, dari mana akarnya?"
  ],
  "prasyarat": [
   "sma12-kedudukan-titik-garis-dan-bidang",
   "smp8-teorema-pythagoras"
  ]
 },
 {
  "id": "sma12-kedudukan-titik-garis-dan-bidang",
  "judul": "Kedudukan Titik, Garis, dan Bidang dalam Ruang",
  "kelas": 12,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Membaca gambar bangun ruang dan menyebut kedudukan unsur-unsurnya",
  "subKonsep": [
   "Titik, garis, dan bidang sebagai unsur dasar geometri ruang",
   "Aksioma penentuan bidang (tiga titik tak segaris, garis dan titik, dua garis berpotongan)",
   "Kedudukan dua garis: berpotongan, sejajar, berimpit, atau bersilangan",
   "Kedudukan garis terhadap bidang dan dua bidang terhadap satu sama lain",
   "Garis bersilangan sebagai hal yang khas ruang dan tidak ada pada bidang datar",
   "Bidang diagonal, diagonal ruang, dan diagonal sisi pada kubus dan balok"
  ],
  "rumus": [
   "Kubus rusuk a: diagonal sisi = a·akar(2) ; diagonal ruang = a·akar(3)",
   "Balok p,l,t: diagonal ruang = akar(p^2 + l^2 + t^2)",
   "Banyak diagonal ruang kubus/balok = 4 ; diagonal sisi = 12"
  ],
  "miskonsepsi": [
   "Mengira dua garis yang tidak berpotongan pada gambar pasti sejajar (padahal bersilangan)",
   "Mengira gambar perspektif menunjukkan panjang dan sudut yang sebenarnya",
   "Menyamakan diagonal sisi dengan diagonal ruang"
  ],
  "kenapa": [
   "Kenapa dua garis bisa tidak sejajar dan tidak pernah berpotongan sekaligus?",
   "Kenapa tiga titik selalu menentukan tepat satu bidang, tetapi empat titik belum tentu?"
  ],
  "prasyarat": [
   "sd5-keliling-bangun-datar",
   "smp8-teorema-pythagoras"
  ]
 },
 {
  "id": "sma12-sudut-dalam-bangun-ruang",
  "judul": "Sudut dalam Bangun Ruang",
  "kelas": 12,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Memproyeksikan garis ke bidang untuk memperoleh sudut yang benar",
  "subKonsep": [
   "Sudut antara dua garis berpotongan dan antara dua garis bersilangan (lewat garis sejajar bantu)",
   "Sudut antara garis dan bidang sebagai sudut garis dengan proyeksinya",
   "Sudut antara dua bidang (sudut tumpuan) dan garis potong sebagai sumbunya",
   "Membentuk segitiga bantu untuk menghitung sudut",
   "Penggunaan aturan cosinus untuk sudut pada bangun ruang",
   "Sudut istimewa pada kubus: diagonal ruang dengan alas, bidang diagonal dengan alas"
  ],
  "rumus": [
   "Sudut garis-bidang: sin theta = jarak tegak / panjang garis miring",
   "Aturan cosinus: cos theta = (b^2 + c^2 - a^2)/(2bc)",
   "Kubus: tan sudut diagonal ruang terhadap alas = 1/akar(2)",
   "Kubus: sudut antara dua bidang diagonal yang berpotongan = 60 derajat"
  ],
  "miskonsepsi": [
   "Membaca sudut langsung dari gambar dua dimensi",
   "Mengira sudut antara garis dan bidang adalah sudut dengan sembarang garis pada bidang itu",
   "Menentukan sudut dua bidang tanpa memastikan kedua kaki sudut tegak lurus garis potong"
  ],
  "kenapa": [
   "Kenapa dua garis yang tidak pernah bertemu tetap punya sudut yang jelas?",
   "Kenapa sudut garis dengan bidang diambil terhadap proyeksinya, kenapa itu yang paling kecil?"
  ],
  "prasyarat": [
   "sma12-jarak-dalam-bangun-ruang",
   "sma10-teorema-pythagoras-dan-segitiga-siku"
  ]
 },
 {
  "id": "sma12-bilangan-kompleks-pengayaan-di-luar",
  "judul": "Bilangan Kompleks (pengayaan di luar CP 2025)",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Menyederhanakan pangkat i",
  "subKonsep": [
   "Satuan imajiner i dengan i² = −1 sebagai jawaban atas akar bilangan negatif",
   "Bentuk kartesius a + bi: bagian real dan bagian imajiner",
   "Operasi penjumlahan, pengurangan, dan perkalian bilangan kompleks",
   "Konjugat dan pembagian bilangan kompleks",
   "Bidang Argand: bilangan kompleks sebagai titik dan sebagai vektor",
   "Modulus dan argumen; bentuk polar r(cos θ + i sin θ)",
   "Akar imajiner persamaan kuadrat selalu berpasangan konjugat"
  ],
  "rumus": [
   "i² = −1, i³ = −i, i⁴ = 1",
   "z = a + bi, dengan Re(z) = a dan Im(z) = b",
   "(a + bi) + (c + di) = (a + c) + (b + d)i",
   "(a + bi)(c + di) = (ac − bd) + (ad + bc)i",
   "konjugat z̄ = a − bi, dan z · z̄ = a² + b²",
   "|z| = √(a² + b²)"
  ],
  "miskonsepsi": [
   "Mengira √(−4) · √(−9) = √36 = 6, padahal hasilnya −6",
   "Mengira i adalah bilangan real yang sangat kecil atau sangat besar",
   "Mengira bilangan kompleks bisa diurutkan besar-kecil seperti bilangan real"
  ],
  "kenapa": [
   "Kenapa matematikawan perlu menciptakan i, dan masalah apa yang tidak bisa diselesaikan tanpanya?",
   "Kenapa mengalikan dengan i sama artinya dengan memutar 90° pada bidang?"
  ],
  "prasyarat": [
   "smp9-persamaan-kuadrat",
   "sma11-vektor-di-bidang-representasi-dan",
   "sma11-fungsi-trigonometri-dan-lingkaran-satuan"
  ]
 },
 {
  "id": "sma12-fungsi-akar-dan-domainnya",
  "judul": "Fungsi Akar dan Domainnya",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Menentukan domain dan range fungsi akar",
  "subKonsep": [
   "Bentuk f(x) = √(g(x)) dan syarat g(x) ≥ 0",
   "Fungsi akar sebagai invers fungsi kuadrat dengan domain dibatasi",
   "Bentuk grafik akar: setengah parabola yang direbahkan",
   "Transformasi grafik fungsi akar (geser, cermin, regang)",
   "Domain dan range fungsi akar pangkat genap vs pangkat ganjil",
   "Penerapan: rumus jarak, periode bandul, simpangan baku"
  ],
  "rumus": [
   "f(x) = √(g(x)) terdefinisi bila g(x) ≥ 0",
   "f(x) = a√(x − h) + k",
   "√(x²) = |x|, bukan x",
   "y = √x adalah invers dari y = x² pada domain x ≥ 0",
   "∛(x) terdefinisi untuk semua bilangan real"
  ],
  "miskonsepsi": [
   "Menulis √(x²) = x tanpa nilai mutlak",
   "Menulis √(a + b) = √a + √b",
   "Mengira domain fungsi akar adalah semua bilangan real"
  ],
  "kenapa": [
   "Kenapa √(x²) sama dengan |x|, bukan x?",
   "Kenapa grafik y = √x hanya setengah parabola, ke mana setengah yang lain?"
  ],
  "prasyarat": [
   "sma11-fungsi-invers",
   "sma10-bentuk-akar"
  ]
 },
 {
  "id": "sma12-fungsi-eksponensial-lanjutan",
  "judul": "Fungsi Eksponensial Lanjutan",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Menyketsa grafik fungsi eksponensial beserta asimtotnya",
  "subKonsep": [
   "Bentuk f(x) = a·bˣ dan syarat b > 0, b ≠ 1",
   "Perilaku grafik untuk b > 1 (pertumbuhan) dan 0 < b < 1 (peluruhan)",
   "Asimtot datar y = 0 dan alasannya",
   "Domain semua bilangan real, range bilangan positif",
   "Transformasi grafik eksponensial dan pergeseran asimtot",
   "Basis alami e dan pertumbuhan berkelanjutan",
   "Penerapan: pertumbuhan populasi, bunga majemuk, penyebaran virus, peluruhan radiasi"
  ],
  "rumus": [
   "f(x) = a · bˣ, dengan b > 0 dan b ≠ 1",
   "b^(m+n) = bᵐ · bⁿ",
   "b^(m−n) = bᵐ / bⁿ",
   "(bᵐ)ⁿ = b^(mn)",
   "b⁰ = 1 dan b^(−n) = 1/bⁿ",
   "f(x) = a·b^(x−h) + k dengan asimtot datar y = k"
  ],
  "miskonsepsi": [
   "Mengira grafik eksponensial akhirnya menyentuh sumbu-x",
   "Menukar bˣ dengan xᵇ",
   "Menulis b^(m) + b^(n) = b^(m+n)"
  ],
  "kenapa": [
   "Kenapa grafik eksponensial mendekati sumbu-x tanpa pernah menyentuhnya?",
   "Kenapa basis harus positif dan tidak boleh sama dengan 1?"
  ],
  "prasyarat": [
   "sma11-pemodelan-dunia-nyata-dengan-fungsi",
   "smp8-bilangan-berpangkat-bulat"
  ]
 },
 {
  "id": "sma12-fungsi-logaritma-dan-sifat-sifatnya",
  "judul": "Fungsi Logaritma dan Sifat-sifatnya",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Mengubah bentuk eksponen menjadi bentuk logaritma dan sebaliknya",
  "subKonsep": [
   "Logaritma sebagai jawaban pertanyaan \"pangkat berapa\"",
   "Fungsi logaritma sebagai invers fungsi eksponensial",
   "Grafik logaritma sebagai pencerminan grafik eksponensial terhadap y = x",
   "Asimtot tegak x = 0, domain x > 0, range semua bilangan real",
   "Sifat logaritma: perkalian menjadi penjumlahan, pembagian menjadi pengurangan, pangkat menjadi perkalian",
   "Pengubahan basis logaritma",
   "Penerapan: skala Richter, pH, desibel, kompleksitas algoritma"
  ],
  "rumus": [
   "ᵃlog b = c ⟺ aᶜ = b, dengan a > 0, a ≠ 1, b > 0",
   "ᵃlog(mn) = ᵃlog m + ᵃlog n",
   "ᵃlog(m/n) = ᵃlog m − ᵃlog n",
   "ᵃlog(mⁿ) = n · ᵃlog m",
   "ᵃlog b = (ᶜlog b) / (ᶜlog a)",
   "ᵃlog a = 1 dan ᵃlog 1 = 0"
  ],
  "miskonsepsi": [
   "Menulis log(m + n) = log m + log n",
   "Menulis log(m/n) = log m / log n",
   "Mengira logaritma bilangan negatif bernilai negatif, bukan tidak terdefinisi"
  ],
  "kenapa": [
   "Kenapa logaritma mengubah perkalian menjadi penjumlahan — apa hubungannya dengan sifat pangkat?",
   "Kenapa logaritma bilangan nol atau negatif tidak terdefinisi?"
  ],
  "prasyarat": [
   "sma12-fungsi-eksponensial-lanjutan",
   "sma11-fungsi-invers"
  ]
 },
 {
  "id": "sma12-fungsi-nilai-mutlak-fungsi-tangga",
  "judul": "Fungsi Nilai Mutlak, Fungsi Tangga, dan Fungsi Piecewise",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Menulis ulang fungsi nilai mutlak sebagai fungsi piecewise",
  "subKonsep": [
   "Nilai mutlak sebagai jarak dari nol pada garis bilangan",
   "Fungsi nilai mutlak ditulis ulang sebagai fungsi piecewise",
   "Fungsi piecewise: beberapa aturan yang berlaku pada interval domain berbeda",
   "Titik sambung: menentukan grafik kontinu atau terputus",
   "Fungsi tangga (pembulatan ke bawah/atas) dan grafik bertingkatnya",
   "Aturan pembacaan titik ujung: bulatan penuh (termasuk) vs bulatan kosong (tidak termasuk)",
   "Penerapan: tarif parkir bertingkat, pajak progresif, tarif listrik, biaya pengiriman"
  ],
  "rumus": [
   "|x| = x untuk x ≥ 0, dan |x| = −x untuk x < 0",
   "|x − a| = jarak antara x dan a",
   "f(x) = a₁(x) untuk x ∈ I₁; a₂(x) untuk x ∈ I₂; dan seterusnya",
   "Fungsi tangga: f(x) = ⌊x⌋ (bilangan bulat terbesar yang ≤ x)",
   "Kontinu di titik sambung c bila nilai kedua aturan sama di x = c"
  ],
  "miskonsepsi": [
   "Mengira |x| berarti mengubah tanda minus menjadi plus tanpa memahami maknanya sebagai jarak",
   "Menulis |a + b| = |a| + |b|",
   "Mengira |x| = 5 hanya punya satu penyelesaian"
  ],
  "kenapa": [
   "Kenapa nilai mutlak lebih tepat dibaca sebagai jarak daripada sebagai penghapus tanda minus?",
   "Kenapa |x| = 5 punya dua penyelesaian, tetapi |x| = −5 tidak punya sama sekali?"
  ],
  "prasyarat": [
   "sma11-fungsi-notasi-domain-range-dan",
   "smp9-transformasi-translasi"
  ]
 },
 {
  "id": "sma12-fungsi-rasional-dan-asimtotnya",
  "judul": "Fungsi Rasional dan Asimtotnya",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Menentukan domain fungsi rasional",
  "subKonsep": [
   "Bentuk f(x) = P(x)/Q(x) dengan P dan Q polinomial dan Q(x) ≠ 0",
   "Domain fungsi rasional: mengecualikan semua pembuat nol penyebut",
   "Asimtot tegak dari akar penyebut yang tidak tercoret oleh pembilang",
   "Asimtot datar dari perbandingan derajat pembilang dan penyebut",
   "Asimtot miring ketika derajat pembilang satu lebih besar dari penyebut",
   "Lubang (diskontinuitas terhapus) ketika ada faktor yang sama tercoret",
   "Titik potong sumbu dan uji tanda untuk menyketsa grafik",
   "Penerapan: biaya rata-rata per unit, laju kerja gabungan, efisiensi mesin"
  ],
  "rumus": [
   "f(x) = P(x)/Q(x), Q(x) ≠ 0",
   "Asimtot tegak x = a bila Q(a) = 0 dan P(a) ≠ 0",
   "deg P < deg Q ⟹ asimtot datar y = 0",
   "deg P = deg Q ⟹ asimtot datar y = aₙ/bₙ",
   "deg P = deg Q + 1 ⟹ asimtot miring y = hasil bagi P oleh Q",
   "Lubang di x = a bila (x − a) faktor bersama P dan Q"
  ],
  "miskonsepsi": [
   "Mengira grafik tidak pernah boleh memotong asimtot mana pun",
   "Mengira setiap pembuat nol penyebut pasti menghasilkan asimtot tegak, lupa kemungkinan lubang",
   "Menganggap asimtot sebagai bagian dari grafik yang ikut digambar tebal"
  ],
  "kenapa": [
   "Kenapa grafik meledak naik-turun mendekati asimtot tegak, tetapi hanya mendekat perlahan pada asimtot datar?",
   "Kenapa grafik boleh memotong asimtot datar tapi tidak boleh memotong asimtot tegak?"
  ],
  "prasyarat": [
   "sma11-pembagian-polinomial-dan-skema-horner",
   "sma11-fungsi-notasi-domain-range-dan"
  ]
 },
 {
  "id": "sma12-hasil-kali-skalar-proyeksi-dan",
  "judul": "Hasil Kali Skalar, Proyeksi, dan Vektor di Ruang (pengayaan di luar CP 2025)",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Menghitung hasil kali skalar dua vektor",
  "subKonsep": [
   "Vektor di ruang dimensi tiga: komponen (a₁, a₂, a₃) dan vektor satuan i, j, k",
   "Panjang vektor di ruang",
   "Hasil kali skalar (dot product) secara komponen dan secara sudut",
   "Menentukan sudut antara dua vektor",
   "Syarat tegak lurus: hasil kali skalar sama dengan nol",
   "Proyeksi skalar ortogonal dan proyeksi vektor ortogonal",
   "Penerapan: usaha dalam fisika, komponen gaya, sudut antar rusuk bangun ruang"
  ],
  "rumus": [
   "|a| = √(a₁² + a₂² + a₃²)",
   "a · b = a₁b₁ + a₂b₂ + a₃b₃",
   "a · b = |a||b| cos θ",
   "cos θ = (a · b) / (|a||b|)",
   "a ⊥ b ⟺ a · b = 0",
   "Proyeksi skalar a pada b: (a · b)/|b|"
  ],
  "miskonsepsi": [
   "Mengira hasil kali skalar menghasilkan vektor, bukan bilangan",
   "Menulis a · b = (a₁b₁, a₂b₂, a₃b₃)",
   "Mengira a · b = 0 berarti salah satu vektor pasti nol"
  ],
  "kenapa": [
   "Kenapa hasil kali dua vektor bisa menghasilkan sebuah bilangan, bukan vektor?",
   "Kenapa a · b = 0 tepat berarti kedua vektor saling tegak lurus?"
  ],
  "prasyarat": [
   "sma11-vektor-di-bidang-representasi-dan",
   "sma11-fungsi-trigonometri-dan-lingkaran-satuan"
  ]
 },
 {
  "id": "sma12-persamaan-dan-pertidaksamaan-eksponensial-serta",
  "judul": "Persamaan dan Pertidaksamaan Eksponensial serta Logaritma",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Menyelesaikan persamaan eksponensial dengan menyamakan basis atau memakai logaritma",
  "subKonsep": [
   "Menyamakan basis untuk menyelesaikan persamaan eksponensial",
   "Memakai logaritma ketika basis tidak dapat disamakan",
   "Persamaan eksponensial berbentuk kuadrat (permisalan)",
   "Persamaan logaritma dan syarat numerus positif",
   "Pertidaksamaan eksponensial: arah tanda berubah bila 0 < basis < 1",
   "Pertidaksamaan logaritma dan pemeriksaan syarat domain",
   "Penerapan: menghitung waktu penggandaan dan waktu paruh"
  ],
  "rumus": [
   "a^(f(x)) = a^(g(x)) ⟺ f(x) = g(x), untuk a > 0 dan a ≠ 1",
   "a^(f(x)) = b ⟺ f(x) = ᵃlog b",
   "ᵃlog f(x) = ᵃlog g(x) ⟺ f(x) = g(x), dengan f(x) > 0 dan g(x) > 0",
   "Untuk a > 1: a^(f(x)) > a^(g(x)) ⟺ f(x) > g(x)",
   "Untuk 0 < a < 1: a^(f(x)) > a^(g(x)) ⟺ f(x) < g(x)",
   "Waktu penggandaan: t = ᵇlog 2 / ᵇlog(1 + r)"
  ],
  "miskonsepsi": [
   "Tidak membalik tanda pertidaksamaan ketika basisnya antara 0 dan 1",
   "Lupa memeriksa syarat numerus > 0 sehingga menerima penyelesaian palsu",
   "Membagi kedua ruas dengan aˣ lalu kehilangan penyelesaian"
  ],
  "kenapa": [
   "Kenapa arah pertidaksamaan berbalik saat basisnya lebih kecil dari 1?",
   "Kenapa penyelesaian persamaan logaritma harus diuji ulang ke persamaan aslinya?"
  ],
  "prasyarat": [
   "sma12-fungsi-logaritma-dan-sifat-sifatnya",
   "sma10-persamaan-dan-pertidaksamaan-eksponensial-berbasis"
  ]
 },
 {
  "id": "sma12-distribusi-normal-dan-kurva-lonceng",
  "judul": "Distribusi Normal dan Kurva Lonceng",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "ringkas": "Membedakan histogram diskret dari kurva kepadatan kontinu",
  "subKonsep": [
   "Peralihan dari variabel diskret ke kontinu: dari batang menjadi kurva mulus",
   "Peluang variabel kontinu adalah LUAS di bawah kurva, bukan tinggi kurva",
   "Luas total di bawah kurva normal sama dengan 1",
   "Ciri kurva normal: simetris terhadap mu, berbentuk lonceng, asimtotik terhadap sumbu x",
   "Peran mu (letak puncak) dan sigma (lebar/kegemukan kurva)",
   "Titik belok kurva berada di mu - sigma dan mu + sigma",
   "Aturan empiris 68-95-99,7",
   "P(X = a) = 0 pada distribusi kontinu"
  ],
  "rumus": [
   "f(x) = (1 / (sigma akar(2 pi))) e^(-(x-mu)^2 / (2 sigma^2))",
   "luas total di bawah kurva = 1",
   "P(a <= X <= b) = luas daerah di bawah kurva antara a dan b",
   "P(mu - sigma < X < mu + sigma) kira-kira 68%",
   "P(mu - 2sigma < X < mu + 2sigma) kira-kira 95%",
   "P(mu - 3sigma < X < mu + 3sigma) kira-kira 99,7%"
  ],
  "miskonsepsi": [
   "Membaca tinggi kurva sebagai peluang",
   "Mengira P(X = 170) bisa bernilai positif pada distribusi kontinu",
   "Mengira semua data yang berbentuk 'gundukan' pasti normal"
  ],
  "kenapa": [
   "Kenapa peluang pada data kontinu berupa luas, bukan tinggi?",
   "Kenapa peluang tinggi badan tepat 170,000... cm sama dengan nol?"
  ],
  "prasyarat": [
   "sma12-percobaan-bernoulli-dan-distribusi-binomial",
   "smp8-jangkauan-dan-ukuran-penyebaran-data"
  ]
 },
 {
  "id": "sma12-distribusi-sampling-rata-rata-dan",
  "judul": "Distribusi Sampling Rata-rata dan Teorema Limit Pusat",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "ringkas": "Membedakan sebaran data individu dari sebaran rata-rata sampel",
  "subKonsep": [
   "Variasi antar sampel (sampling variability): tiap sampel memberi x_bar berbeda",
   "Distribusi sampling sebagai distribusi dari x_bar bila sampling diulang berkali-kali",
   "Rata-rata distribusi sampling sama dengan mu (penduga tak bias)",
   "Galat baku (standard error) mengecil sebanding 1/akar(n)",
   "Teorema Limit Pusat: bentuk distribusi x_bar mendekati normal untuk n cukup besar, apa pun bentuk populasinya",
   "Aturan praktis n >= 30 dan pengecualiannya",
   "Distribusi sampling proporsi p_topi",
   "Simulasi ulang-sampel sebagai cara melihat teorema ini bekerja"
  ],
  "rumus": [
   "E(x_bar) = mu",
   "galat baku: sigma_x_bar = sigma / akar(n)",
   "z = (x_bar - mu) / (sigma / akar(n))",
   "untuk proporsi: E(p_topi) = p dan sigma_p_topi = akar(p(1-p)/n)"
  ],
  "miskonsepsi": [
   "Mengira Teorema Limit Pusat membuat DATA menjadi normal (padahal yang normal adalah rata-rata sampel)",
   "Memakai sigma alih-alih sigma/akar(n) saat menghitung peluang tentang x_bar",
   "Mengira menggandakan n memotong galat baku menjadi setengah"
  ],
  "kenapa": [
   "Kenapa rata-rata sampel jauh lebih stabil daripada satu data tunggal?",
   "Kenapa galat baku dibagi akar n, bukan dibagi n?"
  ],
  "prasyarat": [
   "sma11-populasi-sampel-dan-teknik-sampling",
   "sma12-skor-z-dan-tabel-distribusi"
  ]
 },
 {
  "id": "sma12-nilai-harapan-dan-variansi-variabel",
  "judul": "Nilai Harapan dan Variansi Variabel Acak Diskret",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "ringkas": "Menghitung E(X) dan Var(X) dari tabel distribusi peluang",
  "subKonsep": [
   "Nilai harapan sebagai rata-rata berbobot peluang, bukan nilai yang pasti muncul",
   "Nilai harapan sebagai titik keseimbangan (titik tumpu) diagram batang distribusi",
   "Variansi sebagai rata-rata kuadrat simpangan terhadap nilai harapan",
   "Rumus pintas Var(X) = E(X^2) - [E(X)]^2",
   "Simpangan baku sebagai akar variansi, bersatuan sama dengan X",
   "Sifat linear: E(aX + b) = a E(X) + b dan Var(aX + b) = a^2 Var(X)",
   "Penerapan: permainan adil, ekspektasi keuntungan, premi asuransi"
  ],
  "rumus": [
   "E(X) = mu = sum x p(x)",
   "Var(X) = sigma^2 = sum (x - mu)^2 p(x)",
   "Var(X) = E(X^2) - [E(X)]^2",
   "sigma = akar dari Var(X)",
   "E(aX + b) = a E(X) + b",
   "Var(aX + b) = a^2 Var(X)"
  ],
  "miskonsepsi": [
   "Mengira nilai harapan pasti akan muncul (E(X) = 2,5 dianggap mustahil karena bukan bilangan bulat)",
   "Menghitung E(X) sebagai rata-rata biasa dari nilai X tanpa bobot peluang",
   "Menganggap Var(aX + b) = a Var(X) + b"
  ],
  "kenapa": [
   "Kenapa nilai harapan bisa berupa angka yang tidak mungkin terjadi?",
   "Kenapa nilai harapan adalah titik tumpu yang membuat diagram batang seimbang?"
  ],
  "prasyarat": [
   "sma12-variabel-acak-diskret-dan-fungsi",
   "smp8-jangkauan-dan-ukuran-penyebaran-data"
  ]
 },
 {
  "id": "sma12-pendugaan-parameter-dan-interval-kepercayaan",
  "judul": "Pendugaan Parameter dan Interval Kepercayaan",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "ringkas": "Menghitung interval kepercayaan untuk rata-rata dan proporsi dari data sampel",
  "subKonsep": [
   "Pendugaan titik (satu angka) vs pendugaan selang (rentang)",
   "Margin of error sebagai 'radius' ketidakpastian",
   "Membangun interval kepercayaan dari distribusi sampling",
   "Nilai kritis z untuk tingkat kepercayaan 90%, 95%, dan 99%",
   "Interval kepercayaan untuk rata-rata dan untuk proporsi",
   "Pengaruh n, sigma, dan tingkat kepercayaan terhadap lebar interval",
   "Tafsiran yang benar: 95% mengacu pada prosedur jangka panjang, bukan pada satu interval",
   "Membaca margin of error pada berita hasil survei"
  ],
  "rumus": [
   "IK rata-rata (sigma diketahui): x_bar plus-minus z_(alpha/2) x sigma/akar(n)",
   "IK proporsi: p_topi plus-minus z_(alpha/2) x akar(p_topi(1-p_topi)/n)",
   "margin of error E = z_(alpha/2) x sigma/akar(n)",
   "z untuk 90% = 1,645; 95% = 1,96; 99% = 2,576",
   "ukuran sampel minimum: n = (z sigma / E)^2"
  ],
  "miskonsepsi": [
   "Mengatakan 'peluang mu berada di interval ini adalah 95%' (mu bukan variabel acak)",
   "Mengira interval 99% lebih baik karena lebih sempit (justru lebih lebar)",
   "Mengira margin of error mencakup bias sampling dan kesalahan pertanyaan"
  ],
  "kenapa": [
   "Kenapa kita tidak cukup melaporkan satu angka dugaan saja?",
   "Kenapa dari mana angka 1,96 pada interval 95% berasal?"
  ],
  "prasyarat": [
   "sma12-distribusi-sampling-rata-rata-dan"
  ]
 },
 {
  "id": "sma12-percobaan-bernoulli-dan-distribusi-binomial",
  "judul": "Percobaan Bernoulli dan Distribusi Binomial",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "ringkas": "Memeriksa apakah sebuah situasi memenuhi keempat syarat binomial",
  "subKonsep": [
   "Percobaan Bernoulli: satu percobaan dengan tepat dua hasil (sukses/gagal)",
   "Empat syarat binomial: banyak percobaan tetap n, tiap percobaan bebas, dua hasil, peluang sukses p tetap",
   "Menurunkan rumus binomial: peluang satu urutan p^x q^(n-x), lalu dikalikan banyak urutan C(n,x)",
   "Peran C(n,x) sebagai penghitung banyaknya jalur pada diagram pohon",
   "Bentuk histogram binomial: simetris saat p = 0,5, menceng saat p jauh dari 0,5",
   "Nilai harapan dan variansi distribusi binomial",
   "Peluang kumulatif binomial dan soal 'paling sedikit'/'paling banyak'",
   "Batas kesahihan model binomial pada pengambilan tanpa pengembalian"
  ],
  "rumus": [
   "P(X = x) = C(n,x) p^x (1-p)^(n-x), untuk x = 0,1,...,n",
   "q = 1 - p",
   "E(X) = n p",
   "Var(X) = n p q",
   "sigma = akar(n p q)",
   "P(X >= 1) = 1 - P(X = 0) = 1 - q^n"
  ],
  "miskonsepsi": [
   "Lupa faktor C(n,x) sehingga hanya menghitung satu urutan",
   "Memakai binomial pada pengambilan tanpa pengembalian dari populasi kecil",
   "Mengira p harus selalu 0,5"
  ],
  "kenapa": [
   "Kenapa harus dikalikan C(n,x)? Apa yang dihitung angka itu?",
   "Kenapa koefisien binomial dari segitiga Pascal muncul lagi di sini?"
  ],
  "prasyarat": [
   "sma12-nilai-harapan-dan-variansi-variabel",
   "sma12-segitiga-pascal-dan-binomial-newton",
   "sma12-kejadian-saling-bebas-dan-aturan"
  ]
 },
 {
  "id": "sma12-skor-z-dan-tabel-distribusi",
  "judul": "Skor-z dan Tabel Distribusi Normal Baku",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "ringkas": "Mengubah nilai data menjadi skor-z dan sebaliknya",
  "subKonsep": [
   "Masalahnya: ada tak hingga banyak kurva normal, tetapi tabel hanya satu",
   "Transformasi baku: menggeser dengan mu lalu menyekala dengan sigma",
   "Distribusi normal baku Z dengan mu = 0 dan sigma = 1",
   "Makna skor-z: berapa simpangan baku sebuah nilai dari rata-ratanya",
   "Membaca tabel z sebagai luas kumulatif dari kiri",
   "Menghitung luas selang, luas ekor kanan, dan luas simetris",
   "Soal terbalik: dari peluang/persentil menuju nilai x",
   "Pendekatan normal terhadap binomial saat n besar (dengan koreksi kontinuitas)"
  ],
  "rumus": [
   "z = (x - mu) / sigma",
   "x = mu + z sigma",
   "P(X < x) = P(Z < z)",
   "P(a < X < b) = P(z_b) - P(z_a)",
   "P(Z > z) = 1 - P(Z < z)",
   "P(Z < -z) = 1 - P(Z < z)"
  ],
  "miskonsepsi": [
   "Membaca tabel z sebagai peluang ekor kanan padahal tabelnya kumulatif kiri",
   "Mengira skor-z negatif berarti peluang negatif",
   "Lupa menggambar sketsa sehingga salah menentukan luas mana yang dicari"
  ],
  "kenapa": [
   "Kenapa mengurangi mu lalu membagi sigma bisa membuat SEMUA kurva normal menjadi satu kurva yang sama?",
   "Kenapa satu tabel saja cukup untuk semua soal distribusi normal?"
  ],
  "prasyarat": [
   "sma12-distribusi-normal-dan-kurva-lonceng",
   "sma11-koefisien-korelasi-dan-kuat-lemahnya"
  ]
 },
 {
  "id": "sma12-uji-hipotesis-rata-rata-dan",
  "judul": "Uji Hipotesis Rata-rata dan Proporsi",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "ringkas": "Merumuskan H0 dan H1 dari pernyataan masalah nyata",
  "subKonsep": [
   "Logika bukti tak langsung: anggap H0 benar, lalu lihat seberapa aneh data kita",
   "Hipotesis nol H0 dan hipotesis alternatif H1 (satu arah dan dua arah)",
   "Statistik uji sebagai skor-z dari data terhadap dunia H0",
   "Nilai-p: peluang mendapat data seekstrem ini bila H0 benar",
   "Taraf signifikansi alpha dan daerah penolakan",
   "Galat jenis I (menolak H0 yang benar) dan galat jenis II",
   "Kesimpulan yang jujur: 'tidak cukup bukti' bukan 'H0 terbukti benar'",
   "Signifikansi statistik vs kebermaknaan praktis"
  ],
  "rumus": [
   "uji rata-rata (sigma diketahui): z = (x_bar - mu0) / (sigma / akar(n))",
   "uji proporsi: z = (p_topi - p0) / akar(p0(1-p0)/n)",
   "tolak H0 bila nilai-p < alpha",
   "dua arah: daerah penolakan |z| > z_(alpha/2)",
   "satu arah: z > z_alpha atau z < -z_alpha"
  ],
  "miskonsepsi": [
   "Menganggap nilai-p sebagai peluang bahwa H0 benar",
   "Menyimpulkan 'H0 terbukti benar' ketika gagal menolak H0",
   "Mengira hasil signifikan secara statistik pasti penting secara praktis"
  ],
  "kenapa": [
   "Kenapa kita menguji dugaan dengan cara mengandaikan lawannya benar lebih dulu?",
   "Kenapa nilai-p kecil membuat kita curiga pada H0, bukan membuktikan H1?"
  ],
  "prasyarat": [
   "sma12-pendugaan-parameter-dan-interval-kepercayaan",
   "sma12-skor-z-dan-tabel-distribusi"
  ]
 },
 {
  "id": "sma12-variabel-acak-diskret-dan-fungsi",
  "judul": "Variabel Acak Diskret dan Fungsi Peluang",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "data",
  "ringkas": "Mendefinisikan variabel acak dari sebuah percobaan (misal X = banyak angka pada 3 koin)",
  "subKonsep": [
   "Variabel acak sebagai aturan yang memetakan hasil percobaan ke bilangan",
   "Variabel acak diskret vs kontinu",
   "Fungsi peluang (distribusi peluang) sebagai daftar nilai beserta peluangnya",
   "Dua syarat wajib: setiap peluang tak negatif dan jumlah seluruh peluang sama dengan 1",
   "Menyajikan distribusi dalam tabel, diagram batang, dan rumus",
   "Fungsi distribusi kumulatif F(x) = P(X <= x)",
   "Distribusi seragam diskret sebagai kasus paling sederhana",
   "Memodelkan data nyata dengan variabel acak"
  ],
  "rumus": [
   "p(x) = P(X = x)",
   "p(x) >= 0 untuk setiap x",
   "sum p(x) = 1",
   "F(x) = P(X <= x) = sum p(t) untuk t <= x",
   "P(a < X <= b) = F(b) - F(a)"
  ],
  "miskonsepsi": [
   "Menganggap variabel acak sama dengan variabel aljabar biasa yang nilainya dicari",
   "Lupa memeriksa bahwa jumlah seluruh peluang harus 1",
   "Mencampur nilai X dengan peluang X pada tabel"
  ],
  "kenapa": [
   "Kenapa hasil percobaan yang berupa gambar/angka perlu diubah menjadi bilangan?",
   "Kenapa jumlah semua peluang harus tepat 1 dan tidak boleh 0,99?"
  ],
  "prasyarat": [
   "smp9-frekuensi-harapan",
   "sma12-menghitung-peluang-dengan-permutasi-dan"
  ]
 },
 {
  "id": "sma12-elips-dua-fokus-dan-jumlah",
  "judul": "Elips: Dua Fokus dan Jumlah Jarak Tetap",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Menentukan pusat, puncak, fokus, dan panjang sumbu dari persamaan",
  "subKonsep": [
   "Elips sebagai tempat kedudukan titik dengan jumlah jarak ke dua fokus tetap",
   "Konstruksi tali dan dua paku sebagai definisi yang bisa diperagakan",
   "Sumbu mayor, sumbu minor, puncak, pusat, dan fokus",
   "Hubungan a, b, c dan eksentrisitas e = c/a",
   "Persamaan baku elips horizontal dan vertikal, pusat O dan pusat (h,k)",
   "Penerapan: orbit planet (Hukum Kepler I), bilik bisik, lengkung arsitektur"
  ],
  "rumus": [
   "x^2/a^2 + y^2/b^2 = 1 (a > b, sumbu mayor mendatar)",
   "(x-h)^2/a^2 + (y-k)^2/b^2 = 1",
   "c^2 = a^2 - b^2",
   "e = c/a, dengan 0 < e < 1",
   "Jumlah jarak ke dua fokus = 2a ; latus rectum = 2b^2/a"
  ],
  "miskonsepsi": [
   "Memakai c^2 = a^2 + b^2 (rumus hiperbola) untuk elips",
   "Mengira a selalu penyebut di bawah x^2 tanpa memeriksa mana yang lebih besar",
   "Mengira fokus terletak pada kurva atau di ujung sumbu minor"
  ],
  "kenapa": [
   "Kenapa tali sepanjang tetap yang dikaitkan pada dua paku menghasilkan elips?",
   "Kenapa c^2 = a^2 - b^2 pada elips tetapi c^2 = a^2 + b^2 pada hiperbola?"
  ],
  "prasyarat": [
   "sma12-irisan-kerucut-satu-kerucut-empat",
   "sma12-persamaan-lingkaran-pada-bidang-koordinat"
  ]
 },
 {
  "id": "sma12-garis-singgung-irisan-kerucut",
  "judul": "Garis Singgung Irisan Kerucut",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Menerapkan aturan bagi adil pada keempat irisan kerucut",
  "subKonsep": [
   "Prinsip bagi adil (splitting) yang berlaku untuk semua irisan kerucut",
   "Garis singgung parabola melalui titik pada kurva dan dengan gradien m",
   "Garis singgung elips melalui titik pada kurva dan dengan gradien m",
   "Garis singgung hiperbola dan syarat menyinggungnya",
   "Syarat menyinggung lewat diskriminan nol sebagai metode umum",
   "Sifat pemantulan tiap kurva dan kaitannya dengan garis singgung"
  ],
  "rumus": [
   "Parabola y^2 = 4px di (x1,y1): y·y1 = 2p(x + x1)",
   "Elips di (x1,y1): x·x1/a^2 + y·y1/b^2 = 1",
   "Hiperbola di (x1,y1): x·x1/a^2 - y·y1/b^2 = 1",
   "Elips bergradien m: y = mx ± akar(a^2·m^2 + b^2)",
   "Hiperbola bergradien m: y = mx ± akar(a^2·m^2 - b^2)"
  ],
  "miskonsepsi": [
   "Menghafal empat rumus terpisah tanpa melihat pola bagi adil yang sama",
   "Menukar tanda plus dan minus pada rumus bergradien m antara elips dan hiperbola",
   "Mengira syarat menyinggung selalu D > 0"
  ],
  "kenapa": [
   "Kenapa aturan 'ganti x^2 jadi x·x1' berlaku untuk lingkaran, elips, parabola, sekaligus hiperbola?",
   "Kenapa syarat menyinggung selalu berujung pada diskriminan nol?"
  ],
  "prasyarat": [
   "sma12-garis-singgung-lingkaran-secara-analitik",
   "sma12-hiperbola-selisih-jarak-tetap-dan"
  ]
 },
 {
  "id": "sma12-garis-singgung-lingkaran-secara-analitik",
  "judul": "Garis Singgung Lingkaran secara Analitik",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Menyusun persamaan garis singgung untuk ketiga kasus baku",
  "subKonsep": [
   "Garis singgung melalui titik pada lingkaran (rumus bagi adil)",
   "Garis singgung dengan gradien m tertentu",
   "Garis singgung dari titik di luar lingkaran (selalu ada dua)",
   "Hubungan gradien garis singgung dan gradien jari-jari (saling tegak lurus)",
   "Garis polar sebagai alat menemukan titik singgung dari titik luar",
   "Penerapan pada lintasan, pantulan, dan desain lengkung jalan"
  ],
  "rumus": [
   "Titik (x1,y1) pada x^2 + y^2 = r^2: x·x1 + y·y1 = r^2",
   "Titik pada (x-a)^2+(y-b)^2=r^2: (x-a)(x1-a) + (y-b)(y1-b) = r^2",
   "Gradien m pada x^2+y^2=r^2: y = mx ± r·akar(m^2 + 1)",
   "Gradien m pada pusat (a,b): y - b = m(x - a) ± r·akar(m^2 + 1)",
   "m garis singgung × m jari-jari = -1"
  ],
  "miskonsepsi": [
   "Memakai rumus bagi adil untuk titik yang ternyata berada di luar lingkaran",
   "Mengira dari titik luar hanya ada satu garis singgung",
   "Lupa tanda plus-minus pada rumus garis singgung bergradien m"
  ],
  "kenapa": [
   "Kenapa rumus garis singgung cukup 'membagi adil' kuadrat menjadi x·x1 dan y·y1?",
   "Kenapa dari satu titik di luar lingkaran selalu ada tepat dua garis singgung?"
  ],
  "prasyarat": [
   "sma12-kedudukan-titik-garis-dan-dua",
   "sma11-garis-singgung-lingkaran-dan-garis"
  ]
 },
 {
  "id": "sma12-hiperbola-selisih-jarak-tetap-dan",
  "judul": "Hiperbola: Selisih Jarak Tetap dan Asimtot",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Menentukan pusat, puncak, fokus, dan persamaan asimtot dari persamaan hiperbola",
  "subKonsep": [
   "Hiperbola sebagai tempat kedudukan titik dengan selisih jarak ke dua fokus tetap",
   "Dua cabang, pusat, puncak, fokus, sumbu nyata dan sumbu imajiner",
   "Asimtot sebagai garis pemandu arah cabang di kejauhan",
   "Persegi panjang bantu untuk melukis asimtot",
   "Persamaan baku hiperbola horizontal dan vertikal, pusat O dan (h,k)",
   "Hiperbola ortogonal xy = k dan penerapan (navigasi LORAN, gelombang kejut, teleskop)"
  ],
  "rumus": [
   "x^2/a^2 - y^2/b^2 = 1 ; y^2/a^2 - x^2/b^2 = 1",
   "(x-h)^2/a^2 - (y-k)^2/b^2 = 1",
   "c^2 = a^2 + b^2",
   "Asimtot: y = ±(b/a)x untuk hiperbola horizontal berpusat O",
   "e = c/a > 1 ; selisih jarak ke dua fokus = 2a"
  ],
  "miskonsepsi": [
   "Menentukan arah cabang dari besar penyebut, bukan dari suku yang bertanda positif",
   "Memakai c^2 = a^2 - b^2 untuk hiperbola",
   "Mengira kurva hiperbola akan menyentuh asimtotnya"
  ],
  "kenapa": [
   "Kenapa selisih jarak yang tetap menghasilkan dua cabang, bukan satu kurva tertutup?",
   "Kenapa hiperbola mendekati asimtot tetapi tidak pernah menyentuhnya?"
  ],
  "prasyarat": [
   "sma12-elips-dua-fokus-dan-jumlah"
  ]
 },
 {
  "id": "sma12-irisan-kerucut-satu-kerucut-empat",
  "judul": "Irisan Kerucut: Satu Kerucut, Empat Kurva",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Mengaitkan sudut irisan bidang dengan jenis kurva yang dihasilkan",
  "subKonsep": [
   "Kerucut ganda dan bidang pengiris sebagai sumber semua kurva",
   "Sudut kemiringan bidang menentukan lingkaran, elips, parabola, atau hiperbola",
   "Definisi terpadu lewat fokus, direktriks, dan eksentrisitas",
   "Nilai eksentrisitas tiap kurva dan artinya",
   "Bentuk umum derajat dua Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0",
   "Irisan kerucut degenerat: titik, garis, dan dua garis berpotongan"
  ],
  "rumus": [
   "e = jarak ke fokus / jarak ke direktriks",
   "e = 0 lingkaran, 0 < e < 1 elips, e = 1 parabola, e > 1 hiperbola",
   "Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0",
   "Diskriminan B^2 - 4AC: negatif elips, nol parabola, positif hiperbola"
  ],
  "miskonsepsi": [
   "Mengira lingkaran dan elips adalah dua keluarga yang sama sekali terpisah",
   "Menganggap parabola pada irisan kerucut sama saja dengan grafik fungsi kuadrat y = ax^2 + bx + c",
   "Mengira hiperbola adalah dua kurva berbeda, bukan satu kurva dua cabang"
  ],
  "kenapa": [
   "Kenapa satu kerucut yang sama bisa menghasilkan empat kurva yang tampak sangat berbeda?",
   "Kenapa lingkaran hanyalah elips dengan dua fokus yang berimpit?"
  ],
  "prasyarat": [
   "sma12-persamaan-lingkaran-pada-bidang-koordinat"
  ]
 },
 {
  "id": "sma12-kedudukan-titik-garis-dan-dua",
  "judul": "Kedudukan Titik, Garis, dan Dua Lingkaran",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Menentukan posisi titik terhadap lingkaran tanpa menggambar",
  "subKonsep": [
   "Kedudukan titik: di dalam, pada, atau di luar lingkaran lewat kuasa titik",
   "Kedudukan garis terhadap lingkaran lewat jarak pusat ke garis",
   "Kedudukan garis lewat diskriminan hasil substitusi",
   "Kuasa titik terhadap lingkaran dan maknanya",
   "Kedudukan dua lingkaran: lepas, bersinggungan luar/dalam, berpotongan, sepusat",
   "Garis kuasa (radikal) dan tali busur persekutuan dua lingkaran"
  ],
  "rumus": [
   "Kuasa titik P: k = x1^2 + y1^2 + Ax1 + By1 + C",
   "Jarak pusat ke garis: d = |Aa + Bb + C|/akar(A^2 + B^2)",
   "d > r lepas, d = r menyinggung, d < r memotong",
   "Diskriminan D > 0 memotong, D = 0 menyinggung, D < 0 tidak memotong",
   "Bersinggungan luar bila jarak pusat = R + r ; dalam bila = |R - r|"
  ],
  "miskonsepsi": [
   "Menyimpulkan posisi titik dari tanda kuasa secara terbalik",
   "Membandingkan jarak pusat ke garis dengan r^2, bukan dengan r",
   "Mengira D = 0 berarti garis tidak menyentuh lingkaran"
  ],
  "kenapa": [
   "Kenapa memasukkan koordinat titik ke persamaan lingkaran bisa memberi tahu posisinya?",
   "Kenapa diskriminan nol tepat berarti garis menyinggung, bukan memotong?"
  ],
  "prasyarat": [
   "sma12-persamaan-lingkaran-pada-bidang-koordinat",
   "smp8-persamaan-garis-lurus-dan-gradien"
  ]
 },
 {
  "id": "sma12-parabola-fokus-direktriks-dan-persamaannya",
  "judul": "Parabola: Fokus, Direktriks, dan Persamaannya",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Menentukan puncak, fokus, direktriks, dan sumbu simetri dari persamaan",
  "subKonsep": [
   "Parabola sebagai tempat kedudukan titik berjarak sama ke fokus dan ke direktriks",
   "Unsur: titik puncak, fokus, direktriks, sumbu simetri, latus rectum",
   "Persamaan baku parabola horizontal dan vertikal dengan puncak O(0,0)",
   "Persamaan baku dengan puncak (h, k)",
   "Sifat pemantulan parabola: semua sinar sejajar sumbu dipantulkan ke fokus",
   "Penerapan: antena parabola, lampu sorot, kompor surya, jembatan"
  ],
  "rumus": [
   "y^2 = 4px (fokus (p,0), direktriks x = -p)",
   "x^2 = 4py (fokus (0,p), direktriks y = -p)",
   "(y - k)^2 = 4p(x - h)",
   "(x - h)^2 = 4p(y - k)",
   "Panjang latus rectum = |4p|"
  ],
  "miskonsepsi": [
   "Mengira semua parabola pasti terbuka ke atas atau ke bawah",
   "Menukar peran p sebagai jarak puncak-fokus dengan 4p",
   "Mengira fokus terletak pada kurva parabola"
  ],
  "kenapa": [
   "Kenapa antena parabola bisa mengumpulkan semua sinyal tepat di satu titik?",
   "Kenapa definisi 'jarak ke titik = jarak ke garis' menghasilkan kurva melengkung seperti itu?"
  ],
  "prasyarat": [
   "sma12-irisan-kerucut-satu-kerucut-empat",
   "sma10-fungsi-kuadrat-dan-grafiknya-parabola"
  ]
 },
 {
  "id": "sma12-persamaan-lingkaran-pada-bidang-koordinat",
  "judul": "Persamaan Lingkaran pada Bidang Koordinat",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Mengubah bentuk umum menjadi bentuk baku dan sebaliknya",
  "subKonsep": [
   "Lingkaran sebagai tempat kedudukan titik berjarak tetap dari pusat",
   "Bentuk baku dengan pusat (0,0) dan pusat (a,b)",
   "Bentuk umum x^2 + y^2 + Ax + By + C = 0",
   "Melengkapkan kuadrat untuk mengubah bentuk umum ke bentuk baku",
   "Syarat sebuah persamaan benar-benar mewakili lingkaran (jari-jari kuadrat positif)",
   "Menyusun persamaan lingkaran dari tiga titik atau dari syarat menyinggung suatu garis"
  ],
  "rumus": [
   "x^2 + y^2 = r^2",
   "(x - a)^2 + (y - b)^2 = r^2",
   "x^2 + y^2 + Ax + By + C = 0",
   "Pusat = (-A/2, -B/2) ; r = akar(A^2/4 + B^2/4 - C)"
  ],
  "miskonsepsi": [
   "Membaca pusat lingkaran (x - 3)^2 + (y + 2)^2 = 25 sebagai (-3, 2)",
   "Mengira r^2 = 25 berarti r = 25",
   "Lupa membagi -A/2 sehingga pusat dikira (-A, -B)"
  ],
  "kenapa": [
   "Kenapa persamaan lingkaran berbentuk kuadrat, dari mana Pythagoras masuk ke situ?",
   "Kenapa tanda di dalam kurung berlawanan dengan koordinat pusatnya?"
  ],
  "prasyarat": [
   "sma11-unsur-unsur-lingkaran-dan-hubungan",
   "smp8-identitas-aljabar-dan-bentuk-kuadrat"
  ]
 },
 {
  "id": "sma12-aturan-hasil-kali-dan-aturan",
  "judul": "Aturan Hasil Kali dan Aturan Hasil Bagi",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "kalkulus",
  "ringkas": "Menetapkan u dan v dengan tepat sebelum menerapkan aturan",
  "subKonsep": [
   "Bukti bahwa (f·g)' tidak sama dengan f'·g' lewat contoh sederhana",
   "Aturan hasil kali dan gagasan pertambahan luas persegi panjang",
   "Aturan hasil bagi dan syarat penyebut tidak nol",
   "Memilih strategi: menyederhanakan lebih dulu atau langsung memakai aturan",
   "Turunan fungsi rasional",
   "Perluasan aturan hasil kali untuk tiga faktor"
  ],
  "rumus": [
   "(u·v)' = u'·v + u·v'",
   "(u/v)' = (u'·v − u·v') / v²",
   "d/dx (1/v) = −v'/v²",
   "(u·v·w)' = u'vw + uv'w + uvw'"
  ],
  "miskonsepsi": [
   "Menulis (u·v)' = u'·v'",
   "Membalik urutan pengurangan pada aturan hasil bagi menjadi (uv' − u'v)",
   "Lupa mengkuadratkan penyebut pada aturan hasil bagi"
  ],
  "kenapa": [
   "Kenapa (u·v)' bukan u'·v'? Coba uji dengan u = x dan v = x.",
   "Kenapa aturan hasil kali menghasilkan dua suku — apa hubungannya dengan pertambahan luas persegi panjang?"
  ],
  "prasyarat": [
   "sma11-aturan-turunan-dasar-pangkat-kelipatan",
   "smp7-operasi-penjumlahan-dan-pengurangan-bentuk",
   "sma10-fungsi-kuadrat-dan-grafiknya-parabola"
  ]
 },
 {
  "id": "sma12-aturan-rantai",
  "judul": "Aturan Rantai",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "kalkulus",
  "ringkas": "Mengidentifikasi fungsi dalam dan fungsi luar pada bentuk komposisi",
  "subKonsep": [
   "Mengenali fungsi komposisi dan memisahkan lapisan luar dan dalam",
   "Aturan rantai dalam notasi Lagrange dan notasi Leibniz",
   "Turunan bentuk (ax + b)ⁿ",
   "Aturan rantai bertingkat lebih dari dua lapis",
   "Gagasan laju berantai (roda gigi bersusun)",
   "Aturan rantai sebagai kunci pada laju perubahan terkait"
  ],
  "rumus": [
   "(f ∘ g)'(x) = f'(g(x)) · g'(x)",
   "dy/dx = dy/du · du/dx",
   "d/dx (ax + b)ⁿ = a·n·(ax + b)ⁿ⁻¹",
   "d/dx (√(u)) = u' / (2√u)"
  ],
  "miskonsepsi": [
   "Lupa mengalikan dengan turunan fungsi dalam",
   "Mengira d/dx (sin 2x) = cos 2x",
   "Mencoret du pada notasi Leibniz seolah-olah pecahan biasa tanpa memahami maknanya"
  ],
  "kenapa": [
   "Kenapa turunan fungsi dalam ikut dikalikan?",
   "Kenapa laju perubahan bisa berlipat, seperti dua roda gigi yang bersusun?"
  ],
  "prasyarat": [
   "sma11-komposisi-fungsi",
   "sma11-aturan-turunan-dasar-pangkat-kelipatan",
   "sma12-aturan-hasil-kali-dan-aturan"
  ]
 },
 {
  "id": "sma12-integral-dengan-substitusi",
  "judul": "Integral dengan Substitusi",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "kalkulus",
  "ringkas": "Memilih substitusi u yang membuat integran menjadi sederhana",
  "subKonsep": [
   "Mengenali pola f(g(x))·g'(x) di dalam integran",
   "Memilih u dan menghitung du",
   "Substitusi pada bentuk (ax + b)ⁿ dan munculnya faktor 1/a",
   "Substitusi pada integral trigonometri",
   "Mengembalikan hasil ke variabel semula pada integral tak tentu",
   "Penyesuaian batas pada integral tentu"
  ],
  "rumus": [
   "∫ f(g(x))·g'(x) dx = ∫ f(u) du dengan u = g(x)",
   "∫ (ax + b)ⁿ dx = (ax + b)ⁿ⁺¹ / (a(n+1)) + C",
   "∫ sin(ax) dx = −cos(ax)/a + C",
   "∫ₐᵇ f(g(x))g'(x) dx = ∫_{g(a)}^{g(b)} f(u) du"
  ],
  "miskonsepsi": [
   "Mengganti bagian integran tetapi lupa mengganti dx dengan du",
   "Lupa membagi dengan koefisien a pada bentuk (ax + b)ⁿ",
   "Lupa mengembalikan u menjadi x pada integral tak tentu"
  ],
  "kenapa": [
   "Kenapa metode substitusi sebenarnya adalah aturan rantai yang dibalik?",
   "Kenapa muncul faktor 1/a ketika mengintegralkan (ax + b)ⁿ?"
  ],
  "prasyarat": [
   "sma12-integral-tak-tentu-sebagai-antiturunan",
   "sma12-aturan-rantai",
   "sma11-komposisi-fungsi"
  ]
 },
 {
  "id": "sma12-integral-parsial",
  "judul": "Integral Parsial",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "kalkulus",
  "ringkas": "Memilih u dan dv sehingga integral sisa lebih mudah",
  "subKonsep": [
   "Aturan parsial diturunkan dari aturan hasil kali turunan",
   "Memilih u dan dv beserta panduan urutan (logaritma, aljabar, trigonometri, eksponen)",
   "Menerapkan integral parsial dua kali",
   "Integral siklik yang kembali ke bentuk semula",
   "Integral ln x sebagai kasus khusus",
   "Integral parsial pada integral tentu"
  ],
  "rumus": [
   "∫ u dv = u·v − ∫ v du",
   "d(uv) = u dv + v du",
   "∫ x·eˣ dx = x·eˣ − eˣ + C",
   "∫ ln x dx = x·ln x − x + C"
  ],
  "miskonsepsi": [
   "Salah tanda pada suku −∫ v du",
   "Memilih u yang justru membuat integral makin rumit",
   "Mengira 'parsial' berarti mengintegralkan sebagian integran saja"
  ],
  "kenapa": [
   "Kenapa aturan hasil kali pada turunan bisa berubah menjadi metode untuk mengintegralkan?",
   "Kenapa pemilihan u sangat menentukan mudah atau sulitnya penyelesaian?"
  ],
  "prasyarat": [
   "sma12-integral-dengan-substitusi",
   "sma12-aturan-hasil-kali-dan-aturan",
   "sma12-integral-tak-tentu-sebagai-antiturunan"
  ]
 },
 {
  "id": "sma12-integral-tak-tentu-sebagai-antiturunan",
  "judul": "Integral Tak Tentu sebagai Antiturunan",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "kalkulus",
  "ringkas": "Mengintegralkan polinomial dan bentuk pangkat pecahan",
  "subKonsep": [
   "Integral sebagai proses membalik turunan",
   "Keluarga fungsi yang turunannya sama dan lahirnya konstanta C",
   "Aturan pangkat untuk integral dan syarat n ≠ −1",
   "Integral fungsi trigonometri dasar",
   "Integral eksponensial dan integral 1/x",
   "Menentukan nilai C dari syarat awal (satu titik yang dilalui)"
  ],
  "rumus": [
   "∫ xⁿ dx = xⁿ⁺¹/(n+1) + C, n ≠ −1",
   "∫ (1/x) dx = ln|x| + C",
   "∫ eˣ dx = eˣ + C",
   "∫ sin x dx = −cos x + C",
   "∫ cos x dx = sin x + C",
   "∫ k·f(x) dx = k ∫ f(x) dx"
  ],
  "miskonsepsi": [
   "Lupa menuliskan konstanta C",
   "Memakai aturan pangkat untuk n = −1 sehingga muncul pembagian dengan nol",
   "Menulis ∫ f·g dx = ∫f dx · ∫g dx"
  ],
  "kenapa": [
   "Kenapa harus ada +C — apa yang hilang saat kita menurunkan?",
   "Kenapa aturan pangkat integral gagal tepat di n = −1, dan kenapa jawabannya justru logaritma?"
  ],
  "prasyarat": [
   "sma11-aturan-turunan-dasar-pangkat-kelipatan",
   "sma11-turunan-fungsi-trigonometri",
   "sma11-turunan-fungsi-eksponensial-dan-logaritma"
  ]
 },
 {
  "id": "sma12-jumlah-riemann-dan-integral-tentu",
  "judul": "Jumlah Riemann dan Integral Tentu",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "kalkulus",
  "ringkas": "Menaksir luas dengan sejumlah persegi panjang dan membandingkan taksiran atas-bawah",
  "subKonsep": [
   "Menaksir luas daerah lengkung dengan persegi panjang (titik kiri, kanan, tengah)",
   "Memperbanyak partisi dan menyempitkan lebar Δx",
   "Integral tentu sebagai limit jumlah Riemann",
   "Notasi ∫ dari a ke b dan makna setiap bagiannya",
   "Sifat integral tentu: batas dibalik, pemecahan selang, linearitas",
   "Luas bertanda dan nilai rata-rata fungsi pada selang"
  ],
  "rumus": [
   "∫ₐᵇ f(x) dx = lim(n→∞) Σᵢ f(xᵢ)·Δx, dengan Δx = (b − a)/n",
   "∫ₐᵇ f(x) dx = −∫_b^a f(x) dx",
   "∫ₐᶜ f + ∫_c^b f = ∫ₐᵇ f",
   "∫ₐᵃ f(x) dx = 0",
   "nilai rata-rata = 1/(b − a) · ∫ₐᵇ f(x) dx"
  ],
  "miskonsepsi": [
   "Mengira integral tentu selalu sama dengan luas, padahal yang dihitung adalah luas bertanda",
   "Mengira Δx bisa benar-benar bernilai nol",
   "Mengira hasil integral tentu masih memuat variabel x"
  ],
  "kenapa": [
   "Kenapa luas daerah berbatas kurva lengkung bisa dihitung memakai persegi panjang yang jelas-jelas tidak pas?",
   "Kenapa hasilnya menjadi tepat hanya ketika banyak partisi menuju tak hingga?"
  ],
  "konsep": [
   "integral-luas"
  ],
  "prasyarat": [
   "sma11-konsep-dan-pengertian-limit-fungsi",
   "sma12-integral-tak-tentu-sebagai-antiturunan"
  ]
 },
 {
  "id": "sma12-luas-daerah-dengan-integral",
  "judul": "Luas Daerah dengan Integral",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "kalkulus",
  "ringkas": "Membuat sketsa daerah sebelum menyusun integral",
  "subKonsep": [
   "Luas daerah antara kurva dan sumbu x",
   "Daerah yang berada di bawah sumbu x dan penanganan tandanya",
   "Luas daerah antara dua kurva: kurva atas dikurangi kurva bawah",
   "Menentukan batas integrasi dari titik potong kedua kurva",
   "Integrasi terhadap sumbu y sebagai alternatif",
   "Memecah daerah menjadi beberapa bagian bila posisi kurva bertukar"
  ],
  "rumus": [
   "L = ∫ₐᵇ f(x) dx bila f(x) ≥ 0 pada [a, b]",
   "L = ∫ₐᵇ |f(x)| dx",
   "L = ∫ₐᵇ (f(x) − g(x)) dx dengan f di atas g",
   "L = ∫_c^d x(y) dy untuk integrasi terhadap sumbu y",
   "luas daerah parabola dan garis: L = |D|√D / (6a²) (rumus cepat)"
  ],
  "miskonsepsi": [
   "Menghitung tanpa sketsa sehingga salah menentukan kurva atas dan bawah",
   "Menuliskan (bawah − atas) sehingga luas menjadi negatif",
   "Memakai satu integral padahal kurva bertukar posisi di titik potong"
  ],
  "kenapa": [
   "Kenapa luas di antara dua kurva cukup 'yang atas dikurangi yang bawah', tanpa peduli letaknya terhadap sumbu x?",
   "Kenapa daerah di bawah sumbu x memberi hasil integral negatif?"
  ],
  "prasyarat": [
   "sma12-teorema-dasar-kalkulus",
   "smp8-sistem-persamaan-linear-dua-variabel",
   "sma12-jumlah-riemann-dan-integral-tentu"
  ]
 },
 {
  "id": "sma12-teorema-dasar-kalkulus",
  "judul": "Teorema Dasar Kalkulus",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "kalkulus",
  "ringkas": "Menghitung integral tentu dengan mencari antiturunan lalu mengurangkan",
  "subKonsep": [
   "Fungsi akumulasi F(x) = ∫ₐˣ f(t) dt sebagai luas yang bertambah",
   "Teorema Dasar Kalkulus I: turunan fungsi akumulasi kembali menjadi f(x)",
   "Teorema Dasar Kalkulus II: menghitung integral tentu lewat antiturunan",
   "Jembatan antara masalah gradien dan masalah luas",
   "Alasan konstanta C tidak berpengaruh pada integral tentu",
   "Syarat kekontinuan agar teorema berlaku"
  ],
  "rumus": [
   "d/dx ∫ₐˣ f(t) dt = f(x)",
   "∫ₐᵇ f(x) dx = F(b) − F(a) dengan F'(x) = f(x)",
   "notasi [F(x)]ₐᵇ = F(b) − F(a)",
   "d/dx ∫ₐ^{u(x)} f(t) dt = f(u(x))·u'(x)"
  ],
  "miskonsepsi": [
   "Menuliskan +C pada hasil integral tentu",
   "Membalik urutan menjadi F(a) − F(b)",
   "Menerapkan teorema pada fungsi yang tidak kontinu di selang tersebut, misalnya 1/x pada [−1, 1]"
  ],
  "kenapa": [
   "Kenapa laju bertambahnya luas tepat sama dengan tinggi kurva di tepi kanan?",
   "Kenapa cukup mengurangkan dua nilai antiturunan untuk mendapat luas, tanpa menjumlahkan ribuan persegi panjang?"
  ],
  "prasyarat": [
   "sma12-jumlah-riemann-dan-integral-tentu",
   "sma12-integral-tak-tentu-sebagai-antiturunan",
   "sma11-kekontinuan-fungsi"
  ]
 },
 {
  "id": "sma12-volume-benda-putar",
  "judul": "Volume Benda Putar",
  "lanjut": true,
  "kelas": 12,
  "fase": "F",
  "domain": "kalkulus",
  "ringkas": "Menentukan sumbu putar, jari-jari, dan batas integrasi dari sketsa",
  "subKonsep": [
   "Membentuk benda putar dengan memutar daerah mengelilingi sumbu x atau sumbu y",
   "Metode cakram: irisan tipis berbentuk tabung sangat pendek",
   "Metode cincin (washer) untuk daerah antara dua kurva",
   "Menentukan jari-jari irisan dari fungsi",
   "Menentukan batas integrasi sesuai sumbu putar",
   "Metode kulit tabung sebagai alternatif (pengayaan)"
  ],
  "rumus": [
   "V = π ∫ₐᵇ [f(x)]² dx (cakram, sumbu x)",
   "V = π ∫ₐᵇ ([f(x)]² − [g(x)]²) dx (cincin, sumbu x)",
   "V = π ∫_c^d [x(y)]² dy (cakram, sumbu y)",
   "V = 2π ∫ₐᵇ x·f(x) dx (kulit tabung)"
  ],
  "miskonsepsi": [
   "Menuliskan (f − g)² padahal seharusnya f² − g²",
   "Lupa mengalikan dengan π",
   "Memakai batas pada sumbu x padahal daerah diputar mengelilingi sumbu y"
  ],
  "kenapa": [
   "Kenapa muncul π dan kuadrat pada rumus volume benda putar?",
   "Kenapa (f − g)² salah untuk metode cincin, padahal untuk luas kita memakai (f − g)?"
  ],
  "prasyarat": [
   "sma12-luas-daerah-dengan-integral",
   "sd6-mengenal-prisma-tabung-limas-kerucut",
   "sma12-teorema-dasar-kalkulus"
  ]
 }
]

export default topik
