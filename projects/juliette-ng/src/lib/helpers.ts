// TODO: move to juliette-ng

import { JULIETTE_EFFECT } from 'juliette';

export const fromEffectsObjectsToEffects = (effectsObjects: any[]): any[] =>
  effectsObjects.reduce((acc, objectWithEffects) => {
    const effectsFromCurrentObject = Object.getOwnPropertyNames(objectWithEffects)
      .filter(prop => objectWithEffects[prop].type === JULIETTE_EFFECT)
      .map(prop => objectWithEffects[prop]());
    return [...acc, ...effectsFromCurrentObject];
  }, []);

export interface Class<T> {
  new (...args: unknown[]): T;
  prototype: T;
}
