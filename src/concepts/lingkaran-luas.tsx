/* ============================================================
   KONSEP — Kenapa luas lingkaran πr²?
   Kelas 6 · Pengukuran

   Gagasan pembuktian: lingkaran dipotong menjadi n juring lalu
   disusun berselang-seling. Susunan itu MENDEKATI persegi panjang
   dengan tinggi r dan panjang setengah keliling = πr.
   Makin banyak potongannya, makin baik pendekatannya — dan anak
   sendiri yang menggeser jumlah potongannya.

   Kejujuran matematis: untuk n berhingga bentuknya TIDAK PERNAH
   benar-benar persegi panjang. Ini argumen limit, dan hal itu
   dinyatakan terang-terangan pada bagian penjelasan.
   ============================================================ */

import { Svg, Tag, Dimensi } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'
import { Juring } from '../visuals/juring'

const W = 680
const H = 430
const SKALA = 24 // piksel per satuan panjang

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const r = p.r ?? 4
  const n = Math.max(4, Math.round(p.n ?? 12))
  const R = r * SKALA

  const cx = W / 2
  const cy = 190
  const lebar = Math.PI * R
  const rx = cx - lebar / 2
  const ry = cy - R / 2

  // Tahapan
  const seams = fase(step, t, 1) // garis potong bermunculan
  const susun = step >= 2 ? (step === 2 ? seg(t, 0.05, 0.95) : 1) : 0
  const kotak = fase(step, t, 3) // bingkai persegi panjang
  const nyalaTinggi = fase(step, t, 4) || sorot === 'r2' || sorot === 'jari'
  const nyalaPanjang = fase(step, t, 5) || sorot === 'pi'
  const selesai = step >= 6

  const luas = Math.PI * r * r

  return (
    <Svg w={W} h={H} maxH={440} label="Lingkaran dipotong menjadi juring lalu disusun menyerupai persegi panjang">
      {/* bingkai persegi panjang tujuan */}
      {kotak > 0 && (
        <rect
          x={rx}
          y={ry}
          width={lebar}
          height={R}
          rx={4}
          fill="none"
          stroke="var(--m-axis)"
          strokeWidth={1.6}
          strokeDasharray="7 7"
          opacity={kotak * 0.75}
        />
      )}

      {/* lingkaran utuh, memudar saat garis potong muncul */}
      {seams < 1 && (
        <circle cx={cx} cy={cy} r={R} fill="var(--m-a)" fillOpacity={0.6} opacity={1 - seams} />
      )}

      {/* juring */}
      <g opacity={seams}>
        <Juring n={n} t={susun} r={R} cx={cx} cy={cy} rx={rx} ry={ry} />
      </g>

      {/* jari-jari pada keadaan lingkaran */}
      {susun < 0.15 && (
        <g opacity={1 - susun / 0.15}>
          <line
            x1={cx}
            y1={cy}
            x2={cx + R}
            y2={cy}
            stroke="var(--ink)"
            strokeWidth={sorot === 'jari' ? 4 : 2.5}
          />
          <circle cx={cx} cy={cy} r={4} fill="var(--ink)" />
          <Tag x={cx + R / 2} y={cy - 16} warna="var(--ink)" size={16}>
            {`r = ${fmt(r)}`}
          </Tag>
        </g>
      )}

      {/* tinggi susunan */}
      {susun > 0.85 && (
        <g opacity={(susun - 0.85) / 0.15}>
          <Dimensi
            x1={rx - 18}
            y1={ry}
            x2={rx - 18}
            y2={ry + R}
            label={`r = ${fmt(r)}`}
            warna={nyalaTinggi ? 'var(--m-b)' : 'var(--m-axis)'}
          />
        </g>
      )}

      {/* panjang susunan */}
      {susun > 0.85 && (
        <g opacity={(susun - 0.85) / 0.15}>
          <Dimensi
            x1={rx}
            y1={ry + R + 26}
            x2={rx + lebar}
            y2={ry + R + 26}
            label={nyalaPanjang ? `π × r = ${fmt(Math.PI * r, 2)}` : 'setengah keliling'}
            warna={nyalaPanjang ? 'var(--m-a)' : 'var(--m-axis)'}
          />
        </g>
      )}

      {/* keterangan tiap tahap */}
      {step === 1 && (
        <Tag x={cx} y={cy + R + 40} warna="var(--ink-2)" size={16}>
          {`dipotong menjadi ${n} juring`}
        </Tag>
      )}
      {step === 3 && (
        <Tag x={cx} y={54} warna="var(--ink-2)" size={16}>
          {n >= 24 ? 'sudah hampir persis persegi panjang' : 'geser jumlah potongan ke kanan'}
        </Tag>
      )}
      {step === 5 && (
        <Tag x={cx} y={54} warna="var(--m-a)" size={17}>
          {`keliling = 2 × π × r, jadi setengahnya = π × r`}
        </Tag>
      )}
      {selesai && (
        <Tag x={cx} y={54} warna="var(--m-ab)" size={19}>
          {`luas = π × ${fmt(r)} × ${fmt(r)} = ${fmt(luas, 2)}`}
        </Tag>
      )}
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const r = p.r ?? 4
  const n = Math.max(4, Math.round(p.n ?? 16))
  const susun = clamp(p.susun ?? 1, 0, 1)
  const R = r * SKALA

  const cx = W / 2
  const cy = 200
  const lebar = Math.PI * R
  const rx = cx - lebar / 2
  const ry = cy - R / 2

  // Selisih bentuk: tinggi susunan sebenarnya r*cos(pi/n), bukan tepat r.
  const tinggiNyata = R * Math.cos(Math.PI / n)
  const galat = (1 - Math.cos(Math.PI / n)) * 100

  return (
    <Svg w={W} h={H} maxH={440} label="Lingkaran yang bisa diubah jari-jari dan jumlah potongannya">
      <rect
        x={rx}
        y={ry}
        width={lebar}
        height={R}
        rx={4}
        fill="none"
        stroke="var(--m-axis)"
        strokeWidth={1.5}
        strokeDasharray="7 7"
        opacity={susun * 0.6}
      />

      <Juring n={n} t={susun} r={R} cx={cx} cy={cy} rx={rx} ry={ry} />

      {susun > 0.85 && (
        <>
          <Dimensi
            x1={rx - 18}
            y1={ry}
            x2={rx - 18}
            y2={ry + R}
            label={`r = ${fmt(r)}`}
            warna={sorot === 'jari' || sorot === 'r2' ? 'var(--m-b)' : 'var(--m-axis)'}
          />
          <Dimensi
            x1={rx}
            y1={ry + R + 26}
            x2={rx + lebar}
            y2={ry + R + 26}
            label={`π r = ${fmt(Math.PI * r, 2)}`}
            warna={sorot === 'pi' ? 'var(--m-a)' : 'var(--m-axis)'}
          />
          {/* garis tinggi susunan yang sebenarnya — memperlihatkan bahwa
              bentuknya belum benar-benar persegi panjang */}
          {galat > 0.4 && (
            <line
              x1={rx}
              y1={ry + (R - tinggiNyata) / 2 + tinggiNyata}
              x2={rx + lebar}
              y2={ry + (R - tinggiNyata) / 2 + tinggiNyata}
              stroke="var(--m-hi)"
              strokeWidth={1.4}
              strokeDasharray="3 4"
              opacity={0.8}
            />
          )}
        </>
      )}

      <Tag x={cx} y={44} warna="var(--m-ab)" size={19}>
        {`Luas = π r² = ${fmt(Math.PI * r * r, 2)}`}
      </Tag>
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'lingkaran-luas',
  topicId: 'sd6-keliling-dan-luas-lingkaran',
  judul: 'Luas lingkaran',
  pertanyaan: 'Kenapa luas lingkaran πr²?',
  tagline:
    'Potong lingkaran jadi juring, susun ulang — bentuknya berubah menjadi sesuatu yang sudah kamu kenal.',
  kelas: 6,
  domain: 'pengukuran',
  tags: ['lingkaran', 'luas', 'juring', 'pi', 'jari-jari'],

  tebak: {
    pertanyaan:
      'Sebuah lingkaran jari-jarinya kamu perbesar menjadi dua kali lipat. Luasnya menjadi berapa kali lipat?',
    pilihan: [
      {
        id: 'a',
        label: '2 kali',
        balasan:
          'Ini tebakan paling umum: kalau jari-jarinya dua kali, luasnya juga dua kali. Tapi luas mengukur bidang — ia tumbuh ke dua arah sekaligus.',
      },
      {
        id: 'b',
        label: '3 kali',
        balasan: 'Angka 3 mungkin terbawa dari π ≈ 3, padahal π tidak menentukan pertumbuhannya.',
      },
      {
        id: 'c',
        label: '4 kali',
        benar: true,
        balasan:
          'Betul. Karena r muncul dua kali dalam πr², menggandakan r berarti mengalikan luas dengan 2 × 2 = 4.',
      },
      {
        id: 'd',
        label: '8 kali',
        balasan:
          'Delapan kali berlaku untuk VOLUME bola (r muncul tiga kali), bukan untuk luas lingkaran.',
      },
    ],
    penutup:
      'Simpan dulu tebakanmu. Nanti kamu bisa mengujinya sendiri dengan menggeser jari-jari di bagian eksperimen.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      { key: 'r', label: 'Jari-jari', min: 2, max: 6, step: 0.5, awal: 4 },
      { key: 'n', label: 'Jumlah potongan', min: 4, max: 48, step: 2, awal: 12, bulat: true },
    ],
    roles: { pi: 'a', jari: 'b', r2: 'b', luas: 'ab', keliling: 'a' },
    arti: {
      pi: 'Muncul dari panjang susunan, yaitu setengah keliling lingkaran.',
      jari: 'Jari-jari — jarak dari pusat ke tepi lingkaran.',
      r2: 'Satu r dari tinggi susunan, satu r lagi dari panjangnya. Itulah sebabnya r dikuadratkan.',
      keliling: 'Keliling lingkaran, 2 × π × r.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Mulai dari satu lingkaran',
        narasi:
          'Yang kita tahu tentang lingkaran ini cuma satu angka: jari-jarinya. Belum ada rumus luas sama sekali.',
        rumus: 'jari-jari = [jari:r]',
        durasi: 1400,
      },
      {
        id: 's1',
        judul: 'Potong menjadi juring',
        narasi:
          'Lingkaran dibelah dari pusat menjadi potongan-potongan seperti irisan pizza. Tidak ada bagian yang dibuang, jadi luas totalnya tetap sama.',
        durasi: 1600,
      },
      {
        id: 's2',
        judul: 'Susun berselang-seling',
        narasi:
          'Potongan disusun bergantian: satu menghadap bawah, satu menghadap atas. Luasnya masih sama persis — hanya letaknya yang berubah.',
        durasi: 2400,
      },
      {
        id: 's3',
        judul: 'Makin banyak potongan, makin rapi',
        narasi:
          'Geser "jumlah potongan" ke kanan. Sisi bergelombangnya makin lurus, dan bentuknya makin mendekati persegi panjang.',
        durasi: 2000,
      },
      {
        id: 's4',
        judul: 'Tingginya adalah jari-jari',
        narasi:
          'Setiap potongan berdiri setinggi jarak dari pusat ke tepi. Jadi tinggi susunan ini mendekati r.',
        rumus: 'tinggi ≈ [jari:r]',
        durasi: 1800,
      },
      {
        id: 's5',
        judul: 'Panjangnya adalah setengah keliling',
        narasi:
          'Sisi lengkung semua potongan bergantian ke atas dan ke bawah, jadi masing-masing sisi memakai separuh keliling. Karena keliling 2πr, panjangnya πr.',
        rumus: '[keliling:2πr] ÷ 2 = [pi:π] × [jari:r]',
        durasi: 2200,
      },
      {
        id: 's6',
        judul: 'Luas persegi panjang itu jawabannya',
        narasi:
          'Luas persegi panjang adalah panjang kali lebar. Di sini: πr dikali r. Dari situlah r dikuadratkan — bukan dari aturan hafalan.',
        rumus: '[luas:L] = [pi:π] × [jari:r] × [jari:r] = [pi:π][r2:r^2]',
        durasi: 2200,
      },
    ],
  },

  eksperimen: {
    judul: 'Geser potongannya, lalu geser jari-jarinya',
    ajakan:
      'Penggeser "susunan" memindahkan potongan dari bentuk lingkaran ke bentuk persegi panjang. Perhatikan garis merah muda: itu tinggi susunan yang sebenarnya.',
    params: [
      { key: 'r', label: 'Jari-jari', min: 1, max: 6, step: 0.5, awal: 4 },
      { key: 'n', label: 'Jumlah potongan', min: 4, max: 64, step: 2, awal: 16, bulat: true },
      { key: 'susun', label: 'Susunan', min: 0, max: 1, step: 0.02, awal: 1 },
    ],
    Visual: VisualEksperimen,
    temuan: (p) => {
      const r = p.r ?? 4
      const n = Math.max(4, Math.round(p.n ?? 16))
      const galat = (1 - Math.cos(Math.PI / n)) * 100
      return (
        <p>
          <strong>Luasnya {fmt(Math.PI * r * r, 2)} satuan persegi.</strong> Dengan {n} potongan,
          tinggi susunan masih meleset sekitar {fmt(galat, 2)}% dari r — jadi bentuknya belum
          benar-benar persegi panjang. Tambah potongannya dan lihat angka itu mengecil, tetapi tidak
          pernah tepat nol. Lalu coba gandakan jari-jarinya: luasnya melompat empat kali, bukan dua.
        </p>
      )
    },
  },

  penjelasan: {
    SD: (
      <>
        <p>
          Bayangkan sebuah pizza bundar. Kamu potong menjadi banyak irisan, lalu kamu susun ulang:
          satu irisan menghadap bawah, irisan berikutnya menghadap atas, begitu seterusnya.
        </p>
        <p>
          Kalau irisannya sedikit, susunannya masih bergelombang. Tapi kalau irisannya sangat banyak
          dan tipis-tipis, susunan itu makin mirip <strong>persegi panjang</strong>.
        </p>
        <p>
          Tinggi persegi panjang itu adalah jarak dari tengah pizza ke pinggirnya, yaitu{' '}
          <strong>r</strong>. Panjangnya adalah separuh keliling pizza, yaitu <strong>πr</strong>.
        </p>
        <p>
          Luas persegi panjang = panjang × tinggi = πr × r. Karena tidak ada pizza yang hilang saat
          disusun ulang, itulah luas lingkarannya.
        </p>
      </>
    ),
    SMP: (
      <>
        <p>
          Potong lingkaran menjadi <em>n</em> juring sama besar. Menyusun ulang tidak mengubah luas,
          karena luas bersifat aditif: luas gabungan potongan yang tidak tumpang tindih sama dengan
          jumlah luas potongannya.
        </p>
        <p>
          Pada susunan berselang-seling, sisi lengkung potongan bergantian berada di atas dan di
          bawah. Setengah dari potongan menyumbang panjang ke sisi atas, setengah lagi ke sisi bawah.
          Karena total panjang busur seluruh potongan adalah keliling 2πr, panjang susunan mendekati{' '}
          <strong>πr</strong>. Tingginya mendekati <strong>r</strong>. Jadi luas ≈ πr · r = πr².
        </p>
        <h4>Kata "mendekati" itu penting</h4>
        <p>
          Untuk jumlah potongan berapa pun yang berhingga, bentuk itu <strong>bukan</strong> persegi
          panjang: tingginya sebenarnya r·cos(π/n) dan sisinya masih bergerigi. Yang benar adalah
          bentuknya <em>menuju</em> persegi panjang ketika n diperbesar tanpa batas. Inilah gagasan
          limit, dan kamu bisa melihat galatnya mengecil sendiri di bagian eksperimen.
        </p>
        <h4>Cara lain yang lebih rapi</h4>
        <p>
          Anggap tiap juring tipis hampir berupa segitiga beralas busur dan bertinggi r. Luas satu
          juring ≈ ½ × busur × r. Jumlahkan semuanya: ½ × (jumlah semua busur) × r = ½ × 2πr × r ={' '}
          <strong>πr²</strong>. Cara ini memberi hasil yang sama tanpa perlu menyusun ulang apa pun.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Argumen potong-susun adalah versi geometris dari perhitungan integral. Dalam koordinat
          polar, unsur luas adalah dA = ρ dρ dθ, sehingga
        </p>
        <p style={{ textAlign: 'center' }}>
          L = ∫₀^{'2π'} ∫₀^r ρ dρ dθ = ∫₀^{'2π'} (r²/2) dθ = πr²
        </p>
        <p>
          Bagian dalam, ∫₀^r ρ dρ = r²/2, persis merupakan versi kontinu dari "½ × alas × tinggi"
          pada tiap juring tipis. Faktor 2π datang dari menyapu seluruh sudut.
        </p>
        <h4>Kenapa susunan itu benar-benar konvergen</h4>
        <p>
          Dengan n juring, susunan berselang-seling memiliki tinggi r·cos(π/n) dan panjang alas
          n·r·sin(π/n). Luas susunannya adalah n·r²·sin(π/n)·cos(π/n) = (n r²/2)·sin(2π/n). Ketika n
          → ∞, gunakan sin x ≈ x untuk x kecil:
        </p>
        <p style={{ textAlign: 'center' }}>
          (n r²/2) · sin(2π/n) → (n r²/2) · (2π/n) = πr²
        </p>
        <p>
          Jadi luas susunan memang menuju πr², dan selisihnya berorde 1/n². Angka galat yang kamu
          lihat pada eksperimen adalah 1 − cos(π/n), yang juga berorde 1/n².
        </p>
      </>
    ),
  },

  rumus: {
    src: '[luas:L] = [pi:π] × [r2:r^2]',
    roles: { luas: 'ab', pi: 'a', r2: 'b' },
    arti: {
      luas: 'Luas daerah di dalam lingkaran.',
      pi: 'Perbandingan keliling terhadap diameter. Muncul di sini lewat panjang susunan, yaitu setengah keliling.',
      r2: 'Jari-jari dikali jari-jari: satu dari tinggi susunan, satu dari panjangnya. Karena itulah luas tumbuh empat kali saat r digandakan.',
    },
  },

  soal: [
    (rnd) => {
      const r = 3 + Math.floor(rnd() * 8)
      return {
        id: 'lin-1',
        tipe: 'angka',
        topicId: 'sd6-keliling-dan-luas-lingkaran',
        kelas: 6,
        tingkat: 'mudah',
        konsep: 'lingkaran-luas',
        pertanyaan: `Sebuah lingkaran berjari-jari ${r} cm. Berapa luasnya? Gunakan π = 3,14 dan bulatkan sampai dua angka di belakang koma.`,
        jawaban: Math.round(3.14 * r * r * 100) / 100,
        satuan: 'cm²',
        toleransi: 0.02,
        hint: [
          'Rumusnya memakai jari-jari, bukan diameter. Di soal ini yang diketahui sudah jari-jari.',
          `Kuadratkan dulu jari-jarinya: ${r} × ${r} = ${r * r}.`,
          `Lalu kalikan dengan π: 3,14 × ${r * r}.`,
        ],
        pembahasan: `L = πr² = 3,14 × ${r}² = 3,14 × ${r * r} = ${fmt(Math.round(3.14 * r * r * 100) / 100, 2)} cm².`,
      }
    },
    {
      id: 'lin-2',
      tipe: 'pilihan',
      topicId: 'sd6-keliling-dan-luas-lingkaran',
      kelas: 6,
      tingkat: 'sedang',
      konsep: 'lingkaran-luas',
      pertanyaan:
        'Sebuah lingkaran berdiameter 14 cm. Berapa luasnya? Gunakan π = 22/7.',
      pilihan: [
        { id: 'a', label: '154 cm²', benar: true },
        {
          id: 'b',
          label: '616 cm²',
          diagnosa:
            'Kamu memakai 14 sebagai jari-jari. Angka 14 adalah diameter, jadi jari-jarinya 7.',
        },
        {
          id: 'c',
          label: '44 cm²',
          diagnosa:
            'Itu hasil keliling (2πr = 44 cm), bukan luas. Keliling memakai r satu kali, luas memakai r dua kali.',
        },
        {
          id: 'd',
          label: '308 cm²',
          diagnosa: 'Sepertinya kamu menghitung πrd atau lupa membagi diameter menjadi jari-jari.',
        },
      ],
      hint: [
        'Yang diketahui diameter, sedangkan rumus luas memakai jari-jari. Apa hubungan keduanya?',
        'Jari-jari = diameter ÷ 2 = 7 cm.',
        'L = 22/7 × 7 × 7. Perhatikan angka 7 pada penyebut bisa dicoret.',
      ],
      pembahasan:
        'r = 14 ÷ 2 = 7 cm. L = (22/7) × 7² = (22/7) × 49 = 22 × 7 = 154 cm². Kesalahan tersering adalah memakai diameter langsung sebagai r.',
    },
    {
      id: 'lin-3',
      tipe: 'pilihan',
      topicId: 'sd6-keliling-dan-luas-lingkaran',
      kelas: 7,
      tingkat: 'sedang',
      konsep: 'lingkaran-luas',
      pertanyaan:
        'Jari-jari sebuah lingkaran diperbesar menjadi tiga kali lipat. Luasnya menjadi berapa kali lipat?',
      pilihan: [
        { id: 'a', label: '3 kali', diagnosa: 'Itu berlaku untuk keliling, bukan luas. Pada keliling, r muncul satu kali.' },
        { id: 'b', label: '6 kali', diagnosa: 'Angka 6 muncul dari 2 × 3, bukan dari 3 × 3.' },
        { id: 'c', label: '9 kali', benar: true },
        { id: 'd', label: '27 kali', diagnosa: '27 adalah 3³ — itu untuk volume, di mana r muncul tiga kali.' },
      ],
      hint: [
        'Tulis luas yang baru dengan mengganti r menjadi 3r.',
        'π(3r)² = π × 3r × 3r. Berapa hasil 3 × 3?',
        'Bandingkan π × 9r² dengan πr² semula.',
      ],
      pembahasan:
        'L baru = π(3r)² = 9πr² = 9 × L lama. Karena r muncul dua kali dalam rumus, setiap penggandaan r berlaku dua kali juga.',
    },
    {
      id: 'lin-4',
      tipe: 'benar-salah',
      topicId: 'sd6-keliling-dan-luas-lingkaran',
      kelas: 8,
      tingkat: 'sulit',
      konsep: 'lingkaran-luas',
      pertanyaan:
        'Kalau lingkaran dipotong menjadi 1.000 juring lalu disusun berselang-seling, hasilnya adalah persegi panjang yang sempurna.',
      jawaban: false,
      diagnosa:
        'Dengan 1.000 potongan bentuknya memang tampak seperti persegi panjang, tetapi sisinya masih bergerigi sangat halus dan tingginya masih sedikit kurang dari r.',
      hint: [
        'Perhatikan garis merah muda pada eksperimen: apa yang ditandainya?',
        'Tinggi susunan sebenarnya r × cos(π/n), bukan tepat r.',
        'Apakah cos(π/1000) sama dengan 1, atau hanya sangat dekat dengan 1?',
      ],
      pembahasan:
        'Salah. Untuk n berapa pun yang berhingga, bentuknya hanya MENDEKATI persegi panjang. Tingginya r·cos(π/n) selalu sedikit kurang dari r. Rumus πr² benar sebagai nilai limit ketika jumlah potongan diperbesar tanpa batas.',
    },
    {
      id: 'lin-5',
      tipe: 'urutkan',
      topicId: 'sd6-keliling-dan-luas-lingkaran',
      kelas: 6,
      tingkat: 'sedang',
      konsep: 'lingkaran-luas',
      pertanyaan: 'Susun kembali alasan kenapa luas lingkaran adalah πr².',
      langkah: [
        'Potong lingkaran menjadi banyak juring dari pusatnya',
        'Susun juring berselang-seling menghadap atas dan bawah',
        'Bentuknya mendekati persegi panjang bertinggi r',
        'Panjangnya adalah setengah keliling, yaitu πr',
        'Luas persegi panjang itu πr × r = πr²',
      ],
      hint: [
        'Mulai dari tindakan pada lingkarannya, bukan dari rumus.',
        'Tinggi dikenali lebih dulu daripada panjang, karena tinggi langsung terlihat sebagai jari-jari.',
      ],
      pembahasan:
        'Potong → susun → kenali tingginya r → kenali panjangnya πr → kalikan keduanya. Rumus muncul di akhir sebagai kesimpulan.',
    },
    (rnd) => {
      const L = [78.5, 200.96, 314, 452.16, 615.44][Math.floor(rnd() * 5)]
      const r = Math.round(Math.sqrt(L / 3.14))
      return {
        id: 'lin-6',
        tipe: 'angka',
        topicId: 'sd6-keliling-dan-luas-lingkaran',
        kelas: 8,
        tingkat: 'sulit',
        konsep: 'lingkaran-luas',
        pertanyaan: `Luas sebuah lingkaran ${fmt(L, 2)} cm². Berapa jari-jarinya? Gunakan π = 3,14.`,
        jawaban: r,
        satuan: 'cm',
        toleransi: 0.05,
        hint: [
          'Tulis rumusnya lebih dulu: L = πr². Yang dicari sekarang r.',
          `Bagi luas dengan π: ${fmt(L, 2)} ÷ 3,14 = ${fmt(r * r)}.`,
          `Angka ${fmt(r * r)} itu adalah r². Jadi r adalah akar dari ${fmt(r * r)}.`,
        ],
        pembahasan: `Dari L = πr² diperoleh r² = L ÷ π = ${fmt(L, 2)} ÷ 3,14 = ${fmt(r * r)}, sehingga r = ${fmt(r)} cm.`,
      }
    },
  ],

  lanjut: ['pi-dari-mana', 'segitiga-setengah', 'kerucut-sepertiga'],
}

export default konsep
