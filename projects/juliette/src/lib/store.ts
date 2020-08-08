import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Handler, Selector } from './models';
import { debug } from './debug';

export class Store<T> {
  private _state: BehaviorSubject<T>;
  private _handlers = new Subject<Handler<any, any>>();

  state$: Observable<T>;
  handlers$: Observable<Handler<any, any>>;

  constructor(initialState: T) {
    this._state = new BehaviorSubject(initialState);
    this.state$ = this._state.asObservable();
    this.handlers$ = this._handlers.asObservable();
  }

  get state(): T {
    return this._state.value;
  }

  dispatch(handler: Handler<any, any>): void {
    if (handler.reducer && handler.stateKey) {
      const currentState = (this.state as any)[handler.stateKey];

      this._state.next({
        ...this.state,
        [handler.stateKey]: handler.reducer(currentState, handler.payload),
      });
    }

    this._handlers.next(handler);
  }

  select<K extends keyof T>(key: K): Observable<T[K]>;

  select<R>(selector: Selector<T, R>): Observable<R>;

  select<K extends keyof T, R>(keyOrSelector: K | Selector<T, R>): Observable<T[K] | R> {
    const mapFn =
      typeof keyOrSelector === 'function' ? keyOrSelector : (state: T) => state[keyOrSelector];

    return this.state$.pipe(map<T, T[K] | R>(mapFn));
  }
}

export const createStore = <T>(initialState: T, debugMode = false): Store<T> => {
  const store = new Store(initialState);
  if (debugMode) debug(store);

  return store;
};
