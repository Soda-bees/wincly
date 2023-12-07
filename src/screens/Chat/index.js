import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './style';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import Feather from 'react-native-vector-icons/Feather';
import { colors, fontSize, sizes } from '../../services';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import socket from '../../services/config/io';
import formatToJSON from '../../services/utilities/JsonLog';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { parse, format, isDate, isValid, isToday } from 'date-fns';

export default function Chat({ navigation }) {
  const { userDetalis } = useSelector(state => state.userDetailsSlice);
  const route = useRoute();
  const [message, setMessage] = useState([
    {
      imageURI: images.msgImg1,
      name: 'James',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit Proin...',
      time: '19:00',
    },
    {
      imageURI: images.msgImg2,
      name: 'Benjamin',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit Proin...',
      time: '19:00',
    },
    {
      imageURI: images.msgImg3,
      name: 'Charles',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit Proin...',
      time: '19:00',
    },
    {
      imageURI: images.msgImg4,
      name: 'David',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit Proin...',
      time: '19:00',
    },
    {
      imageURI: images.msgImg5,
      name: 'Harry',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit Proin aliquam lacus vel...',
      time: '19:00',
    },
    {
      imageURI: images.msgImg6,
      name: 'John Doe',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit Proin aliquam lacus vel...',
      time: '19:00',
    },
  ]);
  const [search, setSearch] = useState('');
  const [loader, setLoader] = useState(false);
  const [allChatData, setAllChatData] = useState([]);
  const [unreadMsg, setUnreadMsg] = useState('');
  const [currUserDetails, setCurrUserDetails] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = () => { };

  useEffect(() => {

    navigation.addListener('focus', () => {
      getSingleUserDetails();
    });
  }, [navigation]);


  useEffect(() => {
    const handleCustomEvent = data => {
      // console.log("socket data chat", data);
      const newAllChat = [...allChatData]
      // // console.log(formatToJSON(newAllChat));
      const object = newAllChat.find(obj => obj._id === data.chatroomId);
      if (object) {
        // console.log('object found in chat screen');
        // console.log('Focused screen name:', route.name);
        object.messages.push(data.data);
        setAllChatData(newAllChat);
        console.log('chat Push done');
      }
    };

    socket.on('receiveMessageForInbox', handleCustomEvent);

    return () => {
      socket.off('receiveMessageForInbox', handleCustomEvent);
    };
  }, [allChatData]);

  const getSingleUserDetails = async () => {
    try {
      const { data } = await axios.post(backendURL + 'api/wincly/singleUser', {
        _id: userDetalis._id,
      });
      setCurrUserDetails(data.data);
      setAllChatData(data.data.allChats);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const parseTime = (timeString) => {
    try {
      const parsedTime = parse(timeString, 'MM-dd-yyyy hh:mm a', new Date());
      return isValid(parsedTime) ? parsedTime.getTime() : null;
    } catch (error) {
      console.error('Error parsing time:', error);
      return null;
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              source={images.DrawerBtn}
              style={
                Platform.OS == 'ios' ? styles.DrawerBtnIOS : styles.DrawerBtn
              }
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Inbox</Text>
        </View>
        {allChatData.length > 0 && (
          <View style={styles.top}>
            <TextInput
              placeholder="Search"
              style={Platform.OS == 'ios' ? styles.inputIOS : styles.input}
              placeholderTextColor={colors.disabledBg2}
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
            <TouchableOpacity
              style={{
                bottom:
                  Platform.OS == 'ios'
                    ? sizes.screenHeight * 0.045
                    : sizes.screenHeight * 0.048,
                alignSelf: 'flex-end',
                right:
                  Platform.OS == 'ios'
                    ? sizes.screenWidth * 0.15
                    : sizes.screenWidth * 0.1,
              }}
              onPress={handleSearch}>
              <Feather
                name={'search'}
                color={colors.appTextColor1}
                size={20}
                style={{
                  alignSelf: 'flex-end',
                }}
              />
            </TouchableOpacity>
          </View>
        )}

        {loader ? (
          <View style={Platform.OS == 'ios' ? styles.loaderViewIOS : styles.loaderView}>
            <ActivityIndicator size={'large'} color={colors.appTextColor1} />
          </View>
        ) : allChatData.length > 0 ? (
          <ScrollView>
            {/* normal map */}
            {/* <View style={{ alignSelf: 'center' }}>
              {allChatData
                
                .map((item, index) => {
                  console.log(item.messages.length);
                  const length = item.messages.length - 1;
                  const oppositeMessage = item.messages?.filter(
                    obj => obj.uid !== userDetalis._id,
                  );
                  const oppositeMessageLength = oppositeMessage.length - 1;
                  const seen = oppositeMessage[oppositeMessageLength]?.seen;
                  const unseenMessages = oppositeMessage.filter(obj => obj.seen === false);
                  // console.log(unseenMessages.length);
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        navigation.navigate('ChatRoom', { chatId: item._id }
                          // , {
                          //   item,
                          //   currUserDetails,
                          // }
                        )
                      }>
                      <View style={styles.mapView}>
                        <View style={styles.mapInnerView}>
                          <View
                            style={
                              Platform.OS == 'ios'
                                ? styles.mapImageViewIOS
                                : styles.mapImageView
                            }>
                            <Image
                              source={
                                item.userDetails._id === userDetalis._id
                                  ? { uri: item.userDetails2.profileImg }
                                  : { uri: item.userDetails.profileImg }
                              }
                              style={
                                Platform.OS == 'ios'
                                  ? styles.mapImageIOS
                                  : styles.mapImage
                              }
                            />
                          </View>
                          <View>
                            <Text style={styles.text1}>
                              {item.userDetails._id === userDetalis._id
                                ? item.userDetails2.username
                                : item.userDetails.username}
                            </Text>
                            <Text style={styles.text2} numberOfLines={2}>
                              {item?.messages[length]?.message}
                            </Text>
                          </View>
                        </View>
                        <View
                        // style={{backgroundColor:"pink"}}
                        >
                          <Text style={styles.time}>
                            {item?.messages[length]?.time}
                          </Text>
                          {seen === false && (
                            <View style={styles.seenView}>
                              <Text style={styles.seenViewText}>{unseenMessages.length}</Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
            </View> */}

            {/* map with sort based on unseen message */}
            {/* <View style={{ alignSelf: 'center' }}>
              {allChatData
                .map(item => {
                  const messages = item.messages || [];
                  const oppositeMessage = messages.filter(obj => obj.uid !== userDetalis._id);
                  const unseenMessages = oppositeMessage.filter(obj => obj.seen === false);
                  return {
                    chatItem: item,
                    unseenMessagesLength: unseenMessages.length,
                    lastMessage: messages.length > 0 ? messages[messages.length - 1].message : '',
                    lastMessageTime: messages.length > 0 ? messages[messages.length - 1].time : '',
                  };
                })
                .sort((a, b) => b.unseenMessagesLength - a.unseenMessagesLength)
                .map(({ chatItem, unseenMessagesLength, lastMessage, lastMessageTime }, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate('ChatRoom', { chatId: chatItem._id })}>
                    <View style={styles.mapView}>
                      <View style={styles.mapInnerView}>
                        <View
                          style={
                            Platform.OS == 'ios'
                              ? styles.mapImageViewIOS
                              : styles.mapImageView
                          }>
                          <Image
                            source={
                              chatItem.userDetails._id === userDetalis._id
                                ? { uri: chatItem.userDetails2.profileImg }
                                : { uri: chatItem.userDetails.profileImg }
                            }
                            style={
                              Platform.OS == 'ios'
                                ? styles.mapImageIOS
                                : styles.mapImage
                            }
                          />
                        </View>
                        <View>
                          <Text style={styles.text1}>
                            {chatItem.userDetails._id === userDetalis._id
                              ? chatItem.userDetails2.username
                              : chatItem.userDetails.username}
                          </Text>
                          <Text style={styles.text2} numberOfLines={2}>
                            {lastMessage}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text style={styles.time}>
                          {lastMessageTime}
                        </Text>
                        {unseenMessagesLength > 0 && lastMessage && chatItem.messages && chatItem.messages.length > 0 &&
                          chatItem.messages[chatItem.messages.length - 1].seen === false && (
                            <View style={styles.seenView}>
                              <Text style={styles.seenViewText}>{unseenMessagesLength}</Text>
                            </View>
                          )}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
            </View> */}

            {/* map with sort based on unseen message with search functionality */}
            {/* <View style={{ alignSelf: 'center' }}>
              {allChatData
                .map(item => {
                  const messages = item.messages || [];
                  const oppositeMessage = messages.filter(obj => obj.uid !== userDetalis._id);
                  const unseenMessages = oppositeMessage.filter(obj => obj.seen === false);
                  return {
                    chatItem: item,
                    unseenMessagesLength: unseenMessages.length,
                    lastMessage: messages.length > 0 ? messages[messages.length - 1].message : '',
                    lastMessageTime: messages.length > 0 ? messages[messages.length - 1].time : '',
                  };
                })
                .filter(({ chatItem }) => {
                  // Filter based on search query
                  const searchString = searchQuery.toLowerCase();
                  const username = chatItem.userDetails._id === userDetalis._id
                    ? chatItem.userDetails2.username.toLowerCase()
                    : chatItem.userDetails.username.toLowerCase();
                  return username.includes(searchString);
                })
                .sort((a, b) => b.unseenMessagesLength - a.unseenMessagesLength)
                .map(({ chatItem, unseenMessagesLength, lastMessage, lastMessageTime }, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate('ChatRoom', { chatId: chatItem._id })}>
                    <View style={styles.mapView}>
                      <View style={styles.mapInnerView}>
                        <View
                          style={
                            Platform.OS == 'ios'
                              ? styles.mapImageViewIOS
                              : styles.mapImageView
                          }>
                          <Image
                            source={
                              chatItem.userDetails._id === userDetalis._id
                                ? { uri: chatItem.userDetails2.profileImg }
                                : { uri: chatItem.userDetails.profileImg }
                            }
                            style={
                              Platform.OS == 'ios'
                                ? styles.mapImageIOS
                                : styles.mapImage
                            }
                          />
                        </View>
                        <View>
                          <Text style={styles.text1}>
                            {chatItem.userDetails._id === userDetalis._id
                              ? chatItem.userDetails2.username
                              : chatItem.userDetails.username}
                          </Text>
                          <Text style={styles.text2} numberOfLines={2}>
                            {lastMessage}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text style={styles.time}>
                          {lastMessageTime}
                        </Text>
                        {unseenMessagesLength > 0 && lastMessage && chatItem.messages && chatItem.messages.length > 0 &&
                          chatItem.messages[chatItem.messages.length - 1].seen === false && (
                            <View style={styles.seenView}>
                              <Text style={styles.seenViewText}>{unseenMessagesLength}</Text>
                            </View>
                          )}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
            </View> */}

            {/* sort chats according to date time  */}
            {/* <View style={{ alignSelf: 'center' }}>
              {allChatData
                .map(item => {
                  const messages = item.messages || [];
                  const oppositeMessage = messages.filter(obj => obj.uid !== userDetalis._id);
                  const unseenMessages = oppositeMessage.filter(obj => obj.seen === false);
                  return {
                    chatItem: item,
                    unseenMessagesLength: unseenMessages.length,
                    lastMessage: messages.length > 0 ? messages[messages.length - 1].message : '',
                    lastMessageTime: messages.length > 0 ? messages[messages.length - 1].time : '',
                  };
                })
                .filter(({ chatItem }) => {
                  const searchString = searchQuery.toLowerCase();
                  const username = chatItem.userDetails._id === userDetalis._id
                    ? chatItem.userDetails2.username.toLowerCase()
                    : chatItem.userDetails.username.toLowerCase();
                  return username.includes(searchString);
                })
                .sort((a, b) => {
                  const timeA = parseTime(a.lastMessageTime);
                  const timeB = parseTime(b.lastMessageTime);

                  if (isValid(timeA) && isValid(timeB)) {
                    if (isToday(timeA) && !isToday(timeB)) {
                      return -1; 
                    } else if (!isToday(timeA) && isToday(timeB)) {
                      return 1;
                    } else {
                      return timeB - timeA;
                    }
                  }

                  return 0;
                })
                .map(({ chatItem, unseenMessagesLength, lastMessage, lastMessageTime }, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate('ChatRoom', { chatId: chatItem._id })}>
                    <View style={styles.mapView}>
                      <View style={styles.mapInnerView}>
                        <View
                          style={
                            Platform.OS == 'ios'
                              ? styles.mapImageViewIOS
                              : styles.mapImageView
                          }>
                          <Image
                            source={
                              chatItem.userDetails._id === userDetalis._id
                                ? { uri: chatItem.userDetails2.profileImg }
                                : { uri: chatItem.userDetails.profileImg }
                            }
                            style={
                              Platform.OS == 'ios'
                                ? styles.mapImageIOS
                                : styles.mapImage
                            }
                          />
                        </View>
                        <View>
                          <Text style={styles.text1}>
                            {chatItem.userDetails._id === userDetalis._id
                              ? chatItem.userDetails2.username
                              : chatItem.userDetails.username}
                          </Text>
                          <Text style={styles.text2} numberOfLines={2}>
                            {lastMessage}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text style={styles.time}>
                          {isValid(parseTime(lastMessageTime)) ? format(parseTime(lastMessageTime), 'hh:mm a') : ''}
                        </Text>
                        {unseenMessagesLength > 0 && lastMessage && chatItem.messages && chatItem.messages.length > 0 &&
                          chatItem.messages[chatItem.messages.length - 1].seen === false && (
                            <View style={styles.seenView}>
                              <Text style={styles.seenViewText}>{unseenMessagesLength}</Text>
                            </View>
                          )}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
            </View> */}
            <View style={{ alignSelf: 'center' }}>
              {allChatData
                .map(item => {
                  const messages = item.messages || [];
                  const oppositeMessage = messages.filter(obj => obj.uid !== userDetalis._id);
                  const unseenMessages = oppositeMessage.filter(obj => obj.seen === false);
                  return {
                    chatItem: item,
                    unseenMessagesLength: unseenMessages.length,
                    lastMessage: messages.length > 0 ? messages[messages.length - 1].message : '',
                    lastMessageTime: messages.length > 0 ? messages[messages.length - 1].time : '',
                  };
                })
                .filter(({ chatItem }) => {
                  // Filter based on search query
                  const searchString = searchQuery.toLowerCase();
                  const username = chatItem.userDetails._id === userDetalis._id
                    ? chatItem.userDetails2.username.toLowerCase()
                    : chatItem.userDetails.username.toLowerCase();
                  return username.includes(searchString);
                })
                .sort((a, b) => {
                  // Convert time strings to timestamps using date-fns
                  const timeA = parseTime(a.lastMessageTime);
                  const timeB = parseTime(b.lastMessageTime);

                  // If both times are valid, sort by today's date first, then by time
                  if (isValid(timeA) && isValid(timeB)) {
                    if (isToday(timeA) && !isToday(timeB)) {
                      return -1; // A is today, move it to the top
                    } else if (!isToday(timeA) && isToday(timeB)) {
                      return 1; // B is today, move it to the top
                    } else {
                      return timeB - timeA; // Both are today or both are not today, sort by time
                    }
                  }

                  // If one or both times are not valid, don't change their order
                  return 0;
                })
                .map(({ chatItem, unseenMessagesLength, lastMessage, lastMessageTime }, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate('ChatRoom', { chatId: chatItem._id })}>
                    <View style={styles.mapView}>
                      <View style={styles.mapInnerView}>
                        <View
                          style={
                            Platform.OS == 'ios'
                              ? styles.mapImageViewIOS
                              : styles.mapImageView
                          }>
                          <Image
                            source={
                              chatItem.userDetails._id === userDetalis._id
                                ? { uri: chatItem.userDetails2.profileImg }
                                : { uri: chatItem.userDetails.profileImg }
                            }
                            style={
                              Platform.OS == 'ios'
                                ? styles.mapImageIOS
                                : styles.mapImage
                            }
                          />
                        </View>
                        <View>
                          <Text style={styles.text1}>
                            {chatItem.userDetails._id === userDetalis._id
                              ? chatItem.userDetails2.username
                              : chatItem.userDetails.username}
                          </Text>
                          <Text style={styles.text2} numberOfLines={2}>
                            {lastMessage}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text style={styles.time}>
                          {isValid(parseTime(lastMessageTime)) ? format(parseTime(lastMessageTime), 'hh:mm a') : ''}
                        </Text>
                        {unseenMessagesLength > 0 && lastMessage && chatItem.messages && chatItem.messages.length > 0 &&
                          chatItem.messages[chatItem.messages.length - 1].seen === false && (
                            <View style={styles.seenView}>
                              <Text style={styles.seenViewText}>{unseenMessagesLength}</Text>
                            </View>
                          )}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
            <View
              style={
                Platform.OS == 'ios'
                  ? styles.paddingBottomIOS
                  : styles.paddingBottom
              }></View>
          </ScrollView>
        ) : (
          <View
            style={Platform.OS == 'ios' ? styles.noChatViewIOS : styles.noChatView}
          >
            <Text
              style={styles.noChatText}
            >
              Your inbox is currently empty. There are no messages to display at
              this time.
            </Text>
          </View>
        )}
        <View style={styles.btm}></View>
      </View>
    </SafeAreaView>
  );
}
