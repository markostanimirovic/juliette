import { HandlerCreator, Reducer } from './models';
import { HANDLER_META_KEY } from './constants';

export function createHandler(type: string): HandlerCreator;

export function createHandler<P>(type: string): HandlerCreator<null, NonNullable<P>>;

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
  reducer?: any,
): HandlerCreator<any, any> {
  return (payload: any) => ({ metaKey: HANDLER_META_KEY, type, featureKey, reducer, payload });
}
