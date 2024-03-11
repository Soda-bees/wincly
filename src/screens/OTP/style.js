import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {height: sizes.screenHeight, backgroundColor: colors.white},
  content: {
    alignItems: 'center',
    marginTop: sizes.screenHeight * 0.02,
  },
  otpHead: {
    fontSize: fontSize.h4,
    fontWeight: '700',
    color: colors.black,
  },
  textView: {
    padding: sizes.screenHeight * 0.03,
  },
  text: {
    textAlign: 'center',
    color: colors.black,
    fontSize: fontSize.medium,
    width: sizes.screenWidth * 0.5,
  },
  phone: {
    textAlign: 'center',
    color: colors.black,
    fontWeight: 'bold',
    fontSize: fontSize.h6,
    marginTop: sizes.screenHeight * 0.03,
  },
  forgetText: {
    fontSize: fontSize.medium,
    color: colors.black,
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  bottom: {
    // marginTop: sizes.screenHeight * 0.02,
  },
  footerbottom: {
    marginTop: sizes.screenHeight * 0.15,
  },
  resendText: {
    fontSize: fontSize.medium,
    color: colors.appTextColor1,
    fontWeight: '800',
    left: sizes.screenWidth * 0.01,
  },
  codeFieldRoot: {
    // marginBottom: sizes.screenHeight * 0.1,
    bottom: sizes.screenHeight * 0.02,
    width: sizes.screenWidth * 0.65,
    padding: sizes.screenWidth * 0.05,
    alignSelf: 'center',
  },
  cell: {
    width: sizes.screenHeight * 0.05,
    height: sizes.screenHeight * 0.05,
    lineHeight: sizes.screenHeight * 0.05,
    fontSize: fontSize.h5,
    fontWeight: '500',
    borderWidth: 1,
    borderColor: colors.disabledBg,
    textAlign: 'center',
    color: colors.black,
    borderRadius: sizes.screenWidth * 0.5,
  },
  cellIOS:{
    width: sizes.screenHeight * 0.05,
    height: sizes.screenHeight * 0.05,
    lineHeight: sizes.screenHeight * 0.05,
    fontSize: fontSize.h5,
    fontWeight: '500',
    borderWidth: 1,
    borderColor: colors.disabledBg,
    textAlign: 'center',
    color: colors.black,
    borderRadius: sizes.screenWidth * 0.06,
  },
  focusCell: {
    borderColor: '#000',
  },
  padding: {
    // paddingRight:2
  },
  center: {
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    paddingLeft: sizes.screenWidth * 0.04,
    fontSize: fontSize.large,
    fontWeight: '500',
    alignSelf:"center",
    marginBottom:sizes.screenHeight * 0.03
  },
  loader: {
    alignSelf: 'center',
    backgroundColor: colors.appTextColor1,
    padding: sizes.screenHeight * 0.02,
    width: sizes.screenWidth * 0.5,
    borderRadius: sizes.screenWidth * 0.03,
  },
  loader: {
    alignSelf: 'center',
    backgroundColor: colors.appTextColor1,
    padding: sizes.screenHeight * 0.02,
    width: sizes.screenWidth * 0.5,
    borderRadius: sizes.screenWidth * 0.03,
  },
  bgImage: {
    height: sizes.screenHeight * 0.18,
    resizeMode:'cover',
    width: sizes.screenWidth,
    marginBottom:sizes.screenHeight * 0.02
  },
});
