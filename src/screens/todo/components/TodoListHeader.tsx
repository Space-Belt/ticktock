import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';

import BackIcon from '@assets/images/icon_chevron_left.svg';
import { Font } from '@styles/font';

type Props = {
  handleNavigation: () => void;
  title?: string;
  children?: React.ReactNode;
};

const TodoListHeader = ({ handleNavigation, title, children }: Props) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={handleNavigation}>
        <BackIcon width={30} height={30} style={styles.iconStyle} />
      </Pressable>
      <Text style={styles.titleStyle}>{title}</Text>
      <View>{children && children}</View>
    </View>
  );
};

export default TodoListHeader;

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  iconStyle: {
    color: theme.colors.text.primary,
  },
  titleStyle: {
    ...Font.bodyMediumBold,
  },
}));
