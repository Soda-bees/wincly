import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    marginTop: sizes.screenHeight * 0.02,
  },
  loginHead: {
    textAlign: 'center',
    fontSize: fontSize.h4,
    fontWeight: '700',
    color: colors.black,
  },
  textView: {
    padding: sizes.screenHeight * 0.05,
  },
  marginBottom: {
    marginBottom: sizes.screenHeight * 0.1,
    marginTop: sizes.screenHeight * 0.05,
  },
  text: {
    textAlign: 'center',
    color: colors.black,
    fontSize: fontSize.medium,
  },
  inputTop: {
    marginTop: sizes.screenHeight * 0.02,
    marginBottom: sizes.screenHeight * 0.009,
  },
  input: {
    backgroundColor: 'transparent',
    width: sizes.screenWidth * 0.9,
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.03,
    borderTopRightRadius: sizes.screenWidth * 0.03,
    borderTopLeftRadius: sizes.screenWidth * 0.03,
    borderColor: colors.grayBorder,
  },
  container: {height: sizes.screenHeight, backgroundColor: colors.white},
  signInBtn: {
    height: sizes.screenHeight * 0.06,
    width: sizes.screenWidth * 0.91,
    alignSelf: 'center',
    backgroundColor: colors.appTextColor1,
    borderRadius: sizes.screenWidth * 0.06,
  },
  btnText: {
    textAlign: 'center',
    marginTop: sizes.screenHeight * 0.015,
    color: '#EFEFF0',
    fontSize: fontSize.medium,
  },
  btnTextIOS: {
    textAlign: 'center',
    marginTop: sizes.screenHeight * 0.018,
    color: '#EFEFF0',
    fontSize: fontSize.medium,
  },
  forgetView: {
    alignItems: 'center',
    bottom: sizes.screenHeight * 0.01,
  },
  forgetText: {
    fontSize: fontSize.regular,
    color: '#61646B',
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  bottom: {
    marginTop: sizes.screenHeight * 0.07,
  },
  signUpText: {
    fontSize: fontSize.medium,
    color: colors.appTextColor1,
    fontWeight: '800',
    left: sizes.screenWidth * 0.01,
  },
  top: {
    marginTop: sizes.screenHeight * 0.009,
    marginBottom: sizes.screenHeight * 0.009,
  },
  reenterPass: {
    bottom: sizes.screenHeight * 0.018,
  },
  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightArrow: {
    top: sizes.screenHeight * 0.009,
    alignSelf: 'center',
  },
  signUpContent: {
    paddingRight: sizes.screenWidth * 0.05,
    paddingLeft: sizes.screenWidth * 0.05,
  },
  dob: {
    bottom: sizes.screenHeight * 0.001,
    marginBottom: sizes.screenHeight * 0.008,
    paddingRight: sizes.screenWidth * 0.05,
    paddingLeft: sizes.screenWidth * 0.05,
  },
  btnTop: {
    // bottom: sizes.screenHeight * 0.05,
    // marginBottom: 0,
    top: sizes.screenHeight * 0.06,
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
    resizeMode: 'cover',
    width: sizes.screenWidth,
    marginBottom: sizes.screenHeight * 0.02,
  },
});
