import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';

type Props = {
  selectStringDataObject?: {
    mappingData: { name: string; value: string }[];
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
  };
  selectNumberDataObject?: {
    mappingData: { name: string; value: number }[];
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
  };
  secondChild?: React.ReactNode;
};

const DayAndRepeatPicker = ({
  selectStringDataObject,
  selectNumberDataObject,
  secondChild,
}: Props) => {
  const basicData = selectNumberDataObject
    ? selectNumberDataObject.mappingData
    : selectStringDataObject && selectStringDataObject.mappingData;

  const value = selectNumberDataObject
    ? selectNumberDataObject.value
    : selectStringDataObject && selectStringDataObject.value;

  return (
    <View style={styles.basicTodoWrapper}>
      {basicData?.map((mappedEl, basicIndex) => (
        <Pressable
          key={mappedEl.value}
          onPress={() => {
            if (selectStringDataObject) {
              if (selectStringDataObject.value === mappedEl.value) {
                selectStringDataObject.setValue('');
              } else {
                selectStringDataObject.setValue(mappedEl.value as string);
              }
            } else if (selectNumberDataObject) {
              if (selectNumberDataObject.value === mappedEl.value) {
                selectNumberDataObject.setValue(-1);
              } else {
                selectNumberDataObject.setValue(mappedEl.value as number);
              }
            }
          }}
          style={styles.basicTodoElement(
            value === ((mappedEl.value as string) || (mappedEl.value as number)),
          )}>
          <Text>{mappedEl.name}</Text>
        </Pressable>
      ))}
      {secondChild && secondChild}
    </View>
  );
};

export default DayAndRepeatPicker;

const styles = StyleSheet.create(theme => ({
  basicTodoWrapper: {
    flexDirection: 'row',
  },
  basicTodoElement: (isSelected: boolean) => ({
    width: 55,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    backgroundColor: isSelected
      ? theme.colors.background.secondary
      : theme.colors.background.overlay,
    marginBottom: 16,
  }),
}));
