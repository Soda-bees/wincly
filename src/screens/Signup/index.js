import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './style';
import images from '../../services/utilities/images';
import { colors, sizes } from '../../services';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from '../../components/Button';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AnimatedLoader from '../AnimatedLoader';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import { ActivityIndicator, Checkbox } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';

export default function Signup({ navigation, route }) {

  const deviceToken = route.params
  // console.log('device token signup' , deviceToken);

  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        Platform.OS == 'ios'
          ? '113613496032-2tc275245o3143vv2253uipfh7352618.apps.googleusercontent.com'
          : '113613496032-mmto040pdamugpp2b0d91mkq10shov64.apps.googleusercontent.com',
    });
  }, []);
  const handleSignup = async () => {
    setLoader(true);

    if (username === '') {
      setLoader(false);
      setError('*Please enter username');
    } else if (email === '') {
      setLoader(false);
      setError('*Please enter email');
    } else if (password === '') {
      setLoader(false);
      setError('*Please enter password');
    } else if (confirmPassword === '') {
      setLoader(false);
      setError('*Please re-enter password');
    } else if (password === confirmPassword) {
      setError('');
      let updatedEmail = email.toLowerCase();
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (emailRegex.test(email)) {
        try {
          const { data } = await axios.post(backendURL + 'api/wincly/checkEmail', {
            email: updatedEmail,
          });
          // console.log('data===>', data);
          if (data.message === 'email already in use.') {
            setTimeout(() => {
              setError('Email already in use! try another email');
              setEmail('');
              setLoader(false);
            }, 700);
          } else {
            setTimeout(() => {
              setError('');
              navigation.navigate('PhoneVerification', {
                userData: {
                  username,
                  email: updatedEmail,
                  password,
                  like: [],
                  userStatus: 'Online',
                  deviceToken
                },
              });
              setLoader(false);
            }, 700);
          }
        } catch (error) {
          setError(error.message);
          setLoader(false);
        }
      } else {
        // console.log("Invalid email address");
        setError('*Invalid email address')
        setLoader(false);
      }

    } else {
      setLoader(false);
      setError("*Passwords don't match");
    }
  };

  const handleFacebook = async () => {
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
        <View>
        <Image source={images.signUpbg} style={styles.bgImage} />
          {/* <View style={styles.logoView}>
            <Image
              resizeMode="center"
              style={styles.logoImg}
              source={images.signinLogo}
            />
          </View> */}

          <View
            style={
              Platform.OS == 'ios' ? styles.signinViewIOS : styles.signinView
            }>
            <Text style={styles.text1}>SIGN UP</Text>

            <View style={styles.top}>
              <TextInput
                placeholder="Username"
                style={Platform.OS == 'ios' ? styles.inputIOS : styles.input}
                placeholderTextColor={colors.disabledBg2}
                value={username}
                onChangeText={text => setUsername(text)}
              />
              <View
                style={{
                  bottom:
                    Platform.OS == 'ios'
                      ? sizes.screenHeight * 0.04
                      : sizes.screenHeight * 0.05,
                  alignSelf: 'flex-end',
                  right: sizes.screenWidth * 0.73,
                }}>
                <AntDesign name={'user'} color={colors.disabledBg2} size={20} />
              </View>
            </View>
            <View>
              <TextInput
                placeholder="Email"
                style={Platform.OS == 'ios' ? styles.inputIOS : styles.input}
                placeholderTextColor={colors.disabledBg2}
                value={email}
                onChangeText={text => setEmail(text)}
              />
              <View
                style={{
                  bottom:
                    Platform.OS == 'ios'
                      ? sizes.screenHeight * 0.04
                      : sizes.screenHeight * 0.05,
                  alignSelf: 'flex-end',
                  right: sizes.screenWidth * 0.73,
                }}>
                <AntDesign name={'user'} color={colors.disabledBg2} size={20} />
              </View>
            </View>

            <View style={styles.inputView}>
              <AntDesign name={'lock'} color={colors.disabledBg2} size={20} />
              <TextInput
                secureTextEntry={hidePass ? true : false}
                placeholder="Password"
                style={Platform.OS == 'ios' ? styles.input2IOS : styles.input2}
                placeholderTextColor={colors.disabledBg2}
                value={password}
                onChangeText={text => setPassword(text)}
              />
              <TouchableOpacity
                style={styles.showPassTouchable}
                onPress={() => setHidePass(!hidePass)}>
                <Feather
                  name={!hidePass ? 'eye' : 'eye-off'}
                  color={colors.appTextColor1}
                  size={20}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                bottom: Platform.OS == 'ios' && sizes.screenHeight * 0.01,
              }}>
              <View style={styles.inputView}>
                <AntDesign name={'lock'} color={colors.disabledBg2} size={20} />
                <TextInput
                  secureTextEntry={hideConfirmPass ? true : false}
                  placeholder="Re-enter Password"
                  style={
                    Platform.OS == 'ios' ? styles.input2IOS : styles.input2
                  }
                  placeholderTextColor={colors.disabledBg2}
                  value={confirmPassword}
                  onChangeText={text => setConfirmPassword(text)}
                />
                <TouchableOpacity
                  style={styles.showPassTouchable}
                  onPress={() => setHideConfirmPass(!hideConfirmPass)}>
                  <Feather
                    name={!hideConfirmPass ? 'eye' : 'eye-off'}
                    color={colors.appTextColor1}
                    size={25}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  bottom: Platform.OS == 'ios' && sizes.screenHeight * 0.02,
                }}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            </View>
          </View>

          <View style={styles.btn}>
            {loader ? (
              <View style={styles.loader}>
                <ActivityIndicator size="small" color="#000" />
              </View>
            ) : (
              <Button title={'Sign Up'} onPress={handleSignup} />
            )}
          </View>
          <View style={styles.row2}>
            <Text style={styles.forgetText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
              <Text style={styles.resendText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

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
              <Text style={[styles.googleRight]}>Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
