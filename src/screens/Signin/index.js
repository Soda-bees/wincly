import React, {useEffect, useRef, useState} from 'react';
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
import {styles} from './style';
import images from '../../services/utilities/images';
import {colors, sizes} from '../../services';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ActivityIndicator, Checkbox} from 'react-native-paper';
import Button from '../../components/Button';
import {useSelector, useDispatch} from 'react-redux';
import {handleTrue} from '../../store/isSignedInSlice';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AnimatedLoader from '../AnimatedLoader';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import {handleAddUserDetails} from '../../store/userDetailsSlice';
import Feather from 'react-native-vector-icons/Feather';
import socket from '../../services/config/io';
import formatToJSON from '../../services/utilities/JsonLog';

export default function Signin({navigation, route}) {
  const dispatch = useDispatch();
  const deviceToken = route.params;

  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState('');
  const [hidePass, setHidePass] = useState(true);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        Platform.OS == 'ios'
          ? '113613496032-2tc275245o3143vv2253uipfh7352618.apps.googleusercontent.com'
          : '113613496032-mmto040pdamugpp2b0d91mkq10shov64.apps.googleusercontent.com',
    });
  }, []);
  const handleSendDataForServer = data => {
    const userData = {
      username: data.data[0].username,
      _id: data.data[0]._id,
      userStatus: 'Online',
    };
    socket.emit('set user', userData);
    socket.connect();
  };

  const handleUpdateDevicToken = async user => {
    try {
      const {data} = await axios.post(
        backendURL + 'api/wincly/updateDeviceToken',
        {
          _id: user._id,
          deviceToken,
        },
      );
      console.log("update device  --=-==-=--==->",data.message);
    } catch (error) {
      console.log('error in device token update');
    }
  };

  const handleConfirm = async () => {
    setLoader(true);

    if (email == '') {
      setLoader(false);
      setError('*Please enter email');
    } else if (password == '') {
      setLoader(false);
      setError('*Please enter password');
    } else if (email && password) {
      setError('');
      const updatedEmail = email.toLowerCase();
      try {
        const {data} = await axios.post(backendURL + 'api/wincly/login', {
          email: updatedEmail,
          password,
        });
        // console.log(data, '---data');
        if (data.message == 'Login successfully!') {
          setTimeout(() => {
            setError('');
            setLoader(false);
          }, 700);
          const user = data.data[0];
          delete user.password;
          // console.log('userLogin===>', user);
          dispatch(handleTrue());
          dispatch(handleAddUserDetails(user));
          handleUpdateDevicToken(user);
          socket.connect();
          console.log('username===>', data.data[0]._id);
          handleSendDataForServer(data);
          // navigation.navigate('MyDrawer' , {
          //   _id:data.data[0]._id
          // });
        } else {
          setTimeout(() => {
            setError(data.message);
            setLoader(false);
          }, 700);
        }
      } catch (error) {
        setLoader(false);
        setError(error.message);
      }
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
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();

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
      const {idToken} = await GoogleSignin.signIn();
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
          <Image source={images.signInbg} style={styles.bgImage} />

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
            <Text style={styles.text1}>SIGN IN</Text>

            <View style={styles.top}>
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
              style={[
                styles.errorView,
                // {top: Platform.OS == 'ios' && sizes.screenHeight * 0.01},
              ]}>
              <Text style={styles.errorText}>{error}</Text>
            </View>

            <View style={styles.forgotPassView}>
              <View style={styles.checkboxView}>
                <View
                  style={{
                    backgroundColor: Platform.OS == 'ios' && colors.lightGray,
                    marginRight:
                      Platform.OS == 'ios' && sizes.screenWidth * 0.02,
                    borderRadius:
                      Platform.OS == 'ios' && sizes.screenWidth * 0.01,
                  }}>
                  <Checkbox
                    color={colors.appTextColor1}
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked(!checked);
                    }}
                  />
                </View>
                <Text style={styles.checkboxTitle}>Remember me</Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={styles.forgotPassText}>Forgot password</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.btn}>
            {loader ? (
              <View style={styles.loader}>
                <ActivityIndicator size="small" color="#000" />
              </View>
            ) : (
              <Button title={'Sign In'} onPress={handleConfirm} />
            )}
          </View>

          <View style={styles.row}>
            <Text style={styles.forgetText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.resendText}>Sign Up Today!</Text>
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
              <Text style={styles.greenBtnText}>Google</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* {loader && <AnimatedLoader />} */}
      </View>
    </SafeAreaView>
  );
}
