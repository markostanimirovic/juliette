import { filter } from 'rxjs/operators';
import { MonoTypeOperatorFunction, OperatorFunction } from 'rxjs';
import {
  Handler,
  HandlerCreator,
  HandlerCreatorWithoutPayload,
  HandlerCreatorWithPayload,
  HandlerWithoutPayload,
  HandlerWithPayload,
} from './models';

export function ofType<S>(
  handlerCreator: HandlerCreatorWithoutPayload<S>,
): OperatorFunction<Handler, HandlerWithoutPayload<S>>;

export function ofType<S, P>(
  handlerCreator: HandlerCreatorWithPayload<S, P>,
): OperatorFunction<Handler, HandlerWithPayload<S, P>>;

export function ofType(...handlerCreators: HandlerCreator<any, any>[]): MonoTypeOperatorFunction<Handler>;

export function ofType(...handlerCreators: HandlerCreator<any, any>[]): MonoTypeOperatorFunction<Handler> {
  return filter((handler: Handler) =>
    handlerCreators.some(handlerCreator => handlerCreator(null).type === handler.type),
  );
}
