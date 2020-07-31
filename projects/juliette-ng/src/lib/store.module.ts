import { ModuleWithProviders, NgModule } from '@angular/core';
import { createStore, Store } from 'juliette';
import { DEBUG_MODE, INITIAL_STATE } from './tokens';

export function createStoreFactory<T>(initialState: T, debugMode: boolean): Store<T> {
  return createStore(initialState, debugMode);
}

@NgModule()
export class StoreRootModule {}

@NgModule()
export class StoreModule {
  static forRoot<T>(initialState: T, debugMode = false): ModuleWithProviders<StoreRootModule> {
    return {
      ngModule: StoreRootModule,
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
