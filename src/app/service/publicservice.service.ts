import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicserviceService {

  constructor(private http: HttpClient ) { }
  //  apiurl = 'http://vuanhpham25-001-site1.gtempurl.com';
  apiurl = 'https://localhost:7138';

  GetTopic(){
    return this.http.get(this.apiurl + "/Topic");
  }
}
