/* ============================================================
   Visual MTK — Mesin "Rumus → Bongkar"
   Fitur khas aplikasi. Sebuah rumus dibongkar menjadi beberapa
   langkah animasi; anak melihat rumus itu TERBENTUK, bukan
   membaca paragraf tentangnya.

   Konsep apa pun cukup menyediakan DeriveScene:
     - daftar langkah (judul, narasi, rumus)
     - komponen Visual yang menggambar keadaan (step, t, params)
   Sisanya — pemutar, rel langkah, papan ketik, aksesibilitas,
   pegangan seret, layar penuh — ditangani di sini.
   ============================================================ */

import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import { useTimeline } from '../lib/anim'
import type { DeriveScene, TeksLangkah } from '../lib/types'
import { Formula, SorotProvider, useSorot } from './Formula'
import { Stage } from './Stage'
import { Ikon } from './Ikon'
import { PitaGulir } from './PitaGulir'
import {
  BilahAngka,
  InteraksiProvider,
  SorotDariPegangan,
  TombolFokus,
  useKendali,
  useModeFokus,
  type Nilai,
} from './Interaksi'

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
  const kendali = useKendali(scene.params)
  const mode = useModeFokus()
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
  // Teks memakai nilai akhir; gambar memakai nilai yang bergerak halus.
  const p = kendali.nilai
  const rumusLangkah = langkah.rumus ? teks(langkah.rumus, p) : ''

  const tombolPapanKetik = (e: React.KeyboardEvent) => {
    // Tombol panah milik pegangan dan kotak angka tidak boleh ikut memindah langkah.
    const asal = e.target as HTMLElement
    if (asal.closest?.('input, textarea, [role="slider"], .bilah-angka')) return
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
      <InteraksiProvider kendali={kendali}>
        <SorotDariPegangan />
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

          <div
            className="ruang"
            data-fokus={mode.fokus}
            role={mode.fokus ? 'dialog' : undefined}
            aria-modal={mode.fokus || undefined}
            aria-label={mode.fokus ? judul : undefined}
          >
            {mode.fokus && (
              <div className="ruang-kepala">
                <strong className="ruang-judul">{teks(langkah.judul, p)}</strong>
                <span className="bongkar-count tiny dim">
                  Langkah {tl.step + 1}/{total}
                </span>
              </div>
            )}

            <Panggung
              scene={scene}
              step={tl.step}
              t={tl.t}
              p={kendali.tampil}
              aksi={<TombolFokus fokus={mode.fokus} onClick={mode.toggle} />}
            />

            <BilahAngka kendali={kendali} label="Ubah contoh angkanya dengan tepat" />

            <div className="bongkar-narasi" aria-live="polite">
              {!mode.fokus && <h4 className="bongkar-judul">{teks(langkah.judul, p)}</h4>}
              <p className="muted">{teks(langkah.narasi, p)}</p>
            </div>

            {rumusLangkah && (
              <div className="bongkar-rumus" key={langkah.id}>
                <Formula src={rumusLangkah} roles={scene.roles} arti={scene.arti} size="lg" />
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
          </div>

          <PitaGulir label="langkah-langkah" aktif={tl.step} className="bongkar-pita">
            {scene.steps.map((s, i) => (
              <button
                key={s.id}
                className="rel-item"
                data-state={i < tl.step ? 'lewat' : i === tl.step ? 'aktif' : 'nanti'}
                data-aktif={i === tl.step}
                onClick={() => tl.mainDari(i)}
                aria-current={i === tl.step ? 'step' : undefined}
                title={`Putar langkah ${i + 1}: ${teks(s.judul, p)}`}
              >
                <span className="rel-no">{i + 1}</span>
                <span className="rel-judul">{teks(s.judul, p)}</span>
              </button>
            ))}
          </PitaGulir>
        </div>
      </InteraksiProvider>
    </SorotProvider>
  )
}

/** Teks langkah bisa tetap atau dihitung dari nilai penggeser. */
function teks(x: TeksLangkah, p: Record<string, number>): string {
  return typeof x === 'function' ? x(p) : x
}

/** Dipisah agar bisa membaca sorotan dari konteks di dalam provider. */
function Panggung({
  scene,
  step,
  t,
  p,
  aksi,
}: {
  scene: DeriveScene
  step: number
  t: number
  p: Nilai
  aksi: ReactNode
}) {
  const sorot = useSorot()
  const V = scene.Visual
  return (
    <Stage aksi={aksi}>
      <V step={step} t={t} p={p} sorot={sorot} />
    </Stage>
  )
}
