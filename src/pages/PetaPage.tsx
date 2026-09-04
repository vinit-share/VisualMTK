/* ============================================================
   Visual MTK — Peta pengetahuan
   Matematika bukan kumpulan rumus terpisah. Halaman ini
   memperlihatkan bagaimana materi kelas 3 masih dipakai di
   kelas 12 — supaya "yang dulu kupelajari" terasa ada gunanya.
   ============================================================ */

import { Link } from 'react-router-dom'
import { Ikon } from '../components/Ikon'
import { StatusLencana } from '../components/StatusLencana'
import { JALUR, cariTopik } from '../data/kurikulum'
import { cariKonsepMeta } from '../data/katalog'
import { adaKonsep } from '../concepts/registry'
import { statusKonsep, useSimpanan } from '../lib/store'

const WARNA: Record<string, string> = {
  brand: 'var(--brand)',
  amber: 'var(--amber)',
  teal: 'var(--teal)',
  blue: 'var(--blue)',
  pink: 'var(--pink)',
}

export default function PetaPage() {
  const simpanan = useSimpanan()

  return (
    <>
      <header className="page kepala stack stack-4">
        <span className="eyebrow row-tight" style={{ display: 'inline-flex' }}>
          <Ikon nama="peta" /> Peta pengetahuan
        </span>
        <h1>Ternyata yang dulu kamu pelajari dipakai lagi di sini</h1>
        <p className="lead">
          Setiap jalur di bawah ini dimulai dari materi SD dan berakhir di SMA. Ikuti satu jalur,
          dan kamu akan melihat bahwa materi baru hampir selalu merupakan materi lama yang
          dilanjutkan.
        </p>
      </header>

      <div className="page stack stack-10">
        {JALUR.map((j) => (
          <section key={j.id} className="stack stack-3">
            <div className="jalur-kepala">
              <span className="jalur-titik" style={{ background: WARNA[j.warna] }} />
              <div>
                <h2 style={{ fontSize: 'var(--t-lg)' }}>{j.nama}</h2>
                <p className="small muted">{j.deskripsi}</p>
              </div>
            </div>

            <div className="peta-wrap">
              <div className="jalur-baris">
                {j.rantai.map((id, i) => {
                  const t = cariTopik(id)
                  if (!t) return null
                  const konsepId = (t.konsep ?? []).find(adaKonsep)
                  const meta = konsepId ? cariKonsepMeta(konsepId) : undefined
                  const isi = (
                    <>
                      <span className="tiny dim">Kelas {t.kelas}</span>
                      <span>{t.judul}</span>
                      {meta && (
                        <span className="tiny" style={{ fontWeight: 500 }}>
                          <StatusLencana
                            status={statusKonsep(simpanan.konsep[meta.id])}
                            kecil
                          />{' '}
                          bisa dibongkar
                        </span>
                      )}
                    </>
                  )
                  return (
                    <div key={id} style={{ display: 'contents' }}>
                      {i > 0 && (
                        <span className="jalur-panah" aria-hidden="true">
                          <Ikon nama="panah" />
                        </span>
                      )}
                      {konsepId ? (
                        <Link
                          to={`/konsep/${konsepId}`}
                          className="jalur-simpul"
                          data-punya="true"
                          style={{ borderColor: WARNA[j.warna] }}
                        >
                          {isi}
                        </Link>
                      ) : (
                        <Link to={`/belajar/${t.kelas}`} className="jalur-simpul">
                          {isi}
                        </Link>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
