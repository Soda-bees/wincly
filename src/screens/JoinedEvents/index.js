import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {styles} from './style';
import BackButton from '../../components/BackButton';
import {useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native';
import {colors} from '../../services';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import {format, parse} from 'date-fns';
import formatToJSON from '../../services/utilities/JsonLog';

export default function MyEvents({navigation}) {
  const {userDetalis} = useSelector(state => state.userDetailsSlice);

  const [allEvent, setAllEvent] = useState([]);
  const [loader, setLoader] = useState(false);
  const [updatedUserDetails, setUpdatedUserDetails] = useState();

  useEffect(() => {
    navigation.addListener('focus', () => {
      setLoader(true);
      handleGetUserDetails();
    });
  }, [navigation]);

  const handleGetUserDetails = async () => {
    // setLoader(true);
    try {
      const {data} = await axios.post(backendURL + 'api/wincly/singleUser', {
        _id: userDetalis._id,
      });
      if (data.message === 'User Data') {
        // console.log(formatToJSON(data.data.myParticipateEvent));
        setUpdatedUserDetails(data.data);
        let myEvents = data.data.myParticipateEvent;
        setAllEvent(myEvents);
        setLoader(false);
      } else {
        console.log(error.message);
        setLoader(false);
      }
    } catch (error) {
      console.log(error.message);
      setLoader(false);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <BackButton title={'Joined Events'} />
        </View>
        {loader ? (
          <View style={styles.loaderView}>
            <ActivityIndicator size={45} color={colors.appTextColor1} />
          </View>
        ) : allEvent?.length > 0 ? (
          <ScrollView>
            {allEvent.map((item, index) => {
              // console.log(index);
              const inputDateString = item.postTime;
              // console.log('before====', inputDateString);
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
              let timeAgo;
              if (daysAgo > 0) {
                timeAgo = `${daysAgo} day ago`;
              } else if (hoursAgo > 0) {
                timeAgo = `${hoursAgo} hour ago`;
              } else if (minutesAgo > 0) {
                timeAgo = `${minutesAgo} minute ago`;
              } else {
                timeAgo = 'Just now';
              }
              const interest = item.eventOrganizerData.interest.slice(0, 3);
              const interest1 = '#' + interest.join(' #');
              const interest2 = '' + interest.join(' #');
              return (
                <TouchableOpacity
                  style={styles.eventCard}
                  key={index}
                  onPress={() => {
                    navigation.navigate('JoinEventsDetails', {
                      item,
                      timeAgo,
                    });
                  }}

                  >
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
                    {interest.length > 0 ? interest1 : interest2}
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
            })}
            <View style={styles.marginBtm}></View>
          </ScrollView>
        ) : (
          <View style={styles.noEventTextView}>
            <Text style={styles.noEventText}>No events found</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
