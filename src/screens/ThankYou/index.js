import {View, Text, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './style';
import images from '../../services/utilities/images';
import Button from '../../components/Button';

export default function ThankYou({route, navigation}) {

  const handleJoin = () => {
    navigation.navigate('FindYourFriends', {
      userData: route.params.userData,
    });
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.head}>Thank You!</Text>
          <Image source={images.thankYou} style={styles.imageContainer} />
          <Text style={styles.head2}>
            This give us an idea of what kind of friends you are looking for!
          </Text>
          <View style={styles.btnTop}>
            <Button title="Continue" onPress={handleJoin} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
