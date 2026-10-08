/* ============================================================
   Visual MTK — Panggung eksperimen
   Anak memegang objeknya langsung — menyeret titik, merentangkan
   sisi — dan gambar, angka, serta "temuan" ikut berubah seketika.
   Kontrol angka ringkas di bawah gambar hanya cadangan untuk
   ketelitian. Tujuannya bukan membaca kesimpulan, tapi
   menemukannya sendiri.
   ============================================================ */

import { useState, type ComponentType, type ReactNode } from 'react'
import type { FormulaRole, ParamSpec } from '../lib/types'
import { Stage } from './Stage'
import { Formula, SorotProvider, useSorot } from './Formula'
import { Ikon } from './Ikon'
import {
  BilahAngka,
  InteraksiProvider,
  SorotDariPegangan,
  TombolFokus,
  useKendali,
  useModeFokus,
  type Nilai,
} from './Interaksi'

export interface EksperimenProps {
  judul: string
  ajakan: string
  params: ParamSpec[]
  Visual: ComponentType<{ p: Record<string, number>; sorot: string | null }>
  temuan?: (p: Record<string, number>) => ReactNode
  /** rumus hidup yang angkanya mengikuti gambar. */
  rumus?: (p: Record<string, number>) => string
  roles?: Record<string, FormulaRole>
  arti?: Record<string, string>
  /** isi tambahan di bawah kontrol, mis. rumus interaktif. */
  children?: ReactNode
}

export function Eksperimen({
  judul,
  ajakan,
  params,
  Visual,
  temuan,
  rumus,
  roles,
  arti,
  children,
}: EksperimenProps) {
  const kendali = useKendali(params)
  const mode = useModeFokus()
  // Ajakan yang panjang diringkas dulu: gambarnya yang harus cepat terlihat.
  const panjang = ajakan.length > 150
  const [ajakanTerbuka, setAjakanTerbuka] = useState(false)

  const tombolUlang = kendali.berubah && (
    <button className="btn btn-sm btn-ghost" onClick={kendali.reset}>
      <Ikon nama="ulang" /> Atur ulang
    </button>
  )

  return (
    <SorotProvider>
      <InteraksiProvider kendali={kendali}>
        <SorotDariPegangan />
        <div className="eksperimen">
          <div className="row row-between eksperimen-kepala">
            <span className="eyebrow row-tight" style={{ display: 'inline-flex' }}>
              <Ikon nama="eksperimen" /> Eksperimen
            </span>
            {!mode.fokus && tombolUlang}
          </div>

          <h3 className="eksperimen-judul">{judul}</h3>
          <p className="muted eksperimen-ajakan" data-ringkas={panjang && !ajakanTerbuka}>
            {ajakan}
          </p>
          {panjang && (
            <button
              type="button"
              className="ajakan-buka"
              onClick={() => setAjakanTerbuka((b) => !b)}
              aria-expanded={ajakanTerbuka}
            >
              {ajakanTerbuka ? 'Ringkas' : 'Baca selengkapnya'}
            </button>
          )}

          <div
            className="ruang"
            data-fokus={mode.fokus}
            role={mode.fokus ? 'dialog' : undefined}
            aria-modal={mode.fokus || undefined}
            aria-label={mode.fokus ? judul : undefined}
          >
            {mode.fokus && (
              <div className="ruang-kepala">
                <strong className="ruang-judul">{judul}</strong>
                {tombolUlang}
              </div>
            )}

            <Panggung
              Visual={Visual}
              p={kendali.tampil}
              aksi={<TombolFokus fokus={mode.fokus} onClick={mode.toggle} />}
            />

            {rumus && (
              <div className="rumus-hidup">
                <Formula src={rumus(kendali.tampil)} roles={roles} arti={arti} size="lg" ringkas />
              </div>
            )}

            <BilahAngka kendali={kendali} />

            {temuan && (
              <div className="temuan" aria-live="polite">
                <span className="temuan-tanda">
                  <Ikon nama="lampu" />
                </span>
                {/* Temuan memakai nilai akhir, bukan nilai yang sedang beranimasi,
                    supaya pembaca layar tidak membacakan setiap bingkai. */}
                <div className="grow">{temuan(kendali.nilai)}</div>
              </div>
            )}
          </div>

          {children}
        </div>
      </InteraksiProvider>
    </SorotProvider>
  )
}

function Panggung({
  Visual,
  p,
  aksi,
}: {
  Visual: ComponentType<{ p: Record<string, number>; sorot: string | null }>
  p: Nilai
  aksi: ReactNode
}) {
  const sorot = useSorot()
  return (
    <Stage aksi={aksi}>
      <Visual p={p} sorot={sorot} />
    </Stage>
  )
}
