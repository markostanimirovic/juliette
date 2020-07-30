import { ModuleWithProviders, NgModule } from '@angular/core';
import { Store } from 'juliette';

@NgModule()
export class StoreModule {
  static forRoot<T>(
    initialState: T,
    // eslint-disable-next-line
    debugMode = false,
  ): ModuleWithProviders<StoreModule> {
    return {
      ngModule: StoreModule,
      providers: [{ provide: Store, useValue: new Store<T>(initialState) }],
    };
  }
}
