import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './module-auth/guards/auth.guard';
import { RoleGuard } from './module-auth/guards/role.guard';
import { HomeComponent } from './shared/layout/home/home.component';
const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'account', loadChildren: () => import('./module-auth/module-auth-routing.module').then(m => m.ModuleAuthRoutingModule)
  },
  {
    path: 'carriers', loadChildren: () => import('./module-livreur/module-livreur-routing.module').then(m => m.ModuleLivreurRoutingModule)
  },
  {
    path: 'freight', loadChildren: () => import('./module-livreur/module-livreur-routing.module').then(m=> m.ModuleLivreurRoutingModule)
  },
  {
    path: 'commercial', loadChildren: () => import('./module-commercial/module-commercial-routing.module').then(m => m.ModuleCommercialRoutingModule)
  },
  {
    path: 'colis', loadChildren: () => import('./module-colis/module-colis-routing.module').then(m => m.ModuleColisRoutingModule)
  },
  {
    path: 'messaging', loadChildren: () => import('./module-messaging/module-messaging-routing.module').then(m => m.ModuleMessagingRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
