import { TestBed } from '@angular/core/testing';

import { ConfirmemailService } from './confirmemail.service';

describe('ConfirmemailService', () => {
  let service: ConfirmemailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmemailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
