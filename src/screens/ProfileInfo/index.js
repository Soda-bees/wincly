import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {styles} from './style';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import {launchImageLibrary} from 'react-native-image-picker';
import images from '../../services/utilities/images';
import {colors} from '../../services';
import {ActivityIndicator, Checkbox} from 'react-native-paper';

export default function ProfileInfo({route, navigation}) {
  const {userData} = route.params;
  console.log('profileinfoUserData===>', userData);

  const [imageUri, setImageUri] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);

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
        // const source = {uri: res.uri};
        // setImageUri(res?.assets[0]?.uri);
        const uri = res.assets[0].uri;
        const type = 'image/jpg';
        const name = userData.username;
        const source = {uri, type, name};
        // console.log('source====>', source);
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
  const handleConfirm = () => {
    if (imageUri === '') {
      setError('*Please upload your picture');
    } else if (firstname === '') {
      setError('*Please enter your first name');
    } else if (lastname === '') {
      setError('*Please enter your last name');
    } else {
      setError('');
      const userData2 = {
        ...userData,
        profileImg: imageUri,
        firstname,
        lastname,
      };
      // console.log("userData2=======>" , userData2);
      navigation.navigate('UploadPictures', {
        userData: userData2,
      });
    }
  };

  const userData2 = {
    ...userData,
    profileImg: '',
    firstname: '',
    lastname: '',
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
      <Image source={images.profileInfobg} style={styles.bgImage} />
        <View style={styles.testContainer}>
          <BackButton skip={true} path="UploadPictures" userData={userData2} />
        </View>
        <View style={styles.top}>
          <TouchableOpacity onPress={imageGalleryLaunch}>
            {imageUri ? (
              <Image source={{uri: imageUri}} style={styles.firstPic} />
            ) : (
              <View style={styles.firstPic}>
                <Image source={images.upload} style={styles.plusImg} />
              </View>

            )}
          </TouchableOpacity>
        </View>
        <View style={styles.top2}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            placeholder="XXXXXX"
            style={Platform.OS == 'ios' ? styles.inputIOS : styles.input}
            placeholderTextColor={colors.disabledBg2}
            value={firstname}
            onChangeText={text => setFirstname(text)}
          />
        </View>
        <View>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            placeholder="XXXXXX"
            style={Platform.OS == 'ios' ? styles.inputIOS : styles.input}
            placeholderTextColor={colors.disabledBg2}
            value={lastname}
            onChangeText={text => setLastname(text)}
          />
        </View>
        <Text style={styles.errorText}>{error}</Text>
        <View style={styles.btnTop}>
          {loader ? (
            <View style={styles.loader}>
              <ActivityIndicator size="small" color="#000" />
            </View>
          ) : (
            <Button title={'Continue'} onPress={handleConfirm} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
