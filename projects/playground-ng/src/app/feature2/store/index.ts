import * as fromFeature2 from './feature2.handlers';

export interface Feature2AppState {
  [fromFeature2.featureKey]: fromFeature2.State;
}

export { fromFeature2 };
