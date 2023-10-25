import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlisttingComponent } from './userlistting.component';

describe('UserlisttingComponent', () => {
  let component: UserlisttingComponent;
  let fixture: ComponentFixture<UserlisttingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserlisttingComponent]
    });
    fixture = TestBed.createComponent(UserlisttingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
