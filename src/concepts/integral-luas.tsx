/* ============================================================
   KONSEP — Kenapa integral bisa menghitung luas daerah melengkung?
   Kelas 12 · Kalkulus

   Gagasan: kita hanya tahu menghitung luas persegi panjang.
   Maka daerah melengkung diisi dengan persegi panjang, lalu
   lebarnya diperkecil terus-menerus. Jumlah luasnya tidak
   melompat ke mana-mana — ia menuju satu angka tertentu.

   Untuk y = x² pada [0, b], jumlah Riemann kanan bernilai persis
   b³(n+1)(2n+1) / (6n²), yang menuju b³/3 ketika n membesar.
   Angka b³/3 itulah yang ditulis sebagai integral.
   ============================================================ */

import { Svg, Tag } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

const W = 690
const H = 440

const GX0 = 80
const GX1 = 470
const GY0 = 66
const GY1 = 380

/** Jumlah Riemann dengan titik ujung kanan untuk f(x) = x² pada [0, b]. */
const jumlahRiemann = (b: number, n: number) => (b ** 3 * (n + 1) * (2 * n + 1)) / (6 * n * n)

function Panel({ baris }: { baris: { teks: string; warna?: string; besar?: boolean }[] }) {
  return (
    <g>
      <rect x={506} y={92} width={168} height={40 + baris.length * 34} rx={14} fill="var(--surface-2)" />
      {baris.map((b, i) => (
        <text
          key={i}
          x={590}
          y={124 + i * 34}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={b.besar ? 18 : 14.5}
          fontWeight={b.besar ? 800 : 600}
          fill={b.warna ?? 'var(--ink-2)'}
          fontFamily="var(--font-math)"
        >
          {b.teks}
        </text>
      ))}
    </g>
  )
}

function Daerah({
  b,
  n,
  tampilPersegi,
  nyalaLebar,
  nyalaTinggi,
}: {
  b: number
  n: number
  tampilPersegi: number
  nyalaLebar: boolean
  nyalaTinggi: boolean
}) {
  const xmax = b * 1.12
  const ymax = Math.max(1, b * b) * 1.12
  const kx = (x: number) => GX0 + (x / xmax) * (GX1 - GX0)
  const ky = (y: number) => GY1 - (y / ymax) * (GY1 - GY0)

  // Kurva y = x²
  const d: string[] = []
  for (let i = 0; i <= 100; i++) {
    const x = (xmax * i) / 100
    d.push(`${i === 0 ? 'M' : 'L'} ${kx(x).toFixed(1)} ${ky(x * x).toFixed(1)}`)
  }

  const lebar = b / n
  const tampil = Math.round(n * clamp(tampilPersegi, 0, 1))

  return (
    <g>
      {/* daerah sejati di bawah kurva */}
      <path
        d={`M ${kx(0)} ${ky(0)} ${Array.from({ length: 61 }, (_, i) => {
          const x = (b * i) / 60
          return `L ${kx(x).toFixed(1)} ${ky(x * x).toFixed(1)}`
        }).join(' ')} L ${kx(b)} ${ky(0)} Z`}
        fill="var(--m-a)"
        fillOpacity={0.14}
      />

      {/* persegi panjang Riemann */}
      {Array.from({ length: tampil }, (_, k) => {
        const xk = (k + 1) * lebar
        const tinggi = xk * xk
        return (
          <rect
            key={k}
            x={kx(k * lebar)}
            y={ky(tinggi)}
            width={Math.max(0.6, kx(lebar) - kx(0))}
            height={ky(0) - ky(tinggi)}
            fill="var(--m-b)"
            fillOpacity={0.34}
            stroke="var(--m-b)"
            strokeWidth={n > 60 ? 0.3 : n > 24 ? 0.7 : 1.4}
          />
        )
      })}

      {/* penanda lebar dan tinggi pada satu persegi panjang */}
      {n <= 24 && tampil > 0 && (
        <g>
          <line
            x1={kx((tampil - 1) * lebar)}
            y1={ky(0) + 12}
            x2={kx(tampil * lebar)}
            y2={ky(0) + 12}
            stroke={nyalaLebar ? 'var(--m-hi)' : 'var(--m-b)'}
            strokeWidth={nyalaLebar ? 3.4 : 2}
          />
          <Tag
            x={kx((tampil - 0.5) * lebar)}
            y={ky(0) + 30}
            warna={nyalaLebar ? 'var(--m-hi)' : 'var(--m-b)'}
            size={13}
          >
            {`lebar ${fmt(lebar, 3)}`}
          </Tag>
          <line
            x1={kx(tampil * lebar) + 6}
            y1={ky(0)}
            x2={kx(tampil * lebar) + 6}
            y2={ky((tampil * lebar) ** 2)}
            stroke={nyalaTinggi ? 'var(--m-hi)' : 'var(--m-ab)'}
            strokeWidth={nyalaTinggi ? 3.4 : 2}
          />
        </g>
      )}

      {/* sumbu dan kurva */}
      <line x1={GX0} y1={ky(0)} x2={GX1} y2={ky(0)} stroke="var(--m-axis)" strokeWidth={1.8} />
      <line x1={kx(0)} y1={GY0} x2={kx(0)} y2={GY1} stroke="var(--m-axis)" strokeWidth={1.8} />
      <path d={d.join(' ')} fill="none" stroke="var(--m-a)" strokeWidth={3} strokeLinejoin="round" />
      <line
        x1={kx(b)}
        y1={ky(0)}
        x2={kx(b)}
        y2={ky(b * b)}
        stroke="var(--ink-3)"
        strokeWidth={1.6}
        strokeDasharray="5 5"
      />
      <Tag x={kx(b)} y={ky(0) + 30} warna="var(--ink-2)" size={13}>
        {`x = ${fmt(b, 2)}`}
      </Tag>
      <Tag x={kx(xmax * 0.62)} y={ky(xmax * 0.62 * xmax * 0.62) - 20} warna="var(--m-a)" size={14}>
        y = x²
      </Tag>
    </g>
  )
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

const N_LANGKAH = [0, 4, 4, 16, 64, 200, 200]

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const b = clamp(p.b ?? 1, 0.5, 3)

  const nDasar = N_LANGKAH[Math.min(step, N_LANGKAH.length - 1)]
  // Pada langkah 3 jumlah persegi panjangnya bertambah mulus.
  const n =
    step === 3
      ? Math.max(4, Math.round(4 + 12 * seg(t, 0.1, 0.95)))
      : step === 4
        ? Math.max(16, Math.round(16 + 48 * seg(t, 0.1, 0.95)))
        : nDasar

  const tampilPersegi = step === 1 ? seg(t, 0.1, 0.95) : step >= 1 ? 1 : 0
  const eksak = fase(step, t, 5)

  const S = n > 0 ? jumlahRiemann(b, n) : 0
  const tepat = b ** 3 / 3

  const nyalaLebar = sorot === 'dx'
  const nyalaTinggi = sorot === 'f'

  const baris =
    n === 0
      ? [{ teks: 'luas = ?', warna: 'var(--ink-2)', besar: true }]
      : [
          { teks: `n = ${fmt(n)}` },
          { teks: `jumlah = ${fmt(S, 5)}`, warna: 'var(--m-b)', besar: true },
          ...(eksak > 0.4
            ? [
                { teks: `b³/3 = ${fmt(tepat, 5)}`, warna: 'var(--m-hi)', besar: true },
                { teks: `selisih ${fmt(S - tepat, 5)}`, warna: 'var(--ink-2)' },
              ]
            : []),
        ]

  return (
    <Svg w={W} h={H} maxH={450} label="Daerah di bawah kurva yang diisi persegi panjang">
      <Daerah
        b={b}
        n={Math.max(1, n)}
        tampilPersegi={n === 0 ? 0 : tampilPersegi}
        nyalaLebar={nyalaLebar}
        nyalaTinggi={nyalaTinggi}
      />
      <Panel baris={baris} />

      {step === 0 && (
        <Tag x={(GX0 + GX1) / 2} y={38} warna="var(--ink-2)" size={16}>
          sisi atasnya melengkung — tidak ada rumus siap pakai
        </Tag>
      )}
      {step === 1 && (
        <Tag x={(GX0 + GX1) / 2} y={38} warna="var(--m-b)" size={16}>
          isi dengan persegi panjang yang luasnya kita tahu
        </Tag>
      )}
      {step === 2 && (
        <Tag x={(GX0 + GX1) / 2} y={38} warna="var(--m-b)" size={16}>
          {`jumlah ${fmt(n)} persegi panjang = ${fmt(S, 4)}`}
        </Tag>
      )}
      {(step === 3 || step === 4) && (
        <Tag x={(GX0 + GX1) / 2} y={38} warna="var(--m-hi)" size={16}>
          perkecil lebarnya, perbanyak jumlahnya
        </Tag>
      )}
      {step >= 5 && (
        <Tag x={(GX0 + GX1) / 2} y={38} warna="var(--m-hi)" size={16}>
          {`angkanya menuju ${fmt(tepat, 4)}`}
        </Tag>
      )}
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const b = clamp(p.b ?? 1, 0.5, 3)
  const n = clamp(Math.round(p.n ?? 8), 1, 200)
  const S = jumlahRiemann(b, n)
  const tepat = b ** 3 / 3

  return (
    <Svg w={W} h={H} maxH={450} label="Daerah di bawah kurva dengan jumlah persegi panjang yang bisa diubah">
      <Daerah
        b={b}
        n={n}
        tampilPersegi={1}
        nyalaLebar={sorot === 'dx'}
        nyalaTinggi={sorot === 'f'}
      />
      <Panel
        baris={[
          { teks: `n = ${fmt(n)}` },
          { teks: `lebar = ${fmt(b / n, 4)}`, warna: 'var(--m-b)' },
          { teks: `jumlah = ${fmt(S, 5)}`, warna: 'var(--m-b)', besar: true },
          { teks: `b³/3 = ${fmt(tepat, 5)}`, warna: 'var(--m-hi)', besar: true },
          { teks: `selisih ${fmt(S - tepat, 5)}` },
        ]}
      />
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'integral-luas',
  topicId: 'sma12-integral',
  judul: 'Integral',
  pertanyaan: 'Kenapa integral bisa menghitung luas daerah melengkung?',
  tagline: 'Isi daerahnya dengan persegi panjang. Perkecil lebarnya. Perhatikan ke mana angkanya menuju.',
  kelas: 12,
  domain: 'kalkulus',
  tags: ['integral', 'luas', 'jumlah riemann', 'limit'],

  tebak: {
    pertanyaan:
      'Daerah di bawah kurva y = x² dari x = 0 sampai x = 1 dibandingkan dengan persegi 1 × 1 yang menutupinya. Menurutmu luasnya kira-kira...',
    pilihan: [
      {
        id: 'a',
        label: 'Setengah persegi',
        balasan:
          'Setengah akan tepat kalau batas atasnya berupa garis lurus diagonal. Tapi kurva x² melengkung ke bawah dari garis itu, jadi luasnya lebih kecil lagi.',
      },
      {
        id: 'b',
        label: 'Sepertiga persegi',
        benar: true,
        balasan: 'Betul, tepat 1/3. Angka itu akan muncul sendiri dari perhitungan sebentar lagi.',
      },
      {
        id: 'c',
        label: 'Seperempat persegi',
        balasan:
          'Cukup dekat, tetapi masih terlalu kecil. Coba bandingkan dengan garis diagonal: daerah x² berada di bawahnya, namun tidak sekecil itu.',
      },
    ],
    penutup:
      'Yang menarik bukan angkanya, melainkan bagaimana angka setepat itu bisa muncul dari bentuk yang melengkung.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [{ key: 'b', label: 'Batas kanan b', min: 0.5, max: 3, step: 0.1, awal: 1 }],
    roles: { dx: 'b', f: 'ab', integral: 'hi', batas: 'a' },
    arti: {
      dx: 'Lebar setiap persegi panjang. Inilah yang terus diperkecil.',
      f: 'Tinggi persegi panjang, yaitu nilai fungsi di titik itu.',
      integral: 'Lambang integral — sebenarnya huruf S yang dipanjangkan, singkatan dari "sum" alias jumlah.',
      batas: 'Batas kanan daerah yang dihitung.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Daerah dengan sisi atas melengkung',
        narasi:
          'Kita ingin tahu luas daerah antara kurva dan sumbu mendatar. Rumus luas yang kamu kenal semuanya untuk bentuk bersisi lurus — jadi belum ada yang bisa dipakai.',
        durasi: 2200,
      },
      {
        id: 's1',
        judul: 'Isi dengan bentuk yang kita kuasai',
        narasi:
          'Persegi panjang luasnya jelas: panjang kali lebar. Jadi daerah tadi kita isi dengan beberapa persegi panjang, meskipun belum pas benar.',
        rumus: 'luas satu batang = [f:f(x)] × [dx:Δx]',
        durasi: 2600,
      },
      {
        id: 's2',
        judul: 'Jumlahkan semuanya',
        narasi:
          'Hasilnya belum tepat: ada bagian yang kelebihan karena batangnya menonjol keluar dari kurva. Tetapi kita sudah punya angka untuk diperbaiki.',
        durasi: 2400,
      },
      {
        id: 's3',
        judul: 'Perkecil lebarnya',
        narasi:
          'Batang yang lebih tipis berarti bagian yang menonjol makin sedikit. Perhatikan angkanya bergerak turun mendekati sesuatu.',
        durasi: 3000,
      },
      {
        id: 's4',
        judul: 'Perbanyak terus',
        narasi:
          'Dengan puluhan batang, selisihnya sudah sangat kecil. Angkanya tidak melompat ke mana-mana — ia menempel pada satu nilai.',
        durasi: 3000,
      },
      {
        id: 's5',
        judul: 'Nilai yang didekati itulah luasnya',
        narasi:
          'Untuk y = x², jumlahnya persis b³(n+1)(2n+1)/(6n²). Ketika n diperbesar tanpa batas, pecahan itu menuju b³/3.',
        rumus: 'luas = [batas:b]^3 ÷ 3',
        durasi: 2800,
      },
      {
        id: 's6',
        judul: 'Dan itulah arti lambang integral',
        narasi:
          'Lambang ∫ adalah huruf S yang dipanjangkan, singkatan dari penjumlahan. Sedangkan dx adalah sisa dari lebar batang yang menyusut tanpa batas.',
        rumus: '[integral:∫] f(x) [dx:dx] = luas daerah',
        durasi: 2600,
      },
    ],
  },

  eksperimen: {
    judul: 'Atur sendiri jumlah batangnya',
    ajakan:
      'Perhatikan angka "selisih" di panel kanan. Menggandakan n kira-kira memotong selisihnya menjadi separuh.',
    params: [
      { key: 'b', label: 'Batas kanan b', min: 0.5, max: 3, step: 0.1, awal: 1 },
      { key: 'n', label: 'Banyak persegi panjang', min: 1, max: 200, step: 1, awal: 8, bulat: true },
    ],
    Visual: VisualEksperimen,
    temuan: (p) => {
      const b = clamp(p.b ?? 1, 0.5, 3)
      const n = clamp(Math.round(p.n ?? 8), 1, 200)
      const S = jumlahRiemann(b, n)
      const tepat = b ** 3 / 3
      return (
        <p>
          Dengan {fmt(n)} batang, jumlah luasnya <strong>{fmt(S, 5)}</strong>, sedangkan nilai
          tepatnya b³/3 = {fmt(tepat, 5)}. Selisihnya {fmt(S - tepat, 5)} — selalu positif, karena
          batang dengan tinggi diambil di ujung kanan selalu sedikit menonjol keluar dari kurva. Coba
          gandakan n: selisihnya kira-kira menjadi separuh, bukan seperempat. Itu berarti
          ketelitiannya membaik sebanding dengan 1/n.
        </p>
      )
    },
  },

  penjelasan: {
    SMA: (
      <>
        <p>
          Seluruh gagasan integral berangkat dari satu kenyataan sederhana: kita hanya benar-benar
          tahu cara menghitung luas <strong>persegi panjang</strong>. Bentuk lain diselesaikan
          dengan memotongnya menjadi persegi panjang.
        </p>
        <p>
          Bagi [0, b] menjadi n bagian selebar Δx = b/n. Batang ke-k memiliki tinggi f(x<sub>k</sub>)
          dan luas f(x<sub>k</sub>)·Δx. Jumlah seluruhnya disebut <strong>jumlah Riemann</strong>:
        </p>
        <p style={{ textAlign: 'center' }}>S<sub>n</sub> = Σ f(x<sub>k</sub>) Δx</p>
        <h4>Perhitungan untuk f(x) = x²</h4>
        <p>
          Dengan titik ujung kanan, x<sub>k</sub> = kb/n, sehingga
        </p>
        <p style={{ textAlign: 'center' }}>
          S<sub>n</sub> = Σ (kb/n)² · (b/n) = (b³/n³) Σk² = (b³/n³) · n(n+1)(2n+1)/6
        </p>
        <p>
          Sederhanakan menjadi S<sub>n</sub> = b³(n+1)(2n+1)/(6n²). Ketika n → ∞, pecahan
          (n+1)(2n+1)/n² menuju 2, sehingga S<sub>n</sub> → b³·2/6 = <strong>b³/3</strong>.
        </p>
        <h4>Hubungannya dengan turunan</h4>
        <p>
          Perhatikan bahwa turunan dari b³/3 adalah b². Ini bukan kebetulan, melainkan{' '}
          <strong>Teorema Dasar Kalkulus</strong>: kalau A(b) menyatakan luas dari 0 sampai b, maka
          A′(b) = f(b). Alasannya bisa dibayangkan: menambah b sedikit sebesar Δb menambah luas
          kira-kira sebesar satu batang tipis, yaitu f(b)·Δb.
        </p>
        <p>
          Karena itu menghitung luas berubah menjadi mencari fungsi yang turunannya f — jauh lebih
          mudah daripada menjumlahkan tak hingga banyak batang. Di situlah integral berhenti menjadi
          sekadar gagasan dan menjadi alat hitung.
        </p>
        <h4>Kenapa "luas" boleh bernilai negatif</h4>
        <p>
          Kalau kurvanya berada di bawah sumbu-x, tinggi batangnya negatif dan sumbangannya
          mengurangi. Integral tentu menghitung <em>luas bertanda</em>. Untuk luas geometris yang
          sesungguhnya, dipakai ∫|f(x)|dx.
        </p>
      </>
    ),
    SMP: (
      <>
        <p>
          Bayangkan kamu harus mengukur luas sepetak tanah yang salah satu sisinya berupa tepi sungai
          yang berkelok. Tidak ada rumus untuk bentuk seperti itu.
        </p>
        <p>
          Caranya: tutupi tanah itu dengan ubin persegi panjang. Hasilnya belum tepat, karena ada
          bagian ubin yang keluar dari batas. Tapi kalau ubinnya diganti dengan ubin yang jauh lebih
          tipis, bagian yang meleset menjadi makin sedikit.
        </p>
        <p>
          Makin tipis ubinnya, makin dekat totalnya ke luas yang sebenarnya. Angka yang didekati itu
          adalah jawabannya — dan itulah yang dihitung oleh integral.
        </p>
      </>
    ),
  },

  rumus: {
    src: 'luas = [integral:∫] f(x) [dx:dx] = lim Σ [f:f(x)] × [dx:Δx]',
    roles: { integral: 'hi', dx: 'b', f: 'ab' },
    arti: {
      integral: 'Huruf S yang dipanjangkan — lambang penjumlahan tak hingga banyak batang tipis.',
      dx: 'Sisa dari lebar batang yang diperkecil tanpa batas.',
      f: 'Tinggi tiap batang, yaitu nilai fungsi di titik itu.',
    },
  },

  soal: [
    {
      id: 'int-1',
      tipe: 'angka',
      topicId: 'sma12-integral',
      kelas: 12,
      tingkat: 'mudah',
      konsep: 'integral-luas',
      pertanyaan:
        'Berapa luas daerah di bawah kurva y = x² dari x = 0 sampai x = 3? Gunakan hasil bahwa luasnya b³/3.',
      jawaban: 9,
      toleransi: 1e-6,
      hint: [
        'Masukkan batas kanannya ke dalam rumus b³/3.',
        '3³ = 27.',
        'Lalu bagi dengan 3.',
      ],
      pembahasan: 'Luas = 3³/3 = 27/3 = 9 satuan luas.',
    },
    {
      id: 'int-2',
      tipe: 'benar-salah',
      topicId: 'sma12-integral',
      kelas: 12,
      tingkat: 'sedang',
      konsep: 'integral-luas',
      pertanyaan:
        'Dengan menambah jumlah persegi panjang, hasil jumlah Riemann untuk y = x² selalu mendekati nilai sebenarnya dari atas (nilainya menurun).',
      jawaban: true,
      diagnosa:
        'Untuk kurva yang naik seperti x², batang dengan tinggi diambil di ujung kanan selalu menonjol keluar. Kalau tingginya diambil di ujung kiri, hasilnya justru selalu kurang.',
      hint: [
        'Perhatikan letak batang terhadap kurva pada gambar.',
        'Tinggi batang diambil di ujung kanan setiap potongan.',
        'Untuk kurva yang menanjak, ujung kanan adalah titik tertinggi pada potongan itu.',
      ],
      pembahasan:
        'Benar untuk jumlah Riemann kanan pada fungsi naik: setiap batang menonjol sedikit di atas kurva, sehingga jumlahnya selalu lebih besar dari luas sebenarnya dan turun mendekatinya. Dengan titik ujung kiri, hasilnya akan selalu lebih kecil dan naik mendekat.',
    },
    (rnd) => {
      const n = [4, 5, 10][Math.floor(rnd() * 3)]
      const S = jumlahRiemann(1, n)
      return {
        id: 'int-3',
        tipe: 'angka',
        topicId: 'sma12-integral',
        kelas: 12,
        tingkat: 'sulit',
        konsep: 'integral-luas',
        pertanyaan: `Hitung jumlah Riemann kanan untuk y = x² pada selang [0, 1] dengan ${n} persegi panjang. Bulatkan sampai empat angka di belakang koma.`,
        jawaban: Math.round(S * 10000) / 10000,
        toleransi: 0.0002,
        hint: [
          `Lebar tiap batang 1/${n}, dan tingginya diambil di ujung kanan.`,
          `Jumlahnya = (1/${n}) × [(1/${n})² + (2/${n})² + … + (${n}/${n})²].`,
          `Gunakan Σk² = n(n+1)(2n+1)/6 dengan n = ${n}.`,
        ],
        pembahasan: `Sₙ = (n+1)(2n+1)/(6n²) = ${fmt(S, 5)}. Dibandingkan nilai tepat 1/3 ≈ 0,3333, selisihnya ${fmt(S - 1 / 3, 5)}.`,
      }
    },
    {
      id: 'int-4',
      tipe: 'pilihan',
      topicId: 'sma12-integral',
      kelas: 12,
      tingkat: 'sedang',
      konsep: 'integral-luas',
      pertanyaan: 'Apa arti lambang dx pada penulisan ∫ f(x) dx?',
      pilihan: [
        { id: 'a', label: 'Sisa dari lebar batang yang menyusut tanpa batas', benar: true },
        {
          id: 'b',
          label: 'Perkalian d dengan x',
          diagnosa: 'dx bukan hasil kali dua besaran; ia satu lambang utuh yang menandai variabel apa yang diintegralkan.',
        },
        {
          id: 'c',
          label: 'Sekadar penanda akhir rumus tanpa arti',
          diagnosa:
            'dx punya arti penting. Ia menentukan variabel mana yang diintegralkan — bandingkan ∫x·y dx dengan ∫x·y dy.',
        },
      ],
      hint: [
        'Bandingkan bentuk Σ f(x)·Δx dengan ∫ f(x) dx.',
        'Bagian mana pada jumlah Riemann yang berubah menjadi dx?',
        'Δx adalah lebar batang.',
      ],
      pembahasan:
        'Lambang ∫ menggantikan Σ, dan dx menggantikan Δx. Jadi dx adalah jejak dari lebar batang yang diperkecil tanpa batas, sekaligus penanda variabel yang diintegralkan.',
    },
    {
      id: 'int-5',
      tipe: 'urutkan',
      topicId: 'sma12-integral',
      kelas: 12,
      tingkat: 'sulit',
      konsep: 'integral-luas',
      pertanyaan: 'Susun gagasan menghitung luas daerah melengkung.',
      langkah: [
        'Bagi selang menjadi n potongan selebar Δx',
        'Ganti tiap potongan dengan persegi panjang setinggi nilai fungsinya',
        'Jumlahkan luas seluruh persegi panjang',
        'Perbesar n sehingga Δx menuju nol',
        'Nilai yang didekati jumlah itu adalah luas daerahnya',
      ],
      hint: [
        'Langkah pertama selalu memecah masalah menjadi bagian-bagian yang bisa dihitung.',
        'Limit diambil setelah bentuk jumlahnya tersusun.',
      ],
      pembahasan:
        'Bagi, ganti, jumlahkan, lalu perhalus. Pola berpikir ini terus dipakai untuk menghitung volume, panjang busur, dan usaha dalam fisika.',
    },
  ],

  lanjut: ['turunan-kemiringan', 'lingkaran-luas', 'parabola'],
}

export default konsep
