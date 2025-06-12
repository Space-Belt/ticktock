import { Font } from '@styles/font';
import { SCREEN_WIDTH } from '@utils/public';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import CheckIcon from '@assets/images/icon_checked.svg';
import UnCheckIcon from '@assets/images/icon_unchecked.svg';

type Props = {
  id: string;
  title: string;
  completed: boolean;
  handleTodoClicked: (id: string, callBack: () => void) => void;
};

const TodoItem = ({ id, title, completed, handleTodoClicked }: Props) => {
  const checkWidth = useSharedValue(0);

  const checkStyle = useAnimatedStyle(() => {
    const shadowIntensity = checkWidth.value > 0 ? 0.5 : 0;
    return {
      width: checkWidth.value,
      height: checkWidth.value > 0 ? 1 : 0,
      borderWidth: checkWidth.value > 0 ? 0.75 : 0,

      shadowColor: 'black',
      shadowOpacity: shadowIntensity,
      shadowRadius: checkWidth.value > 0 ? 4 : 0,
      shadowOffset: { width: 0, height: checkWidth.value > 0 ? 2 : 0 },

      elevation: checkWidth.value > 0 ? 5 : 0,
    };
  });

  const handleCheckWidth = () => {
    if (checkWidth.value > 0) {
      checkWidth.value = withTiming(0, { duration: 500 });
    } else {
      checkWidth.value = withTiming(SCREEN_WIDTH - 54, { duration: 500 });
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        handleTodoClicked(id, handleCheckWidth);
      }}
      style={styles.container}>
      {
        completed ? <CheckIcon /> : <UnCheckIcon />
        // ÷<View style={styles.checkBox} />
      }
      <Animated.View style={[styles.basicCheckStyle, checkStyle]} />
      <Text style={styles.titleStyle(completed)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TodoItem;

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 10,
  },
  titleStyle: (completed: boolean) => ({
    ...Font.bodySmallBold,
  }),
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.border.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  basicCheckStyle: {
    position: 'absolute',
    top: '50%',
    marginTop: 6,
    width: 0,
    height: 0,
    left: -5,
    borderColor: theme.colors.text.primary,
  },
}));
