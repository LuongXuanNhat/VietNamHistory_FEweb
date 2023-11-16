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
  LikeOrUnlike(data: any){
    return this.http.post(this.apiurl + '/Post/Like', data);
  }
  CreatePost(data: FormData){
    return this.http.post(this.apiurl + '/Post', data);
  }
  getLike(data: any): Observable<boolean>{
    return this.http.get(this.apiurl + '/Post/Like', data).pipe(
      map((response: any) => {
        return response.resultObj as boolean;
      })
    );
  }
  GetPostDetail(postId: string){
    return this.http.get(this.apiurl + '/Post/' + postId);
  }
  getCurrentDate(): string {
    const currentDate = new Date();
    return this.datePipe.transform(currentDate, 'dd/MM/yyyy') || '';
  }
  GetTopic(){
    return this.http.get(this.apiurl + "/Topic");
  }
  GetPost(){
    return this.http.get(this.apiurl + '/Post/Discover');
  }
}
