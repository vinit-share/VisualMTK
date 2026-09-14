/* ============================================================
   Visual MTK — Rincian topik kelas 11 (DIHASILKAN OTOMATIS)

   Jangan sunting berkas ini dengan tangan.
   Sumber: docs/riset/ (riset Capaian Pembelajaran Kepka BSKAP
   Kemendikdasmen No. 046/H/KR/2025).
   Bangun ulang: npm run bangun:kurikulum
   ============================================================ */

import type { TopikKurikulum } from '../kurikulum'

const topik: TopikKurikulum[] = [
 {
  "id": "sma11-aljabar-fungsi-operasi-pada-dua",
  "judul": "Aljabar Fungsi: Operasi pada Dua Fungsi",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Menyusun rumus f+g, f−g, f·g, dan f/g dari dua fungsi yang diberikan",
  "subKonsep": [
   "Penjumlahan dan pengurangan fungsi sebagai penjumlahan nilai titik demi titik",
   "Perkalian dan pembagian dua fungsi",
   "Domain hasil operasi adalah irisan domain, dengan syarat tambahan penyebut tidak nol",
   "Membaca hasil operasi secara grafis: menumpuk ordinat dua grafik",
   "Konteks nyata: keuntungan = pendapatan − biaya, biaya per unit = biaya total ÷ jumlah unit",
   "Mengurai fungsi rumit menjadi operasi fungsi-fungsi sederhana"
  ],
  "rumus": [
   "(f + g)(x) = f(x) + g(x)",
   "(f − g)(x) = f(x) − g(x)",
   "(f · g)(x) = f(x) · g(x)",
   "(f / g)(x) = f(x) / g(x), dengan g(x) ≠ 0",
   "D_(f±g) = D_f ∩ D_g",
   "D_(f/g) = D_f ∩ D_g ∩ { x | g(x) ≠ 0 }"
  ],
  "miskonsepsi": [
   "Mengira domain hasil operasi adalah domain fungsi yang paling luas, bukan irisannya",
   "Menyamakan (f · g)(x) dengan (f ∘ g)(x)",
   "Menyederhanakan f/g lalu mengira titik terlarangnya ikut hilang"
  ],
  "kenapa": [
   "Kenapa domain hasil penjumlahan hanya irisan, bukan gabungan dua domain?",
   "Kenapa setelah (x²−1)/(x−1) disederhanakan menjadi x+1, nilai x = 1 tetap dilarang?"
  ],
  "prasyarat": [
   "sma11-fungsi-notasi-domain-range-dan",
   "smp7-operasi-penjumlahan-dan-pengurangan-bentuk"
  ]
 },
 {
  "id": "sma11-fungsi-invers",
  "judul": "Fungsi Invers",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Menentukan rumus f⁻¹ untuk fungsi linear, pecahan linear, kuadrat (dengan domain dibatasi), dan eksponensial",
  "subKonsep": [
   "Invers sebagai membalik mesin: menukar peran input dan output",
   "Syarat keberadaan invers: fungsi harus bijektif (satu-satu dan onto)",
   "Grafik f⁻¹ adalah pencerminan grafik f terhadap garis y = x",
   "Domain f⁻¹ = range f, dan range f⁻¹ = domain f",
   "Prosedur mencari f⁻¹: tulis y = f(x), tukar x dan y, lalu selesaikan y",
   "Membatasi domain agar fungsi kuadrat memiliki invers",
   "Fungsi logaritma sebagai invers fungsi eksponensial"
  ],
  "rumus": [
   "f⁻¹(f(x)) = x untuk semua x ∈ D_f",
   "f(f⁻¹(x)) = x untuk semua x ∈ R_f",
   "f(x) = ax + b ⟹ f⁻¹(x) = (x − b)/a",
   "f(x) = (ax + b)/(cx + d) ⟹ f⁻¹(x) = (−dx + b)/(cx − a)",
   "y = aˣ ⟺ x = ᵃlog y"
  ],
  "miskonsepsi": [
   "Mengira f⁻¹(x) = 1/f(x) karena pangkat −1 pada bilangan berarti kebalikan",
   "Mengira setiap fungsi punya invers, lalu menginverskan f(x) = x² tanpa membatasi domain",
   "Lupa menukar domain dan range saat menyebut daerah asal f⁻¹"
  ],
  "kenapa": [
   "Kenapa fungsi harus satu-satu supaya punya invers? Apa yang kacau kalau tidak?",
   "Kenapa grafik invers dicerminkan terhadap garis y = x, bukan terhadap sumbu lain?"
  ],
  "prasyarat": [
   "sma11-fungsi-notasi-domain-range-dan",
   "sma11-komposisi-fungsi"
  ]
 },
 {
  "id": "sma11-fungsi-notasi-domain-range-dan",
  "judul": "Fungsi: Notasi, Domain, Range, dan Sifat Pemetaan",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Menentukan domain alami fungsi pecahan dan fungsi akar",
  "subKonsep": [
   "Fungsi sebagai mesin input-output: satu input tepat satu output",
   "Notasi f(x), daerah asal (domain), daerah kawan (kodomain), daerah hasil (range)",
   "Domain alami: nilai x yang membuat rumus terdefinisi (penyebut tidak nol, isi akar tidak negatif)",
   "Uji garis vertikal untuk memutuskan apakah sebuah grafik merupakan fungsi",
   "Fungsi injektif (satu-satu) dan uji garis horizontal",
   "Fungsi surjektif (onto) dan fungsi bijektif",
   "Lima representasi fungsi: konteks nyata, tabel, diagram panah, grafik, dan rumus"
  ],
  "rumus": [
   "f : A → B, ditulis y = f(x)",
   "D_f = { x | f(x) terdefinisi }",
   "R_f = { f(x) | x ∈ D_f }",
   "Injektif: f(a) = f(b) ⟹ a = b",
   "Bijektif = injektif dan surjektif ⟹ R_f = kodomain"
  ],
  "miskonsepsi": [
   "Mengira kodomain selalu sama dengan range",
   "Mengira semua kurva yang bisa digambar adalah fungsi, misalnya menganggap lingkaran sebagai fungsi",
   "Membaca f(x) sebagai f dikali x"
  ],
  "kenapa": [
   "Kenapa satu input tidak boleh punya dua output, padahal satu output boleh datang dari dua input berbeda?",
   "Kenapa menarik garis vertikal saja sudah cukup untuk memutuskan sesuatu itu fungsi atau bukan?"
  ],
  "prasyarat": [
   "smp8-relasi-dan-fungsi",
   "smp9-fungsi-nonlinear-dan-perbandingannya-dengan",
   "smp9-persamaan-kuadrat"
  ]
 },
 {
  "id": "sma11-invers-dari-komposisi-fungsi",
  "judul": "Invers dari Komposisi Fungsi",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Menentukan (f ∘ g)⁻¹ tanpa menyusun f ∘ g lebih dulu",
  "subKonsep": [
   "Membalik rantai proses berarti membalik urutan langkahnya",
   "Rumus (f ∘ g)⁻¹ = g⁻¹ ∘ f⁻¹ dan pembuktiannya lewat identitas",
   "Menentukan f bila diketahui f ∘ g dan g, memanfaatkan g⁻¹",
   "Menentukan g bila diketahui f ∘ g dan f, memanfaatkan f⁻¹",
   "Analogi kehidupan: memakai kaus kaki lalu sepatu, membukanya sepatu lalu kaus kaki",
   "Verifikasi hasil dengan mensubstitusi kembali"
  ],
  "rumus": [
   "(f ∘ g)⁻¹ = g⁻¹ ∘ f⁻¹",
   "(f ∘ g)⁻¹(x) = g⁻¹(f⁻¹(x))",
   "Jika h = f ∘ g maka f = h ∘ g⁻¹",
   "Jika h = f ∘ g maka g = f⁻¹ ∘ h"
  ],
  "miskonsepsi": [
   "Menulis (f ∘ g)⁻¹ = f⁻¹ ∘ g⁻¹ karena lupa membalik urutan",
   "Mengira harus menyusun f ∘ g lebih dulu, padahal bisa langsung lewat rumus",
   "Menukar posisi f dan g saat mencari fungsi yang hilang"
  ],
  "kenapa": [
   "Kenapa urutan harus dibalik saat menginverskan sebuah komposisi?",
   "Kenapa g⁻¹ ∘ f⁻¹ menghasilkan identitas, sedangkan f⁻¹ ∘ g⁻¹ tidak?"
  ],
  "prasyarat": [
   "sma11-komposisi-fungsi",
   "sma11-fungsi-invers"
  ]
 },
 {
  "id": "sma11-komposisi-fungsi",
  "judul": "Komposisi Fungsi",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Menghitung (f ∘ g)(a) untuk sebuah nilai a",
  "subKonsep": [
   "Komposisi sebagai dua mesin yang dirangkai seri: keluaran mesin pertama menjadi masukan mesin kedua",
   "Notasi (f ∘ g)(x) = f(g(x)) dan arah bacanya dari kanan ke kiri",
   "Komposisi tidak bersifat komutatif: f ∘ g ≠ g ∘ f",
   "Komposisi bersifat asosiatif",
   "Fungsi identitas I(x) = x sebagai unsur identitas komposisi",
   "Domain komposisi: x harus ada di domain g dan g(x) harus masuk domain f",
   "Dekomposisi: mengurai fungsi majemuk menjadi rantai fungsi sederhana"
  ],
  "rumus": [
   "(f ∘ g)(x) = f(g(x))",
   "(f ∘ g ∘ h)(x) = f(g(h(x)))",
   "(f ∘ g) ∘ h = f ∘ (g ∘ h)",
   "f ∘ I = I ∘ f = f",
   "D_(f∘g) = { x ∈ D_g | g(x) ∈ D_f }"
  ],
  "miskonsepsi": [
   "Membaca f ∘ g dari kiri, yaitu mengerjakan f lebih dulu",
   "Mengira f ∘ g = g ∘ f karena terbiasa dengan sifat komutatif perkalian",
   "Mengira f ∘ g sama dengan f dikali g"
  ],
  "kenapa": [
   "Kenapa urutan komposisi mengubah hasil, padahal urutan perkalian bilangan tidak?",
   "Kenapa domain f ∘ g bisa lebih sempit daripada domain g sendiri?"
  ],
  "prasyarat": [
   "sma11-fungsi-notasi-domain-range-dan",
   "sma11-aljabar-fungsi-operasi-pada-dua"
  ]
 },
 {
  "id": "sma11-pemodelan-dunia-nyata-dengan-fungsi",
  "judul": "Pemodelan Dunia Nyata dengan Fungsi Linear, Kuadrat, dan Eksponensial",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Mengidentifikasi jenis model dari tabel data lewat selisih atau rasio",
  "subKonsep": [
   "Ciri data linear: selisih berurutan tetap",
   "Ciri data kuadrat: selisih tingkat kedua tetap",
   "Ciri data eksponensial: rasio berurutan tetap",
   "Memilih model yang tepat dari tabel, grafik, atau deskripsi konteks",
   "Menafsirkan makna setiap parameter model dalam bahasa konteks",
   "Pertumbuhan dan peluruhan eksponensial: populasi, bunga majemuk, peluruhan radioaktif",
   "Menggunakan fungsi invers untuk menjawab pertanyaan \"kapan tercapai?\"",
   "Batas kewajaran model dan bahaya ekstrapolasi jauh"
  ],
  "rumus": [
   "Linear: f(x) = mx + c",
   "Kuadrat bentuk puncak: f(x) = a(x − h)² + k",
   "Eksponensial: f(x) = A · bˣ",
   "Pertumbuhan majemuk: f(t) = A(1 + r)ᵗ",
   "Peluruhan waktu paruh: N(t) = N₀ · (1/2)^(t/T)"
  ],
  "miskonsepsi": [
   "Mengira semua data yang naik terus-menerus bersifat linear",
   "Menganggap pertumbuhan 10% per tahun selama 10 tahun sama dengan naik 100%",
   "Menukar peran basis b dan eksponen x, misalnya menulis xᵇ"
  ],
  "kenapa": [
   "Kenapa selisih tetap berarti linear, sedangkan rasio tetap berarti eksponensial?",
   "Kenapa grafik eksponensial pada akhirnya selalu mengalahkan grafik kuadrat, seberapa pun kecil basisnya asal lebih dari 1?"
  ],
  "prasyarat": [
   "sma11-fungsi-invers",
   "smp9-transformasi-dilatasi",
   "sma10-persamaan-dan-pertidaksamaan-eksponensial-berbasis",
   "smp8-barisan-aritmetika-dan-barisan-geometri"
  ]
 },
 {
  "id": "sma11-transformasi-fungsi-dilatasi-dan-transformasi",
  "judul": "Transformasi Fungsi: Dilatasi dan Transformasi Gabungan",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Menggambar hasil dilatasi vertikal dan horizontal",
  "subKonsep": [
   "y = a·f(x) meregangkan grafik secara vertikal dengan faktor a",
   "y = f(kx) meregangkan grafik secara horizontal dengan faktor 1/k",
   "Titik tetap: dilatasi vertikal tidak mengubah titik potong sumbu-x",
   "Urutan pengerjaan pada transformasi gabungan",
   "Menyusun bentuk baku y = a·f(k(x − h)) + v dari grafik yang diamati",
   "Pemodelan nyata: menggeser kurva biaya untuk biaya tetap, meregang untuk skala ekonomi"
  ],
  "rumus": [
   "y = a·f(x) : regang vertikal faktor a; |a| > 1 memanjang, 0 < |a| < 1 memendek",
   "y = f(kx) : regang horizontal faktor 1/k; |k| > 1 memampat",
   "y = a·f(k(x − h)) + v : bentuk baku transformasi gabungan",
   "Bayangan titik (p, q) menjadi (p/k + h, a·q + v)"
  ],
  "miskonsepsi": [
   "Mengira f(2x) melebarkan grafik dua kali, padahal memampatkannya menjadi setengah",
   "Membaca f(2x − 4) sebagai geser 4 lalu regang, tanpa memfaktorkan menjadi f(2(x − 2))",
   "Mengira dilatasi vertikal menggeser titik potong sumbu-x"
  ],
  "kenapa": [
   "Kenapa f(2x) memampatkan grafik, bukan melebarkannya?",
   "Kenapa urutan translasi dan dilatasi menghasilkan grafik yang berbeda?"
  ],
  "prasyarat": [
   "smp9-transformasi-translasi"
  ]
 },
 {
  "id": "sma11-transformasi-fungsi-translasi-dan-refleksi",
  "judul": "Transformasi Fungsi: Translasi dan Refleksi",
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Menggambar grafik hasil transformasi dari grafik fungsi asal",
  "subKonsep": [
   "y = f(x) + b menggeser seluruh grafik secara vertikal",
   "y = f(x + c) menggeser grafik secara horizontal, arahnya berlawanan dengan tanda c",
   "y = −f(x) mencerminkan grafik terhadap sumbu-x",
   "y = f(−x) mencerminkan grafik terhadap sumbu-y",
   "Efek transformasi pada titik puncak, titik potong sumbu, dan asimtot",
   "Menemukan aturan lewat eksplorasi grafik (Desmos/GeoGebra), bukan menghafal",
   "Perbedaan transformasi fungsi dan transformasi geometri"
  ],
  "rumus": [
   "y = f(x) + b : geser b satuan ke atas bila b > 0",
   "y = f(x + c) : geser c satuan ke kiri bila c > 0, ke kanan bila c < 0",
   "y = −f(x) : refleksi terhadap sumbu-x",
   "y = f(−x) : refleksi terhadap sumbu-y",
   "y = f(x − h) + k : translasi sejauh (h, k)"
  ],
  "miskonsepsi": [
   "Mengira f(x + 2) menggeser grafik ke kanan 2 satuan",
   "Menganggap perubahan di dalam kurung dan di luar kurung berperilaku sama",
   "Mengira −f(x) dan f(−x) menghasilkan grafik yang sama"
  ],
  "kenapa": [
   "Kenapa f(x + 2) menggeser grafik ke KIRI, bukan ke kanan?",
   "Kenapa perubahan di dalam f( ) memengaruhi arah horizontal, sedangkan di luar memengaruhi arah vertikal?"
  ],
  "prasyarat": [
   "sma11-fungsi-notasi-domain-range-dan",
   "smp9-persamaan-kuadrat"
  ]
 },
 {
  "id": "sma11-asosiasi-bukan-sebab-akibat-perancu",
  "judul": "Asosiasi Bukan Sebab-Akibat: Perancu dan Evaluasi Laporan Statistika",
  "kelas": 11,
  "fase": "F",
  "domain": "data",
  "ringkas": "Mengusulkan minimal satu variabel perancu untuk sebuah klaim di berita",
  "subKonsep": [
   "Beda asosiasi (dua hal bergerak bersama) dan sebab-akibat (satu menyebabkan yang lain)",
   "Variabel perancu (lurking variable) yang menjelaskan keduanya sekaligus",
   "Korelasi kebetulan (spurious correlation) pada data deret waktu",
   "Arah sebab yang terbalik (y sebenarnya menyebabkan x)",
   "Studi observasional vs eksperimen terkontrol beracak sebagai syarat klaim kausal",
   "Bias pemilihan sampel dan bias sukarelawan",
   "Trik penyesatan grafik: sumbu tegak dipotong, skala tidak seragam, sumbu ganda"
  ],
  "rumus": [
   "Tidak ada rumus baru; kuncinya kerangka penalaran: asosiasi ada -> cek perancu -> cek arah sebab -> cek cara data dikumpulkan"
  ],
  "miskonsepsi": [
   "Menganggap korelasi kuat sudah cukup membuktikan sebab-akibat",
   "Mengira contoh 'penjualan es krim dan kasus tenggelam' hanya lelucon, bukan pola umum",
   "Menganggap sampel besar otomatis menghapus bias pemilihan"
  ],
  "kenapa": [
   "Kenapa penjualan es krim naik bersamaan dengan kasus tenggelam padahal es krim tidak menyebabkannya?",
   "Kenapa pengacakan dalam eksperimen membuat klaim sebab-akibat jadi sah?"
  ],
  "prasyarat": [
   "sma11-koefisien-korelasi-dan-kuat-lemahnya",
   "sma11-proses-penyelidikan-statistika-dan-data"
  ]
 },
 {
  "id": "sma11-diagram-pencar-dan-asosiasi-dua",
  "judul": "Diagram Pencar dan Asosiasi Dua Variabel Numerikal",
  "kelas": 11,
  "fase": "F",
  "domain": "data",
  "ringkas": "Membuat diagram pencar dari tabel data berpasangan dengan skala sumbu yang jujur",
  "subKonsep": [
   "Setiap titik pada diagram pencar mewakili satu individu dengan dua koordinat (x, y)",
   "Variabel bebas (penjelas) di sumbu mendatar, variabel terikat (respons) di sumbu tegak",
   "Empat hal yang dibaca dari sebaran titik: arah, bentuk, kekuatan, dan pencilan",
   "Asosiasi positif, negatif, dan tidak ada asosiasi",
   "Pola linear vs pola melengkung (nonlinear)",
   "Pencilan (outlier) dan titik berpengaruh yang menarik pola",
   "Deret waktu sebagai kasus khusus (x = waktu)"
  ],
  "rumus": [
   "titik data ke-i ditulis (x_i, y_i)",
   "pusat data berada di titik (rata-rata x, rata-rata y)"
  ],
  "miskonsepsi": [
   "Menghubungkan titik-titik pada diagram pencar dengan garis patah seperti grafik garis",
   "Mengira titik yang berdekatan pada sumbu x pasti berdekatan pada sumbu y",
   "Menukar peran variabel bebas dan terikat tanpa sadar bahwa maknanya berubah"
  ],
  "kenapa": [
   "Kenapa titik-titik tidak boleh dihubungkan garis pada diagram pencar?",
   "Kenapa satu titik yang jauh bisa mengubah kesimpulan tentang seluruh data?"
  ],
  "prasyarat": [
   "sma11-proses-penyelidikan-statistika-dan-data",
   "smp8-koordinat-kartesius"
  ]
 },
 {
  "id": "sma11-koefisien-korelasi-dan-kuat-lemahnya",
  "judul": "Koefisien Korelasi dan Kuat-Lemahnya Hubungan",
  "kelas": 11,
  "fase": "F",
  "domain": "data",
  "ringkas": "Menghitung r dari tabel bantu untuk data kecil",
  "subKonsep": [
   "Kebutuhan ukuran angka untuk kekuatan hubungan, bukan sekadar kesan mata",
   "Skor baku (z) sebagai cara menyamakan satuan dua variabel yang berbeda",
   "Hasil kali z_x kali z_y: positif di kuadran seiring, negatif di kuadran berlawanan",
   "Koefisien korelasi r sebagai rata-rata hasil kali skor baku",
   "Rentang -1 <= r <= 1 dan arti tanda serta besarnya",
   "r tidak bersatuan dan tidak berubah bila satuan data diganti",
   "Hubungan r dengan kemiringan garis regresi",
   "Keterbatasan r: hanya mengukur hubungan LINEAR dan sangat peka pencilan"
  ],
  "rumus": [
   "z_x = (x - x_bar) / s_x",
   "r = (1/(n-1)) x sum(z_x_i x z_y_i)",
   "r = sum((x_i - x_bar)(y_i - y_bar)) / sqrt(sum(x_i - x_bar)^2 x sum(y_i - y_bar)^2)",
   "b = r x (s_y / s_x)",
   "koefisien determinasi = r^2"
  ],
  "miskonsepsi": [
   "Mengira r = 0 berarti tidak ada hubungan sama sekali (padahal bisa berbentuk parabola)",
   "Mengira r besar berarti garisnya curam",
   "Menyamakan r dengan persentase (r = 0,8 dibaca '80% cocok')"
  ],
  "kenapa": [
   "Kenapa nilai r tidak pernah keluar dari selang -1 sampai 1?",
   "Kenapa mengalikan dua skor baku bisa mengukur 'seiring atau berlawanan'?"
  ],
  "prasyarat": [
   "sma11-model-linear-terbaik-regresi-kuadrat",
   "smp8-jangkauan-dan-ukuran-penyebaran-data"
  ]
 },
 {
  "id": "sma11-model-linear-terbaik-regresi-kuadrat",
  "judul": "Model Linear Terbaik: Regresi Kuadrat Terkecil",
  "kelas": 11,
  "fase": "F",
  "domain": "data",
  "ringkas": "Menaksir garis model terbaik secara visual lalu memperbaikinya dengan hitungan",
  "subKonsep": [
   "Garis model sebagai ringkasan pola, bukan garis yang melewati semua titik",
   "Sisaan (residu) = jarak vertikal titik ke garis, bisa positif atau negatif",
   "Kenapa sisaan dikuadratkan: agar tanda tidak saling meniadakan dan simpangan besar dihukum lebih berat",
   "Kriteria kuadrat terkecil: pilih garis yang membuat jumlah kuadrat sisaan minimum",
   "Kemiringan b sebagai laju perubahan rata-rata y setiap kenaikan satu satuan x",
   "Konstanta a dan bahayanya menafsirkan a ketika x = 0 di luar jangkauan data",
   "Garis regresi selalu melewati titik (rata-rata x, rata-rata y)",
   "Interpolasi (aman) vs ekstrapolasi (berisiko)"
  ],
  "rumus": [
   "y_topi = a + b x",
   "b = sum((x_i - x_bar)(y_i - y_bar)) / sum((x_i - x_bar)^2)",
   "a = y_bar - b x_bar",
   "sisaan e_i = y_i - y_topi_i",
   "meminimumkan S = sum(e_i^2)"
  ],
  "miskonsepsi": [
   "Mengira garis terbaik harus melewati sebanyak mungkin titik atau melewati titik pertama dan terakhir",
   "Mengukur jarak titik ke garis secara tegak lurus, padahal yang diminimumkan adalah jarak vertikal",
   "Mengira nilai a selalu punya makna nyata meski x = 0 mustahil terjadi"
  ],
  "kenapa": [
   "Kenapa sisaan dikuadratkan dan bukan diambil nilai mutlaknya?",
   "Kenapa hanya ada SATU garis yang membuat jumlah kuadrat sisaan paling kecil?"
  ],
  "prasyarat": [
   "sma11-diagram-pencar-dan-asosiasi-dua",
   "smp8-persamaan-garis-lurus-dan-gradien",
   "smp8-jangkauan-dan-ukuran-penyebaran-data"
  ]
 },
 {
  "id": "sma11-proses-penyelidikan-statistika-dan-data",
  "judul": "Proses Penyelidikan Statistika dan Data Bivariat",
  "kelas": 11,
  "fase": "F",
  "domain": "data",
  "ringkas": "Mengubah pertanyaan sehari-hari menjadi pertanyaan statistika yang bisa dijawab data",
  "subKonsep": [
   "Siklus penyelidikan statistika: rumuskan pertanyaan, rencanakan, kumpulkan data, analisis, simpulkan",
   "Pertanyaan statistika (jawabannya bervariasi) vs pertanyaan biasa (jawabannya satu angka pasti)",
   "Data univariat (satu variabel per individu) vs data bivariat (dua variabel pada individu yang sama)",
   "Jenis variabel: kategorikal nominal, kategorikal ordinal, numerikal diskret, numerikal kontinu",
   "Data berpasangan: setiap baris tabel adalah satu individu, bukan dua daftar terpisah",
   "Memilih representasi sesuai pasangan jenis variabel (kategorikal-kategorikal ke tabel kontingensi; numerikal-numerikal ke diagram pencar)",
   "Data primer (mengumpulkan sendiri) vs data sekunder (BPS, laporan media)"
  ],
  "rumus": [
   "frekuensi relatif = frekuensi kelas / banyak seluruh data",
   "persentase baris = frekuensi sel / total baris x 100%"
  ],
  "miskonsepsi": [
   "Mengira statistika hanya soal menghitung rata-rata, bukan menjawab pertanyaan",
   "Mengurutkan dua kolom data secara terpisah sehingga pasangan individu rusak",
   "Menganggap data yang lebih banyak otomatis membuat kesimpulan lebih benar, tanpa peduli cara pengambilannya"
  ],
  "kenapa": [
   "Kenapa dua kolom angka harus tetap berpasangan? Apa yang hilang kalau pasangannya diacak?",
   "Kenapa bentuk grafiknya harus berbeda hanya karena jenis variabelnya berbeda?"
  ],
  "prasyarat": [
   "sd3-penyajian-data-dalam-tabel",
   "smp8-jangkauan-dan-ukuran-penyebaran-data"
  ]
 },
 {
  "id": "sma11-tabel-kontingensi-dan-asosiasi-dua",
  "judul": "Tabel Kontingensi dan Asosiasi Dua Variabel Kategorikal",
  "kelas": 11,
  "fase": "F",
  "domain": "data",
  "ringkas": "Menyusun tabel kontingensi dari data mentah hasil survei kelas",
  "subKonsep": [
   "Tabel kontingensi (tabel dua arah) sebagai peta silang dua variabel kategorikal",
   "Frekuensi sel, total baris, total kolom, dan grand total",
   "Distribusi marginal (total tepi) vs distribusi bersyarat (persentase di dalam satu baris/kolom)",
   "Membandingkan persentase baris, bukan frekuensi mentah, untuk melihat asosiasi",
   "Diagram batang bersusun (stacked/segmented bar) sebagai gambar dari tabel kontingensi",
   "Ciri tidak ada asosiasi: profil persentase tiap baris kira-kira sama dengan profil keseluruhan",
   "Frekuensi harapan sel jika kedua variabel tidak berasosiasi"
  ],
  "rumus": [
   "persentase baris = f(sel) / total baris x 100%",
   "persentase kolom = f(sel) / total kolom x 100%",
   "frekuensi harapan sel = (total baris x total kolom) / grand total"
  ],
  "miskonsepsi": [
   "Membandingkan frekuensi mentah antar baris yang jumlah anggotanya berbeda jauh",
   "Membaca persentase baris seolah persentase kolom (membalik arah bersyarat)",
   "Mengira selisih persentase sekecil apa pun sudah membuktikan adanya asosiasi"
  ],
  "kenapa": [
   "Kenapa membandingkan jumlah orang bisa menipu, tapi membandingkan persentase tidak?",
   "Dari mana rumus frekuensi harapan (total baris x total kolom / total semua) berasal?"
  ],
  "prasyarat": [
   "sma11-proses-penyelidikan-statistika-dan-data"
  ]
 },
 {
  "id": "sma11-garis-singgung-lingkaran-dan-garis",
  "judul": "Garis Singgung Lingkaran dan Garis Singgung Persekutuan",
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Menghitung panjang garis singgung dari titik di luar lingkaran",
  "subKonsep": [
   "Garis singgung menyentuh lingkaran tepat di satu titik",
   "Garis singgung selalu tegak lurus jari-jari di titik singgung",
   "Dua garis singgung dari satu titik luar punya panjang sama (layang-layang garis singgung)",
   "Garis singgung persekutuan dalam dan luar dua lingkaran",
   "Panjang garis singgung dari titik luar sebagai penerapan Pythagoras",
   "Kedudukan garis terhadap lingkaran: memotong, menyinggung, atau tidak menyentuh"
  ],
  "rumus": [
   "Panjang garis singgung dari titik luar: t = akar(d^2 - r^2), d = jarak titik ke pusat",
   "Garis singgung persekutuan luar: gl = akar(p^2 - (R - r)^2)",
   "Garis singgung persekutuan dalam: gd = akar(p^2 - (R + r)^2)"
  ],
  "miskonsepsi": [
   "Mengira garis singgung tegak lurus tali busur, bukan tegak lurus jari-jari",
   "Tertukar rumus garis singgung persekutuan dalam dan luar",
   "Mengira jarak pusat ke pusat sama dengan panjang garis singgungnya"
  ],
  "kenapa": [
   "Kenapa garis singgung harus tegak lurus jari-jari, kenapa tidak boleh miring?",
   "Kenapa dua garis singgung dari satu titik luar selalu sama panjang?"
  ],
  "prasyarat": [
   "sma11-unsur-unsur-lingkaran-dan-hubungan",
   "smp8-teorema-pythagoras"
  ]
 },
 {
  "id": "sma11-panjang-busur-luas-juring-dan",
  "judul": "Panjang Busur, Luas Juring, dan Ukuran Radian",
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Mengonversi derajat ke radian dan sebaliknya tanpa kalkulator untuk sudut istimewa",
  "subKonsep": [
   "Perbandingan senilai: sudut pusat berbanding 360 derajat sama dengan busur berbanding keliling",
   "Panjang busur dan luas juring dalam derajat",
   "Radian sebagai perbandingan panjang busur terhadap jari-jari (bilangan tanpa satuan)",
   "Konversi derajat-radian dan mengapa 1 putaran = 2·pi radian",
   "Rumus busur dan juring menjadi jauh lebih sederhana dalam radian",
   "Luas tembereng = luas juring dikurangi luas segitiga"
  ],
  "rumus": [
   "Busur = (theta/360) × 2·pi·r",
   "Juring = (theta/360) × pi·r^2",
   "theta radian: s = r·theta ; L juring = 1/2 · r^2 · theta",
   "180 derajat = pi radian",
   "Tembereng = 1/2·r^2·(theta - sin theta), theta dalam radian"
  ],
  "miskonsepsi": [
   "Mengira radian adalah satuan panjang, bukan perbandingan",
   "Memakai rumus s = r·theta dengan theta masih dalam derajat",
   "Menyamakan luas juring dengan luas tembereng"
  ],
  "kenapa": [
   "Kenapa satu putaran penuh bernilai 2·pi radian, dari mana angka 2·pi-nya?",
   "Kenapa rumus panjang busur jadi sesederhana s = r·theta kalau memakai radian?"
  ],
  "prasyarat": [
   "sma11-unsur-unsur-lingkaran-dan-hubungan",
   "smp7-perbandingan-senilai-dan-berbalik-nilai"
  ]
 },
 {
  "id": "sma11-sudut-pusat-sudut-keliling-dan",
  "judul": "Sudut Pusat, Sudut Keliling, dan Sudut Tali Busur",
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Mengenali busur mana yang sedang dihadapi oleh sebuah sudut",
  "subKonsep": [
   "Sudut pusat: titik sudut di pusat, kaki sudut berupa dua jari-jari",
   "Sudut keliling: titik sudut di lingkaran, kaki sudut berupa dua tali busur",
   "Sudut keliling = setengah sudut pusat bila menghadap busur yang sama",
   "Semua sudut keliling yang menghadap busur sama besarnya sama",
   "Sudut keliling menghadap diameter selalu 90 derajat (Teorema Thales)",
   "Sudut antara tali busur dan garis singgung sama dengan sudut keliling di segmen seberang"
  ],
  "rumus": [
   "sudut keliling = 1/2 × sudut pusat (busur sama)",
   "sudut keliling menghadap diameter = 90 derajat",
   "panjang busur / keliling = sudut pusat / 360 derajat"
  ],
  "miskonsepsi": [
   "Mengira sudut keliling selalu setengah sudut pusat walau busur yang dihadapi berbeda",
   "Mengira semua sudut keliling dalam satu lingkaran sama besar",
   "Salah membaca busur mayor sebagai busur minor sehingga sudut pusat diambil 360 - x"
  ],
  "kenapa": [
   "Kenapa sudut keliling tepat setengah sudut pusat, apa hubungannya dengan segitiga sama kaki di dalam lingkaran?",
   "Kenapa titik sudut boleh digeser-geser sepanjang busur tanpa mengubah besar sudutnya?"
  ],
  "prasyarat": [
   "sma11-unsur-unsur-lingkaran-dan-hubungan",
   "smp7-garis-dan-sudut"
  ]
 },
 {
  "id": "sma11-tali-busur-dan-segi-empat",
  "judul": "Tali Busur dan Segi Empat Tali Busur",
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Menghitung panjang ruas yang hilang pada perpotongan dua tali busur",
  "subKonsep": [
   "Sifat dua tali busur yang berpotongan di dalam lingkaran",
   "Sifat dua tali busur/sekan yang berpotongan di luar lingkaran",
   "Segi empat tali busur: keempat titik sudut terletak pada satu lingkaran",
   "Sudut-sudut berhadapan pada segi empat tali busur berjumlah 180 derajat",
   "Sudut luar segi empat tali busur sama dengan sudut dalam yang berhadapan",
   "Kapan empat titik dijamin sikliks (konsiklis)"
  ],
  "rumus": [
   "Dua tali busur berpotongan di dalam: AP·PB = CP·PD",
   "Dua sekan dari titik luar: PA·PB = PC·PD",
   "A + C = 180 derajat dan B + D = 180 derajat pada segi empat tali busur"
  ],
  "miskonsepsi": [
   "Mengira sudut berhadapan pada segi empat tali busur selalu sama besar (seperti jajargenjang)",
   "Menyangka aturan hasil kali berlaku untuk sembarang segi empat, bukan yang titiknya di lingkaran",
   "Salah memasangkan ruas garis pada rumus AP·PB = CP·PD"
  ],
  "kenapa": [
   "Kenapa hasil kali potongan dua tali busur selalu sama, dari mana kesebangunannya?",
   "Kenapa sudut berhadapan segi empat tali busur pasti berjumlah 180 derajat?"
  ],
  "prasyarat": [
   "sma11-sudut-pusat-sudut-keliling-dan",
   "smp9-kekongruenan-bangun-datar-dan-segitiga"
  ]
 },
 {
  "id": "sma11-unsur-unsur-lingkaran-dan-hubungan",
  "judul": "Unsur-Unsur Lingkaran dan Hubungan Antar Unsurnya",
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Menamai dan menggambar setiap unsur lingkaran pada satu gambar utuh",
  "subKonsep": [
   "Titik pusat, jari-jari, dan diameter sebagai unsur pengukur",
   "Tali busur, busur (minor dan mayor), dan apotema",
   "Juring dan tembereng: beda daerah yang dibatasi dua jari-jari vs satu tali busur",
   "Hubungan tegak lurus apotema dengan tali busur yang dibaginya",
   "Semua titik pada lingkaran berjarak sama ke pusat sebagai definisi pembangkit",
   "Lingkaran sebagai tempat kedudukan titik, bukan sekadar bentuk bulat"
  ],
  "rumus": [
   "r = d/2",
   "K = 2·pi·r = pi·d",
   "L = pi·r^2",
   "apotema tegak lurus tali busur dan membagi tali busur menjadi dua sama panjang"
  ],
  "miskonsepsi": [
   "Menyamakan busur (lengkungan) dengan tali busur (ruas garis lurus)",
   "Mengira apotema adalah jari-jari, sehingga dipakai langsung sebagai r",
   "Menganggap juring dan tembereng sama karena sama-sama 'potongan lingkaran'"
  ],
  "kenapa": [
   "Kenapa apotema selalu tegak lurus tali busur dan membelahnya tepat di tengah?",
   "Kenapa keliling dibagi diameter selalu menghasilkan angka yang sama (pi) untuk lingkaran mana pun?"
  ],
  "prasyarat": [
   "sd6-keliling-dan-luas-lingkaran",
   "smp8-teorema-pythagoras"
  ]
 },
 {
  "id": "sma11-akar-polinomial-dan-bentuk-grafiknya",
  "judul": "Akar Polinomial dan Bentuk Grafiknya",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Memfaktorkan polinomial derajat tiga dan empat secara lengkap",
  "subKonsep": [
   "Memfaktorkan polinomial secara lengkap dengan teorema faktor dan Horner",
   "Hubungan akar polinomial dengan titik potong grafik terhadap sumbu-x",
   "Multiplisitas akar: memotong sumbu (pangkat ganjil) atau menyinggung (pangkat genap)",
   "Perilaku ujung grafik ditentukan derajat dan tanda koefisien utama",
   "Uji tanda untuk menentukan interval P(x) > 0 dan P(x) < 0",
   "Relasi akar dan koefisien (Vieta) untuk derajat dua dan derajat tiga",
   "Menyusun polinomial dari akar-akar yang diketahui"
  ],
  "rumus": [
   "P(x) = aₙ(x − r₁)(x − r₂) … (x − rₙ)",
   "Derajat 2, ax² + bx + c: r₁ + r₂ = −b/a; r₁·r₂ = c/a",
   "Derajat 3, ax³ + bx² + cx + d: r₁+r₂+r₃ = −b/a",
   "Derajat 3: r₁r₂ + r₁r₃ + r₂r₃ = c/a",
   "Derajat 3: r₁·r₂·r₃ = −d/a"
  ],
  "miskonsepsi": [
   "Mengira polinomial derajat n selalu memiliki n akar real yang berbeda",
   "Mengira grafik selalu memotong sumbu-x di setiap akar, lupa akar rangkap",
   "Salah tanda pada rumus Vieta, misalnya menulis r₁+r₂ = b/a"
  ],
  "kenapa": [
   "Kenapa grafik menyinggung sumbu-x pada akar rangkap, tetapi memotongnya pada akar tunggal?",
   "Kenapa jumlah akar sama dengan −b/a — dari mana tanda minus itu datang?"
  ],
  "prasyarat": [
   "sma11-teorema-sisa-dan-teorema-faktor"
  ]
 },
 {
  "id": "sma11-determinan-dan-invers-matriks",
  "judul": "Determinan dan Invers Matriks",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Menghitung determinan matriks 2×2 dan 3×3",
  "subKonsep": [
   "Determinan matriks 2×2 dan maknanya sebagai luas berarah jajar genjang",
   "Determinan matriks 3×3 dengan aturan Sarrus atau ekspansi kofaktor",
   "det = 0 berarti bidang runtuh menjadi garis atau titik, matriks menjadi singular",
   "Minor, kofaktor, dan adjoin matriks",
   "Invers matriks 2×2 dan syarat keberadaannya",
   "Sifat determinan dan invers pada hasil kali matriks",
   "Tanda determinan sebagai penanda perubahan orientasi"
  ],
  "rumus": [
   "det [[a,b],[c,d]] = ad − bc",
   "A⁻¹ = (1/det A) · [[d, −b], [−c, a]] untuk A = [[a,b],[c,d]]",
   "A A⁻¹ = A⁻¹ A = I",
   "A punya invers ⟺ det A ≠ 0",
   "det(AB) = det A · det B",
   "det(A⁻¹) = 1 / det A"
  ],
  "miskonsepsi": [
   "Mengira invers matriks berarti setiap elemen diganti kebalikannya (1/aᵢⱼ)",
   "Lupa menukar posisi a dan d serta memberi tanda minus pada b dan c",
   "Mengira semua matriks persegi pasti punya invers"
  ],
  "kenapa": [
   "Kenapa rumusnya ad − bc, bukan ad + bc — dari mana bentuk itu muncul kalau digambar sebagai luas jajar genjang?",
   "Kenapa determinan nol membuat matriks kehilangan invers?"
  ],
  "prasyarat": [
   "sma11-perkalian-matriks-dan-sifat-sifatnya"
  ]
 },
 {
  "id": "sma11-fungsi-trigonometri-dan-lingkaran-satuan",
  "judul": "Fungsi Trigonometri dan Lingkaran Satuan",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Menentukan nilai trigonometri sudut istimewa di semua kuadran lewat lingkaran satuan",
  "subKonsep": [
   "Lingkaran satuan sebagai perluasan definisi sinus dan cosinus ke semua sudut",
   "Sudut dalam derajat dan radian serta konversinya",
   "Koordinat titik pada lingkaran satuan adalah (cos θ, sin θ)",
   "Grafik y = sin x, y = cos x, y = tan x dan sifat periodiknya",
   "Amplitudo, periode, pergeseran fase, dan pergeseran vertikal",
   "Identitas dasar sin²θ + cos²θ = 1 dan asal-usulnya dari teorema Pythagoras",
   "Pemodelan fenomena periodik: pasang surut, suhu harian, gelombang suara"
  ],
  "rumus": [
   "x² + y² = 1 pada lingkaran satuan, dengan x = cos θ, y = sin θ",
   "sin²θ + cos²θ = 1",
   "tan θ = sin θ / cos θ",
   "180° = π radian",
   "y = A sin(k(x − c)) + d dengan amplitudo |A|, periode 2π/k",
   "Periode sin dan cos = 2π; periode tan = π"
  ],
  "miskonsepsi": [
   "Mengira sinus dan cosinus hanya berlaku untuk segitiga siku-siku",
   "Mengira sin(a + b) = sin a + sin b",
   "Menukar peran amplitudo dan periode dalam y = A sin(kx)"
  ],
  "kenapa": [
   "Kenapa lingkaran satuan bisa memperluas sinus dan cosinus ke sudut lebih dari 90°?",
   "Kenapa sin²θ + cos²θ = 1 — dan kenapa itu sebenarnya teorema Pythagoras menyamar?"
  ],
  "prasyarat": [
   "sma10-perbandingan-trigonometri-sudut-lancip-sinus",
   "smp8-teorema-pythagoras",
   "smp9-transformasi-dilatasi"
  ]
 },
 {
  "id": "sma11-identitas-polinomial-dan-teorema-binomial",
  "judul": "Identitas Polinomial dan Teorema Binomial",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Membuktikan identitas polinomial dengan penjabaran atau koefisien tak tentu",
  "subKonsep": [
   "Beda persamaan (benar untuk sebagian nilai) dan identitas (benar untuk semua nilai)",
   "Identitas dasar: kuadrat binomial dan selisih kuadrat",
   "Identitas pangkat tiga: kubik binomial, jumlah dan selisih pangkat tiga",
   "Metode koefisien tak tentu untuk membuktikan identitas",
   "Menggunakan identitas untuk mempercepat perhitungan numerik",
   "Membangkitkan tripel Pythagoras dari identitas (x²+y²)² = (x²−y²)² + (2xy)²",
   "Teorema binomial dan koefisien dari segitiga Pascal"
  ],
  "rumus": [
   "(a ± b)² = a² ± 2ab + b²",
   "a² − b² = (a + b)(a − b)",
   "(a + b)³ = a³ + 3a²b + 3ab² + b³",
   "a³ + b³ = (a + b)(a² − ab + b²)",
   "a³ − b³ = (a − b)(a² + ab + b²)",
   "(x + y)ⁿ = Σ C(n,k)·x^(n−k)·y^k untuk k = 0 sampai n"
  ],
  "miskonsepsi": [
   "Menulis (a + b)² = a² + b²",
   "Mengira a³ + b³ = (a + b)³",
   "Mengira a² + b² bisa difaktorkan atas bilangan real"
  ],
  "kenapa": [
   "Kenapa (a + b)² bukan a² + b² — di mana suku 2ab bersembunyi kalau digambar sebagai luas persegi?",
   "Dari mana koefisien 1, 3, 3, 1 pada (a+b)³ berasal, dan kenapa persis segitiga Pascal?"
  ],
  "prasyarat": [
   "sma11-polinomial-bentuk-derajat-dan-operasi"
  ]
 },
 {
  "id": "sma11-induksi-matematika-pengayaan-di-luar",
  "judul": "Induksi Matematika (pengayaan di luar CP 2025)",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Menuliskan pernyataan P(n) secara tepat",
  "subKonsep": [
   "Perbedaan pola yang terlihat benar dan pernyataan yang terbukti benar",
   "Dua langkah induksi: langkah basis dan langkah induktif",
   "Hipotesis induksi dan cara memakainya",
   "Analogi kartu domino dan tangga tak terhingga",
   "Induksi untuk membuktikan rumus jumlah deret",
   "Induksi untuk membuktikan keterbagian",
   "Induksi untuk membuktikan pertidaksamaan"
  ],
  "rumus": [
   "Langkah 1 (basis): tunjukkan P(1) benar",
   "Langkah 2 (induktif): asumsikan P(k) benar, buktikan P(k+1) benar",
   "Kesimpulan: P(n) benar untuk semua bilangan asli n",
   "Contoh: 1 + 2 + … + n = n(n+1)/2",
   "Contoh: 1² + 2² + … + n² = n(n+1)(2n+1)/6"
  ],
  "miskonsepsi": [
   "Mengira memeriksa beberapa nilai n sudah merupakan bukti",
   "Mengira mengasumsikan P(k) benar sama dengan mengasumsikan yang mau dibuktikan",
   "Melewatkan langkah basis dan langsung ke langkah induktif"
  ],
  "kenapa": [
   "Kenapa dua langkah saja sudah cukup membuktikan pernyataan untuk tak terhingga banyak bilangan?",
   "Kenapa mengasumsikan P(k) benar bukan berarti berputar-putar dan curang?"
  ],
  "prasyarat": [
   "smp8-barisan-aritmetika-dan-barisan-geometri",
   "sma11-polinomial-bentuk-derajat-dan-operasi"
  ]
 },
 {
  "id": "sma11-matriks-sebagai-transformasi-bidang",
  "judul": "Matriks sebagai Transformasi Bidang",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Menentukan bayangan titik dan bangun datar oleh sebuah matriks",
  "subKonsep": [
   "Titik ditulis sebagai vektor kolom; matriks 2×2 memetakan seluruh bidang, bukan sekadar satu objek",
   "Kolom matriks transformasi adalah bayangan vektor satuan i dan j",
   "Matriks transformasi baku: identitas, dilatasi, refleksi, rotasi",
   "Komposisi transformasi setara dengan perkalian matriks, dibaca dari kanan",
   "Invers matriks transformasi sebagai transformasi kebalikannya",
   "Nilai mutlak determinan sebagai rasio luas bayangan terhadap luas asli",
   "Translasi bukan transformasi linear sehingga tidak dapat diwakili matriks 2×2"
  ],
  "rumus": [
   "Bayangan: [x'; y'] = M · [x; y]",
   "Rotasi sejauh θ berlawanan jarum jam: [[cos θ, −sin θ], [sin θ, cos θ]]",
   "Refleksi terhadap sumbu-x: [[1, 0], [0, −1]]",
   "Refleksi terhadap sumbu-y: [[−1, 0], [0, 1]]",
   "Refleksi terhadap garis y = x: [[0, 1], [1, 0]]",
   "Dilatasi pusat O faktor k: [[k, 0], [0, k]]"
  ],
  "miskonsepsi": [
   "Mengalikan matriks dengan urutan terbalik untuk transformasi berurutan",
   "Menulis titik sebagai vektor baris lalu mengalikannya dari kiri",
   "Mengira rotasi 90° dan refleksi terhadap y = x menghasilkan matriks yang sama"
  ],
  "kenapa": [
   "Kenapa kolom matriks transformasi persis sama dengan bayangan vektor satuan i dan j?",
   "Kenapa transformasi berurutan ditulis dari kanan ke kiri pada perkalian matriks?"
  ],
  "prasyarat": [
   "sma11-determinan-dan-invers-matriks",
   "smp9-transformasi-translasi"
  ]
 },
 {
  "id": "sma11-matriks-notasi-jenis-dan-operasi",
  "judul": "Matriks: Notasi, Jenis, dan Operasi Dasar",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Menentukan ordo dan menyebut elemen pada posisi tertentu",
  "subKonsep": [
   "Matriks sebagai penyimpan data terstruktur berbentuk baris kali kolom",
   "Ordo matriks, penulisan elemen aᵢⱼ, dan syarat kesamaan dua matriks",
   "Jenis matriks: nol, identitas, diagonal, segitiga, persegi, baris, kolom",
   "Penjumlahan dan pengurangan matriks (mensyaratkan ordo sama)",
   "Perkalian matriks dengan skalar dan sifat-sifatnya",
   "Transpos matriks dan sifat-sifatnya",
   "Peran matriks nol dan matriks identitas seperti peran 0 dan 1 pada bilangan"
  ],
  "rumus": [
   "A = [aᵢⱼ] berordo m × n (m baris, n kolom)",
   "(A + B)ᵢⱼ = aᵢⱼ + bᵢⱼ",
   "(kA)ᵢⱼ = k · aᵢⱼ",
   "(Aᵀ)ᵢⱼ = aⱼᵢ",
   "A + O = A dan A + (−A) = O",
   "(A + B)ᵀ = Aᵀ + Bᵀ"
  ],
  "miskonsepsi": [
   "Mengira dua matriks dengan ordo berbeda tetap bisa dijumlahkan",
   "Menukar urutan indeks: membaca a₂₃ sebagai kolom 2 baris 3",
   "Mengira matriks identitas berisi angka 1 pada semua posisi"
  ],
  "kenapa": [
   "Kenapa penjumlahan matriks mensyaratkan ordo sama, tetapi perkalian tidak?",
   "Kenapa matriks nol dan matriks identitas berperan seperti 0 dan 1 pada bilangan biasa?"
  ],
  "prasyarat": [
   "sma10-membaca-data-dalam-bentuk-matriks",
   "sd6-operasi-penjumlahan-dan-pengurangan-bilangan"
  ]
 },
 {
  "id": "sma11-pembagian-polinomial-dan-skema-horner",
  "judul": "Pembagian Polinomial dan Skema Horner",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Membagi polinomial dengan cara bersusun",
  "subKonsep": [
   "Algoritma pembagian: yang dibagi = pembagi × hasil bagi + sisa",
   "Pembagian bersusun (long division) langkah demi langkah",
   "Skema Horner sebagai bentuk padat dari pembagian bersusun",
   "Pembagi berderajat satu bentuk (x − k)",
   "Pembagi berderajat satu bentuk (ax − b) dan penyesuaian hasil baginya",
   "Pembagi berderajat dua lewat Horner bertingkat atau pembagian bersusun",
   "Derajat sisa selalu lebih kecil daripada derajat pembagi"
  ],
  "rumus": [
   "P(x) = Q(x) · H(x) + S(x), dengan deg S < deg Q",
   "Pembagi (x − k): P(x) = (x − k)·H(x) + S, S berupa konstanta",
   "Pembagi (ax − b): P(x) = (ax − b)·[H(x)/a] + S",
   "Pembagi kuadrat: sisa berbentuk S(x) = px + q",
   "Horner untuk (x − k): turunkan koefisien, kali k, tambahkan ke koefisien berikutnya"
  ],
  "miskonsepsi": [
   "Menggunakan −k pada Horner padahal pembaginya (x − k) memerlukan k",
   "Lupa menuliskan koefisien nol untuk suku yang tidak muncul",
   "Mengira hasil bagi Horner untuk pembagi (ax − b) langsung benar tanpa dibagi a"
  ],
  "kenapa": [
   "Kenapa skema Horner bekerja — dari mana asal langkah \"turunkan, kali, jumlahkan\" itu?",
   "Kenapa derajat sisa harus lebih kecil daripada derajat pembagi?"
  ],
  "prasyarat": [
   "sma11-polinomial-bentuk-derajat-dan-operasi"
  ]
 },
 {
  "id": "sma11-pembuktian-geometris-dengan-vektor",
  "judul": "Pembuktian Geometris dengan Vektor",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Menyatakan unsur-unsur bangun datar dalam vektor posisi",
  "subKonsep": [
   "Menuliskan titik-titik bangun datar sebagai vektor posisi",
   "Menyatakan sisi dan diagonal sebagai selisih vektor posisi",
   "Membuktikan kesejajaran: dua vektor sejajar bila salah satu kelipatan skalar yang lain",
   "Membuktikan kolinearitas tiga titik",
   "Rumus titik tengah dan titik pembagi ruas garis",
   "Membuktikan sifat jajar genjang dan sifat garis tengah segitiga dengan vektor",
   "Membandingkan bukti vektor dengan bukti geometri klasik"
  ],
  "rumus": [
   "Vektor AB = b − a (dengan a, b vektor posisi A dan B)",
   "Titik tengah M dari AB: m = (a + b)/2",
   "Titik P membagi AB dengan rasio m : n ⟹ p = (n·a + m·b)/(m + n)",
   "a sejajar b ⟺ a = k·b untuk suatu skalar k ≠ 0",
   "A, B, C kolinear ⟺ vektor AB = k · vektor AC"
  ],
  "miskonsepsi": [
   "Menulis vektor AB = a − b (urutan terbalik)",
   "Mengira vektor sejajar berarti panjangnya juga harus sama",
   "Mengira membuktikan untuk satu contoh gambar sudah cukup sebagai bukti umum"
  ],
  "kenapa": [
   "Kenapa bukti dengan vektor bisa jauh lebih pendek daripada bukti geometri klasik?",
   "Kenapa satu vektor merupakan kelipatan vektor lain sudah cukup membuktikan kesejajaran?"
  ],
  "prasyarat": [
   "sma11-vektor-di-bidang-representasi-dan",
   "smp9-kekongruenan-bangun-datar-dan-segitiga"
  ]
 },
 {
  "id": "sma11-perkalian-matriks-dan-sifat-sifatnya",
  "judul": "Perkalian Matriks dan Sifat-sifatnya",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Memeriksa apakah dua matriks bisa dikalikan dan menentukan ordo hasilnya",
  "subKonsep": [
   "Syarat ordo: (m × n) dikali (n × p) menghasilkan (m × p)",
   "Aturan baris kali kolom dan maknanya sebagai jumlah hasil kali",
   "Perkalian matriks tidak bersifat komutatif: AB ≠ BA",
   "Perkalian matriks tetap asosiatif dan distributif terhadap penjumlahan",
   "AB = O tidak menjamin A = O atau B = O",
   "Perpangkatan matriks persegi dan pola berulangnya",
   "Penerapan: total biaya dari matriks kuantitas dikali matriks harga"
  ],
  "rumus": [
   "(AB)ᵢⱼ = Σₖ aᵢₖ · bₖⱼ",
   "A(BC) = (AB)C",
   "A(B + C) = AB + AC",
   "AI = IA = A",
   "(AB)ᵀ = Bᵀ Aᵀ",
   "k(AB) = (kA)B = A(kB)"
  ],
  "miskonsepsi": [
   "Mengalikan elemen yang seletak, seperti pada penjumlahan",
   "Mengira AB = BA karena kebiasaan dari perkalian bilangan",
   "Menyimpulkan A = O atau B = O dari AB = O"
  ],
  "kenapa": [
   "Kenapa aturannya baris kali kolom, bukan elemen kali elemen seletak?",
   "Kenapa perkalian matriks tidak komutatif, padahal perkalian bilangan komutatif?"
  ],
  "prasyarat": [
   "sma11-matriks-notasi-jenis-dan-operasi"
  ]
 },
 {
  "id": "sma11-polinomial-bentuk-derajat-dan-operasi",
  "judul": "Polinomial: Bentuk, Derajat, dan Operasi Aritmetika",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Menentukan derajat, koefisien utama, dan suku tetap sebuah polinomial",
  "subKonsep": [
   "Bentuk umum polinomial derajat n dan syarat pangkat bulat non-negatif",
   "Derajat, koefisien utama, koefisien, dan suku tetap",
   "Ketertutupan polinomial terhadap penjumlahan, pengurangan, dan perkalian",
   "Penjumlahan dan pengurangan dengan menggabungkan suku sejenis",
   "Perkalian polinomial dengan sifat distributif, tabel, atau susun bawah",
   "Menghitung nilai polinomial P(a) lewat substitusi langsung dan lewat Horner",
   "Bentuk yang BUKAN polinomial: pangkat negatif, pangkat pecahan, variabel di penyebut"
  ],
  "rumus": [
   "P(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + … + a₁x + a₀ dengan aₙ ≠ 0 dan n bilangan cacah",
   "deg(P · Q) = deg P + deg Q",
   "deg(P ± Q) ≤ maks(deg P, deg Q)",
   "P(a) = nilai polinomial saat x = a"
  ],
  "miskonsepsi": [
   "Mengira x^(1/2) atau 1/x boleh menjadi suku sebuah polinomial",
   "Mengira derajat jumlah selalu sama dengan derajat terbesar, padahal bisa turun bila suku utama saling meniadakan",
   "Menjumlahkan suku tidak sejenis, misalnya 3x² + 2x ditulis 5x³"
  ],
  "kenapa": [
   "Kenapa pangkat pada polinomial harus bilangan bulat tidak negatif?",
   "Kenapa derajat hasil kali persis penjumlahan kedua derajat?"
  ],
  "prasyarat": [
   "smp7-operasi-penjumlahan-dan-pengurangan-bentuk",
   "smp9-persamaan-kuadrat"
  ]
 },
 {
  "id": "sma11-sistem-persamaan-linear-dengan-matriks",
  "judul": "Sistem Persamaan Linear dengan Matriks",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Mengubah sistem persamaan linear menjadi bentuk matriks",
  "subKonsep": [
   "Menulis sistem persamaan linear dalam bentuk matriks AX = B",
   "Penyelesaian dengan invers: X = A⁻¹B",
   "Aturan Cramer menggunakan determinan",
   "Tafsiran geometris: berpotongan satu titik, sejajar, atau berimpit",
   "det A = 0 berarti tidak ada penyelesaian tunggal (tak hingga banyak atau tidak ada)",
   "Perluasan ke sistem tiga variabel dengan matriks 3×3",
   "Penerapan: perencanaan produksi, campuran bahan, keuangan multi-produk"
  ],
  "rumus": [
   "AX = B ⟹ X = A⁻¹B bila det A ≠ 0",
   "Cramer dua variabel: x = Dx/D, y = Dy/D",
   "D = det A (matriks koefisien)",
   "Dx = det A dengan kolom koefisien x diganti kolom B",
   "det A = 0 dan D_x ≠ 0 ⟹ tidak ada penyelesaian"
  ],
  "miskonsepsi": [
   "Menulis X = B A⁻¹ dengan urutan terbalik",
   "Mengira det A = 0 selalu berarti tidak ada penyelesaian, padahal bisa tak hingga banyak",
   "Menyusun matriks koefisien tanpa menyeragamkan urutan variabel lebih dulu"
  ],
  "kenapa": [
   "Kenapa penyelesaiannya X = A⁻¹B dan bukan B A⁻¹?",
   "Kenapa determinan nol secara geometris berarti garis-garisnya sejajar atau berimpit?"
  ],
  "prasyarat": [
   "sma11-determinan-dan-invers-matriks",
   "smp8-sistem-persamaan-linear-dua-variabel",
   "sma10-sistem-pertidaksamaan-linear-dua-variabel"
  ]
 },
 {
  "id": "sma11-teorema-sisa-dan-teorema-faktor",
  "judul": "Teorema Sisa dan Teorema Faktor",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Menentukan sisa pembagian hanya dengan substitusi",
  "subKonsep": [
   "Teorema sisa: sisa pembagian P(x) oleh (x − k) tepat sama dengan P(k)",
   "Teorema sisa untuk pembagi (ax − b): sisanya P(b/a)",
   "Teorema faktor: (x − k) faktor P(x) jika dan hanya jika P(k) = 0",
   "Menentukan sisa tanpa melakukan pembagian sama sekali",
   "Sisa pembagian oleh (x − a)(x − b) berbentuk px + q dan cara menentukannya",
   "Menentukan koefisien yang belum diketahui dari syarat sisa atau syarat faktor",
   "Teorema akar rasional untuk menebak calon akar secara sistematis"
  ],
  "rumus": [
   "P(x) dibagi (x − k) ⟹ sisa = P(k)",
   "P(x) dibagi (ax − b) ⟹ sisa = P(b/a)",
   "(x − k) faktor P(x) ⟺ P(k) = 0",
   "Sisa oleh (x−a)(x−b): S(x) = px + q dengan S(a) = P(a) dan S(b) = P(b)",
   "Calon akar rasional p/q: p membagi a₀ dan q membagi aₙ"
  ],
  "miskonsepsi": [
   "Menghitung P(−k) untuk pembagi (x − k)",
   "Mengira sisa nol hanya mungkin terjadi bila akarnya bilangan bulat",
   "Mengira teorema sisa juga berlaku langsung dengan substitusi tunggal untuk pembagi kuadrat"
  ],
  "kenapa": [
   "Kenapa cukup mensubstitusi x = k untuk tahu sisanya, tanpa membagi sama sekali?",
   "Kenapa akar rasional pasti berupa faktor suku tetap dibagi faktor koefisien utama?"
  ],
  "prasyarat": [
   "sma11-pembagian-polinomial-dan-skema-horner"
  ]
 },
 {
  "id": "sma11-vektor-di-bidang-representasi-dan",
  "judul": "Vektor di Bidang: Representasi dan Operasi",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "aljabar",
  "ringkas": "Menuliskan vektor dalam berbagai notasi dan berpindah antar notasi",
  "subKonsep": [
   "Vektor sebagai besaran berarah: punya panjang dan arah, tidak punya posisi tetap",
   "Notasi vektor: ruas garis berarah, pasangan komponen, dan vektor kolom",
   "Vektor posisi dan vektor satuan i dan j",
   "Panjang (besar) vektor dari komponennya",
   "Penjumlahan vektor: aturan ujung-ke-pangkal dan aturan jajar genjang",
   "Pengurangan vektor sebagai penjumlahan dengan invers penjumlahan",
   "Perkalian vektor dengan skalar secara komponen dan secara grafis",
   "Vektor sejajar dan vektor segaris (kolinear)"
  ],
  "rumus": [
   "a = (a₁, a₂) atau a = a₁i + a₂j",
   "|a| = √(a₁² + a₂²)",
   "a + b = (a₁ + b₁, a₂ + b₂)",
   "a − b = a + (−b)",
   "k·a = (k·a₁, k·a₂), dengan |k·a| = |k|·|a|",
   "Vektor satuan searah a: â = a / |a|"
  ],
  "miskonsepsi": [
   "Mengira dua vektor sama hanya bila titik pangkalnya sama",
   "Menjumlahkan besar vektor secara langsung tanpa memperhatikan arah",
   "Mengira |a + b| = |a| + |b| untuk semua vektor"
  ],
  "kenapa": [
   "Kenapa dua vektor dengan pangkal berbeda bisa dianggap vektor yang sama?",
   "Kenapa penjumlahan vektor dilakukan ujung-ke-pangkal, dan kenapa aturan jajar genjang memberi hasil yang sama?"
  ],
  "prasyarat": [
   "smp8-koordinat-kartesius",
   "smp8-teorema-pythagoras"
  ]
 },
 {
  "id": "sma11-populasi-sampel-dan-teknik-sampling",
  "judul": "Populasi, Sampel, dan Teknik Sampling",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "data",
  "ringkas": "Membedakan pernyataan tentang parameter dan tentang statistik",
  "subKonsep": [
   "Populasi vs sampel; parameter (mu, sigma, p) vs statistik (x_bar, s, p_topi)",
   "Sensus vs survei sampel dan alasan praktis memilih sampel",
   "Sampling acak sederhana dan cara mengundinya",
   "Sampling sistematis, berstrata (stratified), dan berkelompok (cluster)",
   "Sampling tidak acak (kemudahan, sukarelawan) dan biasnya",
   "Bias pemilihan, bias tanpa respons, dan bias pertanyaan",
   "Ukuran sampel: perannya pada ketelitian, bukan pada keterwakilan"
  ],
  "rumus": [
   "x_bar sebagai penduga mu",
   "p_topi = x/n sebagai penduga p",
   "s sebagai penduga sigma",
   "Tidak ada rumus baku untuk teknik sampling; yang penting prosedur pengacakannya"
  ],
  "miskonsepsi": [
   "Mengira sampel yang lebih besar selalu lebih baik walaupun cara pengambilannya bias",
   "Mengira jajak pendapat daring terbuka bisa mewakili seluruh penduduk",
   "Menyamakan sampling acak dengan 'asal ambil'"
  ],
  "kenapa": [
   "Kenapa 1.200 orang bisa mewakili 280 juta penduduk?",
   "Kenapa sampel besar yang bias justru lebih berbahaya daripada sampel kecil yang acak?"
  ],
  "prasyarat": [
   "sma11-proses-penyelidikan-statistika-dan-data",
   "sma11-asosiasi-bukan-sebab-akibat-perancu"
  ]
 },
 {
  "id": "sma11-aturan-cosinus",
  "judul": "Aturan Cosinus",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Menghitung sisi ketiga dari dua sisi dan sudut apitnya",
  "subKonsep": [
   "Aturan cosinus sebagai perluasan Teorema Pythagoras",
   "Suku koreksi -2bc cos A dan artinya untuk sudut lancip vs tumpul",
   "Kasus penggunaan: sisi-sudut-sisi (SAS) dan ketiga sisi (SSS)",
   "Bentuk terbalik untuk mencari besar sudut dari tiga sisi",
   "Menentukan jenis segitiga dari tanda cos A",
   "Penerapan pada jarak dan resultan dua vektor"
  ],
  "rumus": [
   "a^2 = b^2 + c^2 - 2bc cos A",
   "b^2 = a^2 + c^2 - 2ac cos B",
   "c^2 = a^2 + b^2 - 2ab cos C",
   "cos A = (b^2 + c^2 - a^2)/(2bc)"
  ],
  "miskonsepsi": [
   "Memasangkan cos dengan sudut yang bukan sudut apit kedua sisi",
   "Menganggap -2bc cos A selalu mengurangi (padahal bertambah bila sudut tumpul)",
   "Lupa menarik akar di akhir sehingga menjawab a^2 sebagai a"
  ],
  "kenapa": [
   "Kenapa aturan cosinus berubah menjadi Pythagoras persis saat sudutnya 90 derajat?",
   "Kenapa ada suku koreksi -2bc cos A, apa yang sebenarnya dikoreksi?"
  ],
  "prasyarat": [
   "smp8-teorema-pythagoras",
   "sma11-aturan-sinus"
  ]
 },
 {
  "id": "sma11-aturan-sinus",
  "judul": "Aturan Sinus",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Memilih pasangan sisi-sudut yang lengkap datanya",
  "subKonsep": [
   "Kebutuhan aturan baru saat segitiga tidak siku-siku",
   "Perbandingan sisi terhadap sinus sudut di hadapannya selalu tetap",
   "Hubungan nilai tetap itu dengan diameter lingkaran luar segitiga",
   "Kasus penggunaan: dua sudut satu sisi (ASA/AAS) dan dua sisi satu sudut (SSA)",
   "Kasus ambigu SSA: bisa muncul dua segitiga berbeda",
   "Penerapan pada pengukuran jarak tak terjangkau (triangulasi)"
  ],
  "rumus": [
   "a/sin A = b/sin B = c/sin C",
   "a/sin A = 2R, R = jari-jari lingkaran luar",
   "a = 2R sin A"
  ],
  "miskonsepsi": [
   "Memasangkan sisi dengan sudut yang bersebelahan, bukan yang berhadapan",
   "Menganggap hanya ada satu jawaban pada kasus SSA",
   "Memakai aturan sinus padahal data yang diketahui dua sisi dan sudut apit (harus cosinus)"
  ],
  "kenapa": [
   "Kenapa perbandingan sisi terhadap sinus sudut di depannya selalu sama untuk ketiga pasangan?",
   "Kenapa nilai tetap itu ternyata sama dengan diameter lingkaran luar segitiga?"
  ],
  "prasyarat": [
   "sma11-lingkaran-satuan-dan-perluasan-perbandingan",
   "sma10-teorema-pythagoras-dan-segitiga-siku"
  ]
 },
 {
  "id": "sma11-grafik-fungsi-trigonometri-amplitudo-periode",
  "judul": "Grafik Fungsi Trigonometri: Amplitudo, Periode, dan Pergeseran",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Menggambar sketsa grafik sinus/cosinus dari bentuk umumnya",
  "subKonsep": [
   "Menggulung lingkaran satuan menjadi grafik sinus dan cosinus",
   "Amplitudo a sebagai peregangan vertikal",
   "Periode dari koefisien b: periode = 360/b (atau 2pi/b)",
   "Pergeseran fasa (horizontal) c dan pergeseran vertikal d",
   "Grafik tangen, asimtot tegak, dan periode 180 derajat",
   "Domain, range, nilai maksimum dan minimum fungsi trigonometri"
  ],
  "rumus": [
   "y = a·sin(b(x - c)) + d",
   "Amplitudo = |a| ; Periode = 360/|b| derajat = 2pi/|b| radian",
   "Nilai maks = d + |a| ; nilai min = d - |a|",
   "y = tan x punya asimtot di x = 90 + 180k derajat"
  ],
  "miskonsepsi": [
   "Mengira b adalah periode, padahal periode = 360/b",
   "Mengira pergeseran horizontal sebesar c padahal harus difaktorkan dulu menjadi b(x - c)",
   "Menukar arah pergeseran: (x - c) dikira geser ke kiri"
  ],
  "kenapa": [
   "Kenapa grafik sinus berbentuk gelombang, dari mana lekukannya bila ditarik dari lingkaran satuan?",
   "Kenapa memperbesar b justru membuat gelombang lebih rapat, bukan lebih lebar?"
  ],
  "prasyarat": [
   "sma11-lingkaran-satuan-dan-perluasan-perbandingan",
   "sma11-aljabar-fungsi-operasi-pada-dua"
  ]
 },
 {
  "id": "sma11-identitas-trigonometri-dasar-dan-pembuktiannya",
  "judul": "Identitas Trigonometri Dasar dan Pembuktiannya",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Membuktikan identitas dengan langkah yang runtut dan sah",
  "subKonsep": [
   "Identitas kebalikan: cosec, secan, cotangen",
   "Identitas perbandingan: tan dan cot sebagai rasio sin dan cos",
   "Identitas Pythagoras dan dua turunannya",
   "Beda identitas (berlaku untuk semua nilai) dengan persamaan (berlaku untuk nilai tertentu)",
   "Strategi pembuktian: kerjakan satu ruas, ubah semua ke sin dan cos",
   "Menyederhanakan bentuk trigonometri yang rumit"
  ],
  "rumus": [
   "sin^2 x + cos^2 x = 1",
   "1 + tan^2 x = sec^2 x",
   "1 + cot^2 x = cosec^2 x",
   "tan x = sin x / cos x ; cot x = cos x / sin x",
   "sec x = 1/cos x ; cosec x = 1/sin x"
  ],
  "miskonsepsi": [
   "Menulis sin^2 x sebagai sin(x^2)",
   "Mengira sin 2x = 2 sin x (menganggap sin bersifat linear)",
   "Membuktikan identitas dengan mengerjakan kedua ruas sekaligus lalu 'bertemu' tanpa alasan sah"
  ],
  "kenapa": [
   "Kenapa sin^2 + cos^2 selalu 1 untuk sudut apa pun, termasuk sudut tumpul?",
   "Kenapa 1 + tan^2 = sec^2 hanyalah identitas Pythagoras yang dibagi cos^2?"
  ],
  "prasyarat": [
   "sma11-lingkaran-satuan-dan-perluasan-perbandingan",
   "smp7-operasi-penjumlahan-dan-pengurangan-bentuk"
  ]
 },
 {
  "id": "sma11-lingkaran-satuan-dan-perluasan-perbandingan",
  "judul": "Lingkaran Satuan dan Perluasan Perbandingan Trigonometri",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Menentukan nilai trigonometri sudut di semua kuadran tanpa menghafal tabel",
  "subKonsep": [
   "Lingkaran satuan: pusat di (0,0) dengan jari-jari 1",
   "Koordinat titik pada lingkaran satuan adalah (cos theta, sin theta)",
   "Perluasan sinus dan cosinus ke sudut tumpul, refleks, negatif, dan lebih dari 360 derajat",
   "Tanda nilai trigonometri di empat kuadran",
   "Sudut relasi/berelasi: 180 - x, 180 + x, 360 - x, -x",
   "Sudut koterminal dan sifat periodik nilai trigonometri"
  ],
  "rumus": [
   "x = cos theta, y = sin theta pada lingkaran satuan",
   "tan theta = sin theta / cos theta",
   "sin^2 theta + cos^2 theta = 1",
   "sin(180 - x) = sin x ; cos(180 - x) = -cos x",
   "sin(theta + 360k) = sin theta"
  ],
  "miskonsepsi": [
   "Mengira sinus dan cosinus hanya berlaku untuk sudut 0-90 derajat",
   "Menukar sumbu: mengira x adalah sin dan y adalah cos",
   "Menganggap nilai negatif berarti 'panjang negatif', bukan arah koordinat"
  ],
  "kenapa": [
   "Kenapa sinus sudut tumpul bisa didefinisikan padahal segitiga siku-siku tidak punya sudut tumpul?",
   "Kenapa sin^2 + cos^2 = 1 hanyalah Teorema Pythagoras yang menyamar?"
  ],
  "prasyarat": [
   "sma10-teorema-pythagoras-dan-segitiga-siku",
   "sma11-panjang-busur-luas-juring-dan"
  ]
 },
 {
  "id": "sma11-luas-segitiga-dengan-trigonometri",
  "judul": "Luas Segitiga dengan Trigonometri",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Menghitung luas segitiga tanpa mengetahui tingginya",
  "subKonsep": [
   "Menurunkan tinggi segitiga dengan sinus sudut",
   "Rumus luas dari dua sisi dan sudut apit",
   "Rumus luas dari satu sisi dan dua sudut",
   "Rumus Heron dari tiga sisi dan kaitannya dengan aturan cosinus",
   "Luas segi banyak beraturan sebagai gabungan segitiga sama kaki",
   "Luas jajargenjang dan segi empat dari diagonal dan sudutnya"
  ],
  "rumus": [
   "L = 1/2 · a·b·sin C",
   "L = a^2 sin B sin C / (2 sin A)",
   "Heron: L = akar(s(s-a)(s-b)(s-c)), s = (a+b+c)/2",
   "L = abc/(4R)",
   "Segi-n beraturan: L = (n/2)·r^2·sin(360/n)"
  ],
  "miskonsepsi": [
   "Memakai sudut yang tidak diapit oleh kedua sisi pada rumus 1/2·ab·sin C",
   "Mengira sin C harus selalu sudut lancip sehingga luas segitiga tumpul dihitung salah",
   "Mencampur satuan derajat dan radian pada kalkulator"
  ],
  "kenapa": [
   "Kenapa 1/2·a·b·sin C, dari mana sin C menggantikan tinggi segitiga?",
   "Kenapa luas segitiga tumpul dengan sudut 150 derajat sama dengan yang bersudut 30 derajat bila sisinya sama?"
  ],
  "prasyarat": [
   "sma11-aturan-cosinus",
   "sd5-luas-persegi-persegi-panjang-dan"
  ]
 },
 {
  "id": "sma11-matriks-transformasi-dan-komposisi-transformasi",
  "judul": "Matriks Transformasi dan Komposisi Transformasi",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Menyusun matriks transformasi dari deskripsi verbal",
  "subKonsep": [
   "Menyatakan transformasi sebagai perkalian matriks 2×2 dengan vektor kolom",
   "Matriks baku untuk refleksi, rotasi, dan dilatasi",
   "Komposisi transformasi sebagai hasil kali matriks (urutan berpengaruh)",
   "Determinan matriks transformasi sebagai faktor perubahan luas",
   "Transformasi invers sebagai invers matriks",
   "Kenapa translasi tidak bisa ditulis sebagai matriks 2×2 biasa"
  ],
  "rumus": [
   "Rotasi theta: [[cos theta, -sin theta],[sin theta, cos theta]]",
   "Refleksi sumbu x: [[1,0],[0,-1]] ; sumbu y: [[-1,0],[0,1]] ; y = x: [[0,1],[1,0]]",
   "Dilatasi k: [[k,0],[0,k]]",
   "Komposisi T2 setelah T1 = M2 · M1 (bukan M1 · M2)",
   "Luas bayangan = |det M| × luas asal"
  ],
  "miskonsepsi": [
   "Menulis komposisi dengan urutan matriks terbalik",
   "Mengira perkalian matriks bersifat komutatif sehingga urutan transformasi tidak penting",
   "Mengira determinan negatif berarti luas negatif, bukan pembalikan orientasi"
  ],
  "kenapa": [
   "Kenapa kolom-kolom matriks transformasi ternyata adalah bayangan titik (1,0) dan (0,1)?",
   "Kenapa transformasi yang dilakukan belakangan justru ditulis di sebelah kiri?"
  ],
  "prasyarat": [
   "sma11-rotasi-dan-dilatasi-pada-bidang",
   "sma11-determinan-dan-invers-matriks"
  ]
 },
 {
  "id": "sma11-pemodelan-fenomena-periodik-dengan-fungsi",
  "judul": "Pemodelan Fenomena Periodik dengan Fungsi Trigonometri",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Menentukan garis tengah dan amplitudo dari nilai maksimum dan minimum data",
  "subKonsep": [
   "Ciri fenomena periodik: berulang dengan pola dan selang waktu tetap",
   "Menerjemahkan data nyata menjadi amplitudo, periode, garis tengah, dan fasa",
   "Contoh: pasang surut air laut, panjang siang hari, roda bianglala, denyut jantung, arus AC",
   "Memilih sin atau cos berdasarkan kondisi awal",
   "Menafsirkan makna fisis tiap parameter",
   "Memakai model untuk memprediksi nilai pada waktu tertentu"
  ],
  "rumus": [
   "h(t) = a·sin(2pi/T · (t - t0)) + d dengan T = periode",
   "d = (maks + min)/2 ; a = (maks - min)/2",
   "frekuensi = 1/T"
  ],
  "miskonsepsi": [
   "Mengira amplitudo sama dengan nilai maksimum, bukan setengah jangkauan",
   "Melupakan pergeseran vertikal sehingga model berayun di sekitar nol",
   "Memakai derajat dan radian bercampur dalam satu model"
  ],
  "kenapa": [
   "Kenapa ketinggian penumpang bianglala membentuk grafik sinus, bukan garis zig-zag?",
   "Kenapa amplitudo dihitung dari selisih maksimum-minimum dibagi dua?"
  ],
  "prasyarat": [
   "sma11-grafik-fungsi-trigonometri-amplitudo-periode"
  ]
 },
 {
  "id": "sma11-perkalian-titik-sudut-antarvektor-dan",
  "judul": "Perkalian Titik, Sudut Antarvektor, dan Proyeksi Vektor",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Menghitung sudut antara dua vektor dari komponennya",
  "subKonsep": [
   "Perkalian skalar dua vektor dan hasilnya berupa bilangan, bukan vektor",
   "Dua rumus perkalian titik: bentuk komponen dan bentuk |u||v| cos theta",
   "Menentukan sudut antara dua vektor",
   "Syarat tegak lurus (hasil kali titik nol) dan syarat sejajar",
   "Proyeksi skalar ortogonal dan proyeksi vektor ortogonal",
   "Penerapan pada usaha dalam fisika dan penguraian gaya"
  ],
  "rumus": [
   "u·v = x1x2 + y1y2",
   "u·v = |u||v| cos theta",
   "cos theta = (u·v)/(|u||v|)",
   "u tegak lurus v jika u·v = 0",
   "Proyeksi skalar u pada v = (u·v)/|v| ; proyeksi vektor = ((u·v)/|v|^2)·v"
  ],
  "miskonsepsi": [
   "Mengira hasil perkalian titik adalah vektor",
   "Menukar proyeksi skalar dengan proyeksi vektor",
   "Membagi dengan |v| padahal seharusnya |v|^2 pada proyeksi vektor"
  ],
  "kenapa": [
   "Kenapa perkalian dua vektor bisa menghasilkan bilangan biasa, apa makna geometrisnya?",
   "Kenapa u·v = 0 tepat berarti kedua vektor saling tegak lurus?"
  ],
  "prasyarat": [
   "sma10-vektor-dan-operasinya",
   "sma11-aturan-cosinus"
  ]
 },
 {
  "id": "sma11-persamaan-trigonometri",
  "judul": "Persamaan Trigonometri",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Menentukan seluruh penyelesaian pada interval 0 sampai 360 derajat",
  "subKonsep": [
   "Beda persamaan trigonometri dengan identitas trigonometri",
   "Penyelesaian dasar sin x = sin a, cos x = cos a, tan x = tan a",
   "Himpunan penyelesaian pada interval terbatas vs penyelesaian umum",
   "Peran periodisitas: kenapa penyelesaiannya tak berhingga banyak",
   "Persamaan berbentuk kuadrat dalam sin/cos",
   "Bentuk a cos x + b sin x = c dan pengubahannya menjadi k cos(x - alpha)"
  ],
  "rumus": [
   "sin x = sin a → x = a + 360k atau x = (180 - a) + 360k",
   "cos x = cos a → x = ±a + 360k",
   "tan x = tan a → x = a + 180k",
   "a cos x + b sin x = k cos(x - alpha), k = akar(a^2 + b^2), tan alpha = b/a"
  ],
  "miskonsepsi": [
   "Hanya menuliskan satu penyelesaian (hasil arcsin kalkulator) dan mengabaikan yang lain",
   "Membagi kedua ruas dengan cos x tanpa memeriksa kemungkinan cos x = 0, sehingga akar hilang",
   "Mengira sin x = 2 punya penyelesaian"
  ],
  "kenapa": [
   "Kenapa satu persamaan trigonometri bisa punya penyelesaian tak berhingga?",
   "Kenapa dari sin x = 1/2 muncul dua sudut dalam satu putaran, bukan satu?"
  ],
  "prasyarat": [
   "sma11-identitas-trigonometri-dasar-dan-pembuktiannya",
   "sma11-grafik-fungsi-trigonometri-amplitudo-periode"
  ]
 },
 {
  "id": "sma11-rotasi-dan-dilatasi-pada-bidang",
  "judul": "Rotasi dan Dilatasi pada Bidang Koordinat",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Menentukan bayangan titik dan kurva oleh rotasi dan dilatasi",
  "subKonsep": [
   "Rotasi terhadap titik asal sebesar sudut theta berlawanan arah jarum jam",
   "Rotasi terhadap pusat sembarang (p, q)",
   "Rotasi istimewa 90, 180, dan 270 derajat",
   "Dilatasi dengan pusat dan faktor skala k, termasuk k negatif dan |k| < 1",
   "Pengaruh dilatasi pada panjang (×k) dan luas (×k^2)",
   "Dilatasi bukan isometri: bentuk tetap sebangun, ukuran berubah"
  ],
  "rumus": [
   "Rotasi pusat O sudut theta: x' = x cos theta - y sin theta ; y' = x sin theta + y cos theta",
   "Rotasi 90 derajat: (x, y) → (-y, x)",
   "Rotasi 180 derajat: (x, y) → (-x, -y)",
   "Dilatasi [O, k]: (x, y) → (kx, ky)",
   "Dilatasi [(p,q), k]: (x, y) → (p + k(x - p), q + k(y - q))"
  ],
  "miskonsepsi": [
   "Mengira rotasi positif searah jarum jam",
   "Menghitung luas bayangan dilatasi dengan mengalikan k, bukan k^2",
   "Mengira dilatasi dengan k negatif hanya memperkecil, bukan juga memutar 180 derajat"
  ],
  "kenapa": [
   "Kenapa rumus rotasi memuat cos dan sin, apa hubungannya dengan lingkaran satuan?",
   "Kenapa luas berubah k^2 kali sedangkan panjang hanya k kali?"
  ],
  "prasyarat": [
   "sma11-translasi-dan-refleksi-pada-bidang",
   "sma11-lingkaran-satuan-dan-perluasan-perbandingan"
  ]
 },
 {
  "id": "sma11-rumus-jumlah-dan-selisih-dua",
  "judul": "Rumus Jumlah dan Selisih Dua Sudut",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Menentukan nilai eksak sin 75, cos 15, tan 105 dan sejenisnya",
  "subKonsep": [
   "Kenapa cos(A + B) tidak sama dengan cos A + cos B",
   "Rumus jumlah dan selisih untuk sinus, cosinus, dan tangen",
   "Pembuktian geometris dengan dua segitiga siku-siku bertumpuk atau rotasi lingkaran satuan",
   "Menghitung nilai sudut tak istimewa (15, 75, 105 derajat) dari sudut istimewa",
   "Rumus perkalian ke jumlah dan jumlah ke perkalian sebagai lanjutan",
   "Penerapan pada penyederhanaan dan pembuktian identitas"
  ],
  "rumus": [
   "sin(A ± B) = sin A cos B ± cos A sin B",
   "cos(A ± B) = cos A cos B ∓ sin A sin B",
   "tan(A ± B) = (tan A ± tan B)/(1 ∓ tan A tan B)",
   "sin A + sin B = 2 sin((A+B)/2) cos((A-B)/2)",
   "cos A + cos B = 2 cos((A+B)/2) cos((A-B)/2)"
  ],
  "miskonsepsi": [
   "Mendistribusikan: sin(A + B) dikira sin A + sin B",
   "Lupa tanda berlawanan pada rumus cosinus (cos jumlah memakai tanda minus)",
   "Menukar posisi sin dan cos pada suku kedua rumus sinus"
  ],
  "kenapa": [
   "Kenapa sin(A + B) tidak boleh dijabarkan seperti perkalian aljabar biasa?",
   "Kenapa rumus cos(A + B) memakai tanda minus padahal sudutnya dijumlahkan?"
  ],
  "prasyarat": [
   "sma11-identitas-trigonometri-dasar-dan-pembuktiannya",
   "sma11-lingkaran-satuan-dan-perluasan-perbandingan"
  ]
 },
 {
  "id": "sma11-rumus-sudut-rangkap-dan-setengah",
  "judul": "Rumus Sudut Rangkap dan Setengah Sudut",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Menurunkan rumus sudut rangkap sendiri dari rumus jumlah sudut",
  "subKonsep": [
   "Sudut rangkap sebagai kasus khusus A + A pada rumus jumlah sudut",
   "Tiga bentuk setara cos 2A dan kapan masing-masing dipakai",
   "Rumus setengah sudut sebagai kebalikan rumus sudut rangkap",
   "Penentuan tanda pada rumus setengah sudut berdasarkan kuadran",
   "Rumus penurunan pangkat (sin^2 dan cos^2 dinyatakan dalam cos 2A)",
   "Sudut rangkap tiga sebagai perluasan"
  ],
  "rumus": [
   "sin 2A = 2 sin A cos A",
   "cos 2A = cos^2 A - sin^2 A = 2cos^2 A - 1 = 1 - 2sin^2 A",
   "tan 2A = 2 tan A/(1 - tan^2 A)",
   "sin^2 A = (1 - cos 2A)/2 ; cos^2 A = (1 + cos 2A)/2",
   "sin(A/2) = ± akar((1 - cos A)/2)"
  ],
  "miskonsepsi": [
   "Menulis sin 2A = 2 sin A",
   "Mengira ketiga bentuk cos 2A adalah rumus berbeda yang harus dihafal terpisah",
   "Selalu mengambil tanda positif pada rumus setengah sudut"
  ],
  "kenapa": [
   "Kenapa sin 2A = 2 sin A cos A dan bukan 2 sin A, apa yang terjadi pada segitiganya?",
   "Kenapa cos 2A punya tiga wajah yang semuanya benar?"
  ],
  "prasyarat": [
   "sma11-rumus-jumlah-dan-selisih-dua"
  ]
 },
 {
  "id": "sma11-translasi-dan-refleksi-pada-bidang",
  "judul": "Translasi dan Refleksi pada Bidang Koordinat",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Menentukan bayangan titik, ruas garis, dan bangun datar",
  "subKonsep": [
   "Transformasi sebagai pemetaan titik ke titik (bukan sekadar 'menggeser gambar')",
   "Translasi oleh vektor (a, b) dan sifatnya mengawetkan bentuk dan ukuran",
   "Refleksi terhadap sumbu x, sumbu y, garis y = x, y = -x, dan titik asal",
   "Refleksi terhadap garis x = h dan y = k",
   "Isometri: transformasi yang mengawetkan jarak",
   "Menentukan bayangan kurva/persamaan, bukan hanya bayangan titik"
  ],
  "rumus": [
   "Translasi (a,b): (x, y) → (x + a, y + b)",
   "Refleksi sumbu x: (x, y) → (x, -y)",
   "Refleksi sumbu y: (x, y) → (-x, y)",
   "Refleksi y = x: (x, y) → (y, x)",
   "Refleksi x = h: (x, y) → (2h - x, y)"
  ],
  "miskonsepsi": [
   "Mensubstitusi x dan y bayangan langsung ke persamaan asal (harus substitusi balik)",
   "Mengira refleksi terhadap x = 3 sama dengan (x, y) → (3 - x, y)",
   "Menukar aturan refleksi y = x dengan y = -x"
  ],
  "kenapa": [
   "Kenapa untuk mencari persamaan bayangan kita justru memasukkan rumus kebalikannya?",
   "Kenapa refleksi terhadap x = h menghasilkan 2h - x, dari mana angka 2-nya?"
  ],
  "prasyarat": [
   "smp8-koordinat-kartesius"
  ]
 },
 {
  "id": "sma11-vektor-pada-bidang-datar-dan",
  "judul": "Vektor pada Bidang Datar dan Operasinya",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "geometri",
  "ringkas": "Menggambar penjumlahan vektor secara geometris dan menghitungnya secara komponen",
  "subKonsep": [
   "Vektor sebagai besaran berarah: beda dengan skalar dan dengan titik",
   "Notasi vektor: ruas garis berarah, pasangan komponen, dan kombinasi i-j",
   "Penjumlahan vektor: aturan segitiga dan aturan jajargenjang",
   "Pengurangan vektor dan vektor negatif",
   "Perkalian vektor dengan skalar dan syarat dua vektor sejajar/kolinear",
   "Vektor posisi, panjang vektor, dan vektor satuan"
  ],
  "rumus": [
   "u = (x, y) ; |u| = akar(x^2 + y^2)",
   "u + v = (x1 + x2, y1 + y2)",
   "AB = OB - OA",
   "Vektor satuan: e = u/|u|",
   "Titik pembagi: P = (m·B + n·A)/(m + n) untuk AP : PB = m : n"
  ],
  "miskonsepsi": [
   "Menganggap vektor sama dengan titik koordinat sehingga arah diabaikan",
   "Menjumlahkan panjang vektor secara langsung: |u + v| dikira |u| + |v|",
   "Menganggap AB dan BA vektor yang sama"
  ],
  "kenapa": [
   "Kenapa dua vektor dijumlahkan dengan disambung ujung-ke-pangkal, bukan diadu langsung?",
   "Kenapa panjang jumlah dua vektor bisa lebih kecil dari panjang salah satunya?"
  ],
  "prasyarat": [
   "smp8-koordinat-kartesius",
   "smp8-teorema-pythagoras"
  ]
 },
 {
  "id": "sma11-aturan-turunan-dasar-pangkat-kelipatan",
  "judul": "Aturan Turunan Dasar: Pangkat, Kelipatan, Jumlah, dan Selisih",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "ringkas": "Menurunkan fungsi polinomial dengan cepat dan benar",
  "subKonsep": [
   "Turunan fungsi konstan",
   "Aturan pangkat untuk pangkat bulat positif",
   "Perluasan aturan pangkat ke pangkat negatif dan pecahan",
   "Aturan kelipatan konstanta",
   "Aturan jumlah dan selisih",
   "Menurunkan fungsi polinomial dan bentuk akar setelah diubah ke bentuk pangkat"
  ],
  "rumus": [
   "d/dx (c) = 0",
   "d/dx (xⁿ) = n·xⁿ⁻¹",
   "d/dx (c·f(x)) = c·f'(x)",
   "d/dx (f(x) ± g(x)) = f'(x) ± g'(x)",
   "d/dx (√x) = 1/(2√x)"
  ],
  "miskonsepsi": [
   "Lupa menurunkan bentuk akar karena belum diubah ke bentuk pangkat",
   "Mengira turunan konstanta adalah konstanta itu sendiri",
   "Salah tanda pada pangkat negatif, misalnya menurunkan x⁻² menjadi −2x⁻¹"
  ],
  "kenapa": [
   "Dari mana rumus n·xⁿ⁻¹ — kenapa pangkatnya 'turun ke depan'?",
   "Kenapa turunan sebuah konstanta selalu nol?"
  ],
  "prasyarat": [
   "sma11-definisi-turunan-sebagai-limit",
   "sma10-bentuk-akar",
   "smp7-operasi-penjumlahan-dan-pengurangan-bentuk"
  ]
 },
 {
  "id": "sma11-bentuk-taktentu-0-0-pada",
  "judul": "Bentuk Taktentu 0/0 pada Limit Fungsi Aljabar",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "ringkas": "Memfaktorkan pembilang dan penyebut untuk menghilangkan faktor nol",
  "subKonsep": [
   "Mengenali bentuk taktentu 0/0 setelah substitusi",
   "Pemfaktoran dan pencoretan faktor (x − a) dengan syarat x ≠ a",
   "Perkalian dengan bentuk sekawan untuk limit yang memuat akar",
   "Menyederhanakan pecahan bertingkat sebelum substitusi",
   "Kaitan antara faktor yang dicoret dengan 'lubang' pada grafik",
   "Memeriksa ulang hasil dengan pendekatan numerik"
  ],
  "rumus": [
   "(x² − a²)/(x − a) = x + a untuk x ≠ a",
   "(√A − √B)(√A + √B) = A − B",
   "(x³ − a³)/(x − a) = x² + ax + a² untuk x ≠ a"
  ],
  "miskonsepsi": [
   "Mencoret faktor (x − a) tanpa menyadari syarat x ≠ a",
   "Menganggap fungsi hasil penyederhanaan identik dengan fungsi asalnya",
   "Menyimpulkan limit = 0 hanya karena pembilang menuju nol"
  ],
  "kenapa": [
   "Kenapa kita boleh mencoret faktor yang nilainya justru nol saat x mendekati a?",
   "Kenapa grafiknya hanya 'berlubang' dan bukan terputus atau melompat?"
  ],
  "prasyarat": [
   "sma11-sifat-sifat-limit-dan-limit",
   "smp8-pemfaktoran-bentuk-aljabar",
   "smp9-operasi-bentuk-akar-dan-merasionalkan"
  ]
 },
 {
  "id": "sma11-definisi-turunan-sebagai-limit",
  "judul": "Definisi Turunan sebagai Limit",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "ringkas": "Menurunkan f(x) = x², √x, dan 1/x langsung dari definisi limit",
  "subKonsep": [
   "Peralihan dari gradien tali busur ke gradien garis singgung",
   "Definisi turunan di satu titik sebagai limit hasil bagi selisih",
   "Fungsi turunan f'(x) sebagai fungsi baru",
   "Ragam notasi turunan: f'(x), y', dy/dx, d/dx",
   "Menurunkan fungsi sederhana langsung dari definisi",
   "Titik yang tidak memiliki turunan: sudut tajam, garis singgung tegak, titik diskontinu"
  ],
  "rumus": [
   "f'(a) = lim(h→0) (f(a+h) − f(a)) / h",
   "f'(x) = lim(h→0) (f(x+h) − f(x)) / h",
   "dy/dx = lim(Δx→0) Δy/Δx"
  ],
  "miskonsepsi": [
   "Memperlakukan dy/dx sebagai pecahan biasa yang bisa dicoret",
   "Mengira f'(x) berarti nilai fungsi dibagi x",
   "Mengira semua fungsi kontinu pasti bisa diturunkan"
  ],
  "kenapa": [
   "Kenapa turunan harus didefinisikan lewat limit, bukan dengan membagi langsung?",
   "Kenapa grafik nilai mutlak tidak punya turunan di titik sudutnya?"
  ],
  "konsep": [
   "turunan-kemiringan"
  ],
  "prasyarat": [
   "sma11-laju-perubahan-rata-rata-dan",
   "sma11-bentuk-taktentu-0-0-pada",
   "sma11-kekontinuan-fungsi"
  ]
 },
 {
  "id": "sma11-fungsi-naik-fungsi-turun-dan",
  "judul": "Fungsi Naik, Fungsi Turun, dan Titik Stasioner",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "ringkas": "Menentukan selang naik dan turun suatu fungsi",
  "subKonsep": [
   "Tanda f'(x) sebagai penentu arah grafik",
   "Selang fungsi naik dan selang fungsi turun",
   "Titik stasioner sebagai penyelesaian f'(x) = 0",
   "Jenis titik stasioner: maksimum lokal, minimum lokal, belok datar",
   "Uji garis bilangan tanda turunan",
   "Membaca grafik f dari grafik f' dan sebaliknya"
  ],
  "rumus": [
   "f'(x) > 0 ⟹ f naik",
   "f'(x) < 0 ⟹ f turun",
   "f'(x) = 0 ⟹ titik stasioner"
  ],
  "miskonsepsi": [
   "Mengira f'(x) = 0 selalu berarti maksimum atau minimum",
   "Menentukan naik-turun dari tanda f(x), bukan tanda f'(x)",
   "Mengira fungsi naik berarti nilai fungsinya positif"
  ],
  "kenapa": [
   "Kenapa tanda turunan bisa memberi tahu arah grafik tanpa harus menggambarnya?",
   "Kenapa ada titik dengan f' = 0 yang bukan puncak maupun lembah?"
  ],
  "prasyarat": [
   "sma11-aturan-turunan-dasar-pangkat-kelipatan",
   "sma11-definisi-turunan-sebagai-limit"
  ]
 },
 {
  "id": "sma11-gradien-dan-persamaan-garis-singgung",
  "judul": "Gradien dan Persamaan Garis Singgung Kurva",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "ringkas": "Menyusun persamaan garis singgung dan garis normal di titik tertentu",
  "subKonsep": [
   "Gradien garis singgung di titik (a, f(a)) sama dengan f'(a)",
   "Menyusun persamaan garis singgung",
   "Garis normal dan hubungan gradiennya dengan garis singgung",
   "Garis singgung dengan gradien tertentu yang diketahui",
   "Garis singgung dari titik di luar kurva",
   "Sudut potong antara dua kurva"
  ],
  "rumus": [
   "m = f'(a)",
   "y − f(a) = f'(a)·(x − a)",
   "m_normal = −1 / f'(a)",
   "m_singgung · m_normal = −1"
  ],
  "miskonsepsi": [
   "Memakai nilai f(a) sebagai gradien, bukan f'(a)",
   "Mengira garis singgung hanya boleh menyentuh kurva di satu titik saja",
   "Menukar gradien garis singgung dan garis normal"
  ],
  "kenapa": [
   "Kenapa gradien garis singgung sama persis dengan nilai turunan?",
   "Kenapa sebuah garis singgung bisa memotong kurva di titik lain?"
  ],
  "prasyarat": [
   "sma11-definisi-turunan-sebagai-limit",
   "smp8-persamaan-garis-lurus-dan-gradien",
   "sma11-aturan-turunan-dasar-pangkat-kelipatan"
  ]
 },
 {
  "id": "sma11-kekontinuan-fungsi",
  "judul": "Kekontinuan Fungsi",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "ringkas": "Memeriksa kekontinuan sebuah fungsi di titik tertentu",
  "subKonsep": [
   "Tiga syarat kekontinuan di sebuah titik",
   "Diskontinu terhapuskan (lubang), diskontinu lompatan, dan diskontinu tak hingga",
   "Kekontinuan pada selang terbuka dan tertutup",
   "Kekontinuan fungsi piecewise dan pencarian nilai parameter agar kontinu",
   "Gambaran 'menggambar tanpa mengangkat pensil' beserta batasannya",
   "Gagasan teorema nilai antara secara intuitif"
  ],
  "rumus": [
   "f kontinu di x = a ⟺ f(a) terdefinisi, lim(x→a) f(x) ada, dan lim(x→a) f(x) = f(a)"
  ],
  "miskonsepsi": [
   "Mengira fungsi yang punya penyebut nol pasti tidak kontinu di seluruh domainnya",
   "Menyamakan kontinu dengan mulus (tidak bersudut)",
   "Mengira limit ada sudah cukup untuk menyimpulkan kontinu"
  ],
  "kenapa": [
   "Kenapa dibutuhkan tiga syarat, tidak cukup satu saja?",
   "Kenapa fungsi nilai mutlak kontinu di nol tetapi tidak punya turunan di sana?"
  ],
  "prasyarat": [
   "sma11-konsep-dan-pengertian-limit-fungsi",
   "sma11-limit-di-tak-hingga-limit"
  ]
 },
 {
  "id": "sma11-konsep-dan-pengertian-limit-fungsi",
  "judul": "Konsep dan Pengertian Limit Fungsi",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "ringkas": "Membaca nilai limit dari grafik, termasuk grafik berlubang dan bertingkat",
  "subKonsep": [
   "Nilai yang didekati fungsi versus nilai fungsi tepat di titik itu",
   "Pendekatan numerik lewat tabel dari kiri dan dari kanan",
   "Limit kiri dan limit kanan",
   "Syarat limit ada: limit kiri sama dengan limit kanan",
   "Grafik berlubang (fungsi tidak terdefinisi di x = a tetapi limitnya ada)",
   "Kasus limit tidak ada: lompatan, membesar tanpa batas, berosilasi"
  ],
  "rumus": [
   "lim(x→a) f(x) = L",
   "lim(x→a⁻) f(x) = lim(x→a⁺) f(x) = L"
  ],
  "miskonsepsi": [
   "Mengira limit selalu sama dengan nilai fungsi di titik tersebut",
   "Mengira fungsi harus terdefinisi di x = a agar limitnya ada",
   "Membaca 'x → 2' sebagai 'x = 2'"
  ],
  "kenapa": [
   "Kenapa sebuah fungsi bisa punya limit di titik yang justru tidak punya nilai fungsi?",
   "Kenapa limit harus diperiksa dari dua arah?"
  ],
  "prasyarat": [
   "sma10-fungsi-kuadrat-dan-grafiknya-parabola",
   "sma11-laju-perubahan-rata-rata-dan"
  ]
 },
 {
  "id": "sma11-laju-perubahan-rata-rata-dan",
  "judul": "Laju Perubahan Rata-rata dan Laju Perubahan Sesaat",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "ringkas": "Menghitung laju perubahan rata-rata dari tabel, grafik, atau rumus fungsi",
  "subKonsep": [
   "Perubahan Δy dan Δx dibaca dari tabel, grafik, dan rumus fungsi",
   "Laju perubahan rata-rata sebagai gradien tali busur antara dua titik pada kurva",
   "Tali busur yang kedua titiknya makin berdekatan",
   "Laju perubahan sesaat sebagai gradien garis singgung di satu titik",
   "Notasi hasil bagi selisih f(a+h) − f(a) dibagi h",
   "Penafsiran satuan laju perubahan pada konteks nyata (km/jam, rupiah per unit)"
  ],
  "rumus": [
   "laju rata-rata = (f(b) − f(a)) / (b − a)",
   "laju sesaat di x = a: lim(h→0) (f(a+h) − f(a)) / h",
   "gradien tali busur = Δy/Δx"
  ],
  "miskonsepsi": [
   "Mengira kecepatan sesaat sama dengan jarak total dibagi waktu total",
   "Menganggap Δy/Δx kehilangan makna ketika Δx sangat kecil",
   "Menyamakan grafik jarak-waktu yang menanjak curam dengan percepatan besar"
  ],
  "kenapa": [
   "Kenapa gradien tali busur bisa 'berubah menjadi' gradien garis singgung kalau dua titiknya didekatkan?",
   "Kenapa kita memakai h mendekati 0 dan bukan langsung h = 0?"
  ],
  "prasyarat": [
   "smp8-persamaan-garis-lurus-dan-gradien",
   "sma10-fungsi-kuadrat-dan-grafiknya-parabola"
  ]
 },
 {
  "id": "sma11-laju-perubahan-terkait-dan-penerapan",
  "judul": "Laju Perubahan Terkait dan Penerapan Turunan pada Kinematika serta Ekonomi",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "ringkas": "Menurunkan fungsi posisi untuk memperoleh kecepatan dan percepatan",
  "subKonsep": [
   "Hubungan posisi, kecepatan, dan percepatan",
   "Kecepatan sesaat, laju, dan arah gerak dari tanda kecepatan",
   "Laju perubahan terkait yang dihubungkan lewat aturan rantai",
   "Contoh laju terkait: pengisian tangki, tangga merosot, bayangan memanjang",
   "Biaya marginal, pendapatan marginal, dan keuntungan maksimum",
   "Konsistensi satuan pada setiap laju"
  ],
  "rumus": [
   "v(t) = s'(t)",
   "a(t) = v'(t) = s''(t)",
   "dV/dt = dV/dr · dr/dt",
   "biaya marginal = C'(x); pendapatan marginal = R'(x)"
  ],
  "miskonsepsi": [
   "Menyamakan kecepatan dengan laju sehingga mengabaikan tanda",
   "Mengira benda berhenti ketika percepatannya nol",
   "Mensubstitusi angka lebih dulu sebelum menurunkan pada soal laju terkait"
  ],
  "kenapa": [
   "Kenapa percepatan adalah turunan dari turunan posisi?",
   "Kenapa laju memanjangnya bayangan bisa dihitung hanya dari laju berjalan seseorang?"
  ],
  "prasyarat": [
   "sma11-definisi-turunan-sebagai-limit",
   "sma11-turunan-implisit-dan-turunan-tingkat"
  ]
 },
 {
  "id": "sma11-limit-di-tak-hingga-limit",
  "judul": "Limit di Tak Hingga, Limit Tak Hingga, dan Asimtot",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "ringkas": "Menentukan asimtot datar dan tegak suatu fungsi rasional",
  "subKonsep": [
   "Perilaku ujung grafik saat x menuju tak hingga dan minus tak hingga",
   "Membagi pembilang dan penyebut dengan pangkat tertinggi",
   "Bentuk taktentu ∞/∞ dan ∞ − ∞",
   "Limit selisih dua bentuk akar kuadrat",
   "Asimtot datar dan asimtot tegak dari fungsi rasional",
   "Asimtot miring dan kaitannya dengan pembagian polinomial"
  ],
  "rumus": [
   "lim(x→∞) 1/xⁿ = 0 untuk n > 0",
   "lim(x→∞) (axⁿ + …)/(bxᵐ + …) = a/b jika n = m; 0 jika n < m; ±∞ jika n > m",
   "lim(x→∞) (√(ax² + bx + c) − √(ax² + px + q)) = (b − p)/(2√a)"
  ],
  "miskonsepsi": [
   "Memperlakukan ∞ sebagai bilangan sehingga menulis ∞ − ∞ = 0 atau ∞/∞ = 1",
   "Mengira grafik tidak boleh memotong asimtot datar",
   "Menyamakan 'limitnya tak hingga' dengan 'limitnya ada dan bernilai besar'"
  ],
  "kenapa": [
   "Kenapa membagi dengan x pangkat tertinggi tidak mengubah nilai limitnya?",
   "Kenapa ∞ − ∞ tidak bisa langsung disimpulkan nol?"
  ],
  "prasyarat": [
   "sma11-sifat-sifat-limit-dan-limit",
   "sma10-fungsi-kuadrat-dan-grafiknya-parabola",
   "sma11-bentuk-taktentu-0-0-pada"
  ]
 },
 {
  "id": "sma11-limit-fungsi-trigonometri",
  "judul": "Limit Fungsi Trigonometri",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "ringkas": "Mengubah bentuk trigonometri memakai identitas sebelum mengambil limit",
  "subKonsep": [
   "Limit trigonometri yang bisa diselesaikan dengan substitusi langsung",
   "Limit istimewa sin x / x saat x menuju 0",
   "Limit istimewa tan x / x dan bentuk (1 − cos x)/x",
   "Gagasan teorema apit pada juring lingkaran satuan",
   "Peran radian sebagai syarat berlakunya limit istimewa",
   "Penggunaan identitas trigonometri untuk mengubah bentuk lebih dulu"
  ],
  "rumus": [
   "lim(x→0) sin x / x = 1",
   "lim(x→0) tan x / x = 1",
   "lim(x→0) sin(ax) / (bx) = a/b",
   "lim(x→0) (1 − cos x) / x = 0",
   "lim(x→0) (1 − cos x) / x² = 1/2"
  ],
  "miskonsepsi": [
   "Memakai sin x / x = 1 padahal sudut dalam derajat",
   "Mencoret x pada sin x / x sehingga menjadi 'sin'",
   "Mengira sin x ≈ x berlaku untuk sudut besar"
  ],
  "kenapa": [
   "Kenapa sin x / x mendekati 1 hanya kalau sudut diukur dalam radian?",
   "Kenapa panjang busur, tali busur, dan tinggi segitiga hampir sama untuk sudut yang sangat kecil?"
  ],
  "prasyarat": [
   "sma11-fungsi-trigonometri-dan-lingkaran-satuan",
   "sma10-hubungan-sudut-penyiku-dan-identitas",
   "sma11-konsep-dan-pengertian-limit-fungsi"
  ]
 },
 {
  "id": "sma11-masalah-optimasi-dengan-turunan",
  "judul": "Masalah Optimasi dengan Turunan",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "ringkas": "Menyusun model matematis dari deskripsi masalah",
  "subKonsep": [
   "Menerjemahkan situasi nyata menjadi fungsi tujuan",
   "Menggunakan persamaan kendala untuk menyisakan satu variabel",
   "Menentukan domain yang masuk akal secara fisik",
   "Menguji ekstrem dan memilih penyelesaian yang layak",
   "Menafsirkan jawaban lengkap dengan satuannya",
   "Contoh klasik: kaleng paling hemat bahan, kandang berluas maksimum, biaya produksi minimum"
  ],
  "rumus": [
   "kendala ⟹ fungsi tujuan satu variabel f(x)",
   "f'(x) = 0 lalu uji f''(x) atau tanda f'",
   "kaleng tabung volume tetap: luas minimum saat tinggi = diameter (h = 2r)"
  ],
  "miskonsepsi": [
   "Melupakan batasan domain, misalnya menerima panjang bernilai negatif",
   "Mengira setiap penyelesaian f'(x) = 0 otomatis merupakan jawaban optimal",
   "Menetapkan variabel bebas yang salah sehingga fungsi masih memuat dua variabel"
  ],
  "kenapa": [
   "Kenapa kaleng paling hemat bahan justru punya tinggi sama dengan diameternya?",
   "Kenapa masalah nyata harus diubah menjadi fungsi satu variabel dulu?"
  ],
  "prasyarat": [
   "sma11-nilai-maksimum-minimum-kecekungan-dan",
   "smp8-jaring-jaring-bangun-ruang",
   "sma11-fungsi-naik-fungsi-turun-dan"
  ]
 },
 {
  "id": "sma11-nilai-maksimum-minimum-kecekungan-dan",
  "judul": "Nilai Maksimum-Minimum, Kecekungan, dan Titik Belok",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "ringkas": "Menguji jenis titik stasioner dengan uji turunan pertama dan kedua",
  "subKonsep": [
   "Ekstrem lokal dan ekstrem mutlak pada selang tertutup",
   "Uji turunan pertama untuk menentukan jenis ekstrem",
   "Uji turunan kedua dan keterbatasannya saat f'' = 0",
   "Cekung ke atas dan cekung ke bawah dari tanda f''",
   "Titik belok sebagai tempat pergantian kecekungan",
   "Sketsa kurva lengkap: titik potong sumbu, stasioner, belok, dan asimtot"
  ],
  "rumus": [
   "f''(a) > 0 ⟹ minimum lokal di a",
   "f''(a) < 0 ⟹ maksimum lokal di a",
   "titik belok: f''(x) = 0 dan tanda f'' berganti",
   "ekstrem mutlak pada [a, b]: bandingkan nilai di titik kritis dan di x = a serta x = b"
  ],
  "miskonsepsi": [
   "Mengira f''(x) = 0 pasti berarti titik belok",
   "Lupa memeriksa nilai di ujung selang saat mencari ekstrem mutlak",
   "Menyamakan maksimum lokal dengan nilai terbesar fungsi"
  ],
  "kenapa": [
   "Kenapa tanda turunan kedua bisa membedakan puncak dari lembah?",
   "Kenapa titik belok butuh pergantian tanda, bukan sekadar f'' = 0?"
  ],
  "prasyarat": [
   "sma11-fungsi-naik-fungsi-turun-dan",
   "sma11-turunan-implisit-dan-turunan-tingkat",
   "sma11-limit-di-tak-hingga-limit"
  ]
 },
 {
  "id": "sma11-sifat-sifat-limit-dan-limit",
  "judul": "Sifat-Sifat Limit dan Limit Fungsi Aljabar",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "ringkas": "Menerapkan sifat limit secara bertahap pada bentuk gabungan",
  "subKonsep": [
   "Limit fungsi konstan dan limit fungsi identitas",
   "Sifat jumlah, selisih, hasil kali, dan kelipatan konstanta",
   "Sifat hasil bagi beserta syarat penyebut tidak nol",
   "Sifat pangkat dan akar pada limit",
   "Substitusi langsung untuk fungsi polinomial dan rasional yang penyebutnya tidak nol",
   "Munculnya bentuk 0/0 sebagai tanda perlu manipulasi aljabar"
  ],
  "rumus": [
   "lim(x→a) c = c dan lim(x→a) x = a",
   "lim (f ± g) = lim f ± lim g",
   "lim (f · g) = lim f · lim g",
   "lim (f / g) = lim f / lim g, dengan lim g ≠ 0",
   "lim (f(x))ⁿ = (lim f(x))ⁿ"
  ],
  "miskonsepsi": [
   "Memakai sifat hasil bagi meskipun penyebutnya menuju nol",
   "Menuliskan 0/0 = 0 atau 0/0 = 1",
   "Mengira substitusi langsung selalu boleh untuk semua fungsi"
  ],
  "kenapa": [
   "Kenapa substitusi langsung selalu berhasil untuk fungsi polinomial?",
   "Kenapa 0/0 disebut 'bentuk taktentu' dan bukan sekadar 'tidak terdefinisi'?"
  ],
  "prasyarat": [
   "sma11-konsep-dan-pengertian-limit-fungsi",
   "smp7-operasi-penjumlahan-dan-pengurangan-bentuk",
   "sma10-fungsi-kuadrat-dan-grafiknya-parabola"
  ]
 },
 {
  "id": "sma11-turunan-fungsi-eksponensial-dan-logaritma",
  "judul": "Turunan Fungsi Eksponensial dan Logaritma",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "ringkas": "Menurunkan fungsi eksponensial dan logaritma bergabung dengan aljabar",
  "subKonsep": [
   "Bilangan e sebagai basis yang membuat gradien kurva sama dengan tingginya",
   "Turunan eˣ dan aˣ",
   "Turunan ln x dan logaritma basis a",
   "Penggabungan dengan aturan rantai untuk eᵘ dan ln u",
   "Model pertumbuhan dan peluruhan eksponensial",
   "Laju perubahan relatif dan turunan logaritmik"
  ],
  "rumus": [
   "(eˣ)' = eˣ",
   "(aˣ)' = aˣ · ln a",
   "(ln x)' = 1/x",
   "(log_a x)' = 1/(x · ln a)",
   "(e^u)' = e^u · u'",
   "(ln u)' = u'/u"
  ],
  "miskonsepsi": [
   "Menerapkan aturan pangkat sehingga menulis (eˣ)' = x·eˣ⁻¹",
   "Menulis (2ˣ)' = x·2ˣ⁻¹",
   "Mengira (ln x)' = 1/x berlaku untuk logaritma semua basis"
  ],
  "kenapa": [
   "Kenapa bilangan e kira-kira 2,718 dan bukan 2 atau 3?",
   "Kenapa ada fungsi yang turunannya sama persis dengan dirinya sendiri?"
  ],
  "prasyarat": [
   "sma10-fungsi-eksponensial-pertumbuhan-dan-peluruhan"
  ]
 },
 {
  "id": "sma11-turunan-fungsi-trigonometri",
  "judul": "Turunan Fungsi Trigonometri",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "ringkas": "Menurunkan fungsi trigonometri yang bergabung dengan aljabar",
  "subKonsep": [
   "Menurunkan sin x dari definisi limit memakai limit istimewa",
   "Turunan cos x dan asal tanda negatifnya",
   "Turunan tan x, cot x, sec x, dan csc x dari aturan hasil bagi",
   "Turunan fungsi trigonometri gabungan dengan aturan rantai",
   "Grafik sin dan cos sebagai pasangan fungsi-turunan",
   "Daur empat langkah turunan sinus"
  ],
  "rumus": [
   "(sin x)' = cos x",
   "(cos x)' = −sin x",
   "(tan x)' = sec²x",
   "(cot x)' = −csc²x",
   "(sec x)' = sec x·tan x",
   "(csc x)' = −csc x·cot x"
  ],
  "miskonsepsi": [
   "Lupa tanda negatif pada turunan cos x",
   "Memakai satuan derajat sehingga rumus turunan menjadi salah",
   "Mengira (sin 2x)' = cos 2x tanpa faktor 2"
  ],
  "kenapa": [
   "Kenapa turunan sinus tepat berupa kosinus — apa yang terlihat kalau kedua grafik ditumpuk?",
   "Kenapa muncul tanda minus pada turunan kosinus?"
  ],
  "prasyarat": [
   "sma11-limit-fungsi-trigonometri",
   "sma10-hubungan-sudut-penyiku-dan-identitas"
  ]
 },
 {
  "id": "sma11-turunan-implisit-dan-turunan-tingkat",
  "judul": "Turunan Implisit dan Turunan Tingkat Tinggi",
  "lanjut": true,
  "kelas": 11,
  "fase": "F",
  "domain": "kalkulus",
  "ringkas": "Menurunkan persamaan implisit dan menyelesaikan dy/dx",
  "subKonsep": [
   "Fungsi eksplisit dan hubungan implisit",
   "Menurunkan kedua ruas persamaan terhadap x",
   "Suku yang memuat y diturunkan dengan aturan rantai sehingga muncul dy/dx",
   "Gradien garis singgung lingkaran dan elips",
   "Turunan kedua dan artinya (percepatan, kecekungan)",
   "Notasi f''(x), d²y/dx², dan turunan tingkat n"
  ],
  "rumus": [
   "d/dx (yⁿ) = n·yⁿ⁻¹ · dy/dx",
   "pada x² + y² = r²: dy/dx = −x/y",
   "f''(x) = d/dx (f'(x))",
   "d²y/dx²"
  ],
  "miskonsepsi": [
   "Lupa menempelkan faktor dy/dx saat menurunkan suku yang memuat y",
   "Mengira turunan kedua berarti turunan yang dikuadratkan",
   "Mengira setiap kurva pasti bisa dinyatakan sebagai y = f(x)"
  ],
  "kenapa": [
   "Kenapa lingkaran tidak bisa diturunkan langsung seperti fungsi biasa?",
   "Kenapa muncul dy/dx ketika kita menurunkan y² terhadap x?"
  ],
  "prasyarat": []
 }
]

export default topik
