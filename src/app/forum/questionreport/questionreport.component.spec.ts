import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionReportComponent } from './questionreport.component';
import { InjectionToken } from '@angular/core';

describe('QuestionreportComponent', () => {
  let component: QuestionReportComponent;
  let fixture: ComponentFixture<QuestionReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InjectionToken, ],
      declarations: [QuestionReportComponent],
      providers: [InjectionToken]
    });
    fixture = TestBed.createComponent(QuestionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
