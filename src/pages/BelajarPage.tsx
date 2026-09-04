/* ============================================================
   Visual MTK — Peta perjalanan belajar
   Kelas 1 sampai 12 ditampilkan sebagai satu jalur menanjak,
   bukan daftar bab yang panjang.
   ============================================================ */

import { Link } from 'react-router-dom'
import { Ikon, type NamaIkon } from '../components/Ikon'
import { KELAS, topikKelas } from '../data/kurikulum'
import { KATALOG } from '../data/katalog'
import { adaKonsep } from '../concepts/registry'
import { NILAI_STATUS, statusKonsep, useSimpanan } from '../lib/store'
import type { Jenjang } from '../lib/types'

const JENJANG: { id: Jenjang; nama: string; sub: string; ikon: NamaIkon }[] = [
  { id: 'SD', nama: 'Sekolah Dasar', sub: 'Kelas 1–6 · Fase A, B, C', ikon: 'sd' },
  { id: 'SMP', nama: 'Sekolah Menengah Pertama', sub: 'Kelas 7–9 · Fase D', ikon: 'smp' },
  { id: 'SMA', nama: 'Sekolah Menengah Atas', sub: 'Kelas 10–12 · Fase E, F', ikon: 'sma' },
]

export default function BelajarPage() {
  const simpanan = useSimpanan()

  const kemajuanKelas = (n: number) => {
    const ids = KATALOG.filter((k) => k.kelas === n && adaKonsep(k.id)).map((k) => k.id)
    if (ids.length === 0) return { nilai: 0, jumlah: 0 }
    const total = ids.reduce((a, id) => a + NILAI_STATUS[statusKonsep(simpanan.konsep[id])], 0)
    return { nilai: total / ids.length, jumlah: ids.length }
  }

  return (
    <>
      <header className="page kepala stack stack-4">
        <span className="eyebrow row-tight" style={{ display: 'inline-flex' }}>
          <Ikon nama="belajar" /> Belajar
        </span>
        <h1>Perjalanan dari kelas 1 sampai kelas 12</h1>
        <p className="lead">
          Susunannya mengikuti Capaian Pembelajaran matematika yang berlaku di Indonesia. Kamu boleh
          mulai dari kelasmu sekarang, atau mundur dulu ke bagian yang dulu terasa membingungkan —
          itu justru sering menjadi kuncinya.
        </p>
        <div>
          <Link className="btn btn-outline" to="/peta">
            <Ikon nama="peta" /> Lihat bagaimana materinya saling terhubung
          </Link>
        </div>
      </header>

      <div className="page">
        {JENJANG.map((j) => {
          const kelas = KELAS.filter((k) => k.jenjang === j.id)
          return (
            <section key={j.id} className="jenjang-blok">
              <div className="jenjang-kepala">
                <span className="jenjang-ikon">
                  <Ikon nama={j.ikon} ukuran="1.35em" />
                </span>
                <div>
                  <h2 style={{ fontSize: 'var(--t-xl)' }}>{j.nama}</h2>
                  <p className="small dim">{j.sub}</p>
                </div>
              </div>

              <div className="kelas-grid">
                {kelas.map((k) => {
                  const { nilai, jumlah } = kemajuanKelas(k.no)
                  const topik = topikKelas(k.no)
                  return (
                    <Link
                      key={k.no}
                      to={`/belajar/${k.no}`}
                      className="card card-link kelas-kartu"
                      aria-label={`Kelas ${k.no}: ${k.julukan}`}
                    >
                      <span className="kelas-no">{k.no}</span>
                      <strong className="small">{k.julukan}</strong>
                      <span className="tiny dim">
                        {topik.length} topik
                        {jumlah > 0 ? ` · ${jumlah} bisa dibongkar` : ''}
                      </span>
                      <div className="bar" aria-hidden="true">
                        <i style={{ width: `${Math.round(nilai * 100)}%` }} />
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </>
  )
}
