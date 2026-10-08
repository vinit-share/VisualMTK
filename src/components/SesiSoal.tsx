/* ============================================================
   Visual MTK — Sesi soal
   Menjalankan sederet soal satu per satu, dengan deretan titik
   yang menunjukkan sudah sampai mana dan mana yang tepat.
   Dipakai tes topik; hasilnya diserahkan ke halaman pemanggil.
   ============================================================ */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { aksi } from '../lib/store'
import type { Soal } from '../lib/types'
import { Ikon } from './Ikon'
import { SoalView } from './SoalView'

export interface HasilSoal {
  soal: Soal
  benar: boolean
}

export function SesiSoal({
  soal,
  onSelesai,
  onKeluar,
  labelKeluar = 'Keluar',
}: {
  soal: Soal[]
  onSelesai: (hasil: HasilSoal[]) => void
  onKeluar: () => void
  labelKeluar?: string
}) {
  const [idx, setIdx] = useState(0)
  const [hasil, setHasil] = useState<HasilSoal[]>([])
  const sekarang = soal[idx]

  return (
    <div className="sesi">
      <div className="sesi-atas">
        <button className="btn btn-sm btn-ghost" onClick={onKeluar}>
          <Ikon nama="prev" /> {labelKeluar}
        </button>
        <ol className="sesi-titik" aria-label={`Soal ${idx + 1} dari ${soal.length}`}>
          {soal.map((s, i) => {
            const h = hasil[i]
            const keadaan = h ? (h.benar ? 'benar' : 'salah') : i === idx ? 'aktif' : 'nanti'
            return (
              <li key={s.id} data-keadaan={keadaan}>
                {h ? <Ikon nama={h.benar ? 'cek' : 'silang'} ukuran="0.8em" tebal={3} /> : i + 1}
              </li>
            )
          })}
        </ol>
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
            else aksi.jawabLepas(benar)
            setHasil((h) => [...h, { soal: sekarang, benar }])
          }}
          onLanjut={() => {
            if (idx < soal.length - 1) setIdx(idx + 1)
            else onSelesai(hasil)
          }}
        />
      </div>
    </div>
  )
}

/** Daftar ringkas hasil tiap soal, dengan jalan pintas ke penjelasan visualnya. */
export function RekapSoal({ hasil }: { hasil: HasilSoal[] }) {
  return (
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
  )
}

/** Tiga bintang; yang sudah diraih menyala. */
export function Bintang({
  n,
  besar = false,
  hidup = false,
}: {
  n: number
  besar?: boolean
  /** bintang muncul satu per satu (dipakai di layar hasil). */
  hidup?: boolean
}) {
  return (
    <span
      className={`bintang ${besar ? 'is-besar' : ''} ${hidup ? 'is-hidup' : ''}`}
      role="img"
      aria-label={`${n} dari 3 bintang`}
    >
      {[1, 2, 3].map((i) => (
        <svg key={i} viewBox="0 0 24 24" data-nyala={i <= n} aria-hidden="true" focusable="false">
          <path d="m12 2.6 2.9 6 6.5.9-4.7 4.6 1.1 6.5L12 17.5l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9z" />
        </svg>
      ))}
    </span>
  )
}
