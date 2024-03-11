import {View, Text, SafeAreaView, Image} from 'react-native';
import React from 'react';
import images from '../../services/utilities/images';
import {styles} from './styles';

import Button from '../../components/Button';

export default function Introduction({navigation}) {
    const handleJoin = ()=>{
        navigation.navigate("LandingPage")
    }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image source={images.landingBg} style={styles.bg} />
        <View style={styles.padding}>
          <Text style={styles.text}>Best Way to find new friendships.</Text>
          <Text style={styles.textDescription}>
            "Embark on a journey of meaningful connections with your friends –
            where forging new friendships, discovering love, extending a helping
            hand, or asking for assistance in every way of life is seamlessly
            woven into the fabric of your social experience."
          </Text>
         <View style={styles.btnTop}>
            <Button title={'Join Wincly Now!'} 
            onPress={handleJoin}
             />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
