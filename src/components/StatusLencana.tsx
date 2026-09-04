/* ============================================================
   Visual MTK — Penanda status penguasaan
   Empat keadaan, dibedakan bentuk DAN warna (tidak hanya warna),
   supaya tetap terbaca bagi yang kesulitan membedakan warna.
   ============================================================ */

import { LABEL_STATUS } from '../lib/store'
import type { Status } from '../lib/types'
import { Ikon } from './Ikon'

const IKON: Record<Status, 'kunci' | 'lampu' | 'cek' | 'bintang'> = {
  none: 'kunci',
  learning: 'lampu',
  understood: 'cek',
  mastered: 'bintang',
}

export function StatusLencana({ status, kecil }: { status: Status; kecil?: boolean }) {
  return (
    <span className={`status-lencana ${kecil ? 'is-kecil' : ''}`} data-status={status}>
      <Ikon nama={IKON[status]} ukuran={kecil ? '0.95em' : '1.05em'} />
      {!kecil && <span>{LABEL_STATUS[status]}</span>}
    </span>
  )
}

/** Cincin kemajuan kecil, 0..1. */
export function Cincin({
  nilai,
  ukuran = 44,
  tebal = 5,
  label,
}: {
  nilai: number
  ukuran?: number
  tebal?: number
  label?: string
}) {
  const r = (ukuran - tebal) / 2
  const k = 2 * Math.PI * r
  const isi = Math.max(0, Math.min(1, nilai))
  return (
    <svg
      width={ukuran}
      height={ukuran}
      viewBox={`0 0 ${ukuran} ${ukuran}`}
      className="cincin"
      role="img"
      aria-label={label ?? `${Math.round(isi * 100)} persen`}
    >
      <circle
        cx={ukuran / 2}
        cy={ukuran / 2}
        r={r}
        fill="none"
        stroke="var(--surface-3)"
        strokeWidth={tebal}
      />
      <circle
        cx={ukuran / 2}
        cy={ukuran / 2}
        r={r}
        fill="none"
        stroke="var(--brand)"
        strokeWidth={tebal}
        strokeLinecap="round"
        strokeDasharray={`${k * isi} ${k}`}
        transform={`rotate(-90 ${ukuran / 2} ${ukuran / 2})`}
        style={{ transition: 'stroke-dasharray var(--d-4) var(--ease-out)' }}
      />
      <text
        x={ukuran / 2}
        y={ukuran / 2 + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={ukuran * 0.3}
        fontWeight={800}
        fill="var(--ink)"
      >
        {Math.round(isi * 100)}
      </text>
    </svg>
  )
}
