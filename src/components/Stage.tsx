/* ============================================================
   Visual MTK — Panggung visualisasi
   Bingkai standar untuk semua gambar interaktif: rasio terjaga,
   nyaman di layar kecil, punya keterangan yang dibaca pembaca layar.
   ============================================================ */

import type { ReactNode, SVGProps } from 'react'

export function Stage({
  children,
  keterangan,
  polos = false,
  className = '',
}: {
  children: ReactNode
  /** kalimat yang menjelaskan apa yang sedang terlihat. */
  keterangan?: ReactNode
  polos?: boolean
  className?: string
}) {
  return (
    <figure className={`stage ${polos ? 'stage-plain' : ''} ${className}`}>
      {children}
      {keterangan && (
        <figcaption className="stage-caption" aria-live="polite">
          {keterangan}
        </figcaption>
      )}
    </figure>
  )
}

export interface SvgProps extends Omit<SVGProps<SVGSVGElement>, 'viewBox' | 'width' | 'height'> {
  /** lebar sistem koordinat internal. */
  w: number
  /** tinggi sistem koordinat internal. */
  h: number
  /** batas tinggi tampilan agar tidak terlalu tinggi di layar lebar. */
  maxH?: number
  label?: string
  children: ReactNode
}

/**
 * SVG responsif: menggambar dalam koordinat tetap (w x h) lalu
 * diskalakan oleh CSS. Semua visualisasi memakai ini supaya
 * ukuran garis dan huruf konsisten di seluruh aplikasi.
 */
export function Svg({ w, h, maxH, label, children, style, ...rest }: SvgProps) {
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid meet"
      role={label ? 'img' : 'presentation'}
      aria-label={label}
      style={{ maxHeight: maxH ? `${maxH}px` : undefined, ...style }}
      {...rest}
    >
      {children}
    </svg>
  )
}

/** Label teks pada gambar dengan latar agar tetap terbaca di atas warna apa pun. */
export function Tag({
  x,
  y,
  children,
  warna = 'var(--ink)',
  latar = 'var(--surface)',
  size = 14,
  anchor = 'middle',
  tebal = 800,
  padX = 7,
  opacity = 1,
}: {
  x: number
  y: number
  children: string
  warna?: string
  latar?: string | null
  size?: number
  anchor?: 'start' | 'middle' | 'end'
  tebal?: number
  padX?: number
  opacity?: number
}) {
  const lebar = children.length * size * 0.58 + padX * 2
  const rx = anchor === 'middle' ? x - lebar / 2 : anchor === 'end' ? x - lebar : x
  return (
    <g opacity={opacity} style={{ pointerEvents: 'none' }}>
      {latar && (
        <rect
          x={rx}
          y={y - size * 0.82}
          width={lebar}
          height={size * 1.5}
          rx={size * 0.6}
          fill={latar}
          opacity={0.92}
        />
      )}
      <text
        x={x}
        y={y}
        textAnchor={anchor}
        dominantBaseline="middle"
        fontSize={size}
        fontWeight={tebal}
        fill={warna}
      >
        {children}
      </text>
    </g>
  )
}

/** Panah berukur untuk menandai panjang sisi. */
export function Dimensi({
  x1,
  y1,
  x2,
  y2,
  label,
  warna = 'var(--m-axis)',
  offset = 0,
  size = 13,
  opacity = 1,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  label?: string
  warna?: string
  /** geser garis tegak lurus dari segmen aslinya. */
  offset?: number
  size?: number
  opacity?: number
}) {
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1
  const nx = (-dy / len) * offset
  const ny = (dx / len) * offset
  const ax = x1 + nx
  const ay = y1 + ny
  const bx = x2 + nx
  const by = y2 + ny
  const tick = 5
  const tx = (-dy / len) * tick
  const ty = (dx / len) * tick
  const mx = (ax + bx) / 2
  const my = (ay + by) / 2
  const tegak = Math.abs(dx) < Math.abs(dy)
  return (
    <g opacity={opacity} style={{ pointerEvents: 'none' }}>
      <line x1={ax} y1={ay} x2={bx} y2={by} stroke={warna} strokeWidth={1.6} />
      <line x1={ax - tx} y1={ay - ty} x2={ax + tx} y2={ay + ty} stroke={warna} strokeWidth={1.6} />
      <line x1={bx - tx} y1={by - ty} x2={bx + tx} y2={by + ty} stroke={warna} strokeWidth={1.6} />
      {label && (
        <Tag
          x={mx + (tegak ? -size * 1.2 : 0)}
          y={my + (tegak ? 0 : -size * 0.9)}
          size={size}
          warna={warna}
        >
          {label}
        </Tag>
      )}
    </g>
  )
}

/** Tanda sudut siku-siku. */
export function SikuSiku({
  x,
  y,
  ux,
  uy,
  vx,
  vy,
  s = 14,
  warna = 'var(--m-axis)',
  opacity = 1,
}: {
  x: number
  y: number
  /** arah sisi pertama (satuan). */
  ux: number
  uy: number
  /** arah sisi kedua (satuan). */
  vx: number
  vy: number
  s?: number
  warna?: string
  opacity?: number
}) {
  const p = `${x + ux * s},${y + uy * s} ${x + ux * s + vx * s},${y + uy * s + vy * s} ${
    x + vx * s
  },${y + vy * s}`
  return (
    <polyline
      points={p}
      fill="none"
      stroke={warna}
      strokeWidth={1.6}
      opacity={opacity}
      style={{ pointerEvents: 'none' }}
    />
  )
}
