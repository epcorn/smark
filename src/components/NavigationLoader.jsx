
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PageLoader } from '../App';


export default function NavigationLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!loading) return null;

  return <PageLoader />;
}
