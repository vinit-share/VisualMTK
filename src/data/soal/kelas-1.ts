/* ============================================================
   Visual MTK — Bank soal topik kelas 1
   Berkas ini juga menjadi CONTOH MUTU untuk bank kelas lain:
   kalimat pendek, banyak gambar, tiap pengecoh punya alasan,
   dan soal berhitung ditulis sebagai pembuat soal (fungsi)
   supaya angkanya berganti setiap tes.
   ============================================================ */

import { pick, randInt } from '../../lib/num'
import { bs, cocok, pg, urut, type BankSoal } from './alat'

const NAMA_BELASAN = [
  'sebelas',
  'dua belas',
  'tiga belas',
  'empat belas',
  'lima belas',
  'enam belas',
  'tujuh belas',
  'delapan belas',
  'sembilan belas',
]
const NAMA_SATUAN = ['nol', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan']

const BARISAN = ['Ani', 'Budi', 'Cici', 'Doni', 'Eka']
// Tujuh benda: 4 ungu (bulatan, kotak, segitiga, bulatan) dan 3 jingga (bulatan, kotak, bulatan).
const BENDA_CAMPUR = ['bulat:a', 'kotak:a', 'bulat:b', 'segitiga:a', 'bulat:a', 'kotak:b', 'bulat:b']

const bank: BankSoal = {
  /* ---------------- Membilang benda sampai 10 ---------------- */
  'sd1-membilang-benda-sampai-10': [
    (r) => {
      const n = randInt(r, 3, 10)
      return pg({
        tingkat: 'mudah',
        tanya: 'Ada berapa apel?',
        gambar: { jenis: 'benda', banyak: n, bentuk: 'apel', warna: 'hi' },
        benar: n,
        salah: [
          [n + 1, 'Mungkin ada satu apel yang terhitung dua kali.'],
          [n - 1, 'Mungkin ada satu apel yang terlewat.'],
          [n + 2, 'Hitung lagi pelan-pelan. Tunjuk satu apel untuk satu bilangan.'],
        ],
        petunjuk: ['Tunjuk apelnya satu per satu sambil menyebut 1, 2, 3, …', 'Bilangan terakhir yang kamu sebut adalah banyaknya apel.'],
        bahas: `Kalau ditunjuk satu per satu, hitungannya berhenti di ${n}. Jadi ada ${n} apel.`,
      })
    },
    pg({
      tingkat: 'mudah',
      tanya: 'Tanpa menunjuk satu-satu, ada berapa bintang?',
      gambar: { jenis: 'benda', banyak: 4, bentuk: 'bintang', warna: 'b', per: 2 },
      benar: 4,
      salah: [
        [3, 'Lihat lagi: ada dua baris, tiap baris dua bintang.'],
        [5, 'Susunannya seperti mata dadu empat, bukan lima.'],
        [2, 'Itu baru satu baris. Ada dua baris.'],
      ],
      petunjuk: ['Lihat bentuk susunannya, mirip mata dadu.', 'Dua di atas dan dua di bawah.'],
      bahas: 'Dua bintang di atas dan dua di bawah: semuanya 4 bintang.',
    }),
    pg({
      tingkat: 'sedang',
      tanya: 'Dita menghitung kelereng: 1, 2, 3, 4, 5, 6. Jadi ada berapa kelereng semuanya?',
      gambar: { jenis: 'benda', banyak: 6, warna: 'c' },
      benar: 6,
      salah: [
        [1, 'Angka 1 hanya untuk kelereng yang pertama ditunjuk.'],
        [5, 'Hitungan Dita tidak berhenti di 5.'],
        [7, 'Dita tidak menyebut 7.'],
      ],
      petunjuk: ['Bilangan mana yang disebut Dita paling akhir?', 'Bilangan terakhir itu menyatakan banyaknya semua kelereng.'],
      bahas: 'Bilangan terakhir yang disebut adalah 6. Itu banyaknya semua kelereng.',
    }),
    pg({
      tingkat: 'sedang',
      tanya: 'Beni menghitung ikan dari kiri: ada 7. Kalau dihitung dari kanan, ada berapa?',
      gambar: { jenis: 'benda', banyak: 7, bentuk: 'ikan', warna: 'c', per: 7 },
      benar: 7,
      salah: [
        [6, 'Ikannya tidak berkurang hanya karena mulai dari sisi lain.'],
        [8, 'Ikannya tidak bertambah hanya karena mulai dari sisi lain.'],
        [1, 'Yang ditanya banyaknya ikan, bukan ikan yang pertama.'],
      ],
      petunjuk: ['Ikannya tetap ikan yang sama.', 'Mulai dari mana pun, semua ikan tetap terhitung satu kali.'],
      bahas: 'Mulai menghitung dari kiri atau dari kanan, banyaknya tetap 7.',
    }),
    (r) => {
      const n = randInt(r, 2, 9)
      return pg({
        tingkat: 'sedang',
        tanya: `Di piring ada ${n} apel. Semua apel dimakan. Berapa apel di piring sekarang?`,
        gambar: { jenis: 'benda', banyak: n, bentuk: 'apel', warna: 'hi', coret: n },
        benar: 0,
        salah: [
          [n, 'Itu banyak apel sebelum dimakan.'],
          [1, 'Semua apel dimakan, tidak ada yang tersisa.'],
          [10, 'Apelnya habis, bukan bertambah.'],
        ],
        petunjuk: ['"Semua dimakan" artinya tidak ada yang tersisa.', 'Bilangan untuk "tidak ada" adalah nol.'],
        bahas: 'Semua apel habis. "Tidak ada" ditulis 0.',
      })
    },
    pg({
      tingkat: 'sulit',
      tanya: 'Rani menghitung kancing dan mendapat 8. Ternyata satu kancing ia tunjuk dua kali. Berapa kancing yang sebenarnya?',
      benar: 7,
      salah: [
        [8, 'Itu hasil hitung Rani, padahal ada satu kancing yang terhitung dua kali.'],
        [9, 'Terhitung dua kali membuat hasilnya kelebihan, jadi harus dikurangi.'],
        [6, 'Hanya satu kancing yang terhitung dua kali, jadi kelebihannya hanya 1.'],
      ],
      petunjuk: ['Satu kancing terhitung dua kali. Hitungannya kelebihan berapa?', 'Kurangi 8 dengan kelebihannya.'],
      bahas: 'Hitungan Rani kelebihan 1. Jadi kancing yang sebenarnya 8 − 1 = 7.',
    }),
    bs({
      tingkat: 'sulit',
      tanya: 'Lima kelereng yang dijajar renggang lebih banyak daripada lima kelereng yang dijajar rapat.',
      jawab: false,
      alasan: 'Barisannya memang lebih panjang, tetapi banyaknya tetap lima.',
      petunjuk: ['Hitung kelereng di kedua barisan.', 'Merenggangkan benda tidak menambah bendanya.'],
      bahas: 'Keduanya sama-sama lima. Merapatkan atau merenggangkan tidak mengubah banyaknya.',
    }),
  ],

  /* ---------------- Lambang bilangan sampai 20 ---------------- */
  'sd1-membaca-dan-menulis-lambang-bilangan': [
    (r) => {
      const n = randInt(r, 12, 19)
      const s = n - 10
      return pg({
        tingkat: 'mudah',
        tanya: `Bagaimana menulis "${NAMA_BELASAN[n - 11]}" dengan angka?`,
        benar: `${n}`,
        salah: [
          [`10${s}`, `Itu menulis "sepuluh" lalu "${NAMA_SATUAN[s]}" satu per satu.`],
          [`${s}1`, 'Angkanya tertukar tempat.'],
          [`${s}`, `Itu hanya ${NAMA_SATUAN[s]}. Sepuluhnya hilang.`],
        ],
        petunjuk: ['Bilangan belasan = 1 puluhan dan beberapa satuan.', `"${NAMA_BELASAN[n - 11]}" = sepuluh dan ${NAMA_SATUAN[s]}.`],
        bahas: `${NAMA_BELASAN[n - 11]} = 1 puluhan dan ${s} satuan, ditulis ${n}.`,
      })
    },
    pg({
      tingkat: 'mudah',
      tanya: 'Bilangan berapa yang ditunjukkan blok ini?',
      gambar: { jenis: 'blok', puluhan: 1, satuan: 4 },
      benar: '14',
      salah: [
        ['5', 'Satu batang panjang berisi 10 kubus, bukan 1.'],
        ['41', 'Batang puluhan ditulis di depan, satuan di belakang.'],
        ['104', 'Itu menulis "10" lalu "4". Cukup 1 puluhan dan 4 satuan.'],
      ],
      petunjuk: ['Batang panjang = 10. Kubus kecil = 1.', 'Ada 1 batang dan 4 kubus kecil.'],
      bahas: '1 batang puluhan dan 4 kubus satuan = 10 + 4 = 14.',
    }),
    cocok({
      tingkat: 'sedang',
      tanya: 'Pasangkan angka dengan nama bilangannya.',
      pasangan: [
        ['11', 'sebelas'],
        ['13', 'tiga belas'],
        ['17', 'tujuh belas'],
        ['20', 'dua puluh'],
      ],
      petunjuk: ['Belasan selalu diawali angka 1.', 'Angka di belakang menunjukkan "berapa belas".'],
      bahas: '11 sebelas, 13 tiga belas, 17 tujuh belas, dan 20 dua puluh.',
    }),
    (r) => {
      const n = randInt(r, 12, 19)
      return pg({
        tingkat: 'sedang',
        tanya: `${n} sama dengan 1 puluhan dan berapa satuan?`,
        gambar: { jenis: 'blok', puluhan: 1, satuan: n - 10 },
        benar: n - 10,
        salah: [
          [n, 'Itu seluruh bilangannya. Sepuluhnya sudah menjadi 1 puluhan.'],
          [1, 'Angka 1 itu puluhannya.'],
          [n - 9, 'Hitung lagi kubus kecilnya.'],
        ],
        petunjuk: ['Pisahkan 10 dulu.', `Dari ${n}, kalau 10 diambil, sisanya berapa?`],
        bahas: `${n} = 10 + ${n - 10}. Jadi satuannya ${n - 10}.`,
      })
    },
    pg({
      tingkat: 'sedang',
      tanya: 'Nama bilangan 12 adalah …',
      benar: 'dua belas',
      salah: [
        ['dua puluh', 'Dua puluh ditulis 20.'],
        ['satu dua', 'Itu membaca angkanya satu per satu, bukan membaca bilangannya.'],
        ['sepuluh dua', 'Sepuluh dan dua disebut "dua belas".'],
      ],
      petunjuk: ['12 adalah sepuluh dan dua.', 'Sepuluh dan dua disebut dengan akhiran "belas".'],
      bahas: '12 = sepuluh dan dua, dibaca "dua belas".',
    }),
    pg({
      tingkat: 'sulit',
      tanya: 'Angka 1 pada bilangan 12 berarti …',
      gambar: { jenis: 'blok', puluhan: 1, satuan: 2 },
      benar: '1 puluhan',
      salah: [
        ['1 satuan', 'Yang satuan adalah angka 2 di belakang.'],
        ['12 satuan', 'Itu nilai seluruh bilangannya.'],
        ['2 puluhan', 'Puluhannya hanya satu batang.'],
      ],
      petunjuk: ['Angka di depan menunjukkan banyaknya puluhan.', 'Lihat gambarnya: ada berapa batang puluhan?'],
      bahas: 'Angka 1 di depan berarti 1 puluhan, yaitu sepuluh.',
    }),
    bs({
      tingkat: 'sulit',
      tanya: 'Dua puluh sama dengan dua kelompok sepuluh.',
      gambar: { jenis: 'blok', puluhan: 2 },
      jawab: true,
      alasan: 'Hitung batangnya: sepuluh dan sepuluh lagi menjadi dua puluh.',
      petunjuk: ['Lihat gambarnya: ada dua batang puluhan.', 'Sepuluh ditambah sepuluh berapa?'],
      bahas: '10 dan 10 lagi adalah 20. Karena itu 20 ditulis dengan angka 2 di tempat puluhan.',
    }),
  ],

  /* ---------------- Membandingkan banyak benda ---------------- */
  'sd1-membandingkan-banyak-benda-dan-bilangan': [
    (r) => {
      const a = randInt(r, 3, 10)
      let b = randInt(r, 3, 10)
      if (b === a) b = a === 10 ? 7 : a + 1
      const lebih = a > b ? 'A' : 'B'
      return pg({
        tingkat: 'mudah',
        tanya: 'Kelompok mana yang lebih banyak?',
        gambar: {
          jenis: 'benda',
          kelompok: [
            { banyak: a, label: 'Kelompok A', warna: 'a' },
            { banyak: b, label: 'Kelompok B', warna: 'b' },
          ],
        },
        benar: `Kelompok ${lebih}`,
        salah: [
          [`Kelompok ${lebih === 'A' ? 'B' : 'A'}`, 'Kalau dipasangkan satu-satu, kelompok ini habis lebih dulu.'],
          ['Sama banyak', 'Kalau dipasangkan satu-satu, masih ada sisa di salah satu kelompok.'],
        ],
        petunjuk: ['Pasangkan satu bulatan A dengan satu bulatan B.', 'Kelompok yang masih punya sisa adalah yang lebih banyak.'],
        bahas: `Kelompok A ada ${a}, kelompok B ada ${b}. Yang lebih banyak adalah kelompok ${lebih}.`,
      })
    },
    pg({
      tingkat: 'mudah',
      tanya: 'Kelompok mana yang lebih banyak?',
      gambar: {
        jenis: 'benda',
        kelompok: [
          { banyak: 5, label: 'Kelompok A', warna: 'a', ukuran: 'besar' },
          { banyak: 8, label: 'Kelompok B', warna: 'b', ukuran: 'kecil', per: 8 },
        ],
      },
      benar: 'Kelompok B',
      salah: [
        ['Kelompok A', 'Bendanya memang lebih besar, tetapi banyaknya hanya 5.'],
        ['Sama banyak', 'Hitung lagi: A ada 5, B ada 8.'],
      ],
      petunjuk: ['Jangan lihat besarnya. Hitung banyaknya.', 'A ada 5 benda. B ada berapa?'],
      bahas: 'A ada 5 dan B ada 8. Benda yang besar belum tentu lebih banyak.',
    }),
    (r) => {
      const a = randInt(r, 2, 19)
      const b = r() < 0.2 ? a : randInt(r, 2, 19)
      const tanda = a < b ? '<' : a > b ? '>' : '='
      const baca = { '<': 'kurang dari', '>': 'lebih dari', '=': 'sama dengan' }
      return pg({
        tingkat: 'sedang',
        tanya: `Tanda yang tepat untuk ${a} … ${b} adalah`,
        benar: tanda,
        salah: [
          ['<', `Tanda < dibaca "kurang dari". Apakah ${a} kurang dari ${b}?`],
          ['>', `Tanda > dibaca "lebih dari". Apakah ${a} lebih dari ${b}?`],
          ['=', `Tanda = dibaca "sama dengan". Apakah ${a} sama dengan ${b}?`],
        ],
        petunjuk: ['Bilangan mana yang disebut lebih belakangan saat membilang?', 'Mulut tanda < atau > selalu terbuka ke bilangan yang lebih besar.'],
        bahas: `${a} ${baca[tanda]} ${b}, ditulis ${a} ${tanda} ${b}.`,
      })
    },
    (r) => {
      const a = randInt(r, 2, 8)
      const b = a + randInt(r, 2, 5)
      const c = b + randInt(r, 2, 6)
      return pg({
        tingkat: 'sedang',
        tanya: `Bilangan mana yang paling besar: ${b}, ${c}, atau ${a}?`,
        gambar: { jenis: 'garis', dari: 0, sampai: 20, label: 5, tanda: [a, b, c] },
        benar: c,
        salah: [
          [a, `Pada garis bilangan, ${a} ada paling kiri. Itu yang paling kecil.`],
          [b, `Pada garis bilangan, ${b} masih di sebelah kiri ${c}.`],
        ],
        petunjuk: ['Lihat tiga titik pada garis bilangan.', 'Bilangan yang paling kanan adalah yang paling besar.'],
        bahas: `${c} terletak paling kanan pada garis bilangan, jadi ${c} paling besar.`,
      })
    },
    pg({
      tingkat: 'sedang',
      tanya: 'Kelompok A lebih banyak berapa daripada kelompok B?',
      gambar: {
        jenis: 'benda',
        kelompok: [
          { banyak: 9, label: 'Kelompok A', warna: 'a', per: 9 },
          { banyak: 6, label: 'Kelompok B', warna: 'b', per: 9 },
        ],
      },
      benar: 3,
      salah: [
        [9, 'Itu banyak benda di kelompok A.'],
        [6, 'Itu banyak benda di kelompok B.'],
        [15, 'Itu kalau keduanya digabung. Yang ditanya selisihnya.'],
      ],
      petunjuk: ['Pasangkan satu-satu dari kiri.', 'Berapa bulatan A yang tidak punya pasangan?'],
      bahas: 'Setelah dipasangkan, 3 bulatan A tidak punya pasangan. Jadi A lebih banyak 3.',
    }),
    pg({
      tingkat: 'sulit',
      tanya: 'Cara membaca 12 > 9 adalah …',
      benar: '12 lebih dari 9',
      salah: [
        ['12 kurang dari 9', 'Tanda > terbuka ke arah 12, bilangan yang lebih besar.'],
        ['12 sama dengan 9', 'Tanda sama dengan ditulis =, bukan >.'],
        ['9 lebih dari 12', 'Baca dari kiri: yang disebut dulu adalah 12.'],
      ],
      petunjuk: ['Baca dari kiri ke kanan.', 'Tanda > dibaca "lebih dari".'],
      bahas: 'Tanda > dibaca "lebih dari". Jadi 12 > 9 dibaca "12 lebih dari 9".',
    }),
    urut({
      tingkat: 'sulit',
      tanya: 'Urutkan dari yang paling kecil ke yang paling besar.',
      langkah: ['7', '11', '14', '19'],
      petunjuk: ['Bayangkan letaknya pada garis bilangan.', 'Yang paling kiri ditulis lebih dulu.'],
      bahas: 'Urutannya 7, 11, 14, 19. Makin ke kanan pada garis bilangan, makin besar.',
    }),
  ],

  /* ---------------- Bilangan urutan ---------------- */
  'sd1-bilangan-urutan-ordinal-ke-1': [
    pg({
      tingkat: 'mudah',
      tanya: 'Siapa yang berdiri di urutan ke-2 dari depan?',
      gambar: { jenis: 'pola', isi: BARISAN, ujung: ['depan', 'belakang'] },
      benar: 'Budi',
      salah: [
        ['Ani', 'Ani berdiri paling depan, urutan ke-1.'],
        ['Doni', 'Doni urutan ke-2 kalau dihitung dari belakang.'],
        ['Cici', 'Cici urutan ke-3.'],
      ],
      petunjuk: ['Mulai menghitung dari tulisan "depan".', 'Ani ke-1. Sesudah Ani siapa?'],
      bahas: 'Dari depan: Ani ke-1, Budi ke-2.',
    }),
    pg({
      tingkat: 'mudah',
      tanya: 'Doni berdiri di urutan ke berapa dari depan?',
      gambar: { jenis: 'pola', isi: BARISAN, ujung: ['depan', 'belakang'] },
      benar: 'ke-4',
      salah: [
        ['ke-2', 'Itu kalau dihitung dari belakang.'],
        ['ke-3', 'Urutan ke-3 dari depan adalah Cici.'],
        ['ke-5', 'Urutan ke-5 dari depan adalah Eka.'],
      ],
      petunjuk: ['Hitung dari depan: Ani ke-1, Budi ke-2, …', 'Terus hitung sampai tiba di Doni.'],
      bahas: 'Ani ke-1, Budi ke-2, Cici ke-3, Doni ke-4.',
    }),
    pg({
      tingkat: 'sedang',
      tanya: 'Siapa yang berdiri di urutan ke-2 dari belakang?',
      gambar: { jenis: 'pola', isi: BARISAN, ujung: ['depan', 'belakang'] },
      benar: 'Doni',
      salah: [
        ['Budi', 'Budi urutan ke-2 dari depan, bukan dari belakang.'],
        ['Eka', 'Eka paling belakang, urutan ke-1 dari belakang.'],
        ['Cici', 'Cici urutan ke-3 dari belakang.'],
      ],
      petunjuk: ['Sekarang mulai menghitung dari tulisan "belakang".', 'Eka ke-1 dari belakang. Sebelum Eka siapa?'],
      bahas: 'Dari belakang: Eka ke-1, Doni ke-2. Arah menghitung mengubah jawabannya.',
    }),
    pg({
      tingkat: 'sedang',
      tanya: 'Benda ke-4 dari kiri berbentuk apa?',
      gambar: {
        jenis: 'pola',
        isi: ['bintang:b', 'bulat:a', 'bulat:a', 'hati:hi', 'bulat:a', 'kotak:c'],
        ujung: ['kiri', 'kanan'],
      },
      benar: 'hati',
      salah: [
        ['bulatan', 'Bulatan ada di urutan ke-2, ke-3, dan ke-5.'],
        ['bintang', 'Bintang ada di urutan ke-1.'],
        ['kotak', 'Kotak ada di urutan ke-6.'],
      ],
      petunjuk: ['Mulai dari kiri: bintang ke-1.', 'Lanjutkan: ke-2, ke-3, lalu ke-4.'],
      bahas: 'Dari kiri: bintang, bulatan, bulatan, lalu hati di urutan ke-4.',
    }),
    bs({
      tingkat: 'sedang',
      tanya: '"Ada 5 anak" sama artinya dengan "anak ke-5".',
      jawab: false,
      alasan: '"5 anak" menyatakan banyaknya. "Anak ke-5" hanya satu anak, yaitu yang di urutan kelima.',
      petunjuk: ['"Ada 5 anak" menjawab pertanyaan "berapa banyak?".', '"Anak ke-5" menjawab pertanyaan "yang mana?".'],
      bahas: '"5 anak" berarti banyaknya lima. "Anak ke-5" berarti satu anak di urutan kelima.',
    }),
    (r) => {
      // Dipilih supaya ketiga pengecoh selalu berbeda dari jawaban benar.
      let n = 6
      let k = 2
      for (let i = 0; i < 20; i++) {
        n = randInt(r, 5, 8)
        k = randInt(r, 2, n - 1)
        if (n !== 2 * k && n + 1 !== 2 * k) break
      }
      const dariBelakang = n - k + 1
      return pg({
        tingkat: 'sulit',
        tanya: `Ada ${n} anak antre. Tia di urutan ke-${k} dari depan. Tia urutan ke berapa dari belakang?`,
        benar: `ke-${dariBelakang}`,
        salah: [
          [`ke-${n - k}`, 'Itu banyak anak di belakang Tia. Tia sendiri belum ikut dihitung.'],
          [`ke-${k}`, 'Itu urutan Tia dari depan.'],
          [`ke-${n}`, 'Itu banyak semua anak yang antre.'],
        ],
        petunjuk: [`Ada berapa anak di belakang Tia? Hitung ${n} − ${k}.`, 'Dari belakang, anak-anak itu dihitung dulu, baru Tia.'],
        bahas: `Di belakang Tia ada ${n - k} anak. Tia sesudah mereka, jadi urutan ke-${dariBelakang} dari belakang.`,
      })
    },
    pg({
      tingkat: 'sulit',
      tanya: 'Lomba lari: Sari sampai sebelum Dodi. Dodi sampai sebelum Wati. Siapa juara ke-3?',
      benar: 'Wati',
      salah: [
        ['Sari', 'Sari sampai paling dulu. Sari juara ke-1.'],
        ['Dodi', 'Dodi sampai sesudah Sari, jadi juara ke-2.'],
      ],
      petunjuk: ['Siapa yang sampai paling dulu?', 'Susun urutannya: ke-1, ke-2, lalu ke-3.'],
      bahas: 'Urutan sampainya Sari, Dodi, Wati. Jadi Wati juara ke-3.',
    }),
  ],

  /* ---------------- Garis bilangan ---------------- */
  'sd1-garis-bilangan-dan-membilang-maju': [
    (r) => {
      const k = randInt(r, 2, 9)
      return pg({
        tingkat: 'mudah',
        tanya: 'Bilangan berapa yang tertutup tanda tanya?',
        gambar: { jenis: 'garis', dari: 0, sampai: 10, tanya: [k] },
        benar: k,
        salah: [
          [k - 1, 'Bilangan itu sudah tertulis di sebelah kirinya.'],
          [k + 1, 'Bilangan itu sudah tertulis di sebelah kanannya.'],
        ],
        petunjuk: ['Baca bilangan di sebelah kiri tanda tanya.', 'Sesudah bilangan itu, bilangan apa?'],
        bahas: `Sesudah ${k - 1} dan sebelum ${k + 1} adalah ${k}.`,
      })
    },
    (r) => {
      const n = randInt(r, 5, 18)
      return pg({
        tingkat: 'mudah',
        tanya: `Bilangan sesudah ${n} adalah …`,
        benar: n + 1,
        salah: [
          [n - 1, `Itu bilangan sebelum ${n}.`],
          [n + 2, 'Itu dua lompatan ke kanan. "Sesudah" hanya satu lompatan.'],
          [n, 'Itu bilangannya sendiri.'],
        ],
        petunjuk: ['Sesudah berarti satu lompatan ke kanan.', `Lanjutkan membilang: …, ${n}, …`],
        bahas: `Satu lompatan ke kanan dari ${n} adalah ${n + 1}.`,
      })
    },
    (r) => {
      const n = randInt(r, 5, 19)
      return pg({
        tingkat: 'sedang',
        tanya: `Bilangan sebelum ${n} adalah …`,
        benar: n - 1,
        salah: [
          [n + 1, `Itu bilangan sesudah ${n}.`],
          [n - 2, 'Itu dua lompatan ke kiri. "Sebelum" hanya satu lompatan.'],
          [n, 'Itu bilangannya sendiri.'],
        ],
        petunjuk: ['Sebelum berarti satu lompatan ke kiri.', `Membilang mundur dari ${n}: ${n}, …`],
        bahas: `Satu lompatan ke kiri dari ${n} adalah ${n - 1}.`,
      })
    },
    pg({
      tingkat: 'sedang',
      tanya: 'Kelinci melompat dari 2 sampai 5. Berapa kali ia melompat?',
      gambar: { jenis: 'garis', dari: 0, sampai: 10, lompat: [[2, 3], [3, 4], [4, 5]] },
      benar: 3,
      salah: [
        [4, 'Itu menghitung titiknya (2, 3, 4, 5), bukan lompatannya.'],
        [5, 'Itu tempat kelinci berhenti, bukan banyak lompatannya.'],
        [2, 'Itu tempat kelinci mulai, bukan banyak lompatannya.'],
      ],
      petunjuk: ['Hitung busur lompatannya, bukan titiknya.', 'Dari 2 ke 3 adalah lompatan pertama.'],
      bahas: 'Ada 3 busur: 2 ke 3, 3 ke 4, dan 4 ke 5. Jadi 3 lompatan.',
    }),
    pg({
      tingkat: 'sedang',
      tanya: 'Katak melompat dua-dua: 0, 2, 4, 6, … Bilangan berikutnya adalah …',
      gambar: { jenis: 'garis', dari: 0, sampai: 10, lompat: [[0, 2], [2, 4], [4, 6]] },
      benar: 8,
      salah: [
        [7, 'Itu hanya maju satu. Katak melompat dua-dua.'],
        [10, 'Itu melompat empat dari 6.'],
        [9, 'Itu melompat tiga dari 6.'],
      ],
      petunjuk: ['Setiap lompatan melewati satu bilangan.', '6 ditambah 2 berapa?'],
      bahas: 'Melompat dua dari 6 tiba di 8.',
    }),
    (r) => {
      const a = randInt(r, 3, 9)
      const b = a + randInt(r, 3, 8)
      return pg({
        tingkat: 'sulit',
        tanya: `Dari ${a} ke ${b} pada garis bilangan, ada berapa lompatan satu-satu?`,
        gambar: { jenis: 'garis', dari: 0, sampai: 20, label: 5, tanda: [a, b] },
        benar: b - a,
        salah: [
          [b - a + 1, 'Itu menghitung titiknya, termasuk titik awal. Yang dihitung lompatannya.'],
          [b, 'Itu bilangan tujuannya, bukan banyak lompatan.'],
          [b - a - 1, 'Lompatan terakhir yang tiba di tujuan juga dihitung.'],
        ],
        petunjuk: ['Titik awal tidak dihitung sebagai lompatan.', `Hitung maju dari ${a}: ${a + 1} adalah lompatan pertama.`],
        bahas: `Banyak lompatan dari ${a} ke ${b} adalah ${b} − ${a} = ${b - a}.`,
      })
    },
    bs({
      tingkat: 'sulit',
      tanya: 'Pada garis bilangan, bilangan yang letaknya lebih ke kanan selalu lebih besar.',
      gambar: { jenis: 'garis', dari: 0, sampai: 10 },
      jawab: true,
      alasan: 'Setiap lompatan ke kanan menambah satu, jadi bilangannya makin besar.',
      petunjuk: ['Lihat garis bilangannya dari kiri ke kanan.', 'Setiap lompatan ke kanan, bilangannya bertambah atau berkurang?'],
      bahas: 'Ke kanan berarti bertambah. Karena itu bilangan di kanan selalu lebih besar.',
    }),
  ],

  /* ---------------- Pasangan bilangan 10 ---------------- */
  'sd1-pasangan-bilangan-10-komposisi-dan': [
    (r) => {
      const a = randInt(r, 1, 9)
      return pg({
        tingkat: 'mudah',
        tanya: `Ada ${a} bulatan. Berapa lagi supaya menjadi 10?`,
        gambar: { jenis: 'benda', banyak: a, warna: 'a', per: 5 },
        benar: 10 - a,
        salah: [
          [a, 'Itu yang sudah ada, bukan yang perlu ditambahkan.'],
          [10 - a + 1, 'Kalau ditambah sebanyak itu, hasilnya 11.'],
          [10 - a - 1, 'Kalau ditambah sebanyak itu, hasilnya baru 9.'],
          [10, 'Itu jumlah yang dituju, bukan yang perlu ditambahkan.'],
        ],
        petunjuk: ['Bayangkan dua baris berisi lima-lima.', 'Hitung tempat yang masih kosong sampai genap 10.'],
        bahas: `${a} dan ${10 - a} adalah pasangan 10, karena ${a} + ${10 - a} = 10.`,
      })
    },
    (r) => {
      const a = pick(r, [6, 7, 8, 9])
      return pg({
        tingkat: 'mudah',
        tanya: `Pasangan 10 untuk bilangan ${a} adalah …`,
        benar: 10 - a,
        salah: [
          [10 - a + 1, `${a} ditambah bilangan itu hasilnya 11.`],
          [10 + a, 'Itu 10 ditambah bilangannya, bukan pasangannya.'],
          [a, `${a} ditambah ${a} tidak sama dengan 10.`],
        ],
        petunjuk: ['Pasangan 10 adalah dua bilangan yang jumlahnya 10.', `Hitung maju dari ${a} sampai 10.`],
        bahas: `${a} + ${10 - a} = 10. Jadi pasangan ${a} adalah ${10 - a}.`,
      })
    },
    pg({
      tingkat: 'sedang',
      tanya: 'Manakah yang BUKAN pasangan 10?',
      benar: '5 dan 4',
      salah: [
        ['6 dan 4', '6 + 4 = 10. Ini pasangan 10.'],
        ['8 dan 2', '8 + 2 = 10. Ini pasangan 10.'],
        ['9 dan 1', '9 + 1 = 10. Ini pasangan 10.'],
      ],
      petunjuk: ['Jumlahkan tiap pasangan.', 'Cari yang jumlahnya tidak 10.'],
      bahas: '5 + 4 = 9, bukan 10. Pasangan 5 seharusnya 5.',
    }),
    (r) => {
      const n = randInt(r, 11, 19)
      return pg({
        tingkat: 'sedang',
        tanya: `${n} = 10 + …`,
        gambar: { jenis: 'blok', puluhan: 1, satuan: n - 10 },
        benar: n - 10,
        salah: [
          [n, 'Itu bilangannya sendiri. 10 ditambah itu terlalu banyak.'],
          [10, '10 + 10 = 20.'],
          [n - 9, 'Hitung lagi kubus kecilnya.'],
        ],
        petunjuk: ['Batang panjang = 10.', 'Sisanya adalah banyak kubus kecil.'],
        bahas: `${n} adalah 10 dan ${n - 10} lagi. Jadi ${n} = 10 + ${n - 10}.`,
      })
    },
    bs({
      tingkat: 'sedang',
      tanya: '10 = 10 + 0 adalah kalimat yang benar.',
      jawab: true,
      alasan: 'Nol berarti tidak menambah apa-apa, jadi 10 + 0 tetap 10.',
      petunjuk: ['Menambah 0 berarti tidak menambah apa-apa.', 'Berapa 10 + 0?'],
      bahas: '10 + 0 = 10. Jadi 0 dan 10 juga pasangan 10.',
    }),
    pg({
      tingkat: 'sulit',
      tanya: '7 bisa diurai menjadi 5 dan 2. Cara lain yang benar adalah …',
      benar: '4 dan 3',
      salah: [
        ['4 dan 4', '4 + 4 = 8, bukan 7.'],
        ['5 dan 3', '5 + 3 = 8, bukan 7.'],
        ['6 dan 2', '6 + 2 = 8, bukan 7.'],
      ],
      petunjuk: ['Dua bagiannya harus berjumlah 7.', 'Jumlahkan tiap pilihan.'],
      bahas: '4 + 3 = 7. Satu bilangan bisa diurai dengan banyak cara.',
    }),
    (r) => {
      const terlihat = randInt(r, 2, 8)
      return pg({
        tingkat: 'sulit',
        tanya: `Semua kelereng ada 10. Di tangan kanan terlihat ${terlihat}. Berapa kelereng yang disembunyikan di tangan kiri?`,
        gambar: { jenis: 'benda', banyak: terlihat, warna: 'c', per: 5 },
        benar: 10 - terlihat,
        salah: [
          [10 + terlihat, 'Kelerengnya tidak bertambah. Semuanya tetap 10.'],
          [terlihat, 'Itu yang terlihat di tangan kanan.'],
          [10, 'Itu semua kelereng, termasuk yang terlihat.'],
          [10 - terlihat + 1, 'Kalau sebanyak itu, semuanya menjadi 11.'],
        ],
        petunjuk: ['Yang terlihat dan yang disembunyikan berjumlah 10.', `Cari pasangan 10 untuk ${terlihat}.`],
        bahas: `${terlihat} + ${10 - terlihat} = 10. Jadi yang disembunyikan ${10 - terlihat}.`,
      })
    },
  ],

  /* ---------------- Penjumlahan sampai 20 ---------------- */
  'sd1-penjumlahan-bilangan-cacah-sampai-20': [
    (r) => {
      const a = randInt(r, 1, 5)
      const b = randInt(r, 1, 5)
      return pg({
        tingkat: 'mudah',
        tanya: `${a} apel dan ${b} apel digabung. Jadi berapa apel?`,
        gambar: {
          jenis: 'benda',
          kelompok: [
            { banyak: a, bentuk: 'apel', warna: 'hi' },
            { banyak: b, bentuk: 'apel', warna: 'b' },
          ],
        },
        benar: a + b,
        salah: [
          [a + b + 1, 'Mungkin ada satu apel yang terhitung dua kali.'],
          [a + b - 1, 'Mungkin ada satu apel yang terlewat.'],
          [Math.max(a, b), 'Itu baru salah satu kelompok. Kelompok lainnya belum digabung.'],
          [a + b + 2, 'Hitung lagi semua apelnya satu per satu.'],
        ],
        petunjuk: ['Menggabungkan berarti menjumlahkan.', 'Hitung semua apel di kedua baris.'],
        bahas: `${a} + ${b} = ${a + b}. Jadi ada ${a + b} apel.`,
      })
    },
    (r) => {
      const a = randInt(r, 3, 9)
      return pg({
        tingkat: 'mudah',
        tanya: `${a} + 0 = …`,
        benar: a,
        salah: [
          [0, 'Menambah nol tidak menghabiskan bilangannya.'],
          [a + 1, 'Nol berarti tidak ada yang ditambahkan.'],
          [a * 10, 'Itu menempelkan angka 0, bukan menambahkan nol.'],
        ],
        petunjuk: ['Nol berarti tidak ada.', `Kalau ${a} tidak ditambah apa-apa, hasilnya berapa?`],
        bahas: `Menambah 0 tidak mengubah apa pun. ${a} + 0 = ${a}.`,
      })
    },
    (r) => {
      const a = randInt(r, 7, 9)
      const b = randInt(r, 4, 6)
      return pg({
        tingkat: 'sedang',
        tanya: `${a} + ${b} = …`,
        gambar: { jenis: 'garis', dari: 0, sampai: 20, label: 5, lompat: [[a, 10], [10, a + b]], tanda: [a] },
        benar: a + b,
        salah: [
          [a + b - 1, `Itu menghitung ${a} sebagai langkah pertama. Langkah pertama adalah ${a + 1}.`],
          [a + b + 1, 'Kelebihan satu langkah.'],
          [a + b - 10, 'Puluhannya terlupa.'],
        ],
        petunjuk: [`Buat sepuluh dulu: ${a} perlu ${10 - a} lagi.`, `Dari ${b} sudah dipakai ${10 - a}. Sisanya ${b - (10 - a)} ditambahkan ke 10.`],
        bahas: `${a} + ${10 - a} = 10, lalu 10 + ${b - (10 - a)} = ${a + b}.`,
      })
    },
    (r) => {
      const a = randInt(r, 5, 9)
      const b = randInt(r, 2, 8)
      return pg({
        tingkat: 'sedang',
        tanya: `Ibu punya ${a} jeruk. Ayah membawa ${b} jeruk lagi. Berapa jeruk semuanya?`,
        benar: a + b,
        salah: [
          [a - b < 0 ? b - a : a - b, 'Jeruknya bertambah, bukan berkurang.'],
          [a + b + 1, 'Kelebihan satu. Hitung maju lagi pelan-pelan.'],
          [a + b - 1, `Jangan hitung ${a} sebagai langkah pertama.`],
          [a, 'Itu jeruk Ibu saja. Jeruk dari Ayah belum dihitung.'],
        ],
        petunjuk: ['"Membawa lagi" berarti ditambah.', `Hitung maju ${b} langkah dari ${a}.`],
        bahas: `${a} + ${b} = ${a + b}. Jadi ada ${a + b} jeruk.`,
      })
    },
    bs({
      tingkat: 'sedang',
      tanya: '6 + 9 hasilnya sama dengan 9 + 6.',
      jawab: true,
      alasan: 'Yang digabung tetap sama, hanya urutannya yang ditukar.',
      petunjuk: ['Bayangkan 6 kelereng merah dan 9 kelereng biru digabung.', 'Kalau yang disebut dulu yang biru, apakah jumlahnya berubah?'],
      bahas: 'Menukar urutan tidak mengubah jumlah. 6 + 9 = 15 dan 9 + 6 = 15.',
    }),
    pg({
      tingkat: 'sulit',
      tanya: '8 + 5 dihitung dengan membuat sepuluh: 8 + 2 + …',
      gambar: { jenis: 'garis', dari: 0, sampai: 15, label: 5, lompat: [[8, 10], [10, 13]], tanda: [8] },
      benar: 3,
      salah: [
        [5, 'Dari 5 itu, 2 sudah dipakai untuk membuat 10.'],
        [2, '2 sudah dipakai. Yang ditanya sisanya.'],
        [13, 'Itu hasil akhirnya, bukan sisa yang ditambahkan.'],
      ],
      petunjuk: ['5 dipecah menjadi 2 dan berapa?', '5 = 2 + …'],
      bahas: '5 = 2 + 3. Jadi 8 + 5 = 8 + 2 + 3 = 10 + 3 = 13.',
    }),
    (r) => {
      const a = randInt(r, 4, 9)
      const c = a + randInt(r, 3, 9)
      return pg({
        tingkat: 'sulit',
        tanya: `${a} + … = ${c}. Bilangan yang hilang adalah`,
        benar: c - a,
        salah: [
          [c + a, 'Itu menjumlahkan kedua bilangan. Yang dicari bagian yang hilang.'],
          [c, `Kalau ${a} + ${c}, hasilnya jauh lebih besar dari ${c}.`],
          [c - a + 1, `Coba periksa: ${a} + ${c - a + 1} = ${c + 1}.`],
          [c - a - 1, `Coba periksa: ${a} + ${c - a - 1} = ${c - 1}.`],
        ],
        petunjuk: [`Hitung maju dari ${a} sampai ${c}.`, 'Banyak langkahnya adalah bilangan yang hilang.'],
        bahas: `Dari ${a} ke ${c} perlu ${c - a} langkah. Jadi ${a} + ${c - a} = ${c}.`,
      })
    },
  ],

  /* ---------------- Pengurangan sampai 20 ---------------- */
  'sd1-pengurangan-bilangan-cacah-sampai-20': [
    (r) => {
      const a = randInt(r, 5, 10)
      const b = randInt(r, 1, a - 1)
      return pg({
        tingkat: 'mudah',
        tanya: `Ada ${a} balon. ${b} balon pecah. Sisa berapa balon?`,
        gambar: { jenis: 'benda', banyak: a, bentuk: 'balon', warna: 'hi', coret: b, per: 5 },
        benar: a - b,
        salah: [
          [a + b, 'Balonnya berkurang, bukan bertambah.'],
          [b, 'Itu banyak balon yang pecah.'],
          [a - b + 1, 'Hitung lagi balon yang tidak dicoret.'],
          [a - b - 1, 'Hitung lagi balon yang tidak dicoret.'],
        ],
        petunjuk: ['Balon yang dicoret sudah pecah.', 'Hitung balon yang tidak dicoret.'],
        bahas: `${a} − ${b} = ${a - b}. Sisa ${a - b} balon.`,
      })
    },
    (r) => {
      const a = randInt(r, 4, 12)
      return pg({
        tingkat: 'mudah',
        tanya: `${a} − ${a} = …`,
        benar: 0,
        salah: [
          [a, 'Itu kalau tidak ada yang diambil.'],
          [1, 'Semuanya diambil, tidak tersisa satu pun.'],
          [2 * a, 'Itu dijumlahkan, bukan dikurangi.'],
        ],
        petunjuk: [`Ada ${a} benda, lalu ${a} benda diambil.`, 'Kalau semua diambil, sisanya berapa?'],
        bahas: `Kalau semua diambil, tidak ada sisa. ${a} − ${a} = 0.`,
      })
    },
    (r) => {
      const a = randInt(r, 11, 15)
      const b = randInt(r, a - 9, 8)
      const satuan = a - 10
      return pg({
        tingkat: 'sedang',
        tanya: `${a} − ${b} = …`,
        gambar: { jenis: 'garis', dari: 0, sampai: 15, label: 5, lompat: [[a, 10], [10, a - b]], tanda: [a] },
        benar: a - b,
        salah: [
          [10 + (b - satuan), `Itu menghitung ${b} − ${satuan}. Padahal yang dikurangi adalah ${a}.`],
          [a - b + 1, 'Kurang satu langkah mundur.'],
          [a - b - 1, 'Kelebihan satu langkah mundur.'],
          [a + b, 'Itu dijumlahkan, bukan dikurangi.'],
        ],
        petunjuk: [`Mundur dulu ${satuan} langkah sampai 10.`, `${b} = ${satuan} + ${b - satuan}. Dari 10 mundur ${b - satuan} lagi.`],
        bahas: `${a} − ${satuan} = 10, lalu 10 − ${b - satuan} = ${a - b}.`,
      })
    },
    (r) => {
      const a = randInt(r, 7, 12)
      const b = randInt(r, 3, a - 2)
      return pg({
        tingkat: 'sedang',
        tanya: `Ani punya ${a} pensil. Budi punya ${b} pensil. Berapa selisih pensil mereka?`,
        gambar: {
          jenis: 'benda',
          kelompok: [
            { banyak: a, label: 'Ani', warna: 'a', per: 12 },
            { banyak: b, label: 'Budi', warna: 'b', per: 12 },
          ],
        },
        benar: a - b,
        salah: [
          [a + b, 'Selisih bukan dijumlah. Selisih adalah bedanya.'],
          [a, 'Itu banyak pensil Ani.'],
          [b, 'Itu banyak pensil Budi.'],
          [a - b + 1, 'Pasangkan lagi satu-satu, lalu hitung sisanya.'],
        ],
        petunjuk: ['Pasangkan pensil Ani dan Budi satu-satu.', 'Selisih = pensil Ani yang tidak punya pasangan.'],
        bahas: `Selisihnya ${a} − ${b} = ${a - b}. Tidak ada yang diambil, tetapi tetap dihitung dengan pengurangan.`,
      })
    },
    bs({
      tingkat: 'sedang',
      tanya: '8 − 5 hasilnya sama dengan 5 − 8.',
      jawab: false,
      alasan: 'Dari 8 benda bisa diambil 5. Dari 5 benda tidak bisa diambil 8.',
      petunjuk: ['Bayangkan 8 kue, lalu 5 dimakan.', 'Sekarang bayangkan 5 kue. Bisakah 8 dimakan?'],
      bahas: '8 − 5 = 3. Tetapi dari 5 tidak bisa diambil 8. Pengurangan tidak boleh dibalik.',
    }),
    (r) => {
      const a = randInt(r, 10, 18)
      const c = randInt(r, 3, a - 3)
      return pg({
        tingkat: 'sulit',
        tanya: `Ada ${a} kelereng. Beberapa diberikan ke adik. Sekarang sisa ${c}. Berapa kelereng yang diberikan?`,
        benar: a - c,
        salah: [
          [a + c, 'Kelerengnya berkurang, jadi tidak dijumlah.'],
          [c, 'Itu sisanya, bukan yang diberikan.'],
          [a - c + 1, `Coba periksa: ${a - c + 1} + ${c} = ${a + 1}.`],
          [a - c - 1, `Coba periksa: ${a - c - 1} + ${c} = ${a - 1}.`],
        ],
        petunjuk: ['Yang diberikan dan yang tersisa berjumlah seperti semula.', `Hitung ${a} − ${c}.`],
        bahas: `${a} − ${c} = ${a - c}. Periksa: ${a - c} + ${c} = ${a}.`,
      })
    },
    pg({
      tingkat: 'sulit',
      tanya: '13 − 5 bisa dihitung lewat sepuluh: 13 − 3 − …',
      gambar: { jenis: 'garis', dari: 0, sampai: 15, label: 5, lompat: [[13, 10], [10, 8]], tanda: [13] },
      benar: 2,
      salah: [
        [5, 'Dari 5 itu, 3 sudah dipakai untuk mundur ke 10.'],
        [3, '3 sudah dipakai. Yang ditanya sisanya.'],
        [8, 'Itu hasil akhirnya.'],
      ],
      petunjuk: ['5 dipecah menjadi 3 dan berapa?', '5 = 3 + …'],
      bahas: '5 = 3 + 2. Jadi 13 − 5 = 13 − 3 − 2 = 10 − 2 = 8.',
    }),
  ],

  /* ---------------- Keluarga fakta ---------------- */
  'sd1-hubungan-penjumlahan-dan-pengurangan-keluarga': [
    (r) => {
      const a = randInt(r, 2, 9)
      const b = randInt(r, 2, 9)
      return pg({
        tingkat: 'mudah',
        tanya: `${a} + ${b} = ${a + b}. Jadi ${a + b} − ${b} = …`,
        benar: a,
        salah: [
          [b, `Yang diambil adalah ${b}. Yang tersisa bagian lainnya.`],
          [a + b, 'Itu keseluruhannya.'],
          [a + 2 * b, 'Itu dijumlahkan, bukan dikurangi.'],
        ],
        petunjuk: [`${a + b} terdiri dari bagian ${a} dan bagian ${b}.`, `Kalau bagian ${b} diambil, yang tersisa bagian mana?`],
        bahas: `${a + b} terdiri dari ${a} dan ${b}. Kalau ${b} diambil, tersisa ${a}.`,
      })
    },
    (r) => {
      const a = randInt(r, 2, 8)
      const b = randInt(r, a + 1, 9)
      return pg({
        tingkat: 'mudah',
        tanya: `Kalau ${a} + ${b} = ${a + b}, maka ${b} + ${a} = …`,
        benar: a + b,
        salah: [
          [b - a, 'Itu dikurangi. Tandanya tetap tambah.'],
          [a + b + 1, 'Bilangannya tetap sama, hanya ditukar urutannya.'],
          [a + b - 1, 'Bilangannya tetap sama, hanya ditukar urutannya.'],
        ],
        petunjuk: ['Dua bilangan yang dijumlahkan masih sama.', 'Menukar urutan tidak mengubah jumlah.'],
        bahas: `${b} + ${a} sama dengan ${a} + ${b}, yaitu ${a + b}.`,
      })
    },
    pg({
      tingkat: 'sedang',
      tanya: 'Manakah yang BUKAN anggota keluarga fakta 4, 6, 10?',
      benar: '10 + 6 = 4',
      salah: [
        ['4 + 6 = 10', 'Ini benar: dua bagian digabung menjadi keseluruhan.'],
        ['10 − 4 = 6', 'Ini benar: keseluruhan dikurangi satu bagian.'],
        ['6 + 4 = 10', 'Ini benar: urutannya saja yang ditukar.'],
      ],
      petunjuk: ['10 adalah keseluruhan. 4 dan 6 adalah bagiannya.', 'Keseluruhan tidak mungkin ditambah lagi lalu menjadi lebih kecil.'],
      bahas: '10 + 6 = 16, bukan 4. Keluarga faktanya: 4 + 6, 6 + 4, 10 − 4, dan 10 − 6.',
    }),
    pg({
      tingkat: 'sedang',
      tanya: 'Untuk memeriksa 12 − 5 = 7, kita bisa menghitung …',
      benar: '7 + 5',
      salah: [
        ['12 + 5', 'Itu menambah lagi ke keseluruhannya.'],
        ['12 + 7', 'Itu menambah lagi ke keseluruhannya.'],
        ['5 − 7', 'Dari 5 tidak bisa diambil 7.'],
      ],
      petunjuk: ['Sisa ditambah yang diambil harus kembali menjadi semula.', 'Sisanya 7 dan yang diambil 5.'],
      bahas: '7 + 5 = 12. Hasilnya kembali ke 12, jadi 12 − 5 = 7 benar.',
    }),
    pg({
      tingkat: 'sedang',
      tanya: 'Tiga bilangan mana yang bisa menjadi satu keluarga fakta?',
      benar: '3, 5, 8',
      salah: [
        ['3, 5, 9', '3 + 5 = 8, bukan 9.'],
        ['2, 6, 9', '2 + 6 = 8, bukan 9.'],
        ['4, 4, 9', '4 + 4 = 8, bukan 9.'],
      ],
      petunjuk: ['Dua bilangan yang kecil harus berjumlah bilangan yang besar.', 'Jumlahkan dua bilangan pertama di tiap pilihan.'],
      bahas: '3 + 5 = 8. Hanya tiga bilangan itu yang membentuk keluarga fakta.',
    }),
    (r) => {
      const b = randInt(r, 3, 8)
      const c = randInt(r, 2, 9)
      return pg({
        tingkat: 'sulit',
        tanya: `… − ${b} = ${c}. Bilangan yang hilang adalah`,
        benar: b + c,
        salah: [
          [Math.abs(b - c), 'Bilangan yang hilang adalah keseluruhannya, jadi harus lebih besar dari kedua bilangan itu.'],
          [b + c + 1, `Coba periksa: ${b + c + 1} − ${b} = ${c + 1}.`],
          [b + c - 1, `Coba periksa: ${b + c - 1} − ${b} = ${c - 1}.`],
          [b, `${b} − ${b} = 0, bukan ${c}.`],
        ],
        petunjuk: ['Yang hilang adalah keseluruhan sebelum dikurangi.', `Gabungkan lagi: ${c} + ${b}.`],
        bahas: `${c} + ${b} = ${b + c}. Periksa: ${b + c} − ${b} = ${c}.`,
      })
    },
    pg({
      tingkat: 'sulit',
      tanya: 'Dari bilangan 7, 9, dan 16 bisa dibuat berapa kalimat penjumlahan dan pengurangan?',
      benar: 4,
      salah: [
        [2, 'Itu baru yang penjumlahan. Masih ada dua pengurangan.'],
        [3, 'Masih ada satu lagi. Coba tukar urutan penjumlahannya.'],
        [6, 'Kalimat seperti 16 + 7 = 9 tidak benar.'],
      ],
      petunjuk: ['Ada dua penjumlahan: 7 + 9 dan 9 + 7.', 'Ada dua pengurangan yang dimulai dari 16.'],
      bahas: '7 + 9 = 16, 9 + 7 = 16, 16 − 7 = 9, dan 16 − 9 = 7. Ada 4 kalimat.',
    }),
  ],

  /* ---------------- Makna simbol +, −, = ---------------- */
  'sd1-makna-simbol-dan-keseimbangan': [
    pg({
      tingkat: 'mudah',
      tanya: 'Tanda + dibaca …',
      benar: 'ditambah',
      salah: [
        ['dikurang', 'Dikurang ditulis dengan tanda −.'],
        ['sama dengan', 'Sama dengan ditulis dengan tanda =.'],
        ['lebih dari', 'Lebih dari ditulis dengan tanda >.'],
      ],
      petunjuk: ['Tanda + dipakai saat dua kelompok digabungkan.', '3 + 2 dibaca "tiga … dua".'],
      bahas: 'Tanda + dibaca "ditambah", artinya digabungkan.',
    }),
    pg({
      tingkat: 'mudah',
      tanya: 'Timbangan ini seimbang. Kalimat matematika yang cocok adalah …',
      gambar: { jenis: 'timbangan', kiri: '3 + 4', kanan: '7', miring: 'seimbang' },
      benar: '3 + 4 = 7',
      salah: [
        ['3 + 4 = 8', '3 + 4 bukan 8, jadi timbangannya tidak akan seimbang.'],
        ['3 − 4 = 7', 'Di piring kiri tandanya tambah, bukan kurang.'],
        ['7 + 4 = 3', 'Isi piringnya tertukar dan nilainya tidak sama.'],
      ],
      petunjuk: ['Seimbang berarti kiri dan kanan sama nilainya.', 'Tulis isi piring kiri, tanda =, lalu isi piring kanan.'],
      bahas: 'Piring kiri 3 + 4 dan piring kanan 7 sama nilainya. Ditulis 3 + 4 = 7.',
    }),
    bs({
      tingkat: 'sedang',
      tanya: '7 = 3 + 4 adalah kalimat matematika yang benar.',
      gambar: { jenis: 'timbangan', kiri: '7', kanan: '3 + 4', miring: 'seimbang' },
      jawab: true,
      alasan: 'Tanda = berarti kiri dan kanan sama nilainya. Hasilnya tidak harus di sebelah kanan.',
      petunjuk: ['Berapa nilai ruas kanan, 3 + 4?', 'Apakah sama dengan ruas kiri?'],
      bahas: 'Kiri 7, kanan 3 + 4 = 7. Kedua ruas sama, jadi kalimatnya benar.',
    }),
    (r) => {
      const a = randInt(r, 2, 6)
      const b = randInt(r, 2, 6)
      const c = randInt(r, 1, a + b - 1)
      const x = a + b - c
      return pg({
        tingkat: 'sedang',
        tanya: `${a} + ${b} = … + ${c}. Bilangan yang tepat adalah`,
        gambar: { jenis: 'timbangan', kiri: `${a} + ${b}`, kanan: `? + ${c}`, miring: 'seimbang' },
        benar: x,
        salah: [
          [a + b, `Itu hasil ruas kiri saja. Ruas kanan masih ditambah ${c}.`],
          [a + b + c, 'Itu menjumlahkan semua bilangan. Kedua ruas harus sama nilainya.'],
          [x + 1, `Coba periksa: ${x + 1} + ${c} = ${a + b + 1}, tidak sama dengan ruas kiri.`],
          [x - 1, `Coba periksa: ${x - 1} + ${c} = ${a + b - 1}, tidak sama dengan ruas kiri.`],
        ],
        petunjuk: [`Ruas kiri bernilai ${a + b}.`, `Ruas kanan juga harus ${a + b}: … + ${c} = ${a + b}.`],
        bahas: `Ruas kiri ${a + b}. Supaya seimbang, ${x} + ${c} = ${a + b}.`,
      })
    },
    pg({
      tingkat: 'sedang',
      tanya: 'Manakah kalimat matematika yang SALAH?',
      benar: '6 + 1 = 8',
      salah: [
        ['5 = 5', 'Kiri 5 dan kanan 5. Ini benar.'],
        ['2 + 6 = 8', '2 + 6 memang 8. Ini benar.'],
        ['9 = 4 + 5', '4 + 5 memang 9. Ini benar.'],
      ],
      petunjuk: ['Hitung nilai ruas kiri dan ruas kanan.', 'Cari yang kedua ruasnya tidak sama.'],
      bahas: '6 + 1 = 7, bukan 8. Kedua ruasnya tidak sama.',
    }),
    pg({
      tingkat: 'sulit',
      tanya: 'Supaya timbangan seimbang, tanda tanya harus diganti dengan …',
      gambar: { jenis: 'timbangan', kiri: '6 + 2', kanan: '5 + ?', miring: 'seimbang' },
      benar: 3,
      salah: [
        [8, 'Itu nilai piring kiri. Di piring kanan sudah ada 5.'],
        [13, 'Itu menjumlahkan semua bilangan.'],
        [2, '5 + 2 = 7, belum sama dengan 8.'],
      ],
      petunjuk: ['Piring kiri bernilai 6 + 2 = 8.', '5 ditambah berapa supaya menjadi 8?'],
      bahas: 'Kiri 8. Kanan 5 + 3 = 8. Jadi tanda tanya diganti 3.',
    }),
    bs({
      tingkat: 'sulit',
      tanya: 'Tulisan 3 + 5 = 8 + 2 = 10 adalah kalimat matematika yang benar.',
      jawab: false,
      alasan: '3 + 5 bernilai 8, tetapi 8 + 2 bernilai 10. Keduanya tidak sama, jadi tidak boleh disambung dengan =.',
      petunjuk: ['Tanda = berarti kiri dan kanannya sama nilainya.', 'Apakah 3 + 5 sama dengan 8 + 2?'],
      bahas: '3 + 5 = 8 dan 8 + 2 = 10 harus ditulis terpisah, karena 8 tidak sama dengan 10.',
    }),
  ],

  /* ---------------- Pola bukan bilangan ---------------- */
  'sd1-pola-bukan-bilangan-gambar-warna': [
    pg({
      tingkat: 'mudah',
      tanya: 'Bentuk apa yang mengisi kotak kosong?',
      gambar: { jenis: 'pola', isi: ['bulat:a', 'kotak:b', 'bulat:a', 'kotak:b', 'bulat:a', '?'] },
      benar: 'kotak',
      salah: [
        ['bulatan', 'Sesudah bulatan selalu kotak.'],
        ['segitiga', 'Segitiga tidak ada dalam pola ini.'],
      ],
      petunjuk: ['Cari bagian yang berulang.', 'Polanya bulatan, kotak, bulatan, kotak, …'],
      bahas: 'Bagian yang berulang adalah "bulatan, kotak". Sesudah bulatan datang kotak.',
    }),
    pg({
      tingkat: 'mudah',
      tanya: 'Bentuk apa yang mengisi kotak kosong?',
      gambar: {
        jenis: 'pola',
        isi: ['bintang:b', 'bintang:b', 'hati:hi', 'bintang:b', 'bintang:b', 'hati:hi', 'bintang:b', '?'],
      },
      benar: 'bintang',
      salah: [
        ['hati', 'Hati baru muncul sesudah dua bintang.'],
        ['bulatan', 'Bulatan tidak ada dalam pola ini.'],
      ],
      petunjuk: ['Bagian yang berulang berisi tiga benda.', 'Polanya bintang, bintang, hati.'],
      bahas: 'Bagian yang berulang adalah "bintang, bintang, hati". Baru ada satu bintang, jadi berikutnya bintang lagi.',
    }),
    pg({
      tingkat: 'sedang',
      tanya: 'Bagian yang berulang pada pola ini adalah …',
      gambar: {
        jenis: 'pola',
        isi: ['segitiga:c', 'bulat:a', 'bulat:a', 'segitiga:c', 'bulat:a', 'bulat:a'],
      },
      benar: 'segitiga, bulatan, bulatan',
      salah: [
        ['segitiga, bulatan', 'Kalau itu yang berulang, benda ke-3 seharusnya segitiga.'],
        ['bulatan, bulatan', 'Segitiganya belum ikut.'],
        ['segitiga, bulatan, bulatan, segitiga', 'Itu sudah melewati satu bagian dan masuk ke ulangan berikutnya.'],
      ],
      petunjuk: ['Cari di mana polanya mulai mengulang dari awal.', 'Segitiga muncul lagi di urutan ke-4.'],
      bahas: 'Pola mulai mengulang di benda ke-4. Jadi bagian yang berulang adalah tiga benda pertama.',
    }),
    pg({
      tingkat: 'sedang',
      tanya: 'Ada satu bagian pola yang hilang di tengah. Bentuk apa itu?',
      gambar: {
        jenis: 'pola',
        isi: ['hati:hi', 'kotak:c', 'kotak:c', 'hati:hi', '?', 'kotak:c', 'hati:hi'],
      },
      benar: 'kotak',
      salah: [
        ['hati', 'Sesudah hati selalu ada dua kotak.'],
        ['bintang', 'Bintang tidak ada dalam pola ini.'],
      ],
      petunjuk: ['Lihat tiga benda pertama: hati, kotak, kotak.', 'Sesudah hati yang kedua, benda apa yang datang?'],
      bahas: 'Polanya "hati, kotak, kotak". Sesudah hati harus ada dua kotak, jadi yang hilang kotak.',
    }),
    pg({
      tingkat: 'sedang',
      tanya: 'Pola warna: merah, biru, biru, merah, biru, biru. Kalau merah = tepuk dan biru = hentak, bunyinya menjadi …',
      benar: 'tepuk, hentak, hentak, tepuk, hentak, hentak',
      salah: [
        ['tepuk, hentak, tepuk, hentak, tepuk, hentak', 'Itu pola bergantian satu-satu. Birunya ada dua berturut-turut.'],
        ['hentak, tepuk, tepuk, hentak, tepuk, tepuk', 'Tertukar: merah itu tepuk, biru itu hentak.'],
        ['tepuk, tepuk, hentak, tepuk, tepuk, hentak', 'Yang dua berturut-turut adalah biru (hentak), bukan merah.'],
      ],
      petunjuk: ['Ganti setiap "merah" dengan "tepuk".', 'Ganti setiap "biru" dengan "hentak".'],
      bahas: 'Bentuk polanya tetap sama: satu, lalu dua yang sama. Hanya warnanya diganti bunyi.',
    }),
    pg({
      tingkat: 'sulit',
      tanya: 'Pola ini berulang terus. Benda ke-8 adalah …',
      gambar: {
        jenis: 'pola',
        isi: ['apel:hi', 'ikan:c', 'balon:b', 'apel:hi', 'ikan:c', 'balon:b'],
      },
      benar: 'ikan',
      salah: [
        ['apel', 'Apel ada di urutan ke-7.'],
        ['balon', 'Balon ada di urutan ke-9.'],
      ],
      petunjuk: ['Lanjutkan polanya: benda ke-7 sama dengan benda ke-1.', 'Benda ke-8 sama dengan benda ke-2.'],
      bahas: 'Polanya apel, ikan, balon. Ke-7 apel, ke-8 ikan.',
    }),
    bs({
      tingkat: 'sulit',
      tanya: 'Deretan ini adalah pola berulang.',
      gambar: { jenis: 'pola', isi: ['bulat:a', 'kotak:b', 'hati:hi', 'bintang:c', 'segitiga:ab'] },
      jawab: false,
      alasan: 'Belum ada bagian yang muncul lagi, jadi kita tidak bisa tahu benda berikutnya.',
      petunjuk: ['Pola berulang punya bagian yang muncul lagi.', 'Adakah bentuk yang muncul dua kali?'],
      bahas: 'Semua bentuknya berbeda dan tidak ada yang berulang. Ini deretan biasa, bukan pola berulang.',
    }),
  ],

  /* ---------------- Menyortir dan mengelompokkan ---------------- */
  'sd1-menyortir-dan-mengelompokkan-benda-menurut': [
    pg({
      tingkat: 'mudah',
      tanya: 'Ada berapa bulatan?',
      gambar: { jenis: 'pola', isi: BENDA_CAMPUR },
      benar: 4,
      salah: [
        [3, 'Ada bulatan ungu dan bulatan jingga. Hitung dua-duanya.'],
        [2, 'Itu baru bulatan yang satu warna.'],
        [7, 'Itu semua benda, bukan hanya bulatan.'],
      ],
      petunjuk: ['Tunjuk hanya yang bentuknya bulat.', 'Warna boleh berbeda, yang penting bentuknya bulat.'],
      bahas: 'Ada 2 bulatan ungu dan 2 bulatan jingga. Semuanya 4 bulatan.',
    }),
    pg({
      tingkat: 'mudah',
      tanya: 'Benda-benda ini dipisah menjadi kelompok ungu dan kelompok jingga. Ciri yang dipakai adalah …',
      gambar: { jenis: 'pola', isi: BENDA_CAMPUR },
      benar: 'warna',
      salah: [
        ['bentuk', 'Kalau menurut bentuk, kelompoknya bulatan, kotak, dan segitiga.'],
        ['ukuran', 'Semua bendanya hampir sama besar.'],
      ],
      petunjuk: ['Ungu dan jingga itu nama apa?', 'Ungu dan jingga adalah nama warna.'],
      bahas: 'Ungu dan jingga adalah warna. Jadi bendanya dikelompokkan menurut warna.',
    }),
    pg({
      tingkat: 'sedang',
      tanya: 'Kalau dikelompokkan menurut bentuk, ada berapa kelompok?',
      gambar: { jenis: 'pola', isi: BENDA_CAMPUR },
      benar: 3,
      salah: [
        [2, 'Itu kalau dikelompokkan menurut warna.'],
        [7, 'Itu banyak bendanya, bukan banyak kelompoknya.'],
        [4, 'Sebutkan bentuknya satu per satu: bulatan, kotak, lalu apa?'],
      ],
      petunjuk: ['Sebutkan bentuk apa saja yang ada.', 'Ada bulatan, kotak, dan segitiga.'],
      bahas: 'Bentuknya ada tiga: bulatan, kotak, dan segitiga. Jadi ada 3 kelompok.',
    }),
    pg({
      tingkat: 'sedang',
      tanya: 'Kelompok warna mana yang anggotanya lebih banyak?',
      gambar: { jenis: 'pola', isi: BENDA_CAMPUR },
      benar: 'ungu',
      salah: [
        ['jingga', 'Jingga hanya ada 3 benda.'],
        ['sama banyak', 'Hitung lagi: ungu 4, jingga 3.'],
      ],
      petunjuk: ['Hitung benda ungu, lalu benda jingga.', 'Bandingkan kedua hasilnya.'],
      bahas: 'Ungu ada 4 benda dan jingga ada 3 benda. Ungu lebih banyak.',
    }),
    bs({
      tingkat: 'sedang',
      tanya: 'Kumpulan benda yang sama bisa dikelompokkan dengan lebih dari satu cara.',
      gambar: { jenis: 'pola', isi: BENDA_CAMPUR },
      jawab: true,
      alasan: 'Benda-benda di gambar bisa dikelompokkan menurut warna, bisa juga menurut bentuk.',
      petunjuk: ['Coba kelompokkan menurut warna.', 'Sekarang coba menurut bentuk. Bisa juga, kan?'],
      bahas: 'Benda yang sama bisa disortir menurut warna atau menurut bentuk. Yang penting pilih satu ciri dulu.',
    }),
    pg({
      tingkat: 'sulit',
      tanya: 'Tono membuat kelompok "merah" dan kelompok "bulat". Sebuah bola merah masuk kelompok mana?',
      benar: 'Bisa masuk keduanya, jadi cara mengelompokkannya kurang tepat',
      salah: [
        ['Hanya kelompok merah', 'Bola itu juga bulat, jadi cocok juga di kelompok bulat.'],
        ['Hanya kelompok bulat', 'Bola itu juga merah, jadi cocok juga di kelompok merah.'],
        ['Tidak masuk kelompok mana pun', 'Bola itu merah dan bulat, jadi cocok di dua kelompok.'],
      ],
      petunjuk: ['Bola merah itu warnanya apa? Bentuknya apa?', '"Merah" itu warna, "bulat" itu bentuk. Tono memakai dua ciri sekaligus.'],
      bahas: 'Tono mencampur warna dan bentuk. Akibatnya satu benda bisa masuk dua kelompok. Pilih satu ciri saja.',
    }),
    pg({
      tingkat: 'sulit',
      tanya: 'Ini hasil menyortir. Bulatan lebih banyak berapa daripada kotak?',
      gambar: {
        jenis: 'tabel',
        kepala: ['Bentuk', 'Banyak'],
        baris: [
          ['Bulatan', 4],
          ['Kotak', 2],
          ['Segitiga', 1],
        ],
      },
      benar: 2,
      salah: [
        [4, 'Itu banyak bulatan.'],
        [6, 'Itu kalau bulatan dan kotak digabung.'],
        [3, 'Itu selisih bulatan dengan segitiga.'],
      ],
      petunjuk: ['Baca baris "Bulatan" dan baris "Kotak".', 'Hitung selisihnya: 4 − 2.'],
      bahas: 'Bulatan 4 dan kotak 2. Selisihnya 4 − 2 = 2.',
    }),
  ],

  /* ---------------- Bangun datar ---------------- */
  'sd1-mengenal-dan-mengelompokkan-bangun-datar': [
    pg({
      tingkat: 'mudah',
      tanya: 'Apa nama bangun ini?',
      gambar: { jenis: 'bangun', bentuk: 'segitiga' },
      benar: 'segitiga',
      salah: [
        ['persegi', 'Persegi punya 4 sisi. Bangun ini hanya 3.'],
        ['lingkaran', 'Lingkaran sisinya melengkung.'],
        ['persegi panjang', 'Persegi panjang punya 4 sisi.'],
      ],
      petunjuk: ['Hitung sisinya.', 'Bangun dengan 3 sisi lurus disebut apa?'],
      bahas: 'Bangun ini punya 3 sisi lurus dan 3 titik sudut. Namanya segitiga.',
    }),
    pg({
      tingkat: 'mudah',
      tanya: 'Bangun ini punya berapa titik sudut?',
      gambar: { jenis: 'bangun', bentuk: 'lingkaran' },
      benar: 0,
      salah: [
        [1, 'Tidak ada bagian yang runcing pada lingkaran.'],
        [4, 'Empat titik sudut dimiliki segiempat.'],
        [3, 'Tiga titik sudut dimiliki segitiga.'],
      ],
      petunjuk: ['Titik sudut adalah tempat dua sisi lurus bertemu.', 'Lingkaran sisinya melengkung terus.'],
      bahas: 'Lingkaran hanya punya satu sisi lengkung dan tidak punya titik sudut.',
    }),
    pg({
      tingkat: 'sedang',
      tanya: 'Bangun ini punya berapa sisi?',
      gambar: { jenis: 'bangun', bentuk: 'persegi-panjang' },
      benar: 4,
      salah: [
        [3, 'Tiga sisi dimiliki segitiga.'],
        [2, 'Sisi atas-bawah dan kiri-kanan semuanya dihitung.'],
        [5, 'Hitung lagi pelan-pelan sambil ditunjuk.'],
      ],
      petunjuk: ['Tunjuk sisinya satu per satu.', 'Atas, kanan, bawah, kiri.'],
      bahas: 'Persegi panjang punya 4 sisi lurus. Karena itu ia termasuk segiempat.',
    }),
    cocok({
      tingkat: 'sedang',
      tanya: 'Pasangkan bangun dengan cirinya.',
      pasangan: [
        ['segitiga', '3 sisi lurus'],
        ['segiempat', '4 sisi lurus'],
        ['lingkaran', 'sisi lengkung, tanpa titik sudut'],
      ],
      petunjuk: ['Nama "segitiga" dan "segiempat" sudah menyebut banyak sisinya.', 'Bangun mana yang tidak punya bagian runcing?'],
      bahas: 'Segitiga 3 sisi, segiempat 4 sisi, dan lingkaran bersisi lengkung tanpa titik sudut.',
    }),
    bs({
      tingkat: 'sedang',
      tanya: 'Segitiga yang dimiringkan tetap disebut segitiga.',
      jawab: true,
      alasan: 'Sisinya tetap 3 dan titik sudutnya tetap 3 walaupun diputar.',
      petunjuk: ['Apakah banyak sisinya berubah kalau diputar?', 'Nama bangun ditentukan oleh sisi dan sudutnya, bukan oleh arahnya.'],
      bahas: 'Diputar, dibalik, atau diperbesar, sisinya tetap 3. Jadi tetap segitiga.',
    }),
    pg({
      tingkat: 'sulit',
      tanya: 'Sebuah bangun punya 4 sisi lurus dan 4 titik sudut. Bangun itu pasti …',
      benar: 'segiempat',
      salah: [
        ['segitiga', 'Segitiga hanya punya 3 sisi.'],
        ['lingkaran', 'Lingkaran tidak punya sisi lurus.'],
        ['segilima', 'Segilima punya 5 sisi.'],
      ],
      petunjuk: ['Nama bangun mengikuti banyak sisinya.', 'Segi-… dengan 4 sisi.'],
      bahas: 'Bangun dengan 4 sisi lurus disebut segiempat. Persegi dan persegi panjang termasuk di dalamnya.',
    }),
    bs({
      tingkat: 'sulit',
      tanya: 'Persegi bukan segiempat, karena namanya berbeda.',
      gambar: { jenis: 'bangun', bentuk: 'persegi' },
      jawab: false,
      alasan: 'Persegi punya 4 sisi lurus, jadi ia segiempat juga. Persegi adalah segiempat yang semua sisinya sama panjang.',
      petunjuk: ['Hitung sisi persegi.', 'Semua bangun dengan 4 sisi lurus adalah segiempat.'],
      bahas: 'Persegi punya 4 sisi lurus. Jadi persegi termasuk segiempat, yaitu segiempat yang istimewa.',
    }),
  ],

  /* ---------------- Posisi dan arah ---------------- */
  'sd1-posisi-dan-arah-benda': [
    pg({
      tingkat: 'mudah',
      tanya: 'Benda apa yang ada di antara buku dan tas?',
      gambar: { jenis: 'pola', isi: ['buku', 'pensil', 'tas'], ujung: ['kiri', 'kanan'] },
      benar: 'pensil',
      salah: [
        ['buku', 'Buku ada di ujung kiri.'],
        ['tas', 'Tas ada di ujung kanan.'],
      ],
      petunjuk: ['"Di antara" berarti di tengah-tengah dua benda.', 'Benda mana yang diapit buku dan tas?'],
      bahas: 'Pensil diapit buku dan tas. Jadi pensil ada di antara keduanya.',
    }),
    pg({
      tingkat: 'mudah',
      tanya: 'Benda apa yang letaknya paling kanan?',
      gambar: { jenis: 'pola', isi: ['buku', 'pensil', 'tas'], ujung: ['kiri', 'kanan'] },
      benar: 'tas',
      salah: [
        ['buku', 'Buku ada paling kiri.'],
        ['pensil', 'Pensil ada di tengah.'],
      ],
      petunjuk: ['Lihat tulisan "kanan" pada gambar.', 'Benda mana yang paling dekat dengan tulisan itu?'],
      bahas: 'Tas ada di ujung kanan.',
    }),
    pg({
      tingkat: 'sedang',
      tanya: 'Pensil ada di sebelah … buku.',
      gambar: { jenis: 'pola', isi: ['buku', 'pensil', 'tas'], ujung: ['kiri', 'kanan'] },
      benar: 'kanan',
      salah: [
        ['kiri', 'Yang ditanya letak pensil dilihat dari buku. Buku yang ada di kiri pensil.'],
        ['atas', 'Bendanya berjajar ke samping, tidak bertumpuk.'],
        ['bawah', 'Bendanya berjajar ke samping, tidak bertumpuk.'],
      ],
      petunjuk: ['Acuannya adalah buku.', 'Dari buku, kamu harus bergeser ke arah mana untuk sampai ke pensil?'],
      bahas: 'Dari buku, pensil ada di arah kanan. Jadi pensil di sebelah kanan buku.',
    }),
    pg({
      tingkat: 'sedang',
      tanya: 'Kamu berhadapan dengan temanmu. Ia mengangkat tangan kanannya. Dari tempatmu, tangan itu terlihat di sebelah …',
      benar: 'kiri',
      salah: [
        ['kanan', 'Karena berhadapan, kanan temanmu berseberangan dengan kananmu.'],
        ['atas', 'Yang ditanya sisi kiri atau kanan.'],
        ['belakang', 'Tangannya tetap ada di depanmu.'],
      ],
      petunjuk: ['Coba berdiri berhadapan dengan seseorang.', 'Tangan kanannya ada di depan tanganmu yang mana?'],
      bahas: 'Saat berhadapan, kanan temanmu ada di sisi kirimu. Kanan dan kiri tergantung siapa yang melihat.',
    }),
    bs({
      tingkat: 'sedang',
      tanya: 'Kalau kamu berbalik badan, benda yang tadi di sebelah kananmu sekarang ada di sebelah kirimu.',
      jawab: true,
      alasan: 'Bendanya tidak pindah, tetapi badanmu berputar. Jadi sisi kanan dan kirimu bertukar.',
      petunjuk: ['Coba lakukan: berdiri, lihat benda di kananmu, lalu berbalik.', 'Bendanya diam. Yang berubah adalah arah hadapmu.'],
      bahas: 'Kanan dan kiri mengikuti arah hadap kita. Setelah berbalik, keduanya bertukar.',
    }),
    pg({
      tingkat: 'sulit',
      tanya: 'Di rak, sepatu ada di paling bawah, topi di paling atas, dan buku di tengah. Benda di bawah topi dan di atas sepatu adalah …',
      benar: 'buku',
      salah: [
        ['topi', 'Topi ada paling atas.'],
        ['sepatu', 'Sepatu ada paling bawah.'],
      ],
      petunjuk: ['Susun dari bawah: sepatu, …, topi.', 'Benda mana yang diapit topi dan sepatu?'],
      bahas: 'Buku ada di tengah: di bawah topi dan di atas sepatu.',
    }),
    (r) => {
      const maju = randInt(r, 4, 8)
      const mundur = randInt(r, 1, maju - 2)
      return pg({
        tingkat: 'sulit',
        tanya: `Dodi maju ${maju} langkah, lalu mundur ${mundur} langkah. Sekarang Dodi berada berapa langkah di depan tempat awalnya?`,
        gambar: { jenis: 'garis', dari: 0, sampai: 10, lompat: [[0, maju], [maju, maju - mundur]] },
        benar: maju - mundur,
        salah: [
          [maju + mundur, 'Mundur berarti kembali ke arah awal, jadi tidak dijumlah.'],
          [maju, 'Itu sebelum Dodi mundur.'],
          [mundur, 'Itu banyak langkah mundurnya.'],
        ],
        petunjuk: ['Maju berarti menjauh dari tempat awal.', 'Mundur berarti mendekat lagi ke tempat awal.'],
        bahas: `${maju} langkah maju lalu ${mundur} mundur: ${maju} − ${mundur} = ${maju - mundur} langkah di depan tempat awal.`,
      })
    },
  ],

  /* ---------------- Membandingkan berat ---------------- */
  'sd1-membandingkan-berat-secara-langsung': [
    pg({
      tingkat: 'mudah',
      tanya: 'Benda mana yang lebih berat?',
      gambar: { jenis: 'timbangan', kiri: 'batu', kanan: 'kapas', miring: 'kiri' },
      benar: 'batu',
      salah: [
        ['kapas', 'Lengan kapas naik. Itu artinya kapas lebih ringan.'],
        ['sama berat', 'Kalau sama berat, kedua lengan sejajar.'],
      ],
      petunjuk: ['Lihat lengan mana yang turun.', 'Lengan yang turun membawa benda yang lebih berat.'],
      bahas: 'Lengan batu turun. Jadi batu lebih berat daripada kapas.',
    }),
    pg({
      tingkat: 'mudah',
      tanya: 'Apa yang benar tentang apel dan jeruk ini?',
      gambar: { jenis: 'timbangan', kiri: 'apel', kanan: 'jeruk', miring: 'seimbang' },
      benar: 'Sama berat',
      salah: [
        ['Apel lebih berat', 'Kalau apel lebih berat, lengan kiri akan turun.'],
        ['Jeruk lebih berat', 'Kalau jeruk lebih berat, lengan kanan akan turun.'],
      ],
      petunjuk: ['Lihat kedua lengan neraca.', 'Lengannya sejajar, tidak ada yang turun.'],
      bahas: 'Kedua lengan sejajar. Jadi apel dan jeruk sama berat.',
    }),
    pg({
      tingkat: 'sedang',
      tanya: 'Benda mana yang lebih ringan?',
      gambar: { jenis: 'timbangan', kiri: 'bola', kanan: 'buku', miring: 'kanan' },
      benar: 'bola',
      salah: [
        ['buku', 'Lengan buku turun. Itu artinya buku lebih berat.'],
        ['sama berat', 'Lengannya tidak sejajar.'],
      ],
      petunjuk: ['Lengan yang naik membawa benda yang lebih ringan.', 'Lengan mana yang naik?'],
      bahas: 'Lengan bola naik. Jadi bola lebih ringan daripada buku.',
    }),
    bs({
      tingkat: 'sedang',
      tanya: 'Benda yang ukurannya lebih besar pasti lebih berat.',
      jawab: false,
      alasan: 'Balon besar lebih ringan daripada batu kecil. Besar belum tentu berat.',
      petunjuk: ['Bandingkan balon besar dengan batu kecil.', 'Mana yang lebih berat saat diangkat?'],
      bahas: 'Berat tidak bisa ditebak dari ukuran. Balon besar tetap lebih ringan daripada batu kecil.',
    }),
    pg({
      tingkat: 'sedang',
      tanya: 'Lengan neraca yang turun menunjukkan benda yang …',
      gambar: { jenis: 'timbangan', kiri: 'A', kanan: 'B', miring: 'kiri' },
      benar: 'lebih berat',
      salah: [
        ['lebih ringan', 'Benda yang lebih ringan justru terangkat naik.'],
        ['lebih besar', 'Neraca membandingkan berat, bukan ukuran.'],
        ['lebih panjang', 'Neraca membandingkan berat, bukan panjang.'],
      ],
      petunjuk: ['Benda berat menekan ke bawah lebih kuat.', 'Seperti jungkat-jungkit: siapa yang turun?'],
      bahas: 'Benda yang lebih berat menekan lengannya ke bawah, sehingga lengan itu turun.',
    }),
    pg({
      tingkat: 'sulit',
      tanya: 'Semangka lebih berat dari melon. Melon lebih berat dari jeruk. Yang paling ringan adalah …',
      benar: 'jeruk',
      salah: [
        ['semangka', 'Semangka justru yang paling berat.'],
        ['melon', 'Melon masih lebih berat daripada jeruk.'],
      ],
      petunjuk: ['Urutkan dari yang paling berat.', 'Semangka, lalu melon, lalu …'],
      bahas: 'Urutan dari yang berat: semangka, melon, jeruk. Jadi jeruk paling ringan.',
    }),
    urut({
      tingkat: 'sulit',
      tanya: 'Buku lebih berat dari pensil. Tas lebih berat dari buku. Urutkan dari yang paling ringan.',
      langkah: ['pensil', 'buku', 'tas'],
      petunjuk: ['Benda mana yang kalah berat dari semua benda lain?', 'Tas lebih berat dari buku, jadi tas ditaruh paling akhir.'],
      bahas: 'Pensil paling ringan, lalu buku, lalu tas yang paling berat.',
    }),
  ],

  /* ---------------- Membandingkan panjang ---------------- */
  'sd1-membandingkan-panjang-dan-tinggi-secara': [
    (r) => {
      const a = randInt(r, 4, 10)
      let b = randInt(r, 4, 10)
      if (b === a) b = a === 10 ? 6 : a + 1
      const panjang = a > b ? 'A' : 'B'
      return pg({
        tingkat: 'mudah',
        tanya: 'Pita mana yang lebih panjang?',
        gambar: {
          jenis: 'pita',
          isi: [
            { label: 'Pita A', panjang: a },
            { label: 'Pita B', panjang: b },
          ],
        },
        benar: `Pita ${panjang}`,
        salah: [
          [`Pita ${panjang === 'A' ? 'B' : 'A'}`, 'Ujung kanan pita ini berhenti lebih dulu.'],
          ['Sama panjang', 'Ujung kanan kedua pita tidak sejajar.'],
        ],
        petunjuk: ['Ujung kiri kedua pita sudah sejajar.', 'Lihat ujung kanannya: pita mana yang lebih jauh?'],
        bahas: `Ujung kirinya sejajar, dan ujung kanan pita ${panjang} lebih jauh. Jadi pita ${panjang} lebih panjang.`,
      })
    },
    pg({
      tingkat: 'mudah',
      tanya: 'Apa yang benar tentang kedua pita ini?',
      gambar: {
        jenis: 'pita',
        isi: [
          { label: 'Pita A', panjang: 7 },
          { label: 'Pita B', panjang: 7 },
        ],
      },
      benar: 'Sama panjang',
      salah: [
        ['Pita A lebih panjang', 'Ujung kanan kedua pita berhenti di tempat yang sama.'],
        ['Pita B lebih panjang', 'Ujung kanan kedua pita berhenti di tempat yang sama.'],
      ],
      petunjuk: ['Lihat ujung kiri: sejajar.', 'Lihat ujung kanan: sejajar juga atau tidak?'],
      bahas: 'Kedua ujungnya sejajar. Jadi kedua pita sama panjang.',
    }),
    pg({
      tingkat: 'sedang',
      tanya: 'Ujung kanan pita B lebih jauh. Pita mana yang lebih panjang?',
      gambar: {
        jenis: 'pita',
        petak: true,
        isi: [
          { label: 'Pita A', panjang: 6 },
          { label: 'Pita B', panjang: 6, mulai: 3 },
        ],
      },
      benar: 'Sama panjang',
      salah: [
        ['Pita B', 'Pita B hanya digeser ke kanan. Hitung petaknya: sama-sama 6.'],
        ['Pita A', 'Hitung petak kedua pita: sama-sama 6.'],
      ],
      petunjuk: ['Ujung kiri kedua pita tidak sejajar.', 'Hitung saja berapa petak panjang tiap pita.'],
      bahas: 'Keduanya 6 petak. Pita B tampak lebih jauh hanya karena mulainya digeser.',
    }),
    pg({
      tingkat: 'sedang',
      tanya: 'Pita mana yang lebih panjang?',
      gambar: {
        jenis: 'pita',
        petak: true,
        isi: [
          { label: 'Pita A', panjang: 7 },
          { label: 'Pita B', panjang: 5, mulai: 4 },
        ],
      },
      benar: 'Pita A',
      salah: [
        ['Pita B', 'Ujung kanan pita B memang lebih jauh, tetapi mulainya juga lebih ke kanan. Panjangnya hanya 5 petak.'],
        ['Sama panjang', 'Hitung petaknya: A 7 petak, B 5 petak.'],
      ],
      petunjuk: ['Jangan hanya melihat ujung kanan.', 'Hitung petak tiap pita dari ujung ke ujung.'],
      bahas: 'Pita A 7 petak dan pita B 5 petak. Jadi pita A lebih panjang.',
    }),
    bs({
      tingkat: 'sedang',
      tanya: 'Sebelum membandingkan panjang dua pensil, salah satu ujungnya harus disejajarkan dulu.',
      jawab: true,
      alasan: 'Kalau ujungnya tidak sejajar, pensil yang lebih pendek bisa tampak lebih jauh.',
      petunjuk: ['Bayangkan dua pensil diletakkan sembarangan.', 'Bisakah kamu yakin mana yang lebih panjang kalau mulainya berbeda?'],
      bahas: 'Menyejajarkan satu ujung membuat perbandingannya adil. Baru ujung lainnya dibandingkan.',
    }),
    pg({
      tingkat: 'sulit',
      tanya: 'Tali lebih panjang dari pita. Pita lebih panjang dari pensil. Jadi tali … pensil.',
      benar: 'lebih panjang dari',
      salah: [
        ['lebih pendek dari', 'Tali bahkan lebih panjang daripada pita, padahal pita sudah lebih panjang dari pensil.'],
        ['sama panjang dengan', 'Tali melebihi pita, dan pita melebihi pensil.'],
      ],
      petunjuk: ['Urutkan dari yang paling panjang.', 'Tali, lalu pita, lalu pensil.'],
      bahas: 'Tali melebihi pita, dan pita melebihi pensil. Jadi tali pasti lebih panjang dari pensil.',
    }),
    pg({
      tingkat: 'sulit',
      tanya: 'Pintu dan lemari berjauhan dan tidak bisa dipindah. Cara yang tepat untuk membandingkan tingginya adalah …',
      benar: 'Mengukur keduanya dengan tali yang sama',
      salah: [
        ['Menebak dari jauh', 'Tebakan bisa keliru. Kita perlu benda perantara.'],
        ['Melihat mana yang lebih lebar', 'Lebar tidak memberi tahu tinggi.'],
        ['Melihat mana yang lebih berat', 'Berat tidak memberi tahu tinggi.'],
      ],
      petunjuk: ['Kita butuh benda yang bisa dibawa dari pintu ke lemari.', 'Tandai tinggi pintu pada tali, lalu bawa talinya ke lemari.'],
      bahas: 'Tali menjadi perantara: tandai tinggi pintu pada tali, lalu bandingkan dengan lemari.',
    }),
  ],

  /* ---------------- Mengukur dengan satuan tidak baku ---------------- */
  'sd1-mengukur-panjang-dengan-satuan-tidak': [
    (r) => {
      const n = randInt(r, 4, 9)
      return pg({
        tingkat: 'mudah',
        tanya: 'Panjang pensil ini sama dengan berapa petak?',
        gambar: { jenis: 'pita', petak: true, lebar: 10, isi: [{ label: 'Pensil', panjang: n }] },
        benar: n,
        salah: [
          [n + 1, 'Petak sesudah ujung pensil tidak ikut dihitung.'],
          [n - 1, 'Ada satu petak yang terlewat.'],
          [10, 'Itu semua petak pada gambar, bukan hanya yang tertutup pensil.'],
        ],
        petunjuk: ['Hitung petak yang tertutup pensil.', 'Mulai dari ujung kiri pensil sampai ujung kanannya.'],
        bahas: `Pensil menutupi ${n} petak. Jadi panjangnya ${n} petak.`,
      })
    },
    pg({
      tingkat: 'mudah',
      tanya: 'Mana yang termasuk satuan tidak baku?',
      benar: 'jengkal',
      salah: [
        ['sentimeter', 'Sentimeter adalah satuan baku. Panjangnya sama di mana pun.'],
        ['meter', 'Meter adalah satuan baku. Panjangnya sama di mana pun.'],
      ],
      petunjuk: ['Satuan tidak baku bisa berbeda untuk tiap orang.', 'Jengkalmu dan jengkal ayahmu sama panjang atau tidak?'],
      bahas: 'Jengkal tiap orang berbeda panjangnya. Karena itu jengkal disebut satuan tidak baku.',
    }),
    pg({
      tingkat: 'sedang',
      tanya: 'Meja diukur dengan pensil dan hasilnya 6. Cara melaporkan yang lengkap adalah …',
      benar: '6 pensil',
      salah: [
        ['6', 'Tanpa nama satuan, orang tidak tahu 6 apa.'],
        ['6 meja', 'Meja adalah benda yang diukur, bukan satuannya.'],
        ['pensil', 'Banyaknya belum disebut.'],
      ],
      petunjuk: ['Hasil ukur berisi bilangan dan nama satuannya.', 'Satuannya adalah benda yang dipakai mengukur.'],
      bahas: 'Hasil ukur harus lengkap: bilangan dan satuannya. Jadi "6 pensil".',
    }),
    bs({
      tingkat: 'sedang',
      tanya: 'Saat mengukur dengan klip kertas, klip boleh disusun saling bertumpuk.',
      jawab: false,
      alasan: 'Kalau bertumpuk, klip yang dipakai jadi lebih banyak dari seharusnya. Hasil ukurnya keliru.',
      petunjuk: ['Bayangkan klip yang saling menindih.', 'Apakah klip yang dibutuhkan jadi lebih banyak?'],
      bahas: 'Satuan harus disusun rapat, tanpa celah dan tanpa bertumpuk, supaya hasilnya tepat.',
    }),
    pg({
      tingkat: 'sedang',
      tanya: 'Lidi ini tidak mulai dari ujung gambar. Berapa petak panjang lidi?',
      gambar: { jenis: 'pita', petak: true, lebar: 10, isi: [{ label: 'Lidi', panjang: 5, mulai: 2 }] },
      benar: 5,
      salah: [
        [7, 'Itu dihitung dari ujung gambar. Lidi baru mulai sesudah 2 petak kosong.'],
        [2, 'Itu petak kosong sebelum lidi.'],
        [10, 'Itu semua petak pada gambar.'],
      ],
      petunjuk: ['Jangan hitung petak kosong di sebelah kiri lidi.', 'Hitung hanya petak yang tertutup lidi.'],
      bahas: 'Lidi menutupi 5 petak. Dua petak kosong di kirinya tidak dihitung.',
    }),
    pg({
      tingkat: 'sulit',
      tanya: 'Meja yang sama diukur Pak Guru: 12 jengkal. Diukur Dina: 18 jengkal. Kenapa hasilnya berbeda?',
      benar: 'Jengkal Dina lebih pendek',
      salah: [
        ['Jengkal Dina lebih panjang', 'Kalau jengkalnya lebih panjang, justru lebih sedikit jengkal yang dibutuhkan.'],
        ['Mejanya bertambah panjang', 'Mejanya sama, tidak berubah.'],
        ['Dina pasti salah menghitung', 'Dina bisa saja benar. Satuannya yang berbeda.'],
      ],
      petunjuk: ['Mejanya sama. Yang berbeda adalah alat ukurnya.', 'Satuan yang lebih kecil perlu disusun lebih banyak.'],
      bahas: 'Jengkal Dina lebih pendek, jadi perlu lebih banyak jengkal untuk meja yang sama.',
    }),
    pg({
      tingkat: 'sulit',
      tanya: 'Sebuah buku panjangnya 4 pensil, atau sama dengan 8 klip kertas. Mana yang lebih pendek?',
      benar: 'satu klip',
      salah: [
        ['satu pensil', 'Pensil hanya perlu 4 untuk menutup buku. Berarti tiap pensil lebih panjang.'],
        ['sama panjang', 'Kalau sama panjang, banyaknya juga sama.'],
      ],
      petunjuk: ['Buku yang sama perlu lebih banyak klip daripada pensil.', 'Benda yang perlu disusun lebih banyak adalah benda yang lebih pendek.'],
      bahas: 'Perlu 8 klip tetapi hanya 4 pensil. Jadi satu klip lebih pendek daripada satu pensil.',
    }),
  ],
}

export default bank
