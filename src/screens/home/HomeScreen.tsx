import { Font } from '@styles/font';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import TickTockHomeHeader from '@components/TickTockHomeHeader';
import TodaysSchedule from './components/TodaysSchedule';
import WeatherSection from './components/WeatherSection';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <TickTockHomeHeader />
      <WeatherSection />
      <TodaysSchedule />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    ...Font.display,
  },
});
