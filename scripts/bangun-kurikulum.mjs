/**
 * Mengubah hasil riset Capaian Pembelajaran (docs/riset/02-fase-*.json)
 * menjadi src/data/kurikulum.generated.ts.
 *
 * Jalankan: node scripts/bangun-kurikulum.mjs
 */

import fs from 'node:fs'
import path from 'node:path'

const RISET = 'docs/riset'

const DOMAIN = {
  bilangan: 'bilangan',
  aljabar: 'aljabar',
  'aljabar dan fungsi': 'aljabar',
  'aljabar dan pola bilangan': 'aljabar',
  fungsi: 'aljabar',
  pengukuran: 'pengukuran',
  geometri: 'geometri',
  'analisis data dan peluang': 'data',
  'analisis data dan peluang (statistika dan peluang)': 'data',
  'data dan peluang': 'data',
  statistika: 'data',
  peluang: 'data',
  kalkulus: 'kalkulus',
}

const FASE_KELAS = { A: [1, 2], B: [3, 4], C: [5, 6], D: [7, 8, 9], E: [10], F: [11, 12] }

/**
 * Menempelkan modul konsep interaktif ke topik kurikulum yang tepat.
 * Dicocokkan dengan JUDUL PERSIS dari dokumen CP agar tidak salah topik.
 * Entri yang topiknya belum ada (fase yang risetnya belum selesai) dilewati
 * dengan peringatan.
 */
const KONSEP_DI_TOPIK = [
  { kelas: 2, judul: 'Nilai Tempat Puluhan dan Satuan', konsep: ['nilai-tempat'] },
  { kelas: 3, judul: 'Konsep Perkalian sebagai Penjumlahan Berulang', konsep: ['perkalian-luas'] },
  { kelas: 5, judul: 'Luas Persegi, Persegi Panjang, dan Segitiga', konsep: ['segitiga-setengah'] },
  { kelas: 5, judul: 'Penjumlahan dan Pengurangan Pecahan', konsep: ['pecahan-penyebut'] },
  { kelas: 6, judul: 'Pembagian Pecahan', konsep: ['bagi-pecahan'] },
  { kelas: 6, judul: 'Penerapan Persen dalam Kehidupan Sehari-hari', konsep: ['persen-dari'] },
  { kelas: 6, judul: 'Keliling dan Luas Lingkaran', konsep: ['pi-dari-mana', 'lingkaran-luas'] },
  { kelas: 7, cari: ['perkalian', 'bilangan bulat'], konsep: ['negatif-kali-negatif'] },
  { kelas: 7, cari: ['persamaan linear'], konsep: ['timbangan-persamaan'] },
  { kelas: 7, cari: ['sudut', 'segitiga'], konsep: ['sudut-segitiga'] },
  { kelas: 8, judul: 'Identitas Aljabar dan Bentuk Kuadrat Sempurna', konsep: ['kuadrat-jumlah'] },
  { kelas: 8, cari: ['pythagoras'], konsep: ['pythagoras'] },
  { kelas: 8, cari: ['peluang'], konsep: ['peluang-simulasi'] },
  { kelas: 9, cari: ['kerucut'], konsep: ['kerucut-sepertiga'] },
  { kelas: 9, cari: ['fungsi kuadrat'], konsep: ['parabola'] },
  { kelas: 10, judul: 'Barisan dan Deret Aritmetika', konsep: ['deret-gauss'] },
  { kelas: 10, judul: 'Logaritma: Definisi dan Sifat-sifatnya', konsep: ['eksponen-logaritma'] },
  { kelas: 10, judul: 'Perbandingan Trigonometri Sudut Lancip (Sinus, Cosinus, Tangen)', konsep: ['sin-cos-lingkaran'] },
  { kelas: 10, judul: 'Ukuran Pemusatan Data: Mean, Median, dan Modus', konsep: ['rata-rata-menipu'] },
  { kelas: 11, judul: 'Definisi Turunan sebagai Limit', konsep: ['turunan-kemiringan'] },
  { kelas: 12, judul: 'Jumlah Riemann dan Integral Tentu', konsep: ['integral-luas'] },
]

/**
 * Capaian Pembelajaran menetapkan Fase F sebagai satu kesatuan (kelas 11-12)
 * tanpa memerinci kelasnya; pembagian itu keputusan ATP tiap sekolah.
 * Aplikasi ini menampilkan materi per kelas, jadi dipakai pembagian yang
 * paling lazim di Indonesia: limit dan turunan di kelas 11, integral di
 * kelas 12.
 */
function kelasKalkulus(judul, kelasAsli) {
  const j = judul.toLowerCase()
  if (/integral|riemann|teorema dasar kalkulus|volume benda putar|luas daerah/.test(j)) return 12
  if (/limit|turunan|kekontinuan|garis singgung|stasioner|optimasi|kecekungan|titik belok|laju perubahan|maksimum/.test(j)) {
    return 11
  }
  return kelasAsli
}

const jenjang = (k) => (k <= 6 ? 'sd' : k <= 9 ? 'smp' : 'sma')

const slug = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .split('-')
    .slice(0, 5)
    .join('-')

const bersih = (s) => String(s ?? '').replace(/\s+/g, ' ').trim()

/* ---------- baca semua fase ---------- */
const berkas = fs
  .readdirSync(RISET)
  .filter((f) => /^02-fase-[A-F]\.json$/.test(f))
  .sort()

if (berkas.length === 0) {
  console.error('Tidak ada berkas riset fase di', RISET)
  process.exit(1)
}

const topik = []
const dipakai = new Set()

/**
 * Riset Fase F dipecah per domain (keluarannya terlalu besar untuk satu
 * panggilan). Berkas-berkas itu digabungkan ke dalam data Fase F di sini.
 */
function domainTambahan(fase) {
  if (fase !== 'F') return []
  const dir = path.join(RISET, 'fase-f')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')))
}

for (const f of berkas) {
  const data = JSON.parse(fs.readFileSync(path.join(RISET, f), 'utf8'))
  const fase = data.fase
  const kelasFase = FASE_KELAS[fase] ?? data.kelas ?? []
  const semuaDomain = [...(data.domains ?? []), ...domainTambahan(fase)]

  for (const d of semuaDomain) {
    const dom = DOMAIN[bersih(d.nama).toLowerCase()]
    if (!dom) {
      console.warn('Domain tidak dikenal, dilewati:', d.nama)
      continue
    }
    for (const t of d.topics ?? []) {
      let kelas = kelasFase.includes(t.kelas) ? t.kelas : kelasFase[0]
      if (dom === 'kalkulus') kelas = kelasKalkulus(t.judul, kelas)
      // Topik khusus mata pelajaran "Matematika Tingkat Lanjut" ditandai
      // dengan awalan pada judulnya; awalan itu diubah menjadi bendera.
      const lanjut = /^\s*\[tingkat lanjut\]\s*/i.test(t.judul)
      const judul = bersih(t.judul.replace(/^\s*\[tingkat lanjut\]\s*/i, ''))
      let id = `${jenjang(kelas)}${kelas}-${slug(judul)}`
      let n = 2
      while (dipakai.has(id)) id = `${jenjang(kelas)}${kelas}-${slug(judul)}-${n++}`
      dipakai.add(id)

      topik.push({
        id,
        judul,
        ...(lanjut ? { lanjut: true } : {}),
        kelas,
        fase,
        domain: dom,
        ringkas: bersih((t.keterampilan ?? [])[0] ?? (t.subKonsep ?? [])[0] ?? t.judul),
        subKonsep: (t.subKonsep ?? []).map(bersih).filter(Boolean).slice(0, 8),
        rumus: (t.rumus ?? []).map(bersih).filter(Boolean).slice(0, 6),
        prasyaratTeks: (t.prasyarat ?? []).map(bersih).filter(Boolean),
        miskonsepsi: (t.miskonsepsi ?? []).map(bersih).filter(Boolean).slice(0, 3),
        kenapa: (t.pertanyaanKenapa ?? []).map(bersih).filter(Boolean).slice(0, 2),
      })
    }
  }
}

/* ---------- tempelkan modul konsep ke topiknya ---------- */
console.log('\nPenempelan modul konsep:')
for (const p of KONSEP_DI_TOPIK) {
  const seKelas = topik.filter((t) => t.kelas === p.kelas)
  let target = null
  if (p.judul) {
    target = seKelas.find((t) => t.judul === p.judul) ?? null
  }
  if (!target && (p.cari || p.judul)) {
    const kata = (p.cari ?? p.judul.toLowerCase().split(/\s+/)).map((k) => k.toLowerCase())
    const skor = seKelas
      .map((t) => ({ t, s: kata.filter((k) => t.judul.toLowerCase().includes(k)).length }))
      .filter((x) => x.s === kata.length || (x.s > 0 && !p.judul))
      .sort((a, b) => b.s - a.s || a.t.judul.length - b.t.judul.length)
    target = skor[0]?.t ?? null
  }
  if (!target) {
    console.warn('  ! belum ada topiknya:', p.konsep.join(', '), '(kelas ' + p.kelas + ')')
    continue
  }
  target.konsep = [...(target.konsep ?? []), ...p.konsep]
  console.log('  ' + p.konsep.join(', ').padEnd(34) + ' -> [' + target.id + '] ' + target.judul)
}

/* ---------- petakan prasyarat teks menjadi id ---------- */
const kataKunci = (s) =>
  new Set(
    s
      .toLowerCase()
      .replace(/\(fase [a-f]\)/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 3),
  )

const indeks = topik.map((t) => ({ t, kata: kataKunci(t.judul) }))

for (const t of topik) {
  const ids = []
  for (const teks of t.prasyaratTeks) {
    const kt = kataKunci(teks)
    let terbaik = null
    let skor = 0
    for (const { t: kandidat, kata } of indeks) {
      if (kandidat.id === t.id) continue
      if (kandidat.kelas > t.kelas) continue
      let s = 0
      for (const w of kt) if (kata.has(w)) s++
      const rasio = s / Math.max(1, Math.min(kt.size, kata.size))
      if (s >= 2 && rasio > skor) {
        skor = rasio
        terbaik = kandidat
      }
    }
    if (terbaik && skor >= 0.5 && !ids.includes(terbaik.id)) ids.push(terbaik.id)
  }
  t.prasyarat = ids.slice(0, 4)
  delete t.prasyaratTeks
}

topik.sort(
  (a, b) =>
    a.kelas - b.kelas ||
    Number(!!a.lanjut) - Number(!!b.lanjut) ||
    a.domain.localeCompare(b.domain) ||
    a.judul.localeCompare(b.judul),
)

const nPra = topik.reduce((a, t) => a + t.prasyarat.length, 0)
console.log(`\n${topik.length} topik, ${nPra} hubungan prasyarat.`)
for (const k of Array.from({ length: 12 }, (_, i) => i + 1)) {
  const n = topik.filter((t) => t.kelas === k).length
  console.log(`  kelas ${String(k).padStart(2)}: ${n} topik`)
}

/* ---------- tulis berkas TypeScript ----------
   Data dipecah agar halaman hanya memuat yang benar-benar dipakai:

   - ringkas.generated.ts  : seluruh topik tanpa teks panjang. Dipakai
                             halaman Belajar, Peta, dan penamaan prasyarat.
   - kelas/kelas-N.ts      : rincian lengkap satu kelas, dimuat malas oleh
                             halaman kelas yang sedang dibuka.
*/

const KEPALA = (judul) => `/* ============================================================
   Visual MTK — ${judul} (DIHASILKAN OTOMATIS)

   Jangan sunting berkas ini dengan tangan.
   Sumber: docs/riset/ (riset Capaian Pembelajaran Kepka BSKAP
   Kemendikdasmen No. 046/H/KR/2025).
   Bangun ulang: npm run bangun:kurikulum
   ============================================================ */
`

const DIR_KELAS = 'src/data/kurikulum'
fs.mkdirSync(DIR_KELAS, { recursive: true })

// Ringkasan: bidang yang dipakai untuk daftar, pencarian, dan peta.
const ringkas = topik.map((t) => ({
  id: t.id,
  judul: t.judul,
  kelas: t.kelas,
  fase: t.fase,
  domain: t.domain,
  prasyarat: t.prasyarat,
  ...(t.lanjut ? { lanjut: true } : {}),
  ...(t.konsep ? { konsep: t.konsep } : {}),
}))

const isiRingkas = `${KEPALA('Ringkasan topik kurikulum')}
import type { Domain, Fase } from '../../lib/types'

export interface TopikRingkas {
  id: string
  judul: string
  kelas: number
  fase: Fase
  domain: Domain
  prasyarat: string[]
  /** hanya ada pada mata pelajaran Matematika Tingkat Lanjut. */
  lanjut?: boolean
  konsep?: string[]
}

export const TOPIK_RINGKAS: TopikRingkas[] = ${JSON.stringify(ringkas, null, 1)}
`
fs.writeFileSync(path.join(DIR_KELAS, 'ringkas.generated.ts'), isiRingkas)
console.log(`\nDitulis: ${DIR_KELAS}/ringkas.generated.ts (${(isiRingkas.length / 1024).toFixed(0)} KB)`)

let totalKelas = 0
for (let k = 1; k <= 12; k++) {
  const isiKelas = topik.filter((t) => t.kelas === k)
  const teks = `${KEPALA(`Rincian topik kelas ${k}`)}
import type { TopikKurikulum } from '../kurikulum'

const topik: TopikKurikulum[] = ${JSON.stringify(isiKelas, null, 1)}

export default topik
`
  fs.writeFileSync(path.join(DIR_KELAS, `kelas-${k}.generated.ts`), teks)
  totalKelas += teks.length
}
console.log(
  `Ditulis: ${DIR_KELAS}/kelas-1..12.generated.ts (total ${(totalKelas / 1024).toFixed(0)} KB, rata-rata ${(
    totalKelas /
    12 /
    1024
  ).toFixed(0)} KB per kelas)`,
)

/* ---------- berkas kecil: konsep -> topik ----------
   Dipisah supaya katalog konsep tidak ikut menarik seluruh data
   kurikulum ke dalam muatan awal aplikasi. */
const tautan = {}
for (const t of topik) {
  for (const k of t.konsep ?? []) tautan[k] = { topicId: t.id, kelas: t.kelas }
}

const isiTautan = `/* ============================================================
   Visual MTK — Tautan konsep ke topik kurikulum (DIHASILKAN OTOMATIS)
   Jangan sunting dengan tangan.
   Bangun ulang: node scripts/bangun-kurikulum.mjs
   ============================================================ */

export const TAUTAN_KONSEP: Record<string, { topicId: string; kelas: number }> = ${JSON.stringify(
  tautan,
  null,
  2,
)}
`
fs.writeFileSync('src/data/tautan.generated.ts', isiTautan)
console.log(`Ditulis: src/data/tautan.generated.ts (${Object.keys(tautan).length} tautan)`)
