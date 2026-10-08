/* ============================================================
   KONSEP — Kenapa logaritma mengubah perkalian jadi penjumlahan?
   Kelas 10 · Aljabar

   Gagasan: pada garis biasa, bilangan 2, 4, 8, 16, 32 makin lama
   makin renggang. Tetapi kalau yang dijadikan patokan adalah
   BANYAKNYA LANGKAH perkalian (yaitu pangkatnya), jaraknya menjadi
   rata. Pada tata letak itu, mengalikan berarti menyambung jarak —
   dan menyambung jarak berarti menjumlahkan.

   Logaritma tidak lain adalah jawaban atas pertanyaan
   "berapa langkah perkalian yang dibutuhkan?".

   Interaksi langsung (docs/PANDUAN-INTERAKSI.md):
   - pangkat pertama  a : seret ujung palang pertama pada garis langkah
   - pangkat kedua    b : seret ujung palang kedua (sambungannya)
   - bilangan pokok     : tombol di dalam gambar (hanya dua nilai)
   Palang pertama dan palang kedua sengaja dipisah menjadi dua baris:
   kalau disambung pada satu baris, kedua pegangan berimpit tepat saat
   b = 0 — keadaan yang justru sering dicoba anak.
   ============================================================ */

import { Pegangan, TombolGambar, useInteraksi } from '../components/Interaksi'
import { Svg, Tag, tinta, useSempit, useUkuranLayar } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt, sup } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

/**
 * Panjang garis langkah: 7 langkah untuk kedua bilangan pokok.
 * Karena a paling besar 4 dan b paling besar 3, a + b tidak pernah
 * melewati ujung garis — jadi pegangan hasil selalu ada di dalam
 * bingkai, dan tidak ada keadaan "hasilnya keluar dari gambar".
 */
const MAKS = 7

/* ---------------- Tata letak ---------------- */

interface Tata {
  w: number
  h: number
  maxH: number
  sempit: boolean
  /** ujung kiri dan kanan kedua garis bilangan. */
  X0: number
  X1: number
  /** kalimat perkalian di puncak gambar. */
  yJudul: number
  /** kalimat logaritma (hanya pada panggung eksperimen). */
  yLogaritma: number
  yLinear: number
  yKetLinear: number
  yLangkah: number
  yKetLangkah: number
  /** label nilai dipasang selang-seling dua baris bila tonggaknya rapat. */
  seling: boolean
  yPalangA: number
  yLabelA: number
  yPalangB: number
  yLabelB: number
  /**
   * Keterangan keadaan bilangan pokok ("1 langkah = × 2") dan tombol
   * penggantinya. Di layar lebar keduanya sebaris di sebelah kanan
   * keterangan garis biasa; di HP tidak ada ruang di sana, jadi keduanya
   * ditumpuk di bawah — keterangannya tetap lengkap supaya arti bilangan
   * pokok tidak hilang justru di layar yang paling sering dipakai.
   */
  ketPokok: { x: number; y: number }
  tombolPokok: { x: number; y: number }
}

const LEBAR: Tata = {
  w: 700,
  h: 490,
  maxH: 470,
  sempit: false,
  X0: 80,
  X1: 624,
  yJudul: 32,
  yLogaritma: 62,
  yLinear: 110,
  yKetLinear: 150,
  yLangkah: 234,
  yKetLangkah: 284,
  seling: false,
  yPalangA: 352,
  yLabelA: 322,
  yPalangB: 424,
  yLabelB: 394,
  // Digeser ke kanan: pada panggung 560 px (tata letak lebar yang paling
  // sempit, skala ±0,75) Tag membesar sampai ±14,6 satuan, sehingga latar
  // "1 langkah = × 2" sempat menimpa latar keterangan garis biasa yang
  // dimulai di X0. Tombolnya ikut bergeser supaya tetap ada jarak.
  ketPokok: { x: 505, y: 150 },
  tombolPokok: { x: 604, y: 150 },
}

const HP: Tata = {
  w: 420,
  h: 546,
  maxH: 520,
  sempit: true,
  X0: 84,
  X1: 336,
  yJudul: 26,
  // Dinaikkan karena alasan yang sama: pada 320 px, kalimat logaritma
  // membesar sampai ±16 satuan dan ekornya menyentuh angka garis biasa.
  yLogaritma: 53,
  yLinear: 106,
  // Keterangan garis biasa dinaikkan dan garis langkah diturunkan: di layar
  // 320 px sebuah Tag membesar sampai ±16 satuan (batas 11 px layar), dan
  // ekor hurufnya sempat menyentuh baris atas label selang-seling yang
  // dipasang di y = yLangkah − 48.
  yKetLinear: 126,
  yLangkah: 214,
  yKetLangkah: 266,
  seling: true,
  yPalangA: 346,
  yLabelA: 300,
  yPalangB: 426,
  yLabelB: 380,
  // Ditumpuk dan ditaruh cukup rendah supaya area sentuh tombol (±48 px
  // layar) tidak menyentuh area sentuh pegangan palang kedua, bahkan pada
  // layar 320 px — di situ jari-jari sentuh pegangan mencapai 38 satuan.
  ketPokok: { x: 210, y: 462 },
  tombolPokok: { x: 210, y: 506 },
}

/** Posisi langkah ke-k pada garis langkah. */
const kx = (L: Tata, k: number) => L.X0 + (k / MAKS) * (L.X1 - L.X0)

/** Kebalikan `kx`: posisi jari (koordinat SVG) menjadi banyaknya langkah. */
const keLangkah = (L: Tata, x: number) => ((x - L.X0) / (L.X1 - L.X0)) * MAKS

/** Setengah lebar sebuah `Tag`, memakai rumus lebar di Stage.tsx. */
function setengahTag(teks: string, size: number, u: (px: number, cadangan?: number) => number) {
  const ukuran = Math.max(size, Math.min(size * 1.6, u(11, size)))
  return (teks.length * ukuran * 0.58 + 7 * (ukuran / size) * 2) / 2
}

/** Keterangan di bawah sebuah garis: rata kiri di layar lebar, di tengah pada HP. */
function KetGaris({ L, y, warna, children }: { L: Tata; y: number; warna?: string; children: string }) {
  return (
    <Tag
      x={L.sempit ? L.w / 2 : L.X0}
      y={y}
      anchor={L.sempit ? 'middle' : 'start'}
      warna={warna ?? 'var(--ink-soft)'}
      size={13}
    >
      {children}
    </Tag>
  )
}

/* ---------------- Garis biasa (skala linear) ---------------- */

/**
 * Pada garis biasa hasil perkalian berulang menumpuk di ujung kiri.
 * Titiknya semua digambar (itulah pesannya), tetapi angkanya hanya
 * ditulis bila masih muat — kalau tidak, labelnya justru saling menimpa.
 */
function GarisLinear({ L, basis, tampil }: { L: Tata; basis: number; tampil: number }) {
  const u = useUkuranLayar()
  const nilaiMaks = basis ** MAKS
  const px = (v: number) => L.X0 + (v / nilaiMaks) * (L.X1 - L.X0)
  const huruf = u(12.5, 13)

  let xTerakhir = -Infinity
  let lebarTerakhir = 0
  const titik = Array.from({ length: MAKS + 1 }, (_, k) => basis ** k).map((v) => {
    const x = px(v)
    const teks = fmt(v)
    const lebar = teks.length * huruf * 0.58
    const beriLabel = x - xTerakhir >= (lebar + lebarTerakhir) / 2 + u(10, 10)
    if (beriLabel) {
      xTerakhir = x
      lebarTerakhir = lebar
    }
    return { x, teks, beriLabel }
  })

  return (
    <g opacity={tampil}>
      <line x1={L.X0} y1={L.yLinear} x2={L.X1} y2={L.yLinear} stroke="var(--m-axis)" strokeWidth={1.8} />
      {titik.map((d, k) => (
        <g key={k}>
          <circle cx={d.x} cy={L.yLinear} r={4.5} fill="var(--m-a)" />
          {d.beriLabel && (
            <text
              x={d.x}
              y={L.yLinear - 21}
              textAnchor="middle"
              fontSize={huruf}
              fontWeight={800}
              fill="var(--m-a-ink)"
              fontFamily="var(--font-math)"
            >
              {d.teks}
            </text>
          )}
        </g>
      ))}
      <KetGaris L={L} y={L.yKetLinear}>
        garis biasa: jarak = nilainya
      </KetGaris>
    </g>
  )
}

/* ---------------- Garis langkah (skala logaritma) ---------------- */

function GarisLangkah({
  L,
  basis,
  tampil,
  nyala,
}: {
  L: Tata
  basis: number
  tampil: number
  nyala: number
}) {
  const u = useUkuranLayar()
  const hurufNilai = u(13.5, 14)
  const hurufLangkah = u(12, 12.5)
  return (
    <g opacity={tampil}>
      <line x1={L.X0} y1={L.yLangkah} x2={L.X1} y2={L.yLangkah} stroke="var(--m-axis)" strokeWidth={1.8} />
      {Array.from({ length: MAKS + 1 }, (_, k) => k).map((k) => {
        const naik = L.seling && k % 2 === 1
        return (
          <g key={k}>
            <line
              x1={kx(L, k)}
              y1={L.yLangkah - 7}
              x2={kx(L, k)}
              y2={L.yLangkah + 7}
              stroke="var(--m-axis)"
              strokeWidth={1.4}
            />
            {naik && (
              <line
                x1={kx(L, k)}
                y1={L.yLangkah - 36}
                x2={kx(L, k)}
                y2={L.yLangkah - 12}
                stroke="var(--m-axis)"
                strokeWidth={1}
                opacity={0.5}
              />
            )}
            <text
              x={kx(L, k)}
              y={L.yLangkah - (naik ? 48 : 22)}
              textAnchor="middle"
              fontSize={hurufNilai}
              fontWeight={800}
              fill={tinta(nyala === k ? 'var(--m-hi)' : 'var(--m-b)')}
              fontFamily="var(--font-math)"
            >
              {fmt(basis ** k)}
            </text>
            <text
              x={kx(L, k)}
              y={L.yLangkah + 26}
              textAnchor="middle"
              fontSize={hurufLangkah}
              fontWeight={700}
              fill="var(--ink-soft)"
            >
              {fmt(k)}
            </text>
          </g>
        )
      })}
      <KetGaris L={L} y={L.yKetLangkah}>
        garis langkah: jarak = banyaknya langkah
      </KetGaris>
    </g>
  )
}

/** Palang penanda sepanjang beberapa langkah. */
function Palang({
  L,
  dari,
  ke,
  y,
  yLabel,
  warna,
  label,
  tampilLabel = true,
  opacity = 1,
}: {
  L: Tata
  dari: number
  ke: number
  y: number
  yLabel: number
  warna: string
  label: string
  /** disembunyikan saat pegangannya dipegang — pegangan menulis labelnya sendiri. */
  tampilLabel?: boolean
  opacity?: number
}) {
  const u = useUkuranLayar()
  const a = kx(L, dari)
  const b = kx(L, ke)
  const setengah = setengahTag(label, 14, u)
  const xLabel = clamp((a + b) / 2, setengah + 6, L.w - setengah - 6)
  return (
    <g opacity={opacity}>
      <line x1={a} y1={y} x2={b} y2={y} stroke={warna} strokeWidth={5} strokeLinecap="round" />
      <line x1={a} y1={y - 8} x2={a} y2={y + 8} stroke={warna} strokeWidth={2.4} />
      <line x1={b} y1={y - 8} x2={b} y2={y + 8} stroke={warna} strokeWidth={2.4} />
      {tampilLabel && (
        <Tag x={xLabel} y={yLabel} warna={warna} size={14}>
          {label}
        </Tag>
      )}
    </g>
  )
}

/**
 * Bilangan pokok hanya punya dua nilai, jadi lebih wajar diketuk daripada
 * diseret. Keterangan keadaannya ditulis utuh di kedua tata letak: "× 2"
 * saja tidak memberi tahu apa pun, sedangkan justru kalimat
 * "1 langkah = × 2" itulah arti seluruh garis langkah.
 */
function KendaliPokok({ L, basis }: { L: Tata; basis: number }) {
  const lain = basis === 2 ? 3 : 2
  return (
    <g>
      <Tag
        x={L.ketPokok.x}
        y={L.ketPokok.y}
        anchor={L.sempit ? 'middle' : 'end'}
        warna="var(--ink-2)"
        size={13}
      >
        {`1 langkah = × ${fmt(basis)}`}
      </Tag>
      <TombolGambar
        x={L.tombolPokok.x}
        y={L.tombolPokok.y}
        param="basis"
        ubah={(v) => (Math.round(v) === 2 ? 3 : 2)}
        label={`ganti ke × ${fmt(lain)}`}
      />
    </g>
  )
}

/* ---------------- Nilai bersama gambar dan teks langkah ---------------- */

/** Nilai penggeser yang dipakai gambar bongkar DAN teks langkahnya. */
function nilaiBongkar(p: Record<string, number>) {
  const basis = clamp(Math.round(p.basis ?? 2), 2, 3)
  const a = clamp(Math.round(p.a ?? 3), 0, 4)
  const b = clamp(Math.round(p.b ?? 2), 0, 3)
  return { basis, a, b, total: a + b }
}

/** Empat hasil perkalian berulang pertama, mis. "2, 4, 8, 16". */
const deretAwal = (basis: number) =>
  Array.from({ length: 4 }, (_, k) => fmt(basis ** (k + 1))).join(', ')

/**
 * Perkalian berulang ditulis panjang mulai dari 1, mis. (2, 3) -> "1 × 2 × 2 × 2",
 * supaya banyaknya tanda "× 2" sama dengan banyaknya langkah yang disebut.
 */
const kaliBerulang = (basis: number, n: number) => ['1', ...Array(n).fill(fmt(basis))].join(' × ')

/** Bilangan berpangkat untuk narasi, mis. (2, 3) -> "2³". */
const pangkat = (basis: number, n: number) => `${fmt(basis)}${sup(n)}`

/** Bilangan berpangkat untuk markup rumus — Formula mengubah ^{…} jadi pangkat. */
const pangkatRumus = (basis: number, n: number) => `${fmt(basis)}^{${fmt(n)}}`

/** Penulisan logaritma dengan bilangan pokok sebagai indeks bawah: "log₂" / "log₃". */
const logBasis = (basis: number) => (basis === 2 ? 'log₂' : 'log₃')

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const L = useSempit() ? HP : LEBAR
  return (
    <Svg
      w={L.w}
      h={L.h}
      maxH={L.maxH}
      label="Garis bilangan biasa dan garis berdasarkan banyaknya langkah perkalian"
    >
      <IsiBongkar L={L} step={step} t={t} p={p} sorot={sorot} />
    </Svg>
  )
}

/**
 * Isi panggung bongkar — sengaja komponen tersendiri, bukan badan VisualBongkar.
 * `useUkuranLayar()` membaca skala yang dipasang oleh `Svg`, jadi ia hanya
 * memberi ukuran layar yang benar bila dipanggil DI DALAM <Svg>.
 */
function IsiBongkar({ L, step, t, p, sorot }: DeriveState & { L: Tata }) {
  const { basis, a, b, total } = nilaiBongkar(p)
  const aktif = useInteraksi()?.kendali.aktif ?? null

  // Langkah 0 tetap MEMUNCULKAN garis biasa sejak bingkai pertama (0,35, sama
  // dengan kadar latarnya nanti) lalu menguatkannya. Kalau mulai dari nol,
  // anak yang baru membuka halaman menemukan panggung kosong sebelum menekan
  // "Putar" — tidak ada objek yang bisa dilihat, apalagi dipegang.
  const tampilLinear = step === 0 ? 0.35 + 0.65 * seg(t, 0.05, 0.9) : step <= 1 ? 1 : 0.35
  const tampilLangkah = fase(step, t, 1)
  const palangA = fase(step, t, 2)
  const geser = step === 3 ? seg(t, 0.1, 0.92) : step > 3 ? 1 : 0
  const selesai = step >= 4

  const nyalaLog = sorot === 'log' || sorot === 'langkah'
  const nyalaA = sorot === 'a' || aktif === 'a'
  const nyalaB = sorot === 'b' || sorot === 'kali' || aktif === 'b'

  // Pegangan disembunyikan selama palangnya belum utuh; selama itu label
  // palang yang menampilkan angkanya.
  const sembunyiA = palangA < 0.5
  const sembunyiB = geser < 0.995

  const ket =
    step === 0
      ? { teks: `${deretAwal(basis)}, … jaraknya melompat`, warna: 'var(--m-a)', size: 16 }
      : step === 1
        ? {
            teks: L.sempit
              ? 'pakai banyaknya langkah — jaraknya rata'
              : 'susun berdasarkan banyaknya langkah — jaraknya jadi rata',
            warna: 'var(--m-b)',
            size: 16,
          }
        : step === 2
          ? {
              teks: `${fmt(basis ** a)} berjarak ${fmt(a)} langkah dari 1`,
              warna: 'var(--m-a)',
              size: 16,
            }
          : step === 3
            ? {
                teks: L.sempit
                  ? `× ${fmt(basis ** b)} = sambung ${fmt(b)} langkah`
                  : `mengalikan dengan ${fmt(basis ** b)} = menyambung ${fmt(b)} langkah lagi`,
                warna: 'var(--m-hi)',
                size: 16,
              }
            : {
                teks: L.sempit
                  ? `${fmt(basis ** a)} × ${fmt(basis ** b)} = ${fmt(basis ** total)}  ·  ${fmt(a)} + ${fmt(b)} = ${fmt(total)}`
                  : `${fmt(basis ** a)} × ${fmt(basis ** b)} = ${fmt(basis ** total)}   ·   ${fmt(a)} + ${fmt(b)} = ${fmt(total)}`,
                warna: nyalaLog ? 'var(--m-hi)' : 'var(--m-ab)',
                size: 17,
              }

  return (
    <>
      {/* penghubung hasil digambar paling awal supaya latar label menutupinya */}
      {selesai && (
        <line
          x1={kx(L, total)}
          y1={L.yLangkah + 40}
          x2={kx(L, total)}
          y2={L.yPalangB}
          stroke="var(--m-hi)"
          strokeWidth={2.2}
          strokeDasharray="6 5"
          opacity={0.7}
        />
      )}

      <GarisLinear L={L} basis={basis} tampil={tampilLinear} />
      {tampilLangkah > 0.02 && (
        <GarisLangkah L={L} basis={basis} tampil={tampilLangkah} nyala={selesai ? total : -1} />
      )}

      {/* palang pertama: dari 1 sampai basis^a */}
      {palangA > 0.05 && (
        <Palang
          L={L}
          dari={0}
          ke={a}
          y={L.yPalangA}
          yLabel={L.yLabelA}
          warna={nyalaA ? 'var(--m-hi)' : 'var(--m-a)'}
          label={`${fmt(a)} langkah`}
          tampilLabel={sembunyiA || (!L.sempit && aktif !== 'a')}
          opacity={palangA}
        />
      )}

      {/* palang kedua: disambung sejauh b langkah, dimulai di tempat palang pertama berhenti */}
      {geser > 0.05 && (
        <Palang
          L={L}
          dari={a}
          ke={a + b * geser}
          y={L.yPalangB}
          yLabel={L.yLabelB}
          warna={nyalaB ? 'var(--m-hi)' : 'var(--m-b)'}
          label={`+ ${fmt(b)} langkah`}
          tampilLabel={sembunyiB || (!L.sempit && aktif !== 'b')}
          opacity={geser}
        />
      )}

      {/* garis putus yang menyambungkan ujung palang pertama ke awal palang kedua */}
      {geser > 0.05 && palangA > 0.05 && (
        <line
          x1={kx(L, a)}
          y1={L.yPalangA + 10}
          x2={kx(L, a)}
          y2={L.yPalangB - 10}
          stroke="var(--m-axis)"
          strokeWidth={1.2}
          strokeDasharray="4 4"
          opacity={Math.min(palangA, geser) * 0.8}
        />
      )}

      <Tag x={L.w / 2} y={L.yJudul} warna={ket.warna} size={ket.size}>
        {ket.teks}
      </Tag>

      <KendaliPokok L={L} basis={basis} />

      {/* Ujung tiap palang dipegang langsung. Selama palangnya belum ada,
          pegangannya ikut disembunyikan. Di HP labelnya menempel terus pada
          pegangan (labelSelalu): pil ajakan "Seret aku" tidak muat di bawah
          palang kedua pada layar sesempit itu, sedangkan denyut tetap ada. */}
      <Pegangan
        x={kx(L, a)}
        y={L.yPalangA}
        param="a"
        arah="x"
        utama={step <= 2}
        ajakan="Seret aku"
        sembunyi={sembunyiA}
        labelSelalu={L.sempit}
        label={`${fmt(a)} langkah`}
        keNilai={(pt) => keLangkah(L, pt.x)}
      />
      <Pegangan
        x={kx(L, a + b)}
        y={L.yPalangB}
        param="b"
        arah="x"
        utama={step >= 3}
        ajakan="Seret aku"
        sembunyi={sembunyiB}
        labelSelalu={L.sempit}
        label={`+ ${fmt(b)} langkah`}
        keNilai={(pt) => keLangkah(L, pt.x) - a}
      />
    </>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const L = useSempit() ? HP : LEBAR
  return (
    <Svg
      w={L.w}
      h={L.h}
      maxH={L.maxH}
      label="Garis langkah perkalian dengan dua pangkat yang bisa diubah"
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
  L: Tata
  p: Record<string, number>
  sorot: string | null
}) {
  const { basis, a, b, total } = nilaiBongkar(p)
  const aktif = useInteraksi()?.kendali.aktif ?? null
  // Tanpa indeks bawah, "log" berarti bilangan pokok 10 — jadi selalu ditulis.
  const logB = logBasis(basis)
  const nyalaA = sorot === 'a' || aktif === 'a'
  const nyalaB = sorot === 'b' || sorot === 'kali' || aktif === 'b'
  const nyalaLog = sorot === 'log' || sorot === 'langkah'

  return (
    <>
      <line
        x1={kx(L, total)}
        y1={L.yLangkah + 40}
        x2={kx(L, total)}
        y2={L.yPalangB}
        stroke="var(--m-hi)"
        strokeWidth={2.2}
        strokeDasharray="6 5"
        opacity={0.7}
      />

      <GarisLinear L={L} basis={basis} tampil={0.4} />
      <GarisLangkah L={L} basis={basis} tampil={1} nyala={total} />

      <Palang
        L={L}
        dari={0}
        ke={a}
        y={L.yPalangA}
        yLabel={L.yLabelA}
        warna={nyalaA ? 'var(--m-hi)' : 'var(--m-a)'}
        label={`${fmt(a)} langkah`}
        tampilLabel={!L.sempit && aktif !== 'a'}
      />
      <Palang
        L={L}
        dari={a}
        ke={a + b}
        y={L.yPalangB}
        yLabel={L.yLabelB}
        warna={nyalaB ? 'var(--m-hi)' : 'var(--m-b)'}
        label={`+ ${fmt(b)} langkah`}
        tampilLabel={!L.sempit && aktif !== 'b'}
      />
      <line
        x1={kx(L, a)}
        y1={L.yPalangA + 10}
        x2={kx(L, a)}
        y2={L.yPalangB - 10}
        stroke="var(--m-axis)"
        strokeWidth={1.2}
        strokeDasharray="4 4"
        opacity={0.8}
      />

      <Tag x={L.w / 2} y={L.yJudul} warna="var(--m-ab)" size={17}>
        {`${pangkat(basis, a)} × ${pangkat(basis, b)} = ${pangkat(basis, total)} = ${fmt(basis ** total)}`}
      </Tag>
      <Tag
        x={L.w / 2}
        y={L.yLogaritma}
        warna={nyalaLog ? 'var(--m-hi)' : 'var(--ink-2)'}
        size={15}
      >
        {`${logB} ${fmt(basis ** a)} + ${logB} ${fmt(basis ** b)} = ${fmt(a)} + ${fmt(b)} = ${fmt(total)}`}
      </Tag>

      <KendaliPokok L={L} basis={basis} />

      <Pegangan
        x={kx(L, a)}
        y={L.yPalangA}
        param="a"
        arah="x"
        labelSelalu={L.sempit}
        label={`${fmt(a)} langkah`}
        keNilai={(pt) => keLangkah(L, pt.x)}
      />
      <Pegangan
        x={kx(L, a + b)}
        y={L.yPalangB}
        param="b"
        arah="x"
        utama
        ajakan="Seret aku"
        labelSelalu={L.sempit}
        label={`+ ${fmt(b)} langkah`}
        keNilai={(pt) => keLangkah(L, pt.x) - a}
      />
    </>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'eksponen-logaritma',
  topicId: 'sma10-logaritma-definisi-dan-sifat-sifatnya',
  judul: 'Logaritma',
  pertanyaan: 'Kenapa logaritma mengubah perkalian menjadi penjumlahan?',
  tagline: 'Karena logaritma menghitung "berapa langkah", dan langkah memang dijumlahkan.',
  kelas: 10,
  domain: 'aljabar',
  tags: ['logaritma', 'eksponen', 'sifat logaritma', 'pertumbuhan'],

  tebak: {
    pertanyaan: 'Berapa hasil 2³ × 2⁴?',
    pilihan: [
      {
        id: 'a',
        label: '2¹²',
        balasan:
          'Pangkatnya dikalikan (3 × 4). Itu berlaku untuk (2³)⁴, yaitu pangkat dari pangkat — bukan untuk perkalian dua bilangan berpangkat.',
      },
      {
        id: 'b',
        label: '2⁷',
        benar: true,
        balasan:
          'Betul. 2³ berarti mengalikan 2 sebanyak 3 kali, 2⁴ sebanyak 4 kali. Digabung, seluruhnya 7 kali.',
      },
      {
        id: 'c',
        label: '4⁷',
        balasan:
          'Basisnya ikut dikalikan menjadi 4. Padahal yang dijumlahkan hanya banyaknya langkah; bilangan yang dikalikan tetap 2.',
      },
    ],
    penutup:
      'Menjumlahkan pangkat terasa wajar untuk eksponen. Logaritma hanyalah cara membaca hal yang sama dari arah sebaliknya.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      {
        key: 'basis',
        label: 'Bilangan pokok',
        min: 2,
        max: 3,
        step: 1,
        awal: 2,
        bulat: true,
        simbol: 'pokok',
        peran: 'plain',
      },
      {
        key: 'a',
        label: 'Pangkat pertama',
        min: 0,
        max: 4,
        step: 1,
        awal: 3,
        bulat: true,
        simbol: 'a',
        peran: 'a',
        bagian: 'a',
      },
      {
        key: 'b',
        label: 'Pangkat kedua',
        min: 0,
        max: 3,
        step: 1,
        awal: 2,
        bulat: true,
        simbol: 'b',
        peran: 'b',
        bagian: 'b',
      },
    ],
    roles: { a: 'a', b: 'b', log: 'ab', kali: 'hi', langkah: 'ab' },
    arti: {
      a: 'Banyaknya langkah perkalian untuk mencapai bilangan pertama.',
      b: 'Banyaknya langkah tambahan.',
      log: 'Logaritma — jawaban atas pertanyaan "berapa langkah perkalian yang dibutuhkan?".',
      kali: 'Perkalian pada bilangan menjadi penyambungan jarak pada garis langkah.',
      langkah: 'Penjumlahan pada banyaknya langkah — panjang palang pertama ditambah panjang palang kedua.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Pangkat tumbuh sangat cepat',
        narasi: (p) => {
          const { basis } = nilaiBongkar(p)
          return `Pada garis bilangan biasa, hasil perkalian berulang dengan ${fmt(basis)} — ${deretAwal(basis)}, … — makin lama makin renggang. Sulit menempatkan semuanya dalam satu gambar.`
        },
        durasi: 2400,
      },
      {
        id: 's1',
        judul: 'Ganti patokannya: hitung langkahnya',
        narasi:
          'Sekarang bukan nilainya yang dijadikan jarak, melainkan banyaknya perkalian yang dibutuhkan. Bilangan yang sama kini berjarak rata.',
        durasi: 2600,
      },
      {
        id: 's2',
        judul: 'Tandai bilangan pertama',
        narasi: (p) => {
          const { basis, a } = nilaiBongkar(p)
          if (a === 0)
            return `Bilangan pertama kali ini adalah 1 sendiri (${pangkat(basis, 0)}), jadi kamu tidak perlu mengalikan sama sekali. Banyaknya langkah yang dicatat adalah 0 — palangnya belum bergerak dari angka 1.`
          if (a === 1)
            return `Untuk sampai ke ${fmt(basis)} dari angka 1, kamu cukup mengalikan dengan ${fmt(basis)} satu kali. Banyaknya langkah itulah, yaitu 1, yang dicatat.`
          return `Untuk sampai ke ${fmt(basis ** a)} dari angka 1, kamu perlu mengalikan dengan ${fmt(basis)} sebanyak ${fmt(a)} kali: ${kaliBerulang(basis, a)} = ${fmt(basis ** a)}. Banyaknya langkah itulah, yaitu ${fmt(a)}, yang dicatat.`
        },
        rumus: (p) => {
          const { basis, a } = nilaiBongkar(p)
          return `langkah dari 1 sampai ${fmt(basis ** a)} = [a:${fmt(a)}]`
        },
        durasi: 2200,
      },
      {
        id: 's3',
        judul: 'Mengalikan berarti menyambung langkah',
        narasi: (p) => {
          const { basis, a, b, total } = nilaiBongkar(p)
          const bilPertama = fmt(basis ** a)
          if (b === 0)
            return `Mengalikan dengan 1 berarti melanjutkan perjalanan 0 langkah — kamu tidak bergerak sama sekali. Palang kedua tidak bertambah panjang, jadi ${bilPertama} × 1 tetap ${bilPertama}.`
          const kalimat1 =
            b === 1
              ? `Mengalikan dengan ${fmt(basis)} berarti melangkah satu kali lagi, jadi perjalananmu berlanjut 1 langkah.`
              : `Mengalikan dengan ${fmt(basis ** b)} sama dengan mengalikan dengan ${fmt(basis)} sebanyak ${fmt(b)} kali lagi, jadi perjalananmu berlanjut ${fmt(b)} langkah.`
          return `${kalimat1} Palang kedua tinggal disambung dari langkah ${fmt(a)} sampai langkah ${fmt(total)}.`
        },
        rumus: '[kali:×] pada nilai = [langkah:+] pada langkah',
        durasi: 2800,
      },
      {
        id: 's4',
        judul: 'Jadi pangkatnya dijumlahkan',
        narasi: (p) => {
          const { basis, a, b, total } = nilaiBongkar(p)
          if (total === 0)
            return `Kedua langkahnya nol, jadi palangnya tidak beranjak sama sekali dari angka 1. Pangkatnya pun 0 + 0 = 0, dan ${pangkat(basis, 0)} memang bernilai 1.`
          return `Panjang kedua palang adalah ${fmt(a)} langkah ditambah ${fmt(b)} langkah, yaitu ${fmt(total)} langkah. Karena posisi pada garis ini menandai pangkat, ${pangkat(basis, a)} × ${pangkat(basis, b)} bernilai ${pangkat(basis, total)} — pangkatnya memang tinggal kamu jumlahkan.`
        },
        rumus: (p) => {
          const { basis, a, b, total } = nilaiBongkar(p)
          return `${pangkatRumus(basis, a)} × ${pangkatRumus(basis, b)} = ${pangkatRumus(basis, total)}  ·  [a:${fmt(a)}] + [b:${fmt(b)}] = ${fmt(total)}`
        },
        durasi: 2400,
      },
      {
        id: 's5',
        judul: 'Logaritma membaca sumbu bawah',
        narasi: (p) => {
          const { basis, a } = nilaiBongkar(p)
          const logB = logBasis(basis)
          return `Angka di bawah garis adalah logaritma dengan bilangan pokok ${fmt(basis)} dari bilangan di atasnya, misalnya ${logB} ${fmt(basis ** a)} = ${fmt(a)}. Jadi ${logB} sebenarnya bertanya: "berapa kali mengalikan dengan ${fmt(basis)} untuk sampai dari 1 ke bilangan ini?"`
        },
        rumus: (p) => `[log:${logBasis(nilaiBongkar(p).basis)} N] = banyaknya langkah dari 1 sampai N`,
        durasi: 2600,
      },
      {
        id: 's6',
        judul: 'Sifat logaritma yang terkenal',
        narasi:
          'Karena logaritma membaca posisi pada sumbu bawah, perkalian di atas otomatis menjadi penjumlahan di bawah — sifat ini tidak perlu dihafal, ia terlihat. Gambar hanya menampilkan langkah bulat, tetapi sifat ini berlaku untuk semua bilangan positif, termasuk yang banyak langkahnya bukan bilangan bulat.',
        rumus: '[log:log](P × Q) = [log:log] P + [log:log] Q',
        durasi: 2600,
      },
    ],
  },

  eksperimen: {
    judul: 'Sambung dua langkah sesukamu',
    ajakan:
      'Seret ujung kedua palang, atau ketuk tombol bilangan pokok di dalam gambar. Perhatikan kalimat perkalian di atas dan kalimat logaritma di bawahnya — keduanya selalu cocok.',
    params: [
      {
        key: 'basis',
        label: 'Bilangan pokok',
        min: 2,
        max: 3,
        step: 1,
        awal: 2,
        bulat: true,
        simbol: 'pokok',
        peran: 'plain',
      },
      {
        key: 'a',
        label: 'Pangkat pertama',
        min: 0,
        max: 4,
        step: 1,
        awal: 3,
        bulat: true,
        simbol: 'a',
        peran: 'a',
        bagian: 'a',
      },
      {
        key: 'b',
        label: 'Pangkat kedua',
        min: 0,
        max: 3,
        step: 1,
        awal: 2,
        bulat: true,
        simbol: 'b',
        peran: 'b',
        bagian: 'b',
      },
    ],
    Visual: VisualEksperimen,
    // Rumus hidup di bawah gambar: angkanya ikut bergerak, dan bagian
    // [a]/[b] menyala saat pegangan palangnya dipegang (lewat
    // ParamSpec.bagian), jadi objek, angka, dan rumus terasa satu sistem.
    rumus: (p) => {
      const { basis, a, b, total } = nilaiBongkar(p)
      const logB = logBasis(basis)
      const P = fmt(basis ** a)
      const Q = fmt(basis ** b)
      return `[log:${logB}](${P} × ${Q}) = [log:${logB}] ${P} + [log:${logB}] ${Q} = [a:${fmt(a)}] + [b:${fmt(b)}] = ${fmt(total)}`
    },
    temuan: (p) => {
      const { basis, a, b, total } = nilaiBongkar(p)
      return (
        <p>
          <strong>
            {pangkat(basis, a)} × {pangkat(basis, b)} = {fmt(basis ** a)} × {fmt(basis ** b)} ={' '}
            {fmt(basis ** total)}
          </strong>{' '}
          — dan pangkatnya {fmt(a)} + {fmt(b)} = {fmt(total)}.{' '}
          {a === 0
            ? `Perhatikan ${pangkat(basis, 0)} = 1: nol langkah berarti belum bergerak dari angka 1. Itulah kenapa bilangan apa pun selain nol, bila dipangkatkan nol, bernilai 1.`
            : b === 0
              ? `Perhatikan ${pangkat(basis, 0)} = 1: palang kedua sepanjang nol langkah, jadi mengalikan dengan 1 tidak menggeser hasilnya sama sekali.`
              : 'Seret ujung salah satu palang sampai panjangnya nol: palang itu berarti × 1 — ia tidak menambah langkah, jadi hasilnya ditentukan palang yang satu lagi saja.'}{' '}
          Perhatikan juga jarak pada garis atas melompat-lompat, sedangkan pada garis bawah selalu
          rata.
        </p>
      )
    },
  },

  penjelasan: {
    SMA: (
      <>
        <p>
          Logaritma menjawab satu pertanyaan: <strong>"pangkat berapa?"</strong> Kalimat
          log₂ 32 = 5 berarti "2 harus dipangkatkan 5 untuk menghasilkan 32". Jadi logaritma dan
          eksponen adalah dua cara membaca hubungan yang sama.
        </p>
        <p style={{ textAlign: 'center' }}>
          a<sup>c</sup> = b ⟺ log<sub>a</sub> b = c
        </p>
        <h4>Kenapa perkalian menjadi penjumlahan</h4>
        <p>
          Misalkan P = a<sup>m</sup> dan Q = a<sup>n</sup>. Maka
        </p>
        <p style={{ textAlign: 'center' }}>
          P × Q = a<sup>m</sup> · a<sup>n</sup> = a<sup>m+n</sup>
        </p>
        <p>
          Sifat eksponen ini sendiri bukan aturan baru: mengalikan a sebanyak m kali lalu n kali
          lagi berarti mengalikannya m + n kali. Membaca kedua ruas sebagai logaritma memberi
        </p>
        <p style={{ textAlign: 'center' }}>
          log<sub>a</sub>(P × Q) = m + n = log<sub>a</sub> P + log<sub>a</sub> Q
        </p>
        <p>
          Hitungan "m kali lalu n kali lagi" hanya masuk akal bila m dan n bilangan cacah (0, 1,
          2, …). Untuk bilangan yang bukan pangkat bulat dari a, banyaknya langkah bukan bilangan
          bulat — misalnya log<sub>2</sub> 6 ≈ 2,585. Untuk a positif, aturan a<sup>m</sup> ·
          a<sup>n</sup> = a<sup>m+n</sup> tetap berlaku untuk pangkat berapa pun — negatif, pecahan,
          bahkan irasional (pangkat semacam itu memang didefinisikan agar aturan ini terjaga),
          sehingga sifat di atas berlaku untuk semua P dan Q positif.
        </p>
        <p>
          Dengan alasan serupa: log(P/Q) = log P − log Q, dan log(Pⁿ) = n · log P.
        </p>
        <h4>Kenapa dulu ini penting sekali</h4>
        <p>
          Sebelum ada kalkulator, mengalikan bilangan besar sangat melelahkan sedangkan menjumlahkan
          mudah. Tabel logaritma dan mistar hitung memanfaatkan sifat inilah — dan penemuan Napier
          pada 1614 dianggap melipatgandakan kecepatan kerja para astronom.
        </p>
        <h4>Batas yang harus diingat</h4>
        <ul>
          <li>log hanya terdefinisi untuk bilangan positif — tidak ada pangkat yang menghasilkan bilangan negatif atau nol dari basis positif.</li>
          <li>Basisnya harus positif dan tidak sama dengan 1, karena 1 dipangkatkan apa pun tetap 1.</li>
          <li>log(P + Q) TIDAK selalu sama dengan log P + log Q (kebetulan sama hanya bila P + Q = P × Q, misalnya P = Q = 2). Yang berubah menjadi penjumlahan hanya perkalian.</li>
        </ul>
        <p>
          Skala logaritma dipakai di mana-mana justru karena sifat ini: skala Richter, desibel, dan
          pH semuanya mengubah perkalian besar menjadi penjumlahan kecil yang mudah dibaca.
        </p>
      </>
    ),
    SMP: (
      <>
        <p>
          Pangkat itu singkatan dari perkalian berulang: 2³ berarti 2 × 2 × 2, atau: mulai dari 1,
          lalu kalikan dengan 2 sebanyak 3 kali. Angka 3 menghitung{' '}
          <strong>berapa kali</strong> kita mengalikan dengan 2.
        </p>
        <p>
          Kalau kamu mengalikan 2³ dengan 2⁴, kamu melakukan 3 kali perkalian lalu 4 kali lagi —
          seluruhnya 7 kali. Jadi hasilnya 2⁷. Angkanya dijumlahkan karena yang dihitung adalah{' '}
          <em>banyaknya langkah</em>.
        </p>
        <p>
          Logaritma nanti hanyalah cara bertanya sebaliknya: "kalau hasilnya 128, berapa langkah
          yang tadi dilakukan?"
        </p>
      </>
    ),
  },

  rumus: {
    src: '[log:log](P × Q) = [log:log] P + [log:log] Q',
    // a dan b tidak ada di rumus akhir, tetapi ada di rumus hidup
    // eksperimen — warna dan artinya diambil dari sini.
    roles: { log: 'ab', a: 'a', b: 'b' },
    arti: {
      log: 'Logaritma — banyaknya langkah perkalian dari 1 sampai bilangan itu. Karena menghitung langkah, menggabungkan perkalian berarti menjumlahkan langkahnya.',
      a: 'Banyaknya langkah perkalian pada palang pertama — seret ujungnya di gambar.',
      b: 'Banyaknya langkah tambahan pada palang kedua — seret ujungnya di gambar.',
    },
  },

  soal: [
    (rnd) => {
      const m = 2 + Math.floor(rnd() * 4)
      const n = 2 + Math.floor(rnd() * 4)
      return {
        id: 'log-1',
        tipe: 'angka',
        topicId: 'sma10-logaritma-definisi-dan-sifat-sifatnya',
        kelas: 10,
        tingkat: 'mudah',
        konsep: 'eksponen-logaritma',
        pertanyaan: `Hasil dari 2^${m} × 2^${n} adalah 2 pangkat berapa?`,
        jawaban: m + n,
        toleransi: 1e-9,
        hint: [
          'Pangkat menghitung banyaknya perkalian yang dilakukan.',
          `2^${m} berarti mengalikan dengan 2 sebanyak ${m} kali; dikalikan lagi dengan 2^${n} berarti ${n} kali lagi.`,
          'Jadi seluruhnya tinggal dijumlahkan.',
        ],
        pembahasan: `2^${m} × 2^${n} = 2^${m + n} = ${fmt(2 ** (m + n))}. Pangkat dijumlahkan karena yang dihitung adalah banyaknya langkah perkalian.`,
      }
    },
    {
      id: 'log-2',
      tipe: 'angka',
      topicId: 'sma10-logaritma-definisi-dan-sifat-sifatnya',
      kelas: 10,
      tingkat: 'mudah',
      konsep: 'eksponen-logaritma',
      pertanyaan: 'Berapa nilai log₂ 32?',
      jawaban: 5,
      toleransi: 1e-9,
      hint: [
        'Pertanyaannya: 2 harus dipangkatkan berapa supaya hasilnya 32?',
        'Coba hitung 2, 4, 8, 16, 32 — sambil menghitung berapa kali kamu mengalikan.',
        'Dari 1 ke 32 diperlukan lima kali perkalian dengan 2.',
      ],
      pembahasan: 'Karena 2⁵ = 32, maka log₂ 32 = 5. Logaritma menghitung banyaknya langkah perkalian.',
    },
    {
      id: 'log-3',
      tipe: 'benar-salah',
      topicId: 'sma10-logaritma-definisi-dan-sifat-sifatnya',
      kelas: 10,
      tingkat: 'sedang',
      konsep: 'eksponen-logaritma',
      pertanyaan: 'Berlaku log(P + Q) = log P + log Q untuk semua P dan Q positif.',
      jawaban: false,
      diagnosa:
        'Yang berubah menjadi penjumlahan hanyalah PERKALIAN, bukan penjumlahan. Uji dengan P = Q = 1: ruas kiri log 2, ruas kanan 0.',
      hint: [
        'Perhatikan operasi di dalam kurung: perkalian atau penjumlahan?',
        'Sifat yang benar adalah log(P × Q) = log P + log Q.',
        'Coba masukkan P = Q = 1 untuk menguji.',
      ],
      pembahasan:
        'Salah. Untuk P = Q = 1: log(1+1) = log 2 ≈ 0,301, sedangkan log 1 + log 1 = 0. Logaritma hanya menyederhanakan perkalian, pembagian, dan perpangkatan — tidak menyederhanakan penjumlahan.',
    },
    {
      id: 'log-4',
      tipe: 'pilihan',
      topicId: 'sma10-logaritma-definisi-dan-sifat-sifatnya',
      kelas: 10,
      tingkat: 'sedang',
      konsep: 'eksponen-logaritma',
      pertanyaan: 'Kenapa a⁰ = 1 untuk setiap a ≠ 0?',
      pilihan: [
        {
          id: 'a',
          label: 'Karena nol langkah perkalian berarti belum bergerak dari 1',
          benar: true,
        },
        {
          id: 'b',
          label: 'Karena nol dikali apa pun hasilnya nol',
          diagnosa:
            'Angka nol di sini adalah PANGKATNYA, bukan bilangan yang dikalikan. Keduanya hal yang berbeda.',
        },
        {
          id: 'c',
          label: 'Karena sudah disepakati begitu',
          diagnosa:
            'Kesepakatan itu bukan sembarangan — ia satu-satunya nilai yang menjaga aturan aᵐ ÷ aⁿ = aᵐ⁻ⁿ tetap berlaku.',
        },
      ],
      hint: [
        'Lihat garis langkah pada gambar: di mana letak posisi nol langkah?',
        'Coba juga hitung a³ ÷ a³ dengan dua cara.',
        'a³ ÷ a³ = 1, sekaligus sama dengan a³⁻³ = a⁰.',
      ],
      pembahasan:
        'Pada garis langkah, posisi 0 adalah titik awal, yaitu angka 1. Secara aljabar: a³ ÷ a³ jelas bernilai 1, dan menurut aturan pangkat sama dengan a⁰. Jadi definisi a⁰ = 1 dipaksakan oleh konsistensi aturan pangkat, bukan kesepakatan sembarangan.',
    },
    {
      id: 'log-5',
      tipe: 'angka',
      topicId: 'sma10-logaritma-definisi-dan-sifat-sifatnya',
      kelas: 10,
      tingkat: 'sulit',
      konsep: 'eksponen-logaritma',
      pertanyaan: 'Diketahui log 2 ≈ 0,301 dan log 3 ≈ 0,477. Berapa nilai log 6? Bulatkan sampai tiga angka di belakang koma.',
      jawaban: 0.778,
      toleransi: 0.0015,
      hint: [
        'Bisakah 6 ditulis sebagai perkalian dua bilangan yang logaritmanya sudah diketahui?',
        '6 = 2 × 3.',
        'Gunakan log(P × Q) = log P + log Q.',
      ],
      pembahasan:
        'log 6 = log(2 × 3) = log 2 + log 3 ≈ 0,301 + 0,477 = 0,778. Inilah cara kerja tabel logaritma dahulu: perkalian diselesaikan lewat penjumlahan.',
    },
  ],

  lanjut: ['deret-gauss', 'parabola', 'perkalian-luas'],
}

export default konsep
