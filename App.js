import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  PanResponder,
  SafeAreaView,
  Text,
  View,
  Platform,
  AppState,
  PermissionsAndroid,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainNavigator from './src/services/config/navigation';
import {Provider, useSelector} from 'react-redux';
import {persistor, store} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import {LogBox} from 'react-native';
import axios from 'axios';
import backendURL from './src/services/config/backendURL';
import socket from './src/services/config/io';
import formatToJSON from './src/services/utilities/JsonLog';
import {
  notificationListners,
  requestUserPermission,
} from './src/services/config/notificationServices';
import {CopilotProvider} from 'react-native-copilot';

export default function App() {
  const checkServerConnection = async () => {
    try {
      const {data} = await axios.get(backendURL);
      console.log('serverRes===>', formatToJSON(data));
    } catch (error) {
      console.log('serverError==>', error);
    }
  };
  useEffect(() => {
    LogBox.ignoreAllLogs();
    SplashScreen.hide();

    checkServerConnection();
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      )
        .then(res => {
          console.log('res===>', res);
          if (!!res && res === 'granted') {
            requestUserPermission();
            notificationListners();
          }
          notificationListners();
        })
        .catch(error => {
          alert('error in get permission in app.js');
        });
    } else {
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <MainNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
