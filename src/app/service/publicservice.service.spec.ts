import { TestBed } from '@angular/core/testing';

import { PublicserviceService } from './publicservice.service';

describe('PublicserviceService', () => {
  let service: PublicserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
