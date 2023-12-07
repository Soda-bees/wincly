import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  padding: {
    padding: sizes.screenWidth * 0.05,
    marginTop: sizes.screenHeight * 0.02,
  },
  backArrow: {
    height: sizes.screenHeight * 0.05,
    width: sizes.screenHeight * 0.05,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingRight: sizes.screenWidth * 0.08,
    fontSize: fontSize.h4,
    color: colors.black,
    fontWeight: 'bold',
  },
  skipView: {
    marginLeft: sizes.screenWidth * 0.45,
  },
  skipText: {
    fontSize: fontSize.h6,
    color: colors.appTextColor1,
  },
  skipIcon: {
    fontSize: fontSize.h6,
    color: colors.appTextColor1,
    top: sizes.screenHeight * 0.003,
  },
});
