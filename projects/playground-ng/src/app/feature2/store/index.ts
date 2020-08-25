import { AppState } from '../../store';
import * as fromFeature2 from './feature2.handlers';

export interface Feature2AppState extends AppState {
  [fromFeature2.featureKey]: fromFeature2.State;
}

export { fromFeature2 };
