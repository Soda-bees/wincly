import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import {useSelector, useDispatch} from 'react-redux';
import {ActivityIndicator, Checkbox} from 'react-native-paper';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import {handleAddUserDetails} from '../../store/userDetailsSlice';
import Modal from 'react-native-modal';
import images from '../../services/utilities/images';
import Tooltip from 'react-native-walkthrough-tooltip';
import { selectShowTutorial, setShowTutorialTrue } from '../../store/showTutorial';

export default function PickInterest({route, navigation}) {
  const dispatch = useDispatch();
  const showTutorial = useSelector(selectShowTutorial);
  console.log('showTutorial=--==-=>', showTutorial);
  const isSignedIn = useSelector(state => state.isSignedInSlice.isSignIn);
  const {userDetalis} = useSelector(state => state.userDetailsSlice);
  const [guideVisible, setGuideVisible] = useState(true);

  const [interest, setInterest] = useState([
    'Travelling',
    'Workout',
    'Horse Riding',
    'Yoga',
    'Karaoke',
    'Clubbing',
    'Painting',
    'Art',
    'Gym',
    'Digital Painting',
    'Drink',
    'Dancing',
    'Singing',
    'Cafe hopping',
    'Maths',
  ]);
  const [selectedInterest, setSelectedInterest] = useState('');
  const [loader, setLoader] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      setSelectedInterest(userDetalis.interest);
    } else {
      setSelectedInterest([]);
    }
  }, []);

  const handleConfirm = async () => {
    setLoader(true);
    if (isSignedIn) {
      try {
        const {data} = await axios.post(
          backendURL + 'api/wincly/updateProfile',
          {
            _id: userDetalis._id,
            interest: selectedInterest,
          },
        );
        if (data.message == 'Update succesfully!') {
          const user = data.data;
          dispatch(handleAddUserDetails(user));
          setTimeout(() => {
            setModalVisible(!isModalVisible);
            setLoader(false);
          }, 700);
        }
      } catch (error) {
        console.log(error);
        setTimeout(() => {
          setLoader(false);
        }, 700);
      }
    } else {
      const {userData} = route.params;
      userData.interest = selectedInterest;
      // navigation.navigate('AboutYourself', {userData});
      navigation.navigate('ThankYou', {userData});
      setLoader(false);
    }
  };
  const handleFirstTooltipPress = () => {
    if (guideVisible) {
      setGuideVisible(false);
    }
  };

  return (
    <SafeAreaView>
      {showTutorial && 
        <Tooltip
          isVisible={guideVisible}
          contentStyle={styles.tooltipStyle}
          content={
            <TouchableOpacity onPress={handleFirstTooltipPress}>
              <View style={styles.guideInterest}>
                <Text style={styles.guideInterestText}>Painting</Text>
              </View>
              <Image source={images.hand} style={styles.guideHand} />
              <Text style={styles.guideSubText}>
                Discover What Sparks Your Interest
              </Text>
            </TouchableOpacity>
          }
          placement="top"
          onClose={handleFirstTooltipPress}
        />
      }

      <View style={styles.container}>
        <Image source={images.profileInfobg} style={styles.bgImage} />
        <View>
          <BackButton/>
        </View>
        <View>
          <Text style={styles.head}>Pick Your Interests</Text>
        </View>
        <View style={styles.interestView}>
          {interest.map((item, index) => {
            return (
              <View key={index} style={styles.interestOption}>
                <TouchableOpacity
                  onPress={() => {
                    if (selectedInterest.includes(item)) {
                      const array = selectedInterest.filter(function (letter) {
                        return letter !== item;
                      });
                      setSelectedInterest(array);
                    } else {
                      setSelectedInterest([...selectedInterest, item]);
                    }
                  }}>
                  {Platform.OS == 'ios' ? (
                    <View
                      style={
                        selectedInterest.indexOf(item) !== -1
                          ? styles.btnTextFilled
                          : styles.btnText
                      }>
                      <Text
                        style={
                          selectedInterest.indexOf(item) !== -1
                            ? styles.btnTextFilledIOS
                            : styles.btnTextIOS
                        }>
                        {item}
                      </Text>
                    </View>
                  ) : (
                    <Text
                      style={
                        selectedInterest.indexOf(item) !== -1
                          ? styles.btnTextFilled
                          : styles.btnText
                      }>
                      {item}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <View style={styles.btnTop}>
          {loader ? (
            <View style={styles.loader}>
              <ActivityIndicator size="small" color="#000" />
            </View>
          ) : (
            <Button
              title={isSignedIn ? 'Update' : 'Continue'}
              onPress={handleConfirm}
              // onPress={handleJoin}
            />
          )}
        </View>
        <Modal isVisible={isModalVisible}>
          <View style={styles.modalView}>
            <Image source={images.checkmark} style={styles.checkmark} />

            <Text style={styles.modelText}>
              {' '}
              <Text style={styles.blueText2}> Interest Updated! </Text>your
              interest has been updated succesfully.
            </Text>
          </View>
          <View style={styles.submitTopModal}>
            <TouchableOpacity
              style={styles.signInBtnModal}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Home');
              }}>
              <View style={styles.signInBtnModal}>
                <View style={styles.signUpContent}>
                  <Text
                    style={
                      Platform.OS == 'ios'
                        ? styles.btnTextIOS2
                        : styles.btnText2
                    }>
                    Done
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
