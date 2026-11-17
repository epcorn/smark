import { lazy, Suspense, useEffect } from 'react';
import NavigationBar from './components/NavigationBar';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Home_Page from './pages/Home_Page';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { Box, Typography } from '@mui/material';
import { Analytics } from "@vercel/analytics/react";
import Careers from './pages/Careers';

import Lenis from 'lenis';
import { VscLoading } from 'react-icons/vsc';
import NavigationLoader from './components/NavigationLoader';

const About_Us = lazy(() => import('./pages/About_Us'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const Service_Details = lazy(() => import('./pages/Service_Details'))
const Academy = lazy(() => import('./pages/Academy'))
const Research = lazy(() => import('./pages/Research'))

export function Layout() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.2,
      smoothWheel: true,
    });

    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Analytics />
      <ScrollToTop />
      <NavigationLoader />

      <div className="sticky -top-7 z-50 transition-all duration-300 ease-in-out bg-white/90 backdrop-blur-md shadow-md">
        <NavigationBar />
      </div>

      <main>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home_Page />} />

        <Route path='services/:id' element={<Service_Details />} />
        <Route path='/products/:category/:id' element={<ProductDetails />} />
        <Route path='/loader' element={<PageLoader />} />
        <Route path='/learning' element={<Academy />} />
        <Route path='/research' element={<Research />} />
        <Route path='/about_us' element={<About_Us />} />
        <Route path='/careers' element={<Careers />} />
      </Route>
      <Route path='*' element={<Navigate to={'/'} replace />} />
    </Routes>
  );
}

export default App;

export function PageLoader() {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <VscLoading
        size={42}
        thickness={3}
        sx={{ color: '#2563eb' }}
        className='animate-spin'
      />

      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 500,
          color: '#64748b',
          letterSpacing: 1,
        }}
      >
        LOADING...
      </Typography>
    </Box>
  );
}