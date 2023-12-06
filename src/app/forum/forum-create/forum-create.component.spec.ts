import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumCreateComponent } from './forum-create.component';
import { HttpClient } from '@angular/common/http';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from 'src/app/service/datashare/data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ForumCreateComponent', () => {
  let component: ForumCreateComponent;
  let fixture: ComponentFixture<ForumCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule,
      MatFormFieldModule, CKEditorModule, MatChipsModule, MatAutocompleteModule, FormsModule],
      declarations: [ForumCreateComponent],
      providers: [PublicserviceService, DatePipe, DataService
        ,{ provide: MatDialogRef, useValue: {} }],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(ForumCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
