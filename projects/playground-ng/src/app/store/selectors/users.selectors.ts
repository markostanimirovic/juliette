import { Selector, composeSelectors } from 'juliette';
import { fromUsers } from '../handlers';
import { AppState } from '../index';

export const selectUsersState: Selector<AppState, fromUsers.State> = state =>
  state[fromUsers.featureKey];
export const selectUsers = composeSelectors([selectUsersState], state => state.users);
