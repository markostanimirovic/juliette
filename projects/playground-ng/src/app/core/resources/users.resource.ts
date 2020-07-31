import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';

const users: User[] = [{ name: 'John' }, { name: 'Peter' }, { name: 'Michael' }];

@Injectable({
  providedIn: 'root',
})
export class UsersResource {
  getUsers(): Observable<User[]> {
    return of(users).pipe(delay(1000));
  }
}
