import { TestBed, inject } from '@angular/core/testing';

import { FileServiceService } from './file-service.service';

describe('FileServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileServiceService]
    });
  });

  it('should be created', inject([FileServiceService], (service: FileServiceService) => {
    expect(service).toBeTruthy();
  }));
});
