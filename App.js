import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Main from './src/components/Main';

export default function App() {
  return (
    <View style={styles.container}>
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
