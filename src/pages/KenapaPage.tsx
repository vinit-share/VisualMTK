/* ============================================================
   Visual MTK — Galeri "Kenapa?"
   Daftar pertanyaan, bukan daftar bab. Yang dipajang adalah rasa
   penasarannya, bukan nama materinya.
   ============================================================ */

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Ikon } from '../components/Ikon'
import { StatusLencana } from '../components/StatusLencana'
import { konsepSiap, LABEL_DOMAIN } from '../data/katalog'
import { statusKonsep, useSimpanan } from '../lib/store'
import type { Domain } from '../lib/types'

const JENJANG = [
  { id: 'semua', label: 'Semua', min: 1, max: 12 },
  { id: 'sd', label: 'SD', min: 1, max: 6 },
  { id: 'smp', label: 'SMP', min: 7, max: 9 },
  { id: 'sma', label: 'SMA', min: 10, max: 12 },
]

export default function KenapaPage() {
  const simpanan = useSimpanan()
  const semua = konsepSiap()
  const [q, setQ] = useState('')
  const [jenjang, setJenjang] = useState('semua')
  const [domain, setDomain] = useState<Domain | 'semua'>('semua')

  const domainAda = useMemo(
    () => Array.from(new Set(semua.map((k) => k.domain))) as Domain[],
    [semua],
  )

  const hasil = useMemo(() => {
    const j = JENJANG.find((x) => x.id === jenjang)!
    const t = q.trim().toLowerCase()
    return semua
      .filter((k) => k.kelas >= j.min && k.kelas <= j.max)
      .filter((k) => domain === 'semua' || k.domain === domain)
      .filter(
        (k) =>
          !t ||
          [k.judul, k.pertanyaan, k.tagline, ...k.tags].some((s) => s.toLowerCase().includes(t)),
      )
      .sort((a, b) => a.kelas - b.kelas)
  }, [semua, q, jenjang, domain])

  return (
    <>
      <header className="page kepala stack stack-4">
        <span className="eyebrow row-tight" style={{ display: 'inline-flex' }}>
          <Ikon nama="kenapa" /> Kenapa?
        </span>
        <h1>Rumus yang paling sering dihafal, dibongkar satu per satu</h1>
        <p className="lead">
          Pilih satu pertanyaan yang membuatmu penasaran. Setiap konsep dimulai dari gambar yang
          bisa kamu mainkan, bukan dari rumus yang harus kamu terima.
        </p>
      </header>

      <div className="page">
        <div className="saring">
          <div className="kotak-cari">
            <span className="ikon-cari">
              <Ikon nama="cari" />
            </span>
            <input
              className="field"
              type="search"
              placeholder="Cari: lingkaran, pecahan, pythagoras…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Cari konsep"
            />
          </div>

          <div className="segmented" role="tablist" aria-label="Saring jenjang">
            {JENJANG.map((j) => (
              <button
                key={j.id}
                role="tab"
                aria-selected={jenjang === j.id}
                onClick={() => setJenjang(j.id)}
              >
                {j.label}
              </button>
            ))}
          </div>

          <div className="segmented" role="tablist" aria-label="Saring domain">
            <button
              role="tab"
              aria-selected={domain === 'semua'}
              onClick={() => setDomain('semua')}
            >
              Semua topik
            </button>
            {domainAda.map((d) => (
              <button key={d} role="tab" aria-selected={domain === d} onClick={() => setDomain(d)}>
                {LABEL_DOMAIN[d]}
              </button>
            ))}
          </div>
        </div>

        {hasil.length === 0 ? (
          <div className="kosong">
            <p>Belum ada konsep yang cocok dengan pencarian itu.</p>
            <button className="btn btn-soft" onClick={() => { setQ(''); setJenjang('semua'); setDomain('semua') }}>
              Tampilkan semua
            </button>
          </div>
        ) : (
          <div className="grid grid-auto">
            {hasil.map((k) => (
              <Link key={k.id} to={`/konsep/${k.id}`} className="card card-link kartu-konsep">
                <div className="row row-tight">
                  <span className="chip chip-brand">Kelas {k.kelas}</span>
                  <span className="chip">{LABEL_DOMAIN[k.domain]}</span>
                </div>
                <h3 className="kartu-tanya">{k.pertanyaan}</h3>
                <p className="small muted">{k.tagline}</p>
                <span className="kartu-kaki small">
                  <StatusLencana status={statusKonsep(simpanan.konsep[k.id])} kecil />
                  <span className="dim">{k.visual}</span>
                  <span className="grow" />
                  <Ikon nama="panah" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
