import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';


export default function Button({ title, onPress, dark, loader, disable }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={!dark ? styles.greenBtn : styles.darkBtn}>
        {
          loader ?
            <ActivityIndicator size={25} color={'black'} />
            :
            <Text style={!dark ? styles.greenBtnText : styles.darkBtnText}>
              {title}
            </Text>
        }
      </View>
    </TouchableOpacity>
  );
}
