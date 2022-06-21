import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/layout/navbar/navbar.component';
import { SidebarComponent } from './shared/layout/sidebar/sidebar.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { ModuleAuthModule } from './module-auth/module-auth.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModuleLivreurModule } from './module-livreur/module-livreur.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ModuleCommercialModule } from './module-commercial/module-commercial.module';
import { ModuleColisModule } from './module-colis/module-colis.module';
import { ModuleMessagingModule } from './module-messaging/module-messaging.module';
import { AgmCoreModule } from '@agm/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NgxSpinnerModule } from "ngx-spinner";
import { HomeComponent } from './shared/layout/home/home.component';


registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModuleAuthModule,
    ModuleLivreurModule,
    SharedModule,
    ModuleCommercialModule,
    ModuleColisModule,
    ModuleMessagingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDi4EE5gzhlkVgdkTefE-irT7AivylpaGo'
    }),
    NgxSpinnerModule,
    
  ],
  exports: [],
  bootstrap: [AppComponent],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
