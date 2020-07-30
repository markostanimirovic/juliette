import { Observable } from 'rxjs';

export type ReducerWithPayload<S, P> = (state: S, payload: P) => S;

export type ReducerWithoutPayload<S> = (state: S) => S;

export interface Handler {
  type: string;
  stateKey: string;
}

export interface HandlerWithPayload<S, P> extends Handler {
  reducer?: ReducerWithPayload<S, P>;
  payload: P;
}

export interface HandlerWithoutPayload<S> extends Handler {
  reducer?: ReducerWithoutPayload<S>;
}

export type HandlerCreatorWithPayload<S, P> = (payload: P) => HandlerWithPayload<S, P>;

export type HandlerCreatorWithoutPayload<S> = () => HandlerWithoutPayload<S>;

export type HandlerCreator<S, P> = HandlerCreatorWithPayload<S, P> | HandlerCreatorWithoutPayload<S>;

export type Selector<S, R> = (state: S) => R;

export interface Effect {
  source$: Observable<Handler | void>;
  type: string;
}
