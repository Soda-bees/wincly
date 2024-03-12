import React, {useState} from 'react';
import {Image, Platform, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import images from '../../services/utilities/images';

export default function HelpingFriend({route, navigation}) {
  const {userData} = route.params;
  console.log('helpingFrndUserData===>', userData);

  const [interest, setInterest] = useState([
    'Electrician',
    'Plumber',
    'Car Mechanic',
    'Painter',
    'Carpenter',
    'Landscaper',
    'Designer',
    'Hairdresser',
    'Handyman',
    'Wedding',
    'Donate/Gift',
    'Language',
    'Stylist',
    'Piano Teacher',
  ]);
  const [selectedInterest, setSelectedInterest] = useState([]);

  const handleConfirm = () => {
    console.log(selectedInterest);
    userData.kindFriend.interest = selectedInterest;
    console.log(userData);
    navigation.navigate('PickInterest', {userData});
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
      <Image source={images.profileInfobg} style={styles.bgImage} />
        <View>
          <BackButton />
        </View>
        <View>
          <Text style={styles.head}>Helping Friend</Text>
        </View>
        <View style={Platform.OS=='ios' ? styles.interestViewIOS:  styles.interestView}>
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

{
  /* <View style={[styles.row, styles.center, styles.marginTop]}>
<TouchableOpacity onPress={() => setElectrician(!electrician)}>
  <View style={electrician ? styles.btnFilled : styles.btnOutlined}>
    <Text style={electrician ? styles.btnTextFilled : styles.btnText}>
      Electrician
    </Text>
  </View>
</TouchableOpacity>
<TouchableOpacity onPress={() => setPlumber(!plumber)}>
  <View style={plumber ? styles.btnFilled : styles.btnOutlined}>
    <Text style={plumber ? styles.btnTextFilled : styles.btnText}>
      Plumber
    </Text>
  </View>
</TouchableOpacity>
</View>
<View style={[styles.row, styles.center]}>
<View style={styles.right}>
  <TouchableOpacity onPress={() => setCarMechanic(!carMechanic)}>
    <View
      style={
        carMechanic ? styles.btnFilledBook : styles.btnOutlinedBook
      }>
      <Text
        style={carMechanic ? styles.btnTextFilled : styles.btnText}>
        Car Mechanic
      </Text>
    </View>
  </TouchableOpacity>
</View>
<TouchableOpacity onPress={() => setCarpenter(!carpenter)}>
  <View
    style={carpenter ? styles.btnFilledClub : styles.btnOutlinedClub}>
    <Text style={carpenter ? styles.btnTextFilled : styles.btnText}>
      Carpenter
    </Text>
  </View>
</TouchableOpacity>
</View>
<View style={[styles.row, styles.center, styles.top]}>
<TouchableOpacity onPress={() => setLandscaper(!landscaper)}>
  <View style={landscaper ? styles.btnFilled : styles.btnOutlined}>
    <Text style={landscaper ? styles.btnTextFilled : styles.btnText}>
      Landscaper
    </Text>
  </View>
</TouchableOpacity>
<TouchableOpacity onPress={() => setPainter(!painter)}>
  <View style={painter ? styles.btnFilled : styles.btnOutlined}>
    <Text style={painter ? styles.btnTextFilled : styles.btnText}>
      Painter
    </Text>
  </View>
</TouchableOpacity>
</View>
<View style={[styles.row, styles.center, styles.top]}>
<TouchableOpacity onPress={() => setDesigner(!designer)}>
  <View
    style={
      designer ? styles.btnFilledDesigner : styles.btnOutlinedDesigner
    }>
    <Text style={designer ? styles.btnTextFilled : styles.btnText}>
      Designer
    </Text>
  </View>
</TouchableOpacity>
<TouchableOpacity onPress={() => setHairdresser(!hairdresser)}>
  <View
    style={
      hairdresser
        ? styles.btnFilledHairdresser
        : styles.btnOutlinedHairdresser
    }>
    <Text style={hairdresser ? styles.btnTextFilled : styles.btnText}>
      Hairdresser
    </Text>
  </View>
</TouchableOpacity>
</View>
<View style={[styles.row, styles.center, styles.top]}>
<TouchableOpacity onPress={() => setHandyman(!handyman)}>
  <View
    style={
      handyman
        ? styles.btnFilledHairdresser
        : styles.btnOutlinedHairdresser
    }>
    <Text style={handyman ? styles.btnTextFilled : styles.btnText}>
      Handyman
    </Text>
  </View>
</TouchableOpacity>
<TouchableOpacity onPress={() => setStylist(!stylist)}>
  <View
    style={
      stylist ? styles.btnFilledDesigner : styles.btnOutlinedDesigner
    }>
    <Text style={stylist ? styles.btnTextFilled : styles.btnText}>
      Stylist
    </Text>
  </View>
</TouchableOpacity>
</View>
<View style={[styles.row, styles.center, styles.top]}>
<TouchableOpacity onPress={() => setWedding(!wedding)}>
  <View
    style={
      wedding ? styles.btnFilledDesigner : styles.btnOutlinedDesigner
    }>
    <Text style={wedding ? styles.btnTextFilled : styles.btnText}>
      Wedding
    </Text>
  </View>
</TouchableOpacity>
<TouchableOpacity onPress={() => setDonate(!donate)}>
  <View
    style={
      donate
        ? styles.btnFilledHairdresser
        : styles.btnOutlinedHairdresser
    }>
    <Text style={donate ? styles.btnTextFilled : styles.btnText}>
      Donate/Gift
    </Text>
  </View>
</TouchableOpacity>
</View>
<View style={[styles.row, styles.center, styles.top]}>
<TouchableOpacity onPress={() => setLanguage(!language)}>
  <View
    style={
      language
        ? styles.btnFilledDesigner2
        : styles.btnOutlinedDesigner2
    }>
    <Text style={language ? styles.btnTextFilled : styles.btnText}>
      Language
    </Text>
  </View>
</TouchableOpacity>
<TouchableOpacity onPress={() => setPiano(!piano)}>
  <View
    style={
      piano
        ? styles.btnFilledHairdresser2
        : styles.btnOutlinedHairdresser2
    }>
    <Text style={piano ? styles.btnTextFilled : styles.btnText}>
      Piano Teacher
    </Text>
  </View>
</TouchableOpacity>
</View>
<View style={[styles.row, styles.center, styles.top]}>
<TouchableOpacity onPress={() => setTutor(!tutor)}>
  <View
    style={
      tutor ? styles.btnFilledDesigner : styles.btnOutlinedDesigner
    }>
    <Text style={tutor ? styles.btnTextFilled : styles.btnText}>
      Tutor
    </Text>
  </View>
</TouchableOpacity>
<TouchableOpacity onPress={() => setOthers(!others)}>
  <View
    style={
      others
        ? styles.btnFilledHairdresser
        : styles.btnOutlinedHairdresser
    }>
    <Text style={others ? styles.btnTextFilled : styles.btnText}>
      Others
    </Text>
  </View>
</TouchableOpacity>
</View> */
}
