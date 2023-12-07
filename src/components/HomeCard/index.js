import {
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  ImageBackground,
} from 'react-native';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import React, {useCallback, useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import HomeChoice from '../HomeChoice';
import {sizes, fontSize, colors} from '../../services';
import {styles} from '../../screens/Like/style';
import images from '../../services/utilities/images';
const {height, width} = Dimensions.get('window');
const HomeCard = ({item, isFirst, swipe, ...rest}) => {
  const rotate = swipe.x.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['-8deg', '0deg', '8deg'],
  });
  const likeOpacity = swipe.x.interpolate({
    inputRange: [10, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-100, -10],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const tinderSelection = useCallback(() => {
    return (
      <>
        <Animated.View
          style={{
            position: 'absolute',
            top: 60,
            right: 20,
            opacity: nopeOpacity,
            transform: [{rotate: '30deg'}],
          }}>
          {/* <HomeChoice type={'Nope'} /> */}
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            top: 60,
            left: 20,
            opacity: likeOpacity,
            transform: [{rotate: '-30deg'}],
          }}>
          {/* <HomeChoice type={'Like'} /> */}
        </Animated.View>
      </>
    );
  }, []);
  return (
    <Animated.View
      style={[
        {
          // width: width - 20,
          // height: height - 150,
          alignSelf: 'center',
          position: 'absolute',
          top: sizes.screenHeight * 0.1,
          borderRadius: sizes.screenWidth * 0.05,
        },
        isFirst && {
          transform: [...swipe.getTranslateTransform(), {rotate: rotate}],
        },
      ]}
      {...rest}>
      <Image
        source={{uri: item?.profileImg}}
        style={{
          height: sizes.screenHeight * 0.55,
          width: sizes.screenWidth * 0.8,
          borderRadius: sizes.screenWidth * 0.05,
          alignSelf: 'center',
        }}
      />

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={{
          height: sizes.screenHeight * 0.55,
          width: sizes.screenWidth * 0.8,
          borderRadius: sizes.screenWidth * 0.05,
          alignSelf: 'center',
          position: 'absolute',
        }}>
        <Text
          style={{
            fontSize: fontSize.h4,
            // color: colors.black,
            color: colors.white,
            fontWeight: 'bold',
            paddingLeft: sizes.screenWidth * 0.06,
            position: 'absolute',
            bottom: sizes.screenHeight * 0.075,
          }}>
          {`${item.username},`}
          <Text
            style={{
              fontSize: fontSize.h4,
              // color: colors.black,
              color: colors.white,
              fontWeight: '400',
            }}>
            {' '}
            {item.age}{' '}
          </Text>
        </Text>
        <Text
          style={{
            color: colors.white,
            fontSize: fontSize.h6,
            top: sizes.screenHeight * 0.48,
            fontSize: fontSize.h6,
            paddingLeft: sizes.screenWidth * 0.06,
          }}>
          {item.location}
        </Text>
      </LinearGradient>
      {isFirst && tinderSelection()}
    </Animated.View>
  );
};
export default HomeCard;
