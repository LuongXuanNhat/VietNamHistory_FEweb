import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateaccountComponent } from './updateaccount.component';
import { ChangeemailComponent } from './changeemail/changeemail.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { InjectionToken } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';

describe('UpdateaccountComponent', () => {
  let component: UpdateaccountComponent;
  let fixture: ComponentFixture<UpdateaccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), HttpClientTestingModule, MatIconModule, MatFormFieldModule, MatTooltipModule, 
      FormsModule,  ],
      declarations: [UpdateaccountComponent, ChangeemailComponent, ChangepasswordComponent],
    });
    fixture = TestBed.createComponent(UpdateaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
