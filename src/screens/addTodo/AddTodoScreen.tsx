import { Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import TickTockMainStackHeader from '@components/TickTockMainStackHeader';
import { useNavigation } from '@react-navigation/native';
import { LoggedInStackNavigationProp } from '@navigations/loggedIn/LoggedInStackNavigator';

const AddTodoScreen = () => {
  const navigation = useNavigation<LoggedInStackNavigationProp>();
  const handleBackNavigtion = () => {
    navigation.goBack();
  };
  return (
    <View>
      <TickTockMainStackHeader handleNavigation={handleBackNavigtion} />
    </View>
  );
};

export default AddTodoScreen;

const styles = StyleSheet.create(theme => ({}));
