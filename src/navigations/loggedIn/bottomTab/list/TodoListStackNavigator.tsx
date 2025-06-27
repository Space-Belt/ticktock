import { useNavigatorScreenOptions } from '@hooks/useNavigatorScreenOptions';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import HomeScreen from '@screens/home/HomeScreen';
import TodoListScreen from '@screens/todo/TodoListScreen';

export type TodoListStackParamList = {
  TodoList: undefined;
};

export type TodoListStackNavigatorProp = StackNavigationProp<TodoListStackParamList>;

const TodoListStack = createNativeStackNavigator<TodoListStackParamList>();

const TodoListStackNavigator = () => {
  const { nativeScreenOptions } = useNavigatorScreenOptions();

  return (
    <TodoListStack.Navigator screenOptions={nativeScreenOptions}>
      <TodoListStack.Screen name="TodoList" component={TodoListScreen} />
    </TodoListStack.Navigator>
  );
};

export default TodoListStackNavigator;
