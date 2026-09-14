/* ============================================================
   KONSEP — Kenapa 4 × 6 sama dengan 6 × 4?
   Kelas 3 · Bilangan

   Gagasan: perkalian punya BENTUK. Susunan 4 baris berisi 6
   dan susunan 6 baris berisi 4 adalah bangun yang sama, hanya
   diputar seperempat putaran. Memutar tidak menambah maupun
   membuang satu kotak pun — jadi hasilnya wajib sama.

   Sekaligus menanam benih untuk seluruh rumus luas: a × b
   adalah luas persegi panjang berukuran a dan b.
   ============================================================ */

import { Svg, Tag, Dimensi } from '../components/Stage'
import { fase, seg, easing } from '../lib/anim'
import { clamp, fmt } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

const W = 660
const H = 430

const skala = (a: number, b: number) => Math.min(40, 290 / Math.max(a, b))

/** Nilai baris (a) dan isi tiap baris (b) pada animasi bongkar — dipakai gambar DAN teks langkah. */
function ukuran(p: Record<string, number>) {
  return {
    a: clamp(Math.round(p.a ?? 4), 1, 10),
    b: clamp(Math.round(p.b ?? 6), 1, 10),
  }
}

/** Kisi a baris × b kolom, digambar sebagai kotak satuan. */
function Kisi({
  a,
  b,
  u,
  x,
  y,
  renggang = 0,
  warna = 'var(--m-a)',
  nyalaBaris = -1,
  nyalaKolom = -1,
}: {
  a: number
  b: number
  u: number
  x: number
  y: number
  /** 0 = rapat (kotak), 1 = renggang (titik-titik terpisah). */
  renggang?: number
  warna?: string
  nyalaBaris?: number
  nyalaKolom?: number
}) {
  const sela = renggang * u * 0.28
  const kotak = []
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      const nyala = i === nyalaBaris || j === nyalaKolom
      kotak.push(
        <rect
          key={`${i}-${j}`}
          x={x + j * (u + sela) + sela / 2}
          y={y + i * (u + sela) + sela / 2}
          width={u - sela}
          height={u - sela}
          rx={renggang * (u / 2.2)}
          fill={warna}
          fillOpacity={nyala ? 0.72 : 0.4}
          stroke={warna}
          strokeWidth={1.4}
        />,
      )
    }
  }
  return <g>{kotak}</g>
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const { a, b } = ukuran(p) // a baris, b kolom
  const u = skala(a, b)

  const rapat = step === 1 ? 1 - seg(t, 0.15, 0.9) : step >= 1 ? 0 : 1
  const putar = step >= 2 ? (step === 2 ? 90 * easing.inOutCubic(seg(t, 0.1, 0.95)) : 90) : 0
  const bacaBaru = fase(step, t, 3)
  const selesai = step >= 5

  // Ukuran kisi sebelum diputar.
  const lebar = b * u
  const tinggi = a * u
  const cx = W / 2
  const cy = 200
  const x0 = cx - lebar / 2
  const y0 = cy - tinggi / 2

  const nyalaA = sorot === 'a'
  const nyalaB = sorot === 'b'

  // Baris yang sedang dihitung pada langkah 0.
  const barisAktif = step === 0 ? Math.min(a - 1, Math.floor(t * a * 1.15)) : -1

  return (
    <Svg w={W} h={H} maxH={440} label="Susunan kotak yang diputar seperempat putaran">
      <g transform={`rotate(${putar.toFixed(2)} ${cx} ${cy})`}>
        <Kisi
          a={a}
          b={b}
          u={u}
          x={x0}
          y={y0}
          renggang={rapat}
          nyalaBaris={barisAktif}
        />
      </g>

      {/* ukuran, ditulis sesuai orientasi yang terbaca sekarang */}
      {putar < 45 ? (
        <>
          <Dimensi
            x1={x0}
            y1={y0 - 20}
            x2={x0 + lebar}
            y2={y0 - 20}
            label={`${fmt(b)} kolom`}
            warna={nyalaB ? 'var(--m-b)' : 'var(--m-axis)'}
          />
          <Dimensi
            x1={x0 - 20}
            y1={y0}
            x2={x0 - 20}
            y2={y0 + tinggi}
            label={`${fmt(a)} baris`}
            warna={nyalaA ? 'var(--m-a)' : 'var(--m-axis)'}
          />
        </>
      ) : (
        <>
          <Dimensi
            x1={cx - tinggi / 2}
            y1={cy - lebar / 2 - 20}
            x2={cx + tinggi / 2}
            y2={cy - lebar / 2 - 20}
            label={`${fmt(a)} kolom`}
            warna={nyalaA ? 'var(--m-a)' : 'var(--m-axis)'}
          />
          <Dimensi
            x1={cx - tinggi / 2 - 20}
            y1={cy - lebar / 2}
            x2={cx - tinggi / 2 - 20}
            y2={cy + lebar / 2}
            label={`${fmt(b)} baris`}
            warna={nyalaB ? 'var(--m-b)' : 'var(--m-axis)'}
          />
        </>
      )}

      {/* keterangan tiap tahap */}
      {step === 0 && (
        <Tag x={W / 2} y={54} warna="var(--m-a)" size={17}>
          {`${Array.from({ length: Math.max(1, barisAktif + 1) }, () => fmt(b)).join(' + ')} = ${fmt(
            (barisAktif + 1) * b,
          )}`}
        </Tag>
      )}
      {step === 1 && (
        <Tag x={W / 2} y={54} warna="var(--ink-2)" size={16}>
          {a === 1 && b === 1
            ? 'titiknya diubah menjadi sebuah kotak'
            : a === b
              ? 'titik-titik dirapatkan menjadi persegi'
              : 'titik-titik dirapatkan menjadi persegi panjang'}
        </Tag>
      )}
      {step === 2 && (
        <Tag x={W / 2} y={54} warna="var(--m-hi)" size={16}>
          bangunnya diputar seperempat putaran
        </Tag>
      )}
      {bacaBaru > 0.4 && !selesai && (
        <Tag x={W / 2} y={54} warna="var(--m-b)" size={17}>
          {`${Array.from({ length: b }, () => fmt(a)).join(' + ')} = ${fmt(a * b)}`}
        </Tag>
      )}
      {selesai && (
        <Tag x={W / 2} y={54} warna="var(--m-ab)" size={19}>
          {`${fmt(a)} × ${fmt(b)} = ${fmt(b)} × ${fmt(a)} = ${fmt(a * b)}`}
        </Tag>
      )}
      {step === 4 && (
        <Tag x={W / 2} y={H - 22} warna="var(--ink-2)" size={16}>
          {`tidak ada satu kotak pun yang ditambah atau dibuang — tetap ${fmt(a * b)} kotak`}
        </Tag>
      )}
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const a = clamp(Math.round(p.a ?? 4), 1, 12)
  const b = clamp(Math.round(p.b ?? 6), 1, 12)
  const u = Math.min(30, 250 / Math.max(a, b))

  const lebar = b * u
  const tinggi = a * u
  const x0 = W / 2 - lebar - 40
  const y0 = 150 - tinggi / 2
  // Kisi kedua: kebalikannya.
  const x1 = W / 2 + 40
  const y1 = 150 - (b * u) / 2

  const nyalaA = sorot === 'a'
  const nyalaB = sorot === 'b'

  return (
    <Svg w={W} h={H} maxH={440} label="Dua susunan kotak yang saling merupakan kebalikan">
      <Kisi a={a} b={b} u={u} x={x0} y={y0} warna="var(--m-a)" />
      <Dimensi x1={x0} y1={y0 - 16} x2={x0 + lebar} y2={y0 - 16} label={fmt(b)} warna={nyalaB ? 'var(--m-b)' : 'var(--m-axis)'} />
      <Dimensi x1={x0 - 16} y1={y0} x2={x0 - 16} y2={y0 + tinggi} label={fmt(a)} warna={nyalaA ? 'var(--m-a)' : 'var(--m-axis)'} />
      <Tag x={x0 + lebar / 2} y={y0 + tinggi + 34} warna="var(--m-a)" size={17}>
        {`${fmt(a)} × ${fmt(b)} = ${fmt(a * b)}`}
      </Tag>

      <Kisi a={b} b={a} u={u} x={x1} y={y1} warna="var(--m-b)" />
      <Dimensi x1={x1} y1={y1 - 16} x2={x1 + a * u} y2={y1 - 16} label={fmt(a)} warna={nyalaA ? 'var(--m-a)' : 'var(--m-axis)'} />
      <Dimensi x1={x1 - 16} y1={y1} x2={x1 - 16} y2={y1 + b * u} label={fmt(b)} warna={nyalaB ? 'var(--m-b)' : 'var(--m-axis)'} />
      <Tag x={x1 + (a * u) / 2} y={y1 + b * u + 34} warna="var(--m-b)" size={17}>
        {`${fmt(b)} × ${fmt(a)} = ${fmt(a * b)}`}
      </Tag>

      <Tag x={W / 2} y={150} warna="var(--ink-3)" size={26} latar={null}>
        =
      </Tag>
      <Tag x={W / 2} y={H - 26} warna="var(--m-ab)" size={17}>
        {`luas persegi panjang = ${fmt(a * b)} kotak satuan`}
      </Tag>
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'perkalian-luas',
  topicId: 'sd3-konsep-perkalian-sebagai-penjumlahan-berulang',
  judul: 'Perkalian sebagai luas',
  pertanyaan: 'Kenapa 4 × 6 sama dengan 6 × 4?',
  tagline: 'Perkalian punya bentuk. Begitu kamu melihatnya, banyak hal jadi masuk akal.',
  kelas: 3,
  domain: 'bilangan',
  tags: ['perkalian', 'komutatif', 'luas', 'susunan'],

  tebak: {
    pertanyaan:
      'Ada 4 baris kursi, tiap baris berisi 6 kursi. Kalau susunannya diputar sehingga menjadi 6 baris berisi 4, jumlah kursinya...',
    pilihan: [
      {
        id: 'a',
        label: 'Bertambah',
        balasan:
          'Kalau memutar bisa menambah kursi, kita tidak perlu membeli kursi lagi selamanya. Sayangnya tidak begitu.',
      },
      {
        id: 'b',
        label: 'Berkurang',
        balasan: 'Memutar juga tidak membuang apa pun — semua kursi masih ada, hanya posisinya yang ikut berputar.',
      },
      {
        id: 'c',
        label: 'Tetap sama',
        benar: true,
        balasan:
          'Betul. Dan inilah seluruh alasan kenapa 4 × 6 = 6 × 4. Bukan hafalan, melainkan akibat dari memutar bangun yang sama.',
      },
    ],
    penutup: 'Sifat ini punya nama: komutatif. Tapi namanya jauh kurang penting daripada gambarnya.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      { key: 'a', label: 'Banyak baris', min: 1, max: 8, step: 1, awal: 4, bulat: true },
      { key: 'b', label: 'Isi tiap baris', min: 1, max: 8, step: 1, awal: 6, bulat: true },
    ],
    roles: { a: 'a', b: 'b', hasil: 'ab' },
    arti: {
      a: 'Banyaknya baris pada susunan awal — setelah diputar, menjadi isi tiap baris.',
      b: 'Banyaknya kotak di setiap baris pada susunan awal — setelah diputar, menjadi banyaknya baris.',
      hasil: 'Seluruh kotak — sekaligus luas persegi panjangnya.',
    },
    steps: [
      {
        id: 's0',
        judul: (p) => (ukuran(p).a === 1 ? 'Hitung isi barisnya' : 'Hitung baris demi baris'),
        narasi: (p) => {
          const { a, b } = ukuran(p)
          return a === 1
            ? `Hanya ada satu baris, jadi isinya cukup dihitung sekali: ${fmt(b)}. Perkalian adalah penjumlahan yang diulang — di sini ${fmt(b)} hanya diambil satu kali, sehingga 1 × ${fmt(b)} = ${fmt(b)}.`
            : `Jumlahkan isi baris pertama, lalu baris berikutnya, sampai baris ke-${fmt(a)}: ${fmt(b)} dijumlahkan sebanyak ${fmt(a)} kali, hasilnya ${fmt(a * b)}. Itulah arti pertama perkalian — penjumlahan yang diulang.`
        },
        rumus: '[a:banyak baris] × [b:isi tiap baris] = [hasil:banyak kotak]',
        durasi: 2400,
      },
      {
        id: 's1',
        judul: (p) => {
          const { a, b } = ukuran(p)
          return a === 1 && b === 1 ? 'Ubah titiknya menjadi kotak' : 'Rapatkan menjadi satu bangun'
        },
        narasi: (p) => {
          const { a, b } = ukuran(p)
          if (a === 1 && b === 1)
            return 'Titik tadi berubah menjadi sebuah kotak. Bentuknya persegi — persegi panjang yang semua sisinya sama panjang.'
          return a === b
            ? `Titik-titik tadi dirapatkan menjadi kotak-kotak yang bersentuhan. Karena banyak baris dan isi tiap baris sama-sama ${fmt(a)}, susunan itu berbentuk persegi — persegi panjang yang semua sisinya sama panjang.`
            : 'Titik-titik tadi dirapatkan menjadi kotak-kotak yang bersentuhan. Sekarang susunan itu berbentuk persegi panjang.'
        },
        durasi: 1800,
      },
      {
        id: 's2',
        judul: 'Putar seperempat putaran',
        narasi:
          'Bangunnya diputar. Perhatikan baik-baik: tidak ada kotak yang ditambahkan, dan tidak ada yang dibuang.',
        durasi: 2400,
      },
      {
        id: 's3',
        judul: (p) => {
          const { a, b } = ukuran(p)
          return a === b ? 'Terbacanya tetap sama' : 'Sekarang terbacanya berbeda'
        },
        narasi: (p) => {
          const { a, b } = ukuran(p)
          return a === b
            ? `Karena banyak baris dan isi tiap baris sama-sama ${fmt(a)}, setelah diputar susunan itu tetap terbaca ${fmt(a)} baris berisi ${fmt(a)}. Persegi memang tampak sama persis setelah diputar seperempat putaran.`
            : `Susunan yang sama kini terbaca terbalik: ${fmt(b)} baris, tiap baris berisi ${fmt(a)} — isi tiap baris yang lama menjadi banyak baris, dan banyak baris yang lama menjadi isi tiap baris. Cara membacanya berubah, bangunnya tidak.`
        },
        rumus: '[b:banyak baris baru] × [a:isi tiap baris baru] = [hasil:banyak kotak]',
        durasi: 2200,
      },
      {
        id: 's4',
        judul: 'Jumlah kotaknya tidak berubah',
        narasi: (p) => {
          const { a, b } = ukuran(p)
          return a === b
            ? `Mau kamu hitung lewat baris atau lewat kolom, yang kamu hitung tetap kotak yang sama: ${fmt(a * b)} kotak. Karena bangunnya persegi, kedua cara itu bahkan terbaca serupa, ${fmt(a)} × ${fmt(a)}.`
            : `Kamu menghitung kotak yang sama persis, hanya dari arah yang berbeda: ${fmt(a)} × ${fmt(b)} dan ${fmt(b)} × ${fmt(a)}. Jadi keduanya wajib berhenti di angka yang sama, ${fmt(a * b)} kotak.`
        },
        durasi: 1800,
      },
      {
        id: 's5',
        judul: 'Itulah sifat komutatif',
        narasi: (p) => {
          const { a, b } = ukuran(p)
          return a === b
            ? `Urutan mengalikan boleh kamu tukar; di sini kedua urutannya kebetulan sama, ${fmt(a)} × ${fmt(a)} = ${fmt(a * a)}. Ini sekaligus benih rumus-rumus luas: hasil kali dua panjang sisi adalah luas persegi panjang yang sisi-sisinya sepanjang itu.`
            : `${fmt(a)} × ${fmt(b)} dan ${fmt(b)} × ${fmt(a)} sama-sama ${fmt(a * b)}, jadi urutan mengalikan boleh kamu tukar. Ini sekaligus benih rumus-rumus luas: hasil kali dua panjang sisi adalah luas persegi panjang yang sisi-sisinya sepanjang itu.`
        },
        rumus: '[a:a] × [b:b] = [b:b] × [a:a]',
        durasi: 2200,
      },
    ],
  },

  eksperimen: {
    judul: 'Ubah baris dan kolomnya',
    ajakan:
      'Dua susunan ini selalu berisi kotak yang sama banyak. Coba juga buat baris dan kolomnya sama — bentuknya menjadi persegi.',
    params: [
      { key: 'a', label: 'Banyak baris', min: 1, max: 12, step: 1, awal: 4, bulat: true },
      { key: 'b', label: 'Isi tiap baris', min: 1, max: 12, step: 1, awal: 6, bulat: true },
    ],
    Visual: VisualEksperimen,
    temuan: (p) => {
      const a = clamp(Math.round(p.a ?? 4), 1, 12)
      const b = clamp(Math.round(p.b ?? 6), 1, 12)
      return (
        <p>
          <strong>
            {fmt(a)} × {fmt(b)} = {fmt(a * b)}
          </strong>{' '}
          kotak, dan susunan kebalikannya juga {fmt(a * b)} kotak.{' '}
          {a === b
            ? `Karena baris dan kolomnya sama, bangunnya berupa persegi — dan ${fmt(a)} × ${fmt(a)} = ${fmt(a * a)} disebut "${fmt(a)} kuadrat".`
            : `Coba buat baris dan kolomnya sama besar. Bangunnya akan berubah menjadi persegi.`}{' '}
          Perhatikan juga: menggandakan salah satu sisi menggandakan jumlah kotaknya, tetapi
          menggandakan keduanya sekaligus membuatnya empat kali lipat.
        </p>
      )
    },
  },

  penjelasan: {
    SD: (
      <>
        <p>
          Kalau kamu menyusun kotak menjadi persegi panjang, ada dua cara menghitungnya: per baris
          atau per kolom. Keduanya menghitung <strong>kotak yang sama</strong>, jadi hasilnya pasti
          sama.
        </p>
        <p>
          Itulah kenapa 4 × 6 dan 6 × 4 sama-sama 24. Bukan karena ada aturan yang harus dihafal,
          melainkan karena keduanya menggambarkan susunan yang sama, hanya dilihat dari arah berbeda.
        </p>
        <p>
          Gagasan ini akan terus kamu pakai: perkalian bisa dibayangkan sebagai{' '}
          <strong>luas</strong> persegi panjang. Untuk bilangan cacah, luas itu tepat sama dengan
          banyaknya kotak satuan yang menutupinya.
        </p>
      </>
    ),
    SMP: (
      <>
        <p>
          Model susunan (array) menjelaskan komutatif dengan satu kalimat: memutar bangun 90° adalah
          transformasi yang mempertahankan banyaknya unsur, sehingga menghitung baris-kali-kolom dan
          kolom-kali-baris harus memberi hasil sama.
        </p>
        <h4>Kenapa "penjumlahan berulang" tidak cukup</h4>
        <p>
          Arti "6 + 6 + 6 + 6" bekerja rapi selama pengalinya bilangan cacah, tetapi runtuh begitu
          pengalinya pecahan: apa artinya menjumlahkan sesuatu sebanyak ½ kali? Model{' '}
          <strong>luas</strong> tetap bertahan — ½ × ¾ adalah luas persegi panjang berukuran ½ dan
          ¾. Karena itu, model luas terus dipakai sampai ke aljabar dan integral.
        </p>
        <p>
          Model luas pun punya batas: panjang sisi tidak bisa negatif. Untuk perkalian bilangan
          negatif, misalnya (−2) × 3, gambar persegi panjang saja tidak cukup; kita memerlukan
          aturan tambahan (misalnya sifat distributif) atau gagasan luas yang bertanda.
        </p>
        <p>
          Model yang sama juga menjelaskan sifat distributif: a × (b + c) berarti memperlebar persegi
          panjang, sehingga luasnya terpecah menjadi a×b ditambah a×c.
        </p>
      </>
    ),
  },

  rumus: {
    src: '[a:a] × [b:b] = [b:b] × [a:a] = [hasil:luas persegi panjang]',
    roles: { a: 'a', b: 'b', hasil: 'ab' },
    arti: {
      a: 'Ukuran sisi pertama — banyaknya baris.',
      b: 'Ukuran sisi kedua — banyaknya kotak per baris.',
      hasil: 'Seluruh kotak yang menutupi persegi panjang itu.',
    },
  },

  soal: [
    (rnd) => {
      const a = 3 + Math.floor(rnd() * 7)
      const b = 3 + Math.floor(rnd() * 7)
      return {
        id: 'kali-1',
        tipe: 'angka',
        topicId: 'sd3-konsep-perkalian-sebagai-penjumlahan-berulang',
        kelas: 3,
        tingkat: 'mudah',
        konsep: 'perkalian-luas',
        pertanyaan: `Sebuah papan disusun dari kotak-kotak: ${a} baris, tiap baris berisi ${b} kotak. Berapa banyak kotak seluruhnya?`,
        jawaban: a * b,
        satuan: 'kotak',
        toleransi: 1e-9,
        hint: [
          'Kamu bisa menjumlahkan baris demi baris, atau langsung mengalikan.',
          `Menjumlahkan: ${b} sebanyak ${a} kali.`,
          `Mengalikan lebih cepat: ${a} × ${b}.`,
        ],
        pembahasan: `${a} × ${b} = ${a * b} kotak. Kalau papan itu diputar menjadi ${b} baris berisi ${a}, jumlahnya tetap ${a * b}.`,
      }
    },
    {
      id: 'kali-2',
      tipe: 'benar-salah',
      topicId: 'sd3-konsep-perkalian-sebagai-penjumlahan-berulang',
      kelas: 3,
      tingkat: 'mudah',
      konsep: 'perkalian-luas',
      pertanyaan: 'Susunan 3 baris berisi 8 kotak memiliki jumlah kotak yang sama dengan 8 baris berisi 3 kotak.',
      jawaban: true,
      diagnosa:
        'Coba bayangkan memutar papannya seperempat putaran. Hanya arahnya yang berubah — bangunnya tetap sama dan tidak ada kotak yang hilang.',
      hint: [
        'Apa yang berubah saat susunan diputar: jumlah kotaknya, atau hanya cara membacanya?',
        'Hitung keduanya: 3 × 8 dan 8 × 3.',
      ],
      pembahasan: 'Benar. 3 × 8 = 8 × 3 = 24. Keduanya menggambarkan persegi panjang yang sama.',
    },
    {
      id: 'kali-3',
      tipe: 'pilihan',
      topicId: 'sd3-konsep-perkalian-sebagai-penjumlahan-berulang',
      kelas: 4,
      tingkat: 'sedang',
      konsep: 'perkalian-luas',
      pertanyaan:
        'Sebuah lantai berbentuk persegi panjang berukuran 7 ubin × 5 ubin. Kalau sisi panjangnya digandakan menjadi 14 ubin, berapa ubin yang dibutuhkan?',
      pilihan: [
        { id: 'a', label: '70 ubin', benar: true },
        { id: 'b', label: '38 ubin', diagnosa: 'Ini keliling lantainya: (14 + 5) × 2. Ukurannya dijumlahkan, padahal banyak ubin didapat dengan mengalikan.' },
        { id: 'c', label: '140 ubin', diagnosa: 'Kedua sisinya ikut digandakan. Padahal yang digandakan hanya satu sisi.' },
        { id: 'd', label: '35 ubin', diagnosa: 'Ini jumlah ubin sebelum digandakan.' },
      ],
      hint: [
        'Hitung dulu jumlah ubin semula: 7 × 5.',
        'Kalau satu sisi digandakan, luasnya juga menjadi dua kali lipat.',
        '14 × 5, atau cukup 35 × 2.',
      ],
      pembahasan:
        '14 × 5 = 70 ubin. Menggandakan satu sisi menggandakan luas; menggandakan dua sisi sekaligus akan membuatnya empat kali lipat, yaitu 140.',
    },
    {
      id: 'kali-4',
      tipe: 'cocokkan',
      topicId: 'sd3-konsep-perkalian-sebagai-penjumlahan-berulang',
      kelas: 4,
      tingkat: 'sedang',
      konsep: 'perkalian-luas',
      pertanyaan: 'Pasangkan tiap susunan dengan jumlah kotaknya.',
      pasangan: [
        { kiri: '6 baris × 7 kotak', kanan: '42' },
        { kiri: '9 baris × 4 kotak', kanan: '36' },
        { kiri: '8 baris × 8 kotak', kanan: '64' },
        { kiri: '5 baris × 12 kotak', kanan: '60' },
      ],
      hint: [
        'Kerjakan yang paling kamu hafal lebih dulu, sisanya jadi lebih mudah.',
        'Susunan 8 × 8 berbentuk persegi.',
        'Untuk 5 × 12, kamu bisa memecahnya menjadi 5 × 10 ditambah 5 × 2.',
      ],
      pembahasan:
        '6 × 7 = 42, 9 × 4 = 36, 8 × 8 = 64, 5 × 12 = 60. Memecah 5 × 12 menjadi 5 × 10 + 5 × 2 adalah sifat distributif — pada gambar, itu berarti memotong persegi panjangnya menjadi dua bagian.',
    },
    (rnd) => {
      const s = 3 + Math.floor(rnd() * 8)
      return {
        id: 'kali-5',
        tipe: 'angka',
        topicId: 'sd3-konsep-perkalian-sebagai-penjumlahan-berulang',
        kelas: 4,
        tingkat: 'sulit',
        konsep: 'perkalian-luas',
        pertanyaan: `Sebuah susunan kotak berbentuk persegi berisi ${s * s} kotak. Berapa banyak baris yang dimilikinya?`,
        jawaban: s,
        satuan: 'baris',
        toleransi: 1e-9,
        hint: [
          'Persegi berarti banyaknya baris sama dengan banyaknya kotak per baris.',
          `Cari bilangan yang bila dikalikan dengan dirinya sendiri menghasilkan ${s * s}.`,
          `Coba mulai dari ${Math.max(2, s - 2)} × ${Math.max(2, s - 2)} lalu naik satu per satu.`,
        ],
        pembahasan: `Karena ${s} × ${s} = ${s * s}, susunan itu memiliki ${s} baris. Bilangan seperti ${s * s} disebut bilangan kuadrat karena bisa disusun menjadi persegi sempurna.`,
      }
    },
  ],

  lanjut: ['segitiga-setengah', 'nilai-tempat', 'kuadrat-jumlah'],
}

export default konsep
