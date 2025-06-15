import TickTockButton from '@components/TickTockButton';
import { ITodo } from '@entities/todo';
import useDate from '@hooks/useDate';
import { useNavigation } from '@react-navigation/native';
import { MOCK_DATA } from '@utils/mock';
import React from 'react';
import { View } from 'react-native';
import Animated, { BounceInLeft } from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import ItemWrapper from './ItemWrapper';
import PrevNextController from './PrevNextController';
import TodoItem from './TodoItem';

const TodaysSchedule = () => {
  const navigation = useNavigation();

  const { currentDate, goToPreviousDay, goToNextDay } = useDate();

  const [todoData, setTodoData] = React.useState<ITodo[]>([...MOCK_DATA]);
  const [showAll, setShowAll] = React.useState(false);
  const displayedTodos = todoData.length > 7 && !showAll ? todoData.slice(0, 5) : todoData;

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

  // 날짜 변하면 데이터 불러오기 로직 추가해야함
  React.useEffect(() => {
    console.log(currentDate);
  }, [currentDate]);

  return (
    <ItemWrapper
      title={'할일 하세요'}
      topChildren={
        <PrevNextController
          text={currentDate}
          handlePrevClicked={goToPreviousDay}
          handleNextClicked={goToNextDay}
          gap={10}
        />
      }>
      <View style={styles.container}>
        {renderTodos(displayedTodos)}
        {todoData.length > 7 && (
          <View style={styles.buttonContainer}>
            <TickTockButton
              title={showAll ? '접기' : '더보기'}
              onPress={() => setShowAll(prev => !prev)}
              width={80}
              height={30}
            />
          </View>
        )}
      </View>
    </ItemWrapper>
  );
};

export default TodaysSchedule;

const styles = StyleSheet.create(theme => ({
  container: {},
  buttonContainer: {
    alignItems: 'center',
  },
}));
