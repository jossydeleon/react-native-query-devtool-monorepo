import React from 'react';

import { Text, View } from 'react-native';

import JSONTree from 'react-native-json-tree';

import theme from './treeTheme';
import JSONTreeSearcheableProps from './types';

import { styles } from './styles';

const JSONTreeSearcheable: React.FC<JSONTreeSearcheableProps> = ({
  data,
  searchTerm = '',
}) => {
  const valueRenderer = (value: string) => {
    if (!searchTerm.trim()) return value;

    const regex = new RegExp(searchTerm, 'gi');
    const parts = value.toString().split(regex);

    return parts.map((part, index) => (
      <Text key={index}>
        {index > 0 && <Text style={styles.yellowBackground}>{searchTerm}</Text>}
        {part}
      </Text>
    ));
  };

  return (
    <View style={styles.container}>
      <JSONTree
        data={data}
        theme={{
          ...theme,
          valueLabel: {
            fontWeight: 'bold',
            fontFamily: 'Courier New',
          },
        }}
        invertTheme={false}
        // labelRenderer={labelRenderer}
        valueRenderer={valueRenderer}
      />
    </View>
  );
};

export default JSONTreeSearcheable;
