import { Dimensions, StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, sizes } from '../../services';

export const styles = StyleSheet.create({
  container: {
    height: sizes.screenHeight,
    backgroundColor: colors.white,
  },
  loaderView: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noEventTextView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noEventText: {
    color: colors.disabledBg2,
    fontSize: fontSize.large,
    fontWeight: 'bold',
    marginBottom: sizes.screenHeight * 0.06
  },
  reviewContainer: {
    width: sizes.screenWidth * 0.9,
    backgroundColor: colors.white,
    alignSelf: 'center',
    marginTop: sizes.screenHeight * 0.01,
    marginBottom: sizes.screenHeight * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
    padding: sizes.screenWidth * 0.03,
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
  profileImg: {
    height: sizes.screenHeight * 0.08,
    width: sizes.screenHeight * 0.08,
    borderRadius: sizes.screenHeight * 0.5,
    borderWidth: sizes.screenWidth * 0.007,
    borderColor: colors.appTextColor1,
  },
  usernameStartsView: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  usernameText: {
    fontSize: fontSize.h5,
    color: colors.black,
    fontWeight: '500',
  },
  usernameStartsContainer: {
    marginLeft: sizes.screenWidth * 0.02,

  },
  reviewText: {
    color: colors.black,
    width: sizes.screenWidth * 0.65,
    marginTop: sizes.screenHeight * 0.005
  },
  reviewStar: {
    height: sizes.screenWidth * 0.06,
    width: sizes.screenWidth * 0.06,
    marginLeft: sizes.screenWidth * 0.01
  },
  starView: {
    flexDirection: 'row',
    marginRight: sizes.screenWidth * 0.1,
    width: sizes.screenWidth * 0.35,
    alignItems: 'center'
  }

});
