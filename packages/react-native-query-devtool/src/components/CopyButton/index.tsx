import React from "react";
import { Image, Pressable, StyleSheet } from "react-native";

const CopyButton: React.FC<{ onPress?: () => void }> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Image
        source={require("../../../assets/copy.png")}
        style={styles.container}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 14,
    height: 14,
    marginRight: 5,
  },
});

export default CopyButton;
