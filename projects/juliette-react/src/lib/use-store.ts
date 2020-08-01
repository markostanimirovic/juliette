import { useContext, useEffect, useMemo, useState } from 'react';
import { StoreContext } from './store-context';
import { Dispatch, Selector } from 'juliette';
import { distinctUntilChanged, skip, take } from 'rxjs/operators';

export function useStore<T, K extends keyof T>(key: K): [T[K], Dispatch];

export function useStore<T, R>(selector: Selector<T, R>): [R, Dispatch];

export function useStore<T, K extends keyof T, R>(keyOrSelector: K | Selector<T, R>): [T[K] | R, Dispatch] {
  const store = useContext(StoreContext);
  const [state$, initialState] = useMemo(() => {
    let initialState: any = null;
    const state$ = store.select(keyOrSelector).pipe(distinctUntilChanged());
    state$.pipe(take(1)).subscribe(state => (initialState = state));

    return [state$, initialState];
  }, [store, keyOrSelector]);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const subscription = state$.pipe(skip(1)).subscribe(setState);
    return () => subscription.unsubscribe();
  }, [state$]);

  return [state, store.dispatch.bind(store)];
}
