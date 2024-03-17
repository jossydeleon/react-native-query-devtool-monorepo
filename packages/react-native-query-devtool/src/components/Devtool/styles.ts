import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  actionScrollviewContainer: {
    minHeight: 250,
    maxHeight: 500,
  },
  searchbarContainer: {
    backgroundColor: "#0b1521",
    padding: 2,
    paddingBottom: 1,
  },
  headerContainer: {
    backgroundColor: "#132337",
  },
  headerTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingBottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerText: {
    color: "white",
  },
  queriesContainer: {
    padding: 10,
  },
  queriesFlatlist: {
    width: Dimensions.get("screen").width,
    paddingHorizontal: 2,
  },
  flatlistEmptyMessage: {
    color: "white",
    textAlign: "center",
  },
  expandedFlatlist: {
    height: 400,
    marginBottom: 20,
  },
  collapsedFlatlist: {
    height: 250,
  },
  separator: {
    borderBottomWidth: 0.3,
    borderColor: "silver",
    marginVertical: 5,
  },
  dataExplorerContainer: {
    marginBottom: 20,
  },
});
