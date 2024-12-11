import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    // marginTop: sizes.screenHeight * 0.2,
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
    // marginBottom: sizes.screenHeight * 0.1,
    marginTop: sizes.screenHeight * 0.01,
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
    color: colors.black,
    fontSize: fontSize.medium,
    fontWeight:"bold"
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
    position:'absolute',
    // bottom: sizes.screenHeight * 0.05,
    // marginBottom: 0,
    top: sizes.screenHeight * 0.7,
  },
  label: {
    color: colors.black,
    fontSize: fontSize.medium,
    marginLeft: sizes.screenWidth * 0.03,
    marginBottom: sizes.screenHeight * 0.01,
    fontWeight: '500',
  },
  input: {
    backgroundColor: colors.white,
    width: sizes.screenWidth * 0.8,
    borderRadius: sizes.screenWidth * 0.5,
    alignSelf: 'center',
    color: colors.black,
    paddingLeft: sizes.screenWidth * 0.05,
    borderWidth: 1,
    borderColor: colors.disabledBg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 2,
  },
  inputIOS: {
    backgroundColor: colors.white,
    width: sizes.screenWidth * 0.8,
    borderRadius: sizes.screenWidth * 0.5,
    alignSelf: 'center',
    color: colors.black,
    paddingLeft: sizes.screenWidth * 0.05,
    fontSize:fontSize.medium,
    borderWidth: 1,
    borderColor: colors.disabledBg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 2,
    padding: sizes.screenHeight * 0.02,
  },
  top2: {
    bottom: sizes.screenHeight * 0.05,
  },
  inputTop2: {
    bottom: sizes.screenHeight * 0.04,
  },
  errorView: {
    bottom: sizes.screenHeight * 0.04,
    alignSelf: 'flex-start',
    left: sizes.screenWidth * 0.14,
    // paddingBottom: 2,
    // paddingTop: 2,
  },
  errorText: {
    color: colors.error,
    fontSize: fontSize.smallM,
  },
  checkmark: {
    height: sizes.screenHeight * 0.04,
    width: sizes.screenHeight * 0.04,
    bottom: sizes.screenHeight * 0.05,
  },
  modelText: {
    fontSize: fontSize.medium,
    textAlign: 'center',
    color: colors.black,
    width: sizes.screenWidth * 0.5,
    fontWeight: '500',
    bottom: sizes.screenHeight * 0.03,
  },
  blueText: {
    color: colors.appTextColor1,
    fontWeight:'800'
  },
  submitTopModal: {
    bottom: sizes.screenHeight * 0.1,
  },
  signInBtnModal: {
    height: sizes.screenHeight * 0.06,
    width: sizes.screenWidth * 0.4,
    alignSelf: 'center',
    backgroundColor: colors.appTextColor1,
    borderRadius: sizes.screenWidth * 0.02,
  },
  modalView: {
    backgroundColor: colors.white,
    height: sizes.screenHeight * 0.33,
    width: sizes.screenWidth * 0.7,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.06,
    justifyContent: 'center',
  },
  loader: {
    alignSelf: 'center',
    backgroundColor: colors.appTextColor1,
    padding: sizes.screenHeight * 0.02,
    width: sizes.screenWidth * 0.5,
    borderRadius: sizes.screenWidth * 0.03,
  },
  btnTextIOS2: {
    textAlign: 'center',
    marginTop: sizes.screenHeight * 0.018,
    color: colors.black,
    fontWeight: '700',
    fontSize: fontSize.medium,
  },
});
