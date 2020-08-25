import { createFeatureSelector, createSelector } from 'juliette';
import { fromUsers } from '../handlers';
import { AppState } from '../index';

export const selectUsersState = createFeatureSelector<AppState, fromUsers.State>(
  fromUsers.featureKey,
);
export const selectUsers = createSelector(selectUsersState, state => state.users);
