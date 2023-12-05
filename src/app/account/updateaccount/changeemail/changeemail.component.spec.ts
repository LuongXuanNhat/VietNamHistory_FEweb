import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeemailComponent } from './changeemail.component';
import { InjectionToken } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('ChangeemailComponent', () => {
  let component: ChangeemailComponent;
  let fixture: ComponentFixture<ChangeemailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot, InjectionToken],
      declarations: [ChangeemailComponent],
      providers: [InjectionToken]
    });
    fixture = TestBed.createComponent(ChangeemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
