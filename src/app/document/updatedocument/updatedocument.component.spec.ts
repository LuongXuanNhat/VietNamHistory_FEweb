import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedocumentComponent } from './updatedocument.component';

describe('UpdatedocumentComponent', () => {
  let component: UpdatedocumentComponent;
  let fixture: ComponentFixture<UpdatedocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatedocumentComponent]
    });
    fixture = TestBed.createComponent(UpdatedocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
