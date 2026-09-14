/* ============================================================
   Visual MTK — Primitif animasi
   Tanpa pustaka animasi. Semua bertumpu pada requestAnimationFrame
   dan menghormati prefers-reduced-motion.
   ============================================================ */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { clamp } from './num'

/* ---------------- Easing ---------------- */
export const easing = {
  linear: (t: number) => t,
  outQuad: (t: number) => 1 - (1 - t) * (1 - t),
  inOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2),
  outCubic: (t: number) => 1 - (1 - t) ** 3,
  inOutCubic: (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2),
  outQuint: (t: number) => 1 - (1 - t) ** 5,
  outBack: (t: number) => 1 + 2.7 * (t - 1) ** 3 + 1.7 * (t - 1) ** 2,
  outElastic: (t: number) =>
    t === 0 || t === 1 ? t : 2 ** (-9 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1,
}

/* ---------------- Preferensi gerak ---------------- */

export function useReducedMotion(): boolean {
  const [kurangi, setKurangi] = useState(
    () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    if (typeof matchMedia !== 'function') return
    const mq = matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setKurangi(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return kurangi
}

/* ---------------- Loop rAF ---------------- */

/**
 * Jalankan `cb(dtDetik, totalDetik)` setiap frame selama `aktif`.
 * Callback disimpan di ref sehingga tidak memulai ulang loop tiap render.
 */
export function useRaf(cb: (dt: number, total: number) => void, aktif = true) {
  const ref = useRef(cb)
  useLayoutEffect(() => {
    ref.current = cb
  })
  useEffect(() => {
    if (!aktif) return
    let id = 0
    let last = performance.now()
    let total = 0
    const tick = (now: number) => {
      // Batasi lompatan waktu saat tab kembali aktif.
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      total += dt
      ref.current(dt, total)
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [aktif])
}

/* ---------------- Tween nilai ---------------- */

/**
 * Nilai yang mengejar `target` secara halus.
 * Saat pengguna meminta gerak berkurang, nilai langsung sama dengan target.
 */
export function useTween(
  target: number,
  opsi: { durasi?: number; ease?: (t: number) => number } = {},
): number {
  const { durasi = 380, ease = easing.outCubic } = opsi
  const kurangi = useReducedMotion()
  const [nilai, setNilai] = useState(target)
  const dari = useRef(target)
  const mulai = useRef(0)
  const aktif = useRef(false)

  useEffect(() => {
    if (kurangi || durasi <= 0) {
      setNilai(target)
      return
    }
    dari.current = nilai
    mulai.current = performance.now()
    aktif.current = true
    let id = 0
    const tick = (now: number) => {
      const t = clamp((now - mulai.current) / durasi, 0, 1)
      const v = dari.current + (target - dari.current) * ease(t)
      setNilai(v)
      if (t < 1) id = requestAnimationFrame(tick)
      else aktif.current = false
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
    // Sengaja hanya bergantung pada target: nilai awal diambil dari ref.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, durasi, kurangi])

  return nilai
}

/** Angka yang berjalan naik/turun untuk label — versi terbulat. */
export function useCountUp(target: number, desimal = 0, durasi = 600) {
  const v = useTween(target, { durasi })
  const f = 10 ** desimal
  return Math.round(v * f) / f
}

/* ---------------- Garis waktu bertahap ---------------- */

export interface TimelineOpts {
  /** durasi tiap langkah dalam ms. */
  durasi: number[]
  /** langkah awal. */
  awal?: number
  /** otomatis lanjut ke langkah berikutnya saat satu langkah selesai. */
  otomatis?: boolean
}

export interface Timeline {
  step: number
  /** kemajuan langkah aktif 0..1 (sudah dilembutkan). */
  t: number
  main: boolean
  play: () => void
  pause: () => void
  toggle: () => void
  ke: (step: number, langsungSelesai?: boolean) => void
  /** lompat ke sebuah langkah lalu langsung memutarnya dari awal. */
  mainDari: (step: number) => void
  maju: () => void
  mundur: () => void
  ulang: () => void
  selesai: boolean
  jumlah: number
}

/**
 * Mesin langkah untuk fitur "Bongkar Rumus".
 * Setiap langkah punya durasi; `t` berjalan 0 -> 1 di dalam langkah.
 * Pengguna bisa maju/mundur manual; saat itu langkah langsung penuh (t = 1).
 */
export function useTimeline({ durasi, awal = 0, otomatis = true }: TimelineOpts): Timeline {
  const kurangi = useReducedMotion()
  const [step, setStep] = useState(awal)
  const [t, setT] = useState(kurangi ? 1 : 0)
  const [main, setMain] = useState(false)
  const jumlah = durasi.length
  const waktu = useRef(0)
  const stepRef = useRef(step)
  stepRef.current = step

  useRaf(
    (dt) => {
      const d = (kurangi ? 60 : durasi[stepRef.current] ?? 600) / 1000
      waktu.current += dt
      const nt = clamp(waktu.current / d, 0, 1)
      setT(nt)
      if (nt >= 1) {
        if (otomatis && stepRef.current < jumlah - 1) {
          waktu.current = 0
          setStep((s) => s + 1)
        } else {
          setMain(false)
        }
      }
    },
    main,
  )

  const ke = useCallback(
    (s: number, langsungSelesai = true) => {
      const ns = clamp(s, 0, jumlah - 1)
      waktu.current = langsungSelesai ? (durasi[ns] ?? 600) / 1000 : 0
      setStep(ns)
      setT(langsungSelesai ? 1 : 0)
      setMain(false)
    },
    [jumlah, durasi],
  )

  const play = useCallback(() => {
    // Bila sudah di akhir, mulai lagi dari awal.
    if (stepRef.current >= jumlah - 1 && waktu.current > 0) {
      waktu.current = 0
      setStep(0)
      setT(0)
    } else if (t >= 1) {
      waktu.current = 0
      setT(0)
    }
    setMain(true)
  }, [jumlah, t])

  const pause = useCallback(() => setMain(false), [])

  const mainDari = useCallback(
    (s: number) => {
      const ns = clamp(s, 0, jumlah - 1)
      waktu.current = 0
      setStep(ns)
      setT(0)
      // Dengan gerak berkurang, tidak ada yang perlu diputar — tampilkan
      // langsung keadaan akhir langkah itu.
      setMain(!kurangi)
    },
    [jumlah, kurangi],
  )

  return {
    step,
    t: kurangi ? 1 : t,
    main,
    play,
    pause,
    toggle: () => (main ? setMain(false) : play()),
    ke,
    mainDari,
    maju: () => ke(step + 1),
    mundur: () => ke(step - 1),
    ulang: () => {
      waktu.current = 0
      setStep(0)
      setT(0)
      setMain(true)
    },
    selesai: step >= jumlah - 1 && t >= 1,
    jumlah,
  }
}

/* ---------------- Bantuan pemetaan langkah ---------------- */

/**
 * Ambil kemajuan sebuah langkah tertentu dari keadaan garis waktu.
 * Langkah yang sudah lewat -> 1, langkah yang belum -> 0.
 * Memudahkan komponen visual menggambar keadaan gabungan.
 */
export function fase(step: number, t: number, target: number): number {
  if (step > target) return 1
  if (step < target) return 0
  return t
}

/** Bagian dari `t` di antara [a,b], dinormalkan ke 0..1. */
export function seg(t: number, a: number, b: number, ease = easing.inOutCubic) {
  if (b <= a) return t >= b ? 1 : 0
  return ease(clamp((t - a) / (b - a), 0, 1))
}

/* ---------------- Ukuran elemen ---------------- */

/** Lebar elemen yang diamati, untuk visual yang perlu tahu ruang nyata. */
export function useLebar<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [lebar, setLebar] = useState(0)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setLebar(e.contentRect.width))
    ro.observe(el)
    setLebar(el.getBoundingClientRect().width)
    return () => ro.disconnect()
  }, [])
  return [ref, lebar] as const
}

/** true bila lebar layar di bawah ambang (dipakai untuk menyederhanakan visual). */
export function useMediaQuery(query: string) {
  const [cocok, setCocok] = useState(
    () => typeof matchMedia === 'function' && matchMedia(query).matches,
  )
  useEffect(() => {
    if (typeof matchMedia !== 'function') return
    const mq = matchMedia(query)
    const on = () => setCocok(mq.matches)
    mq.addEventListener('change', on)
    setCocok(mq.matches)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return cocok
}

export const useMobile = () => useMediaQuery('(max-width: 640px)')
