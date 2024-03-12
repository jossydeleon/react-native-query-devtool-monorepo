import React from 'react';

import { View } from 'react-native';

import JSONTreeSearcheable from '../JSONTreeSearcheable';
import { styles } from './style';

const DataExplorer = ({ selectedQuery }) => {
  if (!selectedQuery) return null;

  return (
    <View style={styles.container}>
      <JSONTreeSearcheable data={selectedQuery} />
    </View>
  );
};

export default DataExplorer;
