/* ============================================================
   KONSEP — Kenapa 1+2+3+…+100 bisa dihitung dalam sekejap?
   Kelas 10 · Aljabar

   Gagasan pembuktian: susun 1+2+…+n sebagai tangga balok.
   Gandakan tangga itu, putar salinannya setengah putaran, lalu
   satukan. Keduanya PASTI membentuk persegi panjang n × (n+1)
   tanpa celah. Jadi dua kali jumlahnya sama dengan n(n+1),
   dan jumlahnya sendiri n(n+1)/2.
   ============================================================ */

import { Svg, Tag, Dimensi } from '../components/Stage'
import { fase, seg, easing } from '../lib/anim'
import { clamp, fmt } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

const W = 690
const H = 440

function tata(n: number) {
  const u = Math.min(30, 300 / (n + 1), 420 / n)
  const lebar = n * u
  const tinggi = (n + 1) * u
  const X0 = W / 2 - lebar / 2
  const Y0 = 92
  return { u, lebar, tinggi, X0, Y0, cx: X0 + lebar / 2, cy: Y0 + tinggi / 2 }
}

/** Tangga 1, 2, 3, …, n yang berdiri di dasar persegi panjang. */
function Tangga({
  n,
  g,
  warna,
  opacity = 1,
  sampai = n,
}: {
  n: number
  g: ReturnType<typeof tata>
  warna: string
  opacity?: number
  /** hanya gambar kolom sampai indeks ini (untuk animasi bertahap). */
  sampai?: number
}) {
  const kotak = []
  for (let j = 0; j < n; j++) {
    const o = clamp(sampai - j, 0, 1)
    if (o <= 0.01) continue
    for (let i = 0; i <= j; i++) {
      kotak.push(
        <rect
          key={`${j}-${i}`}
          x={g.X0 + j * g.u}
          y={g.Y0 + g.tinggi - (i + 1) * g.u}
          width={g.u - 1.2}
          height={g.u - 1.2}
          rx={2}
          fill={warna}
          fillOpacity={0.42 * o}
          stroke={warna}
          strokeWidth={1}
          strokeOpacity={o}
        />,
      )
    }
  }
  return <g opacity={opacity}>{kotak}</g>
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const n = clamp(Math.round(p.n ?? 6), 2, 12)
  const g = tata(n)
  const jumlah = (n * (n + 1)) / 2

  const bangun = step === 0 ? n * seg(t, 0.05, 0.95) : n
  const salinan = fase(step, t, 2)
  const putar = step >= 3 ? (step === 3 ? 180 * easing.inOutCubic(seg(t, 0.08, 0.95)) : 180) : 0
  const kotakPenuh = fase(step, t, 4)
  const selesai = step >= 5

  const nyalaN = sorot === 'n'
  const nyalaN1 = sorot === 'n1'
  const nyalaJumlah = sorot === 'S'

  const terhitung = Math.min(n, Math.floor(bangun))
  const totalSampai = (terhitung * (terhitung + 1)) / 2

  return (
    <Svg w={W} h={H} maxH={450} label="Tangga balok yang digandakan dan diputar menjadi persegi panjang">
      {/* bingkai persegi panjang tujuan */}
      {kotakPenuh > 0 && (
        <rect
          x={g.X0}
          y={g.Y0}
          width={g.lebar}
          height={g.tinggi}
          rx={4}
          fill="none"
          stroke="var(--m-hi)"
          strokeWidth={2.5}
          opacity={kotakPenuh}
        />
      )}

      <Tangga n={n} g={g} warna="var(--m-a)" sampai={bangun} />

      {salinan > 0.02 && (
        <g
          opacity={salinan}
          transform={`rotate(${putar.toFixed(2)} ${g.cx.toFixed(1)} ${g.cy.toFixed(1)})`}
        >
          <Tangga n={n} g={g} warna="var(--m-b)" />
        </g>
      )}

      {/* ukuran persegi panjang */}
      {kotakPenuh > 0.4 && (
        <>
          <Dimensi
            x1={g.X0}
            y1={g.Y0 + g.tinggi + 22}
            x2={g.X0 + g.lebar}
            y2={g.Y0 + g.tinggi + 22}
            label={`${fmt(n)}`}
            warna={nyalaN ? 'var(--m-hi)' : 'var(--m-a)'}
          />
          <Dimensi
            x1={g.X0 - 22}
            y1={g.Y0}
            x2={g.X0 - 22}
            y2={g.Y0 + g.tinggi}
            label={`${fmt(n + 1)}`}
            warna={nyalaN1 ? 'var(--m-hi)' : 'var(--m-b)'}
          />
        </>
      )}

      {/* keterangan */}
      {step === 0 && (
        <Tag x={W / 2} y={52} warna="var(--m-a)" size={17}>
          {terhitung > 0
            ? `${Array.from({ length: Math.min(terhitung, 6) }, (_, i) => fmt(i + 1)).join(' + ')}${
                terhitung > 6 ? ' + …' : ''
              } = ${fmt(totalSampai)}`
            : 'jumlahkan satu per satu'}
        </Tag>
      )}
      {step === 1 && (
        <Tag x={W / 2} y={52} warna="var(--ink-2)" size={16}>
          untuk n = 100, cara ini butuh 99 kali penjumlahan
        </Tag>
      )}
      {step === 2 && (
        <Tag x={W / 2} y={52} warna="var(--m-b)" size={16}>
          gandakan tangganya
        </Tag>
      )}
      {step === 3 && (
        <Tag x={W / 2} y={52} warna="var(--m-hi)" size={16}>
          putar salinannya setengah putaran
        </Tag>
      )}
      {step === 4 && (
        <Tag x={W / 2} y={52} warna="var(--m-hi)" size={16}>
          {`pas menjadi persegi panjang ${fmt(n)} × ${fmt(n + 1)} = ${fmt(n * (n + 1))} kotak`}
        </Tag>
      )}
      {selesai && (
        <Tag
          x={W / 2}
          y={52}
          warna={nyalaJumlah ? 'var(--m-hi)' : 'var(--m-ab)'}
          size={18}
        >
          {`satu tangga = ${fmt(n * (n + 1))} ÷ 2 = ${fmt(jumlah)}`}
        </Tag>
      )}
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const n = clamp(Math.round(p.n ?? 8), 2, 14)
  const g = tata(n)
  const jumlah = (n * (n + 1)) / 2

  return (
    <Svg w={W} h={H} maxH={450} label="Dua tangga balok yang bersama-sama membentuk persegi panjang">
      <rect
        x={g.X0}
        y={g.Y0}
        width={g.lebar}
        height={g.tinggi}
        rx={4}
        fill="none"
        stroke="var(--m-hi)"
        strokeWidth={2.5}
      />
      <Tangga n={n} g={g} warna="var(--m-a)" />
      <g transform={`rotate(180 ${g.cx.toFixed(1)} ${g.cy.toFixed(1)})`}>
        <Tangga n={n} g={g} warna="var(--m-b)" />
      </g>
      <Dimensi
        x1={g.X0}
        y1={g.Y0 + g.tinggi + 22}
        x2={g.X0 + g.lebar}
        y2={g.Y0 + g.tinggi + 22}
        label={fmt(n)}
        warna={sorot === 'n' ? 'var(--m-hi)' : 'var(--m-a)'}
      />
      <Dimensi
        x1={g.X0 - 22}
        y1={g.Y0}
        x2={g.X0 - 22}
        y2={g.Y0 + g.tinggi}
        label={fmt(n + 1)}
        warna={sorot === 'n1' ? 'var(--m-hi)' : 'var(--m-b)'}
      />
      <Tag x={W / 2} y={52} warna="var(--m-ab)" size={19}>
        {`1 + 2 + … + ${fmt(n)} = ${fmt(n)} × ${fmt(n + 1)} ÷ 2 = ${fmt(jumlah)}`}
      </Tag>
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'deret-gauss',
  topicId: 'sma10-barisan-dan-deret-aritmetika',
  judul: 'Jumlah deret aritmetika',
  pertanyaan: 'Kenapa 1+2+3+…+100 bisa dihitung dalam sekejap?',
  tagline: 'Trik anak sembilan tahun yang mengubah 99 penjumlahan menjadi satu perkalian.',
  kelas: 10,
  domain: 'aljabar',
  tags: ['deret', 'aritmetika', 'gauss', 'jumlah'],

  tebak: {
    pertanyaan: 'Berapa hasil 1 + 2 + 3 + … + 100?',
    pilihan: [
      {
        id: 'a',
        label: '5.050',
        benar: true,
        balasan:
          'Betul. Konon Gauss kecil menemukannya dalam hitungan detik, sementara teman sekelasnya menjumlahkan satu per satu.',
      },
      {
        id: 'b',
        label: '10.000',
        balasan:
          'Angka 10.000 adalah 100 × 100 — itu kalau semua sukunya bernilai 100. Padahal rata-ratanya jauh lebih kecil.',
      },
      {
        id: 'c',
        label: '5.000',
        balasan:
          'Sangat dekat. Sebentar lagi kamu bisa melihat dari mana kelebihan 50 itu berasal.',
      },
    ],
    penutup:
      'Yang menarik bukan jawabannya, melainkan bahwa jawabannya bisa diperoleh tanpa menjumlahkan sama sekali.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [{ key: 'n', label: 'Sampai bilangan', min: 2, max: 12, step: 1, awal: 6, bulat: true }],
    roles: { n: 'a', n1: 'b', S: 'ab' },
    arti: {
      n: 'Bilangan terakhir yang dijumlahkan — sekaligus lebar persegi panjangnya.',
      n1: 'Tinggi persegi panjang, yaitu n + 1. Angka ini muncul karena tangga dan salinannya bertumpuk satu tingkat.',
      S: 'Jumlah seluruh bilangan — separuh dari luas persegi panjang.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Susun sebagai tangga',
        narasi:
          'Bilangan 1, 2, 3, … digambar sebagai kolom balok. Jumlah seluruh bilangan sama dengan banyaknya balok pada tangga ini.',
        rumus: '[S:S] = 1 + 2 + 3 + … + [n:n]',
        durasi: 2600,
      },
      {
        id: 's1',
        judul: 'Menjumlahkan satu per satu itu lambat',
        narasi:
          'Untuk n = 100, kamu perlu 99 kali penjumlahan dan sangat mudah keliru. Harus ada cara yang lebih baik.',
        durasi: 2000,
      },
      {
        id: 's2',
        judul: 'Gandakan tangganya',
        narasi:
          'Buat salinan tangga yang sama persis. Sekarang jumlah baloknya menjadi dua kali lipat, yaitu 2S.',
        durasi: 2000,
      },
      {
        id: 's3',
        judul: 'Putar salinannya setengah putaran',
        narasi:
          'Salinan diputar 180 derajat. Perputaran tidak menambah maupun mengurangi balok — hanya memindahkannya.',
        durasi: 2600,
      },
      {
        id: 's4',
        judul: 'Keduanya membentuk persegi panjang',
        narasi:
          'Tangga yang naik dan tangga yang turun saling mengisi tanpa celah. Setiap kolom kini setinggi n + 1 balok, dan ada n kolom.',
        rumus: '2[S:S] = [n:n] × [n1:(n+1)]',
        durasi: 2600,
      },
      {
        id: 's5',
        judul: 'Jadi satu tangga adalah separuhnya',
        narasi:
          'Karena dua tangga bernilai n(n+1), satu tangga bernilai separuhnya. Tidak perlu menjumlahkan apa pun.',
        rumus: '[S:S] = [n:n] × [n1:(n+1)] ÷ 2',
        durasi: 2400,
      },
      {
        id: 's6',
        judul: 'Coba untuk n = 100',
        narasi:
          'Cukup satu perkalian dan satu pembagian: 100 × 101 ÷ 2 = 5.050. Sembilan puluh sembilan penjumlahan menguap begitu saja.',
        rumus: '100 × 101 ÷ 2 = 5.050',
        durasi: 2400,
      },
    ],
  },

  eksperimen: {
    judul: 'Ubah sampai bilangan berapa',
    ajakan:
      'Warna ungu adalah tangga aslinya, warna jingga adalah salinan yang sudah diputar. Keduanya selalu pas mengisi persegi panjang.',
    params: [{ key: 'n', label: 'Sampai bilangan', min: 2, max: 14, step: 1, awal: 8, bulat: true }],
    Visual: VisualEksperimen,
    temuan: (p) => {
      const n = clamp(Math.round(p.n ?? 8), 2, 14)
      const S = (n * (n + 1)) / 2
      return (
        <p>
          <strong>
            1 + 2 + … + {fmt(n)} = {fmt(S)}
          </strong>
          . Perhatikan persegi panjangnya selalu berukuran {fmt(n)} × {fmt(n + 1)} — satu sisinya
          selalu satu lebih besar. Coba pasangkan suku-sukunya dari kedua ujung: 1 + {fmt(n)},
          2 + {fmt(n - 1)}, dan seterusnya. Setiap pasangan berjumlah {fmt(n + 1)}, dan ada{' '}
          {fmt(n / 2)} pasangan. Itu cara lain membaca gambar yang sama.
        </p>
      )
    },
  },

  penjelasan: {
    SMA: (
      <>
        <p>
          Ada dua cara membaca gambar tadi, dan keduanya memberi rumus yang sama.
        </p>
        <h4>Cara pertama: gandakan dan putar</h4>
        <p>
          Dua tangga yang saling terbalik mengisi persegi panjang n × (n + 1). Jadi 2S = n(n + 1),
          sehingga S = n(n + 1)/2.
        </p>
        <h4>Cara kedua: pasangkan dari kedua ujung</h4>
        <p>
          Tuliskan deretnya dua kali, sekali maju dan sekali mundur:
        </p>
        <p style={{ textAlign: 'center' }}>
          S = 1 + 2 + … + (n−1) + n<br />
          S = n + (n−1) + … + 2 + 1
        </p>
        <p>
          Jumlahkan kolom demi kolom: setiap kolom bernilai n + 1, dan ada n kolom. Jadi
          2S = n(n + 1). Cara ini persis sama dengan menggandakan dan memutar, hanya ditulis dengan
          lambang.
        </p>
        <h4>Bentuk umum deret aritmetika</h4>
        <p>
          Untuk deret aritmetika mana pun dengan suku pertama a dan suku terakhir U<sub>n</sub>,
          alasan yang sama memberi
        </p>
        <p style={{ textAlign: 'center' }}>
          S<sub>n</sub> = n(a + U<sub>n</sub>)/2 = n[2a + (n−1)b]/2
        </p>
        <p>
          Bentuk pertama paling mudah diingat karena bisa dibaca sebagai{' '}
          <strong>banyaknya suku dikali rata-rata suku pertama dan terakhir</strong>. Untuk
          1 + 2 + … + 100: rata-rata 1 dan 100 adalah 50,5, dikali 100 suku menjadi 5.050.
        </p>
        <h4>Kenapa hasilnya selalu bulat</h4>
        <p>
          Di antara n dan n + 1 pasti ada satu yang genap, sehingga n(n + 1) selalu habis dibagi 2.
          Bilangan berbentuk n(n+1)/2 disebut bilangan segitiga, dan gambar tangga tadi menjelaskan
          namanya.
        </p>
      </>
    ),
    SMP: (
      <>
        <p>
          Bayangkan menyusun balok: 1 balok, lalu 2 balok, lalu 3 balok, dan seterusnya sampai n.
          Bentuknya seperti tangga.
        </p>
        <p>
          Sekarang buat tangga kedua yang persis sama, putar terbalik, lalu tempelkan. Tangga yang
          naik dan tangga yang turun akan mengisi satu sama lain sampai membentuk{' '}
          <strong>persegi panjang</strong> yang rapi.
        </p>
        <p>
          Persegi panjang itu lebarnya n dan tingginya n + 1, jadi baloknya n × (n + 1). Karena tadi
          kita memakai dua tangga, satu tangga berisi separuhnya.
        </p>
      </>
    ),
  },

  rumus: {
    src: '[S:S] = [n:n] × [n1:(n+1)] ÷ 2',
    roles: { S: 'ab', n: 'a', n1: 'b' },
    arti: {
      S: 'Jumlah 1 + 2 + 3 + … + n.',
      n: 'Bilangan terakhir yang dijumlahkan — lebar persegi panjangnya.',
      n1: 'Tinggi persegi panjang. Selalu satu lebih besar daripada n, karena dua tangga bertumpuk menyisakan satu tingkat tambahan.',
    },
  },

  soal: [
    (rnd) => {
      const n = [20, 30, 40, 50, 60][Math.floor(rnd() * 5)]
      return {
        id: 'gau-1',
        tipe: 'angka',
        topicId: 'sma10-barisan-dan-deret-aritmetika',
        kelas: 10,
        tingkat: 'mudah',
        konsep: 'deret-gauss',
        pertanyaan: `Hitunglah 1 + 2 + 3 + … + ${n}.`,
        jawaban: (n * (n + 1)) / 2,
        toleransi: 1e-9,
        hint: [
          'Jangan menjumlahkan satu per satu. Gunakan rumus dari gambar tangga tadi.',
          `S = n(n+1)/2 dengan n = ${n}.`,
          `Hitung ${n} × ${n + 1} lebih dulu, baru bagi 2.`,
        ],
        pembahasan: `S = ${n} × ${n + 1} ÷ 2 = ${n * (n + 1)} ÷ 2 = ${(n * (n + 1)) / 2}.`,
      }
    },
    {
      id: 'gau-2',
      tipe: 'pilihan',
      topicId: 'sma10-barisan-dan-deret-aritmetika',
      kelas: 10,
      tingkat: 'sedang',
      konsep: 'deret-gauss',
      pertanyaan: 'Berapa jumlah 50 bilangan asli ganjil pertama, yaitu 1 + 3 + 5 + … + 99?',
      pilihan: [
        { id: 'a', label: '2.500', benar: true },
        {
          id: 'b',
          label: '5.050',
          diagnosa: 'Itu jumlah 1 sampai 100 (semua bilangan), bukan hanya yang ganjil.',
        },
        {
          id: 'c',
          label: '4.950',
          diagnosa: 'Sepertinya rumusnya dipakai dengan n = 99, padahal banyaknya suku hanya 50.',
        },
        { id: 'd', label: '2.550', diagnosa: 'Nilai tengahnya keliru: rata-rata 1 dan 99 adalah 50, bukan 51.' },
      ],
      hint: [
        'Ada berapa suku? Bilangan ganjil dari 1 sampai 99 jumlahnya 50 suku.',
        'Pakai rumus: banyaknya suku dikali rata-rata suku pertama dan terakhir.',
        'Rata-rata 1 dan 99 adalah 50, lalu dikalikan 50 suku.',
      ],
      pembahasan:
        'S = 50 × (1 + 99)/2 = 50 × 50 = 2.500. Menarik: jumlah n bilangan ganjil pertama selalu n² — persis gagasan gnomon pada konsep parabola.',
    },
    {
      id: 'gau-3',
      tipe: 'urutkan',
      topicId: 'sma10-barisan-dan-deret-aritmetika',
      kelas: 10,
      tingkat: 'sedang',
      konsep: 'deret-gauss',
      pertanyaan: 'Susun kembali alur trik Gauss.',
      langkah: [
        'Susun 1 + 2 + … + n sebagai tangga balok',
        'Buat salinan tangga yang sama persis',
        'Putar salinannya setengah putaran',
        'Kedua tangga membentuk persegi panjang n × (n+1)',
        'Karena memakai dua tangga, jumlahnya n(n+1)/2',
      ],
      hint: [
        'Langkah pertama mengubah bilangan menjadi bentuk yang bisa dilihat.',
        'Pembagian dengan 2 selalu di akhir, karena tadi digunakan dua tangga.',
      ],
      pembahasan:
        'Pola berpikirnya sama dengan pembuktian luas segitiga: gandakan, putar, bentuk bangun yang mudah, lalu ambil separuhnya.',
    },
    (rnd) => {
      const a = 3 + Math.floor(rnd() * 8)
      const b = 2 + Math.floor(rnd() * 6)
      const n = 8 + Math.floor(rnd() * 13)
      const Un = a + (n - 1) * b
      return {
        id: 'gau-4',
        tipe: 'angka',
        topicId: 'sma10-barisan-dan-deret-aritmetika',
        kelas: 10,
        tingkat: 'sulit',
        konsep: 'deret-gauss',
        pertanyaan: `Sebuah deret aritmetika memiliki suku pertama ${a} dan beda ${b}. Berapa jumlah ${n} suku pertamanya?`,
        jawaban: (n * (a + Un)) / 2,
        toleransi: 1e-9,
        hint: [
          'Cari dulu suku terakhirnya dengan Uₙ = a + (n−1)b.',
          `U${n} = ${a} + ${n - 1} × ${b} = ${Un}.`,
          `Lalu Sₙ = n × (a + Uₙ)/2 = ${n} × (${a} + ${Un})/2.`,
        ],
        pembahasan: `U${n} = ${Un}, sehingga S${n} = ${n} × (${a} + ${Un}) ÷ 2 = ${(n * (a + Un)) / 2}. Rumus ini adalah "banyaknya suku dikali rata-rata suku pertama dan terakhir".`,
      }
    },
    {
      id: 'gau-5',
      tipe: 'benar-salah',
      topicId: 'sma10-barisan-dan-deret-aritmetika',
      kelas: 10,
      tingkat: 'sulit',
      konsep: 'deret-gauss',
      pertanyaan: 'Hasil n(n+1)/2 bisa saja berupa pecahan, karena ada pembagian dengan 2.',
      jawaban: false,
      diagnosa:
        'Di antara dua bilangan berurutan n dan n+1, salah satunya pasti genap. Jadi hasil kalinya selalu habis dibagi 2.',
      hint: [
        'Coba beberapa nilai n dan periksa hasilnya.',
        'Perhatikan sifat n dan n+1: bisakah keduanya sama-sama ganjil?',
        'Salah satu di antara dua bilangan berurutan pasti genap.',
      ],
      pembahasan:
        'Salah. Karena n dan n+1 berurutan, salah satunya pasti genap, sehingga n(n+1) selalu habis dibagi 2. Hasilnya selalu bilangan bulat — dikenal sebagai bilangan segitiga.',
    },
  ],

  lanjut: ['perkalian-luas', 'segitiga-setengah', 'eksponen-logaritma'],
}

export default konsep
