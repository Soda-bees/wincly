import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {sizes} from '../../services';

export default function CustomDrawer(props) {
  return (
    <View style={{flex: 1, marginTop: sizes.screenHeight * 0.1}}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
}
