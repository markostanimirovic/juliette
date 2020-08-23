import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Feature1RoutingModule } from './feature1-routing.module';
import { Feature1Component } from './feature1.component';
import { StoreModule, EffectsModule } from 'juliette-ng';
import { fromFeature1 } from './store';
import { Feature1Effects } from './store/feature1.effects';

@NgModule({
  declarations: [Feature1Component],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Feature1RoutingModule,
    StoreModule.forFeature(fromFeature1.featureKey, fromFeature1.initialState),
    EffectsModule.forFeature([Feature1Effects]),
  ],
})
export class Feature1Module {}
