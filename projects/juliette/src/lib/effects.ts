import { Store } from './store';
import { Effect, EffectSource } from './models';
import { Observable } from 'rxjs';

export const JULIETTE_EFFECT = 'Juliette Effect';

export const createEffect = (source$: Observable<EffectSource>): Effect => ({
  source$,
  type: JULIETTE_EFFECT,
});

export const registerEffects = <T>(store: Store<T>, effects: Effect[]): void => {
  effects.forEach(({ source$ }) =>
    source$.subscribe(handler => handler && store.dispatch(handler)),
  );
};
