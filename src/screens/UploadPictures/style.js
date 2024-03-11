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
  top: {
    marginTop: sizes.screenHeight * 0.05,
  },
  firstPic: {
    backgroundColor: colors.grayBg2,
    height: sizes.screenHeight * 0.2,
    width: sizes.screenWidth * 0.8,
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.1,
  },

  plusImg: {
    height: sizes.screenHeight * 0.05,
    width: sizes.screenHeight * 0.05,
    alignSelf: 'center',
    top: sizes.screenHeight * 0.07,
  },
  secondPlus: {
    height: sizes.screenHeight * 0.035,
    width: sizes.screenHeight * 0.035,
    alignSelf: 'center',
    top: sizes.screenHeight * 0.08,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: sizes.screenWidth * 0.05,
    paddingRight: sizes.screenWidth * 0.05,
    marginTop: sizes.screenHeight * 0.03,
  },
  secondPic: {
    backgroundColor: colors.grayBg2,
    height: sizes.screenHeight * 0.2,
    width: sizes.screenWidth * 0.37,
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.1,
  },
  btnTop: {
    marginTop: sizes.screenHeight * 0.04,
  },
  errorText: {
    color: colors.error,
    paddingLeft: sizes.screenWidth * 0.13,
    fontSize: fontSize.smallM,
    marginTop:sizes.screenHeight * 0.02
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
