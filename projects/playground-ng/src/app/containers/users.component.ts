import { Component } from '@angular/core';
import { fromUsers } from '../store/handlers';
import { Store } from 'juliette';
import { AppState } from '../store';
import { selectUsersState } from '../store/selectors';

@Component({
  template: `
    <ng-container *ngIf="state$ | async as state">
      <button (click)="fetchUsers()">Fetch Users</button>

      <div *ngIf="state.loading; else users">Loading...</div>

      <ng-template #users>
        <div *ngFor="let user of state.users">
          {{ user.name }}
        </div>
      </ng-template>
    </ng-container>
  `,
})
export class UsersComponent {
  state$ = this.store.select(selectUsersState);

  constructor(private store: Store<AppState>) {}

  fetchUsers(): void {
    this.store.dispatch(fromUsers.fetchUsers());
  }
}
