import { Font } from '@styles/font';
import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type InputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  textSubChildren?: React.ReactNode;
  errorMessage?: string;
};

const TickTockTextInput: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  textSubChildren,
  errorMessage,
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.titleSection}>
        <Text style={styles.label}>{label}</Text>
        {textSubChildren && textSubChildren}
      </View>
      <TextInput
        style={[styles.input, errorMessage ? styles.inputError : null]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={true}
        textAlignVertical="top"
        placeholderTextColor="#888"
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  inputContainer: {
    marginBottom: 20,
    // paddingHorizontal: 10,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    ...Font.bodySmallExtraBold,
    color: theme.colors.text.primary,
    paddingLeft: 5,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 10,
    ...Font.bodySmallExtraBold,
    color: '#333',
    backgroundColor: theme.colors.textInput.primary,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
}));

export default TickTockTextInput;
