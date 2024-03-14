import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import { QueryDevtoolData } from '../../types';
import { styles } from './style';
import QueryRowProps from './types';

const QueryRow: React.FC<QueryRowProps> = ({
  item,
  index,
  isSelected,
  handleSelectedRow,
}) => {
  const getStyle = (query: QueryDevtoolData) => {
    if (query.observers === 0) {
      return { backgroundColor: 'gray' };
    }

    if (query.isFetching) {
      return { backgroundColor: 'blue' };
    }

    if (query.isStale) {
      return { backgroundColor: 'orange' };
    }

    return { backgroundColor: 'green' };
  };

  return (
    <TouchableOpacity onPress={() => handleSelectedRow(index)}>
      <View style={styles.container}>
        <View style={[styles.observersContainer, getStyle(item)]}>
          <Text style={styles.observerNumber}>{item.observers}</Text>
        </View>
        <Text
          style={[styles.queryKey, isSelected ? styles.queryKeySelected : {}]}
        >
          {JSON.stringify(item?.queryKey)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default QueryRow;
