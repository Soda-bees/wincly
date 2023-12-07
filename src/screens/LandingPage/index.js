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

export default function LandingPage({ navigation }) {
  const [deviceToken, setDeviceToken] = useState()

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
    if (Platform.OS == 'android') {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();

      return auth()
        .signInWithCredential(googleCredential)
        .then(() => {
          let user = auth().currentUser;
          console.log(user.displayName, '----->>');
          alert(`Welcome ${user.displayName}`);
        });
    }

    // IOS
    else {
      const { idToken } = await GoogleSignin.signIn();
      console.log(idToken, '------->obj');
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const userSignIn = auth()
        .signInWithCredential(googleCredential)
        .then(() => {
          let user = auth().currentUser;
          console.log(user.displayName, '----->>');
          alert(`Welcome ${user.displayName}`);
        });
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
              // onPress={handleGoogle}
              >
                <View style={[styles.greenBtn, styles.row2]}>
                  <Image source={images.google} style={styles.google} />
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
