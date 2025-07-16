import TickTockSafeAreaView from '@components/TickTockSafeAreaView';
import { ITodo } from '@entities/todo';
import { useNavigatorScreenOptions } from '@hooks/useNavigatorScreenOptions';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import AddTodoScreen from '@screens/addTodo/AddTodoScreen';
import CalendarScreen from '@screens/calendar/CalendarScreen';
import RepeatTodoScreen from '@screens/repeatTodo/RepeatTodoScreen';
import SettingScreen from '@screens/setting/SettingScreen';

export type MainStackParamList = {
  SettingScreen: undefined;
  AddTodo: undefined;
  Calendar: undefined;
  RepeatTodo: ITodo;
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
        <MainStack.Screen name="Calendar" component={CalendarScreen} />
        <MainStack.Screen name="RepeatTodo" component={RepeatTodoScreen} />
      </MainStack.Navigator>
    </TickTockSafeAreaView>
  );
};

export default MainStackNavigator;
