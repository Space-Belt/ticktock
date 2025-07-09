import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';

import LeftIcon from '@assets/images/icon_chevron_left.svg';
import RightIcon from '@assets/images/icon_chevron_right.svg';
import { Font } from '@styles/font';

type Props = {
  handlePrevClicked: () => void;
  handleNextClicked: () => void;
  gap?: number;
  text?: string;
  width?: number;
  iconSize?: number;
  textSize?: number;
};

const PrevNextController = ({
  handlePrevClicked,
  handleNextClicked,
  gap,
  text,
  width,
  iconSize,
  textSize,
}: Props) => {
  return (
    <View style={styles.container(gap, width)}>
      <Pressable onPress={handlePrevClicked}>
        <LeftIcon
          width={iconSize ? iconSize : 24}
          height={iconSize ? iconSize : 24}
          style={styles.iconStyle}
        />
      </Pressable>
      {text && (
        <Text
          style={[
            styles.textStyle,
            {
              fontSize: textSize !== undefined ? textSize : 12,
              fontFamily:
                textSize !== undefined ? Font.bodySmallBold.fontFamily : Font.bodySmall.fontFamily,
            },
          ]}>
          {text}
        </Text>
      )}
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
    justifyContent: 'space-between',
    gap,
    width,
  }),
  iconStyle: {
    color: theme.colors.text.primary,
  },
  textStyle: (width?: number) => ({
    width: width ? 150 : 100,
    textAlign: 'center',
  }),
}));
