import { filter, map } from 'rxjs/operators';
import { HandlerConfig } from './handlers';
import { MonoTypeOperatorFunction, OperatorFunction } from 'rxjs';

export const select = (stateName: string): OperatorFunction<unknown, unknown> => map((state: any) => state[stateName]);

export const ofType = (...handlers: (() => HandlerConfig)[]): MonoTypeOperatorFunction<HandlerConfig> =>
  filter((emittedHandler: HandlerConfig) => handlers.map(handler => handler().type).indexOf(emittedHandler.type) > -1);
