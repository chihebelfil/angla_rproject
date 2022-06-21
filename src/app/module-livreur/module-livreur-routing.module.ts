import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'manage-freights', loadChildren: () => import('./module-carriers/module-carriers-routing.module').then(m => m.ModuleCarriersRoutingModule)
  },
  {
    path: 'manage-deliveryman', loadChildren: () => import('./module-freights/module-freights-routing.module').then(m=> m.ModuleFreightsRoutingModule)
  },
  {
    path: 'freight-stats', loadChildren: () => import('./module-freights/module-freights-routing.module').then(m=> m.ModuleFreightsRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleLivreurRoutingModule { }
