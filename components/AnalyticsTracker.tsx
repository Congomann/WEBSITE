import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

const AnalyticsTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Combine pathname and search to get the full path for tracking.
    // This is important for tracking URLs with query parameters.
    const pagePath = location.pathname + location.search;
    trackPageView(pagePath);
  }, [location]);

  return null; // This component does not render any UI.
};

export default AnalyticsTracker;
