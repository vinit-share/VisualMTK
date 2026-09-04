/* ============================================================
   KONSEP — Kenapa penyebut harus disamakan sebelum dijumlahkan?
   Kelas 5 · Bilangan

   Gagasan: pecahan menghitung POTONGAN. Menjumlahkan hanya masuk
   akal kalau potongan yang dihitung sama besar. Menyamakan penyebut
   bukan ritual — ia berarti memotong ulang kedua batang menjadi
   potongan sejenis, tanpa mengubah nilainya sedikit pun.
   ============================================================ */

import { Svg, Tag } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt, lcm, pecahanTeks, simplify } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

const W = 690
const H = 440

const BX = 108 // kiri batang
const BW = 500 // lebar satu batang utuh
const BH = 46

/** Satu batang pecahan: dibagi `bagian`, tersorot `terisi` potong. */
function Batang({
  y,
  bagian,
  terisi,
  warna,
  label,
  /** garis potong tambahan yang sedang muncul (indeks relatif `bagian`). */
  garisBaru,
  opacityGarisBaru = 0,
  nyala = false,
  lebar = BW,
  x = BX,
}: {
  y: number
  bagian: number
  terisi: number
  warna: string
  label?: string
  garisBaru?: number
  opacityGarisBaru?: number
  nyala?: boolean
  lebar?: number
  x?: number
}) {
  const w = lebar / bagian
  const potong = Math.min(bagian, 40)
  return (
    <g>
      {Array.from({ length: potong }, (_, i) => (
        <rect
          key={i}
          x={x + i * w}
          y={y}
          width={w}
          height={BH}
          fill={i < terisi ? warna : 'var(--surface)'}
          fillOpacity={i < terisi ? (nyala ? 0.72 : 0.5) : 1}
          stroke="var(--ink-3)"
          strokeWidth={0.8}
        />
      ))}
      {/* garis potong yang baru muncul saat penyebut disamakan */}
      {garisBaru !== undefined &&
        opacityGarisBaru > 0.01 &&
        Array.from({ length: garisBaru - 1 }, (_, i) => {
          const gx = x + ((i + 1) * lebar) / garisBaru
          // Jangan gambar ulang garis yang memang sudah ada.
          const sudahAda = Math.abs(((i + 1) * bagian) / garisBaru % 1) < 1e-9
          if (sudahAda) return null
          return (
            <line
              key={`g${i}`}
              x1={gx}
              y1={y}
              x2={gx}
              y2={y + BH}
              stroke="var(--m-hi)"
              strokeWidth={2}
              opacity={opacityGarisBaru}
            />
          )
        })}
      <rect
        x={x}
        y={y}
        width={lebar}
        height={BH}
        fill="none"
        stroke={nyala ? warna : 'var(--ink-2)'}
        strokeWidth={nyala ? 3 : 2}
      />
      {label && (
        <text
          x={x - 16}
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

function bacaParam(p: Record<string, number>) {
  const q1 = clamp(Math.round(p.q1 ?? 2), 2, 12)
  const q2 = clamp(Math.round(p.q2 ?? 4), 2, 12)
  const p1 = clamp(Math.round(p.p1 ?? 1), 1, q1)
  const p2 = clamp(Math.round(p.p2 ?? 1), 1, q2)
  const L = lcm(q1, q2)
  const a = (p1 * L) / q1
  const b = (p2 * L) / q2
  return { p1, q1, p2, q2, L, a, b, total: a + b }
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const { p1, q1, p2, q2, L, a, b, total } = bacaParam(p)

  const salahGabung = step === 1 ? seg(t, 0.2, 0.8) : 0
  const potongUlang = step >= 2 ? (step === 2 ? seg(t, 0.15, 0.85) : 1) : 0
  const sejenis = fase(step, t, 3)
  const jumlah = step >= 4 ? (step === 4 ? seg(t, 0.15, 0.9) : 1) : 0

  const y1 = 118
  const y2 = 196
  const yh = 300

  const nyala1 = sorot === 'a' || sorot === 'q'
  const nyala2 = sorot === 'b' || sorot === 'q'
  const nyalaHasil = sorot === 'hasil'

  // Setelah dipotong ulang, kedua batang memakai L bagian.
  const bagian1 = potongUlang > 0.55 ? L : q1
  const bagian2 = potongUlang > 0.55 ? L : q2
  const isi1 = potongUlang > 0.55 ? a : p1
  const isi2 = potongUlang > 0.55 ? b : p2

  const [hp, hq] = simplify(total, L)

  return (
    <Svg w={W} h={H} maxH={450} label="Dua batang pecahan yang dipotong ulang agar potongannya sama besar">
      <Batang
        y={y1}
        bagian={bagian1}
        terisi={isi1}
        warna="var(--m-a)"
        label={`${fmt(isi1)}/${fmt(bagian1)}`}
        garisBaru={L}
        opacityGarisBaru={potongUlang < 0.55 ? potongUlang / 0.55 : 0}
        nyala={nyala1}
      />
      <Batang
        y={y2}
        bagian={bagian2}
        terisi={isi2}
        warna="var(--m-b)"
        label={`${fmt(isi2)}/${fmt(bagian2)}`}
        garisBaru={L}
        opacityGarisBaru={potongUlang < 0.55 ? potongUlang / 0.55 : 0}
        nyala={nyala2}
      />

      {/* langkah 1: mencoba menggabungkan potongan yang beda ukuran */}
      {salahGabung > 0.05 && (
        <g opacity={salahGabung}>
          <rect x={BX} y={y1 - 8} width={(p1 / q1) * BW} height={BH + 16} rx={8} fill="none" stroke="var(--m-hi)" strokeWidth={2} strokeDasharray="6 5" />
          <rect x={BX} y={y2 - 8} width={(p2 / q2) * BW} height={BH + 16} rx={8} fill="none" stroke="var(--m-hi)" strokeWidth={2} strokeDasharray="6 5" />
          <Tag x={W / 2} y={262} warna="var(--m-hi)" size={16}>
            {`${fmt(p1)} potong + ${fmt(p2)} potong = ${fmt(p1 + p2)} potong… tapi potong yang mana?`}
          </Tag>
        </g>
      )}

      {/* batang hasil */}
      {jumlah > 0.05 && (
        <g opacity={jumlah}>
          {total <= L ? (
            <Batang
              y={yh}
              bagian={L}
              terisi={total}
              warna="var(--m-ab)"
              label={`${fmt(total)}/${fmt(L)}`}
              nyala={nyalaHasil}
            />
          ) : (
            <>
              <Batang y={yh} bagian={L} terisi={L} warna="var(--m-ab)" label="1" nyala={nyalaHasil} lebar={BW / 2} />
              <Batang
                y={yh}
                bagian={L}
                terisi={total - L}
                warna="var(--m-ab)"
                lebar={BW / 2}
                x={BX + BW / 2 + 14}
                nyala={nyalaHasil}
              />
            </>
          )}
          <Tag x={W / 2} y={yh + BH + 30} warna="var(--m-ab)" size={18}>
            {`${fmt(a)}/${fmt(L)} + ${fmt(b)}/${fmt(L)} = ${fmt(total)}/${fmt(L)}${
              hq !== L || hp !== total ? ` = ${pecahanTeks(total, L, true)}` : ''
            }`}
          </Tag>
        </g>
      )}

      {/* keterangan */}
      {step === 2 && (
        <Tag x={W / 2} y={68} warna="var(--m-hi)" size={16}>
          {`kedua batang dipotong ulang menjadi ${fmt(L)} bagian`}
        </Tag>
      )}
      {sejenis > 0.4 && jumlah < 0.05 && (
        <Tag x={W / 2} y={68} warna="var(--m-ab)" size={16}>
          sekarang semua potongan sama besar
        </Tag>
      )}
      {step === 0 && (
        <Tag x={W / 2} y={68} warna="var(--ink-2)" size={16}>
          panjang seluruh batang sama, tetapi ukuran potongannya berbeda
        </Tag>
      )}
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const { p1, q1, p2, q2, L, a, b, total } = bacaParam(p)
  const y1 = 96
  const y2 = 174
  const y3 = 252

  return (
    <Svg w={W} h={H} maxH={450} label="Dua pecahan yang bisa diubah, beserta bentuk senilai dan jumlahnya">
      <Batang y={y1} bagian={q1} terisi={p1} warna="var(--m-a)" label={`${fmt(p1)}/${fmt(q1)}`} nyala={sorot === 'a'} />
      <Batang y={y2} bagian={q2} terisi={p2} warna="var(--m-b)" label={`${fmt(p2)}/${fmt(q2)}`} nyala={sorot === 'b'} />
      <Batang y={y3} bagian={L} terisi={a} warna="var(--m-a)" label={`${fmt(a)}/${fmt(L)}`} nyala={sorot === 'q'} />
      <Batang y={y3 + 56} bagian={L} terisi={b} warna="var(--m-b)" label={`${fmt(b)}/${fmt(L)}`} nyala={sorot === 'q'} />

      <Tag x={W / 2} y={54} warna="var(--ink)" size={20}>
        {`${fmt(p1)}/${fmt(q1)} + ${fmt(p2)}/${fmt(q2)} = ${pecahanTeks(total, L, true)}`}
      </Tag>
      <Tag x={W / 2} y={H - 18} warna="var(--m-ab)" size={15}>
        {`penyebut sekutu terkecil: ${fmt(L)}`}
      </Tag>
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'pecahan-penyebut',
  topicId: 'sd5-penjumlahan-dan-pengurangan-pecahan',
  judul: 'Menjumlahkan pecahan',
  pertanyaan: 'Kenapa penyebut harus disamakan dulu sebelum pecahan dijumlahkan?',
  tagline: 'Coba jumlahkan potongan yang ukurannya berbeda — kamu akan lihat sendiri masalahnya.',
  kelas: 5,
  domain: 'bilangan',
  tags: ['pecahan', 'penyebut', 'penjumlahan', 'KPK', 'pecahan senilai'],

  tebak: {
    pertanyaan: 'Berapa hasil ½ + ¼?',
    pilihan: [
      {
        id: 'a',
        label: '2/6',
        balasan:
          'Ini jawaban yang paling sering muncul: pembilang dijumlah, penyebut dijumlah. Tapi coba pikir — 2/6 itu kurang dari ½. Masa menambah sesuatu justru membuatnya mengecil?',
      },
      {
        id: 'b',
        label: '3/4',
        benar: true,
        balasan: 'Betul. Dan sebentar lagi kamu bisa melihat kenapa angka 4 itu muncul.',
      },
      {
        id: 'c',
        label: '2/4',
        balasan:
          'Angka 2/4 sama dengan ½ — berarti bagian ¼ tadi hilang entah ke mana. Padahal ia benar-benar menambah sesuatu.',
      },
    ],
    penutup:
      'Uji cepat yang selalu berguna: hasil penjumlahan dua bilangan positif harus lebih besar daripada masing-masingnya.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      { key: 'p1', label: 'Pembilang pertama', min: 1, max: 5, step: 1, awal: 1, bulat: true },
      { key: 'q1', label: 'Penyebut pertama', min: 2, max: 8, step: 1, awal: 2, bulat: true },
      { key: 'p2', label: 'Pembilang kedua', min: 1, max: 5, step: 1, awal: 1, bulat: true },
      { key: 'q2', label: 'Penyebut kedua', min: 2, max: 8, step: 1, awal: 4, bulat: true },
    ],
    roles: { a: 'a', b: 'b', q: 'hi', hasil: 'ab' },
    arti: {
      a: 'Pecahan pertama.',
      b: 'Pecahan kedua.',
      q: 'Penyebut sekutu — ukuran potongan baru yang dipakai kedua batang.',
      hasil: 'Jumlahnya, dihitung setelah potongannya sejenis.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Dua batang, dua ukuran potongan',
        narasi:
          'Panjang seluruh batang sama — keduanya mewakili satu utuh. Yang berbeda cuma cara memotongnya: satu dibagi dua, satu dibagi empat.',
        rumus: '[a:½] + [b:¼] = ?',
        durasi: 1800,
      },
      {
        id: 's1',
        judul: 'Coba gabungkan begitu saja',
        narasi:
          'Kalau langsung dihitung "satu potong tambah satu potong sama dengan dua potong", pertanyaannya: dua potong berukuran apa? Keduanya tidak sejenis, jadi tidak bisa dihitung bersama.',
        durasi: 2400,
      },
      {
        id: 's2',
        judul: 'Potong ulang supaya sejenis',
        narasi:
          'Batang atas dipotong lagi menjadi empat. Bagian berwarnanya tidak bertambah maupun berkurang — panjangnya persis sama seperti tadi.',
        durasi: 2400,
      },
      {
        id: 's3',
        judul: 'Sekarang potongannya sama besar',
        narasi:
          'Batang pertama kini terbaca 2/4, batang kedua 1/4. Nilainya sama sekali tidak berubah, hanya namanya yang berganti.',
        rumus: '[a:½] = [a:2/4]',
        durasi: 2000,
      },
      {
        id: 's4',
        judul: 'Baru boleh dijumlahkan',
        narasi:
          'Dua potong ditambah satu potong sama dengan tiga potong. Dan karena satu utuh berisi empat potong, hasilnya tiga per empat.',
        rumus: '[a:2/4] + [b:1/4] = [hasil:3/4]',
        durasi: 2200,
      },
      {
        id: 's5',
        judul: 'Itulah gunanya menyamakan penyebut',
        narasi:
          'Penyebut menyatakan ukuran potongan. Menyamakannya berarti memastikan yang kamu hitung memang benda sejenis — sama seperti kamu tidak menjumlahkan 3 apel dengan 2 jeruk lalu menyebutnya 5 apel.',
        rumus: '[a:a/b] + [b:c/d] = (a×d + c×b) / [q:(b×d)]',
        durasi: 2400,
      },
    ],
  },

  eksperimen: {
    judul: 'Ganti kedua pecahannya',
    ajakan:
      'Dua batang atas adalah pecahan aslinya, dua batang bawah adalah bentuk senilainya setelah dipotong ulang. Perhatikan panjang warnanya tidak pernah berubah.',
    params: [
      { key: 'p1', label: 'Pembilang pertama', min: 1, max: 7, step: 1, awal: 1, bulat: true },
      { key: 'q1', label: 'Penyebut pertama', min: 2, max: 10, step: 1, awal: 2, bulat: true },
      { key: 'p2', label: 'Pembilang kedua', min: 1, max: 7, step: 1, awal: 1, bulat: true },
      { key: 'q2', label: 'Penyebut kedua', min: 2, max: 10, step: 1, awal: 3, bulat: true },
    ],
    Visual: VisualEksperimen,
    temuan: (p) => {
      const { p1, q1, p2, q2, L, a, b, total } = bacaParam(p)
      const sama = q1 === q2
      return (
        <p>
          <strong>
            {fmt(p1)}/{fmt(q1)} + {fmt(p2)}/{fmt(q2)} = {pecahanTeks(total, L, true)}
          </strong>
          . Penyebut sekutu terkecilnya {fmt(L)}, sehingga kedua pecahan ditulis ulang menjadi{' '}
          {fmt(a)}/{fmt(L)} dan {fmt(b)}/{fmt(L)}.{' '}
          {sama
            ? 'Karena penyebutnya sudah sama, tidak ada yang perlu dipotong ulang — tinggal dijumlahkan.'
            : 'Coba buat kedua penyebutnya sama: batang bawah akan berhenti berubah, karena tidak ada yang perlu dipotong lagi.'}{' '}
          Perhatikan juga: hasilnya selalu lebih besar daripada kedua pecahan asalnya.
        </p>
      )
    },
  },

  penjelasan: {
    SD: (
      <>
        <p>
          Bayangkan kamu punya dua kue yang besarnya sama. Kue pertama dipotong jadi{' '}
          <strong>2</strong> bagian, kue kedua dipotong jadi <strong>4</strong> bagian.
        </p>
        <p>
          Kamu mengambil 1 potong dari masing-masing kue. Kalau ditanya "dapat berapa potong?",
          jawabannya memang 2 potong — tapi 2 potong yang tidak sama besar. Jadi tidak bisa langsung
          disebut 2 per sekian.
        </p>
        <p>
          Caranya: potong dulu kue pertama menjadi 4 juga. Sekarang potongan yang tadi 1 dari 2
          berubah menjadi 2 dari 4 — <strong>besarnya sama saja</strong>, cuma dipotong lebih halus.
        </p>
        <p>
          Setelah itu barulah bisa dijumlahkan: 2 potong seperempat + 1 potong seperempat = 3 potong
          seperempat, yaitu 3/4.
        </p>
      </>
    ),
    SMP: (
      <>
        <p>
          Penyebut memberi tahu <strong>ukuran satu potong</strong>, pembilang memberi tahu{' '}
          <strong>berapa banyak potong</strong> yang diambil. Menjumlahkan berarti menghitung total
          potongan — dan itu hanya bermakna kalau potongannya sejenis.
        </p>
        <p>
          Mengubah 1/2 menjadi 2/4 memakai sifat pecahan senilai: mengalikan pembilang dan penyebut
          dengan bilangan yang sama sama saja dengan mengalikan dengan 1, sehingga nilainya tidak
          berubah.
        </p>
        <p style={{ textAlign: 'center' }}>
          a/b = (a×k)/(b×k), karena (a/b) × (k/k) = (a/b) × 1
        </p>
        <p>
          Secara umum: a/b + c/d = (a·d + c·b)/(b·d). Memakai KPK dari b dan d menghasilkan angka
          yang lebih kecil, tetapi hasil akhirnya tetap sama setelah disederhanakan.
        </p>
        <h4>Kenapa pada perkalian tidak perlu disamakan?</h4>
        <p>
          Karena perkaliannya menanyakan hal yang berbeda. "⅔ × ¾" berarti "ambil dua pertiga dari
          tiga perempat" — bukan menghitung banyaknya potongan sejenis, melainkan memotong sesuatu
          yang sudah terpotong. Pada gambar, itu berarti membagi persegi ke dua arah sekaligus,
          sehingga banyaknya potongan kecil menjadi 3 × 4 = 12. Itulah sebabnya penyebutnya dikalikan
          begitu saja.
        </p>
        <h4>Uji cepat yang menyelamatkan</h4>
        <p>
          Jumlah dua pecahan positif harus lebih besar daripada masing-masingnya. Jawaban populer
          ½ + ¼ = 2/6 gagal uji ini, karena 2/6 lebih kecil daripada ½.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Penjumlahan pecahan didefinisikan lewat gagasan penyebut bersama karena bilangan rasional
          dibangun sebagai kelas ekuivalensi pasangan bilangan bulat: (a, b) ~ (c, d) bila ad = bc.
          Operasi
        </p>
        <p style={{ textAlign: 'center' }}>a/b + c/d := (ad + cb)/(bd)</p>
        <p>
          dipilih karena inilah satu-satunya definisi yang membuat ℚ menjadi lapangan (field) yang
          memuat ℤ dan mempertahankan sifat distributif. Definisi "naif" (a + c)/(b + d) bahkan tidak
          terdefinisi dengan baik: 1/2 dan 2/4 mewakili bilangan yang sama, tetapi
          (1+1)/(2+4) = 2/6 sedangkan (2+1)/(4+4) = 3/8 — hasilnya bergantung pada penulisan, bukan
          pada nilainya.
        </p>
        <p>
          Menariknya, operasi naif itu tetap punya makna di tempat lain: (a+c)/(b+d) disebut{' '}
          <em>mediant</em>, muncul pada barisan Farey dan pohon Stern–Brocot. Ia bukan penjumlahan,
          melainkan operasi lain yang selalu menghasilkan nilai di antara kedua pecahan asal — dan
          itu persis mengapa "2/6" terasa terlalu kecil.
        </p>
      </>
    ),
  },

  rumus: {
    src: '[a:a/b] + [b:c/d] = (a·d + c·b) / [q:b·d]',
    roles: { a: 'a', b: 'b', q: 'hi' },
    arti: {
      a: 'Pecahan pertama: a potong berukuran 1/b.',
      b: 'Pecahan kedua: c potong berukuran 1/d.',
      q: 'Penyebut bersama — ukuran potongan baru yang dipakai keduanya. Boleh b×d, tetapi KPK-nya membuat angkanya lebih kecil.',
    },
  },

  soal: [
    (rnd) => {
      const q = [4, 6, 8, 10, 12][Math.floor(rnd() * 5)]
      const q1 = 2
      const p1 = 1
      const p2 = 1 + Math.floor(rnd() * (q / 2 - 1))
      const L = lcm(q1, q)
      const total = (p1 * L) / q1 + (p2 * L) / q
      const [hp, hq] = simplify(total, L)
      return {
        id: 'pec-1',
        tipe: 'isian',
        topicId: 'sd5-penjumlahan-dan-pengurangan-pecahan',
        kelas: 5,
        tingkat: 'mudah',
        konsep: 'pecahan-penyebut',
        pertanyaan: `Hitunglah 1/2 + ${p2}/${q}. Tulis jawabanmu dalam bentuk pecahan paling sederhana, contoh penulisan: 3/4`,
        jawaban: [`${hp}/${hq}`, hq === 1 ? `${hp}` : `${hp}/${hq}`],
        hint: [
          'Ukuran potongan kedua pecahan masih berbeda. Cari ukuran potongan yang bisa dipakai keduanya.',
          `Penyebut sekutu terkecil dari 2 dan ${q} adalah ${L}.`,
          `Ubah 1/2 menjadi ${L / 2}/${L}, lalu jumlahkan pembilangnya.`,
        ],
        pembahasan: `1/2 = ${L / 2}/${L} dan ${p2}/${q} = ${(p2 * L) / q}/${L}. Jumlahnya ${total}/${L} = ${hp}/${hq}.`,
      }
    },
    {
      id: 'pec-2',
      tipe: 'pilihan',
      topicId: 'sd5-penjumlahan-dan-pengurangan-pecahan',
      kelas: 5,
      tingkat: 'sedang',
      konsep: 'pecahan-penyebut',
      pertanyaan: 'Hasil dari 2/3 + 1/6 adalah...',
      pilihan: [
        { id: 'a', label: '5/6', benar: true },
        {
          id: 'b',
          label: '3/9',
          diagnosa:
            'Pembilang dijumlah dengan pembilang, penyebut dengan penyebut. Perhatikan: 3/9 sama dengan 1/3, padahal hasilnya harus lebih besar daripada 2/3.',
        },
        {
          id: 'c',
          label: '3/6',
          diagnosa:
            'Penyebutnya sudah tepat, tetapi 2/3 belum diubah menjadi 4/6 sebelum dijumlahkan.',
        },
        {
          id: 'd',
          label: '5/9',
          diagnosa: 'Pembilangnya sudah benar, tetapi penyebutnya ikut dijumlahkan. Penyebut menyatakan ukuran potongan, dan ukuran itu tidak berubah saat menjumlah.',
        },
      ],
      hint: [
        'Apakah kedua penyebutnya sudah sama? Kalau belum, samakan dulu.',
        'KPK dari 3 dan 6 adalah 6, jadi ubah 2/3 menjadi berapa per enam?',
        '2/3 = 4/6. Sekarang jumlahkan 4/6 + 1/6.',
      ],
      pembahasan:
        '2/3 = 4/6, jadi 4/6 + 1/6 = 5/6. Penyebut tetap 6 karena ukuran potongannya tidak berubah — yang bertambah hanyalah banyaknya potongan.',
    },
    {
      id: 'pec-3',
      tipe: 'benar-salah',
      topicId: 'sd5-penjumlahan-dan-pengurangan-pecahan',
      kelas: 5,
      tingkat: 'sedang',
      konsep: 'pecahan-penyebut',
      pertanyaan: 'Sama seperti penjumlahan, perkalian pecahan juga mengharuskan penyebut disamakan lebih dulu.',
      jawaban: false,
      diagnosa:
        'Perkalian menanyakan hal yang berbeda: "berapa bagian dari bagian". Penyebutnya justru langsung dikalikan, karena potongannya terbagi ke dua arah sekaligus.',
      hint: [
        'Coba hitung 1/2 × 1/3 dengan menggambar persegi yang dipotong dua arah.',
        'Berapa banyak potongan kecil yang terbentuk?',
        'Penjumlahan menghitung banyaknya potongan sejenis; perkalian membuat potongan baru.',
      ],
      pembahasan:
        'Salah. Pada perkalian, pembilang dikali pembilang dan penyebut dikali penyebut: 1/2 × 1/3 = 1/6. Tidak ada penyamaan penyebut sama sekali.',
    },
    {
      id: 'pec-4',
      tipe: 'urutkan',
      topicId: 'sd5-penjumlahan-dan-pengurangan-pecahan',
      kelas: 5,
      tingkat: 'sedang',
      konsep: 'pecahan-penyebut',
      pertanyaan: 'Susun langkah menghitung 3/4 + 2/5.',
      langkah: [
        'Cari penyebut sekutu dari 4 dan 5, yaitu 20',
        'Ubah 3/4 menjadi 15/20',
        'Ubah 2/5 menjadi 8/20',
        'Jumlahkan pembilangnya: 15 + 8 = 23',
        'Hasilnya 23/20, atau 1 3/20',
      ],
      hint: [
        'Menyamakan ukuran potongan selalu dilakukan lebih dulu.',
        'Setelah penyebutnya sama, yang dijumlahkan hanya pembilangnya.',
      ],
      pembahasan:
        '3/4 = 15/20 dan 2/5 = 8/20, jadi jumlahnya 23/20 = 1 3/20. Hasilnya lebih dari satu utuh — masuk akal, karena 3/4 saja sudah hampir satu.',
    },
    {
      id: 'pec-5',
      tipe: 'angka',
      topicId: 'sd5-penjumlahan-dan-pengurangan-pecahan',
      kelas: 6,
      tingkat: 'sulit',
      konsep: 'pecahan-penyebut',
      pertanyaan:
        'Ibu memakai 1/3 kg gula untuk kue dan 1/4 kg untuk minuman. Berapa kg gula yang dipakai seluruhnya? Tulis jawabanmu sebagai desimal, bulatkan sampai tiga angka di belakang koma.',
      jawaban: 7 / 12,
      toleransi: 0.001,
      satuan: 'kg',
      hint: [
        'Samakan dulu penyebut 3 dan 4. Berapa KPK-nya?',
        '1/3 = 4/12 dan 1/4 = 3/12.',
        'Jumlahnya 7/12. Sekarang ubah ke desimal dengan membagi 7 dengan 12.',
      ],
      pembahasan:
        '1/3 + 1/4 = 4/12 + 3/12 = 7/12 ≈ 0,583 kg. Perhatikan hasilnya lebih besar daripada 1/3 maupun 1/4 — sesuai harapan.',
    },
  ],

  lanjut: ['persen-dari', 'bagi-pecahan', 'perkalian-luas'],
}

export default konsep
