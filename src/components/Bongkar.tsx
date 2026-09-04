/* ============================================================
   Visual MTK — Mesin "Rumus → Bongkar"
   Fitur khas aplikasi. Sebuah rumus dibongkar menjadi beberapa
   langkah animasi; anak melihat rumus itu TERBENTUK, bukan
   membaca paragraf tentangnya.

   Konsep apa pun cukup menyediakan DeriveScene:
     - daftar langkah (judul, narasi, rumus)
     - komponen Visual yang menggambar keadaan (step, t, params)
   Sisanya — pemutar, rel langkah, papan ketik, aksesibilitas —
   ditangani di sini.
   ============================================================ */

import { useEffect, useMemo, useRef, useState } from 'react'
import { useTimeline } from '../lib/anim'
import type { DeriveScene } from '../lib/types'
import { Formula, SorotProvider, useSorot } from './Formula'
import { Params, paramAwal } from './Slider'
import { Stage } from './Stage'
import { Ikon } from './Ikon'

export function Bongkar({
  scene,
  judul = 'Bongkar rumus',
  onSelesai,
}: {
  scene: DeriveScene
  judul?: string
  onSelesai?: () => void
}) {
  const durasi = useMemo(() => scene.steps.map((s) => s.durasi ?? 1400), [scene])
  const tl = useTimeline({ durasi, otomatis: true })
  const [p, setP] = useState(() => paramAwal(scene.params))
  const sudahLapor = useRef(false)
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (tl.selesai && !sudahLapor.current) {
      sudahLapor.current = true
      onSelesai?.()
    }
  }, [tl.selesai, onSelesai])

  const langkah = scene.steps[tl.step]
  const total = scene.steps.length
  const persen = ((tl.step + tl.t) / total) * 100

  const tombolPapanKetik = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      tl.maju()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      tl.mundur()
    } else if (e.key === ' ' || e.key === 'Enter') {
      if (e.target === wrap.current) {
        e.preventDefault()
        tl.toggle()
      }
    }
  }

  return (
    <SorotProvider>
      <div
        className="bongkar"
        ref={wrap}
        tabIndex={0}
        onKeyDown={tombolPapanKetik}
        role="group"
        aria-label={`${judul}: langkah ${tl.step + 1} dari ${total}`}
      >
        <div className="bongkar-head">
          <span className="eyebrow row-tight" style={{ display: 'inline-flex' }}>
            <Ikon nama="bongkar" /> {judul}
          </span>
          <span className="bongkar-count tiny dim">
            Langkah {tl.step + 1}/{total}
          </span>
        </div>

        <div className="bongkar-bar" aria-hidden="true">
          <i style={{ width: `${persen}%` }} />
        </div>

        <Panggung scene={scene} step={tl.step} t={tl.t} p={p} />

        <div className="bongkar-narasi" aria-live="polite">
          <h4 className="bongkar-judul">{langkah.judul}</h4>
          <p className="muted">{langkah.narasi}</p>
        </div>

        {langkah.rumus && (
          <div className="bongkar-rumus" key={langkah.id}>
            <Formula src={langkah.rumus} roles={scene.roles} arti={scene.arti} size="lg" />
          </div>
        )}

        {scene.params && scene.params.length > 0 && (
          <div className="controls">
            <Params
              specs={scene.params}
              nilai={p}
              set={(k, v) => setP((s) => ({ ...s, [k]: v }))}
            />
          </div>
        )}

        <div className="bongkar-kontrol">
          <button
            className="btn btn-icon btn-outline"
            onClick={tl.mundur}
            disabled={tl.step === 0}
            aria-label="Langkah sebelumnya"
          >
            <Ikon nama="prev" />
          </button>

          <button
            className="btn btn-primary bongkar-main"
            onClick={tl.toggle}
            aria-label={tl.main ? 'Jeda' : tl.selesai ? 'Putar ulang' : 'Putar animasi'}
          >
            <Ikon nama={tl.main ? 'pause' : tl.selesai ? 'ulang' : 'play'} />
            <span>{tl.main ? 'Jeda' : tl.selesai ? 'Ulangi' : 'Putar'}</span>
          </button>

          <button
            className="btn btn-icon btn-outline"
            onClick={tl.maju}
            disabled={tl.step >= total - 1}
            aria-label="Langkah berikutnya"
          >
            <Ikon nama="next" />
          </button>
        </div>

        <ol className="bongkar-rel">
          {scene.steps.map((s, i) => (
            <li key={s.id}>
              <button
                className="rel-item"
                data-state={i < tl.step ? 'lewat' : i === tl.step ? 'aktif' : 'nanti'}
                onClick={() => tl.ke(i, i < tl.step)}
                aria-current={i === tl.step ? 'step' : undefined}
              >
                <span className="rel-no">{i + 1}</span>
                <span className="rel-judul">{s.judul}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </SorotProvider>
  )
}

/** Dipisah agar bisa membaca sorotan dari konteks di dalam provider. */
function Panggung({
  scene,
  step,
  t,
  p,
}: {
  scene: DeriveScene
  step: number
  t: number
  p: Record<string, number>
}) {
  const sorot = useSorot()
  const V = scene.Visual
  return (
    <Stage>
      <V step={step} t={t} p={p} sorot={sorot} />
    </Stage>
  )
}
