import { ScrollView, Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import TodoItem from './components/TodoItem';
import { ITodo } from '@entities/todo';
import TickTockMainStackHeader from '@components/TickTockMainStackHeader';
import TodoListHeader from './components/TodoListHeader';
import { LoggedInStackNavigationProp } from '@navigations/loggedIn/LoggedInStackNavigator';
import { useNavigation } from '@react-navigation/native';
import TickTockPanel from '@components/TickTockPanel';

type Props = {};

const TodoListScreen = (props: Props) => {
  const navigation = useNavigation<LoggedInStackNavigationProp>();

  const [selectedPanel, setSelectedPanel] = React.useState(0);
  const handleChangePanel = (index: number) => {
    setSelectedPanel(index);
  };

  const [todoList, setTodoList] = React.useState<ITodo[]>([]);

  const panGestureEvent = Gesture.Pan()
    .onStart(() => {})
    .onUpdate(event => {
      console.log(event);
    })
    .onEnd(event => {});
  return (
    <ScrollView style={styles.container}>
      <TodoListHeader handleNavigation={() => navigation.goBack()} />
      <TickTockPanel
        panelList={[{ title: '오늘' }, { title: '반복' }, { title: '달력' }]}
        selectedPanel={selectedPanel}
        handleChangePanel={handleChangePanel}
      />
      <TodoItem />
    </ScrollView>
  );
};

export default TodoListScreen;

const styles = StyleSheet.create(theme => ({
  container: {
    paddingHorizontal: 16,
  },
}));
