import * as fromUsers from './handlers/users.handlers';

export interface AppState {
  [fromUsers.featureKey]: fromUsers.State;
}

export const initialAppState: AppState = {
  [fromUsers.featureKey]: fromUsers.initialState,
};
