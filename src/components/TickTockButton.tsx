import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  width?: number;
  height?: number;
  buttonColor?: string;
  textColor?: string;
};

const TickTockButton = ({
  title,
  onPress,
  disabled = false,
  width = 150,
  height = 45,
  buttonColor,
  textColor,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button(disabled, width, height, buttonColor)]}>
      <Text style={[styles.buttonText(textColor)]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TickTockButton;

const styles = StyleSheet.create(theme => ({
  button: (disabled: boolean, width: number, height: number, buttonColor?: string) => ({
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    backgroundColor: disabled ? '#ccc' : buttonColor || theme.colors.button.primary,
    width: width,
    height: height,
  }),

  buttonText: (textColor?: string) => ({
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: textColor ? textColor : theme.colors.text.secondary,
  }),
}));
