/* ============================================================
   Visual MTK — Pita gulir
   Daftar mendatar yang tidak menyembunyikan isinya. Kalau masih
   ada yang belum terlihat, tepinya memudar dan muncul tombol
   panah besar — anak tidak perlu menebak bahwa daftarnya bisa
   digeser. Butir yang sedang aktif selalu digulirkan ke tengah.
   ============================================================ */

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { Ikon } from './Ikon'

export function PitaGulir({
  children,
  label,
  className = '',
  /** berubah saat butir aktif berganti; butir ber-`data-aktif="true"` digulirkan ke tengah. */
  aktif,
}: {
  children: ReactNode
  label: string
  className?: string
  aktif?: string | number
}) {
  const rel = useRef<HTMLDivElement>(null)
  const [tepi, setTepi] = useState({ kiri: false, kanan: false })
  // Ajakan "geser" hanya sampai anak pertama kali menggulir.
  const [ajak, setAjak] = useState(true)

  const ukur = useCallback(() => {
    const el = rel.current
    if (!el) return
    const kiri = el.scrollLeft > 4
    const kanan = el.scrollLeft + el.clientWidth < el.scrollWidth - 4
    setTepi((t) => (t.kiri === kiri && t.kanan === kanan ? t : { kiri, kanan }))
  }, [])

  useEffect(() => {
    const el = rel.current
    if (!el) return
    ukur()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(ukur)
    ro.observe(el)
    for (const anak of Array.from(el.children)) ro.observe(anak)
    return () => ro.disconnect()
  }, [ukur, children])

  useEffect(() => {
    const el = rel.current
    const butir = el?.querySelector<HTMLElement>('[data-aktif="true"]')
    if (!el || !butir) return
    const tujuan = butir.offsetLeft - (el.clientWidth - butir.offsetWidth) / 2
    el.scrollTo({ left: Math.max(0, tujuan), behavior: 'smooth' })
  }, [aktif])

  const geser = (arah: -1 | 1) => {
    const el = rel.current
    if (!el) return
    setAjak(false)
    el.scrollBy({ left: arah * Math.max(160, el.clientWidth * 0.8), behavior: 'smooth' })
  }

  return (
    <div
      className={`pita ${className}`}
      data-kiri={tepi.kiri}
      data-kanan={tepi.kanan}
      data-ajak={ajak && tepi.kanan && !tepi.kiri}
    >
      <button
        type="button"
        className="pita-panah"
        data-sisi="kiri"
        hidden={!tepi.kiri}
        onClick={() => geser(-1)}
        aria-label={`Geser ${label} ke kiri`}
      >
        <Ikon nama="prev" ukuran="1.2em" tebal={2.6} />
      </button>
      <div
        ref={rel}
        className="pita-rel"
        role="group"
        aria-label={label}
        onScroll={() => {
          ukur()
          if (ajak && (rel.current?.scrollLeft ?? 0) > 24) setAjak(false)
        }}
      >
        {children}
      </div>
      <button
        type="button"
        className="pita-panah"
        data-sisi="kanan"
        hidden={!tepi.kanan}
        onClick={() => geser(1)}
        aria-label={`Geser ${label} ke kanan`}
      >
        <Ikon nama="next" ukuran="1.2em" tebal={2.6} />
      </button>
    </div>
  )
}
