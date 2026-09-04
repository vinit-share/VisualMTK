/* ============================================================
   Visual MTK — Latihan soal
   "Kasih aku soal." Pilih jumlah, kelas, dan tingkat kesulitan.
   Salah bukan akhir: ada petunjuk bertahap dan tautan kembali
   ke penjelasan visualnya.
   ============================================================ */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Ikon } from '../components/Ikon'
import { SoalView } from '../components/SoalView'
import { bangunSesi } from '../lib/sesi'
import { aksi } from '../lib/store'
import type { Soal } from '../lib/types'

type Tingkat = 'campuran' | 'mudah' | 'sedang' | 'sulit'

const JUMLAH = [5, 10, 15]
const RENTANG = [
  { id: 'semua', label: 'Semua kelas', min: 1, max: 12 },
  { id: 'sd', label: 'SD (1–6)', min: 1, max: 6 },
  { id: 'smp', label: 'SMP (7–9)', min: 7, max: 9 },
  { id: 'sma', label: 'SMA (10–12)', min: 10, max: 12 },
]
const TINGKAT: { id: Tingkat; label: string }[] = [
  { id: 'campuran', label: 'Campuran' },
  { id: 'mudah', label: 'Mudah' },
  { id: 'sedang', label: 'Sedang' },
  { id: 'sulit', label: 'Sulit' },
]

export default function TesPage() {
  const [jumlah, setJumlah] = useState(5)
  const [rentang, setRentang] = useState('semua')
  const [tingkat, setTingkat] = useState<Tingkat>('campuran')

  const [soal, setSoal] = useState<Soal[] | null>(null)
  const [idx, setIdx] = useState(0)
  const [hasil, setHasil] = useState<{ soal: Soal; benar: boolean }[]>([])
  const [memuat, setMemuat] = useState(false)
  // Layar hasil baru muncul setelah pengguna menekan "Selesai" pada soal
  // terakhir, supaya pembahasan soal terakhir sempat terbaca.
  const [selesai, setSelesai] = useState(false)

  const mulai = async () => {
    const r = RENTANG.find((x) => x.id === rentang)!
    setMemuat(true)
    const s = await bangunSesi({ jumlah, kelasMin: r.min, kelasMax: r.max, tingkat })
    setMemuat(false)
    setSoal(s)
    setIdx(0)
    setHasil([])
    setSelesai(false)
  }

  /* ---------------- Layar pengaturan ---------------- */
  if (!soal) {
    return (
      <>
        <header className="page kepala stack stack-4">
          <span className="eyebrow row-tight" style={{ display: 'inline-flex' }}>
            <Ikon nama="tes" /> Tes saya
          </span>
          <h1>Kasih aku soal</h1>
          <p className="lead">
            Kalau jawabanmu meleset, kamu tidak akan sekadar diberi tahu "salah". Kamu akan diberi
            petunjuk bertahap sampai ketemu sendiri di bagian mana yang keliru.
          </p>
        </header>

        <div className="page">
          <div className="card card-pad-lg tes-atur">
            <div className="pilih-baris">
              <span>Berapa soal?</span>
              <div className="segmented">
                {JUMLAH.map((n) => (
                  <button
                    key={n}
                    className={jumlah === n ? 'is-active' : ''}
                    onClick={() => setJumlah(n)}
                  >
                    {n} soal
                  </button>
                ))}
              </div>
            </div>

            <div className="pilih-baris">
              <span>Materi kelas berapa?</span>
              <div className="segmented">
                {RENTANG.map((r) => (
                  <button
                    key={r.id}
                    className={rentang === r.id ? 'is-active' : ''}
                    onClick={() => setRentang(r.id)}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pilih-baris">
              <span>Tingkat kesulitan</span>
              <div className="segmented">
                {TINGKAT.map((t) => (
                  <button
                    key={t.id}
                    className={tingkat === t.id ? 'is-active' : ''}
                    onClick={() => setTingkat(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <button className="btn btn-lg btn-primary" onClick={mulai} disabled={memuat}>
              {memuat ? 'Menyiapkan soal…' : 'Mulai latihan'} <Ikon nama="panah" />
            </button>
          </div>
        </div>
      </>
    )
  }

  if (soal.length === 0) {
    return (
      <div className="page section stack stack-4">
        <h1>Belum ada soal untuk pilihan itu</h1>
        <p className="lead">Coba ganti kelas atau tingkat kesulitannya.</p>
        <div>
          <button className="btn btn-primary" onClick={() => setSoal(null)}>
            Ubah pilihan
          </button>
        </div>
      </div>
    )
  }

  /* ---------------- Layar hasil ---------------- */
  if (selesai) {
    const benar = hasil.filter((h) => h.benar).length
    const persen = Math.round((benar / hasil.length) * 100)
    return (
      <div className="page section">
        <div className="card card-pad-lg tes-hasil">
          <span className="eyebrow">Selesai</span>
          <div className="tes-skor">
            {benar}/{hasil.length}
          </div>
          <p className="lead center" style={{ marginInline: 'auto' }}>
            {persen >= 80
              ? 'Bagus. Yang penting bukan angkanya, tapi kamu tahu alasannya.'
              : persen >= 50
                ? 'Sudah jalan. Yang belum tepat justru bagian paling berharga untuk ditengok lagi.'
                : 'Tidak apa-apa. Balik dulu ke penjelasan visualnya, lalu coba lagi.'}
          </p>

          <div className="tes-rekap">
            {hasil.map((h, i) => (
              <div key={h.soal.id} className="rekap-item">
                <span className="rekap-tanda" data-benar={h.benar}>
                  <Ikon nama={h.benar ? 'cek' : 'silang'} />
                </span>
                <span className="grow">
                  {i + 1}. {h.soal.pertanyaan}
                </span>
                {h.soal.konsep && (
                  <Link className="btn btn-sm btn-ghost" to={`/konsep/${h.soal.konsep}`}>
                    Kenapa?
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="row row-center" style={{ marginTop: 'var(--s-8)' }}>
            <button className="btn btn-primary" onClick={mulai}>
              <Ikon nama="ulang" /> Soal baru
            </button>
            <button className="btn btn-outline" onClick={() => setSoal(null)}>
              Ubah pilihan
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ---------------- Layar mengerjakan ---------------- */
  const sekarang = soal[idx]
  return (
    <div className="page section">
      <div className="tes-progres">
        <button className="btn btn-sm btn-ghost" onClick={() => setSoal(null)}>
          <Ikon nama="prev" /> Keluar
        </button>
        <div className="bar grow" aria-hidden="true">
          <i style={{ width: `${(hasil.length / soal.length) * 100}%` }} />
        </div>
        <span className="tiny dim nowrap">
          {hasil.length}/{soal.length}
        </span>
      </div>

      <div className="card card-pad-lg">
        <SoalView
          key={sekarang.id}
          soal={sekarang}
          nomor={idx + 1}
          total={soal.length}
          labelLanjut={idx < soal.length - 1 ? 'Lanjut' : 'Lihat hasil'}
          onJawab={(benar) => {
            if (sekarang.konsep) aksi.jawab(sekarang.konsep, benar)
            setHasil((h) => [...h, { soal: sekarang, benar }])
          }}
          onLanjut={() => {
            if (idx < soal.length - 1) {
              setIdx(idx + 1)
            } else {
              aksi.selesaiSesiTes()
              setSelesai(true)
            }
          }}
        />
      </div>
    </div>
  )
}
