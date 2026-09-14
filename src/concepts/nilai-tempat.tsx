/* ============================================================
   KONSEP — Kenapa angka 2 di "25" berharga dua puluh?
   Kelas 2 · Bilangan

   Gagasan: sepuluh kubus satuan MENYATU menjadi satu batang
   puluhan. Karena itu, angka yang ditulis di tempat puluhan
   mewakili batang, bukan kubus. Bilangan 25 dan 52 memakai
   angka yang sama persis, tetapi tumpukan baloknya jauh berbeda.

   Fondasi diam-diam untuk: bilangan besar, desimal, dan
   notasi ilmiah.
   ============================================================ */

import { Svg, Tag } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

const W = 680
const H = 430

const KUBUS = 22 // sisi satu kubus satuan
const SELA = 3

/** Satu batang puluhan: sepuluh kubus yang menyatu. */
function Batang({ x, y, o = 1, nyala = false }: { x: number; y: number; o?: number; nyala?: boolean }) {
  if (o <= 0.01) return null
  return (
    <g opacity={o}>
      <rect
        x={x}
        y={y - 10 * KUBUS}
        width={KUBUS}
        height={10 * KUBUS}
        rx={3}
        fill="var(--m-a)"
        fillOpacity={nyala ? 0.7 : 0.45}
        stroke="var(--m-a)"
        strokeWidth={nyala ? 3 : 2}
      />
      {Array.from({ length: 9 }, (_, i) => (
        <line
          key={i}
          x1={x}
          y1={y - (i + 1) * KUBUS}
          x2={x + KUBUS}
          y2={y - (i + 1) * KUBUS}
          stroke="var(--m-a)"
          strokeWidth={0.8}
          opacity={0.55}
        />
      ))}
    </g>
  )
}

function Kubus({
  x,
  y,
  o = 1,
  nyala = false,
  warna = 'var(--m-b)',
}: {
  x: number
  y: number
  o?: number
  nyala?: boolean
  warna?: string
}) {
  if (o <= 0.01) return null
  return (
    <rect
      x={x}
      y={y - KUBUS}
      width={KUBUS}
      height={KUBUS}
      rx={3}
      fill={warna}
      fillOpacity={nyala ? 0.75 : 0.5}
      stroke={warna}
      strokeWidth={nyala ? 2.5 : 1.6}
      opacity={o}
    />
  )
}

/** Susunan kubus berserakan sebelum dikelompokkan. */
function posisiAcak(i: number) {
  // Pola tetap (bukan acak sungguhan) supaya gambar stabil di tiap render.
  const a = (i * 2654435761) % 1000
  const b = (i * 40503) % 1000
  return { dx: (a / 1000) * 380, dy: (b / 1000) * 120 }
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

/** Nilai penggeser bongkar yang sudah dibulatkan — dipakai gambar DAN teks langkah. */
function bacaBongkar(p: Record<string, number>) {
  const puluhan = clamp(Math.round(p.puluhan ?? 2), 0, 9)
  const satuan = clamp(Math.round(p.satuan ?? 5), 0, 9)
  return { puluhan, satuan, bilangan: puluhan * 10 + satuan, kebalikan: satuan * 10 + puluhan }
}

/** Cara menulis bilangan dua angka; bila diawali 0 (mis. 05), sebut juga nilainya. */
function tulisan(depan: number, belakang: number) {
  return depan === 0 ? `0${fmt(belakang)} (yaitu ${fmt(belakang)})` : fmt(depan * 10 + belakang)
}

/**
 * Bagian "ditulis …" pada rumus langkah 3. Gambar selalu menulis DUA angka
 * (tanpa batang pun tertulis "05"), jadi rumusnya ikut menulis "05" lalu
 * menyebut nilainya, sama seperti `tulisan()`.
 */
function ditulis(puluhan: number, satuan: number) {
  return puluhan === 0
    ? `[bilangan:0${fmt(satuan)}] (yaitu ${fmt(satuan)})`
    : `[bilangan:${fmt(puluhan)}${fmt(satuan)}]`
}

/**
 * Bentuk panjang bilangan — dipakai label pada gambar DAN rumus langkah,
 * supaya keduanya tidak pernah berbeda. `tok` membungkus tiap angka menjadi
 * bagian rumus yang bisa disorot; untuk label gambar, teksnya dibiarkan polos.
 */
function bentukPanjang(p: Record<string, number>, tok: (id: string, teks: string) => string) {
  const { puluhan, satuan, bilangan } = bacaBongkar(p)
  return `${tok('bilangan', fmt(bilangan))} = ${tok('puluhan', fmt(puluhan))} × 10 + ${tok('satuan', fmt(satuan))} × 1`
}

const polos = (_id: string, teks: string) => teks
const token = (id: string, teks: string) => `[${id}:${teks}]`

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const { puluhan, satuan, bilangan, kebalikan } = bacaBongkar(p)

  const berserak = step === 0 ? 1 : step === 1 ? 1 - seg(t, 0.1, 0.9) : 0
  const menyatu = step >= 2 ? (step === 2 ? seg(t, 0.15, 0.9) : 1) : 0
  const tulis = fase(step, t, 3)
  const banding = fase(step, t, 4)
  const rumus = step >= 5

  const nyalaPuluhan = sorot === 'puluhan'
  const nyalaSatuan = sorot === 'satuan'

  const dasar = 330
  const kiri = 90

  // Posisi setiap kubus: dari berserakan menuju kelompok sepuluh.
  const kubusRapi = (i: number) => {
    const kelompok = Math.floor(i / 10)
    const dalam = i % 10
    if (kelompok < puluhan) {
      return { x: kiri + kelompok * (KUBUS + 14), y: dasar - dalam * KUBUS }
    }
    const sisaIdx = i - puluhan * 10
    return {
      x: kiri + puluhan * (KUBUS + 14) + 46 + (sisaIdx % 5) * (KUBUS + SELA),
      y: dasar - Math.floor(sisaIdx / 5) * (KUBUS + SELA),
    }
  }

  // Label kelompok. Bila batangnya sedikit (mis. 1 batang dan 3 kubus), kedua
  // label berdempetan dan latar label satuan menutupi ujung "= 10" pada label
  // puluhan. Dalam keadaan itu label satuan diturunkan satu baris.
  const labelPuluhan = `${fmt(puluhan)} batang puluhan = ${fmt(puluhan * 10)}`
  const labelSatuan = `${fmt(satuan)} satuan`
  const lebarLabel = (s: string) => s.length * 16 * 0.58 + 14 // perkiraan yang sama dengan Tag
  const xPuluhan = Math.max(kiri + (puluhan * (KUBUS + 14)) / 2 - 7, lebarLabel(labelPuluhan) / 2 + 2)
  const xSatuan = kiri + puluhan * (KUBUS + 14) + 46 + (Math.min(satuan, 5) * (KUBUS + SELA)) / 2
  const labelBerdempet =
    puluhan > 0 && xSatuan - lebarLabel(labelSatuan) / 2 < xPuluhan + lebarLabel(labelPuluhan) / 2 + 2
  const ySatuan = labelBerdempet ? dasar + 52 : dasar + 28

  return (
    <Svg w={W} h={H} maxH={440} label="Kubus satuan yang dikelompokkan menjadi batang puluhan">
      {/* kubus satuan, bergerak dari berserakan ke kelompok sepuluh */}
      {menyatu < 0.95 &&
        Array.from({ length: bilangan }, (_, i) => {
          const rapi = kubusRapi(i)
          const acak = posisiAcak(i)
          const x = rapi.x + berserak * (acak.dx - (rapi.x - kiri))
          const y = rapi.y - berserak * acak.dy
          const dalamKelompok = i < puluhan * 10
          return (
            <Kubus
              key={i}
              x={x}
              y={y}
              o={dalamKelompok ? 1 - menyatu : 1}
              warna={dalamKelompok && berserak < 0.5 ? 'var(--m-a)' : 'var(--m-b)'}
              nyala={dalamKelompok ? nyalaPuluhan : nyalaSatuan}
            />
          )
        })}

      {/* batang puluhan yang terbentuk */}
      {menyatu > 0.05 &&
        Array.from({ length: puluhan }, (_, k) => (
          <Batang key={k} x={kiri + k * (KUBUS + 14)} y={dasar} o={menyatu} nyala={nyalaPuluhan} />
        ))}

      {/* sisa kubus satuan setelah menyatu */}
      {menyatu > 0.05 &&
        Array.from({ length: satuan }, (_, i) => (
          <Kubus
            key={`s${i}`}
            x={kiri + puluhan * (KUBUS + 14) + 46 + (i % 5) * (KUBUS + SELA)}
            y={dasar - Math.floor(i / 5) * (KUBUS + SELA)}
            o={menyatu}
            nyala={nyalaSatuan}
          />
        ))}

      {/* label kelompok */}
      {menyatu > 0.6 && (
        <>
          {puluhan > 0 && (
            <Tag x={xPuluhan} y={dasar + 28} warna="var(--m-a)" size={16}>
              {labelPuluhan}
            </Tag>
          )}
          {satuan > 0 && (
            <Tag x={xSatuan} y={ySatuan} warna="var(--m-b)" size={16}>
              {labelSatuan}
            </Tag>
          )}
        </>
      )}

      {/* bilangan yang tertulis */}
      {tulis > 0.1 && (
        <g opacity={tulis}>
          <text
            x={W - 130}
            y={140}
            textAnchor="middle"
            fontSize={70}
            fontWeight={800}
            fontFamily="var(--font-math)"
            fill="var(--ink)"
          >
            <tspan fill={nyalaPuluhan ? 'var(--m-hi)' : 'var(--m-a)'}>{fmt(puluhan)}</tspan>
            <tspan fill={nyalaSatuan ? 'var(--m-hi)' : 'var(--m-b)'}>{fmt(satuan)}</tspan>
          </text>
          <Tag x={W - 152} y={172} warna="var(--m-a)" size={13}>
            puluhan
          </Tag>
          <Tag x={W - 108} y={172} warna="var(--m-b)" size={13}>
            satuan
          </Tag>
        </g>
      )}

      {/* perbandingan dengan bilangan kebalikannya */}
      {banding > 0.2 && (
        <g opacity={banding}>
          <Tag x={W / 2} y={44} warna="var(--m-hi)" size={17}>
            {bilangan === kebalikan
              ? `kedua angkanya kembar: ditukar pun tetap ${fmt(bilangan)}`
              : `angka yang sama, tetapi ${fmt(bilangan)} ≠ ${fmt(kebalikan)}`}
          </Tag>
        </g>
      )}

      {rumus && (
        <Tag x={W / 2} y={H - 22} warna="var(--m-ab)" size={18}>
          {bentukPanjang(p, polos)}
        </Tag>
      )}
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const puluhan = clamp(Math.round(p.puluhan ?? 3), 0, 9)
  const satuan = clamp(Math.round(p.satuan ?? 7), 0, 9)
  const bilangan = puluhan * 10 + satuan
  const kebalikan = satuan * 10 + puluhan

  const dasar = 300
  const nyalaPuluhan = sorot === 'puluhan'
  const nyalaSatuan = sorot === 'satuan'

  const kiriX = 60
  const kananX = W / 2 + 30
  // Lebar satu tumpukan: batang berjajar, lalu kubus lima per baris.
  const lebar = (pul: number, sat: number) =>
    sat > 0
      ? pul * (KUBUS + 8) + 26 + (Math.min(sat, 5) - 1) * (KUBUS + SELA) + KUBUS
      : Math.max(pul * (KUBUS + 8) - 8, 0)
  // Tumpukan besar (mis. 99) tidak muat di separuh panggung: kubusnya akan
  // terpotong atau menyeberang ke sisi lain. Keduanya diperkecil dengan skala
  // yang SAMA agar batang kiri dan kanan tetap sebanding ukurannya.
  const skala = Math.min(
    1,
    (W / 2 - 10 - kiriX) / Math.max(lebar(puluhan, satuan), 1),
    (W - 2 - kananX) / Math.max(lebar(satuan, puluhan), 1),
  )

  const gambar = (px: number, pul: number, sat: number, warnaKuat: boolean) => (
    <g transform={`translate(${px} ${dasar}) scale(${skala}) translate(${-px} ${-dasar})`}>
      {Array.from({ length: pul }, (_, k) => (
        <Batang key={k} x={px + k * (KUBUS + 8)} y={dasar} nyala={warnaKuat && nyalaPuluhan} />
      ))}
      {Array.from({ length: sat }, (_, i) => (
        <Kubus
          key={`s${i}`}
          x={px + pul * (KUBUS + 8) + 26 + (i % 5) * (KUBUS + SELA)}
          y={dasar - Math.floor(i / 5) * (KUBUS + SELA)}
          nyala={warnaKuat && nyalaSatuan}
        />
      ))}
    </g>
  )

  return (
    <Svg w={W} h={H} maxH={440} label="Perbandingan tumpukan balok untuk dua bilangan dengan angka yang sama">
      {gambar(kiriX, puluhan, satuan, true)}
      {gambar(kananX, satuan, puluhan, false)}

      <line x1={W / 2} y1={70} x2={W / 2} y2={dasar + 40} stroke="var(--line)" strokeWidth={1.5} />

      <Tag x={200} y={56} warna="var(--ink)" size={26}>
        {fmt(bilangan)}
      </Tag>
      <Tag x={W / 2 + 170} y={56} warna="var(--ink-2)" size={26}>
        {fmt(kebalikan)}
      </Tag>
      <Tag x={200} y={dasar + 40} warna="var(--m-a)" size={15}>
        {`${fmt(puluhan)} × 10 + ${fmt(satuan)} × 1`}
      </Tag>
      <Tag x={W / 2 + 170} y={dasar + 40} warna="var(--ink-2)" size={15}>
        {`${fmt(satuan)} × 10 + ${fmt(puluhan)} × 1`}
      </Tag>
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'nilai-tempat',
  topicId: 'sd2-nilai-tempat-puluhan-dan-satuan',
  judul: 'Nilai tempat',
  pertanyaan: 'Kenapa angka 2 di "25" berharga dua puluh, bukan dua?',
  tagline: 'Angka yang sama bisa berbeda nilainya — semuanya tergantung tempat duduknya.',
  kelas: 2,
  domain: 'bilangan',
  tags: ['nilai tempat', 'puluhan', 'satuan', 'bilangan'],

  tebak: {
    pertanyaan: 'Mana yang lebih banyak: 25 kelereng atau 52 kelereng?',
    pilihan: [
      {
        id: 'a',
        label: '25',
        balasan:
          'Angka-angkanya memang sama-sama 2 dan 5. Tapi coba lihat tumpukan baloknya sebentar lagi — bedanya jauh.',
      },
      {
        id: 'b',
        label: '52',
        benar: true,
        balasan:
          'Betul, dan bedanya besar sekali: 52 dan 25 berselisih 27 kelereng, padahal angkanya sama persis.',
      },
      {
        id: 'c',
        label: 'Sama saja, angkanya sama',
        balasan:
          'Angkanya memang sama, tetapi tempat duduknya berbeda — dan tempat itulah yang menentukan nilainya.',
      },
    ],
    penutup: 'Jadi yang menentukan bukan cuma angkanya, tapi juga di mana angka itu berdiri.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      { key: 'puluhan', label: 'Angka puluhan', min: 0, max: 9, step: 1, awal: 2, bulat: true },
      { key: 'satuan', label: 'Angka satuan', min: 0, max: 9, step: 1, awal: 5, bulat: true },
    ],
    roles: { puluhan: 'a', satuan: 'b', bilangan: 'ab' },
    arti: {
      puluhan: 'Angka di tempat puluhan — menghitung BATANG, bukan kubus.',
      satuan: 'Angka di tempat satuan — menghitung kubus yang berdiri sendiri.',
      bilangan: 'Bilangan seluruhnya.',
    },
    steps: [
      {
        id: 's0',
        judul: (p) => {
          const { bilangan } = bacaBongkar(p)
          if (bilangan === 0) return 'Belum ada kubus'
          return bilangan === 1 ? 'Baru satu kubus' : 'Kubus yang berserakan'
        },
        narasi: (p) => {
          const { bilangan } = bacaBongkar(p)
          if (bilangan === 0) {
            return 'Kedua angkanya 0, jadi belum ada satu kubus pun di sini. Geser salah satu angka supaya kubus kecil bermunculan — satu kubus bernilai satu.'
          }
          if (bilangan < 10) {
            return `Ada ${fmt(bilangan)} kubus kecil di sini, satu kubus bernilai satu. Sedikit begini masih mudah dihitung, tetapi kalau kubusnya puluhan, menghitung satu per satu melelahkan dan gampang keliru.`
          }
          return 'Ada banyak kubus kecil di sini, satu kubus bernilai satu. Menghitungnya satu per satu melelahkan dan gampang keliru.'
        },
        durasi: 1800,
      },
      {
        id: 's1',
        judul: 'Kelompokkan sepuluh-sepuluh',
        narasi: (p) => {
          const { puluhan, satuan } = bacaBongkar(p)
          if (puluhan === 0) {
            return satuan === 0
              ? 'Belum ada kubus yang bisa dikelompokkan. Nanti kubus dikumpulkan sepuluh demi sepuluh, dan sisa yang tidak cukup sepuluh dibiarkan berdiri sendiri.'
              : satuan === 1
                ? 'Kubusnya cuma 1, belum cukup untuk satu kelompok sepuluh. Jadi kubus itu dibiarkan berdiri sendiri sebagai sisa.'
                : `Kubusnya cuma ${fmt(satuan)}, belum cukup untuk satu kelompok sepuluh. Jadi semuanya dibiarkan berdiri sendiri sebagai sisa.`
          }
          const sisa =
            satuan === 0
              ? 'Semuanya pas, tidak ada kubus yang tersisa.'
              : `Sisa ${fmt(satuan)} kubus yang tidak cukup sepuluh dibiarkan berdiri sendiri.`
          return `Kubus dikumpulkan sepuluh demi sepuluh, dan terbentuk ${fmt(puluhan)} kelompok. ${sisa}`
        },
        durasi: 2400,
      },
      {
        id: 's2',
        judul: 'Setiap sepuluh menyatu jadi satu batang',
        narasi: (p) => {
          const { puluhan, satuan } = bacaBongkar(p)
          if (puluhan === 0) {
            return satuan === 0
              ? 'Belum ada kubus, jadi tidak ada batang yang terbentuk. Begitu ada sepuluh kubus, kesepuluhnya menyatu menjadi satu batang yang isinya tetap sepuluh.'
              : 'Kubusnya belum sampai sepuluh, jadi tidak ada batang yang terbentuk. Begitu genap sepuluh, kubus-kubus itu menyatu menjadi satu batang yang isinya tetap sepuluh.'
          }
          if (puluhan === 1) {
            return 'Sepuluh kubus tadi menyatu menjadi satu batang. Batangnya satu benda, tetapi isinya tetap sepuluh.'
          }
          return `Sepuluh kubus menjadi satu batang, jadi ${fmt(puluhan * 10)} kubus tadi kini menjadi ${fmt(puluhan)} batang. Batangnya satu benda, tetapi isinya tetap sepuluh.`
        },
        durasi: 2200,
      },
      {
        id: 's3',
        judul: 'Tulis berapa batang dan berapa kubus',
        narasi:
          'Angka pertama menghitung batang, angka kedua menghitung kubus sisa. Sisa kubus selalu kurang dari sepuluh, dan sepuluh batang pun akan menyatu lagi menjadi satu ratusan — jadi tiap tempat cukup diisi satu angka, 0 sampai 9.',
        rumus: (p) => {
          const { puluhan, satuan } = bacaBongkar(p)
          return `[puluhan:${fmt(puluhan)}] batang · [satuan:${fmt(satuan)}] kubus → ditulis ${ditulis(puluhan, satuan)}`
        },
        durasi: 2200,
      },
      {
        id: 's4',
        judul: (p) => {
          const { puluhan, satuan } = bacaBongkar(p)
          return puluhan === satuan
            ? 'Tukar tempatnya — angka kembar tidak berubah'
            : 'Tukar tempatnya, hasilnya berbeda'
        },
        narasi: (p) => {
          const { puluhan, satuan, bilangan, kebalikan } = bacaBongkar(p)
          if (puluhan === satuan) {
            return `Kedua angkanya kembar, jadi ditukar pun tetap ${fmt(bilangan)}. Hanya angka kembar yang begini; kalau angkanya berbeda, menukar tempat pasti menghasilkan bilangan lain.`
          }
          return `Kalau kedua angkanya bertukar tempat, ${tulisan(puluhan, satuan)} menjadi ${tulisan(satuan, puluhan)}, sebab banyak batangnya berubah dari ${fmt(puluhan)} menjadi ${fmt(satuan)}. Angkanya sama, tapi bilangannya lain — selisihnya ${fmt(Math.abs(bilangan - kebalikan))}.`
        },
        durasi: 2400,
      },
      {
        id: 's5',
        judul: 'Itulah arti nilai tempat',
        narasi:
          'Angka di tempat puluhan bernilai sepuluh kali lipat dibanding angka yang sama di tempat satuan.',
        rumus: (p) => bentukPanjang(p, token),
        durasi: 2200,
      },
    ],
  },

  eksperimen: {
    judul: 'Susun bilanganmu sendiri',
    ajakan:
      'Geser kedua angka. Kiri adalah bilanganmu, kanan adalah bilangan dengan angka yang sama tetapi bertukar tempat.',
    params: [
      { key: 'puluhan', label: 'Angka puluhan', min: 0, max: 9, step: 1, awal: 3, bulat: true },
      { key: 'satuan', label: 'Angka satuan', min: 0, max: 9, step: 1, awal: 7, bulat: true },
    ],
    Visual: VisualEksperimen,
    temuan: (p) => {
      const pul = clamp(Math.round(p.puluhan ?? 3), 0, 9)
      const sat = clamp(Math.round(p.satuan ?? 7), 0, 9)
      const n = pul * 10 + sat
      const k = sat * 10 + pul
      const beda = Math.abs(n - k)
      return (
        <p>
          <strong>{fmt(n)}</strong> tersusun dari {fmt(pul)} batang dan {fmt(sat)} kubus.{' '}
          {pul === sat
            ? 'Karena kedua angkanya sama, menukar tempat tidak mengubah apa pun — inilah satu-satunya keadaan ketika hal itu terjadi.'
            : `Kalau kedua angkanya ditukar tempat, bilangannya menjadi ${fmt(k)}, berselisih ${fmt(beda)}. Selisih itu selalu 9 dikali beda kedua angkanya: 9 × ${fmt(Math.abs(pul - sat))} = ${fmt(beda)}.`}{' '}
          {sat === 0
            ? 'Angka satuannya 0, jadi tidak ada kubus lepas: bilangannya kelipatan sepuluh.'
            : 'Coba buat angka satuannya 0: bilangannya menjadi kelipatan sepuluh.'}
        </p>
      )
    },
  },

  penjelasan: {
    SD: (
      <>
        <p>
          Bayangkan sedotan. Setiap sepuluh sedotan kamu ikat jadi satu bundel. Kalau kamu punya 2
          bundel dan 5 sedotan lepas, berarti kamu punya <strong>25</strong> sedotan.
        </p>
        <p>
          Angka <strong>2</strong> di depan bukan berarti "dua sedotan" — artinya "dua{' '}
          <strong>bundel</strong>", dan satu bundel isinya sepuluh. Jadi 2 di situ bernilai dua
          puluh.
        </p>
        <p>
          Kalau angkanya bertukar menjadi 52, artinya 5 bundel dan 2 sedotan lepas — jauh lebih
          banyak. Tempat duduk angka menentukan berapa nilainya.
        </p>
      </>
    ),
    SMP: (
      <>
        <p>
          Sistem bilangan yang kita pakai disebut <strong>sistem desimal posisional</strong>. Nilai
          sebuah angka ditentukan oleh dua hal: angkanya sendiri, dan pangkat sepuluh yang
          bersesuaian dengan posisinya.
        </p>
        <p style={{ textAlign: 'center' }}>
          25 = 2·10¹ + 5·10⁰, dan 3.407 = 3·10³ + 4·10² + 0·10¹ + 7·10⁰
        </p>
        <p>
          Gagasan yang sama terus dipakai ke arah sebaliknya, ke bilangan desimal:
          0,25 = 2·10⁻¹ + 5·10⁻². Tempat setelah koma tidak "berbeda aturan" — ia hanya melanjutkan
          pola pangkat sepuluh yang menurun.
        </p>
        <h4>Peran angka nol</h4>
        <p>
          Nol adalah penemuan yang membuat sistem ini bekerja. Tanpa penanda tempat kosong, 305 dan
          35 mustahil dibedakan. Angka 0 pada 305 tidak berarti "tidak ada apa-apa", melainkan "tidak
          ada puluhan" — dan justru itulah yang menahan angka 3 tetap di tempat ratusan.
        </p>
        <h4>Kenapa selisihnya selalu kelipatan 9</h4>
        <p>
          Untuk bilangan dua angka, (10a + b) − (10b + a) = 9(a − b). Karena itu 52 − 25 = 27 = 9 × 3,
          dan pola ini berlaku untuk pasangan angka mana pun.
        </p>
      </>
    ),
  },

  rumus: {
    src: '[bilangan:25] = [puluhan:2] × 10 + [satuan:5] × 1',
    roles: { bilangan: 'ab', puluhan: 'a', satuan: 'b' },
    arti: {
      bilangan: 'Bilangan yang tertulis.',
      puluhan: 'Angka di tempat puluhan. Ia menghitung batang berisi sepuluh, jadi nilainya dikali 10.',
      satuan: 'Angka di tempat satuan. Ia menghitung kubus yang berdiri sendiri, jadi dikali 1.',
    },
  },

  soal: [
    (rnd) => {
      const pul = 1 + Math.floor(rnd() * 9)
      const sat = Math.floor(rnd() * 10)
      return {
        id: 'nt-1',
        tipe: 'angka',
        topicId: 'sd2-nilai-tempat-puluhan-dan-satuan',
        kelas: 2,
        tingkat: 'mudah',
        konsep: 'nilai-tempat',
        pertanyaan: `Pada bilangan ${pul * 10 + sat}, berapa nilai angka ${pul}${pul === sat ? ' yang paling kiri' : ''}?`,
        jawaban: pul * 10,
        toleransi: 1e-9,
        hint: [
          'Perhatikan angka itu duduk di tempat mana: puluhan atau satuan?',
          'Angka di tempat puluhan menghitung batang, dan satu batang isinya sepuluh.',
          `Jadi nilainya ${pul} × 10.`,
        ],
        pembahasan: `Angka ${pul}${pul === sat ? ' yang paling kiri' : ''} berada di tempat puluhan, jadi nilainya ${pul} × 10 = ${pul * 10}, bukan ${pul}.`,
      }
    },
    {
      id: 'nt-2',
      tipe: 'pilihan',
      topicId: 'sd2-nilai-tempat-puluhan-dan-satuan',
      kelas: 3,
      tingkat: 'sedang',
      konsep: 'nilai-tempat',
      pertanyaan: 'Bilangan 305 dibaca...',
      pilihan: [
        { id: 'a', label: 'Tiga ratus lima', benar: true },
        {
          id: 'b',
          label: 'Tiga puluh lima',
          diagnosa:
            'Angka 0 terlewat saat membaca. Padahal 0 itulah yang menahan angka 3 tetap di tempat ratusan.',
        },
        {
          id: 'c',
          label: 'Tiga nol lima',
          diagnosa: 'Angka dibaca satu per satu seperti nomor telepon, bukan sebagai bilangan.',
        },
        {
          id: 'd',
          label: 'Tiga ratus lima puluh',
          diagnosa: 'Ini bacaan untuk 350. Perhatikan posisi angka 0 dan 5.',
        },
      ],
      hint: [
        'Tulis dulu tiap angka berada di tempat apa: ratusan, puluhan, satuan.',
        '3 di ratusan, 0 di puluhan, 5 di satuan.',
        'Angka 0 berarti tidak ada puluhan — tetapi tempatnya tetap harus ada.',
      ],
      pembahasan:
        '305 = 3 × 100 + 0 × 10 + 5 × 1, dibaca "tiga ratus lima". Tanpa angka 0, bilangan ini akan tertulis 35 dan artinya berubah total.',
    },
    {
      id: 'nt-3',
      tipe: 'benar-salah',
      topicId: 'sd2-nilai-tempat-puluhan-dan-satuan',
      kelas: 2,
      tingkat: 'mudah',
      konsep: 'nilai-tempat',
      pertanyaan: 'Bilangan 47 dan 74 bernilai sama karena tersusun dari angka yang sama.',
      jawaban: false,
      diagnosa:
        'Coba bayangkan baloknya: 47 berarti 4 batang dan 7 kubus, sedangkan 74 berarti 7 batang dan 4 kubus. Tumpukannya jelas berbeda.',
      hint: [
        'Bandingkan berapa banyak batang puluhan pada masing-masing bilangan.',
        '47 punya 4 batang; 74 punya 7 batang.',
      ],
      pembahasan:
        'Salah. 47 = 4 × 10 + 7 = 47, sedangkan 74 = 7 × 10 + 4 = 74. Selisihnya 27, yaitu 9 × 3.',
    },
    {
      id: 'nt-4',
      tipe: 'cocokkan',
      topicId: 'sd2-nilai-tempat-puluhan-dan-satuan',
      kelas: 3,
      tingkat: 'sedang',
      konsep: 'nilai-tempat',
      pertanyaan: 'Pasangkan tiap bilangan dengan bentuk panjangnya.',
      pasangan: [
        { kiri: '64', kanan: '6 × 10 + 4 × 1' },
        { kiri: '46', kanan: '4 × 10 + 6 × 1' },
        { kiri: '60', kanan: '6 × 10 + 0 × 1' },
        { kiri: '406', kanan: '4 × 100 + 0 × 10 + 6 × 1' },
      ],
      hint: [
        'Lihat angka paling kiri: ia berada di tempat yang nilainya paling besar.',
        'Bilangan dengan tiga angka pasti memuat ratusan.',
      ],
      pembahasan:
        'Menulis bilangan dalam bentuk panjang memperlihatkan tugas tiap angka. Perhatikan 406: angka 0 di tempat puluhan tidak boleh dihilangkan.',
    },
    (rnd) => {
      const pul = 1 + Math.floor(rnd() * 9)
      // Angka satuan dipilih dari 0–9 selain `pul`: angka kembar (33) membuat
      // "ditukar menjadi 33" dan selisih 0, sehingga pola 9 × beda tidak terlihat.
      const acak = Math.floor(rnd() * 9)
      const sat = acak >= pul ? acak + 1 : acak
      const n = pul * 10 + sat
      const k = sat * 10 + pul
      return {
        id: 'nt-5',
        tipe: 'angka',
        topicId: 'sd2-nilai-tempat-puluhan-dan-satuan',
        kelas: 4,
        tingkat: 'sulit',
        konsep: 'nilai-tempat',
        pertanyaan: `Bilangan ${n} ditukar posisi angkanya menjadi ${sat === 0 ? `0${pul}, yaitu ${k}` : k}. Berapa selisih kedua bilangan itu?`,
        jawaban: Math.abs(n - k),
        toleransi: 1e-9,
        hint: [
          'Hitung dulu masing-masing bilangan dalam bentuk panjang.',
          `${n} = ${pul} × 10 + ${sat}, dan ${k} = ${sat} × 10 + ${pul}.`,
          'Selisihnya selalu 9 dikali beda kedua angkanya.',
        ],
        pembahasan: `Selisihnya ${Math.max(n, k)} − ${Math.min(n, k)} = ${Math.abs(n - k)} = 9 × ${Math.abs(pul - sat)}. Pola ini berlaku untuk semua bilangan dua angka.`,
      }
    },
  ],

  lanjut: ['perkalian-luas', 'persen-dari', 'negatif-kali-negatif'],
}

export default konsep
