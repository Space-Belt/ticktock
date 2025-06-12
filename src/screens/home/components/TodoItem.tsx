import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { Font } from '@styles/font';

type Props = {
  id: string;
  title: string;
  completed: boolean;
  handleTodoClicked: (id: string) => void;
};

const TodoItem = ({ id, title, completed, handleTodoClicked }: Props) => {
  return (
    <Pressable
      onPress={() => {
        handleTodoClicked(id);
      }}
      style={styles.container}>
      <Text style={styles.titleStyle(completed)}>{title}</Text>
    </Pressable>
  );
};

export default TodoItem;

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  titleStyle: (completed: boolean) => ({
    ...Font.bodySmallBold,
    textDecorationLine: completed ? 'line-through' : 'none',
  }),
}));
