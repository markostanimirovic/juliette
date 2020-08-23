import { Inject, ModuleWithProviders, NgModule, Type } from '@angular/core';
import { OBJECTS_WITH_EFFECTS } from './tokens';
import {
  fromClassesWithEffectsToClassProviders,
  fromObjectsWithEffectsToEffects,
} from './effects.mapper';
import { registerEffects, Store } from 'juliette';

@NgModule()
export class EffectsModule {
  constructor(store: Store<any>, @Inject(OBJECTS_WITH_EFFECTS) objectsWithEffects: any[]) {
    const effects = fromObjectsWithEffectsToEffects(
      objectsWithEffects.splice(0, objectsWithEffects.length),
    );
    registerEffects(store, effects);
  }

  static register(classesWithEffects: Type<any>[]): ModuleWithProviders<EffectsModule> {
    return {
      ngModule: EffectsModule,
      providers: [
        ...fromClassesWithEffectsToClassProviders(OBJECTS_WITH_EFFECTS, classesWithEffects),
      ],
    };
  }
}
