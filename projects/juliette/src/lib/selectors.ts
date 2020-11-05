import { Selector } from './models';

export function composeSelectors<
  T,
  R,
  S1,
  S2 = void,
  S3 = void,
  S4 = void,
  S5 = void,
  S6 = void,
  S7 = void,
  S8 = void,
  S9 = void,
  S10 = void
>(
  selectors: [
    Selector<T, S1>,
    Selector<T, S2>?,
    Selector<T, S3>?,
    Selector<T, S4>?,
    Selector<T, S5>?,
    Selector<T, S6>?,
    Selector<T, S7>?,
    Selector<T, S8>?,
    Selector<T, S9>?,
    Selector<T, S10>?,
  ],
  composer: (s1: S1, s2: S2, s3: S3, s4: S4, s5: S5, s6: S6, s7: S7, s8: S8, s9: S9, s10: S10) => R,
): Selector<T, R>;

export function composeSelectors<T, R>(
  selectors: Selector<T, any>[],
  composer: (...states: any[]) => R,
): Selector<T, R>;

export function composeSelectors<T, R>(
  selectors: (Selector<T, any> | undefined)[],
  composer: (...states: any[]) => R,
): Selector<T, R> {
  return state => composer(...selectors.map(selector => selector?.(state)));
}
