import { Selector } from './models';

export function composeSelectors<
  Selectors extends Selector<State, unknown>[],
  Slices extends {
    [I in keyof Selectors]: Selectors[I] extends Selector<State, infer Slice> ? Slice : never;
  },
  Result,
  State = Selectors extends Selector<infer T, unknown>[] ? T : never
>(selectors: [...Selectors], composer: (...slices: Slices) => Result): Selector<State, Result> {
  let cachedResult: Result;
  let cachedSlices: Slices;

  return state => {
    const newSlices = selectors.map(selector => selector(state)) as Slices;
    if (!cachedResult || cachedSlices.some((cachedSlice, i) => cachedSlice !== newSlices[i])) {
      cachedResult = composer(...newSlices);
      cachedSlices = newSlices;
    }

    return cachedResult;
  };
}
