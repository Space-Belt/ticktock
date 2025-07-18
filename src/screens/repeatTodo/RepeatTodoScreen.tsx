import EditIcon from '@assets/images/icon_edit.svg';
import { ITodo } from '@entities/todo';
import { LoggedInStackNavigationProp } from '@navigations/loggedIn/LoggedInStackNavigator';
import { useNavigation, useRoute } from '@react-navigation/native';
import TodoListHeader from '@screens/todo/components/TodoListHeader';
import React from 'react';
import { Pressable, useColorScheme, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import CategoryWithContent from './components/CategoryWithContent';
import { Text } from 'react-native-gesture-handler';
import { Font } from '@styles/font';
import { getWeekdayInfo } from '@utils/dateUtil';

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

  console.log(todo);
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
      <View style={styles.wrapper}>
        <CategoryWithContent
          title={'할일'}
          child={
            <>
              <Text style={styles.titleText}>{todo.title}</Text>
            </>
          }
        />
        <CategoryWithContent
          title={'반복 요일'}
          child={
            <View style={styles.daysText}>
              {todo?.repeatDays?.map(el => (
                <Text style={styles.titleText(getWeekdayInfo(el).color)}>
                  {getWeekdayInfo(el).label}
                </Text>
              ))}
            </View>
          }
        />
      </View>
    </View>
  );
};

export default RepeatTodoScreen;

const styles = StyleSheet.create(theme => ({
  wrapper: {
    paddingHorizontal: 16,
  },
  titleText: (color: string) => ({
    backgroundColor: color,
    width: 30,
    height: 30,
    textAlign: 'center',
    borderRadius: 15,
    lineHeight: 30,
    overflow: 'hidden',
    ...Font.bodyMediumBold,
  }),
  daysText: {
    flexDirection: 'row',
    gap: 8,
  },
}));
