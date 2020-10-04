import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import episodes from './src/data';
import TrackPlayer, {
  getState,
  usePlaybackState,
} from 'react-native-track-player';

import EpisodesList from './src/components/EpisodesList';
import Controlls from './src/components/Controlls';

export default function App() {
  const [episodeIdx, setEpisodeIdx] = useState('');

  const findIndex = (id, array) => {
    return array.findIndex((el) => {
      return el.id === id;
    });
  };

  const setEpisodeIdxToCurrrent = () => {
    TrackPlayer.getCurrentTrack()
      .then((id) => {
        return findIndex(id, episodes);
      })
      .then((idx) => {
        setEpisodeIdx(idx);
      });
  };

  const playbackState = usePlaybackState();
  // on first render, initiallize TrackPlayer and add episodes to player
  useEffect(() => {
    TrackPlayer.setupPlayer().then(async () => {
      // The player is ready to be used
      console.log('Player ready');
      console.log(episodes);
      // add the array of episodes
      await TrackPlayer.reset();
      await TrackPlayer.add([...episodes]);

      TrackPlayer.play();
      setEpisodeIdxToCurrrent();

      getState().then((res) => console.log(res));

      //add listener on track change
    });
  }, []);

  // setEpisodeIndex(findIndex)

  const skipTrack = () => {
    console.log(episodeIdx);
    TrackPlayer.skipToNext();
    setEpisodeIdxToCurrrent();

    // console.log(findIndex());
    // await TrackPlayer.play();
  };

  const prevTack = async () => {
    console.log(episodeIdx);
    await TrackPlayer.skipToPrevious();
    setEpisodeIdxToCurrrent();
    // await TrackPlayer.play();
  };

  const pause = async () => {
    await TrackPlayer.pause();
  };

  const play = async () => {
    await TrackPlayer.play();
  };

  const selectEpisode = async (id) => {
    // console.log(id);
    await TrackPlayer.skip(id);
  };

  return (
    <View style={styles.container}>
      <EpisodesList playEpisode={selectEpisode} episodes={episodes} />
      <View>
        <Text style={styles.title}>{episodes[0].title}</Text>
        <Text style={styles.artist}>{episodes[0].artist}</Text>
      </View>
      <Controlls
        skip={skipTrack}
        prev={prevTack}
        pause={pause}
        play={play}
        playbackState={playbackState}
      />
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 50,
    paddingBottom: 50,
  },
});
