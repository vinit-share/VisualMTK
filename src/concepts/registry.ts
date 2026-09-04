/* ============================================================
   Visual MTK — Pendaftaran modul konsep
   Setiap konsep tinggal ditaruh sebagai berkas di folder ini
   dengan nama <id>.tsx dan default export bertipe Konsep.
   Vite yang menemukannya; tidak ada daftar pusat yang harus
   disunting (dan tidak ada bentrokan saat banyak konsep ditulis
   berbarengan). Modul dimuat hanya ketika dibuka.
   ============================================================ */

import type { Konsep } from '../lib/types'

const modul = import.meta.glob<{ default: Konsep }>('./*.tsx')

export const idKonsepTersedia = Object.keys(modul).map((k) =>
  k.replace(/^\.\//, '').replace(/\.tsx$/, ''),
)

export function adaKonsep(id: string) {
  return `./${id}.tsx` in modul
}

export async function muatKonsep(id: string): Promise<Konsep | null> {
  const f = modul[`./${id}.tsx`]
  if (!f) return null
  try {
    const m = await f()
    return m.default ?? null
  } catch (e) {
    console.error(`Gagal memuat konsep "${id}"`, e)
    return null
  }
}
