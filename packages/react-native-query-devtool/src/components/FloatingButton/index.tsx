import React from "react";

import { Image, TouchableOpacity } from "react-native";

import { styles } from "./styles";

const FloatingButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.container}
    >
      <Image
        style={styles.image}
        source={require("../../../assets/rqlogo.png")}
      />
    </TouchableOpacity>
  );
};

export default FloatingButton;
