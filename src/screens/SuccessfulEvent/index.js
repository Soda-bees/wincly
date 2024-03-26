import { View, Text, Image, ImageBackground, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './style';
import images from '../../services/utilities/images';
import Button from '../../components/Button';

export default function SuccessfulEvent({ navigation, route }) {

  const { item } = route?.params
  console.log(item?.imageUri);

  const [eventImage, setEventImage] = useState(null);
  const successfulEventImage = () => {
    setEventImage(images.successfulEvent);
  };
  useEffect(() => {
    successfulEventImage();
  }, []);

  const handleJoin = () => {
    navigation.navigate('RequestFriendReview', { item });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.loginHead}>Congratulations</Text>
        <Image source={images.congratsWincly} />
        <Text style={styles.head2}>On successfully completing your event.</Text>
        <View style={styles.eventImageView}>
          <ImageBackground style={styles.eventImage} source={{ uri: item?.imageUri }}>
            <Image source={images.verified} />
          </ImageBackground>
        </View>
        <Text style={styles.head3}>
          Add more to your profile by sharing your and your friend’s experience.
        </Text>
        <View style={styles.btnTop}>
          <Button title={'Add Experience'} onPress={handleJoin} />
        </View>
      </View>
    </SafeAreaView>
  );
}
