import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import { IntroduceComponent } from '../introduce/introduce.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { CategoryComponent } from '../category/category.component';
import { ChangeemailComponent } from '../updateaccount/changeemail/changeemail.component';
import { ChangepasswordComponent } from '../updateaccount/changepassword/changepassword.component';
import { UpdateuserinforComponent } from '../updateuserinfor/updateuserinfor.component';
import { UpdateaccountComponent } from '../updateaccount/updateaccount.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot(), FormsModule, MatCardModule, MatIconModule,
      MatTooltipModule, ReactiveFormsModule, ],
      declarations: [AccountComponent,IntroduceComponent, CategoryComponent,
      ChangeemailComponent, ChangepasswordComponent, UpdateuserinforComponent, UpdateaccountComponent],
    });
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
