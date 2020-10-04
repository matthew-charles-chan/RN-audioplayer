import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

// import episodes from '../data';

export default function EpisodeList({ playEpisode, episodes }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={episodes}
        keyExtractor={(item, index) => item.id}
        renderItem={(itemData) => (
          <TouchableOpacity onPress={() => playEpisode(itemData.item.id)}>
            <View style={styles.todoItem}>
              <Text>{itemData.item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
    width: '100%',
  },
  todoItem: {
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 2,
    padding: 10,
  },
});
