import { Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import TickTockToggleButton from '@components/TickTockToggleButton';
import { Font } from '@styles/font';

type Props = {
  title: string;
  toggleStatus: boolean;
  setToggleStatus: React.Dispatch<React.SetStateAction<boolean>>;
  callBack?: () => void;
};

const ToggleButton = ({ title, toggleStatus, setToggleStatus, callBack }: Props) => {
  const toggleButton = (
    setValue: React.Dispatch<React.SetStateAction<boolean>>,
    callBack?: () => void,
  ) => {
    setValue(prev => !prev);
    callBack && callBack();
  };

  return (
    <View style={styles.isRepeatWrapper}>
      <Text style={styles.categoryStyle}>{title}</Text>
      <TickTockToggleButton
        value={toggleStatus}
        onValueChange={() => toggleButton(setToggleStatus)}
      />
    </View>
  );
};

export default ToggleButton;

const styles = StyleSheet.create(theme => ({
  isRepeatWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryStyle: {
    ...Font.bodyMediumBold,
  },
}));
