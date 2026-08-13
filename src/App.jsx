import { useEffect } from 'react';
import NavigationBar from './components/NavigationBar';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Home_Page from './pages/Home_Page';
import About_Us from './pages/About_Us';
import ProductDetails from './pages/ProductDetails';
import Service_Details from './pages/Service_Details';
import Academy from './pages/Academy';
import Footer from './components/Footer';
// Import core Lenis
import Lenis from 'lenis';
import Research from './pages/Research';
import ScrollToTop from './components/ScrollToTop';


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
      <div className="sticky -top-10 z-50 transition-all duration-300 ease-in-out bg-white/90 backdrop-blur-md shadow-md">
        <NavigationBar />
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    // <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home_Page />} />

          {/* services */}
          <Route path='services/:id' element={<Service_Details />} />

          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/academy' element={<Academy />} />
          <Route path='/research' element={<Research />} />
          <Route path='/about_us' element={<About_Us />} />
        </Route>
        <Route path='*' element={<Navigate to={'/'} replace />} />
      </Routes>
    // </Router>
  );
}

export default App;