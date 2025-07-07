import { Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import type { ITodo } from '@entities/todo';

export const useItemSwipeGesture = (
  todoId: string,
  onSwipeStart: (id: string) => void,
  onSwipeUpdate: (id: string, dx: number) => void,
  onSwipeEnd: (id: string) => void,
) => {
  return Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-10, 10])
    .onStart(() => {
      runOnJS(onSwipeStart)(todoId);
    })
    .onUpdate(e => {
      runOnJS(onSwipeUpdate)(todoId, e.translationX);
    })
    .onEnd(() => {
      runOnJS(onSwipeEnd)(todoId);
    });
};
