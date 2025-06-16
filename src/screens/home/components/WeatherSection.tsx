import { Text, View } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getWeatherWithCity } from '@services/weather/weather';
import { StyleSheet } from 'react-native-unistyles';

type Props = {};

const WeatherSection = (props: Props) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['weather'],
    queryFn: () => getWeatherWithCity('seoul'),
  });

  React.useEffect(() => {
    console.log(data);
    console.log(isLoading);
    console.log(error);
  }, [data, isLoading, error]);

  return (
    <View>
      <Text>weatheddrSection</Text>
    </View>
  );
};

export default WeatherSection;

const styles = StyleSheet.create(theme => ({}));
