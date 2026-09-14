/* ============================================================
   KONSEP — Kenapa negatif × negatif = positif?
   Kelas 7 · Bilangan

   Dua argumen yang saling menguatkan:
   (1) POLA — turunkan pengali satu demi satu, hasilnya naik tetap.
       Meneruskan pola memaksa (−1) × (−2) = +2.
   (2) HUKUM DISTRIBUTIF — argumen yang benar-benar mengunci:
       (−1)(−2) + (−1)(2) = (−1)(−2 + 2) = (−1)(0) = 0,
       sehingga (−1)(−2) harus 2 agar jumlahnya nol.

   Pola saja belum membuktikan apa pun; itu dinyatakan
   terang-terangan pada langkah keenam (s5).
   ============================================================ */

import { Svg, Tag } from '../components/Stage'
import { fase, seg } from '../lib/anim'
import { clamp, fmt } from '../lib/num'
import type { DeriveState, Konsep } from '../lib/types'

const W = 690
const H = 440

/** Pengali pada tiap baris tabel, dari 3 turun sampai −2. */
const BARIS = [3, 2, 1, 0, -1, -2]

/** Bilangan bertanda; negatifnya memakai '−' (U+2212), bukan tanda hubung.
 *  Dipakai gambar DAN teks langkah supaya angkanya tertulis sama persis. */
const bil = (n: number) => (n < 0 ? `−${fmt(-n)}` : fmt(n))

/** Bilangan negatif diberi kurung agar '3 × (−2)' terbaca jelas. */
const tanda = (n: number) => (n < 0 ? `(${bil(n)})` : bil(n))

/** Nilai b pada tabel bongkar (dikali dengan −b). Dipakai gambar DAN teks langkah. */
const nilaiB = (p: Record<string, number>) =>
  Math.max(2, Math.round(Number.isFinite(p.b) ? p.b : 2))

/* ---------------- Visual untuk animasi bongkar ---------------- */

function VisualBongkar({ step, t, p, sorot }: DeriveState) {
  const b = nilaiB(p) // dikali dengan (−b)

  // Tabel cukup digeser sedikit agar panel kanan muat. Geseran yang lebih jauh
  // mendorong kolom "a × (−b)" ke luar gambar di layar sempit.
  const geser = -40 * fase(step, t, 5)
  const y0 = 96
  const dy = 46
  const xKiri = 150
  const xSama = 268
  const xHasil = 330

  // Baris yang sudah tampak.
  const tampak = (i: number) => {
    if (step === 0) return seg(t, i * 0.22, i * 0.22 + 0.4) * (i <= 2 ? 1 : 0)
    if (i <= 2) return 1
    if (i === 3) return fase(step, t, 2)
    if (i === 4) return fase(step, t, 3)
    return fase(step, t, 4)
  }
  const panah = fase(step, t, 1)
  const distributif = fase(step, t, 5)
  const aturan = fase(step, t, 6)

  const nyalaNeg = sorot === 'neg-a' || sorot === 'neg-b'
  const nyalaHasil = sorot === 'hasil'

  return (
    <Svg w={W} h={H} maxH={450} label="Tabel pola perkalian dengan bilangan negatif">
      <g transform={`translate(${geser} 0)`}>
        {BARIS.map((m, i) => {
          const o = tampak(i)
          if (o <= 0.01) return null
          const hasil = m * -b + 0 // "+ 0" mengubah −0 menjadi 0 agar tidak tampil "-0"
          const y = y0 + i * dy
          const negatifKeduanya = m < 0
          const warna = negatifKeduanya ? 'var(--m-hi)' : 'var(--ink)'
          return (
            <g key={m} opacity={o}>
              {negatifKeduanya && (
                <rect
                  x={xKiri - 118}
                  y={y - 19}
                  width={300}
                  height={38}
                  rx={9}
                  fill="var(--m-hi)"
                  opacity={nyalaHasil || nyalaNeg ? 0.16 : 0.08}
                />
              )}
              <text
                x={xKiri}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize={21}
                fontWeight={700}
                fill={warna}
                fontFamily="var(--font-math)"
              >
                {`${tanda(m)} × ${tanda(-b)}`}
              </text>
              <text
                x={xSama}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={21}
                fontWeight={700}
                fill="var(--ink-3)"
              >
                =
              </text>
              <text
                x={xHasil}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize={22}
                fontWeight={800}
                fill={hasil > 0 ? 'var(--m-ab)' : hasil < 0 ? 'var(--m-b)' : 'var(--ink-2)'}
                fontFamily="var(--font-math)"
              >
                {bil(hasil)}
              </text>
            </g>
          )
        })}

        {/* panah "+b" di antara baris */}
        {panah > 0.05 &&
          BARIS.slice(0, -1).map((m, i) => {
            const o = Math.min(panah, tampak(i), tampak(i + 1))
            if (o <= 0.05) return null
            const y = y0 + i * dy + dy / 2
            return (
              <g key={`p${m}`} opacity={o}>
                <path
                  d={`M ${xHasil + 26} ${y - 13} q 22 13 0 26`}
                  fill="none"
                  stroke="var(--m-ab)"
                  strokeWidth={2}
                />
                <Tag x={xHasil + 68} y={y} warna="var(--m-ab)" size={14}>
                  {`+${fmt(b)}`}
                </Tag>
              </g>
            )
          })}
      </g>

      {/* ---------- Panel argumen distributif ---------- */}
      {distributif > 0.05 && (
        <g opacity={distributif} transform={`translate(${W - 300} 0)`}>
          <rect x={0} y={78} width={272} height={190} rx={14} fill="var(--surface-2)" />
          <Tag x={136} y={104} warna="var(--m-a)" size={14} latar={null}>
            alasan yang mengunci
          </Tag>
          {[
            `(−1)(−${b}) + (−1)(${b})`,
            `= (−1) × (−${b} + ${b})`,
            `= (−1) × 0 = 0`,
            `karena (−1)(${b}) = −${b},`,
            `maka (−1)(−${b}) = +${b}`,
          ].map((s, i) => (
            <text
              key={i}
              x={136}
              y={136 + i * 27}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={16}
              fontWeight={i === 4 ? 800 : 600}
              fill={i === 4 ? 'var(--m-ab)' : 'var(--ink-2)'}
              fontFamily="var(--font-math)"
            >
              {s}
            </text>
          ))}
        </g>
      )}

      {/* ---------- Tabel aturan tanda ---------- */}
      {aturan > 0.05 && (
        <g opacity={aturan} transform={`translate(${W - 300} 280)`}>
          {[
            ['+ × +', '+'],
            ['+ × −', '−'],
            ['− × +', '−'],
            ['− × −', '+'],
          ].map(([kiri, hasil], i) => {
            const col = i % 2
            const row = Math.floor(i / 2)
            const x = col * 136
            const y = row * 56
            const positif = hasil === '+'
            return (
              <g key={kiri}>
                <rect
                  x={x}
                  y={y}
                  width={124}
                  height={46}
                  rx={10}
                  fill={positif ? 'var(--m-ab)' : 'var(--m-b)'}
                  opacity={i === 3 ? 0.28 : 0.14}
                  stroke={positif ? 'var(--m-ab)' : 'var(--m-b)'}
                  strokeWidth={i === 3 ? 2.5 : 1}
                />
                <text
                  x={x + 62}
                  y={y + 24}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={17}
                  fontWeight={800}
                  fill={positif ? 'var(--m-ab)' : 'var(--m-b)'}
                >
                  {`${kiri} = ${hasil}`}
                </text>
              </g>
            )
          })}
        </g>
      )}

      {step === 1 && (
        <Tag x={W / 2} y={54} warna="var(--m-ab)" size={16}>
          {`setiap turun satu baris, hasilnya naik ${fmt(b)}`}
        </Tag>
      )}
      {step === 5 && (
        <Tag x={190} y={54} warna="var(--ink-2)" size={15}>
          pola saja belum membuktikan
        </Tag>
      )}
    </Svg>
  )
}

/* ---------------- Visual untuk eksperimen ---------------- */

function VisualEksperimen({ p, sorot }: { p: Record<string, number>; sorot: string | null }) {
  // "+ 0" mengubah −0 menjadi 0 agar tidak tampil "-0".
  const a = Math.round(clamp(p.a ?? -3, -6, 6)) + 0
  const b = Math.round(clamp(p.b ?? -4, -6, 6)) + 0
  const hasil = a * b + 0

  // Garis bilangan dari −36 sampai 36.
  const min = -36
  const max = 36
  const x0 = 60
  const x1 = W - 60
  const gy = 250
  const ke = (v: number) => x0 + ((v - min) / (max - min)) * (x1 - x0)

  const langkah = Math.abs(a)

  const nyalaA = sorot === 'neg-a'
  const nyalaB = sorot === 'neg-b'
  const nyalaHasil = sorot === 'hasil'

  return (
    <Svg w={W} h={H} maxH={450} label="Garis bilangan yang menunjukkan hasil perkalian dua bilangan bulat">
      {/* garis bilangan */}
      <line x1={x0} y1={gy} x2={x1} y2={gy} stroke="var(--m-axis)" strokeWidth={2} />
      {Array.from({ length: 13 }, (_, i) => min + i * 6).map((v) => (
        <g key={v}>
          <line x1={ke(v)} y1={gy - 6} x2={ke(v)} y2={gy + 6} stroke="var(--m-axis)" strokeWidth={1.4} />
          <text
            x={ke(v)}
            y={gy + 22}
            textAnchor="middle"
            fontSize={12}
            fontWeight={700}
            fill="var(--ink-soft)"
          >
            {bil(v)}
          </text>
        </g>
      ))}
      <line x1={ke(0)} y1={gy - 42} x2={ke(0)} y2={gy + 12} stroke="var(--ink-3)" strokeWidth={1.6} />

      {/* lompatan sebanyak |a| kali sepanjang b */}
      {Array.from({ length: Math.min(langkah, 6) }, (_, i) => {
        // Setiap lompatan sepanjang |b|, arahnya ditentukan tanda hasil.
        const mulai = i * (hasil / (langkah || 1))
        const akhir = (i + 1) * (hasil / (langkah || 1))
        const naik = 26 + (i % 2) * 12
        return (
          <path
            key={i}
            d={`M ${ke(mulai)} ${gy - 4} Q ${(ke(mulai) + ke(akhir)) / 2} ${gy - 4 - naik} ${ke(akhir)} ${gy - 4}`}
            fill="none"
            stroke={hasil >= 0 ? 'var(--m-ab)' : 'var(--m-b)'}
            strokeWidth={2.2}
            markerEnd=""
            opacity={0.85}
          />
        )
      })}

      <circle
        cx={ke(hasil)}
        cy={gy}
        r={nyalaHasil ? 10 : 7}
        fill={hasil >= 0 ? 'var(--m-ab)' : 'var(--m-b)'}
      />
      <Tag
        x={ke(hasil)}
        y={gy - 78}
        warna={hasil >= 0 ? 'var(--m-ab)' : 'var(--m-b)'}
        size={18}
      >
        {bil(hasil)}
      </Tag>

      {/* pernyataan perkalian */}
      <Tag x={W / 2} y={80} warna="var(--ink)" size={24}>
        {`${tanda(a)} × ${tanda(b)} = ${bil(hasil)}`}
      </Tag>
      <Tag
        x={W / 2}
        y={124}
        warna={nyalaA || nyalaB ? 'var(--m-hi)' : 'var(--ink-2)'}
        size={15}
      >
        {a === 0 || b === 0
          ? 'apa pun dikali nol hasilnya nol'
          : a < 0 && b < 0
            ? 'negatif × negatif → hasilnya positif'
            : a > 0 && b > 0
              ? 'positif × positif → hasilnya positif'
              : 'tandanya berbeda → hasilnya negatif'}
      </Tag>

      {langkah > 6 && (
        <Tag x={W / 2} y={gy + 60} warna="var(--ink-soft)" size={13}>
          {`(hanya 6 lompatan pertama yang digambar dari ${fmt(langkah)})`}
        </Tag>
      )}
    </Svg>
  )
}

/* ---------------- Modul konsep ---------------- */

const konsep: Konsep = {
  id: 'negatif-kali-negatif',
  topicId: 'smp7-operasi-hitung-bilangan-bulat',
  judul: 'Negatif kali negatif',
  pertanyaan: 'Kenapa negatif × negatif hasilnya positif?',
  tagline: 'Bukan aturan yang dibuat-buat. Ini satu-satunya jawaban yang menjaga aritmetika tetap utuh.',
  kelas: 7,
  domain: 'bilangan',
  tags: ['bilangan bulat', 'negatif', 'perkalian', 'pola', 'distributif'],

  tebak: {
    pertanyaan: 'Menurutmu, kenapa (−3) × (−4) hasilnya +12 dan bukan −12?',
    pilihan: [
      {
        id: 'a',
        label: 'Karena memang begitu aturannya',
        balasan:
          'Ini jawaban yang paling sering terdengar di kelas. Tapi matematika hampir tidak pernah punya aturan yang benar-benar sembarangan — biasanya ada sesuatu yang memaksanya.',
      },
      {
        id: 'b',
        label: 'Karena dua tanda minus saling menghapus',
        balasan:
          'Cara mengingat yang praktis, tapi belum menjelaskan apa pun. Kenapa dua minus boleh saling menghapus pada perkalian, sedangkan pada penjumlahan tidak?',
      },
      {
        id: 'c',
        label: 'Karena kalau hasilnya negatif, aturan hitung lain jadi rusak',
        benar: true,
        balasan:
          'Tepat. Nilai positif adalah satu-satunya pilihan yang menjaga hukum distributif tetap berlaku. Sebentar lagi kamu melihat kerusakannya kalau dipilih yang lain.',
      },
    ],
    penutup:
      'Yang menarik: tidak ada seorang pun yang "memutuskan" hasilnya positif. Aturan itu terpaksa muncul.',
  },

  bongkar: {
    Visual: VisualBongkar,
    // Penggeser menyimpan b (positif), tetapi tabel mengalikan dengan (−b); labelnya
    // harus menyebut "negatif" supaya terbaca "Dikalikan dengan negatif 3", bukan "3".
    params: [{ key: 'b', label: 'Dikalikan dengan negatif', min: 2, max: 5, step: 1, awal: 2, bulat: true }],
    roles: { 'neg-a': 'a', 'neg-b': 'b', hasil: 'ab', nol: 'hi' },
    arti: {
      'neg-a': 'Bilangan pertama yang negatif.',
      'neg-b': 'Bilangan kedua yang negatif.',
      hasil: 'Hasil kalinya — positif, dan itu terpaksa demikian.',
      nol: 'Nol adalah kunci argumennya: apa pun dikali nol hasilnya nol.',
    },
    steps: [
      {
        id: 's0',
        judul: 'Mulai dari yang sudah kamu tahu',
        narasi:
          'Tiga baris pertama ini perkalian biasa: bilangan positif dikali bilangan negatif. Hasilnya negatif, dan itu belum aneh sama sekali.',
        durasi: 2200,
      },
      {
        id: 's1',
        judul: 'Ada pola yang rapi',
        narasi: (p) => {
          const b = nilaiB(p)
          return `Perhatikan kolom hasilnya: setiap kali pengali di kiri berkurang satu, hasilnya justru naik ${fmt(b)}. Dari ${bil(-3 * b)} ke ${bil(-2 * b)} lalu ke ${bil(-b)}, naiknya selalu ${fmt(b)}.`
        },
        durasi: 2000,
      },
      {
        id: 's2',
        judul: 'Sampai di nol',
        narasi:
          'Nol dikali berapa pun hasilnya nol. Baris ini tidak diragukan siapa pun, dan ia menjadi titik pijak kita.',
        durasi: 1600,
      },
      {
        id: 's3',
        judul: 'Teruskan polanya satu baris lagi',
        narasi: (p) => {
          const b = nilaiB(p)
          return `Kalau polanya diteruskan, hasil berikutnya harus naik ${fmt(b)} lagi dari nol, jadi (−1) × (${bil(-b)}) = ${fmt(b)}. Artinya negatif dikali negatif memberi hasil positif.`
        },
        durasi: 2200,
      },
      {
        id: 's4',
        judul: 'Dan sekali lagi',
        narasi: (p) => {
          const b = nilaiB(p)
          return `Polanya tetap konsisten: (−2) × (${bil(-b)}) = ${fmt(2 * b)}, naik ${fmt(b)} lagi. Menghentikan pola di sini justru akan membuat tabel ini tampak ganjil.`
        },
        durasi: 1800,
      },
      {
        id: 's5',
        judul: 'Tapi pola belum membuktikan',
        narasi:
          'Pola bisa saja kebetulan. Alasan yang benar-benar mengunci datang dari sifat distributif — sifat yang sudah kamu pakai sejak SD.',
        rumus: (p) => {
          const b = nilaiB(p)
          return `(−1)(${bil(-b)}) + (−1)(${fmt(b)}) = (−1)([nol:${bil(-b)} + ${fmt(b)}]) = (−1)(0) = 0`
        },
        durasi: 2600,
      },
      {
        id: 's6',
        judul: 'Aturan tandanya',
        narasi: (p) => {
          const b = nilaiB(p)
          return `Karena (−1)(${fmt(b)}) = ${bil(-b)}, satu-satunya nilai yang membuat jumlahnya nol adalah (−1)(${bil(-b)}) = +${fmt(b)}. Argumen yang sama persis berlaku untuk bilangan negatif mana pun, sehingga (−a)(−b) = +ab.`
        },
        rumus: '[neg-a:(−a)] × [neg-b:(−b)] = [hasil:+ab]',
        durasi: 2400,
      },
    ],
  },

  eksperimen: {
    judul: 'Coba semua kombinasi tanda',
    ajakan:
      'Geser kedua bilangan melewati nol. Perhatikan kapan hasilnya melompat ke sisi kanan garis bilangan.',
    params: [
      { key: 'a', label: 'Bilangan pertama', min: -6, max: 6, step: 1, awal: -3, bulat: true },
      { key: 'b', label: 'Bilangan kedua', min: -6, max: 6, step: 1, awal: -4, bulat: true },
    ],
    Visual: VisualEksperimen,
    temuan: (p) => {
      const a = Math.round(p.a ?? -3) + 0
      const b = Math.round(p.b ?? -4) + 0
      const h = a * b + 0
      return (
        <p>
          <strong>
            {tanda(a)} × {tanda(b)} = {bil(h)}.
          </strong>{' '}
          {a === 0 || b === 0
            ? 'Nol menghapus segalanya — dan justru baris nol inilah yang memaksa aturan tanda menjadi seperti sekarang.'
            : a * b > 0
              ? 'Kedua tandanya sama, jadi hasilnya positif.'
              : 'Tandanya berbeda, jadi hasilnya negatif.'}{' '}
          Coba tahan satu bilangan tetap negatif, lalu geser yang lain dari −6 sampai 6: hasilnya
          bergerak menurun dengan langkah tetap, melewati nol tanpa terputus. Pola itulah yang tidak
          boleh dirusak.
        </p>
      )
    },
  },

  penjelasan: {
    SMP: (
      <>
        <p>
          Alasan sebenarnya cuma satu kalimat: <strong>kita ingin hukum distributif tetap
          berlaku.</strong> Sifat itu berbunyi a(b + c) = ab + ac, dan sudah kamu pakai sejak
          belajar perkalian bersusun.
        </p>
        <p>Sekarang perhatikan perhitungan ini, dengan a dan b bilangan positif:</p>
        <p style={{ textAlign: 'center' }}>
          (−a)(−b) + (−a)(b) = (−a)(−b + b) = (−a)(0) = 0
        </p>
        <p>
          Kita sudah tahu (−a)(b) = −ab: urutan perkalian boleh ditukar, jadi (−a)(b) = b × (−a),
          dan bilangan positif dikali bilangan negatif hasilnya negatif — persis seperti baris-baris
          awal tabel tadi. Jadi persamaan di atas menjadi (−a)(−b) + (−ab) = 0, dan satu-satunya
          bilangan yang bila dijumlahkan dengan −ab menghasilkan nol adalah <strong>+ab</strong>.
        </p>
        <p>
          Jadi bukan seseorang yang memutuskan hasilnya positif. Nilai itu terpaksa muncul, kecuali
          kita bersedia membuang hukum distributif — dan tanpa hukum itu, hampir seluruh aritmetika
          yang kamu kenal ikut runtuh.
        </p>
        <h4>Analogi yang membantu, tapi bukan bukti</h4>
        <p>
          Ada analogi terkenal: menghadap ke suatu arah, lalu berbalik dua kali, membuatmu menghadap
          ke arah semula. Analogi ini enak diingat dan tidak salah, tetapi ia hanya{' '}
          <em>menggambarkan</em> aturannya — yang membuktikan tetap argumen distributif di atas.
        </p>
      </>
    ),
    SD: (
      <>
        <p>
          Lihat daftar ini: 3 × (−2) = −6, lalu 2 × (−2) = −4, lalu 1 × (−2) = −2, lalu 0 × (−2) = 0.
        </p>
        <p>
          Setiap kali angka di depan berkurang satu, hasilnya naik 2. Turun, naik 2. Turun, naik 2.
        </p>
        <p>
          Nah, kalau diteruskan: (−1) × (−2) harus naik 2 lagi dari 0, jadi hasilnya{' '}
          <strong>+2</strong>. Kalau tiba-tiba hasilnya −2, polanya patah tanpa alasan.
        </p>
      </>
    ),
    SMA: (
      <>
        <p>
          Dalam bahasa aljabar abstrak, aturan tanda adalah <em>teorema</em>, bukan aksioma. Pada
          sembarang gelanggang (ring) berlaku (−a)(−b) = ab, dan buktinya persis yang tadi:
        </p>
        <p style={{ textAlign: 'center' }}>
          (−a)(−b) + (−a)b = (−a)(−b + b) = (−a)·0 = 0 ⟹ (−a)(−b) = −((−a)b) = −(−ab) = ab
        </p>
        <p>
          Langkah (−a)·0 = 0 sendiri juga teorema: dari a·0 = a(0 + 0) = a·0 + a·0, kurangkan a·0
          dari kedua ruas. Begitu pula (−a)b = −(ab), dengan cara yang sama: ab + (−a)b = (a + (−a))b
          = 0·b = 0.
        </p>
        <h4>Kenapa ini penting</h4>
        <p>
          Kalau seseorang mendefinisikan (−1)(−1) = −1 pada bilangan bulat, struktur yang dihasilkan
          bukan lagi gelanggang: distributivitas gugur, dan bersamanya gugur pula pemfaktoran,
          penyelesaian persamaan, serta hampir semua aljabar. Jadi "negatif kali negatif positif"
          bukan pilihan selera — ia akibat yang tak terelakkan bila hukum distributif ingin tetap
          berlaku.
        </p>
      </>
    ),
  },

  rumus: {
    src: '[neg-a:(−a)] × [neg-b:(−b)] = [hasil:ab]',
    roles: { 'neg-a': 'a', 'neg-b': 'b', hasil: 'ab' },
    arti: {
      'neg-a': 'Bilangan negatif pertama.',
      'neg-b': 'Bilangan negatif kedua.',
      hasil:
        'Hasilnya positif — satu-satunya nilai yang menjaga hukum distributif tetap berlaku.',
    },
  },

  soal: [
    (rnd) => {
      const a = -(2 + Math.floor(rnd() * 8))
      const b = -(2 + Math.floor(rnd() * 8))
      return {
        id: 'neg-1',
        tipe: 'angka',
        topicId: 'smp7-operasi-hitung-bilangan-bulat',
        kelas: 7,
        tingkat: 'mudah',
        konsep: 'negatif-kali-negatif',
        pertanyaan: `Hitunglah ${tanda(a)} × ${tanda(b)}.`,
        jawaban: a * b,
        toleransi: 1e-9,
        hint: [
          'Tentukan dulu tandanya sebelum menghitung angkanya.',
          'Kedua bilangan bertanda sama, jadi hasilnya positif.',
          `Sekarang kalikan angkanya: ${fmt(Math.abs(a))} × ${fmt(Math.abs(b))}.`,
        ],
        pembahasan: `${tanda(a)} × ${tanda(b)} = +${fmt(a * b)}. Tanda sama menghasilkan positif.`,
      }
    },
    {
      id: 'neg-2',
      tipe: 'pilihan',
      topicId: 'smp7-operasi-hitung-bilangan-bulat',
      kelas: 7,
      tingkat: 'sedang',
      konsep: 'negatif-kali-negatif',
      pertanyaan: 'Hasil dari (−2) × (−3) × (−4) adalah...',
      pilihan: [
        { id: 'a', label: '−24', benar: true },
        {
          id: 'b',
          label: '24',
          diagnosa:
            'Kamu mungkin berpikir "semua negatif jadi positif". Yang menentukan adalah BANYAKNYA tanda negatif: di sini ada tiga, jumlah ganjil, jadi hasilnya negatif.',
        },
        { id: 'c', label: '−9', diagnosa: 'Angkanya dijumlahkan, bukan dikalikan.' },
        { id: 'd', label: '9', diagnosa: 'Dua kekeliruan sekaligus: dijumlahkan, lalu tandanya juga keliru.' },
      ],
      hint: [
        'Kerjakan dua bilangan pertama dulu, baru hasilnya dikalikan dengan yang ketiga.',
        '(−2) × (−3) = +6. Sekarang +6 dikali (−4).',
        'Hitung banyaknya tanda negatif. Kalau ganjil, hasil akhirnya negatif.',
      ],
      pembahasan:
        '(−2)(−3) = 6, lalu 6 × (−4) = −24. Aturan cepatnya: banyaknya faktor negatif genap → hasil positif; ganjil → hasil negatif.',
    },
    {
      id: 'neg-3',
      tipe: 'benar-salah',
      topicId: 'smp7-operasi-hitung-bilangan-bulat',
      kelas: 7,
      tingkat: 'sedang',
      konsep: 'negatif-kali-negatif',
      pertanyaan: 'Sama seperti pada perkalian, (−3) + (−4) juga menghasilkan bilangan positif.',
      jawaban: false,
      diagnosa:
        'Aturan "dua negatif jadi positif" hanya berlaku untuk perkalian dan pembagian, tidak untuk penjumlahan. Menambah utang pada utang tetap menghasilkan utang.',
      hint: [
        'Perhatikan operasinya: ini penjumlahan, bukan perkalian.',
        'Bayangkan garis bilangan: mulai dari −3, lalu melangkah 4 lagi ke kiri.',
        'Ke mana kamu berakhir, di kiri atau di kanan nol?',
      ],
      pembahasan:
        'Salah. (−3) + (−4) = −7. Aturan tanda pada perkalian tidak berlaku pada penjumlahan — ini salah satu kekeliruan paling sering.',
    },
    {
      id: 'neg-4',
      tipe: 'urutkan',
      topicId: 'smp7-operasi-hitung-bilangan-bulat',
      kelas: 8,
      tingkat: 'sulit',
      konsep: 'negatif-kali-negatif',
      pertanyaan: 'Susun kembali alasan yang memaksa (−1) × (−2) bernilai +2.',
      langkah: [
        'Mulai dari −2 + 2 = 0',
        'Kalikan kedua ruas dengan (−1): (−1)(−2 + 2) = (−1) × 0',
        'Jabarkan ruas kiri dengan sifat distributif: (−1)(−2) + (−1)(2) = (−1) × 0',
        'Ruas kanan bernilai 0, jadi (−1)(−2) + (−1)(2) = 0',
        'Karena (−1)(2) = −2, maka (−1)(−2) harus +2 agar jumlahnya 0',
      ],
      hint: [
        'Buktinya berangkat dari sesuatu yang pasti benar dan sangat sederhana.',
        'Nol adalah kuncinya: apa pun dikali nol hasilnya nol.',
        'Penjabaran dengan sifat distributif dilakukan setelah kedua ruas dikalikan.',
      ],
      pembahasan:
        'Inti buktinya: kalikan pernyataan yang pasti benar (−2 + 2 = 0) dengan (−1), lalu jabarkan dengan sifat distributif. Hasil positif menjadi satu-satunya kemungkinan.',
    },
    (rnd) => {
      const a = -(2 + Math.floor(rnd() * 6))
      const b = 2 + Math.floor(rnd() * 6)
      const c = -(2 + Math.floor(rnd() * 6))
      return {
        id: 'neg-5',
        tipe: 'angka',
        topicId: 'smp7-operasi-hitung-bilangan-bulat',
        kelas: 8,
        tingkat: 'sulit',
        konsep: 'negatif-kali-negatif',
        pertanyaan: `Hitunglah ${tanda(a)} × ${tanda(b)} − ${tanda(a)} × ${tanda(c)}.`,
        jawaban: a * b - a * c,
        toleransi: 1e-9,
        hint: [
          'Kerjakan kedua perkalian lebih dulu, baru kurangkan.',
          `${tanda(a)} × ${tanda(b)} = ${bil(a * b)}, dan ${tanda(a)} × ${tanda(c)} = ${bil(a * c)}.`,
          `Sekarang hitung ${bil(a * b)} − ${bil(a * c)}. Hati-hati: ${tanda(a)} × ${tanda(c)} positif karena kedua tandanya negatif, jadi yang dikurangkan adalah bilangan positif.`,
        ],
        pembahasan: `${tanda(a)} × ${tanda(b)} = ${bil(a * b)} dan ${tanda(a)} × ${tanda(c)} = ${bil(a * c)}, jadi ${bil(a * b)} − ${bil(a * c)} = ${bil(a * b - a * c)}. Cara lain: keluarkan faktor bersama, ${tanda(a)} × (${bil(b)} − ${tanda(c)}) = ${tanda(a)} × ${bil(b - c)} = ${bil(a * b - a * c)}.`,
      }
    },
  ],

  lanjut: ['timbangan-persamaan', 'kuadrat-jumlah', 'nilai-tempat'],
}

export default konsep
