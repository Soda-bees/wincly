import React, {useState, scrollViewRef, scrollToEnd, useEffect} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Platform,
  BackHandler,
  KeyboardAvoidingView,
} from 'react-native';
import {styles} from './style';
import images from '../../services/utilities/images';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import {useSelector} from 'react-redux';
import socket from '../../services/config/io';
import {ActivityIndicator} from 'react-native';
import {colors, sizes} from '../../services';
import formatToJSON from '../../services/utilities/JsonLog';

export default function ChatRoom({route, navigation}) {
  const {userDetalis} = useSelector(state => state.userDetailsSlice);

  const {chatId, isDeleted} = route.params;

  console.log('mere bhaaaai', isDeleted);

  const [message, setMessage] = useState('');
  const [userStatus, setUserStatus] = useState();
  const [oldMessage, setOldMessages] = useState([]);
  const [chatRoomData, setChatRoomData] = useState();
  const [updatedUserDetails, setUpdatedUserDetails] = useState();
  const [name, setName] = useState('');
  const [profile, setProfile] = useState();
  const [updatedUser2Details, setUpdatedUser2Details] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const handleCustomEvent = data => {
      if (chatId === data.chatroomId) {
        setOldMessages(oldMessage => [...oldMessage, data.data]);
        console.log('chatRoom done');
      }
    };

    socket.on('receiveMessage', handleCustomEvent);

    return () => {
      socket.off('receiveMessage', handleCustomEvent);
    };
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getUserDetails();
    });
  }, [navigation]);

  useEffect(() => {
    socket.on(`usersUserStatus`, data => {
      if (data.data._id === updatedUser2Details) {
        setUserStatus(data.data.userStatus);
      }
    });
  }, [updatedUser2Details]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  }, []);

  const handleBackButtonClick = () => {
    handleSetSeenTrue();
    handleSetOnline();
  };
  const handleSetSeenTrue = async () => {
    try {
      const {data} = await axios.post(backendURL + 'api/wincly/updateSeenKey', {
        _id: chatId,
        uid: userDetalis._id,
      });
      console.log('setUnreadData-------------->', data.message);
    } catch (error) {
      console.log('setUnreadError-------------->', error.message);
    }
  };
  const getUserDetails = async () => {
    try {
      console.log('works------------->>>>>>>>');
      const {data} = await axios.post(backendURL + 'api/wincly/singleUser', {
        _id: userDetalis._id,
      });
      if (data.message === 'User Data') {
        const currChatData = data.data.allChats.filter(
          obj => obj._id === chatId,
        );
        handleSetName(data.data, currChatData[0]);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSetTyping = async () => {
    const userData = {
      username: userDetalis.username,
      _id: userDetalis._id,
      userStatus: 'Typing...',
    };
    socket.emit('set user', userData);
  };
  const handleSetOnline = async () => {
    const userData = {
      username: userDetalis.username,
      _id: userDetalis._id,
      userStatus: 'Online',
    };
    socket.emit('set user', userData);
  };
  const handleSendMessage = async () => {
    handleSetOnline();

    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const todayDate = `${month}-${date}-${year}`;

    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    const period = currentHour >= 12 ? 'PM' : 'AM';
    const formattedHour = currentHour % 12 || 12;
    const formattedTime = `${String(formattedHour).padStart(2, '0')}:${String(
      currentMinute,
    ).padStart(2, '0')} ${period}`;

    const time = `${todayDate} ${formattedTime}`;
    try {
      const {data} = await axios.post(backendURL + 'api/wincly/sendMessage', {
        _id: chatId,
        obj: {
          uid: updatedUserDetails._id,
          message,
          time,
          seen: false,
        },
      });
      if (data.message === 'ad Message successfully!') {
        setMessage('');
        const obj = {
          data: data.data,
          chatroomId: data.chatroomId,
          receiverId: updatedUser2Details,
          name: updatedUserDetails.username,
        };
        socket.emit('sendMessage', obj);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSetName = (userData, chatData) => {
    if (userData?._id === chatData?.userDetails?._id) {
      const updatedName = chatData?.userDetails2?.username;
      const updatedProfile = chatData?.userDetails2?.profileImg;
      const updatedUser2 = chatData?.userDetails2;
      setProfile(updatedProfile);
      setName(updatedName);
      setUpdatedUserDetails(userData);
      setChatRoomData(chatData);
      setOldMessages(chatData?.messages);
      setUpdatedUser2Details(updatedUser2?._id);
      handleGetUser2UserStatus(updatedUser2?._id);
      handleSetSeenTrue();
    } else {
      const updatedName = chatData?.userDetails?.username;
      const updatedProfile = chatData?.userDetails?.profileImg;
      const updatedUser2 = chatData?.userDetails;
      setProfile(updatedProfile);
      setName(updatedName);
      setUpdatedUserDetails(userData);
      setChatRoomData(chatData);
      setOldMessages(chatData?.messages);
      setUpdatedUser2Details(updatedUser2?._id);
      handleGetUser2UserStatus(updatedUser2?._id);
      handleSetSeenTrue();
    }
  };
  const handleGetUser2UserStatus = async _id => {
    console.log(_id);
    try {
      const {data} = await axios.post(backendURL + 'api/wincly/singleUser', {
        _id,
      });
      if (data.message === 'User Data') {
        const status = data.data.userStatus;
        setUserStatus(status);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const scrollViewRef = React.useRef();
  return (
    <View style={[styles.container, Platform.OS == 'ios' && styles.topIOS]}>
      <View style={Platform.OS == 'ios' ? styles.chatBgIOS : styles.chatBg}>
        <View style={[styles.row, styles.padding]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              handleSetSeenTrue();
              handleSetOnline();
              setTimeout(() => {
                navigation.navigate('Chat');
              }, 400);
            }}>
            <Image source={images.backArrow} style={styles.backIcon} />
          </TouchableOpacity>
          <View>
            <Image source={{uri: profile}} style={styles.profile2} />
          </View>
          <View>
            <Text style={styles.username}>{name}</Text>
            <Text style={styles.status}>{userStatus}</Text>
          </View>
        </View>
      </View>

      <View style={styles.chatContainer}>
        <View style={{flex: 1}}>
          {loader ? (
            <View style={{flex: 1, marginTop: sizes.screenHeight * 0.05}}>
              <ActivityIndicator size={45} color={colors.appTextColor1} />
            </View>
          ) : (
            <ScrollView
              style={styles.scrollviewStyle}
              ref={scrollViewRef}
              nestedScrollEnabled={true}
              onContentSizeChange={(contentWidth, contentHeight) => {
                scrollViewRef.current?.scrollTo({y: contentHeight});
              }}>
              {oldMessage &&
                oldMessage.map((item, index) => {
                  // console.log(item);
                  return (
                    <View
                      key={index}
                      style={
                        item.uid === updatedUserDetails?._id
                          ? styles.mapViewWithUid
                          : styles.mapViewWithoutUid
                      }>
                      {/* <Image source={{ uri: profile }} style={{ width: sizes.screenWidth * 0.05, height: sizes.screenWidth * 0.05 }} /> */}
                      <View
                        style={
                          item.uid === updatedUserDetails?._id
                            ? styles.msgViewWithUid
                            : styles.msgViewWithoutUid
                        }>
                        <Text style={styles.msgText}>{item.message}</Text>
                      </View>
                    </View>
                  );
                })}
            </ScrollView>
          )}
          {isDeleted ? (
            <Text style={styles.textDelete}>This account is no longer available.</Text>
          ) : (
            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={sizes.screenWidth * 0.5}>
              <View
                style={
                  Platform.OS == 'android' ? styles.center : styles.centerIOS
                }>
                <View style={styles.searchView}>
                  <TextInput
                    placeholder="Write a message..."
                    style={
                      Platform.OS == 'android'
                        ? styles.searchInput
                        : styles.searchInputIOS
                    }
                    placeholderTextColor={'#656565'}
                    onChangeText={text => setMessage(text)}
                    multiline={true}
                    numberOfLines={4}
                    value={message}
                    onFocus={handleSetTyping}
                    onBlur={handleSetOnline}
                  />
                  <TouchableOpacity
                    style={
                      Platform.OS == 'android'
                        ? styles.sendBtn
                        : styles.sendBtnIOS
                    }
                    onPress={() => {
                      message && handleSendMessage();
                    }}>
                    <Image source={images.sendMsgImg} style={styles.sendImg} />
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          )}
        </View>
      </View>
    </View>
  );
}
