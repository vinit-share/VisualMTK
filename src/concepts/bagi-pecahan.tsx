/* ============================================================
   KONSEP — Kenapa membagi pecahan jadi mengalikan kebalikannya?
   Kelas 6 · Bilangan

   Gagasan: pembagian menjawab pertanyaan "MUAT BERAPA KALI?".
   Pertanyaan itu tetap masuk akal untuk pecahan, dan jawabannya
   bisa dihitung langsung dengan menghitung potongan.

   Kenapa berubah menjadi perkalian: karena satu utuh memuat d
   potongan berukuran 1/d. Jadi "a/b muat berapa 1/d" sama dengan
   "a/b dari d", yaitu a/b × d. Untuk pembagi c/d, satu utuh memuat
   d/c kali, sehingga pengalinya menjadi d/c — kebalikannya.
   ============================================================ */

import { Svg, Tag } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt, pecahanTeks, simplify } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

const W = 690
const H = 440

const BX = 100
const BW = 500
const BH = 54

function bacaParam(p: Record<string, number>) {
  const q1 = clamp(Math.round(p.q1 ?? 4), 2, 12)
  const p1 = clamp(Math.round(p.p1 ?? 3), 1, q1)
  const q2 = clamp(Math.round(p.q2 ?? 8), 2, 12)
  const p2 = clamp(Math.round(p.p2 ?? 1), 1, q2)
  const nilai1 = p1 / q1
  const nilai2 = p2 / q2
  // dihitung dari bilangan bulat agar hasil bulat tetap tepat
  // (5/6 ÷ 1/6 lewat desimal menjadi 5,000…01 dan menambah bingkai hantu)
  const atas = p1 * q2
  const bawah = q1 * p2
  const hasil = atas / bawah
  // gambar hanya memuat satu utuh: pembilang yang melebihi penyebut dipangkas
  const dipangkas = Math.round(p.p1 ?? 3) > q1 || Math.round(p.p2 ?? 1) > q2
  // teks bersama untuk gambar dan narasi, supaya keduanya selalu cocok
  const teksA = `${fmt(p1)}/${fmt(q1)}`
  const teksB = `${fmt(p2)}/${fmt(q2)}`
  const teksHasil = pecahanTeks(atas, bawah, true)
  const teksBalik = pecahanTeks(q2, p2)
  // "memuat 1 potongan" terasa janggal; untuk satu potongan ditulis dengan kata
  const teksIsiUtuh = teksBalik === '1' ? 'tepat satu' : teksBalik
  return { p1, q1, p2, q2, nilai1, nilai2, atas, bawah, hasil, dipangkas, teksA, teksB, teksHasil, teksBalik, teksIsiUtuh }
}

/** Catatan kecil bila penggeser pembilang melebihi penyebut dan dipangkas. */
function CatatanPangkas({ y }: { y: number }) {
  return (
    <Tag x={W / 2} y={y} warna="var(--ink-3)" size={13} tebal={600}>
      catatan: pembilang dibatasi agar tidak melebihi penyebut
    </Tag>
  )
}

/** Batang utuh dengan bagian terwarnai, plus penanda potongan pembagi. */
function Batang({
  y,
  bagian,
  terisi,
  warna,
  label,
  potong,
  potongTampak = 0,
  nyala = false,
}: {
  y: number
  bagian: number
  terisi: number
  warna: string
  label?: string
  /** ukuran potongan pembagi sebagai pecahan dari satu utuh. */
  potong?: number
  potongTampak?: number
  nyala?: boolean
}) {
  const w = BW / bagian
  return (
    <g>
      {Array.from({ length: Math.min(bagian, 40) }, (_, i) => (
        <rect
          key={i}
          x={BX + i * w}
          y={y}
          width={w}
          height={BH}
          fill={i < terisi ? warna : 'var(--surface)'}
          fillOpacity={i < terisi ? (nyala ? 0.7 : 0.48) : 1}
          stroke="var(--ink-3)"
          strokeWidth={0.8}
        />
      ))}
      {/* potongan pembagi digambar sebagai bingkai berjalan */}
      {potong !== undefined &&
        potongTampak > 0 &&
        Array.from({ length: Math.ceil(potongTampak) }, (_, k) => {
          const mulai = k * potong * BW
          const sisa = BW - mulai
          if (sisa <= 0) return null
          const penuh = clamp(potongTampak - k, 0, 1)
          // panjang bingkai = bagian potongan yang sudah terhitung,
          // tidak boleh melewati ujung batang
          const lebar = Math.min(potong * BW * penuh, sisa)
          return (
            <rect
              key={`p${k}`}
              x={BX + mulai}
              y={y - 5}
              width={lebar}
              height={BH + 10}
              rx={6}
              fill="none"
              stroke="var(--m-hi)"
              strokeWidth={2.4}
              opacity={0.9}
            />
          )
        })}
      <rect x={BX} y={y} width={BW} height={BH} fill="none" stroke="var(--ink-2)" strokeWidth={2} />
      {label && (
        <text
          x={BX - 16}
          y={y + BH / 2}
          textAnchor="end"
          dominantBaseline="middle"
          fontSize={20}
          fontWeight={800}
          fill={warna}
          fontFamily="var(--font-math)"
        >
          {label}
        </text>
      )}
    </g>
  )
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const { p1, q1, p2, q2, nilai2, hasil, dipangkas, teksA, teksB, teksHasil, teksIsiUtuh } = bacaParam(p)

  const bilanganBulat = step === 0
  const gambarBatang = fase(step, t, 1)
  const tandaiPotong = step >= 2 ? (step === 2 ? seg(t, 0.1, 0.95) : 1) : 0
  const hitung = fase(step, t, 3)
  const alasan = fase(step, t, 4)
  const selesai = step >= 5

  const nyalaA = sorot === 'a'
  const nyalaB = sorot === 'b' || sorot === 'balik'

  const y1 = 150
  const y2 = 262

  // Berapa potongan pembagi yang muat di dalam bagian terwarnai.
  const tampakPotong = tandaiPotong * hasil

  if (bilanganBulat) {
    // Langkah 0: pembagian bilangan bulat sebagai "muat berapa kali".
    const muatBulat = 3
    const lebarPotong = BW / 6
    const berjalan = seg(t, 0.1, 0.9) * muatBulat
    return (
      <Svg w={W} h={H} maxH={450} label="Pembagian bilangan bulat digambarkan sebagai muat berapa kali">
        <rect x={BX} y={y1} width={BW} height={BH} fill="var(--m-a)" fillOpacity={0.4} stroke="var(--ink-2)" strokeWidth={2} />
        {/* enam satuan, supaya "6" dan "2" benar-benar kelihatan */}
        {Array.from({ length: 5 }, (_, i) => (
          <line
            key={`s${i}`}
            x1={BX + (i + 1) * lebarPotong}
            y1={y1}
            x2={BX + (i + 1) * lebarPotong}
            y2={y1 + BH}
            stroke="var(--ink-3)"
            strokeWidth={0.8}
          />
        ))}
        {Array.from({ length: Math.ceil(berjalan) }, (_, k) => (
          <rect
            key={k}
            x={BX + k * lebarPotong * 2}
            y={y1 - 5}
            width={lebarPotong * 2 * clamp(berjalan - k, 0, 1)}
            height={BH + 10}
            rx={6}
            fill="none"
            stroke="var(--m-hi)"
            strokeWidth={2.4}
          />
        ))}
        <Tag x={W / 2} y={64} warna="var(--ink-2)" size={17}>
          6 ÷ 2 sebenarnya bertanya: "2 muat berapa kali di dalam 6?"
        </Tag>
        <Tag x={W / 2} y={y1 + BH + 40} warna="var(--m-hi)" size={18}>
          {`terhitung ${fmt(Math.floor(berjalan))} kali`}
        </Tag>
      </Svg>
    )
  }

  return (
    <Svg w={W} h={H} maxH={450} label="Batang pecahan dengan potongan pembagi yang dihitung">
      <Batang
        y={y1}
        bagian={q1}
        terisi={p1 * gambarBatang}
        warna="var(--m-a)"
        label={teksA}
        potong={nilai2}
        potongTampak={tampakPotong}
        nyala={nyalaA}
      />

      {/* batang pembanding: satu utuh dengan potongan pembagi */}
      {alasan > 0.05 && (
        <g opacity={alasan}>
          <Batang
            y={y2}
            bagian={q2}
            terisi={0}
            warna="var(--m-b)"
            label="1"
            potong={nilai2}
            potongTampak={(q2 / p2) * alasan}
            nyala={nyalaB}
          />
          <Tag x={W / 2} y={y2 + BH + 32} warna="var(--m-b)" size={16}>
            {`satu utuh memuat ${teksIsiUtuh} potongan sebesar ${teksB}`}
          </Tag>
        </g>
      )}

      {step === 1 && (
        <Tag x={W / 2} y={64} warna="var(--ink-2)" size={17}>
          {`${teksA} ÷ ${teksB} — pertanyaannya tetap sama`}
        </Tag>
      )}
      {step === 2 && (
        <Tag x={W / 2} y={64} warna="var(--m-hi)" size={17}>
          {`potongan sebesar ${teksB} muat berapa kali?`}
        </Tag>
      )}
      {hitung > 0.4 && !selesai && (
        <Tag x={W / 2} y={y1 + BH + 40} warna="var(--m-hi)" size={18}>
          {`terhitung ${teksHasil} kali`}
        </Tag>
      )}
      {selesai && (
        <Tag x={W / 2} y={64} warna="var(--m-ab)" size={18}>
          {`${teksA} ÷ ${teksB} = ${teksA} × ${fmt(q2)}/${fmt(p2)} = ${teksHasil}`}
        </Tag>
      )}
      {dipangkas && <CatatanPangkas y={H - 18} />}
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const { p1, q1, p2, q2, nilai2, hasil, dipangkas, teksA, teksB, teksHasil } = bacaParam(p)
  const y1 = 140
  const y2 = 256

  return (
    <Svg w={W} h={H} maxH={450} label="Dua pecahan dengan penghitungan berapa kali pembagi muat">
      <Batang
        y={y1}
        bagian={q1}
        terisi={p1}
        warna="var(--m-a)"
        label={teksA}
        potong={nilai2}
        potongTampak={hasil}
        nyala={sorot === 'a'}
      />
      <Batang
        y={y2}
        bagian={q2}
        terisi={p2}
        warna="var(--m-b)"
        label={teksB}
        nyala={sorot === 'b' || sorot === 'balik'}
      />
      <Tag x={W / 2} y={62} warna="var(--m-ab)" size={19}>
        {`${teksA} ÷ ${teksB} = ${teksHasil}`}
      </Tag>
      <Tag x={W / 2} y={y1 + BH + 30} warna="var(--m-hi)" size={15}>
        {`potongan ${teksB} muat ${teksHasil} kali di dalam ${teksA}`}
      </Tag>
      {dipangkas && <CatatanPangkas y={H - 30} />}
    </Svg>
  )
}

/* ---------------- Teks langkah yang mengikuti penggeser ---------------- */

/** Langkah 2: menandai bagian berwarna dengan potongan pembagi. */
function narasiTandai(p: Record<string, number>) {
  const { atas, bawah, teksA, teksB } = bacaParam(p)
  if (atas < bawah)
    return `Bagian berwarna, yaitu ${teksA}, kita coba tandai dengan potongan sebesar ${teksB}. Potongan itu lebih besar dari bagian berwarna, jadi satu potongan pun tidak muat penuh.`
  if (atas === bawah)
    return `Bagian berwarna, yaitu ${teksA}, kita tandai dengan potongan sebesar ${teksB}. Ternyata satu potongan saja sudah pas menutupinya.`
  // bingkai terakhir digambar pendek bila potongannya tidak habis membagi
  if (atas % bawah === 0)
    return `Bagian berwarna, yaitu ${teksA}, kita tandai dengan potongan sebesar ${teksB}, satu per satu, sampai habis.`
  return `Bagian berwarna, yaitu ${teksA}, kita tandai dengan potongan sebesar ${teksB}, satu per satu. Potongan terakhir tidak muat penuh, jadi bingkai terakhirnya berhenti lebih pendek.`
}

/** Langkah 3: hasil hitungan dan perbandingannya dengan bilangan yang dibagi. */
function narasiHitung(p: Record<string, number>) {
  const { p2, q2, atas, bawah, teksA, teksB, teksHasil } = bacaParam(p)
  const [hp, hq] = simplify(atas, bawah)
  // angka 1 ditulis sebagai kata agar tidak janggal ("1 potongan penuh")
  const kataBanyak = (n: number) => (n === 1 ? 'satu' : fmt(n))
  const hitung =
    hq === 1
      ? `Potongan ${teksB} muat tepat ${kataBanyak(hp)} kali di dalam ${teksA}.`
      : hp > hq
        ? `Potongan ${teksB} muat ${teksHasil} kali di dalam ${teksA}: ${kataBanyak(Math.floor(hp / hq))} potongan penuh, lalu potongan terakhir hanya muat ${fmt(hp % hq)}/${fmt(hq)} bagiannya.`
        : `Potongan ${teksB} lebih besar dari ${teksA}, sehingga hanya muat ${teksHasil} kali, belum sekali pun penuh.`
  // pembagi tepat 1: hasilnya senilai dengan yang dibagi, walau tulisannya
  // bisa berbeda karena hasil selalu disederhanakan (2/4 ÷ 2/2 = 1/2)
  const banding =
    p2 < q2
      ? `lebih besar dari ${teksA}, karena potongannya lebih kecil dari satu utuh.`
      : teksHasil === teksA
        ? 'tetap sama dengan yang dibagi, karena potongannya tepat satu utuh.'
        : `nilainya tetap sama dengan ${teksA}, karena potongannya tepat satu utuh.`
  return `${hitung} Jadi ${teksA} ÷ ${teksB} = ${teksHasil}, ${banding}`
}

/** Langkah 4: satu utuh memuat berapa potongan, lalu ambil bagiannya. */
function narasiAlasan(p: Record<string, number>) {
  const { p1, q1, teksA, teksB, teksHasil, teksBalik, teksIsiUtuh } = bacaParam(p)
  const bawah = `Batang bawah menunjukkan satu utuh memuat ${teksIsiUtuh} potongan sebesar ${teksB}.`
  if (p1 === q1)
    return `${bawah} Yang kita punya ${teksA}, tepat satu utuh, jadi potongannya juga ${teksBalik}${
      teksBalik === teksHasil ? '' : `, yaitu ${teksHasil}`
    }.`
  return `${bawah} Yang kita punya hanya ${teksA} utuh, jadi potongannya ${teksA} dari ${teksBalik}, yaitu ${teksHasil}.`
}

/** Langkah 5: dari isi satu utuh ke kebalikan pembagi. */
function narasiKebalikan(p: Record<string, number>) {
  const { p2, q2, teksB, teksBalik } = bacaParam(p)
  if (p2 === 1)
    return `Satu utuh berisi ${fmt(q2)} potongan ${teksB}, jadi membagi dengan ${teksB} sama saja dengan mengalikan ${fmt(q2)}. Untuk pembagi c/d mana pun, satu utuh memuat pembagi itu d/c kali, jadi pengalinya adalah kebalikan pembagi.`
  const balikMentah = `${fmt(q2)}/${fmt(p2)}`
  const kali = teksBalik === balikMentah ? balikMentah : `${balikMentah} = ${teksBalik}`
  return `Satu utuh berisi ${fmt(q2)} potongan 1/${fmt(q2)}, sedangkan pembagi ${teksB} berisi ${fmt(p2)} potongan 1/${fmt(q2)}, jadi satu utuh memuat pembagi itu ${kali} kali. Begitu juga untuk pembagi c/d mana pun: pengalinya d/c, yaitu kebalikan pembagi.`
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'bagi-pecahan',
  topicId: 'sd6-pembagian-pecahan',
  judul: 'Membagi pecahan',
  pertanyaan: 'Kenapa membagi pecahan berubah jadi mengalikan kebalikannya?',
  tagline: 'Pembagian itu pertanyaan "muat berapa kali?". Jawabannya kelihatan kalau digambar.',
  kelas: 6,
  domain: 'bilangan',
  tags: ['pecahan', 'pembagian', 'kebalikan', 'resiprokal'],

  tebak: {
    pertanyaan: 'Menurutmu, berapa hasil dari 3/4 ÷ 1/8?',
    pilihan: [
      {
        id: 'a',
        label: 'Lebih kecil dari 3/4',
        balasan:
          'Wajar mengira begitu, karena "membagi" biasanya membuat kecil. Tetapi untuk bilangan positif, itu hanya benar kalau pembaginya lebih besar dari 1.',
      },
      {
        id: 'b',
        label: '6',
        benar: true,
        balasan:
          'Betul, dan hasilnya jauh lebih besar dari yang dibagi. Sebentar lagi kamu akan lihat kenapa itu masuk akal.',
      },
      {
        id: 'c',
        label: '3/32',
        balasan:
          'Itu hasil 3/4 dikali 1/8. Pada pembagian, pecahan keduanya harus dibalik lebih dulu.',
      },
    ],
    penutup:
      'Membagi tidak selalu memperkecil. Kalau bilangan positif dibagi dengan pembagi di antara 0 dan 1, hasilnya justru membesar.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      { key: 'p1', label: 'Pembilang yang dibagi', min: 1, max: 8, step: 1, awal: 3, bulat: true },
      { key: 'q1', label: 'Penyebut yang dibagi', min: 2, max: 10, step: 1, awal: 4, bulat: true },
      { key: 'p2', label: 'Pembilang pembagi', min: 1, max: 6, step: 1, awal: 1, bulat: true },
      { key: 'q2', label: 'Penyebut pembagi', min: 2, max: 12, step: 1, awal: 8, bulat: true },
    ],
    roles: { a: 'a', b: 'b', balik: 'hi', hasil: 'ab' },
    arti: {
      a: 'Bilangan yang dibagi.',
      b: 'Pembagi — ukuran potongan yang kita hitung.',
      balik: 'Kebalikan pembagi. Angka ini menyatakan berapa potongan yang muat dalam satu utuh.',
      hasil: 'Banyaknya potongan yang muat.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Pembagian artinya "muat berapa kali"',
        narasi:
          'Kalimat 6 ÷ 2 sebenarnya bertanya: berapa kali 2 muat di dalam 6? Jawabannya bisa dihitung dengan menandai dua-dua.',
        rumus: '6 ÷ 2 = 3',
        durasi: 2400,
      },
      {
        id: 's1',
        judul: 'Pertanyaannya tetap sama untuk pecahan',
        narasi: (p) => {
          const { teksA, teksB } = bacaParam(p)
          return `Sekarang yang dibagi adalah pecahan: ${teksA} dibagi ${teksB}. Pertanyaannya tidak berubah sama sekali: potongan ${teksB} muat berapa kali di dalam ${teksA}?`
        },
        rumus: (p) => {
          const { teksA, teksB } = bacaParam(p)
          return `[a:${teksA}] ÷ [b:${teksB}] = ?`
        },
        durasi: 2200,
      },
      {
        id: 's2',
        judul: 'Tandai potongan sebesar pembagi',
        narasi: narasiTandai,
        durasi: 2600,
      },
      {
        id: 's3',
        judul: 'Hitung potongannya',
        narasi: narasiHitung,
        durasi: 2200,
      },
      {
        id: 's4',
        judul: (p) => `Kenapa hasilnya ${bacaParam(p).teksHasil}?`,
        narasi: narasiAlasan,
        rumus: (p) => {
          const { teksA, teksBalik, teksHasil } = bacaParam(p)
          return `[a:${teksA}] × [balik:${teksBalik}] = [hasil:${teksHasil}]`
        },
        durasi: 2800,
      },
      {
        id: 's5',
        judul: 'Di situlah kebalikan muncul',
        narasi: narasiKebalikan,
        rumus: '[a:a/b] ÷ [b:c/d] = [a:a/b] × [balik:d/c]',
        durasi: 2800,
      },
    ],
  },

  eksperimen: {
    judul: 'Ganti kedua pecahannya',
    ajakan:
      'Bingkai merah muda menandai potongan sebesar pembagi. Di sini pembaginya paling besar 1. Perhatikan kapan potongannya muat lebih dari sekali, kapan kurang dari sekali, dan bandingkan hasilnya dengan bilangan yang dibagi.',
    params: [
      { key: 'p1', label: 'Pembilang yang dibagi', min: 1, max: 10, step: 1, awal: 3, bulat: true },
      { key: 'q1', label: 'Penyebut yang dibagi', min: 2, max: 12, step: 1, awal: 4, bulat: true },
      { key: 'p2', label: 'Pembilang pembagi', min: 1, max: 8, step: 1, awal: 1, bulat: true },
      { key: 'q2', label: 'Penyebut pembagi', min: 2, max: 12, step: 1, awal: 8, bulat: true },
    ],
    Visual: VisualEksperimen,
    temuan: (p) => {
      const { p1, q1, p2, q2, nilai2 } = bacaParam(p)
      const [hp, hq] = simplify(p1 * q2, q1 * p2)
      return (
        <p>
          <strong>
            {fmt(p1)}/{fmt(q1)} ÷ {fmt(p2)}/{fmt(q2)} = {pecahanTeks(hp, hq, true)}
          </strong>
          .{' '}
          {nilai2 < 1
            ? 'Karena pembaginya lebih kecil dari 1, hasilnya justru LEBIH BESAR daripada bilangan yang dibagi — persis seperti memotong sesuatu menjadi kepingan kecil: kepingannya jadi banyak.'
            : nilai2 > 1
              ? 'Karena pembaginya lebih besar dari 1, hasilnya lebih kecil daripada bilangan yang dibagi.'
              : 'Pembaginya tepat 1, jadi hasilnya sama dengan bilangan yang dibagi.'}{' '}
          Coba buat pembaginya 1/2, lalu 1/4, lalu 1/8: hasilnya menjadi dua kali lipat setiap kali
          potongannya diperkecil separuh.
        </p>
      )
    },
  },

  penjelasan: {
    SD: (
      <>
        <p>
          Pembagian sebenarnya bertanya: <strong>"muat berapa kali?"</strong> Kalimat 6 ÷ 2
          menanyakan berapa kali 2 muat di dalam 6. Jawabannya 3.
        </p>
        <p>
          Pertanyaan itu tetap masuk akal untuk pecahan. 3/4 ÷ 1/8 bertanya: berapa potongan
          seperdelapan yang muat di dalam tiga perempat? Kalau digambar dan dihitung, jawabannya{' '}
          <strong>6</strong>.
        </p>
        <p>
          Kenapa 6? Karena <strong>satu utuh memuat 8 potongan seperdelapan</strong>. Kita hanya
          punya tiga perempat utuh, jadi potongannya tiga perempat dari 8, yaitu 6.
        </p>
        <p>
          Nah, "mengambil tiga perempat dari 8" itu sama saja dengan 3/4 × 8. Di situlah pembagian
          berubah menjadi perkalian.
        </p>
      </>
    ),
    SMP: (
      <>
        <p>
          Bagi sembarang pembagi positif c/d, satu utuh memuat <strong>d/c</strong> potongan sebesar
          c/d — sebab satu utuh berisi d potongan 1/d, sedangkan satu potongan c/d berisi c potongan
          1/d. Karena itu, "berapa potongan c/d yang muat dalam a/b" sama dengan mengambil a/b bagian
          dari d/c:
        </p>
        <p style={{ textAlign: 'center' }}>a/b ÷ c/d = a/b × d/c</p>
        <p>
          Gambaran "muat berapa kali" hanya masuk akal untuk pecahan positif. Bila hasilnya bukan
          bilangan bulat, artinya potongan terakhir hanya muat sebagian. Alasan aljabar di bawah ini
          berlaku lebih umum, termasuk untuk pecahan negatif, asalkan c ≠ 0.
        </p>
        <h4>Alasan aljabar</h4>
        <p>
          Pembagian didefinisikan sebagai kebalikan perkalian: a/b ÷ c/d (dengan c ≠ 0) adalah
          bilangan x sehingga x × c/d = a/b. Kalikan kedua ruas dengan d/c:
        </p>
        <p style={{ textAlign: 'center' }}>
          x × (c/d) × (d/c) = (a/b) × (d/c) ⟹ x × 1 = (a/b) × (d/c)
        </p>
        <p>
          Kuncinya adalah (c/d) × (d/c) = 1. Bilangan d/c disebut <strong>invers perkalian</strong>{' '}
          dari c/d — itulah sebabnya membagi berarti mengalikan dengan kebalikan.
        </p>
        <h4>Kenapa hasilnya bisa membesar</h4>
        <p>
          Banyak orang mengira membagi selalu memperkecil. Untuk bilangan positif, itu hanya benar
          kalau pembaginya lebih besar dari 1. Kalau pembaginya di antara 0 dan 1, potongannya kecil
          sehingga muatnya banyak — hasilnya membesar.
        </p>
        <h4>Kenapa tidak boleh membagi dengan nol</h4>
        <p>
          Nol tidak punya kebalikan: tidak ada bilangan yang bila dikalikan 0 menghasilkan 1.
          Pertanyaan "berapa kali 0 muat dalam 5" juga tidak punya jawaban — berapa pun banyaknya
          nol yang ditumpuk, hasilnya tetap nol.
        </p>
      </>
    ),
  },

  rumus: {
    src: '[a:a/b] ÷ [b:c/d] = [a:a/b] × [balik:d/c]',
    roles: { a: 'a', b: 'b', balik: 'hi' },
    arti: {
      a: 'Bilangan yang dibagi.',
      b: 'Pembagi — ukuran satu potongan.',
      balik: 'Kebalikan pembagi. Angka ini menyatakan berapa potongan sebesar itu yang muat dalam satu utuh.',
    },
  },

  soal: [
    (rnd) => {
      const q = [2, 4, 5, 8][Math.floor(rnd() * 4)]
      const p1 = 1 + Math.floor(rnd() * 3)
      return {
        id: 'bag-1',
        tipe: 'angka',
        topicId: 'sd6-pembagian-pecahan',
        kelas: 6,
        tingkat: 'mudah',
        konsep: 'bagi-pecahan',
        pertanyaan: `Berapa hasil dari ${p1} ÷ 1/${q}? (Dengan kata lain: potongan 1/${q} muat berapa kali di dalam ${p1}?)`,
        jawaban: p1 * q,
        toleransi: 1e-9,
        hint: [
          `Satu utuh memuat ${q} potongan sebesar 1/${q}.`,
          `Kalau ada ${p1} utuh, potongannya ${p1} kali lipat.`,
          `Jadi ${p1} × ${q}.`,
        ],
        pembahasan: `${p1} ÷ 1/${q} = ${p1} × ${q} = ${p1 * q}. Membagi bilangan positif dengan pecahan di antara 0 dan 1 membuat hasilnya membesar.`,
      }
    },
    {
      id: 'bag-2',
      tipe: 'pilihan',
      topicId: 'sd6-pembagian-pecahan',
      kelas: 6,
      tingkat: 'sedang',
      konsep: 'bagi-pecahan',
      pertanyaan: 'Hasil dari 2/3 ÷ 4/9 dalam bentuk paling sederhana adalah...',
      pilihan: [
        { id: 'a', label: '3/2', benar: true },
        {
          id: 'b',
          label: '8/27',
          diagnosa: 'Kedua pecahan langsung dikalikan tanpa membalik yang kedua. Itu jawaban untuk 2/3 × 4/9.',
        },
        {
          id: 'c',
          label: '2/3',
          diagnosa: 'Sepertinya pembaginya dianggap bernilai 1. Padahal 4/9 lebih kecil dari 1, jadi hasilnya harus lebih besar dari 2/3.',
        },
        {
          id: 'd',
          label: '6/4',
          diagnosa: 'Nilainya sudah benar (6/4 = 3/2), tetapi belum disederhanakan sepenuhnya: 6 dan 4 masih sama-sama habis dibagi 2.',
        },
      ],
      hint: [
        'Balik dulu pecahan pembaginya, lalu ganti tanda bagi menjadi kali.',
        '2/3 ÷ 4/9 = 2/3 × 9/4.',
        'Sederhanakan sebelum mengalikan: 9 dan 3 sama-sama habis dibagi 3, begitu juga 2 dan 4 sama-sama habis dibagi 2.',
      ],
      pembahasan:
        '2/3 ÷ 4/9 = 2/3 × 9/4 = 18/12 = 3/2. Periksa kewajarannya: pembaginya lebih kecil dari 1, jadi hasilnya memang harus lebih besar dari 2/3.',
    },
    {
      id: 'bag-3',
      tipe: 'benar-salah',
      topicId: 'sd6-pembagian-pecahan',
      kelas: 6,
      tingkat: 'sedang',
      konsep: 'bagi-pecahan',
      pertanyaan: 'Membagi sebuah bilangan selalu menghasilkan bilangan yang lebih kecil.',
      jawaban: false,
      diagnosa:
        'Untuk bilangan positif, itu hanya benar kalau pembaginya lebih besar dari 1. Membagi dengan 1/2 justru menggandakan, karena potongan setengahan muat dua kali dalam setiap utuh.',
      hint: [
        'Coba hitung 5 ÷ 1/2 dengan pertanyaan "muat berapa kali".',
        'Berapa banyak potongan setengahan dalam 5 utuh?',
        'Bandingkan hasilnya dengan 5.',
      ],
      pembahasan:
        'Salah. 5 ÷ 1/2 = 10, lebih besar daripada 5. Untuk bilangan positif, membagi memperkecil hanya bila pembaginya lebih besar dari 1.',
    },
    {
      id: 'bag-4',
      tipe: 'urutkan',
      topicId: 'sd6-pembagian-pecahan',
      kelas: 6,
      tingkat: 'sedang',
      konsep: 'bagi-pecahan',
      pertanyaan: 'Susun alasan kenapa 3/4 ÷ 1/8 hasilnya 6.',
      langkah: [
        'Pembagian menanyakan: potongan 1/8 muat berapa kali dalam 3/4?',
        'Satu utuh memuat 8 potongan sebesar 1/8',
        'Yang tersedia hanya 3/4 utuh',
        'Jadi potongannya 3/4 dari 8',
        '3/4 × 8 = 6',
      ],
      hint: [
        'Mulai dari arti pembagiannya, bukan dari aturan membalik.',
        'Angka 8 muncul lebih dulu sebagai isi satu utuh, baru kemudian dikalikan 3/4.',
      ],
      pembahasan:
        'Aturan "balik lalu kali" bukan mantra: angka 8 adalah banyaknya potongan dalam satu utuh, dan 3/4 adalah bagian utuh yang tersedia.',
    },
    (rnd) => {
      const p1 = 1 + Math.floor(rnd() * 4)
      const q1 = [2, 3, 4, 5][Math.floor(rnd() * 4)]
      const p2 = 1 + Math.floor(rnd() * 3)
      const q2 = [3, 4, 6, 8][Math.floor(rnd() * 4)]
      const [hp, hq] = simplify(p1 * q2, q1 * p2)
      return {
        id: 'bag-5',
        tipe: 'isian',
        topicId: 'sd6-pembagian-pecahan',
        kelas: 7,
        tingkat: 'sulit',
        konsep: 'bagi-pecahan',
        pertanyaan: `Hitunglah ${p1}/${q1} ÷ ${p2}/${q2}. Tulis dalam bentuk pecahan paling sederhana, contoh penulisan: 3/2`,
        jawaban: [`${hp}/${hq}`, hq === 1 ? `${hp}` : `${hp}/${hq}`],
        hint: [
          'Balik pecahan pembaginya, lalu ganti tanda bagi menjadi kali.',
          `${p1}/${q1} ÷ ${p2}/${q2} = ${p1}/${q1} × ${q2}/${p2}.`,
          'Kalikan pembilang dengan pembilang dan penyebut dengan penyebut, lalu sederhanakan.',
        ],
        pembahasan: `${p1}/${q1} × ${q2}/${p2} = ${p1 * q2}/${q1 * p2}${
          hq === 1 ? ` = ${hp}` : hp === p1 * q2 ? '' : ` = ${hp}/${hq}`
        }. Periksa kewajarannya: ${
          p2 === q2
            ? 'pembaginya tepat 1, jadi hasilnya sama dengan pecahan pertama.'
            : p2 < q2
              ? 'karena pembaginya kurang dari 1, hasilnya lebih besar dari pecahan pertama.'
              : 'karena pembaginya lebih dari 1, hasilnya lebih kecil dari pecahan pertama.'
        }`,
      }
    },
  ],

  lanjut: ['pecahan-penyebut', 'persen-dari', 'negatif-kali-negatif'],
}

export default konsep
