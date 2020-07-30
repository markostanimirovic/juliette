import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { Store, registerEffects } from 'juliette';
import { Class, fromEffectsObjectsToEffects } from './helpers';

export function registerEffectsFactory<T>(store: Store<T>, ...effectsObjects: any[]): () => null {
  const effects = fromEffectsObjectsToEffects(effectsObjects);
  registerEffects(store, effects);
  return () => null;
}

@NgModule()
export class StoreModule {
  static forRoot<T>(
    initialState: T,
    effectsClasses: Class<unknown>[],
    // eslint-disable-next-line
    debugMode = false,
  ): ModuleWithProviders<StoreModule> {
    return {
      ngModule: StoreModule,
      providers: [
        { provide: Store, useValue: new Store<T>(initialState) },
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
