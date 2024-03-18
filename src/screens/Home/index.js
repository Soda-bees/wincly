import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Platform,
  AppState,
} from 'react-native';
import {styles} from './style';
import {useSelector, useDispatch} from 'react-redux';
import images from '../../services/utilities/images';
import {colors} from '../../services';
import socket from '../../services/config/io';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import {ActivityIndicator} from 'react-native';
import {format, isAfter, parse} from 'date-fns';
import Modal from 'react-native-modal';
import {
  handleAddData,
  handleRemoveData,
} from '../../store/eventsJoiningRequest';
import formatToJSON from '../../services/utilities/JsonLog';

export default function Home({navigation, route}) {
  const dispatch = useDispatch();
  const {userDetalis} = useSelector(state => state.userDetailsSlice);
  const test = useSelector(state => state.userDetailsSlice);
  const {isSignIn} = useSelector(state => state.isSignedInSlice);
  const [userData, setUserData] = useState({
    username: userDetalis?.username,
    _id: userDetalis?._id,
    userStatus: 'Online',
  });
  const [loader, setLoader] = useState(false);
  const [allEvent, setAllEvent] = useState([]);
  const [updatedUserDetails, setUpdatedUserDetails] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [eventJoinReqData, setEventJoinReqData] = useState([]);
  const [acceptModal, setAcceptModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [eventDeclineData, setEventDeclineData] = useState([]);
  const [eventAcceptedData, setEventAcceptedData] = useState([]);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [isMatch, setIsMatch] = useState(false);

  const [event, setEvent] = useState([
    'Food',
    'Coffee',
    'Drinks',
    'Sports',
    'Adventure',
    'Assistance',
    'Job',
    'Other',
  ]);

  const [selectedEvent, setSelectedEvent] = useState('');

  useEffect(() => {
    setLoader(true);
    if (test) {
      const _id = test.userDetalis?._id;
      handleGetUserDetails(_id);
    }
  }, [test]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      if (userDetalis) {
        const _id = test.userDetalis?._id;
        handleGetUserDetails(_id);
      }
    });
  }, [navigation]);

  const handleGetUserDetails = async _id => {
    if (test.userDetalis._id) {
      try {
        const {data} = await axios.post(backendURL + 'api/wincly/singleUser', {
          _id: _id,
        });
        if (data.message === 'User Data') {
          setUpdatedUserDetails(data.data);
          handleGetAllEvents(data.data.interest);
        }
      } catch (error) {
        console.log('errr-==-===-=-'.error.message);
        setLoader(false);
      }
    }
  };

  const handleGetAllEvents = async interest => {
    try {
      const {data} = await axios.get(backendURL + 'api/wincly/allEvent');

      const eventData = data.data;
      if (interest) {
        let filterevent = eventData.filter(
          event => event.eventOrganizerData._id !== userDetalis._id,
        );
        let filterForInterest = filterevent
          .filter(
            t =>
              t.eventOrganizerData.interest.filter(n => interest?.includes(n))
                .length > 0,
          )
          .filter(event => !isEventTimePassed(event))
          .filter(
            event =>
              !(
                event.eventParticipants &&
                event.eventParticipants.length === event.noOfPerson
              ),
          );
        setAllEvent(filterForInterest);
      }
      setLoader(false);
    } catch (error) {
      console.log('all event error', error);
      setLoader(false);
    }
  };

  const isEventTimePassed = event => {
    const {endDate, endTime} = event;

    if (!endDate || !endTime) {
      console.error('Missing endDate or endTime in event:', event);
      return false;
    }

    const [month, day, year] = endDate.split('-').map(Number);
    const [hours, minutes, period] = endTime
      .match(/(\d+):(\d+)\s*(\w+)/)
      .slice(1);

    const eventDate = parse(
      `${year}-${month}-${day}`,
      'yyyy-MM-dd',
      new Date(),
    );
    const eventTime = parse(
      `${hours}:${minutes} ${period}`,
      'h:mm a',
      new Date(),
    );

    const eventDateTime = new Date(
      eventDate.getFullYear(),
      eventDate.getMonth(),
      eventDate.getDate(),
      eventTime.getHours(),
      eventTime.getMinutes(),
    );

    const currentDateTime = new Date();
    return isAfter(currentDateTime, eventDateTime);
  };


  useEffect(() => {
    if (userDetalis) {
      socket.emit('set user', userData);
    }
  }, [userData]);

  const calculateTimeAgo = postTime => {
    const inputFormat = 'MM-dd-yyyy hh:mm a';
    const parsedDate = parse(postTime, inputFormat, new Date());
    const outputFormat = 'yyyy-MM-dd HH:mm';
    const targetDate1 = format(parsedDate, outputFormat);
    const targetDate = new Date(targetDate1);
    const currentDate = new Date();
    const timeDifference = currentDate - targetDate;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursAgo = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutesAgo = Math.floor((timeDifference / (1000 * 60)) % 60);
    if (daysAgo > 0) {
      return `${daysAgo} day ago`;
    } else if (hoursAgo > 0) {
      return `${hoursAgo} hour ago`;
    } else if (minutesAgo > 0) {
      return `${minutesAgo} minute ago`;
    } else {
      return 'Just now';
    }
  };
  const formatInterest = item => {
    const interest = item.eventOrganizerData.interest || [];
    const interest1 = '#' + interest.slice(0, 3).join(' #');
    const interest2 = interest.join(' #');
    return interest.length > 0 ? interest1 : interest2;
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={images.DrawerBtn} style={styles.headerImgIOS} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Interests');
            }}>
            <Image
              source={isMatch ? images.chatIcon : images.filterImg}
              style={isMatch ? styles.chatBtn : styles.headerImgIOS}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.row, styles.between]}>
          <View style={[styles.padding, styles.row]}>
            <Image
              source={{uri: userDetalis?.profileImg}}
              style={styles.profile}
            />
            <Text style={styles.username}>{userDetalis?.username}</Text>
          </View>
          <TouchableOpacity>
            <View style={[styles.padding, styles.row]}>
              <Image
                source={images.share}
                style={Platform.OS == 'ios' ? styles.shareIOS : styles.share}
              />
              <Text style={[styles.username, styles.underline]}>Invite</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Modal
          isVisible={isModalVisible}
          onRequestClose={() => {
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
            <Text style={styles.modalHeading}>Create Your Own Event</Text>
            <View style={styles.modalLine} />
            <Text style={styles.modalHeading2}>
              What tags best describe your event?
            </Text>
            <View style={styles.eventView}>
              {event.map((eventItem, index) => {
                return (
                  <View key={index} style={styles.eventOption}>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedEvent(eventItem);
                      }}>
                      {Platform.OS == 'ios' ? (
                        <View
                          style={
                            selectedEvent === eventItem
                              ? styles.btnTextFilled
                              : styles.eventBtnText
                          }>
                          <Text
                            style={
                              selectedEvent === eventItem
                                ? styles.btnTextFilledIOS
                                : styles.btnTextIOS
                            }>
                            {eventItem}
                          </Text>
                        </View>
                      ) : (
                        <Text
                          style={
                            selectedEvent === eventItem
                              ? styles.btnTextFilled
                              : styles.eventBtnText
                          }>
                          {eventItem}
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                );
              })}
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  navigation.navigate('UploadPost', {tag: selectedEvent});
                }}>
                <Text style={styles.modalBtnText}>
                  Confirm - {selectedEvent}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={styles.createPostBtn}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text style={styles.createPostText}>Create your own event</Text>
          <View style={[styles.padding]}>
            <Image source={images.photos} style={styles.photos} />
          </View>
        </TouchableOpacity>

        <View style={styles.forBtnTbs}></View>

        {loader ? (
          <View
            style={
              Platform.OS == 'ios' ? styles.loaderViewIOS : styles.loaderView
            }>
            <ActivityIndicator size={'large'} color={colors.appTextColor1} />
          </View>
        ) : allEvent.length > 0 ? (
          <ScrollView>
            {allEvent
              .map((item, index) => {
                const timeAgo = calculateTimeAgo(item.postTime);
                const formattedInterest = formatInterest(item);
                return (
                  <TouchableOpacity
                    style={styles.eventCard}
                    key={index}
                    onPress={() => {
                      navigation.navigate('EventDetails', {
                        item,
                        timeAgo,
                      });
                    }}>
                    <View style={styles.eventCardImgView}>
                      <Image
                        source={{uri: item.eventOrganizerData.profileImg}}
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
                    <Text style={styles.eventCardInterest}>
                      {formattedInterest}
                    </Text>
                    <Text numberOfLines={2} style={styles.eventCardDis}>
                      {item.eventDis}
                    </Text>
                    <Image
                      source={{uri: item.imageUri}}
                      style={styles.eventCardImg}
                    />
                  </TouchableOpacity>
                );
              })
              .reverse()}
            <View style={styles.marginBtm}></View>
          </ScrollView>
        ) : (
          <View style={styles.noPostView}>
            <Text style={styles.noPostText}>No events found</Text>
          </View>
        )}
      </View>
      
    </SafeAreaView>
  );
}
