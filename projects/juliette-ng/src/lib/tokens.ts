import { InjectionToken } from '@angular/core';

export const INITIAL_STATE = new InjectionToken('JULIETTE_INTERNAL: Initial State');
export const DEBUG_MODE = new InjectionToken('JULIETTE_INTERNAL: Debug Mode');
export const CLASSES_WITH_ROOT_EFFECTS = new InjectionToken(
  'JULIETTE_INTERNAL: Classes With Root Effects',
);
