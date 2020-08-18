import { Store } from './store';
import { take, withLatestFrom } from 'rxjs/operators';
import { Handler } from './models';

export const log = <T>(store: Store<T>): void => {
  store.state$.pipe(take(1)).subscribe(state => logState(state));

  store.handlers$.pipe(withLatestFrom(store.state$)).subscribe(([handler, state]) => {
    logHandler(handler);
    logState(state);
  });
};

const loggingStyle = 'color: #0099A5; font:1em Comic Sans MS; font-weight: bold';

const logState = <T>(state: T): void => {
  console.groupCollapsed('%c🪐 State:', loggingStyle);
  Object.keys(state)
    .sort()
    .forEach(key => console.log(key, state[key as keyof T]));
  console.groupEnd();
};

const logHandler = (handler: Handler<any, any>): void => {
  console.log(`%c🚀 Handler: ${handler.type}`, loggingStyle);
};
