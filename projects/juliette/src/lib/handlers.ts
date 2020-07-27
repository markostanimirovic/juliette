export interface StateConfig<T> {
  stateName: string;
  initialState: T;
}

export interface HandlerConfig {
  type: string;
  stateName: string;
  reducer?: any;
  payload?: any;
}

export const createHandler = (type: string, stateName: string, reducer?: any) => (payload?: any): HandlerConfig => ({
  type,
  stateName,
  reducer,
  payload,
});
