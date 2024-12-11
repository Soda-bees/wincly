import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BackButton from '../../components/BackButton';
import {styles} from './style';
import {useSelector} from 'react-redux';
import images from '../../services/utilities/images';
import {colors} from '../../services';
import DatePicker from 'react-native-date-picker';
import {
  format,
  set,
  parse,
  differenceInHours,
  differenceInSeconds,
  add,
} from 'date-fns';
import {ActivityIndicator} from 'react-native-paper';
import Button from '../../components/Button';
import {launchImageLibrary} from 'react-native-image-picker';
import backendURL from '../../services/config/backendURL';
import axios from 'axios';
import Modal from 'react-native-modal';
import Timer from '../../components/Timer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function UploadPost({route, navigation}) {
  const {userDetalis} = useSelector(state => state.userDetailsSlice);
  const [imageUri, setImageUri] = useState();
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [startTimeOpen, setStartTimeOpen] = useState(false);
  const [endTimeOpen, setEndTimeOpen] = useState(false);
  const [startDate, setStartDate] = useState('MM DD YY');
  const [endDate, setEndDate] = useState('MM DD YY');
  const [startTime, setStartTime] = useState('00:00PM');
  const [endTime, setEndTime] = useState('00:00PM');
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [time2, setTime2] = useState(new Date());
  const [loader, setLoader] = useState(false);
  const [eventDis, setEventDis] = useState('');
  const [noOfPerson, setNoOfPerson] = useState();
  const [updatedUserDetails, setUpdatedUserDetails] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [postTime, setPostTime] = useState();
  const [isNoOfPerson, setIsNoOfPerson] = useState(false);
  const [isPost, setIsPost] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(50);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    navigation.addListener('focus', () => {
      setLoader(true);
      getCurrentDateAndTime();
      getSingleUserData();
      getLastEvent();
    });
  }, [navigation]);

  const getLastEvent = async () => {
    const _id = userDetalis._id;
    try {
      const {data} = await axios.post(backendURL + 'api/wincly/getEvent', {
        _id,
      });
      console.log(data);
      if (data.success) {
        console.log(data.postTime);
        DateComparison(data.postTime);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function DateComparison(item) {
    const targetDateString = item;
    const targetDate = parse(targetDateString, 'MM-dd-yyyy h:mm a', new Date());

    const currentDate = new Date();

    const hoursDifference = differenceInHours(currentDate, targetDate);

    // console.log(`Difference in hours: ${hoursDifference}`);

    if (hoursDifference >= 24) {
      // console.log('The target time is more than 24 hours in the past.');
      setIsPost(false);
    } else {
      // console.log('The target time is within the last 24 hours.');
      setIsPost(true);
      getRemainingTime(targetDateString);
    }
  }

  function getRemainingTime(targetTime) {
    // Parse the target time
    const targetDate = parse(targetTime, 'MM-dd-yyyy h:mm a', new Date());

    // Get the current date and time
    const currentDate = new Date();

    // Calculate the time difference in seconds
    const timeDifferenceInSeconds = differenceInSeconds(
      currentDate,
      targetDate,
    );

    // Calculate the remaining time in hours, minutes, and seconds
    const remainingHours = Math.floor(timeDifferenceInSeconds / 3600);
    const remainingMinutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
    const remainingSeconds = timeDifferenceInSeconds % 60;

    // Calculate the differences

    const hoursDifference = 23 - remainingHours;
    const minutesDifference = 59 - remainingMinutes;
    const secondsDifference = 59 - remainingSeconds;

    console.log('hoursDifference-=-=-==--=', hoursDifference);
    console.log('minutesDifference-=-=-==--=', minutesDifference);
    console.log('secondsDifference-=-=-==--=', secondsDifference);

    setHours(hoursDifference);
    setMinutes(minutesDifference);
    setSeconds(secondsDifference);

    return {
      hours: hoursDifference,
      minutes: minutesDifference,
      seconds: secondsDifference,
    };
  }

  const getSingleUserData = async () => {
    try {
      const {data} = await axios.post(backendURL + 'api/wincly/singleUser', {
        _id: userDetalis._id,
      });
      setUpdatedUserDetails(data.data);
      setLoader(false);
    } catch (error) {
      console.log(error.message);
      setLoader(false);
    }
  };

  const getCurrentDateAndTime = () => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const todayDate = `${month}-${date}-${year}`;

    const date2 = new Date();
    const time = date2.toLocaleString([], {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    const period = currentHour >= 12 ? 'PM' : 'AM';
    const formattedHour = currentHour % 12 || 12;
    const formattedTime = `${String(formattedHour).padStart(2, '0')}:${String(
      currentMinute,
    ).padStart(2, '0')} ${period}`;

    setStartDate(todayDate);
    setEndDate(todayDate);
    setStartTime(time);
    setEndTime(time);
    setPostTime(`${todayDate} ${formattedTime}`);
    setLoader(false);
  };
  const handleSetStartDate = selectedDate => {
    setStartDateOpen(false);
    let date1 = new Date(selectedDate);
    let formattedDate = format(date1, 'MM-dd-yyyy');
    setStartDate(formattedDate);
  };

  const handleSetEndDate = selectedDate => {
    setEndDateOpen(false);
    let date1 = new Date(selectedDate);
    let formattedDate = format(date1, 'MM-dd-yyyy');
    setEndDate(formattedDate);
  };

  const handleSetStartTime = selectedTime => {
    setStartTimeOpen(false);
    console.log(selectedTime);
    let date1 = new Date(selectedTime);
    const formattedTime = format(date1, 'hh:mm a');
    console.log('---------->>>', formattedTime);
    setStartTime(formattedTime);
  };
  const handleSetEndTime = selectedTime => {
    setEndTimeOpen(false);
    console.log(selectedTime);
    let date1 = new Date(selectedTime);
    const formattedTime = format(date1, 'hh:mm a');
    console.log('---------->>>', formattedTime);
    setEndTime(formattedTime);
  };

  const imageGalleryLaunch = () => {
    setLoader(true);
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
        setLoader(false);
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
        setLoader(false);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        setLoader(false);
        alert(res.customButton);
      } else {
        const uri = res.assets[0].uri;
        const type = 'image/jpg';
        const name = userDetalis.username;
        const source = {uri, type, name};
        // setLoader(true);
        const data = new FormData();
        data.append('file', source);
        data.append('upload_preset', 'rdyn9jx7');
        data.append('cloud_name', 'doohobw9k');
        fetch('https://api.cloudinary.com/v1_1/doohobw9k/image/upload', {
          method: 'POST',
          body: data,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(res => res.json())
          .then(data => {
            let img = data.url.slice(0, 4) + 's' + data.url.slice(4);
            setImageUri(img);
            setLoader(false);
          })
          .catch(err => {
            setLoader(false);
            console.log('error====>', err);
            alert('Image not Upload! try again.');
          });
      }
    });
  };
  const handleConfirm = async () => {
    const obj = {
      imageUri,
      eventDis,
      startDate,
      endDate,
      startTime,
      endTime,
      noOfPerson,
      title,
      postTime,
      tag: route?.params?.tag,
      eventOrganizerData: updatedUserDetails._id,
      eventParticipants: [],
    };

    if (noOfPerson) {
      if (noOfPerson == 0) {
        setIsNoOfPerson(true);
      } else {
        setIsNoOfPerson(false);
        try {
          const {data} = await axios.post(
            backendURL + 'api/wincly/uploadEvent',
            {
              obj,
            },
          );
          console.log(data);
          if (data.message === 'Event add successfully!') {
            setTimeout(() => {
              setModalVisible(!isModalVisible);
              setLoader(false);
            }, 700);
            setLoader(true);
          }
        } catch (error) {
          console.log(error);
          setLoader(false);
        }
      }
    } else {
      setIsNoOfPerson(true);
    }
  };

  const handleModalConfirm = () => {
    navigation.navigate('Home');
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <BackButton title={'Create Event'} />

        <View style={styles.profileView}>
          <Image
            source={{uri: userDetalis.profileImg}}
            style={styles.profile}
          />
          <Text style={styles.username}>{userDetalis.username}</Text>
        </View>
        {/* <ScrollView>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
          // behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
          > */}
        <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={100}>
          <View>
            <TouchableOpacity onPress={imageGalleryLaunch}>
              <Image
                source={imageUri ? {uri: imageUri} : images.backgroundImg}
                style={styles.uploadImg}
              />
            </TouchableOpacity>
            <TextInput
              placeholder="Event title"
              style={styles.titleInput}
              placeholderTextColor={colors.disabledBg2}
              value={title}
              onChangeText={text => setTitle(text)}
            />
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder="Event description"
              placeholderTextColor={colors.disabledBg2}
              style={
                Platform.OS == 'ios' ? styles.ratingInput : styles.ratingInput
              }
              value={eventDis}
              onChangeText={text => setEventDis(text)}
            />
            <TextInput
              placeholder="No of persons"
              style={isNoOfPerson ? styles.personInput2 : styles.personInput}
              placeholderTextColor={colors.disabledBg2}
              value={noOfPerson}
              onChangeText={text => setNoOfPerson(text)}
              keyboardType="numeric"
            />

            <TouchableOpacity
              style={styles.startDateView}
              onPress={() => setStartDateOpen(true)}>
              <View style={styles.insideStartDateView1}>
                <Image source={images.date} style={styles.dateImg} />

                <View style={styles.insideStartDateView}>
                  <Text style={styles.text1}>Start date</Text>

                  <View>
                    <Text style={styles.dropItem}>{startDate}</Text>
                  </View>
                </View>
              </View>
              <Image source={images.dropIcon2} style={styles.dropImg} />
              <DatePicker
                modal
                open={startDateOpen}
                date={date}
                mode="date"
                onConfirm={date => {
                  handleSetStartDate(date);
                }}
                onCancel={() => {
                  setStartDateOpen(false);
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.startDateView}
              onPress={() => setEndDateOpen(true)}>
              <View style={styles.insideStartDateView1}>
                <Image source={images.date} style={styles.dateImg} />

                <View style={styles.insideStartDateView}>
                  <Text style={styles.text1}>End date</Text>

                  <View>
                    <Text style={styles.dropItem}>{endDate}</Text>
                  </View>
                </View>
              </View>
              <Image source={images.dropIcon2} style={styles.dropImg} />
              <DatePicker
                modal
                open={endDateOpen}
                date={date2}
                mode="date"
                onConfirm={date => {
                  handleSetEndDate(date);
                }}
                onCancel={() => {
                  setEndDateOpen(false);
                }}
              />
            </TouchableOpacity>

            <View style={styles.timeView}>
              <TouchableOpacity
                style={styles.startTimeView}
                onPress={() => setStartTimeOpen(true)}>
                <View style={styles.insideStartDateView1}>
                  <Image source={images.time} style={styles.dateImg} />

                  <View style={styles.insideStartDateView}>
                    <Text style={styles.text1}>Start time</Text>

                    <View>
                      <Text style={styles.dropItem2}>{startTime}</Text>
                    </View>
                  </View>
                </View>
                <Image source={images.dropIcon2} style={styles.dropImg} />
                <DatePicker
                  modal
                  open={startTimeOpen}
                  date={time}
                  mode="time"
                  onConfirm={time => {
                    handleSetStartTime(time);
                  }}
                  onCancel={() => {
                    setStartTimeOpen(false);
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.startTimeView}
                onPress={() => setEndTimeOpen(true)}>
                <View style={styles.insideStartDateView1}>
                  <Image source={images.time} style={styles.dateImg} />

                  <View style={styles.insideStartDateView}>
                    <Text style={styles.text1}>End time</Text>

                    <View>
                      <Text style={styles.dropItem2}>{endTime}</Text>
                    </View>
                  </View>
                </View>
                <Image source={images.dropIcon2} style={styles.dropImg} />
                <DatePicker
                  modal
                  open={endTimeOpen}
                  date={time2}
                  mode="time"
                  onConfirm={time => {
                    handleSetEndTime(time);
                  }}
                  onCancel={() => {
                    setEndTimeOpen(false);
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
        {/* </KeyboardAvoidingView>
        </ScrollView> */}
        <View style={Platform.OS == 'ios' ? styles.btnViewIOS : styles.btnView}>
          {loader ? (
            <View style={styles.loader}>
              <ActivityIndicator size="small" color="#000" />
            </View>
          ) : (
            <Button
              title={
                route?.params?.tag == 'Other'
                  ? 'Post'
                  : `Offer ${route?.params?.tag}`
              }
              onPress={handleConfirm}
            />
          )}
        </View>
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalView}>
          <Image source={images.checkmark} style={styles.checkmark} />

          <Text style={styles.modelText}>
            {' '}
            <Text style={styles.blueText}> Event Uploaded! </Text>your event has
            been uploaded succesfully
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

      <Modal isVisible={isPost}>
        <View style={styles.noPostModal}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={styles.noPostModalText}>{`You can post again in `}</Text>
            <Timer
              minutes={minutes}
              setMinutes={setMinutes}
              seconds={seconds}
              setSeconds={setSeconds}
              hours={hours}
              setHours={setHours}
            />
            <Text style={styles.noPostModalText}> hours.</Text>
          </View>
          <View style={styles.noPostModalBtnView}>
            <Button title={'Okay'} onPress={handleModalConfirm} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
