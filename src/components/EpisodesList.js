import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

// import episodes from '../data';

export default function EpisodeList({ playEpisode, episodes }) {
  return (
    <View>
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60%',
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
