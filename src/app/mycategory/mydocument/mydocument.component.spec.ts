import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MydocumentComponent } from './mydocument.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { InjectionToken } from '@angular/core';

describe('MydocumentComponent', () => {
  let component: MydocumentComponent;
  let fixture: ComponentFixture<MydocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), ],
      declarations: [MydocumentComponent],
    });
    fixture = TestBed.createComponent(MydocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
