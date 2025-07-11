import { ScrollView, Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { REPEAT_TODOS, TODAY_TODOS } from '@utils/mock';
import TodoItem from './TodoItem';
import RepeatItem from './RepeatItem';

type Props = {};

const RepeatLists = (props: Props) => {
  return (
    <ScrollView style={styles.container}>
      {REPEAT_TODOS.map((todoEl, todoIndex) => (
        <RepeatItem key={todoEl.id} repeatItem={todoEl} />
      ))}
    </ScrollView>
  );
};

export default RepeatLists;

const styles = StyleSheet.create(theme => ({
  container: {
    // flex: 1,
  },
}));
