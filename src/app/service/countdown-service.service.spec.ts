import { TestBed } from '@angular/core/testing';

import { CountdownServiceService } from './countdown-service.service';

describe('CountdownServiceService', () => {
  let service: CountdownServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountdownServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
