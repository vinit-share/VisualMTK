/* ============================================================
   Visual MTK — Alat tulis bank soal topik
   Bank soal ditulis per topik kurikulum di berkas kelas-N.ts.
   Fungsi di sini membuat penulisannya ringkas dan seragam:
   id, topik, dan kelas diisi otomatis oleh pemuatnya
   (src/data/soalTopik.ts), urutan pilihan diacak tetap.
   Panduan menulis: docs/PANDUAN-SOAL-TOPIK.md
   ============================================================ */

import type { SpesGambar } from '../../lib/gambar'
import { fmt, normalTeks, parseAngka, round, seededRandom, shuffle } from '../../lib/num'
import type { Soal } from '../../lib/types'

export type Tingkat = 'mudah' | 'sedang' | 'sulit'

/** Butir bank: soal tetap, atau pembuat soal yang angkanya berganti tiap tes. */
export type Butir = Soal | ((rnd: () => number) => Soal)

/** Isi satu berkas bank: id topik kurikulum → butir-butir soalnya. */
export type BankSoal = Record<string, Butir[]>

interface Dasar {
  tingkat: Tingkat
  /** kalimat soal, bahasa anak seusia kelasnya. */
  tanya: string
  /** petunjuk bertahap, dari yang paling ringan. Paling sedikit dua. */
  petunjuk: string[]
  /** pembahasan singkat: kenapa jawabannya itu. */
  bahas: string
  gambar?: SpesGambar
}

const dasar = (o: Dasar) => ({
  id: '',
  topicId: '',
  kelas: 0,
  tingkat: o.tingkat,
  pertanyaan: o.tanya,
  hint: o.petunjuk,
  pembahasan: o.bahas,
  ...(o.gambar ? { gambar: o.gambar } : {}),
})

const benihTeks = (s: string) => {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}

/**
 * Pilihan ganda. `benar` jawaban yang tepat; `salah` berisi pengecoh
 * beserta alasan kenapa ia menggoda tetapi keliru: [jawaban, alasan].
 *
 * Jawaban boleh berupa angka — ditulis dengan format Indonesia dan diberi
 * `satuan` bila ada. Pengecoh yang ternyata sama dengan jawaban benar atau
 * kembar dengan pengecoh lain dibuang otomatis (berguna pada pembuat soal
 * berangka acak), lalu diambil paling banyak tiga. Jadi tulislah 3–5 calon.
 */
export function pg(
  o: Dasar & {
    benar: string | number
    salah: [jawaban: string | number, alasan: string][]
    satuan?: string
  },
): Soal {
  const tulis = (v: string | number) =>
    typeof v === 'number' ? `${fmt(v)}${o.satuan ? ` ${o.satuan}` : ''}` : v
  const kunci = (s: string) => {
    const n = parseAngka(s)
    return n === null ? normalTeks(s) : `#${round(n, 9)}`
  }
  const benar = tulis(o.benar)
  const terpakai = new Set([kunci(benar)])
  const pengecoh: { label: string; diagnosa: string }[] = []
  for (const [jawaban, alasan] of o.salah) {
    const label = tulis(jawaban)
    if (terpakai.has(kunci(label)) || pengecoh.length >= 3) continue
    terpakai.add(kunci(label))
    pengecoh.push({ label, diagnosa: alasan })
  }
  const semua = [{ label: benar, benar: true as const }, ...pengecoh]
  const acak = shuffle(seededRandom(benihTeks(o.tanya + benar)), semua)
  return {
    ...dasar(o),
    tipe: 'pilihan',
    pilihan: acak.map((p, i) => ({ id: 'abcdef'[i], ...p })),
  }
}

/** Jawaban berupa angka yang diketik. Desimal memakai koma (3,5); pecahan a/b juga diterima. */
export function angka(o: Dasar & { jawab: number; satuan?: string; toleransi?: number }): Soal {
  return {
    ...dasar(o),
    tipe: 'angka',
    jawaban: o.jawab,
    ...(o.satuan ? { satuan: o.satuan } : {}),
    ...(o.toleransi !== undefined ? { toleransi: o.toleransi } : {}),
  }
}

/** Pernyataan benar/salah. `alasan` tampil bila anak menjawab keliru. */
export function bs(o: Dasar & { jawab: boolean; alasan?: string }): Soal {
  return {
    ...dasar(o),
    tipe: 'benar-salah',
    jawaban: o.jawab,
    ...(o.alasan ? { diagnosa: o.alasan } : {}),
  }
}

/** Isian kata/teks pendek. `jawab` memuat semua ejaan yang diterima. */
export function isian(o: Dasar & { jawab: string[] }): Soal {
  return { ...dasar(o), tipe: 'isian', jawaban: o.jawab }
}

/** Mengurutkan. `langkah` ditulis dalam urutan yang BENAR. */
export function urut(o: Dasar & { langkah: string[] }): Soal {
  return { ...dasar(o), tipe: 'urutkan', langkah: o.langkah }
}

/** Menjodohkan. Tiap pasangan [kiri, kanan]. */
export function cocok(o: Dasar & { pasangan: [kiri: string, kanan: string][] }): Soal {
  return {
    ...dasar(o),
    tipe: 'cocokkan',
    pasangan: o.pasangan.map(([kiri, kanan]) => ({ kiri, kanan })),
  }
}
