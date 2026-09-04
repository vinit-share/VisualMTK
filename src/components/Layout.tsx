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

export function Layout() {
  const { pathname } = useLocation()
  const s = useSimpanan()
  const [buka, setBuka] = useState(false)

  // Terapkan tema ke elemen root.
  useEffect(() => {
    const root = document.documentElement
    const pakai =
      s.pengaturan.tema === 'auto'
        ? matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : s.pengaturan.tema === 'gelap'
          ? 'dark'
          : 'light'
    root.dataset.theme = pakai
  }, [s.pengaturan.tema])

  // Ikuti perubahan tema sistem saat mode otomatis.
  useEffect(() => {
    if (s.pengaturan.tema !== 'auto') return
    const mq = matchMedia('(prefers-color-scheme: dark)')
    const on = () => {
      document.documentElement.dataset.theme = mq.matches ? 'dark' : 'light'
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
              <strong>Visual MTK</strong>
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

export function LogoMerek({ kecil = false }: { kecil?: boolean }) {
  const s = kecil ? 22 : 30
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 32 32"
      className="logo"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="1.5" y="1.5" width="29" height="29" rx="9" fill="var(--brand)" />
      {/* Setengah lingkaran + setengah persegi: inti gagasan "lihat kenapa". */}
      <path d="M16 7.5a8.5 8.5 0 0 0 0 17z" fill="var(--amber)" />
      <path d="M16 7.5h8.5v17H16z" fill="var(--on-brand)" opacity="0.92" />
      <circle cx="16" cy="16" r="2.1" fill="var(--brand)" />
    </svg>
  )
}
