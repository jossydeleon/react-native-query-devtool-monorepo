import React from 'react';

import { Image, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import Icons from '../../utils/images';

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
      <Image
        style={styles.image}
        source={{
          uri: Icons.RQLogo,
        }}
      />
    </TouchableOpacity>
  );
};

export default FloatingButton;
