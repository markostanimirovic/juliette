import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Handler, Selector } from './models';
import { log } from './log';
import { deepFreeze } from './helpers';

export class Store<T> {
  private readonly state: BehaviorSubject<T>;
  private readonly handlers = new Subject<Handler<any, any>>();

  readonly state$: Observable<T>;
  readonly handlers$ = this.handlers.asObservable();

  constructor(initialState: T, private readonly devMode: boolean) {
    if (devMode) deepFreeze(initialState);

    this.state = new BehaviorSubject(initialState);
    this.state$ = this.state.asObservable();
  }

  dispatch(handler: Handler<any, any>): void {
    if (handler.reducer && handler.featureKey) {
      const currentState = this.state.value[handler.featureKey as keyof T];
      if (this.devMode) deepFreeze(currentState);

      this.state.next({
        ...this.state.value,
        [handler.featureKey]: handler.reducer(currentState, handler.payload),
      });
    }

    this.handlers.next(handler);
  }

  select<K extends keyof T>(key: K): Observable<T[K]>;

  select<R>(selector: Selector<T, R>): Observable<R>;

  select<K extends keyof T, R>(keyOrSelector: K | Selector<T, R>): Observable<T[K] | R>;

  select<K extends keyof T, R>(keyOrSelector: K | Selector<T, R>): Observable<T[K] | R> {
    const mapFn =
      typeof keyOrSelector === 'function' ? keyOrSelector : (state: T) => state[keyOrSelector];

    return this.state$.pipe(map<T, T[K] | R>(mapFn), distinctUntilChanged());
  }

  addFeatureState(featureKey: keyof T, initialState: T[keyof T]): void {
    if (this.devMode) deepFreeze(initialState);
    this.state.next({ ...this.state.value, [featureKey]: initialState });
  }
}

export const createStore = <T>(initialState: T, devMode = false): Store<T> => {
  const store = new Store(initialState, devMode);
  if (devMode) log(store);

  return store;
};
