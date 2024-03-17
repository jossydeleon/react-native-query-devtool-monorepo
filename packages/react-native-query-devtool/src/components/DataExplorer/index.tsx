import React from "react";

import { View } from "react-native";

import JSONTreeData from "../JSONTreeData";
import { styles } from "./style";

interface Props {
  selectedQueryData: any;
  searchTerm: string;
  onSelectedNode: (nodeTitle: string, node: any) => void;
}

const DataExplorer: React.FC<Props> = ({
  selectedQueryData,
  searchTerm,
  onSelectedNode,
}) => {
  if (!selectedQueryData) return null;

  return (
    <View style={styles.container}>
      <JSONTreeData
        data={selectedQueryData}
        searchTerm={searchTerm}
        onSelectedNode={onSelectedNode}
      />
    </View>
  );
};

export default DataExplorer;
