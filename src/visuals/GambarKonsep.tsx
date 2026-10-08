/* ============================================================
   Visual MTK — Gambar sampul konsep
   Satu ilustrasi kecil untuk tiap konsep interaktif, dipakai di
   galeri "Kenapa?", rak eksperimen, dan kartu topik. Gambarnya
   meringkas gagasan visual konsep itu — bukan hiasan — supaya
   anak sudah menebak isinya sebelum membaca judulnya.

   Sengaja ringan (SVG statis, tanpa memuat modul konsepnya).
   Hanya memakai warna peran matematika dari tokens.css.
   ============================================================ */

import type { ReactNode } from 'react'

const A = 'var(--m-a)'
const AS = 'var(--m-a-soft)'
const B = 'var(--m-b)'
const BS = 'var(--m-b-soft)'
const AB = 'var(--m-ab)'
const ABS = 'var(--m-ab-soft)'
const C = 'var(--m-c)'
const CS = 'var(--m-c-soft)'
const HI = 'var(--m-hi)'
const HIS = 'var(--m-hi-soft)'
const TINTA = 'var(--ink)'
const HALUS = 'var(--ink-soft)'
const KISI = 'var(--m-grid)'

const garis = { fill: 'none', strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

const GAMBAR: Record<string, ReactNode> = {
  /* Blok puluhan dan satuan: "25" = 2 batang + 5 kubus. */
  'nilai-tempat': (
    <>
      {[0, 1].map((i) => (
        <g key={i}>
          <rect x={30 + i * 14} y={12} width={9} height={56} rx={2} fill={AS} stroke={A} strokeWidth={1.8} />
          {Array.from({ length: 9 }, (_, k) => (
            <path key={k} d={`M${30 + i * 14} ${17.6 + k * 5.6}h9`} stroke={A} strokeWidth={0.8} />
          ))}
        </g>
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={68 + (i % 3) * 12}
          y={i < 3 ? 46 : 58}
          width={9}
          height={9}
          rx={2}
          fill={BS}
          stroke={B}
          strokeWidth={1.8}
        />
      ))}
      <text x={88} y={32} textAnchor="middle" fontSize={22} fontWeight={800} fill={TINTA} fontFamily="var(--font-math)">
        25
      </text>
    </>
  ),

  /* Perkalian sebagai luas: 3 baris × 5 kolom. */
  'perkalian-luas': (
    <>
      {Array.from({ length: 15 }, (_, i) => (
        <rect
          key={i}
          x={25 + (i % 5) * 14}
          y={17 + Math.floor(i / 5) * 14}
          width={12}
          height={12}
          rx={2.5}
          fill={Math.floor(i / 5) === 0 ? A : AS}
          stroke={A}
          strokeWidth={1.2}
        />
      ))}
      <path d="M25 66h68" stroke={B} strokeWidth={2.6} strokeLinecap="round" />
      <path d="M101 17v40" stroke={AB} strokeWidth={2.6} strokeLinecap="round" />
    </>
  ),

  /* Segitiga = setengah persegi panjang. */
  'segitiga-setengah': (
    <>
      <rect x={22} y={14} width={76} height={52} rx={2} fill="none" stroke={HALUS} strokeWidth={1.6} strokeDasharray="5 4" />
      <path d="M22 66H98L70 14Z" fill={AS} stroke={A} strokeWidth={2.4} strokeLinejoin="round" />
      <path d="M70 14V66" stroke={B} strokeWidth={2} strokeDasharray="4 3" />
    </>
  ),

  /* Penyebut harus sama: batang setengah dan batang sepertiga. */
  'pecahan-penyebut': (
    <>
      <rect x={18} y={16} width={84} height={18} rx={3} fill="none" stroke={A} strokeWidth={1.8} />
      <rect x={18} y={16} width={42} height={18} rx={3} fill={A} fillOpacity={0.55} stroke={A} strokeWidth={1.8} />
      <rect x={18} y={46} width={84} height={18} rx={3} fill="none" stroke={B} strokeWidth={1.8} />
      <rect x={18} y={46} width={28} height={18} rx={3} fill={B} fillOpacity={0.55} stroke={B} strokeWidth={1.8} />
      <path d="M46 46v18M74 46v18" stroke={B} strokeWidth={1.8} />
      <path d="M60 16v18" stroke={A} strokeWidth={1.8} />
    </>
  ),

  /* Membagi dengan pecahan: berapa potong setengah di dalam tiga utuh? */
  'bagi-pecahan': (
    <>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={16 + i * 30} y={22} width={28} height={22} rx={3} fill={ABS} stroke={AB} strokeWidth={1.8} />
          <path d={`M${30 + i * 30} 22v22`} stroke={AB} strokeWidth={1.8} strokeDasharray="3 3" />
        </g>
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <circle key={i} cx={23 + i * 15} cy={58} r={4} fill={B} />
      ))}
    </>
  ),

  /* Persen = bagian dari seratus kotak. */
  'persen-dari': (
    <>
      {Array.from({ length: 50 }, (_, i) => (
        <rect
          key={i}
          x={16 + (i % 10) * 6.4}
          y={18 + Math.floor(i / 10) * 9}
          width={5.2}
          height={7.6}
          rx={1.2}
          fill={i % 10 < 3 ? HI : KISI}
        />
      ))}
      <text x={98} y={48} textAnchor="middle" fontSize={22} fontWeight={800} fill={HI} fontFamily="var(--font-math)">
        %
      </text>
    </>
  ),

  /* π: keliling lingkaran yang dibentangkan sepanjang tiga diameter lebih sedikit. */
  'pi-dari-mana': (
    <>
      <circle cx={30} cy={34} r={14} fill={AS} stroke={A} strokeWidth={2.2} />
      <path d="M16 34h28" stroke={B} strokeWidth={2.4} strokeLinecap="round" />
      <path d="M16 60h88" stroke={A} strokeWidth={3} strokeLinecap="round" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${16 + i * 28} 68h28`} stroke={B} strokeWidth={2.4} strokeLinecap="round" strokeDasharray="0" opacity={1 - i * 0.18} />
      ))}
      <path d="M100 68h4" stroke={HI} strokeWidth={2.4} strokeLinecap="round" />
      <text x={86} y={38} textAnchor="middle" fontSize={24} fontWeight={700} fill={TINTA} fontFamily="var(--font-math)">
        π
      </text>
    </>
  ),

  /* Luas lingkaran: juring disusun selang-seling menjadi persegi panjang. */
  'lingkaran-luas': (
    <>
      <circle cx={30} cy={40} r={20} fill={AS} stroke={A} strokeWidth={2} />
      <path d="M30 20v40M10 40h40M15.9 25.9l28.2 28.2M44.1 25.9L15.9 54.1" stroke={A} strokeWidth={1.2} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <path d={`M${60 + i * 12} 56l6 -32l6 32Z`} fill={A} fillOpacity={0.6} stroke={A} strokeWidth={1.2} strokeLinejoin="round" />
          <path d={`M${66 + i * 12} 24l6 32l6 -32Z`} fill={B} fillOpacity={0.6} stroke={B} strokeWidth={1.2} strokeLinejoin="round" />
        </g>
      ))}
    </>
  ),

  /* Negatif kali negatif: berbalik arah dua kali pada garis bilangan. */
  'negatif-kali-negatif': (
    <>
      <path d="M12 52h96" stroke={TINTA} strokeWidth={2} strokeLinecap="round" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <path key={i} d={`M${18 + i * 14} 48v8`} stroke={TINTA} strokeWidth={1.6} />
      ))}
      <circle cx={60} cy={52} r={3.4} fill={TINTA} />
      <path d="M60 40Q46 22 32 40" stroke={HI} {...garis} />
      <path d="M36 33l-4 7l8 0" stroke={HI} {...garis} />
      <path d="M60 30Q74 12 88 30" stroke={AB} {...garis} />
      <path d="M84 23l4 7l-8 0" stroke={AB} {...garis} />
      <text x={28} y={70} textAnchor="middle" fontSize={12} fontWeight={800} fill={HI}>
        −
      </text>
      <text x={92} y={70} textAnchor="middle" fontSize={12} fontWeight={800} fill={AB}>
        +
      </text>
    </>
  ),

  /* Persamaan sebagai timbangan yang dijaga tetap seimbang. */
  'timbangan-persamaan': (
    <>
      <path d="M60 22v40" stroke={TINTA} strokeWidth={3} strokeLinecap="round" />
      <path d="M44 66h32l-8 -6h-16Z" fill="var(--surface-3)" stroke={TINTA} strokeWidth={1.8} strokeLinejoin="round" />
      <path d="M22 26h76" stroke={TINTA} strokeWidth={3} strokeLinecap="round" />
      <path d="M26 26l-10 20h20ZM94 26l-10 20h20Z" fill="none" stroke={HALUS} strokeWidth={1.4} strokeLinejoin="round" />
      <path d="M12 46h28q-4 8 -14 8t-14 -8Z" fill={AS} stroke={A} strokeWidth={1.8} strokeLinejoin="round" />
      <path d="M80 46h28q-4 8 -14 8t-14 -8Z" fill={BS} stroke={B} strokeWidth={1.8} strokeLinejoin="round" />
      <rect x={19} y={34} width={12} height={12} rx={2.5} fill={A} />
      <text x={25} y={44} textAnchor="middle" fontSize={11} fontWeight={800} fill="var(--on-brand)" fontFamily="var(--font-math)">
        x
      </text>
      <circle cx={89} cy={41} r={4.5} fill={B} />
      <circle cx={100} cy={41} r={4.5} fill={B} />
      <circle cx={60} cy={26} r={4} fill={A} />
    </>
  ),

  /* Tiga sudut segitiga disusun menjadi satu garis lurus. */
  'sudut-segitiga': (
    <>
      <path d="M20 54H78L58 16Z" stroke={TINTA} {...garis} strokeWidth={2} />
      <path d="M20 54h12a12 12 0 0 0 -6.4 -10.6Z" fill={A} />
      <path d="M78 54h-12a12 12 0 0 1 5.4 -10Z" fill={B} />
      <path d="M58 16l-5.6 10.6a12 12 0 0 0 11.2 0Z" fill={AB} />
      <path d="M78 70h30" stroke={TINTA} strokeWidth={2} strokeLinecap="round" />
      <path d="M93 70m-11 0a11 11 0 0 1 4 -8.4L93 70Z" fill={A} />
      <path d="M93 70l-7 -8.4a11 11 0 0 1 14 0Z" fill={AB} />
      <path d="M93 70l7 -8.4a11 11 0 0 1 4 8.4Z" fill={B} />
    </>
  ),

  /* (a + b)² sebagai persegi yang terbagi empat. */
  'kuadrat-jumlah': (
    <>
      <rect x={30} y={10} width={38} height={38} fill={AS} stroke={A} strokeWidth={2} />
      <rect x={68} y={10} width={22} height={38} fill={ABS} stroke={AB} strokeWidth={2} />
      <rect x={30} y={48} width={38} height={22} fill={ABS} stroke={AB} strokeWidth={2} />
      <rect x={68} y={48} width={22} height={22} fill={BS} stroke={B} strokeWidth={2} />
      <text x={49} y={34} textAnchor="middle" fontSize={13} fontWeight={700} fill={A} fontFamily="var(--font-math)">
        a²
      </text>
      <text x={79} y={64} textAnchor="middle" fontSize={12} fontWeight={700} fill={B} fontFamily="var(--font-math)">
        b²
      </text>
    </>
  ),

  /* Pythagoras: persegi pada ketiga sisi segitiga siku-siku. */
  pythagoras: (
    <>
      <path d="M46 52H74V31Z" fill="var(--surface)" stroke={TINTA} strokeWidth={2} strokeLinejoin="round" />
      <rect x={46} y={52} width={28} height={22} fill={AS} stroke={A} strokeWidth={1.8} />
      <rect x={74} y={31} width={21} height={21} fill={BS} stroke={B} strokeWidth={1.8} />
      <path d="M46 52L74 31L53 3L25 24Z" fill={ABS} stroke={AB} strokeWidth={1.8} strokeLinejoin="round" />
    </>
  ),

  /* Peluang: banyak lemparan, lalu batangnya makin rata. */
  'peluang-simulasi': (
    <>
      <rect x={16} y={22} width={34} height={34} rx={7} fill={AS} stroke={A} strokeWidth={2.2} />
      {[
        [25, 31],
        [41, 31],
        [33, 39],
        [25, 47],
        [41, 47],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3} fill={A} />
      ))}
      {[30, 22, 26, 24].map((h, i) => (
        <rect key={i} x={62 + i * 11} y={62 - h} width={8} height={h} rx={2} fill={i % 2 ? B : AB} />
      ))}
      <path d="M60 62h46" stroke={TINTA} strokeWidth={1.8} strokeLinecap="round" />
    </>
  ),

  /* Kerucut berisi sepertiga tabung. */
  'kerucut-sepertiga': (
    <>
      <path d="M18 24v36a16 5 0 0 0 32 0V24" fill={AS} stroke={A} strokeWidth={2} />
      <ellipse cx={34} cy={24} rx={16} ry={5} fill="var(--surface)" stroke={A} strokeWidth={2} />
      <path d="M18 48a16 5 0 0 0 32 0v12a16 5 0 0 1 -32 0Z" fill={A} fillOpacity={0.6} />
      <path d="M86 16L70 60a16 5 0 0 0 32 0Z" fill={BS} stroke={B} strokeWidth={2} strokeLinejoin="round" />
      <path d="M70 60a16 5 0 0 1 32 0" fill="none" stroke={B} strokeWidth={1.4} strokeDasharray="3 3" />
      <text x={60} y={44} textAnchor="middle" fontSize={15} fontWeight={700} fill={TINTA} fontFamily="var(--font-math)">
        ⅓
      </text>
    </>
  ),

  /* Parabola dan titik puncaknya. */
  parabola: (
    <>
      <path d="M14 58h92M60 8v64" stroke="var(--m-axis)" strokeWidth={1.5} />
      <path d="M26 12Q60 100 94 12" stroke={A} {...garis} strokeWidth={2.8} />
      <circle cx={60} cy={56} r={4.5} fill={HI} stroke="var(--surface)" strokeWidth={1.5} />
    </>
  ),

  /* Deret Gauss: dua tangga yang digabung menjadi persegi panjang. */
  'deret-gauss': (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x={26 + i * 14} y={62 - (i + 1) * 9} width={12} height={(i + 1) * 9} rx={2} fill={A} fillOpacity={0.75} />
          <rect x={26 + i * 14} y={8} width={12} height={(5 - i) * 9} rx={2} fill={B} fillOpacity={0.6} />
        </g>
      ))}
    </>
  ),

  /* Eksponen: lipat dua terus-menerus. */
  'eksponen-logaritma': (
    <>
      <path d="M16 64h92M20 10v58" stroke="var(--m-axis)" strokeWidth={1.5} />
      <path d="M20 62C56 60 82 48 100 10" stroke={A} {...garis} strokeWidth={2.8} />
      {[
        [34, 60],
        [56, 55],
        [76, 42],
        [92, 23],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3.6} fill={B} stroke="var(--surface)" strokeWidth={1.2} />
      ))}
    </>
  ),

  /* Sinus dan kosinus dari titik yang berputar pada lingkaran satuan. */
  'sin-cos-lingkaran': (
    <>
      <circle cx={34} cy={40} r={22} fill="none" stroke={HALUS} strokeWidth={1.6} />
      <path d="M8 40h52M34 14v52" stroke="var(--m-axis)" strokeWidth={1.2} />
      <path d="M34 40L49.6 24.4" stroke={TINTA} strokeWidth={2} strokeLinecap="round" />
      <path d="M49.6 24.4V40" stroke={A} strokeWidth={2.6} strokeLinecap="round" />
      <path d="M34 40H49.6" stroke={B} strokeWidth={2.6} strokeLinecap="round" />
      <circle cx={49.6} cy={24.4} r={3.6} fill={HI} />
      <path d="M66 40q6 -26 12 0t12 0t12 0" stroke={A} {...garis} />
    </>
  ),

  /* Turunan: garis yang menyinggung kurva di satu titik. */
  'turunan-kemiringan': (
    <>
      <path d="M14 64h92M20 10v58" stroke="var(--m-axis)" strokeWidth={1.5} />
      <path d="M22 60C48 58 70 44 98 12" stroke={A} {...garis} strokeWidth={2.8} />
      <path d="M40 66L100 22" stroke={B} strokeWidth={2.4} strokeLinecap="round" />
      <circle cx={70} cy={44} r={4.5} fill={HI} stroke="var(--surface)" strokeWidth={1.5} />
    </>
  ),

  /* Integral: luas di bawah kurva dari tumpukan persegi panjang. */
  'integral-luas': (
    <>
      <path d="M14 64h92M20 10v58" stroke="var(--m-axis)" strokeWidth={1.5} />
      {[14, 24, 32, 38, 42, 44].map((h, i) => (
        <rect key={i} x={26 + i * 12} y={64 - h} width={11} height={h} fill={A} fillOpacity={0.45} stroke={A} strokeWidth={1.2} />
      ))}
      <path d="M24 54C44 26 70 18 100 18" stroke={B} {...garis} strokeWidth={2.8} />
    </>
  ),

  /* Rata-rata sebagai titik keseimbangan data. */
  'rata-rata-menipu': (
    <>
      <path d="M12 46h96" stroke={TINTA} strokeWidth={2.4} strokeLinecap="round" />
      {[20, 28, 34, 40].map((x, i) => (
        <circle key={i} cx={x} cy={38} r={5} fill={A} />
      ))}
      <circle cx={100} cy={38} r={5} fill={HI} />
      <path d="M52 48l-9 16h18Z" fill={BS} stroke={B} strokeWidth={2} strokeLinejoin="round" />
      <path d="M52 30v10" stroke={B} strokeWidth={2} strokeDasharray="3 3" />
    </>
  ),
}

/** Latar lembut tiap sampul, digilir supaya galerinya berwarna tetapi tetap tenang. */
const LATAR = [AS, BS, ABS, CS, HIS]

const benih = (id: string) => id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)

export function GambarKonsep({ id, className = '' }: { id: string; className?: string }) {
  const isi = GAMBAR[id]
  return (
    <span
      className={`gambar-konsep ${className}`}
      style={{ background: LATAR[benih(id) % LATAR.length] }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 80" focusable="false">
        <rect x={6} y={5} width={108} height={70} rx={12} fill="var(--surface)" opacity={0.86} />
        {isi ?? (
          <>
            <circle cx={44} cy={40} r={16} fill={AS} stroke={A} strokeWidth={2.2} />
            <rect x={62} y={26} width={28} height={28} rx={5} fill={BS} stroke={B} strokeWidth={2.2} />
            <path d="M30 62h60" stroke={C} strokeWidth={2.4} strokeLinecap="round" />
          </>
        )}
      </svg>
    </span>
  )
}

/** Dipakai alat uji: daftar konsep yang sudah punya gambar sampul. */
export const KONSEP_BERGAMBAR = Object.keys(GAMBAR)
