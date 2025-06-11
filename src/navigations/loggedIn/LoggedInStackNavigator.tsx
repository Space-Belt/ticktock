import { useNavigatorScreenOptions } from '@hooks/useNavigatorScreenOptions';
import BottomTabNavigator from '@navigations/loggedIn/bottomTab/BottomTabNavigator';
import MainStackNavigator, {
  MainStackParamList,
} from '@navigations/loggedIn/main/MainStackNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

type LoggedInStackParamList = {
  BottomTab: undefined;
  MainStack: {
    screen: keyof MainStackParamList;
    params?: MainStackParamList[keyof MainStackParamList];
  };
};

export type LoggedInStackNavigationProp = StackNavigationProp<LoggedInStackParamList>;

const LoggedInStack = createNativeStackNavigator<LoggedInStackParamList>();

const LoggedInStackNavigator = () => {
  const { nativeScreenOptions } = useNavigatorScreenOptions();

  const renderScreens = () => {
    return (
      <>
        <LoggedInStack.Screen name="BottomTab" component={BottomTabNavigator} />
        <LoggedInStack.Screen name="MainStack" component={MainStackNavigator} />
      </>
    );
  };

  return (
    <LoggedInStack.Navigator screenOptions={nativeScreenOptions}>
      {renderScreens()}
    </LoggedInStack.Navigator>
  );
};

export default LoggedInStackNavigator;
