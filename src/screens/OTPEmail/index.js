import React, {useEffect, useState} from 'react';
import {styles} from './style';
import {SafeAreaView, View, Text, TouchableOpacity, Alert} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Button from '../../components/Button';
import {ActivityIndicator} from 'react-native-paper';

export default function OTPEmail({route, navigation}) {
  const {email, otp} = route.params;

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [value, setValue] = useState('');
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
    console.log(value);
    if (value > 3) {
      if (otp === value) {
        setTimeout(() => {
          navigation.navigate('ResetPassword',{
            email
          });
          setLoader(false);
        }, 1000);
      } else {
        setTimeout(() => {
          setError('*Incorrect OTP');
          setLoader(false);
        }, 1000);
      }
    } else {
      setTimeout(() => {
        setError('*Please enter OTP');
        setLoader(false);
      }, 1000);
    }
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
        <View style={styles.content}>
          <Text style={styles.otpHead}>Verification Code</Text>
          <View style={styles.textView}>
            <Text style={styles.text}>
              We will send a 4-digit OTP code on your email
            </Text>
            <Text style={[styles.phone]}>{email}</Text>
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
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
        <View style={styles.center}>
          {seconds > 9 ? (
            <Text style={styles.forgetText}>0:{seconds}</Text>
          ) : (
            <Text style={styles.forgetText}>0:0{seconds}</Text>
          )}
        </View>
        <View style={[styles.row, styles.bottom]}>
          <Text style={styles.forgetText}>Didn’t receive the OTP? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.resendText}>Resend</Text>
          </TouchableOpacity>
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
