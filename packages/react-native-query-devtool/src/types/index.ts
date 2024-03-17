export type ReactQueryVersion = 'v3' | 'v4' | 'v5';

export type QueryKey = string | string[];

export type QueryDevtoolProps = {
  queryClient: any;
  version?: ReactQueryVersion;
  useRemoteDevtool?: boolean;
  hideFloatingButton?: boolean;
};

export type QueryDevtoolData = {
  queryKey: QueryKey;
  data: unknown;
  observers: number;
  dataUpdatedAt: number;
  isActive: boolean;
  isStale: boolean;
  isFetching: boolean;
};

export type ListenerV3 =
  | 'queryAdded'
  | 'queryUpdated'
  | 'queryRemoved'
  | 'observerAdded'
  | 'observerRemoved'
  | 'observerResultsUpdated';

export type ListenerV4 =
  | 'added'
  | 'updated'
  | 'removed'
  | 'observerAdded'
  | 'observerRemoved'
  | 'observerResultsUpdated';

export type ListenerEventType = ListenerV3 | ListenerV4;
