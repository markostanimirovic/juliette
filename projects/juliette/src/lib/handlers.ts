import { HandlerCreator, Reducer } from './models';

export function createHandler(type: string): HandlerCreator;

export function createHandler<P>(type: string): HandlerCreator<null, P>;

export function createHandler<S = null>(
  type: string,
  featureKey: string,
  reducer: Reducer<NonNullable<S>>,
): HandlerCreator<NonNullable<S>>;

export function createHandler<S = null, P = null>(
  type: string,
  featureKey: string,
  reducer: Reducer<NonNullable<S>, NonNullable<P>>,
): HandlerCreator<NonNullable<S>, NonNullable<P>>;

export function createHandler(
  type: string,
  featureKey?: string,
  reducer?: Reducer<any, any>,
): HandlerCreator<any, any> {
  return (payload?: any) => ({ type, featureKey, reducer, payload });
}
