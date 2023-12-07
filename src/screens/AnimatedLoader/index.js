import React from 'react';
import loaderVideo2 from '../../assets/loaderVideo2.mp4';
import Video from 'react-native-video';
import {SafeAreaView} from 'react-native';
import {sizes} from '../../services';
import images from '../../services/utilities/images';

export default function AnimatedLoader() {
  const videoPlayer = React.useRef();
  return (
    <SafeAreaView>
      <Video
        ref={ref => (videoPlayer.current = ref)}
        source={images.loaderVideo2}
        // source={images.loaderVideo2}
        paused={false}
        style={{
          // width: 1100,
          height: sizes.screenHeight,
          backgroundColor:'red',
          // alignSelf: 'center',
        }}
        repeat={true}
      />
    </SafeAreaView>
  );
}
