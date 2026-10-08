/* ============================================================
   Visual MTK — Beranda
   Tugas halaman ini bukan memamerkan daftar materi, melainkan
   membuat seseorang tahu harus mulai dari mana — dan penasaran
   dalam sepuluh detik pertama.
   ============================================================ */

import { Link } from 'react-router-dom'
import { HeroVisual } from '../components/HeroVisual'
import { Ikon, type NamaIkon } from '../components/Ikon'
import { Cincin, StatusLencana } from '../components/StatusLencana'
import { konsepSiap, LABEL_DOMAIN } from '../data/katalog'
import { hariIni, NILAI_STATUS, statusKonsep, useSimpanan } from '../lib/store'
import { seededRandom } from '../lib/num'
import { GambarKonsep } from '../visuals/GambarKonsep'

const PINTU: { ke: string; label: string; sub: string; ikon: NamaIkon; warna: string }[] = [
  {
    ke: '/belajar',
    label: 'Mulai belajar',
    sub: 'Ikuti jalurnya dari kelas 1 sampai kelas 12',
    ikon: 'belajar',
    warna: 'brand',
  },
  {
    ke: '/kenapa',
    label: 'Cari tahu "Kenapa?"',
    sub: 'Rumus-rumus yang sering dihafal, dibongkar satu per satu',
    ikon: 'kenapa',
    warna: 'amber',
  },
  {
    ke: '/eksperimen',
    label: 'Eksperimen',
    sub: 'Geser, putar, ubah angkanya — temukan polanya sendiri',
    ikon: 'eksperimen',
    warna: 'teal',
  },
  {
    ke: '/tes',
    label: 'Tes saya',
    sub: 'Latihan soal dengan petunjuk bertahap, bukan sekadar benar-salah',
    ikon: 'tes',
    warna: 'blue',
  },
]

const TAHAP = [
  { no: '1', judul: 'Lihat', teks: 'Sebuah bentuk atau pola muncul di depanmu. Belum ada rumus.' },
  { no: '2', judul: 'Mainkan', teks: 'Geser, potong, putar. Kamu yang mengendalikan angkanya.' },
  { no: '3', judul: 'Pahami', teks: 'Baru dijelaskan apa yang sebenarnya barusan terjadi.' },
  { no: '4', judul: 'Rumus', teks: 'Rumusnya datang terakhir — sebagai kesimpulan, bukan hafalan.' },
]

export default function Beranda() {
  const simpanan = useSimpanan()
  const siap = konsepSiap()

  const dikerjakan = siap
    .map((m) => ({ meta: m, p: simpanan.konsep[m.id] }))
    .filter((x) => x.p?.dibuka)
    .sort((a, b) => (b.p?.dibuka ?? 0) - (a.p?.dibuka ?? 0))

  const lanjut = dikerjakan.find((x) => statusKonsep(x.p) !== 'mastered') ?? dikerjakan[0]

  const total = siap.length || 1
  const skor =
    siap.reduce((a, m) => a + NILAI_STATUS[statusKonsep(simpanan.konsep[m.id])], 0) / total

  // Sorotan hari ini dipilih tetap sepanjang hari, sama untuk siapa pun.
  const rnd = seededRandom(
    hariIni()
      .split('-')
      .reduce((a, s) => a * 100 + Number(s), 7),
  )
  const urutHariIni = siap
    .map((m) => ({ m, k: rnd() }))
    .sort((a, b) => a.k - b.k)
    .map((x) => x.m)
  const sorotan = urutHariIni.slice(0, 4)
  const harianSelesai = !!simpanan.harian[hariIni()]?.selesai

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="hero">
        <div className="page hero-grid">
          <div className="hero-teks stack stack-5">
            <span className="chip chip-brand hero-chip">
              <Ikon nama="lampu" /> Matematika yang bisa dilihat
            </span>
            <h1 className="hero-judul">
              Jangan cuma hafal.
              <br />
              <span className="hero-tekan">Lihat kenapa.</span>
            </h1>
            <p className="lead">
              Kamu mungkin hafal <em>L = πr²</em>. Tapi kenapa π? Kenapa 3,14? Di Visual MTK setiap
              rumus dibongkar sampai kelihatan dari mana asalnya — lalu kamu yang memainkannya.
            </p>
            <div className="row row-tight">
              <Link className="btn btn-lg btn-primary" to="/belajar">
                <Ikon nama="belajar" /> Mulai belajar
              </Link>
              <Link className="btn btn-lg btn-why" to="/kenapa">
                <Ikon nama="kenapa" /> Cari tahu "Kenapa?"
              </Link>
            </div>
          </div>

          <div className="hero-panggung card card-pad-lg">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* ---------------- Lanjutkan ---------------- */}
      {lanjut && (
        <section className="page">
          <div className="card card-pad-lg lanjut-kotak">
            <Cincin nilai={skor} ukuran={62} label={`Kemajuan ${Math.round(skor * 100)} persen`} />
            <div className="grow stack stack-1">
              <span className="eyebrow">Lanjutkan belajar</span>
              <h3>{lanjut.meta.pertanyaan}</h3>
              <div className="row row-tight">
                <StatusLencana status={statusKonsep(lanjut.p)} />
                <span className="chip chip-outline">Kelas {lanjut.meta.kelas}</span>
              </div>
            </div>
            <Link className="btn btn-primary" to={`/konsep/${lanjut.meta.id}`}>
              Lanjut <Ikon nama="panah" />
            </Link>
          </div>
        </section>
      )}

      {/* ---------------- Empat pintu masuk ---------------- */}
      <section className="page section-rapat">
        <div className="grid grid-auto">
          {PINTU.map((p) => (
            <Link key={p.ke} to={p.ke} className="card card-link pintu" data-warna={p.warna}>
              <span className="pintu-ikon">
                <Ikon nama={p.ikon} ukuran="1.5em" />
              </span>
              <h3 className="pintu-judul">{p.label}</h3>
              <p className="small muted">{p.sub}</p>
              <span className="pintu-panah">
                <Ikon nama="panah" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------- Tantangan harian ---------------- */}
      <section className="page section-rapat">
        <Link to="/harian" className="card card-link harian-kotak">
          <span className="harian-ikon">
            <Ikon nama="kalender" ukuran="1.4em" />
          </span>
          <div className="grow stack stack-1">
            <span className="eyebrow">Tantangan hari ini</span>
            <h3>{harianSelesai ? 'Sudah kamu selesaikan hari ini' : 'Tiga soal. Lima menit.'}</h3>
            <p className="small muted">
              {harianSelesai
                ? 'Datang lagi besok untuk tantangan berikutnya — dan jaga runtutan harimu.'
                : 'Soalnya berganti tiap hari dan diambil dari materi yang berbeda-beda.'}
            </p>
          </div>
          {simpanan.streak.hitung > 0 && (
            <span className="chip chip-amber">
              <Ikon nama="api" /> {simpanan.streak.hitung} hari
            </span>
          )}
        </Link>
      </section>

      {/* ---------------- Cara kerjanya ---------------- */}
      <section className="page section">
        <div className="stack stack-3" style={{ marginBottom: 'var(--s-8)' }}>
          <span className="eyebrow">Cara kerjanya</span>
          <h2>Rumus selalu datang terakhir</h2>
          <p className="lead">
            Urutan yang biasa dipakai di sekolah adalah rumus dulu, paham belakangan. Di sini
            urutannya dibalik.
          </p>
        </div>
        <ol className="tahap-grid">
          {TAHAP.map((t) => (
            <li key={t.no} className="tahap">
              <span className="tahap-no">{t.no}</span>
              <h4>{t.judul}</h4>
              <p className="small muted">{t.teks}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------- Sorotan konsep ---------------- */}
      <section className="page section-rapat">
        <div className="row row-between" style={{ marginBottom: 'var(--s-5)' }}>
          <div className="stack stack-1">
            <span className="eyebrow">Pertanyaan hari ini</span>
            <h2>Yang sering dihafal, jarang dimengerti</h2>
          </div>
          <Link className="btn btn-outline" to="/kenapa">
            Semua konsep <Ikon nama="panah" />
          </Link>
        </div>
        <div className="galeri">
          {sorotan.map((m) => (
            <Link key={m.id} to={`/konsep/${m.id}`} className="card card-link kartu-gambar" title={m.tagline}>
              <GambarKonsep id={m.id} />
              <span className="kartu-gambar-judul">{m.pertanyaan}</span>
              <span className="kartu-gambar-kaki">
                <span>
                  Kelas {m.kelas} · {LABEL_DOMAIN[m.domain]}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------- Cakupan ---------------- */}
      <section className="page section">
        <div className="card card-pad-lg cakupan">
          <div className="stack stack-3 grow">
            <span className="eyebrow">Cakupan</span>
            <h2>Dari kelas 1 SD sampai kelas 12 SMA</h2>
            <p className="lead">
              Peta materinya mengikuti Capaian Pembelajaran matematika yang berlaku di Indonesia.
              Konsep interaktifnya bertambah terus, dimulai dari rumus-rumus yang paling sering
              dihafal tanpa dimengerti.
            </p>
            <div className="row row-tight">
              <Link className="btn btn-primary" to="/belajar">
                Lihat peta materi
              </Link>
              <Link className="btn btn-outline" to="/peta">
                <Ikon nama="peta" /> Peta hubungan konsep
              </Link>
            </div>
          </div>
          <div className="cakupan-angka">
            <div>
              <strong>{siap.length}</strong>
              <span>konsep siap dibongkar</span>
            </div>
            <div>
              <strong>12</strong>
              <span>tingkat kelas</span>
            </div>
            <div>
              <strong>0</strong>
              <span>akun yang perlu dibuat</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
