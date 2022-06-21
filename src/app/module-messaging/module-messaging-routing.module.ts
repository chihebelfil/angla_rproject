import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessagingComponent } from './messaging/messaging.component';
import { NegotiationComponent } from './negotiation/negotiation.component';


const routes: Routes = [
  {
    path: 'messaging', component: MessagingComponent
  },
  {
    path: 'negociation', component: NegotiationComponent
  },






];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleMessagingRoutingModule { }
