import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Feature2RoutingModule } from './feature2-routing.module';
import { Feature2Component } from './feature2.component';
import { EffectsModule, StoreModule } from 'juliette-ng';
import { fromFeature2 } from './store';
import { Feature2Effects } from './store/feature2.effects';

@NgModule({
  declarations: [Feature2Component],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Feature2RoutingModule,
    StoreModule.forFeature(fromFeature2.featureKey, fromFeature2.initialState),
    EffectsModule.forFeature([Feature2Effects]),
  ],
})
export class Feature2Module {}
