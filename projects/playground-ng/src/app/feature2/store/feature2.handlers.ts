import { createHandler } from 'juliette';

export const featureKey = 'feature2';

export interface State {
  bar: string;
}

export const initialState: State = {
  bar: '',
};

export const updateBar = createHandler<State, { bar: string }>(
  '[Feature 2] Update Bar',
  featureKey,
  (state, { bar }) => ({ ...state, bar }),
);
