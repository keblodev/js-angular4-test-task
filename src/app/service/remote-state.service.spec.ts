import { TestBed, inject } from '@angular/core/testing';

import { RemoteStateService } from './remote-state.service';

describe('RemoteStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemoteStateService]
    });
  });

  it('should ...', inject([RemoteStateService], (service: RemoteStateService) => {
    expect(service).toBeTruthy();
  }));
});
