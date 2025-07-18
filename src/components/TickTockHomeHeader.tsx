import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import AddIcon from '@assets/images/icon_add_circle.svg';
import Logo from '@assets/images/icon_ticktock_logo.svg';
import { LoggedInStackNavigationProp } from '@navigations/loggedIn/LoggedInStackNavigator';

const TickTockHomeHeader = () => {
  const navigation = useNavigation<LoggedInStackNavigationProp>();
  const handleAddTodoBtn = () => {
    navigation.navigate('MainStack', { screen: 'AddTodo' });
  };
  return (
    <View style={styles.container}>
      <Logo width={37} height={36} />
      <Pressable onPress={handleAddTodoBtn}>
        <AddIcon width={30} height={30} style={styles.iconStyle} />
      </Pressable>
    </View>
  );
};

export default TickTockHomeHeader;

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
