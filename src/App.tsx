import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import Beranda from './pages/Beranda'

/* Halaman selain beranda dimuat saat dibutuhkan agar muatan awal ringan. */
const KenapaPage = lazy(() => import('./pages/KenapaPage'))
const KonsepPage = lazy(() => import('./pages/KonsepPage'))
const BelajarPage = lazy(() => import('./pages/BelajarPage'))
const KelasPage = lazy(() => import('./pages/KelasPage'))
const GaleriGambarPage = lazy(() => import('./pages/GaleriGambarPage'))
const TopikPage = lazy(() => import('./pages/TopikPage'))
const EksperimenPage = lazy(() => import('./pages/EksperimenPage'))
const TesPage = lazy(() => import('./pages/TesPage'))
const ProgresPage = lazy(() => import('./pages/ProgresPage'))
const PetaPage = lazy(() => import('./pages/PetaPage'))
const HarianPage = lazy(() => import('./pages/HarianPage'))

function Memuat() {
  return (
    <div className="page section stack stack-4" aria-busy="true">
      <div className="rangka rangka-judul" />
      <div className="rangka rangka-stage" />
    </div>
  )
}

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Beranda />} />
        <Route
          path="belajar"
          element={
            <Suspense fallback={<Memuat />}>
              <BelajarPage />
            </Suspense>
          }
        />
        <Route
          path="belajar/:kelas"
          element={
            <Suspense fallback={<Memuat />}>
              <KelasPage />
            </Suspense>
          }
        />
        <Route
          path="topik/:id"
          element={
            <Suspense fallback={<Memuat />}>
              <TopikPage />
            </Suspense>
          }
        />
        <Route
          path="kenapa"
          element={
            <Suspense fallback={<Memuat />}>
              <KenapaPage />
            </Suspense>
          }
        />
        <Route
          path="konsep/:id"
          element={
            <Suspense fallback={<Memuat />}>
              <KonsepPage />
            </Suspense>
          }
        />
        <Route
          path="eksperimen"
          element={
            <Suspense fallback={<Memuat />}>
              <EksperimenPage />
            </Suspense>
          }
        />
        <Route
          path="tes"
          element={
            <Suspense fallback={<Memuat />}>
              <TesPage />
            </Suspense>
          }
        />
        <Route
          path="harian"
          element={
            <Suspense fallback={<Memuat />}>
              <HarianPage />
            </Suspense>
          }
        />
        <Route
          path="peta"
          element={
            <Suspense fallback={<Memuat />}>
              <PetaPage />
            </Suspense>
          }
        />
        <Route
          path="progres"
          element={
            <Suspense fallback={<Memuat />}>
              <ProgresPage />
            </Suspense>
          }
        />
        {/* Halaman penulis soal — tidak ada di menu. */}
        <Route
          path="gambar-soal"
          element={
            <Suspense fallback={<Memuat />}>
              <GaleriGambarPage />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
