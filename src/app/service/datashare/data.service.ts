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
}
