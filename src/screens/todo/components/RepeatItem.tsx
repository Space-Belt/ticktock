import { Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { ITodo } from '@entities/todo';

type Props = {
  repeatItem: ITodo;
};

const RepeatItem = ({ repeatItem }: Props) => {
  return (
    <View>
      <Text>RepeatItem</Text>
    </View>
  );
};

export default RepeatItem;

const styles = StyleSheet.create(theme => ({}));
