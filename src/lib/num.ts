/* ============================================================
   Visual MTK — Util angka & format Indonesia
   Desimal memakai koma, ribuan memakai titik.
   ============================================================ */

export const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x))

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/** Petakan x dari rentang [a1,b1] ke [a2,b2]. */
export const map = (x: number, a1: number, b1: number, a2: number, b2: number) =>
  b1 === a1 ? a2 : a2 + ((x - a1) * (b2 - a2)) / (b1 - a1)

/** Bulatkan ke n angka di belakang koma tanpa galat mengambang. */
export const round = (x: number, n = 0) => {
  const f = 10 ** n
  return Math.round((x + Number.EPSILON) * f) / f
}

/** Format angka gaya Indonesia: 1234.5 -> "1.234,5" */
export function fmt(x: number, desimal?: number): string {
  if (!Number.isFinite(x)) return '—'
  const opts: Intl.NumberFormatOptions =
    desimal === undefined
      ? { maximumFractionDigits: 3 }
      : { minimumFractionDigits: desimal, maximumFractionDigits: desimal }
  return new Intl.NumberFormat('id-ID', opts).format(x)
}

/** Format ringkas untuk label pada gambar (hindari ekor panjang). */
export const fmtV = (x: number) => fmt(round(x, 2))

const SUP = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹']
/** 2 -> "²" untuk label pangkat pada SVG. */
export const sup = (n: number) => String(n).split('').map((d) => SUP[+d] ?? d).join('')

export const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))
export const lcm = (a: number, b: number) => Math.abs(a * b) / gcd(a, b)

/** Sederhanakan pecahan. */
export function simplify(p: number, q: number): [number, number] {
  const g = gcd(p, q) || 1
  const s = q < 0 ? -1 : 1
  return [(s * p) / g, (s * q) / g]
}

/** Tulis pecahan sebagai teks, mis. 3/4 atau 1 1/2. */
export function pecahanTeks(p: number, q: number, campuran = false): string {
  const [a, b] = simplify(p, q)
  if (b === 1) return String(a)
  if (!campuran || Math.abs(a) < b) return `${a}/${b}`
  const bulat = Math.trunc(a / b)
  const sisa = Math.abs(a % b)
  return sisa === 0 ? String(bulat) : `${bulat} ${sisa}/${b}`
}

/** Bilangan acak deterministik dari benih — supaya soal bisa diulang. */
export function seededRandom(seed: number): () => number {
  let s = (seed >>> 0) || 1
  return () => {
    // xorshift32
    s ^= s << 13
    s >>>= 0
    s ^= s >> 17
    s ^= s << 5
    s >>>= 0
    return s / 4294967296
  }
}

/** Bilangan bulat acak dalam [lo, hi] inklusif. */
export const randInt = (rnd: () => number, lo: number, hi: number) =>
  lo + Math.floor(rnd() * (hi - lo + 1))

/** Ambil satu elemen acak. */
export const pick = <T,>(rnd: () => number, arr: readonly T[]): T =>
  arr[Math.floor(rnd() * arr.length) % arr.length]

/** Acak urutan salinan array (Fisher–Yates). */
export function shuffle<T>(rnd: () => number, arr: readonly T[]): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Derajat ke radian. */
export const rad = (deg: number) => (deg * Math.PI) / 180
export const deg = (r: number) => (r * 180) / Math.PI

/** Titik pada lingkaran, sudut dalam derajat, 0° di kanan, positif berlawanan jarum jam. */
export function polar(cx: number, cy: number, r: number, sudut: number) {
  const a = rad(sudut)
  return { x: cx + r * Math.cos(a), y: cy - r * Math.sin(a) }
}

/**
 * Normalkan jawaban teks siswa supaya "0,5", "0.5", " 0,50 " dianggap sama.
 * Mengembalikan null bila bukan angka.
 */
export function parseAngka(teks: string): number | null {
  const t = teks.trim().replace(/\s/g, '').replace(/\./g, '').replace(',', '.')
  if (t === '' || !/^-?\d*\.?\d+(?:\/-?\d*\.?\d+)?$/.test(t)) return null
  if (t.includes('/')) {
    const [p, q] = t.split('/').map(Number)
    return q === 0 ? null : p / q
  }
  const n = Number(t)
  return Number.isFinite(n) ? n : null
}

/** Bandingkan jawaban numerik dengan toleransi relatif kecil. */
export function jawabanSama(a: number, b: number, tol = 1e-9) {
  return Math.abs(a - b) <= Math.max(tol, Math.abs(b) * 1e-9)
}

/** Normalisasi jawaban teks: huruf kecil, tanpa spasi ganda dan tanda baca ekor. */
export const normalTeks = (s: string) =>
  s.trim().toLowerCase().replace(/\s+/g, ' ').replace(/[.!?]+$/, '')
