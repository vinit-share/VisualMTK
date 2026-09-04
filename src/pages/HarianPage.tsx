/* ============================================================
   Visual MTK — Tantangan harian
   Tiga soal, berganti setiap hari, sama untuk semua orang
   (dipilih dari benih tanggal). Tanpa login, tanpa server.
   ============================================================ */

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Ikon } from '../components/Ikon'
import { SoalView } from '../components/SoalView'
import { benihHarian, bangunSesi } from '../lib/sesi'
import { aksi, hariIni, useSimpanan } from '../lib/store'
import type { Soal } from '../lib/types'

const JUMLAH = 3

const NAMA_HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const NAMA_BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

function tanggalPanjang() {
  const d = new Date()
  return `${NAMA_HARI[d.getDay()]}, ${d.getDate()} ${NAMA_BULAN[d.getMonth()]} ${d.getFullYear()}`
}

export default function HarianPage() {
  const tanggal = hariIni()
  const simpanan = useSimpanan()
  const catatan = simpanan.harian[tanggal]

  const [soal, setSoal] = useState<Soal[] | null>(null)
  const [idx, setIdx] = useState(0)
  const [hasil, setHasil] = useState<boolean[]>([])
  const [selesai, setSelesai] = useState(false)

  useEffect(() => {
    let batal = false
    bangunSesi({ jumlah: JUMLAH, benih: benihHarian(tanggal), tingkat: 'campuran' }).then((s) => {
      if (!batal) setSoal(s)
    })
    return () => {
      batal = true
    }
  }, [tanggal])

  useEffect(() => {
    if (selesai && soal) {
      aksi.catatHarian(tanggal, hasil.filter(Boolean).length, soal.length)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selesai])

  const sudahPernah = !!catatan?.selesai && !selesai && hasil.length === 0

  return (
    <div className="page section">
      <header className="harian-kepala stack stack-2">
        <span className="eyebrow row-tight" style={{ display: 'inline-flex', justifyContent: 'center' }}>
          <Ikon nama="kalender" /> Tantangan hari ini
        </span>
        <h1>{JUMLAH} soal, lima menit</h1>
        <p className="harian-tanggal">{tanggalPanjang()}</p>
        {simpanan.streak.hitung > 0 && (
          <p className="row row-center row-tight">
            <span className="chip chip-amber">
              <Ikon nama="api" /> {simpanan.streak.hitung} hari beruntun
            </span>
            {simpanan.streak.terpanjang > simpanan.streak.hitung && (
              <span className="chip chip-outline">
                Rekor: {simpanan.streak.terpanjang} hari
              </span>
            )}
          </p>
        )}
      </header>

      {sudahPernah && (
        <div className="card card-pad-lg center stack stack-4">
          <h2>Tantangan hari ini sudah kamu selesaikan</h2>
          <p className="lead center" style={{ marginInline: 'auto' }}>
            Skormu {catatan.benar} dari {catatan.total}. Soal baru muncul besok.
          </p>
          <div className="row row-center">
            <Link className="btn btn-primary" to="/tes">
              Latihan bebas <Ikon nama="panah" />
            </Link>
            <Link className="btn btn-outline" to="/kenapa">
              Baca satu konsep lagi
            </Link>
          </div>
        </div>
      )}

      {!sudahPernah && !soal && <div className="rangka rangka-stage" aria-busy="true" />}

      {!sudahPernah && soal && soal.length === 0 && (
        <div className="kosong">
          <p>Belum ada soal yang siap untuk hari ini.</p>
        </div>
      )}

      {!sudahPernah && soal && soal.length > 0 && !selesai && (
        <>
          <div className="harian-titik" aria-hidden="true">
            {soal.map((s, i) => (
              <i
                key={s.id}
                data-state={
                  i < hasil.length ? (hasil[i] ? 'benar' : 'salah') : i === idx ? 'aktif' : 'nanti'
                }
              />
            ))}
          </div>
          <div className="card card-pad-lg" style={{ marginTop: 'var(--s-5)' }}>
            <SoalView
              key={soal[idx].id}
              soal={soal[idx]}
              nomor={idx + 1}
              total={soal.length}
              labelLanjut={idx < soal.length - 1 ? 'Lanjut' : 'Selesai'}
              onJawab={(benar) => {
                if (soal[idx].konsep) aksi.jawab(soal[idx].konsep!, benar)
                setHasil((h) => [...h, benar])
              }}
              onLanjut={() => {
                if (idx < soal.length - 1) setIdx(idx + 1)
                else setSelesai(true)
              }}
            />
          </div>
        </>
      )}

      {selesai && soal && (
        <div className="card card-pad-lg tes-hasil">
          <span className="eyebrow">Selesai</span>
          <div className="tes-skor">
            {hasil.filter(Boolean).length}/{soal.length}
          </div>
          <p className="lead center" style={{ marginInline: 'auto' }}>
            Sampai jumpa besok. Yang membuat matematika nempel bukan sesi panjang sesekali,
            melainkan sedikit-sedikit tapi tiap hari.
          </p>
          <div className="row row-center" style={{ marginTop: 'var(--s-6)' }}>
            <Link className="btn btn-primary" to="/kenapa">
              Bongkar satu rumus lagi <Ikon nama="panah" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
