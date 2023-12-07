import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import images from '../../services/utilities/images';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';

export default function BackButton({title, skip,path , userData}) {
  // console.log("BtnuserData===>" , userData);
  const navigation = useNavigation();
  return (
    <View style={[styles.padding, styles.row]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={images.backArrow} style={styles.backArrow} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {skip && (
        <View style={styles.skipView}>
          <TouchableOpacity
            style={[styles.row]}
            onPress={() => navigation.navigate(path , {userData})}>
            <Text style={styles.skipText}>Skip </Text>
            <Text style={styles.skipIcon}>˃ </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
