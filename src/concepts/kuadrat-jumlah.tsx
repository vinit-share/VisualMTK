/* ============================================================
   KONSEP — Kok bisa (a+b)² = a² + 2ab + b²?
   Kelas 8 · Aljabar

   Gagasan pembuktian: satu persegi bersisi (a+b) dihitung luasnya
   dengan DUA cara. Cara pertama langsung: sisi × sisi = (a+b)².
   Cara kedua dengan membaginya menjadi empat daerah: a², ab, ab, b².
   Karena keduanya menghitung luas yang sama, hasilnya wajib sama.

   Bagian penutup sengaja membongkar kesalahan paling sering:
   (a+b)² BUKAN a² + b². Dua ubin ab itulah yang biasanya terlupakan.
   ============================================================ */

import { Svg, Tag, Dimensi } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { fmt } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

const W = 660
const H = 440

/** Susun letak keempat daerah untuk nilai a dan b tertentu. */
function tata(a: number, b: number) {
  const u = Math.min(48, 320 / (a + b))
  const S = (a + b) * u
  const x0 = (W - S) / 2
  const y0 = 74
  const ax = a * u
  const bx = b * u
  return {
    u,
    S,
    x0,
    y0,
    ax,
    bx,
    // daerah: [x, y, lebar, tinggi]
    a2: [x0, y0, ax, ax] as const,
    ab1: [x0, y0 + ax, ax, bx] as const, // kiri bawah, a lebar × b tinggi
    ab2: [x0 + ax, y0, bx, ax] as const, // kanan atas, b lebar × a tinggi
    b2: [x0 + ax, y0 + ax, bx, bx] as const,
  }
}

function Daerah({
  kotak,
  warna,
  label,
  nilai,
  opacity = 1,
  nyala = false,
  u,
}: {
  kotak: readonly [number, number, number, number]
  warna: string
  label: string
  nilai: string
  opacity?: number
  nyala?: boolean
  u: number
}) {
  const [x, y, w, h] = kotak
  const kecil = Math.min(w, h) < 46
  return (
    <g opacity={opacity}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={warna}
        fillOpacity={nyala ? 0.55 : 0.3}
        stroke={warna}
        strokeWidth={nyala ? 3.5 : 2}
      />
      {!kecil && (
        <>
          <text
            x={x + w / 2}
            y={y + h / 2 - (u > 30 ? 8 : 0)}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={Math.min(24, Math.min(w, h) * 0.42)}
            fontWeight={800}
            fill={warna}
            style={{ pointerEvents: 'none' }}
          >
            {label}
          </text>
          {u > 30 && (
            <text
              x={x + w / 2}
              y={y + h / 2 + 14}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={13}
              fontWeight={700}
              fill="var(--ink-2)"
              style={{ pointerEvents: 'none' }}
            >
              {nilai}
            </text>
          )}
        </>
      )}
    </g>
  )
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const a = Math.round(p.a ?? 3)
  const b = Math.round(p.b ?? 2)
  const g = tata(a, b)

  const persegi = fase(step, t, 0)
  const potong = fase(step, t, 1)
  // Keempat daerah muncul berurutan di dalam langkah 2.
  const d1 = step === 2 ? seg(t, 0, 0.3) : step > 2 ? 1 : 0
  const d2 = step === 2 ? seg(t, 0.25, 0.55) : step > 2 ? 1 : 0
  const d3 = step === 2 ? seg(t, 0.5, 0.8) : step > 2 ? 1 : 0
  const d4 = step === 2 ? seg(t, 0.75, 1) : step > 2 ? 1 : 0
  const gabungAb = fase(step, t, 4)
  const sorotHilang = step >= 6 ? seg(t, 0, 0.6) : 0

  const nyalaA = sorot === 'a' || sorot === 'a2'
  const nyalaB = sorot === 'b' || sorot === 'b2'
  const nyalaAb = sorot === 'ab' || sorot === 'dua-ab' || gabungAb > 0.5 || sorotHilang > 0.4

  return (
    <Svg w={W} h={H} maxH={450} label="Persegi bersisi a tambah b yang dibagi menjadi empat daerah">
      {/* persegi utuh */}
      <rect
        x={g.x0}
        y={g.y0}
        width={g.S}
        height={g.S}
        fill={potong > 0.5 ? 'none' : 'var(--m-ghost)'}
        stroke="var(--ink)"
        strokeWidth={2.5}
        opacity={persegi}
      />

      {/* keempat daerah */}
      {d1 > 0 && (
        <Daerah kotak={g.a2} warna="var(--m-a)" label="a²" nilai={fmt(a * a)} opacity={d1} nyala={nyalaA} u={g.u} />
      )}
      {d2 > 0 && (
        <Daerah kotak={g.ab2} warna="var(--m-ab)" label="ab" nilai={fmt(a * b)} opacity={d2} nyala={nyalaAb} u={g.u} />
      )}
      {d3 > 0 && (
        <Daerah kotak={g.ab1} warna="var(--m-ab)" label="ab" nilai={fmt(a * b)} opacity={d3} nyala={nyalaAb} u={g.u} />
      )}
      {d4 > 0 && (
        <Daerah kotak={g.b2} warna="var(--m-b)" label="b²" nilai={fmt(b * b)} opacity={d4} nyala={nyalaB} u={g.u} />
      )}

      {/* garis potong */}
      {potong > 0 && (
        <g opacity={potong}>
          <line
            x1={g.x0 + g.ax}
            y1={g.y0}
            x2={g.x0 + g.ax}
            y2={g.y0 + g.S}
            stroke="var(--ink)"
            strokeWidth={2}
            strokeDasharray="6 5"
          />
          <line
            x1={g.x0}
            y1={g.y0 + g.ax}
            x2={g.x0 + g.S}
            y2={g.y0 + g.ax}
            stroke="var(--ink)"
            strokeWidth={2}
            strokeDasharray="6 5"
          />
        </g>
      )}

      {/* ukuran sisi */}
      {persegi > 0.5 && (
        <>
          {potong < 0.4 ? (
            <>
              <Dimensi
                x1={g.x0}
                y1={g.y0 + g.S + 22}
                x2={g.x0 + g.S}
                y2={g.y0 + g.S + 22}
                label={`a + b = ${fmt(a + b)}`}
                warna="var(--ink-2)"
              />
              <Dimensi
                x1={g.x0 - 22}
                y1={g.y0}
                x2={g.x0 - 22}
                y2={g.y0 + g.S}
                label={`a + b`}
                warna="var(--ink-2)"
              />
            </>
          ) : (
            <>
              <Dimensi
                x1={g.x0}
                y1={g.y0 + g.S + 22}
                x2={g.x0 + g.ax}
                y2={g.y0 + g.S + 22}
                label={`a = ${fmt(a)}`}
                warna={nyalaA ? 'var(--m-a)' : 'var(--m-axis)'}
              />
              <Dimensi
                x1={g.x0 + g.ax}
                y1={g.y0 + g.S + 22}
                x2={g.x0 + g.S}
                y2={g.y0 + g.S + 22}
                label={`b = ${fmt(b)}`}
                warna={nyalaB ? 'var(--m-b)' : 'var(--m-axis)'}
              />
              <Dimensi
                x1={g.x0 - 22}
                y1={g.y0}
                x2={g.x0 - 22}
                y2={g.y0 + g.ax}
                label={`a`}
                warna={nyalaA ? 'var(--m-a)' : 'var(--m-axis)'}
              />
              <Dimensi
                x1={g.x0 - 22}
                y1={g.y0 + g.ax}
                x2={g.x0 - 22}
                y2={g.y0 + g.S}
                label={`b`}
                warna={nyalaB ? 'var(--m-b)' : 'var(--m-axis)'}
              />
            </>
          )}
        </>
      )}

      {/* keterangan tahap */}
      {step === 0 && (
        <Tag x={W / 2} y={40} warna="var(--ink-2)" size={17}>
          {`luas seluruh persegi = (${fmt(a)} + ${fmt(b)})² = ${fmt((a + b) ** 2)}`}
        </Tag>
      )}
      {step === 3 && (
        <Tag x={W / 2} y={40} warna="var(--ink-2)" size={17}>
          {`${fmt(a * a)} + ${fmt(a * b)} + ${fmt(a * b)} + ${fmt(b * b)} = ${fmt((a + b) ** 2)}`}
        </Tag>
      )}
      {step === 4 && (
        <Tag x={W / 2} y={40} warna="var(--m-ab)" size={17}>
          {`dua ubin ab = 2ab = ${fmt(2 * a * b)}`}
        </Tag>
      )}
      {step === 6 && (
        <>
          <Tag x={W / 2} y={36} warna="var(--m-hi)" size={17}>
            {`kalau dua ubin ab dilupakan...`}
          </Tag>
          <Tag x={W / 2} y={H - 22} warna="var(--m-hi)" size={17}>
            {`a² + b² = ${fmt(a * a + b * b)}, padahal (a+b)² = ${fmt((a + b) ** 2)}`}
          </Tag>
        </>
      )}
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const a = Math.round(p.a ?? 3)
  const b = Math.round(p.b ?? 2)
  const g = tata(a, b)
  const nyalaA = sorot === 'a' || sorot === 'a2'
  const nyalaB = sorot === 'b' || sorot === 'b2'
  const nyalaAb = sorot === 'ab' || sorot === 'dua-ab'

  return (
    <Svg w={W} h={H} maxH={450} label="Persegi bersisi a tambah b dengan a dan b yang bisa diubah">
      <Daerah kotak={g.a2} warna="var(--m-a)" label="a²" nilai={fmt(a * a)} nyala={nyalaA} u={g.u} />
      <Daerah kotak={g.ab2} warna="var(--m-ab)" label="ab" nilai={fmt(a * b)} nyala={nyalaAb} u={g.u} />
      <Daerah kotak={g.ab1} warna="var(--m-ab)" label="ab" nilai={fmt(a * b)} nyala={nyalaAb} u={g.u} />
      <Daerah kotak={g.b2} warna="var(--m-b)" label="b²" nilai={fmt(b * b)} nyala={nyalaB} u={g.u} />

      <rect
        x={g.x0}
        y={g.y0}
        width={g.S}
        height={g.S}
        fill="none"
        stroke="var(--ink)"
        strokeWidth={2.5}
      />

      <Dimensi
        x1={g.x0}
        y1={g.y0 + g.S + 22}
        x2={g.x0 + g.ax}
        y2={g.y0 + g.S + 22}
        label={`a = ${fmt(a)}`}
        warna={nyalaA ? 'var(--m-a)' : 'var(--m-axis)'}
      />
      <Dimensi
        x1={g.x0 + g.ax}
        y1={g.y0 + g.S + 22}
        x2={g.x0 + g.S}
        y2={g.y0 + g.S + 22}
        label={`b = ${fmt(b)}`}
        warna={nyalaB ? 'var(--m-b)' : 'var(--m-axis)'}
      />

      <Tag x={W / 2} y={40} warna="var(--ink)" size={19}>
        {`(${fmt(a)} + ${fmt(b)})² = ${fmt((a + b) ** 2)}`}
      </Tag>
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'kuadrat-jumlah',
  topicId: 'smp8-aljabar-bentuk',
  judul: 'Identitas (a+b)²',
  pertanyaan: 'Kok bisa (a+b)² = a² + 2ab + b²?',
  tagline: 'Dua cara menghitung luas persegi yang sama. Hasilnya wajib sama.',
  kelas: 8,
  domain: 'aljabar',
  tags: ['aljabar', 'identitas', 'kuadrat', 'ubin aljabar'],

  tebak: {
    pertanyaan: 'Menurutmu, (3 + 2)² sama dengan berapa?',
    pilihan: [
      {
        id: 'a',
        label: '13',
        balasan:
          'Ini hasil dari 3² + 2² = 9 + 4. Sangat masuk akal kalau kuadrat dianggap bisa "dibagikan" ke tiap suku — tapi ternyata tidak bisa.',
      },
      {
        id: 'b',
        label: '25',
        benar: true,
        balasan: 'Betul: 3 + 2 = 5, lalu 5² = 25. Sebentar lagi kamu lihat 12 selisihnya pergi ke mana.',
      },
      {
        id: 'c',
        label: '11',
        balasan: 'Angka 11 muncul kalau 3 + 2 dikuadratkan sebagian saja. Kuadrat berlaku pada seluruh jumlah.',
      },
    ],
    penutup:
      'Selisih antara 25 dan 13 adalah 12 — dan angka 12 itu bukan kebetulan. Ia punya bentuk yang bisa dilihat.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      { key: 'a', label: 'Nilai a', min: 1, max: 6, step: 1, awal: 3, bulat: true },
      { key: 'b', label: 'Nilai b', min: 1, max: 6, step: 1, awal: 2, bulat: true },
    ],
    roles: { a: 'a', b: 'b', a2: 'a', b2: 'b', ab: 'ab', 'dua-ab': 'ab', jumlah: 'c' },
    arti: {
      a: 'Panjang bagian pertama pada sisi persegi.',
      b: 'Panjang bagian kedua pada sisi persegi.',
      a2: 'Daerah persegi berukuran a × a di pojok kiri atas.',
      b2: 'Daerah persegi berukuran b × b di pojok kanan bawah.',
      ab: 'Daerah persegi panjang a × b. Ada DUA daerah seperti ini.',
      'dua-ab': 'Dua daerah a × b sekaligus — inilah bagian yang paling sering terlupakan.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Satu persegi, sisinya a + b',
        narasi:
          'Sisi persegi ini terdiri atas dua potong: sepanjang a lalu sepanjang b. Luas persegi selalu sisi kali sisi.',
        rumus: 'luas = ([a:a] + [b:b])^2',
        durasi: 1600,
      },
      {
        id: 's1',
        judul: 'Tandai batas antara a dan b',
        narasi:
          'Tarik garis dari titik batas itu, mendatar dan tegak. Persegi tadi kini terbagi menjadi empat daerah.',
        durasi: 1500,
      },
      {
        id: 's2',
        judul: 'Kenali keempat daerahnya',
        narasi:
          'Persegi a × a, dua persegi panjang a × b, dan persegi b × b. Tidak ada bagian yang tersisa dan tidak ada yang bertumpuk.',
        durasi: 2600,
      },
      {
        id: 's3',
        judul: 'Jumlahkan luas keempatnya',
        narasi:
          'Karena keempat daerah itu mengisi persegi yang sama, jumlah luasnya harus sama dengan luas persegi seluruhnya.',
        rumus: '([a:a] + [b:b])^2 = [a2:a^2] + [ab:ab] + [ab:ab] + [b2:b^2]',
        durasi: 2000,
      },
      {
        id: 's4',
        judul: 'Dua ubin yang sama digabung',
        narasi:
          'Kedua persegi panjang a × b ukurannya persis sama. Dua benda yang sama bisa ditulis sebagai 2ab.',
        rumus: '[ab:ab] + [ab:ab] = [dua-ab:2ab]',
        durasi: 1800,
      },
      {
        id: 's5',
        judul: 'Itulah identitasnya',
        narasi:
          'Bukan rumus yang harus dihafal, melainkan catatan tentang cara sebuah persegi terbagi.',
        rumus: '([a:a] + [b:b])^2 = [a2:a^2] + [dua-ab:2ab] + [b2:b^2]',
        durasi: 2000,
      },
      {
        id: 's6',
        judul: 'Kenapa bukan a² + b²?',
        narasi:
          'Kalau kamu hanya menulis a² + b², dua ubin ab itu hilang begitu saja — padahal keduanya nyata menempati ruang di dalam persegi.',
        durasi: 2400,
      },
    ],
  },

  eksperimen: {
    judul: 'Ubah a dan b, perhatikan bagian mana yang paling cepat membesar',
    ajakan:
      'Perhatikan ubin ab. Saat a dan b sama-sama diperbesar, dua ubin itu justru sering menjadi bagian terbesar.',
    params: [
      { key: 'a', label: 'Nilai a', min: 1, max: 7, step: 1, awal: 3, bulat: true },
      { key: 'b', label: 'Nilai b', min: 1, max: 7, step: 1, awal: 2, bulat: true },
    ],
    Visual: VisualEksperimen,
    temuan: (p) => {
      const a = Math.round(p.a ?? 3)
      const b = Math.round(p.b ?? 2)
      const kiri = (a + b) ** 2
      const salah = a * a + b * b
      return (
        <p>
          <strong>
            ({fmt(a)} + {fmt(b)})² = {fmt(kiri)}
          </strong>
          , sedangkan a² + b² hanya {fmt(salah)}. Selisihnya {fmt(kiri - salah)} — persis luas dua
          ubin ab ({fmt(a)} × {fmt(b)} × 2). Coba buat a dan b sama besar: dua ubin ab akan
          menempati setengah dari seluruh persegi.
        </p>
      )
    },
  },

  penjelasan: {
    SMP: (
      <>
        <p>
          Kuncinya satu kalimat: <strong>luas yang sama dihitung dengan dua cara harus memberi
          hasil yang sama.</strong>
        </p>
        <p>
          Cara pertama: sisi persegi itu (a + b), jadi luasnya (a + b)². Cara kedua: bagi persegi
          menjadi empat daerah, lalu jumlahkan luasnya — a² + ab + ab + b². Kedua cara mengukur
          bidang yang sama, sehingga
        </p>
        <p style={{ textAlign: 'center' }}>(a + b)² = a² + 2ab + b²</p>
        <h4>Cara aljabarnya</h4>
        <p>
          Hasil yang sama muncul dari sifat distributif, tanpa gambar sama sekali:
          (a + b)(a + b) = a(a + b) + b(a + b) = a² + ab + ba + b² = a² + 2ab + b². Gambar tadi
          sebenarnya adalah "foto" dari langkah distributif ini.
        </p>
        <h4>Kesalahan yang paling sering</h4>
        <p>
          Menulis (a + b)² = a² + b². Kuadrat <strong>bukan</strong> operasi yang bisa dibagikan ke
          tiap suku. Uji cepat dengan angka: (3 + 2)² = 25, sedangkan 3² + 2² = 13. Selisih 12 itu
          persis 2ab = 2 × 3 × 2.
        </p>
        <h4>Saudara dekatnya</h4>
        <p>
          Dengan gambar serupa kamu juga bisa membaca (a − b)² = a² − 2ab + b² dan
          a² − b² = (a + b)(a − b). Ketiganya lahir dari cara yang sama: memotong bidang lalu
          menghitungnya dua kali.
        </p>
      </>
    ),
    SD: (
      <>
        <p>
          Bayangkan kamu punya kebun berbentuk persegi. Panjang sisinya kamu bagi jadi dua bagian:
          bagian pertama sepanjang <strong>a</strong> langkah, bagian kedua sepanjang{' '}
          <strong>b</strong> langkah.
        </p>
        <p>
          Kalau kamu tarik garis lurus dari titik pembagi itu — sekali mendatar, sekali tegak —
          kebunmu terbagi menjadi empat petak.
        </p>
        <p>
          Ada petak besar a × a, petak kecil b × b, dan <strong>dua</strong> petak panjang a × b.
          Luas seluruh kebun tentu sama dengan jumlah luas keempat petak itu.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Identitas ini adalah kasus n = 2 dari teorema binomial:
          (a + b)ⁿ = Σ C(n,k) aⁿ⁻ᵏ bᵏ. Untuk n = 2 koefisiennya 1, 2, 1 — baris ketiga segitiga
          Pascal. Angka 2 pada 2ab adalah C(2,1), yaitu banyaknya cara memilih satu faktor b dari
          dua faktor yang tersedia.
        </p>
        <p>
          Tafsiran itu terlihat langsung pada gambar: ada tepat dua daerah ab karena ada dua cara
          memasangkan a dari satu arah dengan b dari arah lainnya.
        </p>
        <h4>Kenapa gambarnya hanya untuk a, b positif</h4>
        <p>
          Argumen luas mensyaratkan a, b &gt; 0. Namun identitasnya berlaku pada sembarang gelanggang
          komutatif — termasuk bilangan negatif, pecahan, dan bilangan kompleks — karena bukti
          aljabarnya hanya memakai sifat distributif dan komutatif. Gambar adalah alat untuk{' '}
          <em>melihat</em>, bukan batas keberlakuannya.
        </p>
      </>
    ),
  },

  rumus: {
    src: '([a:a] + [b:b])^2 = [a2:a^2] + [dua-ab:2ab] + [b2:b^2]',
    roles: { a: 'a', b: 'b', a2: 'a', 'dua-ab': 'ab', b2: 'b' },
    arti: {
      a: 'Bagian pertama dari sisi persegi.',
      b: 'Bagian kedua dari sisi persegi.',
      a2: 'Persegi a × a — pojok kiri atas.',
      'dua-ab': 'Dua persegi panjang a × b. Inilah bagian yang hilang kalau kamu menulis a² + b².',
      b2: 'Persegi b × b — pojok kanan bawah.',
    },
  },

  soal: [
    {
      id: 'kj-1',
      tipe: 'pilihan',
      topicId: 'smp8-aljabar-bentuk',
      kelas: 8,
      tingkat: 'mudah',
      konsep: 'kuadrat-jumlah',
      pertanyaan: 'Bentuk (x + 5)² sama dengan...',
      pilihan: [
        { id: 'a', label: 'x² + 25', diagnosa: 'Kamu mengkuadratkan tiap suku sendiri-sendiri. Dua ubin 5x-nya hilang.' },
        { id: 'b', label: 'x² + 5x + 25', diagnosa: 'Ubin persegi panjangnya baru dihitung satu. Ada dua ubin seperti itu.' },
        { id: 'c', label: 'x² + 10x + 25', benar: true },
        { id: 'd', label: 'x² + 10x + 10', diagnosa: 'Bagian terakhir seharusnya b², yaitu 5² = 25, bukan 2 × 5.' },
      ],
      hint: [
        'Cocokkan dengan bentuk (a + b)²: di sini a = x dan b berapa?',
        'Bagian tengahnya 2ab. Hitung 2 × x × 5.',
        'Bagian terakhir b², yaitu 5 × 5.',
      ],
      pembahasan: '(x + 5)² = x² + 2(x)(5) + 5² = x² + 10x + 25.',
    },
    (rnd) => {
      const a = 2 + Math.floor(rnd() * 6)
      const b = 1 + Math.floor(rnd() * 6)
      return {
        id: 'kj-2',
        tipe: 'angka',
        topicId: 'smp8-aljabar-bentuk',
        kelas: 8,
        tingkat: 'sedang',
        konsep: 'kuadrat-jumlah',
        pertanyaan: `Berapa selisih antara (${a} + ${b})² dan ${a}² + ${b}²?`,
        jawaban: 2 * a * b,
        toleransi: 1e-6,
        hint: [
          'Hitung dulu keduanya secara terpisah, lalu kurangkan.',
          `(${a} + ${b})² = ${(a + b) ** 2}, sedangkan ${a}² + ${b}² = ${a * a + b * b}.`,
          'Perhatikan bahwa selisihnya selalu berupa 2ab — luas dua ubin persegi panjang.',
        ],
        pembahasan: `(${a}+${b})² = ${(a + b) ** 2} dan ${a}²+${b}² = ${a * a + b * b}. Selisihnya ${2 * a * b}, yaitu 2 × ${a} × ${b} — persis luas dua ubin ab.`,
      }
    },
    {
      id: 'kj-3',
      tipe: 'benar-salah',
      topicId: 'smp8-aljabar-bentuk',
      kelas: 8,
      tingkat: 'sedang',
      konsep: 'kuadrat-jumlah',
      pertanyaan: 'Untuk semua bilangan a dan b, berlaku (a + b)² = a² + b².',
      jawaban: false,
      diagnosa:
        'Coba masukkan angka mana pun yang keduanya bukan nol, misalnya a = 1 dan b = 1: ruas kiri 4, ruas kanan 2.',
      hint: [
        'Cukup satu contoh yang gagal untuk membuktikan sebuah pernyataan tidak selalu benar.',
        'Coba a = 1 dan b = 1.',
        'Kedua ruas hanya sama kalau 2ab = 0, artinya salah satu di antaranya nol.',
      ],
      pembahasan:
        'Salah. Selisih kedua ruas selalu 2ab. Keduanya baru sama kalau a = 0 atau b = 0. Contoh penyangkal: a = b = 1 memberi 4 ≠ 2.',
    },
    {
      id: 'kj-4',
      tipe: 'cocokkan',
      topicId: 'smp8-aljabar-bentuk',
      kelas: 9,
      tingkat: 'sulit',
      konsep: 'kuadrat-jumlah',
      pertanyaan: 'Pasangkan tiap bentuk dengan hasil penjabarannya.',
      pasangan: [
        { kiri: '(a + b)²', kanan: 'a² + 2ab + b²' },
        { kiri: '(a − b)²', kanan: 'a² − 2ab + b²' },
        { kiri: '(a + b)(a − b)', kanan: 'a² − b²' },
        { kiri: '(a + b)³', kanan: 'a³ + 3a²b + 3ab² + b³' },
      ],
      hint: [
        'Bentuk yang memuat tanda kurang di dalam kurung akan memiliki suku tengah negatif.',
        'Perkalian jumlah dengan selisih membuat suku tengahnya saling meniadakan.',
        'Untuk pangkat tiga, koefisiennya mengikuti baris keempat segitiga Pascal: 1, 3, 3, 1.',
      ],
      pembahasan:
        'Tiga bentuk pertama semuanya bisa dibaca dari gambar persegi. Bentuk keempat adalah versi tiga dimensinya: sebuah kubus bersisi (a+b) terbagi menjadi 8 balok.',
    },
    {
      id: 'kj-5',
      tipe: 'angka',
      topicId: 'smp8-aljabar-bentuk',
      kelas: 9,
      tingkat: 'sulit',
      konsep: 'kuadrat-jumlah',
      pertanyaan:
        'Hitung 102² tanpa kalkulator dengan memanfaatkan identitas (a + b)². Berapa hasilnya?',
      jawaban: 10404,
      toleransi: 1e-6,
      hint: [
        'Pecah 102 menjadi dua angka yang mudah dikuadratkan: 100 dan 2.',
        '(100 + 2)² = 100² + 2 × 100 × 2 + 2².',
        'Jumlahkan: 10.000 + 400 + 4.',
      ],
      pembahasan:
        '102² = (100 + 2)² = 10.000 + 400 + 4 = 10.404. Identitas ini memang lahir sebagai alat hitung cepat, jauh sebelum ada kalkulator.',
    },
  ],

  lanjut: ['pythagoras', 'parabola', 'perkalian-luas'],
}

export default konsep
