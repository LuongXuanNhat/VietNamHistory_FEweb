import { TestBed } from '@angular/core/testing';

import { ConfirmemailService } from './confirmemail.service';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

describe('ConfirmemailService', () => {
  let service: ConfirmemailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthService, HttpClient, ],
      declarations: [ConfirmemailService]
    });
    service = TestBed.inject(ConfirmemailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
