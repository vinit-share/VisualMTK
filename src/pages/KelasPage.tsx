/* ============================================================
   Visual MTK — Isi satu kelas
   Menampilkan topik kurikulum kelas tersebut dan menandai
   topik mana yang sudah punya penjelasan visual interaktif.
   ============================================================ */

import { Link, useParams } from 'react-router-dom'
import { Ikon } from '../components/Ikon'
import { StatusLencana } from '../components/StatusLencana'
import { KELAS, cariTopik, topikKelas } from '../data/kurikulum'
import { cariKonsepMeta, LABEL_DOMAIN } from '../data/katalog'
import { adaKonsep } from '../concepts/registry'
import { statusKonsep, useSimpanan } from '../lib/store'

export default function KelasPage() {
  const { kelas = '1' } = useParams()
  const no = Number(kelas)
  const info = KELAS.find((k) => k.no === no)
  const simpanan = useSimpanan()
  const topik = topikKelas(no)

  if (!info) {
    return (
      <div className="page section stack stack-4">
        <h1>Kelas tidak ditemukan</h1>
        <Link className="btn btn-primary" to="/belajar">
          Kembali ke peta belajar
        </Link>
      </div>
    )
  }

  const sebelum = KELAS.find((k) => k.no === no - 1)
  const sesudah = KELAS.find((k) => k.no === no + 1)

  return (
    <>
      <header className="page kepala stack stack-4">
        <div className="row row-tight">
          <Link to="/belajar" className="chip chip-outline">
            <Ikon nama="prev" /> Semua kelas
          </Link>
          <span className="chip chip-brand">{info.jenjang}</span>
          <span className="chip">Fase {info.fase}</span>
        </div>
        <h1>
          Kelas {info.no} — {info.julukan}
        </h1>
        <p className="lead">
          {topik.length} topik pada kelas ini. Topik bertanda ungu sudah punya penjelasan visual
          yang bisa dimainkan.
        </p>
      </header>

      <div className="page stack stack-3">
        {topik.length === 0 && (
          <div className="kosong">
            <p>Peta topik untuk kelas ini sedang disusun.</p>
          </div>
        )}

        {topik.map((t) => {
          const konsepIds = (t.konsep ?? []).filter(adaKonsep)
          return (
            <article key={t.id} className="topik-item" data-punya={konsepIds.length > 0}>
              <span className="topik-tanda">
                {konsepIds.length > 0 ? <Ikon nama="kenapa" /> : <Ikon nama="belajar" />}
              </span>
              <div className="grow stack stack-2">
                <div className="row row-between">
                  <h3 style={{ fontSize: 'var(--t-md)' }}>{t.judul}</h3>
                  <span className="chip">{LABEL_DOMAIN[t.domain]}</span>
                </div>
                <p className="small muted">{t.ringkas}</p>

                <div className="sub-list">
                  {t.subKonsep.map((s) => (
                    <span key={s} className="sub-item">
                      {s}
                    </span>
                  ))}
                </div>

                {t.rumus && t.rumus.length > 0 && (
                  <p className="tiny dim">Rumus kunci: {t.rumus.join(' · ')}</p>
                )}

                {t.kenapa && t.kenapa.length > 0 && (
                  <p className="topik-kenapa">
                    <Ikon nama="kenapa" /> {t.kenapa[0]}
                  </p>
                )}

                {t.miskonsepsi && t.miskonsepsi.length > 0 && (
                  <details className="topik-salah">
                    <summary>Kekeliruan yang sering terjadi</summary>
                    <ul>
                      {t.miskonsepsi.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </details>
                )}

                {t.prasyarat.length > 0 && (
                  <p className="tiny dim">
                    Sebaiknya sudah paham:{' '}
                    {t.prasyarat.map((p, i) => {
                      const pt = cariTopik(p)
                      return (
                        <span key={p}>
                          {i > 0 && ', '}
                          {pt ? (
                            <Link to={`/belajar/${pt.kelas}`} className="mark">
                              {pt.judul}
                            </Link>
                          ) : (
                            p
                          )}
                        </span>
                      )
                    })}
                  </p>
                )}

                {konsepIds.length > 0 && (
                  <div className="row row-tight" style={{ marginTop: 'var(--s-2)' }}>
                    {konsepIds.map((id) => {
                      const m = cariKonsepMeta(id)
                      if (!m) return null
                      return (
                        <Link key={id} to={`/konsep/${id}`} className="btn btn-sm btn-why">
                          <Ikon nama="kenapa" /> {m.pertanyaan}
                          <StatusLencana status={statusKonsep(simpanan.konsep[id])} kecil />
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            </article>
          )
        })}

        <nav className="row row-between" style={{ marginTop: 'var(--s-8)' }}>
          {sebelum ? (
            <Link className="btn btn-outline" to={`/belajar/${sebelum.no}`}>
              <Ikon nama="prev" /> Kelas {sebelum.no}
            </Link>
          ) : (
            <span />
          )}
          {sesudah && (
            <Link className="btn btn-primary" to={`/belajar/${sesudah.no}`}>
              Kelas {sesudah.no} <Ikon nama="panah" />
            </Link>
          )}
        </nav>
      </div>
    </>
  )
}
