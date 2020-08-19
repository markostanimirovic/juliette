import { Selector } from './models';

export function createFeatureSelector<T, R extends T[keyof T]>(
  featureKey: keyof T,
): Selector<T, R> {
  return (state: T) => state[featureKey] as R;
}

export function createSelector<T, R, S>(
  s: Selector<T, S>,
  composer: Selector<S, R>,
): Selector<T, R>;

export function createSelector<T, R, S1, S2>(
  s1: Selector<T, S1>,
  s2: Selector<T, S2>,
  composer: (s1: S1, s2: S2) => R,
): Selector<T, R>;

export function createSelector<T, R, S1, S2, S3>(
  s1: Selector<T, S1>,
  s2: Selector<T, S2>,
  s3: Selector<T, S3>,
  composer: (s1: S1, s2: S2, s3: S3) => R,
): Selector<T, R>;

export function createSelector<T, R, S1, S2, S3, S4>(
  s1: Selector<T, S1>,
  s2: Selector<T, S2>,
  s3: Selector<T, S3>,
  s4: Selector<T, S4>,
  composer: (s1: S1, s2: S2, s3: S3, s4: S4) => R,
): Selector<T, R>;

export function createSelector<T, R, S1, S2, S3, S4, S5>(
  s1: Selector<T, S1>,
  s2: Selector<T, S2>,
  s3: Selector<T, S3>,
  s4: Selector<T, S4>,
  s5: Selector<T, S5>,
  composer: (s1: S1, s2: S2, s3: S3, s4: S4, s5: S5) => R,
): Selector<T, R>;

export function createSelector<T, R>(...functions: ((...args: any) => any)[]): Selector<T, R> {
  const composer = functions.pop() as (...states: any[]) => R;
  const selectors = functions as Selector<T, any>[];

  return (state: T) => composer(...selectors.map(selector => selector(state)));
}
