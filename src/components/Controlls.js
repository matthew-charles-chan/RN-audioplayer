import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Controller({ skip, prev, playbackState, pause, play }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={prev}>
        <MaterialIcons name="skip-previous" size={50} />
      </TouchableOpacity>
      <TouchableOpacity>
        {playbackState === 'playing' ? (
          <MaterialIcons name="pause" size={50} onPress={pause} />
        ) : (
          <MaterialIcons name="play-arrow" size={50} onPress={play} />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={skip}>
        <MaterialIcons name="skip-next" size={50} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
