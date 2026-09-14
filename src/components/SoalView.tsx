/* ============================================================
   Visual MTK — Penyaji soal
   Yang lebih penting dari jawaban benar: tahu DI MANA mulai salah.
   Karena itu jawaban keliru tidak dijawab "Salah", melainkan
   dengan petunjuk bertahap, diagnosa khas kesalahan itu, lalu
   pembahasan dan tautan ke penjelasan visualnya.
   ============================================================ */

import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { jawabanSama, normalTeks, parseAngka, shuffle, seededRandom } from '../lib/num'
import type { Soal } from '../lib/types'
import { Ikon } from './Ikon'

type Hasil = 'belum' | 'benar' | 'salah'

export function SoalView({
  soal,
  onJawab,
  onLanjut,
  labelLanjut = 'Lanjut',
  nomor,
  total,
}: {
  soal: Soal
  /** dipanggil sekali, saat percobaan PERTAMA dinilai. */
  onJawab?: (benar: boolean) => void
  onLanjut?: () => void
  labelLanjut?: string
  nomor?: number
  total?: number
}) {
  const [hasil, setHasil] = useState<Hasil>('belum')
  const [hint, setHint] = useState(0)
  const [bahas, setBahas] = useState(false)
  const [percobaan, setPercobaan] = useState(0)
  const [diagnosa, setDiagnosa] = useState<string | null>(null)
  const [jawab, setJawab] = useState<unknown>(null)
  const dilaporkan = useRef(false)

  // Setel ulang saat soal berganti.
  useEffect(() => {
    setHasil('belum')
    setHint(0)
    setBahas(false)
    setPercobaan(0)
    setDiagnosa(null)
    setJawab(null)
    dilaporkan.current = false
  }, [soal.id])

  const periksa = (nilai: unknown) => {
    const { benar, catatan } = nilaiJawaban(soal, nilai)
    setJawab(nilai)
    setHasil(benar ? 'benar' : 'salah')
    setDiagnosa(catatan ?? null)
    setPercobaan((n) => n + 1)
    if (!dilaporkan.current) {
      dilaporkan.current = true
      onJawab?.(benar)
    }
    if (!benar) setHint((h) => Math.max(h, 1))
  }

  const ulangi = () => {
    setHasil('belum')
    setDiagnosa(null)
  }

  const hintTersisa = soal.hint.length - hint

  return (
    <div className="soal" data-hasil={hasil}>
      <div className="soal-head">
        <div className="row row-tight">
          <span className={`chip chip-${warnaTingkat(soal.tingkat)}`}>{soal.tingkat}</span>
          <span className="chip chip-outline">Kelas {soal.kelas}</span>
        </div>
        {nomor && total && (
          <span className="tiny dim">
            Soal {nomor} dari {total}
          </span>
        )}
      </div>

      <p className="soal-tanya">{soal.pertanyaan}</p>
      {soal.visual && <div className="soal-visual">{soal.visual}</div>}

      <Isian soal={soal} kunci={hasil === 'benar'} onKirim={periksa} nilaiAwal={jawab} />

      {hasil === 'belum' && hint > 0 && (
        <Petunjuk soal={soal} hint={hint} setHint={setHint} sisa={hintTersisa} />
      )}

      {hasil === 'salah' && (
        <div className="umpan umpan-salah" aria-live="polite">
          <div className="umpan-judul">
            <Ikon nama="petunjuk" />
            <span>Belum tepat. Coba lihat di bagian mana yang meleset.</span>
          </div>
          {diagnosa && <p className="umpan-diagnosa">{diagnosa}</p>}
          <Petunjuk soal={soal} hint={hint} setHint={setHint} sisa={hintTersisa} />
          <div className="row row-tight" style={{ marginTop: 'var(--s-3)' }}>
            <button className="btn btn-sm btn-primary" onClick={ulangi}>
              <Ikon nama="ulang" /> Coba lagi
            </button>
            {!bahas && (
              <button className="btn btn-sm btn-ghost" onClick={() => setBahas(true)}>
                Lihat pembahasan
              </button>
            )}
          </div>
        </div>
      )}

      {hasil === 'benar' && (
        <div className="umpan umpan-benar" aria-live="polite">
          <div className="umpan-judul">
            <Ikon nama="cek" />
            <span>{percobaan > 1 ? 'Nah, sekarang tepat.' : 'Tepat.'}</span>
          </div>
          <p>{soal.pembahasan}</p>
        </div>
      )}

      {bahas && hasil !== 'benar' && (
        <div className="umpan umpan-bahas">
          <div className="umpan-judul">
            <Ikon nama="lampu" />
            <span>Pembahasan</span>
          </div>
          <p>{soal.pembahasan}</p>
        </div>
      )}

      <div className="soal-kaki">
        {soal.konsep && (
          <Link className="btn btn-sm btn-why" to={`/konsep/${soal.konsep}`}>
            <Ikon nama="kenapa" /> Lihat kenapa
          </Link>
        )}
        {onLanjut && (hasil === 'benar' || bahas) && (
          <button className="btn btn-sm btn-primary" onClick={onLanjut}>
            {labelLanjut} <Ikon nama="panah" />
          </button>
        )}
      </div>
    </div>
  )
}

/* ---------------- Petunjuk bertahap ---------------- */

function Petunjuk({
  soal,
  hint,
  setHint,
  sisa,
}: {
  soal: Soal
  hint: number
  setHint: (n: number) => void
  sisa: number
}) {
  return (
    <div className="petunjuk">
      {soal.hint.slice(0, hint).map((h, i) => (
        <p key={i} className="petunjuk-item">
          <span className="petunjuk-no">{i + 1}</span>
          {h}
        </p>
      ))}
      {sisa > 0 && (
        <button className="btn btn-sm btn-soft" onClick={() => setHint(hint + 1)}>
          <Ikon nama="petunjuk" /> {hint === 0 ? 'Beri aku petunjuk' : 'Petunjuk berikutnya'}
        </button>
      )}
    </div>
  )
}

/* ---------------- Bentuk isian per tipe soal ---------------- */

function Isian({
  soal,
  kunci,
  onKirim,
  nilaiAwal,
}: {
  soal: Soal
  kunci: boolean
  onKirim: (v: unknown) => void
  nilaiAwal: unknown
}) {
  switch (soal.tipe) {
    case 'pilihan':
      return <IsianPilihan soal={soal} kunci={kunci} onKirim={onKirim} dipilih={nilaiAwal as string} />
    case 'benar-salah':
      return (
        <IsianBenarSalah kunci={kunci} onKirim={onKirim} dipilih={nilaiAwal as boolean | null} />
      )
    case 'angka':
      return <IsianAngka soal={soal} kunci={kunci} onKirim={onKirim} />
    case 'isian':
      return <IsianTeks kunci={kunci} onKirim={onKirim} />
    case 'urutkan':
      return <IsianUrutkan soal={soal} kunci={kunci} onKirim={onKirim} />
    case 'cocokkan':
      return <IsianCocokkan soal={soal} kunci={kunci} onKirim={onKirim} />
  }
}

function IsianPilihan({
  soal,
  kunci,
  onKirim,
  dipilih,
}: {
  soal: Extract<Soal, { tipe: 'pilihan' }>
  kunci: boolean
  onKirim: (v: unknown) => void
  dipilih?: string
}) {
  return (
    <div className="opsi-grid" role="group">
      {soal.pilihan.map((p) => {
        const aktif = dipilih === p.id
        const state = !kunci && !aktif ? 'netral' : p.benar ? 'benar' : aktif ? 'salah' : 'redup'
        return (
          <button
            key={p.id}
            className="opsi"
            data-state={dipilih ? state : 'netral'}
            disabled={kunci}
            onClick={() => onKirim(p.id)}
          >
            <span className="opsi-tanda">{p.id.toUpperCase()}</span>
            <span className="grow">{p.label}</span>
          </button>
        )
      })}
    </div>
  )
}

function IsianBenarSalah({
  kunci,
  onKirim,
  dipilih,
}: {
  kunci: boolean
  onKirim: (v: unknown) => void
  dipilih: boolean | null
}) {
  return (
    <div className="row row-tight">
      {[true, false].map((v) => (
        <button
          key={String(v)}
          className="btn btn-lg btn-outline"
          data-on={dipilih === v ? 'true' : undefined}
          disabled={kunci}
          onClick={() => onKirim(v)}
        >
          {v ? 'Benar' : 'Salah'}
        </button>
      ))}
    </div>
  )
}

function IsianAngka({
  soal,
  kunci,
  onKirim,
}: {
  soal: Extract<Soal, { tipe: 'angka' }>
  kunci: boolean
  onKirim: (v: unknown) => void
}) {
  const [teks, setTeks] = useState('')
  const kirim = () => {
    if (teks.trim() === '') return
    onKirim(teks)
  }
  return (
    <div className="row row-tight isian-angka">
      <input
        className="field field-num"
        inputMode="decimal"
        placeholder="Jawabanmu"
        value={teks}
        disabled={kunci}
        onChange={(e) => setTeks(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && kirim()}
        aria-label="Jawaban berupa angka"
      />
      {soal.satuan && <span className="satuan">{soal.satuan}</span>}
      <button className="btn btn-primary" onClick={kirim} disabled={kunci || teks.trim() === ''}>
        Periksa
      </button>
    </div>
  )
}

function IsianTeks({ kunci, onKirim }: { kunci: boolean; onKirim: (v: unknown) => void }) {
  const [teks, setTeks] = useState('')
  return (
    <div className="row row-tight isian-angka">
      <input
        className="field"
        placeholder="Jawabanmu"
        value={teks}
        disabled={kunci}
        onChange={(e) => setTeks(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && teks.trim() && onKirim(teks)}
        aria-label="Jawaban"
      />
      <button
        className="btn btn-primary"
        onClick={() => onKirim(teks)}
        disabled={kunci || teks.trim() === ''}
      >
        Periksa
      </button>
    </div>
  )
}

function IsianUrutkan({
  soal,
  kunci,
  onKirim,
}: {
  soal: Extract<Soal, { tipe: 'urutkan' }>
  kunci: boolean
  onKirim: (v: unknown) => void
}) {
  const acakAwal = useMemo(() => {
    const rnd = seededRandom(soal.id.length * 7919 + soal.langkah.length)
    let urut = shuffle(rnd, soal.langkah)
    // Pastikan tidak kebetulan sudah benar sejak awal.
    if (urut.every((x, i) => x === soal.langkah[i]) && urut.length > 1) {
      urut = [urut[1], urut[0], ...urut.slice(2)]
    }
    return urut
  }, [soal])
  const [urut, setUrut] = useState<string[]>(acakAwal)

  useEffect(() => setUrut(acakAwal), [acakAwal])

  const pindah = (i: number, arah: -1 | 1) => {
    const j = i + arah
    if (j < 0 || j >= urut.length) return
    const a = urut.slice()
    ;[a[i], a[j]] = [a[j], a[i]]
    setUrut(a)
  }

  return (
    <div className="urutkan">
      <ol className="urutkan-list">
        {urut.map((teks, i) => (
          <li key={teks} className="urutkan-item">
            <span className="urutkan-no">{i + 1}</span>
            <span className="grow">{teks}</span>
            <span className="urutkan-aksi">
              <button
                className="btn btn-icon btn-ghost btn-sm"
                onClick={() => pindah(i, -1)}
                disabled={kunci || i === 0}
                aria-label={`Pindahkan "${teks}" ke atas`}
              >
                <Ikon nama="prev" className="putar-90" />
              </button>
              <button
                className="btn btn-icon btn-ghost btn-sm"
                onClick={() => pindah(i, 1)}
                disabled={kunci || i === urut.length - 1}
                aria-label={`Pindahkan "${teks}" ke bawah`}
              >
                <Ikon nama="next" className="putar-90" />
              </button>
            </span>
          </li>
        ))}
      </ol>
      <button className="btn btn-primary" onClick={() => onKirim(urut)} disabled={kunci}>
        Periksa urutan
      </button>
    </div>
  )
}

function IsianCocokkan({
  soal,
  kunci,
  onKirim,
}: {
  soal: Extract<Soal, { tipe: 'cocokkan' }>
  kunci: boolean
  onKirim: (v: unknown) => void
}) {
  // Sebuah jawaban di kanan boleh menjadi pasangan lebih dari satu pernyataan
  // di kiri (mis. "Median" cocok untuk dua keadaan). Karena itu daftar kanan
  // dibuat tanpa pengulangan, dan pemakaiannya tidak dibatasi satu kali —
  // kecuali bila semua jawabannya memang berbeda.
  const { kanan, satuLawanSatu } = useMemo(() => {
    const semua = soal.pasangan.map((p) => p.kanan)
    const unik = Array.from(new Set(semua))
    const rnd = seededRandom(soal.id.length * 104729 + 13)
    return { kanan: shuffle(rnd, unik), satuLawanSatu: unik.length === semua.length }
  }, [soal])
  const [aktif, setAktif] = useState<string | null>(null)
  const [pasang, setPasang] = useState<Record<string, string>>({})

  useEffect(() => {
    setAktif(null)
    setPasang({})
  }, [soal.id])

  const pilihKiri = (k: string) => {
    if (pasang[k]) {
      const s = { ...pasang }
      delete s[k]
      setPasang(s)
      setAktif(k)
      return
    }
    setAktif(aktif === k ? null : k)
  }
  const pilihKanan = (v: string) => {
    if (!aktif) return
    setPasang((s) => {
      // Bila semua jawaban berbeda, memilih jawaban yang sudah terpakai
      // memindahkannya — bukan menduplikasi.
      const dasar = satuLawanSatu
        ? Object.fromEntries(Object.entries(s).filter(([, val]) => val !== v))
        : s
      return { ...dasar, [aktif]: v }
    })
    setAktif(null)
  }

  const lengkap = Object.keys(pasang).length === soal.pasangan.length

  return (
    <div className="cocokkan">
      <p className="tiny dim">Pilih satu di kiri, lalu pasangannya di kanan.</p>
      <div className="cocokkan-grid">
        <div className="stack stack-2">
          {soal.pasangan.map((p) => (
            <button
              key={p.kiri}
              className="cocok-item"
              data-on={aktif === p.kiri ? 'true' : undefined}
              data-pasang={pasang[p.kiri] ? 'true' : undefined}
              disabled={kunci}
              onClick={() => pilihKiri(p.kiri)}
            >
              <span className="grow">{p.kiri}</span>
              {pasang[p.kiri] && <span className="cocok-nilai">{pasang[p.kiri]}</span>}
            </button>
          ))}
        </div>
        <div className="stack stack-2">
          {kanan.map((v) => {
            const dipakai = satuLawanSatu && Object.values(pasang).includes(v)
            return (
              <button
                key={v}
                className="cocok-item"
                data-redup={dipakai ? 'true' : undefined}
                disabled={kunci || !aktif}
                onClick={() => pilihKanan(v)}
              >
                {v}
              </button>
            )
          })}
        </div>
      </div>
      <button
        className="btn btn-primary"
        onClick={() => onKirim(pasang)}
        disabled={kunci || !lengkap}
      >
        Periksa pasangan
      </button>
    </div>
  )
}

/* ---------------- Penilaian ---------------- */

export function nilaiJawaban(soal: Soal, nilai: unknown): { benar: boolean; catatan?: string } {
  switch (soal.tipe) {
    case 'pilihan': {
      const p = soal.pilihan.find((o) => o.id === nilai)
      return { benar: !!p?.benar, catatan: p?.benar ? undefined : p?.diagnosa }
    }
    case 'benar-salah':
      return { benar: nilai === soal.jawaban, catatan: soal.diagnosa }
    case 'angka': {
      const n = typeof nilai === 'number' ? nilai : parseAngka(String(nilai ?? ''))
      if (n === null) return { benar: false, catatan: 'Isi jawabanmu dengan angka, ya.' }
      return { benar: jawabanSama(n, soal.jawaban, soal.toleransi ?? 1e-9) }
    }
    case 'isian': {
      const t = normalTeks(String(nilai ?? ''))
      return { benar: soal.jawaban.some((j) => normalTeks(j) === t) }
    }
    case 'urutkan': {
      const a = nilai as string[]
      const benar = Array.isArray(a) && a.every((x, i) => x === soal.langkah[i])
      if (benar) return { benar }
      const salahPertama = (a ?? []).findIndex((x, i) => x !== soal.langkah[i])
      return {
        benar: false,
        catatan:
          salahPertama >= 0
            ? `Urutan mulai meleset di posisi ${salahPertama + 1}. Coba pikirkan: apa yang harus terjadi lebih dulu?`
            : undefined,
      }
    }
    case 'cocokkan': {
      const m = (nilai ?? {}) as Record<string, string>
      const salah = soal.pasangan.filter((p) => m[p.kiri] !== p.kanan)
      return {
        benar: salah.length === 0,
        catatan:
          salah.length > 0
            ? `${salah.length} pasangan masih belum tepat. Periksa lagi yang ini: "${salah[0].kiri}".`
            : undefined,
      }
    }
  }
}

const warnaTingkat = (t: Soal['tingkat']) =>
  t === 'mudah' ? 'teal' : t === 'sedang' ? 'blue' : 'pink'
