import { Selector } from './models';

export function composeSelectors<T, R, S>(
  selectors: [Selector<T, S>],
  composer: Selector<S, R>,
): Selector<T, R>;

export function composeSelectors<T, R, S1, S2>(
  selectors: [Selector<T, S1>, Selector<T, S2>],
  composer: (s1: S1, s2: S2) => R,
): Selector<T, R>;

export function composeSelectors<T, R, S1, S2, S3>(
  selectors: [Selector<T, S1>, Selector<T, S2>, Selector<T, S3>],
  composer: (s1: S1, s2: S2, s3: S3) => R,
): Selector<T, R>;

export function composeSelectors<T, R, S1, S2, S3, S4>(
  selectors: [Selector<T, S1>, Selector<T, S2>, Selector<T, S3>, Selector<T, S4>],
  composer: (s1: S1, s2: S2, s3: S3, s4: S4) => R,
): Selector<T, R>;

export function composeSelectors<T, R, S1, S2, S3, S4, S5>(
  selectors: [Selector<T, S1>, Selector<T, S2>, Selector<T, S3>, Selector<T, S4>, Selector<T, S5>],
  composer: (s1: S1, s2: S2, s3: S3, s4: S4, s5: S5) => R,
): Selector<T, R>;

export function composeSelectors<T, R, S1, S2, S3, S4, S5, S6>(
  selectors: [
    Selector<T, S1>,
    Selector<T, S2>,
    Selector<T, S3>,
    Selector<T, S4>,
    Selector<T, S5>,
    Selector<T, S6>,
  ],
  composer: (s1: S1, s2: S2, s3: S3, s4: S4, s5: S5, s6: S6) => R,
): Selector<T, R>;

export function composeSelectors<T, R, S1, S2, S3, S4, S5, S6, S7>(
  selectors: [
    Selector<T, S1>,
    Selector<T, S2>,
    Selector<T, S3>,
    Selector<T, S4>,
    Selector<T, S5>,
    Selector<T, S6>,
    Selector<T, S7>,
  ],
  composer: (s1: S1, s2: S2, s3: S3, s4: S4, s5: S5, s6: S6, s7: S7) => R,
): Selector<T, R>;

export function composeSelectors<T, R, S1, S2, S3, S4, S5, S6, S7, S8>(
  selectors: [
    Selector<T, S1>,
    Selector<T, S2>,
    Selector<T, S3>,
    Selector<T, S4>,
    Selector<T, S5>,
    Selector<T, S6>,
    Selector<T, S7>,
    Selector<T, S8>,
  ],
  composer: (s1: S1, s2: S2, s3: S3, s4: S4, s5: S5, s6: S6, s7: S7, s8: S8) => R,
): Selector<T, R>;

export function composeSelectors<T, R, S1, S2, S3, S4, S5, S6, S7, S8, S9>(
  selectors: [
    Selector<T, S1>,
    Selector<T, S2>,
    Selector<T, S3>,
    Selector<T, S4>,
    Selector<T, S5>,
    Selector<T, S6>,
    Selector<T, S7>,
    Selector<T, S8>,
    Selector<T, S9>,
  ],
  composer: (s1: S1, s2: S2, s3: S3, s4: S4, s5: S5, s6: S6, s7: S7, s8: S8, s9: S9) => R,
): Selector<T, R>;

export function composeSelectors<T, R>(
  selectors: Selector<T, any>[],
  composer: (...states: any[]) => R,
): Selector<T, R>;

export function composeSelectors<T, R>(
  selectors: Selector<T, any>[],
  composer: (...states: any[]) => R,
): Selector<T, R> {
  return state => composer(...selectors.map(selector => selector(state)));
}
