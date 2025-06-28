import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { Font } from '@styles/font';
import { TODO_COLORS } from '@entities/todo';

type Props = {
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  0;
  setColorPicker: React.Dispatch<React.SetStateAction<boolean>>;
};

const SelectColor = ({ selectedColor, setSelectedColor, setColorPicker }: Props) => {
  return (
    <View>
      <View style={styles.colorWrapper}>
        <Text style={styles.categoryStyle}>색상 선택</Text>
        <Pressable
          onPress={() => setColorPicker(prev => !prev)}
          style={styles.selectedColorWrapper}>
          <Text style={styles.customTextStyle}>직접 선택</Text>
          <View style={styles.selectedColorStyle(selectedColor)} />
        </Pressable>
      </View>
      <View style={styles.colorWrapper}>
        {TODO_COLORS.map(colorEl => (
          <Pressable
            key={colorEl}
            style={styles.colorsStyle(colorEl, colorEl === selectedColor)}
            onPress={() => setSelectedColor(colorEl)}
          />
        ))}
      </View>
    </View>
  );
};

export default SelectColor;

const styles = StyleSheet.create({
  categoryStyle: {
    ...Font.bodyMediumBold,
  },
  selectedColorStyle: (color: string) => ({
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: color,
  }),
  selectedColorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customTextStyle: {
    ...Font.bodySmallBold,
    marginRight: 8,
  },
  colorsStyle: (color: string, selected: boolean) => ({
    backgroundColor: color,
    width: 35,
    height: 35,
    borderRadius: 17.5,
    borderWidth: selected ? 2 : 0,
  }),
  colorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});
