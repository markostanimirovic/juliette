import { createHandler } from 'juliette';

export const featureKey = 'feature1';

export interface State {
  foo: string;
}

export const initialState: State = {
  foo: '',
};

export const updateFoo = createHandler<State, { foo: string }>(
  '[Feature 1] Update Foo',
  featureKey,
  (state, { foo }) => ({ ...state, foo }),
);
