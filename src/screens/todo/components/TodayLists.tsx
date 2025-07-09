import { ScrollView, Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { TODAY_TODOS } from '@utils/mock';
import TodoItem from './TodoItem';
import useDate from '@hooks/useDate';
import PrevNextController from '@screens/home/components/PrevNextController';

type Props = {};

const TodayLists = (props: Props) => {
  const { currentDate, goToPreviousDay, goToNextDay } = useDate();
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
        {TODAY_TODOS.map((todoEl, todoIndex) => (
          <TodoItem key={todoEl.id} todoItem={todoEl} />
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
