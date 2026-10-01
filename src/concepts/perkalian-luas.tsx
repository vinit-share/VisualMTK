/* ============================================================
   KONSEP — Kenapa 4 × 6 sama dengan 6 × 4?
   Kelas 3 · Bilangan

   Gagasan: perkalian punya BENTUK. Susunan 4 baris berisi 6
   dan susunan 6 baris berisi 4 adalah bangun yang sama, hanya
   diputar seperempat putaran. Memutar tidak menambah maupun
   membuang satu kotak pun — jadi hasilnya wajib sama.

   Sekaligus menanam benih untuk seluruh rumus luas: a × b
   adalah luas persegi panjang berukuran a dan b.

   Interaksi langsung: anak memegang susunan kotaknya sendiri.
   - Pojok kanan bawah susunan mengatur baris DAN kolom sekaligus:
     ditarik ke kanan kolomnya bertambah, ditarik ke bawah barisnya
     bertambah. Susunan selalu tumbuh dari pusatnya, jadi pojoknya
     bergeser setengah kotak untuk tiap kotak baru — `keNilai`
     memakai faktor 2 yang persis sama dengan rumus posisinya.
   - Selama pojok dipegang, ukuran kotak satuan DIBEKUKAN. Yang
     bertambah benar-benar terlihat sebagai kotak baru, bukan kotak
     lama yang mengecil, dan pojoknya tetap menempel di jari.
   - Di bongkar pegangan disembunyikan selama bangunnya berputar:
     objeknya sedang bergerak, belum ada tempat untuk dipegang.
   ============================================================ */

import { useEffect, useRef, useState } from 'react'
import { Pegangan, useInteraksi } from '../components/Interaksi'
import { Svg, Tag, Dimensi, useSempit } from '../components/Stage'
import { seg, easing, useTween } from '../lib/anim'
import { clamp, fmt } from '../lib/num'
import type { DeriveState, Konsep, ParamSpec } from '../lib/types'

/* ---------------- Penggeser ---------------- */

const PARAM_BONGKAR: ParamSpec[] = [
  { key: 'a', label: 'Banyak baris', min: 1, max: 8, step: 1, awal: 4, bulat: true, simbol: 'a', peran: 'a', bagian: 'a' },
  { key: 'b', label: 'Isi tiap baris', min: 1, max: 8, step: 1, awal: 6, bulat: true, simbol: 'b', peran: 'b', bagian: 'b' },
]

const PARAM_EKSPERIMEN: ParamSpec[] = [
  { key: 'a', label: 'Banyak baris', min: 1, max: 12, step: 1, awal: 4, bulat: true, simbol: 'a', peran: 'a', bagian: 'a' },
  { key: 'b', label: 'Isi tiap baris', min: 1, max: 12, step: 1, awal: 6, bulat: true, simbol: 'b', peran: 'b', bagian: 'b' },
]

/** Nilai baris (a) dan isi tiap baris (b) pada animasi bongkar — dipakai gambar DAN teks langkah. */
function ukuran(p: Record<string, number>) {
  return {
    a: clamp(Math.round(p.a ?? 4), 1, 8),
    b: clamp(Math.round(p.b ?? 6), 1, 8),
  }
}

/* ---------------- Ukuran kotak satuan ---------------- */

/** Kotak cadangan yang disisakan, supaya pojoknya masih bisa ditarik keluar beberapa langkah. */
const SISA = 2

/**
 * Ukuran satu kotak satuan dalam satuan SVG.
 * `pas` = ukuran ideal (sudah menyisakan SISA kotak), `batas` = ukuran terbesar
 * yang masih muat tanpa sisa — jaring pengaman supaya gambar tidak pernah
 * keluar bingkai. Selama pojok dipegang ukurannya dibekukan: kotak satuan tidak
 * ikut mengecil, jadi yang bertambah terlihat sebagai kotak baru.
 */
function useSatuan(pas: number, batas: number, dipegang: boolean) {
  const halus = useTween(pas, { durasi: 340 })
  const [beku, setBeku] = useState<number | null>(null)
  const terakhir = useRef(pas)
  useEffect(() => {
    if (!dipegang) terakhir.current = halus
  })
  useEffect(() => {
    setBeku(dipegang ? terakhir.current : null)
  }, [dipegang])
  return Math.min(beku ?? halus, batas)
}

/* ---------------- Kisi kotak satuan ---------------- */

/**
 * Kisi a baris × b kolom. Jarak antar-pusat kotak SELALU u, berapa pun
 * `renggang`-nya: saat direnggangkan kotaknya yang mengecil, bukan susunannya
 * yang melebar. Dengan begitu ukuran susunan — dan letak pojok yang dipegang —
 * tidak berubah selama animasi merapatkan.
 */
function Kisi({
  a,
  b,
  u,
  x,
  y,
  renggang = 0,
  warna = 'var(--m-a)',
  nyalaBaris = -1,
  nyalaKolom = -1,
  semua = false,
}: {
  a: number
  b: number
  u: number
  x: number
  y: number
  /** 0 = rapat (kotak bersentuhan), 1 = renggang (titik-titik terpisah). */
  renggang?: number
  warna?: string
  nyalaBaris?: number
  nyalaKolom?: number
  /** nyalakan seluruh kotak (mis. saat bagian "hasil" pada rumus disorot). */
  semua?: boolean
}) {
  const sela = renggang * u * 0.3
  const kotak = []
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      const nyala = semua || i === nyalaBaris || j === nyalaKolom
      kotak.push(
        <rect
          key={`${i}-${j}`}
          x={x + j * u + sela / 2}
          y={y + i * u + sela / 2}
          width={u - sela}
          height={u - sela}
          rx={renggang * (u / 2.4)}
          fill={warna}
          fillOpacity={nyala ? 0.72 : 0.4}
          stroke={warna}
          strokeWidth={1.4}
        />,
      )
    }
  }
  return <g>{kotak}</g>
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

/** "6 + 6 + 6 = 18" — penjumlahan berulang yang sedang dihitung. */
const jumlahBerulang = (n: number, nilai: number) =>
  `${Array.from({ length: n }, () => fmt(nilai)).join(' + ')} = ${fmt(n * nilai)}`

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const { a, b } = ukuran(p) // a baris, b kolom
  const sempit = useSempit()
  const aktif = useInteraksi()?.kendali.aktif ?? null
  const dipegang = aktif === 'a' || aktif === 'b'

  // Dua tata letak. Bangunnya berputar, jadi ruang yang disediakan sama lebar
  // dan sama tinggi; di HP susunannya justru digambar lebih besar relatif
  // terhadap bingkainya.
  const L = sempit
    ? { w: 420, h: 460, cx: 210, cy: 244, ruang: 256, dim: 18, teksY: 28 }
    : { w: 660, h: 430, cx: 330, cy: 234, ruang: 280, dim: 20, teksY: 30 }

  const sisi = Math.max(a, b)
  const uDasar = useSatuan(L.ruang / Math.min(8, sisi + SISA), L.ruang / sisi, dipegang)

  const rapat = step === 1 ? 1 - seg(t, 0.15, 0.9) : step >= 1 ? 0 : 1
  const putar = step >= 2 ? (step === 2 ? 90 * easing.inOutCubic(seg(t, 0.1, 0.95)) : 90) : 0
  const rad = (putar * Math.PI) / 180

  // Saat miring, bangunnya memakan ruang selebar diagonalnya. Kisi dikecilkan
  // secukupnya supaya tidak ada yang keluar bingkai, dan kembali ke ukuran
  // semula tepat pada 0° dan 90°.
  const bentangX = b * uDasar * Math.cos(rad) + a * uDasar * Math.sin(rad)
  const bentangY = b * uDasar * Math.sin(rad) + a * uDasar * Math.cos(rad)
  const u = uDasar * Math.min(1, L.ruang / Math.max(bentangX, bentangY, 1))

  const cx = L.cx
  const cy = L.cy
  const lebar = b * u
  const tinggi = a * u
  const x0 = cx - lebar / 2
  const y0 = cy - tinggi / 2

  // Ukuran ditulis sesuai orientasi yang terbaca sekarang.
  const terputar = putar >= 45
  const lebarBaca = terputar ? tinggi : lebar
  const tinggiBaca = terputar ? lebar : tinggi
  const kolom = terputar ? a : b
  const baris = terputar ? b : a
  const bx0 = cx - lebarBaca / 2
  const by0 = cy - tinggiBaca / 2
  // Garis ukur memudar selama bangunnya miring, lalu muncul lagi setelah tegak.
  const opUkur = Math.max(0, 1 - Math.sin(2 * rad))
  const berputar = putar > 2 && putar < 88

  const nyalaA = sorot === 'a'
  const nyalaB = sorot === 'b'

  // Baris yang sedang dihitung pada langkah 0.
  const barisAktif = step === 0 ? Math.min(a - 1, Math.floor(t * a * 1.15)) : -1
  const ab = a * b

  // Satu baris keterangan di atas gambar; di HP kalimatnya diperpendek.
  const ket =
    step === 0
      ? { teks: jumlahBerulang(Math.max(1, barisAktif + 1), b), warna: 'var(--m-b)', size: 17 }
      : step === 1
        ? {
            teks:
              a === 1 && b === 1
                ? 'titiknya diubah menjadi sebuah kotak'
                : a === b
                  ? 'titik-titik dirapatkan menjadi persegi'
                  : sempit
                    ? 'dirapatkan menjadi persegi panjang'
                    : 'titik-titik dirapatkan menjadi persegi panjang',
            warna: 'var(--ink-2)',
            size: 16,
          }
        : step === 2
          ? { teks: 'bangunnya diputar seperempat putaran', warna: 'var(--m-hi)', size: 16 }
          : step === 3
            ? { teks: jumlahBerulang(b, a), warna: 'var(--m-a)', size: 17 }
            : step === 4
              ? {
                  teks: sempit
                    ? `tetap ${fmt(ab)} kotak`
                    : `tetap ${fmt(ab)} kotak — tidak ada yang ditambah atau dibuang`,
                  warna: 'var(--ink-2)',
                  size: 16,
                }
              : {
                  teks: `${fmt(a)} × ${fmt(b)} = ${fmt(b)} × ${fmt(a)} = ${fmt(ab)}`,
                  warna: 'var(--m-ab)',
                  size: 19,
                }

  // Seretan ditahan pada jumlah kotak yang masih muat dengan ukuran kotak
  // yang sedang dipakai, supaya kisinya tidak perlu mengecil di tengah seretan.
  const muat = Math.floor(L.ruang / u + 1e-6)
  const labelPojok = `${fmt(baris)} × ${fmt(kolom)} = ${fmt(ab)}`

  return (
    <Svg w={L.w} h={L.h} maxH={sempit ? 460 : 440} label="Susunan kotak yang diputar seperempat putaran">
      <g transform={`rotate(${putar.toFixed(2)} ${cx} ${cy})`}>
        <Kisi
          a={a}
          b={b}
          u={u}
          x={x0}
          y={y0}
          renggang={rapat}
          nyalaBaris={step === 0 ? barisAktif : nyalaB ? 0 : -1}
          nyalaKolom={nyalaA ? 0 : -1}
          semua={sorot === 'hasil'}
        />
      </g>

      {/* ukuran, menempel pada sisi yang dihitungnya; labelnya disembunyikan
          selama pojok dipegang karena pegangan sudah menampilkan angkanya */}
      <Dimensi
        x1={bx0}
        y1={by0 - L.dim}
        x2={bx0 + lebarBaca}
        y2={by0 - L.dim}
        label={dipegang ? undefined : `${fmt(kolom)} kolom`}
        warna={terputar ? 'var(--m-a)' : 'var(--m-b)'}
        opacity={opUkur * ((terputar ? nyalaA : nyalaB) ? 1 : 0.85)}
      />
      <Dimensi
        x1={bx0 - L.dim}
        y1={by0}
        x2={bx0 - L.dim}
        y2={by0 + tinggiBaca}
        label={dipegang ? undefined : `${fmt(baris)} baris`}
        warna={terputar ? 'var(--m-b)' : 'var(--m-a)'}
        opacity={opUkur * ((terputar ? nyalaB : nyalaA) ? 1 : 0.85)}
      />

      <Tag x={cx} y={L.teksY} warna={ket.warna} size={ket.size}>
        {ket.teks}
      </Tag>

      {/* Pojok kanan bawah susunan: baris dan kolom sekaligus. Letaknya dihitung
          dari nilai yang sama dengan yang menggambar kisinya, dan keNilai adalah
          kebalikannya persis. Setelah bangunnya diputar, pojok yang sama berpindah
          peran: sumbu x kini menghitung a, sumbu y menghitung b. */}
      {terputar ? (
        <Pegangan
          x={cx + tinggi / 2}
          y={cy + lebar / 2}
          param={['a', 'b']}
          arah="bebas"
          utama
          warna="var(--m-ab)"
          sembunyi={berputar}
          label={labelPojok}
          ajakan="Tarik pojok"
          keNilai={(pt) => ({
            a: Math.min(((pt.x - cx) * 2) / u, muat),
            b: Math.min(((pt.y - cy) * 2) / u, muat),
          })}
        />
      ) : (
        <Pegangan
          x={cx + lebar / 2}
          y={cy + tinggi / 2}
          param={['b', 'a']}
          arah="bebas"
          utama
          warna="var(--m-ab)"
          sembunyi={berputar}
          label={labelPojok}
          ajakan="Tarik pojok"
          keNilai={(pt) => ({
            b: Math.min(((pt.x - cx) * 2) / u, muat),
            a: Math.min(((pt.y - cy) * 2) / u, muat),
          })}
        />
      )}
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const a = clamp(Math.round(p.a ?? 4), 1, 12)
  const b = clamp(Math.round(p.b ?? 6), 1, 12)
  const sempit = useSempit()
  const aktif = useInteraksi()?.kendali.aktif ?? null
  const dipegang = aktif === 'a' || aktif === 'b'

  /**
   * Dua tata letak untuk hal yang sama. Lebar: kedua susunan berjajar, masing-
   * masing berporos pada titik tetapnya sendiri (`c1`, `c2`) supaya pojok yang
   * dipegang hanya bergantung pada nilainya sendiri. HP: keduanya bertumpuk,
   * peran sumbunya bertukar.
   * `sisi`   = ruang untuk sisi terpanjang satu susunan,
   * `jumlah` = ruang untuk kedua susunan berjajar (a + b kotak).
   *
   * `jumlah` selalu 2 × `sisi`. Itu bukan angka hiasan: seretan dijepit pada
   * `muatSisi` dan `muatJumlah`, dan hanya dengan perbandingan ini kedua
   * jepitan tidak pernah saling mendahului — ⌊2x⌋ ≥ 2⌊x⌋ — sehingga ukuran
   * kotak satuan yang dibekukan selama pojok dipegang tidak pernah perlu
   * mengecil di tengah seretan. Dengan `jumlah` yang lebih kecil, menarik
   * pojok ke sudut membuat seluruh kisi menciut sampai 23% dan pojoknya
   * lepas dari jari.
   */
  const L = sempit
    ? { w: 420, h: 546, tegak: true, poros: 210, c1: 140, c2: 406, sisi: 194, jumlah: 388, dim: 14, bawahY: 522, bawahUk: 17 }
    : { w: 740, h: 430, tegak: false, poros: 210, c1: 196, c2: 544, sisi: 262, jumlah: 524, dim: 16, bawahY: 414, bawahUk: 17 }

  const sisiMaks = Math.max(a, b)
  const u = useSatuan(
    Math.min(L.sisi / Math.min(12, sisiMaks + SISA), L.jumlah / Math.min(24, a + b + SISA)),
    Math.min(L.sisi / sisiMaks, L.jumlah / (a + b)),
    dipegang,
  )

  // Susunan 1: a baris × b kolom. Susunan 2: kebalikannya.
  const w1 = b * u
  const h1 = a * u
  const w2 = a * u
  const h2 = b * u
  const g1 = L.tegak ? { x: L.poros, y: L.c1 } : { x: L.c1, y: L.poros }
  const g2 = L.tegak ? { x: L.poros, y: L.c2 } : { x: L.c2, y: L.poros }
  const x1 = g1.x - w1 / 2
  const y1 = g1.y - h1 / 2
  const x2 = g2.x - w2 / 2
  const y2 = g2.y - h2 / 2

  const nyalaA = sorot === 'a'
  const nyalaB = sorot === 'b'
  const semua = sorot === 'hasil'
  const opA = nyalaA ? 1 : 0.85
  const opB = nyalaB ? 1 : 0.85
  const ab = a * b

  const muatSisi = Math.floor(L.sisi / u + 1e-6)
  const muatJumlah = Math.floor(L.jumlah / u + 1e-6)

  return (
    <Svg w={L.w} h={L.h} maxH={L.tegak ? 520 : 440} label="Dua susunan kotak yang saling merupakan kebalikan">
      {/* susunan pertama: a baris berisi b */}
      <Kisi
        a={a}
        b={b}
        u={u}
        x={x1}
        y={y1}
        warna="var(--m-a)"
        nyalaBaris={nyalaB ? 0 : -1}
        nyalaKolom={nyalaA ? 0 : -1}
        semua={semua}
      />
      <Dimensi
        x1={x1}
        y1={y1 - L.dim}
        x2={x1 + w1}
        y2={y1 - L.dim}
        label={dipegang ? undefined : fmt(b)}
        warna="var(--m-b)"
        opacity={opB}
      />
      <Dimensi
        x1={x1 - L.dim}
        y1={y1}
        x2={x1 - L.dim}
        y2={y1 + h1}
        label={dipegang ? undefined : fmt(a)}
        warna="var(--m-a)"
        opacity={opA}
      />

      {/* Susunan kedua: b baris berisi a. Angkanya tetap tampil walau pojok
          sedang dipegang — susunan inilah yang memperlihatkan bahwa angka yang
          sama terbaca terbalik. */}
      <Kisi
        a={b}
        b={a}
        u={u}
        x={x2}
        y={y2}
        warna="var(--m-b)"
        nyalaBaris={nyalaA ? 0 : -1}
        nyalaKolom={nyalaB ? 0 : -1}
        semua={semua}
      />
      <Dimensi
        x1={x2}
        y1={y2 - L.dim}
        x2={x2 + w2}
        y2={y2 - L.dim}
        label={fmt(a)}
        warna="var(--m-a)"
        opacity={opA}
      />
      {L.tegak ? (
        <Dimensi
          x1={x2 - L.dim}
          y1={y2}
          x2={x2 - L.dim}
          y2={y2 + h2}
          label={fmt(b)}
          warna="var(--m-b)"
          opacity={opB}
        />
      ) : (
        <>
          {/* Di tata letak lebar, ukuran susunan kedua ditaruh di sisi luarnya
              supaya celah di tengah tetap lapang untuk tanda sama dengan. */}
          <Dimensi
            x1={x2 + w2 + L.dim}
            y1={y2}
            x2={x2 + w2 + L.dim}
            y2={y2 + h2}
            warna="var(--m-b)"
            opacity={opB}
          />
          <Tag x={x2 + w2 + L.dim + 10} y={g2.y} anchor="start" size={13} warna="var(--m-b)" opacity={opB}>
            {fmt(b)}
          </Tag>
        </>
      )}

      {/* hasil tiap susunan, menempel di atas bangunnya (hanya di tata letak lebar) */}
      {!L.tegak && (
        <>
          <Tag x={g1.x} y={y1 - 56} warna="var(--m-a)" size={17}>
            {`${fmt(a)} × ${fmt(b)} = ${fmt(ab)}`}
          </Tag>
          <Tag x={g2.x} y={y2 - 56} warna="var(--m-b)" size={17}>
            {`${fmt(b)} × ${fmt(a)} = ${fmt(ab)}`}
          </Tag>
          {/* tanda sama dengan menepi selama pojok dipegang, supaya tidak
              bertabrakan dengan angka yang muncul di dekat jari */}
          {!dipegang && (
            <Tag x={(L.c1 + L.c2) / 2} y={L.poros} warna="var(--ink-3)" size={24} latar={null}>
              =
            </Tag>
          )}
        </>
      )}

      <Tag x={L.tegak ? L.poros : L.w / 2} y={L.bawahY} warna="var(--m-ab)" size={L.bawahUk}>
        {L.tegak
          ? `${fmt(a)} × ${fmt(b)} = ${fmt(b)} × ${fmt(a)} = ${fmt(ab)}`
          : `luas persegi panjang = ${fmt(ab)} kotak satuan`}
      </Tag>

      {/* Pojok kanan bawah susunan pertama: baris dan kolom sekaligus.
          Susunan kedua mengikuti sendiri, karena ia susunan yang sama. */}
      <Pegangan
        x={g1.x + w1 / 2}
        y={g1.y + h1 / 2}
        param={['b', 'a']}
        arah="bebas"
        utama
        warna="var(--m-ab)"
        label={`${fmt(a)} × ${fmt(b)} = ${fmt(ab)}`}
        ajakan="Tarik pojok"
        keNilai={(pt) => ({
          b: Math.min(((pt.x - g1.x) * 2) / u, muatSisi, muatJumlah - a),
          a: Math.min(((pt.y - g1.y) * 2) / u, muatSisi, muatJumlah - b),
        })}
      />
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'perkalian-luas',
  topicId: 'sd3-konsep-perkalian-sebagai-penjumlahan-berulang',
  judul: 'Perkalian sebagai luas',
  pertanyaan: 'Kenapa 4 × 6 sama dengan 6 × 4?',
  tagline: 'Perkalian punya bentuk. Begitu kamu melihatnya, banyak hal jadi masuk akal.',
  kelas: 3,
  domain: 'bilangan',
  tags: ['perkalian', 'komutatif', 'luas', 'susunan'],

  tebak: {
    pertanyaan:
      'Ada 4 baris kursi, tiap baris berisi 6 kursi. Kalau susunannya diputar sehingga menjadi 6 baris berisi 4, jumlah kursinya...',
    pilihan: [
      {
        id: 'a',
        label: 'Bertambah',
        balasan:
          'Kalau memutar bisa menambah kursi, kita tidak perlu membeli kursi lagi selamanya. Sayangnya tidak begitu.',
      },
      {
        id: 'b',
        label: 'Berkurang',
        balasan: 'Memutar juga tidak membuang apa pun — semua kursi masih ada, hanya posisinya yang ikut berputar.',
      },
      {
        id: 'c',
        label: 'Tetap sama',
        benar: true,
        balasan:
          'Betul. Dan inilah seluruh alasan kenapa 4 × 6 = 6 × 4. Bukan hafalan, melainkan akibat dari memutar bangun yang sama.',
      },
    ],
    penutup: 'Sifat ini punya nama: komutatif. Tapi namanya jauh kurang penting daripada gambarnya.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: PARAM_BONGKAR,
    roles: { a: 'a', b: 'b', hasil: 'ab' },
    arti: {
      a: 'Banyaknya baris pada susunan awal — setelah diputar, menjadi isi tiap baris.',
      b: 'Banyaknya kotak di setiap baris pada susunan awal — setelah diputar, menjadi banyaknya baris.',
      hasil: 'Seluruh kotak — sekaligus luas persegi panjangnya.',
    },
    steps: [
      {
        id: 's0',
        judul: (p) => (ukuran(p).a === 1 ? 'Hitung isi barisnya' : 'Hitung baris demi baris'),
        narasi: (p) => {
          const { a, b } = ukuran(p)
          return a === 1
            ? `Hanya ada satu baris, jadi isinya cukup dihitung sekali: ${fmt(b)}. Perkalian adalah penjumlahan yang diulang — di sini ${fmt(b)} hanya diambil satu kali, sehingga 1 × ${fmt(b)} = ${fmt(b)}.`
            : `Jumlahkan isi baris pertama, lalu baris berikutnya, sampai baris ke-${fmt(a)}: ${fmt(b)} dijumlahkan sebanyak ${fmt(a)} kali, hasilnya ${fmt(a * b)}. Itulah arti pertama perkalian — penjumlahan yang diulang.`
        },
        rumus: '[a:banyak baris] × [b:isi tiap baris] = [hasil:banyak kotak]',
        durasi: 2400,
      },
      {
        id: 's1',
        judul: (p) => {
          const { a, b } = ukuran(p)
          return a === 1 && b === 1 ? 'Ubah titiknya menjadi kotak' : 'Rapatkan menjadi satu bangun'
        },
        narasi: (p) => {
          const { a, b } = ukuran(p)
          if (a === 1 && b === 1)
            return 'Titik tadi berubah menjadi sebuah kotak. Bentuknya persegi — persegi panjang yang semua sisinya sama panjang.'
          return a === b
            ? `Titik-titik tadi dirapatkan menjadi kotak-kotak yang bersentuhan. Karena banyak baris dan isi tiap baris sama-sama ${fmt(a)}, susunan itu berbentuk persegi — persegi panjang yang semua sisinya sama panjang.`
            : 'Titik-titik tadi dirapatkan menjadi kotak-kotak yang bersentuhan. Sekarang susunan itu berbentuk persegi panjang.'
        },
        durasi: 1800,
      },
      {
        id: 's2',
        judul: 'Putar seperempat putaran',
        narasi:
          'Bangunnya diputar. Perhatikan baik-baik: tidak ada kotak yang ditambahkan, dan tidak ada yang dibuang.',
        durasi: 2400,
      },
      {
        id: 's3',
        judul: (p) => {
          const { a, b } = ukuran(p)
          return a === b ? 'Terbacanya tetap sama' : 'Sekarang terbacanya berbeda'
        },
        narasi: (p) => {
          const { a, b } = ukuran(p)
          return a === b
            ? `Karena banyak baris dan isi tiap baris sama-sama ${fmt(a)}, setelah diputar susunan itu tetap terbaca ${fmt(a)} baris berisi ${fmt(a)}. Persegi memang tampak sama persis setelah diputar seperempat putaran.`
            : `Susunan yang sama kini terbaca terbalik: ${fmt(b)} baris, tiap baris berisi ${fmt(a)} — isi tiap baris yang lama menjadi banyak baris, dan banyak baris yang lama menjadi isi tiap baris. Cara membacanya berubah, bangunnya tidak.`
        },
        rumus: '[b:banyak baris baru] × [a:isi tiap baris baru] = [hasil:banyak kotak]',
        durasi: 2200,
      },
      {
        id: 's4',
        judul: 'Jumlah kotaknya tidak berubah',
        narasi: (p) => {
          const { a, b } = ukuran(p)
          return a === b
            ? `Mau kamu hitung lewat baris atau lewat kolom, yang kamu hitung tetap kotak yang sama: ${fmt(a * b)} kotak. Karena bangunnya persegi, kedua cara itu bahkan terbaca serupa, ${fmt(a)} × ${fmt(a)}.`
            : `Kamu menghitung kotak yang sama persis, hanya dari arah yang berbeda: ${fmt(a)} × ${fmt(b)} dan ${fmt(b)} × ${fmt(a)}. Jadi keduanya wajib berhenti di angka yang sama, ${fmt(a * b)} kotak.`
        },
        durasi: 1800,
      },
      {
        id: 's5',
        judul: 'Itulah sifat komutatif',
        narasi: (p) => {
          const { a, b } = ukuran(p)
          return a === b
            ? `Urutan mengalikan boleh kamu tukar; di sini kedua urutannya kebetulan sama, ${fmt(a)} × ${fmt(a)} = ${fmt(a * a)}. Ini sekaligus benih rumus-rumus luas: hasil kali dua panjang sisi adalah luas persegi panjang yang sisi-sisinya sepanjang itu.`
            : `${fmt(a)} × ${fmt(b)} dan ${fmt(b)} × ${fmt(a)} sama-sama ${fmt(a * b)}, jadi urutan mengalikan boleh kamu tukar. Ini sekaligus benih rumus-rumus luas: hasil kali dua panjang sisi adalah luas persegi panjang yang sisi-sisinya sepanjang itu.`
        },
        rumus: '[a:a] × [b:b] = [b:b] × [a:a]',
        durasi: 2200,
      },
    ],
  },

  eksperimen: {
    judul: 'Ubah baris dan kolomnya',
    ajakan:
      'Tarik pojok kanan bawah susunan pertama: ke kanan menambah kolom, ke bawah menambah baris. Susunan satunya ikut berubah sendiri — jumlah kotaknya selalu sama.',
    params: PARAM_EKSPERIMEN,
    Visual: VisualEksperimen,
    rumus: (p) => {
      const a = clamp(Math.round(p.a ?? 4), 1, 12)
      const b = clamp(Math.round(p.b ?? 6), 1, 12)
      return `[a:${fmt(a)}] × [b:${fmt(b)}] = [b:${fmt(b)}] × [a:${fmt(a)}] = [hasil:${fmt(a * b)}]`
    },
    temuan: (p) => {
      const a = clamp(Math.round(p.a ?? 4), 1, 12)
      const b = clamp(Math.round(p.b ?? 6), 1, 12)
      return (
        <p>
          <strong>
            {fmt(a)} × {fmt(b)} = {fmt(a * b)}
          </strong>{' '}
          kotak, dan susunan kebalikannya juga {fmt(a * b)} kotak.{' '}
          {a === b
            ? `Karena baris dan kolomnya sama, bangunnya berupa persegi — dan ${fmt(a)} × ${fmt(a)} = ${fmt(a * a)} disebut "${fmt(a)} kuadrat".`
            : `Tarik pojoknya sampai baris dan kolomnya sama besar. Bangunnya akan berubah menjadi persegi.`}{' '}
          Perhatikan juga: menggandakan salah satu sisi menggandakan jumlah kotaknya, tetapi
          menggandakan keduanya sekaligus membuatnya empat kali lipat.
        </p>
      )
    },
  },

  penjelasan: {
    SD: (
      <>
        <p>
          Kalau kamu menyusun kotak menjadi persegi panjang, ada dua cara menghitungnya: per baris
          atau per kolom. Keduanya menghitung <strong>kotak yang sama</strong>, jadi hasilnya pasti
          sama.
        </p>
        <p>
          Itulah kenapa 4 × 6 dan 6 × 4 sama-sama 24. Bukan karena ada aturan yang harus dihafal,
          melainkan karena keduanya menggambarkan susunan yang sama, hanya dilihat dari arah berbeda.
        </p>
        <p>
          Gagasan ini akan terus kamu pakai: perkalian bisa dibayangkan sebagai{' '}
          <strong>luas</strong> persegi panjang. Untuk bilangan cacah, luas itu tepat sama dengan
          banyaknya kotak satuan yang menutupinya.
        </p>
      </>
    ),
    SMP: (
      <>
        <p>
          Model susunan (array) menjelaskan komutatif dengan satu kalimat: memutar bangun 90° adalah
          transformasi yang mempertahankan banyaknya unsur, sehingga menghitung baris-kali-kolom dan
          kolom-kali-baris harus memberi hasil sama.
        </p>
        <h4>Kenapa "penjumlahan berulang" tidak cukup</h4>
        <p>
          Arti "6 + 6 + 6 + 6" bekerja rapi selama pengalinya bilangan cacah, tetapi runtuh begitu
          pengalinya pecahan: apa artinya menjumlahkan sesuatu sebanyak ½ kali? Model{' '}
          <strong>luas</strong> tetap bertahan — ½ × ¾ adalah luas persegi panjang berukuran ½ dan
          ¾. Karena itu, model luas terus dipakai sampai ke aljabar dan integral.
        </p>
        <p>
          Model luas pun punya batas: panjang sisi tidak bisa negatif. Untuk perkalian bilangan
          negatif, misalnya (−2) × 3, gambar persegi panjang saja tidak cukup; kita memerlukan
          aturan tambahan (misalnya sifat distributif) atau gagasan luas yang bertanda.
        </p>
        <p>
          Model yang sama juga menjelaskan sifat distributif: a × (b + c) berarti memperlebar persegi
          panjang, sehingga luasnya terpecah menjadi a×b ditambah a×c.
        </p>
      </>
    ),
  },

  rumus: {
    src: '[a:a] × [b:b] = [b:b] × [a:a] = [hasil:luas persegi panjang]',
    roles: { a: 'a', b: 'b', hasil: 'ab' },
    arti: {
      a: 'Ukuran sisi pertama — banyaknya baris.',
      b: 'Ukuran sisi kedua — banyaknya kotak per baris.',
      hasil: 'Seluruh kotak yang menutupi persegi panjang itu.',
    },
  },

  soal: [
    (rnd) => {
      const a = 3 + Math.floor(rnd() * 7)
      const b = 3 + Math.floor(rnd() * 7)
      return {
        id: 'kali-1',
        tipe: 'angka',
        topicId: 'sd3-konsep-perkalian-sebagai-penjumlahan-berulang',
        kelas: 3,
        tingkat: 'mudah',
        konsep: 'perkalian-luas',
        pertanyaan: `Sebuah papan disusun dari kotak-kotak: ${a} baris, tiap baris berisi ${b} kotak. Berapa banyak kotak seluruhnya?`,
        jawaban: a * b,
        satuan: 'kotak',
        toleransi: 1e-9,
        hint: [
          'Kamu bisa menjumlahkan baris demi baris, atau langsung mengalikan.',
          `Menjumlahkan: ${b} sebanyak ${a} kali.`,
          `Mengalikan lebih cepat: ${a} × ${b}.`,
        ],
        pembahasan: `${a} × ${b} = ${a * b} kotak. Kalau papan itu diputar menjadi ${b} baris berisi ${a}, jumlahnya tetap ${a * b}.`,
      }
    },
    {
      id: 'kali-2',
      tipe: 'benar-salah',
      topicId: 'sd3-konsep-perkalian-sebagai-penjumlahan-berulang',
      kelas: 3,
      tingkat: 'mudah',
      konsep: 'perkalian-luas',
      pertanyaan: 'Susunan 3 baris berisi 8 kotak memiliki jumlah kotak yang sama dengan 8 baris berisi 3 kotak.',
      jawaban: true,
      diagnosa:
        'Coba bayangkan memutar papannya seperempat putaran. Hanya arahnya yang berubah — bangunnya tetap sama dan tidak ada kotak yang hilang.',
      hint: [
        'Apa yang berubah saat susunan diputar: jumlah kotaknya, atau hanya cara membacanya?',
        'Hitung keduanya: 3 × 8 dan 8 × 3.',
      ],
      pembahasan: 'Benar. 3 × 8 = 8 × 3 = 24. Keduanya menggambarkan persegi panjang yang sama.',
    },
    {
      id: 'kali-3',
      tipe: 'pilihan',
      topicId: 'sd3-konsep-perkalian-sebagai-penjumlahan-berulang',
      kelas: 4,
      tingkat: 'sedang',
      konsep: 'perkalian-luas',
      pertanyaan:
        'Sebuah lantai berbentuk persegi panjang berukuran 7 ubin × 5 ubin. Kalau sisi panjangnya digandakan menjadi 14 ubin, berapa ubin yang dibutuhkan?',
      pilihan: [
        { id: 'a', label: '70 ubin', benar: true },
        { id: 'b', label: '38 ubin', diagnosa: 'Ini keliling lantainya: (14 + 5) × 2. Ukurannya dijumlahkan, padahal banyak ubin didapat dengan mengalikan.' },
        { id: 'c', label: '140 ubin', diagnosa: 'Kedua sisinya ikut digandakan. Padahal yang digandakan hanya satu sisi.' },
        { id: 'd', label: '35 ubin', diagnosa: 'Ini jumlah ubin sebelum digandakan.' },
      ],
      hint: [
        'Hitung dulu jumlah ubin semula: 7 × 5.',
        'Kalau satu sisi digandakan, luasnya juga menjadi dua kali lipat.',
        '14 × 5, atau cukup 35 × 2.',
      ],
      pembahasan:
        '14 × 5 = 70 ubin. Menggandakan satu sisi menggandakan luas; menggandakan dua sisi sekaligus akan membuatnya empat kali lipat, yaitu 140.',
    },
    {
      id: 'kali-4',
      tipe: 'cocokkan',
      topicId: 'sd3-konsep-perkalian-sebagai-penjumlahan-berulang',
      kelas: 4,
      tingkat: 'sedang',
      konsep: 'perkalian-luas',
      pertanyaan: 'Pasangkan tiap susunan dengan jumlah kotaknya.',
      pasangan: [
        { kiri: '6 baris × 7 kotak', kanan: '42' },
        { kiri: '9 baris × 4 kotak', kanan: '36' },
        { kiri: '8 baris × 8 kotak', kanan: '64' },
        { kiri: '5 baris × 12 kotak', kanan: '60' },
      ],
      hint: [
        'Kerjakan yang paling kamu hafal lebih dulu, sisanya jadi lebih mudah.',
        'Susunan 8 × 8 berbentuk persegi.',
        'Untuk 5 × 12, kamu bisa memecahnya menjadi 5 × 10 ditambah 5 × 2.',
      ],
      pembahasan:
        '6 × 7 = 42, 9 × 4 = 36, 8 × 8 = 64, 5 × 12 = 60. Memecah 5 × 12 menjadi 5 × 10 + 5 × 2 adalah sifat distributif — pada gambar, itu berarti memotong persegi panjangnya menjadi dua bagian.',
    },
    (rnd) => {
      const s = 3 + Math.floor(rnd() * 8)
      return {
        id: 'kali-5',
        tipe: 'angka',
        topicId: 'sd3-konsep-perkalian-sebagai-penjumlahan-berulang',
        kelas: 4,
        tingkat: 'sulit',
        konsep: 'perkalian-luas',
        pertanyaan: `Sebuah susunan kotak berbentuk persegi berisi ${s * s} kotak. Berapa banyak baris yang dimilikinya?`,
        jawaban: s,
        satuan: 'baris',
        toleransi: 1e-9,
        hint: [
          'Persegi berarti banyaknya baris sama dengan banyaknya kotak per baris.',
          `Cari bilangan yang bila dikalikan dengan dirinya sendiri menghasilkan ${s * s}.`,
          `Coba mulai dari ${Math.max(2, s - 2)} × ${Math.max(2, s - 2)} lalu naik satu per satu.`,
        ],
        pembahasan: `Karena ${s} × ${s} = ${s * s}, susunan itu memiliki ${s} baris. Bilangan seperti ${s * s} disebut bilangan kuadrat karena bisa disusun menjadi persegi sempurna.`,
      }
    },
  ],

  lanjut: ['segitiga-setengah', 'nilai-tempat', 'kuadrat-jumlah'],
}

export default konsep
