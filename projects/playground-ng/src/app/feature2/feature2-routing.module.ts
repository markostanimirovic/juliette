import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { Feature2Component } from './feature2.component';

const routes: Route[] = [{ path: '', component: Feature2Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Feature2RoutingModule {}
