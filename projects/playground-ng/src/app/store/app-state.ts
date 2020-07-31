import * as fromUsers from './handlers/users.handlers';

export interface AppState {
  [fromUsers.stateKey]: fromUsers.State;
}

export const initialAppState: AppState = {
  [fromUsers.stateKey]: fromUsers.initialState,
};
