import React from "react";

import { Image, Pressable, StyleSheet } from "react-native";

interface Props {
  onPress?: () => void;
}

const SearchButton: React.FC<Props> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Image
        source={require("../../../assets/search.png")}
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

export default SearchButton;
