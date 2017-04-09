import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialRootModule, MaterialModule } from '@angular/material';

import 'hammerjs';

import { routes } from './app.routes';

import { ApiService } from './service/api.service';
import { RemoteStateService } from './service/remote-state.service';
import { RemoteValuesStoreService } from './service/remote-values-store.service';

import { UserAuthGuard } from './guards/user-auth.guard';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MessageComponent } from './message/message.component';
import { MessageDialogComponent } from './message/message-dialog/message-dialog.component';

import { DatepickerModule } from 'angular2-material-datepicker'

//dynamic components
import { NameAutocompleteComponent } from './message/message-configurators/name-autocomplete/name-autocomplete.component';
import { DatepickerComponent } from './message/message-configurators/datepicker/datepicker.component';
import { GiftpickerComponent } from './message/message-configurators/giftpicker/giftpicker.component';

import { DynamicComponentComponent } from './dynamic-component/dynamic-component.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    MessageComponent,
    NameAutocompleteComponent,
    DatepickerComponent,
    GiftpickerComponent,
    MessageDialogComponent,
    DynamicComponentComponent,    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(
      routes,
      {
        useHash: false
      }),
    // MaterialRootModule,
    MaterialModule.forRoot(),
    BrowserAnimationsModule,
    DatepickerModule
  ],
  exports: [
    MaterialModule
  ],  
  providers: [
    ApiService,
    RemoteStateService,
    UserAuthGuard,
    RemoteValuesStoreService
    ],
  bootstrap: [AppComponent],
  entryComponents: [
    MessageDialogComponent,
    NameAutocompleteComponent,
    DatepickerComponent,
    GiftpickerComponent,    
  ]
})
export class AppModule { }
