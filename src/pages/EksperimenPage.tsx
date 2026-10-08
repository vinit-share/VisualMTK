/* ============================================================
   Visual MTK — Mode eksperimen
   Tidak ada langkah, tidak ada soal. Hanya objek yang bisa
   dipegang dan bentuk yang ikut berubah.

   Halaman ini punya dua keadaan:
   - Rak: semua eksperimen tampil sebagai ubin bergambar,
     sehingga terlihat sekaligus ada berapa dan apa saja.
   - Pemutar (?k=…): satu eksperimen menjadi tokoh utama, dengan
     tombol sebelum/berikutnya dan jalan kembali ke rak.
   ============================================================ */

import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Eksperimen } from '../components/Eksperimen'
import { Ikon } from '../components/Ikon'
import { PitaGulir } from '../components/PitaGulir'
import { konsepSiap, LABEL_DOMAIN, type KonsepMeta } from '../data/katalog'
import { muatKonsep } from '../concepts/registry'
import type { Konsep } from '../lib/types'
import { GambarKonsep } from '../visuals/GambarKonsep'

const JENJANG = [
  { id: 'sd', label: 'SD', sub: 'Kelas 1–6', min: 1, max: 6 },
  { id: 'smp', label: 'SMP', sub: 'Kelas 7–9', min: 7, max: 9 },
  { id: 'sma', label: 'SMA', sub: 'Kelas 10–12', min: 10, max: 12 },
]

export default function EksperimenPage() {
  const daftar = useMemo(
    () =>
      konsepSiap()
        .filter((k) => k.eksperimen)
        .sort((a, b) => a.kelas - b.kelas),
    [],
  )
  const [params, setParams] = useSearchParams()
  const aktif = params.get('k')
  const posisi = daftar.findIndex((k) => k.id === aktif)

  if (!aktif || posisi < 0) return <Rak daftar={daftar} onPilih={(id) => setParams({ k: id })} />

  return (
    <Pemutar
      daftar={daftar}
      posisi={posisi}
      onPilih={(id) => setParams({ k: id })}
      onRak={() => setParams({})}
    />
  )
}

/* ---------------- Rak: semua eksperimen ---------------- */

function Rak({ daftar, onPilih }: { daftar: KonsepMeta[]; onPilih: (id: string) => void }) {
  return (
    <>
      <header className="page kepala stack stack-4">
        <span className="eyebrow row-tight" style={{ display: 'inline-flex' }}>
          <Ikon nama="eksperimen" /> Eksperimen
        </span>
        <h1>Pegang dulu, simpulkan sendiri</h1>
        <p className="lead">
          Pilih satu gambar, lalu seret dan ubah sesukamu. Tidak ada yang menjelaskan — kamu yang
          menebak aturannya.
        </p>
      </header>

      <div className="page stack stack-8">
        {JENJANG.map((j) => {
          const isi = daftar.filter((k) => k.kelas >= j.min && k.kelas <= j.max)
          if (isi.length === 0) return null
          return (
            <section key={j.id} aria-labelledby={`rak-${j.id}`}>
              <div className="rak-kepala">
                <h2 id={`rak-${j.id}`}>Untuk {j.label}</h2>
                <span className="rak-hitung">{isi.length} eksperimen</span>
              </div>
              <div className="galeri">
                {isi.map((k) => (
                  <button
                    key={k.id}
                    type="button"
                    className="card card-link kartu-gambar"
                    onClick={() => onPilih(k.id)}
                    style={{ textAlign: 'left' }}
                  >
                    <GambarKonsep id={k.id} />
                    <span className="kartu-gambar-judul">{k.judul}</span>
                    <span className="kartu-gambar-kaki">
                      <span>Kelas {k.kelas}</span>
                      <span className="grow" />
                      <Ikon nama="play" ukuran="0.95em" />
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </>
  )
}

/* ---------------- Pemutar: satu eksperimen ---------------- */

function Pemutar({
  daftar,
  posisi,
  onPilih,
  onRak,
}: {
  daftar: KonsepMeta[]
  posisi: number
  onPilih: (id: string) => void
  onRak: () => void
}) {
  const meta = daftar[posisi]
  const sebelum = daftar[posisi - 1]
  const sesudah = daftar[posisi + 1]
  const [konsep, setKonsep] = useState<Konsep | null>(null)

  useEffect(() => {
    let batal = false
    setKonsep(null)
    muatKonsep(meta.id).then((k) => !batal && setKonsep(k))
    return () => {
      batal = true
    }
  }, [meta.id])

  return (
    <div className="page">
      {/* Bilah ringkas: jalan kembali ke rak, posisi, dan pindah eksperimen. */}
      <div className="eks-bilah">
        <button type="button" className="eks-semua" onClick={onRak}>
          <Ikon nama="prev" /> Semua <span className="rak-hitung">{daftar.length}</span>
        </button>
        <div className="eks-bilah-tengah">
          <GambarKonsep id={meta.id} className="is-mini" />
          <span className="grow" style={{ minWidth: 0 }}>
            <span className="eks-bilah-judul">{meta.judul}</span>
            <span className="tiny dim">
              {LABEL_DOMAIN[meta.domain]} · Kelas {meta.kelas}
            </span>
          </span>
        </div>
        <div className="eks-pindah">
          <button
            type="button"
            className="btn btn-icon btn-outline"
            onClick={() => sebelum && onPilih(sebelum.id)}
            disabled={!sebelum}
            aria-label={sebelum ? `Eksperimen sebelumnya: ${sebelum.judul}` : 'Tidak ada eksperimen sebelumnya'}
          >
            <Ikon nama="prev" />
          </button>
          <span className="eks-posisi" aria-hidden="true">
            {posisi + 1} / {daftar.length}
          </span>
          <button
            type="button"
            className="btn btn-icon btn-outline"
            onClick={() => sesudah && onPilih(sesudah.id)}
            disabled={!sesudah}
            aria-label={sesudah ? `Eksperimen berikutnya: ${sesudah.judul}` : 'Tidak ada eksperimen berikutnya'}
          >
            <Ikon nama="next" />
          </button>
        </div>
      </div>

      <div className="stack stack-6">
        {!konsep ? (
          <div className="rangka rangka-stage" aria-busy="true" />
        ) : konsep.eksperimen ? (
          <>
            <div className="card card-pad-lg card-visual">
              <Eksperimen
                key={konsep.id}
                judul={konsep.eksperimen.judul}
                ajakan={konsep.eksperimen.ajakan}
                params={konsep.eksperimen.params}
                Visual={konsep.eksperimen.Visual}
                temuan={konsep.eksperimen.temuan}
                rumus={konsep.eksperimen.rumus}
                roles={konsep.rumus.roles}
                arti={konsep.rumus.arti}
              />
            </div>
            <div className="card card-pad-lg row row-between">
              <div className="stack stack-1 grow">
                <span className="eyebrow">Sudah menemukan polanya?</span>
                <h3>{konsep.pertanyaan}</h3>
                <p className="small muted">
                  {LABEL_DOMAIN[konsep.domain]} · Kelas {meta.kelas}
                </p>
              </div>
              <Link className="btn btn-primary" to={`/konsep/${konsep.id}`}>
                Lihat penjelasannya <Ikon nama="panah" />
              </Link>
            </div>
          </>
        ) : (
          <div className="kosong">
            <p>Konsep ini belum punya mode eksperimen.</p>
          </div>
        )}

        {/* Rak mendatar: eksperimen lain tetap terlihat tanpa harus kembali. */}
        <section aria-labelledby="rak-lain">
          <div className="rak-kepala">
            <h2 id="rak-lain" style={{ fontSize: 'var(--t-lg)' }}>
              Eksperimen lain
            </h2>
            <button type="button" className="btn btn-sm btn-ghost" onClick={onRak}>
              Lihat semua {daftar.length} <Ikon nama="panah" />
            </button>
          </div>
          <PitaGulir label="eksperimen lain" aktif={meta.id}>
            {daftar.map((k) => (
              <button
                key={k.id}
                type="button"
                className="card card-link kartu-gambar kartu-rak"
                data-aktif={k.id === meta.id}
                aria-current={k.id === meta.id ? 'true' : undefined}
                onClick={() => {
                  onPilih(k.id)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                style={{ textAlign: 'left' }}
              >
                <GambarKonsep id={k.id} />
                <span className="kartu-gambar-judul">{k.judul}</span>
                <span className="kartu-gambar-kaki">Kelas {k.kelas}</span>
              </button>
            ))}
          </PitaGulir>
        </section>
      </div>
    </div>
  )
}
