import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionreportComponent } from './questionreport.component';

describe('QuestionreportComponent', () => {
  let component: QuestionreportComponent;
  let fixture: ComponentFixture<QuestionreportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionreportComponent]
    });
    fixture = TestBed.createComponent(QuestionreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
