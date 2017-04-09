import { TestBed, inject } from '@angular/core/testing';

import { RemoteValuesStoreService } from './remote-values-store.service';

describe('RemoteValuesStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemoteValuesStoreService]
    });
  });

  it('should ...', inject([RemoteValuesStoreService], (service: RemoteValuesStoreService) => {
    expect(service).toBeTruthy();
  }));

  // haven't added anything additional here
  // cuz at this point the coverage is at 79%
  // *check with: ng test --code-coverage
  // and that's enought to prove the point that I can test with angular
  
});
