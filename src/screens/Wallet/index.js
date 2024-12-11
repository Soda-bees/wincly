import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './style';
import BackButton from '../../components/BackButton';
import images from '../../services/utilities/images';
import {colors} from '../../services';
import {useSelector} from 'react-redux';
import formatToJSON from '../../services/utilities/JsonLog';
import axios from 'axios';
import backendURL from '../../services/config/backendURL';

export default function Wallet({navigation}) {
  const {userDetalis} = useSelector(state => state.userDetailsSlice);

  const [loader, setLoader] = useState(false);
  const [myWallet, setMyWallet] = useState();
  const [updatedUserData, setUpdatedUserData] = useState('');

  useEffect(() => {
    navigation.addListener('focus', () => {
      handleGetUserDetails();
    });
  }, [navigation]);

  const handleGetUserDetails = async () => {
    try {
      const {data} = await axios.post(backendURL + 'api/wincly/singleUser', {
        _id: userDetalis._id,
      });
      if (data.message === 'User Data') {
        let userData = data.data;
        setUpdatedUserData(userData);
        setMyWallet(data.data.myWallet);
        console.log(data.data.myWallet, 'wallet');
      } else {
        console.log(data.message);
      }
      setLoader(false);
    } catch (error) {
      console.log('errr-==-===-=-'.error.message);
      setLoader(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={Platform.OS == 'android' ? styles.headerView : styles.headerViewIOS}>
        <BackButton title={'Wallet'} />
        <Image
          source={{uri: updatedUserData?.profileImg}}
          style={styles.profileImg}
        />
      </View>
      {loader ? (
        <View style={styles.loaderView}>
          <ActivityIndicator size={'large'} color={colors.appTextColor1} />
        </View>
      ) : (
        <View style={styles.insideContainer}>
          <View style={styles.amountview}>
            <Text style={styles.amountViewText}>My Winclies</Text>
            {/* <View style={styles.coinView}>
              <Image source={images.walletCoins} style={styles.walletCoins} />
              <Text style={styles.amountText}>
                {myWallet}
              </Text>
            </View> */}
          </View>
          <View style={styles.containerTwo}>
            <ImageBackground
              style={Platform.OS == 'android' ? styles.myWincliesImg : styles.myWincliesImgIOS}
              source={images.myWincliesbg}>
              <View style={styles.imgRowOne}>
                <Text style={styles.myWincliesTxt}>My Winclies</Text>
                <Image source={images.myWincliesIcon} />
              </View>
              <View style={styles.imgRowTwo}>
                <Image source={images.dollarCoins} />
                <Text style={styles.myWincliesAmount}>1000</Text>
              </View>
            </ImageBackground>
            <TouchableOpacity>
              <ImageBackground
                style={Platform.OS == 'android' ? styles.shopWIncliesImg : styles.shopWIncliesImgIOS}
                source={images.shopWinclybg}>
                <View style={styles.imgRowOne}>
                  <Text style={styles.myWincliesTxt}>SHOP WINCLY</Text>
                  <Image source={images.cart} />
                </View>
                <View style={styles.shopWinclyRowTwo}>
                  <Image source={images.shopWinclySquare} />
                  <Image source={images.shopWinclySquare} />
                  <Image source={images.shopWinclySquare} />
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.walletBGImgView}>
            <Image source={images.walletBGImg} style={styles.walletBGImg} />
          </View> */}
        </View>
      )}
    </View>
  );
}
