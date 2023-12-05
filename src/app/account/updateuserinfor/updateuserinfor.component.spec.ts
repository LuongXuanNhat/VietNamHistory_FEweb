import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateuserinforComponent } from './updateuserinfor.component';
import { ToastrService } from 'ngx-toastr';
import { InjectionToken } from '@angular/core';

describe('UpdateuserinforComponent', () => {
  let component: UpdateuserinforComponent;
  let fixture: ComponentFixture<UpdateuserinforComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrService, InjectionToken],
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
