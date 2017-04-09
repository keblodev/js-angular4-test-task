import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Observable, BehaviorSubject } from 'rxjs';
import { RemoteStateService } from '../../../service/remote-state.service';

import { MaterialRootModule, MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NameAutocompleteComponent } from './name-autocomplete.component';

describe('NameAutocompleteComponent', () => {
  let component: NameAutocompleteComponent;
  let fixture: ComponentFixture<NameAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameAutocompleteComponent ],
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
              return new BehaviorSubject<any>([]);
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
    fixture = TestBed.createComponent(NameAutocompleteComponent);
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
