import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    height: sizes.screenHeight,
    backgroundColor: colors.white,
  },
  bg: {
    height: sizes.screenHeight * 0.49,
    width: sizes.screenWidth,
  },
  padding: {
    padding: sizes.screenHeight * 0.03,
  },
  text: {
    textAlign: 'center',
    color: colors.black,
    fontSize: fontSize.medium,
  },
  btnTop: {
    marginTop: sizes.screenHeight * 0.04,
    marginBottom: sizes.screenHeight * 0.01,
  },
  btnTopIOS: {
    marginTop: sizes.screenHeight * 0.03,
    alignItems:'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: sizes.screenWidth * 0.2,
    paddingLeft: sizes.screenWidth * 0.2,
  },
  greenBtn: {
    backgroundColor: colors.appTextColor1,
    padding: sizes.screenHeight * 0.009,
    borderRadius: sizes.screenWidth * 0.3,
    width: sizes.screenWidth * 0.31,
  },
  greenBtnText: {
    textAlign: 'center',
    color: colors.black,
    fontSize: fontSize.medium,
    left: sizes.screenWidth * 0.02,
  },
  darkBtn: {
    backgroundColor: colors.black,
    padding: sizes.screenHeight * 0.009,
    borderRadius: sizes.screenWidth * 0.3,
    width: sizes.screenWidth * 0.31,
    marginRight: sizes.screenWidth * 0.05,
  },
  darkBtnText: {
    textAlign: 'center',
    color: colors.appTextColor1,
    fontSize: fontSize.medium,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fb: {
    height: sizes.screenHeight * 0.03,
    width: sizes.screenHeight * 0.03,
    bottom: sizes.screenHeight * 0.002,
  },
  google: {
    height: sizes.screenHeight * 0.03,
    width: sizes.screenHeight * 0.04,
    left: sizes.screenWidth * 0.01,
  },
  btnView: {
    // right: sizes.screenWidth * 0.11,
    alignSelf: 'center',
  },
});
