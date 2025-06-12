import { ITodo } from '@entities/todo';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, View } from 'react-native';
import Animated, { BounceInLeft } from 'react-native-reanimated';
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
    repeatDays: ['mon', 'wed', 'fri'],
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
    repeatDays: ['tue', 'thu', 'fri'],
  },
  {
    id: '4',
    title: 'Design Sprint',
    completed: false,
    created_at: '2025-06-01',
    goalStartDate: '2025-06-01',
    goalEndDate: '2025-06-10',
    tags: ['work', 'design'],
    priority: 'high',
    completedDates: ['2025-06-01'],
    repeat: 'daily',
    repeatStartDate: '2025-06-01',
    repeatEndDate: '2025-06-30',
    repeatInterval: 1,
  },
  {
    id: '5',
    title: 'Client Call',
    completed: false,
    created_at: '2025-06-01',
    goalStartDate: '2025-06-01',
    goalEndDate: '2025-06-10',
    tags: ['work', 'call'],
    priority: 'medium',
    completedDates: ['2025-06-01'],
    repeat: 'weekly',
    repeatStartDate: '2025-06-01',
    repeatEndDate: '2025-06-30',
    repeatInterval: 1,
    repeatDays: ['mon', 'wed', 'fri'],
  },
  {
    id: '6',
    title: 'Weekly Report',
    completed: false,
    created_at: '2025-06-01',
    goalStartDate: '2025-06-01',
    goalEndDate: '2025-06-10',
    tags: ['work', 'report'],
    priority: 'low',
    completedDates: ['2025-06-01'],
    repeat: 'weekly',
    repeatStartDate: '2025-06-01',
    repeatEndDate: '2025-06-30',
    repeatInterval: 1,
    repeatDays: ['tue', 'thu', 'fri'],
  },
  {
    id: '7',
    title: 'Weekly Report',
    completed: false,
    created_at: '2025-06-01',
    goalStartDate: '2025-06-01',
    goalEndDate: '2025-06-10',
    tags: ['work', 'report'],
    priority: 'low',
    completedDates: ['2025-06-01'],
    repeat: 'weekly',
    repeatStartDate: '2025-06-01',
    repeatEndDate: '2025-06-30',
    repeatInterval: 1,
    repeatDays: ['tue', 'thu', 'fri'],
  },
  {
    id: '8',
    title: 'Weekly Report',
    completed: false,
    created_at: '2025-06-01',
    goalStartDate: '2025-06-01',
    goalEndDate: '2025-06-10',
    tags: ['work', 'report'],
    priority: 'low',
    completedDates: ['2025-06-01'],
    repeat: 'weekly',
    repeatStartDate: '2025-06-01',
    repeatEndDate: '2025-06-30',
    repeatInterval: 1,
    repeatDays: ['tue', 'thu', 'fri'],
  },
  {
    id: '9',
    title: 'Weekly Report',
    completed: false,
    created_at: '2025-06-01',
    goalStartDate: '2025-06-01',
    goalEndDate: '2025-06-10',
    tags: ['work', 'report'],
    priority: 'low',
    completedDates: ['2025-06-01'],
    repeat: 'weekly',
    repeatStartDate: '2025-06-01',
    repeatEndDate: '2025-06-30',
    repeatInterval: 1,
    repeatDays: ['tue', 'thu', 'fri'],
  },
];

const TodaysSchedule = () => {
  const navigation = useNavigation();

  const [todoData, setTodoData] = React.useState<ITodo[]>([...MOCK_DATA]);
  const [showAll, setShowAll] = React.useState(false);

  const handleTodoClicked = (id: string, callBack: () => void) => {
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
    callBack();
  };

  const displayedTodos = todoData.length > 7 && !showAll ? todoData.slice(0, 5) : todoData;
  const renderTodos = (todos: ITodo[]): React.ReactNode => {
    if (todos.length === 0) {
      return <></>;
    }
    return todos.map(el => (
      <Animated.View key={el.id} entering={BounceInLeft.duration(500)}>
        <TodoItem
          key={el.id}
          completed={el.completed}
          title={el.title}
          handleTodoClicked={handleTodoClicked}
          id={el.id}
        />
      </Animated.View>
    ));
  };

  return (
    <ItemWrapper title={'Todays Schedule'}>
      <View style={styles.container}>
        {renderTodos(displayedTodos)}

        {todoData.length > 7 && (
          <Button title={showAll ? '접기' : '더보기'} onPress={() => setShowAll(prev => !prev)} />
        )}
      </View>
    </ItemWrapper>
  );
};

export default TodaysSchedule;

const styles = StyleSheet.create(theme => ({
  container: {},
}));
