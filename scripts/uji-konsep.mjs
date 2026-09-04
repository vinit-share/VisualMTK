/**
 * Gerbang kualitas untuk seluruh modul konsep.
 *
 * Yang diperiksa:
 *  1. Bentuk data (langkah bongkar, penjelasan, eksperimen, soal).
 *  2. Kunci jawaban — setiap soal dinilai ulang memakai penilai yang sama
 *     dengan yang dipakai aplikasi. Soal yang kuncinya salah akan ketahuan.
 *  3. Kelengkapan pedagogis: 3 petunjuk, pembahasan, diagnosa tiap pengecoh.
 *  4. Render SVG pada BANYAK keadaan (step, t, dan nilai penggeser ekstrem),
 *     lalu memindai keluarannya dari NaN / Infinity / undefined.
 *  5. Jumlah elemen SVG tetap wajar.
 *  6. Tidak ada warna heksadesimal mentah pada berkasnya.
 *
 * Jalankan: node scripts/uji-konsep.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { createServer } from 'vite'
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'

const AKAR = process.cwd()
const DIR = path.join(AKAR, 'src', 'concepts')

const masalah = []
const catat = (id, keparahan, pesan) => masalah.push({ id, keparahan, pesan })

/* ---------------- Nilai jawaban (cerminan src/components/SoalView.tsx) ---------------- */

const normalTeks = (s) =>
  String(s).trim().toLowerCase().replace(/\s+/g, ' ').replace(/[.!?]+$/, '')

function parseAngka(teks) {
  const t = String(teks).trim().replace(/\s/g, '').replace(/\./g, '').replace(',', '.')
  if (t === '' || !/^-?\d*\.?\d+(?:\/-?\d*\.?\d+)?$/.test(t)) return null
  if (t.includes('/')) {
    const [p, q] = t.split('/').map(Number)
    return q === 0 ? null : p / q
  }
  const n = Number(t)
  return Number.isFinite(n) ? n : null
}

function nilaiJawaban(soal, nilai) {
  switch (soal.tipe) {
    case 'pilihan': {
      const p = soal.pilihan.find((o) => o.id === nilai)
      return !!p?.benar
    }
    case 'benar-salah':
      return nilai === soal.jawaban
    case 'angka': {
      const n = typeof nilai === 'number' ? nilai : parseAngka(nilai ?? '')
      if (n === null) return false
      return Math.abs(n - soal.jawaban) <= Math.max(soal.toleransi ?? 1e-9, Math.abs(soal.jawaban) * 1e-9)
    }
    case 'isian':
      return soal.jawaban.some((j) => normalTeks(j) === normalTeks(nilai))
    case 'urutkan':
      return Array.isArray(nilai) && nilai.every((x, i) => x === soal.langkah[i])
    case 'cocokkan': {
      const m = nilai ?? {}
      return soal.pasangan.every((p) => m[p.kiri] === p.kanan)
    }
    default:
      return false
  }
}

/** Jawaban yang seharusnya diterima, untuk menguji kunci jawabannya sendiri. */
function jawabanBenar(soal) {
  switch (soal.tipe) {
    case 'pilihan':
      return soal.pilihan.find((o) => o.benar)?.id
    case 'benar-salah':
      return soal.jawaban
    case 'angka':
      return soal.jawaban
    case 'isian':
      return soal.jawaban[0]
    case 'urutkan':
      return soal.langkah
    case 'cocokkan':
      return Object.fromEntries(soal.pasangan.map((p) => [p.kiri, p.kanan]))
    default:
      return undefined
  }
}

/* ---------------- Pemeriksaan bentuk data ---------------- */

const TIPE_SAH = ['pilihan', 'angka', 'benar-salah', 'urutkan', 'cocokkan', 'isian']

function periksaSoal(id, soal, asal) {
  const tanda = `${asal}#${soal?.id ?? '(tanpa id)'}`
  if (!soal || !TIPE_SAH.includes(soal.tipe)) {
    catat(id, 'fatal', `${tanda}: tipe soal tidak sah (${soal?.tipe})`)
    return
  }
  if (!soal.pertanyaan) catat(id, 'fatal', `${tanda}: tidak ada pertanyaan`)
  if (!soal.pembahasan) catat(id, 'serius', `${tanda}: tidak ada pembahasan`)
  if (!soal.konsep) catat(id, 'ringan', `${tanda}: tidak menunjuk konsep (tombol "Lihat kenapa" tidak muncul)`)
  if (!Array.isArray(soal.hint) || soal.hint.length < 2) {
    catat(id, 'serius', `${tanda}: petunjuk kurang dari 2 (ada ${soal.hint?.length ?? 0})`)
  }
  if (!['mudah', 'sedang', 'sulit'].includes(soal.tingkat)) {
    catat(id, 'ringan', `${tanda}: tingkat kesulitan tidak sah (${soal.tingkat})`)
  }

  if (soal.tipe === 'pilihan') {
    const benar = soal.pilihan.filter((o) => o.benar)
    if (benar.length !== 1) {
      catat(id, 'fatal', `${tanda}: jumlah pilihan benar = ${benar.length}, seharusnya tepat 1`)
    }
    for (const o of soal.pilihan) {
      if (!o.benar && !o.diagnosa) {
        catat(id, 'serius', `${tanda}: pengecoh "${o.label}" tidak punya diagnosa`)
      }
    }
    const idUnik = new Set(soal.pilihan.map((o) => o.id))
    if (idUnik.size !== soal.pilihan.length) catat(id, 'fatal', `${tanda}: id pilihan berulang`)
  }

  if (soal.tipe === 'angka') {
    if (!Number.isFinite(soal.jawaban)) catat(id, 'fatal', `${tanda}: jawaban bukan bilangan (${soal.jawaban})`)
    // Toleransi harus cukup untuk pembulatan yang diminta soal.
    const minta = /(\w+)\s+(satu|dua|tiga|empat)\s+angka di belakang koma/i.exec(soal.pertanyaan)
    if (minta) {
      const peta = { satu: 0.05, dua: 0.005, tiga: 0.0005, empat: 0.00005 }
      const perlu = peta[minta[2].toLowerCase()]
      if ((soal.toleransi ?? 1e-9) < perlu) {
        catat(
          id,
          'serius',
          `${tanda}: soal meminta pembulatan ${minta[2]} angka desimal, tetapi toleransinya hanya ${soal.toleransi} (perlu >= ${perlu})`,
        )
      }
    }
  }

  if (soal.tipe === 'isian' && (!Array.isArray(soal.jawaban) || soal.jawaban.length === 0)) {
    catat(id, 'fatal', `${tanda}: daftar jawaban kosong`)
  }
  if (soal.tipe === 'urutkan' && (!Array.isArray(soal.langkah) || soal.langkah.length < 3)) {
    catat(id, 'serius', `${tanda}: langkah untuk diurutkan kurang dari 3`)
  }
  if (soal.tipe === 'cocokkan') {
    if (!Array.isArray(soal.pasangan) || soal.pasangan.length < 3) {
      catat(id, 'serius', `${tanda}: pasangan kurang dari 3`)
    } else {
      const kiri = new Set(soal.pasangan.map((p) => p.kiri))
      if (kiri.size !== soal.pasangan.length) catat(id, 'fatal', `${tanda}: sisi kiri berulang`)
    }
  }

  // Uji kunci jawabannya sendiri.
  const kunci = jawabanBenar(soal)
  if (kunci === undefined) {
    catat(id, 'fatal', `${tanda}: tidak ada jawaban benar yang bisa ditentukan`)
  } else if (!nilaiJawaban(soal, kunci)) {
    catat(id, 'fatal', `${tanda}: kunci jawaban sendiri dinilai SALAH oleh penilai aplikasi`)
  }
}

/* ---------------- Render visual di banyak keadaan ---------------- */

const ANGKA_RUSAK = /(NaN|Infinity|undefined|null)/

function periksaRender(id, nama, komponen, keadaan) {
  let maksElemen = 0
  for (const props of keadaan) {
    let html
    try {
      html = renderToStaticMarkup(createElement(komponen, props))
    } catch (e) {
      catat(id, 'fatal', `${nama}: gagal dirender pada ${JSON.stringify(props).slice(0, 120)} — ${e.message}`)
      continue
    }
    // Pindai atribut yang berisi nilai rusak.
    const atributRusak = html.match(/(?:x|y|cx|cy|r|rx|ry|x1|y1|x2|y2|width|height|d|points|transform|opacity|stroke-width)="[^"]*(?:NaN|Infinity)[^"]*"/g)
    if (atributRusak) {
      catat(
        id,
        'fatal',
        `${nama}: atribut SVG rusak pada ${JSON.stringify(props).slice(0, 100)} → ${atributRusak.slice(0, 2).join(' ; ')}`,
      )
    }
    const teksRusak = html.match(/>[^<]*(?:NaN|Infinity)[^<]*</g)
    if (teksRusak) {
      catat(id, 'fatal', `${nama}: teks memuat ${ANGKA_RUSAK.exec(teksRusak[0])[0]} pada ${JSON.stringify(props).slice(0, 100)}`)
    }
    const jumlah = (html.match(/<(rect|circle|path|line|text|polygon|polyline|ellipse|tspan)\b/g) ?? []).length
    maksElemen = Math.max(maksElemen, jumlah)
  }
  if (maksElemen > 400) {
    catat(id, 'serius', `${nama}: sampai ${maksElemen} elemen SVG sekaligus (batas wajar 400)`)
  }
  return maksElemen
}

/** Nilai uji untuk tiap parameter: minimum, tengah, maksimum. */
function nilaiUji(params = []) {
  if (params.length === 0) return [{}]
  const pilihan = params.map((s) => {
    const tengah = Math.round(((s.min + s.max) / 2 - s.min) / s.step) * s.step + s.min
    return [...new Set([s.min, tengah, s.max, s.awal])]
  })
  const hasil = []
  // Semua kombinasi bila sedikit, kalau tidak ambil contoh yang mewakili.
  const total = pilihan.reduce((a, v) => a * v.length, 1)
  if (total <= 64) {
    const rekursi = (i, akum) => {
      if (i === params.length) return hasil.push({ ...akum })
      for (const v of pilihan[i]) rekursi(i + 1, { ...akum, [params[i].key]: v })
    }
    rekursi(0, {})
  } else {
    const maksIdx = Math.max(...pilihan.map((v) => v.length))
    for (let k = 0; k < maksIdx; k++) {
      hasil.push(
        Object.fromEntries(params.map((s, i) => [s.key, pilihan[i][Math.min(k, pilihan[i].length - 1)]])),
      )
    }
    // Tambahkan pojok-pojok ekstrem.
    hasil.push(Object.fromEntries(params.map((s) => [s.key, s.min])))
    hasil.push(Object.fromEntries(params.map((s) => [s.key, s.max])))
  }
  return hasil
}

/* ---------------- Jalankan ---------------- */

const server = await createServer({
  configFile: path.join(AKAR, 'vite.config.ts'),
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
  logLevel: 'error',
})

const berkas = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith('.tsx'))
  .sort()

console.log(`Menguji ${berkas.length} modul konsep…\n`)

let totalSoal = 0
const ringkasan = []

for (const f of berkas) {
  const id = f.replace(/\.tsx$/, '')
  const sumber = fs.readFileSync(path.join(DIR, f), 'utf8')

  // Pemeriksaan pada teks sumber.
  const hex = sumber.match(/['"]#[0-9a-fA-F]{3,8}['"]/g)
  if (hex) catat(id, 'serius', `warna heksadesimal mentah: ${[...new Set(hex)].slice(0, 4).join(', ')}`)
  if (/\bconsole\.(log|debug)\s*\(/.test(sumber)) catat(id, 'ringan', 'ada console.log yang tertinggal')
  if (/setInterval\s*\(/.test(sumber)) catat(id, 'serius', 'memakai setInterval (seharusnya useRaf)')

  let mod
  try {
    mod = await server.ssrLoadModule(`/src/concepts/${f}`)
  } catch (e) {
    catat(id, 'fatal', `gagal dimuat: ${e.message}`)
    continue
  }
  const k = mod.default
  if (!k) {
    catat(id, 'fatal', 'tidak ada default export')
    continue
  }

  if (k.id !== id) catat(id, 'fatal', `id di dalam modul ("${k.id}") tidak sama dengan nama berkas`)
  if (!k.pertanyaan?.trim()) catat(id, 'serius', 'tidak ada pertanyaan pemancing')
  if (!k.tagline?.trim()) catat(id, 'ringan', 'tidak ada tagline')

  /* --- bongkar --- */
  const langkah = k.bongkar?.steps ?? []
  if (langkah.length < 4) catat(id, 'serius', `langkah bongkar hanya ${langkah.length} (minimal 4)`)
  for (const s of langkah) {
    if (!s.narasi?.trim()) catat(id, 'serius', `langkah "${s.id}" tanpa narasi`)
    if ((s.durasi ?? 1400) < 800) catat(id, 'ringan', `langkah "${s.id}" durasinya terlalu singkat`)
  }
  const idLangkah = new Set(langkah.map((s) => s.id))
  if (idLangkah.size !== langkah.length) catat(id, 'fatal', 'id langkah bongkar berulang')

  /* --- penjelasan --- */
  const level = ['SD', 'SMP', 'SMA'].filter((l) => k.penjelasan?.[l])
  if (level.length < 2) catat(id, 'serius', `penjelasan hanya tersedia untuk ${level.length} level`)

  /* --- eksperimen --- */
  if (!k.eksperimen) {
    catat(id, 'serius', 'tidak ada mode eksperimen')
  } else if (typeof k.eksperimen.temuan !== 'function') {
    catat(id, 'serius', 'eksperimen tanpa temuan()')
  } else {
    // Temuan harus berubah mengikuti penggeser.
    const ps = k.eksperimen.params ?? []
    const a = Object.fromEntries(ps.map((s) => [s.key, s.min]))
    const b = Object.fromEntries(ps.map((s) => [s.key, s.max]))
    try {
      const ta = renderToStaticMarkup(createElement('div', null, k.eksperimen.temuan(a)))
      const tb = renderToStaticMarkup(createElement('div', null, k.eksperimen.temuan(b)))
      if (ta === tb) catat(id, 'serius', 'temuan() tidak berubah walau penggeser digeser dari minimum ke maksimum')
      for (const [nama, teks] of [['min', ta], ['maks', tb]]) {
        if (/NaN|Infinity/.test(teks)) catat(id, 'fatal', `temuan() menghasilkan NaN/Infinity pada nilai ${nama}`)
      }
    } catch (e) {
      catat(id, 'fatal', `temuan() melempar galat: ${e.message}`)
    }
  }

  /* --- rumus --- */
  const bagianRumus = [...(k.rumus?.src ?? '').matchAll(/\[([a-zA-Z0-9_-]+):/g)].map((m) => m[1])
  if (bagianRumus.length < 2) catat(id, 'serius', 'rumus akhir punya kurang dari 2 bagian yang bisa disorot')
  for (const b of new Set(bagianRumus)) {
    if (!k.rumus?.arti?.[b]) catat(id, 'ringan', `bagian rumus "${b}" tidak punya penjelasan arti`)
  }

  /* --- soal --- */
  const soalJadi = []
  for (const s of k.soal ?? []) {
    if (typeof s === 'function') {
      // Jalankan generator dengan beberapa benih berbeda.
      for (let benih = 1; benih <= 12; benih++) {
        let x = (benih * 2654435761) % 4294967296
        const rnd = () => {
          x ^= x << 13
          x >>>= 0
          x ^= x >> 17
          x ^= x << 5
          x >>>= 0
          return x / 4294967296
        }
        try {
          soalJadi.push({ soal: s(rnd), asal: `generator(benih ${benih})` })
        } catch (e) {
          catat(id, 'fatal', `generator soal melempar galat pada benih ${benih}: ${e.message}`)
          break
        }
      }
    } else {
      soalJadi.push({ soal: s, asal: 'soal tetap' })
    }
  }
  if (soalJadi.length === 0) catat(id, 'serius', 'tidak ada soal')
  const tipeDipakai = new Set(soalJadi.map((x) => x.soal?.tipe))
  if (tipeDipakai.size < 3) {
    catat(id, 'serius', `hanya ${tipeDipakai.size} tipe soal berbeda (minimal 3): ${[...tipeDipakai].join(', ')}`)
  }
  for (const { soal, asal } of soalJadi) periksaSoal(id, soal, asal)
  totalSoal += soalJadi.length

  /* --- render visual --- */
  let maksElemen = 0
  const paramBongkar = k.bongkar?.params ?? []
  const keadaanBongkar = []
  for (const p of nilaiUji(paramBongkar)) {
    for (let step = 0; step < Math.max(1, langkah.length); step++) {
      for (const t of [0, 0.37, 1]) {
        keadaanBongkar.push({ step, t, p, sorot: null })
      }
    }
  }
  // Uji juga keadaan sorot untuk tiap bagian rumus.
  for (const b of new Set([...bagianRumus, ...Object.keys(k.bongkar?.roles ?? {})])) {
    keadaanBongkar.push({ step: Math.max(0, langkah.length - 1), t: 1, p: {}, sorot: b })
  }
  if (k.bongkar?.Visual) {
    maksElemen = Math.max(maksElemen, periksaRender(id, 'VisualBongkar', k.bongkar.Visual, keadaanBongkar))
  }

  if (k.eksperimen?.Visual) {
    const keadaanEks = nilaiUji(k.eksperimen.params ?? []).map((p) => ({ p, sorot: null }))
    for (const b of new Set(bagianRumus)) keadaanEks.push({ p: {}, sorot: b })
    maksElemen = Math.max(maksElemen, periksaRender(id, 'VisualEksperimen', k.eksperimen.Visual, keadaanEks))
  }

  ringkasan.push({
    id,
    langkah: langkah.length,
    level: level.join('/'),
    soal: soalJadi.length,
    tipe: tipeDipakai.size,
    keadaanDiuji: keadaanBongkar.length,
    maksElemen,
  })
}

await server.close()

/* ---------------- Laporan ---------------- */

console.log('KONSEP'.padEnd(24) + 'LANGKAH  LEVEL      SOAL  TIPE  KEADAAN  MAKS SVG')
for (const r of ringkasan) {
  console.log(
    r.id.padEnd(24) +
      String(r.langkah).padStart(5) +
      '    ' +
      r.level.padEnd(11) +
      String(r.soal).padStart(4) +
      String(r.tipe).padStart(6) +
      String(r.keadaanDiuji).padStart(9) +
      String(r.maksElemen).padStart(10),
  )
}

const urut = { fatal: 0, serius: 1, ringan: 2 }
masalah.sort((a, b) => urut[a.keparahan] - urut[b.keparahan] || a.id.localeCompare(b.id))

const n = (k) => masalah.filter((m) => m.keparahan === k).length
console.log(
  `\nTotal ${ringkasan.length} konsep · ${totalSoal} soal diuji · ` +
    `${n('fatal')} fatal, ${n('serius')} serius, ${n('ringan')} ringan\n`,
)

for (const m of masalah) {
  console.log(`  [${m.keparahan.toUpperCase()}] ${m.id}: ${m.pesan}`)
}

process.exit(n('fatal') > 0 ? 1 : 0)
