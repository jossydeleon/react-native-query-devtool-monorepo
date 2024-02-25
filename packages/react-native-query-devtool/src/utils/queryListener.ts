import {
  ListenerEventType,
  QueryDevtoolData,
  ReactQueryVersion,
} from "../types";

export const getQueryDevtoolData = (
  version: ReactQueryVersion,
  query: any
): QueryDevtoolData => {
  const queryData = query.state.data;
  const dataUpdatedAt = query.state.dataUpdatedAt;
  const isStale = query.isStale();
  const isActive = query.isActive() && query.getObserversCount() > 0;
  const isFetching =
    version === "v3"
      ? query.isFetching()
      : query.state.fetchStatus === "fetching";

  return {
    queryKey: query.queryKey,
    data: queryData,
    observers: query.getObserversCount(),
    dataUpdatedAt: dataUpdatedAt,
    isActive,
    isStale,
    isFetching,
  };
};

export const handleQueryDevtoolData = (
  version: ReactQueryVersion,
  listenerType: ListenerEventType,
  queryKeyIndex: number,
  query: any,
  queryDevtoolDataArray: QueryDevtoolData[]
) => {
  switch (listenerType) {
    case "queryAdded":
    case "queryUpdated":
    case "added":
    case "updated":
      const queryData = query.state.data;
      if (queryData) {
        return updateQueryDevtoolDataArray(
          version,
          queryKeyIndex,
          queryDevtoolDataArray,
          query
        );
      }
      break;
    case "observerAdded":
    case "observerRemoved":
    case "observerResultsUpdated":
      if (queryKeyIndex !== -1) {
        queryDevtoolDataArray[queryKeyIndex].observers =
          query.getObserversCount();
      }
      break;
    case "queryRemoved":
    case "removed":
      if (queryKeyIndex !== -1) {
        queryDevtoolDataArray.splice(queryKeyIndex, 1);
      }
      break;
    default:
      break;
  }
  return queryDevtoolDataArray;
};

const updateQueryDevtoolDataArray = (
  version: ReactQueryVersion,
  queryKeyIndex: number,
  queryDevtoolDataArray: QueryDevtoolData[],
  query: any
): QueryDevtoolData[] => {
  const queryDevtoolData = getQueryDevtoolData(version, query);

  if (queryKeyIndex !== -1) {
    queryDevtoolDataArray[queryKeyIndex] = queryDevtoolData;
  } else {
    queryDevtoolDataArray.push(queryDevtoolData);
  }
  return queryDevtoolDataArray;
};
