import { filter, map } from 'rxjs/operators';
import { MonoTypeOperatorFunction, OperatorFunction } from 'rxjs';
import { Handler, HandlerCreator } from './models';

export function ofType(
  handlerCreator: HandlerCreator,
): OperatorFunction<Handler<any, any>, Handler>;

export function ofType<P>(
  handlerCreator: HandlerCreator<null, P>,
): OperatorFunction<Handler<any, any>, Handler<null, P>>;

export function ofType<S>(
  handlerCreator: HandlerCreator<S>,
): OperatorFunction<Handler<any, any>, Handler<S>>;

export function ofType<S, P>(
  handlerCreator: HandlerCreator<S, P>,
): OperatorFunction<Handler<any, any>, Handler<S, P>>;

export function ofType(
  ...handlerCreators: HandlerCreator<any, any>[]
): MonoTypeOperatorFunction<Handler<any, any>>;

export function ofType(
  ...handlerCreators: HandlerCreator<any, any>[]
): MonoTypeOperatorFunction<Handler<any, any>> {
  return source$ =>
    source$.pipe(
      filter(handler =>
        handlerCreators.some(handlerCreator => handlerCreator(null).type === handler.type),
      ),
      map(handler => ({ ...handler, metaKey: null })),
    );
}

export function toPayload<S, P>(): OperatorFunction<Handler<S, P>, P> {
  return map(handler => handler.payload);
}
