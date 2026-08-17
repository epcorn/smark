import { lazy, Suspense, useEffect } from 'react';
import NavigationBar from './components/NavigationBar';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Lenis from 'lenis';
import ScrollToTop from './components/ScrollToTop';
import { Skeleton } from '@mui/material';

import Home_Page from './pages/Home_Page';
import Footer from './components/Footer';
// import About_Us from './pages/About_Us';
// import ProductDetails from './pages/ProductDetails';
// import Service_Details from './pages/Service_Details';
// import Academy from './pages/Academy';
// import Research from './pages/Research';

// const Home_Page = lazy(()=> import('./pages/Home_Page'))
const About_Us = lazy(() => import('./pages/About_Us'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const Service_Details = lazy(() => import('./pages/Service_Details'))
const Academy = lazy(() => import('./pages/Academy'))
const Research = lazy(() => import('./pages/Research'))




export function Layout() {


  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.005 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <div className="sticky -top-10 z-50 transition-all duration-300 ease-in-out bg-white/90 backdrop-blur-md shadow-md">
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

        {/* services */}
        <Route path='services/:id' element={<Service_Details />} />

        <Route path='/products/:category/:id' element={<ProductDetails />} />

        <Route path='/loader' element={<PageLoader />} />
        <Route path='/academy' element={<Academy />} />
        <Route path='/research' element={<Research />} />
        <Route path='/about_us' element={<About_Us />} />
      </Route>
      <Route path='*' element={<Navigate to={'/'} replace />} />
    </Routes>
  );
}

export default App;

function PageLoader() {
  return (
    <div>
      <Skeleton variant="rectangular" animation="pulse" height="40dvh" sx={{ m: 2, borderRadius: 5 }} />
      <Skeleton variant="text" animation="wave" height={20} sx={{ mx: 2, borderRadius: 1 }} />
      <Skeleton variant="text" animation="wave" height={100} sx={{ mx: 2, borderRadius: 2, my: 0 }} />
      <Skeleton variant="rounded" animation="wave" height={100} sx={{ mx: 2 }} />
    </div>
  );
}