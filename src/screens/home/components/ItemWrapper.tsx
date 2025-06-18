import { StyleProp, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { Font } from '@styles/font';

type Props = {
  title: string;
  topChildren?: React.ReactNode;
  children: React.ReactNode;
  styleProp?: StyleProp<ViewStyle>;
};

const ItemWrapper = ({ title, children, topChildren, styleProp = {} }: Props) => {
  return (
    <View style={[styles.container, styleProp]}>
      <View style={styles.topWrapper}>
        <Text style={styles.title}>{title}</Text>
        {topChildren}
      </View>
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
  topWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    ...Font.bodyLargeExtraBold,
    color: theme.colors.text.primary,
  },
}));
