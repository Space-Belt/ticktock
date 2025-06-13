import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';

import LeftIcon from '@assets/images/icon_chevron_left.svg';
import RightIcon from '@assets/images/icon_chevron_right.svg';

type Props = {
  handlePrevClicked: () => void;
  handleNextClicked: () => void;
  gap: number;
  text?: string;
};

const PrevNextController = ({ handlePrevClicked, handleNextClicked, gap, text }: Props) => {
  return (
    <View style={styles.container(gap)}>
      <Pressable onPress={handlePrevClicked}>
        <LeftIcon style={styles.iconStyle} />
      </Pressable>
      {text && <Text>{text}</Text>}
      <Pressable onPress={handleNextClicked}>
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
