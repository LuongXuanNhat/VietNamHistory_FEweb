import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Kiểm tra nếu yêu cầu không cần token (ví dụ: đăng ký, đăng nhập, hoặc các yêu cầu không cần xác thực).
    if (req.url.includes('/public') || req.url.includes('/login')) {
      return next.handle(req); // Không thêm token, chuyển yêu cầu không đổi.
    }

    // Lấy token từ nơi bạn đã lưu trữ nó, chẳng hạn trong localStorage hoặc cookies.
    const token = sessionStorage.getItem('access_token');

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req);
  }
}
