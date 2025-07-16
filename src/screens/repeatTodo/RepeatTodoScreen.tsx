import EditIcon from '@assets/images/icon_edit.svg';
import { ITodo } from '@entities/todo';
import { LoggedInStackNavigationProp } from '@navigations/loggedIn/LoggedInStackNavigator';
import { useNavigation, useRoute } from '@react-navigation/native';
import TodoListHeader from '@screens/todo/components/TodoListHeader';
import React from 'react';
import { Pressable, useColorScheme, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type Props = {};

const RepeatTodoScreen = (props: Props) => {
  const navigation = useNavigation<LoggedInStackNavigationProp>();

  const colorScheme = useColorScheme();
  const iconColor = colorScheme === 'dark' ? 'white' : 'black';

  const route = useRoute();
  const todo = route.params as ITodo;

  const handleNavigation = (params: ITodo) => {
    if (todo) {
      navigation.navigate('MainStack', { screen: 'AddTodo', params: params });
    }
  };
  return (
    <View>
      <TodoListHeader
        handleNavigation={() => navigation.goBack()}
        children={
          <Pressable
            onPress={() => {
              handleNavigation(todo);
            }}>
            <EditIcon fill={iconColor} />
          </Pressable>
        }
      />
    </View>
  );
};

export default RepeatTodoScreen;

const styles = StyleSheet.create(theme => ({}));
