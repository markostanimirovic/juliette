import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from 'juliette';
import { Feature1AppState, fromFeature1 } from './store';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { selectFooWithUsers } from './store/feature1.selectors';

@Component({
  template: `
    <ng-container *ngIf="state$ | async as state">
      <input type="text" [formControl]="fooControl" />
      <br />
      Foo: {{ state.foo }}
      <br />
      <ol *ngIf="state.users.length > 0">
        <li *ngFor="let user of state.users">{{ user.name }}</li>
      </ol>
    </ng-container>
  `,
})
export class Feature1Component implements OnInit, OnDestroy {
  private destroy = new Subject();

  fooControl = new FormControl();
  state$ = this.store.select(selectFooWithUsers);

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
