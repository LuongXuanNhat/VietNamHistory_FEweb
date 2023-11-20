import { Injectable, ElementRef, OnInit } from '@angular/core';
import * as Hammer from 'hammerjs';

@Injectable()
export class HammerGestureConfigComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const hammer = new Hammer(this.el.nativeElement);

    hammer.on('pan', (event) => {
      // Xử lý sự kiện pinch (di chuyển 2 ngón)
      console.log('Đã được:', event);
    });
  }
}
