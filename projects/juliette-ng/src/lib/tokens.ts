import { InjectionToken } from '@angular/core';

export const INITIAL_STATE = new InjectionToken('__julietteNgInternal/initialState__');
export const DEV_MODE = new InjectionToken('__julietteNgInternal/devMode__');
export const CLASSES_WITH_ROOT_EFFECTS = new InjectionToken(
  '__julietteNgInternal/classesWithRootEffects__',
);
