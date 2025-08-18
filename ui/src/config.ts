// Environment configuration for the UI
export const config = {
  environment: process.env.REACT_APP_ENVIRONMENT || "development",
  serviceUrl: process.env.REACT_APP_SERVICE_URL || "http://localhost:8000",
  
  // Ad configuration - set to false until Google AdSense approval
  showAds: process.env.REACT_APP_SHOW_ADS === "true" || false,

  // Helper to check if we're in development mode
  isDevelopment: () => {
    const env = process.env.REACT_APP_ENVIRONMENT || "development";
    return env.toLowerCase() === "development";
  },

  // Helper to check if we're in production mode
  isProduction: () => {
    const env = process.env.REACT_APP_ENVIRONMENT || "development";
    return env.toLowerCase() === "production";
  }
};
