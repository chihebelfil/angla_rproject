import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageCommercialComponent } from './manage-commercial/manage-commercial.component';
import { ManageSubCommercialComponent } from './manage-sub-commercial/manage-sub-commercial.component';

const routes: Routes = [
/*   {
    path: 'gerer-sub-commercial',
    loadChildren: () => import('./gerer-sub-commercial/gerer-sub-commercial-routing.module').then(m => m.GererSubCommercialRoutingModule)
  }, */
  {
    path: 'subCommercial-list', component: ManageSubCommercialComponent
  },
  {
    path: 'Commercial-list', component: ManageCommercialComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommercialRoutingModule { }
