import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  TextInput,Image
} from 'react-native';
import {styles} from './style';
import {colors, sizes} from '../../services';
import Button from '../../components/Button';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import {ActivityIndicator} from 'react-native-paper';
import images from '../../services/utilities/images';


export default function ForgotPassword({navigation}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);

  const handleContinue = async () => {
    setLoader(true);
    if (email !== '') {
      try {
        setError('');
        let updatedEmail = email.toLowerCase();
        console.log(updatedEmail, 'email---->>');
        const {data} = await axios.post(
          backendURL + 'api/wincly/forgotPassOtp',
          {
            email: updatedEmail,
          },
        );
        console.log(data.otp);
        if (data.message == 'forget password email send successfully!') {
          setTimeout(() => {
            setLoader(false);
            setError('');
            navigation.navigate('OTPEmail', {
              email: updatedEmail,
              otp: data.otp,
            });
          }, 100);
        } else {
          setTimeout(() => {
            setError(data.message);
            setLoader(false);
          }, 100);
        }
      } catch (error) {
        setTimeout(() => {
          setError(error.message);
          setLoader(false);
        }, 100);
      }
    } else {
        setError('*Please enter email');
        setLoader(false);
    }
  };
  return (
    <SafeAreaView>
      {/* <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}> */}
        <View>
          <View style={styles.container}>
          <Image source={images.forgotPassbg} style={styles.bgImage} />
            <View style={styles.content}>
              <Text style={styles.loginHead}>Forgot Password</Text>
              <View style={styles.textView}>
                <Text style={styles.text}>
                  Please enter your email to receive a verification code
                </Text>
              </View>
              <View style={styles.marginBottom}>
                <View style={styles.top2}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    placeholder="XXXXXX"
                    style={
                      Platform.OS == 'ios' ? styles.inputIOS : styles.input
                    }
                    placeholderTextColor={colors.disabledBg2}
                    value={email}
                    onChangeText={text => setEmail(text)}
                  />
                </View>
                <View style={styles.errorView}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              </View>

              <View style={styles.btnTop}>
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
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}
