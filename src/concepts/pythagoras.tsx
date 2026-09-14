/* ============================================================
   KONSEP — Kenapa a² + b² = c² selalu benar?
   Kelas 8 · Geometri

   Gagasan pembuktian (bukti susun ulang klasik):
   Dua persegi besar yang ukurannya PERSIS SAMA, masing-masing
   bersisi (a+b). Keduanya diisi empat salinan segitiga siku-siku
   yang sama, hanya susunannya berbeda.
     - Susunan pertama menyisakan dua persegi: a² dan b².
     - Susunan kedua menyisakan satu persegi: c².
   Karena luas persegi besarnya sama dan yang dibuang sama
   (empat segitiga), sisanya wajib sama: a² + b² = c².
   ============================================================ */

import { Svg, Tag, SikuSiku } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { fmt } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

const W = 690
const H = 430

type Titik = [number, number]

const poly = (t: Titik[]) => t.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')

/** Titik-titik untuk sebuah persegi besar bersisi (a+b) di posisi (X, Y). */
function susunan(X: number, Y: number, a: number, b: number, u: number) {
  const s = (a + b) * u
  const A = a * u
  const B = b * u
  const P = (px: number, py: number): Titik => [X + px, Y + py]

  return {
    s,
    A,
    B,
    P,
    /* --- Susunan I: dua persegi (a² dan b²) + empat segitiga --- */
    kotakA: [X, Y, A, A] as const, // a² di kiri atas
    kotakB: [X + A, Y + A, B, B] as const, // b² di kanan bawah
    // Persegi panjang kanan atas (b lebar, a tinggi) dibelah diagonal.
    segi1a: [P(A, 0), P(A + B, 0), P(A + B, A)] as Titik[],
    segi1b: [P(A, 0), P(A, A), P(A + B, A)] as Titik[],
    // Persegi panjang kiri bawah (a lebar, b tinggi) dibelah diagonal.
    segi1c: [P(0, A), P(A, A), P(A, A + B)] as Titik[],
    segi1d: [P(0, A), P(0, A + B), P(A, A + B)] as Titik[],

    /* --- Susunan II: empat segitiga di pojok, sisanya persegi c² --- */
    segi2a: [P(0, 0), P(A, 0), P(0, B)] as Titik[],
    segi2b: [P(A, 0), P(s, 0), P(s, A)] as Titik[],
    segi2c: [P(s, A), P(s, s), P(B, s)] as Titik[],
    segi2d: [P(B, s), P(0, s), P(0, B)] as Titik[],
    kotakC: [P(A, 0), P(s, A), P(B, s), P(0, B)] as Titik[],
  }
}

function Segitiga({ t, opacity = 1 }: { t: Titik[]; opacity?: number }) {
  return (
    <polygon
      points={poly(t)}
      fill="var(--m-c)"
      fillOpacity={0.28 * opacity}
      stroke="var(--m-c)"
      strokeWidth={1.8}
      strokeOpacity={opacity}
      strokeLinejoin="round"
    />
  )
}

function Kotak({
  k,
  warna,
  label,
  nilai,
  opacity = 1,
  nyala = false,
}: {
  k: readonly [number, number, number, number]
  warna: string
  label: string
  nilai?: string
  opacity?: number
  nyala?: boolean
}) {
  const [x, y, w, h] = k
  return (
    <g opacity={opacity}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={warna}
        fillOpacity={nyala ? 0.5 : 0.28}
        stroke={warna}
        strokeWidth={nyala ? 3 : 2}
      />
      {Math.min(w, h) > 32 && (
        <>
          <text
            x={x + w / 2}
            y={y + h / 2 - (nilai ? 7 : 0)}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={Math.min(22, Math.min(w, h) * 0.4)}
            fontWeight={800}
            fill={warna}
            style={{ pointerEvents: 'none' }}
          >
            {label}
          </text>
          {nilai && Math.min(w, h) > 48 && (
            <text
              x={x + w / 2}
              y={y + h / 2 + 13}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={12.5}
              fontWeight={700}
              fill="var(--ink-2)"
              style={{ pointerEvents: 'none' }}
            >
              {nilai}
            </text>
          )}
        </>
      )}
    </g>
  )
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

/** Sisi a dan b bongkar, dibulatkan — dipakai bersama oleh gambar dan teks langkah. */
function sisiBongkar(p: Record<string, number>) {
  return { a: Math.round(p.a ?? 3), b: Math.round(p.b ?? 4) }
}

/**
 * Label sisi miring, dipakai bersama oleh gambar dan narasi supaya
 * keduanya menulis angka yang sama persis: tepat bila bulat, selain itu ≈.
 */
function miringLabel(a: number, b: number) {
  const c = Math.sqrt(a * a + b * b)
  return Math.abs(c - Math.round(c)) < 1e-9 ? `c = ${fmt(c)}` : `c ≈ ${fmt(c, 2)}`
}

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const { a, b } = sisiBongkar(p)

  const u = Math.min(30, 210 / (a + b))
  const Y = 108
  const g1 = susunan(46, Y, a, b, u)
  const g2 = susunan(W - 46 - (a + b) * u, Y, a, b, u)

  const awal = fase(step, t, 0)
  const kiri = fase(step, t, 1)
  const kanan = fase(step, t, 2)
  const samaBesar = fase(step, t, 3)
  const buang = step === 4 ? seg(t, 0.15, 0.95) : step > 4 ? 1 : 0
  const selesai = step >= 5

  const nyalaA = sorot === 'a2' || sorot === 'a'
  const nyalaB = sorot === 'b2' || sorot === 'b'
  const nyalaC = sorot === 'c2' || sorot === 'c'

  const segitigaOpacity = 1 - buang

  // Luas c² baru boleh ditulis sebagai angka setelah terbukti (langkah terakhir);
  // sebelum itu angkanya hanya bisa didapat dari teorema yang sedang dibuktikan.
  // Syarat ukuran sama dengan angka pada Kotak a² dan b².
  const angkaC = selesai && Math.sqrt(a * a + b * b) * u > 48

  /* --- Langkah 0: satu segitiga siku-siku saja --- */
  if (step === 0) {
    // 230 menjaga puncak segitiga (y ≥ 70) tetap di bawah keterangan di y = 44.
    const su = Math.min(58, 230 / Math.max(a, b))
    const x0 = W / 2 - (b * su) / 2
    const y0 = 300
    const A: Titik = [x0, y0]
    const B: Titik = [x0 + b * su, y0]
    const C: Titik = [x0, y0 - a * su]
    return (
      <Svg w={W} h={H} maxH={440} label="Segitiga siku-siku dengan sisi a, b, dan c">
        <polygon
          points={poly([A, B, C])}
          fill="var(--m-c)"
          fillOpacity={0.25 * awal}
          stroke="var(--m-c)"
          strokeWidth={3}
          strokeOpacity={awal}
          strokeLinejoin="round"
        />
        <SikuSiku x={x0} y={y0} ux={1} uy={0} vx={0} vy={-1} s={16} warna="var(--m-c)" />
        <Tag x={(A[0] + B[0]) / 2} y={y0 + 24} warna="var(--m-b)" size={17}>
          {`b = ${fmt(b)}`}
        </Tag>
        <Tag x={x0 - 22} y={(A[1] + C[1]) / 2} anchor="end" warna="var(--m-a)" size={17}>
          {`a = ${fmt(a)}`}
        </Tag>
        <Tag x={(B[0] + C[0]) / 2 + 26} y={(B[1] + C[1]) / 2 - 14} warna="var(--m-c)" size={17}>
          {miringLabel(a, b)}
        </Tag>
        <Tag x={W / 2} y={44} warna="var(--ink-2)" size={16}>
          sudutnya siku-siku — syarat yang tidak boleh dilanggar
        </Tag>
      </Svg>
    )
  }

  return (
    <Svg w={W} h={H} maxH={440} label="Dua persegi besar berukuran sama dengan susunan segitiga yang berbeda">
      {/* ---------- Persegi besar kiri ---------- */}
      <g opacity={kiri}>
        <rect
          x={g1.P(0, 0)[0]}
          y={g1.P(0, 0)[1]}
          width={g1.s}
          height={g1.s}
          fill="none"
          stroke="var(--ink)"
          strokeWidth={2.5}
        />
        <Kotak
          k={g1.kotakA}
          warna="var(--m-a)"
          label="a²"
          nilai={fmt(a * a)}
          nyala={nyalaA || selesai}
        />
        <Kotak
          k={g1.kotakB}
          warna="var(--m-b)"
          label="b²"
          nilai={fmt(b * b)}
          nyala={nyalaB || selesai}
        />
        {segitigaOpacity > 0.01 && (
          <>
            <Segitiga t={g1.segi1a} opacity={segitigaOpacity} />
            <Segitiga t={g1.segi1b} opacity={segitigaOpacity} />
            <Segitiga t={g1.segi1c} opacity={segitigaOpacity} />
            <Segitiga t={g1.segi1d} opacity={segitigaOpacity} />
          </>
        )}
        <Tag x={g1.P(0, 0)[0] + g1.s / 2} y={Y - 22} warna="var(--ink-2)" size={15}>
          {selesai ? `a² + b² = ${fmt(a * a + b * b)}` : 'susunan pertama'}
        </Tag>
      </g>

      {/* ---------- Persegi besar kanan ---------- */}
      <g opacity={kanan}>
        <rect
          x={g2.P(0, 0)[0]}
          y={g2.P(0, 0)[1]}
          width={g2.s}
          height={g2.s}
          fill="none"
          stroke="var(--ink)"
          strokeWidth={2.5}
        />
        <polygon
          points={poly(g2.kotakC)}
          fill="var(--m-hi)"
          fillOpacity={nyalaC || selesai ? 0.5 : 0.28}
          stroke="var(--m-hi)"
          strokeWidth={nyalaC || selesai ? 3 : 2}
          strokeLinejoin="round"
        />
        <text
          x={g2.P(0, 0)[0] + g2.s / 2}
          y={Y + g2.s / 2 - (angkaC ? 7 : 0)}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={22}
          fontWeight={800}
          fill="var(--m-hi)"
          style={{ pointerEvents: 'none' }}
        >
          c²
        </text>
        {angkaC && (
          <text
            x={g2.P(0, 0)[0] + g2.s / 2}
            y={Y + g2.s / 2 + 13}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={12.5}
            fontWeight={700}
            fill="var(--ink-2)"
            style={{ pointerEvents: 'none' }}
          >
            {fmt(a * a + b * b)}
          </text>
        )}
        {segitigaOpacity > 0.01 && (
          <>
            <Segitiga t={g2.segi2a} opacity={segitigaOpacity} />
            <Segitiga t={g2.segi2b} opacity={segitigaOpacity} />
            <Segitiga t={g2.segi2c} opacity={segitigaOpacity} />
            <Segitiga t={g2.segi2d} opacity={segitigaOpacity} />
          </>
        )}
        <Tag x={g2.P(0, 0)[0] + g2.s / 2} y={Y - 22} warna="var(--ink-2)" size={15}>
          {selesai ? `c² = ${fmt(a * a + b * b)}` : 'susunan kedua'}
        </Tag>
      </g>

      {/* ---------- Keterangan ---------- */}
      {step === 3 && samaBesar > 0.3 && (
        <Tag x={W / 2} y={46} warna="var(--m-c)" size={16}>
          {`kedua persegi sama-sama bersisi ${fmt(a + b)}, dan berisi 4 segitiga yang sama`}
        </Tag>
      )}
      {step === 4 && (
        <Tag x={W / 2} y={46} warna="var(--m-c)" size={16}>
          empat segitiga dibuang dari kedua sisi
        </Tag>
      )}
      {selesai && (
        <Tag x={W / 2} y={46} warna="var(--ink)" size={18}>
          {`${fmt(a * a)} + ${fmt(b * b)} = ${fmt(a * a + b * b)}`}
        </Tag>
      )}
      {(samaBesar > 0.3 || selesai) && (
        <Tag x={W / 2} y={Y + g1.s / 2} warna="var(--ink-3)" size={22} latar={null}>
          =
        </Tag>
      )}
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const a = p.a ?? 3
  const b = p.b ?? 4
  const c = Math.sqrt(a * a + b * b)
  // Skala 130 menjaga puncak persegi sisi miring (yang menjorok ke kanan atas, setinggi (a+b)·u)
  // tidak menabrak label rumus di y = 36; titik tertingginya y ≈ 66 untuk a = b = 6.
  const u = Math.min(34, 130 / Math.max(a, b, c))

  // Segitiga dengan sudut siku-siku di titik asal.
  const cx = W / 2 - 30
  const cy = 250
  const A: Titik = [cx, cy] // sudut siku-siku
  const B: Titik = [cx + b * u, cy] // sepanjang b
  const C: Titik = [cx, cy - a * u] // sepanjang a

  // Persegi pada sisi a (kiri), sisi b (bawah), sisi c (miring).
  const kotakA: Titik[] = [A, C, [C[0] - a * u, C[1]], [A[0] - a * u, A[1]]]
  const kotakB: Titik[] = [A, B, [B[0], B[1] + b * u], [A[0], A[1] + b * u]]
  // Persegi di sisi miring: putar vektor BC sejauh 90 derajat ke luar,
  // yaitu menjauhi titik siku-siku A (ke kanan atas pada koordinat SVG).
  const dx = C[0] - B[0]
  const dy = C[1] - B[1]
  const nx = -dy
  const ny = dx
  const kotakC: Titik[] = [B, C, [C[0] + nx, C[1] + ny], [B[0] + nx, B[1] + ny]]

  const nyalaA = sorot === 'a2' || sorot === 'a'
  const nyalaB = sorot === 'b2' || sorot === 'b'
  const nyalaC = sorot === 'c2' || sorot === 'c'

  const bulat = Math.abs(c - Math.round(c)) < 1e-9
  // c bisa tepat tetapi tidak bulat (mis. 1,5-2-2,5); tanda ≈ hanya untuk nilai yang dibulatkan.
  const tepat = Math.abs(c * 1000 - Math.round(c * 1000)) < 1e-6

  return (
    <Svg w={W} h={H} maxH={440} label="Segitiga siku-siku dengan persegi terbangun pada ketiga sisinya">
      <polygon
        points={poly(kotakC)}
        fill="var(--m-hi)"
        fillOpacity={nyalaC ? 0.5 : 0.25}
        stroke="var(--m-hi)"
        strokeWidth={nyalaC ? 3 : 2}
      />
      <polygon
        points={poly(kotakA)}
        fill="var(--m-a)"
        fillOpacity={nyalaA ? 0.5 : 0.25}
        stroke="var(--m-a)"
        strokeWidth={nyalaA ? 3 : 2}
      />
      <polygon
        points={poly(kotakB)}
        fill="var(--m-b)"
        fillOpacity={nyalaB ? 0.5 : 0.25}
        stroke="var(--m-b)"
        strokeWidth={nyalaB ? 3 : 2}
      />
      <polygon
        points={poly([A, B, C])}
        fill="var(--surface)"
        stroke="var(--ink)"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <SikuSiku x={A[0]} y={A[1]} ux={1} uy={0} vx={0} vy={-1} s={14} warna="var(--ink-2)" />

      <Tag x={A[0] - (a * u) / 2} y={A[1] - (a * u) / 2} warna="var(--m-a)" size={15}>
        {`a² = ${fmt(a * a, 2)}`}
      </Tag>
      <Tag x={A[0] + (b * u) / 2} y={A[1] + (b * u) / 2} warna="var(--m-b)" size={15}>
        {`b² = ${fmt(b * b, 2)}`}
      </Tag>
      <Tag
        x={(B[0] + C[0]) / 2 + nx / 2}
        y={(B[1] + C[1]) / 2 + ny / 2}
        warna="var(--m-hi)"
        size={15}
      >
        {`c² = ${fmt(c * c, 2)}`}
      </Tag>

      <Tag x={W / 2} y={36} warna="var(--ink)" size={17}>
        {`${fmt(a * a, 2)} + ${fmt(b * b, 2)} = ${fmt(c * c, 2)}`}
      </Tag>
      <Tag x={W / 2} y={H - 20} warna={bulat ? 'var(--m-ab)' : 'var(--ink-2)'} size={15}>
        {bulat
          ? `c = ${fmt(c)} — kebetulan bulat, ini tripel Pythagoras`
          : tepat
            ? `c = √${fmt(a * a + b * b, 2)} = ${fmt(c)}`
            : `c = √${fmt(a * a + b * b, 2)} ≈ ${fmt(c, 3)}`}
      </Tag>
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'pythagoras',
  topicId: 'smp8-teorema-pythagoras',
  judul: 'Teorema Pythagoras',
  pertanyaan: 'Kenapa a² + b² = c² selalu benar?',
  tagline: 'Bukan soal panjang sisi. Ini soal luas — dan buktinya bisa kamu lihat bergerak.',
  kelas: 8,
  domain: 'geometri',
  tags: ['pythagoras', 'segitiga siku-siku', 'luas', 'bukti'],

  tebak: {
    pertanyaan:
      'Menurutmu, apa yang sebenarnya dijumlahkan dalam a² + b² = c²?',
    pilihan: [
      {
        id: 'a',
        label: 'Panjang sisinya',
        balasan:
          'Kalau yang dijumlahkan panjang, segitiga 3-4-5 harus memenuhi 3 + 4 = 5 — padahal 3 + 4 = 7. Yang cocok justru luasnya: 9 + 16 = 25. Coba juga sisi 1 dan 1: sisi miringnya √2 ≈ 1,41, bukan 2.',
      },
      {
        id: 'b',
        label: 'Luas persegi pada tiap sisi',
        benar: true,
        balasan:
          'Tepat. Lambang a² bukan sekadar "a kali a", melainkan luas sebuah persegi yang dibangun pada sisi a.',
      },
      {
        id: 'c',
        label: 'Besar sudutnya',
        balasan: 'Sudut memang berperan (harus siku-siku), tetapi yang dijumlahkan bukan sudutnya.',
      },
    ],
    penutup:
      'Begitu kamu melihat a², b², dan c² sebagai luas, teorema ini berhenti terasa seperti mantra.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      { key: 'a', label: 'Sisi a', min: 1, max: 6, step: 1, awal: 3, bulat: true },
      { key: 'b', label: 'Sisi b', min: 1, max: 6, step: 1, awal: 4, bulat: true },
    ],
    roles: { a: 'a', b: 'b', c: 'hi', a2: 'a', b2: 'b', c2: 'hi' },
    arti: {
      a: 'Salah satu sisi siku-siku.',
      b: 'Sisi siku-siku yang lain.',
      c: 'Sisi miring — selalu yang terpanjang, dan selalu berhadapan dengan sudut siku-siku.',
      a2: 'Luas persegi yang dibangun pada sisi a.',
      b2: 'Luas persegi yang dibangun pada sisi b.',
      c2: 'Luas persegi yang dibangun pada sisi miring.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Sebuah segitiga siku-siku',
        narasi: (p) => {
          const { a, b } = sisiBongkar(p)
          return `Dua sisi tegak lurusnya kamu atur sendiri: a = ${fmt(a)} dan b = ${fmt(b)}, sisi miringnya ${miringLabel(a, b)}. Syarat siku-siku ini penting: tanpa itu, seluruh cerita berikutnya gugur.`
        },
        rumus: 'sisi tegak [a:a] dan [b:b], sisi miring [c:c]',
        durasi: 1800,
      },
      {
        id: 's1',
        judul: 'Susunan pertama',
        narasi: (p) => {
          const { a, b } = sisiBongkar(p)
          const sisa =
            a === b
              ? `dua persegi kembar bersisi ${fmt(a)}, masing-masing seluas ${fmt(a * a)}`
              : `dua persegi: yang bersisi ${fmt(a)} seluas ${fmt(a * a)}, yang bersisi ${fmt(b)} seluas ${fmt(b * b)}`
          return `Persegi besar ini bersisi ${fmt(a)} + ${fmt(b)} = ${fmt(a + b)}, lalu kamu isi dengan empat salinan segitiga tadi. Ruang yang tersisa berupa ${sisa}.`
        },
        rumus: 'sisa = [a2:a^2] + [b2:b^2]',
        durasi: 2200,
      },
      {
        id: 's2',
        judul: 'Susunan kedua',
        narasi: (p) => {
          const { a, b } = sisiBongkar(p)
          // Bila a = b kedua sudut lancipnya sama-sama 45°, jadi tidak boleh disebut "berbeda".
          const sudutLancip =
            a === b ? 'dua sudut lancip yang sama-sama 45°' : 'sudut lancip yang besar dan yang kecil'
          return `Persegi besar kedua ukurannya persis sama, tetapi keempat segitiga kini ditaruh di pojok-pojoknya sehingga ruang di tengah dikelilingi empat sisi miring c. Ruang tengah itu persegi: di tiap titik sudutnya (yang terletak pada sisi persegi besar), ${sudutLancip} (jumlahnya 90°) ditambah sudut ruang tengah membentuk garis lurus 180°, jadi sudut ruang tengah 180° − 90° = 90°.`
        },
        rumus: 'sisa = [c2:c^2]',
        durasi: 2400,
      },
      {
        id: 's3',
        judul: 'Perhatikan: keduanya sama besar',
        narasi: (p) => {
          const { a, b } = sisiBongkar(p)
          const s = a + b
          return `Kedua persegi besar sama-sama bersisi ${fmt(s)}, jadi luasnya sama-sama ${fmt(s * s)}. Isinya pun sama: empat segitiga yang identik.`
        },
        durasi: 2000,
      },
      {
        id: 's4',
        judul: 'Buang empat segitiga dari keduanya',
        narasi:
          'Kalau dari dua benda yang sama besar kamu buang bagian yang sama, sisanya pasti sama besar juga.',
        durasi: 2200,
      },
      {
        id: 's5',
        judul: 'Yang tersisa itulah teoremanya',
        narasi: (p) => {
          const { a, b } = sisiBongkar(p)
          const jumlah = a * a + b * b
          return `Di kiri tersisa dua persegi, ${fmt(a * a)} + ${fmt(b * b)} = ${fmt(jumlah)}; di kanan tersisa satu persegi miring yang luasnya juga ${fmt(jumlah)}. Keduanya sisa dari luas yang sama dikurangi hal yang sama, jadi mereka wajib sama besar.`
        },
        rumus: '[a2:a^2] + [b2:b^2] = [c2:c^2]',
        durasi: 2200,
      },
    ],
  },

  eksperimen: {
    judul: 'Bangun persegi pada tiap sisi, lalu bandingkan luasnya',
    ajakan:
      'Ubah panjang kedua sisi tegaknya. Perhatikan bahwa luas persegi ungu ditambah luas persegi jingga selalu sama dengan luas persegi merah muda.',
    params: [
      { key: 'a', label: 'Sisi a', min: 1, max: 6, step: 0.5, awal: 3 },
      { key: 'b', label: 'Sisi b', min: 1, max: 6, step: 0.5, awal: 4 },
    ],
    Visual: VisualEksperimen,
    temuan: (p) => {
      const a = p.a ?? 3
      const b = p.b ?? 4
      const c = Math.sqrt(a * a + b * b)
      const bulat = Math.abs(c - Math.round(c)) < 1e-9
      const tepat = Math.abs(c * 1000 - Math.round(c * 1000)) < 1e-6
      return (
        <p>
          <strong>
            {fmt(a * a, 2)} + {fmt(b * b, 2)} = {fmt(c * c, 2)}.
          </strong>{' '}
          Sisi miringnya c {tepat ? `= ${fmt(c)}` : `≈ ${fmt(c, 3)}`}
          {bulat
            ? ' — kebetulan bulat. Pasangan seperti ini disebut tripel Pythagoras; contoh lain 6-8-10 dan 5-12-13.'
            : ' — tidak bulat, dan itu justru yang paling sering terjadi. Sisi bulat adalah pengecualian, bukan aturan.'}{' '}
          Perhatikan juga: c selalu lebih pendek daripada a + b, tetapi selalu lebih panjang
          daripada masing-masing sisi tegaknya.
        </p>
      )
    },
  },

  penjelasan: {
    SMP: (
      <>
        <p>
          Bukti ini tidak memerlukan rumus apa pun — hanya dua kalimat yang sama-sama jelas:{' '}
          <strong>bangun yang sama besar punya luas yang sama</strong>, dan{' '}
          <strong>kalau dari dua hal yang sama kamu ambil bagian yang sama, sisanya sama.</strong>
        </p>
        <p>
          Kedua persegi besar bersisi (a + b), jadi luasnya sama, yaitu (a + b)². Masing-masing
          berisi empat salinan segitiga siku-siku yang identik. Buang keempat segitiga itu dari
          kedua persegi; sisa di kiri adalah a² + b², sisa di kanan adalah c². Karena keduanya sisa
          dari luas sama dikurangi hal sama, maka a² + b² = c².
        </p>
        <h4>Kenapa ruang tengah susunan kedua benar-benar persegi</h4>
        <p>
          Keempat sisinya sama panjang (masing-masing c) karena semuanya sisi miring dari segitiga
          yang sama. Sudutnya juga siku-siku: pada tiap titik, bertemu kedua sudut lancip segitiga
          yang <em>berbeda</em> (satu dari tiap segitiga yang bertetangga), dan jumlah keduanya 90°
          (karena jumlah sudut segitiga 180° dan satu sudutnya sudah 90°).
          Sudut lurus 180° dikurangi 90° menyisakan 90°.
        </p>
        <h4>Yang paling sering keliru</h4>
        <p>
          Pertama, teorema ini <strong>hanya</strong> berlaku untuk segitiga siku-siku. Kedua, c
          selalu sisi miring — sisi di hadapan sudut siku-siku, dan selalu yang terpanjang. Kalau
          yang ditanya justru salah satu sisi tegak, bentuknya menjadi a² = c² − b², bukan
          c² + b².
        </p>
      </>
    ),
    SD: (
      <>
        <p>
          Bayangkan dua kotak kue berbentuk persegi yang ukurannya persis sama. Ke dalam masing-masing
          kotak kamu masukkan empat potong kue segitiga yang bentuknya sama persis. Syaratnya, tiap
          potong kue punya satu sudut siku-siku, seperti pojok buku. Kalau tidak, susunannya tidak
          akan pas dan cerita ini tidak berlaku.
        </p>
        <p>
          Bedanya cuma cara menatanya. Di kotak pertama, ruang kosongnya berbentuk dua persegi. Di
          kotak kedua, ruang kosongnya berbentuk satu persegi miring.
        </p>
        <p>
          Karena kotaknya sama besar dan kuenya sama persis (empat potong yang sama), ruang kosongnya pasti sama luas juga.
          Jadi dua persegi kecil itu, kalau digabung, sama luasnya dengan satu persegi miring tadi.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Bukti susun ulang tadi bisa ditulis sebagai satu baris aljabar. Luas persegi besar dihitung
          dua cara:
        </p>
        <p style={{ textAlign: 'center' }}>
          (a + b)² = 4 · (½ab) + c² ⟹ a² + 2ab + b² = 2ab + c² ⟹ a² + b² = c²
        </p>
        <p>
          Suku 2ab muncul di kedua ruas lalu saling meniadakan — itulah "membuang empat segitiga"
          dalam bahasa aljabar.
        </p>
        <h4>Sudut pandang hasil kali titik</h4>
        <p>
          Dengan vektor: |u + v|² = |u|² + 2⟨u, v⟩ + |v|². Bila u ⊥ v maka ⟨u, v⟩ = 0, sehingga
          |u + v|² = |u|² + |v|². Teorema Pythagoras dengan demikian setara dengan pernyataan bahwa
          hasil kali titik dua vektor tegak lurus bernilai nol — dan versi ini berlaku di ruang
          berdimensi berapa pun.
        </p>
        <h4>Kebalikannya juga benar</h4>
        <p>
          Jika pada suatu segitiga berlaku a² + b² = c², maka segitiga itu pasti siku-siku
          (kebalikan teorema Pythagoras). Dari aturan kosinus, c² = a² + b² − 2ab·cos C, sehingga
          a² + b² = c² memaksa cos C = 0, yaitu C = 90°. Aturan kosinus sekaligus memperlihatkan
          bahwa Pythagoras hanyalah kasus khusus: untuk sudut tumpul c² lebih besar, untuk sudut
          lancip c² lebih kecil.
        </p>
      </>
    ),
  },

  rumus: {
    src: '[a2:a^2] + [b2:b^2] = [c2:c^2]',
    roles: { a2: 'a', b2: 'b', c2: 'hi' },
    arti: {
      a2: 'Luas persegi pada sisi tegak a.',
      b2: 'Luas persegi pada sisi tegak b.',
      c2: 'Luas persegi pada sisi miring. Selalu paling besar di antara ketiganya.',
    },
  },

  soal: [
    {
      id: 'pyt-1',
      tipe: 'angka',
      topicId: 'smp8-teorema-pythagoras',
      kelas: 8,
      tingkat: 'mudah',
      konsep: 'pythagoras',
      pertanyaan:
        'Sebuah segitiga siku-siku memiliki sisi tegak 6 cm dan 8 cm. Berapa panjang sisi miringnya?',
      jawaban: 10,
      satuan: 'cm',
      toleransi: 1e-6,
      hint: [
        'Kuadratkan dulu kedua sisi tegaknya, lalu jumlahkan.',
        '6² + 8² = 36 + 64 = 100. Angka 100 itu adalah c².',
        'Sisi miring adalah akar dari 100.',
      ],
      pembahasan: 'c² = 6² + 8² = 36 + 64 = 100, sehingga c = 10 cm. Ini tripel Pythagoras 6-8-10, kelipatan dari 3-4-5.',
    },
    {
      id: 'pyt-2',
      tipe: 'pilihan',
      topicId: 'smp8-teorema-pythagoras',
      kelas: 8,
      tingkat: 'sedang',
      konsep: 'pythagoras',
      pertanyaan:
        'Sisi miring sebuah segitiga siku-siku 13 cm dan salah satu sisi tegaknya 5 cm. Berapa panjang sisi tegak yang lain?',
      pilihan: [
        { id: 'a', label: '12 cm', benar: true },
        {
          id: 'b',
          label: '√194 cm',
          diagnosa:
            'Kamu menjumlahkan 13² + 5². Padahal 13 adalah sisi MIRING, jadi ia berperan sebagai c: 5² harus dikurangkan dari 13², bukan ditambahkan.',
        },
        { id: 'c', label: '8 cm', diagnosa: 'Sepertinya kamu mengurangkan panjang sisinya (13 − 5) tanpa mengkuadratkan.' },
        { id: 'd', label: '18 cm', diagnosa: 'Ini hasil 13 + 5. Sisi miring selalu terpanjang, jadi jawaban 18 mustahil.' },
      ],
      hint: [
        'Tandai dulu mana yang sisi miring. Sisi miring selalu yang terpanjang.',
        'Karena c = 13 sudah diketahui, susun ulang menjadi a² = c² − b².',
        'a² = 169 − 25 = 144.',
      ],
      pembahasan:
        'a² = 13² − 5² = 169 − 25 = 144, jadi a = 12 cm. Kalau yang dicari sisi tegak, luas persegi pada sisi miring (c²) dikurangi luas persegi pada sisi tegak yang diketahui, bukan ditambah.',
    },
    {
      id: 'pyt-3',
      tipe: 'benar-salah',
      topicId: 'smp8-teorema-pythagoras',
      kelas: 8,
      tingkat: 'sedang',
      konsep: 'pythagoras',
      pertanyaan: 'Segitiga dengan panjang sisi 4 cm, 5 cm, dan 6 cm adalah segitiga siku-siku.',
      jawaban: false,
      diagnosa:
        'Uji dengan sisi terpanjang sebagai c: 4² + 5² = 41, sedangkan 6² = 36. Karena 41 ≠ 36, segitiga ini bukan siku-siku.',
      hint: [
        'Gunakan kebalikan teorema Pythagoras: periksa apakah a² + b² = c².',
        'Sisi terpanjang harus diperlakukan sebagai c. Di sini c = 6.',
        'Bandingkan 4² + 5² dengan 6².',
      ],
      pembahasan:
        'Salah. 4² + 5² = 16 + 25 = 41, sedangkan 6² = 36. Karena a² + b² > c², segitiga ini justru lancip. Kalau a² + b² < c², segitiga itu tumpul.',
    },
    (rnd) => {
      const tripel = [
        [3, 4, 5],
        [5, 12, 13],
        [8, 15, 17],
        [7, 24, 25],
        [9, 12, 15],
      ][Math.floor(rnd() * 5)]
      const [a, b, c] = tripel
      return {
        id: 'pyt-4',
        tipe: 'angka',
        topicId: 'smp8-teorema-pythagoras',
        kelas: 8,
        tingkat: 'sedang',
        konsep: 'pythagoras',
        pertanyaan: `Sebuah tangga bersandar pada dinding. Kaki tangga berjarak ${a} m dari dinding dan ujung atasnya mencapai ketinggian ${b} m. Berapa panjang tangganya?`,
        jawaban: c,
        satuan: 'm',
        toleransi: 1e-6,
        hint: [
          'Gambarkan situasinya: dinding tegak, lantai mendatar, tangga sebagai sisi miring.',
          'Sudut antara dinding dan lantai adalah siku-siku, jadi teorema Pythagoras berlaku.',
          `Hitung ${a}² + ${b}² = ${a * a + b * b}, lalu akarkan.`,
        ],
        pembahasan: `Panjang tangga = √(${a}² + ${b}²) = √${a * a + b * b} = ${c} m. Tangga selalu lebih panjang daripada tingginya — masuk akal, karena ia sisi miring.`,
      }
    },
    {
      id: 'pyt-5',
      tipe: 'urutkan',
      topicId: 'smp8-teorema-pythagoras',
      kelas: 9,
      tingkat: 'sulit',
      konsep: 'pythagoras',
      pertanyaan: 'Susun kembali alur bukti susun ulang teorema Pythagoras.',
      langkah: [
        'Buat dua persegi besar yang sama-sama bersisi a + b',
        'Isi masing-masing dengan empat salinan segitiga siku-siku yang sama',
        'Pada susunan pertama, sisanya berupa persegi a² dan persegi b²',
        'Pada susunan kedua, sisanya berupa satu persegi c²',
        'Buang empat segitiga dari kedua persegi besar',
        'Sisa yang sama besar berarti a² + b² = c²',
      ],
      hint: [
        'Buktinya dimulai dari membuat dua wadah yang sama besar.',
        'Segitiga dimasukkan lebih dulu, baru terlihat ruang kosongnya berbentuk apa.',
        'Membuang segitiga dilakukan setelah kedua susunan siap dibandingkan.',
      ],
      pembahasan:
        'Inti buktinya: dua luas yang sama, dikurangi bagian yang sama, menyisakan luas yang sama. Tidak ada rumus yang dipakai — hanya penalaran tentang luas.',
    },
  ],

  lanjut: ['kuadrat-jumlah', 'sin-cos-lingkaran', 'segitiga-setengah'],
}

export default konsep
