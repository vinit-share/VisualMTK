/* ============================================================
   Visual MTK — Isi satu kelas
   Topik tampil sebagai ubin bergambar, bukan daftar teks:
   gambar, judul pendek, bintang, dan tombol "Tes". Rincian
   kurikulumnya pindah ke halaman topik masing-masing.
   Topik dikelompokkan per domain dan diurutkan dari yang
   menjadi prasyarat.
   ============================================================ */

import { Link, useParams } from 'react-router-dom'
import { Ikon } from '../components/Ikon'
import { Bintang } from '../components/SesiSoal'
import { adaKonsep } from '../concepts/registry'
import { cariKonsepMeta, LABEL_DOMAIN } from '../data/katalog'
import { KELAS, topikPerDomain, type TopikRingkas } from '../data/kurikulum'
import { jumlahBintang, MAKS_BINTANG, useSimpanan } from '../lib/store'
import { GambarTopik } from '../visuals/GambarTopik'

/** Judul untuk ubin: keterangan dalam kurung dibuang supaya muat dan cepat dibaca. */
const judulRingkas = (judul: string) => judul.replace(/\s*\([^)]*\)/g, '').trim()

export default function KelasPage() {
  const { kelas = '1' } = useParams()
  const no = Number(kelas)
  const info = KELAS.find((k) => k.no === no)
  const simpanan = useSimpanan()

  if (!info) {
    return (
      <div className="page section stack stack-4">
        <h1>Kelas tidak ditemukan</h1>
        <div>
          <Link className="btn btn-primary" to="/belajar">
            Kembali ke peta belajar
          </Link>
        </div>
      </div>
    )
  }

  const kelompok = topikPerDomain(no)
  const semua = kelompok.flatMap((g) => g.topik)
  const bintang = jumlahBintang(
    simpanan.topik,
    semua.map((t) => t.id),
  )
  const maks = semua.length * MAKS_BINTANG
  const sudahDites = semua.filter((t) => (simpanan.topik[t.id]?.tes ?? 0) > 0).length

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

        <div className="kelas-judul-baris">
          <span className="kelas-angka" aria-hidden="true">
            {info.no}
          </span>
          <div className="stack stack-1">
            <h1>Kelas {info.no}</h1>
            <p className="lead">{info.julukan}</p>
          </div>
        </div>

        <div className="card kelas-ringkas">
          <span className="kelas-ringkas-bintang" aria-label={`${bintang} dari ${maks} bintang`}>
            <Ikon nama="bintang" ukuran="1.1em" /> {bintang}
            <small className="dim">/ {maks}</small>
          </span>
          <div className="bar" aria-hidden="true">
            <i style={{ width: `${maks ? Math.round((bintang / maks) * 100) : 0}%` }} />
          </div>
          <span className="small muted">
            {sudahDites === 0
              ? `${semua.length} topik. Pilih satu, lalu coba tesnya.`
              : `${sudahDites} dari ${semua.length} topik sudah kamu tes.`}
          </span>
        </div>

        {kelompok.length > 1 && (
          <div className="lompat-domain" role="group" aria-label="Lompat ke bagian">
            {kelompok.map((g) => (
              // Tombol, bukan tautan-jangkar: jangkar akan menimpa alamat HashRouter.
              <button
                key={g.domain}
                type="button"
                data-domain={g.domain}
                onClick={() =>
                  document.getElementById(`bagian-${g.domain}`)?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <span className="dot" /> {LABEL_DOMAIN[g.domain]} <b>{g.topik.length}</b>
              </button>
            ))}
          </div>
        )}
      </header>

      <div className="page stack stack-8">
        {kelompok.length === 0 && (
          <div className="kosong">
            <p>Peta topik untuk kelas ini sedang disusun.</p>
          </div>
        )}

        {kelompok.map((g) => (
          <section
            key={g.domain}
            id={`bagian-${g.domain}`}
            className="domain-blok"
            data-domain={g.domain}
            aria-labelledby={`judul-${g.domain}`}
          >
            <h2 id={`judul-${g.domain}`} className="domain-judul">
              <span className="domain-titik" /> {LABEL_DOMAIN[g.domain]}
              <small>{g.topik.length} topik</small>
            </h2>
            <div className="ubin-grid">
              {g.topik.map((t) => (
                <UbinTopik key={t.id} topik={t} bintang={simpanan.topik[t.id]?.bintang ?? 0} />
              ))}
            </div>
          </section>
        ))}

        <nav className="row row-between" style={{ marginTop: 'var(--s-4)' }} aria-label="Kelas lain">
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

function UbinTopik({ topik: t, bintang }: { topik: TopikRingkas; bintang: number }) {
  const idKonsep = (t.konsep ?? []).find(adaKonsep)
  const konsep = idKonsep ? cariKonsepMeta(idKonsep) : undefined
  return (
    <article className="ubin-topik" data-domain={t.domain} data-bintang={bintang}>
      <Link to={`/topik/${t.id}`} className="ubin-utama" title={t.judul}>
        <GambarTopik judul={t.judul} domain={t.domain} className="is-lebar" />
        <span className="ubin-judul">{judulRingkas(t.judul)}</span>
        <Bintang n={bintang} />
      </Link>
      <div className="ubin-kaki">
        <Link to={`/topik/${t.id}?mulai=1`} className="ubin-tes" aria-label={`Tes topik: ${t.judul}`}>
          <Ikon nama="play" ukuran="0.95em" /> Tes
        </Link>
        {konsep && (
          <Link
            to={`/konsep/${konsep.id}`}
            className="ubin-kenapa"
            aria-label={`Lihat kenapa: ${konsep.pertanyaan}`}
            title={konsep.pertanyaan}
          >
            <Ikon nama="kenapa" tebal={2.6} />
          </Link>
        )}
      </div>
    </article>
  )
}
