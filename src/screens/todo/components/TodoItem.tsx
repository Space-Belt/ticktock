import { Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { ITodo } from '@entities/todo';
import { Font } from '@styles/font';
import { useItemSwipeGesture } from '../hook/useTodoItemGuesture';
import Animated from 'react-native-reanimated';

type Props = {
  todoItem: ITodo;
};

const TodoItem = ({ todoItem }: Props) => {
  const panGesture = useItemSwipeGesture(
    todoItem.id,
    id => {},
    (id, dx) => {},
    id => {},
  );

  const isType =
    todoItem.goalStartDate && todoItem.goalEndDate ? 'goal' : todoItem.repeat ? 'repeat' : 'todo';

  const isTypeTitle = isType === 'goal' ? '목표' : isType === 'repeat' ? '반복' : '할 일';

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={styles.container}>
        <View style={styles.titleWrapper}>
          <View style={styles.todoTypeStyle(isType)}>
            <Text style={styles.todoTypeText}>{isTypeTitle}</Text>
          </View>
          <Text style={styles.titleText}>{todoItem?.title ? todoItem.title : ''}</Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default TodoItem;

const styles = StyleSheet.create(theme => ({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.primary,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    ...Font.bodyMediumBold,
  },
  todoTypeStyle: (type: string) => ({
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor:
      type === 'todo'
        ? theme.colors.background.accent
        : type === 'repeat'
        ? theme.colors.background.secondary
        : theme.colors.background.card,
  }),
  todoTypeText: {
    ...Font.bodySmallExtraBold,
  },
}));
