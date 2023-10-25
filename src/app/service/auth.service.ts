import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient ) { }
  apiurl = 'https://localhost:7138';
  GetAll(){
    return this.http.get(this.apiurl);
  }

  GetAllRole(){
    return this.http.get('http://localhost:3000/role');
  }

  GetByCode(inputdata: any){
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

  GetUserRole(){
    return sessionStorage.getItem('userrole')!=null?sessionStorage.getItem('userrole')?.toString():'';
  }
  LogOut(){
    return 
  }
}

