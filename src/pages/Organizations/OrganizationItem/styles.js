import { StyleSheet } from "react-native";
import { colors, metrics } from "./../../../styles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    padding: metrics.basePadding,
    marginTop: metrics.baseMargin,
    alignItems: "center"
  },
  avatar: {
    width: 50,
    height: 50
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.darker,
    marginTop: metrics.baseMargin
  }
});

export default styles;
