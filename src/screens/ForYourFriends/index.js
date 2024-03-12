import {View, Text, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './style';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
export default function FindYourFriends({navigation}) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.head}>For Your Friends!</Text>
          <Image source={images.forYourFriends} style={styles.imageContainer} />
          <Text style={styles.head2}>
            Complete your profile by choosing things you can do for your
            friends.
          </Text>
          <View style={styles.btnTop}>
            <Button title="Continue" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
