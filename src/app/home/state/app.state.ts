export enum DataStateEnum {
  LOADING,
  LOADED,
  ERROR
}

export interface AppState<T> {
  dataState: DataStateEnum;
  data?: T;
  errorMessage?: string;
}
