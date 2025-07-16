import { Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { useRoute } from '@react-navigation/native';

type Props = {};

const RepeatTodoScreen = (props: Props) => {
  const route = useRoute();
  const { params } = route;
  console.log(params);
  return (
    <View>
      <Text>RepeatTodoScreen</Text>
    </View>
  );
};

export default RepeatTodoScreen;

const styles = StyleSheet.create(theme => ({}));
