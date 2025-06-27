import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { Font } from '@styles/font';
import { TODO_COLORS } from '@entities/todo';

type Props = {
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
};

const SelectColor = ({ selectedColor, setSelectedColor }: Props) => {
  return (
    <View>
      <View style={styles.colorWrapper}>
        <Text style={styles.categoryStyle}>색상 선택</Text>
        <Pressable style={styles.selectedColorStyle(selectedColor)} />
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
    color: color,
  }),
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
