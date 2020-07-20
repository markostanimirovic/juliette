import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { fromStateConfigToState } from './helpers';
import { HandlerConfig, StateConfig } from './handlers';

export class Store {
  private state: BehaviorSubject<any>;
  private handlers = new Subject();

  debugMode: boolean;

  state$: Observable<any>;
  handlers$: Observable<any>;

  constructor(stateConfig: StateConfig<any> | StateConfig<any>[]) {
    this.state = new BehaviorSubject(fromStateConfigToState(stateConfig));
    this.state$ = this.state.asObservable();
    this.handlers$ = this.handlers.asObservable();
  }

  dispatch(handler: HandlerConfig): void {
    if (handler.reducer) {
      const newStateChunk = handler.reducer(this.state.value[handler.stateName], handler.payload);
      this.state.next({ ...this.state.value, [handler.stateName]: newStateChunk });
    }

    if (this.debugMode) this.debugModeFn(handler);

    this.handlers.next(handler);
  }

  debugModeFn = (handler: HandlerConfig): void => {
    console.log('%c%s', 'color: #00e600', handler.type);
    console.groupCollapsed('%c⧭', 'color: #0088cc', 'STATE TREE:');
    console.table(this.state.value);
    console.groupEnd();
  };
}
