import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {height: sizes.screenHeight, backgroundColor: colors.white},
  head: {
    textAlign: 'center',
    fontSize: fontSize.h5,
    color: colors.black,
    fontWeight: 'bold',
  },
  btnTop: {
    marginTop: sizes.screenHeight * 0.2,
  },
  btnTop2: {
    marginTop: sizes.screenHeight * 0.44,
  },
  dropDown: {
    backgroundColor: colors.appTextColor1,
    padding: sizes.screenHeight * 0.02,
    width: sizes.screenWidth * 0.8,
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.5,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  margin: {
    marginTop: sizes.screenHeight * 0.03,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropItem: {
    fontSize: fontSize.h6,
    color: colors.black,
    fontWeight: 'bold',
    marginLeft: sizes.screenWidth * 0.03,
  },
  dropIcon: {
    height: sizes.screenHeight * 0.015,
    width: sizes.screenHeight * 0.015,
    right: sizes.screenWidth * 0.05,
    top: sizes.screenHeight * 0.007,
  },
  dropList: {
    backgroundColor: colors.white,
    padding: sizes.screenHeight * 0.02,
    width: sizes.screenWidth * 0.7,
    alignSelf: 'center',
    height: sizes.screenHeight * 0.24,
    borderBottomLeftRadius: sizes.screenWidth * 0.09,
    borderBottomRightRadius: sizes.screenWidth * 0.09,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropInner: {
    fontSize: fontSize.h6,
    color: colors.disabledBg2,
    fontWeight: '500',
    left: sizes.screenWidth * 0.03,
  },
  dropInnerBlack: {
    fontSize: fontSize.h6,
    color: colors.black,
    fontWeight: '500',
    left: sizes.screenWidth * 0.03,
  },
  dropBtn: {
    width: sizes.screenWidth * 0.7,
    padding: sizes.screenHeight * 0.01,
    right: sizes.screenWidth * 0.04,
  },
  dropBtn2: {
    width: sizes.screenWidth * 0.7,
    padding: sizes.screenHeight * 0.01,
    right: sizes.screenWidth * 0.04,
    borderBottomLeftRadius: sizes.screenWidth * 0.03,
    borderBottomRightRadius: sizes.screenWidth * 0.03,
  },
  greenBg: {
    backgroundColor: colors.appTextColor1,
  },
});
