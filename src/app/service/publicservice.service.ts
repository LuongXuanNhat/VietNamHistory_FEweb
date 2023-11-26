import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommentPostDto } from '../ObjectClass/object';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PublicserviceService {

  constructor(private http: HttpClient, private datePipe: DatePipe ,private authservice: AuthService) { }
  url = "http://localhost:4200/VietNamHistory_FEweb";
  apiurl = this.authservice.getApiUrl();
  
  CreatePost(data: FormData){
    return this.http.post(this.apiurl + '/Post', data);
  }
  CreatePostComment(data: CommentPostDto){
    return this.http.post(this.apiurl + '/Post/Chat', data);
  }
  getChatSignRl(): string{
    return this.apiurl + '/commentHub';
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
  GetMyPost(){
    return this.http.get(this.apiurl + '/Post/MyPost');
  }
  GetMyPostSaved(){
    return this.http.get(this.apiurl + '/Post/MyPostSaved');
  }
  getpostbytag(tag: string){
    return this.http.get(this.apiurl + '/Post/FindByTag?tag=' + tag);
  }
  GetPostDetail(postId: string){
    return this.http.get(this.apiurl + '/Post/' + postId);
  }
  GetTopTags(number: number){
    return this.http.get(this.apiurl + '/HashTag/TopTag?numberTag=' + number);
  }
  getUrl(): string{
    return this.url;
  }
  GetAllTag(){
    return this.http.get(this.apiurl + '/HashTag');
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
  getPostComment(postId: any){
    return this.http.get(this.apiurl + '/Post/Chat?PostId=' + postId);
  }
  getReport(){
    return this.http.get(this.apiurl + '/Report');
  }
  LikeOrUnlike(data: FormData): Observable<any>{
    return this.http.post(`${this.apiurl}/Post/Like`, data);
  }
  postSearch(keyWord: string){
    keyWord = encodeURIComponent(keyWord);
    return this.http.get(this.apiurl + '/Post/Search?keyWord=' + keyWord);
  }
  ReportPost(data: any){
    return this.http.post(`${this.apiurl}/Post/Report`, data);
  }
  SaveOrUnSave(data: FormData): Observable<any>{
    return this.http.post(`${this.apiurl}/Post/Save`, data);
  }
  UpdatePost(data: FormData){
    return this.http.put(this.apiurl + '/Post', data);
  }
  UpdatePostComment(data: CommentPostDto){
    return this.http.put(this.apiurl + '/Post/Chat', data);
  }
  deleteComment(id: string){
    return this.http.delete(this.apiurl + '/Post/Chat?idComment=' + id);
  }
  getRandomPost(quantity: number){
    return this.http.get(this.apiurl + '/Post/RandomArticle?quantity=' + quantity);
  }
  
}
