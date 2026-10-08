/* ============================================================
   KONSEP — Kalau peluangnya ½, kenapa 10 lemparan sering tidak pas 5?
   Kelas 8 · Analisis Data dan Peluang

   Gagasan: peluang BUKAN janji tentang hasil beberapa percobaan.
   Ia adalah angka yang didekati oleh frekuensi relatif ketika
   percobaan diperbanyak. Simulasi memperlihatkan kurva frekuensi
   relatif bergoyang liar di awal, lalu menyempit ke 0,5.

   Sekaligus membongkar kekeliruan penjudi: koin tidak punya
   ingatan. Yang mengecil adalah selisih RELATIF, bukan selisih
   mutlak — dan itu ditunjukkan angkanya.

   ---- Interaksi langsung (docs/PANDUAN-INTERAKSI.md) ----
   1. "Lempar lagi" adalah TombolGambar di dalam gambar. Percobaan
      baru memang lebih wajar diketuk daripada diseret, dan tombolnya
      duduk tepat di bawah koin yang diacaknya.
   2. Banyaknya lemparan dipegang di UJUNG KURVA. Menariknya ke kanan
      benar-benar MELANJUTKAN percobaan yang sama: benih acaknya tidak
      bergantung pada n, jadi bagian kiri kurva tidak pernah berubah —
      hanya ekornya memanjang dan menyempit sendiri ke 0,5.
   3. Karena itu sumbu mendatar (skala logaritmik) dibuat berbatas
      TETAP, tidak ikut n. Kalau batasnya ikut n, ujung kurva selalu
      menempel di tepi kanan dan tidak ada yang bisa dipegang.
      Sisa sumbu di kanan ujung kurva sengaja tetap terlihat sebagai
      rel pucat: itulah "masih ada lemparan yang bisa ditambah".
   ============================================================ */

import { useMemo } from 'react'
import { Pegangan, TombolGambar, useInteraksi } from '../components/Interaksi'
import { Svg, Tag, tinta, useSempit, useUkuranLayar } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt, seededRandom } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

/* Batas sumbu mendatar tiap panggung — tetap, tidak ikut nilai n. */
const N_BONGKAR_MAKS = 10000
const N_EKS_MAKS = 20000
const BENIH_BONGKAR_MAKS = 20
const BENIH_EKS_MAKS = 40

/** Hitung frekuensi relatif kumulatif pada titik-titik contoh berjarak logaritmik. */
function simulasi(n: number, benih: number) {
  const rnd = seededRandom(benih * 7919 + 13)
  const titik: { i: number; f: number }[] = []
  // Titik contoh: rapat di awal, renggang di akhir (skala logaritmik).
  const contoh = new Set<number>([1, n])
  const maks = Math.max(1, Math.log10(n))
  for (let k = 0; k <= 160; k++) {
    contoh.add(Math.max(1, Math.round(10 ** ((k / 160) * maks))))
  }
  let gambar = 0
  const urut = Array.from(contoh)
    .filter((v) => v <= n)
    .sort((a, b) => a - b)
  let idx = 0
  for (let i = 1; i <= n; i++) {
    if (rnd() < 0.5) gambar++
    while (idx < urut.length && urut[idx] === i) {
      titik.push({ i, f: gambar / i })
      idx++
    }
  }
  return { titik, gambar, total: n, frekuensi: n > 0 ? gambar / n : 0 }
}

/**
 * Hasil lemparan pertama, untuk digambar sebagai koin. Memakai benih yang
 * sama dengan `simulasi`, jadi koin yang terlihat memang lemparan pertama
 * dari kurva yang sedang digambar.
 */
function koinAwal(n: number, benih: number) {
  const rnd = seededRandom(benih * 7919 + 13)
  const out: boolean[] = []
  for (let i = 0; i < n; i++) out.push(rnd() < 0.5)
  return out
}

/* ---------------- Tata letak ---------------- */

/** Wilayah grafik dalam koordinat SVG. */
interface Kotak {
  sempit: boolean
  gx0: number
  gx1: number
  gy0: number
  gy1: number
}

/** Barisan koin: berapa per baris, sebesar apa, mulai dari mana. */
interface BarisKoin {
  r: number
  dx: number
  dy: number
  x0: number
  y: number
  perBaris: number
}

const kx = (L: Kotak, nMaks: number, i: number) =>
  L.gx0 + (Math.log10(Math.max(1, i)) / Math.log10(nMaks)) * (L.gx1 - L.gx0)

const ky = (L: Kotak, f: number) => L.gy1 - clamp(f, 0, 1) * (L.gy1 - L.gy0)

/** Kebalikan `kx`: posisi jari di sumbu mendatar menjadi banyaknya lemparan. */
const keBanyak = (L: Kotak, nMaks: number, x: number) =>
  10 ** (clamp((x - L.gx0) / (L.gx1 - L.gx0), 0, 1) * Math.log10(nMaks))

interface TataBongkar extends Kotak {
  w: number
  h: number
  maksH: number
  koin: BarisKoin
  /** langkah koin (0–1) */
  judulKoinY: number
  freqY: number
  komenY: number
  tombolKoin: { x: number; y: number }
  /** langkah grafik (2 ke atas) */
  teksY: number
  teksDY: number
  tombolGrafik: { x: number; y: number }
}

const B_LEBAR: TataBongkar = {
  sempit: false,
  w: 690,
  h: 450,
  maksH: 450,
  gx0: 92,
  // Sisa di bawah sumbu harus memuat angka sumbu DAN keterangan sumbu:
  // pada panggung lebar tersempit (560 px) keduanya diperbesar mesin
  // sampai 11 px layar, jadi keterangan sumbu butuh sampai ±64 satuan.
  gx1: 592,
  gy0: 232,
  gy1: 380,
  koin: { r: 18, dx: 46, dy: 0, x0: 138, y: 150, perBaris: 10 },
  judulKoinY: 58,
  freqY: 236,
  komenY: 288,
  tombolKoin: { x: 345, y: 350 },
  teksY: 56,
  teksDY: 36,
  tombolGrafik: { x: 520, y: 182 },
}

/* Tinggi HP dihitung dari tumpukan paling padat: 5 baris angka, tombol,
   grafik, angka sumbu, lalu keterangan sumbu. Di HP yang sangat sempit
   (±300 px) huruf diperbesar mesin sampai 11 px layar, jadi keterangan
   sumbu paling bawah butuh sisa ±8 satuan. 536/420 = 1,28 (batas 1,3). */
const B_HP: TataBongkar = {
  sempit: true,
  w: 420,
  h: 536,
  maksH: 540,
  gx0: 58,
  // Angka sumbu terakhir ("10.000") berdiri di gx1; di HP sempit hurufnya
  // diperbesar mesin, jadi gx1 harus menyisakan separuh lebarnya.
  gx1: 378,
  gy0: 248,
  gy1: 452,
  koin: { r: 22, dx: 72, dy: 76, x0: 66, y: 110, perBaris: 5 },
  judulKoinY: 42,
  freqY: 258,
  komenY: 302,
  tombolKoin: { x: 210, y: 372 },
  teksY: 40,
  teksDY: 30,
  // Di bawah baris angka terakhir (paling banyak 5 baris) dan di atas grafik.
  tombolGrafik: { x: 300, y: 210 },
}

interface TataEks extends Kotak {
  w: number
  h: number
  maksH: number
  koin: BarisKoin & { maks: number }
  koinLabelY: number
  teksY: number
  teksDY: number
  tombol: { x: number; y: number }
}

const E_LEBAR: TataEks = {
  sempit: false,
  w: 690,
  h: 450,
  maksH: 450,
  gx0: 92,
  gx1: 592,
  gy0: 232,
  gy1: 380,
  koin: { r: 16, dx: 38, dy: 0, x0: 136, y: 136, perBaris: 12, maks: 12 },
  koinLabelY: 106,
  teksY: 42,
  teksDY: 32,
  tombol: { x: 520, y: 186 },
}

/* 528/420 = 1,26 (batas 1,3). Sisa di bawah sumbu disiapkan untuk HP
   sempit, tempat keterangan sumbu diperbesar mesin sampai 11 px layar. */
const E_HP: TataEks = {
  sempit: true,
  w: 420,
  h: 528,
  maksH: 540,
  gx0: 58,
  // Ujung kanan rel = tempat pegangan berhenti pada n maksimum, dan label
  // "20.000×" digambar terpusat di atasnya. gx1 harus menyisakan separuh
  // lebar label itu (±53 satuan pada HP tersempit).
  gx1: 356,
  gy0: 246,
  gy1: 444,
  koin: { r: 16, dx: 38, dy: 0, x0: 77, y: 152, perBaris: 8, maks: 8 },
  koinLabelY: 122,
  teksY: 34,
  teksDY: 30,
  tombol: { x: 300, y: 202 },
}

/* ---------------- Bagian gambar yang dipakai bersama ---------------- */

const TANDA_X = [1, 10, 100, 1000, 10000]

/** Satu baris angka/keterangan di atas gambar. */
interface BarisTeks {
  teks: string
  size: number
  warna: string
}

/** Tumpukan baris teks, dari atas ke bawah dengan jarak tetap. */
function Baris({ x, y, dy, isi }: { x: number; y: number; dy: number; isi: BarisTeks[] }) {
  return (
    <g>
      {isi.map((b, i) => (
        <Tag key={i} x={x} y={y + i * dy} size={b.size} warna={b.warna}>
          {b.teks}
        </Tag>
      ))}
    </g>
  )
}

function Grafik({
  L,
  titik,
  n,
  nMaks,
  tampil,
  nyala,
}: {
  L: Kotak
  titik: { i: number; f: number }[]
  n: number
  nMaks: number
  tampil: number
  /** kurva dan rel menebal saat banyaknya lemparan sedang dipegang. */
  nyala: boolean
}) {
  const u = useUkuranLayar()
  const huruf = Math.max(13, u(13, 13))
  const sampai = Math.max(1, n * tampil)
  const terlihat = titik.filter((p) => p.i <= sampai)
  const d = terlihat
    .map((p, k) => `${k === 0 ? 'M' : 'L'} ${kx(L, nMaks, p.i).toFixed(1)} ${ky(L, p.f).toFixed(1)}`)
    .join(' ')
  const xn = kx(L, nMaks, sampai)
  const tebalRel = u(6, 6)

  return (
    <g>
      {/* kisi; garis 0,5 adalah sasaran yang didekati */}
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line
          key={f}
          x1={L.gx0}
          y1={ky(L, f)}
          x2={L.gx1}
          y2={ky(L, f)}
          stroke={f === 0.5 ? 'var(--m-hi)' : 'var(--m-grid)'}
          strokeWidth={f === 0.5 ? 2 : 1}
          strokeDasharray={f === 0.5 ? '7 5' : undefined}
        />
      ))}
      {[0, 0.25, 0.5, 0.75, 1].map((f) => (
        <text
          key={f}
          x={L.gx0 - u(9, 9)}
          y={ky(L, f)}
          textAnchor="end"
          dominantBaseline="middle"
          fontSize={huruf}
          fontWeight={700}
          fill={tinta(f === 0.5 ? 'var(--m-hi)' : 'var(--ink-soft)')}
        >
          {f === 0.5 ? '0,5' : fmt(f, 2)}
        </text>
      ))}

      {/* sumbu mendatar sekaligus rel: bagian pucat di kanan adalah lemparan
          yang masih bisa ditambah dengan menarik ujung kurva */}
      <line
        x1={L.gx0}
        y1={L.gy1}
        x2={L.gx1}
        y2={L.gy1}
        stroke="var(--surface-3)"
        strokeWidth={tebalRel}
        strokeLinecap="round"
      />
      <line
        x1={L.gx0}
        y1={L.gy1}
        x2={xn}
        y2={L.gy1}
        stroke="var(--m-a)"
        strokeWidth={tebalRel}
        strokeLinecap="round"
        opacity={nyala ? 0.85 : 0.45}
      />

      {/* Angka skala tetap: tidak pernah disembunyikan, karena angka lemparan
          yang sedang berjalan hidup di label pegangan, bukan di sumbu. */}
      {TANDA_X.filter((v) => v <= nMaks).map((v) => (
        <g key={v}>
          <line
            x1={kx(L, nMaks, v)}
            y1={L.gy1}
            x2={kx(L, nMaks, v)}
            y2={L.gy1 + u(8, 8)}
            stroke="var(--m-axis)"
            strokeWidth={1.4}
          />
          <text
            x={kx(L, nMaks, v)}
            y={L.gy1 + u(22, 23)}
            textAnchor="middle"
            fontSize={huruf}
            fontWeight={700}
            fill="var(--ink-soft)"
          >
            {fmt(v)}
          </text>
        </g>
      ))}

      {d && (
        <path
          d={d}
          fill="none"
          stroke="var(--m-a)"
          strokeWidth={nyala ? 3.4 : 2.4}
          strokeLinejoin="round"
        />
      )}
      {terlihat.length > 0 && (
        <circle
          cx={kx(L, nMaks, terlihat[terlihat.length - 1].i)}
          cy={ky(L, terlihat[terlihat.length - 1].f)}
          r={5}
          fill="var(--m-a)"
        />
      )}

      <text
        x={(L.gx0 + L.gx1) / 2}
        y={L.gy1 + u(46, 48)}
        textAnchor="middle"
        fontSize={huruf}
        fontWeight={700}
        fill="var(--ink-soft)"
      >
        {L.sempit ? 'banyaknya lemparan (skala log)' : 'banyaknya lemparan (skala logaritmik)'}
      </text>
    </g>
  )
}

function Koin({ x, y, gambar, r }: { x: number; y: number; gambar: boolean; r: number }) {
  const u = useUkuranLayar()
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={gambar ? 'var(--m-a)' : 'var(--surface-3)'}
        fillOpacity={gambar ? 0.3 : 1}
        stroke={gambar ? 'var(--m-a)' : 'var(--ink-3)'}
        strokeWidth={1.6}
      />
      <text
        x={x}
        y={y + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={Math.max(r * 0.9, u(11, 11))}
        fontWeight={800}
        fill={tinta(gambar ? 'var(--m-a)' : 'var(--ink-2)')}
      >
        {gambar ? 'G' : 'A'}
      </text>
    </g>
  )
}

/** Barisan koin hasil lemparan pertama. */
function BarisanKoin({ L, hasil }: { L: BarisKoin; hasil: boolean[] }) {
  return (
    <g>
      {hasil.map((g, i) => (
        <Koin
          key={i}
          x={L.x0 + (i % L.perBaris) * L.dx}
          y={L.y + Math.floor(i / L.perBaris) * L.dy}
          gambar={g}
          r={L.r}
        />
      ))}
    </g>
  )
}

/** Percobaan berikutnya, berputar kembali ke 1 setelah yang terakhir. */
const benihBerikut = (v: number, maks: number) => (Math.round(v) >= maks ? 1 : Math.round(v) + 1)

/* ---------------- Visual untuk animasi bongkar ---------------- */

const N_LANGKAH = [10, 10, 100, 1000, 10000, 10000, 10000]

/** Nomor percobaan pada bongkar — dipakai gambar DAN narasi. */
const benihBongkar = (p: Record<string, number>) =>
  clamp(Math.round(p.benih ?? 1), 1, BENIH_BONGKAR_MAKS)

/** Banyaknya gambar pada sepuluh lemparan pertama percobaan ini. */
const gambarSepuluh = (benih: number) => koinAwal(10, benih).filter(Boolean).length

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const L = useSempit() ? B_HP : B_LEBAR
  return (
    <Svg
      w={L.w}
      h={L.h}
      maxH={L.maksH}
      label="Simulasi pelemparan koin dan grafik frekuensi relatifnya"
    >
      <IsiBongkar L={L} step={step} t={t} p={p} sorot={sorot} />
    </Svg>
  )
}

/**
 * Isi panggung bongkar sengaja komponen tersendiri: `useUkuranLayar()` baru
 * memberi ukuran layar yang benar bila dipanggil DI DALAM <Svg>.
 */
function IsiBongkar({ L, step, t, p, sorot }: DeriveState & { L: TataBongkar }) {
  const benih = benihBongkar(p)
  const n = N_LANGKAH[Math.min(step, N_LANGKAH.length - 1)]

  const sim = useMemo(() => simulasi(n, benih), [n, benih])
  const koin = useMemo(() => koinAwal(10, benih), [benih])

  const lempar = step === 0 ? seg(t, 0.05, 0.95) : 1
  const tampilGrafik = step >= 2 ? (step === 2 ? seg(t, 0.05, 0.9) : 1) : 0
  const tekan = fase(step, t, 1)
  const selesai = step >= 5
  const faseKoin = step <= 1

  const terlempar = Math.round(10 * lempar)
  const gambarAwal = koin.slice(0, terlempar).filter(Boolean).length

  const nyalaP = sorot === 'p'
  const nyalaN = sorot === 'na' || sorot === 'ns'

  const teksGrafik = L.sempit
    ? [
        {
          teks: `${fmt(n)} lemparan · ${fmt(sim.gambar)} gambar`,
          size: 15,
          warna: nyalaP ? 'var(--m-hi)' : 'var(--m-a)',
        },
        {
          teks: `frekuensi relatif ${fmt(sim.frekuensi, 4)}`,
          size: 15,
          warna: nyalaP ? 'var(--m-hi)' : 'var(--m-ab)',
        },
        {
          teks: `selisih dari 0,5: ${fmt(Math.abs(sim.frekuensi - 0.5), 4)}`,
          size: 13,
          warna: nyalaN ? 'var(--m-hi)' : 'var(--ink-2)',
        },
        {
          teks: `mutlak ${fmt(Math.abs(sim.gambar - n / 2))} lemparan`,
          size: 13,
          warna: nyalaN ? 'var(--m-hi)' : 'var(--ink-2)',
        },
      ]
    : [
        {
          teks: `${fmt(n)} lemparan · ${fmt(sim.gambar)} gambar · frekuensi relatif ${fmt(
            sim.frekuensi,
            4,
          )}`,
          size: 18,
          warna: nyalaP ? 'var(--m-hi)' : 'var(--m-a)',
        },
        {
          teks: `selisih dari 0,5: ${fmt(Math.abs(sim.frekuensi - 0.5), 4)} (mutlak ${fmt(
            Math.abs(sim.gambar - n / 2),
          )} lemparan)`,
          size: 15,
          warna: nyalaN ? 'var(--m-hi)' : 'var(--ink-2)',
        },
      ]
  if (selesai) {
    teksGrafik.push({
      teks: L.sempit
        ? 'menyempit ke 0,5, tidak mengunci'
        : 'kurvanya menyempit ke 0,5 — tetapi tidak pernah "mengunci" di sana',
      size: L.sempit ? 14 : 16,
      warna: 'var(--m-ab)',
    })
  }

  const tombol = faseKoin ? L.tombolKoin : L.tombolGrafik

  return (
    <g>
      {/* sepuluh koin pertama */}
      {faseKoin && (
        <g>
          <BarisanKoin L={L.koin} hasil={koin.slice(0, terlempar)} />
          <Tag x={L.w / 2} y={L.judulKoinY} warna="var(--ink-2)" size={L.sempit ? 15 : 17}>
            {terlempar === 0
              ? 'sepuluh lemparan pertama'
              : `${fmt(gambarAwal)} gambar dari ${fmt(terlempar)} lemparan`}
          </Tag>
          {terlempar === 10 && (
            <Tag
              x={L.w / 2}
              y={L.freqY}
              warna={gambarAwal === 5 ? 'var(--m-ab)' : 'var(--m-hi)'}
              size={L.sempit ? 16 : 18}
            >
              {`frekuensi relatif = ${fmt(gambarAwal)}/10 = ${fmt(gambarAwal / 10, 2)}`}
            </Tag>
          )}
          {tekan > 0.4 && (
            <Tag x={L.w / 2} y={L.komenY} warna="var(--ink-2)" size={L.sempit ? 14 : 16}>
              {gambarAwal === 5
                ? L.sempit
                  ? 'kebetulan pas — coba lempar lagi'
                  : 'kali ini kebetulan pas — ketuk "Lempar lagi" untuk percobaan lain'
                : L.sempit
                  ? `meleset ${fmt(Math.abs(gambarAwal - 5))} dari 5`
                  : `meleset ${fmt(Math.abs(gambarAwal - 5))} dari harapan 5`}
            </Tag>
          )}
        </g>
      )}

      {/* grafik frekuensi relatif */}
      {tampilGrafik > 0.02 && (
        <g opacity={tampilGrafik}>
          <Grafik
            L={L}
            titik={sim.titik}
            n={n}
            nMaks={N_BONGKAR_MAKS}
            tampil={step === 2 ? seg(t, 0.1, 1) : 1}
            nyala={nyalaP}
          />
          <Baris x={L.w / 2} y={L.teksY} dy={L.teksDY} isi={teksGrafik} />
        </g>
      )}

      {/* Percobaan baru diketuk, bukan digeser: koinnya diacak ulang dari
          benih berikutnya, dan seluruh kurva ikut berganti. */}
      <TombolGambar
        x={tombol.x}
        y={tombol.y}
        param="benih"
        ubah={(v) => benihBerikut(v, BENIH_BONGKAR_MAKS)}
        label="Lempar lagi"
        utama
      />
    </g>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const L = useSempit() ? E_HP : E_LEBAR
  return (
    <Svg
      w={L.w}
      h={L.h}
      maxH={L.maksH}
      label="Simulasi pelemparan koin yang banyaknya bisa ditarik dari ujung kurva"
    >
      <IsiEksperimen L={L} p={p} sorot={sorot} />
    </Svg>
  )
}

function IsiEksperimen({
  L,
  p,
  sorot,
}: {
  L: TataEks
  p: Record<string, number>
  sorot: string | null
}) {
  const aktif = useInteraksi()?.kendali.aktif ?? null
  const n = clamp(Math.round(p.n ?? 200), 10, N_EKS_MAKS)
  const benih = clamp(Math.round(p.benih ?? 1), 1, BENIH_EKS_MAKS)
  const sim = useMemo(() => simulasi(n, benih), [n, benih])
  const koin = useMemo(() => koinAwal(Math.min(n, L.koin.maks), benih), [n, benih, L.koin.maks])

  const mutlak = Math.abs(sim.gambar - n / 2)
  const relatif = Math.abs(sim.frekuensi - 0.5)
  const pegangN = aktif === 'n' || sorot === 'banyak'
  const nyalaP = sorot === 'p'

  const teks = L.sempit
    ? [
        {
          teks: `${fmt(sim.gambar)} gambar dari ${fmt(n)}`,
          size: 16,
          warna: nyalaP ? 'var(--m-hi)' : 'var(--m-a)',
        },
        {
          teks: `frekuensi relatif ${fmt(sim.frekuensi, 4)}`,
          size: 16,
          warna: nyalaP ? 'var(--m-hi)' : 'var(--m-ab)',
        },
        {
          teks: `mutlak ${fmt(mutlak)} lemparan · relatif ${fmt(relatif, 4)}`,
          size: 13,
          warna: 'var(--ink-2)',
        },
      ]
    : [
        {
          teks: `${fmt(sim.gambar)} gambar dari ${fmt(n)} → ${fmt(sim.frekuensi, 4)}`,
          size: 19,
          warna: nyalaP ? 'var(--m-hi)' : 'var(--m-a)',
        },
        {
          teks: `selisih mutlak ${fmt(mutlak)} lemparan · selisih relatif ${fmt(relatif, 4)}`,
          size: 14,
          warna: 'var(--ink-2)',
        },
      ]

  return (
    <g>
      <Baris x={L.w / 2} y={L.teksY} dy={L.teksDY} isi={teks} />

      <Tag x={L.w / 2} y={L.koinLabelY} warna="var(--m-hi)" size={13}>
        {`${fmt(koin.length)} lemparan pertama`}
      </Tag>
      <BarisanKoin L={L.koin} hasil={koin} />

      <Grafik
        L={L}
        titik={sim.titik}
        n={n}
        nMaks={N_EKS_MAKS}
        tampil={1}
        nyala={pegangN}
      />

      {/* Percobaan baru: diketuk. */}
      <TombolGambar
        x={L.tombol.x}
        y={L.tombol.y}
        param="benih"
        ubah={(v) => benihBerikut(v, BENIH_EKS_MAKS)}
        label="Lempar lagi"
      />

      {/* Banyaknya lemparan: ujung kurva ditarik ke kanan. Posisi pegangan
          dihitung dari n dan frekuensi yang sama dengan yang dipakai
          menggambar kurvanya, jadi titiknya benar-benar menempel di ujung. */}
      <Pegangan
        x={kx(L, N_EKS_MAKS, n)}
        y={ky(L, sim.frekuensi)}
        param="n"
        arah="x"
        utama
        /* Angkanya menempel terus pada titiknya (labelSelalu), seperti
           RelGeser. Keping ajakan bawaan tidak dipakai karena mesin
           menaruhnya di BAWAH pegangan, dan di bawah pegangan sudah ada
           sumbu beserta angka skalanya: pada frekuensi rendah keping itu
           menimpa angka sumbu, dan pada n maksimum ia keluar bingkai HP.
           Ajakan menyeret tetap ada lewat denyut, panah, rel pucat di kanan
           titik, dan kalimat ajakan di atas gambar. */
        labelSelalu
        label={`${fmt(n)}×`}
        keNilai={(pt) => keBanyak(L, N_EKS_MAKS, pt.x)}
      />
    </g>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'peluang-simulasi',
  topicId: 'smp8-peluang-teoretis',
  judul: 'Peluang dan kenyataan',
  pertanyaan: 'Kalau peluangnya ½, kenapa 10 lemparan sering tidak pas 5 kali?',
  tagline: 'Lempar 10 kali, 100 kali, 10.000 kali. Perhatikan kapan pola itu muncul.',
  kelas: 8,
  domain: 'data',
  tags: ['peluang', 'frekuensi relatif', 'simulasi', 'koin', 'hukum bilangan besar'],

  tebak: {
    pertanyaan:
      'Sebuah koin seimbang sudah dilempar 5 kali dan semuanya keluar angka. Berapa peluang lemparan keenam keluar gambar?',
    pilihan: [
      {
        id: 'a',
        label: 'Lebih dari ½, karena sudah "waktunya" gambar',
        balasan:
          'Ini kekeliruan penjudi yang paling terkenal. Koin tidak menyimpan ingatan tentang lemparan sebelumnya.',
      },
      {
        id: 'b',
        label: 'Tetap ½',
        benar: true,
        balasan:
          'Betul. Setiap lemparan berdiri sendiri. Lima angka berturut-turut memang jarang, tetapi tidak mengubah apa pun untuk lemparan berikutnya.',
      },
      {
        id: 'c',
        label: 'Kurang dari ½, karena koinnya sedang "condong" ke angka',
        balasan:
          'Koinnya sudah disebut seimbang, jadi tidak ada sisi yang lebih "condong". Lima angka berturut-turut peluangnya 1/32 — kecil, tetapi memang wajar sesekali terjadi.',
      },
    ],
    penutup:
      'Jadi apa sebenarnya arti "peluangnya ½"? Sebentar lagi kamu bisa melihatnya muncul sendiri.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      {
        key: 'benih',
        label: 'Percobaan ke-',
        min: 1,
        max: BENIH_BONGKAR_MAKS,
        step: 1,
        awal: 1,
        bulat: true,
        simbol: '#',
        peran: 'hi',
      },
    ],
    roles: { p: 'a', na: 'b', ns: 'ab', banyak: 'hi' },
    arti: {
      p: 'Peluang teoretis — angka yang didekati frekuensi relatif.',
      na: 'Banyaknya hasil yang kita inginkan (misalnya sisi gambar).',
      ns: 'Banyaknya seluruh hasil yang mungkin.',
      banyak: 'Banyaknya percobaan. Makin besar, frekuensi relatif cenderung makin dekat ke peluangnya.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Sepuluh lemparan',
        narasi:
          'Koin dilempar sepuluh kali: G berarti gambar, A berarti angka. Perhatikan berapa banyak gambar yang muncul.',
        durasi: 2600,
      },
      {
        id: 's1',
        judul: (p) => {
          const g = gambarSepuluh(benihBongkar(p))
          return g === 5 ? 'Kali ini kebetulan pas separuh' : `Meleset ${fmt(Math.abs(g - 5))} dari separuh`
        },
        narasi: (p) => {
          const g = gambarSepuluh(benihBongkar(p))
          if (g === 5)
            return 'Di percobaan ini kebetulan muncul tepat 5 gambar — hasil yang paling mungkin, tetapi peluangnya hanya sekitar seperempat, jadi kira-kira tiga dari empat kali hasilnya bukan 5. Ketuk tombol "Lempar lagi" di dalam gambar: koinnya diacak ulang dan hasilnya berubah-ubah, kadang 3, kadang 7.'
          const muncul = g === 0 ? 'tidak muncul gambar sama sekali' : `muncul ${fmt(g)} gambar`
          return `Di percobaan ini ${muncul}, ${g < 5 ? 'kurang' : 'lebih'} ${fmt(Math.abs(g - 5))} dari 5 — ketuk tombol "Lempar lagi" di dalam gambar dan hasilnya terus berubah-ubah. Tepat 5 gambar memang hasil yang paling mungkin, tetapi peluangnya hanya sekitar seperempat, jadi kira-kira tiga dari empat kali hasilnya justru bukan 5.`
        },
        durasi: 2400,
      },
      {
        id: 's2',
        judul: 'Perbanyak jadi 100',
        narasi:
          'Sekarang kita buat grafik frekuensi relatif sepanjang percobaan. Di awal ia melonjak-lonjak liar, karena satu lemparan masih sangat berpengaruh.',
        durasi: 2800,
      },
      {
        id: 's3',
        judul: 'Seribu lemparan',
        narasi:
          'Goyangannya mulai mereda. Satu lemparan tambahan tidak lagi sanggup menggeser angkanya jauh-jauh.',
        durasi: 2200,
      },
      {
        id: 's4',
        judul: 'Sepuluh ribu lemparan',
        narasi:
          'Kurvanya menempel di sekitar 0,5. Inilah yang sebenarnya dijanjikan oleh kalimat "peluangnya setengah".',
        durasi: 2400,
      },
      {
        id: 's5',
        judul: 'Peluang bukan janji per lemparan',
        narasi:
          'Peluang tidak menjamin apa pun tentang sepuluh lemparan berikutnya. Ia menyatakan ke mana frekuensi relatif MENUJU ketika percobaan diperbanyak tanpa batas.',
        durasi: 2400,
      },
      {
        id: 's6',
        judul: 'Rumus peluang teoretis',
        narasi:
          'Untuk percobaan yang setiap hasilnya berpeluang sama, peluang dihitung dengan membandingkan banyaknya hasil yang diinginkan terhadap seluruh hasil yang mungkin.',
        rumus: '[p:P(A)] = [na:n(A)] / [ns:n(S)]',
        durasi: 2400,
      },
    ],
  },

  eksperimen: {
    judul: 'Perbanyak lemparannya sendiri',
    ajakan:
      'Tarik titik di ujung kurva ke kanan: kurvanya memanjang sendiri. Ketuk "Lempar lagi" untuk percobaan yang baru.',
    params: [
      {
        key: 'n',
        label: 'Banyak lemparan',
        min: 10,
        max: N_EKS_MAKS,
        step: 10,
        awal: 200,
        bulat: true,
        simbol: 'N',
        peran: 'a',
        bagian: 'banyak',
      },
      {
        key: 'benih',
        label: 'Percobaan ke-',
        min: 1,
        max: BENIH_EKS_MAKS,
        step: 1,
        awal: 1,
        bulat: true,
        simbol: '#',
        peran: 'hi',
      },
    ],
    Visual: VisualEksperimen,
    temuan: (p) => {
      const n = clamp(Math.round(p.n ?? 200), 10, N_EKS_MAKS)
      const benih = clamp(Math.round(p.benih ?? 1), 1, BENIH_EKS_MAKS)
      const sim = simulasi(n, benih)
      const mutlak = Math.abs(sim.gambar - n / 2)
      const relatif = Math.abs(sim.frekuensi - 0.5)
      return (
        <p>
          Dari {fmt(n)} lemparan, muncul {fmt(sim.gambar)} gambar —{' '}
          <strong>frekuensi relatifnya {fmt(sim.frekuensi, 4)}</strong>.{' '}
          {mutlak === 0 ? (
            <>Kali ini kebetulan pas separuh, jadi kedua selisihnya 0 — ketuk "Lempar lagi".</>
          ) : (
            <>
              Selisihnya dari 0,5 {relatif < 0.05 ? 'hanya ' : ''}
              {fmt(relatif, 4)}, sedangkan selisih <em>mutlaknya</em> {fmt(mutlak)} lemparan.
            </>
          )}{' '}
          Tarik ujung kurva lebih ke kanan: selisih dari 0,5 itu cenderung mengecil, sedangkan
          selisih mutlaknya cenderung membesar. Bagian kurva yang sudah terlukis tidak berubah —
          kamu benar-benar melanjutkan percobaan yang sama, bukan memulai yang baru. Keduanya hanya
          kecenderungan: pada satu percobaan tertentu angkanya masih bisa naik-turun. Itulah sebabnya
          "hukum bilangan besar" berbicara tentang perbandingan, bukan tentang selisih jumlah.
        </p>
      )
    },
  },

  penjelasan: {
    SMP: (
      <>
        <p>
          Ada dua hal berbeda yang sering tertukar:
        </p>
        <ul>
          <li>
            <strong>Peluang teoretis</strong> — dihitung dari banyaknya kemungkinan. Untuk koin
            seimbang, P(gambar) = 1/2.
          </li>
          <li>
            <strong>Frekuensi relatif</strong> — dihitung dari percobaan nyata: banyaknya gambar
            dibagi banyaknya lemparan.
          </li>
        </ul>
        <p>
          Keduanya tidak harus sama. Yang benar adalah: <strong>frekuensi relatif mendekati peluang
          teoretis ketika percobaannya diperbanyak.</strong> Pernyataan ini disebut hukum bilangan
          besar.
        </p>
        <h4>Kekeliruan penjudi</h4>
        <p>
          Setelah lima angka berturut-turut, banyak orang merasa gambar "sudah waktunya" muncul.
          Padahal koin tidak menyimpan ingatan: peluang lemparan berikutnya tetap 1/2. Yang membuat
          frekuensi relatif akhirnya mendekat ke 0,5 bukanlah "koreksi", melainkan{' '}
          <em>pengenceran</em> — lemparan yang jumlahnya makin banyak membuat pengaruh lima lemparan
          awal itu menjadi tidak berarti.
        </p>
        <p>
          Itu bisa kamu lihat sendiri pada eksperimen: saat ujung kurva ditarik ke kanan, bagian
          kurva yang sudah terlukis tidak pernah berubah. Hasil yang sudah terjadi tidak dikoreksi;
          ia hanya kalah banyak.
        </p>
        <h4>Yang mengecil dan yang membesar</h4>
        <p>
          Ini bagian yang paling sering mengejutkan: selisih <strong>relatif</strong> terhadap 0,5
          cenderung mengecil, tetapi selisih <strong>mutlak</strong> (banyaknya gambar dikurangi separuh
          lemparan) justru cenderung membesar. Pada 10.000 lemparan, meleset 50 lemparan itu biasa —
          tetapi 50 dari 10.000 hanyalah 0,005.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Untuk n lemparan koin seimbang, banyaknya gambar X berdistribusi binomial B(n, ½) dengan
          nilai harapan E[X] = n/2 dan simpangan baku σ = √(n)/2.
        </p>
        <p>
          Frekuensi relatif X/n punya simpangan baku σ/n = 1/(2√n). Karena itu:
        </p>
        <ul>
          <li>simpangan <strong>mutlak</strong> tumbuh seperti √n — makin banyak lemparan, makin besar;</li>
          <li>simpangan <strong>relatif</strong> mengecil seperti 1/√n — inilah hukum bilangan besar.</li>
        </ul>
        <p>
          Menaikkan lemparan dari 100 menjadi 10.000 (100 kali lipat) hanya memperkecil simpangan
          relatif 10 kali. Ketelitian dalam statistika memang mahal.
        </p>
        <p>
          Peluang mendapat tepat 5 gambar dari 10 lemparan adalah C(10,5)/2¹⁰ = 252/1024 ≈ 0,246 —
          hasil "paling mungkin", tetapi tetap saja terjadi kurang dari seperempat kali. Jadi
          pertanyaan pada judul konsep ini punya jawaban yang tepat: bahkan hasil yang paling
          mungkin pun peluangnya hanya sekitar seperempat, sehingga sekitar tiga dari empat percobaan
          hasilnya bukan 5.
        </p>
        <p>
          Sumbu mendatar pada gambar berskala logaritmik, dan itu bukan hiasan: karena simpangan
          relatif sebanding dengan 1/√n, lebar pita goyangan menyusut kira-kira linear terhadap
          jarak sepanjang sumbu logaritmik. Bentuk "corong" yang kamu lihat itulah 1/√n.
        </p>
      </>
    ),
  },

  rumus: {
    src: 'P(A) = [na:n(A)] / [ns:n(S)]',
    roles: { na: 'a', ns: 'b' },
    arti: {
      na: 'Banyaknya hasil yang termasuk kejadian A.',
      ns: 'Banyaknya seluruh hasil yang mungkin, dan semuanya harus berpeluang sama.',
    },
  },

  soal: [
    {
      id: 'plg-1',
      tipe: 'pilihan',
      topicId: 'smp8-peluang-teoretis',
      kelas: 8,
      tingkat: 'mudah',
      konsep: 'peluang-simulasi',
      pertanyaan: 'Sebuah dadu seimbang dilempar. Berapa peluang muncul mata dadu genap?',
      pilihan: [
        { id: 'a', label: '1/2', benar: true },
        { id: 'b', label: '1/3', diagnosa: '1/3 sama dengan 2/6 — berarti mata genapnya baru terhitung dua. Mata genap ada tiga: 2, 4, dan 6.' },
        { id: 'c', label: '1/6', diagnosa: 'Itu peluang munculnya SATU mata dadu tertentu, bukan tiga mata sekaligus.' },
        { id: 'd', label: '3/2', diagnosa: 'Peluang tidak pernah lebih dari 1. Sepertinya 3 mata genap dibagi 2 (genap dan ganjil), padahal penyebutnya harus banyaknya seluruh mata dadu, yaitu 6.' },
      ],
      hint: [
        'Tulis dulu semua hasil yang mungkin: 1, 2, 3, 4, 5, 6.',
        'Mana saja yang genap?',
        'Peluang = banyaknya hasil genap dibagi banyaknya seluruh hasil.',
      ],
      pembahasan: 'Mata genap: 2, 4, 6 — ada 3 dari 6 hasil. Jadi P = 3/6 = 1/2.',
    },
    {
      id: 'plg-2',
      tipe: 'benar-salah',
      topicId: 'smp8-peluang-teoretis',
      kelas: 8,
      tingkat: 'sedang',
      konsep: 'peluang-simulasi',
      pertanyaan:
        'Sebuah koin seimbang sudah muncul angka enam kali berturut-turut. Peluang lemparan ketujuh muncul gambar menjadi lebih besar dari ½.',
      jawaban: false,
      diagnosa:
        'Ini kekeliruan penjudi. Koin tidak menyimpan ingatan — hasil sebelumnya tidak memengaruhi lemparan berikutnya sama sekali.',
      hint: [
        'Apakah koin bisa "mengingat" hasil lemparan sebelumnya?',
        'Peluang setiap lemparan dihitung dari koin itu sendiri, bukan dari riwayatnya.',
        'Yang membuat frekuensi relatif mendekati 0,5 adalah banyaknya lemparan, bukan koreksi.',
      ],
      pembahasan:
        'Salah. Setiap lemparan saling bebas, jadi peluangnya tetap 1/2. Frekuensi relatif mendekati 0,5 bukan karena hasil terdahulu "dikoreksi", melainkan karena pengaruhnya makin encer saat lemparan diperbanyak.',
    },
    (rnd) => {
      const n = [100, 200, 500, 1000][Math.floor(rnd() * 4)]
      const g = Math.round(n / 2) + (Math.floor(rnd() * 21) - 10)
      return {
        id: 'plg-3',
        tipe: 'angka',
        topicId: 'smp8-peluang-teoretis',
        kelas: 8,
        tingkat: 'sedang',
        konsep: 'peluang-simulasi',
        pertanyaan: `Dari ${n} kali lemparan koin seimbang, muncul gambar sebanyak ${g} kali. Berapa frekuensi relatif munculnya gambar? Bulatkan sampai tiga angka di belakang koma.`,
        jawaban: Math.round((g / n) * 1000) / 1000,
        toleransi: 0.0011,
        hint: [
          'Frekuensi relatif dihitung dari hasil percobaan, bukan dari teori.',
          `Bagi banyaknya gambar dengan banyaknya lemparan: ${g} ÷ ${n}.`,
          'Lalu bulatkan sampai tiga angka di belakang koma.',
        ],
        pembahasan: `Frekuensi relatif = ${g}/${n} = ${fmt(Math.round((g / n) * 1000) / 1000, 3)}. Peluang teoretisnya 0,5, tetapi frekuensi relatif dari percobaan nyata tidak harus sama persis dengan itu.`,
      }
    },
    {
      id: 'plg-4',
      tipe: 'urutkan',
      topicId: 'smp8-peluang-teoretis',
      kelas: 9,
      tingkat: 'sulit',
      konsep: 'peluang-simulasi',
      pertanyaan:
        'Urutkan dari yang frekuensi relatifnya paling mungkin JAUH dari 0,5 sampai yang paling mungkin DEKAT dengan 0,5.',
      langkah: ['10 lemparan', '100 lemparan', '1.000 lemparan', '10.000 lemparan'],
      hint: [
        'Perhatikan bentuk kurva pada simulasi: bagian mana yang paling bergoyang?',
        'Makin sedikit lemparan, makin besar pengaruh satu hasil terhadap perbandingannya.',
      ],
      pembahasan:
        'Makin banyak lemparan, makin kecil simpangan relatifnya (sebanding dengan 1/√n). Karena itu 10 lemparan paling liar dan 10.000 lemparan paling stabil.',
    },
    {
      id: 'plg-5',
      tipe: 'pilihan',
      topicId: 'smp8-peluang-teoretis',
      kelas: 9,
      tingkat: 'sulit',
      konsep: 'peluang-simulasi',
      pertanyaan:
        'Dua koin seimbang dilempar bersamaan. Berapa peluang keduanya muncul gambar?',
      pilihan: [
        { id: 'a', label: '1/4', benar: true },
        {
          id: 'b',
          label: '1/2',
          diagnosa: 'Itu peluang untuk satu koin saja. Dua koin punya empat kemungkinan hasil, bukan dua.',
        },
        {
          id: 'c',
          label: '1/3',
          diagnosa:
            'Kalau hasilnya dianggap hanya "dua gambar, dua angka, satu-satu", ketiganya tidak berpeluang sama — "satu-satu" bisa terjadi dengan dua cara.',
        },
        { id: 'd', label: '2/4', diagnosa: 'Ada dua hasil yang memuat tepat satu gambar (GA dan AG), tetapi yang diminta adalah KEDUANYA gambar — dan itu hanya GG, satu hasil.' },
      ],
      hint: [
        'Tulis semua kemungkinan sebagai pasangan: GG, GA, AG, AA.',
        'Ada berapa kemungkinan seluruhnya?',
        'Berapa di antaranya yang keduanya gambar?',
      ],
      pembahasan:
        'Ruang sampelnya {GG, GA, AG, AA} — empat hasil berpeluang sama. Hanya satu yang keduanya gambar, jadi P = 1/4. Perhatikan GA dan AG dihitung terpisah; itulah sebabnya jawaban 1/3 keliru.',
    },
  ],

  lanjut: ['persen-dari', 'rata-rata-menipu', 'pecahan-penyebut'],
}

export default konsep
