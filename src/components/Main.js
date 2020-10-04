import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
// import episodes from '../data';
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerProgress,
} from 'react-native-track-player';
import * as Progress from 'react-native-progress';

import EpisodesList from './EpisodesList';
import Controlls from './Controlls';
import EpisodeInfo from './EpisodeInfo';
const { width, height } = Dimensions.get('window');

import episodesJSON from '../episodes.json';

// map through episodes JSON, return an object for each episode containing keys : id, title, artist, url, artwork
const episodes = episodesJSON.items.map((episode) => {
  return {
    id: `${episode.id}`,
    title: episode.title,
    artist: episode.publisher,
    url: episode.mp3,
    artwork: episode.artwork,
  };
});

export default function Main() {
  // create episodeIdx state, default to 0
  const [episodeIdx, setEpisodeIdx] = useState(0);

  // call usePlaybackState hook to get current playback state
  const playbackState = usePlaybackState();

  // call useTrackPlayerProgress hook -> deconstruct progress and duration from return obj
  const { position, duration } = useTrackPlayerProgress();

  // find index of element w/in arrray with element.id
  const findIndexById = (id, array) => {
    return array.findIndex((el) => {
      return el.id === id;
    });
  };

  // update eposodeIdx state to current track
  const setEpisodeIdxToCurrrent = () => {
    TrackPlayer.getCurrentTrack()
      .then((id) => {
        return findIndexById(id, episodes);
      })
      .then((idx) => {
        setEpisodeIdx(idx);
      });
  };

  // on first render, initiallize TrackPlayer and add episodes to player
  useEffect(() => {
    TrackPlayer.setupPlayer().then(async () => {
      // The player is ready to be used
      console.log('Player ready');
      // add the array of episodes
      await TrackPlayer.reset();
      await TrackPlayer.add([...episodes]);
      setEpisodeIdxToCurrrent();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const selectAndPlayEpisode = async (id) => {
    await TrackPlayer.skip(id);
    TrackPlayer.play();
    setEpisodeIdxToCurrrent();
  };

  let progress = position && duration ? position / duration : 0;
  return (
    <View style={styles.container}>
      <EpisodesList playEpisode={selectAndPlayEpisode} episodes={episodes} />
      <EpisodeInfo
        title={episodes[episodeIdx].title}
        artist={episodes[episodeIdx].artist}
        image={episodes[episodeIdx].artwork}
      />

      <Progress.Bar color={'#F76C6C'} progress={progress} width={250} />
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
});
