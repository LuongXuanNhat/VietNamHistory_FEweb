import { TestBed } from '@angular/core/testing';

import { ConfirmemailService } from './confirmemail.service';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ConfirmemailService', () => {
  let service: ConfirmemailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ],
      providers: [ AuthService, ConfirmemailService]
    });
    service = TestBed.inject(ConfirmemailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
