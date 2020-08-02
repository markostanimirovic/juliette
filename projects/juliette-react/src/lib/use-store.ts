import { useContext, useEffect, useMemo, useState } from 'react';
import { StoreContext } from './store-context';
import { Store, Dispatch, Selector } from 'juliette';
import { distinctUntilChanged, skip, take } from 'rxjs/operators';

export function useStore<T, R>(selector: Selector<T, R>): [R, Dispatch] {
  const store: Store<T> = useContext(StoreContext);

  if (!store) throw new Error('Store is not provided! Provide it using StoreContext.');

  const [state$, initialState] = useMemo(() => {
    let initialState: any = null;
    const state$ = store.select(selector).pipe(distinctUntilChanged());
    state$.pipe(take(1)).subscribe(state => (initialState = state));

    return [state$, initialState];
  }, [store, selector]);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const subscription = state$.pipe(skip(1)).subscribe(setState);
    return () => subscription.unsubscribe();
  }, [state$]);

  return [state, store.dispatch.bind(store)];
}
