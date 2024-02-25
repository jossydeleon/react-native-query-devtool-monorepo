import { useCallback, useEffect, useMemo, useState } from "react";
import { QueryDevtoolData, QueryKey } from "../../types";
import formatTimestampToTime from "../../util/formatTimestampToTime";

const { ipcRenderer } = window.require("electron");

const useQueryDevtoolData = () => {
  const [queries, setQueries] = useState<QueryDevtoolData[]>([]);
  const [selectedQueryKey, setSelectedQueryKey] = useState<QueryKey>();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    ipcRenderer.on("query-data", (_, data) => {
      setQueries(data);
    });

    return () => {
      ipcRenderer.removeAllListeners("query-data");
    };
  }, []);

  const selectedQuery = useMemo(
    () =>
      queries.find(
        (query) =>
          JSON.stringify(query?.queryKey) === JSON.stringify(selectedQueryKey)
      ),
    [selectedQueryKey, queries]
  );

  const filteredQueries = useMemo(
    () =>
      queries.filter((query) =>
        query.queryKey?.toString().toLowerCase().includes(filter.toLowerCase())
      ),
    [queries, filter]
  );

  const handleSelectedRow = useCallback(
    (indexRow: number) => {
      const queriesSource = filter.length > 0 ? filteredQueries : queries;
      const queryKey = queriesSource[indexRow].queryKey;

      setSelectedQueryKey((prev) => (prev !== queryKey ? queryKey : undefined));
    },
    [queries, filteredQueries, filter]
  );

  return {
    queries,
    filteredQueries,
    selectedQuery,
    queryLastUpdated: formatTimestampToTime(selectedQuery?.dataUpdatedAt),
    filter,
    setFilter,
    handleSelectedRow,
  };
};

export default useQueryDevtoolData;
