import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerComponent } from './datepicker.component';

import { DatepickerModule } from 'angular2-material-datepicker'

import { Observable, BehaviorSubject } from 'rxjs';
import { RemoteStateService } from '../../../service/remote-state.service';

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerComponent ],
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
        DatepickerModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // havan't added anything additional here
  // cuz at this point the coverage is at 79%
  // *check with: ng test --code-coverage
  // and that's enought to prove the point that I can test with angular
  
});
