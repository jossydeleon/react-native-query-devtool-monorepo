/* eslint-disable no-console */
import React, { ReactNode, useCallback } from "react";

import { ScrollView, Text, View } from "react-native";

import JSONTree from "react-native-json-tree";

import getNodeValue from "../../utils/getNodeValue";
import CopyButton from "../CopyButton";
import SearchButton from "../SearchButton";
import Toast from "../Toast";
import theme from "./treeTheme";
import useJSONTreeData from "./useJSONTreeData";

import { styles } from "./styles";

interface Props {
  data: any;
  searchTerm: string;
  onSelectedNode: (nodeTitle: string, node: any) => void;
}

const JSONTreeData: React.FC<Props> = ({
  data,
  searchTerm,
  onSelectedNode,
}) => {
  const { showToast, handleShowToast } = useJSONTreeData();

  /**
   * Returns a custom Text with the Copy Icon for Nodes
   * @param type - The type of the node.
   * @param data - The data of the node.
   * @param itemType - The React element representing the type of the node {} or [].
   * @param itemString - The string representation of the item.
   * @returns Text with the Copy Icon
   */
  const getItemStringRenderer = useCallback(
    (
      type: any,
      dataRendered: any,
      itemType: ReactNode,
      itemString: string | number | undefined,
    ) => {
      return (
        <View style={styles.valueContainer}>
          <Text style={styles.itemString}>
            {itemType}
            <Text>{` ${itemString}`}</Text>
          </Text>

          {type === "Object" || type === "Array" || type === "Iterable" ? (
            <CopyButton
              onPress={() => {
                console.log("📋", JSON.stringify(dataRendered));
                handleShowToast();
              }}
            />
          ) : null}
        </View>
      );
    },
    [handleShowToast],
  );

  /**
   * Returns a custom Text with the Copy Icon for label values (Primitives)
   * @param keyPath - The key path for values.
   * @param  nodeType - The type of the node.
   * @returns element containing the rendered custom Text with the Copy Icon for values.
   */
  const labelRenderer = useCallback(
    (keyPath: string[], nodeType?: unknown) => {
      if (nodeType === "Array") {
        return (
          <View style={styles.valueContainer}>
            <SearchButton
              onPress={() => {
                const value = getNodeValue(data, keyPath);
                onSelectedNode(keyPath[0], value);
              }}
            />
            <Text style={styles.textStyle}>{`${keyPath[0]}:`}</Text>
          </View>
        );
      }

      return (
        <View style={styles.valueContainer}>
          {nodeType !== "Object" &&
            nodeType !== "Array" &&
            nodeType !== "Iterable" && (
              <CopyButton
                onPress={() => {
                  console.log("📋", getNodeValue(data, keyPath));
                  handleShowToast();
                }}
              />
            )}
          <Text style={styles.textStyle}>{`${keyPath[0]}:`}</Text>
        </View>
      );
    },
    [data, handleShowToast, onSelectedNode],
  );

  /**
   * Returns a custom Text with the value highligthed based on `searchTerm`
   */
  const valueRenderer = (value: any) => {
    if (!searchTerm.trim()) return value;

    const regex = new RegExp(searchTerm, "gi");
    const parts = value.toString().split(regex);

    return parts.map((part: string, index: number) => (
      <Text key={index}>
        {index > 0 && <Text style={styles.yellowBackground}>{searchTerm}</Text>}
        {part}
      </Text>
    ));
  };

  return (
    <ScrollView style={styles.container} horizontal>
      <JSONTree
        data={data}
        theme={{
          ...theme,
          valueLabel: {
            fontWeight: "bold",
            fontFamily: "Courier New",
          },
        }}
        keyPath={["data"]}
        invertTheme={false}
        getItemString={getItemStringRenderer}
        labelRenderer={labelRenderer}
        valueRenderer={valueRenderer}
      />

      {showToast && <Toast message="Value was printed in your terminal" />}
    </ScrollView>
  );
};

export default JSONTreeData;
