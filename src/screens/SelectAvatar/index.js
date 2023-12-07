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
import images from '../../services/utilities/images';
import {sizes} from '../../services';
import Button from '../../components/Button';
import {useSelector} from 'react-redux';

export default function SelectAvatar({route, navigation}) {
  const [img, setImg] = useState(images.avatar1);
  const [selected, setSelected] = useState('SimpleAvatar');
  const [avatarList, setAvatarList] = useState([
    {image: images.avatar1},
    {image: images.avatar2},
    {image: images.avatar3},
    {image: images.avatar4},
    {image: images.avatar3},
    {image: images.avatar1},
    {image: images.avatar2},
    {image: images.avatar4},
    {image: images.avatar1},
  ]);

  const isSignedIn = useSelector(state => state.isSignedInSlice.isSignIn);

  const handleContinue = () => {
    if (isSignedIn) {
      navigation.navigate('Settings');
    } else {
      const {userData} = route.params;
      // console.log('avatartUserData===>', userData);
      navigation.navigate('ProfileInfo', {
        userData,
      });
    }
  };

  const handleImg = img => {
    setImg(img);
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {selected == 'SimpleAvatar' && (
          <View>
            <View style={styles.content}>
              <Text style={styles.loginHead}>Choose An Avatar</Text>
            </View>
            <View style={styles.imgTop}>
              <Image source={img} style={styles.avatar} />
            </View>
          </View>
        )}
        {selected == 'Outfits / Styles' && (
          <View style={styles.outfitTop}>
            <Image source={images.avatarFull} style={styles.avatarFull} />
          </View>
        )}
        <View style={[styles.row, styles.imgTop]}>
          <TouchableOpacity onPress={() => setSelected('SimpleAvatar')}>
            <View
              style={
                selected == 'SimpleAvatar'
                  ? styles.selectBtn
                  : styles.selectBtnDisabled
              }>
              <Text style={styles.selectBtnText}>Simple Avatar</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelected('Outfits / Styles')}>
            <View
              style={
                selected == 'Outfits / Styles'
                  ? styles.selectBtn2
                  : styles.selectBtnDisabled2
              }>
              <Text style={styles.selectBtnText}>Outfits / Styles</Text>
            </View>
          </TouchableOpacity>
        </View>
        {selected == 'SimpleAvatar' && (
          <View style={styles.avatarView}>
            {avatarList?.map((item, index) => {
              return (
                <View style={styles.avatarCard} key={index}>
                  <TouchableOpacity onPress={() => handleImg(item.image)}>
                    <Image source={item?.image} style={styles.avatarImg} />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}
        {selected == 'Outfits / Styles' && (
          <View>
            <View style={styles.padding}>
              <Text style={styles.head}>Outfits</Text>
              <Image source={images.line} style={styles.line} />
              <View>
                <Image source={images.outfit} style={styles.outfit} />
              </View>
            </View>
            <View style={styles.padding2}>
              <Text style={styles.head}>Styles</Text>
              <Image source={images.line} style={styles.line2} />
              <View>
                <Image source={images.outfit} style={styles.outfit} />
              </View>
            </View>
          </View>
        )}
        <View
          style={
            selected == 'Outfits / Styles'
              ? styles.btnTopOutfits
              : styles.btnTop
          }>
          <Button title={'Continue'} onPress={handleContinue} />
        </View>
      </View>
    </SafeAreaView>
  );
}
