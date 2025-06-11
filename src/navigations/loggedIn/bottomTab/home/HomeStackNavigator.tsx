import { useNavigatorScreenOptions } from '@hooks/useNavigatorScreenOptions';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import HomeScreen from '@screens/home/HomeScreen';

export type HomeStackParamList = {
  Home: undefined;
};

export type HomeStackNavigatorProp = StackNavigationProp<HomeStackParamList>;

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  const { nativeScreenOptions } = useNavigatorScreenOptions();

  return (
    <HomeStack.Navigator screenOptions={nativeScreenOptions}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
