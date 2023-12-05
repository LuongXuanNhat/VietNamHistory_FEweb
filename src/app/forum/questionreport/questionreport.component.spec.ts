import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionReportComponent } from './questionreport.component';

describe('QuestionreportComponent', () => {
  let component: QuestionReportComponent;
  let fixture: ComponentFixture<QuestionReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionReportComponent]
    });
    fixture = TestBed.createComponent(QuestionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
