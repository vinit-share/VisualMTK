/* ============================================================
   Visual MTK — Kerangka aplikasi
   Navigasi sengaja pendek: lima tujuan, semuanya kata kerja.
   Di ponsel navigasi turun ke bawah layar agar mudah dijangkau ibu jari.
   ============================================================ */

import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Ikon, type NamaIkon } from './Ikon'
import { aksi, useSimpanan } from '../lib/store'

const MENU: { ke: string; label: string; ikon: NamaIkon }[] = [
  { ke: '/belajar', label: 'Belajar', ikon: 'belajar' },
  { ke: '/kenapa', label: 'Kenapa?', ikon: 'kenapa' },
  { ke: '/eksperimen', label: 'Eksperimen', ikon: 'eksperimen' },
  { ke: '/tes', label: 'Tes', ikon: 'tes' },
  { ke: '/progres', label: 'Progres', ikon: 'progres' },
]

/** Pasang tema ke elemen root dan samakan warna bilah peramban dengannya. */
function pasangTema(tema: 'light' | 'dark') {
  const root = document.documentElement
  root.dataset.theme = tema
  // Terang: warna brand (ubin ikon). Gelap: latar halaman. Dibaca dari token.
  const warna = getComputedStyle(root)
    .getPropertyValue(tema === 'dark' ? '--paper' : '--brand')
    .trim()
  if (!warna) return
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((m) => m.setAttribute('content', warna))
}

export function Layout() {
  const { pathname } = useLocation()
  const s = useSimpanan()
  const [buka, setBuka] = useState(false)

  // Terapkan tema ke elemen root.
  useEffect(() => {
    const pakai =
      s.pengaturan.tema === 'auto'
        ? matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : s.pengaturan.tema === 'gelap'
          ? 'dark'
          : 'light'
    pasangTema(pakai)
  }, [s.pengaturan.tema])

  // Ikuti perubahan tema sistem saat mode otomatis.
  useEffect(() => {
    if (s.pengaturan.tema !== 'auto') return
    const mq = matchMedia('(prefers-color-scheme: dark)')
    const on = () => {
      pasangTema(mq.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [s.pengaturan.tema])

  // Gulir ke atas saat pindah halaman.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    setBuka(false)
  }, [pathname])

  const gelap = document.documentElement.dataset.theme === 'dark'

  return (
    <div className="app">
      <a className="skip-link" href="#utama">
        Lompat ke konten
      </a>

      <header className="topbar">
        <div className="page topbar-in">
          <Link to="/" className="merek" aria-label="Visual MTK, beranda">
            <LogoMerek />
            <span className="merek-teks">
              Visual<span className="merek-aksen">MTK</span>
            </span>
          </Link>

          <nav className="nav-desktop" aria-label="Navigasi utama">
            {MENU.map((m) => (
              <NavLink key={m.ke} to={m.ke} className="nav-link">
                <Ikon nama={m.ikon} />
                <span>{m.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="row row-tight topbar-kanan">
            {s.streak.hitung > 0 && (
              <span className="chip chip-amber api" title={`Belajar ${s.streak.hitung} hari beruntun`}>
                <Ikon nama="api" /> {s.streak.hitung}
              </span>
            )}
            <button
              className="btn btn-icon btn-ghost"
              onClick={() => aksi.aturPengaturan({ tema: gelap ? 'terang' : 'gelap' })}
              aria-label={gelap ? 'Ganti ke tema terang' : 'Ganti ke tema gelap'}
            >
              <Ikon nama={gelap ? 'matahari' : 'bulan'} />
            </button>
            <button
              className="btn btn-icon btn-ghost hanya-ponsel"
              onClick={() => setBuka((b) => !b)}
              aria-label="Buka menu"
              aria-expanded={buka}
            >
              <Ikon nama={buka ? 'tutup' : 'menu'} />
            </button>
          </div>
        </div>

        {buka && (
          <div className="menu-ponsel">
            {MENU.map((m) => (
              <NavLink key={m.ke} to={m.ke} className="menu-ponsel-item">
                <Ikon nama={m.ikon} /> {m.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      <main id="utama" className="utama">
        <Outlet />
      </main>

      <footer className="kaki">
        <div className="page stack stack-3">
          <div className="row row-between">
            <span className="row row-tight">
              <LogoMerek kecil />
              <strong style={{ fontWeight: 'var(--fw-black)', letterSpacing: '-0.025em' }}>
                Visual<span className="merek-aksen">MTK</span>
              </strong>
            </span>
            <span className="tiny dim">Jangan cuma hafal. Lihat kenapa.</span>
          </div>
          <p className="tiny dim">
            Kemajuan belajar disimpan di peramban ini saja. Tidak ada akun, tidak ada server.
          </p>
        </div>
      </footer>

      <nav className="tabbar" aria-label="Navigasi utama ponsel">
        {MENU.map((m) => (
          <NavLink key={m.ke} to={m.ke} className="tab-item">
            <Ikon nama={m.ikon} ukuran="1.35em" />
            <span>{m.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

/**
 * Ikon "Puzzle Operator": empat operator + − % × tersusun 2×2 seperti keping
 * puzzle — anak ikut menyusun perhitungan, bukan cuma menerima jawaban.
 * Geometrinya sama dengan public/favicon.svg (kisi 32×32) dan warnanya tetap
 * di tema terang maupun gelap.
 */
export function LogoMerek({ kecil = false }: { kecil?: boolean }) {
  const s = kecil ? 22 : 28
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 32 32"
      className="logo"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="32" height="32" rx="7.5" fill="var(--ikon-ubin)" />
      {/* + */}
      <rect x="5.75" y="8.75" width="8.5" height="2.5" rx="1.25" fill="var(--ikon-krim)" />
      <rect x="8.75" y="5.75" width="2.5" height="8.5" rx="1.25" fill="var(--ikon-krim)" />
      {/* − */}
      <rect x="17.75" y="8.75" width="8.5" height="2.5" rx="1.25" fill="var(--ikon-lemon)" />
      {/* % */}
      <circle cx="7.3" cy="19.3" r="1.7" fill="var(--ikon-langit)" />
      <circle cx="12.7" cy="24.7" r="1.7" fill="var(--ikon-langit)" />
      <path d="M13 19 7 25" stroke="var(--ikon-langit)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      {/* × */}
      <path
        d="M19 19l6 6M25 19l-6 6"
        stroke="var(--ikon-krim)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
