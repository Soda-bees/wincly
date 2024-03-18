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
    // backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.03,
    alignItems: 'center',

    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.15,
    // shadowRadius: 2.84,
    // elevation: 3,
  },
  btnViewIOS: {
    marginBottom: sizes.screenHeight * 0.09,
  },
  btnView: {
    marginBottom: sizes.screenHeight * 0.03,
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
    // backgroundColor:'red',
    alignItems: 'center',
    // bottom: sizes.screenHeight * 0.1,
  },
  profileView: {
    height: sizes.screenHeight * 0.07,
    width: sizes.screenHeight * 0.07,
    borderRadius: sizes.screenHeight * 0.5,
    borderWidth: sizes.screenWidth * 0.007,
    borderColor: colors.appTextColor1,
    // bottom: sizes.screenHeight * 0.08,
    alignSelf: 'center',
    marginTop:sizes.screenHeight* 0.04
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
    marginTop:sizes.screenHeight* 0.03,
    color: colors.black,
    fontSize:fontSize.h4
    // marginBottom: sizes.screenWidth * 0.01

  },
  reviewInput: {
    height: sizes.screenHeight * 0.15,
    textAlignVertical: 'top',
    width: sizes.screenWidth * 0.8,
    borderRadius: sizes.screenWidth * 0.05,
    padding: sizes.screenWidth * 0.05,
    color: colors.black,
    fontSize: fontSize.h6,
    backgroundColor: colors.grayBg,
    marginTop: sizes.screenHeight * 0.01,
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
  locationView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationImg: {
    width: sizes.screenWidth * 0.05,
    height: sizes.screenHeight * 0.025,
  },
  locationText: {
    color: colors.black,
    marginLeft: sizes.screenWidth * 0.01,
    fontWeight: '500',
    fontSize: fontSize.small,
  },
  loginHead: {
    textAlign: 'center',
    fontSize: fontSize.h3,
    fontWeight: '700',
    color: colors.black,
    marginBottom: sizes.screenHeight * 0.02,
  },
  head2: {
    textAlign: 'center',
    fontSize: fontSize.h6,
    color: colors.black,
    fontWeight: '600',
    width: sizes.screenWidth * 0.7,
    alignSelf: 'center',
    lineHeight: sizes.screenHeight * 0.03 
  },
  eventImage: {
    flex: 1,
    resizeMode:'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventImageView: {
    marginTop: sizes.screenHeight * 0.02,
    height: sizes.screenHeight * 0.18,
    width: sizes.screenWidth * 0.61,
    borderRadius: sizes.screenHeight * 0.02,
    overflow: 'hidden',
    borderColor:colors.purple,
    borderWidth:sizes.screenWidth* 0.006,
    marginBottom:sizes.screenHeight * 0.02
  },
  firendRow:{
    flexDirection:'row',
    marginTop:sizes.screenHeight* 0.01,
    alignItems:'center',
    alignSelf:'flex-start',

  },
  eventOrganizerProfile:{
    height: sizes.screenHeight * 0.06,
    width: sizes.screenHeight * 0.06,
    borderRadius: sizes.screenHeight * 0.5,
    borderWidth: sizes.screenWidth * 0.008,
    borderColor: colors.appTextColor1,
  },
  eventOrganizerNameTxt:{
    color:colors.black,
    fontSize:fontSize.medium,
    marginStart:sizes.screenWidth * 0.02,
    fontWeight:'600'
  },
  bg:{
    backgroundColor:'red'
  }
});
