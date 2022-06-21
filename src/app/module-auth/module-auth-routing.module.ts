import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { CommercialRegisterComponent } from './components/signup-commercial/commercial-register/commercial-register.component';
import { SubcommercialRegisterComponent } from './components/signup-commercial/subcommercial-register/subcommercial-register.component';
import { SignupCarriersComponent } from './components/signup-livreur/signup-carriers/signup-carriers.component';
import { SignupFreightsComponent } from './components/signup-livreur/signup-freights/signup-freights.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: 'signin', component: SigninComponent
  },
  {
    path: 'signup-carriers', component: SignupCarriersComponent
  },
  {
    path: 'signup-freights', component: SignupFreightsComponent
  },
  {
    path: 'signup-commercial', component: CommercialRegisterComponent
  },
  {
    path: 'signup-subcommercial', component: SubcommercialRegisterComponent
  },
  {
    path: 'forgot-password', component: ForgotPasswordComponent,
  },
  {
    path: 'reset-password', component: ResetPasswordComponent,
  },
  {
    path: 'profile', component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleAuthRoutingModule { }
