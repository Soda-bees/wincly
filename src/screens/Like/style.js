import { Dimensions, StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, sizes } from '../../services';

export const styles = StyleSheet.create({
  container: { height: sizes.screenHeight, backgroundColor: colors.white },
  header: {
    height: sizes.screenHeight * 0.1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: sizes.screenWidth * 0.05,
  },
  headerImg: {
    width: sizes.screenHeight * 0.05,
    height: sizes.screenHeight * 0.05,
  },
  headerImgIOS: {
    width: sizes.screenHeight * 0.05,
    height: sizes.screenHeight * 0.035,
  },
  imgView: {
    marginTop: sizes.screenHeight * 0.08,
    alignSelf: 'center',
  },
  imgView2: {
    marginTop: sizes.screenHeight * 0.15,
    width: sizes.screenWidth * 0.85,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgView2IOS: {
    marginTop: sizes.screenHeight * 0.15,
    width: sizes.screenWidth * 0.85,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backgroundImg: {
    width: sizes.screenWidth * 0.8,
    height: sizes.screenHeight * 0.55,
    borderRadius: sizes.screenWidth * 0.07,
  },
  backgroundImgIOS: {
    width: sizes.screenWidth * 0.8,
    height: sizes.screenHeight * 0.5,
    borderRadius: sizes.screenWidth * 0.07,
  },
  backgroundImg2: {
    width: sizes.screenWidth * 0.42,
    height: sizes.screenHeight * 0.38,
    borderRadius: sizes.screenWidth * 0.07,
  },
  backgroundImg2IOS: {
    width: sizes.screenWidth * 0.43,
    height: sizes.screenHeight * 0.35,
    borderRadius: sizes.screenWidth * 0.07,
    marginRight: sizes.screenWidth * 0.01,
    // marginLeft:15
  },
  text1: {
    fontSize: fontSize.h4,
    // color: colors.black,
    color: colors.white,
    fontWeight: 'bold',
    paddingLeft: sizes.screenWidth * 0.06,
    position: 'absolute',
    bottom: sizes.screenHeight * 0.1,
  },
  text4: {
    fontSize: fontSize.h3,
    color: colors.black,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: sizes.screenWidth * 0.14,
  },
  text2: {
    fontSize: fontSize.h4,
    // color: colors.black,
    color: colors.white,
    fontWeight: '400',
  },
  text3: {
    fontSize: fontSize.h6,
    // color: colors.black,
    color: colors.white,
    width: sizes.screenWidth * 0.8,
    paddingLeft: sizes.screenWidth * 0.06,
    bottom: sizes.screenHeight * 0.07,
  },
  text3IOS: {
    fontSize: fontSize.medium,
    color: colors.black,
    width: sizes.screenWidth * 0.8,
    paddingLeft: sizes.screenWidth * 0.06,
    bottom: sizes.screenHeight * 0.07,
  },
  text5: {
    fontSize: fontSize.h6,
    color: colors.black,
    width: sizes.screenWidth * 0.8,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: sizes.screenHeight * 0.02,
  },
  btnView: {
    width: sizes.screenWidth * 0.8,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: sizes.screenWidth * 0.06,
    position: 'absolute',
    top: sizes.screenHeight * 0.68,
    zIndex: -1,
  },
  swipeTpuchable: {},

  btnViewIOS: {
    width: sizes.screenWidth * 0.8,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: sizes.screenHeight * 0.01,
    paddingHorizontal: sizes.screenWidth * 0.06,
    top: sizes.screenHeight * 0.66,

  },
  Btn: {
    width: sizes.screenHeight * 0.08,
    height: sizes.screenHeight * 0.08,
  },
  BtnIOS: { width: sizes.screenHeight * 0.07, height: sizes.screenHeight * 0.07 },
  likeBtnImg: {
    width: sizes.screenWidth * 0.18,
    height: sizes.screenHeight * 0.09,
    position: 'absolute',
    right: sizes.screenWidth * 0.33,
    top: sizes.screenHeight * 0.33,
  },
  chatBtn: {
    width: sizes.screenHeight * 0.055,
    height: sizes.screenHeight * 0.045,
    // position: 'absolute',
    // right: sizes.screenWidth * 0.33,
    // top: sizes.screenHeight * 0.33,
  },
  likeBtnImgIOS: {
    width: sizes.screenWidth * 0.19,
    height: sizes.screenHeight * 0.09,
    position: 'absolute',
    right: sizes.screenWidth * 0.33,
    top: sizes.screenHeight * 0.3,
  },
  chatBtnView: {
    // backgroundColor: 'pink',
    paddingRight: sizes.screenWidth * 0.07,
    marginTop: sizes.screenHeight * 0.03,
  },

  containerSwiper: {
    flex: 1,
    backgroundColor: 'pink',
  },
  card: {
    width: sizes.screenWidth * 0.8,
    height: sizes.screenHeight * 0.7,
    alignSelf: 'center',
    // flex: 1,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
  loaderView: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loaderViewIOS: {
    marginTop: sizes.screenHeight * 0.35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forBtnTbs: {
    width: sizes.screenWidth,
    height: sizes.screenHeight * 0.1,
    backgroundColor: colors.white,
    bottom: 0,
    position: 'absolute',
    zIndex: 1
  },
  noPostView: {
    height: sizes.screenHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noPostText: {
    color: colors.disabledBg2,
    fontSize: fontSize.large,
    fontWeight: 'bold',
    textAlign: 'center',
    width: sizes.screenWidth * 0.75,
    marginBottom: sizes.screenHeight * 0.2
  },
  tooltipStyle: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    margin: 0,
    borderRadius: 0,
  },
  guideTopIcon: {
    marginTop: sizes.screenHeight * 0.011,
    width: sizes.screenHeight * 0.05,
    height: sizes.screenHeight * 0.035,
    resizeMode: 'contain',
    right: sizes.screenWidth * 0.1,
  },
  guideArrow: {
    marginTop: sizes.screenHeight * 0.2,
    right: sizes.screenWidth * 0.03,

    // right:sizes.screenWidth*0.2
  },
  guideHeading: {
    fontSize: fontSize.h3,
    fontWeight: '700',
    color: colors.appTextColor1,
    lineHeight: sizes.screenHeight * 0.04,
    marginTop: sizes.screenHeight * 0.03,
    right: sizes.screenWidth * 0.03,
  },
  guideSubText: {
    color: colors.white,
    fontSize: fontSize.large,
    marginTop: sizes.screenHeight * 0.02,
    fontWeight: '400',
    width: sizes.screenWidth * 0.7,
    right: sizes.screenWidth * 0.03,

  },
  guideHand: {
    marginTop: sizes.screenHeight * 0.01,
    alignSelf: 'center',
  },
  swipeLeftContainer:{
    backgroundColor:'red',
    marginStart:sizes.screenWidth* 0.35
  },
  guideIcon2:{
    width: sizes.screenHeight * 0.055,
    height: sizes.screenHeight * 0.045,
    left: sizes.screenWidth * 0.69,
    marginTop:sizes.screenHeight* 0.015
  },
  guideHeading2: {
    fontSize: fontSize.h3,
    fontWeight: '700',
    color: colors.appTextColor1,
    lineHeight: sizes.screenHeight * 0.04,
    marginTop: sizes.screenHeight * 0.03,
    right: sizes.screenWidth * 0.03,
  },
  guideSubText2: {
    color: colors.white,
    fontSize: fontSize.large,
    marginTop: sizes.screenHeight * 0.02,
    fontWeight: '400',
    width: sizes.screenWidth * 0.7,
    right: sizes.screenWidth * 0.03,

  },
  guideHand2: {
    marginTop: sizes.screenHeight * 0.01,
    right: sizes.screenWidth * 0.06,

    // alignSelf: 'center',
  },
  guideArrow2: {
    marginTop: sizes.screenHeight * 0.01,
    left: sizes.screenWidth * 0.35,

    // right:sizes.screenWidth*0.2
  },
});
