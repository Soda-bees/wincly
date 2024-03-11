import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {height: sizes.screenHeight, backgroundColor: colors.white},
  firstPic: {
    backgroundColor: colors.grayBg2,
    height: sizes.screenHeight * 0.35,
    width: sizes.screenWidth * 0.8,
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.1,
  },
  plusImg: {
    height: sizes.screenHeight * 0.07,
    width: sizes.screenHeight * 0.07,
    alignSelf: 'center',
    top: sizes.screenHeight * 0.14,
  },
  top: {
    marginTop: sizes.screenHeight * 0.012,
  },
  top2: {
    marginTop: sizes.screenHeight * 0.05,
    marginBottom: sizes.screenHeight * 0.023,
  },
  label: {
    color: colors.black,
    fontSize: fontSize.medium,
    marginLeft: sizes.screenWidth * 0.13,
    marginBottom: sizes.screenHeight * 0.01,
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
  btnTop: {
    marginTop: sizes.screenHeight * 0.04,
  },
  errorText: {
    color: colors.error,
    fontSize: fontSize.smallM,
    paddingLeft: sizes.screenWidth * 0.13,
    marginTop: sizes.screenHeight * 0.02,
  },
  loader: {
    alignSelf: 'center',
    backgroundColor: colors.appTextColor1,
    padding: sizes.screenHeight * 0.02,
    width: sizes.screenWidth * 0.5,
    borderRadius: sizes.screenWidth * 0.03,
  },
  bgImage: {
    height: sizes.screenHeight * 0.09,
    resizeMode: 'cover',
    width: sizes.screenWidth,
    marginBottom: sizes.screenHeight * -0.04,
  },
  
});
