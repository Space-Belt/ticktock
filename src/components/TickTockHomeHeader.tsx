import { Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';

import Logo from '@assets/images/icon_ticktock_logo.svg';

type Props = {};

const TickTockHomeHeader = (props: Props) => {
  return (
    <View style={styles.container}>
      <Logo width={37} height={36} />
    </View>
  );
};

export default TickTockHomeHeader;

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));
