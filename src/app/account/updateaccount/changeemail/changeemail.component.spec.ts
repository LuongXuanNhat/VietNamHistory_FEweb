import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeemailComponent } from './changeemail.component';
import { InjectionToken } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SessionService } from 'src/app/service/session/session.service';
import { AuthService } from 'src/app/service/auth.service';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

describe('ChangeemailComponent', () => {
  let component: ChangeemailComponent;
  let fixture: ComponentFixture<ChangeemailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), HttpClientTestingModule, MatIconModule, MatFormFieldModule, 
      FormsModule, MatFormFieldControl],
      declarations: [ChangeemailComponent],
      providers: [SessionService, AuthService, DatePipe]
    });
    fixture = TestBed.createComponent(ChangeemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
