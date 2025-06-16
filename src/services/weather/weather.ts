import Config from 'react-native-config';
import weatherApiClient from './weatherApiClient';

export const getWeatherWithLatLng = async (lat: number, lng: number) => {
  const endPoint = `?lat=${lat}&lon=${lng}&appid=96cf62a0af315ceeba8e6b8c1458503a`;

  try {
    const response = await weatherApiClient.get(endPoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// /weather?q={city name}&appid={API key}
export const getWeatherWithCity = async (city: string) => {
  const endPoint = `?q=Seoul&appid=${Config.WEATHER_API_KEY}`;

  try {
    const response = await weatherApiClient.get(endPoint);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
