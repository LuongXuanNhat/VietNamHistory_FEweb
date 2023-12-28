// countdown.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  private countdownState = new BehaviorSubject<string>('Sắp ra mắt');
  private value = '<time>Sắp ra mắt <span class="material-symbols-outlined">refresh</span></time>';

  updateCountdownState(newState: string): void {
    this.countdownState.next(newState);
    this.value = newState;
  }

  getCountdownState(): string {
    return this.value;
  }
}
