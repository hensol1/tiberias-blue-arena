import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, logPageView } from '@/lib/analytics';

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Google Analytics on first load
    try {
      initGA();
    } catch (error) {
      console.error('Failed to initialize analytics:', error);
    }
  }, []);

  useEffect(() => {
    // Track page views when location changes
    try {
      if (location) {
        logPageView(location.pathname + location.search);
      }
    } catch (error) {
      console.error('Failed to log page view:', error);
    }
  }, [location]);
}; 