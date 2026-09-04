/* ============================================================
   KONSEP — Kenapa luas segitiga dibagi 2?
   Kelas 4 · Pengukuran

   Gagasan pembuktian (jujur secara matematis, bukan analogi):
   sebuah segitiga digandakan, lalu salinannya diputar setengah
   putaran mengelilingi TITIK TENGAH salah satu sisinya. Kedua
   segitiga itu pasti membentuk jajar genjang — dan jajar genjang
   bisa dipotong-geser menjadi persegi panjang beralas a dan
   bertinggi t. Jadi dua segitiga = a × t, satu segitiga = ½ a t.
   ============================================================ */

import { Svg, Tag, Dimensi, SikuSiku } from '../components/Stage'
import { fase, seg, easing } from '../lib/anim'
import { fmt, clamp } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

/* ---------------- Geometri bersama ---------------- */

const W = 660
const H = 420
const SKALA = 40 // piksel per satuan
const DASAR_Y = 330
const KIRI_X = 130

interface Bentuk {
  A: [number, number]
  B: [number, number]
  P: [number, number]
  M: [number, number]
  b: number
  h: number
  px: number
}

function bentuk(alas: number, tinggi: number, puncak: number): Bentuk {
  const b = alas * SKALA
  const h = tinggi * SKALA
  const px = puncak * b
  const A: [number, number] = [KIRI_X, DASAR_Y]
  const B: [number, number] = [KIRI_X + b, DASAR_Y]
  const P: [number, number] = [KIRI_X + px, DASAR_Y - h]
  // Titik tengah sisi PB — pusat perputaran salinan.
  const M: [number, number] = [(B[0] + P[0]) / 2, (B[1] + P[1]) / 2]
  return { A, B, P, M, b, h, px }
}

const putar = (
  [x, y]: [number, number],
  [cx, cy]: [number, number],
  derajat: number,
): [number, number] => {
  const a = (derajat * Math.PI) / 180
  const c = Math.cos(a)
  const s = Math.sin(a)
  const dx = x - cx
  const dy = y - cy
  return [cx + dx * c - dy * s, cy + dx * s + dy * c]
}

const poly = (...t: [number, number][]) => t.map(([x, y]) => `${x},${y}`).join(' ')

/* ---------------- Bagian gambar yang dipakai berulang ---------------- */

function GarisTinggi({
  bt,
  tinggi,
  nyala,
  opacity = 1,
}: {
  bt: Bentuk
  tinggi: number
  nyala: boolean
  opacity?: number
}) {
  const kaki: [number, number] = [bt.P[0], DASAR_Y]
  return (
    <g opacity={opacity}>
      <line
        x1={bt.P[0]}
        y1={bt.P[1]}
        x2={kaki[0]}
        y2={kaki[1]}
        stroke="var(--m-b)"
        strokeWidth={nyala ? 4 : 2.4}
        strokeDasharray="7 5"
        style={{ transition: 'stroke-width var(--d-1)' }}
      />
      <SikuSiku x={kaki[0]} y={kaki[1]} ux={0} uy={-1} vx={1} vy={0} s={12} warna="var(--m-b)" />
      <Tag
        x={bt.P[0] - 16}
        y={(bt.P[1] + DASAR_Y) / 2}
        anchor="end"
        warna="var(--m-b)"
        size={nyala ? 19 : 16}
      >
        {`t = ${fmt(tinggi)}`}
      </Tag>
    </g>
  )
}

function GarisAlas({ bt, alas, nyala }: { bt: Bentuk; alas: number; nyala: boolean }) {
  return (
    <g>
      <line
        x1={bt.A[0]}
        y1={DASAR_Y}
        x2={bt.B[0]}
        y2={DASAR_Y}
        stroke="var(--m-a)"
        strokeWidth={nyala ? 7 : 4}
        strokeLinecap="round"
        style={{ transition: 'stroke-width var(--d-1)' }}
      />
      <Tag x={(bt.A[0] + bt.B[0]) / 2} y={DASAR_Y + 30} warna="var(--m-a)" size={nyala ? 19 : 16}>
        {`a = ${fmt(alas)}`}
      </Tag>
    </g>
  )
}

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const alas = p.alas ?? 6
  const tinggi = p.tinggi ?? 4
  const puncak = clamp(p.puncak ?? 0.35, 0, 1)
  const bt = bentuk(alas, tinggi, puncak)
  const { A, B, P, M, b } = bt

  /* --- kemajuan tiap tahap --- */
  const gambarSegitiga = fase(step, t, 0)
  const salinanMuncul = fase(step, t, 1)
  const sudutPutar = 180 * easing.inOutCubic(fase(step, t, 2))
  const tampakJajar = step >= 3
  // Potong bagian kiri jajar genjang lalu geser ke kanan sejauh a.
  const geser =
    step === 4 ? seg(t, 0.12, 0.92) : step === 5 ? 1 - seg(t, 0, 0.55) : step > 5 ? 0 : 0
  const sorotSetengah = step >= 6 ? seg(t, 0, 0.5) : 0

  /* --- titik salinan setelah diputar --- */
  const A2 = putar(A, M, sudutPutar)
  const B2 = putar(B, M, sudutPutar)
  const P2 = putar(P, M, sudutPutar)

  const nyalaAlas = sorot === 'alas'
  const nyalaTinggi = sorot === 'tinggi'
  const nyalaSetengah = sorot === 'setengah'

  /* --- potongan saat jajar genjang diubah jadi persegi panjang --- */
  const potKiri: [number, number][] = [A, [KIRI_X + bt.px, DASAR_Y], P]
  const potKanan: [number, number][] = [
    [KIRI_X + bt.px, DASAR_Y],
    B,
    [B[0] + bt.px, P[1]],
    P,
  ]
  const geserX = geser * b

  return (
    <Svg w={W} h={H} maxH={430} label="Segitiga digandakan dan diputar menjadi jajar genjang">
      {/* garis dasar */}
      <line
        x1={40}
        y1={DASAR_Y}
        x2={W - 40}
        y2={DASAR_Y}
        stroke="var(--m-grid)"
        strokeWidth={2}
      />

      {/* --- tahap 4-5: jajar genjang dipotong dan digeser --- */}
      {step >= 4 && step <= 5 && (
        <g>
          <polygon
            points={poly(...potKanan)}
            fill="var(--m-ab-soft)"
            stroke="var(--m-ab)"
            strokeWidth={2.5}
          />
          <polygon
            points={poly(
              ...(potKiri.map(([x, y]) => [x + geserX, y]) as [number, number][]),
            )}
            fill="var(--m-b-soft)"
            stroke="var(--m-b)"
            strokeWidth={2.5}
          />
          {geser > 0.9 && (
            <Tag x={KIRI_X + bt.px + b / 2} y={DASAR_Y - bt.h / 2} warna="var(--m-ab)" size={18}>
              {`a × t = ${fmt(alas * tinggi)}`}
            </Tag>
          )}
        </g>
      )}

      {/* --- jajar genjang utuh (tahap 3 dan 6) --- */}
      {tampakJajar && (step < 4 || step > 5) && (
        <polygon
          points={poly(A, B, [B[0] + bt.px, P[1]], P)}
          fill="var(--m-ghost)"
          stroke="var(--ink-3)"
          strokeWidth={2}
          strokeDasharray="6 6"
        />
      )}

      {/* --- salinan segitiga --- */}
      {salinanMuncul > 0 && (step < 4 || step > 5) && (
        <polygon
          points={poly(A2, B2, P2)}
          fill="var(--m-b)"
          fillOpacity={0.3 * salinanMuncul}
          stroke="var(--m-b)"
          strokeWidth={2.5}
          strokeOpacity={salinanMuncul}
        />
      )}

      {/* --- segitiga asli --- */}
      {(step < 4 || step > 5) && (
        <polygon
          points={poly(A, B, P)}
          fill="var(--m-a)"
          fillOpacity={(0.22 + 0.24 * sorotSetengah + (nyalaSetengah ? 0.2 : 0)) * gambarSegitiga}
          stroke="var(--m-a)"
          strokeWidth={3}
          strokeOpacity={gambarSegitiga}
          strokeLinejoin="round"
        />
      )}

      {/* --- ukuran --- */}
      {gambarSegitiga > 0.6 && (
        <>
          <GarisAlas bt={bt} alas={alas} nyala={nyalaAlas} />
          <GarisTinggi bt={bt} tinggi={tinggi} nyala={nyalaTinggi} />
        </>
      )}

      {/* --- keterangan tahap --- */}
      {step === 1 && salinanMuncul > 0.4 && (
        <Tag x={W / 2} y={70} warna="var(--m-b)" size={17}>
          salinan yang sama persis
        </Tag>
      )}
      {step === 2 && (
        <g>
          <circle cx={M[0]} cy={M[1]} r={6} fill="var(--m-hi)" />
          <Tag x={M[0] + 14} y={M[1] - 18} anchor="start" warna="var(--m-hi)" size={15}>
            titik putar
          </Tag>
        </g>
      )}
      {step === 3 && (
        <Tag x={W / 2} y={70} warna="var(--ink-2)" size={17}>
          dua segitiga = satu jajar genjang
        </Tag>
      )}
      {step >= 6 && (
        <Tag x={W / 2} y={70} warna="var(--m-a)" size={18}>
          {`satu segitiga = ${fmt((alas * tinggi) / 2)} = separuh dari ${fmt(alas * tinggi)}`}
        </Tag>
      )}

      {/* dimensi tinggi pada jajar genjang saat sudah jadi persegi panjang */}
      {step >= 4 && step <= 5 && geser > 0.9 && (
        <Dimensi
          x1={KIRI_X + bt.px + b + 14}
          y1={DASAR_Y}
          x2={KIRI_X + bt.px + b + 14}
          y2={DASAR_Y - bt.h}
          label={`t = ${fmt(tinggi)}`}
          warna="var(--m-b)"
        />
      )}
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen bebas ---------------- */

function VisualEksperimen({
  p,
  sorot,
}: {
  p: Record<string, number>
  sorot: string | null
}) {
  const alas = p.alas ?? 6
  const tinggi = p.tinggi ?? 4
  const puncak = p.puncak ?? 0.35
  const bt = bentuk(alas, tinggi, puncak)
  const luas = (alas * tinggi) / 2

  // Bayangan posisi puncak lain, memperlihatkan luas tak berubah.
  const bayang = [0, 0.5, 1].map((f) => bentuk(alas, tinggi, f))

  return (
    <Svg w={W} h={H} maxH={430} label="Segitiga yang bisa diubah alas, tinggi, dan posisi puncaknya">
      <line x1={40} y1={DASAR_Y} x2={W - 40} y2={DASAR_Y} stroke="var(--m-grid)" strokeWidth={2} />
      {/* garis sejajar alas setinggi t: puncak boleh geser di sepanjang garis ini */}
      <line
        x1={40}
        y1={DASAR_Y - bt.h}
        x2={W - 40}
        y2={DASAR_Y - bt.h}
        stroke="var(--m-b)"
        strokeWidth={1.5}
        strokeDasharray="4 6"
        opacity={0.65}
      />

      {bayang.map((s, i) => (
        <polygon
          key={i}
          points={poly(s.A, s.B, s.P)}
          fill="none"
          stroke="var(--ink-3)"
          strokeWidth={1.2}
          strokeDasharray="3 5"
          opacity={0.5}
        />
      ))}

      <polygon
        points={poly(bt.A, bt.B, bt.P)}
        fill="var(--m-a)"
        fillOpacity={0.24}
        stroke="var(--m-a)"
        strokeWidth={3}
        strokeLinejoin="round"
      />

      <GarisAlas bt={bt} alas={alas} nyala={sorot === 'alas'} />
      <GarisTinggi bt={bt} tinggi={tinggi} nyala={sorot === 'tinggi'} />

      <circle cx={bt.P[0]} cy={bt.P[1]} r={7} fill="var(--m-b)" />

      <Tag x={W / 2} y={52} warna="var(--m-a)" size={20}>
        {`Luas = ${fmt(luas)} satuan²`}
      </Tag>
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'segitiga-setengah',
  topicId: 'sd4-luas-segitiga',
  judul: 'Luas segitiga',
  pertanyaan: 'Kenapa luas segitiga harus dibagi 2?',
  tagline:
    'Karena setiap segitiga sebenarnya separuh dari sebuah bangun yang jauh lebih mudah dihitung.',
  kelas: 4,
  domain: 'pengukuran',
  tags: ['segitiga', 'luas', 'alas', 'tinggi'],

  tebak: {
    pertanyaan:
      'Dua segitiga punya alas 6 dan tinggi 4. Bedanya, puncak segitiga kedua digeser jauh ke samping sehingga bentuknya jadi miring sekali. Mana yang luasnya lebih besar?',
    pilihan: [
      { id: 'a', label: 'Yang tegak', balasan: 'Yang tegak memang terlihat lebih "rapi", tapi rapi bukan berarti lebih luas.' },
      {
        id: 'b',
        label: 'Yang miring',
        balasan:
          'Yang miring terlihat lebih panjang karena sisi mirimgnya memanjang. Tapi sisi miring bukan tinggi.',
      },
      {
        id: 'c',
        label: 'Sama saja',
        benar: true,
        balasan:
          'Betul. Menggeser puncak menyamping tidak mengubah alas maupun tinggi — dan hanya dua hal itu yang menentukan luas.',
      },
    ],
    penutup:
      'Menggeser puncak ke samping hanya memiringkan segitiga, tidak menambah "isi"-nya. Sebentar lagi kamu bisa melihat kenapa.',
  },

  bongkar: {
    rasio: W / H,
    Visual: VisualBongkar,
    params: [
      { key: 'alas', label: 'Alas', min: 3, max: 9, step: 1, awal: 6, bulat: true },
      { key: 'tinggi', label: 'Tinggi', min: 2, max: 6, step: 1, awal: 4, bulat: true },
      { key: 'puncak', label: 'Posisi puncak', min: 0, max: 1, step: 0.05, awal: 0.35 },
    ],
    roles: { alas: 'a', tinggi: 'b', setengah: 'hi', luas: 'ab' },
    arti: {
      alas: 'Sisi yang kita jadikan alas — boleh sisi mana saja.',
      tinggi: 'Jarak tegak lurus dari puncak ke alas. Bukan panjang sisi miring.',
      setengah: 'Karena segitiganya tepat separuh dari jajar genjang yang tadi terbentuk.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Mulai dari satu segitiga',
        narasi:
          'Ini segitiga biasa. Yang kita catat hanya dua hal: alasnya, dan tingginya — jarak tegak lurus dari puncak ke alas.',
        rumus: 'alas = [alas:a] · tinggi = [tinggi:t]',
        durasi: 1500,
      },
      {
        id: 's1',
        judul: 'Buat salinannya',
        narasi:
          'Sekarang kita jiplak segitiga itu persis sama. Dua segitiga yang identik — luasnya tentu sama besar.',
        durasi: 1200,
      },
      {
        id: 's2',
        judul: 'Putar salinannya setengah putaran',
        narasi:
          'Salinan diputar 180° mengelilingi titik tengah salah satu sisinya. Perputaran tidak mengubah luas — bentuknya hanya berpindah tempat.',
        durasi: 2200,
      },
      {
        id: 's3',
        judul: 'Selalu terbentuk jajar genjang',
        narasi:
          'Kedua segitiga itu pas bertemu tanpa celah dan tanpa tumpang tindih. Hasilnya jajar genjang dengan alas a dan tinggi t.',
        durasi: 1600,
      },
      {
        id: 's4',
        judul: 'Jajar genjang itu sebenarnya persegi panjang',
        narasi:
          'Potong ujung kirinya, geser ke kanan. Tidak ada bagian yang hilang atau bertambah — sekarang bentuknya persegi panjang beralas a dan bertinggi t.',
        rumus: 'luas jajar genjang = [alas:a] × [tinggi:t]',
        durasi: 2400,
      },
      {
        id: 's5',
        judul: 'Kembalikan ke bentuk semula',
        narasi:
          'Luasnya tetap a × t. Dan bangun seluas itu diisi tepat oleh DUA segitiga yang sama besar.',
        rumus: '2 × [luas:L] = [alas:a] × [tinggi:t]',
        durasi: 1800,
      },
      {
        id: 's6',
        judul: 'Jadi satu segitiga adalah separuhnya',
        narasi:
          'Kalau dua segitiga bernilai a × t, maka satu segitiga bernilai separuhnya. Di situlah angka ½ berasal — bukan aturan hafalan, melainkan akibat.',
        rumus: '[luas:L] = [setengah:½] × [alas:a] × [tinggi:t]',
        durasi: 2000,
      },
    ],
  },

  eksperimen: {
    judul: 'Geser puncaknya. Perhatikan angka luasnya.',
    ajakan:
      'Puncak segitiga boleh bergeser ke mana saja di sepanjang garis putus-putus. Ubah juga alas dan tingginya.',
    rasio: W / H,
    params: [
      { key: 'alas', label: 'Alas', min: 2, max: 10, step: 0.5, awal: 6 },
      { key: 'tinggi', label: 'Tinggi', min: 1, max: 6, step: 0.5, awal: 4 },
      { key: 'puncak', label: 'Posisi puncak', min: -0.4, max: 1.4, step: 0.05, awal: 0.35 },
    ],
    Visual: VisualEksperimen,
    temuan: (p) => {
      const alas = p.alas ?? 6
      const tinggi = p.tinggi ?? 4
      return (
        <p>
          <strong>Coba geser "posisi puncak" saja.</strong> Bentuknya berubah drastis, tetapi
          luasnya diam di angka {fmt((alas * tinggi) / 2)}. Yang menentukan luas cuma dua: alas{' '}
          {fmt(alas)} dan tinggi {fmt(tinggi)}. Sekarang gandakan tingginya — luasnya ikut
          menggandak, karena tinggi muncul satu kali dalam rumus.
        </p>
      )
    },
  },

  penjelasan: {
    SD: (
      <>
        <p>
          Bayangkan kamu punya dua segitiga kembar dari kertas. Kalau yang satu kamu putar lalu
          tempelkan ke yang lain, keduanya <strong>selalu</strong> membentuk satu bangun yang rapi —
          jajar genjang.
        </p>
        <p>
          Jajar genjang itu tinggal digunting sedikit di ujungnya dan digeser, langsung jadi persegi
          panjang. Nah, luas persegi panjang gampang: <strong>alas × tinggi</strong>.
        </p>
        <p>
          Karena bangun tadi berisi <strong>dua</strong> segitiga yang sama besar, satu segitiga
          pasti separuhnya. Itulah kenapa dibagi 2.
        </p>
      </>
    ),
    SMP: (
      <>
        <p>
          Ambil segitiga <em>ABP</em>. Putar salinannya 180° terhadap titik tengah sisi <em>PB</em>.
          Perputaran adalah isometri: panjang dan sudut tidak berubah, sehingga luas salinan sama
          dengan luas aslinya.
        </p>
        <p>
          Bayangan titik <em>P</em> jatuh di <em>B</em>, dan bayangan <em>B</em> jatuh di <em>P</em>.
          Akibatnya kedua segitiga bertemu persis pada sisi <em>PB</em> tanpa tumpang tindih, dan
          gabungannya adalah segi empat dengan dua pasang sisi sejajar — jajar genjang beralas{' '}
          <em>a</em> dan bertinggi <em>t</em>.
        </p>
        <p>
          Luas jajar genjang sendiri diperoleh dengan memotong segitiga di salah satu ujung dan
          menggesernya ke ujung lain, menghasilkan persegi panjang <em>a</em> × <em>t</em>. Jadi:
          2·L = a·t, sehingga L = ½·a·t.
        </p>
        <p>
          Perhatikan bahwa <strong>tinggi</strong> selalu berarti jarak tegak lurus, bukan panjang
          sisi miring. Inilah sumber kesalahan paling sering pada soal segitiga miring.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Argumen potong-susun tadi setara dengan pernyataan bahwa luas invarian terhadap{' '}
          <strong>pergeseran geser (shear)</strong>. Transformasi (x, y) ↦ (x + ky, y) memiliki
          determinan 1, sehingga mempertahankan luas. Menggeser puncak segitiga sejajar alas persis
          merupakan shear — karena itu luas tidak berubah, sesuai yang kamu lihat di eksperimen.
        </p>
        <p>
          Dengan koordinat: ambil A = (0,0), B = (a,0), P = (p, t). Luas segitiga adalah setengah
          nilai mutlak determinan vektor sisinya:
        </p>
        <p style={{ textAlign: 'center' }}>
          L = ½ |det[(a, 0), (p, t)]| = ½ |a·t − 0·p| = ½ a t
        </p>
        <p>
          Nilai <em>p</em> lenyap dari hasil — itulah alasan formal kenapa posisi puncak tidak
          berpengaruh. Faktor ½ muncul karena determinan mengukur luas jajar genjang yang dibentuk
          kedua vektor, dan segitiga adalah separuhnya.
        </p>
      </>
    ),
  },

  rumus: {
    src: '[luas:L] = [setengah:½] × [alas:a] × [tinggi:t]',
    roles: { luas: 'ab', setengah: 'hi', alas: 'a', tinggi: 'b' },
    arti: {
      luas: 'Luas segitiga — banyaknya satuan persegi yang memenuhi bagian dalamnya.',
      setengah:
        'Muncul karena dua segitiga kembar tepat memenuhi satu jajar genjang. Satu segitiga = separuhnya.',
      alas: 'Sisi yang kamu pilih sebagai alas. Sisi mana pun boleh, asal tingginya diukur ke sisi itu.',
      tinggi: 'Jarak TEGAK LURUS dari puncak ke alas. Sering tertukar dengan panjang sisi miring.',
    },
  },

  soal: [
    (rnd) => {
      const a = 4 + Math.floor(rnd() * 9)
      const t = 3 + Math.floor(rnd() * 7)
      return {
        id: 'seg-1',
        tipe: 'angka',
        topicId: 'sd4-luas-segitiga',
        kelas: 4,
        tingkat: 'mudah',
        konsep: 'segitiga-setengah',
        pertanyaan: `Sebuah segitiga memiliki alas ${a} cm dan tinggi ${t} cm. Berapa luasnya?`,
        jawaban: (a * t) / 2,
        satuan: 'cm²',
        toleransi: 1e-6,
        hint: [
          'Mulai dari bangun yang lebih mudah: berapa luas persegi panjang dengan ukuran itu?',
          `${a} × ${t} = ${a * t}. Tapi persegi panjang itu memuat dua segitiga.`,
          'Karena satu segitiga adalah separuhnya, bagi hasil tadi dengan 2.',
        ],
        pembahasan: `L = ½ × ${a} × ${t} = ${fmt((a * t) / 2)} cm². Dua segitiga seperti ini akan tepat membentuk persegi panjang seluas ${a * t} cm².`,
      }
    },
    {
      id: 'seg-2',
      tipe: 'pilihan',
      topicId: 'sd4-luas-segitiga',
      kelas: 5,
      tingkat: 'sedang',
      konsep: 'segitiga-setengah',
      pertanyaan:
        'Sebuah segitiga memiliki alas 10 cm, sisi miring 13 cm, dan tinggi 12 cm. Berapa luasnya?',
      pilihan: [
        { id: 'a', label: '60 cm²', benar: true },
        {
          id: 'b',
          label: '65 cm²',
          diagnosa:
            'Kamu memakai 13 sebagai tinggi. 13 adalah panjang sisi miring — tinggi adalah jarak tegak lurus ke alas, yaitu 12.',
        },
        {
          id: 'c',
          label: '120 cm²',
          diagnosa: 'Perkalian alas × tinggi sudah tepat, tetapi belum dibagi 2.',
        },
        {
          id: 'd',
          label: '130 cm²',
          diagnosa: 'Ini alas × sisi miring, dua kesalahan sekaligus: salah pilih tinggi dan lupa membagi 2.',
        },
      ],
      hint: [
        'Angka mana yang merupakan tinggi, dan angka mana yang sisi miring?',
        'Tinggi harus tegak lurus terhadap alas. Sisi miring tidak tegak lurus.',
        'Pakai alas 10 dan tinggi 12, lalu jangan lupa faktor ½.',
      ],
      pembahasan:
        'L = ½ × 10 × 12 = 60 cm². Angka 13 sengaja dipasang sebagai jebakan: itu sisi miring, bukan tinggi.',
    },
    {
      id: 'seg-3',
      tipe: 'benar-salah',
      topicId: 'sd4-luas-segitiga',
      kelas: 5,
      tingkat: 'sedang',
      konsep: 'segitiga-setengah',
      pertanyaan:
        'Dua segitiga dengan alas sama panjang dan tinggi sama, tetapi bentuknya berbeda (satu tegak, satu sangat miring), pasti memiliki luas yang sama.',
      jawaban: true,
      diagnosa:
        'Coba ingat eksperimen tadi: menggeser puncak menyamping mengubah bentuk, tetapi alas dan tinggi tetap — sehingga luas juga tetap.',
      hint: [
        'Rumus luas segitiga hanya memuat dua besaran. Besaran apa saja itu?',
        'Posisi puncak tidak muncul dalam rumus sama sekali.',
      ],
      pembahasan:
        'Benar. Luas hanya bergantung pada alas dan tinggi. Menggeser puncak sejajar alas tidak mengubah keduanya, jadi luas tidak berubah.',
    },
    (rnd) => {
      const L = [24, 30, 36, 42, 48][Math.floor(rnd() * 5)]
      const t = [4, 6][Math.floor(rnd() * 2)]
      const a = (2 * L) / t
      return {
        id: 'seg-4',
        tipe: 'angka',
        topicId: 'sd4-luas-segitiga',
        kelas: 5,
        tingkat: 'sulit',
        konsep: 'segitiga-setengah',
        pertanyaan: `Sebuah segitiga luasnya ${L} cm² dan tingginya ${t} cm. Berapa panjang alasnya?`,
        jawaban: a,
        satuan: 'cm',
        toleransi: 1e-6,
        hint: [
          'Tulis dulu rumusnya: L = ½ × a × t. Yang belum diketahui adalah a.',
          `Kalikan kedua ruas dengan 2: 2L = a × t, jadi 2 × ${L} = a × ${t}.`,
          `Tinggal bagi: a = ${2 * L} ÷ ${t}.`,
        ],
        pembahasan: `Dari L = ½at diperoleh a = 2L ÷ t = ${2 * L} ÷ ${t} = ${fmt(a)} cm.`,
      }
    },
    {
      id: 'seg-5',
      tipe: 'urutkan',
      topicId: 'sd4-luas-segitiga',
      kelas: 5,
      tingkat: 'sedang',
      konsep: 'segitiga-setengah',
      pertanyaan: 'Susun kembali alasan kenapa luas segitiga dibagi 2.',
      langkah: [
        'Buat salinan segitiga yang sama persis',
        'Putar salinannya setengah putaran',
        'Kedua segitiga membentuk jajar genjang beralas a dan bertinggi t',
        'Luas jajar genjang itu a × t',
        'Satu segitiga adalah separuhnya, jadi L = ½ × a × t',
      ],
      hint: [
        'Mulailah dari sesuatu yang kamu buat sendiri, bukan dari rumus.',
        'Rumus selalu muncul di langkah terakhir, bukan pertama.',
      ],
      pembahasan:
        'Urutannya: gandakan → putar → terbentuk jajar genjang → luasnya a × t → satu segitiga separuhnya.',
    },
  ],

  lanjut: ['lingkaran-luas', 'kuadrat-jumlah', 'pythagoras'],
}

export default konsep
