/* ============================================================
   KONSEP — Kenapa jumlah sudut segitiga selalu 180°?
   Kelas 7 · Geometri

   Gagasan pembuktian: tarik garis SEJAJAR alas yang melewati
   puncak. Dua sudut alas berpindah ke puncak sebagai sudut dalam
   berseberangan (besarnya sama persis). Di puncak, ketiga sudut
   itu berjajar memenuhi garis lurus — dan sudut lurus besarnya 180°.

   Kejujuran matematis: bukti ini bergantung pada postulat
   kesejajaran. Pada bola atau bidang hiperbolik, jumlahnya bukan 180°.
   Hal itu disebutkan pada penjelasan tingkat SMA.
   ============================================================ */

import { Svg, Tag } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt, rad } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

const W = 690
const H = 430

type Titik = [number, number]

/** Sudut arah dari titik a ke titik b, dalam radian koordinat layar. */
const arah = (a: Titik, b: Titik) => Math.atan2(b[1] - a[1], b[0] - a[0])

/** Normalkan selisih sudut ke rentang (−π, π]. */
function selisih(dari: number, ke: number) {
  let d = ke - dari
  while (d > Math.PI) d -= 2 * Math.PI
  while (d < -Math.PI) d += 2 * Math.PI
  return d
}

/** Juring sudut (wedge) sebagai path tertutup. */
function juringSudut(c: Titik, r: number, a1: number, a2: number) {
  const d = selisih(a1, a2)
  const a2n = a1 + d
  const x1 = c[0] + r * Math.cos(a1)
  const y1 = c[1] + r * Math.sin(a1)
  const x2 = c[0] + r * Math.cos(a2n)
  const y2 = c[1] + r * Math.sin(a2n)
  const sweep = d > 0 ? 1 : 0
  return `M ${c[0].toFixed(1)} ${c[1].toFixed(1)} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 ${sweep} ${x2.toFixed(1)} ${y2.toFixed(1)} Z`
}

type Kotak = { x0: number; x1: number; y0: number; y1: number }

/**
 * Bangun segitiga dari dua sudut alas, lalu perbesar atau perkecil
 * (tanpa mengubah sudutnya) supaya seluruhnya muat di dalam kotak.
 * Alas selalu mendatar pada garis y1. Tanpa langkah ini puncak segitiga
 * yang tinggi-ramping keluar dari panggung dan terpotong.
 */
function segitiga(alfa: number, beta: number, kotak: Kotak) {
  // Segitiga satuan: A = (0, 0), B = (1, 0). Aturan sinus: AP = sin β / sin(α + β).
  const ap = Math.sin(rad(beta)) / Math.sin(rad(alfa + beta))
  const ux = ap * Math.cos(rad(alfa))
  const uy = ap * Math.sin(rad(alfa))
  const xMin = Math.min(0, ux)
  const xMax = Math.max(1, ux)
  const lebar = kotak.x1 - kotak.x0
  const skala = Math.min(lebar / (xMax - xMin), (kotak.y1 - kotak.y0) / uy)
  const x0 = kotak.x0 + (lebar - skala * (xMax - xMin)) / 2 - skala * xMin
  const A: Titik = [x0, kotak.y1]
  const B: Titik = [x0 + skala, kotak.y1]
  const P: Titik = [x0 + skala * ux, kotak.y1 - skala * uy]
  return { A, B, P, gamma: 180 - alfa - beta }
}

/** Pusat lingkaran dalam: titik temu ketiga garis bagi sudut. */
function pusatDalam(A: Titik, B: Titik, P: Titik): Titik {
  const a = Math.hypot(B[0] - P[0], B[1] - P[1])
  const b = Math.hypot(A[0] - P[0], A[1] - P[1])
  const c = Math.hypot(A[0] - B[0], A[1] - B[1])
  const k = a + b + c
  return [(a * A[0] + b * B[0] + c * P[0]) / k, (a * A[1] + b * B[1] + c * P[1]) / k]
}

/**
 * Jarak label sudut dari titik sudutnya, di sepanjang garis bagi sudut.
 * Paling jauh separuh jalan ke pusat lingkaran dalam, supaya label tetap
 * di dalam segitiga dan tidak menabrak label sudut lain.
 */
const jarakLabel = (v: Titik, I: Titik, maks: number) =>
  Math.min(maks, 0.5 * Math.hypot(I[0] - v[0], I[1] - v[1]))

/** Titik label sudut di v: pada garis bagi (arah ke pusat lingkaran dalam). */
function letakLabel(v: Titik, I: Titik, maks: number): Titik {
  const d = Math.hypot(I[0] - v[0], I[1] - v[1]) || 1
  const t = jarakLabel(v, I, maks)
  return [v[0] + ((I[0] - v[0]) / d) * t, v[1] + ((I[1] - v[1]) / d) * t]
}

const WARNA = ['var(--m-a)', 'var(--m-b)', 'var(--m-ab)']

/* ---------------- Sudut yang dipakai bersama gambar dan teks ---------------- */

/**
 * Ketiga sudut pada mode bongkar. Penggeser sudut kanan sengaja dibatasi
 * supaya sudut puncak tidak menyusut habis dan segitiganya masih bisa
 * digambar. Gambar DAN teks langkah memakai fungsi ini, jadi angka di
 * narasi tidak pernah berbeda dengan angka di gambar.
 */
function sudutBongkar(p: Record<string, number>) {
  const alfa = clamp(Math.round(p.alfa ?? 62), 20, 120)
  const betaGeser = Math.round(p.beta ?? 48)
  const beta = clamp(betaGeser, 20, 155 - alfa)
  return { alfa, beta, betaGeser, gamma: 180 - alfa - beta, dibatasi: beta !== betaGeser }
}

/** Sama untuk mode eksperimen, yang rentang penggesernya lebih lebar. */
function sudutEksperimen(p: Record<string, number>) {
  const alfa = clamp(Math.round(p.alfa ?? 62), 15, 140)
  const betaGeser = Math.round(p.beta ?? 48)
  const beta = clamp(betaGeser, 15, 160 - alfa)
  return { alfa, beta, betaGeser, gamma: 180 - alfa - beta, dibatasi: beta !== betaGeser }
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const { alfa, beta, gamma, dibatasi } = sudutBongkar(p)
  const { A, B, P } = segitiga(alfa, beta, { x0: 150, x1: 530, y0: 72, y1: 320 })
  const I = pusatDalam(A, B, P)

  const garisSejajar = fase(step, t, 1)
  const pindahA = step >= 2 ? (step === 2 ? seg(t, 0.1, 0.92) : 1) : 0
  const pindahB = step >= 3 ? (step === 3 ? seg(t, 0.1, 0.92) : 1) : 0
  const lurus = fase(step, t, 4)
  const selesai = step >= 5

  const R = 40
  const kiri: Titik = [Math.min(A[0], P[0]) - 130, P[1]]
  const kanan: Titik = [Math.max(B[0], P[0]) + 130, P[1]]

  // Sudut di A: dari arah A→B sampai arah A→P.
  const aA1 = arah(A, B)
  const aA2 = arah(A, P)
  // Sudut di B: dari arah B→P sampai arah B→A.
  const aB1 = arah(B, P)
  const aB2 = arah(B, A)

  // Sudut dalam berseberangan adalah sudut alas yang diputar setengah
  // putaran: A→B menjadi P→kiri, A→P menjadi P→A (begitu pula di B).
  // KEDUA kaki juring diputar dengan besar yang SAMA, jadi juringnya
  // bergerak kaku dan tidak pernah melebar di tengah animasi. (Menormalkan
  // tiap kaki sendiri-sendiri bisa memutar satu kaki +180° dan kaki lain
  // −180°, sehingga juring sempat tampak jauh lebih besar.)
  const putarA = Math.PI * pindahA // searah jarum jam di layar
  const putarB = -Math.PI * pindahB // cermin dari putaran A

  const lerpT = (a: Titik, b: Titik, s: number): Titik => [
    a[0] + (b[0] - a[0]) * s,
    a[1] + (b[1] - a[1]) * s,
  ]

  const nyalaA = sorot === 'a'
  const nyalaB = sorot === 'b'
  const nyalaC = sorot === 'c'
  const nyalaLurus = sorot === 'lurus'

  const pusatA = lerpT(A, P, pindahA)
  const pusatB = lerpT(B, P, pindahB)

  // Label ikut berpindah bersama juringnya, di tengah bukaan juring.
  const tengahA = aA1 + selisih(aA1, aA2) / 2 + putarA
  const tengahB = aB1 + selisih(aB1, aB2) / 2 + putarB
  const jauhA = jarakLabel(A, I, R + 24) + (R + 24 - jarakLabel(A, I, R + 24)) * pindahA
  const jauhB = jarakLabel(B, I, R + 24) + (R + 24 - jarakLabel(B, I, R + 24)) * pindahB
  const labelC = letakLabel(P, I, R + 28)

  return (
    <Svg w={W} h={H} maxH={440} label="Segitiga dengan garis sejajar melalui puncaknya">
      {/* garis sejajar alas lewat puncak */}
      {garisSejajar > 0 && (
        <g opacity={garisSejajar}>
          <line
            x1={kiri[0]}
            y1={P[1]}
            x2={kanan[0]}
            y2={P[1]}
            stroke={nyalaLurus || lurus > 0.3 ? 'var(--m-hi)' : 'var(--ink-3)'}
            strokeWidth={nyalaLurus || lurus > 0.3 ? 4 : 2.4}
            strokeDasharray={lurus > 0.3 ? undefined : '8 6'}
          />
          {/* tanda sejajar */}
          {[
            [kiri[0] + 40, P[1]],
            [(A[0] + B[0]) / 2 - 60, A[1]],
          ].map(([mx, my], i) => (
            <g key={i}>
              <path
                d={`M ${mx - 6} ${my - 7} l 7 7 l -7 7`}
                fill="none"
                stroke="var(--ink-3)"
                strokeWidth={2}
              />
            </g>
          ))}
        </g>
      )}

      {/* segitiga */}
      <polygon
        points={`${A[0]},${A[1]} ${B[0]},${B[1]} ${P[0]},${P[1]}`}
        fill="var(--m-ghost)"
        stroke="var(--ink)"
        strokeWidth={2.6}
        strokeLinejoin="round"
      />

      {/* alas diperpanjang sedikit agar kesejajaran terlihat */}
      <line
        x1={A[0] - 100}
        y1={A[1]}
        x2={B[0] + 100}
        y2={A[1]}
        stroke="var(--ink-3)"
        strokeWidth={1.6}
        opacity={garisSejajar * 0.7}
      />

      {/* sudut puncak (gamma) — selalu di tempatnya */}
      <path
        d={juringSudut(P, R, arah(P, A), arah(P, B))}
        fill={WARNA[2]}
        fillOpacity={nyalaC ? 0.6 : 0.34}
        stroke={WARNA[2]}
        strokeWidth={2}
      />

      {/* sudut A, berpindah ke puncak */}
      <path
        d={juringSudut(pusatA, R, aA1 + putarA, aA2 + putarA)}
        fill={WARNA[0]}
        fillOpacity={nyalaA ? 0.6 : 0.34}
        stroke={WARNA[0]}
        strokeWidth={2}
      />

      {/* sudut B, berpindah ke puncak */}
      <path
        d={juringSudut(pusatB, R, aB1 + putarB, aB2 + putarB)}
        fill={WARNA[1]}
        fillOpacity={nyalaB ? 0.6 : 0.34}
        stroke={WARNA[1]}
        strokeWidth={2}
      />

      {/* label sudut */}
      <Tag
        x={pusatA[0] + Math.cos(tengahA) * jauhA}
        y={pusatA[1] + Math.sin(tengahA) * jauhA}
        warna={WARNA[0]}
        size={16}
      >
        {`${fmt(alfa)}°`}
      </Tag>
      <Tag
        x={pusatB[0] + Math.cos(tengahB) * jauhB}
        y={pusatB[1] + Math.sin(tengahB) * jauhB}
        warna={WARNA[1]}
        size={16}
      >
        {`${fmt(beta)}°`}
      </Tag>
      {/* label sudut puncak di garis bagi sudutnya, jadi tetap di dalam segitiga */}
      <Tag x={labelC[0]} y={labelC[1]} warna={WARNA[2]} size={16}>
        {`${fmt(gamma)}°`}
      </Tag>

      {/* penggeser sudut kanan bisa menunjuk nilai yang tidak mungkin digambar */}
      {dibatasi && (
        <Tag x={W / 2} y={354} warna="var(--ink-2)" size={13}>
          {`sudut kanan dibatasi menjadi ${fmt(beta)}° agar sudut puncak tetap terlihat`}
        </Tag>
      )}

      {/* keterangan tiap tahap */}
      {step === 1 && (
        <Tag x={W / 2} y={44} warna="var(--ink-2)" size={16}>
          garis baru ini sejajar dengan alas
        </Tag>
      )}
      {step === 2 && (
        <Tag x={W / 2} y={44} warna={WARNA[0]} size={16}>
          sudut dalam berseberangan — besarnya sama persis
        </Tag>
      )}
      {step === 3 && (
        <Tag x={W / 2} y={44} warna={WARNA[1]} size={16}>
          sudut satunya berpindah dengan alasan yang sama
        </Tag>
      )}
      {lurus > 0.3 && (
        <Tag x={W / 2} y={44} warna="var(--m-hi)" size={17}>
          ketiganya memenuhi satu garis lurus
        </Tag>
      )}
      {selesai && (
        <Tag x={W / 2} y={H - 20} warna="var(--m-hi)" size={19}>
          {`${fmt(alfa)}° + ${fmt(beta)}° + ${fmt(gamma)}° = 180°`}
        </Tag>
      )}
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const { alfa, beta, gamma } = sudutEksperimen(p)
  const { A, B, P } = segitiga(alfa, beta, { x0: 150, x1: 530, y0: 14, y1: 250 })
  const I = pusatDalam(A, B, P)
  const R = 36
  const labelA = letakLabel(A, I, R + 22)
  const labelB = letakLabel(B, I, R + 22)
  const labelC = letakLabel(P, I, R + 22)

  // Setengah lingkaran yang menampung ketiga sudut berjajar.
  const bx = W / 2
  const by = 400
  const rr = 92
  const potong = [alfa, beta, gamma]
  let mulai = Math.PI // mulai dari arah kiri
  const juring = potong.map((s, i) => {
    const a1 = mulai
    const a2 = mulai + rad(s)
    mulai = a2
    return (
      <path
        key={i}
        d={juringSudut([bx, by], rr, a1, a2)}
        fill={WARNA[i]}
        fillOpacity={
          (i === 0 && sorot === 'a') || (i === 1 && sorot === 'b') || (i === 2 && sorot === 'c')
            ? 0.65
            : 0.36
        }
        stroke={WARNA[i]}
        strokeWidth={1.8}
      />
    )
  })

  return (
    <Svg w={W} h={H} maxH={440} label="Segitiga yang bisa diubah sudutnya, dengan ketiga sudut disusun berjajar">
      <polygon
        points={`${A[0]},${A[1]} ${B[0]},${B[1]} ${P[0]},${P[1]}`}
        fill="var(--m-ghost)"
        stroke="var(--ink)"
        strokeWidth={2.6}
        strokeLinejoin="round"
      />
      <path
        d={juringSudut(A, R, arah(A, B), arah(A, P))}
        fill={WARNA[0]}
        fillOpacity={sorot === 'a' ? 0.62 : 0.34}
        stroke={WARNA[0]}
        strokeWidth={2}
      />
      <path
        d={juringSudut(B, R, arah(B, P), arah(B, A))}
        fill={WARNA[1]}
        fillOpacity={sorot === 'b' ? 0.62 : 0.34}
        stroke={WARNA[1]}
        strokeWidth={2}
      />
      <path
        d={juringSudut(P, R, arah(P, A), arah(P, B))}
        fill={WARNA[2]}
        fillOpacity={sorot === 'c' ? 0.62 : 0.34}
        stroke={WARNA[2]}
        strokeWidth={2}
      />
      {/* label di garis bagi tiap sudut, jadi tetap di dalam segitiga */}
      <Tag x={labelA[0]} y={labelA[1]} warna={WARNA[0]} size={15}>
        {`${fmt(alfa)}°`}
      </Tag>
      <Tag x={labelB[0]} y={labelB[1]} warna={WARNA[1]} size={15}>
        {`${fmt(beta)}°`}
      </Tag>
      <Tag x={labelC[0]} y={labelC[1]} warna={WARNA[2]} size={15}>
        {`${fmt(gamma)}°`}
      </Tag>

      {/* ketiga sudut disusun berjajar */}
      {juring}
      <line x1={bx - rr - 24} y1={by} x2={bx + rr + 24} y2={by} stroke="var(--m-hi)" strokeWidth={3} />
      <Tag x={bx} y={by + 22} warna="var(--m-hi)" size={15}>
        selalu pas membentuk sudut lurus = 180°
      </Tag>
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'sudut-segitiga',
  topicId: 'smp7-jumlah-sudut-segitiga-dan-sudut',
  judul: 'Jumlah sudut segitiga',
  pertanyaan: 'Kenapa jumlah sudut segitiga selalu 180°?',
  tagline: 'Sobek ketiga sudutnya, satukan. Selalu membentuk garis lurus. Selalu.',
  kelas: 7,
  domain: 'geometri',
  tags: ['segitiga', 'sudut', 'garis sejajar', 'sudut berseberangan'],

  tebak: {
    pertanyaan:
      'Sebuah segitiga dibuat sangat gepeng — hampir mendatar. Menurutmu jumlah ketiga sudutnya...',
    pilihan: [
      {
        id: 'a',
        label: 'Mengecil',
        balasan:
          'Dua sudutnya memang mengecil sampai hampir nol. Tapi coba perhatikan sudut yang di tengah: ia justru melebar mendekati 180°, dan persis menutup kekurangan itu.',
      },
      {
        id: 'b',
        label: 'Tetap 180°',
        benar: true,
        balasan:
          'Betul. Bentuk segitiganya boleh apa saja — gepeng, lancip, tumpul — jumlah sudutnya tidak pernah bergeser.',
      },
      {
        id: 'c',
        label: 'Membesar',
        balasan:
          'Sudut yang di tengah memang melebar mendekati 180°, tetapi dua sudut lainnya menyusut hampir nol dalam jumlah yang persis sama.',
      },
    ],
    penutup:
      'Yang menarik: ini bukan kebetulan yang berlaku untuk kebanyakan segitiga. Ada alasan yang memaksanya.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      { key: 'alfa', label: 'Sudut kiri', min: 20, max: 110, step: 1, awal: 62, satuan: '°' },
      { key: 'beta', label: 'Sudut kanan', min: 20, max: 110, step: 1, awal: 48, satuan: '°' },
    ],
    roles: { a: 'a', b: 'b', c: 'ab', lurus: 'hi' },
    arti: {
      a: 'Sudut di pojok kiri alas.',
      b: 'Sudut di pojok kanan alas.',
      c: 'Sudut di puncak.',
      lurus: 'Sudut lurus, yaitu sudut sepanjang garis lurus — besarnya selalu 180°.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Segitiga apa saja',
        narasi: (p) => {
          const { alfa, beta, gamma, betaGeser, dibatasi } = sudutBongkar(p)
          const ekor = dibatasi
            ? `Penggeser sudut kanan menunjuk ${fmt(betaGeser)}°, tetapi gambar memakai ${fmt(beta)}° supaya sudut puncaknya tidak terlalu sempit untuk digambar.`
            : 'Geser kedua sudut alasnya sesukamu — yang ingin kita ketahui: apakah jumlah ketiganya selalu sama, dan kenapa?'
          return `Tiga sudutnya, ${fmt(alfa)}°, ${fmt(beta)}°, dan ${fmt(gamma)}°, diberi warna berbeda. ${ekor}`
        },
        rumus: (p) => {
          const { alfa, beta, gamma } = sudutBongkar(p)
          return `[a:${fmt(alfa)}°] + [b:${fmt(beta)}°] + [c:${fmt(gamma)}°] = ?`
        },
        durasi: 1800,
      },
      {
        id: 's1',
        judul: 'Tarik garis sejajar alas lewat puncak',
        narasi:
          'Garis putus-putus ini sejajar dengan alas segitiga. Hanya itu yang kita tambahkan — tidak ada yang diubah dari segitiganya.',
        durasi: 2000,
      },
      {
        id: 's2',
        judul: 'Sudut kiri berpindah ke puncak',
        narasi: (p) => {
          const { alfa } = sudutBongkar(p)
          return `Karena kedua garis sejajar, sudut kiri ${fmt(alfa)}° dan sudut di puncak ini adalah sudut dalam berseberangan. Besarnya pasti sama, jadi yang naik ke puncak juga tepat ${fmt(alfa)}°.`
        },
        rumus: (p) => {
          const { alfa } = sudutBongkar(p)
          return `[a:${fmt(alfa)}°] di alas = [a:${fmt(alfa)}°] di puncak`
        },
        durasi: 2400,
      },
      {
        id: 's3',
        judul: 'Sudut kanan juga',
        narasi: (p) => {
          const { alfa, beta, gamma } = sudutBongkar(p)
          return `Alasan yang sama berlaku untuk sisi satunya, jadi ${fmt(beta)}° ikut naik ke puncak. Sekarang ketiga sudut segitiga — ${fmt(alfa)}°, ${fmt(beta)}°, dan ${fmt(gamma)}° — berkumpul di satu titik.`
        },
        rumus: (p) => {
          const { beta } = sudutBongkar(p)
          return `[b:${fmt(beta)}°] di alas = [b:${fmt(beta)}°] di puncak`
        },
        durasi: 2400,
      },
      {
        id: 's4',
        judul: 'Ketiganya memenuhi garis lurus',
        narasi: (p) => {
          const { alfa, beta, gamma } = sudutBongkar(p)
          return `Di puncak, ${fmt(alfa)}°, ${fmt(beta)}°, dan ${fmt(gamma)}° berjajar tanpa celah dan tanpa tumpang tindih. Bersama-sama ketiganya membentuk sudut lurus di sepanjang garis sejajar tadi.`
        },
        durasi: 2200,
      },
      {
        id: 's5',
        judul: 'Dan sudut lurus besarnya 180°',
        narasi: (p) => {
          const { alfa, beta, gamma } = sudutBongkar(p)
          return `Jadi ${fmt(alfa)}° + ${fmt(beta)}° + ${fmt(gamma)}° = 180°, dan itu bukan kebetulan. Geser sudutnya ke mana pun: ketiganya tetap harus memenuhi satu garis lurus.`
        },
        rumus: (p) => {
          const { alfa, beta, gamma } = sudutBongkar(p)
          return `[a:${fmt(alfa)}°] + [b:${fmt(beta)}°] + [c:${fmt(gamma)}°] = [lurus:180°]`
        },
        durasi: 2200,
      },
    ],
  },

  eksperimen: {
    judul: 'Ubah bentuk segitiganya',
    ajakan:
      'Setengah lingkaran di bawah menyusun ketiga sudut itu berjajar. Perhatikan: ia selalu terisi penuh, tidak pernah kurang dan tidak pernah lebih.',
    params: [
      { key: 'alfa', label: 'Sudut kiri', min: 15, max: 130, step: 1, awal: 62, satuan: '°' },
      { key: 'beta', label: 'Sudut kanan', min: 15, max: 130, step: 1, awal: 48, satuan: '°' },
    ],
    Visual: VisualEksperimen,
    temuan: (p) => {
      const { alfa, beta, gamma, betaGeser, dibatasi } = sudutEksperimen(p)
      const jenis =
        Math.max(alfa, beta, gamma) > 90
          ? 'tumpul'
          : Math.max(alfa, beta, gamma) === 90
            ? 'siku-siku'
            : 'lancip'
      return (
        <p>
          <strong>
            {fmt(alfa)}° + {fmt(beta)}° + {fmt(gamma)}° = 180°
          </strong>
          . Segitiga ini {jenis}.{' '}
          {dibatasi &&
            `Penggeser sudut kanan menunjuk ${fmt(betaGeser)}°, tetapi gambar memakai ${fmt(beta)}°. ${
              alfa + betaGeser >= 180
                ? `Dua sudut yang jumlahnya sudah ${fmt(alfa + betaGeser)}° tidak menyisakan tempat untuk sudut ketiga — segitiga seperti itu tidak ada.`
                : 'Sisa untuk sudut ketiga akan terlalu sempit untuk digambar.'
            } `}
          {jenis === 'tumpul'
            ? 'Karena satu sudutnya melebihi 90°, dua sudut lainnya hanya kebagian sisa kurang dari 90° — tidak mungkin ada dua sudut tumpul dalam satu segitiga.'
            : dibatasi
              ? ''
              : 'Coba perbesar salah satu sudut sampai melewati 90°: sudut ketiga langsung menyusut sebanyak yang sama untuk menjaga jumlahnya tetap 180°.'}{' '}
          Perhatikan juga bahwa sudut ketiga tidak pernah bisa kamu atur sendiri — ia selalu
          ditentukan oleh dua sudut lainnya.
        </p>
      )
    },
  },

  penjelasan: {
    SMP: (
      <>
        <p>
          Buktinya hanya memerlukan satu bahan: <strong>garis yang sejajar alas dan melewati
          puncak.</strong>
        </p>
        <p>
          Ketika dua garis sejajar dipotong oleh sebuah garis lain, terbentuk pasangan{' '}
          <strong>sudut dalam berseberangan</strong> yang besarnya sama. Sisi kiri segitiga adalah
          garis pemotong itu, sehingga sudut kiri alas sama besar dengan sudut di puncak pada sisi
          kiri. Hal yang sama berlaku untuk sisi kanan.
        </p>
        <p>
          Akibatnya, ketiga sudut segitiga berkumpul di puncak dan berjajar tepat memenuhi garis
          lurus. Karena sudut lurus besarnya 180°, jumlah ketiga sudut segitiga juga 180°.
        </p>
        <h4>Akibat yang langsung terpakai</h4>
        <ul>
          <li>Sebuah segitiga tidak mungkin punya dua sudut siku-siku atau dua sudut tumpul.</li>
          <li>Pada segitiga siku-siku, dua sudut lainnya pasti berjumlah 90°.</li>
          <li>Pada segitiga sama sisi, ketiga sudutnya masing-masing 60°.</li>
          <li>Sudut luar segitiga sama dengan jumlah dua sudut dalam yang tidak berdampingan.</li>
        </ul>
        <h4>Untuk segi banyak lainnya</h4>
        <p>
          Segi-n mana pun bisa dipotong menjadi (n − 2) segitiga, sehingga jumlah sudut dalamnya
          (n − 2) × 180°. Segi empat 360°, segi lima 540°, dan seterusnya.
        </p>
      </>
    ),
    SD: (
      <>
        <p>
          Coba gambar segitiga di kertas, lalu sobek ketiga pojoknya. Susun ketiga pojok itu
          berjajar dengan ujung-ujungnya bertemu.
        </p>
        <p>
          Hasilnya selalu <strong>garis lurus</strong> — tidak peduli segitiga apa yang kamu gambar,
          besar atau kecil, gemuk atau kurus.
        </p>
        <p>Dan setengah putaran penuh besarnya 180 derajat.</p>
        <p>
          Menyobek kertas menunjukkan <em>hasilnya</em>, tetapi belum menjelaskan <em>kenapa</em>{' '}
          selalu begitu. Alasannya ada pada garis sejajar yang dibongkar di atas.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Bukti ini bertumpu pada <strong>postulat kesejajaran</strong> Euclid: melalui sebuah titik
          di luar garis, ada tepat satu garis yang sejajar dengan garis itu. Tanpa postulat tersebut,
          kesamaan sudut dalam berseberangan tidak bisa dijamin.
        </p>
        <p>
          Karena itu "180°" bukan kebenaran mutlak, melainkan ciri khas <em>geometri datar</em>.
          Pada geometri lain hasilnya berbeda:
        </p>
        <ul>
          <li>
            <strong>Geometri bola</strong> (misalnya di permukaan Bumi, dengan sisi-sisi segitiga
            berupa busur lingkaran besar — "garis lurus" versi bola): jumlah sudut selalu{' '}
            <em>lebih dari</em> 180°. Segitiga dari kutub utara ke dua titik di khatulistiwa bahkan
            bisa memiliki tiga sudut siku-siku, jumlahnya 270°.
          </li>
          <li>
            <strong>Geometri hiperbolik</strong>: jumlahnya selalu <em>kurang dari</em> 180°.
          </li>
        </ul>
        <p>
          Kelebihan sudut di atas 180° pada bola bahkan sebanding dengan luas segitiganya (teorema
          Girard). Jadi pertanyaan "kenapa 180°" sebenarnya berujung pada pertanyaan yang lebih
          dalam: seperti apa bentuk ruang tempat kita menggambar.
        </p>
      </>
    ),
  },

  rumus: {
    src: '[a:α] + [b:β] + [c:γ] = [lurus:180°]',
    roles: { a: 'a', b: 'b', c: 'ab', lurus: 'hi' },
    arti: {
      a: 'Sudut pertama.',
      b: 'Sudut kedua.',
      c: 'Sudut ketiga — nilainya selalu terpaksa mengikuti dua sudut lainnya.',
      lurus: 'Besar sudut lurus. Muncul karena ketiga sudut itu berjajar memenuhi satu garis.',
    },
  },

  soal: [
    (rnd) => {
      const a = 30 + Math.floor(rnd() * 60)
      const b = 25 + Math.floor(rnd() * (140 - a))
      return {
        id: 'sud-1',
        tipe: 'angka',
        topicId: 'smp7-jumlah-sudut-segitiga-dan-sudut',
        kelas: 7,
        tingkat: 'mudah',
        konsep: 'sudut-segitiga',
        pertanyaan: `Dua sudut sebuah segitiga adalah ${a}° dan ${b}°. Berapa besar sudut ketiganya?`,
        jawaban: 180 - a - b,
        satuan: '°',
        toleransi: 1e-9,
        hint: [
          'Jumlah ketiga sudut segitiga selalu tetap. Berapa nilainya?',
          `Jumlahkan dulu dua sudut yang diketahui: ${a} + ${b} = ${a + b}.`,
          `Kurangkan dari 180: 180 − ${a + b}.`,
        ],
        pembahasan: `Sudut ketiga = 180° − ${a}° − ${b}° = ${180 - a - b}°.`,
      }
    },
    {
      id: 'sud-2',
      tipe: 'benar-salah',
      topicId: 'smp7-jumlah-sudut-segitiga-dan-sudut',
      kelas: 7,
      tingkat: 'sedang',
      konsep: 'sudut-segitiga',
      pertanyaan: 'Ada segitiga yang memiliki dua sudut siku-siku.',
      jawaban: false,
      diagnosa:
        'Dua sudut siku-siku saja sudah menghabiskan 90° + 90° = 180°. Tidak ada sisa untuk sudut ketiga, padahal setiap sudut segitiga harus lebih besar dari nol.',
      hint: [
        'Hitung jumlah dua sudut siku-siku.',
        'Berapa yang tersisa untuk sudut ketiga?',
        'Apakah sudut sebesar 0° mungkin membentuk segitiga?',
      ],
      pembahasan:
        'Salah. Dua sudut siku-siku sudah berjumlah 180°, sehingga sudut ketiga harus 0° — dan itu bukan segitiga. Dua sisi yang sama-sama tegak lurus alas saling sejajar, jadi tidak pernah bertemu untuk membentuk puncak.',
    },
    {
      id: 'sud-3',
      tipe: 'pilihan',
      topicId: 'smp7-jumlah-sudut-segitiga-dan-sudut',
      kelas: 8,
      tingkat: 'sedang',
      konsep: 'sudut-segitiga',
      pertanyaan:
        'Pada sebuah segitiga siku-siku, salah satu sudut lancipnya 35°. Berapa besar sudut lancip yang lain?',
      pilihan: [
        { id: 'a', label: '55°', benar: true },
        {
          id: 'b',
          label: '145°',
          diagnosa: 'Kamu mengurangkan 35 dari 180, tetapi lupa bahwa satu sudutnya sudah terpakai 90°.',
        },
        {
          id: 'c',
          label: '65°',
          diagnosa: 'Sepertinya 100 yang dikurangi, bukan 90. Jumlah dua sudut lancip pada segitiga siku-siku adalah 90°.',
        },
        { id: 'd', label: '35°', diagnosa: 'Kedua sudut lancip hanya sama besar bila keduanya 45°.' },
      ],
      hint: [
        'Satu sudutnya sudah 90°. Berapa sisa untuk dua sudut lainnya?',
        '180° − 90° = 90°, dan sisa itu adalah jumlah kedua sudut lancip (tidak harus sama besar).',
        'Jadi 90° − 35°.',
      ],
      pembahasan:
        'Pada segitiga siku-siku, kedua sudut lancip selalu berjumlah 90°. Jadi sudut yang lain 90° − 35° = 55°.',
    },
    {
      id: 'sud-4',
      tipe: 'urutkan',
      topicId: 'smp7-jumlah-sudut-segitiga-dan-sudut',
      kelas: 8,
      tingkat: 'sulit',
      konsep: 'sudut-segitiga',
      pertanyaan: 'Susun kembali alur pembuktian jumlah sudut segitiga.',
      langkah: [
        'Gambar garis yang sejajar alas dan melewati puncak',
        'Sisi-sisi segitiga memotong kedua garis sejajar itu',
        'Sudut dalam berseberangan sama besar, sehingga kedua sudut alas berpindah ke puncak',
        'Ketiga sudut kini berjajar memenuhi satu garis lurus',
        'Sudut lurus besarnya 180°, jadi jumlah ketiga sudut juga 180°',
      ],
      hint: [
        'Bukti dimulai dengan menambahkan sesuatu ke gambar.',
        'Sifat sudut berseberangan baru bisa dipakai setelah ada dua garis sejajar.',
      ],
      pembahasan:
        'Kunci buktinya adalah garis sejajar. Tanpanya, sudut alas tidak punya alasan untuk sama besar dengan sudut di puncak.',
    },
    (rnd) => {
      const n = 4 + Math.floor(rnd() * 6)
      return {
        id: 'sud-5',
        tipe: 'angka',
        topicId: 'smp7-jumlah-sudut-segitiga-dan-sudut',
        kelas: 8,
        tingkat: 'sulit',
        konsep: 'sudut-segitiga',
        pertanyaan: `Berapa jumlah seluruh sudut dalam sebuah segi ${n}?`,
        jawaban: (n - 2) * 180,
        satuan: '°',
        toleransi: 1e-9,
        hint: [
          'Segi banyak bisa dipotong menjadi beberapa segitiga. Pada segi banyak cembung, caranya cukup dengan menarik semua diagonal dari satu titik sudut.',
          `Segi ${n} terbagi menjadi ${n - 2} segitiga.`,
          `Kalikan banyaknya segitiga dengan 180°.`,
        ],
        pembahasan: `Segi ${n} bisa dibagi menjadi ${n - 2} segitiga, jadi jumlah sudut dalamnya (${n} − 2) × 180° = ${(n - 2) * 180}°.`,
      }
    },
  ],

  lanjut: ['pythagoras', 'segitiga-setengah', 'sin-cos-lingkaran'],
}

export default konsep
