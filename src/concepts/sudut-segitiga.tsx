/* ============================================================
   KONSEP — Kenapa jumlah sudut segitiga selalu 180°?
   Kelas 7 · Geometri

   Gagasan pembuktian: tarik garis SEJAJAR alas yang melewati
   puncak. Dua sudut alas berpindah ke puncak sebagai sudut dalam
   berseberangan (besarnya sama persis). Di puncak, ketiga sudut
   itu berjajar memenuhi garis lurus — dan sudut lurus besarnya 180°.

   Kejujuran matematis: bukti ini bergantung pada postulat
   kesejajaran. Pada bola atau bidang hiperbolik, jumlahnya bukan 180°.
   Hal itu disebutkan pada penjelasan tingkat SMA.

   ---------------- Interaksi langsung ----------------
   Puncak segitiga DIPAKU: di situlah garis sejajar ditarik dan di situ
   pula ketiga sudut berkumpul, jadi garis itu tidak pernah bergoyang.
   Yang diseret adalah kedua POJOK ALAS, meluncur di sepanjang garis
   alas seperti engsel gunting: pojok kiri hanya mengubah sudut kiri,
   pojok kanan hanya sudut kanan, dan sudut puncak selalu mengambil
   sisanya. Pojok digambar di x = puncak ∓ tinggi × cot(sudut), dan
   keNilai membaliknya persis: sudut = atan2(tinggi, jarak mendatar
   pojok ke puncak). Karena itu titiknya menempel pada jari.

   ---------------- Rentang sudut 35°…105° ----------------
   Skala gambar harus TETAP supaya titik yang diseret menempel pada jari
   (docs/PANDUAN-INTERAKSI.md), jadi lebar alas — tinggi × (cot α + cot β)
   — wajib muat di bingkai pada nilai penggeser mana pun. Sudut alas 20°
   menuntut alas 5,5 × tinggi; di HP (viewBox 440) segitiganya tinggal
   setinggi ±70 satuan dan sudutnya tidak terbaca lagi. Batas 35° membuat
   alas paling lebar 2,9 × tinggi. Batas atas 105° dan α + β ≤ 140°
   menjaga arah sebaliknya: alas paling sempit tetap cukup lebar untuk
   dua pegangan dan dua label yang tidak berdempet.
   ============================================================ */

import { Pegangan, useInteraksi } from '../components/Interaksi'
import { Svg, Tag, useSempit, useSkalaSvg } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, deg, fmt, rad } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

/** Batas sudut alas yang masih bisa digambar pada skala tetap. */
const MIN_SUDUT = 35
const MAKS_SUDUT = 105
/** Batas jumlah kedua sudut alas; sisanya (≥ 35°) untuk sudut puncak. */
const MAKS_JUMLAH = 140

type Titik = [number, number]

/** Sudut arah dari titik a ke titik b, dalam radian koordinat layar. */
const arah = (a: Titik, b: Titik) => Math.atan2(b[1] - a[1], b[0] - a[0])

/** Normalkan selisih sudut ke rentang (−π, π]. */
function selisih(dari: number, ke: number) {
  let d = ke - dari
  while (d > Math.PI) d -= 2 * Math.PI
  while (d < -Math.PI) d += 2 * Math.PI
  return d
}

/** Juring sudut (wedge) sebagai path tertutup. */
function juringSudut(c: Titik, r: number, a1: number, a2: number) {
  const d = selisih(a1, a2)
  const a2n = a1 + d
  const x1 = c[0] + r * Math.cos(a1)
  const y1 = c[1] + r * Math.sin(a1)
  const x2 = c[0] + r * Math.cos(a2n)
  const y2 = c[1] + r * Math.sin(a2n)
  const sweep = d > 0 ? 1 : 0
  return `M ${c[0].toFixed(1)} ${c[1].toFixed(1)} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 ${sweep} ${x2.toFixed(1)} ${y2.toFixed(1)} Z`
}

const lerpT = (a: Titik, b: Titik, s: number): Titik => [
  a[0] + (b[0] - a[0]) * s,
  a[1] + (b[1] - a[1]) * s,
]

/* ---------------- Tata letak ---------------- */

/**
 * Satu sistem koordinat untuk satu ukuran panggung. Tidak ada satu pun
 * angka di sini yang bergantung pada penggeser: hanya begitulah pojok yang
 * diseret bisa menempel pada jari.
 */
interface Tata {
  sempit: boolean
  w: number
  h: number
  maxH: number
  /** x puncak — dipaku di tengah, karena puncak adalah engsel segitiga. */
  px: number
  /** y puncak; pada bongkar sekaligus tinggi garis sejajar. */
  py: number
  /** jarak tegak puncak ke garis alas. */
  tinggi: number
  /** jari-jari juring sudut. */
  jari: number
  /**
   * Tinggi PALING RENDAH label sudut alas di atas garis alas. Pada panggung
   * sempit huruf dan pegangan sama-sama diperbesar oleh mesin, jadi tinggi
   * yang benar-benar dipakai dihitung `naikAman()` dari skala layar; angka di
   * sini hanya batas bawahnya untuk panggung lebar.
   */
  naik: number
  hurufSudut: number
  /** x tanda sejajar, selalu di kiri pojok alas terkiri. */
  tandaX: number
}

interface TataBongkar extends Tata {
  /** baris keterangan di atas gambar. */
  ketY: number
  hurufKet: number
  /**
   * Baris catatan bila angka yang diketik tidak bisa digambar. Berbagi
   * tempat dengan ajakan "Seret aku" di bawah pegangan — keduanya tidak
   * pernah tampil bersamaan, jadi tidak ada ruang kosong yang disimpan
   * hanya untuk catatan yang jarang muncul.
   */
  catatY: number
}

interface TataEks extends Tata {
  /** pusat dan jari-jari kipas tiga sudut. */
  kipasY: number
  kipasR: number
  hurufKipas: number
}

/*
 * Lebar: puncak di x = 345, jadi pojok terkiri berada di
 * 345 − 195 × cot 35° = 66 satuan dari tepi — cukup untuk label nilai dan
 * ajakan "Seret aku" yang muncul di atas dan di bawah pegangannya. Alas
 * paling lebar 557 satuan, paling sempit 142 satuan (α = β = 70°), jadi
 * kedua pegangan tidak pernah berdempet. Baris catatan di bawah ajakan.
 */
const BONGKAR_LEBAR: TataBongkar = {
  sempit: false, w: 690, h: 336, maxH: 430, px: 345, py: 66, tinggi: 195,
  jari: 42, naik: 26, hurufSudut: 16, tandaX: 26, ketY: 34, hurufKet: 17, catatY: 303,
}

/*
 * HP: lebar 440 hanya memuat tinggi 108 satuan (alas paling lebar 309 satuan
 * pada 35°, paling sempit 79 satuan). Pojok terkiri berada 66 satuan dari
 * tepi — cukup untuk ajakan "Seret aku" di bawah pegangannya, yang pada
 * panggung tersempit selebar ±127 satuan gambar. `naik` 28 adalah batas
 * bawahnya; pada panggung yang lebih sempit `naikAman()` menaikkannya lagi
 * karena huruf label dan pegangan ikut membesar.
 */
const BONGKAR_HP: TataBongkar = {
  sempit: true, w: 440, h: 240, maxH: 430, px: 220, py: 56, tinggi: 108,
  jari: 32, naik: 28, hurufSudut: 15, tandaX: 20, ketY: 28, hurufKet: 15, catatY: 206,
}

/* Eksperimen memakai segitiga yang sama, lalu kipas tiga sudut di bawahnya.
   Kipas diletakkan di bawah ajakan pegangan pojok supaya tidak tertimpa. */
const EKS_LEBAR: TataEks = {
  sempit: false, w: 690, h: 446, maxH: 470, px: 345, py: 48, tinggi: 195,
  jari: 42, naik: 26, hurufSudut: 16, tandaX: 26, kipasY: 404, kipasR: 88, hurufKipas: 15,
}

const EKS_HP: TataEks = {
  sempit: true, w: 440, h: 364, maxH: 470, px: 220, py: 44, tinggi: 108,
  jari: 32, naik: 28, hurufSudut: 15, tandaX: 20, kipasY: 318, kipasR: 82, hurufKipas: 13,
}

/* ---------------- Sudut yang dipakai bersama gambar dan teks ---------------- */

/**
 * Ketiga sudut. Sudut kanan dijepit supaya sudut puncak tidak habis: saat
 * diseret penjepitan itu sudah dilakukan lebih dulu oleh keNilai, jadi
 * gambar dan angka tidak pernah berbeda. Hanya angka yang DIKETIK pada
 * kontrol angka yang bisa membentur batas ini.
 */
function sudut(p: Record<string, number>) {
  const alfa = clamp(Math.round(p.alfa ?? 62), MIN_SUDUT, MAKS_SUDUT)
  const diminta = clamp(Math.round(p.beta ?? 48), MIN_SUDUT, MAKS_SUDUT)
  const beta = Math.min(diminta, MAKS_JUMLAH - alfa)
  return { alfa, beta, diminta, gamma: 180 - alfa - beta, dibatasi: beta !== diminta }
}

/* ---------------- Geometri segitiga ---------------- */

/** Jarak mendatar pojok alas dari puncak: tinggi × cot(sudut). */
const geserPojok = (L: Tata, sudutDerajat: number) => L.tinggi / Math.tan(rad(sudutDerajat))

function bentuk(L: Tata, alfa: number, beta: number) {
  const y = L.py + L.tinggi
  const A: Titik = [L.px - geserPojok(L, alfa), y]
  const B: Titik = [L.px + geserPojok(L, beta), y]
  const P: Titik = [L.px, L.py]
  return { A, B, P, y }
}

/**
 * Kebalikan posisi pojok kiri (x = px − tinggi × cot α). Penjepitan ke
 * MAKS_JUMLAH dilakukan di sini, jadi menyeret tidak pernah menghasilkan
 * segitiga yang tidak bisa digambar.
 */
const nilaiAlfa = (L: Tata, beta: number) => (pt: { x: number; y: number }) =>
  clamp(deg(Math.atan2(L.tinggi, L.px - pt.x)), MIN_SUDUT, Math.min(MAKS_SUDUT, MAKS_JUMLAH - beta))

/** Kebalikan posisi pojok kanan (x = px + tinggi × cot β). */
const nilaiBeta = (L: Tata, alfa: number) => (pt: { x: number; y: number }) =>
  clamp(deg(Math.atan2(L.tinggi, pt.x - L.px)), MIN_SUDUT, Math.min(MAKS_SUDUT, MAKS_JUMLAH - alfa))

/** Pusat lingkaran dalam: titik temu ketiga garis bagi sudut. */
function pusatDalam(A: Titik, B: Titik, P: Titik): Titik {
  const a = Math.hypot(B[0] - P[0], B[1] - P[1])
  const b = Math.hypot(A[0] - P[0], A[1] - P[1])
  const c = Math.hypot(A[0] - B[0], A[1] - B[1])
  const k = a + b + c
  return [(a * A[0] + b * B[0] + c * P[0]) / k, (a * A[1] + b * B[1] + c * P[1]) / k]
}

/* ---------------- Label sudut ---------------- */

/**
 * Skala layar yang dipakai menghitung jarak aman. Sebelum panggung terukur
 * (bingkai pertama dan saat uji otomatis) nilainya 0; kita memakai panggung
 * paling sempit yang dilayani, karena di sanalah huruf dan pegangan paling
 * besar dibandingkan gambarnya — jadi tata letaknya yang paling berdesakan.
 */
const skalaAman = (skala: number) => skala || 0.6

/** Tinggi huruf Tag yang benar-benar digambar — rumusnya sama dengan Stage.tsx. */
const ukuranTag = (size: number, skala: number) =>
  Math.max(size, Math.min(size * 1.6, 11 / skalaAman(skala)))

/** Setengah lebar latar Tag — rumusnya sama dengan Tag di Stage.tsx. */
function setengahTag(teks: string, size: number, skala: number) {
  const uk = ukuranTag(size, skala)
  return (teks.length * uk * 0.58 + 14 * (uk / size)) / 2
}

/**
 * Tinggi label sudut alas di atas garis alas. Pegangan pojok duduk tepat di
 * garis alas dan jari-jarinya 9 px layar, sedangkan huruf label diperbesar
 * sampai 11 px layar — keduanya menjadi makin BESAR dalam satuan gambar pada
 * panggung yang makin sempit. Karena itu jaraknya dihitung dari skala layar,
 * bukan dipatok satu angka: di panggung lebar hasilnya tetap `L.naik`.
 */
function naikAman(L: Tata, skala: number) {
  const s = skalaAman(skala)
  const rTitik = Math.max(8, 9 / s)
  return Math.max(L.naik, rTitik + 1.75 / s + ukuranTag(L.hurufSudut, s) * 0.68 + 2)
}

/**
 * Label kedua sudut alas: di dalam segitiga pada garis bagi sudutnya,
 * `naikAman()` satuan di atas alas — jadi tidak pernah menimpa pegangan pojok
 * yang duduk tepat di garis alas. Bila segitiganya tinggi-ramping sehingga
 * kedua label berdempet, keduanya pindah ke luar segitiga: di kiri pojok kiri
 * dan di kanan pojok kanan, dijepit supaya tetap utuh di dalam bingkai.
 */
function labelAlas(
  L: Tata,
  A: Titik,
  B: Titik,
  alfa: number,
  beta: number,
  teksA: string,
  teksB: string,
  skala: number,
) {
  const naik = naikAman(L, skala)
  const y = A[1] - naik
  const sA = setengahTag(teksA, L.hurufSudut, skala)
  const sB = setengahTag(teksB, L.hurufSudut, skala)
  const xa = A[0] + naik / Math.tan(rad(alfa / 2))
  const xb = B[0] - naik / Math.tan(rad(beta / 2))
  if (xb - sB - (xa + sA) >= 8) return { a: [xa, y] as Titik, b: [xb, y] as Titik }
  return {
    a: [clamp(A[0] - sA - 14, sA + 4, L.w - sA - 4), y] as Titik,
    b: [clamp(B[0] + sB + 14, sB + 4, L.w - sB - 4), y] as Titik,
  }
}

/** Arah garis bagi sudut puncak, menunjuk ke dalam segitiga. */
const arahPuncak = (P: Titik, A: Titik, B: Titik) => {
  const a = arah(P, A)
  return a + selisih(a, arah(P, B)) / 2
}

/** Titik pada jarak r dari puncak, ke arah tertentu. */
const diPuncak = (P: Titik, sudutArah: number, r: number): Titik => [
  P[0] + Math.cos(sudutArah) * r,
  P[1] + Math.sin(sudutArah) * r,
]

/**
 * Jarak ketiga label dari puncak saat sudutnya sudah berkumpul di sana.
 * Cukup jauh supaya dua label bertetangga tidak bertumpuk walau juringnya
 * sempit, tetapi tidak sampai melewati garis alas.
 * `bukaan` = jarak sudut antar label bertetangga, dalam derajat.
 */
function jarakKumpul(L: Tata, lebar: [number, number, number], bukaan: [number, number]) {
  let r = L.jari + 26
  const pasangan: [number, number][] = [
    [0, 1],
    [1, 2],
  ]
  pasangan.forEach(([i, j], k) => {
    const buka = Math.max(rad(bukaan[k]) / 2, 0.05)
    r = Math.max(r, (lebar[i] + lebar[j] + 8) / (2 * Math.sin(buka)))
  })
  return Math.min(r, L.tinggi * 0.62)
}

const WARNA = ['var(--m-a)', 'var(--m-b)', 'var(--m-ab)']

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar(keadaan: DeriveState) {
  const L: TataBongkar = useSempit() ? BONGKAR_HP : BONGKAR_LEBAR
  return (
    <Svg w={L.w} h={L.h} maxH={L.maxH} label="Segitiga dengan garis sejajar melalui puncaknya">
      <IsiBongkar {...keadaan} L={L} />
    </Svg>
  )
}

/**
 * Dipisah dari VisualBongkar supaya useSkalaSvg() membaca skala layar yang
 * sebenarnya: SkalaCtx baru dipasang oleh <Svg>, jadi hook yang dipanggil di
 * luar <Svg> selalu mengembalikan 0. Semua jarak aman di sini bergantung pada
 * skala itu, karena huruf Tag dan pegangan diukur dalam piksel layar.
 */
function IsiBongkar({ step, t, p, sorot, L }: DeriveState & { L: TataBongkar }) {
  const { alfa, beta, gamma, diminta, dibatasi } = sudut(p)
  const skala = useSkalaSvg()
  const ctx = useInteraksi()
  const aktif = ctx?.kendali.aktif ?? null
  // Ajakan "Seret aku" memakai baris yang sama dengan catatan di bawah alas.
  const adaAjakan = ctx?.ajakan ?? false
  const { A, B, P, y: yAlas } = bentuk(L, alfa, beta)
  const R = L.jari

  const garisSejajar = fase(step, t, 1)
  const pindahA = step >= 2 ? (step === 2 ? seg(t, 0.1, 0.92) : 1) : 0
  const pindahB = step >= 3 ? (step === 3 ? seg(t, 0.1, 0.92) : 1) : 0
  const lurus = fase(step, t, 4)
  const selesai = step >= 5

  const nyalaA = sorot === 'a'
  const nyalaB = sorot === 'b'
  const nyalaC = sorot === 'c'
  const nyalaLurus = sorot === 'lurus'
  const teksA = `${fmt(alfa)}°`
  const teksB = `${fmt(beta)}°`
  const teksC = `${fmt(gamma)}°`

  // Sudut di A: dari arah A→B sampai arah A→P.
  const aA1 = arah(A, B)
  const aA2 = arah(A, P)
  // Sudut di B: dari arah B→P sampai arah B→A.
  const aB1 = arah(B, P)
  const aB2 = arah(B, A)

  // Sudut dalam berseberangan adalah sudut alas yang diputar setengah
  // putaran: A→B menjadi P→kiri, A→P menjadi P→A (begitu pula di B).
  // KEDUA kaki juring diputar dengan besar yang SAMA, jadi juringnya
  // bergerak kaku dan tidak pernah melebar di tengah animasi. (Menormalkan
  // tiap kaki sendiri-sendiri bisa memutar satu kaki +180° dan kaki lain
  // −180°, sehingga juring sempat tampak jauh lebih besar.)
  const putarA = Math.PI * pindahA // searah jarum jam di layar
  const putarB = -Math.PI * pindahB // cermin dari putaran A

  const pusatA = lerpT(A, P, pindahA)
  const pusatB = lerpT(B, P, pindahB)

  // Label ikut berjalan bersama juringnya: dari tempatnya di alas menuju
  // tempatnya di puncak, tempat ketiga sudut nanti berjajar.
  const statis = labelAlas(L, A, B, alfa, beta, teksA, teksB, skala)
  const arahA = aA1 + selisih(aA1, aA2) / 2 + Math.PI
  const arahB = aB1 + selisih(aB1, aB2) / 2 - Math.PI
  const arahC = arahPuncak(P, A, B)
  const lebarLabel: [number, number, number] = [
    setengahTag(teksA, L.hurufSudut, skala),
    setengahTag(teksC, L.hurufSudut, skala),
    setengahTag(teksB, L.hurufSudut, skala),
  ]
  const rKumpul = jarakKumpul(L, lebarLabel, [(alfa + gamma) / 2, (gamma + beta) / 2])
  const I = pusatDalam(A, B, P)
  const jauhC = Math.min(R + 26, 0.55 * Math.hypot(I[0] - P[0], I[1] - P[1]))
  // Label puncak baru menepi ke jarak berkumpul setelah KEDUA label alas tiba.
  // Kalau ia menepi lebih awal (pakai yang paling cepat), ia menyeberangi
  // label alas yang masih tinggal di pojoknya — di tata letak HP jaraknya
  // hanya 108 satuan, jadi keduanya bertumpuk.
  const kumpul = Math.min(pindahA, pindahB)
  const labelA = lerpT(statis.a, diPuncak(P, arahA, rKumpul), pindahA)
  const labelB = lerpT(statis.b, diPuncak(P, arahB, rKumpul), pindahB)
  const labelC = diPuncak(P, arahC, jauhC + (rKumpul - jauhC) * kumpul)

  return (
    <>
      {/* garis sejajar alas, lewat puncak; alas ikut diperpanjang */}
      {garisSejajar > 0 && (
        <g opacity={garisSejajar}>
          <line
            x1={12}
            y1={P[1]}
            x2={L.w - 12}
            y2={P[1]}
            stroke={nyalaLurus || lurus > 0.3 ? 'var(--m-hi)' : 'var(--ink-3)'}
            strokeWidth={nyalaLurus || lurus > 0.3 ? 4 : 2.4}
            strokeDasharray={lurus > 0.3 ? undefined : '8 6'}
          />
          <line
            x1={12}
            y1={yAlas}
            x2={L.w - 12}
            y2={yAlas}
            stroke="var(--ink-3)"
            strokeWidth={1.6}
            opacity={0.7}
          />
          {/* tanda sejajar pada kedua garis, di kiri pojok alas terkiri */}
          {[P[1], yAlas].map((my) => (
            <path
              key={my}
              d={`M ${L.tandaX - 6} ${my - 7} l 7 7 l -7 7`}
              fill="none"
              stroke="var(--ink-3)"
              strokeWidth={2}
            />
          ))}
        </g>
      )}

      {/* segitiga */}
      <polygon
        points={`${A[0]},${A[1]} ${B[0]},${B[1]} ${P[0]},${P[1]}`}
        fill="var(--m-ghost)"
        stroke="var(--ink)"
        strokeWidth={2.6}
        strokeLinejoin="round"
      />

      {/* sudut puncak (gamma) — selalu di tempatnya */}
      <path
        d={juringSudut(P, R, arah(P, A), arah(P, B))}
        fill={WARNA[2]}
        fillOpacity={nyalaC ? 0.6 : 0.34}
        stroke={WARNA[2]}
        strokeWidth={2}
      />

      {/* sudut kiri, berpindah ke puncak */}
      <path
        d={juringSudut(pusatA, R, aA1 + putarA, aA2 + putarA)}
        fill={WARNA[0]}
        fillOpacity={nyalaA || aktif === 'alfa' ? 0.6 : 0.34}
        stroke={WARNA[0]}
        strokeWidth={2}
      />

      {/* sudut kanan, berpindah ke puncak */}
      <path
        d={juringSudut(pusatB, R, aB1 + putarB, aB2 + putarB)}
        fill={WARNA[1]}
        fillOpacity={nyalaB || aktif === 'beta' ? 0.6 : 0.34}
        stroke={WARNA[1]}
        strokeWidth={2}
      />

      {/* Label sudut tetap tampil selagi pojoknya diseret: angkanya menempel
          pada sudutnya sendiri dan sudah berubah seketika, jadi pegangan tidak
          perlu membawa salinan angka yang sama (lihat catatan di Pegangan). */}
      <Tag x={labelA[0]} y={labelA[1]} warna={WARNA[0]} size={L.hurufSudut}>
        {teksA}
      </Tag>
      <Tag x={labelB[0]} y={labelB[1]} warna={WARNA[1]} size={L.hurufSudut}>
        {teksB}
      </Tag>
      <Tag x={labelC[0]} y={labelC[1]} warna={WARNA[2]} size={L.hurufSudut}>
        {teksC}
      </Tag>

      {/* angka yang diketik bisa menuntut segitiga yang tidak ada */}
      {dibatasi && !adaAjakan && (
        <Tag x={L.px} y={L.catatY} warna="var(--ink-2)" size={13}>
          {L.sempit
            ? `digambar ${fmt(beta)}°, bukan ${fmt(diminta)}°`
            : `sudut kanan digambar ${fmt(beta)}° agar sudut puncak tidak habis`}
        </Tag>
      )}

      {/* keterangan tiap tahap */}
      {step === 1 && (
        <Tag x={L.px} y={L.ketY} warna="var(--ink-2)" size={L.hurufKet}>
          {L.sempit ? 'garis ini sejajar dengan alas' : 'garis baru ini sejajar dengan alas'}
        </Tag>
      )}
      {step === 2 && (
        <Tag x={L.px} y={L.ketY} warna={WARNA[0]} size={L.hurufKet}>
          {L.sempit
            ? 'sudut berseberangan, sama persis'
            : 'sudut dalam berseberangan — besarnya sama persis'}
        </Tag>
      )}
      {step === 3 && (
        <Tag x={L.px} y={L.ketY} warna={WARNA[1]} size={L.hurufKet}>
          {L.sempit ? 'sudut satunya pun berpindah' : 'sudut satunya berpindah dengan alasan yang sama'}
        </Tag>
      )}
      {lurus > 0.3 && !selesai && (
        <Tag x={L.px} y={L.ketY} warna="var(--m-hi)" size={L.hurufKet}>
          {L.sempit ? 'ketiganya memenuhi garis lurus' : 'ketiganya memenuhi satu garis lurus'}
        </Tag>
      )}
      {selesai && (
        <Tag x={L.px} y={L.ketY} warna="var(--m-hi)" size={L.hurufKet + 2}>
          {`${teksA} + ${teksB} + ${teksC} = 180°`}
        </Tag>
      )}

      {/* Kedua pojok alas diseret di sepanjang garis alas. Sengaja TANPA
          `label`: label pegangan melayang 22 px di atas jari, dan di tata
          letak HP segitiganya hanya 108 satuan tinggi — di sana label itu
          jatuh persis pada angka sudut puncak, angka yang justru sedang
          diamati anak. Angka sudut yang diseret tetap terbaca di tempatnya
          sendiri di dalam segitiga dan di bilah angka di bawah gambar. */}
      <Pegangan
        x={A[0]}
        y={yAlas}
        param="alfa"
        arah="x"
        utama
        ajakan="Seret aku"
        keNilai={nilaiAlfa(L, beta)}
      />
      <Pegangan x={B[0]} y={yAlas} param="beta" arah="x" keNilai={nilaiBeta(L, alfa)} />
    </>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen(keadaan: { p: Record<string, number>; sorot: string | null }) {
  const L: TataEks = useSempit() ? EKS_HP : EKS_LEBAR
  return (
    <Svg
      w={L.w}
      h={L.h}
      maxH={L.maxH}
      label="Segitiga yang bisa diubah sudutnya, dengan ketiga sudut disusun berjajar"
    >
      <IsiEksperimen {...keadaan} L={L} />
    </Svg>
  )
}

/** Dipisah dari VisualEksperimen dengan alasan yang sama seperti IsiBongkar. */
function IsiEksperimen({
  p,
  sorot,
  L,
}: {
  p: Record<string, number>
  sorot: string | null
  L: TataEks
}) {
  const { alfa, beta, gamma } = sudut(p)
  const skala = useSkalaSvg()
  const aktif = useInteraksi()?.kendali.aktif ?? null
  const { A, B, P, y: yAlas } = bentuk(L, alfa, beta)
  const R = L.jari

  const teksA = `${fmt(alfa)}°`
  const teksB = `${fmt(beta)}°`
  const teksC = `${fmt(gamma)}°`
  const statis = labelAlas(L, A, B, alfa, beta, teksA, teksB, skala)
  const I = pusatDalam(A, B, P)
  const labelC = diPuncak(
    P,
    arahPuncak(P, A, B),
    Math.min(R + 26, 0.55 * Math.hypot(I[0] - P[0], I[1] - P[1])),
  )

  const terang = (kunci: string, param: string) =>
    sorot === kunci || aktif === param ? 0.62 : 0.34

  // Kipas: ketiga sudut yang sama disusun berjajar pada satu garis lurus,
  // dengan urutan yang sama seperti saat berkumpul di puncak pada bongkar:
  // sudut kiri, sudut puncak, sudut kanan.
  const bx = L.px
  const by = L.kipasY
  const rr = L.kipasR
  let mulai = Math.PI // mulai dari arah kiri
  const juring = (
    [
      [alfa, WARNA[0], terang('a', 'alfa')],
      [gamma, WARNA[2], sorot === 'c' ? 0.62 : 0.34],
      [beta, WARNA[1], terang('b', 'beta')],
    ] as [number, string, number][]
  ).map(([s, warna, tebal], i) => {
    const a1 = mulai
    const a2 = mulai + rad(s)
    mulai = a2
    return (
      <path
        key={i}
        d={juringSudut([bx, by], rr, a1, a2)}
        fill={warna}
        fillOpacity={tebal + 0.03}
        stroke={warna}
        strokeWidth={1.8}
      />
    )
  })

  return (
    <>
      <polygon
        points={`${A[0]},${A[1]} ${B[0]},${B[1]} ${P[0]},${P[1]}`}
        fill="var(--m-ghost)"
        stroke="var(--ink)"
        strokeWidth={2.6}
        strokeLinejoin="round"
      />
      <path
        d={juringSudut(A, R, arah(A, B), arah(A, P))}
        fill={WARNA[0]}
        fillOpacity={terang('a', 'alfa')}
        stroke={WARNA[0]}
        strokeWidth={2}
      />
      <path
        d={juringSudut(B, R, arah(B, P), arah(B, A))}
        fill={WARNA[1]}
        fillOpacity={terang('b', 'beta')}
        stroke={WARNA[1]}
        strokeWidth={2}
      />
      <path
        d={juringSudut(P, R, arah(P, A), arah(P, B))}
        fill={WARNA[2]}
        fillOpacity={sorot === 'c' ? 0.62 : 0.34}
        stroke={WARNA[2]}
        strokeWidth={2}
      />

      {/* Label sudut tetap tampil selagi pojoknya diseret — lihat IsiBongkar. */}
      <Tag x={statis.a[0]} y={statis.a[1]} warna={WARNA[0]} size={L.hurufSudut}>
        {teksA}
      </Tag>
      <Tag x={statis.b[0]} y={statis.b[1]} warna={WARNA[1]} size={L.hurufSudut}>
        {teksB}
      </Tag>
      <Tag x={labelC[0]} y={labelC[1]} warna={WARNA[2]} size={L.hurufSudut}>
        {teksC}
      </Tag>

      {/* ketiga sudut yang sama, disusun berjajar */}
      {juring}
      <line
        x1={bx - rr - 24}
        y1={by}
        x2={bx + rr + 24}
        y2={by}
        stroke="var(--m-hi)"
        strokeWidth={sorot === 'lurus' ? 5 : 3}
      />
      <Tag x={bx} y={by + 24} warna="var(--m-hi)" size={L.hurufKipas}>
        {L.sempit ? 'selalu pas satu garis lurus' : 'selalu pas membentuk sudut lurus = 180°'}
      </Tag>

      {/* kedua pojok alas diseret di sepanjang garis alas — tanpa `label`,
          lihat alasannya di IsiBongkar */}
      <Pegangan
        x={A[0]}
        y={yAlas}
        param="alfa"
        arah="x"
        utama
        ajakan="Seret aku"
        keNilai={nilaiAlfa(L, beta)}
      />
      <Pegangan x={B[0]} y={yAlas} param="beta" arah="x" keNilai={nilaiBeta(L, alfa)} />
    </>
  )
}

/* ---------------- Modul konsep ---------------- */

const PARAM_SUDUT = [
  {
    key: 'alfa',
    label: 'Sudut kiri',
    min: MIN_SUDUT,
    max: MAKS_SUDUT,
    step: 1,
    awal: 62,
    satuan: '°',
    bulat: true,
    simbol: 'α',
    peran: 'a' as const,
    bagian: 'a',
  },
  {
    key: 'beta',
    label: 'Sudut kanan',
    min: MIN_SUDUT,
    max: MAKS_SUDUT,
    step: 1,
    awal: 48,
    satuan: '°',
    bulat: true,
    simbol: 'β',
    peran: 'b' as const,
    bagian: 'b',
  },
]

const konsep: Konsep = {
  id: 'sudut-segitiga',
  topicId: 'smp7-jumlah-sudut-segitiga-dan-sudut',
  judul: 'Jumlah sudut segitiga',
  pertanyaan: 'Kenapa jumlah sudut segitiga selalu 180°?',
  tagline: 'Sobek ketiga sudutnya, satukan. Selalu membentuk garis lurus. Selalu.',
  kelas: 7,
  domain: 'geometri',
  tags: ['segitiga', 'sudut', 'garis sejajar', 'sudut berseberangan'],

  tebak: {
    pertanyaan:
      'Sebuah segitiga dibuat sangat gepeng — hampir mendatar. Menurutmu jumlah ketiga sudutnya...',
    pilihan: [
      {
        id: 'a',
        label: 'Mengecil',
        balasan:
          'Dua sudutnya memang mengecil sampai hampir nol. Tapi coba perhatikan sudut yang di tengah: ia justru melebar mendekati 180°, dan persis menutup kekurangan itu.',
      },
      {
        id: 'b',
        label: 'Tetap 180°',
        benar: true,
        balasan:
          'Betul. Bentuk segitiganya boleh apa saja — gepeng, lancip, tumpul — jumlah sudutnya tidak pernah bergeser.',
      },
      {
        id: 'c',
        label: 'Membesar',
        balasan:
          'Sudut yang di tengah memang melebar mendekati 180°, tetapi dua sudut lainnya menyusut hampir nol dalam jumlah yang persis sama.',
      },
    ],
    penutup:
      'Yang menarik: ini bukan kebetulan yang berlaku untuk kebanyakan segitiga. Ada alasan yang memaksanya.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: PARAM_SUDUT,
    roles: { a: 'a', b: 'b', c: 'ab', lurus: 'hi' },
    arti: {
      a: 'Sudut di pojok kiri alas.',
      b: 'Sudut di pojok kanan alas.',
      c: 'Sudut di puncak.',
      lurus: 'Sudut lurus, yaitu sudut sepanjang garis lurus — besarnya selalu 180°.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Segitiga apa saja',
        narasi: (p) => {
          const { alfa, beta, gamma, diminta, dibatasi } = sudut(p)
          const ekor = dibatasi
            ? `Sudut kanan diminta ${fmt(diminta)}°, tetapi gambar memakai ${fmt(beta)}° supaya masih tersisa ruang untuk sudut puncak.`
            : 'Seret kedua pojok alasnya sesukamu — yang ingin kita ketahui: apakah jumlah ketiganya selalu sama, dan kenapa?'
          return `Tiga sudutnya, ${fmt(alfa)}°, ${fmt(beta)}°, dan ${fmt(gamma)}°, diberi warna berbeda. ${ekor}`
        },
        rumus: (p) => {
          const { alfa, beta, gamma } = sudut(p)
          return `[a:${fmt(alfa)}°] + [b:${fmt(beta)}°] + [c:${fmt(gamma)}°] = ?`
        },
        durasi: 1800,
      },
      {
        id: 's1',
        judul: 'Tarik garis sejajar alas lewat puncak',
        narasi:
          'Garis putus-putus ini sejajar dengan alas segitiga. Hanya itu yang kita tambahkan — tidak ada yang diubah dari segitiganya.',
        durasi: 2000,
      },
      {
        id: 's2',
        judul: 'Sudut kiri berpindah ke puncak',
        narasi: (p) => {
          const { alfa } = sudut(p)
          return `Karena kedua garis sejajar, sudut kiri ${fmt(alfa)}° dan sudut di puncak ini adalah sudut dalam berseberangan. Besarnya pasti sama, jadi yang naik ke puncak juga tepat ${fmt(alfa)}°.`
        },
        rumus: (p) => {
          const { alfa } = sudut(p)
          return `[a:${fmt(alfa)}°] di alas = [a:${fmt(alfa)}°] di puncak`
        },
        durasi: 2400,
      },
      {
        id: 's3',
        judul: 'Sudut kanan juga',
        narasi: (p) => {
          const { alfa, beta, gamma } = sudut(p)
          return `Alasan yang sama berlaku untuk sisi satunya, jadi ${fmt(beta)}° ikut naik ke puncak. Sekarang ketiga sudut segitiga — ${fmt(alfa)}°, ${fmt(beta)}°, dan ${fmt(gamma)}° — berkumpul di satu titik.`
        },
        rumus: (p) => {
          const { beta } = sudut(p)
          return `[b:${fmt(beta)}°] di alas = [b:${fmt(beta)}°] di puncak`
        },
        durasi: 2400,
      },
      {
        id: 's4',
        judul: 'Ketiganya memenuhi garis lurus',
        narasi: (p) => {
          const { alfa, beta, gamma } = sudut(p)
          return `Di puncak, ${fmt(alfa)}°, ${fmt(beta)}°, dan ${fmt(gamma)}° berjajar tanpa celah dan tanpa tumpang tindih. Bersama-sama ketiganya membentuk sudut lurus di sepanjang garis sejajar tadi.`
        },
        durasi: 2200,
      },
      {
        id: 's5',
        judul: 'Dan sudut lurus besarnya 180°',
        narasi: (p) => {
          const { alfa, beta, gamma } = sudut(p)
          return `Jadi ${fmt(alfa)}° + ${fmt(beta)}° + ${fmt(gamma)}° = 180°, dan itu bukan kebetulan. Seret pojok alasnya ke mana pun: ketiganya tetap harus memenuhi satu garis lurus.`
        },
        rumus: (p) => {
          const { alfa, beta, gamma } = sudut(p)
          return `[a:${fmt(alfa)}°] + [b:${fmt(beta)}°] + [c:${fmt(gamma)}°] = [lurus:180°]`
        },
        durasi: 2200,
      },
    ],
  },

  eksperimen: {
    judul: 'Ubah bentuk segitiganya',
    ajakan:
      'Seret pojok kiri dan pojok kanan alasnya — masing-masing membuka sudutnya sendiri. Kipas di bawah menyusun ketiganya berjajar: tidak pernah kurang, tidak pernah lebih.',
    params: PARAM_SUDUT,
    Visual: VisualEksperimen,
    rumus: (p) => {
      const { alfa, beta, gamma } = sudut(p)
      return `[a:${fmt(alfa)}°] + [b:${fmt(beta)}°] + [c:${fmt(gamma)}°] = [lurus:180°]`
    },
    temuan: (p) => {
      const { alfa, beta, gamma, diminta, dibatasi } = sudut(p)
      const jenis =
        Math.max(alfa, beta, gamma) > 90
          ? 'tumpul'
          : Math.max(alfa, beta, gamma) === 90
            ? 'siku-siku'
            : 'lancip'
      return (
        <p>
          <strong>
            {fmt(alfa)}° + {fmt(beta)}° + {fmt(gamma)}° = 180°
          </strong>
          . Segitiga ini {jenis}.{' '}
          {dibatasi &&
            `Sudut kanan diminta ${fmt(diminta)}°, tetapi gambar memakai ${fmt(beta)}°: dua sudut alas yang jumlahnya lebih dari ${fmt(MAKS_JUMLAH)}° tidak menyisakan sudut puncak yang masih terbaca. `}
          {jenis === 'tumpul'
            ? 'Karena satu sudutnya melebihi 90°, dua sudut lainnya hanya kebagian sisa kurang dari 90° — tidak mungkin ada dua sudut tumpul dalam satu segitiga.'
            : 'Coba buka salah satu sudut sampai melewati 90°: sudut ketiga langsung menyusut sebanyak yang sama untuk menjaga jumlahnya tetap 180°.'}{' '}
          Perhatikan juga bahwa sudut puncak tidak pernah bisa kamu pegang sendiri — ia selalu
          ditentukan oleh dua sudut alasnya.
        </p>
      )
    },
  },

  penjelasan: {
    SMP: (
      <>
        <p>
          Buktinya hanya memerlukan satu bahan: <strong>garis yang sejajar alas dan melewati
          puncak.</strong>
        </p>
        <p>
          Ketika dua garis sejajar dipotong oleh sebuah garis lain, terbentuk pasangan{' '}
          <strong>sudut dalam berseberangan</strong> yang besarnya sama. Sisi kiri segitiga adalah
          garis pemotong itu, sehingga sudut kiri alas sama besar dengan sudut di puncak pada sisi
          kiri. Hal yang sama berlaku untuk sisi kanan.
        </p>
        <p>
          Akibatnya, ketiga sudut segitiga berkumpul di puncak dan berjajar tepat memenuhi garis
          lurus. Karena sudut lurus besarnya 180°, jumlah ketiga sudut segitiga juga 180°.
        </p>
        <h4>Akibat yang langsung terpakai</h4>
        <ul>
          <li>Sebuah segitiga tidak mungkin punya dua sudut siku-siku atau dua sudut tumpul.</li>
          <li>Pada segitiga siku-siku, dua sudut lainnya pasti berjumlah 90°.</li>
          <li>Pada segitiga sama sisi, ketiga sudutnya masing-masing 60°.</li>
          <li>Sudut luar segitiga sama dengan jumlah dua sudut dalam yang tidak berdampingan.</li>
        </ul>
        <h4>Untuk segi banyak lainnya</h4>
        <p>
          Segi-n mana pun bisa dipotong menjadi (n − 2) segitiga, sehingga jumlah sudut dalamnya
          (n − 2) × 180°. Segi empat 360°, segi lima 540°, dan seterusnya.
        </p>
      </>
    ),
    SD: (
      <>
        <p>
          Coba gambar segitiga di kertas, lalu sobek ketiga pojoknya. Susun ketiga pojok itu
          berjajar dengan ujung-ujungnya bertemu.
        </p>
        <p>
          Hasilnya selalu <strong>garis lurus</strong> — tidak peduli segitiga apa yang kamu gambar,
          besar atau kecil, gemuk atau kurus.
        </p>
        <p>Dan setengah putaran penuh besarnya 180 derajat.</p>
        <p>
          Menyobek kertas menunjukkan <em>hasilnya</em>, tetapi belum menjelaskan <em>kenapa</em>{' '}
          selalu begitu. Alasannya ada pada garis sejajar yang dibongkar di atas.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Bukti ini bertumpu pada <strong>postulat kesejajaran</strong> Euclid: melalui sebuah titik
          di luar garis, ada tepat satu garis yang sejajar dengan garis itu. Tanpa postulat tersebut,
          kesamaan sudut dalam berseberangan tidak bisa dijamin.
        </p>
        <p>
          Karena itu "180°" bukan kebenaran mutlak, melainkan ciri khas <em>geometri datar</em>.
          Pada geometri lain hasilnya berbeda:
        </p>
        <ul>
          <li>
            <strong>Geometri bola</strong> (misalnya di permukaan Bumi, dengan sisi-sisi segitiga
            berupa busur lingkaran besar — "garis lurus" versi bola): jumlah sudut selalu{' '}
            <em>lebih dari</em> 180°. Segitiga dari kutub utara ke dua titik di khatulistiwa bahkan
            bisa memiliki tiga sudut siku-siku, jumlahnya 270°.
          </li>
          <li>
            <strong>Geometri hiperbolik</strong>: jumlahnya selalu <em>kurang dari</em> 180°.
          </li>
        </ul>
        <p>
          Kelebihan sudut di atas 180° pada bola bahkan sebanding dengan luas segitiganya (teorema
          Girard). Jadi pertanyaan "kenapa 180°" sebenarnya berujung pada pertanyaan yang lebih
          dalam: seperti apa bentuk ruang tempat kita menggambar.
        </p>
      </>
    ),
  },

  rumus: {
    src: '[a:α] + [b:β] + [c:γ] = [lurus:180°]',
    roles: { a: 'a', b: 'b', c: 'ab', lurus: 'hi' },
    arti: {
      a: 'Sudut pertama.',
      b: 'Sudut kedua.',
      c: 'Sudut ketiga — nilainya selalu terpaksa mengikuti dua sudut lainnya.',
      lurus: 'Besar sudut lurus. Muncul karena ketiga sudut itu berjajar memenuhi satu garis.',
    },
  },

  soal: [
    (rnd) => {
      const a = 30 + Math.floor(rnd() * 60)
      const b = 25 + Math.floor(rnd() * (140 - a))
      return {
        id: 'sud-1',
        tipe: 'angka',
        topicId: 'smp7-jumlah-sudut-segitiga-dan-sudut',
        kelas: 7,
        tingkat: 'mudah',
        konsep: 'sudut-segitiga',
        pertanyaan: `Dua sudut sebuah segitiga adalah ${a}° dan ${b}°. Berapa besar sudut ketiganya?`,
        jawaban: 180 - a - b,
        satuan: '°',
        toleransi: 1e-9,
        hint: [
          'Jumlah ketiga sudut segitiga selalu tetap. Berapa nilainya?',
          `Jumlahkan dulu dua sudut yang diketahui: ${a} + ${b} = ${a + b}.`,
          `Kurangkan dari 180: 180 − ${a + b}.`,
        ],
        pembahasan: `Sudut ketiga = 180° − ${a}° − ${b}° = ${180 - a - b}°.`,
      }
    },
    {
      id: 'sud-2',
      tipe: 'benar-salah',
      topicId: 'smp7-jumlah-sudut-segitiga-dan-sudut',
      kelas: 7,
      tingkat: 'sedang',
      konsep: 'sudut-segitiga',
      pertanyaan: 'Ada segitiga yang memiliki dua sudut siku-siku.',
      jawaban: false,
      diagnosa:
        'Dua sudut siku-siku saja sudah menghabiskan 90° + 90° = 180°. Tidak ada sisa untuk sudut ketiga, padahal setiap sudut segitiga harus lebih besar dari nol.',
      hint: [
        'Hitung jumlah dua sudut siku-siku.',
        'Berapa yang tersisa untuk sudut ketiga?',
        'Apakah sudut sebesar 0° mungkin membentuk segitiga?',
      ],
      pembahasan:
        'Salah. Dua sudut siku-siku sudah berjumlah 180°, sehingga sudut ketiga harus 0° — dan itu bukan segitiga. Dua sisi yang sama-sama tegak lurus alas saling sejajar, jadi tidak pernah bertemu untuk membentuk puncak.',
    },
    {
      id: 'sud-3',
      tipe: 'pilihan',
      topicId: 'smp7-jumlah-sudut-segitiga-dan-sudut',
      kelas: 8,
      tingkat: 'sedang',
      konsep: 'sudut-segitiga',
      pertanyaan:
        'Pada sebuah segitiga siku-siku, salah satu sudut lancipnya 35°. Berapa besar sudut lancip yang lain?',
      pilihan: [
        { id: 'a', label: '55°', benar: true },
        {
          id: 'b',
          label: '145°',
          diagnosa: 'Kamu mengurangkan 35 dari 180, tetapi lupa bahwa satu sudutnya sudah terpakai 90°.',
        },
        {
          id: 'c',
          label: '65°',
          diagnosa: 'Sepertinya 100 yang dikurangi, bukan 90. Jumlah dua sudut lancip pada segitiga siku-siku adalah 90°.',
        },
        { id: 'd', label: '35°', diagnosa: 'Kedua sudut lancip hanya sama besar bila keduanya 45°.' },
      ],
      hint: [
        'Satu sudutnya sudah 90°. Berapa sisa untuk dua sudut lainnya?',
        '180° − 90° = 90°, dan sisa itu adalah jumlah kedua sudut lancip (tidak harus sama besar).',
        'Jadi 90° − 35°.',
      ],
      pembahasan:
        'Pada segitiga siku-siku, kedua sudut lancip selalu berjumlah 90°. Jadi sudut yang lain 90° − 35° = 55°.',
    },
    {
      id: 'sud-4',
      tipe: 'urutkan',
      topicId: 'smp7-jumlah-sudut-segitiga-dan-sudut',
      kelas: 8,
      tingkat: 'sulit',
      konsep: 'sudut-segitiga',
      pertanyaan: 'Susun kembali alur pembuktian jumlah sudut segitiga.',
      langkah: [
        'Gambar garis yang sejajar alas dan melewati puncak',
        'Sisi-sisi segitiga memotong kedua garis sejajar itu',
        'Sudut dalam berseberangan sama besar, sehingga kedua sudut alas berpindah ke puncak',
        'Ketiga sudut kini berjajar memenuhi satu garis lurus',
        'Sudut lurus besarnya 180°, jadi jumlah ketiga sudut juga 180°',
      ],
      hint: [
        'Bukti dimulai dengan menambahkan sesuatu ke gambar.',
        'Sifat sudut berseberangan baru bisa dipakai setelah ada dua garis sejajar.',
      ],
      pembahasan:
        'Kunci buktinya adalah garis sejajar. Tanpanya, sudut alas tidak punya alasan untuk sama besar dengan sudut di puncak.',
    },
    (rnd) => {
      const n = 4 + Math.floor(rnd() * 6)
      return {
        id: 'sud-5',
        tipe: 'angka',
        topicId: 'smp7-jumlah-sudut-segitiga-dan-sudut',
        kelas: 8,
        tingkat: 'sulit',
        konsep: 'sudut-segitiga',
        pertanyaan: `Berapa jumlah seluruh sudut dalam sebuah segi ${n}?`,
        jawaban: (n - 2) * 180,
        satuan: '°',
        toleransi: 1e-9,
        hint: [
          'Segi banyak bisa dipotong menjadi beberapa segitiga. Pada segi banyak cembung, caranya cukup dengan menarik semua diagonal dari satu titik sudut.',
          `Segi ${n} terbagi menjadi ${n - 2} segitiga.`,
          `Kalikan banyaknya segitiga dengan 180°.`,
        ],
        pembahasan: `Segi ${n} bisa dibagi menjadi ${n - 2} segitiga, jadi jumlah sudut dalamnya (${n} − 2) × 180° = ${(n - 2) * 180}°.`,
      }
    },
  ],

  lanjut: ['pythagoras', 'segitiga-setengah', 'sin-cos-lingkaran'],
}

export default konsep
