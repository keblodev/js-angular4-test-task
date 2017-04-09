import { TestBed, async, inject } from '@angular/core/testing';
import { Observable, BehaviorSubject } from 'rxjs';

import { UserAuthGuard } from './user-auth.guard';

import { RouterModule, Router } from '@angular/router';
import { routes } from '../app.routes';

import { RemoteStateService } from '../service/remote-state.service';

import {
    RouterTestingModule
} from '@angular/router/testing';

describe('UserAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserAuthGuard,
        RouterTestingModule,
        { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } },
        { 
          provide: RemoteStateService, 
          useClass: class {
            get UserQueRemoteStats(): Observable<any> {
              return new BehaviorSubject<any>(false);
            }

            get MessageQue(): Observable<any> {
              return new BehaviorSubject<any>(false);
            }  

            get MessageGifts(): Observable<any> {
              return new BehaviorSubject<any>(false);
            }

            get MessageNames(): Observable<any> {
              return new BehaviorSubject<any>(false);
            }  

            get IsUserLoggedIn(): Observable<any> {
              //faking logged in state here
              return new BehaviorSubject<any>(true);
            }
          } 
        }        
      ]       
    });
  });

  it('should exist', inject([UserAuthGuard], (guard: UserAuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  // haven't added anything additional here
  // cuz at this point the coverage is at 79%
  // *check with: ng test --code-coverage
  // and that's enought to prove the point that I can test with angular

  it ('should return isLoggedInStae', inject([UserAuthGuard], (guard: UserAuthGuard) => {
    (guard.canActivate(null, null) as Observable<boolean>).subscribe( isLoggedInObserverable => {
      expect(isLoggedInObserverable).toBeTruthy();
    })
  }));
});
