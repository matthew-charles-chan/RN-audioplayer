import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

// import episodes from '../data';

export default function EpisodeList({ playEpisode, episodes }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={episodes}
        keyExtractor={(item, index) => item.id}
        renderItem={(itemData) => (
          <>
            <View style={styles.episode}>
              <Text style={styles.title}>{itemData.item.title}</Text>
              <TouchableOpacity onPress={() => playEpisode(itemData.item.id)}>
                <Ionicons style={styles.icon} name="md-play" />
              </TouchableOpacity>
            </View>
          </>
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
  },
  icon: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
  },
  episode: {
    backgroundColor: '#F76C6C',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'black',
    borderRadius: 30,
    marginVertical: 2,
    width: 300,
    padding: 10,
  },
});
