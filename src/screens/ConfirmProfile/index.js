import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {styles} from './style';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import {useDispatch} from 'react-redux';
import {handleTrue} from '../../store/isSignedInSlice';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import {handleAddUserDetails} from '../../store/userDetailsSlice';
import {ActivityIndicator, Checkbox} from 'react-native-paper';
import socket from '../../services/config/io';

export default function ConfirmProfile({route, navigation}) {
  const {userData} = route.params;
  // console.log(userData);

  const dispatch = useDispatch();
  const [age, setAge] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (userData.DOB === '') {
      setAge('');
    } else {
      const currentYear = new Date().getFullYear();
      console.log(userData.DOB);
      const DOByear = userData.DOB.substr(12);
      const finalAge = currentYear - DOByear;
      setAge(finalAge);
    }
  }, []);

  const [interest, setInterest] = useState([
    'Dancing',
    'Singing',
    'Culbbing',
    'Cafe hopping',
    'Maths',
  ]);

  const handleSendDataForServer = data => {
    const userData = {username: data.data.username, _id: data.data._id ,  userStatus:"Online"};
    socket.emit('set user', userData);
    socket.connect();
    // console.log(`signup emit done ${userData}`);
  };

  const handleConfirm = async () => {
    setLoader(true);
    userData.age = age;
    userData.joinReq = []
    userData.acceptReq = []
    userData.rejectReq = []
    userData.myPostedReviews = []
    try {
      const {data} = await axios.post(backendURL + 'api/wincly/signup', {
        userData,
      });
      if(data.message === "signup successfully!"){
        setTimeout(() => {
            console.log('signupRes==>', data.data);
            const user = data.data;
            delete user.password;
            dispatch(handleTrue());
            dispatch(handleAddUserDetails(user));
            handleSendDataForServer(data);
            // navigation.navigate('MyDrawer');
            setLoader(false);
          }, 700);
        }else{
          console.log(data.message);
        }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.imgView}>
            <Image
              source={
                userData.profileImg !== ''
                  ? {uri: userData.profileImg}
                  : images.backgroundImg
              }
              style={styles.img}
            />
            <Image
              source={images.thumbImg}
              style={
                Platform.OS == 'ios' ? styles.likeBtnImgIOS : styles.likeBtnImg
              }
            />
          </View>

          <View style={styles.textView}>
            <Text style={styles.text1}>
              {userData && userData.username}
              <Text style={styles.text2}>{age}</Text>
            </Text>
            <Text style={styles.text3}>{userData && userData.about}</Text>
          </View>
          <Text style={styles.text4}>Interests</Text>

          <View style={styles.interestView}>
            {userData &&
              userData.interest.map((item, index) => {
                return (
                  <Text
                    style={
                      Platform.OS == 'ios'
                        ? styles.interestTextIOS
                        : styles.interestText
                    }
                    key={index}>
                    {item}
                  </Text>
                );
              })}
          </View>
          <View style={styles.btnView}>
            {loader ? (
              <View style={styles.loader}>
                <ActivityIndicator size="small" color="#000" />
              </View>
            ) : (
              <Button title={'Continue'} onPress={handleConfirm} />
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
