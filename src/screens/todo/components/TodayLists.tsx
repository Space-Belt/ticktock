import { ScrollView, Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { TODAY_TODOS } from '@utils/mock';
import TodoItem from './TodoItem';

type Props = {};

const TodayLists = (props: Props) => {
  return (
    // <ScrollView style={styles.container}>
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1, paddingVertical: 8 }}>
      {TODAY_TODOS.map((todoEl, todoIndex) => (
        <TodoItem key={todoEl.id} todoItem={todoEl} />
      ))}
    </ScrollView>
  );
};

export default TodayLists;

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
  },
}));
