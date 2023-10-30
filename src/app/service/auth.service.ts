import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient ) { }
  apiurl = 'https://localhost:7138';

  GetAllRole(){
    return this.http.get('http://localhost:3000/role');
  }

  Login(inputdata: any){
    return this.http.post(this.apiurl + '/Login', inputdata);
  }

  ProceedRegister(inputdata: any){
    return this.http.post(this.apiurl + '/SignUp', inputdata);
  }

  UpdateUser(code: any,inputdata: any){
    return this.http.put('http://localhost:3000/user/' + code, inputdata);
  }

  IsLoggedIn(){
    return sessionStorage.getItem('access_token') != null;
  }

  GetToken(){
    return sessionStorage.getItem('access_token') ?? null;
  }

  GetUserRole(){
    return sessionStorage.getItem('userrole')!=null?sessionStorage.getItem('userrole')?.toString():'';
  }
  LogOut(){
    return this.http.get(this.apiurl + "/Logout");
  }

  ForgetPassword(email: any){
    return this.http.get(this.apiurl + '/ForgetPassword?email=' + email);
  }

  ConfirmCode(email: any){
    return this.http.get(this.apiurl + '/ForgetPassword/ConfirmCode?email=' + email);
  }

  ResetPassword(inputdata: any){
    return this.http.post(this.apiurl + '/ResetPassword', inputdata);
  }
}

