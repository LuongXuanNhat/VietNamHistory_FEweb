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

  private reloadDetailPageSource = new BehaviorSubject<string>('');
  reloadDetailPage$ = this.reloadDetailPageSource.asObservable();
  triggerReloadDetailPage(postId: string) {
    this.reloadDetailPageSource.next(postId);
  }

  private keywordSource = new BehaviorSubject<string>('');
  currentKeyword = this.keywordSource.asObservable();
  changeKeyword(keyword: string) {
    this.keywordSource.next(keyword);
  }

  // private subId = new BehaviorSubject<string>('');
  // currentSubId = this.subId.asObservable();
  // changeSubId(subId: string) {
  //   this.subId.next(subId);
  // }
  private subId = new BehaviorSubject<string>('');
  currentSubId = this.subId.asObservable();
  public isRequestInProgress = false;

  changeSubId(subId: string) {
    if (!this.isRequestInProgress) {
      this.isRequestInProgress = true;

      this.subId.next(subId);
      this.isRequestInProgress = false;
    }
  }

  private idQuestion = new BehaviorSubject<string>('');
  currentIdQuestion = this.idQuestion.asObservable();
  changeIdQuestion(id: string) {
    this.idQuestion.next(id);
  }
}
