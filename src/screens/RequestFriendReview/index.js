import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import {useSelector, useDispatch} from 'react-redux';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import {Modal} from 'react-native-paper';

export default function RequestFriendReview({route, navigation}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const {userDetalis} = useSelector(state => state.userDetailsSlice);

  const [friendImage, setFriendImage] = useState([
    images.friendProfile,
    images.friendProfile,
    images.friendProfile,
    images.friendProfile,
    images.friendProfile,
    images.friendProfile,
  ]);

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
                <Image source={imgFriend} />
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Text style={styles.head4}>
        Upgrade your profile by getting verified reviews to increase your
        chances of getting
        <Text style={styles.head4Combination}> new badges!</Text>
      </Text>

      <View style={styles.btnTop}>
        <Button
          onPress={() => {
            console.log('modal open');
            setModalVisible(true);
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
          <TouchableOpacity style={styles.modalButton}>
            <View style={styles.modalButtonRow}>
            <Text style={styles.modalBtnText}>Your Profile</Text>
            <Image source={images.profileSmall}/>
            </View>
         
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
