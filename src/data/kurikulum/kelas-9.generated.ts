/* ============================================================
   Visual MTK — Rincian topik kelas 9 (DIHASILKAN OTOMATIS)

   Jangan sunting berkas ini dengan tangan.
   Sumber: docs/riset/ (riset Capaian Pembelajaran Kepka BSKAP
   Kemendikdasmen No. 046/H/KR/2025).
   Bangun ulang: npm run bangun:kurikulum
   ============================================================ */

import type { TopikKurikulum } from '../kurikulum'

const topik: TopikKurikulum[] = [
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
 }
]

export default topik
