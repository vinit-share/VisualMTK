/* ============================================================
   Visual MTK — Ikon garis
   Satu set kecil, konsisten, tanpa pustaka ikon.
   Ukuran mengikuti font (1em) supaya sejajar dengan teks.
   ============================================================ */

export type NamaIkon =
  | 'play'
  | 'pause'
  | 'prev'
  | 'next'
  | 'ulang'
  | 'bongkar'
  | 'kenapa'
  | 'eksperimen'
  | 'tes'
  | 'belajar'
  | 'peta'
  | 'progres'
  | 'panah'
  | 'cek'
  | 'silang'
  | 'lampu'
  | 'api'
  | 'bintang'
  | 'kunci'
  | 'matahari'
  | 'bulan'
  | 'menu'
  | 'tutup'
  | 'cari'
  | 'tambah'
  | 'kurang'
  | 'perbesar'
  | 'perkecil'
  | 'geser'
  | 'acak'
  | 'target'
  | 'petunjuk'
  | 'kalender'
  | 'sd'
  | 'smp'
  | 'sma'

const P: Record<NamaIkon, { d: string; isi?: boolean }[]> = {
  play: [{ d: 'M8 5.5 19 12 8 18.5z', isi: true }],
  pause: [{ d: 'M9 5v14M15 5v14' }],
  prev: [{ d: 'M15 5 8 12l7 7' }],
  next: [{ d: 'M9 5l7 7-7 7' }],
  ulang: [{ d: 'M20 12a8 8 0 1 1-2.6-5.9M20 4v4h-4' }],
  bongkar: [{ d: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M20 20l-4-4M8 11h6M11 8v6' }],
  kenapa: [{ d: 'M9.2 9a3 3 0 1 1 4 2.8c-.8.3-1.2 1-1.2 1.8v.6M12 17.6v.4' }],
  eksperimen: [{ d: 'M9.5 3v6L4.6 17a2 2 0 0 0 1.7 3h11.4a2 2 0 0 0 1.7-3l-4.9-8V3M8 3h8M7.4 14h9.2' }],
  tes: [{ d: 'M6 3h9l4 4v14H6zM15 3v5h4M9 12l2 2 4-4M9 17h6' }],
  belajar: [{ d: 'M12 4 3 8.5 12 13l9-4.5zM6 10.5v5c0 1.7 2.7 3.5 6 3.5s6-1.8 6-3.5v-5' }],
  peta: [{ d: 'M6 4.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5M18 14.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5M18 4.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5M8.5 7H15M8 9l8 6' }],
  progres: [{ d: 'M4 20h16M7 20v-6M12 20V8M17 20v-9' }],
  panah: [{ d: 'M5 12h13M13 6.5 18.5 12 13 17.5' }],
  cek: [{ d: 'M5 12.5 10 17.5 19 7' }],
  silang: [{ d: 'M6.5 6.5l11 11M17.5 6.5l-11 11' }],
  lampu: [{ d: 'M9 17h6M10 20.5h4M12 3a6 6 0 0 0-3.5 10.9c.6.5.9 1.1 1 1.6h5c.1-.5.4-1.1 1-1.6A6 6 0 0 0 12 3' }],
  api: [{ d: 'M12 3s4.5 3.6 4.5 8a4.5 4.5 0 0 1-9 0c0-1.6.8-3 1.6-4 .1 1.3.8 2.2 1.6 2.2 1 0 1.6-1 1.3-2.6z' }],
  bintang: [{ d: 'm12 3.6 2.5 5.2 5.6.8-4 4 .9 5.7-5-2.7-5 2.7.9-5.7-4-4 5.6-.8z' }],
  kunci: [{ d: 'M7 10.5h10v9H7zM9.5 10.5V8a2.5 2.5 0 0 1 5 0v2.5' }],
  matahari: [{ d: 'M12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8' }],
  bulan: [{ d: 'M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5' }],
  menu: [{ d: 'M4 7h16M4 12h16M4 17h16' }],
  tutup: [{ d: 'M6.5 6.5l11 11M17.5 6.5l-11 11' }],
  cari: [{ d: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M20 20l-4.2-4.2' }],
  tambah: [{ d: 'M12 5.5v13M5.5 12h13' }],
  kurang: [{ d: 'M5.5 12h13' }],
  perbesar: [{ d: 'M4.5 9V4.5H9M15 4.5h4.5V9M19.5 15v4.5H15M9 19.5H4.5V15' }],
  perkecil: [{ d: 'M9 4.5V9H4.5M19.5 9H15V4.5M15 19.5V15h4.5M4.5 15H9v4.5' }],
  geser: [{ d: 'M12 3.5v17M3.5 12h17M9 6.5l3-3 3 3M9 17.5l3 3 3-3M6.5 9l-3 3 3 3M17.5 9l3 3-3 3' }],
  acak: [{ d: 'M3 7h4l10 10h4M17 3.5 20.5 7 17 10.5M3 17h4l3-3M14 10l3-3M17 13.5l3.5 3.5-3.5 3.5' }],
  target: [{ d: 'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8M12 11.4a.6.6 0 1 1 0 1.2.6.6 0 0 1 0-1.2', isi: false }],
  petunjuk: [{ d: 'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18M12 10.5V17M12 7.4v.4' }],
  kalender: [{ d: 'M4.5 6.5h15v14h-15zM8 3.5v4M16 3.5v4M4.5 11h15' }],
  sd: [{ d: 'M4 8.5 12 4.5l8 4-8 4zM7 11v4.5c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V11' }],
  smp: [{ d: 'M4.5 19.5V9l7.5-5 7.5 5v10.5zM9.5 19.5v-6h5v6' }],
  sma: [{ d: 'M12 3.5 4.5 7v4.5c0 4.6 3.2 8 7.5 9 4.3-1 7.5-4.4 7.5-9V7z' }],
}

export function Ikon({
  nama,
  ukuran = '1.15em',
  tebal = 2,
  className = '',
}: {
  nama: NamaIkon
  ukuran?: number | string
  tebal?: number
  className?: string
}) {
  const paths = P[nama]
  return (
    <svg
      className={`ikon ${className}`}
      width={ukuran}
      height={ukuran}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={tebal}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ flex: 'none', overflow: 'visible' }}
    >
      {paths.map((p, i) => (
        <path key={i} d={p.d} fill={p.isi ? 'currentColor' : 'none'} />
      ))}
    </svg>
  )
}
