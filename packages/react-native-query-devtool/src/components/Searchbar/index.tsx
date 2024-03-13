import React from "react";

import { TextInput } from "react-native";

import { styles } from "./style";
import SearchbarProps from "./types";

const Searchbar: React.FC<SearchbarProps> = ({
  filter,
  placeholder = "Filter",
  setFilter,
}) => {
  return (
    <TextInput
      style={styles.inputContainer}
      value={filter}
      onChangeText={setFilter}
      autoCapitalize="none"
      placeholder={placeholder}
      placeholderTextColor="black"
    />
  );
};

export default Searchbar;
