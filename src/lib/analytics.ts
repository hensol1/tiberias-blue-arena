import ReactGA from 'react-ga4';

// Replace this with your actual Google Analytics Measurement ID
const GA_MEASUREMENT_ID = 'G-EEQE60DDDV'; // Ironi Dorot Tiberias

export const initGA = () => {
  if (typeof window !== 'undefined') {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }
};

export const logPageView = (path: string) => {
  if (typeof window !== 'undefined') {
    ReactGA.send({ hitType: 'pageview', page: path });
  }
};

export const logEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined') {
    ReactGA.event({
      action,
      category,
      label,
      value,
    });
  }
};

export const logException = (description: string, fatal = false) => {
  if (typeof window !== 'undefined') {
    ReactGA.event({
      action: 'exception',
      category: 'error',
      label: description,
      value: fatal ? 1 : 0,
    });
  }
}; 