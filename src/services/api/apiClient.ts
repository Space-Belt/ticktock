import axios from 'axios';

export const BASE_API_URL = '';

const apiClient = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error?.response || error);
    return Promise.reject(error);
  },
);

export default apiClient;
