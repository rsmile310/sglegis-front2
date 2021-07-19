import { TestBed, inject } from '@angular/core/testing';

import { AUTHService } from './auth.service';

describe('AUTHService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AUTHService]
    });
  });

  it('should be created', inject([AUTHService], (service: AUTHService) => {
    expect(service).toBeTruthy();
  }));
});
