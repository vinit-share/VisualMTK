/* ============================================================
   Visual MTK — Progres
   Angka-angka di sini bukan nilai rapor. Yang dirayakan adalah
   "aku ngerti", bukan "aku dapat poin".
   ============================================================ */

import { Link } from 'react-router-dom'
import { Ikon, type NamaIkon } from '../components/Ikon'
import { Cincin, StatusLencana } from '../components/StatusLencana'
import { konsepSiap, LABEL_DOMAIN } from '../data/katalog'
import { KELAS, topikKelas } from '../data/kurikulum'
import {
  aksi,
  jumlahBintang,
  LABEL_STATUS,
  MAKS_BINTANG,
  NILAI_STATUS,
  statusKonsep,
  useSimpanan,
} from '../lib/store'
import type { Status } from '../lib/types'

interface Lencana {
  id: string
  nama: string
  syarat: string
  ikon: NamaIkon
}

const LENCANA: Lencana[] = [
  { id: 'mulai', nama: 'Langkah pertama', syarat: 'Membuka satu konsep', ikon: 'belajar' },
  { id: 'bongkar3', nama: 'Pembongkar', syarat: 'Menuntaskan 3 animasi bongkar', ikon: 'bongkar' },
  { id: 'paham5', nama: 'Sudah nyambung', syarat: 'Memahami 5 konsep', ikon: 'lampu' },
  { id: 'mastered1', nama: 'Bertahan sehari', syarat: 'Menguasai 1 konsep', ikon: 'bintang' },
  { id: 'streak3', nama: 'Tiga hari beruntun', syarat: 'Belajar 3 hari berturut-turut', ikon: 'api' },
  { id: 'streak7', nama: 'Seminggu penuh', syarat: 'Belajar 7 hari berturut-turut', ikon: 'api' },
  { id: 'soal50', nama: 'Lima puluh soal', syarat: 'Menjawab 50 soal', ikon: 'tes' },
  { id: 'bintang3', nama: 'Tiga bintang', syarat: 'Meraih 3 bintang pada satu topik', ikon: 'bintang' },
  { id: 'bintang30', nama: 'Kolektor bintang', syarat: 'Mengumpulkan 30 bintang', ikon: 'bintang' },
  { id: 'jenjang3', nama: 'Lintas jenjang', syarat: 'Menyentuh konsep SD, SMP, dan SMA', ikon: 'peta' },
]

export default function ProgresPage() {
  const s = useSimpanan()
  const semua = konsepSiap()

  const status = semua.map((m) => ({ meta: m, st: statusKonsep(s.konsep[m.id]) }))
  const hitung = (x: Status) => status.filter((k) => k.st === x).length
  const skor = status.length
    ? status.reduce((a, k) => a + NILAI_STATUS[k.st], 0) / status.length
    : 0

  const bongkarSelesai = Object.values(s.konsep).filter((k) => k.bongkar).length
  const jenjangDisentuh = new Set(
    status
      .filter((k) => k.st !== 'none')
      .map((k) => (k.meta.kelas <= 6 ? 'SD' : k.meta.kelas <= 9 ? 'SMP' : 'SMA')),
  )

  const dapat: Record<string, boolean> = {
    mulai: status.some((k) => k.st !== 'none'),
    bongkar3: bongkarSelesai >= 3,
    paham5: hitung('understood') + hitung('mastered') >= 5,
    mastered1: hitung('mastered') >= 1,
    streak3: s.streak.terpanjang >= 3,
    streak7: s.streak.terpanjang >= 7,
    soal50: s.tes.total >= 50,
    jenjang3: jenjangDisentuh.size >= 3,
  }

  const ketepatan = s.tes.total ? Math.round((s.tes.benar / s.tes.total) * 100) : 0

  // Bintang dari tes topik, per kelas.
  const bintangKelas = KELAS.map((k) => {
    const ids = topikKelas(k.no).map((t) => t.id)
    return { no: k.no, bintang: jumlahBintang(s.topik, ids), maks: ids.length * MAKS_BINTANG }
  })
  const totalBintang = bintangKelas.reduce((a, k) => a + k.bintang, 0)
  const topikDites = Object.values(s.topik).filter((t) => (t.tes ?? 0) > 0).length
  dapat.bintang3 = Object.values(s.topik).some((t) => (t.bintang ?? 0) >= 3)
  dapat.bintang30 = totalBintang >= 30

  return (
    <>
      <header className="page kepala stack stack-4">
        <span className="eyebrow row-tight" style={{ display: 'inline-flex' }}>
          <Ikon nama="progres" /> Progres
        </span>
        <h1>Sejauh mana kamu sudah mengerti</h1>
        <p className="lead">
          Status "Dikuasai" tidak diberikan hanya karena kamu membaca sampai habis. Ia muncul kalau
          kamu masih bisa menjawab benar di hari yang berbeda — tanda pemahaman itu bertahan.
        </p>
      </header>

      <div className="page stack stack-8">
        <div className="progres-atas">
          <div className="card angka-kartu">
            <div className="row row-tight">
              <Cincin nilai={skor} ukuran={52} label="Kemajuan keseluruhan" />
              <div className="stack stack-1">
                <span className="tiny dim">Kemajuan</span>
                <strong>{Math.round(skor * 100)}%</strong>
              </div>
            </div>
          </div>
          <div className="card angka-kartu">
            <span className="angka-besar">{hitung('mastered')}</span>
            <span className="tiny dim">konsep dikuasai</span>
          </div>
          <div className="card angka-kartu">
            <span className="angka-besar row row-tight row-nowrap">
              <Ikon nama="bintang" ukuran="0.8em" className="warna-bintang" /> {totalBintang}
            </span>
            <span className="tiny dim">bintang dari {topikDites} topik yang sudah dites</span>
          </div>
          <div className="card angka-kartu">
            <span className="angka-besar">{s.streak.hitung}</span>
            <span className="tiny dim">
              hari beruntun {s.streak.terpanjang > 0 && `· rekor ${s.streak.terpanjang}`}
            </span>
          </div>
          <div className="card angka-kartu">
            <span className="angka-besar">{ketepatan}%</span>
            <span className="tiny dim">
              ketepatan dari {s.tes.total} soal
            </span>
          </div>
        </div>

        {/* ---------- Bintang per kelas ---------- */}
        <section className="stack stack-4">
          <h2 style={{ fontSize: 'var(--t-xl)' }}>Bintang tiap kelas</h2>
          <div className="bintang-kelas">
            {bintangKelas.map((k) => (
              <Link key={k.no} to={`/belajar/${k.no}`} className="bintang-kelas-item">
                <strong>Kelas {k.no}</strong>
                <span className="tiny dim">
                  {k.bintang} / {k.maks}
                </span>
                <div className="bar" aria-hidden="true">
                  <i style={{ width: `${k.maks ? Math.round((k.bintang / k.maks) * 100) : 0}%` }} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ---------- Sebaran status ---------- */}
        <section className="stack stack-4">
          <h2 style={{ fontSize: 'var(--t-xl)' }}>Status tiap konsep</h2>
          <div className="row row-tight">
            {(['none', 'learning', 'understood', 'mastered'] as Status[]).map((st) => (
              <span key={st} className="status-lencana" data-status={st}>
                {hitung(st)} {LABEL_STATUS[st].toLowerCase()}
              </span>
            ))}
          </div>
          <div className="stack stack-2">
            {status
              .sort((a, b) => a.meta.kelas - b.meta.kelas)
              .map(({ meta, st }) => (
                <Link key={meta.id} to={`/konsep/${meta.id}`} className="topik-item" data-punya="true">
                  <span className="topik-tanda">{meta.kelas}</span>
                  <div className="grow stack stack-1">
                    <strong className="small">{meta.pertanyaan}</strong>
                    <span className="tiny dim">{LABEL_DOMAIN[meta.domain]}</span>
                  </div>
                  <StatusLencana status={st} />
                </Link>
              ))}
          </div>
        </section>

        {/* ---------- Lencana ---------- */}
        <section className="stack stack-4">
          <h2 style={{ fontSize: 'var(--t-xl)' }}>Lencana</h2>
          <div className="lencana-grid">
            {LENCANA.map((l) => (
              <div key={l.id} className="lencana" data-dapat={!!dapat[l.id]}>
                <span className="lencana-ikon">
                  <Ikon nama={l.ikon} />
                </span>
                <div className="stack stack-1">
                  <strong className="small">{l.nama}</strong>
                  <span className="tiny dim">{l.syarat}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Pengaturan ---------- */}
        <section className="stack stack-4">
          <h2 style={{ fontSize: 'var(--t-xl)' }}>Pengaturan</h2>
          <div className="card card-pad-lg stack stack-5">
            <div className="pilih-baris">
              <span>Kedalaman penjelasan yang kamu sukai</span>
              <div className="segmented">
                {(['SD', 'SMP', 'SMA'] as const).map((l) => (
                  <button
                    key={l}
                    className={s.pengaturan.level === l ? 'is-active' : ''}
                    onClick={() => aksi.aturPengaturan({ level: l })}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div className="pilih-baris">
              <span>Tema</span>
              <div className="segmented">
                {(['auto', 'terang', 'gelap'] as const).map((t) => (
                  <button
                    key={t}
                    className={s.pengaturan.tema === t ? 'is-active' : ''}
                    onClick={() => aksi.aturPengaturan({ tema: t })}
                  >
                    {t === 'auto' ? 'Ikut sistem' : t === 'terang' ? 'Terang' : 'Gelap'}
                  </button>
                ))}
              </div>
            </div>
            <div className="note">
              <p>
                Semua kemajuan tersimpan di peramban ini saja. Kalau kamu menghapus data situs,
                kemajuannya ikut terhapus.
              </p>
              <button
                className="btn btn-sm btn-outline"
                style={{ marginTop: 'var(--s-3)' }}
                onClick={() => {
                  if (confirm('Hapus semua kemajuan belajar? Tindakan ini tidak bisa dibatalkan.'))
                    aksi.reset()
                }}
              >
                Hapus semua kemajuan
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
