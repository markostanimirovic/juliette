export type NullOrUndefined = null | undefined;

export type Reducer<
  S = null,
  P = null,
  R = S extends NullOrUndefined
    ? null
    : P extends NullOrUndefined
    ? (state: S) => S
    : (state: S, payload: P) => S
> = R;

export interface Handler<S = null, P = null> {
  type: string;
  featureKey?: string;
  reducer: Reducer<S, P>;
  payload: P;
  metaKey: string;
}

export type HandlerCreator<
  S = null,
  P = null,
  HC = P extends NullOrUndefined ? () => Handler<S, P> : (payload: P) => Handler<S, P>
> = HC;

export type Dispatch = (handler: Handler<any, any>) => void;

export type Selector<S, R> = (state: S) => R;
