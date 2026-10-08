/* ============================================================
   Visual MTK — Spesifikasi gambar pada soal
   Soal tes topik ditulis sebagai data. Supaya tetap "visual"
   tanpa menulis SVG di setiap soal, gambar dinyatakan sebagai
   spesifikasi ringkas; penggambarnya ada di
   src/components/GambarSoal.tsx.
   ============================================================ */

/** Peran warna matematika (lihat tokens.css): a ungu, b jingga, ab hijau, c biru, hi merah muda. */
export type WarnaGambar = 'a' | 'b' | 'ab' | 'c' | 'hi'

export type BentukBenda =
  | 'bulat'
  | 'kotak'
  | 'segitiga'
  | 'bintang'
  | 'hati'
  | 'apel'
  | 'ikan'
  | 'balon'

export interface KelompokBenda {
  banyak: number
  bentuk?: BentukBenda
  warna?: WarnaGambar
  /** tulisan di atas kelompok, mis. "Keranjang A". */
  label?: string
  /** sekian benda TERAKHIR dicoret (untuk "diambil"). */
  coret?: number
  /** benda per baris; bawaan 5 (≤ 10 benda) atau 10. */
  per?: number
  /** ukuran benda: 'besar' dipakai untuk soal "besar belum tentu banyak". */
  ukuran?: 'kecil' | 'sedang' | 'besar'
}

export type BentukBangun =
  | 'persegi'
  | 'persegi-panjang'
  | 'segitiga'
  | 'segitiga-siku'
  | 'jajargenjang'
  | 'trapesium'
  | 'belah-ketupat'
  | 'layang-layang'
  | 'lingkaran'
  | 'kubus'
  | 'balok'
  | 'tabung'
  | 'kerucut'
  | 'bola'
  | 'limas'
  | 'prisma'

export type SpesGambar =
  /** Kumpulan benda untuk dihitung, dibandingkan, dijumlah, atau dikurangi. */
  | ({ jenis: 'benda' } & (KelompokBenda | { kelompok: KelompokBenda[] }))
  /**
   * Deretan ubin. Tiap isi: "bulat", "kotak:b" (bentuk:warna), "?" (kotak kosong
   * yang ditanyakan), atau teks bebas pendek seperti "12" dan "Ani".
   * `ujung` memberi keterangan di kiri dan kanan, mis. ["depan", "belakang"].
   */
  | { jenis: 'pola'; isi: string[]; ujung?: [string, string] }
  /** Blok nilai tempat: persegi ratusan, batang puluhan, kubus satuan. */
  | { jenis: 'blok'; ribuan?: number; ratusan?: number; puluhan?: number; satuan?: number }
  /**
   * Garis bilangan dari `dari` sampai `sampai` dengan jarak tanda `langkah`.
   * `label`: jarak antar angka yang ditulis (bawaan = langkah).
   * `penyebut`: tulis angka sebagai pecahan berpenyebut itu (mis. 4 → 1/4, 2/4, …).
   * `tanda`: titik yang ditandai. `tanya`: angka yang diganti "?".
   * `lompat`: busur lompatan [dari, ke].
   */
  | {
      jenis: 'garis'
      dari: number
      sampai: number
      langkah?: number
      label?: number
      penyebut?: number
      tanda?: number[]
      tanya?: number[]
      lompat?: [number, number][]
    }
  /**
   * Pecahan sebagai gambar. Tiap isi [bagian diarsir, banyak bagian sama besar].
   * Bila yang diarsir melebihi banyak bagian, digambar lebih dari satu utuh.
   */
  | { jenis: 'pecahan'; isi: [number, number][]; bentuk?: 'batang' | 'lingkaran' }
  /** Jam analog. */
  | { jenis: 'jam'; jam: number; menit: number }
  /** Diagram batang. `angka: true` menulis nilainya di atas batang. */
  | { jenis: 'batang'; label: string[]; nilai: number[]; sumbu?: string; angka?: boolean }
  /** Diagram lingkaran. `persen: true` menulis persennya di keterangan. */
  | { jenis: 'pai'; label: string[]; nilai: number[]; persen?: boolean }
  /** Tabel sederhana. */
  | { jenis: 'tabel'; kepala: string[]; baris: (string | number)[][] }
  /**
   * Bangun datar/ruang skematis (tidak berskala) dengan tulisan ukuran.
   * Kunci `label` per bentuk:
   *  persegi {s} · persegi-panjang {p, l} · segitiga {alas, tinggi, kiri, kanan}
   *  segitiga-siku {alas, tegak, miring} · jajargenjang {alas, tinggi, miring}
   *  trapesium {atas, bawah, tinggi} · belah-ketupat/layang-layang {d1, d2}
   *  lingkaran {r} atau {d} · kubus {s} · balok {p, l, t} · tabung {r, t}
   *  kerucut {r, t, s} · bola {r} · limas {s, t} · prisma {alas, tinggi, panjang}
   */
  | { jenis: 'bangun'; bentuk: BentukBangun; label?: Record<string, string> }
  /** Sebuah sudut sebesar `besar` derajat; `label` ditulis pada busurnya. */
  | { jenis: 'sudut'; besar: number; label?: string }
  /**
   * Bidang koordinat. `kurva`: fungsi yang digambar. `titik`: titik berlabel.
   * `ruas`: ruas garis [x1, y1, x2, y2]. `arsir`: daerah antara kurva ke-`kurva`
   * dan sumbu-x dari `dari` sampai `sampai`. `langkah`: jarak garis kisi [x, y].
   * `pi: true` menandai sumbu-x dalam kelipatan π/2 (untuk grafik trigonometri).
   */
  | {
      jenis: 'grafik'
      x: [number, number]
      y: [number, number]
      langkah?: [number, number]
      pi?: boolean
      kurva?: ((x: number) => number)[]
      titik?: { x: number; y: number; label?: string }[]
      ruas?: [number, number, number, number][]
      arsir?: { kurva: number; dari: number; sampai: number }
    }
  /** Neraca dua lengan. `miring`: sisi yang TURUN (lebih berat), atau 'seimbang'. */
  | { jenis: 'timbangan'; kiri: string; kanan: string; miring: 'kiri' | 'kanan' | 'seimbang' }
  /**
   * Pita/benda memanjang untuk membandingkan atau mengukur panjang.
   * `panjang` dan `mulai` dalam satuan petak (lebar gambar = `lebar` petak, bawaan 12).
   * `petak: true` menggambar garis petak satuan.
   */
  | {
      jenis: 'pita'
      isi: { label: string; panjang: number; mulai?: number; warna?: WarnaGambar }[]
      lebar?: number
      petak?: boolean
    }
