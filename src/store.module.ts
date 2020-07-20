import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { Store } from './store';
import { fromEffectsObjectsToEffects } from './helpers';
import { Class } from './types';
import { StateConfig } from './handlers';
import { registerEffects } from './effects';

@NgModule()
export class StoreModule {
  static forRoot(
    stateConfig: StateConfig<any> | StateConfig<any>[],
    effectsClasses: Class[],
    debugMode = false,
  ): ModuleWithProviders<StoreModule> {
    return {
      ngModule: StoreModule,
      providers: [
        { provide: Store, useValue: new Store(stateConfig) },
        ...effectsClasses,
        {
          provide: APP_INITIALIZER,
          useFactory: (store: Store, ...effectsObjects) => (): void => {
            store.debugMode = debugMode;
            const effects = fromEffectsObjectsToEffects(effectsObjects);
            registerEffects(store, effects);
          },
          deps: [Store, ...effectsClasses],
          multi: true,
        },
      ],
    };
  }
}
