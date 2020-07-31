import { Effect, JULIETTE_EFFECT } from 'juliette';
import { ClassProvider, InjectionToken, Type } from '@angular/core';

export const fromClassesWithEffectsToClassProviders = (
  injectionToken: InjectionToken<any>,
  classesWithEffects: Type<any>[],
): ClassProvider[] =>
  classesWithEffects.map(classWithEffects => ({ provide: injectionToken, useClass: classWithEffects, multi: true }));

export const fromObjectsWithEffectsToEffects = (objectsWithEffects: any[]): Effect[] =>
  objectsWithEffects.reduce((acc, objectWithEffects) => {
    const effectsFromCurrentObject = Object.getOwnPropertyNames(objectWithEffects)
      .filter(prop => objectWithEffects[prop]?.type === JULIETTE_EFFECT)
      .map(prop => objectWithEffects[prop]);
    return [...acc, ...effectsFromCurrentObject];
  }, []);
