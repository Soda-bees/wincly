import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid
} from 'react-native';
import images from '../../services/utilities/images';
import { styles } from './style';
import Button from '../../components/Button';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { sha256 } from 'react-native-sha256';
import { getFcmToken } from '../../services/config/notificationServices';
import { useDispatch } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';
import { sizes } from '../../services';
import { setShowTutorialFalse } from '../../store/showTutorial';
import { handleTrue } from '../../store/isSignedInSlice';
import { handleAddUserDetails } from '../../store/userDetailsSlice';
import socket from "../../services/config/io"
import axios from 'axios';
import backendURL from '../../services/config/backendURL';

export default function LandingPage({ navigation }) {
  const dispatch = useDispatch()
  const [deviceToken, setDeviceToken] = useState()
  const [googleLoader, setGoogleLoader] = useState(false)

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        Platform.OS == 'ios'
          ? '113613496032-2tc275245o3143vv2253uipfh7352618.apps.googleusercontent.com'
          : '113613496032-mmto040pdamugpp2b0d91mkq10shov64.apps.googleusercontent.com',
    });
  }, []);



  const getTokanForDB = async () => {
    const token = await getFcmToken()
    // console.log('token=--==->', token);
    setDeviceToken(token)
  }

  useEffect(() => {
    getTokanForDB()
  }, [])

  const handleSignUp = () => {
    navigation.navigate('Signup', deviceToken);
  };
  const handleSignIn = () => {
    navigation.navigate('Signin', deviceToken);
  };

  const handleFacebook = async () => {
    if (Platform.OS == 'android') {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccessToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Sign-in the user with the credential
      let user = auth().currentUser;
      console.log(user, '----->>');
      return auth().signInWithCredential(facebookCredential);
    } else {
      const nonce = '123456';
      const nonceSha256 = await sha256(nonce);

      console.log(nonceSha256, '---->>>>s');
      // Attempt login with permissions and limited login
      const result = await LoginManager.logInWithPermissions(
        ['public_profile', 'email'],
        'limited',
        nonceSha256,
      );

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AuthenticationToken
      const data = await AuthenticationToken.getAuthenticationTokenIOS();

      if (!data) {
        throw 'Something went wrong obtaining authentication token';
      }

      // Create a Firebase credential with the AuthenticationToken
      // and the nonce (Firebase will validates the hash against the nonce)
      const facebookCredential = auth().FacebookAuthProvider.credential(
        data.authenticationToken,
        nonce,
      );

      // Sign-in the user with the credential
      return auth().signInWithCredential(facebookCredential).then(() => {
        let user = auth().currentUser;
        console.log(user.displayName, '----->>');
      })
    }
  };

  const handleGoogle = async () => {
    try {
      if (Platform.OS === 'android') {
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        await auth().signInWithCredential(googleCredential);
      } else {
        // IOS
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        await auth().signInWithCredential(googleCredential);
      }

      let user = auth().currentUser;
      // console.log(user.displayName, '----->>');
      console.log('User Detail', user);
      handleGoogleSignup(user)
      // alert(`Welcome ${user.displayName}`);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleGoogleSignup = async (user) => {
    try {
      setGoogleLoader(true)
      const { data } = await axios.post(
        backendURL + 'api/wincly/checkEmailGoogle',
        {
          deviceToken,
          email: user?.email,
        },
      )
      if (data?.status == 200) {
        await revokeGoogleAccess()
        setGoogleLoader(false)
        navigation.navigate('PhoneVerification', {
          userData: {
            username: user?.displayName,
            email: user?.email,
            password: '',
            like: [],
            userStatus: 'Online',
            deviceToken,
            loginWith: 'google',
            profile: user?.photoURL
          },
        });
      } else {
        setGoogleLoader(false)
        dispatch(setShowTutorialFalse())
        console.log("already use need to move home");
        dispatch(handleTrue());
        dispatch(handleAddUserDetails(data?.existingEmail));
        handleSendDataForServer(data?.existingEmail);
      }

    } catch (error) {
      setGoogleLoader(false)
      console.log(error);
    }
  }

  const handleSendDataForServer = data => {
    const userData = { username: data?.username, _id: data?._id, userStatus: "Online" };
    socket.emit('set user', userData);
    socket.connect();
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

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image source={images.landingBg} style={styles.bg} />
        <View style={styles.padding}>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor.
          </Text>
          <View style={styles.btnTop}>
            <Button title={'Sign Up'} onPress={handleSignUp} />
          </View>
          <Button title={'Sign In'} onPress={handleSignIn} dark={true} />
          <View style={styles.btnView}>
            <View
              style={[
                Platform.OS == 'ios' ? styles.btnTopIOS : styles.btnTop,
                styles.row,
              ]}>
              <TouchableOpacity
              // onPress={handleFacebook}
              >
                <View style={[styles.darkBtn, styles.row2]}>
                  <Image source={images.fb} style={styles.fb} />
                  <Text style={styles.darkBtnText}>Facebook</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleGoogle}
              >
                <View style={[styles.greenBtn, styles.row2]}>
                  {
                    googleLoader ?
                      <ActivityIndicator size={21} color='black'
                      />
                      :
                      <Image source={images.google} style={styles.google} />
                  }
                  <Text style={styles.greenBtnText}>Google</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
