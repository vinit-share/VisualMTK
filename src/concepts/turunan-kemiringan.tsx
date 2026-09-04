/* ============================================================
   KONSEP — Kenapa turunan disebut kemiringan?
   Kelas 11 · Kalkulus

   Gagasan: kemiringan garis lurus mudah dihitung karena selalu
   sama di mana pun. Pada kurva, kemiringannya berubah-ubah —
   jadi kita hitung kemiringan garis POTONG melalui dua titik yang
   berdekatan, lalu dekatkan kedua titik itu.

   Untuk f(x) = x², kemiringan garis potongnya persis 2x + h.
   Ketika h menyusut ke nol, yang tersisa 2x. Angka h benar-benar
   terlihat lenyap dari layar — itulah arti limit di sini.
   ============================================================ */

import { Svg, Tag } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

const W = 690
const H = 440

const GX0 = 76
const GX1 = 470
const GY0 = 60
const GY1 = 390

const XMIN = -0.4
const XMAX = 3.4
const YMIN = -1.2
const YMAX = 10.4

const kx = (x: number) => GX0 + ((x - XMIN) / (XMAX - XMIN)) * (GX1 - GX0)
const ky = (y: number) => GY1 - ((y - YMIN) / (YMAX - YMIN)) * (GY1 - GY0)

const kuadrat = (x: number) => x * x
const garis = (x: number) => 2 * x + 1

function Sumbu({ f, linear }: { f: (x: number) => number; linear: boolean }) {
  const n = 120
  const d: string[] = []
  for (let i = 0; i <= n; i++) {
    const x = XMIN + ((XMAX - XMIN) * i) / n
    const y = f(x)
    if (y < YMIN || y > YMAX) continue
    d.push(`${d.length === 0 ? 'M' : 'L'} ${kx(x).toFixed(1)} ${ky(y).toFixed(1)}`)
  }
  return (
    <g>
      {[0, 1, 2, 3].map((x) => (
        <line key={`v${x}`} x1={kx(x)} y1={GY0} x2={kx(x)} y2={GY1} stroke="var(--m-grid)" strokeWidth={1} />
      ))}
      {[0, 2, 4, 6, 8, 10].map((y) => (
        <line key={`h${y}`} x1={GX0} y1={ky(y)} x2={GX1} y2={ky(y)} stroke="var(--m-grid)" strokeWidth={1} />
      ))}
      <line x1={GX0} y1={ky(0)} x2={GX1} y2={ky(0)} stroke="var(--m-axis)" strokeWidth={1.8} />
      <line x1={kx(0)} y1={GY0} x2={kx(0)} y2={GY1} stroke="var(--m-axis)" strokeWidth={1.8} />
      {[1, 2, 3].map((x) => (
        <text key={`lx${x}`} x={kx(x)} y={ky(0) + 16} textAnchor="middle" fontSize={11.5} fontWeight={700} fill="var(--ink-soft)">
          {fmt(x)}
        </text>
      ))}
      <path
        d={d.join(' ')}
        fill="none"
        stroke={linear ? 'var(--m-c)' : 'var(--m-a)'}
        strokeWidth={3}
        strokeLinejoin="round"
      />
    </g>
  )
}

/** Garis potong (atau singgung) melalui dua titik pada kurva. */
function GarisPotong({
  x,
  h,
  f,
  warna,
  tampilSegitiga,
  nyala,
}: {
  x: number
  h: number
  f: (x: number) => number
  warna: string
  tampilSegitiga: number
  nyala: boolean
}) {
  const x2 = x + h
  const y1 = f(x)
  const y2 = f(x2)
  const m = h === 0 ? 2 * x : (y2 - y1) / h

  // Perpanjang garis melewati kedua titik.
  const xa = XMIN
  const xb = XMAX
  const ya = y1 + m * (xa - x)
  const yb = y1 + m * (xb - x)

  return (
    <g>
      <line
        x1={kx(xa)}
        y1={ky(ya)}
        x2={kx(xb)}
        y2={ky(yb)}
        stroke={warna}
        strokeWidth={nyala ? 3.6 : 2.4}
        opacity={0.95}
      />
      {tampilSegitiga > 0.02 && Math.abs(h) > 0.02 && (
        <g opacity={tampilSegitiga}>
          <line x1={kx(x)} y1={ky(y1)} x2={kx(x2)} y2={ky(y1)} stroke="var(--m-b)" strokeWidth={2.2} />
          <line x1={kx(x2)} y1={ky(y1)} x2={kx(x2)} y2={ky(y2)} stroke="var(--m-ab)" strokeWidth={2.2} />
          <Tag x={(kx(x) + kx(x2)) / 2} y={ky(y1) + 20} warna="var(--m-b)" size={13}>
            {`h = ${fmt(h, 2)}`}
          </Tag>
          <Tag x={kx(x2) + 34} y={(ky(y1) + ky(y2)) / 2} warna="var(--m-ab)" size={13}>
            {`Δy = ${fmt(y2 - y1, 2)}`}
          </Tag>
        </g>
      )}
      <circle cx={kx(x)} cy={ky(y1)} r={6} fill={warna} />
      {Math.abs(h) > 0.02 && <circle cx={kx(x2)} cy={ky(y2)} r={5} fill={warna} opacity={0.75} />}
    </g>
  )
}

/** Panel angka di sebelah kanan. */
function Panel({
  baris,
  tampil,
}: {
  baris: { teks: string; warna?: string; besar?: boolean }[]
  tampil: number
}) {
  return (
    <g opacity={tampil}>
      <rect x={508} y={92} width={162} height={44 + baris.length * 34} rx={14} fill="var(--surface-2)" />
      {baris.map((b, i) => (
        <text
          key={i}
          x={589}
          y={126 + i * 34}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={b.besar ? 19 : 15}
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

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const x = clamp(p.x ?? 1.5, 0.3, 3)

  // h menyusut pada langkah 3, lalu tetap kecil.
  const hAwal = 1.4
  const h =
    step <= 2 ? hAwal : step === 3 ? hAwal * (1 - seg(t, 0.05, 0.95)) + 0.02 : 0.02

  const linear = step === 0
  const f = linear ? garis : kuadrat
  const m = linear ? 2 : (f(x + h) - f(x)) / h

  const tampilPotong = fase(step, t, 2)
  const tampilPanel = step >= 4 || linear

  const nyalaH = sorot === 'h'
  const nyalaTurunan = sorot === 'turunan' || sorot === 'dua-x'

  const baris = linear
    ? [
        { teks: 'y = 2x + 1', warna: 'var(--m-c)' },
        { teks: 'Δy / Δx = 2', warna: 'var(--m-ab)', besar: true },
        { teks: 'di mana pun sama' },
      ]
    : [
        { teks: `x = ${fmt(x, 2)}` },
        { teks: `h = ${fmt(h, 3)}`, warna: nyalaH ? 'var(--m-hi)' : 'var(--m-b)' },
        { teks: `Δy/h = ${fmt(m, 3)}`, warna: 'var(--m-ab)', besar: true },
        { teks: `2x = ${fmt(2 * x, 2)}`, warna: nyalaTurunan ? 'var(--m-hi)' : 'var(--m-a)' },
      ]

  return (
    <Svg w={W} h={H} maxH={450} label="Kurva dengan garis potong yang mendekati garis singgung">
      <Sumbu f={f} linear={linear} />

      {(linear || tampilPotong > 0.02) && (
        <GarisPotong
          x={x}
          h={linear ? 1 : h}
          f={f}
          warna={linear ? 'var(--m-c)' : step >= 4 ? 'var(--m-hi)' : 'var(--m-b)'}
          tampilSegitiga={fase(step, t, 2)}
          nyala={nyalaTurunan}
        />
      )}

      <Panel baris={baris} tampil={tampilPanel ? 1 : 0.35} />

      {step === 0 && (
        <Tag x={(GX0 + GX1) / 2} y={36} warna="var(--m-c)" size={16}>
          garis lurus: kemiringannya sama di mana pun
        </Tag>
      )}
      {step === 1 && (
        <Tag x={(GX0 + GX1) / 2} y={36} warna="var(--m-a)" size={16}>
          kurva: kemiringannya berbeda di setiap titik
        </Tag>
      )}
      {step === 2 && (
        <Tag x={(GX0 + GX1) / 2} y={36} warna="var(--m-b)" size={16}>
          ambil dua titik, hitung naik dibagi maju
        </Tag>
      )}
      {step === 3 && (
        <Tag x={(GX0 + GX1) / 2} y={36} warna="var(--m-hi)" size={16}>
          dekatkan titik keduanya…
        </Tag>
      )}
      {step >= 4 && (
        <Tag x={(GX0 + GX1) / 2} y={36} warna="var(--m-hi)" size={16}>
          {`garisnya kini menyinggung, kemiringannya ${fmt(2 * x, 2)}`}
        </Tag>
      )}
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const x = clamp(p.x ?? 1.5, 0.2, 3)
  const h = clamp(p.h ?? 0.8, 0.01, 1.5)
  const m = (kuadrat(x + h) - kuadrat(x)) / h

  return (
    <Svg w={W} h={H} maxH={450} label="Kurva y sama dengan x kuadrat dengan garis potong yang bisa diatur">
      <Sumbu f={kuadrat} linear={false} />
      {/* garis singgung sejati sebagai pembanding */}
      <GarisPotong x={x} h={0} f={kuadrat} warna="var(--m-hi)" tampilSegitiga={0} nyala={false} />
      <GarisPotong
        x={x}
        h={h}
        f={kuadrat}
        warna="var(--m-b)"
        tampilSegitiga={1}
        nyala={sorot === 'h'}
      />
      <Panel
        baris={[
          { teks: `x = ${fmt(x, 2)}` },
          { teks: `h = ${fmt(h, 3)}`, warna: 'var(--m-b)' },
          { teks: `Δy/h = ${fmt(m, 4)}`, warna: 'var(--m-b)', besar: true },
          { teks: `2x = ${fmt(2 * x, 3)}`, warna: 'var(--m-hi)', besar: true },
          { teks: `selisih = ${fmt(m - 2 * x, 4)}`, warna: 'var(--ink-2)' },
        ]}
        tampil={1}
      />
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'turunan-kemiringan',
  topicId: 'sma11-turunan',
  judul: 'Turunan',
  pertanyaan: 'Kenapa turunan disebut kemiringan?',
  tagline: 'Dekatkan dua titik pada kurva sampai hampir berimpit. Lihat apa yang tersisa.',
  kelas: 11,
  domain: 'kalkulus',
  tags: ['turunan', 'limit', 'kemiringan', 'garis singgung'],

  tebak: {
    pertanyaan:
      'Pada kurva y = x², kamu ambil titik di x = 1,5 dan titik kedua yang makin didekatkan. Kemiringan garis penghubungnya akan menuju...',
    pilihan: [
      {
        id: 'a',
        label: 'Nol, karena kedua titik hampir berimpit',
        balasan:
          'Memang Δy dan h sama-sama menyusut ke nol. Tapi yang dihitung adalah PERBANDINGAN keduanya, dan perbandingan itu justru menuju angka tertentu.',
      },
      {
        id: 'b',
        label: 'Angka 3',
        benar: true,
        balasan:
          'Betul: 2 × 1,5 = 3. Sebentar lagi kamu bisa melihat dari mana rumus 2x itu muncul.',
      },
      {
        id: 'c',
        label: 'Tak terhingga',
        balasan:
          'Kalau pembilangnya tetap sedangkan penyebutnya menuju nol, hasilnya memang meledak. Tetapi di sini pembilangnya ikut menyusut.',
      },
    ],
    penutup:
      'Nol dibagi nol memang tidak punya arti. Yang punya arti adalah ke mana perbandingannya menuju.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [{ key: 'x', label: 'Titik x', min: 0.3, max: 3, step: 0.1, awal: 1.5 }],
    roles: { h: 'b', dy: 'ab', turunan: 'hi', 'dua-x': 'hi' },
    arti: {
      h: 'Jarak mendatar antara kedua titik. Inilah yang kita kecilkan sampai mendekati nol.',
      dy: 'Selisih tinggi antara kedua titik.',
      turunan: 'Kemiringan garis singgung — nilai yang didekati perbandingan itu.',
      'dua-x': 'Hasil akhirnya: kemiringan kurva y = x² di titik x adalah 2x.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Kemiringan garis lurus itu mudah',
        narasi:
          'Ambil dua titik mana saja, hitung naiknya dibagi majunya. Untuk garis lurus, hasilnya selalu sama — di mana pun kamu ambil titiknya.',
        rumus: 'kemiringan = Δy / Δx',
        durasi: 2200,
      },
      {
        id: 's1',
        judul: 'Pada kurva, kemiringan berubah-ubah',
        narasi:
          'Di bagian kiri kurva ini landai, di bagian kanan curam. Jadi pertanyaan "berapa kemiringannya" perlu dilengkapi: kemiringan di titik yang mana?',
        durasi: 2200,
      },
      {
        id: 's2',
        judul: 'Ambil dua titik dulu',
        narasi:
          'Kita belum bisa menghitung kemiringan di satu titik saja. Jadi ambil titik kedua yang berjarak h, lalu hitung naik dibagi maju seperti biasa.',
        rumus: 'kemiringan potong = [dy:Δy] / [h:h]',
        durasi: 2600,
      },
      {
        id: 's3',
        judul: 'Dekatkan titik keduanya',
        narasi:
          'Perkecil h. Garis potongnya berputar perlahan, makin menempel pada kurva, sampai akhirnya hanya menyentuh di satu titik.',
        durasi: 3000,
      },
      {
        id: 's4',
        judul: 'Sekarang hitung dengan aljabar',
        narasi:
          'Untuk f(x) = x², selisihnya (x+h)² − x² = 2xh + h². Dibagi h menjadi 2x + h. Angka h masih ada di situ, tetapi ia sedang menuju nol.',
        rumus: '((x+h)^2 − x^2) ÷ [h:h] = 2x + [h:h]',
        durasi: 3000,
      },
      {
        id: 's5',
        judul: 'Yang tersisa saat h lenyap',
        narasi:
          'Ketika h mendekati nol, suku h pada 2x + h ikut lenyap. Yang tersisa adalah 2x — dan angka itulah kemiringan kurva tepat di titik x.',
        rumus: "f'(x) = [dua-x:2x]",
        durasi: 2600,
      },
      {
        id: 's6',
        judul: 'Itulah definisi turunan',
        narasi:
          'Turunan bukan aturan baru, melainkan kemiringan biasa yang dihitung pada dua titik yang jaraknya menuju nol.',
        rumus: "[turunan:f'(x)] = lim ([dy:f(x+h) − f(x)]) ÷ [h:h]",
        durasi: 2600,
      },
    ],
  },

  eksperimen: {
    judul: 'Kecilkan h sendiri',
    ajakan:
      'Garis merah muda adalah garis singgung sejati, garis jingga adalah garis potong. Perhatikan angka "selisih" di panel kanan saat h mengecil.',
    params: [
      { key: 'x', label: 'Titik x', min: 0.2, max: 3, step: 0.05, awal: 1.5 },
      { key: 'h', label: 'Jarak h', min: 0.01, max: 1.5, step: 0.01, awal: 0.8 },
    ],
    Visual: VisualEksperimen,
    temuan: (p) => {
      const x = clamp(p.x ?? 1.5, 0.2, 3)
      const h = clamp(p.h ?? 0.8, 0.01, 1.5)
      const m = (kuadrat(x + h) - kuadrat(x)) / h
      return (
        <p>
          Dengan h = {fmt(h, 3)}, kemiringan garis potongnya <strong>{fmt(m, 4)}</strong>, sedangkan
          kemiringan garis singgungnya {fmt(2 * x, 3)}. Selisihnya {fmt(m - 2 * x, 4)} —{' '}
          <strong>persis sama dengan h</strong>. Itu bukan kebetulan: hasil bagi selisihnya memang
          tepat 2x + h. Coba kecilkan h sampai 0,01: selisihnya ikut menjadi 0,01. Perhatikan juga
          bahwa h tidak boleh benar-benar nol, karena membagi dengan nol tidak terdefinisi.
        </p>
      )
    },
  },

  penjelasan: {
    SMA: (
      <>
        <p>
          Kemiringan mengukur <strong>seberapa cepat sesuatu berubah</strong>. Untuk garis lurus,
          jawabannya satu angka. Untuk kurva, jawabannya berbeda-beda di setiap titik — dan turunan
          adalah cara menyebut angka tersebut di satu titik tertentu.
        </p>
        <p>
          Masalahnya, kemiringan memerlukan <em>dua</em> titik. Jalan keluarnya: pakai titik kedua
          yang berjarak h, lalu perhatikan ke mana hasilnya menuju ketika h mengecil.
        </p>
        <p style={{ textAlign: 'center' }}>
          f′(x) = lim<sub>h→0</sub> [f(x + h) − f(x)] / h
        </p>
        <h4>Perhitungan untuk f(x) = x²</h4>
        <p style={{ textAlign: 'center' }}>
          [(x + h)² − x²] / h = [x² + 2xh + h² − x²] / h = [2xh + h²] / h = 2x + h
        </p>
        <p>
          Selama h ≠ 0, pembagian itu sah. Setelah disederhanakan, barulah h boleh menuju nol dan
          tersisa <strong>f′(x) = 2x</strong>. Perhatikan urutannya: sederhanakan dulu, ambil limit
          belakangan. Kalau langsung memasukkan h = 0 sejak awal, yang muncul adalah 0/0 yang tidak
          bermakna.
        </p>
        <h4>Kenapa 0/0 bukan berarti nol</h4>
        <p>
          Pembilang dan penyebut memang sama-sama menuju nol, tetapi <em>kecepatan</em> keduanya
          berbeda, dan perbandingan itulah yang punya nilai. Bentuk 0/0 disebut bentuk taktentu
          justru karena hasilnya bisa apa saja, bergantung fungsinya.
        </p>
        <h4>Membaca turunan</h4>
        <ul>
          <li>f′(x) &gt; 0 berarti fungsi sedang naik di titik itu;</li>
          <li>f′(x) &lt; 0 berarti sedang turun;</li>
          <li>f′(x) = 0 berarti mendatar — kandidat titik puncak atau lembah.</li>
        </ul>
        <p>
          Untuk y = x², f′(x) = 2x bernilai nol hanya di x = 0, dan memang di situlah titik terendah
          parabola berada.
        </p>
      </>
    ),
    SMP: (
      <>
        <p>
          Kemiringan menjawab pertanyaan: "kalau maju sedikit ke kanan, naik berapa?" Pada tanjakan
          lurus, jawabannya selalu sama.
        </p>
        <p>
          Pada jalan yang melengkung, jawabannya berbeda-beda: awalnya landai, makin ke atas makin
          curam. Untuk mengetahui kecuramannya <strong>tepat di satu titik</strong>, kita ambil
          titik lain yang sangat-sangat dekat, lalu hitung kemiringannya seperti biasa.
        </p>
        <p>
          Makin dekat titik keduanya, makin tepat angkanya menggambarkan kecuraman di titik itu.
          Angka yang didekati itulah yang disebut turunan.
        </p>
      </>
    ),
  },

  rumus: {
    src: "[turunan:f'(x)] = lim(h→0) [dy:(f(x+h) − f(x))] ÷ [h:h]",
    roles: { turunan: 'hi', dy: 'ab', h: 'b' },
    arti: {
      turunan: 'Turunan — kemiringan kurva tepat di titik x.',
      dy: 'Selisih tinggi antara dua titik yang berdekatan.',
      h: 'Jarak mendatar antara kedua titik. Ia harus bukan nol saat membagi, lalu didekatkan ke nol.',
    },
  },

  soal: [
    (rnd) => {
      const x = 1 + Math.floor(rnd() * 6)
      return {
        id: 'tur-1',
        tipe: 'angka',
        topicId: 'sma11-turunan',
        kelas: 11,
        tingkat: 'mudah',
        konsep: 'turunan-kemiringan',
        pertanyaan: `Diketahui f(x) = x². Berapa kemiringan garis singgung kurva di titik x = ${x}?`,
        jawaban: 2 * x,
        toleransi: 1e-9,
        hint: [
          'Turunan dari x² sudah kita peroleh dari perhitungan tadi.',
          "f'(x) = 2x.",
          `Masukkan x = ${x}.`,
        ],
        pembahasan: `f'(x) = 2x, jadi f'(${x}) = ${2 * x}. Artinya di titik itu, maju satu satuan ke kanan membuat kurva naik kira-kira ${2 * x} satuan.`,
      }
    },
    {
      id: 'tur-2',
      tipe: 'pilihan',
      topicId: 'sma11-turunan',
      kelas: 11,
      tingkat: 'sedang',
      konsep: 'turunan-kemiringan',
      pertanyaan:
        'Pada perhitungan [(x+h)² − x²] / h, kenapa kita boleh membagi dengan h?',
      pilihan: [
        { id: 'a', label: 'Karena h belum nol, ia hanya sedang menuju nol', benar: true },
        {
          id: 'b',
          label: 'Karena membagi dengan nol menghasilkan nol',
          diagnosa: 'Membagi dengan nol tidak menghasilkan nol — operasi itu tidak terdefinisi sama sekali.',
        },
        {
          id: 'c',
          label: 'Karena h sangat kecil sehingga bisa diabaikan',
          diagnosa:
            'Kalau h boleh diabaikan sejak awal, pembilangnya juga menjadi nol dan kita terjebak pada 0/0. Justru h harus dipertahankan sampai penyederhanaan selesai.',
        },
      ],
      hint: [
        'Perhatikan bedanya "bernilai nol" dan "menuju nol".',
        'Limit berbicara tentang ke mana sesuatu menuju, bukan tentang nilainya di titik itu.',
        'Selama h ≠ 0, pembagian adalah operasi yang sah.',
      ],
      pembahasan:
        'Dalam limit, h tidak pernah benar-benar bernilai nol — ia hanya didekatkan. Karena itu pembagian sah dilakukan, dan barulah setelah bentuknya disederhanakan menjadi 2x + h kita mengambil limitnya.',
    },
    {
      id: 'tur-3',
      tipe: 'benar-salah',
      topicId: 'sma11-turunan',
      kelas: 11,
      tingkat: 'sedang',
      konsep: 'turunan-kemiringan',
      pertanyaan:
        'Karena Δy dan h sama-sama menuju nol, hasil bagi Δy/h juga pasti menuju nol.',
      jawaban: false,
      diagnosa:
        'Yang menentukan bukan bahwa keduanya menuju nol, melainkan seberapa cepat masing-masing menyusut. Pada kurva ini perbandingannya justru menuju 2x.',
      hint: [
        'Coba lihat angka Δy/h pada eksperimen saat h dikecilkan.',
        'Apakah angka itu mendekati nol, atau mendekati sesuatu yang lain?',
        'Bentuk 0/0 disebut taktentu justru karena hasilnya bisa bermacam-macam.',
      ],
      pembahasan:
        'Salah. Untuk f(x) = x², Δy/h = 2x + h yang menuju 2x, bukan nol. Bentuk 0/0 tidak menentukan hasil apa pun dengan sendirinya.',
    },
    (rnd) => {
      const x = 1 + Math.floor(rnd() * 4)
      const h = [0.1, 0.01, 0.5][Math.floor(rnd() * 3)]
      const m = ((x + h) ** 2 - x ** 2) / h
      return {
        id: 'tur-4',
        tipe: 'angka',
        topicId: 'sma11-turunan',
        kelas: 11,
        tingkat: 'sulit',
        konsep: 'turunan-kemiringan',
        pertanyaan: `Untuk f(x) = x², hitung kemiringan garis potong antara x = ${x} dan x = ${fmt(x + h, 2)}.`,
        jawaban: Math.round(m * 10000) / 10000,
        toleransi: 0.002,
        hint: [
          'Hitung selisih nilai fungsinya lebih dulu.',
          `f(${fmt(x + h, 2)}) − f(${x}) = ${fmt((x + h) ** 2, 4)} − ${fmt(x * x)} = ${fmt((x + h) ** 2 - x * x, 4)}.`,
          `Bagi dengan h = ${fmt(h, 2)}. Hasilnya seharusnya mendekati 2x = ${2 * x}.`,
        ],
        pembahasan: `Kemiringannya ${fmt(m, 4)}. Perhatikan hasilnya persis 2x + h = ${2 * x} + ${fmt(h, 2)} — makin kecil h, makin dekat ke ${2 * x}.`,
      }
    },
    {
      id: 'tur-5',
      tipe: 'urutkan',
      topicId: 'sma11-turunan',
      kelas: 11,
      tingkat: 'sulit',
      konsep: 'turunan-kemiringan',
      pertanyaan: 'Susun langkah menurunkan f(x) = x² dari definisi.',
      langkah: [
        'Tulis hasil bagi selisih: [f(x+h) − f(x)] / h',
        'Jabarkan (x+h)² menjadi x² + 2xh + h²',
        'Kurangkan x², tersisa 2xh + h²',
        'Bagi dengan h, tersisa 2x + h',
        'Ambil limit h → 0 sehingga diperoleh 2x',
      ],
      hint: [
        'Penjabaran dilakukan sebelum penyederhanaan.',
        'Limit selalu diambil paling akhir, setelah bentuknya tidak lagi memuat pembagian oleh h.',
      ],
      pembahasan:
        'Urutan ini penting. Mengambil limit sebelum menyederhanakan hanya akan menghasilkan bentuk 0/0 yang tidak memberi informasi.',
    },
  ],

  lanjut: ['parabola', 'integral-luas', 'sin-cos-lingkaran'],
}

export default konsep
