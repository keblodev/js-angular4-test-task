import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { RouterTestingModule } from '@angular/router/testing';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';

import { MessageComponent } from './message.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialRootModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-mock-component',
  template: ``,
})
class TestMockComponent {}

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        MessageComponent,
        TestMockComponent
      ],
      imports: [
        MaterialRootModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes(
           [{path: '', component: TestMockComponent}]
        )
      ]      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);

    component = fixture.componentInstance;
    component.message = {
        messageId:      "someId",
        isProcessed:    false,
        messageType:    "type",
        recipientName:  "name",              
        template:       "template"    
      }
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
