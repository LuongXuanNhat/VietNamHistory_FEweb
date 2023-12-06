import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportpostComponent } from './reportpost.component';
import { InjectionToken } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SessionService } from 'src/app/service/session/session.service';
import { MatRadioModule } from '@angular/material/radio';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

describe('ReportpostComponent', () => {
  let component: ReportpostComponent;
  let fixture: ComponentFixture<ReportpostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, ToastrModule.forRoot(), MatRadioModule, ReactiveFormsModule],
      declarations: [ReportpostComponent],
      providers:[PublicserviceService ,{ provide: MatDialogRef, useValue: {} }, 
        { provide: MAT_DIALOG_DATA, useValue: {} }, SessionService, DatePipe, ]
    });
    fixture = TestBed.createComponent(ReportpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
