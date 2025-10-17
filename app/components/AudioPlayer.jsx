import COLORS from '@/configs/colors';
import { SimpleLineIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import LottieView from 'lottie-react-native';
import { useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';



export default function AudioPlayer({ uri }) {
  const player = useAudioPlayer(uri);
  const status = useAudioPlayerStatus(player);
  const visualiserRef = useRef(null)

  const isPlaying = status?.playing ?? false;

  const handlePlayPause = async () => {
    try {
      if (isPlaying) {

        player.pause();
        // player.seekTo(0);
      } else {

        player.play();
      }
    } catch (error) {
      console.error('Error toggling play/pause:', error);
    }
  };
  useEffect(() => {
    if (isPlaying && isReady) {
      visualiserRef.current?.play()
    } else {
      visualiserRef.current?.pause()
      // visualiserRef.current?.play(15)
      // setTimeout(() => {
      //   visualiserRef.current?.reset()
      // }, 500);
    }
  }, [isPlaying, isReady])
  
  useEffect(() => {
    const finished = isReady && status?.currentTime >= status?.duration;

    if (isPlaying && isReady) {
      visualiserRef.current?.play();
    } else {
      visualiserRef.current?.pause();
    }

    if (finished) {
      player.pause();
      player.seekTo(0);
      visualiserRef.current?.reset();
    }
  }, [isPlaying, isReady, status?.currentTime]);


  const handleSeekComplete = async (value) => {
    try {
      player.seekTo(value);
    } catch (error) {
      console.error('Error seeking:', error);
    }
  };

  const isReady = status?.duration > 0;
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", textAlign: "center" }}>Play Audio</Text>
      <LottieView
        ref={visualiserRef}
        source={require('../../assets/animations/Visualizer.json')}
        style={{ width: "100%", height: 50, marginVertical: 5 }}
      />
      <View style={[{ flexDirection: "row", alignItems: "center" }]}>
        <TouchableOpacity
          disabled={!isReady}
          onPress={handlePlayPause} activeOpacity={0.95} style={{ marginTop: 20 }}>
          {!isReady && <SimpleLineIcons name='hourglass' size={30} color={COLORS.primary} />}
          {isReady && !isPlaying && <SimpleLineIcons name='control-play' size={30} color={COLORS.primary} />}
          {isReady && isPlaying && <SimpleLineIcons name='control-pause' size={30} color={COLORS.primary} />}
        </TouchableOpacity>
        <Slider
          style={{ marginTop: 20, width: '100%', height: 40 }}
          minimumValue={0}
          maximumValue={status?.duration ?? 0}
          value={status?.currentTime ?? 0}
          onSlidingComplete={handleSeekComplete}
          minimumTrackTintColor={COLORS.textSecondary}
          maximumTrackTintColor={COLORS.secondary}
          thumbTintColor={COLORS.primary}
          disabled={!isReady}
        />
      </View>
      <Text style={{ marginTop: 0, marginLeft: 35 }}>
        {formatTime(status?.currentTime ?? 0)} / {formatTime(status?.duration ?? 0)} min
      </Text>
    </View>
  );
}