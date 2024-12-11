import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {height: sizes.screenHeight, backgroundColor: colors.white},
  head: {
    textAlign: 'center',
    fontSize: fontSize.h3,
    color: colors.black,
    fontWeight: 'bold',
  },
  padding: {
    padding: sizes.screenHeight * 0.05,
  },
  greenText: {
    fontSize: fontSize.h6,
    color: colors.appTextColor1,
    fontWeight: 'bold',
  },
  text: {
    fontSize: fontSize.h6,
    color: colors.black,
    fontWeight: 'bold',
  },
  textRed: {
    fontSize: fontSize.h6,
    color: 'red',
    fontWeight: 'bold',
  },
  top: {
    marginTop: sizes.screenHeight * 0.02,
  },
  btnTop: {
    marginTop: sizes.screenHeight * 0.28,
  },
});
