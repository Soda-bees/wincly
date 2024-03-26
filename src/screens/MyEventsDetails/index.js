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
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import messaging from '@react-native-firebase/messaging';

export default function MyEventDetails({ route, navigation }) {
  const { item, timeAgo } = route.params;
  const [loader, setLoader] = useState(false);


  const handleNavigateChatroom = async (_id) => {
    const _id1 = _id;
    const _id2 = item.eventOrganizerData._id
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
  const handleSuccessfulEvent = () => {
    // console.log(formatToJSON(item?.eventParticipants));
    navigation.navigate("SuccessfulEvent", { item })
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
            {console.log(item.eventParticipants.length)}
            {
              item?.eventParticipants?.length > 0 &&
              <Text style={styles.interestText}>Events Participants</Text>
            }
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
                          {item.username}
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
                    <TouchableOpacity onPress={() => {
                      handleNavigateChatroom(item._id)
                    }}>
                      <Image source={images.chatIcon} style={styles.chatIcon} />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
            <View style={styles.buttonMargin}>
              <Button title={'Share Experience'}
                onPress={handleSuccessfulEvent} />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
