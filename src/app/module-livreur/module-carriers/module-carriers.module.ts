import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleCarriersRoutingModule } from './module-carriers-routing.module';
import { CarriersService } from './services/carriers.service';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { ManageFreightsComponent } from './manage-freights/manage-freights.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedPrimeNgModule } from 'src/app/primeng/shared-prime-ng/shared-prime-ng.module';
import { CarriersStatisticsComponent } from './carriers-statistics/carriers-statistics.component';

@NgModule({
  declarations: [ManageFreightsComponent, CarriersStatisticsComponent],
  imports: [
    CommonModule,
    ModuleCarriersRoutingModule,
    FormsModule,
    SharedPrimeNgModule,
    SharedModule
  ],
  providers: [CarriersService, MessageService, ConfirmationService]
})
export class ModuleCarriersModule { }
