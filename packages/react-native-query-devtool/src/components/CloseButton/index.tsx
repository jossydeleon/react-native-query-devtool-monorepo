import React from 'react';

import { Pressable, StyleSheet, View } from 'react-native';

const CloseButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.close} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },
  close: {
    width: 20,
    alignSelf: 'flex-end',
    borderWidth: 2,
    borderRadius: 3,
    borderColor: 'white',
  },
});

export default CloseButton;
