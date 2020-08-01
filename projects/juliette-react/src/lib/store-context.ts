import { createContext } from 'react';
import { Store } from 'juliette';

export const StoreContext = createContext<Store<any>>(null as any);
