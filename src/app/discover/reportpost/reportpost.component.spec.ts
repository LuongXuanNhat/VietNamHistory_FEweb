import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportpostComponent } from './reportpost.component';

describe('ReportpostComponent', () => {
  let component: ReportpostComponent;
  let fixture: ComponentFixture<ReportpostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportpostComponent]
    });
    fixture = TestBed.createComponent(ReportpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
