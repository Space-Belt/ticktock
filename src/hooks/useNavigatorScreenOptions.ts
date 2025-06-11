import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { type NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { type StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import { useUnistyles } from 'react-native-unistyles';

interface NavigatorScreenOptions {
  stackScreenOptions: StackNavigationOptions;
  nativeScreenOptions: NativeStackNavigationOptions;
  bottomTabScreenOptions: BottomTabNavigationOptions;
}

export const useNavigatorScreenOptions = (): NavigatorScreenOptions => {
  const { theme } = useUnistyles();

  const stackScreenOptions: StackNavigationOptions = React.useMemo(
    () => ({
      headerShown: false,
      cardStyle: {
        backgroundColor: theme.colors.background.primary,
      },
      presentation: 'card',
    }),
    [theme],
  );

  const nativeScreenOptions: NativeStackNavigationOptions = React.useMemo(
    () => ({
      headerShown: false,
      contentStyle: {
        backgroundColor: theme.colors.background.primary,
      },
      presentation: 'card',
    }),
    [theme],
  );

  const bottomTabScreenOptions: BottomTabNavigationOptions = React.useMemo(
    () => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: theme.colors.background.primary,
        borderTopWidth: 0,
        height: 80,
      },
    }),
    [theme],
  );

  return {
    stackScreenOptions,
    nativeScreenOptions,
    bottomTabScreenOptions,
  };
};
