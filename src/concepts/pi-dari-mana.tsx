/* ============================================================
   KONSEP — Kenapa π kira-kira 3,14?
   Kelas 6 · Pengukuran

   Gagasan pembuktian (jujur, bukan sekadar "hafalkan 3,14"):
   sebuah lingkaran digelindingkan satu putaran penuh di atas
   garis lurus. Karena menggelinding tanpa selip, jarak yang
   ditempuh pusatnya = sudut putar × jari-jari, sehingga satu
   putaran penuh (2π radian) meninggalkan jejak sepanjang tepi
   lingkaran itu sendiri — kelilingnya.

   Jejak itu lalu DIUKUR memakai diameter sebagai penggaris:
   diameter muat tiga kali penuh, dan masih tersisa sepotong
   kecil sepanjang 0,14159… × diameter. Ganti besar lingkarannya:
   panjang jejak berubah, panjang diameter berubah, tetapi
   POLANYA tidak — selalu 3 diameter lebih sedikit. Hasil bagi
   keliling : diameter itulah yang diberi nama π.

   Interaksi langsung (lihat docs/PANDUAN-INTERAKSI.md):
   - Bongkar langkah 0–4: puncak roda diseret naik-turun untuk
     membesarkan rodanya (y puncak = dasar − 2r, jadi keNilai
     benar-benar kebalikan rumus posisinya).
   - Bongkar langkah 5–6: ujung kanan jejak terpanjang ditarik
     mendatar; ketiga lingkaran ikut membesar bersama.
   - Eksperimen: ujung bawah jari-jari ditarik ke bawah.

   Yang dijaga agar tidak menyesatkan:
   - π BUKAN 3,14 dan BUKAN 22/7. Keduanya hampiran; 3,14 sedikit
     lebih kecil dari π, 22/7 sedikit lebih besar.
   - Menggelinding/mengukur tali tidak akan pernah membuktikan
     nilai π. Pengukuran selalu punya galat. Batas metafora ini
     disebut terang-terangan di bagian penjelasan.
   ============================================================ */

import { Pegangan, useInteraksi } from '../components/Interaksi'
import { Svg, Tag, Dimensi, useSempit, useUkuranLayar } from '../components/Stage'
import { fase, seg, easing } from '../lib/anim'
import { fmt, clamp } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

const TAU = Math.PI * 2

/** Rentang jari-jari pada bongkar — dipakai gambar, tata letak, dan ParamSpec. */
const JARI_MIN = 1.2
const JARI_MAKS = 3

/* ---------------- Tata letak ----------------
   Setiap panggung punya dua sistem koordinat: lebar untuk layar
   besar dan tegak untuk HP (useSempit). Skala piksel per satuan
   panjang selalu TETAP di dalam satu tata letak, supaya roda
   benar-benar tumbuh saat pegangannya ditarik — bukan diam di
   tempat karena gambarnya diperkecil sendiri.
   Batas skala datang dari jejaknya: panjang jejak 2πr, jadi
   jejak terpanjang harus tetap muat di dalam viewBox.           */

interface TataGulir {
  w: number
  h: number
  /** piksel per satuan panjang. */
  s: number
  /** titik sentuh sebelum roda bergerak. */
  mulaiX: number
  /** garis tempat roda menggelinding. */
  dasarY: number
  /** baris penggaris diameter. */
  ukurY: number
  judulY: number
  angkaY: number
  /** tebal kotak penggaris. */
  tebal: number
}

// r maksimum 3 → R = 75, jejak 2π·75 = 471 px. Titik berangkat harus lebih
// besar dari R supaya sisi kiri roda terbesar tidak keluar bingkai; setelah
// menggelinding sisi kanannya berhenti di 82 + 471 + 75 = 628 (< 660).
// Garis dasar sengaja rendah supaya puncak roda terbesar (y = 128) beserta
// label pegangannya tetap di bawah keterangan langkah.
const GULIR_LEBAR: TataGulir = {
  w: 660,
  h: 420,
  s: 25,
  mulaiX: 82,
  dasarY: 278,
  ukurY: 332,
  judulY: 30,
  angkaY: 392,
  tebal: 22,
}

// Di HP roda digambar sebesar yang masih memungkinkan: skalanya dibatasi oleh
// tempat mendarat roda, sebab setelah satu putaran penuh pusatnya ada di
// x = 58 + 2π·3·16 = 360 dan sisi kanannya (408) serta label pegangan di
// puncaknya harus tetap muat. Roda terbesar memakai 96 dari 420 satuan lebar,
// lebih lapang daripada 150 dari 660 pada tata letak lebar.
const GULIR_HP: TataGulir = {
  w: 420,
  h: 420,
  s: 16,
  mulaiX: 58,
  dasarY: 250,
  ukurY: 306,
  judulY: 34,
  angkaY: 384,
  tebal: 20,
}

/**
 * Keadaan lingkaran yang sudah menggelinding sejauh sudut `theta` radian.
 * Menggelinding tanpa selip: jarak tempuh pusat = sudut × jari-jari.
 * Tanda di tepi berangkat dari titik sentuh lalu ikut berputar.
 */
function roda(L: TataGulir, R: number, theta: number) {
  const cx = L.mulaiX + theta * R
  const cy = L.dasarY - R
  return {
    cx,
    cy,
    tx: cx - R * Math.sin(theta),
    ty: cy + R * Math.cos(theta),
  }
}

/** Lintasan yang ditempuh tanda tepi (sikloid), dari sudut 0 sampai `theta`. */
function jalurTanda(L: TataGulir, R: number, theta: number) {
  const n = 40
  let d = ''
  for (let i = 0; i <= n; i++) {
    const a = (theta * i) / n
    const x = L.mulaiX + a * R - R * Math.sin(a)
    const y = L.dasarY - R + R * Math.cos(a)
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)} `
  }
  return d.trim()
}

/* ---------------- Bagian gambar yang dipakai berulang ---------------- */

/** Lingkaran beserta diameter mendatar dan satu jari-jari ke tanda tepi. */
function Roda({
  L,
  R,
  r,
  theta,
  nyalaD,
  nyalaR,
  nyalaK,
  aktif,
}: {
  L: TataGulir
  R: number
  r: number
  theta: number
  nyalaD: boolean
  nyalaR: boolean
  nyalaK: boolean
  /** penggeser yang sedang dipegang; labelnya sudah tampil di pegangan. */
  aktif: string | null
}) {
  const { cx, cy, tx, ty } = roda(L, R, theta)
  // Setelah roda menggelinding jauh ke kanan, tidak ada lagi ruang untuk
  // angka jari-jari di sisi kanannya — labelnya pindah ke sisi kiri.
  const rKanan = L.w - (cx + 12) > 96
  // Angka jari-jari dan angka diameter berebut tempat yang sama di dalam
  // roda, jadi hanya satu yang tampil: angka r hanya muncul saat bagian
  // [jari:r] disorot, dan selama itu angka d mengalah (tetap terbaca pada
  // baris angka di bawah gambar).
  const labelR = nyalaR && aktif !== 'jari'
  return (
    <g>
      {/* tepi lingkaran = keliling; nanti tepi inilah yang terbentang jadi jejak */}
      <circle
        cx={cx}
        cy={cy}
        r={R}
        fill="var(--m-c-soft)"
        fillOpacity={0.3}
        stroke="var(--m-c)"
        strokeWidth={nyalaK ? 5.5 : 3}
        style={{ transition: 'stroke-width var(--d-1)' }}
      />
      {/* jari-jari menuju tanda tepi: bukti lingkarannya benar-benar berputar */}
      <line
        x1={cx}
        y1={cy}
        x2={tx}
        y2={ty}
        stroke="var(--m-b)"
        strokeWidth={nyalaR ? 5 : 3}
        strokeLinecap="round"
      />
      <circle cx={tx} cy={ty} r={nyalaR ? 8 : 6} fill="var(--m-b)" />
      {labelR && (
        <Tag
          x={rKanan ? cx + 12 : cx - 12}
          y={cy + R * 0.42}
          anchor={rKanan ? 'start' : 'end'}
          warna="var(--m-b)"
          size={16}
        >
          {`r = ${fmt(r, 1)}`}
        </Tag>
      )}
      {/* diameter mendatar: lebar lingkaran, penggaris kita nanti */}
      <line
        x1={cx - R}
        y1={cy}
        x2={cx + R}
        y2={cy}
        stroke="var(--m-a)"
        strokeWidth={nyalaD ? 7 : 4}
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={3.5} fill="var(--m-a)" />
      {/* Angka diameter menempel di bawah garis diameter. Pada roda terkecil
          ruang itu tidak cukup — angkanya tetap terbaca di baris bawah. */}
      {R >= 29 && !labelR && (
        <Tag x={cx} y={cy + 19} warna="var(--m-a)" size={nyalaD ? 18 : 15}>
          {`d = ${fmt(2 * r, 1)}`}
        </Tag>
      )}
    </g>
  )
}

/**
 * Jejak yang sudah diukur memakai diameter sebagai penggaris:
 * tiga kotak selebar d, lalu sisa kecil yang panjangnya (2π − 6)·R.
 */
function JejakTerukur({
  x,
  y,
  R,
  alpha = 1,
  alphaSisa = 1,
  nyalaD = false,
  nyalaSisa = false,
  tebal = 22,
}: {
  x: number
  y: number
  R: number
  /** 0..1, memunculkan tiga kotak diameter satu per satu. */
  alpha?: number
  alphaSisa?: number
  nyalaD?: boolean
  nyalaSisa?: boolean
  tebal?: number
}) {
  const dpx = 2 * R
  const sisaPx = TAU * R - 3 * dpx
  return (
    <g>
      {[0, 1, 2].map((i) => {
        const a = clamp(alpha * 3 - i, 0, 1)
        if (a <= 0) return null
        const x0 = x + i * dpx
        return (
          <g key={i} opacity={a}>
            <rect
              x={x0 + 1}
              y={y - tebal / 2}
              width={dpx - 2}
              height={tebal}
              rx={4}
              fill="var(--m-a-soft)"
              stroke="var(--m-a)"
              strokeWidth={nyalaD ? 3.5 : 2}
            />
            {/* huruf "d" hanya bila kotaknya cukup lebar untuk menampungnya */}
            {dpx >= 26 && (
              <Tag x={x0 + dpx / 2} y={y} size={14} warna="var(--m-a)" latar={null}>
                d
              </Tag>
            )}
          </g>
        )
      })}
      {alphaSisa > 0 && (
        <rect
          x={x + 3 * dpx + 1}
          y={y - tebal / 2}
          width={Math.max(2, sisaPx - 2)}
          height={tebal}
          rx={2}
          fill="var(--m-hi-soft)"
          stroke="var(--m-hi)"
          strokeWidth={nyalaSisa ? 3.5 : 2}
          opacity={alphaSisa}
        />
      )}
    </g>
  )
}

/* ---------------- Langkah 5–6: bandingkan tiga ukuran ---------------- */

interface TataBanding {
  w: number
  h: number
  /** piksel per satuan panjang. */
  s: number
  x0: number
  judulY: number
  piY: number
  /** garis jejak untuk lingkaran kecil, sedang, besar. */
  baris: [number, number, number]
  /** jarak baris teks dari jejaknya. */
  dy: number
  tebal: number
  teks: number
  /** x label "K : d" bila sebaris di kanan; null berarti ditulis di baris kedua. */
  kananX: number | null
}

// Jejak terpanjang 2π·(1,5·3)·19 = 537 px, berakhir di x = 587 (< 622).
const BANDING_LEBAR: TataBanding = {
  w: 660,
  h: 420,
  s: 19,
  x0: 50,
  judulY: 38,
  piY: 80,
  baris: [140, 250, 360],
  dy: 28,
  tebal: 18,
  teks: 14,
  kananX: 622,
}

// Di HP skalanya 12 supaya ujung jejak terpanjang (367) beserta label
// pegangannya tetap di dalam bingkai 420.
const BANDING_HP: TataBanding = {
  w: 420,
  h: 440,
  s: 12,
  x0: 28,
  judulY: 32,
  piY: 72,
  baris: [150, 262, 374],
  dy: 26,
  tebal: 16,
  teks: 13,
  kananX: null,
}

/** Tiga lingkaran sebangun: setengahnya, lingkaran tadi, dan satu setengah kalinya. */
const KELUARGA = [
  { nama: 'kecil', f: 0.5 },
  { nama: 'sedang', f: 1 },
  { nama: 'besar', f: 1.5 },
] as const

function BandingUkuran({
  step,
  t,
  r,
  sorot,
}: {
  step: number
  t: number
  r: number
  sorot: string | null
}) {
  const sempit = useSempit()
  const L = sempit ? BANDING_HP : BANDING_LEBAR
  const muncul = fase(step, t, 5)
  const namaPi = fase(step, t, 6)

  const nyalaD = sorot === 'diameter'
  const nyalaK = sorot === 'keliling'
  const nyalaPi = sorot === 'pi'

  // Jejak terpanjang (lingkaran besar) adalah yang dipegang: ujung kanannya
  // ditarik mendatar. x = x0 + 2π·(1,5r)·s, jadi kebalikannya persis ini.
  const fBesar = KELUARGA[2].f
  const ujungBesar = L.x0 + TAU * fBesar * r * L.s
  const munculBesar = clamp((muncul - 2 * 0.26) / 0.3, 0, 1)

  return (
    <Svg
      w={L.w}
      h={L.h}
      maxH={440}
      label="Tiga lingkaran berbeda ukuran, jejaknya sama-sama memuat tiga diameter ditambah sedikit sisa"
    >
      {/* Keterangan atas dijaga pendek di HP supaya tidak menyelinap ke bawah
          tombol layar penuh yang melayang di pojok kanan atas panggung. */}
      <Tag x={L.w / 2} y={L.judulY} warna="var(--ink-2)" size={17}>
        {step >= 6
          ? sempit
            ? 'sama untuk semua lingkaran'
            : 'polanya sama untuk lingkaran mana pun'
          : 'tarik ujung jejak terbawah'}
      </Tag>
      {namaPi > 0.25 && (
        <Tag x={L.w / 2} y={L.piY} warna="var(--m-hi)" size={20}>
          {`K : d = ${fmt(Math.PI, 5)}… = π`}
        </Tag>
      )}

      {KELUARGA.map((lk, i) => {
        const a = clamp((muncul - i * 0.26) / 0.3, 0, 1)
        if (a <= 0) return null
        const y = L.baris[i]
        const rSat = lk.f * r
        const R = rSat * L.s
        const panjang = TAU * R
        // Baris terakhir menulis keterangannya di BAWAH jejak, supaya ruang di
        // atasnya bebas untuk label pegangan. Di HP hasil baginya turun ke
        // baris kedua; urutan bacanya tetap nama lalu hasil bagi.
        const duaBaris = L.kananX === null
        const yTeks = i === 2 ? y + L.dy : y - L.dy - (duaBaris ? 22 : 0)
        const yRasio = duaBaris ? yTeks + 22 : yTeks
        return (
          <g key={lk.nama} opacity={a}>
            {/* jejak utuh di belakang, lalu penggaris diameter di atasnya */}
            <line
              x1={L.x0}
              y1={y}
              x2={L.x0 + panjang}
              y2={y}
              stroke="var(--m-c)"
              strokeWidth={nyalaK ? L.tebal + 12 : L.tebal + 8}
              strokeLinecap="butt"
              opacity={0.22}
            />
            <JejakTerukur
              x={L.x0}
              y={y}
              R={R}
              alpha={a}
              alphaSisa={a}
              nyalaD={nyalaD}
              nyalaSisa={nyalaPi}
              tebal={L.tebal}
            />
            <Tag x={L.x0} y={yTeks} anchor="start" warna="var(--ink-2)" size={L.teks}>
              {`${lk.nama} · d = ${fmt(2 * rSat, 2)} · K = ${fmt(TAU * rSat, 2)}`}
            </Tag>
            <Tag
              x={L.kananX ?? L.x0}
              y={yRasio}
              anchor={L.kananX !== null ? 'end' : 'start'}
              warna={namaPi > 0.25 ? 'var(--m-hi)' : 'var(--ink-2)'}
              size={namaPi > 0.25 ? L.teks + 2 : L.teks}
            >
              {`K : d = ${fmt(Math.PI, 5)}`}
            </Tag>
          </g>
        )
      })}

      {/* Ujung jejak terpanjang: tarik mendatar, ketiganya ikut membesar.
          Di sini pegangan tidak diberi 'utama' — ajakan "Tarik aku" akan jatuh
          tepat di atas keterangan baris terbawah. Sebagai gantinya angkanya
          tampil terus, jadi titiknya tetap terbaca sebagai sesuatu yang hidup.
          Denyut dan ajakan sudah diperoleh anak pada langkah 0–4. */}
      <Pegangan
        x={ujungBesar}
        y={L.baris[2]}
        param="jari"
        arah="x"
        label={`r = ${fmt(r, 1)}`}
        labelSelalu
        sembunyi={munculBesar <= 0.05}
        keNilai={(pt) => (pt.x - L.x0) / (TAU * fBesar * L.s)}
      />
    </Svg>
  )
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const sempit = useSempit()
  const u = useUkuranLayar()
  const aktif = useInteraksi()?.kendali.aktif ?? null
  const r = clamp(p.jari ?? 2.4, JARI_MIN, JARI_MAKS)

  if (step >= 5) return <BandingUkuran step={step} t={t} r={r} sorot={sorot} />

  const L = sempit ? GULIR_HP : GULIR_LEBAR
  // Pegangan mengambang di atas tepi roda supaya tidak berebut tempat dengan
  // tanda tepi yang ikut berputar. Jaraknya TIDAK boleh bergantung pada r —
  // keNilai memakai angka yang sama, jadi kebalikannya harus tetap tepat —
  // dan dijepit di antara dua syarat:
  //   bawah: gelembung "Tarik aku" menggantung ±43 px di bawah pegangan;
  //          pada roda terkecil gelembung itu harus berhenti di atas garis
  //          diameternya, bukan menutupinya;
  //   atas:  label nilai melayang ±43 px di atas pegangan dan pada roda
  //          terbesar harus tetap di bawah keterangan langkah.
  const angkat = Math.max(
    u(16, 16),
    Math.min(
      u(43, 43) + 4 - JARI_MIN * L.s,
      L.dasarY - 2 * JARI_MAKS * L.s - L.judulY - u(60, 60),
    ),
  )
  const R = r * L.s
  const d = 2 * r
  const K = TAU * r
  const sisa = K - 3 * d
  const Lpx = TAU * R

  const nyalaD = sorot === 'diameter'
  const nyalaR = sorot === 'jari'
  const nyalaK = sorot === 'keliling'
  const nyalaPi = sorot === 'pi'

  /* --- kemajuan tiap tahap --- */
  const gulir = fase(step, t, 1)
  const theta = TAU * easing.inOutCubic(gulir)
  const { cx } = roda(L, R, theta)
  const sorotJejak = step === 2 ? seg(t, 0, 0.55) : step > 2 ? 1 : 0
  const ukur = fase(step, t, 3)
  const sisaMuncul = fase(step, t, 4)
  const jejakPx = cx - L.mulaiX

  return (
    <Svg
      w={L.w}
      h={L.h}
      maxH={430}
      label="Lingkaran menggelinding satu putaran, jejaknya diukur memakai diameter"
    >
      {/* garis tempat lingkaran menggelinding */}
      <line
        x1={6}
        y1={L.dasarY}
        x2={L.w - 6}
        y2={L.dasarY}
        stroke="var(--m-grid)"
        strokeWidth={2}
      />

      {/* lintasan tanda tepi — memperlihatkan gerak berputar sekaligus maju */}
      {theta > 0.05 && step <= 2 && (
        <path
          d={jalurTanda(L, R, theta)}
          fill="none"
          stroke="var(--m-b)"
          strokeWidth={1.6}
          strokeDasharray="4 6"
          opacity={0.45}
        />
      )}

      {/* jejak yang tertinggal di garis: panjangnya tumbuh bersama sudut putar */}
      {jejakPx > 0.5 && (
        <line
          x1={L.mulaiX}
          y1={L.dasarY}
          x2={L.mulaiX + jejakPx}
          y2={L.dasarY}
          stroke="var(--m-c)"
          strokeWidth={nyalaK ? 12 : 7 + 3 * sorotJejak}
          strokeLinecap="round"
          style={{ transition: 'stroke-width var(--d-1)' }}
        />
      )}

      {/* tanda berangkat dan mendarat */}
      <line
        x1={L.mulaiX}
        y1={L.dasarY - 9}
        x2={L.mulaiX}
        y2={L.dasarY + 12}
        stroke="var(--m-axis)"
        strokeWidth={2}
      />
      {step >= 2 && (
        <line
          x1={L.mulaiX + Lpx}
          y1={L.dasarY - 9}
          x2={L.mulaiX + Lpx}
          y2={L.dasarY + 12}
          stroke="var(--m-axis)"
          strokeWidth={2}
        />
      )}
      {step === 1 && (
        <Tag x={L.mulaiX} y={L.dasarY + 28} anchor="start" warna="var(--ink-2)" size={14}>
          berangkat
        </Tag>
      )}

      {/* panjang jejak diberi nama: keliling */}
      {step === 2 && (
        <Dimensi
          x1={L.mulaiX}
          y1={L.dasarY}
          x2={L.mulaiX + Lpx}
          y2={L.dasarY}
          offset={32}
          label={`K = ${fmt(K, 2)}`}
          warna="var(--m-c)"
          size={16}
        />
      )}

      {/* garis bantu: batas tiap diameter ditarik ke jejak di atasnya */}
      {ukur > 0 &&
        [0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1={L.mulaiX + i * 2 * R}
            y1={L.dasarY}
            x2={L.mulaiX + i * 2 * R}
            y2={L.ukurY - 12}
            stroke="var(--m-axis)"
            strokeWidth={1.2}
            strokeDasharray="3 4"
            opacity={0.4 * clamp(ukur * 3 - i + 1, 0, 1)}
          />
        ))}
      {sisaMuncul > 0 && (
        <line
          x1={L.mulaiX + Lpx}
          y1={L.dasarY}
          x2={L.mulaiX + Lpx}
          y2={L.ukurY - 12}
          stroke="var(--m-hi)"
          strokeWidth={1.4}
          strokeDasharray="3 4"
          opacity={0.6 * sisaMuncul}
        />
      )}

      {/* penggaris diameter di bawah jejak */}
      {ukur > 0 && (
        <JejakTerukur
          x={L.mulaiX}
          y={L.ukurY}
          R={R}
          alpha={ukur}
          alphaSisa={sisaMuncul}
          nyalaD={nyalaD}
          nyalaSisa={nyalaPi}
          tebal={L.tebal}
        />
      )}
      {/* label sisa rata kanan pada ujung jejak, supaya tidak keluar bingkai
          saat rodanya sebesar-besarnya */}
      {sisaMuncul > 0.4 && (
        <Tag
          x={L.mulaiX + Lpx}
          y={L.ukurY + 34}
          anchor="end"
          warna="var(--m-hi)"
          size={15}
        >
          {`sisa ≈ 0,14 × d`}
        </Tag>
      )}

      {/* lingkaran yang menggelinding */}
      <Roda
        L={L}
        R={R}
        r={r}
        theta={theta}
        nyalaD={nyalaD}
        nyalaR={nyalaR}
        nyalaK={nyalaK}
        aktif={aktif}
      />

      {/* Keterangan tiap tahap. Di HP kalimatnya dipendekkan supaya tidak
          menyelinap ke bawah tombol layar penuh di pojok kanan atas. */}
      {step === 0 && (
        <Tag x={L.w / 2} y={L.judulY} warna="var(--m-a)" size={16}>
          {sempit ? 'diameter: tepi ke tepi' : 'diameter = jarak tepi ke tepi lewat pusat'}
        </Tag>
      )}
      {step === 1 && (
        <Tag x={L.w / 2} y={L.judulY} warna="var(--m-b)" size={16}>
          {sempit
            ? `${fmt(theta / TAU, 2)} putaran · maju ${fmt(theta * r, 2)}`
            : `${fmt(theta / TAU, 2)} putaran · maju ${fmt(theta * r, 2)} satuan`}
        </Tag>
      )}
      {step === 2 && (
        <Tag x={L.w / 2} y={L.judulY} warna="var(--m-c)" size={16}>
          {sempit ? 'satu putaran = satu keliling' : 'satu putaran penuh = satu keliling'}
        </Tag>
      )}
      {step === 3 && (
        <Tag x={L.w / 2} y={L.judulY} warna="var(--m-a)" size={16}>
          diameter muat 3 kali penuh
        </Tag>
      )}
      {step === 4 && (
        <Tag x={L.w / 2} y={L.judulY} warna="var(--m-hi)" size={16}>
          {`masih tersisa ${fmt(sisa, 2)} satuan`}
        </Tag>
      )}

      {/* angka hidup yang ikut besar rodanya */}
      <Tag x={L.w / 2} y={L.angkaY} warna="var(--ink-2)" size={15} latar={null}>
        {step < 2
          ? `d = ${fmt(d, 1)} satuan`
          : sempit
            ? `d = ${fmt(d, 1)} · keliling = ${fmt(K, 2)}`
            : `d = ${fmt(d, 1)} satuan · keliling = ${fmt(K, 2)} satuan`}
      </Tag>

      {/* Puncak roda: tarik naik-turun untuk membesarkan rodanya.
          Pegangannya di y = dasar − 2r·s − angkat, jadi keNilai membalik
          rumus itu persis. Tangkainya memperlihatkan bahwa ia milik roda. */}
      <line
        x1={cx}
        y1={L.dasarY - 2 * R}
        x2={cx}
        y2={L.dasarY - 2 * R - angkat}
        stroke="var(--m-b)"
        strokeWidth={2}
      />
      <Pegangan
        x={cx}
        y={L.dasarY - 2 * R - angkat}
        param="jari"
        arah="y"
        utama
        ajakan="Tarik aku"
        label={`r = ${fmt(r, 1)}`}
        keNilai={(pt) => (L.dasarY - angkat - pt.y) / (2 * L.s)}
      />
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen bebas ---------------- */

interface TataEks {
  w: number
  h: number
  /** piksel per satuan panjang; tetap, supaya lingkarannya benar-benar tumbuh. */
  s: number
  cx: number
  cy: number
  panelX: number
  yD: number
  yK: number
  yRasio: number
  yCatatan: number
  ukKecil: number
  ukRasio: number
  jejakX: number
  jejakY: number
  judulJejakY: number
  sisaY: number
  tebal: number
}

// r maksimum 5 → jejak 2π·5·18 = 565 px, berakhir di x = 611 (< 630).
const EKS_LEBAR: TataEks = {
  w: 660,
  h: 430,
  s: 18,
  cx: 150,
  cy: 138,
  panelX: 292,
  yD: 100,
  yK: 140,
  yRasio: 192,
  yCatatan: 226,
  ukKecil: 16,
  ukRasio: 21,
  jejakX: 46,
  jejakY: 344,
  judulJejakY: 300,
  sisaY: 394,
  tebal: 22,
}

// Di HP skalanya 12: jejak terpanjang 377 px, berakhir di x = 399 (< 420).
const EKS_HP: TataEks = {
  w: 420,
  h: 410,
  s: 12,
  cx: 112,
  cy: 146,
  panelX: 200,
  yD: 108,
  yK: 146,
  yRasio: 196,
  yCatatan: 228,
  ukKecil: 14,
  ukRasio: 18,
  jejakX: 22,
  jejakY: 320,
  judulJejakY: 278,
  sisaY: 368,
  tebal: 18,
}

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const sempit = useSempit()
  const aktif = useInteraksi()?.kendali.aktif ?? null
  const L = sempit ? EKS_HP : EKS_LEBAR
  const r = clamp(p.jari ?? 3, 1, 5)
  const R = r * L.s
  const d = 2 * r
  const K = TAU * r
  const sisa = K - 3 * d
  const cx = L.cx
  const cy = L.cy

  const nyalaD = sorot === 'diameter'
  const nyalaR = sorot === 'jari'
  const nyalaK = sorot === 'keliling'
  const nyalaPi = sorot === 'pi'

  return (
    <Svg
      w={L.w}
      h={L.h}
      maxH={440}
      label="Lingkaran yang bisa diubah jari-jarinya, beserta kelilingnya yang dibentangkan"
    >
      {/* lingkaran beserta diameter dan jari-jarinya */}
      <circle
        cx={cx}
        cy={cy}
        r={R}
        fill="var(--m-c-soft)"
        fillOpacity={0.3}
        stroke="var(--m-c)"
        strokeWidth={nyalaK ? 6 : 3.5}
      />
      <line
        x1={cx - R}
        y1={cy}
        x2={cx + R}
        y2={cy}
        stroke="var(--m-a)"
        strokeWidth={nyalaD ? 7 : 4}
        strokeLinecap="round"
      />
      <line
        x1={cx}
        y1={cy}
        x2={cx}
        y2={cy + R}
        stroke="var(--m-b)"
        strokeWidth={nyalaR ? 5 : 3}
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={3.5} fill="var(--m-a)" />
      {/* Angka diameter menempel di atas garis diameter. Saat pegangan
          dipegang, label nilainya melayang tepat di tempat ini — jadi angka
          d mengalah dan tetap terbaca di papan angka sebelah. */}
      {aktif !== 'jari' && (
        <Tag x={cx} y={cy - 20} warna="var(--m-a)" size={nyalaD ? 18 : 15}>
          {`d = ${fmt(d, 1)}`}
        </Tag>
      )}
      {/* label r di kiri jari-jari; saat pegangannya ditarik, pegangan itu
          sendiri yang menampilkan angkanya */}
      {aktif !== 'jari' && (
        <Tag
          x={cx - 12}
          y={cy + R / 2}
          anchor="end"
          warna="var(--m-b)"
          size={nyalaR ? 17 : 14}
        >
          {`r = ${fmt(r, 1)}`}
        </Tag>
      )}

      {/* papan angka */}
      <Tag x={L.panelX} y={L.yD} anchor="start" warna="var(--m-a)" size={L.ukKecil}>
        {`diameter d = ${fmt(d, 2)} cm`}
      </Tag>
      <Tag x={L.panelX} y={L.yK} anchor="start" warna="var(--m-c)" size={L.ukKecil}>
        {`keliling K = ${fmt(K, 2)} cm`}
      </Tag>
      <Tag
        x={L.panelX}
        y={L.yRasio}
        anchor="start"
        warna="var(--m-hi)"
        size={nyalaPi ? L.ukRasio + 3 : L.ukRasio}
      >
        {`K : d = ${fmt(K / d, 5)}`}
      </Tag>
      <Tag
        x={L.panelX}
        y={L.yCatatan}
        anchor="start"
        warna="var(--ink-2)"
        size={sempit ? 13 : 14}
        latar={null}
      >
        {sempit ? 'tidak ikut berubah' : 'tarik tepi lingkarannya, angka ini tetap'}
      </Tag>

      {/* keliling dibentangkan lalu diukur pakai diameter */}
      <Tag
        x={L.jejakX}
        y={L.judulJejakY}
        anchor="start"
        warna="var(--ink-2)"
        size={sempit ? 13 : 14}
        latar={null}
      >
        {sempit
          ? 'keliling dibentangkan, diukur pakai d:'
          : 'keliling yang dibentangkan, diukur pakai diameter:'}
      </Tag>
      <line
        x1={L.jejakX}
        y1={L.jejakY}
        x2={L.jejakX + TAU * R}
        y2={L.jejakY}
        stroke="var(--m-c)"
        strokeWidth={nyalaK ? L.tebal + 12 : L.tebal + 8}
        strokeLinecap="butt"
        opacity={0.22}
      />
      <JejakTerukur
        x={L.jejakX}
        y={L.jejakY}
        R={R}
        nyalaD={nyalaD}
        nyalaSisa={nyalaPi}
        tebal={L.tebal}
      />
      <Tag
        x={L.jejakX}
        y={L.sisaY}
        anchor="start"
        warna="var(--ink-2)"
        size={sempit ? 13 : 15}
        latar={null}
      >
        {sempit
          ? `3 diameter penuh, sisa ≈ ${fmt(sisa, 2)} cm`
          : `3 diameter penuh, sisa = 0,14159… × d ≈ ${fmt(sisa, 2)} cm`}
      </Tag>

      {/* Ujung bawah jari-jari: tarik ke bawah, lingkarannya membesar.
          Titik itu berada di y = cy + r·s, jadi keNilai membalik rumus itu. */}
      <Pegangan
        x={cx}
        y={cy + R}
        param="jari"
        arah="y"
        utama
        ajakan="Tarik aku"
        label={`r = ${fmt(r, 1)}`}
        keNilai={(pt) => (pt.y - cy) / L.s}
      />
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'pi-dari-mana',
  topicId: 'sd6-keliling-dan-luas-lingkaran',
  judul: 'Bilangan π',
  pertanyaan: 'Kenapa π ≈ 3,14 — kenapa bukan angka lain?',
  tagline: 'Gulingkan lingkaran apa pun. Hasilnya selalu angka yang sama. Kenapa bisa begitu?',
  kelas: 6,
  domain: 'pengukuran',
  tags: ['pi', 'keliling', 'diameter', 'lingkaran'],

  tebak: {
    pertanyaan:
      'Kamu punya tutup botol kecil dan ban mobil besar. Untuk masing-masing, kelilingnya dibagi diameternya. Hasil bagi mana yang lebih besar?',
    pilihan: [
      {
        id: 'a',
        label: 'Ban mobil, jelas jauh lebih besar',
        balasan:
          'Keliling ban memang jauh lebih panjang. Tapi diameternya juga ikut jauh lebih besar. Dua-duanya membesar bersama-sama.',
      },
      {
        id: 'b',
        label: 'Tutup botol, karena bentuknya lebih bulat',
        balasan:
          'Godaannya masuk akal: benda kecil terasa "lebih rapi". Tapi semua lingkaran sama bulatnya — besar kecil tidak mengubah bentuknya.',
      },
      {
        id: 'c',
        label: 'Sama saja, kira-kira 3,14',
        benar: true,
        balasan:
          'Betul. Dan yang lebih mengejutkan: angka itu sama untuk setiap lingkaran di dunia, sekecil atau sebesar apa pun.',
      },
      {
        id: 'd',
        label: 'Tergantung bahan dan tebal bendanya',
        balasan:
          'Bahan tidak ikut dihitung. Yang diukur cuma dua panjang: keliling dan diameter.',
      },
    ],
    penutup:
      'Sebentar lagi kamu gelindingkan sendiri lingkarannya, lalu ukur jejaknya memakai diameter. Angkanya akan muncul dengan sendirinya.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      {
        key: 'jari',
        label: 'Jari-jari',
        min: JARI_MIN,
        max: JARI_MAKS,
        step: 0.2,
        awal: 2.4,
        simbol: 'r',
        peran: 'b',
        bagian: 'jari',
      },
    ],
    roles: { keliling: 'c', diameter: 'a', jari: 'b', pi: 'hi' },
    arti: {
      keliling: 'Panjang tepi lingkaran — sama dengan panjang jejak satu putaran penuh.',
      diameter: 'Jarak lurus dari tepi ke tepi yang lewat pusat. Panjangnya dua kali jari-jari.',
      jari: 'Jarak dari pusat ke tepi. Di gambar, ini garis yang menunjuk ke tanda pada tepi.',
      pi: 'Hasil bagi keliling dengan diameter. Selalu sama untuk semua lingkaran.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Satu lingkaran, satu diameter',
        narasi:
          'Lingkaran ini berdiri di atas garis. Yang kita tandai cuma dua: jari-jari dari pusat ke tepi, dan diameter yang menembus pusat dari tepi ke tepi.',
        rumus: '[diameter:d] = 2 × [jari:r]',
        durasi: 1600,
      },
      {
        id: 's1',
        judul: 'Gelindingkan satu putaran penuh',
        narasi:
          'Lingkaran diputar sekali penuh tanpa selip. Perhatikan tanda di tepinya: berangkat dari garis, dan mendarat lagi di garis.',
        durasi: 2400,
      },
      {
        id: 's2',
        judul: 'Jejaknya adalah kelilingnya',
        narasi:
          'Karena tidak selip, setiap potongan kecil tepi lingkaran menempel pada potongan garis yang sama panjang, dan dalam satu putaran setiap potongan tepi menempel satu kali. Jadi panjang jejak dari titik berangkat sampai titik mendarat sama dengan panjang tepinya sendiri.',
        rumus: 'panjang jejak = [keliling:K]',
        durasi: 1800,
      },
      {
        id: 's3',
        judul: 'Ukur jejak itu memakai diameter',
        narasi:
          'Sekarang diameter dijadikan penggaris, dan salinannya dijejerkan di sepanjang jejak. Muat tiga kali penuh — dan ini terjadi pada lingkaran mana pun.',
        rumus: '[keliling:K] = 3 × [diameter:d] + sisa',
        durasi: 2200,
      },
      {
        id: 's4',
        judul: 'Sisanya sepotong kecil',
        narasi: (p) => {
          const r = clamp(p.jari ?? 2.4, JARI_MIN, JARI_MAKS)
          return `Setelah tiga diameter masih ada sisa sepanjang ${fmt(TAU * r - 6 * r, 2)} satuan. Panjangnya kira-kira 0,14 kali diameter — belum sampai sepertujuh diameter.`
        },
        rumus: 'sisa ≈ 0,14 × [diameter:d]',
        durasi: 2000,
      },
      {
        id: 's5',
        judul: 'Ganti ukuran lingkarannya',
        narasi:
          'Tarik ujung jejak paling bawah: lingkaran kecil, sedang, dan besar punya jejak dan diameter yang berbeda panjang, tetapi polanya sama persis — tiga diameter ditambah sepotong kecil sisa. Ini bukan kebetulan, sebab lingkaran besar hanyalah lingkaran kecil yang diperbesar, jadi keliling dan diameternya dikali angka yang sama.',
        rumus: '[keliling:K] : [diameter:d] = 3,14159…',
        durasi: 2400,
      },
      {
        id: 's6',
        judul: 'Angka tetap itu bernama π',
        narasi:
          'Karena hasil bagi keliling dan diameter tidak pernah berubah, angka itu diberi nama sendiri: π. Jadi keliling = π kali diameter.',
        rumus: '[keliling:K] = [pi:π] × [diameter:d] = 2 × [pi:π] × [jari:r]',
        durasi: 2200,
      },
    ],
  },

  eksperimen: {
    judul: 'Tarik tepi lingkarannya. Awasi angka hasil bagi.',
    ajakan:
      'Tarik titik jingga di ujung bawah jari-jari untuk membesarkan lingkarannya. Keliling berubah, diameter berubah — satu angka tidak mau ikut.',
    params: [
      {
        key: 'jari',
        label: 'Jari-jari',
        min: 1,
        max: 5,
        step: 0.5,
        awal: 3,
        satuan: 'cm',
        simbol: 'r',
        peran: 'b',
        bagian: 'jari',
      },
    ],
    Visual: VisualEksperimen,
    rumus: (p) => {
      const r = clamp(p.jari ?? 3, 1, 5)
      return `[keliling:K] : [diameter:d] = ${fmt(TAU * r, 2)} : ${fmt(2 * r, 1)} = [pi:π] = ${fmt(Math.PI, 5)}…`
    },
    temuan: (p) => {
      const r = clamp(p.jari ?? 3, 1, 5)
      const d = 2 * r
      const K = TAU * r
      const sisa = K - 3 * d
      return (
        <p>
          Jari-jari sekarang {fmt(r, 1)} cm, jadi diameternya {fmt(d, 1)} cm dan kelilingnya{' '}
          {fmt(K, 2)} cm. Jejak sepanjang itu memuat <strong>3 diameter penuh</strong>, tersisa{' '}
          {fmt(sisa, 2)} cm — dan sisa itu {fmt(sisa / d, 5)}… kali diameter.{' '}
          <strong>Hasil bagi K : d = {fmt(K / d, 5)}…</strong> Tarik tepinya sejauh apa pun, angka
          itu tidak bergerak: keliling dan diameter selalu membesar bersama dengan perbandingan yang
          sama.
        </p>
      )
    },
  },

  penjelasan: {
    SD: (
      <>
        <p>
          Bayangkan kamu memberi tanda cat pada ban sepeda, lalu mendorongnya lurus sampai tanda itu
          kembali menyentuh tanah. Asal bannya tidak tergelincir, jarak yang dilewatinya sama dengan
          panjang keliling ban — karena seluruh tepi ban sudah menempel ke tanah tepat satu kali.
        </p>
        <p>
          Sekarang ukur jarak tadi memakai <strong>garis tengah ban</strong> (diameternya: jarak
          dari tepi ke tepi lewat pusat roda, bukan tebal karetnya) sebagai penggaris. Garis tengah
          itu muat <strong>tiga kali</strong>, lalu masih ada sisa sedikit, kira-kira sepertujuh
          garis tengah ban.
        </p>
        <p>
          Coba pakai ban sepeda anak, lalu ban truk. Jaraknya jelas beda jauh, tapi hasilnya tetap:
          sedikit lebih dari tiga kali garis tengah ban. Angka "tiga koma sekian" itulah yang dinamai{' '}
          <strong>π</strong> (dibaca "pi").
        </p>
        <p>
          <strong>Hati-hati:</strong> π bukan tepat 3,14. Angkanya 3,14159265… dan angka di belakang
          koma tidak pernah habis serta tidak pernah mengulang pola. 3,14 hanyalah potongan pertama
          supaya mudah dihitung.
        </p>
        <p>
          <strong>Batas percobaan ini:</strong> menggelindingkan ban atau melingkarkan tali tidak
          akan pernah membuktikan angka π. Penggaris dan tali selalu punya sedikit galat. Percobaan
          ini membuat kita <em>melihat</em> bahwa angkanya selalu sama. Alasan pastinya: lingkaran
          ban besar hanyalah lingkaran ban kecil yang diperbesar, jadi keliling dan garis tengahnya
          ikut membesar bersama. Angka-angka π di belakang koma dicari dengan hitungan, bukan dengan mengukur.
        </p>
      </>
    ),
    SMP: (
      <>
        <p>
          Kunci soalnya bukan pengukuran, melainkan <strong>kesebangunan</strong>. Semua lingkaran
          sebangun: lingkaran mana pun dapat diperoleh dari lingkaran lain dengan perbesaran
          (dilatasi) berfaktor <em>k</em>, lalu digeser bila perlu (menggeser tidak mengubah
          panjang apa pun).
        </p>
        <p>
          Perbesaran mengalikan <em>setiap</em> panjang dengan <em>k</em>. Jadi kalau lingkaran
          diperbesar, kelilingnya menjadi <em>k</em>·K dan diameternya menjadi <em>k</em>·d.
          Hasil baginya menjadi (k·K)/(k·d) = K/d — <em>k</em> saling menghapus. Itulah sebabnya
          hasil bagi keliling terhadap diameter merupakan bilangan tetap untuk semua lingkaran, dan
          bilangan tetap itu kita sebut π.
        </p>
        <p>
          Perhatikan urutan berpikirnya: π <strong>didefinisikan</strong> sebagai K/d. Rumus K = πd
          dan K = 2πr bukan penemuan terpisah, melainkan definisi yang ditulis ulang (karena d = 2r).
        </p>
        <p>
          Archimedes menghitung π tanpa mengukur satu tali pun: ia mengapit lingkaran di antara
          segi-96 di dalam dan segi-96 di luar, lalu memperoleh 3 <sup>10</sup>⁄<sub>71</sub> &lt; π
          &lt; 3 <sup>1</sup>⁄<sub>7</sub>, yaitu 3,1408 &lt; π &lt; 3,1429.
        </p>
        <p>
          Dari situ terlihat dua hampiran yang sering dipakai berada di sisi berlawanan: 3,14
          sedikit <strong>lebih kecil</strong> dari π, sedangkan 22/7 = 3,142857… sedikit{' '}
          <strong>lebih besar</strong>. Menulis π = 22/7 adalah kesalahan, bukan sekadar
          pembulatan yang sah.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Secara formal, keliling lingkaran didefinisikan sebagai <strong>limit</strong> keliling
          segi-n beraturan yang semua titik sudutnya terletak pada lingkaran itu. Segi-n seperti itu
          pada lingkaran berjari-jari <em>r</em> memiliki keliling
        </p>
        <p style={{ textAlign: 'center' }}>P(n) = 2nr·sin(180°/n)</p>
        <p>
          Perhatikan: P(n)/d = n·sin(180°/n) sama sekali tidak memuat <em>r</em> — bukti lain bahwa
          K/d sama untuk semua lingkaran. Barisan ini naik dan terbatas di atas oleh keliling segi-n
          beraturan yang melingkupi lingkaran, sehingga limitnya ada; nilai limit P(n)/d itulah π
          (untuk n = 96 sudah diperoleh 3,14103…). Inilah yang menjamin "panjang jejak" pada animasi
          tadi benar-benar terdefinisi, bukan sekadar hasil pengukuran. Dengan sudut dalam radian
          (180° = π), pernyataan P(n) → 2πr setara dengan limit sin x / x → 1 saat x → 0; keduanya
          bersandar pada definisi yang sama, jadi limit itu bukan bukti terpisah tentang nilai π.
        </p>
        <p>
          Animasi menggelinding sendiri adalah pernyataan bahwa <strong>panjang busur</strong>{' '}
          memenuhi s = rθ dengan θ dalam radian. Pusat roda bergerak sejauh rθ, dan satu putaran
          penuh berarti θ = 2π, sehingga s = 2πr. Radian didefinisikan justru agar hubungan ini
          berlaku tanpa faktor tambahan.
        </p>
        <p>
          Sifat bilangan π: <strong>irasional</strong> (dibuktikan Lambert, 1761) — karenanya tidak
          ada pecahan <em>p</em>/<em>q</em> yang tepat sama dengan π, termasuk 22/7 dan 355/113.
          Lebih kuat lagi, π bersifat <strong>transenden</strong> (Lindemann, 1882): ia bukan akar
          polinomial tak nol berkoefisien bilangan bulat mana pun. Dari sinilah masalah kuno "mengkuadratkan
          lingkaran" dengan jangka dan penggaris terbukti mustahil.
        </p>
        <p>
          <strong>Batas gagasannya:</strong> ketetapan K/d = π hanya berlaku pada geometri Euklides
          (bidang datar). Pada permukaan bola berjari-jari <em>R</em>, lingkaran yang jari-jarinya{' '}
          <em>ρ</em> diukur menyusuri permukaan bola (jadi d = 2ρ) memiliki keliling 2π·R·sin(ρ/R),
          sehingga K/d = π·sin(ρ/R)/(ρ/R) &lt; π dan nilainya bergantung pada ukuran lingkaran. Jadi
          ketetapan K/d = π bukan sekadar fakta tentang lingkaran — ia sekaligus fakta tentang
          kedataran bidang tempat lingkaran itu digambar.
        </p>
      </>
    ),
  },

  rumus: {
    src: '[keliling:K] = [pi:π] × [diameter:d] = 2 × [pi:π] × [jari:r]',
    roles: { keliling: 'c', pi: 'hi', diameter: 'a', jari: 'b' },
    arti: {
      keliling: 'Panjang tepi lingkaran — panjang jejak satu putaran penuh.',
      pi: 'Hasil bagi keliling dengan diameter: 3,14159265… Desimalnya tidak pernah berakhir dan tidak pernah berulang, jadi 3,14 dan 22/7 hanya hampiran.',
      diameter: 'Jarak tepi ke tepi lewat pusat. Dipakai sebagai penggaris untuk mengukur jejak.',
      jari: 'Jarak pusat ke tepi. Karena d = 2r, rumusnya bisa ditulis dua cara.',
    },
  },

  soal: [
    (rnd) => {
      const d = [7, 14, 21, 28][Math.floor(rnd() * 4)]
      const K = (22 * d) / 7
      return {
        id: 'pi-1',
        tipe: 'angka',
        topicId: 'sd6-keliling-dan-luas-lingkaran',
        kelas: 6,
        tingkat: 'mudah',
        konsep: 'pi-dari-mana',
        pertanyaan: `Sebuah lingkaran berdiameter ${d} cm. Dengan hampiran π ≈ 22/7, berapa kelilingnya?`,
        jawaban: K,
        satuan: 'cm',
        toleransi: 1e-6,
        hint: [
          'Ingat jejak gelindingnya: keliling selalu sedikit lebih dari 3 diameter. Jadi keliling = π × diameter.',
          `Tulis dulu: K = 22/7 × ${d}.`,
          `Angka ${d} habis dibagi 7. Hitung ${d} : 7 = ${d / 7} lebih dulu, baru kalikan 22.`,
        ],
        pembahasan: `K = 22/7 × ${d} = 22 × ${d / 7} = ${fmt(K)} cm. Angka 22/7 sengaja dipilih karena ${d} habis dibagi 7. Ingat, 22/7 = 3,142857… sedikit lebih BESAR dari π, jadi hasil ini hampiran — bukan nilai persis.`,
      }
    },
    {
      id: 'pi-2',
      tipe: 'pilihan',
      topicId: 'sd6-keliling-dan-luas-lingkaran',
      kelas: 6,
      tingkat: 'sedang',
      konsep: 'pi-dari-mana',
      pertanyaan: 'Manakah pernyataan yang paling tepat tentang π?',
      pilihan: [
        {
          id: 'a',
          label: 'π = 3,14 tepat',
          diagnosa:
            'Kamu menganggap angka yang dipakai di sekolah adalah nilai sebenarnya. Padahal π = 3,14159265…, jadi 3,14 sedikit lebih kecil dari π — dipilih hanya karena mudah dihitung.',
        },
        {
          id: 'b',
          label: 'π = 22/7 tepat',
          diagnosa:
            '22/7 memang hampiran yang bagus, tetapi nilainya 3,142857… sedikit lebih besar dari π. π tidak bisa ditulis sebagai pecahan mana pun.',
        },
        {
          id: 'c',
          label:
            'π adalah hasil bagi keliling dengan diameter; desimalnya tak berakhir dan tak berulang, sehingga 3,14 dan 22/7 cuma hampiran',
          benar: true,
        },
        {
          id: 'd',
          label: 'π ikut membesar kalau lingkarannya diperbesar',
          diagnosa:
            'Kamu melihat kelilingnya membesar, tetapi lupa diameternya ikut membesar dengan faktor yang sama. Keduanya dikali angka yang sama, sehingga hasil baginya tidak berubah.',
        },
      ],
      hint: [
        'Ingat dari mana π datang: bukan dari hafalan, melainkan dari satu pembagian.',
        'Pada eksperimen tadi, apakah hasil bagi K : d pernah berubah saat tepi lingkarannya ditarik?',
        'Sekarang pikirkan angkanya: apakah 3,14 dan 22/7 memberi angka yang persis sama? Kalau tidak, keduanya tidak mungkin sama-sama nilai persis π.',
      ],
      pembahasan:
        'π didefinisikan sebagai K : d, dan hasil bagi itu sama untuk semua lingkaran karena semua lingkaran sebangun. Nilainya 3,14159265… — irasional, jadi tidak ada pecahan yang tepat sama dengannya. 3,14 sedikit di bawah π, 22/7 = 3,142857… sedikit di atas π.',
    },
    {
      id: 'pi-3',
      tipe: 'benar-salah',
      topicId: 'sd6-keliling-dan-luas-lingkaran',
      kelas: 6,
      tingkat: 'sedang',
      konsep: 'pi-dari-mana',
      pertanyaan:
        'Kalau jari-jari sebuah lingkaran digandakan menjadi dua kali lipat, hasil bagi keliling dengan diameter juga menjadi dua kali lipat.',
      jawaban: false,
      diagnosa:
        'Kelilingnya memang menjadi dua kali lipat — tetapi diameternya juga. Karena keduanya dikali 2, angka 2-nya saling menghapus saat dibagi, sehingga hasilnya tetap π.',
      hint: [
        'Kalau jari-jari dikali 2, apa saja yang ikut berubah? Jangan hanya melihat kelilingnya.',
        'Tulis keduanya: keliling baru = 2K, diameter baru = 2d. Lalu bagi.',
        '2K dibagi 2d — apa yang terjadi pada angka 2 di atas dan di bawah?',
      ],
      pembahasan:
        'Salah. Keliling baru 2K dan diameter baru 2d, sehingga 2K : 2d = K : d = π. Inilah yang kamu lihat di eksperimen: tarik tepi lingkarannya sejauh apa pun, angka 3,14159 tidak bergerak.',
    },
    (rnd) => {
      const d = [10, 20, 30, 50][Math.floor(rnd() * 4)]
      const K = 3.14 * d
      return {
        id: 'pi-4',
        tipe: 'angka',
        topicId: 'sd6-keliling-dan-luas-lingkaran',
        kelas: 6,
        tingkat: 'sulit',
        konsep: 'pi-dari-mana',
        pertanyaan: `Keliling sebuah roda ${fmt(K)} cm. Dengan hampiran π ≈ 3,14, berapa diameternya?`,
        jawaban: d,
        satuan: 'cm',
        toleransi: 1e-6,
        hint: [
          'Hubungan yang kamu punya cuma satu: K = π × d. Yang ditanya kali ini d, bukan K.',
          `Susun ulang menjadi d = K : π, jadi d = ${fmt(K)} : 3,14.`,
          'Kalau bingung membagi dengan koma, kalikan dua-duanya dengan 100 dulu: hasilnya tidak berubah.',
        ],
        pembahasan: `d = K : π ≈ ${fmt(K)} : 3,14 = ${fmt(d)} cm. Periksa balik: 3,14 × ${fmt(d)} = ${fmt(K)} cm. Karena 3,14 sedikit lebih kecil dari π, diameter aslinya sedikit lebih kecil dari angka bulat ini.`,
      }
    },
    {
      id: 'pi-5',
      tipe: 'urutkan',
      topicId: 'sd6-keliling-dan-luas-lingkaran',
      kelas: 6,
      tingkat: 'sedang',
      konsep: 'pi-dari-mana',
      pertanyaan: 'Susun kembali alasan kenapa keliling lingkaran adalah π kali diameternya.',
      langkah: [
        'Tandai diameter lingkaran, lalu berdirikan di atas garis',
        'Gelindingkan lingkaran satu putaran penuh tanpa selip',
        'Panjang jejaknya sama dengan panjang tepi lingkaran, yaitu kelilingnya',
        'Ukur jejak itu memakai diameter: muat 3 kali penuh, tersisa sekitar 0,14 diameter',
        'Ganti-ganti ukuran lingkarannya, hasil bagi K : d tetap sama',
        'Angka tetap itu diberi nama π, sehingga K = π × d',
      ],
      hint: [
        'Mulailah dari benda yang kamu pegang, bukan dari rumusnya.',
        'Mengukur jejak baru bisa dilakukan setelah jejaknya ada.',
        'Memberi nama pada sebuah angka selalu jadi langkah terakhir, setelah terbukti angkanya tidak berubah.',
      ],
      pembahasan:
        'Urutannya: tandai diameter → gelindingkan satu putaran → jejak = keliling → ukur pakai diameter (muat 3 kali, masih ada sedikit sisa) → ganti ukuran, hasil baginya tetap → beri nama π.',
    },
    {
      id: 'pi-6',
      tipe: 'cocokkan',
      topicId: 'sd6-keliling-dan-luas-lingkaran',
      kelas: 6,
      tingkat: 'sulit',
      konsep: 'pi-dari-mana',
      pertanyaan: 'Pasangkan setiap lingkaran dengan kelilingnya (pakai hampiran π ≈ 3,14).',
      pasangan: [
        { kiri: 'diameter 4 cm', kanan: '12,56 cm' },
        { kiri: 'diameter 10 cm', kanan: '31,4 cm' },
        { kiri: 'jari-jari 10 cm', kanan: '62,8 cm' },
        { kiri: 'diameter 25 cm', kanan: '78,5 cm' },
      ],
      hint: [
        'Periksa dulu satu per satu: yang diberikan itu diameter atau jari-jari?',
        'Kalau yang diketahui jari-jari, ubah dulu jadi diameter dengan mengalikannya 2.',
        'Setelah semuanya berupa diameter, tinggal kalikan dengan 3,14.',
      ],
      pembahasan:
        'd = 4 → K = 12,56. d = 10 → K = 31,4. r = 10 berarti d = 20, jadi K = 62,8 (bukan 31,4 — ini jebakannya). d = 25 → K = 78,5.',
    },
  ],

  lanjut: ['lingkaran-luas', 'segitiga-setengah'],
}

export default konsep
