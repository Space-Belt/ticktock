import { ScrollView, Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { TODAY_TODOS } from '@utils/mock';
import TodoItem from './TodoItem';
import useDate from '@hooks/useDate';
import PrevNextController from '@screens/home/components/PrevNextController';
import { ITodo } from '@entities/todo';

type Props = {};

const TodayLists = (props: Props) => {
  const { currentDate, goToPreviousDay, goToNextDay } = useDate();

  const [todoData, setTodoData] = React.useState<ITodo[]>([...TODAY_TODOS]);

  const handleDelete = (id: string) => {
    const updatedTodos = todoData.filter(todo => todo.id !== id);
    setTodoData(updatedTodos);
  };
  return (
    <View>
      <View style={styles.dateStyle}>
        <PrevNextController
          text={currentDate}
          handlePrevClicked={goToPreviousDay}
          handleNextClicked={goToNextDay}
          width={200}
          textSize={16}
        />
      </View>
      <ScrollView>
        {todoData.map((todoEl, todoIndex) => (
          <TodoItem onDelete={handleDelete} key={todoEl.id} todoItem={todoEl} />
        ))}
      </ScrollView>
    </View>
  );
};

export default TodayLists;

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  dateStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
}));

// style={styles.container} contentContainerStyle={styles.container}
