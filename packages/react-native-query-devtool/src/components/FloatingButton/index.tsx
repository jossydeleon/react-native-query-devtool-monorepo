import React from 'react';

import { Image, TouchableOpacity } from 'react-native';

import { styles } from './styles';

import rqLogo from '../../../assets/rqlogo.png';

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
      <Image style={styles.image} source={rqLogo} />
    </TouchableOpacity>
  );
};

export default FloatingButton;
