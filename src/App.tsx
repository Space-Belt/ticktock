import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-unistyles';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@utils/reactQuery';
import RootStackNavigator from '@navigations/RootStackNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <QueryClientProvider client={queryClient}>
          <RootStackNavigator />
        </QueryClientProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create(theme => ({
  top: {
    backgroundColor: 'skyblue',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    fontSize: 50,
    color: 'blue',
    fontWeight: 'bold',
  },
}));

export default App;
