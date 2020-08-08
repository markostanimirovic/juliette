import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { createEffect, ofType, Store } from 'juliette';
import { UsersResource } from '../../core/resources/users.resource';
import { AppState } from '../app-state';

import * as fromUsers from '../handlers/users.handlers';

@Injectable()
export class UsersEffects {
  fetchUsers$ = createEffect(
    this.store.handlers$.pipe(
      ofType(fromUsers.fetchUsers),
      switchMap(() =>
        this.usersResource.getUsers().pipe(map(users => fromUsers.fetchUsersSuccess({ users }))),
      ),
    ),
  );

  constructor(private store: Store<AppState>, private usersResource: UsersResource) {}
}
