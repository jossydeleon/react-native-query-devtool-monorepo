import React from 'react';

import { Image, Pressable, StyleSheet } from 'react-native';
import Icons from '../../utils/images';

interface Props {
  onPress?: () => void;
}

const CopyButton: React.FC<Props> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Image
        source={{
          uri: Icons.CopyIcon,
        }}
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
