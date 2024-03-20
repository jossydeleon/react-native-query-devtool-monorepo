import React from 'react';

import { Image, Pressable, StyleSheet } from 'react-native';

import copyIcon from '../../../assets/copy.png';

interface Props {
  onPress?: () => void;
}

const CopyButton: React.FC<Props> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Image source={copyIcon} style={styles.container} />
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
