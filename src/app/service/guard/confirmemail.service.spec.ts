import { TestBed } from '@angular/core/testing';

import { ConfirmemailService } from './confirmemail.service';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

describe('ConfirmemailService', () => {
  let service: ConfirmemailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot(), ActivatedRoute],
      providers: [ AuthService, ]
    });
    service = TestBed.inject(ConfirmemailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
