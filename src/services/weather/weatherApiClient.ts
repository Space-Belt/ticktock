import axios from 'axios';

export const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const weatherApiClient = axios.create({
  baseURL: WEATHER_API_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});

weatherApiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('Weather API Error:', error?.response || error);
    return Promise.reject(error);
  },
);

export default weatherApiClient;
