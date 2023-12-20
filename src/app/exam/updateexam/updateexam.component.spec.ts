import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateexamComponent } from './updateexam.component';

describe('UpdateexamComponent', () => {
  let component: UpdateexamComponent;
  let fixture: ComponentFixture<UpdateexamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateexamComponent]
    });
    fixture = TestBed.createComponent(UpdateexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
