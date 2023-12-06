import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetpassComponent } from './forgetpass.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCommonModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';

describe('ForgetpassComponent', () => {
  let component: ForgetpassComponent;
  let fixture: ComponentFixture<ForgetpassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule, MatIconModule, MatFormFieldModule,
      MatStepperModule, ReactiveFormsModule , MatFormFieldControl],
      declarations: [ForgetpassComponent],
      providers:[AuthService ,{ provide: MatDialogRef, useValue: {} }, ]
    });
    fixture = TestBed.createComponent(ForgetpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
