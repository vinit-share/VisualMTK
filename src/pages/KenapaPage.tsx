/* ============================================================
   Visual MTK — Galeri "Kenapa?"
   Daftar pertanyaan, bukan daftar bab. Tiap pertanyaan punya
   gambar sampul yang meringkas jawabannya, jadi anak memilih
   dengan mata — bukan dengan membaca deretan kartu teks.

   Di atas galeri ada satu "sorotan" yang bisa diacak: untuk
   anak yang belum tahu mau mulai dari mana.
   ============================================================ */

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Ikon } from '../components/Ikon'
import { StatusLencana } from '../components/StatusLencana'
import { konsepSiap, LABEL_DOMAIN, type KonsepMeta } from '../data/katalog'
import { seededRandom } from '../lib/num'
import { hariIni, statusKonsep, useSimpanan, type Simpanan } from '../lib/store'
import type { Domain } from '../lib/types'
import { GambarKonsep } from '../visuals/GambarKonsep'

const JENJANG = [
  { id: 'semua', label: 'Semua', min: 1, max: 12 },
  { id: 'sd', label: 'SD', min: 1, max: 6 },
  { id: 'smp', label: 'SMP', min: 7, max: 9 },
  { id: 'sma', label: 'SMA', min: 10, max: 12 },
]

export default function KenapaPage() {
  const simpanan = useSimpanan()
  const semua = useMemo(() => konsepSiap().sort((a, b) => a.kelas - b.kelas), [])
  const [q, setQ] = useState('')
  const [jenjang, setJenjang] = useState('semua')
  const [domain, setDomain] = useState<Domain | 'semua'>('semua')

  // Sorotan awal berganti tiap hari; tombol "Acak" memilih yang lain.
  const [sorot, setSorot] = useState(() => {
    const rnd = seededRandom(
      hariIni()
        .split('-')
        .reduce((a, s) => a * 100 + Number(s), 31),
    )
    return Math.floor(rnd() * Math.max(1, semua.length))
  })
  const [putaran, setPutaran] = useState(0)

  const domainAda = useMemo(
    () => (Array.from(new Set(semua.map((k) => k.domain))) as Domain[]).map((d) => ({
      d,
      n: semua.filter((k) => k.domain === d).length,
    })),
    [semua],
  )

  const menyaring = q.trim() !== '' || jenjang !== 'semua' || domain !== 'semua'

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
  }, [semua, q, jenjang, domain])

  const pilihan = semua[sorot % Math.max(1, semua.length)]

  const acak = () => {
    if (semua.length < 2) return
    let baru = sorot
    while (baru === sorot) baru = Math.floor(Math.random() * semua.length)
    setSorot(baru)
    setPutaran((n) => n + 1)
  }

  return (
    <>
      <header className="page kepala stack stack-4">
        <span className="eyebrow row-tight" style={{ display: 'inline-flex' }}>
          <Ikon nama="kenapa" /> Kenapa?
        </span>
        <h1>Pilih pertanyaan yang bikin penasaran</h1>
        <p className="lead">
          Setiap pertanyaan dijawab dengan gambar yang bisa kamu mainkan. Rumusnya datang paling
          akhir.
        </p>
      </header>

      <div className="page stack stack-8">
        {/* ---------- Sorotan ---------- */}
        {pilihan && (
          // `key` berganti saat diacak supaya animasi masuknya diputar lagi.
          <section className="card sorotan" data-ganti={putaran > 0} key={putaran} aria-label="Pertanyaan pilihan">
            <GambarKonsep id={pilihan.id} />
            <div className="stack stack-3 sorotan-isi">
              <div className="row row-tight">
                <span className="eyebrow">Coba yang ini</span>
                <span className="chip chip-brand">Kelas {pilihan.kelas}</span>
                <span className="chip">{LABEL_DOMAIN[pilihan.domain]}</span>
              </div>
              <h2 className="sorotan-tanya">{pilihan.pertanyaan}</h2>
              <p className="muted">{pilihan.tagline}</p>
              <div className="row row-tight">
                <Link className="btn btn-lg btn-primary" to={`/konsep/${pilihan.id}`}>
                  <Ikon nama="bongkar" /> Bongkar
                </Link>
                <button type="button" className="btn btn-lg btn-outline" onClick={acak}>
                  <Ikon nama="acak" /> Acak
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ---------- Saringan ---------- */}
        <section className="stack stack-3" aria-label="Saring pertanyaan">
          <div className="row">
            <div className="kotak-cari kotak-cari-lebar">
              <span className="ikon-cari">
                <Ikon nama="cari" />
              </span>
              <input
                className="field"
                type="search"
                placeholder="Cari: lingkaran, pecahan, pythagoras…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                aria-label="Cari pertanyaan"
              />
            </div>
            <div className="saring-chip" role="group" aria-label="Saring jenjang">
              {JENJANG.map((j) => (
                <button
                  key={j.id}
                  type="button"
                  aria-pressed={jenjang === j.id}
                  onClick={() => setJenjang(j.id)}
                >
                  {j.label}
                </button>
              ))}
            </div>
          </div>
          <div className="saring-chip" role="group" aria-label="Saring jenis materi">
            <button type="button" aria-pressed={domain === 'semua'} onClick={() => setDomain('semua')}>
              Semua materi <b>{semua.length}</b>
            </button>
            {domainAda.map(({ d, n }) => (
              <button
                key={d}
                type="button"
                data-domain={d}
                aria-pressed={domain === d}
                onClick={() => setDomain(domain === d ? 'semua' : d)}
              >
                <span className="dot" /> {LABEL_DOMAIN[d]} <b>{n}</b>
              </button>
            ))}
          </div>
        </section>

        {/* ---------- Galeri ---------- */}
        {hasil.length === 0 ? (
          <div className="kosong">
            <p>Belum ada pertanyaan yang cocok dengan pencarian itu.</p>
            <button
              className="btn btn-soft"
              onClick={() => {
                setQ('')
                setJenjang('semua')
                setDomain('semua')
              }}
            >
              Tampilkan semua
            </button>
          </div>
        ) : menyaring ? (
          <section aria-label="Hasil saringan">
            <div className="rak-kepala">
              <h2>Yang cocok</h2>
              <span className="rak-hitung">{hasil.length} pertanyaan</span>
            </div>
            <Galeri daftar={hasil} simpanan={simpanan} />
          </section>
        ) : (
          JENJANG.filter((j) => j.id !== 'semua').map((j) => {
            const isi = hasil.filter((k) => k.kelas >= j.min && k.kelas <= j.max)
            if (isi.length === 0) return null
            return (
              <section key={j.id} aria-labelledby={`kenapa-${j.id}`}>
                <div className="rak-kepala">
                  <h2 id={`kenapa-${j.id}`}>Untuk {j.label}</h2>
                  <span className="rak-hitung">{isi.length} pertanyaan</span>
                </div>
                <Galeri daftar={isi} simpanan={simpanan} />
              </section>
            )
          })
        )}
      </div>
    </>
  )
}

function Galeri({ daftar, simpanan }: { daftar: KonsepMeta[]; simpanan: Simpanan }) {
  return (
    <div className="galeri">
      {daftar.map((k) => (
        <Link key={k.id} to={`/konsep/${k.id}`} className="card card-link kartu-gambar" title={k.tagline}>
          <GambarKonsep id={k.id} />
          <span className="kartu-gambar-judul">{k.pertanyaan}</span>
          <span className="kartu-gambar-kaki">
            <span>Kelas {k.kelas}</span>
            <span className="grow" />
            {/* "Belum mulai" tidak diberi tanda: ikon gembok terkesan terkunci. */}
            {statusKonsep(simpanan.konsep[k.id]) !== 'none' && (
              <StatusLencana status={statusKonsep(simpanan.konsep[k.id])} kecil />
            )}
          </span>
        </Link>
      ))}
    </div>
  )
}
