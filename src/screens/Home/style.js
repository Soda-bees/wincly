import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {height: sizes.screenHeight, backgroundColor: colors.white},
  profile: {
    height: sizes.screenHeight * 0.07,
    width: sizes.screenHeight * 0.07,
    borderRadius: sizes.screenHeight * 0.5,
    borderWidth: sizes.screenWidth * 0.007,
    borderColor: colors.appTextColor1,
  },
  padding: {
    padding: sizes.screenHeight * 0.02,
    paddingBottom: sizes.screenHeight * 0.01,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: colors.black,
    fontWeight: '500',
    left: sizes.screenWidth * 0.02,
  },
  between: {
    justifyContent: 'space-between',
    paddingRight: sizes.screenHeight * 0.015,
    paddingLeft: sizes.screenHeight * 0.015,
  },
  share: {
    height: sizes.screenHeight * 0.03,
    width: sizes.screenWidth * 0.045,
  },
  shareIOS:{
 height: sizes.screenHeight * 0.02,
    width: sizes.screenWidth * 0.032,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  input: {
    backgroundColor: colors.white,
    width: sizes.screenWidth * 0.75,
    height: sizes.screenHeight * 0.055,
    borderRadius: sizes.screenWidth * 0.5,
    alignSelf: 'center',
    color: colors.black,
    fontSize: fontSize.medium,
    paddingLeft: sizes.screenWidth * 0.05,
    borderWidth: 1,
    borderColor: colors.disabledBg,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.15,
    // shadowRadius: 2.84,
    // elevation: 2,
  },
  inputIOS: {
    backgroundColor: colors.white,
    width: sizes.screenWidth * 0.75,
    borderRadius: sizes.screenWidth * 0.5,
    alignSelf: 'center',
    color: colors.black,
    paddingLeft: sizes.screenWidth * 0.05,
    fontSize: fontSize.medium,
    borderWidth: 1,
    borderColor: colors.disabledBg,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.15,
    // shadowRadius: 2.84,
    // elevation: 2,
    padding: sizes.screenHeight * 0.02,
  },
  alignCenter: {
    alignSelf: 'center',
    left: sizes.screenWidth * 0.02,
  },
  photos: {
    height: sizes.screenHeight * 0.04,
    width: sizes.screenHeight * 0.04,
    marginBottom: sizes.screenHeight * 0.01,
  },
  photoText: {
    color: colors.appTextColor1,
    fontWeight: '500',
    right: sizes.screenWidth * 0.008,
  },
  eventCard: {
    backgroundColor: colors.white,
    padding: 20,
    // height:400,
    width: sizes.screenWidth * 0.9,
    alignSelf: 'center',
    marginTop: sizes.screenHeight * 0.04,
    borderRadius: sizes.screenWidth * 0.03,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 3,
  },
  eventCardProfileImg: {
    height: sizes.screenHeight * 0.07,
    width: sizes.screenHeight * 0.07,
    borderRadius: sizes.screenHeight * 0.5,
    borderWidth: sizes.screenWidth * 0.007,
    borderColor: colors.appTextColor1,
  },
  eventCardImgView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventCardUsernameText: {
    color: colors.black,
    marginLeft: sizes.screenWidth * 0.02,
    fontWeight: '600',
    fontSize: fontSize.large,
  },
  eventCardTimeText: {
    color: colors.disabledBg2,
    marginLeft: sizes.screenWidth * 0.02,
    fontSize: fontSize.small,
  },
  eventCardInterest: {
    color: colors.disabledBg2,
    marginTop: sizes.screenHeight * 0.01,
    fontSize: fontSize.medium,
  },
  eventCardTitle: {
    color: colors.black,
    marginTop: sizes.screenHeight * 0.01,
    fontSize: fontSize.medium,
    fontWeight: '500',
  },
  eventCardDis: {
    color: colors.black,
    fontWeight: '400',
    fontSize: fontSize.medium,
    marginTop: sizes.screenHeight * 0.02,
    // backgroundColor:"red"
    lineHeight: sizes.screenHeight * 0.03,
  },
  eventCardImg: {
    width: sizes.screenWidth * 0.79,
    height: sizes.screenHeight * 0.45,
    borderRadius: sizes.screenWidth * 0.03,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 2,
    marginTop: sizes.screenHeight * 0.02,
  },
  createPostBtn: {
    backgroundColor: colors.white,
    width: sizes.screenWidth * 0.85,
    height: sizes.screenHeight * 0.055,
    borderRadius: sizes.screenWidth * 0.5,
    alignSelf: 'center',
    // color: colors.black,
    // fontSize: fontSize.medium,
    paddingLeft: sizes.screenWidth * 0.05,
    borderWidth: 1,
    borderColor: colors.disabledBg,
    // backgroundColor:"red",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  marginBtm: {
    marginBottom: sizes.screenHeight * 0.12,
  },
  createPostText: {
    color: colors.gray,
    fontSize: fontSize.medium,
  },
  loaderView: {
    // backgroundColor:"red",
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderViewIOS: {
    marginTop: sizes.screenHeight * 0.3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noPostText: {
    color: colors.disabledBg2,
    fontSize: fontSize.large,
    fontWeight: 'bold',
    textAlign: 'center',
    width: sizes.screenWidth * 0.75,
    marginBottom:sizes.screenHeight * 0.06
  },
  noPostView: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  modalView: {
    backgroundColor: colors.white,
    height: sizes.screenHeight * 0.45,
    width: sizes.screenWidth * 0.85,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.06,
    // justifyContent: 'center',
    paddingTop: sizes.screenHeight * 0.07,
  },
 acceptedModalView: {
    backgroundColor: colors.white,
    height: sizes.screenHeight * 0.4,
    width: sizes.screenWidth * 0.85,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.06,
    // justifyContent: 'center',
    paddingTop: sizes.screenHeight * 0.07,
  },
  declineModalView: {
    backgroundColor: colors.white,
    height: sizes.screenHeight * 0.27,
    width: sizes.screenWidth * 0.85,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.06,
    // justifyContent: 'center',
    paddingTop: sizes.screenHeight * 0.07,
  },
  declineMark: {
    height: sizes.screenHeight * 0.052,
    width: sizes.screenHeight * 0.055,
    bottom: sizes.screenHeight * 0.05,
    tintColor:"red"
  },
  modelText: {
    fontSize: fontSize.medium,
    textAlign: 'center',
    color: colors.black,
    width: sizes.screenWidth * 0.65,
    // paddingHorizontal:sizes.screenWidth * 0.04,
    fontWeight: '500',
    bottom: sizes.screenHeight * 0.03,
    // backgroundColor:"red"
  },
    DeclineModelText: {
    fontSize: fontSize.medium,
    textAlign: 'center',
    color: colors.black,
    width: sizes.screenWidth * 0.75,
    // paddingHorizontal:sizes.screenWidth * 0.04,
    fontWeight: '500',
    bottom: sizes.screenHeight * 0.03,
    // backgroundColor:"red"
  },
  blueText: {
    color: colors.appTextColor1,
    fontWeight: '800',
  },
  submitTopModal: {
    bottom: sizes.screenHeight * 0.16,
    // backgroundColor:"red"
  },
  submitTopAcceptedModal: {
    bottom: sizes.screenHeight * 0.1,
    // backgroundColor:"red"
  },
  declineSubmitTopModal: {
    bottom: sizes.screenHeight * 0.09,
    // backgroundColor:"red"
  },
  signInBtnModal: {
    height: sizes.screenHeight * 0.065,
    width: sizes.screenWidth * 0.75,
    alignSelf: 'center',
    backgroundColor: colors.appTextColor1,
    borderRadius: sizes.screenWidth * 0.09,
    marginBottom: sizes.screenHeight * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInBtnAcceptedModalBtn: {
    height: sizes.screenHeight * 0.065,
    width: sizes.screenWidth * 0.75,
    alignSelf: 'center',
    backgroundColor: colors.appTextColor1,
    borderRadius: sizes.screenWidth * 0.09,
    // marginBottom: sizes.screenHeight * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInBtnModal2: {
    height: sizes.screenHeight * 0.065,
    width: sizes.screenWidth * 0.75,
    alignSelf: 'center',
    backgroundColor: '#FF3131',
    borderRadius: sizes.screenWidth * 0.09,
    marginBottom: sizes.screenHeight * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpContent: {
    // paddingRight: sizes.screenWidth * 0.05,
    // paddingLeft: sizes.screenWidth * 0.05,
  },
  btnTextIOS: {
    textAlign: 'center',
    marginTop: sizes.screenHeight * 0.018,
    color: colors.black,
    fontWeight: '700',
    fontSize: fontSize.medium,
  },
  btnText: {
    // textAlign: 'center',
    // marginTop: sizes.screenHeight * 0.015,
    color: colors.black,
    fontWeight: '500',
    fontSize: fontSize.h5,
  },
  btnText2: {
    // textAlign: 'center',
    // marginTop: sizes.screenHeight * 0.015,
    color: colors.white,
    fontWeight: '500',
    fontSize: fontSize.h5,
  },
  modalBtnImg: {
    height: sizes.screenHeight * 0.026,
    width: sizes.screenWidth * 0.067,
    marginRight: sizes.screenWidth * 0.02,
  },
  modalProfileView: {
    // backgroundColor:"red",
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:"center",

    // fontSize: fontSize.medium,
    // textAlign: 'center',
    // color: colors.black,
    width: sizes.screenWidth * 0.75,
    // paddingHorizontal:sizes.screenWidth * 0.04,
    // fontWeight: '500',
    // bottom: sizes.screenHeight * 0.03,
    // backgroundColor:"red"
    marginTop:sizes.screenHeight * 0.01,
    marginBottom:sizes.screenHeight * 0.01
  },
  modalprofileImg: {
    height: sizes.screenHeight * 0.07,
    width: sizes.screenHeight * 0.07,
    borderRadius: sizes.screenHeight * 0.5,
    borderWidth: sizes.screenWidth * 0.007,
    borderColor: colors.appTextColor1,
  },
  locationImg: {
    width: sizes.screenWidth * 0.04,
    height: sizes.screenHeight * 0.02,
  },
  modalLocationView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    left: sizes.screenWidth * 0.01,
    marginTop: sizes.screenHeight * 0.005,
  },
  ModalLocationText: {
    color: colors.black,
    // marginLeft: sizes.screenWidth * 0.01,
    fontWeight: '500',
    fontSize: fontSize.small,
  },
  modalEventTitle: {
    color: colors.black,
    width: sizes.screenWidth * 0.75,
    marginTop: sizes.screenHeight * 0.02,
    fontWeight: '500',
  },
  modalEventTitleText: {
    color: colors.gray,
    width: sizes.screenWidth * 0.75,
    // marginTop:sizes.screenHeight * 0.01,
  },
  checkmark: {
    height: sizes.screenHeight * 0.04,
    width: sizes.screenHeight * 0.04,
    bottom: sizes.screenHeight * 0.05,
  },
  eventAcceptModal:{
    backgroundColor:colors.white,
    paddingHorizontal:sizes.screenHeight * 0.02,
    paddingBottom:sizes.screenHeight * 0.02,
    borderRadius:sizes.screenWidth * 0.02
  },
  acceptedModalMapView:{
    backgroundColor:colors.white,
    marginTop:sizes.screenHeight * 0.02,
    padding:sizes.screenWidth * 0.02,
    borderRadius:sizes.screenWidth * 0.02,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 3,

  },
  acceptedModalText: {
    fontSize: fontSize.medium,
    textAlign: 'center',
    color: colors.black,
    alignSelf:"center",
    fontWeight: '500',
  },
  acceptedModalBtnView:{
    width:sizes.screenWidth * 0.8,
    height:sizes.screenHeight * 0.07,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:'space-evenly'
  },
  acceptModalAcceptBtn:{
    backgroundColor:"#AEF014",
      width:sizes.screenWidth * 0.35,
      height:sizes.screenHeight* 0.05,
      borderRadius:sizes.screenWidth * 0.05,
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"center"
  },
  acceptModalRejectBtn:{
    backgroundColor:"#FF3131",
      width:sizes.screenWidth * 0.35,
      height:sizes.screenHeight* 0.05,
      borderRadius:sizes.screenWidth * 0.05,
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"center"
  },
  acceptModalBtnImg:{
    height:sizes.screenHeight * 0.03,
    width:sizes.screenHeight * 0.043,
    marginRight:sizes.screenWidth *0.01
  },
  acceptModalBtnText:{
    color:"black",
    color: colors.black,
    fontWeight: '700',
    fontSize: fontSize.medium,
  },
  acceptModalBtnText2:{
    color:colors.white,
    fontWeight: '700',
    fontSize: fontSize.medium,
  },
  
  acceptModalTitleHeading:{
    fontSize:fontSize.medium,
    fontWeight:'500',
    color:colors.black,
    marginTop:sizes.screenHeight * 0.01
  },
  forBtnTbs:{
    width:sizes.screenWidth , 
    height:sizes.screenHeight * 0.1,
    backgroundColor:colors.white,
    bottom:0,
    position:'absolute',
    zIndex:1
  }
});
