import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Observable, BehaviorSubject } from 'rxjs';
import { RemoteStateService } from '../../../service/remote-state.service';

import { MaterialRootModule, MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GiftpickerComponent } from './giftpicker.component';

describe('GiftpickerComponent', () => {
  let component: GiftpickerComponent;
  let fixture: ComponentFixture<GiftpickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftpickerComponent ],
      providers: [
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
          } 
        },
        {
          provide: 'dynamicComponentObservable',
          useValue: new Observable<any>()
        },
        {
          provide: 'associatedComponentConfiguration',
          useValue: new Observable<any>()
        }                      
      ],
      imports: [
          MaterialRootModule,
          MaterialModule,
          NoopAnimationsModule,
          FormsModule,
          ReactiveFormsModule, 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftpickerComponent);
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
