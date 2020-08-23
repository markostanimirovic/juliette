import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { StoreContext } from './contexts';
import { Store, Dispatch, Selector } from 'juliette';
import { skip, take } from 'rxjs/operators';

export function useStore<T = any>(): Store<T> {
  const store = useContext(StoreContext);
  if (!store) throw new Error('Store is not provided! Use StoreContext to provide it.');

  return store;
}

export function useDispatch(): Dispatch {
  const store = useStore();
  return useCallback(store.dispatch.bind(store), [store]);
}

export function useSelect<T, R extends T[keyof T]>(featureKey: keyof T): R;

export function useSelect<T, R>(selector: Selector<T, R>): R;

export function useSelect<T, K extends keyof T, R>(keyOrSelector: K | Selector<T, R>): T[K] | R {
  const store = useStore<T>();
  const [state$, initialState] = useMemo(() => {
    let initialState: T[K] | R = null as any;
    const state$ = store.select(keyOrSelector);
    state$.pipe(take(1)).subscribe(state => (initialState = state));

    return [state$, initialState];
  }, [store, keyOrSelector]);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const subscription = state$.pipe(skip(1)).subscribe(setState);
    return () => subscription.unsubscribe();
  }, [state$]);

  return state;
}
