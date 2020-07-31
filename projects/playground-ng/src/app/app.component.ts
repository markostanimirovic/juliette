import { Component } from '@angular/core';
import { Store } from 'juliette';
import { AppState } from './store/app-state';
import { Observable } from 'rxjs';

import * as fromUsers from './store/handlers/users.handlers';

@Component({
  selector: 'pg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  viewModel$: Observable<fromUsers.State> = this.store.select(fromUsers.stateKey);

  constructor(private store: Store<AppState>) {}

  fetchUsers(): void {
    this.store.dispatch(fromUsers.fetchUsers());
  }
}
