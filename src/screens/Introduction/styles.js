import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    height: sizes.screenHeight,
    backgroundColor: colors.white,
  },
  bg: {
    height: sizes.screenHeight * 0.53,
    width: sizes.screenWidth,
  },
  padding: {
    padding: sizes.screenHeight * 0.05,
  },
  text: {
    textAlign: 'center',
    color: colors.black,
    fontSize: fontSize.large,
  },
  textDescription: {
    marginTop: sizes.screenHeight * 0.03,
    textAlign: 'center',
    color: colors.gray,
    fontSize: fontSize.medium,
    lineHeight: 20,
  },
  btnTop: {
    marginTop: sizes.screenHeight * 0.04,
  },
});
