import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSprinnerComponent } from './components/loading/loading-sprinner/loading-sprinner.component';
import { WarningAlertComponent } from './components/alerts/warning-alert/warning-alert.component';
import { ErrorAlertComponent } from './components/alerts/error-alert/error-alert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuccessAlertComponent } from './components/alerts/success-alert/success-alert.component';
import { UserService } from './services/user.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IndexOfPipe } from './pipes/index-of.pipe';
import { NextCharPipe } from './pipes/next-char.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    LoadingSprinnerComponent, 
    WarningAlertComponent, 
    ErrorAlertComponent, 
    SuccessAlertComponent,
    IndexOfPipe,
    NextCharPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  exports: [
    LoadingSprinnerComponent, 
    WarningAlertComponent, 
    ErrorAlertComponent, 
    SuccessAlertComponent, 
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    IndexOfPipe,
    NextCharPipe,
    NgxSpinnerModule
  ],
  providers: [UserService, IndexOfPipe, NextCharPipe]
})
export class SharedModule { }
