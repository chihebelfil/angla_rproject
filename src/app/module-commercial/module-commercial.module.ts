import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleCommercialRoutingModule } from './module-commercial-routing.module';
import { CommercialModule } from './commercial/commercial.module';
import { SubCommercialModule } from './sub-commercial/sub-commercial.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ModuleCommercialRoutingModule,
    CommercialModule,
    SubCommercialModule

  ]
})
export class ModuleCommercialModule { }

