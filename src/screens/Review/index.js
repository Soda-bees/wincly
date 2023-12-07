import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import formatToJSON from '../../services/utilities/JsonLog';
import { styles } from './style';
import BackButton from '../../components/BackButton';
import { ActivityIndicator } from 'react-native-paper';
import Button from '../../components/Button';
import StarRating from 'react-native-star-rating';
import { colors, sizes } from '../../services';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import images from '../../services/utilities/images';


export default function Review({ route, navigation }) {
  const { item, eventData } = route.params;

  const userData = useSelector(state => state.userDetailsSlice.userDetalis);

  const [loader, setLoader] = useState(false);
  const [starCount, setStarCount] = useState('');
  const [reviewText, setReviewText] = useState('')
  const [permission, setPermission] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [isNotReviewModal, setIsNotReviewModal] = useState(false)

  // console.log('review-==-', formatToJSON(item));

  useEffect(() => {
    // Update permission whenever starCount or reviewText changes
    setPermission(starCount >= 1 && reviewText.length >= 1);
  }, [starCount, reviewText]);

  const handleConfirm = async () => {
    // console.log(formatToJSON(item.myReviews));
    //  console.log(userData._id);
    const _id = userData._id
    // if (item.myReviews.some((review) => review.user === _id)) {
    //   setStarCount('')
    //   setReviewText('')
    //   setIsNotReviewModal(true)
    //   console.log("id hai");
    // } else {
      console.log("id nh hai");
      const quantity = starCount
      const text = reviewText
      const id = eventData._id
      const userId = item._id
      const reviewPostId = userData._id
      setLoader(true)
      try {
        const { data } = await axios.post(backendURL + "api/wincly/postReview", {
          quantity,
          text,
          id,
          userId,
          reviewPostId
        })
        // console.log(formatToJSON(data));
        if (data.message === "Review added!") {
          setStarCount('')
          setReviewText('')
          setIsModal(true)
          setLoader(false)
        } else {
          console.log(data.message);
          setLoader(false)
        }
      } catch (error) {
        console.log(error);
        setLoader(false)
      }
    // }
  };


  return (
    <SafeAreaView>
      <View style={styles.content}>
        <BackButton title={'Review'} />
        <View style={styles.reviewView}>
          <View style={styles.reviewInsideView}>
            <Image source={{ uri: item.profileImg }} style={styles.profileView} />
            <Text style={styles.usernameText}>{item.username}</Text>
            <Text style={styles.reviewText}>Review</Text>
            <StarRating
              disabled={false}
              maxStars={5}
              fullStarColor="#FFB400"
              starSize={sizes.screenHeight * 0.03}
              containerStyle={{
                width: sizes.screenWidth * 0.35,
              }}
              rating={starCount}
              selectedStar={rating => setStarCount(rating)}
            />
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder="Review"
              placeholderTextColor={colors.disabledBg2}
              style={styles.reviewInput}
              value={reviewText}
              onChangeText={text => setReviewText(text)}
            />
          </View>
        </View>
        <View style={Platform.OS == 'ios' ? styles.btnViewIOS : styles.btnView}>
          {loader ? (
            <View style={styles.loader}>
              <ActivityIndicator size="small" color="#000" />
            </View>
          ) : (
            permission &&
            <Button title={'Submit'} onPress={handleConfirm} />
          )}
        </View>
      </View>
      <Modal isVisible={isModal}>
        <View style={styles.modalView}>
          <Image source={images.checkmark} style={styles.checkmark} />

          <Text style={styles.modelText}>
            {' '}
            <Text style={styles.blueText}> Review Posted! </Text>your
            review has been posted succesfully
          </Text>
        </View>
        <View style={styles.submitTopModal}>
          <TouchableOpacity
            style={styles.signInBtnModal}
            onPress={() => {
              setIsModal(false)
              navigation.navigate('Home');
            }}>
            <View style={styles.signInBtnModal}>
              <View style={styles.signUpContent}>
                <Text
                  style={
                    Platform.OS == 'ios' ? styles.btnTextIOS : styles.btnText
                  }>
                  Done
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal isVisible={isNotReviewModal}>
        <View style={styles.modalView2}>
          {/* <Image source={images.checkmark} style={styles.checkmark} /> */}

          <Text style={styles.modelText}>
            {' '}
            <Text style={styles.blueText}></Text>Posting a review is a <Text style={styles.blueText}>one time</Text> opportunity!
          </Text>
        </View>
        <View style={styles.submitTopModal}>
          <TouchableOpacity
            style={styles.signInBtnModal}
            onPress={() => {
              setIsNotReviewModal(false)
              navigation.navigate('Home');
            }}>
            <View style={styles.signInBtnModal}>
              <View style={styles.signUpContent}>
                <Text
                  style={
                    Platform.OS == 'ios' ? styles.btnTextIOS : styles.btnText
                  }>
                  Done
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
