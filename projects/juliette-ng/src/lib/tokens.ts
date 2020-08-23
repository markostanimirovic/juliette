import { InjectionToken } from '@angular/core';

export const INITIAL_ROOT_STATE = new InjectionToken('__julietteNgInternal/initialRootState__');
export const FEATURE_KEYS = new InjectionToken('__julietteNgInternal/featureKeys__');
export const INITIAL_FEATURE_STATES = new InjectionToken(
  '__julietteNgInternal/initialFeatureStates__',
);
export const DEV_MODE = new InjectionToken('__julietteNgInternal/devMode__');
export const OBJECTS_WITH_EFFECTS = new InjectionToken('__julietteNgInternal/objectsWithEffects__');
