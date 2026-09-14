/* ============================================================
   Visual MTK — Katalog konsep interaktif

   Daftar ringan (tanpa memuat modulnya) untuk galeri, pencarian,
   dan tautan antar konsep. Modul berat baru dimuat saat dibuka.

   Judul, pertanyaan, tagline, domain, dan tag TIDAK ditulis di sini:
   semuanya diambil dari modul konsep lewat katalog.generated.ts,
   sehingga teks di galeri tidak mungkin melenceng dari teks di
   halaman konsepnya. Bangun ulang dengan: npm run bangun:katalog

   Yang tersisa di berkas ini hanya hal yang memang milik katalog:
   label jenis visualisasi untuk penyaringan di galeri.
   ============================================================ */

import type { Domain } from '../lib/types'
import { adaKonsep } from '../concepts/registry'
import { KONSEP_META } from './katalog.generated'
import { TAUTAN_KONSEP } from './tautan.generated'

export interface KonsepMeta {
  id: string
  judul: string
  /** pertanyaan "kenapa" yang menjadi wajah konsep ini. */
  pertanyaan: string
  tagline: string
  kelas: number
  domain: Domain
  /** id topik kurikulum yang dijelaskan konsep ini. */
  topicId: string
  tags: string[]
  /** jenis visualisasi utama — dipakai untuk penyaringan di galeri. */
  visual: string
  /** konsep ini punya mode eksperimen bebas. */
  eksperimen?: boolean
}

export const LABEL_DOMAIN: Record<Domain, string> = {
  bilangan: 'Bilangan',
  aljabar: 'Aljabar',
  pengukuran: 'Pengukuran',
  geometri: 'Geometri',
  data: 'Data & Peluang',
  kalkulus: 'Kalkulus',
}

/**
 * Label jenis visualisasi tiap konsep. Ini keterangan untuk pengguna
 * ("apa yang akan kulihat?"), bukan bagian dari isi konsep — karena itu
 * dirawat di sini, bukan di modulnya.
 */
const VISUAL: Record<string, string> = {
  'nilai-tempat': 'blok satuan',
  'perkalian-luas': 'model luas',
  'segitiga-setengah': 'geometri potong-susun',
  'pecahan-penyebut': 'batang pecahan',
  'bagi-pecahan': 'batang pecahan',
  'persen-dari': 'kisi 100',
  'pi-dari-mana': 'gulingkan lingkaran',
  'lingkaran-luas': 'potong juring',
  'negatif-kali-negatif': 'pola & garis bilangan',
  'timbangan-persamaan': 'timbangan',
  'sudut-segitiga': 'sobek & susun sudut',
  'kuadrat-jumlah': 'ubin aljabar',
  pythagoras: 'bukti susun ulang',
  'peluang-simulasi': 'simulasi',
  'kerucut-sepertiga': 'tuang isi',
  parabola: 'grafik dinamis',
  'deret-gauss': 'susun balok',
  'eksponen-logaritma': 'skala & tangga',
  'sin-cos-lingkaran': 'lingkaran satuan',
  'turunan-kemiringan': 'garis potong ke singgung',
  'integral-luas': 'jumlah riemann',
  'rata-rata-menipu': 'titik data & tuas',
}

/**
 * Kelas dan topicId diambil dari peta kurikulum hasil riset bila konsepnya
 * sudah tertaut di sana, sehingga tidak pernah melenceng dari kurikulum.
 * Nilai pada modul dipakai sebagai cadangan.
 */
export const KATALOG: KonsepMeta[] = KONSEP_META.map((m) => {
  const tautan = TAUTAN_KONSEP[m.id]
  return {
    id: m.id,
    judul: m.judul,
    pertanyaan: m.pertanyaan,
    tagline: m.tagline,
    domain: m.domain,
    tags: m.tags,
    eksperimen: m.eksperimen,
    visual: VISUAL[m.id] ?? 'visual interaktif',
    kelas: tautan?.kelas ?? m.kelas,
    topicId: tautan?.topicId ?? '',
  }
})

export const petaKatalog = new Map(KATALOG.map((k) => [k.id, k]))

export const cariKonsepMeta = (id: string) => petaKatalog.get(id)

/** Konsep yang modul visualnya benar-benar sudah ada. */
export const konsepSiap = () => KATALOG.filter((k) => adaKonsep(k.id))

export const konsepUntukTopik = (topicId: string) =>
  KATALOG.filter((k) => k.topicId === topicId && adaKonsep(k.id))

export function cariKonsep(q: string): KonsepMeta[] {
  const t = q.trim().toLowerCase()
  if (!t) return konsepSiap()
  return konsepSiap().filter((k) =>
    [k.judul, k.pertanyaan, k.tagline, ...k.tags].some((s) => s.toLowerCase().includes(t)),
  )
}
