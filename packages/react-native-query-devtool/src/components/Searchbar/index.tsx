import React, { forwardRef } from 'react';

import { Image, TextInput, TouchableOpacity, View } from 'react-native';

import { styles } from './style';
import SearchbarProps from './types';

const Searchbar: React.ForwardRefRenderFunction<TextInput, SearchbarProps> = (
  { filter, placeholder = 'Filter', setFilter },
  ref,
) => {
  return (
    <View style={styles.container}>
      <TextInput
        ref={ref}
        style={styles.inputContainer}
        value={filter}
        onChangeText={setFilter}
        autoCapitalize="none"
        placeholder={placeholder}
        placeholderTextColor="gray"
        clearButtonMode="never"
      />
      {filter.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          activeOpacity={0.8}
          onPress={() => setFilter('')}
        >
          <Image source={require('../../../assets/clear.png')} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default forwardRef(Searchbar);
