import {
  Gesture,
  GestureStateChangeEvent,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import type { ITodo } from '@entities/todo';

export const useItemSwipeGesture = (
  todoId: string,
  onSwipeStart: (e: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void,
  onSwipeUpdate: (e: GestureUpdateEvent<PanGestureHandlerEventPayload>) => void,
  onSwipeEnd: (e: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void,
) => {
  return Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-10, 10])
    .onStart(e => {
      runOnJS(onSwipeStart)(e);
    })
    .onUpdate(e => {
      runOnJS(onSwipeUpdate)(e);
    })
    .onEnd(e => {
      runOnJS(onSwipeEnd)(e);
    });
};
