import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import {styles} from './style';
import {colors, sizes} from '../../services';
import PhoneInput from 'react-native-phone-number-input';
import Button from '../../components/Button';
import AnimatedLoader from '../AnimatedLoader';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import {ActivityIndicator, Checkbox} from 'react-native-paper';
import images from '../../services/utilities/images';

export default function PhoneVerification({route, navigation}) {
  const {userData} = route.params;
  // console.log('userData===>', userData);

  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [loader, setLoader] = useState(false);

  const phoneInput = useRef(null);
  
  const handleContinue = async () => {
    setLoader(true)
    setTimeout(() => {
      userData.phoneNumber = formattedValue;
      navigation.navigate('OTP', {
        userData,
      });
      setLoader(false)
    }, 700);

    // setLoader(true)
    // const{data} = await axios.post(backendURL + "api/wincly/otp" , {
    //   phone:formattedValue
    // })
    // console.log("log1", data);
    // console.log("log2", data.data);

    // if(data.message === "Send OTP successfully!"){
    // navigation.navigate('OTP' , {
    //   otp:data.data,
    //   userData
    // });
    // setLoader(false)
    // }else{
    //   setLoader(false)
    //   alert(data.message)
    // }
  };
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View>
          <View style={styles.container}>
          <Image source={images.forgotPassbg} style={styles.bgImage} />
            <View style={styles.content}>
              <Text style={styles.loginHead}>Verify your number</Text>
              <View style={styles.textView}>
                <Text style={styles.text}>
                  Please enter your phone number to receive a verification code
                </Text>
              </View>
              <View style={styles.marginBottom}>
                <PhoneInput
                  ref={phoneInput}
                  defaultValue={value}
                  defaultCode="US"
                  layout="second"
                  containerStyle={{
                    borderColor: colors.appTextColor1,
                    height: sizes.screenHeight * 0.08,
                  }}
                  textInputStyle={{
                    height: sizes.screenHeight * 0.08,
                    color: colors.black,
                  }}
                  textInputProps={{
                    placeholderTextColor: colors.disabledBg2,
                  }}
                  flagButtonStyle={{
                    backgroundColor: colors.appTextColor1,
                  }}
                  onChangeText={text => {
                    setValue(text);
                  }}
                  onChangeFormattedText={text => {
                    setFormattedValue(text);
                  }}
                  withShadow
                  // autoFocus
                />
              </View>

              <View style={styles.btnTop}>
                {/* <Button title={'Continue'} onPress={handleContinue} /> */}
                {loader ? (
                  <View style={styles.loader}>
                    <ActivityIndicator size="small" color="#000" />
                  </View>
                ) : (
                  <Button title={'Continue'} onPress={handleContinue} />
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
