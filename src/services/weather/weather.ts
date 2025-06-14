import weatherApiClient from './weatherApiClient';

export const getWeatherWithLatLng = async (lat: number, lng: number) => {
  const endPoint = `?lat=${lat}&lon=${lng}&appid=${123123}`;

  try {
    const response = await weatherApiClient.get(endPoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API key}
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
export const getWeatherWithCity = async (city: string) => {
  const endPoint = `?q=${city}&appid=${123123}`;
  try {
    const response = await weatherApiClient.get(endPoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
