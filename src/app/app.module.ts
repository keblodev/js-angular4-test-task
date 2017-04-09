import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { 
  MaterialRootModule,
  MdProgressBar,
  MdSpinner
} from '@angular/material';

import 'hammerjs';

import { routes } from './app.routes';

import { ApiService } from './service/api.service';
import { RemoteStateService } from './service/remote-state.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      routes,
      {
        useHash: false
      }),
    MaterialRootModule,
    BrowserAnimationsModule
  ],
  providers: [
    ApiService,
    RemoteStateService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
