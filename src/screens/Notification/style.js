import { Dimensions, StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, sizes } from '../../services';

export const styles = StyleSheet.create({
  container: { height: sizes.screenHeight, backgroundColor: colors.white },

  tabView: {
    width: sizes.screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  tabBtnActive: {
    width: sizes.screenWidth * 0.32,
    height: sizes.screenHeight * 0.05,
    backgroundColor: 'pink',
    borderTopLeftRadius: sizes.screenWidth * 0.03,
    borderTopRightRadius: sizes.screenWidth * 0.03,
    backgroundColor: colors.appTextColor1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabBtnInactive: {
    width: sizes.screenWidth * 0.32,
    height: sizes.screenHeight * 0.05,
    backgroundColor: 'pink',
    borderTopLeftRadius: sizes.screenWidth * 0.03,
    borderTopRightRadius: sizes.screenWidth * 0.03,
    backgroundColor: colors.disabledBg,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabBtnText: {
    fontSize: fontSize.smallM,
    fontWeight: '600',
    color: colors.black
  },
  joinReqMapView: {
    width: sizes.screenWidth * 0.95,
    backgroundColor: colors.white,
    marginTop: sizes.screenHeight * 0.01,
    alignSelf: 'center',
    flexDirection: "row",
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 2,
    borderRadius: sizes.screenWidth * 0.02,
    paddingHorizontal: sizes.screenWidth * 0.02,
    paddingVertical: sizes.screenWidth * 0.02,
  },
  joinReqMapViewImg: {
    width: sizes.screenWidth * 0.14,
    height: sizes.screenWidth * 0.14,
    borderRadius: sizes.screenWidth * 0.07,
    borderWidth: 1,
    borderColor: colors.appTextColor1
  },
  text1: {
    color: colors.black,
    fontSize: fontSize.medium,
    fontWeight: '600',
  },
  text2: {
    color: colors.black,
    fontSize: fontSize.medium,
    width: sizes.screenWidth * 0.75,
  },
  textView: {
    height: sizes.screenWidth * 0.14,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    marginLeft: sizes.screenWidth * 0.02
  },
  marginBottom: {
    marginBottom: sizes.screenHeight * 0.02
  },
  joinReqModalView: {
    width: sizes.screenWidth * 0.95,
    backgroundColor: colors.white,
    alignSelf: 'center',
    shadowColor: '#000',
    borderRadius: sizes.screenWidth * 0.04,
    paddingBottom: sizes.screenHeight * 0.02
  },
  joinModalText1: {
    color: colors.black,
    fontSize: fontSize.medium,
    fontWeight: '600',
    textAlign: 'center',
    width: sizes.screenWidth * 0.65,
    alignSelf: 'center'
  },
  joinModalYellowText: {
    color: colors.appTextColor1
  },
  joinReqModalImg: {
    height: sizes.screenHeight * 0.07,
    width: sizes.screenHeight * 0.07,
    borderRadius: sizes.screenWidth * 0.12,
    borderColor: colors.appTextColor1,
    borderWidth: 2
  },
  joinReqModalImgView: {
    width: sizes.screenWidth * 0.85,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: sizes.screenHeight * 0.03
  },
  joinModalText2: {
    color: colors.black,
    fontSize: fontSize.medium,
    fontWeight: '600',
    width: sizes.screenWidth * 0.65,
  },
  joinModalLocationView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationImg: {
    width: sizes.screenWidth * 0.05,
    height: sizes.screenWidth * 0.05
  },
  joinModalText3: {
    color: colors.black,
    fontSize: fontSize.smallM,
    fontWeight: '500',
    marginLeft: sizes.screenWidth * 0.01
  },
  joinReqModalImgViewChild: {
    marginLeft: sizes.screenWidth * 0.03
  },
  joinModalbtnView: {
    width: sizes.screenWidth * 0.85,
    marginTop: sizes.screenHeight * 0.03,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  joinModalAcceptBtn: {
    width: sizes.screenWidth * 0.85,
    height: sizes.screenHeight * 0.063,
    backgroundColor: colors.appTextColor1,
    borderRadius: sizes.screenWidth * 0.07,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  joinModalDeclineBtn: {
    width: sizes.screenWidth * 0.85,
    height: sizes.screenHeight * 0.063,
    backgroundColor: '#FF3131',
    borderRadius: sizes.screenWidth * 0.07,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: sizes.screenHeight * 0.01
  },
  joinModalAcceptImg: {
    width: sizes.screenWidth * 0.055,
    height: sizes.screenWidth * 0.04
  },
  joinModalDeclineImg: {
    width: sizes.screenWidth * 0.05,
    height: sizes.screenWidth * 0.04
  },
  joinBtnAcceptText: {
    fontSize: fontSize.regular,
    fontWeight: '600',
    marginLeft: sizes.screenWidth * 0.01,
    color: colors.black
  },
  joinBtnDeclineText: {
    fontSize: fontSize.regular,
    fontWeight: '600',
    marginLeft: sizes.screenWidth * 0.01,
    color: colors.white
  },
  rejModalText1: {
    color: colors.black,
    width: sizes.screenWidth * 0.85,
    textAlign: 'center',
    fontSize: fontSize.medium,
    alignSelf: 'center'
  },
  rejReqModalBtn: {
    width: sizes.screenWidth * 0.8,
    backgroundColor: colors.appTextColor1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: sizes.screenHeight * 0.06,
    borderRadius: sizes.screenWidth * 0.06,
    marginTop: sizes.screenHeight * 0.02
  },
  rejReqModalBtnText: {
    fontSize: fontSize.large,
    fontWeight: '700',
    color: colors.black
  },
  notDataTextContainer: {
    backgroundColor: colors.white,
    height: sizes.screenHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  notDataText: {
    fontSize: fontSize.medium,
    fontWeight: '700',
    marginBottom: sizes.screenHeight * 0.18,
    color: colors.disabledBg2
  },
  XbtnView: {
    // backgroundColor: 'red',
    height: sizes.screenWidth * 0.08,
    width: sizes.screenWidth * 0.08,
    // position:'absolute',
    // left:sizes.screenWidth * 0.85,
    // top:5
    // bottom:
    alignSelf: 'flex-end',
    marginRight: sizes.screenWidth * 0.01,
    marginTop: sizes.screenWidth * 0.01
  },
  Xbtn: {
    height: sizes.screenWidth * 0.08,
    width: sizes.screenWidth * 0.08,
    // position:'absolute'
  }
});
