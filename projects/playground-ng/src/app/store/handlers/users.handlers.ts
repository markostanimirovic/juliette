import { User } from '../../core/models/user.model';
import { createHandler, StateConfig } from 'juliette';

export const stateName = 'users';

export interface State {
  users: User[];
  showLoading: boolean;
}

export const initialState: State = {
  users: [],
  showLoading: false,
};

export const fetchUsers = createHandler(
  '[Users] Fetch Users',
  stateName,
  (state: State): State => ({ ...state, showLoading: true }),
);

export const fetchUsersSuccess = createHandler(
  '[Users] Fetch Users Success',
  stateName,
  (state: State, { users }: { users: User[] }): State => ({ ...state, users, showLoading: false }),
);

export const usersStateConfig: StateConfig<State> = {
  stateName,
  initialState,
};
