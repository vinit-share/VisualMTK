/* ============================================================
   Visual MTK — Peta perjalanan belajar
   Dua belas kelas sebagai ubin bergambar. Tiap ubin cukup
   berkata: ini kelas berapa, isinya kira-kira apa, dan sudah
   berapa bintang yang kamu kumpulkan di sana.
   ============================================================ */

import { Link } from 'react-router-dom'
import { Ikon, type NamaIkon } from '../components/Ikon'
import { KELAS, topikKelas } from '../data/kurikulum'
import { jumlahBintang, MAKS_BINTANG, useSimpanan } from '../lib/store'
import type { Domain, Jenjang } from '../lib/types'
import { GambarTopik, type NamaGlif } from '../visuals/GambarTopik'

const JENJANG: { id: Jenjang; nama: string; sub: string; ikon: NamaIkon }[] = [
  { id: 'SD', nama: 'Sekolah Dasar', sub: 'Kelas 1–6', ikon: 'sd' },
  { id: 'SMP', nama: 'Sekolah Menengah Pertama', sub: 'Kelas 7–9', ikon: 'smp' },
  { id: 'SMA', nama: 'Sekolah Menengah Atas', sub: 'Kelas 10–12', ikon: 'sma' },
]

/** Gambar yang mewakili tiap kelas, dipilih dari julukannya. */
const GAMBAR_KELAS: Record<number, { glif: NamaGlif; domain: Domain }> = {
  1: { glif: 'hitung', domain: 'bilangan' },
  2: { glif: 'nilaiTempat', domain: 'bilangan' },
  3: { glif: 'kali', domain: 'bilangan' },
  4: { glif: 'pecahan', domain: 'pengukuran' },
  5: { glif: 'luas', domain: 'geometri' },
  6: { glif: 'lingkaran', domain: 'data' },
  7: { glif: 'aljabar', domain: 'aljabar' },
  8: { glif: 'pythagoras', domain: 'geometri' },
  9: { glif: 'parabola', domain: 'bilangan' },
  10: { glif: 'trigono', domain: 'pengukuran' },
  11: { glif: 'turunan', domain: 'aljabar' },
  12: { glif: 'integral', domain: 'data' },
}

export default function BelajarPage() {
  const simpanan = useSimpanan()

  return (
    <>
      <header className="page kepala stack stack-4">
        <span className="eyebrow row-tight" style={{ display: 'inline-flex' }}>
          <Ikon nama="belajar" /> Belajar
        </span>
        <h1>Pilih kelasmu</h1>
        <p className="lead">
          Tiap kelas berisi topik bergambar. Kerjakan tesnya, kumpulkan bintangnya. Boleh juga
          mundur ke kelas sebelumnya — sering kali di situlah kuncinya.
        </p>
        <div>
          <Link className="btn btn-outline" to="/peta">
            <Ikon nama="peta" /> Lihat hubungan antarmateri
          </Link>
        </div>
      </header>

      <div className="page">
        {JENJANG.map((j) => (
          <section key={j.id} className="jenjang-blok" aria-labelledby={`jenjang-${j.id}`}>
            <div className="jenjang-kepala">
              <span className="jenjang-ikon">
                <Ikon nama={j.ikon} ukuran="1.35em" />
              </span>
              <div>
                <h2 id={`jenjang-${j.id}`} style={{ fontSize: 'var(--t-xl)' }}>
                  {j.nama}
                </h2>
                <p className="small dim">{j.sub}</p>
              </div>
            </div>

            <div className="kelas-grid">
              {KELAS.filter((k) => k.jenjang === j.id).map((k) => {
                const topik = topikKelas(k.no)
                const bintang = jumlahBintang(
                  simpanan.topik,
                  topik.map((t) => t.id),
                )
                const maks = topik.length * MAKS_BINTANG
                const gambar = GAMBAR_KELAS[k.no]
                return (
                  <Link
                    key={k.no}
                    to={`/belajar/${k.no}`}
                    className="card card-link kelas-kartu"
                    data-domain={gambar.domain}
                    aria-label={`Kelas ${k.no}: ${k.julukan}. ${topik.length} topik, ${bintang} dari ${maks} bintang.`}
                  >
                    <GambarTopik judul={k.julukan} domain={gambar.domain} glif={gambar.glif} />
                    <span className="kelas-baris">
                      <span className="kelas-no">{k.no}</span>
                      <span className="kelas-julukan">{k.julukan}</span>
                    </span>
                    <span className="kelas-kaki">
                      <Ikon nama="bintang" ukuran="1em" /> {bintang}
                      <span className="dim">/ {maks}</span>
                      <span className="grow" />
                      <span className="dim">{topik.length} topik</span>
                    </span>
                    <div className="bar" aria-hidden="true">
                      <i style={{ width: `${maks ? Math.round((bintang / maks) * 100) : 0}%` }} />
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
