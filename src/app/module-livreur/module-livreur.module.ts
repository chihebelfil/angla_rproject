import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleCarriersModule } from './module-carriers/module-carriers.module';
import { ModuleFreightsModule } from './module-freights/module-freights.module';
import { ModuleLivreurRoutingModule } from './module-livreur-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ModuleLivreurRoutingModule,
    ModuleCarriersModule,
    ModuleFreightsModule,
    

  ]
})
export class ModuleLivreurModule { }
