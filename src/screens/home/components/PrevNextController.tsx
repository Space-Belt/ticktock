import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';

import LeftIcon from '@assets/images/icon_chevron_left.svg';
import RightIcon from '@assets/images/icon_chevron_right.svg';

type Props = {
  handleClicked: (type: 'prev' | 'next') => void;
  gap: number;
  text?: string;
};

const PrevNextController = ({ handleClicked, gap, text }: Props) => {
  return (
    <View style={styles.container(gap)}>
      <Pressable onPress={() => handleClicked('prev')}>
        <LeftIcon style={styles.iconStyle} />
      </Pressable>
      {text && <Text>{text}</Text>}
      <Pressable onPress={() => handleClicked('next')}>
        <RightIcon style={styles.iconStyle} />
      </Pressable>
    </View>
  );
};

export default PrevNextController;

const styles = StyleSheet.create(theme => ({
  container: (gap: number) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap,
  }),
  iconStyle: {
    color: theme.colors.text.primary,
  },
}));
