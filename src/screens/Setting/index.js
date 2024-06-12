import React, { useEffect, useState } from 'react';
import { Linking, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import { handleFalse } from '../../store/isSignedInSlice';
import { handleRemoveUserDetails } from '../../store/userDetailsSlice';
import socket from '../../services/config/io';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import { setShowTutorialTrue } from '../../store/showTutorial';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function Setting({ navigation }) {
  const userData = useSelector((state) => state.userDetailsSlice.userDetalis)
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        Platform.OS == 'ios'
          ? '113613496032-2tc275245o3143vv2253uipfh7352618.apps.googleusercontent.com'
          : '113613496032-mmto040pdamugpp2b0d91mkq10shov64.apps.googleusercontent.com',
    });
  }, []);

  const handleUpdateDevicToken = async (user) => {
    try {
      const { data } = await axios.post(backendURL + "api/wincly/updateDeviceToken", {
        _id: userData._id,
        deviceToken: null
      })
      console.log(data.message);
    } catch (error) {
      console.log("error in device token update");
    }
  }

  const handleSignOut = async () => {
    console.log(userData?.loginWith);
    if (userData?.loginWith === 'google') {
      await revokeGoogleAccess()
      dispatch(setShowTutorialTrue())
      dispatch(handleFalse());
      dispatch(handleRemoveUserDetails());
      socket.disconnect();
      handleUpdateDevicToken()
    } else {
      dispatch(setShowTutorialTrue())
      dispatch(handleFalse());
      dispatch(handleRemoveUserDetails());
      socket.disconnect();
      handleUpdateDevicToken()
    }
  };

  const revokeGoogleAccess = async () => {
    try {
      await GoogleSignin.revokeAccess();
      console.log('Google access revoked successfully');
      // Additional logic if needed after revoking access
    } catch (error) {
      console.error('Error revoking Google access:', error);
      // Handle error
    }
  };

  const openWebLinkPrivacyPolicy = (url) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
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
          {
            userData?.loginWith === 'none' &&
            <View style={styles.top}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ChangePassword')}>
                <Text style={styles.text}>Change Password</Text>
              </TouchableOpacity>
            </View>
          }

          <View style={styles.top}>
            <TouchableOpacity onPress={() => openWebLinkPrivacyPolicy('https://simationstudio.com/privacy-policy/')}>
              <Text style={styles.text}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.top}>
            <TouchableOpacity onPress={() => openWebLinkPrivacyPolicy('https://simationstudio.com/terms-conditions/')}>
              <Text style={styles.text}>Terms and Conditions</Text>
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
