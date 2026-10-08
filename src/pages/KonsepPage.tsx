/* ============================================================
   Visual MTK — Halaman konsep
   Alurnya sengaja tetap: pancing rasa penasaran, minta menebak,
   perlihatkan, biarkan dimainkan, baru jelaskan, baru rumus,
   baru diuji. Rumus datang paling akhir, bukan paling awal.
   ============================================================ */

import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Bongkar } from '../components/Bongkar'
import { Eksperimen } from '../components/Eksperimen'
import { Formula, SorotProvider } from '../components/Formula'
import { Ikon } from '../components/Ikon'
import { SoalView } from '../components/SoalView'
import { StatusLencana } from '../components/StatusLencana'
import { Tebak } from '../components/Tebak'
import { seededRandom } from '../lib/num'
import { aksi, statusKonsep, useKonsepProgress, useSimpanan } from '../lib/store'
import type { Konsep, Level, Soal } from '../lib/types'
import { muatKonsep } from '../concepts/registry'
import { cariKonsepMeta, LABEL_DOMAIN } from '../data/katalog'
import { GambarKonsep } from '../visuals/GambarKonsep'

export default function KonsepPage() {
  const { id = '' } = useParams()
  const [konsep, setKonsep] = useState<Konsep | null>(null)
  const [gagal, setGagal] = useState(false)

  useEffect(() => {
    let batal = false
    setKonsep(null)
    setGagal(false)
    muatKonsep(id).then((k) => {
      if (batal) return
      if (k) {
        setKonsep(k)
        aksi.bukaKonsep(k.id)
      } else setGagal(true)
    })
    return () => {
      batal = true
    }
  }, [id])

  if (gagal) {
    const meta = cariKonsepMeta(id)
    return (
      <div className="page section stack stack-4">
        <h1>Konsep ini belum tersedia</h1>
        <p className="lead">
          {meta
            ? `"${meta.judul}" sudah ada di peta kurikulum, tetapi visualisasinya belum dibuat.`
            : 'Alamatnya mungkin salah ketik.'}
        </p>
        <div>
          <Link className="btn btn-primary" to="/kenapa">
            Lihat konsep yang sudah siap <Ikon nama="panah" />
          </Link>
        </div>
      </div>
    )
  }

  if (!konsep) return <MemuatKonsep />

  return <IsiKonsep konsep={konsep} />
}

function MemuatKonsep() {
  return (
    <div className="page section stack stack-6" aria-busy="true">
      <div className="rangka rangka-judul" />
      <div className="rangka rangka-stage" />
      <div className="rangka rangka-baris" />
    </div>
  )
}

function IsiKonsep({ konsep: k }: { konsep: Konsep }) {
  const progres = useKonsepProgress(k.id)
  const simpanan = useSimpanan()
  const status = statusKonsep(progres)
  const [level, setLevel] = useState<Level>(simpanan.pengaturan.level)
  const soalRef = useRef<HTMLDivElement>(null)

  const soalTerpakai = useMemo(() => bangunSoal(k), [k])
  const [idxSoal, setIdxSoal] = useState(0)

  const levelTersedia = (['SD', 'SMP', 'SMA'] as Level[]).filter((l) => k.penjelasan[l])
  const levelAktif = k.penjelasan[level] ? level : levelTersedia[0]

  // Kelas diambil dari katalog (yang tertaut ke peta kurikulum resmi),
  // dengan nilai di modul sebagai cadangan.
  const kelas = cariKonsepMeta(k.id)?.kelas ?? k.kelas

  return (
    <article className="konsep">
      {/* ---------- Kepala ---------- */}
      <header className="konsep-hero">
        <div className="page stack stack-4">
          <div className="row row-tight">
            <Link to="/kenapa" className="chip chip-outline">
              <Ikon nama="prev" /> Semua konsep
            </Link>
            <span className="chip chip-brand">Kelas {kelas}</span>
            <span className="chip">{LABEL_DOMAIN[k.domain]}</span>
            <StatusLencana status={status} />
          </div>
          <h1 className="konsep-tanya">{k.pertanyaan}</h1>
          <p className="lead">{k.tagline}</p>
        </div>
      </header>

      <div className="page konsep-isi">
        {/* ---------- 1. Tebak dulu ---------- */}
        {k.tebak && (
          <section className="blok" aria-labelledby="b-tebak">
            <h2 id="b-tebak" className="sr-only">
              Tebak dulu
            </h2>
            <div className="card card-pad-lg">
              <Tebak
                data={k.tebak}
                awal={progres.tebak}
                onPilih={(id) => aksi.simpanTebakan(k.id, id)}
              />
            </div>
          </section>
        )}

        {/* ---------- 2. Bongkar rumus ---------- */}
        <section className="blok" aria-labelledby="b-bongkar">
          <h2 id="b-bongkar" className="blok-judul">
            Lihat rumusnya terbentuk
          </h2>
          <p className="blok-sub">
            Tekan putar. Perhatikan bentuknya berubah — rumusnya muncul dari situ.
          </p>
          <div className="card card-pad-lg card-visual">
            <Bongkar scene={k.bongkar} onSelesai={() => aksi.selesaiBongkar(k.id)} />
          </div>
        </section>

        {/* ---------- 3. Eksperimen ---------- */}
        {k.eksperimen && (
          <section className="blok" aria-labelledby="b-eksperimen">
            <h2 id="b-eksperimen" className="blok-judul">
              Sekarang kamu yang mainkan
            </h2>
            <p className="blok-sub">
              Ubah angkanya sesukamu. Perhatikan apa yang ikut berubah, dan apa yang tetap.
            </p>
            <div className="card card-pad-lg card-visual">
              <Eksperimen
                judul={k.eksperimen.judul}
                ajakan={k.eksperimen.ajakan}
                params={k.eksperimen.params}
                Visual={k.eksperimen.Visual}
                temuan={k.eksperimen.temuan}
                rumus={k.eksperimen.rumus}
                roles={k.rumus.roles}
                arti={k.rumus.arti}
              />
            </div>
          </section>
        )}

        {/* ---------- 4. Penjelasan bertingkat ---------- */}
        <section className="blok" aria-labelledby="b-paham">
          <div className="row row-between">
            <h2 id="b-paham" className="blok-judul">
              Jadi, apa yang sebenarnya terjadi?
            </h2>
            {levelTersedia.length > 1 && (
              <div className="segmented" role="tablist" aria-label="Kedalaman penjelasan">
                {levelTersedia.map((l) => (
                  <button
                    key={l}
                    role="tab"
                    aria-selected={levelAktif === l}
                    onClick={() => {
                      setLevel(l)
                      aksi.aturPengaturan({ level: l })
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="card card-pad-lg penjelasan prose">
            {levelAktif ? k.penjelasan[levelAktif] : null}
          </div>
        </section>

        {/* ---------- 5. Rumus interaktif ---------- */}
        <section className="blok" aria-labelledby="b-rumus">
          <h2 id="b-rumus" className="blok-judul">
            Baru sekarang rumusnya
          </h2>
          <p className="blok-sub">
            Sentuh tiap bagian rumus untuk melihat bagian mana yang diwakilinya.
          </p>
          <div className="card card-pad-lg rumus-akhir">
            <SorotProvider>
              <Formula src={k.rumus.src} roles={k.rumus.roles} arti={k.rumus.arti} size="xl" />
            </SorotProvider>
          </div>
        </section>

        {/* ---------- 6. Mini tes ---------- */}
        {soalTerpakai.length > 0 && (
          <section className="blok" aria-labelledby="b-soal" ref={soalRef}>
            <h2 id="b-soal" className="blok-judul">
              Coba sendiri
            </h2>
            <p className="blok-sub">
              Bukan untuk dinilai. Ini cara memastikan yang tadi benar-benar nempel.
            </p>
            <div className="card card-pad-lg">
              <SoalView
                key={soalTerpakai[idxSoal].id}
                soal={soalTerpakai[idxSoal]}
                nomor={idxSoal + 1}
                total={soalTerpakai.length}
                onJawab={(benar) => aksi.jawab(k.id, benar)}
                onLanjut={
                  idxSoal < soalTerpakai.length - 1 ? () => setIdxSoal((i) => i + 1) : undefined
                }
              />
            </div>
          </section>
        )}

        {/* ---------- 7. Aku sudah paham ---------- */}
        <section className="blok">
          <div className="card card-pad-lg paham-kotak">
            <div className="grow stack stack-2">
              <h3>Sudah terasa masuk akal?</h3>
              <p className="muted">
                Tandai kalau kamu sudah bisa menjelaskan ulang ini dengan bahasamu sendiri.
                Status "Dikuasai" muncul sendiri setelah kamu masih benar di hari berikutnya.
              </p>
            </div>
            <button
              className={`btn btn-lg ${progres.paham ? 'btn-soft' : 'btn-primary'}`}
              onClick={() => aksi.tandaiPaham(k.id, !progres.paham)}
              aria-pressed={!!progres.paham}
            >
              <Ikon nama={progres.paham ? 'cek' : 'lampu'} />
              {progres.paham ? 'Aku sudah paham' : 'Aku sudah paham'}
            </button>
          </div>
        </section>

        {/* ---------- 8. Lanjut ---------- */}
        {k.lanjut && k.lanjut.length > 0 && (
          <section className="blok">
            <h2 className="blok-judul">Kalau ini masuk akal, coba yang ini</h2>
            <div className="galeri">
              {k.lanjut.map((id) => {
                const m = cariKonsepMeta(id)
                if (!m) return null
                return (
                  <Link key={id} to={`/konsep/${id}`} className="card card-link kartu-gambar" title={m.tagline}>
                    <GambarKonsep id={id} />
                    <span className="kartu-gambar-judul">{m.pertanyaan}</span>
                    <span className="kartu-gambar-kaki">Kelas {m.kelas}</span>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}

/** Soal statis dipakai apa adanya; generator dijalankan dengan benih tetap per sesi. */
function bangunSoal(k: Konsep): Soal[] {
  const rnd = seededRandom(k.id.split('').reduce((a, c) => a + c.charCodeAt(0), 17))
  return k.soal.map((s) => (typeof s === 'function' ? s(rnd) : s))
}
