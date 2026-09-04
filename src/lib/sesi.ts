/* ============================================================
   Visual MTK — Penyusun sesi latihan
   Soal diambil dari modul konsep yang sudah ada, sehingga
   latihan selalu sejalan dengan penjelasan visualnya —
   dan setiap soal bisa ditautkan kembali ke "kenapa"-nya.
   ============================================================ */

import { KATALOG, type KonsepMeta } from '../data/katalog'
import { adaKonsep, muatKonsep } from '../concepts/registry'
import { seededRandom, shuffle } from './num'
import type { Soal } from './types'

export interface FilterSesi {
  jumlah: number
  /** batas kelas, inklusif. */
  kelasMin?: number
  kelasMax?: number
  tingkat?: 'mudah' | 'sedang' | 'sulit' | 'campuran'
  /** batasi ke konsep tertentu. */
  konsepIds?: string[]
  /** benih agar sesi bisa diulang persis (dipakai tantangan harian). */
  benih?: number
}

/** Banyaknya modul konsep yang dimuat sekaligus, supaya tetap ringan. */
const MAKS_MODUL = 8

export async function bangunSesi(f: FilterSesi): Promise<Soal[]> {
  const benih = f.benih ?? Math.floor(Math.random() * 1e9)
  const rnd = seededRandom(benih)

  let kandidat: KonsepMeta[] = KATALOG.filter((k) => adaKonsep(k.id))
  if (f.konsepIds?.length) kandidat = kandidat.filter((k) => f.konsepIds!.includes(k.id))
  if (f.kelasMin !== undefined) kandidat = kandidat.filter((k) => k.kelas >= f.kelasMin!)
  if (f.kelasMax !== undefined) kandidat = kandidat.filter((k) => k.kelas <= f.kelasMax!)
  if (kandidat.length === 0) return []

  const terpilih = shuffle(rnd, kandidat).slice(0, MAKS_MODUL)
  const modul = await Promise.all(terpilih.map((k) => muatKonsep(k.id)))

  let semua: Soal[] = []
  for (const k of modul) {
    if (!k) continue
    for (const s of k.soal) {
      const soal = typeof s === 'function' ? s(rnd) : s
      semua.push({ ...soal, konsep: soal.konsep ?? k.id })
    }
  }

  if (f.tingkat && f.tingkat !== 'campuran') {
    const cocok = semua.filter((s) => s.tingkat === f.tingkat)
    // Jangan sampai kosong hanya karena penyaringan terlalu ketat.
    if (cocok.length >= Math.min(f.jumlah, 3)) semua = cocok
  }

  // Jaga agar id tidak berulang dalam satu sesi.
  const unik = new Map<string, Soal>()
  for (const s of shuffle(rnd, semua)) if (!unik.has(s.id)) unik.set(s.id, s)

  return Array.from(unik.values()).slice(0, f.jumlah)
}

/** Benih tetap dari tanggal, supaya tantangan harian sama sepanjang hari. */
export const benihHarian = (tanggal: string) =>
  tanggal.split('-').reduce((a, s) => (a * 1000 + Number(s)) >>> 0, 91)
