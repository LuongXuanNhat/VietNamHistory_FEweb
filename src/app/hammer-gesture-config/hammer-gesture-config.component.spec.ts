import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HammerGestureConfigComponent } from './hammer-gesture-config.component';

describe('HammerGestureConfigComponent', () => {
  let component: HammerGestureConfigComponent;
  let fixture: ComponentFixture<HammerGestureConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HammerGestureConfigComponent]
    });
    fixture = TestBed.createComponent(HammerGestureConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
