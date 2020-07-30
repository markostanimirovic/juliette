import { Handler } from './models';

export const debugModeFn = <T>(handler: Handler): void => {
  console.log('%c%s', 'color: #00e600', handler.type);
  console.groupCollapsed('%c⧭', 'color: #0088cc', 'STATE TREE:');
  // console.table(this.state.value);
  console.groupEnd();
};
