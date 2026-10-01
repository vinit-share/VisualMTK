/* ============================================================
   KONSEP — Kenapa volume kerucut sepertiga tabung?
   Kelas 9 · Pengukuran

   Percobaan menuang tiga kali memang meyakinkan, tetapi ia hanya
   MEMPERLIHATKAN, belum menjelaskan. Alasan sebenarnya ada pada
   irisan mendatar: pada ketinggian x bagian dari tinggi total,
   jari-jari kerucut menyusut menjadi (1 − x) kali, sehingga luas
   irisannya menjadi (1 − x)² kali luas irisan tabung.

   Rata-rata nilai (1 − x)² untuk x dari 0 sampai 1 adalah 1/3.
   Di situlah angka sepertiga itu berasal.

   Interaksi langsung — sama di bongkar maupun eksperimen:
   - tepi kanan alas kerucut diseret mendatar         → r
   - puncak kerucut diseret naik-turun                → t
   - bidang irisan diseret naik-turun di kanan tabung → irisan

   Pegangan utama (yang berdenyut dan mengajak) mengikuti cerita: di bongkar
   puncak kerucut selama langkah 0…3 (bangunnya dulu yang dikenali) lalu
   pindah ke bidang irisan mulai langkah 4, di eksperimen langsung bidang
   irisan — yang memang jadi judul dan ajakannya.

   Dua tata letak: LEBAR (700 × 450, grafik di kanan) dan HP (420 × 546,
   bangun besar di atas, grafik di bawah).
   ============================================================ */

import { Pegangan, useInteraksi } from '../components/Interaksi'
import { Svg, Tag, useSempit } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

/* ---------------- Tata letak ---------------- */

/**
 * Satu sistem koordinat untuk satu ukuran panggung. Skala satuan TIDAK
 * bergantung pada penggeser, supaya titik yang diseret selalu menempel pada
 * jari: posisi pegangan = titik acuan + nilai × satuan, dan `keNilai`
 * membaliknya persis.
 */
interface Tata {
  w: number
  h: number
  maxH: number
  /** satuan SVG per satu satuan jari-jari. */
  sr: number
  /** satuan SVG per satu satuan tinggi. */
  st: number
  /** setengah ketebalan elips alas (perspektif). */
  ry: number
  /** garis alas kedua bangun. */
  alas: number
  /** sumbu tegak kerucut dan tabung. */
  kx: number
  tx: number
  /** baris keterangan di atas gambar, dan label ukuran di bawah alas. */
  atasY: number
  hurufAtas: number
  labelY: number
  /** kotak grafik (1 − x)². */
  gx0: number
  gx1: number
  gy0: number
  gy1: number
  hurufGrafik: number
  judulGrafik: string
}

/*
 * Tata letak lebar. Jari-jari paling besar 5 (R = 80), tinggi paling besar 8
 * (T = 240), sehingga kerucut menempati 60…220 dan tabung 260…420: masih ada
 * 40 satuan bersih di antara keduanya. Garis irisan membentang tetap dari
 * x = 42 sampai x = 458 dengan pegangannya di x = 440, jadi label dan kotak
 * ajakannya tetap di kiri grafik yang mulai di x = 500. Puncak tertinggi ada
 * di y = 110; label pegangannya muncul di atas titik itu dan tetap di bawah
 * baris keterangan y = 40.
 */
const LEBAR: Tata = {
  w: 700,
  h: 450,
  maxH: 460,
  sr: 16,
  st: 30,
  ry: 15,
  alas: 350,
  kx: 140,
  tx: 340,
  atasY: 40,
  hurufAtas: 16,
  labelY: 388,
  gx0: 500,
  gx1: 680,
  gy0: 120,
  gy1: 300,
  hurufGrafik: 13,
  judulGrafik: 'irisan kerucut ÷ tabung',
}

/*
 * Tata letak HP (420 × 546 — tinggi 1,3 × lebar). Kedua bangun digambar besar
 * di bagian atas (puncak tertinggi y = 106, alas y = 346), grafik pindah ke
 * bawahnya. Dengan sr = 14 dan st = 30, dua pegangan terdekat — tepi alas dan
 * puncak pada kerucut terkecil eksperimen (r = 1, t = 2,5) — berjarak
 * √(14² + 75²) ≈ 76 satuan. Di layar sempit panggung memakai seluruh lebar
 * kartu (lihat .card-visual .stage pada parts.css), jadi pada HP 320 px
 * panggungnya ±286 px: 76 × 286/420 ≈ 52 px layar, masih di atas 48 px.
 *
 * Sumbu kedua bangun sengaja digeser ke kiri (kx 100, tx 278) supaya masih
 * tersisa ruang di kanan: garis irisan membentang tetap dari x = 12 sampai
 * x = 386 dengan pegangannya di x = 368, dan kotak ajakan "Geser" di bawahnya
 * berakhir di x ≈ 406 — masih di dalam bingkai, dan tidak menyentuh label "t"
 * di bawah tabung sekalipun irisannya turun sampai ke alas.
 *
 * atasY = 28 (bukan 32): pada HP 320 px, saat puncak diseret sampai t = 8
 * (y = 106) kotak nilai "t = 8" milik pegangan berdiri di y ≈ 42, dan dengan
 * atasY = 32 kotak keterangan masih menjorok sampai y ≈ 43.
 */
const HP: Tata = {
  w: 420,
  h: 546,
  maxH: 470,
  sr: 14,
  st: 30,
  ry: 12,
  alas: 346,
  kx: 100,
  tx: 278,
  atasY: 28,
  hurufAtas: 14,
  labelY: 380,
  gx0: 60,
  gx1: 390,
  gy0: 424,
  gy1: 504,
  hurufGrafik: 12,
  judulGrafik: 'kerucut ÷ tabung',
}

/* ---------------- Posisi pegangan dan kebalikannya ---------------- */

/** Tepi kanan alas kerucut: x = kx + r × sr. */
const xTepiAlas = (L: Tata, r: number) => L.kx + r * L.sr
const nilaiJari = (L: Tata) => (pt: { x: number; y: number }) => (pt.x - L.kx) / L.sr

/** Puncak kerucut: y = alas − t × st. */
const yPuncak = (L: Tata, tinggi: number) => L.alas - tinggi * L.st
const nilaiTinggi = (L: Tata) => (pt: { x: number; y: number }) => (L.alas - pt.y) / L.st

/** Bidang irisan: y = alas − (t × st) × x. */
const yIrisan = (L: Tata, tinggi: number, x: number) => L.alas - tinggi * L.st * x
const nilaiIrisan = (L: Tata, tinggi: number) => (pt: { x: number; y: number }) =>
  (L.alas - pt.y) / (tinggi * L.st)

/** Jari-jari terbesar yang mungkin, dipakai untuk lebar tetap garis irisan. */
const R_MAKS = 5

/*
 * Bidang irisan digambar sebagai satu garis mendatar selebar tetap yang
 * memuat kedua bangun pada jari-jari mana pun, dan pegangannya berdiri di
 * ujung kanan garis itu. Kolomnya sengaja TIDAK ikut jari-jari: pegangan ini
 * hanya bergerak naik-turun, jadi kolom tetap membuatnya selalu mudah
 * ditemukan, tidak pernah menindih tabung, dan — saat irisannya turun ke alas
 * — kotak ajakannya tetap bersih dari label "t" di bawah tabung.
 */
const xGarisKiri = (L: Tata) => L.kx - R_MAKS * L.sr - 18
const xPegangIrisan = (L: Tata) => L.tx + R_MAKS * L.sr + 20
const xGarisKanan = (L: Tata) => xPegangIrisan(L) + 18

/* ---------------- Bangun ruang ---------------- */

function Tabung({
  L,
  cx,
  r,
  tinggi,
  isi,
}: {
  L: Tata
  cx: number
  r: number
  tinggi: number
  /** 0..1 bagian yang terisi. */
  isi: number
}) {
  const warna = 'var(--m-c)'
  const atas = L.alas - tinggi
  const yIsi = L.alas - tinggi * clamp(isi, 0, 1)
  return (
    <g>
      {/* badan */}
      <path
        d={`M ${cx - r} ${atas} L ${cx - r} ${L.alas} A ${r} ${L.ry} 0 0 0 ${cx + r} ${L.alas} L ${cx + r} ${atas}`}
        fill="var(--m-ghost)"
        stroke="var(--ink-2)"
        strokeWidth={2}
      />
      {/* isi */}
      {isi > 0.005 && (
        <path
          d={`M ${cx - r} ${yIsi} L ${cx - r} ${L.alas} A ${r} ${L.ry} 0 0 0 ${cx + r} ${L.alas} L ${cx + r} ${yIsi} A ${r} ${L.ry} 0 0 1 ${cx - r} ${yIsi} Z`}
          fill={warna}
          fillOpacity={0.4}
          stroke={warna}
          strokeWidth={1.6}
        />
      )}
      <ellipse cx={cx} cy={atas} rx={r} ry={L.ry} fill="var(--surface)" stroke="var(--ink-2)" strokeWidth={2} />
      <ellipse
        cx={cx}
        cy={L.alas}
        rx={r}
        ry={L.ry}
        fill="none"
        stroke="var(--ink-2)"
        strokeWidth={2}
        strokeDasharray="4 4"
      />
    </g>
  )
}

function Kerucut({
  L,
  cx,
  r,
  tinggi,
  isi = 1,
}: {
  L: Tata
  cx: number
  r: number
  tinggi: number
  isi?: number
}) {
  const warna = 'var(--m-a)'
  const puncak = L.alas - tinggi
  return (
    <g>
      <path
        d={`M ${cx - r} ${L.alas} L ${cx} ${puncak} L ${cx + r} ${L.alas} A ${r} ${L.ry} 0 0 1 ${cx - r} ${L.alas} Z`}
        fill={warna}
        fillOpacity={0.35 * clamp(isi, 0, 1)}
        stroke="var(--ink-2)"
        strokeWidth={2}
      />
      <ellipse
        cx={cx}
        cy={L.alas}
        rx={r}
        ry={L.ry}
        fill="none"
        stroke="var(--ink-2)"
        strokeWidth={2}
        strokeDasharray="4 4"
      />
    </g>
  )
}

/** Garis jari-jari dan garis tinggi: objek yang dipegang kedua pegangan. */
function Ukuran({
  L,
  R,
  T,
  nyalaR,
  nyalaT,
}: {
  L: Tata
  R: number
  T: number
  nyalaR: boolean
  nyalaT: boolean
}) {
  return (
    <g style={{ pointerEvents: 'none' }}>
      <line
        x1={L.kx}
        y1={L.alas}
        x2={L.kx}
        y2={L.alas - T}
        stroke="var(--m-b)"
        strokeWidth={nyalaT ? 3.4 : 2}
        strokeDasharray="6 5"
        opacity={nyalaT ? 1 : 0.7}
      />
      <line
        x1={L.kx}
        y1={L.alas}
        x2={L.kx + R}
        y2={L.alas}
        stroke="var(--m-a)"
        strokeWidth={nyalaR ? 4 : 2.6}
      />
      <circle cx={L.kx} cy={L.alas} r={3.4} fill="var(--ink-2)" />
    </g>
  )
}

/** Bidang irisan mendatar beserta kedua lingkaran irisannya. */
function BidangIrisan({
  L,
  R,
  x,
  yIris,
  tampil,
  nyala,
}: {
  L: Tata
  R: number
  x: number
  yIris: number
  tampil: number
  nyala: boolean
}) {
  return (
    <g opacity={tampil} style={{ pointerEvents: 'none' }}>
      <line
        x1={xGarisKiri(L)}
        y1={yIris}
        x2={xGarisKanan(L)}
        y2={yIris}
        stroke="var(--m-hi)"
        strokeWidth={2.2}
        strokeDasharray="7 5"
      />
      <ellipse
        cx={L.kx}
        cy={yIris}
        rx={R * (1 - x)}
        ry={L.ry * (1 - x)}
        fill="var(--m-a)"
        fillOpacity={nyala ? 0.8 : 0.6}
        stroke="var(--m-a)"
        strokeWidth={nyala ? 3 : 2}
      />
      <ellipse
        cx={L.tx}
        cy={yIris}
        rx={R}
        ry={L.ry}
        fill="var(--m-c)"
        fillOpacity={nyala ? 0.7 : 0.45}
        stroke="var(--m-c)"
        strokeWidth={nyala ? 3 : 2}
      />
    </g>
  )
}

/** Grafik (1 − x)² beserta luas di bawahnya yang bernilai 1/3. */
function GrafikIrisan({ L, x, tampil }: { L: Tata; x: number; tampil: number }) {
  const gX = (v: number) => L.gx0 + v * (L.gx1 - L.gx0)
  const gY = (v: number) => L.gy1 - v * (L.gy1 - L.gy0)
  const d: string[] = []
  for (let i = 0; i <= 40; i++) {
    const v = i / 40
    d.push(`${i === 0 ? 'M' : 'L'} ${gX(v).toFixed(1)} ${gY((1 - v) ** 2).toFixed(1)}`)
  }
  return (
    <g opacity={tampil} style={{ pointerEvents: 'none' }}>
      <path
        d={`M ${gX(0)} ${gY(0)} ${d.slice(1).join(' ')} L ${gX(1)} ${gY(0)} Z`}
        fill="var(--m-a)"
        fillOpacity={0.24}
      />
      <line x1={L.gx0} y1={L.gy1} x2={L.gx1} y2={L.gy1} stroke="var(--m-axis)" strokeWidth={1.6} />
      <line x1={L.gx0} y1={L.gy0} x2={L.gx0} y2={L.gy1} stroke="var(--m-axis)" strokeWidth={1.6} />
      <line
        x1={L.gx0}
        y1={gY(1)}
        x2={L.gx1}
        y2={gY(1)}
        stroke="var(--m-grid)"
        strokeWidth={1}
        strokeDasharray="4 4"
      />
      <line
        x1={L.gx0}
        y1={gY(1 / 3)}
        x2={L.gx1}
        y2={gY(1 / 3)}
        stroke="var(--m-hi)"
        strokeWidth={2}
        strokeDasharray="6 5"
      />
      <path d={d.join(' ')} fill="none" stroke="var(--m-a)" strokeWidth={2.6} />
      <circle cx={gX(x)} cy={gY((1 - x) ** 2)} r={5} fill="var(--m-hi)" />
      <Tag x={(L.gx0 + L.gx1) / 2} y={L.gy0 - 17} warna="var(--m-a)" size={L.hurufGrafik}>
        {L.judulGrafik}
      </Tag>
      <Tag x={L.gx1 - 4} y={gY(1 / 3) - 14} anchor="end" warna="var(--m-hi)" size={L.hurufGrafik}>
        rata-ratanya 1/3
      </Tag>
      <Tag x={L.gx0 - 6} y={gY(1)} anchor="end" warna="var(--ink-soft)" size={L.hurufGrafik - 1} latar={null}>
        1
      </Tag>
      <Tag
        x={L.gx0}
        y={L.gy1 + 18}
        anchor="start"
        warna="var(--ink-soft)"
        size={L.hurufGrafik - 1}
        latar={null}
      >
        alas
      </Tag>
      <Tag
        x={L.gx1}
        y={L.gy1 + 18}
        anchor="end"
        warna="var(--ink-soft)"
        size={L.hurufGrafik - 1}
        latar={null}
      >
        puncak
      </Tag>
    </g>
  )
}

/* ---------------- Nilai penggeser bongkar ----------------
   Diturunkan di satu tempat saja supaya angka pada gambar dan angka pada
   teks langkah tidak pernah berbeda. */

const jariBongkar = (p: Record<string, number>) => clamp(p.r ?? 3, 1.5, 5)
const tinggiBongkar = (p: Record<string, number>) => clamp(p.t ?? 5, 3, 8)
const irisanBongkar = (p: Record<string, number>) => clamp(p.irisan ?? 0.4, 0, 0.95)
/** Volume tabung yang alas dan tingginya sama dengan kerucutnya. */
const volTabungBongkar = (p: Record<string, number>) =>
  Math.PI * jariBongkar(p) ** 2 * tinggiBongkar(p)

/* ---------------- Nilai penggeser eksperimen ----------------
   Sama alasannya: gambar, rumus hidup, dan teks temuan membaca angka yang
   sama persis. Batasnya mengikuti eksperimen.params. */

const jariEks = (p: Record<string, number>) => clamp(p.r ?? 3, 1, 5)
const tinggiEks = (p: Record<string, number>) => clamp(p.t ?? 5, 2.5, 8)
const irisanEks = (p: Record<string, number>) => clamp(p.irisan ?? 0.4, 0, 0.95)

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const L = useSempit() ? HP : LEBAR
  const aktif = useInteraksi()?.kendali.aktif ?? null

  const r = jariBongkar(p)
  const tg = tinggiBongkar(p)
  const x = irisanBongkar(p)

  const R = r * L.sr
  const T = tg * L.st
  const yIris = yIrisan(L, tg, x)
  const rasio = (1 - x) ** 2

  // Tiga kali tuang pada langkah 1..3.
  const tuang =
    step === 1
      ? seg(t, 0.1, 0.9) / 3
      : step === 2
        ? (1 + seg(t, 0.1, 0.9)) / 3
        : step >= 3
          ? Math.min(1, (2 + (step === 3 ? seg(t, 0.1, 0.9) : 1)) / 3)
          : 0

  // Bidang irisan hanya MUNCUL pada langkah 4; ketinggiannya selalu nilai
  // penggeser, supaya pegangannya tidak pernah lepas dari bidangnya.
  const iris = fase(step, t, 4)
  const grafik = fase(step, t, 5)
  const selesai = step >= 6

  const nyalaR = sorot === 'r'
  const nyalaT = sorot === 't'
  const nyalaLuas = sorot === 'luas'
  const nyalaTiga = sorot === 'tiga'

  return (
    <Svg
      w={L.w}
      h={L.h}
      maxH={L.maxH}
      label="Kerucut dan tabung beralas sama, beserta perbandingan luas irisannya"
    >
      {/* kerucut kiri: penuh di awal tiap tuangan, lalu kosong setelah isinya pindah ke tabung */}
      <Kerucut
        L={L}
        cx={L.kx}
        r={R}
        tinggi={T}
        isi={step >= 1 && step <= 3 ? 1 - seg(t, 0.1, 0.9) : 1}
      />
      {/* tabung kanan */}
      <Tabung L={L} cx={L.tx} r={R} tinggi={T} isi={tuang} />

      <Ukuran L={L} R={R} T={T} nyalaR={nyalaR || aktif === 'r'} nyalaT={nyalaT || aktif === 't'} />

      {iris > 0.02 && (
        <BidangIrisan L={L} R={R} x={x} yIris={yIris} tampil={iris} nyala={nyalaLuas || aktif === 'irisan'} />
      )}

      {grafik > 0.05 && <GrafikIrisan L={L} x={x} tampil={grafik} />}

      {/* ukuran — disembunyikan saat pegangannya dipegang, karena pegangan
          sudah menampilkan angka yang sama di dekat jari */}
      {aktif !== 'r' && (
        <Tag x={L.kx} y={L.labelY} warna={nyalaR ? 'var(--m-hi)' : 'var(--m-a)'} size={14}>
          {`r = ${fmt(r)}`}
        </Tag>
      )}
      {aktif !== 't' && (
        <Tag x={L.tx} y={L.labelY} warna={nyalaT ? 'var(--m-hi)' : 'var(--m-b)'} size={14}>
          {`t = ${fmt(tg)}`}
        </Tag>
      )}

      {/* keterangan tiap tahap */}
      {step === 0 && (
        <Tag x={L.w / 2} y={L.atasY} warna="var(--ink-2)" size={L.hurufAtas}>
          {L === HP ? 'alasnya sama, tingginya sama' : 'alasnya sama, tingginya sama — hanya bentuknya berbeda'}
        </Tag>
      )}
      {step >= 1 && step <= 3 && (
        <Tag x={L.w / 2} y={L.atasY} warna="var(--m-c)" size={L.hurufAtas}>
          {`tuangan ke-${Math.min(3, step)} · terisi ${fmt(Math.round(tuang * 100))}%`}
        </Tag>
      )}
      {step === 4 && (
        <Tag x={L.w / 2} y={L.atasY} warna="var(--m-hi)" size={L.hurufAtas}>
          {L === HP
            ? `jari-jari ${fmt((1 - x) * 100, 0)}% · luas ${fmt(rasio * 100, 0)}%`
            : `pada ketinggian ini jari-jari kerucut tinggal ${fmt((1 - x) * 100, 0)}% — luasnya ${fmt(rasio * 100, 0)}%`}
        </Tag>
      )}
      {step === 5 && (
        <Tag x={L.w / 2} y={L.atasY} warna="var(--m-hi)" size={L.hurufAtas}>
          {L === HP ? 'luas irisan mengikuti (1 − x)²' : 'perbandingan luas irisan mengikuti kurva (1 − x)²'}
        </Tag>
      )}
      {selesai && (
        <Tag
          x={L.w / 2}
          y={L.atasY}
          warna={nyalaTiga ? 'var(--m-hi)' : 'var(--m-ab)'}
          size={L.hurufAtas + 1}
        >
          {`${L === HP ? 'V' : 'V kerucut'} = ⅓ × π × ${fmt(r)}² × ${fmt(tg)} = ${fmt(volTabungBongkar(p) / 3, 2)}`}
        </Tag>
      )}

      {/* ---- yang bisa dipegang ---- */}
      <Pegangan
        x={xTepiAlas(L, r)}
        y={L.alas}
        param="r"
        arah="x"
        label={`r = ${fmt(r)}`}
        keNilai={nilaiJari(L)}
      />
      {/* Ajakan "Coba geser aku" menggantung DI BAWAH puncak, jadi kotaknya
          jatuh di dalam kerucut, sekitar 35 satuan di bawah puncaknya. Dua
          akibatnya:
          1. Pada kerucut pendek (t = 3…4) kotak itu jatuh tepat di jalur kotak
             nilai "r = …" milik pegangan jari-jari — karena itu pegangan ini
             berhenti "utama" begitu ada yang dipegang.
          2. Mulai langkah 4 kotak itu duduk persis di atas LINGKARAN IRISAN
             kerucut (diukur: sampai 100% tertutup pada r kecil, mis. r = 1,5,
             t = 5, x = 0,8) — padahal lingkaran itulah tokoh utama langkah
             4…6. Karena itu denyut dan ajakan pindah ke pegangan bidang irisan
             pada langkah 4, yang juga persis objek yang diceritakan narasinya. */}
      <Pegangan
        x={L.kx}
        y={yPuncak(L, tg)}
        param="t"
        arah="y"
        utama={aktif === null && step < 4}
        label={`t = ${fmt(tg)}`}
        keNilai={nilaiTinggi(L)}
      />
      <Pegangan
        x={xPegangIrisan(L)}
        y={yIris}
        param="irisan"
        arah="y"
        utama={aktif === null && step >= 4}
        // Sependek di eksperimen: pegangan ini berdiri di kolom paling kanan,
        // dan "Coba geser aku" tidak muat di sana pada tata letak HP.
        ajakan="Geser"
        label={`${fmt(x * 100, 0)}%`}
        keNilai={nilaiIrisan(L, tg)}
        sembunyi={step < 4 || (step === 4 && t < 0.25)}
      />
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const L = useSempit() ? HP : LEBAR
  const aktif = useInteraksi()?.kendali.aktif ?? null

  const r = jariEks(p)
  const tg = tinggiEks(p)
  const x = irisanEks(p)

  const R = r * L.sr
  const T = tg * L.st
  const yIris = yIrisan(L, tg, x)
  const vTabung = Math.PI * r * r * tg

  const nyalaR = sorot === 'r'
  const nyalaT = sorot === 't'
  const nyalaLuas = sorot === 'luas'

  return (
    <Svg
      w={L.w}
      h={L.h}
      maxH={L.maxH}
      label="Kerucut dan tabung yang ukurannya bisa diubah, dengan bidang irisan mendatar"
    >
      <Kerucut L={L} cx={L.kx} r={R} tinggi={T} />
      <Tabung L={L} cx={L.tx} r={R} tinggi={T} isi={1 / 3} />

      <Ukuran L={L} R={R} T={T} nyalaR={nyalaR || aktif === 'r'} nyalaT={nyalaT || aktif === 't'} />

      <BidangIrisan L={L} R={R} x={x} yIris={yIris} tampil={1} nyala={nyalaLuas || aktif === 'irisan'} />

      <GrafikIrisan L={L} x={x} tampil={1} />

      {aktif !== 'r' && (
        <Tag x={L.kx} y={L.labelY} warna={nyalaR ? 'var(--m-hi)' : 'var(--m-a)'} size={14}>
          {`r = ${fmt(r)}`}
        </Tag>
      )}
      {aktif !== 't' && (
        <Tag x={L.tx} y={L.labelY} warna={nyalaT ? 'var(--m-hi)' : 'var(--m-b)'} size={14}>
          {`t = ${fmt(tg)}`}
        </Tag>
      )}

      <Tag x={L.w / 2} y={L.atasY} warna="var(--m-ab)" size={L.hurufAtas}>
        {L === HP
          ? `tabung ${fmt(vTabung, 1)} · kerucut ${fmt(vTabung / 3, 1)}`
          : `V tabung ${fmt(vTabung, 1)} · V kerucut ${fmt(vTabung / 3, 1)}`}
      </Tag>

      {/* ---- yang bisa dipegang ---- */}
      <Pegangan
        x={xTepiAlas(L, r)}
        y={L.alas}
        param="r"
        arah="x"
        label={`r = ${fmt(r)}`}
        keNilai={nilaiJari(L)}
      />
      <Pegangan
        x={L.kx}
        y={yPuncak(L, tg)}
        param="t"
        arah="y"
        label={`t = ${fmt(tg)}`}
        keNilai={nilaiTinggi(L)}
      />
      {/* Pegangan utama eksperimen: bidang irisan — persis yang disebut judul
          dan ajakannya. Teksnya dipendekkan menjadi satu kata karena pegangan
          ini berdiri di kolom paling kanan: sebelum panggung terukur, mesin
          memakai skala cadangan 0,6 sehingga kotak ajakan digambar besar, dan
          "Coba geser aku" akan keluar bingkai HP maupun menindih grafik.
          Sama seperti di bongkar, ajakannya berhenti selama ada pegangan lain
          yang dipegang, supaya kotaknya tidak pernah menutupi kotak nilai. */}
      <Pegangan
        x={xPegangIrisan(L)}
        y={yIris}
        param="irisan"
        arah="y"
        utama={aktif === null}
        ajakan="Geser"
        label={`${fmt(x * 100, 0)}%`}
        keNilai={nilaiIrisan(L, tg)}
      />
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'kerucut-sepertiga',
  topicId: 'smp9-luas-permukaan-dan-volume-kerucut',
  judul: 'Volume kerucut',
  pertanyaan: 'Kenapa volume kerucut sepertiga tabung?',
  tagline: 'Tuang isinya tiga kali. Tabungnya pas penuh. Tapi kenapa harus tiga?',
  kelas: 9,
  domain: 'pengukuran',
  tags: ['kerucut', 'tabung', 'volume', 'sepertiga', 'irisan'],

  tebak: {
    pertanyaan:
      'Sebuah kerucut dan tabung punya alas yang sama dan tinggi yang sama. Kalau isi kerucut dituang ke tabung, berapa kali tuangan sampai tabungnya penuh?',
    pilihan: [
      {
        id: 'a',
        label: '2 kali',
        balasan:
          'Tebakan yang wajar, karena kerucut "terlihat seperti separuh tabung". Tetapi kerucut menyusut ke arah puncak jauh lebih cepat daripada dugaan mata.',
      },
      {
        id: 'b',
        label: '3 kali',
        benar: true,
        balasan:
          'Betul. Dan yang jauh lebih menarik: kenapa tepat tiga, bukan 2,8 atau 3,2? Angka itu punya alasan.',
      },
      {
        id: 'c',
        label: '4 kali',
        balasan:
          'Terlalu banyak. Empat kali tuangan berarti luas irisan kerucut rata-rata hanya seperempat luas irisan tabung. Nanti kita lihat bahwa rata-ratanya ternyata tepat sepertiga, bukan seperempat.',
      },
    ],
    penutup:
      'Percobaan menuang bisa menunjukkan jawabannya, tetapi tidak menjelaskan. Kita akan mencari alasannya.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      {
        key: 'r',
        label: 'Jari-jari alas',
        min: 1.5,
        max: 5,
        step: 0.5,
        awal: 3,
        simbol: 'r',
        peran: 'a',
        bagian: 'r',
      },
      {
        key: 't',
        label: 'Tinggi',
        min: 3,
        max: 8,
        step: 0.5,
        awal: 5,
        simbol: 't',
        peran: 'b',
        bagian: 't',
      },
      {
        key: 'irisan',
        label: 'Ketinggian irisan',
        min: 0,
        max: 0.95,
        step: 0.05,
        awal: 0.4,
        simbol: 'x',
        peran: 'hi',
        bagian: 'luas',
      },
    ],
    // luas memakai 'hi' supaya warnanya sama dengan bidang irisan merah muda
    // dan pegangannya — satu warna untuk objek, angka, dan bagian rumusnya.
    roles: { r: 'a', t: 'b', tiga: 'hi', luas: 'hi' },
    arti: {
      r: 'Jari-jari alas — sama untuk kerucut maupun tabung.',
      t: 'Tinggi — juga sama untuk keduanya.',
      tiga: 'Angka sepertiga. Ia berasal dari rata-rata nilai (1 − x)², bukan dari kesepakatan.',
      luas: 'Luas irisan mendatar pada ketinggian tertentu.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Dua bangun, alas dan tinggi sama',
        narasi: (p) =>
          `Kerucut dan tabung ini sama-sama berjari-jari ${fmt(jariBongkar(p))} dan sama-sama setinggi ${fmt(tinggiBongkar(p))}. Seret titik jingga di puncak kerucut atau titik ungu di tepi alasnya — kedua bangun ikut berubah bersama.`,
        rumus: 'V tabung = π[r:r]^2[t:t]',
        durasi: 2200,
      },
      {
        id: 's1',
        judul: 'Tuangan pertama',
        narasi: 'Isi penuh kerucut dituang ke dalam tabung. Baru terisi sepertiga bagian.',
        durasi: 2000,
      },
      {
        id: 's2',
        judul: 'Tuangan kedua',
        narasi: 'Dituang sekali lagi. Tabung terisi dua pertiga.',
        durasi: 1800,
      },
      {
        id: 's3',
        judul: 'Tuangan ketiga — pas penuh',
        narasi:
          'Tiga kali tuangan, tepat penuh. Percobaan ini meyakinkan, tetapi belum menjelaskan kenapa harus tiga.',
        durasi: 2200,
      },
      {
        id: 's4',
        judul: 'Iris keduanya mendatar',
        narasi:
          'Pada ketinggian mana pun, irisan tabung selalu lingkaran yang sama besar dengan alasnya. Irisan kerucut mengecil: kalau sudah naik x bagian dari tingginya, jari-jarinya tinggal (1 − x) kali.',
        rumus: '[luas:luas irisan kerucut] = (1 − x)^2 × π[r:r]^2',
        durasi: 2800,
      },
      {
        id: 's5',
        judul: 'Kumpulkan seluruh irisan',
        narasi: (p) => {
          const x = irisanBongkar(p)
          if (x < 0.005) {
            return 'Irisannya masih tepat di alas, dan di situ irisan kerucut sama besar dengan irisan tabung. Seret titik merah muda di kanan tabung ke atas: titik pada grafik menuruni kurva (1 − x)² yang melengkung, bukan lurus.'
          }
          return `Pada ketinggian ${fmt(x * 100)}% dari alas, luas irisan kerucut tinggal ${fmt((1 - x) ** 2 * 100)}% dari luas irisan tabung. Kurvanya turun melengkung — bukan lurus — dari 1 di alas sampai 0 di puncak.`
        },
        durasi: 2800,
      },
      {
        id: 's6',
        judul: 'Rata-ratanya tepat sepertiga',
        narasi: (p) => {
          const v = volTabungBongkar(p)
          // Kedua angka dibulatkan, jadi keduanya ditulis "sekitar": 3 × hasil bulat
          // kerucut tidak selalu sama dengan hasil bulat tabung (mis. 8,25 × 3 ≠ 24,74).
          return `Volume adalah jumlah seluruh irisan, dan rata-rata (1 − x)² dari alas ke puncak bernilai 1/3. Jadi volume kerucut ini tepat sepertiga volume tabungnya: tabung sekitar ${fmt(v, 2)} satuan kubik, kerucut sekitar ${fmt(v / 3, 2)} satuan kubik.`
        },
        rumus: 'V kerucut = [tiga:⅓] × π[r:r]^2[t:t]',
        durasi: 2800,
      },
    ],
  },

  eksperimen: {
    judul: 'Naik-turunkan bidang irisannya',
    ajakan:
      'Seret titik merah muda di kanan tabung naik-turun. Lingkaran ungu menyusut, lingkaran biru tetap sama besar.',
    params: [
      {
        key: 'r',
        label: 'Jari-jari alas',
        min: 1,
        max: 5,
        step: 0.5,
        awal: 3,
        simbol: 'r',
        peran: 'a',
        bagian: 'r',
      },
      {
        key: 't',
        label: 'Tinggi',
        // Batas bawah 2,5 (bukan 2) murni alasan tata letak: pada kerucut
        // terkecil (r = 1) pegangan puncak dan pegangan tepi alas hanya
        // berjarak √(14² + 60²) ≈ 62 satuan di tata letak HP — kurang dari
        // 48 px layar pada HP sempit. Dengan 2,5 jaraknya ≈ 76 satuan, aman.
        // Kerucutnya masih sangat ceper, jadi maksud eksperimennya utuh.
        min: 2.5,
        max: 8,
        step: 0.5,
        awal: 5,
        simbol: 't',
        peran: 'b',
        bagian: 't',
      },
      {
        key: 'irisan',
        label: 'Ketinggian irisan',
        min: 0,
        max: 0.95,
        step: 0.01,
        awal: 0.4,
        simbol: 'x',
        peran: 'hi',
        bagian: 'luas',
      },
    ],
    Visual: VisualEksperimen,
    rumus: (p) => {
      const r = jariEks(p)
      const tg = tinggiEks(p)
      return `V kerucut = [tiga:⅓] × π × [r:${fmt(r)}]^2 × [t:${fmt(tg)}] = ${fmt((Math.PI * r * r * tg) / 3, 2)}`
    },
    temuan: (p) => {
      const r = jariEks(p)
      const tg = tinggiEks(p)
      const x = irisanEks(p)
      const rasio = (1 - x) ** 2
      return (
        <p>
          {x < 0.005 ? (
            <>
              Tepat di alas (0%), irisan kerucut masih <strong>sama besar</strong> dengan irisan
              tabung. Seret bidang irisannya ke atas: jari-jari kerucut mulai menyusut, dan luas
              irisannya menyusut lebih jauh lagi, karena jari-jari muncul dua kali pada rumus luas.
            </>
          ) : (
            <>
              Pada ketinggian {fmt(x * 100, 0)}% dari alas, jari-jari kerucut tinggal{' '}
              {fmt((1 - x) * 100, 0)}% — tetapi luas irisannya hanya{' '}
              <strong>{fmt(rasio * 100, 1)}%</strong> dari irisan tabung, karena jari-jari muncul
              dua kali pada rumus luas.
            </>
          )}{' '}
          Di pertengahan tinggi (50%), irisannya sudah menyusut menjadi
          seperempat — padahal kalau penyusutannya lurus, di titik itu ia masih setengah. Karena
          penyusutan luasnya melengkung seperti itulah rata-rata seluruh irisan turun ke 1/3, bukan
          1/2. Volume kerucut ini {fmt((Math.PI * r * r * tg) / 3, 2)} satuan kubik.
        </p>
      )
    },
  },

  penjelasan: {
    SMP: (
      <>
        <p>
          Percobaan menuang tiga kali sudah cukup untuk meyakinkan. Tetapi pertanyaan yang lebih baik
          adalah: <strong>kenapa tepat tiga?</strong>
        </p>
        <p>
          Jawabannya ada pada irisan mendatar. Bayangkan kedua bangun diiris tipis-tipis seperti roti.
          Setiap irisan tabung adalah lingkaran yang sama besar, dari bawah sampai atas.
        </p>
        <p>
          Irisan kerucut berbeda. Di alas ia sama besar dengan irisan tabung, tetapi makin ke atas
          makin kecil, sampai menjadi titik di puncak.
        </p>
        <h4>Kuncinya: luas menyusut mengikuti kuadrat</h4>
        <p>
          Di tengah-tengah tinggi, jari-jari kerucut tinggal <strong>setengahnya</strong>. Tetapi
          luas lingkaran memakai r², sehingga luasnya tinggal{' '}
          <strong>seperempat</strong> — bukan setengah.
        </p>
        <p>
          Karena itu, rata-rata seluruh irisan kerucut lebih kecil daripada separuh irisan tabung —
          separuh baru berlaku kalau luas irisannya menyusut lurus. Perhitungan lengkapnya memberi
          angka tepat 1/3.
        </p>
        <h4>Berlaku juga untuk limas</h4>
        <p>
          Alasan yang sama berlaku untuk limas terhadap prisma: V limas = ⅓ × luas alas × tinggi.
          Yang menentukan bukan bentuk alasnya, melainkan cara irisannya menyusut.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Pada ketinggian y dari alas (0 ≤ y ≤ t), kesebangunan memberi jari-jari kerucut
          r(y) = r(1 − y/t). Luas irisannya
        </p>
        <p style={{ textAlign: 'center' }}>
          A(y) = πr²(1 − y/t)²
        </p>
        <p>Volumenya adalah jumlah seluruh irisan tipis:</p>
        <p style={{ textAlign: 'center' }}>
          V = ∫₀<sup>t</sup> πr²(1 − y/t)² dy = πr²t ∫₀¹ (1 − u)² du = πr²t · [1/3] = ⅓πr²t
        </p>
        <p>
          Angka 1/3 datang dari ∫₀¹ (1 − u)² du = 1/3 — nilai yang sama dengan luas di bawah kurva
          y = x² pada selang [0, 1]. Jadi "sepertiga" pada kerucut, pada limas, dan pada luas di
          bawah parabola semuanya berasal dari satu sumber yang sama.
        </p>
        <h4>Tanpa integral: prinsip Cavalieri</h4>
        <p>
          Sebuah kubus dapat dipotong menjadi <strong>tiga</strong> limas kongruen: alasnya tiga
          sisi kubus yang bertemu di satu titik sudut, dan puncak ketiganya di titik sudut yang
          berseberangan. Karena ketiganya kongruen, masing-masing bernilai sepertiga kubus — tanpa
          perhitungan apa pun. Perhatikan limas ini miring: puncaknya tepat di atas salah satu sudut
          alas, bukan di atas titik tengahnya.
        </p>
        <p>
          Prinsip Cavalieri kemudian memperluasnya: dua benda yang sama tinggi dan setiap irisan
          mendatarnya pada ketinggian yang sama selalu sama luas pasti punya volume yang sama.
          Menggeser puncak limas miring tadi ke atas titik tengah alas tidak mengubah luas satu pun
          irisannya, jadi limas tegak juga sepertiga prisma. Limas dari kubus tingginya sama dengan
          sisi alasnya; limas yang lebih tinggi atau lebih pendek didapat dengan meregangkannya ke
          arah tegak, dan peregangan itu mengalikan volume limas dan prisma dengan faktor yang sama,
          sehingga perbandingan sepertiganya tetap. Terakhir, karena irisan limas maupun kerucut
          sama-sama menyusut menjadi (1 − x)² kali luas alas, hasil itu berlaku juga untuk kerucut
          yang luas alas dan tingginya sama dengan limas tersebut.
        </p>
        <h4>Catatan tentang percobaan menuang</h4>
        <p>
          Menuang tiga kali adalah <em>bukti empiris</em>, bukan bukti matematis. Ia tidak bisa
          membedakan 3 dari 2,99. Yang membuktikannya tetap perhitungan irisan di atas.
        </p>
      </>
    ),
  },

  rumus: {
    src: 'V kerucut = [tiga:⅓] × π × [r:r]^2 × [t:t]',
    roles: { tiga: 'hi', r: 'a', t: 'b' },
    arti: {
      tiga: 'Sepertiga — berasal dari rata-rata (1 − x)² sepanjang tinggi, bukan dari kesepakatan.',
      r: 'Jari-jari alas. Muncul dua kali karena luas alas berupa lingkaran.',
      t: 'Tinggi tegak lurus dari alas ke puncak — bukan panjang garis pelukis.',
    },
  },

  soal: [
    (rnd) => {
      const r = 3 + Math.floor(rnd() * 8)
      const t = 6 + Math.floor(rnd() * 10)
      const v = (3.14 * r * r * t) / 3
      return {
        id: 'ker-1',
        tipe: 'angka',
        topicId: 'smp9-luas-permukaan-dan-volume-kerucut',
        kelas: 9,
        tingkat: 'mudah',
        konsep: 'kerucut-sepertiga',
        pertanyaan: `Sebuah kerucut berjari-jari ${r} cm dan tinggi ${t} cm. Berapa volumenya? Gunakan π = 3,14 dan bulatkan sampai dua angka di belakang koma.`,
        jawaban: Math.round(v * 100) / 100,
        satuan: 'cm³',
        toleransi: 0.02,
        hint: [
          'Hitung dulu volume tabung yang alas dan tingginya sama.',
          `π r² t = 3,14 × ${r}² × ${t} = ${fmt(3.14 * r * r * t, 2)}.`,
          'Kerucut hanya sepertiganya.',
        ],
        pembahasan: `V = ⅓ × 3,14 × ${r}² × ${t} = ${fmt(Math.round(v * 100) / 100, 2)} cm³.`,
      }
    },
    {
      id: 'ker-2',
      tipe: 'pilihan',
      topicId: 'smp9-luas-permukaan-dan-volume-kerucut',
      kelas: 9,
      tingkat: 'sedang',
      konsep: 'kerucut-sepertiga',
      pertanyaan:
        'Pada setengah tinggi kerucut, luas irisan mendatarnya adalah berapa bagian dari luas alasnya?',
      pilihan: [
        { id: 'a', label: 'Seperempat', benar: true },
        {
          id: 'b',
          label: 'Setengah',
          diagnosa:
            'Yang tinggal setengah adalah JARI-JARINYA, bukan luasnya. Karena luas memakai r², efeknya dikuadratkan.',
        },
        {
          id: 'c',
          label: 'Sepertiga',
          diagnosa: 'Sepertiga adalah perbandingan volumenya, bukan perbandingan satu irisan.',
        },
        { id: 'd', label: 'Sama besar', diagnosa: 'Itu berlaku pada tabung, yang irisannya tidak berubah.' },
      ],
      hint: [
        'Berapa jari-jari kerucut pada setengah tingginya?',
        'Jari-jarinya tinggal setengah.',
        'Luas lingkaran memakai r², jadi hitung (½)².',
      ],
      pembahasan:
        'Jari-jarinya tinggal ½, sehingga luasnya (½)² = ¼ dari luas alas. Penyusutan yang dikuadratkan inilah sebab munculnya angka sepertiga pada volume.',
    },
    {
      id: 'ker-3',
      tipe: 'benar-salah',
      topicId: 'smp9-luas-permukaan-dan-volume-kerucut',
      kelas: 9,
      tingkat: 'sedang',
      konsep: 'kerucut-sepertiga',
      pertanyaan:
        'Percobaan menuang isi kerucut tiga kali ke dalam tabung sudah membuktikan bahwa volumenya tepat sepertiga.',
      jawaban: false,
      diagnosa:
        'Percobaan hanya bisa menunjukkan bahwa hasilnya sangat dekat dengan sepertiga. Ia tidak sanggup membedakan 3 dari 2,99 — untuk itu diperlukan alasan matematis.',
      hint: [
        'Apa bedanya "menunjukkan" dan "membuktikan"?',
        'Seberapa teliti sebuah percobaan menuang air bisa dilakukan?',
        'Apakah percobaan bisa memastikan angkanya tepat 3 dan bukan 3,01?',
      ],
      pembahasan:
        'Salah. Percobaan adalah bukti empiris yang meyakinkan tetapi tidak pasti. Bukti sesungguhnya datang dari perbandingan luas irisan (1 − x)², yang rata-ratanya tepat 1/3.',
    },
    (rnd) => {
      const r = 3 + Math.floor(rnd() * 6)
      const t = 6 + Math.floor(rnd() * 8)
      return {
        id: 'ker-4',
        tipe: 'angka',
        topicId: 'smp9-luas-permukaan-dan-volume-kerucut',
        kelas: 9,
        tingkat: 'sulit',
        konsep: 'kerucut-sepertiga',
        pertanyaan: `Sebuah tabung berjari-jari ${r} cm dan tinggi ${t} cm terisi penuh air. Air itu dituang ke dalam kerucut berjari-jari dan bertinggi sama. Berapa kerucut yang dibutuhkan untuk menampung seluruh air?`,
        jawaban: 3,
        satuan: 'kerucut',
        toleransi: 1e-9,
        hint: [
          'Bandingkan volume tabung dengan volume kerucut yang ukurannya sama.',
          'V tabung = πr²t, sedangkan V kerucut = ⅓πr²t.',
          'Perbandingannya tidak bergantung pada angka r dan t.',
        ],
        pembahasan:
          'Karena V tabung = 3 × V kerucut, dibutuhkan 3 kerucut. Perhatikan jawabannya tidak bergantung pada ukuran — selama alas dan tingginya sama, perbandingannya selalu 3.',
      }
    },
    {
      id: 'ker-5',
      tipe: 'urutkan',
      topicId: 'smp9-luas-permukaan-dan-volume-kerucut',
      kelas: 9,
      tingkat: 'sulit',
      konsep: 'kerucut-sepertiga',
      pertanyaan: 'Susun alasan kenapa volume kerucut sepertiga volume tabung.',
      langkah: [
        'Iris kerucut dan tabung dengan bidang mendatar',
        'Irisan tabung selalu sama besar, irisan kerucut mengecil ke arah puncak',
        'Pada ketinggian x bagian, jari-jari kerucut tinggal (1 − x) kali',
        'Karena luas memakai r², luas irisannya menjadi (1 − x)² kali',
        'Rata-rata (1 − x)² dari alas ke puncak bernilai 1/3',
        'Jadi volume kerucut sepertiga volume tabung',
      ],
      hint: [
        'Buktinya dimulai dengan memecah kedua bangun menjadi bagian yang bisa dibandingkan.',
        'Pengaruh kuadrat baru muncul setelah jari-jarinya dibandingkan.',
      ],
      pembahasan:
        'Inti buktinya adalah membandingkan irisan demi irisan. Volume tidak lain adalah jumlah seluruh irisan, sehingga perbandingan rata-rata irisan langsung menjadi perbandingan volume.',
    },
  ],

  lanjut: ['lingkaran-luas', 'integral-luas', 'segitiga-setengah'],
}

export default konsep
