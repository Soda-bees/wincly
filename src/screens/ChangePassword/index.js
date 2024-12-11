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
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import images from '../../services/utilities/images';
import {ActivityIndicator, Checkbox} from 'react-native-paper';
import BackButton from '../../components/BackButton';

export default function ChangePassword({navigation}) {
  const {userDetalis} = useSelector(state => state.userDetailsSlice);

  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);
  const [error, setError] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleChangePass = async () => {
    setLoader(true);
    if (password == confirmPass) {
      try {
        setError('');
        const {data} = await axios.post(
          backendURL + 'api/wincly/updatePassword',
          {
            email: userDetalis.email,
            password,
          },
        );
        if (data.message == 'Password Update succesfully!') {
          setTimeout(() => {
            setError('');
            setModalVisible(!isModalVisible);
            setLoader(false);
          }, 700);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setTimeout(() => {
          setError(error.message);
          setLoader(false);
        }, 700);
      }
    } else {
      setError("*Passwords don't match");
      setLoader(false);
    }
    // navigation.goBack();
  };
  return (
    <SafeAreaView>
      {/* <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}> */}
        <View>
          <View style={styles.container}>
            <BackButton title={'Change Password'} />
            <View style={styles.content}>
              {/* <Text style={styles.loginHead}>Change Password</Text> */}
              <View style={styles.textView}></View>
              <View style={styles.marginBottom}>
                <View style={styles.top2}>
                  <Text style={styles.label}>New Password</Text>
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
                  <Text style={styles.label}>Re-enter New Password</Text>
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
                {loader ? (
                  <View style={styles.loader}>
                    <ActivityIndicator size="small" color="#000" />
                  </View>
                ) : (
                  <Button
                    title={'Update Password'}
                    onPress={handleChangePass}
                  />
                )}
              </View>
            </View>
          </View>
          <Modal isVisible={isModalVisible}>
            <View style={styles.modalView}>
              <Image source={images.checkmark} style={styles.checkmark} />

              <Text style={styles.modelText}>
                {' '}
                <Text style={styles.blueText}> Password updated! </Text>your
                password has been updated succesfully
              </Text>
            </View>
            <View style={styles.submitTopModal}>
              <TouchableOpacity
                style={styles.signInBtnModal}
                onPress={() => {
                  setModalVisible(false);
                  navigation.goBack();
                }}>
                <View style={styles.signInBtnModal}>
                  <View style={styles.signUpContent}>
                    <Text
                      style={
                        Platform.OS == 'ios'
                          ? styles.btnTextIOS2
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
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}
