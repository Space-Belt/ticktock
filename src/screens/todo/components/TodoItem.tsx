import { Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { ITodo } from '@entities/todo';

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
      // if (onLeft.value) {
      //   position.value = e.translationX;
      // } else {
      //   position.value = END_POSITION + e.translationX;
      // }
      console.log(e);
    })
    .onEnd(e => {
      // if (position.value > END_POSITION / 2) {
      //   position.value = withTiming(END_POSITION, { duration: 100 });
      //   onLeft.value = false;
      // } else {
      //   position.value = withTiming(0, { duration: 100 });
      //   onLeft.value = true;
      // }
    });

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.container}>
        <Text>{todoItem?.title ? todoItem.title : ''}</Text>
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
}));
