type NullOrUndefined = null | undefined;

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
  readonly metaKey?: string;
  readonly type: string;
  readonly featureKey?: string;
  readonly reducer: Reducer<S, P>;
  readonly payload: P;
}

export type HandlerCreator<
  S = null,
  P = null,
  HC = P extends NullOrUndefined ? () => Handler<S, P> : (payload: P) => Handler<S, P>
> = HC & { type: string };

export type Dispatch = (handler: Handler<any, any>) => void;

export type Selector<S, R> = (state: S) => R;
