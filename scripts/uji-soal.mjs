/**
 * Gerbang kualitas untuk bank soal topik (src/data/soal/kelas-*.ts).
 *
 * Yang diperiksa:
 *  1. Setiap kunci bank adalah id topik yang benar-benar ada di kurikulum,
 *     dan berada di berkas kelas yang tepat.
 *  2. Kelengkapan per topik: paling sedikit 6 butir — minimal 2 mudah,
 *     2 sedang, 1 sulit.
 *  3. Bentuk tiap soal: pertanyaan, 2 petunjuk, pembahasan, alasan tiap
 *     pengecoh, tepat satu pilihan benar, pilihan tidak kembar.
 *  4. Kunci jawaban dinilai ulang memakai penilai yang sama dengan aplikasi.
 *  5. Pembuat soal (fungsi) dijalankan dengan banyak benih: hasilnya harus
 *     selalu sah, dan tidak boleh memunculkan pilihan kembar.
 *  6. Gambar soal dirender, lalu keluarannya dipindai dari NaN / undefined.
 *
 * Jalankan:
 *   node scripts/uji-soal.mjs                    semua berkas yang ada
 *   node scripts/uji-soal.mjs --berkas kelas-3   satu berkas saja
 *   node scripts/uji-soal.mjs --lengkap          topik tanpa soal dianggap salah
 *   node scripts/uji-soal.mjs --berkas kelas-3 --cetak   cetak tiap soal apa adanya
 *                                                (pembuat soal dicetak dengan 3 benih)
 */

import fs from 'node:fs'
import path from 'node:path'
import { createServer } from 'vite'
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'

const AKAR = process.cwd()
const DIR = path.join(AKAR, 'src', 'data', 'soal')

const argumen = process.argv.slice(2)
const LENGKAP = argumen.includes('--lengkap')
const CETAK = argumen.includes('--cetak')
const hanyaBerkas = argumen
  .map((a, i) => (a === '--berkas' ? argumen[i + 1] : null))
  .filter(Boolean)
  .map((b) => b.replace(/\.ts$/, ''))

const BENIH_UJI = 25
const MIN_BUTIR = 6
const MIN_TINGKAT = { mudah: 2, sedang: 2, sulit: 1 }

const masalah = []
const catat = (id, keparahan, pesan) => masalah.push({ id, keparahan, pesan })

/* ---------------- Penilai (cerminan src/components/SoalView.tsx) ---------------- */

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
    case 'pilihan':
      return !!soal.pilihan.find((o) => o.id === nilai)?.benar
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
    case 'cocokkan':
      return soal.pasangan.every((p) => (nilai ?? {})[p.kiri] === p.kanan)
    default:
      return false
  }
}

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

/* ---------------- Pemeriksaan satu soal ---------------- */

const TIPE_SAH = ['pilihan', 'angka', 'benar-salah', 'urutkan', 'cocokkan', 'isian']
const TEKS_RUSAK = /\b(undefined|NaN|Infinity)\b|\[object /

/** Semua teks yang akan dibaca anak pada sebuah soal. */
function semuaTeks(soal) {
  const t = [soal.pertanyaan, soal.pembahasan, ...(soal.hint ?? [])]
  if (soal.tipe === 'pilihan') for (const o of soal.pilihan) t.push(o.label, o.diagnosa ?? '')
  if (soal.tipe === 'benar-salah') t.push(soal.diagnosa ?? '')
  if (soal.tipe === 'isian') t.push(...soal.jawaban)
  if (soal.tipe === 'urutkan') t.push(...soal.langkah)
  if (soal.tipe === 'cocokkan') for (const p of soal.pasangan) t.push(p.kiri, p.kanan)
  return t.map((x) => String(x ?? ''))
}

function periksaGambar(id, tanda, spec, GambarSoal) {
  const terlalu = (pesan) => catat(id, 'serius', `${tanda}: gambar ${spec.jenis} — ${pesan}`)
  switch (spec.jenis) {
    case 'benda': {
      const kelompok = 'kelompok' in spec ? spec.kelompok : [spec]
      if (kelompok.length > 4) terlalu(`${kelompok.length} kelompok, paling banyak 4`)
      for (const k of kelompok) {
        if (!Number.isInteger(k.banyak) || k.banyak < 0 || k.banyak > 40) {
          terlalu(`banyak benda ${k.banyak} (harus bulat, 0–40)`)
        }
        if ((k.coret ?? 0) > k.banyak) terlalu(`coret ${k.coret} melebihi banyak ${k.banyak}`)
      }
      break
    }
    case 'pola':
      if (spec.isi.length < 2 || spec.isi.length > 12) terlalu(`${spec.isi.length} ubin (harus 2–12)`)
      break
    case 'blok':
      if ((spec.ribuan ?? 0) > 5 || (spec.ratusan ?? 0) > 9 || (spec.puluhan ?? 0) > 20 || (spec.satuan ?? 0) > 20) {
        terlalu('terlalu banyak blok (ribuan ≤ 5, ratusan ≤ 9, puluhan ≤ 20, satuan ≤ 20)')
      }
      break
    case 'garis': {
      const n = (spec.sampai - spec.dari) / (spec.langkah ?? 1)
      if (!(spec.sampai > spec.dari)) terlalu('`sampai` harus lebih besar dari `dari`')
      else if (n > 40) terlalu(`${Math.round(n)} tanda, paling banyak 40`)
      for (const v of [...(spec.tanda ?? []), ...(spec.tanya ?? []), ...(spec.lompat ?? []).flat()]) {
        if (v < spec.dari - 1e-9 || v > spec.sampai + 1e-9) terlalu(`nilai ${v} di luar garis`)
      }
      break
    }
    case 'pecahan':
      if (spec.isi.length < 1 || spec.isi.length > 4) terlalu(`${spec.isi.length} pecahan (harus 1–4)`)
      for (const [arsir, bagian] of spec.isi) {
        if (!Number.isInteger(bagian) || bagian < 1 || bagian > 24) terlalu(`banyak bagian ${bagian} (1–24)`)
        if (!Number.isInteger(arsir) || arsir < 0 || arsir > bagian * 4) terlalu(`bagian diarsir ${arsir} tidak wajar`)
      }
      break
    case 'jam':
      if (!(spec.jam >= 0 && spec.jam <= 24) || !(spec.menit >= 0 && spec.menit < 60)) terlalu('jam/menit di luar rentang')
      break
    case 'batang':
    case 'pai':
      if (spec.label.length !== spec.nilai.length) terlalu('banyak label ≠ banyak nilai')
      if (spec.label.length < 2 || spec.label.length > 8) terlalu(`${spec.label.length} data (harus 2–8)`)
      if (spec.nilai.some((v) => !(v >= 0))) terlalu('nilai negatif atau bukan bilangan')
      break
    case 'tabel':
      if (spec.kepala.length > 5) terlalu('lebih dari 5 kolom tidak muat di HP')
      if (spec.baris.length > 8) terlalu('lebih dari 8 baris')
      if (spec.baris.some((b) => b.length !== spec.kepala.length)) terlalu('banyak sel tiap baris ≠ banyak kolom')
      break
    case 'sudut':
      if (!(spec.besar > 0 && spec.besar < 360)) terlalu(`besar sudut ${spec.besar}`)
      break
    case 'grafik':
      if (!(spec.x[1] > spec.x[0]) || !(spec.y[1] > spec.y[0])) terlalu('rentang x/y terbalik')
      break
    case 'pita':
      for (const b of spec.isi) {
        if ((b.mulai ?? 0) + b.panjang > (spec.lebar ?? 12) + 1e-9) terlalu(`pita "${b.label}" keluar dari gambar`)
      }
      if (spec.isi.length > 5) terlalu('lebih dari 5 pita')
      break
    case 'bangun':
    case 'timbangan':
      break
    default:
      catat(id, 'fatal', `${tanda}: jenis gambar tidak dikenal (${spec.jenis})`)
      return
  }
  try {
    const html = renderToStaticMarkup(createElement(GambarSoal, { spec }))
    if (/NaN|undefined|Infinity/.test(html)) {
      catat(id, 'fatal', `${tanda}: gambar ${spec.jenis} menghasilkan NaN/undefined`)
    }
  } catch (e) {
    catat(id, 'fatal', `${tanda}: gambar ${spec.jenis} gagal dirender — ${e.message}`)
  }
}

function periksaSoal(id, tanda, soal, GambarSoal) {
  if (!soal || !TIPE_SAH.includes(soal.tipe)) {
    catat(id, 'fatal', `${tanda}: tipe soal tidak sah (${soal?.tipe})`)
    return
  }
  if (!soal.pertanyaan || !String(soal.pertanyaan).trim()) catat(id, 'fatal', `${tanda}: tidak ada pertanyaan`)
  if (!soal.pembahasan || !String(soal.pembahasan).trim()) catat(id, 'serius', `${tanda}: tidak ada pembahasan`)
  if (!Array.isArray(soal.hint) || soal.hint.length < 2 || soal.hint.some((h) => !String(h ?? '').trim())) {
    catat(id, 'serius', `${tanda}: petunjuk kurang dari 2 atau ada yang kosong`)
  }
  if (!['mudah', 'sedang', 'sulit'].includes(soal.tingkat)) {
    catat(id, 'fatal', `${tanda}: tingkat tidak sah (${soal.tingkat})`)
  }
  if (String(soal.pertanyaan ?? '').length > 340) {
    catat(id, 'ringan', `${tanda}: pertanyaan ${soal.pertanyaan.length} huruf — terlalu panjang untuk anak`)
  }
  for (const teks of semuaTeks(soal)) {
    if (TEKS_RUSAK.test(teks)) {
      catat(id, 'fatal', `${tanda}: teks memuat nilai rusak — "${teks.slice(0, 80)}"`)
      break
    }
  }

  if (soal.tipe === 'pilihan') {
    const benar = soal.pilihan.filter((o) => o.benar)
    if (benar.length !== 1) catat(id, 'fatal', `${tanda}: pilihan benar = ${benar.length}, seharusnya tepat 1`)
    if (soal.pilihan.length < 3 || soal.pilihan.length > 5) {
      catat(id, 'serius', `${tanda}: ${soal.pilihan.length} pilihan (harus 3–5)`)
    }
    for (const o of soal.pilihan) {
      if (!String(o.label ?? '').trim()) catat(id, 'fatal', `${tanda}: ada pilihan kosong`)
      if (!o.benar && !String(o.diagnosa ?? '').trim()) {
        catat(id, 'serius', `${tanda}: pengecoh "${o.label}" tidak punya alasan`)
      }
    }
    const label = soal.pilihan.map((o) => normalTeks(o.label))
    if (new Set(label).size !== label.length) {
      catat(id, 'fatal', `${tanda}: ada pilihan kembar (${soal.pilihan.map((o) => o.label).join(' | ')})`)
    }
    // Dua pilihan yang nilainya sama walau ditulis berbeda, mis. "0,5" dan "1/2".
    const nilai = soal.pilihan.map((o) => parseAngka(o.label))
    for (let i = 0; i < nilai.length; i++) {
      for (let j = i + 1; j < nilai.length; j++) {
        if (nilai[i] !== null && nilai[j] !== null && Math.abs(nilai[i] - nilai[j]) < 1e-12) {
          catat(id, 'serius', `${tanda}: pilihan "${soal.pilihan[i].label}" dan "${soal.pilihan[j].label}" bernilai sama`)
        }
      }
    }
  }

  if (soal.tipe === 'angka') {
    if (!Number.isFinite(soal.jawaban)) {
      catat(id, 'fatal', `${tanda}: jawaban bukan bilangan (${soal.jawaban})`)
    } else {
      const desimal = (String(soal.jawaban).split('.')[1] ?? '').length
      if (desimal > 2 && soal.toleransi === undefined) {
        catat(id, 'serius', `${tanda}: jawaban ${soal.jawaban} berdesimal panjang tanpa toleransi`)
      }
    }
  }
  if (soal.tipe === 'benar-salah' && typeof soal.jawaban !== 'boolean') {
    catat(id, 'fatal', `${tanda}: jawaban benar-salah bukan boolean`)
  }
  if (soal.tipe === 'isian' && (!Array.isArray(soal.jawaban) || soal.jawaban.length === 0)) {
    catat(id, 'fatal', `${tanda}: daftar jawaban kosong`)
  }
  if (soal.tipe === 'urutkan') {
    if (!Array.isArray(soal.langkah) || soal.langkah.length < 3) {
      catat(id, 'serius', `${tanda}: langkah untuk diurutkan kurang dari 3`)
    } else if (new Set(soal.langkah).size !== soal.langkah.length) {
      catat(id, 'fatal', `${tanda}: ada langkah kembar`)
    }
  }
  if (soal.tipe === 'cocokkan') {
    if (!Array.isArray(soal.pasangan) || soal.pasangan.length < 3) {
      catat(id, 'serius', `${tanda}: pasangan kurang dari 3`)
    } else if (new Set(soal.pasangan.map((p) => p.kiri)).size !== soal.pasangan.length) {
      catat(id, 'fatal', `${tanda}: sisi kiri berulang`)
    }
  }

  const kunci = jawabanBenar(soal)
  if (kunci === undefined) catat(id, 'fatal', `${tanda}: tidak ada jawaban benar yang bisa ditentukan`)
  else if (!nilaiJawaban(soal, kunci)) catat(id, 'fatal', `${tanda}: kunci jawaban dinilai SALAH oleh penilai aplikasi`)

  if (soal.gambar) periksaGambar(id, tanda, soal.gambar, GambarSoal)
}

/* ---------------- Cetak soal untuk dibaca pemeriksa ---------------- */

function cetakSoal(soal, awalan) {
  const baris = []
  const gambar = soal.gambar
    ? JSON.stringify(soal.gambar, (_, v) => (typeof v === 'function' ? `[fungsi ${v.toString().slice(0, 60)}]` : v))
    : null
  baris.push(`${awalan} [${soal.tingkat} · ${soal.tipe}] ${soal.pertanyaan}`)
  if (gambar) baris.push(`      gambar: ${gambar}`)
  if (soal.tipe === 'pilihan') {
    for (const o of soal.pilihan) {
      baris.push(`      ${o.benar ? '(BENAR)' : '(salah)'} ${o.label}${o.benar ? '' : `  — ${o.diagnosa ?? ''}`}`)
    }
  } else if (soal.tipe === 'angka') {
    baris.push(`      jawaban: ${soal.jawaban}${soal.satuan ? ` ${soal.satuan}` : ''}${soal.toleransi !== undefined ? ` (toleransi ${soal.toleransi})` : ''}`)
  } else if (soal.tipe === 'benar-salah') {
    baris.push(`      jawaban: ${soal.jawaban ? 'BENAR' : 'SALAH'}${soal.diagnosa ? `  — ${soal.diagnosa}` : ''}`)
  } else if (soal.tipe === 'isian') {
    baris.push(`      jawaban diterima: ${soal.jawaban.join(' | ')}`)
  } else if (soal.tipe === 'urutkan') {
    baris.push(`      urutan benar: ${soal.langkah.join('  →  ')}`)
  } else if (soal.tipe === 'cocokkan') {
    baris.push(`      pasangan: ${soal.pasangan.map((p) => `${p.kiri} ↔ ${p.kanan}`).join(' ; ')}`)
  }
  ;(soal.hint ?? []).forEach((h, i) => baris.push(`      petunjuk ${i + 1}: ${h}`))
  baris.push(`      bahas: ${soal.pembahasan}`)
  console.log(baris.join('\n'))
}

/* ---------------- Jalankan ---------------- */

const server = await createServer({
  configFile: path.join(AKAR, 'vite.config.ts'),
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
  logLevel: 'error',
})

let totalSoal = 0
let totalTopik = 0
const ringkasan = []

try {
  const { TOPIK } = await server.ssrLoadModule('/src/data/kurikulum.ts')
  const { seededRandom } = await server.ssrLoadModule('/src/lib/num.ts')
  const { GambarSoal } = await server.ssrLoadModule('/src/components/GambarSoal.tsx')
  const petaTopik = new Map(TOPIK.map((t) => [t.id, t]))

  const semuaBerkas = fs.existsSync(DIR)
    ? fs.readdirSync(DIR).filter((f) => /^kelas-\d+(-\w+)?\.ts$/.test(f)).sort()
    : []
  const berkas = hanyaBerkas.length
    ? semuaBerkas.filter((f) => hanyaBerkas.includes(f.replace(/\.ts$/, '')))
    : semuaBerkas
  for (const b of hanyaBerkas) {
    if (!semuaBerkas.includes(`${b}.ts`)) catat(b, 'fatal', `berkas src/data/soal/${b}.ts tidak ditemukan`)
  }

  const sudahAda = new Map()

  for (const f of berkas) {
    const nama = f.replace(/\.ts$/, '')
    const kelas = Number(/^kelas-(\d+)/.exec(f)[1])
    let bank
    try {
      bank = (await server.ssrLoadModule(`/src/data/soal/${f}`)).default
    } catch (e) {
      catat(nama, 'fatal', `gagal dimuat: ${e.message}`)
      continue
    }
    if (!bank || typeof bank !== 'object') {
      catat(nama, 'fatal', 'default export bukan objek bank soal')
      continue
    }

    let soalBerkas = 0
    for (const [topicId, butir] of Object.entries(bank)) {
      const topik = petaTopik.get(topicId)
      const id = `${nama}/${topicId}`
      if (!topik) {
        catat(id, 'fatal', 'id topik tidak ada di kurikulum')
        continue
      }
      if (topik.kelas !== kelas) {
        catat(id, 'fatal', `topik ini kelas ${topik.kelas}, tetapi ditulis di berkas kelas ${kelas}`)
      }
      if (sudahAda.has(topicId)) catat(id, 'fatal', `topik sudah punya bank di ${sudahAda.get(topicId)}`)
      sudahAda.set(topicId, nama)
      totalTopik++

      if (!Array.isArray(butir) || butir.length < MIN_BUTIR) {
        catat(id, 'serius', `hanya ${butir?.length ?? 0} butir, paling sedikit ${MIN_BUTIR}`)
      }
      if (CETAK) {
        console.log(`\n=== ${topicId} — ${topik.judul} (kelas ${topik.kelas}) ===`)
        ;(Array.isArray(butir) ? butir : []).forEach((b, i) => {
          try {
            if (typeof b === 'function') {
              for (const benih of [12345, 987654321, 5551212]) cetakSoal(b(seededRandom(benih)), `  ${i + 1}. (fungsi, benih ${benih})`)
            } else cetakSoal(b, `  ${i + 1}.`)
          } catch (e) {
            console.log(`  ${i + 1}. GAGAL DICETAK: ${e.message}`)
          }
        })
      }
      const hitung = { mudah: 0, sedang: 0, sulit: 0 }
      const tanyaTetap = new Map()
      let benarSalah = 0

      ;(Array.isArray(butir) ? butir : []).forEach((b, i) => {
        const tanda = `butir ${i + 1}`
        if (typeof b === 'function') {
          const rupa = new Set()
          let tingkat = null
          for (let benih = 1; benih <= BENIH_UJI; benih++) {
            let soal
            try {
              soal = b(seededRandom(benih * 7919))
            } catch (e) {
              catat(id, 'fatal', `${tanda} (benih ${benih}): pembuat soal melempar galat — ${e.message}`)
              break
            }
            periksaSoal(id, `${tanda} (benih ${benih})`, soal, GambarSoal)
            if (soal?.tingkat) {
              if (tingkat && tingkat !== soal.tingkat) {
                catat(id, 'serius', `${tanda}: tingkat berubah-ubah antar benih`)
              }
              tingkat = soal.tingkat
            }
            // Ragam dinilai dari pertanyaan, gambar, dan isi jawaban benarnya.
            const kunciRagam =
              soal?.tipe === 'pilihan' ? soal.pilihan.find((o) => o.benar)?.label : jawabanBenar(soal ?? {})
            rupa.add(JSON.stringify([soal?.pertanyaan, soal?.gambar ?? null, kunciRagam]))
            totalSoal++
            soalBerkas++
          }
          if (rupa.size < 3) {
            catat(id, 'serius', `${tanda}: pembuat soal hanya menghasilkan ${rupa.size} ragam dari ${BENIH_UJI} benih`)
          }
          if (tingkat) hitung[tingkat]++
        } else {
          periksaSoal(id, tanda, b, GambarSoal)
          if (b?.tingkat in hitung) hitung[b.tingkat]++
          if (b?.tipe === 'benar-salah') benarSalah++
          const kunciTanya = normalTeks(b?.pertanyaan ?? '') + JSON.stringify(b?.gambar ?? null)
          if (tanyaTetap.has(kunciTanya)) {
            catat(id, 'serius', `${tanda}: pertanyaannya sama persis dengan butir ${tanyaTetap.get(kunciTanya)}`)
          }
          tanyaTetap.set(kunciTanya, i + 1)
          totalSoal++
          soalBerkas++
        }
      })

      for (const [t, min] of Object.entries(MIN_TINGKAT)) {
        if (hitung[t] < min) catat(id, 'serius', `soal ${t} hanya ${hitung[t]}, paling sedikit ${min}`)
      }
      if (benarSalah > 2) catat(id, 'ringan', `${benarSalah} soal benar-salah — paling banyak 2 per topik`)
    }
    ringkasan.push(`${nama}: ${Object.keys(bank).length} topik, ${soalBerkas} soal diuji`)
  }

  // Cakupan terhadap kurikulum.
  if (!hanyaBerkas.length) {
    const perKelas = new Map()
    for (const t of TOPIK) {
      const k = perKelas.get(t.kelas) ?? { ada: 0, total: 0, kurang: [] }
      k.total++
      if (sudahAda.has(t.id)) k.ada++
      else k.kurang.push(t.id)
      perKelas.set(t.kelas, k)
    }
    console.log('\nCakupan bank soal:')
    for (const [kelas, k] of [...perKelas].sort((a, b) => a[0] - b[0])) {
      console.log(`  kelas ${String(kelas).padStart(2)}: ${k.ada}/${k.total} topik`)
      if (LENGKAP) for (const id of k.kurang) catat(`kelas-${kelas}/${id}`, 'serius', 'topik belum punya bank soal')
    }
  }
} finally {
  await server.close()
}

const urut = { fatal: 0, serius: 1, ringan: 2 }
masalah.sort((a, b) => urut[a.keparahan] - urut[b.keparahan] || a.id.localeCompare(b.id))
const n = (k) => masalah.filter((m) => m.keparahan === k).length

console.log('')
for (const r of ringkasan) console.log(`  ${r}`)
console.log(
  `\nTotal ${totalTopik} topik · ${totalSoal} soal diuji · ` +
    `${n('fatal')} fatal, ${n('serius')} serius, ${n('ringan')} ringan`,
)
for (const m of masalah) console.log(`  [${m.keparahan.toUpperCase()}] ${m.id}: ${m.pesan}`)

process.exit(n('fatal') > 0 || n('serius') > 0 ? 1 : 0)
