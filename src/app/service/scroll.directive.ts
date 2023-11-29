// scroll.directive.ts
import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // Kiểm tra điều kiện để đặt vị trí của thẻ menu
    if (scrollPosition > 100) { // Thay 100 bằng ngưỡng bạn muốn
      this.renderer.setStyle(this.el.nativeElement, 'position', 'fixed');
      this.renderer.setStyle(this.el.nativeElement, 'top', '0');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'position');
      this.renderer.removeStyle(this.el.nativeElement, 'top');
    }
  }
}
