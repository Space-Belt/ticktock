import { Text, View } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getWeatherWithCity } from '@services/weather/weather';
import { StyleSheet } from 'react-native-unistyles';
import ItemWrapper from './ItemWrapper';
import SunIcon from '@assets/images/icon_sunny.svg';
import RainIcon from '@assets/images/icon_rainy.svg';
import SnowIcon from '@assets/images/icon_snow.svg';
import ThunderIcon from '@assets/images/icon_thunder.svg';
import WindIcon from '@assets/images/icon_wind.svg';
import CloudIcon from '@assets/images/icon_cloud.svg';
import { WEATHER_CONDITIONS } from '@entities/weather';

type Props = {};

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

  const renderIcon = (code: number) => {
    const IconComponent = WEATHER_CONDITIONS[code].icon;
    if (IconComponent === 'Sun') return <SunIcon />;
    if (IconComponent === 'Rain') return <RainIcon />;
    if (IconComponent === 'Snow') return <SnowIcon />;
    if (IconComponent === 'Thunder') return <ThunderIcon />;
    if (IconComponent === 'Wind') return <WindIcon />;
    if (IconComponent === 'Cloudy') return <CloudIcon />;
  };

  if (isLoading || error || data === undefined) {
    return <></>;
  }

  return (
    <ItemWrapper title="날씨" styleProp={styles.wrapperStyle}>
      {renderIcon(data.weather[0].id)}
    </ItemWrapper>
  );
};

export default WeatherSection;

const styles = StyleSheet.create(theme => ({
  wrapperStyle: {
    marginTop: 16,
  },
}));
