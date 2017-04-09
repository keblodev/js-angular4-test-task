import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { MessageDialogComponent } from './message-dialog.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialRootModule, MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Router } from '@angular/router';
import { RemoteStateService } from '../../service/remote-state.service';

//dynamic components
import { NameAutocompleteComponent } from '../message-configurators/name-autocomplete/name-autocomplete.component';
import { DatepickerComponent } from '../message-configurators/datepicker/datepicker.component';
import { GiftpickerComponent } from '../message-configurators/giftpicker/giftpicker.component';

import { DatepickerModule } from 'angular2-material-datepicker'

import { DynamicComponentComponent } from '../../dynamic-component/dynamic-component.component';

class MdDialogTestRefClass<T> {}

describe('MessageDialogComponent', () => {
  let component: MessageDialogComponent;
  let fixture: ComponentFixture<MessageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        MessageDialogComponent,        
        DynamicComponentComponent,
        NameAutocompleteComponent,
        DatepickerComponent,
        GiftpickerComponent
      ],
      imports: [
        DatepickerModule,
        MaterialRootModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule                   
      ],
      providers: [
        { provide: MD_DIALOG_DATA, useValue: {
            associatedComponents: [
              'NameAutocompleteComponent',  
              'GiftpickerComponent',        
              'DatepickerComponent'
            ],
            template: 'some template'
          } 
        },
        { provide: MdDialogRef, useClass: MdDialogTestRefClass}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // haven't added anything additional here
  // cuz at this point the coverage is at 79%
  // *check with: ng test --code-coverage
  // and that's enought to prove the point that I can test with angular

});
