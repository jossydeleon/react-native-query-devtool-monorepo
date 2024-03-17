import React from "react";

import { FlatList, ScrollView, Text, View } from "react-native";

import { ScrollView as ActionsheetScrollview } from "react-native-actions-sheet";

import { QueryDevtoolProps } from "../../types";
import CloseButton from "../CloseButton";
import DataExplorer from "../DataExplorer";
import QueryRow from "../QueryRow";
import Searchbar from "../Searchbar";
import useDevtoolData from "./useDevtoolData";

import { styles } from "./styles";

const Devtool: React.FC<QueryDevtoolProps> = (props) => {
  const {
    filteredQueries,
    selectedQuery,
    flalistRef,
    filteredData,
    searchRef,
    searchStringQueries,
    searchStringData,
    setSearchStringQueries,
    handleChangeSearchQueryData,
    handleSelectedRow,
    handleOnselectedNode,
    dataToLookup,
  } = useDevtoolData(props);

  const renderHeader = () => (
    <View style={styles.searchbarContainer}>
      <Searchbar
        filter={searchStringQueries}
        setFilter={setSearchStringQueries}
        placeholder="Filter queries"
      />
    </View>
  );

  const renderDataExplorerHeader = () => {
    if (!selectedQuery) return null;

    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerText}>Data Explorer</Text>
          <CloseButton onPress={() => handleSelectedRow()} />
        </View>
        <Searchbar
          ref={searchRef}
          filter={searchStringData}
          setFilter={handleChangeSearchQueryData}
          placeholder={
            dataToLookup?.nodeTitle
              ? `Search in '${dataToLookup?.nodeTitle}'`
              : "Search in 'data'"
          }
        />
      </View>
    );
  };

  const renderDataExplorer = () => {
    if (!selectedQuery) return null;

    return (
      <View style={styles.dataExplorerContainer}>
        <DataExplorer
          searchTerm={searchStringData}
          selectedQueryData={filteredData ?? selectedQuery?.data}
          onSelectedNode={handleOnselectedNode}
        />
      </View>
    );
  };

  return (
    <ActionsheetScrollview
      nestedScrollEnabled
      stickyHeaderIndices={[0, 2]}
      style={styles.actionScrollviewContainer}
    >
      {renderHeader()}
      <ScrollView
        horizontal
        scrollEnabled={false}
        style={[
          selectedQuery ? styles.collapsedFlatlist : styles.expandedFlatlist,
        ]}
      >
        <FlatList
          ref={flalistRef}
          data={filteredQueries}
          style={[styles.queriesFlatlist]}
          renderItem={({ item, index }) => (
            <QueryRow
              index={index}
              item={item}
              isSelected={item.queryKey === selectedQuery?.queryKey}
              handleSelectedRow={handleSelectedRow}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <Text style={styles.flatlistEmptyMessage}>No queries found</Text>
          }
        />
      </ScrollView>

      {renderDataExplorerHeader()}
      {renderDataExplorer()}
    </ActionsheetScrollview>
  );
};

export default Devtool;
