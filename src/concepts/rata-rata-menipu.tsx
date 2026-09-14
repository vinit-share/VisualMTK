/* ============================================================
   KONSEP — Kenapa rata-rata bisa menipu?
   Kelas 10 · Analisis Data dan Peluang

   Gagasan: rata-rata adalah TITIK SEIMBANG data — persis seperti
   titik tumpu jungkat-jungkit. Karena keseimbangan memperhitungkan
   JARAK, satu nilai yang jauh sanggup menyeret titik tumpu itu
   menjauh. Median hanya menghitung URUTAN, jadi ia tidak bergeming.

   Pernyataan "rata-rata adalah titik seimbang" bukan analogi
   longgar: jumlah simpangan terhadap rata-rata memang selalu nol.
   ============================================================ */

import { Svg, Tag } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

const W = 690
const H = 440

const DASAR = [3, 4, 4, 5, 5, 5, 6, 6, 7]

const GX0 = 70
const GX1 = 650
const XMIN = 0
const XMAX = 42
const BEAM_Y = 300

const kx = (x: number) => GX0 + ((x - XMIN) / (XMAX - XMIN)) * (GX1 - GX0)

const rerata = (d: number[]) => d.reduce((a, b) => a + b, 0) / d.length

function median(d: number[]) {
  const s = [...d].sort((a, b) => a - b)
  const m = Math.floor(s.length / 2)
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}

/** Semua modus data. Bisa lebih dari satu (data bimodal), misalnya bila data ke-10 bernilai 4. */
function modus(d: number[]) {
  const hitung = new Map<number, number>()
  for (const v of d) hitung.set(v, (hitung.get(v) ?? 0) + 1)
  const maks = Math.max(...hitung.values())
  return [...hitung]
    .filter(([, n]) => n === maks)
    .map(([v]) => v)
    .sort((a, b) => a - b)
}

/* ---------------- Turunan yang dipakai bersama gambar dan teks ---------------- */

/** Nilai data ke-10 pada panggung bongkar — persis nilai yang digambar. */
const pencilanBongkar = (p: Record<string, number>) => clamp(Math.round(p.pencilan ?? 35), 8, 40)

/**
 * Batas pencilan untuk sembilan data dasar: Q3 + 1,5 × (Q3 − Q1) = 6 + 1,5 × 2 = 9.
 * Di atas angka ini data ke-10 memang pantas disebut ekstrem; tepat di 8 atau 9
 * ia hanya data terbesar biasa, jadi kata-katanya pun harus ikut berubah.
 */
const PAGAR_PENCILAN = 9

/** Semua angka yang dipakai judul dan narasi langkah bongkar. */
function angkaBongkar(p: Record<string, number>) {
  const x = pencilanBongkar(p)
  const meanDasar = rerata(DASAR)
  const meanPenuh = rerata([...DASAR, x])
  return {
    x,
    meanDasar,
    meanPenuh,
    /** geseran titik tumpu: tepat sepersepuluh jarak data ke-10 ke rata-rata lama. */
    geser: meanPenuh - meanDasar,
    /** median data lengkap — tetap, karena data ke-10 selalu jatuh di kanan. */
    med: median([...DASAR, x]),
    /** banyaknya data dasar yang nilainya di bawah rata-rata baru. */
    dibawah: DASAR.filter((v) => v < meanPenuh).length,
    ekstrem: x > PAGAR_PENCILAN,
  }
}

function TitikData({
  data,
  nyalaPencilan,
  pencilan,
}: {
  data: number[]
  nyalaPencilan: boolean
  pencilan: number | null
}) {
  const tumpuk = new Map<number, number>()
  return (
    <g>
      {data.map((v, i) => {
        const k = tumpuk.get(v) ?? 0
        tumpuk.set(v, k + 1)
        const ini = pencilan !== null && v === pencilan && i === data.length - 1
        return (
          <circle
            key={i}
            cx={kx(v)}
            cy={BEAM_Y - 16 - k * 22}
            r={ini ? 11 : 9}
            fill={ini ? 'var(--m-hi)' : 'var(--m-a)'}
            fillOpacity={ini && nyalaPencilan ? 0.9 : 0.65}
            stroke={ini ? 'var(--m-hi)' : 'var(--m-a)'}
            strokeWidth={ini ? 2.5 : 1.6}
          />
        )
      })}
    </g>
  )
}

function Jungkat({
  data,
  mean,
  miring,
  tampilLengan,
  nyalaLengan = false,
}: {
  data: number[]
  mean: number
  /** kemiringan papan, 0 = seimbang. */
  miring: number
  tampilLengan: number
  /** nyalakan lengan simpangan saat bagian rumus "jarak" disorot. */
  nyalaLengan?: boolean
}) {
  const fx = kx(mean)
  return (
    <g>
      {/* lengan simpangan */}
      {tampilLengan > 0.02 &&
        data.map((v, i) => (
          <line
            key={i}
            x1={kx(v)}
            y1={BEAM_Y + 6}
            x2={fx}
            y2={BEAM_Y + 6}
            stroke={nyalaLengan ? 'var(--m-hi)' : v > mean ? 'var(--m-b)' : 'var(--m-c)'}
            strokeWidth={nyalaLengan ? 3 : 1.4}
            opacity={(nyalaLengan ? 0.9 : 0.35) * tampilLengan}
          />
        ))}

      <g transform={`rotate(${miring.toFixed(2)} ${fx.toFixed(1)} ${BEAM_Y})`}>
        <rect x={GX0 - 10} y={BEAM_Y - 4} width={GX1 - GX0 + 20} height={8} rx={4} fill="var(--ink-2)" />
      </g>
      {/* titik tumpu */}
      <path
        d={`M ${fx} ${BEAM_Y + 6} L ${fx - 16} ${BEAM_Y + 40} L ${fx + 16} ${BEAM_Y + 40} Z`}
        fill="var(--m-ab)"
        stroke="var(--m-ab)"
        strokeWidth={2}
      />
    </g>
  )
}

function GarisAngka() {
  return (
    <g>
      <line x1={GX0} y1={BEAM_Y + 52} x2={GX1} y2={BEAM_Y + 52} stroke="var(--m-axis)" strokeWidth={1.5} />
      {Array.from({ length: 8 }, (_, i) => i * 6).map((v) => (
        <g key={v}>
          <line x1={kx(v)} y1={BEAM_Y + 46} x2={kx(v)} y2={BEAM_Y + 58} stroke="var(--m-axis)" strokeWidth={1.3} />
          <text
            x={kx(v)}
            y={BEAM_Y + 74}
            textAnchor="middle"
            fontSize={12}
            fontWeight={700}
            fill="var(--ink-soft)"
          >
            {fmt(v)}
          </text>
        </g>
      ))}
    </g>
  )
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const { x: pencilan, meanDasar, meanPenuh, ekstrem } = angkaBongkar(p)

  const adaPencilan = step >= 3
  const data = adaPencilan ? [...DASAR, pencilan] : DASAR

  // Urutan fisikanya: pencilan masuk (langkah 3) → papan miring karena tumpu
  // masih di rata-rata lama → tumpu digeser ke rata-rata baru dan papan
  // datar lagi (langkah 4). Papan tidak boleh miring saat tumpu sudah di rata-rata.
  const geser = step === 4 ? seg(t, 0.35, 1) : step >= 5 ? 1 : 0
  const mean = meanDasar + (meanPenuh - meanDasar) * geser
  // Selama tumpu belum sampai, posisinya belum rata-rata data yang sekarang.
  const labelTumpu = adaPencilan && geser < 1 ? 'titik tumpu' : 'rata-rata'
  const med = median(data)

  const tampilTumpu = fase(step, t, 1)
  const tampilMedian = fase(step, t, 2)
  const tampilLengan = fase(step, t, 1)
  const miring = step === 4 ? 7 * (t < 0.35 ? seg(t, 0, 0.3) : 1 - seg(t, 0.35, 1)) : 0

  const nyalaMean = sorot === 'mean'
  const nyalaMedian = sorot === 'median'

  return (
    <Svg w={W} h={H} maxH={450} label="Titik data pada jungkat-jungkit dengan penanda rata-rata dan median">
      <TitikData
        data={data}
        nyalaPencilan={step >= 3}
        pencilan={adaPencilan ? pencilan : null}
      />
      {tampilTumpu > 0.05 && (
        <Jungkat
          data={data}
          mean={mean}
          miring={miring}
          tampilLengan={tampilLengan}
          nyalaLengan={sorot === 'jarak'}
        />
      )}
      {tampilTumpu <= 0.05 && (
        <rect x={GX0 - 10} y={BEAM_Y - 4} width={GX1 - GX0 + 20} height={8} rx={4} fill="var(--ink-3)" />
      )}
      <GarisAngka />

      {/* penanda rata-rata */}
      {tampilTumpu > 0.3 && (
        <Tag
          x={kx(mean)}
          y={BEAM_Y + 100}
          warna={nyalaMean ? 'var(--m-hi)' : 'var(--m-ab)'}
          size={16}
        >
          {`${labelTumpu} ${fmt(mean, 2)}`}
        </Tag>
      )}

      {/* penanda median */}
      {tampilMedian > 0.3 && (
        <g opacity={tampilMedian}>
          <line
            x1={kx(med)}
            y1={BEAM_Y - 120}
            x2={kx(med)}
            y2={BEAM_Y + 6}
            stroke={nyalaMedian ? 'var(--m-hi)' : 'var(--m-b)'}
            strokeWidth={nyalaMedian ? 3.4 : 2.2}
            strokeDasharray="6 5"
          />
          <Tag x={kx(med)} y={BEAM_Y - 134} warna={nyalaMedian ? 'var(--m-hi)' : 'var(--m-b)'} size={15}>
            {`median ${fmt(med, 2)}`}
          </Tag>
        </g>
      )}

      {step === 0 && (
        <Tag x={W / 2} y={44} warna="var(--ink-2)" size={16}>
          sembilan data, semuanya berdekatan
        </Tag>
      )}
      {step === 1 && (
        <Tag x={W / 2} y={44} warna="var(--m-ab)" size={16}>
          rata-rata adalah titik tumpu yang membuat papan seimbang
        </Tag>
      )}
      {step === 2 && (
        <Tag x={W / 2} y={44} warna="var(--m-b)" size={16}>
          median adalah nilai yang berada tepat di tengah urutan
        </Tag>
      )}
      {step === 3 && (
        <Tag x={W / 2} y={44} warna="var(--m-hi)" size={16}>
          {`${ekstrem ? 'masuk satu data ekstrem' : 'masuk satu data baru'}: ${fmt(pencilan)}`}
        </Tag>
      )}
      {step === 4 && (
        <Tag x={W / 2} y={44} warna="var(--m-hi)" size={16}>
          papan langsung miring — titik tumpu harus digeser ke kanan
        </Tag>
      )}
      {step >= 5 && (
        <Tag x={W / 2} y={44} warna="var(--m-b)" size={16}>
          {`rata-rata pindah ke ${fmt(meanPenuh, 2)}, median tetap ${fmt(med, 2)}`}
        </Tag>
      )}
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const pencilan = clamp(Math.round(p.pencilan ?? 20), 0, 40)
  const pakai = (p.pakai ?? 1) > 0.5
  const data = pakai ? [...DASAR, pencilan] : DASAR
  const mean = rerata(data)
  const med = median(data)
  const mod = modus(data)

  return (
    <Svg w={W} h={H} maxH={450} label="Titik data yang bisa digeser beserta rata-rata, median, dan modusnya">
      <TitikData data={data} nyalaPencilan pencilan={pakai ? pencilan : null} />
      <Jungkat data={data} mean={mean} miring={0} tampilLengan={1} />
      <GarisAngka />

      <Tag x={kx(mean)} y={BEAM_Y + 100} warna={sorot === 'mean' ? 'var(--m-hi)' : 'var(--m-ab)'} size={15}>
        {`rata-rata ${fmt(mean, 2)}`}
      </Tag>
      <line
        x1={kx(med)}
        y1={BEAM_Y - 120}
        x2={kx(med)}
        y2={BEAM_Y + 6}
        stroke={sorot === 'median' ? 'var(--m-hi)' : 'var(--m-b)'}
        strokeWidth={2.2}
        strokeDasharray="6 5"
      />
      <Tag x={kx(med)} y={BEAM_Y - 134} warna={sorot === 'median' ? 'var(--m-hi)' : 'var(--m-b)'} size={14}>
        {`median ${fmt(med, 2)}`}
      </Tag>
      <Tag x={W / 2} y={44} warna="var(--ink-2)" size={15}>
        {`modus ${mod.map((v) => fmt(v)).join(' dan ')} · median ${fmt(med, 2)} · rata-rata ${fmt(mean, 2)}`}
      </Tag>
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'rata-rata-menipu',
  topicId: 'sma10-ukuran-pemusatan-data-mean-median',
  judul: 'Rata-rata, median, modus',
  pertanyaan: 'Kenapa rata-rata bisa menipu?',
  tagline: 'Satu angka ekstrem sanggup menyeret rata-rata menjauh dari kenyataan.',
  kelas: 10,
  domain: 'data',
  tags: ['rata-rata', 'median', 'modus', 'pencilan', 'statistika'],

  tebak: {
    pertanyaan:
      'Di sebuah warung, sembilan pegawai bergaji antara 3 dan 7 juta, rata-ratanya 5 juta. Lalu pemiliknya, yang bergaji 35 juta, ikut dihitung. Apa yang terjadi pada rata-rata gaji?',
    pilihan: [
      {
        id: 'a',
        label: 'Naik sedikit saja',
        balasan:
          'Kalau yang dihitung hanya urutan, memang begitu. Tetapi rata-rata memperhitungkan JARAK, dan jarak 35 dari kelompok itu sangat jauh.',
      },
      {
        id: 'b',
        label: 'Naik jauh, sampai di atas gaji hampir semua orang',
        benar: true,
        balasan:
          'Betul. Rata-ratanya melompat menjadi 8 juta — padahal sembilan dari sepuluh orang bergaji di bawah itu.',
      },
      {
        id: 'c',
        label: 'Tidak berubah, karena hanya satu orang',
        balasan:
          'Median-lah yang nyaris tidak berubah. Rata-rata justru sangat peka terhadap satu nilai yang jauh.',
      },
    ],
    penutup:
      'Kalimat "rata-rata gaji di sini 8 juta" bisa benar secara hitungan, tetapi menyesatkan sebagai gambaran.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [{ key: 'pencilan', label: 'Nilai data ke-10', min: 8, max: 40, step: 1, awal: 35, bulat: true }],
    roles: { mean: 'ab', median: 'b', jarak: 'hi' },
    arti: {
      mean: 'Rata-rata — titik tumpu yang membuat data seimbang.',
      median: 'Median — nilai yang berada tepat di tengah setelah data diurutkan.',
      jarak: 'Jarak tiap data dari titik tumpu. Inilah yang membuat rata-rata peka terhadap pencilan.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Sekumpulan data',
        narasi:
          'Sembilan nilai, semuanya berdekatan antara 3 dan 7. Belum ada satu pun yang menonjol.',
        durasi: 2000,
      },
      {
        id: 's1',
        judul: 'Rata-rata adalah titik seimbang',
        narasi:
          'Bayangkan data ini sebagai beban di atas papan jungkat-jungkit. Titik tumpu yang membuatnya datar berada tepat di rata-rata.',
        rumus: '[mean:x̄] = jumlah data ÷ banyak data',
        durasi: 2600,
      },
      {
        id: 's2',
        judul: 'Median adalah yang di tengah urutan',
        narasi:
          'Median tidak peduli seberapa besar nilainya. Ia hanya menghitung posisi: separuh data ada di kiri, separuh di kanan.',
        durasi: 2400,
      },
      {
        id: 's3',
        judul: (p) => {
          const { x, ekstrem } = angkaBongkar(p)
          return ekstrem ? `Masuk satu nilai ekstrem: ${fmt(x)}` : `Masuk satu data baru: ${fmt(x)}`
        },
        narasi: (p) => {
          const { x, ekstrem } = angkaBongkar(p)
          // Jarak ke data terbesar (x − 7) BUKAN jarak yang dihitung rata-rata; itu jarak ke
          // titik tumpu (x − 5), yang baru dibahas di langkah berikutnya. Jangan disamakan.
          const masuk = `Sekarang masuk data ke-10 bernilai ${fmt(x)}, ${fmt(x - 7)} satuan di atas data terbesar tadi.`
          return ekstrem
            ? `${masuk} Cuma satu data, tetapi letaknya jauh dari kelompoknya — dan rata-rata memperhitungkan jarak, bukan sekadar urutan.`
            : `${masuk} Letaknya masih dekat dengan kelompoknya, tetapi rata-rata tetap memperhitungkan seberapa jauh ia berada.`
        },
        durasi: 2400,
      },
      {
        id: 's4',
        judul: 'Papan langsung miring',
        narasi: (p) => {
          const { x, meanDasar, geser } = angkaBongkar(p)
          return (
            `Data baru itu duduk ${fmt(x - meanDasar)} satuan dari tumpu, lebih jauh daripada data mana pun yang lain — di jungkat-jungkit, beban yang jauh menekan lebih kuat. ` +
            `Supaya papannya datar lagi, tumpu harus digeser ${fmt(geser)} satuan ke kanan, yaitu sepersepuluh jarak tadi.`
          )
        },
        rumus: 'pengaruh = banyaknya × [jarak:jarak]',
        durasi: 2800,
      },
      {
        id: 's5',
        judul: 'Rata-rata pindah, median tidak',
        narasi: (p) => {
          const { meanDasar, meanPenuh, med, dibawah } = angkaBongkar(p)
          const banding =
            dibawah === 9
              ? 'lebih tinggi daripada kesembilan data lainnya'
              : `lebih tinggi daripada ${fmt(dibawah)} dari 9 data lainnya`
          return (
            `Rata-rata terseret dari ${fmt(meanDasar, 2)} ke ${fmt(meanPenuh, 2)} — ${banding}. ` +
            `Median tidak bergeser sama sekali: posisi tengahnya cuma maju setengah langkah dalam urutan, dan nilainya tetap ${fmt(med, 2)}.`
          )
        },
        durasi: 2600,
      },
      {
        id: 's6',
        judul: 'Jadi mana yang dipakai?',
        narasi:
          'Kalau datanya menyebar rapi, rata-rata baik. Kalau ada pencilan atau data yang menceng, median memberi gambaran yang lebih jujur.',
        rumus: '[mean:rata-rata] peka pada jarak · [median:median] peka pada urutan',
        durasi: 2600,
      },
    ],
  },

  eksperimen: {
    judul: 'Geser data ekstremnya',
    ajakan:
      'Perhatikan titik tumpu bergerak mengikuti nilai ekstrem, sedangkan garis median sama sekali tidak bergeming.',
    params: [
      { key: 'pencilan', label: 'Nilai data ke-10', min: 0, max: 40, step: 1, awal: 20, bulat: true },
      { key: 'pakai', label: 'Ikutkan data ke-10', min: 0, max: 1, step: 1, awal: 1, bulat: true },
    ],
    Visual: VisualEksperimen,
    temuan: (p) => {
      const pencilan = clamp(Math.round(p.pencilan ?? 20), 0, 40)
      const pakai = (p.pakai ?? 1) > 0.5
      const data = pakai ? [...DASAR, pencilan] : DASAR
      const mean = rerata(data)
      const med = median(data)
      return (
        <p>
          {pakai ? (
            <>
              <strong>
                Rata-rata {fmt(mean, 2)}, median {fmt(med, 2)}.
              </strong>{' '}
              Menggeser satu data itu saja menggerakkan rata-rata sebesar sepersepuluh dari
              pergeserannya, tetapi median sama sekali tidak berubah — tetap {fmt(med, 2)}, karena
              dua data di tengah urutan tetap bernilai sama ke mana pun data ke-10 digeser.{' '}
              {mean > 7
                ? 'Perhatikan: rata-rata sekarang lebih besar daripada hampir semua datanya sendiri — itulah bentuk "menipu" yang dimaksud.'
                : 'Coba geser sampai 40 dan lihat rata-rata meninggalkan kelompok datanya.'}
            </>
          ) : (
            <>
              Tanpa data ke-10, rata-rata {fmt(mean, 2)} dan median {fmt(med, 2)} berimpit tepat.
              Itu wajar: datanya menyebar rapi dan simetris, sehingga titik seimbang dan nilai tengahnya
              sama. Aktifkan lagi data ke-10 untuk melihat bedanya.
            </>
          )}
        </p>
      )
    },
  },

  penjelasan: {
    SMP: (
      <>
        <p>
          Ada tiga cara umum menyebut "nilai yang mewakili" sekumpulan data, dan ketiganya menjawab
          pertanyaan yang berbeda:
        </p>
        <ul>
          <li>
            <strong>Rata-rata</strong> — titik seimbang. Semua nilai ikut menarik, dan yang jauh
            menarik lebih kuat.
          </li>
          <li>
            <strong>Median</strong> — nilai yang berada di tengah setelah diurutkan. Hanya urutan
            yang dihitung, bukan seberapa jauh.
          </li>
          <li>
            <strong>Modus</strong> — nilai yang paling sering muncul.
          </li>
        </ul>
        <p>
          Karena rata-rata memperhitungkan jarak, satu nilai yang sangat jauh (disebut{' '}
          <strong>pencilan</strong>) bisa menyeretnya. Median tidak terpengaruh, karena memindahkan
          satu data dari 35 menjadi 350 tidak mengubah urutannya sama sekali.
        </p>
        <h4>Kapan memakai yang mana</h4>
        <ul>
          <li>Data menyebar rapi tanpa pencilan → rata-rata mewakili dengan baik.</li>
          <li>Data menceng atau ada pencilan (gaji, harga rumah) → median lebih jujur.</li>
          <li>Data berupa kategori (warna favorit, ukuran sepatu terlaris) → modus.</li>
        </ul>
        <h4>Cara membaca berita</h4>
        <p>
          Kalau sebuah laporan hanya menyebut rata-rata tanpa median, itu pantas dipertanyakan —
          terutama untuk data pendapatan. Selisih besar antara rata-rata dan median adalah tanda
          bahwa datanya menceng.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Pernyataan "rata-rata adalah titik seimbang" bukan kiasan. Menurut definisinya,
        </p>
        <p style={{ textAlign: 'center' }}>Σ(xᵢ − x̄) = Σxᵢ − n·x̄ = n·x̄ − n·x̄ = 0</p>
        <p>
          Jumlah simpangan terhadap rata-rata selalu tepat nol — persis syarat kesetimbangan torsi
          pada tuas dengan beban sama berat. Rata-rata adalah satu-satunya titik dengan sifat ini.
        </p>
        <h4>Dua cara mengukur "di tengah"</h4>
        <p>
          Rata-rata meminimumkan Σ(xᵢ − c)², sedangkan median meminimumkan Σ|xᵢ − c|. Perbedaan
          pangkat dua versus nilai mutlak itulah sumber segalanya: mengkuadratkan membuat simpangan
          besar jauh lebih berpengaruh, sehingga rata-rata menjadi <em>tidak kekar</em> (not robust).
        </p>
        <p>
          Ukuran ketahanan ini disebut <em>breakdown point</em>: median tetap terkendali selama
          kurang dari separuh data yang dirusak (breakdown point 50%), sedangkan rata-rata sudah
          rusak oleh satu titik saja yang digeser tanpa batas.
        </p>
        <h4>Menceng ke arah mana</h4>
        <p>
          Untuk data yang menceng ke kanan (banyak nilai kecil, sedikit nilai sangat besar — seperti
          pendapatan), umumnya berlaku modus &lt; median &lt; rata-rata. Urutan ini sendiri sudah
          memberi petunjuk tentang bentuk sebaran datanya tanpa perlu melihat grafiknya.
        </p>
      </>
    ),
  },

  rumus: {
    src: '[mean:x̄] = (x₁ + x₂ + … + xₙ) ÷ n,  Σ(xᵢ − [mean:x̄]) = 0',
    roles: { mean: 'ab', median: 'b' },
    arti: {
      mean: 'Rata-rata. Jumlah simpangan terhadapnya selalu nol — itulah arti "titik seimbang".',
      median: 'Median, nilai tengah setelah data diurutkan.',
    },
  },

  soal: [
    {
      id: 'rat-1',
      tipe: 'angka',
      topicId: 'sma10-ukuran-pemusatan-data-mean-median',
      kelas: 8,
      tingkat: 'mudah',
      konsep: 'rata-rata-menipu',
      pertanyaan: 'Berapa median dari data: 3, 7, 4, 9, 5?',
      jawaban: 5,
      toleransi: 1e-9,
      hint: [
        'Median mensyaratkan data diurutkan lebih dulu.',
        'Urutannya: 3, 4, 5, 7, 9.',
        'Ada 5 data, jadi yang di tengah adalah data ke-3.',
      ],
      pembahasan: 'Setelah diurutkan menjadi 3, 4, 5, 7, 9, data ke-3 adalah 5. Perhatikan rata-ratanya 5,6 — sedikit lebih besar karena adanya nilai 9.',
    },
    {
      id: 'rat-2',
      tipe: 'pilihan',
      topicId: 'sma10-ukuran-pemusatan-data-mean-median',
      kelas: 10,
      tingkat: 'sedang',
      konsep: 'rata-rata-menipu',
      pertanyaan:
        'Data gaji (juta rupiah): 4, 4, 5, 5, 6, 6, 7, 60. Ukuran mana yang paling mewakili gaji "orang kebanyakan" di kelompok ini?',
      pilihan: [
        { id: 'a', label: 'Median', benar: true },
        {
          id: 'b',
          label: 'Rata-rata',
          diagnosa:
            'Rata-ratanya 12,1 juta — lebih besar daripada gaji tujuh dari delapan orang. Angka itu tidak mewakili siapa pun.',
        },
        {
          id: 'c',
          label: 'Nilai terbesar',
          diagnosa: 'Nilai terbesar justru pencilan yang menyebabkan masalahnya.',
        },
      ],
      hint: [
        'Hitung rata-ratanya dulu, lalu bandingkan dengan gaji kebanyakan orang di daftar itu.',
        'Rata-rata = 97/8 = 12,125 juta.',
        'Berapa orang yang gajinya di atas angka itu?',
      ],
      pembahasan:
        'Median = (5+6)/2 = 5,5 juta, sedangkan rata-rata 12,125 juta. Hanya satu orang bergaji di atas rata-rata, jadi median jauh lebih mewakili.',
    },
    {
      id: 'rat-3',
      tipe: 'benar-salah',
      topicId: 'sma10-ukuran-pemusatan-data-mean-median',
      kelas: 10,
      tingkat: 'sedang',
      konsep: 'rata-rata-menipu',
      pertanyaan: 'Rata-rata selalu merupakan salah satu nilai yang ada di dalam data.',
      jawaban: false,
      diagnosa:
        'Rata-rata adalah titik seimbang, dan titik seimbang tidak harus berimpit dengan salah satu beban. Contohnya rata-rata dari 4 dan 5 adalah 4,5.',
      hint: [
        'Coba cari contoh sederhana dengan dua data saja.',
        'Berapa rata-rata dari 4 dan 5?',
        'Apakah 4,5 ada di dalam data?',
      ],
      pembahasan:
        'Salah. Rata-rata dari 4 dan 5 adalah 4,5, yang tidak ada dalam data. Median juga bisa demikian bila banyaknya data genap. Modus-lah satu-satunya yang selalu berupa nilai yang benar-benar muncul.',
    },
    (rnd) => {
      const d = [3, 4, 5, 5, 6, 7]
      const x = 20 + Math.floor(rnd() * 60)
      const semua = [...d, x]
      const mean = semua.reduce((a, b) => a + b, 0) / semua.length
      return {
        id: 'rat-4',
        tipe: 'angka',
        topicId: 'sma10-ukuran-pemusatan-data-mean-median',
        kelas: 10,
        tingkat: 'sulit',
        konsep: 'rata-rata-menipu',
        pertanyaan: `Data: 3, 4, 5, 5, 6, 7, ${x}. Berapa rata-ratanya? Bulatkan sampai dua angka di belakang koma.`,
        jawaban: Math.round(mean * 100) / 100,
        toleransi: 0.011,
        hint: [
          'Jumlahkan seluruh data lebih dulu.',
          `3 + 4 + 5 + 5 + 6 + 7 = 30, lalu tambahkan ${x}.`,
          'Bagi dengan banyaknya data, yaitu 7.',
        ],
        pembahasan: `Jumlahnya ${30 + x}, dibagi 7 menjadi ${fmt(Math.round(mean * 100) / 100, 2)}. Bandingkan dengan mediannya yang hanya 5 — selisih sebesar itu adalah tanda adanya pencilan.`,
      }
    },
    {
      id: 'rat-5',
      tipe: 'cocokkan',
      topicId: 'sma10-ukuran-pemusatan-data-mean-median',
      kelas: 10,
      tingkat: 'sedang',
      konsep: 'rata-rata-menipu',
      pertanyaan: 'Pasangkan tiap keadaan dengan ukuran pemusatan yang paling tepat.',
      pasangan: [
        { kiri: 'Nilai ulangan yang menyebar rapi', kanan: 'Rata-rata' },
        { kiri: 'Harga rumah di sebuah kota', kanan: 'Median' },
        { kiri: 'Ukuran sepatu paling laku di toko', kanan: 'Modus' },
        { kiri: 'Data dengan satu nilai sangat ekstrem', kanan: 'Median' },
      ],
      hint: [
        'Tanyakan: apakah datanya punya nilai yang jauh menyendiri?',
        'Untuk data berupa pilihan atau ukuran yang dihitung banyaknya, yang dicari biasanya yang paling sering muncul.',
      ],
      pembahasan:
        'Rata-rata cocok untuk data yang menyebar rapi. Median dipakai kalau ada pencilan atau data menceng — itulah sebabnya laporan harga rumah hampir selalu memakai median. Modus dipakai kalau yang dicari adalah pilihan terbanyak.',
    },
  ],

  lanjut: ['peluang-simulasi', 'persen-dari', 'pecahan-penyebut'],
}

export default konsep
