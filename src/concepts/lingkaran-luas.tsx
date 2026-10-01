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

import { Pegangan, RelGeser, useInteraksi, type Titik } from '../components/Interaksi'
import { Svg, Tag, Dimensi, useSempit } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'
import { Juring } from '../visuals/juring'

const W = 680
const SKALA = 24 // piksel per satuan panjang

/** Mulai dari jumlah potongan ini susunannya tampak hampir persis persegi panjang. */
const POTONGAN_RAPI = 24

/**
 * Selisih tinggi susunan terhadap r, dalam persen. Tinggi susunan yang
 * sebenarnya r·cos(π/n), selalu kurang dari r.
 */
const galatTinggi = (n: number) => (1 - Math.cos(Math.PI / n)) * 100

/**
 * Puncak potongan berjarak πr/n, jadi barisan puncak selebar (n−1)πr/n —
 * satu jarak antarpuncak lebih pendek dari bingkai πr. Susunan digeser
 * SETENGAH jarak itu supaya duduk tepat di tengah bingkai; kalau tidak,
 * pada n kecil potongan paling kiri menjorok sampai ke luar gambar
 * (n = 4, r = 6, tata letak HP: 9 satuan terpotong).
 */
const geserTengah = (lebar: number, n: number) => lebar / (2 * n)

/**
 * Sudut kiri-atas susunan bergerak sepanjang satu garis lurus saat r berubah:
 * setiap satuan r memindahkannya π/2 satuan ke kiri dan ½ satuan ke atas.
 * Posisi jari diproyeksikan ke garis itu, jadi sudutnya benar-benar mengikuti
 * jari — dan jarak tempuhnya 3,3× lebih panjang daripada menyeret tegak saja.
 */
const K_SUDUT = Math.PI ** 2 / 4 + 0.25
const rDariSudut = (pt: Titik, cx: number, cy: number, skala: number) =>
  ((cx - pt.x) * (Math.PI / 2) + (cy - pt.y) * 0.5) / (skala * K_SUDUT)

/**
 * Nilai bongkar yang diturunkan dari penggeser — dipakai bersama oleh gambar
 * dan teks langkah, supaya angka di narasi selalu sama dengan angka di gambar.
 */
function bacaBongkar(p: Record<string, number>) {
  const r = p.r ?? 4
  const n = Math.max(4, Math.round(p.n ?? 12))
  return {
    r,
    n,
    /** panjang susunan = setengah keliling. */
    setengah: Math.PI * r,
    luas: Math.PI * r * r,
    galat: galatTinggi(n),
    rapi: n >= POTONGAN_RAPI,
  }
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const { r, n, setengah, luas } = bacaBongkar(p)
  const sempit = useSempit()
  const aktif = useInteraksi()?.kendali.aktif
  // Tata letak tegak untuk HP: bentuknya tetap besar, rel potongan di bawah.
  const L = sempit
    ? { w: 420, h: 520, skala: 16, cy: 215, atasY: 40, rel: 470, x1: 78, x2: 342 }
    : { w: W, h: 470, skala: SKALA, cy: 200, atasY: 30, rel: 422, x1: 170, x2: 510 }
  const R = r * L.skala

  const cx = L.w / 2
  const cy = L.cy
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

  return (
    <Svg
      w={L.w}
      h={L.h}
      maxH={470}
      label="Lingkaran dipotong menjadi juring lalu disusun menyerupai persegi panjang"
    >
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

      {/* juring — digeser setengah jarak antarpuncak agar terpusat di bingkai */}
      <g opacity={seams}>
        <Juring n={n} t={susun} r={R} cx={cx} cy={cy} rx={rx + geserTengah(lebar, n)} ry={ry} />
      </g>

      {/* jari-jari pada keadaan lingkaran — tetap tampak sampai pegangan
          berpindah ke sudut susunan, supaya titiknya tidak pernah melayang */}
      {susun < 0.5 && (
        <g opacity={1 - susun / 0.5}>
          <line
            x1={cx}
            y1={cy}
            x2={cx + R}
            y2={cy}
            stroke="var(--ink)"
            strokeWidth={sorot === 'jari' ? 4 : 2.5}
          />
          <circle cx={cx} cy={cy} r={4} fill="var(--ink)" />
          {aktif !== 'r' && (
            <Tag x={cx + R / 2} y={cy - 24} warna="var(--ink)" size={16}>
              {`r = ${fmt(r)}`}
            </Tag>
          )}
        </g>
      )}

      {/* tinggi susunan. Angkanya di atas ujung garis, bukan di tengahnya:
          di tengah ia tertimpa titik pegangan saat r kecil. */}
      {susun > 0.85 && (
        <g opacity={(susun - 0.85) / 0.15}>
          <Dimensi
            x1={rx - 18}
            y1={ry}
            x2={rx - 18}
            y2={ry + R}
            warna={nyalaTinggi || aktif === 'r' ? 'var(--m-b)' : 'var(--m-axis)'}
          />
          {aktif !== 'r' && (
            <Tag x={rx - 18} y={ry - 30} anchor="start" warna={nyalaTinggi ? 'var(--m-b)' : 'var(--ink-2)'} size={14}>
              {`r = ${fmt(r)}`}
            </Tag>
          )}
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
            label={nyalaPanjang ? `π × r = ${fmt(setengah, 2)}` : 'setengah keliling'}
            warna={nyalaPanjang ? 'var(--m-a)' : 'var(--m-axis)'}
          />
        </g>
      )}

      {/* keterangan tiap tahap */}
      {step === 1 && (
        <Tag x={cx} y={L.atasY} warna="var(--ink-2)" size={16}>
          {`dipotong menjadi ${n} juring`}
        </Tag>
      )}
      {step === 3 && (
        <Tag x={cx} y={L.atasY} warna="var(--ink-2)" size={16}>
          {n >= POTONGAN_RAPI ? 'sudah hampir persis persegi panjang' : 'geser rel potongan ke kanan'}
        </Tag>
      )}
      {/* Di HP kalimat ini dipecah dua baris: satu baris utuh selebar 468
          satuan tidak muat pada bingkai 420 dan ujungnya terpotong. */}
      {step === 5 &&
        (sempit
          ? ['keliling = 2 × π × r', 'jadi setengahnya = π × r']
          : ['keliling = 2 × π × r, jadi setengahnya = π × r']
        ).map((baris, i) => (
          <Tag key={baris} x={cx} y={L.atasY + i * 26} warna="var(--m-a)" size={17}>
            {baris}
          </Tag>
        ))}
      {selesai && (
        <Tag x={cx} y={L.atasY} warna="var(--m-ab)" size={19}>
          {`luas = π × ${fmt(r)} × ${fmt(r)} = ${fmt(luas, 2)}`}
        </Tag>
      )}

      {/* Jari-jari dipegang di ujungnya selama masih lingkaran, lalu di sudut
          kiri-atas susunan setelah tersusun. Ajakan "Coba geser aku" hanya
          dipasang pada pegangan yang letaknya tidak di tepi kiri gambar:
          gelembungnya selebar 143 satuan dan akan terpotong di sana. */}
      {susun < 0.5 ? (
        <Pegangan
          x={cx + R}
          y={cy}
          param="r"
          arah="x"
          utama
          label={`r = ${fmt(r)}`}
          keNilai={(pt) => Math.hypot(pt.x - cx, pt.y - cy) / L.skala}
        />
      ) : (
        <Pegangan
          x={rx}
          y={ry}
          param="r"
          arah="bebas"
          label={`r = ${fmt(r)}`}
          keNilai={(pt) => rDariSudut(pt, cx, cy, L.skala)}
        />
      )}
      <RelGeser
        x1={L.x1}
        x2={L.x2}
        y={L.rel}
        param="n"
        label={`${n} potongan`}
        kiri="4"
        kanan="48"
        utama={susun >= 0.5}
      />
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const sempit = useSempit()
  const aktif = useInteraksi()?.kendali.aktif
  const r = p.r ?? 4
  const n = Math.max(4, Math.round(p.n ?? 16))
  const susun = clamp(p.susun ?? 1, 0, 1)

  // Dua tata letak untuk hal yang sama: lebar untuk layar besar, tegak untuk
  // HP. Di HP bentuknya justru digambar lebih besar, bukan dikecilkan.
  // Dua rel perlu jarak tegak ±105 satuan: label nilai rel bawah menjulur 58
  // satuan ke atas dan keterangan ujung rel atas 42 satuan ke bawah (pada
  // skala layar terkecil). Dengan 72 satuan seperti sebelumnya, angka "4" dan
  // "64" di ujung rel potongan tertimpa label "tersusun".
  const L = sempit
    ? { w: 420, h: 520, skala: 16, cy: 216, judulY: 32, relN: 362, relS: 468, x1: 78, x2: 342 }
    : { w: W, h: 500, skala: SKALA, cy: 190, judulY: 36, relN: 350, relS: 452, x1: 150, x2: 530 }
  const R = r * L.skala
  const cx = L.w / 2
  const cy = L.cy
  const lebar = Math.PI * R
  const rx = cx - lebar / 2
  const ry = cy - R / 2

  // Selisih bentuk: tinggi susunan sebenarnya r*cos(pi/n), bukan tepat r.
  // Bila potongan dirapatkan sisi lurus ke sisi lurus, ujung runcing bawah
  // jatuh tepat pada garis y = ry + r*cos(pi/n), yaitu garis yang melewati
  // sudut bawah potongan yang menghadap ke bawah. Garis merah muda digambar
  // di sana, jadi jaraknya dari tepi atas bingkai = tinggi sebenarnya.
  const tinggiNyata = R * Math.cos(Math.PI / n)
  const galat = galatTinggi(n)
  const tersusun = susun >= 0.5
  const nyalaJari = sorot === 'jari' || sorot === 'r2' || aktif === 'r'

  return (
    <Svg w={L.w} h={L.h} maxH={500} label="Lingkaran yang bisa diubah jari-jari dan jumlah potongannya">
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

      <Juring n={n} t={susun} r={R} cx={cx} cy={cy} rx={rx + geserTengah(lebar, n)} ry={ry} />

      {susun > 0.85 && (
        <>
          <Dimensi
            x1={rx - 18}
            y1={ry}
            x2={rx - 18}
            y2={ry + R}
            warna={nyalaJari ? 'var(--m-b)' : 'var(--m-axis)'}
          />
          {/* angkanya di atas ujung garis: di tengah garis ia tertimpa titik
              pegangan pada r kecil, dan di HP terpotong tepi kiri */}
          {aktif !== 'r' && (
            <Tag x={rx - 18} y={ry - 30} anchor="start" warna={nyalaJari ? 'var(--m-b)' : 'var(--ink-2)'} size={14}>
              {`r = ${fmt(r)}`}
            </Tag>
          )}
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
              y1={ry + tinggiNyata}
              x2={rx + lebar}
              y2={ry + tinggiNyata}
              stroke="var(--m-hi)"
              strokeWidth={1.4}
              strokeDasharray="3 4"
              opacity={0.8}
            />
          )}
        </>
      )}

      {/* jari-jari saat masih berbentuk lingkaran — tetap tampak sampai
          pegangan berpindah ke sudut susunan (susun 0,5), jadi titiknya
          selalu menempel pada garis yang dikendalikannya */}
      {susun < 0.5 && (
        <g opacity={1 - susun / 0.5}>
          <line x1={cx} y1={cy} x2={cx + R} y2={cy} stroke="var(--m-b)" strokeWidth={3} />
          <circle cx={cx} cy={cy} r={4} fill="var(--ink)" />
          {aktif !== 'r' && (
            <Tag x={cx + R / 2} y={cy - 24} warna="var(--m-b)" size={15}>
              {`r = ${fmt(r)}`}
            </Tag>
          )}
        </g>
      )}

      <Tag x={cx} y={L.judulY} warna="var(--m-ab)" size={19}>
        {`Luas = π r² = ${fmt(Math.PI * r * r, 2)}`}
      </Tag>

      {/* Jari-jari dipegang langsung: di ujung jari-jari saat masih lingkaran,
          di sudut kiri-atas susunan saat sudah tersusun. Sudut itu bergerak
          menyerong, jadi jari boleh menyeret ke mana saja (lihat rDariSudut).
          Ajakan "Coba geser aku" hanya pada pegangan yang jauh dari tepi
          kiri; di sudut susunan gelembungnya akan terpotong, jadi denyut
          pindah ke rel susunan. */}
      {tersusun ? (
        <Pegangan
          x={rx}
          y={ry}
          param="r"
          arah="bebas"
          label={`r = ${fmt(r)}`}
          keNilai={(pt) => rDariSudut(pt, cx, cy, L.skala)}
        />
      ) : (
        <Pegangan
          x={cx + R}
          y={cy}
          param="r"
          arah="x"
          utama
          label={`r = ${fmt(r)}`}
          keNilai={(pt) => Math.hypot(pt.x - cx, pt.y - cy) / L.skala}
        />
      )}

      <RelGeser x1={L.x1} x2={L.x2} y={L.relN} param="n" label={`${n} potongan`} kiri="4" kanan="64" />
      <RelGeser
        x1={L.x1}
        x2={L.x2}
        y={L.relS}
        param="susun"
        label={susun >= 0.98 ? 'tersusun' : susun <= 0.02 ? 'masih utuh' : 'menyusun…'}
        kiri="lingkaran"
        kanan="persegi panjang"
        utama={tersusun}
      />
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
      { key: 'r', label: 'Jari-jari', min: 2, max: 6, step: 0.5, awal: 4, simbol: 'r', peran: 'b', bagian: 'jari' },
      { key: 'n', label: 'Jumlah potongan', min: 4, max: 48, step: 2, awal: 12, bulat: true, simbol: 'n' },
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
        narasi: (p) =>
          `Yang kamu tahu tentang lingkaran ini cuma satu angka: jari-jarinya ${fmt(bacaBongkar(p).r)}. Belum ada rumus luas sama sekali.`,
        rumus: (p) => `jari-jari = [jari:r] = ${fmt(bacaBongkar(p).r)}`,
        durasi: 1400,
      },
      {
        id: 's1',
        judul: 'Potong menjadi juring',
        narasi: (p) =>
          `Lingkaran dibelah dari pusat menjadi ${fmt(bacaBongkar(p).n)} potongan seperti irisan pizza. Tidak ada bagian yang dibuang, jadi luas totalnya tetap sama.`,
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
        narasi: (p) => {
          const { n, rapi } = bacaBongkar(p)
          return rapi
            ? `Dengan ${fmt(n)} potongan, sisinya sudah hampir lurus dan bentuknya hampir persis persegi panjang. Geser titik pada rel potongan ke kiri kalau kamu ingin melihat gelombangnya muncul lagi.`
            : `Dengan ${fmt(n)} potongan, sisinya masih bergelombang. Geser titik pada rel potongan ke kanan: sisinya makin lurus dan bentuknya makin mendekati persegi panjang.`
        },
        durasi: 2000,
      },
      {
        id: 's4',
        judul: 'Tingginya adalah jari-jari',
        narasi: (p) => {
          // Gambar menaruh ujung runcing tepat r terpisah (potongannya sedikit
          // bertumpuk). Kalau dirapatkan pas sisi lurus ke sisi lurus, jarak
          // kedua barisan ujung runcing r·cos(π/n) — itulah selisih yang disebut.
          const { r, n, galat, rapi } = bacaBongkar(p)
          const awal = `Setiap potongan berdiri setinggi jarak dari pusat ke tepi, yaitu ${fmt(r)}.`
          return rapi
            ? `${awal} Dengan ${fmt(n)} potongan yang dirapatkan pas sisi lurus ke sisi lurus, tinggi susunannya hanya sekitar ${fmt(galat, 1)}% lebih pendek dari ${fmt(r)} — praktis sudah ${fmt(r)}.`
            : `${awal} Tapi dengan ${fmt(n)} potongan yang dirapatkan pas sisi lurus ke sisi lurus, jarak ujung runcing atas ke ujung runcing bawah masih sekitar ${fmt(galat, 1)}% lebih pendek dari ${fmt(r)}.`
        },
        rumus: (p) => `tinggi ≈ [jari:r] = ${fmt(bacaBongkar(p).r)}`,
        durasi: 1800,
      },
      {
        id: 's5',
        judul: 'Panjangnya adalah setengah keliling',
        narasi: (p) => {
          const { r, setengah } = bacaBongkar(p)
          return `Sisi lengkung semua potongan bergantian ke atas dan ke bawah, jadi masing-masing sisi memakai separuh keliling. Keliling lingkaran ini 2 × π × ${fmt(r)}, dan separuhnya π × ${fmt(r)} = ${fmt(setengah, 2)}.`
        },
        rumus: (p) => `[keliling:2πr] ÷ 2 = [pi:π] × [jari:r] = ${fmt(bacaBongkar(p).setengah, 2)}`,
        durasi: 2200,
      },
      {
        id: 's6',
        judul: 'Luas persegi panjang itu jawabannya',
        narasi: (p) => {
          const { r, luas } = bacaBongkar(p)
          return `Luas persegi panjang adalah panjang kali tinggi: π × ${fmt(r)} × ${fmt(r)} = ${fmt(luas, 2)}. Panjangnya π × r dan tingginya r, jadi r terpakai dua kali — dari situlah r dikuadratkan, bukan dari aturan hafalan.`
        },
        rumus: (p) =>
          `[luas:L] = [pi:π] × [jari:r] × [jari:r] = [pi:π][r2:r^2] = ${fmt(bacaBongkar(p).luas, 2)}`,
        durasi: 2200,
      },
    ],
  },

  eksperimen: {
    judul: 'Geser potongannya, lalu geser jari-jarinya',
    ajakan:
      'Seret sudut kiri-atas susunan untuk membesarkan lingkarannya — atau ujung jari-jarinya, selama masih berbentuk lingkaran. Rel potongan menambah juring; rel susunan membuka dan merapikan susunannya. Garis merah muda menandai tinggi susunan yang sebenarnya, r × cos(π/n) — selalu kurang dari r: 29% lebih pendek pada 4 potongan, di bawah 1% mulai 24 potongan, lalu hilang sendiri karena bedanya tidak terlihat lagi.',
    params: [
      { key: 'r', label: 'Jari-jari', min: 1, max: 6, step: 0.5, awal: 4, simbol: 'r', peran: 'b', bagian: 'r2' },
      { key: 'n', label: 'Jumlah potongan', min: 4, max: 64, step: 2, awal: 16, bulat: true, simbol: 'n' },
      { key: 'susun', label: 'Susunan', min: 0, max: 1, step: 0.02, awal: 1 },
    ],
    Visual: VisualEksperimen,
    rumus: (p) => {
      const r = p.r ?? 4
      return `[luas:L] = [pi:π] × [r2:${fmt(r)}^2] = ${fmt(Math.PI * r * r, 2)}`
    },
    temuan: (p) => {
      const r = p.r ?? 4
      const n = Math.max(4, Math.round(p.n ?? 16))
      const galat = galatTinggi(n)
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
          Potong lingkaran menjadi <em>n</em> juring sama besar, dengan <em>n</em> genap supaya
          potongannya bisa dibagi rata ke sisi atas dan sisi bawah. Menyusun ulang tidak mengubah luas,
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
          panjang: jarak antara barisan ujung runcing di bawah dan di atas sebenarnya r·cos(π/n),
          selalu kurang dari r, dan sisi atas-bawahnya masih bergerigi. Yang benar adalah
          bentuknya <em>menuju</em> persegi panjang ketika n diperbesar tanpa batas. Inilah gagasan
          limit, dan kamu bisa melihat galatnya mengecil sendiri di bagian eksperimen.
        </p>
        <h4>Cara lain yang lebih rapi</h4>
        <p>
          Anggap tiap juring tipis hampir berupa segitiga beralas busur dan bertinggi r. Luas satu
          juring ≈ ½ × busur × r. Jumlahkan semuanya: ½ × (jumlah semua busur) × r = ½ × 2πr × r ={' '}
          <strong>πr²</strong>. Cara ini tidak perlu menyusun ulang apa pun, tetapi tetap memakai
          limit yang sama: hampiran "juring = segitiga" baru menjadi tepat ketika potongannya
          dibuat setipis-tipisnya.
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
          Hati-hati satu hal: luas susunan juring selalu <em>tepat</em> sama dengan luas lingkaran,
          berapa pun n — menyusun ulang tidak menambah atau mengurangi apa pun. Jadi yang perlu
          dibuktikan bukan luas susunannya, melainkan bahwa luas lingkaran itu sendiri bernilai πr².
        </p>
        <p>
          Untuk itu, ganti dulu tiap sisi lengkung dengan tali busurnya. Susunan berselang-seling
          tadi menjadi jajar genjang bertinggi r·cos(π/n) dan beralas n·r·sin(π/n) — isinya persis
          segi-n beraturan di dalam lingkaran, hanya ditata ulang. Luasnya n·r²·sin(π/n)·cos(π/n) =
          (n r²/2)·sin(2π/n). Ketika n → ∞, gunakan sin x ≈ x untuk x kecil:
        </p>
        <p style={{ textAlign: 'center' }}>
          (n r²/2) · sin(2π/n) → (n r²/2) · (2π/n) = πr²
        </p>
        <p>
          Segi-n beraturan di <em>luar</em> lingkaran luasnya n·r²·tan(π/n), dan itu pun menuju πr².
          Luas lingkaran terjepit di antara keduanya, jadi nilainya haruslah πr². Selisih segi-n
          dalam terhadap πr² berorde 1/n² (tepatnya ≈ (2π³/3)·r²/n²). Angka galat yang kamu lihat
          pada eksperimen adalah 1 − cos(π/n) ≈ π²/(2n²), yang juga berorde 1/n².
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
          diagnosa:
            '308 adalah π × r × d, yaitu jari-jari dikali diameter. Rumus luas memakai jari-jari dua kali: 22/7 × 7 × 7.',
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
        'L baru = π(3r)² = 9πr² = 9 × L lama. Karena r muncul dua kali dalam rumus, faktor pengali pada r ikut terpakai dua kali: 3 × 3 = 9.',
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
        'Salah. Untuk n berapa pun yang berhingga, bentuknya hanya MENDEKATI persegi panjang. Tingginya r·cos(π/n) selalu kurang dari r, walaupun untuk n = 1.000 selisihnya hanya sekitar 0,0005%. Rumus πr² benar sebagai nilai limit ketika jumlah potongan diperbesar tanpa batas.',
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
        pertanyaan: `Luas sebuah lingkaran ${fmt(L)} cm². Berapa jari-jarinya? Gunakan π = 3,14.`,
        jawaban: r,
        satuan: 'cm',
        toleransi: 0.05,
        hint: [
          'Tulis rumusnya lebih dulu: L = πr². Yang dicari sekarang r.',
          `Bagi luas dengan π: ${fmt(L)} ÷ 3,14 = ${fmt(r * r)}.`,
          `Angka ${fmt(r * r)} itu adalah r². Jadi r adalah akar dari ${fmt(r * r)}.`,
        ],
        pembahasan: `Dari L = πr² diperoleh r² = L ÷ π = ${fmt(L)} ÷ 3,14 = ${fmt(r * r)}, sehingga r = ${fmt(r)} cm.`,
      }
    },
  ],

  lanjut: ['pi-dari-mana', 'segitiga-setengah', 'kerucut-sepertiga'],
}

export default konsep
