// Google Analytics 4 Configuration
const GA_MEASUREMENT_ID = 'G-EEQE60DDDV'; // Ironi Dorot Tiberias

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const initGA = () => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      console.log('Google Analytics initialized successfully');
    }
  } catch (error) {
    console.error('Failed to initialize Google Analytics:', error);
  }
};

export const logPageView = (path: string) => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: path,
      });
    }
  } catch (error) {
    console.error('Failed to log page view:', error);
  }
};

export const logEvent = (action: string, category: string, label?: string, value?: number) => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  } catch (error) {
    console.error('Failed to log event:', error);
  }
};

export const logException = (description: string, fatal = false) => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: description,
        fatal: fatal,
      });
    }
  } catch (error) {
    console.error('Failed to log exception:', error);
  }
}; 