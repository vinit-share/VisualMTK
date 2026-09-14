/* ============================================================
   Visual MTK — Rincian topik kelas 7 (DIHASILKAN OTOMATIS)

   Jangan sunting berkas ini dengan tangan.
   Sumber: docs/riset/ (riset Capaian Pembelajaran Kepka BSKAP
   Kemendikdasmen No. 046/H/KR/2025).
   Bangun ulang: npm run bangun:kurikulum
   ============================================================ */

import type { TopikKurikulum } from '../kurikulum'

const topik: TopikKurikulum[] = [
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
 }
]

export default topik
