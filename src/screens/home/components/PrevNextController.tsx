import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';

import LeftIcon from '@assets/images/icon_chevron_left.svg';
import RightIcon from '@assets/images/icon_chevron_right.svg';

type Props = {
  handlePrevClicked: () => void;
  handleNextClicked: () => void;
  gap?: number;
  text?: string;
  width?: number;
};

const PrevNextController = ({ handlePrevClicked, handleNextClicked, gap, text, width }: Props) => {
  return (
    <View style={styles.container(gap, width)}>
      <Pressable onPress={handlePrevClicked}>
        <LeftIcon style={styles.iconStyle} />
      </Pressable>
      {text && <Text style={styles.textStyle}>{text}</Text>}
      <Pressable onPress={handleNextClicked}>
        <RightIcon style={styles.iconStyle} />
      </Pressable>
    </View>
  );
};

export default PrevNextController;

const styles = StyleSheet.create(theme => ({
  container: (gap?: number, width?: number) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap,
    width,
  }),
  iconStyle: {
    color: theme.colors.text.primary,
  },
  textStyle: {
    width: 100,
    textAlign: 'center',
  },
}));
