import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { styles } from './style';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';
import { useSelector } from 'react-redux';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import formatToJSON from '../../services/utilities/JsonLog';

export default function Profile({ navigation }) {
  const { userDetalis } = useSelector(state => state.userDetailsSlice);

  const [username, setUsername] = useState(userDetalis.username);
  const [phoneNumber, setPhoneNumber] = useState(userDetalis.phoneNumber);
  const [email, setEmail] = useState(userDetalis.email);
  const [DOB, setDOB] = useState(userDetalis.DOB);


  useEffect(() => {
    navigation.addListener('focus', () => {
      getUserDetails()
    });
  }, [navigation]);

  const getUserDetails = async () => {
    const _id = userDetalis._id
    try {
      const { data } = await axios.post(`${backendURL}api/wincly/singleUser`, {
        _id
      })
      // console.log(formatToJSON(data.message , "profileeee"));
      if (data.message === "User Data") {
        setUsername(data.data.username)
        setPhoneNumber(data.data.phoneNumber)
        setEmail(data.data.email)
        setDOB(data.data.DOB)
      } else {
        console.log(data.message);
      }
    } catch (error) {

    }
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ImageBackground
          source={images.MyProfileBackground}
          style={styles.backgrouondImg}>
          <BackButton title={'My Profile'} />
          <Image
            source={{
              uri: userDetalis.profileImg,
            }}
            style={styles.profileImg}
          />
        </ImageBackground>
        <Text style={styles.text1}>User Name</Text>
        <Text style={Platform.OS == 'ios' ? styles.text2IOS : styles.text2}>
          {username}
        </Text>

        <Text style={styles.text3}>Phone Number</Text>
        <Text style={Platform.OS == 'ios' ? styles.text2IOS : styles.text2}>
          {phoneNumber}
        </Text>

        <Text style={styles.text3}>Email</Text>
        <Text style={Platform.OS == 'ios' ? styles.text2IOS : styles.text2}>
          {email}
        </Text>

        <Text style={styles.text3}>Date of Birth</Text>
        <Text style={Platform.OS == 'ios' ? styles.text2IOS : styles.text2}>
          {DOB}
        </Text>
      </View>
    </SafeAreaView>
  );
}
