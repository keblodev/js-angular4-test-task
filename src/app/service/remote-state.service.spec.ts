import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { ApiService } from './api.service';
import { RemoteValuesStoreService } from './remote-values-store.service';
import { RemoteStateService } from './remote-state.service';

import { Observable, BehaviorSubject } from 'rxjs';

import { HttpModule, Http, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { UserStatsModel } from '../models/user-models';

const mockedUserStatsReponse = {
      totallMessagesCount: 10,
      toProcessCount: 5,
      processedCount: 5
    }

export class mockApiserviceClass {
  getUserStats(): Observable<UserStatsModel> {
    return new BehaviorSubject<UserStatsModel>(mockedUserStatsReponse);  
  }
  
  getNextMessageCollection(): Observable<any> {  
    return new BehaviorSubject<any>([]);  
  }
  
  getGifts(): Observable<any> {  
    return new BehaviorSubject<any>([]);  
  }
  
  getSpecialGifts(): Observable<any> {
    return new BehaviorSubject<any>([]);  
  }  
  
  getNamesList(): Observable<any> {
    return new BehaviorSubject<any>([]);  
  }

  login(userCredentials) {
    return new BehaviorSubject<any>([]);  
  }

  auth() {    
    return new BehaviorSubject<any>([]);  
  }

  postMessage(message) {
    return new BehaviorSubject<any>([]);  
  }  
}

describe('RemoteStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RemoteStateService,
        { provide: ApiService, useClass: mockApiserviceClass },
        RemoteValuesStoreService,
         { provide: XHRBackend, useClass: MockBackend }         
        ],
        imports: [
          HttpModule
        ]
    });
  });

  it('should ...', inject([RemoteStateService], (service: RemoteStateService) => {
    expect(service).toBeTruthy();
  }));

  it('should pass initial API states', inject([RemoteStateService], (service: RemoteStateService) => {
    service.evaluateWorkspaceInfo();
    service.MessageGifts.subscribe( x => {
      expect(x).toBeFalsy('initial value for gifts must be false');
    });
    service.MessageNames.subscribe( x => {
      expect(x).toBeTruthy();
    });
    service.MessageQue.subscribe( x => {
      expect(x).toBeTruthy();
    });
    service.UserQueRemoteStats.subscribe( x => {
      expect(x).toEqual(mockedUserStatsReponse);
    });
    service.IsUserLoggedIn.subscribe( x => {
      expect(x).toBeFalsy();
    });                
  }));  
});
