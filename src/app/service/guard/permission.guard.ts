import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SessionService } from '../session/session.service';
import { ToastrService } from 'ngx-toastr';
import { Constant } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard {
  constructor(private sessionService: SessionService, private toastr: ToastrService) {}

  canActivate: CanActivateFn = (route, state) => {
    const requiredRole = this.sessionService.getRole();

    if (requiredRole && requiredRole === Constant.adminRole) {
      return true;
    } else {
      this.toastr.info("Bạn không có quyền truy cập");
      return false;
    }
  };
}