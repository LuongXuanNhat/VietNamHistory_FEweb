import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicserviceService {

  constructor(private http: HttpClient, private datePipe: DatePipe ) { }
  // apiurl = 'https://vuanhpham25-001-site1.gtempurl.com';
  apiurl = 'https://localhost:7138';
  
  CreatePost(data: FormData){
    return this.http.post(this.apiurl + '/Post', data);
  }
  getCurrentDate(): string {
    const currentDate = new Date();
    return this.datePipe.transform(currentDate, 'dd/MM/yyyy') || '';
  }
  getLike(postId: string, userId: string) {
    const params = {
        PostId: postId,
        UserId: userId
    };
    return this.http.get(`${this.apiurl}/Post/Like`, { params });
  }
  getpostbytag(tag: string){
    return this.http.get(this.apiurl + '/Post/FindByTag?tag=' + tag);
  }
  GetPostDetail(postId: string){
    return this.http.get(this.apiurl + '/Post/' + postId);
  }
  GetTags(number: number){
    return this.http.get(this.apiurl + '/Post/TopTag?numberTag=' + number);
  }
  getSave(postId: string, userId: string) {
    const params = {
        PostId: postId,
        UserId: userId
    };
    return this.http.get(`${this.apiurl}/Post/Save`, { params });
  }
  GetTopic(){
    return this.http.get(this.apiurl + "/Topic");
  }
  GetPost(){
    return this.http.get(this.apiurl + '/Post/Discover');
  }
  getReport(){
    return this.http.get(this.apiurl + '/Report');
  }
  LikeOrUnlike(data: FormData): Observable<any>{
    return this.http.post(`${this.apiurl}/Post/Like`, data);
  }
  ReportPost(data: any){
    return this.http.post(`${this.apiurl}/Post/Report`, data);
  }
  SaveOrUnSave(data: FormData): Observable<any>{
    return this.http.post(`${this.apiurl}/Post/Save`, data);
  }
}
