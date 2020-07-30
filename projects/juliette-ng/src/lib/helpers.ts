import { JULIETTE_EFFECT } from 'juliette';

export const fromObjectsWithEffectsToEffects = (objectsWithEffects: any[]): any[] =>
  objectsWithEffects.reduce((acc, objectWithEffects) => {
    const effectsFromCurrentObject = Object.getOwnPropertyNames(objectWithEffects)
      .filter(prop => objectWithEffects[prop].type === JULIETTE_EFFECT)
      .map(prop => objectWithEffects[prop]());
    return [...acc, ...effectsFromCurrentObject];
  }, []);
