import React, {useState} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import images from '../../services/utilities/images';
export default function KindFriend({route, navigation}) {
  const {userData} = route.params;
  console.log('kindFrndUserData===>', userData);

  const [showDropDown, setShowDropDown] = useState(false);
  // const [selectedItem, setSelectedItem] = useState('Social Friend');
  const [selectedItem, setSelectedItem] = useState(null);
  const [select,setSelect] = useState(false);
  const [selectIndex,setSelectIndex] = useState(null)
  const handlePressSelect = (index) => {
    setSelect(!select)
    setSelectIndex(index)
  }



  const handleConfirm = () => {
    userData.kindFriend = {
      kind: selectedItem,
      interest: [],
    };

    if (selectedItem == 'Social Friend') {
      navigation.navigate('SocialFriendList', {userData});
    } else if (selectedItem == 'Recreation Friend') {
      navigation.navigate('SportsFriends', {userData});
    } else if (selectedItem == 'Helping Friend') {
      navigation.navigate('HelpingFriend', {userData});
    } else if (selectedItem == 'I dont know yet' || selectedItem === 'Dating') {
      navigation.navigate('PickInterest', {userData});
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image source={images.profileInfobg} style={styles.bgImage} />
        <View>
          <BackButton />
        </View>
        <View>
          <Text style={styles.head}>What Kind of Friend?</Text>
        </View>

        <View style={styles.margin}>
          <TouchableOpacity
          style={[styles.row , selectIndex==0 ? styles.friendContainerOne : styles.friendContainerTwo]}
            onPress={() => {setSelectedItem('Social Friend'); handlePressSelect(0)}}>
            <Text style={styles.dropItem}>Social Friend</Text>
            <Image source={images.shareIcon} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.row , selectIndex==1 ? styles.friendContainerOne : styles.friendContainerTwo]}
            onPress={() => {setSelectedItem('Helping Friend'); handlePressSelect(1)}}>
              <Text style={styles.dropItem}>Helping Friend</Text>
            <Image source={images.helpingFriendIcon} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.row , selectIndex==2 ? styles.friendContainerOne : styles.friendContainerTwo]}
            onPress={() => {setSelectedItem('Recreation Friend'); handlePressSelect(2)}}>
            <Text style={styles.dropItem}>Recreation Friend</Text>
            <Image source={images.recreationFriendIcon} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.row , selectIndex==3 ? styles.friendContainerOne : styles.friendContainerTwo]}
            onPress={() => {setSelectedItem('Dating'); handlePressSelect(3)}}>
            <Text style={styles.dropItem}>Dating</Text>
            <Image source={images.datingIcon} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.row , selectIndex==4 ? styles.friendContainerOne : styles.friendContainerTwo]}
            onPress={() => {setSelectedItem('I dont know yet'); handlePressSelect(4)}}>
            <Text style={styles.dropItem}>I dont know yet</Text>
            <Image source={images.questionIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.btnTop}>
          <Button title={'Continue'} onPress={handleConfirm} />
        </View>

        {/* <TouchableOpacity
          style={styles.margin}
          onPress={() => setShowDropDown(!showDropDown)}
          >
          <View style={[styles.dropDown, styles.row]}>
            <Text style={styles.dropItem}>{selectedItem}</Text>
            <Image source={images.dropIcon} style={styles.dropIcon} />
          </View>
        </TouchableOpacity>

        {showDropDown && (
          <View style={styles.dropList}>
            
          <TouchableOpacity
              style={[
                selectedItem == 'Sports/Recreation Friend' && styles.greenBg,
                styles.dropBtn,
              ]}
              onPress={() => {
                setSelectedItem('Sports/Recreation Friend');
                setShowDropDown(false);
              }}>
              <Text
                style={
                  selectedItem == 'Sports/Recreation Friend'
                    ? styles.dropInnerBlack
                    : styles.dropInner
                }>
                Sports/Recreation Friend
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                selectedItem == 'Helping Friend' && styles.greenBg,
                styles.dropBtn,
              ]}
              onPress={() => {
                setSelectedItem('Helping Friend');
                setShowDropDown(false);
              }}>
              <Text
                style={
                  selectedItem == 'Helping Friend'
                    ? styles.dropInnerBlack
                    : styles.dropInner
                }>
                Helping Friend
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                selectedItem == 'Social Friend' && styles.greenBg,
                styles.dropBtn,
              ]}
              onPress={() => {
                setSelectedItem('Social Friend');
                setShowDropDown(false);
              }}>
              <Text
                style={
                  selectedItem == 'Social Friend'
                    ? styles.dropInnerBlack
                    : styles.dropInner
                }>
                Social Friend
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                selectedItem == 'I dont know yet' && styles.greenBg,
                styles.dropBtn2,
              ]}
              onPress={() => {
                setSelectedItem('I dont know yet');
                setShowDropDown(false);
              }}>
              <Text
                style={
                  selectedItem == 'I dont know yet'
                    ? styles.dropInnerBlack
                    : styles.dropInner
                }>
                I dont know yet
              </Text>
            </TouchableOpacity>
          </View>
        )} */}

        {/* <View style={showDropDown ? styles.btnTop : styles.btnTop2}>
          <Button title={'Continue'} onPress={handleConfirm} />
        </View> */}
      </View>
    </SafeAreaView>
  );
}
