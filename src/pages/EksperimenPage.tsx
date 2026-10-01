/* ============================================================
   Visual MTK — Mode eksperimen
   Tidak ada langkah, tidak ada soal. Hanya parameter yang bisa
   digeser dan bentuk yang ikut berubah. Tujuannya menemukan
   pola sendiri sebelum ada yang menjelaskannya.
   ============================================================ */

import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Eksperimen } from '../components/Eksperimen'
import { Ikon } from '../components/Ikon'
import { konsepSiap, LABEL_DOMAIN } from '../data/katalog'
import { muatKonsep } from '../concepts/registry'
import type { Konsep } from '../lib/types'

export default function EksperimenPage() {
  const daftar = konsepSiap().filter((k) => k.eksperimen)
  const [params, setParams] = useSearchParams()
  const aktif = params.get('k') ?? daftar[0]?.id ?? ''
  const [konsep, setKonsep] = useState<Konsep | null>(null)

  useEffect(() => {
    let batal = false
    setKonsep(null)
    if (!aktif) return
    muatKonsep(aktif).then((k) => !batal && setKonsep(k))
    return () => {
      batal = true
    }
  }, [aktif])

  return (
    <>
      <header className="page kepala stack stack-4">
        <span className="eyebrow row-tight" style={{ display: 'inline-flex' }}>
          <Ikon nama="eksperimen" /> Eksperimen
        </span>
        <h1>Geser dulu, simpulkan sendiri</h1>
        <p className="lead">
          Di sini tidak ada yang menjelaskan apa pun kepadamu. Ubah angkanya, perhatikan apa yang
          ikut berubah dan apa yang bertahan — lalu tebak aturannya.
        </p>
      </header>

      <div className="page stack stack-6">
        <div className="segmented" role="tablist" aria-label="Pilih eksperimen">
          {daftar.map((k) => (
            <button
              key={k.id}
              role="tab"
              aria-selected={aktif === k.id}
              onClick={() => setParams({ k: k.id })}
            >
              {k.judul}
            </button>
          ))}
        </div>

        {!konsep ? (
          <div className="rangka rangka-stage" aria-busy="true" />
        ) : konsep.eksperimen ? (
          <>
            <div className="card card-pad-lg card-visual">
              <Eksperimen
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
                  {LABEL_DOMAIN[konsep.domain]} · Kelas {konsep.kelas}
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
      </div>
    </>
  )
}
