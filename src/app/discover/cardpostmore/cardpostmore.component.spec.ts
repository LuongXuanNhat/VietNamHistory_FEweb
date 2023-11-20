import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardpostmoreComponent } from './cardpostmore.component';

describe('CardpostmoreComponent', () => {
  let component: CardpostmoreComponent;
  let fixture: ComponentFixture<CardpostmoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardpostmoreComponent]
    });
    fixture = TestBed.createComponent(CardpostmoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
