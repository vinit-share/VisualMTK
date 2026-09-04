/* ============================================================
   Visual MTK — Panggung eksperimen
   Anak menggeser, aplikasi menggambar ulang seketika, dan
   "temuan" di bawahnya ikut berubah. Tujuannya bukan membaca
   kesimpulan, tapi menemukannya sendiri.
   ============================================================ */

import { useState, type ComponentType, type ReactNode } from 'react'
import type { ParamSpec } from '../lib/types'
import { Params, paramAwal } from './Slider'
import { Stage } from './Stage'
import { SorotProvider, useSorot } from './Formula'
import { Ikon } from './Ikon'

export interface EksperimenProps {
  judul: string
  ajakan: string
  params: ParamSpec[]
  Visual: ComponentType<{ p: Record<string, number>; sorot: string | null }>
  temuan?: (p: Record<string, number>) => ReactNode
  /** isi tambahan di bawah kontrol, mis. rumus interaktif. */
  children?: ReactNode
}

export function Eksperimen({
  judul,
  ajakan,
  params,
  Visual,
  temuan,
  children,
}: EksperimenProps) {
  const [p, setP] = useState(() => paramAwal(params))
  const awal = paramAwal(params)
  const berubah = params.some((s) => p[s.key] !== awal[s.key])

  return (
    <SorotProvider>
      <div className="eksperimen">
        <div className="row row-between" style={{ marginBottom: 'var(--s-3)' }}>
          <span className="eyebrow row-tight" style={{ display: 'inline-flex' }}>
            <Ikon nama="eksperimen" /> Eksperimen
          </span>
          {berubah && (
            <button className="btn btn-sm btn-ghost" onClick={() => setP(awal)}>
              <Ikon nama="ulang" /> Atur ulang
            </button>
          )}
        </div>

        <h3 className="eksperimen-judul">{judul}</h3>
        <p className="muted" style={{ marginBottom: 'var(--s-4)' }}>
          {ajakan}
        </p>

        <Panggung Visual={Visual} p={p} />

        <div className="controls" style={{ marginTop: 'var(--s-4)' }}>
          <Params specs={params} nilai={p} set={(k, v) => setP((s) => ({ ...s, [k]: v }))} />
        </div>

        {temuan && (
          <div className="temuan" aria-live="polite">
            <span className="temuan-tanda">
              <Ikon nama="lampu" />
            </span>
            <div className="grow">{temuan(p)}</div>
          </div>
        )}

        {children}
      </div>
    </SorotProvider>
  )
}

function Panggung({
  Visual,
  p,
}: {
  Visual: ComponentType<{ p: Record<string, number>; sorot: string | null }>
  p: Record<string, number>
}) {
  const sorot = useSorot()
  return (
    <Stage>
      <Visual p={p} sorot={sorot} />
    </Stage>
  )
}
