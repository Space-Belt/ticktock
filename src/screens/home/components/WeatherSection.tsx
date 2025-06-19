import { Text, View } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getWeatherWithCity } from '@services/weather/weather';
import { StyleSheet } from 'react-native-unistyles';
import ItemWrapper from './ItemWrapper';
import { WEATHER_CONDITIONS } from '@entities/weather';
import { kelvinToCelsius } from '@utils/public';

type Props = {};

const renderIcon = (code: number) => {
  const weather = WEATHER_CONDITIONS[code];
  return weather ? <weather.icon /> : null;
};

const WeatherSection = (props: Props) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['weather'],
    queryFn: () => getWeatherWithCity('seoul'),
  });

  React.useEffect(() => {
    console.log(data?.weather);
    console.log(isLoading);
    console.log(error);
  }, [data, isLoading, error]);

  if (isLoading || error || data === undefined) {
    return <></>;
  }

  return (
    <ItemWrapper title="날씨" styleProp={styles.wrapperStyle}>
      <View style={styles.weatherWrapper}>
        {renderIcon(data.weather[0].id)}
        <Text>{`${kelvinToCelsius(data.main.temp)} °C`}</Text>
        <Text>{`${data.main.humidity} %`}</Text>
        <Text>{WEATHER_CONDITIONS[data.weather[0].id].name}</Text>
      </View>
    </ItemWrapper>
  );
};

export default WeatherSection;

const styles = StyleSheet.create(theme => ({
  wrapperStyle: {
    marginTop: 16,
  },
  weatherWrapper: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
