import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LandingPage from '../../screens/LandingPage';
import Signin from '../../screens/Signin';
import Signup from '../../screens/Signup';
import Like from '../../screens/Like';
import images from '../utilities/images';
import {Image, Platform, Keyboard} from 'react-native';
import {sizes} from '../utilities/sizes';
import {colors} from '../utilities/colors';
import Chat from '../../screens/Chat';
import Profile from '../../screens/Profile';
import Setting from '../../screens/Setting';
import PickInterest from '../../screens/PickInterest';
import SelectLocation from '../../screens/SelectLocation';
import EditProfile from '../../screens/EditProfile';
import CustumDrawer from '../../components/CustomDrawer';
import {fontSize} from '../utilities/fonts';
import ForgotPassword from '../../screens/ForgotPassword';
import OTP from '../../screens/OTP';
import ResetPassword from '../../screens/ResetPassword';
import PhoneVerification from '../../screens/PhoneVerification';
import OTPEmail from '../../screens/OTPEmail';
import SelectAvatar from '../../screens/SelectAvatar';
import ProfileInfo from '../../screens/ProfileInfo';
import UploadPictures from '../../screens/UploadPictures';
import PersonalInfo from '../../screens/PersonalInfo';
import KindFriend from '../../screens/KindFriend';
import SocialFriendList from '../../screens/SocialFriendList';
import SportsFriends from '../../screens/SportsFriends';
import HelpingFriend from '../../screens/HelpingFriend';
import AboutYourself from '../../screens/AboutYourself';
import ConfirmProfile from '../../screens/ConfirmProfile';
import ChangePassword from '../../screens/ChangePassword';
import ChatRoom from '../../screens/ChatRoom';
import {useSelector} from 'react-redux';
import Home from '../../screens/Home';
import UploadPost from '../../screens/UploadPost';
import EventDetails from '../../screens/EventDetails';
import MyEvents from '../../screens/MyEvents';
import MyEventDetails from '../../screens/MyEventsDetails';
import JoinedEvents from '../../screens/JoinedEvents';
import JoinEventsDetails from '../../screens/JoinedEventsDetails';
import Review from '../../screens/Review';
import MyReview from '../../screens/Reviews';
import Wallet from '../../screens/Wallet';
import navigationService from './navigationService';
import Notification from '../../screens/Notification';
import Introduction from '../../screens/Introduction';
import ThankYou from '../../screens/ThankYou';
import FindYourFriends from '../../screens/ForYourFriends';
import SuccessfulEvent from '../../screens/SuccessfulEvent';
import RequestFriendReview from '../../screens/RequestFriendReview';
import AppIntroduction from '../../screens/AppIntroduction';
import GetStarted from '../../screens/GetStarted';
import DeleteAccount from '../../screens/DeleteAccount';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer
      ref={ref => navigationService.setTopLevelNavigator(ref)}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="MyStack" component={MyStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const MyStack = () => {
  const isSignin = useSelector(state => state.isSignedInSlice.isSignIn);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isSignin ? (
        <Stack.Screen name="AppStackNavigator" component={AppStackNavigator} />
      ) : (
        <Stack.Screen
          name="AuthStackNavigator"
          component={AuthStackNavigator}
        />
      )}
    </Stack.Navigator>
  );
};

const MyTabs = () => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // console.log('Keyboard is open');
        setKeyboardOpen(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // console.log('Keyboard is closed');
        setKeyboardOpen(false);
      },
    );
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.appTextColor1,
          height: sizes.screenHeight * 0.085,
          position: 'absolute',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={images.BtmTabHomeFocus}
                style={{
                  height: sizes.screenHeight * 0.08,
                  width: sizes.screenHeight * 0.14,
                  position: 'absolute',
                  bottom: Platform.OS == 'ios' ? '' : sizes.screenHeight * 0.02,
                }}
              />
            ) : (
              <Image
                source={images.BtmTabHome}
                style={{
                  width: sizes.screenWidth * 0.08,
                  height: sizes.screenWidth * 0.08,
                }}
              />
            ),
        }}
      />

      <Tab.Screen
        name="Like"
        component={Like}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={images.BtmTabLikeFocus}
                style={{
                  height: sizes.screenHeight * 0.08,
                  width: sizes.screenHeight * 0.14,
                  position: 'absolute',
                  bottom: Platform.OS == 'ios' ? '' : sizes.screenHeight * 0.02,
                }}
              />
            ) : (
              <Image
                source={images.BtmTabThumb}
                style={{
                  height: sizes.screenWidth * 0.07,
                  width: sizes.screenWidth * 0.075,
                }}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={images.BtmTabWincliesAfter}
                style={{
                  height: sizes.screenHeight * 0.08,
                  width: sizes.screenHeight * 0.14,
                  position: 'absolute',
                  bottom: Platform.OS == 'ios' ? '' : sizes.screenHeight * 0.02,
                }}
              />
            ) : (
              <Image
                source={images.BtmTabWincliesBefore}
                style={{
                  height: sizes.screenWidth * 0.085,
                  width: sizes.screenWidth * 0.086,
                }}
              />
            ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={images.BtmTabChatFocus}
                style={{
                  display: keyboardOpen ? 'none' : 'flex',
                  height: sizes.screenHeight * 0.08,
                  width: sizes.screenHeight * 0.14,
                  position: 'absolute',
                  bottom: Platform.OS == 'ios' ? '' : sizes.screenHeight * 0.02,
                }}
              />
            ) : (
              <Image
                source={images.BtmtabChat}
                style={{
                  width: sizes.screenWidth * 0.07,
                  height: sizes.screenWidth * 0.063,
                }}
              />
            ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={images.BtmTabUserFocus}
                style={{
                  height: sizes.screenHeight * 0.08,
                  width: sizes.screenHeight * 0.14,
                  position: 'absolute',
                  bottom: Platform.OS == 'ios' ? '' : sizes.screenHeight * 0.02,
                }}
              />
            ) : (
              <Image
                source={images.BtmTabUser}
                style={{
                  height: sizes.screenWidth * 0.07,
                  width: sizes.screenWidth * 0.059,
                }}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustumDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          right: sizes.screenWidth * 0.05,
          fontWeight: 'bold',
          color: colors.black,
          fontSize: fontSize.medium,
        },
      }}>
      <Drawer.Screen
        name="MyTabs"
        component={MyTabs}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
      <Drawer.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={images.editProfileDrawer}
              style={{
                height: sizes.screenHeight * 0.035,
                width: sizes.screenHeight * 0.035,
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Location"
        component={SelectLocation}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={images.locationDrawer}
              style={{
                height: sizes.screenHeight * 0.035,
                width: sizes.screenHeight * 0.035,
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Interests"
        component={PickInterest}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={images.interestDrawer}
              style={{
                height: sizes.screenHeight * 0.035,
                width: sizes.screenHeight * 0.035,
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="My Events"
        component={MyEvents}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={images.myEventsDrawer}
              style={{
                height: sizes.screenHeight * 0.035,
                width: sizes.screenHeight * 0.035,
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Joined Events"
        component={JoinedEvents}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={images.myEventsDrawer}
              style={{
                height: sizes.screenHeight * 0.035,
                width: sizes.screenHeight * 0.035,
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Wallet"
        component={Wallet}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={images.WalletDrawer}
              style={{
                height: sizes.screenHeight * 0.035,
                width: sizes.screenHeight * 0.035,
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Review"
        component={MyReview}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={images.reviewDrawer}
              style={{
                height: sizes.screenHeight * 0.035,
                width: sizes.screenHeight * 0.035,
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={Notification}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={images.drawerNotification}
              style={{
                height: sizes.screenHeight * 0.035,
                width: sizes.screenHeight * 0.03,
                marginLeft: sizes.screenWidth * 0.006,
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Setting}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={images.settingDrawer}
              style={{
                height: sizes.screenHeight * 0.035,
                width: sizes.screenHeight * 0.035,
              }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AppIntroduction" component={AppIntroduction} />
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="Introduction" component={Introduction} />
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="MyDrawer" component={MyDrawer} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="OTPEmail" component={OTPEmail} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="PhoneVerification" component={PhoneVerification} />
      <Stack.Screen name="SelectLocation" component={SelectLocation} />
      <Stack.Screen name="SelectAvatar" component={SelectAvatar} />
      <Stack.Screen name="ProfileInfo" component={ProfileInfo} />
      <Stack.Screen name="UploadPictures" component={UploadPictures} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
      <Stack.Screen name="KindFriend" component={KindFriend} />
      <Stack.Screen name="SocialFriendList" component={SocialFriendList} />
      <Stack.Screen name="SportsFriends" component={SportsFriends} />
      <Stack.Screen name="HelpingFriend" component={HelpingFriend} />
      <Stack.Screen name="PickInterest" component={PickInterest} />
      <Stack.Screen name="AboutYourself" component={AboutYourself} />
      <Stack.Screen name="ConfirmProfile" component={ConfirmProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
      <Stack.Screen name="UploadPost" component={UploadPost} />
      <Stack.Screen name="EventDetails" component={EventDetails} />
      <Stack.Screen name="MyEventDetails" component={MyEventDetails} />
      <Stack.Screen name="JoinEventsDetails" component={JoinEventsDetails} />
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen name="FindYourFriends" component={FindYourFriends} />
      <Stack.Screen name="ThankYou" component={ThankYou} />
      
      
    </Stack.Navigator>
  );
};
const AppStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyDrawer" component={MyDrawer} />
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="OTPEmail" component={OTPEmail} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="PhoneVerification" component={PhoneVerification} />
      <Stack.Screen name="SelectLocation" component={SelectLocation} />
      <Stack.Screen name="SelectAvatar" component={SelectAvatar} />
      <Stack.Screen name="ProfileInfo" component={ProfileInfo} />
      <Stack.Screen name="UploadPictures" component={UploadPictures} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
      <Stack.Screen name="KindFriend" component={KindFriend} />
      <Stack.Screen name="SocialFriendList" component={SocialFriendList} />
      <Stack.Screen name="SportsFriends" component={SportsFriends} />
      <Stack.Screen name="HelpingFriend" component={HelpingFriend} />
      <Stack.Screen name="PickInterest" component={PickInterest} />
      <Stack.Screen name="AboutYourself" component={AboutYourself} />
      <Stack.Screen name="ConfirmProfile" component={ConfirmProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
      <Stack.Screen name="UploadPost" component={UploadPost} />
      <Stack.Screen name="EventDetails" component={EventDetails} />
      <Stack.Screen name="MyEventDetails" component={MyEventDetails} />
      <Stack.Screen name="JoinEventsDetails" component={JoinEventsDetails} />
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen name="SuccessfulEvent" component={SuccessfulEvent} />
      <Stack.Screen name="RequestFriendReview" component={RequestFriendReview} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
    </Stack.Navigator>
  );
};
