import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  animateButton = (target: HTMLElement): void => {
    this.renderer.addClass(target, 'animate');
    setTimeout(() => {
      this.renderer.removeClass(target, 'animate');
    }, 1000);
  };

  attachAnimationListener() {
    const bubblyButtons = document.getElementsByClassName("bubbly-button");

    for (let i = 0; i < bubblyButtons.length; i++) {
      bubblyButtons[i].addEventListener('click', (event) => this.animateButton(event.target as HTMLElement), { capture: false });
    }
  }

  animateButton1 = (target: HTMLElement): void => {
    this.renderer.addClass(target, 'animate1');
    setTimeout(() => {
      this.renderer.removeClass(target, 'animate1');
    }, 1000);
  };

  attachAnimationListener_btn2() {
    const bubblyButtons = document.getElementsByClassName("bubbly-button-1");

    for (let i = 0; i < bubblyButtons.length; i++) {
      bubblyButtons[i].addEventListener('click', (event) => this.animateButton1(event.target as HTMLElement), { capture: false });
    }
  }
}
