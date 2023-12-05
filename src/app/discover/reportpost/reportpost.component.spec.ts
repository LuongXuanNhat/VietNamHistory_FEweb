import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportpostComponent } from './reportpost.component';
import { InjectionToken } from '@angular/core';

describe('ReportpostComponent', () => {
  let component: ReportpostComponent;
  let fixture: ComponentFixture<ReportpostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportpostComponent],
      providers: [InjectionToken]
    });
    fixture = TestBed.createComponent(ReportpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
