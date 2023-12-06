import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepostComponent } from './createpost.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { DataService } from 'src/app/service/datashare/data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CreatepostComponent', () => {
  let component: CreatepostComponent;
  let fixture: ComponentFixture<CreatepostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), HttpClientTestingModule, MatIconModule, 
      MatFormFieldModule, MatStepperModule, CKEditorModule, MatChipsModule,MatTooltipModule,
      MatAutocompleteModule, FormsModule, ],
      declarations: [CreatepostComponent],
      providers: [PublicserviceService, DatePipe, DataService,{ provide: MatDialogRef, useValue: {} }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(CreatepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
