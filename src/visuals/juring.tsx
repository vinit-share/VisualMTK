/* ============================================================
   Visual bersama — Lingkaran yang dipotong menjadi juring
   Dipakai di beranda dan di konsep "luas lingkaran".
   Setiap juring berpindah dari posisinya di lingkaran menuju
   susunan berselang-seling yang makin mirip persegi panjang.
   ============================================================ */

import { clamp } from '../lib/num'

/** Jalur satu juring: puncak di titik asal, melengkung ke bawah. */
export function jalurJuring(r: number, rentang: number, langkah = 10): string {
  const p: string[] = [`M 0 0`]
  for (let i = 0; i <= langkah; i++) {
    const a = -rentang / 2 + (rentang * i) / langkah
    p.push(`${i === 0 ? 'L' : 'L'} ${(r * Math.sin(a)).toFixed(2)} ${(r * Math.cos(a)).toFixed(2)}`)
  }
  p.push('Z')
  return p.join(' ')
}

export interface JuringProps {
  /** banyaknya potongan. */
  n: number
  /** 0 = masih lingkaran utuh, 1 = tersusun jadi "persegi panjang". */
  t: number
  /** jari-jari dalam satuan gambar. */
  r: number
  /** pusat lingkaran saat t = 0. */
  cx: number
  cy: number
  /** sudut kiri-atas susunan saat t = 1. */
  rx: number
  ry: number
  warnaA?: string
  warnaB?: string
  opacity?: number
}

/**
 * Menggambar n juring pada keadaan antara lingkaran dan susunan.
 * Lebar susunan = setengah keliling = pi*r, tingginya = r.
 * Itulah yang membuat pi*r * r muncul di akhir.
 */
export function Juring({
  n,
  t,
  r,
  cx,
  cy,
  rx,
  ry,
  warnaA = 'var(--m-a)',
  warnaB = 'var(--m-b)',
  opacity = 1,
}: JuringProps) {
  const rentang = (2 * Math.PI) / n
  const d = (r * rentang) / 2 // jarak antar puncak pada susunan
  const jalur = jalurJuring(r, rentang)
  const s = clamp(t, 0, 1)

  const potongan = []
  for (let i = 0; i < n; i++) {
    // Keadaan lingkaran: puncak di pusat, diputar ke arah juring ke-i.
    const phi = i * rentang + rentang / 2 // arah tengah juring (radian, y ke bawah)
    const sudutLingkaran = 90 - (phi * 180) / Math.PI

    // Keadaan susunan: berselang-seling menghadap bawah dan atas.
    const genap = i % 2 === 0
    const sudutSusun = genap ? 0 : 180
    // Ambil putaran setara yang paling dekat agar tidak berputar jauh.
    let mulai = sudutLingkaran
    while (mulai - sudutSusun > 180) mulai -= 360
    while (sudutSusun - mulai > 180) mulai += 360

    const x0 = cx
    const y0 = cy
    const x1 = rx + i * d
    const y1 = genap ? ry : ry + r

    const x = x0 + (x1 - x0) * s
    const y = y0 + (y1 - y0) * s
    const a = mulai + (sudutSusun - mulai) * s

    potongan.push(
      <path
        key={i}
        d={jalur}
        transform={`translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${a.toFixed(2)})`}
        fill={genap ? warnaA : warnaB}
        fillOpacity={0.72}
        stroke="var(--surface)"
        strokeWidth={n > 40 ? 0.4 : 1}
        strokeLinejoin="round"
      />,
    )
  }
  return <g opacity={opacity}>{potongan}</g>
}

/** Lebar susunan (= setengah keliling) dan tingginya (= jari-jari). */
export const ukuranSusunan = (r: number) => ({ lebar: Math.PI * r, tinggi: r })
