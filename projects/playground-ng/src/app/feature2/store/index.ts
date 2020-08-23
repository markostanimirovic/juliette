import * as fromFeature2 from './feature2.handlers';

export interface Feature2State {
  [fromFeature2.featureKey]: fromFeature2.State;
}

export { fromFeature2 };
