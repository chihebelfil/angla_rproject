import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddColisComponent } from './add-colis/add-colis.component';
import { DetailColisComponent } from './detail-colis/detail-colis.component';
import { DistanceComponent } from './distance/distance.component';
import { ListerColisComponent } from './lister-colis/lister-colis.component';

const routes: Routes = [
  {
    path: '', 
    children:[
      {
        path: 'distance', component: DistanceComponent, 
      },
      {
        path: 'add-colis', component: AddColisComponent
      },
      {
        path: 'list', component: ListerColisComponent
      },
      {
        path: 'detail/:id', component: DetailColisComponent
      }
    ]
  }
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleColisRoutingModule { }
