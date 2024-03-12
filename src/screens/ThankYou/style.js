import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    height: sizes.screenHeight,
    backgroundColor: colors.white,
  },
  body:{
    alignItems:'center',
    marginTop:sizes.screenHeight* 0.2,
  },
  head: {
    textAlign: 'center',
    fontSize: fontSize.h3,
    color: colors.black,
    fontWeight: 'bold',
    width: sizes.screenWidth * 0.7,
    alignSelf: 'center',
  },
  imageContainer:{
    marginTop:sizes.screenHeight*0.03
  },
  head2: {
    marginTop:sizes.screenHeight* 0.03,
    textAlign: 'center',
    fontSize: fontSize.h4,
    color: colors.black,
    fontWeight: '500',
    width: sizes.screenWidth * 0.67,
    alignSelf: 'center',
  },
  btnTop:{
    marginTop:sizes.screenHeight * 0.2
  },
})