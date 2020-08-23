import { Inject, ModuleWithProviders, NgModule, Type } from '@angular/core';
import { CLASSES_WITH_FEATURE_EFFECTS, CLASSES_WITH_ROOT_EFFECTS } from './tokens';
import {
  fromClassesWithEffectsToClassProviders,
  fromObjectsWithEffectsToEffects,
} from './effects.mapper';
import { registerEffects, Store } from 'juliette';

@NgModule()
export class EffectsRootModule {
  constructor(store: Store<any>, @Inject(CLASSES_WITH_ROOT_EFFECTS) objectsWithEffects: any[]) {
    const effects = fromObjectsWithEffectsToEffects(objectsWithEffects);
    registerEffects(store, effects);
  }
}

@NgModule()
export class EffectsFeatureModule {
  constructor(store: Store<any>, @Inject(CLASSES_WITH_FEATURE_EFFECTS) objectsWithEffects: any[]) {
    const effects = fromObjectsWithEffectsToEffects(
      objectsWithEffects.splice(0, objectsWithEffects.length),
    );
    registerEffects(store, effects);
  }
}

@NgModule()
export class EffectsModule {
  static forRoot(classesWithEffects: Type<any>[] = []): ModuleWithProviders<EffectsRootModule> {
    return {
      ngModule: EffectsRootModule,
      providers: [
        ...fromClassesWithEffectsToClassProviders(CLASSES_WITH_ROOT_EFFECTS, classesWithEffects),
      ],
    };
  }

  static forFeature(classesWithEffects: Type<any>[] = []): ModuleWithProviders<any> {
    return {
      ngModule: EffectsFeatureModule,
      providers: [
        ...fromClassesWithEffectsToClassProviders(CLASSES_WITH_FEATURE_EFFECTS, classesWithEffects),
      ],
    };
  }
}
