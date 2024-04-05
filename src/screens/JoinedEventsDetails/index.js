import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import formatToJSON from '../../services/utilities/JsonLog';
import { styles } from './style';
import BackButton from '../../components/BackButton';
import { ActivityIndicator, Modal } from 'react-native-paper';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import { format, parse } from 'date-fns';
import { useSelector } from 'react-redux';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import { colors, sizes } from '../../services';

export default function JoinEventsDetails({ route, navigation }) {
  const item = route?.params?.item
  const eventId = route?.params?.eventId

  const userData = useSelector(state => state.userDetailsSlice.userDetalis);
  const { userDetalis } = useSelector(state => state.userDetailsSlice);
  const [isModalTwoVisible, setModalTwoVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isReview, setIsReview] = useState(false);
  const [eventDetails, setEventDetails] = useState('')
  const [timeAgo, setTimeAgo] = useState('')
  const [fullLoader, setFullLoader] = useState(false)

  useEffect(() => {
    if (eventId) {
      setFullLoader(true)
      handleGetEventDetails()
    } else {
      setEventDetails(item)
      DateComparison(item);
      timeAgoCalculator(item.postTime)
    }
  }, []);

  const handleGetEventDetails = async () => {
    try {
      const { data } = await axios.get(`${backendURL}api/wincly/getSingleEventDetails/${eventId}`)
      if (data.success) {
        setEventDetails(data?.eventDetails)
        setFullLoader(false)
        DateComparison(data?.eventDetails);
        timeAgoCalculator(data?.eventDetails?.postTime)
      }
    } catch (error) {
      console.log(error);
    }
  }

  function DateComparison(item) {
    const time = `${item.endDate} ${item.endTime}`;
    const targetDateString = time;
    const targetDate = parse(targetDateString, 'MM-dd-yyyy h:mm a', new Date());

    // Get the current date and time
    const currentDate = new Date();

    // Compare the two dates
    if (targetDate < currentDate) {
      console.log('The target time is in the past.');
      setIsReview(true);
    } else {
      console.log('The target time is in the future.');
      setIsReview(false);
    }
  }

  const timeAgoCalculator = async (inputDateString) => {
    const inputFormat = 'MM-dd-yyyy hh:mm a';
    const parsedDate = parse(
      inputDateString,
      inputFormat,
      new Date(),
    );
    const outputFormat = 'yyyy-MM-dd HH:mm';
    const targetDate1 = format(parsedDate, outputFormat);
    const targetDate = new Date(targetDate1);
    const currentDate = new Date();
    const timeDifference = currentDate - targetDate;
    const daysAgo = Math.floor(
      timeDifference / (1000 * 60 * 60 * 24),
    );
    const hoursAgo = Math.floor(
      (timeDifference / (1000 * 60 * 60)) % 24,
    );
    const minutesAgo = Math.floor(
      (timeDifference / (1000 * 60)) % 60,
    );
    let time;
    if (daysAgo > 0) {
      time = `${daysAgo} day ago`;
      setTimeAgo(time)
    } else if (hoursAgo > 0) {
      time = `${hoursAgo} hour ago`;
      setTimeAgo(time)
    } else if (minutesAgo > 0) {
      time = `${minutesAgo} minute ago`;
      setTimeAgo(time)
    } else {
      time = 'Just now';
      setTimeAgo(time)
    }
  }

  const handleConfirm = () => {
    navigation.navigate('Review', {
      item: eventDetails.eventOrganizerData,
      eventData: eventDetails,
    });
  };

  const handleNavigateChat = async _id => {
    const _id1 = _id;
    const _id2 = userData._id;
    try {
      const { data } = await axios.post(
        backendURL + 'api/wincly/findExistingChatroom',
        {
          _id1,
          _id2,
        },
      );
      console.log(data);
      if (data.success) {
        navigation.navigate('ChatRoom', { chatId: data.chatId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {
          fullLoader ? (
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              height: sizes.screenHeight * 1
            }}>
              <ActivityIndicator size={30} color={colors.appTextColor1} />
            </View>
          ) : (
            <View style={{
              height: sizes.screenHeight * 1,
              // backgroundColor:'red',
            }}>
              <BackButton title={'Event details'} />
              <ScrollView>
                <View style={styles.innerContainer}>
                  <View style={styles.eventCardImgView}>
                    <Image
                      source={{ uri: eventDetails?.eventOrganizerData?.profileImg }}
                      style={styles.eventCardProfileImg}
                    />
                    <View>
                      <Text style={styles.eventCardUsernameText}>
                        {eventDetails?.eventOrganizerData?.username}
                      </Text>
                      <Text style={styles.eventCardTimeText}>{timeAgo}</Text>
                    </View>
                  </View>
                  <Text style={styles.eventCardTitle}>{eventDetails?.title}</Text>
                  <View style={styles.locationPersonView}>
                    <View style={styles.locationView}>
                      <Image source={images.location} style={styles.locationImg} />
                      <Text style={styles.locationText}>
                        {eventDetails?.eventOrganizerData?.location}
                      </Text>
                    </View>
                    <Text style={styles.noOfPersonText}>
                      {`No of person:${eventDetails?.eventParticipants?.length}/${eventDetails?.noOfPerson}`}
                    </Text>
                  </View>
                  <View style={styles.line}></View>
                  <Text style={styles.eventDisText}>{eventDetails?.eventDis}</Text>
                  <Image source={{ uri: eventDetails?.imageUri }} style={styles.eventImg} />

                  <View style={styles.startDateView}>
                    <View style={styles.insideStartDateView1}>
                      <Image source={images.date} style={styles.dateImg} />
                      <View style={styles.insideStartDateView}>
                        <Text style={styles.text1}>Start date</Text>
                        <View>
                          <Text style={styles.dropItem}>{eventDetails?.startDate}</Text>
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
                          <Text style={styles.dropItem}>{eventDetails?.endDate}</Text>
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
                            <Text style={styles.dropItem2}>{eventDetails?.startTime}</Text>
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
                            <Text style={styles.dropItem2}>{eventDetails?.endTime}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.interestText}>
                    {`${eventDetails?.eventOrganizerData?.username} interest`}
                  </Text>
                  <View style={styles.itemView}>
                    {eventDetails?.eventOrganizerData?.interest?.map((item, index) => {
                      // console.log(item);
                      return (
                        <Text key={index} style={styles.interestMapText}>
                          {item}
                        </Text>
                      );
                    })}
                  </View>
                  <Text style={styles.interestText}>Events Participations</Text>
                  <View>
                    {eventDetails?.eventParticipants?.map((item, index) => {
                      return (
                        <View key={index} style={styles.eventParticipantsView}>
                          <View style={styles.flexRow}>
                            <Image
                              source={{ uri: item.profileImg }}
                              style={styles.eventParticipantsProfile}
                            />
                            <View style={styles.eventParticipantsInnerView}>
                              <Text style={styles.eventParticipantsUsername}>
                                {item._id === userData._id ? `You` : item.username}
                                {/* {item.username} */}
                              </Text>
                              <View style={styles.locationView}>
                                <Image
                                  source={images.location}
                                  style={styles.locationImg}
                                />
                                <Text style={styles.locationText}>
                                  {item.location}
                                </Text>
                              </View>
                            </View>
                          </View>
                          {item._id !== userData._id && (
                            <TouchableOpacity
                              onPress={() => {
                                handleNavigateChat(item._id);
                              }}>
                              <Image
                                source={images.chatIcon}
                                style={styles.chatIcon}
                              />
                            </TouchableOpacity>
                          )}
                        </View>
                      );
                    })}
                  </View>
                </View>
                {/* <View style={{marginBottom:sizes.screenHeight * 0.6}}></View> */}
              </ScrollView>
              <View style={Platform.OS == 'ios' ? styles.btnViewIOS : styles.btnView}>
                {loader ? (
                  <View style={styles.loader}>
                    <ActivityIndicator size="small" color="#000" />
                  </View>
                ) : (
                  isReview && (
                    <Button
                      title={'Post a review'}
                      onPress={() => {
                        setModalTwoVisible(!isModalTwoVisible);
                      }}
                    // onPress={handleConfirm}
                    />
                  )
                )}
              </View>
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
                      source={{ uri: eventDetails?.eventOrganizerData?.profileImg }}
                      style={styles.profileModal}
                    />
                    <Text style={styles.userNameModal}>{eventDetails?.eventOrganizerData?.username}</Text>
                    <View style={styles.locationView}>
                      <Image source={images.location} style={styles.locationImg} />
                      <Text style={styles.locationText}>{eventDetails?.eventOrganizerData?.location}</Text>
                    </View>
                  </View>
                  <Text style={styles.modalHead}>Submit a Review!</Text>
                  <Text style={styles.modalText}>
                    {eventDetails?.eventOrganizerData?.username} has requested to submit a review for the
                    event you participated in.
                  </Text>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleConfirm}>
                    <Text style={styles.modalBtnText}>Submit a Review</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
          )
        }
      </View>
    </SafeAreaView>
  );
}
