import axios from 'axios';

// 날씨 API URL (예시)
export const WEATHER_API_URL = `https://api.weatherapi.com/v1/current.json?key=${YOUR_API_KEY}`;

const weatherApiClient = axios.create({
  baseURL: WEATHER_API_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});

// 날씨 API에 필요한 특정 인터셉터나 추가 설정이 있다면 여기에 추가
weatherApiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('Weather API Error:', error?.response || error);
    return Promise.reject(error);
  },
);

export default weatherApiClient;
