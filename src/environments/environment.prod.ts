export const API_URL = (window as any).__env?.API_URL;
export const environment = {
  production: true,
  BASE_URL: API_URL,
  HOST_NAME: API_URL,

  // BASE_URL: 'http://localhost:8000',
  // HOST_NAME: 'http://localhost:8000',
};