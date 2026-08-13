import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react"; // or import Lenis instance if initialized globally

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
      document.documentElement.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}