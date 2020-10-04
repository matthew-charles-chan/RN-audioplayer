import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Controller({ onNext, onPrv }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrv}>
        <MaterialIcons name="skip-previous" size={50} />
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialIcons name="pause" size={50} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onNext}>
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
