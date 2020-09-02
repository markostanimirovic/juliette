import { composeSelectors } from 'juliette';
import { Feature1AppState, fromFeature1 } from './index';
import { selectUsers } from '../../store/selectors';
import { Selector } from '../../../../../juliette/src/lib/models';

export const selectFeature1State: Selector<Feature1AppState, fromFeature1.State> = state =>
  state[fromFeature1.featureKey];
export const selectFoo = composeSelectors([selectFeature1State], state => state.foo);
export const selectFooWithUsers = composeSelectors([selectFoo, selectUsers], (foo, users) => ({
  foo,
  users,
}));
