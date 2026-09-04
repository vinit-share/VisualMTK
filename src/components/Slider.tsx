/* ============================================================
   Visual MTK — Penggeser parameter
   Satu-satunya cara mengubah angka pada eksperimen, supaya
   pengalaman "geser lalu lihat" terasa sama di seluruh aplikasi.
   ============================================================ */

import { useId } from 'react'
import { fmt } from '../lib/num'
import type { ParamSpec } from '../lib/types'

export function Slider({
  label,
  nilai,
  min,
  max,
  step,
  onChange,
  satuan,
  bulat,
  tampilNilai,
  warna,
}: {
  label: string
  nilai: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  satuan?: string
  bulat?: boolean
  /** ganti tampilan angka, mis. untuk menampilkan pecahan. */
  tampilNilai?: (v: number) => string
  warna?: string
}) {
  const id = useId()
  const isi = max === min ? 0 : ((nilai - min) / (max - min)) * 100
  const teks = tampilNilai ? tampilNilai(nilai) : fmt(nilai, bulat ? 0 : undefined)
  return (
    <div className="slider" style={warna ? { ['--sl' as string]: warna } : undefined}>
      <div className="slider-head">
        <label htmlFor={id}>{label}</label>
        <span className="slider-value">
          {teks}
          {satuan ? <span className="slider-unit"> {satuan}</span> : null}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={nilai}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ['--fill' as string]: `${isi}%` }}
      />
    </div>
  )
}

/** Sekelompok penggeser dari daftar ParamSpec. */
export function Params({
  specs,
  nilai,
  set,
}: {
  specs: ParamSpec[]
  nilai: Record<string, number>
  set: (key: string, v: number) => void
}) {
  return (
    <div className="params">
      {specs.map((s) => (
        <Slider
          key={s.key}
          label={s.label}
          nilai={nilai[s.key] ?? s.awal}
          min={s.min}
          max={s.max}
          step={s.step}
          satuan={s.satuan}
          bulat={s.bulat}
          onChange={(v) => set(s.key, v)}
        />
      ))}
    </div>
  )
}

/** Nilai awal dari daftar spesifikasi parameter. */
export const paramAwal = (specs: ParamSpec[] = []): Record<string, number> =>
  Object.fromEntries(specs.map((s) => [s.key, s.awal]))
