import { Injectable } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { ofType, Store, toPayload } from 'juliette';
import { UsersResource } from '../../core/resources/users.resource';
import { AppState } from '../index';
import { fromUsers } from '../handlers';

@Injectable()
export class UsersEffects {
  fetchUsers$ = this.store.handlers$.pipe(
    ofType(fromUsers.fetchUsers),
    switchMap(() => this.usersResource.getUsers()),
    map(users => fromUsers.fetchUsersSuccess({ users })),
  );

  fetchUsersSuccess$ = this.store.handlers$.pipe(
    ofType(fromUsers.fetchUsersSuccess),
    toPayload(),
    tap(({ users }) => console.log('success', users)),
  );

  constructor(private store: Store<AppState>, private usersResource: UsersResource) {}
}
