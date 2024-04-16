import React, {useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import {useSelector, useDispatch} from 'react-redux';
import {handleFalse} from '../../store/isSignedInSlice';
import {handleRemoveUserDetails} from '../../store/userDetailsSlice';
import socket from '../../services/config/io';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import { setShowTutorialTrue } from '../../store/showTutorial';

export default function Setting({navigation}) {
  const userData = useSelector((state) => state.userDetailsSlice.userDetalis)
  const dispatch = useDispatch();

  const handleUpdateDevicToken = async (user) => {
    try {
      const { data } = await axios.post(backendURL + "api/wincly/updateDeviceToken", {
        _id: userData._id,
        deviceToken:null
      })
      console.log(data.message);
    } catch (error) {
      console.log("error in device token update");
    }
  }

  const handleSignOut = () => {
    dispatch(setShowTutorialTrue())
    dispatch(handleFalse());
    dispatch(handleRemoveUserDetails());
    socket.disconnect();
    handleUpdateDevicToken() 
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <BackButton title={'Setting'} />
        </View>
        <View style={styles.padding}>
          <View style={styles.top}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SelectAvatar')}>
              <Text style={styles.text}>Edit Avatar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.top}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ChangePassword')}>
              <Text style={styles.text}>Change Password</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.top}>
            <TouchableOpacity>
              <Text style={styles.text}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.top}>
            <TouchableOpacity>
              <Text style={styles.text}>Help</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.top}>
            <TouchableOpacity>
              <Text style={styles.text}>About</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.btnTop}>
          <Button title={'Sign out'} onPress={handleSignOut} />
        </View>
      </View>
    </SafeAreaView>
  );
}
