import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroduceComponent } from './introduce.component';
import { UserService } from 'src/app/service/user.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InjectionToken } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { SessionService } from 'src/app/service/session/session.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('IntroduceComponent', () => {
  let component: IntroduceComponent;
  let fixture: ComponentFixture<IntroduceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot(), MatCardModule, MatIconModule, FormsModule,
      ReactiveFormsModule, ],
      declarations: [IntroduceComponent],
      providers:[UserService, DatePipe, SessionService]
    });
    fixture = TestBed.createComponent(IntroduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
