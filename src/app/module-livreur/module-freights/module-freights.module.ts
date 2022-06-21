import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleFreightsRoutingModule } from './module-freights-routing.module';
import { ManageDeliveryManComponent } from './manage-delivery-man/manage-delivery-man.component';
import { FreightService } from './services/freight.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedPrimeNgModule } from 'src/app/primeng/shared-prime-ng/shared-prime-ng.module';
import { FreightsStatisticsComponent } from './freights-statistics/freights-statistics.component';
import { NumberColisByStateComponent } from './statistics-components/number-colis-by-state/number-colis-by-state.component';
import { ColisByStateDestinataireComponent } from './statistics-components/colis-by-state-destinataire/colis-by-state-destinataire.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { CountColisGroupByDeliveryManComponent } from './statistics-components/count-colis-group-by-delivery-man/count-colis-group-by-delivery-man.component';

@NgModule({
  declarations: [ManageDeliveryManComponent, FreightsStatisticsComponent, NumberColisByStateComponent, ColisByStateDestinataireComponent, CountColisGroupByDeliveryManComponent],
  imports: [
    CommonModule,
    FormsModule,
    ModuleFreightsRoutingModule,
    SharedPrimeNgModule,
    SharedModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
  ],
  providers: [FreightService, MessageService, ConfirmationService]
})
export class ModuleFreightsModule { }
