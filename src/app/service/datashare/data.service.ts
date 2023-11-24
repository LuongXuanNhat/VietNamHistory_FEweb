import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private postDataSubject = new BehaviorSubject<any>(null);

  setPostData(postData: any) {
    this.postDataSubject.next(postData);
  }

  getPostData() {
    return this.postDataSubject.asObservable();
  }

  private reloadDetailPageSource = new BehaviorSubject<string | null>(null);
  reloadDetailPage$ = this.reloadDetailPageSource.asObservable();

  triggerReloadDetailPage(postId: string) {
    this.reloadDetailPageSource.next(postId);
  }

  private keywordSource = new BehaviorSubject<string>('');
  currentKeyword = this.keywordSource.asObservable();
  changeKeyword(keyword: string) {
    this.keywordSource.next(keyword);
  }

  private PostOfUserId = new BehaviorSubject<string>('');
  currentPostOfUserId = this.PostOfUserId.asObservable();
  changePostOfUserId(userId: string) {
    this.PostOfUserId.next(userId);
  }

  private subId = new BehaviorSubject<string>('');
  currentSubId = this.subId.asObservable();
  changeSubId(subId: string) {
    this.subId.next(subId);
  }
}
