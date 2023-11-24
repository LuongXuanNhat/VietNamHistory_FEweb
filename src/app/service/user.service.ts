import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,private authservice: AuthService ) { }
  apiurl = this.authservice.getApiUrl();

  GetImage(){
    return this.http.get(this.apiurl + '/user/image');
  }

  UpdateAvatar(formData: any){
    return this.http.post(this.apiurl + '/user/image' , formData, { responseType: 'text' });
  }

  GetUserDetail(){
    return this.http.get(this.apiurl + '/user');
  }

  UpdateUser(request: any){
    return this.http.put(this.apiurl + '/user', request);
  }
}
