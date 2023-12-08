import React from 'react';
import messaging from '@react-native-firebase/messaging';
import navigationService from './navigationService';
import formatToJSON from '../utilities/JsonLog';
import Modal from 'react-native-modal';
import { useState } from 'react';
import { Alert, Text, AppState } from 'react-native';
import PushNotification from 'react-native-push-notification';


export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken()
    }
}

export const getFcmToken = async () => {
    try {
        const token = await messaging().getToken()
        console.log('fcm token ==>', token);
        return token
    } catch (error) {
        console.log("error in generate token===>", error);

    }

}

export async function notificationListners() {

    const showNotification = (title, message) => {
        console.log("work notification");
        PushNotification.localNotification({
            channelId: 'channel-id-1',
            title,
            message,
        });
    };

    const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log("A new FCM message arrived!");
        if (remoteMessage?.data?.type === "Event") {
            if (remoteMessage?.data) {
                navigateName = remoteMessage?.data?.redirectTo
                // console.log(formatToJSON(remoteMessage?.notification));
                Alert.alert(remoteMessage?.notification?.title, remoteMessage?.notification?.body, [
                    { text: 'Cancel' },
                    { text: 'Okay', onPress: () => navigationService.navigate(navigateName, remoteMessage?.data?.typeOf) },
                ]);
            }
        }
        if (remoteMessage?.data?.type === "Message") {
            if (remoteMessage?.data) {
                navigateName = remoteMessage?.data?.redirectTo
                console.log("message received", remoteMessage?.data?.chatRoomId, navigateName);
                // showNotification(remoteMessage?.notification?.title, remoteMessage?.notification?.body);
            }
        }
        if(remoteMessage?.data?.type === 'LikeMatch'){
            if (remoteMessage?.data) {
                navigateName = remoteMessage?.data?.redirectTo
                Alert.alert(remoteMessage?.notification?.title, remoteMessage?.notification?.body, [
                    { text: 'Cancel' },
                    { text: 'Okay', 
                    onPress: () => navigationService.navigate(navigateName, { chatId: remoteMessage?.data?.chatRoomId })
                 },
                ]);
            }
        }
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage,
        );
        // navigation.navigate(remoteMessage.data.type);
        if (remoteMessage?.data?.type === "Event") {
            if (remoteMessage?.data) {
                navigateName = remoteMessage?.data?.redirectTo
                navigationService.navigate(navigateName, remoteMessage?.data?.typeOf)
            }
        }
        if (remoteMessage?.data?.type === "Message") {
            if (remoteMessage?.data) {
                navigateName = remoteMessage?.data?.redirectTo
                navigationService.navigate(navigateName, { chatId: remoteMessage?.data?.chatRoomId })
            }
        }
        if (remoteMessage?.data?.type === "LikeMatch") {
            if (remoteMessage?.data) {
                navigateName = remoteMessage?.data?.redirectTo
                navigationService.navigate(navigateName, { chatId: remoteMessage?.data?.chatRoomId })
            }
        }
    });

    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    formatToJSON(remoteMessage, remoteMessage?.data?.typeOf)
                );
                if (remoteMessage?.data?.type === "Event") {
                    if (remoteMessage?.data) {
                        navigateName = remoteMessage?.data?.redirectTo
                        setTimeout(() => {
                            navigationService.navigate(navigateName)
                        }, 2000)
                    }
                }
                if (remoteMessage?.data?.type === "Message") {
                    if (remoteMessage?.data) {
                        navigateName = remoteMessage?.data?.redirectTo
                        setTimeout(() => {
                            navigationService.navigate(navigateName, { chatId: remoteMessage?.data?.chatRoomId })
                        }, 2000)
                    }
                }
                if (remoteMessage?.data?.type === "LikeMatch") {
                    if (remoteMessage?.data) {
                        navigateName = remoteMessage?.data?.redirectTo
                        setTimeout(() => {
                            navigationService.navigate(navigateName, { chatId: remoteMessage?.data?.chatRoomId })
                        }, 2000)
                    }
                }
            }
        });


    return unsubscribe;
}