import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from 'juliette';
import { Feature1AppState, fromFeature1 } from './store';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="state$ | async as state">
      <input type="text" [formControl]="fooControl" />
      <br />
      Foo: {{ state.foo }}
    </ng-container>
  `,
})
export class Feature1Component implements OnInit, OnDestroy {
  private destroy = new Subject();

  fooControl = new FormControl();
  state$ = this.store.select(fromFeature1.featureKey);

  constructor(private store: Store<Feature1AppState>) {}

  ngOnInit(): void {
    this.fooControl.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe(foo => this.store.dispatch(fromFeature1.updateFoo({ foo })));
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
