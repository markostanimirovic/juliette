import { ModuleWithProviders, NgModule } from '@angular/core';
import { createStore, Store } from 'juliette';
import { DEV_MODE, INITIAL_STATE } from './tokens';

export function createStoreFactory<T>(initialState: T, devMode: boolean): Store<T> {
  return createStore(initialState, devMode);
}

@NgModule()
export class StoreRootModule {}

@NgModule()
export class StoreModule {
  static forRoot<T>(initialState: T, devMode = false): ModuleWithProviders<StoreRootModule> {
    return {
      ngModule: StoreRootModule,
      providers: [
        { provide: INITIAL_STATE, useValue: initialState },
        { provide: DEV_MODE, useValue: devMode },
        {
          provide: Store,
          useFactory: createStoreFactory,
          deps: [INITIAL_STATE, DEV_MODE],
        },
      ],
    };
  }
}
