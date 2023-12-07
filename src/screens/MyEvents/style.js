import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {height: sizes.screenHeight, backgroundColor: colors.white},
  headerView: {
    width: sizes.screenWidth,
    height: sizes.screenHeight * 0.15,
    backgroundColor: colors.appTextColor1,
    justifyContent: 'center',
    borderBottomLeftRadius: sizes.screenWidth * 0.07,
    borderBottomRightRadius: sizes.screenWidth * 0.07,
  },
  noEventTextView: {
    // backgroundColor:"pink",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noEventText: {
    color: colors.disabledBg2,
    fontSize: fontSize.large,
    fontWeight: 'bold',
  },
  loaderView: {
    // backgroundColor:"red",
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventCard: {
    backgroundColor: colors.white,
    padding: 20,
    // height:400,
    width: sizes.screenWidth * 0.9,
    alignSelf: 'center',
    marginTop: sizes.screenHeight * 0.04,
    borderRadius: sizes.screenWidth * 0.03,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 3,
  },
  eventCardImgView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventCardProfileImg: {
    height: sizes.screenHeight * 0.07,
    width: sizes.screenHeight * 0.07,
    borderRadius: sizes.screenHeight * 0.5,
    borderWidth: sizes.screenWidth * 0.007,
    borderColor: colors.appTextColor1,
  },
  eventCardUsernameText: {
    color: colors.black,
    marginLeft: sizes.screenWidth * 0.02,
    fontWeight: '600',
    fontSize: fontSize.large,
  },
  eventCardTimeText: {
    color: colors.disabledBg2,
    marginLeft: sizes.screenWidth * 0.02,
    fontSize: fontSize.small,
  },
  eventCardTitle: {
    color: colors.black,
    marginTop: sizes.screenHeight * 0.01,
    fontSize: fontSize.medium,
    fontWeight: '500',
  },
  eventCardInterest: {
    color: colors.disabledBg2,
    marginTop: sizes.screenHeight * 0.01,
    fontSize: fontSize.medium,
  },
  eventCardDis: {
    color: colors.black,
    fontWeight: '400',
    fontSize: fontSize.medium,
    marginTop: sizes.screenHeight * 0.02,
    lineHeight: sizes.screenHeight * 0.03,
  },
  eventCardImg: {
    width: sizes.screenWidth * 0.79,
    height: sizes.screenHeight * 0.45,
    borderRadius: sizes.screenWidth * 0.03,
    marginTop: sizes.screenHeight * 0.02,
  },
  marginBtm: {
    marginBottom: sizes.screenHeight * 0.02,
  },
});
