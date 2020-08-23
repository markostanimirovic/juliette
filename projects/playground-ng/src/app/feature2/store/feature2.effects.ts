import { Injectable } from '@angular/core';
import { Store, ofType, toPayload } from 'juliette';
import { Feature2State, fromFeature2 } from './index';
import { tap } from 'rxjs/operators';

@Injectable()
export class Feature2Effects {
  updateBar$ = this.store.handlers$.pipe(
    ofType(fromFeature2.updateBar),
    toPayload(),
    tap(({ bar }) => console.log('barUpdated', bar)),
  );

  constructor(private store: Store<Feature2State>) {}
}
