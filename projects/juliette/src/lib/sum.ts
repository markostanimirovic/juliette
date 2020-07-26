export const sum = (a: number, b: number): number => a + b;
export const add = (a: any): any => ({ ...a, m: 1 });
export const isNull = (el: { m: string }): boolean => !!el?.m;
