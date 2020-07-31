import { User } from '../../core/models/user.model';
import { createHandler } from 'juliette';

export const stateKey = 'users';

export interface State {
  users: User[];
  showLoading: boolean;
}

export const initialState: State = {
  users: [],
  showLoading: false,
};

export const fetchUsers = createHandler<State>(
  '[Users] Fetch Users',
  stateKey,
  (state: State): State => ({ ...state, showLoading: true }),
);

export const fetchUsersSuccess = createHandler<State, { users: User[] }>(
  '[Users] Fetch Users Success',
  stateKey,
  (state: State, { users }: { users: User[] }): State => ({ ...state, users, showLoading: false }),
);
