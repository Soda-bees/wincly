import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
} from 'react-native';
import images from '../../services/utilities/images';
import {styles} from './style';
import Button from '../../components/Button';
import auth from '@react-native-firebase/auth';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginButton,
} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {sha256} from 'react-native-sha256';
import {getFcmToken} from '../../services/config/notificationServices';
import {useDispatch} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
import {fontSize, sizes} from '../../services';
import {setShowTutorialFalse} from '../../store/showTutorial';
import {handleTrue} from '../../store/isSignedInSlice';
import {handleAddUserDetails} from '../../store/userDetailsSlice';
import socket from '../../services/config/io';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import messaging from '@react-native-firebase/messaging';

export default function LandingPage({navigation}) {
  const dispatch = useDispatch();
  const [deviceToken, setDeviceToken] = useState();
  const [googleLoader, setGoogleLoader] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        Platform.OS == 'ios'
          ? '113613496032-2tc275245o3143vv2253uipfh7352618.apps.googleusercontent.com'
          : '113613496032-mmto040pdamugpp2b0d91mkq10shov64.apps.googleusercontent.com',
      scopes: ['email', 'profile'],
    });
  }, []);

  // const getTokanForDB = async () => {
  //   const token = await getFcmToken();
  //   // console.log('token=--==->', token);
  //   setDeviceToken(token);
  // };

  // useEffect(() => {
  //   getTokanForDB();
  // }, []);

  const getDeviceToken = async () => {
    try {
      // Register the device for remote messages (required for both platforms)
      await messaging().registerDeviceForRemoteMessages();

      // Request permissions for notifications on iOS (no-op on Android)
      if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (!enabled) {
          console.warn('Notification permissions not granted on iOS.');
          return null;
        }
      }

      // Retrieve the FCM token
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      return token; // Return token to the caller for further use
    } catch (error) {
      console.error('Error fetching FCM token:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getDeviceToken();
      if (token) {
        setDeviceToken(token);
      }
    };

    fetchToken();
  }, []);

  const handleSignUp = () => {
    navigation.navigate('Signup', deviceToken);
  };
  const handleSignIn = () => {
    navigation.navigate('Signin', deviceToken);
  };

  // const handleFacebook = async () => {
  //   if (Platform.OS == 'android') {
  //     const result = await LoginManager.logInWithPermissions([
  //       'public_profile',
  //       'email',
  //     ]);

  //     if (result.isCancelled) {
  //       throw 'User cancelled the login process';
  //     }

  //     // Once signed in, get the users AccessToken
  //     const data = await AccessToken.getCurrentAccessToken();

  //     if (!data) {
  //       throw 'Something went wrong obtaining access token';
  //     }

  //     // Create a Firebase credential with the AccessToken
  //     const facebookCredential = auth.FacebookAuthProvider.credential(
  //       data.accessToken,
  //     );

  //     // Sign-in the user with the credential
  //     let user = auth().currentUser;
  //     console.log(user, '----->>');
  //     return auth().signInWithCredential(facebookCredential);
  //   } else {
  //     const nonce = '123456';
  //     const nonceSha256 = await sha256(nonce);

  //     console.log(nonceSha256, '---->>>>s');
  //     // Attempt login with permissions and limited login
  //     const result = await LoginManager.logInWithPermissions(
  //       ['public_profile', 'email'],
  //       'limited',
  //       nonceSha256,
  //     );

  //     if (result.isCancelled) {
  //       throw 'User cancelled the login process';
  //     }

  //     // Once signed in, get the users AuthenticationToken
  //     const data = await AuthenticationToken.getAuthenticationTokenIOS();

  //     if (!data) {
  //       throw 'Something went wrong obtaining authentication token';
  //     }

  //     // Create a Firebase credential with the AuthenticationToken
  //     // and the nonce (Firebase will validates the hash against the nonce)
  //     const facebookCredential = auth().FacebookAuthProvider.credential(
  //       data.authenticationToken,
  //       nonce,
  //     );

  //     // Sign-in the user with the credential
  //     return auth().signInWithCredential(facebookCredential).then(() => {
  //       let user = auth().currentUser;
  //       console.log(user.displayName, '----->>');
  //     })
  //   }
  // };

  const handleFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          alert('Login was cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();

            const responseInfoCallback = (error, result) => {
              if (error) {
                console.log(error);
                alert('Error fetching data: ' + error.toString());
              } else {
                console.log('hellllllllllo', result);
                alert('Welcome: ' + result.name);
              }
            };

            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: 'email,name,first_name,middle_name,last_name',
                  },
                },
              },
              responseInfoCallback,
            );

            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  // const handleLogout = () => {
  //   LoginManager.logOut();
  //   alert('Logged out successfully');
  // };

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
      console.log('User Detail', user);
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
        navigation.navigate('SelectLocation', {
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
    const userData = {
      username: data?.username,
      _id: data?._id,
      userStatus: 'Online',
    };
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

  // const appleLogin = async () => {
  //   try {
  //     const authRes = await appleAuth.performRequest({
  //       requestedOperation: appleAuth.Operation.LOGIN,
  //       requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  //     });
  //     console.log('Auth response:', authRes);
  //   } catch (error) {
  //     console.error('Apple login failed:', error);
  //   }
  // };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image source={images.landingBg} style={styles.bg} />
        <View style={styles.padding}>
          <Text style={styles.text}>
            Wincly – Connect with friends who share your passions! Whether you
            love movies, food, fitness, or tech, simply like or dislike topics
            to find like-minded users. Send friend requests, chat, and bond over
            shared interests.
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
              {/* <Text
                style={{
                  marginRight: 15,
                  fontSize: fontSize.large,
                  fontWeight: '600',
                }}>
                Connect with:
              </Text> */}
              {/* <TouchableOpacity onPress={handleFacebook}>
                <View style={[styles.darkBtn, styles.row2]}>
                  <Image source={images.fb} style={styles.fb} />
                  <Text style={styles.darkBtnText}>Facebook</Text>
                </View>
              </TouchableOpacity> */}
              {/* <LoginButton
                onLoginFinished={(error, result) => {
                  if (error) {
                    alert('login has error: ' + result.error);
                  } else if (result.isCancelled) {
                    alert('login is cancelled.');
                  } else {
                    AccessToken.getCurrentAccessToken().then(data => {
                      let accessToken = data.accessToken;
                      alert(accessToken.toString());

                      const responseInfoCallback = (error, result) => {
                        if (error) {
                          console.log(error);
                          alert('Error fetching data: ' + error.toString());
                        } else {
                          console.log(result);
                          alert('Success fetching data: ' + result.toString());
                        }
                      };

                      const infoRequest = new GraphRequest(
                        '/me',
                        {
                          accessToken: accessToken,
                          parameters: {
                            fields: {
                              string:
                                'email,name,first_name,middle_name,last_name',
                            },
                          },
                        },
                        responseInfoCallback,
                      );

                      // Start the graph request.
                      new GraphRequestManager().addRequest(infoRequest).start();
                    });
                  }
                }}
                onLogoutFinished={() => alert('logout.')}
              /> */}
              <TouchableOpacity onPress={handleGoogle}>
                <View style={[styles.greenBtn, styles.row2]}>
                  {googleLoader ? (
                    <ActivityIndicator size={21} color="black" />
                  ) : (
                    <Image source={images.google} style={styles.google} />
                  )}
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
