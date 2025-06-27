import { ScrollView, Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import TodoItem from './components/TodoItem';

type Props = {};

const TodoListScreen = (props: Props) => {
  const panGestureEvent = Gesture.Pan()
    .onStart(() => {})
    .onUpdate(event => {
      console.log(event);
    })
    .onEnd(event => {});
  return (
    <ScrollView>
      <TodoItem />
    </ScrollView>
  );
};

export default TodoListScreen;

const styles = StyleSheet.create(theme => ({}));
