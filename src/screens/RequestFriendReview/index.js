import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import {useSelector, useDispatch} from 'react-redux';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import {Modal} from 'react-native-paper';

export default function RequestFriendReview({route, navigation}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalTwoVisible, setModalTwoVisible] = useState(false);
  const {userDetalis} = useSelector(state => state.userDetailsSlice);
  const [friendImage, setFriendImage] = useState([
    images.friendProfile,
    images.friendProfile,
    images.friendProfile,
    images.friendProfile,
    images.friendProfile,
    images.friendProfile,
  ]);

  const handleReview = () => {
    navigation.navigate('Review');
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: userDetalis?.profileImg}} style={styles.profile} />
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
          {friendImage.map((imgFriend, index) => {
            return (
              <View key={index} style={[styles.margin, styles.imageContainer]}>
                <Image style={styles.image} source={imgFriend} />
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
          onPress={() => {
            console.log('modal open');
            setModalVisible(true);
            // setModalVisible(true);
          }}
          title={'Ask for Review'}></Button>
      </View>

      <Modal
        visible={isModalVisible}
        onRequest={() => {
          Alert.alert('Modal has been closed');
          setModalVisible(!isModalVisible);
        }}>
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
            onPress={() => {
              console.log('modal 2 open');
              setModalTwoVisible(true);
            }}
            style={styles.modalButton}>
            <Text style={styles.modalBtnText}>Done</Text>
            
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
              source={{uri: userDetalis?.profileImg}}
              style={styles.profile}
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
          <TouchableOpacity
            style={styles.modalButton}
            onPress={handleReview}
          >
            <Text style={styles.modalBtnText}>Submit a Review</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
