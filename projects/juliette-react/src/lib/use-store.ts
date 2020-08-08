import { useContext, useEffect, useMemo, useState } from 'react';
import { StoreContext } from './store-context';
import { Dispatch, Selector, Store } from 'juliette';
import { distinctUntilChanged, skip } from 'rxjs/operators';

export function useStore<T, R>(selector: Selector<T, R>): [R, Dispatch] {
  const store: Store<T> = useContext(StoreContext);
  if (!store) throw new Error('Store is not provided! Use StoreContext to provide it.');

  const [state, setState] = useState(selector(store.state));
  const state$ = useMemo(() => store.select(selector).pipe(distinctUntilChanged()), [store]);

  useEffect(() => {
    const subscription = state$.pipe(skip(1)).subscribe(setState);
    return () => subscription.unsubscribe();
  }, [state$]);

  return [state, store.dispatch.bind(store)];
}
