import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { FlatList, TextInput } from 'react-native';

import {
  ListenerEventType,
  QueryDevtoolData,
  QueryDevtoolProps,
  QueryKey,
} from '../../types';
import fuzzySearch from '../../utils/fuzzySearch';
import {
  getQueryDevtoolData,
  handleQueryDevtoolData,
} from '../../utils/queryListener';

import useDebounce from '../../hooks/useDebounce';

const useDevtoolData = (props: QueryDevtoolProps) => {
  const { queryClient, version = 'v5' } = props;

  const isInitialized = useRef(false);
  const flalistRef = useRef<FlatList>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const searchRef = useRef<TextInput>(null);

  const [queries, setQueries] = useState<QueryDevtoolData[]>([]);
  const [selectedQueryKey, setSelectedQueryKey] = useState<QueryKey>();

  const [searchStringQueries, setSearchStringQueries] = useState('');
  const [searchStringData, setSearchStringData] = useState('');
  const [showToast, setShowToast] = useState(false);

  // State to determine where to search (2nd Searchbar)
  const [dataToLookup, setDataToLookup] = useState<{
    nodeTitle: string;
    nodeData: any;
  }>();

  // State to show query data filtered
  const [filteredData, setFilteredData] = useState<any>();

  useEffect(() => {
    if (isInitialized.current) return;

    const allQueries = queryClient
      .getQueryCache()
      .getAll()
      .map((queriesData: any) => getQueryDevtoolData(version, queriesData));

    setQueries(allQueries);

    isInitialized.current = true;

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
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
          (item) => item.queryKey === queryKey,
        );

        return handleQueryDevtoolData(
          version,
          listenerType,
          queryKeyIndex,
          query,
          [...prevData],
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
          JSON.stringify(query?.queryKey) === JSON.stringify(selectedQueryKey),
      ),
    [selectedQueryKey, queries],
  );

  const filteredQueries = useMemo(
    () =>
      queries.filter((query) =>
        query.queryKey
          ?.toString()
          .toLowerCase()
          .includes(searchStringQueries.toLowerCase()),
      ),
    [queries, searchStringQueries],
  );

  const handleSelectedRow = useCallback(
    (indexRow?: number) => {
      if (typeof indexRow !== 'number') {
        setSelectedQueryKey(undefined);
        return;
      }

      const queriesSource =
        searchStringQueries.length > 0 ? filteredQueries : queries;
      const queryKey = queriesSource[indexRow].queryKey;

      setSelectedQueryKey((prev) => (prev !== queryKey ? queryKey : undefined));
      setSearchStringData('');
      setDataToLookup(undefined);

      timeoutRef.current = setTimeout(() => {
        searchRef.current?.focus();

        flalistRef.current?.scrollToIndex({
          index: indexRow,
          animated: true,
          viewPosition: 1,
        });
      }, 200);
    },
    [queries, filteredQueries, searchStringQueries],
  );

  const handleShowToast = () => {
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleSearch = useDebounce((term) => {
    const whereToSearch = dataToLookup?.nodeData
      ? dataToLookup.nodeData
      : selectedQuery?.data;

    setFilteredData(fuzzySearch(term, whereToSearch));
  }, 500);

  const handleChangeSearchQueryData = (searchTerm: string) => {
    setSearchStringData(searchTerm);

    if (searchTerm.trim() === '' || searchTerm.trim().length <= 2) {
      setFilteredData(undefined);
    } else {
      handleSearch(searchTerm);
    }
  };

  const handleSelectedToCopy = (node: any) => {
    console.log('📋', JSON.stringify(node));
    handleShowToast();
  };

  const handleOnselectedNode = (nodeTitle: string, nodeData: any) => {
    setDataToLookup({ nodeTitle, nodeData });
    searchRef.current?.focus();
  };

  return {
    selectedQueryKey,
    selectedQuery,
    searchStringQueries,
    filteredQueries,
    flalistRef,
    searchRef,
    searchStringData,
    filteredData,
    dataToLookup,
    showToast,
    setSearchStringQueries,
    handleChangeSearchQueryData,
    handleSelectedRow,
    handleOnselectedNode,
    handleSelectedToCopy,
  };
};

export default useDevtoolData;
