import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import {styles} from './style';
import {colors, sizes} from '../../services';
import Button from '../../components/Button';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import images from '../../services/utilities/images';
import Modal from 'react-native-modal';

export default function ResetPassword({navigation, route}) {
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);
  const [error, setError] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const {email} = route.params;
  // console.log(email,'----->>');
  const handleResetPassword = async () => {
    if (!password) {
      setError('*Please enter password');
    } else if (!confirmPass) {
      setError('*Please re-enter password');
    } else if (password !== confirmPass) {
      setError("*Passwords don't match");
    } else if (password == confirmPass) {
      try {
        setError('');
        const {data} = await axios.post(
          backendURL + 'api/wincly/updatePassword',
          {
            email,
            password,
          },
        );
        console.log(data);
        if (data.message == 'Password Update succesfully!') {
          setError('');
          setModalVisible(!isModalVisible);
          // navigation.navigate('Signin');
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      }
    }
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
              <Text style={styles.loginHead}>Reset Password</Text>
              <View style={styles.textView}>
                <Text style={styles.text}>
                  Enter a new password to reset the password on your account.
                </Text>
              </View>
              <View style={styles.marginBottom}>
                <View style={styles.top2}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    placeholder="XXXXXX"
                    style={
                      Platform.OS == 'ios' ? styles.inputIOS : styles.input
                    }
                    placeholderTextColor={colors.disabledBg2}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={hidePass ? true : false}
                  />
                  <TouchableOpacity
                    style={{
                      bottom:
                        Platform.OS == 'ios'
                          ? sizes.screenHeight * 0.04
                          : sizes.screenHeight * 0.045,
                      alignSelf: 'flex-end',
                      right: sizes.screenWidth * 0.07,
                    }}
                    onPress={() => setHidePass(!hidePass)}>
                    <Feather
                      name={!hidePass ? 'eye' : 'eye-off'}
                      color={colors.appTextColor1}
                      size={20}
                      style={{
                        alignSelf: 'flex-end',
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputTop2}>
                  <Text style={styles.label}>Re type Password</Text>
                  <TextInput
                    placeholder="XXXXXX"
                    style={
                      Platform.OS == 'ios' ? styles.inputIOS : styles.input
                    }
                    placeholderTextColor={colors.disabledBg2}
                    value={confirmPass}
                    onChangeText={text => setConfirmPass(text)}
                    secureTextEntry={hideConfirmPass ? true : false}
                  />
                  <TouchableOpacity
                    style={{
                      bottom:
                        Platform.OS == 'ios'
                          ? sizes.screenHeight * 0.04
                          : sizes.screenHeight * 0.045,
                      alignSelf: 'flex-end',
                      right: sizes.screenWidth * 0.07,
                    }}
                    onPress={() => setHideConfirmPass(!hideConfirmPass)}>
                    <Feather
                      name={!hideConfirmPass ? 'eye' : 'eye-off'}
                      color={colors.appTextColor1}
                      size={20}
                      style={{
                        alignSelf: 'flex-end',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.errorView}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
              <View style={styles.btnTop}>
                <Button
                  title={'Reset Password'}
                  onPress={handleResetPassword}
                />
              </View>
            </View>
          </View>
          <Modal isVisible={isModalVisible}>
            <View style={styles.modalView}>
              <Image source={images.checkmark} style={styles.checkmark} />

              <Text style={styles.modelText}>
                {' '}
                <Text style={styles.blueText}> Password Changed! </Text>your
                password has been changed succesfully
              </Text>
            </View>
            <View style={styles.submitTopModal}>
              <TouchableOpacity
                style={styles.signInBtnModal}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('Signin');
                }}>
                <View style={styles.signInBtnModal}>
                  <View style={styles.signUpContent}>
                    <Text
                      style={
                        Platform.OS == 'ios'
                          ? styles.btnTextIOS
                          : styles.btnText
                      }>
                      Done
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
