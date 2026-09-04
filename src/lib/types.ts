/* ============================================================
   Visual MTK — Model konten
   Semua konten pembelajaran adalah data statis yang mengikuti
   bentuk-bentuk di bawah ini. Tidak ada backend.
   ============================================================ */

import type { ComponentType, ReactNode } from 'react'

export type Jenjang = 'SD' | 'SMP' | 'SMA'
export type Fase = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

/** Elemen/domain matematika sesuai Capaian Pembelajaran. */
export type Domain =
  | 'bilangan'
  | 'aljabar'
  | 'pengukuran'
  | 'geometri'
  | 'data'
  | 'kalkulus'

/** Kedalaman penjelasan. Konsep yang sama dijelaskan berbeda per level. */
export type Level = 'SD' | 'SMP' | 'SMA'

export type Status = 'none' | 'learning' | 'understood' | 'mastered'

/* ---------------- Kurikulum ---------------- */

export interface Topic {
  id: string
  judul: string
  kelas: number
  fase: Fase
  domain: Domain
  /** Satu kalimat: apa yang dipelajari. */
  ringkas: string
  subKonsep: string[]
  rumus?: string[]
  /** id topik yang sebaiknya dikuasai lebih dulu. */
  prasyarat: string[]
  /** id modul konsep interaktif, bila topik ini punya. */
  konsep?: string[]
  miskonsepsi?: string[]
}

export interface JalurKonsep {
  id: string
  nama: string
  deskripsi: string
  warna: 'brand' | 'amber' | 'teal' | 'blue' | 'pink'
  /** urutan id topik dari SD sampai SMA. */
  rantai: string[]
}

/* ---------------- Rumus interaktif ---------------- */

/**
 * Sumber rumus memakai markup ringkas:
 *   "L = [half:½] × [alas:a] × [tinggi:t]"
 * Bagian dalam kurung siku menjadi token yang bisa disorot dan
 * terhubung dengan objek pada visualisasi.
 * Peran warna ditentukan lewat `roles`.
 */
export type FormulaRole = 'a' | 'b' | 'ab' | 'c' | 'hi' | 'plain'

export interface FormulaProps {
  src: string
  roles?: Record<string, FormulaRole>
  /** penjelasan singkat tiap bagian, muncul saat disorot. */
  arti?: Record<string, string>
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

/* ---------------- Mesin "Bongkar Rumus" ---------------- */

export interface ParamSpec {
  key: string
  label: string
  min: number
  max: number
  step: number
  awal: number
  satuan?: string
  /** tampilkan nilai sebagai bilangan bulat. */
  bulat?: boolean
}

export interface DeriveState {
  /** indeks langkah aktif. */
  step: number
  /** kemajuan animasi langkah aktif, 0..1. */
  t: number
  /** nilai parameter yang bisa digeser pengguna. */
  p: Record<string, number>
  /** bagian rumus yang sedang disorot pengguna (hover/klik). */
  sorot: string | null
}

export interface DeriveStep {
  id: string
  judul: string
  /** narasi yang muncul di bawah panggung, bahasa anak. */
  narasi: string
  /** rumus yang ditampilkan pada langkah ini (markup FormulaProps). */
  rumus?: string
  /** durasi animasi langkah ini dalam ms. */
  durasi?: number
}

export interface DeriveScene {
  steps: DeriveStep[]
  params?: ParamSpec[]
  roles?: Record<string, FormulaRole>
  arti?: Record<string, string>
  /** komponen SVG yang menggambar keadaan `DeriveState`. */
  Visual: ComponentType<DeriveState>
  /** perbandingan lebar:tinggi panggung, dipakai untuk viewBox. */
  rasio?: number
}

/* ---------------- Tebak dulu ---------------- */

export interface PredictPilihan {
  id: string
  label: string
  benar?: boolean
  /** kenapa jawaban ini menggoda tetapi keliru. */
  balasan: string
}

export interface Predict {
  pertanyaan: string
  pilihan: PredictPilihan[]
  /** dibaca setelah pengguna memilih, apa pun jawabannya. */
  penutup: string
}

/* ---------------- Soal ---------------- */

export type SoalTipe =
  | 'pilihan'
  | 'angka'
  | 'benar-salah'
  | 'urutkan'
  | 'cocokkan'
  | 'isian'

export interface SoalDasar {
  id: string
  topicId: string
  kelas: number
  tingkat: 'mudah' | 'sedang' | 'sulit'
  pertanyaan: string
  /** gambar/visual opsional yang dirender di atas pertanyaan. */
  visual?: ReactNode
  hint: string[]
  pembahasan: string
  /** id konsep untuk tautan "lihat kenapa". */
  konsep?: string
}

export interface SoalPilihan extends SoalDasar {
  tipe: 'pilihan'
  pilihan: { id: string; label: string; benar?: boolean; diagnosa?: string }[]
}

export interface SoalAngka extends SoalDasar {
  tipe: 'angka'
  jawaban: number
  /** toleransi absolut, default 1e-9. */
  toleransi?: number
  satuan?: string
}

export interface SoalBenarSalah extends SoalDasar {
  tipe: 'benar-salah'
  jawaban: boolean
  diagnosa?: string
}

export interface SoalUrutkan extends SoalDasar {
  tipe: 'urutkan'
  /** langkah dalam urutan yang benar. */
  langkah: string[]
}

export interface SoalCocokkan extends SoalDasar {
  tipe: 'cocokkan'
  pasangan: { kiri: string; kanan: string }[]
}

export interface SoalIsian extends SoalDasar {
  tipe: 'isian'
  /** jawaban yang diterima (dinormalkan sebelum dibandingkan). */
  jawaban: string[]
}

export type Soal =
  | SoalPilihan
  | SoalAngka
  | SoalBenarSalah
  | SoalUrutkan
  | SoalCocokkan
  | SoalIsian

/** Pembuat soal parametrik: menerima angka acak 0..1 dan menghasilkan soal. */
export type SoalGenerator = (rnd: () => number) => Soal

/* ---------------- Modul konsep ---------------- */

export interface PenjelasanBertingkat {
  SD?: ReactNode
  SMP?: ReactNode
  SMA?: ReactNode
}

export interface Konsep {
  id: string
  topicId: string
  judul: string
  /** pertanyaan pemancing, tampil besar di atas halaman. */
  pertanyaan: string
  /** satu kalimat penggoda di kartu. */
  tagline: string
  kelas: number
  domain: Domain
  /** kata kunci untuk pencarian. */
  tags?: string[]
  /** langkah 1: tebak dulu (opsional tetapi sangat dianjurkan). */
  tebak?: Predict
  /** langkah 2: panggung eksplorasi bebas. */
  eksperimen?: {
    judul: string
    ajakan: string
    params: ParamSpec[]
    Visual: ComponentType<{ p: Record<string, number>; sorot: string | null }>
    /** catatan yang berubah mengikuti parameter — inti "temukan sendiri". */
    temuan?: (p: Record<string, number>) => ReactNode
    rasio?: number
  }
  /** langkah 3: bongkar rumus, animasi bertahap. */
  bongkar: DeriveScene
  /** langkah 4: penjelasan sesuai level. */
  penjelasan: PenjelasanBertingkat
  /** rumus akhir. */
  rumus: {
    src: string
    roles?: Record<string, FormulaRole>
    arti?: Record<string, string>
  }
  /** langkah 5: mini tes. */
  soal: (SoalGenerator | Soal)[]
  /** konsep lain yang relevan. */
  lanjut?: string[]
}
