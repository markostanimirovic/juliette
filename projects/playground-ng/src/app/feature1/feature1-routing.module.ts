import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { Feature1Component } from './feature1.component';

const routes: Route[] = [{ path: '', component: Feature1Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Feature1RoutingModule {}
