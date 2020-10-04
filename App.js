import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import episodes from './src/data';
import TrackPlayer from 'react-native-track-player';

import Controlls from './src/components/Controlls';

export default function App() {
  useEffect(() => {
    TrackPlayer.setupPlayer().then(async () => {
      // The player is ready to be used
      console.log('Player ready');
      console.log(episodes);
      // add the array of songs in the playlist
      await TrackPlayer.reset();
      await TrackPlayer.add(episodes[1]);
      TrackPlayer.play();

      //add listener on track change
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Controlls />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
