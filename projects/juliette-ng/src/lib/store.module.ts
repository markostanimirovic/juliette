import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { createStore, Store } from 'juliette';

export function createStoreFactory<T>(initialState: T, debugMode: boolean): Store<T> {
  return createStore(initialState, debugMode);
}

const INITIAL_STATE = new InjectionToken('Initial State');
const DEBUG_MODE = new InjectionToken('Debug Mode');

@NgModule()
export class StoreModule {
  static forRoot<T>(initialState: T, debugMode = false): ModuleWithProviders<StoreModule> {
    return {
      ngModule: StoreModule,
      providers: [
        { provide: INITIAL_STATE, useValue: initialState },
        { provide: DEBUG_MODE, useValue: debugMode },
        {
          provide: Store,
          useFactory: createStoreFactory,
          deps: [INITIAL_STATE, DEBUG_MODE],
        },
      ],
    };
  }
}
