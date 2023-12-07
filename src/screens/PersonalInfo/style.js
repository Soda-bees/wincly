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
  margin: {
    marginTop: sizes.screenHeight * 0.03,
  },
  margin2:{
        marginTop: sizes.screenHeight * 0.02,
  },
  marginTop: {
    marginTop: sizes.screenHeight * 0.05,
  },
  dropItem: {
    fontSize: fontSize.h6,
    color: '#ADADAD',
    fontWeight: 'bold',
    marginLeft: sizes.screenWidth * 0.03,
    textAlign: 'center',
  },
  dropItem2: {
    fontSize: fontSize.h7,
    color: colors.black,
    fontWeight: '400',
    marginLeft: sizes.screenWidth * 0.03,
  },
  dropDown: {
    backgroundColor: colors.grayBg,
    padding: sizes.screenHeight * 0.015,
    width: sizes.screenWidth * 0.8,
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.5,
  },
  dropDownFocused: {
    backgroundColor: colors.appTextColor1,
    padding: sizes.screenHeight * 0.015,
    width: sizes.screenWidth * 0.8,
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.5,
  },
  head2: {
    textAlign: 'center',
    fontSize: fontSize.h3,
    color: colors.black,
    fontWeight: '500',
    width: sizes.screenWidth * 0.7,
    alignSelf: 'center',
  },
  btnTop:{
    marginTop:sizes.screenHeight*0.06
  },
  errorText: {
    color: colors.error,
    fontSize: fontSize.smallM,
    paddingLeft: sizes.screenWidth * 0.13,
    marginTop:sizes.screenHeight * 0.02
    // marginTop:sizes.screenHeight * 0.04
  },
});
