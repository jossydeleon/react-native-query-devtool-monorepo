import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    zIndex: 9999,
    position: "absolute",
    bottom: 50,
    left: 30,
    borderRadius: 100,
  },
  image: {
    width: 40,
    height: 40,
    objectFit: "contain",
  },
});
