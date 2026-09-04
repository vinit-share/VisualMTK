/* ============================================================
   KONSEP — Bagaimana segitiga bisa berubah menjadi gelombang?
   Kelas 10 · Geometri

   Gagasan: pada lingkaran berjari-jari 1, sisi miring segitiga
   selalu bernilai 1. Akibatnya sin θ = depan/miring = tinggi titik
   itu sendiri, dan cos θ = jaraknya ke kiri-kanan.

   Ketika titik berputar, tingginya naik-turun berulang. Merekam
   tinggi itu terhadap sudut menghasilkan grafik sinus. Gelombang
   bukan hal baru — ia rekaman perjalanan satu titik di lingkaran.
   ============================================================ */

import { Svg, Tag, SikuSiku } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt, rad } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

const W = 700
const H = 430

const CX = 152
const CY = 218
const R = 108

const WX0 = 300
const WX1 = 676
const WSKALA = R // tinggi gelombang sama dengan jari-jari, supaya sebanding

/** Ubah sudut derajat menjadi titik pada lingkaran satuan (koordinat layar). */
const titik = (deg: number) => ({
  x: CX + R * Math.cos(rad(deg)),
  y: CY - R * Math.sin(rad(deg)),
})

function Lingkaran({
  theta,
  tampilSegitiga,
  tampilCos,
  nyalaSin,
  nyalaCos,
}: {
  theta: number
  tampilSegitiga: number
  tampilCos: number
  nyalaSin: boolean
  nyalaCos: boolean
}) {
  const P = titik(theta)
  const s = Math.sin(rad(theta))
  const c = Math.cos(rad(theta))

  return (
    <g>
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--m-grid)" strokeWidth={2} />
      <line x1={CX - R - 18} y1={CY} x2={CX + R + 18} y2={CY} stroke="var(--m-axis)" strokeWidth={1.6} />
      <line x1={CX} y1={CY - R - 18} x2={CX} y2={CY + R + 18} stroke="var(--m-axis)" strokeWidth={1.6} />

      {/* segitiga siku-siku */}
      {tampilSegitiga > 0.02 && (
        <g opacity={tampilSegitiga}>
          <polygon
            points={`${CX},${CY} ${P.x},${CY} ${P.x},${P.y}`}
            fill="var(--m-ab)"
            fillOpacity={0.18}
            stroke="var(--m-ab)"
            strokeWidth={1.6}
          />
          <SikuSiku
            x={P.x}
            y={CY}
            ux={c >= 0 ? -1 : 1}
            uy={0}
            vx={0}
            vy={s >= 0 ? -1 : 1}
            s={11}
            warna="var(--m-ab)"
          />
        </g>
      )}

      {/* sisi tegak = sinus */}
      <line
        x1={P.x}
        y1={CY}
        x2={P.x}
        y2={P.y}
        stroke="var(--m-a)"
        strokeWidth={nyalaSin ? 5 : 3.4}
        strokeLinecap="round"
      />
      {/* sisi mendatar = kosinus */}
      {tampilCos > 0.02 && (
        <line
          x1={CX}
          y1={CY}
          x2={P.x}
          y2={CY}
          stroke="var(--m-b)"
          strokeWidth={nyalaCos ? 5 : 3.4}
          strokeLinecap="round"
          opacity={tampilCos}
        />
      )}

      {/* jari-jari */}
      <line x1={CX} y1={CY} x2={P.x} y2={P.y} stroke="var(--ink)" strokeWidth={2.4} />
      <circle cx={P.x} cy={P.y} r={6} fill="var(--m-hi)" />
      <circle cx={CX} cy={CY} r={3.5} fill="var(--ink)" />

      <Tag x={CX + 40} y={CY - 14} warna="var(--ink-2)" size={13} latar={null}>
        {`θ = ${fmt(Math.round(theta))}°`}
      </Tag>
      <Tag x={CX + (c >= 0 ? 40 : -40)} y={CY + 26} warna="var(--ink-3)" size={12}>
        1
      </Tag>
    </g>
  )
}

function Gelombang({
  theta,
  maksDeg,
  tampilCos,
  nyalaSin,
  nyalaCos,
}: {
  theta: number
  maksDeg: number
  tampilCos: number
  nyalaSin: boolean
  nyalaCos: boolean
}) {
  const kx = (deg: number) => WX0 + (deg / maksDeg) * (WX1 - WX0)
  const ky = (v: number) => CY - v * WSKALA

  const langkah = 2
  const jalur = (f: (d: number) => number) => {
    const p: string[] = []
    for (let d = 0; d <= theta + 0.001; d += langkah) {
      p.push(`${p.length === 0 ? 'M' : 'L'} ${kx(d).toFixed(1)} ${ky(f(d)).toFixed(1)}`)
    }
    return p.join(' ')
  }

  const tanda = maksDeg > 400 ? [0, 180, 360, 540, 720] : [0, 90, 180, 270, 360]

  return (
    <g>
      <line x1={WX0} y1={CY} x2={WX1} y2={CY} stroke="var(--m-axis)" strokeWidth={1.6} />
      {[1, -1].map((v) => (
        <line
          key={v}
          x1={WX0}
          y1={ky(v)}
          x2={WX1}
          y2={ky(v)}
          stroke="var(--m-grid)"
          strokeWidth={1}
          strokeDasharray="5 5"
        />
      ))}
      <text x={WX0 - 8} y={ky(1)} textAnchor="end" dominantBaseline="middle" fontSize={12} fontWeight={700} fill="var(--ink-soft)">
        1
      </text>
      <text x={WX0 - 8} y={ky(-1)} textAnchor="end" dominantBaseline="middle" fontSize={12} fontWeight={700} fill="var(--ink-soft)">
        −1
      </text>
      {tanda
        .filter((d) => d <= maksDeg)
        .map((d) => (
          <text
            key={d}
            x={kx(d)}
            y={CY + R + 34}
            textAnchor="middle"
            fontSize={11.5}
            fontWeight={700}
            fill="var(--ink-soft)"
          >
            {`${d}°`}
          </text>
        ))}

      {tampilCos > 0.02 && (
        <path
          d={jalur((d) => Math.cos(rad(d)))}
          fill="none"
          stroke="var(--m-b)"
          strokeWidth={nyalaCos ? 3.6 : 2.2}
          opacity={tampilCos}
          strokeLinejoin="round"
        />
      )}
      <path
        d={jalur((d) => Math.sin(rad(d)))}
        fill="none"
        stroke="var(--m-a)"
        strokeWidth={nyalaSin ? 4 : 2.8}
        strokeLinejoin="round"
      />

      {/* garis penghubung dari lingkaran ke titik gelombang */}
      <line
        x1={titik(theta).x}
        y1={titik(theta).y}
        x2={kx(theta)}
        y2={ky(Math.sin(rad(theta)))}
        stroke="var(--m-hi)"
        strokeWidth={1.3}
        strokeDasharray="4 5"
        opacity={0.75}
      />
      <circle cx={kx(theta)} cy={ky(Math.sin(rad(theta)))} r={5.5} fill="var(--m-a)" />
      <line
        x1={kx(theta)}
        y1={CY}
        x2={kx(theta)}
        y2={ky(Math.sin(rad(theta)))}
        stroke="var(--m-a)"
        strokeWidth={2.4}
        opacity={0.85}
      />
    </g>
  )
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const dasar = clamp(Math.round(p.theta ?? 40), 0, 360)

  const putarPenuh = step === 2 ? 360 * seg(t, 0.02, 0.98) : 0
  const putarDua = step === 5 ? 720 * seg(t, 0.02, 0.98) : 0
  const theta =
    step === 2 ? putarPenuh : step === 5 ? putarDua : step === 4 ? 40 + 140 * seg(t, 0.1, 0.9) : dasar

  const maksDeg = step >= 5 ? 720 : 360
  const tampilSegitiga = fase(step, t, 0)
  const tampilCos = fase(step, t, 3)
  const identitas = step >= 6

  const nyalaSin = sorot === 'sin' || sorot === 'y'
  const nyalaCos = sorot === 'cos' || sorot === 'x'

  const s = Math.sin(rad(theta))
  const c = Math.cos(rad(theta))

  return (
    <Svg w={W} h={H} maxH={440} label="Lingkaran satuan dan grafik sinus yang terbentuk dari perputaran titik">
      <Lingkaran
        theta={theta}
        tampilSegitiga={tampilSegitiga}
        tampilCos={tampilCos}
        nyalaSin={nyalaSin}
        nyalaCos={nyalaCos}
      />
      <Gelombang
        theta={theta}
        maksDeg={maksDeg}
        tampilCos={tampilCos}
        nyalaSin={nyalaSin}
        nyalaCos={nyalaCos}
      />

      {step <= 1 && (
        <Tag x={W / 2} y={40} warna="var(--m-a)" size={16}>
          {`sin ${fmt(Math.round(theta))}° = ${fmt(s, 3)} — dan itu persis tinggi titiknya`}
        </Tag>
      )}
      {step === 2 && (
        <Tag x={W / 2} y={40} warna="var(--ink-2)" size={16}>
          tingginya direkam terhadap sudut
        </Tag>
      )}
      {step === 3 && (
        <Tag x={W / 2} y={40} warna="var(--m-b)" size={16}>
          {`cos ${fmt(Math.round(theta))}° = ${fmt(c, 3)} — jarak mendatarnya`}
        </Tag>
      )}
      {step === 4 && (
        <Tag x={W / 2} y={40} warna="var(--m-hi)" size={16}>
          setelah 90°, tingginya mulai menurun
        </Tag>
      )}
      {step === 5 && (
        <Tag x={W / 2} y={40} warna="var(--m-ab)" size={16}>
          lewat 360°, titiknya kembali ke tempat semula — polanya berulang
        </Tag>
      )}
      {identitas && (
        <Tag x={W / 2} y={40} warna="var(--m-ab)" size={16}>
          {`${fmt(s * s, 3)} + ${fmt(c * c, 3)} = 1 — Pythagoras pada segitiga itu`}
        </Tag>
      )}
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const theta = clamp(Math.round(p.theta ?? 40), 0, 720)
  const s = Math.sin(rad(theta))
  const c = Math.cos(rad(theta))

  return (
    <Svg w={W} h={H} maxH={440} label="Lingkaran satuan dengan sudut yang bisa diputar bebas">
      <Lingkaran
        theta={theta}
        tampilSegitiga={1}
        tampilCos={1}
        nyalaSin={sorot === 'sin' || sorot === 'y'}
        nyalaCos={sorot === 'cos' || sorot === 'x'}
      />
      <Gelombang
        theta={theta}
        maksDeg={720}
        tampilCos={1}
        nyalaSin={sorot === 'sin' || sorot === 'y'}
        nyalaCos={sorot === 'cos' || sorot === 'x'}
      />
      <Tag x={W / 2} y={36} warna="var(--m-a)" size={16}>
        {`sin ${fmt(theta)}° = ${fmt(s, 4)}`}
      </Tag>
      <Tag x={W / 2} y={68} warna="var(--m-b)" size={16}>
        {`cos ${fmt(theta)}° = ${fmt(c, 4)}`}
      </Tag>
      <Tag x={W / 2} y={H - 18} warna="var(--m-ab)" size={15}>
        {`sin² + cos² = ${fmt(s * s + c * c, 4)}`}
      </Tag>
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'sin-cos-lingkaran',
  topicId: 'sma10-perbandingan-trigonometri-sudut-lancip-sinus',
  judul: 'Sinus dan kosinus',
  pertanyaan: 'Bagaimana segitiga bisa berubah menjadi gelombang?',
  tagline: 'Satu titik berputar di lingkaran. Bayangannya menggambar grafik sinus.',
  kelas: 10,
  domain: 'geometri',
  tags: ['sinus', 'kosinus', 'lingkaran satuan', 'trigonometri', 'gelombang'],

  tebak: {
    pertanyaan:
      'Pada lingkaran berjari-jari 1, sebuah titik berada di sudut θ. Menurutmu sin θ itu apa?',
    pilihan: [
      {
        id: 'a',
        label: 'Besar sudutnya sendiri',
        balasan:
          'Sudut dan sinus memang saling terkait, tetapi bukan hal yang sama. sin 90° bernilai 1, bukan 90.',
      },
      {
        id: 'b',
        label: 'Tinggi titik itu dari sumbu mendatar',
        benar: true,
        balasan:
          'Tepat. Karena sisi miringnya bernilai 1, perbandingan depan/miring menjadi tinggi dibagi 1 — yaitu tinggi itu sendiri.',
      },
      {
        id: 'c',
        label: 'Panjang busur dari titik nol',
        balasan:
          'Panjang busur justru ukuran sudut dalam radian. Sinus adalah ketinggian, bukan jarak sepanjang lingkaran.',
      },
    ],
    penutup:
      'Begitu sinus dibaca sebagai "ketinggian", gelombang sinus berhenti terasa misterius.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [{ key: 'theta', label: 'Sudut θ', min: 0, max: 360, step: 1, awal: 40, satuan: '°' }],
    roles: { sin: 'a', cos: 'b', y: 'a', x: 'b', satu: 'hi' },
    arti: {
      sin: 'Sinus — tinggi titik pada lingkaran satuan.',
      cos: 'Kosinus — jarak mendatar titik itu dari pusat.',
      y: 'Koordinat tegak titik.',
      x: 'Koordinat mendatar titik.',
      satu: 'Jari-jari lingkaran satuan, selalu bernilai 1. Inilah yang menyederhanakan semuanya.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Segitiga siku-siku di dalam lingkaran',
        narasi:
          'Tarik jari-jari ke sebuah titik, lalu turunkan garis tegak lurus ke sumbu mendatar. Terbentuk segitiga siku-siku dengan sisi miring sepanjang jari-jari.',
        durasi: 2000,
      },
      {
        id: 's1',
        judul: 'Jari-jarinya 1, jadi semuanya lebih sederhana',
        narasi:
          'Sinus adalah sisi depan dibagi sisi miring. Karena sisi miringnya 1, pembagian itu tidak mengubah apa pun — sin θ langsung sama dengan tinggi titiknya.',
        rumus: '[sin:sin θ] = depan / miring = [y:y] / [satu:1] = [y:y]',
        durasi: 2600,
      },
      {
        id: 's2',
        judul: 'Putar titiknya satu putaran',
        narasi:
          'Sambil titik berputar, tingginya kita catat di sebelah kanan. Naik sampai puncak, turun melewati nol, lalu ke bawah, lalu kembali.',
        durasi: 3400,
      },
      {
        id: 's3',
        judul: 'Kosinus adalah jarak mendatarnya',
        narasi:
          'Dengan alasan yang sama, cos θ sama dengan koordinat mendatar titik itu. Grafiknya berbentuk sama, hanya bergeser seperempat putaran.',
        rumus: '[cos:cos θ] = samping / miring = [x:x]',
        durasi: 2400,
      },
      {
        id: 's4',
        judul: 'Setelah 90°, tingginya menurun',
        narasi:
          'Titik terus berputar berlawanan arah jarum jam, tetapi tingginya sudah melewati puncak. Di situlah gelombang mulai membentuk lengkung turun.',
        durasi: 2400,
      },
      {
        id: 's5',
        judul: 'Setelah 360°, semuanya berulang',
        narasi:
          'Titiknya kembali ke tempat semula, jadi tingginya pun mengulang nilai yang sama. Karena itu grafik sinus tidak pernah berhenti berulang.',
        durasi: 3000,
      },
      {
        id: 's6',
        judul: 'Dan Pythagoras masih berlaku',
        narasi:
          'Segitiga tadi punya sisi tegak sin θ, sisi mendatar cos θ, dan sisi miring 1. Teorema Pythagoras langsung memberi identitas paling terkenal dalam trigonometri.',
        rumus: '[sin:sin^2 θ] + [cos:cos^2 θ] = [satu:1]',
        durasi: 2600,
      },
    ],
  },

  eksperimen: {
    judul: 'Putar sudutnya sendiri',
    ajakan:
      'Geser θ melewati 360°. Perhatikan garis putus-putus yang menghubungkan titik di lingkaran dengan titik di grafik.',
    params: [{ key: 'theta', label: 'Sudut θ', min: 0, max: 720, step: 1, awal: 40, satuan: '°' }],
    Visual: VisualEksperimen,
    temuan: (p) => {
      const theta = clamp(Math.round(p.theta ?? 40), 0, 720)
      const s = Math.sin(rad(theta))
      const c = Math.cos(rad(theta))
      const kuadran = Math.floor((theta % 360) / 90) + 1
      return (
        <p>
          Pada θ = {fmt(theta)}°, titiknya berada di kuadran {kuadran}:{' '}
          <strong>
            sin = {fmt(s, 3)}, cos = {fmt(c, 3)}
          </strong>
          . {s >= 0 ? 'Titiknya di atas sumbu, jadi sinusnya positif.' : 'Titiknya di bawah sumbu, jadi sinusnya negatif.'}{' '}
          {c >= 0 ? 'Ia juga di kanan pusat, jadi kosinusnya positif.' : 'Ia di kiri pusat, jadi kosinusnya negatif.'}{' '}
          Perhatikan sin² + cos² selalu bernilai 1 berapa pun sudutnya — itu Pythagoras, bukan
          kebetulan. Coba juga bandingkan θ dan θ + 360°: hasilnya sama persis.
        </p>
      )
    },
  },

  penjelasan: {
    SMP: (
      <>
        <p>
          Di segitiga siku-siku, sinus sebuah sudut adalah{' '}
          <strong>sisi depan dibagi sisi miring</strong>. Perbandingan ini tidak berubah walau
          segitiganya diperbesar atau diperkecil — karena itu ia layak diberi nama.
        </p>
        <p>
          Kalau segitiga itu digambar di dalam lingkaran berjari-jari 1, sisi miringnya bernilai 1.
          Membagi dengan 1 tidak mengubah apa pun, jadi <strong>sin θ = tinggi titiknya</strong>.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Lingkaran satuan memperluas arti sinus dan kosinus melampaui segitiga. Segitiga hanya
          sanggup menampung sudut antara 0° dan 90°, sedangkan sebuah titik bisa berputar sejauh apa
          pun. Dengan mendefinisikan
        </p>
        <p style={{ textAlign: 'center' }}>
          cos θ = absis titik, sin θ = ordinat titik
        </p>
        <p>
          kedua fungsi itu menjadi terdefinisi untuk semua bilangan real, termasuk sudut tumpul dan
          sudut negatif. Tanda pada tiap kuadran bukan hafalan: ia sekadar mengikuti letak titiknya.
        </p>
        <h4>Sifat yang langsung terbaca dari gambar</h4>
        <ul>
          <li>Periodisitas: sin(θ + 360°) = sin θ, karena titiknya kembali ke tempat yang sama.</li>
          <li>Identitas Pythagoras: sin²θ + cos²θ = 1, langsung dari segitiga bersisi miring 1.</li>
          <li>Sudut berelasi: sin(180° − θ) = sin θ, karena kedua titik punya ketinggian sama.</li>
          <li>Kesetaraan bentuk: cos θ = sin(θ + 90°), yaitu grafik yang sama tetapi bergeser.</li>
        </ul>
        <h4>Kenapa gelombang muncul di mana-mana</h4>
        <p>
          Setiap gerak melingkar beraturan yang diproyeksikan ke satu arah menghasilkan gerak
          harmonik sederhana. Karena itu bunyi, cahaya, arus listrik bolak-balik, dan ayunan bandul
          semuanya dimodelkan dengan sinus — bukan karena benda-benda itu berputar, melainkan karena
          persamaan geraknya berbentuk sama.
        </p>
        <p>
          Perlu diingat, satuan derajat hanyalah kesepakatan. Dalam kalkulus dipakai radian, karena
          hanya dengan radian berlaku d(sin x)/dx = cos x tanpa faktor tambahan.
        </p>
      </>
    ),
  },

  rumus: {
    src: '[sin:sin θ] = [y:y],  [cos:cos θ] = [x:x],  [sin:sin^2 θ] + [cos:cos^2 θ] = [satu:1]',
    roles: { sin: 'a', cos: 'b', y: 'a', x: 'b', satu: 'hi' },
    arti: {
      sin: 'Tinggi titik pada lingkaran satuan.',
      cos: 'Jarak mendatar titik dari pusat.',
      y: 'Ordinat titik — nilainya persis sama dengan sinus.',
      x: 'Absis titik — nilainya persis sama dengan kosinus.',
      satu: 'Jari-jari lingkaran satuan. Karena bernilai 1, identitas Pythagoras berbentuk sesederhana ini.',
    },
  },

  soal: [
    {
      id: 'sin-1',
      tipe: 'pilihan',
      topicId: 'sma10-perbandingan-trigonometri-sudut-lancip-sinus',
      kelas: 10,
      tingkat: 'mudah',
      konsep: 'sin-cos-lingkaran',
      pertanyaan: 'Berapa nilai sin 90°?',
      pilihan: [
        { id: 'a', label: '1', benar: true },
        { id: 'b', label: '90', diagnosa: 'Sinus bukan besar sudutnya. Nilainya tidak pernah lebih dari 1.' },
        { id: 'c', label: '0', diagnosa: 'Itu nilai cos 90°. Pada 90°, titiknya berada tepat di puncak lingkaran.' },
        { id: 'd', label: '½', diagnosa: 'Nilai ½ adalah sin 30°, bukan sin 90°.' },
      ],
      hint: [
        'Bayangkan titik pada lingkaran satuan di sudut 90°. Di mana letaknya?',
        'Titik itu berada tepat di atas pusat.',
        'Sinus adalah ketinggiannya, dan jari-jarinya 1.',
      ],
      pembahasan:
        'Pada 90°, titiknya berada di (0, 1). Karena sin θ adalah ordinatnya, sin 90° = 1. Sekaligus cos 90° = 0.',
    },
    {
      id: 'sin-2',
      tipe: 'benar-salah',
      topicId: 'sma10-perbandingan-trigonometri-sudut-lancip-sinus',
      kelas: 10,
      tingkat: 'sedang',
      konsep: 'sin-cos-lingkaran',
      pertanyaan: 'Nilai sin θ bisa lebih besar dari 1 apabila sudutnya cukup besar.',
      jawaban: false,
      diagnosa:
        'Sinus adalah ketinggian titik pada lingkaran berjari-jari 1. Titik itu tidak pernah bisa lebih tinggi dari jari-jarinya sendiri.',
      hint: [
        'Ingat arti geometris sinus pada lingkaran satuan.',
        'Seberapa tinggi titik pada lingkaran berjari-jari 1 bisa naik?',
        'Perhatikan juga grafiknya: apakah pernah melewati garis 1?',
      ],
      pembahasan:
        'Salah. Selalu berlaku −1 ≤ sin θ ≤ 1, karena sinus adalah ordinat titik pada lingkaran berjari-jari 1. Memperbesar sudut hanya membuat titiknya berputar lagi, bukan naik lebih tinggi.',
    },
    {
      id: 'sin-3',
      tipe: 'angka',
      topicId: 'sma10-perbandingan-trigonometri-sudut-lancip-sinus',
      kelas: 10,
      tingkat: 'sedang',
      konsep: 'sin-cos-lingkaran',
      pertanyaan:
        'Diketahui sin θ = 0,6 dan θ sudut lancip. Berapa nilai cos θ?',
      jawaban: 0.8,
      toleransi: 0.005,
      hint: [
        'Gunakan identitas yang berasal dari teorema Pythagoras.',
        'sin²θ + cos²θ = 1, jadi cos²θ = 1 − 0,36.',
        'Akarkan 0,64. Karena θ lancip, ambil nilai yang positif.',
      ],
      pembahasan:
        'cos²θ = 1 − 0,6² = 1 − 0,36 = 0,64, sehingga cos θ = 0,8. Ini segitiga 3-4-5 yang diskalakan menjadi 0,6-0,8-1.',
    },
    {
      id: 'sin-4',
      tipe: 'cocokkan',
      topicId: 'sma10-perbandingan-trigonometri-sudut-lancip-sinus',
      kelas: 10,
      tingkat: 'sedang',
      konsep: 'sin-cos-lingkaran',
      pertanyaan: 'Pasangkan tiap sudut dengan nilai sinusnya.',
      pasangan: [
        { kiri: 'sin 0°', kanan: '0' },
        { kiri: 'sin 30°', kanan: '0,5' },
        { kiri: 'sin 90°', kanan: '1' },
        { kiri: 'sin 180°', kanan: '0' },
        { kiri: 'sin 270°', kanan: '−1' },
      ],
      hint: [
        'Bayangkan letak titiknya pada lingkaran untuk setiap sudut.',
        'Pada 0° dan 180°, titiknya berada di sumbu mendatar — tingginya nol.',
        'Pada 270°, titiknya berada di titik terendah.',
      ],
      pembahasan:
        'Semua nilai ini bisa dibaca langsung dari letak titik pada lingkaran satuan, tanpa menghafal tabel: 0° dan 180° di sumbu mendatar (tinggi 0), 90° di puncak (1), 270° di dasar (−1).',
    },
    {
      id: 'sin-5',
      tipe: 'urutkan',
      topicId: 'sma10-perbandingan-trigonometri-sudut-lancip-sinus',
      kelas: 11,
      tingkat: 'sulit',
      konsep: 'sin-cos-lingkaran',
      pertanyaan: 'Susun alasan kenapa grafik sinus berulang setiap 360°.',
      langkah: [
        'sin θ didefinisikan sebagai ketinggian titik pada lingkaran satuan',
        'Menambah sudut sebesar 360° berarti berputar satu putaran penuh',
        'Setelah satu putaran penuh, titiknya kembali ke posisi yang sama',
        'Posisi yang sama berarti ketinggian yang sama',
        'Karena itu sin(θ + 360°) = sin θ untuk setiap θ',
      ],
      hint: [
        'Mulailah dari definisi sinus, bukan dari grafiknya.',
        'Yang membuat nilainya berulang adalah posisi titik, bukan bentuk grafiknya.',
      ],
      pembahasan:
        'Periodisitas bukan sifat tambahan yang perlu dihafal — ia akibat langsung dari kenyataan bahwa lingkaran itu tertutup.',
    },
  ],

  lanjut: ['pythagoras', 'sudut-segitiga', 'turunan-kemiringan'],
}

export default konsep
