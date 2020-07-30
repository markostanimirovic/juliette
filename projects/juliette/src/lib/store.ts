import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Handler, Selector } from './models';

export class Store<T> {
  private state: BehaviorSubject<T>;
  private handlers = new Subject<Handler>();

  state$: Observable<T>;
  handlers$: Observable<Handler>;

  constructor(initialState: T) {
    this.state = new BehaviorSubject(initialState);
    this.state$ = this.state.asObservable();
    this.handlers$ = this.handlers.asObservable();
  }

  dispatch(handler: Handler): void {
    const reducer = (handler as any).reducer;

    if (reducer) {
      const state = (this.state.value as any)[handler.stateKey];
      const payload = (handler as any).payload;

      this.state.next({ ...this.state.value, [handler.stateKey]: reducer(state, payload) });
    }

    this.handlers.next(handler);
  }

  select<K extends keyof T>(key: K): Observable<T[K]>;

  select<R>(selector: Selector<T, R>): Observable<R>;

  select<K extends keyof T, R>(keyOrSelector: K | Selector<T, R>): Observable<R | T[K]> {
    const mapFn = typeof keyOrSelector === 'function' ? keyOrSelector : (state: T): T[K] => state[keyOrSelector];
    return this.state$.pipe(map<T, R | T[K]>(mapFn));
  }
}
