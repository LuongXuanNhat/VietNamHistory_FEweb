import { I } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  
  private emailSubject = new BehaviorSubject<string>(''); 
  email$ = this.emailSubject.asObservable();
  private descriptionUserSubject = new BehaviorSubject<string>(''); 
  descriptionUser$ = this.descriptionUserSubject.asObservable();

  constructor() { }

  getKeyWordDocument(): string | null {
    return sessionStorage.getItem('keyword_document');
  }
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
  getUserId(){
    return sessionStorage.getItem('id');
  }
  getAvatar(){
    return sessionStorage.getItem('avatar');
  }
  getDescriptionUser(){
    return sessionStorage.getItem('descriptionuser');
  }
  setKeyWordDocument(keyWord: string) {
    sessionStorage.setItem('keyword_document', keyWord);
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
  setUserId(id: string){
    sessionStorage.setItem('id', id);
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


  clearSessionStorage() {
    sessionStorage.clear();
  }
}
