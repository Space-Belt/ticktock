import Config from 'react-native-config';
import weatherApiClient from './weatherApiClient';
import { IWeatherData } from '@entities/weather';

export const getWeatherWithLatLng = async (lat: number, lng: number): Promise<IWeatherData> => {
  const endPoint = `?lat=${lat}&lon=${lng}&appid=${Config.WEATHER_API_KEY}`;

  try {
    const response = await weatherApiClient.get(endPoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getWeatherWithCity = async (city: string): Promise<IWeatherData> => {
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
