// import React, {useRef, useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   Platform,
//   Dimensions,
// } from 'react-native';
// import {styles} from './style';
// import images from '../../services/utilities/images';

// const windowWidth = Dimensions?.get('window').width;

// export default function AppIntroduction({navigation}) {
//   const [imgActive, setImgActive] = useState(0);
//   const scrollViewRef = useRef(null);
//   const [slideWidth, setSlideWidth] = useState(windowWidth);

//   // useEffect(() => {
//   //   const updateSlideWidth = () => {
//   //     const width = Dimensions?.get('window').width;
//   //     setSlideWidth(width);
//   //   };

//   //   Dimensions?.addEventListener('change', updateSlideWidth);

//   //   return () => {
//   //     Dimensions?.removeEventListener('change', updateSlideWidth);
//   //   };
//   // }, []);

//   // const onchange = nativeEvent => {
//   //   if (nativeEvent) {
//   //     const slide = Math.round(nativeEvent.contentOffset.x / slideWidth);
//   //     if (slide !== imgActive) {
//   //       setImgActive(slide);
//   //     }
//   //   }
//   // };

//   const handleNextSlide = () => {
//     let nextSlide;
//     if (imgActive + 1 < imagesArray.length) {
//       nextSlide = imgActive + 1;
//       setImgActive(nextSlide);
//     } else {
//       navigation.navigate('Introduction');
//     }

//     scrollViewRef.current.scrollTo({
//       x: nextSlide * slideWidth,
//       animated: true,
//     });
//   };

//   const imagesArray = [
//     {
//       image: images.introImgOne,
//       title: 'Swipe through profiles tailored to your interests.',
//       subtitle: 'Find someone who shares your passions and hobbies.',
//     },
//     {
//       image: images.introImgTwo,
//       title: 'Join fun-filled events in your area.',
//       subtitle: 'Meet new people and create unforgettable memories together.',
//     },
//     {
//       image: images.introImgThree,
//       title: 'Earn Winclies Coins by engaging with the app.',
//       subtitle: 'Redeem them for exciting rewards and perks.',
//     },
//   ];

//   return (
//     <SafeAreaView>
//       <View style={styles.container}>
//         <ScrollView
//           ref={scrollViewRef}
//           style={{flex: 1}}
//           horizontal={true}
//           scrollEventThrottle={16}
//           pagingEnabled={true}
//           showsHorizontalScrollIndicator={false}
//           // onScroll={({nativeEvent}) => onchange(nativeEvent)}
//         >
//           {imagesArray.map((item, index) => (
//             <View
//               key={index}
//               style={[
//                 Platform.OS == 'android' ? styles.body : styles.bodyIOS,
//                 {width: slideWidth}, // Set the slide width dynamically
//               ]}>
//               <Image source={item.image} style={styles.imgContainer} />
//               <Text style={styles.heading}>{item.title}</Text>
//               <Text style={styles.subText}>{item.subtitle}</Text>
//             </View>
//           ))}
//         </ScrollView>
//         <View style={styles.color}>
//           <TouchableOpacity
//             style={styles.arrowContianer}
//             onPress={handleNextSlide}>
//             <Image
//               source={
//                 imgActive === 0
//                   ? images.skipOne
//                   : imgActive === 1
//                   ? images.skipTwo
//                   : imgActive === 2
//                   ? images.skipThree
//                   : null
//               }
//               style={styles.arrow}
//             />
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity style={styles.skipContainer}>
//           <Text style={styles.skipText}>Skip</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import {styles} from './style';
import images from '../../services/utilities/images';

const windowWidth = Dimensions?.get('window').width;

export default function AppIntroduction({navigation}) {
  const [imgActive, setImgActive] = useState(0);
  const scrollViewRef = useRef(null);
  const [slideWidth, setSlideWidth] = useState(windowWidth);

  useEffect(() => {
    const updateSlideWidth = () => {
      const width = Dimensions?.get('window')?.width;
      setSlideWidth(width);
    };

    Dimensions?.addEventListener('change', updateSlideWidth);

    return () => {
      Dimensions?.removeEventListener('change', updateSlideWidth);
    };
  }, []);

  const handleScroll = event => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / slideWidth);
    if (slide !== imgActive) {
      setImgActive(slide);
    }
  };

  const handleNextSlide = () => {
    let nextSlide;
    if (imgActive + 1 < imagesArray.length) {
      nextSlide = imgActive + 1;
      setImgActive(nextSlide);
    } else {
      navigation.navigate('GetStarted');
    }

    scrollViewRef.current.scrollTo({
      x: nextSlide * slideWidth,
      animated: true,
    });
  };

  const imagesArray = [
    {
      image: images.introImgOne,
      title: 'Swipe through profiles tailored to your interests.',
      subtitle: 'Find someone who shares your passions and hobbies.',
    },
    {
      image: images.introImgTwo,
      title: 'Join fun-filled events in your area.',
      subtitle: 'Meet new people and create unforgettable memories together.',
    },
    {
      image: images.introImgThree,
      title: 'Earn Winclies Coins by engaging with the app.',
      subtitle: 'Redeem them for exciting rewards and perks.',
    },
  ];

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          style={{flex: 1}}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}>
          {imagesArray.map((item, index) => (
            <View
              key={index}
              style={[
                Platform.OS == 'android' ? styles.body : styles.bodyIOS,
                {width: slideWidth},
              ]}>
              <Image source={item.image} style={styles.imgContainer} />
              <Text style={styles.heading}>{item.title}</Text>
              <Text style={styles.subText}>{item.subtitle}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.color}>
          <TouchableOpacity
            style={styles.arrowContianer}
            onPress={handleNextSlide}>
            <Image
              source={
                imgActive === 0
                  ? images.skipOne
                  : imgActive === 1
                  ? images.skipTwo
                  : imgActive === 2
                  ? images.skipThree
                  : null
              }
              style={styles.arrow}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.skipContainer}
          onPress={() => navigation.navigate('GetStarted')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
