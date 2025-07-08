import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { GestureDetector } from 'react-native-gesture-handler';
import { ITodo } from '@entities/todo';
import { Font } from '@styles/font';
import { useItemSwipeGesture } from '../hook/useTodoItemGuesture';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import UnCheckedIcon from '@assets/images/icon_unchecked.svg';
import CheckedIcon from '@assets/images/icon_checked.svg';

type Props = {
  todoItem: ITodo;
};

const TodoItem = ({ todoItem }: Props) => {
  const completedProgress = useSharedValue(isCompleted ? 1 : 0);

  const [isCompleted, setIsCompleted] = useState<boolean>(todoItem.completed);

  const panGesture = useItemSwipeGesture(
    todoItem.id,
    id => {},
    (id, dx) => {},
    id => {},
  );

  const isType =
    todoItem.goalStartDate && todoItem.goalEndDate ? 'goal' : todoItem.repeat ? 'repeat' : 'todo';

  const isTypeTitle = isType === 'goal' ? '목표' : isType === 'repeat' ? '반복' : '할 일';

  const animatedStyle = useAnimatedStyle(() => {
    const bg = interpolateColor(completedProgress.value, [0, 1], ['transparent', '#C8E6C9']);
    return { backgroundColor: bg };
  });

  useEffect(() => {
    completedProgress.value = withTiming(isCompleted ? 1 : 0, { duration: 300 });
  }, [isCompleted]);

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={styles.titleWrapper}>
          <View style={styles.todoTypeStyle(isType)}>
            <Text style={styles.todoTypeText}>{isTypeTitle}</Text>
          </View>
          <Text style={styles.titleText}>{todoItem?.title ? todoItem.title : ''}</Text>
        </View>
        <View style={styles.bottomWrapper}>
          <View />
          <TouchableOpacity onPress={() => setIsCompleted(prev => !prev)}>
            {isCompleted ? (
              <CheckedIcon width={30} height={30} />
            ) : (
              <UnCheckedIcon width={30} height={30} />
            )}
          </TouchableOpacity>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default TodoItem;

const styles = StyleSheet.create(theme => ({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.primary,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    ...Font.bodyMediumBold,
  },
  todoTypeStyle: (type: string) => ({
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor:
      type === 'todo'
        ? theme.colors.background.accent
        : type === 'repeat'
        ? theme.colors.background.secondary
        : theme.colors.background.card,
  }),
  todoTypeText: {
    ...Font.bodySmallExtraBold,
  },
  bottomWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));
