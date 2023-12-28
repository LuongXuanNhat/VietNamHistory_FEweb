import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { PermissionGuard } from './permission.guard';
import { SessionService } from '../session/session.service';

describe('PermissionGuard', () => {
  let guard: PermissionGuard;
  let sessionServiceSpy: jasmine.SpyObj<SessionService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    const spySessionService = jasmine.createSpyObj('SessionService', ['getRole']);
    const spyToastrService = jasmine.createSpyObj('ToastrService', ['info']);

    TestBed.configureTestingModule({
      providers: [
        PermissionGuard,
        { provide: SessionService, useValue: spySessionService },
        { provide: ToastrService, useValue: spyToastrService }
      ]
    });

    guard = TestBed.inject(PermissionGuard);
    sessionServiceSpy = TestBed.inject(SessionService) as jasmine.SpyObj<SessionService>;
    toastrServiceSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // it('should return true if the role matches', () => {
  //   sessionServiceSpy.getRole.and.returnValue('admin');
  //   const canActivate = guard.canActivate(null, null);
  //   expect(canActivate).toBe(true);
  // });

  // it('should return false and show a toastr message if the role does not match', () => {
  //   sessionServiceSpy.getRole.and.returnValue('user');
  //   const canActivate = guard.canActivate(null, null);
  //   expect(canActivate).toBe(false);
  //   expect(toastrServiceSpy.info).toHaveBeenCalledWith('Bạn không có quyền truy cập');
  // });
});
