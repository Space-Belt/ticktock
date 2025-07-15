import { ITodo } from '@entities/todo';
import React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import {
  GestureDetector,
  GestureStateChangeEvent,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-unistyles';

import { Font } from '@styles/font';
import { SCREEN_WIDTH } from '@utils/public';
import {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import DeleteIcon from '@assets/images/icon_delete.svg';
import EditIcon from '@assets/images/icon_edit.svg';
import { getWeekdayInfo } from '@utils/dateUtil';
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
    // 스와이프 후, 삭제 액션이 보여지도록 함
    if (translateX.value < -ACTION_WIDTH / 2) {
      translateX.value = withTiming(-ACTION_WIDTH, { duration: 100 });
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

  // translateX에 따라서 액션 버튼이 보이도록 설정
  const actionStyle = useAnimatedStyle(() => ({
    width: translateX.value < 0 ? -translateX.value : 0,
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.wrapper}>
        <Animated.View style={[styles.container, animatedStyle, moveAnimatedStyle]}>
          <View>
            <View style={styles.dateWrapper}>
              {repeatItem?.repeatDays?.map((day, index) => (
                <Text key={day} style={styles.dateTextStyle(getWeekdayInfo(day).color)}>
                  {getWeekdayInfo(day).label}
                </Text>
              ))}
            </View>
            <View style={styles.titleWrapper}>
              <Text style={styles.titleText}>{repeatItem?.title ? repeatItem.title : ''}</Text>
            </View>
          </View>
        </Animated.View>
        {/* 액션 버튼은 translateX에 따라 보이도록 */}
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
  dateWrapper: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
  },
  dateTextStyle: (color: string) => ({
    width: 25,
    height: 25,
    textAlign: 'center',
    borderRadius: 15,
    backgroundColor: color,
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    lineHeight: 23,
  }),
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    ...Font.bodyMediumBold,
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
    right: -ACTION_WIDTH,
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
