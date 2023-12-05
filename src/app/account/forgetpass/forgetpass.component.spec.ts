import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetpassComponent } from './forgetpass.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef } from '@angular/material/dialog';

describe('ForgetpassComponent', () => {
  let component: ForgetpassComponent;
  let fixture: ComponentFixture<ForgetpassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ForgetpassComponent],
      providers:[AuthService, MatDialogRef]
    });
    fixture = TestBed.createComponent(ForgetpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
