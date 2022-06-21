import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleColisRoutingModule } from './module-colis-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ColisService } from './services/colis.service';
import { MapService } from './services/map.service';
import { AddColisComponent } from './add-colis/add-colis.component';
import { ListerColisComponent } from './lister-colis/lister-colis.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { DirectionsMapDirective } from './directives/directions-map.directive';
import { MapCardComponent } from './map-card/map-card.component';
import { DetailColisComponent } from './detail-colis/detail-colis.component';
import { NgbActiveModal, NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectColisModalComponent } from './components/modals/select-colis-modal/select-colis-modal.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPrimeNgModule } from '../primeng/shared-prime-ng/shared-prime-ng.module';
import { LivreurService } from './services/livreur.service';
import { DistanceComponent } from './distance/distance.component';
import { OptimizedRoutesDirective } from './directives/optimized-routes.directive';
import { RoutingMapComponent } from './routing-map/routing-map.component';


@NgModule({
  declarations: [
    AddColisComponent,
    ListerColisComponent,
    DirectionsMapDirective, 
    MapCardComponent,
    DetailColisComponent,
    SelectColisModalComponent,
    DistanceComponent,
    OptimizedRoutesDirective,
    RoutingMapComponent,
  ],
  imports: [
    CommonModule,
    ModuleColisRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedPrimeNgModule,
    AgmCoreModule,
    NgbCarouselModule,
    SharedModule
  ],
  exports:[
    SelectColisModalComponent,
    ListerColisComponent
  ],
  providers: [
    ColisService,
    LivreurService,  
    MapService, 
    GoogleMapsAPIWrapper,
    NgbActiveModal
  ],

  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ModuleColisModule { }
