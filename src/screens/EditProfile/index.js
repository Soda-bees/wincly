import React, {useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './style';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';
import {colors, sizes} from '../../services';
import PhoneInput from 'react-native-phone-number-input';
import DatePicker from 'react-native-date-picker';
import {format} from 'date-fns';
import {launchImageLibrary} from 'react-native-image-picker';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {ActivityIndicator, Checkbox} from 'react-native-paper';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import {handleAddUserDetails} from '../../store/userDetailsSlice';
import Modal from 'react-native-modal';

export default function EditProfile({navigation, route}) {
  console.log('route.params', route.params);
  const dispatch = useDispatch();

  const {userDetalis} = useSelector(state => state.userDetailsSlice);

  const [username, setUsername] = useState(userDetalis.username);
  const [email, setEmail] = useState(userDetalis.email);
  const [value, setValue] = useState('23-3846-384');
  const [formattedValue, setFormattedValue] = useState('');
  const [phoneNum, setPhoneNum] = useState(userDetalis.phoneNumber);
  const [open, setOpen] = useState(false);
  const [formatedDate, setFormatedDate] = useState(userDetalis.DOB);
  const [date, setDate] = useState(new Date());
  const [imageUri, setImageUri] = useState(userDetalis.profileImg);
  const [about, setAbout] = useState(userDetalis.about);
  const [loader, setLoader] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const phoneInput = useRef(null);

  const handleDate = selectedDate => {
    setOpen(false);
    setDate(date);
    let date1 = new Date(selectedDate);
    let formattedDate = format(date1, 'MM    dd    yyyy');
    setFormatedDate(formattedDate);
  };

  const imageGalleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        const uri = res.assets[0].uri;
        const type = 'image/jpg';
        const name = userDetalis.username;
        const source = {uri, type, name};
        console.log('source====>', source);
        handleCloudinaryUpload(source);
      }
    });
  };

  const handleCloudinaryUpload = async source => {
    setLoader(true);
    const data = new FormData();
    data.append('file', source);
    data.append('upload_preset', 'rdyn9jx7');
    data.append('cloud_name', 'doohobw9k');
    fetch('https://api.cloudinary.com/v1_1/doohobw9k/image/upload', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => res.json())
      .then(data => {
        let img = data.url.slice(0, 4) + 's' + data.url.slice(4);
        setImageUri(img);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        console.log('error====>', err);
        alert('Image not Upload! try again.');
      });
  };

  const handleUpdate = async () => {
    setLoader(true);
    try {
      const {data} = await axios.post(backendURL + 'api/wincly/updateProfile', {
        _id: userDetalis._id,
        profileImg: imageUri,
        username,
        DOB: formatedDate,
        about,
      });
      if (data.message == 'Update succesfully!') {
        setTimeout(() => {
          setLoader(false);
          const user = data.data;
          dispatch(handleAddUserDetails(user));
          setModalVisible(!isModalVisible);
        }, 700);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView>
          <ImageBackground
            source={images.MyProfileBackground}
            style={styles.backgrouondImg}>
            <BackButton title={'Edit Profile'} />
            <View style={styles.imgView}>
              {imageUri ? (
                <Image source={{uri: imageUri}} style={styles.profileImg} />
              ) : (
                <Image source={images.profileImg} style={styles.profileImg} />
              )}
              <TouchableOpacity
                style={styles.uploadImgTouchable}
                onPress={imageGalleryLaunch}>
                <Image
                  source={images.uploadImgBtn}
                  style={styles.uploadImgBtn}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>

          <Text style={styles.text1}>User Name</Text>
          <TextInput
            style={styles.input}
            placeholder="username"
            placeholderTextColor={colors.disabledBg2}
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <Text style={styles.text2}>Phone Number</Text>
          <TextInput
            editable={false}
            style={styles.inputDisable}
            placeholder="Phone Number"
            placeholderTextColor={colors.disabledBg2}
            value={phoneNum}
            onChangeText={text => setPhoneNum(text)}
          />
          <Text style={styles.text2}>Email</Text>
          <TextInput
            editable={false}
            style={styles.inputDisable}
            placeholder="Email"
            placeholderTextColor={colors.disabledBg2}
            value={email}
            onChangeText={text => setEmail(text)}
          />

          <Text style={styles.text2}>Date of Birth</Text>
          <TouchableOpacity
            //   style={styles.margin}
            onPress={() => setOpen(true)}>
            <View style={styles.dropDown}>
              <Text style={styles.dropItem}>{formatedDate}</Text>
            </View>
          </TouchableOpacity>

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
          <Text style={styles.text2}>About</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder="Bio..."
            placeholderTextColor={colors.disabledBg2}
            style={
              Platform.OS == 'ios' ? styles.ratingInput : styles.ratingInput
            }
            value={about}
            onChangeText={text => setAbout(text)}
          />
          <View style={styles.btn}>
            {loader ? (
              <View style={styles.loader}>
                <ActivityIndicator size="small" color="#000" />
              </View>
            ) : (
              <Button title={'Update'} onPress={handleUpdate} />
            )}
          </View>
          <View style={{marginBottom:80}}/>
        </ScrollView>
        <Modal isVisible={isModalVisible}>
            <View style={styles.modalView}>
              <Image source={images.checkmark} style={styles.checkmark} />

              <Text style={styles.modelText}>
                {' '}
                <Text style={styles.blueText}> Profile info updated! </Text>
                your profile info has been updated succesfully
              </Text>
            </View>
            <View style={styles.submitTopModal}>
              <TouchableOpacity
                style={styles.signInBtnModal}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('Home');
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
    </SafeAreaView>
  );
}
