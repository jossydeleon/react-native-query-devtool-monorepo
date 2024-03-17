import React from 'react';

import { Image, TouchableOpacity } from 'react-native';

import { styles } from './styles';

interface Props {
  onPress: () => void;
}

const FloatingButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.container}
    >
      <Image style={styles.image} source={require('../../assets/rqlogo.png')} />
    </TouchableOpacity>
  );
};

export default FloatingButton;
