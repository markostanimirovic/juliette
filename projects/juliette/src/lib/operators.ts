import { filter, map } from 'rxjs/operators';
import { MonoTypeOperatorFunction, OperatorFunction } from 'rxjs';
import { Handler, HandlerCreator } from './models';

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
        handlerCreators.some(handlerCreator => handlerCreator.type === handler.type),
      ),
      map(handler => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { metaKey, ...handlerWithoutMetaKey } = handler;
        return handlerWithoutMetaKey;
      }),
    );
}

export function toPayload<S, P>(): OperatorFunction<Handler<S, P>, P> {
  return map(handler => handler.payload);
}
