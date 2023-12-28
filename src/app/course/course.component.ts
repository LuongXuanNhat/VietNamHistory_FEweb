import { Component , Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountdownService } from '../service/countdown-service.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CourseComponent implements OnInit, OnDestroy{
  countdownSubscription!: Subscription;
  countdownValue: string = '';

  constructor(private countdownService: CountdownService) {}

  ngOnInit(): void {
    this.startInterval();
  }
  startInterval() {
    setInterval(() => {
      this.countdownValue = window.countdownService.getCountdownState();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }
}
