import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommercialRoutingModule } from './commercial-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommercialService } from './services/commercial.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ManageSubCommercialComponent } from './manage-sub-commercial/manage-sub-commercial.component';
import { ManageCommercialComponent } from './manage-commercial/manage-commercial.component';

@NgModule({
  declarations: [ManageSubCommercialComponent,ManageCommercialComponent],
  imports: [
    CommonModule,
    CommercialRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,

  ],
  providers: [CommercialService, MessageService , ConfirmationService]
})
export class CommercialModule { }
