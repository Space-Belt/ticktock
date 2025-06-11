import TickTockSafeAreaView from '@components/TickTockSafeAreaView';
import { useNavigatorScreenOptions } from '@hooks/useNavigatorScreenOptions';
import { SmsAuthStackParamList } from '@navigations/smsAuth/SmsAuthStackNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import AuthScreen from '@screens/auth/AuthScreen';

export type LoggedOutStackParamList = {
  AuthScreen: undefined;
  SmsAuthStack: {
    screen: keyof SmsAuthStackParamList;
    params: SmsAuthStackParamList[keyof SmsAuthStackParamList];
  };
};

export type LoggedOutStackNavigatorProp = StackNavigationProp<LoggedOutStackParamList>;

const LoggedOutStack = createNativeStackNavigator<LoggedOutStackParamList>();

const LoggedOutStackNavigator = () => {
  const { nativeScreenOptions } = useNavigatorScreenOptions();

  return (
    <TickTockSafeAreaView edges={['top']}>
      <LoggedOutStack.Navigator screenOptions={nativeScreenOptions}>
        <LoggedOutStack.Screen name="AuthScreen" component={AuthScreen} />
      </LoggedOutStack.Navigator>
    </TickTockSafeAreaView>
  );
};

export default LoggedOutStackNavigator;
