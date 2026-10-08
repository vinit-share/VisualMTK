/* ============================================================
   Visual MTK — "Tebak dulu"
   Sebelum apa pun dijelaskan, anak menebak. Menebak lebih dulu
   membuat penjelasan berikutnya menempel jauh lebih kuat —
   termasuk (terutama) ketika tebakannya meleset.
   ============================================================ */

import { useState } from 'react'
import type { Predict } from '../lib/types'
import { Ikon } from './Ikon'

export function Tebak({
  data,
  onPilih,
  awal,
}: {
  data: Predict
  onPilih?: (id: string, benar: boolean) => void
  /** pilihan yang tersimpan dari kunjungan sebelumnya. */
  awal?: string
}) {
  const [pilih, setPilih] = useState<string | null>(awal ?? null)
  const terpilih = data.pilihan.find((p) => p.id === pilih)

  return (
    <div className="tebak">
      <div className="row-tight row" style={{ marginBottom: 'var(--s-2)' }}>
        <span className="eyebrow row-tight" style={{ display: 'inline-flex' }}>
          <Ikon nama="target" /> Tebak dulu
        </span>
      </div>
      <h3 className="tebak-tanya">{data.pertanyaan}</h3>

      <div className="tebak-pilihan" role="group" aria-label="Pilihan tebakan">
        {data.pilihan.map((p) => {
          const dipilih = pilih === p.id
          const state = !pilih ? 'netral' : p.benar ? 'benar' : dipilih ? 'salah' : 'redup'
          return (
            <button
              key={p.id}
              className="tebak-opsi"
              data-state={state}
              aria-pressed={dipilih}
              disabled={!!pilih}
              onClick={() => {
                setPilih(p.id)
                onPilih?.(p.id, !!p.benar)
              }}
            >
              <span className="tebak-label">{p.label}</span>
              {pilih && p.benar && <Ikon nama="cek" />}
              {pilih && dipilih && !p.benar && <Ikon nama="silang" />}
            </button>
          )
        })}
      </div>

      {terpilih && (
        <div
          className={`note ${terpilih.benar ? 'note-ok' : 'note-belum'} tebak-balas`}
          aria-live="polite"
        >
          <p>
            <strong>{terpilih.benar ? 'Tebakanmu tepat. ' : 'Belum tepat — dan itu wajar. '}</strong>
            {terpilih.balasan}
          </p>
          <p style={{ marginTop: 'var(--s-2)' }}>{data.penutup}</p>
        </div>
      )}
    </div>
  )
}
