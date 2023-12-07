import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import {styles} from './style';
import {colors, sizes} from '../../services';
import Feather from 'react-native-vector-icons/Feather';
import images from '../../services/utilities/images';
import Button from '../../components/Button';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';
import {ActivityIndicator, Checkbox} from 'react-native-paper';
import {handleAddUserDetails} from '../../store/userDetailsSlice';
import Modal from 'react-native-modal';

export default function SelectLocation({route, navigation}) {
  const dispatch = useDispatch();

  const isSignedIn = useSelector(state => state.isSignedInSlice.isSignIn);
  const {userDetalis} = useSelector(state => state.userDetailsSlice);

  const [location, setLocation] = useState(userDetalis.location);
  const [allLocation, setAllLocation] = useState('');
  const [search, setSearch] = useState('');
  const [loader, setLoader] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      setLoader(true);
      const {data} = await axios.get(backendURL + 'api/wincly/location');
      setAllLocation(data.data);
      setLoader(false);
    })();
  }, []);

  const handleConfirm = async () => {
    setLoader(true);
    if (isSignedIn) {
      try {
        const {data} = await axios.post(
          backendURL + 'api/wincly/updateProfile',
          {
            _id: userDetalis._id,
            location,
          },
        );
        if (data.message == 'Update succesfully!') {
          setTimeout(() => {
            const user = data.data;
            dispatch(handleAddUserDetails(user));
            setModalVisible(!isModalVisible);
            setLoader(false);
          }, 700);
        }
      } catch (error) {
        console.log(error);
        setTimeout(() => {
          setLoader(false);
        }, 700);
      }
    } else {
      const {userData} = route.params;
      setTimeout(() => {
        userData.location = location;
        navigation.navigate('SelectAvatar', {
          userData,
        });
        setLoader(false);
      }, 700);
    }
  };
  const handleSearch = () => {};
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.top}>
          <TextInput
            placeholder="Search"
            style={Platform.OS == 'ios' ? styles.inputIOS : styles.input}
            placeholderTextColor={colors.disabledBg2}
            value={search}
            onChangeText={text => setSearch(text)}
          />
          <TouchableOpacity
            style={{
              bottom:
                Platform.OS == 'ios'
                  ? sizes.screenHeight * 0.043
                  : sizes.screenHeight * 0.048,
              alignSelf: 'flex-end',
              right: sizes.screenWidth * 0.15,
            }}
            onPress={handleSearch}>
            <Feather
              name={'search'}
              color={colors.appTextColor1}
              size={20}
              style={{
                alignSelf: 'flex-end',
              }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {allLocation &&
            allLocation
              .filter(item => item.name.includes(search))
              .map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setLocation(item.name)}>
                    <View
                      style={[
                        location == item.name
                          ? styles.locationView
                          : styles.locationViewGrey,
                        styles.row,
                      ]}>
                      <Image
                        source={images.marker}
                        style={styles.lcoationIcon}
                      />
                      <Text style={styles.locationText}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
        </ScrollView>
        <View style={Platform.OS == 'ios' ? styles.btnViewIOS : styles.btnView}>
          {loader ? (
            <View style={styles.loader}>
              <ActivityIndicator size="small" color="#000" />
            </View>
          ) : (
            <Button
              title={isSignedIn ? 'Update' : 'Continue'}
              onPress={handleConfirm}
            />
          )}
        </View>
        <Modal isVisible={isModalVisible}>
          <View style={styles.modalView}>
            <Image source={images.checkmark} style={styles.checkmark} />

            <Text style={styles.modelText}>
              {' '}
              <Text style={styles.blueText}> Location Updated! </Text>your
              location has been updated succesfully.
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
                      Platform.OS == 'ios' ? styles.btnTextIOS : styles.btnText
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
