import { StyleSheet } from "react-native";
import { colors, fontSize, sizes } from "../../services";

export const styles = StyleSheet.create({
    container: {
        height: sizes.screenHeight,
        backgroundColor: colors.white,
      },
      bg: {
        height: sizes.screenHeight * 0.53,
        width: sizes.screenWidth,
      },
      padding: {
        padding: sizes.screenHeight * 0.05,
      },
      btnTop: {
        marginTop: sizes.screenHeight * 0.04,
      },
      heading: {
        textAlign: 'center',
        fontSize: fontSize.h4,
        fontWeight: '700',
        color: colors.black,
        lineHeight: sizes.screenHeight * 0.04,
        marginTop: sizes.screenHeight * 0.03,
      },
      subText: {
        textAlign: 'center',
        color: colors.black,
        fontSize: fontSize.medium,
        marginTop: sizes.screenHeight * 0.02,
      },
})