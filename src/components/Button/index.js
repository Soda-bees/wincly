import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import {ActivityIndicator} from 'react-native-paper';

export default function Button({title, onPress, dark, loader , disable}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={!dark ? styles.greenBtn : styles.darkBtn}>
        <Text style={!dark ? styles.greenBtnText : styles.darkBtnText}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
