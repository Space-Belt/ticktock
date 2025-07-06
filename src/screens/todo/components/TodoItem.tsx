import { Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { ITodo } from '@entities/todo';
import { Font } from '@styles/font';

type Props = {
  todoItem: ITodo;
};

const TodoItem = ({ todoItem }: Props) => {
  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-10, 10])
    .onStart(e => {
      console.log('onStart', e);
    })
    .onUpdate(e => {
      console.log(e);
    })
    .onEnd(e => {});

  const isType =
    todoItem.goalStartDate && todoItem.goalEndDate ? 'goal' : todoItem.repeat ? 'repeat' : 'todo';

  const isTypeTitle = isType === 'goal' ? '목표' : isType === 'repeat' ? '반복' : '할 일';

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <View style={styles.todoTypeStyle(isType)}>
            <Text style={styles.todoTypeText}>{isTypeTitle}</Text>
          </View>
          <Text style={styles.titleText}>{todoItem?.title ? todoItem.title : ''}</Text>
        </View>
      </View>
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
