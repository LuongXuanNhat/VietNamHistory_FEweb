import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepostComponent } from './updatepost.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/service/datashare/data.service';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

describe('UpdatepostComponent', () => {
  let component: UpdatepostComponent;
  let fixture: ComponentFixture<UpdatepostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      
      imports: [ToastrModule.forRoot(), HttpClientTestingModule, RouterTestingModule, MatStepperModule, 
        MatFormFieldModule, MatChipsModule, MatIconModule, MatAutocompleteModule, CKEditorModule],
      declarations: [UpdatepostComponent],
      providers: [PublicserviceService, DatePipe, DataService,{ provide: MatDialogRef, useValue: {} }]
    });
    fixture = TestBed.createComponent(UpdatepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
