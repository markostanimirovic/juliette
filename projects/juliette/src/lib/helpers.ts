export const deepFreeze = (obj: any): any => {
  if (!Object.isFrozen(obj)) Object.freeze(obj);

  for (const key in obj) {
    if (obj && obj.hasOwnProperty(key) && typeof obj[key] === 'object') deepFreeze(obj[key]);
  }

  return obj;
};
