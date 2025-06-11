import TickTockSafeAreaView from '@components/TickTockSafeAreaView';
import { useNavigatorScreenOptions } from '@hooks/useNavigatorScreenOptions';
import HomeStackNavigator, {
  type HomeStackParamList,
} from '@navigations/loggedIn/bottomTab/home/HomeStackNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { type StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet } from 'react-native-unistyles';

export type BottomTabParamList = {
  HomeStack: {
    screen: keyof HomeStackParamList;
    params: HomeStackParamList[keyof HomeStackParamList];
  };
};

export type BottomTabNavigatorProp = StackNavigationProp<BottomTabParamList>;

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  const { bottomTabScreenOptions } = useNavigatorScreenOptions();

  return (
    <TickTockSafeAreaView edges={['top']}>
      <BottomTab.Navigator screenOptions={bottomTabScreenOptions}>
        <BottomTab.Screen name="HomeStack" component={HomeStackNavigator} />
      </BottomTab.Navigator>
    </TickTockSafeAreaView>
  );
};

const styles = StyleSheet.create(theme => ({}));

export default BottomTabNavigator;
