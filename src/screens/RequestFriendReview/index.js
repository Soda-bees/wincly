import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { styles } from './style';
import { useSelector, useDispatch } from 'react-redux';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import Modal from 'react-native-modal';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import formatToJSON from '../../services/utilities/JsonLog';

export default function RequestFriendReview({ route, navigation }) {

  const { item } = route?.params

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalTwoVisible, setModalTwoVisible] = useState(false);
  const { userDetalis } = useSelector(state => state.userDetailsSlice);
  const [loader, setLoader] = useState(false)

  const handleReview = () => {
    navigation.navigate('Review');
  };

  const handleProfile = () => {
    navigation.navigate('Home')
  }

  const handleSendInvitation = async () => {
    setLoader(true)
    try {
      const _idArray = []
      if (item && item.eventParticipants && Array.isArray(item.eventParticipants)) {
        item.eventParticipants.forEach(participant => {
          if (participant && participant._id) {
            _idArray.push(participant._id);
          }
        });
      }
      const { data } = await axios.post(`${backendURL}api/wincly/sendReviewNotification`, { _idArray, item })
      if (data?.success) {
        setModalVisible(true);
        setLoader(false)
      }
    } catch (error) {
      setLoader(false
      )
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: userDetalis?.profileImg }} style={styles.profile} />
      <Text style={styles.username}>{userDetalis?.username}</Text>
      <View style={styles.locationView}>
        <Image source={images.location} style={styles.locationImg} />
        <Text style={styles.locationText}>{userDetalis?.location}</Text>
      </View>
      <Text style={styles.head2}>Complete the </Text>
      <Text style={styles.loginHead}>Wincly Experience!</Text>
      <Text style={styles.head3}>Request your friends to submit a review.</Text>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.friendContainer}>
          {item?.eventParticipants?.map((item, index) => {
            return (
              <View key={index} style={[styles.margin, styles.imageContainer]}>
                <Image style={styles.image} source={{ uri: item?.profileImg }} />
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Text style={styles.head4}>
        Upgrade your profile by getting verified reviews to increase your
        chances of getting
        <Text> </Text>
        <Text style={styles.head4Combination}>new badges!</Text>
      </Text>

      <View style={styles.btnTop}>
        <Button
          onPress={handleSendInvitation}
          title={'Ask for Review'}
          loader={loader}
        />
      </View>

      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.5}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!isModalVisible);
            }}>
            <Image style={styles.modalCross} source={images.cancelModal} />
          </TouchableOpacity>
          <Text style={styles.modalHeading}>Request sent!</Text>
          <Image style={styles.modalImage} source={images.tickGreen} />
          <Text style={styles.modalText}>
            The request for the review has been sent to your friends! You will
            be notified once they complete the review.
          </Text>
          <TouchableOpacity
            onPress={handleProfile}

            style={styles.modalButton}>
            <View style={styles.modalButtonRow}>
              <Text style={styles.modalBtnText}>Your Profile</Text>
              <Image source={images.profileSmall} />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        visible={isModalTwoVisible}
        onRequest={() => {
          Alert.alert('Modal has been closed');
          setModalTwoVisible(!isModalTwoVisible);
        }}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => {
              setModalTwoVisible(!isModalTwoVisible);
            }}>
            <Image style={styles.modalCross} source={images.cancelModal} />
          </TouchableOpacity>
          <View style={styles.modalUserDetails}>
            <Image
              source={{ uri: userDetalis?.profileImg }}
              style={styles.profileModal}
            />
            <Text style={styles.userNameModal}>{userDetalis?.username}</Text>
            <View style={styles.locationView}>
              <Image source={images.location} style={styles.locationImg} />
              <Text style={styles.locationText}>{userDetalis?.location}</Text>
            </View>
          </View>
          <Text style={styles.modalHead}>Submit a Review!</Text>
          <Text style={styles.modalText}>
            {userDetalis?.username} has requested to submit a review for the
            event you participated in.
          </Text>
          <TouchableOpacity style={styles.modalButton} onPress={handleReview}>
            <Text style={styles.modalBtnText}>Submit a Review</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
