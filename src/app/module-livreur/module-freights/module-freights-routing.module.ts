import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageFreightsComponent } from '../module-carriers/manage-freights/manage-freights.component';
import { FreightsStatisticsComponent } from './freights-statistics/freights-statistics.component';
import { ManageDeliveryManComponent } from './manage-delivery-man/manage-delivery-man.component';

const routes: Routes = [
  {
    path: 'list', component: ManageDeliveryManComponent
  },
  {
    path: 'stats-home', component: FreightsStatisticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleFreightsRoutingModule { }
