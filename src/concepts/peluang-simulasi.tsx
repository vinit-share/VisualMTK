/* ============================================================
   KONSEP — Kalau peluangnya ½, kenapa 10 lemparan sering tidak pas 5?
   Kelas 8 · Analisis Data dan Peluang

   Gagasan: peluang BUKAN janji tentang hasil beberapa percobaan.
   Ia adalah angka yang didekati oleh frekuensi relatif ketika
   percobaan diperbanyak. Simulasi memperlihatkan kurva frekuensi
   relatif bergoyang liar di awal, lalu menyempit ke 0,5.

   Sekaligus membongkar kekeliruan penjudi: koin tidak punya
   ingatan. Yang mengecil adalah selisih RELATIF, bukan selisih
   mutlak — dan itu ditunjukkan angkanya.
   ============================================================ */

import { useMemo } from 'react'
import { Svg, Tag } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt, seededRandom } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

const W = 690
const H = 440

/* Wilayah grafik */
const GX0 = 92
const GX1 = 640
const GY0 = 216
const GY1 = 386

/** Hitung frekuensi relatif kumulatif pada titik-titik contoh berjarak logaritmik. */
function simulasi(n: number, benih: number) {
  const rnd = seededRandom(benih * 7919 + 13)
  const titik: { i: number; f: number }[] = []
  // Titik contoh: rapat di awal, renggang di akhir (skala logaritmik).
  const contoh = new Set<number>()
  const maks = Math.max(1, Math.log10(n))
  for (let k = 0; k <= 160; k++) {
    contoh.add(Math.max(1, Math.round(10 ** ((k / 160) * maks))))
  }
  let gambar = 0
  const urut = Array.from(contoh).sort((a, b) => a - b)
  let idx = 0
  for (let i = 1; i <= n; i++) {
    if (rnd() < 0.5) gambar++
    while (idx < urut.length && urut[idx] === i) {
      titik.push({ i, f: gambar / i })
      idx++
    }
  }
  return { titik, gambar, total: n, frekuensi: n > 0 ? gambar / n : 0 }
}

/** Hasil sepuluh lemparan pertama, untuk digambar sebagai koin. */
function koinAwal(n: number, benih: number) {
  const rnd = seededRandom(benih * 7919 + 13)
  const out: boolean[] = []
  for (let i = 0; i < n; i++) out.push(rnd() < 0.5)
  return out
}

function Grafik({
  titik,
  n,
  tampil,
}: {
  titik: { i: number; f: number }[]
  n: number
  tampil: number
}) {
  const maks = Math.max(1, Math.log10(n))
  const ke = (i: number) => GX0 + (Math.log10(Math.max(1, i)) / maks) * (GX1 - GX0)
  const kf = (f: number) => GY1 - f * (GY1 - GY0)

  const terlihat = titik.filter((p) => p.i <= Math.max(1, n * tampil))
  const d = terlihat.map((p, k) => `${k === 0 ? 'M' : 'L'} ${ke(p.i).toFixed(1)} ${kf(p.f).toFixed(1)}`).join(' ')

  const tanda = [1, 10, 100, 1000, 10000].filter((v) => v <= n)

  return (
    <g>
      {/* sumbu dan kisi */}
      {[0, 0.25, 0.5, 0.75, 1].map((f) => (
        <g key={f}>
          <line
            x1={GX0}
            y1={kf(f)}
            x2={GX1}
            y2={kf(f)}
            stroke={f === 0.5 ? 'var(--m-hi)' : 'var(--m-grid)'}
            strokeWidth={f === 0.5 ? 2 : 1}
            strokeDasharray={f === 0.5 ? '7 5' : undefined}
          />
          <text
            x={GX0 - 10}
            y={kf(f)}
            textAnchor="end"
            dominantBaseline="middle"
            fontSize={12}
            fontWeight={700}
            fill={f === 0.5 ? 'var(--m-hi)' : 'var(--ink-soft)'}
          >
            {f === 0.5 ? '0,5' : fmt(f, 2)}
          </text>
        </g>
      ))}
      {tanda.map((v) => (
        <g key={v}>
          <line x1={ke(v)} y1={GY1} x2={ke(v)} y2={GY1 + 6} stroke="var(--m-axis)" strokeWidth={1.4} />
          <text
            x={ke(v)}
            y={GY1 + 20}
            textAnchor="middle"
            fontSize={12}
            fontWeight={700}
            fill="var(--ink-soft)"
          >
            {fmt(v)}
          </text>
        </g>
      ))}

      {d && <path d={d} fill="none" stroke="var(--m-a)" strokeWidth={2.4} strokeLinejoin="round" />}
      {terlihat.length > 0 && (
        <circle
          cx={ke(terlihat[terlihat.length - 1].i)}
          cy={kf(terlihat[terlihat.length - 1].f)}
          r={5}
          fill="var(--m-a)"
        />
      )}
      <text
        x={(GX0 + GX1) / 2}
        y={GY1 + 38}
        textAnchor="middle"
        fontSize={12.5}
        fontWeight={700}
        fill="var(--ink-soft)"
      >
        banyaknya lemparan (skala logaritmik)
      </text>
    </g>
  )
}

function Koin({ x, y, gambar, r = 13 }: { x: number; y: number; gambar: boolean; r?: number }) {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={gambar ? 'var(--m-a)' : 'var(--surface-3)'}
        fillOpacity={gambar ? 0.7 : 1}
        stroke={gambar ? 'var(--m-a)' : 'var(--ink-3)'}
        strokeWidth={1.6}
      />
      <text
        x={x}
        y={y + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={r * 0.9}
        fontWeight={800}
        fill={gambar ? 'var(--m-a)' : 'var(--ink-soft)'}
      >
        {gambar ? 'G' : 'A'}
      </text>
    </g>
  )
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

const N_LANGKAH = [10, 10, 100, 1000, 10000, 10000, 10000]

/** Nomor percobaan pada bongkar — dipakai gambar DAN narasi. */
const benihBongkar = (p: Record<string, number>) => clamp(Math.round(p.benih ?? 1), 1, 20)

/** Banyaknya gambar pada sepuluh lemparan pertama percobaan ini. */
const gambarSepuluh = (benih: number) => koinAwal(10, benih).filter(Boolean).length

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const benih = benihBongkar(p)
  const n = N_LANGKAH[Math.min(step, N_LANGKAH.length - 1)]

  const sim = useMemo(() => simulasi(n, benih), [n, benih])
  const koin = useMemo(() => koinAwal(10, benih), [benih])

  const lempar = step === 0 ? seg(t, 0.05, 0.95) : 1
  const tampilGrafik = step >= 2 ? (step === 2 ? seg(t, 0.05, 0.9) : 1) : 0
  const tekan = fase(step, t, 1)
  const selesai = step >= 5

  const gambarAwal = koin.slice(0, Math.round(10 * lempar)).filter(Boolean).length
  const terlempar = Math.round(10 * lempar)

  const nyalaP = sorot === 'p'
  const nyalaN = sorot === 'na' || sorot === 'ns'

  return (
    <Svg w={W} h={H} maxH={450} label="Simulasi pelemparan koin dan grafik frekuensi relatifnya">
      {/* sepuluh koin pertama */}
      {step <= 1 && (
        <g>
          {koin.slice(0, terlempar).map((g, i) => (
            <Koin key={i} x={120 + i * 46} y={150} gambar={g} r={18} />
          ))}
          <Tag x={W / 2} y={70} warna="var(--ink-2)" size={17}>
            {terlempar === 0
              ? 'sepuluh lemparan pertama'
              : `${fmt(gambarAwal)} gambar dari ${fmt(terlempar)} lemparan`}
          </Tag>
          {terlempar === 10 && (
            <Tag
              x={W / 2}
              y={230}
              warna={gambarAwal === 5 ? 'var(--m-ab)' : 'var(--m-hi)'}
              size={18}
            >
              {`frekuensi relatif = ${fmt(gambarAwal)}/10 = ${fmt(gambarAwal / 10, 2)}`}
            </Tag>
          )}
          {tekan > 0.4 && (
            <Tag x={W / 2} y={286} warna="var(--ink-2)" size={16}>
              {gambarAwal === 5
                ? 'kali ini kebetulan pas — coba ganti percobaannya'
                : `meleset ${fmt(Math.abs(gambarAwal - 5))} dari harapan 5`}
            </Tag>
          )}
        </g>
      )}

      {/* grafik frekuensi relatif */}
      {tampilGrafik > 0.02 && (
        <g opacity={tampilGrafik}>
          <Grafik titik={sim.titik} n={n} tampil={step === 2 ? seg(t, 0.1, 1) : 1} />
          <Tag
            x={W / 2}
            y={70}
            warna={nyalaP ? 'var(--m-hi)' : 'var(--m-a)'}
            size={18}
          >
            {`${fmt(n)} lemparan · ${fmt(sim.gambar)} gambar · frekuensi relatif ${fmt(sim.frekuensi, 4)}`}
          </Tag>
          <Tag
            x={W / 2}
            y={110}
            warna={nyalaN ? 'var(--m-hi)' : 'var(--ink-2)'}
            size={15}
          >
            {`selisih dari 0,5: ${fmt(Math.abs(sim.frekuensi - 0.5), 4)} (mutlak ${fmt(
              Math.abs(sim.gambar - n / 2),
            )} lemparan)`}
          </Tag>
          {selesai && (
            <Tag x={W / 2} y={150} warna="var(--m-ab)" size={16}>
              kurvanya menyempit ke 0,5 — tetapi tidak pernah "mengunci" di sana
            </Tag>
          )}
        </g>
      )}
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const n = clamp(Math.round(p.n ?? 200), 10, 20000)
  const benih = clamp(Math.round(p.benih ?? 1), 1, 40)
  const sim = useMemo(() => simulasi(n, benih), [n, benih])
  const koin = useMemo(() => koinAwal(Math.min(n, 60), benih), [n, benih])

  return (
    <Svg w={W} h={H} maxH={450} label="Simulasi pelemparan koin yang jumlahnya bisa diubah">
      {n <= 60 && (
        <g>
          {koin.map((g, i) => (
            <Koin key={i} x={110 + (i % 20) * 24} y={116 + Math.floor(i / 20) * 26} gambar={g} r={10} />
          ))}
        </g>
      )}
      <Grafik titik={sim.titik} n={n} tampil={1} />
      <Tag x={W / 2} y={54} warna={sorot === 'p' ? 'var(--m-hi)' : 'var(--m-a)'} size={19}>
        {`${fmt(sim.gambar)} gambar dari ${fmt(n)} → ${fmt(sim.frekuensi, 4)}`}
      </Tag>
      <Tag x={W / 2} y={88} warna="var(--ink-2)" size={14}>
        {`selisih mutlak ${fmt(Math.abs(sim.gambar - n / 2))} lemparan · selisih relatif ${fmt(
          Math.abs(sim.frekuensi - 0.5),
          4,
        )}`}
      </Tag>
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'peluang-simulasi',
  topicId: 'smp8-peluang-teoretis',
  judul: 'Peluang dan kenyataan',
  pertanyaan: 'Kalau peluangnya ½, kenapa 10 lemparan sering tidak pas 5 kali?',
  tagline: 'Lempar 10 kali, 100 kali, 10.000 kali. Perhatikan kapan pola itu muncul.',
  kelas: 8,
  domain: 'data',
  tags: ['peluang', 'frekuensi relatif', 'simulasi', 'koin', 'hukum bilangan besar'],

  tebak: {
    pertanyaan:
      'Sebuah koin seimbang sudah dilempar 5 kali dan semuanya keluar angka. Berapa peluang lemparan keenam keluar gambar?',
    pilihan: [
      {
        id: 'a',
        label: 'Lebih dari ½, karena sudah "waktunya" gambar',
        balasan:
          'Ini kekeliruan penjudi yang paling terkenal. Koin tidak menyimpan ingatan tentang lemparan sebelumnya.',
      },
      {
        id: 'b',
        label: 'Tetap ½',
        benar: true,
        balasan:
          'Betul. Setiap lemparan berdiri sendiri. Lima angka berturut-turut memang jarang, tetapi tidak mengubah apa pun untuk lemparan berikutnya.',
      },
      {
        id: 'c',
        label: 'Kurang dari ½, karena koinnya sedang "condong" ke angka',
        balasan:
          'Koinnya sudah disebut seimbang, jadi tidak ada sisi yang lebih "condong". Lima angka berturut-turut peluangnya 1/32 — kecil, tetapi memang wajar sesekali terjadi.',
      },
    ],
    penutup:
      'Jadi apa sebenarnya arti "peluangnya ½"? Sebentar lagi kamu bisa melihatnya muncul sendiri.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [{ key: 'benih', label: 'Percobaan ke-', min: 1, max: 20, step: 1, awal: 1, bulat: true }],
    roles: { p: 'a', na: 'b', ns: 'ab', banyak: 'hi' },
    arti: {
      p: 'Peluang teoretis — angka yang didekati frekuensi relatif.',
      na: 'Banyaknya hasil yang kita inginkan (misalnya sisi gambar).',
      ns: 'Banyaknya seluruh hasil yang mungkin.',
      banyak: 'Banyaknya percobaan. Makin besar, frekuensi relatif cenderung makin dekat ke peluangnya.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Sepuluh lemparan',
        narasi:
          'Koin dilempar sepuluh kali: G berarti gambar, A berarti angka. Perhatikan berapa banyak gambar yang muncul.',
        durasi: 2600,
      },
      {
        id: 's1',
        judul: (p) => {
          const g = gambarSepuluh(benihBongkar(p))
          return g === 5 ? 'Kali ini kebetulan pas separuh' : `Meleset ${fmt(Math.abs(g - 5))} dari separuh`
        },
        narasi: (p) => {
          const g = gambarSepuluh(benihBongkar(p))
          if (g === 5)
            return 'Di percobaan ini kebetulan muncul tepat 5 gambar — hasil yang memang paling mungkin, tetapi secara teori peluangnya hanya sekitar seperempat, jadi kira-kira tiga dari empat kali hasilnya bukan 5. Ganti percobaannya lewat penggeser: hasilnya berubah-ubah, kadang 3, kadang 7.'
          const muncul = g === 0 ? 'tidak muncul gambar sama sekali' : `muncul ${fmt(g)} gambar`
          return `Di percobaan ini ${muncul}, ${g < 5 ? 'kurang' : 'lebih'} ${fmt(Math.abs(g - 5))} dari 5 — ganti percobaannya lewat penggeser dan hasilnya terus berubah-ubah. Secara teori, tepat 5 gambar memang hasil yang paling mungkin, tetapi peluangnya hanya sekitar seperempat, jadi kira-kira tiga dari empat kali hasilnya justru bukan 5.`
        },
        durasi: 2400,
      },
      {
        id: 's2',
        judul: 'Perbanyak jadi 100',
        narasi:
          'Sekarang kita buat grafik frekuensi relatif sepanjang percobaan. Di awal ia melonjak-lonjak liar, karena satu lemparan masih sangat berpengaruh.',
        durasi: 2800,
      },
      {
        id: 's3',
        judul: 'Seribu lemparan',
        narasi:
          'Goyangannya mulai mereda. Satu lemparan tambahan tidak lagi sanggup menggeser angkanya jauh-jauh.',
        durasi: 2200,
      },
      {
        id: 's4',
        judul: 'Sepuluh ribu lemparan',
        narasi:
          'Kurvanya menempel di sekitar 0,5. Inilah yang sebenarnya dijanjikan oleh kalimat "peluangnya setengah".',
        durasi: 2400,
      },
      {
        id: 's5',
        judul: 'Peluang bukan janji per lemparan',
        narasi:
          'Peluang tidak menjamin apa pun tentang sepuluh lemparan berikutnya. Ia menyatakan ke mana frekuensi relatif MENUJU ketika percobaan diperbanyak tanpa batas.',
        durasi: 2400,
      },
      {
        id: 's6',
        judul: 'Rumus peluang teoretis',
        narasi:
          'Untuk percobaan yang setiap hasilnya berpeluang sama, peluang dihitung dengan membandingkan banyaknya hasil yang diinginkan terhadap seluruh hasil yang mungkin.',
        rumus: '[p:P(A)] = [na:n(A)] / [ns:n(S)]',
        durasi: 2400,
      },
    ],
  },

  eksperimen: {
    judul: 'Perbanyak lemparannya sendiri',
    ajakan:
      'Geser banyaknya lemparan dan ganti percobaannya. Bandingkan dua angka di bawah judul: selisih mutlaknya cenderung membesar, sedangkan selisih relatifnya cenderung mengecil.',
    params: [
      { key: 'n', label: 'Banyak lemparan', min: 10, max: 20000, step: 10, awal: 200, bulat: true },
      { key: 'benih', label: 'Percobaan ke-', min: 1, max: 40, step: 1, awal: 1, bulat: true },
    ],
    Visual: VisualEksperimen,
    temuan: (p) => {
      const n = clamp(Math.round(p.n ?? 200), 10, 20000)
      const benih = clamp(Math.round(p.benih ?? 1), 1, 40)
      const sim = simulasi(n, benih)
      const mutlak = Math.abs(sim.gambar - n / 2)
      const relatif = Math.abs(sim.frekuensi - 0.5)
      return (
        <p>
          Dari {fmt(n)} lemparan, muncul {fmt(sim.gambar)} gambar —{' '}
          <strong>frekuensi relatifnya {fmt(sim.frekuensi, 4)}</strong>.{' '}
          {mutlak === 0 ? (
            <>Kali ini kebetulan pas separuh, jadi kedua selisihnya 0 — coba ganti percobaannya.</>
          ) : (
            <>
              Selisihnya dari 0,5 {relatif < 0.05 ? 'hanya ' : ''}
              {fmt(relatif, 4)}, sedangkan selisih <em>mutlaknya</em> {fmt(mutlak)} lemparan.
            </>
          )}{' '}
          Coba perbesar
          banyaknya lemparan: selisih dari 0,5 itu cenderung mengecil, sedangkan selisih mutlaknya
          cenderung membesar. Keduanya hanya kecenderungan — pada satu percobaan tertentu angkanya
          masih bisa naik-turun. Itulah sebabnya "hukum bilangan besar" berbicara tentang
          perbandingan, bukan tentang selisih jumlah.
        </p>
      )
    },
  },

  penjelasan: {
    SMP: (
      <>
        <p>
          Ada dua hal berbeda yang sering tertukar:
        </p>
        <ul>
          <li>
            <strong>Peluang teoretis</strong> — dihitung dari banyaknya kemungkinan. Untuk koin
            seimbang, P(gambar) = 1/2.
          </li>
          <li>
            <strong>Frekuensi relatif</strong> — dihitung dari percobaan nyata: banyaknya gambar
            dibagi banyaknya lemparan.
          </li>
        </ul>
        <p>
          Keduanya tidak harus sama. Yang benar adalah: <strong>frekuensi relatif mendekati peluang
          teoretis ketika percobaannya diperbanyak.</strong> Pernyataan ini disebut hukum bilangan
          besar.
        </p>
        <h4>Kekeliruan penjudi</h4>
        <p>
          Setelah lima angka berturut-turut, banyak orang merasa gambar "sudah waktunya" muncul.
          Padahal koin tidak menyimpan ingatan: peluang lemparan berikutnya tetap 1/2. Yang membuat
          frekuensi relatif akhirnya mendekat ke 0,5 bukanlah "koreksi", melainkan{' '}
          <em>pengenceran</em> — lemparan yang jumlahnya makin banyak membuat pengaruh lima lemparan
          awal itu menjadi tidak berarti.
        </p>
        <h4>Yang mengecil dan yang membesar</h4>
        <p>
          Ini bagian yang paling sering mengejutkan: selisih <strong>relatif</strong> terhadap 0,5
          cenderung mengecil, tetapi selisih <strong>mutlak</strong> (banyaknya gambar dikurangi separuh
          lemparan) justru cenderung membesar. Pada 10.000 lemparan, meleset 50 lemparan itu biasa —
          tetapi 50 dari 10.000 hanyalah 0,005.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Untuk n lemparan koin seimbang, banyaknya gambar X berdistribusi binomial B(n, ½) dengan
          nilai harapan E[X] = n/2 dan simpangan baku σ = √(n)/2.
        </p>
        <p>
          Frekuensi relatif X/n punya simpangan baku σ/n = 1/(2√n). Karena itu:
        </p>
        <ul>
          <li>simpangan <strong>mutlak</strong> tumbuh seperti √n — makin banyak lemparan, makin besar;</li>
          <li>simpangan <strong>relatif</strong> mengecil seperti 1/√n — inilah hukum bilangan besar.</li>
        </ul>
        <p>
          Menaikkan lemparan dari 100 menjadi 10.000 (100 kali lipat) hanya memperkecil simpangan
          relatif 10 kali. Ketelitian dalam statistika memang mahal.
        </p>
        <p>
          Peluang mendapat tepat 5 gambar dari 10 lemparan adalah C(10,5)/2¹⁰ = 252/1024 ≈ 0,246 —
          hasil "paling mungkin", tetapi tetap saja terjadi kurang dari seperempat kali. Jadi
          pertanyaan pada judul konsep ini punya jawaban yang tepat: bahkan hasil yang paling
          mungkin pun peluangnya hanya sekitar seperempat, sehingga sekitar tiga dari empat percobaan
          hasilnya bukan 5.
        </p>
      </>
    ),
  },

  rumus: {
    src: 'P(A) = [na:n(A)] / [ns:n(S)]',
    roles: { na: 'a', ns: 'b' },
    arti: {
      na: 'Banyaknya hasil yang termasuk kejadian A.',
      ns: 'Banyaknya seluruh hasil yang mungkin, dan semuanya harus berpeluang sama.',
    },
  },

  soal: [
    {
      id: 'plg-1',
      tipe: 'pilihan',
      topicId: 'smp8-peluang-teoretis',
      kelas: 8,
      tingkat: 'mudah',
      konsep: 'peluang-simulasi',
      pertanyaan: 'Sebuah dadu seimbang dilempar. Berapa peluang muncul mata dadu genap?',
      pilihan: [
        { id: 'a', label: '1/2', benar: true },
        { id: 'b', label: '1/3', diagnosa: '1/3 sama dengan 2/6 — berarti mata genapnya baru terhitung dua. Mata genap ada tiga: 2, 4, dan 6.' },
        { id: 'c', label: '1/6', diagnosa: 'Itu peluang munculnya SATU mata dadu tertentu, bukan tiga mata sekaligus.' },
        { id: 'd', label: '3/2', diagnosa: 'Peluang tidak pernah lebih dari 1. Sepertinya 3 mata genap dibagi 2 (genap dan ganjil), padahal penyebutnya harus banyaknya seluruh mata dadu, yaitu 6.' },
      ],
      hint: [
        'Tulis dulu semua hasil yang mungkin: 1, 2, 3, 4, 5, 6.',
        'Mana saja yang genap?',
        'Peluang = banyaknya hasil genap dibagi banyaknya seluruh hasil.',
      ],
      pembahasan: 'Mata genap: 2, 4, 6 — ada 3 dari 6 hasil. Jadi P = 3/6 = 1/2.',
    },
    {
      id: 'plg-2',
      tipe: 'benar-salah',
      topicId: 'smp8-peluang-teoretis',
      kelas: 8,
      tingkat: 'sedang',
      konsep: 'peluang-simulasi',
      pertanyaan:
        'Sebuah koin seimbang sudah muncul angka enam kali berturut-turut. Peluang lemparan ketujuh muncul gambar menjadi lebih besar dari ½.',
      jawaban: false,
      diagnosa:
        'Ini kekeliruan penjudi. Koin tidak menyimpan ingatan — hasil sebelumnya tidak memengaruhi lemparan berikutnya sama sekali.',
      hint: [
        'Apakah koin bisa "mengingat" hasil lemparan sebelumnya?',
        'Peluang setiap lemparan dihitung dari koin itu sendiri, bukan dari riwayatnya.',
        'Yang membuat frekuensi relatif mendekati 0,5 adalah banyaknya lemparan, bukan koreksi.',
      ],
      pembahasan:
        'Salah. Setiap lemparan saling bebas, jadi peluangnya tetap 1/2. Frekuensi relatif mendekati 0,5 bukan karena hasil terdahulu "dikoreksi", melainkan karena pengaruhnya makin encer saat lemparan diperbanyak.',
    },
    (rnd) => {
      const n = [100, 200, 500, 1000][Math.floor(rnd() * 4)]
      const g = Math.round(n / 2) + (Math.floor(rnd() * 21) - 10)
      return {
        id: 'plg-3',
        tipe: 'angka',
        topicId: 'smp8-peluang-teoretis',
        kelas: 8,
        tingkat: 'sedang',
        konsep: 'peluang-simulasi',
        pertanyaan: `Dari ${n} kali lemparan koin seimbang, muncul gambar sebanyak ${g} kali. Berapa frekuensi relatif munculnya gambar? Bulatkan sampai tiga angka di belakang koma.`,
        jawaban: Math.round((g / n) * 1000) / 1000,
        toleransi: 0.0011,
        hint: [
          'Frekuensi relatif dihitung dari hasil percobaan, bukan dari teori.',
          `Bagi banyaknya gambar dengan banyaknya lemparan: ${g} ÷ ${n}.`,
          'Lalu bulatkan sampai tiga angka di belakang koma.',
        ],
        pembahasan: `Frekuensi relatif = ${g}/${n} = ${fmt(Math.round((g / n) * 1000) / 1000, 3)}. Peluang teoretisnya 0,5, tetapi frekuensi relatif dari percobaan nyata tidak harus sama persis dengan itu.`,
      }
    },
    {
      id: 'plg-4',
      tipe: 'urutkan',
      topicId: 'smp8-peluang-teoretis',
      kelas: 9,
      tingkat: 'sulit',
      konsep: 'peluang-simulasi',
      pertanyaan:
        'Urutkan dari yang frekuensi relatifnya paling mungkin JAUH dari 0,5 sampai yang paling mungkin DEKAT dengan 0,5.',
      langkah: ['10 lemparan', '100 lemparan', '1.000 lemparan', '10.000 lemparan'],
      hint: [
        'Perhatikan bentuk kurva pada simulasi: bagian mana yang paling bergoyang?',
        'Makin sedikit lemparan, makin besar pengaruh satu hasil terhadap perbandingannya.',
      ],
      pembahasan:
        'Makin banyak lemparan, makin kecil simpangan relatifnya (sebanding dengan 1/√n). Karena itu 10 lemparan paling liar dan 10.000 lemparan paling stabil.',
    },
    {
      id: 'plg-5',
      tipe: 'pilihan',
      topicId: 'smp8-peluang-teoretis',
      kelas: 9,
      tingkat: 'sulit',
      konsep: 'peluang-simulasi',
      pertanyaan:
        'Dua koin seimbang dilempar bersamaan. Berapa peluang keduanya muncul gambar?',
      pilihan: [
        { id: 'a', label: '1/4', benar: true },
        {
          id: 'b',
          label: '1/2',
          diagnosa: 'Itu peluang untuk satu koin saja. Dua koin punya empat kemungkinan hasil, bukan dua.',
        },
        {
          id: 'c',
          label: '1/3',
          diagnosa:
            'Kalau hasilnya dianggap hanya "dua gambar, dua angka, satu-satu", ketiganya tidak berpeluang sama — "satu-satu" bisa terjadi dengan dua cara.',
        },
        { id: 'd', label: '2/4', diagnosa: 'Ada dua hasil yang memuat tepat satu gambar (GA dan AG), tetapi yang diminta adalah KEDUANYA gambar — dan itu hanya GG, satu hasil.' },
      ],
      hint: [
        'Tulis semua kemungkinan sebagai pasangan: GG, GA, AG, AA.',
        'Ada berapa kemungkinan seluruhnya?',
        'Berapa di antaranya yang keduanya gambar?',
      ],
      pembahasan:
        'Ruang sampelnya {GG, GA, AG, AA} — empat hasil berpeluang sama. Hanya satu yang keduanya gambar, jadi P = 1/4. Perhatikan GA dan AG dihitung terpisah; itulah sebabnya jawaban 1/3 keliru.',
    },
  ],

  lanjut: ['persen-dari', 'rata-rata-menipu', 'pecahan-penyebut'],
}

export default konsep
