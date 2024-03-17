import React from "react";

import { View } from "react-native";

import JSONTreeData from "../JSONTreeData";
import { styles } from "./style";

interface Props {
  selectedQueryData: any;
  searchTerm: string;
  onSelectedToCopy: (node: any) => void;
  onSelectedNode: (nodeTitle: string, node: any) => void;
}

const DataExplorer: React.FC<Props> = ({
  selectedQueryData,
  searchTerm,
  onSelectedToCopy,
  onSelectedNode,
}) => {
  if (!selectedQueryData) return null;

  return (
    <View style={styles.container}>
      <JSONTreeData
        data={selectedQueryData}
        searchTerm={searchTerm}
        onSelectedToCopy={onSelectedToCopy}
        onSelectedNode={onSelectedNode}
      />
    </View>
  );
};

export default DataExplorer;
