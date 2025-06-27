import TickTockSafeAreaView from '@components/TickTockSafeAreaView';
import { useNavigatorScreenOptions } from '@hooks/useNavigatorScreenOptions';
import HomeStackNavigator, {
  type HomeStackParamList,
} from '@navigations/loggedIn/bottomTab/home/HomeStackNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { type StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet } from 'react-native-unistyles';
import TodoListStackNavigator, { TodoListStackParamList } from './list/TodoListStackNavigator';

import HomeIcon from '@assets/images/icon_home.svg';
import ListIcon from '@assets/images/icon_lists.svg';

const ICON_SIZE = 28;

export type BottomTabParamList = {
  HomeStack: {
    screen: keyof HomeStackParamList;
    params: HomeStackParamList[keyof HomeStackParamList];
  };
  ListStack: {
    screen: keyof TodoListStackParamList;
    params: TodoListStackParamList[keyof TodoListStackParamList];
  };
};

export type BottomTabNavigatorProp = StackNavigationProp<BottomTabParamList>;

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  const { bottomTabScreenOptions } = useNavigatorScreenOptions();

  return (
    <TickTockSafeAreaView edges={['top']}>
      <BottomTab.Navigator screenOptions={bottomTabScreenOptions}>
        <BottomTab.Screen
          name="HomeStack"
          component={HomeStackNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <HomeIcon
                fill={styles.tabBarIcon(focused).color}
                width={ICON_SIZE}
                height={ICON_SIZE}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="ListStack"
          component={TodoListStackNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <ListIcon
                fill={styles.tabBarIcon(focused).color}
                width={ICON_SIZE}
                height={ICON_SIZE}
              />
            ),
          }}
        />
      </BottomTab.Navigator>
    </TickTockSafeAreaView>
  );
};

const styles = StyleSheet.create(theme => ({
  tabBarIcon: (focused: boolean) => ({
    color: focused ? theme.colors.text.primary : theme.colors.text.secondary,
  }),
}));

export default BottomTabNavigator;
