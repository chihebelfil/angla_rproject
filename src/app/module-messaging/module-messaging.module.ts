import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleMessagingRoutingModule } from './module-messaging-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MessagingService } from './services/messaging.service';
import { NegociationServiceService } from './services/negociation-service.service';
import { MessagingComponent } from './messaging/messaging.component';
import { NegotiationComponent } from './negotiation/negotiation.component';

@NgModule({
  declarations: [MessagingComponent, NegotiationComponent ],
  imports: [
    CommonModule,
    ModuleMessagingRoutingModule,
    BrowserModule,
    FormsModule
  ],
  providers: [MessagingService, NegociationServiceService]
})
export class ModuleMessagingModule { }
