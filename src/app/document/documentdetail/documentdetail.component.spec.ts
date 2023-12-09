import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentdetailComponent } from './documentdetail.component';

describe('DocumentdetailComponent', () => {
  let component: DocumentdetailComponent;
  let fixture: ComponentFixture<DocumentdetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentdetailComponent]
    });
    fixture = TestBed.createComponent(DocumentdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
