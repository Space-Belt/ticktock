import React from 'react';
import { Animated, TouchableOpacity, ViewStyle } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

interface TickTockToggleButtonProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  style?: ViewStyle;
}

const TickTockToggleButton: React.FC<TickTockToggleButtonProps> = ({
  value,
  onValueChange,
  style,
}) => {
  const { theme } = useUnistyles();

  const [switchAnimation] = React.useState(new Animated.Value(value ? 1 : 0));

  React.useEffect(() => {
    Animated.timing(switchAnimation, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, switchAnimation]);

  const handlePress = () => {
    onValueChange(!value);
  };

  const backgroundColorInterpolation = switchAnimation.interpolate({
    inputRange: [-0.5, 1.5],
    outputRange: [theme.colors.border.primary, '#f5f'],
  });

  const translateXInterpolation = switchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-3, 28],
  });

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.container, style]} activeOpacity={0.8}>
      <Animated.View
        style={[styles.background, { backgroundColor: backgroundColorInterpolation }]}
      />
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ translateX: translateXInterpolation }],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    width: 52,
    height: 24,
    borderRadius: 15.5,
    justifyContent: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
    borderRadius: 15.5,
    position: 'absolute',
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 13.5,
    borderWidth: 1,
    borderColor: theme.colors.border.primary,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 4,
  },
}));

export default TickTockToggleButton;
