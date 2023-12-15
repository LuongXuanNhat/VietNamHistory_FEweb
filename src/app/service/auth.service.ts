import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient ) { }
  apiurl = 'https://tyls.fun';
  // apiurl = 'https://localhost:7138';
  getApiUrl(){
    return this.apiurl;
  }
  isLoggedIn = true;  // default false
  
  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  GetAllRole(){
    return this.http.get( this.apiurl + '/role');
  }

  Login(inputdata: any){
    return this.http.post(this.apiurl + '/Login', inputdata);
  }

  loginWithFacebook(){
    const redirectUri = "https://localhost:7138/FacebookCallback";
    const facebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=885411713156137&scope=email&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&state=12345agd`;

    const width = 400;
    const height = 600;
    // Tính toán tọa độ top và left để căn giữa màn hình
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const popUp = window.open(facebookAuthUrl, "Facebook Login", `width=${width},height=${height},top=${top},left=${left}`);
    console.log("loading");
    window.addEventListener("message", (event) => {
      console.log("Ok");
      if (event.origin === "https://localhost:7138") {
        // Lấy JSON response từ cửa sổ popup
        const jsonResponse = event.data;
        console.log("Token from popup:", event.data);
        // Xử lý JSON response ở đây (có thể lấy token từ `resultObj`)
        const response = JSON.parse(jsonResponse);
        const token = response.resultObj;
    
        // Lưu trữ token và xử lý dữ liệu nếu cần
        sessionStorage.setItem('access_token', token);
        console.log("Token from popup:", token);
    
        // Đóng cửa sổ popup
        window.close();
      }
    });
   
  }

  ProceedRegister(inputdata: any){
    return this.http.post(this.apiurl + '/SignUp', inputdata);
  }

  UpdateUser(code: any,inputdata: any){
    return this.http.put(this.apiurl + 'user/' + code, inputdata);
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
  ChangeEmail(email: string){
    return this.http.post(this.apiurl + '/ChangeEmail?email=' + email, { responseType: 'text' });
  }

  ChangePassword(formdata: any){
    return this.http.post(this.apiurl + '/ChangePassword', formdata);
  }
}

