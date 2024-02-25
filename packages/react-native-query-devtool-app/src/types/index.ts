export type QueryKey = string | string[];

export interface QueryDevtoolData {
  queryKey: QueryKey;
  data: unknown;
  observers?: number;
  dataUpdatedAt?: number;
  isActive: boolean;
  isStale: boolean;
  isFetching: boolean;
}
