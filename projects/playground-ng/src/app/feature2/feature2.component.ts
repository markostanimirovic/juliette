import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from 'juliette';
import { Feature2AppState, fromFeature2 } from './store';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="state$ | async as state">
      <input type="text" [formControl]="barControl" />
      <br />
      Bar: {{ state.bar }}
    </ng-container>
  `,
})
export class Feature2Component implements OnInit, OnDestroy {
  private destroy = new Subject();

  barControl = new FormControl();
  state$ = this.store.select(fromFeature2.featureKey);

  constructor(private store: Store<Feature2AppState>) {}

  ngOnInit(): void {
    this.barControl.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe(bar => this.store.dispatch(fromFeature2.updateBar({ bar })));
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
