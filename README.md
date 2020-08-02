[![Juliette Logo](https://i.ibb.co/jDs1CB3/juliette-logo.jpg)](https://github.com/stanimirovic/juliette)

# Juliette &middot; [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE) [![NPM Version](https://badge.fury.io/js/juliette.svg)](https://badge.fury.io/js/juliette)

**Reactive State Management Powered by [RxJS](https://rxjs-dev.firebaseapp.com/)**

## Description

Juliette is a reactive state management container inspired by [NgRx](https://ngrx.io/).
It reduces Redux boilerplate, eliminates reducer's ifology, simplifies the configuration
and introduces NgRx architecture into the framework independent world.
Juliette is a TypeScript friendly library and can be used in Angular,
React or any JavaScript application.

### Reduced Boilerplate Without Reducer's Ifology

Juliette reduces Redux boilerplate by merging Action and Reducer components into one component called Handler.
To better understand the benefits of Handler, let's first look at how actions and reducers are defined by using NgRx.

<details>
  <summary><b>Old NgRx Syntax</b></summary>

```typescript
// users.actions.ts

export const FETCH_USERS = '[Users] Fetch Users';
export const FETCH_USERS_SUCCESS = '[Users] Fetch Users Success';
export const FETCH_USERS_ERROR = '[Users] Fetch Users Error';

export class FetchUsers implements Action {
  readonly type = FETCH_USERS;
}

export class FetchUsersSuccess implements Action {
  readonly type = FETCH_USERS_SUCCESS;

  constructor(public payload: User[]) {}
}

export class FetchUsersError implements Action {
  readonly type = FETCH_USERS_ERROR;
}

export type Action = FetchUsers | FetchUsersSuccess | FetchUsersError;

// users.reducer.ts

import * as UsersActions from './users.actions';

export interface State {
  users: User[];
  showLoading: boolean;
}

const initialState: State = {
  users: [],
  showLoading: false,
};

export function reducer(state = initialState, action: UsersActions.Action): State {
  switch (action.type) {
    case UsersActions.FETCH_USERS:
      return { ...state, showLoading: true };
    case UsersActions.FETCH_USERS_SUCCESS:
      return { ...state, users: action.payload, showLoading: false };
    case UsersActions.FETCH_USERS_ERROR:
      return { ...state, users: [], showLoading: false };
    default:
      return state;
  }
}
```

</details>

TypeScript code above shows the old NgRx syntax and it is pretty similar to traditional Redux syntax.
As you can see, it's too much code for three simple actions. Then, NgRx team introduced a new way
to define actions and reducers.

<details>
  <summary><b>New NgRx Syntax</b></summary>
  
```typescript
// users.actions.ts

export const fetchUsers = createAction('[Users] Fetch Users');
export const fetchUsersSuccess = createAction(
'[Users] Fetch Users Success',
props<{ users: User[] }>()
);
export const fetchUsersError = createAction('[Users] Fetch Users Error');

// users.reducer.ts

import \* as UsersActions from './users.actions';

export interface State {
users: User[];
showLoading: boolean;
}

const initialState: State = {
users: [],
showLoading: false,
};

export const reducer = createReducer(
initialState,
on(UsersActions.fetchUsers, state => ({ ...state, showLoading: true })),
on(UsersActions.fetchUsersSuccess, (state, { users }) => ({
...state,
users,
showLoading: false,
})),
on(UsersActions.fetchUsersError, state => ({
...state,
users: [],
showLoading: false,
})),
);

````
</details>

better/similar to new redux, but branching is still present

<details>
  <summary><b>Juliette Syntax</b></summary>

```typescript
// users.handlers.ts

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
  state => ({ ...state, showLoading: true })
);
export const fetchUsersSuccess = createHandler<State, { users: User[] }>(
  '[Users] Fetch Users Success',
  stateKey,
  (state, { users }) => ({ ...state, users, showLoading: false }),
);
export const fetchUsersError = createHandler<State>(
  '[Users] Fetch Users Error',
  stateKey,
  state => ({ ...state, users: [], showLoading: false }),
);
````

</details>

### Simplified Configuration

You don't need to register reducers to the store anymore!

### Framework Independent

Core features of Juliette are implemented in pure TypeScript without framework dependencies.
Framework specific stuff is located in separated libraries.

## Installation

Run `npm install --save juliette` to install core Juliette library.

If you are using Angular, install additional package by running `npm install --save juliette-ng` command.

If you are using React, install additional package by running `npm install --save juliette-react` command.

## Usage

### createHandler

### createStore

...

## License

Juliette is [MIT licensed](./LICENSE).

Copyright © 2020 Marko Stanimirović
