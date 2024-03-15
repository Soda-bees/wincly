import {StyleSheet} from 'react-native';
import {colors, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    height: sizes.screenHeight,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  loginHead: {
    marginTop:sizes.screenHeight* 0.15,
    textAlign: 'center',
    fontSize: fontSize.h4,
    fontWeight: '700',
    color: colors.black,
    marginBottom: sizes.screenHeight * 0.02,
  },
  head2: {
    marginTop:sizes.screenHeight* 0.01,
    textAlign: 'center',
    fontSize: fontSize.h5,
    color: colors.black,
    fontWeight: 'bold',
    width: sizes.screenWidth * 0.7,
    alignSelf: 'center',
  },
  eventImage: {
    flex: 1,
    resizeMode:'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventImageView: {
    marginTop: sizes.screenHeight * 0.02,
    height: sizes.screenHeight * 0.18,
    width: sizes.screenWidth * 0.61,
    borderRadius: sizes.screenHeight * 0.02,
    overflow: 'hidden',
    borderColor:colors.purple,
    borderWidth:sizes.screenWidth* 0.006
  },
  head3: {
    marginTop:sizes.screenHeight* 0.02,
    textAlign: 'center',
    fontSize: fontSize.h6,
    color: colors.black,
    fontWeight: '500',
    width: sizes.screenWidth * 0.8,
    alignSelf: 'center',
    lineHeight:sizes.screenHeight* 0.03
  },
  btnTop:{
    marginTop:sizes.screenHeight * 0.05
  },
});
