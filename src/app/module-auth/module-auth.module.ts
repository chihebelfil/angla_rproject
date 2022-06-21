import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleAuthRoutingModule } from './module-auth-routing.module';
import { AuthService } from './services/auth.service';
import { TokenStorageService } from './services/token-storage.service';
import { AuthInterceptor } from './helpers/auth-interceptor';
import { SigninComponent } from './components/signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { SignupCarriersComponent } from './components/signup-livreur/signup-carriers/signup-carriers.component';
import { SignupFreightsComponent } from './components/signup-livreur/signup-freights/signup-freights.component';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { CommercialRegisterComponent } from './components/signup-commercial/commercial-register/commercial-register.component';
import { SubcommercialRegisterComponent } from './components/signup-commercial/subcommercial-register/subcommercial-register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { PasswordDirective } from './components/PasswordDirective/password.directive';
import {DialogModule} from 'primeng/dialog';
import { ProfileComponent } from './components/profile/profile.component';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};

@NgModule({
  declarations: [
    SigninComponent,
    SignupCarriersComponent,
    SignupFreightsComponent,
    CommercialRegisterComponent,
    SubcommercialRegisterComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    PasswordDirective,
    ProfileComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModuleAuthRoutingModule,
    SharedModule,
    DialogModule,
    NgWizardModule.forRoot(ngWizardConfig)
  ],
  providers: [AuthInterceptor, AuthService, TokenStorageService, AuthGuard, RoleGuard]
})
export class ModuleAuthModule { }
