import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    height: sizes.screenHeight,
    backgroundColor: colors.white,
  },
  imgContainer: {
    alignSelf: 'center',
    width: sizes.screenWidth * 0.7,
    height: sizes.screenHeight * 0.35,
    marginTop: sizes.screenHeight * 0.05,
    resizeMode: 'contain',
  },
  heading: {
    textAlign: 'center',
    fontSize: fontSize.h4,
    fontWeight: '700',
    color: colors.black,
    paddingHorizontal: sizes.screenWidth * 0.1,
    lineHeight: sizes.screenHeight * 0.04,
    marginTop: sizes.screenHeight * 0.03,
  },
  subText: {
    textAlign: 'center',
    color: colors.black,
    fontSize: fontSize.medium,
    paddingHorizontal: sizes.screenWidth * 0.1,
    marginTop: sizes.screenHeight * 0.02,
  },
  body: {
    width: sizes.screenWidth,
    alignItems: 'center',
    height: sizes.screenHeight * 0.6,
    justifyContent: 'center',
  },
  bodyIOS: {
    width: sizes.screenWidth,
    alignItems: 'center',
    height: sizes.screenHeight * 0.6,
    justifyContent: 'center',
  },
  arrow:{
    width:sizes.screenWidth* 0.18,
    height:sizes.screenHeight*0.08,
    resizeMode:'contain',
    alignSelf:'center'
  },
  arrowContianer:{
    bottom:sizes.screenHeight* 0.1
  },
  skipContainer:{
    bottom:sizes.screenHeight* 0.04,
    alignSelf:'center',
    alignItems:'center'
  },
  skipText:{
    color:colors.gray,
    fontSize:fontSize.medium,
    fontWeight:'600',
    textAlign:'center'
  }
});
