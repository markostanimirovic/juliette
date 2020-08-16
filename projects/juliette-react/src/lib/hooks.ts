import { useContext, useEffect, useMemo, useState } from 'react';
import { StoreContext } from './contexts';
import { Store, Dispatch, Selector } from 'juliette';
import { distinctUntilChanged, skip, take } from 'rxjs/operators';

export function useStore<T = any>(): Store<T> {
  const store = useContext(StoreContext);
  if (!store) throw new Error('Store is not provided! Use StoreContext to provide it.');

  return store;
}

export function useDispatch(): Dispatch {
  const store = useStore();
  return store.dispatch.bind(store);
}

export function useSelector<T, R>(selector: Selector<T, R>): R {
  const store = useStore<T>();

  const [state$, initialState] = useMemo(() => {
    let initialState: R = null as any;
    const state$ = store.select(selector).pipe(distinctUntilChanged());
    state$.pipe(take(1)).subscribe(state => (initialState = state));

    return [state$, initialState];
  }, [store, selector]);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const subscription = state$.pipe(skip(1)).subscribe(setState);
    return () => subscription.unsubscribe();
  }, [state$]);

  return state;
}
