import { Store } from './store';
import { take, withLatestFrom } from 'rxjs/operators';

export const debug = <T>(store: Store<T>): void => {
  store.state$.pipe(take(1)).subscribe(state => {
    console.groupCollapsed('%c⧭', 'color: #0088cc', 'INITIAL STATE TREE:');
    console.table(state);
    console.groupEnd();
  });

  store.handlers$.pipe(withLatestFrom(store.state$)).subscribe(([handler, state]) => {
    console.log('%c%s', 'color: #00e600', handler.type);
    console.groupCollapsed('%c⧭', 'color: #0088cc', 'STATE TREE:');
    console.table(state);
    console.groupEnd();
  });
};
