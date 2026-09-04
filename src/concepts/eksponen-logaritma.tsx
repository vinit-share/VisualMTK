/* ============================================================
   KONSEP — Kenapa logaritma mengubah perkalian jadi penjumlahan?
   Kelas 10 · Aljabar

   Gagasan: pada garis biasa, bilangan 2, 4, 8, 16, 32 makin lama
   makin renggang. Tetapi kalau yang dijadikan patokan adalah
   BANYAKNYA LANGKAH perkalian (yaitu pangkatnya), jaraknya menjadi
   rata. Pada tata letak itu, mengalikan berarti menyambung jarak —
   dan menyambung jarak berarti menjumlahkan.

   Logaritma tidak lain adalah jawaban atas pertanyaan
   "berapa langkah perkalian yang dibutuhkan?".
   ============================================================ */

import { Svg, Tag } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

const W = 690
const H = 440

const X0 = 76
const X1 = 640
const Y_LINEAR = 128
const Y_LOG = 292

/* ---------------- Garis biasa (skala linear) ---------------- */

function GarisLinear({ basis, maks, tampil }: { basis: number; maks: number; tampil: number }) {
  const nilaiMaks = basis ** maks
  const kx = (v: number) => X0 + (v / nilaiMaks) * (X1 - X0)
  return (
    <g opacity={tampil}>
      <line x1={X0} y1={Y_LINEAR} x2={X1} y2={Y_LINEAR} stroke="var(--m-axis)" strokeWidth={1.8} />
      {Array.from({ length: maks + 1 }, (_, k) => basis ** k).map((v, k) => (
        <g key={k}>
          <circle cx={kx(v)} cy={Y_LINEAR} r={5} fill="var(--m-a)" />
          <text
            x={kx(v)}
            y={Y_LINEAR - 16}
            textAnchor="middle"
            fontSize={13}
            fontWeight={800}
            fill="var(--m-a)"
            fontFamily="var(--font-math)"
          >
            {fmt(v)}
          </text>
        </g>
      ))}
      <Tag x={X0 + 6} y={Y_LINEAR + 26} anchor="start" warna="var(--ink-soft)" size={13}>
        garis biasa: makin ke kanan makin renggang
      </Tag>
    </g>
  )
}

/* ---------------- Garis langkah (skala logaritma) ---------------- */

function GarisLangkah({
  basis,
  maks,
  tampil,
  nyala,
}: {
  basis: number
  maks: number
  tampil: number
  nyala: number
}) {
  const kx = (k: number) => X0 + (k / maks) * (X1 - X0)
  return (
    <g opacity={tampil}>
      <line x1={X0} y1={Y_LOG} x2={X1} y2={Y_LOG} stroke="var(--m-axis)" strokeWidth={1.8} />
      {Array.from({ length: maks + 1 }, (_, k) => k).map((k) => (
        <g key={k}>
          <line x1={kx(k)} y1={Y_LOG - 7} x2={kx(k)} y2={Y_LOG + 7} stroke="var(--m-axis)" strokeWidth={1.4} />
          <text
            x={kx(k)}
            y={Y_LOG - 18}
            textAnchor="middle"
            fontSize={14}
            fontWeight={800}
            fill={nyala === k ? 'var(--m-hi)' : 'var(--m-b)'}
            fontFamily="var(--font-math)"
          >
            {fmt(basis ** k)}
          </text>
          <text
            x={kx(k)}
            y={Y_LOG + 26}
            textAnchor="middle"
            fontSize={12.5}
            fontWeight={700}
            fill="var(--ink-soft)"
          >
            {fmt(k)}
          </text>
        </g>
      ))}
      <Tag x={X0 + 6} y={Y_LOG + 52} anchor="start" warna="var(--ink-soft)" size={13}>
        angka bawah = banyaknya langkah perkalian
      </Tag>
    </g>
  )
}

/** Palang penanda sepanjang beberapa langkah. */
function Palang({
  dari,
  ke,
  maks,
  y,
  warna,
  label,
  opacity = 1,
}: {
  dari: number
  ke: number
  maks: number
  y: number
  warna: string
  label: string
  opacity?: number
}) {
  const kx = (k: number) => X0 + (k / maks) * (X1 - X0)
  const a = kx(dari)
  const b = kx(ke)
  return (
    <g opacity={opacity}>
      <line x1={a} y1={y} x2={b} y2={y} stroke={warna} strokeWidth={4} strokeLinecap="round" />
      <line x1={a} y1={y - 7} x2={a} y2={y + 7} stroke={warna} strokeWidth={2.4} />
      <line x1={b} y1={y - 7} x2={b} y2={y + 7} stroke={warna} strokeWidth={2.4} />
      <Tag x={(a + b) / 2} y={y - 18} warna={warna} size={14}>
        {label}
      </Tag>
    </g>
  )
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const basis = clamp(Math.round(p.basis ?? 2), 2, 3)
  const a = clamp(Math.round(p.a ?? 3), 0, 4)
  const b = clamp(Math.round(p.b ?? 2), 0, 3)
  const maks = basis === 2 ? 7 : 5
  const total = Math.min(a + b, maks)

  const tampilLinear = step === 0 ? seg(t, 0.05, 0.9) : step <= 1 ? 1 : 0.35
  const tampilLog = fase(step, t, 1)
  const palangA = fase(step, t, 2)
  const geser = step === 3 ? seg(t, 0.1, 0.92) : step > 3 ? 1 : 0
  const selesai = step >= 4

  const nyalaLog = sorot === 'log' || sorot === 'langkah'
  const nyalaKali = sorot === 'kali'

  return (
    <Svg w={W} h={H} maxH={450} label="Garis bilangan biasa dan garis berdasarkan banyaknya langkah perkalian">
      <GarisLinear basis={basis} maks={maks} tampil={tampilLinear} />
      {tampilLog > 0.02 && (
        <GarisLangkah
          basis={basis}
          maks={maks}
          tampil={tampilLog}
          nyala={selesai ? total : -1}
        />
      )}

      {/* palang pertama: dari 1 sampai basis^a */}
      {palangA > 0.05 && (
        <Palang
          dari={0}
          ke={a}
          maks={maks}
          y={Y_LOG + 74}
          warna="var(--m-a)"
          label={`${fmt(basis ** a)} → ${fmt(a)} langkah`}
          opacity={palangA}
        />
      )}

      {/* palang kedua: disambung sejauh b langkah */}
      {geser > 0.05 && (
        <Palang
          dari={a}
          ke={a + b * geser}
          maks={maks}
          y={Y_LOG + 74}
          warna={nyalaKali ? 'var(--m-hi)' : 'var(--m-b)'}
          label={`+ ${fmt(b)} langkah`}
          opacity={geser}
        />
      )}

      {/* penanda hasil */}
      {selesai && (
        <g>
          <line
            x1={X0 + (total / maks) * (X1 - X0)}
            y1={Y_LOG - 40}
            x2={X0 + (total / maks) * (X1 - X0)}
            y2={Y_LOG + 74}
            stroke="var(--m-hi)"
            strokeWidth={2.4}
            strokeDasharray="6 5"
          />
          <Tag x={X0 + (total / maks) * (X1 - X0)} y={Y_LOG - 52} warna="var(--m-hi)" size={16}>
            {fmt(basis ** total)}
          </Tag>
        </g>
      )}

      {/* keterangan */}
      {step === 0 && (
        <Tag x={W / 2} y={54} warna="var(--m-a)" size={16}>
          {`${Array.from({ length: 4 }, (_, k) => fmt(basis ** (k + 1))).join(', ')}, … jaraknya melompat`}
        </Tag>
      )}
      {step === 1 && (
        <Tag x={W / 2} y={54} warna="var(--m-b)" size={16}>
          susun berdasarkan banyaknya langkah — jaraknya jadi rata
        </Tag>
      )}
      {step === 2 && (
        <Tag x={W / 2} y={54} warna="var(--m-a)" size={16}>
          {`${fmt(basis ** a)} berjarak ${fmt(a)} langkah dari 1`}
        </Tag>
      )}
      {step === 3 && (
        <Tag x={W / 2} y={54} warna="var(--m-hi)" size={16}>
          {`mengalikan dengan ${fmt(basis ** b)} = menyambung ${fmt(b)} langkah lagi`}
        </Tag>
      )}
      {selesai && (
        <Tag
          x={W / 2}
          y={54}
          warna={nyalaLog ? 'var(--m-hi)' : 'var(--m-ab)'}
          size={17}
        >
          {`${fmt(basis ** a)} × ${fmt(basis ** b)} = ${fmt(basis ** total)}   ·   ${fmt(a)} + ${fmt(b)} = ${fmt(total)}`}
        </Tag>
      )}
      {a + b > maks && step >= 3 && (
        <Tag x={W / 2} y={H - 16} warna="var(--ink-soft)" size={13}>
          (hasilnya sudah melewati ujung garis — kecilkan salah satu pangkatnya)
        </Tag>
      )}
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const basis = clamp(Math.round(p.basis ?? 2), 2, 3)
  const a = clamp(Math.round(p.a ?? 3), 0, 4)
  const b = clamp(Math.round(p.b ?? 2), 0, 3)
  const maks = basis === 2 ? 7 : 5
  const total = Math.min(a + b, maks)

  return (
    <Svg w={W} h={H} maxH={450} label="Garis langkah perkalian dengan dua pangkat yang bisa diubah">
      <GarisLinear basis={basis} maks={maks} tampil={0.4} />
      <GarisLangkah basis={basis} maks={maks} tampil={1} nyala={total} />
      <Palang
        dari={0}
        ke={a}
        maks={maks}
        y={Y_LOG + 74}
        warna={sorot === 'a' ? 'var(--m-hi)' : 'var(--m-a)'}
        label={`${fmt(a)} langkah`}
      />
      <Palang
        dari={a}
        ke={Math.min(a + b, maks)}
        maks={maks}
        y={Y_LOG + 74}
        warna={sorot === 'b' ? 'var(--m-hi)' : 'var(--m-b)'}
        label={`+ ${fmt(b)} langkah`}
      />
      <Tag x={W / 2} y={50} warna="var(--m-ab)" size={17}>
        {`${basis}^${a} × ${basis}^${b} = ${basis}^${a + b} = ${fmt(basis ** (a + b))}`}
      </Tag>
      <Tag x={W / 2} y={H - 18} warna="var(--ink-2)" size={15}>
        {`log ${fmt(basis ** a)} + log ${fmt(basis ** b)} = ${fmt(a)} + ${fmt(b)} = ${fmt(a + b)} = log ${fmt(basis ** (a + b))}`}
      </Tag>
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'eksponen-logaritma',
  topicId: 'sma10-logaritma-definisi-dan-sifat-sifatnya',
  judul: 'Logaritma',
  pertanyaan: 'Kenapa logaritma mengubah perkalian menjadi penjumlahan?',
  tagline: 'Karena logaritma menghitung "berapa langkah", dan langkah memang dijumlahkan.',
  kelas: 10,
  domain: 'aljabar',
  tags: ['logaritma', 'eksponen', 'sifat logaritma', 'pertumbuhan'],

  tebak: {
    pertanyaan: 'Berapa hasil 2³ × 2⁴?',
    pilihan: [
      {
        id: 'a',
        label: '2¹²',
        balasan:
          'Pangkatnya dikalikan (3 × 4). Itu berlaku untuk (2³)⁴, yaitu pangkat dari pangkat — bukan untuk perkalian dua bilangan berpangkat.',
      },
      {
        id: 'b',
        label: '2⁷',
        benar: true,
        balasan:
          'Betul. 2³ berarti mengalikan 2 sebanyak 3 kali, 2⁴ sebanyak 4 kali. Digabung, seluruhnya 7 kali.',
      },
      {
        id: 'c',
        label: '4⁷',
        balasan:
          'Basisnya ikut dikalikan menjadi 4. Padahal yang dijumlahkan hanya banyaknya langkah; bilangan yang dikalikan tetap 2.',
      },
    ],
    penutup:
      'Menjumlahkan pangkat terasa wajar untuk eksponen. Logaritma hanyalah cara membaca hal yang sama dari arah sebaliknya.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      { key: 'basis', label: 'Bilangan pokok', min: 2, max: 3, step: 1, awal: 2, bulat: true },
      { key: 'a', label: 'Pangkat pertama', min: 0, max: 4, step: 1, awal: 3, bulat: true },
      { key: 'b', label: 'Pangkat kedua', min: 0, max: 3, step: 1, awal: 2, bulat: true },
    ],
    roles: { a: 'a', b: 'b', log: 'ab', kali: 'hi', langkah: 'ab' },
    arti: {
      a: 'Banyaknya langkah perkalian untuk mencapai bilangan pertama.',
      b: 'Banyaknya langkah tambahan.',
      log: 'Logaritma — jawaban atas pertanyaan "berapa langkah perkalian yang dibutuhkan?".',
      kali: 'Perkalian pada bilangan menjadi penyambungan jarak pada garis langkah.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Pangkat tumbuh sangat cepat',
        narasi:
          'Pada garis bilangan biasa, 2, 4, 8, 16, 32 makin lama makin renggang. Sulit menempatkan semuanya dalam satu gambar.',
        durasi: 2400,
      },
      {
        id: 's1',
        judul: 'Ganti patokannya: hitung langkahnya',
        narasi:
          'Sekarang bukan nilainya yang dijadikan jarak, melainkan banyaknya perkalian yang dibutuhkan. Bilangan yang sama kini berjarak rata.',
        durasi: 2600,
      },
      {
        id: 's2',
        judul: 'Tandai bilangan pertama',
        narasi:
          'Untuk sampai ke bilangan ini dari angka 1, kamu perlu beberapa kali mengalikan. Banyaknya langkah itulah yang dicatat.',
        rumus: 'langkah menuju bilangan pertama = [a:a]',
        durasi: 2200,
      },
      {
        id: 's3',
        judul: 'Mengalikan berarti menyambung langkah',
        narasi:
          'Mengalikan dengan bilangan kedua berarti melanjutkan perjalanan sebanyak langkahnya sendiri. Palangnya tinggal disambung.',
        rumus: '[kali:×] pada nilai = [langkah:+] pada langkah',
        durasi: 2800,
      },
      {
        id: 's4',
        judul: 'Jadi pangkatnya dijumlahkan',
        narasi:
          'Panjang total palang adalah jumlah kedua langkah. Karena posisi pada garis ini menandai pangkat, pangkatnya memang bertambah.',
        rumus: 'x^[a:a] × x^[b:b] = x^([a:a]+[b:b])',
        durasi: 2400,
      },
      {
        id: 's5',
        judul: 'Logaritma membaca sumbu bawah',
        narasi:
          'Angka di bawah garis adalah logaritma bilangan di atasnya. Jadi log sebenarnya bertanya: "berapa langkah dari 1 sampai ke bilangan ini?"',
        rumus: '[log:log_x N] = banyaknya langkah',
        durasi: 2600,
      },
      {
        id: 's6',
        judul: 'Sifat logaritma yang terkenal',
        narasi:
          'Karena membaca posisi pada sumbu bawah, perkalian di atas otomatis menjadi penjumlahan di bawah. Sifat ini tidak perlu dihafal — ia terlihat.',
        rumus: '[log:log](P × Q) = [log:log] P + [log:log] Q',
        durasi: 2600,
      },
    ],
  },

  eksperimen: {
    judul: 'Sambung dua langkah sesukamu',
    ajakan:
      'Ubah pangkatnya dan perhatikan dua baris di bawah gambar: baris atas berbicara tentang perkalian, baris bawah tentang penjumlahan — keduanya menceritakan hal yang sama.',
    params: [
      { key: 'basis', label: 'Bilangan pokok', min: 2, max: 3, step: 1, awal: 2, bulat: true },
      { key: 'a', label: 'Pangkat pertama', min: 0, max: 4, step: 1, awal: 3, bulat: true },
      { key: 'b', label: 'Pangkat kedua', min: 0, max: 3, step: 1, awal: 2, bulat: true },
    ],
    Visual: VisualEksperimen,
    temuan: (p) => {
      const basis = clamp(Math.round(p.basis ?? 2), 2, 3)
      const a = clamp(Math.round(p.a ?? 3), 0, 4)
      const b = clamp(Math.round(p.b ?? 2), 0, 3)
      return (
        <p>
          <strong>
            {basis}^{a} × {basis}^{b} = {fmt(basis ** a)} × {fmt(basis ** b)} ={' '}
            {fmt(basis ** (a + b))}
          </strong>{' '}
          — dan pangkatnya {fmt(a)} + {fmt(b)} = {fmt(a + b)}.{' '}
          {a === 0
            ? `Perhatikan ${basis}⁰ = 1: nol langkah berarti belum bergerak dari angka 1. Itulah kenapa apa pun berpangkat nol bernilai 1.`
            : 'Coba buat salah satu pangkatnya nol: palangnya tidak bertambah panjang sama sekali, dan nilainya tidak berubah.'}{' '}
          Perhatikan juga jarak pada garis atas melompat-lompat, sedangkan pada garis bawah selalu
          rata.
        </p>
      )
    },
  },

  penjelasan: {
    SMA: (
      <>
        <p>
          Logaritma menjawab satu pertanyaan: <strong>"pangkat berapa?"</strong> Kalimat
          log₂ 32 = 5 berarti "2 harus dipangkatkan 5 untuk menghasilkan 32". Jadi logaritma dan
          eksponen adalah dua cara membaca hubungan yang sama.
        </p>
        <p style={{ textAlign: 'center' }}>
          a<sup>c</sup> = b ⟺ log<sub>a</sub> b = c
        </p>
        <h4>Kenapa perkalian menjadi penjumlahan</h4>
        <p>
          Misalkan P = a<sup>m</sup> dan Q = a<sup>n</sup>. Maka
        </p>
        <p style={{ textAlign: 'center' }}>
          P × Q = a<sup>m</sup> · a<sup>n</sup> = a<sup>m+n</sup>
        </p>
        <p>
          Sifat eksponen ini sendiri bukan aturan baru: mengalikan a sebanyak m kali lalu n kali
          lagi berarti mengalikannya m + n kali. Membaca kedua ruas sebagai logaritma memberi
        </p>
        <p style={{ textAlign: 'center' }}>
          log<sub>a</sub>(P × Q) = m + n = log<sub>a</sub> P + log<sub>a</sub> Q
        </p>
        <p>
          Dengan alasan serupa: log(P/Q) = log P − log Q, dan log(Pⁿ) = n · log P.
        </p>
        <h4>Kenapa dulu ini penting sekali</h4>
        <p>
          Sebelum ada kalkulator, mengalikan bilangan besar sangat melelahkan sedangkan menjumlahkan
          mudah. Tabel logaritma dan mistar hitung memanfaatkan sifat inilah — dan penemuan Napier
          pada 1614 dianggap melipatgandakan kecepatan kerja para astronom.
        </p>
        <h4>Batas yang harus diingat</h4>
        <ul>
          <li>log hanya terdefinisi untuk bilangan positif — tidak ada pangkat yang menghasilkan bilangan negatif atau nol dari basis positif.</li>
          <li>Basisnya harus positif dan tidak sama dengan 1, karena 1 dipangkatkan apa pun tetap 1.</li>
          <li>log(P + Q) TIDAK sama dengan log P + log Q. Yang berubah menjadi penjumlahan hanya perkalian.</li>
        </ul>
        <p>
          Skala logaritma dipakai di mana-mana justru karena sifat ini: skala Richter, desibel, dan
          pH semuanya mengubah perkalian besar menjadi penjumlahan kecil yang mudah dibaca.
        </p>
      </>
    ),
    SMP: (
      <>
        <p>
          Pangkat itu singkatan dari perkalian berulang: 2³ berarti 2 × 2 × 2. Angka 3 menghitung{' '}
          <strong>berapa kali</strong> perkaliannya dilakukan.
        </p>
        <p>
          Kalau kamu mengalikan 2³ dengan 2⁴, kamu melakukan 3 kali perkalian lalu 4 kali lagi —
          seluruhnya 7 kali. Jadi hasilnya 2⁷. Angkanya dijumlahkan karena yang dihitung adalah{' '}
          <em>banyaknya langkah</em>.
        </p>
        <p>
          Logaritma nanti hanyalah cara bertanya sebaliknya: "kalau hasilnya 128, berapa langkah
          yang tadi dilakukan?"
        </p>
      </>
    ),
  },

  rumus: {
    src: '[log:log](P × Q) = [log:log] P + [log:log] Q',
    roles: { log: 'ab' },
    arti: {
      log: 'Logaritma — banyaknya langkah perkalian dari 1 sampai bilangan itu. Karena menghitung langkah, menggabungkan perkalian berarti menjumlahkan langkahnya.',
    },
  },

  soal: [
    (rnd) => {
      const m = 2 + Math.floor(rnd() * 4)
      const n = 2 + Math.floor(rnd() * 4)
      return {
        id: 'log-1',
        tipe: 'angka',
        topicId: 'sma10-logaritma-definisi-dan-sifat-sifatnya',
        kelas: 10,
        tingkat: 'mudah',
        konsep: 'eksponen-logaritma',
        pertanyaan: `Hasil dari 2^${m} × 2^${n} adalah 2 pangkat berapa?`,
        jawaban: m + n,
        toleransi: 1e-9,
        hint: [
          'Pangkat menghitung banyaknya perkalian yang dilakukan.',
          `2^${m} berarti mengalikan 2 sebanyak ${m} kali, lalu ${n} kali lagi.`,
          'Jadi seluruhnya tinggal dijumlahkan.',
        ],
        pembahasan: `2^${m} × 2^${n} = 2^${m + n} = ${2 ** (m + n)}. Pangkat dijumlahkan karena yang dihitung adalah banyaknya langkah perkalian.`,
      }
    },
    {
      id: 'log-2',
      tipe: 'angka',
      topicId: 'sma10-logaritma-definisi-dan-sifat-sifatnya',
      kelas: 10,
      tingkat: 'mudah',
      konsep: 'eksponen-logaritma',
      pertanyaan: 'Berapa nilai log₂ 32?',
      jawaban: 5,
      toleransi: 1e-9,
      hint: [
        'Pertanyaannya: 2 harus dipangkatkan berapa supaya hasilnya 32?',
        'Coba hitung 2, 4, 8, 16, 32 — sambil menghitung berapa kali kamu mengalikan.',
        'Dari 1 ke 32 diperlukan lima kali perkalian dengan 2.',
      ],
      pembahasan: 'Karena 2⁵ = 32, maka log₂ 32 = 5. Logaritma menghitung banyaknya langkah perkalian.',
    },
    {
      id: 'log-3',
      tipe: 'benar-salah',
      topicId: 'sma10-logaritma-definisi-dan-sifat-sifatnya',
      kelas: 10,
      tingkat: 'sedang',
      konsep: 'eksponen-logaritma',
      pertanyaan: 'Berlaku log(P + Q) = log P + log Q untuk semua P dan Q positif.',
      jawaban: false,
      diagnosa:
        'Yang berubah menjadi penjumlahan hanyalah PERKALIAN, bukan penjumlahan. Uji dengan P = Q = 1: ruas kiri log 2, ruas kanan 0.',
      hint: [
        'Perhatikan operasi di dalam kurung: perkalian atau penjumlahan?',
        'Sifat yang benar adalah log(P × Q) = log P + log Q.',
        'Coba masukkan P = Q = 1 untuk menguji.',
      ],
      pembahasan:
        'Salah. Untuk P = Q = 1: log(1+1) = log 2 ≈ 0,301, sedangkan log 1 + log 1 = 0. Logaritma hanya menyederhanakan perkalian, pembagian, dan perpangkatan — tidak menyederhanakan penjumlahan.',
    },
    {
      id: 'log-4',
      tipe: 'pilihan',
      topicId: 'sma10-logaritma-definisi-dan-sifat-sifatnya',
      kelas: 10,
      tingkat: 'sedang',
      konsep: 'eksponen-logaritma',
      pertanyaan: 'Kenapa a⁰ = 1 untuk setiap a ≠ 0?',
      pilihan: [
        {
          id: 'a',
          label: 'Karena nol langkah perkalian berarti belum bergerak dari 1',
          benar: true,
        },
        {
          id: 'b',
          label: 'Karena nol dikali apa pun hasilnya nol',
          diagnosa:
            'Angka nol di sini adalah PANGKATNYA, bukan bilangan yang dikalikan. Keduanya hal yang berbeda.',
        },
        {
          id: 'c',
          label: 'Karena sudah disepakati begitu',
          diagnosa:
            'Kesepakatan itu bukan sembarangan — ia satu-satunya nilai yang menjaga aturan aᵐ ÷ aⁿ = aᵐ⁻ⁿ tetap berlaku.',
        },
      ],
      hint: [
        'Lihat garis langkah pada gambar: di mana letak posisi nol langkah?',
        'Coba juga hitung a³ ÷ a³ dengan dua cara.',
        'a³ ÷ a³ = 1, sekaligus sama dengan a³⁻³ = a⁰.',
      ],
      pembahasan:
        'Pada garis langkah, posisi 0 adalah titik awal, yaitu angka 1. Secara aljabar: a³ ÷ a³ jelas bernilai 1, dan menurut aturan pangkat sama dengan a⁰. Jadi a⁰ = 1 dipaksakan oleh konsistensi, bukan oleh kesepakatan.',
    },
    {
      id: 'log-5',
      tipe: 'angka',
      topicId: 'sma10-logaritma-definisi-dan-sifat-sifatnya',
      kelas: 10,
      tingkat: 'sulit',
      konsep: 'eksponen-logaritma',
      pertanyaan: 'Diketahui log 2 ≈ 0,301 dan log 3 ≈ 0,477. Berapa nilai log 6? Bulatkan sampai tiga angka di belakang koma.',
      jawaban: 0.778,
      toleransi: 0.0015,
      hint: [
        'Bisakah 6 ditulis sebagai perkalian dua bilangan yang logaritmanya sudah diketahui?',
        '6 = 2 × 3.',
        'Gunakan log(P × Q) = log P + log Q.',
      ],
      pembahasan:
        'log 6 = log(2 × 3) = log 2 + log 3 ≈ 0,301 + 0,477 = 0,778. Inilah cara kerja tabel logaritma dahulu: perkalian diselesaikan lewat penjumlahan.',
    },
  ],

  lanjut: ['deret-gauss', 'parabola', 'perkalian-luas'],
}

export default konsep
