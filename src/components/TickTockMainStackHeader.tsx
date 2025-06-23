import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { LoggedInStackNavigationProp } from '@navigations/loggedIn/LoggedInStackNavigator';

import BackIcon from '@assets/images/icon_chevron_left.svg';

type Props = {
  handleNavigation: () => void;
};

const TickTockMainStackHeader = ({ handleNavigation }: Props) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={handleNavigation}>
        <BackIcon width={30} height={30} style={styles.iconStyle} />
      </Pressable>
    </View>
  );
};

export default TickTockMainStackHeader;

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    marginBottom: 16,
  },
  iconStyle: {
    color: theme.colors.text.primary,
  },
}));
