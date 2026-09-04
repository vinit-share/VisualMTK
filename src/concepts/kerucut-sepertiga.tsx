/* ============================================================
   KONSEP — Kenapa volume kerucut sepertiga tabung?
   Kelas 9 · Pengukuran

   Percobaan menuang tiga kali memang meyakinkan, tetapi ia hanya
   MEMPERLIHATKAN, belum menjelaskan. Alasan sebenarnya ada pada
   irisan mendatar: pada ketinggian x bagian dari tinggi total,
   jari-jari kerucut menyusut menjadi (1 − x) kali, sehingga luas
   irisannya menjadi (1 − x)² kali luas irisan tabung.

   Rata-rata nilai (1 − x)² untuk x dari 0 sampai 1 adalah 1/3.
   Di situlah angka sepertiga itu berasal.
   ============================================================ */

import { Svg, Tag } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

const W = 690
const H = 440

const RY = 15 // ketebalan elips alas (perspektif)

function Tabung({
  cx,
  alas,
  r,
  tinggi,
  isi,
  warna = 'var(--m-c)',
}: {
  cx: number
  alas: number
  r: number
  tinggi: number
  /** 0..1 bagian yang terisi. */
  isi: number
  warna?: string
}) {
  const atas = alas - tinggi
  const yIsi = alas - tinggi * clamp(isi, 0, 1)
  return (
    <g>
      {/* badan */}
      <path
        d={`M ${cx - r} ${atas} L ${cx - r} ${alas} A ${r} ${RY} 0 0 0 ${cx + r} ${alas} L ${cx + r} ${atas}`}
        fill="var(--m-ghost)"
        stroke="var(--ink-2)"
        strokeWidth={2}
      />
      {/* isi */}
      {isi > 0.005 && (
        <path
          d={`M ${cx - r} ${yIsi} L ${cx - r} ${alas} A ${r} ${RY} 0 0 0 ${cx + r} ${alas} L ${cx + r} ${yIsi} A ${r} ${RY} 0 0 1 ${cx - r} ${yIsi} Z`}
          fill={warna}
          fillOpacity={0.45}
          stroke={warna}
          strokeWidth={1.6}
        />
      )}
      <ellipse cx={cx} cy={atas} rx={r} ry={RY} fill="var(--surface)" stroke="var(--ink-2)" strokeWidth={2} />
      <ellipse
        cx={cx}
        cy={alas}
        rx={r}
        ry={RY}
        fill="none"
        stroke="var(--ink-2)"
        strokeWidth={2}
        strokeDasharray="4 4"
      />
    </g>
  )
}

function Kerucut({
  cx,
  alas,
  r,
  tinggi,
  warna = 'var(--m-a)',
  isi = 1,
}: {
  cx: number
  alas: number
  r: number
  tinggi: number
  warna?: string
  isi?: number
}) {
  const puncak = alas - tinggi
  return (
    <g>
      <path
        d={`M ${cx - r} ${alas} L ${cx} ${puncak} L ${cx + r} ${alas} A ${r} ${RY} 0 0 1 ${cx - r} ${alas} Z`}
        fill={warna}
        fillOpacity={0.35 * clamp(isi, 0, 1)}
        stroke="var(--ink-2)"
        strokeWidth={2}
      />
      <ellipse
        cx={cx}
        cy={alas}
        rx={r}
        ry={RY}
        fill="none"
        stroke="var(--ink-2)"
        strokeWidth={2}
        strokeDasharray="4 4"
      />
    </g>
  )
}

/** Grafik (1 − x)² beserta luas di bawahnya yang bernilai 1/3. */
function GrafikIrisan({ x, tampil }: { x: number; tampil: number }) {
  const X0 = 420
  const X1 = 645
  const Y0 = 120
  const Y1 = 300
  const kx = (v: number) => X0 + v * (X1 - X0)
  const ky = (v: number) => Y1 - v * (Y1 - Y0)
  const d: string[] = []
  for (let i = 0; i <= 40; i++) {
    const v = i / 40
    d.push(`${i === 0 ? 'M' : 'L'} ${kx(v).toFixed(1)} ${ky((1 - v) ** 2).toFixed(1)}`)
  }
  return (
    <g opacity={tampil}>
      <path
        d={`M ${kx(0)} ${ky(0)} ${d.slice(1).join(' ')} L ${kx(1)} ${ky(0)} Z`}
        fill="var(--m-a)"
        fillOpacity={0.24}
      />
      <line x1={X0} y1={Y1} x2={X1} y2={Y1} stroke="var(--m-axis)" strokeWidth={1.6} />
      <line x1={X0} y1={Y0} x2={X0} y2={Y1} stroke="var(--m-axis)" strokeWidth={1.6} />
      <line x1={X0} y1={ky(1)} x2={X1} y2={ky(1)} stroke="var(--m-grid)" strokeWidth={1} strokeDasharray="4 4" />
      <line
        x1={X0}
        y1={ky(1 / 3)}
        x2={X1}
        y2={ky(1 / 3)}
        stroke="var(--m-hi)"
        strokeWidth={2}
        strokeDasharray="6 5"
      />
      <path d={d.join(' ')} fill="none" stroke="var(--m-a)" strokeWidth={2.6} />
      <circle cx={kx(x)} cy={ky((1 - x) ** 2)} r={5} fill="var(--m-hi)" />
      <Tag x={(X0 + X1) / 2} y={Y0 - 18} warna="var(--m-a)" size={13}>
        luas irisan kerucut ÷ tabung
      </Tag>
      <Tag x={X1 - 4} y={ky(1 / 3) - 14} anchor="end" warna="var(--m-hi)" size={13}>
        rata-ratanya 1/3
      </Tag>
      <Tag x={X0 - 6} y={ky(1)} anchor="end" warna="var(--ink-soft)" size={12} latar={null}>
        1
      </Tag>
      <Tag x={X0} y={Y1 + 18} warna="var(--ink-soft)" size={12} latar={null}>
        alas
      </Tag>
      <Tag x={X1} y={Y1 + 18} warna="var(--ink-soft)" size={12} latar={null}>
        puncak
      </Tag>
    </g>
  )
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const r = clamp(p.r ?? 3, 1.5, 5)
  const tg = clamp(p.t ?? 5, 3, 8)
  const irisan = clamp(p.irisan ?? 0.4, 0, 0.98)

  const R = r * 20
  const T = tg * 30
  const ALAS = 350

  // Tiga kali tuang pada langkah 1..3.
  const tuang =
    step === 1 ? seg(t, 0.1, 0.9) / 3 : step === 2 ? (1 + seg(t, 0.1, 0.9)) / 3 : step >= 3 ? Math.min(1, (2 + (step === 3 ? seg(t, 0.1, 0.9) : 1)) / 3) : 0

  const irisMode = step >= 4
  const grafik = fase(step, t, 5)
  const selesai = step >= 6

  const x = irisMode ? (step === 4 ? seg(t, 0.15, 0.95) * 0.85 : irisan) : irisan
  const rasio = (1 - x) ** 2

  const nyalaR = sorot === 'r'
  const nyalaT = sorot === 't'
  const nyalaTiga = sorot === 'tiga'

  const yIris = ALAS - T * x

  return (
    <Svg w={W} h={H} maxH={450} label="Kerucut dan tabung beralas sama, beserta perbandingan luas irisannya">
      {/* kerucut kiri */}
      <Kerucut
        cx={grafik > 0.3 ? 140 : 180}
        alas={ALAS}
        r={R}
        tinggi={T}
        isi={step === 0 || irisMode ? 1 : 1 - tuang * 3 > 0 ? 1 : 0}
      />
      {/* tabung kanan */}
      <Tabung cx={grafik > 0.3 ? 300 : 380} alas={ALAS} r={R} tinggi={T} isi={tuang} />

      {/* garis irisan */}
      {irisMode && (
        <g>
          <line
            x1={60}
            y1={yIris}
            x2={grafik > 0.3 ? 380 : 470}
            y2={yIris}
            stroke="var(--m-hi)"
            strokeWidth={2}
            strokeDasharray="7 5"
          />
          <ellipse
            cx={grafik > 0.3 ? 140 : 180}
            cy={yIris}
            rx={R * (1 - x)}
            ry={RY * (1 - x)}
            fill="var(--m-a)"
            fillOpacity={0.6}
            stroke="var(--m-a)"
            strokeWidth={2}
          />
          <ellipse
            cx={grafik > 0.3 ? 300 : 380}
            cy={yIris}
            rx={R}
            ry={RY}
            fill="var(--m-c)"
            fillOpacity={0.45}
            stroke="var(--m-c)"
            strokeWidth={2}
          />
        </g>
      )}

      {grafik > 0.05 && <GrafikIrisan x={x} tampil={grafik} />}

      {/* ukuran */}
      <Tag x={(grafik > 0.3 ? 140 : 180)} y={ALAS + 38} warna={nyalaR ? 'var(--m-hi)' : 'var(--ink-2)'} size={14}>
        {`r = ${fmt(r)}`}
      </Tag>
      <Tag x={(grafik > 0.3 ? 300 : 380)} y={ALAS + 38} warna={nyalaT ? 'var(--m-hi)' : 'var(--ink-2)'} size={14}>
        {`t = ${fmt(tg)}`}
      </Tag>

      {/* keterangan */}
      {step === 0 && (
        <Tag x={W / 2} y={44} warna="var(--ink-2)" size={16}>
          alasnya sama, tingginya sama — hanya bentuknya berbeda
        </Tag>
      )}
      {step >= 1 && step <= 3 && (
        <Tag x={W / 2} y={44} warna="var(--m-c)" size={16}>
          {`tuangan ke-${Math.min(3, step)} · tabung terisi ${fmt(Math.round(tuang * 100))}%`}
        </Tag>
      )}
      {step === 4 && (
        <Tag x={W / 2} y={44} warna="var(--m-hi)" size={16}>
          {`pada ketinggian ini, jari-jari kerucut tinggal ${fmt((1 - x) * 100, 0)}% — luasnya ${fmt(rasio * 100, 0)}%`}
        </Tag>
      )}
      {step === 5 && (
        <Tag x={W / 2} y={44} warna="var(--m-hi)" size={16}>
          perbandingan luas irisan mengikuti kurva (1 − x)²
        </Tag>
      )}
      {selesai && (
        <Tag x={W / 2} y={44} warna={nyalaTiga ? 'var(--m-hi)' : 'var(--m-ab)'} size={17}>
          {`V kerucut = ⅓ × π × ${fmt(r)}² × ${fmt(tg)} = ${fmt((Math.PI * r * r * tg) / 3, 2)}`}
        </Tag>
      )}
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const r = clamp(p.r ?? 3, 1, 5)
  const tg = clamp(p.t ?? 5, 2, 8)
  const x = clamp(p.irisan ?? 0.4, 0, 0.98)
  const R = r * 20
  const T = tg * 30
  const ALAS = 350
  const yIris = ALAS - T * x

  return (
    <Svg w={W} h={H} maxH={450} label="Kerucut dan tabung yang ukurannya bisa diubah, dengan irisan mendatar">
      <Kerucut cx={140} alas={ALAS} r={R} tinggi={T} />
      <Tabung cx={300} alas={ALAS} r={R} tinggi={T} isi={1 / 3} />
      <line x1={60} y1={yIris} x2={380} y2={yIris} stroke="var(--m-hi)" strokeWidth={2} strokeDasharray="7 5" />
      <ellipse
        cx={140}
        cy={yIris}
        rx={R * (1 - x)}
        ry={RY * (1 - x)}
        fill="var(--m-a)"
        fillOpacity={0.6}
        stroke="var(--m-a)"
        strokeWidth={2}
      />
      <ellipse cx={300} cy={yIris} rx={R} ry={RY} fill="var(--m-c)" fillOpacity={0.45} stroke="var(--m-c)" strokeWidth={2} />
      <GrafikIrisan x={x} tampil={1} />

      <Tag x={220} y={ALAS + 44} warna={sorot === 'r' ? 'var(--m-hi)' : 'var(--ink-2)'} size={14}>
        {`r = ${fmt(r)} · t = ${fmt(tg)}`}
      </Tag>
      <Tag x={220} y={44} warna="var(--m-ab)" size={16}>
        {`V tabung ${fmt(Math.PI * r * r * tg, 1)} · V kerucut ${fmt((Math.PI * r * r * tg) / 3, 1)}`}
      </Tag>
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'kerucut-sepertiga',
  topicId: 'smp9-luas-permukaan-dan-volume-kerucut',
  judul: 'Volume kerucut',
  pertanyaan: 'Kenapa volume kerucut sepertiga tabung?',
  tagline: 'Tuang isinya tiga kali. Tabungnya pas penuh. Tapi kenapa harus tiga?',
  kelas: 9,
  domain: 'pengukuran',
  tags: ['kerucut', 'tabung', 'volume', 'sepertiga', 'irisan'],

  tebak: {
    pertanyaan:
      'Sebuah kerucut dan tabung punya alas yang sama dan tinggi yang sama. Kalau isi kerucut dituang ke tabung, berapa kali tuangan sampai tabungnya penuh?',
    pilihan: [
      {
        id: 'a',
        label: '2 kali',
        balasan:
          'Tebakan yang wajar, karena kerucut "terlihat seperti separuh tabung". Tetapi kerucut menyusut ke arah puncak jauh lebih cepat daripada dugaan mata.',
      },
      {
        id: 'b',
        label: '3 kali',
        benar: true,
        balasan:
          'Betul. Dan yang jauh lebih menarik: kenapa tepat tiga, bukan 2,8 atau 3,2? Angka itu punya alasan.',
      },
      {
        id: 'c',
        label: '4 kali',
        balasan:
          'Terlalu banyak. Kalau empat, berarti irisan kerucut rata-rata hanya seperempat irisan tabung — padahal di dekat alas keduanya sama besar.',
      },
    ],
    penutup:
      'Percobaan menuang bisa menunjukkan jawabannya, tetapi tidak menjelaskan. Kita akan mencari alasannya.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      { key: 'r', label: 'Jari-jari alas', min: 1.5, max: 5, step: 0.5, awal: 3 },
      { key: 't', label: 'Tinggi', min: 3, max: 8, step: 0.5, awal: 5 },
      { key: 'irisan', label: 'Ketinggian irisan', min: 0, max: 0.95, step: 0.05, awal: 0.4 },
    ],
    roles: { r: 'a', t: 'b', tiga: 'hi', luas: 'ab' },
    arti: {
      r: 'Jari-jari alas — sama untuk kerucut maupun tabung.',
      t: 'Tinggi — juga sama untuk keduanya.',
      tiga: 'Angka sepertiga. Ia berasal dari rata-rata nilai (1 − x)², bukan dari kesepakatan.',
      luas: 'Luas irisan mendatar pada ketinggian tertentu.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Dua bangun, alas dan tinggi sama',
        narasi:
          'Kerucut dan tabung ini beralas lingkaran yang sama besar dan sama tingginya. Yang berbeda hanya bentuk sisinya.',
        rumus: 'V tabung = π[r:r]^2[t:t]',
        durasi: 2200,
      },
      {
        id: 's1',
        judul: 'Tuangan pertama',
        narasi:
          'Isi penuh kerucut dituang ke dalam tabung. Baru terisi sepertiga bagian.',
        durasi: 2000,
      },
      {
        id: 's2',
        judul: 'Tuangan kedua',
        narasi: 'Dituang sekali lagi. Tabung terisi dua pertiga.',
        durasi: 1800,
      },
      {
        id: 's3',
        judul: 'Tuangan ketiga — pas penuh',
        narasi:
          'Tiga kali tuangan, tepat penuh. Percobaan ini meyakinkan, tetapi belum menjelaskan kenapa harus tiga.',
        durasi: 2200,
      },
      {
        id: 's4',
        judul: 'Iris keduanya mendatar',
        narasi:
          'Pada ketinggian mana pun, irisan tabung selalu lingkaran penuh. Irisan kerucut mengecil: kalau sudah naik x bagian, jari-jarinya tinggal (1 − x) kali.',
        rumus: '[luas:luas irisan kerucut] = (1 − x)^2 × π[r:r]^2',
        durasi: 2800,
      },
      {
        id: 's5',
        judul: 'Kumpulkan seluruh irisan',
        narasi:
          'Perbandingan luas irisan mengikuti kurva (1 − x)². Di alas nilainya 1, di puncak nilainya 0, dan turun secara melengkung — bukan lurus.',
        durasi: 2800,
      },
      {
        id: 's6',
        judul: 'Rata-ratanya tepat sepertiga',
        narasi:
          'Volume adalah jumlah seluruh irisan. Karena rata-rata (1 − x)² dari alas ke puncak bernilai 1/3, volume kerucut juga sepertiga volume tabung.',
        rumus: 'V kerucut = [tiga:⅓] × π[r:r]^2[t:t]',
        durasi: 2800,
      },
    ],
  },

  eksperimen: {
    judul: 'Geser ketinggian irisannya',
    ajakan:
      'Perhatikan lingkaran ungu (irisan kerucut) menyusut jauh lebih cepat daripada lingkaran biru (irisan tabung).',
    params: [
      { key: 'r', label: 'Jari-jari alas', min: 1, max: 5, step: 0.5, awal: 3 },
      { key: 't', label: 'Tinggi', min: 2, max: 8, step: 0.5, awal: 5 },
      { key: 'irisan', label: 'Ketinggian irisan', min: 0, max: 0.95, step: 0.01, awal: 0.4 },
    ],
    Visual: VisualEksperimen,
    temuan: (p) => {
      const r = clamp(p.r ?? 3, 1, 5)
      const tg = clamp(p.t ?? 5, 2, 8)
      const x = clamp(p.irisan ?? 0.4, 0, 0.98)
      const rasio = (1 - x) ** 2
      return (
        <p>
          Pada ketinggian {fmt(x * 100, 0)}% dari alas, jari-jari kerucut tinggal{' '}
          {fmt((1 - x) * 100, 0)}% — tetapi luas irisannya hanya{' '}
          <strong>{fmt(rasio * 100, 1)}%</strong> dari irisan tabung, karena jari-jari muncul dua
          kali pada rumus luas. Di pertengahan tinggi (50%), irisannya sudah menyusut menjadi
          seperempat. Itulah kenapa rata-ratanya jatuh ke 1/3, bukan 1/2. Volume kerucut ini{' '}
          {fmt((Math.PI * r * r * tg) / 3, 2)} satuan kubik.
        </p>
      )
    },
  },

  penjelasan: {
    SMP: (
      <>
        <p>
          Percobaan menuang tiga kali sudah cukup untuk meyakinkan. Tetapi pertanyaan yang lebih baik
          adalah: <strong>kenapa tepat tiga?</strong>
        </p>
        <p>
          Jawabannya ada pada irisan mendatar. Bayangkan kedua bangun diiris tipis-tipis seperti roti.
          Setiap irisan tabung adalah lingkaran yang sama besar, dari bawah sampai atas.
        </p>
        <p>
          Irisan kerucut berbeda. Di alas ia sama besar dengan irisan tabung, tetapi makin ke atas
          makin kecil, sampai menjadi titik di puncak.
        </p>
        <h4>Kuncinya: luas menyusut dua kali lebih cepat</h4>
        <p>
          Di tengah-tengah tinggi, jari-jari kerucut tinggal <strong>setengahnya</strong>. Tetapi
          luas lingkaran memakai r², sehingga luasnya tinggal{' '}
          <strong>seperempat</strong> — bukan setengah.
        </p>
        <p>
          Karena itu, rata-rata seluruh irisan kerucut jauh lebih kecil dari separuh irisan tabung.
          Perhitungannya memberi angka tepat 1/3.
        </p>
        <h4>Berlaku juga untuk limas</h4>
        <p>
          Alasan yang sama berlaku untuk limas terhadap prisma: V limas = ⅓ × luas alas × tinggi.
          Yang menentukan bukan bentuk alasnya, melainkan cara irisannya menyusut.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Pada ketinggian y dari alas (0 ≤ y ≤ t), kesebangunan memberi jari-jari kerucut
          r(y) = r(1 − y/t). Luas irisannya
        </p>
        <p style={{ textAlign: 'center' }}>
          A(y) = πr²(1 − y/t)²
        </p>
        <p>Volumenya adalah jumlah seluruh irisan tipis:</p>
        <p style={{ textAlign: 'center' }}>
          V = ∫₀<sup>t</sup> πr²(1 − y/t)² dy = πr²t ∫₀¹ (1 − u)² du = πr²t · [1/3] = ⅓πr²t
        </p>
        <p>
          Angka 1/3 datang dari ∫₀¹ (1 − u)² du = 1/3 — nilai yang sama dengan luas di bawah kurva
          y = x² pada selang [0, 1]. Jadi "sepertiga" pada kerucut, pada limas, dan pada luas di
          bawah parabola semuanya berasal dari satu sumber yang sama.
        </p>
        <h4>Tanpa integral: prinsip Cavalieri</h4>
        <p>
          Sebuah kubus dapat dipotong menjadi <strong>tiga</strong> limas kongruen yang alasnya
          adalah tiga sisi kubus dan puncaknya di titik sudut yang berseberangan. Ini memperlihatkan
          langsung bahwa limas bernilai sepertiga prisma, tanpa perhitungan apa pun.
        </p>
        <p>
          Prinsip Cavalieri kemudian memperluasnya: dua benda yang setiap irisan mendatarnya sama
          luas pasti punya volume yang sama. Karena itu hasil untuk limas persegi langsung berlaku
          untuk kerucut.
        </p>
        <h4>Catatan tentang percobaan menuang</h4>
        <p>
          Menuang tiga kali adalah <em>bukti empiris</em>, bukan bukti matematis. Ia tidak bisa
          membedakan 3 dari 2,99. Yang membuktikannya tetap perhitungan irisan di atas.
        </p>
      </>
    ),
  },

  rumus: {
    src: 'V kerucut = [tiga:⅓] × π × [r:r]^2 × [t:t]',
    roles: { tiga: 'hi', r: 'a', t: 'b' },
    arti: {
      tiga: 'Sepertiga — berasal dari rata-rata (1 − x)² sepanjang tinggi, bukan dari kesepakatan.',
      r: 'Jari-jari alas. Muncul dua kali karena luas alas berupa lingkaran.',
      t: 'Tinggi tegak lurus dari alas ke puncak — bukan panjang garis pelukis.',
    },
  },

  soal: [
    (rnd) => {
      const r = 3 + Math.floor(rnd() * 8)
      const t = 6 + Math.floor(rnd() * 10)
      const v = (3.14 * r * r * t) / 3
      return {
        id: 'ker-1',
        tipe: 'angka',
        topicId: 'smp9-luas-permukaan-dan-volume-kerucut',
        kelas: 9,
        tingkat: 'mudah',
        konsep: 'kerucut-sepertiga',
        pertanyaan: `Sebuah kerucut berjari-jari ${r} cm dan tinggi ${t} cm. Berapa volumenya? Gunakan π = 3,14 dan bulatkan sampai dua angka di belakang koma.`,
        jawaban: Math.round(v * 100) / 100,
        satuan: 'cm³',
        toleransi: 0.02,
        hint: [
          'Hitung dulu volume tabung yang alas dan tingginya sama.',
          `π r² t = 3,14 × ${r}² × ${t} = ${fmt(3.14 * r * r * t, 2)}.`,
          'Kerucut hanya sepertiganya.',
        ],
        pembahasan: `V = ⅓ × 3,14 × ${r}² × ${t} = ${fmt(Math.round(v * 100) / 100, 2)} cm³.`,
      }
    },
    {
      id: 'ker-2',
      tipe: 'pilihan',
      topicId: 'smp9-luas-permukaan-dan-volume-kerucut',
      kelas: 9,
      tingkat: 'sedang',
      konsep: 'kerucut-sepertiga',
      pertanyaan:
        'Pada setengah tinggi kerucut, luas irisan mendatarnya adalah berapa bagian dari luas alasnya?',
      pilihan: [
        { id: 'a', label: 'Seperempat', benar: true },
        {
          id: 'b',
          label: 'Setengah',
          diagnosa:
            'Yang tinggal setengah adalah JARI-JARINYA, bukan luasnya. Karena luas memakai r², efeknya dikuadratkan.',
        },
        {
          id: 'c',
          label: 'Sepertiga',
          diagnosa: 'Sepertiga adalah perbandingan volumenya, bukan perbandingan satu irisan.',
        },
        { id: 'd', label: 'Sama besar', diagnosa: 'Itu berlaku pada tabung, yang irisannya tidak berubah.' },
      ],
      hint: [
        'Berapa jari-jari kerucut pada setengah tingginya?',
        'Jari-jarinya tinggal setengah.',
        'Luas lingkaran memakai r², jadi hitung (½)².',
      ],
      pembahasan:
        'Jari-jarinya tinggal ½, sehingga luasnya (½)² = ¼ dari luas alas. Penyusutan yang dikuadratkan inilah sebab munculnya angka sepertiga pada volume.',
    },
    {
      id: 'ker-3',
      tipe: 'benar-salah',
      topicId: 'smp9-luas-permukaan-dan-volume-kerucut',
      kelas: 9,
      tingkat: 'sedang',
      konsep: 'kerucut-sepertiga',
      pertanyaan:
        'Percobaan menuang isi kerucut tiga kali ke dalam tabung sudah membuktikan bahwa volumenya tepat sepertiga.',
      jawaban: false,
      diagnosa:
        'Percobaan hanya bisa menunjukkan bahwa hasilnya sangat dekat dengan sepertiga. Ia tidak sanggup membedakan 3 dari 2,99 — untuk itu diperlukan alasan matematis.',
      hint: [
        'Apa bedanya "menunjukkan" dan "membuktikan"?',
        'Seberapa teliti sebuah percobaan menuang air bisa dilakukan?',
        'Apakah percobaan bisa memastikan angkanya tepat 3 dan bukan 3,01?',
      ],
      pembahasan:
        'Salah. Percobaan adalah bukti empiris yang meyakinkan tetapi tidak pasti. Bukti sesungguhnya datang dari perbandingan luas irisan (1 − x)², yang rata-ratanya tepat 1/3.',
    },
    (rnd) => {
      const r = 3 + Math.floor(rnd() * 6)
      const t = 6 + Math.floor(rnd() * 8)
      return {
        id: 'ker-4',
        tipe: 'angka',
        topicId: 'smp9-luas-permukaan-dan-volume-kerucut',
        kelas: 9,
        tingkat: 'sulit',
        konsep: 'kerucut-sepertiga',
        pertanyaan: `Sebuah tabung berjari-jari ${r} cm dan tinggi ${t} cm terisi penuh air. Air itu dituang ke dalam kerucut berjari-jari dan bertinggi sama. Berapa kerucut yang dibutuhkan untuk menampung seluruh air?`,
        jawaban: 3,
        satuan: 'kerucut',
        toleransi: 1e-9,
        hint: [
          'Bandingkan volume tabung dengan volume kerucut yang ukurannya sama.',
          'V tabung = πr²t, sedangkan V kerucut = ⅓πr²t.',
          'Perbandingannya tidak bergantung pada angka r dan t.',
        ],
        pembahasan:
          'Karena V tabung = 3 × V kerucut, dibutuhkan 3 kerucut. Perhatikan jawabannya tidak bergantung pada ukuran — selama alas dan tingginya sama, perbandingannya selalu 3.',
      }
    },
    {
      id: 'ker-5',
      tipe: 'urutkan',
      topicId: 'smp9-luas-permukaan-dan-volume-kerucut',
      kelas: 9,
      tingkat: 'sulit',
      konsep: 'kerucut-sepertiga',
      pertanyaan: 'Susun alasan kenapa volume kerucut sepertiga volume tabung.',
      langkah: [
        'Iris kerucut dan tabung dengan bidang mendatar',
        'Irisan tabung selalu sama besar, irisan kerucut mengecil ke arah puncak',
        'Pada ketinggian x bagian, jari-jari kerucut tinggal (1 − x) kali',
        'Karena luas memakai r², luas irisannya menjadi (1 − x)² kali',
        'Rata-rata (1 − x)² dari alas ke puncak bernilai 1/3',
        'Jadi volume kerucut sepertiga volume tabung',
      ],
      hint: [
        'Buktinya dimulai dengan memecah kedua bangun menjadi bagian yang bisa dibandingkan.',
        'Pengaruh kuadrat baru muncul setelah jari-jarinya dibandingkan.',
      ],
      pembahasan:
        'Inti buktinya adalah membandingkan irisan demi irisan. Volume tidak lain adalah jumlah seluruh irisan, sehingga perbandingan rata-rata irisan langsung menjadi perbandingan volume.',
    },
  ],

  lanjut: ['lingkaran-luas', 'integral-luas', 'segitiga-setengah'],
}

export default konsep
