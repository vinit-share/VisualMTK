/* ============================================================
   Visual MTK — Halaman satu topik
   Gambar besar, satu kalimat, dan satu tombol: "Mulai tes".
   Rincian kurikulumnya tetap ada, tetapi dilipat — anak yang
   ingin tahu bisa membukanya, yang lain langsung bermain.

   Tes topik: 5 soal dari mudah ke sulit. Hasilnya bintang,
   bukan angka rapor, dan selalu boleh diulang.
   ============================================================ */

import { useEffect, useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Ikon } from '../components/Ikon'
import { Bintang, RekapSoal, SesiSoal, type HasilSoal } from '../components/SesiSoal'
import { adaKonsep } from '../concepts/registry'
import { cariKonsepMeta, LABEL_DOMAIN } from '../data/katalog'
import {
  cariTopik,
  muatKelas,
  urutanTopikKelas,
  type TopikKurikulum,
  type TopikRingkas,
} from '../data/kurikulum'
import { JUMLAH_SOAL_TES, susunTesTopik } from '../data/soalTopik'
import { aksi, bintangDari, useSimpanan } from '../lib/store'
import type { Soal } from '../lib/types'
import { GambarKonsep } from '../visuals/GambarKonsep'
import { GambarTopik } from '../visuals/GambarTopik'

export default function TopikPage() {
  const { id = '' } = useParams()
  const topik = cariTopik(id)
  if (!topik) {
    return (
      <div className="page section stack stack-4">
        <h1>Topik tidak ditemukan</h1>
        <div>
          <Link className="btn btn-primary" to="/belajar">
            Kembali ke peta belajar
          </Link>
        </div>
      </div>
    )
  }
  // `key` membuat seluruh keadaan tes disetel ulang saat pindah topik.
  return <IsiTopik key={topik.id} topik={topik} />
}

type Tahap = 'awal' | 'memuat' | 'tes' | 'hasil' | 'kosong'

const UCAPAN = [
  'Tidak apa-apa. Lihat lagi pelan-pelan, lalu coba sekali lagi.',
  'Sudah mulai nyambung. Coba lagi supaya makin mantap.',
  'Bagus sekali! Tinggal sedikit lagi.',
  'Hebat! Semuanya tepat.',
]

function IsiTopik({ topik }: { topik: TopikRingkas }) {
  const [cari, setCari] = useSearchParams()
  const simpanan = useSimpanan()
  const progres = simpanan.topik[topik.id] ?? {}

  const [rinci, setRinci] = useState<TopikKurikulum | null>(null)
  const [tahap, setTahap] = useState<Tahap>('awal')
  const [soal, setSoal] = useState<Soal[]>([])
  const [hasil, setHasil] = useState<HasilSoal[]>([])

  useEffect(() => {
    aksi.bukaTopik(topik.id)
    let batal = false
    muatKelas(topik.kelas).then((daftar) => {
      if (!batal) setRinci(daftar.find((t) => t.id === topik.id) ?? null)
    })
    return () => {
      batal = true
    }
  }, [topik.id, topik.kelas])

  const mulai = async () => {
    setTahap('memuat')
    const s = await susunTesTopik(topik.id)
    if (s.length === 0) {
      setTahap('kosong')
      return
    }
    setSoal(s)
    setHasil([])
    setTahap('tes')
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }

  // Tombol "Tes" pada ubin topik membawa ?mulai=1: langsung masuk ke soal.
  const sudahOtomatis = useRef(false)
  useEffect(() => {
    if (!cari.get('mulai') || sudahOtomatis.current) return
    sudahOtomatis.current = true
    setCari({}, { replace: true })
    mulai()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const urutan = urutanTopikKelas(topik.kelas)
  const posisi = urutan.findIndex((t) => t.id === topik.id)
  const sebelum = posisi > 0 ? urutan[posisi - 1] : undefined
  const sesudah = posisi >= 0 && posisi < urutan.length - 1 ? urutan[posisi + 1] : undefined
  const konsep = (topik.konsep ?? []).filter(adaKonsep)

  /* ---------------- Sedang mengerjakan ---------------- */
  if (tahap === 'tes') {
    return (
      <div className="page section-rapat topik-tes" data-domain={topik.domain}>
        <p className="topik-tes-judul">
          <GambarTopik judul={topik.judul} domain={topik.domain} className="is-mini" />
          <span>{topik.judul}</span>
        </p>
        <SesiSoal
          soal={soal}
          labelKeluar="Berhenti"
          onKeluar={() => setTahap('awal')}
          onSelesai={(h) => {
            setHasil(h)
            aksi.catatTesTopik(topik.id, h.filter((x) => x.benar).length, h.length)
            setTahap('hasil')
            window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
          }}
        />
      </div>
    )
  }

  /* ---------------- Hasil ---------------- */
  if (tahap === 'hasil') {
    const benar = hasil.filter((h) => h.benar).length
    const bintang = bintangDari(hasil.length ? benar / hasil.length : 0)
    return (
      <div className="page section-rapat" data-domain={topik.domain}>
        <div className="card card-pad-lg topik-hasil">
          <span className="eyebrow">{topik.judul}</span>
          <Bintang n={bintang} besar hidup />
          <div className="tes-skor">
            {benar}
            <span className="tes-skor-dari"> dari {hasil.length}</span>
          </div>
          <p className="lead center" style={{ marginInline: 'auto' }}>
            {UCAPAN[bintang]}
          </p>

          <div className="row row-center topik-hasil-aksi">
            {bintang < 3 ? (
              <button className="btn btn-lg btn-primary" onClick={mulai}>
                <Ikon nama="ulang" /> Coba lagi
              </button>
            ) : sesudah ? (
              <Link className="btn btn-lg btn-primary" to={`/topik/${sesudah.id}`}>
                Topik berikutnya <Ikon nama="panah" />
              </Link>
            ) : null}
            {bintang === 3 && (
              <button className="btn btn-outline" onClick={mulai}>
                <Ikon nama="ulang" /> Soal baru
              </button>
            )}
            {bintang < 3 && sesudah && (
              <Link className="btn btn-outline" to={`/topik/${sesudah.id}`}>
                Topik berikutnya <Ikon nama="panah" />
              </Link>
            )}
            <Link className="btn btn-ghost" to={`/belajar/${topik.kelas}`}>
              Semua topik kelas {topik.kelas}
            </Link>
          </div>

          {konsep.length > 0 && bintang < 3 && (
            <div className="topik-hasil-saran">
              <span className="small muted">Mau lihat penjelasan bergambarnya dulu?</span>
              {konsep.map((idKonsep) => {
                const m = cariKonsepMeta(idKonsep)
                return m ? (
                  <Link key={idKonsep} className="btn btn-sm btn-why" to={`/konsep/${idKonsep}`}>
                    <Ikon nama="kenapa" /> {m.pertanyaan}
                  </Link>
                ) : null
              })}
            </div>
          )}

          <RekapSoal hasil={hasil} />
        </div>
      </div>
    )
  }

  /* ---------------- Halaman topik ---------------- */
  return (
    <div data-domain={topik.domain}>
      <header className="page topik-kepala">
        <div className="row row-tight">
          <Link to={`/belajar/${topik.kelas}`} className="chip chip-outline">
            <Ikon nama="prev" /> Kelas {topik.kelas}
          </Link>
          <span className="chip chip-domain">
            <span className="dot" /> {LABEL_DOMAIN[topik.domain]}
          </span>
          {topik.lanjut && (
            <span className="chip chip-pink" title="Hanya ada pada mata pelajaran Matematika Tingkat Lanjut">
              Tingkat Lanjut
            </span>
          )}
        </div>

        <div className="topik-hero">
          <GambarTopik judul={topik.judul} domain={topik.domain} className="is-besar" />
          <div className="stack stack-3 grow">
            <h1 className="topik-judul">{topik.judul}</h1>
            {rinci?.kenapa?.[0] && (
              <p className="topik-pancing">
                <Ikon nama="kenapa" /> {rinci.kenapa[0]}
              </p>
            )}
          </div>
        </div>
      </header>

      <div className="page stack stack-5">
        {/* ---------- Ajakan utama: tes ---------- */}
        <section className="card card-pad-lg kartu-tes" aria-labelledby="judul-tes">
          <div className="kartu-tes-isi">
            <Bintang n={progres.bintang ?? 0} besar />
            <div className="stack stack-1 grow">
              <h2 id="judul-tes" className="kartu-tes-judul">
                {progres.tes ? 'Mau coba lagi?' : 'Sudah paham topik ini?'}
              </h2>
              <p className="muted">
                {progres.tes
                  ? `Nilai terbaikmu ${Math.round((progres.terbaik ?? 0) * JUMLAH_SOAL_TES)} dari ${JUMLAH_SOAL_TES}. Soalnya berganti setiap kali.`
                  : `${JUMLAH_SOAL_TES} soal pendek. Kalau salah, ada petunjuknya.`}
              </p>
            </div>
          </div>
          {tahap === 'kosong' ? (
            <p className="note note-amber">Soal untuk topik ini sedang disiapkan. Coba topik lain dulu, ya.</p>
          ) : (
            <button className="btn btn-lg btn-primary kartu-tes-tombol" onClick={mulai} disabled={tahap === 'memuat'}>
              <Ikon nama="play" /> {tahap === 'memuat' ? 'Menyiapkan soal…' : 'Mulai tes'}
            </button>
          )}
        </section>

        {/* ---------- Penjelasan visual, bila ada ---------- */}
        {konsep.length > 0 && (
          <section className="stack stack-3">
            <h2 className="judul-kecil">Lihat kenapa</h2>
            <div className="grid grid-2">
              {konsep.map((idKonsep) => {
                const m = cariKonsepMeta(idKonsep)
                if (!m) return null
                return (
                  <Link key={idKonsep} to={`/konsep/${idKonsep}`} className="card card-link kartu-mendatar">
                    <GambarKonsep id={idKonsep} />
                    <span className="stack stack-1 grow">
                      <strong>{m.pertanyaan}</strong>
                      <span className="small muted">Gambar yang bisa kamu mainkan</span>
                    </span>
                    <Ikon nama="panah" />
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* ---------- Rincian, dilipat ---------- */}
        {rinci && (
          <section className="stack stack-2">
            <details className="lipat">
              <summary>
                <Ikon nama="belajar" /> Apa saja yang dipelajari? <span className="lipat-hitung">{rinci.subKonsep.length}</span>
              </summary>
              <p className="muted lipat-isi">{rinci.ringkas}.</p>
              <ul className="lipat-daftar">
                {rinci.subKonsep.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </details>

            {rinci.rumus && rinci.rumus.length > 0 && (
              <details className="lipat">
                <summary>
                  <Ikon nama="bongkar" /> Rumus dan aturan kunci <span className="lipat-hitung">{rinci.rumus.length}</span>
                </summary>
                <ul className="lipat-daftar lipat-rumus">
                  {rinci.rumus.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </details>
            )}

            {rinci.miskonsepsi && rinci.miskonsepsi.length > 0 && (
              <details className="lipat">
                <summary>
                  <Ikon nama="petunjuk" /> Yang sering keliru <span className="lipat-hitung">{rinci.miskonsepsi.length}</span>
                </summary>
                <ul className="lipat-daftar">
                  {rinci.miskonsepsi.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </details>
            )}
          </section>
        )}

        {/* ---------- Prasyarat ---------- */}
        {topik.prasyarat.length > 0 && (
          <section className="stack stack-3">
            <h2 className="judul-kecil">Sebaiknya sudah paham</h2>
            <div className="rak-mini">
              {topik.prasyarat.map((p) => {
                const pt = cariTopik(p)
                if (!pt) return null
                return (
                  <Link key={p} to={`/topik/${pt.id}`} className="ubin-mini" data-domain={pt.domain}>
                    <GambarTopik judul={pt.judul} domain={pt.domain} className="is-mini" />
                    <span className="grow">
                      <span className="ubin-mini-judul">{pt.judul}</span>
                      <span className="tiny dim">Kelas {pt.kelas}</span>
                    </span>
                    <Bintang n={simpanan.topik[pt.id]?.bintang ?? 0} />
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        <nav className="row row-between" style={{ marginTop: 'var(--s-4)' }} aria-label="Topik lain">
          {sebelum ? (
            <Link className="btn btn-outline topik-pindah" to={`/topik/${sebelum.id}`}>
              <Ikon nama="prev" /> <span>{sebelum.judul}</span>
            </Link>
          ) : (
            <span />
          )}
          {sesudah && (
            <Link className="btn btn-outline topik-pindah" to={`/topik/${sesudah.id}`}>
              <span>{sesudah.judul}</span> <Ikon nama="panah" />
            </Link>
          )}
        </nav>
      </div>
    </div>
  )
}
