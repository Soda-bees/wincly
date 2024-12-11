import React, {useEffect, useState} from 'react';
import {styles} from './style';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  Image,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Button from '../../components/Button';
import {ActivityIndicator, Checkbox} from 'react-native-paper';
import images from '../../services/utilities/images';

export default function OTP({route, navigation}) {
  // const {otp} = route.params;
  // console.log("otp===>" , otp);
  const {userData} = route.params;
  // console.log("OTPuserData===>" , userData);

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [value, setValue] = useState('');
  const [phoneNum, setPhoneNum] = useState('+123-3846-384');
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const CELL_COUNT = 4;

  const handleSubmit = () => {
    setLoader(true);
    setTimeout(() => {
      navigation.navigate('SelectLocation', {
        userData,
      });
      setLoader(false);
    }, 700);

    // if (value == otp) {
    //   navigation.navigate('SelectLocation', {
    //     userData,
    //   });
    // } else {
    //   setValue("")
    // setError("OTP not match")
    // }
  };

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image source={images.forgotPassbg} style={styles.bgImage} />
        <View style={styles.content}>
          <Text style={styles.otpHead}>Verification Code</Text>
          <View style={styles.textView}>
            <Text style={styles.text}>
              We will send a 4-digit OTP code on your number
            </Text>
            <Text style={[styles.phone]}>
              {userData && userData.phoneNumber}
            </Text>
          </View>
        </View>

        <View style={styles.padding}>
          <CodeField
            ref={ref}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[
                  Platform.OS == 'ios' ? styles.cellIOS : styles.cell,
                  isFocused && styles.focusCell,
                ]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
        <Text style={styles.errorText}>{error}</Text>
        <View style={styles.center}>
          {seconds > 9 ? (
            <Text style={styles.forgetText}>0:{seconds}</Text>
          ) : (
            <Text style={styles.forgetText}>0:0{seconds}</Text>
          )}
        </View>
        <View style={[styles.row, styles.footerbottom]}>
          {loader ? (
            <View style={styles.loader}>
              <ActivityIndicator size="small" color="#000" />
            </View>
          ) : (
            <Button title={'Submit'} onPress={handleSubmit} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
