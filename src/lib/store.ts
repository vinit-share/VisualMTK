/* ============================================================
   Visual MTK — Penyimpanan kemajuan (localStorage, tanpa server)
   Store kecil dengan useSyncExternalStore: tidak perlu Provider,
   tidak ada render ulang berlebihan.
   ============================================================ */

import { useSyncExternalStore } from 'react'
import type { Level, Status } from './types'

const KEY = 'visualmtk.v1'

export interface KonsepProgress {
  /** pernah dibuka. */
  dibuka?: number
  /** animasi bongkar dituntaskan. */
  bongkar?: boolean
  /** menekan tombol "Aku sudah paham". */
  paham?: boolean
  benar?: number
  salah?: number
  /** riwayat 10 jawaban terakhir, 1 benar 0 salah. */
  riwayat?: number[]
  /** tanggal (YYYY-MM-DD) sesi terakhir menjawab benar. */
  hariBenar?: string[]
  /** jawaban tebakan awal yang dipilih. */
  tebak?: string
}

export interface Simpanan {
  versi: 1
  konsep: Record<string, KonsepProgress>
  topik: Record<string, { dibuka?: number }>
  streak: { hitung: number; terakhir: string | null; terpanjang: number }
  lencana: string[]
  harian: Record<string, { selesai: boolean; benar: number; total: number }>
  tes: { sesi: number; benar: number; total: number }
  pengaturan: {
    tema: 'auto' | 'terang' | 'gelap'
    level: Level
    gerak: 'normal' | 'hemat'
  }
}

const AWAL: Simpanan = {
  versi: 1,
  konsep: {},
  topik: {},
  streak: { hitung: 0, terakhir: null, terpanjang: 0 },
  lencana: [],
  harian: {},
  tes: { sesi: 0, benar: 0, total: 0 },
  pengaturan: { tema: 'auto', level: 'SMP', gerak: 'normal' },
}

/* ---------------- Tanggal ---------------- */

export const hariIni = () => {
  const d = new Date()
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

const selisihHari = (a: string, b: string) => {
  const da = new Date(`${a}T00:00:00`)
  const db = new Date(`${b}T00:00:00`)
  return Math.round((db.getTime() - da.getTime()) / 86400000)
}

/* ---------------- Store ---------------- */

function baca(): Simpanan {
  if (typeof localStorage === 'undefined') return AWAL
  try {
    const mentah = localStorage.getItem(KEY)
    if (!mentah) return AWAL
    const data = JSON.parse(mentah) as Partial<Simpanan>
    return {
      ...AWAL,
      ...data,
      konsep: { ...data.konsep },
      topik: { ...data.topik },
      streak: { ...AWAL.streak, ...data.streak },
      harian: { ...data.harian },
      tes: { ...AWAL.tes, ...data.tes },
      pengaturan: { ...AWAL.pengaturan, ...data.pengaturan },
      lencana: data.lencana ?? [],
      versi: 1,
    }
  } catch {
    return AWAL
  }
}

let state: Simpanan = baca()
const pendengar = new Set<() => void>()

function simpan() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* kuota penuh atau mode privat — kemajuan tetap jalan di memori */
  }
}

function set(ubah: (s: Simpanan) => Simpanan) {
  state = ubah(state)
  simpan()
  pendengar.forEach((f) => f())
}

const subscribe = (f: () => void) => {
  pendengar.add(f)
  return () => {
    pendengar.delete(f)
  }
}

const snapshot = () => state

export function useSimpanan(): Simpanan {
  return useSyncExternalStore(subscribe, snapshot, () => AWAL)
}

export function useKonsepProgress(id: string): KonsepProgress {
  const s = useSimpanan()
  return s.konsep[id] ?? {}
}

/* ---------------- Aksi ---------------- */

function ubahKonsep(id: string, f: (k: KonsepProgress) => KonsepProgress) {
  set((s) => ({ ...s, konsep: { ...s.konsep, [id]: f(s.konsep[id] ?? {}) } }))
}

export const aksi = {
  bukaKonsep(id: string) {
    ubahKonsep(id, (k) => ({ ...k, dibuka: (k.dibuka ?? 0) + 1 }))
    aksi.catatKunjungan()
  },

  bukaTopik(id: string) {
    set((s) => ({
      ...s,
      topik: { ...s.topik, [id]: { dibuka: (s.topik[id]?.dibuka ?? 0) + 1 } },
    }))
  },

  selesaiBongkar(id: string) {
    ubahKonsep(id, (k) => ({ ...k, bongkar: true }))
  },

  tandaiPaham(id: string, paham = true) {
    ubahKonsep(id, (k) => ({ ...k, paham }))
  },

  simpanTebakan(id: string, pilihan: string) {
    ubahKonsep(id, (k) => ({ ...k, tebak: pilihan }))
  },

  jawab(id: string, benar: boolean) {
    const hari = hariIni()
    ubahKonsep(id, (k) => {
      const riwayat = [...(k.riwayat ?? []), benar ? 1 : 0].slice(-10)
      const hariBenar = benar
        ? Array.from(new Set([...(k.hariBenar ?? []), hari])).slice(-14)
        : k.hariBenar
      return {
        ...k,
        benar: (k.benar ?? 0) + (benar ? 1 : 0),
        salah: (k.salah ?? 0) + (benar ? 0 : 1),
        riwayat,
        hariBenar,
      }
    })
    set((s) => ({
      ...s,
      tes: { ...s.tes, benar: s.tes.benar + (benar ? 1 : 0), total: s.tes.total + 1 },
    }))
    aksi.catatKunjungan()
  },

  selesaiSesiTes() {
    set((s) => ({ ...s, tes: { ...s.tes, sesi: s.tes.sesi + 1 } }))
  },

  catatHarian(tanggal: string, benar: number, total: number) {
    set((s) => ({
      ...s,
      harian: { ...s.harian, [tanggal]: { selesai: true, benar, total } },
    }))
    aksi.catatKunjungan()
  },

  /** Perbarui runtutan hari belajar. Aman dipanggil berkali-kali sehari. */
  catatKunjungan() {
    const hari = hariIni()
    set((s) => {
      const { terakhir, hitung, terpanjang } = s.streak
      if (terakhir === hari) return s
      const jarak = terakhir ? selisihHari(terakhir, hari) : 999
      const baru = jarak === 1 ? hitung + 1 : 1
      return {
        ...s,
        streak: { hitung: baru, terakhir: hari, terpanjang: Math.max(terpanjang, baru) },
      }
    })
  },

  beriLencana(id: string) {
    set((s) => (s.lencana.includes(id) ? s : { ...s, lencana: [...s.lencana, id] }))
  },

  aturPengaturan(p: Partial<Simpanan['pengaturan']>) {
    set((s) => ({ ...s, pengaturan: { ...s.pengaturan, ...p } }))
  },

  reset() {
    set(() => ({ ...AWAL, konsep: {}, topik: {}, harian: {}, lencana: [] }))
  },
}

/* ---------------- Model penguasaan ---------------- */

/**
 * Status sebuah konsep dihitung dari bukti pemahaman, bukan sekadar
 * "pernah dibuka":
 *   learning    — sudah dibuka
 *   understood  — animasi bongkar dituntaskan DAN (menyatakan paham
 *                 atau menjawab benar minimal 3 kali)
 *   mastered    — understood, ketepatan 10 jawaban terakhir >= 80% dengan
 *                 minimal 5 jawaban, dan benar pada 2 hari berbeda
 *                 (bukti bertahan, bukan hafalan sesaat)
 */
export function statusKonsep(k: KonsepProgress | undefined): Status {
  if (!k || !k.dibuka) return 'none'
  const benar = k.benar ?? 0
  const riwayat = k.riwayat ?? []
  const paham = !!k.bongkar && (!!k.paham || benar >= 3)
  if (!paham) return 'learning'
  const cukup = riwayat.length >= 5
  const tepat = cukup ? riwayat.reduce((a, b) => a + b, 0) / riwayat.length : 0
  const berbedaHari = (k.hariBenar ?? []).length >= 2
  if (cukup && tepat >= 0.8 && berbedaHari) return 'mastered'
  return 'understood'
}

export const LABEL_STATUS: Record<Status, string> = {
  none: 'Belum mulai',
  learning: 'Sedang belajar',
  understood: 'Sudah paham',
  mastered: 'Dikuasai',
}

/** Bobot untuk menghitung persentase kemajuan. */
export const NILAI_STATUS: Record<Status, number> = {
  none: 0,
  learning: 0.34,
  understood: 0.75,
  mastered: 1,
}
