import { fromUsers } from './handlers';

export const initialAppState = {
  [fromUsers.featureKey]: fromUsers.initialState,
};

export type AppState = typeof initialAppState;
