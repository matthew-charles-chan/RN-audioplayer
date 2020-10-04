import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import episodes from '../data';
import TrackPlayer, {
  getState,
  usePlaybackState,
} from 'react-native-track-player';

import EpisodesList from './EpisodesList';
import Controlls from './Controlls';
const { width, height } = Dimensions.get('window');

export default function Main() {
  const [episodeIdx, setEpisodeIdx] = useState(0);

  const findIndexOfEpisode = (id, array) => {
    return array.findIndex((el) => {
      return el.id === id;
    });
  };

  const setEpisodeIdxToCurrrent = () => {
    TrackPlayer.getCurrentTrack()
      .then((id) => {
        return findIndexOfEpisode(id, episodes);
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
      setEpisodeIdxToCurrrent();

      TrackPlayer.play();

      getState().then((res) => console.log(res));

      //add listener on track change
    });
  }, []);

  // setEpisodeIndex(findIndex)

  const skipTrack = async () => {
    // If current episode is not last in episodes arr, skip to next epidode,
    // else, skip to first episode in episodes array
    episodeIdx !== episodes.length - 1
      ? await TrackPlayer.skipToNext()
      : await TrackPlayer.skip(episodes[0].id);
    setEpisodeIdxToCurrrent();
    // TrackPlayer.play();
  };

  const prevTack = async () => {
    // if episode is not first epsiode (episodes[0]), skip to previous,
    // else, skip to last epsiode in array (epsiodes[episodes.length - 1])
    episodeIdx !== 0
      ? await TrackPlayer.skipToPrevious()
      : await TrackPlayer.skip(episodes[episodes.length - 1].id);
    // await TrackPlayer.skipToPrevious();
    setEpisodeIdxToCurrrent();
    // TrackPlayer.play();
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
    setEpisodeIdxToCurrrent();
  };

  return (
    <View style={styles.container}>
      <EpisodesList playEpisode={selectEpisode} episodes={episodes} />
      <View>
        <Text>{episodes[episodeIdx].title}</Text>
        <Text>{episodes[episodeIdx].artist}</Text>
      </View>
      <Controlls
        skip={skipTrack}
        prev={prevTack}
        pause={pause}
        play={play}
        playbackState={playbackState}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
    height: height,
    paddingTop: 40,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '600',
    // textTransform: 'capitalize',
    color: '#ffffff',
  },
  artist: {
    fontSize: 18,
    textAlign: 'center',
    color: '#ffffff',
    // textTransform: 'capitalize',
  },
});
