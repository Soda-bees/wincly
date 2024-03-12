import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {styles} from './style';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import {colors} from '../../services';
import images from '../../services/utilities/images';

export default function AboutYourself({route, navigation}) {
  const {userData} = route.params;

  const [about, setAbout] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (about) {
      setError('');
      userData.about = about;
      console.log(userData);
      navigation.navigate('ConfirmProfile', {userData});
    } else {
      setError('*Please enter your bio');
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
      <Image source={images.profileInfobg} style={styles.bgImage} />
        <View>
          <BackButton />
        </View>
        <View>
          <Text style={styles.head}>Tell Us Something About Yourself</Text>
        </View>
        <View style={styles.marginTop}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder="Bio..."
            placeholderTextColor={colors.disabledBg2}
            style={
              Platform.OS == 'ios' ? styles.ratingInputIOS : styles.ratingInput
            }
            value={about}
            onChangeText={text => setAbout(text)}
          />
        </View>
        <Text style={styles.errorText}>{error}</Text>
        <View style={styles.btnTop}>
          <Button title={'Continue'} onPress={handleContinue} />
        </View>
      </View>
    </SafeAreaView>
  );
}
