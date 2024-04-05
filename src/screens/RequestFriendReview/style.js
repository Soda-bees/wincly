import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    height: sizes.screenHeight,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  profile: {
    marginTop: sizes.screenHeight * 0.08,
    height: sizes.screenHeight * 0.07,
    width: sizes.screenHeight * 0.07,
    borderRadius: sizes.screenHeight * 0.5,
    borderWidth: sizes.screenWidth * 0.007,
    borderColor: colors.appTextColor1,
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
  username: {
    fontSize: fontSize.medium,
    color: colors.black,
    fontWeight: '500',
  },
  loginHead: {
    textAlign: 'center',
    fontSize: fontSize.h3,
    fontWeight: '700',
    color: colors.black,
    marginBottom: sizes.screenHeight * 0.02,
  },
  head2: {
    marginTop: sizes.screenHeight * 0.04,
    textAlign: 'center',
    fontSize: fontSize.h5,
    color: colors.black,
    // fontWeight: 'bold',
    width: sizes.screenWidth * 0.7,
    alignSelf: 'center',
  },
  head3: {
    marginTop: sizes.screenHeight * 0.02,
    textAlign: 'center',
    fontSize: fontSize.h6,
    color: colors.black,
    fontWeight: 'bold',
    width: sizes.screenWidth * 0.8,
    alignSelf: 'center',
    lineHeight: sizes.screenHeight * 0.03,
  },
  head4: {
    marginTop: sizes.screenHeight * 0.02,
    flexDirection: 'row',
    textAlign: 'center',
    fontSize: fontSize.medium,
    color: colors.black,
    fontWeight: '500',
    width: sizes.screenWidth * 0.9,
    alignSelf: 'center',
    lineHeight: sizes.screenHeight * 0.03,
  },
  head4Combination: {
    color: colors.black,
    fontWeight: '800',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  btnTop: {
    marginTop: sizes.screenHeight * 0.05,
  },
  scrollContainer: {
    marginTop: sizes.screenHeight * 0.01,
    width: sizes.screenWidth * 0.8,
    maxHeight: sizes.screenHeight * 0.17,
  },
  friendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  margin: {
    marginTop: sizes.screenHeight * 0.01,
  },
  imageContainer: {
    width: sizes.screenWidth * 0.2,
    height: sizes.screenWidth * 0.15,
  },
  image: {
    height: sizes.screenHeight * 0.065,
    width: sizes.screenHeight * 0.065,
    borderRadius: sizes.screenHeight * 0.5,
    borderWidth: sizes.screenWidth * 0.008,
    borderColor: colors.appTextColor1,
  },
  modalContainer: {
    width: sizes.screenWidth * 0.7,
    backgroundColor: colors.white,
    alignSelf: 'center',
    shadowColor: '#000',
    borderRadius: sizes.screenWidth * 0.04,
    paddingVertical: sizes.screenHeight * 0.02,
    paddingHorizontal: sizes.screenWidth * 0.04,
  },
  modalCross: {
    alignSelf: 'flex-end',
  },
  modalHeading: {
    color: colors.black,
    fontSize: fontSize.extraLarge,
    fontWeight: '600',
    textAlign: 'center',
    width: sizes.screenWidth * 0.65,
    alignSelf: 'center',
  },
  modalImage: {
    marginTop: sizes.screenHeight * 0.01,
    alignSelf: 'center',
  },
  modalText: {
    marginTop: sizes.screenHeight * 0.01,
    alignSelf: 'center',
    color: colors.gray,
    fontWeight: '500',
    textAlign: 'center',
    width: sizes.screenWidth * 0.6,
    lineHeight: sizes.screenHeight * 0.025,
    fontSize: fontSize.medium,
  },
  modalButton: {
    marginTop: sizes.screenHeight * 0.04,
    alignSelf: 'center',
    backgroundColor: colors.appTextColor1,
    padding: sizes.screenHeight * 0.02,
    width: sizes.screenWidth * 0.45,
    borderRadius: sizes.screenWidth * 0.03,
  },
  modalBtnText: {
    textAlign: 'center',
    fontSize: fontSize.h6,
    color: colors.black,
    fontWeight: 'bold',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  modalHead: {
    marginTop:sizes.screenHeight* 0.02,
    textAlign: 'center',
    fontSize: fontSize.h4,
    fontWeight: '700',
    color: colors.black,
  },
  userNameModal:{
    color: colors.black,
    fontWeight: '500',
    textAlign:'center'
  },
  modalUserDetails: {
    alignItems: 'center',
    marginTop:sizes.screenHeight* 0.04,
    bottom:sizes.screenHeight* 0.02
  },
  profileModal: {
    height: sizes.screenHeight * 0.07,
    width: sizes.screenHeight * 0.07,
    borderRadius: sizes.screenHeight * 0.5,
    borderWidth: sizes.screenWidth * 0.007,
    borderColor: colors.appTextColor1,
  },
  loaderView:{
    backgroundColor:colors.appTextColor1,
    width:sizes.screenWidth * 0.5
  }
 
});
