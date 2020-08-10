import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Handler, Selector } from './models';
import { debug } from './debug';

export class Store<T> {
  private state: BehaviorSubject<T>;
  private handlers = new Subject<Handler<any, any>>();

  state$: Observable<T>;
  handlers$: Observable<Handler<any, any>>;

  constructor(initialState: T) {
    this.state = new BehaviorSubject(initialState);
    this.state$ = this.state.asObservable();
    this.handlers$ = this.handlers.asObservable();
  }

  dispatch(handler: Handler<any, any>): void {
    if (handler.reducer && handler.featureKey) {
      const currentState = this.state.value[handler.featureKey as keyof T];

      this.state.next({
        ...this.state.value,
        [handler.featureKey]: handler.reducer(currentState, handler.payload),
      });
    }

    this.handlers.next(handler);
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
