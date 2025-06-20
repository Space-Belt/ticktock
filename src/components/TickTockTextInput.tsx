import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type InputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  errorMessage?: string;
};

const TickTockTextInput: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  errorMessage,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, errorMessage ? styles.inputError : null]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline
        textAlignVertical="top"
        placeholderTextColor="#888"
        numberOfLines={1}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  inputContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    minHeight: 40,
    maxHeight: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
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
