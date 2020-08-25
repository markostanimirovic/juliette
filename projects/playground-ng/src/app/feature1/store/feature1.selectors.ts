import { createFeatureSelector, createSelector } from 'juliette';
import { Feature1AppState, fromFeature1 } from './index';
import { selectUsers } from '../../store/selectors';

export const selectFeature1State = createFeatureSelector<Feature1AppState, fromFeature1.State>(
  fromFeature1.featureKey,
);
export const selectFoo = createSelector(selectFeature1State, state => state.foo);
export const selectFooWithUsers = createSelector(selectFoo, selectUsers, (foo, users) => ({
  foo,
  users,
}));
