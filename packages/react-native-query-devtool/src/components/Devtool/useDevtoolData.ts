import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  ListenerEventType,
  QueryDevtoolData,
  QueryDevtoolProps,
  QueryKey,
} from '../../types';
import {
  getQueryDevtoolData,
  handleQueryDevtoolData,
} from '../../utils/queryListener';

const useDevtoolData = (props: QueryDevtoolProps) => {
  const { queryClient, version = 'v5' } = props;

  const isInitialized = useRef(false);

  const [queries, setQueries] = useState<QueryDevtoolData[]>([]);
  const [selectedQueryKey, setSelectedQueryKey] = useState<QueryKey>();
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (isInitialized.current) return;

    const allQueries = queryClient
      .getQueryCache()
      .getAll()
      .map((queriesData: any) => getQueryDevtoolData(version, queriesData));

    setQueries(allQueries);

    isInitialized.current = true;
  }, [version, queryClient]);

  useEffect(() => {
    const subscribe = queryClient.getQueryCache().subscribe((listener: any) => {
      if (!listener) {
        return;
      }

      const listenerType: ListenerEventType = listener.type;
      const queryKey = listener.query.queryKey;

      if (!queryKey) {
        return;
      }

      const query = listener.query;

      setQueries((prevData) => {
        const queryKeyIndex = prevData.findIndex(
          (item) => item.queryKey === queryKey
        );

        return handleQueryDevtoolData(
          version,
          listenerType,
          queryKeyIndex,
          query,
          [...prevData]
        );
      });
    });

    return () => {
      subscribe();
    };
  }, [queryClient, version]);

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
      queries.filter(
        (query) =>
          query.queryKey
            ?.toString()
            .toLowerCase()
            .includes(filter.toLowerCase())
      ),
    [queries, filter]
  );

  const handleSelectedRow = useCallback(
    (indexRow?: number) => {
      if (typeof indexRow !== 'number') {
        setSelectedQueryKey(undefined);
        return;
      }

      const queriesSource = filter.length > 0 ? filteredQueries : queries;
      const queryKey = queriesSource[indexRow].queryKey;

      setSelectedQueryKey((prev) => (prev !== queryKey ? queryKey : undefined));
    },
    [queries, filteredQueries, filter]
  );

  return {
    selectedQueryKey,
    selectedQuery,
    filter,
    filteredQueries,
    setFilter,
    handleSelectedRow,
  };
};

export default useDevtoolData;
