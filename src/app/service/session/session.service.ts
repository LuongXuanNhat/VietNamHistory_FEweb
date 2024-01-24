import { I } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private emailSubject = new BehaviorSubject<string>('');
  email$ = this.emailSubject.asObservable();
  private descriptionUserSubject = new BehaviorSubject<string>('');
  descriptionUser$ = this.descriptionUserSubject.asObservable();

  constructor(private jwtHelper: JwtHelperService) {}

  getKeyWordDocument(): string | null {
    return sessionStorage.getItem('keyword_document');
  }
  getName() {
    return sessionStorage.getItem('name');
  }
  getToken() {
    return sessionStorage.getItem('access_token') ?? '';
  }
  decode() {
    return this.jwtHelper.decodeToken(this.getToken());
  }
  getEmail() {
    if (this.getToken())
      return (
        this.decode()[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
        ] ?? ''
      );
    return '';
  }
  getRole() {
    if (this.getToken())
      return (
        this.decode()[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ] ?? ''
      );
    return '';
  }
  getUserName() {
    if (this.getToken())
      return (
        this.decode()[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'
        ] ?? ''
      );
    return '';
  }
  getUserId() {
    if (this.getToken())
      return (
        this.decode()[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ] ?? ''
      );
    return '';
  }
  getAvatar() {
    return sessionStorage.getItem('avatar');
  }
  getDescriptionUser() {
    return sessionStorage.getItem('descriptionuser');
  }
  setKeyWordDocument(keyWord: string) {
    sessionStorage.setItem('keyword_document', keyWord);
  }
  setToken(token: string) {
    sessionStorage.setItem('access_token', token);
  }
  setAvatar(avatar: string) {
    sessionStorage.setItem('avatar', avatar);
  }
  setDescriptionUser(descriptionUser: string) {
    sessionStorage.setItem('description_user', descriptionUser);
    this.descriptionUserSubject.next(descriptionUser);
  }

  removeToken() {
    sessionStorage.removeItem('access_token');
  }
  removeAvatar() {
    sessionStorage.removeItem('avatar');
  }

  clearSessionStorage() {
    sessionStorage.clear();
  }
}
