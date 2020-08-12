import { Store } from './store';
import { Observable } from 'rxjs';
import { HANDLER_META_KEY } from './constants';

export function registerEffects<T>(store: Store<T>, effects: Observable<any>[]): void {
  effects.forEach(effect$ =>
    effect$.subscribe(handler => handler?.metaKey === HANDLER_META_KEY && store.dispatch(handler)),
  );
}
