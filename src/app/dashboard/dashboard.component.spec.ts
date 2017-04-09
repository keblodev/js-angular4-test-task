import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Observable, BehaviorSubject } from 'rxjs';
import {
    RouterTestingModule
} from '@angular/router/testing';
import { HttpModule, ConnectionBackend, Http, BaseRequestOptions, XHRBackend, ResponseOptions, Response } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import {MdDialog, MdDialogModule, MdDialogRef, OverlayRef, MdDialogContainer} from "@angular/material";

import { Component, OnInit } from '@angular/core';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Router } from '@angular/router';
import { routes } from '../app.routes';

import { NgModule } from '@angular/core';

import { ApiService } from '../service/api.service';
import { RemoteValuesStoreService } from '../service/remote-values-store.service';

import { MessageModel } from '../models/message-models';

import { DashboardComponent } from './dashboard.component';
import { MessageComponent } from '../message/message.component';

import { RemoteStateService } from '../service/remote-state.service';

import { MaterialRootModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-dialog-component',
  template: `<div></div>`
})
class MessageDialogComponent {}

const mockMessageQueResponse: Array<MessageModel> = 
        [{
            messageId:    "someMsgId1",
            isProcessed:  false,
            messageType:  "personBdType",
            recipientName:"someMsgName1",              
            template:     "Mate1, Happy Birthday. \n To celebrate this once a year occasion we have picked the following gift: [gift]. Enjoy."
        }]

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  //mocking a dialogRef for when we open our message dialog
  let mockDialogRef = new MdDialogRef(
    new OverlayRef(null,null,null,null),
    new MdDialogContainer(null, null, null, null));
  mockDialogRef.componentInstance = new MessageDialogComponent();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DashboardComponent,        
        MessageComponent,
        MessageDialogComponent
        ],
      providers: [
        RemoteStateService,
        RemoteValuesStoreService,
        ApiService,          
         { provide: XHRBackend, useClass: MockBackend }         
      ],
      imports: [
        HttpModule,
        MaterialRootModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ]    
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    spyOn(component.dialog, 'open').and.returnValue(mockDialogRef);

    fixture.detectChanges();
  });

  afterAll(() => {
    
  })

  it('should create', () => {
    expect(component).toBeTruthy();    
  });

  it('should update the message collection', 
    inject([RemoteStateService, XHRBackend],(remoteStateService: RemoteStateService, mockBackend)  => {      

      let kbsub = mockBackend.connections

      kbsub.subscribe((connection) => {
        connection.mockRespond(
          new Response(
              new ResponseOptions({
                body: JSON.stringify(mockMessageQueResponse)
              })
          ))
        })      

      remoteStateService.evaluateWorkspaceInfo()        
      
      remoteStateService.MessageQue.subscribe( x => {
          expect(component.messageQue[0].messageId).toEqual(mockMessageQueResponse[0].messageId);    
          kbsub.unsubscribe();
        }
      )             
  })); 

  it('should open a dialog', () => {
    component.messageQue = mockMessageQueResponse;
    component.openDialog("someMsgId1");
    expect(component.dialog.open).toHaveBeenCalled();
  }) 
});
