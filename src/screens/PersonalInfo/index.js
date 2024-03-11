import React, {useEffect, useState} from 'react';
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
import DatePicker from 'react-native-date-picker';
import {format} from 'date-fns';
import images from '../../services/utilities/images';

export default function PersonalInfo({route , navigation}) {

  const {userData} = route.params;
  console.log('personalInfoUserData===>', userData);

  const [date, setDate] = useState(new Date());
  const [formatedDate, setFormatedDate] = useState('MM      DD      YY');
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState('');
  const [error , setError] = useState("")

  const handleDate = selectedDate => {
    setOpen(false);
    setDate(date);
    let date1 = new Date(selectedDate);
    let formattedDate = format(date1, 'MM    dd    yyyy');
    setFormatedDate(formattedDate);
  };

  const handleConfirm = () => {
    if(formatedDate === 'MM      DD      YY'){
      setError("*Please select date of birth")
    }else if(gender === ''){
      setError("*Please select gender")
    }else{
      setError("")
      userData.DOB = formatedDate
      userData.lookingFor = gender
      console.log(userData);
      navigation.navigate("KindFriend" , {
        userData
      })
    }
  }
  const userData2 = {
    ...userData,
    DOB:"",
    lookingFor:""
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
      <Image source={images.profileInfobg} style={styles.bgImage} />
        <View>
          <BackButton skip={true} path="KindFriend" userData={userData2}/>
        </View>
        <View>
          <Text style={styles.head}>Date of Birth</Text>
        </View>
        <View>
          <View>
            <TouchableOpacity
              style={styles.margin}
              onPress={() => setOpen(true)}>
              <View style={styles.dropDown}>
                <Text style={styles.dropItem}>{formatedDate}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <DatePicker
          modal
          open={open}
          date={date}
          mode="date"
          onConfirm={date => {
            handleDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <View style={styles.marginTop}>
          <Text style={styles.head2}>I Am Looking For</Text>
        </View>
        <View style={styles.margin2}>
          <TouchableOpacity
            style={styles.margin2}
            onPress={() => setGender('Male Friend')}>
            <View
              style={
                gender == 'Male Friend'
                  ? styles.dropDownFocused
                  : styles.dropDown
              }>
              <Text style={styles.dropItem2}>Male Friend</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.margin2}
            onPress={() => setGender('Female Friend')}>
            <View
              style={
                gender == 'Female Friend'
                  ? styles.dropDownFocused
                  : styles.dropDown
              }>
              <Text style={styles.dropItem2}>Female Friend</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.margin2}
            onPress={() => setGender('Other')}>
            <View
              style={
                gender == 'Other' ? styles.dropDownFocused : styles.dropDown
              }>
              <Text style={styles.dropItem2}>Other</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.errorText}>{error}</Text>

        <View style={styles.btnTop}>
          <Button title="Continue" onPress={handleConfirm}/>
        </View>
      </View>
    </SafeAreaView>
  );
}
