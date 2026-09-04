/* ============================================================
   KONSEP — Kenapa "20% dari 50" hasilnya 10?
   Kelas 6 · Bilangan

   Gagasan: "persen" secara harfiah berarti "per seratus".
   Kisi seratus kotak membuat arti itu terlihat. Setelah persen
   diubah menjadi pecahan sederhana, mengambil persen dari suatu
   jumlah menjadi sekadar membagi jumlah itu menjadi beberapa
   kelompok sama besar lalu mengambil sebagian kelompoknya.

   Miskonsepsi yang dibongkar: mengira "20%" selalu berarti
   "20 sesuatu", tanpa memedulikan keseluruhannya.
   ============================================================ */

import { Svg, Tag } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt, simplify } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

const W = 680
const H = 440

/* ---------------- Kisi seratus ---------------- */

function KisiSeratus({
  x,
  y,
  sel,
  tersorot,
  kelompok,
  opacityKelompok = 0,
  nyala = false,
}: {
  x: number
  y: number
  sel: number
  tersorot: number
  /** banyaknya kelompok sama besar, untuk garis pembagi. */
  kelompok?: number
  opacityKelompok?: number
  nyala?: boolean
}) {
  const kotak = []
  for (let i = 0; i < 100; i++) {
    const r = Math.floor(i / 10)
    const c = i % 10
    const aktif = i < tersorot
    kotak.push(
      <rect
        key={i}
        x={x + c * sel}
        y={y + r * sel}
        width={sel - 1.5}
        height={sel - 1.5}
        rx={2}
        fill={aktif ? 'var(--m-a)' : 'var(--surface)'}
        fillOpacity={aktif ? (nyala ? 0.85 : 0.6) : 1}
        stroke="var(--ink-3)"
        strokeWidth={0.7}
      />,
    )
  }
  return (
    <g>
      {kotak}
      {kelompok && opacityKelompok > 0.01 && kelompok <= 10
        ? Array.from({ length: kelompok - 1 }, (_, k) => {
            const batas = ((k + 1) * 100) / kelompok
            const baris = batas / 10
            return (
              <line
                key={`g${k}`}
                x1={x}
                y1={y + baris * sel - 0.75}
                x2={x + 10 * sel}
                y2={y + baris * sel - 0.75}
                stroke="var(--m-hi)"
                strokeWidth={2.5}
                opacity={opacityKelompok}
              />
            )
          })
        : null}
      <rect
        x={x - 1}
        y={y - 1}
        width={10 * sel}
        height={10 * sel}
        fill="none"
        stroke="var(--ink-2)"
        strokeWidth={2}
      />
    </g>
  )
}

/* ---------------- Deretan benda sebanyak `total` ---------------- */

function Benda({
  x,
  y,
  total,
  tersorot,
  perBaris,
  sel,
  kelompok,
  opacityKelompok = 0,
  nyala = false,
}: {
  x: number
  y: number
  total: number
  tersorot: number
  perBaris: number
  sel: number
  kelompok?: number
  opacityKelompok?: number
  nyala?: boolean
}) {
  const n = Math.min(total, 200)
  const kotak = []
  for (let i = 0; i < n; i++) {
    const r = Math.floor(i / perBaris)
    const c = i % perBaris
    const aktif = i < tersorot
    kotak.push(
      <rect
        key={i}
        x={x + c * sel}
        y={y + r * sel}
        width={sel - 2}
        height={sel - 2}
        rx={2.5}
        fill={aktif ? 'var(--m-ab)' : 'var(--surface-3)'}
        fillOpacity={aktif ? (nyala ? 0.9 : 0.72) : 1}
        stroke={aktif ? 'var(--m-ab)' : 'var(--ink-3)'}
        strokeWidth={0.8}
      />,
    )
  }
  return (
    <g>
      {kotak}
      {kelompok && opacityKelompok > 0.01 && kelompok <= 10
        ? Array.from({ length: kelompok }, (_, k) => {
            const mulai = (k * total) / kelompok
            const r0 = Math.floor(mulai / perBaris)
            const c0 = mulai % perBaris
            const lebarKel = total / kelompok
            // Hanya gambar bingkai bila kelompoknya rapi sebaris penuh.
            if (lebarKel % perBaris !== 0 || c0 !== 0) return null
            const tinggiKel = lebarKel / perBaris
            return (
              <rect
                key={`k${k}`}
                x={x - 3}
                y={y + r0 * sel - 3}
                width={perBaris * sel}
                height={tinggiKel * sel}
                rx={5}
                fill="none"
                stroke="var(--m-hi)"
                strokeWidth={2}
                opacity={opacityKelompok}
              />
            )
          })
        : null}
    </g>
  )
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const persen = clamp(Math.round((p.persen ?? 20) / 5) * 5, 5, 95)
  const total = clamp(Math.round((p.total ?? 50) / 10) * 10, 10, 200)
  const [pp, qq] = simplify(persen, 100)
  const hasil = (persen / 100) * total

  const sorotKisi = step === 1 ? seg(t, 0.1, 0.9) : step >= 1 ? 1 : 0
  const kelompokKisi = fase(step, t, 2)
  const munculBenda = fase(step, t, 3)
  const kelompokBenda = fase(step, t, 4)
  const ambil = step >= 5 ? (step === 5 ? seg(t, 0.15, 0.9) : 1) : 0
  const selesai = step >= 6

  const nyalaPersen = sorot === 'persen'
  const nyalaTotal = sorot === 'total'
  const nyalaHasil = sorot === 'hasil'

  const sel = 22
  const kisiX = munculBenda > 0.5 ? 56 : W / 2 - (10 * sel) / 2
  const kisiY = 110

  const perBaris = total > 100 ? 20 : 10
  const selB = total > 100 ? 17 : 22
  const bendaX = 400
  const bendaY = 110

  return (
    <Svg w={W} h={H} maxH={450} label="Kisi seratus kotak dan kumpulan benda yang sebagian tersorot">
      <g opacity={munculBenda > 0.5 ? 0.95 : 1}>
        <KisiSeratus
          x={kisiX}
          y={kisiY}
          sel={sel}
          tersorot={sorotKisi * persen}
          kelompok={qq}
          opacityKelompok={kelompokKisi}
          nyala={nyalaPersen}
        />
        <Tag x={kisiX + 5 * sel} y={kisiY - 24} warna="var(--m-a)" size={16}>
          {sorotKisi > 0.5 ? `${fmt(persen)} dari 100` : '100 kotak'}
        </Tag>
        {kelompokKisi > 0.4 && qq <= 10 && (
          <Tag x={kisiX + 5 * sel} y={kisiY + 10 * sel + 26} warna="var(--m-hi)" size={15}>
            {`${fmt(persen)}/100 = ${fmt(pp)}/${fmt(qq)}`}
          </Tag>
        )}
      </g>

      {munculBenda > 0.05 && (
        <g opacity={munculBenda}>
          <Benda
            x={bendaX}
            y={bendaY}
            total={total}
            tersorot={ambil * hasil}
            perBaris={perBaris}
            sel={selB}
            kelompok={qq}
            opacityKelompok={kelompokBenda}
            nyala={nyalaHasil || nyalaTotal}
          />
          <Tag x={bendaX + (perBaris * selB) / 2} y={bendaY - 24} warna="var(--m-ab)" size={16}>
            {`keseluruhan = ${fmt(total)}`}
          </Tag>
          {ambil > 0.7 && (
            <Tag
              x={bendaX + (perBaris * selB) / 2}
              y={bendaY + Math.ceil(Math.min(total, 200) / perBaris) * selB + 26}
              warna="var(--m-ab)"
              size={17}
            >
              {`terambil ${fmt(hasil)}`}
            </Tag>
          )}
        </g>
      )}

      {step === 0 && (
        <Tag x={W / 2} y={62} warna="var(--ink-2)" size={17}>
          "persen" artinya "per seratus"
        </Tag>
      )}
      {selesai && (
        <Tag x={W / 2} y={62} warna="var(--m-ab)" size={19}>
          {`${fmt(persen)}% dari ${fmt(total)} = ${fmt(hasil)}`}
        </Tag>
      )}
      {total > 200 && (
        <Tag x={W / 2} y={H - 16} warna="var(--ink-soft)" size={13}>
          (hanya 200 benda pertama yang digambar)
        </Tag>
      )}
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const persen = clamp(Math.round(p.persen ?? 20), 0, 100)
  const total = clamp(Math.round((p.total ?? 50) / 10) * 10, 10, 200)
  const hasil = (persen / 100) * total

  const sel = 20
  const kisiX = 60
  const kisiY = 120
  const perBaris = total > 100 ? 20 : 10
  const selB = total > 100 ? 17 : 22
  const bendaX = 400
  const bendaY = 120

  return (
    <Svg w={W} h={H} maxH={450} label="Kisi persen dan kumpulan benda yang sebagian tersorot">
      <KisiSeratus x={kisiX} y={kisiY} sel={sel} tersorot={persen} nyala={sorot === 'persen'} />
      <Tag x={kisiX + 5 * sel} y={kisiY - 26} warna="var(--m-a)" size={16}>
        {`${fmt(persen)}%`}
      </Tag>

      <Benda
        x={bendaX}
        y={bendaY}
        total={total}
        tersorot={hasil}
        perBaris={perBaris}
        sel={selB}
        nyala={sorot === 'hasil' || sorot === 'total'}
      />
      <Tag x={bendaX + (perBaris * selB) / 2} y={bendaY - 26} warna="var(--m-ab)" size={16}>
        {`dari ${fmt(total)}`}
      </Tag>

      <Tag x={W / 2} y={62} warna="var(--ink)" size={20}>
        {`${fmt(persen)}% dari ${fmt(total)} = ${fmt(hasil)}`}
      </Tag>
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'persen-dari',
  topicId: 'sd6-penerapan-persen-dalam-kehidupan-sehari',
  judul: 'Persen',
  pertanyaan: 'Kenapa "20% dari 50" hasilnya 10?',
  tagline: 'Persen cuma cara lain menulis "per seratus". Lihat 100 kotaknya, langsung jelas.',
  kelas: 6,
  domain: 'bilangan',
  tags: ['persen', 'pecahan', 'perbandingan', 'diskon'],

  tebak: {
    pertanyaan: 'Mana yang lebih banyak: 20% dari 50, atau 20% dari 200?',
    pilihan: [
      {
        id: 'a',
        label: 'Sama, dua-duanya 20',
        balasan:
          'Ini kekeliruan yang paling sering: menganggap "20%" adalah jumlah tetap. Padahal persen selalu menempel pada suatu keseluruhan.',
      },
      {
        id: 'b',
        label: '20% dari 200',
        benar: true,
        balasan:
          'Betul. Persentase yang sama pada keseluruhan yang lebih besar menghasilkan angka yang lebih besar: 10 lawan 40.',
      },
      {
        id: 'c',
        label: '20% dari 50',
        balasan:
          'Justru sebaliknya. Coba pikirkan: 20% dari uang jajanmu sebulan jelas lebih kecil daripada 20% dari gaji orang dewasa.',
      },
    ],
    penutup:
      'Persen tidak pernah berdiri sendiri. Selalu ada pertanyaan lanjutan: "persen dari apa?"',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      { key: 'persen', label: 'Persen', min: 5, max: 95, step: 5, awal: 20, satuan: '%' },
      { key: 'total', label: 'Keseluruhan', min: 10, max: 200, step: 10, awal: 50, bulat: true },
    ],
    roles: { persen: 'a', total: 'b', hasil: 'ab', seratus: 'hi' },
    arti: {
      persen: 'Banyaknya bagian yang diambil dari setiap seratus.',
      total: 'Keseluruhan — banyaknya benda yang menjadi acuan.',
      hasil: 'Hasilnya: bagian dari keseluruhan itu.',
      seratus: 'Angka 100 muncul karena "persen" memang berarti "per seratus".',
    },
    steps: [
      {
        id: 's0',
        judul: 'Seratus kotak',
        narasi:
          'Kata "persen" berasal dari "per seratus". Karena itu bayangkan selalu ada seratus kotak sebagai patokan.',
        rumus: '1% = 1 dari [seratus:100]',
        durasi: 1800,
      },
      {
        id: 's1',
        judul: 'Sorot sebanyak persennya',
        narasi:
          'Dua puluh persen berarti dua puluh kotak dari seratus kotak itu. Belum ada perhitungan apa pun di sini — hanya menghitung kotak.',
        rumus: '[persen:20]% = [persen:20]/[seratus:100]',
        durasi: 2000,
      },
      {
        id: 's2',
        judul: 'Sederhanakan pecahannya',
        narasi:
          'Dua puluh dari seratus sama saja dengan satu dari lima. Perhatikan kisinya terbagi menjadi lima jalur sama besar, dan yang tersorot tepat satu jalur.',
        rumus: '[persen:20]/[seratus:100] = 1/5',
        durasi: 2200,
      },
      {
        id: 's3',
        judul: 'Ganti keseluruhannya',
        narasi:
          'Sekarang yang kita punya bukan seratus benda, melainkan lima puluh. Persennya tetap sama, tetapi acuannya berbeda.',
        rumus: 'keseluruhan = [total:50]',
        durasi: 2000,
      },
      {
        id: 's4',
        judul: 'Bagi menjadi kelompok sama besar',
        narasi:
          'Karena persennya berarti "satu dari lima", benda-benda itu dibagi menjadi lima kelompok yang sama banyak.',
        durasi: 2200,
      },
      {
        id: 's5',
        judul: 'Ambil bagiannya',
        narasi:
          'Satu kelompok berisi sepuluh benda. Itulah dua puluh persen dari lima puluh.',
        durasi: 2200,
      },
      {
        id: 's6',
        judul: 'Bentuk rumusnya',
        narasi:
          'Menghitung persen selalu sama: ubah persen menjadi pecahan per seratus, lalu kalikan dengan keseluruhannya.',
        rumus: '[hasil:hasil] = [persen:p]/[seratus:100] × [total:n]',
        durasi: 2200,
      },
    ],
  },

  eksperimen: {
    judul: 'Ubah persennya, ubah juga keseluruhannya',
    ajakan:
      'Kisi kiri menunjukkan persennya, kumpulan kanan menunjukkan keseluruhan berikut bagian yang terambil.',
    params: [
      { key: 'persen', label: 'Persen', min: 0, max: 100, step: 1, awal: 20, satuan: '%' },
      { key: 'total', label: 'Keseluruhan', min: 10, max: 200, step: 10, awal: 50, bulat: true },
    ],
    Visual: VisualEksperimen,
    temuan: (p) => {
      const persen = clamp(Math.round(p.persen ?? 20), 0, 100)
      const total = clamp(Math.round((p.total ?? 50) / 10) * 10, 10, 200)
      const hasil = (persen / 100) * total
      const [pp, qq] = simplify(persen, 100)
      return (
        <p>
          <strong>
            {fmt(persen)}% dari {fmt(total)} adalah {fmt(hasil)}.
          </strong>{' '}
          {persen === 0
            ? 'Nol persen berarti tidak mengambil apa pun.'
            : persen === 100
              ? 'Seratus persen berarti mengambil seluruhnya — itulah kenapa 100% selalu sama dengan keseluruhan itu sendiri.'
              : `Sebagai pecahan, ${fmt(persen)}% sama dengan ${fmt(pp)}/${fmt(qq)}.`}{' '}
          Coba tahan persennya lalu gandakan keseluruhannya: hasilnya ikut menggandakan. Persen
          bukan jumlah tetap, melainkan <em>perbandingan</em>.
        </p>
      )
    },
  },

  penjelasan: {
    SD: (
      <>
        <p>
          Kata <strong>persen</strong> artinya "per seratus". Jadi 20% berarti "20 dari setiap 100".
        </p>
        <p>
          Kalau kamu punya 100 permen dan mengambil 20%, kamu mengambil 20 permen. Tapi kalau kamu
          hanya punya 50 permen, 20% tentu bukan 20 permen lagi — karena 20 dari 50 itu jauh lebih
          dari seperlima.
        </p>
        <p>
          Caranya: 20 dari 100 sama dengan 1 dari 5. Jadi bagi 50 permen menjadi 5 kelompok sama
          banyak, masing-masing 10 permen. Ambil <strong>1 kelompok</strong>, dapat 10 permen.
        </p>
      </>
    ),
    SMP: (
      <>
        <p>
          Persen adalah pecahan dengan penyebut tetap 100. Menuliskannya begitu membuat
          perbandingan antar hal yang berbeda ukuran menjadi mudah dibandingkan.
        </p>
        <p style={{ textAlign: 'center' }}>p% dari n = (p/100) × n</p>
        <p>
          Karena perkalian bersifat komutatif, muncul trik yang sering berguna:{' '}
          <strong>p% dari n selalu sama dengan n% dari p</strong>. Menghitung 4% dari 75 mungkin
          merepotkan, tetapi 75% dari 4 langsung terlihat: 3.
        </p>
        <h4>Persen bukan satuan</h4>
        <p>
          Kesalahan tersering adalah memperlakukan persen sebagai jumlah tetap. Kalimat "diskon 20%"
          tidak berarti "potongan 20 ribu" — potongannya bergantung pada harga aslinya.
        </p>
        <h4>Kenaikan lalu penurunan tidak saling membatalkan</h4>
        <p>
          Harga naik 20% lalu turun 20% tidak kembali ke harga semula. Dari 100 naik 20% menjadi 120,
          lalu turun 20% dari 120 (yaitu 24) menjadi 96. Penyebabnya: kedua persen itu dihitung
          terhadap acuan yang berbeda.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Menyatakan perubahan sebagai persen berarti bekerja dengan{' '}
          <strong>faktor pengali</strong>: naik p% sama dengan mengalikan dengan (1 + p/100), turun
          p% sama dengan mengalikan dengan (1 − p/100).
        </p>
        <p style={{ textAlign: 'center' }}>
          (1 + 0,2)(1 − 0,2) = 1 − 0,04 = 0,96 ≠ 1
        </p>
        <p>
          Bentuk itu adalah identitas (1 + x)(1 − x) = 1 − x², sehingga kerugiannya selalu sebesar
          x² bagian — dan karena x² selalu positif, urutan naik-turun apa pun berakhir di bawah nilai
          semula.
        </p>
        <p>
          Cara pandang faktor pengali ini yang membuat bunga majemuk menjadi mudah: nilai setelah n
          periode adalah M₀(1 + i)ⁿ, sebuah fungsi eksponensial. Karena itu persen dan eksponen
          bertemu di kelas 10.
        </p>
      </>
    ),
  },

  rumus: {
    src: '[hasil:hasil] = [persen:p]% × [total:n] = [persen:p]/[seratus:100] × [total:n]',
    roles: { hasil: 'ab', persen: 'a', total: 'b', seratus: 'hi' },
    arti: {
      hasil: 'Bagian yang diambil.',
      persen: 'Banyaknya bagian dari setiap seratus.',
      total: 'Keseluruhan yang menjadi acuan — tanpa ini, persen tidak berarti apa-apa.',
      seratus: 'Selalu 100, karena "persen" berarti "per seratus".',
    },
  },

  soal: [
    (rnd) => {
      const persen = [10, 20, 25, 50, 75][Math.floor(rnd() * 5)]
      const total = (2 + Math.floor(rnd() * 9)) * 20
      return {
        id: 'per-1',
        tipe: 'angka',
        topicId: 'sd6-penerapan-persen-dalam-kehidupan-sehari',
        kelas: 6,
        tingkat: 'mudah',
        konsep: 'persen-dari',
        pertanyaan: `Berapa ${persen}% dari ${total}?`,
        jawaban: (persen / 100) * total,
        toleransi: 1e-6,
        hint: [
          'Ubah dulu persennya menjadi pecahan per seratus.',
          `${persen}% = ${persen}/100.`,
          `Sekarang kalikan: ${persen}/100 × ${total}.`,
        ],
        pembahasan: `${persen}% dari ${total} = ${persen}/100 × ${total} = ${fmt((persen / 100) * total)}.`,
      }
    },
    {
      id: 'per-2',
      tipe: 'pilihan',
      topicId: 'sd6-penerapan-persen-dalam-kehidupan-sehari',
      kelas: 6,
      tingkat: 'sedang',
      konsep: 'persen-dari',
      pertanyaan:
        'Sebuah baju berharga Rp200.000 mendapat diskon 25%. Berapa harga yang harus dibayar?',
      pilihan: [
        { id: 'a', label: 'Rp150.000', benar: true },
        {
          id: 'b',
          label: 'Rp50.000',
          diagnosa: 'Itu besar diskonnya, bukan harga yang dibayar. Harga bayar = harga awal dikurangi diskon.',
        },
        {
          id: 'c',
          label: 'Rp175.000',
          diagnosa: 'Sepertinya diskon dihitung 12,5% atau setengah dari yang seharusnya.',
        },
        {
          id: 'd',
          label: 'Rp199.750',
          diagnosa: 'Persennya diperlakukan seperti potongan 25 rupiah, bukan 25 per seratus.',
        },
      ],
      hint: [
        'Hitung dulu berapa besar diskonnya dalam rupiah.',
        '25% dari 200.000 = 1/4 × 200.000 = 50.000.',
        'Harga bayar = 200.000 − 50.000. Cara cepat: bayar 75% dari harga awal.',
      ],
      pembahasan:
        'Diskon = 25% × 200.000 = 50.000, jadi dibayar 150.000. Lebih cepat: membayar 75% dari harga awal, yaitu 0,75 × 200.000 = 150.000.',
    },
    {
      id: 'per-3',
      tipe: 'benar-salah',
      topicId: 'sd6-penerapan-persen-dalam-kehidupan-sehari',
      kelas: 7,
      tingkat: 'sulit',
      konsep: 'persen-dari',
      pertanyaan:
        'Sebuah harga naik 10%, lalu turun 10%. Harganya kembali seperti semula.',
      jawaban: false,
      diagnosa:
        'Kenaikan dihitung dari harga awal, tetapi penurunan dihitung dari harga yang sudah naik. Acuannya berbeda, jadi hasilnya tidak kembali sama.',
      hint: [
        'Coba pakai angka mudah, misalnya harga awal 100.',
        'Naik 10% menjadi 110. Sekarang turun 10% dari BERAPA?',
        '10% dari 110 adalah 11, bukan 10.',
      ],
      pembahasan:
        'Salah. Dari 100 naik 10% menjadi 110, lalu turun 10% (yaitu 11) menjadi 99 — lebih rendah 1% dari semula. Persen selalu dihitung terhadap acuan saat itu.',
    },
    {
      id: 'per-4',
      tipe: 'angka',
      topicId: 'sd6-penerapan-persen-dalam-kehidupan-sehari',
      kelas: 7,
      tingkat: 'sulit',
      konsep: 'persen-dari',
      pertanyaan:
        'Dari 40 siswa, 15 siswa membawa bekal. Berapa persen siswa yang membawa bekal?',
      jawaban: 37.5,
      satuan: '%',
      toleransi: 0.01,
      hint: [
        'Persen berarti "per seratus". Jadi ubah 15 dari 40 menjadi "berapa dari 100".',
        'Tulis sebagai pecahan dulu: 15/40.',
        'Kalikan dengan 100 untuk mengubahnya menjadi persen.',
      ],
      pembahasan:
        '15/40 = 0,375, dan 0,375 × 100% = 37,5%. Artinya kalau ada 100 siswa dengan perbandingan yang sama, 37 sampai 38 di antaranya membawa bekal.',
    },
    {
      id: 'per-5',
      tipe: 'cocokkan',
      topicId: 'sd6-penerapan-persen-dalam-kehidupan-sehari',
      kelas: 6,
      tingkat: 'sedang',
      konsep: 'persen-dari',
      pertanyaan: 'Pasangkan tiap persen dengan pecahan paling sederhananya.',
      pasangan: [
        { kiri: '25%', kanan: '1/4' },
        { kiri: '20%', kanan: '1/5' },
        { kiri: '50%', kanan: '1/2' },
        { kiri: '75%', kanan: '3/4' },
      ],
      hint: [
        'Tulis dulu setiap persen sebagai pecahan berpenyebut 100.',
        'Lalu sederhanakan dengan membagi pembilang dan penyebutnya dengan bilangan yang sama.',
        '25/100 dibagi 25 menjadi 1/4.',
      ],
      pembahasan:
        'Menghafal empat pasangan ini sangat menghemat waktu: 25% = 1/4, 20% = 1/5, 50% = 1/2, 75% = 3/4. Semuanya berasal dari menyederhanakan pecahan berpenyebut 100.',
    },
  ],

  lanjut: ['pecahan-penyebut', 'bagi-pecahan', 'peluang-simulasi'],
}

export default konsep
