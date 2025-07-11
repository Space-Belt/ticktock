import { Animated, Pressable, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { ITodo } from '@entities/todo';
import {
  GestureDetector,
  GestureStateChangeEvent,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

import {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Font } from '@styles/font';
import { SCREEN_WIDTH } from '@utils/public';

import DeleteIcon from '@assets/images/icon_delete.svg';
import EditIcon from '@assets/images/icon_edit.svg';
import { useItemSwipeGesture } from '../hook/useTodoItemGuesture';

type Props = {
  repeatItem: ITodo;
  onDelete: (id: string) => void;
};

const ACTION_WIDTH = 160;

const RepeatItem = ({ repeatItem, onDelete }: Props) => {
  const completedProgress = useSharedValue(0);
  const translateX = useSharedValue(0);
  const tempTranslateX = useSharedValue(0);

  const deleteAnim = useSharedValue(ACTION_WIDTH / 2);

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
  const panGesture = useItemSwipeGesture(repeatItem.id, onSwipeStart, onSwipeUpdate, onSwipeEnd);

  const animatedStyle = useAnimatedStyle(() => {
    const bg = interpolateColor(completedProgress.value, [0, 1], ['transparent', '#C8E6C9']);
    return { backgroundColor: bg };
  });

  const moveAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handleDelete = () => {
    deleteAnim.value = withTiming(SCREEN_WIDTH, { duration: 200 }, () => {
      runOnJS(onDelete)(repeatItem.id);
    });
  };

  const deleteAnimStyle = useAnimatedStyle(() => ({
    width: deleteAnim.value,
  }));

  const actionStyle = useAnimatedStyle(() => ({
    width: translateX.value < 0 ? -translateX.value : 0,
  }));
  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.wrapper}>
        <Animated.View style={[styles.container, animatedStyle, moveAnimatedStyle]}>
          <View style={styles.titleWrapper}>
            <Text style={styles.titleText}>{repeatItem?.title ? repeatItem.title : ''}</Text>
          </View>
        </Animated.View>
        <Animated.View style={[styles.actions, actionStyle]}>
          <Pressable style={[styles.actionButton, styles.editWrapper]}>
            <EditIcon width={24} height={24} />
          </Pressable>
          <Animated.View style={[styles.actionButton, deleteAnimStyle, styles.deleteWrapper]}>
            <Pressable
              onPress={handleDelete}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
              <DeleteIcon width={24} height={24} />
            </Pressable>
          </Animated.View>
        </Animated.View>
      </View>
    </GestureDetector>
  );
};

export default RepeatItem;

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
    backgroundColor: 'red',
  },
  editWrapper: {
    backgroundColor: 'skyblue',
  },
  actions: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden', // 너비 외부 잘라내기
  },
  actionButton: {
    width: ACTION_WIDTH / 2,

    alignItems: 'center',
    justifyContent: 'center',
  },
}));
