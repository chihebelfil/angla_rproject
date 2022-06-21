import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'manage-commercial',
    loadChildren: () => import('./commercial/commercial-routing.module').then(m => m.CommercialRoutingModule)
  },
  {
    path: 'manage-sub-commercial',
    loadChildren: () => import('./sub-commercial/sub-commercial-routing.module').then(m => m.SubCommercialRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleCommercialRoutingModule { }
