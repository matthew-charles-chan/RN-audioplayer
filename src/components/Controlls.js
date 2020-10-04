import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

export default function Controller({ skip, prev, playbackState, pause, play }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={prev}>
        <Ionicons name="ios-skip-backward" size={50} />
      </TouchableOpacity>
      <TouchableOpacity>
        {playbackState === 'playing' ? (
          <Ionicons name="ios-pause" size={50} onPress={pause} />
        ) : (
          <Ionicons name="ios-play" size={50} onPress={play} />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={skip}>
        <Ionicons name="ios-skip-forward" size={50} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'space-around',
    height: '10%',
    width: '80%',
  },
  icons: {
    color: '#F76C6C',
  },
});
