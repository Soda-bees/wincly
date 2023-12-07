import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {height: sizes.screenHeight, backgroundColor: colors.white},
  imgView: {
    alignSelf: 'center',
    marginTop: sizes.screenHeight * 0.09,
  },
  img: {
    width: sizes.screenWidth * 0.85,
    height: sizes.screenHeight * 0.35,
    borderRadius: sizes.screenHeight * 0.05,
  },
  likeBtnImg: {
    width: sizes.screenWidth * 0.18,
    height: sizes.screenHeight * 0.09,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  likeBtnImgIOS: {
    width: sizes.screenWidth * 0.19,
    height: sizes.screenHeight * 0.09,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  textView: {
    backgroundColor: colors.white,
    width: sizes.screenWidth * 0.88,
    alignSelf: 'center',
  },
  text1: {
    fontSize: fontSize.h4,
    color: colors.black,
    fontWeight: 'bold',
    marginTop: sizes.screenHeight * 0.02,
  },
  text2: {
    fontSize: fontSize.h4,
    color: colors.black,
    fontWeight: '500',
  },
  text3: {
    fontSize: fontSize.h6,
    color: colors.black,
    marginTop: sizes.screenHeight * 0.01,
    width: sizes.screenWidth * 0.8,
  },
  text4: {
    fontSize: fontSize.h5,
    color: colors.black,
    fontWeight: '700',
    width: sizes.screenWidth * 0.88,
    alignSelf: 'center',
    marginTop: sizes.screenHeight * 0.02,
  },
  interestView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: sizes.screenWidth * 0.88,
    marginLeft: sizes.screenWidth * 0.02,
  },
  interestText: {
    color: colors.disabledBg2,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: sizes.screenWidth * 0.05,
    marginTop: sizes.screenHeight * 0.015,
    marginLeft: sizes.screenWidth * 0.03,
    paddingHorizontal: sizes.screenWidth * 0.05,
    paddingVertical: sizes.screenHeight * 0.01,
    borderColor: colors.black,
  },
  interestTextIOS: {
    color: colors.disabledBg2,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: sizes.screenWidth * 0.04,
    marginTop: sizes.screenHeight * 0.015,
    marginLeft: sizes.screenWidth * 0.03,
    paddingHorizontal: sizes.screenWidth * 0.03,
    paddingVertical: sizes.screenHeight * 0.007,
    borderColor: colors.black,
  },
  btnView: {
    marginTop: sizes.screenHeight * 0.06,
    marginBottom:sizes.screenHeight * 0.05
  },
  loader: {
    alignSelf: 'center',
    backgroundColor: colors.appTextColor1,
    padding: sizes.screenHeight * 0.02,
    width: sizes.screenWidth * 0.5,
    borderRadius: sizes.screenWidth * 0.03,
  },
});
