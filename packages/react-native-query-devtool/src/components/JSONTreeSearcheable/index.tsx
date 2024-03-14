import React, { ReactNode, useState } from "react";

import { Text, View } from "react-native";

import JSONTree from "react-native-json-tree";
import getNodeValue from "../../utils/getNodeValue";
import CopyButton from "../CopyButton";

import theme from "./treeTheme";
import JSONTreeSearcheableProps from "./types";

import { styles } from "./styles";
import Toast from "../Toast";

const JSONTreeSearcheable: React.FC<JSONTreeSearcheableProps> = ({
  data,
  searchTerm = "",
}) => {
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  /**
   * Returns a custom Text with the Copy Icon for Nodes
   * @param {string} type - The type of the node.
   * @param {any} data - The data of the node.
   * @param {ReactNode} itemType - The React element representing the type of the node {} or [].
   * @param {string | number | undefined} itemString - The string representation of the item.
   * @returns {ReactNode} Text with the Copy Icon
   */
  const getItemStringRenderer = (
    type: any,
    data: any,
    itemType: ReactNode,
    itemString: string | number | undefined
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
              console.log("📋", JSON.stringify(data));
              handleShowToast();
            }}
          />
        ) : null}
      </View>
    );
  };

  /**
   * Returns a custom Text with the Copy Icon for label values (Primitives)
   * @param {string[]} keyPath - The key path for values.
   * @param {unknown} nodeType - The type of the node.
   * @returns {ReactNode} element containing the rendered custom Text with the Copy Icon for values.
   */
  const labelRenderer = (keyPath: string[], nodeType?: unknown) => {
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
  };

  const valueRenderer = (value: string) => {
    if (!searchTerm.trim()) return value;

    const regex = new RegExp(searchTerm, "gi");
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
            fontWeight: "bold",
            fontFamily: "Courier New",
          },
        }}
        keyPath={["data"]}
        invertTheme={false}
        getItemString={getItemStringRenderer}
        labelRenderer={labelRenderer}
        // valueRenderer={valueRenderer}
      />

      {showToast && <Toast message="Value was printed in your terminal" />}
    </View>
  );
};

export default JSONTreeSearcheable;
