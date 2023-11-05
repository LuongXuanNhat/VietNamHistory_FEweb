import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private emailSubject = new BehaviorSubject<string>(''); // Giá trị mặc định là rỗng
  email$ = this.emailSubject.asObservable();

  constructor() { }

  getName(){
    return sessionStorage.getItem('name');
  }
  getToken(){
    return sessionStorage.getItem('access_token');
  }
  getEmail(){
    return sessionStorage.getItem('email');
  }
  getRole(){
    return sessionStorage.getItem('role');
  }
  getAvatar(){
    return sessionStorage.getItem('avatar');
  }

  setName(name: string) {
    sessionStorage.setItem('name', name);
  }
  setToken(token: string) {
    sessionStorage.setItem('access_token', token);
  }
  setEmail(email: string) {
    sessionStorage.setItem('email', email);
    this.emailSubject.next(email);
  }
  setRole(role: string) {
    sessionStorage.setItem('role', role);
  }
  setAvatar(avatar: string) {
    sessionStorage.setItem('avatar', avatar);
  }

  removeToken() {
    sessionStorage.removeItem('access_token');
  }
  removeName() {
    sessionStorage.removeItem('name');
  }
  removeEmail() {
    sessionStorage.removeItem('email');
  }
  removeAvatar() {
    sessionStorage.removeItem('avatar');
  }
  removeRole() {
    sessionStorage.removeItem('role');
  }
}
