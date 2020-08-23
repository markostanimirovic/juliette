import * as fromFeature1 from './feature1.handlers';

export interface Feature1State {
  [fromFeature1.featureKey]: fromFeature1.State;
}

export { fromFeature1 };
