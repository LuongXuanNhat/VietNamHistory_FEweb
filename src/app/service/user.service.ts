import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient ) { }
  apiurl = 'https://localhost:7138';

  GetImage(){
    return this.http.get(this.apiurl + '/user/image', { responseType: 'text' });
  }

  UpdateAvatar(formData: any){
    return this.http.post(this.apiurl + '/user/image' , formData, { responseType: 'text' });
  }

  
}
