/* ============================================================
   KONSEP — Kenapa luas segitiga dibagi 2?
   Kelas 5 · Pengukuran

   Gagasan pembuktian (jujur secara matematis, bukan analogi):
   sebuah segitiga digandakan, lalu salinannya diputar setengah
   putaran mengelilingi TITIK TENGAH salah satu sisi selain alas.
   Kedua segitiga itu pasti membentuk jajar genjang beralas a —
   dan jajar genjang bisa dipotong-geser menjadi persegi panjang
   beralas a dan bertinggi t (satu potongan cukup bila kaki garis
   tinggi jatuh pada alas; bila sangat miring, perlu beberapa
   potongan). Jadi dua segitiga = a × t, satu segitiga = ½ a t.

   Interaksi langsung: anak menyeret PUNCAK segitiga (ke samping =
   posisi puncak, ke atas-bawah = tinggi) dan menarik ujung garis
   ukur di bawah alas (alas). Keduanya ada di bongkar dan eksperimen.
   ============================================================ */

import { Pegangan, useInteraksi } from '../components/Interaksi'
import { Svg, Tag, SikuSiku, useSempit, useSkalaSvg } from '../components/Stage'
import { fase, seg, easing } from '../lib/anim'
import { fmt, clamp } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

type Titik2 = [number, number]

/* ---------------- Tata letak ---------------- */

/**
 * Satu sistem koordinat untuk satu ukuran panggung. Skala satuan TIDAK
 * bergantung pada penggeser, supaya titik yang diseret selalu menempel pada
 * jari: posisi pegangan = kiri + nilai × satuan, dan keNilai membaliknya.
 */
interface Tata {
  w: number
  h: number
  /** batas tinggi tampilan di layar lebar (px). */
  maxH: number
  /** satuan SVG per satu satuan panjang. */
  satuan: number
  /** x titik A (ujung kiri alas). */
  kiri: number
  /** y garis alas. */
  dasar: number
  /** jarak garis ukur alas (tempat pegangan alas) di bawah alas. */
  ukur: number
  /** baris keterangan di atas gambar. */
  atasY: number
  hurufAtas: number
}

/*
 * Bongkar (alas 3…9, tinggi 2…6, puncak 0…1). Jajar genjang selebar
 * a·(1 + puncak) ≤ 18 satuan harus muat, dan salinan yang BERPUTAR
 * mengelilingi M menyapu setengah lingkaran: paling tinggi
 * t/2 + ½√((a + a·puncak)² + t²) ≤ 12,49 satuan di atas alas, paling rendah
 * ½√((a − a·puncak)² + t²) − t/2 ≤ 3,61 satuan di bawahnya, dan paling kiri
 * 0,49 satuan di kiri A. Tinggi gambar dipilih agar sapuan itu tetap di dalam
 * bingkai. Garis ukur alas cukup jauh di bawah alas supaya label pegangan alas
 * (yang muncul di atas titiknya) tidak menutupi alas.
 */
const BONGKAR_LEBAR: Tata = { w: 660, h: 462, maxH: 460, satuan: 28, kiri: 78, dasar: 356, ukur: 60, atasY: 30, hurufAtas: 17 }
const BONGKAR_HP: Tata = { w: 440, h: 362, maxH: 460, satuan: 20.5, kiri: 66, dasar: 262, ukur: 68, atasY: 20, hurufAtas: 15 }

/*
 * Eksperimen (alas 2…10, tinggi 1…6, puncak −0,4…1,4): puncak menjangkau
 * x = kiri − 4 … kiri + 14 satuan. Di kiri-kanan disisakan ruang untuk label
 * pegangan puncak ("t = 5,5") dan ajakan di bawahnya, yang tampil di tengah
 * titiknya; di atas puncak tertinggi ada ruang untuk label itu di bawah angka
 * luas. Garis ukur alas cukup jauh supaya label pegangan alas tidak menyentuh
 * pegangan puncak saat tingginya 1.
 * Semua jarak ini dihitung untuk skala layar serendah 0,6 px per satuan
 * (HP 320 px, dan nilai cadangan Pegangan sebelum gambar diukur).
 */
const EKS_LEBAR: Tata = { w: 660, h: 408, maxH: 430, satuan: 29, kiri: 182, dasar: 300, ukur: 74, atasY: 36, hurufAtas: 20 }
const EKS_HP: Tata = { w: 440, h: 330, maxH: 430, satuan: 17, kiri: 134, dasar: 210, ukur: 88, atasY: 18, hurufAtas: 18 }

/* ---------------- Geometri bersama ---------------- */

interface Bentuk {
  A: Titik2
  B: Titik2
  P: Titik2
  M: Titik2
  b: number
  h: number
  px: number
}

function bentuk(alas: number, tinggi: number, puncak: number, L: Tata): Bentuk {
  const b = alas * L.satuan
  const h = tinggi * L.satuan
  const px = puncak * b
  const A: Titik2 = [L.kiri, L.dasar]
  const B: Titik2 = [L.kiri + b, L.dasar]
  const P: Titik2 = [L.kiri + px, L.dasar - h]
  // Titik tengah sisi PB — pusat perputaran salinan.
  const M: Titik2 = [(B[0] + P[0]) / 2, (B[1] + P[1]) / 2]
  return { A, B, P, M, b, h, px }
}

/**
 * Kebalikan posisi pegangan puncak. Puncak digambar di
 * (kiri + puncak·alas·satuan, dasar − tinggi·satuan), jadi dari jari:
 */
const nilaiPuncak = (L: Tata, alas: number) => (pt: { x: number; y: number }) => ({
  tinggi: (L.dasar - pt.y) / L.satuan,
  puncak: (pt.x - L.kiri) / (alas * L.satuan),
})

/** Kebalikan posisi pegangan alas (x = kiri + alas × satuan). */
const nilaiAlas = (L: Tata) => (pt: { x: number; y: number }) => (pt.x - L.kiri) / L.satuan

/* ---------------- Label yang tidak saling menabrak ---------------- */

type Jangkar = 'start' | 'middle' | 'end'

interface Kotak {
  x0: number
  y0: number
  x1: number
  y1: number
}

interface Tempat {
  x: number
  y: number
  anchor: Jangkar
  kotak: Kotak
}

/** Ukuran huruf Tag di layar ini (Tag memperbesar huruf agar ≥ 11 px). */
const ukuranTag = (skala: number, size: number) =>
  skala > 0 ? Math.max(size, Math.min(size * 1.6, 11 / skala)) : size

/** Kotak yang ditempati sebuah Tag — rumusnya sama dengan Tag di Stage.tsx. */
function kotakTag(
  skala: number,
  x: number,
  y: number,
  teks: string,
  size: number,
  anchor: Jangkar = 'middle',
  layar = false,
): Kotak {
  const ukuran = layar ? size : ukuranTag(skala, size)
  const lebar = teks.length * ukuran * 0.58 + 14 * (ukuran / size)
  const x0 = anchor === 'middle' ? x - lebar / 2 : anchor === 'end' ? x - lebar : x
  return { x0, x1: x0 + lebar, y0: y - ukuran * 0.82, y1: y + ukuran * 0.68 }
}

const tempat = (
  skala: number,
  x: number,
  y: number,
  teks: string,
  size: number,
  anchor: Jangkar = 'middle',
): Tempat => ({ x, y, anchor, kotak: kotakTag(skala, x, y, teks, size, anchor) })

const tabrak = (a: Kotak, b: Kotak, sela = 2) =>
  a.x0 < b.x1 + sela && b.x0 < a.x1 + sela && a.y0 < b.y1 + sela && b.y0 < a.y1 + sela

/**
 * Calon pertama yang muat di bingkai dan tidak menabrak apa pun. Bila tidak
 * ada yang lega, label disembunyikan (null): angkanya tetap terbaca di kontrol
 * angka dan di rumus, dan itu lebih baik daripada label yang saling menimpa.
 */
function letakkan(calon: Tempat[], halangan: Kotak[], L: Tata): Tempat | null {
  const muat = (k: Kotak) => k.x0 >= 2 && k.y0 >= 2 && k.x1 <= L.w - 2 && k.y1 <= L.h - 2
  return calon.find((c) => muat(c.kotak) && !halangan.some((o) => tabrak(c.kotak, o))) ?? null
}

/** Ajakan di bawah pegangan puncak — dibuat pendek supaya muat walau puncaknya di tepi gambar. */
const AJAKAN = 'Seret aku'

/** Ukuran pegangan dalam satuan SVG — meniru Pegangan di Interaksi.tsx. */
function ukuranPegangan(skalaLayar: number) {
  const s = skalaLayar || 0.6
  const r = Math.max(8, 9 / s)
  const ujungPanah = r * 1.9 + 1 / s
  const lebarPanah = r * 0.55 + 1 / s
  return {
    r,
    ujungPanah,
    /** titik beserta panah petunjuk arahnya. */
    kotak([x, y]: Titik2, bebas: boolean): Kotak[] {
      const luar = r + 1.75 / s
      const k: Kotak[] = [
        { x0: x - luar, y0: y - luar, x1: x + luar, y1: y + luar },
        { x0: x - ujungPanah, y0: y - lebarPanah, x1: x + ujungPanah, y1: y + lebarPanah },
      ]
      if (bebas) k.push({ x0: x - lebarPanah, y0: y - ujungPanah, x1: x + lebarPanah, y1: y + ujungPanah })
      return k
    },
    /** lingkaran terang di sekeliling pegangan yang sedang dipegang. */
    halo: ([x, y]: Titik2): Kotak => ({ x0: x - r * 2.1, y0: y - r * 2.1, x1: x + r * 2.1, y1: y + r * 2.1 }),
    /** label nilai yang muncul di atas titik saat dipegang. */
    label: ([x, y]: Titik2, teks: string) => kotakTag(0, x, y - r - 22 / s, teks, 15 / s, 'middle', true),
    /** ajakan di bawah pegangan utama. */
    ajakan: ([x, y]: Titik2) => kotakTag(0, x, y + r + 24 / s, AJAKAN, 13 / s, 'middle', true),
  }
}

type UkuranPegangan = ReturnType<typeof ukuranPegangan>

/**
 * Semua yang ditempati kedua pegangan: titik + panah, label nilai dan lingkaran
 * terang bila sedang dipegang, dan ajakan di bawah pegangan puncak.
 */
function halanganPegangan(
  peg: UkuranPegangan,
  P: Titik2,
  ujungAlas: Titik2,
  aktif: string | null,
  ajakan: boolean,
  teksT: string,
  teksA: string,
): Kotak[] {
  const k = [...peg.kotak(P, true), ...peg.kotak(ujungAlas, false)]
  if (aktif === 'tinggi') k.push(peg.label(P, teksT), peg.halo(P))
  if (aktif === 'alas') k.push(peg.label(ujungAlas, teksA), peg.halo(ujungAlas))
  // Ajakan hanya tampil selama tidak ada pegangan yang dipegang (lihat PeganganSegitiga).
  if (ajakan && aktif === null) k.push(peg.ajakan(P))
  return k
}

/**
 * Calon letak label t: di samping garis tinggi setengah jalan, lalu makin jauh
 * (melewati panah pegangan puncak bila tingginya pendek), lalu sejajar puncak.
 * Terakhir tepat di atas panah pegangan puncak — kira-kira tempat label
 * pegangannya muncul saat diseret, jadi angkanya tidak melompat jauh.
 */
function calonLabelT(skala: number, peg: UkuranPegangan, P: Titik2, dasar: number, teks: string, size: number) {
  const tengah = (P[1] + dasar) / 2
  const lewat = peg.ujungPanah + 8
  const letak: [number, number][] = [
    [14, tengah],
    [lewat, tengah],
    [lewat, P[1]],
    [lewat + 56, tengah],
  ]
  return [
    ...letak.flatMap(([d, y]) => [
      tempat(skala, P[0] - d, y, teks, size, 'end'),
      tempat(skala, P[0] + d, y, teks, size, 'start'),
    ]),
    tempat(skala, P[0], P[1] - peg.ujungPanah - 4 - 0.68 * ukuranTag(skala, size), teks, size),
  ]
}

/** Calon letak label a: pada garis ukur, di kanan pegangannya, atau di kiri A. */
function calonLabelA(
  skala: number,
  peg: UkuranPegangan,
  A: Titik2,
  B: Titik2,
  yUkur: number,
  teks: string,
  size: number,
) {
  return [
    tempat(skala, (A[0] + B[0]) / 2, yUkur, teks, size),
    tempat(skala, B[0] + peg.ujungPanah + 8, yUkur, teks, size, 'start'),
    tempat(skala, A[0] - 12, yUkur, teks, size, 'end'),
  ]
}

/* ---------------- Bagian gambar yang dipakai berulang ---------------- */

const putar = ([x, y]: Titik2, [cx, cy]: Titik2, derajat: number): Titik2 => {
  const a = (derajat * Math.PI) / 180
  const c = Math.cos(a)
  const s = Math.sin(a)
  const dx = x - cx
  const dy = y - cy
  return [cx + dx * c - dy * s, cy + dx * s + dy * c]
}

const poly = (...t: Titik2[]) => t.map(([x, y]) => `${x},${y}`).join(' ')

/** ├──── a ────● : garis ukur di bawah alas; titik di ujungnya adalah pegangan alas. */
function GarisUkurAlas({ bt, yUkur, nyala }: { bt: Bentuk; yUkur: number; nyala: boolean }) {
  const [ax, ay] = bt.A
  const [bx] = bt.B
  return (
    <g style={{ pointerEvents: 'none' }}>
      <line x1={ax} y1={ay + 5} x2={ax} y2={yUkur} stroke="var(--m-a)" strokeWidth={1.4} strokeDasharray="3 4" opacity={0.6} />
      <line x1={bx} y1={ay + 5} x2={bx} y2={yUkur} stroke="var(--m-a)" strokeWidth={1.4} strokeDasharray="3 4" opacity={0.6} />
      <line x1={ax} y1={yUkur} x2={bx} y2={yUkur} stroke="var(--m-a)" strokeWidth={nyala ? 3 : 2} />
      <line x1={ax} y1={yUkur - 7} x2={ax} y2={yUkur + 7} stroke="var(--m-a)" strokeWidth={2} />
    </g>
  )
}

/** Garis tinggi putus-putus dari puncak ke garis alas, dengan tanda siku-siku. */
function GarisTinggi({ bt, nyala }: { bt: Bentuk; nyala: boolean }) {
  const [kx, ky] = [bt.P[0], bt.A[1]]
  return (
    <g style={{ pointerEvents: 'none' }}>
      <line
        x1={bt.P[0]}
        y1={bt.P[1]}
        x2={kx}
        y2={ky}
        stroke="var(--m-b)"
        strokeWidth={nyala ? 4 : 2.4}
        strokeDasharray="7 5"
        style={{ transition: 'stroke-width var(--d-1)' }}
      />
      <SikuSiku x={kx} y={ky} ux={0} uy={-1} vx={1} vy={0} s={12} warna="var(--m-b)" />
    </g>
  )
}

function GarisAlas({ bt, nyala }: { bt: Bentuk; nyala: boolean }) {
  return (
    <line
      x1={bt.A[0]}
      y1={bt.A[1]}
      x2={bt.B[0]}
      y2={bt.B[1]}
      stroke="var(--m-a)"
      strokeWidth={nyala ? 7 : 4}
      strokeLinecap="round"
      style={{ transition: 'stroke-width var(--d-1)', pointerEvents: 'none' }}
    />
  )
}

/** Tag yang letaknya sudah dipilih oleh letakkan(). */
function TagDi({ di, warna, size, children }: { di: Tempat; warna: string; size: number; children: string }) {
  return (
    <Tag x={di.x} y={di.y} anchor={di.anchor} warna={warna} size={size}>
      {children}
    </Tag>
  )
}

/** Pegangan puncak (posisi puncak + tinggi) dan pegangan ujung garis ukur (alas). */
function PeganganSegitiga({
  L,
  bt,
  alas,
  yUkur,
  teksT,
  teksA,
  sembunyi = false,
  bolehUtama = true,
}: {
  L: Tata
  bt: Bentuk
  alas: number
  yUkur: number
  teksT: string
  teksA: string
  sembunyi?: boolean
  /** false bila ajakan di bawah puncak akan menutupi sesuatu yang sedang jadi tokoh. */
  bolehUtama?: boolean
}) {
  // Ajakan di bawah puncak baru hilang setelah seret pertama SELESAI. Selama
  // pegangan alas dipegang, puncak sementara bukan pegangan utama supaya
  // ajakannya tidak menabrak label alas saat tingginya pendek.
  const aktif = useInteraksi()?.kendali.aktif ?? null
  return (
    <>
      <Pegangan
        x={bt.B[0]}
        y={yUkur}
        param="alas"
        arah="x"
        label={teksA}
        keNilai={nilaiAlas(L)}
        sembunyi={sembunyi}
      />
      <Pegangan
        x={bt.P[0]}
        y={bt.P[1]}
        param={['tinggi', 'puncak']}
        panah={{ kiriKanan: 'puncak', atasBawah: 'tinggi' }}
        arah="bebas"
        utama={bolehUtama && aktif !== 'alas'}
        ajakan={AJAKAN}
        label={teksT}
        keNilai={nilaiPuncak(L, alas)}
        sembunyi={sembunyi}
      />
    </>
  )
}

/* ---------------- Nilai penggeser bongkar ---------------- */

/** Setengah langkah penggeser puncak: di bawah ini puncak dianggap tepat di ujung. */
const DEKAT_UJUNG = 0.005

/**
 * Satu-satunya tempat nilai penggeser bongkar diturunkan. Gambar DAN teks
 * langkah sama-sama memakai fungsi ini, supaya angka di narasi tidak pernah
 * berbeda dari angka yang tergambar.
 */
function nilaiBongkar(p: Record<string, number>) {
  const alas = p.alas ?? 6
  const tinggi = p.tinggi ?? 4
  // Puncak dijepit 0..1 supaya kaki garis tinggi selalu jatuh pada alas.
  const puncak = clamp(p.puncak ?? 0.35, 0, 1)
  return {
    alas,
    tinggi,
    puncak,
    luas: (alas * tinggi) / 2,
    /** puncak tepat di atas ujung kiri alas: gabungannya berdiri tegak. */
    tegak: puncak < DEKAT_UJUNG,
    /** puncak tepat di atas ujung kanan alas: potongan kirinya tepat separuh. */
    miringPenuh: puncak > 1 - DEKAT_UJUNG,
  }
}

/** Bangun bersudut siku-siku a × t: persegi bila alas sama dengan tinggi. */
const namaPersegi = (alas: number, tinggi: number) =>
  alas === tinggi ? 'persegi' : 'persegi panjang'

/** Nama bangun hasil gabungan dua segitiga, mengikuti posisi puncak. */
function namaGabungan(p: Record<string, number>): string {
  const { alas, tinggi, tegak } = nilaiBongkar(p)
  if (!tegak) return 'jajar genjang'
  // Puncak di ujung kiri membuat semua sudutnya siku-siku.
  return namaPersegi(alas, tinggi)
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar(props: DeriveState) {
  const L = useSempit() ? BONGKAR_HP : BONGKAR_LEBAR
  return (
    <Svg w={L.w} h={L.h} maxH={L.maxH} label="Segitiga digandakan dan diputar menjadi jajar genjang">
      <IsiBongkar {...props} L={L} />
    </Svg>
  )
}

/** Dipisah dari VisualBongkar supaya bisa membaca skala layar dari dalam Svg. */
function IsiBongkar({ step, t, p, sorot, L }: DeriveState & { L: Tata }) {
  const ctx = useInteraksi()
  const aktif = ctx?.kendali.aktif ?? null
  const skala = useSkalaSvg()
  const peg = ukuranPegangan(skala)

  const { alas, tinggi, puncak, luas, tegak } = nilaiBongkar(p)
  const bt = bentuk(alas, tinggi, puncak, L)
  const { A, B, P, M, b, h, px } = bt
  const yUkur = L.dasar + L.ukur
  const ujungAlas: Titik2 = [B[0], yUkur]

  /* --- kemajuan tiap tahap --- */
  const gambarSegitiga = fase(step, t, 0)
  const salinanMuncul = fase(step, t, 1)
  const sudutPutar = 180 * easing.inOutCubic(fase(step, t, 2))
  const tampakJajar = step >= 3
  // Potong bagian kiri jajar genjang lalu geser ke kanan sejauh a.
  const geser = step === 4 ? seg(t, 0.12, 0.92) : step === 5 ? 1 - seg(t, 0, 0.55) : 0
  // Potongan hanya tampak selama dipotong-geser. Begitu kembali ke bentuk semula
  // (tahap 5), yang tampak lagi adalah DUA segitiga kembar, sesuai narasinya.
  const tampakPotongan = step === 4 || (step === 5 && geser > 0)
  const sorotSetengah = step >= 6 ? seg(t, 0, 0.5) : 0
  // Ukuran dan pegangannya baru ada setelah segitiganya cukup tergambar.
  const tampakUkuran = gambarSegitiga > 0.6

  /* --- titik salinan setelah diputar --- */
  const A2 = putar(A, M, sudutPutar)
  const B2 = putar(B, M, sudutPutar)
  const P2 = putar(P, M, sudutPutar)

  const nyalaAlas = sorot === 'alas'
  const nyalaTinggi = sorot === 'tinggi'
  const nyalaSetengah = sorot === 'setengah'

  /* --- potongan saat jajar genjang diubah jadi persegi panjang --- */
  const kaki: Titik2 = [A[0] + px, L.dasar]
  const potKiri: Titik2[] = [A, kaki, P]
  const potKanan: Titik2[] = [kaki, B, [B[0] + px, P[1]], P]
  const geserX = geser * b

  /* --- label: yang tetap lebih dulu, lalu yang bisa pindah menghindar --- */
  const teksT = `t = ${fmt(tinggi)}`
  const teksA = `a = ${fmt(alas)}`
  const keterangan =
    step === 1 && salinanMuncul > 0.4
      ? { teks: 'salinan yang sama persis', warna: 'var(--m-b)' }
      : step === 3
        ? { teks: `dua segitiga = satu ${namaGabungan(p)}`, warna: 'var(--ink-2)' }
        : step >= 6
          ? { teks: `satu segitiga = ${fmt(luas)} = separuh dari ${fmt(alas * tinggi)}`, warna: 'var(--m-a)' }
          : null

  // Di tahap 2 titik putar adalah tokohnya. Bila ajakan "Seret aku" di bawah
  // puncak akan menutupi titik itu (puncak dekat ujung kiri, alas pendek),
  // puncak tidak dijadikan pegangan utama selama tahap ini.
  const kotakPutar: Kotak = { x0: M[0] - 7, y0: M[1] - 7, x1: M[0] + 7, y1: M[1] + 7 }
  const ajakanTutupPutar = step === 2 && !!ctx?.ajakan && tabrak(peg.ajakan(P), kotakPutar)
  const ajakanTampil = !!ctx?.ajakan && !ajakanTutupPutar

  const halangan: Kotak[] = []
  if (keterangan) halangan.push(kotakTag(skala, L.w / 2, L.atasY, keterangan.teks, L.hurufAtas))
  if (tampakUkuran) halangan.push(...halanganPegangan(peg, P, ujungAlas, aktif, ajakanTampil, teksT, teksA))
  if (step === 2) halangan.push(kotakPutar)

  // Luas persegi panjang: di tengahnya, tepat di kanannya, di atasnya, atau
  // (bila persegi panjangnya kecil dan sesak) di baris keterangan.
  const teksKotak = `a × t = ${fmt(alas * tinggi)}`
  const hurufKotak = L.hurufAtas + 1
  const letakKotak =
    step >= 4 && step <= 5 && geser > 0.9
      ? letakkan(
          [
            tempat(skala, P[0] + b / 2, L.dasar - h / 2, teksKotak, hurufKotak),
            tempat(skala, P[0] + b + 12, L.dasar - h / 2, teksKotak, hurufKotak, 'start'),
            tempat(skala, P[0] + b / 2, P[1] - 26, teksKotak, hurufKotak),
            tempat(skala, L.w / 2, L.atasY, teksKotak, hurufKotak),
          ],
          halangan,
          L,
        )
      : null
  if (letakKotak) halangan.push(letakKotak.kotak)

  // Di tahap 2 titik putar adalah tokohnya, jadi labelnya dapat tempat lebih dulu.
  const calonPutar: [number, number, Jangkar][] = [
    [14, -18, 'start'],
    [14, 18, 'start'],
    [-14, -18, 'end'],
    [-14, 18, 'end'],
    [0, -30, 'middle'],
    [0, 32, 'middle'],
    [peg.ujungPanah + 8, 0, 'start'],
    [-peg.ujungPanah - 8, 0, 'end'],
    [peg.ujungPanah + 8, 30, 'start'],
    [-peg.ujungPanah - 8, 30, 'end'],
    // Bila puncak di atas ujung kanan alas, M jatuh tepat di bawah pegangan
    // puncak dan ajakannya; labelnya perlu menjauh sedikit.
    [0, 66, 'middle'],
    [peg.ujungPanah + 50, 0, 'start'],
    [-peg.ujungPanah - 50, 0, 'end'],
  ]
  const letakPutar =
    step === 2
      ? letakkan(
          calonPutar.map(([dx, dy, jangkar]) => tempat(skala, M[0] + dx, M[1] + dy, 'titik putar', 15, jangkar)),
          halangan,
          L,
        )
      : null
  if (letakPutar) halangan.push(letakPutar.kotak)

  const hurufT = nyalaTinggi ? 19 : 16
  const letakT =
    tampakUkuran && aktif !== 'tinggi'
      ? letakkan(calonLabelT(skala, peg, P, L.dasar, teksT, hurufT), halangan, L)
      : null
  if (letakT) halangan.push(letakT.kotak)

  const hurufA = nyalaAlas ? 19 : 16
  const letakA =
    tampakUkuran && aktif !== 'alas'
      ? letakkan(calonLabelA(skala, peg, A, B, yUkur, teksA, hurufA), halangan, L)
      : null

  return (
    <>
      {/* garis dasar */}
      <line x1={8} y1={L.dasar} x2={L.w - 8} y2={L.dasar} stroke="var(--m-grid)" strokeWidth={2} />

      {/* --- tahap 4-5: jajar genjang dipotong dan digeser --- */}
      {step >= 4 && step <= 5 && (
        <g>
          <polygon points={poly(...potKanan)} fill="var(--m-ab-soft)" stroke="var(--m-ab)" strokeWidth={2.5} />
          {/* Bila tegak, potongan kiri hanyalah garis tanpa luas: tidak ada yang dipotong. */}
          {!tegak && (
            <polygon
              points={poly(...potKiri.map(([x, y]): Titik2 => [x + geserX, y]))}
              fill="var(--m-b-soft)"
              stroke="var(--m-b)"
              strokeWidth={2.5}
            />
          )}
        </g>
      )}

      {/* --- jajar genjang utuh (tahap 3 dan 6) --- */}
      {tampakJajar && !tampakPotongan && (
        <polygon
          points={poly(A, B, [B[0] + px, P[1]], P)}
          fill="var(--m-ghost)"
          stroke="var(--ink-3)"
          strokeWidth={2}
          strokeDasharray="6 6"
        />
      )}

      {/* --- salinan segitiga --- */}
      {salinanMuncul > 0 && !tampakPotongan && (
        <polygon
          points={poly(A2, B2, P2)}
          fill="var(--m-b)"
          fillOpacity={0.3 * salinanMuncul}
          stroke="var(--m-b)"
          strokeWidth={2.5}
          strokeOpacity={salinanMuncul}
        />
      )}

      {/* --- segitiga asli --- */}
      {!tampakPotongan && (
        <polygon
          points={poly(A, B, P)}
          fill="var(--m-a)"
          fillOpacity={(0.22 + 0.24 * sorotSetengah + (nyalaSetengah ? 0.2 : 0)) * gambarSegitiga}
          stroke="var(--m-a)"
          strokeWidth={3}
          strokeOpacity={gambarSegitiga}
          strokeLinejoin="round"
        />
      )}

      {/* --- ukuran: alas, tinggi, dan garis ukur tempat pegangan alas --- */}
      {tampakUkuran && (
        <>
          <GarisUkurAlas bt={bt} yUkur={yUkur} nyala={nyalaAlas} />
          <GarisAlas bt={bt} nyala={nyalaAlas} />
          <GarisTinggi bt={bt} nyala={nyalaTinggi} />
        </>
      )}
      {letakT && (
        <TagDi di={letakT} warna="var(--m-b)" size={hurufT}>
          {teksT}
        </TagDi>
      )}
      {letakA && (
        <TagDi di={letakA} warna="var(--m-a)" size={hurufA}>
          {teksA}
        </TagDi>
      )}
      {letakKotak && (
        <TagDi di={letakKotak} warna="var(--m-ab)" size={hurufKotak}>
          {teksKotak}
        </TagDi>
      )}

      {/* --- keterangan tahap --- */}
      {step === 2 && <circle cx={M[0]} cy={M[1]} r={6} fill="var(--m-hi)" />}
      {letakPutar && (
        <TagDi di={letakPutar} warna="var(--m-hi)" size={15}>
          titik putar
        </TagDi>
      )}
      {keterangan && (
        <Tag x={L.w / 2} y={L.atasY} warna={keterangan.warna} size={L.hurufAtas}>
          {keterangan.teks}
        </Tag>
      )}

      <PeganganSegitiga
        L={L}
        bt={bt}
        alas={alas}
        yUkur={yUkur}
        teksT={teksT}
        teksA={teksA}
        sembunyi={!tampakUkuran}
        bolehUtama={!ajakanTutupPutar}
      />
    </>
  )
}

/* ---------------- Visual untuk eksperimen bebas ---------------- */

function VisualEksperimen(props: { p: Record<string, number>; sorot: string | null }) {
  const L = useSempit() ? EKS_HP : EKS_LEBAR
  return (
    <Svg w={L.w} h={L.h} maxH={L.maxH} label="Segitiga yang bisa diubah alas, tinggi, dan posisi puncaknya">
      <IsiEksperimen {...props} L={L} />
    </Svg>
  )
}

/** Rentang posisi puncak di eksperimen (pecahan dari alas); dipakai params dan garis luncurnya. */
const PUNCAK_EKS = { min: -0.4, max: 1.4 }

function IsiEksperimen({ p, sorot, L }: { p: Record<string, number>; sorot: string | null; L: Tata }) {
  const ctx = useInteraksi()
  const aktif = ctx?.kendali.aktif ?? null
  const skala = useSkalaSvg()
  const peg = ukuranPegangan(skala)

  const alas = p.alas ?? 6
  const tinggi = p.tinggi ?? 4
  const puncak = p.puncak ?? 0.35
  const bt = bentuk(alas, tinggi, puncak, L)
  const { A, B, P } = bt
  const luas = (alas * tinggi) / 2
  const yUkur = L.dasar + L.ukur
  const ujungAlas: Titik2 = [B[0], yUkur]
  // Bayangan posisi puncak lain, memperlihatkan luas tak berubah.
  const bayang = [0, 0.5, 1].map((f) => bentuk(alas, tinggi, f, L))

  const teksT = `t = ${fmt(tinggi)}`
  const teksA = `a = ${fmt(alas)}`
  const judul = `Luas = ${fmt(luas)} satuan²`
  const nyalaAlas = sorot === 'alas'
  const nyalaTinggi = sorot === 'tinggi'

  const halangan: Kotak[] = [
    kotakTag(skala, L.w / 2, L.atasY, judul, L.hurufAtas),
    ...halanganPegangan(peg, P, ujungAlas, aktif, !!ctx?.ajakan, teksT, teksA),
  ]
  const hurufT = nyalaTinggi ? 19 : 16
  const letakT = aktif !== 'tinggi' ? letakkan(calonLabelT(skala, peg, P, L.dasar, teksT, hurufT), halangan, L) : null
  if (letakT) halangan.push(letakT.kotak)
  const hurufA = nyalaAlas ? 19 : 16
  const letakA = aktif !== 'alas' ? letakkan(calonLabelA(skala, peg, A, B, yUkur, teksA, hurufA), halangan, L) : null

  return (
    <>
      <line x1={8} y1={L.dasar} x2={L.w - 8} y2={L.dasar} stroke="var(--m-grid)" strokeWidth={2} />
      {/* garis sejajar alas setinggi t: puncak boleh diseret di sepanjang garis ini.
          Panjangnya persis sejauh puncak bisa pergi, supaya titiknya tidak
          berhenti di tengah garis tanpa sebab yang terlihat. */}
      <line
        x1={L.kiri + PUNCAK_EKS.min * bt.b}
        y1={P[1]}
        x2={L.kiri + PUNCAK_EKS.max * bt.b}
        y2={P[1]}
        strokeLinecap="round"
        stroke="var(--m-b)"
        strokeWidth={1.5}
        strokeDasharray="4 6"
        opacity={0.65}
      />

      {bayang.map((s, i) => (
        <polygon
          key={i}
          points={poly(s.A, s.B, s.P)}
          fill="none"
          stroke="var(--ink-3)"
          strokeWidth={1.2}
          strokeDasharray="3 5"
          opacity={0.5}
        />
      ))}

      <polygon
        points={poly(A, B, P)}
        fill="var(--m-a)"
        fillOpacity={0.24}
        stroke="var(--m-a)"
        strokeWidth={3}
        strokeLinejoin="round"
      />

      <GarisUkurAlas bt={bt} yUkur={yUkur} nyala={nyalaAlas} />
      <GarisAlas bt={bt} nyala={nyalaAlas} />
      <GarisTinggi bt={bt} nyala={nyalaTinggi} />
      {letakT && (
        <TagDi di={letakT} warna="var(--m-b)" size={hurufT}>
          {teksT}
        </TagDi>
      )}
      {letakA && (
        <TagDi di={letakA} warna="var(--m-a)" size={hurufA}>
          {teksA}
        </TagDi>
      )}

      <Tag x={L.w / 2} y={L.atasY} warna="var(--m-ab)" size={L.hurufAtas}>
        {judul}
      </Tag>

      <PeganganSegitiga L={L} bt={bt} alas={alas} yUkur={yUkur} teksT={teksT} teksA={teksA} />
    </>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'segitiga-setengah',
  topicId: 'sd5-luas-persegi-persegi-panjang-dan',
  judul: 'Luas segitiga',
  pertanyaan: 'Kenapa luas segitiga harus dibagi 2?',
  tagline:
    'Karena setiap segitiga sebenarnya separuh dari sebuah bangun yang jauh lebih mudah dihitung.',
  kelas: 5,
  domain: 'pengukuran',
  tags: ['segitiga', 'luas', 'alas', 'tinggi'],

  tebak: {
    pertanyaan:
      'Dua segitiga punya alas 6 dan tinggi 4. Bedanya, puncak segitiga kedua digeser jauh ke samping sehingga bentuknya jadi miring sekali. Mana yang luasnya lebih besar?',
    pilihan: [
      { id: 'a', label: 'Yang tegak', balasan: 'Yang tegak memang terlihat lebih "rapi", tapi rapi bukan berarti lebih luas.' },
      {
        id: 'b',
        label: 'Yang miring',
        balasan:
          'Yang miring terlihat lebih panjang karena sisi miringnya memanjang. Tapi sisi miring bukan tinggi.',
      },
      {
        id: 'c',
        label: 'Sama saja',
        benar: true,
        balasan:
          'Betul. Menggeser puncak menyamping tidak mengubah alas maupun tinggi — dan hanya dua hal itu yang menentukan luas.',
      },
    ],
    penutup:
      'Menggeser puncak ke samping hanya memiringkan segitiga, tidak menambah "isi"-nya. Sebentar lagi kamu bisa melihat kenapa.',
  },

  bongkar: {
    Visual: VisualBongkar,
    // Pegangan puncak berwarna tinggi (oranye), jadi posisi puncak memakai warna yang sama.
    // Posisi puncak sengaja tanpa `bagian` dan tanpa `simbol`: ia tidak punya lambang di
    // gambar maupun di rumus, dan kata "puncak" bila ditulis miring seperti variabel
    // matematika terbaca keliru. Kontrol angkanya memakai label "Posisi puncak".
    params: [
      { key: 'alas', label: 'Alas', min: 3, max: 9, step: 1, awal: 6, bulat: true, simbol: 'a', peran: 'a', bagian: 'alas' },
      { key: 'tinggi', label: 'Tinggi', min: 2, max: 6, step: 1, awal: 4, bulat: true, simbol: 't', peran: 'b', bagian: 'tinggi' },
      { key: 'puncak', label: 'Posisi puncak', min: 0, max: 1, step: 0.05, awal: 0.35, peran: 'b' },
    ],
    roles: { alas: 'a', tinggi: 'b', setengah: 'hi', luas: 'ab' },
    arti: {
      alas: 'Sisi yang kita jadikan alas — boleh sisi mana saja.',
      tinggi: 'Jarak tegak lurus dari puncak ke garis alas. Bukan panjang sisi miring.',
      setengah: 'Karena segitiganya tepat separuh dari jajar genjang yang tadi terbentuk.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Mulai dari satu segitiga',
        narasi: (p) => {
          const { alas, tinggi } = nilaiBongkar(p)
          return `Ini segitiga biasa: alasnya ${fmt(alas)} dan tingginya ${fmt(tinggi)}. Cuma dua angka itu yang perlu kamu catat — tinggi berarti jarak tegak lurus dari puncak ke alas, bukan panjang sisi miringnya.`
        },
        rumus: 'alas = [alas:a] · tinggi = [tinggi:t]',
        durasi: 1500,
      },
      {
        id: 's1',
        judul: 'Buat salinannya',
        narasi:
          'Sekarang kita jiplak segitiga itu persis sama. Dua segitiga yang identik — luasnya tentu sama besar.',
        durasi: 1200,
      },
      {
        id: 's2',
        judul: 'Putar salinannya setengah putaran',
        narasi:
          'Salinan diputar 180° mengelilingi titik tengah salah satu sisi selain alas. Perputaran tidak mengubah luas — bentuknya hanya berpindah tempat.',
        durasi: 2200,
      },
      {
        id: 's3',
        judul: (p) =>
          nilaiBongkar(p).tegak
            ? `Kali ini gabungannya ${namaGabungan(p)}`
            : 'Selalu terbentuk jajar genjang',
        narasi: (p) => {
          const { alas, tinggi, tegak } = nilaiBongkar(p)
          const ukuran = `beralas ${fmt(alas)} dan bertinggi ${fmt(tinggi)}`
          const awal = 'Kedua segitiga itu pas bertemu tanpa celah dan tanpa tumpang tindih.'
          return tegak
            ? `${awal} Karena puncaknya tepat di atas ujung kiri alas, gabungannya berdiri tegak: ${namaGabungan(p)} ${ukuran}.`
            : `${awal} Hasilnya jajar genjang ${ukuran}.`
        },
        durasi: 1600,
      },
      {
        id: 's4',
        judul: (p) => {
          const { alas, tinggi, tegak } = nilaiBongkar(p)
          return tegak
            ? `Bentuknya sudah ${namaGabungan(p)}`
            : `Jajar genjang itu bisa disusun ulang jadi ${namaPersegi(alas, tinggi)}`
        },
        narasi: (p) => {
          const { alas, tinggi, tegak, miringPenuh } = nilaiBongkar(p)
          const hasil = `${fmt(alas)} × ${fmt(tinggi)} = ${fmt(alas * tinggi)}`
          if (tegak) {
            return `Kali ini tidak ada yang perlu dipotong: keempat sudutnya sudah siku-siku. Luasnya langsung terbaca ${hasil}.`
          }
          const potong = miringPenuh
            ? `Potong separuh kirinya — potongan itu pas satu segitiga utuh — lalu geser ke kanan sejauh ${fmt(alas)}.`
            : `Potong ujung kirinya, lalu geser ke kanan sejauh ${fmt(alas)}.`
          return `${potong} Tidak ada bagian yang hilang atau bertambah, dan sekarang bentuknya ${namaPersegi(alas, tinggi)} dengan luas ${hasil}.`
        },
        rumus: (p) => `luas ${namaGabungan(p)} = [alas:a] × [tinggi:t]`,
        durasi: 2400,
      },
      {
        id: 's5',
        // Bila tegak tidak ada yang dipotong, jadi tidak ada yang perlu dikembalikan.
        judul: (p) =>
          nilaiBongkar(p).tegak ? 'Lihat lagi kedua segitiganya' : 'Kembalikan ke bentuk semula',
        narasi: (p) => {
          const { alas, tinggi } = nilaiBongkar(p)
          return `Luasnya tetap ${fmt(alas)} × ${fmt(tinggi)} = ${fmt(alas * tinggi)}. Dan bangun seluas itu diisi tepat oleh DUA segitiga yang sama besar.`
        },
        rumus: '2 × [luas:L] = [alas:a] × [tinggi:t]',
        durasi: 1800,
      },
      {
        id: 's6',
        judul: 'Jadi satu segitiga adalah separuhnya',
        narasi: (p) => {
          const { alas, tinggi, luas } = nilaiBongkar(p)
          return `Kalau luas dua segitiga itu ${fmt(alas)} × ${fmt(tinggi)} = ${fmt(alas * tinggi)}, maka luas satu segitiga adalah separuhnya: ${fmt(luas)}. Di situlah angka ½ berasal — bukan aturan hafalan, melainkan akibat.`
        },
        rumus: '[luas:L] = [setengah:½] × [alas:a] × [tinggi:t]',
        durasi: 2000,
      },
    ],
  },

  eksperimen: {
    judul: 'Seret puncaknya. Perhatikan angka luasnya.',
    ajakan:
      'Seret titik oranye di puncak menyusuri garis putus-putus, lalu naik atau turun. Tarik titik ungu di bawah alas untuk mengubah alasnya.',
    params: [
      { key: 'alas', label: 'Alas', min: 2, max: 10, step: 0.5, awal: 6, simbol: 'a', peran: 'a', bagian: 'alas' },
      { key: 'tinggi', label: 'Tinggi', min: 1, max: 6, step: 0.5, awal: 4, simbol: 't', peran: 'b', bagian: 'tinggi' },
      { key: 'puncak', label: 'Posisi puncak', min: PUNCAK_EKS.min, max: PUNCAK_EKS.max, step: 0.05, awal: 0.35, peran: 'b' },
    ],
    Visual: VisualEksperimen,
    rumus: (p) => {
      const alas = p.alas ?? 6
      const tinggi = p.tinggi ?? 4
      return `[luas:L] = [setengah:½] × [alas:${fmt(alas)}] × [tinggi:${fmt(tinggi)}] = ${fmt((alas * tinggi) / 2)}`
    },
    temuan: (p) => {
      const alas = p.alas ?? 6
      const tinggi = p.tinggi ?? 4
      return (
        <p>
          <strong>Coba seret puncaknya ke samping saja.</strong> Bentuknya berubah drastis, tetapi
          luasnya diam di angka {fmt((alas * tinggi) / 2)}. Yang menentukan luas cuma dua: alas{' '}
          {fmt(alas)} dan tinggi {fmt(tinggi)}. Sekarang gandakan tingginya (misalnya dari 2
          menjadi 4) — luasnya ikut menjadi dua kali lipat, karena dalam rumus tinggi hanya
          dikalikan, tidak dikuadratkan.
        </p>
      )
    },
  },

  penjelasan: {
    SD: (
      <>
        <p>
          Bayangkan kamu punya dua segitiga kembar dari kertas. Kalau yang satu kamu putar setengah
          putaran lalu tempelkan pada sisi kembarannya, keduanya <strong>selalu</strong> membentuk
          satu bangun yang rapi — jajar genjang.
        </p>
        <p>
          Jajar genjang itu tinggal digunting di ujungnya dan potongannya digeser, jadi persegi
          panjang. (Kalau jajar genjangnya miring sekali, guntingnya perlu lebih dari sekali, tetapi
          hasilnya tetap sama.) Nah, luas persegi panjang gampang: <strong>alas × tinggi</strong>.
        </p>
        <p>
          Karena bangun tadi berisi <strong>dua</strong> segitiga yang sama besar, satu segitiga
          pasti separuhnya. Itulah kenapa dibagi 2.
        </p>
      </>
    ),
    SMP: (
      <>
        <p>
          Ambil segitiga <em>ABP</em>. Putar salinannya 180° terhadap titik tengah sisi <em>PB</em>.
          Perputaran adalah isometri: panjang dan sudut tidak berubah, sehingga luas salinan sama
          dengan luas aslinya.
        </p>
        <p>
          Bayangan titik <em>P</em> jatuh di <em>B</em>, dan bayangan <em>B</em> jatuh di <em>P</em>.
          Akibatnya kedua segitiga bertemu persis pada sisi <em>PB</em> tanpa tumpang tindih, dan
          gabungannya adalah segi empat dengan dua pasang sisi sejajar — jajar genjang beralas{' '}
          <em>a</em> dan bertinggi <em>t</em>.
        </p>
        <p>
          Luas jajar genjang sendiri diperoleh dengan memotong segitiga di salah satu ujung dan
          menggesernya ke ujung lain, menghasilkan persegi panjang <em>a</em> × <em>t</em>. Satu
          potongan tegak sudah cukup bila kaki garis tinggi dari <em>P</em> jatuh pada alas{' '}
          <em>AB</em>, seperti pada animasi. Bila jajar genjangnya sangat miring sehingga satu
          potongan tegak tidak cukup, potongan diulang beberapa kali dan hasilnya tetap{' '}
          <em>a</em> × <em>t</em>. Jadi: 2·L = a·t, sehingga L = ½·a·t.
        </p>
        <p>
          Perhatikan bahwa <strong>tinggi</strong> selalu berarti jarak tegak lurus, bukan panjang
          sisi miring. Inilah sumber kesalahan paling sering pada soal segitiga miring.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Argumen potong-susun tadi adalah kasus khusus dari fakta yang lebih umum: luas invarian
          terhadap <strong>gusuran (shear)</strong>. Transformasi (x, y) ↦ (x + ky, y) memiliki
          determinan 1, sehingga mempertahankan luas. Menggeser puncak segitiga sejajar alas persis
          merupakan shear — karena itu luas tidak berubah, sesuai yang kamu lihat di eksperimen.
        </p>
        <p>
          Dengan koordinat: ambil A = (0,0), B = (a,0), P = (p, t). Luas segitiga adalah setengah
          nilai mutlak determinan vektor sisinya:
        </p>
        <p style={{ textAlign: 'center' }}>
          L = ½ |det[(a, 0), (p, t)]| = ½ |a·t − 0·p| = ½ a t
        </p>
        <p>
          Nilai <em>p</em> lenyap dari hasil — itulah alasan formal kenapa posisi puncak tidak
          berpengaruh. Faktor ½ muncul karena determinan mengukur luas jajar genjang yang dibentuk
          kedua vektor, dan segitiga adalah separuhnya.
        </p>
      </>
    ),
  },

  rumus: {
    src: '[luas:L] = [setengah:½] × [alas:a] × [tinggi:t]',
    roles: { luas: 'ab', setengah: 'hi', alas: 'a', tinggi: 'b' },
    arti: {
      luas: 'Luas segitiga — banyaknya satuan persegi yang memenuhi bagian dalamnya.',
      setengah:
        'Muncul karena dua segitiga kembar tepat memenuhi satu jajar genjang. Satu segitiga = separuhnya.',
      alas: 'Sisi yang kamu pilih sebagai alas. Sisi mana pun boleh, asal tingginya diukur ke sisi itu.',
      tinggi:
        'Jarak TEGAK LURUS dari puncak ke garis alas (bila perlu, garis alasnya diperpanjang). Sering tertukar dengan panjang sisi miring.',
    },
  },

  soal: [
    (rnd) => {
      const a = 4 + Math.floor(rnd() * 9)
      const t = 3 + Math.floor(rnd() * 7)
      return {
        id: 'seg-1',
        tipe: 'angka',
        topicId: 'sd5-luas-persegi-persegi-panjang-dan',
        kelas: 5,
        tingkat: 'mudah',
        konsep: 'segitiga-setengah',
        pertanyaan: `Sebuah segitiga memiliki alas ${a} cm dan tinggi ${t} cm. Berapa luasnya?`,
        jawaban: (a * t) / 2,
        satuan: 'cm²',
        toleransi: 1e-6,
        hint: [
          'Mulai dari bangun yang lebih mudah: berapa luas persegi panjang dengan ukuran itu?',
          `${a} × ${t} = ${a * t}. Tapi luas sebesar itu sama dengan luas DUA segitiga seperti ini.`,
          'Karena satu segitiga adalah separuhnya, bagi hasil tadi dengan 2.',
        ],
        pembahasan: `L = ½ × ${a} × ${t} = ${fmt((a * t) / 2)} cm². Dua segitiga seperti ini tepat membentuk jajar genjang seluas ${a * t} cm² — sama dengan persegi panjang ${a} × ${t}.`,
      }
    },
    {
      id: 'seg-2',
      tipe: 'pilihan',
      topicId: 'sd5-luas-persegi-persegi-panjang-dan',
      kelas: 5,
      tingkat: 'sedang',
      konsep: 'segitiga-setengah',
      pertanyaan:
        'Sebuah segitiga memiliki alas 10 cm, sisi miring 13 cm, dan tinggi 12 cm. Berapa luasnya?',
      pilihan: [
        { id: 'a', label: '60 cm²', benar: true },
        {
          id: 'b',
          label: '65 cm²',
          diagnosa:
            'Kamu memakai 13 sebagai tinggi. 13 adalah panjang sisi miring — tinggi adalah jarak tegak lurus ke alas, yaitu 12.',
        },
        {
          id: 'c',
          label: '120 cm²',
          diagnosa: 'Perkalian alas × tinggi sudah tepat, tetapi belum dibagi 2.',
        },
        {
          id: 'd',
          label: '130 cm²',
          diagnosa: 'Ini alas × sisi miring, dua kesalahan sekaligus: salah pilih tinggi dan lupa membagi 2.',
        },
      ],
      hint: [
        'Angka mana yang merupakan tinggi, dan angka mana yang sisi miring?',
        'Tinggi harus tegak lurus terhadap alas. Sisi miring tidak tegak lurus.',
        'Pakai alas 10 dan tinggi 12, lalu jangan lupa faktor ½.',
      ],
      pembahasan:
        'L = ½ × 10 × 12 = 60 cm². Angka 13 sengaja dipasang sebagai jebakan: itu sisi miring, bukan tinggi.',
    },
    {
      id: 'seg-3',
      tipe: 'benar-salah',
      topicId: 'sd5-luas-persegi-persegi-panjang-dan',
      kelas: 5,
      tingkat: 'sedang',
      konsep: 'segitiga-setengah',
      pertanyaan:
        'Dua segitiga dengan alas sama panjang dan tinggi sama, tetapi bentuknya berbeda (satu tegak, satu sangat miring), pasti memiliki luas yang sama.',
      jawaban: true,
      diagnosa:
        'Coba ingat eksperimen tadi: menggeser puncak menyamping mengubah bentuk, tetapi alas dan tinggi tetap — sehingga luas juga tetap.',
      hint: [
        'Rumus luas segitiga hanya memuat dua besaran. Besaran apa saja itu?',
        'Posisi puncak tidak muncul dalam rumus sama sekali.',
      ],
      pembahasan:
        'Benar. Luas hanya bergantung pada alas dan tinggi. Menggeser puncak sejajar alas tidak mengubah keduanya, jadi luas tidak berubah.',
    },
    (rnd) => {
      const L = [24, 30, 36, 42, 48][Math.floor(rnd() * 5)]
      const t = [4, 6][Math.floor(rnd() * 2)]
      const a = (2 * L) / t
      return {
        id: 'seg-4',
        tipe: 'angka',
        topicId: 'sd5-luas-persegi-persegi-panjang-dan',
        kelas: 5,
        tingkat: 'sulit',
        konsep: 'segitiga-setengah',
        pertanyaan: `Sebuah segitiga luasnya ${L} cm² dan tingginya ${t} cm. Berapa panjang alasnya?`,
        jawaban: a,
        satuan: 'cm',
        toleransi: 1e-6,
        hint: [
          'Tulis dulu rumusnya: L = ½ × a × t. Yang belum diketahui adalah a.',
          `Kalikan kedua ruas dengan 2: 2L = a × t, jadi 2 × ${L} = a × ${t}.`,
          `Tinggal bagi: a = ${2 * L} ÷ ${t}.`,
        ],
        pembahasan: `Dari L = ½at diperoleh a = 2L ÷ t = ${2 * L} ÷ ${t} = ${fmt(a)} cm.`,
      }
    },
    {
      id: 'seg-5',
      tipe: 'urutkan',
      topicId: 'sd5-luas-persegi-persegi-panjang-dan',
      kelas: 5,
      tingkat: 'sedang',
      konsep: 'segitiga-setengah',
      pertanyaan: 'Susun kembali alasan kenapa luas segitiga dibagi 2.',
      langkah: [
        'Buat salinan segitiga yang sama persis',
        'Putar salinannya setengah putaran',
        'Kedua segitiga membentuk jajar genjang beralas a dan bertinggi t',
        'Luas jajar genjang itu a × t',
        'Satu segitiga adalah separuhnya, jadi L = ½ × a × t',
      ],
      hint: [
        'Mulailah dari sesuatu yang kamu buat sendiri, bukan dari rumus.',
        'Rumus selalu muncul di langkah terakhir, bukan pertama.',
      ],
      pembahasan:
        'Urutannya: gandakan → putar → terbentuk jajar genjang → luasnya a × t → satu segitiga separuhnya.',
    },
  ],

  lanjut: ['lingkaran-luas', 'kuadrat-jumlah', 'pythagoras'],
}

export default konsep
