import { APP_INITIALIZER, ModuleWithProviders, NgModule, Type } from '@angular/core';
import { registerEffects, Store } from 'juliette';
import { fromObjectsWithEffectsToEffects } from './helpers';

export function registerEffectsFactory<T>(store: Store<T>, ...objectsWithEffects: unknown[]): () => null {
  const effects = fromObjectsWithEffectsToEffects(objectsWithEffects);
  registerEffects(store, effects);
  return () => null;
}

@NgModule()
export class EffectsModule {
  static forRoot(classesWithEffects: Type<unknown>[]): ModuleWithProviders<EffectsModule> {
    return {
      ngModule: EffectsModule,
      providers: [
        ...classesWithEffects,
        {
          provide: APP_INITIALIZER,
          useFactory: registerEffectsFactory,
          deps: [Store, ...classesWithEffects],
          multi: true,
        },
      ],
    };
  }
}
