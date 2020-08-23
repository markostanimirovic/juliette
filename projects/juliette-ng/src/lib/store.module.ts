import { Inject, ModuleWithProviders, NgModule } from '@angular/core';
import { createStore, Store } from 'juliette';
import { DEV_MODE, FEATURE_KEYS, INITIAL_FEATURE_STATES, INITIAL_ROOT_STATE } from './tokens';

export function createStoreFactory<T>(initialState: T, devMode: boolean): Store<T> {
  return createStore(initialState, devMode);
}

@NgModule()
export class StoreRootModule {}

@NgModule()
export class StoreFeatureModule {
  constructor(
    store: Store<any>,
    @Inject(FEATURE_KEYS) featureKeys: any[],
    @Inject(INITIAL_FEATURE_STATES) initialStates: any[],
  ) {
    store.addFeatureState(featureKeys.pop(), initialStates.pop());
  }
}

@NgModule()
export class StoreModule {
  static forRoot<T>(initialState: T, devMode = false): ModuleWithProviders<StoreRootModule> {
    return {
      ngModule: StoreRootModule,
      providers: [
        { provide: INITIAL_ROOT_STATE, useValue: initialState },
        { provide: DEV_MODE, useValue: devMode },
        {
          provide: Store,
          useFactory: createStoreFactory,
          deps: [INITIAL_ROOT_STATE, DEV_MODE],
        },
      ],
    };
  }

  static forFeature<T>(
    featureKey: keyof T,
    initialState: T[keyof T],
  ): ModuleWithProviders<StoreFeatureModule> {
    return {
      ngModule: StoreFeatureModule,
      providers: [
        { provide: FEATURE_KEYS, multi: true, useValue: featureKey },
        { provide: INITIAL_FEATURE_STATES, multi: true, useValue: initialState },
      ],
    };
  }
}
