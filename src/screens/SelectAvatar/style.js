import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {height: sizes.screenHeight, backgroundColor: colors.white},
  content: {
    alignItems: 'center',
    marginTop: sizes.screenHeight * 0.1,
  },
  loginHead: {
    textAlign: 'center',
    fontSize: fontSize.h4,
    fontWeight: '700',
    color: colors.black,
  },
  imgTop: {
    marginTop: sizes.screenHeight * 0.05,
  },
  avatar: {
    height: sizes.screenHeight * 0.15,
    width: sizes.screenHeight * 0.15,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectBtn: {
    backgroundColor: colors.appTextColor1,
    padding: sizes.screenHeight * 0.01,
    borderTopLeftRadius: sizes.screenWidth * 0.03,
    borderTopRightRadius: sizes.screenWidth * 0.03,
  },
  selectBtn2: {
    backgroundColor: colors.appTextColor1,
    padding: sizes.screenHeight * 0.01,
    width: sizes.screenWidth * 0.3,
    borderTopLeftRadius: sizes.screenWidth * 0.03,
    borderTopRightRadius: sizes.screenWidth * 0.03,
  },
  selectBtnDisabled: {
    backgroundColor: colors.disabledBg,
    padding: sizes.screenHeight * 0.01,
    borderTopLeftRadius: sizes.screenWidth * 0.03,
    borderTopRightRadius: sizes.screenWidth * 0.03,
  },
  selectBtnDisabled2: {
    backgroundColor: colors.disabledBg,
    padding: sizes.screenHeight * 0.01,
    width: sizes.screenWidth * 0.3,
    borderTopLeftRadius: sizes.screenWidth * 0.03,
    borderTopRightRadius: sizes.screenWidth * 0.03,
  },
  selectBtnText: {
    color: colors.black,
    fontWeight: '500',
  },
  avatarImg: {
    height: sizes.screenHeight * 0.1,
    width: sizes.screenHeight * 0.1,
  },
  avatarCard: {
    width: Dimensions.get('window').width / 3.7,
    paddingLeft: sizes.screenHeight * 0.02,
    paddingBottom: sizes.screenHeight * 0.03,
  },
  avatarView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'center',
    top: sizes.screenHeight * 0.03,
  },
  btnTop: {
    marginTop: sizes.screenHeight * 0.03,
  },
  btnTopOutfits:{
    bottom: sizes.screenHeight * 0.02,
  },
  avatarFull: {
    height: sizes.screenHeight * 0.4,
    width: sizes.screenHeight * 0.4,
    alignSelf: 'center',
  },
  head: {
    color: colors.black,
    fontSize: fontSize.h6,
    right: sizes.screenWidth * 0.07,
    fontWeight: 'bold',
  },
  padding: {
    padding: sizes.screenWidth * 0.03,
    marginLeft: sizes.screenWidth * 0.2,
    marginTop: sizes.screenHeight * 0.03,
    bottom: sizes.screenHeight * 0.02,
  },
  padding2: {
    marginLeft: sizes.screenWidth * 0.23,
    bottom: sizes.screenHeight * 0.03,

  },
  line: {
    width: sizes.screenWidth * 0.11,
    right: sizes.screenWidth * 0.045,
    marginBottom: sizes.screenHeight * 0.02,
    height: sizes.screenHeight * 0.003,
    bottom: sizes.screenHeight * 0.004,
  },
  line2: {
    width: sizes.screenWidth * 0.07,
    height: sizes.screenHeight * 0.003,
    bottom: sizes.screenHeight * 0.004,
    right: sizes.screenWidth * 0.008,
    marginBottom: sizes.screenHeight * 0.02,
  },
  outfit: {
    height: sizes.screenHeight * 0.1,
    width: sizes.screenWidth * 0.7,
    right: sizes.screenWidth * 0.07,
    bottom: sizes.screenHeight * 0.01,
  },
  outfitTop:{
    marginTop:sizes.screenHeight*0.02
  }
});
