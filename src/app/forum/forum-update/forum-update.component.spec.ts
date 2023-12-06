import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumUpdateComponent } from './forum-update.component';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { DataService } from 'src/app/service/datashare/data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ReactiveFormsModule } from '@angular/forms';

describe('ForumUpdateComponent', () => {
  let component: ForumUpdateComponent;
  let fixture: ComponentFixture<ForumUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot(), MatFormFieldModule, MatChipsModule, MatAutocompleteModule,
         CKEditorModule, ReactiveFormsModule, MatFormFieldControl],
      declarations: [ForumUpdateComponent],
      providers: [PublicserviceService, DatePipe, DataService,{ provide: MatDialogRef, useValue: {} }]
    });
    fixture = TestBed.createComponent(ForumUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
