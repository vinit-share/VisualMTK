/* ============================================================
   KONSEP — Kenapa angka 2 di "25" berharga dua puluh?
   Kelas 2 · Bilangan

   Gagasan: sepuluh kubus satuan MENYATU menjadi satu batang
   puluhan. Karena itu, angka yang ditulis di tempat puluhan
   mewakili batang, bukan kubus. Bilangan 25 dan 52 memakai
   angka yang sama persis, tetapi tumpukan baloknya jauh berbeda.

   Interaksi langsung (lihat docs/PANDUAN-INTERAKSI.md):
   - Banyak batang diubah dengan menyeret titik di ujung kanan
     deretnya — deret memanjang ke kanan, satu petak per batang.
   - Banyak kubus satuan diubah dengan menyeret titik di puncak
     tumpukannya — tumpukan meninggi satu kubus per langkah, dan
     tidak pernah sampai sepuluh (sepuluh sudah jadi batang).
   - Selama kubus masih berserakan (langkah 0–1) belum ada batang
     maupun tumpukan satuan, jadi yang dipegang adalah kubus
     terakhir pada tumpukan berserakan: satu titik yang mengubah
     JUMLAH kubus, lalu membaginya sendiri ke puluhan dan satuan.
     Tumpukan berserakan disusun 12 per baris — bukan 10 — supaya
     kelompok sepuluh belum terbaca sebelum langkah pengelompokan.

   Fondasi diam-diam untuk: bilangan besar, desimal, dan
   notasi ilmiah.
   ============================================================ */

import { Pegangan, useInteraksi } from '../components/Interaksi'
import { Svg, Tag, useSempit } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

/** Kubus per baris pada tumpukan berserakan. Sengaja bukan 10. */
const KOLOM_ACAK = 12
/** Simpangan acak tiap kubus pada tumpukan berserakan (satuan SVG). */
const OLENG = 7

/**
 * Ajakan pada pegangan utama. Pil ajakan dipusatkan pada titiknya, sedangkan
 * semua pegangan utama di sini berdiri dekat tepi kiri gambar (nilai 0 =
 * tumpukan kosong). Pada panggung tersempit — 560 px untuk tata letak lebar,
 * 320 px untuk HP — pil hanya muat selama teksnya ≤ 10 huruf; kalimat yang
 * lebih panjang terpotong tepi kiri viewBox. Arah geraknya sudah ditunjukkan
 * panah kecil pada titiknya, dan begitu disentuh muncul label "n batang" /
 * "n kubus", jadi ajakan cukup sependek ini.
 */
const AJAKAN = 'Seret aku'

/* ---------------- Balok ---------------- */

/** Satu batang puluhan: sepuluh kubus satuan yang sudah menyatu. */
function Batang({
  x,
  y,
  sisi,
  o = 1,
  nyala = false,
}: {
  x: number
  y: number
  sisi: number
  o?: number
  nyala?: boolean
}) {
  if (o <= 0.01) return null
  return (
    <g opacity={o}>
      <rect
        x={x}
        y={y - 10 * sisi}
        width={sisi}
        height={10 * sisi}
        rx={3}
        fill="var(--m-a)"
        fillOpacity={nyala ? 0.7 : 0.45}
        stroke="var(--m-a)"
        strokeWidth={nyala ? 3 : 2}
      />
      {Array.from({ length: 9 }, (_, i) => (
        <line
          key={i}
          x1={x}
          y1={y - (i + 1) * sisi}
          x2={x + sisi}
          y2={y - (i + 1) * sisi}
          stroke="var(--m-a)"
          strokeWidth={0.8}
          opacity={0.55}
        />
      ))}
    </g>
  )
}

function Kubus({
  x,
  y,
  sisi,
  o = 1,
  nyala = false,
  warna = 'var(--m-b)',
}: {
  x: number
  y: number
  sisi: number
  o?: number
  nyala?: boolean
  warna?: string
}) {
  if (o <= 0.01) return null
  return (
    <rect
      x={x}
      y={y - sisi}
      width={sisi}
      height={sisi}
      rx={3}
      fill={warna}
      fillOpacity={nyala ? 0.75 : 0.5}
      stroke={warna}
      strokeWidth={nyala ? 2.5 : 1.6}
      opacity={o}
    />
  )
}

/**
 * Satu tumpukan lengkap: deret batang puluhan, lalu tumpukan kubus satuan
 * di sebelah kanannya. Kubus satuan ditumpuk rapat seperti isi batang, jadi
 * sembilan kubus persis SATU kubus lebih pendek daripada satu batang.
 */
function Tumpukan({
  x,
  dasar,
  sisi,
  sela,
  jarak,
  pul,
  sat,
  nyalaPul = false,
  nyalaSat = false,
}: {
  x: number
  dasar: number
  sisi: number
  sela: number
  jarak: number
  pul: number
  sat: number
  nyalaPul?: boolean
  nyalaSat?: boolean
}) {
  const xs = x + pul * (sisi + sela) + jarak
  return (
    <>
      {Array.from({ length: pul }, (_, k) => (
        <Batang key={k} sisi={sisi} x={x + k * (sisi + sela)} y={dasar} nyala={nyalaPul} />
      ))}
      {Array.from({ length: sat }, (_, i) => (
        <Kubus key={`s${i}`} sisi={sisi} x={xs} y={dasar - i * sisi} nyala={nyalaSat} />
      ))}
    </>
  )
}

/* ---------------- Nilai ---------------- */

/** Nilai penggeser yang sudah dibulatkan — dipakai gambar DAN teks langkah. */
function bacaBongkar(p: Record<string, number>) {
  const puluhan = clamp(Math.round(p.puluhan ?? 2), 0, 9)
  const satuan = clamp(Math.round(p.satuan ?? 5), 0, 9)
  return { puluhan, satuan, bilangan: puluhan * 10 + satuan, kebalikan: satuan * 10 + puluhan }
}

function bacaEksperimen(p: Record<string, number>) {
  const puluhan = clamp(Math.round(p.puluhan ?? 3), 0, 9)
  const satuan = clamp(Math.round(p.satuan ?? 7), 0, 9)
  return { puluhan, satuan, bilangan: puluhan * 10 + satuan, kebalikan: satuan * 10 + puluhan }
}

/** Cara menulis bilangan dua angka; bila diawali 0 (mis. 05), sebut juga nilainya. */
function tulisan(depan: number, belakang: number) {
  return depan === 0 ? `0${fmt(belakang)} (yaitu ${fmt(belakang)})` : fmt(depan * 10 + belakang)
}

/**
 * Bagian "ditulis …" pada rumus langkah 3. Gambar selalu menulis DUA angka
 * (tanpa batang pun tertulis "05"), jadi rumusnya ikut menulis "05" lalu
 * menyebut nilainya, sama seperti `tulisan()`.
 */
function ditulis(puluhan: number, satuan: number) {
  return puluhan === 0
    ? `[bilangan:0${fmt(satuan)}] (yaitu ${fmt(satuan)})`
    : `[bilangan:${fmt(puluhan)}${fmt(satuan)}]`
}

/**
 * Bentuk panjang bilangan — dipakai label pada gambar DAN rumus langkah,
 * supaya keduanya tidak pernah berbeda. `tok` membungkus tiap angka menjadi
 * bagian rumus yang bisa disorot; untuk label gambar, teksnya dibiarkan polos.
 */
function bentukPanjang(p: Record<string, number>, tok: (id: string, teks: string) => string) {
  const { puluhan, satuan, bilangan } = bacaBongkar(p)
  return `${tok('bilangan', fmt(bilangan))} = ${tok('puluhan', fmt(puluhan))} × 10 + ${tok('satuan', fmt(satuan))} × 1`
}

const polos = (_id: string, teks: string) => teks
const token = (id: string, teks: string) => `[${id}:${teks}]`

/** Perkiraan lebar label Tag — rumus yang sama dengan komponen Tag. */
const lebarTag = (teks: string, uk: number) => teks.length * uk * 0.58 + 14

/* ---------------- Tata letak bongkar ---------------- */

/**
 * Dua sistem koordinat untuk hal yang sama. Angka-angka di bawah dipilih
 * supaya pada SEMUA nilai penggeser tidak ada yang keluar bingkai dan kedua
 * pegangan tetap berjauhan. Tiga batas yang paling mengikat:
 * - jarak mendatar antara pegangan puluhan dan pegangan satuan
 *   = jarak + kubus/2 + sela/2 → 70 (lebar) dan 65 (HP). Keduanya lebih
 *   besar daripada u(48) pada panggung tersempit yang masuk akal
 *   (58 pada panggung lebar 560 px, 63 pada HP 320 px).
 * - Label nilai pegangan muncul di ATAS titiknya dan dipusatkan padanya.
 *   Pada panggung tersempit label "0 batang"/"9 satuan" selebar ±99 (lebar)
 *   dan ±105 (HP), jadi pegangan puluhan pada nilai 0 (kiri − sela/2) harus
 *   ≥ 53 satuan dari tepi kiri, dan pegangan satuan pada 9 batang harus
 *   ≥ 53 satuan dari tepi kanan. Itulah yang menentukan `kiri` dan ukuran
 *   kubus di HP — bukan ukuran baloknya sendiri.
 * - Tumpukan berserakan 12 kolom: lebar 11·(kubus+6)+kubus dan tinggi
 *   8·(kubus+6)+kubus, digeser satu petak ke kanan (xAcak) supaya petak
 *   "nol kubus" di sebelah kiri petak pertama masih di dalam bingkai.
 */
function letakBongkar(sempit: boolean) {
  return sempit
    ? {
        w: 420,
        h: 546,
        maxH: 500,
        kubus: 18,
        sela: 8,
        jarak: 52,
        kiri: 62,
        dasar: 420,
        yBanding: 26,
        ukBanding: 15,
        xAngka: 208,
        yAngka: 88,
        ukAngka: 54,
        dxAngka: 16,
        yPeranA: 122,
        yPeranB: 148,
        yLabel: 454,
        yLabelTurun: 482,
        ukLabel: 15,
        yRumus: 522,
        ukRumus: 16,
        pendek: true,
      }
    : {
        w: 680,
        h: 460,
        maxH: 460,
        kubus: 22,
        sela: 10,
        jarak: 54,
        kiri: 70,
        dasar: 330,
        yBanding: 44,
        ukBanding: 17,
        xAngka: 550,
        yAngka: 140,
        ukAngka: 70,
        dxAngka: 21,
        yPeranA: 178,
        yPeranB: 206,
        yLabel: 364,
        yLabelTurun: 392,
        ukLabel: 16,
        yRumus: 436,
        ukRumus: 18,
        pendek: false,
      }
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const { puluhan, satuan, bilangan, kebalikan } = bacaBongkar(p)
  const sempit = useSempit()
  const aktif = useInteraksi()?.kendali.aktif ?? null
  const L = letakBongkar(sempit)

  const berserak = step === 0 ? 1 : step === 1 ? 1 - seg(t, 0.1, 0.9) : 0
  const menyatu = step >= 2 ? (step === 2 ? seg(t, 0.15, 0.9) : 1) : 0
  const tulis = fase(step, t, 3)
  const banding = fase(step, t, 4)
  const rumus = step >= 5
  const tercecer = berserak >= 0.5

  const nyalaPuluhan = sorot === 'puluhan' || aktif === 'puluhan'
  const nyalaSatuan = sorot === 'satuan' || aktif === 'satuan'

  const LB = L.kubus + L.sela
  const PETAK = L.kubus + 6
  const tinggiBatang = 10 * L.kubus
  const xBatang = (k: number) => L.kiri + k * LB
  const xSatuan = L.kiri + puluhan * LB + L.jarak
  const xSatuanC = xSatuan + L.kubus / 2

  /* Posisi tujuan tiap kubus: kelompok sepuluh berdiri tepat di tempat
     batangnya nanti, sisanya menumpuk di kolom satuan. */
  const rapi = (i: number) => {
    const kelompok = Math.floor(i / 10)
    if (kelompok < puluhan) return { x: xBatang(kelompok), y: L.dasar - (i % 10) * L.kubus }
    return { x: xSatuan, y: L.dasar - (i - puluhan * 10) * L.kubus }
  }

  /* Posisi berserakan: kisi 12 kolom dengan simpangan tetap (bukan acak
     sungguhan) supaya gambarnya sama di setiap render. */
  const xAcak = L.kiri + PETAK
  const tercerai = (i: number) => ({
    x: xAcak + (i % KOLOM_ACAK) * PETAK + (((i * 2654435761) % 1000) / 1000 - 0.5) * 2 * OLENG,
    y: L.dasar - Math.floor(i / KOLOM_ACAK) * PETAK + (((i * 40503) % 1000) / 1000 - 0.5) * 2 * OLENG,
  })

  /* Petak kubus ke-n pada tumpukan berserakan, dan kebalikannya. n = 0
     diletakkan satu petak di kiri petak pertama, supaya `keNilai` benar-benar
     kebalikan dari rumus posisi ini untuk SEMUA nilai 0..99. */
  const petak = (n: number) =>
    n <= 0
      ? { x: xAcak + L.kubus / 2 - PETAK, y: L.dasar - L.kubus / 2 }
      : {
          x: xAcak + ((n - 1) % KOLOM_ACAK) * PETAK + L.kubus / 2,
          y: L.dasar - Math.floor((n - 1) / KOLOM_ACAK) * PETAK - L.kubus / 2,
        }
  /* Kolom boleh melewati kedua ujung baris satu petak: petak −1 adalah kubus
     TERAKHIR baris di bawahnya dan petak ke-12 adalah kubus PERTAMA baris di
     atasnya, jadi menyeret ke kanan terus tetap menambah kubus. Dengan batas
     0..11 deretnya buntu di tiap kelipatan 12 (12, 24, 36, …): anak menarik
     ke kanan dan angkanya diam.
     Titik ini sengaja TIDAK ikut bergerak saat kubus terbang ke kelompoknya
     di langkah 1 — ia menandai petak tempat pile ditinggalkan, dan kisi inilah
     yang dibaca `dariPetak`. Titik yang ikut beranimasi membuat nilainya
     hanyut sendiri (terukur sampai 2 kubus) selama jari menahannya. */
  const dariPetak = (pt: { x: number; y: number }) => {
    const kol = clamp(Math.round((pt.x - xAcak - L.kubus / 2) / PETAK), -1, KOLOM_ACAK)
    const baris = clamp(Math.round((L.dasar - L.kubus / 2 - pt.y) / PETAK), 0, 8)
    const n = clamp(baris * KOLOM_ACAK + kol + 1, 0, 99)
    return { puluhan: Math.floor(n / 10), satuan: n % 10 }
  }
  const titikPetak = petak(bilangan)
  /* Petak kubus BERIKUTNYA, supaya titiknya selalu punya benda untuk dituju —
     termasuk saat belum ada satu kubus pun (tanpa ini langkah 0 pada nilai 0
     hanya menampilkan satu titik melayang di kanvas kosong). */
  const petakBerikut = petak(bilangan + 1)

  // Label kelompok. Bila batangnya sedikit, kedua label berdempetan dan latar
  // label satuan menutupi ujung label puluhan; dalam keadaan itu label satuan
  // diturunkan satu baris.
  const labelPuluhan = `${fmt(puluhan)} batang puluhan = ${fmt(puluhan * 10)}`
  const labelSatuan = `${fmt(satuan)} satuan`
  // Label yang ikut jari dibuat sependek mungkin: ia dipusatkan pada titiknya,
  // dan pada nilai 0 titik itu berdiri di tepi kiri gambar.
  const pegangPuluhan = `${fmt(puluhan)} batang`
  const xPuluhan = Math.max(L.kiri + (puluhan * LB - L.sela) / 2, lebarTag(labelPuluhan, L.ukLabel) / 2 + 4)
  const berdempet =
    puluhan > 0 &&
    xSatuanC - lebarTag(labelSatuan, L.ukLabel) / 2 < xPuluhan + lebarTag(labelPuluhan, L.ukLabel) / 2 + 4
  const ySatuan = berdempet ? L.yLabelTurun : L.yLabel

  const pesanBanding =
    bilangan === kebalikan
      ? L.pendek
        ? `angka kembar: ditukar tetap ${fmt(bilangan)}`
        : `kedua angkanya kembar: ditukar pun tetap ${fmt(bilangan)}`
      : L.pendek
        ? `angka sama, tetapi ${fmt(bilangan)} ≠ ${fmt(kebalikan)}`
        : `angka yang sama, tetapi ${fmt(bilangan)} ≠ ${fmt(kebalikan)}`

  return (
    <Svg
      w={L.w}
      h={L.h}
      maxH={L.maxH}
      label="Kubus satuan yang dikelompokkan menjadi batang puluhan"
    >
      {/* lantai tempat balok berdiri */}
      {!tercecer && (
        <line
          x1={L.kiri - 16}
          y1={L.dasar}
          x2={xSatuan + L.kubus + 16}
          y2={L.dasar}
          stroke="var(--line)"
          strokeWidth={1.5}
        />
      )}

      {/* petak kosong: ke mana batang / kubus berikutnya akan masuk */}
      {!tercecer && puluhan < 9 && (
        <rect
          x={xBatang(puluhan)}
          y={L.dasar - tinggiBatang}
          width={L.kubus}
          height={tinggiBatang}
          rx={3}
          fill="none"
          stroke="var(--m-a)"
          strokeWidth={1.2}
          strokeDasharray="5 5"
          opacity={0.32}
        />
      )}
      {!tercecer && satuan < 9 && (
        <rect
          x={xSatuan}
          y={L.dasar - (satuan + 1) * L.kubus}
          width={L.kubus}
          height={L.kubus}
          rx={3}
          fill="none"
          stroke="var(--m-b)"
          strokeWidth={1.2}
          strokeDasharray="5 5"
          opacity={0.32}
        />
      )}
      {tercecer && bilangan < 99 && (
        <rect
          x={petakBerikut.x - L.kubus / 2}
          y={petakBerikut.y - L.kubus / 2}
          width={L.kubus}
          height={L.kubus}
          rx={3}
          fill="none"
          stroke="var(--m-ab)"
          strokeWidth={1.2}
          strokeDasharray="5 5"
          opacity={0.32 * berserak}
        />
      )}

      {/* kubus satuan, bergerak dari berserakan ke kelompok sepuluh */}
      {Array.from({ length: bilangan }, (_, i) => {
        const dalamKelompok = i < puluhan * 10
        if (dalamKelompok && menyatu > 0.95) return null
        const a = rapi(i)
        const b = tercerai(i)
        return (
          <Kubus
            key={i}
            sisi={L.kubus}
            x={a.x + berserak * (b.x - a.x)}
            y={a.y + berserak * (b.y - a.y)}
            o={dalamKelompok ? 1 - menyatu : 1}
            warna={dalamKelompok && !tercecer ? 'var(--m-a)' : 'var(--m-b)'}
            nyala={tercecer ? nyalaPuluhan || nyalaSatuan : dalamKelompok ? nyalaPuluhan : nyalaSatuan}
          />
        )
      })}

      {/* batang puluhan yang terbentuk */}
      {menyatu > 0.05 &&
        Array.from({ length: puluhan }, (_, k) => (
          <Batang key={k} sisi={L.kubus} x={xBatang(k)} y={L.dasar} o={menyatu} nyala={nyalaPuluhan} />
        ))}

      {/* label kelompok; disembunyikan saat pegangannya menampilkan label yang sama */}
      {menyatu > 0.6 && (
        <>
          {puluhan > 0 && aktif !== 'puluhan' && (
            <Tag x={xPuluhan} y={L.yLabel} warna="var(--m-a)" size={L.ukLabel}>
              {labelPuluhan}
            </Tag>
          )}
          {satuan > 0 && aktif !== 'satuan' && (
            <Tag x={xSatuanC} y={ySatuan} warna="var(--m-b)" size={L.ukLabel}>
              {labelSatuan}
            </Tag>
          )}
        </>
      )}

      {/* bilangan yang tertulis */}
      {tulis > 0.1 && (
        <g opacity={tulis}>
          <text
            x={L.xAngka}
            y={L.yAngka}
            textAnchor="middle"
            fontSize={L.ukAngka}
            fontWeight={800}
            fontFamily="var(--font-math)"
            fill="var(--ink)"
          >
            <tspan fill={nyalaPuluhan ? 'var(--m-hi)' : 'var(--m-a)'}>{fmt(puluhan)}</tspan>
            <tspan fill={nyalaSatuan ? 'var(--m-hi)' : 'var(--m-b)'}>{fmt(satuan)}</tspan>
          </text>
          {/* dua baris: "puluhan" dan "satuan" tidak muat berdampingan di
              bawah dua angka yang cuma selebar ±42 satuan */}
          <Tag x={L.xAngka - L.dxAngka} y={L.yPeranA} warna="var(--m-a)" size={13}>
            puluhan
          </Tag>
          <Tag x={L.xAngka + L.dxAngka} y={L.yPeranB} warna="var(--m-b)" size={13}>
            satuan
          </Tag>
        </g>
      )}

      {/* perbandingan dengan bilangan kebalikannya */}
      {banding > 0.2 && (
        <g opacity={banding}>
          <Tag x={L.w / 2} y={L.yBanding} warna="var(--m-hi)" size={L.ukBanding}>
            {pesanBanding}
          </Tag>
        </g>
      )}

      {rumus && (
        <Tag x={L.w / 2} y={L.yRumus} warna="var(--m-ab)" size={L.ukRumus}>
          {bentukPanjang(p, polos)}
        </Tag>
      )}

      {/* Selama kubus berserakan belum ada batang maupun kolom satuan: yang
          dipegang adalah kubus terakhir, dan satu titik itu mengurus kedua
          angkanya. Setelah tersusun, tiap kelompok punya pegangannya sendiri. */}
      {tercecer ? (
        <Pegangan
          x={titikPetak.x}
          y={titikPetak.y}
          param={['satuan', 'puluhan']}
          keNilai={dariPetak}
          arah="bebas"
          utama
          warna="var(--m-ab)"
          label={`${fmt(bilangan)} kubus`}
          ajakan={AJAKAN}
        />
      ) : (
        <>
          <Pegangan
            x={L.kiri + puluhan * LB - L.sela / 2}
            y={L.dasar - tinggiBatang / 2}
            param="puluhan"
            keNilai={(pt) => (pt.x - L.kiri + L.sela / 2) / LB}
            arah="x"
            // Pil ajakan berhenti tampil begitu anak memegang pegangan lain:
            // kalau tidak, ia menutupi label "n satuan" yang sedang dibaca.
            utama={aktif === null}
            label={pegangPuluhan}
            ajakan={AJAKAN}
          />
          <Pegangan
            x={xSatuanC}
            y={L.dasar - satuan * L.kubus}
            param="satuan"
            keNilai={(pt) => (L.dasar - pt.y) / L.kubus}
            arah="y"
            label={labelSatuan}
          />
        </>
      )}
    </Svg>
  )
}

/* ---------------- Tata letak eksperimen ---------------- */

/**
 * Dua tumpukan dibandingkan. Di layar lebar keduanya berdampingan; di HP satu
 * tumpukan penuh saja sudah selebar 299 dari 420 satuan, jadi keduanya
 * bertumpuk atas-bawah dengan tepi kiri yang sama — panjang deretnya tetap
 * mudah dibandingkan seperti dua batang diagram.
 * Hanya tumpukan pertama yang bisa dipegang; tumpukan kedua adalah akibatnya,
 * bukan sesuatu yang diatur sendiri. Karena itu hanya tumpukan pertama yang
 * perlu ruang untuk label pegangan (±53 satuan di kiri dan kanannya).
 */
function letakEksperimen(sempit: boolean) {
  return sempit
    ? {
        w: 420,
        h: 546,
        maxH: 500,
        kubus: 18,
        sela: 7,
        jarak: 56,
        tegak: true,
        ax: 62,
        aDasar: 244,
        bx: 62,
        bDasar: 496,
        pemisah: 300,
        yBarisA: 286,
        yBarisB: 530,
        ukBaris: 15,
        nomorAtas: false,
        yNomor: 0,
        xNomorA: 0,
        xNomorB: 0,
        ukNomor: 22,
      }
    : {
        w: 680,
        h: 388,
        maxH: 440,
        kubus: 16,
        sela: 7,
        jarak: 52,
        tegak: false,
        ax: 58,
        aDasar: 300,
        bx: 382,
        bDasar: 300,
        pemisah: 360,
        yBarisA: 340,
        yBarisB: 340,
        ukBaris: 15,
        nomorAtas: true,
        yNomor: 58,
        xNomorA: 195,
        xNomorB: 520,
        ukNomor: 26,
      }
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  const { puluhan, satuan, bilangan, kebalikan } = bacaEksperimen(p)
  const sempit = useSempit()
  const aktif = useInteraksi()?.kendali.aktif ?? null
  const L = letakEksperimen(sempit)

  const nyalaPuluhan = sorot === 'puluhan' || aktif === 'puluhan'
  const nyalaSatuan = sorot === 'satuan' || aktif === 'satuan'

  const LB = L.kubus + L.sela
  const tinggiBatang = 10 * L.kubus
  const xSatuanC = L.ax + puluhan * LB + L.jarak + L.kubus / 2

  const barisA = `${fmt(bilangan)} = ${fmt(puluhan)} × 10 + ${fmt(satuan)} × 1`
  const barisB = `${fmt(kebalikan)} = ${fmt(satuan)} × 10 + ${fmt(puluhan)} × 1`

  return (
    <Svg
      w={L.w}
      h={L.h}
      maxH={L.maxH}
      label="Dua tumpukan balok untuk dua bilangan yang memakai angka yang sama"
    >
      {/* lantai masing-masing tumpukan */}
      <line
        x1={L.ax - 14}
        y1={L.aDasar}
        x2={L.ax + 9 * LB + L.jarak + L.kubus + 14}
        y2={L.aDasar}
        stroke="var(--line)"
        strokeWidth={1.5}
      />
      <line
        x1={L.bx - 14}
        y1={L.bDasar}
        x2={L.bx + 9 * LB + L.jarak + L.kubus + 14}
        y2={L.bDasar}
        stroke="var(--line)"
        strokeWidth={1.5}
      />

      {/* pemisah antara bilanganmu dan kebalikannya */}
      {L.tegak ? (
        <line
          x1={30}
          y1={L.pemisah}
          x2={L.w - 30}
          y2={L.pemisah}
          stroke="var(--line)"
          strokeWidth={1.5}
        />
      ) : (
        <line
          x1={L.pemisah}
          y1={40}
          x2={L.pemisah}
          y2={L.aDasar + 20}
          stroke="var(--line)"
          strokeWidth={1.5}
        />
      )}

      {/* petak kosong pada tumpukan yang bisa dipegang */}
      {puluhan < 9 && (
        <rect
          x={L.ax + puluhan * LB}
          y={L.aDasar - tinggiBatang}
          width={L.kubus}
          height={tinggiBatang}
          rx={3}
          fill="none"
          stroke="var(--m-a)"
          strokeWidth={1.2}
          strokeDasharray="5 5"
          opacity={0.32}
        />
      )}
      {satuan < 9 && (
        <rect
          x={L.ax + puluhan * LB + L.jarak}
          y={L.aDasar - (satuan + 1) * L.kubus}
          width={L.kubus}
          height={L.kubus}
          rx={3}
          fill="none"
          stroke="var(--m-b)"
          strokeWidth={1.2}
          strokeDasharray="5 5"
          opacity={0.32}
        />
      )}

      <Tumpukan
        x={L.ax}
        dasar={L.aDasar}
        sisi={L.kubus}
        sela={L.sela}
        jarak={L.jarak}
        pul={puluhan}
        sat={satuan}
        nyalaPul={nyalaPuluhan}
        nyalaSat={nyalaSatuan}
      />
      <Tumpukan
        x={L.bx}
        dasar={L.bDasar}
        sisi={L.kubus}
        sela={L.sela}
        jarak={L.jarak}
        pul={satuan}
        sat={puluhan}
      />

      {L.nomorAtas && (
        <>
          <Tag x={L.xNomorA} y={L.yNomor} warna="var(--ink)" size={L.ukNomor}>
            {fmt(bilangan)}
          </Tag>
          <Tag x={L.xNomorB} y={L.yNomor} warna="var(--ink-2)" size={L.ukNomor}>
            {fmt(kebalikan)}
          </Tag>
        </>
      )}

      <Tag
        x={L.nomorAtas ? L.xNomorA : L.w / 2}
        y={L.yBarisA}
        warna="var(--m-ab)"
        size={L.ukBaris}
      >
        {barisA}
      </Tag>
      <Tag
        x={L.nomorAtas ? L.xNomorB : L.w / 2}
        y={L.yBarisB}
        warna="var(--ink-2)"
        size={L.ukBaris}
      >
        {barisB}
      </Tag>

      {/* Deret batang dipanjangkan dari ujung kanannya, tumpukan kubus
          ditinggikan dari puncaknya. Keduanya berjarak mendatar tetap
          (jarak + kubus/2 + sela/2), jadi tidak pernah berdempet. */}
      <Pegangan
        x={L.ax + puluhan * LB - L.sela / 2}
        y={L.aDasar - tinggiBatang / 2}
        param="puluhan"
        keNilai={(pt) => (pt.x - L.ax + L.sela / 2) / LB}
        arah="x"
        // Lihat catatan yang sama di VisualBongkar.
        utama={aktif === null}
        label={`${fmt(puluhan)} batang`}
        ajakan={AJAKAN}
      />
      <Pegangan
        x={xSatuanC}
        y={L.aDasar - satuan * L.kubus}
        param="satuan"
        keNilai={(pt) => (L.aDasar - pt.y) / L.kubus}
        arah="y"
        label={`${fmt(satuan)} satuan`}
      />
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'nilai-tempat',
  topicId: 'sd2-nilai-tempat-puluhan-dan-satuan',
  judul: 'Nilai tempat',
  pertanyaan: 'Kenapa angka 2 di "25" berharga dua puluh, bukan dua?',
  tagline: 'Angka yang sama bisa berbeda nilainya — semuanya tergantung tempat duduknya.',
  kelas: 2,
  domain: 'bilangan',
  tags: ['nilai tempat', 'puluhan', 'satuan', 'bilangan'],

  tebak: {
    pertanyaan: 'Mana yang lebih banyak: 25 kelereng atau 52 kelereng?',
    pilihan: [
      {
        id: 'a',
        label: '25',
        balasan:
          'Angka-angkanya memang sama-sama 2 dan 5. Tapi coba lihat tumpukan baloknya sebentar lagi — bedanya jauh.',
      },
      {
        id: 'b',
        label: '52',
        benar: true,
        balasan:
          'Betul, dan bedanya besar sekali: 52 dan 25 berselisih 27 kelereng, padahal angkanya sama persis.',
      },
      {
        id: 'c',
        label: 'Sama saja, angkanya sama',
        balasan:
          'Angkanya memang sama, tetapi tempat duduknya berbeda — dan tempat itulah yang menentukan nilainya.',
      },
    ],
    penutup: 'Jadi yang menentukan bukan cuma angkanya, tapi juga di mana angka itu berdiri.',
  },

  bongkar: {
    Visual: VisualBongkar,
    params: [
      {
        key: 'puluhan',
        label: 'Angka puluhan',
        min: 0,
        max: 9,
        step: 1,
        awal: 2,
        bulat: true,
        simbol: 'puluhan',
        peran: 'a',
        bagian: 'puluhan',
      },
      {
        key: 'satuan',
        label: 'Angka satuan',
        min: 0,
        max: 9,
        step: 1,
        awal: 5,
        bulat: true,
        simbol: 'satuan',
        peran: 'b',
        bagian: 'satuan',
      },
    ],
    roles: { puluhan: 'a', satuan: 'b', bilangan: 'ab' },
    arti: {
      puluhan: 'Angka di tempat puluhan — menghitung BATANG, bukan kubus.',
      satuan: 'Angka di tempat satuan — menghitung kubus yang berdiri sendiri.',
      bilangan: 'Bilangan seluruhnya.',
    },
    steps: [
      {
        id: 's0',
        judul: (p) => {
          const { bilangan } = bacaBongkar(p)
          if (bilangan === 0) return 'Belum ada kubus'
          return bilangan === 1 ? 'Baru satu kubus' : 'Kubus yang berserakan'
        },
        narasi: (p) => {
          const { bilangan } = bacaBongkar(p)
          if (bilangan === 0) {
            // Belum ada tumpukan yang bisa disebut, jadi yang ditunjuk adalah
            // titiknya sendiri dan petak putus-putus di sebelah kanannya.
            return 'Belum ada satu kubus pun di sini. Tarik titiknya ke kanan, ke petak putus-putus itu, supaya kubus kecil bermunculan — satu kubus bernilai satu.'
          }
          if (bilangan < 10) {
            return `Ada ${fmt(bilangan)} kubus kecil di sini, satu kubus bernilai satu. Sedikit begini masih mudah dihitung, tetapi kalau kubusnya puluhan, menghitung satu per satu melelahkan dan gampang keliru.`
          }
          return 'Ada banyak kubus kecil di sini, satu kubus bernilai satu. Menghitungnya satu per satu melelahkan dan gampang keliru.'
        },
        durasi: 1800,
      },
      {
        id: 's1',
        judul: 'Kelompokkan sepuluh-sepuluh',
        narasi: (p) => {
          const { puluhan, satuan } = bacaBongkar(p)
          if (puluhan === 0) {
            return satuan === 0
              ? 'Belum ada kubus yang bisa dikelompokkan. Nanti kubus dikumpulkan sepuluh demi sepuluh, dan sisa yang tidak cukup sepuluh dibiarkan berdiri sendiri.'
              : satuan === 1
                ? 'Kubusnya cuma 1, belum cukup untuk satu kelompok sepuluh. Jadi kubus itu dibiarkan berdiri sendiri sebagai sisa.'
                : `Kubusnya cuma ${fmt(satuan)}, belum cukup untuk satu kelompok sepuluh. Jadi semuanya dibiarkan berdiri sendiri sebagai sisa.`
          }
          const sisa =
            satuan === 0
              ? 'Semuanya pas, tidak ada kubus yang tersisa.'
              : `Sisa ${fmt(satuan)} kubus yang tidak cukup sepuluh berdiri sendiri di kolom kanan.`
          return `Kubus dikumpulkan sepuluh demi sepuluh, dan terbentuk ${fmt(puluhan)} kelompok. ${sisa}`
        },
        durasi: 2400,
      },
      {
        id: 's2',
        judul: 'Setiap sepuluh menyatu jadi satu batang',
        narasi: (p) => {
          const { puluhan, satuan } = bacaBongkar(p)
          if (puluhan === 0) {
            return satuan === 0
              ? 'Belum ada kubus, jadi tidak ada batang yang terbentuk. Begitu ada sepuluh kubus, kesepuluhnya menyatu menjadi satu batang yang isinya tetap sepuluh.'
              : 'Kubusnya belum sampai sepuluh, jadi tidak ada batang yang terbentuk. Begitu genap sepuluh, kubus-kubus itu menyatu menjadi satu batang yang isinya tetap sepuluh.'
          }
          if (puluhan === 1) {
            return 'Sepuluh kubus tadi menyatu menjadi satu batang. Batangnya satu benda, tetapi isinya tetap sepuluh.'
          }
          return `Sepuluh kubus menjadi satu batang, jadi ${fmt(puluhan * 10)} kubus tadi kini menjadi ${fmt(puluhan)} batang. Batangnya satu benda, tetapi isinya tetap sepuluh.`
        },
        durasi: 2200,
      },
      {
        id: 's3',
        judul: 'Tulis berapa batang dan berapa kubus',
        narasi:
          'Angka pertama menghitung batang, angka kedua menghitung kubus sisa. Sisa kubus selalu kurang dari sepuluh, dan sepuluh batang pun akan menyatu lagi menjadi satu ratusan — jadi tiap tempat cukup diisi satu angka, 0 sampai 9.',
        rumus: (p) => {
          const { puluhan, satuan } = bacaBongkar(p)
          return `[puluhan:${fmt(puluhan)}] batang · [satuan:${fmt(satuan)}] kubus → ditulis ${ditulis(puluhan, satuan)}`
        },
        durasi: 2200,
      },
      {
        id: 's4',
        judul: (p) => {
          const { puluhan, satuan } = bacaBongkar(p)
          return puluhan === satuan
            ? 'Tukar tempatnya — angka kembar tidak berubah'
            : 'Tukar tempatnya, hasilnya berbeda'
        },
        narasi: (p) => {
          const { puluhan, satuan, bilangan, kebalikan } = bacaBongkar(p)
          if (puluhan === satuan) {
            return `Kedua angkanya kembar, jadi ditukar pun tetap ${fmt(bilangan)}. Hanya angka kembar yang begini; kalau angkanya berbeda, menukar tempat pasti menghasilkan bilangan lain.`
          }
          return `Kalau kedua angkanya bertukar tempat, ${tulisan(puluhan, satuan)} menjadi ${tulisan(satuan, puluhan)}, sebab banyak batangnya berubah dari ${fmt(puluhan)} menjadi ${fmt(satuan)}. Angkanya sama, tapi bilangannya lain — selisihnya ${fmt(Math.abs(bilangan - kebalikan))}.`
        },
        durasi: 2400,
      },
      {
        id: 's5',
        judul: 'Itulah arti nilai tempat',
        narasi:
          'Angka di tempat puluhan bernilai sepuluh kali lipat dibanding angka yang sama di tempat satuan.',
        rumus: (p) => bentukPanjang(p, token),
        durasi: 2200,
      },
    ],
  },

  eksperimen: {
    judul: 'Susun bilanganmu sendiri',
    ajakan:
      'Seret titik ungu di ujung deret batang, dan titik jingga di puncak tumpukan kubus. Tumpukan satunya memakai angka yang sama, hanya bertukar tempat.',
    params: [
      {
        key: 'puluhan',
        label: 'Angka puluhan',
        min: 0,
        max: 9,
        step: 1,
        awal: 3,
        bulat: true,
        simbol: 'puluhan',
        peran: 'a',
        bagian: 'puluhan',
      },
      {
        key: 'satuan',
        label: 'Angka satuan',
        min: 0,
        max: 9,
        step: 1,
        awal: 7,
        bulat: true,
        simbol: 'satuan',
        peran: 'b',
        bagian: 'satuan',
      },
    ],
    Visual: VisualEksperimen,
    rumus: (p) => {
      const { puluhan, satuan, bilangan } = bacaEksperimen(p)
      return `[bilangan:${fmt(bilangan)}] = [puluhan:${fmt(puluhan)}] × 10 + [satuan:${fmt(satuan)}] × 1`
    },
    temuan: (p) => {
      const { puluhan: pul, satuan: sat, bilangan: n, kebalikan: k } = bacaEksperimen(p)
      const beda = Math.abs(n - k)
      return (
        <p>
          <strong>{fmt(n)}</strong> tersusun dari {fmt(pul)} batang dan {fmt(sat)} kubus.{' '}
          {pul === sat
            ? 'Karena kedua angkanya sama, menukar tempat tidak mengubah apa pun — inilah satu-satunya keadaan ketika hal itu terjadi.'
            : `Kalau kedua angkanya ditukar tempat, bilangannya menjadi ${fmt(k)}, berselisih ${fmt(beda)}. Selisih itu selalu 9 dikali beda kedua angkanya: 9 × ${fmt(Math.abs(pul - sat))} = ${fmt(beda)}.`}{' '}
          {sat === 0
            ? 'Tumpukan kubusnya kosong, jadi tidak ada kubus lepas: bilangannya kelipatan sepuluh.'
            : 'Coba turunkan tumpukan kubus sampai habis: bilangannya menjadi kelipatan sepuluh.'}
        </p>
      )
    },
  },

  penjelasan: {
    SD: (
      <>
        <p>
          Bayangkan sedotan. Setiap sepuluh sedotan kamu ikat jadi satu bundel. Kalau kamu punya 2
          bundel dan 5 sedotan lepas, berarti kamu punya <strong>25</strong> sedotan.
        </p>
        <p>
          Angka <strong>2</strong> di depan bukan berarti "dua sedotan" — artinya "dua{' '}
          <strong>bundel</strong>", dan satu bundel isinya sepuluh. Jadi 2 di situ bernilai dua
          puluh.
        </p>
        <p>
          Kalau angkanya bertukar menjadi 52, artinya 5 bundel dan 2 sedotan lepas — jauh lebih
          banyak. Tempat duduk angka menentukan berapa nilainya.
        </p>
      </>
    ),
    SMP: (
      <>
        <p>
          Sistem bilangan yang kita pakai disebut <strong>sistem desimal posisional</strong>. Nilai
          sebuah angka ditentukan oleh dua hal: angkanya sendiri, dan pangkat sepuluh yang
          bersesuaian dengan posisinya.
        </p>
        <p style={{ textAlign: 'center' }}>
          25 = 2·10¹ + 5·10⁰, dan 3.407 = 3·10³ + 4·10² + 0·10¹ + 7·10⁰
        </p>
        <p>
          Gagasan yang sama terus dipakai ke arah sebaliknya, ke bilangan desimal:
          0,25 = 2·10⁻¹ + 5·10⁻². Tempat setelah koma tidak "berbeda aturan" — ia hanya melanjutkan
          pola pangkat sepuluh yang menurun.
        </p>
        <h4>Peran angka nol</h4>
        <p>
          Nol adalah penemuan yang membuat sistem ini bekerja. Tanpa penanda tempat kosong, 305 dan
          35 mustahil dibedakan. Angka 0 pada 305 tidak berarti "tidak ada apa-apa", melainkan "tidak
          ada puluhan" — dan justru itulah yang menahan angka 3 tetap di tempat ratusan.
        </p>
        <h4>Kenapa selisihnya selalu kelipatan 9</h4>
        <p>
          Untuk bilangan dua angka, (10a + b) − (10b + a) = 9(a − b). Karena itu 52 − 25 = 27 = 9 × 3,
          dan pola ini berlaku untuk pasangan angka mana pun.
        </p>
      </>
    ),
  },

  rumus: {
    src: '[bilangan:25] = [puluhan:2] × 10 + [satuan:5] × 1',
    roles: { bilangan: 'ab', puluhan: 'a', satuan: 'b' },
    arti: {
      bilangan: 'Bilangan yang tertulis.',
      puluhan: 'Angka di tempat puluhan. Ia menghitung batang berisi sepuluh, jadi nilainya dikali 10.',
      satuan: 'Angka di tempat satuan. Ia menghitung kubus yang berdiri sendiri, jadi dikali 1.',
    },
  },

  soal: [
    (rnd) => {
      const pul = 1 + Math.floor(rnd() * 9)
      const sat = Math.floor(rnd() * 10)
      return {
        id: 'nt-1',
        tipe: 'angka',
        topicId: 'sd2-nilai-tempat-puluhan-dan-satuan',
        kelas: 2,
        tingkat: 'mudah',
        konsep: 'nilai-tempat',
        pertanyaan: `Pada bilangan ${pul * 10 + sat}, berapa nilai angka ${pul}${pul === sat ? ' yang paling kiri' : ''}?`,
        jawaban: pul * 10,
        toleransi: 1e-9,
        hint: [
          'Perhatikan angka itu duduk di tempat mana: puluhan atau satuan?',
          'Angka di tempat puluhan menghitung batang, dan satu batang isinya sepuluh.',
          `Jadi nilainya ${pul} × 10.`,
        ],
        pembahasan: `Angka ${pul}${pul === sat ? ' yang paling kiri' : ''} berada di tempat puluhan, jadi nilainya ${pul} × 10 = ${pul * 10}, bukan ${pul}.`,
      }
    },
    {
      id: 'nt-2',
      tipe: 'pilihan',
      topicId: 'sd2-nilai-tempat-puluhan-dan-satuan',
      kelas: 3,
      tingkat: 'sedang',
      konsep: 'nilai-tempat',
      pertanyaan: 'Bilangan 305 dibaca...',
      pilihan: [
        { id: 'a', label: 'Tiga ratus lima', benar: true },
        {
          id: 'b',
          label: 'Tiga puluh lima',
          diagnosa:
            'Angka 0 terlewat saat membaca. Padahal 0 itulah yang menahan angka 3 tetap di tempat ratusan.',
        },
        {
          id: 'c',
          label: 'Tiga nol lima',
          diagnosa: 'Angka dibaca satu per satu seperti nomor telepon, bukan sebagai bilangan.',
        },
        {
          id: 'd',
          label: 'Tiga ratus lima puluh',
          diagnosa: 'Ini bacaan untuk 350. Perhatikan posisi angka 0 dan 5.',
        },
      ],
      hint: [
        'Tulis dulu tiap angka berada di tempat apa: ratusan, puluhan, satuan.',
        '3 di ratusan, 0 di puluhan, 5 di satuan.',
        'Angka 0 berarti tidak ada puluhan — tetapi tempatnya tetap harus ada.',
      ],
      pembahasan:
        '305 = 3 × 100 + 0 × 10 + 5 × 1, dibaca "tiga ratus lima". Tanpa angka 0, bilangan ini akan tertulis 35 dan artinya berubah total.',
    },
    {
      id: 'nt-3',
      tipe: 'benar-salah',
      topicId: 'sd2-nilai-tempat-puluhan-dan-satuan',
      kelas: 2,
      tingkat: 'mudah',
      konsep: 'nilai-tempat',
      pertanyaan: 'Bilangan 47 dan 74 bernilai sama karena tersusun dari angka yang sama.',
      jawaban: false,
      diagnosa:
        'Coba bayangkan baloknya: 47 berarti 4 batang dan 7 kubus, sedangkan 74 berarti 7 batang dan 4 kubus. Tumpukannya jelas berbeda.',
      hint: [
        'Bandingkan berapa banyak batang puluhan pada masing-masing bilangan.',
        '47 punya 4 batang; 74 punya 7 batang.',
      ],
      pembahasan:
        'Salah. 47 = 4 × 10 + 7 = 47, sedangkan 74 = 7 × 10 + 4 = 74. Selisihnya 27, yaitu 9 × 3.',
    },
    {
      id: 'nt-4',
      tipe: 'cocokkan',
      topicId: 'sd2-nilai-tempat-puluhan-dan-satuan',
      kelas: 3,
      tingkat: 'sedang',
      konsep: 'nilai-tempat',
      pertanyaan: 'Pasangkan tiap bilangan dengan bentuk panjangnya.',
      pasangan: [
        { kiri: '64', kanan: '6 × 10 + 4 × 1' },
        { kiri: '46', kanan: '4 × 10 + 6 × 1' },
        { kiri: '60', kanan: '6 × 10 + 0 × 1' },
        { kiri: '406', kanan: '4 × 100 + 0 × 10 + 6 × 1' },
      ],
      hint: [
        'Lihat angka paling kiri: ia berada di tempat yang nilainya paling besar.',
        'Bilangan dengan tiga angka pasti memuat ratusan.',
      ],
      pembahasan:
        'Menulis bilangan dalam bentuk panjang memperlihatkan tugas tiap angka. Perhatikan 406: angka 0 di tempat puluhan tidak boleh dihilangkan.',
    },
    (rnd) => {
      const pul = 1 + Math.floor(rnd() * 9)
      // Angka satuan dipilih dari 0–9 selain `pul`: angka kembar (33) membuat
      // "ditukar menjadi 33" dan selisih 0, sehingga pola 9 × beda tidak terlihat.
      const acak = Math.floor(rnd() * 9)
      const sat = acak >= pul ? acak + 1 : acak
      const n = pul * 10 + sat
      const k = sat * 10 + pul
      return {
        id: 'nt-5',
        tipe: 'angka',
        topicId: 'sd2-nilai-tempat-puluhan-dan-satuan',
        kelas: 4,
        tingkat: 'sulit',
        konsep: 'nilai-tempat',
        pertanyaan: `Bilangan ${n} ditukar posisi angkanya menjadi ${sat === 0 ? `0${pul}, yaitu ${k}` : k}. Berapa selisih kedua bilangan itu?`,
        jawaban: Math.abs(n - k),
        toleransi: 1e-9,
        hint: [
          'Hitung dulu masing-masing bilangan dalam bentuk panjang.',
          `${n} = ${pul} × 10 + ${sat}, dan ${k} = ${sat} × 10 + ${pul}.`,
          'Selisihnya selalu 9 dikali beda kedua angkanya.',
        ],
        pembahasan: `Selisihnya ${Math.max(n, k)} − ${Math.min(n, k)} = ${Math.abs(n - k)} = 9 × ${Math.abs(pul - sat)}. Pola ini berlaku untuk semua bilangan dua angka.`,
      }
    },
  ],

  lanjut: ['perkalian-luas', 'persen-dari', 'negatif-kali-negatif'],
}

export default konsep
