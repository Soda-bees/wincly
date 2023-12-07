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
import { ActivityIndicator } from 'react-native-paper';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import { format, parse } from "date-fns"
import { useSelector } from 'react-redux';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';

export default function JoinEventsDetails({ route, navigation }) {
  const { item, timeAgo } = route.params;
  const userData = useSelector(state => state.userDetailsSlice.userDetalis);

  const [loader, setLoader] = useState(false);
  const [isReview, setIsReview] = useState(false)
  useEffect(() => {
    DateComparison(item)
  }, [])

  function DateComparison(item) {
    const time = `${item.endDate} ${item.endTime}`
    const targetDateString = time;
    const targetDate = parse(targetDateString, 'MM-dd-yyyy h:mm a', new Date());

    // Get the current date and time
    const currentDate = new Date();

    // Compare the two dates
    if (targetDate < currentDate) {
      console.log('The target time is in the past.');
      setIsReview(true)
    } else {
      console.log('The target time is in the future.');
      setIsReview(false)
    }
  }

  const handleConfirm = () => {
    //   const time = `${item.endDate} ${item.endTime}`
    //   console.log(time);
    //   DateComparison(item) 
    navigation.navigate('Review', {
      item: item.eventOrganizerData,
      eventData:item
    });
  };

  const handleNavigateChat = async (_id) => {
    const _id1 = _id;
    const _id2 = userData._id
    try {
      const { data } = await axios.post(backendURL + "api/wincly/findExistingChatroom", {
        _id1,
        _id2
      })
      console.log(data);
      if (data.success) {
        navigation.navigate('ChatRoom', { chatId: data.chatId })
      }
    } catch (error) {
      console.log(error);
    }
  }
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
            <Text style={styles.interestText}>Events Participations</Text>
            <View>
              {item.eventParticipants.map((item, index) => {
                return (
                  <View key={index} style={styles.eventParticipantsView}>
                    <View style={styles.flexRow}>
                      <Image
                        source={{ uri: item.profileImg }}
                        style={styles.eventParticipantsProfile}
                      />
                      <View style={styles.eventParticipantsInnerView}>
                        <Text style={styles.eventParticipantsUsername}>
                          {
                            item._id === userData._id ? `You` : item.username
                          }
                          {/* {item.username} */}
                        </Text>
                        <View style={styles.locationView}>
                          <Image
                            source={images.location}
                            style={styles.locationImg}
                          />
                          <Text style={styles.locationText}>{item.location}</Text>
                        </View>
                      </View>

                    </View>
                    {
                      item._id !== userData._id &&
                      // <TouchableOpacity>
                      //   <Text style={styles.eventParticipantsMessageBtn}>
                      //     Message
                      //   </Text>
                      // </TouchableOpacity>
                      <TouchableOpacity onPress={() => { handleNavigateChat(item._id) }}>
                        <Image source={images.chatIcon} style={styles.chatIcon} />
                      </TouchableOpacity>
                    }
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
        <View style={Platform.OS == 'ios' ? styles.btnViewIOS : styles.btnView}>
          {loader ? (
            <View style={styles.loader}>
              <ActivityIndicator size="small" color="#000" />
            </View>
          )
            : isReview && (
              <Button title={'Post a review'} onPress={handleConfirm} />
            )}
        </View>
      </View>
    </SafeAreaView>
  );
}
