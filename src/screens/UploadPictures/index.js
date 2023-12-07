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
import images from '../../services/utilities/images';
import {launchImageLibrary} from 'react-native-image-picker';
import {ActivityIndicator, Checkbox} from 'react-native-paper';

export default function UploadPictures({route, navigation}) {
  const {userData} = route.params;

  const [imageUri, setImageUri] = useState('');
  const [imageUri2, setImageUri2] = useState('');
  const [imageUri3, setImageUri3] = useState('');
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
        const uri = res.assets[0].uri;
        const type = 'image/jpg';
        const name = userData.username;
        const source = {uri, type, name};
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
      }
    });
  };
  const imageGalleryLaunch2 = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, res => {
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
        const name = userData.username;
        const source = {uri, type, name};
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
            setImageUri2(img);
            setLoader(false);
          })
          .catch(err => {
            setLoader(false);
            console.log('error====>', err);
            alert('Image not Upload! try again.');
          });
      }
    });
  };
  const imageGalleryLaunch3 = () => {
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
        const name = userData.username;
        const source = {uri, type, name};
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
            setImageUri3(img);
            setLoader(false);
          })
          .catch(err => {
            setLoader(false);
            console.log('error====>', err);
            alert('Image not Upload! try again.');
          });
      }
    });
  };

  const handleConfirm = () => {
    if (imageUri === '' || imageUri2 === '' || imageUri3 === '') {
      setError('*Please upload your best pictures');
    } else {
      setError('');
      userData.bestPicture = [imageUri, imageUri2, imageUri3];
      console.log(userData);
      navigation.navigate('PersonalInfo', {
        userData,
      });
    }
  };
  const userData2 = {
    ...userData,
    bestPicture: [imageUri, imageUri2, imageUri3],
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <BackButton skip={true} path="PersonalInfo" userData={userData2} />
        </View>
        <View>
          <Text style={styles.head}>Add your Best Pictures</Text>
        </View>
        <View style={styles.top}>
          <TouchableOpacity onPress={imageGalleryLaunch}>
            {imageUri ? (
              <Image source={{uri: imageUri}} style={styles.firstPic} />
            ) : (
              <View style={styles.firstPic}>
                <Image source={images.plus} style={styles.plusImg} />
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={imageGalleryLaunch2}>
            {imageUri2 ? (
              <Image source={{uri: imageUri2}} style={styles.secondPic} />
            ) : (
              <View style={styles.secondPic}>
                <Image source={images.plus} style={styles.secondPlus} />
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={imageGalleryLaunch3}>
            {imageUri3 ? (
              <Image source={{uri: imageUri3}} style={styles.secondPic} />
            ) : (
              <View style={styles.secondPic}>
                <Image source={images.plus} style={styles.secondPlus} />
              </View>
            )}
          </TouchableOpacity>
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
          {/* <Button title={'Continue'} onPress={handleConfirm}/> */}
        </View>
      </View>
    </SafeAreaView>
  );
}
