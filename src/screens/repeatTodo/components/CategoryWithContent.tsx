import { Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';

type Props = {
  child: React.ReactNode;
};

const CategoryWithContent = ({ child }: Props) => {
  return (
    <View style={styles.container}>
      <Text>CategoryWithContent</Text>
      {child}
    </View>
  );
};

export default CategoryWithContent;

const styles = StyleSheet.create(theme => ({
  container: {
    gap: 8,
  },
}));
