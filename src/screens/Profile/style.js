import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {height: sizes.screenHeight, backgroundColor: colors.white},
  backgrouondImg: {
    width: sizes.screenWidth,
    height: sizes.screenHeight * 0.3,
  },
  profileImg: {
    width: sizes.screenWidth * 0.4,
    height: sizes.screenWidth * 0.4,
    alignSelf: 'center',
    borderColor: colors.white,
    borderWidth: sizes.screenWidth * 0.015,
    borderRadius: sizes.screenWidth * 0.3,
    top: sizes.screenHeight * 0.075,
  },
  text1: {
    color: colors.disabledBg2,
    marginTop: sizes.screenHeight * 0.12,
    marginLeft: sizes.screenWidth * 0.14,
  },
  text2: {
    color: colors.black,
    borderColor: colors.disabledBg2,
    borderWidth: 1,
    width: sizes.screenWidth * 0.8,
    height: sizes.screenHeight * 0.05,
    borderRadius: sizes.screenWidth * 0.06,
    alignSelf: 'center',
    paddingLeft: sizes.screenWidth * 0.06,
    textAlignVertical: 'center',
    fontSize: fontSize.h6,
    fontWeight: '500',
    marginTop: sizes.screenHeight * 0.01,
  },
  text2IOS: {
    color: colors.black,
    borderColor: colors.disabledBg2,
    borderWidth: 1,
    width: sizes.screenWidth * 0.8,
    height: sizes.screenHeight * 0.05,
    borderRadius: sizes.screenWidth * 0.06,
    alignSelf: 'center',
    paddingLeft: sizes.screenWidth * 0.06,
    textAlignVertical: 'center',
    fontSize: fontSize.h6,
    fontWeight: '500',
    marginTop: sizes.screenHeight * 0.01,
    paddingTop: sizes.screenHeight * 0.01,
  },
  text3: {
    color: colors.disabledBg2,
    marginTop: sizes.screenHeight * 0.02,
    marginLeft: sizes.screenWidth * 0.14,
  },
});
