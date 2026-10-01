/* ============================================================
   KONSEP — Kenapa boleh mengurangi kedua ruas persamaan?
   Kelas 7 · Aljabar

   Gagasan: tanda "=" bukan perintah "kerjakan", melainkan
   pernyataan bahwa dua sisi sama berat. Timbangan memperlihatkan
   akibatnya secara langsung — begitu satu sisi saja dikurangi,
   timbangannya miring dan pernyataan itu jadi tidak benar lagi.

   Interaksi langsung: anak memegang benda di piring timbangan.
   - Titik di ujung deretan kotak menambah/mengurangi kotak (a).
   - Titik di atas tumpukan bola adalah "tempat bola berikutnya":
     seret ke petak mana pun, tumpukannya terisi sampai di situ.
     Petak disusun berkelok (baris ganjil dari kanan) supaya
     menyeret terus ke atas tidak pernah melompat ke tepi seberang.
   - Di bongkar, bola kiri (b) menempel pada persamaan ax + b = c,
     jadi mengubahnya selalu mengubah KEDUA sisi dan timbangan
     tetap datar. Isi kotak (x) dipegang dari tumpukan kanan, yang
     tumbuh a bola sekaligus — satu untuk setiap kotak.
   - Di eksperimen, a, b, dan c dipegang sendiri-sendiri; isi kotak x
     menyesuaikan, dan timbangan baru miring bila c < b. Tombol
     "−1 bola" dan "+1 bola" di bawah timbangan mengubah KEDUA sisi
     sekaligus, sehingga x tidak berubah.
   ============================================================ */

import { useState, type ReactNode } from 'react'
import { Pegangan, useInteraksi, type Titik } from '../components/Interaksi'
import { Svg, Tag, useSempit, useUkuranLayar } from '../components/Stage'
import { fase, seg, useTween } from '../lib/anim'
import { clamp, fmt, lerp, pecahanTeks } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

/* ---------------- Ukuran benda ---------------- */

const R_BOLA = 11
/** jarak pusat ke pusat dua bola bertetangga. */
const JARAK_BOLA = 24
const KOTAK = 34
const JARAK_KOTAK = 40
/** celah antara atap kotak dan baris bola pertama di piring kiri. Cukup
    lebar supaya pegangan a (di kaki kotak) dan pegangan b (di baris bola
    pertama) tetap ≥ 71 terpisah — lebih dari 48 px layar, di HP selebar 320 px pun. */
const CELAH_KIRI = 20
const PER_BARIS_KIRI = 4
const PER_BARIS_KANAN = 5
/** celah antara kolom kelompok dan bola sisa di piring kanan (bongkar). */
const CELAH_SISA = 6
const TEBAL_PIRING = 9
const MIRING_MAKS = 11
/** jarak pusat label jumlah benda di bawah permukaan piring. */
const LABEL_TURUN = 33

/**
 * Ajakan di bawah pegangan utama. Lebih pendek dari bawaan "Coba geser aku":
 * pegangan utama bisa berada di kolom paling kanan tumpukan kanan, dan di HP
 * ajakan bawaan (±150 satuan) akan keluar dari tepi gambar.
 */
const AJAKAN = 'Seret aku'

/** Seberapa "hidup" sebuah benda digambar: 1 penuh, 0 hilang. */
const hidup = (i: number, jumlah: number) => clamp(jumlah - i, 0, 1)

/* ---------------- Tata letak ---------------- */

interface Letak {
  w: number
  h: number
  cx: number
  /** jarak mendatar pusat piring ke poros. */
  lengan: number
  lebarPiring: number
  /** tinggi permukaan piring saat timbangan datar. */
  piringY: number
  /** jarak permukaan piring ke palang di bawahnya. */
  tiang: number
  alasY: number
}

/*  Anggaran tinggi. Label seret sebuah pegangan puncaknya ±43 px layar di atas
    titiknya, yaitu ±56 satuan pada skala terkecil (0,77: panggung lebar
    tersempit 560 px, atau HP 360 px).
    - Bongkar: pegangan tertinggi di petak ke-30 atau puncak kolom x = 6,
      155 di atas piring kanan. Piring kanan di bongkar tidak pernah terangkat
      (di langkah 1 justru turun), jadi puncak labelnya ≥ 43 di lebar dan ≥ 51
      di HP — tetap di bawah keterangan atas (atasY).
    - Eksperimen: pegangan c = 20 ada 107 di atas piring. Saat diseret,
      kemiringan ditahan; kalau seretnya dimulai ketika c < b, piring kanan
      terangkat lengan × sin 11° (38 di lebar, 20 di HP). Karena itu piring
      eksperimen lebar diturunkan sampai puncak label tetap ≥ 0. */

const BONGKAR_LEBAR = { w: 680, h: 466, cx: 340, lengan: 200, lebarPiring: 190, piringY: 254, tiang: 62, alasY: 402, atasY: 28, catatanY: 440 }
const BONGKAR_HP = { w: 420, h: 492, cx: 210, lengan: 104, lebarPiring: 180, piringY: 262, tiang: 62, alasY: 404, atasY: 28, catatanY: 446 }

const EKSPERIMEN_LEBAR = { w: 680, h: 502, cx: 340, lengan: 200, lebarPiring: 190, piringY: 202, tiang: 62, alasY: 342, ajakY: 378, tombolY: 414, catatanY: 460 }
const EKSPERIMEN_HP = { w: 420, h: 520, cx: 210, lengan: 104, lebarPiring: 180, piringY: 194, tiang: 62, alasY: 334, ajakY: 370, tombolY: 412, catatanY: 466 }

/** Pusat piring kiri dan kanan untuk kemiringan tertentu (derajat). */
function piring(L: Letak, miring: number) {
  // Piring hanya naik-turun; letak mendatarnya tetap, jadi pegangan yang
  // hanya membaca arah x tidak pernah ikut bergeser karena kemiringan.
  const dy = Math.sin((miring * Math.PI) / 180) * L.lengan
  return {
    kiri: { x: L.cx - L.lengan, y: L.piringY - dy },
    kanan: { x: L.cx + L.lengan, y: L.piringY + dy },
  }
}

/**
 * Kemiringan timbangan. Selama sebuah titik dipegang, kemiringannya ditahan:
 * benda yang sedang dipegang belum "diletakkan", dan titik yang menempel di
 * piring tidak ikut naik-turun di bawah jari (tanpa ini tumpukan yang makin
 * berat menurunkan piring, jari jadi relatif lebih tinggi, dan nilainya
 * terus bertambah sendiri). Begitu dilepas, timbangan berayun ke posisinya.
 */
function useMiring(beda: number, tahan: boolean) {
  const target = clamp(beda * 2.4, -MIRING_MAKS, MIRING_MAKS)
  const [beku, setBeku] = useState<number | null>(null)
  if (tahan && beku === null) setBeku(target)
  if (!tahan && beku !== null) setBeku(null)
  return useTween(tahan && beku !== null ? beku : target, { durasi: 320 })
}

/* ---------------- Susunan benda ---------------- */

/**
 * Letak petak ke-i pada tumpukan, relatif terhadap pusat baris pertama.
 * Baris genap diisi dari kiri, baris ganjil dari kanan (berkelok), sehingga
 * petak berikutnya selalu bersebelahan dengan petak sebelumnya.
 */
function petak(i: number, per: number) {
  const baris = Math.floor(i / per)
  const k = i % per
  const kolom = baris % 2 === 0 ? k : per - 1 - k
  return { dx: (kolom - (per - 1) / 2) * JARAK_BOLA, dy: -baris * JARAK_BOLA }
}

/** Kebalikan petak(): nomor petak terdekat dari titik (dx, dy). */
function petakDari(dx: number, dy: number, per: number, barisMaks: number) {
  const baris = clamp(Math.round(-dy / JARAK_BOLA), 0, barisMaks)
  const kolom = clamp(Math.round(dx / JARAK_BOLA + (per - 1) / 2), 0, per - 1)
  return baris * per + (baris % 2 === 0 ? kolom : per - 1 - kolom)
}

/** Pusat baris bola pertama di piring kiri (di atas deretan kotak) dan kanan. */
const dasarKiri = (P: Titik) => P.y - KOTAK - CELAH_KIRI - R_BOLA
const dasarKanan = (P: Titik) => P.y - R_BOLA

/** Pusat mendatar kotak ke-i dari a kotak yang dideretkan di tengah piring. */
const pusatKotak = (P: Titik, i: number, a: number) => P.x + (i - (a - 1) / 2) * JARAK_KOTAK

/** Titik pegangan a: tepat di ujung kanan deretan kotak, di tepi bawah piring
    (71 di bawah baris bola kiri pertama, tempat pegangan b). */
const titikA = (P: Titik, a: number) => ({ x: P.x + (a * JARAK_KOTAK) / 2, y: P.y + 6 })
/** Kebalikan titikA(). */
const aDari = (P: Titik, pt: Titik) => (2 * (pt.x - P.x)) / JARAK_KOTAK

/* ---------------- Gambar timbangan ---------------- */

function Timbangan({ L, miring, children }: { L: Letak; miring: number; children?: ReactNode }) {
  const { kiri, kanan } = piring(L, miring)
  const palangY = L.piringY + L.tiang
  return (
    <g>
      {/* tiang poros dan alas */}
      <path
        d={`M ${L.cx - 40} ${L.alasY} L ${L.cx + 40} ${L.alasY} L ${L.cx + 10} ${palangY} L ${L.cx - 10} ${palangY} Z`}
        fill="var(--surface-3)"
        stroke="var(--ink-3)"
        strokeWidth={1.5}
      />
      <rect x={L.cx - 60} y={L.alasY} width={120} height={12} rx={6} fill="var(--ink-3)" />

      {/* palang, tiang piring, dan piring */}
      {[kiri, kanan].map((P, i) => (
        <line
          key={`t${i}`}
          x1={P.x}
          y1={P.y + L.tiang}
          x2={P.x}
          y2={P.y + TEBAL_PIRING}
          stroke="var(--ink-2)"
          strokeWidth={4}
        />
      ))}
      <line
        x1={kiri.x}
        y1={kiri.y + L.tiang}
        x2={kanan.x}
        y2={kanan.y + L.tiang}
        stroke="var(--ink)"
        strokeWidth={7}
        strokeLinecap="round"
      />
      <circle cx={L.cx} cy={palangY} r={8} fill="var(--ink)" />
      {[kiri, kanan].map((P, i) => (
        <rect
          key={`p${i}`}
          x={P.x - L.lebarPiring / 2}
          y={P.y}
          width={L.lebarPiring}
          height={TEBAL_PIRING}
          rx={TEBAL_PIRING / 2}
          fill="var(--ink-2)"
        />
      ))}
      {children}
    </g>
  )
}

/** Kotak berlabel x; (x, y) adalah titik tengah alasnya. */
function KotakX({
  x,
  y,
  o,
  nyala,
  teks,
}: {
  x: number
  y: number
  o: number
  nyala: boolean
  teks: string
}) {
  // Ukuran huruf dihitung DI SINI, bukan di VisualBongkar/VisualEksperimen:
  // SkalaCtx baru dipasang oleh <Svg>, jadi useUkuranLayar() yang dipanggil di
  // luar <Svg> selalu jatuh ke nilai cadangan. Akibatnya huruf x terkunci di 16
  // satuan dan menyusut sampai 10,9 px di layar 320 px — di bawah batas 11 px.
  const u = useUkuranLayar()
  if (o <= 0.01) return null
  const huruf = Math.max(16, u(12, 16))
  return (
    <g opacity={o}>
      <rect
        x={x - KOTAK / 2}
        y={y - KOTAK}
        width={KOTAK}
        height={KOTAK}
        rx={6}
        fill="var(--m-a)"
        fillOpacity={nyala ? 0.55 : 0.32}
        stroke="var(--m-a)"
        strokeWidth={nyala ? 3 : 2}
      />
      <text
        x={x}
        y={y - KOTAK / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={huruf}
        fontWeight={800}
        fill="var(--m-a)"
      >
        {teks}
      </text>
    </g>
  )
}

/** Bola satuan; (x, y) adalah pusatnya. */
function Bola({ x, y, o, warna }: { x: number; y: number; o: number; warna: string }) {
  if (o <= 0.01) return null
  return (
    <circle cx={x} cy={y} r={R_BOLA} fill={warna} fillOpacity={0.75} stroke={warna} strokeWidth={1.6} opacity={o} />
  )
}

/** Bekas bola yang baru diambil: lingkaran putus-putus di tempatnya semula. */
function BekasBola({ x, y, o }: { x: number; y: number; o: number }) {
  if (o <= 0.01) return null
  return (
    <circle
      cx={x}
      cy={y}
      r={R_BOLA - 1}
      fill="none"
      stroke="var(--ink-3)"
      strokeWidth={1.5}
      strokeDasharray="3 3"
      opacity={o * 0.8}
    />
  )
}

/** Teks jumlah benda di satu sisi, mis. "2 kotak + 3 bola". */
function teksSisi(kotak: number, bola: number) {
  if (kotak <= 0) return `${fmt(bola)} bola`
  return bola > 0 ? `${fmt(kotak)} kotak + ${fmt(bola)} bola` : `${fmt(kotak)} kotak`
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

/**
 * Angka yang dipakai gambar bongkar. Narasi dan judul langkah WAJIB memakai
 * fungsi ini juga, supaya teks tidak pernah menyebut angka yang berbeda dengan
 * yang benar-benar terlihat di timbangan.
 */
function nilaiBongkar(p: Record<string, number>) {
  const a = Math.max(1, Math.round(p.a ?? 2))
  const b = Math.max(0, Math.round(p.b ?? 3))
  const x = Math.max(1, Math.round(p.x ?? 4))
  return {
    a,
    b,
    x,
    /** bola di kanan pada keadaan awal. */
    c: a * x + b,
    /** bola yang tersisa di kanan setelah b bola dibuang dari KEDUA sisi. */
    sisaKanan: a * x,
  }
}

/** Baris tertinggi tumpukan kanan di bongkar: c paling banyak 4 × 6 + 6 = 30. */
const BARIS_MAKS_KANAN_BONGKAR = Math.floor(30 / PER_BARIS_KANAN)

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const { a, b, x, c } = nilaiBongkar(p)
  const sempit = useSempit()
  const interaksi = useInteraksi()
  const aktif = interaksi?.kendali.aktif ?? null
  // Ajakan tampil di bawah pegangan utama (x) sampai anak pernah menyeret;
  // selama tumpukan kanan baru dua baris, ajakan itu menempati tempat label
  // jumlah bola kanan, jadi label itu disembunyikan dulu.
  const ajakanX = !!interaksi?.ajakan && aktif !== 'x'
  const L = sempit ? BONGKAR_HP : BONGKAR_LEBAR

  const buangSepihak = step === 1 ? seg(t, 0.15, 0.6) : 0
  const buangDua = step >= 2 ? (step === 2 ? seg(t, 0.15, 0.7) : 1) : 0
  const kelompok = fase(step, t, 3)
  const ambilSatu = step >= 4 ? (step === 4 ? seg(t, 0.25, 0.85) : 1) : 0
  const periksa = step >= 5

  // Banyaknya benda pada tiap sisi (boleh pecahan saat beranimasi).
  const nKotak = periksa ? a : a - (a - 1) * ambilSatu
  const nBolaKiri = periksa ? b : b * (1 - Math.max(buangSepihak, buangDua))
  const nBolaKanan = periksa
    ? c
    : (c - b * buangDua) - (a * x - x) * ambilSatu

  const beratKiri = nKotak * x + nBolaKiri
  const beratKanan = nBolaKanan

  const miring = useMiring(beratKanan - beratKiri, aktif !== null)
  const { kiri: PK, kanan: PN } = piring(L, miring)
  const yKiri = dasarKiri(PK)
  const yKanan = dasarKanan(PN)

  const nyalaX = sorot === 'x' || sorot === 'a'
  const nyalaB = sorot === 'b'
  const nyalaC = sorot === 'c'

  // Bekas bola yang diambil tampak selama langkah membuang, lalu memudar
  // saat bola kanan disusun menjadi kelompok.
  const bekas = step === 1 || step === 2 ? 1 : step === 3 ? 1 - kelompok : 0

  // Susunan kelompok di kanan: a kolom setinggi x (satu kolom = isi satu
  // kotak), lalu b bola sisa dalam kolom bertiga. Seluruhnya di tengah piring,
  // digeser 6 ke kanan: di HP, ajakan di bawah pegangan x (puncak kolom
  // pertama) jadi tidak menyentuh pegangan a di ujung deretan 4 kotak.
  const ax = a * x
  const geserKolom = -((a + 1) * JARAK_BOLA + CELAH_SISA) / 2 + 6
  const letakKanan = (i: number) => {
    const baris = petak(i, PER_BARIS_KANAN)
    const kolom =
      i < ax
        ? { dx: geserKolom + Math.floor(i / x) * JARAK_BOLA, dy: -(i % x) * JARAK_BOLA }
        : {
            dx: geserKolom + (a + Math.floor((i - ax) / 3)) * JARAK_BOLA + CELAH_SISA,
            dy: -((i - ax) % 3) * JARAK_BOLA,
          }
    return { x: PN.x + lerp(baris.dx, kolom.dx, kelompok), y: yKanan + lerp(baris.dy, kolom.dy, kelompok) }
  }

  const catatan =
    step === 1 && buangSepihak > 0.5
      ? sempit
        ? ['timbangan miring —', 'pernyataannya jadi tidak benar']
        : ['timbangan miring — pernyataannya jadi tidak benar']
      : Math.abs(beratKiri - beratKanan) < 0.01
        ? ['setimbang — kedua sisi masih bernilai sama']
        : null
  const warnaCatatan = step === 1 ? 'var(--m-hi)' : 'var(--m-ab)'

  // Pegangan hanya tampil bila bendanya ada di gambar.
  const tampakA = step !== 4
  const tampakB = step <= 2 || step >= 5
  const xDiBaris = step <= 2 || (step === 3 && kelompok < 0.5)
  const slotB = petak(b, PER_BARIS_KIRI)
  const slotC = petak(c, PER_BARIS_KANAN)
  const pA = titikA(PK, a)
  const pX = xDiBaris
    ? { x: PN.x + slotC.dx, y: yKanan + slotC.dy }
    : { x: PN.x + geserKolom, y: yKanan - x * JARAK_BOLA }
  // Pegangan x di baris pertama atau kedua: ajakannya jatuh di tempat label
  // jumlah bola kanan.
  const ajakanTutupLabel = ajakanX && pX.y > PN.y - 2 * JARAK_BOLA

  return (
    <Svg w={L.w} h={L.h} maxH={470} label="Timbangan dua lengan yang mewakili persamaan">
      <Timbangan L={L} miring={miring}>
        {/* piring kiri: kotak x, lalu bola lepas di atasnya */}
        {Array.from({ length: a }, (_, i) => (
          <KotakX
            key={`k${i}`}
            x={pusatKotak(PK, i, a)}
            y={PK.y}
            o={hidup(i, nKotak)}
            nyala={nyalaX}
            teks={periksa ? fmt(x) : 'x'}
          />
        ))}
        {Array.from({ length: b }, (_, i) => {
          const s = petak(i, PER_BARIS_KIRI)
          const o = hidup(i, nBolaKiri)
          return (
            <g key={`b${i}`}>
              <BekasBola x={PK.x + s.dx} y={yKiri + s.dy} o={(1 - o) * bekas} />
              <Bola x={PK.x + s.dx} y={yKiri + s.dy} o={o} warna={nyalaB ? 'var(--m-hi)' : 'var(--m-b)'} />
            </g>
          )
        })}

        {/* piring kanan */}
        {Array.from({ length: c }, (_, i) => {
          const s = petak(i, PER_BARIS_KANAN)
          const o = hidup(i, nBolaKanan)
          const q = letakKanan(i)
          return (
            <g key={`c${i}`}>
              {i >= ax && <BekasBola x={PN.x + s.dx} y={yKanan + s.dy} o={(1 - o) * bekas} />}
              <Bola x={q.x} y={q.y} o={o} warna={nyalaC ? 'var(--m-hi)' : 'var(--m-c)'} />
            </g>
          )
        })}

        {/* jumlah benda, menempel di bawah piringnya. Saat banyak kotak
            diseret, label inilah yang menyebut angkanya (lihat pegangan a). */}
        {aktif !== 'b' && (
          <Tag x={PK.x} y={PK.y + LABEL_TURUN} size={14} warna={aktif === 'a' ? 'var(--m-a)' : 'var(--ink-2)'}>
            {teksSisi(Math.round(nKotak), Math.round(nBolaKiri))}
          </Tag>
        )}
        {!ajakanTutupLabel && (
          <Tag x={PN.x} y={PN.y + LABEL_TURUN} size={14} warna="var(--ink-2)">
            {teksSisi(0, Math.round(nBolaKanan))}
          </Tag>
        )}
      </Timbangan>

      {/* keterangan langkah */}
      {kelompok > 0.2 && ambilSatu < 0.5 && (
        <Tag x={L.cx} y={L.atasY} warna="var(--m-ab)" size={sempit ? 15 : 16}>
          {a === 1
            ? sempit
              ? 'cuma satu kotak — tak ada yang dibagi'
              : 'cuma satu kotak — tidak ada yang perlu dibagi'
            : sempit
              ? `kedua sisi dibagi jadi ${fmt(a)} kelompok`
              : `kedua sisi dibagi menjadi ${fmt(a)} kelompok sama besar`}
        </Tag>
      )}
      {periksa && (
        <Tag x={L.cx} y={L.atasY} warna="var(--m-ab)" size={17}>
          {`periksa: ${fmt(a)} × ${fmt(x)} + ${fmt(b)} = ${fmt(c)}`}
        </Tag>
      )}
      {step === 4 && ambilSatu > 0.6 && aktif !== 'x' && (
        <Tag x={L.cx} y={L.atasY} warna="var(--m-a)" size={18}>
          {`x = ${fmt(x)}`}
        </Tag>
      )}
      {catatan?.map((baris, i) => (
        <Tag key={i} x={L.cx} y={L.catatanY + i * 26} warna={warnaCatatan} size={sempit ? 15 : 16}>
          {baris}
        </Tag>
      ))}

      {/* Pegangan. Banyak kotak dipegang di ujung deretannya; label seretnya
          sengaja tidak dipakai karena akan menutupi kotak yang sedang
          bertambah — angkanya dibaca dari label di bawah piring. Bola kiri
          di "tempat bola berikutnya" — karena c = ax + b, bola kanan ikut
          bertambah atau berkurang sama banyak. Isi kotak (utama) dipegang di
          tumpukan kanan: sebelum dikelompokkan lewat petak ke-c (tumbuh a
          bola sekaligus), sesudahnya lewat puncak kolom kelompok pertama. */}
      <Pegangan
        x={pA.x}
        y={pA.y}
        param="a"
        arah="x"
        sembunyi={!tampakA}
        keNilai={(pt) => aDari(PK, pt)}
      />
      <Pegangan
        x={PK.x + slotB.dx}
        y={yKiri + slotB.dy}
        param="b"
        arah="bebas"
        label={`b = ${fmt(b)}`}
        sembunyi={!tampakB}
        keNilai={(pt) => petakDari(pt.x - PK.x, pt.y - yKiri, PER_BARIS_KIRI, Math.floor(6 / PER_BARIS_KIRI))}
      />
      {xDiBaris ? (
        <Pegangan
          x={pX.x}
          y={pX.y}
          param="x"
          arah="bebas"
          utama
          ajakan={AJAKAN}
          label={`x = ${fmt(x)}`}
          keNilai={(pt) =>
            (petakDari(pt.x - PN.x, pt.y - yKanan, PER_BARIS_KANAN, BARIS_MAKS_KANAN_BONGKAR) - b) / a
          }
        />
      ) : (
        <Pegangan
          x={pX.x}
          y={pX.y}
          param="x"
          arah="y"
          utama
          ajakan={AJAKAN}
          label={`x = ${fmt(x)}`}
          keNilai={(pt) => (yKanan - pt.y) / JARAK_BOLA}
        />
      )}
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function nilaiEksperimen(p: Record<string, number>) {
  const a = Math.max(1, Math.round(p.a ?? 2))
  const b = Math.max(0, Math.round(p.b ?? 3))
  const c = Math.max(0, Math.round(p.c ?? 11))
  return { a, b, c, x: (c - b) / a }
}

const B_MAKS_EKSPERIMEN = 8
const C_MAKS_EKSPERIMEN = 20

/**
 * Tombol di dalam gambar yang mengubah bola di KEDUA sisi sekaligus —
 * tindakan yang menjadi inti konsep ini. Nilai x tidak berubah.
 */
function TombolKeduaSisi({ cx, y, tanda, label }: { cx: number; y: number; tanda: 1 | -1; label: string }) {
  const ctx = useInteraksi()
  const u = useUkuranLayar()
  if (!ctx) return null
  const { kendali } = ctx
  const b = kendali.nilai.b ?? 3
  const c = kendali.nilai.c ?? 11
  const bisa = tanda < 0 ? b > 0 && c > 0 : b < B_MAKS_EKSPERIMEN && c < C_MAKS_EKSPERIMEN
  const huruf = u(14, 15)
  const tinggi = u(40, 40)
  const lebar = Math.max(u(48, 48), label.length * huruf * 0.6 + u(28, 28))
  // Tombol menempatkan dirinya sendiri terhadap sumbu timbangan: setengah
  // lebarnya ditambah celah 18 px layar. Jaraknya WAJIB dihitung di dalam
  // <Svg>, karena lebar tombol ikut membesar di layar sempit — jarak tetap
  // dalam satuan SVG membuat kedua tombol bertumpuk di layar 320 px.
  const x = cx + tanda * (lebar / 2 + u(18, 18))
  const tekan = () => {
    if (!bisa) return
    kendali.atur({ b: b + tanda, c: c + tanda }, { halus: true })
    ctx.tandaiMenyeret()
  }
  return (
    <g
      className="tombol-gambar"
      data-param="b c"
      role="button"
      tabIndex={0}
      aria-disabled={!bisa || undefined}
      aria-label={tanda < 0 ? 'Ambil satu bola dari kedua sisi' : 'Tambah satu bola ke kedua sisi'}
      onClick={tekan}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          e.stopPropagation()
          tekan()
        }
      }}
      style={{ cursor: bisa ? 'pointer' : 'default' }}
      opacity={bisa ? 1 : 0.4}
    >
      <rect
        x={x - lebar / 2}
        y={y - Math.max(tinggi, u(48, 48)) / 2}
        width={lebar}
        height={Math.max(tinggi, u(48, 48))}
        fill="transparent"
      />
      <rect
        x={x - lebar / 2}
        y={y - tinggi / 2}
        width={lebar}
        height={tinggi}
        rx={tinggi / 2}
        fill="var(--surface)"
        stroke="var(--m-ab)"
        strokeWidth={u(2, 2)}
      />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={huruf}
        fontWeight={800}
        fill="var(--m-ab)"
        style={{ pointerEvents: 'none' }}
      >
        {label}
      </text>
    </g>
  )
}

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const { a, b, c, x } = nilaiEksperimen(p)
  const setimbang = x >= 0
  const sempit = useSempit()
  const interaksi = useInteraksi()
  const aktif = interaksi?.kendali.aktif ?? null
  // Ajakan di bawah pegangan utama (c); selama tumpukannya baru dua baris,
  // ajakan itu jatuh di tempat label jumlah bola kanan.
  const ajakanC = !!interaksi?.ajakan && aktif !== 'c'
  const L = sempit ? EKSPERIMEN_HP : EKSPERIMEN_LEBAR

  const miring = useMiring(c - (a * Math.max(0, x) + b), aktif !== null)
  const { kiri: PK, kanan: PN } = piring(L, miring)
  const yKiri = dasarKiri(PK)
  const yKanan = dasarKanan(PN)

  const nyalaX = sorot === 'x' || sorot === 'a'
  const nyalaB = sorot === 'b'
  const nyalaC = sorot === 'c'

  const slotB = petak(b, PER_BARIS_KIRI)
  const slotC = petak(c, PER_BARIS_KANAN)
  const pA = titikA(PK, a)

  const catatan = setimbang
    ? [`x = (${fmt(c)} − ${fmt(b)}) ÷ ${fmt(a)} = ${pecahanTeks(c - b, a)}`]
    : ['x negatif — kotaknya "berutang"', 'timbangan tidak bisa menggambarkannya']

  return (
    <Svg w={L.w} h={L.h} maxH={500} label="Timbangan untuk persamaan a x tambah b sama dengan c">
      <Timbangan L={L} miring={miring}>
        {Array.from({ length: a }, (_, i) => (
          <KotakX
            key={`k${i}`}
            x={pusatKotak(PK, i, a)}
            y={PK.y}
            o={1}
            nyala={nyalaX}
            teks="x"
          />
        ))}
        {Array.from({ length: b }, (_, i) => {
          const s = petak(i, PER_BARIS_KIRI)
          return (
            <Bola key={`b${i}`} x={PK.x + s.dx} y={yKiri + s.dy} o={1} warna={nyalaB ? 'var(--m-hi)' : 'var(--m-b)'} />
          )
        })}
        {Array.from({ length: c }, (_, i) => {
          const s = petak(i, PER_BARIS_KANAN)
          return (
            <Bola key={`c${i}`} x={PN.x + s.dx} y={yKanan + s.dy} o={1} warna={nyalaC ? 'var(--m-hi)' : 'var(--m-c)'} />
          )
        })}

        {aktif !== 'b' && (
          <Tag x={PK.x} y={PK.y + LABEL_TURUN} size={14} warna={aktif === 'a' ? 'var(--m-a)' : 'var(--ink-2)'}>
            {teksSisi(a, b)}
          </Tag>
        )}
        {aktif !== 'c' && !(ajakanC && slotC.dy > -2 * JARAK_BOLA) && (
          <Tag x={PN.x} y={PN.y + LABEL_TURUN} size={14} warna="var(--ink-2)">
            {teksSisi(0, c)}
          </Tag>
        )}
      </Timbangan>

      {/* ubah kedua sisi sekaligus */}
      <Tag x={L.cx} y={L.ajakY} size={13} warna="var(--ink-2)" latar={null} tebal={700}>
        ubah kedua sisi sekaligus
      </Tag>
      <TombolKeduaSisi cx={L.cx} y={L.tombolY} tanda={-1} label="−1 bola" />
      <TombolKeduaSisi cx={L.cx} y={L.tombolY} tanda={1} label="+1 bola" />

      {catatan.map((baris, i) => (
        <Tag
          key={i}
          x={L.cx}
          y={L.catatanY + i * 26}
          warna={setimbang ? 'var(--m-ab)' : 'var(--m-hi)'}
          size={sempit ? 15 : 16}
        >
          {baris}
        </Tag>
      ))}

      <Pegangan
        x={pA.x}
        y={pA.y}
        param="a"
        arah="x"
        keNilai={(pt) => aDari(PK, pt)}
      />
      <Pegangan
        x={PK.x + slotB.dx}
        y={yKiri + slotB.dy}
        param="b"
        arah="bebas"
        label={`b = ${fmt(b)}`}
        keNilai={(pt) =>
          petakDari(pt.x - PK.x, pt.y - yKiri, PER_BARIS_KIRI, Math.floor(B_MAKS_EKSPERIMEN / PER_BARIS_KIRI))
        }
      />
      <Pegangan
        x={PN.x + slotC.dx}
        y={yKanan + slotC.dy}
        param="c"
        arah="bebas"
        utama
        ajakan={AJAKAN}
        label={`c = ${fmt(c)}`}
        keNilai={(pt) =>
          petakDari(pt.x - PN.x, pt.y - yKanan, PER_BARIS_KANAN, Math.floor(C_MAKS_EKSPERIMEN / PER_BARIS_KANAN))
        }
      />
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'timbangan-persamaan',
  topicId: 'smp7-persamaan-linear-satu-variabel',
  judul: 'Menyelesaikan persamaan',
  pertanyaan: 'Kenapa boleh mengurangi kedua ruas persamaan?',
  tagline: 'Persamaan itu timbangan. Selama kedua sisi diperlakukan sama, ia tetap seimbang.',
  kelas: 7,
  domain: 'aljabar',
  tags: ['persamaan', 'linear', 'timbangan', 'aljabar'],

  tebak: {
    pertanyaan:
      'Pada persamaan 2x + 3 = 11, kamu ingin menghilangkan angka 3. Apa yang harus dilakukan?',
    pilihan: [
      {
        id: 'a',
        label: 'Kurangi 3 di ruas kiri saja',
        balasan:
          'Terdengar masuk akal karena angka 3 memang ada di kiri. Tapi begitu satu sisi berubah sendiri, kedua sisi berhenti bernilai sama.',
      },
      {
        id: 'b',
        label: 'Kurangi 3 di kedua ruas',
        benar: true,
        balasan:
          'Betul. Kedua sisi harus diperlakukan sama persis, supaya pernyataan "kiri sama dengan kanan" tetap benar.',
      },
      {
        id: 'c',
        label: 'Pindahkan 3 ke kanan lalu ganti tandanya',
        balasan:
          'Hasil akhirnya memang benar, dan kamu mungkin sudah diajari begitu. Tapi "pindah ruas ganti tanda" hanyalah nama pendek untuk mengurangi 3 di kedua ruas — dan kalau namanya saja yang dihafal, ia gampang salah dipakai.',
      },
    ],
    penutup:
      'Sebentar lagi kamu bisa melihat sendiri apa yang terjadi kalau hanya satu sisi yang diubah.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      { key: 'a', label: 'Banyak kotak x', min: 1, max: 4, step: 1, awal: 2, bulat: true, simbol: 'a', peran: 'a', bagian: 'a' },
      { key: 'b', label: 'Bola tambahan di kiri', min: 1, max: 6, step: 1, awal: 3, bulat: true, simbol: 'b', peran: 'b', bagian: 'b' },
      { key: 'x', label: 'Isi tiap kotak', min: 1, max: 6, step: 1, awal: 4, bulat: true, simbol: 'x', peran: 'a', bagian: 'x' },
    ],
    roles: { a: 'a', x: 'a', b: 'b', c: 'c', nol: 'hi' },
    arti: {
      x: 'Isi setiap kotak — nilai inilah yang sedang dicari.',
      a: 'Banyaknya kotak di sisi kiri.',
      b: 'Bola tambahan di sisi kiri.',
      c: 'Bola di sisi kanan.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Timbangan yang setimbang',
        narasi: (p) => {
          const { a, b, c } = nilaiBongkar(p)
          const kiri =
            a === 1
              ? `1 kotak berisi x dan ${fmt(b)} bola lepas`
              : `${fmt(a)} kotak yang isinya sama-sama x, ditambah ${fmt(b)} bola lepas`
          return `Di kiri ada ${kiri}. Di kanan ada ${fmt(c)} bola, dan timbangannya datar — artinya kedua sisi memang bernilai sama.`
        },
        rumus: '[a:a][x:x] + [b:b] = [c:c]',
        durasi: 1800,
      },
      {
        id: 's1',
        judul: 'Coba buang bola dari satu sisi saja',
        narasi: (p) => {
          const { b, c } = nilaiBongkar(p)
          return `Kamu ambil ${fmt(b)} bola dari kiri saja, sedangkan ${fmt(c)} bola di kanan dibiarkan utuh. Timbangan langsung miring ke kanan — sisi kiri tidak lagi bernilai sama dengan sisi kanan, jadi persamaannya rusak.`
        },
        durasi: 2400,
      },
      {
        id: 's2',
        judul: 'Sekarang buang dari kedua sisi',
        narasi: (p) => {
          const { b } = nilaiBongkar(p)
          return `Sekarang ambil ${fmt(b)} bola dari kiri DAN ${fmt(b)} bola dari kanan, sehingga kedua sisi kehilangan hal yang sama. Timbangan tetap datar — inilah alasan kenapa setiap tindakan harus dikenakan pada kedua ruas.`
        },
        rumus: '[a:a][x:x] = [c:c] − [b:b]',
        durasi: 2400,
      },
      {
        id: 's3',
        judul: (p) =>
          nilaiBongkar(p).a === 1 ? 'Tidak ada yang perlu dibagi' : 'Bagi kedua sisi sama rata',
        narasi: (p) => {
          const { a, sisaKanan } = nilaiBongkar(p)
          return a === 1
            ? `Di kiri tinggal satu kotak saja, jadi tidak ada yang perlu dibagi. Kotak itu sudah berhadapan langsung dengan ${fmt(sisaKanan)} bola di kanan.`
            : `Sisi kiri kini berisi ${fmt(a)} kotak yang isinya sama persis. Karena itu ${fmt(sisaKanan)} bola di kanan boleh kamu bagi menjadi ${fmt(a)} kelompok yang sama banyak.`
        },
        durasi: 2000,
      },
      {
        id: 's4',
        judul: (p) =>
          nilaiBongkar(p).a === 1
            ? 'Isi kotaknya langsung terlihat'
            : 'Sisakan satu kelompok di tiap sisi',
        narasi: (p) => {
          const { a, x } = nilaiBongkar(p)
          // "ambil" di langkah sebelumnya berarti membuang; di sini yang dibuang a − 1 kelompok, jadi pakai "sisakan".
          return a === 1
            ? `Karena kotaknya cuma satu, ${fmt(x)} bola di kanan itu persis isi kotak tersebut. Jadi x = ${fmt(x)}.`
            : `Kalau dua sisi yang sama berat sama-sama dibagi menjadi ${fmt(a)} kelompok yang sama, satu kelompok dari kiri pasti sama berat dengan satu kelompok dari kanan. Sisakan satu kelompok saja: 1 kotak berhadapan dengan ${fmt(x)} bola, jadi x = ${fmt(x)}.`
        },
        rumus: '[x:x] = ([c:c] − [b:b]) ÷ [a:a]',
        durasi: 2200,
      },
      {
        id: 's5',
        judul: 'Periksa kembali',
        narasi: (p) =>
          `Kembalikan semuanya, lalu isi ${nilaiBongkar(p).a === 1 ? 'kotaknya' : 'setiap kotak'} dengan angka yang ditemukan. Timbangan kembali datar — jawabannya benar.`,
        rumus: '[a:a] × [x:x] + [b:b] = [c:c]',
        durasi: 2200,
      },
    ],
  },

  eksperimen: {
    judul: 'Rancang persamaanmu sendiri',
    ajakan:
      'Seret titik di ujung kotak dan di puncak tumpukan bola, lalu ketuk "−1 bola". Kapan timbangan tidak bisa setimbang?',
    params: [
      { key: 'a', label: 'Banyak kotak x', min: 1, max: 4, step: 1, awal: 2, bulat: true, simbol: 'a', peran: 'a', bagian: 'a' },
      { key: 'b', label: 'Bola di kiri', min: 0, max: B_MAKS_EKSPERIMEN, step: 1, awal: 3, bulat: true, simbol: 'b', peran: 'b', bagian: 'b' },
      { key: 'c', label: 'Bola di kanan', min: 0, max: C_MAKS_EKSPERIMEN, step: 1, awal: 11, bulat: true, simbol: 'c', peran: 'c', bagian: 'c' },
    ],
    Visual: VisualEksperimen,
    // Persamaan yang sedang digambar timbangan, dengan warna yang sama dengan bendanya.
    rumus: (p) => {
      const { a, b, c } = nilaiEksperimen(p)
      return `${a === 1 ? '' : `[a:${fmt(a)}]`}[x:x]${b === 0 ? '' : ` + [b:${fmt(b)}]`} = [c:${fmt(c)}]`
    },
    temuan: (p) => {
      const { a, b, c, x } = nilaiEksperimen(p)
      const bulat = Number.isInteger(x)
      // a ≤ 4 sehingga pecahan berpenyebut 2 atau 4 punya bentuk desimal tepat: tulis "=", bukan "≈".
      const desimalTepat = Number.isInteger(x * 1000)
      return (
        <p>
          Persamaannya {a === 1 ? '' : fmt(a)}x {b === 0 ? '' : `+ ${fmt(b)} `}= {fmt(c)}, jadi{' '}
          <strong>x = {pecahanTeks(c - b, a)}</strong>
          {bulat ? '' : desimalTepat ? ` = ${fmt(x)}` : ` ≈ ${fmt(x, 3)}`}.{' '}
          {x < 0
            ? 'Nilai x keluar negatif. Timbangan tidak bisa menampilkannya — dan itu justru menunjukkan batas metafora ini: bilangan negatif tetap sah dalam aljabar, meski tidak ada "berat negatif".'
            : bulat
              ? 'Coba buat bola di kanan lebih sedikit daripada bola di kiri, lalu lihat apa yang terjadi.'
              : 'Nilai x tidak harus bulat. Kotaknya boleh berisi pecahan, dan persamaannya tetap sah.'}
        </p>
      )
    },
  },

  penjelasan: {
    SD: (
      <>
        <p>
          Tanda <strong>=</strong> itu bukan aba-aba "ayo hitung". Artinya "sisi kiri dan sisi kanan
          sama beratnya".
        </p>
        <p>
          Kalau kamu mengambil sesuatu dari satu sisi saja, timbangannya langsung miring — dan
          kalimatnya jadi bohong. Tapi kalau kamu mengambil hal yang <strong>sama</strong> dari{' '}
          <strong>kedua</strong> sisi, timbangan tetap datar.
        </p>
        <p>
          Itulah aturannya: apa pun yang kamu lakukan pada satu ruas, lakukan juga pada ruas
          satunya.
        </p>
      </>
    ),
    SMP: (
      <>
        <p>
          Menyelesaikan persamaan berarti mengubahnya menjadi persamaan lain yang{' '}
          <strong>penyelesaiannya sama</strong>, sampai bentuknya sesederhana x = sesuatu. Ada dua
          operasi yang dijamin tidak mengubah penyelesaian:
        </p>
        <ul>
          <li>menambah atau mengurangi bilangan yang sama pada kedua ruas;</li>
          <li>mengalikan atau membagi kedua ruas dengan bilangan yang sama dan bukan nol.</li>
        </ul>
        <p>
          Pada 2x + 3 = 11: kurangi 3 di kedua ruas menjadi 2x = 8, lalu bagi kedua ruas dengan 2
          menjadi x = 4.
        </p>
        <h4>"Pindah ruas, ganti tanda" itu apa sebenarnya</h4>
        <p>
          Itu bukan aturan tersendiri, melainkan nama pendek untuk langkah tadi. Ketika 3 "pindah"
          menjadi −3, yang sesungguhnya terjadi adalah 3 dikurangkan dari kedua ruas. Memahami
          asalnya membuatmu tidak keliru saat bentuk soalnya berubah.
        </p>
        <h4>Kenapa pembagi tidak boleh nol</h4>
        <p>
          Membagi dengan nol sama sekali tidak terdefinisi, jadi langkah itu memang tidak ada.
          Pasangannya, mengalikan kedua ruas dengan nol, bisa dilakukan tetapi menghancurkan
          informasi: dari x = 3 diperoleh 0 = 0, yang dipenuhi oleh semua bilangan, sehingga
          penyelesaiannya berubah. Kebalikannya juga menjebak: 0·x = 0·1 benar untuk setiap x, jadi
          "mencoret" 0 di kedua ruas (membagi dengan 0) untuk menyimpulkan x = 1 tidak sah.
        </p>
        <h4>Batas metafora timbangan</h4>
        <p>
          Timbangan bekerja rapi selama semua yang terlibat positif. Untuk bilangan negatif tidak ada
          "berat negatif", sehingga gambarnya berhenti membantu — walaupun aturannya tetap berlaku.
          Di titik itu, garis bilangan menjadi alat bantu yang lebih tepat.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Secara formal, dua persamaan disebut <strong>ekuivalen</strong> jika himpunan
          penyelesaiannya sama. Cara yang pasti menjaga keekuivalenan adalah menerapkan fungsi{' '}
          <em>injektif</em> yang sama pada kedua ruas, asalkan fungsi itu terdefinisi untuk setiap
          nilai yang bisa diambil kedua ruas. Fungsi f(t) = t − k dan f(t) = t/m (dengan m ≠ 0)
          injektif dan terdefinisi untuk semua bilangan real, sehingga aman.
        </p>
        <p>
          Sebaliknya, mengkuadratkan kedua ruas memakai f(t) = t² yang tidak injektif pada bilangan
          real, sehingga bisa memunculkan <em>akar palsu</em>: dari x = −2 diperoleh x² = 4, yang
          juga dipenuhi x = 2. Karena itulah setiap penyelesaian persamaan yang melibatkan
          pengkuadratan wajib diperiksa kembali. Pada persamaan linear yang diselesaikan hanya
          dengan operasi setara, pemeriksaan untuk menyaring akar palsu tidak diperlukan — meskipun
          tetap berguna untuk menangkap salah hitung.
        </p>
        <p>
          Persamaan linear ax + b = c dengan a ≠ 0 selalu punya tepat satu penyelesaian,
          x = (c − b)/a. Bila a = 0, hanya ada dua kemungkinan: tidak ada penyelesaian (jika b ≠ c),
          atau setiap bilangan menjadi penyelesaian (jika b = c).
        </p>
      </>
    ),
  },

  rumus: {
    src: '[a:a][x:x] + [b:b] = [c:c]  ⟹  [x:x] = ([c:c] − [b:b]) ÷ [a:a]',
    roles: { a: 'a', x: 'a', b: 'b', c: 'c' },
    arti: {
      x: 'Bilangan yang belum diketahui — isi setiap kotak pada timbangan.',
      a: 'Banyaknya kotak, jadi a bukan nol — itulah yang membuat kedua ruas boleh dibagi a. Karena semua kotak isinya sama, hasil baginya di kiri tepat satu kotak.',
      b: 'Tambahan di ruas kiri. Dihilangkan dengan menguranginya dari KEDUA ruas.',
      c: 'Nilai ruas kanan.',
    },
  },

  soal: [
    (rnd) => {
      const a = 2 + Math.floor(rnd() * 4)
      const x = 2 + Math.floor(rnd() * 8)
      const b = 1 + Math.floor(rnd() * 9)
      return {
        id: 'tim-1',
        tipe: 'angka',
        topicId: 'smp7-persamaan-linear-satu-variabel',
        kelas: 7,
        tingkat: 'mudah',
        konsep: 'timbangan-persamaan',
        pertanyaan: `Tentukan nilai x dari persamaan ${a}x + ${b} = ${a * x + b}.`,
        jawaban: x,
        toleransi: 1e-9,
        hint: [
          `Langkah pertama: hilangkan ${b}. Kurangi ${b} dari KEDUA ruas.`,
          `Setelah itu tersisa ${a}x = ${a * x}.`,
          `Terakhir bagi kedua ruas dengan ${a}.`,
        ],
        pembahasan: `${a}x + ${b} = ${a * x + b} → ${a}x = ${a * x} → x = ${x}. Periksa: ${a} × ${x} + ${b} = ${a * x + b}. Cocok.`,
      }
    },
    {
      id: 'tim-2',
      tipe: 'pilihan',
      topicId: 'smp7-persamaan-linear-satu-variabel',
      kelas: 7,
      tingkat: 'sedang',
      konsep: 'timbangan-persamaan',
      pertanyaan: 'Dari 5x − 7 = 18, langkah pertama yang paling praktis adalah...',
      pilihan: [
        { id: 'a', label: 'Tambahkan 7 pada kedua ruas', benar: true },
        {
          id: 'b',
          label: 'Kurangi 7 dari kedua ruas',
          diagnosa:
            'Di ruas kiri tertulis −7, jadi untuk menghilangkannya kamu perlu MENAMBAH 7, bukan mengurangi lagi.',
        },
        {
          id: 'c',
          label: 'Bagi kedua ruas dengan 5 lebih dulu',
          diagnosa:
            'Boleh saja, tetapi jadi lebih rumit: kamu harus membagi 18 dan −7 sekaligus. Menghilangkan suku tetap lebih dulu jauh lebih mudah.',
        },
        {
          id: 'd',
          label: 'Tambahkan 7 pada ruas kiri saja',
          diagnosa: 'Timbangan akan miring. Ruas kiri jadi tidak lagi bernilai sama dengan ruas kanan.',
        },
      ],
      hint: [
        'Yang ingin dihilangkan adalah −7. Operasi apa yang membatalkan pengurangan?',
        'Kebalikan dari mengurangi 7 adalah menambah 7.',
        'Dan operasi itu harus dikenakan pada kedua ruas.',
      ],
      pembahasan:
        '5x − 7 = 18 → tambahkan 7 pada kedua ruas → 5x = 25 → bagi 5 → x = 5.',
    },
    {
      id: 'tim-3',
      tipe: 'urutkan',
      topicId: 'smp7-persamaan-linear-satu-variabel',
      kelas: 7,
      tingkat: 'sedang',
      konsep: 'timbangan-persamaan',
      pertanyaan: 'Susun langkah menyelesaikan 3x + 4 = 19 secara berurutan.',
      langkah: [
        'Kurangi 4 dari kedua ruas',
        'Persamaan menjadi 3x = 15',
        'Bagi kedua ruas dengan 3',
        'Diperoleh x = 5',
        'Periksa: 3 × 5 + 4 = 19',
      ],
      hint: [
        'Hilangkan dulu bilangan yang berdiri sendiri, baru urus angka di depan x.',
        'Memeriksa hasil selalu menjadi langkah terakhir.',
      ],
      pembahasan:
        'Urutannya: hilangkan suku tetap → sederhanakan → bagi dengan koefisien → dapatkan x → periksa kembali.',
    },
    {
      id: 'tim-4',
      tipe: 'benar-salah',
      topicId: 'smp7-persamaan-linear-satu-variabel',
      kelas: 8,
      tingkat: 'sulit',
      konsep: 'timbangan-persamaan',
      pertanyaan:
        'Dari persamaan 0 · x = 0 kita boleh membagi kedua ruas dengan x untuk memperoleh 0 = 0, lalu menyimpulkan x = 1.',
      jawaban: false,
      diagnosa:
        'Dua masalah sekaligus: membagi dengan x tidak sah kalau x mungkin nol, dan dari 0 = 0 tidak ada informasi apa pun tentang x.',
      hint: [
        'Operasi apa yang tidak boleh dilakukan pada kedua ruas?',
        'Membagi hanya boleh dengan bilangan yang pasti bukan nol.',
        'Kalaupun boleh, apakah 0 = 0 memberitahumu berapa nilai x?',
      ],
      pembahasan:
        'Salah. Persamaan 0 · x = 0 dipenuhi oleh SEMUA bilangan x. Membagi dengan sesuatu yang mungkin nol merusak keekuivalenan, dan kesimpulan x = 1 tidak punya dasar.',
    },
    (rnd) => {
      const a = 2 + Math.floor(rnd() * 3)
      const x = 3 + Math.floor(rnd() * 6)
      const b = 1 + Math.floor(rnd() * 5)
      // d < a supaya koefisien sisa (a − d) positif dan tidak nol:
      // bila d = a persamaannya jadi identitas yang dipenuhi semua x.
      const d = 1 + Math.floor(rnd() * (a - 1))
      const k = a - d
      const e = a * x + b - d * x
      const suku = (n: number) => (n === 1 ? 'x' : `${n}x`)
      return {
        id: 'tim-5',
        tipe: 'angka',
        topicId: 'smp7-persamaan-linear-satu-variabel',
        kelas: 8,
        tingkat: 'sulit',
        konsep: 'timbangan-persamaan',
        pertanyaan: `Tentukan nilai x dari ${a}x + ${b} = ${suku(d)} + ${e}.`,
        jawaban: x,
        toleransi: 1e-9,
        hint: [
          'Sekarang kotak berisi x ada di kedua sisi timbangan. Kumpulkan dulu di satu sisi.',
          `Kurangi ${suku(d)} dari kedua ruas sehingga tersisa ${suku(k)} + ${b} = ${e}.`,
          k === 1
            ? `Lalu kurangi ${b} dari kedua ruas; nilai x langsung terlihat.`
            : `Lalu kurangi ${b} dari kedua ruas, dan bagi dengan ${k}.`,
        ],
        pembahasan: `${a}x + ${b} = ${suku(d)} + ${e} → ${suku(k)} = ${e - b}${k === 1 ? '' : ` → x = ${x}`}. Periksa: ${a} × ${x} + ${b} = ${a * x + b} dan ${d} × ${x} + ${e} = ${d * x + e}. Mengurangi ${suku(d)} dari kedua ruas sama sahnya dengan mengurangi bilangan biasa: yang penting kedua sisi diperlakukan sama.`,
      }
    },
  ],

  lanjut: ['negatif-kali-negatif', 'kuadrat-jumlah', 'parabola'],
}

export default konsep
