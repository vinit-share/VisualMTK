/**
 * Menghasilkan src/data/katalog.generated.ts dari modul konsep itu sendiri.
 *
 * Sebelumnya judul, pertanyaan, dan tagline ditulis dua kali — sekali di modul
 * konsep dan sekali di katalog — sehingga keduanya gampang melenceng setelah
 * teksnya disunting. Sekarang modul konsep menjadi satu-satunya sumber
 * kebenaran, dan katalog dibangun darinya.
 *
 * Jalankan: node scripts/bangun-katalog.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { createServer } from 'vite'

const AKAR = process.cwd()
const DIR = path.join(AKAR, 'src', 'concepts')
const KELUARAN = 'src/data/katalog.generated.ts'

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

const meta = []
for (const f of berkas) {
  const id = f.replace(/\.tsx$/, '')
  let mod
  try {
    mod = await server.ssrLoadModule(`/src/concepts/${f}`)
  } catch (e) {
    console.error(`Gagal memuat ${f}: ${e.message}`)
    process.exitCode = 1
    continue
  }
  const k = mod.default
  if (!k) {
    console.error(`${f}: tidak ada default export`)
    process.exitCode = 1
    continue
  }
  if (k.id !== id) {
    console.error(`${f}: id "${k.id}" tidak sama dengan nama berkas`)
    process.exitCode = 1
  }
  meta.push({
    id: k.id,
    judul: k.judul,
    pertanyaan: k.pertanyaan,
    tagline: k.tagline,
    domain: k.domain,
    kelas: k.kelas,
    tags: k.tags ?? [],
    eksperimen: !!k.eksperimen,
  })
}

await server.close()

meta.sort((a, b) => a.kelas - b.kelas || a.judul.localeCompare(b.judul))

const isi = `/* ============================================================
   Visual MTK — Metadata konsep (DIHASILKAN OTOMATIS)

   Jangan sunting berkas ini dengan tangan. Sumbernya adalah modul
   konsep di src/concepts/ — di situlah teksnya diubah.
   Bangun ulang: npm run bangun:katalog
   ============================================================ */

import type { Domain } from '../lib/types'

export interface KonsepMetaDasar {
  id: string
  judul: string
  pertanyaan: string
  tagline: string
  domain: Domain
  /** kelas menurut modulnya; ditimpa oleh peta kurikulum bila tertaut. */
  kelas: number
  tags: string[]
  eksperimen: boolean
}

export const KONSEP_META: KonsepMetaDasar[] = ${JSON.stringify(meta, null, 2)}
`

fs.writeFileSync(KELUARAN, isi)
console.log(`Ditulis: ${KELUARAN} (${meta.length} konsep)`)
