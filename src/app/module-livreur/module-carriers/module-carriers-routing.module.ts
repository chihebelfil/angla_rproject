import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from 'src/app/module-auth/guards/role.guard';
import { ManageFreightsComponent } from './manage-freights/manage-freights.component';

const routes: Routes = [
  {
    path: 'list', component: ManageFreightsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleCarriersRoutingModule { }
