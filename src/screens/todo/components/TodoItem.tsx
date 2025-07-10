import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import {
  GestureDetector,
  GestureStateChangeEvent,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import { ITodo } from '@entities/todo';
import { Font } from '@styles/font';
import { useItemSwipeGesture } from '../hook/useTodoItemGuesture';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import UnCheckedIcon from '@assets/images/icon_unchecked.svg';
import CheckedIcon from '@assets/images/icon_checked.svg';
import DeleteIcon from '@assets/images/icon_delete.svg';
import EditIcon from '@assets/images/icon_edit.svg';

import { SCREEN_WIDTH } from '@utils/public';

type Props = {
  todoItem: ITodo;
};

const ACTION_WIDTH = 160;

const TodoItem = ({ todoItem }: Props) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(todoItem.completed);

  const completedProgress = useSharedValue(isCompleted ? 1 : 0);
  const translateX = useSharedValue(0);
  const tempTranslateX = useSharedValue(0);

  const onSwipeStart = (e: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
    tempTranslateX.value = translateX.value;
  };

  const onSwipeUpdate = (e: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
    const next = tempTranslateX.value + e.translationX;
    translateX.value = Math.min(Math.max(next, -ACTION_WIDTH), 0);
  };
  const onSwipeEnd = (_: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
    if (translateX.value < -ACTION_WIDTH / 2) {
      translateX.value = withTiming(-ACTION_WIDTH - 20, { duration: 100 }, () => {
        translateX.value = withSpring(-ACTION_WIDTH, { damping: 12 });
      });
    } else {
      translateX.value = withSpring(0);
    }
  };

  const panGesture = useItemSwipeGesture(todoItem.id, onSwipeStart, onSwipeUpdate, onSwipeEnd);

  const isType =
    todoItem.goalStartDate && todoItem.goalEndDate ? 'goal' : todoItem.repeat ? 'repeat' : 'todo';

  const isTypeTitle = isType === 'goal' ? '목표' : isType === 'repeat' ? '반복' : '할 일';

  const animatedStyle = useAnimatedStyle(() => {
    const bg = interpolateColor(completedProgress.value, [0, 1], ['transparent', '#C8E6C9']);
    return { backgroundColor: bg };
  });

  const moveAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const deleteStyle = useAnimatedStyle(() => ({
    width: translateX.value < 0 ? -translateX.value + 15 : 0,
  }));

  const actionStyle = useAnimatedStyle(() => ({
    width: translateX.value < 0 ? -translateX.value : 0,
  }));

  useEffect(() => {
    completedProgress.value = withTiming(isCompleted ? 1 : 0, { duration: 300 });
  }, [isCompleted]);

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.wrapper}>
        <Animated.View style={[styles.container, animatedStyle, moveAnimatedStyle]}>
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
        <Animated.View style={[styles.actions, actionStyle]}>
          <Pressable style={styles.actionButton}>
            <EditIcon width={24} height={24} />
          </Pressable>
          <Pressable style={styles.actionButton}>
            <DeleteIcon width={24} height={24} />
          </Pressable>
        </Animated.View>
        {/* <Animated.View style={[styles.deleteWrapper, deleteStyle]}>
          <Pressable style={[styles.actionButton]}>
            <EditIcon width={24} height={24} />
          </Pressable>
          <Pressable style={styles.actionButton}>
            <DeleteIcon width={30} height={30} />
          </Pressable>
        </Animated.View> */}
      </View>
    </GestureDetector>
  );
};

export default TodoItem;

const styles = StyleSheet.create(theme => ({
  wrapper: {
    position: 'relative',
    marginBottom: 2,
  },
  container: {
    marginBottom: 2,
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
  deleteWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden', // 너비 외부 잘라내기
  },
  actionButton: {
    width: ACTION_WIDTH / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
