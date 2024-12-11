import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './style';
import images from '../../services/utilities/images';
import {colors, sizes} from '../../services';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from '../../components/Button';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AnimatedLoader from '../AnimatedLoader';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import {ActivityIndicator, Checkbox} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import {handleTrue} from '../../store/isSignedInSlice';
import {handleAddUserDetails} from '../../store/userDetailsSlice';
import socket from '../../services/config/io';
import {setShowTutorialFalse} from '../../store/showTutorial';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function Signup({navigation, route}) {
  const dispatch = useDispatch();
  const deviceToken = route.params;

  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);
  const [googleLoader, setGoogleLoader] = useState(false);

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
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(email)) {
        try {
          const {data} = await axios.post(
            backendURL + 'api/wincly/checkEmail',
            {
              email: updatedEmail,
            },
          );
          console.log('data===>', data);
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
                  deviceToken,
                  loginWith: 'none',
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
        setError('*Invalid email address');
        setLoader(false);
      }
    } else {
      setLoader(false);
      setError("*Passwords don't match");
    }
  };

  const handleFacebook = async () => {
    try {
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
      await auth().signInWithCredential(facebookCredential);

      // Get the current user after signing in
      let user = auth().currentUser;
      console.log(user, '----->>');

      // Return the signed-in user
      return user;
    } catch (error) {
      console.error('Error signing in with Facebook:', error);
      throw error; // Rethrow the error to handle it where the function is called
    }
  };

  const handleGoogle = async () => {
    try {
      if (Platform.OS === 'android') {
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
        const {idToken} = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        await auth().signInWithCredential(googleCredential);
      } else {
        // IOS
        const {idToken} = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        await auth().signInWithCredential(googleCredential);
      }

      let user = auth().currentUser;
      // console.log(user.displayName, '----->>');
      // console.log('User Detail', user);
      handleGoogleSignup(user);
      // alert(`Welcome ${user.displayName}`);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleGoogleSignup = async user => {
    try {
      setGoogleLoader(true);
      const {data} = await axios.post(
        backendURL + 'api/wincly/checkEmailGoogle',
        {
          deviceToken,
          email: user?.email,
        },
      );
      if (data?.status == 200) {
        await revokeGoogleAccess();
        setGoogleLoader(false);
        navigation.navigate('PhoneVerification', {
          userData: {
            username: user?.displayName,
            email: user?.email,
            password: '',
            like: [],
            userStatus: 'Online',
            deviceToken,
            loginWith: 'google',
            profile: user?.photoURL,
          },
        });
      } else {
        setGoogleLoader(false);
        dispatch(setShowTutorialFalse());
        console.log('already use need to move home');
        dispatch(handleTrue());
        dispatch(handleAddUserDetails(data?.existingEmail));
        handleSendDataForServer(data?.existingEmail);
      }
    } catch (error) {
      setGoogleLoader(false);
      console.log(error);
    }
  };

  const handleSendDataForServer = data => {
    // console.log(data.username);
    // console.log(data._id);
    const userData = {
      username: data?.username,
      _id: data?._id,
      userStatus: 'Online',
    };
    socket.emit('set user', userData);
    socket.connect();
  };

  ////////// GOOGLE ACCOUNT LOG OUT //////////

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

  ////////// GOOGLE ACCOUNT (DELETE) REMOVE FROM FIREBASE AND LOG OUT //////////

  // const revokeGoogleAccess = async () => {
  //   try {
  //     // Check if the user is signed in with Google
  //     const currentUser = auth().currentUser;
  //     if (
  //       !currentUser ||
  //       !currentUser.providerData.some(
  //         provider => provider.providerId === 'google.com',
  //       )
  //     ) {
  //       throw new Error('No user is currently signed in with Google');
  //     }

  //     // Revoke Google access token
  //     await GoogleSignin.revokeAccess();
  //     console.log('Google access revoked successfully');

  //     // Delete the Firebase user account
  //     await currentUser.delete();
  //     console.log('Firebase account deleted successfully');
  //   } catch (error) {
  //     console.error('Error revoking Google access:', error);
  //     // Handle error
  //   }
  // };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image source={images.signUpbg} style={styles.bgImage} />
        <KeyboardAwareScrollView scrollEnabled={false}  enableOnAndroid extraHeight={400}>
          <View style={{marginTop:10}}>
            <View>
              <View
                style={
                  Platform.OS == 'ios'
                    ? styles.signinViewIOS
                    : styles.signinView
                }>
                <Text style={styles.text1}>SIGN UP</Text>

                <View style={styles.top}>
                  <TextInput
                    placeholder="Username"
                    style={
                      Platform.OS == 'ios' ? styles.inputIOS : styles.input
                    }
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
                    <AntDesign
                      name={'user'}
                      color={colors.disabledBg2}
                      size={20}
                    />
                  </View>
                </View>
                <View>
                  <TextInput
                    placeholder="Email"
                    style={
                      Platform.OS == 'ios' ? styles.inputIOS : styles.input
                    }
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
                    <AntDesign
                      name={'user'}
                      color={colors.disabledBg2}
                      size={20}
                    />
                  </View>
                </View>

                <View style={styles.inputView}>
                  <AntDesign
                    name={'lock'}
                    color={colors.disabledBg2}
                    size={20}
                  />
                  <TextInput
                    secureTextEntry={hidePass ? true : false}
                    placeholder="Password"
                    style={
                      Platform.OS == 'ios' ? styles.input2IOS : styles.input2
                    }
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
                    <AntDesign
                      name={'lock'}
                      color={colors.disabledBg2}
                      size={20}
                    />
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
              <TouchableOpacity onPress={handleGoogle}>
                <View style={[styles.greenBtn, styles.row2]}>
                  {googleLoader ? (
                    <ActivityIndicator
                      size={20}
                      color="black"
                      style={{right: sizes.screenWidth * 0.01}}
                    />
                  ) : (
                    <Image source={images.google} style={styles.google} />
                  )}
                  <Text style={[styles.googleRight]}>Google</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}
