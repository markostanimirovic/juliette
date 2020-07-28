import { Component } from '@angular/core';
import { select, Store } from 'juliette';

import * as fromUsers from './store/handlers/users.handlers';
import { Observable } from 'rxjs';

@Component({
  selector: 'pg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  viewModel$: Observable<any> = this.store.state$.pipe(select(fromUsers.stateName));

  constructor(private store: Store) {}

  fetchUsers(): void {
    this.store.dispatch(fromUsers.fetchUsers());
  }
}
