import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { fromUsers } from '../store/handlers';
import { Store } from 'juliette';
import { AppState } from '../store/app-state';

@Component({
  template: `
    <ng-container *ngIf="state$ | async as state">
      <button (click)="fetchUsers()">
        Fetch Users
      </button>

      <div *ngIf="state.loading; else users">
        Loading...
      </div>

      <ng-template #users>
        <div *ngFor="let user of state.users">
          {{ user.name }}
        </div>
      </ng-template>
    </ng-container>
  `,
})
export class UsersComponent {
  state$: Observable<fromUsers.State> = this.store.select(fromUsers.featureKey);

  constructor(private store: Store<AppState>) {}

  fetchUsers(): void {
    this.store.dispatch(fromUsers.fetchUsers());
  }
}
