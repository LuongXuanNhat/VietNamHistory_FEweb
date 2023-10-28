import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroduceComponent } from './introduce.component';

describe('IntroduceComponent', () => {
  let component: IntroduceComponent;
  let fixture: ComponentFixture<IntroduceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntroduceComponent]
    });
    fixture = TestBed.createComponent(IntroduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
