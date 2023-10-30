import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateuserinforComponent } from './updateuserinfor.component';

describe('UpdateuserinforComponent', () => {
  let component: UpdateuserinforComponent;
  let fixture: ComponentFixture<UpdateuserinforComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateuserinforComponent]
    });
    fixture = TestBed.createComponent(UpdateuserinforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
