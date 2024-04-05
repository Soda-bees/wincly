import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {styles} from './style';
import images from '../../services/utilities/images';
import {colors, sizes} from '../../services';
// import {Circle, G,Svg} from 'react-native-svg';

export default function AppIntroduction() {
  const [imgActive, setImgActive] = useState(0);
  const scrollViewRef = useRef(null);

  const onchange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.round(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != imgActive) {
        setImgActive(slide);
      }
    }
  };

  // const cirleSize = 128;
  // const strokeWidth = cirleSize.screenWidth * 0.02;
  // const center = cirleSize / 2;
  // const radius = cirleSize/2 -strokeWidth/2
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView
          style={{flex: 1}}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={({nativeEvent}) => onchange(nativeEvent)}>
          <View style={Platform.OS == 'android' ? styles.body : styles.bodyIOS}>
            <Image source={images.introImgOne} style={styles.imgContainer} />
            <Text style={styles.heading}>
              Swipe through profiles tailored to your interests.
            </Text>
            <Text style={styles.subText}>
              Find someone who shares your passions and hobbies.
            </Text>
          </View>
          <View style={Platform.OS == 'android' ? styles.body : styles.bodyIOS}>
            <Image source={images.introImgTwo} style={styles.imgContainer} />
            <Text style={styles.heading}>
              Join fun-filled events in your area.
            </Text>
            <Text style={styles.subText}>
              Meet new people and create unforgettable memories together.
            </Text>
          </View>
          <View style={Platform.OS == 'android' ? styles.body : styles.bodyIOS}>
            <Image source={images.introImgThree} style={styles.imgContainer} />
            <Text style={styles.heading}>
              Earn Winclies Coins by engaging with the app.
            </Text>
            <Text style={styles.subText}>
              Redeem them for exciting rewards and perks.
            </Text>
          </View>
        </ScrollView>
        {/* <Svg width={sizes} height={sizes}>
          <Circle
            stroke={colors.lightGray}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
        </Svg> */}
        <TouchableOpacity style={styles.arrowContianer}>
          <Image source={images.swipeArrow} style={styles.arrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipContainer}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
