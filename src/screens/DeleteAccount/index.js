import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {styles} from './style';
import React, {useState} from 'react';
import images from '../../services/utilities/images';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import userDetailsSlice from '../../store/userDetailsSlice';
import Button from '../../components/Button';
import formatToJSON from '../../services/utilities/JsonLog';
import BackButton from '../../components/BackButton';
import {colors} from '../../services';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import isSignedInSlice from '../../store/isSignedInSlice';

export default function DeleteAccount() {
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState('');
  const {userDetalis} = useSelector(state => state.userDetailsSlice);
  const deviceToken = useSelector(state => state.isSignedInSlice);

  const handlePasswordCheck = async () => {
    if (!password) {
      return Alert.alert('Please enter password');
    }
    try {
      const _id = userDetalis._id;
      const response = await axios.post(
        backendURL + `api/wincly/checkPassword/${_id}`,
        {
          password,
        },
      );
      console.log(response?.data?.message);
      if (response?.data?.success) {
        setShowModal(true);
      } else {
        Alert.alert('Incorrect password');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Incorrect password');
    }
  };

  const handleDeleteAccount = async () => {
    
  } 

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <BackButton title={'Delete Account'} />
        <View style={styles.imgNameMainView}>
          <Image
            source={
              // userDetalis?.profileImg
              //   ?
              {uri: userDetalis?.profileImg}
              //   : userData?.gender === 'male'
              //   ? images.male
              //   : images.female
              //   images.MyProfileBackground
            }
            style={styles.profileImg}
          />
          <Text style={styles.userName}>{userDetalis?.username}</Text>
        </View>
        <Text style={styles.deleteAccountText}>
          To confirm your account deletion, please verify your account password.
        </Text>
        <View style={styles.inputImgView}>
          <TextInput
            placeholder="Password"
            style={styles.inputField}
            value={password}
            secureTextEntry={!showPass}
            onChangeText={text => {
              setPassword(text);
            }}
          />
          {!showPass ? (
            <TouchableOpacity
              styles={styles.paddingRight}
              onPress={() => setShowPass(!showPass)}>
              <Image
                source={images.hidden}
                style={styles.passImg}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
              <Image
                source={images.show}
                style={styles.passImg}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.buttonView}>
          {loader ? (
            <ActivityIndicator title={'Continue'} />
          ) : (
            <Button
              title="Continue"
              // onPress={() => setShowModal(true)}
              onPress={handlePasswordCheck}
            />
          )}
        </View>
        {/* <Toast /> */}
        <Modal isVisible={showModal}>
          <View style={styles.modalMainView}>
            <Text style={styles.modalHeading}>Delete Account</Text>
            <Text style={styles.modalText}>
              You're about to delete all of the data in your Wincly account. Are
              you absolutely positive to delete your account? There is no option
              to undo.
            </Text>
            <TouchableOpacity
              style={styles.deleteButton}
              //   onPress={handleDeleteAccountCompletely}
            >
              {/* {loader ? (
                <ActivityIndicator size={25} color={colors.black} />
              ) : ( */}
              <Text style={styles.deleteButtonText}>
                Delete {userDetalis.username}'s account
              </Text>
              {/* )} */}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowModal(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
