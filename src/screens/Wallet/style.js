import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    height: sizes.screenHeight,
    backgroundColor: colors.white,
  },
  headerView: {
    backgroundColor: colors.appTextColor1,
    width: sizes.screenWidth,
    height: sizes.screenHeight * 0.14,
  },
  profileImg: {
    height: sizes.screenHeight * 0.07,
    width: sizes.screenHeight * 0.07,
    borderRadius: sizes.screenHeight * 0.5,
    borderWidth: sizes.screenWidth * 0.007,
    borderColor: colors.white,
    bottom: sizes.screenHeight * 0.08,
    alignSelf: 'flex-end',
    right: sizes.screenWidth * 0.06,
  },
  loaderView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insideContainer: {
    flex: 1,
  },
  amountview: {
    width: sizes.screenWidth * 0.9,
    height: sizes.screenHeight * 0.06,
    backgroundColor: colors.white,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.disabledBg,
    marginTop: sizes.screenHeight * 0.02,
    alignSelf: 'center',
    borderRadius: sizes.screenWidth * 0.03,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: sizes.screenWidth * 0.05,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 2,
  },
  amountViewText: {
    color: colors.black,
    fontSize: fontSize.large,
    fontWeight: '500',
  },
  walletBGImgView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletBGImg: {
    width: sizes.screenWidth * 0.8,
    height: sizes.screenHeight * 0.4,
    alignSelf: 'center',
  },
  walletCoins: {
    height: sizes.screenHeight * 0.04,
    width: sizes.screenWidth * 0.07,
  },
  coinView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountText: {
    color: colors.appTextColor1,
    marginLeft: sizes.screenWidth * 0.02,
    fontWeight: '600',
  },
  containerTwo: {
    marginTop: sizes.screenHeight * 0.03,
    paddingHorizontal: sizes.screenWidth * 0.05,
    alignItems: 'flex-start',
  },
  myWincliesImg: {
    paddingHorizontal: sizes.screenWidth * 0.05,
    height: sizes.screenHeight * 0.17,
    width: sizes.screenWidth * 0.7,
  },
  shopWIncliesImg: {
    marginTop:sizes.screenHeight*0.04,
    resizeMode: 'center',
    paddingHorizontal: sizes.screenWidth * 0.05,
    height: sizes.screenHeight * 0.235,
    width: sizes.screenWidth * 0.9,
    justifyContent:'space-around',
    
  },
  imgRowOne: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  imgRowTwo: {
    flexDirection: 'row',
    alignItems:'center',
    alignSelf:'flex-end'

  },
  shopWinclyRowTwo: {
    flexDirection: 'row',
    alignItems:'center',
    alignSelf:'flex-end',
    justifyContent:'space-around',
    width:sizes.screenWidth*0.4,
  },
  myWincliesTxt: {
    fontSize: fontSize.large,
    fontWeight: '600',
    color: colors.black,
    marginBottom:sizes.screenHeight*0.04
  },
  myWincliesAmount: {
    fontSize: fontSize.h6,
    fontWeight: '600',
    color: colors.black,
  },
});
