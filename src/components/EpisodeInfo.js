import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function EpisodeInfo({ title, artist, image }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      {/* This view is created to allow for text wrapping of title */}
      <View style={styles.textContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 20, flex: 1, flexWrap: 'wrap' }}>
            {title}
          </Text>
        </View>
        <Text style={{ fontSize: 15 }}>{artist}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 70,
    height: 70,
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 20,
    height: 'auto',
  },
});
