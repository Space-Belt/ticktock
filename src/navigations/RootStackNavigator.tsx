import { useNavigatorScreenOptions } from '@hooks/useNavigatorScreenOptions';
import LoggedOutStackNavigator, {
  LoggedOutStackParamList,
} from '@navigations/loggedOut/LoggedOutStackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type StackNavigationProp } from '@react-navigation/stack';
import LoggedInStackNavigator from './loggedIn/LoggedInStackNavigator';
import { MainStackParamList } from './loggedIn/main/MainStackNavigator';

type RootStackParamList = {
  LoggedInStack: {
    screen: keyof MainStackParamList;
    params?: MainStackParamList[keyof MainStackParamList];
  };
  LoggedOutStack: {
    screen: keyof LoggedOutStackParamList;
    params?: LoggedOutStackParamList[keyof LoggedOutStackParamList];
  };
};

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  const { nativeScreenOptions } = useNavigatorScreenOptions();
  const accessToken = true;

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={nativeScreenOptions}>
        {accessToken ? (
          <RootStack.Screen name="LoggedInStack" component={LoggedInStackNavigator} />
        ) : (
          <RootStack.Screen name="LoggedOutStack" component={LoggedOutStackNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigator;
