/* ============================================================
   Visual MTK — Gambar topik
   Kurikulumnya berisi ratusan topik; tidak mungkin tiap topik
   digambar tangan. Sebagai gantinya ada satu perpustakaan glif
   kecil (±70 gambar), dan tiap topik memilih glifnya dari kata
   kunci pada judulnya. Warna mengikuti domain matematikanya,
   sehingga anak cepat mengenali "ini soal bentuk", "ini soal
   data", tanpa membaca.
   ============================================================ */

import type { ReactNode } from 'react'
import type { Domain } from '../lib/types'

const G = 'var(--g)'
const S = 'var(--g2)'
const K = 'var(--g3)'

const gr = { fill: 'none', stroke: G, strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round' } as const
const tipis = { fill: 'none', stroke: K, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const
const isi = { fill: S, stroke: G, strokeWidth: 3, strokeLinejoin: 'round', strokeLinecap: 'round' } as const

const tulis = (teks: string, ukuran = 26, y = 42, miring = false) => (
  <text
    x={32}
    y={y}
    textAnchor="middle"
    fontSize={ukuran}
    fontWeight={700}
    fontStyle={miring ? 'italic' : undefined}
    fill={K}
    fontFamily="var(--font-math)"
  >
    {teks}
  </text>
)

const sumbu = <path d="M10 52h46M14 8v48" {...tipis} />

const GLIF = {
  /* ---------- Bilangan ---------- */
  hitung: (
    <>
      {[
        [18, 18],
        [46, 18],
        [32, 32],
        [18, 46],
        [46, 46],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={6} fill={i === 2 ? K : G} />
      ))}
    </>
  ),
  angka: tulis('123', 25),
  urutan: (
    <>
      <path d="M8 54V40h16V26h16v20h16v8Z" {...isi} />
      <text x={32} y={22} textAnchor="middle" fontSize={15} fontWeight={800} fill={K} fontFamily="var(--font-math)">
        1
      </text>
    </>
  ),
  tambah: (
    <>
      <path d="M12 24h22M23 13v22" {...gr} strokeWidth={4.5} />
      <path d="M36 46h18" {...gr} stroke={K} strokeWidth={4.5} />
    </>
  ),
  kali: (
    <>
      {Array.from({ length: 12 }, (_, i) => (
        <circle key={i} cx={13 + (i % 4) * 12.6} cy={19 + Math.floor(i / 4) * 13} r={4.6} fill={i < 4 ? K : G} />
      ))}
    </>
  ),
  bagi: (
    <>
      <path d="M12 32h40" {...gr} strokeWidth={4.5} />
      <circle cx={32} cy={17} r={5} fill={K} />
      <circle cx={32} cy={47} r={5} fill={K} />
    </>
  ),
  pecahan: (
    <>
      <circle cx={32} cy={32} r={22} fill={S} stroke={G} strokeWidth={3} />
      <path d="M32 32V10A22 22 0 1 1 10 32Z" fill={G} fillOpacity={0.75} />
      <path d="M32 10v22H10" {...gr} strokeWidth={2.4} />
    </>
  ),
  desimal: tulis('0,5', 24),
  persen: tulis('%', 36, 45),
  nilaiTempat: (
    <>
      <rect x={10} y={10} width={9} height={44} rx={2} {...isi} strokeWidth={2.4} />
      <rect x={24} y={10} width={9} height={44} rx={2} {...isi} strokeWidth={2.4} />
      <path d="M10 21h9M10 32h9M10 43h9M24 21h9M24 32h9M24 43h9" stroke={G} strokeWidth={1.4} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={42} y={12 + i * 15} width={11} height={11} rx={2.5} fill={K} />
      ))}
    </>
  ),
  garisBilangan: (
    <>
      <path d="M6 36h52" {...gr} />
      <path d="M12 30v12M22 30v12M32 30v12M42 30v12M52 30v12" stroke={G} strokeWidth={2.2} strokeLinecap="round" />
      <path d="M22 24Q32 6 42 24" {...tipis} strokeWidth={2.4} />
      <circle cx={42} cy={36} r={5} fill={K} />
    </>
  ),
  banding: (
    <>
      <path d="M26 18L11 32l15 14" {...gr} strokeWidth={4} />
      <path d="M38 18l15 14l-15 14" {...gr} stroke={K} strokeWidth={4} />
    </>
  ),
  ganjilGenap: (
    <>
      {[
        [16, 16],
        [30, 16],
        [16, 32],
        [30, 32],
        [16, 48],
        [30, 48],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={5.4} fill={G} />
      ))}
      <circle cx={48} cy={48} r={5.4} fill={K} />
    </>
  ),
  estimasi: tulis('≈', 40, 46),
  faktor: (
    <>
      <path d="M32 16L18 32M32 16L46 32M46 34L38 50M46 34L54 50" {...tipis} strokeWidth={2.4} />
      <circle cx={32} cy={14} r={7} fill={G} />
      <circle cx={18} cy={34} r={6} fill={K} />
      <circle cx={46} cy={34} r={6} fill={G} />
      <circle cx={38} cy={51} r={5} fill={K} />
      <circle cx={54} cy={51} r={5} fill={K} />
    </>
  ),
  pangkat: (
    <>
      <text x={26} y={48} textAnchor="middle" fontSize={34} fontWeight={700} fill={K} fontFamily="var(--font-math)">
        2
      </text>
      <text x={46} y={26} textAnchor="middle" fontSize={20} fontWeight={700} fill={K} fontFamily="var(--font-math)">
        3
      </text>
    </>
  ),
  akar: (
    <>
      <path d="M8 36l7 -3l8 17l9 -36h24" {...gr} />
      <text x={44} y={45} textAnchor="middle" fontSize={22} fontWeight={700} fill={K} fontFamily="var(--font-math)">
        x
      </text>
    </>
  ),
  log: tulis('log', 23, 40),
  uang: (
    <>
      <circle cx={32} cy={32} r={22} {...isi} />
      <circle cx={32} cy={32} r={15} fill="none" stroke={G} strokeWidth={1.6} strokeDasharray="3 3" />
      <text x={32} y={38} textAnchor="middle" fontSize={15} fontWeight={800} fill={K}>
        Rp
      </text>
    </>
  ),
  rasio: (
    <>
      <rect x={10} y={16} width={12} height={12} rx={3} fill={G} />
      <rect x={26} y={16} width={12} height={12} rx={3} fill={G} />
      <rect x={10} y={38} width={12} height={12} rx={3} fill={K} />
      <rect x={26} y={38} width={12} height={12} rx={3} fill={K} />
      <rect x={42} y={38} width={12} height={12} rx={3} fill={K} />
    </>
  ),
  himpunan: (
    <>
      <circle cx={24} cy={32} r={16} {...isi} fillOpacity={0.9} />
      <circle cx={40} cy={32} r={16} fill={G} fillOpacity={0.3} stroke={G} strokeWidth={3} />
    </>
  ),
  kompleks: tulis('i', 40, 46, true),

  /* ---------- Aljabar ---------- */
  pola: (
    <>
      <circle cx={12} cy={32} r={7} fill={G} />
      <rect x={24} y={25} width={14} height={14} rx={3} fill={K} />
      <circle cx={50} cy={32} r={7} fill={G} />
    </>
  ),
  timbangan: (
    <>
      <path d="M32 16v32" {...gr} />
      <path d="M22 52h20" {...gr} />
      <path d="M10 20h44" {...gr} />
      <path d="M4 36h18q-2 8 -9 8t-9 -8Z" {...isi} strokeWidth={2.4} />
      <path d="M42 36h18q-2 8 -9 8t-9 -8Z" {...isi} strokeWidth={2.4} />
      <path d="M13 20L6 36M13 20l7 16M51 20l-7 16M51 20l7 16" {...tipis} strokeWidth={1.4} />
    </>
  ),
  aljabar: (
    <>
      <rect x={12} y={12} width={40} height={40} rx={10} {...isi} />
      <text x={32} y={42} textAnchor="middle" fontSize={28} fontWeight={700} fontStyle="italic" fill={K} fontFamily="var(--font-math)">
        x
      </text>
    </>
  ),
  grafik: (
    <>
      {sumbu}
      <path d="M16 48L52 14" {...gr} />
      <circle cx={34} cy={31} r={4.5} fill={K} />
    </>
  ),
  parabola: (
    <>
      {sumbu}
      <path d="M18 12Q34 84 52 12" {...gr} />
      <circle cx={34.6} cy={47.6} r={4.5} fill={K} />
    </>
  ),
  sistem: (
    <>
      {sumbu}
      <path d="M16 46L54 18" {...gr} />
      <path d="M18 16L52 48" {...gr} stroke={K} />
      <circle cx={35} cy={32} r={5} fill={G} stroke="var(--surface)" strokeWidth={1.6} />
    </>
  ),
  daerah: (
    <>
      <path d="M14 52V40L54 14v38Z" fill={S} />
      {sumbu}
      <path d="M14 40L54 14" {...gr} />
    </>
  ),
  fungsi: (
    <>
      <rect x={20} y={18} width={24} height={28} rx={7} {...isi} />
      <path d="M4 32h12M12 27l5 5l-5 5M46 32h12M54 27l5 5l-5 5" {...tipis} strokeWidth={2.6} />
      <text x={32} y={39} textAnchor="middle" fontSize={18} fontWeight={700} fontStyle="italic" fill={K} fontFamily="var(--font-math)">
        f
      </text>
    </>
  ),
  barisan: (
    <>
      {[12, 22, 32, 42].map((h, i) => (
        <rect key={i} x={9 + i * 12.5} y={54 - h} width={9.5} height={h} rx={2.5} fill={i === 3 ? K : G} />
      ))}
    </>
  ),
  polinomial: (
    <>
      <path d="M8 34h48" {...tipis} />
      <path d="M10 50C18 -6 30 60 34 34S50 6 56 18" {...gr} />
    </>
  ),
  matriks: (
    <>
      <path d="M20 10h-8v44h8M44 10h8v44h-8" {...gr} />
      {[
        [25, 24],
        [39, 24],
        [25, 40],
        [39, 40],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={4.4} fill={i === 0 || i === 3 ? G : K} />
      ))}
    </>
  ),
  vektor: (
    <>
      <path d="M12 52h40M12 52V12" {...tipis} />
      <path d="M14 50L46 18" {...gr} strokeWidth={3.6} />
      <path d="M34 16h14v14" {...gr} strokeWidth={3.6} />
    </>
  ),

  /* ---------- Geometri ---------- */
  bangunDatar: (
    <>
      <path d="M8 50L22 22l14 28Z" {...isi} strokeWidth={2.6} />
      <rect x={34} y={10} width={20} height={20} rx={3} fill={G} fillOpacity={0.35} stroke={G} strokeWidth={2.6} />
      <circle cx={46} cy={46} r={10} fill={K} fillOpacity={0.35} stroke={K} strokeWidth={2.6} />
    </>
  ),
  segitiga: (
    <>
      <path d="M8 52h48L38 12Z" {...isi} />
      <path d="M38 12v40" {...tipis} strokeDasharray="4 4" />
    </>
  ),
  segiempat: (
    <>
      <path d="M8 50h36l12 -34H20Z" {...isi} />
    </>
  ),
  lingkaran: (
    <>
      <circle cx={32} cy={32} r={22} {...isi} />
      <path d="M32 32h22" {...gr} stroke={K} />
      <circle cx={32} cy={32} r={3.4} fill={K} />
    </>
  ),
  sudut: (
    <>
      <path d="M12 50h20a20 20 0 0 0 -5.9 -14.1Z" fill={S} />
      <path d="M56 50H12L44 14" {...gr} />
      <path d="M32 50a20 20 0 0 0 -5.9 -14.1" {...tipis} strokeWidth={2.6} />
    </>
  ),
  garis: (
    <>
      <path d="M8 22h48M8 44h48" {...gr} />
      <path d="M22 8l20 48" {...gr} stroke={K} />
    </>
  ),
  arah: (
    <>
      <path d="M32 8v48M8 32h48" {...tipis} strokeWidth={2.4} />
      <path d="M32 8l-6 8h12ZM32 56l-6 -8h12ZM8 32l8 -6v12ZM56 32l-8 -6v12Z" fill={G} />
      <circle cx={32} cy={32} r={5} fill={K} />
    </>
  ),
  kubus: (
    <>
      <path d="M10 24h30v30H10Z" {...isi} />
      <path d="M10 24l14 -14h30L40 24M54 10v30L40 54" {...isi} />
    </>
  ),
  tabung: (
    <>
      <path d="M12 16v32a20 7 0 0 0 40 0V16" {...isi} />
      <ellipse cx={32} cy={16} rx={20} ry={7} {...isi} />
    </>
  ),
  kerucut: (
    <>
      <path d="M32 8L12 48a20 7 0 0 0 40 0Z" {...isi} />
      <path d="M12 48a20 7 0 0 1 40 0" {...tipis} strokeDasharray="3 4" />
    </>
  ),
  bola: (
    <>
      <circle cx={32} cy={32} r={22} {...isi} />
      <path d="M10 32a22 8 0 0 0 44 0" {...tipis} strokeWidth={2.4} />
    </>
  ),
  limas: (
    <>
      <path d="M30 8L8 48h34Z" {...isi} />
      <path d="M30 8l12 40l14 -10Z" fill={G} fillOpacity={0.35} stroke={G} strokeWidth={3} strokeLinejoin="round" />
    </>
  ),
  prisma: (
    <>
      <path d="M8 52h24L20 28Z" {...isi} />
      <path d="M20 28l24 -14l12 24l-24 14" {...isi} />
    </>
  ),
  jaring: (
    <>
      {[
        [25, 4],
        [11, 18],
        [25, 18],
        [39, 18],
        [25, 32],
        [25, 46],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={14} height={14} fill={i === 2 ? G : S} fillOpacity={i === 2 ? 0.6 : 1} stroke={G} strokeWidth={2.4} strokeLinejoin="round" />
      ))}
    </>
  ),
  koordinat: (
    <>
      <path d="M20 10v44M32 10v44M44 10v44M10 20h44M10 44h44" stroke={S} strokeWidth={2} />
      <path d="M8 32h48M32 8v48" {...tipis} strokeWidth={2.4} />
      <circle cx={44} cy={20} r={5.5} fill={G} />
      <path d="M44 20v12M44 20H32" stroke={G} strokeWidth={1.6} strokeDasharray="3 3" />
    </>
  ),
  transformasi: (
    <>
      <path d="M32 6v52" {...tipis} strokeDasharray="4 4" />
      <path d="M26 48H8l18 -30Z" {...isi} />
      <path d="M38 48h18L38 18Z" fill={K} fillOpacity={0.3} stroke={K} strokeWidth={3} strokeLinejoin="round" />
    </>
  ),
  pythagoras: (
    <>
      <path d="M22 40h20V25Z" fill="var(--surface)" stroke={K} strokeWidth={2.4} strokeLinejoin="round" />
      <rect x={22} y={40} width={20} height={16} fill={S} stroke={G} strokeWidth={2.2} />
      <rect x={42} y={25} width={15} height={15} fill={S} stroke={G} strokeWidth={2.2} />
      <path d="M22 40L42 25L27 5L7 20Z" fill={G} fillOpacity={0.45} stroke={G} strokeWidth={2.2} strokeLinejoin="round" />
    </>
  ),
  trigono: (
    <>
      <circle cx={32} cy={32} r={22} fill="none" stroke={K} strokeWidth={1.8} />
      <path d="M8 32h48M32 8v48" {...tipis} strokeWidth={1.4} />
      <path d="M32 32L48 16V32Z" {...isi} strokeWidth={2.6} />
      <circle cx={48} cy={16} r={4} fill={K} />
    </>
  ),
  elips: (
    <>
      <ellipse cx={32} cy={32} rx={25} ry={15} {...isi} />
      <circle cx={18} cy={32} r={3.6} fill={K} />
      <circle cx={46} cy={32} r={3.6} fill={K} />
    </>
  ),
  hiperbola: (
    <>
      <path d="M8 8L56 56M56 8L8 56" {...tipis} strokeDasharray="4 4" />
      <path d="M12 10Q32 32 12 54" {...gr} />
      <path d="M52 10Q32 32 52 54" {...gr} />
    </>
  ),
  irisan: (
    <>
      <path d="M32 6L10 50a22 7 0 0 0 44 0Z" {...isi} />
      <path d="M16 38L46 20" {...gr} stroke={K} />
    </>
  ),

  /* ---------- Pengukuran ---------- */
  penggaris: (
    <>
      <rect x={6} y={22} width={52} height={20} rx={4} {...isi} />
      <path d="M14 22v8M22 22v12M30 22v8M38 22v12M46 22v8" stroke={G} strokeWidth={2.2} strokeLinecap="round" />
    </>
  ),
  berat: (
    <>
      <path d="M12 54L18 24h28l6 30Z" {...isi} />
      <path d="M25 24a7 7 0 1 1 14 0" {...gr} />
      <text x={32} y={46} textAnchor="middle" fontSize={13} fontWeight={800} fill={K}>
        kg
      </text>
    </>
  ),
  waktu: (
    <>
      <circle cx={32} cy={32} r={22} {...isi} />
      <path d="M32 18v14l10 7" {...gr} stroke={K} />
    </>
  ),
  luas: (
    <>
      {Array.from({ length: 12 }, (_, i) => (
        <rect
          key={i}
          x={9 + (i % 4) * 12}
          y={14 + Math.floor(i / 4) * 12}
          width={10.5}
          height={10.5}
          rx={2}
          fill={i % 4 < 3 && i < 8 ? G : S}
        />
      ))}
    </>
  ),
  keliling: (
    <>
      <rect x={10} y={14} width={44} height={36} rx={3} fill={S} />
      <rect x={10} y={14} width={44} height={36} rx={3} fill="none" stroke={G} strokeWidth={4} strokeDasharray="7 5" strokeLinecap="round" />
    </>
  ),
  volume: (
    <>
      <path d="M10 28h28v28H10Z" {...isi} />
      <path d="M10 28l12 -12h28L38 28M50 16v28L38 56" {...isi} />
      <path d="M24 28v28M10 42h28M36 16L24 28M44 22L38 28M38 42l12 -12" stroke={G} strokeWidth={1.6} />
    </>
  ),
  peta: (
    <>
      <path d="M6 16l16 -6l20 6l16 -6v38l-16 6l-20 -6l-16 6Z" {...isi} />
      <path d="M22 10v38M42 16v38" stroke={G} strokeWidth={1.8} />
      <circle cx={32} cy={30} r={5} fill={K} />
    </>
  ),
  kecepatan: (
    <>
      <path d="M10 44a22 22 0 0 1 44 0" {...gr} />
      <path d="M32 44L44 26" {...gr} stroke={K} strokeWidth={3.6} />
      <circle cx={32} cy={44} r={4.5} fill={K} />
    </>
  ),

  /* ---------- Data ---------- */
  sortir: (
    <>
      <rect x={6} y={14} width={24} height={36} rx={6} {...isi} strokeWidth={2.4} />
      <rect x={34} y={14} width={24} height={36} rx={6} fill="none" stroke={K} strokeWidth={2.4} />
      <circle cx={18} cy={26} r={5} fill={G} />
      <circle cx={18} cy={40} r={5} fill={G} />
      <rect x={41} y={21} width={10} height={10} rx={2} fill={K} />
      <rect x={41} y={35} width={10} height={10} rx={2} fill={K} />
    </>
  ),
  turus: (
    <>
      <path d="M14 14v36M24 14v36M34 14v36M44 14v36" {...gr} strokeWidth={3.6} />
      <path d="M8 44L52 20" {...gr} stroke={K} strokeWidth={3.6} />
    </>
  ),
  piktogram: (
    <>
      {[4, 2, 3].map((n, b) =>
        Array.from({ length: n }, (_, i) => (
          <circle key={`${b}-${i}`} cx={14 + i * 13} cy={16 + b * 16} r={5.4} fill={b === 1 ? K : G} />
        )),
      )}
    </>
  ),
  diagramBatang: (
    <>
      <path d="M8 54h48" {...tipis} strokeWidth={2.4} />
      {[20, 36, 26, 42].map((h, i) => (
        <rect key={i} x={12 + i * 11.5} y={52 - h} width={8} height={h} rx={2.5} fill={i === 3 ? K : G} />
      ))}
    </>
  ),
  diagramLingkaran: (
    <>
      <circle cx={32} cy={32} r={22} fill={S} stroke={G} strokeWidth={3} />
      <path d="M32 32V10A22 22 0 0 1 51 43Z" fill={G} fillOpacity={0.8} />
      <path d="M32 32L51 43A22 22 0 0 1 16 47Z" fill={K} fillOpacity={0.55} />
    </>
  ),
  diagramGaris: (
    <>
      {sumbu}
      <path d="M16 44l10 -12l10 6l16 -22" {...gr} />
      {[
        [16, 44],
        [26, 32],
        [36, 38],
        [52, 16],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3.8} fill={K} />
      ))}
    </>
  ),
  tabel: (
    <>
      <rect x={8} y={12} width={48} height={40} rx={5} {...isi} />
      <path d="M8 25h48M8 38h48M26 12v40" stroke={G} strokeWidth={2.2} />
    </>
  ),
  rata: (
    <>
      <path d="M8 36h48" {...gr} />
      {[14, 22, 28, 50].map((x, i) => (
        <circle key={i} cx={x} cy={27} r={5} fill={i === 3 ? K : G} />
      ))}
      <path d="M30 39l-8 15h16Z" fill={S} stroke={G} strokeWidth={2.6} strokeLinejoin="round" />
    </>
  ),
  peluang: (
    <>
      <rect x={10} y={10} width={44} height={44} rx={10} {...isi} />
      {[
        [22, 22],
        [42, 22],
        [32, 32],
        [22, 42],
        [42, 42],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={4.2} fill={K} />
      ))}
    </>
  ),
  kombinatorik: (
    <>
      <path d="M10 32L30 18M10 32L30 46M30 18L52 10M30 18L52 26M30 46L52 38M30 46L52 54" {...tipis} strokeWidth={2.4} />
      <circle cx={10} cy={32} r={5.5} fill={G} />
      <circle cx={30} cy={18} r={4.5} fill={K} />
      <circle cx={30} cy={46} r={4.5} fill={K} />
      {[10, 26, 38, 54].map((y) => (
        <circle key={y} cx={52} cy={y} r={3.8} fill={G} />
      ))}
    </>
  ),
  normal: (
    <>
      <path d="M6 50C22 50 22 12 32 12S42 50 58 50Z" fill={S} />
      <path d="M6 50C22 50 22 12 32 12S42 50 58 50" {...gr} />
      <path d="M32 12v38" {...tipis} strokeDasharray="4 4" />
    </>
  ),
  pencar: (
    <>
      {sumbu}
      {[
        [20, 44],
        [26, 36],
        [32, 40],
        [36, 28],
        [44, 26],
        [50, 16],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3.8} fill={G} />
      ))}
      <path d="M16 48L54 14" {...tipis} strokeWidth={2.2} strokeDasharray="5 4" />
    </>
  ),
  boxplot: (
    <>
      <path d="M8 32h12M44 32h12M8 24v16M56 24v16" {...gr} strokeWidth={2.6} />
      <rect x={20} y={20} width={24} height={24} rx={3} {...isi} />
      <path d="M30 20v24" {...gr} stroke={K} />
    </>
  ),
  sampel: (
    <>
      {Array.from({ length: 16 }, (_, i) => (
        <circle key={i} cx={12 + (i % 4) * 13.4} cy={12 + Math.floor(i / 4) * 13.4} r={4} fill={[1, 6, 8, 15].includes(i) ? K : S} stroke={G} strokeWidth={1.4} />
      ))}
    </>
  ),

  /* ---------- Kalkulus ---------- */
  limit: (
    <>
      {sumbu}
      <path d="M16 46Q30 40 38 26" {...gr} />
      <path d="M44 20Q48 16 54 12" {...gr} />
      <circle cx={41} cy={23} r={4.5} fill="var(--surface)" stroke={K} strokeWidth={2.6} />
      <path d="M41 28v24" {...tipis} strokeDasharray="3 4" />
    </>
  ),
  turunan: (
    <>
      {sumbu}
      <path d="M16 48C30 46 42 36 54 12" {...gr} />
      <path d="M22 52L56 22" {...gr} stroke={K} strokeWidth={2.4} />
      <circle cx={40} cy={36} r={4.5} fill={K} />
    </>
  ),
  integral: (
    <>
      <path d="M20 52V34C30 22 40 18 50 18v34Z" fill={S} />
      {sumbu}
      <path d="M16 38C28 22 40 18 54 18" {...gr} />
      <path d="M20 34v18M50 18v34" stroke={G} strokeWidth={1.8} strokeDasharray="3 3" />
    </>
  ),
} satisfies Record<string, ReactNode>

export type NamaGlif = keyof typeof GLIF

/**
 * Aturan pemilihan glif. Diperiksa berurutan dari atas; yang pertama cocok
 * dipakai. Aturan yang lebih khusus harus berada di atas yang lebih umum.
 */
const ATURAN: [RegExp, NamaGlif][] = [
  // Judul yang kata kuncinya menjebak aturan umum di bawah
  [/tabel perkalian/, 'kali'],
  [/konversi satuan/, 'penggaris'],
  [/busur derajat/, 'sudut'],
  [/pemodelan dunia nyata/, 'grafik'],
  [/\bkecepatan\b|debit/, 'kecepatan'],

  // Data dan peluang
  [/turus/, 'turus'],
  [/piktogram/, 'piktogram'],
  [/box plot|kuartil|persentil/, 'boxplot'],
  [/kontingensi/, 'tabel'],
  [/pencar|korelasi|regresi|asosiasi|bivariat|dot plot/, 'pencar'],
  [/normal|skor-z|distribusi sampling|interval kepercayaan|uji hipotesis/, 'normal'],
  [/permutasi|kombinasi|faktorial|pencacahan|pascal|bayes/, 'kombinatorik'],
  [/peluang|kemungkinan|frekuensi harapan|ruang sampel|kejadian|bernoulli|variabel acak|nilai harapan/, 'peluang'],
  [/diagram garis/, 'diagramGaris'],
  [/diagram lingkaran/, 'diagramLingkaran'],
  [/diagram batang|histogram|menafsirkan data|tampilan data/, 'diagramBatang'],
  [/mean|median|modus|pemusatan|penyebaran|jangkauan/, 'rata'],
  [/populasi|sampel|sampling/, 'sampel'],
  [/\btabel\b|matriks dan mengevaluasi/, 'tabel'],
  [/menyortir|mengelompokkan benda/, 'sortir'],
  [/\bdata\b|statisti/, 'diagramBatang'],

  // Irisan kerucut (sebelum kalkulus, karena "asimtot" dan "garis singgung")
  [/elips/, 'elips'],
  [/hiperbola/, 'hiperbola'],
  [/irisan kerucut/, 'irisan'],

  // Kalkulus
  [/integral|riemann|antiturunan|benda putar|teorema dasar kalkulus/, 'integral'],
  [/turunan|singgung kurva|laju perubahan|stasioner|optimasi|maksimum|aturan rantai|aturan hasil kali/, 'turunan'],
  [/limit|kekontinuan|asimtot/, 'limit'],

  // Geometri
  [/pythagoras/, 'pythagoras'],
  [/juring|tali busur/, 'lingkaran'],
  [/trigonometri|sinus|cosinus|radian|sudut rangkap|dua sudut|elevasi|fenomena periodik/, 'trigono'],
  [/vektor|perkalian titik|hasil kali skalar/, 'vektor'],
  [/matriks|determinan/, 'matriks'],
  [/parabola|fungsi kuadrat|diskriminan|persamaan kuadrat/, 'parabola'],
  [/transformasi|translasi|refleksi|rotasi|dilatasi|kekongruenan|kesebangunan|perubahan proporsional/, 'transformasi'],
  [/koordinat|kartesius|sistem berpetak|jarak dua titik/, 'koordinat'],
  [/jaring/, 'jaring'],
  [/mengenal prisma|mengenal bangun ruang/, 'kubus'],
  [/tabung/, 'tabung'],
  [/limas/, 'limas'],
  [/prisma/, 'prisma'],
  [/kerucut/, 'kerucut'],
  [/\bbola\b/, 'bola'],
  [/volume|kubus satuan/, 'volume'],
  [/kubus|balok|bangun ruang|spasial|dalam ruang/, 'kubus'],
  [/lingkaran|busur/, 'lingkaran'],
  [/sudut/, 'sudut'],
  [/sejajar|tegak lurus|titik, garis|garis dan/, 'garis'],
  [/segitiga/, 'segitiga'],
  [/segi ?empat|jajargenjang|trapesium/, 'segiempat'],
  [/\bluas\b/, 'luas'],
  [/keliling/, 'keliling'],
  [/segi banyak|bangun datar/, 'bangunDatar'],
  [/posisi dan arah/, 'arah'],

  // Pengukuran
  [/\bjam\b|waktu|durasi/, 'waktu'],
  [/skala|denah|\bpeta\b/, 'peta'],
  [/\bberat\b|bruto/, 'berat'],
  [/\bpanjang\b|satuan baku|antarsatuan/, 'penggaris'],

  // Bilangan dan aljabar
  [/\buang\b|rupiah|untung|diskon|\bbunga\b|pajak|anuitas|investasi|finansial/, 'uang'],
  [/logaritma/, 'log'],
  [/eksponen|pangkat|notasi ilmiah/, 'pangkat'],
  [/polinomial|horner|teorema sisa/, 'polinomial'],
  [/\bakar\b/, 'akar'],
  [/kompleks/, 'kompleks'],
  [/barisan|deret|induksi/, 'barisan'],
  [/\bpola\b/, 'pola'],
  [/himpunan bilangan real/, 'garisBilangan'],
  [/himpunan/, 'himpunan'],
  [/sistem persamaan|spldv|spltv/, 'sistem'],
  [/pertidaksamaan/, 'daerah'],
  [/garis lurus|gradien|fungsi linear|nonlinear|pemodelan/, 'grafik'],
  [/fungsi|relasi/, 'fungsi'],
  [/persamaan|belum diketahui|bilangan yang hilang|kalimat matematika|simbol/, 'timbangan'],
  [/aljabar|pemfaktoran|identitas/, 'aljabar'],
  [/\brasio\b|perbandingan|proporsional/, 'rasio'],
  [/\bpersen\b/, 'persen'],
  [/desimal/, 'desimal'],
  [/pecahan|setengah|rasional/, 'pecahan'],
  [/kpk|fpb|faktor|kelipatan|prima/, 'faktor'],
  [/ganjil|genap/, 'ganjilGenap'],
  [/estimasi|pembulatan|penaksiran|perkiraan/, 'estimasi'],
  [/nilai tempat|komposisi dan dekomposisi bilangan|lambang bilangan|pasangan bilangan/, 'nilaiTempat'],
  [/garis bilangan|negatif|bilangan bulat/, 'garisBilangan'],
  [/urutan|ordinal/, 'urutan'],
  [/membandingkan|mengurutkan/, 'banding'],
  [/pembagian/, 'bagi'],
  [/perkalian/, 'kali'],
  [/penjumlahan|pengurangan|operasi hitung|berhitung|keluarga fakta/, 'tambah'],
  [/membilang/, 'hitung'],
]

const CADANGAN: Record<Domain, NamaGlif> = {
  bilangan: 'angka',
  aljabar: 'aljabar',
  pengukuran: 'penggaris',
  geometri: 'bangunDatar',
  data: 'diagramBatang',
  kalkulus: 'turunan',
}

/** Glif yang mewakili sebuah topik, dipilih dari judulnya. */
export function glifTopik(judul: string, domain: Domain): NamaGlif {
  const j = judul.toLowerCase()
  for (const [pola, nama] of ATURAN) if (pola.test(j)) return nama
  return CADANGAN[domain]
}

export function GambarTopik({
  judul,
  domain,
  glif,
  className = '',
}: {
  judul: string
  domain: Domain
  /** paksa glif tertentu, mis. untuk kartu kelas. */
  glif?: NamaGlif
  className?: string
}) {
  return (
    <span className={`gambar-topik ${className}`} data-domain={domain} aria-hidden="true">
      <svg viewBox="0 0 64 64" focusable="false">
        {GLIF[glif ?? glifTopik(judul, domain)]}
      </svg>
    </span>
  )
}
