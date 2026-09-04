/* ============================================================
   KONSEP — Kenapa x² menghasilkan lengkung, bukan garis lurus?
   Kelas 9 · Aljabar

   Gagasan: bandingkan SELISIH antar nilai.
   Pada y = 2x, setiap langkah ke kanan menambah jumlah yang sama
   (selisih tetap) — jadi grafiknya lurus.
   Pada y = x², tambahannya makin besar: 1, 3, 5, 7 … (bilangan
   ganjil). Karena tambahannya sendiri bertambah, garisnya
   melengkung ke atas.

   Kenapa bilangan ganjil? Karena memperbesar persegi n×n menjadi
   (n+1)×(n+1) berarti menambahkan huruf L berisi 2n+1 kotak.
   ============================================================ */

import { Svg, Tag } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

const W = 690
const H = 440

/* Wilayah grafik */
const GX0 = 350
const GX1 = 660
const GY0 = 70
const GY1 = 390

const XMIN = -0.6
const XMAX = 5.4

function skalaY(a: number) {
  const maks = Math.max(6, a * 25 * 1.12)
  return { ymin: -maks * 0.12, ymax: maks }
}

/* ---------------- Panel tabel selisih ---------------- */

function Tabel({
  a,
  linear,
  tampilBaris,
  tampilSelisih,
  tampilSelisih2,
  nyala,
}: {
  a: number
  /** true: tabel untuk y = 2x, false: untuk y = a x². */
  linear: boolean
  tampilBaris: number
  tampilSelisih: number
  tampilSelisih2: number
  nyala: boolean
}) {
  const xs = [0, 1, 2, 3, 4, 5]
  const f = (x: number) => (linear ? 2 * x : a * x * x)
  const x0 = 56
  const y0 = 116
  const dy = 42

  return (
    <g>
      <text x={x0} y={y0 - 32} fontSize={15} fontWeight={800} fill="var(--ink-2)">
        x
      </text>
      <text x={x0 + 52} y={y0 - 32} fontSize={15} fontWeight={800} fill={linear ? 'var(--m-c)' : 'var(--m-a)'}>
        {linear ? 'y = 2x' : 'y = ax²'}
      </text>
      <text x={x0 + 150} y={y0 - 32} fontSize={15} fontWeight={800} fill="var(--m-b)">
        selisih
      </text>

      {xs.map((x, i) => {
        const o = clamp(tampilBaris * xs.length - i, 0, 1)
        if (o <= 0.02) return null
        const y = y0 + i * dy
        const sel = i > 0 ? f(x) - f(x - 1) : null
        const so = sel === null ? 0 : Math.min(o, clamp(tampilSelisih * xs.length - i, 0, 1))
        return (
          <g key={x} opacity={o}>
            <text x={x0} y={y} fontSize={17} fontWeight={700} fill="var(--ink-2)" fontFamily="var(--font-math)">
              {fmt(x)}
            </text>
            <text
              x={x0 + 52}
              y={y}
              fontSize={18}
              fontWeight={800}
              fill={linear ? 'var(--m-c)' : 'var(--m-a)'}
              fontFamily="var(--font-math)"
            >
              {fmt(f(x))}
            </text>
            {sel !== null && so > 0.02 && (
              <g opacity={so}>
                <path
                  d={`M ${x0 + 108} ${y - dy + 6} q 20 ${dy / 2 - 6} 0 ${dy - 12}`}
                  fill="none"
                  stroke="var(--m-b)"
                  strokeWidth={1.8}
                />
                <text
                  x={x0 + 150}
                  y={y - dy / 2}
                  fontSize={17}
                  fontWeight={800}
                  fill={nyala ? 'var(--m-hi)' : 'var(--m-b)'}
                  fontFamily="var(--font-math)"
                >
                  {`+${fmt(sel)}`}
                </text>
              </g>
            )}
          </g>
        )
      })}

      {/* selisih dari selisih */}
      {tampilSelisih2 > 0.05 && !linear && (
        <g opacity={tampilSelisih2}>
          {xs.slice(2).map((x, i) => {
            const s1 = f(x) - f(x - 1)
            const s0 = f(x - 1) - f(x - 2)
            return (
              <text
                key={x}
                x={x0 + 226}
                y={y0 + (i + 1.5) * dy}
                fontSize={16}
                fontWeight={800}
                fill="var(--m-ab)"
                fontFamily="var(--font-math)"
              >
                {`+${fmt(s1 - s0)}`}
              </text>
            )
          })}
          <text x={x0 + 226} y={y0 - 32} fontSize={14} fontWeight={800} fill="var(--m-ab)">
            selisih ke-2
          </text>
        </g>
      )}
    </g>
  )
}

/* ---------------- Panel grafik ---------------- */

function Grafik({
  a,
  b = 0,
  c = 0,
  linear,
  tampil,
  titikSampai,
  nyalaKurva,
}: {
  a: number
  b?: number
  c?: number
  linear: boolean
  tampil: number
  /** sampai x berapa titik-titiknya sudah digambar. */
  titikSampai: number
  nyalaKurva?: boolean
}) {
  const { ymin, ymax } = skalaY(a)
  const kx = (x: number) => GX0 + ((x - XMIN) / (XMAX - XMIN)) * (GX1 - GX0)
  const ky = (y: number) => GY1 - ((y - ymin) / (ymax - ymin)) * (GY1 - GY0)
  const f = (x: number) => (linear ? 2 * x : a * x * x + b * x + c)

  const titik = [0, 1, 2, 3, 4, 5].filter((x) => x <= titikSampai)

  // Kurva digambar dari 100 potongan.
  const n = 100
  const kurva: string[] = []
  for (let i = 0; i <= n; i++) {
    const x = XMIN + ((XMAX - XMIN) * i) / n
    if (x > titikSampai + 0.02) break
    const y = f(x)
    if (y < ymin - 3 || y > ymax + 3) continue
    kurva.push(`${kurva.length === 0 ? 'M' : 'L'} ${kx(x).toFixed(1)} ${ky(y).toFixed(1)}`)
  }

  return (
    <g opacity={tampil}>
      {/* kisi */}
      {[0, 1, 2, 3, 4, 5].map((x) => (
        <line key={`v${x}`} x1={kx(x)} y1={GY0} x2={kx(x)} y2={GY1} stroke="var(--m-grid)" strokeWidth={1} />
      ))}
      <line x1={GX0} y1={ky(0)} x2={GX1} y2={ky(0)} stroke="var(--m-axis)" strokeWidth={1.8} />
      <line x1={kx(0)} y1={GY0} x2={kx(0)} y2={GY1} stroke="var(--m-axis)" strokeWidth={1.8} />
      {[0, 1, 2, 3, 4, 5].map((x) => (
        <text
          key={`l${x}`}
          x={kx(x)}
          y={ky(0) + 16}
          textAnchor="middle"
          fontSize={11.5}
          fontWeight={700}
          fill="var(--ink-soft)"
        >
          {fmt(x)}
        </text>
      ))}

      {kurva.length > 1 && (
        <path
          d={kurva.join(' ')}
          fill="none"
          stroke={linear ? 'var(--m-c)' : 'var(--m-a)'}
          strokeWidth={nyalaKurva ? 4 : 2.8}
          strokeLinejoin="round"
        />
      )}

      {titik.map((x) => {
        const y = f(x)
        if (y > ymax || y < ymin) return null
        return (
          <g key={x}>
            <circle cx={kx(x)} cy={ky(y)} r={4.5} fill={linear ? 'var(--m-c)' : 'var(--m-a)'} />
            {/* garis putus-putus ke sumbu, memperlihatkan tingginya */}
            <line
              x1={kx(x)}
              y1={ky(0)}
              x2={kx(x)}
              y2={ky(y)}
              stroke={linear ? 'var(--m-c)' : 'var(--m-a)'}
              strokeWidth={1.2}
              strokeDasharray="3 4"
              opacity={0.7}
            />
          </g>
        )
      })}
    </g>
  )
}

/* ---------------- Panel persegi (gnomon) ---------------- */

function PersegiTumbuh({ n, tampil }: { n: number; tampil: number }) {
  const u = 26
  const x0 = 70
  const y0 = 330
  const kotak = []
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      kotak.push(
        <rect
          key={`a${i}-${j}`}
          x={x0 + j * u}
          y={y0 - (i + 1) * u}
          width={u - 1.5}
          height={u - 1.5}
          fill="var(--m-a)"
          fillOpacity={0.35}
          stroke="var(--m-a)"
          strokeWidth={1}
        />,
      )
    }
  }
  // Huruf L tambahan berisi 2n+1 kotak.
  const tambah = []
  for (let j = 0; j <= n; j++) {
    tambah.push({ i: n, j })
  }
  for (let i = 0; i < n; i++) {
    tambah.push({ i, j: n })
  }
  return (
    <g>
      {kotak}
      {tambah.map(({ i, j }, k) => (
        <rect
          key={`b${k}`}
          x={x0 + j * u}
          y={y0 - (i + 1) * u}
          width={u - 1.5}
          height={u - 1.5}
          fill="var(--m-b)"
          fillOpacity={0.55 * clamp(tampil * tambah.length - k, 0, 1)}
          stroke="var(--m-b)"
          strokeWidth={1.2}
          strokeOpacity={clamp(tampil * tambah.length - k, 0, 1)}
        />
      ))}
      <Tag x={x0 + ((n + 1) * u) / 2} y={y0 + 26} warna="var(--m-b)" size={15}>
        {`tambahannya ${fmt(2 * n + 1)} kotak`}
      </Tag>
      <Tag x={x0 + (n * u) / 2} y={y0 - (n * u) / 2} warna="var(--m-a)" size={15}>
        {`${fmt(n)}² = ${fmt(n * n)}`}
      </Tag>
    </g>
  )
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const a = clamp(p.a ?? 1, 0.5, 3)
  const nGnomon = clamp(Math.round(p.n ?? 3), 1, 5)

  const linear = step === 0
  const barisMuncul = step === 0 ? seg(t, 0.05, 0.75) : 1
  const selisihMuncul = step === 0 ? seg(t, 0.4, 0.95) : step >= 2 ? 1 : step === 1 ? 0 : 1
  const selisih2 = fase(step, t, 5)
  const gnomon = step === 3
  const titikSampai = step === 1 ? 5 * seg(t, 0.1, 0.9) : 5

  const nyalaA = sorot === 'a'
  const nyalaKuadrat = sorot === 'x2'

  return (
    <Svg w={W} h={H} maxH={450} label="Tabel selisih dan grafik fungsi kuadrat">
      {gnomon ? (
        <PersegiTumbuh n={nGnomon} tampil={seg(t, 0.25, 0.9)} />
      ) : (
        <Tabel
          a={a}
          linear={linear}
          tampilBaris={barisMuncul}
          tampilSelisih={selisihMuncul}
          tampilSelisih2={selisih2}
          nyala={nyalaA}
        />
      )}

      <Grafik
        a={a}
        linear={linear}
        tampil={1}
        titikSampai={titikSampai}
        nyalaKurva={nyalaKuadrat}
      />

      {step === 0 && (
        <Tag x={(GX0 + GX1) / 2} y={44} warna="var(--m-c)" size={16}>
          selisihnya selalu 2 → grafiknya lurus
        </Tag>
      )}
      {step === 2 && (
        <Tag x={(GX0 + GX1) / 2} y={44} warna="var(--m-b)" size={16}>
          {a === 1 ? 'selisihnya 1, 3, 5, 7 — bilangan ganjil' : 'selisihnya terus membesar'}
        </Tag>
      )}
      {step === 3 && (
        <Tag x={(GX0 + GX1) / 2} y={44} warna="var(--m-b)" size={16}>
          memperbesar persegi berarti menambah huruf L
        </Tag>
      )}
      {step >= 5 && (
        <Tag x={(GX0 + GX1) / 2} y={44} warna="var(--m-ab)" size={16}>
          {`selisih dari selisih selalu tetap: ${fmt(2 * a)}`}
        </Tag>
      )}
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const a = clamp(p.a ?? 1, -2, 3)
  const b = clamp(p.b ?? 0, -6, 6)
  const c = clamp(p.c ?? 0, -6, 6)
  const aman = Math.abs(a) < 0.05 ? 0.05 * Math.sign(a || 1) : a
  const puncakX = -b / (2 * aman)
  const puncakY = aman * puncakX * puncakX + b * puncakX + c

  const { ymin, ymax } = skalaY(Math.max(0.5, Math.abs(aman)))
  const kx = (x: number) => GX0 + ((x - XMIN) / (XMAX - XMIN)) * (GX1 - GX0)
  const ky = (y: number) => GY1 - ((y - ymin) / (ymax - ymin)) * (GY1 - GY0)

  return (
    <Svg w={W} h={H} maxH={450} label="Grafik fungsi kuadrat yang koefisiennya bisa diubah">
      <Tabel
        a={aman}
        linear={false}
        tampilBaris={1}
        tampilSelisih={1}
        tampilSelisih2={1}
        nyala={sorot === 'a'}
      />
      <Grafik a={aman} b={b} c={c} linear={false} tampil={1} titikSampai={5} nyalaKurva={sorot === 'x2'} />
      {puncakX >= XMIN && puncakX <= XMAX && puncakY >= ymin && puncakY <= ymax && (
        <>
          <circle cx={kx(puncakX)} cy={ky(puncakY)} r={6} fill="var(--m-hi)" />
          <Tag x={kx(puncakX)} y={ky(puncakY) - 22} warna="var(--m-hi)" size={13}>
            {`puncak (${fmt(puncakX, 2)}; ${fmt(puncakY, 2)})`}
          </Tag>
        </>
      )}
      <Tag x={(GX0 + GX1) / 2} y={44} warna="var(--ink)" size={16}>
        {`y = ${fmt(aman, 2)}x² ${b >= 0 ? '+' : '−'} ${fmt(Math.abs(b), 2)}x ${
          c >= 0 ? '+' : '−'
        } ${fmt(Math.abs(c), 2)}`}
      </Tag>
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'parabola',
  topicId: 'smp9-fungsi-kuadrat',
  judul: 'Grafik fungsi kuadrat',
  pertanyaan: 'Kenapa x² menghasilkan lengkung, bukan garis lurus?',
  tagline: 'Karena setiap langkah ke kanan menambah lebih banyak dari langkah sebelumnya.',
  kelas: 9,
  domain: 'aljabar',
  tags: ['parabola', 'kuadrat', 'grafik', 'fungsi', 'selisih'],

  tebak: {
    pertanyaan:
      'Untuk y = x², nilai y berturut-turut adalah 0, 1, 4, 9, 16. Berapa selisih antar nilai itu?',
    pilihan: [
      {
        id: 'a',
        label: 'Selalu sama',
        balasan:
          'Kalau selisihnya selalu sama, grafiknya pasti garis lurus. Coba hitung: dari 1 ke 4 naik 3, dari 4 ke 9 naik 5.',
      },
      {
        id: 'b',
        label: '1, 3, 5, 7 — bilangan ganjil',
        benar: true,
        balasan:
          'Betul, dan bukan kebetulan. Sebentar lagi kamu bisa melihat kenapa yang muncul justru bilangan ganjil.',
      },
      {
        id: 'c',
        label: '1, 2, 3, 4',
        balasan:
          'Kalau selisihnya 1, 2, 3, 4, nilainya akan menjadi 0, 1, 3, 6, 10 — itu bilangan segitiga, bukan bilangan kuadrat.',
      },
    ],
    penutup:
      'Selisih yang tidak tetap itulah sumber lengkungannya. Yang tetap justru selisih dari selisihnya.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      { key: 'a', label: 'Koefisien a', min: 0.5, max: 3, step: 0.5, awal: 1 },
      { key: 'n', label: 'Persegi ke- (langkah 4)', min: 1, max: 5, step: 1, awal: 3, bulat: true },
    ],
    roles: { a: 'a', x2: 'b', selisih: 'ab', lurus: 'c' },
    arti: {
      a: 'Koefisien di depan x². Ia menentukan seberapa cepat kurvanya melengkung.',
      x2: 'Bagian kuadrat — sumber lengkungannya.',
      selisih: 'Selisih dari selisih. Untuk fungsi kuadrat, nilainya selalu tetap yaitu 2a.',
      lurus: 'Fungsi linear, selisihnya tetap sehingga grafiknya lurus.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Bandingkan dulu dengan garis lurus',
        narasi:
          'Pada y = 2x, setiap langkah ke kanan menambah 2 — selalu 2. Karena tambahannya tidak pernah berubah, titik-titiknya berbaris lurus.',
        rumus: '[lurus:y = 2x] → selisih tetap 2',
        durasi: 2600,
      },
      {
        id: 's1',
        judul: 'Sekarang y = x²',
        narasi:
          'Nilainya 0, 1, 4, 9, 16, 25. Titik-titiknya jelas tidak berbaris lurus — tetapi kenapa?',
        durasi: 2400,
      },
      {
        id: 's2',
        judul: 'Lihat selisihnya',
        narasi:
          'Tambahannya 1, lalu 3, lalu 5, lalu 7. Setiap langkah menambah lebih banyak daripada langkah sebelumnya. Itulah yang membuat garisnya menanjak makin curam.',
        rumus: 'selisih = 1, 3, 5, 7, …',
        durasi: 2600,
      },
      {
        id: 's3',
        judul: 'Kenapa bilangan ganjil?',
        narasi:
          'Karena x² adalah luas persegi. Untuk memperbesar persegi n×n menjadi (n+1)×(n+1), kamu menambahkan satu baris, satu kolom, dan satu kotak pojok — seluruhnya 2n+1 kotak, dan itu selalu ganjil.',
        rumus: '(n+1)^2 − n^2 = 2n + 1',
        durasi: 3000,
      },
      {
        id: 's4',
        judul: 'Tambahan yang membesar = garis melengkung',
        narasi:
          'Kalau tambahannya tetap, grafik lurus. Kalau tambahannya sendiri bertambah, grafik membengkok ke atas. Itulah parabola.',
        durasi: 2200,
      },
      {
        id: 's5',
        judul: 'Yang tetap adalah selisih ke-2',
        narasi:
          'Selisih dari selisih selalu bernilai sama, yaitu 2a. Ciri inilah yang membedakan fungsi kuadrat dari fungsi lain.',
        rumus: 'selisih ke-2 = [selisih:2a]',
        durasi: 2400,
      },
      {
        id: 's6',
        judul: 'Bentuk umumnya',
        narasi:
          'Menambahkan bx dan c hanya menggeser dan memiringkan, tidak mengubah kelengkungannya. Yang menentukan lengkung hanyalah a.',
        rumus: 'y = [a:a][x2:x^2] + bx + c',
        durasi: 2200,
      },
    ],
  },

  eksperimen: {
    judul: 'Ubah a, b, dan c',
    ajakan:
      'Perhatikan: hanya a yang mengubah bentuk lengkungannya. Nilai b dan c hanya memindahkan kurvanya.',
    params: [
      { key: 'a', label: 'a (lengkungan)', min: -2, max: 3, step: 0.25, awal: 1 },
      { key: 'b', label: 'b (kemiringan)', min: -6, max: 6, step: 0.5, awal: 0 },
      { key: 'c', label: 'c (geser tegak)', min: -6, max: 6, step: 1, awal: 0 },
    ],
    Visual: VisualEksperimen,
    temuan: (p) => {
      const a = clamp(p.a ?? 1, -2, 3)
      const b = clamp(p.b ?? 0, -6, 6)
      const aman = Math.abs(a) < 0.05 ? 0.05 : a
      const px = -b / (2 * aman)
      return (
        <p>
          <strong>Selisih ke-2 selalu {fmt(2 * aman, 2)}</strong> — nilainya 2a, dan tidak
          bergantung pada b maupun c.{' '}
          {a > 0
            ? 'Karena a positif, kurvanya membuka ke atas dan punya titik terendah.'
            : a < 0
              ? 'Karena a negatif, tambahannya justru mengecil terus, sehingga kurvanya membuka ke bawah dan punya titik tertinggi.'
              : 'Dengan a hampir nol, kurvanya nyaris menjadi garis lurus.'}{' '}
          Puncaknya berada di x = −b/2a = {fmt(px, 2)}. Coba geser c saja: seluruh kurva naik-turun
          tanpa berubah bentuk sedikit pun.
        </p>
      )
    },
  },

  penjelasan: {
    SMP: (
      <>
        <p>
          Bentuk sebuah grafik ditentukan oleh <strong>bagaimana nilainya bertambah</strong>, bukan
          oleh nilainya sendiri.
        </p>
        <ul>
          <li>
            Kalau tambahannya <strong>tetap</strong>, grafiknya garis lurus. Inilah fungsi linear.
          </li>
          <li>
            Kalau tambahannya <strong>terus membesar</strong>, grafiknya melengkung ke atas.
          </li>
        </ul>
        <p>
          Untuk y = x², tambahannya 1, 3, 5, 7, … Bilangan ganjil ini muncul karena x² adalah luas
          persegi: memperbesar persegi n×n menjadi (n+1)×(n+1) memerlukan tambahan berbentuk huruf L
          berisi n + n + 1 = 2n + 1 kotak.
        </p>
        <p style={{ textAlign: 'center' }}>(n + 1)² − n² = 2n + 1</p>
        <h4>Ciri khas fungsi kuadrat</h4>
        <p>
          Selisih pertamanya berubah, tetapi <strong>selisih keduanya tetap</strong>, yaitu 2a. Ini
          alat yang praktis: kalau kamu diberi tabel nilai dan selisih keduanya konstan, fungsinya
          pasti kuadrat.
        </p>
        <h4>Peran a, b, dan c</h4>
        <ul>
          <li>a menentukan lengkungan dan arah bukaan (ke atas bila positif, ke bawah bila negatif);</li>
          <li>b menggeser kurva ke samping — puncaknya berada di x = −b/2a;</li>
          <li>c menggeser kurva naik atau turun, karena c adalah nilai y saat x = 0.</li>
        </ul>
      </>
    ),
    SMA: (
      <>
        <p>
          Gagasan "selisih" adalah bentuk diskret dari turunan. Untuk f(x) = x², selisih pada
          langkah h adalah
        </p>
        <p style={{ textAlign: 'center' }}>
          f(x + h) − f(x) = 2xh + h²
        </p>
        <p>
          Untuk h = 1 diperoleh 2x + 1 — persis bilangan ganjil pada tabel. Membaginya dengan h lalu
          mengambil limit h → 0 memberi f′(x) = 2x: kemiringannya tidak tetap, dan itulah definisi
          formal dari "melengkung".
        </p>
        <p>
          Selisih kedua bersesuaian dengan turunan kedua: f″(x) = 2a untuk f(x) = ax² + bx + c.
          Karena f″ konstan dan tidak pernah nol (asalkan a ≠ 0), kurvanya tidak pernah berubah arah
          kecekungan — parabola selalu cekung ke satu arah saja.
        </p>
        <p>
          Menuliskan ulang dalam bentuk kuadrat sempurna, y = a(x + b/2a)² + (c − b²/4a),
          memperlihatkan bahwa setiap parabola adalah hasil menggeser dan meregangkan y = x². Jadi
          hanya ada satu bentuk parabola; sisanya cuma perpindahan tempat.
        </p>
      </>
    ),
  },

  rumus: {
    src: 'y = [a:a][x2:x^2] + bx + c,  selisih ke-2 = [selisih:2a]',
    roles: { a: 'a', x2: 'b', selisih: 'ab' },
    arti: {
      a: 'Menentukan seberapa cepat tambahannya membesar. Makin besar |a|, makin curam lengkungnya.',
      x2: 'Bagian kuadrat. Tanpa suku ini, grafiknya kembali menjadi garis lurus.',
      selisih: 'Selisih dari selisih — nilainya tetap, dan inilah tanda pengenal fungsi kuadrat.',
    },
  },

  soal: [
    {
      id: 'par-1',
      tipe: 'pilihan',
      topicId: 'smp9-fungsi-kuadrat',
      kelas: 9,
      tingkat: 'mudah',
      konsep: 'parabola',
      pertanyaan:
        'Sebuah tabel menunjukkan nilai y berturut-turut: 3, 5, 9, 15, 23. Fungsi seperti apa ini?',
      pilihan: [
        { id: 'a', label: 'Kuadrat, karena selisih keduanya tetap', benar: true },
        {
          id: 'b',
          label: 'Linear, karena nilainya terus naik',
          diagnosa:
            'Naik terus belum tentu linear. Yang menandai linear adalah selisih PERTAMA yang tetap, dan di sini selisihnya 2, 4, 6, 8 — berubah.',
        },
        {
          id: 'c',
          label: 'Bukan keduanya, karena selisihnya berubah',
          diagnosa:
            'Selisih pertama memang berubah, tetapi coba hitung selisih dari selisih itu: 2, 2, 2 — tetap.',
        },
      ],
      hint: [
        'Hitung dulu selisih antar nilai berurutan.',
        'Selisihnya 2, 4, 6, 8. Apakah itu tetap?',
        'Sekarang hitung selisih dari selisih tadi.',
      ],
      pembahasan:
        'Selisih pertama: 2, 4, 6, 8 (berubah). Selisih kedua: 2, 2, 2 (tetap). Selisih kedua yang konstan adalah tanda pasti fungsi kuadrat, dengan 2a = 2 sehingga a = 1.',
    },
    (rnd) => {
      const a = 1 + Math.floor(rnd() * 3)
      const x = 2 + Math.floor(rnd() * 5)
      return {
        id: 'par-2',
        tipe: 'angka',
        topicId: 'smp9-fungsi-kuadrat',
        kelas: 9,
        tingkat: 'mudah',
        konsep: 'parabola',
        pertanyaan: `Diketahui y = ${a}x². Berapa nilai y ketika x = ${x}?`,
        jawaban: a * x * x,
        toleransi: 1e-9,
        hint: [
          'Kerjakan pangkatnya lebih dulu, baru kalikan dengan koefisiennya.',
          `${x}² = ${x * x}.`,
          `Lalu ${a} × ${x * x}.`,
        ],
        pembahasan: `y = ${a} × ${x}² = ${a} × ${x * x} = ${a * x * x}. Perhatikan urutannya: kuadratkan dulu, baru kalikan.`,
      }
    },
    {
      id: 'par-3',
      tipe: 'benar-salah',
      topicId: 'smp9-fungsi-kuadrat',
      kelas: 9,
      tingkat: 'sedang',
      konsep: 'parabola',
      pertanyaan: 'Mengubah nilai c pada y = ax² + bx + c akan mengubah bentuk lengkungan grafiknya.',
      jawaban: false,
      diagnosa:
        'Nilai c hanya menambah bilangan yang sama pada setiap nilai y, sehingga seluruh kurva bergeser naik atau turun tanpa berubah bentuk.',
      hint: [
        'Coba geser c pada eksperimen dan perhatikan apa yang berubah.',
        'Kalau semua nilai y ditambah bilangan yang sama, apakah selisihnya berubah?',
        'Bentuk lengkungan ditentukan oleh selisih kedua, yaitu 2a.',
      ],
      pembahasan:
        'Salah. Nilai c hanya menggeser kurva secara tegak. Lengkungannya ditentukan oleh a saja, karena selisih kedua bernilai 2a.',
    },
    {
      id: 'par-4',
      tipe: 'urutkan',
      topicId: 'smp9-fungsi-kuadrat',
      kelas: 9,
      tingkat: 'sedang',
      konsep: 'parabola',
      pertanyaan: 'Susun alasan kenapa grafik y = x² melengkung.',
      langkah: [
        'Hitung nilai y untuk x = 0, 1, 2, 3, 4',
        'Cari selisih antar nilai: 1, 3, 5, 7',
        'Selisihnya tidak tetap, melainkan terus membesar',
        'Karena tambahannya makin besar, kemiringannya makin curam',
        'Kemiringan yang berubah menghasilkan garis melengkung',
      ],
      hint: [
        'Mulailah dari data, bukan dari kesimpulan.',
        'Kesimpulan tentang bentuk grafik baru bisa diambil setelah polanya terlihat.',
      ],
      pembahasan:
        'Bentuk grafik ditentukan oleh perubahan nilainya. Selisih yang tetap menghasilkan garis lurus; selisih yang membesar menghasilkan lengkung.',
    },
    (rnd) => {
      const a = [1, 2, 3][Math.floor(rnd() * 3)]
      const b = -(2 + Math.floor(rnd() * 6)) * a * 2
      return {
        id: 'par-5',
        tipe: 'angka',
        topicId: 'smp9-fungsi-kuadrat',
        kelas: 10,
        tingkat: 'sulit',
        konsep: 'parabola',
        pertanyaan: `Tentukan absis (nilai x) titik puncak dari y = ${a}x² ${b >= 0 ? '+' : '−'} ${Math.abs(b)}x + 5.`,
        jawaban: -b / (2 * a),
        toleransi: 1e-6,
        hint: [
          'Titik puncak parabola berada tepat di tengah, pada sumbu simetrinya.',
          'Rumus sumbu simetri: x = −b / (2a).',
          `Di sini a = ${a} dan b = ${b}.`,
        ],
        pembahasan: `x = −b/(2a) = −(${b})/(2 × ${a}) = ${fmt(-b / (2 * a))}. Nilai c tidak berpengaruh terhadap letak puncak secara mendatar.`,
      }
    },
  ],

  lanjut: ['kuadrat-jumlah', 'turunan-kemiringan', 'timbangan-persamaan'],
}

export default konsep
