import { REPEAT_TODOS } from '@utils/mock';
import React, { useState } from 'react';
import { Pressable, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import RepeatItem from './RepeatItem';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigatorProp } from '@navigations/loggedIn/main/MainStackNavigator';
import { LoggedInStackNavigationProp } from '@navigations/loggedIn/LoggedInStackNavigator';
import { ITodo } from '@entities/todo';

type Props = {};

const RepeatLists = (props: Props) => {
  const navigation = useNavigation<LoggedInStackNavigationProp>();

  const [repeatList, setRepeatList] = useState<ITodo[]>([...REPEAT_TODOS]);

  const handleDelete = (id: string) => {
    const updatedTodos = repeatList.filter(todo => todo.id !== id);
    setRepeatList(updatedTodos);
  };

  const handleNavigation = (params: ITodo) => {
    navigation.navigate('MainStack', {
      screen: 'RepeatTodo',
      params: params,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {repeatList.map((todoEl, todoIndex) => (
        <Pressable
          key={todoEl.id}
          onPress={() => {
            handleNavigation(todoEl);
          }}>
          <RepeatItem key={todoEl.id} onDelete={handleDelete} repeatItem={todoEl} />
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default RepeatLists;

const styles = StyleSheet.create(theme => ({
  container: {},
}));
