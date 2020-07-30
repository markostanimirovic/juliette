import { Observable } from 'rxjs';
import { Store } from './store';
import { Effect, Handler } from './models';

export const JULIETTE_EFFECT = 'Juliette Effect';

export const createEffect = (handler$: Observable<Handler | void>): Effect => ({
  handler$,
  type: JULIETTE_EFFECT,
});

export const registerEffects = <T>(store: Store<T>, effects: Effect[]): void => {
  effects.forEach(({ handler$ }) => handler$.subscribe(handler => handler && store.dispatch(handler)));
};
