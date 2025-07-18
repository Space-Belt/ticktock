import { Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { Font } from '@styles/font';

type Props = {
  child: React.ReactNode;
  title: string;
};

const CategoryWithContent = ({ child, title }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.categoryText}>{title}</Text>
      {child}
    </View>
  );
};

export default CategoryWithContent;

const styles = StyleSheet.create(theme => ({
  container: {
    gap: 8,
    marginBottom: 12,
  },
  categoryText: {
    ...Font.bodyLargeExtraBold,
    color: theme.colors.text.primary,
  },
}));
