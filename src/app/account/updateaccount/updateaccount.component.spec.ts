import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateaccountComponent } from './updateaccount.component';

describe('UpdateaccountComponent', () => {
  let component: UpdateaccountComponent;
  let fixture: ComponentFixture<UpdateaccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateaccountComponent]
    });
    fixture = TestBed.createComponent(UpdateaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
