import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

const App = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.top}>
        <Text>sdfsdfsf</Text>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  top: {
    marginTop: 100,
  },
});

export default App;
