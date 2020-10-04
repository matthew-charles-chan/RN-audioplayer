import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

export default function Controller({ skip, prev, playbackState, pause, play }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={prev}>
        <SimpleLineIcons name="control-start" size={30} />
      </TouchableOpacity>
      <TouchableOpacity>
        {playbackState === 'playing' ? (
          <SimpleLineIcons name="control-pause" size={40} onPress={pause} />
        ) : (
          <SimpleLineIcons name="control-play" size={40} onPress={play} />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={skip}>
        <SimpleLineIcons name="control-end" size={30} />
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
    width: '90%',
  },
});
