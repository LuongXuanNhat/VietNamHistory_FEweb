import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionReportComponent } from './questionreport.component';
import { InjectionToken } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { SessionService } from 'src/app/service/session/session.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { PublicserviceService } from 'src/app/service/publicservice.service';

describe('QuestionreportComponent', () => {
  let component: QuestionReportComponent;
  let fixture: ComponentFixture<QuestionReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      declarations: [QuestionReportComponent],
      providers: [SessionService ,{ provide: MatDialogRef, useValue: {} }, DatePipe, PublicserviceService,
        { provide: MAT_DIALOG_DATA, useValue: {} }, ]
    });
    fixture = TestBed.createComponent(QuestionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
