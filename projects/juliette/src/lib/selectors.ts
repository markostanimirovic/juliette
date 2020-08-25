import { Selector } from './models';

export function createFeatureSelector<T, R extends T[keyof T]>(
  featureKey: keyof T,
): Selector<T, R> {
  return state => state[featureKey] as R;
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

export function createSelector<T, R, S1, S2, S3, S4, S5, S6>(
  s1: Selector<T, S1>,
  s2: Selector<T, S2>,
  s3: Selector<T, S3>,
  s4: Selector<T, S4>,
  s5: Selector<T, S5>,
  s6: Selector<T, S6>,
  composer: (s1: S1, s2: S2, s3: S3, s4: S4, s5: S5, s6: S6) => R,
): Selector<T, R>;

export function createSelector<T, R, S1, S2, S3, S4, S5, S6, S7>(
  s1: Selector<T, S1>,
  s2: Selector<T, S2>,
  s3: Selector<T, S3>,
  s4: Selector<T, S4>,
  s5: Selector<T, S5>,
  s6: Selector<T, S6>,
  s7: Selector<T, S7>,
  composer: (s1: S1, s2: S2, s3: S3, s4: S4, s5: S5, s6: S6, s7: S7) => R,
): Selector<T, R>;

export function createSelector<T, R, S1, S2, S3, S4, S5, S6, S7, S8>(
  s1: Selector<T, S1>,
  s2: Selector<T, S2>,
  s3: Selector<T, S3>,
  s4: Selector<T, S4>,
  s5: Selector<T, S5>,
  s6: Selector<T, S6>,
  s7: Selector<T, S7>,
  s8: Selector<T, S8>,
  composer: (s1: S1, s2: S2, s3: S3, s4: S4, s5: S5, s6: S6, s7: S7, s8: S8) => R,
): Selector<T, R>;

export function createSelector<T, R, S1, S2, S3, S4, S5, S6, S7, S8, S9>(
  s1: Selector<T, S1>,
  s2: Selector<T, S2>,
  s3: Selector<T, S3>,
  s4: Selector<T, S4>,
  s5: Selector<T, S5>,
  s6: Selector<T, S6>,
  s7: Selector<T, S7>,
  s8: Selector<T, S8>,
  s9: Selector<T, S9>,
  composer: (s1: S1, s2: S2, s3: S3, s4: S4, s5: S5, s6: S6, s7: S7, s8: S8, s9: S9) => R,
): Selector<T, R>;

export function createSelector<T, R>(...functions: ((...args: any) => any)[]): Selector<T, R> {
  const composer = functions.pop() as (...states: any[]) => R;
  const selectors = functions as Selector<T, any>[];

  return state => composer(...selectors.map(selector => selector(state)));
}
