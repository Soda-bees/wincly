import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './style';
import BackButton from '../../components/BackButton';
import {ActivityIndicator} from 'react-native';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import {useSelector} from 'react-redux';
import formatToJSON from '../../services/utilities/JsonLog';
import {colors, sizes} from '../../services';
import StarRating from 'react-native-star-rating';
import images from '../../services/utilities/images';

export default function MyReview({navigation}) {
  const {userDetalis} = useSelector(state => state.userDetailsSlice);

  const [loader, setLoader] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      setLoader(true);
      handleGetUserDetails();
    });
  }, [navigation]);

  const handleGetUserDetails = async () => {
    try {
      const {data} = await axios.post(backendURL + 'api/wincly/singleUser', {
        _id: userDetalis._id,
      });
      if (data.message === 'User Data') {
        let myReviews = data.data.myReviews;
        // console.log("-=-==-=-Reviews",formatToJSON(data.data.myReviews));
        setReviews(myReviews);
        setLoader(false);
      } else {
        console.log(error.message);
        setLoader(false);
      }
    } catch (error) {
      console.log(error.message);
      setLoader(false);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <BackButton title={'Reviews'} />
        {loader ? (
          <View style={styles.loaderView}>
            <ActivityIndicator size={45} color={colors.appTextColor1} />
          </View>
        ) : reviews?.length > 0 ? (
          <ScrollView>
            {reviews.map((item, index) => {
              const imageArray = Array.from({length: item.quantity});
              return (
                <TouchableOpacity key={index} style={styles.reviewContainer}>
                  <Image
                    source={{uri: item.user.profileImg}}
                    style={styles.profileImg}
                  />
                  <View style={styles.usernameStartsContainer}>
                    <View style={styles.usernameStartsView}>
                      <Text style={styles.usernameText}>
                        {item.user.username}
                      </Text>
                      <View style={styles.starView}>
                        {imageArray.map((item, index) => {
                          return (
                            <Image
                              source={images.reviewStar}
                              style={styles.reviewStar}
                              key={index}
                            />
                          );
                        })}
                      </View>
                    </View>
                    <Text style={styles.reviewText} 
                    // numberOfLines={1}
                    >
                      {item.text}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          <View style={styles.noEventTextView}>
            <Text style={styles.noEventText}>No Reviews Yet</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
