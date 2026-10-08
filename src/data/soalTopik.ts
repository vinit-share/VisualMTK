/* ============================================================
   Visual MTK — Tes per topik
   Setiap topik kurikulum punya bank soalnya sendiri
   (src/data/soal/kelas-N.ts, boleh dipecah kelas-N-1.ts, …).
   Bank dimuat malas per kelas, lalu satu tes disusun dari
   campuran soal mudah, sedang, dan sulit. Topik yang punya
   konsep interaktif ikut mengambil soal dari modul konsepnya.
   ============================================================ */

import { adaKonsep, muatKonsep } from '../concepts/registry'
import { seededRandom, shuffle } from '../lib/num'
import type { Soal } from '../lib/types'
import { cariTopik } from './kurikulum'
import type { BankSoal, Butir } from './soal/alat'

const berkas = import.meta.glob<{ default: BankSoal }>('./soal/kelas-*.ts')

/** kelas → pemuat semua berkas bank kelas itu. */
const pemuatKelas = new Map<number, (() => Promise<{ default: BankSoal }>)[]>()
for (const [jalur, muat] of Object.entries(berkas)) {
  const cocok = /kelas-(\d+)(?:-\w+)?\.ts$/.exec(jalur)
  if (!cocok) continue
  const n = Number(cocok[1])
  pemuatKelas.set(n, [...(pemuatKelas.get(n) ?? []), muat])
}

const singgahan = new Map<number, Promise<BankSoal>>()

/** Muat seluruh bank soal satu kelas (digabung bila berkasnya dipecah). */
export function muatBankKelas(n: number): Promise<BankSoal> {
  const sudah = singgahan.get(n)
  if (sudah) return sudah
  const janji = Promise.all(
    (pemuatKelas.get(n) ?? []).map((muat) =>
      muat()
        .then((m) => m.default ?? {})
        .catch((e) => {
          console.error(`Gagal memuat bank soal kelas ${n}`, e)
          return {} as BankSoal
        }),
    ),
  ).then((bagian) => Object.assign({}, ...bagian) as BankSoal)
  singgahan.set(n, janji)
  return janji
}

/** Banyak soal tiap tingkat dalam satu tes berisi `jumlah` soal. */
export function jatahTingkat(jumlah: number) {
  const sulit = Math.max(1, Math.round(jumlah * 0.2))
  const mudah = Math.ceil((jumlah - sulit) / 2)
  return { mudah, sedang: jumlah - sulit - mudah, sulit }
}

const URUT_TINGKAT = { mudah: 0, sedang: 1, sulit: 2 } as const

/** Paling banyak sekian soal diambil dari modul konsep, agar bank topiknya tetap utama. */
const MAKS_DARI_KONSEP = 2

/** Banyak soal dalam satu tes topik. */
export const JUMLAH_SOAL_TES = 5

/**
 * Susun satu tes untuk sebuah topik: campuran mudah → sedang → sulit.
 * Mengembalikan daftar kosong bila topiknya belum punya soal.
 */
export async function susunTesTopik(
  topicId: string,
  { jumlah = JUMLAH_SOAL_TES, benih }: { jumlah?: number; benih?: number } = {},
): Promise<Soal[]> {
  const topik = cariTopik(topicId)
  if (!topik) return []
  const rnd = seededRandom(benih ?? Math.floor(Math.random() * 1e9))

  const bank = await muatBankKelas(topik.kelas)
  const butir: Butir[] = bank[topicId] ?? []
  const kolam: Soal[] = butir.map((b, i) => {
    const s = typeof b === 'function' ? b(rnd) : b
    return { ...s, id: `${topicId}~${i}`, topicId, kelas: topik.kelas }
  })

  // Soal dari konsep interaktif yang tertaut ke topik ini.
  const idKonsep = (topik.konsep ?? []).filter(adaKonsep)
  if (idKonsep.length > 0) {
    const modul = await Promise.all(idKonsep.map(muatKonsep))
    const dariKonsep: Soal[] = []
    for (const k of modul) {
      if (!k) continue
      for (const s of k.soal) {
        const soal = typeof s === 'function' ? s(rnd) : s
        dariKonsep.push({ ...soal, konsep: soal.konsep ?? k.id })
      }
    }
    const jatahKonsep = kolam.length >= jumlah ? MAKS_DARI_KONSEP : jumlah
    kolam.push(...shuffle(rnd, dariKonsep).slice(0, jatahKonsep))
  }

  // Ambil menurut jatah tiap tingkat; kekurangannya ditutup dari tingkat lain.
  const jatah = jatahTingkat(jumlah)
  const terpilih: Soal[] = []
  const sisa: Soal[] = []
  const terambil = { mudah: 0, sedang: 0, sulit: 0 }
  const dipakai = new Set<string>()
  for (const s of shuffle(rnd, kolam)) {
    if (dipakai.has(s.id)) continue
    dipakai.add(s.id)
    if (terambil[s.tingkat] < jatah[s.tingkat]) {
      terambil[s.tingkat]++
      terpilih.push(s)
    } else sisa.push(s)
  }
  terpilih.push(...sisa.slice(0, Math.max(0, jumlah - terpilih.length)))

  // Urut dari yang paling ringan supaya anak tidak langsung terbentur soal sulit.
  return terpilih.sort((a, b) => URUT_TINGKAT[a.tingkat] - URUT_TINGKAT[b.tingkat])
}

/** Id topik pada satu kelas yang sudah bisa dites (punya bank soal atau konsep). */
export async function topikBisaDites(kelas: number, idTopik: readonly string[]): Promise<Set<string>> {
  const bank = await muatBankKelas(kelas)
  return new Set(
    idTopik.filter(
      (id) => (bank[id]?.length ?? 0) > 0 || (cariTopik(id)?.konsep ?? []).some(adaKonsep),
    ),
  )
}
