import {
  HandlerCreatorWithoutPayload,
  HandlerCreatorWithPayload,
  ReducerWithoutPayload,
  ReducerWithPayload,
} from './models';

export function createHandler<S, P>(
  type: string,
  stateKey: string,
  reducer?: ReducerWithPayload<S, P>,
): HandlerCreatorWithPayload<S, P>;

export function createHandler<S>(
  type: string,
  stateKey: string,
  reducer?: ReducerWithoutPayload<S>,
): HandlerCreatorWithoutPayload<S>;

export function createHandler<S, P>(
  type: string,
  stateKey: string,
  reducer?: ReducerWithPayload<S, P> | ReducerWithoutPayload<S>,
): HandlerCreatorWithPayload<S, P> | HandlerCreatorWithoutPayload<S> {
  return (payload: P) => ({ type, stateKey, reducer, payload });
}
