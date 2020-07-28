import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { StateConfig, Class, Store, fromEffectsObjectsToEffects, registerEffects } from 'juliette';

export function registerEffectsFactory(store: Store, ...effectsObjects: any[]): void {
  const effects = fromEffectsObjectsToEffects(effectsObjects);
  registerEffects(store, effects);
}

@NgModule()
export class StoreModule {
  static forRoot(
    stateConfig: StateConfig<any> | StateConfig<any>[],
    effectsClasses: Class[],
    // eslint-disable-next-line
    debugMode = false,
  ): ModuleWithProviders<StoreModule> {
    return {
      ngModule: StoreModule,
      providers: [
        { provide: Store, useValue: new Store(stateConfig) },
        ...effectsClasses,
        {
          provide: APP_INITIALIZER,
          useFactory: registerEffectsFactory,
          deps: [Store, ...effectsClasses],
          multi: true,
        },
      ],
    };
  }
}
