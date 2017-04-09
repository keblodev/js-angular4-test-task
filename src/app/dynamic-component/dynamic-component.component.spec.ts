import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule } from '@angular/core';

//dynamic components
import { NameAutocompleteComponent } from '../message/message-configurators/name-autocomplete/name-autocomplete.component';
import { DatepickerComponent } from '../message/message-configurators/datepicker/datepicker.component';
import { GiftpickerComponent } from '../message/message-configurators/giftpicker/giftpicker.component';

import { DatepickerModule } from 'angular2-material-datepicker'

import { DynamicComponentComponent } from './dynamic-component.component';

import { MaterialRootModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('DynamicComponentComponent', () => {
  let component: DynamicComponentComponent;
  let fixture: ComponentFixture<DynamicComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DynamicComponentComponent,
        NameAutocompleteComponent,
        DatepickerComponent,
        GiftpickerComponent
      ],
      imports: [
          MaterialRootModule,
          FormsModule, ReactiveFormsModule,
          DatepickerModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicComponentComponent);
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
