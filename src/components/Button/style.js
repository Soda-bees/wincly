import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize, sizes} from '../../services';

export const styles = StyleSheet.create({
  greenBtn: {
    alignSelf: 'center',
    backgroundColor: colors.appTextColor1,
    padding:sizes.screenHeight*0.02,
    width:sizes.screenWidth*0.5,
    borderRadius:sizes.screenWidth*0.03
  },
  disableBtn: {
    alignSelf: 'center',
    backgroundColor: colors.disabledBg,
    padding:sizes.screenHeight*0.02,
    width:sizes.screenWidth*0.5,
    borderRadius:sizes.screenWidth*0.03
  },
  
  darkBtn:{
    alignSelf: 'center',
    backgroundColor: colors.black,
    padding:sizes.screenHeight*0.02,
    width:sizes.screenWidth*0.5,
    borderRadius:sizes.screenWidth*0.03
  },
  greenBtnText:{
    textAlign:'center',
    fontSize:fontSize.h6,
    color:colors.black,
    fontWeight:'bold'
  },
  darkBtnText:{
    textAlign:'center',
    fontSize:fontSize.h6,
    color:colors.appTextColor1,
    fontWeight:'bold'
  }
});
