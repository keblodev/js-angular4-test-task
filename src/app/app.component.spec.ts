import { TestBed, async } from '@angular/core/testing';
import {
    RouterTestingModule
} from '@angular/router/testing';

import { RouterModule, Router } from '@angular/router';
import { routes } from './app.routes';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MessageComponent } from './message/message.component';
import { MessageDialogComponent } from './message/message-dialog/message-dialog.component';

//dynamic components
import { NameAutocompleteComponent } from './message/message-configurators/name-autocomplete/name-autocomplete.component';
import { DatepickerComponent } from './message/message-configurators/datepicker/datepicker.component';
import { GiftpickerComponent } from './message/message-configurators/giftpicker/giftpicker.component';

import { DatepickerModule } from 'angular2-material-datepicker'

import { DynamicComponentComponent } from './dynamic-component/dynamic-component.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialRootModule } from '@angular/material';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        MessageComponent,
        NameAutocompleteComponent,
        DatepickerComponent,
        GiftpickerComponent,
        MessageDialogComponent,
        DynamicComponentComponent
      ],
      providers: [
         { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }
      ],
      imports: [
        MaterialRootModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes),
        DatepickerModule
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'AppComponent!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('AppComponent');
  }));
});
