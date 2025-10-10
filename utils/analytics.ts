// Extend the Window interface to include the gtag function for TypeScript.
declare global {
  interface Window {
    gtag?: (command: 'config' | 'event', action: string, params?: { [key: string]: any }) => void;
  }
}

// IMPORTANT: Replace with your actual Measurement ID
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

/**
 * Tracks a pageview event to Google Analytics.
 * This is used for Single Page Applications to log navigation events.
 * @param url The path of the page to track (e.g., /about).
 */
export const trackPageView = (url: string) => {
  if (window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

/**
 * Tracks a custom event to Google Analytics.
 * @param action The name of the event (e.g., 'add_to_cart').
 * @param params Additional data associated with the event.
 */
export const trackEvent = (action: string, params: { [key: string]: any }) => {
  if (window.gtag) {
    window.gtag('event', action, params);
  }
};
