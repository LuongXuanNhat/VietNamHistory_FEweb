import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateuserinforComponent } from './updateuserinfor.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { InjectionToken } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from 'src/app/service/user.service';
import { SessionService } from 'src/app/service/session/session.service';
import { DatePipe } from '@angular/common';

describe('UpdateuserinforComponent', () => {
  let component: UpdateuserinforComponent;
  let fixture: ComponentFixture<UpdateuserinforComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), HttpClientTestingModule],
      declarations: [UpdateuserinforComponent],
      providers:[UserService, SessionService, DatePipe]
    });
    fixture = TestBed.createComponent(UpdateuserinforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
