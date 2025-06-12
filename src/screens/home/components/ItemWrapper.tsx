import { Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { Font } from '@styles/font';

type Props = {
  title: string;
  children: React.ReactNode;
};

const ItemWrapper = ({ title, children }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

export default ItemWrapper;

const styles = StyleSheet.create(theme => ({
  container: {
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border.primary,
    borderRadius: 8,
  },
  title: {
    ...Font.bodyLargeExtraBold,
    color: theme.colors.text.primary,
    marginBottom: 16,
  },
}));
