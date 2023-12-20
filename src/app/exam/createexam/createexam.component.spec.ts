import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateexamComponent } from './createexam.component';

describe('CreateexamComponent', () => {
  let component: CreateexamComponent;
  let fixture: ComponentFixture<CreateexamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateexamComponent]
    });
    fixture = TestBed.createComponent(CreateexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
