import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {height: sizes.screenHeight, backgroundColor: colors.white},
  head: {
    textAlign: 'center',
    fontSize: fontSize.h3,
    color: colors.black,
    fontWeight: 'bold',
    width: sizes.screenWidth * 0.7,
    alignSelf: 'center',
  },
  marginTop: {
    marginTop: sizes.screenHeight * 0.04,
    alignSelf: 'center',
  },
  ratingInput: {
    height: sizes.screenHeight * 0.44,
    textAlignVertical: 'top',
    width: sizes.screenWidth * 0.8,
    borderRadius: sizes.screenWidth * 0.05,
    padding: sizes.screenWidth * 0.05,
    color: colors.black,
    fontSize: fontSize.h6,
    backgroundColor: colors.grayBg,
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
  btnTop: {
    marginTop: sizes.screenHeight * 0.05,
  },
  errorText: {
    color: colors.error,
    paddingLeft: sizes.screenWidth * 0.13,
    fontSize: fontSize.smallM,
    marginTop: sizes.screenHeight * 0.01,
  },
});
