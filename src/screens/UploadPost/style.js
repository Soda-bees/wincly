import { Dimensions, StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, sizes } from '../../services';

export const styles = StyleSheet.create({
  container: { height: sizes.screenHeight, backgroundColor: colors.white },
  profile: {
    height: sizes.screenHeight * 0.07,
    width: sizes.screenHeight * 0.07,
    borderRadius: sizes.screenHeight * 0.5,
    borderWidth: sizes.screenWidth * 0.007,
    borderColor: colors.appTextColor1,
  },
  username: {
    color: colors.black,
    fontWeight: '500',
    left: sizes.screenWidth * 0.02,
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: sizes.screenWidth * 0.03,
    paddingBottom: sizes.screenHeight * 0.01
  },
  uploadImg: {
    width: sizes.screenWidth * 0.9,
    height: sizes.screenHeight * 0.23,
    alignSelf: 'center',
    borderRadius: sizes.screenHeight * 0.03,
    marginTop: sizes.screenHeight * 0.02,
  },
  ratingInputIOS: {
    height: sizes.screenHeight * 0.45,
    textAlignVertical: 'top',
    width: sizes.screenWidth * 0.8,
    borderRadius: sizes.screenWidth * 0.05,
    padding: sizes.screenWidth * 0.06,
    color: colors.black,
    fontSize: fontSize.h6,
    backgroundColor: colors.grayBg,
    paddingTop: sizes.screenHeight * 0.02,
  },
  ratingInput: {
    height: sizes.screenHeight * 0.14,
    alignSelf: 'center',
    textAlignVertical: 'top',
    width: sizes.screenWidth * 0.9,
    borderRadius: sizes.screenWidth * 0.05,
    paddingHorizontal: sizes.screenWidth * 0.05,
    color: colors.black,
    fontSize: fontSize.medium,
    backgroundColor: colors.white,
    marginTop: sizes.screenHeight * 0.02,
    borderColor: colors.grayBg,
    borderWidth: 1,
  },
  startDateView: {
    width: sizes.screenWidth * 0.9,
    height: sizes.screenHeight * 0.07,
    alignSelf: 'center',
    marginTop: sizes.screenHeight * 0.02,
    borderColor: colors.grayBg,
    borderWidth: 1,
    borderRadius: sizes.screenHeight * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor:"red"
    paddingHorizontal: sizes.screenWidth * 0.03,
  },
  startTimeView: {
    width: sizes.screenWidth * 0.43,
    height: sizes.screenHeight * 0.07,
    // alignSelf:"center",
    marginTop: sizes.screenHeight * 0.02,
    borderColor: colors.grayBg,
    borderWidth: 1,
    borderRadius: sizes.screenHeight * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor:"red",
    paddingHorizontal: sizes.screenWidth * 0.03,
  },
  timeView: {
    width: sizes.screenWidth * 0.9,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dateImg: {
    height: sizes.screenHeight * 0.04,
    width: sizes.screenHeight * 0.04,
  },
  text1: {
    color: colors.disabledBg2,
    fontSize: fontSize.small,
    fontWeight: '500',
  },

  insideStartDateView: {
    // backgroundColor:"pink",
    flexDirection: 'column',
    marginLeft: sizes.screenWidth * 0.02,
  },
  insideStartDateView1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropImg: {
    height: sizes.screenHeight * 0.017,
    width: sizes.screenWidth * 0.05,
  },
  dropItem: {
    fontSize: fontSize.large,
    color: colors.black,
    fontWeight: 'bold',
    // marginLeft: sizes.screenWidth * 0.03,
    textAlign: 'center',
  },
  dropItem2: {
    fontSize: fontSize.regular,
    color: colors.black,
    fontWeight: 'bold',
    // marginLeft: sizes.screenWidth * 0.03,
    textAlign: 'center',
  },
  dropDown: {
    backgroundColor: colors.grayBg,
    padding: sizes.screenHeight * 0.015,
    width: sizes.screenWidth * 0.8,
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.5,
  },
  personInput: {
    color: colors.black,
    width: sizes.screenWidth * 0.9,
    height: sizes.screenHeight * 0.06,
    backgroundColor: colors.white,
    borderColor: colors.disabledBg2,
    borderWidth: 1,
    borderRadius: sizes.screenWidth * 0.03,
    alignSelf: 'center',
    marginTop: sizes.screenHeight * 0.02,
    paddingLeft: sizes.screenWidth * 0.05,
    fontSize:fontSize.medium
  },
  personInput2: {
    color: colors.black,
    width: sizes.screenWidth * 0.9,
    height: sizes.screenHeight * 0.06,
    backgroundColor: colors.white,
    borderColor: colors.error,
    borderWidth: 1,
    borderRadius: sizes.screenWidth * 0.03,
    alignSelf: 'center',
    marginTop: sizes.screenHeight * 0.02,
    paddingLeft: sizes.screenWidth * 0.05,
    fontSize:fontSize.medium
  },
  titleInput: {
    color: colors.black,
    width: sizes.screenWidth * 0.9,
    height: sizes.screenHeight * 0.06,
    backgroundColor: colors.white,
    borderColor: colors.grayBg,
    borderWidth: 1,
    borderRadius: sizes.screenWidth * 0.03,
    alignSelf: 'center',
    marginTop: sizes.screenHeight * 0.02,
    paddingLeft: sizes.screenWidth * 0.05,
    fontSize:fontSize.medium
  },
  btnViewIOS: {
    marginBottom: sizes.screenHeight * 0.09,
    marginTop:10
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
  modalView: {
    backgroundColor: colors.white,
    height: sizes.screenHeight * 0.33,
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
    width: sizes.screenWidth * 0.4,
    fontWeight: '500',
    bottom: sizes.screenHeight * 0.03,
  },
  blueText: {
    color: colors.appTextColor1,
    fontWeight: '800',
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
  noPostModal: {
    backgroundColor: colors.white,
    borderRadius: sizes.screenWidth * 0.02,
    padding: sizes.screenWidth * 0.03
  },
  noPostModalText: {
    color: colors.black,
    fontSize: fontSize.medium,
    fontWeight: '500'
  },
  noPostModalBtnView: {
    marginTop: sizes.screenHeight * 0.015
  }
});
