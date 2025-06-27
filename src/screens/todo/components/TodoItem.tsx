import { Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

type Props = {};

const TodoItem = (props: Props) => {
  const panGesture = Gesture.Pan()
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
      <Text>TodoListScreen</Text>
    </GestureDetector>
  );
};

export default TodoItem;

const styles = StyleSheet.create({});
