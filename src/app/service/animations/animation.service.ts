import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  animateButton = (e: Event): void => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    
    //reset animation 
    target.classList.remove('animate');
    
    target.classList.add('animate');
    setTimeout(() => {
      target.classList.remove('animate');
    }, 700);
  };

  attachAnimationListener() {
    const bubblyButtons = document.getElementsByClassName("bubbly-button");

    for (let i = 0; i < bubblyButtons.length; i++) {
      bubblyButtons[i].addEventListener('click', this.animateButton, false);
    }
  }

  // Button custom 2
  animateButton1 = (e: Event): void => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    
    target.classList.remove('animate1');
    
    target.classList.add('animate1');
    setTimeout(() => {
      target.classList.remove('animate1');
    }, 700);
  };

  attachAnimationListener_btn2() {
    const bubblyButtons = document.getElementsByClassName("bubbly-button-1");

    for (let i = 0; i < bubblyButtons.length; i++) {
      bubblyButtons[i].addEventListener('click', this.animateButton1, false);
    }
  }
}
