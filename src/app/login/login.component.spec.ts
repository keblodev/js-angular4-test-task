import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, BehaviorSubject } from 'rxjs';

import { LoginComponent } from './login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialRootModule } from '@angular/material';

import { RouterModule, Router } from '@angular/router';
import { RemoteStateService } from '../service/remote-state.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        MaterialRootModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [
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
              return new BehaviorSubject<any>(false);
            }

            loginUser(): Observable<any> {
              return Observable.fromPromise(new Promise( resolve => resolve({
                authToken: "someToken",
                userId: "someUserId"
              })))
            }
          } 
        }      
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    spyOn(component.remoteState, 'loginUser').and.returnValue(Observable.fromPromise(new Promise( resolve => resolve({
                authToken: "someToken",
                userId: "someUserId"
              }))));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', () => {
    component.login({
      login: 'someLogin',
      password: 'somePassword'
    }, true);
      expect(component.remoteState.loginUser).toHaveBeenCalled();
  })
});
