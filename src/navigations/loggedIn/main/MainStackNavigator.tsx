import TickTockSafeAreaView from '@components/TickTockSafeAreaView';
import { useNavigatorScreenOptions } from '@hooks/useNavigatorScreenOptions';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import AddTodoScreen from '@screens/addTodo/AddTodoScreen';
import SettingScreen from '@screens/setting/SettingScreen';

export type MainStackParamList = {
  SettingScreen: undefined;
  AddTodo: undefined;
};

export type MainStackNavigatorProp = StackNavigationProp<MainStackParamList>;

const MainStack = createNativeStackNavigator<MainStackParamList>();

const MainStackNavigator = () => {
  const { nativeScreenOptions } = useNavigatorScreenOptions();

  return (
    <TickTockSafeAreaView edges={['top']}>
      <MainStack.Navigator screenOptions={nativeScreenOptions}>
        <MainStack.Screen name="SettingScreen" component={SettingScreen} />
        <MainStack.Screen name="AddTodo" component={AddTodoScreen} />
      </MainStack.Navigator>
    </TickTockSafeAreaView>
  );
};

export default MainStackNavigator;
