import React, {useState} from 'react';
import {Image, Platform, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import images from '../../services/utilities/images';

export default function SocialFriendList({route, navigation}) {
  const {userData} = route.params;
  // console.log('socialFrndUserData===>', userData);

  const [interest, setInterest] = useState([
    'Shopping',
    'Drinking',
    'Book-Reading',
    'Chat',
    'Clubbing',
    'Dinner',
    'Movie',
    'Cooking',
    'Games',
    'Gaming',
    'Studying',
    'Art/Gallery',
    'Show-Around the City',
    'Others',
  ]);
  const [selectedInterest, setSelectedInterest] = useState([]);

  const handleConfirm = () => {
    console.log(selectedInterest);
    userData.kindFriend.interest = selectedInterest;
    console.log(userData);
    navigation.navigate('PickInterest' , {userData});
   
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
      <Image source={images.profileInfobg} style={styles.bgImage} />
        <View>
          <BackButton />
        </View>
        <View>
          <Text style={styles.head}>Social Friend</Text>
        </View>
        <View style={styles.interestView}>
          {interest.map((item, index) => {
            return (
              <View key={index} style={styles.interestOption}>
                <TouchableOpacity
                  onPress={() => {
                    if (selectedInterest.includes(item)) {
                      const array = selectedInterest.filter(function (letter) {
                        return letter !== item;
                      });
                      setSelectedInterest(array);
                    } else {
                      setSelectedInterest([...selectedInterest, item]);
                    }
                  }}>
                 {Platform.OS == 'ios' ? (
                    <View
                      style={
                        selectedInterest.indexOf(item) !== -1
                          ? styles.btnTextFilled
                          : styles.btnText
                      }>
                      <Text
                        style={
                          selectedInterest.indexOf(item) !== -1
                            ? styles.btnTextFilledIOS
                            : styles.btnTextIOS
                        }>
                        {item}
                      </Text>
                    </View>
                  ) : (
                    <Text
                      style={
                        selectedInterest.indexOf(item) !== -1
                          ? styles.btnTextFilled
                          : styles.btnText
                      }>
                      {item}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <View style={styles.btnTop}>
          <Button title={'Continue'} onPress={handleConfirm} />
        </View>
      </View>
    </SafeAreaView>
  );
}


