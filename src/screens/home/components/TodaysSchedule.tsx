import { ITodo } from '@entities/todo';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import ItemWrapper from './ItemWrapper';
import TodoItem from './TodoItem';

const MOCK_DATA: ITodo[] = [
  {
    id: '1',
    title: 'Morning Exercise',
    completed: false,
    created_at: '2025-06-01',
    goalStartDate: '2025-06-01',
    goalEndDate: '2025-06-10',
    tags: ['health', 'fitness'],
    priority: 'high',
    completedDates: ['2025-06-01'],
    repeat: 'daily',
    repeatStartDate: '2025-06-01',
    repeatEndDate: '2025-06-30',
    repeatInterval: 1,
  },
  {
    id: '2',
    title: 'Team Meeting',
    completed: false,
    created_at: '2025-06-01',
    goalStartDate: '2025-06-01',
    goalEndDate: '2025-06-10',
    tags: ['work', 'meeting'],
    priority: 'medium',
    completedDates: ['2025-06-01'],
    repeat: 'weekly',
    repeatStartDate: '2025-06-01',
    repeatEndDate: '2025-06-30',
    repeatInterval: 1,
    repeatDays: ['mon', 'wed', 'fri'], // 월, 수, 금 반복
  },
  {
    id: '3',
    title: 'Content Creation',
    completed: false,
    created_at: '2025-06-01',
    goalStartDate: '2025-06-01',
    goalEndDate: '2025-06-10',
    tags: ['work', 'content'],
    priority: 'low',
    completedDates: ['2025-06-01'],
    repeat: 'weekly',
    repeatStartDate: '2025-06-01',
    repeatEndDate: '2025-06-30',
    repeatInterval: 1,
    repeatDays: ['tue', 'thu', 'fri'], // 화, 목, 금 반복
  },
];

const TodaysSchedule = () => {
  const navigation = useNavigation();
  const [todoData, setTodoData] = React.useState<ITodo[]>([...MOCK_DATA]);

  const handleTodoClicked = (id: string) => {
    const currentDate = new Date().toISOString().split('T')[0];

    const updatedTodos = todoData.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
          completedDates: todo.completed
            ? todo.completedDates?.filter(date => date !== currentDate)
            : [...(todo.completedDates || []), currentDate],
        };
      }
      return todo;
    });

    setTodoData(updatedTodos);
  };
  return (
    <ItemWrapper title={'Todays Schedule'}>
      <View style={styles.container}>
        {todoData.map((el, index) => (
          <TodoItem
            key={el.id}
            completed={el.completed}
            title={el.title}
            handleTodoClicked={handleTodoClicked}
            id={el.id}
          />
        ))}
      </View>
    </ItemWrapper>
  );
};

export default TodaysSchedule;

const styles = StyleSheet.create(theme => ({
  container: {},
}));
