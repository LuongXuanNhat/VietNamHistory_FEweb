import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { AuthGuard } from './auth.guard';// Import the actual path
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // Adjust the import path based on your actual setup
import { AuthService } from '../auth.service';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
    TestBed.runInInjectionContext(() => {
      const authService = TestBed.inject(AuthService);
      const router = TestBed.inject(Router);
      const toastr = TestBed.inject(ToastrService);
      return new AuthGuard(authService, router, toastr).canActivate(...guardParameters);
    });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, Router, ToastrService],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
