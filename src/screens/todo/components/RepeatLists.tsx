import { REPEAT_TODOS } from '@utils/mock';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import RepeatItem from './RepeatItem';

type Props = {};

const RepeatLists = (props: Props) => {
  const [repeatList, setRepeatList] = useState<ITodo[]>([...REPEAT_TODOS]);

  const handleDelete = (id: string) => {
    const updatedTodos = repeatList.filter(todo => todo.id !== id);
    setRepeatList(updatedTodos);
  };

  return (
    <ScrollView style={styles.container}>
      {repeatList.map((todoEl, todoIndex) => (
        <RepeatItem key={todoEl.id} onDelete={handleDelete} repeatItem={todoEl} />
      ))}
    </ScrollView>
  );
};

export default RepeatLists;

const styles = StyleSheet.create(theme => ({
  container: {},
}));
