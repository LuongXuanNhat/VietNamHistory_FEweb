import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyquestionsavedComponent } from './myquestionsaved.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { InjectionToken } from '@angular/core';

describe('MyquestionsavedComponent', () => {
  let component: MyquestionsavedComponent;
  let fixture: ComponentFixture<MyquestionsavedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot, InjectionToken],
      declarations: [MyquestionsavedComponent],
      providers: [ToastrService]
    });
    fixture = TestBed.createComponent(MyquestionsavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
