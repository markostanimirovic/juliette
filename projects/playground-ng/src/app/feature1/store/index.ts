import { AppState } from '../../store';
import * as fromFeature1 from './feature1.handlers';

export interface Feature1AppState extends AppState {
  [fromFeature1.featureKey]: fromFeature1.State;
}

export { fromFeature1 };
