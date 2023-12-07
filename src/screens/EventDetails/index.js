import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import BackButton from '../../components/BackButton';
import images from '../../services/utilities/images';
import { ActivityIndicator } from 'react-native-paper';
import Button from '../../components/Button';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import { useSelector } from 'react-redux';
import socket from '../../services/config/io';
import Modal from 'react-native-modal';
import formatToJSON from '../../services/utilities/JsonLog';

export default function EventDetails({ route, navigation }) {
  const { item, timeAgo } = route.params;

  const { userDetalis } = useSelector(state => state.userDetailsSlice);

  const [loader, setLoader] = useState(false);
  const [updatedCurrUserDetails, setUpdatedUserDetails] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  // console.log(item.eventParticipants.length);
  console.log(item.noOfPerson);
  useEffect(() => {
    navigation.addListener('focus', () => {
      handleGetCurrUserDetails();
    });
  }, [navigation]);

  const handleGetCurrUserDetails = async () => {
    try {
      const { data } = await axios.post(backendURL + 'api/wincly/singleUser', {
        _id: userDetalis._id,
      });
      delete data.data.allChats;
      setUpdatedUserDetails(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleConfirm = async () => {
    if (updatedCurrUserDetails) {
      try {
        const { data } = await axios.post(backendURL + "api/wincly/addJoinReqnotification", {
          eventParticipantsId: updatedCurrUserDetails._id,
          eventOrganizerId: item.eventOrganizerData._id,
          eventTitle: item.title,
          eventId: item._id
        })
        console.log(data, "=--=-=-==-=-=-join req");
        if (data.success) {
          const obj = {
            eventParticipantsData: updatedCurrUserDetails,
            eventOrganizer_id: item.eventOrganizerData._id,
            eventTitle: item.title,
            eventDocId: item._id,
            eventOrganizerData: item.eventOrganizerData,
            _id: data.data._id,
            eventData: item
          };
          setModalVisible(!isModalVisible);
          socket.emit('eventJoinReq', obj);
        } else {
          console.log("error----=>", data.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("data nh hai user ka");
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <BackButton title={'Event details'} />
        <ScrollView>
          <View style={styles.innerContainer}>
            <View style={styles.eventCardImgView}>
              <Image
                source={{ uri: item.eventOrganizerData.profileImg }}
                style={styles.eventCardProfileImg}
              />
              <View>
                <Text style={styles.eventCardUsernameText}>
                  {item.eventOrganizerData.username}
                </Text>
                <Text style={styles.eventCardTimeText}>{timeAgo}</Text>
              </View>
            </View>
            <Text style={styles.eventCardTitle}>{item.title}</Text>
            <View style={styles.locationPersonView}>
              <View style={styles.locationView}>
                <Image source={images.location} style={styles.locationImg} />
                <Text style={styles.locationText}>
                  {item.eventOrganizerData.location}
                </Text>
              </View>
              <Text style={styles.noOfPersonText}>
                {`No of person:${item.eventParticipants?.length}/${item.noOfPerson}`}
              </Text>
            </View>
            <View style={styles.line}></View>
            <Text style={styles.eventDisText}>{item.eventDis}</Text>
            <Image source={{ uri: item.imageUri }} style={styles.eventImg} />

            <View style={styles.startDateView}>
              <View style={styles.insideStartDateView1}>
                <Image source={images.date} style={styles.dateImg} />
                <View style={styles.insideStartDateView}>
                  <Text style={styles.text1}>Start date</Text>
                  <View>
                    <Text style={styles.dropItem}>{item.startDate}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.startDateView}>
              <View style={styles.insideStartDateView1}>
                <Image source={images.date} style={styles.dateImg} />
                <View style={styles.insideStartDateView}>
                  <Text style={styles.text1}>End date</Text>
                  <View>
                    <Text style={styles.dropItem}>{item.endDate}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.timeView}>
              <View style={styles.startTimeView}>
                <View style={styles.insideStartDateView1}>
                  <Image source={images.time} style={styles.dateImg} />
                  <View style={styles.insideStartDateView}>
                    <Text style={styles.text1}>Start time</Text>
                    <View>
                      <Text style={styles.dropItem2}>{item.startTime}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.startTimeView}>
                <View style={styles.insideStartDateView1}>
                  <Image source={images.time} style={styles.dateImg} />
                  <View style={styles.insideStartDateView}>
                    <Text style={styles.text1}>End time</Text>
                    <View>
                      <Text style={styles.dropItem2}>{item.endTime}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <Text style={styles.interestText}>
              {`${item.eventOrganizerData.username} interest`}
            </Text>
            <View style={styles.itemView}>
              {item.eventOrganizerData.interest.map((item, index) => {
                // console.log(item);
                return (
                  <Text key={index} style={styles.interestMapText}>
                    {item}
                  </Text>
                );
              })}
            </View>
          </View>
        </ScrollView>
        {
          item.eventParticipants.length < item.noOfPerson &&
          <View style={Platform.OS == 'ios' ? styles.btnViewIOS : styles.btnView}>
            {loader ? (
              <View style={styles.loader}>
                <ActivityIndicator size="small" color="#000" />
              </View>
            ) : (
              <Button title={'Join Event'} onPress={handleConfirm} />
            )}
          </View>
        }
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalView}>
          <Image source={images.checkmark} style={styles.checkmark} />

          <Text style={styles.modelText}>
            {' '}
            <Text style={styles.blueText}> Request sent! </Text> {'\n'}your
            request for join {item.title} has been sent to{' '}
            {item.eventOrganizerData.username}.
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
