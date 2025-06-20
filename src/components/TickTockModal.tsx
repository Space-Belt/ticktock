import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@utils/public';
import { useModal } from '@stores/zustand/modal';
import { Font } from '@styles/font';
import TickTockButton from './TickTockButton';

type Props = {};

const TickTockModal = (props: Props) => {
  const translateY = useSharedValue(-(SCREEN_HEIGHT + 100));
  const opacity = useSharedValue(0);

  const modalState = useModal(state => state.modalState);
  const removeModal = useModal(state => state.removeModal);

  const handleOutsideClick = () => {
    removeModal();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });
  const onModalContentPress = (e: GestureResponderEvent) => {
    e.stopPropagation(); // 내부 클릭 이벤트 전파를 막음
  };

  React.useEffect(() => {
    if (modalState.isVisible) {
      translateY.value = withTiming(0, { duration: 100, easing: Easing.out(Easing.ease) });
      opacity.value = withTiming(1, { duration: 1500, easing: Easing.out(Easing.ease) });
    } else {
      opacity.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.ease) });
      setTimeout(() => {
        translateY.value = withTiming(-(SCREEN_HEIGHT + 100), {
          duration: 1500,
          easing: Easing.out(Easing.ease),
        });
      }, 1000);
    }
  }, [modalState.isVisible]);

  return (
    <TouchableWithoutFeedback onPress={handleOutsideClick}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <View
          style={styles.modalWrapper}
          onStartShouldSetResponder={() => true} // 모달 내용이 클릭되었을 때만 터치 이벤트가 발생
          onResponderStart={onModalContentPress} // 모달 내용 클릭 시 이벤트 전파 막기
        >
          {modalState.title && <Text style={styles.titleStyle}>{modalState.title}</Text>}
          {modalState.content && <Text style={styles.contentStyle}>{modalState.content}</Text>}
          {modalState.children && modalState.children}
          <View style={styles.buttonContainer}>
            {modalState.cancelText && (
              <TickTockButton onPress={() => {}} title={modalState.cancelText} />
            )}
            {modalState.confirmText && (
              <TickTockButton
                onPress={() => {}}
                buttonColor="primary"
                title={modalState.confirmText}
              />
            )}
          </View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default TickTockModal;

const styles = StyleSheet.create(theme => ({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 모달 배경
  },
  modalWrapper: {
    backgroundColor: theme.colors.background.primary,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 8,
    width: SCREEN_WIDTH - 32,
  },
  titleStyle: {
    ...Font.headerMediumBold,
  },
  contentStyle: {
    ...Font.bodySmallBold,
    marginTop: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 16,
  },
}));
