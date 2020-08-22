import { Inject, ModuleWithProviders, NgModule } from '@angular/core';
import { createStore, Store } from 'juliette';
import { DEV_MODE, FEATURE_KEYS, FEATURE_STATES, INITIAL_STATE } from './tokens';

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
    @Inject(FEATURE_STATES) featureStates: any[],
  ) {
    store.addFeatureState(featureKeys.pop(), featureStates.pop());
  }
}

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

  static forFeature<T>(
    featureKey: keyof T,
    featureState: T[keyof T],
  ): ModuleWithProviders<StoreFeatureModule> {
    return {
      ngModule: StoreFeatureModule,
      providers: [
        { provide: FEATURE_KEYS, multi: true, useValue: featureKey },
        { provide: FEATURE_STATES, multi: true, useValue: featureState },
      ],
    };
  }
}
