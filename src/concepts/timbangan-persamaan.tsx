/* ============================================================
   KONSEP — Kenapa boleh mengurangi kedua ruas persamaan?
   Kelas 7 · Aljabar

   Gagasan: tanda "=" bukan perintah "kerjakan", melainkan
   pernyataan bahwa dua sisi sama berat. Timbangan memperlihatkan
   akibatnya secara langsung — begitu satu sisi saja dikurangi,
   timbangannya miring dan pernyataan itu jadi tidak benar lagi.
   ============================================================ */

import { Svg, Tag } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt, pecahanTeks } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

const W = 680
const H = 430

const CX = W / 2
const BEAM_Y = 132
const LENGAN = 208
const PAN_TURUN = 74
const PAN_LEBAR = 178

/** Seberapa "hidup" sebuah benda digambar: 1 penuh, 0 hilang. */
const hidup = (i: number, jumlah: number) => clamp(jumlah - i, 0, 1)

function Timbangan({
  kiri,
  kanan,
  isiKiri,
  isiKanan,
  catatan,
}: {
  /** berat total sisi kiri dan kanan, untuk menentukan kemiringan. */
  kiri: number
  kanan: number
  isiKiri: (x: number, y: number) => React.ReactNode
  isiKanan: (x: number, y: number) => React.ReactNode
  catatan?: { teks: string; warna: string }
}) {
  const beda = kanan - kiri
  const sudut = clamp(beda * 2.4, -11, 11)
  const rad = (sudut * Math.PI) / 180

  const ex = Math.cos(rad) * LENGAN
  const ey = Math.sin(rad) * LENGAN
  const kiriUjung = { x: CX - ex, y: BEAM_Y - ey }
  const kananUjung = { x: CX + ex, y: BEAM_Y + ey }

  return (
    <g>
      {/* tiang dan alas */}
      <path
        d={`M ${CX - 44} ${H - 46} L ${CX + 44} ${H - 46} L ${CX + 12} ${BEAM_Y + 6} L ${CX - 12} ${BEAM_Y + 6} Z`}
        fill="var(--surface-3)"
        stroke="var(--ink-3)"
        strokeWidth={1.5}
      />
      <rect x={CX - 62} y={H - 46} width={124} height={12} rx={6} fill="var(--ink-3)" />

      {/* palang */}
      <g style={{ transition: 'none' }}>
        <line
          x1={kiriUjung.x}
          y1={kiriUjung.y}
          x2={kananUjung.x}
          y2={kananUjung.y}
          stroke="var(--ink)"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <circle cx={CX} cy={BEAM_Y} r={9} fill="var(--ink)" />

        {/* tali dan piring */}
        {[kiriUjung, kananUjung].map((u, i) => (
          <g key={i}>
            <line
              x1={u.x}
              y1={u.y}
              x2={u.x}
              y2={u.y + PAN_TURUN}
              stroke="var(--ink-3)"
              strokeWidth={2}
            />
            <rect
              x={u.x - PAN_LEBAR / 2}
              y={u.y + PAN_TURUN}
              width={PAN_LEBAR}
              height={9}
              rx={4.5}
              fill="var(--ink-2)"
            />
          </g>
        ))}
      </g>

      {isiKiri(kiriUjung.x, kiriUjung.y + PAN_TURUN)}
      {isiKanan(kananUjung.x, kananUjung.y + PAN_TURUN)}

      {catatan && (
        <Tag x={CX} y={H - 16} warna={catatan.warna} size={16}>
          {catatan.teks}
        </Tag>
      )}
    </g>
  )
}

/** Kotak berlabel x. */
function KotakX({ x, y, o, nyala }: { x: number; y: number; o: number; nyala: boolean }) {
  if (o <= 0.01) return null
  const s = 40
  return (
    <g opacity={o}>
      <rect
        x={x - s / 2}
        y={y - s}
        width={s}
        height={s}
        rx={7}
        fill="var(--m-a)"
        fillOpacity={nyala ? 0.55 : 0.32}
        stroke="var(--m-a)"
        strokeWidth={nyala ? 3 : 2}
      />
      <text
        x={x}
        y={y - s / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={19}
        fontWeight={800}
        fill="var(--m-a)"
      >
        x
      </text>
    </g>
  )
}

/** Bola satuan. */
function Bola({ x, y, o, warna }: { x: number; y: number; o: number; warna: string }) {
  if (o <= 0.01) return null
  return <circle cx={x} cy={y - 11} r={11} fill={warna} fillOpacity={0.75} stroke={warna} strokeWidth={1.6} opacity={o} />
}

/** Susun benda dalam piring: baris berisi maksimal `perBaris`. */
function baris(n: number, perBaris: number, lebar: number, tinggiBaris = 30) {
  const pos: { x: number; y: number; i: number }[] = []
  const total = Math.ceil(n)
  for (let i = 0; i < total; i++) {
    const b = Math.floor(i / perBaris)
    const dalamBaris = Math.min(perBaris, total - b * perBaris)
    const k = i % perBaris
    const step = lebar / Math.max(1, dalamBaris)
    pos.push({ x: (k - (dalamBaris - 1) / 2) * step, y: -b * tinggiBaris, i })
  }
  return pos
}

/** Kotak tingginya 40, jadi barisnya harus berjarak lebih dari itu agar tidak saling tindih. */
const TINGGI_BARIS_KOTAK = 46
/** Bola di kiri diletakkan di atas baris kotak tertinggi (kotak ke-4 membuka baris kedua). */
const angkatBola = (nKotak: number) => -46 - TINGGI_BARIS_KOTAK * (Math.ceil(nKotak / 3) - 1)

/* ---------------- Visual untuk animasi bongkar ---------------- */

/**
 * Angka yang dipakai gambar bongkar. Narasi dan judul langkah WAJIB memakai
 * fungsi ini juga, supaya teks tidak pernah menyebut angka yang berbeda dengan
 * yang benar-benar terlihat di timbangan.
 */
function nilaiBongkar(p: Record<string, number>) {
  const a = Math.max(1, Math.round(p.a ?? 2))
  const b = Math.max(0, Math.round(p.b ?? 3))
  const x = Math.max(1, Math.round(p.x ?? 4))
  return {
    a,
    b,
    x,
    /** bola di kanan pada keadaan awal. */
    c: a * x + b,
    /** bola yang tersisa di kanan setelah b bola dibuang dari KEDUA sisi. */
    sisaKanan: a * x,
  }
}

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const { a, b, x, c } = nilaiBongkar(p)

  const buangSepihak = step === 1 ? seg(t, 0.15, 0.6) : 0
  const buangDua = step >= 2 ? (step === 2 ? seg(t, 0.15, 0.7) : 1) : 0
  const kelompok = fase(step, t, 3)
  const ambilSatu = step >= 4 ? (step === 4 ? seg(t, 0.25, 0.85) : 1) : 0
  const periksa = step >= 5

  // Banyaknya benda pada tiap sisi (boleh pecahan saat beranimasi).
  const nKotak = periksa ? a : a - (a - 1) * ambilSatu
  const nBolaKiri = periksa ? b : b * (1 - Math.max(buangSepihak, buangDua))
  const nBolaKanan = periksa
    ? c
    : (c - b * buangDua) - (a * x - x) * ambilSatu

  const beratKiri = nKotak * x + nBolaKiri
  const beratKanan = nBolaKanan

  const nyalaX = sorot === 'x' || sorot === 'a'
  const nyalaB = sorot === 'b'
  const nyalaC = sorot === 'c'

  const catatan =
    step === 1 && buangSepihak > 0.5
      ? { teks: 'timbangan miring — pernyataannya jadi tidak benar', warna: 'var(--m-hi)' }
      : Math.abs(beratKiri - beratKanan) < 0.01
        ? { teks: 'setimbang — kedua sisi masih bernilai sama', warna: 'var(--m-ab)' }
        : undefined

  return (
    <Svg w={W} h={H} maxH={440} label="Timbangan dua lengan yang mewakili persamaan">
      <Timbangan
        kiri={beratKiri}
        kanan={beratKanan}
        catatan={catatan}
        isiKiri={(px, py) => (
          <g>
            {baris(a, 3, PAN_LEBAR - 46, TINGGI_BARIS_KOTAK).map(({ x: dx, y: dy, i }) => (
              <KotakX key={`k${i}`} x={px + dx} y={py + dy} o={hidup(i, nKotak)} nyala={nyalaX} />
            ))}
            {baris(b, 4, PAN_LEBAR - 40).map(({ x: dx, y: dy, i }) => (
              <Bola
                key={`b${i}`}
                x={px + dx}
                y={py + dy + angkatBola(a)}
                o={hidup(i, nBolaKiri)}
                warna={nyalaB ? 'var(--m-hi)' : 'var(--m-b)'}
              />
            ))}
          </g>
        )}
        isiKanan={(px, py) => (
          <g>
            {baris(c, 5, PAN_LEBAR - 30).map(({ x: dx, y: dy, i }) => (
              <Bola
                key={`c${i}`}
                x={px + dx}
                y={py + dy}
                o={hidup(i, nBolaKanan)}
                warna={nyalaC ? 'var(--m-hi)' : 'var(--m-c)'}
              />
            ))}
          </g>
        )}
      />

      {/* kelompok pembagian */}
      {kelompok > 0.2 && ambilSatu < 0.5 && (
        <Tag x={CX} y={40} warna="var(--m-ab)" size={16}>
          {a === 1
            ? 'cuma satu kotak — tidak ada yang perlu dibagi'
            : `kedua sisi dibagi menjadi ${fmt(a)} kelompok sama besar`}
        </Tag>
      )}
      {periksa && (
        <Tag x={CX} y={40} warna="var(--m-ab)" size={17}>
          {`periksa: ${fmt(a)} × ${fmt(x)} + ${fmt(b)} = ${fmt(c)}`}
        </Tag>
      )}
      {step === 4 && ambilSatu > 0.6 && (
        <Tag x={CX} y={40} warna="var(--m-a)" size={18}>
          {`x = ${fmt(x)}`}
        </Tag>
      )}
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const a = Math.max(1, Math.round(p.a ?? 2))
  const b = Math.max(0, Math.round(p.b ?? 3))
  const c = Math.max(0, Math.round(p.c ?? 11))
  const x = (c - b) / a
  const setimbang = x >= 0

  const nyalaX = sorot === 'x' || sorot === 'a'
  const nyalaB = sorot === 'b'
  const nyalaC = sorot === 'c'

  return (
    <Svg w={W} h={H} maxH={440} label="Timbangan untuk persamaan a x tambah b sama dengan c">
      <Timbangan
        kiri={a * Math.max(0, x) + b}
        kanan={c}
        catatan={{
          teks: setimbang
            ? `x = (${fmt(c)} − ${fmt(b)}) ÷ ${fmt(a)} = ${pecahanTeks(c - b, a)}`
            : 'nilai x menjadi negatif — kotaknya "berutang", timbangan tidak bisa menggambarkannya',
          warna: setimbang ? 'var(--m-ab)' : 'var(--m-hi)',
        }}
        isiKiri={(px, py) => (
          <g>
            {baris(a, 3, PAN_LEBAR - 46, TINGGI_BARIS_KOTAK).map(({ x: dx, y: dy, i }) => (
              <KotakX key={`k${i}`} x={px + dx} y={py + dy} o={1} nyala={nyalaX} />
            ))}
            {baris(b, 4, PAN_LEBAR - 40).map(({ x: dx, y: dy, i }) => (
              <Bola
                key={`b${i}`}
                x={px + dx}
                y={py + dy + angkatBola(a)}
                o={1}
                warna={nyalaB ? 'var(--m-hi)' : 'var(--m-b)'}
              />
            ))}
          </g>
        )}
        isiKanan={(px, py) => (
          <g>
            {baris(c, 5, PAN_LEBAR - 30).map(({ x: dx, y: dy, i }) => (
              <Bola
                key={`c${i}`}
                x={px + dx}
                y={py + dy}
                o={1}
                warna={nyalaC ? 'var(--m-hi)' : 'var(--m-c)'}
              />
            ))}
          </g>
        )}
      />
      <Tag x={CX} y={34} warna="var(--ink)" size={19}>
        {`${a === 1 ? '' : fmt(a)}x ${b === 0 ? '' : `+ ${fmt(b)} `}= ${fmt(c)}`}
      </Tag>
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'timbangan-persamaan',
  topicId: 'smp7-persamaan-linear-satu-variabel',
  judul: 'Menyelesaikan persamaan',
  pertanyaan: 'Kenapa boleh mengurangi kedua ruas persamaan?',
  tagline: 'Persamaan itu timbangan. Selama kedua sisi diperlakukan sama, ia tetap seimbang.',
  kelas: 7,
  domain: 'aljabar',
  tags: ['persamaan', 'linear', 'timbangan', 'aljabar'],

  tebak: {
    pertanyaan:
      'Pada persamaan 2x + 3 = 11, kamu ingin menghilangkan angka 3. Apa yang harus dilakukan?',
    pilihan: [
      {
        id: 'a',
        label: 'Kurangi 3 di ruas kiri saja',
        balasan:
          'Terdengar masuk akal karena angka 3 memang ada di kiri. Tapi begitu satu sisi berubah sendiri, kedua sisi berhenti bernilai sama.',
      },
      {
        id: 'b',
        label: 'Kurangi 3 di kedua ruas',
        benar: true,
        balasan:
          'Betul. Kedua sisi harus diperlakukan sama persis, supaya pernyataan "kiri sama dengan kanan" tetap benar.',
      },
      {
        id: 'c',
        label: 'Pindahkan 3 ke kanan lalu ganti tandanya',
        balasan:
          'Hasil akhirnya memang benar, dan kamu mungkin sudah diajari begitu. Tapi "pindah ruas ganti tanda" hanyalah nama pendek untuk mengurangi 3 di kedua ruas — dan kalau namanya saja yang dihafal, ia gampang salah dipakai.',
      },
    ],
    penutup:
      'Sebentar lagi kamu bisa melihat sendiri apa yang terjadi kalau hanya satu sisi yang diubah.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      { key: 'a', label: 'Banyak kotak x', min: 1, max: 4, step: 1, awal: 2, bulat: true },
      { key: 'b', label: 'Bola tambahan di kiri', min: 1, max: 6, step: 1, awal: 3, bulat: true },
      { key: 'x', label: 'Isi tiap kotak', min: 1, max: 6, step: 1, awal: 4, bulat: true },
    ],
    roles: { a: 'a', x: 'a', b: 'b', c: 'c', nol: 'hi' },
    arti: {
      x: 'Isi setiap kotak — nilai inilah yang sedang dicari.',
      a: 'Banyaknya kotak di sisi kiri.',
      b: 'Bola tambahan di sisi kiri.',
      c: 'Bola di sisi kanan.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Timbangan yang setimbang',
        narasi: (p) => {
          const { a, b, c } = nilaiBongkar(p)
          const kiri =
            a === 1
              ? `1 kotak berisi x dan ${fmt(b)} bola lepas`
              : `${fmt(a)} kotak yang isinya sama-sama x, ditambah ${fmt(b)} bola lepas`
          return `Di kiri ada ${kiri}. Di kanan ada ${fmt(c)} bola, dan timbangannya datar — artinya kedua sisi memang bernilai sama.`
        },
        rumus: '[a:a][x:x] + [b:b] = [c:c]',
        durasi: 1800,
      },
      {
        id: 's1',
        judul: 'Coba buang bola dari satu sisi saja',
        narasi: (p) => {
          const { b, c } = nilaiBongkar(p)
          return `Kamu ambil ${fmt(b)} bola dari kiri saja, sedangkan ${fmt(c)} bola di kanan dibiarkan utuh. Timbangan langsung miring ke kanan — sisi kiri tidak lagi bernilai sama dengan sisi kanan, jadi persamaannya rusak.`
        },
        durasi: 2400,
      },
      {
        id: 's2',
        judul: 'Sekarang buang dari kedua sisi',
        narasi: (p) => {
          const { b } = nilaiBongkar(p)
          return `Sekarang ambil ${fmt(b)} bola dari kiri DAN ${fmt(b)} bola dari kanan, sehingga kedua sisi kehilangan hal yang sama. Timbangan tetap datar — inilah alasan kenapa setiap tindakan harus dikenakan pada kedua ruas.`
        },
        rumus: '[a:a][x:x] = [c:c] − [b:b]',
        durasi: 2400,
      },
      {
        id: 's3',
        judul: (p) =>
          nilaiBongkar(p).a === 1 ? 'Tidak ada yang perlu dibagi' : 'Bagi kedua sisi sama rata',
        narasi: (p) => {
          const { a, sisaKanan } = nilaiBongkar(p)
          return a === 1
            ? `Di kiri tinggal satu kotak saja, jadi tidak ada yang perlu dibagi. Kotak itu sudah berhadapan langsung dengan ${fmt(sisaKanan)} bola di kanan.`
            : `Sisi kiri kini berisi ${fmt(a)} kotak yang isinya sama persis. Karena itu ${fmt(sisaKanan)} bola di kanan boleh kamu bagi menjadi ${fmt(a)} kelompok yang sama banyak.`
        },
        durasi: 2000,
      },
      {
        id: 's4',
        judul: (p) =>
          nilaiBongkar(p).a === 1
            ? 'Isi kotaknya langsung terlihat'
            : 'Sisakan satu kelompok di tiap sisi',
        narasi: (p) => {
          const { a, x } = nilaiBongkar(p)
          // "ambil" di langkah sebelumnya berarti membuang; di sini yang dibuang a − 1 kelompok, jadi pakai "sisakan".
          return a === 1
            ? `Karena kotaknya cuma satu, ${fmt(x)} bola di kanan itu persis isi kotak tersebut. Jadi x = ${fmt(x)}.`
            : `Kalau dua sisi yang sama berat sama-sama dibagi menjadi ${fmt(a)} kelompok yang sama, satu kelompok dari kiri pasti sama berat dengan satu kelompok dari kanan. Sisakan satu kelompok saja: 1 kotak berhadapan dengan ${fmt(x)} bola, jadi x = ${fmt(x)}.`
        },
        rumus: '[x:x] = ([c:c] − [b:b]) ÷ [a:a]',
        durasi: 2200,
      },
      {
        id: 's5',
        judul: 'Periksa kembali',
        narasi: (p) =>
          `Kembalikan semuanya, lalu isi ${nilaiBongkar(p).a === 1 ? 'kotaknya' : 'setiap kotak'} dengan angka yang ditemukan. Timbangan kembali datar — jawabannya benar.`,
        rumus: '[a:a] × [x:x] + [b:b] = [c:c]',
        durasi: 2200,
      },
    ],
  },

  eksperimen: {
    judul: 'Rancang persamaanmu sendiri',
    ajakan:
      'Ubah banyaknya kotak, bola di kiri, dan bola di kanan. Perhatikan kapan timbangan bisa setimbang, dan kapan tidak.',
    params: [
      { key: 'a', label: 'Banyak kotak x', min: 1, max: 4, step: 1, awal: 2, bulat: true },
      { key: 'b', label: 'Bola di kiri', min: 0, max: 8, step: 1, awal: 3, bulat: true },
      { key: 'c', label: 'Bola di kanan', min: 0, max: 20, step: 1, awal: 11, bulat: true },
    ],
    Visual: VisualEksperimen,
    temuan: (p) => {
      const a = Math.max(1, Math.round(p.a ?? 2))
      const b = Math.max(0, Math.round(p.b ?? 3))
      const c = Math.max(0, Math.round(p.c ?? 11))
      const x = (c - b) / a
      const bulat = Number.isInteger(x)
      // a ≤ 4 sehingga pecahan berpenyebut 2 atau 4 punya bentuk desimal tepat: tulis "=", bukan "≈".
      const desimalTepat = Number.isInteger(x * 1000)
      return (
        <p>
          Persamaannya {a === 1 ? '' : fmt(a)}x {b === 0 ? '' : `+ ${fmt(b)} `}= {fmt(c)}, jadi{' '}
          <strong>x = {pecahanTeks(c - b, a)}</strong>
          {bulat ? '' : desimalTepat ? ` = ${fmt(x)}` : ` ≈ ${fmt(x, 3)}`}.{' '}
          {x < 0
            ? 'Nilai x keluar negatif. Timbangan tidak bisa menampilkannya — dan itu justru menunjukkan batas metafora ini: bilangan negatif tetap sah dalam aljabar, meski tidak ada "berat negatif".'
            : bulat
              ? 'Coba buat bola di kanan lebih sedikit daripada bola di kiri, lalu lihat apa yang terjadi.'
              : 'Nilai x tidak harus bulat. Kotaknya boleh berisi pecahan, dan persamaannya tetap sah.'}
        </p>
      )
    },
  },

  penjelasan: {
    SD: (
      <>
        <p>
          Tanda <strong>=</strong> itu bukan aba-aba "ayo hitung". Artinya "sisi kiri dan sisi kanan
          sama beratnya".
        </p>
        <p>
          Kalau kamu mengambil sesuatu dari satu sisi saja, timbangannya langsung miring — dan
          kalimatnya jadi bohong. Tapi kalau kamu mengambil hal yang <strong>sama</strong> dari{' '}
          <strong>kedua</strong> sisi, timbangan tetap datar.
        </p>
        <p>
          Itulah aturannya: apa pun yang kamu lakukan pada satu ruas, lakukan juga pada ruas
          satunya.
        </p>
      </>
    ),
    SMP: (
      <>
        <p>
          Menyelesaikan persamaan berarti mengubahnya menjadi persamaan lain yang{' '}
          <strong>penyelesaiannya sama</strong>, sampai bentuknya sesederhana x = sesuatu. Ada dua
          operasi yang dijamin tidak mengubah penyelesaian:
        </p>
        <ul>
          <li>menambah atau mengurangi bilangan yang sama pada kedua ruas;</li>
          <li>mengalikan atau membagi kedua ruas dengan bilangan yang sama dan bukan nol.</li>
        </ul>
        <p>
          Pada 2x + 3 = 11: kurangi 3 di kedua ruas menjadi 2x = 8, lalu bagi kedua ruas dengan 2
          menjadi x = 4.
        </p>
        <h4>"Pindah ruas, ganti tanda" itu apa sebenarnya</h4>
        <p>
          Itu bukan aturan tersendiri, melainkan nama pendek untuk langkah tadi. Ketika 3 "pindah"
          menjadi −3, yang sesungguhnya terjadi adalah 3 dikurangkan dari kedua ruas. Memahami
          asalnya membuatmu tidak keliru saat bentuk soalnya berubah.
        </p>
        <h4>Kenapa pembagi tidak boleh nol</h4>
        <p>
          Membagi dengan nol sama sekali tidak terdefinisi, jadi langkah itu memang tidak ada.
          Pasangannya, mengalikan kedua ruas dengan nol, bisa dilakukan tetapi menghancurkan
          informasi: dari x = 3 diperoleh 0 = 0, yang dipenuhi oleh semua bilangan, sehingga
          penyelesaiannya berubah. Kebalikannya juga menjebak: 0·x = 0·1 benar untuk setiap x, jadi
          "mencoret" 0 di kedua ruas (membagi dengan 0) untuk menyimpulkan x = 1 tidak sah.
        </p>
        <h4>Batas metafora timbangan</h4>
        <p>
          Timbangan bekerja rapi selama semua yang terlibat positif. Untuk bilangan negatif tidak ada
          "berat negatif", sehingga gambarnya berhenti membantu — walaupun aturannya tetap berlaku.
          Di titik itu, garis bilangan menjadi alat bantu yang lebih tepat.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Secara formal, dua persamaan disebut <strong>ekuivalen</strong> jika himpunan
          penyelesaiannya sama. Cara yang pasti menjaga keekuivalenan adalah menerapkan fungsi{' '}
          <em>injektif</em> yang sama pada kedua ruas, asalkan fungsi itu terdefinisi untuk setiap
          nilai yang bisa diambil kedua ruas. Fungsi f(t) = t − k dan f(t) = t/m (dengan m ≠ 0)
          injektif dan terdefinisi untuk semua bilangan real, sehingga aman.
        </p>
        <p>
          Sebaliknya, mengkuadratkan kedua ruas memakai f(t) = t² yang tidak injektif pada bilangan
          real, sehingga bisa memunculkan <em>akar palsu</em>: dari x = −2 diperoleh x² = 4, yang
          juga dipenuhi x = 2. Karena itulah setiap penyelesaian persamaan yang melibatkan
          pengkuadratan wajib diperiksa kembali. Pada persamaan linear yang diselesaikan hanya
          dengan operasi setara, pemeriksaan untuk menyaring akar palsu tidak diperlukan — meskipun
          tetap berguna untuk menangkap salah hitung.
        </p>
        <p>
          Persamaan linear ax + b = c dengan a ≠ 0 selalu punya tepat satu penyelesaian,
          x = (c − b)/a. Bila a = 0, hanya ada dua kemungkinan: tidak ada penyelesaian (jika b ≠ c),
          atau setiap bilangan menjadi penyelesaian (jika b = c).
        </p>
      </>
    ),
  },

  rumus: {
    src: '[a:a][x:x] + [b:b] = [c:c]  ⟹  [x:x] = ([c:c] − [b:b]) ÷ [a:a]',
    roles: { a: 'a', x: 'a', b: 'b', c: 'c' },
    arti: {
      x: 'Bilangan yang belum diketahui — isi setiap kotak pada timbangan.',
      a: 'Banyaknya kotak, jadi a bukan nol — itulah yang membuat kedua ruas boleh dibagi a. Karena semua kotak isinya sama, hasil baginya di kiri tepat satu kotak.',
      b: 'Tambahan di ruas kiri. Dihilangkan dengan menguranginya dari KEDUA ruas.',
      c: 'Nilai ruas kanan.',
    },
  },

  soal: [
    (rnd) => {
      const a = 2 + Math.floor(rnd() * 4)
      const x = 2 + Math.floor(rnd() * 8)
      const b = 1 + Math.floor(rnd() * 9)
      return {
        id: 'tim-1',
        tipe: 'angka',
        topicId: 'smp7-persamaan-linear-satu-variabel',
        kelas: 7,
        tingkat: 'mudah',
        konsep: 'timbangan-persamaan',
        pertanyaan: `Tentukan nilai x dari persamaan ${a}x + ${b} = ${a * x + b}.`,
        jawaban: x,
        toleransi: 1e-9,
        hint: [
          `Langkah pertama: hilangkan ${b}. Kurangi ${b} dari KEDUA ruas.`,
          `Setelah itu tersisa ${a}x = ${a * x}.`,
          `Terakhir bagi kedua ruas dengan ${a}.`,
        ],
        pembahasan: `${a}x + ${b} = ${a * x + b} → ${a}x = ${a * x} → x = ${x}. Periksa: ${a} × ${x} + ${b} = ${a * x + b}. Cocok.`,
      }
    },
    {
      id: 'tim-2',
      tipe: 'pilihan',
      topicId: 'smp7-persamaan-linear-satu-variabel',
      kelas: 7,
      tingkat: 'sedang',
      konsep: 'timbangan-persamaan',
      pertanyaan: 'Dari 5x − 7 = 18, langkah pertama yang paling praktis adalah...',
      pilihan: [
        { id: 'a', label: 'Tambahkan 7 pada kedua ruas', benar: true },
        {
          id: 'b',
          label: 'Kurangi 7 dari kedua ruas',
          diagnosa:
            'Di ruas kiri tertulis −7, jadi untuk menghilangkannya kamu perlu MENAMBAH 7, bukan mengurangi lagi.',
        },
        {
          id: 'c',
          label: 'Bagi kedua ruas dengan 5 lebih dulu',
          diagnosa:
            'Boleh saja, tetapi jadi lebih rumit: kamu harus membagi 18 dan −7 sekaligus. Menghilangkan suku tetap lebih dulu jauh lebih mudah.',
        },
        {
          id: 'd',
          label: 'Tambahkan 7 pada ruas kiri saja',
          diagnosa: 'Timbangan akan miring. Ruas kiri jadi tidak lagi bernilai sama dengan ruas kanan.',
        },
      ],
      hint: [
        'Yang ingin dihilangkan adalah −7. Operasi apa yang membatalkan pengurangan?',
        'Kebalikan dari mengurangi 7 adalah menambah 7.',
        'Dan operasi itu harus dikenakan pada kedua ruas.',
      ],
      pembahasan:
        '5x − 7 = 18 → tambahkan 7 pada kedua ruas → 5x = 25 → bagi 5 → x = 5.',
    },
    {
      id: 'tim-3',
      tipe: 'urutkan',
      topicId: 'smp7-persamaan-linear-satu-variabel',
      kelas: 7,
      tingkat: 'sedang',
      konsep: 'timbangan-persamaan',
      pertanyaan: 'Susun langkah menyelesaikan 3x + 4 = 19 secara berurutan.',
      langkah: [
        'Kurangi 4 dari kedua ruas',
        'Persamaan menjadi 3x = 15',
        'Bagi kedua ruas dengan 3',
        'Diperoleh x = 5',
        'Periksa: 3 × 5 + 4 = 19',
      ],
      hint: [
        'Hilangkan dulu bilangan yang berdiri sendiri, baru urus angka di depan x.',
        'Memeriksa hasil selalu menjadi langkah terakhir.',
      ],
      pembahasan:
        'Urutannya: hilangkan suku tetap → sederhanakan → bagi dengan koefisien → dapatkan x → periksa kembali.',
    },
    {
      id: 'tim-4',
      tipe: 'benar-salah',
      topicId: 'smp7-persamaan-linear-satu-variabel',
      kelas: 8,
      tingkat: 'sulit',
      konsep: 'timbangan-persamaan',
      pertanyaan:
        'Dari persamaan 0 · x = 0 kita boleh membagi kedua ruas dengan x untuk memperoleh 0 = 0, lalu menyimpulkan x = 1.',
      jawaban: false,
      diagnosa:
        'Dua masalah sekaligus: membagi dengan x tidak sah kalau x mungkin nol, dan dari 0 = 0 tidak ada informasi apa pun tentang x.',
      hint: [
        'Operasi apa yang tidak boleh dilakukan pada kedua ruas?',
        'Membagi hanya boleh dengan bilangan yang pasti bukan nol.',
        'Kalaupun boleh, apakah 0 = 0 memberitahumu berapa nilai x?',
      ],
      pembahasan:
        'Salah. Persamaan 0 · x = 0 dipenuhi oleh SEMUA bilangan x. Membagi dengan sesuatu yang mungkin nol merusak keekuivalenan, dan kesimpulan x = 1 tidak punya dasar.',
    },
    (rnd) => {
      const a = 2 + Math.floor(rnd() * 3)
      const x = 3 + Math.floor(rnd() * 6)
      const b = 1 + Math.floor(rnd() * 5)
      // d < a supaya koefisien sisa (a − d) positif dan tidak nol:
      // bila d = a persamaannya jadi identitas yang dipenuhi semua x.
      const d = 1 + Math.floor(rnd() * (a - 1))
      const k = a - d
      const e = a * x + b - d * x
      const suku = (n: number) => (n === 1 ? 'x' : `${n}x`)
      return {
        id: 'tim-5',
        tipe: 'angka',
        topicId: 'smp7-persamaan-linear-satu-variabel',
        kelas: 8,
        tingkat: 'sulit',
        konsep: 'timbangan-persamaan',
        pertanyaan: `Tentukan nilai x dari ${a}x + ${b} = ${suku(d)} + ${e}.`,
        jawaban: x,
        toleransi: 1e-9,
        hint: [
          'Sekarang kotak berisi x ada di kedua sisi timbangan. Kumpulkan dulu di satu sisi.',
          `Kurangi ${suku(d)} dari kedua ruas sehingga tersisa ${suku(k)} + ${b} = ${e}.`,
          k === 1
            ? `Lalu kurangi ${b} dari kedua ruas; nilai x langsung terlihat.`
            : `Lalu kurangi ${b} dari kedua ruas, dan bagi dengan ${k}.`,
        ],
        pembahasan: `${a}x + ${b} = ${suku(d)} + ${e} → ${suku(k)} = ${e - b}${k === 1 ? '' : ` → x = ${x}`}. Periksa: ${a} × ${x} + ${b} = ${a * x + b} dan ${d} × ${x} + ${e} = ${d * x + e}. Mengurangi ${suku(d)} dari kedua ruas sama sahnya dengan mengurangi bilangan biasa: yang penting kedua sisi diperlakukan sama.`,
      }
    },
  ],

  lanjut: ['negatif-kali-negatif', 'kuadrat-jumlah', 'parabola'],
}

export default konsep
