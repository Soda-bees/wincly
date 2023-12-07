import { Dimensions, StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, sizes } from '../../services';

export const styles = StyleSheet.create({
  content: {
    height: sizes.screenHeight,
    width: sizes.screenWidth,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  reviewView: {
    width: sizes.screenWidth * 0.9,
    height: sizes.screenHeight * 0.52,
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.03,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 3,
  },
  btnViewIOS: {
    marginBottom: sizes.screenHeight * 0.09,
  },
  btnView: {
    marginBottom: sizes.screenHeight * 0.02,
    marginTop: sizes.screenHeight * 0.02,
  },
  loader: {
    alignSelf: 'center',
    backgroundColor: colors.appTextColor1,
    padding: sizes.screenHeight * 0.02,
    width: sizes.screenWidth * 0.5,
    borderRadius: sizes.screenWidth * 0.03,
  },
  reviewInsideView: {
    // backgroundColor:'red'
    alignItems: 'center',
    bottom: sizes.screenHeight * 0.08,
  },
  profileView: {
    height: sizes.screenHeight * 0.15,
    width: sizes.screenHeight * 0.15,
    borderRadius: sizes.screenHeight * 0.5,
    borderWidth: sizes.screenWidth * 0.007,
    borderColor: colors.appTextColor1,
    // bottom: sizes.screenHeight * 0.08,
    alignSelf: 'center'

  },
  usernameText: {
    color: colors.black,
    // alignSelf:'center',
    fontSize: fontSize.h5,
    fontWeight: '600',
    marginTop: sizes.screenWidth * 0.01,
    marginBottom: sizes.screenWidth * 0.01
  },
  reviewText: {
    color: colors.disabledBg2,
    marginBottom: sizes.screenWidth * 0.01

  },
  reviewInput: {
    height: sizes.screenHeight * 0.3,
    textAlignVertical: 'top',
    width: sizes.screenWidth * 0.8,
    borderRadius: sizes.screenWidth * 0.05,
    padding: sizes.screenWidth * 0.05,
    color: colors.black,
    fontSize: fontSize.h6,
    backgroundColor: colors.grayBg,
    marginTop: sizes.screenHeight * 0.01
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
  modalView2: {
    backgroundColor: colors.white,
    height: sizes.screenHeight * 0.23,
    width: sizes.screenWidth * 0.7,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.06,
    justifyContent: 'center',
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
    width: sizes.screenWidth * 0.45,
    fontWeight: '500',
    bottom: sizes.screenHeight * 0.03,
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
  signUpContent: {
    paddingRight: sizes.screenWidth * 0.05,
    paddingLeft: sizes.screenWidth * 0.05,
  },
  btnTextIOS: {
    textAlign: 'center',
    marginTop: sizes.screenHeight * 0.018,
    color: colors.black,
    fontWeight: '700',
    fontSize: fontSize.medium,
  },
  btnText: {
    textAlign: 'center',
    marginTop: sizes.screenHeight * 0.015,
    color: colors.black,
    fontWeight: '700',
    fontSize: fontSize.medium,
  },
  blueText: {
    color: colors.appTextColor1,
    fontWeight: '800',
  },
});
