import { Injectable } from '@angular/core';
import { Store, ofType, toPayload } from 'juliette';
import { Feature1State, fromFeature1 } from './index';
import { tap } from 'rxjs/operators';

@Injectable()
export class Feature1Effects {
  updateFoo$ = this.store.handlers$.pipe(
    ofType(fromFeature1.updateFoo),
    toPayload(),
    tap(({ foo }) => console.log('fooUpdated', foo)),
  );

  constructor(private store: Store<Feature1State>) {}
}
