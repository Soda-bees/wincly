import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topIOS: {
    marginTop: sizes.screenHeight * 0.05,
  },
  center: {
    alignSelf: 'center',
    top: sizes.screenHeight * 0.01,
  },

  centerIOS: {
    alignSelf: 'center',
    // top: sizes.screenHeight * 0.02,
    bottom: 10,
  },
  profile2: {
    height: sizes.screenHeight * 0.075,
    width: sizes.screenHeight * 0.075,
    marginLeft: sizes.screenWidth * 0.03,
    borderColor: colors.white,
    borderWidth: 3,
    borderRadius: sizes.screenWidth * 0.12,
  },
  username: {
    color: colors.black,
    marginLeft: sizes.screenWidth * 0.02,
    fontSize: fontSize.h5,
    fontWeight: '600',
  },
  status: {
    color: colors.white,
    fontWeight: '500',
    marginLeft: sizes.screenWidth * 0.02,
  },
  backIcon: {
    height: sizes.screenHeight * 0.0501,
    width: sizes.screenWidth * 0.1,
    marginLeft: sizes.screenWidth * 0.04,
  },
  backIconIOS: {
    height: sizes.screenHeight * 0.0501,
    width: sizes.screenHeight * 0.0501,
  },
  chatBg: {
    height: sizes.screenHeight * 0.13,
    width: sizes.screenWidth,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: colors.appTextColor1,
    flexDirection: 'row',
    marginBottom: sizes.screenHeight * 0.01,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 9,
  },
  chatBgIOS: {
    height: sizes.screenHeight * 0.2,
    width: sizes.screenWidth,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: colors.appTextColor1,
    flexDirection: 'row',

    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 9,
  },
  sendBtn: {
    // right: sizes.screenWidth * 0.25,
    padding: sizes.screenWidth * 0.02,
  },
  sendBtnIOS: {
    paddingRight: sizes.screenWidth * 0.03,
    paddingLeft: sizes.screenWidth * 0.01,
  },
  sendImg: {
    height: sizes.screenHeight * 0.03,
    width: sizes.screenHeight * 0.03,
    // backgroundColor:'pink'
  },

  searchInput: {
    height: sizes.screenHeight * 0.06,
    width: sizes.screenWidth * 0.75,
    paddingLeft: sizes.screenWidth * 0.05,
    fontSize: fontSize.input,
    color: colors.black,
    // backgroundColor:'red'
  },

  searchInputIOS: {
    // height: sizes.screenHeight * 0.06,
    width: sizes.screenWidth * 0.75,
    paddingLeft: sizes.screenWidth * 0.05,
    fontSize: fontSize.input,
    color: colors.black,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchView: {
    height: sizes.screenHeight * 0.06,
    width: sizes.screenWidth * 0.85,
    backgroundColor: colors.white,
    borderRadius: sizes.screenWidth * 0.1,
    marginBottom: sizes.screenHeight * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#305430',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 6,
  },

  inputView: {
    alignSelf: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 30,
    paddingHorizontal: 20,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 2,
    backgroundColor: '#F2F2F2',
    shadowColor: 'black',
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.58,
    shadowRadius: 10.0,

    elevation: 5,
    marginVertical: 20,
    marginHorizontal: 5,
  },
  inputViewBlack: {
    alignSelf: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 30,
    paddingHorizontal: 20,
    borderColor: 'white',
    borderStyle: 'solid',
    borderWidth: 2,
    backgroundColor: '#13151B',
    shadowColor: 'black',
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.58,
    shadowRadius: 10.0,

    elevation: 5,
    marginVertical: 20,
    marginHorizontal: 5,
  },
  chatContainer: {
    flex: 1,
  },
  scrollviewStyle: {
    flex: 1,
  },
  mapViewWithUid: {
    marginTop: sizes.screenHeight * 0.005,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  mapViewWithoutUid: {
    marginTop: sizes.screenHeight * 0.005,
    justifyContent: 'center',
    paddingHorizontal: 10,
    alignItems: 'flex-start',
  },
  msgViewWithUid: {
    backgroundColor: colors.appTextColor1,
    padding: sizes.screenWidth * 0.025,
    borderTopLeftRadius: sizes.screenWidth * 0.025,
    borderTopRightRadius: sizes.screenWidth * 0.025,
    borderBottomLeftRadius: sizes.screenWidth * 0.025,
  },
  msgViewWithoutUid: {
    backgroundColor: colors.disabledBg,
    padding: sizes.screenWidth * 0.025,
    borderTopLeftRadius: sizes.screenWidth * 0.025,
    borderTopRightRadius: sizes.screenWidth * 0.025,
    borderBottomRightRadius: sizes.screenWidth * 0.025,
  },
  msgText: {
    fontSize: fontSize.medium,
    color: '#000',
  },

  textDelete: {
    marginBottom: sizes.screenWidth * 0.07,
    color: 'red',
    fontWeight: '600',
    fontSize: fontSize.h6,
    alignSelf:'center',
  },
});
