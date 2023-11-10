import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient ) { }
      // apiurl = 'https://vuanhpham25-001-site1.gtempurl.com';
    apiurl = 'https://localhost:7138';

  GetImage(){
    return this.http.get(this.apiurl + '/user/image', { responseType: 'text' });
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
